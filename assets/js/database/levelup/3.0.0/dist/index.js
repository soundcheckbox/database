import require$$0$1 from '../../../events/dist/index.js';
import require$$1 from '../../../util/dist/index.js';
import require$$2 from '../../../xtend/dist/index.js';
import require$$3 from '../../../deferred-leveldown/dist/index.js';
import require$$4 from '../../../level-iterator-stream/dist/index.js';
import require$$0 from '../../../level-errors/dist/index.js';
import require$$7 from '../../../level-supports/dist/index.js';
import require$$8 from '../../../assert/dist/index.js';

function promisify$2 () {
  var callback;
  var promise = new Promise(function (resolve, reject) {
    callback = function callback (err, value) {
      if (err) reject(err);
      else resolve(value);
    };
  });
  callback.promise = promise;
  return callback
}

var promisify_1 = promisify$2;

var common = {};

common.getCallback = function (options, callback) {
  return typeof options === 'function' ? options : callback
};

common.getOptions = function (options) {
  return typeof options === 'object' && options !== null ? options : {}
};

var WriteError$1 = require$$0.WriteError;
var promisify$1 = promisify_1;
var getCallback$1 = common.getCallback;
var getOptions$1 = common.getOptions;

function Batch$1 (levelup) {
  // TODO (next major): remove this._levelup alias
  this.db = this._levelup = levelup;
  this.batch = levelup.db.batch();
  this.ops = [];
  this.length = 0;
}

Batch$1.prototype.put = function (key, value) {
  try {
    this.batch.put(key, value);
  } catch (e) {
    throw new WriteError$1(e)
  }

  this.ops.push({ type: 'put', key: key, value: value });
  this.length++;

  return this
};

Batch$1.prototype.del = function (key) {
  try {
    this.batch.del(key);
  } catch (err) {
    throw new WriteError$1(err)
  }

  this.ops.push({ type: 'del', key: key });
  this.length++;

  return this
};

Batch$1.prototype.clear = function () {
  try {
    this.batch.clear();
  } catch (err) {
    throw new WriteError$1(err)
  }

  this.ops = [];
  this.length = 0;

  return this
};

Batch$1.prototype.write = function (options, callback) {
  var levelup = this._levelup;
  var ops = this.ops;
  var promise;

  callback = getCallback$1(options, callback);

  if (!callback) {
    callback = promisify$1();
    promise = callback.promise;
  }

  options = getOptions$1(options);

  try {
    this.batch.write(options, function (err) {
      if (err) { return callback(new WriteError$1(err)) }
      levelup.emit('batch', ops);
      callback();
    });
  } catch (err) {
    throw new WriteError$1(err)
  }

  return promise
};

var batch = Batch$1;

var EventEmitter = require$$0$1.EventEmitter;
var inherits = require$$1.inherits;
var extend = require$$2;
var DeferredLevelDOWN = require$$3;
var IteratorStream = require$$4;
var Batch = batch;
var errors = require$$0;
var supports = require$$7;
var assert = require$$8;
var promisify = promisify_1;
var getCallback = common.getCallback;
var getOptions = common.getOptions;

var WriteError = errors.WriteError;
var ReadError = errors.ReadError;
var NotFoundError = errors.NotFoundError;
var OpenError = errors.OpenError;
var InitializationError = errors.InitializationError;

// Possible AbstractLevelDOWN#status values:
//  - 'new'     - newly created, not opened or closed
//  - 'opening' - waiting for the database to be opened, post open()
//  - 'open'    - successfully opened the database, available for use
//  - 'closing' - waiting for the database to be closed, post close()
//  - 'closed'  - database has been successfully closed, should not be
//                 used except for another open() operation

function LevelUP (db, options, callback) {
  if (!(this instanceof LevelUP)) {
    return new LevelUP(db, options, callback)
  }

  var error;
  var self = this;

  EventEmitter.call(this);
  this.setMaxListeners(Infinity);

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};

  if (!db || typeof db !== 'object') {
    error = new InitializationError('First argument must be an abstract-leveldown compliant store');
    if (typeof callback === 'function') {
      return process.nextTick(callback, error)
    }
    throw error
  }

  assert.strictEqual(typeof db.status, 'string', '.status required, old abstract-leveldown');

  this.options = getOptions(options);
  this._db = db;
  this.db = new DeferredLevelDOWN(db);
  this.open(callback || function (err) {
    if (err) self.emit('error', err);
  });

  // Create manifest based on deferred-leveldown's
  this.supports = supports(this.db.supports, {
    status: false,
    deferredOpen: true,
    openCallback: true,
    promises: true,
    streams: true
  });

  // Experimental: enrich levelup interface
  Object.keys(this.supports.additionalMethods).forEach(function (method) {
    if (this[method] != null) return

    // Don't do this.db[method].bind() because this.db is dynamic.
    this[method] = function () {
      return this.db[method].apply(this.db, arguments)
    };
  }, this);
}

