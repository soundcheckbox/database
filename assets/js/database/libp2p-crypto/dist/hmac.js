var indexBrowser = {};

var webcrypto$1 = {};

/* eslint-env browser */

// Check native crypto exists and is enabled (In insecure context `self.crypto`
// exists but `self.crypto.subtle` does not).
webcrypto$1.get = (win = self) => {
  const nativeCrypto = win.crypto || win.msCrypto;

  if (!nativeCrypto || !nativeCrypto.subtle) {
    throw Object.assign(
      new Error(
        'Missing Web Crypto API. ' +
        'The most likely cause of this error is that this page is being accessed ' +
        'from an insecure context (i.e. not HTTPS). For more information and ' +
        'possible resolutions see ' +
        'https://github.com/libp2p/js-libp2p-crypto/blob/master/README.md#web-crypto-api'
      ),
      { code: 'ERR_MISSING_WEB_CRYPTO' }
    )
  }

  return nativeCrypto
};

var lengths$1 = {
  SHA1: 20,
  SHA256: 32,
  SHA512: 64
};

const webcrypto = webcrypto$1;
const lengths = lengths$1;

const hashTypes = {
  SHA1: 'SHA-1',
  SHA256: 'SHA-256',
  SHA512: 'SHA-512'
};

const sign = async (key, data) => {
  const buf = await webcrypto.get().subtle.sign({ name: 'HMAC' }, key, data);
  return new Uint8Array(buf, buf.byteOffset, buf.byteLength)
};

var create = indexBrowser.create = async function (hashType, secret) {
  const hash = hashTypes[hashType];

  const key = await webcrypto.get().subtle.importKey(
    'raw',
    secret,
    {
      name: 'HMAC',
      hash: { name: hash }
    },
    false,
    ['sign']
  );

  return {
    async digest (data) { // eslint-disable-line require-await
      return sign(key, data)
    },
    length: lengths[hashType]
  }
};

export { create, indexBrowser as default };
