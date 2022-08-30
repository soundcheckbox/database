import require$$0$l from 'ipfs-utils/src/files/url-source';
import require$$0$6 from '../../peer-id';
import require$$2$5 from '../../libp2p-crypto/dist/index.js';
import require$$0$3 from '../../is-ipfs';
import require$$1$7 from '../../multiaddr';
import require$$7 from '../../multibase/dist/index.js';
import require$$6$1 from '../../multicodec/dist/index.js';
import require$$1$3 from '../../multihashing-async/dist/index.js';
import require$$0$1 from '../../cids/dist/index.js';
import require$$2 from '../../interface-datastore';
import require$$1$1 from '../../err-code/dist/index.js';
import require$$0 from '../../ipfs-core-utils/dist/with-timeout-option.js';
import require$$0$2 from '../../merge-options';
import require$$1 from '../../ipfs-core-utils/dist/to-cid-and-path.js';
import require$$1$c from 'ipfs-utils/src/env';
import require$$2$4 from '../../debug';
import require$$0$9 from '../../ipld-dag-pb/0.20.0/dist/index.js';
import require$$3$3 from '../../ipfs-unixfs';
import require$$4$3 from '../../uint8arrays/dist/from-string.js';
import require$$0$4 from '../../hashlru';
import require$$1$2 from '../../p-queue/dist/index.js';
import require$$2$1 from 'ipfs-utils/src/http';
import require$$2$2 from 'ipfs-core-utils/src/cid';
import require$$0$5 from '../../it-last';
import require$$2$3 from '../../dag-cbor-links';
import require$$4$1 from 'it-first';
import require$$5 from 'it-all';
import require$$6 from 'cborg';
import require$$3 from 'ipfs-core-utils/src/pins/normalise-input';
import require$$4$2 from 'uint8arrays/to-string';
import require$$5$1 from 'uint8arrays/equals';
import require$$0$7 from 'ipns';
import require$$0$8 from 'datastore-core';
import require$$1$5 from 'dlv';
import require$$2$6 from 'datastore-pubsub';
import require$$1$4 from 'libp2p-record';
import require$$1$6 from 'parse-duration';
import require$$2$7 from 'it-drain';
import require$$4$4 from 'is-domain-name';
import require$$0$a from 'mafmt';
import require$$0$b from 'ipld-block';
import require$$2$8 from 'streaming-iterables';
import require$$3$1 from 'it-pipe';
import require$$0$c from 'ipfs-unixfs-importer';
import require$$1$8 from 'ipfs-core-utils/src/files/normalise-input/index';
import require$$0$d from 'ipfs-unixfs-exporter';
import require$$0$e from 'just-safe-set';
import require$$0$f from 'multiaddr-to-uri';
import require$$2$9 from 'array-shuffle';
import require$$3$2 from 'native-abort-controller';
import require$$0$g from 'mortice';
import require$$2$a from '../../ipfs-unixfs-importer/dist/dir-sharded.js';
import require$$3$4 from '../../ipfs-unixfs-importer/dist/options.js';
import require$$1$9 from 'hamt-sharding';
import require$$18 from '../../ipfs-unixfs-importer/dist/utils/persist.js';
import require$$3$5 from '../../it-map';
import require$$2$b from '../../uint8arrays/dist/concat.js';
import require$$0$h from '../../ipfs-repo';
import require$$35 from '../../ipfs-block-service';
import require$$3$6 from '../../ipld-dag-cbor';
import require$$4$5 from '../../ipld-raw';
import require$$1$a from '../../ipld';
import require$$0$i from '../../libp2p-gossipsub';
import require$$5$2 from '../../libp2p';
import require$$0$j from '../../libp2p-websockets';
import require$$1$b from '../../libp2p-webrtc-star';
import require$$2$c from '../../libp2p-mplex';
import require$$3$7 from '../../libp2p-noise';
import require$$4$6 from '../../libp2p-kad-dht';
import require$$7$1 from '../../libp2p-bootstrap';
import require$$0$k from '../../ipfs-bitswap';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var utils$6 = {};

const CID$m = require$$0$1;
const withTimeoutOption$1c = require$$0;
const toCidAndPath$1 = require$$1;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var resolve$3 = ({ ipld, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/dag').API["resolve"]}
   */
  async function resolve (ipfsPath, options = {}) {
    const {
      cid,
      path
    } = toCidAndPath$1(ipfsPath);

    if (options.preload !== false) {
      preload(cid);
    }

    if (path) {
      options.path = path;
    }

    let lastCid = cid;
    let lastRemainderPath = options.path || '';

    if (lastRemainderPath.startsWith('/')) {
      lastRemainderPath = lastRemainderPath.substring(1);
    }

    if (options.path) {
      try {
        for await (const { value, remainderPath } of ipld.resolve(cid, options.path, {
          signal: options.signal
        })) {
          if (!CID$m.isCID(value)) {
            break
          }

          lastRemainderPath = remainderPath;
          lastCid = value;
        }
      } catch (err) {
        // TODO: add error codes to IPLD
        if (err.message.startsWith('Object has no property')) {
          err.message = `no link named "${lastRemainderPath.split('/')[0]}" under ${lastCid}`;
          err.code = 'ERR_NO_LINK';
        }
        throw err
      }
    }

    return {
      cid: lastCid,
      remainderPath: lastRemainderPath || ''
    }
  }

  return withTimeoutOption$1c(resolve)
};

/* eslint-disable no-unreachable */

const isIpfs$2 = require$$0$3;
const CID$l = require$$0$1;
const Key$1 = require$$2.Key;
const errCode$r = require$$1$1;
const withTimeoutOption$1b = require$$0;
/** @type {typeof Object.assign} */
const mergeOptions$g = require$$0$2;
const resolve$2 = resolve$3;

/**
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

utils$6.mergeOptions = mergeOptions$g;

const ERR_BAD_PATH = 'ERR_BAD_PATH';

utils$6.OFFLINE_ERROR = 'This command must be run in online mode. Try running \'ipfs daemon\' first.';
utils$6.MFS_ROOT_KEY = new Key$1('/local/filesroot');
utils$6.MFS_MAX_CHUNK_SIZE = 262144;
utils$6.MFS_MAX_LINKS = 174;

/**
 * Returns a well-formed ipfs Path.
 * The returned path will always be prefixed with /ipfs/ or /ipns/.
 *
 * @param  {string | CID} pathStr - An ipfs-path, or ipns-path or a cid
 * @returns {string} - ipfs-path or ipns-path
 * @throws on an invalid @param pathStr
 */
const normalizePath$1 = (pathStr) => {
  if (isIpfs$2.cid(pathStr) || CID$l.isCID(pathStr)) {
    return `/ipfs/${new CID$l(pathStr)}`
  } else if (isIpfs$2.path(pathStr)) {
    return pathStr
  } else {
    throw errCode$r(new Error(`invalid path: ${pathStr}`), ERR_BAD_PATH)
  }
};

// TODO: do we need both normalizePath and normalizeCidPath?
// TODO: don't forget ipfs-core-utils/src/to-cid-and-path
/**
 * @param {Uint8Array|CID|string} path
 * @returns {string}
 */
const normalizeCidPath$3 = (path) => {
  if (path instanceof Uint8Array) {
    return new CID$l(path).toString()
  }
  if (CID$l.isCID(path)) {
    return path.toString()
  }
  if (path.indexOf('/ipfs/') === 0) {
    path = path.substring('/ipfs/'.length);
  }
  if (path.charAt(path.length - 1) === '/') {
    path = path.substring(0, path.length - 1);
  }
  return path
};

/**
 * Resolve various styles of an ipfs-path to the hash of the target node.
 * Follows links in the path.
 *
 * Accepts formats:
 * - <base58 string>
 * - <base58 string>/link/to/venus
 * - /ipfs/<base58 string>/link/to/pluto
 * - multihash Buffer
 *
 * @param {import('ipld')} ipld
 * @param {CID | string} ipfsPath - A CID or IPFS path
 * @param {Object} [options] - Optional options passed directly to dag.resolve
 * @returns {Promise<CID>}
 */
const resolvePath$4 = async function (ipld, ipfsPath, options = {}) {
  const preload = () => {};
  preload.stop = () => {};
  preload.start = () => {};

  const { cid } = await resolve$2({ ipld, preload })(ipfsPath, { preload: false });

  return cid
};

/**
 * @typedef {import('ipfs-unixfs-exporter').UnixFSEntry} UnixFSEntry
 *
 * @param {UnixFSEntry} file
 * @param {Object} [options]
 * @param {boolean} [options.includeContent]
 */
const mapFile$2 = (file, options = {}) => {
  if (file.type !== 'file' && file.type !== 'directory' && file.type !== 'raw') {
    // file.type === object | identity not supported yet
    throw new Error(`Unknown node type '${file.type}'`)
  }

  /** @type {import('ipfs-core-types/src/root').IPFSEntry} */
  const output = {
    cid: file.cid,
    path: file.path,
    name: file.name,
    depth: file.path.split('/').length,
    size: file.size,
    type: 'file'
  };

  if (file.type === 'directory') {
    // @ts-ignore - TS type can't be changed from File to Directory
    output.type = 'dir';
  }

  if (file.type === 'file') {
    output.size = file.unixfs.fileSize();
  }

  if (file.type === 'file' || file.type === 'directory') {
    output.mode = file.unixfs.mode;

    if (file.unixfs.mtime !== undefined) {
      output.mtime = file.unixfs.mtime;
    }
  }

  if (options.includeContent) {
    if (file.type === 'file' || file.type === 'raw') {
      // @ts-expect-error - content is readonly
      output.content = file.content();
    }
  }

  return output
};

const withTimeout$1 = withTimeoutOption$1b(
  /**
   * @template T
   * @param {Promise<T>|T} promise
   * @param {AbortOptions} [_options]
   * @returns {Promise<T>}
   */
  async (promise, _options) => await promise
);

utils$6.normalizePath = normalizePath$1;
utils$6.normalizeCidPath = normalizeCidPath$3;
utils$6.resolvePath = resolvePath$4;
utils$6.mapFile = mapFile$2;
utils$6.withTimeoutOption = withTimeoutOption$1b;
utils$6.withTimeout = withTimeout$1;

var initAssetsNodejs = () => {};

var errors = {};

class NotInitializedError$1 extends Error {
  constructor (message = 'not initialized') {
    super(message);
    this.name = 'NotInitializedError';
    this.code = NotInitializedError$1.code;
  }
}

NotInitializedError$1.code = 'ERR_NOT_INITIALIZED';
errors.NotInitializedError = NotInitializedError$1;

class AlreadyInitializingError extends Error {
  constructor (message = 'cannot initialize an initializing node') {
    super(message);
    this.name = 'AlreadyInitializingError';
    this.code = AlreadyInitializedError$2.code;
  }
}

AlreadyInitializingError.code = 'ERR_ALREADY_INITIALIZING';
errors.AlreadyInitializingError = AlreadyInitializingError;

class AlreadyInitializedError$2 extends Error {
  constructor (message = 'cannot re-initialize an initialized node') {
    super(message);
    this.name = 'AlreadyInitializedError';
    this.code = AlreadyInitializedError$2.code;
  }
}

AlreadyInitializedError$2.code = 'ERR_ALREADY_INITIALIZED';
errors.AlreadyInitializedError = AlreadyInitializedError$2;

class NotStartedError$2 extends Error {
  constructor (message = 'not started') {
    super(message);
    this.name = 'NotStartedError';
    this.code = NotStartedError$2.code;
  }
}

NotStartedError$2.code = 'ERR_NOT_STARTED';
errors.NotStartedError = NotStartedError$2;

class AlreadyStartingError$1 extends Error {
  constructor (message = 'cannot start, already startin') {
    super(message);
    this.name = 'AlreadyStartingError';
    this.code = AlreadyStartingError$1.code;
  }
}

AlreadyStartingError$1.code = 'ERR_ALREADY_STARTING';
errors.AlreadyStartingError = AlreadyStartingError$1;

class AlreadyStartedError$1 extends Error {
  constructor (message = 'cannot start, already started') {
    super(message);
    this.name = 'AlreadyStartedError';
    this.code = AlreadyStartedError$1.code;
  }
}

AlreadyStartedError$1.code = 'ERR_ALREADY_STARTED';
errors.AlreadyStartedError = AlreadyStartedError$1;

class NotEnabledError$3 extends Error {
  constructor (message = 'not enabled') {
    super(message);
    this.name = 'NotEnabledError';
    this.code = NotEnabledError$3.code;
  }
}

NotEnabledError$3.code = 'ERR_NOT_ENABLED';
errors.NotEnabledError = NotEnabledError$3;

const { NotStartedError: NotStartedError$1, AlreadyStartingError, AlreadyStartedError } = errors;
const { withTimeout } = utils$6;

/**
 * @template T
 * @typedef {import('ipfs-core-types/src/utils').Await<T>} Await
 */
/**
 * @template {(options:any) => any} T
 * @typedef {Parameters<T>[0]} Options
 */
/**
 * @template {(options:any) => any} T
 * @typedef {ReturnType<T> extends ? Promise<infer U> ? U : ReturnType<T>} State
 */
/**
 * Represents service state which can be not started in which case
 * it is instance of `Error`. Pending in which case it's promise or
 * ready in which case it is the value itself.
 *
 * @template T
 * @typedef {{ status: 'stopped' }
 * | { status: 'starting', ready: Await<T> }
 * | { status: 'started', value: T }
 * | { status: 'stopping', ready: Await<void> }
 * } ServiceState
 */

/**
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

/**
 * @template Options, T
 *
 * Allows you to create a handle to service that can be started or
 * stopped. It enables defining components that need to use service
 * functionality before service is started.
 *
 */
class Service$3 {
  /**
   * Takes `activation` function that takes `options` and (async) returns
   * an implementation.
   *
   * @template {(options:any) => Await<any>} T
   *
   * @param {Object} config
   * @param {T} config.start
   * @param {(state:State<T>) => Await<void>} [config.stop]
   * @returns {Service<Parameters<T>[0], State<T>>}
   */
  static create ({ start, stop }) {
    return new Service$3(start, stop)
  }

  /**
   * Starts the service (by running actiavtion function). Will (async) throw
   * unless service is stopped.
   *
   * @template Options, T
   * @param {Service<Options, T>} service
   * @param {Options} options
   * @returns {Promise<T>}
   */
  static async start (service, options) {
    const { state, activate } = service;
    switch (state.status) {
      // If service is in 'stopped' state we activate and transition to
      // to 'pending' state. Once activation is complete transition state to
      // 'started' state.
      // Note: This is the only code that does state transitions from
      // - stopped
      // - started
      // Which ensures no race conditions can occur.
      case 'stopped': {
        try {
          const promise = activate(options);
          service.state = { status: 'starting', ready: promise };
          // Note: MUST await after state transition above otherwise race
          // condition may occur.
          const result = await promise;
          service.state = { status: 'started', value: result };
          return result
        // If failed to start, transiton from 'starting' to 'stopped'
        // state.
        } catch (error) {
          service.state = { status: 'stopped' };
          throw error
        }
      }
      case 'starting': {
        throw new AlreadyStartingError()
      }
      case 'started': {
        throw new AlreadyStartedError()
      }
      // If service is stopping we just wait for that to complete
      // and try again.
      case 'stopping': {
        await state.ready;
        return await Service$3.start(service, options)
      }
      default: {
        return Service$3.panic(service)
      }
    }
  }

  /**
   * Stops the service by executing deactivation. If service is stopped
   * or is stopping this is noop. If service is starting up when called
   * it will await for start to complete and then retry stop afterwards.
   * This may (async) throw if `deactivate` does.
   *
   * @template T
   * @param {Service<any, T>} service
   * @returns {Promise<void>}
   */
  static async stop (service) {
    const { state, deactivate } = service;
    switch (state.status) {
      // If stopped there's nothing to do.
      case 'stopped': {
        break
      }
      // If service is starting we await for it to complete
      // and try again. That way
      case 'starting': {
        // We do not want to error stop if start failed.
        try { await state.ready; } catch (_) {}
        return await Service$3.stop(service)
      }
      // if service is stopping we just await for it to complete.
      case 'stopping': {
        return await state.ready
      }
      case 'started': {
        if (deactivate) {
          await deactivate(state.value);
        }
        service.state = { status: 'stopped' };
        break
      }
      default: {
        Service$3.panic(state);
      }
    }
  }

  /**
   * @template T
   * @param {Service<any, T>} service
   * @returns {T|null}
   */
  static try ({ state }) {
    switch (state.status) {
      case 'started':
        return state.value
      default:
        return null
    }
  }

  /**
   * Unwraps state and returns underlying value. If state is in idle state it
   * will throw an error. If state is pending it will wait and return the
   * result or throw on failure. If state is ready returns result.
   *
   * @template T
   * @param {Service<any, T>} service
   * @param {AbortOptions} [options]
   * @returns {Promise<T>}
   */
  static async use ({ state }, options) {
    switch (state.status) {
      case 'started':
        return state.value
      case 'starting':
        return await withTimeout(state.ready, options)
      default:
        throw new NotStartedError$1()
    }
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @private
   * @param {Service<any, any>} service
   * @returns {never}
   */
  static panic ({ state }) {
    const status = JSON.stringify({ status: state.status });
    throw RangeError(`Service in invalid state ${status}, should never happen if you see this please report a bug`)
  }

  /**
   * Takes `activation` function that takes `options` and (async) returns
   * an implementation.
   *
   * @private
   * @param {(options:Options) => Await<T>} activate
   * @param {(state:T) => Await<void>} [deactivate]
   */
  constructor (activate, deactivate) {
    this.activate = activate;
    this.deactivate = deactivate;

    /**
     * A state machine for this service.
     *
     * @private
     * @type {ServiceState<T>}
     */
    this.state = { status: 'stopped' };
  }

  /**
   * Allows you to asynchronously obtain service implementation. If service
   * is starting it will await for completion. If service is stopped or stopping
   * this will (async) throw exception. This allows components that need to use
   * this service convenient API to do it.
   *
   * @param {AbortOptions} [options] - Abort options.
   * @returns {Promise<T>}
   */
  async use (options) {
    return await Service$3.use(this, options)
  }

  /**
   * @returns {T|null}
   */
  try () {
    return Service$3.try(this)
  }
}
var service = Service$3;

const Service$2 = service;

/**
 * @param {Object} config
 * @param {import('../types').NetworkService} config.network
 * @param {import('peer-id')} config.peerId
 * @param {import('ipfs-repo')} config.repo
 * @param {import('ipfs-block-service')} config.blockService
 * @param {import('../types').Print} config.print
 * @param {import('../types').Preload} config.preload
 * @param {import('../types').MfsPreload} config.mfsPreload
 * @param {import('./ipns')} config.ipns
 * @param {import('libp2p/src/keychain')} config.keychain
 * @param {import('../types').Options} config.options
 */
var start = ({ network, preload, peerId, keychain, repo, ipns, blockService, mfsPreload, print, options }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["start"]}
   */
  const start = async () => {
    const { bitswap, libp2p } = await Service$2.start(network, {
      peerId,
      repo,
      print,
      options
    });

    blockService.setExchange(bitswap);

    await Promise.all([
      ipns.startOnline({ keychain, libp2p, peerId, repo }),
      preload.start(),
      mfsPreload.start()
    ]);
  };

  return start
};

const Service$1 = service;

/**
 * @param {Object} config
 * @param {import('../types').NetworkService} config.network
 * @param {import('../types').Preload} config.preload
 * @param {import('ipfs-block-service')} config.blockService
 * @param {import('./ipns')} config.ipns
 * @param {import('ipfs-repo')} config.repo
 * @param {import('../types').MfsPreload} config.mfsPreload
 */
var stop = ({ network, preload, blockService, ipns, repo, mfsPreload }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["stop"]}
   */
  const stop = async () => {
    blockService.unsetExchange();
    await Promise.all([
      preload.stop(),
      ipns.stop(),
      mfsPreload.stop(),
      Service$1.stop(network),
      repo.close()
    ]);
  };

  return stop
};

/** @type {typeof import('hashlru').default} */
// @ts-ignore - hashlru has incorrect typedefs
const hashlru$1 = require$$0$4;

/**
 * Time Aware Least Recent Used Cache
 *
 * @see https://arxiv.org/pdf/1801.00390
 * @todo move this to ipfs-utils or it's own package
 *
 * @template T
 * @class TLRU
 */
class TLRU$2 {
  /**
   * Creates an instance of TLRU.
   *
   * @param {number} maxSize
   */
  constructor (maxSize) {
    this.lru = hashlru$1(maxSize);
  }

  /**
   * Get the value from the a key
   *
   * @param {string} key
   * @returns {T|undefined}
   * @memberof TLoRU
   */
  get (key) {
    const value = this.lru.get(key);
    if (value) {
      if ((value.expire) && (value.expire < Date.now())) {
        this.lru.remove(key);
        return undefined
      }
      return value.value
    }
    return undefined
  }

  /**
   * Set a key value pair
   *
   * @param {string} key
   * @param {T} value
   * @param {number} ttl - in miliseconds
   * @returns {void}
   */
  set (key, value, ttl) {
    this.lru.set(key, { value, expire: Date.now() + ttl });
  }

  /**
   * Find if the cache has the key
   *
   * @param {string} key
   * @returns {boolean}
   */
  has (key) {
    const value = this.get(key);
    if (value) {
      return true
    }
    return false
  }

  /**
   * Remove key
   *
   * @param {string} key
   */
  remove (key) {
    this.lru.remove(key);
  }

  /**
   * Clears the cache
   *
   * @memberof TLRU
   */
  clear () {
    this.lru.clear();
  }
}

var tlru = TLRU$2;

/* eslint-env browser */

const TLRU$1 = tlru;
const { default: PQueue$1 } = require$$1$2;
const HTTP$1 = require$$2$1;

// Avoid sending multiple queries for the same hostname by caching results
const cache = new TLRU$1(1000);
// TODO: /api/v0/dns does not return TTL yet: https://github.com/ipfs/go-ipfs/issues/5884
// However we know browsers themselves cache DNS records for at least 1 minute,
// which acts a provisional default ttl: https://stackoverflow.com/a/36917902/11518426
const ttl = 60 * 1000;

// browsers limit concurrent connections per host,
// we don't want preload calls to exhaust the limit (~6)
const httpQueue$1 = new PQueue$1({ concurrency: 4 });

/**
 * @param {{ Path: string, Message: string }} response
 */
const ipfsPath = (response) => {
  if (response.Path) return response.Path
  throw new Error(response.Message)
};

/**
 * @param {string} fqdn
 * @param {object} opts
 */
var dnsNodejs = async (fqdn, opts) => { // eslint-disable-line require-await
  /**
   * @param {string} fqdn
   * @param {object} opts
   * @param {boolean} [opts.nocache]
   */
  const resolveDnslink = async (fqdn, opts = {}) => {
    // @ts-ignore - URLSearchParams does not take boolean options, only strings
    const searchParams = new URLSearchParams(opts);
    searchParams.set('arg', fqdn);

    // try cache first
    const query = searchParams.toString();
    if (!opts.nocache && cache.has(query)) {
      const response = cache.get(query);
      return ipfsPath(response)
    }

    // fallback to delegated DNS resolver
    const response = await httpQueue$1.add(async () => {
      // Delegated HTTP resolver sending DNSLink queries to ipfs.io
      // TODO: replace hardcoded host with configurable DNS over HTTPS: https://github.com/ipfs/js-ipfs/issues/2212
      const res = await HTTP$1.get('https://ipfs.io/api/v0/dns', { searchParams });
      const query = new URL(res.url).search.slice(1);
      const json = await res.json();
      cache.set(query, json, ttl);

      return json
    });
    return ipfsPath(response)
  };

  return resolveDnslink(fqdn, opts)
};

// dns-nodejs gets replaced by dns-browser when bundled
const dns = dnsNodejs;
const withTimeoutOption$1a = require$$0;

/**
 * @param {string} domain
 * @returns {string}
 */
function fqdnFixups (domain) {
  // Allow resolution of .eth names via .eth.link
  // More context at the go-ipfs counterpart: https://github.com/ipfs/go-ipfs/pull/6448
  if (domain.endsWith('.eth')) {
    domain = domain.replace(/.eth$/, '.eth.link');
  }
  return domain
}

var dns_1 = () => {
  /**
   * @type {import('ipfs-core-types/src/root').API["dns"]}
   */
  const resolveDNS = async (domain, options = { recursive: true }) => { // eslint-disable-line require-await
    if (typeof domain !== 'string') {
      throw new Error('Invalid arguments, domain must be a string')
    }

    domain = fqdnFixups(domain);

    return dns(domain, options)
  };

  return withTimeoutOption$1a(resolveDNS)
};

/**
 * @param {Object} config
 * @param {import('../types').NetworkService} config.network
 */
var isOnline = ({ network }) =>
  /**
   * @returns {boolean}
   */
  () => {
    const net = network.try();
    return net != null && Boolean(net.libp2p.isStarted())
  };

const isIpfs$1 = require$$0$3;
const CID$k = require$$0$1;
const { cidToString: cidToString$1 } = require$$2$2;
const withTimeoutOption$19 = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('ipfs-core-types/src/name').API} config.name - An IPFS core interface name API
 */
var resolve$1 = ({ ipld, name }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["resolve"]}
   */
  async function resolve (path, opts = {}) {
    if (!isIpfs$1.path(path)) {
      throw new Error('invalid argument ' + path)
    }

    if (isIpfs$1.ipnsPath(path)) {
      if (!name) {
        throw new Error('failed to resolve IPNS path: name API unavailable')
      }

      for await (const resolvedPath of name.resolve(path, opts)) {
        path = resolvedPath;
      }
    }

    const [, , hash, ...rest] = path.split('/'); // ['', 'ipfs', 'hash', ...path]
    const cid = new CID$k(hash);

    // nothing to resolve return the input
    if (rest.length === 0) {
      return `/ipfs/${cidToString$1(cid, { base: opts.cidBase })}`
    }

    path = rest.join('/');

    const results = ipld.resolve(cid, path);
    let value = cid;
    let remainderPath = path;

    for await (const result of results) {
      if (CID$k.isCID(result.value)) {
        value = result.value;
        remainderPath = result.remainderPath;
      }
    }

    return `/ipfs/${cidToString$1(value, { base: opts.cidBase })}${remainderPath ? '/' + remainderPath : ''}`
  }

  return withTimeoutOption$19(resolve)
};

const last$7 = require$$0$5;
const CID$j = require$$0$1;

/**
 * @param {Object} config
 * @param {ReturnType<typeof import('./add-all')>} config.addAll
 */
var add$2 = ({ addAll }) =>
  /**
   * @type {import('ipfs-core-types/src/pin').API["add"]}
   */
  (path, options = {}) => {
    let iter;

    if (CID$j.isCID(path)) {
      iter = addAll([{
        cid: path,
        ...options
      }], options);
    } else {
      iter = addAll([{
        path: path.toString(),
        ...options
      }], options);
    }

    // @ts-ignore return value of last can be undefined
    return last$7(iter)
  };

/* eslint max-nested-callbacks: ["error", 8] */

const CID$i = require$$0$1;
const errCode$q = require$$1$1;
// @ts-ignore - no types
const dagCborLinks = require$$2$3;
const debug$7 = require$$2$4;
const first$1 = require$$4$1;
const all = require$$5;
const cborg = require$$6;
const multibase$2 = require$$7;
const multicodec$5 = require$$6$1;
const { Key } = require$$2;

/**
 * @typedef {object} Pin
 * @property {number} depth
 * @property {CID.CIDVersion} [version]
 * @property {multicodec.CodecCode} [codec]
 * @property {Record<string, any>} [metadata]
 */

/**
 * @typedef {import('ipfs-core-types/src/pin').PinType} PinType
 * @typedef {import('ipfs-core-types/src/pin').PinQueryType} PinQueryType
 */

/**
 * @typedef {Object} PinOptions
 * @property {any} [metadata]
 *
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

// arbitrary limit to the number of concurrent dag operations
// const WALK_DAG_CONCURRENCY_LIMIT = 300
// const IS_PINNED_WITH_TYPE_CONCURRENCY_LIMIT = 300
// const PIN_DS_KEY = new Key('/local/pins')

/**
 * @param {string} type
 */
function invalidPinTypeErr (type) {
  const errMsg = `Invalid type '${type}', must be one of {direct, indirect, recursive, all}`;
  return errCode$q(new Error(errMsg), 'ERR_INVALID_PIN_TYPE')
}

const encoder = multibase$2.encoding('base32upper');

/**
 * @param {CID} cid
 */
function cidToKey (cid) {
  return new Key(`/${encoder.encode(cid.multihash)}`)
}

/**
 * @param {Key | string} key
 */
function keyToMultihash (key) {
  return encoder.decode(key.toString().slice(1))
}

const PinTypes$4 = {
  /** @type {'direct'} */
  direct: ('direct'),
  /** @type {'recursive'} */
  recursive: ('recursive'),
  /** @type {'indirect'} */
  indirect: ('indirect'),
  /** @type {'all'} */
  all: ('all')
};

class PinManager$2 {
  /**
   * @param {Object} config
   * @param {import('ipfs-repo')} config.repo
   * @param {import('ipld')} config.ipld
   */
  constructor ({ repo, ipld }) {
    this.repo = repo;
    this.ipld = ipld;
    this.log = debug$7('ipfs:pin');
    this.directPins = new Set();
    this.recursivePins = new Set();
  }

  /**
   * @private
   * @param {CID} cid
   * @param {AbortOptions} [options]
   * @returns {AsyncGenerator<CID, void, undefined>}
   */
  async * _walkDag (cid, options) {
    const node = await this.ipld.get(cid, options);

    if (cid.codec === 'dag-pb') {
      for (const link of node.Links) {
        yield link.Hash;
        yield * this._walkDag(link.Hash, options);
      }
    } else if (cid.codec === 'dag-cbor') {
      for (const [, childCid] of dagCborLinks(node)) {
        yield childCid;
        yield * this._walkDag(childCid, options);
      }
    }
  }

  /**
   * @param {CID} cid
   * @param {PinOptions & AbortOptions} [options]
   * @returns {Promise<void>}
   */
  async pinDirectly (cid, options = {}) {
    await this.ipld.get(cid, options);

    /** @type {Pin} */
    const pin = {
      depth: 0
    };

    if (cid.version !== 0) {
      pin.version = cid.version;
    }

    if (cid.codec !== 'dag-pb') {
      pin.codec = multicodec$5.getNumber(cid.codec);
    }

    if (options.metadata) {
      pin.metadata = options.metadata;
    }

    return this.repo.pins.put(cidToKey(cid), cborg.encode(pin))
  }

  /**
   * @param {CID} cid
   * @param {AbortOptions} [options]
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line require-await
  async unpin (cid, options) {
    return this.repo.pins.delete(cidToKey(cid))
  }

  /**
   * @param {CID} cid
   * @param {PinOptions & AbortOptions} [options]
   * @returns {Promise<void>}
   */
  async pinRecursively (cid, options = {}) {
    await this.fetchCompleteDag(cid, options);

    /** @type {Pin} */
    const pin = {
      depth: Infinity
    };

    if (cid.version !== 0) {
      pin.version = cid.version;
    }

    if (cid.codec !== 'dag-pb') {
      pin.codec = multicodec$5.getNumber(cid.codec);
    }

    if (options.metadata) {
      pin.metadata = options.metadata;
    }

    await this.repo.pins.put(cidToKey(cid), cborg.encode(pin));
  }

  /**
   * @param {AbortOptions} [options]
   */
  async * directKeys (options) {
    for await (const entry of this.repo.pins.query({
      filters: [(entry) => {
        const pin = cborg.decode(entry.value);

        return pin.depth === 0
      }]
    })) {
      const pin = cborg.decode(entry.value);
      const version = pin.version || 0;
      const codec = pin.codec ? multicodec$5.getName(pin.codec) : 'dag-pb';
      const multihash = keyToMultihash(entry.key);

      yield {
        cid: new CID$i(version, codec, multihash),
        metadata: pin.metadata
      };
    }
  }

  /**
   * @param {AbortOptions} [options]
   */
  async * recursiveKeys (options) {
    for await (const entry of this.repo.pins.query({
      filters: [(entry) => {
        const pin = cborg.decode(entry.value);

        return pin.depth === Infinity
      }]
    })) {
      const pin = cborg.decode(entry.value);
      const version = pin.version || 0;
      const codec = pin.codec ? multicodec$5.getName(pin.codec) : 'dag-pb';
      const multihash = keyToMultihash(entry.key);

      yield {
        cid: new CID$i(version, codec, multihash),
        metadata: pin.metadata
      };
    }
  }

  /**
   * @param {AbortOptions} [options]
   */
  async * indirectKeys (options) {
    for await (const { cid } of this.recursiveKeys()) {
      for await (const childCid of this._walkDag(cid, options)) {
        // recursive pins override indirect pins
        const types = [
          PinTypes$4.recursive
        ];

        const result = await this.isPinnedWithType(childCid, types);

        if (result.pinned) {
          continue
        }

        yield childCid;
      }
    }
  }

  /**
   * @param {CID} cid
   * @param {PinQueryType|PinQueryType[]} types
   * @param {AbortOptions} [options]
   */
  async isPinnedWithType (cid, types, options) {
    if (!Array.isArray(types)) {
      types = [types];
    }

    const all = types.includes(PinTypes$4.all);
    const direct = types.includes(PinTypes$4.direct);
    const recursive = types.includes(PinTypes$4.recursive);
    const indirect = types.includes(PinTypes$4.indirect);

    if (recursive || direct || all) {
      const result = await first$1(this.repo.pins.query({
        prefix: cidToKey(cid).toString(),
        filters: [entry => {
          if (all) {
            return true
          }

          const pin = cborg.decode(entry.value);

          return types.includes(pin.depth === 0 ? PinTypes$4.direct : PinTypes$4.recursive)
        }],
        limit: 1
      }));

      if (result) {
        const pin = cborg.decode(result.value);

        return {
          cid,
          pinned: true,
          reason: pin.depth === 0 ? PinTypes$4.direct : PinTypes$4.recursive,
          metadata: pin.metadata
        }
      }
    }

    const self = this;

    /**
     * @param {CID} key
     * @param {AsyncIterable<{ cid: CID, metadata: any }>} source
     */
    async function * findChild (key, source) {
      for await (const { cid: parentCid } of source) {
        for await (const childCid of self._walkDag(parentCid)) {
          if (childCid.equals(key)) {
            yield parentCid;
            return
          }
        }
      }
    }

    if (all || indirect) {
      // indirect (default)
      // check each recursive key to see if multihash is under it

      const parentCid = await first$1(findChild(cid, this.recursiveKeys()));

      if (parentCid) {
        return {
          cid,
          pinned: true,
          reason: PinTypes$4.indirect,
          parent: parentCid
        }
      }
    }

    return {
      cid,
      pinned: false
    }
  }

  /**
   * @param {CID} cid
   * @param {AbortOptions} options
   */
  async fetchCompleteDag (cid, options) {
    await all(this._walkDag(cid, options));
  }

  /**
   * Throws an error if the pin type is invalid
   *
   * @param {any} type
   * @returns {type is PinType}
   */
  static checkPinType (type) {
    if (typeof type !== 'string' || !Object.keys(PinTypes$4).includes(type)) {
      throw invalidPinTypeErr(type)
    }
    return true
  }
}

PinManager$2.PinTypes = PinTypes$4;

var pinManager = PinManager$2;

/* eslint max-nested-callbacks: ["error", 8] */

const { resolvePath: resolvePath$3 } = utils$6;
const PinManager$1 = pinManager;
const { PinTypes: PinTypes$3 } = PinManager$1;
const withTimeoutOption$18 = require$$0;
const normaliseInput$2 = require$$3;

/**
 * @typedef {import('ipfs-core-utils/src/pins/normalise-input').Source} Source
 * @typedef {import('ipfs-core-utils/src/pins/normalise-input').Pin} PinTarget
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 * @typedef {import('cids')} CID
 */

/**
 * @template T
 * @typedef {Iterable<T>|AsyncIterable<T>} AwaitIterable
 */

/**
 * @param {Object} config
 * @param {import('../gc-lock').GCLock} config.gcLock
 * @param {import('ipld')} config.ipld
 * @param {import('./pin-manager')} config.pinManager
 */
var addAll$1 = ({ pinManager, gcLock, ipld }) => {
  /**
   * @type {import('ipfs-core-types/src/pin').API["addAll"]}
   */
  async function * addAll (source, options = {}) {
    /**
     * @returns {AsyncIterable<CID>}
     */
    const pinAdd = async function * () {
      for await (const { path, recursive, metadata } of normaliseInput$2(source)) {
        const cid = await resolvePath$3(ipld, path);

        // verify that each hash can be pinned
        const { reason } = await pinManager.isPinnedWithType(cid, [PinTypes$3.recursive, PinTypes$3.direct]);

        if (reason === 'recursive' && !recursive) {
          // only disallow trying to override recursive pins
          throw new Error(`${cid} already pinned recursively`)
        }

        if (recursive) {
          await pinManager.pinRecursively(cid, { metadata });
        } else {
          await pinManager.pinDirectly(cid, { metadata });
        }

        yield cid;
      }
    };

    // When adding a file, we take a lock that gets released after pinning
    // is complete, so don't take a second lock here
    const lock = Boolean(options.lock);

    if (!lock) {
      yield * pinAdd();
      return
    }

    const release = await gcLock.readLock();

    try {
      yield * pinAdd();
    } finally {
      release();
    }
  }

  return withTimeoutOption$18(addAll)
};

/* eslint max-nested-callbacks: ["error", 8] */

const PinManager = pinManager;
const { PinTypes: PinTypes$2 } = PinManager;
const normaliseInput$1 = require$$3;
const { resolvePath: resolvePath$2 } = utils$6;
const withTimeoutOption$17 = require$$0;

/**
 * @typedef {import('cids')} CID
 */

/**
 * @param {string} type
 * @param {CID} cid
 * @param {Record<string, any>} [metadata]
 */
function toPin (type, cid, metadata) {
  /** @type {import('ipfs-core-types/src/pin').LsResult} */
  const output = {
    type,
    cid
  };

  if (metadata) {
    output.metadata = metadata;
  }

  return output
}

