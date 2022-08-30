import require$$0$1 from '../../path/dist/index.js';
import require$$0 from '../../events/dist/index.js';
import require$$2$1 from '../../p-each-series/dist/index.js';
import require$$3$1 from '../../p-queue/dist/index.js';
import require$$2 from '../../ipfs-log/dist/index.js';
import require$$1 from '../../p-map/dist/index.js';
import require$$3 from '../../logplease/dist/index.js';
import require$$9 from '../../orbit-db-io/dist/index.js';

var Store$1 = {exports: {}};

/*
  Index

  Index contains the state of a datastore, ie. what data we currently have.

  Index receives a call from a Store when the operations log for the Store
  was updated, ie. new operations were added. In updateIndex, the Index
  implements its CRDT logic: add, remove or update items in the data
  structure. Each new operation received from the operations log is applied
  in order onto the current state, ie. each new operation changes the data
  and the state changes.

  Implementing each CRDT as an Index, we can implement both operation-based
  and state-based CRDTs with the same higher level abstractions.

  To read the current state of the database, Index provides a single public
  function: `get()`. It is up to the Store to decide what kind of query
  capabilities it provides to the consumer.

  Usage:
  ```javascript
  const Index = new Index(userId)
  ```
*/

class Index$1 {
  /*
    @param id - unique identifier of this index, eg. a user id or a hash
  */
  constructor (id) {
    this.id = id;
    this._index = [];
  }

  /*
    Returns the state of the datastore, ie. most up-to-date data
    @return - current state
  */
  get () {
    return this._index
  }

  /*
    Applies operations to the Index and updates the state
    @param oplog - the source operations log that called updateIndex
    @param entries - operations that were added to the log
  */
  async updateIndex (oplog, entries) {
    this._index = oplog.values;
  }
}

var Index_1 = Index$1;

const EventEmitter$1 = require$$0.EventEmitter;
const pMap = require$$1;
const Log$1 = require$$2;

const Logger$1 = require$$3;
const logger$1 = Logger$1.create('replicator', { color: Logger$1.Colors.Cyan });
Logger$1.setLogLevel('ERROR');

const getNext = e => e.next;
const flatMap = (res, val) => res.concat(val);
const notNull = entry => entry !== null && entry !== undefined;
const uniqueValues = (res, val) => {
  res[val] = val;
  return res
};

const batchSize = 1;

class Replicator$1 extends EventEmitter$1 {
  constructor (store, concurrency) {
    super();
    this._store = store;
    this._fetching = {};
    this._stats = {
      tasksRequested: 0,
      tasksStarted: 0,
      tasksProcessed: 0
    };
    this._buffer = [];

    this._concurrency = concurrency || 128;
    this._queue = {};
    this._q = new Set();

    // Flush the queue as an emergency switch
    this._flushTimer = setInterval(() => {
      if (this.tasksRunning === 0 && Object.keys(this._queue).length > 0) {
        logger$1.warn('Had to flush the queue!', Object.keys(this._queue).length, 'items in the queue, ', this.tasksRequested, this.tasksFinished, ' tasks requested/finished');
        setTimeout(() => this._processQueue(), 0);
      }
    }, 3000);
  }

  /**
   * Returns the number of tasks started during the life time
   * @return {[Integer]} [Number of tasks started]
   */
  get tasksRequested () {
    return this._stats.tasksRequested
  }

  /**
   * Returns the number of tasks started during the life time
   * @return {[Integer]} [Number of tasks running]
   */
  get tasksStarted () {
    return this._stats.tasksStarted
  }

  /**
   * Returns the number of tasks running currently
   * @return {[Integer]} [Number of tasks running]
   */
  get tasksRunning () {
    return this._stats.tasksStarted - this._stats.tasksProcessed
  }

  /**
   * Returns the number of tasks currently queued
   * @return {[Integer]} [Number of tasks queued]
   */
  get tasksQueued () {
    return Math.max(Object.keys(this._queue).length - this.tasksRunning, 0)
  }

  /**
   * Returns the number of tasks finished during the life time
   * @return {[Integer]} [Number of tasks finished]
   */
  get tasksFinished () {
    return this._stats.tasksProcessed
  }

  /**
   * Returns the hashes currently queued
   * @return {[Array<String>]} [Queued hashes]
   */
  getQueue () {
    return Object.values(this._queue)
  }

