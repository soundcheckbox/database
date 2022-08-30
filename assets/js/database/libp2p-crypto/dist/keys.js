import require$$0 from '../../protobufjs/dist/minimal.js';
import '../../node-forge/dist/asn1.js';
import '../../node-forge/dist/pbe.js';
import require$$2 from '../../node-forge/dist/forge.js';
import require$$1 from '../../err-code/dist/index.js';
import require$$3 from '../../uint8arrays/dist/from-string.js';
import require$$0$1 from '../../multibase/dist/index.js';
import require$$5 from '../../uint8arrays/dist/concat.js';
import require$$0$3 from '../../multihashing-async/dist/index.js';
import require$$2$1 from '../../uint8arrays/dist/equals.js';
import require$$3$1 from '../../uint8arrays/dist/to-string.js';
import '../../node-forge/dist/sha512.js';
import '../../node-forge/dist/ed25519.js';
import require$$0$2 from '../../iso-random-stream/dist/randomBytes.js';
import '../../node-forge/dist/rsa.js';
import '../../node-forge/dist/util.js';
import '../../node-forge/dist/jsbn.js';
import require$$3$2 from '../../multihashes/dist/index.js';
import require$$0$4 from '../../secp256k1/dist/index.js';
import secp256k1 from '../../libp2p-crypto-secp256k1/dist/index.js'
/*eslint-disable*/

var $protobuf = require$$0;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["libp2p-crypto-keys"] || ($protobuf.roots["libp2p-crypto-keys"] = {});


/**
 * KeyType enum.
 * @exports KeyType
 * @enum {number}
 * @property {number} RSA=0 RSA value
 * @property {number} Ed25519=1 Ed25519 value
 * @property {number} Secp256k1=2 Secp256k1 value
 */
$root.KeyType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "RSA"] = 0;
    values[valuesById[1] = "Ed25519"] = 1;
    values[valuesById[2] = "Secp256k1"] = 2;
    return values;
})();

