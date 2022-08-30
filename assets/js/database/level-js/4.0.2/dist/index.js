import require$$1 from '../../../abstract-leveldown/dist/index.js';
import require$$0$2 from '../../../inherits/dist/index.js';
import require$$2 from '../../../ltgt/dist/index.js';
import require$$0 from '../../../typedarray-to-buffer/dist/index.js';
import require$$0$1 from '../../../immediate/dist/index.js';
import buffer from '../../../safe-buffer/dist/index.js';
const Buffer = buffer.Buffer;

var toBuffer = require$$0;

var mixedToBuffer$2 = function (value) {
  if (value instanceof Uint8Array) return toBuffer(value)
  else if (value instanceof ArrayBuffer) return Buffer.from(value)
  else return Buffer.from(String(value))
};

var immediate = {exports: {}};

(function (module) {
	module.exports = require$$0$1;
} (immediate));

/* global IDBKeyRange */

var inherits$1 = require$$0$2;
var AbstractIterator = require$$1.AbstractIterator;
var ltgt = require$$2;
var mixedToBuffer$1 = mixedToBuffer$2;
var setImmediate$1 = immediate.exports;
var noop = function () {};

var iterator = Iterator$1;

function Iterator$1 (db, location, options) {
  AbstractIterator.call(this, db);

  this._limit = options.limit;
  this._count = 0;
  this._callback = null;
  this._cache = [];
  this._completed = false;
  this._aborted = false;
  this._error = null;
  this._transaction = null;

  this._keyAsBuffer = options.keyAsBuffer;
  this._valueAsBuffer = options.valueAsBuffer;

  if (this._limit === 0) {
    this._completed = true;
    return
  }

  try {
    var keyRange = this.createKeyRange(options);
  } catch (e) {
    // The lower key is greater than the upper key.
    // IndexedDB throws an error, but we'll just return 0 results.
    this._completed = true;
    return
  }

  this.createIterator(location, keyRange, options.reverse);
}

inherits$1(Iterator$1, AbstractIterator);

Iterator$1.prototype.createKeyRange = function (options) {
  var lower = ltgt.lowerBound(options);
  var upper = ltgt.upperBound(options);
  var lowerOpen = ltgt.lowerBoundExclusive(options);
  var upperOpen = ltgt.upperBoundExclusive(options);

  if (lower !== undefined && upper !== undefined) {
    return IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen)
  } else if (lower !== undefined) {
    return IDBKeyRange.lowerBound(lower, lowerOpen)
  } else if (upper !== undefined) {
    return IDBKeyRange.upperBound(upper, upperOpen)
  } else {
    return null
  }
};

Iterator$1.prototype.createIterator = function (location, keyRange, reverse) {
  var self = this;
  var transaction = this.db.db.transaction([location], 'readonly');
  var store = transaction.objectStore(location);
  var req = store.openCursor(keyRange, reverse ? 'prev' : 'next');

  req.onsuccess = function (ev) {
    var cursor = ev.target.result;
    if (cursor) self.onItem(cursor);
  };

  this._transaction = transaction;

  // If an error occurs (on the request), the transaction will abort.
  transaction.onabort = function () {
    self.onAbort(self._transaction.error || new Error('aborted by user'));
  };

  transaction.oncomplete = function () {
    self.onComplete();
  };
};

Iterator$1.prototype.onItem = function (cursor) {
  this._cache.push(cursor.key, cursor.value);

  if (this._limit <= 0 || ++this._count < this._limit) {
    cursor['continue']();
  }

  this.maybeNext();
};

Iterator$1.prototype.onAbort = function (err) {
  this._aborted = true;
  this._error = err;
  this.maybeNext();
};

Iterator$1.prototype.onComplete = function () {
  this._completed = true;
  this.maybeNext();
};

Iterator$1.prototype.maybeNext = function () {
  if (this._callback) {
    this._next(this._callback);
    this._callback = null;
  }
};

Iterator$1.prototype._next = function (callback) {
  if (this._aborted) {
    // The error should be picked up by either next() or end().
    var err = this._error;
    this._error = null;

    setImmediate$1(function () {
      callback(err);
    });
  } else if (this._cache.length > 0) {
    var key = this._cache.shift();
    var value = this._cache.shift();

    if (this._keyAsBuffer) key = mixedToBuffer$1(key);
    if (this._valueAsBuffer) value = mixedToBuffer$1(value);

    setImmediate$1(function () {
      callback(null, key, value);
    });
  } else if (this._completed) {
    setImmediate$1(callback);
  } else {
    this._callback = callback;
  }
};

Iterator$1.prototype._end = function (callback) {
  if (this._aborted || this._completed) {
    var err = this._error;

    setImmediate$1(function () {
      callback(err);
    });

    return
  }

  // Don't advance the cursor anymore, and the transaction will complete
  // on its own in the next tick. This approach is much cleaner than calling
  // transaction.abort() with its unpredictable event order.
  this.onItem = noop;
  this.onAbort = callback;
  this.onComplete = callback;
};

var support$1 = {};

(function (exports) {

	exports.test = function (key) {
	  return function test (impl) {
	    try {
	      impl.cmp(key, 0);
	      return true
	    } catch (err) {
	      return false
	    }
	  }
	};

	exports.binaryKeys = exports.test(new Uint8Array(0));
	exports.arrayKeys = exports.test([1]);
} (support$1));

