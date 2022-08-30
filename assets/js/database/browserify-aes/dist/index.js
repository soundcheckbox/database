import require$$0 from '../../buffer-xor/dist/index.js';
import require$$0$1 from '../../safe-buffer/dist/index.js';
import require$$2$1 from '../../cipher-base/dist/index.js';
import require$$3 from '../../inherits/dist/index.js';
import require$$6 from '../../evp_bytestokey/dist/index.js';

var browser = {};

var encrypter = {};

var ecb = {};

ecb.encrypt = function (self, block) {
  return self._cipher.encryptBlock(block)
};

ecb.decrypt = function (self, block) {
  return self._cipher.decryptBlock(block)
};

var cbc = {};

var xor$4 = require$$0;

cbc.encrypt = function (self, block) {
  var data = xor$4(block, self._prev);

  self._prev = self._cipher.encryptBlock(data);
  return self._prev
};

cbc.decrypt = function (self, block) {
  var pad = self._prev;

  self._prev = block;
  var out = self._cipher.decryptBlock(block);

  return xor$4(out, pad)
};

var cfb = {};

var Buffer$a = require$$0$1.Buffer;
var xor$3 = require$$0;

function encryptStart (self, data, decrypt) {
  var len = data.length;
  var out = xor$3(data, self._cache);
  self._cache = self._cache.slice(len);
  self._prev = Buffer$a.concat([self._prev, decrypt ? data : out]);
  return out
}

cfb.encrypt = function (self, data, decrypt) {
  var out = Buffer$a.allocUnsafe(0);
  var len;

  while (data.length) {
    if (self._cache.length === 0) {
      self._cache = self._cipher.encryptBlock(self._prev);
      self._prev = Buffer$a.allocUnsafe(0);
    }

    if (self._cache.length <= data.length) {
      len = self._cache.length;
      out = Buffer$a.concat([out, encryptStart(self, data.slice(0, len), decrypt)]);
      data = data.slice(len);
    } else {
      out = Buffer$a.concat([out, encryptStart(self, data, decrypt)]);
      break
    }
  }

  return out
};

var cfb8 = {};

var Buffer$9 = require$$0$1.Buffer;

function encryptByte$1 (self, byteParam, decrypt) {
  var pad = self._cipher.encryptBlock(self._prev);
  var out = pad[0] ^ byteParam;

  self._prev = Buffer$9.concat([
    self._prev.slice(1),
    Buffer$9.from([decrypt ? byteParam : out])
  ]);

  return out
}

cfb8.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length;
  var out = Buffer$9.allocUnsafe(len);
  var i = -1;

  while (++i < len) {
    out[i] = encryptByte$1(self, chunk[i], decrypt);
  }

  return out
};

var cfb1 = {};

var Buffer$8 = require$$0$1.Buffer;

function encryptByte (self, byteParam, decrypt) {
  var pad;
  var i = -1;
  var len = 8;
  var out = 0;
  var bit, value;
  while (++i < len) {
    pad = self._cipher.encryptBlock(self._prev);
    bit = (byteParam & (1 << (7 - i))) ? 0x80 : 0;
    value = pad[0] ^ bit;
    out += ((value & 0x80) >> (i % 8));
    self._prev = shiftIn(self._prev, decrypt ? bit : value);
  }
  return out
}

function shiftIn (buffer, value) {
  var len = buffer.length;
  var i = -1;
  var out = Buffer$8.allocUnsafe(buffer.length);
  buffer = Buffer$8.concat([buffer, Buffer$8.from([value])]);

  while (++i < len) {
    out[i] = buffer[i] << 1 | buffer[i + 1] >> (7);
  }

  return out
}

cfb1.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length;
  var out = Buffer$8.allocUnsafe(len);
  var i = -1;

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt);
  }

  return out
};

var ofb = {};

var xor$2 = require$$0;

function getBlock$1 (self) {
  self._prev = self._cipher.encryptBlock(self._prev);
  return self._prev
}

