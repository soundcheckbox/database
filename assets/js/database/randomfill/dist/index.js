import require$$0 from '../../safe-buffer/dist/index.js';
import require$$1 from '../../randombytes/dist/index.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var browser = {};

var randomFillSync_1;
var randomFill_1;

function oldBrowser () {
  throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
}
var safeBuffer = require$$0;
var randombytes = require$$1;
var Buffer = safeBuffer.Buffer;
var kBufferMaxLength = safeBuffer.kMaxLength;
var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto;
var kMaxUint32 = Math.pow(2, 32) - 1;
function assertOffset (offset, length) {
  if (typeof offset !== 'number' || offset !== offset) { // eslint-disable-line no-self-compare
    throw new TypeError('offset must be a number')
  }

  if (offset > kMaxUint32 || offset < 0) {
    throw new TypeError('offset must be a uint32')
  }

  if (offset > kBufferMaxLength || offset > length) {
    throw new RangeError('offset out of range')
  }
}

function assertSize (size, offset, length) {
  if (typeof size !== 'number' || size !== size) { // eslint-disable-line no-self-compare
    throw new TypeError('size must be a number')
  }

  if (size > kMaxUint32 || size < 0) {
    throw new TypeError('size must be a uint32')
  }

  if (size + offset > length || size > kBufferMaxLength) {
    throw new RangeError('buffer too small')
  }
}
if ((crypto && crypto.getRandomValues) || !process.browser) {
  randomFill_1 = browser.randomFill = randomFill;
  randomFillSync_1 = browser.randomFillSync = randomFillSync;
} else {
  randomFill_1 = browser.randomFill = oldBrowser;
  randomFillSync_1 = browser.randomFillSync = oldBrowser;
}
function randomFill (buf, offset, size, cb) {
  if (!Buffer.isBuffer(buf) && !(buf instanceof commonjsGlobal.Uint8Array)) {
    throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
  }

  if (typeof offset === 'function') {
    cb = offset;
    offset = 0;
    size = buf.length;
  } else if (typeof size === 'function') {
    cb = size;
    size = buf.length - offset;
  } else if (typeof cb !== 'function') {
    throw new TypeError('"cb" argument must be a function')
  }
  assertOffset(offset, buf.length);
  assertSize(size, offset, buf.length);
  return actualFill(buf, offset, size, cb)
}

function actualFill (buf, offset, size, cb) {
  if (process.browser) {
    var ourBuf = buf.buffer;
    var uint = new Uint8Array(ourBuf, offset, size);
    crypto.getRandomValues(uint);
    if (cb) {
      process.nextTick(function () {
        cb(null, buf);
      });
      return
    }
    return buf
  }
  if (cb) {
    randombytes(size, function (err, bytes) {
      if (err) {
        return cb(err)
      }
      bytes.copy(buf, offset);
      cb(null, buf);
    });
    return
  }
  var bytes = randombytes(size);
  bytes.copy(buf, offset);
  return buf
}
function randomFillSync (buf, offset, size) {
  if (typeof offset === 'undefined') {
    offset = 0;
  }
  if (!Buffer.isBuffer(buf) && !(buf instanceof commonjsGlobal.Uint8Array)) {
    throw new TypeError('"buf" argument must be a Buffer or Uint8Array')
  }

  assertOffset(offset, buf.length);

  if (size === undefined) size = buf.length - offset;

  assertSize(size, offset, buf.length);

  return actualFill(buf, offset, size)
}

export { browser as default, randomFill_1 as randomFill, randomFillSync_1 as randomFillSync };
