var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var prr$1 = {exports: {}};

/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */

(function (module) {
	(function (name, context, definition) {
	  if (module.exports)
	    module.exports = definition();
	  else
	    context[name] = definition();
	})('prr', commonjsGlobal, function() {

	  var setProperty = typeof Object.defineProperty == 'function'
	      ? function (obj, key, options) {
	          Object.defineProperty(obj, key, options);
	          return obj
	        }
	      : function (obj, key, options) { // < es5
	          obj[key] = options.value;
	          return obj
	        }

	    , makeOptions = function (value, options) {
	        var oo = typeof options == 'object'
	          , os = !oo && typeof options == 'string'
	          , op = function (p) {
	              return oo
	                ? !!options[p]
	                : os
	                  ? options.indexOf(p[0]) > -1
	                  : false
	            };

	        return {
	            enumerable   : op('enumerable')
	          , configurable : op('configurable')
	          , writable     : op('writable')
	          , value        : value
	        }
	      }

	    , prr = function (obj, key, value, options) {
	        var k;

	        options = makeOptions(value, options);

	        if (typeof key == 'object') {
	          for (k in key) {
	            if (Object.hasOwnProperty.call(key, k)) {
	              options.value = key[k];
	              setProperty(obj, k, options);
	            }
	          }
	          return obj
	        }

	        return setProperty(obj, key, options)
	      };

	  return prr
	});
} (prr$1));

var prr = prr$1.exports;

export { prr as default };
