import require$$0 from '../../browserify-des/dist/index.js';
import require$$1 from '../../browserify-aes/dist/index.js';
import require$$2 from '../../browserify-aes/dist/modes.js';
import require$$3 from '../../browserify-des/dist/modes.js';
import require$$4 from '../../evp_bytestokey/dist/index.js';

var browser = {};

var getCiphers_1;
var Decipheriv;
var Decipher;
var Cipheriv;
var Cipher;
var DES = require$$0;
var aes = require$$1;
var aesModes = require$$2;
var desModes = require$$3;
var ebtk = require$$4;

function createCipher (suite, password) {
  suite = suite.toLowerCase();

  var keyLen, ivLen;
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key;
    ivLen = aesModes[suite].iv;
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8;
    ivLen = desModes[suite].iv;
  } else {
    throw new TypeError('invalid suite type')
  }

  var keys = ebtk(password, false, keyLen, ivLen);
  return createCipheriv(suite, keys.key, keys.iv)
}

function createDecipher (suite, password) {
  suite = suite.toLowerCase();

  var keyLen, ivLen;
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key;
    ivLen = aesModes[suite].iv;
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8;
    ivLen = desModes[suite].iv;
  } else {
    throw new TypeError('invalid suite type')
  }

  var keys = ebtk(password, false, keyLen, ivLen);
  return createDecipheriv(suite, keys.key, keys.iv)
}

function createCipheriv (suite, key, iv) {
  suite = suite.toLowerCase();
  if (aesModes[suite]) return aes.createCipheriv(suite, key, iv)
  if (desModes[suite]) return new DES({ key: key, iv: iv, mode: suite })

  throw new TypeError('invalid suite type')
}

function createDecipheriv (suite, key, iv) {
  suite = suite.toLowerCase();
  if (aesModes[suite]) return aes.createDecipheriv(suite, key, iv)
  if (desModes[suite]) return new DES({ key: key, iv: iv, mode: suite, decrypt: true })

  throw new TypeError('invalid suite type')
}

function getCiphers () {
  return Object.keys(desModes).concat(aes.getCiphers())
}

var createCipher_1 = browser.createCipher = Cipher = browser.Cipher = createCipher;
var createCipheriv_1 = browser.createCipheriv = Cipheriv = browser.Cipheriv = createCipheriv;
var createDecipher_1 = browser.createDecipher = Decipher = browser.Decipher = createDecipher;
var createDecipheriv_1 = browser.createDecipheriv = Decipheriv = browser.Decipheriv = createDecipheriv;
var listCiphers = browser.listCiphers = getCiphers_1 = browser.getCiphers = getCiphers;

export { Cipher, Cipheriv, Decipher, Decipheriv, createCipher_1 as createCipher, createCipheriv_1 as createCipheriv, createDecipher_1 as createDecipher, createDecipheriv_1 as createDecipheriv, browser as default, getCiphers_1 as getCiphers, listCiphers };