$root.PublicKey = (function() {

    /**
     * Properties of a PublicKey.
     * @exports IPublicKey
     * @interface IPublicKey
     * @property {KeyType} Type PublicKey Type
     * @property {Uint8Array} Data PublicKey Data
     */

    /**
     * Constructs a new PublicKey.
     * @exports PublicKey
     * @classdesc Represents a PublicKey.
     * @implements IPublicKey
     * @constructor
     * @param {IPublicKey=} [p] Properties to set
     */
    function PublicKey(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PublicKey Type.
     * @member {KeyType} Type
     * @memberof PublicKey
     * @instance
     */
    PublicKey.prototype.Type = 0;

    /**
     * PublicKey Data.
     * @member {Uint8Array} Data
     * @memberof PublicKey
     * @instance
     */
    PublicKey.prototype.Data = $util.newBuffer([]);

    /**
     * Encodes the specified PublicKey message. Does not implicitly {@link PublicKey.verify|verify} messages.
     * @function encode
     * @memberof PublicKey
     * @static
     * @param {IPublicKey} m PublicKey message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PublicKey.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.Type);
        w.uint32(18).bytes(m.Data);
        return w;
    };

    /**
     * Decodes a PublicKey message from the specified reader or buffer.
     * @function decode
     * @memberof PublicKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PublicKey} PublicKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PublicKey.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PublicKey();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Type = r.int32();
                break;
            case 2:
                m.Data = r.bytes();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", { instance: m });
        if (!m.hasOwnProperty("Data"))
            throw $util.ProtocolError("missing required 'Data'", { instance: m });
        return m;
    };

    /**
     * Creates a PublicKey message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PublicKey
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PublicKey} PublicKey
     */
    PublicKey.fromObject = function fromObject(d) {
        if (d instanceof $root.PublicKey)
            return d;
        var m = new $root.PublicKey();
        switch (d.Type) {
        case "RSA":
        case 0:
            m.Type = 0;
            break;
        case "Ed25519":
        case 1:
            m.Type = 1;
            break;
        case "Secp256k1":
        case 2:
            m.Type = 2;
            break;
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
     * Creates a plain object from a PublicKey message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PublicKey
     * @static
     * @param {PublicKey} m PublicKey
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PublicKey.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.Type = o.enums === String ? "RSA" : 0;
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
            d.Type = o.enums === String ? $root.KeyType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        return d;
    };

    /**
     * Converts this PublicKey to JSON.
     * @function toJSON
     * @memberof PublicKey
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PublicKey.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PublicKey;
})();

$root.PrivateKey = (function() {

    /**
     * Properties of a PrivateKey.
     * @exports IPrivateKey
     * @interface IPrivateKey
     * @property {KeyType} Type PrivateKey Type
     * @property {Uint8Array} Data PrivateKey Data
     */

    /**
     * Constructs a new PrivateKey.
     * @exports PrivateKey
     * @classdesc Represents a PrivateKey.
     * @implements IPrivateKey
     * @constructor
     * @param {IPrivateKey=} [p] Properties to set
     */
    function PrivateKey(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PrivateKey Type.
     * @member {KeyType} Type
     * @memberof PrivateKey
     * @instance
     */
    PrivateKey.prototype.Type = 0;

    /**
     * PrivateKey Data.
     * @member {Uint8Array} Data
     * @memberof PrivateKey
     * @instance
     */
    PrivateKey.prototype.Data = $util.newBuffer([]);

    /**
     * Encodes the specified PrivateKey message. Does not implicitly {@link PrivateKey.verify|verify} messages.
     * @function encode
     * @memberof PrivateKey
     * @static
     * @param {IPrivateKey} m PrivateKey message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PrivateKey.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.Type);
        w.uint32(18).bytes(m.Data);
        return w;
    };

    /**
     * Decodes a PrivateKey message from the specified reader or buffer.
     * @function decode
     * @memberof PrivateKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PrivateKey} PrivateKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PrivateKey.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PrivateKey();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Type = r.int32();
                break;
            case 2:
                m.Data = r.bytes();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", { instance: m });
        if (!m.hasOwnProperty("Data"))
            throw $util.ProtocolError("missing required 'Data'", { instance: m });
        return m;
    };

    /**
     * Creates a PrivateKey message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PrivateKey
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PrivateKey} PrivateKey
     */
    PrivateKey.fromObject = function fromObject(d) {
        if (d instanceof $root.PrivateKey)
            return d;
        var m = new $root.PrivateKey();
        switch (d.Type) {
        case "RSA":
        case 0:
            m.Type = 0;
            break;
        case "Ed25519":
        case 1:
            m.Type = 1;
            break;
        case "Secp256k1":
        case 2:
            m.Type = 2;
            break;
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
     * Creates a plain object from a PrivateKey message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PrivateKey
     * @static
     * @param {PrivateKey} m PrivateKey
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PrivateKey.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.Type = o.enums === String ? "RSA" : 0;
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
            d.Type = o.enums === String ? $root.KeyType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        return d;
    };

    /**
     * Converts this PrivateKey to JSON.
     * @function toJSON
     * @memberof PrivateKey
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PrivateKey.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PrivateKey;
})();

var keys$1 = $root;

var webcrypto$2 = {};

/* eslint-env browser */

// Check native crypto exists and is enabled (In insecure context `self.crypto`
// exists but `self.crypto.subtle` does not).
webcrypto$2.get = (win = self) => {
  const nativeCrypto = win.crypto || win.msCrypto;

  if (!nativeCrypto || !nativeCrypto.subtle) {
    throw Object.assign(
      new Error(
        'Missing Web Crypto API. ' +
        'The most likely cause of this error is that this page is being accessed ' +
        'from an insecure context (i.e. not HTTPS). For more information and ' +
        'possible resolutions see ' +
        'https://github.com/libp2p/js-libp2p-crypto/blob/master/README.md#web-crypto-api'
      ),
      { code: 'ERR_MISSING_WEB_CRYPTO' }
    )
  }

  return nativeCrypto
};

const concat = require$$5;
const fromString = require$$3;

const webcrypto$1 = webcrypto$2;

// Based off of code from https://github.com/luke-park/SecureCompatibleEncryptionExamples

/**
 *
 * @param {object} [options]
 * @param {string} [options.algorithm=AES-GCM]
 * @param {number} [options.nonceLength=12]
 * @param {number} [options.keyLength=16]
 * @param {string} [options.digest=sha256]
 * @param {number} [options.saltLength=16]
 * @param {number} [options.iterations=32767]
 * @returns {*}
 */
function create ({
  algorithm = 'AES-GCM',
  nonceLength = 12,
  keyLength = 16,
  digest = 'SHA-256',
  saltLength = 16,
  iterations = 32767
} = {}) {
  const crypto = webcrypto$1.get();
  keyLength *= 8; // Browser crypto uses bits instead of bytes

  /**
   * Uses the provided password to derive a pbkdf2 key. The key
   * will then be used to encrypt the data.
   *
   * @param {Uint8Array} data - The data to decrypt
   * @param {string} password - A plain password
   * @returns {Promise<Uint8Array>}
   */
  async function encrypt (data, password) { // eslint-disable-line require-await
    const salt = crypto.getRandomValues(new Uint8Array(saltLength));
    const nonce = crypto.getRandomValues(new Uint8Array(nonceLength));
    const aesGcm = { name: algorithm, iv: nonce };

    // Derive a key using PBKDF2.
    const deriveParams = { name: 'PBKDF2', salt, iterations, hash: { name: digest } };
    const rawKey = await crypto.subtle.importKey('raw', fromString(password), { name: 'PBKDF2' }, false, ['deriveKey', 'deriveBits']);
    const cryptoKey = await crypto.subtle.deriveKey(deriveParams, rawKey, { name: algorithm, length: keyLength }, true, ['encrypt']);

    // Encrypt the string.
    const ciphertext = await crypto.subtle.encrypt(aesGcm, cryptoKey, data);
    return concat([salt, aesGcm.iv, new Uint8Array(ciphertext)])
  }

  /**
   * Uses the provided password to derive a pbkdf2 key. The key
   * will then be used to decrypt the data. The options used to create
   * this decryption cipher must be the same as those used to create
   * the encryption cipher.
   *
   * @param {Uint8Array} data - The data to decrypt
   * @param {string} password - A plain password
   * @returns {Promise<Uint8Array>}
   */
  async function decrypt (data, password) {
    const salt = data.slice(0, saltLength);
    const nonce = data.slice(saltLength, saltLength + nonceLength);
    const ciphertext = data.slice(saltLength + nonceLength);
    const aesGcm = { name: algorithm, iv: nonce };

    // Derive the key using PBKDF2.
    const deriveParams = { name: 'PBKDF2', salt, iterations, hash: { name: digest } };
    const rawKey = await crypto.subtle.importKey('raw', fromString(password), { name: 'PBKDF2' }, false, ['deriveKey', 'deriveBits']);
    const cryptoKey = await crypto.subtle.deriveKey(deriveParams, rawKey, { name: algorithm, length: keyLength }, true, ['decrypt']);

    // Decrypt the string.
    const plaintext = await crypto.subtle.decrypt(aesGcm, cryptoKey, ciphertext);
    return new Uint8Array(plaintext)
  }

  return {
    encrypt,
    decrypt
  }
}

var aesGcm_browser = {
  create
};

const multibase$1 = require$$0$1;
const ciphers$1 = aesGcm_browser;

var importer$1 = {
  /**
   * Attempts to decrypt a base64 encoded PrivateKey string
   * with the given password. The privateKey must have been exported
   * using the same password and underlying cipher (aes-gcm)
   *
   * @param {string} privateKey - A base64 encoded encrypted key
   * @param {string} password
   * @returns {Promise<Uint8Array>} The private key protobuf
   */
  import: async function (privateKey, password) {
    const base64 = multibase$1.names.base64;
    const encryptedKey = base64.decode(privateKey);
    const cipher = ciphers$1.create();
    return await cipher.decrypt(encryptedKey, password)
  }
};

var rsaBrowser = {};

const randomBytes$1 = require$$0$2;
const errcode$4 = require$$1;

var randomBytes_1 = function (length) {
  if (isNaN(length) || length <= 0) {
    throw errcode$4(new Error('random bytes length must be a Number bigger than 0'), 'ERR_INVALID_LENGTH')
  }
  return randomBytes$1(length)
};

var rsaUtils = {};

var util = {};

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	(function (exports) {
		const forge = require$$2;
		const uint8ArrayFromString = require$$3;
		const uint8ArrayToString = require$$3$1;
		const uint8ArrayConcat = require$$5;

		exports.bigIntegerToUintBase64url = (num, len) => {
		  // Call `.abs()` to convert to unsigned
		  let buf = Uint8Array.from(num.abs().toByteArray()); // toByteArray converts to big endian

		  // toByteArray() gives us back a signed array, which will include a leading 0
		  // byte if the most significant bit of the number is 1:
		  // https://docs.microsoft.com/en-us/windows/win32/seccertenroll/about-integer
		  // Our number will always be positive so we should remove the leading padding.
		  buf = buf[0] === 0 ? buf.slice(1) : buf;

		  if (len != null) {
		    if (buf.length > len) throw new Error('byte array longer than desired length')
		    buf = uint8ArrayConcat([new Uint8Array(len - buf.length), buf]);
		  }

		  return uint8ArrayToString(buf, 'base64url')
		};

		// Convert a base64url encoded string to a BigInteger
		exports.base64urlToBigInteger = str => {
		  const buf = exports.base64urlToBuffer(str);
		  return new forge.jsbn.BigInteger(uint8ArrayToString(buf, 'base16'), 16)
		};

		exports.base64urlToBuffer = (str, len) => {
		  let buf = uint8ArrayFromString(str, 'base64urlpad');

		  if (len != null) {
		    if (buf.length > len) throw new Error('byte array longer than desired length')
		    buf = uint8ArrayConcat([new Uint8Array(len - buf.length), buf]);
		  }

		  return buf
		};
} (util));
	return util;
}

const forge$3 = require$$2;
const { bigIntegerToUintBase64url, base64urlToBigInteger } = requireUtil();
const uint8ArrayFromString$2 = require$$3;
const uint8ArrayToString$3 = require$$3$1;

// Convert a PKCS#1 in ASN1 DER format to a JWK key
rsaUtils.pkcs1ToJwk = function (bytes) {
  const asn1 = forge$3.asn1.fromDer(uint8ArrayToString$3(bytes, 'ascii'));
  const privateKey = forge$3.pki.privateKeyFromAsn1(asn1);

  // https://tools.ietf.org/html/rfc7518#section-6.3.1
  return {
    kty: 'RSA',
    n: bigIntegerToUintBase64url(privateKey.n),
    e: bigIntegerToUintBase64url(privateKey.e),
    d: bigIntegerToUintBase64url(privateKey.d),
    p: bigIntegerToUintBase64url(privateKey.p),
    q: bigIntegerToUintBase64url(privateKey.q),
    dp: bigIntegerToUintBase64url(privateKey.dP),
    dq: bigIntegerToUintBase64url(privateKey.dQ),
    qi: bigIntegerToUintBase64url(privateKey.qInv),
    alg: 'RS256',
    kid: '2011-04-29'
  }
};

// Convert a JWK key into PKCS#1 in ASN1 DER format
rsaUtils.jwkToPkcs1 = function (jwk) {
  const asn1 = forge$3.pki.privateKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e),
    d: base64urlToBigInteger(jwk.d),
    p: base64urlToBigInteger(jwk.p),
    q: base64urlToBigInteger(jwk.q),
    dP: base64urlToBigInteger(jwk.dp),
    dQ: base64urlToBigInteger(jwk.dq),
    qInv: base64urlToBigInteger(jwk.qi)
  });

  return uint8ArrayFromString$2(forge$3.asn1.toDer(asn1).getBytes(), 'ascii')
};

// Convert a PKCIX in ASN1 DER format to a JWK key
rsaUtils.pkixToJwk = function (bytes) {
  const asn1 = forge$3.asn1.fromDer(uint8ArrayToString$3(bytes, 'ascii'));
  const publicKey = forge$3.pki.publicKeyFromAsn1(asn1);

  return {
    kty: 'RSA',
    n: bigIntegerToUintBase64url(publicKey.n),
    e: bigIntegerToUintBase64url(publicKey.e),
    alg: 'RS256',
    kid: '2011-04-29'
  }
};

// Convert a JWK key to PKCIX in ASN1 DER format
rsaUtils.jwkToPkix = function (jwk) {
  const asn1 = forge$3.pki.publicKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e)
  });

  return uint8ArrayFromString$2(forge$3.asn1.toDer(asn1).getBytes(), 'ascii')
};