ofb.encrypt = function (self, chunk) {
  while (self._cache.length < chunk.length) {
    self._cache = Buffer.concat([self._cache, getBlock$1(self)]);
  }

  var pad = self._cache.slice(0, chunk.length);
  self._cache = self._cache.slice(chunk.length);
  return xor$2(chunk, pad)
};

var ctr = {};

function incr32$2 (iv) {
  var len = iv.length;
  var item;
  while (len--) {
    item = iv.readUInt8(len);
    if (item === 255) {
      iv.writeUInt8(0, len);
    } else {
      item++;
      iv.writeUInt8(item, len);
      break
    }
  }
}
var incr32_1 = incr32$2;

var xor$1 = require$$0;
var Buffer$7 = require$$0$1.Buffer;
var incr32$1 = incr32_1;

function getBlock (self) {
  var out = self._cipher.encryptBlockRaw(self._prev);
  incr32$1(self._prev);
  return out
}

var blockSize = 16;
ctr.encrypt = function (self, chunk) {
  var chunkNum = Math.ceil(chunk.length / blockSize);
  var start = self._cache.length;
  self._cache = Buffer$7.concat([
    self._cache,
    Buffer$7.allocUnsafe(chunkNum * blockSize)
  ]);
  for (var i = 0; i < chunkNum; i++) {
    var out = getBlock(self);
    var offset = start + i * blockSize;
    self._cache.writeUInt32BE(out[0], offset + 0);
    self._cache.writeUInt32BE(out[1], offset + 4);
    self._cache.writeUInt32BE(out[2], offset + 8);
    self._cache.writeUInt32BE(out[3], offset + 12);
  }
  var pad = self._cache.slice(0, chunk.length);
  self._cache = self._cache.slice(chunk.length);
  return xor$1(chunk, pad)
};

var aes128 = {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "CBC",
	type: "block"
};
var aes192 = {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "CBC",
	type: "block"
};
var aes256 = {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "CBC",
	type: "block"
};
var require$$2 = {
	"aes-128-ecb": {
	cipher: "AES",
	key: 128,
	iv: 0,
	mode: "ECB",
	type: "block"
},
	"aes-192-ecb": {
	cipher: "AES",
	key: 192,
	iv: 0,
	mode: "ECB",
	type: "block"
},
	"aes-256-ecb": {
	cipher: "AES",
	key: 256,
	iv: 0,
	mode: "ECB",
	type: "block"
},
	"aes-128-cbc": {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "CBC",
	type: "block"
},
	"aes-192-cbc": {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "CBC",
	type: "block"
},
	"aes-256-cbc": {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "CBC",
	type: "block"
},
	aes128: aes128,
	aes192: aes192,
	aes256: aes256,
	"aes-128-cfb": {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "CFB",
	type: "stream"
},
	"aes-192-cfb": {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "CFB",
	type: "stream"
},
	"aes-256-cfb": {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "CFB",
	type: "stream"
},
	"aes-128-cfb8": {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "CFB8",
	type: "stream"
},
	"aes-192-cfb8": {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "CFB8",
	type: "stream"
},
	"aes-256-cfb8": {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "CFB8",
	type: "stream"
},
	"aes-128-cfb1": {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "CFB1",
	type: "stream"
},
	"aes-192-cfb1": {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "CFB1",
	type: "stream"
},
	"aes-256-cfb1": {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "CFB1",
	type: "stream"
},
	"aes-128-ofb": {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "OFB",
	type: "stream"
},
	"aes-192-ofb": {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "OFB",
	type: "stream"
},
	"aes-256-ofb": {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "OFB",
	type: "stream"
},
	"aes-128-ctr": {
	cipher: "AES",
	key: 128,
	iv: 16,
	mode: "CTR",
	type: "stream"
},
	"aes-192-ctr": {
	cipher: "AES",
	key: 192,
	iv: 16,
	mode: "CTR",
	type: "stream"
},
	"aes-256-ctr": {
	cipher: "AES",
	key: 256,
	iv: 16,
	mode: "CTR",
	type: "stream"
},
	"aes-128-gcm": {
	cipher: "AES",
	key: 128,
	iv: 12,
	mode: "GCM",
	type: "auth"
},
	"aes-192-gcm": {
	cipher: "AES",
	key: 192,
	iv: 12,
	mode: "GCM",
	type: "auth"
},
	"aes-256-gcm": {
	cipher: "AES",
	key: 256,
	iv: 12,
	mode: "GCM",
	type: "auth"
}
};

