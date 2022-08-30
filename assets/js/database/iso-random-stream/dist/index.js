import require$$0 from '../../readable-stream/dist/readable.js';

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES = 65536;

/**
 * @param {number} size
 */
function randomBytes$1(size) {
  const bytes = new Uint8Array(size);
  let generated = 0;

  if (size > 0) {
    // getRandomValues fails on IE if size == 0
    if (size > MAX_BYTES) {
      while (generated < size) {
        if (generated + MAX_BYTES > size) {
          crypto.getRandomValues(
            bytes.subarray(generated, generated + (size - generated))
          );
          generated += size - generated;
        } else {
          crypto.getRandomValues(
            bytes.subarray(generated, generated + MAX_BYTES)
          );
          generated += MAX_BYTES;
        }
      }
    } else {
      crypto.getRandomValues(bytes);
    }
  }

  return bytes
}

var random_browser = randomBytes$1;

const { Readable } = require$$0;
const randomBytes = random_browser;

const randomStream = (size = Infinity) => {
  let currentSize = 0;

  return new Readable({
    read(readSize) {
      if (currentSize >= size) {
        return this.push(null)
      } else if (currentSize + readSize >= size) {
        readSize = size - currentSize;
      }
      currentSize += readSize;
      this.push(randomBytes(readSize));
    },
  })
};

var src = {
  randomStream,
  randomBytes,
};

export { src as default };