  /*
    Process new heads.
   */
  load (entries) {
    const notKnown = entry => {
      const hash = entry.hash || entry;
      return !this._store._oplog.has(hash) && !this._fetching[hash] && !this._queue[hash]
    };

    try {
      entries
        .filter(notNull)
        .filter(notKnown)
        .forEach(this._addToQueue.bind(this));

      setTimeout(() => this._processQueue(), 0);
    } catch (e) {
      console.error(e);
    }
  }

  stop () {
    // Clears the queue flusher
    clearInterval(this._flushTimer);
    // Remove event listeners
    this.removeAllListeners('load.added');
    this.removeAllListeners('load.end');
    this.removeAllListeners('load.progress');
  }

  _addToQueue (entry) {
    const hash = entry.hash || entry;
    this._stats.tasksRequested += 1;
    this._queue[hash] = entry;
  }

  async _processQueue () {
    if (this.tasksRunning < this._concurrency) {
      const capacity = this._concurrency - this.tasksRunning;
      const items = Object.values(this._queue).slice(0, capacity).filter(notNull);
      items.forEach(entry => delete this._queue[entry.hash || entry]);

      const flattenAndGetUniques = (nexts) => nexts.reduce(flatMap, []).reduce(uniqueValues, {});
      const processValues = (nexts) => {
        const values = Object.values(nexts).filter(notNull);

        if ((items.length > 0 && this._buffer.length > 0) ||
        (this.tasksRunning === 0 && this._buffer.length > 0)) {
          const logs = this._buffer.slice();
          this._buffer = [];
          this.emit('load.end', logs);
        }

        if (values.length > 0) {
          this.load(values);
        }
      };

      return pMap(items, e => this._processOne(e))
        .then(flattenAndGetUniques)
        .then(processValues)
    }
  }

  async _processOne (entry) {
    const hash = entry.hash || entry;

    if (this._store._oplog.has(hash) || this._fetching[hash]) {
      return
    }

    this._fetching[hash] = hash;
    this.emit('load.added', entry);
    this._stats.tasksStarted += 1;

    const exclude = [];
    // console.log('>', hash)
    const log = await Log$1.fromEntryHash(this._store._ipfs, this._store.identity, hash, { logId: this._store._oplog.id, access: this._store.access, length: batchSize, exclude });
    this._buffer.push(log);

    const latest = log.values[0];
    delete this._queue[hash];
    // console.log('>>', latest.payload)

    // Mark this task as processed
    this._stats.tasksProcessed += 1;

    // Notify subscribers that we made progress
    this.emit('load.progress', this._id, hash, latest, null, this._buffer.length);

    // Return all next pointers
    return log.values.map(getNext).reduce(flatMap, [])
  }
}

var Replicator_1 = Replicator$1;

class ReplicationInfo$1 {
  constructor () {
    this.reset();
  }

  reset () {
    this.progress = 0;
    this.max = 0;
    this.buffered = 0;
    this.queued = 0;
  }
}

var replicationInfo = ReplicationInfo$1;

const path = require$$0$1;
const EventEmitter = require$$0.EventEmitter;
const mapSeries = require$$2$1;
const PQueue = require$$3$1;
const Log = require$$2;
const Entry = Log.Entry;
const Index = Index_1;
const Replicator = Replicator_1;
const ReplicationInfo = replicationInfo;

const Logger = require$$3;
const logger = Logger.create('orbit-db.store', { color: Logger.Colors.Blue });
Logger.setLogLevel('ERROR');
const io = require$$9;

const DefaultOptions = {
  Index: Index,
  maxHistory: -1,
  fetchEntryTimeout: null,
  referenceCount: 32,
  replicationConcurrency: 128,
  syncLocal: false,
  sortFn: undefined
};

