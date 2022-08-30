import require$$0 from '../../buffer/dist/index.js';

var encodings$1 = {};

(function (exports) {

	const { Buffer } = require$$0;

	exports.utf8 = exports['utf-8'] = {
	  encode: function (data) {
	    return isBinary(data) ? data : String(data)
	  },
	  decode: identity,
	  buffer: false,
	  type: 'utf8'
	};

	exports.json = {
	  encode: JSON.stringify,
	  decode: JSON.parse,
	  buffer: false,
	  type: 'json'
	};

	exports.binary = {
	  encode: function (data) {
	    return isBinary(data) ? data : Buffer.from(data)
	  },
	  decode: identity,
	  buffer: true,
	  type: 'binary'
	};

	exports.none = {
	  encode: identity,
	  decode: identity,
	  buffer: false,
	  type: 'id'
	};

	exports.id = exports.none;

	const bufferEncodings = [
	  'hex',
	  'ascii',
	  'base64',
	  'ucs2',
	  'ucs-2',
	  'utf16le',
	  'utf-16le'
	];

	for (const type of bufferEncodings) {
	  exports[type] = {
	    encode: function (data) {
	      return isBinary(data) ? data : Buffer.from(data, type)
	    },
	    decode: function (buffer) {
	      return buffer.toString(type)
	    },
	    buffer: true,
	    type: type
	  };
	}

	function identity (value) {
	  return value
	}

	function isBinary (data) {
	  return data === undefined || data === null || Buffer.isBuffer(data)
	}
} (encodings$1));

const encodings = encodings$1;
const rangeOptions = new Set(['lt', 'gt', 'lte', 'gte']);

var levelCodec = Codec;

function Codec (opts) {
  if (!(this instanceof Codec)) {
    return new Codec(opts)
  }
  this.opts = opts || {};
  this.encodings = encodings;
}

Codec.prototype._encoding = function (encoding) {
  if (typeof encoding === 'string') encoding = encodings[encoding];
  if (!encoding) encoding = encodings.id;
  return encoding
};

Codec.prototype._keyEncoding = function (opts, batchOpts) {
  return this._encoding((batchOpts && batchOpts.keyEncoding) ||
                        (opts && opts.keyEncoding) ||
                        this.opts.keyEncoding)
};

Codec.prototype._valueEncoding = function (opts, batchOpts) {
  return this._encoding((batchOpts && (batchOpts.valueEncoding || batchOpts.encoding)) ||
                        (opts && (opts.valueEncoding || opts.encoding)) ||
                        (this.opts.valueEncoding || this.opts.encoding))
};

Codec.prototype.encodeKey = function (key, opts, batchOpts) {
  return this._keyEncoding(opts, batchOpts).encode(key)
};

Codec.prototype.encodeValue = function (value, opts, batchOpts) {
  return this._valueEncoding(opts, batchOpts).encode(value)
};

Codec.prototype.decodeKey = function (key, opts) {
  return this._keyEncoding(opts).decode(key)
};

Codec.prototype.decodeValue = function (value, opts) {
  return this._valueEncoding(opts).decode(value)
};

Codec.prototype.encodeBatch = function (ops, opts) {
  return ops.map((_op) => {
    const op = {
      type: _op.type,
      key: this.encodeKey(_op.key, opts, _op)
    };
    if (this.keyAsBuffer(opts, _op)) op.keyEncoding = 'binary';
    if (_op.prefix) op.prefix = _op.prefix;
    if ('value' in _op) {
      op.value = this.encodeValue(_op.value, opts, _op);
      if (this.valueAsBuffer(opts, _op)) op.valueEncoding = 'binary';
    }
    return op
  })
};

Codec.prototype.encodeLtgt = function (ltgt) {
  const ret = {};

  for (const key of Object.keys(ltgt)) {
    if (key === 'start' || key === 'end') {
      throw new Error('Legacy range options ("start" and "end") have been removed')
    }

    ret[key] = rangeOptions.has(key)
      ? this.encodeKey(ltgt[key], ltgt)
      : ltgt[key];
  }

  return ret
};

Codec.prototype.createStreamDecoder = function (opts) {
  if (opts.keys && opts.values) {
    return (key, value) => {
      return {
        key: this.decodeKey(key, opts),
        value: this.decodeValue(value, opts)
      }
    }
  } else if (opts.keys) {
    return (key) => {
      return this.decodeKey(key, opts)
    }
  } else if (opts.values) {
    return (_, value) => {
      return this.decodeValue(value, opts)
    }
  } else {
    return function () {}
  }
};

Codec.prototype.keyAsBuffer = function (opts) {
  return this._keyEncoding(opts).buffer
};

Codec.prototype.valueAsBuffer = function (opts) {
  return this._valueEncoding(opts).buffer
};

export { levelCodec as default };