var modeModules = {
  ECB: ecb,
  CBC: cbc,
  CFB: cfb,
  CFB8: cfb8,
  CFB1: cfb1,
  OFB: ofb,
  CTR: ctr,
  GCM: ctr
};

var modes$1 = require$$2;

for (var key in modes$1) {
  modes$1[key].module = modeModules[modes$1[key].mode];
}

var modes_1 = modes$1;

var aes$4 = {};

// based on the aes implimentation in triple sec
// https://github.com/keybase/triplesec
// which is in turn based on the one from crypto-js
// https://code.google.com/p/crypto-js/

var Buffer$6 = require$$0$1.Buffer;

function asUInt32Array (buf) {
  if (!Buffer$6.isBuffer(buf)) buf = Buffer$6.from(buf);

  var len = (buf.length / 4) | 0;
  var out = new Array(len);

  for (var i = 0; i < len; i++) {
    out[i] = buf.readUInt32BE(i * 4);
  }

  return out
}

function scrubVec (v) {
  for (var i = 0; i < v.length; v++) {
    v[i] = 0;
  }
}

function cryptBlock (M, keySchedule, SUB_MIX, SBOX, nRounds) {
  var SUB_MIX0 = SUB_MIX[0];
  var SUB_MIX1 = SUB_MIX[1];
  var SUB_MIX2 = SUB_MIX[2];
  var SUB_MIX3 = SUB_MIX[3];

  var s0 = M[0] ^ keySchedule[0];
  var s1 = M[1] ^ keySchedule[1];
  var s2 = M[2] ^ keySchedule[2];
  var s3 = M[3] ^ keySchedule[3];
  var t0, t1, t2, t3;
  var ksRow = 4;

  for (var round = 1; round < nRounds; round++) {
    t0 = SUB_MIX0[s0 >>> 24] ^ SUB_MIX1[(s1 >>> 16) & 0xff] ^ SUB_MIX2[(s2 >>> 8) & 0xff] ^ SUB_MIX3[s3 & 0xff] ^ keySchedule[ksRow++];
    t1 = SUB_MIX0[s1 >>> 24] ^ SUB_MIX1[(s2 >>> 16) & 0xff] ^ SUB_MIX2[(s3 >>> 8) & 0xff] ^ SUB_MIX3[s0 & 0xff] ^ keySchedule[ksRow++];
    t2 = SUB_MIX0[s2 >>> 24] ^ SUB_MIX1[(s3 >>> 16) & 0xff] ^ SUB_MIX2[(s0 >>> 8) & 0xff] ^ SUB_MIX3[s1 & 0xff] ^ keySchedule[ksRow++];
    t3 = SUB_MIX0[s3 >>> 24] ^ SUB_MIX1[(s0 >>> 16) & 0xff] ^ SUB_MIX2[(s1 >>> 8) & 0xff] ^ SUB_MIX3[s2 & 0xff] ^ keySchedule[ksRow++];
    s0 = t0;
    s1 = t1;
    s2 = t2;
    s3 = t3;
  }

  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
  t0 = t0 >>> 0;
  t1 = t1 >>> 0;
  t2 = t2 >>> 0;
  t3 = t3 >>> 0;

  return [t0, t1, t2, t3]
}

