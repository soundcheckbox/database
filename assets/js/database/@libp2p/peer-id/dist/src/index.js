import { CID } from 'multiformats/cid';
import { bases } from 'multiformats/basics';
import { base58btc } from 'multiformats/bases/base58';
import * as Digest from 'multiformats/hashes/digest';
import { identity } from 'multiformats/hashes/identity';
import { equals as uint8ArrayEquals } from 'uint8arrays/equals';
import { sha256 } from 'multiformats/hashes/sha2';
import errcode from 'err-code';
import { symbol } from '@libp2p/interface-peer-id';
const baseDecoder = Object
    .values(bases)
    .map(codec => codec.decoder)
    // @ts-expect-error https://github.com/multiformats/js-multiformats/issues/141
    .reduce((acc, curr) => acc.or(curr), bases.identity.decoder);
// these values are from https://github.com/multiformats/multicodec/blob/master/table.csv
const LIBP2P_KEY_CODE = 0x72;
const MARSHALLED_ED225519_PUBLIC_KEY_LENGTH = 36;
const MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH = 37;
class PeerIdImpl {
    constructor(init) {
        this.type = init.type;
        this.multihash = init.multihash;
        this.privateKey = init.privateKey;
        // mark string cache as non-enumerable
        Object.defineProperty(this, 'string', {
            enumerable: false,
            writable: true
        });
    }
    get [Symbol.toStringTag]() {
        return `PeerId(${this.toString()})`;
    }
    get [symbol]() {
        return true;
    }
    toString() {
        if (this.string == null) {
            this.string = base58btc.encode(this.multihash.bytes).slice(1);
        }
        return this.string;
    }
    // return self-describing String representation
    // in default format from RFC 0001: https://github.com/libp2p/specs/pull/209
    toCID() {
        return CID.createV1(LIBP2P_KEY_CODE, this.multihash);
    }
    toBytes() {
        return this.multihash.bytes;
    }
    /**
     * Returns Multiaddr as a JSON encoded object
     */
    toJSON() {
        return this.toString();
    }
    /**
     * Checks the equality of `this` peer against a given PeerId
     */
    equals(id) {
        if (id instanceof Uint8Array) {
            return uint8ArrayEquals(this.multihash.bytes, id);
        }
        else if (typeof id === 'string') {
            return peerIdFromString(id).equals(this);
        }
        else if (id?.multihash?.bytes != null) {
            return uint8ArrayEquals(this.multihash.bytes, id.multihash.bytes);
        }
        else {
            throw new Error('not valid Id');
        }
    }
}
class RSAPeerIdImpl extends PeerIdImpl {
    constructor(init) {
        super({ ...init, type: 'RSA' });
        this.type = 'RSA';
        this.publicKey = init.publicKey;
    }
}
class Ed25519PeerIdImpl extends PeerIdImpl {
    constructor(init) {
        super({ ...init, type: 'Ed25519' });
        this.type = 'Ed25519';
        this.publicKey = init.multihash.digest;
    }
}
class Secp256k1PeerIdImpl extends PeerIdImpl {
    constructor(init) {
        super({ ...init, type: 'secp256k1' });
        this.type = 'secp256k1';
        this.publicKey = init.multihash.digest;
    }
}
export function createPeerId(init) {
    return new PeerIdImpl(init);
}
export function peerIdFromPeerId(other) {
    if (other.type === 'RSA') {
        return new RSAPeerIdImpl(other);
    }
    if (other.type === 'Ed25519') {
        return new Ed25519PeerIdImpl(other);
    }
    if (other.type === 'secp256k1') {
        return new Secp256k1PeerIdImpl(other);
    }
    throw errcode(new Error('Not a PeerId'), 'ERR_INVALID_PARAMETERS');
}
export function peerIdFromString(str, decoder) {
    decoder = decoder ?? baseDecoder;
    if (str.charAt(0) === '1' || str.charAt(0) === 'Q') {
        // identity hash ed25519/secp256k1 key or sha2-256 hash of
        // rsa public key - base58btc encoded either way
        const multihash = Digest.decode(base58btc.decode(`z${str}`));
        if (str.startsWith('12D')) {
            return new Ed25519PeerIdImpl({ multihash });
        }
        else if (str.startsWith('16U')) {
            return new Secp256k1PeerIdImpl({ multihash });
        }
        else {
            return new RSAPeerIdImpl({ multihash });
        }
    }
    return peerIdFromBytes(baseDecoder.decode(str));
}
export function peerIdFromBytes(buf) {
    try {
        const multihash = Digest.decode(buf);
        if (multihash.code === identity.code) {
            if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
                return new Ed25519PeerIdImpl({ multihash });
            }
            else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
                return new Secp256k1PeerIdImpl({ multihash });
            }
        }
        if (multihash.code === sha256.code) {
            return new RSAPeerIdImpl({ multihash });
        }
    }
    catch {
        return peerIdFromCID(CID.decode(buf));
    }
    throw new Error('Supplied PeerID CID is invalid');
}
export function peerIdFromCID(cid) {
    if (cid == null || cid.multihash == null || cid.version == null || (cid.version === 1 && cid.code !== LIBP2P_KEY_CODE)) {
        throw new Error('Supplied PeerID CID is invalid');
    }
    const multihash = cid.multihash;
    if (multihash.code === sha256.code) {
        return new RSAPeerIdImpl({ multihash: cid.multihash });
    }
    else if (multihash.code === identity.code) {
        if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
            return new Ed25519PeerIdImpl({ multihash: cid.multihash });
        }
        else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
            return new Secp256k1PeerIdImpl({ multihash: cid.multihash });
        }
    }
    throw new Error('Supplied PeerID CID is invalid');
}
/**
 * @param publicKey - A marshalled public key
 * @param privateKey - A marshalled private key
 */
export async function peerIdFromKeys(publicKey, privateKey) {
    if (publicKey.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
        return new Ed25519PeerIdImpl({ multihash: Digest.create(identity.code, publicKey), privateKey });
    }
    if (publicKey.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
        return new Secp256k1PeerIdImpl({ multihash: Digest.create(identity.code, publicKey), privateKey });
    }
    return new RSAPeerIdImpl({ multihash: await sha256.digest(publicKey), publicKey, privateKey });
}
//# sourceMappingURL=index.js.map