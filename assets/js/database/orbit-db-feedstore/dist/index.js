import require$$0 from '../../orbit-db-eventstore/dist/index.js';

class FeedIndex$1 {
  constructor() {
    this._index = {};
  }

  get() {
    return Object.keys(this._index).map((f) => this._index[f])
  }

  updateIndex(oplog) {
    this._index = {};
    oplog.values.reduce((handled, item) => {
      if(!handled.includes(item.hash)) {
        handled.push(item.hash);
        if(item.payload.op === 'ADD') {
          this._index[item.hash] = item;
        } else if(item.payload.op === 'DEL') {
          delete this._index[item.payload.value];
        }
      }
      return handled
    }, []);
  }
}

var FeedIndex_1 = FeedIndex$1;

const EventStore = require$$0;
const FeedIndex  = FeedIndex_1;

class FeedStore extends EventStore {
  constructor (ipfs, id, dbname, options) {
    if(!options) options = {};
    if(!options.Index) Object.assign(options, { Index: FeedIndex });
    super(ipfs, id, dbname, options);
    this._type = 'feed';
  }

  remove (hash, options = {}) {
    return this.del(hash, options)
  }

  del (hash, options = {}) {
    const operation = {
      op: 'DEL',
      key: null,
      value: hash
    };
    return this._addOperation(operation, options)
  }
}

var FeedStore_1 = FeedStore;

export { FeedStore_1 as default };
