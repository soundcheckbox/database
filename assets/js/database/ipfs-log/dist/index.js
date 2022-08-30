import require$$0 from '../../p-map/dist/index.js';
import require$$3 from '../../orbit-db-io/dist/index.js';
import require$$2 from '../../json-stringify-deterministic/dist/index.js';
import require$$1 from '../../p-do-whilst/dist/index.js';
import buffer from '../../safe-buffer/dist/index.js';
let Buffer = buffer.Buffer
var log = {exports: {}};

/**
 * Interface for G-Set CRDT
 *
 * From:
 * "A comprehensive study of Convergent and Commutative Replicated Data Types"
 * https://hal.inria.fr/inria-00555588
 */
class GSet$1 {
  constructor (values) {} // eslint-disable-line
  append (value) {}
  merge (set) {}
  get (value) {}
  has (value) {}
  get values () {}
  get length () {}
}

var gSet = GSet$1;

var entry = {exports: {}};

class LamportClock {
  constructor (id, time) {
    this.id = id;
    this.time = time || 0;
  }

  tick () {
    return new LamportClock(this.id, ++this.time)
  }

  merge (clock) {
    this.time = Math.max(this.time, clock.time);
    return new LamportClock(this.id, this.time)
  }

  clone () {
    return new LamportClock(this.id, this.time)
  }

  static compare (a, b) {
    // Calculate the "distance" based on the clock, ie. lower or greater
    var dist = a.time - b.time;

    // If the sequence number is the same (concurrent events),
    // and the IDs are different, take the one with a "lower" id
    if (dist === 0 && a.id !== b.id) return a.id < b.id ? -1 : 1

    return dist
  }
}

var lamportClock = LamportClock;

function difference$2 (a, b, key) {
  // Indices for quick lookups
  var processed = {};
  var existing = {};

  // Create an index of the first collection
  var addToIndex = e => (existing[key ? e[key] : e] = true);
  a.forEach(addToIndex);

  // Reduce to entries that are not in the first collection
  var reducer = (res, entry) => {
    var isInFirst = existing[key ? entry[key] : entry] !== undefined;
    var hasBeenProcessed = processed[key ? entry[key] : entry] !== undefined;
    if (!isInFirst && !hasBeenProcessed) {
      res.push(entry);
      processed[key ? entry[key] : entry] = true;
    }
    return res
  };

  return b.reduce(reducer, [])
}

var difference_1 = difference$2;

function findUniques$3 (value, key) {
  // Create an index of the collection
  const uniques = {};
  var get = e => uniques[e];
  var addToIndex = e => (uniques[key ? e[key] : e] = e);
  value.forEach(addToIndex);
  return Object.keys(uniques).map(get)
}

var findUniques_1 = findUniques$3;

const isDefined$4 = (arg) => arg !== undefined && arg !== null;

var isDefined_1 = isDefined$4;

const difference$1 = difference_1;
const findUniques$2 = findUniques_1;
const isDefined$3 = isDefined_1;
const io$2 = require$$3;

var utils = {
  difference: difference$1,
  findUniques: findUniques$2,
  isDefined: isDefined$3,
  io: io$2
};

const Clock$2 = lamportClock;
const { isDefined: isDefined$2, io: io$1 } = utils;
const stringify = require$$2;
const IpfsNotDefinedError = () => new Error('Ipfs instance not defined');
const IPLD_LINKS$1 = ['next', 'refs'];
const getWriteFormatForVersion = v => v === 0 ? 'dag-pb' : 'dag-cbor';
const getWriteFormat = e => Entry$3.isEntry(e) ? getWriteFormatForVersion(e.v) : getWriteFormatForVersion(e);

class Entry$3 {
  /**
   * Create an Entry
   * @param {IPFS} ipfs An IPFS instance
   * @param {Identity} identity The identity instance
   * @param {string} logId The unique identifier for this log
   * @param {*} data Data of the entry to be added. Can be any JSON.stringifyable data
   * @param {Array<string|Entry>} [next=[]] Parent hashes or entries
   * @param {LamportClock} [clock] The lamport clock
   * @returns {Promise<Entry>}
   * @example
   * const entry = await Entry.create(ipfs, identity, 'hello')
   * console.log(entry)
   * // { hash: null, payload: "hello", next: [] }
   */
  static async create (ipfs, identity, logId, data, next = [], clock, refs = [], pin) {
    if (!isDefined$2(ipfs)) throw IpfsNotDefinedError()
    if (!isDefined$2(identity)) throw new Error('Identity is required, cannot create entry')
    if (!isDefined$2(logId)) throw new Error('Entry requires an id')
    if (!isDefined$2(data)) throw new Error('Entry requires data')
    if (!isDefined$2(next) || !Array.isArray(next)) throw new Error("'next' argument is not an array")

    // Clean the next objects and convert to hashes
    const toEntry = (e) => e.hash ? e.hash : e;
    const nexts = next.filter(isDefined$2).map(toEntry);

    const entry = {
      hash: null, // "zd...Foo", we'll set the hash after persisting the entry
      id: logId, // For determining a unique chain
      payload: data, // Can be any JSON.stringifyable data
      next: nexts, // Array of hashes
      refs: refs,
      v: 2, // To tag the version of this data structure
      clock: clock || new Clock$2(identity.publicKey)
    };

    const signature = await identity.provider.sign(identity, Entry$3.toBuffer(entry));

    entry.key = identity.publicKey;
    entry.identity = identity.toJSON();
    entry.sig = signature;
    entry.hash = await Entry$3.toMultihash(ipfs, entry, pin);

    return entry
  }

  /**
   * Verifies an entry signature.
   *
   * @param {IdentityProvider} identityProvider The identity provider to use
   * @param {Entry} entry The entry being verified
   * @return {Promise} A promise that resolves to a boolean value indicating if the signature is valid
   */
  static async verify (identityProvider, entry) {
    if (!identityProvider) throw new Error('Identity-provider is required, cannot verify entry')
    if (!Entry$3.isEntry(entry)) throw new Error('Invalid Log entry')
    if (!entry.key) throw new Error("Entry doesn't have a key")
    if (!entry.sig) throw new Error("Entry doesn't have a signature")

    const e = Entry$3.toEntry(entry, { presigned: true });
    const verifier = entry.v < 1 ? 'v0' : 'v1';
    return identityProvider.verify(entry.sig, entry.key, Entry$3.toBuffer(e), verifier)
  }

  /**
   * Transforms an entry into a Buffer.
   * @param {Entry} entry The entry
   * @return {Buffer} The buffer
   */
  static toBuffer (entry) {
    const stringifiedEntry = entry.v === 0 ? JSON.stringify(entry) : stringify(entry);
    return Buffer.from(stringifiedEntry)
  }

