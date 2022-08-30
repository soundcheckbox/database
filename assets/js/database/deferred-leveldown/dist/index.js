import require$$0 from '../../abstract-leveldown/dist/index.js';
import require$$1 from '../../inherits/dist/index.js';

var deferredLeveldown = {exports: {}};

const AbstractIterator = require$$0.AbstractIterator;
const inherits$1 = require$$1;

function DeferredIterator$1 (db, options) {
  AbstractIterator.call(this, db);

  this._options = options;
  this._iterator = null;
  this._operations = [];
}

inherits$1(DeferredIterator$1, AbstractIterator);

DeferredIterator$1.prototype.setDb = function (db) {
  const it = this._iterator = db.iterator(this._options);

  for (const op of this._operations) {
    it[op.method](...op.args);
  }
};

DeferredIterator$1.prototype._operation = function (method, args) {
  if (this._iterator) return this._iterator[method](...args)
  this._operations.push({ method, args });
};

for (const m of ['next', 'end']) {
  DeferredIterator$1.prototype['_' + m] = function (...args) {
    this._operation(m, args);
  };
}

// Must defer seek() rather than _seek() because it requires db._serializeKey to be available
DeferredIterator$1.prototype.seek = function (...args) {
  this._operation('seek', args);
};

var deferredIterator = DeferredIterator$1;

const AbstractLevelDOWN = require$$0.AbstractLevelDOWN;
const inherits = require$$1;
const DeferredIterator = deferredIterator;
const deferrables = 'put get del batch clear'.split(' ');
const optionalDeferrables = 'approximateSize compactRange'.split(' ');

function DeferredLevelDOWN (db) {
  AbstractLevelDOWN.call(this, db.supports || {});

  // TODO (future major): remove this fallback; db must have manifest that
  // declares approximateSize and compactRange in additionalMethods.
  for (const m of optionalDeferrables) {
    if (typeof db[m] === 'function' && !this.supports.additionalMethods[m]) {
      this.supports.additionalMethods[m] = true;
    }
  }

  this._db = db;
  this._operations = [];

  closed(this);
}

inherits(DeferredLevelDOWN, AbstractLevelDOWN);

DeferredLevelDOWN.prototype.type = 'deferred-leveldown';

DeferredLevelDOWN.prototype._open = function (options, callback) {
  this._db.open(options, (err) => {
    if (err) return callback(err)

    for (const op of this._operations) {
      if (op.iterator) {
        op.iterator.setDb(this._db);
      } else {
        this._db[op.method](...op.args);
      }
    }

    this._operations = [];

    open(this);
    callback();
  });
};

DeferredLevelDOWN.prototype._close = function (callback) {
  this._db.close((err) => {
    if (err) return callback(err)
    closed(this);
    callback();
  });
};

function open (self) {
  for (const m of deferrables.concat('iterator')) {
    self['_' + m] = function (...args) {
      return this._db[m](...args)
    };
  }

  for (const m of Object.keys(self.supports.additionalMethods)) {
    self[m] = function (...args) {
      return this._db[m](...args)
    };
  }
}

function closed (self) {
  for (const m of deferrables) {
    self['_' + m] = function (...args) {
      this._operations.push({ method: m, args });
    };
  }

  for (const m of Object.keys(self.supports.additionalMethods)) {
    self[m] = function (...args) {
      this._operations.push({ method: m, args });
    };
  }

  self._iterator = function (options) {
    const it = new DeferredIterator(self, options);
    this._operations.push({ iterator: it });
    return it
  };
}

DeferredLevelDOWN.prototype._serializeKey = function (key) {
  return key
};

DeferredLevelDOWN.prototype._serializeValue = function (value) {
  return value
};

deferredLeveldown.exports = DeferredLevelDOWN;
var DeferredIterator_1 = deferredLeveldown.exports.DeferredIterator = DeferredIterator;

var exports = deferredLeveldown.exports;
export { DeferredIterator_1 as DeferredIterator, exports as default };
