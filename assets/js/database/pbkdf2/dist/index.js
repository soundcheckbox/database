import require$$0 from '../../safe-buffer/dist/index.js';
import require$$0$1 from '../../create-hmac/dist/index.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var browser = {};

var MAX_ALLOC = Math.pow(2, 30) - 1; // default in iojs

var precondition = function (iterations, keylen) {
  if (typeof iterations !== 'number') {
    throw new TypeError('Iterations not a number')
  }

  if (iterations < 0) {
    throw new TypeError('Bad iterations')
  }

  if (typeof keylen !== 'number') {
    throw new TypeError('Key length not a number')
  }

  if (keylen < 0 || keylen > MAX_ALLOC || keylen !== keylen) { /* eslint no-self-compare: 0 */
    throw new TypeError('Bad key length')
  }
};

var defaultEncoding$2;
/* istanbul ignore next */
if (commonjsGlobal.process && commonjsGlobal.process.browser) {
  defaultEncoding$2 = 'utf-8';
} else if (commonjsGlobal.process && commonjsGlobal.process.version) {
  var pVersionMajor = parseInt(process.version.split('.')[0].slice(1), 10);

  defaultEncoding$2 = pVersionMajor >= 6 ? 'utf-8' : 'binary';
} else {
  defaultEncoding$2 = 'utf-8';
}
var defaultEncoding_1 = defaultEncoding$2;

var Buffer$2 = require$$0.Buffer;

var toBuffer$2 = function (thing, encoding, name) {
  if (Buffer$2.isBuffer(thing)) {
    return thing
  } else if (typeof thing === 'string') {
    return Buffer$2.from(thing, encoding)
  } else if (ArrayBuffer.isView(thing)) {
    return Buffer$2.from(thing.buffer)
  } else {
    throw new TypeError(name + ' must be a string, a Buffer, a typed array or a DataView')
  }
};

var sizes = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  rmd160: 20,
  ripemd160: 20
};

var createHmac = require$$0$1;
var Buffer$1 = require$$0.Buffer;

var checkParameters$1 = precondition;
var defaultEncoding$1 = defaultEncoding_1;
var toBuffer$1 = toBuffer$2;

function pbkdf2$1 (password, salt, iterations, keylen, digest) {
  checkParameters$1(iterations, keylen);
  password = toBuffer$1(password, defaultEncoding$1, 'Password');
  salt = toBuffer$1(salt, defaultEncoding$1, 'Salt');

  digest = digest || 'sha1';

  var DK = Buffer$1.allocUnsafe(keylen);
  var block1 = Buffer$1.allocUnsafe(salt.length + 4);
  salt.copy(block1, 0, 0, salt.length);

  var destPos = 0;
  var hLen = sizes[digest];
  var l = Math.ceil(keylen / hLen);

  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length);

    var T = createHmac(digest, password).update(block1).digest();
    var U = T;

    for (var j = 1; j < iterations; j++) {
      U = createHmac(digest, password).update(U).digest();
      for (var k = 0; k < hLen; k++) T[k] ^= U[k];
    }

    T.copy(DK, destPos);
    destPos += hLen;
  }

  return DK
}

var sync$1 = pbkdf2$1;

var Buffer = require$$0.Buffer;

var checkParameters = precondition;
var defaultEncoding = defaultEncoding_1;
var sync = sync$1;
var toBuffer = toBuffer$2;

var ZERO_BUF;
var subtle = commonjsGlobal.crypto && commonjsGlobal.crypto.subtle;
var toBrowser = {
  sha: 'SHA-1',
  'sha-1': 'SHA-1',
  sha1: 'SHA-1',
  sha256: 'SHA-256',
  'sha-256': 'SHA-256',
  sha384: 'SHA-384',
  'sha-384': 'SHA-384',
  'sha-512': 'SHA-512',
  sha512: 'SHA-512'
};
var checks = [];
function checkNative (algo) {
  if (commonjsGlobal.process && !commonjsGlobal.process.browser) {
    return Promise.resolve(false)
  }
  if (!subtle || !subtle.importKey || !subtle.deriveBits) {
    return Promise.resolve(false)
  }
  if (checks[algo] !== undefined) {
    return checks[algo]
  }
  ZERO_BUF = ZERO_BUF || Buffer.alloc(8);
  var prom = browserPbkdf2(ZERO_BUF, ZERO_BUF, 10, 128, algo)
    .then(function () {
      return true
    }).catch(function () {
      return false
    });
  checks[algo] = prom;
  return prom
}
var nextTick;
function getNextTick () {
  if (nextTick) {
    return nextTick
  }
  if (commonjsGlobal.process && commonjsGlobal.process.nextTick) {
    nextTick = commonjsGlobal.process.nextTick;
  } else if (commonjsGlobal.queueMicrotask) {
    nextTick = commonjsGlobal.queueMicrotask;
  } else if (commonjsGlobal.setImmediate) {
    nextTick = commonjsGlobal.setImmediate;
  } else {
    nextTick = commonjsGlobal.setTimeout;
  }
  return nextTick
}
function browserPbkdf2 (password, salt, iterations, length, algo) {
  return subtle.importKey(
    'raw', password, { name: 'PBKDF2' }, false, ['deriveBits']
  ).then(function (key) {
    return subtle.deriveBits({
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: {
        name: algo
      }
    }, key, length << 3)
  }).then(function (res) {
    return Buffer.from(res)
  })
}

function resolvePromise (promise, callback) {
  promise.then(function (out) {
    getNextTick()(function () {
      callback(null, out);
    });
  }, function (e) {
    getNextTick()(function () {
      callback(e);
    });
  });
}
var async = function (password, salt, iterations, keylen, digest, callback) {
  if (typeof digest === 'function') {
    callback = digest;
    digest = undefined;
  }

  digest = digest || 'sha1';
  var algo = toBrowser[digest.toLowerCase()];

  if (!algo || typeof commonjsGlobal.Promise !== 'function') {
    getNextTick()(function () {
      var out;
      try {
        out = sync(password, salt, iterations, keylen, digest);
      } catch (e) {
        return callback(e)
      }
      callback(null, out);
    });
    return
  }

  checkParameters(iterations, keylen);
  password = toBuffer(password, defaultEncoding, 'Password');
  salt = toBuffer(salt, defaultEncoding, 'Salt');
  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')

  resolvePromise(checkNative(algo).then(function (resp) {
    if (resp) return browserPbkdf2(password, salt, iterations, keylen, algo)

    return sync(password, salt, iterations, keylen, digest)
  }), callback);
};

var pbkdf2 = browser.pbkdf2 = async;
var pbkdf2Sync = browser.pbkdf2Sync = sync$1;

export { browser as default, pbkdf2, pbkdf2Sync };
