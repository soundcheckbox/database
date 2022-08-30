import require$$0 from '../../safe-buffer/dist/index.js';
import require$$1$1 from '../../create-hash/dist/index.js';
import require$$2$1 from '../../readable-stream/dist/readable.js';
import require$$3$1 from '../../inherits/dist/index.js';
import require$$1 from '../../create-hmac/dist/index.js';
import require$$2 from '../../browserify-rsa/dist/index.js';
import require$$3 from '../../elliptic/dist/index.js';
import require$$4$1 from '../../bn.js/dist/index.js';
import require$$5 from '../../parse-asn1/dist/index.js';

var sign$2 = {exports: {}};

var require$$4 = {
	"1.3.132.0.10": "secp256k1",
	"1.3.132.0.33": "p224",
	"1.2.840.10045.3.1.1": "p192",
	"1.2.840.10045.3.1.7": "p256",
	"1.3.132.0.34": "p384",
	"1.3.132.0.35": "p521"
};

// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var Buffer$2 = require$$0.Buffer;
var createHmac = require$$1;
var crt = require$$2;
var EC$1 = require$$3.ec;
var BN$1 = require$$4$1;
var parseKeys$1 = require$$5;
var curves$1 = require$$4;

function sign$1 (hash, key, hashType, signType, tag) {
  var priv = parseKeys$1(key);
  if (priv.curve) {
    // rsa keys can be interpreted as ecdsa ones in openssl
    if (signType !== 'ecdsa' && signType !== 'ecdsa/rsa') throw new Error('wrong private key type')
    return ecSign(hash, priv)
  } else if (priv.type === 'dsa') {
    if (signType !== 'dsa') throw new Error('wrong private key type')
    return dsaSign(hash, priv, hashType)
  } else {
    if (signType !== 'rsa' && signType !== 'ecdsa/rsa') throw new Error('wrong private key type')
  }
  hash = Buffer$2.concat([tag, hash]);
  var len = priv.modulus.byteLength();
  var pad = [0, 1];
  while (hash.length + pad.length + 1 < len) pad.push(0xff);
  pad.push(0x00);
  var i = -1;
  while (++i < hash.length) pad.push(hash[i]);

  var out = crt(pad, priv);
  return out
}

function ecSign (hash, priv) {
  var curveId = curves$1[priv.curve.join('.')];
  if (!curveId) throw new Error('unknown curve ' + priv.curve.join('.'))

  var curve = new EC$1(curveId);
  var key = curve.keyFromPrivate(priv.privateKey);
  var out = key.sign(hash);

  return Buffer$2.from(out.toDER())
}

function dsaSign (hash, priv, algo) {
  var x = priv.params.priv_key;
  var p = priv.params.p;
  var q = priv.params.q;
  var g = priv.params.g;
  var r = new BN$1(0);
  var k;
  var H = bits2int(hash, q).mod(q);
  var s = false;
  var kv = getKey(x, q, hash, algo);
  while (s === false) {
    k = makeKey(q, kv, algo);
    r = makeR(g, k, p, q);
    s = k.invm(q).imul(H.add(x.mul(r))).mod(q);
    if (s.cmpn(0) === 0) {
      s = false;
      r = new BN$1(0);
    }
  }
  return toDER(r, s)
}

function toDER (r, s) {
  r = r.toArray();
  s = s.toArray();

  // Pad values
  if (r[0] & 0x80) r = [0].concat(r);
  if (s[0] & 0x80) s = [0].concat(s);

  var total = r.length + s.length + 4;
  var res = [0x30, total, 0x02, r.length];
  res = res.concat(r, [0x02, s.length], s);
  return Buffer$2.from(res)
}