class Store {
  constructor (ipfs, identity, address, options) {
    if (!identity) {
      throw new Error('Identity required')
    }

    // Set the options
    const opts = Object.assign({}, DefaultOptions);
    Object.assign(opts, options);
    this.options = opts;

    // Default type
    this._type = 'store';

    // Create IDs, names and paths
    this.id = address.toString();
    this.identity = identity;
    this.address = address;
    this.dbname = address.path || '';
    this.events = new EventEmitter();

    this.remoteHeadsPath = path.join(this.id, '_remoteHeads');
    this.localHeadsPath = path.join(this.id, '_localHeads');
    this.snapshotPath = path.join(this.id, 'snapshot');
    this.queuePath = path.join(this.id, 'queue');
    this.manifestPath = path.join(this.id, '_manifest');

    // External dependencies
    this._ipfs = ipfs;
    this._cache = options.cache;

    // Access mapping
    const defaultAccess = {
      canAppend: (entry) => (entry.identity.publicKey === identity.publicKey)
    };
    this.access = options.accessController || defaultAccess;

    // Create the operations log
    this._oplog = new Log(this._ipfs, this.identity, { logId: this.id, access: this.access, sortFn: this.options.sortFn });

    // _addOperation queue
    this._opqueue = new PQueue({ concurrency: 1 });

    // Create the index
    this._index = new this.options.Index(this.address.root);

    // Replication progress info
    this._replicationStatus = new ReplicationInfo();

    // Statistics
    this._stats = {
      snapshot: {
        bytesLoaded: -1
      },
      syncRequestsReceieved: 0
    };

    try {
      this._replicator = new Replicator(this, this.options.replicationConcurrency);
      // For internal backwards compatibility,
      // to be removed in future releases
      this._loader = this._replicator;
      this._replicator.on('load.added', (entry) => {
        // Update the latest entry state (latest is the entry with largest clock time)
        this._replicationStatus.queued++;
        this._recalculateReplicationMax(entry.clock ? entry.clock.time : 0);
        // console.log(`<replicate>`)
        this.events.emit('replicate', this.address.toString(), entry);
      });
      this._replicator.on('load.progress', (id, hash, entry, have, bufferedLength) => {
        if (this._replicationStatus.buffered > bufferedLength) {
          this._recalculateReplicationProgress(this.replicationStatus.progress + bufferedLength);
        } else {
          this._recalculateReplicationProgress(this._oplog.length + bufferedLength);
        }
        this._replicationStatus.buffered = bufferedLength;
        this._recalculateReplicationMax(this.replicationStatus.progress);
        // console.log(`<replicate.progress>`)
        this.events.emit('replicate.progress', this.address.toString(), hash, entry, this.replicationStatus.progress, this.replicationStatus.max);
      });

      const onLoadCompleted = async (logs, have) => {
        try {
          for (const log of logs) {
            await this._oplog.join(log);
          }
          this._replicationStatus.queued -= logs.length;
          this._replicationStatus.buffered = this._replicator._buffer.length;
          await this._updateIndex();

          // only store heads that has been verified and merges
          const heads = this._oplog.heads;
          await this._cache.set(this.remoteHeadsPath, heads);
          console.log(`Saved heads ${heads.length} [${heads.map(e => e.hash).join(', ')}]`);

          // console.log(`<replicated>`)
          this.events.emit('replicated', this.address.toString(), logs.length);
        } catch (e) {
          console.error(e);
        }
      };
      this._replicator.on('load.end', onLoadCompleted);
    } catch (e) {
      console.error('Store Error:', e);
    }
    this.events.on('replicated.progress', (address, hash, entry, progress, have) => {
      this._procEntry(entry);
    });
    this.events.on('write', (address, entry, heads) => {
      this._procEntry(entry);
    });
  }

  get all () {
    return Array.isArray(this._index._index)
      ? this._index._index
      : Object.keys(this._index._index).map(e => this._index._index[e])
  }

  get index () {
    return this._index._index
  }

  get type () {
    return this._type
  }

  get key () {
    return this._key
  }

  /**
   * Returns the database's current replication status information
   * @return {[Object]} [description]
   */
  get replicationStatus () {
    return this._replicationStatus
  }

  setIdentity (identity) {
    this.identity = identity;
    this._oplog.setIdentity(identity);
  }

  async close () {
    if (this.options.onClose) {
      await this.options.onClose(this);
    }

    await this._opqueue.onIdle();

    // Replicator teardown logic
    this._replicator.stop();

    // Reset replication statistics
    this._replicationStatus.reset();

    // Reset database statistics
    this._stats = {
      snapshot: {
        bytesLoaded: -1
      },
      syncRequestsReceieved: 0
    };

    // Remove all event listeners
    for (var event in this.events._events) {
      this.events.removeAllListeners(event);
    }

    // Database is now closed
    // TODO: afaik we don't use 'closed' event anymore,
    // to be removed in future releases
    this.events.emit('closed', this.address.toString());
    return Promise.resolve()
  }

  /**
   * Drops a database and removes local data
   * @return {[None]}
   */
  async drop () {
    if (this.options.onDrop) {
      await this.options.onDrop(this);
    }

    await this._cache.del(this.localHeadsPath);
    await this._cache.del(this.remoteHeadsPath);
    await this._cache.del(this.snapshotPath);
    await this._cache.del(this.queuePath);
    await this._cache.del(this.manifestPath);

    await this.close();

    // Reset
    this._index = new this.options.Index(this.address.root);
    this._oplog = new Log(this._ipfs, this.identity, { logId: this.id, access: this.access, sortFn: this.options.sortFn });
    this._cache = this.options.cache;
  }