// AES constants
var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
var G = (function () {
  // Compute double table
  var d = new Array(256);
  for (var j = 0; j < 256; j++) {
    if (j < 128) {
      d[j] = j << 1;
    } else {
      d[j] = (j << 1) ^ 0x11b;
    }
  }

  var SBOX = [];
  var INV_SBOX = [];
  var SUB_MIX = [[], [], [], []];
  var INV_SUB_MIX = [[], [], [], []];

  // Walk GF(2^8)
  var x = 0;
  var xi = 0;
  for (var i = 0; i < 256; ++i) {
    // Compute sbox
    var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
    SBOX[x] = sx;
    INV_SBOX[sx] = x;

    // Compute multiplication
    var x2 = d[x];
    var x4 = d[x2];
    var x8 = d[x4];

    // Compute sub bytes, mix columns tables
    var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
    SUB_MIX[0][x] = (t << 24) | (t >>> 8);
    SUB_MIX[1][x] = (t << 16) | (t >>> 16);
    SUB_MIX[2][x] = (t << 8) | (t >>> 24);
    SUB_MIX[3][x] = t;

    // Compute inv sub bytes, inv mix columns tables
    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
    INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8);
    INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16);
    INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24);
    INV_SUB_MIX[3][sx] = t;

    if (x === 0) {
      x = xi = 1;
    } else {
      x = x2 ^ d[d[d[x8 ^ x2]]];
      xi ^= d[d[xi]];
    }
  }

  return {
    SBOX: SBOX,
    INV_SBOX: INV_SBOX,
    SUB_MIX: SUB_MIX,
    INV_SUB_MIX: INV_SUB_MIX
  }
})();

function AES (key) {
  this._key = asUInt32Array(key);
  this._reset();
}

AES.blockSize = 4 * 4;
AES.keySize = 256 / 8;
AES.prototype.blockSize = AES.blockSize;
AES.prototype.keySize = AES.keySize;
AES.prototype._reset = function () {
  var keyWords = this._key;
  var keySize = keyWords.length;
  var nRounds = keySize + 6;
  var ksRows = (nRounds + 1) * 4;

  var keySchedule = [];
  for (var k = 0; k < keySize; k++) {
    keySchedule[k] = keyWords[k];
  }

  for (k = keySize; k < ksRows; k++) {
    var t = keySchedule[k - 1];

    if (k % keySize === 0) {
      t = (t << 8) | (t >>> 24);
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff]);

      t ^= RCON[(k / keySize) | 0] << 24;
    } else if (keySize > 6 && k % keySize === 4) {
      t =
        (G.SBOX[t >>> 24] << 24) |
        (G.SBOX[(t >>> 16) & 0xff] << 16) |
        (G.SBOX[(t >>> 8) & 0xff] << 8) |
        (G.SBOX[t & 0xff]);
    }

    keySchedule[k] = keySchedule[k - keySize] ^ t;
  }

  var invKeySchedule = [];
  for (var ik = 0; ik < ksRows; ik++) {
    var ksR = ksRows - ik;
    var tt = keySchedule[ksR - (ik % 4 ? 0 : 4)];

    if (ik < 4 || ksR <= 4) {
      invKeySchedule[ik] = tt;
    } else {
      invKeySchedule[ik] =
        G.INV_SUB_MIX[0][G.SBOX[tt >>> 24]] ^
        G.INV_SUB_MIX[1][G.SBOX[(tt >>> 16) & 0xff]] ^
        G.INV_SUB_MIX[2][G.SBOX[(tt >>> 8) & 0xff]] ^
        G.INV_SUB_MIX[3][G.SBOX[tt & 0xff]];
    }
  }

  this._nRounds = nRounds;
  this._keySchedule = keySchedule;
  this._invKeySchedule = invKeySchedule;
};

AES.prototype.encryptBlockRaw = function (M) {
  M = asUInt32Array(M);
  return cryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX, this._nRounds)
};

AES.prototype.encryptBlock = function (M) {
  var out = this.encryptBlockRaw(M);
  var buf = Buffer$6.allocUnsafe(16);
  buf.writeUInt32BE(out[0], 0);
  buf.writeUInt32BE(out[1], 4);
  buf.writeUInt32BE(out[2], 8);
  buf.writeUInt32BE(out[3], 12);
  return buf
};