function getKey (x, q, hash, algo) {
  x = Buffer$2.from(x.toArray());
  if (x.length < q.byteLength()) {
    var zeros = Buffer$2.alloc(q.byteLength() - x.length);
    x = Buffer$2.concat([zeros, x]);
  }
  var hlen = hash.length;
  var hbits = bits2octets(hash, q);
  var v = Buffer$2.alloc(hlen);
  v.fill(1);
  var k = Buffer$2.alloc(hlen);
  k = createHmac(algo, k).update(v).update(Buffer$2.from([0])).update(x).update(hbits).digest();
  v = createHmac(algo, k).update(v).digest();
  k = createHmac(algo, k).update(v).update(Buffer$2.from([1])).update(x).update(hbits).digest();
  v = createHmac(algo, k).update(v).digest();
  return { k: k, v: v }
}

function bits2int (obits, q) {
  var bits = new BN$1(obits);
  var shift = (obits.length << 3) - q.bitLength();
  if (shift > 0) bits.ishrn(shift);
  return bits
}

function bits2octets (bits, q) {
  bits = bits2int(bits, q);
  bits = bits.mod(q);
  var out = Buffer$2.from(bits.toArray());
  if (out.length < q.byteLength()) {
    var zeros = Buffer$2.alloc(q.byteLength() - out.length);
    out = Buffer$2.concat([zeros, out]);
  }
  return out
}

function makeKey (q, kv, algo) {
  var t;
  var k;

  do {
    t = Buffer$2.alloc(0);

    while (t.length * 8 < q.bitLength()) {
      kv.v = createHmac(algo, kv.k).update(kv.v).digest();
      t = Buffer$2.concat([t, kv.v]);
    }

    k = bits2int(t, q);
    kv.k = createHmac(algo, kv.k).update(kv.v).update(Buffer$2.from([0])).digest();
    kv.v = createHmac(algo, kv.k).update(kv.v).digest();
  } while (k.cmp(q) !== -1)

  return k
}

function makeR (g, k, p, q) {
  return g.toRed(BN$1.mont(p)).redPow(k).fromRed().mod(q)
}

sign$2.exports = sign$1;
sign$2.exports.getKey = getKey;
sign$2.exports.makeKey = makeKey;

// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var Buffer$1 = require$$0.Buffer;
var BN = require$$4$1;
var EC = require$$3.ec;
var parseKeys = require$$5;
var curves = require$$4;

function verify$1 (sig, hash, key, signType, tag) {
  var pub = parseKeys(key);
  if (pub.type === 'ec') {
    // rsa keys can be interpreted as ecdsa ones in openssl
    if (signType !== 'ecdsa' && signType !== 'ecdsa/rsa') throw new Error('wrong public key type')
    return ecVerify(sig, hash, pub)
  } else if (pub.type === 'dsa') {
    if (signType !== 'dsa') throw new Error('wrong public key type')
    return dsaVerify(sig, hash, pub)
  } else {
    if (signType !== 'rsa' && signType !== 'ecdsa/rsa') throw new Error('wrong public key type')
  }
  hash = Buffer$1.concat([tag, hash]);
  var len = pub.modulus.byteLength();
  var pad = [1];
  var padNum = 0;
  while (hash.length + pad.length + 2 < len) {
    pad.push(0xff);
    padNum++;
  }
  pad.push(0x00);
  var i = -1;
  while (++i < hash.length) {
    pad.push(hash[i]);
  }
  pad = Buffer$1.from(pad);
  var red = BN.mont(pub.modulus);
  sig = new BN(sig).toRed(red);

  sig = sig.redPow(new BN(pub.publicExponent));
  sig = Buffer$1.from(sig.fromRed().toArray());
  var out = padNum < 8 ? 1 : 0;
  len = Math.min(sig.length, pad.length);
  if (sig.length !== pad.length) out = 1;

  i = -1;
  while (++i < len) out |= sig[i] ^ pad[i];
  return out === 0
}