/**
 * @param {Object} config
 * @param {import('./pin-manager')} config.pinManager
 * @param {import('ipld')} config.ipld
 */
var ls$2 = ({ pinManager, ipld }) => {
  /**
   * @type {import('ipfs-core-types/src/pin').API["ls"]}
   */
  async function * ls (options = {}) {
    /** @type {import('ipfs-core-types/src/pin').PinQueryType} */
    let type = PinTypes$2.all;

    if (options.type) {
      type = options.type;

      PinManager.checkPinType(type);
    }

    if (options.paths) {
      // check the pinned state of specific hashes
      let matched = false;

      for await (const { path } of normaliseInput$1(options.paths)) {
        const cid = await resolvePath$2(ipld, path);
        const { reason, pinned, parent, metadata } = await pinManager.isPinnedWithType(cid, type);

        if (!pinned) {
          throw new Error(`path '${path}' is not pinned`)
        }

        switch (reason) {
          case PinTypes$2.direct:
          case PinTypes$2.recursive:
            matched = true;
            yield toPin(reason, cid, metadata);
            break
          default:
            matched = true;
            yield toPin(`${PinTypes$2.indirect} through ${parent}`, cid, metadata);
        }
      }

      if (!matched) {
        throw new Error('No match found')
      }

      return
    }

    if (type === PinTypes$2.recursive || type === PinTypes$2.all) {
      for await (const { cid, metadata } of pinManager.recursiveKeys()) {
        yield toPin(PinTypes$2.recursive, cid, metadata);
      }
    }

    if (type === PinTypes$2.indirect || type === PinTypes$2.all) {
      // @ts-ignore - LsSettings & AbortOptions have no properties in common
      // with type { preload?: boolean }
      for await (const cid of pinManager.indirectKeys(options)) {
        yield toPin(PinTypes$2.indirect, cid);
      }
    }

    if (type === PinTypes$2.direct || type === PinTypes$2.all) {
      for await (const { cid, metadata } of pinManager.directKeys()) {
        yield toPin(PinTypes$2.direct, cid, metadata);
      }
    }
  }

  return withTimeoutOption$17(ls)
};

const last$6 = require$$0$5;

/**
 * @param {Object} config
 * @param {import('ipfs-core-types/src/pin').API["rmAll"]} config.rmAll
 */
var rm$6 = ({ rmAll }) =>
  /**
   * @type {import('ipfs-core-types/src/pin').API["rm"]}
   */
  (path, options = {}) => {
    // @ts-ignore return value of last can be undefined
    return last$6(rmAll([{ path, ...options }], options))
  };

const normaliseInput = require$$3;
const { resolvePath: resolvePath$1 } = utils$6;
const withTimeoutOption$16 = require$$0;
const { PinTypes: PinTypes$1 } = pinManager;

/**
 * @param {Object} config
 * @param {import('./pin-manager')} config.pinManager
 * @param {import('.').GCLock} config.gcLock
 * @param {import('ipld')} config.ipld
 */
var rmAll = ({ pinManager, gcLock, ipld }) => {
  /**
   * @type {import('ipfs-core-types/src/pin').API["rmAll"]}
   */
  async function * rmAll (source, _options = {}) {
    const release = await gcLock.readLock();

    try {
      // verify that each hash can be unpinned
      for await (const { path, recursive } of normaliseInput(source)) {
        const cid = await resolvePath$1(ipld, path);
        const { pinned, reason } = await pinManager.isPinnedWithType(cid, PinTypes$1.all);

        if (!pinned) {
          throw new Error(`${cid} is not pinned`)
        }

        switch (reason) {
          case (PinTypes$1.recursive):
            if (!recursive) {
              throw new Error(`${cid} is pinned recursively`)
            }

            await pinManager.unpin(cid);

            yield cid;

            break
          case (PinTypes$1.direct):
            await pinManager.unpin(cid);

            yield cid;

            break
          default:
            throw new Error(`${cid} is pinned indirectly under ${reason}`)
        }
      }
    } finally {
      release();
    }
  }

  return withTimeoutOption$16(rmAll)
};

const createAdd$1 = add$2;
const createAddAll = addAll$1;
const createLs = ls$2;
const createRm$3 = rm$6;
const createRmAll = rmAll;

/**
 * @typedef {import('../gc-lock').GCLock} GCLock
 * @typedef {import('./pin-manager')} PinManager
 */

class PinAPI$1 {
  /**
   * @param {Object} config
   * @param {GCLock} config.gcLock
   * @param {import('ipld')} config.ipld
   * @param {PinManager} config.pinManager
   */
  constructor ({ gcLock, ipld, pinManager }) {
    const addAll = createAddAll({ gcLock, ipld, pinManager });
    this.addAll = addAll;
    this.add = createAdd$1({ addAll });
    const rmAll = createRmAll({ gcLock, ipld, pinManager });
    this.rmAll = rmAll;
    this.rm = createRm$3({ rmAll });
    this.ls = createLs({ ipld, pinManager });

    /** @type {import('ipfs-core-types/src/pin/remote').API} */
    this.remote = {
      add: (cid, options = {}) => Promise.reject(new Error('Not implemented')),
      ls: async function * (query, options = {}) { return Promise.reject(new Error('Not implemented')) }, // eslint-disable-line require-yield
      rm: (query, options = {}) => Promise.reject(new Error('Not implemented')),
      rmAll: (query, options = {}) => Promise.reject(new Error('Not implemented')),
      service: {
        add: (name, credentials) => Promise.reject(new Error('Not implemented')),
        rm: (name, options = {}) => Promise.reject(new Error('Not implemented')),
        ls: (options = {}) => Promise.reject(new Error('Not implemented'))
      }
    };
  }
}

var pin = PinAPI$1;

var publisher = {exports: {}};

var hasRequiredPublisher;

function requirePublisher () {
	if (hasRequiredPublisher) return publisher.exports;
	hasRequiredPublisher = 1;
	(function (module, exports) {

		const PeerId = require$$0$6;
		const { Key, Errors } = require$$2;
		const errcode = require$$1$1;
		const debug = require$$2$4;
		const log = Object.assign(debug('ipfs:ipns:publisher'), {
		  error: debug('ipfs:ipns:publisher:error')
		});
		const uint8ArrayToString = require$$4$2;
		const uint8ArrayEquals = require$$5$1;

		const ipns = require$$0$7;

		/**
		 * @typedef {import('libp2p-crypto').PrivateKey} PrivateKey
		 * @typedef {import('libp2p-crypto').PublicKey} PublicKey
		 * @typedef {import('ipns').IPNSEntry} IPNSEntry
		 */

		const ERR_NOT_FOUND = Errors.notFoundError().code;
		const defaultRecordLifetime = 60 * 60 * 1000;

		// IpnsPublisher is capable of publishing and resolving names to the IPFS routing system.
		class IpnsPublisher {
		  /**
		   * @param {import('ipfs-core-types/src/utils').BufferStore} routing
		   * @param {import('interface-datastore').Datastore} datastore
		   */
		  constructor (routing, datastore) {
		    this._routing = routing;
		    this._datastore = datastore;
		  }

		  /**
		   * Publish record with a eol
		   *
		   * @param {PrivateKey} privKey
		   * @param {Uint8Array} value
		   * @param {number} lifetime
		   */
		  async publishWithEOL (privKey, value, lifetime) {
		    if (!privKey || !privKey.bytes) {
		      throw errcode(new Error('invalid private key'), 'ERR_INVALID_PRIVATE_KEY')
		    }

		    const peerId = await PeerId.createFromPrivKey(privKey.bytes);
		    const record = await this._updateOrCreateRecord(privKey, value, lifetime, peerId);

		    return this._putRecordToRouting(record, peerId)
		  }

		  /**
		   * Accepts a keypair, as well as a value (ipfsPath), and publishes it out to the routing system
		   *
		   * @param {PrivateKey} privKey
		   * @param {Uint8Array} value
		   */
		  publish (privKey, value) {
		    return this.publishWithEOL(privKey, value, defaultRecordLifetime)
		  }

		  /**
		   * @param {IPNSEntry} record
		   * @param {PeerId} peerId
		   */
		  async _putRecordToRouting (record, peerId) {
		    if (!(PeerId.isPeerId(peerId))) {
		      const errMsg = 'peerId received is not valid';
		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_INVALID_PEER_ID')
		    }

		    // @ts-ignore - accessing private property isn't allowed
		    const publicKey = peerId._pubKey;
		    const embedPublicKeyRecord = await ipns.embedPublicKey(publicKey, record);
		    const keys = ipns.getIdKeys(peerId.toBytes());

		    await this._publishEntry(keys.routingKey, embedPublicKeyRecord || record);

		    // Publish the public key to support old go-ipfs nodes that are looking for it in the routing
		    // We will be able to deprecate this part in the future, since the public keys will be only
		    // in IPNS record and the peerId.
		    await this._publishPublicKey(keys.routingPubKey, publicKey);

		    return embedPublicKeyRecord || record
		  }

		  /**
		   * @param {Key} key
		   * @param {IPNSEntry} entry
		   */
		  async _publishEntry (key, entry) {
		    if (!(Key.isKey(key))) {
		      const errMsg = 'datastore key does not have a valid format';

		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_INVALID_DATASTORE_KEY')
		    }

		    let entryData;
		    try {
		      // Marshal record
		      entryData = ipns.marshal(entry);
		    } catch (err) {
		      log.error(err);

		      throw err
		    }

		    // Add record to routing (buffer key)
		    try {
		      const res = await this._routing.put(key.uint8Array(), entryData);
		      log(`ipns record for ${uint8ArrayToString(key.uint8Array(), 'base64')} was stored in the routing`);

		      return res
		    } catch (err) {
		      const errMsg = `ipns record for ${uint8ArrayToString(key.uint8Array(), 'base64')} could not be stored in the routing`;
		      log.error(errMsg);
		      log.error(err);

		      throw errcode(new Error(errMsg), 'ERR_PUTTING_TO_ROUTING')
		    }
		  }

		  /**
		   * @param {Key} key
		   * @param {PublicKey} publicKey
		   */
		  async _publishPublicKey (key, publicKey) {
		    if ((!Key.isKey(key))) {
		      const errMsg = 'datastore key does not have a valid format';
		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_INVALID_DATASTORE_KEY')
		    }

		    if (!publicKey || !publicKey.bytes) {
		      const errMsg = 'one or more of the provided parameters are not defined';
		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_UNDEFINED_PARAMETER')
		    }

		    // Add public key to routing (buffer key)
		    try {
		      const res = await this._routing.put(key.uint8Array(), publicKey.bytes);
		      log(`public key for ${uint8ArrayToString(key.uint8Array(), 'base64')} was stored in the routing`);

		      return res
		    } catch (err) {
		      const errMsg = `public key for ${uint8ArrayToString(key.uint8Array(), 'base64')} could not be stored in the routing`;
		      log.error(errMsg);
		      log.error(err);

		      throw errcode(new Error(errMsg), 'ERR_PUTTING_TO_ROUTING')
		    }
		  }

		  /**
		   * Returns the record this node has published corresponding to the given peer ID.
		   *
		   * If `checkRouting` is true and we have no existing record, this method will check the routing system for any existing records.
		   *
		   * @param {PeerId} peerId
		   * @param {object} options
		   * @param {boolean} [options.checkRouting]
		   */
		  async _getPublished (peerId, options = {}) {
		    if (!(PeerId.isPeerId(peerId))) {
		      const errMsg = 'peerId received is not valid';

		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_INVALID_PEER_ID')
		    }

		    const checkRouting = options.checkRouting !== false;

		    try {
		      const dsVal = await this._datastore.get(ipns.getLocalKey(peerId.id));

		      // unmarshal data
		      return this._unmarshalData(dsVal)
		    } catch (err) {
		      if (err.code !== ERR_NOT_FOUND) {
		        const errMsg = `unexpected error getting the ipns record ${peerId.id} from datastore`;
		        log.error(errMsg);

		        throw errcode(new Error(errMsg), 'ERR_UNEXPECTED_DATASTORE_RESPONSE')
		      }

		      if (!checkRouting) {
		        throw errcode(err, 'ERR_NOT_FOUND_AND_CHECK_ROUTING_NOT_ENABLED')
		      }

		      // Try to get from routing
		      try {
		        const keys = ipns.getIdKeys(peerId.toBytes());
		        const res = await this._routing.get(keys.routingKey.uint8Array());

		        // unmarshal data
		        return this._unmarshalData(res)
		      } catch (err) {
		        log.error(err);

		        throw err
		      }
		    }
		  }

		  /**
		   * @param {Uint8Array} data
		   */
		  _unmarshalData (data) {
		    try {
		      return ipns.unmarshal(data)
		    } catch (err) {
		      throw errcode(err, 'ERR_INVALID_RECORD_DATA')
		    }
		  }

		  /**
		   * @param {PrivateKey} privKey
		   * @param {Uint8Array} value
		   * @param {number} lifetime
		   * @param {PeerId} peerId
		   */
		  async _updateOrCreateRecord (privKey, value, lifetime, peerId) {
		    if (!(PeerId.isPeerId(peerId))) {
		      const errMsg = 'peerId received is not valid';
		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_INVALID_PEER_ID')
		    }

		    const getPublishedOptions = {
		      checkRouting: true
		    };

		    let record;

		    try {
		      record = await this._getPublished(peerId, getPublishedOptions);
		    } catch (err) {
		      if (err.code !== ERR_NOT_FOUND) {
		        const errMsg = `unexpected error when determining the last published IPNS record for ${peerId.id} ${err.stack}`;
		        log.error(errMsg);

		        throw errcode(new Error(errMsg), 'ERR_DETERMINING_PUBLISHED_RECORD')
		      }
		    }

		    // Determinate the record sequence number
		    let seqNumber = 0;

		    if (record && record.sequence !== undefined) {
		      seqNumber = !uint8ArrayEquals(record.value, value) ? record.sequence + 1 : record.sequence;
		    }

		    let entryData;

		    try {
		      // Create record
		      entryData = await ipns.create(privKey, value, seqNumber, lifetime);
		    } catch (err) {
		      const errMsg = `ipns record for ${value} could not be created`;

		      log.error(err);
		      throw errcode(new Error(errMsg), 'ERR_CREATING_IPNS_RECORD')
		    }

		    // TODO IMPROVEMENT - set ttl (still experimental feature for go)

		    try {
		      // Marshal record
		      const data = ipns.marshal(entryData);

		      // Store the new record
		      await this._datastore.put(ipns.getLocalKey(peerId.id), data);

		      log(`ipns record for ${uint8ArrayToString(value, 'base32')} was stored in the datastore`);

		      return entryData
		    } catch (err) {
		      const errMsg = `ipns record for ${value} could not be stored in the datastore`;
		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_STORING_IN_DATASTORE')
		    }
		  }
		}

		IpnsPublisher.defaultRecordLifetime = defaultRecordLifetime;
		module.exports = IpnsPublisher;
} (publisher));
	return publisher.exports;
}

var republisher = {exports: {}};

var hasRequiredRepublisher;

function requireRepublisher () {
	if (hasRequiredRepublisher) return republisher.exports;
	hasRequiredRepublisher = 1;
	(function (module, exports) {

		const ipns = require$$0$7;
		const crypto = require$$2$5;
		const PeerId = require$$0$6;
		const errcode = require$$1$1;

		const debug = require$$2$4;
		const log = Object.assign(debug('ipfs:ipns:republisher'), {
		  error: debug('ipfs:ipns:republisher:error')
		});

		/**
		 * @typedef {import('libp2p-crypto').PrivateKey} PrivateKey
		 */

		const minute = 60 * 1000;
		const hour = 60 * minute;

		const defaultBroadcastInterval = 4 * hour;
		const defaultRecordLifetime = 24 * hour;

		class IpnsRepublisher {
		  /**
		   * @param {import('./publisher')} publisher
		   * @param {import('interface-datastore').Datastore} datastore
		   * @param {PeerId} peerId
		   * @param {import('libp2p/src/keychain')} keychain
		   * @param {object} options
		   * @param {string} options.pass
		   * @param {number} [options.initialBroadcastInterval]
		   * @param {number} [options.broadcastInterval]
		   */
		  constructor (publisher, datastore, peerId, keychain, options = { pass: '' }) {
		    this._publisher = publisher;
		    this._datastore = datastore;
		    this._peerId = peerId;
		    this._keychain = keychain;
		    this._options = options;
		    this._republishHandle = null;
		  }

		  async start () { // eslint-disable-line require-await
		    if (this._republishHandle) {
		      throw errcode(new Error('republisher is already running'), 'ERR_REPUBLISH_ALREADY_RUNNING')
		    }

		    // TODO: this handler should be isolated in another module
		    const republishHandle = {
		      /** @type {null|(() => Promise<void>)} */
		      _task: null,
		      /** @type {null|Promise<void>} */
		      _inflightTask: null,
		      /** @type {null|NodeJS.Timeout} */
		      _timeoutId: null,
		      /**
		       * @param {function(): number} period
		       */
		      runPeriodically: (period) => {
		        republishHandle._timeoutId = setTimeout(async () => {
		          republishHandle._timeoutId = null;

		          try {
		            // @ts-ignore - _task could be null
		            republishHandle._inflightTask = republishHandle._task();
		            await republishHandle._inflightTask;

		            // Schedule next
		            if (republishHandle._task) {
		              republishHandle.runPeriodically(period);
		            }
		          } catch (err) {
		            log.error(err);
		          }
		        }, period());
		      },
		      cancel: async () => {
		        // do not run again
		        if (republishHandle._timeoutId != null) {
		          clearTimeout(republishHandle._timeoutId);
		        }
		        republishHandle._task = null;

		        // wait for the currently in flight task to complete
		        await republishHandle._inflightTask;
		      }
		    };

		    const { privKey } = this._peerId;
		    const { pass } = this._options;
		    let firstRun = true;

		    republishHandle._task = () => this._republishEntries(privKey, pass);

		    republishHandle.runPeriodically(() => {
		      if (firstRun) {
		        firstRun = false;
		        return this._options.initialBroadcastInterval || minute
		      }

		      return this._options.broadcastInterval || defaultBroadcastInterval
		    });

		    this._republishHandle = republishHandle;
		  }

		  async stop () {
		    const republishHandle = this._republishHandle;

		    if (!republishHandle) {
		      throw errcode(new Error('republisher is not running'), 'ERR_REPUBLISH_NOT_RUNNING')
		    }

		    this._republishHandle = null;

		    await republishHandle.cancel();
		  }

		  /**
		   * @param {PrivateKey} privateKey
		   * @param {string} pass
		   */
		  async _republishEntries (privateKey, pass) {
		    // TODO: Should use list of published entries.
		    // We can't currently *do* that because go uses this method for now.
		    try {
		      await this._republishEntry(privateKey);
		    } catch (err) {
		      const errMsg = 'cannot republish entry for the node\'s private key';

		      log.error(errMsg);
		      return
		    }

		    // keychain needs pass to get the cryptographic keys
		    if (pass) {
		      try {
		        const keys = await this._keychain.listKeys();

		        for (const key of keys) {
		          if (key.name === 'self') {
		            continue
		          }
		          const pem = await this._keychain.exportKey(key.name, pass);
		          const privKey = await crypto.keys.import(pem, pass);

		          await this._republishEntry(privKey);
		        }
		      } catch (err) {
		        log.error(err);
		      }
		    }
		  }

		  /**
		   * @param {PrivateKey} privateKey
		   */
		  async _republishEntry (privateKey) {
		    if (!privateKey || !privateKey.bytes) {
		      throw errcode(new Error('invalid private key'), 'ERR_INVALID_PRIVATE_KEY')
		    }

		    try {
		      const peerId = await PeerId.createFromPrivKey(privateKey.bytes);
		      const value = await this._getPreviousValue(peerId);
		      await this._publisher.publishWithEOL(privateKey, value, defaultRecordLifetime);
		    } catch (err) {
		      if (err.code === 'ERR_NO_ENTRY_FOUND') {
		        return
		      }

		      throw err
		    }
		  }

		  /**
		   * @param {PeerId} peerId
		   */
		  async _getPreviousValue (peerId) {
		    if (!(PeerId.isPeerId(peerId))) {
		      throw errcode(new Error('invalid peer ID'), 'ERR_INVALID_PEER_ID')
		    }

		    try {
		      const dsVal = await this._datastore.get(ipns.getLocalKey(peerId.id));

		      if (!(dsVal instanceof Uint8Array)) {
		        throw errcode(new Error("found ipns record that we couldn't process"), 'ERR_INVALID_IPNS_RECORD')
		      }

		      // unmarshal data
		      try {
		        const record = ipns.unmarshal(dsVal);

		        return record.value
		      } catch (err) {
		        log.error(err);
		        throw errcode(new Error('found ipns record that we couldn\'t convert to a value'), 'ERR_INVALID_IPNS_RECORD')
		      }
		    } catch (err) {
		      // error handling
		      // no need to republish
		      if (err && err.notFound) {
		        throw errcode(new Error(`no previous entry for record with id: ${peerId.id}`), 'ERR_NO_ENTRY_FOUND')
		      }

		      throw err
		    }
		  }
		}

		module.exports = IpnsRepublisher;
} (republisher));
	return republisher.exports;
}

var resolver = {exports: {}};

var hasRequiredResolver;

function requireResolver () {
	if (hasRequiredResolver) return resolver.exports;
	hasRequiredResolver = 1;
	(function (module, exports) {

		const ipns = require$$0$7;
		const PeerId = require$$0$6;
		const errcode = require$$1$1;
		const debug = require$$2$4;
		const log = Object.assign(debug('ipfs:ipns:resolver'), {
		  error: debug('ipfs:ipns:resolver:error')
		});
		const uint8ArrayToString = require$$4$2;

		const { Errors } = require$$2;
		const ERR_NOT_FOUND = Errors.notFoundError().code;

		const defaultMaximumRecursiveDepth = 32;

		class IpnsResolver {
		  /**
		   * @param {import('ipfs-core-types/src/utils').BufferStore} routing
		   */
		  constructor (routing) {
		    this._routing = routing;
		  }

		  /**
		   * @param {string} name
		   * @param {object} options
		   * @param {boolean} [options.recursive]
		   */
		  async resolve (name, options = {}) {
		    if (typeof name !== 'string') {
		      throw errcode(new Error('invalid name'), 'ERR_INVALID_NAME')
		    }

		    const recursive = options.recursive && options.recursive.toString() === 'true';

		    const nameSegments = name.split('/');

		    if (nameSegments.length !== 3 || nameSegments[0] !== '') {
		      throw errcode(new Error('invalid name'), 'ERR_INVALID_NAME')
		    }

		    const key = nameSegments[2];

		    // Define a maximum depth if recursive option enabled
		    let depth = Infinity;

		    if (recursive) {
		      depth = defaultMaximumRecursiveDepth;
		    }

		    const res = await this.resolver(key, depth);

		    log(`${name} was locally resolved correctly`);
		    return res
		  }

		  /**
		   * Recursive resolver according to the specified depth
		   *
		   * @param {string} name
		   * @param {number} depth
		   * @returns {Promise<string>}
		   */
		  async resolver (name, depth) {
		    // Exceeded recursive maximum depth
		    if (depth === 0) {
		      const errMsg = `could not resolve name (recursion limit of ${defaultMaximumRecursiveDepth} exceeded)`;
		      log.error(errMsg);

		      throw errcode(new Error(errMsg), 'ERR_RESOLVE_RECURSION_LIMIT')
		    }

		    const res = await this._resolveName(name);
		    const nameSegments = res.split('/');

		    // If obtained a ipfs cid or recursive option is disabled
		    if (nameSegments[1] === 'ipfs' || !depth) {
		      return res
		    }

		    // continue recursively until depth equals 0
		    return this.resolver(nameSegments[2], depth - 1)
		  }

		  /**
		   * Resolve ipns entries from the provided routing
		   *
		   * @param {string} name
		   */
		  async _resolveName (name) {
		    const peerId = PeerId.createFromCID(name);
		    const { routingKey } = ipns.getIdKeys(peerId.toBytes());
		    let record;

		    try {
		      record = await this._routing.get(routingKey.uint8Array());
		    } catch (err) {
		      log.error('could not get record from routing', err);

		      if (err.code === ERR_NOT_FOUND) {
		        throw errcode(new Error(`record requested for ${name} was not found in the network`), 'ERR_NO_RECORD_FOUND')
		      }

		      throw errcode(new Error(`unexpected error getting the ipns record ${peerId.toString()}`), 'ERR_UNEXPECTED_ERROR_GETTING_RECORD')
		    }

		    // IPNS entry
		    let ipnsEntry;
		    try {
		      ipnsEntry = ipns.unmarshal(record);
		    } catch (err) {
		      log.error('could not unmarshal record', err);

		      throw errcode(new Error('found ipns record that we couldn\'t convert to a value'), 'ERR_INVALID_RECORD_RECEIVED')
		    }

		    // We should have the public key by now (inline, or in the entry)
		    return this._validateRecord(peerId, ipnsEntry)
		  }

		  /**
		   * Validate a resolved record
		   *
		   * @param {PeerId} peerId
		   * @param {import('ipns').IPNSEntry} ipnsEntry
		   */
		  async _validateRecord (peerId, ipnsEntry) {
		    const pubKey = await ipns.extractPublicKey(peerId, ipnsEntry);

		    // IPNS entry validation
		    await ipns.validate(pubKey, ipnsEntry);

		    return uint8ArrayToString(ipnsEntry.value)
		  }
		}

		module.exports = IpnsResolver;
} (resolver));
	return resolver.exports;
}

const { createFromPrivKey } = require$$0$6;
const errcode$4 = require$$1$1;
const debug$6 = require$$2$4;
const log$p = Object.assign(debug$6('ipfs:ipns'), {
  error: debug$6('ipfs:ipns:error')
});

const IpnsPublisher = requirePublisher();
const IpnsRepublisher = requireRepublisher();
const IpnsResolver = requireResolver();
const TLRU = tlru;
const defaultRecordTtl = 60 * 1000;
const uint8ArrayToString$7 = require$$4$2;

/**
 * @typedef {import('libp2p-crypto').PrivateKey} PrivateKey
 * @typedef {import('peer-id')} PeerId
 */

class IPNS$1 {
  /**
   * @param {import('ipfs-core-types/src/utils').BufferStore} routing
   * @param {import('interface-datastore').Datastore} datastore
   * @param {PeerId} peerId
   * @param {import('libp2p/src/keychain')} keychain
   * @param {object} options
   * @param {string} options.pass
   * @param {number} [options.initialBroadcastInterval]
   * @param {number} [options.broadcastInterval]
   */
  constructor (routing, datastore, peerId, keychain, options) {
    this.publisher = new IpnsPublisher(routing, datastore);
    this.republisher = new IpnsRepublisher(this.publisher, datastore, peerId, keychain, options);
    this.resolver = new IpnsResolver(routing);
    this.cache = new TLRU(1000);
    this.routing = routing;
  }

  /**
   * Publish
   *
   * @param {PrivateKey} privKey
   * @param {Uint8Array} value
   * @param {number} lifetime
   */
  async publish (privKey, value, lifetime = IpnsPublisher.defaultRecordLifetime) {
    try {
      const peerId = await createFromPrivKey(privKey.bytes);
      await this.publisher.publishWithEOL(privKey, value, lifetime);

      log$p(`IPNS value ${uint8ArrayToString$7(value, 'base32')} was published correctly`);

      // // Add to cache
      const id = peerId.toB58String();
      // @ts-ignore - parseFloat expects string
      const ttEol = parseFloat(lifetime);
      const ttl = (ttEol < defaultRecordTtl) ? ttEol : defaultRecordTtl;

      this.cache.set(id, value, ttl);

      log$p(`IPNS value ${uint8ArrayToString$7(value, 'base32')} was cached correctly`);

      return {
        name: id,
        value: value
      }
    } catch (err) {
      log$p.error(err);

      throw err
    }
  }

  /**
   * Resolve
   *
   * @param {string} name
   * @param {object} options
   * @param {boolean} [options.nocache]
   * @param {boolean} [options.recursive]
   */
  async resolve (name, options = {}) {
    if (typeof name !== 'string') {
      throw errcode$4(new Error('name received is not valid'), 'ERR_INVALID_NAME')
    }

    // If recursive, we should not try to get the cached value
    if (!options.nocache && !options.recursive) {
      // Try to get the record from cache
      const id = name.split('/')[2];
      const result = this.cache.get(id);

      if (result) {
        return result
      }
    }

    try {
      const result = await this.resolver.resolve(name, options);

      log$p(`IPNS record from ${name} was resolved correctly`);

      return result
    } catch (err) {
      log$p.error(err);

      throw err
    }
  }

  /**
   * Initialize keyspace
   *
   * Sets the ipns record for the given key to point to an empty directory
   *
   * @param {PrivateKey} privKey
   * @param {Uint8Array} value
   */
  async initializeKeyspace (privKey, value) { // eslint-disable-line require-await
    return this.publish(privKey, value, IpnsPublisher.defaultRecordLifetime)
  }
}

var ipns$3 = IPNS$1;

const ipns$2 = require$$0$7;
const { toB58String } = require$$1$3.multihash;
const PubsubDatastore$1 = require$$2$6;
const uint8ArrayToString$6 = require$$4$2;
const uint8ArrayFromString$5 = require$$4$3;

const errcode$3 = require$$1$1;
const debug$5 = require$$2$4;
const log$o = Object.assign(debug$5('ipfs:ipns:pubsub'), {
  error: debug$5('ipfs:ipns:pubsub:error')
});

// Pubsub datastore aims to manage the pubsub subscriptions for IPNS
class IpnsPubsubDatastore$1 {
  /**
   * @param {import('libp2p-interfaces/src/pubsub')} pubsub
   * @param {import('interface-datastore').Datastore} localDatastore
   * @param {import('peer-id')} peerId
   */
  constructor (pubsub, localDatastore, peerId) {
    /** @type {Record<string, string>} */
    this._subscriptions = {};

    // Bind _handleSubscriptionKey function, which is called by PubsubDatastore.
    this._handleSubscriptionKey = this._handleSubscriptionKey.bind(this);

    // @ts-ignore will be fixed by https://github.com/ipfs/js-datastore-pubsub/pull/74
    this._pubsubDs = new PubsubDatastore$1(pubsub, localDatastore, peerId, ipns$2.validator, this._handleSubscriptionKey);
  }

  /**
   * Put a value to the pubsub datastore indexed by the received key properly encoded.
   *
   * @param {Uint8Array} key - identifier of the value.
   * @param {Uint8Array} value - value to be stored.
   */
  put (key, value) {
    // @ts-ignore datastores take Key keys, this one takes Uint8Array keys
    return this._pubsubDs.put(key, value)
  }

  /**
   * Get a value from the pubsub datastore indexed by the received key properly encoded.
   * Also, the identifier topic is subscribed to and the pubsub datastore records will be
   * updated once new publishes occur.
   *
   * @param {Uint8Array} key - identifier of the value to be obtained.
   */
  async get (key) {
    let res;
    let err;

    try {
      // @ts-ignore datastores take Key keys, this one takes Uint8Array keys
      res = await this._pubsubDs.get(key);
    } catch (e) {
      err = e;
    }

    // Add topic subscribed
    const ns = key.slice(0, ipns$2.namespaceLength);

    if (uint8ArrayToString$6(ns) === ipns$2.namespace) {
      const stringifiedTopic = toB58String(key);
      const id = toB58String(key.slice(ipns$2.namespaceLength));

      this._subscriptions[stringifiedTopic] = id;

      log$o(`subscribed to pubsub topic ${stringifiedTopic}, id ${id}`);
    }

    // If no data was obtained, after storing the subscription, return the error.
    if (err) {
      throw err
    }

    return res
  }

  /**
   * Modify subscription key to have a proper encoding
   *
   * @param {Uint8Array | string} key
   */
  _handleSubscriptionKey (key) {
    if (key instanceof Uint8Array) {
      key = uint8ArrayToString$6(key, 'base58btc');
    }

    const subscriber = this._subscriptions[key];

    if (!subscriber) {
      throw errcode$3(new Error(`key ${key} does not correspond to a subscription`), 'ERR_INVALID_KEY')
    }

    let keys;
    try {
      keys = ipns$2.getIdKeys(uint8ArrayFromString$5(subscriber, 'base58btc'));
    } catch (err) {
      log$o.error(err);
      throw err
    }

    return keys.routingKey.uint8Array()
  }

  /**
   * Get pubsub subscriptions related to ipns.
   */
  getSubscriptions () {
    const subscriptions = Object.values(this._subscriptions).filter(Boolean);

    return subscriptions.map((sub) => `${ipns$2.namespace}${sub}`)
  }

  /**
   * Cancel pubsub subscriptions related to ipns.
   *
   * @param {string} name - ipns path to cancel the pubsub subscription.
   */
  async cancel (name) { // eslint-disable-line require-await
    if (typeof name !== 'string') {
      throw errcode$3(new Error('invalid subscription name'), 'ERR_INVALID_SUBSCRIPTION_NAME')
    }

    // Trim /ipns/ prefix from the name
    if (name.startsWith(ipns$2.namespace)) {
      name = name.substring(ipns$2.namespaceLength);
    }

    const stringifiedTopic = Object.keys(this._subscriptions).find((key) => this._subscriptions[key] === name);

    // Not found topic
    if (!stringifiedTopic) {
      return {
        canceled: false
      }
    }

    // Unsubscribe topic
    const bufTopic = uint8ArrayFromString$5(stringifiedTopic);

    this._pubsubDs.unsubscribe(bufTopic);

    delete this._subscriptions[stringifiedTopic];
    log$o(`unsubscribed pubsub ${stringifiedTopic}: ${name}`);

    return {
      canceled: true
    }
  }
}

var pubsubDatastore = IpnsPubsubDatastore$1;

var offlineDatastore = {exports: {}};

const ipns$1 = require$$0$7;
const uint8ArrayToString$5 = require$$4$2;

var utils$5 = {
  /**
   * @param {Uint8Array} buf
   */
  encodeBase32: (buf) => uint8ArrayToString$5(buf, 'base32upper'),
  validator: {
    /**
     * @param {Uint8Array} key
     * @param {Uint8Array} record
     */
    func: (key, record) => ipns$1.validator.validate(record, key)
  },
  /**
   * @param {*} _k
   * @param {Uint8Array[]} records
   */
  selector: (_k, records) => ipns$1.validator.select(records[0], records[1])
};

(function (module, exports) {

	const { Key } = require$$2;
	const { Record } = require$$1$4;
	const { encodeBase32 } = utils$5;

	const errcode = require$$1$1;
	const debug = require$$2$4;
	const log = Object.assign(debug('ipfs:ipns:offline-datastore'), {
	  error: debug('ipfs:ipns:offline-datastore:error')
	});

	// Offline datastore aims to mimic the same encoding as routing when storing records
	// to the local datastore
	class OfflineDatastore {
	  /**
	   * @param {import('ipfs-repo')} repo
	   */
	  constructor (repo) {
	    this._repo = repo;
	    /** @type {any[]} */
	    this.stores = [];
	  }

	  /**
	   * Put a value to the local datastore indexed by the received key properly encoded.
	   *
	   * @param {Uint8Array} key - identifier of the value.
	   * @param {Uint8Array} value - value to be stored.
	   */
	  async put (key, value) { // eslint-disable-line require-await
	    if (!(key instanceof Uint8Array)) {
	      throw errcode(new Error('Offline datastore key must be a Uint8Array'), 'ERR_INVALID_KEY')
	    }

	    if (!(value instanceof Uint8Array)) {
	      throw errcode(new Error('Offline datastore value must be a Uint8Array'), 'ERR_INVALID_VALUE')
	    }

	    let routingKey;

	    try {
	      routingKey = this._routingKey(key);
	    } catch (err) {
	      log.error(err);
	      throw errcode(new Error('Not possible to generate the routing key'), 'ERR_GENERATING_ROUTING_KEY')
	    }

	    // Marshal to libp2p record as the DHT does
	    const record = new Record(key, value);

	    return this._repo.datastore.put(routingKey, record.serialize())
	  }

	  /**
	   * Get a value from the local datastore indexed by the received key properly encoded.
	   *
	   * @param {Uint8Array} key - identifier of the value to be obtained.
	   */
	  async get (key) {
	    if (!(key instanceof Uint8Array)) {
	      throw errcode(new Error('Offline datastore key must be a Uint8Array'), 'ERR_INVALID_KEY')
	    }

	    let routingKey;

	    try {
	      routingKey = this._routingKey(key);
	    } catch (err) {
	      log.error(err);
	      throw errcode(new Error('Not possible to generate the routing key'), 'ERR_GENERATING_ROUTING_KEY')
	    }

	    const res = await this._repo.datastore.get(routingKey);

	    // Unmarshal libp2p record as the DHT does
	    let record;
	    try {
	      record = Record.deserialize(res);
	    } catch (err) {
	      log.error(err);
	      throw err
	    }

	    return record.value
	  }

	  /**
	   * encode key properly - base32(/ipns/{cid})
	   *
	   * @param {Uint8Array} key
	   */
	  _routingKey (key) {
	    return new Key('/' + encodeBase32(key), false)
	  }
	}

	module.exports = OfflineDatastore;
} (offlineDatastore));

const { TieredDatastore } = require$$0$8;
const get$7 = require$$1$5;

const PubsubDatastore = pubsubDatastore;
const OfflineDatastore$1 = offlineDatastore.exports;

/**
 * @param {object} arg
 * @param {import('libp2p')} arg.libp2p
 * @param {import('ipfs-repo')} arg.repo
 * @param {import('peer-id')} arg.peerId
 * @param {object} arg.options
 */
var config$1 = ({ libp2p, repo, peerId, options }) => {
  // Setup online routing for IPNS with a tiered routing composed by a DHT and a Pubsub router (if properly enabled)
  const ipnsStores = [];

  // Add IPNS pubsub if enabled
  let pubsubDs;
  if (get$7(options, 'EXPERIMENTAL.ipnsPubsub', false)) {
    const pubsub = libp2p.pubsub;
    const localDatastore = repo.datastore;

    pubsubDs = new PubsubDatastore(pubsub, localDatastore, peerId);
    ipnsStores.push(pubsubDs);
  }

  // DHT should not be added as routing if we are offline or it is disabled
  if (get$7(options, 'offline') || !get$7(options, 'libp2p.config.dht.enabled', false)) {
    const offlineDatastore = new OfflineDatastore$1(repo);
    ipnsStores.push(offlineDatastore);
  } else {
    ipnsStores.push(libp2p._dht);
  }

  // Create ipns routing with a set of datastores
  return new TieredDatastore(ipnsStores)
};