  /**
   * Get the multihash of an Entry.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Entry} entry Entry to get a multihash for
   * @returns {Promise<string>}
   * @example
   * const multihash = await Entry.toMultihash(ipfs, entry)
   * console.log(multihash)
   * // "Qm...Foo"
   * @deprecated
   */
  static async toMultihash (ipfs, entry, pin = false) {
    if (!ipfs) throw IpfsNotDefinedError()
    if (!Entry$3.isEntry(entry)) throw new Error('Invalid object format, cannot generate entry hash')

    // // Ensure `entry` follows the correct format
    const e = Entry$3.toEntry(entry);
    return io$1.write(ipfs, getWriteFormat(e.v), e, { links: IPLD_LINKS$1, pin })
  }

  static toEntry (entry, { presigned = false, includeHash = false } = {}) {
    const e = {
      hash: includeHash ? entry.hash : null,
      id: entry.id,
      payload: entry.payload,
      next: entry.next
    };

    const v = entry.v;
    if (v > 1) {
      e.refs = entry.refs; // added in v2
    }
    e.v = entry.v;
    e.clock = new Clock$2(entry.clock.id, entry.clock.time);

    if (presigned) {
      return e // don't include key/sig information
    }

    e.key = entry.key;
    if (v > 0) {
      e.identity = entry.identity; // added in v1
    }
    e.sig = entry.sig;
    return e
  }

  /**
   * Create an Entry from a hash.
   * @param {IPFS} ipfs An IPFS instance
   * @param {string} hash The hash to create an Entry from
   * @returns {Promise<Entry>}
   * @example
   * const entry = await Entry.fromMultihash(ipfs, "zd...Foo")
   * console.log(entry)
   * // { hash: "Zd...Foo", payload: "hello", next: [] }
   */
  static async fromMultihash (ipfs, hash) {
    if (!ipfs) throw IpfsNotDefinedError()
    if (!hash) throw new Error(`Invalid hash: ${hash}`)
    const e = await io$1.read(ipfs, hash, { links: IPLD_LINKS$1 });

    const entry = Entry$3.toEntry(e);
    entry.hash = hash;

    return entry
  }

  /**
   * Check if an object is an Entry.
   * @param {Entry} obj
   * @returns {boolean}
   */
  static isEntry (obj) {
    return obj && obj.id !== undefined &&
      obj.next !== undefined &&
      obj.payload !== undefined &&
      obj.v !== undefined &&
      obj.hash !== undefined &&
      obj.clock !== undefined &&
      (obj.refs !== undefined || obj.v < 2) // 'refs' added in v2
  }

  /**
   * Compares two entries.
   * @param {Entry} a
   * @param {Entry} b
   * @returns {number} 1 if a is greater, -1 is b is greater
   */
  static compare (a, b) {
    var distance = Clock$2.compare(a.clock, b.clock);
    if (distance === 0) return a.clock.id < b.clock.id ? -1 : 1
    return distance
  }

  /**
   * Check if an entry equals another entry.
   * @param {Entry} a
   * @param {Entry} b
   * @returns {boolean}
   */
  static isEqual (a, b) {
    return a.hash === b.hash
  }

  /**
   * Check if an entry is a parent to another entry.
   * @param {Entry} entry1 Entry to check
   * @param {Entry} entry2 The parent Entry
   * @returns {boolean}
   */
  static isParent (entry1, entry2) {
    return entry2.next.indexOf(entry1.hash) > -1
  }

  /**
   * Find entry's children from an Array of entries.
   * Returns entry's children as an Array up to the last know child.
   * @param {Entry} entry Entry for which to find the parents
   * @param {Array<Entry>} values Entries to search parents from
   * @returns {Array<Entry>}
   */
  static findChildren (entry, values) {
    var stack = [];
    var parent = values.find((e) => Entry$3.isParent(entry, e));
    var prev = entry;
    while (parent) {
      stack.push(parent);
      prev = parent;
      parent = values.find((e) => Entry$3.isParent(prev, e));
    }
    stack = stack.sort((a, b) => a.clock.time > b.clock.time);
    return stack
  }
}

entry.exports = Entry$3;
entry.exports.IPLD_LINKS = IPLD_LINKS$1;
entry.exports.getWriteFormat = getWriteFormat;

const pMap$1 = require$$0;
const pDoWhilst = require$$1;
const Entry$2 = entry.exports;

const hasItems = arr => arr && arr.length > 0;

class EntryIO$1 {
  // Fetch log graphs in parallel
  static async fetchParallel (ipfs, hashes, { length, exclude = [], timeout, concurrency, onProgressCallback }) {
    const fetchOne = async (hash) => EntryIO$1.fetchAll(ipfs, hash, { length, exclude, timeout, onProgressCallback, concurrency });
    const concatArrays = (arr1, arr2) => arr1.concat(arr2);
    const flatten = (arr) => arr.reduce(concatArrays, []);
    const res = await pMap$1(hashes, fetchOne, { concurrency: Math.max(concurrency || hashes.length, 1) });
    return flatten(res)
  }

