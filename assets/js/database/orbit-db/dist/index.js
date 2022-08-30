import require$$0 from '../../path/dist/index.js';
import require$$1$3 from '../../orbit-db-eventstore/dist/index.js';
import require$$2$1 from '../../orbit-db-feedstore/dist/index.js';
import require$$3 from '../../orbit-db-kvstore/dist/index.js';
import require$$4 from '../../orbit-db-counterstore/dist/index.js';
import require$$5 from '../../orbit-db-docstore/dist/index.js';
import require$$6 from '../../orbit-db-pubsub/dist/index.js';
import require$$2 from '../../orbit-db-cache/dist/index.js';
import require$$8 from '../../orbit-db-keystore/dist/index.js';
import require$$9 from '../../orbit-db-identity-provider/dist/index.js';
import require$$10 from '../../orbit-db-access-controllers/dist/index.js';
import require$$1 from '../../cids/dist/index.js';
import require$$1$1 from '../../orbit-db-io/dist/index.js';
import require$$0$1 from '../../ipfs-pubsub-1on1/dist/index.js';
import require$$1$2 from '../../logplease/dist/index.js';
import require$$15 from '../../orbit-db-storage-adapter/dist/index.js';
import buffer from '../../safe-buffer/dist/index.js'
const Buffer = buffer.Buffer
const path$3 = require$$0;
const CID = require$$1;

const notEmpty = e => e !== '' && e !== ' ';

class OrbitDBAddress$1 {
  constructor (root, path) {
    this.root = root;
    this.path = path;
  }

  toString () {
    return OrbitDBAddress$1.join(this.root, this.path)
  }

  static isValid (address) {
    address = address.toString().replace(/\\/g, '/');

    const containsProtocolPrefix = (e, i) => !((i === 0 || i === 1) && address.toString().indexOf('/orbit') === 0 && e === 'orbitdb');

    const parts = address.toString()
      .split('/')
      .filter(containsProtocolPrefix)
      .filter(notEmpty);

    let accessControllerHash;

    const validateHash = (hash) => {
      const prefixes = ['zd', 'Qm', 'ba', 'k5'];
      for (const p of prefixes) {
        if (hash.indexOf(p) > -1) {
          return true
        }
      }
      return false
    };

    try {
      accessControllerHash = validateHash(parts[0])
        ? new CID(parts[0]).toBaseEncodedString()
        : null;
    } catch (e) {
      return false
    }

    return accessControllerHash !== null
  }

  static parse (address) {
    if (!address) { throw new Error(`Not a valid OrbitDB address: ${address}`) }

    if (!OrbitDBAddress$1.isValid(address)) { throw new Error(`Not a valid OrbitDB address: ${address}`) }

    address = address.toString().replace(/\\/g, '/');

    const parts = address.toString()
      .split('/')
      .filter((e, i) => !((i === 0 || i === 1) && address.toString().indexOf('/orbit') === 0 && e === 'orbitdb'))
      .filter(e => e !== '' && e !== ' ');

    return new OrbitDBAddress$1(parts[0], parts.slice(1, parts.length).join('/'))
  }

  static join (...paths) {
    return (path$3.posix || path$3).join('/orbitdb', ...paths)
  }
}

var orbitDbAddress = OrbitDBAddress$1;

const path$2 = require$$0;
const io$2 = require$$1$1;

// Creates a DB manifest file and saves it in IPFS
const createDBManifest$1 = async (ipfs, name, type, accessControllerAddress, options) => {
  const manifest = Object.assign({
    name: name,
    type: type,
    accessController: (path$2.posix || path$2).join('/ipfs', accessControllerAddress)
  },
  // meta field is only added to manifest if options.meta is defined
  options.meta !== undefined ? { meta: options.meta } : {}
  );

  return io$2.write(ipfs, options.format || 'dag-cbor', manifest, options)
};

var dbManifest = createDBManifest$1;

const Channel = require$$0$1;

const Logger$2 = require$$1$2;
const logger$2 = Logger$2.create('exchange-heads', { color: Logger$2.Colors.Yellow });
Logger$2.setLogLevel('ERROR');