var jwk2pem;
var hasRequiredJwk2pem;

function requireJwk2pem () {
	if (hasRequiredJwk2pem) return jwk2pem;
	hasRequiredJwk2pem = 1;


	const forge = require$$2;
	const { base64urlToBigInteger } = requireUtil();

	function convert (key, types) {
	  return types.map(t => base64urlToBigInteger(key[t]))
	}

	function jwk2priv (key) {
	  return forge.pki.setRsaPrivateKey(...convert(key, ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi']))
	}

	function jwk2pub (key) {
	  return forge.pki.setRsaPublicKey(...convert(key, ['n', 'e']))
	}

	jwk2pem = {
	  jwk2pub,
	  jwk2priv
	};
	return jwk2pem;
}

const webcrypto = webcrypto$2;
const randomBytes = randomBytes_1;
const uint8ArrayToString$2 = require$$3$1;
const uint8ArrayFromString$1 = require$$3;

rsaBrowser.utils = rsaUtils;

rsaBrowser.generateKey = async function (bits) {
  const pair = await webcrypto.get().subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: bits,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: 'SHA-256' }
    },
    true,
    ['sign', 'verify']
  );

  const keys = await exportKey(pair);

  return {
    privateKey: keys[0],
    publicKey: keys[1]
  }
};

// Takes a jwk key
rsaBrowser.unmarshalPrivateKey = async function (key) {
  const privateKey = await webcrypto.get().subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' }
    },
    true,
    ['sign']
  );

  const pair = [
    privateKey,
    await derivePublicFromPrivate(key)
  ];

  const keys = await exportKey({
    privateKey: pair[0],
    publicKey: pair[1]
  });

  return {
    privateKey: keys[0],
    publicKey: keys[1]
  }
};

rsaBrowser.getRandomValues = randomBytes;

rsaBrowser.hashAndSign = async function (key, msg) {
  const privateKey = await webcrypto.get().subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' }
    },
    false,
    ['sign']
  );

  const sig = await webcrypto.get().subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    privateKey,
    Uint8Array.from(msg)
  );

  return new Uint8Array(sig, sig.byteOffset, sig.byteLength)
};

rsaBrowser.hashAndVerify = async function (key, sig, msg) {
  const publicKey = await webcrypto.get().subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' }
    },
    false,
    ['verify']
  );

  return webcrypto.get().subtle.verify(
    { name: 'RSASSA-PKCS1-v1_5' },
    publicKey,
    sig,
    msg
  )
};

function exportKey (pair) {
  return Promise.all([
    webcrypto.get().subtle.exportKey('jwk', pair.privateKey),
    webcrypto.get().subtle.exportKey('jwk', pair.publicKey)
  ])
}