function ecVerify (sig, hash, pub) {
  var curveId = curves[pub.data.algorithm.curve.join('.')];
  if (!curveId) throw new Error('unknown curve ' + pub.data.algorithm.curve.join('.'))

  var curve = new EC(curveId);
  var pubkey = pub.data.subjectPrivateKey.data;

  return curve.verify(hash, sig, pubkey)
}

function dsaVerify (sig, hash, pub) {
  var p = pub.data.p;
  var q = pub.data.q;
  var g = pub.data.g;
  var y = pub.data.pub_key;
  var unpacked = parseKeys.signature.decode(sig, 'der');
  var s = unpacked.s;
  var r = unpacked.r;
  checkValue(s, q);
  checkValue(r, q);
  var montp = BN.mont(p);
  var w = s.invm(q);
  var v = g.toRed(montp)
    .redPow(new BN(hash).mul(w).mod(q))
    .fromRed()
    .mul(y.toRed(montp).redPow(r.mul(w).mod(q)).fromRed())
    .mod(p)
    .mod(q);
  return v.cmp(r) === 0
}

function checkValue (b, q) {
  if (b.cmpn(0) <= 0) throw new Error('invalid sig')
  if (b.cmp(q) >= q) throw new Error('invalid sig')
}

var verify_1 = verify$1;

var sha224WithRSAEncryption = {
	sign: "rsa",
	hash: "sha224",
	id: "302d300d06096086480165030402040500041c"
};
var sha256WithRSAEncryption = {
	sign: "rsa",
	hash: "sha256",
	id: "3031300d060960864801650304020105000420"
};
var sha384WithRSAEncryption = {
	sign: "rsa",
	hash: "sha384",
	id: "3041300d060960864801650304020205000430"
};
var sha512WithRSAEncryption = {
	sign: "rsa",
	hash: "sha512",
	id: "3051300d060960864801650304020305000440"
};
var sha256 = {
	sign: "ecdsa",
	hash: "sha256",
	id: ""
};
var sha224 = {
	sign: "ecdsa",
	hash: "sha224",
	id: ""
};
var sha384 = {
	sign: "ecdsa",
	hash: "sha384",
	id: ""
};
var sha512 = {
	sign: "ecdsa",
	hash: "sha512",
	id: ""
};
var DSA = {
	sign: "dsa",
	hash: "sha1",
	id: ""
};
var ripemd160WithRSA = {
	sign: "rsa",
	hash: "rmd160",
	id: "3021300906052b2403020105000414"
};
var md5WithRSAEncryption = {
	sign: "rsa",
	hash: "md5",
	id: "3020300c06082a864886f70d020505000410"
};
var require$$6 = {
	sha224WithRSAEncryption: sha224WithRSAEncryption,
	"RSA-SHA224": {
	sign: "ecdsa/rsa",
	hash: "sha224",
	id: "302d300d06096086480165030402040500041c"
},
	sha256WithRSAEncryption: sha256WithRSAEncryption,
	"RSA-SHA256": {
	sign: "ecdsa/rsa",
	hash: "sha256",
	id: "3031300d060960864801650304020105000420"
},
	sha384WithRSAEncryption: sha384WithRSAEncryption,
	"RSA-SHA384": {
	sign: "ecdsa/rsa",
	hash: "sha384",
	id: "3041300d060960864801650304020205000430"
},
	sha512WithRSAEncryption: sha512WithRSAEncryption,
	"RSA-SHA512": {
	sign: "ecdsa/rsa",
	hash: "sha512",
	id: "3051300d060960864801650304020305000440"
},
	"RSA-SHA1": {
	sign: "rsa",
	hash: "sha1",
	id: "3021300906052b0e03021a05000414"
},
	"ecdsa-with-SHA1": {
	sign: "ecdsa",
	hash: "sha1",
	id: ""
},
	sha256: sha256,
	sha224: sha224,
	sha384: sha384,
	sha512: sha512,
	"DSA-SHA": {
	sign: "dsa",
	hash: "sha1",
	id: ""
},
	"DSA-SHA1": {
	sign: "dsa",
	hash: "sha1",
	id: ""
},
	DSA: DSA,
	"DSA-WITH-SHA224": {
	sign: "dsa",
	hash: "sha224",
	id: ""
},
	"DSA-SHA224": {
	sign: "dsa",
	hash: "sha224",
	id: ""
},
	"DSA-WITH-SHA256": {
	sign: "dsa",
	hash: "sha256",
	id: ""
},
	"DSA-SHA256": {
	sign: "dsa",
	hash: "sha256",
	id: ""
},
	"DSA-WITH-SHA384": {
	sign: "dsa",
	hash: "sha384",
	id: ""
},
	"DSA-SHA384": {
	sign: "dsa",
	hash: "sha384",
	id: ""
},
	"DSA-WITH-SHA512": {
	sign: "dsa",
	hash: "sha512",
	id: ""
},
	"DSA-SHA512": {
	sign: "dsa",
	hash: "sha512",
	id: ""
},
	"DSA-RIPEMD160": {
	sign: "dsa",
	hash: "rmd160",
	id: ""
},
	ripemd160WithRSA: ripemd160WithRSA,
	"RSA-RIPEMD160": {
	sign: "rsa",
	hash: "rmd160",
	id: "3021300906052b2403020105000414"
},
	md5WithRSAEncryption: md5WithRSAEncryption,
	"RSA-MD5": {
	sign: "rsa",
	hash: "md5",
	id: "3020300c06082a864886f70d020505000410"
}
};

