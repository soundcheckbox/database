import require$$1$1 from '../../../class-is/dist/index.js';
import require$$0 from '../../../stable/dist/index.js';
import require$$1 from '../../../uint8arrays/dist/compare.js';
import require$$0$1 from '../../../cids/dist/index.js';
import require$$2 from '../../../uint8arrays/dist/from-string.js';
import require$$0$2 from '../../../protons/dist/index.js';
import require$$1$2 from '../../../multicodec/dist/index.js';
import require$$2$1 from '../../../multihashing-async/dist/index.js';
import require$$1$3 from '../../../uint8arrays/dist/equals.js';
import require$$8 from '../../../uint8arrays/dist/to-string.js';

var src = {};

var dagNode$1 = {exports: {}};

var dagNode = {exports: {}};

const sort = require$$0;
const uint8ArrayCompare = require$$1;

const linkSort = (a, b) => {
  const buf1 = a.nameAsBuffer;
  const buf2 = b.nameAsBuffer;

  return uint8ArrayCompare(buf1, buf2)
};

/**
 * Sorts links in place (mutating given array)
 * @param {Array} links
 * @returns {void}
 */
const sortLinks$1 = (links) => {
  sort.inplace(links, linkSort);
};

var sortLinks_1 = sortLinks$1;

var dagLink$1 = {exports: {}};

(function (module, exports) {

	const CID = require$$0$1;
	const withIs = require$$1$1;
	const uint8ArrayFromString = require$$2;

	// Link represents an IPFS Merkle DAG Link between Nodes.
	class DAGLink {
	  constructor (name, size, cid) {
	    if (!cid) {
	      throw new Error('A link requires a cid to point to')
	    }

	    // assert(size, 'A link requires a size')
	    //  note - links should include size, but this assert is disabled
	    //  for now to maintain consistency with go-ipfs pinset

	    Object.defineProperties(this, {
	      Name: { value: name || '', writable: false, enumerable: true },
	      Tsize: { value: size, writable: false, enumerable: true },
	      Hash: { value: new CID(cid), writable: false, enumerable: true },
	      _nameBuf: { value: null, writable: true, enumerable: false }
	    });
	  }

	  toString () {
	    return `DAGLink <${this.Hash.toBaseEncodedString()} - name: "${this.Name}", size: ${this.Tsize}>`
	  }

	  toJSON () {
	    if (!this._json) {
	      this._json = Object.freeze({
	        name: this.Name,
	        size: this.Tsize,
	        cid: this.Hash.toBaseEncodedString()
	      });
	    }

	    return Object.assign({}, this._json)
	  }

	  // Memoize the Uint8Array representation of name
	  // We need this to sort the links, otherwise
	  // we will reallocate new Uint8Arrays every time
	  get nameAsBuffer () {
	    if (this._nameBuf !== null) {
	      return this._nameBuf
	    }

	    this._nameBuf = uint8ArrayFromString(this.Name);
	    return this._nameBuf
	  }
	}

	module.exports = withIs(DAGLink, { className: 'DAGLink', symbolName: '@ipld/js-ipld-dag-pb/daglink' });
} (dagLink$1));

var serialize = {exports: {}};

var dag_proto;
var hasRequiredDag_proto;

function requireDag_proto () {
	if (hasRequiredDag_proto) return dag_proto;
	hasRequiredDag_proto = 1;

	dag_proto = `// An IPFS MerkleDAG Link
	message PBLink {

	  // multihash of the target object
	  optional bytes Hash = 1;

	  // utf string name. should be unique per object
	  optional string Name = 2;

	  // cumulative size of target object
	  optional uint64 Tsize = 3;
	}

	// An IPFS MerkleDAG Node
	message PBNode {

	  // refs to other objects
	  repeated PBLink Links = 2;

	  // opaque user data
	  optional bytes Data = 1;
	}`;
	return dag_proto;
}

var hasRequiredSerialize;

