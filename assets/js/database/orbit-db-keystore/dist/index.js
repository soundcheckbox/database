import require$$0$2 from '../../level/dist/index.js';
import require$$0$1 from '../../libp2p-crypto/dist/index.js';
import require$$2 from '../../secp256k1/dist/index.js';
import require$$3 from '../../lru/dist/index.js';
import require$$1 from '../../safe-buffer/dist/index.js';
import require$$0 from '../../elliptic/dist/index.js';

const EC = require$$0.ec;
const ec = new EC('secp256k1');

var verifierv0 = {
  verify: async (signature, publicKey, data) => {
    if (!signature) {
      throw new Error('No signature given')
    }
    if (!publicKey) {
      throw new Error('Given publicKey was undefined')
    }
    if (!data) {
      throw new Error('Given input data was undefined')
    }
    let res = false;
    const key = ec.keyPair({
      pub: publicKey,
      pubEnc: 'hex'
    });
    try {
      res = ec.verify(data, signature, key);
    } catch (e) {
      // Catches 'Error: Signature without r or s'
    }
    return Promise.resolve(res)
  }
};

const crypto$1 = require$$0$1;
const Buffer$1 = require$$1.Buffer;

var verifierv1 = {
  verify: async (signature, publicKey, data) => {
    if (!signature) {
      throw new Error('No signature given')
    }
    if (!publicKey) {
      throw new Error('Given publicKey was undefined')
    }
    if (!data) {
      throw new Error('Given input data was undefined')
    }

    if (!Buffer$1.isBuffer(data)) {
      data = Buffer$1.from(data);
    }

    const isValid = (key, msg, sig) => new Promise((resolve, reject) => {
      key.verify(msg, sig, (err, valid) => {
        if (!err) {
          resolve(valid);
        }
        reject(valid);
      });
    });

    let res = false;
    try {
      const pubKey = crypto$1.keys.supportedKeys.secp256k1.unmarshalSecp256k1PublicKey(Buffer$1.from(publicKey, 'hex'));
      res = await isValid(pubKey, data, Buffer$1.from(signature, 'hex'));
    } catch (e) {
      // Catch error: sig length wrong
    }
    return Promise.resolve(res)
  }
};

const verifiers = {
  'v0': verifierv0,
  'v1': verifierv1
};

var verifiers_1 = {
  verifier: (v) => {
    return verifiers[v]
  }
};

const fs = (typeof window === 'object' || typeof self === 'object') ? null : eval('require("fs")'); // eslint-disable-line
const level = require$$0$2;
const crypto = require$$0$1;
const secp256k1 = require$$2;
const LRU = require$$3;
const Buffer = require$$1.Buffer;
const { verifier } = verifiers_1;

function createStore (path = './keystore') {
  if (fs && fs.mkdirSync) {
    fs.mkdirSync(path, { recursive: true });
  }
  return level(path)
}
const verifiedCache = new LRU(1000);

class Keystore {
  constructor (input = {}) {
    if (typeof input === 'string') {
      this._store = createStore(input);
    } else if (typeof input.open === 'function') {
      this._store = input;
    } else if (typeof input.store === 'string') {
      this._store = createStore(input.store);
    } else {
      this._store = input.store || createStore();
    }
    this._cache = input.cache || new LRU(100);
  }

  async open () {
    if (this._store) {
      await this._store.open();
      return Promise.resolve()
    }
    return Promise.reject(new Error('Keystore: No store found to open'))
  }

  async close () {
    if (!this._store) return
    await this._store.close();
  }

  async hasKey (id) {
    if (!id) {
      throw new Error('id needed to check a key')
    }
    if (this._store.status && this._store.status !== 'open') {
      return Promise.resolve(null)
    }

    let hasKey = false;
    try {
      let storedKey = this._cache.get(id) || await this._store.get(id);
      hasKey = storedKey !== undefined && storedKey !== null;
    } catch (e) {
      // Catches 'Error: ENOENT: no such file or directory, open <path>'
      console.error('Error: ENOENT: no such file or directory');
    }

    return hasKey
  }

