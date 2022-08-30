import require$$2 from '../../merge-options/dist/index.js';
import require$$3 from '../../iso-url/dist/index.js';
import require$$4 from '../../any-signal/dist/index.js';
import require$$0 from '../../native-fetch/dist/index.js';
var error = {};

class TimeoutError$2 extends Error {
  constructor (message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}
error.TimeoutError = TimeoutError$2;

class AbortError$1 extends Error {
  constructor (message = 'The operation was aborted.') {
    super(message);
    this.name = 'AbortError';
  }
}
error.AbortError = AbortError$1;

class HTTPError$1 extends Error {
  /**
   * @param {Response} response
   */
  constructor (response) {
    super(response.statusText);
    this.name = 'HTTPError';
    this.response = response;
  }
}
error.HTTPError = HTTPError$1;

var fetch$2 = {exports: {}};

(function (module) {

	/**
	 * @typedef {globalThis.Headers} Headers
	 * @typedef {globalThis.Request} Request
	 * @typedef {globalThis.Response} Response
	 */

	// use window.fetch if it is available, fall back to node-fetch if not
	module.exports = require$$0;
} (fetch$2));

const { TimeoutError: TimeoutError$1, AbortError } = error;
// @ts-expect-error
const { Response, Request: Request$1, Headers: Headers$1, default: fetch$1 } = fetch$2.exports;

/**
 * @typedef {import('../types').FetchOptions} FetchOptions
 * @typedef {import('../types').ProgressFn} ProgressFn
 */

/**
 * Fetch with progress
 *
 * @param {string | Request} url
 * @param {FetchOptions} [options]
 * @returns {Promise<ResponseWithURL>}
 */
const fetchWithProgress = (url, options = {}) => {
  const request = new XMLHttpRequest();
  request.open(options.method || 'GET', url.toString(), true);

  const { timeout, headers } = options;

  if (timeout && timeout > 0 && timeout < Infinity) {
    request.timeout = timeout;
  }

  if (options.overrideMimeType != null) {
    request.overrideMimeType(options.overrideMimeType);
  }

  if (headers) {
    for (const [name, value] of new Headers$1(headers)) {
      request.setRequestHeader(name, value);
    }
  }

  if (options.signal) {
    options.signal.onabort = () => request.abort();
  }

  if (options.onUploadProgress) {
    request.upload.onprogress = options.onUploadProgress;
  }

  // Note: Need to use `arraybuffer` here instead of `blob` because `Blob`
  // instances coming from JSDOM are not compatible with `Response` from
  // node-fetch (which is the setup we get when testing with jest because
  // it uses JSDOM which does not provide a global fetch
  // https://github.com/jsdom/jsdom/issues/1724)
  request.responseType = 'arraybuffer';

  return new Promise((resolve, reject) => {
    /**
     * @param {Event} event
     */
    const handleEvent = (event) => {
      switch (event.type) {
        case 'error': {
          resolve(Response.error());
          break
        }
        case 'load': {
          resolve(
            new ResponseWithURL(request.responseURL, request.response, {
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders())
            })
          );
          break
        }
        case 'timeout': {
          reject(new TimeoutError$1());
          break
        }
        case 'abort': {
          reject(new AbortError());
          break
        }
      }
    };
    request.onerror = handleEvent;
    request.onload = handleEvent;
    request.ontimeout = handleEvent;
    request.onabort = handleEvent;

    // @ts-expect-error options.body can be a node readable stream, which isn't compatible with XHR, but this
    // file is a browser override so you won't get a node readable stream so ignore the error
    request.send(options.body);
  })
};

const fetchWithStreaming = fetch$1;

/**
 * @param {string | Request} url
 * @param {FetchOptions} options
 */
const fetchWith = (url, options = {}) =>
  (options.onUploadProgress != null)
    ? fetchWithProgress(url, options)
    : fetchWithStreaming(url, options);

/**
 * Parse Headers from a XMLHttpRequest
 *
 * @param {string} input
 * @returns {Headers}
 */
const parseHeaders = (input) => {
  const headers = new Headers$1();
  for (const line of input.trim().split(/[\r\n]+/)) {
    const index = line.indexOf(': ');
    if (index > 0) {
      headers.set(line.slice(0, index), line.slice(index + 1));
    }
  }

  return headers
};

class ResponseWithURL extends Response {
  /**
   * @param {string} url
   * @param {BodyInit} body
   * @param {ResponseInit} options
   */
  constructor (url, body, options) {
    super(body, options);
    Object.defineProperty(this, 'url', { value: url });
  }
}