var Buffer = require$$0.Buffer;
var createHash = require$$1$1;
var stream = require$$2$1;
var inherits = require$$3$1;
var sign = sign$2.exports;
var verify = verify_1;

var algorithms = require$$6;
Object.keys(algorithms).forEach(function (key) {
  algorithms[key].id = Buffer.from(algorithms[key].id, 'hex');
  algorithms[key.toLowerCase()] = algorithms[key];
});

function Sign (algorithm) {
  stream.Writable.call(this);

  var data = algorithms[algorithm];
  if (!data) throw new Error('Unknown message digest')

  this._hashType = data.hash;
  this._hash = createHash(data.hash);
  this._tag = data.id;
  this._signType = data.sign;
}
inherits(Sign, stream.Writable);

Sign.prototype._write = function _write (data, _, done) {
  this._hash.update(data);
  done();
};

Sign.prototype.update = function update (data, enc) {
  if (typeof data === 'string') data = Buffer.from(data, enc);

  this._hash.update(data);
  return this
};

Sign.prototype.sign = function signMethod (key, enc) {
  this.end();
  var hash = this._hash.digest();
  var sig = sign(hash, key, this._hashType, this._signType, this._tag);

  return enc ? sig.toString(enc) : sig
};

function Verify (algorithm) {
  stream.Writable.call(this);

  var data = algorithms[algorithm];
  if (!data) throw new Error('Unknown message digest')

  this._hash = createHash(data.hash);
  this._tag = data.id;
  this._signType = data.sign;
}
inherits(Verify, stream.Writable);

Verify.prototype._write = function _write (data, _, done) {
  this._hash.update(data);
  done();
};

Verify.prototype.update = function update (data, enc) {
  if (typeof data === 'string') data = Buffer.from(data, enc);

  this._hash.update(data);
  return this
};

Verify.prototype.verify = function verifyMethod (key, sig, enc) {
  if (typeof sig === 'string') sig = Buffer.from(sig, enc);

  this.end();
  var hash = this._hash.digest();
  return verify(sig, hash, key, this._signType, this._tag)
};

function createSign (algorithm) {
  return new Sign(algorithm)
}

function createVerify (algorithm) {
  return new Verify(algorithm)
}

var browser = {
  Sign: createSign,
  Verify: createVerify,
  createSign: createSign,
  createVerify: createVerify
};

export { browser as default };