  async load (amount, opts = {}) {
    if (typeof amount === 'object') {
      opts = amount;
      amount = undefined;
    }
    amount = amount || this.options.maxHistory;
    const fetchEntryTimeout = opts.fetchEntryTimeout || this.options.fetchEntryTimeout;

    if (this.options.onLoad) {
      await this.options.onLoad(this);
    }
    const localHeads = await this._cache.get(this.localHeadsPath) || [];
    const remoteHeads = await this._cache.get(this.remoteHeadsPath) || [];
    const heads = localHeads.concat(remoteHeads);

    if (heads.length > 0) {
      this.events.emit('load', this.address.toString(), heads);
    }

    // Update the replication status from the heads
    heads.forEach(h => this._recalculateReplicationMax(h.clock.time));

    // Load the log
    const log = await Log.fromEntryHash(this._ipfs, this.identity, heads.map(e => e.hash), {
      logId: this._oplog.id,
      access: this.access,
      sortFn: this.options.sortFn,
      length: amount,
      exclude: this._oplog.values,
      onProgressCallback: this._onLoadProgress.bind(this),
      timeout: fetchEntryTimeout
    });

    // Join the log with the existing log
    await this._oplog.join(log, amount);

    // Update the index
    if (heads.length > 0) {
      await this._updateIndex();
    }

    this.events.emit('ready', this.address.toString(), this._oplog.heads);
  }

  async sync (heads) {
    this._stats.syncRequestsReceieved += 1;
    console.log(`Sync request #${this._stats.syncRequestsReceieved} ${heads.length}`);
    if (heads.length === 0) {
      return
    }

    // To simulate network latency, uncomment this line
    // and comment out the rest of the function
    // That way the object (received as head message from pubsub)
    // doesn't get written to IPFS and so when the Replicator is fetching
    // the log, it'll fetch it from the network instead from the disk.
    // return this._replicator.load(heads)

    const saveToIpfs = async (head) => {
      if (!head) {
        console.warn("Warning: Given input entry was 'null'.");
        return Promise.resolve(null)
      }

      const identityProvider = this.identity.provider;
      if (!identityProvider) throw new Error('Identity-provider is required, cannot verify entry')

      const canAppend = await this.access.canAppend(head, identityProvider);
      if (!canAppend) {
        console.warn('Warning: Given input entry is not allowed in this log and was discarded (no write access).');
        return Promise.resolve(null)
      }

      const logEntry = Entry.toEntry(head);
      const hash = await io.write(this._ipfs, Entry.getWriteFormat(logEntry), logEntry, { links: Entry.IPLD_LINKS, onlyHash: true });

      if (hash !== head.hash) {
        console.warn('"WARNING! Head hash didn\'t match the contents');
      }

      return head
    };

    const saved = await mapSeries(heads, saveToIpfs);
    await this._replicator.load(saved.filter(e => e !== null));

    if (this._replicator._buffer.length || Object.values(this._replicator._queue).length) {
      return new Promise(resolve => {
        const progressHandler = (address, hash, entry, progress, have) => {
          if (progress === have) {
            this.events.off('replicate.progress', progressHandler);
            this.events.once('replicated', resolve);
          }
        };
        this.events.on('replicate.progress', progressHandler);
      })
    }
  }

  loadMoreFrom (amount, entries) {
    this._replicator.load(entries);
  }

  async saveSnapshot () {
    const unfinished = this._replicator.getQueue();

    const snapshotData = this._oplog.toSnapshot();
    const buf = Buffer.from(JSON.stringify({
      id: snapshotData.id,
      heads: snapshotData.heads,
      size: snapshotData.values.length,
      values: snapshotData.values,
      type: this.type
    }));
    console.log('@@@@@@@@@@@@ IPFS ADD @@@@@@@@@@@@@@@@@', buf)
    const snapshot = await this._ipfs.add(buf);
    console.log('@@@@@@@@@@@@ IPFS ADD @@@@@@@@@@@@@@@@@', snapshot)
    snapshot.hash = snapshot.cid.toString(); // js-ipfs >= 0.41, ipfs.add results contain a cid property (a CID instance) instead of a string hash property
    await this._cache.set(this.snapshotPath, snapshot);
    await this._cache.set(this.queuePath, unfinished);

    console.log(`Saved snapshot: ${snapshot.hash}, queue length: ${unfinished.length}`);

    return [snapshot]
  }

