import require$$4 from 'it-parallel-batch';
import require$$0 from 'merge-options';
import require$$1 from 'multihashing-async';
import require$$1$2 from 'ipfs-unixfs';
import require$$1$1 from 'cids';
import require$$2 from 'ipld-dag-pb';
import require$$0$3 from 'err-code';
import require$$0$1 from 'it-all';
import require$$0$2 from 'it-batch';
import require$$0$4 from 'bl/BufferList';
import require$$1$3 from 'rabin-wasm';
import require$$1$4 from 'uint8arrays/from-string';
import require$$4$1 from 'hamt-sharding';

const mergeOptions = require$$0.bind({ ignoreUndefined: true });
const multihashing = require$$1;

/**
 * @param {Uint8Array} buf
 */
async function hamtHashFn (buf) {
  const hash = await multihashing(buf, 'murmur3-128');

  // Multihashing inserts preamble of 2 bytes. Remove it.
  // Also, murmur3 outputs 128 bit but, accidentally, IPFS Go's
  // implementation only uses the first 64, so we must do the same
  // for parity..
  const justHash = hash.slice(2, 10);
  const length = justHash.length;
  const result = new Uint8Array(length);
  // TODO: invert buffer because that's how Go impl does it
  for (let i = 0; i < length; i++) {
    result[length - i - 1] = justHash[i];
  }

  return result
}

/**
 * @typedef {import('./types').UserImporterOptions} UserImporterOptions
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 */

/**
 * @type {ImporterOptions}
 */
const defaultOptions$1 = {
  chunker: 'fixed',
  strategy: 'balanced', // 'flat', 'trickle'
  rawLeaves: false,
  onlyHash: false,
  reduceSingleLeafToSelf: true,
  hashAlg: 'sha2-256',
  leafType: 'file', // 'raw'
  cidVersion: 0,
  progress: () => () => {},
  shardSplitThreshold: 1000,
  fileImportConcurrency: 50,
  blockWriteConcurrency: 10,
  minChunkSize: 262144,
  maxChunkSize: 262144,
  avgChunkSize: 262144,
  window: 16,
  // FIXME: This number is too big for JavaScript
  // https://github.com/ipfs/go-ipfs-chunker/blob/d0125832512163708c0804a3cda060e21acddae4/rabin.go#L11
  polynomial: 17437180132763653, // eslint-disable-line no-loss-of-precision
  maxChildrenPerNode: 174,
  layerRepeat: 4,
  wrapWithDirectory: false,
  pin: false,
  recursive: false,
  hidden: false,
  preload: false,
  timeout: undefined,
  hamtHashFn,
  hamtHashCode: 0x22,
  hamtBucketBits: 8
};

/**
 * @param {UserImporterOptions} options
 * @returns {ImporterOptions}
 */
var options = function (options = {}) {
  return mergeOptions(defaultOptions$1, options)
};

var persist_1;
var hasRequiredPersist;

