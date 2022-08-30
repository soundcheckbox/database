import require$$0$1 from '../../level-supports/dist/index.js';
import require$$1 from '../../is-buffer/dist/index.js';
import require$$0 from '../../queue-microtask/dist/index.js';

var abstractLeveldown$1 = {};

const queueMicrotask = require$$0;

var nextTickBrowser = function (fn, ...args) {
  if (args.length === 0) {
    queueMicrotask(fn);
  } else {
    queueMicrotask(() => fn(...args));
  }
};

function AbstractIterator$2 (db) {
  if (typeof db !== 'object' || db === null) {
    throw new TypeError('First argument must be an abstract-leveldown compliant store')
  }

  this.db = db;
  this._ended = false;
  this._nexting = false;
}

AbstractIterator$2.prototype.next = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('next() requires a callback argument')
  }

  if (this._ended) {
    this._nextTick(callback, new Error('cannot call next() after end()'));
    return this
  }

  if (this._nexting) {
    this._nextTick(callback, new Error('cannot call next() before previous next() has completed'));
    return this
  }

  this._nexting = true;
  this._next((err, ...rest) => {
    this._nexting = false;
    callback(err, ...rest);
  });

  return this
};

AbstractIterator$2.prototype._next = function (callback) {
  this._nextTick(callback);
};

AbstractIterator$2.prototype.seek = function (target) {
  if (this._ended) {
    throw new Error('cannot call seek() after end()')
  }
  if (this._nexting) {
    throw new Error('cannot call seek() before next() has completed')
  }

  target = this.db._serializeKey(target);
  this._seek(target);
};

AbstractIterator$2.prototype._seek = function (target) {};

AbstractIterator$2.prototype.end = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('end() requires a callback argument')
  }

  if (this._ended) {
    return this._nextTick(callback, new Error('end() already called on iterator'))
  }

  this._ended = true;
  this._end(callback);
};

AbstractIterator$2.prototype._end = function (callback) {
  this._nextTick(callback);
};

// Expose browser-compatible nextTick for dependents
AbstractIterator$2.prototype._nextTick = nextTickBrowser;

var abstractIterator = AbstractIterator$2;

const emptyOptions = Object.freeze({});

function AbstractChainedBatch$2 (db) {
  if (typeof db !== 'object' || db === null) {
    throw new TypeError('First argument must be an abstract-leveldown compliant store')
  }

  this.db = db;
  this._operations = [];
  this._written = false;
}

AbstractChainedBatch$2.prototype._checkWritten = function () {
  if (this._written) {
    throw new Error('write() already called on this batch')
  }
};

AbstractChainedBatch$2.prototype.put = function (key, value, options) {
  this._checkWritten();

  const err = this.db._checkKey(key) || this.db._checkValue(value);
  if (err) throw err

  key = this.db._serializeKey(key);
  value = this.db._serializeValue(value);

  this._put(key, value, options != null ? options : emptyOptions);

  return this
};

AbstractChainedBatch$2.prototype._put = function (key, value, options) {
  this._operations.push({ ...options, type: 'put', key, value });
};

AbstractChainedBatch$2.prototype.del = function (key, options) {
  this._checkWritten();

  const err = this.db._checkKey(key);
  if (err) throw err

  key = this.db._serializeKey(key);
  this._del(key, options != null ? options : emptyOptions);

  return this
};

AbstractChainedBatch$2.prototype._del = function (key, options) {
  this._operations.push({ ...options, type: 'del', key });
};

AbstractChainedBatch$2.prototype.clear = function () {
  this._checkWritten();
  this._clear();

  return this
};

AbstractChainedBatch$2.prototype._clear = function () {
  this._operations = [];
};

AbstractChainedBatch$2.prototype.write = function (options, callback) {
  this._checkWritten();

  if (typeof options === 'function') {
    callback = options;
  }
  if (typeof callback !== 'function') {
    throw new Error('write() requires a callback argument')
  }
  if (typeof options !== 'object' || options === null) {
    options = {};
  }

  this._written = true;
  this._write(options, callback);
};

AbstractChainedBatch$2.prototype._write = function (options, callback) {
  this.db._batch(this._operations, options, callback);
};

// Expose browser-compatible nextTick for dependents
AbstractChainedBatch$2.prototype._nextTick = nextTickBrowser;

var abstractChainedBatch = AbstractChainedBatch$2;

const supports = require$$0$1;
const isBuffer = require$$1;
const AbstractIterator$1 = abstractIterator;
const AbstractChainedBatch$1 = abstractChainedBatch;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const rangeOptions = ['lt', 'lte', 'gt', 'gte'];