function requireSerialize () {
	if (hasRequiredSerialize) return serialize.exports;
	hasRequiredSerialize = 1;
	(function (module, exports) {

		const protons = require$$0$2;
		const proto = protons(requireDag_proto());
		const DAGLink = dagLink$1.exports;

		exports = module.exports;

		const toProtoBuf = (node) => {
		  const pbn = {};

		  if (node.Data && node.Data.byteLength > 0) {
		    pbn.Data = node.Data;
		  } else {
		    // NOTE: this has to be null in order to match go-ipfs serialization
		    // `null !== new Uint8Array(0)`
		    pbn.Data = null;
		  }

		  if (node.Links && node.Links.length > 0) {
		    pbn.Links = node.Links
		      .map((link) => ({
		        Hash: link.Hash.bytes,
		        Name: link.Name,
		        Tsize: link.Tsize
		      }));
		  } else {
		    pbn.Links = null;
		  }

		  return pbn
		};

		/**
		 * Serialize internal representation into a binary PB block.
		 *
		 * @param {Object} node - Internal representation of a PB block
		 * @returns {Uint8Array} - The encoded binary representation
		 */
		const serializeDAGNode = (node) => {
		  const data = node.Data;
		  const links = node.Links || [];

		  const serialized = proto.PBNode.encode(toProtoBuf({
		    Data: data,
		    Links: links
		  }));

		  return serialized
		};

		// Serialize an object where the `Links` might not be a `DAGLink` instance yet
		const serializeDAGNodeLike = (data, links = []) => {
		  const node = { Data: data };
		  node.Links = links.map((link) => {
		    return DAGLink.isDAGLink(link)
		      ? link
		      : DAGLink.util.createDagLinkFromB58EncodedHash(link)
		  });
		  return serializeDAGNode(node)
		};

		exports.serializeDAGNode = serializeDAGNode;
		exports.serializeDAGNodeLike = serializeDAGNodeLike;
} (serialize, serialize.exports));
	return serialize.exports;
}

var genCid$1 = {exports: {}};

var hasRequiredGenCid;

function requireGenCid () {
	if (hasRequiredGenCid) return genCid$1.exports;
	hasRequiredGenCid = 1;
	(function (module, exports) {

		const CID = require$$0$1;
		const multicodec = require$$1$2;
		const multihashing = require$$2$1;

		exports = module.exports;

		exports.codec = multicodec.DAG_PB;
		exports.defaultHashAlg = multicodec.SHA2_256;

		/**
		 * Calculate the CID of the binary blob.
		 *
		 * @param {Object} binaryBlob - Encoded IPLD Node
		 * @param {Object} [userOptions] - Options to create the CID
		 * @param {number} [userOptions.cidVersion=1] - CID version number
		 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
		 * @returns {Promise.<CID>}
		 */
		const cid = async (binaryBlob, userOptions) => {
		  const defaultOptions = { cidVersion: 1, hashAlg: exports.defaultHashAlg };
		  const options = Object.assign(defaultOptions, userOptions);

		  const multihash = await multihashing(binaryBlob, options.hashAlg);
		  const codecName = multicodec.print[exports.codec];
		  const cid = new CID(options.cidVersion, codecName, multihash);

		  return cid
		};

		exports.cid = cid;
} (genCid$1, genCid$1.exports));
	return genCid$1.exports;
}

const DAGLink$1 = dagLink$1.exports;
const genCid = requireGenCid();

/*
 * toDAGLink converts a DAGNode to a DAGLink
 */
const toDAGLink = async (node, options = {}) => {
  const nodeCid = await genCid.cid(node.serialize(), options);
  return new DAGLink$1(options.name || '', node.size, nodeCid)
};

var toDagLink = toDAGLink;

var dagLink = {exports: {}};

var util$2 = {exports: {}};

(function (module, exports) {

	const DAGLink = dagLink$1.exports;

	function createDagLinkFromB58EncodedHash (link) {
	  return new DAGLink(
	    link.Name || link.name || '',
	    link.Tsize || link.Size || link.size || 0,
	    link.Hash || link.hash || link.multihash || link.cid
	  )
	}

	exports = module.exports;
	exports.createDagLinkFromB58EncodedHash = createDagLinkFromB58EncodedHash;
} (util$2, util$2.exports));

(function (module, exports) {

	exports = module.exports = dagLink$1.exports;
	exports.util = util$2.exports;
} (dagLink, dagLink.exports));

const sortLinks = sortLinks_1;
const DAGLink = dagLink.exports;

const asDAGLink = (link) => {
  if (DAGLink.isDAGLink(link)) {
    // It's a DAGLink instance
    // no need to do anything
    return link
  }

  // DAGNode.isDagNode() would be more appropriate here, but it can't be used
  // as it would lead to circular dependencies as `addLink` is called from
  // within the DAGNode object.
  if (!('cid' in link ||
        'hash' in link ||
        'Hash' in link ||
        'multihash' in link)) {
    throw new Error('Link must be a DAGLink or DAGLink-like. Convert the DAGNode into a DAGLink via `node.toDAGLink()`.')
  }

  // It's a Object with name, multihash/hash/cid and size
  return new DAGLink(link.Name || link.name, link.Tsize || link.size, link.Hash || link.multihash || link.hash || link.cid)
};

