import require$$0 from '../../events/dist/index.js';
import require$$0$1 from '../../orbit-db-io/dist/index.js';
import require$$1 from '../../safe-buffer/dist/index.js';
import require$$0$3 from '../../p-map-series/dist/index.js';
import require$$0$2 from '../../path/dist/index.js';

const EventEmitter = require$$0.EventEmitter;

/**
 * Interface for OrbitDB Access Controllers
 *
 * Any OrbitDB access controller needs to define and implement
 * the methods defined by the interface here.
 */
class AccessController$4 extends EventEmitter {
  /*
    Every AC needs to have a 'Factory' method
    that creates an instance of the AccessController
  */
  static async create (orbitdb, options) {}

  /* Return the type for this controller */
  static get type () {
    throw new Error('\'static get type ()\' needs to be defined in the inheriting class')
  }

  /*
    Return the type for this controller
    NOTE! This is the only property of the interface that
    shouldn't be overridden in the inherited Access Controller
  */
  get type () {
    return this.constructor.type
  }

  /* Each Access Controller has some address to anchor to */
  get address () {}

  /*
    Called by the databases (the log) to see if entry should
    be allowed in the database. Return true if the entry is allowed,
    false is not allowed
  */
  async canAppend (entry, identityProvider) {}

  /* Add and remove access */
  async grant (access, identity) { return false }
  async revoke (access, identity) { return false }

  /* AC creation and loading */
  async load (address) {}
  /* Returns AC manifest parameters object */
  async save () {}
  /* Called when the database for this AC gets closed */
  async close () {}
}

var accessControllerInterface = AccessController$4;

const io$4 = require$$0$1;

class AccessControllerManifest$1 {
  constructor (type, params = {}) {
    this.type = type;
    this.params = params;
  }

  static async resolve (ipfs, manifestHash, options = {}) {
    if (options.skipManifest) {
      if (!options.type) {
        throw new Error('No manifest, access-controller type required')
      }
      return new AccessControllerManifest$1(options.type, { address: manifestHash })
    } else {
      // TODO: ensure this is a valid multihash
      if (manifestHash.indexOf('/ipfs') === 0) { manifestHash = manifestHash.split('/')[2]; }
      const { type, params } = await io$4.read(ipfs, manifestHash);
      return new AccessControllerManifest$1(type, params)
    }
  }

  static async create (ipfs, type, params) {
    if (params.skipManifest) {
      return params.address
    }
    const manifest = {
      type: type,
      params: params
    };
    return io$4.write(ipfs, 'dag-cbor', manifest)
  }
}

var accessControllerManifest = AccessControllerManifest$1;

const io$3 = require$$0$1;
const Buffer = require$$1.Buffer;
const AccessController$3 = accessControllerInterface;
const type$2 = 'legacy-ipfs';

class LegacyIPFSAccessController$1 extends AccessController$3 {
  constructor (ipfs, options) {
    super();
    this._ipfs = ipfs;
    this._write = Array.from(options.write || []);
  }

  // Returns the type of the access controller
  static get type () { return type$2 }

  // Return a Set of keys that have `access` capability
  get write () {
    return this._write
  }

  async canAppend (entry, identityProvider) {
    // Allow if access list contain the writer's publicKey or is '*'
    const publicKey = entry.key;
    if (this.write.includes(publicKey) ||
      this.write.includes('*')) {
      return true
    }
    return false
  }

  async load (address) {
    // Transform '/ipfs/QmPFtHi3cmfZerxtH9ySLdzpg1yFhocYDZgEZywdUXHxFU'
    // to 'QmPFtHi3cmfZerxtH9ySLdzpg1yFhocYDZgEZywdUXHxFU'
    if (address.indexOf('/ipfs') === 0) { address = address.split('/')[2]; }

    try {
      const access = await io$3.read(this._ipfs, address);
      this._write = access.write;
    } catch (e) {
      console.log('LegacyIPFSAccessController.load ERROR:', e);
    }
  }

  async save (options) {
    let cid;
    const access = { admin: [], write: this.write, read: [] };
    try {
      cid = await io$3.write(this._ipfs, 'raw', Buffer.from(JSON.stringify(access, null, 2)), { format: 'dag-pb' });
    } catch (e) {
      console.log('LegacyIPFSAccessController.save ERROR:', e);
    }
    // return the manifest data
    return { address: cid, skipManifest: true }
  }