  async createKey (id) {
    if (!id) {
      throw new Error('id needed to create a key')
    }
    if (this._store.status && this._store.status !== 'open') {
      return Promise.resolve(null)
    }

    const genKeyPair = () => new Promise((resolve, reject) => {
      crypto.keys.generateKeyPair('secp256k1', 256, (err, key) => {
        if (!err) {
          resolve(key);
        }
        reject(err);
      });
    });

    const keys = await genKeyPair();
    const decompressedKey = Buffer.from(secp256k1.publicKeyConvert(keys.public.marshal(), false));
    const key = {
      publicKey: decompressedKey.toString('hex'),
      privateKey: keys.marshal().toString('hex')
    };

    try {
      await this._store.put(id, JSON.stringify(key));
    } catch (e) {
      console.log(e);
    }
    this._cache.set(id, key);

    return keys
  }

  async getKey (id) {
    if (!id) {
      throw new Error('id needed to get a key')
    }
    if (!this._store) {
      await this.open();
    }
    if (this._store.status && this._store.status !== 'open') {
      return Promise.resolve(null)
    }

    const cachedKey = this._cache.get(id);
    let storedKey;
    try {
      storedKey = cachedKey || await this._store.get(id);
    } catch (e) {
      // ignore ENOENT error
    }

    if (!storedKey) {
      return
    }

    const deserializedKey = cachedKey || JSON.parse(storedKey);
    if (!deserializedKey) {
      return
    }

    if (!cachedKey) {
      this._cache.set(id, deserializedKey);
    }

    const genPrivKey = (pk) => new Promise((resolve, reject) => {
      crypto.keys.supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey(pk, (err, key) => {
        if (!err) {
          resolve(key);
        }
        reject(err);
      });
    });

    return genPrivKey(Buffer.from(deserializedKey.privateKey, 'hex'))
  }

  async sign (key, data) {
    if (!key) {
      throw new Error('No signing key given')
    }

    if (!data) {
      throw new Error('Given input data was undefined')
    }

    if (!Buffer.isBuffer(data)) {
      data = Buffer.from(data);
    }

    return new Promise((resolve, reject) => {
      key.sign(data, (err, signature) => {
        if (!err) {
          resolve(signature.toString('hex'));
        }
        reject(err);
      });
    })
  }

  getPublic (keys, options = {}) {
    const formats = ['hex', 'buffer'];
    const decompress = typeof options.decompress === 'undefined' ? true : options.decompress;
    const format = options.format || 'hex';
    if (formats.indexOf(format) === -1) {
      throw new Error('Supported formats are `hex` and `buffer`')
    }
    let pubKey = keys.public.marshal();
    if (decompress) {
      pubKey = Buffer.from(secp256k1.publicKeyConvert(pubKey, false));
    }
    return format === 'buffer' ? pubKey : pubKey.toString('hex')
  }

  async verify (signature, publicKey, data, v = 'v1') {
    return Keystore.verify(signature, publicKey, data, v)
  }

  static async verify (signature, publicKey, data, v = 'v1') {
    const cached = verifiedCache.get(signature);
    let res = false;
    if (!cached) {
      const verified = await verifier(v).verify(signature, publicKey, data);
      res = verified;
      if (verified) {
        verifiedCache.set(signature, { publicKey, data });
      }
    } else {
      const compare = (cached, data, v) => {
        let match;
        if (v === 'v0') {
          match = Buffer.compare(Buffer.alloc(30, cached), Buffer.alloc(30, data)) === 0;
        } else {
          match = Buffer.isBuffer(data) ? Buffer.compare(cached, data) === 0 : cached === data;
        }
        return match
      };
      res = cached.publicKey === publicKey && compare(cached.data, data, v);
    }
    return res
  }
}

var keystore = Keystore;

export { keystore as default };
