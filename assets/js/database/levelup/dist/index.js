import require$$0$2 from '../../events/dist/index.js';
import require$$1$1 from '../../util/dist/index.js';
import require$$2 from '../../deferred-leveldown/dist/index.js';
import require$$3 from '../../level-iterator-stream/dist/index.js';
import require$$0 from '../../level-errors/dist/index.js';
import require$$1 from '../../catering/dist/index.js';
import require$$6 from '../../level-supports/dist/index.js';
import require$$7 from '../../assert/dist/index.js';
import require$$0$1 from '../../queue-microtask/dist/index.js';

var common = {};

common.getCallback = function (options, callback) {
  return typeof options === 'function' ? options : callback
};

common.getOptions = function (options) {
  return typeof options === 'object' && options !== null ? options : {}
};

const WriteError$1 = require$$0.WriteError;
const catering$1 = require$$1;
const getCallback$1 = common.getCallback;
const getOptions$1 = common.getOptions;

function Batch$1 (levelup) {
  this.db = levelup;
  this.batch = levelup.db.batch();
  this.ops = [];
  this.length = 0;
}

Batch$1.prototype.put = function (key, value, options) {
  try {
    this.batch.put(key, value, options);
  } catch (e) {
    throw new WriteError$1(e)
  }

  this.ops.push({ ...options, type: 'put', key, value });
  this.length++;

  return this
};

Batch$1.prototype.del = function (key, options) {
  try {
    this.batch.del(key, options);
  } catch (err) {
    throw new WriteError$1(err)
  }

  this.ops.push({ ...options, type: 'del', key });
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
  const levelup = this.db;
  const ops = this.ops;

  callback = getCallback$1(options, callback);
  callback = catering$1.fromCallback(callback);
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

  return callback.promise
};

var batch = Batch$1;

const queueMicrotask = require$$0$1;

var nextTickBrowser = function (fn, ...args) {
  if (args.length === 0) {
    queueMicrotask(fn);
  } else {
    queueMicrotask(() => fn(...args));
  }
};

const EventEmitter = require$$0$2.EventEmitter;
const inherits = require$$1$1.inherits;
const DeferredLevelDOWN = require$$2;
const IteratorStream = require$$3;
const Batch = batch;
const errors = require$$0;
const supports = require$$6;
const assert = require$$7;
const catering = require$$1;
const getCallback = common.getCallback;
const getOptions = common.getOptions;

// TODO: after we drop node 10, also use queueMicrotask() in node
const nextTick = nextTickBrowser;

const WriteError = errors.WriteError;
const ReadError = errors.ReadError;
const NotFoundError = errors.NotFoundError;
const OpenError = errors.OpenError;
const InitializationError = errors.InitializationError;

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

  let error;

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
      return nextTick(callback, error)
    }
    throw error
  }

  assert.strictEqual(typeof db.status, 'string', '.status required, old abstract-leveldown');

  this.options = getOptions(options);
  this._db = db;
  this.db = new DeferredLevelDOWN(db);
  this.open(callback || ((err) => {
    if (err) this.emit('error', err);
  }));

  // Create manifest based on deferred-leveldown's
  this.supports = supports(this.db.supports, {
    status: false,
    deferredOpen: true,
    openCallback: true,
    promises: true,
    streams: true
  });

  // Experimental: enrich levelup interface
  for (const method of Object.keys(this.supports.additionalMethods)) {
    if (this[method] != null) continue

    // Don't do this.db[method].bind() because this.db is dynamic.
    this[method] = function (...args) {
      return this.db[method](...args)
    };
  }
}

LevelUP.prototype.emit = EventEmitter.prototype.emit;
LevelUP.prototype.once = EventEmitter.prototype.once;
inherits(LevelUP, EventEmitter);

LevelUP.prototype.open = function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  callback = catering.fromCallback(callback);

  if (!opts) {
    opts = this.options;
  }

  if (this.isOpen()) {
    nextTick(callback, null, this);
    return callback.promise
  }

  if (this._isOpening()) {
    this.once('open', () => { callback(null, this); });
    return callback.promise
  }

  this.emit('opening');

  this.db.open(opts, (err) => {
    if (err) {
      return callback(new OpenError(err))
    }
    this.db = this._db;
    callback(null, this);
    this.emit('open');
    this.emit('ready');
  });

  return callback.promise
};

LevelUP.prototype.close = function (callback) {
  callback = catering.fromCallback(callback);

  if (this.isOpen()) {
    this.db.close((err, ...rest) => {
      this.emit('closed');
      callback(err, ...rest);
    });
    this.emit('closing');
    this.db = new DeferredLevelDOWN(this._db);
  } else if (this.isClosed()) {
    nextTick(callback);
  } else if (this.db.status === 'closing') {
    this.once('closed', callback);
  } else if (this._isOpening()) {
    this.once('open', () => {
      this.close(callback);
    });
  }

  return callback.promise
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
  callback = getCallback(options, callback);
  callback = catering.fromCallback(callback);

  if (maybeError(this, callback)) {
    return callback.promise
  }

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

  return callback.promise
};

LevelUP.prototype.put = function (key, value, options, callback) {
  callback = getCallback(options, callback);
  callback = catering.fromCallback(callback);

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options);

  this.db.put(key, value, options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('put', key, value);
    callback();
  });

  return callback.promise
};

LevelUP.prototype.del = function (key, options, callback) {
  callback = getCallback(options, callback);
  callback = catering.fromCallback(callback);

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options);

  this.db.del(key, options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('del', key);
    callback();
  });

  return callback.promise
};

LevelUP.prototype.batch = function (arr, options, callback) {
  if (!arguments.length) {
    return new Batch(this)
  }

  if (typeof arr === 'function') callback = arr;
  else callback = getCallback(options, callback);

  callback = catering.fromCallback(callback);

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options);

  this.db.batch(arr, options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('batch', arr);
    callback();
  });

  return callback.promise
};

LevelUP.prototype.iterator = function (options) {
  return this.db.iterator(options)
};

LevelUP.prototype.clear = function (options, callback) {
  callback = getCallback(options, callback);
  options = getOptions(options);
  callback = catering.fromCallback(callback);

  if (maybeError(this, callback)) {
    return callback.promise
  }

  this.db.clear(options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('clear', options);
    callback();
  });

  return callback.promise
};

LevelUP.prototype.readStream =
LevelUP.prototype.createReadStream = function (options) {
  options = Object.assign({ keys: true, values: true }, options);
  if (typeof options.limit !== 'number') { options.limit = -1; }
  return new IteratorStream(this.db.iterator(options), options)
};

LevelUP.prototype.keyStream =
LevelUP.prototype.createKeyStream = function (options) {
  return this.createReadStream(Object.assign({}, options, { keys: true, values: false }))
};

LevelUP.prototype.valueStream =
LevelUP.prototype.createValueStream = function (options) {
  return this.createReadStream(Object.assign({}, options, { keys: false, values: true }))
};

LevelUP.prototype.toString = function () {
  return 'LevelUP'
};

LevelUP.prototype.type = 'levelup';

function maybeError (db, callback) {
  if (!db._isOpening() && !db.isOpen()) {
    nextTick(callback, new ReadError('Database is not open'));
    return true
  }
}

LevelUP.errors = errors;
var levelup = LevelUP;

export { levelup as default };