  /**
   * Fetch log entries
   *
   * @param {IPFS} [ipfs] An IPFS instance
   * @param {string} [hash] Multihash of the entry to fetch
   * @param {string} [parent] Parent of the node to be fetched
   * @param {Object} [all] Entries to skip
   * @param {Number} [amount=-1] How many entries to fetch
   * @param {Number} [depth=0] Current depth of the recursion
   * @param {function(hash, entry, parent, depth)} onProgressCallback
   * @returns {Promise<Array<Entry>>}
   */
  static async fetchAll (ipfs, hashes, { length = -1, exclude = [], timeout, onProgressCallback, onStartProgressCallback, concurrency = 32, delay = 0 } = {}) {
    const result = [];
    const cache = {};
    const loadingCache = {};
    const loadingQueue = Array.isArray(hashes)
      ? { 0: hashes.slice() }
      : { 0: [hashes] };
    let running = 0; // keep track of how many entries are being fetched at any time
    let maxClock = 0; // keep track of the latest clock time during load
    let minClock = 0; // keep track of the minimum clock time during load

    // Does the loading queue have more to process?
    const loadingQueueHasMore = () => Object.values(loadingQueue).find(hasItems) !== undefined;

    // Add a multihash to the loading queue
    const addToLoadingQueue = (e, idx) => {
      if (!loadingCache[e]) {
        if (!loadingQueue[idx]) loadingQueue[idx] = [];
        if (!loadingQueue[idx].includes(e)) {
          loadingQueue[idx].push(e);
        }
        loadingCache[e] = true;
      }
    };

    // Get the next items to process from the loading queue
    const getNextFromQueue = (length = 1) => {
      const getNext = (res, key, idx) => {
        const nextItems = loadingQueue[key];
        while (nextItems.length > 0 && res.length < length) {
          const hash = nextItems.shift();
          res.push(hash);
        }
        if (nextItems.length === 0) {
          delete loadingQueue[key];
        }
        return res
      };
      return Object.keys(loadingQueue).reduce(getNext, [])
    };

    // Add entries that we don't need to fetch to the "cache"
    const addToExcludeCache = e => { cache[e.hash] = true; };

    // Fetch one entry and add it to the results
    const fetchEntry = async (hash) => {
      if (!hash || cache[hash]) {
        return
      }

      return new Promise((resolve, reject) => {
        // Resolve the promise after a timeout (if given) in order to
        // not get stuck loading a block that is unreachable
        const timer = timeout && timeout > 0
          ? setTimeout(() => {
            console.warn(`Warning: Couldn't fetch entry '${hash}', request timed out (${timeout}ms)`);
            resolve();
          }, timeout)
          : null;

        const addToResults = (entry) => {
          if (Entry$2.isEntry(entry)) {
            const ts = entry.clock.time;

            // Update min/max clocks
            maxClock = Math.max(maxClock, ts);
            minClock = result.length > 0
              ? Math.min(result[result.length - 1].clock.time, minClock)
              : maxClock;

            const isLater = (result.length >= length && ts >= minClock);
            const calculateIndex = (idx) => maxClock - ts + ((idx + 1) * idx);

            // Add the entry to the results if
            // 1) we're fetching all entries
            // 2) results is not filled yet
            // the clock of the entry is later than current known minimum clock time
            if (length < 0 || result.length < length || isLater) {
              result.push(entry);
              cache[hash] = true;

              if (onProgressCallback) {
                onProgressCallback(hash, entry, result.length, result.length);
              }
            }

            if (length < 0) {
              // If we're fetching all entries (length === -1), adds nexts and refs to the queue
              entry.next.forEach(addToLoadingQueue);
              if (entry.refs) entry.refs.forEach(addToLoadingQueue);
            } else {
              // If we're fetching entries up to certain length,
              // fetch the next if result is filled up, to make sure we "check"
              // the next entry if its clock is later than what we have in the result
              if (result.length < length || ts > minClock || (ts === minClock && !cache[entry.hash])) {
                entry.next.forEach(e => addToLoadingQueue(e, calculateIndex(0)));
              }
              if (entry.refs && (result.length + entry.refs.length <= length)) {
                entry.refs.forEach((e, i) => addToLoadingQueue(e, calculateIndex(i)));
              }
            }
          }
        };

        if (onStartProgressCallback) {
          onStartProgressCallback(hash, null, 0, result.length);
        }

        // Load the entry
        Entry$2.fromMultihash(ipfs, hash).then(async (entry) => {
          try {
            // Add it to the results
            addToResults(entry);

            // Simulate network latency (for debugging purposes)
            if (delay > 0) {
              const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
              await sleep(delay);
            }
            resolve();
          } catch (e) {
            reject(e);
          } finally {
            clearTimeout(timer);
          }
        }).catch(reject);
      })
    };

    // One loop of processing the loading queue
    const _processQueue = async () => {
      if (running < concurrency) {
        const nexts = getNextFromQueue(concurrency);
        running += nexts.length;
        await pMap$1(nexts, fetchEntry);
        running -= nexts.length;
      }
    };

    // Add entries to exclude from processing to the cache before we start
    exclude.forEach(addToExcludeCache);

    // Fetch entries
    await pDoWhilst(_processQueue, loadingQueueHasMore);

    return result
  }
}

var entryIo = EntryIO$1;

var logSorting = {};

const Clock$1 = lamportClock;

/**
 * Sort two entries as Last-Write-Wins (LWW).
 *
 * Last Write Wins is a conflict resolution strategy for sorting elements
 * where the element with a greater clock (latest) is chosen as the winner.
 *
 * @param {Entry} a First entry
 * @param {Entry} b Second entry
 * @returns {number} 1 if a is latest, -1 if b is latest
 */
function LastWriteWins$2 (a, b) {
  // Ultimate conflict resolution (take the first/left arg)
  const First = (a, b) => a;
  // Sort two entries by their clock id, if the same always take the first
  const sortById = (a, b) => SortByClockId(a, b, First);
  // Sort two entries by their clock time, if concurrent,
  // determine sorting using provided conflict resolution function
  const sortByEntryClocks = (a, b) => SortByClocks(a, b, sortById);
  // Sort entries by clock time as the primary sort criteria
  return sortByEntryClocks(a, b)
}

/**
 * Sort two entries by their hash.
 *
 * @param {Entry} a First entry
 * @param {Entry} b Second entry
 * @returns {number} 1 if a is latest, -1 if b is latest
 */
function SortByEntryHash (a, b) {
  // Ultimate conflict resolution (compare hashes)
  const compareHash = (a, b) => a.hash < b.hash ? -1 : 1;
  // Sort two entries by their clock id, if the same then compare hashes
  const sortById = (a, b) => SortByClockId(a, b, compareHash);
  // Sort two entries by their clock time, if concurrent,
  // determine sorting using provided conflict resolution function
  const sortByEntryClocks = (a, b) => SortByClocks(a, b, sortById);
  // Sort entries by clock time as the primary sort criteria
  return sortByEntryClocks(a, b)
}

/**
 * Sort two entries by their clock time.
 * @param {Entry} a First entry to compare
 * @param {Entry} b Second entry to compare
 * @param {function(a, b)} resolveConflict A function to call if entries are concurrent (happened at the same time). The function should take in two entries and return 1 if the first entry should be chosen and -1 if the second entry should be chosen.
 * @returns {number} 1 if a is greater, -1 if b is greater
 */
function SortByClocks (a, b, resolveConflict) {
  // Compare the clocks
  const diff = Clock$1.compare(a.clock, b.clock);
  // If the clocks are concurrent, use the provided
  // conflict resolution function to determine which comes first
  return diff === 0 ? resolveConflict(a, b) : diff
}

/**
 * Sort two entries by their clock id.
 * @param {Entry} a First entry to compare
 * @param {Entry} b Second entry to compare
 * @param {function(a, b)} resolveConflict A function to call if the clocks ids are the same. The function should take in two entries and return 1 if the first entry should be chosen and -1 if the second entry should be chosen.
 * @returns {number} 1 if a is greater, -1 if b is greater
 */
function SortByClockId (a, b, resolveConflict) {
  // Sort by ID if clocks are concurrent,
  // take the entry with a "greater" clock id
  return a.clock.id === b.clock.id
    ? resolveConflict(a, b)
    : a.clock.id < b.clock.id ? -1 : 1
}