AES.prototype.decryptBlock = function (M) {
  M = asUInt32Array(M);

  // swap
  var m1 = M[1];
  M[1] = M[3];
  M[3] = m1;

  var out = cryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX, this._nRounds);
  var buf = Buffer$6.allocUnsafe(16);
  buf.writeUInt32BE(out[0], 0);
  buf.writeUInt32BE(out[3], 4);
  buf.writeUInt32BE(out[2], 8);
  buf.writeUInt32BE(out[1], 12);
  return buf
};

AES.prototype.scrub = function () {
  scrubVec(this._keySchedule);
  scrubVec(this._invKeySchedule);
  scrubVec(this._key);
};

aes$4.AES = AES;

var Buffer$5 = require$$0$1.Buffer;
var ZEROES = Buffer$5.alloc(16, 0);

function toArray (buf) {
  return [
    buf.readUInt32BE(0),
    buf.readUInt32BE(4),
    buf.readUInt32BE(8),
    buf.readUInt32BE(12)
  ]
}

function fromArray (out) {
  var buf = Buffer$5.allocUnsafe(16);
  buf.writeUInt32BE(out[0] >>> 0, 0);
  buf.writeUInt32BE(out[1] >>> 0, 4);
  buf.writeUInt32BE(out[2] >>> 0, 8);
  buf.writeUInt32BE(out[3] >>> 0, 12);
  return buf
}

function GHASH$1 (key) {
  this.h = key;
  this.state = Buffer$5.alloc(16, 0);
  this.cache = Buffer$5.allocUnsafe(0);
}

// from http://bitwiseshiftleft.github.io/sjcl/doc/symbols/src/core_gcm.js.html
// by Juho Vähä-Herttua
GHASH$1.prototype.ghash = function (block) {
  var i = -1;
  while (++i < block.length) {
    this.state[i] ^= block[i];
  }
  this._multiply();
};

GHASH$1.prototype._multiply = function () {
  var Vi = toArray(this.h);
  var Zi = [0, 0, 0, 0];
  var j, xi, lsbVi;
  var i = -1;
  while (++i < 128) {
    xi = (this.state[~~(i / 8)] & (1 << (7 - (i % 8)))) !== 0;
    if (xi) {
      // Z_i+1 = Z_i ^ V_i
      Zi[0] ^= Vi[0];
      Zi[1] ^= Vi[1];
      Zi[2] ^= Vi[2];
      Zi[3] ^= Vi[3];
    }

    // Store the value of LSB(V_i)
    lsbVi = (Vi[3] & 1) !== 0;

    // V_i+1 = V_i >> 1
    for (j = 3; j > 0; j--) {
      Vi[j] = (Vi[j] >>> 1) | ((Vi[j - 1] & 1) << 31);
    }
    Vi[0] = Vi[0] >>> 1;

    // If LSB(V_i) is 1, V_i+1 = (V_i >> 1) ^ R
    if (lsbVi) {
      Vi[0] = Vi[0] ^ (0xe1 << 24);
    }
  }
  this.state = fromArray(Zi);
};

GHASH$1.prototype.update = function (buf) {
  this.cache = Buffer$5.concat([this.cache, buf]);
  var chunk;
  while (this.cache.length >= 16) {
    chunk = this.cache.slice(0, 16);
    this.cache = this.cache.slice(16);
    this.ghash(chunk);
  }
};

GHASH$1.prototype.final = function (abl, bl) {
  if (this.cache.length) {
    this.ghash(Buffer$5.concat([this.cache, ZEROES], 16));
  }

  this.ghash(fromArray([0, abl, 0, bl]));
  return this.state
};

var ghash = GHASH$1;