const IPNS = ipns$3;
const routingConfig = config$1;
const OfflineDatastore = offlineDatastore.exports;
const { NotInitializedError, AlreadyInitializedError: AlreadyInitializedError$1 } = errors;
const log$n = require$$2$4('ipfs:components:ipns');

/**
 * @typedef {import('libp2p-crypto').PrivateKey} PrivateKey
 *
 * @typedef {Object} ExperimentalOptions
 * @property {boolean} [ipnsPubsub]
 *
 * @typedef {Object} LibP2POptions
 * @property {DHTConfig} [config]
 *
 * @typedef {Object} DHTConfig
 * @property {boolean} [enabled]
 */

class IPNSAPI$1 {
  /**
   * @param {Object} options
   * @param {string} options.pass
   * @param {boolean} [options.offline]
   * @param {LibP2POptions} [options.libp2p]
   * @param {ExperimentalOptions} [options.EXPERIMENTAL]
   */
  constructor (options = { pass: '' }) {
    this.options = options;

    /** @type {IPNS | null} */
    this.offline = null;

    /** @type {IPNS | null} */
    this.online = null;
  }

  getIPNS () {
    const ipns = this.online || this.offline;
    if (ipns) {
      return ipns
    } else {
      throw new NotInitializedError()
    }
  }

  get routing () {
    return this.getIPNS().routing
  }

  /**
   * Activates IPNS subsystem in an ofline mode. If it was started once already
   * it will throw an exception.
   *
   * This is primarily used for offline ipns modifications, such as the
   * initializeKeyspace feature.
   *
   * @param {Object} config
   * @param {import('ipfs-repo')} config.repo
   * @param {import('peer-id')} config.peerId
   * @param {import('libp2p/src/keychain')} config.keychain
   */
  startOffline ({ repo, peerId, keychain }) {
    if (this.offline != null) {
      throw new AlreadyInitializedError$1()
    }

    log$n('initializing IPNS keyspace');

    const routing = new OfflineDatastore(repo);
    const ipns = new IPNS(routing, repo.datastore, peerId, keychain, this.options);

    this.offline = ipns;
  }

  /**
   * @param {Object} config
   * @param {import('libp2p')} config.libp2p
   * @param {import('ipfs-repo')} config.repo
   * @param {import('peer-id')} config.peerId
   * @param {import('libp2p/src/keychain')} config.keychain
   */
  async startOnline ({ libp2p, repo, peerId, keychain }) {
    if (this.online != null) {
      throw new AlreadyInitializedError$1()
    }
    const routing = routingConfig({ libp2p, repo, peerId, options: this.options });

    // @ts-ignore routing is a TieredDatastore which wants keys to be Keys, IPNS needs keys to be Uint8Arrays
    const ipns = new IPNS(routing, repo.datastore, peerId, keychain, this.options);
    await ipns.republisher.start();
    this.online = ipns;
  }

  async stop () {
    const ipns = this.online;
    if (ipns) {
      await ipns.republisher.stop();
      this.online = null;
    }
  }

  /**
   * @param {PrivateKey} privKey
   * @param {Uint8Array} value
   * @param {number} lifetime
   */
  publish (privKey, value, lifetime) {
    return this.getIPNS().publish(privKey, value, lifetime)
  }

  /**
   *
   * @param {string} name
   * @param {*} [options]
   */
  resolve (name, options) {
    return this.getIPNS().resolve(name, options)
  }

  /**
   * @param {PrivateKey} privKey
   * @param {Uint8Array} value
   */
  initializeKeyspace (privKey, value) {
    return this.getIPNS().initializeKeyspace(privKey, value)
  }
}
var ipns = IPNSAPI$1;

var utils$4 = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils$4;
	hasRequiredUtils = 1;

	const isIPFS = require$$0$3;
	const toCidAndPath = require$$1;
	const drain = require$$2$7;

	/**
	 * resolves the given path by parsing out protocol-specific entries
	 * (e.g. /ipns/<node-key>) and then going through the /ipfs/ entries and returning the final node
	 *
	 * @param {Object} context
	 * @param {import('../ipns')} context.ipns
	 * @param {import('ipld')} context.ipld
	 * @param {string} name
	 */
	utils$4.resolvePath = async ({ ipns, ipld }, name) => {
	  // ipns path
	  if (isIPFS.ipnsPath(name)) {
	    return ipns.resolve(name)
	  }

	  const {
	    cid,
	    path
	  } = toCidAndPath(name);

	  // ipfs path
	  await drain(ipld.resolve(cid, path || ''));
	};
	return utils$4;
}

const debug$4 = require$$2$4;
const { default: parseDuration$1 } = require$$1$6;
const crypto$1 = require$$2$5;
const errcode$2 = require$$1$1;
const uint8ArrayFromString$4 = require$$4$3;
const uint8ArrayToString$4 = require$$4$2;

const log$m = Object.assign(debug$4('ipfs:name:publish'), {
  error: debug$4('ipfs:name:publish:error')
});

const { OFFLINE_ERROR: OFFLINE_ERROR$1, normalizePath } = utils$6;
const withTimeoutOption$15 = require$$0;
const { resolvePath } = requireUtils();

/**
 * IPNS - Inter-Planetary Naming System
 *
 * @param {Object} config
 * @param {import('../ipns')} config.ipns
 * @param {import('ipld')} config.ipld
 * @param {import('peer-id')} config.peerId
 * @param {import('ipfs-core-types/src/root').API["isOnline"]} config.isOnline
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var publish = ({ ipns, ipld, peerId, isOnline, keychain }) => {
  /**
   * @param {string} keyName
   */
  const lookupKey = async keyName => {
    if (keyName === 'self') {
      return peerId.privKey
    }

    try {
      // We're exporting and immediately importing the key, so we can just use a throw away password
      const pem = await keychain.exportKey(keyName, 'temp');
      const privateKey = await crypto$1.keys.import(pem, 'temp');
      return privateKey
    } catch (err) {
      log$m.error(err);
      throw errcode$2(err, 'ERR_CANNOT_GET_KEY')
    }
  };

  /**
   * @type {import('ipfs-core-types/src/name').API["publish"]}
   */
  async function publish (value, options = {}) {
    const resolve = !(options.resolve === false);
    const lifetime = options.lifetime || '24h';
    const key = options.key || 'self';

    if (!isOnline()) {
      throw errcode$2(new Error(OFFLINE_ERROR$1), 'OFFLINE_ERROR')
    }

    // TODO: params related logic should be in the core implementation
    // Normalize path value
    try {
      value = normalizePath(value);
    } catch (err) {
      log$m.error(err);
      throw err
    }

    let pubLifetime = 0;
    try {
      pubLifetime = parseDuration$1(lifetime) || 0;

      // Calculate lifetime with nanoseconds precision
      pubLifetime = parseFloat(pubLifetime.toFixed(6));
    } catch (err) {
      log$m.error(err);
      throw err
    }

    // TODO: ttl human for cache
    const results = await Promise.all([
      // verify if the path exists, if not, an error will stop the execution
      lookupKey(key),
      // if resolving, do a get so we make sure we have the blocks
      resolve ? resolvePath({ ipns, ipld }, value) : Promise.resolve()
    ]);

    const bytes = uint8ArrayFromString$4(value);

    // Start publishing process
    const result = await ipns.publish(results[0], bytes, pubLifetime);

    return {
      name: result.name,
      value: uint8ArrayToString$4(result.value)
    }
  }

  return withTimeoutOption$15(publish)
};

const debug$3 = require$$2$4;
const errcode$1 = require$$1$1;
const { mergeOptions: mergeOptions$f } = utils$6;
const CID$h = require$$0$1;
// @ts-ignore no types
const isDomain = require$$4$4;
const uint8ArrayToString$3 = require$$4$2;

const log$l = Object.assign(debug$3('ipfs:name:resolve'), {
  error: debug$3('ipfs:name:resolve:error')
});

const { OFFLINE_ERROR } = utils$6;
const withTimeoutOption$14 = require$$0;

/**
 *
 * @param {string} result
 * @param {string[]} remainder
 * @returns {string}
 */
const appendRemainder = (result, remainder) =>
  remainder.length > 0
    ? result + '/' + remainder.join('/')
    : result;

/**
 * IPNS - Inter-Planetary Naming System
 *
 * @param {Object} config
 * @param {import('ipfs-core-types/src/root').API["dns"]} config.dns
 * @param {import('../ipns')} config.ipns
 * @param {import('peer-id')} config.peerId
 * @param {import('ipfs-core-types/src/root').API["isOnline"]} config.isOnline
 * @param {import('../../types').Options} config.options
 */
var resolve = ({ dns, ipns, peerId, isOnline, options: { offline } }) => {
  /**
   * @type {import('ipfs-core-types/src/name').API["resolve"]}
   */
  async function * resolve (name, options = {}) { // eslint-disable-line require-await
    options = mergeOptions$f({
      nocache: false,
      recursive: true
    }, options);

    // TODO: params related logic should be in the core implementation
    if (offline && options && options.nocache) {
      throw errcode$1(new Error('cannot specify both offline and nocache'), 'ERR_NOCACHE_AND_OFFLINE')
    }

    // Set node id as name for being resolved, if it is not received
    if (!name) {
      name = peerId.toB58String();
    }

    if (!name.startsWith('/ipns/')) {
      name = `/ipns/${name}`;
    }

    const [namespace, hash, ...remainder] = name.slice(1).split('/');
    try {
      new CID$h(hash); // eslint-disable-line no-new
    } catch (err) {
      // lets check if we have a domain ex. /ipns/ipfs.io and resolve with dns
      if (isDomain(hash)) {
        yield appendRemainder(await dns(hash, options), remainder);
        return
      }

      log$l.error(err);
      throw errcode$1(new Error('Invalid IPNS name'), 'ERR_IPNS_INVALID_NAME')
    }

    // multihash is valid lets resolve with IPNS
    // IPNS resolve needs a online daemon
    if (!isOnline() && !offline) {
      throw errcode$1(new Error(OFFLINE_ERROR), 'OFFLINE_ERROR')
    }

    // TODO: convert ipns.resolve to return an iterator
    const value = await ipns.resolve(`/${namespace}/${hash}`, options);
    yield appendRemainder(value instanceof Uint8Array ? uint8ArrayToString$3(value) : value, remainder);
  }

  return withTimeoutOption$14(resolve)
};

var utils$3 = {};

const IpnsPubsubDatastore = pubsubDatastore;
const errcode = require$$1$1;

/**
 * @typedef {import('../../../types').ExperimentalOptions} ExperimentalOptions
 * @property {boolean} [ipnsPubsub] - Enable pub-sub on IPNS. (Default: `false`)
 */

/**
 * Get pubsub from IPNS routing
 *
 * @param {import('../../ipns')} ipns
 * @param {ExperimentalOptions} [options]
 */
utils$3.getPubsubRouting = (ipns, options) => {
  if (!ipns || !(options && options.ipnsPubsub)) {
    throw errcode(new Error('IPNS pubsub subsystem is not enabled'), 'ERR_IPNS_PUBSUB_NOT_ENABLED')
  }

  // Only one store and it is pubsub
  if (ipns.routing instanceof IpnsPubsubDatastore) {
    return ipns.routing
  }

  // Find in tiered
  const pubsub = (ipns.routing.stores || []).find(s => s instanceof IpnsPubsubDatastore);

  if (!pubsub) {
    throw errcode(new Error('IPNS pubsub datastore not found'), 'ERR_PUBSUB_DATASTORE_NOT_FOUND')
  }

  return pubsub
};

const { getPubsubRouting: getPubsubRouting$2 } = utils$3;
const withTimeoutOption$13 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../ipns')} config.ipns
 * @param {import('../../../types').Options} config.options
 */
var cancel = ({ ipns, options }) => {
  const experimental = options.EXPERIMENTAL;

  /**
   * @type {import('ipfs-core-types/src/name/pubsub').API["cancel"]}
   */
  async function cancel (name, options = {}) { // eslint-disable-line require-await
    const pubsub = getPubsubRouting$2(ipns, experimental);
    return pubsub.cancel(name, options)
  }

  return withTimeoutOption$13(cancel)
};

const { getPubsubRouting: getPubsubRouting$1 } = utils$3;
const withTimeoutOption$12 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../ipns')} config.ipns
 * @param {import('../../../types').Options} config.options
 */
var state = ({ ipns, options }) => {
  const experimental = options.EXPERIMENTAL;

  /**
   * @type {import('ipfs-core-types/src/name/pubsub').API["state"]}
   */
  async function state (_options = {}) { // eslint-disable-line require-await
    try {
      return { enabled: Boolean(getPubsubRouting$1(ipns, experimental)) }
    } catch (err) {
      return { enabled: false }
    }
  }

  return withTimeoutOption$12(state)
};

const { getPubsubRouting } = utils$3;
const withTimeoutOption$11 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../ipns')} config.ipns
 * @param {import('../../../types').Options} config.options
 */
var subs = ({ ipns, options }) => {
  const experimental = options.EXPERIMENTAL;

  /**
   * @type {import('ipfs-core-types/src/name/pubsub').API["subs"]}
   */
  async function subs (options = {}) { // eslint-disable-line require-await
    const pubsub = getPubsubRouting(ipns, experimental);
    return pubsub.getSubscriptions(options)
  }

  return withTimeoutOption$11(subs)
};

const createCancelAPI = cancel;
const createStateAPI = state;
const createSubsAPI = subs;

class PubSubAPI$1 {
  /**
   * @param {Object} config
   * @param {import('../../ipns')} config.ipns
   * @param {import('../../../types').Options} config.options
   */
  constructor ({ ipns, options }) {
    this.cancel = createCancelAPI({ ipns, options });
    this.state = createStateAPI({ ipns, options });
    this.subs = createSubsAPI({ ipns, options });
  }
}
var pubsub$1 = PubSubAPI$1;

const createPublishAPI = publish;
const createResolveAPI$1 = resolve;
const PubSubAPI = pubsub$1;

class NameAPI$1 {
  /**
   * @param {Object} config
   * @param {import('../ipns')} config.ipns
   * @param {import('peer-id')} config.peerId
   * @param {import('../../types').Options} config.options
   * @param {import('ipld')} config.ipld
   * @param {import('ipfs-core-types/src/root').API["isOnline"]} config.isOnline
   * @param {import('libp2p/src/keychain')} config.keychain
   * @param {import('ipfs-core-types/src/root').API["dns"]} config.dns
   */
  constructor ({ dns, ipns, ipld, peerId, isOnline, keychain, options }) {
    this.publish = createPublishAPI({ ipns, ipld, peerId, isOnline, keychain });
    this.resolve = createResolveAPI$1({ dns, ipns, peerId, isOnline, options });
    this.pubsub = new PubSubAPI({ ipns, options });
  }
}

var name$1 = NameAPI$1;

var refs = {exports: {}};

const CID$g = require$$0$1;
const { DAGNode: DAGNode$b } = require$$0$9;
const { Errors: Errors$1 } = require$$2;
const ERR_NOT_FOUND$1 = Errors$1.notFoundError().code;
const withTimeoutOption$10 = require$$0;
const toCIDAndPath = require$$1;

const Format = {
  default: '<dst>',
  edges: '<src> -> <dst>'
};

/**
 * @typedef {object} Node
 * @property {string} [name]
 * @property {CID} cid
 *
 * @typedef {object} TraversalResult
 * @property {Node} parent
 * @property {Node} node
 * @property {boolean} isDuplicate
 */

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('ipfs-core-types/src/root').API["resolve"]} config.resolve
 * @param {import('../../types').Preload} config.preload
 */
refs.exports = function ({ ipld, resolve, preload }) {
  /**
   * @type {import('ipfs-core-types/src/refs').API["refs"]}
   */
  async function * refs (ipfsPath, options = {}) {
    if (options.maxDepth === 0) {
      return
    }

    if (options.edges && options.format && options.format !== Format.default) {
      throw new Error('Cannot set edges to true and also specify format')
    }

    options.format = options.edges ? Format.edges : options.format;

    if (typeof options.maxDepth !== 'number') {
      options.maxDepth = options.recursive ? Infinity : 1;
    }

    /** @type {(string|CID)[]} */
    const rawPaths = Array.isArray(ipfsPath) ? ipfsPath : [ipfsPath];

    const paths = rawPaths.map(p => getFullPath(preload, p, options));

    for (const path of paths) {
      yield * refsStream(resolve, ipld, path, options);
    }
  }

  return withTimeoutOption$10(refs)
};

refs.exports.Format = Format;

/**
 * @param {import('../../types').Preload} preload
 * @param {string | CID} ipfsPath
 * @param {import('ipfs-core-types/src/refs').RefsOptions} options
 */
function getFullPath (preload, ipfsPath, options) {
  const {
    cid,
    path
  } = toCIDAndPath(ipfsPath);

  if (options.preload !== false) {
    preload(cid);
  }

  return `/ipfs/${cid}${path || ''}`
}

/**
 * Get a stream of refs at the given path
 *
 * @param {import('ipfs-core-types/src/root').API["resolve"]} resolve
 * @param {import('ipld')} ipld
 * @param {string} path
 * @param {import('ipfs-core-types/src/refs').RefsOptions} options
 */
async function * refsStream (resolve, ipld, path, options) {
  // Resolve to the target CID of the path
  const resPath = await resolve(path);
  const {
    cid
  } = toCIDAndPath(resPath);

  const maxDepth = options.maxDepth != null ? options.maxDepth : Infinity;
  const unique = options.unique || false;

  // Traverse the DAG, converting it into a stream
  for await (const obj of objectStream(ipld, cid, maxDepth, unique)) {
    // Root object will not have a parent
    if (!obj.parent) {
      continue
    }

    // Filter out duplicates (isDuplicate flag is only set if options.unique is set)
    if (obj.isDuplicate) {
      continue
    }

    // Format the links
    // Clients expect refs to be in the format { ref: <ref> }
    yield {
      ref: formatLink(obj.parent.cid, obj.node.cid, obj.node.name, options.format)
    };
  }
}

/**
 * Get formatted link
 *
 * @param {CID} srcCid
 * @param {CID} dstCid
 * @param {string} [linkName]
 * @param {string} [format]
 */
function formatLink (srcCid, dstCid, linkName = '', format = Format.default) {
  let out = format.replace(/<src>/g, srcCid.toString());
  out = out.replace(/<dst>/g, dstCid.toString());
  out = out.replace(/<linkname>/g, linkName);
  return out
}

/**
 * Do a depth first search of the DAG, starting from the given root cid
 *
 * @param {import('ipld')} ipld
 * @param {CID} rootCid
 * @param {number} maxDepth
 * @param {boolean} uniqueOnly
 */
async function * objectStream (ipld, rootCid, maxDepth, uniqueOnly) { // eslint-disable-line require-await
  const seen = new Set();

  /**
   * @param {Node} parent
   * @param {number} depth
   * @returns {AsyncGenerator<TraversalResult, void, undefined>}
   */
  async function * traverseLevel (parent, depth) {
    const nextLevelDepth = depth + 1;

    // Check the depth
    if (nextLevelDepth > maxDepth) {
      return
    }

    // Get this object's links
    try {
      // Look at each link, parent and the new depth
      for (const link of await getLinks(ipld, parent.cid)) {
        yield {
          parent: parent,
          node: link,
          isDuplicate: uniqueOnly && seen.has(link.cid.toString())
        };

        if (uniqueOnly) {
          seen.add(link.cid.toString());
        }

        yield * traverseLevel(link, nextLevelDepth);
      }
    } catch (err) {
      if (err.code === ERR_NOT_FOUND$1) {
        err.message = `Could not find object with CID: ${parent.cid}`;
      }

      throw err
    }
  }

  yield * traverseLevel({ cid: rootCid }, 0);
}

/**
 * Fetch a node from IPLD then get all its links
 *
 * @param {import('ipld')} ipld
 * @param {CID} cid
 */
async function getLinks (ipld, cid) {
  const node = await ipld.get(cid);

  if (node instanceof DAGNode$b) {
    /**
     * @param {import('ipld-dag-pb').DAGLink} arg
     */
    const mapper = ({ Name, Hash }) => ({ name: Name, cid: Hash });
    return node.Links.map(mapper)
  }

  return getNodeLinks(node)
}

/**
 * Recursively search the node for CIDs
 *
 * @param {object} node
 * @param {string} [path]
 * @returns {Node[]}
 */
function getNodeLinks (node, path = '') {
  /** @type {Node[]} */
  let links = [];
  for (const [name, value] of Object.entries(node)) {
    if (CID$g.isCID(value)) {
      links.push({
        name: path + name,
        cid: value
      });
    } else if (typeof value === 'object') {
      links = links.concat(getNodeLinks(value, path + name + '/'));
    }
  }
  return links
}

const withTimeoutOption$$ = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var local = function ({ repo }) {
  /**
   * @type {import('ipfs-core-types/src/refs').API["local"]}
   */
  async function * refsLocal (options = {}) {
    for await (const cid of repo.blocks.queryKeys({}, { signal: options.signal })) {
      yield { ref: cid.toString() };
    }
  }

  return withTimeoutOption$$(refsLocal)
};

const withTimeoutOption$_ = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var wantlist = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/bitswap').API["wantlist"]}
   */
  async function wantlist (options = {}) {
    const { bitswap } = await network.use(options);
    const list = bitswap.getWantlist();

    return Array.from(list).map(e => e[1].cid)
  }

  return withTimeoutOption$_(wantlist)
};

const PeerId$5 = require$$0$6;
const withTimeoutOption$Z = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var wantlistForPeer = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/bitswap').API["wantlistForPeer"]}
   */
  async function wantlistForPeer (peerId, options = {}) {
    const { bitswap } = await network.use(options);
    const list = bitswap.wantlistForPeer(PeerId$5.createFromCID(peerId), options);

    return Array.from(list).map(e => e[1].cid)
  }

  return withTimeoutOption$Z(wantlistForPeer)
};

const CID$f = require$$0$1;
const errCode$p = require$$1$1;
const withTimeoutOption$Y = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var unwant = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/bitswap').API["unwant"]}
   */
  async function unwant (cids, options = {}) {
    const { bitswap } = await network.use(options);

    if (!Array.isArray(cids)) {
      cids = [cids];
    }

    try {
      cids = cids.map((cid) => new CID$f(cid));
    } catch (err) {
      throw errCode$p(err, 'ERR_INVALID_CID')
    }

    return bitswap.unwant(cids)
  }

  return withTimeoutOption$Y(unwant)
};

const withTimeoutOption$X = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var stat$7 = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/bitswap').API["stat"]}
   */
  async function stat (options = {}) {
    /** @type {import('ipfs-bitswap')} */
    const bitswap = (await network.use(options)).bitswap;
    const snapshot = bitswap.stat().snapshot;

    return {
      provideBufLen: parseInt(snapshot.providesBufferLength.toString()),
      blocksReceived: BigInt(snapshot.blocksReceived.toString()),
      wantlist: Array.from(bitswap.getWantlist()).map(e => e[1].cid),
      peers: bitswap.peers().map(id => id.toB58String()),
      dupBlksReceived: BigInt(snapshot.dupBlksReceived.toString()),
      dupDataReceived: BigInt(snapshot.dupDataReceived.toString()),
      dataReceived: BigInt(snapshot.dataReceived.toString()),
      blocksSent: BigInt(snapshot.blocksSent.toString()),
      dataSent: BigInt(snapshot.dataSent.toString())
    }
  }

  return withTimeoutOption$X(stat)
};

const createWantlist = wantlist;
const createWantlistForPeer = wantlistForPeer;
const createUnwant = unwant;
const createStat$3 = stat$7;

/**
 * @typedef {import('../../types').NetworkService} NetworkService
 * @typedef {import('peer-id')} PeerId
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

class BitswapAPI$1 {
  /**
   * @param {Object} config
   * @param {NetworkService} config.network
   */
  constructor ({ network }) {
    this.wantlist = createWantlist({ network });
    this.wantlistForPeer = createWantlistForPeer({ network });
    this.unwant = createUnwant({ network });
    this.stat = createStat$3({ network });
  }
}
var bitswap = BitswapAPI$1;

var utils$2 = {};

const isMultiaddr = require$$0$a.IPFS.matches;

/**
 * @param {any} ma
 */
utils$2.isValidMultiaddr = ma => {
  try {
    return isMultiaddr(ma)
  } catch (err) {
    return false
  }
};

const { isValidMultiaddr: isValidMultiaddr$1 } = utils$2;
const withTimeoutOption$W = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var add$1 = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/bootstrap').API["add"]}
   */
  async function add (multiaddr, options = {}) {
    if (!isValidMultiaddr$1(multiaddr)) {
      throw new Error(`${multiaddr} is not a valid Multiaddr`)
    }

    /** @type {import('ipfs-core-types/src/config').Config} */
    // @ts-ignore repo returns type unknown
    const config = await repo.config.getAll(options);

    const boostrappers = config.Bootstrap || [];
    boostrappers.push(multiaddr.toString());

    config.Bootstrap = Array.from(
      new Set(boostrappers)
    ).sort((a, b) => a.localeCompare(b));

    await repo.config.replace(config);

    return {
      Peers: [multiaddr]
    }
  }

  return withTimeoutOption$W(add)
};

const withTimeoutOption$V = require$$0;
const { Multiaddr: Multiaddr$4 } = require$$1$7;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var clear = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/bootstrap').API["clear"]}
   */
  async function clear (options = {}) {
    /** @type {import('ipfs-core-types/src/config').Config} */
    // @ts-ignore repo returns type unknown
    const config = await repo.config.getAll(options);
    const removed = config.Bootstrap || [];
    config.Bootstrap = [];

    await repo.config.replace(config);

    return { Peers: removed.map(ma => new Multiaddr$4(ma)) }
  }

  return withTimeoutOption$V(clear)
};

const withTimeoutOption$U = require$$0;
const { Multiaddr: Multiaddr$3 } = require$$1$7;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var list$1 = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/bootstrap').API["list"]}
   */
  async function list (options = {}) {
    /** @type {string[]|null} */
    const peers = (await repo.config.get('Bootstrap', options));
    return { Peers: (peers || []).map(ma => new Multiaddr$3(ma)) }
  }

  return withTimeoutOption$U(list)
};

var configNodejs = () => ({
  Addresses: {
    Swarm: [
    ],
    Announce: [],
    NoAnnounce: [],
    API: '',
    Gateway: '',
    RPC: '',
    Delegates: [
      '/dns4/node0.delegate.ipfs.io/tcp/443/https',
      '/dns4/node1.delegate.ipfs.io/tcp/443/https',
      '/dns4/node2.delegate.ipfs.io/tcp/443/https',
      '/dns4/node3.delegate.ipfs.io/tcp/443/https'
    ]
  },
  Discovery: {
    MDNS: {
      Enabled: false,
      Interval: 10
    },
    webRTCStar: {
      Enabled: true
    }
  },
  Bootstrap: [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
    '/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
    '/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
    '/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS',
    '/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN'
  ],
  Pubsub: {
    Enabled: true
  },
  Swarm: {
    ConnMgr: {
      LowWater: 200,
      HighWater: 500
    },
    DisableNatPortMap: true
  },
  Routing: {
    Type: 'none'
  }
});

const defaultConfig = configNodejs;
const withTimeoutOption$T = require$$0;
const { Multiaddr: Multiaddr$2 } = require$$1$7;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var reset = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/bootstrap').API["reset"]}
   */
  async function reset (options = {}) {
    /** @type {import('ipfs-core-types/src/config').Config} */
    // @ts-ignore repo returns type unknown
    const config = await repo.config.getAll(options);
    config.Bootstrap = defaultConfig().Bootstrap;

    await repo.config.replace(config);

    return {
      Peers: defaultConfig().Bootstrap.map(ma => new Multiaddr$2(ma))
    }
  }

  return withTimeoutOption$T(reset)
};

const { isValidMultiaddr } = utils$2;
const withTimeoutOption$S = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var rm$5 = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/bootstrap').API["rm"]}
   */
  async function rm (multiaddr, options = {}) {
    if (!isValidMultiaddr(multiaddr)) {
      throw new Error(`${multiaddr} is not a valid Multiaddr`)
    }

    /** @type {import('ipfs-core-types/src/config').Config} */
    // @ts-ignore repo returns type unknown
    const config = await repo.config.getAll(options);
    config.Bootstrap = (config.Bootstrap || []).filter(ma => ma.toString() !== multiaddr.toString());

    await repo.config.replace(config);

    return { Peers: [multiaddr] }
  }

  return withTimeoutOption$S(rm)
};

const createAdd = add$1;
const createClear = clear;
const createList$1 = list$1;
const createReset = reset;
const createRm$2 = rm$5;
class BootstrapAPI$1 {
  /**
   * @param {Object} config
   * @param {import('ipfs-repo')} config.repo
   */
  constructor ({ repo }) {
    this.add = createAdd({ repo });
    this.list = createList$1({ repo });
    this.rm = createRm$2({ repo });
    this.clear = createClear({ repo });
    this.reset = createReset({ repo });
  }
}
var bootstrap = BootstrapAPI$1;

var utils$1 = {};

const CID$e = require$$0$1;
const errCode$o = require$$1$1;

/**
 * @param {string|Uint8Array|CID} cid
 * @returns {CID}
 */
utils$1.cleanCid = cid => {
  if (CID$e.isCID(cid)) {
    return cid
  }

  // CID constructor knows how to do the cleaning :)
  try {
    // @ts-ignore - string|Uint8Array union seems to confuse CID typedefs.
    return new CID$e(cid)
  } catch (err) {
    throw errCode$o(err, 'ERR_INVALID_CID')
  }
};

const { cleanCid: cleanCid$2 } = utils$1;
const withTimeoutOption$R = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-block-service')} config.blockService
 * @param {import('../../types').Preload} config.preload
 */