const addLink = (node, link) => {
  const dagLink = asDAGLink(link);
  node.Links.push(dagLink);
  sortLinks(node.Links);
};

var addLink_1 = addLink;

const CID$1 = require$$0$1;
const uint8ArrayEquals = require$$1$3;

const rmLink = (dagNode, nameOrCid) => {
  let predicate = null;

  // It's a name
  if (typeof nameOrCid === 'string') {
    predicate = (link) => link.Name === nameOrCid;
  } else if (nameOrCid instanceof Uint8Array || CID$1.isCID(nameOrCid)) {
    predicate = (link) => uint8ArrayEquals(link.Hash, nameOrCid);
  }

  if (predicate) {
    const links = dagNode.Links;
    let index = 0;
    while (index < links.length) {
      const link = links[index];
      if (predicate(link)) {
        links.splice(index, 1);
      } else {
        index++;
      }
    }
  } else {
    throw new Error('second arg needs to be a name or CID')
  }
};

var rmLink_1 = rmLink;

(function (module, exports) {

	const withIs = require$$1$1;
	const sortLinks = sortLinks_1;
	const DAGLink = dagLink$1.exports;
	const { serializeDAGNode } = requireSerialize();
	const toDAGLink = toDagLink;
	const addLink = addLink_1;
	const rmLink = rmLink_1;
	const uint8ArrayFromString = require$$2;
	const uint8ArrayToString = require$$8;

	class DAGNode {
	  constructor (data, links = [], serializedSize = null) {
	    if (!data) {
	      data = new Uint8Array(0);
	    }
	    if (typeof data === 'string') {
	      data = uint8ArrayFromString(data);
	    }

	    if (!(data instanceof Uint8Array)) {
	      throw new Error('Passed \'data\' is not a Uint8Array or a String!')
	    }

	    if (serializedSize !== null && typeof serializedSize !== 'number') {
	      throw new Error('Passed \'serializedSize\' must be a number!')
	    }

	    links = links.map((link) => {
	      return DAGLink.isDAGLink(link)
	        ? link
	        : DAGLink.util.createDagLinkFromB58EncodedHash(link)
	    });
	    sortLinks(links);

	    Object.defineProperties(this, {
	      Data: { value: data, writable: false, enumerable: true },
	      Links: { value: links, writable: false, enumerable: true },
	      _serializedSize: { value: serializedSize, writable: true, enumerable: false },
	      _size: { value: null, writable: true, enumerable: false }
	    });
	  }

	  toJSON () {
	    if (!this._json) {
	      this._json = Object.freeze({
	        data: this.Data,
	        links: this.Links.map((l) => l.toJSON()),
	        size: this.size
	      });
	    }

	    return Object.assign({}, this._json)
	  }

	  toString () {
	    return `DAGNode <data: "${uint8ArrayToString(this.Data, 'base64urlpad')}", links: ${this.Links.length}, size: ${this.size}>`
	  }

	  _invalidateCached () {
	    this._serializedSize = null;
	    this._size = null;
	  }

	  addLink (link) {
	    this._invalidateCached();
	    return addLink(this, link)
	  }

	  rmLink (link) {
	    this._invalidateCached();
	    return rmLink(this, link)
	  }

	  // @returns {Promise.<DAGLink>}
	  toDAGLink (options) {
	    return toDAGLink(this, options)
	  }

	  serialize () {
	    return serializeDAGNode(this)
	  }

	  get size () {
	    if (this._size === null) {
	      if (this._serializedSize === null) {
	        this._serializedSize = this.serialize().length;
	      }
	      this._size = this.Links.reduce((sum, l) => sum + l.Tsize, this._serializedSize);
	    }

	    return this._size
	  }

	  set size (size) {
	    throw new Error("Can't set property: 'size' is immutable")
	  }
	}

	module.exports = withIs(DAGNode, { className: 'DAGNode', symbolName: '@ipld/js-ipld-dag-pb/dagnode' });
} (dagNode));

(function (module, exports) {

	module.exports = dagNode.exports;
} (dagNode$1));

var resolver = {};

var util$1 = {exports: {}};

