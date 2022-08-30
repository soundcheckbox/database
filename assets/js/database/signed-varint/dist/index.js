import require$$0 from '../../varint/dist/index.js';

var signedVarint = {};

var varint = require$$0;
var encode = signedVarint.encode = function encode (v, b, o) {
  v = v >= 0 ? v*2 : v*-2 - 1;
  var r = varint.encode(v, b, o);
  encode.bytes = varint.encode.bytes;
  return r
};
var decode = signedVarint.decode = function decode (b, o) {
  var v = varint.decode(b, o);
  decode.bytes = varint.decode.bytes;
  return v & 1 ? (v+1) / -2 : v / 2
};

var encodingLength = signedVarint.encodingLength = function (v) {
  return varint.encodingLength(v >= 0 ? v*2 : v*-2 - 1)
};

export { decode, signedVarint as default, encode, encodingLength };
