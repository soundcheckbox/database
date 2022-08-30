import require$$0$1 from 'ipld-dag-pb';
import require$$1$1 from 'ipfs-unixfs';
import require$$0 from 'multihashing-async';
import require$$1 from 'cids';
import require$$4 from 'hamt-sharding';

/**
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').ImportResult} ImportResult
 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
 * @typedef {import('./types').BlockAPI} BlockAPI
 * @typedef {import('cids')} CID
 * @typedef {object} DirProps
 * @property {boolean} root
 * @property {boolean} dir
 * @property {string} path
 * @property {boolean} dirty
 * @property {boolean} flat
 * @property {Dir} [parent]
 * @property {string} [parentKey]
 * @property {import('ipfs-unixfs').UnixFS} [unixfs]
 * @property {number} [mode]
 * @property {import('ipfs-unixfs').Mtime} [mtime]
 */
class Dir$1 {
  /**
   *
   * @param {DirProps} props
   * @param {ImporterOptions} options
   */
  constructor (props, options) {
    this.options = options || {};

    this.root = props.root;
    this.dir = props.dir;
    this.path = props.path;
    this.dirty = props.dirty;
    this.flat = props.flat;
    this.parent = props.parent;
    this.parentKey = props.parentKey;
    this.unixfs = props.unixfs;
    this.mode = props.mode;
    this.mtime = props.mtime;

    /** @type {CID | undefined} */
    this.cid = undefined;
    /** @type {number | undefined} */
    this.size = undefined;
  }

  /**
   * @param {string} name
   * @param {InProgressImportResult | Dir} value
   */
  async put (name, value) { }

  /**
   * @param {string} name
   * @returns {Promise<InProgressImportResult | Dir | undefined>}
   */
  get (name) {
    return Promise.resolve(this)
  }

  /**
   * @returns {AsyncIterable<{ key: string, child: InProgressImportResult | Dir}>}
   */
  async * eachChildSeries () { }

  /**
   * @param {BlockAPI} block
   * @returns {AsyncIterable<ImportResult>}
   */
  async * flush (block) { }
}

var dir = Dir$1;

const mh = require$$0;
const CID = require$$1;

/**
 * @param {Uint8Array} buffer
 * @param {import('../types').BlockAPI} block
 * @param {import('../types').PersistOptions} options
 */
const persist$1 = async (buffer, block, options) => {
  if (!options.codec) {
    options.codec = 'dag-pb';
  }

  if (!options.cidVersion) {
    options.cidVersion = 0;
  }

  if (!options.hashAlg) {
    options.hashAlg = 'sha2-256';
  }

  if (options.hashAlg !== 'sha2-256') {
    options.cidVersion = 1;
  }

  const multihash = await mh(buffer, options.hashAlg);
  const cid = new CID(options.cidVersion, options.codec, multihash);

  if (!options.onlyHash) {
    // @ts-ignore block api takes uint8arrays or blocks but is missing from typedefs
    await block.put(buffer, {
      // @ts-ignore pin option is missing from block api typedefs
      pin: options.pin,
      preload: options.preload,
      timeout: options.timeout,
      cid
    });
  }

  return cid
};

var persist_1 = persist$1;

const {
  DAGLink,
  DAGNode
} = require$$0$1;
const { UnixFS } = require$$1$1;
const Dir = dir;
const persist = persist_1;
const { createHAMT, Bucket } = require$$4;

/**
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').ImportResult} ImportResult
 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
 * @typedef {import('./types').BlockAPI} BlockAPI
 */

/**
 * @typedef {import('./dir').DirProps} DirProps
 */

class DirSharded extends Dir {
  /**
   * @param {DirProps} props
   * @param {ImporterOptions} options
   */
  constructor (props, options) {
    super(props, options);

    /** @type {Bucket<InProgressImportResult | Dir>} */
    this._bucket = createHAMT({
      hashFn: options.hamtHashFn,
      bits: options.hamtBucketBits
    });
  }

  /**
   * @param {string} name
   * @param {InProgressImportResult | Dir} value
   */
  async put (name, value) {
    await this._bucket.put(name, value);
  }

  /**
   * @param {string} name
   */
  get (name) {
    return this._bucket.get(name)
  }

  childCount () {
    return this._bucket.leafCount()
  }

  directChildrenCount () {
    return this._bucket.childrenCount()
  }

  onlyChild () {
    return this._bucket.onlyChild()
  }

  async * eachChildSeries () {
    for await (const { key, value } of this._bucket.eachLeafSeries()) {
      yield {
        key,
        child: value
      };
    }
  }

  /**
   * @param {BlockAPI} block
   * @returns {AsyncIterable<ImportResult>}
   */
  async * flush (block) {
    for await (const entry of flush(this._bucket, block, this, this.options)) {
      yield {
        ...entry,
        path: this.path
      };
    }
  }
}

var dirSharded = DirSharded;

/**
 * @param {Bucket<?>} bucket
 * @param {BlockAPI} block
 * @param {*} shardRoot
 * @param {ImporterOptions} options
 * @returns {AsyncIterable<ImportResult>}
 */
async function * flush (bucket, block, shardRoot, options) {
  const children = bucket._children;
  const links = [];
  let childrenSize = 0;

  for (let i = 0; i < children.length; i++) {
    const child = children.get(i);

    if (!child) {
      continue
    }

    const labelPrefix = i.toString(16).toUpperCase().padStart(2, '0');

    if (child instanceof Bucket) {
      let shard;

      for await (const subShard of await flush(child, block, null, options)) {
        shard = subShard;
      }

      if (!shard) {
        throw new Error('Could not flush sharded directory, no subshard found')
      }

      links.push(new DAGLink(labelPrefix, shard.size, shard.cid));
      childrenSize += shard.size;
    } else if (typeof child.value.flush === 'function') {
      const dir = child.value;
      let flushedDir;

      for await (const entry of dir.flush(block)) {
        flushedDir = entry;

        yield flushedDir;
      }

      const label = labelPrefix + child.key;
      links.push(new DAGLink(label, flushedDir.size, flushedDir.cid));

      childrenSize += flushedDir.size;
    } else {
      const value = child.value;

      if (!value.cid) {
        continue
      }

      const label = labelPrefix + child.key;
      const size = value.size;

      links.push(new DAGLink(label, size, value.cid));
      childrenSize += size;
    }
  }

  // go-ipfs uses little endian, that's why we have to
  // reverse the bit field before storing it
  const data = Uint8Array.from(children.bitField().reverse());
  const dir = new UnixFS({
    type: 'hamt-sharded-directory',
    data,
    fanout: bucket.tableSize(),
    hashType: options.hamtHashCode,
    mtime: shardRoot && shardRoot.mtime,
    mode: shardRoot && shardRoot.mode
  });

  const node = new DAGNode(dir.marshal(), links);
  const buffer = node.serialize();
  const cid = await persist(buffer, block, options);
  const size = buffer.length + childrenSize;

  yield {
    cid,
    unixfs: dir,
    size
  };
}

export { dirSharded as default };
