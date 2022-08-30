import mergeOptions from '../../merge-options/dist/index.js';
import { nanoid } from '../../nanoid/dist/index.js';
import { isBrowser, isWebWorker, isNode } from '../../wherearewe/dist/index.js';
import http from '../../ipfs-utils/dist/http.js';
import { Multiaddr } from '../../@multiformats/dist/multiaddr.js';
import { logger } from '../../@libp2p/logger/dist/index.js';

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
const deleteDb = (path) => {
  return new Promise((resolve, reject) => {
    const keys = self.indexedDB.deleteDatabase(path);
    keys.onerror = (err) => reject(err);
    keys.onsuccess = () => resolve();
  })
};

/**
 * close repoPath , repoPath/keys, repoPath/blocks and repoPath/datastore
 *
 * @param {string} repoPath
 */
const removeRepo = async (repoPath) => {
  await deleteDb(repoPath);
  await deleteDb(repoPath + '/keys');
  await deleteDb(repoPath + '/blocks');
  await deleteDb(repoPath + '/datastore');
};

/**
 * @param {string} repoPath
 */
const repoExists = (repoPath) => {
  return new Promise((resolve, reject) => {
    const req = self.indexedDB.open(repoPath);
    let existed = true;
    req.onerror = () => reject(req.error);
    req.onsuccess = function () {
      req.result.close();
      if (!existed) { self.indexedDB.deleteDatabase(repoPath); }
      resolve(existed);
    };
    req.onupgradeneeded = function () {
      existed = false;
    };
  })
};

const defaultRepo = () => {
  return 'ipfs'
};

const checkForRunningApi = () => {
  return null
};

const tmpDir = (type = '') => {
  return `${type}_ipfs_${nanoid()}`
};

const merge$2 = mergeOptions.bind({ ignoreUndefined: true });

const daemonLog$1 = {
  info: logger('ipfsd-ctl:client:stdout'),
  err: logger('ipfsd-ctl:client:stderr')
};

/** @typedef {import("./index").ControllerOptions} ControllerOptions */

/**
 * Controller for remote nodes
 *
 * @class
 */
class Client {
  /**
   * @class
   * @param {string} baseUrl
   * @param {import('./types').RemoteState} remoteState
   * @param {ControllerOptions} options
   */
  constructor (baseUrl, remoteState, options) {
    this.opts = options;
    this.baseUrl = baseUrl;
    this.id = remoteState.id;
    this.path = remoteState.path;
    this.initialized = remoteState.initialized;
    this.started = remoteState.started;
    this.disposable = remoteState.disposable;
    this.clean = remoteState.clean;
    this.api = null;
    /** @type {import('./types').Subprocess | null} */
    this.subprocess = null;
    /** @type {Multiaddr} */
    this.apiAddr; // eslint-disable-line no-unused-expressions

    this._setApi(remoteState.apiAddr);
    this._setGateway(remoteState.gatewayAddr);
    this._setGrpc(remoteState.grpcAddr);
    this._createApi();
    /** @type {import('./types').PeerData | null} */
    this._peerId = null;
  }

  get peer () {
    if (this._peerId == null) {
      throw new Error('Not started')
    }

    return this._peerId
  }

  /**
   * @private
   * @param {string} addr
   */
  _setApi (addr) {
    if (addr) {
      this.apiAddr = new Multiaddr(addr);
    }
  }

  /**
   * @private
   * @param {string} addr
   */
  _setGateway (addr) {
    if (addr) {
      this.gatewayAddr = new Multiaddr(addr);
    }
  }

  /**
   * @private
   * @param {string} addr
   */
  _setGrpc (addr) {
    if (addr) {
      this.grpcAddr = new Multiaddr(addr);
    }
  }

  /**
   * @private
   */
  _createApi () {
    if (this.opts.ipfsClientModule && this.grpcAddr && this.apiAddr) {
      this.api = this.opts.ipfsClientModule.create({
        grpc: this.grpcAddr,
        http: this.apiAddr
      });
    } else if (this.apiAddr) {
      this.api = this.opts.ipfsHttpModule.create(this.apiAddr);
    }

    if (this.api) {
      if (this.apiAddr) {
        this.api.apiHost = this.apiAddr.nodeAddress().address;
        this.api.apiPort = this.apiAddr.nodeAddress().port;
      }

      if (this.gatewayAddr) {
        this.api.gatewayHost = this.gatewayAddr.nodeAddress().address;
        this.api.gatewayPort = this.gatewayAddr.nodeAddress().port;
      }

      if (this.grpcAddr) {
        this.api.grpcHost = this.grpcAddr.nodeAddress().address;
        this.api.grpcPort = this.grpcAddr.nodeAddress().port;
      }
    }
  }