const getHeadsForDatabase = async store => {
  if (!(store && store._cache)) return []
  const localHeads = await store._cache.get(store.localHeadsPath) || [];
  const remoteHeads = await store._cache.get(store.remoteHeadsPath) || [];
  return [...localHeads, ...remoteHeads]
};

const exchangeHeads$1 = async (ipfs, address, peer, getStore, getDirectConnection, onMessage, onChannelCreated) => {
  const _handleMessage = message => {
    const msg = JSON.parse(Buffer.from(message.data).toString());
    const { address, heads } = msg;
    onMessage(address, heads);
  };

  let channel = getDirectConnection(peer);
  if (!channel) {
    try {
      logger$2.debug(`Create a channel to ${peer}`);
      channel = await Channel.open(ipfs, peer);
      channel.on('message', _handleMessage);
      logger$2.debug(`Channel created to ${peer}`);
      onChannelCreated(channel);
    } catch (e) {
      logger$2.error(e);
    }
  }

  // Wait for the direct channel to be fully connected
  await channel.connect();
  logger$2.debug(`Connected to ${peer}`);

  // Send the heads if we have any
  const heads = await getHeadsForDatabase(getStore(address));
  logger$2.debug(`Send latest heads of '${address}':\n`, JSON.stringify(heads.map(e => e.hash), null, 2));
  if (heads) {
    await channel.send(JSON.stringify({ address: address, heads: heads }));
  }

  return channel
};

var exchangeHeads_1 = exchangeHeads$1;

const isDefined$2 = (arg) => arg !== undefined && arg !== null;

var isDefined_1 = isDefined$2;

const isDefined$1 = isDefined_1;
const io$1 = require$$1$1;

var utils = {
  isDefined: isDefined$1,
  io: io$1
};

/* eslint-disable */

// adapted from https://github.com/cheton/is-electron - (c) Cheton Wu
const isElectron = () => {
  if (typeof window !== 'undefined' && typeof window.process === 'object') {
    return true
  }

  if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
    return true
  }

  return false
};

const fs$1 = (!isElectron() && (typeof window === 'object' || typeof self === 'object')) ? null : eval('require("fs")');

var fsShim = fs$1;

const path$1 = require$$0;
const fs = fsShim;

const Cache$1 = require$$2;

const Logger$1 = require$$1$2;
const logger$1 = Logger$1.create('orbit-db');
Logger$1.setLogLevel('ERROR');

async function migrate (OrbitDB, options, dbAddress) {
  let oldCache = OrbitDB.caches[options.directory] ? OrbitDB.caches[options.directory].cache : null;
  let oldStore;

  if (!oldCache) {
    const addr = (path$1.posix || path$1).join(OrbitDB.directory, dbAddress.root, dbAddress.path);
    if (fs && fs.existsSync && !fs.existsSync(addr)) return
    oldStore = await OrbitDB.storage.createStore(addr);
    oldCache = new Cache$1(oldStore);
  }
  const _localHeads = await oldCache.get('_localHeads');
  if (!_localHeads) return

  const keyRoot = dbAddress.toString();
  logger$1.debug('Attempting to migrate from old cache location');
  const migrationKeys = [
    '_remoteHeads',
    '_localHeads',
    'snapshot',
    'queue'
  ];

  for (const i in migrationKeys) {
    try {
      const key = path$1.join(keyRoot, migrationKeys[i]);
      const val = await oldCache.get(migrationKeys[i]);
      if (val) await options.cache.set(key, val);
    } catch (e) {
      logger$1.debug(e.message);
    }
  }
  await options.cache.set(path$1.join(keyRoot, '_manifest'), dbAddress.root);
  if (oldStore) await oldStore.close();
}

var _0_210_22 = migrate;

const from021To022 = _0_210_22;

const migrations$1 = [from021To022];

async function run (OrbitDB, options, dbAddress) {
  for (let i = 0; i < migrations$1.length; i++) {
    await migrations$1[i](OrbitDB, options, dbAddress);
  }
}

var migrations_1 = { run };