function derivePublicFromPrivate (jwKey) {
  return webcrypto.get().subtle.importKey(
    'jwk',
    {
      kty: jwKey.kty,
      n: jwKey.n,
      e: jwKey.e
    },
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' }
    },
    true,
    ['verify']
  )
}

/*

RSA encryption/decryption for the browser with webcrypto workarround
"bloody dark magic. webcrypto's why."

Explanation:
  - Convert JWK to nodeForge
  - Convert msg Uint8Array to nodeForge buffer: ByteBuffer is a "binary-string backed buffer", so let's make our Uint8Array a binary string
  - Convert resulting nodeForge buffer to Uint8Array: it returns a binary string, turn that into a Uint8Array

*/

const { jwk2pub, jwk2priv } = requireJwk2pem();

function convertKey (key, pub, msg, handle) {
  const fkey = pub ? jwk2pub(key) : jwk2priv(key);
  const fmsg = uint8ArrayToString$2(Uint8Array.from(msg), 'ascii');
  const fomsg = handle(fmsg, fkey);
  return uint8ArrayFromString$1(fomsg, 'ascii')
}

rsaBrowser.encrypt = function (key, msg) {
  return convertKey(key, true, msg, (msg, key) => key.encrypt(msg))
};

rsaBrowser.decrypt = function (key, msg) {
  return convertKey(key, false, msg, (msg, key) => key.decrypt(msg))
};

const multibase = require$$0$1;
const ciphers = aesGcm_browser;

var exporter$3 = {
  /**
   * Exports the given PrivateKey as a base64 encoded string.
   * The PrivateKey is encrypted via a password derived PBKDF2 key
   * leveraging the aes-gcm cipher algorithm.
   *
   * @param {Uint8Array} privateKey - The PrivateKey protobuf
   * @param {string} password
   * @returns {Promise<string>} A base64 encoded string
   */
  export: async function (privateKey, password) {
    const cipher = ciphers.create();
    const encryptedKey = await cipher.encrypt(privateKey, password);
    const base64 = multibase.names.base64;
    return base64.encode(encryptedKey)
  }
};

const sha$2 = require$$0$3;
const errcode$3 = require$$1;
const uint8ArrayEquals$2 = require$$2$1;
const uint8ArrayToString$1 = require$$3$1;



const forge$2 = require$$2;

const crypto$1 = rsaBrowser;
const pbm$1 = keys$1;
const exporter$2 = exporter$3;

class RsaPublicKey {
  constructor (key) {
    this._key = key;
  }

  async verify (data, sig) { // eslint-disable-line require-await
    return crypto$1.hashAndVerify(this._key, sig, data)
  }

  marshal () {
    return crypto$1.utils.jwkToPkix(this._key)
  }

  get bytes () {
    return pbm$1.PublicKey.encode({
      Type: pbm$1.KeyType.RSA,
      Data: this.marshal()
    }).finish()
  }

  encrypt (bytes) {
    return crypto$1.encrypt(this._key, bytes)
  }

  equals (key) {
    return uint8ArrayEquals$2(this.bytes, key.bytes)
  }

  async hash () { // eslint-disable-line require-await
    return sha$2.multihashing(this.bytes, 'sha2-256')
  }
}

class RsaPrivateKey {
  // key       - Object of the jwk format
  // publicKey - Uint8Array of the spki format
  constructor (key, publicKey) {
    this._key = key;
    this._publicKey = publicKey;
  }

  genSecret () {
    return crypto$1.getRandomValues(16)
  }

  async sign (message) { // eslint-disable-line require-await
    return crypto$1.hashAndSign(this._key, message)
  }

  get public () {
    if (!this._publicKey) {
      throw errcode$3(new Error('public key not provided'), 'ERR_PUBKEY_NOT_PROVIDED')
    }

    return new RsaPublicKey(this._publicKey)
  }

  decrypt (bytes) {
    return crypto$1.decrypt(this._key, bytes)
  }

  marshal () {
    return crypto$1.utils.jwkToPkcs1(this._key)
  }

  get bytes () {
    return pbm$1.PrivateKey.encode({
      Type: pbm$1.KeyType.RSA,
      Data: this.marshal()
    }).finish()
  }

  equals (key) {
    return uint8ArrayEquals$2(this.bytes, key.bytes)
  }

  async hash () { // eslint-disable-line require-await
    return sha$2.multihashing(this.bytes, 'sha2-256')
  }

  /**
   * Gets the ID of the key.
   *
   * The key id is the base58 encoding of the SHA-256 multihash of its public key.
   * The public key is a protobuf encoding containing a type and the DER encoding
   * of the PKCS SubjectPublicKeyInfo.
   *
   * @returns {Promise<string>}
   */
  async id () {
    const hash = await this.public.hash();
    return uint8ArrayToString$1(hash, 'base58btc')
  }

  /**
   * Exports the key into a password protected PEM format
   *
   * @param {string} password - The password to read the encrypted PEM
   * @param {string} [format=pkcs-8] - The format in which to export as
   */
  async export (password, format = 'pkcs-8') { // eslint-disable-line require-await
    if (format === 'pkcs-8') {
      const buffer = new forge$2.util.ByteBuffer(this.marshal());
      const asn1 = forge$2.asn1.fromDer(buffer);
      const privateKey = forge$2.pki.privateKeyFromAsn1(asn1);

      const options = {
        algorithm: 'aes256',
        count: 10000,
        saltSize: 128 / 8,
        prfAlgorithm: 'sha512'
      };
      return forge$2.pki.encryptRsaPrivateKey(privateKey, password, options)
    } else if (format === 'libp2p-key') {
      return exporter$2.export(this.bytes, password)
    } else {
      throw errcode$3(new Error(`export format '${format}' is not supported`), 'ERR_INVALID_EXPORT_FORMAT')
    }
  }
}

async function unmarshalRsaPrivateKey (bytes) {
  const jwk = crypto$1.utils.pkcs1ToJwk(bytes);
  const keys = await crypto$1.unmarshalPrivateKey(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey)
}

function unmarshalRsaPublicKey (bytes) {
  const jwk = crypto$1.utils.pkixToJwk(bytes);
  return new RsaPublicKey(jwk)
}

async function fromJwk (jwk) {
  const keys = await crypto$1.unmarshalPrivateKey(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey)
}

async function generateKeyPair$2 (bits) {
  const keys = await crypto$1.generateKey(bits);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey)
}