  /**
   * Initialize a repo.
   *
   * @param {import('./types').InitOptions} [initOptions]
   * @returns {Promise<Client>}
   */
  async init (initOptions = {}) {
    if (this.initialized) {
      return this
    }

    let ipfsOptions = {};

    if (this.opts.ipfsOptions != null && this.opts.ipfsOptions.init != null && !(typeof this.opts.ipfsOptions.init === 'boolean')) {
      ipfsOptions = this.opts.ipfsOptions.init;
    }

    const opts = merge$2(
      {
        emptyRepo: false,
        profiles: this.opts.test ? ['test'] : []
      },
      ipfsOptions,
      typeof initOptions === 'boolean' ? {} : initOptions
    );

    const req = await http.post(
        `${this.baseUrl}/init`,
        {
          searchParams: new URLSearchParams({ id: this.id }),
          json: opts
        }
    );
    const rsp = await req.json();
    this.initialized = rsp.initialized;
    this.clean = false;
    return this
  }

  /**
   * Delete the repo that was being used.
   * If the node was marked as `disposable` this will be called
   * automatically when the process is exited.
   *
   * @returns {Promise<Client>}
   */
  async cleanup () {
    if (this.clean) {
      return this
    }

    await http.post(
        `${this.baseUrl}/cleanup`,
        { searchParams: new URLSearchParams({ id: this.id }) }
    );
    this.clean = true;
    return this
  }

  /**
   * Start the daemon.
   *
   * @returns {Promise<Client>}
   */
  async start () {
    if (!this.started) {
      const req = await http.post(
              `${this.baseUrl}/start`,
              { searchParams: new URLSearchParams({ id: this.id }) }
      );
      const res = await req.json();

      this._setApi(res.apiAddr);
      this._setGateway(res.gatewayAddr);
      this._setGrpc(res.grpcAddr);
      this._createApi();

      this.started = true;
    }

    // Add `peerId`
    const id = await this.api.id();
    this._peerId = id;
    daemonLog$1.info(id);
    return this
  }

  /**
   * Stop the daemon
   */
  async stop () {
    if (!this.started) {
      return this
    }

    await http.post(
      `${this.baseUrl}/stop`,
      { searchParams: new URLSearchParams({ id: this.id }) }
    );
    this.started = false;

    if (this.disposable) {
      await this.cleanup();
    }

    return this
  }

  /**
   * Get the pid of the `ipfs daemon` process.
   *
   * @returns {Promise<number>}
   */
  async pid () {
    const req = await http.get(
        `${this.baseUrl}/pid`,
        { searchParams: new URLSearchParams({ id: this.id }) }
    );
    const res = await req.json();

    return res.pid
  }

  /**
   * Get the version of ipfs
   *
   * @returns {Promise<string>}
   */
  async version () {
    const req = await http.get(
        `${this.baseUrl}/version`,
        { searchParams: new URLSearchParams({ id: this.id }) }
    );
    const res = await req.json();
    return res.version
  }
}

const merge$1 = mergeOptions.bind({ ignoreUndefined: true });

const daemonLog = {
  info: logger('ipfsd-ctl:proc:stdout'),
  err: logger('ipfsd-ctl:proc:stderr')
};
/**
 * @typedef {import("./types").ControllerOptions} ControllerOptions
 * @typedef {import("./types").InitOptions} InitOptions
 */

/**
 * Controller for in process nodes
 */
class InProc {
  /**
   * @param {Required<ControllerOptions>} opts
   */
  constructor (opts) {
    this.opts = opts;
    this.path = this.opts.ipfsOptions.repo || (opts.disposable ? tmpDir(opts.type) : defaultRepo(opts.type));
    this.initOptions = toInitOptions(opts.ipfsOptions.init);
    this.disposable = opts.disposable;
    this.initialized = false;
    this.started = false;
    this.clean = true;
    /** @type {Multiaddr} */
    this.apiAddr; // eslint-disable-line no-unused-expressions
    this.api = null;
    /** @type {import('./types').Subprocess | null} */
    this.subprocess = null;
    /** @type {import('./types').PeerData | null} */
    this._peerId = null;
  }

  get peer () {
    if (this._peerId == null) {
      throw new Error('Not started')
    }

    return this._peerId
  }

  async setExec () {
    if (this.api !== null) {
      return
    }

    const IPFS = this.opts.ipfsModule;
    this.api = await IPFS.create({
      ...this.opts.ipfsOptions,
      silent: true,
      repo: this.path,
      init: this.initOptions
    });
  }