  async loadFromSnapshot (onProgressCallback) {
    if (this.options.onLoad) {
      await this.options.onLoad(this);
    }

    this.events.emit('load', this.address.toString()); // TODO emits inconsistent params, missing heads param

    const maxClock = (res, val) => Math.max(res, val.clock.time);

    const queue = await this._cache.get(this.queuePath);
    this.sync(queue || []);

    const snapshot = await this._cache.get(this.snapshotPath);

    if (snapshot) {
      const chunks = [];
      for await (const chunk of this._ipfs.cat(snapshot.hash)) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const snapshotData = JSON.parse(buffer.toString());

      const onProgress = (hash, entry, count, total) => {
        this._recalculateReplicationStatus(count, entry.clock.time);
        this._onLoadProgress(hash, entry);
      };

      // Fetch the entries
      // Timeout 1 sec to only load entries that are already fetched (in order to not get stuck at loading)
      this._recalculateReplicationMax(snapshotData.values.reduce(maxClock, 0));
      if (snapshotData) {
        const log = await Log.fromJSON(this._ipfs, this.identity, snapshotData, { access: this.access, sortFn: this.options.sortFn, length: -1, timeout: 1000, onProgressCallback: onProgress });
        await this._oplog.join(log);
        await this._updateIndex();
        this.events.emit('replicated', this.address.toString()); // TODO: inconsistent params, count param not emited
      }
      this.events.emit('ready', this.address.toString(), this._oplog.heads);
    } else {
      throw new Error(`Snapshot for ${this.address} not found!`)
    }

    return this
  }

  async _updateIndex () {
    this._recalculateReplicationMax();
    await this._index.updateIndex(this._oplog);
    this._recalculateReplicationProgress();
  }

  async syncLocal () {
    const localHeads = await this._cache.get(this.localHeadsPath) || [];
    const remoteHeads = await this._cache.get(this.remoteHeadsPath) || [];
    const heads = localHeads.concat(remoteHeads);
    for (let i = 0; i < heads.length; i++) {
      const head = heads[i];
      if (!this._oplog.heads.includes(head)) {
        await this.load();
        break
      }
    }
  }

  async _addOperation (data, { onProgressCallback, pin = false } = {}) {
    async function addOperation () {
      if (this._oplog) {
        // check local cache?
        if (this.options.syncLocal) {
          await this.syncLocal();
        }

        const entry = await this._oplog.append(data, this.options.referenceCount, pin);
        this._recalculateReplicationStatus(this.replicationStatus.progress + 1, entry.clock.time);
        await this._cache.set(this.localHeadsPath, [entry]);
        await this._updateIndex();
        this.events.emit('write', this.address.toString(), entry, this._oplog.heads);
        if (onProgressCallback) onProgressCallback(entry);
        return entry.hash
      }
    }
    return this._opqueue.add(addOperation.bind(this))
  }

  _addOperationBatch (data, batchOperation, lastOperation, onProgressCallback) {
    throw new Error('Not implemented!')
  }

  _procEntry (entry) {
    var { payload, hash } = entry;
    var { op } = payload;
    if (op) {
      this.events.emit(`log.op.${op}`, this.address.toString(), hash, payload);
    } else {
      this.events.emit('log.op.none', this.address.toString(), hash, payload);
    }
    this.events.emit('log.op', op, this.address.toString(), hash, payload);
  }

  _onLoadProgress (hash, entry, progress, total) {
    this._recalculateReplicationStatus(progress, total);
    this.events.emit('load.progress', this.address.toString(), hash, entry, this.replicationStatus.progress, this.replicationStatus.max);
  }

  /* Replication Status state updates */

  _recalculateReplicationProgress (max) {
    this._replicationStatus.progress = Math.max.apply(null, [
      this._replicationStatus.progress,
      this._oplog.length,
      max || 0
    ]);
    this._recalculateReplicationMax(this.replicationStatus.progress);
  }

  _recalculateReplicationMax (max) {
    this._replicationStatus.max = Math.max.apply(null, [
      this._replicationStatus.max,
      this._oplog.length,
      max || 0
    ]);
  }

  _recalculateReplicationStatus (maxProgress, maxTotal) {
    this._recalculateReplicationProgress(maxProgress);
    this._recalculateReplicationMax(maxTotal);
  }
}

Store$1.exports = Store;
var DefaultOptions_1 = Store$1.exports.DefaultOptions = DefaultOptions;

var exports = Store$1.exports;
export { DefaultOptions_1 as DefaultOptions, exports as default };