var rsaClass = {
  RsaPublicKey,
  RsaPrivateKey,
  unmarshalRsaPublicKey,
  unmarshalRsaPrivateKey,
  generateKeyPair: generateKeyPair$2,
  fromJwk
};

var ed25519 = {};

const forge$1 = require$$2;
ed25519.publicKeyLength = forge$1.pki.ed25519.constants.PUBLIC_KEY_BYTE_LENGTH;
ed25519.privateKeyLength = forge$1.pki.ed25519.constants.PRIVATE_KEY_BYTE_LENGTH;

ed25519.generateKey = async function () { // eslint-disable-line require-await
  return forge$1.pki.ed25519.generateKeyPair()
};

// seed should be a 32 byte uint8array
ed25519.generateKeyFromSeed = async function (seed) { // eslint-disable-line require-await
  return forge$1.pki.ed25519.generateKeyPair({ seed })
};

ed25519.hashAndSign = async function (key, msg) { // eslint-disable-line require-await
  return forge$1.pki.ed25519.sign({ message: msg, privateKey: key })
  // return Uint8Array.from(nacl.sign.detached(msg, key))
};

ed25519.hashAndVerify = async function (key, sig, msg) { // eslint-disable-line require-await
  return forge$1.pki.ed25519.verify({ signature: sig, message: msg, publicKey: key })
};

const sha$1 = require$$0$3;
const errcode$2 = require$$1;
const uint8ArrayEquals$1 = require$$2$1;
const mh = require$$3$2;
const crypto = ed25519;
const pbm = keys$1;
const exporter$1 = exporter$3;

class Ed25519PublicKey {
  constructor (key) {
    this._key = ensureKey(key, crypto.publicKeyLength);
  }

  async verify (data, sig) { // eslint-disable-line require-await
    return crypto.hashAndVerify(this._key, sig, data)
  }

  marshal () {
    return this._key
  }

  get bytes () {
    return pbm.PublicKey.encode({
      Type: pbm.KeyType.Ed25519,
      Data: this.marshal()
    }).finish()
  }

  equals (key) {
    return uint8ArrayEquals$1(this.bytes, key.bytes)
  }

  async hash () { // eslint-disable-line require-await
    return sha$1.multihashing(this.bytes, 'sha2-256')
  }
}

class Ed25519PrivateKey {
  // key       - 64 byte Uint8Array containing private key
  // publicKey - 32 byte Uint8Array containing public key
  constructor (key, publicKey) {
    this._key = ensureKey(key, crypto.privateKeyLength);
    this._publicKey = ensureKey(publicKey, crypto.publicKeyLength);
  }

  async sign (message) { // eslint-disable-line require-await
    return crypto.hashAndSign(this._key, message)
  }

  get public () {
    return new Ed25519PublicKey(this._publicKey)
  }

  marshal () {
    return this._key
  }

  get bytes () {
    return pbm.PrivateKey.encode({
      Type: pbm.KeyType.Ed25519,
      Data: this.marshal()
    }).finish()
  }

  equals (key) {
    return uint8ArrayEquals$1(this.bytes, key.bytes)
  }

  async hash () { // eslint-disable-line require-await
    return sha$1.multihashing(this.bytes, 'sha2-256')
  }

  /**
   * Gets the ID of the key.
   *
   * The key id is the base58 encoding of the SHA-256 multihash of its public key.
   * The public key is a protobuf encoding containing a type and the DER encoding
   * of the PKCS SubjectPublicKeyInfo.
   *
   * @returns {Promise<string>}
   */
  async id () {
    const encoding = mh.encode(this.public.bytes, 'identity');
    return await mh.toB58String(encoding)
  }

  /**
   * Exports the key into a password protected `format`
   *
   * @param {string} password - The password to encrypt the key
   * @param {string} [format=libp2p-key] - The format in which to export as
   * @returns {Promise<Uint8Array>} The encrypted private key
   */
  async export (password, format = 'libp2p-key') { // eslint-disable-line require-await
    if (format === 'libp2p-key') {
      return exporter$1.export(this.bytes, password)
    } else {
      throw errcode$2(new Error(`export format '${format}' is not supported`), 'ERR_INVALID_EXPORT_FORMAT')
    }
  }
}

function unmarshalEd25519PrivateKey (bytes) {
  // Try the old, redundant public key version
  if (bytes.length > crypto.privateKeyLength) {
    bytes = ensureKey(bytes, crypto.privateKeyLength + crypto.publicKeyLength);
    const privateKeyBytes = bytes.slice(0, crypto.privateKeyLength);
    const publicKeyBytes = bytes.slice(crypto.privateKeyLength, bytes.length);
    return new Ed25519PrivateKey(privateKeyBytes, publicKeyBytes)
  }

  bytes = ensureKey(bytes, crypto.privateKeyLength);
  const privateKeyBytes = bytes.slice(0, crypto.privateKeyLength);
  const publicKeyBytes = bytes.slice(crypto.publicKeyLength);
  return new Ed25519PrivateKey(privateKeyBytes, publicKeyBytes)
}

function unmarshalEd25519PublicKey (bytes) {
  bytes = ensureKey(bytes, crypto.publicKeyLength);
  return new Ed25519PublicKey(bytes)
}

async function generateKeyPair$1 () {
  const { privateKey, publicKey } = await crypto.generateKey();
  return new Ed25519PrivateKey(privateKey, publicKey)
}

async function generateKeyPairFromSeed$1 (seed) {
  const { privateKey, publicKey } = await crypto.generateKeyFromSeed(seed);
  return new Ed25519PrivateKey(privateKey, publicKey)
}

function ensureKey (key, length) {
  key = Uint8Array.from(key || []);
  if (key.length !== length) {
    throw errcode$2(new Error(`Key must be a Uint8Array of length ${length}, got ${key.length}`), 'ERR_INVALID_KEY_TYPE')
  }
  return key
}

var ed25519Class = {
  Ed25519PublicKey,
  Ed25519PrivateKey,
  unmarshalEd25519PrivateKey,
  unmarshalEd25519PublicKey,
  generateKeyPair: generateKeyPair$1,
  generateKeyPairFromSeed: generateKeyPairFromSeed$1
};

var secp256k1_1;
var hasRequiredSecp256k1;