function AbstractLevelDOWN$1 (manifest) {
  this.status = 'new';

  // TODO (next major): make this mandatory
  this.supports = supports(manifest, {
    status: true
  });
}

AbstractLevelDOWN$1.prototype.open = function (options, callback) {
  const oldStatus = this.status;

  if (typeof options === 'function') callback = options;

  if (typeof callback !== 'function') {
    throw new Error('open() requires a callback argument')
  }

  if (typeof options !== 'object' || options === null) options = {};

  options.createIfMissing = options.createIfMissing !== false;
  options.errorIfExists = !!options.errorIfExists;

  this.status = 'opening';
  this._open(options, (err) => {
    if (err) {
      this.status = oldStatus;
      return callback(err)
    }
    this.status = 'open';
    callback();
  });
};

AbstractLevelDOWN$1.prototype._open = function (options, callback) {
  this._nextTick(callback);
};

AbstractLevelDOWN$1.prototype.close = function (callback) {
  const oldStatus = this.status;

  if (typeof callback !== 'function') {
    throw new Error('close() requires a callback argument')
  }

  this.status = 'closing';
  this._close((err) => {
    if (err) {
      this.status = oldStatus;
      return callback(err)
    }
    this.status = 'closed';
    callback();
  });
};

AbstractLevelDOWN$1.prototype._close = function (callback) {
  this._nextTick(callback);
};

AbstractLevelDOWN$1.prototype.get = function (key, options, callback) {
  if (typeof options === 'function') callback = options;

  if (typeof callback !== 'function') {
    throw new Error('get() requires a callback argument')
  }

  const err = this._checkKey(key);
  if (err) return this._nextTick(callback, err)

  key = this._serializeKey(key);

  if (typeof options !== 'object' || options === null) options = {};

  options.asBuffer = options.asBuffer !== false;

  this._get(key, options, callback);
};

AbstractLevelDOWN$1.prototype._get = function (key, options, callback) {
  this._nextTick(function () { callback(new Error('NotFound')); });
};

AbstractLevelDOWN$1.prototype.put = function (key, value, options, callback) {
  if (typeof options === 'function') callback = options;

  if (typeof callback !== 'function') {
    throw new Error('put() requires a callback argument')
  }

  const err = this._checkKey(key) || this._checkValue(value);
  if (err) return this._nextTick(callback, err)

  key = this._serializeKey(key);
  value = this._serializeValue(value);

  if (typeof options !== 'object' || options === null) options = {};
  console.log('AbstractLevelDOWN', {
    key: key,
    value: value,
    options: options
  })
  this._put(key, value, options, callback);
};

AbstractLevelDOWN$1.prototype._put = function (key, value, options, callback) {
  this._nextTick(callback);
};

AbstractLevelDOWN$1.prototype.del = function (key, options, callback) {
  if (typeof options === 'function') callback = options;

  if (typeof callback !== 'function') {
    throw new Error('del() requires a callback argument')
  }

  const err = this._checkKey(key);
  if (err) return this._nextTick(callback, err)

  key = this._serializeKey(key);

  if (typeof options !== 'object' || options === null) options = {};

  this._del(key, options, callback);
};

AbstractLevelDOWN$1.prototype._del = function (key, options, callback) {
  this._nextTick(callback);
};

AbstractLevelDOWN$1.prototype.batch = function (array, options, callback) {
  if (!arguments.length) return this._chainedBatch()

  if (typeof options === 'function') callback = options;

  if (typeof array === 'function') callback = array;

  if (typeof callback !== 'function') {
    throw new Error('batch(array) requires a callback argument')
  }

  if (!Array.isArray(array)) {
    return this._nextTick(callback, new Error('batch(array) requires an array argument'))
  }

  if (array.length === 0) {
    return this._nextTick(callback)
  }

  if (typeof options !== 'object' || options === null) options = {};

  const serialized = new Array(array.length);

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== 'object' || array[i] === null) {
      return this._nextTick(callback, new Error('batch(array) element must be an object and not `null`'))
    }

    const e = Object.assign({}, array[i]);

    if (e.type !== 'put' && e.type !== 'del') {
      return this._nextTick(callback, new Error("`type` must be 'put' or 'del'"))
    }

    const err = this._checkKey(e.key);
    if (err) return this._nextTick(callback, err)

    e.key = this._serializeKey(e.key);

    if (e.type === 'put') {
      const valueErr = this._checkValue(e.value);
      if (valueErr) return this._nextTick(callback, valueErr)

      e.value = this._serializeValue(e.value);
    }

    serialized[i] = e;
  }

  this._batch(serialized, options, callback);
};

