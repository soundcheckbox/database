import require$$0$2 from '../../protocol-buffers-schema/dist/index.js';
import require$$0 from '../../varint/dist/index.js';
import require$$1 from '../../uint8arrays/dist/from-string.js';
import require$$2 from '../../uint8arrays/dist/to-string.js';
import require$$0$1 from '../../signed-varint/dist/index.js';

var encodings$1 = {};

function encoder$c (type, encode, decode, encodingLength) {
  encode.bytes = decode.bytes = 0;

  return {
    type: type,
    encode: encode,
    decode: decode,
    encodingLength: encodingLength
  }
}

var encoder_1 = encoder$c;

const varint$8 = require$$0;
const encoder$b = encoder_1;

function bytesBufferLength (val) {
  return val.byteLength
}

function bytesEncodingLength (val) {
  const len = bytesBufferLength(val);
  return varint$8.encodingLength(len) + len
}

function bytesEncode (val, buffer, dataView, offset) {
  const oldOffset = offset;
  const len = bytesBufferLength(val);

  varint$8.encode(len, buffer, offset);
  offset += varint$8.encode.bytes;

  buffer.set(val, offset);
  offset += len;

  bytesEncode.bytes = offset - oldOffset;
}

function bytesDecode (buffer, dataView, offset) {
  const oldOffset = offset;

  const len = varint$8.decode(buffer, offset);
  offset += varint$8.decode.bytes;

  const val = buffer.slice(offset, offset + len);
  offset += val.length;

  bytesDecode.bytes = offset - oldOffset;

  return val
}

var bytes = encoder$b(2, bytesEncode, bytesDecode, bytesEncodingLength);

const varint$7 = require$$0;
const uint8ArrayFromString = require$$1;
const uint8ArrayToString = require$$2;
const encoder$a = encoder_1;

function stringEncodingLength (val) {
  const len = uint8ArrayFromString(val).byteLength;
  return varint$7.encodingLength(len) + len
}

function stringEncode (val, buffer, dataView, offset) {
  const oldOffset = offset;
  const len = uint8ArrayFromString(val).byteLength;

  varint$7.encode(len, buffer, offset, 'utf-8');
  offset += varint$7.encode.bytes;

  const arr = uint8ArrayFromString(val);
  buffer.set(arr, offset);
  offset += arr.length;

  stringEncode.bytes = offset - oldOffset;
}

function stringDecode (buffer, dataView, offset) {
  const oldOffset = offset;

  const len = varint$7.decode(buffer, offset);
  offset += varint$7.decode.bytes;

  const val = uint8ArrayToString(buffer.subarray(offset, offset + len));
  offset += len;

  stringDecode.bytes = offset - oldOffset;

  return val
}

var string = encoder$a(2, stringEncode, stringDecode, stringEncodingLength);

const encoder$9 = encoder_1;

function boolEncodingLength () {
  return 1
}

function boolEncode (value, buffer, dataView, offset) {
  buffer[offset] = value ? 1 : 0;
  boolEncode.bytes = 1;
}

function boolDecode (buffer, dataView, offset) {
  const bool = buffer[offset] > 0;
  boolDecode.bytes = 1;

  return bool
}

var bool = encoder$9(0, boolEncode, boolDecode, boolEncodingLength);

const varint$6 = require$$0;
const encoder$8 = encoder_1;

function in32Encode (val, buffer, dataView, offset) {
  varint$6.encode(val < 0 ? val + 4294967296 : val, buffer, offset);
  in32Encode.bytes = varint$6.encode.bytes;
}

function int32Decode (buffer, dataView, offset) {
  const val = varint$6.decode(buffer, offset);
  int32Decode.bytes = varint$6.decode.bytes;

  return val > 2147483647 ? val - 4294967296 : val
}

function int32EncodingLength (val) {
  return varint$6.encodingLength(val < 0 ? val + 4294967296 : val)
}

var int32 = encoder$8(0, in32Encode, int32Decode, int32EncodingLength);