  /**
   * @private
   * @param {string} addr
   */
  _setApi (addr) {
    this.apiAddr = new Multiaddr(addr);
    this.api = this.opts.ipfsHttpModule.create(addr);
    this.api.apiHost = this.apiAddr.nodeAddress().address;
    this.api.apiPort = this.apiAddr.nodeAddress().port;
  }

  /**
   * Initialize a repo.
   *
   * @param {import('./types').InitOptions} [initOptions={}]
   * @returns {Promise<InProc>}
   */
  async init (initOptions = {}) {
    this.initialized = await repoExists(this.path);
    if (this.initialized) {
      this.clean = false;
      return this
    }

    // Repo not initialized
    this.initOptions = merge$1(
      {
        emptyRepo: false,
        profiles: this.opts.test ? ['test'] : []
      },
      this.initOptions,
      toInitOptions(initOptions)
    );

    await this.setExec();
    this.clean = false;
    this.initialized = true;
    return this
  }

  /**
   * Delete the repo that was being used.
   * If the node was marked as `disposable` this will be called
   * automatically when the process is exited.
   *
   * @returns {Promise<InProc>}
   */
  async cleanup () {
    if (!this.clean) {
      await removeRepo(this.path);
      this.clean = true;
    }
    return this
  }

  /**
   * Start the daemon.
   *
   * @returns {Promise<InProc>}
   */
  async start () {
    // Check if a daemon is already running
    checkForRunningApi(this.path);
    {
      await this.setExec();
      await this.api.start();
    }

    this.started = true;
    // Add `peerId`
    const id = await this.api.id();
    this._peerId = id;
    daemonLog.info(id);
    return this
  }

  /**
   * Stop the daemon.
   *
   * @returns {Promise<InProc>}
   */
  async stop () {
    if (!this.started) {
      return this
    }

    await this.api.stop();
    this.started = false;

    if (this.disposable) {
      await this.cleanup();
    }
    return this
  }

  /**
   * Get the pid of the `ipfs daemon` process
   *
   * @returns {Promise<number>}
   */
  pid () {
    return Promise.reject(new Error('not implemented'))
  }

  /**
   * Get the version of ipfs
   *
   * @returns {Promise<string>}
   */
  async version () {
    await this.setExec();

    const { version } = await this.api.version();

    return version
  }
}

/**
 * @param {boolean | InitOptions} [init]
 */
const toInitOptions = (init = {}) =>
  typeof init === 'boolean' ? {} : init;

/**
 * @param {object} args
 * @param {import('./types').NodeType} args.type
 */
var testsConfig = ({ type }) => {
  /** @type {string[]} */
  let swarm;

  // from the browser tell remote nodes to listen over WS
  swarm = [
    '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
    '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
    '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/'
  ]

  return {
    API: {
      HTTPHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Methods': [
          'PUT',
          'POST',
          'GET'
        ]
      }
    },
    Addresses: {
      Swarm: swarm,
      API: '/ip4/127.0.0.1/tcp/0',
      Gateway: '/ip4/127.0.0.1/tcp/0',
      RPC: '/ip4/127.0.0.1/tcp/0'
    }
  }
};

const merge = mergeOptions.bind({ ignoreUndefined: true });

/**
 * @typedef {import("./types").ControllerOptions} ControllerOptions
 * @typedef {import("./types").ControllerOptionsOverrides} ControllerOptionsOverrides
 * @typedef {import("./types").IPFSOptions} IPFSOptions
 * @typedef {import('./types').Controller} Controller
 */

const defaults = {
  remote: !isNode,
  endpoint: 'http://localhost:43134',
  disposable: true,
  test: false,
  type: 'go',
  env: {},
  args: [],
  ipfsOptions: {},
  forceKill: true,
  forceKillTimeout: 5000
};

/**
 * Factory class to spawn ipfsd controllers
 */
class Factory {
  /**
   *
   * @param {ControllerOptions} options
   * @param {ControllerOptionsOverrides} overrides - Pre-defined overrides per controller type
   */
  constructor (options = {}, overrides = {}) {
    /** @type ControllerOptions */
    this.opts = merge(defaults, options);

    /** @type ControllerOptionsOverrides */
    this.overrides = merge({
      js: merge(this.opts, { type: 'js' }),
      go: merge(this.opts, { type: 'go' }),
      proc: merge(this.opts, { type: 'proc' })
    }, overrides);

    /** @type {Controller[]} */
    this.controllers = [];
  }