var get$6 = ({ blockService, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/block').API["get"]}
   */
  async function get (cid, options = {}) { // eslint-disable-line require-await
    cid = cleanCid$2(cid);

    if (options.preload !== false) {
      preload(cid);
    }

    return blockService.get(cid, options)
  }

  return withTimeoutOption$R(get)
};

const Block = require$$0$b;
const multihashing$1 = require$$1$3;
const CID$d = require$$0$1;
const isIPFS$1 = require$$0$3;
const withTimeoutOption$Q = require$$0;

/**
 * @typedef {import('cids').CIDVersion} CIDVersion
 */

/**
 * @param {Object} config
 * @param {import('ipfs-block-service')} config.blockService
 * @param {import('ipfs-core-types/src/pin').API} config.pin
 * @param {import('.').GCLock} config.gcLock
 * @param {import('../../types').Preload} config.preload
 */
var put$2 = ({ blockService, pin, gcLock, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/block').API["put"]}
   */
  async function put (block, options = {}) {
    if (Array.isArray(block)) {
      throw new Error('Array is not supported')
    }

    if (!Block.isBlock(block)) {
      /** @type {Uint8Array} */
      const bytes = (block);
      if (options.cid && isIPFS$1.cid(options.cid)) {
        const cid = CID$d.isCID(options.cid) ? options.cid : new CID$d(options.cid);
        block = new Block(bytes, cid);
      } else {
        const mhtype = options.mhtype || 'sha2-256';
        const format = options.format || 'dag-pb';

        /** @type {CIDVersion} */
        let cidVersion = 1;

        if (options.version == null) {
          // Pick appropriate CID version
          cidVersion = mhtype === 'sha2-256' && format === 'dag-pb' ? 0 : 1;
        } else {
          // @ts-ignore - options.version is a {number} but the CID constructor arg version is a {0|1}
          // TODO: https://github.com/multiformats/js-cid/pull/129
          cidVersion = options.version;
        }

        const multihash = await multihashing$1(bytes, mhtype);
        const cid = new CID$d(cidVersion, format, multihash);

        block = new Block(bytes, cid);
      }
    }

    const release = await gcLock.readLock();

    try {
      await blockService.put(block, {
        signal: options.signal
      });

      if (options.preload !== false) {
        preload(block.cid);
      }

      if (options.pin === true) {
        await pin.add(block.cid, {
          recursive: true,
          signal: options.signal
        });
      }

      return block
    } finally {
      release();
    }
  }

  return withTimeoutOption$Q(put)
};

const CID$c = require$$0$1;
const errCode$n = require$$1$1;
const { parallelMap, filter } = require$$2$8;
const { pipe: pipe$2 } = require$$3$1;
const { PinTypes } = pinManager;
const { cleanCid: cleanCid$1 } = utils$1;
const withTimeoutOption$P = require$$0;

const BLOCK_RM_CONCURRENCY$1 = 8;

/**
 * @param {Object} config
 * @param {import('ipfs-block-service')} config.blockService
 * @param {import('../pin/pin-manager')} config.pinManager
 * @param {import('.').GCLock} config.gcLock
 */
var rm$4 = ({ blockService, gcLock, pinManager }) => {
  /**
   * @type {import('ipfs-core-types/src/block').API["rm"]}
   */
  async function * rm (cids, options = {}) {
    if (!Array.isArray(cids)) {
      cids = [cids];
    }

    // We need to take a write lock here to ensure that adding and removing
    // blocks are exclusive operations
    const release = await gcLock.writeLock();

    try {
      yield * pipe$2(
        cids,
        parallelMap(BLOCK_RM_CONCURRENCY$1, async cid => {
          cid = cleanCid$1(cid);

          /** @type {import('ipfs-core-types/src/block').RmResult} */
          const result = { cid };

          try {
            const pinResult = await pinManager.isPinnedWithType(cid, PinTypes.all);

            if (pinResult.pinned) {
              if (CID$c.isCID(pinResult.reason)) { // eslint-disable-line max-depth
                throw errCode$n(new Error(`pinned via ${pinResult.reason}`), 'ERR_BLOCK_PINNED')
              }

              throw errCode$n(new Error(`pinned: ${pinResult.reason}`), 'ERR_BLOCK_PINNED')
            }

            // remove has check when https://github.com/ipfs/js-ipfs-block-service/pull/88 is merged
            // @ts-ignore - this accesses some internals
            const has = await blockService._repo.blocks.has(cid);

            if (!has) {
              throw errCode$n(new Error('block not found'), 'ERR_BLOCK_NOT_FOUND')
            }

            await blockService.delete(cid);
          } catch (err) {
            if (!options.force) {
              err.message = `cannot remove ${cid}: ${err.message}`;
              result.error = err;
            }
          }

          return result
        }),
        filter(() => !options.quiet)
      );
    } finally {
      release();
    }
  }

  return withTimeoutOption$P(rm)
};

const { cleanCid } = utils$1;
const withTimeoutOption$O = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-block-service')} config.blockService
 * @param {import('../../types').Preload} config.preload
 */

var stat$6 = ({ blockService, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/block').API["stat"]}
   */
  async function stat (cid, options = {}) {
    cid = cleanCid(cid);

    if (options.preload !== false) {
      preload(cid);
    }

    const block = await blockService.get(cid);

    return { cid, size: block.data.length }
  }

  return withTimeoutOption$O(stat)
};

const createGet$2 = get$6;
const createPut$2 = put$2;
const createRm$1 = rm$4;
const createStat$2 = stat$6;

/**
 * @typedef {import('../../types').Preload} Preload
 * @typedef {import('ipfs-block-service')} BlockService
 * @typedef {import('../gc-lock').GCLock} GCLock
 * @typedef {import('ipfs-core-types/src/pin').API} Pin
 * @typedef {import('../pin/pin-manager')} PinManager
 */

class BlockAPI$1 {
  /**
   * @param {Object} config
   * @param {Preload} config.preload
   * @param {BlockService} config.blockService
   * @param {GCLock} config.gcLock
   * @param {Pin} config.pin
   * @param {PinManager} config.pinManager
   */
  constructor ({ blockService, preload, gcLock, pinManager, pin }) {
    this.get = createGet$2({ blockService, preload });
    this.put = createPut$2({ blockService, preload, gcLock, pin });
    this.rm = createRm$1({ blockService, gcLock, pinManager });
    this.stat = createStat$2({ blockService, preload });
  }
}

var block = BlockAPI$1;

const last$5 = require$$0$5;

/**
 * @param {Object} context
 * @param {import('ipfs-core-types/src/root').API["addAll"]} context.addAll
 */
var add = ({ addAll }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["add"]}
   */
  async function add (entry, options = {}) {
    // @ts-ignore TODO: https://github.com/ipfs/js-ipfs/issues/3290
    const result = await last$5(addAll(entry, options));
    // Note this should never happen as `addAll` should yield at least one item
    // but to satisfy type checker we perfom this check and for good measure
    // throw an error in case it does happen.
    if (result == null) {
      throw Error('Failed to add a file, if you see this please report a bug')
    }

    return result
  }

  return add
};

/**
 * @typedef {Object} FixedChunkerOptions
 * @property {'fixed'} chunker
 * @property {number} [maxChunkSize]
 *
 * @typedef {Object} RabinChunkerOptions
 * @property {'rabin'} chunker
 * @property {number} avgChunkSize
 * @property {number} [minChunkSize]
 * @property {number} [maxChunkSize]
 *
 * @typedef {FixedChunkerOptions|RabinChunkerOptions} ChunkerOptions
 *
 * Parses chunker string into options used by DAGBuilder in ipfs-unixfs-engine
 *
 *
 * @param  {string} [chunker] - Chunker algorithm supported formats:
 * "size-{size}"
 * "rabin"
 * "rabin-{avg}"
 * "rabin-{min}-{avg}-{max}"
 *
 * @returns {ChunkerOptions}   Chunker options for DAGBuilder
 */
const parseChunkerString$1 = (chunker) => {
  if (!chunker) {
    return {
      chunker: 'fixed'
    }
  } else if (chunker.startsWith('size-')) {
    const sizeStr = chunker.split('-')[1];
    const size = parseInt(sizeStr);
    if (isNaN(size)) {
      throw new Error('Chunker parameter size must be an integer')
    }
    return {
      chunker: 'fixed',
      maxChunkSize: size
    }
  } else if (chunker.startsWith('rabin')) {
    return {
      chunker: 'rabin',
      ...parseRabinString(chunker)
    }
  } else {
    throw new Error(`Unrecognized chunker option: ${chunker}`)
  }
};

/**
 * @typedef {Object} RabinChunkerSettings
 * @property {number} avgChunkSize
 * @property {number} [minChunkSize]
 * @property {number} [maxChunkSize]
 *
 * Parses rabin chunker string
 *
 * @param  {string}   chunker - Chunker algorithm supported formats:
 * "rabin"
 * "rabin-{avg}"
 * "rabin-{min}-{avg}-{max}"
 *
 * @returns {RabinChunkerSettings}   rabin chunker options
 */
const parseRabinString = (chunker) => {
  const options = {};
  const parts = chunker.split('-');
  switch (parts.length) {
    case 1:
      options.avgChunkSize = 262144;
      break
    case 2:
      options.avgChunkSize = parseChunkSize(parts[1], 'avg');
      break
    case 4:
      options.minChunkSize = parseChunkSize(parts[1], 'min');
      options.avgChunkSize = parseChunkSize(parts[2], 'avg');
      options.maxChunkSize = parseChunkSize(parts[3], 'max');
      break
    default:
      throw new Error('Incorrect chunker format (expected "rabin" "rabin-[avg]" or "rabin-[min]-[avg]-[max]"')
  }

  return options
};

/**
 *
 * @param {string} str
 * @param {string} name
 * @returns {number}
 */
const parseChunkSize = (str, name) => {
  const size = parseInt(str);
  if (isNaN(size)) {
    throw new Error(`Chunker parameter ${name} must be an integer`)
  }

  return size
};

var utils = {
  parseChunkSize,
  parseRabinString,
  parseChunkerString: parseChunkerString$1
};

const { importer: importer$2 } = require$$0$c;
const normaliseAddInput = require$$1$8;
const { parseChunkerString } = utils;
const { pipe: pipe$1 } = require$$3$1;
const withTimeoutOption$N = require$$0;
const mergeOptions$e = require$$0$2.bind({ ignoreUndefined: true });

/**
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-unixfs-importer').ImportResult} ImportResult
 */

/**
 * @typedef {Object} Context
 * @property {import('ipfs-core-types/src/block').API} block
 * @property {import('../gc-lock').GCLock} gcLock
 * @property {import('../../types').Preload} preload
 * @property {import('ipfs-core-types/src/pin').API} pin
 * @property {import('ipfs-core-types/src/root').ShardingOptions} [options]
 *
 * @param {Context} context
 */
var addAll = ({ block, gcLock, preload, pin, options }) => {
  const isShardingEnabled = options && options.sharding;

  /**
   * @type {import('ipfs-core-types/src/root').API["addAll"]}
   */
  async function * addAll (source, options = {}) {
    const opts = mergeOptions$e({
      shardSplitThreshold: isShardingEnabled ? 1000 : Infinity,
      strategy: 'balanced'
    }, options, {
      ...parseChunkerString(options.chunker)
    });

    // CID v0 is for multihashes encoded with sha2-256
    if (opts.hashAlg && opts.hashAlg !== 'sha2-256' && opts.cidVersion !== 1) {
      opts.cidVersion = 1;
    }

    if (opts.trickle) {
      opts.strategy = 'trickle';
    }

    if (opts.strategy === 'trickle') {
      opts.leafType = 'raw';
      opts.reduceSingleLeafToSelf = false;
    }

    if (opts.cidVersion > 0 && opts.rawLeaves === undefined) {
      // if the cid version is 1 or above, use raw leaves as this is
      // what go does.
      opts.rawLeaves = true;
    }

    if (opts.hashAlg !== undefined && opts.rawLeaves === undefined) {
      // if a non-default hash alg has been specified, use raw leaves as this is
      // what go does.
      opts.rawLeaves = true;
    }

    delete opts.trickle;

    /** @type {Record<string, number>} */
    const totals = {};

    if (opts.progress) {
      const prog = opts.progress;

      /**
       * @param {number} bytes
       * @param {string} path
       */
      opts.progress = (bytes, path) => {
        if (!totals[path]) {
          totals[path] = 0;
        }

        totals[path] += bytes;

        prog(totals[path], path);
      };
    }

    const iterator = pipe$1(
      normaliseAddInput(source),
      /**
       * @param {AsyncIterable<import('ipfs-unixfs-importer').ImportCandidate>} source
       */
      source => importer$2(source, block, {
        ...opts,
        pin: false
      }),
      transformFile(opts),
      preloadFile(preload, opts),
      pinFile(pin, opts)
    );

    const releaseLock = await gcLock.readLock();

    try {
      for await (const added of iterator) {
        // do not keep file totals around forever
        delete totals[added.path];

        yield added;
      }
    } finally {
      releaseLock();
    }
  }

  return withTimeoutOption$N(addAll)
};

/**
 * @param {import('ipfs-core-types/src/root').AddAllOptions} opts
 */
function transformFile (opts) {
  /**
   * @param {AsyncGenerator<ImportResult, void, undefined>} source
   */
  async function * transformFile (source) {
    for await (const file of source) {
      let cid = file.cid;

      if (opts.cidVersion === 1) {
        cid = cid.toV1();
      }

      let path = file.path ? file.path : cid.toString();

      if (opts.wrapWithDirectory && !file.path) {
        path = '';
      }

      yield {
        path,
        cid,
        size: file.size,
        mode: file.unixfs && file.unixfs.mode,
        mtime: file.unixfs && file.unixfs.mtime
      };
    }
  }

  return transformFile
}

/**
 * @param {(cid: CID) => void} preload
 * @param {import('ipfs-core-types/src/root').AddAllOptions} opts
 */
function preloadFile (preload, opts) {
  /**
   * @param {AsyncGenerator<ImportResult, void, undefined>} source
   */
  async function * maybePreloadFile (source) {
    for await (const file of source) {
      const isRootFile = !file.path || opts.wrapWithDirectory
        ? file.path === ''
        : !file.path.includes('/');

      const shouldPreload = isRootFile && !opts.onlyHash && opts.preload !== false;

      if (shouldPreload) {
        preload(file.cid);
      }

      yield file;
    }
  }

  return maybePreloadFile
}

/**
 * @param {import('ipfs-core-types/src/pin').API} pin
 * @param {import('ipfs-core-types/src/root').AddAllOptions} opts
 */
function pinFile (pin, opts) {
  /**
   * @param {AsyncGenerator<ImportResult, void, undefined>} source
   */
  async function * maybePinFile (source) {
    for await (const file of source) {
      // Pin a file if it is the root dir of a recursive add or the single file
      // of a direct add.
      const isRootDir = !(file.path && file.path.includes('/'));
      const shouldPin = (opts.pin == null ? true : opts.pin) && isRootDir && !opts.onlyHash;

      if (shouldPin) {
        // Note: addAsyncIterator() has already taken a GC lock, so tell
        // pin.add() not to take a (second) GC lock
        await pin.add(file.cid, {
          preload: false,
          lock: false
        });
      }

      yield file;
    }
  }

  return maybePinFile
}

const { exporter: exporter$7 } = require$$0$d;
const { normalizeCidPath: normalizeCidPath$2 } = utils$6;
const withTimeoutOption$M = require$$0;
const CID$b = require$$0$1;

/**
 * @typedef {Object} Context
 * @property {import('ipld')} ipld
 * @property {import('../types').Preload} preload
 *
 * @param {Context} context
 */
var cat = function ({ ipld, preload }) {
  /**
   * @type {import('ipfs-core-types/src/root').API["cat"]}
   */
  async function * cat (ipfsPath, options = {}) {
    ipfsPath = normalizeCidPath$2(ipfsPath);

    if (options.preload !== false) {
      const pathComponents = ipfsPath.split('/');
      preload(new CID$b(pathComponents[0]));
    }

    const file = await exporter$7(ipfsPath, ipld, options);

    // File may not have unixfs prop if small & imported with rawLeaves true
    if (file.type === 'directory') {
      throw new Error('this dag node is a directory')
    }

    if (!file.content) {
      throw new Error('this dag node has no content')
    }

    yield * file.content(options);
  }

  return withTimeoutOption$M(cat)
};

const exporter$6 = require$$0$d;
const errCode$m = require$$1$1;
const { normalizeCidPath: normalizeCidPath$1, mapFile: mapFile$1 } = utils$6;
const withTimeoutOption$L = require$$0;
const CID$a = require$$0$1;

/**
 * @typedef {Object} Context
 * @property {import('ipld')} ipld
 * @property {import('../types').Preload} preload
 *
 * @param {Context} context
 */
var get$5 = function ({ ipld, preload }) {
  /**
   * @type {import('ipfs-core-types/src/root').API["get"]}
   */
  async function * get (ipfsPath, options = {}) {
    if (options.preload !== false) {
      let pathComponents;

      try {
        pathComponents = normalizeCidPath$1(ipfsPath).split('/');
      } catch (err) {
        throw errCode$m(err, 'ERR_INVALID_PATH')
      }

      preload(new CID$a(pathComponents[0]));
    }

    for await (const file of exporter$6.recursive(ipfsPath, ipld, options)) {
      yield mapFile$1(file, {
        ...options,
        includeContent: true
      });
    }
  }

  return withTimeoutOption$L(get)
};

const { exporter: exporter$5, recursive: recursive$1 } = require$$0$d;
const errCode$l = require$$1$1;
const { normalizeCidPath, mapFile } = utils$6;
const withTimeoutOption$K = require$$0;
const CID$9 = require$$0$1;

/**
 * @typedef {Object} Context
 * @property {import('ipld')} ipld
 * @property {import('../types').Preload} preload
 *
 * @param {Context} context
 */
var ls$1 = function ({ ipld, preload }) {
  /**
   * @type {import('ipfs-core-types/src/root').API["ls"]}
   */
  async function * ls (ipfsPath, options = {}) {
    const path = normalizeCidPath(ipfsPath);
    const pathComponents = path.split('/');

    if (options.preload !== false) {
      preload(new CID$9(pathComponents[0]));
    }

    const file = await exporter$5(ipfsPath, ipld, options);

    if (file.type === 'file') {
      yield mapFile(file, options);
      return
    }

    if (file.type === 'directory') {
      if (options.recursive) {
        for await (const child of recursive$1(file.cid, ipld, options)) {
          if (file.cid.toBaseEncodedString() === child.cid.toBaseEncodedString()) {
            continue
          }

          yield mapFile(child, options);
        }

        return
      }

      for await (const child of file.content()) {
        const entry = mapFile(child, options);
        entry.depth--;

        yield entry;
      }

      return
    }

    throw errCode$l(new Error(`Unknown UnixFS type ${file.type}`), 'ERR_UNKNOWN_UNIXFS_TYPE')
  }

  return withTimeoutOption$K(ls)
};

const createAddAPI = add;
const createAddAllAPI = addAll;
const createCatAPI = cat;
const createGetAPI = get$5;
const createLsAPI = ls$1;

/**
 * @typedef {AddAllContext & CatContext & GetContext & ListContext } Context
 * @typedef {import('./add-all').Context} AddAllContext
 * @typedef {import('./cat').Context} CatContext
 * @typedef {import('./get').Context} GetContext
 * @typedef {import('./ls').Context} ListContext
 */
class Root {
  /**
   * @param {Context} context
   */
  constructor ({ preload, gcLock, pin, block, ipld, options }) {
    const addAll = createAddAllAPI({
      preload,
      gcLock,
      block,
      pin,
      options
    });

    this.addAll = addAll;
    this.add = createAddAPI({ addAll });
    this.cat = createCatAPI({ ipld, preload });
    this.get = createGetAPI({ ipld, preload });
    this.ls = createLsAPI({ ipld, preload });
  }
}

var root = Root;

var name = "ipfs-core";
var version$2 = "0.7.0";
var description = "JavaScript implementation of the IPFS specification";
var keywords = [
	"IPFS"
];
var homepage = "https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-core#readme";
var bugs = "https://github.com/ipfs/js-ipfs/issues";
var license = "(Apache-2.0 OR MIT)";
var leadMaintainer = "Alex Potsides <alex@achingbrain.net>";
var main = "src/index.js";
var types = "dist/src/index.d.ts";
var files$1 = [
	"src",
	"dist",
	"!dist/*.tsbuildinfo"
];
var browser = {
	"./src/runtime/init-assets-nodejs.js": "./src/runtime/init-assets-browser.js",
	"./src/runtime/config-nodejs.js": "./src/runtime/config-browser.js",
	"./src/runtime/dns-nodejs.js": "./src/runtime/dns-browser.js",
	"./src/runtime/libp2p-nodejs.js": "./src/runtime/libp2p-browser.js",
	"./src/runtime/libp2p-pubsub-routers-nodejs.js": "./src/runtime/libp2p-pubsub-routers-browser.js",
	"./src/runtime/preload-nodejs.js": "./src/runtime/preload-browser.js",
	"./src/runtime/repo-nodejs.js": "./src/runtime/repo-browser.js",
	"./test/utils/create-repo-nodejs.js": "./test/utils/create-repo-browser.js",
	"ipfs-utils/src/files/glob-source": false
};
var typesVersions = {
	"*": {
		"src/*": [
			"dist/src/*",
			"dist/src/*/index"
		],
		"src/": [
			"dist/src/index"
		]
	}
};
var repository = {
	type: "git",
	url: "git+https://github.com/ipfs/js-ipfs.git"
};
var scripts = {
	build: "aegir build",
	lint: "aegir lint",
	test: "aegir test",
	"test:node": "aegir test -t node",
	"test:browser": "aegir test -t browser",
	"test:webworker": "aegir test -t webworker",
	"test:electron-main": "aegir test -t electron-main",
	"test:electron-renderer": "aegir test -t electron-renderer",
	"test:bootstrapers": "IPFS_TEST=bootstrapers aegir test -t browser -f test/bootstrapers.js",
	coverage: "nyc --reporter=text --reporter=lcov npm run test:node",
	clean: "rimraf ./dist",
	"dep-check": "aegir dep-check -i interface-ipfs-core -i ipfs-core-types -i abort-controller"
};
var dependencies = {
	"abort-controller": "^3.0.0",
	"array-shuffle": "^2.0.0",
	cborg: "^1.2.1",
	cids: "^1.1.6",
	"dag-cbor-links": "^2.0.0",
	"datastore-core": "^4.0.0",
	"datastore-pubsub": "^0.6.1",
	debug: "^4.1.1",
	dlv: "^1.1.3",
	"err-code": "^3.0.1",
	"hamt-sharding": "^2.0.0",
	hashlru: "^2.3.0",
	"interface-datastore": "^4.0.0",
	"ipfs-bitswap": "^5.0.3",
	"ipfs-block-service": "^0.19.0",
	"ipfs-core-types": "^0.5.0",
	"ipfs-core-utils": "^0.8.1",
	"ipfs-repo": "^9.1.6",
	"ipfs-unixfs": "^4.0.3",
	"ipfs-unixfs-exporter": "^5.0.3",
	"ipfs-unixfs-importer": "^7.0.3",
	"ipfs-utils": "^7.0.0",
	ipld: "^0.30.0",
	"ipld-block": "^0.11.0",
	"ipld-dag-cbor": "^1.0.0",
	"ipld-dag-pb": "^0.22.1",
	"ipld-raw": "^7.0.0",
	ipns: "^0.11.0",
	"is-domain-name": "^1.0.1",
	"is-ipfs": "^5.0.0",
	"it-all": "^1.0.4",
	"it-drain": "^1.0.3",
	"it-first": "^1.0.4",
	"it-last": "^1.0.4",
	"it-map": "^1.0.4",
	"it-pipe": "^1.1.0",
	"just-safe-set": "^2.2.1",
	libp2p: "^0.31.5",
	"libp2p-bootstrap": "^0.12.3",
	"libp2p-crypto": "^0.19.3",
	"libp2p-floodsub": "^0.25.1",
	"libp2p-gossipsub": "^0.9.0",
	"libp2p-kad-dht": "^0.22.0",
	"libp2p-mdns": "^0.16.0",
	"libp2p-mplex": "^0.10.2",
	"libp2p-noise": "^3.0.0",
	"libp2p-record": "^0.10.3",
	"libp2p-tcp": "^0.15.4",
	"libp2p-webrtc-star": "^0.22.2",
	"libp2p-websockets": "^0.15.6",
	mafmt: "^9.0.0",
	"merge-options": "^3.0.4",
	mortice: "^2.0.0",
	multiaddr: "^9.0.1",
	"multiaddr-to-uri": "^7.0.0",
	multibase: "^4.0.2",
	multicodec: "^3.0.1",
	"multihashing-async": "^2.1.2",
	"native-abort-controller": "^1.0.3",
	"p-queue": "^6.6.1",
	"parse-duration": "^1.0.0",
	"peer-id": "^0.14.1",
	"streaming-iterables": "^5.0.2",
	uint8arrays: "^2.1.3"
};
var devDependencies = {
	"@types/dlv": "^1.1.2",
	aegir: "^33.0.0",
	delay: "^5.0.0",
	"go-ipfs": "0.8.0",
	"interface-ipfs-core": "^0.146.0",
	"ipfsd-ctl": "^8.0.1",
	"ipld-git": "^0.6.1",
	"iso-url": "^1.0.0",
	nanoid: "^3.1.12",
	rimraf: "^3.0.2",
	sinon: "^10.0.1"
};
var gitHead = "c40960358550b920d3291b8030715537a63c63e4";
var require$$4 = {
	name: name,
	version: version$2,
	description: description,
	keywords: keywords,
	homepage: homepage,
	bugs: bugs,
	license: license,
	leadMaintainer: leadMaintainer,
	main: main,
	types: types,
	files: files$1,
	browser: browser,
	typesVersions: typesVersions,
	repository: repository,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	gitHead: gitHead
};

const pkg = require$$4;
const withTimeoutOption$J = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var version$1 = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["version"]}
   */
  async function version (_options = {}) {
    const repoVersion = await repo.version.get();

    return {
      version: pkg.version,
      repo: `${repoVersion}`,

      // @ts-ignore gitHead is defined in published versions
      commit: pkg.gitHead ,
      'interface-ipfs-core': pkg.devDependencies['interface-ipfs-core']
    }
  }

  return withTimeoutOption$J(version)
};

const pkgversion$1 = require$$4.version;
const { Multiaddr: Multiaddr$1 } = require$$1$7;
const withTimeoutOption$I = require$$0;
const uint8ArrayToString$2 = require$$4$2;
const PeerId$4 = require$$0$6;
const { NotStartedError } = errors;

/**
 * @param {Object} config
 * @param {import('peer-id')} config.peerId
 * @param {import('../types').NetworkService} config.network
 */
var id = ({ peerId, network }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["id"]}
   */
  async function id (options = {}) { // eslint-disable-line require-await
    if (options.peerId === peerId.toB58String()) {
      delete options.peerId;
    }

    const net = network.try();

    if (!net) {
      if (options.peerId) {
        throw new NotStartedError()
      }

      const idStr = peerId.toB58String();

      return {
        id: idStr,
        publicKey: uint8ArrayToString$2(peerId.pubKey.bytes, 'base64pad'),
        addresses: [],
        agentVersion: `js-ipfs/${pkgversion$1}`,
        protocolVersion: '9000',
        protocols: []
      }
    }

    const id = options.peerId ? PeerId$4.createFromB58String(options.peerId.toString()) : peerId;
    const { libp2p } = net;

    const publicKey = options.peerId ? libp2p.peerStore.keyBook.get(id) : id.pubKey;
    const addresses = options.peerId ? libp2p.peerStore.addressBook.getMultiaddrsForPeer(id) : libp2p.multiaddrs;
    const protocols = options.peerId ? libp2p.peerStore.protoBook.get(id) : Array.from(libp2p.upgrader.protocols.keys());
    const agentVersion = uint8ArrayToString$2(libp2p.peerStore.metadataBook.getValue(id, 'AgentVersion') || new Uint8Array());
    const protocolVersion = uint8ArrayToString$2(libp2p.peerStore.metadataBook.getValue(id, 'ProtocolVersion') || new Uint8Array());
    const idStr = id.toB58String();

    return {
      id: idStr,
      publicKey: uint8ArrayToString$2(publicKey.bytes, 'base64pad'),
      addresses: (addresses || [])
        .map(ma => {
          const str = ma.toString();

          // some relay-style transports add our peer id to the ma for us
          // so don't double-add
          if (str.endsWith(`/p2p/${idStr}`)) {
            return str
          }

          return `${str}/p2p/${idStr}`
        })
        .sort()
        .map(ma => new Multiaddr$1(ma)),
      agentVersion,
      protocolVersion,
      protocols: (protocols || []).sort()
    }
  }
  return withTimeoutOption$I(id)
};

var config = {exports: {}};

const set = require$$0$e;
const getDefaultConfig$1 = configNodejs;
const withTimeoutOption$H = require$$0;
const log$k = require$$2$4('ipfs:core:config');

/**
 * @typedef {import('ipfs-core-types/src/config').Config} Config
 *
 * @typedef {object} Transformer
 * @property {string} description
 * @property {(config: Config) => Config} transform
 */

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
config.exports = ({ repo }) => {
  return {
    getAll: withTimeoutOption$H(getAll),
    get: withTimeoutOption$H(get),
    set: withTimeoutOption$H(set),
    replace: withTimeoutOption$H(replace),
    profiles: {
      apply: withTimeoutOption$H(applyProfile),
      list: withTimeoutOption$H(listProfiles)
    }
  }

  /**
   * @type {import('ipfs-core-types/src/config').API["getAll"]}
   */
  async function getAll (options = {}) { // eslint-disable-line require-await
    // @ts-ignore TODO: move config typedefs into ipfs-repo
    return repo.config.getAll(options)
  }

  /**
   * @type {import('ipfs-core-types/src/config').API["get"]}
   */
  async function get (key, options) { // eslint-disable-line require-await
    if (!key) {
      return Promise.reject(new Error('key argument is required'))
    }

    // @ts-ignore TODO: move config typedefs into ipfs-repo
    return repo.config.get(key, options)
  }

  /**
   * @type {import('ipfs-core-types/src/config').API["set"]}
   */
  async function set (key, value, options) { // eslint-disable-line require-await
    return repo.config.set(key, value, options)
  }

  /**
   * @type {import('ipfs-core-types/src/config').API["replace"]}
   */
  async function replace (value, options) { // eslint-disable-line require-await
    return repo.config.replace(value, options)
  }

  /**
   * @type {import('ipfs-core-types/src/config/profiles').API["apply"]}
   */
  async function applyProfile (profileName, options = { dryRun: false }) {
    const { dryRun } = options;

    const profile = profiles[profileName];

    if (!profile) {
      throw new Error(`No profile with name '${profileName}' exists`)
    }

    try {
      const oldCfg = await repo.config.getAll(options);
      let newCfg = JSON.parse(JSON.stringify(oldCfg)); // clone
      newCfg = profile.transform(newCfg);

      if (!dryRun) {
        await repo.config.replace(newCfg, options);
      }

      // Scrub private key from output
      // @ts-ignore `oldCfg.Identity` maybe undefined
      delete oldCfg.Identity.PrivKey;
      delete newCfg.Identity.PrivKey;

      // @ts-ignore TODO: move config typedefs into ipfs-repo
      return { original: oldCfg, updated: newCfg }
    } catch (err) {
      log$k(err);

      throw new Error(`Could not apply profile '${profileName}' to config: ${err.message}`)
    }
  }
};

/**
 * @type {import('ipfs-core-types/src/config/profiles').API["list"]}
 */
async function listProfiles (_options) { // eslint-disable-line require-await
  return Object.keys(profiles).map(name => ({
    name,
    description: profiles[name].description
  }))
}

/**
 * @type {Record<string, Transformer>}
 */
const profiles = {
  server: {
    description: 'Recommended for nodes with public IPv4 address (servers, VPSes, etc.), disables host and content discovery and UPnP in local networks.',
    transform: (config) => {
      set(config, 'Discovery.MDNS.Enabled', false);
      set(config, 'Discovery.webRTCStar.Enabled', false);
      config.Swarm = {
        ...(config.Swarm || {}),
        DisableNatPortMap: true
      };

      return config
    }
  },
  'local-discovery': {
    description: 'Sets default values to fields affected by `server` profile, enables discovery and UPnP in local networks.',
    transform: (config) => {
      set(config, 'Discovery.MDNS.Enabled', true);
      set(config, 'Discovery.webRTCStar.Enabled', true);
      set(config, 'Swarm', {
        ...(config.Swarm || {}),
        DisableNatPortMap: false
      });

      return config
    }
  },
  test: {
    description: 'Reduces external interference, useful for running ipfs in test environments. Note that with these settings node won\'t be able to talk to the rest of the network without manual bootstrap.',
    transform: (config) => {
      const defaultConfig = getDefaultConfig$1();

      set(config, 'Addresses.API', defaultConfig.Addresses.API ? '/ip4/127.0.0.1/tcp/0' : '');
      set(config, 'Addresses.Gateway', defaultConfig.Addresses.Gateway ? '/ip4/127.0.0.1/tcp/0' : '');
      set(config, 'Addresses.Swarm', defaultConfig.Addresses.Swarm.length ? ['/ip4/127.0.0.1/tcp/0'] : []);
      set(config, 'Addresses.Delegates', []);
      set(config, 'Bootstrap', []);
      set(config, 'Discovery.MDNS.Enabled', false);
      set(config, 'Discovery.webRTCStar.Enabled', false);
      set(config, 'Swarm', {
        ...(config.Swarm || {}),
        DisableNatPortMap: true
      });

      return config
    }
  },
  'default-networking': {
    description: 'Restores default network settings. Inverse profile of the `test` profile.',
    transform: (config) => {
      const defaultConfig = getDefaultConfig$1();

      set(config, 'Addresses.API', defaultConfig.Addresses.API);
      set(config, 'Addresses.Gateway', defaultConfig.Addresses.Gateway);
      set(config, 'Addresses.Swarm', defaultConfig.Addresses.Swarm);
      set(config, 'Addresses.Delegates', defaultConfig.Addresses.Delegates);
      set(config, 'Bootstrap', defaultConfig.Bootstrap);
      set(config, 'Discovery.MDNS.Enabled', defaultConfig.Discovery.MDNS.Enabled);
      set(config, 'Discovery.webRTCStar.Enabled', defaultConfig.Discovery.webRTCStar.Enabled);
      set(config, 'Swarm', {
        ...(config.Swarm || {}),
        DisableNatPortMap: false
      });

      return config
    }
  },
  lowpower: {
    description: 'Reduces daemon overhead on the system. May affect node functionality,performance of content discovery and data fetching may be degraded. Recommended for low power systems.',
    transform: (config) => {
      const Swarm = config.Swarm || {};
      const ConnMgr = Swarm.ConnMgr || {};
      ConnMgr.LowWater = 20;
      ConnMgr.HighWater = 40;

      Swarm.ConnMgr = ConnMgr;
      config.Swarm = Swarm;

      return config
    }
  },
  'default-power': {
    description: 'Inverse of "lowpower" profile.',
    transform: (config) => {
      const defaultConfig = getDefaultConfig$1();

      config.Swarm = defaultConfig.Swarm;

      return config
    }
  }

};

config.exports.profiles = profiles;