const varint$5 = require$$0;
const encoder$7 = encoder_1;

function int64Encode (val, buffer, dataView, offset) {
  if (val < 0) {
    const last = offset + 9;
    varint$5.encode(val * -1, buffer, offset);

    offset += varint$5.encode.bytes - 1;
    buffer[offset] = buffer[offset] | 0x80;

    while (offset < last - 1) {
      offset++;
      buffer[offset] = 0xff;
    }
    buffer[last] = 0x01;

    int64Encode.bytes = 10;
  } else {
    varint$5.encode(val, buffer, offset);
    int64Encode.bytes = varint$5.encode.bytes;
  }
}

function int64Decode (buffer, dataView, offset) {
  let val = varint$5.decode(buffer, offset);

  if (val >= Math.pow(2, 63)) {
    let limit = 9;
    while (buffer[offset + limit - 1] === 0xff) limit--;
    limit = limit || 9;
    const subset = buffer.subarray(offset, offset + limit);
    subset[limit - 1] = subset[limit - 1] & 0x7f;
    val = -1 * varint$5.decode(subset, 0);
    int64Decode.bytes = 10;
  } else {
    int64Decode.bytes = varint$5.decode.bytes;
  }

  return val
}

function int64EncodingLength (val) {
  return val < 0 ? 10 : varint$5.encodingLength(val)
}

var int64 = encoder$7(0, int64Encode, int64Decode, int64EncodingLength);

const svarint = require$$0$1;
const encoder$6 = encoder_1;

function svarintEncode (val, buffer, dataView, offset) {
  svarint.encode(val, buffer, offset);

  svarintEncode.bytes = svarint.encode.bytes;
}

function svarintDecode (buffer, dataView, offset) {
  const val = svarint.decode(buffer, offset);
  svarintDecode.bytes = svarint.decode.bytes;

  return val
}

var sint64 = encoder$6(0, svarintEncode, svarintDecode, svarint.encodingLength);

const varint$4 = require$$0;
const encoder$5 = encoder_1;

function varintEncode (val, buffer, dataView, offset) {
  varint$4.encode(val, buffer, offset);

  varintEncode.bytes = varint$4.encode.bytes;
}

function varintDecode (buffer, dataView, offset) {
  const val = varint$4.decode(buffer, offset);
  varintDecode.bytes = varint$4.decode.bytes;

  return val
}

var varint_1 = encoder$5(0, varintEncode, varintDecode, varint$4.encodingLength);

const encoder$4 = encoder_1;

function fixed64EncodingLength () {
  return 8
}

function fixed64Encode (val, buffer, dataView, offset) {
  for (const byte of val) {
    buffer[offset] = byte;
    offset++;
  }

  fixed64Encode.bytes = 8;
}

function fixed64Decode (buffer, dataView, offset) {
  const val = buffer.slice(offset, offset + 8);
  fixed64Decode.bytes = 8;

  return val
}

var fixed64 = encoder$4(1, fixed64Encode, fixed64Decode, fixed64EncodingLength);

const encoder$3 = encoder_1;

function doubleEncodingLength () {
  return 8
}

function doubleEncode (val, buffer, dataView, offset) {
  dataView.setFloat64(offset, val, true);
  doubleEncode.bytes = 8;
}

function doubleDecode (buffer, dataView, offset) {
  const val = dataView.getFloat64(offset, true);
  doubleDecode.bytes = 8;

  return val
}

var double = encoder$3(1, doubleEncode, doubleDecode, doubleEncodingLength);

const encoder$2 = encoder_1;

function fixed32EncodingLength (val) {
  return 4
}

function fixed32Encode (val, buffer, dataView, offset) {
  dataView.setUint32(offset, val, true);
  fixed32Encode.bytes = 4;
}

function fixed32Decode (buffer, dataView, offset) {
  const val = dataView.getUint32(offset, true);
  fixed32Decode.bytes = 4;

  return val
}