(function (module, exports) {

	const protons = require$$0$2;
	const proto = protons(requireDag_proto());
	const DAGLink = dagLink$1.exports;
	const DAGNode = dagNode.exports;
	const { serializeDAGNodeLike } = requireSerialize();
	const genCid = requireGenCid();

	exports = module.exports;

	exports.codec = genCid.codec;
	exports.defaultHashAlg = genCid.defaultHashAlg;

	/**
	 * Calculate the CID of the binary blob.
	 *
	 * @param {Object} binaryBlob - Encoded IPLD Node
	 * @param {Object} [userOptions] - Options to create the CID
	 * @param {number} [userOptions.cidVersion=1] - CID version number
	 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
	 * @returns {Promise.<CID>}
	 */
	const cid = (binaryBlob, userOptions) => {
	  return genCid.cid(binaryBlob, userOptions)
	};

	/**
	 * Serialize internal representation into a binary PB block.
	 *
	 * @param {Object} node - Internal representation of a CBOR block
	 * @returns {Uint8Array} - The encoded binary representation
	 */
	const serialize = (node) => {
	  if (DAGNode.isDAGNode(node)) {
	    return node.serialize()
	  } else {
	    return serializeDAGNodeLike(node.Data, node.Links)
	  }
	};

	/**
	 * Deserialize PB block into the internal representation.
	 *
	 * @param {Uint8Array} buffer - Binary representation of a PB block
	 * @returns {Object} - An object that conforms to the IPLD Data Model
	 */
	const deserialize = (buffer) => {
	  const pbn = proto.PBNode.decode(buffer);

	  const links = pbn.Links.map((link) => {
	    return new DAGLink(link.Name, link.Tsize, link.Hash)
	  });

	  const data = pbn.Data == null ? new Uint8Array(0) : pbn.Data;

	  return new DAGNode(data, links, buffer.byteLength)
	};

	exports.serialize = serialize;
	exports.deserialize = deserialize;
	exports.cid = cid;
} (util$1, util$1.exports));

const CID = require$$0$1;

const util = util$1.exports;

/**
 * Resolves a path within a PB block.
 *
 * Returns the value or a link and the partial mising path. This way the
 * IPLD Resolver can fetch the link and continue to resolve.
 *
 * @param {Uint8Array} binaryBlob - Binary representation of a PB block
 * @param {string} [path='/'] - Path that should be resolved
 * @returns {Object} result - Result of the path it it was resolved successfully
 * @returns {*} result.value - Value the path resolves to
 * @returns {string} result.remainderPath - If the path resolves half-way to a
 *   link, then the `remainderPath` is the part after the link that can be used
 *   for further resolving
 */
resolver.resolve = (binaryBlob, path) => {
  let node = util.deserialize(binaryBlob);

  const parts = path.split('/').filter(Boolean);
  while (parts.length) {
    const key = parts.shift();
    if (node[key] === undefined) {
      // There might be a matching named link
      for (const link of node.Links) {
        if (link.Name === key) {
          return {
            value: link.Hash,
            remainderPath: parts.join('/')
          }
        }
      }

      // There wasn't even a matching named link
      throw new Error(`Object has no property '${key}'`)
    }

    node = node[key];
    if (CID.isCID(node)) {
      return {
        value: node,
        remainderPath: parts.join('/')
      }
    }
  }

  return {
    value: node,
    remainderPath: ''
  }
};

/**
 * Return all available paths of a block.
 *
 * @generator
 * @param {Uint8Array} binaryBlob - Binary representation of a PB block
 * @yields {string} - A single path
 */
resolver.tree = function * (binaryBlob) {
  const node = util.deserialize(binaryBlob);

  // There is always a `Data` and `Links` property
  yield 'Data';
  yield 'Links';
  for (let ii = 0; ii < node.Links.length; ii++) {
    yield `Links/${ii}`;
    yield `Links/${ii}/Name`;
    yield `Links/${ii}/Tsize`;
    yield `Links/${ii}/Hash`;
  }
};

(function (exports) {

	exports.DAGNode = dagNode$1.exports;
	exports.DAGLink = dagLink.exports;

	/*
	 * Functions to fulfil IPLD Format interface
	 * https://github.com/ipld/interface-ipld-format
	 */
	exports.resolver = resolver;
	exports.util = util$1.exports;
	exports.codec = exports.util.codec;
	exports.defaultHashAlg = exports.util.defaultHashAlg;
} (src));

export { src as default };
