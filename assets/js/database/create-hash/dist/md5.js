import require$$0 from '../../md5.js/dist/index.js';

var MD5 = require$$0;

var md5 = function (buffer) {
  return new MD5().update(buffer).digest()
};

export { md5 as default };