/**
 * A wrapper function to throw an error if the results of a passed function return zero
 * @param {function(a, b)} [tiebreaker] The tiebreaker function to validate.
 * @returns {function(a, b)} 1 if a is greater, -1 if b is greater
 * @throws {Error} if func ever returns 0
 */
function NoZeroes$2 (func) {
  const msg = `Your log's tiebreaker function, ${func.name}, has returned zero and therefore cannot be`;

  const comparator = (a, b) => {
    // Validate by calling the function
    const result = func(a, b);
    if (result === 0) { throw Error(msg) }
    return result
  };

  return comparator
}

logSorting.SortByClocks = SortByClocks;
logSorting.SortByClockId = SortByClockId;
logSorting.LastWriteWins = LastWriteWins$2;
logSorting.SortByEntryHash = SortByEntryHash;
logSorting.NoZeroes = NoZeroes$2;

const IPFSNotDefinedError = () => new Error('IPFS instance not defined');
const LogNotDefinedError = () => new Error('Log instance not defined');
const NotALogError = () => new Error('Given argument is not an instance of Log');
const CannotJoinWithDifferentId = () => new Error('Can\'t join logs with different IDs');
const LtOrLteMustBeStringOrArray = () => new Error('lt or lte must be a string or array of Entries');

var logErrors = {
  IPFSNotDefinedError: IPFSNotDefinedError,
  LogNotDefinedError: LogNotDefinedError,
  NotALogError: NotALogError,
  CannotJoinWithDifferentId: CannotJoinWithDifferentId,
  LtOrLteMustBeStringOrArray: LtOrLteMustBeStringOrArray
};

const Entry$1 = entry.exports;
const EntryIO = entryIo;
const Sorting$1 = logSorting;
const { LastWriteWins: LastWriteWins$1, NoZeroes: NoZeroes$1 } = Sorting$1;
const LogError$1 = logErrors;
const { isDefined: isDefined$1, findUniques: findUniques$1, difference, io } = utils;

const IPLD_LINKS = ['heads'];
const last = (arr, n) => arr.slice(arr.length - Math.min(arr.length, n), arr.length);

class LogIO$1 {
  //
  /**
   * Get the multihash of a Log.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Log} log Log to get a multihash for
   * @returns {Promise<string>}
   * @deprecated
   */
  static async toMultihash (ipfs, log, { format } = {}) {
    if (!isDefined$1(ipfs)) throw LogError$1.IPFSNotDefinedError()
    if (!isDefined$1(log)) throw LogError$1.LogNotDefinedError()
    if (!isDefined$1(format)) format = 'dag-cbor';
    if (log.values.length < 1) throw new Error('Can\'t serialize an empty log')

    return io.write(ipfs, format, log.toJSON(), { links: IPLD_LINKS })
  }

  /**
   * Create a log from a hashes.
   * @param {IPFS} ipfs An IPFS instance
   * @param {string} hash The hash of the log
   * @param {Object} options
   * @param {number} options.length How many items to include in the log
   * @param {Array<Entry>} options.exclude Entries to not fetch (cached)
   * @param {function(hash, entry, parent, depth)} options.onProgressCallback
   */
  static async fromMultihash (ipfs, hash,
    { length = -1, exclude = [], timeout, concurrency, sortFn, onProgressCallback }) {
    if (!isDefined$1(ipfs)) throw LogError$1.IPFSNotDefinedError()
    if (!isDefined$1(hash)) throw new Error(`Invalid hash: ${hash}`)

    const logData = await io.read(ipfs, hash, { links: IPLD_LINKS });

    if (!logData.heads || !logData.id) throw LogError$1.NotALogError()

    // Use user provided sorting function or the default one
    sortFn = sortFn || NoZeroes$1(LastWriteWins$1);
    const isHead = e => logData.heads.includes(e.hash);

    const all = await EntryIO.fetchAll(ipfs, logData.heads,
      { length, exclude, timeout, concurrency, onProgressCallback });

    const logId = logData.id;
    const entries = length > -1 ? last(all.sort(sortFn), length) : all;
    const heads = entries.filter(isHead);
    return { logId, entries, heads }
  }

  /**
   * Create a log from an entry hash.
   * @param {IPFS} ipfs An IPFS instance
   * @param {string} hash The hash of the entry
   * @param {Object} options
   * @param {number} options.length How many items to include in the log
   * @param {Array<Entry>} options.exclude Entries to not fetch (cached)
   * @param {function(hash, entry, parent, depth)} options.onProgressCallback
   */
  static async fromEntryHash (ipfs, hash,
    { length = -1, exclude = [], timeout, concurrency, sortFn, onProgressCallback }) {
    if (!isDefined$1(ipfs)) throw LogError$1.IpfsNotDefinedError()
    if (!isDefined$1(hash)) throw new Error("'hash' must be defined")
    // Convert input hash(s) to an array
    const hashes = Array.isArray(hash) ? hash : [hash];
    // Fetch given length, return size at least the given input entries
    length = length > -1 ? Math.max(length, 1) : length;
    const all = await EntryIO.fetchParallel(ipfs, hashes,
      { length, exclude, timeout, concurrency, onProgressCallback });
    // Cap the result at the right size by taking the last n entries,
    // or if given length is -1, then take all
    sortFn = sortFn || NoZeroes$1(LastWriteWins$1);
    const entries = length > -1 ? last(all.sort(sortFn), length) : all;
    return { entries }
  }

  /**
   * Creates a log data from a JSON object, to be passed to a Log constructor
   *
   * @param {IPFS} ipfs An IPFS instance
   * @param {json} json A json object containing valid log data
   * @param {Object} options
   * @param {number} options.length How many entries to include
   * @param {function(hash, entry, parent, depth)} options.onProgressCallback
   **/
  static async fromJSON (ipfs, json, { length = -1, timeout, concurrency, onProgressCallback }) {
    if (!isDefined$1(ipfs)) throw LogError$1.IPFSNotDefinedError()
    const { id, heads } = json;
    const headHashes = heads.map(e => e.hash);
    const all = await EntryIO.fetchParallel(ipfs, headHashes,
      { length, timeout, concurrency, onProgressCallback });
    const entries = all.sort(Entry$1.compare);
    return { logId: id, entries, heads }
  }

