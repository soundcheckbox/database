import require$$0 from 'err-code';
import require$$1 from 'uint8arrays/from-string';
import require$$2 from 'browser-readablestream-to-it';
import require$$3 from 'blob-to-it';
import require$$4 from 'it-peekable';
import require$$5 from 'it-all';
import require$$6 from 'it-map';
import require$$5$1 from 'ipfs-unixfs';

const { Blob } = globalThis;

/**
 * @param {any} obj
 * @returns {obj is ArrayBufferView|ArrayBuffer}
 */
function isBytes$2 (obj) {
  return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer
}

/**
 * @param {any} obj
 * @returns {obj is Blob}
 */
function isBlob$2 (obj) {
  return typeof Blob !== 'undefined' && obj instanceof Blob
}

/**
 * An object with a path or content property
 *
 * @param {any} obj
 * @returns {obj is import('ipfs-core-types/src/utils').ImportCandidate}
 */
function isFileObject$1 (obj) {
  return typeof obj === 'object' && (obj.path || obj.content)
}

/**
 * @param {any} value
 * @returns {value is ReadableStream}
 */
const isReadableStream$2 = (value) =>
  value && typeof value.getReader === 'function';

var utils = {
  isBytes: isBytes$2,
  isBlob: isBlob$2,
  isFileObject: isFileObject$1,
  isReadableStream: isReadableStream$2
};

const errCode$1 = require$$0;
const uint8ArrayFromString = require$$1;
const browserStreamToIt$1 = require$$2;
const blobToIt = require$$3;
const itPeekable$1 = require$$4;
const all = require$$5;
const map$1 = require$$6;
const {
  isBytes: isBytes$1,
  isReadableStream: isReadableStream$1,
  isBlob: isBlob$1
} = utils;

/**
 * @param {import('./normalise-input').ToContent} input
 */
async function * toAsyncIterable (input) {
  // Bytes | String
  if (isBytes$1(input)) {
    yield toBytes(input);
    return
  }

  if (typeof input === 'string' || input instanceof String) {
    yield toBytes(input.toString());
    return
  }

  // Blob
  if (isBlob$1(input)) {
    yield * blobToIt(input);
    return
  }

  // Browser stream
  if (isReadableStream$1(input)) {
    input = browserStreamToIt$1(input);
  }

  // (Async)Iterator<?>
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    /** @type {any} peekable */
    const peekable = itPeekable$1(input);

    /** @type {any} value */
    const { value, done } = await peekable.peek();

    if (done) {
      // make sure empty iterators result in empty files
      yield * [];
      return
    }

    peekable.push(value);

    // (Async)Iterable<Number>
    if (Number.isInteger(value)) {
      yield Uint8Array.from((await all(peekable)));
      return
    }

    // (Async)Iterable<Bytes|String>
    if (isBytes$1(value) || typeof value === 'string' || value instanceof String) {
      yield * map$1(peekable, toBytes);
      return
    }
  }

  throw errCode$1(new Error(`Unexpected input: ${input}`), 'ERR_UNEXPECTED_INPUT')
}

/**
 * @param {ArrayBuffer | ArrayBufferView | string | InstanceType<typeof window.String> | number[]} chunk
 */
function toBytes (chunk) {
  if (chunk instanceof Uint8Array) {
    return chunk
  }

  if (ArrayBuffer.isView(chunk)) {
    return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)
  }

  if (chunk instanceof ArrayBuffer) {
    return new Uint8Array(chunk)
  }

  if (Array.isArray(chunk)) {
    return Uint8Array.from(chunk)
  }

  return uint8ArrayFromString(chunk.toString())
}

var normaliseContent$1 = toAsyncIterable;

const errCode = require$$0;
const browserStreamToIt = require$$2;
const itPeekable = require$$4;
const map = require$$6;
const {
  isBytes,
  isBlob,
  isReadableStream,
  isFileObject
} = utils;
const {
  parseMtime,
  parseMode
} = require$$5$1;