const path = require$$0;
const EventStore = require$$1$3;
const FeedStore = require$$2$1;
const KeyValueStore = require$$3;
const CounterStore = require$$4;
const DocumentStore = require$$5;
const Pubsub = require$$6;
const Cache = require$$2;
const Keystore = require$$8;
const Identities = require$$9;
let AccessControllers = require$$10;
const OrbitDBAddress = orbitDbAddress;
const createDBManifest = dbManifest;
const exchangeHeads = exchangeHeads_1;
const { isDefined, io } = utils;
const Storage = require$$15;
const migrations = migrations_1;

const Logger = require$$1$2;
const logger = Logger.create('orbit-db');
Logger.setLogLevel('ERROR');

// Mapping for 'database type' -> Class
const databaseTypes = {
  counter: CounterStore,
  eventlog: EventStore,
  feed: FeedStore,
  docstore: DocumentStore,
  keyvalue: KeyValueStore
};

class OrbitDB {
  constructor (ipfs, identity, options = {}) {
    if (!isDefined(ipfs)) { throw new Error('IPFS is a required argument. See https://github.com/orbitdb/orbit-db/blob/master/API.md#createinstance') }

    if (!isDefined(identity)) { throw new Error('identity is a required argument. See https://github.com/orbitdb/orbit-db/blob/master/API.md#createinstance') }

    this._ipfs = ipfs;
    this.identity = identity;
    this.id = options.peerId;
    this._pubsub = !options.offline
      ? options.broker
        ? new options.broker(this._ipfs) // eslint-disable-line
        : new Pubsub(this._ipfs, this.id)
      : null;
    this.directory = options.directory || './orbitdb';
    this.storage = options.storage;
    this._directConnections = {};

    this.caches = {};
    this.caches[this.directory] = { cache: options.cache, handlers: new Set() };
    this.keystore = options.keystore;
    this.stores = {};

    // AccessControllers module can be passed in to enable
    // testing with orbit-db-access-controller
    AccessControllers = options.AccessControllers || AccessControllers;
  }

  static get Pubsub () { return Pubsub }
  static get Cache () { return Cache }
  static get Keystore () { return Keystore }
  static get Identities () { return Identities }
  static get AccessControllers () { return AccessControllers }
  static get Storage () { return Storage }
  static get OrbitDBAddress () { return OrbitDBAddress }

  static get EventStore () { return EventStore }
  static get FeedStore () { return FeedStore }
  static get KeyValueStore () { return KeyValueStore }
  static get CounterStore () { return CounterStore }
  static get DocumentStore () { return DocumentStore }

  get cache () { return this.caches[this.directory].cache }

  static async createInstance (ipfs, options = {}) {
    if (!isDefined(ipfs)) { throw new Error('IPFS is a required argument. See https://github.com/orbitdb/orbit-db/blob/master/API.md#createinstance') }

    if (options.offline === undefined) {
      options.offline = false;
    }

    if (options.offline && !options.id) {
      throw new Error('Offline mode requires passing an `id` in the options')
    }

    const { id } = options.offline ? ({ id: options.id }) : await ipfs.id();

    if (!options.directory) { options.directory = './orbitdb'; }

    if (!options.storage) {
      const storageOptions = {};

      // Create default `level` store
      options.storage = Storage(null, storageOptions);
    }

    if (options.identity && options.identity.provider.keystore) {
      options.keystore = options.identity.provider.keystore;
    }

    if (!options.keystore) {
      const keystorePath = path.join(options.directory, id, '/keystore');
      const keyStorage = await options.storage.createStore(keystorePath);
      options.keystore = new Keystore(keyStorage);
    }

    if (!options.identity) {
      options.identity = await Identities.createIdentity({
        id: options.id || id,
        keystore: options.keystore
      });
    }

    if (!options.cache) {
      const cachePath = path.join(options.directory, id, '/cache');
      const cacheStorage = await options.storage.createStore(cachePath);
      options.cache = new Cache(cacheStorage);
    }

    const finalOptions = Object.assign({}, options, { peerId: id });
    return new OrbitDB(ipfs, options.identity, finalOptions)
  }

  /* Databases */
  async feed (address, options = {}) {
    options = Object.assign({ create: true, type: 'feed' }, options);
    return this.open(address, options)
  }

