import require$$0$1 from '../../bs58/dist/index.js';
import require$$1 from '../../multihashing-async/dist/index.js';
import require$$0 from '../../secp256k1/3.8.0/dist/index.js';
import require$$2 from '../../async/dist/setImmediate.js';

var crypto;
var hasRequiredCrypto;

function requireCrypto () {
	if (hasRequiredCrypto) return crypto;
	hasRequiredCrypto = 1;

	const secp256k1 = require$$0;
	const multihashing = require$$1;
	const setImmediate = require$$2;

	const HASH_ALGORITHM = 'sha2-256';

	crypto = (randomBytes) => {
	  const privateKeyLength = 32;

	  function generateKey (callback) {
	    const done = (err, res) => setImmediate(() => callback(err, res));

	    let privateKey;
	    do {
	      privateKey = randomBytes(32);
	    } while (!secp256k1.privateKeyVerify(privateKey))

	    done(null, privateKey);
	  }

	  function hashAndSign (key, msg, callback) {
	    const done = (err, res) => setImmediate(() => callback(err, res));

	    multihashing.digest(msg, HASH_ALGORITHM, (err, digest) => {
	      if (err) { return done(err) }
            console.log('secp256k1', secp256k1)
	      try {
	        const sig = secp256k1.sign(digest, key);
	        const sigDER = secp256k1.signatureExport(sig.signature);
	        return done(null, sigDER)
	      } catch (err) { done(err); }
	    });
	  }

	  function hashAndVerify (key, sig, msg, callback) {
	    const done = (err, res) => setImmediate(() => callback(err, res));

	    multihashing.digest(msg, HASH_ALGORITHM, (err, digest) => {
	      if (err) { return done(err) }
	      try {
	        sig = secp256k1.signatureImport(sig);
	        const valid = secp256k1.verify(digest, sig, key);
	        return done(null, valid)
	      } catch (err) { done(err); }
	    });
	  }

	  function compressPublicKey (key) {
	    if (!secp256k1.publicKeyVerify(key)) {
	      throw new Error('Invalid public key')
	    }
	    return secp256k1.publicKeyConvert(key, true)
	  }

	  function decompressPublicKey (key) {
	    return secp256k1.publicKeyConvert(key, false)
	  }

	  function validatePrivateKey (key) {
	    if (!secp256k1.privateKeyVerify(key)) {
	      throw new Error('Invalid private key')
	    }
	  }

	  function validatePublicKey (key) {
	    if (!secp256k1.publicKeyVerify(key)) {
	      throw new Error('Invalid public key')
	    }
	  }

	  function computePublicKey (privateKey) {
	    validatePrivateKey(privateKey);
	    return secp256k1.publicKeyCreate(privateKey)
	  }

	  return {
	    generateKey: generateKey,
	    privateKeyLength: privateKeyLength,
	    hashAndSign: hashAndSign,
	    hashAndVerify: hashAndVerify,
	    compressPublicKey: compressPublicKey,
	    decompressPublicKey: decompressPublicKey,
	    validatePrivateKey: validatePrivateKey,
	    validatePublicKey: validatePublicKey,
	    computePublicKey: computePublicKey
	  }
	};
	return crypto;
}

const bs58 = require$$0$1;
const multihashing = require$$1;

var src = (keysProtobuf, randomBytes, crypto) => {
  crypto = crypto || requireCrypto()(randomBytes);

  class Secp256k1PublicKey {
    constructor (key) {
      crypto.validatePublicKey(key);
      this._key = key;
    }

    verify (data, sig, callback) {
      ensure(callback);
      crypto.hashAndVerify(this._key, sig, data, callback);
    }

    marshal () {
      return crypto.compressPublicKey(this._key)
    }

    get bytes () {
      return keysProtobuf.PublicKey.encode({
        Type: keysProtobuf.KeyType.Secp256k1,
        Data: this.marshal()
      })
    }

    equals (key) {
      return this.bytes.equals(key.bytes)
    }

    hash (callback) {
      ensure(callback);
      multihashing(this.bytes, 'sha2-256', callback);
    }
  }

  class Secp256k1PrivateKey {
    constructor (key, publicKey) {
      this._key = key;
      this._publicKey = publicKey || crypto.computePublicKey(key);
      crypto.validatePrivateKey(this._key);
      crypto.validatePublicKey(this._publicKey);
    }

    sign (message, callback) {
      ensure(callback);
      crypto.hashAndSign(this._key, message, callback);
    }

    get public () {
      return new Secp256k1PublicKey(this._publicKey)
    }

    marshal () {
      return this._key
    }

    get bytes () {
      return keysProtobuf.PrivateKey.encode({
        Type: keysProtobuf.KeyType.Secp256k1,
        Data: this.marshal()
      })
    }

    equals (key) {
      return this.bytes.equals(key.bytes)
    }

    hash (callback) {
      ensure(callback);
      multihashing(this.bytes, 'sha2-256', callback);
    }

    /**
     * Gets the ID of the key.
     *
     * The key id is the base58 encoding of the SHA-256 multihash of its public key.
     * The public key is a protobuf encoding containing a type and the DER encoding
     * of the PKCS SubjectPublicKeyInfo.
     *
     * @param {function(Error, id)} callback
     * @returns {undefined}
     */
    id (callback) {
      this.public.hash((err, hash) => {
        if (err) {
          return callback(err)
        }
        callback(null, bs58.encode(hash));
      });
    }
  }

  function unmarshalSecp256k1PrivateKey (bytes, callback) {
    callback(null, new Secp256k1PrivateKey(bytes));
  }

  function unmarshalSecp256k1PublicKey (bytes) {
    return new Secp256k1PublicKey(bytes)
  }

  function generateKeyPair (_bits, callback) {
    if (callback === undefined && typeof _bits === 'function') {
      callback = _bits;
    }
    ensure(callback);

    crypto.generateKey((err, privateKeyBytes) => {
      if (err) { return callback(err) }

      let privkey;
      try {
        privkey = new Secp256k1PrivateKey(privateKeyBytes);
      } catch (err) { return callback(err) }

      callback(null, privkey);
    });
  }

  function ensure (callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback is required')
    }
  }

  return {
    Secp256k1PublicKey,
    Secp256k1PrivateKey,
    unmarshalSecp256k1PrivateKey,
    unmarshalSecp256k1PublicKey,
    generateKeyPair
  }
};

export { src as default };
