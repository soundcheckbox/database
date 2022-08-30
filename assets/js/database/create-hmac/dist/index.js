import require$$0 from '../../inherits/dist/index.js';
import require$$1 from '../../safe-buffer/dist/index.js';
import require$$2 from '../../cipher-base/dist/index.js';
import require$$4 from '../../create-hash/dist/md5.js';
import require$$5 from '../../ripemd160/dist/index.js';
import require$$6 from '../../sha.js/dist/index.js';

var inherits$1 = require$$0;
var Buffer$1 = require$$1.Buffer;

var Base$1 = require$$2;

var ZEROS$1 = Buffer$1.alloc(128);
var blocksize = 64;

function Hmac$1 (alg, key) {
  Base$1.call(this, 'digest');
  if (typeof key === 'string') {
    key = Buffer$1.from(key);
  }

  this._alg = alg;
  this._key = key;

  if (key.length > blocksize) {
    key = alg(key);
  } else if (key.length < blocksize) {
    key = Buffer$1.concat([key, ZEROS$1], blocksize);
  }

  var ipad = this._ipad = Buffer$1.allocUnsafe(blocksize);
  var opad = this._opad = Buffer$1.allocUnsafe(blocksize);

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36;
    opad[i] = key[i] ^ 0x5C;
  }

  this._hash = [ipad];
}

inherits$1(Hmac$1, Base$1);

Hmac$1.prototype._update = function (data) {
  this._hash.push(data);
};

Hmac$1.prototype._final = function () {
  var h = this._alg(Buffer$1.concat(this._hash));
  return this._alg(Buffer$1.concat([this._opad, h]))
};
var legacy = Hmac$1;

var inherits = require$$0;
var Legacy = legacy;
var Base = require$$2;
var Buffer = require$$1.Buffer;
var md5 = require$$4;
var RIPEMD160 = require$$5;

var sha = require$$6;

var ZEROS = Buffer.alloc(128);

function Hmac (alg, key) {
  Base.call(this, 'digest');
  if (typeof key === 'string') {
    key = Buffer.from(key);
  }

  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64;

  this._alg = alg;
  this._key = key;
  if (key.length > blocksize) {
    var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg);
    key = hash.update(key).digest();
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize);
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize);
  var opad = this._opad = Buffer.allocUnsafe(blocksize);

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36;
    opad[i] = key[i] ^ 0x5C;
  }
  this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg);
  this._hash.update(ipad);
}

inherits(Hmac, Base);

Hmac.prototype._update = function (data) {
  this._hash.update(data);
};

Hmac.prototype._final = function () {
  var h = this._hash.digest();
  var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg);
  return hash.update(this._opad).update(h).digest()
};

var browser = function createHmac (alg, key) {
  alg = alg.toLowerCase();
  if (alg === 'rmd160' || alg === 'ripemd160') {
    return new Hmac('rmd160', key)
  }
  if (alg === 'md5') {
    return new Legacy(md5, key)
  }
  return new Hmac(alg, key)
};

export { browser as default };
