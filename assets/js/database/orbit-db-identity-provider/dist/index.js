import require$$1 from '../../orbit-db-keystore/dist/index.js';
import require$$4 from '../../lru/dist/index.js';
import require$$5 from '../../path/dist/index.js';

const isDefined$1 = (arg) => arg !== undefined && arg !== null;

var isDefined_1 = isDefined$1;

const isDefined = isDefined_1;

class Identity$1 {
  constructor (id, publicKey, idSignature, pubKeyIdSignature, type, provider) {
    if (!isDefined(id)) {
      throw new Error('Identity id is required')
    }

    if (!isDefined(publicKey)) {
      throw new Error('Invalid public key')
    }

    if (!isDefined(idSignature)) {
      throw new Error('Signature of the id (idSignature) is required')
    }

    if (!isDefined(pubKeyIdSignature)) {
      throw new Error('Signature of (publicKey + idSignature) is required')
    }

    if (!isDefined(type)) {
      throw new Error('Identity type is required')
    }

    if (!isDefined(provider)) {
      throw new Error('Identity provider is required')
    }

    this._id = id;
    this._publicKey = publicKey;
    this._signatures = Object.assign({}, { id: idSignature }, { publicKey: pubKeyIdSignature });
    this._type = type;
    this._provider = provider;
  }

  /**
  * This is only used as a fallback to the clock id when necessary
  * @return {string} public key hex encoded
  */
  get id () {
    return this._id
  }

  get publicKey () {
    return this._publicKey
  }

  get signatures () {
    return this._signatures
  }

  get type () {
    return this._type
  }

  get provider () {
    return this._provider
  }

  toJSON () {
    return {
      id: this.id,
      publicKey: this.publicKey,
      signatures: this.signatures,
      type: this.type
    }
  }

  static isIdentity (identity) {
    return identity.id !== undefined &&
           identity.publicKey !== undefined &&
           identity.signatures !== undefined &&
           identity.signatures.id !== undefined &&
           identity.signatures.publicKey !== undefined &&
           identity.type !== undefined
  }

  static toJSON (identity) {
    return {
      id: identity.id,
      publicKey: identity.publicKey,
      signatures: identity.signatures,
      type: identity.type
    }
  }
}

var identity = Identity$1;

class IdentityProvider$3 {
  /* Return id of identity (to be signed by orbit-db public key) */
  async getId (options) {}

  /* Return signature of OrbitDB public key signature */
  async signIdentity (data, options) {}

  /* Verify a signature of OrbitDB public key signature */
  static async verifyIdentity (identity) {}

  /* Return the type for this identity provider */
  static get type () {
    throw new Error(`'static get type ()' needs to be defined in the inheriting class`)
  }

  /*
    Return the type for this identity-procider
    NOTE! This is the only property of the interface that
    shouldn't be overridden in the inherited IdentityProvider
  */
  get type () {
    return this.constructor.type
  }
}

var identityProviderInterface = IdentityProvider$3;

const IdentityProvider$2 = identityProviderInterface;
const Keystore$1 = require$$1;
const type = 'orbitdb';

class OrbitDBIdentityProvider$1 extends IdentityProvider$2 {
  constructor (keystore) {
    super();
    if (!keystore) {
      throw new Error('OrbitDBIdentityProvider requires a keystore')
    }
    this._keystore = keystore;
  }

  // Returns the type of the identity provider
  static get type () { return type }

  async getId (options = {}) {
    const id = options.id;
    if (!id) {
      throw new Error('id is required')
    }

    const keystore = this._keystore;
    const key = await keystore.getKey(id) || await keystore.createKey(id);
    return key.public.marshal().toString('hex')
  }

  async signIdentity (data, options = {}) {
    const id = options.id;
    if (!id) {
      throw new Error('id is required')
    }
    const keystore = this._keystore;
    const key = await keystore.getKey(id);
    if (!key) {
      throw new Error(`Signing key for '${id}' not found`)
    }

    return keystore.sign(key, data)
  }

  static async verifyIdentity (identity) {
    // Verify that identity was signed by the ID
    return Keystore$1.verify(
      identity.signatures.publicKey,
      identity.id,
      identity.publicKey + identity.signatures.id
    )
  }
}

var orbitDbIdentityProvider$1 = OrbitDBIdentityProvider$1;

const Identity = identity;
const IdentityProvider$1 = identityProviderInterface;
const OrbitDBIdentityProvider = orbitDbIdentityProvider$1;
const Keystore = require$$1;

const LRU = require$$4;
const path = require$$5;

const defaultType = 'orbitdb';
const identityKeysPath = path.join('./orbitdb', 'identity', 'identitykeys');