var aes$3 = aes$4;
var Buffer$4 = require$$0$1.Buffer;
var Transform$3 = require$$2$1;
var inherits$3 = require$$3;
var GHASH = ghash;
var xor = require$$0;
var incr32 = incr32_1;

function xorTest (a, b) {
  var out = 0;
  if (a.length !== b.length) out++;

  var len = Math.min(a.length, b.length);
  for (var i = 0; i < len; ++i) {
    out += (a[i] ^ b[i]);
  }

  return out
}

function calcIv (self, iv, ck) {
  if (iv.length === 12) {
    self._finID = Buffer$4.concat([iv, Buffer$4.from([0, 0, 0, 1])]);
    return Buffer$4.concat([iv, Buffer$4.from([0, 0, 0, 2])])
  }
  var ghash = new GHASH(ck);
  var len = iv.length;
  var toPad = len % 16;
  ghash.update(iv);
  if (toPad) {
    toPad = 16 - toPad;
    ghash.update(Buffer$4.alloc(toPad, 0));
  }
  ghash.update(Buffer$4.alloc(8, 0));
  var ivBits = len * 8;
  var tail = Buffer$4.alloc(8);
  tail.writeUIntBE(ivBits, 0, 8);
  ghash.update(tail);
  self._finID = ghash.state;
  var out = Buffer$4.from(self._finID);
  incr32(out);
  return out
}
function StreamCipher$3 (mode, key, iv, decrypt) {
  Transform$3.call(this);

  var h = Buffer$4.alloc(4, 0);

  this._cipher = new aes$3.AES(key);
  var ck = this._cipher.encryptBlock(h);
  this._ghash = new GHASH(ck);
  iv = calcIv(this, iv, ck);

  this._prev = Buffer$4.from(iv);
  this._cache = Buffer$4.allocUnsafe(0);
  this._secCache = Buffer$4.allocUnsafe(0);
  this._decrypt = decrypt;
  this._alen = 0;
  this._len = 0;
  this._mode = mode;

  this._authTag = null;
  this._called = false;
}

inherits$3(StreamCipher$3, Transform$3);

StreamCipher$3.prototype._update = function (chunk) {
  if (!this._called && this._alen) {
    var rump = 16 - (this._alen % 16);
    if (rump < 16) {
      rump = Buffer$4.alloc(rump, 0);
      this._ghash.update(rump);
    }
  }

  this._called = true;
  var out = this._mode.encrypt(this, chunk);
  if (this._decrypt) {
    this._ghash.update(chunk);
  } else {
    this._ghash.update(out);
  }
  this._len += chunk.length;
  return out
};

StreamCipher$3.prototype._final = function () {
  if (this._decrypt && !this._authTag) throw new Error('Unsupported state or unable to authenticate data')

  var tag = xor(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID));
  if (this._decrypt && xorTest(tag, this._authTag)) throw new Error('Unsupported state or unable to authenticate data')

  this._authTag = tag;
  this._cipher.scrub();
};

StreamCipher$3.prototype.getAuthTag = function getAuthTag () {
  if (this._decrypt || !Buffer$4.isBuffer(this._authTag)) throw new Error('Attempting to get auth tag in unsupported state')

  return this._authTag
};

StreamCipher$3.prototype.setAuthTag = function setAuthTag (tag) {
  if (!this._decrypt) throw new Error('Attempting to set auth tag in unsupported state')

  this._authTag = tag;
};

StreamCipher$3.prototype.setAAD = function setAAD (buf) {
  if (this._called) throw new Error('Attempting to set AAD in unsupported state')

  this._ghash.update(buf);
  this._alen += buf.length;
};

var authCipher = StreamCipher$3;

var aes$2 = aes$4;
var Buffer$3 = require$$0$1.Buffer;
var Transform$2 = require$$2$1;
var inherits$2 = require$$3;

function StreamCipher$2 (mode, key, iv, decrypt) {
  Transform$2.call(this);

  this._cipher = new aes$2.AES(key);
  this._prev = Buffer$3.from(iv);
  this._cache = Buffer$3.allocUnsafe(0);
  this._secCache = Buffer$3.allocUnsafe(0);
  this._decrypt = decrypt;
  this._mode = mode;
}

