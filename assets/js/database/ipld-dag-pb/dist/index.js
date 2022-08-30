import require$$0$1 from '../../cids/dist/index.js';
import require$$0 from '../../protobufjs/dist/minimal.js';
import require$$1 from '../../uint8arrays/dist/from-string.js';
import require$$0$2 from '../../stable/dist/index.js';
import require$$1$1 from '../../uint8arrays/dist/compare.js';
import require$$1$2 from '../../multicodec/dist/index.js';
import require$$2 from '../../multihashing-async/dist/index.js';
import require$$1$3 from '../../uint8arrays/dist/equals.js';
import require$$8 from '../../uint8arrays/dist/to-string.js';

var resolver$1 = {};

/*eslint-disable*/

var $protobuf = require$$0;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PBLink = (function() {

    /**
     * Properties of a PBLink.
     * @exports IPBLink
     * @interface IPBLink
     * @property {Uint8Array|null} [Hash] PBLink Hash
     * @property {string|null} [Name] PBLink Name
     * @property {number|null} [Tsize] PBLink Tsize
     */

    /**
     * Constructs a new PBLink.
     * @exports PBLink
     * @classdesc Represents a PBLink.
     * @implements IPBLink
     * @constructor
     * @param {IPBLink=} [p] Properties to set
     */
    function PBLink(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PBLink Hash.
     * @member {Uint8Array} Hash
     * @memberof PBLink
     * @instance
     */
    PBLink.prototype.Hash = $util.newBuffer([]);

    /**
     * PBLink Name.
     * @member {string} Name
     * @memberof PBLink
     * @instance
     */
    PBLink.prototype.Name = "";

    /**
     * PBLink Tsize.
     * @member {number} Tsize
     * @memberof PBLink
     * @instance
     */
    PBLink.prototype.Tsize = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Encodes the specified PBLink message. Does not implicitly {@link PBLink.verify|verify} messages.
     * @function encode
     * @memberof PBLink
     * @static
     * @param {IPBLink} m PBLink message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PBLink.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.Hash != null && Object.hasOwnProperty.call(m, "Hash"))
            w.uint32(10).bytes(m.Hash);
        if (m.Name != null && Object.hasOwnProperty.call(m, "Name"))
            w.uint32(18).string(m.Name);
        if (m.Tsize != null && Object.hasOwnProperty.call(m, "Tsize"))
            w.uint32(24).uint64(m.Tsize);
        return w;
    };

    /**
     * Decodes a PBLink message from the specified reader or buffer.
     * @function decode
     * @memberof PBLink
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PBLink} PBLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PBLink.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PBLink();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Hash = r.bytes();
                break;
            case 2:
                m.Name = r.string();
                break;
            case 3:
                m.Tsize = r.uint64();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a PBLink message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PBLink
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PBLink} PBLink
     */
    PBLink.fromObject = function fromObject(d) {
        if (d instanceof $root.PBLink)
            return d;
        var m = new $root.PBLink();
        if (d.Hash != null) {
            if (typeof d.Hash === "string")
                $util.base64.decode(d.Hash, m.Hash = $util.newBuffer($util.base64.length(d.Hash)), 0);
            else if (d.Hash.length)
                m.Hash = d.Hash;
        }
        if (d.Name != null) {
            m.Name = String(d.Name);
        }
        if (d.Tsize != null) {
            if ($util.Long)
                (m.Tsize = $util.Long.fromValue(d.Tsize)).unsigned = true;
            else if (typeof d.Tsize === "string")
                m.Tsize = parseInt(d.Tsize, 10);
            else if (typeof d.Tsize === "number")
                m.Tsize = d.Tsize;
            else if (typeof d.Tsize === "object")
                m.Tsize = new $util.LongBits(d.Tsize.low >>> 0, d.Tsize.high >>> 0).toNumber(true);
        }
        return m;
    };

    /**
     * Creates a plain object from a PBLink message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PBLink
     * @static
     * @param {PBLink} m PBLink
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PBLink.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if (o.bytes === String)
                d.Hash = "";
            else {
                d.Hash = [];
                if (o.bytes !== Array)
                    d.Hash = $util.newBuffer(d.Hash);
            }
            d.Name = "";
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.Tsize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.Tsize = o.longs === String ? "0" : 0;
        }
        if (m.Hash != null && m.hasOwnProperty("Hash")) {
            d.Hash = o.bytes === String ? $util.base64.encode(m.Hash, 0, m.Hash.length) : o.bytes === Array ? Array.prototype.slice.call(m.Hash) : m.Hash;
        }
        if (m.Name != null && m.hasOwnProperty("Name")) {
            d.Name = m.Name;
        }
        if (m.Tsize != null && m.hasOwnProperty("Tsize")) {
            if (typeof m.Tsize === "number")
                d.Tsize = o.longs === String ? String(m.Tsize) : m.Tsize;
            else
                d.Tsize = o.longs === String ? $util.Long.prototype.toString.call(m.Tsize) : o.longs === Number ? new $util.LongBits(m.Tsize.low >>> 0, m.Tsize.high >>> 0).toNumber(true) : m.Tsize;
        }
        return d;
    };

    /**
     * Converts this PBLink to JSON.
     * @function toJSON
     * @memberof PBLink
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PBLink.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PBLink;
})();

$root.PBNode = (function() {

    /**
     * Properties of a PBNode.
     * @exports IPBNode
     * @interface IPBNode
     * @property {Array.<IPBLink>|null} [Links] PBNode Links
     * @property {Uint8Array|null} [Data] PBNode Data
     */

    /**
     * Constructs a new PBNode.
     * @exports PBNode
     * @classdesc Represents a PBNode.
     * @implements IPBNode
     * @constructor
     * @param {IPBNode=} [p] Properties to set
     */
    function PBNode(p) {
        this.Links = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PBNode Links.
     * @member {Array.<IPBLink>} Links
     * @memberof PBNode
     * @instance
     */
    PBNode.prototype.Links = $util.emptyArray;

    /**
     * PBNode Data.
     * @member {Uint8Array} Data
     * @memberof PBNode
     * @instance
     */
    PBNode.prototype.Data = $util.newBuffer([]);

    /**
     * Encodes the specified PBNode message. Does not implicitly {@link PBNode.verify|verify} messages.
     * @function encode
     * @memberof PBNode
     * @static
     * @param {IPBNode} m PBNode message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PBNode.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
            w.uint32(10).bytes(m.Data);
        if (m.Links != null && m.Links.length) {
            for (var i = 0; i < m.Links.length; ++i)
                $root.PBLink.encode(m.Links[i], w.uint32(18).fork()).ldelim();
        }
        return w;
    };

    /**
     * Decodes a PBNode message from the specified reader or buffer.
     * @function decode
     * @memberof PBNode
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PBNode} PBNode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PBNode.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PBNode();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 2:
                if (!(m.Links && m.Links.length))
                    m.Links = [];
                m.Links.push($root.PBLink.decode(r, r.uint32()));
                break;
            case 1:
                m.Data = r.bytes();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a PBNode message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PBNode
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PBNode} PBNode
     */
    PBNode.fromObject = function fromObject(d) {
        if (d instanceof $root.PBNode)
            return d;
        var m = new $root.PBNode();
        if (d.Links) {
            if (!Array.isArray(d.Links))
                throw TypeError(".PBNode.Links: array expected");
            m.Links = [];
            for (var i = 0; i < d.Links.length; ++i) {
                if (typeof d.Links[i] !== "object")
                    throw TypeError(".PBNode.Links: object expected");
                m.Links[i] = $root.PBLink.fromObject(d.Links[i]);
            }
        }
        if (d.Data != null) {
            if (typeof d.Data === "string")
                $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
            else if (d.Data.length)
                m.Data = d.Data;
        }
        return m;
    };

    /**
     * Creates a plain object from a PBNode message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PBNode
     * @static
     * @param {PBNode} m PBNode
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PBNode.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.Links = [];
        }
        if (o.defaults) {
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.Links && m.Links.length) {
            d.Links = [];
            for (var j = 0; j < m.Links.length; ++j) {
                d.Links[j] = $root.PBLink.toObject(m.Links[j], o);
            }
        }
        return d;
    };

    /**
     * Converts this PBNode to JSON.
     * @function toJSON
     * @memberof PBNode
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PBNode.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PBNode;
})();

var dag = $root;

const CID$3 = require$$0$1;
const uint8ArrayFromString$1 = require$$1;

/**
 * Link represents an IPFS Merkle DAG Link between Nodes.
 */
class DAGLink$5 {
  /**
   * @param {string | undefined | null} name
   * @param {number} size
   * @param {CID | string | Uint8Array} cid
   */
  constructor (name, size, cid) {
    if (!cid) {
      throw new Error('A link requires a cid to point to')
    }

    // assert(size, 'A link requires a size')
    //  note - links should include size, but this assert is disabled
    //  for now to maintain consistency with go-ipfs pinset
    this.Name = name || '';
    this.Tsize = size;
    this.Hash = new CID$3(cid);

    Object.defineProperties(this, {
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
    if (this._nameBuf != null) {
      return this._nameBuf
    }

    this._nameBuf = uint8ArrayFromString$1(this.Name);
    return this._nameBuf
  }
}

var dagLink = DAGLink$5;

const sort = require$$0$2;
const uint8ArrayCompare = require$$1$1;

/**
 * @typedef {import('../dag-link/dagLink')} DAGLink
 */

/**
 *
 * @param {DAGLink} a
 * @param {DAGLink} b
 */
const linkSort = (a, b) => {
  const buf1 = a.nameAsBuffer;
  const buf2 = b.nameAsBuffer;

  return uint8ArrayCompare(buf1, buf2)
};

/**
 * Sorts links in place (mutating given array)
 *
 * @param {DAGLink[]} links
 * @returns {void}
 */
const sortLinks$2 = (links) => {
  sort.inplace(links, linkSort);
};

var sortLinks_1 = sortLinks$2;

const DAGLink$4 = dagLink;

/**
 * @param {*} link
 */
function createDagLinkFromB58EncodedHash$2 (link) {
  return new DAGLink$4(
    link.Name || link.name || '',
    link.Tsize || link.Size || link.size || 0,
    link.Hash || link.hash || link.multihash || link.cid
  )
}

var util$3 = {
  createDagLinkFromB58EncodedHash: createDagLinkFromB58EncodedHash$2
};

const protobuf = require$$0;
const {
  PBLink
} = dag;

const {
  createDagLinkFromB58EncodedHash: createDagLinkFromB58EncodedHash$1
} = util$3;

/**
 * @typedef {import('./dag-link/dagLink')} DAGLink
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 * @typedef {import('./types').SerializableDAGNode} SerializableDAGNode
 * @typedef {import('cids')} CID
 */

/**
 * @param { { Data?: Uint8Array, Links: (DAGLink | DAGLinkLike)[] }} node
 * @returns {SerializableDAGNode}
 */
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
 * @param {import('./dag-node/dagNode')} node - Internal representation of a PB block
 */
const serializeDAGNode$2 = (node) => {
  return encode(toProtoBuf(node))
};

/**
 * Serialize an object where the `Links` might not be a `DAGLink` instance yet
 *
 * @param {Uint8Array} [data]
 * @param {(DAGLink | string | DAGLinkLike)[]} [links]
 */
const serializeDAGNodeLike$1 = (data, links = []) => {
  const node = {
    Data: data,
    Links: links.map((link) => {
      return createDagLinkFromB58EncodedHash$1(link)
    })
  };

  return encode(toProtoBuf(node))
};

var serialize$1 = {
  serializeDAGNode: serializeDAGNode$2,
  serializeDAGNodeLike: serializeDAGNodeLike$1
};

/**
 * The fields in PBNode are the wrong way round - `id: 2` comes before
 * `id: 1`. protobufjs writes them out in id order but go-IPFS does not so
 * we have to use the protobuf.Writer interface directly to get the same
 * serialized form as go-IPFS
 *
 * @param {SerializableDAGNode} pbf
 */
function encode (pbf) {
  const writer = protobuf.Writer.create();

  if (pbf.Links != null) {
    for (let i = 0; i < pbf.Links.length; i++) {
      PBLink.encode(pbf.Links[i], writer.uint32(18).fork()).ldelim();
    }
  }

  if (pbf.Data != null) {
    writer.uint32(10).bytes(pbf.Data);
  }

  return writer.finish()
}

const CID$2 = require$$0$1;
const multicodec = require$$1$2;
const multihashing = require$$2;
const { multihash } = multihashing;

const codec = multicodec.DAG_PB;
const defaultHashAlg = multihash.names['sha2-256'];

/**
 * @typedef {object} GenCIDOptions - Options to create the CID
 * @property {CID.CIDVersion} [cidVersion=1] - CID version number
 * @property {multihashing.multihash.HashCode} [hashAlg=multihash.names['sha2-256']] - Defaults to the defaultHashAlg of the format
 */

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {GenCIDOptions} [userOptions] - Options to create the CID
 */
const cid$1 = async (binaryBlob, userOptions = {}) => {
  const options = {
    cidVersion: userOptions.cidVersion == null ? 1 : userOptions.cidVersion,
    hashAlg: userOptions.hashAlg == null ? defaultHashAlg : userOptions.hashAlg
  };

  const hashName = multihash.codes[options.hashAlg];
  const hash = await multihashing(binaryBlob, hashName);
  const codecName = multicodec.getNameFromCode(codec);
  const cid = new CID$2(options.cidVersion, codecName, hash);

  return cid
};

var genCid$2 = {
  codec,
  defaultHashAlg,
  cid: cid$1
};

const DAGLink$3 = dagLink;
const genCid$1 = genCid$2;

/**
 * toDAGLink converts a DAGNode to a DAGLink
 *
 * @typedef {import('../genCid').GenCIDOptions} GenCIDOptions
 *
 * @typedef {object} ToDagLinkExtraOptions
 * @property {string} [name]
 *
 * @typedef {GenCIDOptions & ToDagLinkExtraOptions} ToDagLinkOptions
 *
 * @param {import('./dagNode')} node
 * @param {ToDagLinkOptions} options
 */
const toDAGLink$1 = async (node, options = {}) => {
  const buf = node.serialize();
  const nodeCid = await genCid$1.cid(buf, options);
  return new DAGLink$3(options.name || '', node.size, nodeCid)
};

var toDagLink = toDAGLink$1;

const sortLinks$1 = sortLinks_1;
const DAGLink$2 = dagLink;

/**
 * @typedef {import('./dagNode')} DAGNode
 * @typedef {import('../types')} DAGLinkLike
 */

/**
 * @param {*} link
 * @returns {DAGLink}
 */
const asDAGLink = (link) => {
  if (link instanceof DAGLink$2) {
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
  // @ts-ignore
  return new DAGLink$2(link.Name || link.name, link.Tsize || link.size, link.Hash || link.multihash || link.hash || link.cid)
};

/**
 * @param {DAGNode} node
 * @param {DAGLink | DAGLinkLike} link
 */
const addLink$1 = (node, link) => {
  const dagLink = asDAGLink(link);
  node.Links.push(dagLink);
  sortLinks$1(node.Links);
};

var addLink_1 = addLink$1;

const CID$1 = require$$0$1;
const uint8ArrayEquals = require$$1$3;

/**
 * @typedef {import('../dag-link/dagLink')} DAGLink
 */

/**
 *
 * @param {import('./dagNode')} dagNode
 * @param {string | CID | Uint8Array | DAGLink} nameOrCid
 */
const rmLink$1 = (dagNode, nameOrCid) => {
  let predicate = null;

  // It's a name
  if (typeof nameOrCid === 'string') {
    predicate = (/** @type {DAGLink} */ link) => link.Name === nameOrCid;
  } else if (nameOrCid instanceof Uint8Array) {
    predicate = (/** @type {DAGLink} */ link) => uint8ArrayEquals(link.Hash.bytes, nameOrCid);
  } else if (CID$1.isCID(nameOrCid)) {
    predicate = (/** @type {DAGLink} */ link) => uint8ArrayEquals(link.Hash.bytes, nameOrCid.bytes);
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

var rmLink_1 = rmLink$1;

const sortLinks = sortLinks_1;
const DAGLink$1 = dagLink;
const { createDagLinkFromB58EncodedHash } = util$3;
const { serializeDAGNode: serializeDAGNode$1 } = serialize$1;
const toDAGLink = toDagLink;
const addLink = addLink_1;
const rmLink = rmLink_1;
const uint8ArrayFromString = require$$1;
const uint8ArrayToString = require$$8;

/**
 * @typedef {import('cids')} CID
 * @typedef {import('../types').DAGLinkLike} DAGLinkLike
 */

class DAGNode$1 {
  /**
   *@param {Uint8Array | string} [data]
   * @param {(DAGLink | DAGLinkLike)[]} links
   * @param {number | null} [serializedSize]
   */
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

    const sortedLinks = links.map((link) => {
      return link instanceof DAGLink$1
        ? link
        : createDagLinkFromB58EncodedHash(link)
    });
    sortLinks(sortedLinks);

    this.Data = data;
    this.Links = sortedLinks;

    Object.defineProperties(this, {
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

  /**
   * @param {DAGLink | import('../types').DAGLinkLike} link
   */
  addLink (link) {
    this._invalidateCached();
    return addLink(this, link)
  }

  /**
   * @param {DAGLink | string | CID} link
   */
  rmLink (link) {
    this._invalidateCached();
    return rmLink(this, link)
  }

  /**
   * @param {import('./toDagLink').ToDagLinkOptions} [options]
   */
  toDAGLink (options) {
    return toDAGLink(this, options)
  }

  serialize () {
    const buf = serializeDAGNode$1(this);

    this._serializedSize = buf.length;

    return buf
  }

  get size () {
    if (this._size == null) {
      let serializedSize;

      if (serializedSize == null) {
        this._serializedSize = this.serialize().length;
        serializedSize = this._serializedSize;
      }

      this._size = this.Links.reduce((sum, l) => sum + l.Tsize, serializedSize);
    }

    return this._size
  }

  set size (size) {
    throw new Error("Can't set property: 'size' is immutable")
  }
}

var dagNode = DAGNode$1;

const {
  PBNode
} = dag;
const DAGLink = dagLink;
const DAGNode = dagNode;
const { serializeDAGNode, serializeDAGNodeLike } = serialize$1;
const genCid = genCid$2;

/**
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 */

/**
 * Calculate the CID of the binary blob
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {import('./genCid').GenCIDOptions} [userOptions] - Options to create the CID
 */
const cid = (binaryBlob, userOptions) => {
  return genCid.cid(binaryBlob, userOptions)
};

/**
 * Serialize internal representation into a binary PB block
 *
 * @param {DAGNode | { Data?: Uint8Array, Links?: (DAGLink | DAGLinkLike)[]}} node
 */
const serialize = (node) => {
  if (node instanceof DAGNode) {
    return serializeDAGNode(node)
  } else {
    return serializeDAGNodeLike(node.Data, node.Links)
  }
};

/**
 * Deserialize PB block into the internal representation.
 *
 * @param {Uint8Array} buffer - Binary representation of a PB block
 */
const deserialize = (buffer) => {
  const message = PBNode.decode(buffer);
  const pbn = PBNode.toObject(message, {
    defaults: false,
    arrays: true,
    longs: Number,
    objects: false
  });

  /** @type {DAGLink[]} */
  const links = pbn.Links.map((/** @type {DAGLinkLike} */ link) => {
    // @ts-ignore
    return new DAGLink(link.Name, link.Tsize, link.Hash)
  });

  const data = pbn.Data == null ? new Uint8Array(0) : pbn.Data;

  return new DAGNode(data, links, buffer.byteLength)
};

var util$2 = {
  codec: genCid.codec,
  defaultHashAlg: genCid.defaultHashAlg,
  serialize,
  deserialize,
  cid
};

const CID = require$$0$1;

const util$1 = util$2;

/**
 * Resolves a path within a PB block.
 *
 * If the path resolves half-way to a link, then the `remainderPath` is the part
 * after the link that can be used for further resolving
 *
 * Returns the value or a link and the partial missing path. This way the
 * IPLD Resolver can fetch the link and continue to resolve.
 *
 * @param {Uint8Array} binaryBlob - Binary representation of a PB block
 * @param {string} [path='/'] - Path that should be resolved
 */
resolver$1.resolve = (binaryBlob, path = '/') => {
  let node = util$1.deserialize(binaryBlob);

  const parts = path.split('/').filter(Boolean);
  while (parts.length) {
    const key = parts.shift();
    // @ts-ignore
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

    // @ts-ignore
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
resolver$1.tree = function * (binaryBlob) {
  const node = util$1.deserialize(binaryBlob);

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

const resolver = resolver$1;
const util = util$2;
const DAGNodeClass = dagNode;
const DAGLinkClass = dagLink;

/**
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 * @typedef {import('./types').DAGNodeLike} DAGNodeLike
 * @typedef {import('./dag-node/dagNode')} DAGNode
 * @typedef {import('./dag-link/dagLink')} DAGLink
 */

/**
 * @type {import('./types').DAGNodeFormat}
 */
const format = {
  DAGNode: DAGNodeClass,
  DAGLink: DAGLinkClass,

  /**
   * Functions to fulfil IPLD Format interface
   * https://github.com/ipld/interface-ipld-format
   */
  resolver,
  util,
  codec: util.codec,
  defaultHashAlg: util.defaultHashAlg
};

var src = format;

export { src as default };