const withTimeoutOption$G = require$$0;
const first = require$$4$1;
const last$4 = require$$0$5;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var get$4 = ({ ipld, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/dag').API["get"]}
   */
  const get = async function get (cid, options = {}) {
    if (options.preload !== false) {
      preload(cid);
    }

    if (options.path) {
      const entry = options.localResolve
        ? await first(ipld.resolve(cid, options.path))
        : await last$4(ipld.resolve(cid, options.path));
      /** @type {import('ipfs-core-types/src/dag').GetResult} - first and last will return undefined when empty */
      const result = (entry);
      return result
    }

    return {
      value: await ipld.get(cid, options),
      remainderPath: ''
    }
  };

  return withTimeoutOption$G(get)
};

const withTimeoutOption$F = require$$0;
const toCidAndPath = require$$1;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var tree = ({ ipld, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/dag').API["tree"]}
   */
  async function * tree (ipfsPath, options = {}) { // eslint-disable-line require-await
    const {
      cid,
      path
    } = toCidAndPath(ipfsPath);

    if (path) {
      options.path = path;
    }

    if (options.preload !== false) {
      preload(cid);
    }

    yield * ipld.tree(cid, options.path, options);
  }

  return withTimeoutOption$F(tree)
};

const multicodec$4 = require$$6$1;
const multihashes = require$$1$3.multihash;

/**
 * @typedef {import('cids')} CID
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('multicodec').CodecCode} CodecCode
 * @typedef {import('multicodec').CodecName} CodecName
 * @typedef {import('multihashes').HashCode} HashCode
 * @typedef {import('multihashes').HashName} HashName
 */
/**
 *
 * @param {CodecName} name
 */
const nameToCodec = name => multicodec$4.getCodeFromName(name);
/**
 * @param {HashName} name
 */
const nameToHashCode = name => multihashes.names[name];
const withTimeoutOption$E = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('ipfs-core-types/src/pin').API} config.pin
 * @param {import('../../types').Preload} config.preload
 * @param {import('.').GCLock} config.gcLock
 */
var put$1 = ({ ipld, pin, gcLock, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/dag').API["put"]}
   */
  async function put (dagNode, options = {}) {
    const { cidVersion, format, hashAlg } = readEncodingOptions(options);

    const release = options.pin ? await gcLock.readLock() : null;

    try {
      const cid = await ipld.put(dagNode, format, {
        hashAlg,
        cidVersion,
        signal: options.signal
      });

      if (options.pin) {
        await pin.add(cid, {
          lock: false
        });
      }

      if (options.preload !== false) {
        preload(cid);
      }

      return cid
    } finally {
      if (release) {
        release();
      }
    }
  }

  return withTimeoutOption$E(put)
};

/**
 * @param {import('ipfs-core-types/src/dag').PutOptions} options
 */
const readEncodingOptions = (options) => {
  if (options.cid && (options.format || options.hashAlg)) {
    throw new Error('Can\'t put dag node. Please provide either `cid` OR `format` and `hashAlg` options.')
  } else if (((options.format && !options.hashAlg) || (!options.format && options.hashAlg))) {
    throw new Error('Can\'t put dag node. Please provide `format` AND `hashAlg` options.')
  }

  const { hashAlg, format } = options.cid != null
    ? { format: options.cid.code, hashAlg: undefined }
    : encodingCodes({ ...defaultCIDOptions, ...options });
  const cidVersion = readVersion({ ...options, format, hashAlg });

  return {
    cidVersion,
    format,
    hashAlg
  }
};

/**
 *
 * @param {Object} options
 * @param {CodecCode|CodecName} options.format
 * @param {HashCode|HashName} [options.hashAlg]
 */
const encodingCodes = ({ format, hashAlg }) => ({
  format: typeof format === 'string' ? nameToCodec(format) : format,
  hashAlg: typeof hashAlg === 'string' ? nameToHashCode(hashAlg) : hashAlg
});

/**
 * Figures out what version of CID should be used given the options.
 *
 * @param {Object} options
 * @param {CIDVersion} [options.version]
 * @param {CID} [options.cid]
 * @param {CodecCode} [options.format]
 * @param {HashCode} [options.hashAlg]
 */
const readVersion = ({ version, cid, format, hashAlg }) => {
  // If version is passed just use that.
  if (typeof version === 'number') {
    return version
  // If cid is provided use version field from it.
  } else if (cid) {
    return cid.version
  // If it's dag-pb nodes use version 0
  } else if (format === multicodec$4.DAG_PB && hashAlg === multicodec$4.SHA2_256) {
    return 0
  } else {
  // Otherwise use version 1
    return 1
  }
};

const defaultCIDOptions = {
  format: multicodec$4.getCodeFromName('dag-cbor'),
  hashAlg: multihashes.names['sha2-256']
};

const createGet$1 = get$4;
const createResolve = resolve$3;
const createTree = tree;
const createPut$1 = put$1;

/**
 * @typedef {Object} ReaderConfig
 * @property {IPLD} ipld
 * @property {Preload} preload
 *
 * @typedef {import('ipld')} IPLD
 * @typedef {import('../../types').Preload} Preload
 * @typedef {import('ipfs-core-types/src/pin').API} Pin
 * @typedef {import('../gc-lock').GCLock} GCLock
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

class DagAPI$1 {
  /**
   * @param {Object} config
   * @param {IPLD} config.ipld
   * @param {Preload} config.preload
   * @param {Pin} config.pin
   * @param {GCLock} config.gcLock
   */
  constructor ({ ipld, pin, preload, gcLock }) {
    this.get = createGet$1({ ipld, preload });
    this.resolve = createResolve({ ipld, preload });
    this.tree = createTree({ ipld, preload });
    this.put = createPut$1({ ipld, preload, pin, gcLock });
  }
}

var dag = DagAPI$1;

/* eslint-env browser */

const { default: PQueue } = require$$1$2;
const HTTP = require$$2$1;
const debug$2 = require$$2$4;

const log$j = Object.assign(debug$2('ipfs:preload'), {
  error: debug$2('ipfs:preload:error')
});

// browsers limit concurrent connections per host,
// we don't want preload calls to exhaust the limit (~6)
const httpQueue = new PQueue({ concurrency: 4 });

/**
 * @param {string} url
 * @param {import('ipfs-core-types/src/utils').AbortOptions} options
 */
var preloadNodejs = function preload (url, options = {}) {
  log$j(url);

  return httpQueue.add(async () => {
    const res = await HTTP.post(url, { signal: options.signal });

    // @ts-ignore
    const reader = res.body.getReader();

    try {
      while (true) {
        const { done } = await reader.read();
        if (done) return
        // Read to completion but do not cache
      }
    } finally {
      reader.releaseLock();
    }
  })
};

// @ts-ignore no types
const toUri = require$$0$f;
const debug$1 = require$$2$4;
const shuffle = require$$2$9;
const { AbortController } = require$$3$2;
const preload = preloadNodejs;
/** @type {typeof import('hashlru').default} */
// @ts-ignore - hashlru has incorrect typedefs
const hashlru = require$$0$4;

const log$i = Object.assign(
  debug$1('ipfs:preload'),
  { error: debug$1('ipfs:preload:error') }
);

/**
 * @param {import('./types').PreloadOptions} [options]
 */
const createPreloader = (options = {}) => {
  options.enabled = Boolean(options.enabled);
  options.addresses = options.addresses || [];
  options.cache = options.cache || 1000;

  if (!options.enabled || !options.addresses.length) {
    log$i('preload disabled');
    const api = () => {};
    return Object.assign(api, {
      start: () => {},
      stop: () => {}
    })
  }

  let stopped = true;
  /** @type {AbortController[]} */
  let requests = [];
  const apiUris = options.addresses.map(toUri);

  // Avoid preloading the same CID over and over again
  const cache = hashlru(options.cache);

  /**
   * @type {import('./types').Preload}
   */
  const api = async cid => {
    try {
      if (stopped) {
        throw new Error(`preload ${cid} but preloader is not started`)
      }

      const path = cid.toString();

      if (cache.has(path)) {
        // we've preloaded this recently, don't preload it again
        return
      }

      // make sure we don't preload this again any time soon
      cache.set(path, true);

      const fallbackApiUris = shuffle(apiUris);
      let success = false;
      const now = Date.now();

      for (const uri of fallbackApiUris) {
        if (stopped) throw new Error(`preload aborted for ${path}`)
        /** @type {AbortController} */
        let controller;

        try {
          controller = new AbortController();
          requests = requests.concat(controller);
          await preload(`${uri}/api/v0/refs?r=true&arg=${encodeURIComponent(path)}`, { signal: controller.signal });
          success = true;
        } catch (err) {
          if (err.type !== 'aborted') log$i.error(err);
        } finally {
          requests = requests.filter(r => r !== controller);
        }

        if (success) break
      }

      log$i(`${success ? '' : 'un'}successfully preloaded ${path} in ${Date.now() - now}ms`);
    } catch (err) {
      log$i.error(err);
    }
  };

  /**
   * @returns {void}
   */
  api.start = () => {
    stopped = false;
  };

  /**
   * @returns {void}
   */
  api.stop = () => {
    stopped = true;
    log$i(`aborting ${requests.length} pending preload request(s)`);
    requests.forEach(r => r.abort());
    requests = [];
  };

  return api
};

var preload_1 = createPreloader;

const debug = require$$2$4;
const { cidToString } = require$$2$2;
const log$h = Object.assign(debug('ipfs:mfs-preload'), {
  error: debug('ipfs:mfs-preload:error')
});

/**
 * @typedef {PreloadOptions & MFSPreloadOptions} Options
 * @typedef {Object} MFSPreloadOptions
 * @property {number} [interval]
 * @typedef {import('./types').PreloadOptions} PreloadOptions
 */

/**
 * @param {Object} config
 * @param {import('./types').Preload} config.preload
 * @param {import('ipfs-core-types/src/files').API} config.files
 * @param {Options} [config.options]
 */
var mfsPreload = ({ preload, files, options = {} }) => {
  options.interval = options.interval || 30 * 1000;

  if (!options.enabled) {
    log$h('MFS preload disabled');
    const noop = async () => {};
    return { start: noop, stop: noop }
  }

  let rootCid = '';
  /** @type {any} */
  let timeoutId;

  const preloadMfs = async () => {
    try {
      const stats = await files.stat('/');
      const nextRootCid = cidToString(stats.cid, { base: 'base32' });

      if (rootCid !== nextRootCid) {
        log$h(`preloading updated MFS root ${rootCid} -> ${stats.cid}`);
        await preload(stats.cid);
        rootCid = nextRootCid;
      }
    } catch (err) {
      log$h.error('failed to preload MFS root', err);
    } finally {
      timeoutId = setTimeout(preloadMfs, options.interval);
    }
  };

  return {
    /**
     * @returns {Promise<void>}
     */
    async start () {
      const stats = await files.stat('/');
      rootCid = cidToString(stats.cid, { base: 'base32' });
      log$h(`monitoring MFS root ${stats.cid}`);
      timeoutId = setTimeout(preloadMfs, options.interval);
    },
    /**
     * @returns {void}
     */
    stop () {
      clearTimeout(timeoutId);
    }
  }
};

// @ts-ignore - no types
const mortice$1 = require$$0$g;

/**
 * @typedef {object} Lock
 * @property {(fn: (...args: any) => any) => (...args: any) => any} readLock
 * @property {(fn: (...args: any) => any) => (...args: any) => any} writeLock
 */

/** @type {Lock} */
let lock;

/**
 * @param {boolean} [repoOwner]
 */
var createLock$2 = (repoOwner = false) => {
  if (lock) {
    return lock
  }

  const mutex = mortice$1({
    // ordinarily the main thread would store the read/write lock but
    // if we are the thread that owns the repo, we can store the lock
    // on this process even if we are a worker thread
    singleProcess: repoOwner
  });

  lock = {
    readLock: (func) => {
      return async (...args) => {
        const releaseLock = await mutex.readLock();

        try {
          return await func.apply(null, args)
        } finally {
          releaseLock();
        }
      }
    },

    writeLock: (func) => {
      return async (...args) => {
        const releaseLock = await mutex.writeLock();

        try {
          return await func.apply(null, args)
        } finally {
          releaseLock();
        }
      }
    }
  };

  return lock
};

const CID$8 = require$$0$1;
const { UnixFS: UnixFS$8 } = require$$3$3;
const {
  DAGNode: DAGNode$a
} = require$$0$9;
const log$g = require$$2$4('ipfs:mfs:utils:with-mfs-root');
const mc$6 = require$$6$1;
const mh$8 = require$$1$3.multihash;
const errCode$k = require$$1$1;

const {
  MFS_ROOT_KEY: MFS_ROOT_KEY$2
} = utils$6;

/**
 * @typedef {import('../').MfsContext} MfsContext
 */

/**
 * @param {MfsContext} context
 * @param {import('ipfs-core-types/src/utils').AbortOptions} [options]
 */
const loadMfsRoot$1 = async (context, options) => {
  if (options && options.signal && options.signal.aborted) {
    throw errCode$k(new Error('Request aborted'), 'ERR_ABORTED', { name: 'Aborted' })
  }

  // Open the repo if it's been closed
  await context.repo.datastore.open();

  // Load the MFS root CID
  let cid;

  try {
    const buf = await context.repo.datastore.get(MFS_ROOT_KEY$2);

    cid = new CID$8(buf);
  } catch (err) {
    if (err.code !== 'ERR_NOT_FOUND') {
      throw err
    }

    log$g('Creating new MFS root');
    const node = new DAGNode$a(new UnixFS$8({ type: 'directory' }).marshal());
    cid = await context.ipld.put(node, mc$6.DAG_PB, {
      cidVersion: 0,
      hashAlg: mh$8.names['sha2-256'] // why can't ipld look this up?
    });

    if (options && options.signal && options.signal.aborted) {
      throw errCode$k(new Error('Request aborted'), 'ERR_ABORTED', { name: 'Aborted' })
    }

    await context.repo.datastore.put(MFS_ROOT_KEY$2, cid.bytes);
  }

  log$g(`Loaded MFS root /ipfs/${cid}`);

  return cid
};

var withMfsRoot$1 = loadMfsRoot$1;

/**
 * @param {string} [path]
 */
const toPathComponents$3 = (path = '') => {
  // split on / unless escaped with \
  return (path
    .trim()
    .match(/([^\\^/]|\\\/)+/g) || [])
    .filter(Boolean)
};

var toPathComponents_1 = toPathComponents$3;

const loadMfsRoot = withMfsRoot$1;
const toPathComponents$2 = toPathComponents_1;
const { exporter: exporter$4 } = require$$0$d;
const errCode$j = require$$1$1;
const CID$7 = require$$0$1;

const IPFS_PREFIX = 'ipfs';

/**
 * @typedef {import('ipfs-unixfs-exporter').UnixFSEntry} UnixFSEntry
 * @typedef {import('ipfs-unixfs-exporter').ExporterOptions} ExporterOptions
 * @typedef {import('../').MfsContext} MfsContext
 *
 * @typedef {object} FilePath
 * @property {'mfs' | 'ipfs'} type
 * @property {'file'} entryType
 * @property {number} depth
 * @property {string} mfsPath
 * @property {string} mfsDirectory
 * @property {string[]} parts
 * @property {string} path
 * @property {string} name
 * @property {CID} cid
 * @property {boolean} exists
 * @property {import('ipfs-unixfs').UnixFS} unixfs
 * @property {(options?: ExporterOptions) => AsyncIterable<Uint8Array>} content
 *
 * @typedef {object} DirectoryPath
 * @property {'mfs' | 'ipfs'} type
 * @property {'directory'} entryType
 * @property {number} depth
 * @property {string} mfsPath
 * @property {string} mfsDirectory
 * @property {string[]} parts
 * @property {string} path
 * @property {string} name
 * @property {CID} cid
 * @property {boolean} exists
 * @property {import('ipfs-unixfs').UnixFS} unixfs
 * @property {(options?: ExporterOptions) => AsyncIterable<UnixFSEntry>} content
 *
 * @typedef {object} ObjectPath
 * @property {'mfs' | 'ipfs'} type
 * @property {'object'} entryType
 * @property {number} depth
 * @property {string} mfsPath
 * @property {string} mfsDirectory
 * @property {string[]} parts
 * @property {string} path
 * @property {string} name
 * @property {CID} cid
 * @property {boolean} exists
 * @property {(options?: ExporterOptions) => AsyncIterable<any>} content
 *
 * @typedef {object} RawPath
 * @property {'mfs' | 'ipfs'} type
 * @property {'raw'} entryType
 * @property {number} depth
 * @property {string} mfsPath
 * @property {string} mfsDirectory
 * @property {string[]} parts
 * @property {string} path
 * @property {string} name
 * @property {CID} cid
 * @property {boolean} exists
 * @property {(options?: ExporterOptions) => AsyncIterable<Uint8Array>} content
 *
 * @typedef {object} IdentityPath
 * @property {'mfs' | 'ipfs'} type
 * @property {'identity'} entryType
 * @property {number} depth
 * @property {string} mfsPath
 * @property {string} mfsDirectory
 * @property {string[]} parts
 * @property {string} path
 * @property {string} name
 * @property {CID} cid
 * @property {boolean} exists
 * @property {(options?: ExporterOptions) => AsyncIterable<Uint8Array>} content
 *
 * @typedef {FilePath | DirectoryPath | ObjectPath | RawPath | IdentityPath} MfsPath
 */

/**
 * @param {MfsContext} context
 * @param {string | CID} path
 * @param {import('ipfs-core-types/src/utils').AbortOptions} [options]
 */
const toMfsPath$8 = async (context, path, options) => {
  const root = await loadMfsRoot(context, options);

  /** @type {MfsPath} */
  // @ts-ignore fields get set later
  let output = {
    entryType: 'file'
  };

  if (CID$7.isCID(path)) {
    path = `/ipfs/${path}`;
  }

  path = (path || '').trim();
  path = path.replace(/(\/\/+)/g, '/');

  if (path.endsWith('/') && path.length > 1) {
    path = path.substring(0, path.length - 1);
  }

  if (!path) {
    throw errCode$j(new Error('paths must not be empty'), 'ERR_NO_PATH')
  }

  if (path.substring(0, 1) !== '/') {
    throw errCode$j(new Error('paths must start with a leading slash'), 'ERR_INVALID_PATH')
  }

  if (path.substring(path.length - 1) === '/') {
    path = path.substring(0, path.length - 1);
  }

  const pathComponents = toPathComponents$2(path);

  if (pathComponents[0] === IPFS_PREFIX) {
    // e.g. /ipfs/QMfoo or /ipfs/Qmfoo/sub/path
    let mfsDirectory;

    if (pathComponents.length === 2) {
      mfsDirectory = `/${pathComponents.join('/')}`;
    } else {
      mfsDirectory = `/${pathComponents.slice(0, pathComponents.length - 1).join('/')}`;
    }

    // @ts-ignore fields being set
    output = {
      type: 'ipfs',
      depth: pathComponents.length - 2,
      entryType: 'file',

      mfsPath: `/${pathComponents.join('/')}`,
      mfsDirectory,
      parts: pathComponents,
      path: `/${pathComponents.join('/')}`,
      name: pathComponents[pathComponents.length - 1]
    };
  } else {
    const mfsPath = `/${IPFS_PREFIX}/${root}${pathComponents.length ? '/' + pathComponents.join('/') : ''}`;
    const mfsDirectory = `/${IPFS_PREFIX}/${root}/${pathComponents.slice(0, pathComponents.length - 1).join('/')}`;

    // @ts-ignore fields being set
    output = {
      type: 'mfs',
      depth: pathComponents.length,
      entryType: 'file',

      mfsDirectory,
      mfsPath,
      parts: pathComponents,
      path: `/${pathComponents.join('/')}`,
      name: pathComponents[pathComponents.length - 1]
    };
  }

  const cidPath = output.type === 'mfs' ? output.mfsPath : output.path;

  try {
    const res = await exporter$4(cidPath, context.ipld);

    output.cid = res.cid;
    output.mfsPath = `/ipfs/${res.path}`;
    output.entryType = res.type;
    output.content = res.content;

    if ((output.entryType === 'file' || output.entryType === 'directory') && (res.type === 'file' || res.type === 'directory')) {
      output.unixfs = res.unixfs;
    }
  } catch (err) {
    if (err.code !== 'ERR_NOT_FOUND') {
      throw err
    }
  }

  output.exists = Boolean(output.cid);

  return output
};

var toMfsPath_1 = toMfsPath$8;

const mergeOptions$d = require$$0$2.bind({ ignoreUndefined: true });
const toMfsPath$7 = toMfsPath_1;
const { exporter: exporter$3 } = require$$0$d;
const log$f = require$$2$4('ipfs:mfs:stat');
const errCode$i = require$$1$1;
const withTimeoutOption$D = require$$0;

/**
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} withLocal
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$b = {
  withLocal: false
};

/**
 * @typedef {import('ipfs-core-types/src/files').StatResult} StatResult
 */

/**
 * @param {MfsContext} context
 */
var stat$5 = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["stat"]}
   */
  async function mfsStat (path, options = {}) {
    /** @type {DefaultOptions} */
    options = mergeOptions$d(defaultOptions$b, options);

    log$f(`Fetching stats for ${path}`);

    const {
      type,
      cid,
      mfsPath
    } = await toMfsPath$7(context, path, options);

    const exportPath = type === 'ipfs' && cid ? cid : mfsPath;
    let file;

    try {
      file = await exporter$3(exportPath, context.ipld);
    } catch (err) {
      if (err.code === 'ERR_NOT_FOUND') {
        throw errCode$i(new Error(`${path} does not exist`), 'ERR_NOT_FOUND')
      }

      throw err
    }

    if (!statters[file.type]) {
      throw new Error(`Cannot stat codec ${file.cid.codec}`)
    }

    return statters[file.type](file)
  }

  return withTimeoutOption$D(mfsStat)
};

/** @type {Record<string, (file:any) => StatResult>} */
const statters = {
  /**
   * @param {import('ipfs-unixfs-exporter').RawNode} file
   */
  raw: (file) => {
    return {
      cid: file.cid,
      size: file.node.length,
      cumulativeSize: file.node.length,
      blocks: 0,
      type: 'file', // for go compatibility
      local: undefined,
      sizeLocal: undefined,
      withLocality: false
    }
  },
  /**
   * @param {import('ipfs-unixfs-exporter').UnixFSFile} file
   */
  file: (file) => {
    /** @type {StatResult} */
    const stat = {
      cid: file.cid,
      type: 'file',
      size: file.unixfs.fileSize(),
      cumulativeSize: file.node.size,
      blocks: file.unixfs.blockSizes.length,
      local: undefined,
      sizeLocal: undefined,
      withLocality: false,
      mode: file.unixfs.mode
    };

    if (file.unixfs.mtime) {
      stat.mtime = file.unixfs.mtime;
    }

    return stat
  },
  /**
   * @param {import('ipfs-unixfs-exporter').UnixFSDirectory} file
   */
  directory: (file) => {
    /** @type {StatResult} */
    const stat = {
      cid: file.cid,
      type: 'directory',
      size: 0,
      cumulativeSize: file.node.size,
      blocks: file.node.Links.length,
      local: undefined,
      sizeLocal: undefined,
      withLocality: false,
      mode: file.unixfs.mode
    };

    if (file.unixfs.mtime) {
      stat.mtime = file.unixfs.mtime;
    }

    return stat
  },
  /**
   * @param {import('ipfs-unixfs-exporter').ObjectNode} file
   */
  object: (file) => {
    /** @type {StatResult} */
    return {
      cid: file.cid,
      size: file.node.length,
      cumulativeSize: file.node.length,
      type: 'file', // for go compatibility
      blocks: 0,
      local: undefined,
      sizeLocal: undefined,
      withLocality: false
    }
  },
  /**
   * @param {import('ipfs-unixfs-exporter').IdentityNode} file
   */
  identity: (file) => {
    /** @type {StatResult} */
    return {
      cid: file.cid,
      size: file.node.length,
      cumulativeSize: file.node.length,
      blocks: 0,
      type: 'file', // for go compatibility
      local: undefined,
      sizeLocal: undefined,
      withLocality: false
    }
  }
};

const { walkPath } = require$$0$d;
const log$e = require$$2$4('ipfs:mfs:utils:to-trail');

/**
 * @typedef {import('../').MfsContext} MfsContext
 * @typedef {object} MfsTrail
 * @property {string} name
 * @property {import('cids')} cid
 * @property {number} [size]
 * @property {string} [type]
 *
 * TODO: export supported types from unixfs-exporter and use for `type` above
 */

/**
 * @param {MfsContext} context
 * @param {string} path
 * @returns {Promise<MfsTrail[]>}
 */
const toTrail$5 = async (context, path) => {
  log$e(`Creating trail for path ${path}`);

  const output = [];

  for await (const fsEntry of walkPath(path, context.ipld)) {
    let size;

    // TODO: include `.size` property in unixfs-exporter output
    if (fsEntry.node instanceof Uint8Array) {
      size = fsEntry.node.length;
    } else {
      size = fsEntry.node.size;
    }

    output.push({
      name: fsEntry.name,
      cid: fsEntry.cid,
      size,
      type: fsEntry.type
    });
  }

  return output
};

var toTrail_1 = toTrail$5;

const {
  DAGNode: DAGNode$9
} = require$$0$9;
const {
  Bucket,
  createHAMT
} = require$$1$9;
// @ts-ignore - refactor this to not need deep require
const DirSharded$1 = require$$2$a;
// @ts-ignore - refactor this to not need deep require
const defaultImporterOptions$1 = require$$3$4;
const log$d = require$$2$4('ipfs:mfs:core:utils:hamt-utils');
const { UnixFS: UnixFS$7 } = require$$3$3;
const mc$5 = require$$6$1;
const mh$7 = require$$1$3.multihash;
const last$3 = require$$0$5;

/**
 * @typedef {import('ipld-dag-pb').DAGLink} DAGLink
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('ipfs-unixfs').Mtime} Mtime
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids')} CID
 * @typedef {import('../').MfsContext} MfsContext
 */

/**
 * @param {MfsContext} context
 * @param {DAGLink[]} links
 * @param {Bucket<any>} bucket
 * @param {object} options
 * @param {DAGNode} options.parent
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 * @param {HashName} options.hashAlg
 */
const updateHamtDirectory$2 = async (context, links, bucket, options) => {
  const importerOptions = defaultImporterOptions$1();

  // update parent with new bit field
  const data = Uint8Array.from(bucket._children.bitField().reverse());
  const node = UnixFS$7.unmarshal(options.parent.Data);
  const dir = new UnixFS$7({
    type: 'hamt-sharded-directory',
    data,
    fanout: bucket.tableSize(),
    hashType: importerOptions.hamtHashCode,
    mode: node.mode,
    mtime: node.mtime
  });

  const hashAlg = mh$7.names[options.hashAlg];
  const parent = new DAGNode$9(dir.marshal(), links);
  const cid = await context.ipld.put(parent, mc$5.DAG_PB, {
    cidVersion: options.cidVersion,
    hashAlg,
    onlyHash: !options.flush
  });

  return {
    node: parent,
    cid,
    size: parent.size
  }
};

/**
 * @param {DAGLink[]} links
 * @param {Bucket<any>} rootBucket
 * @param {Bucket<any>} parentBucket
 * @param {number} positionAtParent
 */
const recreateHamtLevel$1 = async (links, rootBucket, parentBucket, positionAtParent) => {
  // recreate this level of the HAMT
  const bucket = new Bucket({
    hash: rootBucket._options.hash,
    bits: rootBucket._options.bits
  }, parentBucket, positionAtParent);
  parentBucket._putObjectAt(positionAtParent, bucket);

  await addLinksToHamtBucket$1(links, bucket, rootBucket);

  return bucket
};

/**
 * @param {DAGLink[]} links
 */
const recreateInitialHamtLevel$1 = async (links) => {
  const importerOptions = defaultImporterOptions$1();
  const bucket = createHAMT({
    hashFn: importerOptions.hamtHashFn,
    bits: importerOptions.hamtBucketBits
  });

  await addLinksToHamtBucket$1(links, bucket, bucket);

  return bucket
};

/**
 * @param {DAGLink[]} links
 * @param {Bucket<any>} bucket
 * @param {Bucket<any>} rootBucket
 */
const addLinksToHamtBucket$1 = async (links, bucket, rootBucket) => {
  await Promise.all(
    links.map(link => {
      if (link.Name.length === 2) {
        const pos = parseInt(link.Name, 16);

        bucket._putObjectAt(pos, new Bucket({
          hash: rootBucket._options.hash,
          bits: rootBucket._options.bits
        }, bucket, pos));

        return Promise.resolve()
      }

      return rootBucket.put(link.Name.substring(2), {
        size: link.Tsize,
        cid: link.Hash
      })
    })
  );
};

/**
 * @param {number} position
 */
const toPrefix$1 = (position) => {
  return position
    .toString(16)
    .toUpperCase()
    .padStart(2, '0')
    .substring(0, 2)
};

/**
 * @param {MfsContext} context
 * @param {string} fileName
 * @param {DAGNode} rootNode
 */
const generatePath$1 = async (context, fileName, rootNode) => {
  // start at the root bucket and descend, loading nodes as we go
  const rootBucket = await recreateInitialHamtLevel$1(rootNode.Links);
  const position = await rootBucket._findNewBucketAndPos(fileName);

  // the path to the root bucket
  /** @type {{ bucket: Bucket<any>, prefix: string, node?: DAGNode }[]} */
  const path = [{
    bucket: position.bucket,
    prefix: toPrefix$1(position.pos)
  }];
  let currentBucket = position.bucket;

  while (currentBucket !== rootBucket) {
    path.push({
      bucket: currentBucket,
      prefix: toPrefix$1(currentBucket._posAtParent)
    });

    // @ts-ignore - only the root bucket's parent will be undefined
    currentBucket = currentBucket._parent;
  }

  path.reverse();
  path[0].node = rootNode;

  // load DAGNode for each path segment
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];

    if (!segment.node) {
      throw new Error('Could not generate HAMT path')
    }

    // find prefix in links
    const link = segment.node.Links
      .filter(link => link.Name.substring(0, 2) === segment.prefix)
      .pop();

    // entry was not in shard
    if (!link) {
      // reached bottom of tree, file will be added to the current bucket
      log$d(`Link ${segment.prefix}${fileName} will be added`);
      // return path
      continue
    }

    // found entry
    if (link.Name === `${segment.prefix}${fileName}`) {
      log$d(`Link ${segment.prefix}${fileName} will be replaced`);
      // file already existed, file will be added to the current bucket
      // return path
      continue
    }

    // found subshard
    log$d(`Found subshard ${segment.prefix}`);
    const node = await context.ipld.get(link.Hash);

    // subshard hasn't been loaded, descend to the next level of the HAMT
    if (!path[i + 1]) {
      log$d(`Loaded new subshard ${segment.prefix}`);

      await recreateHamtLevel$1(node.Links, rootBucket, segment.bucket, parseInt(segment.prefix, 16));
      const position = await rootBucket._findNewBucketAndPos(fileName);

      // i--
      path.push({
        bucket: position.bucket,
        prefix: toPrefix$1(position.pos),
        node: node
      });

      continue
    }

    const nextSegment = path[i + 1];

    // add intermediate links to bucket
    await addLinksToHamtBucket$1(node.Links, nextSegment.bucket, rootBucket);

    nextSegment.node = node;
  }

  await rootBucket.put(fileName, true);

  path.reverse();

  return {
    rootBucket,
    path
  }
};

/**
 * @param {MfsContext} context
 * @param {{ name: string, size: number, cid: CID }[]} contents
 * @param {object} [options]
 * @param {Mtime} [options.mtime]
 * @param {number} [options.mode]
 */
const createShard$1 = async (context, contents, options = {}) => {
  const importerOptions = defaultImporterOptions$1();

  const shard = new DirSharded$1({
    root: true,
    dir: true,
    parent: null,
    parentKey: null,
    path: '',
    dirty: true,
    flat: false,
    mtime: options.mtime,
    mode: options.mode
  }, {
    hamtHashFn: importerOptions.hamtHashFn,
    hamtHashCode: importerOptions.hamtHashCode,
    hamtBucketBits: importerOptions.hamtBucketBits,
    ...options,
    codec: 'dag-pb'
  });

  for (let i = 0; i < contents.length; i++) {
    await shard._bucket.put(contents[i].name, {
      size: contents[i].size,
      cid: contents[i].cid
    });
  }

  return last$3(shard.flush(context.block))
};

var hamtUtils = {
  generatePath: generatePath$1,
  updateHamtDirectory: updateHamtDirectory$2,
  recreateHamtLevel: recreateHamtLevel$1,
  recreateInitialHamtLevel: recreateInitialHamtLevel$1,
  addLinksToHamtBucket: addLinksToHamtBucket$1,
  toPrefix: toPrefix$1,
  createShard: createShard$1
};

const {
  DAGLink: DAGLink$3,
  DAGNode: DAGNode$8
} = require$$0$9;
const CID$6 = require$$0$1;
const log$c = require$$2$4('ipfs:mfs:core:utils:add-link');
const { UnixFS: UnixFS$6 } = require$$3$3;
// @ts-ignore - refactor this to not need deep require
const DirSharded = require$$2$a;
// @ts-ignore - refactor this to not need deep require
const defaultImporterOptions = require$$3$4;
const {
  updateHamtDirectory: updateHamtDirectory$1,
  recreateHamtLevel,
  recreateInitialHamtLevel,
  createShard,
  toPrefix,
  addLinksToHamtBucket
} = hamtUtils;
const errCode$h = require$$1$1;
const mc$4 = require$$6$1;
const mh$6 = require$$1$3.multihash;
const last$2 = require$$0$5;

/**
 * @typedef {import('ipfs-unixfs').Mtime} Mtime
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('hamt-sharding').Bucket<any>} Bucket
 * @typedef {import('../').MfsContext} MfsContext
 */

/**
 * @param {MfsContext} context
 * @param {object} options
 * @param {CID} options.cid
 * @param {string} options.name
 * @param {number} options.size
 * @param {number} options.shardSplitThreshold
 * @param {HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 * @param {CID} [options.parentCid]
 * @param {DAGNode} [options.parent]
 */
const addLink$7 = async (context, options) => {
  let parent = options.parent;

  if (options.parentCid) {
    if (!CID$6.isCID(options.parentCid)) {
      throw errCode$h(new Error('Invalid CID passed to addLink'), 'EINVALIDPARENTCID')
    }

    log$c(`Loading parent node ${options.parentCid}`);
    parent = await context.ipld.get(options.parentCid);
  }

  if (!parent) {
    throw errCode$h(new Error('No parent node or CID passed to addLink'), 'EINVALIDPARENT')
  }

  if (!options.cid) {
    throw errCode$h(new Error('No child cid passed to addLink'), 'EINVALIDCHILDCID')
  }

  if (!options.name) {
    throw errCode$h(new Error('No child name passed to addLink'), 'EINVALIDCHILDNAME')
  }

  if (!CID$6.isCID(options.cid)) {
    options.cid = new CID$6(options.cid);
  }

  if (!options.size && options.size !== 0) {
    throw errCode$h(new Error('No child size passed to addLink'), 'EINVALIDCHILDSIZE')
  }

  const meta = UnixFS$6.unmarshal(parent.Data);

  if (meta.type === 'hamt-sharded-directory') {
    log$c('Adding link to sharded directory');

    return addToShardedDirectory(context, {
      ...options,
      parent
    })
  }

  if (parent.Links.length >= options.shardSplitThreshold) {
    log$c('Converting directory to sharded directory');

    return convertToShardedDirectory(context, {
      ...options,
      parent,
      mtime: meta.mtime,
      mode: meta.mode
    })
  }

  log$c(`Adding ${options.name} (${options.cid}) to regular directory`);

  return addToDirectory(context, {
    ...options,
    parent
  })
};

/**
 * @param {MfsContext} context
 * @param {object} options
 * @param {CID} options.cid
 * @param {string} options.name
 * @param {number} options.size
 * @param {DAGNode} options.parent
 * @param {HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 * @param {Mtime} [options.mtime]
 * @param {number} [options.mode]
 */
const convertToShardedDirectory = async (context, options) => {
  const result = await createShard(context, options.parent.Links.map(link => ({
    name: link.Name,
    size: link.Tsize,
    cid: link.Hash
  })).concat({
    name: options.name,
    size: options.size,
    cid: options.cid
  }), options);

  log$c(`Converted directory to sharded directory ${result.cid}`);

  return result
};

/**
 * @param {MfsContext} context
 * @param {object} options
 * @param {CID} options.cid
 * @param {string} options.name
 * @param {number} options.size
 * @param {DAGNode} options.parent
 * @param {HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 * @param {Mtime} [options.mtime]
 * @param {number} [options.mode]
 */
const addToDirectory = async (context, options) => {
  options.parent.rmLink(options.name);
  options.parent.addLink(new DAGLink$3(options.name, options.size, options.cid));

  const node = UnixFS$6.unmarshal(options.parent.Data);

  if (node.mtime) {
    // Update mtime if previously set
    const ms = Date.now();
    const secs = Math.floor(ms / 1000);

    node.mtime = {
      secs: secs,
      nsecs: (ms - (secs * 1000)) * 1000
    };

    options.parent = new DAGNode$8(node.marshal(), options.parent.Links);
  }

  const hashAlg = mh$6.names[options.hashAlg];

  // Persist the new parent DAGNode
  const cid = await context.ipld.put(options.parent, mc$4.DAG_PB, {
    cidVersion: options.cidVersion,
    hashAlg,
    onlyHash: !options.flush
  });

  return {
    node: options.parent,
    cid,
    size: options.parent.size
  }
};

/**
 * @param {MfsContext} context
 * @param {object} options
 * @param {CID} options.cid
 * @param {string} options.name
 * @param {number} options.size
 * @param {DAGNode} options.parent
 * @param {HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 */
const addToShardedDirectory = async (context, options) => {
  const {
    shard, path
  } = await addFileToShardedDirectory(context, options);

  const result = await last$2(shard.flush(context.block));
  /** @type {DAGNode} */
  const node = await context.ipld.get(result.cid);

  // we have written out the shard, but only one sub-shard will have been written so replace it in the original shard
  const oldLink = options.parent.Links
    .find(link => link.Name.substring(0, 2) === path[0].prefix);

  /** @type {DAGLink | undefined} */
  const newLink = node.Links
    .find(link => link.Name.substring(0, 2) === path[0].prefix);

  if (!newLink) {
    throw new Error(`No link found with prefix ${path[0].prefix}`)
  }

  if (oldLink) {
    options.parent.rmLink(oldLink.Name);
  }

  options.parent.addLink(newLink);

  return updateHamtDirectory$1(context, options.parent.Links, path[0].bucket, options)
};

/**
 * @param {MfsContext} context
 * @param {object} options
 * @param {CID} options.cid
 * @param {string} options.name
 * @param {number} options.size
 * @param {DAGNode} options.parent
 * @param {HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 */
const addFileToShardedDirectory = async (context, options) => {
  const file = {
    name: options.name,
    cid: options.cid,
    size: options.size
  };

  // start at the root bucket and descend, loading nodes as we go
  const rootBucket = await recreateInitialHamtLevel(options.parent.Links);
  const node = UnixFS$6.unmarshal(options.parent.Data);
  const importerOptions = defaultImporterOptions();

  const shard = new DirSharded({
    root: true,
    dir: true,
    parent: null,
    parentKey: null,
    path: '',
    dirty: true,
    flat: false,
    mode: node.mode
  }, {
    hamtHashFn: importerOptions.hamtHashFn,
    hamtHashCode: importerOptions.hamtHashCode,
    hamtBucketBits: importerOptions.hamtBucketBits,
    ...options
  });
  shard._bucket = rootBucket;

  if (node.mtime) {
    // update mtime if previously set
    shard.mtime = new Date();
  }

  // load subshards until the bucket & position no longer changes
  const position = await rootBucket._findNewBucketAndPos(file.name);
  const path = toBucketPath(position);
  path[0].node = options.parent;
  let index = 0;

  while (index < path.length) {
    const segment = path[index];
    index++;
    const node = segment.node;

    if (!node) {
      throw new Error('Segment had no node')
    }

    const link = node.Links
      .find(link => link.Name.substring(0, 2) === segment.prefix);

    if (!link) {
      // prefix is new, file will be added to the current bucket
      log$c(`Link ${segment.prefix}${file.name} will be added`);
      index = path.length;

      break
    }

    if (link.Name === `${segment.prefix}${file.name}`) {
      // file already existed, file will be added to the current bucket
      log$c(`Link ${segment.prefix}${file.name} will be replaced`);
      index = path.length;

      break
    }

    if (link.Name.length > 2) {
      // another file had the same prefix, will be replaced with a subshard
      log$c(`Link ${link.Name} ${link.Hash} will be replaced with a subshard`);
      index = path.length;

      break
    }

    // load sub-shard
    log$c(`Found subshard ${segment.prefix}`);
    const subShard = await context.ipld.get(link.Hash);

    // subshard hasn't been loaded, descend to the next level of the HAMT
    if (!path[index]) {
      log$c(`Loaded new subshard ${segment.prefix}`);
      await recreateHamtLevel(subShard.Links, rootBucket, segment.bucket, parseInt(segment.prefix, 16));

      const position = await rootBucket._findNewBucketAndPos(file.name);

      path.push({
        bucket: position.bucket,
        prefix: toPrefix(position.pos),
        node: subShard
      });

      break
    }

    const nextSegment = path[index];

    // add next levels worth of links to bucket
    await addLinksToHamtBucket(subShard.Links, nextSegment.bucket, rootBucket);

    nextSegment.node = subShard;
  }

  // finally add the new file into the shard
  await shard._bucket.put(file.name, {
    size: file.size,
    cid: file.cid
  });

  return {
    shard, path
  }
};

/**
 * @param {{ pos: number, bucket: Bucket }} position
 * @returns {{ bucket: Bucket, prefix: string, node?: DAGNode }[]}
 */
const toBucketPath = (position) => {
  const path = [{
    bucket: position.bucket,
    prefix: toPrefix(position.pos)
  }];

  let bucket = position.bucket._parent;
  let positionInBucket = position.bucket._posAtParent;

  while (bucket) {
    path.push({
      bucket,
      prefix: toPrefix(positionInBucket)
    });

    positionInBucket = bucket._posAtParent;
    bucket = bucket._parent;
  }

  path.reverse();

  return path
};

var addLink_1 = addLink$7;

const log$b = require$$2$4('ipfs:mfs:utils:update-tree');
const addLink$6 = addLink_1;

const defaultOptions$a = {
  shardSplitThreshold: 1000
};

/**
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids')} CID
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('../').MfsContext} MfsContext
 * @typedef {import('./to-trail').MfsTrail} MfsTrail
 */

/**
 * Loop backwards through the trail, replacing links of all components to update CIDs
 *
 * @param {MfsContext} context
 * @param {MfsTrail[]} trail
 * @param {object} options
 * @param {number} options.shardSplitThreshold
 * @param {HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 */
const updateTree$6 = async (context, trail, options) => {
  options = Object.assign({}, defaultOptions$a, options);

  log$b('Trail', trail);
  trail = trail.slice().reverse();

  let index = 0;
  let child;

  for await (const node of context.ipld.getMany(trail.map(node => node.cid))) {
    const cid = trail[index].cid;
    const name = trail[index].name;
    index++;

    if (!child) {
      child = {
        cid,
        name,
        size: node.size
      };

      continue
    }

    /** @type {{ cid: CID, size: number }} */
    const result = await addLink$6(context, {
      parent: node,
      name: child.name,
      cid: child.cid,
      size: child.size,
      flush: options.flush,
      shardSplitThreshold: options.shardSplitThreshold,
      hashAlg: options.hashAlg,
      cidVersion: options.cidVersion
    });

    // new child for next loop
    child = {
      cid: result.cid,
      name,
      size: result.size
    };
  }

  // @ts-ignore - child is possibly undefined
  const { cid } = child;
  log$b(`Final CID ${cid}`);

  return cid
};

var updateTree_1 = updateTree$6;

const log$a = require$$2$4('ipfs:mfs:utils:update-mfs-root');
const {
  MFS_ROOT_KEY: MFS_ROOT_KEY$1
} = utils$6;
const errCode$g = require$$1$1;

/**
 * @typedef {import('../').MfsContext} MfsContext
 */

/**
 * @param {MfsContext} context
 * @param {import('cids')} cid
 * @param {import('ipfs-core-types/src/utils').AbortOptions} options
 */
const updateMfsRoot$6 = async (context, cid, options) => {
  if (options && options.signal && options.signal.aborted) {
    throw errCode$g(new Error('Request aborted'), 'ERR_ABORTED', { name: 'Aborted' })
  }

  log$a(`New MFS root will be ${cid}`);

  await context.repo.datastore.put(MFS_ROOT_KEY$1, cid.bytes);

  return cid
};

var updateMfsRoot_1 = updateMfsRoot$6;

const { UnixFS: UnixFS$5 } = require$$3$3;
const {
  DAGNode: DAGNode$7
} = require$$0$9;
const mc$3 = require$$6$1;
const mh$5 = require$$1$3.multihash;

/**
 * @typedef {import('ipfs-unixfs').MtimeLike} MtimeLike
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('../').MfsContext} MfsContext
 */

/**
 * @param {MfsContext} context
 * @param {'file' | 'directory'} type
 * @param {object} options
 * @param {import('multihashes').HashName} options.hashAlg
 * @param {CIDVersion} options.cidVersion
 * @param {boolean} options.flush
 * @param {MtimeLike} [options.mtime]
 * @param {number} [options.mode]
 */
const createNode$1 = async (context, type, options) => {
  const hashAlg = mh$5.names[options.hashAlg];
  const metadata = new UnixFS$5({
    type,
    mode: options.mode,
    // @ts-ignore TODO: restore hrtime support to ipfs-unixfs constructor - it's in the code, just not the signature
    mtime: options.mtime
  });

  const node = new DAGNode$7(metadata.marshal());
  const cid = await context.ipld.put(node, mc$3.DAG_PB, {
    cidVersion: options.cidVersion,
    hashAlg,
    onlyHash: !options.flush
  });

  return {
    cid,
    node
  }
};

var createNode_1 = createNode$1;

const errCode$f = require$$1$1;
const log$9 = require$$2$4('ipfs:mfs:mkdir');
const { exporter: exporter$2 } = require$$0$d;
const createNode = createNode_1;
const toPathComponents$1 = toPathComponents_1;
const updateMfsRoot$5 = updateMfsRoot_1;
const updateTree$5 = updateTree_1;
const addLink$5 = addLink_1;
const withMfsRoot = withMfsRoot$1;
const mergeOptions$c = require$$0$2.bind({ ignoreUndefined: true });
const withTimeoutOption$C = require$$0;

/**
 * @typedef {import('ipld-dag-pb').DAGNode} DAGNode
 * @typedef {import('ipld-dag-pb').DAGLink} DAGLink
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids')} CID
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('ipfs-unixfs').MtimeLike} MtimeLike
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} parents
 * @property {HashName} hashAlg
 * @property {CIDVersion} cidVersion
 * @property {number} shardSplitThreshold
 * @property {boolean} flush
 * @property {number} [mode]
 * @property {MtimeLike} [mtime]
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$9 = {
  parents: false,
  hashAlg: 'sha2-256',
  cidVersion: 0,
  shardSplitThreshold: 1000,
  flush: true
};

/**
 * @param {MfsContext} context
 */
var mkdir$2 = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["mkdir"]}
   */
  async function mfsMkdir (path, options = {}) {
    /** @type {DefaultOptions} */
    const opts = mergeOptions$c(defaultOptions$9, options);

    if (!path) {
      throw new Error('no path given to Mkdir')
    }

    path = path.trim();

    if (path === '/') {
      if (opts.parents) {
        return
      }

      throw errCode$f(new Error('cannot create directory \'/\': Already exists'), 'ERR_INVALID_PATH')
    }

    if (path.substring(0, 1) !== '/') {
      throw errCode$f(new Error('paths must start with a leading slash'), 'ERR_INVALID_PATH')
    }

    log$9(`Creating ${path}`);

    const pathComponents = toPathComponents$1(path);

    if (pathComponents[0] === 'ipfs') {
      throw errCode$f(new Error("path cannot have the prefix 'ipfs'"), 'ERR_INVALID_PATH')
    }

    const root = await withMfsRoot(context, opts);
    let parent;
    const trail = [];
    const emptyDir = await createNode(context, 'directory', opts);

    // make sure the containing folder exists, creating it if necessary
    for (let i = 0; i <= pathComponents.length; i++) {
      const subPathComponents = pathComponents.slice(0, i);
      const subPath = `/ipfs/${root}/${subPathComponents.join('/')}`;

      try {
        parent = await exporter$2(subPath, context.ipld);

        if (parent.type !== 'file' && parent.type !== 'directory') {
          throw errCode$f(new Error(`${path} was not a UnixFS node`), 'ERR_NOT_UNIXFS')
        }

        if (i === pathComponents.length) {
          if (opts.parents) {
            return
          }

          throw errCode$f(new Error('file already exists'), 'ERR_ALREADY_EXISTS')
        }

        trail.push({
          name: parent.name,
          cid: parent.cid
        });
      } catch (err) {
        if (err.code === 'ERR_NOT_FOUND') {
          if (i < pathComponents.length && !opts.parents) {
            throw errCode$f(new Error(`Intermediate directory path ${subPath} does not exist, use the -p flag to create it`), 'ERR_NOT_FOUND')
          }

          // add the intermediate directory
          await addEmptyDir$1(context, subPathComponents[subPathComponents.length - 1], emptyDir, trail[trail.length - 1], trail, opts);
        } else {
          throw err
        }
      }
    }

    // add an empty dir to the last path component
    // await addEmptyDir(context, pathComponents[pathComponents.length - 1], emptyDir, parent, trail)

    // update the tree from the leaf to the root
    const newRootCid = await updateTree$5(context, trail, opts);

    // Update the MFS record with the new CID for the root of the tree
    await updateMfsRoot$5(context, newRootCid, opts);
  }

  return withTimeoutOption$C(mfsMkdir)
};

