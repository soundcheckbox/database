import require$$0$1 from '../../orbit-db-store/dist/index.js';
import require$$0 from '../../crdts/dist/index.js';

const Counter$1 = require$$0;

class CounterIndex$1 {
  constructor (id) {
    this._index = new Counter$1(id);
  }

  get () {
    return this._index
  }

  updateIndex (oplog) {
    if (this._index) {
      const createCounter = e => Counter$1.from(e.payload.value);
      const mergeToIndex = e => this._index.merge(e);
      oplog.values.filter(e => e && e.payload.op === 'COUNTER')
        .map(createCounter)
        .forEach(mergeToIndex);
    }
  }
}

var CounterIndex_1 = CounterIndex$1;

const Store = require$$0$1;
const CounterIndex = CounterIndex_1;
const Counter = require$$0;

class CounterStore extends Store {
  constructor (ipfs, id, dbname, options = {}) {
    if (!options.Index) {
      Object.assign(options, { Index: CounterIndex });
    }
    super(ipfs, id, dbname, options);
    this._type = 'counter';
  }

  get value () {
    return this._index.get().value
  }

  inc (amount, options = {}) {
    const counter = new Counter(this.identity.publicKey, Object.assign({}, this._index.get()._counters));
    counter.increment(amount);
    return this._addOperation({
      op: 'COUNTER',
      key: null,
      value: counter.toJSON()
    }, options)
  }
}

var CounterStore_1 = CounterStore;

export { CounterStore_1 as default };