  /**
   * Create a new log starting from an entry.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Entry|Array<Entry>} sourceEntries An entry or an array of entries to fetch a log from
   * @param {Object} options
   * @param {number} options.length How many entries to include
   * @param {Array<Entry>} options.exclude Entries to not fetch (cached)
   * @param {function(hash, entry, parent, depth)} options.onProgressCallback
   */
  static async fromEntry (ipfs, sourceEntries,
    { length = -1, exclude = [], timeout, concurrency, onProgressCallback }) {
    if (!isDefined$1(ipfs)) throw LogError$1.IPFSNotDefinedError()
    if (!isDefined$1(sourceEntries)) throw new Error("'sourceEntries' must be defined")

    // Make sure we only have Entry objects as input
    if (!Array.isArray(sourceEntries) && !Entry$1.isEntry(sourceEntries)) {
      throw new Error('\'sourceEntries\' argument must be an array of Entry instances or a single Entry')
    }

    if (!Array.isArray(sourceEntries)) {
      sourceEntries = [sourceEntries];
    }

    // Fetch given length, return size at least the given input entries
    length = length > -1 ? Math.max(length, sourceEntries.length) : length;

    // Make sure we pass hashes instead of objects to the fetcher function
    const hashes = sourceEntries.map(e => e.hash);

    // Fetch the entries
    const all = await EntryIO.fetchParallel(ipfs, hashes,
      { length, exclude, timeout, concurrency, onProgressCallback });

    // Combine the fetches with the source entries and take only uniques
    const combined = sourceEntries.concat(all).concat(exclude);
    const uniques = findUniques$1(combined, 'hash').sort(Entry$1.compare);

    // Cap the result at the right size by taking the last n entries
    const sliced = uniques.slice(length > -1 ? -length : -uniques.length);

    // Make sure that the given input entries are present in the result
    // in order to not lose references
    const missingSourceEntries = difference(sliced, sourceEntries, 'hash');

    const replaceInFront = (a, withEntries) => {
      var sliced = a.slice(withEntries.length, a.length);
      return withEntries.concat(sliced)
    };

    // Add the input entries at the beginning of the array and remove
    // as many elements from the array before inserting the original entries
    const entries = replaceInFront(sliced, missingSourceEntries);
    const logId = entries[entries.length - 1].id;
    return { logId, entries }
  }
}

var logIo = LogIO$1;

class AccessController$1 {
  async canAppend (entry, identityProvider) {
    return true
  }
}

var defaultAccessController = AccessController$1;

class EntryIndex$1 {
  constructor (entries = {}) {
    this._cache = entries;
  }

  set (k, v) {
    this._cache[k] = v;
  }

  get (k) {
    return this._cache[k]
  }

  delete (k) {
    return delete this._cache[k]
  }

  add (newItems) {
    this._cache = Object.assign(this._cache, newItems);
  }

  get length () {
    return Object.values(this._cache).length
  }
}

var entryIndex = EntryIndex$1;

const pMap = require$$0;
const GSet = gSet;
const Entry = entry.exports;
const LogIO = logIo;
const LogError = logErrors;
const Clock = lamportClock;
const Sorting = logSorting;
const { LastWriteWins, NoZeroes } = Sorting;
const AccessController = defaultAccessController;
const { isDefined, findUniques } = utils;
const EntryIndex = entryIndex;
const randomId = () => new Date().getTime().toString();
const getHash = e => e.hash;
const flatMap = (res, acc) => res.concat(acc);
const getNextPointers = entry => entry.next;
const maxClockTimeReducer = (res, acc) => Math.max(res, acc.clock.time);
const uniqueEntriesReducer = (res, acc) => {
  res[acc.hash] = acc;
  return res
};

/**
 * Log.
 *
 * @description
 * Log implements a G-Set CRDT and adds ordering.
 *
 * From:
 * "A comprehensive study of Convergent and Commutative Replicated Data Types"
 * https://hal.inria.fr/inria-00555588
 */
class Log extends GSet {
  /**
   * Create a new Log instance
   * @param {IPFS} ipfs An IPFS instance
   * @param {Object} identity Identity (https://github.com/orbitdb/orbit-db-identity-provider/blob/master/src/identity.js)
   * @param {Object} options
   * @param {string} options.logId ID of the log
   * @param {Object} options.access AccessController (./default-access-controller)
   * @param {Array<Entry>} options.entries An Array of Entries from which to create the log
   * @param {Array<Entry>} options.heads Set the heads of the log
   * @param {Clock} options.clock Set the clock of the log
   * @param {Function} options.sortFn The sort function - by default LastWriteWins
   * @return {Log} The log instance
   */
  constructor (ipfs, identity, { logId, access, entries, heads, clock, sortFn, concurrency } = {}) {
    if (!isDefined(ipfs)) {
      throw LogError.IPFSNotDefinedError()
    }

    if (!isDefined(identity)) {
      throw new Error('Identity is required')
    }

    if (!isDefined(access)) {
      access = new AccessController();
    }

    if (isDefined(entries) && !Array.isArray(entries)) {
      throw new Error('\'entries\' argument must be an array of Entry instances')
    }

    if (isDefined(heads) && !Array.isArray(heads)) {
      throw new Error('\'heads\' argument must be an array')
    }

    if (!isDefined(sortFn)) {
      sortFn = LastWriteWins;
    }

    super();

    this._sortFn = NoZeroes(sortFn);

    this._storage = ipfs;
    this._id = logId || randomId();

    // Access Controller
    this._access = access;
    // Identity
    this._identity = identity;

    // Add entries to the internal cache
    const uniqueEntries = (entries || []).reduce(uniqueEntriesReducer, {});
    this._entryIndex = new EntryIndex(uniqueEntries);
    entries = Object.values(uniqueEntries) || [];

    // Set heads if not passed as an argument
    heads = heads || Log.findHeads(entries);
    this._headsIndex = heads.reduce(uniqueEntriesReducer, {});

    // Index of all next pointers in this log
    this._nextsIndex = {};
    const addToNextsIndex = e => e.next.forEach(a => (this._nextsIndex[a] = e.hash));
    entries.forEach(addToNextsIndex);

    // Set the length, we calculate the length manually internally
    this._length = entries.length;

    // Set the clock
    const maxTime = Math.max(clock ? clock.time : 0, this.heads.reduce(maxClockTimeReducer, 0));
    // Take the given key as the clock id is it's a Key instance,
    // otherwise if key was given, take whatever it is,
    // and if it was null, take the given id as the clock id
    this._clock = new Clock(this._identity.publicKey, maxTime);

    this.joinConcurrency = concurrency || 16;
  }

  /**
   * Returns the ID of the log.
   * @returns {string}
   */
  get id () {
    return this._id
  }

  /**
   * Returns the clock of the log.
   * @returns {string}
   */
  get clock () {
    return this._clock
  }

  /**
   * Returns the length of the log.
   * @return {number} Length
   */
  get length () {
    return this._length
  }

  /**
   * Returns the values in the log.
   * @returns {Array<Entry>}
   */
  get values () {
    return Object.values(this.traverse(this.heads)).reverse()
  }

