import require$$0$2 from '../../parse-asn1/dist/index.js';
import require$$1$1 from '../../randombytes/dist/index.js';
import require$$0 from '../../create-hash/dist/index.js';
import require$$1 from '../../safe-buffer/dist/index.js';
import require$$0$1 from '../../bn.js/dist/index.js';
import require$$7 from '../../browserify-rsa/dist/index.js';

var browser = {};

var createHash$2 = require$$0;
var Buffer$3 = require$$1.Buffer;

var mgf$2 = function (seed, len) {
  var t = Buffer$3.alloc(0);
  var i = 0;
  var c;
  while (t.length < len) {
    c = i2ops(i++);
    t = Buffer$3.concat([t, createHash$2('sha1').update(seed).update(c).digest()]);
  }
  return t.slice(0, len)
};

function i2ops (c) {
  var out = Buffer$3.allocUnsafe(4);
  out.writeUInt32BE(c, 0);
  return out
}

var xor$2 = function xor (a, b) {
  var len = a.length;
  var i = -1;
  while (++i < len) {
    a[i] ^= b[i];
  }
  return a
};

var BN$2 = require$$0$1;
var Buffer$2 = require$$1.Buffer;

function withPublic$2 (paddedMsg, key) {
  return Buffer$2.from(paddedMsg
    .toRed(BN$2.mont(key.modulus))
    .redPow(new BN$2(key.publicExponent))
    .fromRed()
    .toArray())
}

var withPublic_1 = withPublic$2;

var parseKeys$1 = require$$0$2;
var randomBytes = require$$1$1;
var createHash$1 = require$$0;
var mgf$1 = mgf$2;
var xor$1 = xor$2;
var BN$1 = require$$0$1;
var withPublic$1 = withPublic_1;
var crt$1 = require$$7;
var Buffer$1 = require$$1.Buffer;

var publicEncrypt = function publicEncrypt (publicKey, msg, reverse) {
  var padding;
  if (publicKey.padding) {
    padding = publicKey.padding;
  } else if (reverse) {
    padding = 1;
  } else {
    padding = 4;
  }
  var key = parseKeys$1(publicKey);
  var paddedMsg;
  if (padding === 4) {
    paddedMsg = oaep$1(key, msg);
  } else if (padding === 1) {
    paddedMsg = pkcs1$1(key, msg, reverse);
  } else if (padding === 3) {
    paddedMsg = new BN$1(msg);
    if (paddedMsg.cmp(key.modulus) >= 0) {
      throw new Error('data too long for modulus')
    }
  } else {
    throw new Error('unknown padding')
  }
  if (reverse) {
    return crt$1(paddedMsg, key)
  } else {
    return withPublic$1(paddedMsg, key)
  }
};

function oaep$1 (key, msg) {
  var k = key.modulus.byteLength();
  var mLen = msg.length;
  var iHash = createHash$1('sha1').update(Buffer$1.alloc(0)).digest();
  var hLen = iHash.length;
  var hLen2 = 2 * hLen;
  if (mLen > k - hLen2 - 2) {
    throw new Error('message too long')
  }
  var ps = Buffer$1.alloc(k - mLen - hLen2 - 2);
  var dblen = k - hLen - 1;
  var seed = randomBytes(hLen);
  var maskedDb = xor$1(Buffer$1.concat([iHash, ps, Buffer$1.alloc(1, 1), msg], dblen), mgf$1(seed, dblen));
  var maskedSeed = xor$1(seed, mgf$1(maskedDb, hLen));
  return new BN$1(Buffer$1.concat([Buffer$1.alloc(1), maskedSeed, maskedDb], k))
}
function pkcs1$1 (key, msg, reverse) {
  var mLen = msg.length;
  var k = key.modulus.byteLength();
  if (mLen > k - 11) {
    throw new Error('message too long')
  }
  var ps;
  if (reverse) {
    ps = Buffer$1.alloc(k - mLen - 3, 0xff);
  } else {
    ps = nonZero(k - mLen - 3);
  }
  return new BN$1(Buffer$1.concat([Buffer$1.from([0, reverse ? 1 : 2]), ps, Buffer$1.alloc(1), msg], k))
}
function nonZero (len) {
  var out = Buffer$1.allocUnsafe(len);
  var i = 0;
  var cache = randomBytes(len * 2);
  var cur = 0;
  var num;
  while (i < len) {
    if (cur === cache.length) {
      cache = randomBytes(len * 2);
      cur = 0;
    }
    num = cache[cur++];
    if (num) {
      out[i++] = num;
    }
  }
  return out
}

