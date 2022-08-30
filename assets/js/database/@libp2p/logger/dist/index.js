import debug from '../../../debug/dist/index.js';
import { base58btc } from '../../../multiformats/dist/src/bases/base58.js';
import { base32 } from '../../../multiformats/dist/src/bases/base32.js';
import { base64 } from '../../../multiformats/dist/src/bases/base64.js';
// Add a formatter for converting to a base58 string
debug.formatters.b = (v) => {
    return v == null ? 'undefined' : base58btc.baseEncode(v);
};
// Add a formatter for converting to a base32 string
debug.formatters.t = (v) => {
    return v == null ? 'undefined' : base32.baseEncode(v);
};
// Add a formatter for converting to a base64 string
debug.formatters.m = (v) => {
    return v == null ? 'undefined' : base64.baseEncode(v);
};
// Add a formatter for stringifying peer ids
debug.formatters.p = (v) => {
    return v == null ? 'undefined' : v.toString();
};
// Add a formatter for stringifying CIDs
debug.formatters.c = (v) => {
    return v == null ? 'undefined' : v.toString();
};
// Add a formatter for stringifying Datastore keys
debug.formatters.k = (v) => {
    return v == null ? 'undefined' : v.toString();
};
export function logger(name) {
    return Object.assign(debug(name), {
        error: debug(`${name}:error`),
        trace: debug(`${name}:trace`)
    });
}
export function disable() {
    debug.disable();
}
export function enable(namespaces) {
    debug.enable(namespaces);
}
export function enabled(namespaces) {
    return debug.enabled(namespaces);
}
//# sourceMappingURL=index.js.map