var fixed32 = encoder$2(5, fixed32Encode, fixed32Decode, fixed32EncodingLength);

const encoder$1 = encoder_1;

function sfixed32EncodingLength (val) {
  return 4
}

function sfixed32Encode (val, buffer, dataView, offset) {
  dataView.setInt32(offset, val, true);
  sfixed32Encode.bytes = 4;
}

function sfixed32Decode (buffer, dataView, offset) {
  const val = dataView.getInt32(offset, true);
  sfixed32Decode.bytes = 4;

  return val
}

var sfixed32 = encoder$1(5, sfixed32Encode, sfixed32Decode, sfixed32EncodingLength);

const encoder = encoder_1;

function floatEncodingLength () {
  return 4
}

function floatEncode (val, buffer, dataView, offset) {
  dataView.setFloat32(offset, val, true);
  floatEncode.bytes = 4;
}

function floatDecode (buffer, dataView, offset) {
  const val = dataView.getFloat32(offset, true);
  floatDecode.bytes = 4;

  return val
}

var float = encoder(5, floatEncode, floatDecode, floatEncodingLength);

encodings$1.make = encoder_1;
encodings$1.bytes = bytes;
encodings$1.string = string;
encodings$1.bool = bool;
encodings$1.int32 = int32;
encodings$1.int64 = int64;
encodings$1.sint32 =
encodings$1.sint64 = sint64;
encodings$1.uint32 =
encodings$1.uint64 =
encodings$1.enum =
encodings$1.varint = varint_1;

// we cannot represent these in javascript so we just use buffers
encodings$1.fixed64 =
encodings$1.sfixed64 = fixed64;
encodings$1.double = double;
encodings$1.fixed32 = fixed32;
encodings$1.sfixed32 = sfixed32;
encodings$1.float = float;

var utils = {};

utils.defined = function (val) {
  return val !== null && val !== undefined && (typeof val !== 'number' || !isNaN(val))
};

/* eslint max-depth: 1 */

const varint$3 = require$$0;
const defined$2 = utils.defined;