  static async create (orbitdb, options = {}) {
    options = { ...options, ...{ write: options.write || [orbitdb.identity.publicKey] } };
    return new LegacyIPFSAccessController$1(orbitdb._ipfs, options)
  }
}

var legacyIpfsAccessController = LegacyIPFSAccessController$1;

const isValidEthAddress$1 = (web3, address) => {
  return web3.utils.isAddress(address)
};
var isValidEthAddress_1 = isValidEthAddress$1;

const io$2 = require$$0$1;

var io_1 = {
  read: async (ipfs, cid, options = {}) => {
    const access = await io$2.read(ipfs, cid, options);
    return (typeof access.write === 'string') ? JSON.parse(access.write) : access.write // v0 access.write not stringified
  },
  write: io$2.write
};

const isValidEthAddress = isValidEthAddress_1;
const io$1 = io_1;

var utils = {
  io: io$1,
  isValidEthAddress
};

const { io } = utils;
const AccessController$2 = accessControllerInterface;
const type$1 = 'ipfs';

class IPFSAccessController$1 extends AccessController$2 {
  constructor (ipfs, options) {
    super();
    this._ipfs = ipfs;
    this._write = Array.from(options.write || []);
  }

  // Returns the type of the access controller
  static get type () { return type$1 }

  // Return a Set of keys that have `access` capability
  get write () {
    return this._write
  }

  async canAppend (entry, identityProvider) {
    // Allow if access list contain the writer's publicKey or is '*'
    const key = entry.identity.id;
    if (this.write.includes(key) || this.write.includes('*')) {
      // check identity is valid
      return identityProvider.verifyIdentity(entry.identity)
    }
    return false
  }

  async load (address) {
    // Transform '/ipfs/QmPFtHi3cmfZerxtH9ySLdzpg1yFhocYDZgEZywdUXHxFU'
    // to 'QmPFtHi3cmfZerxtH9ySLdzpg1yFhocYDZgEZywdUXHxFU'
    if (address.indexOf('/ipfs') === 0) { address = address.split('/')[2]; }

    try {
      this._write = await io.read(this._ipfs, address);
    } catch (e) {
      console.log('IPFSAccessController.load ERROR:', e);
    }
  }

  async save () {
    let cid;
    try {
      cid = await io.write(this._ipfs, 'dag-cbor', { write: JSON.stringify(this.write, null, 2) });
    } catch (e) {
      console.log('IPFSAccessController.save ERROR:', e);
    }
    // return the manifest data
    return { address: cid }
  }

  static async create (orbitdb, options = {}) {
    options = { ...options, ...{ write: options.write || [orbitdb.identity.id] } };
    return new IPFSAccessController$1(orbitdb._ipfs, options)
  }
}

var ipfsAccessController = IPFSAccessController$1;

const path = require$$0$2;
// Make sure the given address has '/_access' as the last part
const ensureAddress$1 = address => {
  const suffix = address.toString().split('/').pop();
  return suffix === '_access'
    ? address
    : path.join(address, '/_access')
};
var ensureAcAddress = ensureAddress$1;

const pMapSeries = require$$0$3;
const AccessController$1 = accessControllerInterface;
const ensureAddress = ensureAcAddress;

const type = 'orbitdb';

class OrbitDBAccessController$1 extends AccessController$1 {
  constructor (orbitdb, options) {
    super();
    this._orbitdb = orbitdb;
    this._db = null;
    this._options = options || {};
  }

  // Returns the type of the access controller
  static get type () { return type }

  // Returns the address of the OrbitDB used as the AC
  get address () {
    return this._db.address
  }

  // Return true if entry is allowed to be added to the database
  async canAppend (entry, identityProvider) {
    // Write keys and admins keys are allowed
    const access = new Set([...this.get('write'), ...this.get('admin')]);
    // If the ACL contains the writer's public key or it contains '*'
    if (access.has(entry.identity.id) || access.has('*')) {
      const verifiedIdentity = await identityProvider.verifyIdentity(entry.identity);
      // Allow access if identity verifies
      return verifiedIdentity
    }

    return false
  }

  get capabilities () {
    if (this._db) {
      const capabilities = this._db.index;

      const toSet = (e) => {
        const key = e[0];
        capabilities[key] = new Set([...(capabilities[key] || []), ...e[1]]);
      };

      // Merge with the access controller of the database
      // and make sure all values are Sets
      Object.entries({
        ...capabilities,
        // Add the root access controller's 'write' access list
        // as admins on this controller
        ...{ admin: new Set([...(capabilities.admin || []), ...this._db.access.write]) }
      }).forEach(toSet);

      return capabilities
    }
    return {}
  }

