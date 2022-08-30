import require$$0 from '../../randombytes/dist/index.js';
import require$$1 from '../../create-hash/dist/index.js';
import require$$2 from '../../create-hmac/dist/index.js';
import require$$3 from '../../browserify-sign/dist/index.js';
import require$$4 from '../../pbkdf2/dist/index.js';
import require$$5 from '../../browserify-cipher/dist/index.js';
import require$$6 from '../../diffie-hellman/dist/index.js';
import require$$7 from '../../browserify-sign/dist/index.js';
import require$$8 from '../../create-ecdh/dist/index.js';
import require$$9 from '../../public-encrypt/dist/index.js';
import require$$10 from '../../randomfill/dist/index.js';

var cryptoBrowserify = {};

var Hmac;
var Hash;
var prng;
var pseudoRandomBytes;
var rng;

var randomBytes = cryptoBrowserify.randomBytes = rng = cryptoBrowserify.rng = pseudoRandomBytes = cryptoBrowserify.pseudoRandomBytes = prng = cryptoBrowserify.prng = require$$0;
var createHash = cryptoBrowserify.createHash = Hash = cryptoBrowserify.Hash = require$$1;
var createHmac = cryptoBrowserify.createHmac = Hmac = cryptoBrowserify.Hmac = require$$2;

var algos = require$$3;
var algoKeys = Object.keys(algos);
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys);
var getHashes = cryptoBrowserify.getHashes = function () {
  return hashes
};

var p = require$$4;
var pbkdf2 = cryptoBrowserify.pbkdf2 = p.pbkdf2;
var pbkdf2Sync = cryptoBrowserify.pbkdf2Sync = p.pbkdf2Sync;

var aes = require$$5;

var Cipher = cryptoBrowserify.Cipher = aes.Cipher;
var createCipher = cryptoBrowserify.createCipher = aes.createCipher;
var Cipheriv = cryptoBrowserify.Cipheriv = aes.Cipheriv;
var createCipheriv = cryptoBrowserify.createCipheriv = aes.createCipheriv;
var Decipher = cryptoBrowserify.Decipher = aes.Decipher;
var createDecipher = cryptoBrowserify.createDecipher = aes.createDecipher;
var Decipheriv = cryptoBrowserify.Decipheriv = aes.Decipheriv;
var createDecipheriv = cryptoBrowserify.createDecipheriv = aes.createDecipheriv;
var getCiphers = cryptoBrowserify.getCiphers = aes.getCiphers;
var listCiphers = cryptoBrowserify.listCiphers = aes.listCiphers;

var dh = require$$6;

var DiffieHellmanGroup = cryptoBrowserify.DiffieHellmanGroup = dh.DiffieHellmanGroup;
var createDiffieHellmanGroup = cryptoBrowserify.createDiffieHellmanGroup = dh.createDiffieHellmanGroup;
var getDiffieHellman = cryptoBrowserify.getDiffieHellman = dh.getDiffieHellman;
var createDiffieHellman = cryptoBrowserify.createDiffieHellman = dh.createDiffieHellman;
var DiffieHellman = cryptoBrowserify.DiffieHellman = dh.DiffieHellman;

var sign = require$$7;

var createSign = cryptoBrowserify.createSign = sign.createSign;
var Sign = cryptoBrowserify.Sign = sign.Sign;
var createVerify = cryptoBrowserify.createVerify = sign.createVerify;
var Verify = cryptoBrowserify.Verify = sign.Verify;

var createECDH = cryptoBrowserify.createECDH = require$$8;

var publicEncrypt = require$$9;

var publicEncrypt_1 = cryptoBrowserify.publicEncrypt = publicEncrypt.publicEncrypt;
var privateEncrypt = cryptoBrowserify.privateEncrypt = publicEncrypt.privateEncrypt;
var publicDecrypt = cryptoBrowserify.publicDecrypt = publicEncrypt.publicDecrypt;
var privateDecrypt = cryptoBrowserify.privateDecrypt = publicEncrypt.privateDecrypt;

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

var rf = require$$10;

var randomFill = cryptoBrowserify.randomFill = rf.randomFill;
var randomFillSync = cryptoBrowserify.randomFillSync = rf.randomFillSync;

var createCredentials = cryptoBrowserify.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
};

var constants = cryptoBrowserify.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
};

export { Cipher, Cipheriv, Decipher, Decipheriv, DiffieHellman, DiffieHellmanGroup, Hash, Hmac, Sign, Verify, constants, createCipher, createCipheriv, createCredentials, createDecipher, createDecipheriv, createDiffieHellman, createDiffieHellmanGroup, createECDH, createHash, createHmac, createSign, createVerify, cryptoBrowserify as default, getCiphers, getDiffieHellman, getHashes, listCiphers, pbkdf2, pbkdf2Sync, privateDecrypt, privateEncrypt, prng, pseudoRandomBytes, publicDecrypt, publicEncrypt_1 as publicEncrypt, randomBytes, randomFill, randomFillSync, rng };