inherits$2(StreamCipher$2, Transform$2);

StreamCipher$2.prototype._update = function (chunk) {
  return this._mode.encrypt(this, chunk, this._decrypt)
};

StreamCipher$2.prototype._final = function () {
  this._cipher.scrub();
};

var streamCipher = StreamCipher$2;

var MODES$1 = modes_1;
var AuthCipher$1 = authCipher;
var Buffer$2 = require$$0$1.Buffer;
var StreamCipher$1 = streamCipher;
var Transform$1 = require$$2$1;
var aes$1 = aes$4;
var ebtk$1 = require$$6;
var inherits$1 = require$$3;

function Cipher$1 (mode, key, iv) {
  Transform$1.call(this);

  this._cache = new Splitter$1();
  this._cipher = new aes$1.AES(key);
  this._prev = Buffer$2.from(iv);
  this._mode = mode;
  this._autopadding = true;
}

inherits$1(Cipher$1, Transform$1);

Cipher$1.prototype._update = function (data) {
  this._cache.add(data);
  var chunk;
  var thing;
  var out = [];

  while ((chunk = this._cache.get())) {
    thing = this._mode.encrypt(this, chunk);
    out.push(thing);
  }

  return Buffer$2.concat(out)
};

var PADDING = Buffer$2.alloc(16, 0x10);

Cipher$1.prototype._final = function () {
  var chunk = this._cache.flush();
  if (this._autopadding) {
    chunk = this._mode.encrypt(this, chunk);
    this._cipher.scrub();
    return chunk
  }

  if (!chunk.equals(PADDING)) {
    this._cipher.scrub();
    throw new Error('data not multiple of block length')
  }
};

Cipher$1.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo;
  return this
};

function Splitter$1 () {
  this.cache = Buffer$2.allocUnsafe(0);
}

Splitter$1.prototype.add = function (data) {
  this.cache = Buffer$2.concat([this.cache, data]);
};

Splitter$1.prototype.get = function () {
  if (this.cache.length > 15) {
    var out = this.cache.slice(0, 16);
    this.cache = this.cache.slice(16);
    return out
  }
  return null
};

Splitter$1.prototype.flush = function () {
  var len = 16 - this.cache.length;
  var padBuff = Buffer$2.allocUnsafe(len);

  var i = -1;
  while (++i < len) {
    padBuff.writeUInt8(len, i);
  }

  return Buffer$2.concat([this.cache, padBuff])
};

function createCipheriv$1 (suite, password, iv) {
  var config = MODES$1[suite.toLowerCase()];
  if (!config) throw new TypeError('invalid suite type')

  if (typeof password === 'string') password = Buffer$2.from(password);
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (typeof iv === 'string') iv = Buffer$2.from(iv);
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (config.type === 'stream') {
    return new StreamCipher$1(config.module, password, iv)
  } else if (config.type === 'auth') {
    return new AuthCipher$1(config.module, password, iv)
  }

  return new Cipher$1(config.module, password, iv)
}

function createCipher$1 (suite, password) {
  var config = MODES$1[suite.toLowerCase()];
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk$1(password, false, config.key, config.iv);
  return createCipheriv$1(suite, keys.key, keys.iv)
}

encrypter.createCipheriv = createCipheriv$1;
encrypter.createCipher = createCipher$1;

var decrypter = {};

var AuthCipher = authCipher;
var Buffer$1 = require$$0$1.Buffer;
var MODES = modes_1;
var StreamCipher = streamCipher;
var Transform = require$$2$1;
var aes = aes$4;
var ebtk = require$$6;
var inherits = require$$3;

function Decipher$1 (mode, key, iv) {
  Transform.call(this);

  this._cache = new Splitter();
  this._last = void 0;
  this._cipher = new aes.AES(key);
  this._prev = Buffer$1.from(iv);
  this._mode = mode;
  this._autopadding = true;
}

