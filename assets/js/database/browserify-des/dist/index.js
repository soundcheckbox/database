import require$$0 from '../../cipher-base/dist/index.js';
import require$$1 from '../../des.js/dist/index.js';
import require$$2 from '../../inherits/dist/index.js';
import require$$3 from '../../safe-buffer/dist/index.js';

var CipherBase = require$$0;
var des = require$$1;
var inherits = require$$2;
var Buffer = require$$3.Buffer;

var modes = {
  'des-ede3-cbc': des.CBC.instantiate(des.EDE),
  'des-ede3': des.EDE,
  'des-ede-cbc': des.CBC.instantiate(des.EDE),
  'des-ede': des.EDE,
  'des-cbc': des.CBC.instantiate(des.DES),
  'des-ecb': des.DES
};
modes.des = modes['des-cbc'];
modes.des3 = modes['des-ede3-cbc'];
var browserifyDes = DES;
inherits(DES, CipherBase);
function DES (opts) {
  CipherBase.call(this);
  var modeName = opts.mode.toLowerCase();
  var mode = modes[modeName];
  var type;
  if (opts.decrypt) {
    type = 'decrypt';
  } else {
    type = 'encrypt';
  }
  var key = opts.key;
  if (!Buffer.isBuffer(key)) {
    key = Buffer.from(key);
  }
  if (modeName === 'des-ede' || modeName === 'des-ede-cbc') {
    key = Buffer.concat([key, key.slice(0, 8)]);
  }
  var iv = opts.iv;
  if (!Buffer.isBuffer(iv)) {
    iv = Buffer.from(iv);
  }
  this._des = mode.create({
    key: key,
    iv: iv,
    type: type
  });
}
DES.prototype._update = function (data) {
  return Buffer.from(this._des.update(data))
};
DES.prototype._final = function () {
  return Buffer.from(this._des.final())
};

export { browserifyDes as default };
