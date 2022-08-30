import require$$0 from 'cids';
import require$$1 from 'err-code';

const CID = require$$0;
const errCode = require$$1;

const IPFS_PREFIX = '/ipfs/';

/**
 * @param {string|Uint8Array|CID} string
 * @returns {{cid:CID, path?:string}}
 */
const toCidAndPath = (string) => {
  if (string instanceof Uint8Array) {
    try {
      string = new CID(string);
    } catch (err) {
      throw errCode(err, 'ERR_INVALID_CID')
    }
  }

  if (CID.isCID(string)) {
    return {
      cid: string,
      path: undefined
    }
  }

  if (string.startsWith(IPFS_PREFIX)) {
    string = string.substring(IPFS_PREFIX.length);
  }

  const parts = string.split('/');
  let cid;
  let path;

  try {
    cid = new CID(/** @type {string} */(parts.shift()));
  } catch (err) {
    throw errCode(err, 'ERR_INVALID_CID')
  }

  if (parts.length) {
    path = `/${parts.join('/')}`;
  }

  return {
    cid,
    path
  }
};

var toCidAndPath_1 = toCidAndPath;

export { toCidAndPath_1 as default };