inherits(Decipher$1, Transform);

Decipher$1.prototype._update = function (data) {
  this._cache.add(data);
  var chunk;
  var thing;
  var out = [];
  while ((chunk = this._cache.get(this._autopadding))) {
    thing = this._mode.decrypt(this, chunk);
    out.push(thing);
  }
  return Buffer$1.concat(out)
};

Decipher$1.prototype._final = function () {
  var chunk = this._cache.flush();
  if (this._autopadding) {
    return unpad(this._mode.decrypt(this, chunk))
  } else if (chunk) {
    throw new Error('data not multiple of block length')
  }
};

Decipher$1.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo;
  return this
};

function Splitter () {
  this.cache = Buffer$1.allocUnsafe(0);
}

Splitter.prototype.add = function (data) {
  this.cache = Buffer$1.concat([this.cache, data]);
};

Splitter.prototype.get = function (autoPadding) {
  var out;
  if (autoPadding) {
    if (this.cache.length > 16) {
      out = this.cache.slice(0, 16);
      this.cache = this.cache.slice(16);
      return out
    }
  } else {
    if (this.cache.length >= 16) {
      out = this.cache.slice(0, 16);
      this.cache = this.cache.slice(16);
      return out
    }
  }

  return null
};

Splitter.prototype.flush = function () {
  if (this.cache.length) return this.cache
};

function unpad (last) {
  var padded = last[15];
  if (padded < 1 || padded > 16) {
    throw new Error('unable to decrypt data')
  }
  var i = -1;
  while (++i < padded) {
    if (last[(i + (16 - padded))] !== padded) {
      throw new Error('unable to decrypt data')
    }
  }
  if (padded === 16) return

  return last.slice(0, 16 - padded)
}

function createDecipheriv$1 (suite, password, iv) {
  var config = MODES[suite.toLowerCase()];
  if (!config) throw new TypeError('invalid suite type')

  if (typeof iv === 'string') iv = Buffer$1.from(iv);
  if (config.mode !== 'GCM' && iv.length !== config.iv) throw new TypeError('invalid iv length ' + iv.length)

  if (typeof password === 'string') password = Buffer$1.from(password);
  if (password.length !== config.key / 8) throw new TypeError('invalid key length ' + password.length)

  if (config.type === 'stream') {
    return new StreamCipher(config.module, password, iv, true)
  } else if (config.type === 'auth') {
    return new AuthCipher(config.module, password, iv, true)
  }

  return new Decipher$1(config.module, password, iv)
}

function createDecipher$1 (suite, password) {
  var config = MODES[suite.toLowerCase()];
  if (!config) throw new TypeError('invalid suite type')

  var keys = ebtk(password, false, config.key, config.iv);
  return createDecipheriv$1(suite, keys.key, keys.iv)
}

decrypter.createDecipher = createDecipher$1;
decrypter.createDecipheriv = createDecipheriv$1;

var getCiphers_1;
var Decipheriv;
var Decipher;
var Cipheriv;
var Cipher;
var ciphers = encrypter;
var deciphers = decrypter;
var modes = require$$2;

function getCiphers () {
  return Object.keys(modes)
}

var createCipher = browser.createCipher = Cipher = browser.Cipher = ciphers.createCipher;
var createCipheriv = browser.createCipheriv = Cipheriv = browser.Cipheriv = ciphers.createCipheriv;
var createDecipher = browser.createDecipher = Decipher = browser.Decipher = deciphers.createDecipher;
var createDecipheriv = browser.createDecipheriv = Decipheriv = browser.Decipheriv = deciphers.createDecipheriv;
var listCiphers = browser.listCiphers = getCiphers_1 = browser.getCiphers = getCiphers;

export { Cipher, Cipheriv, Decipher, Decipheriv, createCipher, createCipheriv, createDecipher, createDecipheriv, browser as default, getCiphers_1 as getCiphers, listCiphers };