function requireSecp256k1 () {
	if (hasRequiredSecp256k1) return secp256k1_1;
	hasRequiredSecp256k1 = 1;

	const secp256k1 = require$$0$4;
	const sha = require$$0$3;
	const HASH_ALGORITHM = 'sha2-256';

	secp256k1_1 = (randomBytes) => {
	  const privateKeyLength = 32;

	  function generateKey () {
	    let privateKey;
	    do {
	      privateKey = randomBytes(32);
	    } while (!secp256k1.privateKeyVerify(privateKey))
	    return privateKey
	  }

	  async function hashAndSign (key, msg) {
	    const digest = await sha.digest(msg, HASH_ALGORITHM);
	    const sig = secp256k1.ecdsaSign(digest, key);
	    return secp256k1.signatureExport(sig.signature)
	  }

	  async function hashAndVerify (key, sig, msg) {
	    const digest = await sha.digest(msg, HASH_ALGORITHM);
	    sig = secp256k1.signatureImport(sig);
	    return secp256k1.ecdsaVerify(sig, digest, key)
	  }

	  function compressPublicKey (key) {
	    if (!secp256k1.publicKeyVerify(key)) {
	      throw new Error('Invalid public key')
	    }
	    return secp256k1.publicKeyConvert(key, true)
	  }

	  function decompressPublicKey (key) {
	    return secp256k1.publicKeyConvert(key, false)
	  }

	  function validatePrivateKey (key) {
	    if (!secp256k1.privateKeyVerify(key)) {
	      throw new Error('Invalid private key')
	    }
	  }

	  function validatePublicKey (key) {
	    if (!secp256k1.publicKeyVerify(key)) {
	      throw new Error('Invalid public key')
	    }
	  }

	  function computePublicKey (privateKey) {
	    validatePrivateKey(privateKey);
	    return secp256k1.publicKeyCreate(privateKey)
	  }

	  return {
	    generateKey,
	    privateKeyLength,
	    hashAndSign,
	    hashAndVerify,
	    compressPublicKey,
	    decompressPublicKey,
	    validatePrivateKey,
	    validatePublicKey,
	    computePublicKey
	  }
	};
	return secp256k1_1;
}

const sha = require$$0$3;
const errcode$1 = require$$1;
const uint8ArrayEquals = require$$2$1;
const uint8ArrayToString = require$$3$1;

const exporter = exporter$3;
var secp256k1Class = secp256k1
// var secp256k1Class = (keysProtobuf, randomBytes, crypto) => {
//   crypto = crypto || requireSecp256k1()(randomBytes);
//
//   class Secp256k1PublicKey {
//     constructor (key) {
//       crypto.validatePublicKey(key);
//       this._key = key;
//     }
//
//     verify (data, sig) {
//       return crypto.hashAndVerify(this._key, sig, data)
//     }
//
//     marshal () {
//       return crypto.compressPublicKey(this._key)
//     }
//
//     get bytes () {
//       return keysProtobuf.PublicKey.encode({
//         Type: keysProtobuf.KeyType.Secp256k1,
//         Data: this.marshal()
//       }).finish()
//     }
//
//     equals (key) {
//       return uint8ArrayEquals(this.bytes, key.bytes)
//     }
//
//     hash () {
//       return sha.multihashing(this.bytes, 'sha2-256')
//     }
//   }
//
//   class Secp256k1PrivateKey {
//     constructor (key, publicKey) {
//       this._key = key;
//       this._publicKey = publicKey || crypto.computePublicKey(key);
//       crypto.validatePrivateKey(this._key);
//       crypto.validatePublicKey(this._publicKey);
//     }
//
//     sign (message) {
//       return crypto.hashAndSign(this._key, message)
//     }
//
//     get public () {
//         console.log('KEYS', {
//             this: this,
//             'this._publicKey': this._publicKey
//         })
//       return new Secp256k1PublicKey(this._publicKey)
//     }
//
//     marshal () {
//       return this._key
//     }
//
//     get bytes () {
//       return keysProtobuf.PrivateKey.encode({
//         Type: keysProtobuf.KeyType.Secp256k1,
//         Data: this.marshal()
//       }).finish()
//     }
//
//     equals (key) {
//       return uint8ArrayEquals(this.bytes, key.bytes)
//     }
//
//     hash () {
//       return sha.multihashing(this.bytes, 'sha2-256')
//     }
//
//     /**
//      * Gets the ID of the key.
//      *
//      * The key id is the base58 encoding of the SHA-256 multihash of its public key.
//      * The public key is a protobuf encoding containing a type and the DER encoding
//      * of the PKCS SubjectPublicKeyInfo.
//      *
//      * @returns {Promise<string>}
//      */
//     async id () {
//       const hash = await this.public.hash();
//       return uint8ArrayToString(hash, 'base58btc')
//     }
//
//     /**
//      * Exports the key into a password protected `format`
//      *
//      * @param {string} password - The password to encrypt the key
//      * @param {string} [format=libp2p-key] - The format in which to export as
//      * @returns {Promise<string>} The encrypted private key
//      */
//     async export (password, format = 'libp2p-key') { // eslint-disable-line require-await
//       if (format === 'libp2p-key') {
//         return exporter.export(this.bytes, password)
//       } else {
//         throw errcode$1(new Error(`export format '${format}' is not supported`), 'ERR_INVALID_EXPORT_FORMAT')
//       }
//     }
//   }
//
//   function unmarshalSecp256k1PrivateKey (bytes) {
//     return new Secp256k1PrivateKey(bytes)
//   }
//
//   function unmarshalSecp256k1PublicKey (bytes) {
//     return new Secp256k1PublicKey(bytes)
//   }
//
//   async function generateKeyPair () {
//     const privateKeyBytes = await crypto.generateKey();
//     return new Secp256k1PrivateKey(privateKeyBytes)
//   }
//
//   return {
//     Secp256k1PublicKey,
//     Secp256k1PrivateKey,
//     unmarshalSecp256k1PrivateKey,
//     unmarshalSecp256k1PublicKey,
//     generateKeyPair
//   }
// };

var indexBrowser = {};

var lengths;
var hasRequiredLengths;

function requireLengths () {
	if (hasRequiredLengths) return lengths;
	hasRequiredLengths = 1;

	lengths = {
	  SHA1: 20,
	  SHA256: 32,
	  SHA512: 64
	};
	return lengths;
}

var hasRequiredIndexBrowser;

