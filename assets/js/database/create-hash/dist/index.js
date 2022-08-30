import require$$0 from '../../inherits/dist/index.js';
import require$$1 from '../../md5.js/dist/index.js';
import require$$2 from '../../ripemd160/dist/index.js';
import require$$3 from '../../sha.js/dist/index.js';
import require$$4 from '../../cipher-base/dist/index.js';

var inherits = require$$0;
var MD5 = require$$1;
var RIPEMD160 = require$$2;
var sha = require$$3;
var Base = require$$4;

function Hash (hash) {
  Base.call(this, 'digest');

  this._hash = hash;
}

inherits(Hash, Base);

Hash.prototype._update = function (data) {
  this._hash.update(data);
};

Hash.prototype._final = function () {
  return this._hash.digest()
};

var browser = function createHash (alg) {
  alg = alg.toLowerCase();
  if (alg === 'md5') return new MD5()
  if (alg === 'rmd160' || alg === 'ripemd160') return new RIPEMD160()

  return new Hash(sha(alg))
};

export { browser as default };