function toSentenceCase (string) {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(1)}`
}

function addPropertyAccessors (obj, name, value, defaultValue) {
  if (Object.prototype.hasOwnProperty.call(obj, name)) {
    // have already added this property
    return
  }

  const sentenceCaseName = toSentenceCase(name);

  Object.defineProperties(obj, {
    [name]: {
      enumerable: true,
      configurable: true,
      set: (val) => {
        value = val;
      },
      get: () => {
        if (value === undefined) {
          return defaultValue
        }

        return value
      }
    },
    [`has${sentenceCaseName}`]: {
      configurable: true,
      value: () => {
        return value !== undefined
      }
    },
    [`set${sentenceCaseName}`]: {
      configurable: true,
      value: (val) => {
        value = val;
      }
    },
    [`get${sentenceCaseName}`]: {
      configurable: true,
      value: () => {
        return value
      }
    },
    [`clear${sentenceCaseName}`]: {
      configurable: true,
      value: () => {
        value = undefined;
        obj[name] = undefined;
      }
    }
  });
}

function compileDecode$1 (m, resolve, enc) {
  const requiredFields = [];
  const fields = {};
  const oneofFields = [];
  const vals = [];

  for (var i = 0; i < enc.length; i++) {
    const field = m.fields[i];

    fields[field.tag] = i;

    const def = field.options && field.options.default;
    const resolved = resolve(field.type, m.id, false);
    vals[i] = [def, resolved && resolved.values];

    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false';

    if (field.required) {
      requiredFields.push(field.name);
    }

    if (field.oneof) {
      oneofFields.push(field.name);
    }
  }

  function decodeField (e, field, obj, buf, dataView, offset, i) {
    const name = field.name;

    if (field.oneof) {
      // clear already defined oneof fields
      const props = Object.keys(obj);
      for (var j = 0; j < props.length; j++) {
        if (oneofFields.indexOf(props[j]) > -1) {
          const sentenceCase = toSentenceCase(props[j]);
          delete obj[`has${sentenceCase}`];
          delete obj[`get${sentenceCase}`];
          delete obj[`set${sentenceCase}`];
          delete obj[`clear${sentenceCase}`];
          delete obj[props[j]];
        }
      }
    }

    let value;

    if (e.message) {
      const len = varint$3.decode(buf, offset);
      offset += varint$3.decode.bytes;

      const decoded = e.decode(buf, dataView, offset, offset + len);

      if (field.map) {
        value = obj[name] || {};
        value[decoded.key] = decoded.value;
      } else if (field.repeated) {
        value = obj[name] || [];
        value.push(decoded);
      } else {
        value = decoded;
      }
    } else {
      if (field.repeated) {
        value = obj[name] || [];
        value.push(e.decode(buf, dataView, offset));
      } else {
        value = e.decode(buf, dataView, offset);
      }
    }

    addPropertyAccessors(obj, name, value);

    offset += e.decode.bytes;

    return offset
  }

  return function decode (buf, view, offset, end) {
    if (offset == null) {
      offset = 0;
    }

    if (end == null) {
      end = buf.length;
    }

    if (!(end <= buf.length && offset <= buf.length)) {
      throw new Error('Decoded message is not valid')
    }

    if (!view) {
      view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }

    var oldOffset = offset;
    var obj = {};
    var field;

    while (true) {
      if (end <= offset) {
        // finished

        // check required methods
        var name = '';
        var j = 0;
        for (j = 0; j < requiredFields.length; j++) {
          name = requiredFields[j];
          if (!defined$2(obj[name])) {
            throw new Error('Decoded message is not valid, missing required field: ' + name)
          }
        }

        // fill out missing defaults
        var val;
        var def;
        for (j = 0; j < enc.length; j++) {
          field = m.fields[j];
          def = vals[j][0];
          val = vals[j][1];
          name = field.name;
          let defaultVal;

          if (Object.prototype.hasOwnProperty.call(obj, name)) {
            continue
          }

          var done = false;

          if (field.oneof) {
            var props = Object.keys(obj);

            for (var k = 0; k < props.length; k++) {
              if (oneofFields.indexOf(props[k]) > -1) {
                done = true;
                break
              }
            }
          }

          if (done) {
            continue
          }

          if (val) { // is enum
            if (field.repeated) {
              def = [];
            } else {
              def = (def && val[def]) ? val[def].value : val[Object.keys(val)[0]].value;
              def = parseInt(def || 0, 10);
            }
          } else {
            defaultVal = defaultValue(field);
            def = coerceValue(field, def);
          }

          addPropertyAccessors(obj, name, def, defaultVal);
        }

        decode.bytes = offset - oldOffset;
        return obj
      }

      var prefix = varint$3.decode(buf, offset);
      offset += varint$3.decode.bytes;
      var tag = prefix >> 3;

      var i = fields[tag];

      if (i == null) {
        offset = skip(prefix & 7, buf, view, offset);
        continue
      }

      var e = enc[i];
      field = m.fields[i];

      if (field.packed) {
        var packedEnd = varint$3.decode(buf, offset);
        offset += varint$3.decode.bytes;
        packedEnd += offset;

        while (offset < packedEnd) {
          offset = decodeField(e, field, obj, buf, view, offset);
        }
      } else {
        offset = decodeField(e, field, obj, buf, view, offset);
      }
    }
  }
}

var skip = function (type, buffer, view, offset) {
  switch (type) {
    case 0:
      varint$3.decode(buffer, offset);
      return offset + varint$3.decode.bytes

    case 1:
      return offset + 8

    case 2:
      var len = varint$3.decode(buffer, offset);
      return offset + varint$3.decode.bytes + len

    case 3:
    case 4:
      throw new Error('Groups are not supported')

    case 5:
      return offset + 4
    default:
      throw new Error('Unknown wire type: ' + type)
  }
};

var defaultValue = function (f) {
  if (f.map) return {}
  if (f.repeated) return []

  switch (f.type) {
    case 'string':
      return ''
    case 'bool':
      return false
    case 'float':
    case 'double':
    case 'sfixed32':
    case 'fixed32':
    case 'varint':
    case 'enum':
    case 'uint64':
    case 'uint32':
    case 'int64':
    case 'int32':
    case 'sint64':
    case 'sint32':
      return 0
    default:
      return null
  }
};

var coerceValue = function (f, def) {
  if (def === undefined) {
    return def
  }

  switch (f.type) {
    case 'bool':
      return def === 'true'
    case 'float':
    case 'double':
    case 'sfixed32':
    case 'fixed32':
    case 'varint':
    case 'enum':
    case 'uint64':
    case 'uint32':
    case 'int64':
    case 'int32':
    case 'sint64':
    case 'sint32':
      return parseInt(def, 10)
    default:
      return def
  }
};

var decode = compileDecode$1;

var defined$1 = utils.defined;
var varint$2 = require$$0;

function compileEncode$1 (m, resolve, enc, oneofs, encodingLength) {
  const oneofsKeys = Object.keys(oneofs);
  const encLength = enc.length;
  const ints = {};
  for (let i = 0; i < encLength; i++) {
    ints[i] = {
      p: varint$2.encode(m.fields[i].tag << 3 | 2),
      h: varint$2.encode(m.fields[i].tag << 3 | enc[i].type)
    };

    const field = m.fields[i];
    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false';
  }

  function encodeField (buf, view, offset, h, e, packed, innerVal) {
    let j = 0;
    if (!packed) {
      for (j = 0; j < h.length; j++) {
        buf[offset++] = h[j];
      }
    }

    if (e.message) {
      varint$2.encode(e.encodingLength(innerVal), buf, offset);
      offset += varint$2.encode.bytes;
    }

    e.encode(innerVal, buf, view, offset);

    return offset + e.encode.bytes
  }

  return function encode (obj, buf, view, offset = 0) {
    if (buf == null) {
      buf = new Uint8Array(encodingLength(obj));
    }

    if (view == null) {
      view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }

    const oldOffset = offset;
    const objKeys = Object.keys(obj);
    let i = 0;

    // oneof checks

    let match = false;
    for (i = 0; i < oneofsKeys.length; i++) {
      const name = oneofsKeys[i];
      const prop = oneofs[i];
      if (objKeys.indexOf(prop) > -1) {
        if (match) {
          throw new Error('only one of the properties defined in oneof ' + name + ' can be set')
        }

        match = true;
      }
    }

    for (i = 0; i < encLength; i++) {
      const e = enc[i];
      const field = m.fields[i]; // was f
      let val = obj[field.name];
      let j = 0;

      if (!defined$1(val)) {
        if (field.required) {
          throw new Error(field.name + ' is required')
        }
        continue
      }
      const p = ints[i].p;
      const h = ints[i].h;

      const packed = field.packed;

      if (field.map) {
        const tmp = Object.keys(val);
        for (j = 0; j < tmp.length; j++) {
          tmp[j] = {
            key: tmp[j],
            value: val[tmp[j]]
          };
        }
        val = tmp;
      }

      if (packed) {
        let packedLen = 0;
        for (j = 0; j < val.length; j++) {
          if (!Object.prototype.hasOwnProperty.call(val, j)) {
            continue
          }

          packedLen += e.encodingLength(val[j]);
        }

        if (packedLen) {
          for (j = 0; j < h.length; j++) {
            buf[offset++] = p[j];
          }
          varint$2.encode(packedLen, buf, offset);
          offset += varint$2.encode.bytes;
        }
      }

      if (field.repeated) {
        let innerVal;
        for (j = 0; j < val.length; j++) {
          innerVal = val[j];
          if (!defined$1(innerVal)) {
            continue
          }

          offset = encodeField(buf, view, offset, h, e, packed, innerVal);
        }
      } else {
        offset = encodeField(buf, view, offset, h, e, packed, val);
      }
    }

    encode.bytes = offset - oldOffset;
    return buf
  }
}

var encode = compileEncode$1;

var defined = utils.defined;
var varint$1 = require$$0;

function compileEncodingLength$1 (m, enc, oneofs) {
  const oneofsKeys = Object.keys(oneofs);
  const encLength = enc.length;

  const hls = new Array(encLength);

  for (let i = 0; i < m.fields.length; i++) {
    hls[i] = varint$1.encodingLength(m.fields[i].tag << 3 | enc[i].type);

    const field = m.fields[i];
    m.fields[i].packed = field.repeated && field.options && field.options.packed && field.options.packed !== 'false';
  }

  return function encodingLength (obj) {
    let length = 0;
    let i = 0;
    let j = 0;

    for (i = 0; i < oneofsKeys.length; i++) {
      const name = oneofsKeys[i];
      const props = oneofs[name];

      let match = false;
      for (j = 0; j < props.length; j++) {
        if (defined(obj[props[j]])) {
          if (match) {
            throw new Error('only one of the properties defined in oneof ' + name + ' can be set')
          }
          match = true;
        }
      }
    }

    for (i = 0; i < encLength; i++) {
      const e = enc[i];
      const field = m.fields[i];
      let val = obj[field.name];
      const hl = hls[i];
      let len;

      if (!defined(val)) {
        if (field.required) {
          throw new Error(field.name + ' is required')
        }

        continue
      }

      if (field.map) {
        const tmp = Object.keys(val);
        for (j = 0; j < tmp.length; j++) {
          tmp[j] = {
            key: tmp[j],
            value: val[tmp[j]]
          };
        }

        val = tmp;
      }

      if (field.packed) {
        let packedLen = 0;
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }
          len = e.encodingLength(val[j]);
          packedLen += len;

          if (e.message) {
            packedLen += varint$1.encodingLength(len);
          }
        }

        if (packedLen) {
          length += hl + packedLen + varint$1.encodingLength(packedLen);
        }
      } else if (field.repeated) {
        for (j = 0; j < val.length; j++) {
          if (!defined(val[j])) {
            continue
          }

          len = e.encodingLength(val[j]);
          length += hl + len + (e.message ? varint$1.encodingLength(len) : 0);
        }
      } else {
        len = e.encodingLength(val);
        length += hl + len + (e.message ? varint$1.encodingLength(len) : 0);
      }
    }

    return length
  }
}

var encodingLength = compileEncodingLength$1;

const encodings = encodings$1;
const compileDecode = decode;
const compileEncode = encode;
const compileEncodingLength = encodingLength;
const varint = require$$0;

const flatten$1 = function (values) {
  if (!values) return null
  const result = {};
  Object.keys(values).forEach(function (k) {
    result[k] = values[k].value;
  });
  return result
};

var compile$1 = function (schema, extraEncodings) {
  const messages = {};
  const enums = {};
  const cache = {};

  const visit = function (schema, prefix) {
    if (schema.enums) {
      schema.enums.forEach(function (e) {
        e.id = prefix + (prefix ? '.' : '') + e.name;
        enums[e.id] = e;
        visit(e, e.id);
      });
    }
    if (schema.messages) {
      schema.messages.forEach(function (m) {
        m.id = prefix + (prefix ? '.' : '') + m.name;
        messages[m.id] = m;
        m.fields.forEach(function (f) {
          if (!f.map) return

          const name = 'Map_' + f.map.from + '_' + f.map.to;
          const map = {
            name: name,
            enums: [],
            messages: [],
            fields: [{
              name: 'key',
              type: f.map.from,
              tag: 1,
              repeated: false,
              required: true
            }, {
              name: 'value',
              type: f.map.to,
              tag: 2,
              repeated: false,
              required: false
            }],
            extensions: null,
            id: prefix + (prefix ? '.' : '') + name
          };

          if (!messages[map.id]) {
            messages[map.id] = map;
            schema.messages.push(map);
          }
          f.type = name;
          f.repeated = true;
        });
        visit(m, m.id);
      });
    }
  };

  visit(schema, '');

  const compileEnum = function (e) {
    const values = Object.keys(e.values || []).map(function (k) {
      return parseInt(e.values[k].value, 10)
    });

    const encode = function enumEncode (val, buf, view, offset) {
      if (!values.length || values.indexOf(val) === -1) {
        throw new Error('Invalid enum value: ' + val)
      }
      varint.encode(val, buf, offset);
      enumEncode.bytes = varint.encode.bytes;
      return buf
    };

    const decode = function enumDecode (buf, view, offset) {
      var val = varint.decode(buf, offset);
      if (!values.length || values.indexOf(val) === -1) {
        throw new Error('Invalid enum value: ' + val)
      }
      enumDecode.bytes = varint.decode.bytes;
      return val
    };

    return encodings.make(0, encode, decode, varint.encodingLength)
  };

  const compileMessage = function (m, exports) {
    m.messages.forEach(function (nested) {
      exports[nested.name] = resolve(nested.name, m.id);
    });

    m.enums.forEach(function (val) {
      exports[val.name] = flatten$1(val.values);
    });

    exports.type = 2;
    exports.message = true;
    exports.name = m.name;

    const oneofs = {};

    m.fields.forEach(function (f) {
      if (!f.oneof) return
      if (!oneofs[f.oneof]) oneofs[f.oneof] = [];
      oneofs[f.oneof].push(f.name);
    });

    const enc = m.fields.map(function (f) {
      return resolve(f.type, m.id)
    });

    const encodingLength = compileEncodingLength(m, enc, oneofs);
    const encode = compileEncode(m, resolve, enc, oneofs, encodingLength);
    const decode = compileDecode(m, resolve, enc);

    // end of compilation - return all the things

    encode.bytes = decode.bytes = 0;

    exports.buffer = true;
    exports.encode = encode;
    exports.decode = decode;
    exports.encodingLength = encodingLength;

    return exports
  };

  const resolve = function (name, from, compile) {
    if (extraEncodings && extraEncodings[name]) return extraEncodings[name]
    if (encodings[name]) return encodings[name]

    const m = (from ? from + '.' + name : name).split('.')
      .map(function (part, i, list) {
        return list.slice(0, i).concat(name).join('.')
      })
      .reverse()
      .reduce(function (result, id) {
        return result || messages[id] || enums[id]
      }, null);

    if (compile === false) return m
    if (!m) throw new Error('Could not resolve ' + name)

    if (m.values) return compileEnum(m)
    const res = cache[m.id] || compileMessage(m, cache[m.id] = {});
    return res
  };

  return (schema.enums || []).concat((schema.messages || []).map(function (message) {
    return resolve(message.id)
  }))
};

var schema = require$$0$2;
var compile = compile$1;

var flatten = function (values) {
  if (!values) return null
  var result = {};
  Object.keys(values).forEach(function (k) {
    result[k] = values[k].value;
  });
  return result
};

var src = function (proto, opts) {
  if (!opts) opts = {};
  if (!proto) throw new Error('Pass in a .proto string or a protobuf-schema parsed object')

  var sch = (typeof proto === 'object' && !(proto instanceof Uint8Array)) ? proto : schema.parse(proto);

  // to not make toString,toJSON enumarable we make a fire-and-forget prototype
  var Messages = function () {
    var self = this;

    compile(sch, opts.encodings || {}).forEach(function (m) {
      self[m.name] = flatten(m.values) || m;
    });
  };

  Messages.prototype.toString = function () {
    return schema.stringify(sch)
  };

  Messages.prototype.toJSON = function () {
    return sch
  };

  return new Messages()
};

export { src as default };