/**
 * @param {MfsContext} context
 * @param {string} childName
 * @param {{ cid: CID, node: { size: number }}} emptyDir
 * @param {{ cid?: CID, node?: DAGNode }} parent
 * @param {{ name: string, cid: CID }[]} trail
 * @param {DefaultOptions} options
 */
const addEmptyDir$1 = async (context, childName, emptyDir, parent, trail, options) => {
  log$9(`Adding empty dir called ${childName} to ${parent.cid}`);

  const result = await addLink$5(context, {
    parent: parent.node,
    parentCid: parent.cid,
    size: emptyDir.node.size,
    cid: emptyDir.cid,
    name: childName,
    hashAlg: options.hashAlg,
    cidVersion: options.cidVersion,
    flush: options.flush,
    shardSplitThreshold: options.shardSplitThreshold
  });

  trail[trail.length - 1].cid = result.cid;

  trail.push({
    name: childName,
    cid: emptyDir.cid
  });
};

const mkdir$1 = mkdir$2;
const stat$4 = stat$5;
const log$8 = require$$2$4('ipfs:mfs:cp');
const errCode$e = require$$1$1;
const updateTree$4 = updateTree_1;
const updateMfsRoot$4 = updateMfsRoot_1;
const addLink$4 = addLink_1;
const toMfsPath$6 = toMfsPath_1;
const mergeOptions$b = require$$0$2.bind({ ignoreUndefined: true });
const toTrail$4 = toTrail_1;
const withTimeoutOption$B = require$$0;

/**
 * @typedef {import('ipld-dag-pb').DAGNode} DAGNode
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids')} CID
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('ipfs-unixfs').Mtime} Mtime
 * @typedef {import('./utils/to-mfs-path').MfsPath} MfsPath
 * @typedef {import('./utils/to-trail').MfsTrail} MfsTrail
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} parents
 * @property {boolean} flush
 * @property {HashName} hashAlg
 * @property {CIDVersion} cidVersion
 * @property {number} shardSplitThreshold
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$8 = {
  parents: false,
  flush: true,
  hashAlg: 'sha2-256',
  cidVersion: 0,
  shardSplitThreshold: 1000
};

/**
 * @param {MfsContext} context
 */
var cp$2 = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["cp"]}
   */
  async function mfsCp (from, to, opts = {}) {
    /** @type {DefaultOptions} */
    const options = mergeOptions$b(defaultOptions$8, opts);

    if (!Array.isArray(from)) {
      from = [from];
    }

    const sources = await Promise.all(
      from.map(path => toMfsPath$6(context, path, options))
    );
    let destination = await toMfsPath$6(context, to, options);

    if (!sources.length || !destination) {
      throw errCode$e(new Error('Please supply at least one source'), 'ERR_INVALID_PARAMS')
    }

    // make sure all sources exist
    const missing = sources.find(source => !source.exists);

    if (missing) {
      throw errCode$e(new Error(`${missing.path} does not exist`), 'ERR_INVALID_PARAMS')
    }

    const destinationIsDirectory = isDirectory(destination);

    if (destination.exists) {
      log$8('Destination exists');

      if (sources.length === 1 && !destinationIsDirectory) {
        throw errCode$e(new Error('directory already has entry by that name'), 'ERR_ALREADY_EXISTS')
      }
    } else {
      log$8('Destination does not exist');

      if (sources.length > 1) {
        // copying multiple files to one location, destination will be a directory
        if (!options.parents) {
          throw errCode$e(new Error('destination did not exist, pass -p to create intermediate directories'), 'ERR_INVALID_PARAMS')
        }

        await mkdir$1(context)(destination.path, options);
        destination = await toMfsPath$6(context, destination.path, options);
      } else if (destination.parts.length > 1) {
        // copying to a folder, create it if necessary
        const parentFolder = `/${destination.parts.slice(0, -1).join('/')}`;

        try {
          await stat$4(context)(parentFolder, options);
        } catch (err) {
          if (err.code !== 'ERR_NOT_FOUND') {
            throw err
          }

          if (!options.parents) {
            throw errCode$e(new Error('destination did not exist, pass -p to create intermediate directories'), 'ERR_INVALID_PARAMS')
          }

          await mkdir$1(context)(parentFolder, options);
          destination = await toMfsPath$6(context, destination.path, options);
        }
      }
    }

    const destinationPath = isDirectory(destination) ? destination.mfsPath : destination.mfsDirectory;
    const trail = await toTrail$4(context, destinationPath);

    if (sources.length === 1) {
      const source = sources.pop();

      if (!source) {
        throw errCode$e(new Error('could not find source'), 'ERR_INVALID_PARAMS')
      }

      const destinationName = destinationIsDirectory ? source.name : destination.name;

      log$8(`Only one source, copying to destination ${destinationIsDirectory ? 'directory' : 'file'} ${destinationName}`);

      return copyToFile(context, source, destinationName, trail, options)
    }

    log$8('Multiple sources, wrapping in a directory');
    return copyToDirectory(context, sources, destination, trail, options)
  }

  return withTimeoutOption$B(mfsCp)
};

/**
 * @param {*} destination
 */
const isDirectory = (destination) => {
  return destination.unixfs &&
    destination.unixfs.type &&
    destination.unixfs.type.includes('directory')
};

/**
 * @param {MfsContext} context
 * @param {MfsPath} source
 * @param {string} destination
 * @param {MfsTrail[]} destinationTrail
 * @param {DefaultOptions} options
 */
const copyToFile = async (context, source, destination, destinationTrail, options) => {
  let parent = destinationTrail.pop();

  if (!parent) {
    throw errCode$e(new Error('destination had no parent'), 'ERR_INVALID_PARAMS')
  }

  parent = await addSourceToParent(context, source, destination, parent, options);

  // update the tree with the new containing directory
  destinationTrail.push(parent);

  const newRootCid = await updateTree$4(context, destinationTrail, options);

  // Update the MFS record with the new CID for the root of the tree
  await updateMfsRoot$4(context, newRootCid, options);
};

/**
 * @param {MfsContext} context
 * @param {MfsPath[]} sources
 * @param {*} destination
 * @param {MfsTrail[]} destinationTrail
 * @param {DefaultOptions} options
 */
const copyToDirectory = async (context, sources, destination, destinationTrail, options) => {
  // copy all the sources to the destination
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];

    destination = await addSourceToParent(context, source, source.name, destination, options);
  }

  // update the tree with the new containing directory
  destinationTrail[destinationTrail.length - 1] = destination;

  const newRootCid = await updateTree$4(context, destinationTrail, options);

  // Update the MFS record with the new CID for the root of the tree
  await updateMfsRoot$4(context, newRootCid, options);
};

/**
 * @param {MfsContext} context
 * @param {MfsPath} source
 * @param {string} childName
 * @param {*} parent
 * @param {DefaultOptions} options
 * @returns {Promise<MfsTrail>}
 */
const addSourceToParent = async (context, source, childName, parent, options) => {
  const sourceBlock = await context.repo.blocks.get(source.cid);

  const {
    node,
    cid
  } = await addLink$4(context, {
    parentCid: parent.cid,
    size: sourceBlock.data.length,
    cid: source.cid,
    name: childName,
    hashAlg: options.hashAlg,
    cidVersion: options.cidVersion,
    flush: options.flush,
    shardSplitThreshold: options.shardSplitThreshold
  });

  parent.node = node;
  parent.cid = cid;
  parent.size = node.size;

  return parent
};

const {
  DAGLink: DAGLink$2
} = require$$0$9;
const CID$5 = require$$0$1;
const log$7 = require$$2$4('ipfs:mfs:core:utils:remove-link');
const { UnixFS: UnixFS$4 } = require$$3$3;
const {
  generatePath,
  updateHamtDirectory
} = hamtUtils;
const errCode$d = require$$1$1;
const mc$2 = require$$6$1;
const mh$4 = require$$1$3.multihash;

/**
 * @typedef {import('../').MfsContext} MfsContext
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('hamt-sharding').Bucket<any>} Bucket
 * @typedef {import('ipld-dag-pb').DAGNode} DAGNode
 *
 * @typedef {object} RemoveLinkOptions
 * @property {string} name
 * @property {number} shardSplitThreshold
 * @property {HashName} hashAlg
 * @property {CIDVersion} cidVersion
 * @property {boolean} flush
 * @property {CID} [parentCid]
 * @property {DAGNode} [parent]
 *
 * @typedef {object} RemoveLinkOptionsInternal
 * @property {string} name
 * @property {number} shardSplitThreshold
 * @property {HashName} hashAlg
 * @property {CIDVersion} cidVersion
 * @property {boolean} flush
 * @property {DAGNode} parent
 */

/**
 * @param {MfsContext} context
 * @param {RemoveLinkOptions} options
 */
const removeLink$1 = async (context, options) => {
  let parent = options.parent;

  if (options.parentCid) {
    if (!CID$5.isCID(options.parentCid)) {
      throw errCode$d(new Error('Invalid CID passed to removeLink'), 'EINVALIDPARENTCID')
    }

    log$7(`Loading parent node ${options.parentCid}`);
    parent = await context.ipld.get(options.parentCid);
  }

  if (!parent) {
    throw errCode$d(new Error('No parent node or CID passed to removeLink'), 'EINVALIDPARENT')
  }

  if (!options.name) {
    throw errCode$d(new Error('No child name passed to removeLink'), 'EINVALIDCHILDNAME')
  }

  const meta = UnixFS$4.unmarshal(parent.Data);

  if (meta.type === 'hamt-sharded-directory') {
    log$7(`Removing ${options.name} from sharded directory`);

    return removeFromShardedDirectory(context, {
      ...options,
      parent
    })
  }

  log$7(`Removing link ${options.name} regular directory`);

  return removeFromDirectory(context, {
    ...options,
    parent
  })
};

/**
 * @param {MfsContext} context
 * @param {RemoveLinkOptionsInternal} options
 */
const removeFromDirectory = async (context, options) => {
  const hashAlg = mh$4.names[options.hashAlg];

  options.parent.rmLink(options.name);
  const cid = await context.ipld.put(options.parent, mc$2.DAG_PB, {
    cidVersion: options.cidVersion,
    hashAlg
  });

  log$7(`Updated regular directory ${cid}`);

  return {
    node: options.parent,
    cid
  }
};

/**
 * @param {MfsContext} context
 * @param {RemoveLinkOptionsInternal} options
 */
const removeFromShardedDirectory = async (context, options) => {
  const {
    rootBucket, path
  } = await generatePath(context, options.name, options.parent);

  await rootBucket.del(options.name);

  const {
    node
  } = await updateShard(context, path, options.name, options);

  return updateHamtDirectory(context, node.Links, rootBucket, options)
};

/**
 * @param {MfsContext} context
 * @param {{ bucket: Bucket, prefix: string, node?: DAGNode }[]} positions
 * @param {string} name
 * @param {RemoveLinkOptionsInternal} options
 * @returns {Promise<{ node: DAGNode, cid: CID, size: number }>}
 */
const updateShard = async (context, positions, name, options) => {
  const last = positions.pop();

  if (!last) {
    throw errCode$d(new Error('Could not find parent'), 'EINVALIDPARENT')
  }

  const {
    bucket,
    prefix,
    node
  } = last;

  if (!node) {
    throw errCode$d(new Error('Could not find parent'), 'EINVALIDPARENT')
  }

  const link = node.Links
    .find(link => link.Name.substring(0, 2) === prefix);

  if (!link) {
    throw errCode$d(new Error(`No link found with prefix ${prefix} for file ${name}`), 'ERR_NOT_FOUND')
  }

  if (link.Name === `${prefix}${name}`) {
    log$7(`Removing existing link ${link.Name}`);

    node.rmLink(link.Name);

    await bucket.del(name);

    return updateHamtDirectory(context, node.Links, bucket, options)
  }

  log$7(`Descending into sub-shard ${link.Name} for ${prefix}${name}`);

  const result = await updateShard(context, positions, name, options);

  let cid = result.cid;
  let size = result.size;
  let newName = prefix;

  if (result.node.Links.length === 1) {
    log$7(`Removing subshard for ${prefix}`);

    // convert shard back to normal dir
    const link = result.node.Links[0];

    newName = `${prefix}${link.Name.substring(2)}`;
    cid = link.Hash;
    size = link.Tsize;
  }

  log$7(`Updating shard ${prefix} with name ${newName}`);

  return updateShardParent(context, bucket, node, prefix, newName, size, cid, options)
};

/**
 * @param {MfsContext} context
 * @param {Bucket} bucket
 * @param {DAGNode} parent
 * @param {string} oldName
 * @param {string} newName
 * @param {number} size
 * @param {CID} cid
 * @param {RemoveLinkOptionsInternal} options
 */
const updateShardParent = (context, bucket, parent, oldName, newName, size, cid, options) => {
  parent.rmLink(oldName);
  parent.addLink(new DAGLink$2(newName, size, cid));

  return updateHamtDirectory(context, parent.Links, bucket, options)
};

var removeLink_1 = removeLink$1;

const errCode$c = require$$1$1;
const updateTree$3 = updateTree_1;
const updateMfsRoot$3 = updateMfsRoot_1;
const removeLink = removeLink_1;
const toMfsPath$5 = toMfsPath_1;
const toTrail$3 = toTrail_1;
const withTimeoutOption$A = require$$0;
const mergeOptions$a = require$$0$2.bind({ ignoreUndefined: true });

/**
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} recursive
 * @property {CIDVersion} cidVersion
 * @property {HashName} hashAlg
 * @property {boolean} flush
 * @property {number} shardSplitThreshold
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$7 = {
  recursive: false,
  cidVersion: 0,
  hashAlg: 'sha2-256',
  flush: true,
  shardSplitThreshold: 1000
};

/**
 * @param {MfsContext} context
 */
var rm$3 = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["rm"]}
   */
  async function mfsRm (paths, opts = {}) {
    /** @type {DefaultOptions} */
    const options = mergeOptions$a(defaultOptions$7, opts);

    if (!Array.isArray(paths)) {
      paths = [paths];
    }

    const sources = await Promise.all(
      paths.map(path => toMfsPath$5(context, path, options))
    );

    if (!sources.length) {
      throw errCode$c(new Error('Please supply at least one path to remove'), 'ERR_INVALID_PARAMS')
    }

    sources.forEach(source => {
      if (source.path === '/') {
        throw errCode$c(new Error('Cannot delete root'), 'ERR_INVALID_PARAMS')
      }
    });

    for (const source of sources) {
      await removePath(context, source.path, options);
    }
  }

  return withTimeoutOption$A(mfsRm)
};

/**
 * @param {MfsContext} context
 * @param {string} path
 * @param {DefaultOptions} options
 */
const removePath = async (context, path, options) => {
  const mfsPath = await toMfsPath$5(context, path, options);
  const trail = await toTrail$3(context, mfsPath.mfsPath);
  const child = trail[trail.length - 1];
  trail.pop();
  const parent = trail[trail.length - 1];

  if (!parent) {
    throw errCode$c(new Error(`${path} does not exist`), 'ERR_NOT_FOUND')
  }

  if (child.type === 'directory' && !options.recursive) {
    throw errCode$c(new Error(`${path} is a directory, use -r to remove directories`), 'ERR_WAS_DIR')
  }

  const {
    cid
  } = await removeLink(context, {
    parentCid: parent.cid,
    name: child.name,
    hashAlg: options.hashAlg,
    cidVersion: options.cidVersion,
    flush: options.flush,
    shardSplitThreshold: options.shardSplitThreshold
  });

  parent.cid = cid;

  // update the tree with the new child
  const newRootCid = await updateTree$3(context, trail, options);

  // Update the MFS record with the new CID for the root of the tree
  await updateMfsRoot$3(context, newRootCid, options);
};

const mergeOptions$9 = require$$0$2.bind({ ignoreUndefined: true });
const toMfsPath$4 = toMfsPath_1;
const log$6 = require$$2$4('ipfs:mfs:touch');
const errCode$b = require$$1$1;
const { UnixFS: UnixFS$3 } = require$$3$3;
const toTrail$2 = toTrail_1;
const addLink$3 = addLink_1;
const updateTree$2 = updateTree_1;
const updateMfsRoot$2 = updateMfsRoot_1;
const { DAGNode: DAGNode$6 } = require$$0$9;
const mc$1 = require$$6$1;
const mh$3 = require$$1$3.multihash;
const { pipe } = require$$3$1;
const { importer: importer$1 } = require$$0$c;
const { recursive } = require$$0$d;
const last$1 = require$$0$5;
const cp$1 = cp$2;
const rm$2 = rm$3;
// @ts-ignore - TODO: refactor this so it does not require a deep require
const persist = require$$18;
const withTimeoutOption$z = require$$0;

/**
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} flush
 * @property {HashName} hashAlg
 * @property {CIDVersion} cidVersion
 * @property {number} shardSplitThreshold
 * @property {boolean} recursive
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$6 = {
  flush: true,
  shardSplitThreshold: 1000,
  hashAlg: 'sha2-256',
  cidVersion: 0,
  recursive: false
};

/**
 * @param {string} mode
 * @param {number} originalMode
 * @param {boolean} isDirectory
 */
function calculateModification (mode, originalMode, isDirectory) {
  let modification = 0;

  if (mode.includes('x') || (mode.includes('X') && (isDirectory || (originalMode & 0o1 || originalMode & 0o10 || originalMode & 0o100)))) {
    modification += 1;
  }

  if (mode.includes('w')) {
    modification += 2;
  }

  if (mode.includes('r')) {
    modification += 4;
  }

  return modification
}

/**
 * @param {string} references
 * @param {number} modification
 */
function calculateUGO (references, modification) {
  let ugo = 0;

  if (references.includes('u')) {
    ugo += (modification << 6);
  }

  if (references.includes('g')) {
    ugo += (modification << 3);
  }

  if (references.includes('o')) {
    ugo += (modification);
  }

  return ugo
}

/**
 * @param {string} references
 * @param {string} mode
 * @param {number} modification
 */
function calculateSpecial (references, mode, modification) {
  if (mode.includes('t')) {
    modification += parseInt('1000', 8);
  }

  if (mode.includes('s')) {
    if (references.includes('u')) {
      modification += parseInt('4000', 8);
    }

    if (references.includes('g')) {
      modification += parseInt('2000', 8);
    }
  }

  return modification
}

/**
 * https://en.wikipedia.org/wiki/Chmod#Symbolic_modes
 *
 * @param {string} input
 * @param {number} originalMode
 * @param {boolean} isDirectory
 */
function parseSymbolicMode (input, originalMode, isDirectory) {
  if (!originalMode) {
    originalMode = 0;
  }

  const match = input.match(/^(u?g?o?a?)(-?\+?=?)?(r?w?x?X?s?t?)$/);

  if (!match) {
    throw new Error(`Invalid file mode: ${input}`)
  }

  let [
    ,
    references,
    operator,
    mode
  ] = match;

  if (references === 'a' || !references) {
    references = 'ugo';
  }

  let modification = calculateModification(mode, originalMode, isDirectory);
  modification = calculateUGO(references, modification);
  modification = calculateSpecial(references, mode, modification);

  if (operator === '=') {
    if (references.includes('u')) {
      // blank u bits
      originalMode = originalMode & parseInt('7077', 8);

      // or them together
      originalMode = originalMode | modification;
    }

    if (references.includes('g')) {
      // blank g bits
      originalMode = originalMode & parseInt('7707', 8);

      // or them together
      originalMode = originalMode | modification;
    }

    if (references.includes('o')) {
      // blank o bits
      originalMode = originalMode & parseInt('7770', 8);

      // or them together
      originalMode = originalMode | modification;
    }

    return originalMode
  }

  if (operator === '+') {
    return modification | originalMode
  }

  if (operator === '-') {
    return modification ^ originalMode
  }

  return originalMode
}

/**
 * @param {string | InstanceType<typeof window.String> | number} mode
 * @param {UnixFS} metadata
 * @returns {number}
 */
function calculateMode (mode, metadata) {
  if (mode instanceof String || typeof mode === 'string') {
    const strMode = `${mode}`;

    if (strMode.match(/^\d+$/g)) {
      mode = parseInt(strMode, 8);
    } else {
      // @ts-ignore freaks out over the curr: number, acc: string thing
      mode = 0 + strMode.split(',').reduce((curr, acc) => {
        return parseSymbolicMode(acc, curr, metadata.isDirectory())
      }, metadata.mode || 0);
    }
  }

  return mode
}

/**
 * @param {MfsContext} context
 */
var chmod = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["chmod"]}
   */
  async function mfsChmod (path, mode, options = {}) {
    /** @type {DefaultOptions} */
    const opts = mergeOptions$9(defaultOptions$6, options);

    log$6(`Fetching stats for ${path}`);

    const {
      cid,
      mfsDirectory,
      name
    } = await toMfsPath$4(context, path, opts);

    if (cid.codec !== 'dag-pb') {
      throw errCode$b(new Error(`${path} was not a UnixFS node`), 'ERR_NOT_UNIXFS')
    }

    if (opts.recursive) {
      // recursively export from root CID, change perms of each entry then reimport
      // but do not reimport files, only manipulate dag-pb nodes
      const root = await pipe(
        async function * () {
          for await (const entry of recursive(cid, context.ipld)) {
            if (entry.type !== 'file' && entry.type !== 'directory') {
              throw errCode$b(new Error(`${path} was not a UnixFS node`), 'ERR_NOT_UNIXFS')
            }

            entry.unixfs.mode = calculateMode(mode, entry.unixfs);

            const node = new DAGNode$6(entry.unixfs.marshal(), entry.node.Links);

            yield {
              path: entry.path,
              content: node
            };
          }
        },
        // @ts-ignore source is not compatible because we are not importing files
        (source) => importer$1(source, context.block, {
          ...opts,
          pin: false,
          dagBuilder: async function * (source, block, opts) {
            for await (const entry of source) {
              yield async function () {
                /** @type {DAGNode} */
                // @ts-ignore - cannot derive type
                const node = entry.content;

                const buf = node.serialize();
                const cid = await persist(buf, block, opts);
                const unixfs = UnixFS$3.unmarshal(node.Data);

                return {
                  cid,
                  size: buf.length,
                  path: entry.path,
                  unixfs
                }
              };
            }
          }
        }),
        (nodes) => last$1(nodes)
      );

      if (!root) {
        throw errCode$b(new Error(`Could not chmod ${path}`), 'ERR_COULD_NOT_CHMOD')
      }

      // remove old path from mfs
      await rm$2(context)(path, opts);

      // add newly created tree to mfs at path
      await cp$1(context)(`/ipfs/${root.cid}`, path, opts);

      return
    }

    let node = await context.ipld.get(cid);
    const metadata = UnixFS$3.unmarshal(node.Data);
    metadata.mode = calculateMode(mode, metadata);
    node = new DAGNode$6(metadata.marshal(), node.Links);

    /** @type {HashName} */
    const hashAlg = opts.hashAlg || defaultOptions$6.hashAlg;

    const updatedCid = await context.ipld.put(node, mc$1.DAG_PB, {
      cidVersion: cid.version,
      hashAlg: mh$3.names[hashAlg],
      onlyHash: !opts.flush
    });

    const trail = await toTrail$2(context, mfsDirectory);
    const parent = trail[trail.length - 1];
    const parentNode = await context.ipld.get(parent.cid);

    const result = await addLink$3(context, {
      parent: parentNode,
      name: name,
      cid: updatedCid,
      size: node.serialize().length,
      flush: opts.flush,
      hashAlg: hashAlg,
      cidVersion: cid.version,
      shardSplitThreshold: Infinity
    });

    parent.cid = result.cid;

    // update the tree with the new child
    const newRootCid = await updateTree$2(context, trail, opts);

    // Update the MFS record with the new CID for the root of the tree
    await updateMfsRoot$2(context, newRootCid, opts);
  }

  return withTimeoutOption$z(mfsChmod)
};

const stat$3 = stat$5;
const withTimeoutOption$y = require$$0;
const mergeOptions$8 = require$$0$2.bind({ ignoreUndefined: true });

/**
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$5 = {};

/**
 * @param {MfsContext} context
 */
var flush = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["flush"]}
   */
  async function mfsFlush (path, options = {}) {
    /** @type {DefaultOptions} */
    options = mergeOptions$8(defaultOptions$5, options);

    const { cid } = await stat$3(context)(path, options);

    return cid
  }

  return withTimeoutOption$y(mfsFlush)
};

const cp = cp$2;
const rm$1 = rm$3;
const mergeOptions$7 = require$$0$2.bind({ ignoreUndefined: true });
const withTimeoutOption$x = require$$0;

/**
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} parents
 * @property {boolean} flush
 * @property {CIDVersion} cidVersion
 * @property {HashName} hashAlg
 * @property {number} shardSplitThreshold
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$4 = {
  parents: false,
  flush: true,
  cidVersion: 0,
  hashAlg: 'sha2-256',
  shardSplitThreshold: 1000
};

/**
 * @param {MfsContext} context
 */
var mv = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["mv"]}
   */
  async function mfsMv (from, to, options = {}) {
    /** @type {DefaultOptions} */
    const opts = mergeOptions$7(defaultOptions$4, options);

    await cp(context)(from, to, opts);
    await rm$1(context)(from, {
      ...opts,
      recursive: true
    });
  }

  return withTimeoutOption$x(mfsMv)
};

const mergeOptions$6 = require$$0$2.bind({ ignoreUndefined: true });
const toMfsPath$3 = toMfsPath_1;
const log$5 = require$$2$4('ipfs:mfs:touch');
const errCode$a = require$$1$1;
const { UnixFS: UnixFS$2 } = require$$3$3;
const toTrail$1 = toTrail_1;
const addLink$2 = addLink_1;
const updateTree$1 = updateTree_1;
const updateMfsRoot$1 = updateMfsRoot_1;
const { DAGNode: DAGNode$5 } = require$$0$9;
const mc = require$$6$1;
const mh$2 = require$$1$3.multihash;
const withTimeoutOption$w = require$$0;

/**
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('ipfs-unixfs').MtimeLike} MtimeLike
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {boolean} flush
 * @property {number} shardSplitThreshold
 * @property {CIDVersion} cidVersion
 * @property {HashName} hashAlg
 * @property {MtimeLike} [mtime]
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$3 = {
  flush: true,
  shardSplitThreshold: 1000,
  cidVersion: 0,
  hashAlg: 'sha2-256'
};

/**
 * @param {MfsContext} context
 */
var touch = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["touch"]}
   */
  async function mfsTouch (path, options = {}) {
    /** @type {DefaultOptions} */
    const settings = mergeOptions$6(defaultOptions$3, options);
    settings.mtime = settings.mtime || new Date();

    log$5(`Touching ${path} mtime: ${settings.mtime}`);

    const {
      cid,
      mfsDirectory,
      name,
      exists
    } = await toMfsPath$3(context, path, settings);

    let node;
    let updatedCid;

    let cidVersion = settings.cidVersion;

    if (!exists) {
      const metadata = new UnixFS$2({
        type: 'file',
        // @ts-ignore TODO: restore hrtime support to ipfs-unixfs constructor - it's in the code, just not the signature
        mtime: settings.mtime
      });
      node = new DAGNode$5(metadata.marshal());
      updatedCid = await context.ipld.put(node, mc.DAG_PB, {
        cidVersion: settings.cidVersion,
        hashAlg: mh$2.names['sha2-256'],
        onlyHash: !settings.flush
      });
    } else {
      if (cid.codec !== 'dag-pb') {
        throw errCode$a(new Error(`${path} was not a UnixFS node`), 'ERR_NOT_UNIXFS')
      }

      cidVersion = cid.version;

      node = await context.ipld.get(cid);

      const metadata = UnixFS$2.unmarshal(node.Data);

      // @ts-ignore TODO: restore setting all date types as mtime - it's in the code, just not the signature
      metadata.mtime = settings.mtime;

      node = new DAGNode$5(metadata.marshal(), node.Links);

      updatedCid = await context.ipld.put(node, mc.DAG_PB, {
        cidVersion: cid.version,
        hashAlg: mh$2.names['sha2-256'],
        onlyHash: !settings.flush
      });
    }

    const trail = await toTrail$1(context, mfsDirectory);
    const parent = trail[trail.length - 1];
    const parentNode = await context.ipld.get(parent.cid);

    const result = await addLink$2(context, {
      parent: parentNode,
      name: name,
      cid: updatedCid,
      size: node.serialize().length,
      flush: settings.flush,
      shardSplitThreshold: settings.shardSplitThreshold,
      hashAlg: 'sha2-256',
      cidVersion
    });

    parent.cid = result.cid;

    // update the tree with the new child
    const newRootCid = await updateTree$1(context, trail, settings);

    // Update the MFS record with the new CID for the root of the tree
    await updateMfsRoot$1(context, newRootCid, settings);
  }

  return withTimeoutOption$w(mfsTouch)
};

const errCode$9 = require$$1$1;
const log$4 = require$$2$4('ipfs:mfs:utils:to-async-iterator');
const {
  MFS_MAX_CHUNK_SIZE: MFS_MAX_CHUNK_SIZE$1
} = utils$6;
const uint8ArrayFromString$3 = require$$4$3;

/**
 * @param {*} content
 */
const toAsyncIterator$1 = (content) => {
  if (!content) {
    throw errCode$9(new Error('paths must start with a leading slash'), 'ERR_INVALID_PATH')
  }

  if (typeof content === 'string' || content instanceof String) {
    log$4('Content was a string');

    content = uint8ArrayFromString$3(content.toString());
  }

  if (content.length) {
    log$4('Content was array-like');

    return {
      [Symbol.asyncIterator]: function * bufferContent () {
        yield content;
      }
    }
  }

  if (content[Symbol.asyncIterator]) {
    log$4('Content was an async iterator');
    return content
  }

  if (content[Symbol.iterator]) {
    log$4('Content was an iterator');
    return content
  }

  if (commonjsGlobal.Blob && content instanceof commonjsGlobal.Blob) {
    // HTML5 Blob objects (including Files)
    log$4('Content was an HTML5 Blob');

    let index = 0;

    const iterator = {
      next: () => {
        if (index > content.size) {
          return {
            done: true
          }
        }

        return new Promise((resolve, reject) => {
          const chunk = content.slice(index, MFS_MAX_CHUNK_SIZE$1);
          index += MFS_MAX_CHUNK_SIZE$1;

          const reader = new commonjsGlobal.FileReader();

          /**
           * @param {{ error?: Error }} ev
           */
          const handleLoad = (ev) => {
            // @ts-ignore No overload matches this call.
            reader.removeEventListener('loadend', handleLoad, false);

            if (ev.error) {
              return reject(ev.error)
            }

            resolve({
              done: false,
              value: new Uint8Array(/** @type {ArrayBuffer} */(reader.result))
            });
          };

          // @ts-ignore No overload matches this call.
          reader.addEventListener('loadend', handleLoad);
          reader.readAsArrayBuffer(chunk);
        })
      }
    };

    return {
      [Symbol.asyncIterator]: () => {
        return iterator
      }
    }
  }

  throw errCode$9(new Error(`Don't know how to convert ${content} into an async iterator`), 'ERR_INVALID_PARAMS')
};

var toAsyncIterator_1 = toAsyncIterator$1;

const log$3 = require$$2$4('ipfs:mfs:write');
const { importer } = require$$0$c;
const stat$2 = stat$5;
const mkdir = mkdir$2;
const addLink$1 = addLink_1;
const mergeOptions$5 = require$$0$2.bind({ ignoreUndefined: true });
const createLock$1 = createLock$2;
const toAsyncIterator = toAsyncIterator_1;
const toMfsPath$2 = toMfsPath_1;
const toPathComponents = toPathComponents_1;
const toTrail = toTrail_1;
const updateTree = updateTree_1;
const updateMfsRoot = updateMfsRoot_1;
const errCode$8 = require$$1$1;
const {
  MFS_MAX_CHUNK_SIZE
} = utils$6;
const last = require$$0$5;
const withTimeoutOption$v = require$$0;
const {
  parseMode,
  parseMtime
} = require$$3$3;

/**
 * @typedef {import('multihashes').HashName} HashName
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('ipfs-unixfs').MtimeLike} MtimeLike
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {import('./utils/to-mfs-path').FilePath} FilePath
 * @typedef {import('./utils/to-mfs-path').MfsPath} MfsPath
 * @typedef {object} DefaultOptions
 * @property {number} offset
 * @property {number} length
 * @property {boolean} create
 * @property {boolean} truncate
 * @property {boolean} rawLeaves
 * @property {boolean} reduceSingleLeafToSelf
 * @property {CIDVersion} cidVersion
 * @property {HashName} hashAlg
 * @property {boolean} parents
 * @property {import('ipfs-core-types/src/root').AddProgressFn} progress
 * @property {'trickle' | 'balanced'} strategy
 * @property {boolean} flush
 * @property {'raw' | 'file'} leafType
 * @property {number} shardSplitThreshold
 * @property {MtimeLike} [mtime]
 * @property {number} [mode]
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$2 = {
  offset: 0, // the offset in the file to begin writing
  length: Infinity, // how many bytes from the incoming buffer to write
  create: false, // whether to create the file if it does not exist
  truncate: false, // whether to truncate the file first
  rawLeaves: false,
  reduceSingleLeafToSelf: false,
  cidVersion: 0,
  hashAlg: 'sha2-256',
  parents: false, // whether to create intermediate directories if they do not exist
  progress: (bytes, path) => {},
  strategy: 'trickle',
  flush: true,
  leafType: 'raw',
  shardSplitThreshold: 1000
};

/**
 * @param {MfsContext} context
 */
var write_1 = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["write"]}
   */
  async function mfsWrite (path, content, opts = {}) {
    /** @type {DefaultOptions} */
    const options = mergeOptions$5(defaultOptions$2, opts);

    /** @type {AsyncIterable<Uint8Array>} */
    let source;
    /** @type {MfsPath} */
    let destination;
    /** @type {MfsPath} */
    let parent;
    log$3('Reading source, destination and parent');
    await createLock$1().readLock(async () => {
      source = await toAsyncIterator(content);
      destination = await toMfsPath$2(context, path, options);
      parent = await toMfsPath$2(context, destination.mfsDirectory, options);
    })();
    log$3('Read source, destination and parent');
    // @ts-ignore - parent may be undefined
    if (!options.parents && !parent.exists) {
      throw errCode$8(new Error('directory does not exist'), 'ERR_NO_EXIST')
    }

    // @ts-ignore
    if (source == null) {
      throw errCode$8(new Error('could not create source'), 'ERR_NO_SOURCE')
    }

    // @ts-ignore
    if (destination == null) {
      throw errCode$8(new Error('could not create destination'), 'ERR_NO_DESTINATION')
    }

    if (!options.create && !destination.exists) {
      throw errCode$8(new Error('file does not exist'), 'ERR_NO_EXIST')
    }

    if (destination.entryType !== 'file') {
      throw errCode$8(new Error('not a file'), 'ERR_NOT_A_FILE')
    }

    return updateOrImport(context, path, source, destination, options)
  }

  return withTimeoutOption$v(mfsWrite)
};

/**
 * @param {MfsContext} context
 * @param {string} path
 * @param {AsyncIterable<Uint8Array>} source
 * @param {FilePath} destination
 * @param {DefaultOptions} options
 */
const updateOrImport = async (context, path, source, destination, options) => {
  const child = await write(context, source, destination, options);

  // The slow bit is done, now add or replace the DAGLink in the containing directory
  // re-reading the path to the containing folder in case it has changed in the interim
  await createLock$1().writeLock(async () => {
    const pathComponents = toPathComponents(path);
    const fileName = pathComponents.pop();

    if (fileName == null) {
      throw errCode$8(new Error('source does not exist'), 'ERR_NO_EXIST')
    }

    let parentExists = false;

    try {
      await stat$2(context)(`/${pathComponents.join('/')}`, options);
      parentExists = true;
    } catch (err) {
      if (err.code !== 'ERR_NOT_FOUND') {
        throw err
      }
    }

    if (!parentExists) {
      await mkdir(context)(`/${pathComponents.join('/')}`, options);
    }

    // get an updated mfs path in case the root changed while we were writing
    const updatedPath = await toMfsPath$2(context, path, options);
    const trail = await toTrail(context, updatedPath.mfsDirectory);
    const parent = trail[trail.length - 1];

    if (!parent) {
      throw errCode$8(new Error('directory does not exist'), 'ERR_NO_EXIST')
    }

    if (!parent.type || !parent.type.includes('directory')) {
      throw errCode$8(new Error(`cannot write to ${parent.name}: Not a directory`), 'ERR_NOT_A_DIRECTORY')
    }

    const parentNode = await context.ipld.get(parent.cid);

    const result = await addLink$1(context, {
      parent: parentNode,
      name: fileName,
      cid: child.cid,
      size: child.size,
      flush: options.flush,
      shardSplitThreshold: options.shardSplitThreshold,
      hashAlg: options.hashAlg,
      cidVersion: options.cidVersion
    });

    parent.cid = result.cid;

    // update the tree with the new child
    const newRootCid = await updateTree(context, trail, options);

    // Update the MFS record with the new CID for the root of the tree
    await updateMfsRoot(context, newRootCid, options);
  })();
};