var fetch_1 = {
  fetch: fetchWith,
  Request: Request$1,
  Headers: Headers$1
};

/* eslint-disable no-undef */

const { fetch, Request, Headers } = fetch_1;
const { TimeoutError, HTTPError } = error;
const merge = require$$2.bind({ ignoreUndefined: true });
const { URL, URLSearchParams } = require$$3;
const anySignal = require$$4;

/**
 * @typedef {import('stream').Readable} NodeReadableStream
 * @typedef {import('./types').HTTPOptions} HTTPOptions
 * @typedef {import('./types').ExtendedResponse} ExtendedResponse
 */

/**
 * @template TResponse
 * @param {Promise<TResponse>} promise
 * @param {number | undefined} ms
 * @param {AbortController} abortController
 * @returns {Promise<TResponse>}
 */
const timeout = (promise, ms, abortController) => {
  if (ms === undefined) {
    return promise
  }

  const start = Date.now();

  const timedOut = () => {
    const time = Date.now() - start;

    return time >= ms
  };

  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      if (timedOut()) {
        reject(new TimeoutError());
        abortController.abort();
      }
    }, ms);

    /**
     * @param {(value: any) => void } next
     */
    const after = (next) => {
      /**
       * @param {any} res
       */
      const fn = (res) => {
        clearTimeout(timeoutID);

        if (timedOut()) {
          reject(new TimeoutError());
          return
        }

        next(res);
      };
      return fn
    };

    promise
      .then(after(resolve), after(reject));
  })
};

const defaults = {
  throwHttpErrors: true,
  credentials: 'same-origin'
};

class HTTP {
  /**
   *
   * @param {HTTPOptions} options
   */
  constructor (options = {}) {
    /** @type {HTTPOptions} */
    this.opts = merge(defaults, options);
  }

  /**
   * Fetch
   *
   * @param {string | Request} resource
   * @param {HTTPOptions} options
   * @returns {Promise<ExtendedResponse>}
   */
  async fetch (resource, options = {}) {
    /** @type {HTTPOptions} */
    const opts = merge(this.opts, options);
    // @ts-expect-error
    const headers = new Headers(opts.headers);

    // validate resource type
    // @ts-expect-error
    if (typeof resource !== 'string' && !(resource instanceof URL || resource instanceof Request)) {
      throw new TypeError('`resource` must be a string, URL, or Request')
    }

    const url = new URL(resource.toString(), opts.base);

    const {
      searchParams,
      transformSearchParams,
      json
    } = opts;

    if (searchParams) {
      if (typeof transformSearchParams === 'function') {
        // @ts-ignore
        url.search = transformSearchParams(new URLSearchParams(opts.searchParams));
      } else {
        // @ts-ignore
        url.search = new URLSearchParams(opts.searchParams);
      }
    }

    if (json) {
      opts.body = JSON.stringify(opts.json);
      headers.set('content-type', 'application/json');
    }

    const abortController = new AbortController();
    // @ts-ignore
    const signal = anySignal([abortController.signal, opts.signal]);

    /** @type {ExtendedResponse} */
    // @ts-expect-error additional fields are assigned below
    const response = await timeout(
      fetch(
        url.toString(),
        {
          ...opts,
          signal,
          // @ts-expect-error non-browser fetch implementations may take extra options
          timeout: undefined,
          headers
        }
      ),
      opts.timeout,
      abortController
    );

    if (!response.ok && opts.throwHttpErrors) {
      if (opts.handleError) {
        await opts.handleError(response);
      }
      throw new HTTPError(response)
    }

    response.iterator = async function * () {
      yield * fromStream(response.body);
    };

    response.ndjson = async function * () {
      for await (const chunk of ndjson(response.iterator())) {
        if (options.transform) {
          yield options.transform(chunk);
        } else {
          yield chunk;
        }
      }
    };

    return response
  }

  /**
   * @param {string | Request} resource
   * @param {HTTPOptions} options
   */
  post (resource, options = {}) {
    return this.fetch(resource, { ...options, method: 'POST' })
  }

  /**
   * @param {string | Request} resource
   * @param {HTTPOptions} options
   */
  get (resource, options = {}) {
    return this.fetch(resource, { ...options, method: 'GET' })
  }

  /**
   * @param {string | Request} resource
   * @param {HTTPOptions} options
   */
  put (resource, options = {}) {
    return this.fetch(resource, { ...options, method: 'PUT' })
  }