  /**
   * Utility method to get a temporary directory
   * useful in browsers to be able to generate temp
   * repos manually
   *
   * @param {ControllerOptions} [options]
   * @returns {Promise<string>}
   */
  async tmpDir (options = {}) {
    const opts = merge(this.opts, options);

    if (opts.remote) {
      const res = await http.get(
        `${opts.endpoint}/util/tmp-dir`,
        { searchParams: new URLSearchParams({ type: `${opts.type}` }) }
      );
      const out = await res.json();

      return out.tmpDir
    }

    return Promise.resolve(tmpDir(opts.type))
  }

  /**
   * @param {IPFSOptions & { endpoint: string }} options
   */
  async _spawnRemote (options) {
    const opts = {
      json: {
        ...options,
        // avoid recursive spawning
        remote: false,
        ipfsBin: undefined,
        ipfsModule: undefined,
        ipfsHttpModule: undefined
      }
    };

    const res = await http.post(
      `${options.endpoint}/spawn`,
      opts
    );
    return new Client(
      options.endpoint,
      await res.json(),
      options
    )
  }

  /**
   * Spawn an IPFSd Controller
   *
   * @param {ControllerOptions} options
   * @returns {Promise<Controller>}
   */
  async spawn (options = { }) {
    const type = options.type || this.opts.type || 'go';
    const opts = merge(
      this.overrides[type],
      options
    );

    // IPFS options defaults
    const ipfsOptions = merge(
      {
        start: false,
        init: false
      },
      opts.test
        ? {
            config: testsConfig(opts),
            preload: { enabled: false }
          }
        : {},
      opts.ipfsOptions
    );

    let ctl;
    if (opts.type === 'proc') {
      // spawn in-proc controller
      ctl = new InProc({ ...opts, ipfsOptions });
    } else if (opts.remote) {
      // spawn remote controller
      ctl = await this._spawnRemote({ ...opts, ipfsOptions });
    } else {
      // spawn daemon controller
      ctl = new Client({ ...opts, ipfsOptions });
    }

    // Save the controller
    this.controllers.push(ctl);

    // Auto init and start controller
    if (opts.disposable && (!options.ipfsOptions || (options.ipfsOptions && options.ipfsOptions.init !== false))) {
      await ctl.init(ipfsOptions.init);
    }
    if (opts.disposable && (!options.ipfsOptions || (options.ipfsOptions && options.ipfsOptions.start !== false))) {
      await ctl.start();
    }

    return ctl
  }

  /**
   * Stop all controllers
   */
  async clean () {
    await Promise.all(this.controllers.map(n => n.stop()));
    this.controllers = [];
  }
}

/* eslint-disable no-console */

/**
 * Creates an instance of Server.
 *
 * @class
 */
class Server {
  /**
   * @class
   * @param {object} options
   * @param {number} [options.port=43134] - Server port.
   * @param {Function} createNode
   */
  constructor (options, createNode) {
    options = options || { port: 43134 };

    /** @type {*} */
    this.server = null;
    this.port = options.port;
    this.createNode = createNode;
    console.warn('Server not implemented in the browser');
  }

  /**
   * Start the server
   *
   * @returns {Promise<Server>}
   */
  async start () {
    console.warn('Server not implemented in the browser');

    return this
  }

  /**
   * Stop the server
   *
   * @returns {Promise<void>}
   */
  async stop () {
    console.warn('Server not implemented in the browser');
  }
}

/**
 * @typedef {import('./types').Controller} Controller
 * @typedef {import('./types').ControllerOptions} ControllerOptions
 * @typedef {import('./types').ControllerOptionsOverrides} ControllerOptionsOverrides
 * @typedef {import('./types').Factory} Factory
 */

/**
 * Creates a factory
 *
 * @param {ControllerOptions} [options]
 * @param {ControllerOptionsOverrides} [overrides]
 * @returns {Factory}
 */
const createFactory = (options, overrides) => {
  return new Factory(options, overrides)
};

/**
 * Creates a node
 *
 * @param {ControllerOptions} [options]
 * @returns {Promise<Controller>}
 */
const createController = (options) => {
  const f = new Factory();
  return f.spawn(options)
};

/**
 * Create a Endpoint Server
 *
 * @param {number | { port: number }} [options] - Configuration options or just the port.
 * @param {ControllerOptions} [factoryOptions]
 * @param {ControllerOptionsOverrides} [factoryOverrides]
 */
const createServer = (options, factoryOptions = {}, factoryOverrides = {}) => {
  if (typeof options === 'number') {
    options = { port: options };
  }

  return new Server(options, () => {
    return createFactory(factoryOptions, factoryOverrides)
  })
};

export { createController, createFactory, createServer };
