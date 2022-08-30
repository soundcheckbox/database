import require$$0 from 'multihashing-async';
import require$$1 from 'cids';

const mh = require$$0;
const CID = require$$1;

/**
 * @param {Uint8Array} buffer
 * @param {import('../types').BlockAPI} block
 * @param {import('../types').PersistOptions} options
 */
const persist = async (buffer, block, options) => {
  if (!options.codec) {
    options.codec = 'dag-pb';
  }

  if (!options.cidVersion) {
    options.cidVersion = 0;
  }

  if (!options.hashAlg) {
    options.hashAlg = 'sha2-256';
  }

  if (options.hashAlg !== 'sha2-256') {
    options.cidVersion = 1;
  }

  const multihash = await mh(buffer, options.hashAlg);
  const cid = new CID(options.cidVersion, options.codec, multihash);

  if (!options.onlyHash) {
    // @ts-ignore block api takes uint8arrays or blocks but is missing from typedefs
    await block.put(buffer, {
      // @ts-ignore pin option is missing from block api typedefs
      pin: options.pin,
      preload: options.preload,
      timeout: options.timeout,
      cid
    });
  }

  return cid
};

var persist_1 = persist;

export { persist_1 as default };