  /**
   * Returns an array of heads as hashes.
   * @returns {Array<string>}
   */
  get heads () {
    return Object.values(this._headsIndex).sort(this._sortFn).reverse()
  }

  /**
   * Returns an array of Entry objects that reference entries which
   * are not in the log currently.
   * @returns {Array<Entry>}
   */
  get tails () {
    return Log.findTails(this.values)
  }

  /**
   * Returns an array of hashes that are referenced by entries which
   * are not in the log currently.
   * @returns {Array<string>} Array of hashes
   */
  get tailHashes () {
    return Log.findTailHashes(this.values)
  }

  /**
   * Set the identity for the log
   * @param {Identity} [identity] The identity to be set
   */
  setIdentity (identity) {
    this._identity = identity;
    // Find the latest clock from the heads
    const time = Math.max(this.clock.time, this.heads.reduce(maxClockTimeReducer, 0));
    this._clock = new Clock(this._identity.publicKey, time);
  }

  /**
   * Find an entry.
   * @param {string} [hash] The hashes of the entry
   * @returns {Entry|undefined}
   */
  get (hash) {
    return this._entryIndex.get(hash)
  }

  /**
   * Checks if a entry is part of the log
   * @param {string} hash The hash of the entry
   * @returns {boolean}
   */
  has (entry) {
    return this._entryIndex.get(entry.hash || entry) !== undefined
  }

  traverse (rootEntries, amount = -1, endHash) {
    // Sort the given given root entries and use as the starting stack
    let stack = rootEntries.sort(this._sortFn).reverse();

    // Cache for checking if we've processed an entry already
    let traversed = {};
    // End result
    const result = {};
    let count = 0;
    // Named function for getting an entry from the log
    const getEntry = e => this.get(e);

    // Add an entry to the stack and traversed nodes index
    const addToStack = entry => {
      // If we've already processed the entry, don't add it to the stack
      if (!entry || traversed[entry.hash]) {
        return
      }

      // Add the entry in front of the stack and sort
      stack = [entry, ...stack]
        .sort(this._sortFn)
        .reverse();
      // Add to the cache of processed entries
      traversed[entry.hash] = true;
    };

    const addEntry = rootEntry => {
      result[rootEntry.hash] = rootEntry;
      traversed[rootEntry.hash] = true;
      count++;
    };

    // Start traversal
    // Process stack until it's empty (traversed the full log)
    // or when we have the requested amount of entries
    // If requested entry amount is -1, traverse all
    while (stack.length > 0 && (count < amount || amount < 0)) { // eslint-disable-line no-unmodified-loop-condition
      // Get the next element from the stack
      const entry = stack.shift();
      // Add to the result
      addEntry(entry);
      // If it is the specified end hash, break out of the while loop
      if (endHash && endHash === entry.hash) break

      // Add entry's next references to the stack
      const entries = entry.next.map(getEntry);
      const defined = entries.filter(isDefined);
      defined.forEach(addToStack);
    }

    stack = [];
    traversed = {};
    // End result
    return result
  }

  /**
   * Append an entry to the log.
   * @param {Entry} entry Entry to add
   * @return {Log} New Log containing the appended value
   */
  async append (data, pointerCount = 1, pin = false) {
    // Update the clock (find the latest clock)
    const newTime = Math.max(this.clock.time, this.heads.reduce(maxClockTimeReducer, 0)) + 1;
    this._clock = new Clock(this.clock.id, newTime);

    const all = Object.values(this.traverse(this.heads, Math.max(pointerCount, this.heads.length)));

    // If pointer count is 4, returns 2
    // If pointer count is 8, returns 3 references
    // If pointer count is 512, returns 9 references
    // If pointer count is 2048, returns 11 references
    const getEveryPow2 = (maxDistance) => {
      const entries = new Set();
      for (let i = 1; i <= maxDistance; i *= 2) {
        const index = Math.min(i - 1, all.length - 1);
        entries.add(all[index]);
      }
      return entries
    };
    const references = getEveryPow2(Math.min(pointerCount, all.length));

    // Always include the last known reference
    if (all.length < pointerCount && all[all.length - 1]) {
      references.add(all[all.length - 1]);
    }

    // Create the next pointers from heads
    const nexts = Object.keys(this.heads.reverse().reduce(uniqueEntriesReducer, {}));
    const isNext = e => !nexts.includes(e);
    // Delete the heads from the refs
    const refs = Array.from(references).map(getHash).filter(isNext);

    // @TODO: Split Entry.create into creating object, checking permission, signing and then posting to IPFS
    // Create the entry and add it to the internal cache
    const entry = await Entry.create(
      this._storage,
      this._identity,
      this.id,
      data,
      nexts,
      this.clock,
      refs,
      pin
    );

    const canAppend = await this._access.canAppend(entry, this._identity.provider);
    if (!canAppend) {
      throw new Error(`Could not append entry, key "${this._identity.id}" is not allowed to write to the log`)
    }

    this._entryIndex.set(entry.hash, entry);
    nexts.forEach(e => (this._nextsIndex[e] = entry.hash));
    this._headsIndex = {};
    this._headsIndex[entry.hash] = entry;
    // Update the length
    this._length++;
    return entry
  }

  /*
   * Creates a javscript iterator over log entries
   *
   * @param {Object} options
   * @param {string|Array} options.gt Beginning hash of the iterator, non-inclusive
   * @param {string|Array} options.gte Beginning hash of the iterator, inclusive
   * @param {string|Array} options.lt Ending hash of the iterator, non-inclusive
   * @param {string|Array} options.lte Ending hash of the iterator, inclusive
   * @param {amount} options.amount Number of entried to return to / from the gte / lte hash
   * @returns {Symbol.Iterator} Iterator object containing log entries
   *
   * @examples
   *
   * (async () => {
   *   log1 = new Log(ipfs, testIdentity, { logId: 'X' })
   *
   *   for (let i = 0; i <= 100; i++) {
   *     await log1.append('entry' + i)
   *   }
   *
   *   let it = log1.iterator({
   *     lte: 'zdpuApFd5XAPkCTmSx7qWQmQzvtdJPtx2K5p9to6ytCS79bfk',
   *     amount: 10
   *   })
   *
   *   [...it].length // 10
   * })()
   *
   *
   */
  iterator ({ gt = undefined, gte = undefined, lt = undefined, lte = undefined, amount = -1 } =
  {}) {
    if (amount === 0) return (function * () {})()
    if (typeof lte === 'string') lte = [this.get(lte)];
    if (typeof lt === 'string') lt = [this.get(this.get(lt).next)];

    if (lte && !Array.isArray(lte)) throw LogError.LtOrLteMustBeStringOrArray()
    if (lt && !Array.isArray(lt)) throw LogError.LtOrLteMustBeStringOrArray()

    const start = (lte || (lt || this.heads)).filter(isDefined);
    const endHash = gte ? this.get(gte).hash : gt ? this.get(gt).hash : null;
    const count = endHash ? -1 : amount || -1;

    const entries = this.traverse(start, count, endHash);
    let entryValues = Object.values(entries);

    // Strip off last entry if gt is non-inclusive
    if (gt) entryValues.pop();

    // Deal with the amount argument working backwards from gt/gte
    if ((gt || gte) && amount > -1) {
      entryValues = entryValues.slice(entryValues.length - amount, entryValues.length);
    }

    return (function * () {
      for (const i in entryValues) {
        yield entryValues[i];
      }
    })()
  }