const supportedTypes = {
  orbitdb: OrbitDBIdentityProvider
};

const getHandlerFor = (type) => {
  if (!Identities.isSupported(type)) {
    throw new Error(`IdentityProvider type '${type}' is not supported`)
  }
  return supportedTypes[type]
};

class Identities {
  constructor (options) {
    this._keystore = options.keystore;
    this._signingKeystore = options.signingKeystore || this._keystore;
    this._knownIdentities = options.cache || new LRU(options.cacheSize || 100);
  }

  static get IdentityProvider () { return IdentityProvider$1 }

  get keystore () { return this._keystore }

  get signingKeystore () { return this._signingKeystore }

  async sign (identity, data) {
    const signingKey = await this.keystore.getKey(identity.id);
    if (!signingKey) {
      throw new Error(`Private signing key not found from Keystore`)
    }
    const sig = await this.keystore.sign(signingKey, data);
    return sig
  }

  async verify (signature, publicKey, data, verifier = 'v1') {
    return this.keystore.verify(signature, publicKey, data, verifier)
  }

  async createIdentity (options = {}) {
    const keystore = options.keystore || this.keystore;
    const type = options.type || defaultType;
    const identityProvider = type === defaultType ? new OrbitDBIdentityProvider(options.signingKeystore || keystore) : new (getHandlerFor(type))(options);
    // создается запись-ключ где будут храниться данные в indexedDb
    const id = await identityProvider.getId(options);

    if (options.migrate) {
      await options.migrate({ targetStore: keystore._store, targetId: id });
    }
    const { publicKey, idSignature } = await this.signId(id);
    const pubKeyIdSignature = await identityProvider.signIdentity(publicKey + idSignature, options);
    return new Identity(id, publicKey, idSignature, pubKeyIdSignature, type, this)
  }

  async signId (id) {
    const keystore = this.keystore;
    // создается запись в ключе который был выше создан
    const key = await keystore.getKey(id) || await keystore.createKey(id);
    const publicKey = keystore.getPublic(key);
    const idSignature = await keystore.sign(key, id);
    return { publicKey, idSignature }
  }

  async verifyIdentity (identity) {
    if (!Identity.isIdentity(identity)) {
      return false
    }

    const knownID = this._knownIdentities.get(identity.signatures.id);
    if (knownID) {
      return identity.id === knownID.id &&
             identity.publicKey === knownID.publicKey &&
             identity.signatures.id === knownID.signatures.id &&
             identity.signatures.publicKey === knownID.signatures.publicKey
    }

    const verifyIdSig = await this.keystore.verify(
      identity.signatures.id,
      identity.publicKey,
      identity.id
    );
    if (!verifyIdSig) return false

    const IdentityProvider = getHandlerFor(identity.type);
    const verified = await IdentityProvider.verifyIdentity(identity);
    if (verified) {
      this._knownIdentities.set(identity.signatures.id, Identity.toJSON(identity));
    }

    return verified
  }

  static async verifyIdentity (identity) {
    if (!Identity.isIdentity(identity)) {
      return false
    }

    const verifyIdSig = await Keystore.verify(
      identity.signatures.id,
      identity.publicKey,
      identity.id
    );

    if (!verifyIdSig) return false

    const IdentityProvider = getHandlerFor(identity.type);
    return IdentityProvider.verifyIdentity(identity)
  }

  static async createIdentity (options = {}) {
    if (!options.keystore) {
      options.keystore = new Keystore(options.identityKeysPath || identityKeysPath);
    }
    if (!options.signingKeystore) {
      if (options.signingKeysPath) {
        options.signingKeystore = new Keystore(options.signingKeysPath);
      } else {
        options.signingKeystore = options.keystore;
      }
    }
    options = Object.assign({}, { type: defaultType }, options);
    const identities = new Identities(options);
    return identities.createIdentity(options)
  }

  static isSupported (type) {
    return Object.keys(supportedTypes).includes(type)
  }

  static addIdentityProvider (IdentityProvider) {
    if (!IdentityProvider) {
      throw new Error('IdentityProvider class needs to be given as an option')
    }

    if (!IdentityProvider.type ||
      typeof IdentityProvider.type !== 'string') {
      throw new Error('Given IdentityProvider class needs to implement: static get type() { /* return a string */}.')
    }

    supportedTypes[IdentityProvider.type] = IdentityProvider;
  }

  static removeIdentityProvider (type) {
    delete supportedTypes[type];
  }
}

var identities = Identities;

const IdentityProvider = identities;

var orbitDbIdentityProvider = IdentityProvider;

export { orbitDbIdentityProvider as default };