AbstractLevelDOWN$1.prototype._batch = function (array, options, callback) {
  this._nextTick(callback);
};

AbstractLevelDOWN$1.prototype.clear = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
  } else if (typeof callback !== 'function') {
    throw new Error('clear() requires a callback argument')
  }

  options = cleanRangeOptions(this, options);
  options.reverse = !!options.reverse;
  options.limit = 'limit' in options ? options.limit : -1;

  this._clear(options, callback);
};

AbstractLevelDOWN$1.prototype._clear = function (options, callback) {
  // Avoid setupIteratorOptions, would serialize range options a second time.
  options.keys = true;
  options.values = false;
  options.keyAsBuffer = true;
  options.valueAsBuffer = true;

  const iterator = this._iterator(options);
  const emptyOptions = {};

  const next = (err) => {
    if (err) {
      return iterator.end(function () {
        callback(err);
      })
    }

    iterator.next((err, key) => {
      if (err) return next(err)
      if (key === undefined) return iterator.end(callback)

      // This could be optimized by using a batch, but the default _clear
      // is not meant to be fast. Implementations have more room to optimize
      // if they override _clear. Note: using _del bypasses key serialization.
      this._del(key, emptyOptions, next);
    });
  };

  next();
};

AbstractLevelDOWN$1.prototype._setupIteratorOptions = function (options) {
  options = cleanRangeOptions(this, options);

  options.reverse = !!options.reverse;
  options.keys = options.keys !== false;
  options.values = options.values !== false;
  options.limit = 'limit' in options ? options.limit : -1;
  options.keyAsBuffer = options.keyAsBuffer !== false;
  options.valueAsBuffer = options.valueAsBuffer !== false;

  return options
};

function cleanRangeOptions (db, options) {
  const result = {};

  for (const k in options) {
    if (!hasOwnProperty.call(options, k)) continue

    if (k === 'start' || k === 'end') {
      throw new Error('Legacy range options ("start" and "end") have been removed')
    }

    let opt = options[k];

    if (isRangeOption(k)) {
      // Note that we don't reject nullish and empty options here. While
      // those types are invalid as keys, they are valid as range options.
      opt = db._serializeKey(opt);
    }

    result[k] = opt;
  }

  return result
}

function isRangeOption (k) {
  return rangeOptions.indexOf(k) !== -1
}

AbstractLevelDOWN$1.prototype.iterator = function (options) {
  if (typeof options !== 'object' || options === null) options = {};
  options = this._setupIteratorOptions(options);
  return this._iterator(options)
};

AbstractLevelDOWN$1.prototype._iterator = function (options) {
  return new AbstractIterator$1(this)
};

AbstractLevelDOWN$1.prototype._chainedBatch = function () {
  return new AbstractChainedBatch$1(this)
};

AbstractLevelDOWN$1.prototype._serializeKey = function (key) {
  return key
};

AbstractLevelDOWN$1.prototype._serializeValue = function (value) {
  return value
};

AbstractLevelDOWN$1.prototype._checkKey = function (key) {
  if (key === null || key === undefined) {
    return new Error('key cannot be `null` or `undefined`')
  } else if (isBuffer(key) && key.length === 0) { // TODO: replace with typed array check
    return new Error('key cannot be an empty Buffer')
  } else if (key === '') {
    return new Error('key cannot be an empty String')
  } else if (Array.isArray(key) && key.length === 0) {
    return new Error('key cannot be an empty Array')
  }
};

AbstractLevelDOWN$1.prototype._checkValue = function (value) {
  if (value === null || value === undefined) {
    return new Error('value cannot be `null` or `undefined`')
  }
};

// Expose browser-compatible nextTick for dependents
// TODO: rename _nextTick to _queueMicrotask
// TODO: after we drop node 10, also use queueMicrotask in node
AbstractLevelDOWN$1.prototype._nextTick = nextTickBrowser;

var abstractLeveldown = AbstractLevelDOWN$1;

var AbstractLevelDOWN = abstractLeveldown$1.AbstractLevelDOWN = abstractLeveldown;
var AbstractIterator = abstractLeveldown$1.AbstractIterator = abstractIterator;
var AbstractChainedBatch = abstractLeveldown$1.AbstractChainedBatch = abstractChainedBatch;

export { AbstractChainedBatch, AbstractIterator, AbstractLevelDOWN, abstractLeveldown$1 as default };