  /**
   * @param {string | Request} resource
   * @param {HTTPOptions} options
   */
  delete (resource, options = {}) {
    return this.fetch(resource, { ...options, method: 'DELETE' })
  }

  /**
   * @param {string | Request} resource
   * @param {HTTPOptions} options
   */
  options (resource, options = {}) {
    return this.fetch(resource, { ...options, method: 'OPTIONS' })
  }
}

/**
 * Parses NDJSON chunks from an iterator
 *
 * @param {AsyncIterable<Uint8Array>} source
 * @returns {AsyncIterable<any>}
 */
const ndjson = async function * (source) {
  const decoder = new TextDecoder();
  let buf = '';

  for await (const chunk of source) {
    buf += decoder.decode(chunk, { stream: true });
    const lines = buf.split(/\r?\n/);

    for (let i = 0; i < lines.length - 1; i++) {
      const l = lines[i].trim();
      if (l.length > 0) {
        yield JSON.parse(l);
      }
    }
    buf = lines[lines.length - 1];
  }
  buf += decoder.decode();
  buf = buf.trim();
  if (buf.length !== 0) {
    yield JSON.parse(buf);
  }
};

/**
 * Stream to AsyncIterable
 *
 * @template TChunk
 * @param {ReadableStream<TChunk> | NodeReadableStream | null} source
 * @returns {AsyncIterable<TChunk>}
 */
const fromStream = (source) => {
  // Workaround for https://github.com/node-fetch/node-fetch/issues/766
  if (isNodeReadableStream(source)) {
    const iter = source[Symbol.asyncIterator]();
    return {
      [Symbol.asyncIterator] () {
        return {
          next: iter.next.bind(iter),
          return (value) {
            source.destroy();
            if (typeof iter.return === 'function') {
              return iter.return()
            }
            return Promise.resolve({ done: true, value })
          }
        }
      }
    }
  }

  if (isWebReadableStream(source)) {
    const reader = source.getReader();
    return (async function * () {
      try {
        while (true) {
          // Read from the stream
          const { done, value } = await reader.read();
          // Exit if we're done
          if (done) return
          // Else yield the chunk
          if (value) {
            yield value;
          }
        }
      } finally {
        reader.releaseLock();
      }
    })()
  }

  if (isAsyncIterable(source)) {
    return source
  }

  throw new TypeError('Body can\'t be converted to AsyncIterable')
};

/**
 * Check if it's an AsyncIterable
 *
 * @template {unknown} TChunk
 * @template {any} Other
 * @param {Other|AsyncIterable<TChunk>} value
 * @returns {value is AsyncIterable<TChunk>}
 */
const isAsyncIterable = (value) => {
  return typeof value === 'object' &&
  value !== null &&
  typeof /** @type {any} */(value)[Symbol.asyncIterator] === 'function'
};

/**
 * Check for web readable stream
 *
 * @template {unknown} TChunk
 * @template {any} Other
 * @param {Other|ReadableStream<TChunk>} value
 * @returns {value is ReadableStream<TChunk>}
 */
const isWebReadableStream = (value) => {
  return value && typeof /** @type {any} */(value).getReader === 'function'
};

/**
 * @param {any} value
 * @returns {value is NodeReadableStream}
 */
const isNodeReadableStream = (value) =>
  Object.prototype.hasOwnProperty.call(value, 'readable') &&
  Object.prototype.hasOwnProperty.call(value, 'writable');

HTTP.HTTPError = HTTPError;
HTTP.TimeoutError = TimeoutError;
HTTP.streamToAsyncIterator = fromStream;

/**
 * @param {string | Request} resource
 * @param {HTTPOptions} [options]
 */
HTTP.post = (resource, options) => new HTTP(options).post(resource, options);

/**
 * @param {string | Request} resource
 * @param {HTTPOptions} [options]
 */
HTTP.get = (resource, options) => new HTTP(options).get(resource, options);

/**
 * @param {string | Request} resource
 * @param {HTTPOptions} [options]
 */
HTTP.put = (resource, options) => new HTTP(options).put(resource, options);

/**
 * @param {string | Request} resource
 * @param {HTTPOptions} [options]
 */
HTTP.delete = (resource, options) => new HTTP(options).delete(resource, options);

/**
 * @param {string | Request} resource
 * @param {HTTPOptions} [options]
 */
HTTP.options = (resource, options) => new HTTP(options).options(resource, options);

var http = HTTP;

export { http as default };