/**
 * @param {MfsContext} context
 * @param {AsyncIterable<Uint8Array>} source
 * @param {FilePath} destination
 * @param {DefaultOptions} options
 */
const write = async (context, source, destination, options) => {
  if (destination.exists) {
    log$3(`Overwriting file ${destination.cid} offset ${options.offset} length ${options.length}`);
  } else {
    log$3(`Writing file offset ${options.offset} length ${options.length}`);
  }

  /** @type {Array<() => AsyncIterable<Uint8Array>>} */
  const sources = [];

  // pad start of file if necessary
  if (options.offset > 0) {
    if (destination.unixfs) {
      log$3(`Writing first ${options.offset} bytes of original file`);

      sources.push(
        () => {
          return destination.content({
            offset: 0,
            length: options.offset
          })
        }
      );

      if (destination.unixfs.fileSize() < options.offset) {
        const extra = options.offset - destination.unixfs.fileSize();

        log$3(`Writing zeros for extra ${extra} bytes`);
        sources.push(
          asyncZeroes(extra)
        );
      }
    } else {
      log$3(`Writing zeros for first ${options.offset} bytes`);
      sources.push(
        asyncZeroes(options.offset)
      );
    }
  }

  sources.push(
    limitAsyncStreamBytes(source, options.length)
  );

  const content = countBytesStreamed(catAsyncIterators(sources), (bytesWritten) => {
    if (destination.unixfs && !options.truncate) {
      // if we've done reading from the new source and we are not going
      // to truncate the file, add the end of the existing file to the output
      const fileSize = destination.unixfs.fileSize();

      if (fileSize > bytesWritten) {
        log$3(`Writing last ${fileSize - bytesWritten} of ${fileSize} bytes from original file starting at offset ${bytesWritten}`);

        return destination.content({
          offset: bytesWritten
        })
      } else {
        log$3('Not writing last bytes from original file');
      }
    }

    return {
      [Symbol.asyncIterator]: async function * () {}
    }
  });

  /** @type {number | undefined} */
  let mode;

  if (options.mode !== undefined && options.mode !== null) {
    mode = parseMode(options.mode);
  } else if (destination && destination.unixfs) {
    mode = destination.unixfs.mode;
  }

  /** @type {import('ipfs-unixfs').Mtime | undefined} */
  let mtime;

  if (options.mtime != null) {
    mtime = parseMtime(options.mtime);
  } else if (destination && destination.unixfs) {
    mtime = destination.unixfs.mtime;
  }

  const result = await last(importer([{
    content: content,

    // persist mode & mtime if set previously
    mode,
    mtime
  }], context.block, {
    progress: options.progress,
    hashAlg: options.hashAlg,
    cidVersion: options.cidVersion,
    strategy: options.strategy,
    rawLeaves: options.rawLeaves,
    reduceSingleLeafToSelf: options.reduceSingleLeafToSelf,
    leafType: options.leafType,
    pin: false
  }));

  if (!result) {
    throw errCode$8(new Error(`cannot write to ${parent.name}`), 'ERR_COULD_NOT_WRITE')
  }

  log$3(`Wrote ${result.cid}`);

  return {
    cid: result.cid,
    size: result.size
  }
};

/**
 * @param {AsyncIterable<Uint8Array>} stream
 * @param {number} limit
 */
const limitAsyncStreamBytes = (stream, limit) => {
  return async function * _limitAsyncStreamBytes () {
    let emitted = 0;

    for await (const buf of stream) {
      emitted += buf.length;

      if (emitted > limit) {
        yield buf.slice(0, limit - emitted);

        return
      }

      yield buf;
    }
  }
};

/**
 * @param {number} count
 * @param {number} chunkSize
 */
const asyncZeroes = (count, chunkSize = MFS_MAX_CHUNK_SIZE) => {
  const buf = new Uint8Array(chunkSize);

  async function * _asyncZeroes () {
    while (true) {
      yield buf.slice();
    }
  }

  return limitAsyncStreamBytes(_asyncZeroes(), count)
};

/**
 * @param {Array<() => AsyncIterable<Uint8Array>>} sources
 */
const catAsyncIterators = async function * (sources) { // eslint-disable-line require-await
  for (let i = 0; i < sources.length; i++) {
    yield * sources[i]();
  }
};

/**
 * @param {AsyncIterable<Uint8Array>} source
 * @param {(count: number) => AsyncIterable<Uint8Array>} notify
 */
const countBytesStreamed = async function * (source, notify) {
  let wrote = 0;

  for await (const buf of source) {
    wrote += buf.length;

    yield buf;
  }

  for await (const buf of notify(wrote)) {
    wrote += buf.length;

    yield buf;
  }
};

const { exporter: exporter$1 } = require$$0$d;
const mergeOptions$4 = require$$0$2.bind({ ignoreUndefined: true });
const toMfsPath$1 = toMfsPath_1;
const errCode$7 = require$$1$1;
const withTimeoutOption$u = require$$0;

/**
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {object} DefaultOptions
 * @property {number} offset
 * @property {number} length
 * @property {AbortSignal} [signal]
 * @property {number} [timeout]
 */

/**
 * @type {DefaultOptions}
 */
const defaultOptions$1 = {
  offset: 0,
  length: Infinity
};

/**
 * @param {MfsContext} context
 */
var read = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["read"]}
   */
  function mfsRead (path, options = {}) {
    /** @type {DefaultOptions} */
    options = mergeOptions$4(defaultOptions$1, options);

    return {
      [Symbol.asyncIterator]: async function * read () {
        const mfsPath = await toMfsPath$1(context, path, options);
        const result = await exporter$1(mfsPath.mfsPath, context.ipld);

        if (result.type !== 'file') {
          throw errCode$7(new Error(`${path} was not a file`), 'ERR_NOT_FILE')
        }

        if (!result.content) {
          throw errCode$7(new Error(`Could not load content stream from ${path}`), 'ERR_NO_CONTENT')
        }

        for await (const buf of result.content({
          offset: options.offset,
          length: options.length
        })) {
          yield buf;
        }
      }
    }
  }

  return withTimeoutOption$u(mfsRead)
};

const { exporter } = require$$0$d;
const toMfsPath = toMfsPath_1;
const withTimeoutOption$t = require$$0;
const map$1 = require$$3$5;

/**
 * @typedef {import('./').MfsContext} MfsContext
 * @typedef {import('ipfs-core-types/src/files').MFSEntry} MFSEntry
 */

/**
 * @param {import('ipfs-unixfs-exporter').UnixFSEntry} fsEntry
 */
const toOutput = (fsEntry) => {
  /** @type {MFSEntry} */
  const output = {
    cid: fsEntry.cid,
    name: fsEntry.name,
    type: fsEntry.type === 'directory' ? 'directory' : 'file',
    size: fsEntry.size
  };

  if (fsEntry.type === 'file' || fsEntry.type === 'directory') {
    output.mode = fsEntry.unixfs.mode;
    output.mtime = fsEntry.unixfs.mtime;
  }

  return output
};

/**
 * @param {MfsContext} context
 */
var ls = (context) => {
  /**
   * @type {import('ipfs-core-types/src/files').API["ls"]}
   */
  async function * mfsLs (path, options = {}) {
    const mfsPath = await toMfsPath(context, path, options);
    const fsEntry = await exporter(mfsPath.mfsPath, context.ipld);

    // directory, perhaps sharded
    if (fsEntry.type === 'directory') {
      yield * map$1(fsEntry.content(options), toOutput);

      return
    }

    // single file/node
    yield toOutput(fsEntry);
  }

  return withTimeoutOption$t(mfsLs)
};

const createLock = createLock$2;
const isIpfs = require$$0$3;

/**
 * @typedef {object} MfsContext
 * @property {import('ipld')} ipld
 * @property {import('ipfs-repo')} repo
 * @property {import('ipfs-core-types/src/block').API} block
 */

/**
 * These operations are read-locked at the function level and will execute simultaneously
 *
 * @type {Record<string, any>}
 */
const readOperations = {
  stat: stat$5
};

/**
 * These operations are locked at the function level and will execute in series
 *
 * @type {Record<string, any>}
 */
const writeOperations = {
  chmod: chmod,
  cp: cp$2,
  flush: flush,
  mkdir: mkdir$2,
  mv: mv,
  rm: rm$3,
  touch: touch
};

/**
 * These operations are asynchronous and manage their own locking
 *
 * @type {Record<string, any>}
 */
const unwrappedOperations = {
  write: write_1,
  read: read,
  ls: ls
};

/**
 * @param {object} arg
 * @param {*} arg.options
 * @param {*} arg.mfs
 * @param {*} arg.operations
 * @param {*} arg.lock
 */
const wrap = ({
  options, mfs, operations, lock
}) => {
  Object.keys(operations).forEach(key => {
    mfs[key] = lock(operations[key](options));
  });
};

const defaultOptions = {
  repoOwner: true,
  ipld: null,
  repo: null
};

/**
 * @param {*} options
 */
function createMfs (options) {
  const {
    repoOwner
  } = Object.assign({}, defaultOptions || {}, options);

  options.repo = {
    blocks: options.blocks,
    datastore: options.datastore
  };

  const lock = createLock(repoOwner);

  /**
   * @param {(fn: (...args: any) => any) => (...args: any) => any} operation
   */
  const readLock = (operation) => {
    return lock.readLock(operation)
  };

  /**
   * @param {(fn: (...args: any) => any) => (...args: any) => any} operation
   */
  const writeLock = (operation) => {
    return lock.writeLock(operation)
  };

  /** @type {Record<string, any>} */
  const mfs = {};

  wrap({
    options, mfs, operations: readOperations, lock: readLock
  });
  wrap({
    options, mfs, operations: writeOperations, lock: writeLock
  });

  Object.keys(unwrappedOperations).forEach(key => {
    mfs[key] = unwrappedOperations[key](options);
  });

  return mfs
}

/**
 * @param {object} context
 * @param {import('ipld')} context.ipld
 * @param {import('ipfs-core-types/src/block').API} context.block
 * @param {import('ipfs-block-service')} context.blockService
 * @param {import('ipfs-repo')} context.repo
 * @param {import('../../types').Preload} context.preload
 * @param {import('..').Options} context.options
 * @returns {import('ipfs-core-types/src/files').API}
 */
var files = ({ ipld, block, blockService, repo, preload, options: constructorOptions }) => {
  const methods = createMfs({
    ipld,
    block,
    blocks: blockService,
    datastore: repo.root,
    repoOwner: constructorOptions.repoOwner
  });

  /**
   * @param {any} fn
   */
  const withPreload = fn => {
    /**
     * @param  {...any} args
     */
    const wrapped = (...args) => {
      // @ts-ignore cannot derive type of arg
      const paths = args.filter(arg => isIpfs.ipfsPath(arg) || isIpfs.cid(arg));

      if (paths.length) {
        const options = args[args.length - 1];
        // @ts-ignore it's a PreloadOptions, honest
        if (options && options.preload !== false) {
          paths.forEach(path => preload(path));
        }
      }

      return fn(...args)
    };

    return wrapped
  };

  return {
    ...methods,
    chmod: methods.chmod,
    cp: withPreload(methods.cp),
    mkdir: methods.mkdir,
    stat: withPreload(methods.stat),
    rm: methods.rm,
    read: withPreload(methods.read),
    touch: methods.touch,
    write: methods.write,
    mv: withPreload(methods.mv),
    flush: methods.flush,
    ls: withPreload(async function * (/** @type {...any} */ ...args) {
      for await (const file of methods.ls(...args)) {
        yield { ...file, size: file.size || 0 };
      }
    })
  }
};

const withTimeoutOption$s = require$$0;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var _export = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["export"]}
   */
  const exportKey = (name, password) =>
    keychain.exportKey(name, password);

  return withTimeoutOption$s(exportKey)
};

const withTimeoutOption$r = require$$0;

const DEFAULT_KEY_TYPE = 'rsa';
const DEFAULT_KEY_SIZE = 2048;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var gen = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["gen"]}
   */
  const gen = (name, options = { type: DEFAULT_KEY_TYPE, size: DEFAULT_KEY_SIZE }) => {
    return keychain.createKey(name, options.type || DEFAULT_KEY_TYPE, options.size || DEFAULT_KEY_SIZE)
  };

  return withTimeoutOption$r(gen)
};

const withTimeoutOption$q = require$$0;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var _import = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["import"]}
   */
  const importKey = (name, pem, password) => {
    return keychain.importKey(name, pem, password)
  };

  return withTimeoutOption$q(importKey)
};

const withTimeoutOption$p = require$$0;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var info = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["info"]}
   */
  const info = (name) => keychain.findKeyByName(name);

  return withTimeoutOption$p(info)
};

const withTimeoutOption$o = require$$0;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var list = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["list"]}
   */
  const list = () => keychain.listKeys();

  return withTimeoutOption$o(list)
};

const withTimeoutOption$n = require$$0;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var rename = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["rename"]}
   */
  const rename = async (oldName, newName) => {
    const key = await keychain.renameKey(oldName, newName);

    return {
      was: oldName,
      now: key.name,
      id: key.id,
      overwrite: false
    }
  };

  return withTimeoutOption$n(rename)
};

const withTimeoutOption$m = require$$0;

/**
 * @param {Object} config
 * @param {import('libp2p/src/keychain')} config.keychain
 */
var rm = ({ keychain }) => {
  /**
   * @type {import('ipfs-core-types/src/key').API["rm"]}
   */
  const rm = (name) => keychain.removeKey(name);

  return withTimeoutOption$m(rm)
};

const createExport = _export;
const createGen = gen;
const createImport = _import;
const createInfo = info;
const createList = list;
const createRename = rename;
const createRm = rm;

/**
 * @typedef {import('libp2p/src/keychain')} Keychain
 */

class KeyAPI$1 {
  /**
   * @param {Object} config
   * @param {Keychain} config.keychain
   */
  constructor ({ keychain }) {
    this.gen = createGen({ keychain });
    this.list = createList({ keychain });
    this.rm = createRm({ keychain });
    this.rename = createRename({ keychain });
    this.export = createExport({ keychain });
    this.import = createImport({ keychain });
    this.info = createInfo({ keychain });
  }
}
var key = KeyAPI$1;

const CID$4 = require$$0$1;
const errCode$6 = require$$1$1;
const withTimeoutOption$l = require$$0;

/**
 * @typedef {import('multibase').BaseName} BaseName
 */

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var get$3 = ({ ipld, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/object').API["get"]}
   */
  async function get (multihash, options = {}) { // eslint-disable-line require-await
    let cid;

    try {
      cid = new CID$4(multihash);
    } catch (err) {
      throw errCode$6(err, 'ERR_INVALID_CID')
    }

    if (options.preload !== false) {
      preload(cid);
    }

    return ipld.get(cid, { signal: options.signal })
  }

  return withTimeoutOption$l(get)
};

const withTimeoutOption$k = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var data = ({ ipld, preload }) => {
  const get = get$3({ ipld, preload });

  /**
   * @type {import('ipfs-core-types/src/object').API["data"]}
   */
  async function data (multihash, options = {}) {
    const node = await get(multihash, options);
    return node.Data
  }

  return withTimeoutOption$k(data)
};

const {
  DAGLink: DAGLink$1
} = require$$0$9;
const CID$3 = require$$0$1;
const withTimeoutOption$j = require$$0;

/**
 * @param {any} node
 * @param {DAGLink[]} [links]
 * @returns {DAGLink[]}
 */
function findLinks (node, links = []) {
  for (const key in node) {
    const val = node[key];

    if (key === '/' && Object.keys(node).length === 1) {
      try {
        links.push(new DAGLink$1('', 0, new CID$3(val)));
        continue
      } catch (_) {
        // not a CID
      }
    }

    if (CID$3.isCID(val)) {
      links.push(new DAGLink$1('', 0, val));
      continue
    }

    if (Array.isArray(val)) {
      findLinks(val, links);
    }

    if (val && typeof val === 'object') {
      findLinks(val, links);
    }
  }

  return links
}

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 */
var links = ({ ipld }) => {
  /**
   * @type {import('ipfs-core-types/src/object').API["links"]}
   */
  async function links (multihash, options = {}) {
    const cid = new CID$3(multihash);
    const result = await ipld.get(cid, options);

    if (cid.codec === 'raw') {
      return []
    }

    if (cid.codec === 'dag-pb') {
      return result.Links
    }

    if (cid.codec === 'dag-cbor') {
      return findLinks(result)
    }

    throw new Error(`Cannot resolve links from codec ${cid.codec}`)
  }

  return withTimeoutOption$j(links)
};

const {
  DAGNode: DAGNode$4
} = require$$0$9;
const multicodec$3 = require$$6$1;
const mh$1 = require$$1$3.multihash;
const { UnixFS: UnixFS$1 } = require$$3$3;
const withTimeoutOption$i = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var _new = ({ ipld, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/object').API["new"]}
   */
  async function _new (options = {}) {
    let data;

    if (options.template) {
      if (options.template === 'unixfs-dir') {
        data = (new UnixFS$1({ type: 'directory' })).marshal();
      } else {
        throw new Error('unknown template')
      }
    } else {
      data = new Uint8Array(0);
    }

    const node = new DAGNode$4(data);

    const cid = await ipld.put(node, multicodec$3.DAG_PB, {
      cidVersion: 0,
      hashAlg: mh$1.names['sha2-256'],
      signal: options.signal
    });

    if (options.preload !== false) {
      preload(cid);
    }

    return cid
  }

  return withTimeoutOption$i(_new)
};

const {
  DAGNode: DAGNode$3,
  DAGLink,
  util: DAGLinkUtil
} = require$$0$9;
const mh = require$$1$3.multihash;
const multicodec$2 = require$$6$1;
const withTimeoutOption$h = require$$0;
const uint8ArrayToString$1 = require$$4$2;
const uint8ArrayFromString$2 = require$$4$3;

/**
 * @param {Uint8Array} buf
 * @param {import('ipfs-core-types/src/object').PutEncoding} encoding
 */
function parseBuffer (buf, encoding) {
  switch (encoding) {
    case 'json':
      return parseJSONBuffer(buf)
    case 'protobuf':
      return parseProtoBuffer(buf)
    default:
      throw new Error(`unknown encoding: ${encoding}`)
  }
}

/**
 * @param {Uint8Array} buf
 */
function parseJSONBuffer (buf) {
  let data;
  let links;

  try {
    const parsed = JSON.parse(uint8ArrayToString$1(buf));

    // @ts-ignore - loose input types
    links = (parsed.Links || []).map((link) => {
      return new DAGLink(
        // @ts-ignore - loose input types
        link.Name || link.name,
        // @ts-ignore - loose input types
        link.Size || link.size,
        // @ts-ignore - loose input types
        mh.fromB58String(link.Hash || link.hash || link.multihash)
      )
    });

    // @ts-ignore - loose input types
    data = uint8ArrayFromString$2(parsed.Data);
  } catch (err) {
    throw new Error('failed to parse JSON: ' + err)
  }

  return new DAGNode$3(data, links)
}

/**
 * @param {Uint8Array} buf
 */
function parseProtoBuffer (buf) {
  return DAGLinkUtil.deserialize(buf)
}

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 * @param {import('.').GCLock} config.gcLock
 */
var put = ({ ipld, gcLock, preload }) => {
  /**
   * @type {import('ipfs-core-types/src/object').API["put"]}
   */
  async function put (obj, options = {}) {
    const encoding = options.enc;
    let node;

    if (obj instanceof Uint8Array) {
      if (encoding) {
        node = await parseBuffer(obj, encoding);
      } else {
        node = new DAGNode$3(obj);
      }
    } else if (obj instanceof DAGNode$3) {
      // already a dag node
      node = obj;
    } else if (typeof obj === 'object') {
      node = new DAGNode$3(obj.Data, obj.Links);
    } else {
      throw new Error('obj not recognized')
    }

    const release = await gcLock.readLock();

    try {
      const cid = await ipld.put(node, multicodec$2.DAG_PB, {
        cidVersion: 0,
        hashAlg: mh.names['sha2-256']
      });

      if (options.preload !== false) {
        preload(cid);
      }

      return cid
    } finally {
      release();
    }
  }

  return withTimeoutOption$h(put)
};

const dagPB = require$$0$9;
const withTimeoutOption$g = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../types').Preload} config.preload
 */
var stat$1 = ({ ipld, preload }) => {
  const get = get$3({ ipld, preload });

  /**
   * @type {import('ipfs-core-types/src/object').API["stat"]}
   */
  async function stat (multihash, options = {}) {
    const node = await get(multihash, options);
    const serialized = dagPB.util.serialize(node);
    const cid = await dagPB.util.cid(serialized, {
      cidVersion: 0
    });

    const blockSize = serialized.length;
    const linkLength = node.Links.reduce((a, l) => a + l.Tsize, 0);

    return {
      Hash: cid.toBaseEncodedString(),
      NumLinks: node.Links.length,
      BlockSize: blockSize,
      LinksSize: blockSize - node.Data.length,
      DataSize: node.Data.length,
      CumulativeSize: blockSize + linkLength
    }
  }

  return withTimeoutOption$g(stat)
};

const withTimeoutOption$f = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../../types').Preload} config.preload
 * @param {import('.').GCLock} config.gcLock
 */
var addLink = ({ ipld, gcLock, preload }) => {
  const get = get$3({ ipld, preload });
  const put$1 = put({ ipld, gcLock, preload });

  /**
   * @type {import('ipfs-core-types/src/object/patch').API["addLink"]}
   */
  async function addLink (multihash, link, options = {}) {
    const node = await get(multihash, options);
    node.addLink(link);
    return put$1(node, options)
  }

  return withTimeoutOption$f(addLink)
};

const { DAGNode: DAGNode$2 } = require$$0$9;
const withTimeoutOption$e = require$$0;
const uint8ArrayConcat = require$$2$b;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../../types').Preload} config.preload
 * @param {import('.').GCLock} config.gcLock
 */
var appendData = ({ ipld, gcLock, preload }) => {
  const get = get$3({ ipld, preload });
  const put$1 = put({ ipld, gcLock, preload });

  /**
   * @type {import('ipfs-core-types/src/object/patch').API["appendData"]}
   */
  async function appendData (multihash, data, options = {}) {
    const node = await get(multihash, options);
    const newData = uint8ArrayConcat([node.Data, data]);
    return put$1(new DAGNode$2(newData, node.Links), options)
  }

  return withTimeoutOption$e(appendData)
};

const withTimeoutOption$d = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../../types').Preload} config.preload
 * @param {import('.').GCLock} config.gcLock
 */
var rmLink = ({ ipld, gcLock, preload }) => {
  const get = get$3({ ipld, preload });
  const put$1 = put({ ipld, gcLock, preload });

  /**
   * @type {import('ipfs-core-types/src/object/patch').API["rmLink"]}
   */
  async function rmLink (multihash, linkRef, options = {}) {
    const node = await get(multihash, options);
    // @ts-ignore - loose input types
    node.rmLink(linkRef.Name || linkRef.name || linkRef);
    return put$1(node, options)
  }

  return withTimeoutOption$d(rmLink)
};

const { DAGNode: DAGNode$1 } = require$$0$9;
const withTimeoutOption$c = require$$0;

/**
 * @param {Object} config
 * @param {import('ipld')} config.ipld
 * @param {import('../../../types').Preload} config.preload
 * @param {import('.').GCLock} config.gcLock
 */
var setData = ({ ipld, gcLock, preload }) => {
  const get = get$3({ ipld, preload });
  const put$1 = put({ ipld, gcLock, preload });

  /**
   * @type {import('ipfs-core-types/src/object/patch').API["setData"]}
   */
  async function setData (multihash, data, options = {}) {
    const node = await get(multihash, options);
    return put$1(new DAGNode$1(data, node.Links), options)
  }

  return withTimeoutOption$c(setData)
};

const createAddLink = addLink;
const createAppendData = appendData;
const createRmLink = rmLink;
const createSetData = setData;

/**
 * @typedef {import('ipld')} IPLD
 * @typedef {import('../../../types').Preload} Preload
 * @typedef {import('..').GCLock} GCLock
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

class ObjectPatchAPI$1 {
  /**
   * @param {Object} config
   * @param {IPLD} config.ipld
   * @param {Preload} config.preload
   * @param {GCLock} config.gcLock
   */
  constructor ({ ipld, preload, gcLock }) {
    this.addLink = createAddLink({ ipld, preload, gcLock });
    this.appendData = createAppendData({ ipld, preload, gcLock });
    this.rmLink = createRmLink({ ipld, preload, gcLock });
    this.setData = createSetData({ ipld, preload, gcLock });
  }
}
var patch = ObjectPatchAPI$1;

const createData = data;
const createGet = get$3;
const createLinks = links;
const createNew = _new;
const createPut = put;
const createStat$1 = stat$1;
const ObjectPatchAPI = patch;

/**
 * @typedef {import('ipld')} IPLD
 * @typedef {import('../../types').Preload} Preload
 * @typedef {import('../gc-lock').GCLock} GCLock
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

class ObjectAPI$1 {
  /**
   * @param {Object} config
   * @param {IPLD} config.ipld
   * @param {Preload} config.preload
   * @param {GCLock} config.gcLock
   */
  constructor ({ ipld, preload, gcLock }) {
    this.data = createData({ ipld, preload });
    this.get = createGet({ ipld, preload });
    this.links = createLinks({ ipld });
    this.new = createNew({ ipld, preload });
    this.put = createPut({ ipld, preload, gcLock });
    this.stat = createStat$1({ ipld, preload });
    this.patch = new ObjectPatchAPI({ ipld, preload, gcLock });
  }
}

var object = ObjectAPI$1;

const CID$2 = require$$0$1;
const log$2 = require$$2$4('ipfs:repo:gc');
const { MFS_ROOT_KEY } = utils$6;
const withTimeoutOption$b = require$$0;
const { Errors } = require$$2;
const ERR_NOT_FOUND = Errors.notFoundError().code;
const { parallelMerge, transform, map } = require$$2$8;
const multibase$1 = require$$7;

// Limit on the number of parallel block remove operations
const BLOCK_RM_CONCURRENCY = 256;

/**
 * @typedef {import('ipfs-core-types/src/pin').API} PinAPI
 * @typedef {import('ipfs-core-types/src/refs').API} RefsAPI
 * @typedef {import('ipfs-repo')} IPFSRepo
 * @typedef {import('interface-datastore').Key} Key
 * @typedef {import('ipld-block')} Block
 */

/**
 * Perform mark and sweep garbage collection
 *
 * @param {Object} config
 * @param {import('../gc-lock').GCLock} config.gcLock
 * @param {PinAPI} config.pin
 * @param {RefsAPI["refs"]} config.refs
 * @param {IPFSRepo} config.repo
 */
var gc = ({ gcLock, pin, refs, repo }) => {
  /**
   * @type {import('ipfs-core-types/src/repo').API["gc"]}
   */
  async function * gc (_options = {}) {
    const start = Date.now();
    log$2('Creating set of marked blocks');

    const release = await gcLock.writeLock();

    try {
      // Mark all blocks that are being used
      const markedSet = await createMarkedSet({ pin, refs, repo });
      // Get all blocks keys from the blockstore
      const blockKeys = repo.blocks.queryKeys({});

      // Delete blocks that are not being used
      yield * deleteUnmarkedBlocks({ repo }, markedSet, blockKeys);

      log$2(`Complete (${Date.now() - start}ms)`);
    } finally {
      release();
    }
  }

  return withTimeoutOption$b(gc)
};

/**
 * Get Set of CIDs of blocks to keep
 *
 * @param {object} arg
 * @param {PinAPI} arg.pin
 * @param {RefsAPI["refs"]} arg.refs
 * @param {IPFSRepo} arg.repo
 */
async function createMarkedSet ({ pin, refs, repo }) {
  const pinsSource = map(({ cid }) => cid, pin.ls());

  const mfsSource = (async function * () {
    let mh;
    try {
      mh = await repo.root.get(MFS_ROOT_KEY);
    } catch (err) {
      if (err.code === ERR_NOT_FOUND) {
        log$2('No blocks in MFS');
        return
      }
      throw err
    }

    const rootCid = new CID$2(mh);
    yield rootCid;

    for await (const { ref } of refs(rootCid, { recursive: true })) {
      yield new CID$2(ref);
    }
  })();

  const output = new Set();
  for await (const cid of parallelMerge(pinsSource, mfsSource)) {
    output.add(multibase$1.encode('base32', cid.multihash).toString());
  }
  return output
}

/**
 * Delete all blocks that are not marked as in use
 *
 * @param {object} arg
 * @param {IPFSRepo} arg.repo
 * @param {Set<string>} markedSet
 * @param {AsyncIterable<CID>} blockKeys
 */
async function * deleteUnmarkedBlocks ({ repo }, markedSet, blockKeys) {
  // Iterate through all blocks and find those that are not in the marked set
  // blockKeys yields { key: Key() }
  let blocksCount = 0;
  let removedBlocksCount = 0;

  /**
   * @param {CID} cid
   */
  const removeBlock = async (cid) => {
    blocksCount++;

    try {
      const b32 = multibase$1.encode('base32', cid.multihash).toString();

      if (markedSet.has(b32)) {
        return null
      }

      try {
        await repo.blocks.delete(cid);
        removedBlocksCount++;
      } catch (err) {
        return {
          err: new Error(`Could not delete block with CID ${cid}: ${err.message}`)
        }
      }

      return { cid }
    } catch (err) {
      const msg = `Could delete block with CID ${cid}`;
      log$2(msg, err);
      return { err: new Error(msg + `: ${err.message}`) }
    }
  };

  for await (const res of transform(BLOCK_RM_CONCURRENCY, removeBlock, blockKeys)) {
    // filter nulls (blocks that were retained)
    if (res) yield res;
  }

  log$2(`Marked set has ${markedSet.size} unique blocks. Blockstore has ${blocksCount} blocks. ` +
  `Deleted ${removedBlocksCount} blocks.`);
}

const withTimeoutOption$a = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var stat = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/repo').API["stat"]}
   */
  async function stat (options = {}) {
    const stats = await repo.stat();

    return {
      numObjects: BigInt(stats.numObjects.toString()),
      repoSize: BigInt(stats.repoSize.toString()),
      repoPath: stats.repoPath,
      version: `${stats.version}`,
      storageMax: BigInt(stats.storageMax.toString())
    }
  }

  return withTimeoutOption$a(stat)
};

const { repoVersion } = require$$0$h;
const withTimeoutOption$9 = require$$0;

/**
 * @param {Object} config
 * @param {import('ipfs-repo')} config.repo
 */
var version = ({ repo }) => {
  /**
   * @type {import('ipfs-core-types/src/repo').API["version"]}
   */
  async function version (options = {}) {
    try {
      // @ts-ignore - not a public API
      await repo._checkInitialized(options);
    } catch (err) {
      // TODO: (dryajov) This is really hacky, there must be a better way
      const match = [
        /Key not found in database \[\/version\]/,
        /ENOENT/,
        /repo is not initialized yet/
      ].some((m) => {
        return m.test(err.message)
      });
      if (match) {
        // this repo has not been initialized
        return repoVersion
      }
      throw err
    }

    return repo.version.get()
  }

  return withTimeoutOption$9(version)
};

const createGC = gc;
const createStat = stat;
const createVersion = version;

class RepoAPI$1 {
  /**
   * @param {Object} config
   * @param {import('../gc-lock').GCLock} config.gcLock
   * @param {import('ipfs-core-types/src/pin').API} config.pin
   * @param {import('ipfs-repo')} config.repo
   * @param {import('ipfs-core-types/src/refs').API["refs"]} config.refs
   */
  constructor ({ gcLock, pin, repo, refs }) {
    this.gc = createGC({ gcLock, pin, refs, repo });
    this.stat = createStat({ repo });
    this.version = createVersion({ repo });
  }
}
var repo = RepoAPI$1;

const { default: parseDuration } = require$$1$6;
const errCode$5 = require$$1$1;
const withTimeoutOption$8 = require$$0;

/**
 * @typedef {Object} BWOptions
 * @property {PeerId} [peer] - Specifies a peer to print bandwidth for
 * @property {string} [proto] - Specifies a protocol to print bandwidth for
 * @property {boolean} [poll] - Is used to yield bandwidth info at an interval
 * @property {number|string} [interval=1000] - The time interval to wait between updating output, if `poll` is `true`.
 *
 * @typedef {Object} BandwidthInfo
 * @property {bigint} totalIn
 * @property {bigint} totalOut
 * @property {bigint} rateIn
 * @property {bigint} rateOut
 *
 * @typedef {import('libp2p')} libp2p
 * @typedef {import('peer-id')} PeerId
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

/**
 * @param {libp2p} libp2p
 * @param {BWOptions} opts
 * @returns {BandwidthInfo}
 */