  async log (address, options = {}) {
    options = Object.assign({ create: true, type: 'eventlog' }, options);
    return this.open(address, options)
  }

  async eventlog (address, options = {}) {
    return this.log(address, options)
  }

  async keyvalue (address, options = {}) {
    options = Object.assign({ create: true, type: 'keyvalue' }, options);
    return this.open(address, options)
  }

  async kvstore (address, options = {}) {
    return this.keyvalue(address, options)
  }

  async counter (address, options = {}) {
    options = Object.assign({ create: true, type: 'counter' }, options);
    return this.open(address, options)
  }

  async docs (address, options = {}) {
    options = Object.assign({ create: true, type: 'docstore' }, options);
    return this.open(address, options)
  }

  async docstore (address, options = {}) {
    return this.docs(address, options)
  }

  async disconnect () {
    // close keystore
    await this.keystore.close();

    // Close all open databases
    const databases = Object.values(this.stores);
    for (const db of databases) {
      await db.close();
      delete this.stores[db.address.toString()];
    }

    const caches = Object.keys(this.caches);
    for (const directory of caches) {
      await this.caches[directory].cache.close();
      delete this.caches[directory];
    }

    // Close a direct connection and remove it from internal state
    const removeDirectConnect = e => {
      this._directConnections[e].close();
      delete this._directConnections[e];
    };

    // Close all direct connections to peers
    Object.keys(this._directConnections).forEach(removeDirectConnect);

    // Disconnect from pubsub
    if (this._pubsub) {
      await this._pubsub.disconnect();
    }

    // Remove all databases from the state
    this.stores = {};
  }

  // Alias for disconnect()
  async stop () {
    await this.disconnect();
  }

  async _createCache (path) {
    const cacheStorage = await this.storage.createStore(path);
    return new Cache(cacheStorage)
  }

  /* Private methods */
  async _createStore (type, address, options) {
    // Get the type -> class mapping
    const Store = databaseTypes[type];

    if (!Store) { throw new Error(`Invalid database type '${type}'`) }

    let accessController;
    if (options.accessControllerAddress) {
      accessController = await AccessControllers.resolve(this, options.accessControllerAddress, options.accessController);
    }

    const opts = Object.assign({ replicate: true }, options, {
      accessController: accessController,
      cache: options.cache,
      onClose: this._onClose.bind(this),
      onDrop: this._onDrop.bind(this),
      onLoad: this._onLoad.bind(this)
    });
    const identity = options.identity || this.identity;

    const store = new Store(this._ipfs, identity, address, opts);
    store.events.on('write', this._onWrite.bind(this));

    // ID of the store is the address as a string
    const addr = address.toString();
    this.stores[addr] = store;

    // Subscribe to pubsub to get updates from peers,
    // this is what hooks us into the message propagation layer
    // and the p2p network
    if (opts.replicate && this._pubsub) { await this._pubsub.subscribe(addr, this._onMessage.bind(this), this._onPeerConnected.bind(this)); }

    return store
  }

  // Callback for local writes to the database. We the update to pubsub.
  _onWrite (address, entry, heads) {
    if (!heads) throw new Error("'heads' not defined")
    if (this._pubsub) this._pubsub.publish(address, heads);
  }

  // Callback for receiving a message from the network
  async _onMessage (address, heads, peer) {
    const store = this.stores[address];
    try {
      console.log(`Received ${heads.length} heads for '${address}':\n`, JSON.stringify(heads.map(e => e.hash), null, 2));
      if (store && heads) {
        if (heads.length > 0) {
          await store.sync(heads);
        }
        store.events.emit('peer.exchanged', peer, address, heads);
      }
    } catch (e) {
      logger.error(e);
    }
  }

  // Callback for when a peer connected to a database
  async _onPeerConnected (address, peer) {
    console.log(`New peer '${peer}' connected to '${address}'`);

    const getStore = address => this.stores[address];
    const getDirectConnection = peer => this._directConnections[peer];
    const onChannelCreated = channel => { this._directConnections[channel._receiverID] = channel; };

    const onMessage = (address, heads) => this._onMessage(address, heads, peer);

    await exchangeHeads(
      this._ipfs,
      address,
      peer,
      getStore,
      getDirectConnection,
      onMessage,
      onChannelCreated
    );

    if (getStore(address)) { getStore(address).events.emit('peer', peer); }
  }

