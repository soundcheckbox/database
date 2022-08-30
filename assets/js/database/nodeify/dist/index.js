import require$$0 from '../../promise/dist/index.js';
import require$$1 from '../../is-promise/dist/index.js';

var Promise$1 = require$$0;
var isPromise = require$$1;

var nextTick;
if (typeof setImmediate === 'function') nextTick = setImmediate;
else if (typeof process === 'object' && process && process.nextTick) nextTick = process.nextTick;
else nextTick = function (cb) { setTimeout(cb, 0); };

var nodeify_1 = nodeify;
function nodeify(promise, cb) {
  if (typeof cb !== 'function') return promise;
  return promise
    .then(function (res) {
      nextTick(function () {
        cb(null, res);
      });
    }, function (err) {
      nextTick(function () {
        cb(err);
      });
    });
}
function nodeifyThis(cb) {
  return nodeify(this, cb);
}

nodeify.extend = extend;
nodeify.Promise = NodeifyPromise;

function extend(prom) {
  if (prom && isPromise(prom)) {
    prom.nodeify = nodeifyThis;
    var then = prom.then;
    prom.then = function () {
      return extend(then.apply(this, arguments));
    };
    return prom;
  } else if (typeof prom === 'function') {
    prom.prototype.nodeify = nodeifyThis;
  } else {
    Promise$1.prototype.nodeify = nodeifyThis;
  }
}

function NodeifyPromise(fn) {
  if (!(this instanceof NodeifyPromise)) {
    return new NodeifyPromise(fn);
  }
  Promise$1.call(this, fn);
  extend(this);
}

NodeifyPromise.prototype = Object.create(Promise$1.prototype);
NodeifyPromise.prototype.constructor = NodeifyPromise;

export { nodeify_1 as default };