/**
 * @typedef {import('ipfs-core-types/src/utils').ToContent} ToContent
 * @typedef {import('ipfs-unixfs-importer').ImportCandidate} ImporterImportCandidate
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidate} ImportCandidate
 */

/**
 * @param {import('ipfs-core-types/src/utils').ImportCandidateStream} input
 * @param {(content:ToContent) => AsyncIterable<Uint8Array>} normaliseContent
 */
// eslint-disable-next-line complexity
var normaliseInput$1 = async function * normaliseInput (input, normaliseContent) {
  if (input === null || input === undefined) {
    return
  }

  // String
  if (typeof input === 'string' || input instanceof String) {
    yield toFileObject(input.toString(), normaliseContent);
    return
  }

  // Uint8Array|ArrayBuffer|TypedArray
  // Blob|File
  if (isBytes(input) || isBlob(input)) {
    yield toFileObject(input, normaliseContent);
    return
  }

  // Browser ReadableStream
  if (isReadableStream(input)) {
    input = browserStreamToIt(input);
  }

  // Iterable<?>
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    /** @type {any} peekable */
    const peekable = itPeekable(input);

    /** @type {any} value **/
    const { value, done } = await peekable.peek();

    if (done) {
      // make sure empty iterators result in empty files
      yield * [];
      return
    }

    peekable.push(value);

    // (Async)Iterable<Number>
    // (Async)Iterable<Bytes>
    if (Number.isInteger(value) || isBytes(value)) {
      yield toFileObject(peekable, normaliseContent);
      return
    }

    // (Async)Iterable<Blob>
    // (Async)Iterable<String>
    // (Async)Iterable<{ path, content }>
    if (isFileObject(value) || isBlob(value) || typeof value === 'string' || value instanceof String) {
      yield * map(peekable, (/** @type {ImportCandidate} */ value) => toFileObject(value, normaliseContent));
      return
    }

    // (Async)Iterable<(Async)Iterable<?>>
    // (Async)Iterable<ReadableStream<?>>
    // ReadableStream<(Async)Iterable<?>>
    // ReadableStream<ReadableStream<?>>
    if (value[Symbol.iterator] || value[Symbol.asyncIterator] || isReadableStream(value)) {
      yield * map(peekable, (/** @type {ImportCandidate} */ value) => toFileObject(value, normaliseContent));
      return
    }
  }

  // { path, content: ? }
  // Note: Detected _after_ (Async)Iterable<?> because Node.js streams have a
  // `path` property that passes this check.
  if (isFileObject(input)) {
    yield toFileObject(input, normaliseContent);
    return
  }

  throw errCode(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT')
};

/**
 * @param {ImportCandidate} input
 * @param {(content:ToContent) => AsyncIterable<Uint8Array>} normaliseContent
 */
async function toFileObject (input, normaliseContent) {
  // @ts-ignore - Those properties don't exist on most input types
  const { path, mode, mtime, content } = input;

  /** @type {ImporterImportCandidate} */
  const file = {
    path: path || '',
    mode: parseMode(mode),
    mtime: parseMtime(mtime)
  };

  if (content) {
    file.content = await normaliseContent(content);
  } else if (!path) { // Not already a file object with path or content prop
    // @ts-ignore - input still can be different ToContent
    file.content = await normaliseContent(input);
  }

  return file
}

const normaliseContent = normaliseContent$1;
const normaliseInput = normaliseInput$1;

/**
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidateStream} ImportCandidateStream
 * @typedef {import('ipfs-unixfs-importer').ImportCandidate} ImportCandidate
 */

/**
 * Transforms any of the `ipfs.add` input types into
 *
 * ```
 * AsyncIterable<{ path, mode, mtime, content: AsyncIterable<Uint8Array> }>
 * ```
 *
 * See https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
 *
 * @param {ImportCandidateStream} input
 * @returns {AsyncGenerator<ImportCandidate, void, undefined>}
 */
var normaliseInput_1 = (input) => normaliseInput(input, normaliseContent);

export { normaliseInput_1 as default };
