const isReactNative =
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative';

function getDefaultBase () {
  if (isReactNative) {
    return 'http://localhost'
  }
  // in some environments i.e. cloudflare workers location is not available
  if (!self.location) {
    return ''
  }

  return self.location.protocol + '//' + self.location.host
}

const URL = self.URL;
const defaultBase$1 = getDefaultBase();

class URLWithLegacySupport$2 {
  constructor (url = '', base = defaultBase$1) {
    this.super = new URL(url, base);
    this.path = this.pathname + this.search;
    this.auth =
            this.username && this.password
              ? this.username + ':' + this.password
              : null;

    this.query =
            this.search && this.search.startsWith('?')
              ? this.search.slice(1)
              : null;
  }

  get hash () {
    return this.super.hash
  }

  get host () {
    return this.super.host
  }

  get hostname () {
    return this.super.hostname
  }

  get href () {
    return this.super.href
  }

  get origin () {
    return this.super.origin
  }

  get password () {
    return this.super.password
  }

  get pathname () {
    return this.super.pathname
  }

  get port () {
    return this.super.port
  }

  get protocol () {
    return this.super.protocol
  }

  get search () {
    return this.super.search
  }

  get searchParams () {
    return this.super.searchParams
  }

  get username () {
    return this.super.username
  }

  set hash (hash) {
    this.super.hash = hash;
  }

  set host (host) {
    this.super.host = host;
  }

  set hostname (hostname) {
    this.super.hostname = hostname;
  }

  set href (href) {
    this.super.href = href;
  }

  set password (password) {
    this.super.password = password;
  }

  set pathname (pathname) {
    this.super.pathname = pathname;
  }

  set port (port) {
    this.super.port = port;
  }

  set protocol (protocol) {
    this.super.protocol = protocol;
  }

  set search (search) {
    this.super.search = search;
  }

  set username (username) {
    this.super.username = username;
  }

  /**
   * @param {any} o
   */
  static createObjectURL (o) {
    return URL.createObjectURL(o)
  }

  /**
   * @param {string} o
   */
  static revokeObjectURL (o) {
    URL.revokeObjectURL(o);
  }

  toJSON () {
    return this.super.toJSON()
  }

  toString () {
    return this.super.toString()
  }

  format () {
    return this.toString()
  }
}

/**
 * @param {string | import('url').UrlObject} obj
 */
function format$2 (obj) {
  if (typeof obj === 'string') {
    const url = new URL(obj);

    return url.toString()
  }

  if (!(obj instanceof URL)) {
    const userPass =
            // @ts-ignore its not supported in node but we normalise
            obj.username && obj.password
              // @ts-ignore its not supported in node but we normalise
              ? `${obj.username}:${obj.password}@`
              : '';
    const auth = obj.auth ? obj.auth + '@' : '';
    const port = obj.port ? ':' + obj.port : '';
    const protocol = obj.protocol ? obj.protocol + '//' : '';
    const host = obj.host || '';
    const hostname = obj.hostname || '';
    const search = obj.search || (obj.query ? '?' + obj.query : '');
    const hash = obj.hash || '';
    const pathname = obj.pathname || '';
    // @ts-ignore - path is not supported in node but we normalise
    const path = obj.path || pathname + search;

    return `${protocol}${userPass || auth}${
            host || hostname + port
        }${path}${hash}`
  }
}

var url = {
  URLWithLegacySupport: URLWithLegacySupport$2,
  URLSearchParams: self.URLSearchParams,
  defaultBase: defaultBase$1,
  format: format$2
};

const { URLWithLegacySupport: URLWithLegacySupport$1, format: format$1 } = url;

/**
 * @param {string | undefined} url
 * @param {any} [location]
 * @param {any} [protocolMap]
 * @param {any} [defaultProtocol]
 */
var relative$1 = (url, location = {}, protocolMap = {}, defaultProtocol) => {
  let protocol = location.protocol
    ? location.protocol.replace(':', '')
    : 'http';

  // Check protocol map
  protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ':';
  let urlParsed;

  try {
    urlParsed = new URLWithLegacySupport$1(url);
  } catch (err) {
    urlParsed = {};
  }

  const base = Object.assign({}, location, {
    protocol: protocol || urlParsed.protocol,
    host: location.host || urlParsed.host
  });

  return new URLWithLegacySupport$1(url, format$1(base)).toString()
};

const {
  URLWithLegacySupport,
  format,
  URLSearchParams,
  defaultBase
} = url;
const relative = relative$1;

var isoUrl = {
  URL: URLWithLegacySupport,
  URLSearchParams,
  format,
  relative,
  defaultBase
};

export { isoUrl as default };