  /**
   * Join two logs.
   *
   * Joins another log into this one.
   *
   * @param {Log} log Log to join with this Log
   * @param {number} [size=-1] Max size of the joined log
   * @returns {Promise<Log>} This Log instance
   * @example
   * await log1.join(log2)
   */
  async join (log, size = -1) {
    if (!isDefined(log)) throw LogError.LogNotDefinedError()
    if (!Log.isLog(log)) throw LogError.NotALogError()
    if (this.id !== log.id) return

    // Get the difference of the logs
    const newItems = Log.difference(log, this);

    const identityProvider = this._identity.provider;
    // Verify if entries are allowed to be added to the log and throws if
    // there's an invalid entry
    const permitted = async (entry) => {
      const canAppend = await this._access.canAppend(entry, identityProvider);
      if (!canAppend) {
        throw new Error(`Could not append entry, key "${entry.identity.id}" is not allowed to write to the log`)
      }
    };

    // Verify signature for each entry and throws if there's an invalid signature
    const verify = async (entry) => {
      const isValid = await Entry.verify(identityProvider, entry);
      const publicKey = entry.identity ? entry.identity.publicKey : entry.key;
      if (!isValid) throw new Error(`Could not validate signature "${entry.sig}" for entry "${entry.hash}" and key "${publicKey}"`)
    };

    const entriesToJoin = Object.values(newItems);
    await pMap(entriesToJoin, async e => {
      await permitted(e);
      await verify(e);
    }, { concurrency: this.joinConcurrency });

    // Update the internal next pointers index
    const addToNextsIndex = e => {
      const entry = this.get(e.hash);
      if (!entry) this._length++; /* istanbul ignore else */
      e.next.forEach(a => (this._nextsIndex[a] = e.hash));
    };
    Object.values(newItems).forEach(addToNextsIndex);

    // Update the internal entry index
    this._entryIndex.add(newItems);

    // Merge the heads
    const notReferencedByNewItems = e => !nextsFromNewItems.find(a => a === e.hash);
    const notInCurrentNexts = e => !this._nextsIndex[e.hash];
    const nextsFromNewItems = Object.values(newItems).map(getNextPointers).reduce(flatMap, []);
    const mergedHeads = Log.findHeads(Object.values(Object.assign({}, this._headsIndex, log._headsIndex)))
      .filter(notReferencedByNewItems)
      .filter(notInCurrentNexts)
      .reduce(uniqueEntriesReducer, {});

    this._headsIndex = mergedHeads;

    // Slice to the requested size
    if (size > -1) {
      let tmp = this.values;
      tmp = tmp.slice(-size);
      this._entryIndex = null;
      this._entryIndex = new EntryIndex(tmp.reduce(uniqueEntriesReducer, {}));
      this._headsIndex = Log.findHeads(tmp).reduce(uniqueEntriesReducer, {});
      this._length = this._entryIndex.length;
    }

    // Find the latest clock from the heads
    const maxClock = Object.values(this._headsIndex).reduce(maxClockTimeReducer, 0);
    this._clock = new Clock(this.clock.id, Math.max(this.clock.time, maxClock));
    return this
  }

  /**
   * Get the log in JSON format.
   * @returns {Object} An object with the id and heads properties
   */
  toJSON () {
    return {
      id: this.id,
      heads: this.heads
        .sort(this._sortFn) // default sorting
        .reverse() // we want the latest as the first element
        .map(getHash) // return only the head hashes
    }
  }

  /**
   * Get the log in JSON format as a snapshot.
   * @returns {Object} An object with the id, heads and value properties
   */
  toSnapshot () {
    return {
      id: this.id,
      heads: this.heads,
      values: this.values
    }
  }

  /**
   * Get the log as a Buffer.
   * @returns {Buffer}
   */
  toBuffer () {
    return Buffer.from(JSON.stringify(this.toJSON()))
  }

  /**
   * Returns the log entries as a formatted string.
   * @returns {string}
   * @example
   * two
   * └─one
   *   └─three
   */
  toString (payloadMapper) {
    return this.values
      .slice()
      .reverse()
      .map((e, idx) => {
        const parents = Entry.findChildren(e, this.values);
        const len = parents.length;
        let padding = new Array(Math.max(len - 1, 0));
        padding = len > 1 ? padding.fill('  ') : padding;
        padding = len > 0 ? padding.concat(['└─']) : padding;
        /* istanbul ignore next */
        return padding.join('') + (payloadMapper ? payloadMapper(e.payload) : e.payload)
      })
      .join('\n')
  }

  /**
   * Check whether an object is a Log instance.
   * @param {Object} log An object to check
   * @returns {boolean}
   */
  static isLog (log) {
    return log.id !== undefined &&
      log.heads !== undefined &&
      log._entryIndex !== undefined
  }

  /**
   * Get the log's multihash.
   * @returns {Promise<string>} Multihash of the Log as Base58 encoded string.
   */
  toMultihash ({ format } = {}) {
    return LogIO.toMultihash(this._storage, this, { format })
  }

  /**
   * Create a log from a hashes.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Identity} identity The identity instance
   * @param {string} hash The log hash
   * @param {Object} options
   * @param {AccessController} options.access The access controller instance
   * @param {number} options.length How many items to include in the log
   * @param {Array<Entry>} options.exclude Entries to not fetch (cached)
   * @param {function(hash, entry, parent, depth)} options.onProgressCallback
   * @param {Function} options.sortFn The sort function - by default LastWriteWins
   * @returns {Promise<Log>}
   */
  static async fromMultihash (ipfs, identity, hash,
    { access, length = -1, exclude = [], timeout, concurrency, sortFn, onProgressCallback } = {}) {
    // TODO: need to verify the entries with 'key'
    const { logId, entries, heads } = await LogIO.fromMultihash(ipfs, hash,
      { length, exclude, timeout, onProgressCallback, concurrency, sortFn });
    return new Log(ipfs, identity, { logId, access, entries, heads, sortFn })
  }