var parseKeys = require$$0$2;
var mgf = mgf$2;
var xor = xor$2;
var BN = require$$0$1;
var crt = require$$7;
var createHash = require$$0;
var withPublic = withPublic_1;
var Buffer = require$$1.Buffer;

var privateDecrypt = function privateDecrypt (privateKey, enc, reverse) {
  var padding;
  if (privateKey.padding) {
    padding = privateKey.padding;
  } else if (reverse) {
    padding = 1;
  } else {
    padding = 4;
  }

  var key = parseKeys(privateKey);
  var k = key.modulus.byteLength();
  if (enc.length > k || new BN(enc).cmp(key.modulus) >= 0) {
    throw new Error('decryption error')
  }
  var msg;
  if (reverse) {
    msg = withPublic(new BN(enc), key);
  } else {
    msg = crt(enc, key);
  }
  var zBuffer = Buffer.alloc(k - msg.length);
  msg = Buffer.concat([zBuffer, msg], k);
  if (padding === 4) {
    return oaep(key, msg)
  } else if (padding === 1) {
    return pkcs1(key, msg, reverse)
  } else if (padding === 3) {
    return msg
  } else {
    throw new Error('unknown padding')
  }
};

function oaep (key, msg) {
  var k = key.modulus.byteLength();
  var iHash = createHash('sha1').update(Buffer.alloc(0)).digest();
  var hLen = iHash.length;
  if (msg[0] !== 0) {
    throw new Error('decryption error')
  }
  var maskedSeed = msg.slice(1, hLen + 1);
  var maskedDb = msg.slice(hLen + 1);
  var seed = xor(maskedSeed, mgf(maskedDb, hLen));
  var db = xor(maskedDb, mgf(seed, k - hLen - 1));
  if (compare(iHash, db.slice(0, hLen))) {
    throw new Error('decryption error')
  }
  var i = hLen;
  while (db[i] === 0) {
    i++;
  }
  if (db[i++] !== 1) {
    throw new Error('decryption error')
  }
  return db.slice(i)
}

function pkcs1 (key, msg, reverse) {
  var p1 = msg.slice(0, 2);
  var i = 2;
  var status = 0;
  while (msg[i++] !== 0) {
    if (i >= msg.length) {
      status++;
      break
    }
  }
  var ps = msg.slice(2, i - 1);

  if ((p1.toString('hex') !== '0002' && !reverse) || (p1.toString('hex') !== '0001' && reverse)) {
    status++;
  }
  if (ps.length < 8) {
    status++;
  }
  if (status) {
    throw new Error('decryption error')
  }
  return msg.slice(i)
}
function compare (a, b) {
  a = Buffer.from(a);
  b = Buffer.from(b);
  var dif = 0;
  var len = a.length;
  if (a.length !== b.length) {
    dif++;
    len = Math.min(a.length, b.length);
  }
  var i = -1;
  while (++i < len) {
    dif += (a[i] ^ b[i]);
  }
  return dif
}

(function (exports) {
	exports.publicEncrypt = publicEncrypt;
	exports.privateDecrypt = privateDecrypt;

	exports.privateEncrypt = function privateEncrypt (key, buf) {
	  return exports.publicEncrypt(key, buf, true)
	};

	exports.publicDecrypt = function publicDecrypt (key, buf) {
	  return exports.privateDecrypt(key, buf, true)
	};
} (browser));

export { browser as default };
