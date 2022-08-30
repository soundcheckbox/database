import require$$1 from '../../get-intrinsic/dist/index.js';
import require$$0 from '../../function-bind/dist/index.js';

var callBind$1 = {exports: {}};

(function (module) {

	var bind = require$$0;
	var GetIntrinsic = require$$1;

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}
} (callBind$1));

var GetIntrinsic = require$$1;

var callBind = callBind$1.exports;

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

var callBound = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};
export {callBind, callBound}
export default callBind