  /**
   * Create a log from a single entry's hash.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Identity} identity The identity instance
   * @param {string} hash The entry's hash
   * @param {Object} options
   * @param {string} options.logId The ID of the log
   * @param {AccessController} options.access The access controller instance
   * @param {number} options.length How many entries to include in the log
   * @param {Array<Entry>} options.exclude Entries to not fetch (cached)
   * @param {function(hash, entry, parent, depth)} options.onProgressCallback
   * @param {Function} options.sortFn The sort function - by default LastWriteWins
   * @return {Promise<Log>} New Log
   */
  static async fromEntryHash (ipfs, identity, hash,
    { logId, access, length = -1, exclude = [], timeout, concurrency, sortFn, onProgressCallback } = {}) {
    // TODO: need to verify the entries with 'key'
    const { entries } = await LogIO.fromEntryHash(ipfs, hash,
      { length, exclude, timeout, concurrency, onProgressCallback });
    return new Log(ipfs, identity, { logId, access, entries, sortFn })
  }

  /**
   * Create a log from a Log Snapshot JSON.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Identity} identity The identity instance
   * @param {Object} json Log snapshot as JSON object
   * @param {Object} options
   * @param {AccessController} options.access The access controller instance
   * @param {number} options.length How many entries to include in the log
   * @param {function(hash, entry, parent, depth)} [options.onProgressCallback]
   * @param {Function} options.sortFn The sort function - by default LastWriteWins
   * @return {Promise<Log>} New Log
   */
  static async fromJSON (ipfs, identity, json,
    { access, length = -1, timeout, sortFn, onProgressCallback } = {}) {
    // TODO: need to verify the entries with 'key'
    const { logId, entries } = await LogIO.fromJSON(ipfs, json,
      { length, timeout, onProgressCallback });
    return new Log(ipfs, identity, { logId, access, entries, sortFn })
  }

  /**
   * Create a new log from an Entry instance.
   * @param {IPFS} ipfs An IPFS instance
   * @param {Identity} identity The identity instance
   * @param {Entry|Array<Entry>} sourceEntries An Entry or an array of entries to fetch a log from
   * @param {Object} options
   * @param {AccessController} options.access The access controller instance
   * @param {number} options.length How many entries to include. Default: infinite.
   * @param {Array<Entry>} options.exclude Entries to not fetch (cached)
   * @param {function(hash, entry, parent, depth)} [options.onProgressCallback]
   * @param {Function} options.sortFn The sort function - by default LastWriteWins
   * @return {Promise<Log>} New Log
   */
  static async fromEntry (ipfs, identity, sourceEntries,
    { access, length = -1, exclude = [], timeout, concurrency, sortFn, onProgressCallback } = {}) {
    // TODO: need to verify the entries with 'key'
    const { logId, entries } = await LogIO.fromEntry(ipfs, sourceEntries,
      { length, exclude, timeout, concurrency, onProgressCallback });
    return new Log(ipfs, identity, { logId, access, entries, sortFn })
  }

  /**
   * Find heads from a collection of entries.
   *
   * Finds entries that are the heads of this collection,
   * ie. entries that are not referenced by other entries.
   *
   * @param {Array<Entry>} entries Entries to search heads from
   * @returns {Array<Entry>}
   */
  static findHeads (entries) {
    var indexReducer = (res, entry, idx, arr) => {
      var addToResult = e => (res[e] = entry.hash);
      entry.next.forEach(addToResult);
      return res
    };

    var items = entries.reduce(indexReducer, {});

    var exists = e => items[e.hash] === undefined;
    var compareIds = (a, b) => a.clock.id > b.clock.id;

    return entries.filter(exists).sort(compareIds)
  }

  // Find entries that point to another entry that is not in the
  // input array
  static findTails (entries) {
    // Reverse index { next -> entry }
    var reverseIndex = {};
    // Null index containing entries that have no parents (nexts)
    var nullIndex = [];
    // Hashes for all entries for quick lookups
    var hashes = {};
    // Hashes of all next entries
    var nexts = [];

    var addToIndex = (e) => {
      if (e.next.length === 0) {
        nullIndex.push(e);
      }
      var addToReverseIndex = (a) => {
        /* istanbul ignore else */
        if (!reverseIndex[a]) reverseIndex[a] = [];
        reverseIndex[a].push(e);
      };

      // Add all entries and their parents to the reverse index
      e.next.forEach(addToReverseIndex);
      // Get all next references
      nexts = nexts.concat(e.next);
      // Get the hashes of input entries
      hashes[e.hash] = true;
    };

    // Create our indices
    entries.forEach(addToIndex);

    var addUniques = (res, entries, idx, arr) => res.concat(findUniques(entries, 'hash'));
    var exists = e => hashes[e] === undefined;
    var findFromReverseIndex = e => reverseIndex[e];

    // Drop hashes that are not in the input entries
    const tails = nexts // For every hash in nexts:
      .filter(exists) // Remove undefineds and nulls
      .map(findFromReverseIndex) // Get the Entry from the reverse index
      .reduce(addUniques, []) // Flatten the result and take only uniques
      .concat(nullIndex); // Combine with tails the have no next refs (ie. first-in-their-chain)

    return findUniques(tails, 'hash').sort(Entry.compare)
  }

  // Find the hashes to entries that are not in a collection
  // but referenced by other entries
  static findTailHashes (entries) {
    var hashes = {};
    var addToIndex = e => (hashes[e.hash] = true);
    var reduceTailHashes = (res, entry, idx, arr) => {
      var addToResult = (e) => {
        /* istanbul ignore else */
        if (hashes[e] === undefined) {
          res.splice(0, 0, e);
        }
      };
      entry.next.reverse().forEach(addToResult);
      return res
    };

    entries.forEach(addToIndex);
    return entries.reduce(reduceTailHashes, [])
  }

  static difference (a, b) {
    const stack = Object.keys(a._headsIndex);
    const traversed = {};
    const res = {};

    const pushToStack = hash => {
      if (!traversed[hash] && !b.get(hash)) {
        stack.push(hash);
        traversed[hash] = true;
      }
    };

    while (stack.length > 0) {
      const hash = stack.shift();
      const entry = a.get(hash);
      if (entry && !b.get(hash) && entry.id === b.id) {
        res[entry.hash] = entry;
        traversed[entry.hash] = true;
        entry.next.forEach(pushToStack);
      }
    }
    return res
  }
}

log.exports = Log;
var Sorting_1 = log.exports.Sorting = Sorting;
var Entry_1 = log.exports.Entry = Entry;
var AccessController_1 = log.exports.AccessController = AccessController;

var exports = log.exports;
export { AccessController_1 as AccessController, Entry_1 as Entry, Sorting_1 as Sorting, exports as default };
