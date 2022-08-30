import require$$0 from '../../buffer-xor/dist/index.js';
import require$$0$1 from '../../safe-buffer/dist/index.js';

var ecb = {};

ecb.encrypt = function (self, block) {
  return self._cipher.encryptBlock(block)
};

ecb.decrypt = function (self, block) {
  return self._cipher.decryptBlock(block)
};

var cbc = {};

var xor$3 = require$$0;

cbc.encrypt = function (self, block) {
  var data = xor$3(block, self._prev);

  self._prev = self._cipher.encryptBlock(data);
  return self._prev
};

cbc.decrypt = function (self, block) {
  var pad = self._prev;

  self._prev = block;
  var out = self._cipher.decryptBlock(block);

  return xor$3(out, pad)
};

var cfb = {};

var Buffer$4 = require$$0$1.Buffer;
var xor$2 = require$$0;

function encryptStart (self, data, decrypt) {
  var len = data.length;
  var out = xor$2(data, self._cache);
  self._cache = self._cache.slice(len);
  self._prev = Buffer$4.concat([self._prev, decrypt ? data : out]);
  return out
}

cfb.encrypt = function (self, data, decrypt) {
  var out = Buffer$4.allocUnsafe(0);
  var len;

  while (data.length) {
    if (self._cache.length === 0) {
      self._cache = self._cipher.encryptBlock(self._prev);
      self._prev = Buffer$4.allocUnsafe(0);
    }

    if (self._cache.length <= data.length) {
      len = self._cache.length;
      out = Buffer$4.concat([out, encryptStart(self, data.slice(0, len), decrypt)]);
      data = data.slice(len);
    } else {
      out = Buffer$4.concat([out, encryptStart(self, data, decrypt)]);
      break
    }
  }

  return out
};

var cfb8 = {};

var Buffer$3 = require$$0$1.Buffer;

function encryptByte$1 (self, byteParam, decrypt) {
  var pad = self._cipher.encryptBlock(self._prev);
  var out = pad[0] ^ byteParam;

  self._prev = Buffer$3.concat([
    self._prev.slice(1),
    Buffer$3.from([decrypt ? byteParam : out])
  ]);

  return out
}

cfb8.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length;
  var out = Buffer$3.allocUnsafe(len);
  var i = -1;

  while (++i < len) {
    out[i] = encryptByte$1(self, chunk[i], decrypt);
  }

  return out
};

var cfb1 = {};

var Buffer$2 = require$$0$1.Buffer;

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
  var out = Buffer$2.allocUnsafe(buffer.length);
  buffer = Buffer$2.concat([buffer, Buffer$2.from([value])]);

  while (++i < len) {
    out[i] = buffer[i] << 1 | buffer[i + 1] >> (7);
  }

  return out
}

cfb1.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length;
  var out = Buffer$2.allocUnsafe(len);
  var i = -1;

  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt);
  }

  return out
};

var ofb = {};

var xor$1 = require$$0;

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
  return xor$1(chunk, pad)
};

var ctr = {};

function incr32$1 (iv) {
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
var incr32_1 = incr32$1;

var xor = require$$0;
var Buffer$1 = require$$0$1.Buffer;
var incr32 = incr32_1;

function getBlock (self) {
  var out = self._cipher.encryptBlockRaw(self._prev);
  incr32(self._prev);
  return out
}

var blockSize = 16;
ctr.encrypt = function (self, chunk) {
  var chunkNum = Math.ceil(chunk.length / blockSize);
  var start = self._cache.length;
  self._cache = Buffer$1.concat([
    self._cache,
    Buffer$1.allocUnsafe(chunkNum * blockSize)
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
  return xor(chunk, pad)
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
var require$$7 = {
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

var modes = require$$7;

for (var key in modes) {
  modes[key].module = modeModules[modes[key].mode];
}

var modes_1 = modes;

export { modes_1 as default };
