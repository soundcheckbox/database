import require$$0$3 from '../../multihashes/dist/index.js';
import require$$0$2 from '../../js-sha3/dist/index.js';
import require$$1 from '../../murmurhash3js/dist/index.js';
import require$$0 from '../../nodeify/dist/index.js';
import require$$0$1 from '../../blakejs/dist/index.js';
import buffer from '../../buffer/dist/index.js'
var Buffer = buffer.Buffer;
var utils$1 = {};

utils$1.toCallback = (doWork) => {
  return function (input, callback) {
    let res;
    try {
      res = doWork(input);
    } catch (err) {
      process.nextTick(callback, err);
      return
    }

    process.nextTick(callback, null, res);
  }
};

utils$1.toBuf = (doWork, other) => (input) => {
  let result = doWork(input, other);
  return Buffer.from(result, 'hex')
};

utils$1.fromString = (doWork, other) => (_input) => {
  const input = Buffer.isBuffer(_input) ? _input.toString() : _input;
  return doWork(input, other)
};

utils$1.fromNumberTo32BitBuf = (doWork, other) => (input) => {
  let number = doWork(input, other);
  const bytes = new Array(4);

  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff;
    number = number >> 8;
  }

  return Buffer.from(bytes)
};

/* global self */

const nodeify = require$$0;

const webCrypto = getWebCrypto();

function getWebCrypto () {
  if (self.crypto) {
    return self.crypto.subtle || self.crypto.webkitSubtle
  }

  if (self.msCrypto) {
    return self.msCrypto.subtle
  }
}

function webCryptoHash (type) {
  if (!webCrypto) {
    throw new Error('Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context')
  }

  return (data, callback) => {
    const res = webCrypto.digest({ name: type }, data);

    if (typeof res.then !== 'function') { // IE11
      res.onerror = () => {
        callback(new Error(`hashing data using ${type}`));
      };
      res.oncomplete = (e) => {
        callback(null, e.target.result);
      };
      return
    }

    nodeify(
      res.then((raw) => Buffer.from(new Uint8Array(raw))),
      callback
    );
  }
}

function sha1 (buf, callback) {
  webCryptoHash('SHA-1')(buf, callback);
}

function sha2256 (buf, callback) {
  webCryptoHash('SHA-256')(buf, callback);
}

function sha2512 (buf, callback) {
  webCryptoHash('SHA-512')(buf, callback);
}

var cryptoSha12 = {
  sha1: sha1,
  sha2256: sha2256,
  sha2512: sha2512
};

var blake_1;
var hasRequiredBlake;

function requireBlake () {
	if (hasRequiredBlake) return blake_1;
	hasRequiredBlake = 1;

	const blake = require$$0$1;

	const toCallback = utils$1.toCallback;

	const minB = 0xb201;
	const minS = 0xb241;

	const blake2b = {
	  init: blake.blake2bInit,
	  update: blake.blake2bUpdate,
	  digest: blake.blake2bFinal
	};

	const blake2s = {
	  init: blake.blake2sInit,
	  update: blake.blake2sUpdate,
	  digest: blake.blake2sFinal
	};

	const makeB2Hash = (size, hf) => toCallback((buf) => {
	  const ctx = hf.init(size, null);
	  hf.update(ctx, buf);
	  return Buffer.from(hf.digest(ctx))
	});

	blake_1 = (table) => {
	  for (let i = 0; i < 64; i++) {
	    table[minB + i] = makeB2Hash(i + 1, blake2b);
	  }
	  for (let i = 0; i < 32; i++) {
	    table[minS + i] = makeB2Hash(i + 1, blake2s);
	  }
	};
	return blake_1;
}

const sha3 = require$$0$2;
const murmur3 = require$$1;

const utils = utils$1;
const sha = cryptoSha12;

const toCallback = utils.toCallback;
const toBuf = utils.toBuf;
const fromString = utils.fromString;
const fromNumberTo32BitBuf = utils.fromNumberTo32BitBuf;

const dblSha2256 = (buf, cb) => {
  sha.sha2256(buf, (err, firstHash) => {
    if (err) {
      cb(err);
    }
    sha.sha2256((Buffer.from(firstHash)), cb);
  });
};