function requireIndexBrowser () {
	if (hasRequiredIndexBrowser) return indexBrowser;
	hasRequiredIndexBrowser = 1;

	const webcrypto = webcrypto$2;
	const lengths = requireLengths();

	const hashTypes = {
	  SHA1: 'SHA-1',
	  SHA256: 'SHA-256',
	  SHA512: 'SHA-512'
	};

	const sign = async (key, data) => {
	  const buf = await webcrypto.get().subtle.sign({ name: 'HMAC' }, key, data);
	  return new Uint8Array(buf, buf.byteOffset, buf.byteLength)
	};

	indexBrowser.create = async function (hashType, secret) {
	  const hash = hashTypes[hashType];

	  const key = await webcrypto.get().subtle.importKey(
	    'raw',
	    secret,
	    {
	      name: 'HMAC',
	      hash: { name: hash }
	    },
	    false,
	    ['sign']
	  );

	  return {
	    async digest (data) { // eslint-disable-line require-await
	      return sign(key, data)
	    },
	    length: lengths[hashType]
	  }
	};
	return indexBrowser;
}

var keyStretcher;
var hasRequiredKeyStretcher;

function requireKeyStretcher () {
	if (hasRequiredKeyStretcher) return keyStretcher;
	hasRequiredKeyStretcher = 1;

	const errcode = require$$1;
	const uint8ArrayConcat = require$$5;
	const uint8ArrayFromString = require$$3;
	const hmac = requireIndexBrowser();

	const cipherMap = {
	  'AES-128': {
	    ivSize: 16,
	    keySize: 16
	  },
	  'AES-256': {
	    ivSize: 16,
	    keySize: 32
	  },
	  Blowfish: {
	    ivSize: 8,
	    cipherKeySize: 32
	  }
	};

	// Generates a set of keys for each party by stretching the shared key.
	// (myIV, theirIV, myCipherKey, theirCipherKey, myMACKey, theirMACKey)
	keyStretcher = async (cipherType, hash, secret) => {
	  const cipher = cipherMap[cipherType];

	  if (!cipher) {
	    const allowed = Object.keys(cipherMap).join(' / ');
	    throw errcode(new Error(`unknown cipher type '${cipherType}'. Must be ${allowed}`), 'ERR_INVALID_CIPHER_TYPE')
	  }

	  if (!hash) {
	    throw errcode(new Error('missing hash type'), 'ERR_MISSING_HASH_TYPE')
	  }

	  const cipherKeySize = cipher.keySize;
	  const ivSize = cipher.ivSize;
	  const hmacKeySize = 20;
	  const seed = uint8ArrayFromString('key expansion');
	  const resultLength = 2 * (ivSize + cipherKeySize + hmacKeySize);

	  const m = await hmac.create(hash, secret);
	  let a = await m.digest(seed);

	  const result = [];
	  let j = 0;

	  while (j < resultLength) {
	    const b = await m.digest(uint8ArrayConcat([a, seed]));
	    let todo = b.length;

	    if (j + todo > resultLength) {
	      todo = resultLength - j;
	    }

	    result.push(b);
	    j += todo;
	    a = await m.digest(a);
	  }

	  const half = resultLength / 2;
	  const resultBuffer = uint8ArrayConcat(result);
	  const r1 = resultBuffer.slice(0, half);
	  const r2 = resultBuffer.slice(half, resultLength);

	  const createKey = (res) => ({
	    iv: res.slice(0, ivSize),
	    cipherKey: res.slice(ivSize, ivSize + cipherKeySize),
	    macKey: res.slice(ivSize + cipherKeySize)
	  });

	  return {
	    k1: createKey(r1),
	    k2: createKey(r2)
	  }
	};
	return keyStretcher;
}

var ecdhBrowser = {};

var validateCurveType;
var hasRequiredValidateCurveType;

function requireValidateCurveType () {
	if (hasRequiredValidateCurveType) return validateCurveType;
	hasRequiredValidateCurveType = 1;

	const errcode = require$$1;

	validateCurveType = function (curveTypes, type) {
	  if (!curveTypes.includes(type)) {
	    const names = curveTypes.join(' / ');
	    throw errcode(new Error(`Unknown curve: ${type}. Must be ${names}`), 'ERR_INVALID_CURVE')
	  }
	};
	return validateCurveType;
}

var hasRequiredEcdhBrowser;

function requireEcdhBrowser () {
	if (hasRequiredEcdhBrowser) return ecdhBrowser;
	hasRequiredEcdhBrowser = 1;

	const errcode = require$$1;
	const webcrypto = webcrypto$2;
	const { base64urlToBuffer } = requireUtil();
	const validateCurveType = requireValidateCurveType();
	const uint8ArrayToString = require$$3$1;
	const uint8ArrayConcat = require$$5;
	const uint8ArrayEquals = require$$2$1;

	const bits = {
	  'P-256': 256,
	  'P-384': 384,
	  'P-521': 521
	};

	ecdhBrowser.generateEphmeralKeyPair = async function (curve) {
	  validateCurveType(Object.keys(bits), curve);
	  const pair = await webcrypto.get().subtle.generateKey(
	    {
	      name: 'ECDH',
	      namedCurve: curve
	    },
	    true,
	    ['deriveBits']
	  );

	  // forcePrivate is used for testing only
	  const genSharedKey = async (theirPub, forcePrivate) => {
	    let privateKey;

	    if (forcePrivate) {
	      privateKey = await webcrypto.get().subtle.importKey(
	        'jwk',
	        unmarshalPrivateKey(curve, forcePrivate),
	        {
	          name: 'ECDH',
	          namedCurve: curve
	        },
	        false,
	        ['deriveBits']
	      );
	    } else {
	      privateKey = pair.privateKey;
	    }

	    const keys = [
	      await webcrypto.get().subtle.importKey(
	        'jwk',
	        unmarshalPublicKey(curve, theirPub),
	        {
	          name: 'ECDH',
	          namedCurve: curve
	        },
	        false,
	        []
	      ),
	      privateKey
	    ];

	    const buffer = await webcrypto.get().subtle.deriveBits(
	      {
	        name: 'ECDH',
	        namedCurve: curve,
	        public: keys[0]
	      },
	      keys[1],
	      bits[curve]
	    );

	    return new Uint8Array(buffer, buffer.byteOffset, buffer.byteLength)
	  };

	  const publicKey = await webcrypto.get().subtle.exportKey('jwk', pair.publicKey);

	  return {
	    key: marshalPublicKey(publicKey),
	    genSharedKey
	  }
	};

	const curveLengths = {
	  'P-256': 32,
	  'P-384': 48,
	  'P-521': 66
	};

	// Marshal converts a jwk encodec ECDH public key into the
	// form specified in section 4.3.6 of ANSI X9.62. (This is the format
	// go-ipfs uses)
	function marshalPublicKey (jwk) {
	  const byteLen = curveLengths[jwk.crv];

	  return uint8ArrayConcat([
	    Uint8Array.from([4]), // uncompressed point
	    base64urlToBuffer(jwk.x, byteLen),
	    base64urlToBuffer(jwk.y, byteLen)
	  ], 1 + byteLen * 2)
	}

	// Unmarshal converts a point, serialized by Marshal, into an jwk encoded key
	function unmarshalPublicKey (curve, key) {
	  const byteLen = curveLengths[curve];

	  if (uint8ArrayEquals(!key.slice(0, 1), Uint8Array.from([4]))) {
	    throw errcode(new Error('Cannot unmarshal public key - invalid key format'), 'ERR_INVALID_KEY_FORMAT')
	  }

	  return {
	    kty: 'EC',
	    crv: curve,
	    x: uint8ArrayToString(key.slice(1, byteLen + 1), 'base64url'),
	    y: uint8ArrayToString(key.slice(1 + byteLen), 'base64url'),
	    ext: true
	  }
	}

	const unmarshalPrivateKey = (curve, key) => ({
	  ...unmarshalPublicKey(curve, key.public),
	  d: uint8ArrayToString(key.private, 'base64url')
	});
	return ecdhBrowser;
}

