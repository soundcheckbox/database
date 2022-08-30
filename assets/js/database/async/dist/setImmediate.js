function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var setImmediate$3 = {exports: {}};

var setImmediate$2 = {};

/* istanbul ignore file */

Object.defineProperty(setImmediate$2, "__esModule", {
    value: true
});
setImmediate$2.fallback = fallback;
setImmediate$2.wrap = wrap;
var hasSetImmediate = setImmediate$2.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = setImmediate$2.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return (fn, ...args) => defer(() => fn(...args));
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

setImmediate$2.default = wrap(_defer);

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _setImmediate = setImmediate$2;

	var _setImmediate2 = _interopRequireDefault(_setImmediate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Calls `callback` on a later loop around the event loop. In Node.js this just
	 * calls `setImmediate`.  In the browser it will use `setImmediate` if
	 * available, otherwise `setTimeout(callback, 0)`, which means other higher
	 * priority events may precede the execution of `callback`.
	 *
	 * This is used internally for browser-compatibility purposes.
	 *
	 * @name setImmediate
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @see [async.nextTick]{@link module:Utils.nextTick}
	 * @category Util
	 * @param {Function} callback - The function to call on a later loop around
	 * the event loop. Invoked with (args...).
	 * @param {...*} args... - any number of additional arguments to pass to the
	 * callback on the next tick.
	 * @example
	 *
	 * var call_order = [];
	 * async.nextTick(function() {
	 *     call_order.push('two');
	 *     // call_order now equals ['one','two']
	 * });
	 * call_order.push('one');
	 *
	 * async.setImmediate(function (a, b, c) {
	 *     // a, b, and c equal 1, 2, and 3
	 * }, 1, 2, 3);
	 */
	exports.default = _setImmediate2.default;
	module.exports = exports['default'];
} (setImmediate$3, setImmediate$3.exports));

var setImmediate$1 = /*@__PURE__*/getDefaultExportFromCjs(setImmediate$3.exports);

export { setImmediate$1 as default };