var crypto$1 = {
  sha1: sha.sha1,
  sha2256: sha.sha2256,
  sha2512: sha.sha2512,
  sha3512: toCallback(toBuf(sha3.sha3_512)),
  sha3384: toCallback(toBuf(sha3.sha3_384)),
  sha3256: toCallback(toBuf(sha3.sha3_256)),
  sha3224: toCallback(toBuf(sha3.sha3_224)),
  shake128: toCallback(toBuf(sha3.shake_128, 128)),
  shake256: toCallback(toBuf(sha3.shake_256, 256)),
  keccak224: toCallback(toBuf(sha3.keccak_224)),
  keccak256: toCallback(toBuf(sha3.keccak_256)),
  keccak384: toCallback(toBuf(sha3.keccak_384)),
  keccak512: toCallback(toBuf(sha3.keccak_512)),
  murmur3128: toCallback(toBuf(fromString(murmur3.x64.hash128))),
  murmur332: toCallback(fromNumberTo32BitBuf(fromString(murmur3.x86.hash32))),
  addBlake: requireBlake(),
  dblSha2256: dblSha2256
};

const multihash = require$$0$3;
const crypto = crypto$1;

var src = Multihashing;

/**
 * Hash the given `buf` using the algorithm specified
 * by `func`.
 *
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} func - The algorithm to use.
 * @param {number} [length] - Optionally trim the result to this length.
 * @param {function(Error, Buffer)} callback
 * @returns {undefined}
 */
function Multihashing (buf, func, length, callback) {
  if (typeof length === 'function') {
    callback = length;
    length = undefined;
  }

  if (!callback) {
    throw new Error('Missing callback')
  }

  Multihashing.digest(buf, func, length, (err, digest) => {
    if (err) {
      return callback(err)
    }

    callback(null, multihash.encode(digest, func, length));
  });
}

/**
 * The `buffer` module for easy use in the browser.
 *
 * @type {Buffer}
 */
Multihashing.Buffer = Buffer; // for browser things

/**
 * Expose multihash itself, to avoid silly double requires.
 */
Multihashing.multihash = multihash;

/**
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} func - The algorithm to use.
 * @param {number} [length] - Optionally trim the result to this length.
 * @param {function(Error, Buffer)} callback
 * @returns {undefined}
 */
Multihashing.digest = function (buf, func, length, callback) {
  if (typeof length === 'function') {
    callback = length;
    length = undefined;
  }

  if (!callback) {
    throw new Error('Missing callback')
  }

  let cb = callback;
  if (length) {
    cb = (err, digest) => {
      if (err) {
        return callback(err)
      }

      callback(null, digest.slice(0, length));
    };
  }

  let hash;
  try {
    hash = Multihashing.createHash(func);
  } catch (err) {
    return cb(err)
  }

  hash(buf, cb);
};

/**
 * @param {string|number} func
 *
 * @returns {function} - The to `func` corresponding hash function.
 */
Multihashing.createHash = function (func) {
  func = multihash.coerceCode(func);
  if (!Multihashing.functions[func]) {
    throw new Error('multihash function ' + func + ' not yet supported')
  }

  return Multihashing.functions[func]
};

/**
 * Mapping of multihash codes to their hashing functions.
 * @type {Object}
 */
Multihashing.functions = {
  // sha1
  0x11: crypto.sha1,
  // sha2-256
  0x12: crypto.sha2256,
  // sha2-512
  0x13: crypto.sha2512,
  // sha3-512
  0x14: crypto.sha3512,
  // sha3-384
  0x15: crypto.sha3384,
  // sha3-256
  0x16: crypto.sha3256,
  // sha3-224
  0x17: crypto.sha3224,
  // shake-128
  0x18: crypto.shake128,
  // shake-256
  0x19: crypto.shake256,
  // keccak-224
  0x1A: crypto.keccak224,
  // keccak-256
  0x1B: crypto.keccak256,
  // keccak-384
  0x1C: crypto.keccak384,
  // keccak-512
  0x1D: crypto.keccak512,
  // murmur3-128
  0x22: crypto.murmur3128,
  // murmur3-32
  0x23: crypto.murmur332,
  // dbl-sha2-256
  0x56: crypto.dblSha2256
};

// add blake functions
crypto.addBlake(Multihashing.functions);

Multihashing.validate = (data, hash, callback) => {
  let algo = multihash.decode(hash).name;
  Multihashing(data, algo, (err, newHash) => {
    if (err) return callback(err)
    callback(err, Buffer.compare(hash, newHash) === 0);
  });
};

export { src as default };