function requirePersist () {
	if (hasRequiredPersist) return persist_1;
	hasRequiredPersist = 1;

	const mh = require$$1;
	const CID = require$$1$1;

	/**
	 * @param {Uint8Array} buffer
	 * @param {import('../types').BlockAPI} block
	 * @param {import('../types').PersistOptions} options
	 */
	const persist = async (buffer, block, options) => {
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

	persist_1 = persist;
	return persist_1;
}

var dir$1;
var hasRequiredDir$1;

function requireDir$1 () {
	if (hasRequiredDir$1) return dir$1;
	hasRequiredDir$1 = 1;

	const { UnixFS } = require$$1$2;
	const persist = requirePersist();
	const {
	  DAGNode
	} = require$$2;

	/**
	 * @typedef {import('../types').Directory} Directory
	 */

	/**
	 * @type {import('../types').UnixFSV1DagBuilder<Directory>}
	 */
	const dirBuilder = async (item, block, options) => {
	  const unixfs = new UnixFS({
	    type: 'directory',
	    mtime: item.mtime,
	    mode: item.mode
	  });

	  const buffer = new DAGNode(unixfs.marshal()).serialize();
	  const cid = await persist(buffer, block, options);
	  const path = item.path;

	  return {
	    cid,
	    path,
	    unixfs,
	    size: buffer.length
	  }
	};

	dir$1 = dirBuilder;
	return dir$1;
}

var flat;
var hasRequiredFlat;

function requireFlat () {
	if (hasRequiredFlat) return flat;
	hasRequiredFlat = 1;

	const all = require$$0$1;

	/**
	 * @type {import('../../types').FileDAGBuilder}
	 */
	flat = async function (source, reduce) {
	  return reduce(await all(source))
	};
	return flat;
}

var balanced_1;
var hasRequiredBalanced;

function requireBalanced () {
	if (hasRequiredBalanced) return balanced_1;
	hasRequiredBalanced = 1;

	const batch = require$$0$2;

	/**
	 * @typedef {import('../../types').FileDAGBuilder} FileDAGBuilder
	 */

	/**
	 * @type {FileDAGBuilder}
	 */
	function balanced (source, reduce, options) {
	  return reduceToParents(source, reduce, options)
	}

	/**
	 * @type {FileDAGBuilder}
	 */
	async function reduceToParents (source, reduce, options) {
	  const roots = [];

	  for await (const chunked of batch(source, options.maxChildrenPerNode)) {
	    roots.push(await reduce(chunked));
	  }

	  if (roots.length > 1) {
	    return reduceToParents(roots, reduce, options)
	  }

	  return roots[0]
	}

	balanced_1 = balanced;
	return balanced_1;
}

var trickle;
var hasRequiredTrickle;

function requireTrickle () {
	if (hasRequiredTrickle) return trickle;
	hasRequiredTrickle = 1;

	const batch = require$$0$2;

	/**
	 * @typedef {import('cids')} CID
	 * @typedef {import('ipfs-unixfs').UnixFS} UnixFS
	 * @typedef {import('../../types').ImporterOptions} ImporterOptions
	 * @typedef {import('../../types').InProgressImportResult} InProgressImportResult
	 * @typedef {import('../../types').TrickleDagNode} TrickleDagNode
	 * @typedef {import('../../types').Reducer} Reducer
	 * @typedef {import('../../types').FileDAGBuilder} FileDAGBuilder
	 */

	/**
	 * @type {FileDAGBuilder}
	 */
	trickle = async function trickleStream (source, reduce, options) {
	  const root = new Root(options.layerRepeat);
	  let iteration = 0;
	  let maxDepth = 1;

	  /** @type {SubTree} */
	  let subTree = root;

	  for await (const layer of batch(source, options.maxChildrenPerNode)) {
	    if (subTree.isFull()) {
	      if (subTree !== root) {
	        root.addChild(await subTree.reduce(reduce));
	      }

	      if (iteration && iteration % options.layerRepeat === 0) {
	        maxDepth++;
	      }

	      subTree = new SubTree(maxDepth, options.layerRepeat, iteration);

	      iteration++;
	    }

	    subTree.append(layer);
	  }

	  if (subTree && subTree !== root) {
	    root.addChild(await subTree.reduce(reduce));
	  }

	  return root.reduce(reduce)
	};

	class SubTree {
	  /**
	   * @param {number} maxDepth
	   * @param {number} layerRepeat
	   * @param {number} [iteration=0]
	   */
	  constructor (maxDepth, layerRepeat, iteration = 0) {
	    this.maxDepth = maxDepth;
	    this.layerRepeat = layerRepeat;
	    this.currentDepth = 1;
	    this.iteration = iteration;

	    /** @type {TrickleDagNode} */
	    this.root = this.node = this.parent = {
	      children: [],
	      depth: this.currentDepth,
	      maxDepth,
	      maxChildren: (this.maxDepth - this.currentDepth) * this.layerRepeat
	    };
	  }

	  isFull () {
	    if (!this.root.data) {
	      return false
	    }

	    if (this.currentDepth < this.maxDepth && this.node.maxChildren) {
	      // can descend
	      this._addNextNodeToParent(this.node);

	      return false
	    }

	    // try to find new node from node.parent
	    const distantRelative = this._findParent(this.node, this.currentDepth);

	    if (distantRelative) {
	      this._addNextNodeToParent(distantRelative);

	      return false
	    }

	    return true
	  }

	  /**
	   * @param {TrickleDagNode} parent
	   */
	  _addNextNodeToParent (parent) {
	    this.parent = parent;

	    // find site for new node
	    const nextNode = {
	      children: [],
	      depth: parent.depth + 1,
	      parent,
	      maxDepth: this.maxDepth,
	      maxChildren: Math.floor(parent.children.length / this.layerRepeat) * this.layerRepeat
	    };

	    // @ts-ignore
	    parent.children.push(nextNode);

	    this.currentDepth = nextNode.depth;
	    this.node = nextNode;
	  }

	  /**
	   *
	   * @param {InProgressImportResult[]} layer
	   */
	  append (layer) {
	    this.node.data = layer;
	  }

	  /**
	   * @param {Reducer} reduce
	   */
	  reduce (reduce) {
	    return this._reduce(this.root, reduce)
	  }

	  /**
	   * @param {TrickleDagNode} node
	   * @param {Reducer} reduce
	   * @returns {Promise<InProgressImportResult>}
	   */
	  async _reduce (node, reduce) {
	    /** @type {InProgressImportResult[]} */
	    let children = [];

	    if (node.children.length) {
	      children = await Promise.all(
	        node.children
	          // @ts-ignore
	          .filter(child => child.data)
	          // @ts-ignore
	          .map(child => this._reduce(child, reduce))
	      );
	    }

	    return reduce((node.data || []).concat(children))
	  }

	  /**
	   * @param {TrickleDagNode} node
	   * @param {number} depth
	   * @returns {TrickleDagNode | undefined}
	   */
	  _findParent (node, depth) {
	    const parent = node.parent;

	    if (!parent || parent.depth === 0) {
	      return
	    }

	    if (parent.children.length === parent.maxChildren || !parent.maxChildren) {
	      // this layer is full, may be able to traverse to a different branch
	      return this._findParent(parent, depth)
	    }

	    return parent
	  }
	}

	class Root extends SubTree {
	  /**
	   * @param {number} layerRepeat
	   */
	  constructor (layerRepeat) {
	    super(0, layerRepeat);

	    this.root.depth = 0;
	    this.currentDepth = 1;
	  }

	  /**
	   * @param {InProgressImportResult} child
	   */
	  addChild (child) {
	    this.root.children.push(child);
	  }

	  /**
	   * @param {Reducer} reduce
	   */
	  reduce (reduce) {
	    return reduce((this.root.data || []).concat(this.root.children))
	  }
	}
	return trickle;
}

var bufferImporter_1;
var hasRequiredBufferImporter;

function requireBufferImporter () {
	if (hasRequiredBufferImporter) return bufferImporter_1;
	hasRequiredBufferImporter = 1;

	const { UnixFS } = require$$1$2;
	const persist = requirePersist();
	const {
	  DAGNode
	} = require$$2;

	/**
	 * @typedef {import('../../types').BufferImporter} BufferImporter
	 */

	/**
	 * @type {BufferImporter}
	 */
	async function * bufferImporter (file, block, options) {
	  for await (let buffer of file.content) {
	    yield async () => {
	      options.progress(buffer.length, file.path);
	      let unixfs;

	      /** @type {import('../../types').PersistOptions} */
	      const opts = {
	        codec: 'dag-pb',
	        cidVersion: options.cidVersion,
	        hashAlg: options.hashAlg,
	        onlyHash: options.onlyHash
	      };

	      if (options.rawLeaves) {
	        opts.codec = 'raw';
	        opts.cidVersion = 1;
	      } else {
	        unixfs = new UnixFS({
	          type: options.leafType,
	          data: buffer,
	          mtime: file.mtime,
	          mode: file.mode
	        });

	        buffer = new DAGNode(unixfs.marshal()).serialize();
	      }

	      return {
	        cid: await persist(buffer, block, opts),
	        unixfs,
	        size: buffer.length
	      }
	    };
	  }
	}

	bufferImporter_1 = bufferImporter;
	return bufferImporter_1;
}

var file;
var hasRequiredFile;

function requireFile () {
	if (hasRequiredFile) return file;
	hasRequiredFile = 1;

	const errCode = require$$0$3;
	const { UnixFS } = require$$1$2;
	const persist = requirePersist();
	const {
	  DAGNode,
	  DAGLink
	} = require$$2;
	const parallelBatch = require$$4;
	const mh = require$$1.multihash;

	/**
	 * @typedef {import('../../types').BlockAPI} BlockAPI
	 * @typedef {import('../../types').File} File
	 * @typedef {import('../../types').ImporterOptions} ImporterOptions
	 * @typedef {import('../../types').Reducer} Reducer
	 * @typedef {import('../../types').DAGBuilder} DAGBuilder
	 * @typedef {import('../../types').FileDAGBuilder} FileDAGBuilder
	 */

	/**
	 * @type {{ [key: string]: FileDAGBuilder}}
	 */
	const dagBuilders = {
	  flat: requireFlat(),
	  balanced: requireBalanced(),
	  trickle: requireTrickle()
	};

	/**
	 * @param {File} file
	 * @param {BlockAPI} block
	 * @param {ImporterOptions} options
	 */
	async function * buildFileBatch (file, block, options) {
	  let count = -1;
	  let previous;
	  let bufferImporter;

	  if (typeof options.bufferImporter === 'function') {
	    bufferImporter = options.bufferImporter;
	  } else {
	    bufferImporter = requireBufferImporter();
	  }

	  for await (const entry of parallelBatch(bufferImporter(file, block, options), options.blockWriteConcurrency)) {
	    count++;

	    if (count === 0) {
	      previous = entry;
	      continue
	    } else if (count === 1 && previous) {
	      yield previous;
	      previous = null;
	    }

	    yield entry;
	  }

	  if (previous) {
	    previous.single = true;
	    yield previous;
	  }
	}

	/**
	 * @param {File} file
	 * @param {BlockAPI} block
	 * @param {ImporterOptions} options
	 */
	const reduce = (file, block, options) => {
	  /**
	   * @type {Reducer}
	   */
	  async function reducer (leaves) {
	    if (leaves.length === 1 && leaves[0].single && options.reduceSingleLeafToSelf) {
	      const leaf = leaves[0];

	      if (leaf.cid.codec === 'raw' && (file.mtime !== undefined || file.mode !== undefined)) {
	        // only one leaf node which is a buffer - we have metadata so convert it into a
	        // UnixFS entry otherwise we'll have nowhere to store the metadata
	        let { data: buffer } = await block.get(leaf.cid, options);

	        leaf.unixfs = new UnixFS({
	          type: 'file',
	          mtime: file.mtime,
	          mode: file.mode,
	          data: buffer
	        });

	        const multihash = mh.decode(leaf.cid.multihash);
	        buffer = new DAGNode(leaf.unixfs.marshal()).serialize();

	        leaf.cid = await persist(buffer, block, {
	          ...options,
	          codec: 'dag-pb',
	          hashAlg: multihash.name,
	          cidVersion: options.cidVersion
	        });
	        leaf.size = buffer.length;
	      }

	      return {
	        cid: leaf.cid,
	        path: file.path,
	        unixfs: leaf.unixfs,
	        size: leaf.size
	      }
	    }

	    // create a parent node and add all the leaves
	    const f = new UnixFS({
	      type: 'file',
	      mtime: file.mtime,
	      mode: file.mode
	    });

	    const links = leaves
	      .filter(leaf => {
	        if (leaf.cid.codec === 'raw' && leaf.size) {
	          return true
	        }

	        if (leaf.unixfs && !leaf.unixfs.data && leaf.unixfs.fileSize()) {
	          return true
	        }

	        return Boolean(leaf.unixfs && leaf.unixfs.data && leaf.unixfs.data.length)
	      })
	      .map((leaf) => {
	        if (leaf.cid.codec === 'raw') {
	          // node is a leaf buffer
	          f.addBlockSize(leaf.size);

	          return new DAGLink('', leaf.size, leaf.cid)
	        }

	        if (!leaf.unixfs || !leaf.unixfs.data) {
	          // node is an intermediate node
	          f.addBlockSize((leaf.unixfs && leaf.unixfs.fileSize()) || 0);
	        } else {
	          // node is a unixfs 'file' leaf node
	          f.addBlockSize(leaf.unixfs.data.length);
	        }

	        return new DAGLink('', leaf.size, leaf.cid)
	      });

	    const node = new DAGNode(f.marshal(), links);
	    const buffer = node.serialize();
	    const cid = await persist(buffer, block, options);

	    return {
	      cid,
	      path: file.path,
	      unixfs: f,
	      size: buffer.length + node.Links.reduce((acc, curr) => acc + curr.Tsize, 0)
	    }
	  }

	  return reducer
	};

	/**
	 * @type {import('../../types').UnixFSV1DagBuilder<File>}
	 */
	function fileBuilder (file, block, options) {
	  const dagBuilder = dagBuilders[options.strategy];

	  if (!dagBuilder) {
	    throw errCode(new Error(`Unknown importer build strategy name: ${options.strategy}`), 'ERR_BAD_STRATEGY')
	  }

	  return dagBuilder(buildFileBatch(file, block, options), reduce(file, block, options), options)
	}

	file = fileBuilder;
	return file;
}

var rabin_1;
var hasRequiredRabin;

function requireRabin () {
	if (hasRequiredRabin) return rabin_1;
	hasRequiredRabin = 1;

	// @ts-ignore
	const BufferList = require$$0$4;
	// @ts-ignore
	const { create } = require$$1$3;
	const errcode = require$$0$3;

	/**
	 * @typedef {object} RabinOptions
	 * @property {number} min
	 * @property {number} max
	 * @property {number} bits
	 * @property {number} window
	 * @property {number} polynomial
	 */

	/**
	 * @type {import('../types').Chunker}
	 */
	rabin_1 = async function * rabinChunker (source, options) {
	  let min, max, avg;

	  if (options.minChunkSize && options.maxChunkSize && options.avgChunkSize) {
	    avg = options.avgChunkSize;
	    min = options.minChunkSize;
	    max = options.maxChunkSize;
	  } else if (!options.avgChunkSize) {
	    throw errcode(new Error('please specify an average chunk size'), 'ERR_INVALID_AVG_CHUNK_SIZE')
	  } else {
	    avg = options.avgChunkSize;
	    min = avg / 3;
	    max = avg + (avg / 2);
	  }

	  // validate min/max/avg in the same way as go
	  if (min < 16) {
	    throw errcode(new Error('rabin min must be greater than 16'), 'ERR_INVALID_MIN_CHUNK_SIZE')
	  }

	  if (max < min) {
	    max = min;
	  }

	  if (avg < min) {
	    avg = min;
	  }

	  const sizepow = Math.floor(Math.log2(avg));

	  for await (const chunk of rabin(source, {
	    min: min,
	    max: max,
	    bits: sizepow,
	    window: options.window,
	    polynomial: options.polynomial
	  })) {
	    yield chunk;
	  }
	};

	/**
	 * @param {AsyncIterable<Uint8Array>} source
	 * @param {RabinOptions} options
	 */
	async function * rabin (source, options) {
	  const r = await create(options.bits, options.min, options.max, options.window);
	  const buffers = new BufferList();

	  for await (const chunk of source) {
	    buffers.append(chunk);

	    const sizes = r.fingerprint(chunk);

	    for (let i = 0; i < sizes.length; i++) {
	      const size = sizes[i];
	      const buf = buffers.slice(0, size);
	      buffers.consume(size);

	      yield buf;
	    }
	  }

	  if (buffers.length) {
	    yield buffers.slice(0);
	  }
	}
	return rabin_1;
}

var fixedSize;
var hasRequiredFixedSize;

function requireFixedSize () {
	if (hasRequiredFixedSize) return fixedSize;
	hasRequiredFixedSize = 1;

	// @ts-ignore
	const BufferList = require$$0$4;

	/**
	 * @type {import('../types').Chunker}
	 */
	fixedSize = async function * fixedSizeChunker (source, options) {
	  let bl = new BufferList();
	  let currentLength = 0;
	  let emitted = false;
	  const maxChunkSize = options.maxChunkSize;

	  for await (const buffer of source) {
	    bl.append(buffer);

	    currentLength += buffer.length;

	    while (currentLength >= maxChunkSize) {
	      yield bl.slice(0, maxChunkSize);
	      emitted = true;

	      // throw away consumed bytes
	      if (maxChunkSize === bl.length) {
	        bl = new BufferList();
	        currentLength = 0;
	      } else {
	        const newBl = new BufferList();
	        newBl.append(bl.shallowSlice(maxChunkSize));
	        bl = newBl;

	        // update our offset
	        currentLength -= maxChunkSize;
	      }
	    }
	  }

	  if (!emitted || currentLength) {
	    // return any remaining bytes or an empty buffer
	    yield bl.slice(0, currentLength);
	  }
	};
	return fixedSize;
}

var validateChunks_1;
var hasRequiredValidateChunks;

function requireValidateChunks () {
	if (hasRequiredValidateChunks) return validateChunks_1;
	hasRequiredValidateChunks = 1;

	const errCode = require$$0$3;
	const uint8ArrayFromString = require$$1$4;

	/**
	 * @typedef {import('../types').ChunkValidator} ChunkValidator
	 */

	/**
	 * @type {ChunkValidator}
	 */
	async function * validateChunks (source) {
	  for await (const content of source) {
	    if (content.length === undefined) {
	      throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
	    }

	    if (typeof content === 'string' || content instanceof String) {
	      yield uint8ArrayFromString(content.toString());
	    } else if (Array.isArray(content)) {
	      yield Uint8Array.from(content);
	    } else if (content instanceof Uint8Array) {
	      yield content;
	    } else {
	      throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
	    }
	  }
	}

	validateChunks_1 = validateChunks;
	return validateChunks_1;
}

var dagBuilder_1;
var hasRequiredDagBuilder;

function requireDagBuilder () {
	if (hasRequiredDagBuilder) return dagBuilder_1;
	hasRequiredDagBuilder = 1;

	const dirBuilder = requireDir$1();
	const fileBuilder = requireFile();
	const errCode = require$$0$3;

	/**
	 * @typedef {import('../types').File} File
	 * @typedef {import('../types').Directory} Directory
	 * @typedef {import('../types').DAGBuilder} DAGBuilder
	 * @typedef {import('../types').Chunker} Chunker
	 * @typedef {import('../types').ChunkValidator} ChunkValidator
	 */

	/**
	 * @param {any} thing
	 * @returns {thing is Iterable<any>}
	 */
	function isIterable (thing) {
	  return Symbol.iterator in thing
	}

	/**
	 * @param {any} thing
	 * @returns {thing is AsyncIterable<any>}
	 */
	function isAsyncIterable (thing) {
	  return Symbol.asyncIterator in thing
	}

	/**
	 * @param {Uint8Array | AsyncIterable<Uint8Array> | Iterable<Uint8Array>} content
	 * @returns {AsyncIterable<Uint8Array>}
	 */
	function contentAsAsyncIterable (content) {
	  try {
	    if (content instanceof Uint8Array) {
	      return (async function * () {
	        yield content;
	      }())
	    } else if (isIterable(content)) {
	      return (async function * () {
	        yield * content;
	      }())
	    } else if (isAsyncIterable(content)) {
	      return content
	    }
	  } catch {
	    throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
	  }

	  throw errCode(new Error('Content was invalid'), 'ERR_INVALID_CONTENT')
	}

	/**
	 * @type {DAGBuilder}
	 */
	async function * dagBuilder (source, block, options) {
	  for await (const entry of source) {
	    if (entry.path) {
	      if (entry.path.substring(0, 2) === './') {
	        options.wrapWithDirectory = true;
	      }

	      entry.path = entry.path
	        .split('/')
	        .filter(path => path && path !== '.')
	        .join('/');
	    }

	    if (entry.content) {
	      /**
	       * @type {Chunker}
	       */
	      let chunker;

	      if (typeof options.chunker === 'function') {
	        chunker = options.chunker;
	      } else if (options.chunker === 'rabin') {
	        chunker = requireRabin();
	      } else {
	        chunker = requireFixedSize();
	      }

	      /**
	       * @type {ChunkValidator}
	       */
	      let chunkValidator;

	      if (typeof options.chunkValidator === 'function') {
	        chunkValidator = options.chunkValidator;
	      } else {
	        chunkValidator = requireValidateChunks();
	      }

	      /** @type {File} */
	      const file = {
	        path: entry.path,
	        mtime: entry.mtime,
	        mode: entry.mode,
	        content: chunker(chunkValidator(contentAsAsyncIterable(entry.content), options), options)
	      };

	      yield () => fileBuilder(file, block, options);
	    } else if (entry.path) {
	      /** @type {Directory} */
	      const dir = {
	        path: entry.path,
	        mtime: entry.mtime,
	        mode: entry.mode
	      };

	      yield () => dirBuilder(dir, block, options);
	    } else {
	      throw new Error('Import candidate must have content or path or both')
	    }
	  }
	}

	dagBuilder_1 = dagBuilder;
	return dagBuilder_1;
}

var dir;
var hasRequiredDir;

function requireDir () {
	if (hasRequiredDir) return dir;
	hasRequiredDir = 1;

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
	class Dir {
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

	dir = Dir;
	return dir;
}

var dirFlat;
var hasRequiredDirFlat;

function requireDirFlat () {
	if (hasRequiredDirFlat) return dirFlat;
	hasRequiredDirFlat = 1;

	const {
	  DAGLink,
	  DAGNode
	} = require$$2;
	const { UnixFS } = require$$1$2;
	const Dir = requireDir();
	const persist = requirePersist();

	/**
	 * @typedef {import('./types').ImporterOptions} ImporterOptions
	 * @typedef {import('./types').ImportResult} ImportResult
	 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
	 * @typedef {import('./types').BlockAPI} BlockAPI
	 * @typedef {import('./dir').DirProps} DirProps
	 * @typedef {import('cids')} CID
	 */

	class DirFlat extends Dir {
	  /**
	   * @param {DirProps} props
	   * @param {ImporterOptions} options
	   */
	  constructor (props, options) {
	    super(props, options);

	    /** @type {{ [key: string]: InProgressImportResult | Dir }} */
	    this._children = {};
	  }

	  /**
	   * @param {string} name
	   * @param {InProgressImportResult | Dir} value
	   */
	  async put (name, value) {
	    this.cid = undefined;
	    this.size = undefined;

	    this._children[name] = value;
	  }

	  /**
	   * @param {string} name
	   */
	  get (name) {
	    return Promise.resolve(this._children[name])
	  }

	  childCount () {
	    return Object.keys(this._children).length
	  }

	  directChildrenCount () {
	    return this.childCount()
	  }

	  onlyChild () {
	    return this._children[Object.keys(this._children)[0]]
	  }

	  async * eachChildSeries () {
	    const keys = Object.keys(this._children);

	    for (let i = 0; i < keys.length; i++) {
	      const key = keys[i];

	      yield {
	        key: key,
	        child: this._children[key]
	      };
	    }
	  }

	  /**
	   * @param {BlockAPI} block
	   * @returns {AsyncIterable<ImportResult>}
	   */
	  async * flush (block) {
	    const children = Object.keys(this._children);
	    const links = [];

	    for (let i = 0; i < children.length; i++) {
	      let child = this._children[children[i]];

	      if (child instanceof Dir) {
	        for await (const entry of child.flush(block)) {
	          child = entry;

	          yield child;
	        }
	      }

	      if (child.size != null && child.cid) {
	        links.push(new DAGLink(children[i], child.size, child.cid));
	      }
	    }

	    const unixfs = new UnixFS({
	      type: 'directory',
	      mtime: this.mtime,
	      mode: this.mode
	    });

	    const node = new DAGNode(unixfs.marshal(), links);
	    const buffer = node.serialize();
	    const cid = await persist(buffer, block, this.options);
	    const size = buffer.length + node.Links.reduce(
	      /**
	       * @param {number} acc
	       * @param {DAGLink} curr
	       */
	      (acc, curr) => acc + curr.Tsize,
	      0);

	    this.cid = cid;
	    this.size = size;

	    yield {
	      cid,
	      unixfs,
	      path: this.path,
	      size
	    };
	  }
	}

	dirFlat = DirFlat;
	return dirFlat;
}

var dirSharded;
var hasRequiredDirSharded;

function requireDirSharded () {
	if (hasRequiredDirSharded) return dirSharded;
	hasRequiredDirSharded = 1;

	const {
	  DAGLink,
	  DAGNode
	} = require$$2;
	const { UnixFS } = require$$1$2;
	const Dir = requireDir();
	const persist = requirePersist();
	const { createHAMT, Bucket } = require$$4$1;

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

	dirSharded = DirSharded;

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
	return dirSharded;
}

var flatToShard;
var hasRequiredFlatToShard;

function requireFlatToShard () {
	if (hasRequiredFlatToShard) return flatToShard;
	hasRequiredFlatToShard = 1;

	const DirSharded = requireDirSharded();
	const DirFlat = requireDirFlat();

	/**
	 * @typedef {import('./dir')} Dir
	 * @typedef {import('./types').ImporterOptions} ImporterOptions
	 */

	/**
	 * @param {Dir | null} child
	 * @param {Dir} dir
	 * @param {number} threshold
	 * @param {ImporterOptions} options
	 * @returns {Promise<DirSharded>}
	 */
	flatToShard = async function flatToShard (child, dir, threshold, options) {
	  let newDir = dir;

	  if (dir instanceof DirFlat && dir.directChildrenCount() >= threshold) {
	    newDir = await convertToShard(dir, options);
	  }

	  const parent = newDir.parent;

	  if (parent) {
	    if (newDir !== dir) {
	      if (child) {
	        child.parent = newDir;
	      }

	      if (!newDir.parentKey) {
	        throw new Error('No parent key found')
	      }

	      await parent.put(newDir.parentKey, newDir);
	    }

	    return flatToShard(newDir, parent, threshold, options)
	  }

	  // @ts-ignore
	  return newDir
	};

	/**
	 * @param {DirFlat} oldDir
	 * @param {ImporterOptions} options
	 */
	async function convertToShard (oldDir, options) {
	  const newDir = new DirSharded({
	    root: oldDir.root,
	    dir: true,
	    parent: oldDir.parent,
	    parentKey: oldDir.parentKey,
	    path: oldDir.path,
	    dirty: oldDir.dirty,
	    flat: false,
	    mtime: oldDir.mtime,
	    mode: oldDir.mode
	  }, options);

	  for await (const { key, child } of oldDir.eachChildSeries()) {
	    await newDir.put(key, child);
	  }

	  return newDir
	}
	return flatToShard;
}

var toPathComponents_1;
var hasRequiredToPathComponents;

function requireToPathComponents () {
	if (hasRequiredToPathComponents) return toPathComponents_1;
	hasRequiredToPathComponents = 1;

	const toPathComponents = (path = '') => {
	  // split on / unless escaped with \
	  return (path
	    .trim()
	    .match(/([^\\^/]|\\\/)+/g) || [])
	    .filter(Boolean)
	};

	toPathComponents_1 = toPathComponents;
	return toPathComponents_1;
}

var treeBuilder_1;
var hasRequiredTreeBuilder;

function requireTreeBuilder () {
	if (hasRequiredTreeBuilder) return treeBuilder_1;
	hasRequiredTreeBuilder = 1;

	const DirFlat = requireDirFlat();
	const flatToShard = requireFlatToShard();
	const Dir = requireDir();
	const toPathComponents = requireToPathComponents();

	/**
	 * @typedef {import('./types').ImportResult} ImportResult
	 * @typedef {import('./types').InProgressImportResult} InProgressImportResult
	 * @typedef {import('./types').ImporterOptions} ImporterOptions
	 * @typedef {import('./types').BlockAPI} BlockAPI
	 * @typedef {(source: AsyncIterable<InProgressImportResult>, block: BlockAPI, options: ImporterOptions) => AsyncIterable<ImportResult>} TreeBuilder
	 */

	/**
	 * @param {InProgressImportResult} elem
	 * @param {Dir} tree
	 * @param {ImporterOptions} options
	 */
	async function addToTree (elem, tree, options) {
	  const pathElems = toPathComponents(elem.path || '');
	  const lastIndex = pathElems.length - 1;
	  let parent = tree;
	  let currentPath = '';

	  for (let i = 0; i < pathElems.length; i++) {
	    const pathElem = pathElems[i];

	    currentPath += `${currentPath ? '/' : ''}${pathElem}`;

	    const last = (i === lastIndex);
	    parent.dirty = true;
	    parent.cid = undefined;
	    parent.size = undefined;

	    if (last) {
	      await parent.put(pathElem, elem);
	      tree = await flatToShard(null, parent, options.shardSplitThreshold, options);
	    } else {
	      let dir = await parent.get(pathElem);

	      if (!dir || !(dir instanceof Dir)) {
	        dir = new DirFlat({
	          root: false,
	          dir: true,
	          parent: parent,
	          parentKey: pathElem,
	          path: currentPath,
	          dirty: true,
	          flat: true,
	          mtime: dir && dir.unixfs && dir.unixfs.mtime,
	          mode: dir && dir.unixfs && dir.unixfs.mode
	        }, options);
	      }

	      await parent.put(pathElem, dir);

	      parent = dir;
	    }
	  }

	  return tree
	}

	/**
	 * @param {Dir | InProgressImportResult} tree
	 * @param {BlockAPI} block
	 */
	async function * flushAndYield (tree, block) {
	  if (!(tree instanceof Dir)) {
	    if (tree && tree.unixfs && tree.unixfs.isDirectory()) {
	      yield tree;
	    }

	    return
	  }

	  yield * tree.flush(block);
	}

	/**
	 * @type {TreeBuilder}
	 */
	async function * treeBuilder (source, block, options) {
	  /** @type {Dir} */
	  let tree = new DirFlat({
	    root: true,
	    dir: true,
	    path: '',
	    dirty: true,
	    flat: true
	  }, options);

	  for await (const entry of source) {
	    if (!entry) {
	      continue
	    }

	    tree = await addToTree(entry, tree, options);

	    if (!entry.unixfs || !entry.unixfs.isDirectory()) {
	      yield entry;
	    }
	  }

	  if (options.wrapWithDirectory) {
	    yield * flushAndYield(tree, block);
	  } else {
	    for await (const unwrapped of tree.eachChildSeries()) {
	      if (!unwrapped) {
	        continue
	      }

	      yield * flushAndYield(unwrapped.child, block);
	    }
	  }
	}

	treeBuilder_1 = treeBuilder;
	return treeBuilder_1;
}

const parallelBatch = require$$4;
const defaultOptions = options;

/**
 * @typedef {import('./types').BlockAPI} BlockAPI
 * @typedef {import('./types').ImportCandidate} ImportCandidate
 * @typedef {import('./types').UserImporterOptions} UserImporterOptions
 * @typedef {import('./types').ImporterOptions} ImporterOptions
 * @typedef {import('./types').Directory} Directory
 * @typedef {import('./types').File} File
 * @typedef {import('./types').ImportResult} ImportResult
 *
 * @typedef {import('./types').Chunker} Chunker
 * @typedef {import('./types').DAGBuilder} DAGBuilder
 * @typedef {import('./types').TreeBuilder} TreeBuilder
 * @typedef {import('./types').BufferImporter} BufferImporter
 * @typedef {import('./types').ChunkValidator} ChunkValidator
 * @typedef {import('./types').Reducer} Reducer
 * @typedef {import('./types').ProgressHandler} ProgressHandler
 */

/**
 * @param {AsyncIterable<ImportCandidate> | Iterable<ImportCandidate> | ImportCandidate} source
 * @param {BlockAPI} block
 * @param {UserImporterOptions} options
 */
async function * importer (source, block, options = {}) {
  const opts = defaultOptions(options);

  let dagBuilder;

  if (typeof options.dagBuilder === 'function') {
    dagBuilder = options.dagBuilder;
  } else {
    dagBuilder = requireDagBuilder();
  }

  let treeBuilder;

  if (typeof options.treeBuilder === 'function') {
    treeBuilder = options.treeBuilder;
  } else {
    treeBuilder = requireTreeBuilder();
  }

  /** @type {AsyncIterable<ImportCandidate> | Iterable<ImportCandidate>} */
  let candidates;

  if (Symbol.asyncIterator in source || Symbol.iterator in source) {
    // @ts-ignore
    candidates = source;
  } else {
    // @ts-ignore
    candidates = [source];
  }

  for await (const entry of treeBuilder(parallelBatch(dagBuilder(candidates, block, opts), opts.fileImportConcurrency), block, opts)) {
    yield {
      cid: entry.cid,
      path: entry.path,
      unixfs: entry.unixfs,
      size: entry.size
    };
  }
}

var src = {
  importer
};

export { src as default };