  // Callback when database was closed
  async _onClose (db) {
    const address = db.address.toString();
    console.log(`Close ${address}`);

    // Unsubscribe from pubsub
    if (this._pubsub) {
      await this._pubsub.unsubscribe(address);
    }

    const store = this.stores[address];
    const dir = store && store.options.directory ? store.options.directory : this.directory;
    const cache = this.caches[dir];

    if (cache && cache.handlers.has(address)) {
      cache.handlers.delete(address);
      if (!cache.handlers.size) await cache.cache.close();
    }

    delete this.stores[address];
  }

  async _onDrop (db) {
    const address = db.address.toString();
    const dir = db && db.options.directory ? db.options.directory : this.directory;
    await this._requestCache(address, dir, db._cache);
    this.stores[address] = db;
  }

  async _onLoad (db) {
    const address = db.address.toString();
    const dir = db && db.options.directory ? db.options.directory : this.directory;
    await this._requestCache(address, dir, db._cache);
    this.stores[address] = db;
  }

  async _determineAddress (name, type, options = {}) {
    if (!OrbitDB.isValidType(type)) { throw new Error(`Invalid database type '${type}'`) }

    if (OrbitDBAddress.isValid(name)) { throw new Error('Given database name is an address. Please give only the name of the database!') }

    // Create an AccessController, use IPFS AC as the default
    options.accessController = Object.assign({}, { name: name, type: 'ipfs' }, options.accessController);
    const accessControllerAddress = await AccessControllers.create(this, options.accessController.type, options.accessController || {});

    // Save the manifest to IPFS
    const manifestHash = await createDBManifest(this._ipfs, name, type, accessControllerAddress, options);

    // Create the database address
    return OrbitDBAddress.parse(OrbitDBAddress.join(manifestHash, name))
  }

  /* Create and Open databases */

  /*
    options = {
      accessController: { write: [] } // array of keys that can write to this database
      overwrite: false, // whether we should overwrite the existing database if it exists
    }
  */
  async create (name, type, options = {}) {
    console.log('create()');

    console.log(`Creating database '${name}' as ${type}`);

    // Create the database address
    const dbAddress = await this._determineAddress(name, type, options);

    options.cache = await this._requestCache(dbAddress.toString(), options.directory);

    // Check if we have the database locally
    const haveDB = await this._haveLocalData(options.cache, dbAddress);

    if (haveDB && !options.overwrite) { throw new Error(`Database '${dbAddress}' already exists!`) }

    await this._migrate(options, dbAddress);

    // Save the database locally
    await this._addManifestToCache(options.cache, dbAddress);

    console.log(`Created database '${dbAddress}'`);

    // Open the database
    return this.open(dbAddress, options)
  }

  async determineAddress (name, type, options = {}) {
    const opts = Object.assign({}, { onlyHash: true }, options);
    return this._determineAddress(name, type, opts)
  }

  async _requestCache (address, directory, existingCache) {
    const dir = directory || this.directory;
    if (!this.caches[dir]) {
      const newCache = existingCache || await this._createCache(dir);
      this.caches[dir] = { cache: newCache, handlers: new Set() };
    }
    this.caches[dir].handlers.add(address);
    const cache = this.caches[dir].cache;

    // "Wake up" the caches if they need it
    if (cache) await cache.open();

    return cache
  }