/* global indexedDB */

var _4_0_2 = Level;

var AbstractLevelDOWN = require$$1.AbstractLevelDOWN;
var inherits = require$$0$2;
var Iterator = iterator;
var mixedToBuffer = mixedToBuffer$2;
var setImmediate = immediate.exports;
var support = support$1;

var DEFAULT_PREFIX = 'level-js-';

function Level (location, opts) {
  if (!(this instanceof Level)) return new Level(location, opts)
  AbstractLevelDOWN.call(this);
  opts = opts || {};

  if (typeof location !== 'string') {
    throw new Error('constructor requires a location string argument')
  }

  this.location = location;
  this.prefix = opts.prefix == null ? DEFAULT_PREFIX : opts.prefix;
  this.version = parseInt(opts.version || 1, 10);
}

inherits(Level, AbstractLevelDOWN);

// Detect binary and array key support (IndexedDB Second Edition)
Level.binaryKeys = support.binaryKeys(indexedDB);
Level.arrayKeys = support.arrayKeys(indexedDB);

Level.prototype._open = function (options, callback) {
  var req = indexedDB.open(this.prefix + this.location, this.version);
  var self = this;

  req.onerror = function () {
    callback(req.error || new Error('unknown error'));
  };

  req.onsuccess = function () {
    self.db = req.result;
    callback();
  };

  req.onupgradeneeded = function (ev) {
    var db = ev.target.result;

    if (!db.objectStoreNames.contains(self.location)) {
      db.createObjectStore(self.location);
    }
  };
};

Level.prototype.store = function (mode) {
  var transaction = this.db.transaction([this.location], mode);
  return transaction.objectStore(this.location)
};

Level.prototype.await = function (request, callback) {
  var transaction = request.transaction;

  // Take advantage of the fact that a non-canceled request error aborts
  // the transaction. I.e. no need to listen for "request.onerror".
  transaction.onabort = function () {
    callback(transaction.error || new Error('aborted by user'));
  };

  transaction.oncomplete = function () {
    callback(null, request.result);
  };
};

Level.prototype._get = function (key, options, callback) {
  var store = this.store('readonly');

  try {
    var req = store.get(key);
  } catch (err) {
    return setImmediate(function () {
      callback(err);
    })
  }

  this.await(req, function (err, value) {
    if (err) return callback(err)

    if (value === undefined) {
      // 'NotFound' error, consistent with LevelDOWN API
      return callback(new Error('NotFound'))
    }

    if (options.asBuffer) {
      value = mixedToBuffer(value);
    }

    callback(null, value);
  });
};

Level.prototype._del = function (key, options, callback) {
  var store = this.store('readwrite');

  try {
    var req = store.delete(key);
  } catch (err) {
    return setImmediate(function () {
      callback(err);
    })
  }

  this.await(req, callback);
};

Level.prototype._put = function (key, value, options, callback) {
  var store = this.store('readwrite');

  try {
    // Will throw a DataError or DataCloneError if the environment
    // does not support serializing the key or value respectively.
    var req = store.put(value, key);
  } catch (err) {
    return setImmediate(function () {
      callback(err);
    })
  }

  this.await(req, callback);
};

// Valid key types in IndexedDB Second Edition:
//
// - Number, except NaN. Includes Infinity and -Infinity
// - Date, except invalid (NaN)
// - String
// - ArrayBuffer or a view thereof (typed arrays). In level-js we also support
//   Buffer (which is an Uint8Array) (and the primary binary type of Level).
// - Array, except cyclical and empty (e.g. Array(10)). Elements must be valid
//   types themselves.
Level.prototype._serializeKey = function (key) {
  if (Buffer.isBuffer(key)) {
    return Level.binaryKeys ? key : key.toString()
  } else if (Array.isArray(key)) {
    return Level.arrayKeys ? key.map(this._serializeKey, this) : String(key)
  } else {
    return key
  }
};

Level.prototype._serializeValue = function (value) {
  return value
};

Level.prototype._iterator = function (options) {
  return new Iterator(this, this.location, options)
};

Level.prototype._batch = function (operations, options, callback) {
  if (operations.length === 0) return setImmediate(callback)

  var store = this.store('readwrite');
  var transaction = store.transaction;
  var index = 0;
  var error;

  transaction.onabort = function () {
    callback(error || transaction.error || new Error('aborted by user'));
  };

  transaction.oncomplete = function () {
    callback();
  };

  // Wait for a request to complete before making the next, saving CPU.
  function loop () {
    var op = operations[index++];
    var key = op.key;

    try {
      var req = op.type === 'del' ? store.delete(key) : store.put(op.value, key);
    } catch (err) {
      error = err;
      transaction.abort();
      return
    }

    if (index < operations.length) {
      req.onsuccess = loop;
    }
  }

  loop();
};

Level.prototype._close = function (callback) {
  this.db.close();
  setImmediate(callback);
};

Level.destroy = function (location, prefix, callback) {
  if (typeof prefix === 'function') {
    callback = prefix;
    prefix = DEFAULT_PREFIX;
  }
  var request = indexedDB.deleteDatabase(prefix + location);
  request.onsuccess = function () {
    callback();
  };
  request.onerror = function (err) {
    callback(err);
  };
};

export { _4_0_2 as default };