LevelUP.prototype.emit = EventEmitter.prototype.emit;
LevelUP.prototype.once = EventEmitter.prototype.once;
inherits(LevelUP, EventEmitter);

LevelUP.prototype.open = function (opts, callback) {
  var self = this;
  var promise;

  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (!opts) {
    opts = this.options;
  }

  if (this.isOpen()) {
    process.nextTick(callback, null, self);
    return promise
  }

  if (this._isOpening()) {
    this.once('open', function () { callback(null, self); });
    return promise
  }

  this.emit('opening');

  this.db.open(opts, function (err) {
    if (err) {
      return callback(new OpenError(err))
    }
    self.db = self._db;
    callback(null, self);
    self.emit('open');
    self.emit('ready');
  });

  return promise
};

LevelUP.prototype.close = function (callback) {
  var self = this;
  var promise;

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (this.isOpen()) {
    this.db.close(function () {
      self.emit('closed');
      callback.apply(null, arguments);
    });
    this.emit('closing');
    this.db = new DeferredLevelDOWN(this._db);
  } else if (this.isClosed()) {
    process.nextTick(callback);
  } else if (this.db.status === 'closing') {
    this.once('closed', callback);
  } else if (this._isOpening()) {
    this.once('open', function () {
      self.close(callback);
    });
  }

  return promise
};

LevelUP.prototype.isOpen = function () {
  return this.db.status === 'open'
};

LevelUP.prototype._isOpening = function () {
  return this.db.status === 'opening'
};

LevelUP.prototype.isClosed = function () {
  return (/^clos|new/).test(this.db.status)
};

LevelUP.prototype.get = function (key, options, callback) {
  var promise;

  callback = getCallback(options, callback);

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (maybeError(this, callback)) { return promise }

  options = getOptions(options);

  this.db.get(key, options, function (err, value) {
    if (err) {
      if ((/notfound/i).test(err) || err.notFound) {
        err = new NotFoundError('Key not found in database [' + key + ']', err);
      } else {
        err = new ReadError(err);
      }
      return callback(err)
    }
    callback(null, value);
  });

  return promise
};

LevelUP.prototype.put = function (key, value, options, callback) {
  var self = this;
  var promise;

  callback = getCallback(options, callback);

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (maybeError(this, callback)) { return promise }

  options = getOptions(options);

  this.db.put(key, value, options, function (err) {
    if (err) {
      return callback(new WriteError(err))
    }
    self.emit('put', key, value);
    callback();
  });

  return promise
};

LevelUP.prototype.del = function (key, options, callback) {
  var self = this;
  var promise;

  callback = getCallback(options, callback);

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (maybeError(this, callback)) { return promise }

  options = getOptions(options);

  this.db.del(key, options, function (err) {
    if (err) {
      return callback(new WriteError(err))
    }
    self.emit('del', key);
    callback();
  });

  return promise
};

LevelUP.prototype.batch = function (arr, options, callback) {
  if (!arguments.length) {
    return new Batch(this)
  }

  var self = this;
  var promise;

  if (typeof arr === 'function') callback = arr;
  else callback = getCallback(options, callback);

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (maybeError(this, callback)) { return promise }

  options = getOptions(options);

  this.db.batch(arr, options, function (err) {
    if (err) {
      return callback(new WriteError(err))
    }
    self.emit('batch', arr);
    callback();
  });

  return promise
};

LevelUP.prototype.iterator = function (options) {
  return this.db.iterator(options)
};

LevelUP.prototype.clear = function (options, callback) {
  var self = this;
  var promise;

  callback = getCallback(options, callback);
  options = getOptions(options);

  if (!callback) {
    callback = promisify();
    promise = callback.promise;
  }

  if (maybeError(this, callback)) {
    return promise
  }

  this.db.clear(options, function (err) {
    if (err) {
      return callback(new WriteError(err))
    }
    self.emit('clear', options);
    callback();
  });

  return promise
};

LevelUP.prototype.readStream =
LevelUP.prototype.createReadStream = function (options) {
  options = extend({ keys: true, values: true }, options);
  if (typeof options.limit !== 'number') { options.limit = -1; }
  return new IteratorStream(this.db.iterator(options), options)
};

LevelUP.prototype.keyStream =
LevelUP.prototype.createKeyStream = function (options) {
  return this.createReadStream(extend(options, { keys: true, values: false }))
};

LevelUP.prototype.valueStream =
LevelUP.prototype.createValueStream = function (options) {
  return this.createReadStream(extend(options, { keys: false, values: true }))
};

LevelUP.prototype.toString = function () {
  return 'LevelUP'
};

LevelUP.prototype.type = 'levelup';

function maybeError (db, callback) {
  if (!db._isOpening() && !db.isOpen()) {
    process.nextTick(callback, new ReadError('Database is not open'));
    return true
  }
}

LevelUP.errors = errors;
var levelup = LevelUP.default = LevelUP;

export { levelup as default };