function getBandwidthStats (libp2p, opts) {
  let stats;

  if (!libp2p.metrics) {
    stats = undefined;
  } else if (opts.peer) {
    stats = libp2p.metrics.forPeer(opts.peer);
  } else if (opts.proto) {
    stats = libp2p.metrics.forProtocol(opts.proto);
  } else {
    stats = libp2p.metrics.global;
  }

  if (!stats) {
    return {
      totalIn: BigInt(0),
      totalOut: BigInt(0),
      rateIn: BigInt(0),
      rateOut: BigInt(0)
    }
  }

  const { movingAverages, snapshot } = stats;

  return {
    totalIn: BigInt(snapshot.dataReceived.toString()),
    totalOut: BigInt(snapshot.dataSent.toString()),
    rateIn: BigInt(movingAverages.dataReceived[60000].movingAverage() / 60),
    rateOut: BigInt(movingAverages.dataSent[60000].movingAverage() / 60)
  }
}

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var bw = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/stats').API["bw"]}
   */
  const bw = async function * (options = {}) {
    const { libp2p } = await network.use(options);

    if (!options.poll) {
      yield getBandwidthStats(libp2p, options);
      return
    }

    const interval = options.interval || 1000;
    let ms = -1;
    try {
      ms = typeof interval === 'string' ? parseDuration(interval) || -1 : interval;
      if (!ms || ms < 0) throw new Error('invalid duration')
    } catch (err) {
      throw errCode$5(err, 'ERR_INVALID_POLL_INTERVAL')
    }

    let timeoutId;
    try {
      while (true) {
        yield getBandwidthStats(libp2p, options);
        // eslint-disable-next-line no-loop-func
        await new Promise(resolve => { timeoutId = setTimeout(resolve, ms); });
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return withTimeoutOption$8(bw)
};

const createBW = bw;
const createRepo$1 = stat;
const createBitswap = stat$7;

class StatsAPI$1 {
  /**
   * @param {Object} config
   * @param {import('ipfs-repo')} config.repo
   * @param {import('../../types').NetworkService} config.network
   */
  constructor ({ repo, network }) {
    this.repo = createRepo$1({ repo });
    this.bw = createBW({ network });
    this.bitswap = createBitswap({ network });
  }
}

var stats = StatsAPI$1;

const mergeOptions$3 = require$$0$2;
const multicodec$1 = require$$6$1;

/**
 * @typedef {import('interface-ipld-format').Format<?>} IPLDFormat
 * @typedef {import('ipld').Options} IPLDOptions
 */

/**
 * All known (non-default) IPLD formats
 *
 * @type {Record<number, IPLDFormat>}
 */
const IpldFormats = {
  get [multicodec$1.DAG_PB] () {
    return require$$0$9
  },
  get [multicodec$1.DAG_CBOR] () {
    return require$$3$6
  },
  get [multicodec$1.RAW] () {
    return require$$4$5
  }
};

/**
 * @param {import('ipfs-block-service')} blockService
 * @param {Partial<IPLDOptions>} [options]
 */
var ipld$1 = (blockService, options) => {
  return mergeOptions$3.call(
    // ensure we have the defaults formats even if the user overrides `formats: []`
    { concatArrays: true },
    {
      blockService: blockService,
      formats: [],
      /**
       * @type {import('ipld').LoadFormatFn}
       */
      loadFormat: (codec) => {
        if (IpldFormats[codec]) {
          return Promise.resolve(IpldFormats[codec])
        } else {
          throw new Error(`Missing IPLD format "${multicodec$1.getName(codec)}"`)
        }
      }
    }, options)
};

const getDefaultIpldOptions = ipld$1;
const Ipld = require$$1$a;

/**
 * @param {Object} config
 * @param {import('ipfs-block-service')} config.blockService
 * @param {Partial<import('ipld').Options>} [config.options]
 */
const createIPLD$1 = ({ blockService, options }) => {
  return new Ipld(getDefaultIpldOptions(blockService, options))
};

var ipld = createIPLD$1;

const IPFSRepo = require$$0$h;

/**
 * @param {import('../types').Print} print
 * @param {object} options
 * @param {string} [options.path]
 * @param {boolean} options.autoMigrate
 */
var repoNodejs = (print, options) => {
  const repoPath = options.path || 'ipfs';
  return new IPFSRepo(repoPath, { autoMigrate: options.autoMigrate })
};

var libp2pPubsubRoutersNodejs = {
  gossipsub: require$$0$i
};

var libp2pNodejs;
var hasRequiredLibp2pNodejs;

function requireLibp2pNodejs () {
	if (hasRequiredLibp2pNodejs) return libp2pNodejs;
	hasRequiredLibp2pNodejs = 1;

	// @ts-ignore - no types
	const WS = require$$0$j;
	// @ts-ignore - no types
	const WebRTCStar = require$$1$b;
	// @ts-ignore - no types
	const Multiplex = require$$2$c;
	const { NOISE } = require$$3$7;
	const KadDHT = require$$4$6;
	const GossipSub = require$$0$i;
	const ipnsUtils = utils$5;

	libp2pNodejs = () => {
	  /** @type {import('libp2p').Libp2pOptions} */
	  const options = {
	    dialer: {
	      maxParallelDials: 150, // 150 total parallel multiaddr dials
	      maxDialsPerPeer: 4, // Allow 4 multiaddrs to be dialed per peer in parallel
	      dialTimeout: 10e3 // 10 second dial timeout per peer dial
	    },
	    modules: {
	      transport: [
	        WS,
	        WebRTCStar
	      ],
	      streamMuxer: [
	        Multiplex
	      ],
	      connEncryption: [
	        NOISE
	      ],
	      peerDiscovery: [],
	      dht: KadDHT,
	      pubsub: GossipSub
	    },
	    config: {
	      peerDiscovery: {
	        autoDial: true,
	        // [Bootstrap.tag] = 'bootstrap'
	        bootstrap: {
	          enabled: true
	        },
	        // [WebRTCStar.discovery.tag]
	        webRTCStar: {
	          enabled: true
	        }
	      },
	      dht: {
	        kBucketSize: 20,
	        enabled: false,
	        clientMode: true,
	        randomWalk: {
	          enabled: false
	        },
	        validators: {
	          ipns: ipnsUtils.validator
	        },
	        selectors: {
	          ipns: ipnsUtils.selector
	        }
	      },
	      pubsub: {
	        enabled: true,
	        emitSelf: true
	      },
	      nat: {
	        enabled: false
	      }
	    },
	    metrics: {
	      enabled: true
	    },
	    peerStore: {
	      persistence: true,
	      threshold: 1
	    }
	  };

	  return options
	};
	return libp2pNodejs;
}

const get$2 = require$$1$5;
const mergeOptions$2 = require$$0$2;
const errCode$4 = require$$1$1;
const PubsubRouters = libp2pPubsubRoutersNodejs;
const pkgversion = require$$4.version;

/**
 * @typedef {Object} KeychainConfig
 * @property {string} [pass]
 *
 * @typedef {import('ipfs-repo')} Repo
 * @typedef {import('peer-id')} PeerId
 * @typedef {import('../types').Options} IPFSOptions
 * @typedef {import('libp2p')} LibP2P
 * @typedef {import('libp2p').Libp2pOptions & import('libp2p').CreateOptions} Libp2pOptions
 * @typedef {import('ipfs-core-types/src/config').Config} IPFSConfig
 * @typedef {import('multiaddr').Multiaddr} Multiaddr
 */

/**
 * @param {Object} config
 * @param {Repo} config.repo
 * @param {IPFSOptions|undefined} config.options
 * @param {PeerId} config.peerId
 * @param {Multiaddr[]|undefined} config.multiaddrs
 * @param {KeychainConfig|undefined} config.keychainConfig
 * @param {Partial<IPFSConfig>|undefined} config.config
 */
var libp2p = ({
  options = {},
  peerId,
  multiaddrs = [],
  repo,
  keychainConfig = {},
  config = {}
}) => {
  const { datastore, keys } = repo;

  const libp2pOptions = getLibp2pOptions({
    options,
    config,
    datastore,
    keys,
    keychainConfig,
    peerId,
    multiaddrs
  });

  if (typeof options.libp2p === 'function') {
    return options.libp2p({ libp2pOptions, options, config, datastore, peerId })
  }

  // Required inline to reduce startup time
  const Libp2p = require$$5$2;

  return Libp2p.create(libp2pOptions)
};

/**
 * @param {Object} input
 * @param {IPFSOptions} input.options
 * @param {Partial<IPFSConfig>} input.config
 * @param {Repo['datastore']} input.datastore
 * @param {Repo['keys']} input.keys
 * @param {KeychainConfig} input.keychainConfig
 * @param {PeerId} input.peerId
 * @param {Multiaddr[]} input.multiaddrs
 * @returns {Libp2pOptions}
 */
function getLibp2pOptions ({ options, config, datastore, keys, keychainConfig, peerId, multiaddrs }) {
  const getPubsubRouter = () => {
    const router = get$2(config, 'Pubsub.Router') || 'gossipsub';

    // @ts-ignore - `router` value is not constrained
    if (!PubsubRouters[router]) {
      throw errCode$4(new Error(`Router unavailable. Configure libp2p.modules.pubsub to use the ${router} router.`), 'ERR_NOT_SUPPORTED')
    }

    // @ts-ignore - `router` value is not constrained
    return PubsubRouters[router]
  };

  const libp2pDefaults = {
    datastore,
    peerId: peerId,
    modules: {}
  };

  const libp2pOptions = {
    modules: {
      pubsub: getPubsubRouter()
    },
    config: {
      peerDiscovery: {
        mdns: {
          enabled: get$2(options, 'config.Discovery.MDNS.Enabled', get$2(config, 'Discovery.MDNS.Enabled', true))
        },
        webRTCStar: {
          enabled: get$2(options, 'config.Discovery.webRTCStar.Enabled', get$2(config, 'Discovery.webRTCStar.Enabled', true))
        },
        bootstrap: {
          list: get$2(options, 'config.Bootstrap', get$2(config, 'Bootstrap', []))
        }
      },
      relay: {
        enabled: get$2(options, 'relay.enabled', get$2(config, 'relay.enabled', true)),
        hop: {
          enabled: get$2(options, 'relay.hop.enabled', get$2(config, 'relay.hop.enabled', false)),
          active: get$2(options, 'relay.hop.active', get$2(config, 'relay.hop.active', false))
        }
      },
      dht: {
        enabled: get$2(config, 'Routing.Type', 'none') !== 'none',
        clientMode: get$2(config, 'Routing.Type', 'dht') !== 'dhtserver',
        kBucketSize: get$2(options, 'dht.kBucketSize', 20)
      },
      pubsub: {
        enabled: get$2(options, 'config.Pubsub.Enabled', get$2(config, 'Pubsub.Enabled', true))
      },
      nat: {
        enabled: !get$2(config, 'Swarm.DisableNatPortMap', false)
      }
    },
    addresses: {
      listen: multiaddrs.map(ma => ma.toString()),
      announce: get$2(options, 'addresses.announce', get$2(config, 'Addresses.Announce', [])),
      noAnnounce: get$2(options, 'addresses.noAnnounce', get$2(config, 'Addresses.NoAnnounce', []))
    },
    connectionManager: get$2(options, 'connectionManager', {
      maxConnections: get$2(options, 'config.Swarm.ConnMgr.HighWater', get$2(config, 'Swarm.ConnMgr.HighWater')),
      minConnections: get$2(options, 'config.Swarm.ConnMgr.LowWater', get$2(config, 'Swarm.ConnMgr.LowWater'))
    }),
    keychain: {
      datastore: keys,
      ...keychainConfig
    },
    host: {
      agentVersion: `js-ipfs/${pkgversion}`
    }
  };

  // Required inline to reduce startup time
  // Note: libp2p-nodejs gets replaced by libp2p-browser when webpacked/browserified
  const getEnvLibp2pOptions = requireLibp2pNodejs();

  /** @type {import('libp2p').Libp2pOptions | undefined} */
  let constructorOptions = get$2(options, 'libp2p', undefined);

  if (typeof constructorOptions === 'function') {
    constructorOptions = undefined;
  }

  // Merge defaults with Node.js/browser/other environments options and configuration
  const libp2pConfig = mergeOptions$2(
    libp2pDefaults,
    getEnvLibp2pOptions(),
    libp2pOptions,
    constructorOptions
  );

  const bootstrapList = get$2(libp2pConfig, 'config.peerDiscovery.bootstrap.list', []);

  if (bootstrapList.length > 0) {
    libp2pConfig.modules.peerDiscovery.push(require$$7$1);
  }

  return libp2pConfig
}

const log$1 = require$$2$4('ipfs:components:peer:storage');
const createRepo = repoNodejs;
const getDefaultConfig = configNodejs;
const { ERR_REPO_NOT_INITIALIZED } = require$$0$h.errors;
const uint8ArrayFromString$1 = require$$4$3;
const uint8ArrayToString = require$$4$2;
const PeerId$3 = require$$0$6;
const { mergeOptions: mergeOptions$1 } = utils$6;
const configService = config.exports;
const { NotEnabledError: NotEnabledError$2 } = errors;
const createLibP2P$1 = libp2p;

/**
 * @typedef {import('ipfs-repo')} IPFSRepo
 * @typedef {import('../types').Options} IPFSOptions
 * @typedef {import('../types').InitOptions} InitOptions
 * @typedef {import('../types').Print} Print
 * @typedef {import('ipfs-core-types/src/config').Config} IPFSConfig
 * @typedef {import('libp2p-crypto').KeyType} KeyType
 * @typedef {import('libp2p/src/keychain')} Keychain
 */

class Storage$1 {
  /**
   * @private
   * @param {PeerId} peerId
   * @param {Keychain} keychain
   * @param {IPFSRepo} repo
   * @param {Print} print
   * @param {boolean} isNew
   */
  constructor (peerId, keychain, repo, print, isNew) {
    this.print = print;
    this.peerId = peerId;
    this.keychain = keychain;
    this.repo = repo;
    this.print = print;
    this.isNew = isNew;
  }

  /**
   * @param {Print} print
   * @param {IPFSOptions} options
   */
  static async start (print, options) {
    const { repoAutoMigrate, repo: inputRepo } = options;

    const repo = (typeof inputRepo === 'string' || inputRepo == null)
      ? createRepo(print, { path: inputRepo, autoMigrate: Boolean(repoAutoMigrate) })
      : inputRepo;

    const { peerId, keychain, isNew } = await loadRepo(print, repo, options);

    // TODO: throw error?
    // @ts-ignore On start, keychain will always be available
    return new Storage$1(peerId, keychain, repo, print, isNew)
  }
}
var storage = Storage$1;

/**
 * @param {Print} print
 * @param {IPFSRepo} repo
 * @param {IPFSOptions} options
 */
const loadRepo = async (print, repo, options) => {
  if (!repo.closed) {
    return { ...await configureRepo(repo, options), isNew: false }
  }

  try {
    await repo.open();

    return { ...await configureRepo(repo, options), isNew: false }
  } catch (err) {
    if (err.code !== ERR_REPO_NOT_INITIALIZED) {
      throw err
    }

    if (options.init && options.init.allowNew === false) {
      throw new NotEnabledError$2('Initialization of new repos disabled by config, pass `config.init.isNew: true` to enable it')
    }

    return { ...await initRepo(print, repo, options), isNew: true }
  }
};

/**
 * @param {Print} print
 * @param {IPFSRepo} repo
 * @param {IPFSOptions} options
 * @returns {Promise<{peerId: PeerId, keychain?: Keychain}>}
 */
const initRepo = async (print, repo, options) => {
  const initOptions = options.init || {};

  // 1. Verify that repo does not exist yet (if it does and we could not open it we give up)
  const exists = await repo.exists();
  log$1('repo exists?', exists);

  if (exists === true) {
    throw new Error('repo already exists')
  }

  // 2. Restore `peerId` from a given `.privateKey` or init new using provided options.
  const peerId = initOptions.privateKey
    ? await decodePeerId(initOptions.privateKey)
    : await initPeerId(print, initOptions);

  const identity = peerIdToIdentity(peerId);

  log$1('peer identity: %s', identity.PeerID);

  // 3. Init new repo with provided `.config` and restored / initialized `peerId`
  const config = {
    ...mergeOptions$1(applyProfiles(getDefaultConfig(), initOptions.profiles), options.config),
    Identity: identity
  };
  await repo.init(config);

  // 4. Open initialized repo.
  await repo.open();

  log$1('repo opened');

  // Create libp2p for Keychain creation
  const libp2p = await createLibP2P$1({
    options: undefined,
    multiaddrs: undefined,
    peerId,
    repo,
    config,
    keychainConfig: {
      pass: options.pass
    }
  });

  if (libp2p.keychain && libp2p.keychain.opts) {
    await libp2p.loadKeychain();

    await repo.config.set('Keychain', {
      dek: libp2p.keychain.opts.dek
    });
  }

  return { peerId, keychain: libp2p.keychain }
};

/**
 * Takes `peerId` either represented as a string serialized string or
 * an instance and returns a `PeerId` instance.
 *
 * @param {PeerId|string} peerId
 * @returns {Promise<PeerId>|PeerId}
 */
const decodePeerId = (peerId) => {
  log$1('using user-supplied private-key');
  return typeof peerId === 'object'
    ? peerId
    : PeerId$3.createFromPrivKey(uint8ArrayFromString$1(peerId, 'base64pad'))
};

/**
 * Initializes new PeerId by generating an underlying keypair.
 *
 * @param {Print} print
 * @param {Object} options
 * @param {KeyType} [options.algorithm='RSA']
 * @param {number} [options.bits=2048]
 * @returns {Promise<PeerId>}
 */
const initPeerId = (print, { algorithm = 'RSA', bits = 2048 }) => {
  // Generate peer identity keypair + transform to desired format + add to config.
  print('generating %s-bit (rsa only) %s keypair...', bits, algorithm);
  return PeerId$3.create({ keyType: algorithm, bits })
};

/**
 * @param {PeerId} peerId
 */
const peerIdToIdentity = (peerId) => ({
  PeerID: peerId.toB58String(),
  /** @type {string} */
  PrivKey: uint8ArrayToString(peerId.privKey.bytes, 'base64pad')
});

/**
 * Applies passed `profiles` and a `config` to an open repo.
 *
 * @param {IPFSRepo} repo
 * @param {IPFSOptions} options
 * @returns {Promise<{peerId: PeerId, keychain?: Keychain}>}
 */
const configureRepo = async (repo, options) => {
  const config = options.config;
  const profiles = (options.init && options.init.profiles) || [];
  const pass = options.pass;
  const original = await repo.config.getAll();
  // @ts-ignore TODO: move config types to repo
  const changed = mergeConfigs(applyProfiles(original, profiles), config);

  if (original !== changed) {
    await repo.config.replace(changed);
  }

  // @ts-ignore - Identity may not be present
  const peerId = await PeerId$3.createFromPrivKey(changed.Identity.PrivKey);
  const libp2p = await createLibP2P$1({
    options: undefined,
    multiaddrs: undefined,
    peerId,
    repo,
    config: changed,
    keychainConfig: {
      pass,
      ...changed.Keychain
    }
  });

  if (libp2p.keychain) {
    await libp2p.loadKeychain();
  }

  return { peerId, keychain: libp2p.keychain }
};

/**
 * @param {IPFSConfig} config
 * @param {Partial<IPFSConfig>} [changes]
 */
const mergeConfigs = (config, changes) =>
  changes ? mergeOptions$1(config, changes) : config;

/**
 * Apply profiles (e.g. ['server', 'lowpower']) to config
 *
 * @param {IPFSConfig} config
 * @param {string[]} [profiles]
 */
const applyProfiles = (config, profiles) => {
  return (profiles || []).reduce((config, name) => {
    const profile = configService.profiles[name];
    if (!profile) {
      throw new Error(`Could not find profile with name '${name}'`)
    }
    log$1('applying profile %s', name);
    return profile.transform(config)
  }, config)
};

const IPFSBitswap = require$$0$k;
const createLibP2P = libp2p;
const { Multiaddr } = require$$1$7;
const errCode$3 = require$$1$1;

/**
 * @typedef {Object} Online
 * @property {libp2p} libp2p
 * @property {Bitswap} bitswap
 *
 * @typedef {Object} Options
 * @property {PeerId} options.peerId
 * @property {Repo} options.repo
 * @property {Print} options.print
 * @property {IPFSOptions} options.options
 *
 * @typedef {import('ipfs-core-types/src/config').Config} IPFSConfig
 * @typedef {import('../types').Options} IPFSOptions
 * @typedef {import('ipfs-repo')} Repo
 * @typedef {import('../types').Print} Print
 * @typedef {import('libp2p')} libp2p
 * @typedef {import('ipfs-bitswap')} Bitswap
 * @typedef {import('peer-id')} PeerId
 * @typedef {import('ipfs-core-types/src/utils').AbortOptions} AbortOptions
 */

class Network$1 {
  /**
   * @param {PeerId} peerId
   * @param {libp2p} libp2p
   * @param {Bitswap} bitswap
   */
  constructor (peerId, libp2p, bitswap) {
    this.peerId = peerId;
    this.libp2p = libp2p;
    this.bitswap = bitswap;
  }

  /**
   * @param {Options} options
   */
  static async start ({ peerId, repo, print, options }) {
    // Need to ensure that repo is open as it could have been closed between
    // `init` and `start`.
    if (repo.closed) {
      await repo.open();
    }

    /** @type {IPFSConfig} */
    const config = await repo.config.getAll();

    const libp2p = await createLibP2P({
      options,
      repo,
      peerId,
      multiaddrs: readAddrs(peerId, config),
      config,
      keychainConfig: undefined
    });

    if (libp2p.keychain) {
      await libp2p.loadKeychain();
    }

    await libp2p.start();

    for (const ma of libp2p.multiaddrs) {
      print(`Swarm listening on ${ma}/p2p/${peerId.toB58String()}`);
    }

    const bitswap = new IPFSBitswap(libp2p, repo.blocks, { statsEnabled: true });
    await bitswap.start();

    return new Network$1(peerId, libp2p, bitswap)
  }

  /**
   * @param {Network} network
   */
  static async stop (network) {
    await Promise.all([
      network.bitswap.stop(),
      network.libp2p.stop()
    ]);
  }
}
var network = Network$1;

/**
 * @param {PeerId} peerId
 * @param {IPFSConfig} config
 */
const readAddrs = (peerId, config) => {
  const peerIdStr = peerId.toB58String();
  /** @type {Multiaddr[]} */
  const addrs = [];
  const swarm = (config.Addresses && config.Addresses.Swarm) || [];
  for (const addr of swarm) {
    let ma = new Multiaddr(addr);

    // Temporary error for users migrating using websocket-star multiaddrs for listenning on libp2p
    // websocket-star support was removed from ipfs and libp2p
    if (ma.protoCodes().includes(WEBSOCKET_STAR_PROTO_CODE)) {
      throw errCode$3(new Error('websocket-star swarm addresses are not supported. See https://github.com/ipfs/js-ipfs/issues/2779'), 'ERR_WEBSOCKET_STAR_SWARM_ADDR_NOT_SUPPORTED')
    }

    // multiaddrs that go via a signalling server or other intermediary (e.g. stardust,
    // webrtc-star) can have the intermediary's peer ID in the address, so append our
    // peer ID to the end of it
    const maId = ma.getPeerId();
    if (maId && maId !== peerIdStr) {
      ma = ma.encapsulate(`/p2p/${peerIdStr}`);
    }

    addrs.push(ma);
  }

  return addrs
};

const WEBSOCKET_STAR_PROTO_CODE = 479;

const withTimeoutOption$7 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var addrs = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/swarm').API["addrs"]}
   */
  async function addrs (options = {}) { // eslint-disable-line require-await
    const peers = [];
    const { libp2p } = await network.use(options);
    for (const [peerId, peer] of libp2p.peerStore.peers.entries()) {
      peers.push({
        id: peerId,
        // @ts-ignore - libp2p types are missing
        addrs: peer.addresses.map((mi) => mi.multiaddr)
      });
    }
    return peers
  }

  return withTimeoutOption$7(addrs)
};

const withTimeoutOption$6 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var connect = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/swarm').API["connect"]}
   */
  async function connect (addr, options = {}) {
    const { libp2p } = await network.use(options);
    await libp2p.dial(addr, options);
  }

  return withTimeoutOption$6(connect)
};

const withTimeoutOption$5 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var disconnect = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/swarm').API["disconnect"]}
   */
  async function disconnect (addr, options = {}) {
    const { libp2p } = await network.use(options);
    await libp2p.hangUp(addr);
  }

  return withTimeoutOption$5(disconnect)
};

const withTimeoutOption$4 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var localAddrs = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/swarm').API["localAddrs"]}
   */
  async function localAddrs (options = {}) {
    const { libp2p } = await network.use(options);
    return libp2p.multiaddrs
  }

  return withTimeoutOption$4(localAddrs)
};

const withTimeoutOption$3 = require$$0;

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
var peers = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/swarm').API["peers"]}
   */
  async function peers (options = {}) {
    const { libp2p } = await network.use(options);
    const peers = [];

    for (const [peerId, connections] of libp2p.connections) {
      for (const connection of connections) {
        /** @type {import('ipfs-core-types/src/swarm').PeersResult} */
        const peer = {
          addr: connection.remoteAddr,
          peer: peerId
        };

        if (options.verbose || options.direction) {
          peer.direction = connection.stat.direction;
        }

        if (options.verbose) {
          peer.muxer = connection.stat.multiplexer;
          peer.latency = 'n/a';
          peer.streams = []; // TODO: get this from libp2p
        }

        peers.push(peer);
      }
    }

    return peers
  }

  return withTimeoutOption$3(peers)
};

const createAddrsAPI = addrs;
const createConnectAPI = connect;
const createDisconnectAPI = disconnect;
const createLocalAddrsAPI = localAddrs;
const createPeersAPI = peers;

class SwarmAPI$1 {
  /**
   * @param {Object} config
   * @param {import('../../types').NetworkService} config.network
   */
  constructor ({ network }) {
    this.addrs = createAddrsAPI({ network });
    this.connect = createConnectAPI({ network });
    this.disconnect = createDisconnectAPI({ network });
    this.localAddrs = createLocalAddrsAPI({ network });
    this.peers = createPeersAPI({ network });
  }
}

var swarm = SwarmAPI$1;

// @ts-ignore - no types
const mortice = require$$0$g;

/**
 * @param {Object} config
 * @param {string} config.path
 * @param {boolean} [config.repoOwner]
 * @returns {GCLock}
 */
var gcLock = ({ path, repoOwner }) =>
  mortice(path, {
    singleProcess: repoOwner !== false
  });

const PeerId$2 = require$$0$6;
/** @type {{success:true, time:0, text: ''}} */
const basePacket = { success: true, time: 0, text: '' };
const withTimeoutOption$2 = require$$0;

/**
 * @param {Object} config
 * @param {import('../types').NetworkService} config.network
 */
var ping = ({ network }) => {
  /**
   * @type {import('ipfs-core-types/src/root').API["ping"]}
   */
  async function * ping (peerId, options = {}) {
    const { libp2p } = await network.use();
    options.count = options.count || 10;

    const peer = PeerId$2.createFromCID(peerId);

    const storedPeer = libp2p.peerStore.get(peer);
    let id = storedPeer && storedPeer.id;

    if (!id) {
      yield { ...basePacket, text: `Looking up peer ${peerId}` };
      const remotePeer = await libp2p.peerRouting.findPeer(peer);

      id = remotePeer && remotePeer.id;
    }

    if (!id) {
      throw new Error('Peer was not found')
    }

    yield { ...basePacket, text: `PING ${id.toB58String()}` };

    let packetCount = 0;
    let totalTime = 0;

    for (let i = 0; i < options.count; i++) {
      try {
        const time = await libp2p.ping(id);
        totalTime += time;
        packetCount++;
        yield { ...basePacket, time };
      } catch (err) {
        yield { ...basePacket, success: false, text: err.toString() };
      }
    }

    if (packetCount) {
      const average = totalTime / packetCount;
      yield { ...basePacket, text: `Average latency: ${average}ms` };
    }
  }

  return withTimeoutOption$2(ping)
};

const PeerId$1 = require$$0$6;
const CID$1 = require$$0$1;
const errCode$2 = require$$1$1;
const { NotEnabledError: NotEnabledError$1 } = errors;
const get$1 = require$$1$5;
const withTimeoutOption$1 = require$$0;

/**
 * @param {Object} config
 * @param {import('../types').NetworkService} config.network
 * @param {import('ipfs-repo')} config.repo
 */
var dht = ({ network, repo }) => {
  const { get, put, findProvs, findPeer, provide, query } = {
    /**
     * @type {import('ipfs-core-types/src/dht').API["get"]}
     */
    async get (key, options = {}) {
      const { libp2p } = await use(network, options);
      return libp2p._dht.get(normalizeCID(key), options)
    },

    /**
     * @type {import('ipfs-core-types/src/dht').API["put"]}
     */
    async * put (key, value, options) {
      const { libp2p } = await use(network, options);
      yield * libp2p._dht.put(normalizeCID(key), value);
    },

    /**
     * @type {import('ipfs-core-types/src/dht').API["findProvs"]}
     */
    async * findProvs (cid, options = { numProviders: 20 }) {
      const { libp2p } = await use(network, options);

      for await (const peer of libp2p._dht.findProviders(normalizeCID(cid), {
        maxNumProviders: options.numProviders,
        signal: options.signal
      })) {
        yield {
          id: peer.id.toB58String(),
          addrs: peer.addrs
        };
      }
    },

    /**
     * @type {import('ipfs-core-types/src/dht').API["findPeer"]}
     */
    async findPeer (peerId, options) {
      const { libp2p } = await use(network, options);
      const peer = await libp2p._dht.findPeer(PeerId$1.createFromCID(peerId));

      return {
        id: peer.id.toB58String(),
        addrs: peer.multiaddrs
      }
    },

    /**
     * @type {import('ipfs-core-types/src/dht').API["provide"]}
     */
    async * provide (cids, options = { recursive: false }) {
      const { libp2p } = await use(network, options);
      cids = Array.isArray(cids) ? cids : [cids];

      for (const i in cids) {
        if (typeof cids[i] === 'string') {
          try {
            cids[i] = new CID$1(cids[i]);
          } catch (err) {
            throw errCode$2(err, 'ERR_INVALID_CID')
          }
        }
      }

      // ensure blocks are actually local
      const hasCids = await Promise.all(cids.map(cid => repo.blocks.has(cid)));
      const hasAll = hasCids.every(has => has);

      if (!hasAll) {
        throw errCode$2(new Error('block(s) not found locally, cannot provide'), 'ERR_BLOCK_NOT_FOUND')
      }

      if (options.recursive) {
        // TODO: Implement recursive providing
        throw errCode$2(new Error('not implemented yet'), 'ERR_NOT_IMPLEMENTED_YET')
      }

      for (const cid of cids) {
        yield libp2p._dht.provide(cid);
      }
    },

    /**
     * @type {import('ipfs-core-types/src/dht').API["query"]}
     */
    async * query (peerId, options) {
      const { libp2p } = await use(network, options);

      for await (const closerPeerId of libp2p._dht.getClosestPeers(PeerId$1.createFromCID(peerId).toBytes())) {
        yield {
          id: closerPeerId.toB58String(),
          addrs: [] // TODO: get addrs?
        };
      }
    }
  };

  return {
    get: withTimeoutOption$1(get),
    put: withTimeoutOption$1(put),
    findProvs: withTimeoutOption$1(findProvs),
    findPeer: withTimeoutOption$1(findPeer),
    provide: withTimeoutOption$1(provide),
    query: withTimeoutOption$1(query)
  }
};

/**
 * Turns given cid in some stringifyable representation, to Uint8Array
 * representation. Throws an error if given value isn't a valid CID.
 *
 * @param {any} cid
 * @returns {Uint8Array}
 */
const parseCID = cid => {
  try {
    const cidStr = cid.toString().split('/')
      .filter((/** @type {string} */ part) => part && part !== 'ipfs' && part !== 'ipns')[0];

    return (new CID$1(cidStr)).bytes
  } catch (error) {
    throw errCode$2(error, 'ERR_INVALID_CID')
  }
};

/**
 * Turns given cid in some representation to Uint8Array representation
 *
 * @param {any} cid
 */
const normalizeCID = cid =>
  cid instanceof Uint8Array ? cid : parseCID(cid);

/**
 * @param {import('../types').NetworkService} network
 * @param {import('ipfs-core-types/src/utils').AbortOptions} [options]
 */
const use = async (network, options) => {
  const net = await network.use(options);
  if (get$1(net.libp2p, '_config.dht.enabled', false)) {
    return net
  } else {
    throw new NotEnabledError$1('dht not enabled')
  }
};

const withTimeoutOption = require$$0;
const errCode$1 = require$$1$1;
const { NotEnabledError } = errors;
const get = require$$1$5;

/**
 * @param {Object} config
 * @param {import('../types').NetworkService} config.network
 * @param {import('ipfs-core-types/src/config').Config} [config.config]
 */
var pubsub = ({ network, config }) => {
  const isEnabled = get(config || {}, 'Pubsub.Enabled', true);

  return {
    subscribe: isEnabled ? withTimeoutOption(subscribe) : notEnabled,
    unsubscribe: isEnabled ? withTimeoutOption(unsubscribe) : notEnabled,
    publish: isEnabled ? withTimeoutOption(publish) : notEnabled,
    ls: isEnabled ? withTimeoutOption(ls) : notEnabled,
    peers: isEnabled ? withTimeoutOption(peers) : notEnabled
  }

  /**
   * @type {import('ipfs-core-types/src/pubsub').API["subscribe"]}
   */
  async function subscribe (topic, handler, options = {}) {
    const { libp2p } = await network.use(options);
    // @ts-ignore Libp2p Pubsub is deprecating the handler, using the EventEmitter
    return libp2p.pubsub.subscribe(topic, handler, options)
  }

  /**
   * @type {import('ipfs-core-types/src/pubsub').API["unsubscribe"]}
   */
  async function unsubscribe (topic, handler, options = {}) {
    const { libp2p } = await network.use(options);
    // @ts-ignore Libp2p Pubsub is deprecating the handler, using the EventEmitter
    libp2p.pubsub.unsubscribe(topic, handler, options);
  }

  /**
   * @type {import('ipfs-core-types/src/pubsub').API["publish"]}
   */
  async function publish (topic, data, options = {}) {
    const { libp2p } = await network.use(options);
    if (!data) {
      throw errCode$1(new Error('argument "data" is required'), 'ERR_ARG_REQUIRED')
    }
    await libp2p.pubsub.publish(topic, data);
  }

  /**
   * @type {import('ipfs-core-types/src/pubsub').API["ls"]}
   */
  async function ls (options = {}) {
    const { libp2p } = await network.use(options);
    return libp2p.pubsub.getTopics()
  }

  /**
   * @type {import('ipfs-core-types/src/pubsub').API["peers"]}
   */
  async function peers (topic, options = {}) {
    const { libp2p } = await network.use(options);
    return libp2p.pubsub.getSubscribers(topic)
  }
};

const notEnabled = async () => { // eslint-disable-line require-await
  throw new NotEnabledError('pubsub not enabled')
};

const { mergeOptions } = utils$6;
const { isTest } = require$$1$c;
const log = require$$2$4('ipfs');
const errCode = require$$1$1;
const { DAGNode } = require$$0$9;
const { UnixFS } = require$$3$3;
const initAssets = initAssetsNodejs;
const { AlreadyInitializedError } = errors;
const uint8ArrayFromString = require$$4$3;

const createStartAPI = start;
const createStopAPI = stop;
const createDNSAPI = dns_1;
const createIsOnlineAPI = isOnline;
const createResolveAPI = resolve$1;
const PinAPI = pin;
const IPNSAPI = ipns;
const NameAPI = name$1;
const createRefsAPI = refs.exports;
const createRefsLocalAPI = local;
const BitswapAPI = bitswap;
const BootstrapAPI = bootstrap;
const BlockAPI = block;
const RootAPI = root;
const createVersionAPI = version$1;
const createIDAPI = id;
const createConfigAPI = config.exports;
const DagAPI = dag;
const PinManagerAPI = pinManager;
const createPreloadAPI = preload_1;
const createMfsPreloadAPI = mfsPreload;
const createFilesAPI = files;
const KeyAPI = key;
const ObjectAPI = object;
const RepoAPI = repo;
const StatsAPI = stats;
const BlockService = require$$35;
const createIPLD = ipld;
const Storage = storage;
const Network = network;
const Service = service;
const SwarmAPI = swarm;
const createGCLockAPI = gcLock;
const createPingAPI = ping;
const createDHTAPI = dht;
const createPubSubAPI = pubsub;

/**
 * @typedef {import('../types').Options} Options
 * @typedef {import('../types').Print} Print
 * @typedef {import('./storage')} StorageAPI
 */

class IPFS {
  /**
   * @param {Object} config
   * @param {Print} config.print
   * @param {StorageAPI} config.storage
   * @param {Options} config.options
   */
  constructor ({ print, storage, options }) {
    const { peerId, repo, keychain } = storage;
    const network = Service.create(Network);

    const preload = createPreloadAPI(options.preload);

    const blockService = new BlockService(storage.repo);
    const ipld = createIPLD({ blockService, options: options.ipld });

    const gcLock = createGCLockAPI({
      path: repo.path,
      repoOwner: options.repoOwner
    });
    const dns = createDNSAPI();
    const isOnline = createIsOnlineAPI({ network });
    // @ts-ignore This type check fails as options.
    // libp2p can be a function, while IPNS router config expects libp2p config
    const ipns = new IPNSAPI(options);

    const name = new NameAPI({
      dns,
      ipns,
      ipld,
      peerId,
      isOnline,
      keychain,
      options
    });
    const resolve = createResolveAPI({ ipld, name });
    const pinManager = new PinManagerAPI({ repo, ipld });
    const pin = new PinAPI({ gcLock, pinManager, ipld });
    const block = new BlockAPI({ blockService, preload, gcLock, pinManager, pin });
    const dag = new DagAPI({ ipld, preload, gcLock, pin });
    const refs = Object.assign(createRefsAPI({ ipld, resolve, preload }), {
      local: createRefsLocalAPI({ repo: storage.repo })
    });
    const { add, addAll, cat, get, ls } = new RootAPI({
      gcLock,
      preload,
      pin,
      block,
      ipld,
      options: options.EXPERIMENTAL
    });

    const files = createFilesAPI({
      ipld,
      block,
      blockService,
      repo,
      preload,
      options
    });

    const mfsPreload = createMfsPreloadAPI({
      files,
      preload,
      options: options.preload
    });

    this.preload = preload;
    this.name = name;
    this.ipld = ipld;
    this.ipns = ipns;
    this.pin = pin;
    this.resolve = resolve;
    this.block = block;
    this.refs = refs;

    this.start = createStartAPI({
      network,
      peerId,
      repo,
      blockService,
      preload,
      ipns,
      mfsPreload,
      print,
      keychain,
      options
    });

    this.stop = createStopAPI({
      network,
      preload,
      mfsPreload,
      blockService,
      ipns,
      repo
    });

    this.dht = createDHTAPI({ network, repo });
    this.pubsub = createPubSubAPI({ network, config: options.config });
    this.dns = dns;
    this.isOnline = isOnline;
    this.id = createIDAPI({ network, peerId });
    this.version = createVersionAPI({ repo });
    this.bitswap = new BitswapAPI({ network });
    this.bootstrap = new BootstrapAPI({ repo });
    this.config = createConfigAPI({ repo });
    this.ping = createPingAPI({ network });

    this.add = add;
    this.addAll = addAll;
    this.cat = cat;
    this.get = get;
    this.ls = ls;

    this.dag = dag;
    this.files = files;
    this.key = new KeyAPI({ keychain });
    this.object = new ObjectAPI({ ipld, preload, gcLock });
    this.repo = new RepoAPI({ gcLock, pin, repo, refs });
    this.stats = new StatsAPI({ repo, network });
    this.swarm = new SwarmAPI({ network });

    // For the backwards compatibility
    Object.defineProperty(this, 'libp2p', {
      get () {
        const net = network.try();
        return net ? net.libp2p : undefined
      }
    });

    // unimplemented methods
    const notImplemented = () => Promise.reject(errCode(new Error('Not implemented'), 'ERR_NOT_IMPLEMENTED'));
    const notImplementedIter = async function * () { throw errCode(new Error('Not implemented'), 'ERR_NOT_IMPLEMENTED') }; // eslint-disable-line require-yield
    this.commands = notImplemented;
    this.diag = {
      cmds: notImplemented,
      net: notImplemented,
      sys: notImplemented
    };
    this.log = {
      level: notImplemented,
      ls: notImplemented,
      tail: notImplementedIter
    };
    this.mount = notImplemented;
  }

  /**
   * `IPFS.create` will do the initialization. Keep this around for backwards
   * compatibility.
   *
   * @deprecated
   */
  async init () { // eslint-disable-line require-await
    throw new AlreadyInitializedError()
  }

  /**
   * @param {Options} options
   */
  static async create (options = {}) {
    options = mergeOptions(getDefaultOptions(), options);
    const initOptions = options.init || {};

    // eslint-disable-next-line no-console
    const print = options.silent ? log : console.log;
    const storage = await Storage.start(print, options);
    const config = await storage.repo.config.getAll();

    const ipfs = new IPFS({
      storage,
      print,
      options: { ...options, config }
    });

    await ipfs.preload.start();

    ipfs.ipns.startOffline(storage);

    if (storage.isNew && !initOptions.emptyRepo) {
      // add empty unixfs dir object (go-ipfs assumes this exists)
      const cid = await addEmptyDir(ipfs);

      log('adding default assets');
      await initAssets({ addAll: ipfs.addAll, print });

      log('initializing IPNS keyspace');
      await ipfs.ipns.initializeKeyspace(storage.peerId.privKey, uint8ArrayFromString(`/ipfs/${cid}`));
    }

    if (options.start !== false) {
      await ipfs.start();
    }

    return ipfs
  }
}

var components = IPFS;

/**
 * @param {IPFS} ipfs
 */
const addEmptyDir = async (ipfs) => {
  const node = new DAGNode(new UnixFS({ type: 'directory' }).marshal());
  const cid = await ipfs.dag.put(node, {
    version: 0,
    format: 'dag-pb',
    hashAlg: 'sha2-256',
    preload: false
  });

  await ipfs.pin.add(cid);

  return cid
};

/**
 * @returns {Options}
 */
const getDefaultOptions = () => ({
  start: true,
  EXPERIMENTAL: {},
  preload: {
    enabled: !isTest, // preload by default, unless in test env
    addresses: [
      '/dns4/node0.preload.ipfs.io/https',
      '/dns4/node1.preload.ipfs.io/https',
      '/dns4/node2.preload.ipfs.io/https',
      '/dns4/node3.preload.ipfs.io/https'
    ]
  }
});

const urlSource = require$$0$l;
const PeerId = require$$0$6;
const crypto = require$$2$5;
const isIPFS = require$$0$3;
const { multiaddr } = require$$1$7;
const multibase = require$$7;
const multicodec = require$$6$1;
const multihashing = require$$1$3;
const multihash = multihashing.multihash;
const CID = require$$0$1;
const { create } = components;

/**
 * @typedef {import('./components')} IPFS
 * @typedef {import('./types').Options} Options
 */

var src = {
  create,
  crypto,
  isIPFS,
  CID,
  multiaddr,
  multibase,
  multihash,
  multihashing,
  multicodec,
  PeerId,
  globSource,
  urlSource
};

export { src as default };