var ephemeralKeys;
var hasRequiredEphemeralKeys;

function requireEphemeralKeys () {
	if (hasRequiredEphemeralKeys) return ephemeralKeys;
	hasRequiredEphemeralKeys = 1;

	const ecdh = requireEcdhBrowser();

	// Generates an ephemeral public key and returns a function that will compute
	// the shared secret key.
	//
	// Focuses only on ECDH now, but can be made more general in the future.
	ephemeralKeys = async (curve) => ecdh.generateEphmeralKeyPair(curve); // eslint-disable-line require-await
	return ephemeralKeys;
}

const keysPBM = keys$1;


const forge = require$$2;
const errcode = require$$1;
const uint8ArrayFromString = require$$3;

const importer = importer$1;

const supportedKeys = {
  rsa: rsaClass,
  ed25519: ed25519Class,
  secp256k1: secp256k1Class(keysPBM, randomBytes_1)
};

const ErrMissingSecp256K1 = {
  message: 'secp256k1 support requires libp2p-crypto-secp256k1 package',
  code: 'ERR_MISSING_PACKAGE'
};

function typeToKey (type) {
  const key = supportedKeys[type.toLowerCase()];
  if (!key) {
    const supported = Object.keys(supportedKeys).join(' / ');
    throw errcode(new Error(`invalid or unsupported key type ${type}. Must be ${supported}`), 'ERR_UNSUPPORTED_KEY_TYPE')
  }
  return key
}

// Generates a keypair of the given type and bitsize
const generateKeyPair = async (type, bits, call) => { // eslint-disable-line require-await
    const key = typeToKey(type)
  return key.generateKeyPair(bits, call)
};

// Generates a keypair of the given type and bitsize
// seed is a 32 byte uint8array
const generateKeyPairFromSeed = async (type, seed, bits) => { // eslint-disable-line require-await
  const key = typeToKey(type);
  if (type.toLowerCase() !== 'ed25519') {
    throw errcode(new Error('Seed key derivation is unimplemented for RSA or secp256k1'), 'ERR_UNSUPPORTED_KEY_DERIVATION_TYPE')
  }
  return key.generateKeyPairFromSeed(seed, bits)
};

// Converts a protobuf serialized public key into its
// representative object
const unmarshalPublicKey = (buf) => {
  const decoded = keysPBM.PublicKey.decode(buf);
  const data = decoded.Data;

  switch (decoded.Type) {
    case keysPBM.KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPublicKey(data)
    case keysPBM.KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PublicKey(data)
    case keysPBM.KeyType.Secp256k1:
      if (supportedKeys.secp256k1) {
        return supportedKeys.secp256k1.unmarshalSecp256k1PublicKey(data)
      } else {
        throw errcode(new Error(ErrMissingSecp256K1.message), ErrMissingSecp256K1.code)
      }
    default:
      typeToKey(decoded.Type); // throws because type is not supported
  }
};

// Converts a public key object into a protobuf serialized public key
const marshalPublicKey = (key, type) => {
  type = (type || 'rsa').toLowerCase();
  typeToKey(type); // check type
  return key.bytes
};

// Converts a protobuf serialized private key into its
// representative object
const unmarshalPrivateKey = async (buf) => { // eslint-disable-line require-await
  const decoded = keysPBM.PrivateKey.decode(buf);
  const data = decoded.Data;

  switch (decoded.Type) {
    case keysPBM.KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPrivateKey(data)
    case keysPBM.KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PrivateKey(data)
    case keysPBM.KeyType.Secp256k1:
      if (supportedKeys.secp256k1) {
        return supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey(data)
      } else {
        throw errcode(new Error(ErrMissingSecp256K1.message), ErrMissingSecp256K1.code)
      }
    default:
      typeToKey(decoded.Type); // throws because type is not supported
  }
};

// Converts a private key object into a protobuf serialized private key
const marshalPrivateKey = (key, type) => {
  type = (type || 'rsa').toLowerCase();
  typeToKey(type); // check type
  return key.bytes
};

/**
 *
 * @param {string} encryptedKey
 * @param {string} password
 */
const importKey = async (encryptedKey, password) => { // eslint-disable-line require-await
  try {
    const key = await importer.import(encryptedKey, password);
    return unmarshalPrivateKey(key)
  } catch (_) {
    // Ignore and try the old pem decrypt
  }

  // Only rsa supports pem right now
  const key = forge.pki.decryptRsaPrivateKey(encryptedKey, password);
  if (key === null) {
    throw errcode(new Error('Cannot read the key, most likely the password is wrong or not a RSA key'), 'ERR_CANNOT_DECRYPT_PEM')
  }
  let der = forge.asn1.toDer(forge.pki.privateKeyToAsn1(key));
  der = uint8ArrayFromString(der.getBytes(), 'ascii');
  return supportedKeys.rsa.unmarshalRsaPrivateKey(der)
};

var keys = {
  supportedKeys,
  keysPBM,
  keyStretcher: requireKeyStretcher(),
  generateEphemeralKeyPair: requireEphemeralKeys(),
  generateKeyPair,
  generateKeyPairFromSeed,
  unmarshalPublicKey,
  marshalPublicKey,
  unmarshalPrivateKey,
  marshalPrivateKey,
  import: importKey
};

export { keys as default };
