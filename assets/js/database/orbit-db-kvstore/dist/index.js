import require$$0 from '../../orbit-db-store/dist/index.js';

class KeyValueIndex$1 {
  constructor() {
    this._index = {};
  }

  get(key) {
    return this._index[key]
  }

  updateIndex(oplog) {
    oplog.values
      .slice()
      .reverse()
      .reduce((handled, item) => {
        if(!handled.includes(item.payload.key)) {
          handled.push(item.payload.key);
          if(item.payload.op === 'PUT') {
            this._index[item.payload.key] = item.payload.value;
          } else if(item.payload.op === 'DEL') {
            delete this._index[item.payload.key];
          }
        }
        return handled
      }, []);
  }
}

var KeyValueIndex_1 = KeyValueIndex$1;

const Store = require$$0;
const KeyValueIndex = KeyValueIndex_1;

class KeyValueStore extends Store {
  constructor(ipfs, id, dbname, options) {
    let opts = Object.assign({}, { Index: KeyValueIndex });
    Object.assign(opts, options);
    super(ipfs, id, dbname, opts);
    this._type = 'keyvalue';
  }

  get all () {
    return this._index._index
  }

  get (key) {
    return this._index.get(key)
  }

  set (key, data, options = {}) {
    return this.put(key, data, options)
  }

  put (key, data, options = {}) {
    return this._addOperation({
      op: 'PUT',
      key: key,
      value: data
    }, options)
  }

  del (key, options = {}) {
    return this._addOperation({
      op: 'DEL',
      key: key,
      value: null
    }, options)
  }
}

var KeyValueStore_1 = KeyValueStore;

export { KeyValueStore_1 as default };