  get (capability) {
    return this.capabilities[capability] || new Set([])
  }

  async close () {
    await this._db.close();
  }

  async load (address) {
    if (this._db) { await this._db.close(); }

    // Force '<address>/_access' naming for the database
    this._db = await this._orbitdb.keyvalue(ensureAddress(address), {
      // use ipfs controller as a immutable "root controller"
      accessController: {
        type: 'ipfs',
        write: this._options.admin || [this._orbitdb.identity.id]
      },
      sync: true
    });

    this._db.events.on('ready', this._onUpdate.bind(this));
    this._db.events.on('write', this._onUpdate.bind(this));
    this._db.events.on('replicated', this._onUpdate.bind(this));

    await this._db.load();
  }

  async save () {
    // return the manifest data
    return {
      address: this._db.address.toString()
    }
  }

  async grant (capability, key) {
    // Merge current keys with the new key
    const capabilities = new Set([...(this._db.get(capability) || []), ...[key]]);
    await this._db.put(capability, Array.from(capabilities.values()));
  }

  async revoke (capability, key) {
    const capabilities = new Set(this._db.get(capability) || []);
    capabilities.delete(key);
    if (capabilities.size > 0) {
      await this._db.put(capability, Array.from(capabilities.values()));
    } else {
      await this._db.del(capability);
    }
  }

  /* Private methods */
  _onUpdate () {
    this.emit('updated');
  }

  /* Factory */
  static async create (orbitdb, options = {}) {
    const ac = new OrbitDBAccessController$1(orbitdb, options);
    await ac.load(options.address || options.name || 'default-access-controller');

    // Add write access from options
    if (options.write && !options.address) {
      await pMapSeries(options.write, async (e) => ac.grant('write', e));
    }

    return ac
  }
}

var orbitdbAccessController = OrbitDBAccessController$1;

const AccessController = accessControllerInterface;
const AccessControllerManifest = accessControllerManifest;
const LegacyIPFSAccessController = legacyIpfsAccessController;
const IPFSAccessController = ipfsAccessController;
const OrbitDBAccessController = orbitdbAccessController;

const supportedTypes = {
  'legacy-ipfs': LegacyIPFSAccessController,
  ipfs: IPFSAccessController,
  orbitdb: OrbitDBAccessController
};

const getHandlerFor = (type) => {
  if (!AccessControllers$1.isSupported(type)) {
    throw new Error(`AccessController type '${type}' is not supported`)
  }
  return supportedTypes[type]
};

class AccessControllers$1 {
  static get AccessController () { return AccessController }

  static isSupported (type) {
    return Object.keys(supportedTypes).includes(type)
  }

  static addAccessController (options) {
    if (!options.AccessController) {
      throw new Error('AccessController class needs to be given as an option')
    }

    if (!options.AccessController.type ||
      typeof options.AccessController.type !== 'string') {
      throw new Error('Given AccessController class needs to implement: static get type() { /* return a string */}.')
    }

    supportedTypes[options.AccessController.type] = options.AccessController;
  }

  static addAccessControllers (options) {
    const accessControllers = options.AccessControllers;
    if (!accessControllers) {
      throw new Error('AccessController classes need to be given as an option')
    }

    accessControllers.forEach((accessController) => {
      AccessControllers$1.addAccessController({ AccessController: accessController });
    });
  }

  static removeAccessController (type) {
    delete supportedTypes[type];
  }

  static async resolve (orbitdb, manifestAddress, options = {}) {
    const { type, params } = await AccessControllerManifest.resolve(orbitdb._ipfs, manifestAddress, options);
    const AccessController = getHandlerFor(type);
    const accessController = await AccessController.create(orbitdb, Object.assign({}, options, params));
    await accessController.load(params.address);
    return accessController
  }

  static async create (orbitdb, type, options = {}) {
    const AccessController = getHandlerFor(type);
    const ac = await AccessController.create(orbitdb, options);
    const params = await ac.save();
    const hash = await AccessControllerManifest.create(orbitdb._ipfs, type, params);
    return hash
  }
}

var accessControllers = AccessControllers$1;

const AccessControllers = accessControllers;
var orbitDbAccessControllers = AccessControllers;

export { orbitDbAccessControllers as default };