  /*
      options = {
        localOnly: false // if set to true, throws an error if database can't be found locally
        create: false // whether to create the database
        type: TODO
        overwrite: TODO

      }
   */
  async open (address, options = {}) {
    console.log('open()');
    options = Object.assign({ localOnly: false, create: false }, options);
    console.log(`Open database '${address}'`);

    // If address is just the name of database, check the options to crate the database
    if (!OrbitDBAddress.isValid(address)) {
      if (!options.create) {
        throw new Error('\'options.create\' set to \'false\'. If you want to create a database, set \'options.create\' to \'true\'.')
      } else if (options.create && !options.type) {
        throw new Error(`Database type not provided! Provide a type with 'options.type' (${OrbitDB.databaseTypes.join('|')})`)
      } else {
        console.warn(`Not a valid OrbitDB address '${address}', creating the database`);
        options.overwrite = options.overwrite ? options.overwrite : true;
        return this.create(address, options.type, options)
      }
    }

    // Parse the database address
    const dbAddress = OrbitDBAddress.parse(address);

    options.cache = await this._requestCache(dbAddress.toString(), options.directory);

    // Check if we have the database
    const haveDB = await this._haveLocalData(options.cache, dbAddress);

    console.log((haveDB ? 'Found' : 'Didn\'t find') + ` database '${dbAddress}'`);

    // If we want to try and open the database local-only, throw an error
    // if we don't have the database locally
    if (options.localOnly && !haveDB) {
      console.warn(`Database '${dbAddress}' doesn't exist!`);
      throw new Error(`Database '${dbAddress}' doesn't exist!`)
    }

    console.log(`Loading Manifest for '${dbAddress}'`);

    // Get the database manifest from IPFS
    const manifest = await io.read(this._ipfs, dbAddress.root);
    console.log(`Manifest for '${dbAddress}':\n${JSON.stringify(manifest, null, 2)}`);

    // Make sure the type from the manifest matches the type that was given as an option
    if (manifest.name !== dbAddress.path) { throw new Error(`Manifest '${manifest.name}' cannot be opened as '${dbAddress.path}'`) }
    if (options.type && manifest.type !== options.type) { throw new Error(`Database '${dbAddress}' is type '${manifest.type}' but was opened as '${options.type}'`) }

    // Save the database locally
    await this._addManifestToCache(options.cache, dbAddress);

    // Open the the database
    options = Object.assign({}, options, { accessControllerAddress: manifest.accessController, meta: manifest.meta });
    return this._createStore(manifest.type, dbAddress, options)
  }

  // Save the database locally
  async _addManifestToCache (cache, dbAddress) {
    await cache.set(path.join(dbAddress.toString(), '_manifest'), dbAddress.root);
    console.log(`Saved manifest to IPFS as '${dbAddress.root}'`);
  }

  /**
   * Check if we have the database, or part of it, saved locally
   * @param  {[Cache]} cache [The OrbitDBCache instance containing the local data]
   * @param  {[OrbitDBAddress]} dbAddress [Address of the database to check]
   * @return {[Boolean]} [Returns true if we have cached the db locally, false if not]
   */
  async _haveLocalData (cache, dbAddress) {
    if (!cache) {
      return false
    }

    const addr = dbAddress.toString();
    const data = await cache.get(path.join(addr, '_manifest'));
    return data !== undefined && data !== null
  }

  /**
   * Runs all migrations inside the src/migration folder
   * @param Object options  Options to pass into the migration
   * @param OrbitDBAddress dbAddress Address of database in OrbitDBAddress format
   */
  async _migrate (options, dbAddress) {
    await migrations.run(this, options, dbAddress);
  }

  /**
   * Returns supported database types as an Array of strings
   * Eg. [ 'counter', 'eventlog', 'feed', 'docstore', 'keyvalue']
   * @return {[Array]} [Supported database types]
   */
  static get databaseTypes () {
    return Object.keys(databaseTypes)
  }

  static isValidType (type) {
    return Object.keys(databaseTypes).includes(type)
  }

  static addDatabaseType (type, store) {
    if (databaseTypes[type]) throw new Error(`Type already exists: ${type}`)
    databaseTypes[type] = store;
  }

  static getDatabaseTypes () {
    return databaseTypes
  }

  static isValidAddress (address) {
    return OrbitDBAddress.isValid(address)
  }

  static parseAddress (address) {
    return OrbitDBAddress.parse(address)
  }
}

OrbitDB.prototype.AccessControllers = AccessControllers;
OrbitDB.prototype.Identities = Identities;
OrbitDB.prototype.Keystore = Keystore;

var OrbitDB_1 = OrbitDB;

export { OrbitDB_1 as default };
