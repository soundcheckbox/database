import require$$0 from '../../get-intrinsic/dist/index.js';
import require$$0$1 from '../../has/dist/index.js';
import require$$0$2 from '../../es-to-primitive/dist/index.js'; // es-to-primitive/es5
import require$$1 from '../../call-bind/dist/callBound/index.js';
import require$$0$3 from '../../is-callable/dist/index.js';
import require$$1$1 from '../../call-bind/dist/index.js';
import require$$0$4 from '../../es-to-primitive/dist/index.js'; // es-to-primitive/es2015
import require$$1$3 from '../../object.assign/dist/index.js';
import require$$1$2 from '../../is-regex/dist/index.js';
import require$$1$4 from '../../object-inspect/dist/index.js';
import require$$1$5 from '../../object-keys/dist/index.js';
import require$$1$6 from '../../has-symbols/dist/index.js';
import require$$2 from '../../is-string/dist/index.js';
import require$$6 from '../../is-negative-zero/dist/index.js';
import require$$4 from '../../unbox-primitive/dist/index.js';
import require$$0$5 from '../../string.prototype.trimstart/dist/index.js';
import require$$1$7 from '../../string.prototype.trimend/dist/index.js';

var GetIntrinsic$8e = require$$0;

var has$O = require$$0$1;

var $assign = GetIntrinsic$8e('%Object%').assign;

var assign$7 = function assign(target, source) {
	if ($assign) {
		return $assign(target, source);
	}

	// eslint-disable-next-line no-restricted-syntax
	for (var key in source) {
		if (has$O(source, key)) {
			// eslint-disable-next-line no-param-reassign
			target[key] = source[key];
		}
	}
	return target;
};

var ToPrimitive$y = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.1

	module.exports = require$$0$2;
} (ToPrimitive$y));

var ToPrimitive$x = ToPrimitive$y.exports;

// http://262.ecma-international.org/5.1/#sec-9.3

var ToNumber$1j = function ToNumber(value) {
	var prim = ToPrimitive$x(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

// https://262.ecma-international.org/5.1/#sec-8

var Type$6N = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

var ToNumber$1i = ToNumber$1j;
var ToPrimitive$w = ToPrimitive$y.exports;
var Type$6M = Type$6N;

// https://262.ecma-international.org/5.1/#sec-11.9.3

var AbstractEqualityComparison$6 = function AbstractEqualityComparison(x, y) {
	var xType = Type$6M(x);
	var yType = Type$6M(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$1i(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$1i(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$1i(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$1i(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$w(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive$w(x), y);
	}
	return false;
};

var _isNaN = Number.isNaN || function isNaN(a) {
	return a !== a;
};

var $isNaN$W = Number.isNaN || function (a) { return a !== a; };

var _isFinite = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN$W(x) && x !== Infinity && x !== -Infinity; };

var isPrefixOf$a;
var hasRequiredIsPrefixOf;

function requireIsPrefixOf () {
	if (hasRequiredIsPrefixOf) return isPrefixOf$a;
	hasRequiredIsPrefixOf = 1;

	var $strSlice = require$$1('String.prototype.slice');

	isPrefixOf$a = function isPrefixOf(prefix, string) {
		if (prefix === string) {
			return true;
		}
		if (prefix.length > string.length) {
			return false;
		}
		return $strSlice(string, 0, prefix.length) === prefix;
	};
	return isPrefixOf$a;
}

var GetIntrinsic$8d = require$$0;

var $Number$l = GetIntrinsic$8d('%Number%');
var $TypeError$6C = GetIntrinsic$8d('%TypeError%');

var $isNaN$V = _isNaN;
var $isFinite$S = _isFinite;
var isPrefixOf$9 = requireIsPrefixOf();

var ToNumber$1h = ToNumber$1j;
var ToPrimitive$v = ToPrimitive$y.exports;
var Type$6L = Type$6N;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison$6 = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$6L(LeftFirst) !== 'Boolean') {
		throw new $TypeError$6C('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$v(x, $Number$l);
		py = ToPrimitive$v(y, $Number$l);
	} else {
		py = ToPrimitive$v(y, $Number$l);
		px = ToPrimitive$v(x, $Number$l);
	}
	var bothStrings = Type$6L(px) === 'String' && Type$6L(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$1h(px);
		var ny = ToNumber$1h(py);
		if ($isNaN$V(nx) || $isNaN$V(ny)) {
			return undefined;
		}
		if ($isFinite$S(nx) && $isFinite$S(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$9(py, px)) {
		return false;
	}
	if (isPrefixOf$9(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$6K = Type$6N;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison$6 = function StrictEqualityComparison(x, y) {
	var xType = Type$6K(x);
	var yType = Type$6K(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$8c = require$$0;

var $abs$6 = GetIntrinsic$8c('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$x = function abs(x) {
	return $abs$6(x);
};

var GetIntrinsic$8b = require$$0;

var $TypeError$6B = GetIntrinsic$8b('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

var CheckObjectCoercible$1 = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError$6B(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

// var modulo = require('./modulo');
var $floor$7 = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$1f = function floor(x) {
	// return x - modulo(x, 1);
	return $floor$7(x);
};

var HoursPerDay$7 = 24;
var MinutesPerHour$7 = 60;
var SecondsPerMinute$7 = 60;
var msPerSecond$l = 1e3;
var msPerMinute$e = msPerSecond$l * SecondsPerMinute$7;
var msPerHour$e = msPerMinute$e * MinutesPerHour$7;
var msPerDay$s = 86400000;

var timeConstants$s = {
	HoursPerDay: HoursPerDay$7,
	MinutesPerHour: MinutesPerHour$7,
	SecondsPerMinute: SecondsPerMinute$7,
	msPerSecond: msPerSecond$l,
	msPerMinute: msPerMinute$e,
	msPerHour: msPerHour$e,
	msPerDay: msPerDay$s
};

var floor$1e = floor$1f;

var msPerDay$r = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$r = function Day(t) {
	return floor$1e(t / msPerDay$r);
};

var floor$1d = floor$1f;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$k = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$1d((y - 1969) / 4) - floor$1d((y - 1901) / 100) + floor$1d((y - 1601) / 400);
};

var GetIntrinsic$8a = require$$0;

var $Date$j = GetIntrinsic$8a('%Date%');

var callBound$1z = require$$1;

var $getUTCFullYear$6 = callBound$1z('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$u = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear$6(new $Date$j(t));
};

var Day$q = Day$r;
var DayFromYear$j = DayFromYear$k;
var YearFromTime$t = YearFromTime$u;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$k = function DayWithinYear(t) {
	return Day$q(t) - DayFromYear$j(YearFromTime$t(t));
};

var $floor$6 = Math.floor;

var mod$7 = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor$6(remain >= 0 ? remain : remain + modulo);
};

var mod$6 = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$1g = function modulo(x, y) {
	return mod$6(x, y);
};

var modulo$1f = modulo$1g;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$d = function DaysInYear(y) {
	if (modulo$1f(y, 4) !== 0) {
		return 365;
	}
	if (modulo$1f(y, 100) !== 0) {
		return 366;
	}
	if (modulo$1f(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$89 = require$$0;

var $EvalError$d = GetIntrinsic$89('%EvalError%');

var DaysInYear$c = DaysInYear$d;
var YearFromTime$s = YearFromTime$u;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$k = function InLeapYear(t) {
	var days = DaysInYear$c(YearFromTime$s(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$d('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$j = DayWithinYear$k;
var InLeapYear$j = InLeapYear$k;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$n = function MonthFromTime(t) {
	var day = DayWithinYear$j(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$j(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$88 = require$$0;

var $EvalError$c = GetIntrinsic$88('%EvalError%');

var DayWithinYear$i = DayWithinYear$k;
var InLeapYear$i = InLeapYear$k;
var MonthFromTime$m = MonthFromTime$n;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$g = function DateFromTime(t) {
	var m = MonthFromTime$m(t);
	var d = DayWithinYear$i(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear$i(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$c('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var GetIntrinsic$87 = require$$0;

var $TypeError$6A = GetIntrinsic$87('%TypeError%');
var $SyntaxError$u = GetIntrinsic$87('%SyntaxError%');

var has$N = require$$0$1;

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has$N(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has$N(Desc, '[[Value]]');
		var IsAccessor = has$N(Desc, '[[Get]]') || has$N(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError$6A('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

var assertRecord$y = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError$u('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError$6A(argumentName + ' must be a ' + recordType);
	}
};

var has$M = require$$0$1;

var Type$6J = Type$6N;

var assertRecord$x = assertRecord$y;

// https://262.ecma-international.org/5.1/#sec-8.10.2

var IsDataDescriptor$12 = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$x(Type$6J, 'Property Descriptor', 'Desc', Desc);

	if (!has$M(Desc, '[[Value]]') && !has$M(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var has$L = require$$0$1;

var Type$6I = Type$6N;

var assertRecord$w = assertRecord$y;

// https://262.ecma-international.org/5.1/#sec-8.10.1

var IsAccessorDescriptor$M = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$w(Type$6I, 'Property Descriptor', 'Desc', Desc);

	if (!has$L(Desc, '[[Get]]') && !has$L(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$86 = require$$0;

var $TypeError$6z = GetIntrinsic$86('%TypeError%');

var Type$6H = Type$6N;
var IsDataDescriptor$11 = IsDataDescriptor$12;
var IsAccessorDescriptor$L = IsAccessorDescriptor$M;

var assertRecord$v = assertRecord$y;

// https://262.ecma-international.org/5.1/#sec-8.10.4

var FromPropertyDescriptor$u = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$v(Type$6H, 'Property Descriptor', 'Desc', Desc);

	if (IsDataDescriptor$11(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor$L(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else {
		throw new $TypeError$6z('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
	}
};

var floor$1c = floor$1f;
var modulo$1e = modulo$1g;

var timeConstants$r = timeConstants$s;
var msPerHour$d = timeConstants$r.msPerHour;
var HoursPerDay$6 = timeConstants$r.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$9 = function HourFromTime(t) {
	return modulo$1e(floor$1c(t / msPerHour$d), HoursPerDay$6);
};

var IsCallable$J = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$J));

var IsAccessorDescriptor$K = IsAccessorDescriptor$M;
var IsDataDescriptor$10 = IsDataDescriptor$12;
var Type$6G = Type$6N;

var assertRecord$u = assertRecord$y;

// https://262.ecma-international.org/5.1/#sec-8.10.3

var IsGenericDescriptor$i = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$u(Type$6G, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$K(Desc) && !IsDataDescriptor$10(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$85 = require$$0;

var has$K = require$$0$1;
var $TypeError$6y = GetIntrinsic$85('%TypeError%');

var isPropertyDescriptor$s = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has$K(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError$6y('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

// TODO, semver-major: delete this

var isPropertyDescriptor$r = isPropertyDescriptor$s;

var Type$6F = Type$6N;
var IsDataDescriptor$$ = IsDataDescriptor$12;
var IsAccessorDescriptor$J = IsAccessorDescriptor$M;

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

var IsPropertyDescriptor$3 = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor$r({
		IsDataDescriptor: IsDataDescriptor$$,
		IsAccessorDescriptor: IsAccessorDescriptor$J,
		Type: Type$6F
	}, Desc);
};

var $isFinite$R = _isFinite;
var msPerDay$q = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate$6 = function MakeDate(day, time) {
	if (!$isFinite$R(day) || !$isFinite$R(time)) {
		return NaN;
	}
	return (day * msPerDay$q) + time;
};

var sign = function sign(number) {
	return number >= 0 ? 1 : -1;
};

var abs$w = abs$x;
var floor$1b = floor$1f;
var ToNumber$1g = ToNumber$1j;

var $isNaN$U = _isNaN;
var $isFinite$Q = _isFinite;
var $sign$d = sign;

// http://262.ecma-international.org/5.1/#sec-9.4

var ToInteger$u = function ToInteger(value) {
	var number = ToNumber$1g(value);
	if ($isNaN$U(number)) { return 0; }
	if (number === 0 || !$isFinite$Q(number)) { return number; }
	return $sign$d(number) * floor$1b(abs$w(number));
};

var GetIntrinsic$84 = require$$0;

var $DateUTC$6 = GetIntrinsic$84('%Date.UTC%');

var $isFinite$P = _isFinite;

var DateFromTime$f = DateFromTime$g;
var Day$p = Day$r;
var floor$1a = floor$1f;
var modulo$1d = modulo$1g;
var MonthFromTime$l = MonthFromTime$n;
var ToInteger$t = ToInteger$u;
var YearFromTime$r = YearFromTime$u;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay$6 = function MakeDay(year, month, date) {
	if (!$isFinite$P(year) || !$isFinite$P(month) || !$isFinite$P(date)) {
		return NaN;
	}
	var y = ToInteger$t(year);
	var m = ToInteger$t(month);
	var dt = ToInteger$t(date);
	var ym = y + floor$1a(m / 12);
	var mn = modulo$1d(m, 12);
	var t = $DateUTC$6(ym, mn, 1);
	if (YearFromTime$r(t) !== ym || MonthFromTime$l(t) !== mn || DateFromTime$f(t) !== 1) {
		return NaN;
	}
	return Day$p(t) + dt - 1;
};

var $isFinite$O = _isFinite;
var timeConstants$q = timeConstants$s;
var msPerSecond$k = timeConstants$q.msPerSecond;
var msPerMinute$d = timeConstants$q.msPerMinute;
var msPerHour$c = timeConstants$q.msPerHour;

var ToInteger$s = ToInteger$u;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime$6 = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$O(hour) || !$isFinite$O(min) || !$isFinite$O(sec) || !$isFinite$O(ms)) {
		return NaN;
	}
	var h = ToInteger$s(hour);
	var m = ToInteger$s(min);
	var s = ToInteger$s(sec);
	var milli = ToInteger$s(ms);
	var t = (h * msPerHour$c) + (m * msPerMinute$d) + (s * msPerSecond$k) + milli;
	return t;
};

var floor$19 = floor$1f;
var modulo$1c = modulo$1g;

var timeConstants$p = timeConstants$s;
var msPerMinute$c = timeConstants$p.msPerMinute;
var MinutesPerHour$6 = timeConstants$p.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$9 = function MinFromTime(t) {
	return modulo$1c(floor$19(t / msPerMinute$c), MinutesPerHour$6);
};

var modulo$1b = modulo$1g;

var msPerSecond$j = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime$6 = function msFromTime(t) {
	return modulo$1b(t, msPerSecond$j);
};

var $isNaN$T = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$V = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$T(x) && $isNaN$T(y);
};

var floor$18 = floor$1f;
var modulo$1a = modulo$1g;

var timeConstants$o = timeConstants$s;
var msPerSecond$i = timeConstants$o.msPerSecond;
var SecondsPerMinute$6 = timeConstants$o.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$9 = function SecFromTime(t) {
	return modulo$1a(floor$18(t / msPerSecond$i), SecondsPerMinute$6);
};

var GetIntrinsic$83 = require$$0;

var $Date$i = GetIntrinsic$83('%Date%');
var $Number$k = GetIntrinsic$83('%Number%');

var $isFinite$N = _isFinite;

var abs$v = abs$x;
var ToNumber$1f = ToNumber$1j;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip$6 = function TimeClip(time) {
	if (!$isFinite$N(time) || abs$v(time) > 8.64e15) {
		return NaN;
	}
	return $Number$k(new $Date$i(ToNumber$1f(time)));
};

var msPerDay$p = timeConstants$s.msPerDay;

var DayFromYear$i = DayFromYear$k;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear$6 = function TimeFromYear(y) {
	return msPerDay$p * DayFromYear$i(y);
};

var modulo$19 = modulo$1g;

var msPerDay$o = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay$6 = function TimeWithinDay(t) {
	return modulo$19(t, msPerDay$o);
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$B = function ToBoolean(value) { return !!value; };

var ToNumber$1e = ToNumber$1j;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$b = function ToInt32(x) {
	return ToNumber$1e(x) >> 0;
};

var GetIntrinsic$82 = require$$0;

var $Object$i = GetIntrinsic$82('%Object%');

var CheckObjectCoercible = CheckObjectCoercible$1;

// http://262.ecma-international.org/5.1/#sec-9.9

var ToObject$j = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object$i(value);
};

var has$J = require$$0$1;

var GetIntrinsic$81 = require$$0;

var $TypeError$6x = GetIntrinsic$81('%TypeError%');

var Type$6E = Type$6N;
var ToBoolean$A = ToBoolean$B;
var IsCallable$I = IsCallable$J.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$A = function ToPropertyDescriptor(Obj) {
	if (Type$6E(Obj) !== 'Object') {
		throw new $TypeError$6x('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$J(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$A(Obj.enumerable);
	}
	if (has$J(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$A(Obj.configurable);
	}
	if (has$J(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$J(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$A(Obj.writable);
	}
	if (has$J(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$I(getter)) {
			throw new $TypeError$6x('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$J(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$I(setter)) {
			throw new $TypeError$6x('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$J(desc, '[[Get]]') || has$J(desc, '[[Set]]')) && (has$J(desc, '[[Value]]') || has$J(desc, '[[Writable]]'))) {
		throw new $TypeError$6x('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var GetIntrinsic$80 = require$$0;

var $String$g = GetIntrinsic$80('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

var ToString$O = function ToString(value) {
	return $String$g(value);
};

var abs$u = abs$x;
var floor$17 = floor$1f;
var modulo$18 = modulo$1g;
var ToNumber$1d = ToNumber$1j;

var $isNaN$S = _isNaN;
var $isFinite$M = _isFinite;
var $sign$c = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$c = function ToUint16(value) {
	var number = ToNumber$1d(value);
	if ($isNaN$S(number) || number === 0 || !$isFinite$M(number)) { return 0; }
	var posInt = $sign$c(number) * floor$17(abs$u(number));
	return modulo$18(posInt, 0x10000);
};

var ToNumber$1c = ToNumber$1j;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$g = function ToUint32(x) {
	return ToNumber$1c(x) >>> 0;
};

var Day$o = Day$r;
var modulo$17 = modulo$1g;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$9 = function WeekDay(t) {
	return modulo$17(Day$o(t) + 4, 7);
};

/* eslint global-require: 0 */

// https://es5.github.io/#x9
var es5 = {
	'Abstract Equality Comparison': AbstractEqualityComparison$6,
	'Abstract Relational Comparison': AbstractRelationalComparison$6,
	'Strict Equality Comparison': StrictEqualityComparison$6,
	abs: abs$x,
	CheckObjectCoercible: CheckObjectCoercible$1,
	DateFromTime: DateFromTime$g,
	Day: Day$r,
	DayFromYear: DayFromYear$k,
	DaysInYear: DaysInYear$d,
	DayWithinYear: DayWithinYear$k,
	floor: floor$1f,
	FromPropertyDescriptor: FromPropertyDescriptor$u,
	HourFromTime: HourFromTime$9,
	InLeapYear: InLeapYear$k,
	IsAccessorDescriptor: IsAccessorDescriptor$M,
	IsCallable: IsCallable$J.exports,
	IsDataDescriptor: IsDataDescriptor$12,
	IsGenericDescriptor: IsGenericDescriptor$i,
	IsPropertyDescriptor: IsPropertyDescriptor$3,
	MakeDate: MakeDate$6,
	MakeDay: MakeDay$6,
	MakeTime: MakeTime$6,
	MinFromTime: MinFromTime$9,
	modulo: modulo$1g,
	MonthFromTime: MonthFromTime$n,
	msFromTime: msFromTime$6,
	SameValue: SameValue$V,
	SecFromTime: SecFromTime$9,
	TimeClip: TimeClip$6,
	TimeFromYear: TimeFromYear$6,
	TimeWithinDay: TimeWithinDay$6,
	ToBoolean: ToBoolean$B,
	ToInt32: ToInt32$b,
	ToInteger: ToInteger$u,
	ToNumber: ToNumber$1j,
	ToObject: ToObject$j,
	ToPrimitive: ToPrimitive$y.exports,
	ToPropertyDescriptor: ToPropertyDescriptor$A,
	ToString: ToString$O,
	ToUint16: ToUint16$c,
	ToUint32: ToUint32$g,
	Type: Type$6N,
	WeekDay: WeekDay$9,
	YearFromTime: YearFromTime$u
};

var regexTester$c;
var hasRequiredRegexTester;

function requireRegexTester () {
	if (hasRequiredRegexTester) return regexTester$c;
	hasRequiredRegexTester = 1;

	var GetIntrinsic = require$$0;

	var $test = GetIntrinsic('RegExp.prototype.test');

	var callBind = require$$1$1;

	regexTester$c = function regexTester(regex) {
		return callBind($test, regex);
	};
	return regexTester$c;
}

var isPrimitive$d;
var hasRequiredIsPrimitive;

function requireIsPrimitive () {
	if (hasRequiredIsPrimitive) return isPrimitive$d;
	hasRequiredIsPrimitive = 1;

	isPrimitive$d = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};
	return isPrimitive$d;
}

var toPrimitive$5 = require$$0$4;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$u = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive$5(input, arguments[1]);
	}
	return toPrimitive$5(input);
};

var GetIntrinsic$7$ = require$$0;

var $TypeError$6w = GetIntrinsic$7$('%TypeError%');
var $Number$j = GetIntrinsic$7$('%Number%');
var $RegExp$b = GetIntrinsic$7$('%RegExp%');
var $parseInteger$5 = GetIntrinsic$7$('%parseInt%');

var callBound$1y = require$$1;
var regexTester$b = requireRegexTester();
var isPrimitive$c = requireIsPrimitive();

var $strSlice$h = callBound$1y('String.prototype.slice');
var isBinary$5 = regexTester$b(/^0b[01]+$/i);
var isOctal$5 = regexTester$b(/^0o[0-7]+$/i);
var isInvalidHexLiteral$5 = regexTester$b(/^[-+]0x[0-9a-f]+$/i);
var nonWS$5 = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex$5 = new $RegExp$b('[' + nonWS$5 + ']', 'g');
var hasNonWS$5 = regexTester$b(nonWSregex$5);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws$5 = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex$5 = new RegExp('(^[' + ws$5 + ']+)|([' + ws$5 + ']+$)', 'g');
var $replace$b = callBound$1y('String.prototype.replace');
var $trim$5 = function (value) {
	return $replace$b(value, trimRegex$5, '');
};

var ToPrimitive$t = ToPrimitive$u;

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber$1b = function ToNumber(argument) {
	var value = isPrimitive$c(argument) ? argument : ToPrimitive$t(argument, $Number$j);
	if (typeof value === 'symbol') {
		throw new $TypeError$6w('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary$5(value)) {
			return ToNumber($parseInteger$5($strSlice$h(value, 2), 2));
		} else if (isOctal$5(value)) {
			return ToNumber($parseInteger$5($strSlice$h(value, 2), 8));
		} else if (hasNonWS$5(value) || isInvalidHexLiteral$5(value)) {
			return NaN;
		} else {
			var trimmed = $trim$5(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number$j(value);
};

var ES5Type$5 = Type$6N;

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

var Type$6D = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type$5(x);
};

var ToNumber$1a = ToNumber$1b;
var ToPrimitive$s = ToPrimitive$u;
var Type$6C = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison$5 = function AbstractEqualityComparison(x, y) {
	var xType = Type$6C(x);
	var yType = Type$6C(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$1a(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$1a(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$1a(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$1a(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$s(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive$s(x), y);
	}
	return false;
};

var GetIntrinsic$7_ = require$$0;

var $Number$i = GetIntrinsic$7_('%Number%');
var $TypeError$6v = GetIntrinsic$7_('%TypeError%');

var $isNaN$R = _isNaN;
var $isFinite$L = _isFinite;
var isPrefixOf$8 = requireIsPrefixOf();

var ToNumber$19 = ToNumber$1b;
var ToPrimitive$r = ToPrimitive$u;
var Type$6B = Type$6D;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison$5 = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$6B(LeftFirst) !== 'Boolean') {
		throw new $TypeError$6v('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$r(x, $Number$i);
		py = ToPrimitive$r(y, $Number$i);
	} else {
		py = ToPrimitive$r(y, $Number$i);
		px = ToPrimitive$r(x, $Number$i);
	}
	var bothStrings = Type$6B(px) === 'String' && Type$6B(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$19(px);
		var ny = ToNumber$19(py);
		if ($isNaN$R(nx) || $isNaN$R(ny)) {
			return undefined;
		}
		if ($isFinite$L(nx) && $isFinite$L(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$8(py, px)) {
		return false;
	}
	if (isPrefixOf$8(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$6A = Type$6D;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison$5 = function StrictEqualityComparison(x, y) {
	var xType = Type$6A(x);
	var yType = Type$6A(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$7Z = require$$0;

var $abs$5 = GetIntrinsic$7Z('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$t = function abs(x) {
	return $abs$5(x);
};

// var modulo = require('./modulo');
var $floor$5 = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$16 = function floor(x) {
	// return x - modulo(x, 1);
	return $floor$5(x);
};

var abs$s = abs$t;
var floor$15 = floor$16;

var $isNaN$Q = _isNaN;
var $isFinite$K = _isFinite;

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger$L = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN$Q(argument) || !$isFinite$K(argument)) {
		return false;
	}
	var absValue = abs$s(argument);
	return floor$15(absValue) === absValue;
};

var GetIntrinsic$7Y = require$$0;

var $Math = GetIntrinsic$7Y('%Math%');
var $Number$h = GetIntrinsic$7Y('%Number%');

var maxSafeInteger = $Number$h.MAX_SAFE_INTEGER || $Math.pow(2, 53) - 1;

var isLeadingSurrogate$d = function isLeadingSurrogate(charCode) {
	return typeof charCode === 'number' && charCode >= 0xD800 && charCode <= 0xDBFF;
};

var isTrailingSurrogate$d = function isTrailingSurrogate(charCode) {
	return typeof charCode === 'number' && charCode >= 0xDC00 && charCode <= 0xDFFF;
};

var GetIntrinsic$7X = require$$0;

var IsInteger$K = IsInteger$L;
var Type$6z = Type$6D;

var MAX_SAFE_INTEGER$d = maxSafeInteger;
var isLeadingSurrogate$c = isLeadingSurrogate$d;
var isTrailingSurrogate$c = isTrailingSurrogate$d;

var $TypeError$6u = GetIntrinsic$7X('%TypeError%');

var $charCodeAt$e = require$$1('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex$c = function AdvanceStringIndex(S, index, unicode) {
	if (Type$6z(S) !== 'String') {
		throw new $TypeError$6u('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$K(index) || index < 0 || index > MAX_SAFE_INTEGER$d) {
		throw new $TypeError$6u('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$6z(unicode) !== 'Boolean') {
		throw new $TypeError$6u('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt$e(S, index);
	if (!isLeadingSurrogate$c(first)) {
		return index + 1;
	}

	var second = $charCodeAt$e(S, index + 1);
	if (!isTrailingSurrogate$c(second)) {
		return index + 1;
	}

	return index + 2;
};

var GetIntrinsic$7W = require$$0;

var $ArrayPrototype$5 = GetIntrinsic$7W('%Array.prototype%');
var $RangeError$j = GetIntrinsic$7W('%RangeError%');
var $SyntaxError$t = GetIntrinsic$7W('%SyntaxError%');
var $TypeError$6t = GetIntrinsic$7W('%TypeError%');

var IsInteger$J = IsInteger$L;

var MAX_ARRAY_LENGTH$5 = Math.pow(2, 32) - 1;

var $setProto$a = GetIntrinsic$7W('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype$5
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate$5 = function ArrayCreate(length) {
	if (!IsInteger$J(length) || length < 0) {
		throw new $TypeError$6t('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH$5) {
		throw new $RangeError$j('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype$5;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype$5) { // step 8
		if (!$setProto$a) {
			throw new $SyntaxError$t('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto$a(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var GetIntrinsic$7V = require$$0;

var $Array$b = GetIntrinsic$7V('%Array%');

// eslint-disable-next-line global-require
var toStr$5 = !$Array$b.isArray && require$$1('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray$18 = $Array$b.isArray || function IsArray(argument) {
	return toStr$5(argument) === '[object Array]';
};

var has$I = require$$0$1;

var assertRecord$t = assertRecord$y;

var Type$6y = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor$I = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$t(Type$6y, 'Property Descriptor', 'Desc', Desc);

	if (!has$I(Desc, '[[Get]]') && !has$I(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var has$H = require$$0$1;

var assertRecord$s = assertRecord$y;

var Type$6x = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor$_ = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$s(Type$6x, 'Property Descriptor', 'Desc', Desc);

	if (!has$H(Desc, '[[Value]]') && !has$H(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$7U = require$$0;

var $gOPD$o = GetIntrinsic$7U('%Object.getOwnPropertyDescriptor%');
if ($gOPD$o) {
	try {
		$gOPD$o([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD$o = null;
	}
}

var getOwnPropertyDescriptor = $gOPD$o;

var GetIntrinsic$7T = require$$0;

var $Object$h = GetIntrinsic$7T('%Object%');

var isPrimitive$b = requireIsPrimitive();

var $preventExtensions$b = $Object$h.preventExtensions;
var $isExtensible$5 = $Object$h.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible$w = $preventExtensions$b
	? function IsExtensible(obj) {
		return !isPrimitive$b(obj) && $isExtensible$5(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive$b(obj);
	};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$1J = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$z = function ToBoolean(value) { return !!value; };

var IsCallable$H = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$H));

var has$G = require$$0$1;

var GetIntrinsic$7S = require$$0;

var $TypeError$6s = GetIntrinsic$7S('%TypeError%');

var Type$6w = Type$6D;
var ToBoolean$y = ToBoolean$z;
var IsCallable$G = IsCallable$H.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$z = function ToPropertyDescriptor(Obj) {
	if (Type$6w(Obj) !== 'Object') {
		throw new $TypeError$6s('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$G(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$y(Obj.enumerable);
	}
	if (has$G(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$y(Obj.configurable);
	}
	if (has$G(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$G(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$y(Obj.writable);
	}
	if (has$G(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$G(getter)) {
			throw new $TypeError$6s('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$G(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$G(setter)) {
			throw new $TypeError$6s('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$G(desc, '[[Get]]') || has$G(desc, '[[Set]]')) && (has$G(desc, '[[Value]]') || has$G(desc, '[[Writable]]'))) {
		throw new $TypeError$6s('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $isNaN$P = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$U = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$P(x) && $isNaN$P(y);
};

var DefineOwnProperty$o;
var hasRequiredDefineOwnProperty;

function requireDefineOwnProperty () {
	if (hasRequiredDefineOwnProperty) return DefineOwnProperty$o;
	hasRequiredDefineOwnProperty = 1;

	var GetIntrinsic = require$$0;

	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	var callBound = require$$1;

	var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

	// eslint-disable-next-line max-params
	DefineOwnProperty$o = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
		if (!$defineProperty) {
			if (!IsDataDescriptor(desc)) {
				// ES3 does not support getters/setters
				return false;
			}
			if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
				return false;
			}

			// fallback for ES3
			if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
				// a non-enumerable existing property
				return false;
			}

			// property does not exist at all, or exists but is enumerable
			var V = desc['[[Value]]'];
			// eslint-disable-next-line no-param-reassign
			O[P] = V; // will use [[Define]]
			return SameValue(O[P], V);
		}
		$defineProperty(O, P, FromPropertyDescriptor(desc));
		return true;
	};
	return DefineOwnProperty$o;
}

var every$d;
var hasRequiredEvery;

function requireEvery () {
	if (hasRequiredEvery) return every$d;
	hasRequiredEvery = 1;

	every$d = function every(array, predicate) {
		for (var i = 0; i < array.length; i += 1) {
			if (!predicate(array[i], i, array)) {
				return false;
			}
		}
		return true;
	};
	return every$d;
}

var isSamePropertyDescriptor$6;
var hasRequiredIsSamePropertyDescriptor;

function requireIsSamePropertyDescriptor () {
	if (hasRequiredIsSamePropertyDescriptor) return isSamePropertyDescriptor$6;
	hasRequiredIsSamePropertyDescriptor = 1;

	var every = requireEvery();

	isSamePropertyDescriptor$6 = function isSamePropertyDescriptor(ES, D1, D2) {
		var fields = [
			'[[Configurable]]',
			'[[Enumerable]]',
			'[[Get]]',
			'[[Set]]',
			'[[Value]]',
			'[[Writable]]'
		];
		return every(fields, function (field) {
			if ((field in D1) !== (field in D2)) {
				return false;
			}
			return ES.SameValue(D1[field], D2[field]);
		});
	};
	return isSamePropertyDescriptor$6;
}

var assertRecord$r = assertRecord$y;

var Type$6v = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor$t = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$r(Type$6v, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var assertRecord$q = assertRecord$y;

var IsAccessorDescriptor$H = IsAccessorDescriptor$I;
var IsDataDescriptor$Z = IsDataDescriptor$_;
var Type$6u = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor$h = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$q(Type$6u, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$H(Desc) && !IsDataDescriptor$Z(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$7R = require$$0;

var $TypeError$6r = GetIntrinsic$7R('%TypeError%');

var DefineOwnProperty$n = requireDefineOwnProperty();
var isPropertyDescriptor$q = isPropertyDescriptor$s;
var isSamePropertyDescriptor$5 = requireIsSamePropertyDescriptor();

var FromPropertyDescriptor$s = FromPropertyDescriptor$t;
var IsAccessorDescriptor$G = IsAccessorDescriptor$I;
var IsDataDescriptor$Y = IsDataDescriptor$_;
var IsGenericDescriptor$g = IsGenericDescriptor$h;
var IsPropertyKey$1I = IsPropertyKey$1J;
var SameValue$T = SameValue$U;
var Type$6t = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor$b = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$6t(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$6r('Assertion failed: O must be undefined or an Object');
	}
	if (Type$6t(extensible) !== 'Boolean') {
		throw new $TypeError$6r('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor$q({
		Type: Type$6t,
		IsDataDescriptor: IsDataDescriptor$Y,
		IsAccessorDescriptor: IsAccessorDescriptor$G
	}, Desc)) {
		throw new $TypeError$6r('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$6t(current) !== 'Undefined' && !isPropertyDescriptor$q({
		Type: Type$6t,
		IsDataDescriptor: IsDataDescriptor$Y,
		IsAccessorDescriptor: IsAccessorDescriptor$G
	}, current)) {
		throw new $TypeError$6r('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey$1I(P)) {
		throw new $TypeError$6r('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$6t(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor$g(Desc) || IsDataDescriptor$Y(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$n(
					IsDataDescriptor$Y,
					SameValue$T,
					FromPropertyDescriptor$s,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor$G(Desc)) {
				throw new $TypeError$6r('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty$n(
					IsDataDescriptor$Y,
					SameValue$T,
					FromPropertyDescriptor$s,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor$g(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor$5({ SameValue: SameValue$T }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor$g(Desc)) ; else if (IsDataDescriptor$Y(current) !== IsDataDescriptor$Y(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor$Y(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$n(
					IsDataDescriptor$Y,
					SameValue$T,
					FromPropertyDescriptor$s,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty$n(
				IsDataDescriptor$Y,
				SameValue$T,
				FromPropertyDescriptor$s,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor$Y(current) && IsDataDescriptor$Y(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue$T(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor$G(current) && IsAccessorDescriptor$G(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue$T(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue$T(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$6r('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty$n(
			IsDataDescriptor$Y,
			SameValue$T,
			FromPropertyDescriptor$s,
			O,
			P,
			Desc
		);
	}
	return true;
};

var GetIntrinsic$7Q = require$$0;

var $gOPD$n = getOwnPropertyDescriptor;
var $SyntaxError$s = GetIntrinsic$7Q('%SyntaxError%');
var $TypeError$6q = GetIntrinsic$7Q('%TypeError%');

var isPropertyDescriptor$p = isPropertyDescriptor$s;

var IsAccessorDescriptor$F = IsAccessorDescriptor$I;
var IsDataDescriptor$X = IsDataDescriptor$_;
var IsExtensible$v = IsExtensible$w;
var IsPropertyKey$1H = IsPropertyKey$1J;
var ToPropertyDescriptor$y = ToPropertyDescriptor$z;
var SameValue$S = SameValue$U;
var Type$6s = Type$6D;
var ValidateAndApplyPropertyDescriptor$a = ValidateAndApplyPropertyDescriptor$b;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty$b = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$6s(O) !== 'Object') {
		throw new $TypeError$6q('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$1H(P)) {
		throw new $TypeError$6q('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor$p({
		Type: Type$6s,
		IsDataDescriptor: IsDataDescriptor$X,
		IsAccessorDescriptor: IsAccessorDescriptor$F
	}, Desc)) {
		throw new $TypeError$6q('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD$n) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor$F(Desc)) {
			throw new $SyntaxError$s('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue$S(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$s('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD$n(O, P);
	var current = desc && ToPropertyDescriptor$y(desc);
	var extensible = IsExtensible$v(O);
	return ValidateAndApplyPropertyDescriptor$a(O, P, extensible, Desc, current);
};

var GetIntrinsic$7P = require$$0;

var $match$5 = GetIntrinsic$7P('%Symbol.match%', true);

var hasRegExpMatcher$5 = require$$1$2;

var ToBoolean$x = ToBoolean$z;

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp$b = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match$5) {
		var isRegExp = argument[$match$5];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean$x(isRegExp);
		}
	}
	return hasRegExpMatcher$5(argument);
};

var GetIntrinsic$7O = require$$0;

var $gOPD$m = getOwnPropertyDescriptor;
var $TypeError$6p = GetIntrinsic$7O('%TypeError%');

var callBound$1x = require$$1;

var $isEnumerable$c = callBound$1x('Object.prototype.propertyIsEnumerable');

var has$F = require$$0$1;

var IsArray$17 = IsArray$18;
var IsPropertyKey$1G = IsPropertyKey$1J;
var IsRegExp$a = IsRegExp$b;
var ToPropertyDescriptor$x = ToPropertyDescriptor$z;
var Type$6r = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty$h = function OrdinaryGetOwnProperty(O, P) {
	if (Type$6r(O) !== 'Object') {
		throw new $TypeError$6p('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$1G(P)) {
		throw new $TypeError$6p('Assertion failed: P must be a Property Key');
	}
	if (!has$F(O, P)) {
		return void 0;
	}
	if (!$gOPD$m) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray$17(O) && P === 'length';
		var regexLastIndex = IsRegExp$a(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$c(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor$x($gOPD$m(O, P));
};

var GetIntrinsic$7N = require$$0;

var $String$f = GetIntrinsic$7N('%String%');
var $TypeError$6o = GetIntrinsic$7N('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$N = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$6o('Cannot convert a Symbol value to a string');
	}
	return $String$f(argument);
};

var ToNumber$18 = ToNumber$1b;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$f = function ToUint32(x) {
	return ToNumber$18(x) >>> 0;
};

var GetIntrinsic$7M = require$$0;

var $RangeError$i = GetIntrinsic$7M('%RangeError%');
var $TypeError$6n = GetIntrinsic$7M('%TypeError%');

var assign$6 = require$$1$3;

var isPropertyDescriptor$o = isPropertyDescriptor$s;

var IsArray$16 = IsArray$18;
var IsAccessorDescriptor$E = IsAccessorDescriptor$I;
var IsDataDescriptor$W = IsDataDescriptor$_;
var OrdinaryDefineOwnProperty$a = OrdinaryDefineOwnProperty$b;
var OrdinaryGetOwnProperty$g = OrdinaryGetOwnProperty$h;
var ToNumber$17 = ToNumber$1b;
var ToString$M = ToString$N;
var ToUint32$e = ToUint32$f;
var Type$6q = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength$5 = function ArraySetLength(A, Desc) {
	if (!IsArray$16(A)) {
		throw new $TypeError$6n('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor$o({
		Type: Type$6q,
		IsDataDescriptor: IsDataDescriptor$W,
		IsAccessorDescriptor: IsAccessorDescriptor$E
	}, Desc)) {
		throw new $TypeError$6n('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty$a(A, 'length', Desc);
	}
	var newLenDesc = assign$6({}, Desc);
	var newLen = ToUint32$e(Desc['[[Value]]']);
	var numberLen = ToNumber$17(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$i('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty$g(A, 'length');
	if (!IsDataDescriptor$W(oldLenDesc)) {
		throw new $TypeError$6n('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty$a(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty$a(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString$M(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty$a(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty$a(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

var GetIntrinsic$7L = require$$0;

var $TypeError$6m = GetIntrinsic$7L('%TypeError%');

var inspect$e = require$$1$4;

var IsPropertyKey$1F = IsPropertyKey$1J;
var Type$6p = Type$6D;

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get$10 = function Get(O, P) {
	// 7.3.1.1
	if (Type$6p(O) !== 'Object') {
		throw new $TypeError$6m('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey$1F(P)) {
		throw new $TypeError$6m('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect$e(P));
	}
	// 7.3.1.3
	return O[P];
};

var IsConstructor$n = {exports: {}};

var GetIntrinsic$7K = {exports: {}};

(function (module) {

	// TODO: remove, semver-major

	module.exports = require$$0;
} (GetIntrinsic$7K));

var GetIntrinsic$7J = require$$0;

var $TypeError$6l = GetIntrinsic$7J('%TypeError%');

var isPropertyDescriptor$n = isPropertyDescriptor$s;
var DefineOwnProperty$m = requireDefineOwnProperty();

var FromPropertyDescriptor$r = FromPropertyDescriptor$t;
var IsAccessorDescriptor$D = IsAccessorDescriptor$I;
var IsDataDescriptor$V = IsDataDescriptor$_;
var IsPropertyKey$1E = IsPropertyKey$1J;
var SameValue$R = SameValue$U;
var ToPropertyDescriptor$w = ToPropertyDescriptor$z;
var Type$6o = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow$w = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$6o(O) !== 'Object') {
		throw new $TypeError$6l('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$1E(P)) {
		throw new $TypeError$6l('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor$n({
		Type: Type$6o,
		IsDataDescriptor: IsDataDescriptor$V,
		IsAccessorDescriptor: IsAccessorDescriptor$D
	}, desc) ? desc : ToPropertyDescriptor$w(desc);
	if (!isPropertyDescriptor$n({
		Type: Type$6o,
		IsDataDescriptor: IsDataDescriptor$V,
		IsAccessorDescriptor: IsAccessorDescriptor$D
	}, Desc)) {
		throw new $TypeError$6l('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty$m(
		IsDataDescriptor$V,
		SameValue$R,
		FromPropertyDescriptor$r,
		O,
		P,
		Desc
	);
};

var GetIntrinsic$7I = GetIntrinsic$7K.exports;

var $construct$5 = GetIntrinsic$7I('%Reflect.construct%', true);

var DefinePropertyOrThrow$v = DefinePropertyOrThrow$w;
try {
	DefinePropertyOrThrow$v({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow$v = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow$v && $construct$5) {
	var isConstructorMarker$5 = {};
	var badArrayLike$5 = {};
	DefinePropertyOrThrow$v(badArrayLike$5, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker$5;
		},
		'[[Enumerable]]': true
	});

	IsConstructor$n.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct$5(argument, badArrayLike$5);
		} catch (err) {
			return err === isConstructorMarker$5;
		}
	};
} else {
	IsConstructor$n.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

var GetIntrinsic$7H = require$$0;

var $Array$a = GetIntrinsic$7H('%Array%');
var $species$b = GetIntrinsic$7H('%Symbol.species%', true);
var $TypeError$6k = GetIntrinsic$7H('%TypeError%');

var Get$$ = Get$10;
var IsArray$15 = IsArray$18;
var IsConstructor$m = IsConstructor$n.exports;
var IsInteger$I = IsInteger$L;
var Type$6n = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate$5 = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger$I(length) || length < 0) {
		throw new $TypeError$6k('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray$15(originalArray);
	if (isArray) {
		C = Get$$(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species$b && Type$6n(C) === 'Object') {
			C = Get$$(C, $species$b);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array$a(len);
	}
	if (!IsConstructor$m(C)) {
		throw new $TypeError$6k('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var GetIntrinsic$7G = require$$0;
var callBound$1w = require$$1;

var $TypeError$6j = GetIntrinsic$7G('%TypeError%');

var IsArray$14 = IsArray$18;

var $apply$5 = GetIntrinsic$7G('%Reflect.apply%', true) || callBound$1w('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

var Call$D = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$14(argumentsList)) {
		throw new $TypeError$6j('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply$5(F, V, argumentsList);
};

var GetIntrinsic$7F = require$$0;

var $TypeError$6i = GetIntrinsic$7F('%TypeError%');

var SameValue$Q = SameValue$U;
var ToNumber$16 = ToNumber$1b;
var ToString$L = ToString$N;
var Type$6m = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString$a = function CanonicalNumericIndexString(argument) {
	if (Type$6m(argument) !== 'String') {
		throw new $TypeError$6i('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber$16(argument);
	if (SameValue$Q(ToString$L(n), argument)) { return n; }
	return void 0;
};

var has$E = require$$0$1;

var assertRecord$p = assertRecord$y;

var IsDataDescriptor$U = IsDataDescriptor$_;
var IsGenericDescriptor$f = IsGenericDescriptor$h;
var Type$6l = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor$5 = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord$p(Type$6l, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor$f(Desc) || IsDataDescriptor$U(Desc)) {
		if (!has$E(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has$E(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has$E(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has$E(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has$E(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has$E(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var GetIntrinsic$7E = require$$0;

var $TypeError$6h = GetIntrinsic$7E('%TypeError%');

var DefineOwnProperty$l = requireDefineOwnProperty();

var FromPropertyDescriptor$q = FromPropertyDescriptor$t;
var OrdinaryGetOwnProperty$f = OrdinaryGetOwnProperty$h;
var IsDataDescriptor$T = IsDataDescriptor$_;
var IsExtensible$u = IsExtensible$w;
var IsPropertyKey$1D = IsPropertyKey$1J;
var SameValue$P = SameValue$U;
var Type$6k = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty$d = function CreateDataProperty(O, P, V) {
	if (Type$6k(O) !== 'Object') {
		throw new $TypeError$6h('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$1D(P)) {
		throw new $TypeError$6h('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty$f(O, P);
	var extensible = !oldDesc || IsExtensible$u(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty$l(
		IsDataDescriptor$T,
		SameValue$P,
		FromPropertyDescriptor$q,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var GetIntrinsic$7D = require$$0;

var $TypeError$6g = GetIntrinsic$7D('%TypeError%');

var CreateDataProperty$c = CreateDataProperty$d;
var IsPropertyKey$1C = IsPropertyKey$1J;
var Type$6j = Type$6D;

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$8 = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$6j(O) !== 'Object') {
		throw new $TypeError$6g('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$1C(P)) {
		throw new $TypeError$6g('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty$c(O, P, V);
	if (!success) {
		throw new $TypeError$6g('unable to create data property');
	}
	return success;
};

var RequireObjectCoercible$j = {exports: {}};

(function (module) {

	module.exports = CheckObjectCoercible$1;
} (RequireObjectCoercible$j));

var GetIntrinsic$7C = require$$0;

var $TypeError$6f = GetIntrinsic$7C('%TypeError%');

var callBound$1v = require$$1;

var $replace$a = callBound$1v('String.prototype.replace');

var RequireObjectCoercible$i = RequireObjectCoercible$j.exports;
var ToString$K = ToString$N;
var Type$6i = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML$5 = function CreateHTML(string, tag, attribute, value) {
	if (Type$6i(tag) !== 'String' || Type$6i(attribute) !== 'String') {
		throw new $TypeError$6f('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible$i(string);
	var S = ToString$K(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString$K(value);
		var escapedV = $replace$a(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var GetIntrinsic$7B = require$$0;

var $TypeError$6e = GetIntrinsic$7B('%TypeError%');

var Type$6h = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject$5 = function CreateIterResultObject(value, done) {
	if (Type$6h(done) !== 'Boolean') {
		throw new $TypeError$6e('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

var ES5ToInteger$5 = ToInteger$u;

var ToNumber$15 = ToNumber$1b;

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

var ToInteger$r = function ToInteger(value) {
	var number = ToNumber$15(value);
	return ES5ToInteger$5(number);
};

var MAX_SAFE_INTEGER$c = maxSafeInteger;

var ToInteger$q = ToInteger$r;

var ToLength$h = function ToLength(argument) {
	var len = ToInteger$q(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER$c) { return MAX_SAFE_INTEGER$c; }
	return len;
};

var GetIntrinsic$7A = require$$0;

var callBound$1u = require$$1;

var $TypeError$6d = GetIntrinsic$7A('%TypeError%');
var $indexOf$8 = callBound$1u('Array.prototype.indexOf', true) || callBound$1u('String.prototype.indexOf');
var $push$6 = callBound$1u('Array.prototype.push');

var Get$_ = Get$10;
var IsArray$13 = IsArray$18;
var ToLength$g = ToLength$h;
var ToString$J = ToString$N;
var Type$6g = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
var CreateListFromArrayLike$5 = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$6g(obj) !== 'Object') {
		throw new $TypeError$6d('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray$13(elementTypes)) {
		throw new $TypeError$6d('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength$g(Get$_(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString$J(index);
		var next = Get$_(obj, indexName);
		var nextType = Type$6g(next);
		if ($indexOf$8(elementTypes, nextType) < 0) {
			throw new $TypeError$6d('item type ' + nextType + ' is not a valid elementType');
		}
		$push$6(list, next);
		index += 1;
	}
	return list;
};

var GetIntrinsic$7z = require$$0;

var $TypeError$6c = GetIntrinsic$7z('%TypeError%');

var DefineOwnProperty$k = requireDefineOwnProperty();

var FromPropertyDescriptor$p = FromPropertyDescriptor$t;
var IsDataDescriptor$S = IsDataDescriptor$_;
var IsPropertyKey$1B = IsPropertyKey$1J;
var SameValue$O = SameValue$U;
var Type$6f = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty$5 = function CreateMethodProperty(O, P, V) {
	if (Type$6f(O) !== 'Object') {
		throw new $TypeError$6c('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$1B(P)) {
		throw new $TypeError$6c('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty$k(
		IsDataDescriptor$S,
		SameValue$O,
		FromPropertyDescriptor$p,
		O,
		P,
		newDesc
	);
};

var floor$14 = floor$16;

var msPerDay$n = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$n = function Day(t) {
	return floor$14(t / msPerDay$n);
};

var floor$13 = floor$16;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$h = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$13((y - 1969) / 4) - floor$13((y - 1901) / 100) + floor$13((y - 1601) / 400);
};

var GetIntrinsic$7y = require$$0;

var $Date$h = GetIntrinsic$7y('%Date%');

var callBound$1t = require$$1;

var $getUTCFullYear$5 = callBound$1t('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$q = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear$5(new $Date$h(t));
};

var Day$m = Day$n;
var DayFromYear$g = DayFromYear$h;
var YearFromTime$p = YearFromTime$q;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$h = function DayWithinYear(t) {
	return Day$m(t) - DayFromYear$g(YearFromTime$p(t));
};

var mod$5 = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$16 = function modulo(x, y) {
	return mod$5(x, y);
};

var modulo$15 = modulo$16;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$b = function DaysInYear(y) {
	if (modulo$15(y, 4) !== 0) {
		return 365;
	}
	if (modulo$15(y, 100) !== 0) {
		return 366;
	}
	if (modulo$15(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$7x = require$$0;

var $EvalError$b = GetIntrinsic$7x('%EvalError%');

var DaysInYear$a = DaysInYear$b;
var YearFromTime$o = YearFromTime$q;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$h = function InLeapYear(t) {
	var days = DaysInYear$a(YearFromTime$o(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$b('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$g = DayWithinYear$h;
var InLeapYear$g = InLeapYear$h;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$k = function MonthFromTime(t) {
	var day = DayWithinYear$g(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$g(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$7w = require$$0;

var $EvalError$a = GetIntrinsic$7w('%EvalError%');

var DayWithinYear$f = DayWithinYear$h;
var InLeapYear$f = InLeapYear$h;
var MonthFromTime$j = MonthFromTime$k;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$e = function DateFromTime(t) {
	var m = MonthFromTime$j(t);
	var d = DayWithinYear$f(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear$f(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$a('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var GetIntrinsic$7v = require$$0;

var $TypeError$6b = GetIntrinsic$7v('%TypeError%');

var IsPropertyKey$1A = IsPropertyKey$1J;
var Type$6e = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow$5 = function DeletePropertyOrThrow(O, P) {
	if (Type$6e(O) !== 'Object') {
		throw new $TypeError$6b('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$1A(P)) {
		throw new $TypeError$6b('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$6b('Attempt to delete property failed.');
	}
	return success;
};

var GetIntrinsic$7u = require$$0;

var $TypeError$6a = GetIntrinsic$7u('%TypeError%');

var keys$7 = require$$1$5;

var Type$6d = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-enumerableownnames

var EnumerableOwnNames$1 = function EnumerableOwnNames(O) {
	if (Type$6d(O) !== 'Object') {
		throw new $TypeError$6a('Assertion failed: Type(O) is not Object');
	}

	return keys$7(O);
};

var getIteratorMethod$7;
var hasRequiredGetIteratorMethod;

function requireGetIteratorMethod () {
	if (hasRequiredGetIteratorMethod) return getIteratorMethod$7;
	hasRequiredGetIteratorMethod = 1;

	var hasSymbols = require$$1$6();
	var GetIntrinsic = require$$0;
	var callBound = require$$1;

	var $iterator = GetIntrinsic('%Symbol.iterator%', true);
	var $stringSlice = callBound('String.prototype.slice');

	getIteratorMethod$7 = function getIteratorMethod(ES, iterable) {
		var usingIterator;
		if (hasSymbols) {
			usingIterator = ES.GetMethod(iterable, $iterator);
		} else if (ES.IsArray(iterable)) {
			usingIterator = function () {
				var i = -1;
				var arr = this; // eslint-disable-line no-invalid-this
				return {
					next: function () {
						i += 1;
						return {
							done: i >= arr.length,
							value: arr[i]
						};
					}
				};
			};
		} else if (ES.Type(iterable) === 'String') {
			usingIterator = function () {
				var i = 0;
				return {
					next: function () {
						var nextIndex = ES.AdvanceStringIndex(iterable, i, true);
						var value = $stringSlice(iterable, i, nextIndex);
						i = nextIndex;
						return {
							done: nextIndex > iterable.length,
							value: value
						};
					}
				};
			};
		}
		return usingIterator;
	};
	return getIteratorMethod$7;
}

var GetIntrinsic$7t = require$$0;

var $Object$g = GetIntrinsic$7t('%Object%');

var RequireObjectCoercible$h = RequireObjectCoercible$j.exports;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$i = function ToObject(value) {
	RequireObjectCoercible$h(value);
	return $Object$g(value);
};

var GetIntrinsic$7s = require$$0;

var $TypeError$69 = GetIntrinsic$7s('%TypeError%');

var IsPropertyKey$1z = IsPropertyKey$1J;
var ToObject$h = ToObject$i;

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV$h = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey$1z(P)) {
		throw new $TypeError$69('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject$h(V);

	// 7.3.2.4
	return O[P];
};

var GetIntrinsic$7r = require$$0;

var $TypeError$68 = GetIntrinsic$7r('%TypeError%');

var GetV$g = GetV$h;
var IsCallable$F = IsCallable$H.exports;
var IsPropertyKey$1y = IsPropertyKey$1J;

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$o = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey$1y(P)) {
		throw new $TypeError$68('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV$g(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable$F(func)) {
		throw new $TypeError$68(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var GetIntrinsic$7q = require$$0;

var $TypeError$67 = GetIntrinsic$7q('%TypeError%');

var getIteratorMethod$6 = requireGetIteratorMethod();
var AdvanceStringIndex$b = AdvanceStringIndex$c;
var Call$C = Call$D;
var GetMethod$n = GetMethod$o;
var IsArray$12 = IsArray$18;
var Type$6c = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator$c = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod$6(
			{
				AdvanceStringIndex: AdvanceStringIndex$b,
				GetMethod: GetMethod$n,
				IsArray: IsArray$12,
				Type: Type$6c
			},
			obj
		);
	}
	var iterator = Call$C(actualMethod, obj);
	if (Type$6c(iterator) !== 'Object') {
		throw new $TypeError$67('iterator must return an object');
	}

	return iterator;
};

var GetIntrinsic$7p = require$$0;

var hasSymbols$6 = require$$1$6();

var $TypeError$66 = GetIntrinsic$7p('%TypeError%');

var $gOPN$h = GetIntrinsic$7p('%Object.getOwnPropertyNames%');
var $gOPS$5 = hasSymbols$6 && GetIntrinsic$7p('%Object.getOwnPropertySymbols%');
var keys$6 = require$$1$5;

var esType$5 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys$5 = function GetOwnPropertyKeys(O, Type) {
	if (esType$5(O) !== 'Object') {
		throw new $TypeError$66('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS$5 ? $gOPS$5(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$h) {
			return keys$6(O);
		}
		return $gOPN$h(O);
	}
	throw new $TypeError$66('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var GetIntrinsic$7o = require$$0;

var $Function$5 = GetIntrinsic$7o('%Function%');
var $TypeError$65 = GetIntrinsic$7o('%TypeError%');

var Get$Z = Get$10;
var IsConstructor$l = IsConstructor$n.exports;
var Type$6b = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor$b = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic$7o(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor$l(constructor)) {
		throw new $TypeError$65('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get$Z(constructor, 'prototype');
	if (Type$6b(proto) !== 'Object') {
		if (!(constructor instanceof $Function$5)) {
			// ignore other realms, for now
			throw new $TypeError$65('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var GetIntrinsic$7n = require$$0;

var $TypeError$64 = GetIntrinsic$7n('%TypeError%');
var $parseInt$5 = GetIntrinsic$7n('%parseInt%');

var inspect$d = require$$1$4;

var regexTester$a = requireRegexTester();
var callBound$1s = require$$1;
var every$c = requireEvery();

var isDigit$5 = regexTester$a(/^[0-9]$/);

var $charAt$h = callBound$1s('String.prototype.charAt');
var $strSlice$g = callBound$1s('String.prototype.slice');

var IsArray$11 = IsArray$18;
var IsInteger$H = IsInteger$L;
var Type$6a = Type$6D;

var canDistinguishSparseFromUndefined$5 = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole$5 = function (capture, index, arr) {
	return Type$6a(capture) === 'String' || (canDistinguishSparseFromUndefined$5 ? !(index in arr) : Type$6a(capture) === 'Undefined');
};

// https://ecma-international.org/ecma-262/6.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution$5 = function GetSubstitution(matched, str, position, captures, replacement) {
	if (Type$6a(matched) !== 'String') {
		throw new $TypeError$64('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$6a(str) !== 'String') {
		throw new $TypeError$64('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger$H(position) || position < 0 || position > stringLength) {
		throw new $TypeError$64('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect$d(position));
	}

	if (!IsArray$11(captures) || !every$c(captures, isStringOrHole$5)) {
		throw new $TypeError$64('Assertion failed: `captures` must be a List of Strings, got ' + inspect$d(captures));
	}

	if (Type$6a(replacement) !== 'String') {
		throw new $TypeError$64('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt$h(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt$h(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$g(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$g(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt$h(replacement, i + 2);
				if (isDigit$5(next) && next !== '0' && (nextIsLast || !isDigit$5(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt$5(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type$6a(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit$5(next) && (nextIsLast || isDigit$5(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt$5(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type$6a(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt$h(replacement, i);
		}
	}
	return result;
};

var GetIntrinsic$7m = require$$0;

var $TypeError$63 = GetIntrinsic$7m('%TypeError%');

var has$D = require$$0$1;

var IsPropertyKey$1x = IsPropertyKey$1J;
var Type$69 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$8 = function HasOwnProperty(O, P) {
	if (Type$69(O) !== 'Object') {
		throw new $TypeError$63('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1x(P)) {
		throw new $TypeError$63('Assertion failed: `P` must be a Property Key');
	}
	return has$D(O, P);
};

var GetIntrinsic$7l = require$$0;

var $TypeError$62 = GetIntrinsic$7l('%TypeError%');

var IsPropertyKey$1w = IsPropertyKey$1J;
var Type$68 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty$7 = function HasProperty(O, P) {
	if (Type$68(O) !== 'Object') {
		throw new $TypeError$62('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1w(P)) {
		throw new $TypeError$62('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var floor$12 = floor$16;
var modulo$14 = modulo$16;

var timeConstants$n = timeConstants$s;
var msPerHour$b = timeConstants$n.msPerHour;
var HoursPerDay$5 = timeConstants$n.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$8 = function HourFromTime(t) {
	return modulo$14(floor$12(t / msPerHour$b), HoursPerDay$5);
};

var GetIntrinsic$7k = require$$0;

var $TypeError$61 = GetIntrinsic$7k('%TypeError%');

var Get$Y = Get$10;
var IsCallable$E = IsCallable$H.exports;
var Type$67 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance$b = function OrdinaryHasInstance(C, O) {
	if (IsCallable$E(C) === false) {
		return false;
	}
	if (Type$67(O) !== 'Object') {
		return false;
	}
	var P = Get$Y(C, 'prototype');
	if (Type$67(P) !== 'Object') {
		throw new $TypeError$61('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var GetIntrinsic$7j = require$$0;

var $TypeError$60 = GetIntrinsic$7j('%TypeError%');

var $hasInstance$5 = GetIntrinsic$7j('Symbol.hasInstance', true);

var Call$B = Call$D;
var GetMethod$m = GetMethod$o;
var IsCallable$D = IsCallable$H.exports;
var OrdinaryHasInstance$a = OrdinaryHasInstance$b;
var ToBoolean$w = ToBoolean$z;
var Type$66 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator$5 = function InstanceofOperator(O, C) {
	if (Type$66(O) !== 'Object') {
		throw new $TypeError$60('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance$5 ? GetMethod$m(C, $hasInstance$5) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean$w(Call$B(instOfHandler, C, [O]));
	}
	if (!IsCallable$D(C)) {
		throw new $TypeError$60('`C` is not Callable');
	}
	return OrdinaryHasInstance$a(C, O);
};

var GetIntrinsic$7i = require$$0;

var $TypeError$5$ = GetIntrinsic$7i('%TypeError%');

var Call$A = Call$D;
var IsArray$10 = IsArray$18;
var GetV$f = GetV$h;
var IsPropertyKey$1v = IsPropertyKey$1J;

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke$b = function Invoke(O, P) {
	if (!IsPropertyKey$1v(P)) {
		throw new $TypeError$5$('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$10(argumentsList)) {
		throw new $TypeError$5$('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV$f(O, P);
	return Call$A(func, O, argumentsList);
};

var GetIntrinsic$7h = require$$0;

var $isConcatSpreadable$5 = GetIntrinsic$7h('%Symbol.isConcatSpreadable%', true);

var Get$X = Get$10;
var IsArray$$ = IsArray$18;
var ToBoolean$v = ToBoolean$z;
var Type$65 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable$5 = function IsConcatSpreadable(O) {
	if (Type$65(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable$5) {
		var spreadable = Get$X(O, $isConcatSpreadable$5);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean$v(spreadable);
		}
	}
	return IsArray$$(O);
};

var callBound$1r = require$$1;

var $PromiseThen$5 = callBound$1r('Promise.prototype.then', true);

var Type$64 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise$5 = function IsPromise(x) {
	if (Type$64(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen$5) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen$5(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

// TODO, semver-major: delete this

var isPropertyDescriptor$m = isPropertyDescriptor$s;

var Type$63 = Type$6D;
var IsDataDescriptor$R = IsDataDescriptor$_;
var IsAccessorDescriptor$C = IsAccessorDescriptor$I;

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

var IsPropertyDescriptor$2 = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor$m({
		IsDataDescriptor: IsDataDescriptor$R,
		IsAccessorDescriptor: IsAccessorDescriptor$C,
		Type: Type$63
	}, Desc);
};

var GetIntrinsic$7g = require$$0;

var $TypeError$5_ = GetIntrinsic$7g('%TypeError%');

var Call$z = Call$D;
var GetMethod$l = GetMethod$o;
var IsCallable$C = IsCallable$H.exports;
var Type$62 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose$7 = function IteratorClose(iterator, completion) {
	if (Type$62(iterator) !== 'Object') {
		throw new $TypeError$5_('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable$C(completion)) {
		throw new $TypeError$5_('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$l(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call$z(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$62(innerResult) !== 'Object') {
		throw new $TypeError$5_('iterator .return must return an object');
	}

	return completionRecord;
};

var GetIntrinsic$7f = require$$0;

var $TypeError$5Z = GetIntrinsic$7f('%TypeError%');

var Get$W = Get$10;
var ToBoolean$u = ToBoolean$z;
var Type$61 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete$b = function IteratorComplete(iterResult) {
	if (Type$61(iterResult) !== 'Object') {
		throw new $TypeError$5Z('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean$u(Get$W(iterResult, 'done'));
};

var GetIntrinsic$7e = require$$0;

var $TypeError$5Y = GetIntrinsic$7e('%TypeError%');

var Invoke$a = Invoke$b;
var Type$60 = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext$b = function IteratorNext(iterator, value) {
	var result = Invoke$a(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$60(result) !== 'Object') {
		throw new $TypeError$5Y('iterator next must return an object');
	}
	return result;
};

var IteratorComplete$a = IteratorComplete$b;
var IteratorNext$a = IteratorNext$b;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep$c = function IteratorStep(iterator) {
	var result = IteratorNext$a(iterator);
	var done = IteratorComplete$a(result);
	return done === true ? false : result;
};

var GetIntrinsic$7d = require$$0;

var $TypeError$5X = GetIntrinsic$7d('%TypeError%');

var Get$V = Get$10;
var Type$5$ = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue$c = function IteratorValue(iterResult) {
	if (Type$5$(iterResult) !== 'Object') {
		throw new $TypeError$5X('Assertion failed: Type(iterResult) is not Object');
	}
	return Get$V(iterResult, 'value');
};

var $isFinite$J = _isFinite;
var msPerDay$m = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate$5 = function MakeDate(day, time) {
	if (!$isFinite$J(day) || !$isFinite$J(time)) {
		return NaN;
	}
	return (day * msPerDay$m) + time;
};

var GetIntrinsic$7c = require$$0;

var $DateUTC$5 = GetIntrinsic$7c('%Date.UTC%');

var $isFinite$I = _isFinite;

var DateFromTime$d = DateFromTime$e;
var Day$l = Day$n;
var floor$11 = floor$16;
var modulo$13 = modulo$16;
var MonthFromTime$i = MonthFromTime$k;
var ToInteger$p = ToInteger$r;
var YearFromTime$n = YearFromTime$q;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay$5 = function MakeDay(year, month, date) {
	if (!$isFinite$I(year) || !$isFinite$I(month) || !$isFinite$I(date)) {
		return NaN;
	}
	var y = ToInteger$p(year);
	var m = ToInteger$p(month);
	var dt = ToInteger$p(date);
	var ym = y + floor$11(m / 12);
	var mn = modulo$13(m, 12);
	var t = $DateUTC$5(ym, mn, 1);
	if (YearFromTime$n(t) !== ym || MonthFromTime$i(t) !== mn || DateFromTime$d(t) !== 1) {
		return NaN;
	}
	return Day$l(t) + dt - 1;
};

var $isFinite$H = _isFinite;
var timeConstants$m = timeConstants$s;
var msPerSecond$h = timeConstants$m.msPerSecond;
var msPerMinute$b = timeConstants$m.msPerMinute;
var msPerHour$a = timeConstants$m.msPerHour;

var ToInteger$o = ToInteger$r;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime$5 = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$H(hour) || !$isFinite$H(min) || !$isFinite$H(sec) || !$isFinite$H(ms)) {
		return NaN;
	}
	var h = ToInteger$o(hour);
	var m = ToInteger$o(min);
	var s = ToInteger$o(sec);
	var milli = ToInteger$o(ms);
	var t = (h * msPerHour$a) + (m * msPerMinute$b) + (s * msPerSecond$h) + milli;
	return t;
};

var floor$10 = floor$16;
var modulo$12 = modulo$16;

var timeConstants$l = timeConstants$s;
var msPerMinute$a = timeConstants$l.msPerMinute;
var MinutesPerHour$5 = timeConstants$l.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$8 = function MinFromTime(t) {
	return modulo$12(floor$10(t / msPerMinute$a), MinutesPerHour$5);
};

var modulo$11 = modulo$16;

var msPerSecond$g = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime$5 = function msFromTime(t) {
	return modulo$11(t, msPerSecond$g);
};

var GetIntrinsic$7b = require$$0;

var $ObjectCreate$5 = GetIntrinsic$7b('%Object.create%', true);
var $TypeError$5W = GetIntrinsic$7b('%TypeError%');
var $SyntaxError$r = GetIntrinsic$7b('%SyntaxError%');

var Type$5_ = Type$6D;

var hasProto$5 = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

var ObjectCreate$9 = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type$5_(proto) !== 'Object') {
		throw new $TypeError$5W('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError$r('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate$5) {
		return $ObjectCreate$5(proto);
	}
	if (hasProto$5) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$r('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var GetIntrinsic$7a = require$$0;
var $TypeError$5V = GetIntrinsic$7a('%TypeError%');

var GetPrototypeFromConstructor$a = GetPrototypeFromConstructor$b;
var IsArray$_ = IsArray$18;
var ObjectCreate$8 = ObjectCreate$9;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

var OrdinaryCreateFromConstructor$5 = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic$7a(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor$a(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray$_(slots)) {
		throw new $TypeError$5V('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate$8(proto, slots);
};

var GetIntrinsic$79 = require$$0;

var $TypeError$5U = GetIntrinsic$79('%TypeError%');

var IsPropertyKey$1u = IsPropertyKey$1J;
var Type$5Z = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty$5 = function OrdinaryHasProperty(O, P) {
	if (Type$5Z(O) !== 'Object') {
		throw new $TypeError$5U('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$1u(P)) {
		throw new $TypeError$5U('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var forEach$j;
var hasRequiredForEach;

function requireForEach () {
	if (hasRequiredForEach) return forEach$j;
	hasRequiredForEach = 1;

	forEach$j = function forEach(array, callback) {
		for (var i = 0; i < array.length; i += 1) {
			callback(array[i], i, array); // eslint-disable-line callback-return
		}
	};
	return forEach$j;
}

var GetIntrinsic$78 = require$$0;

var $TypeError$5T = GetIntrinsic$78('%TypeError%');

var callBound$1q = require$$1;
var forEach$i = requireForEach();

var $charCodeAt$d = callBound$1q('String.prototype.charCodeAt');
var $numberToString$5 = callBound$1q('Number.prototype.toString');
var $toLowerCase$5 = callBound$1q('String.prototype.toLowerCase');
var $strSlice$f = callBound$1q('String.prototype.slice');
var $strSplit$4 = callBound$1q('String.prototype.split');

var Type$5Y = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-quotejsonstring

var escapes$5 = {
	'\u0008': 'b',
	'\u000C': 'f',
	'\u000A': 'n',
	'\u000D': 'r',
	'\u0009': 't'
};

var QuoteJSONString$5 = function QuoteJSONString(value) {
	if (Type$5Y(value) !== 'String') {
		throw new $TypeError$5T('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach$i($strSplit$4(value), function (C) {
			if (C === '"' || C === '\\') {
				product += '\u005C' + C;
			} else if (C === '\u0008' || C === '\u000C' || C === '\u000A' || C === '\u000D' || C === '\u0009') {
				var abbrev = escapes$5[C];
				product += '\u005C' + abbrev;
			} else {
				var cCharCode = $charCodeAt$d(C, 0);
				if (cCharCode < 0x20) {
					product += '\u005Cu' + $toLowerCase$5($strSlice$f('0000' + $numberToString$5(cCharCode, 16), -4));
				} else {
					product += C;
				}
			}
		});
	}
	product += '"';
	return product;
};

var GetIntrinsic$77 = require$$0;

var $RegExp$a = GetIntrinsic$77('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString$I = ToString$N;

// https://262.ecma-international.org/6.0/#sec-regexpcreate

var RegExpCreate$5 = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString$I(P);
	var flags = typeof F === 'undefined' ? '' : ToString$I(F);
	return new $RegExp$a(pattern, flags);
};

var GetIntrinsic$76 = require$$0;

var $TypeError$5S = GetIntrinsic$76('%TypeError%');

var regexExec$5 = require$$1('RegExp.prototype.exec');

var Call$y = Call$D;
var Get$U = Get$10;
var IsCallable$B = IsCallable$H.exports;
var Type$5X = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec$5 = function RegExpExec(R, S) {
	if (Type$5X(R) !== 'Object') {
		throw new $TypeError$5S('Assertion failed: `R` must be an Object');
	}
	if (Type$5X(S) !== 'String') {
		throw new $TypeError$5S('Assertion failed: `S` must be a String');
	}
	var exec = Get$U(R, 'exec');
	if (IsCallable$B(exec)) {
		var result = Call$y(exec, R, [S]);
		if (result === null || Type$5X(result) === 'Object') {
			return result;
		}
		throw new $TypeError$5S('"exec" method must return `null` or an Object');
	}
	return regexExec$5(R, S);
};

var $isNaN$O = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero$8 = function SameValueZero(x, y) {
	return (x === y) || ($isNaN$O(x) && $isNaN$O(y));
};

var floor$$ = floor$16;
var modulo$10 = modulo$16;

var timeConstants$k = timeConstants$s;
var msPerSecond$f = timeConstants$k.msPerSecond;
var SecondsPerMinute$5 = timeConstants$k.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$8 = function SecFromTime(t) {
	return modulo$10(floor$$(t / msPerSecond$f), SecondsPerMinute$5);
};

var GetIntrinsic$75 = require$$0;

var $TypeError$5R = GetIntrinsic$75('%TypeError%');

var IsPropertyKey$1t = IsPropertyKey$1J;
var SameValue$N = SameValue$U;
var Type$5W = Type$6D;

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation$5 = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set$5 = function Set(O, P, V, Throw) {
	if (Type$5W(O) !== 'Object') {
		throw new $TypeError$5R('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1t(P)) {
		throw new $TypeError$5R('Assertion failed: `P` must be a Property Key');
	}
	if (Type$5W(Throw) !== 'Boolean') {
		throw new $TypeError$5R('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation$5 && !SameValue$N(O[P], V)) {
			throw new $TypeError$5R('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation$5 ? SameValue$N(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

var getInferredName_1;
var hasRequiredGetInferredName;

function requireGetInferredName () {
	if (hasRequiredGetInferredName) return getInferredName_1;
	hasRequiredGetInferredName = 1;

	var getInferredName;
	try {
		// eslint-disable-next-line no-new-func
		getInferredName = Function('s', 'return { [s]() {} }[s].name;');
	} catch (e) {}

	var inferred = function () {};
	getInferredName_1 = getInferredName && inferred.name === 'inferred' ? getInferredName : null;
	return getInferredName_1;
}

var getSymbolDescription$6;
var hasRequiredGetSymbolDescription;

function requireGetSymbolDescription () {
	if (hasRequiredGetSymbolDescription) return getSymbolDescription$6;
	hasRequiredGetSymbolDescription = 1;

	var GetIntrinsic = require$$0;

	var callBound = require$$1;

	var $SyntaxError = GetIntrinsic('%SyntaxError%');
	var getGlobalSymbolDescription = GetIntrinsic('%Symbol.keyFor%', true);
	var thisSymbolValue = callBound('%Symbol.prototype.valueOf%', true);
	var symToStr = callBound('Symbol.prototype.toString', true);

	var getInferredName = requireGetInferredName();

	/* eslint-disable consistent-return */
	getSymbolDescription$6 = callBound('%Symbol.prototype.description%', true) || function getSymbolDescription(symbol) {
		if (!thisSymbolValue) {
			throw new $SyntaxError('Symbols are not supported in this environment');
		}

		// will throw if not a symbol primitive or wrapper object
		var sym = thisSymbolValue(symbol);

		if (getInferredName) {
			var name = getInferredName(sym);
			if (name === '') { return; }
			return name.slice(1, -1); // name.slice('['.length, -']'.length);
		}

		var desc;
		if (getGlobalSymbolDescription) {
			desc = getGlobalSymbolDescription(sym);
			if (typeof desc === 'string') {
				return desc;
			}
		}

		desc = symToStr(sym).slice(7, -1); // str.slice('Symbol('.length, -')'.length);
		if (desc) {
			return desc;
		}
	};
	return getSymbolDescription$6;
}

var GetIntrinsic$74 = require$$0;

var has$C = require$$0$1;

var $TypeError$5Q = GetIntrinsic$74('%TypeError%');

var getSymbolDescription$5 = requireGetSymbolDescription();

var DefinePropertyOrThrow$u = DefinePropertyOrThrow$w;
var IsExtensible$t = IsExtensible$w;
var Type$5V = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName$5 = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$5Q('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible$t(F) || has$C(F, 'name')) {
		throw new $TypeError$5Q('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$5V(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$5Q('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription$5(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow$u(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var GetIntrinsic$73 = require$$0;

var $SyntaxError$q = GetIntrinsic$73('%SyntaxError%');
var $TypeError$5P = GetIntrinsic$73('%TypeError%');
var $preventExtensions$a = GetIntrinsic$73('%Object.preventExtensions%');
var $gOPD$l = getOwnPropertyDescriptor;
var $gOPN$g = GetIntrinsic$73('%Object.getOwnPropertyNames%');

var forEach$h = requireForEach();

var DefinePropertyOrThrow$t = DefinePropertyOrThrow$w;
var IsAccessorDescriptor$B = IsAccessorDescriptor$I;
var ToPropertyDescriptor$v = ToPropertyDescriptor$z;
var Type$5U = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel$5 = function SetIntegrityLevel(O, level) {
	if (Type$5U(O) !== 'Object') {
		throw new $TypeError$5P('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$5P('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions$a) {
		throw new $SyntaxError$q('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions$a(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$g) {
		throw new $SyntaxError$q('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$g(O);
	if (level === 'sealed') {
		forEach$h(theKeys, function (k) {
			DefinePropertyOrThrow$t(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach$h(theKeys, function (k) {
			var currentDesc = $gOPD$l(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor$B(ToPropertyDescriptor$v(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow$t(O, k, desc);
			}
		});
	}
	return true;
};

var GetIntrinsic$72 = require$$0;

var $species$a = GetIntrinsic$72('%Symbol.species%', true);
var $TypeError$5O = GetIntrinsic$72('%TypeError%');

var IsConstructor$k = IsConstructor$n.exports;
var Type$5T = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor$5 = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$5T(O) !== 'Object') {
		throw new $TypeError$5O('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$5T(C) !== 'Object') {
		throw new $TypeError$5O('O.constructor is not an Object');
	}
	var S = $species$a ? C[$species$a] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor$k(S)) {
		return S;
	}
	throw new $TypeError$5O('no constructor found');
};

var GetIntrinsic$71 = require$$0;
var callBound$1p = require$$1;

var $TypeError$5N = GetIntrinsic$71('%TypeError%');

var IsInteger$G = IsInteger$L;
var Type$5S = Type$6D;

var $charAt$g = callBound$1p('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

var SplitMatch$5 = function SplitMatch(S, q, R) {
	if (Type$5S(S) !== 'String') {
		throw new $TypeError$5N('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$G(q)) {
		throw new $TypeError$5N('Assertion failed: `q` must be an integer');
	}
	if (Type$5S(R) !== 'String') {
		throw new $TypeError$5N('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt$g(S, q + i) !== $charAt$g(R, i)) {
			return false;
		}
	}

	return q + r;
};

var setProto$6;
var hasRequiredSetProto;

function requireSetProto () {
	if (hasRequiredSetProto) return setProto$6;
	hasRequiredSetProto = 1;

	var GetIntrinsic = require$$0;

	var originalSetProto = GetIntrinsic('%Object.setPrototypeOf%', true);
	var $ArrayProto = GetIntrinsic('%Array.prototype%');

	setProto$6 = originalSetProto || (
		// eslint-disable-next-line no-proto, no-negated-condition
		[].__proto__ !== $ArrayProto
			? null
			: function (O, proto) {
				O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
				return O;
			}
	);
	return setProto$6;
}

var GetIntrinsic$70 = require$$0;

var $Object$f = GetIntrinsic$70('%Object%');
var $StringPrototype$5 = GetIntrinsic$70('%String.prototype%');
var $SyntaxError$p = GetIntrinsic$70('%SyntaxError%');
var $TypeError$5M = GetIntrinsic$70('%TypeError%');

var DefinePropertyOrThrow$s = DefinePropertyOrThrow$w;
var Type$5R = Type$6D;

var setProto$5 = requireSetProto();

// https://262.ecma-international.org/6.0/#sec-stringcreate

var StringCreate$5 = function StringCreate(value, prototype) {
	if (Type$5R(value) !== 'String') {
		throw new $TypeError$5M('Assertion failed: `S` must be a String');
	}

	var S = $Object$f(value);
	if (S !== $StringPrototype$5) {
		if (setProto$5) {
			setProto$5(S, prototype);
		} else {
			throw new $SyntaxError$p('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow$s(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

var GetIntrinsic$6$ = require$$0;
var callBound$1o = require$$1;

var $TypeError$5L = GetIntrinsic$6$('%TypeError%');

var $charAt$f = callBound$1o('String.prototype.charAt');

var isString = require$$2;
var isNegativeZero$5 = require$$6;
var unbox = require$$4;

var CanonicalNumericIndexString$9 = CanonicalNumericIndexString$a;
var IsInteger$F = IsInteger$L;
var IsPropertyKey$1s = IsPropertyKey$1J;
var Type$5Q = Type$6D;

// https://262.ecma-international.org/6.0/#sec-stringgetindexproperty

var StringGetIndexProperty = function StringGetIndexProperty(S, P) {
	if (typeof S === 'string' || !isString(S)) {
		throw new $TypeError$5L('Assertion failed: `S` must be a boxed String Object');
	}
	if (!IsPropertyKey$1s(P)) {
		throw new $TypeError$5L('Assertion failed: `P` must be a Property Key');
	}

	if (Type$5Q(P) !== 'String') {
		return void undefined;
	}

	var index = CanonicalNumericIndexString$9(P);
	if (typeof index === 'undefined' || !IsInteger$F(index) || isNegativeZero$5(index)) {
		return void undefined;
	}

	var str = unbox(S);
	var len = str.length;
	if (index < 0 || len <= index) {
		return void undefined;
	}

	var resultStr = $charAt$f(str, index);

	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

var GetIntrinsic$6_ = require$$0;

var $TypeError$5K = GetIntrinsic$6_('%TypeError%');

var callBound$1n = require$$1;

var $SymbolToString$5 = callBound$1n('Symbol.prototype.toString', true);

var Type$5P = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString$5 = function SymbolDescriptiveString(sym) {
	if (Type$5P(sym) !== 'Symbol') {
		throw new $TypeError$5K('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString$5(sym);
};

var GetIntrinsic$6Z = require$$0;

var $gOPD$k = getOwnPropertyDescriptor;
var $gOPN$f = GetIntrinsic$6Z('%Object.getOwnPropertyNames%');
var $TypeError$5J = GetIntrinsic$6Z('%TypeError%');

var every$b = requireEvery();

var IsDataDescriptor$Q = IsDataDescriptor$_;
var IsExtensible$s = IsExtensible$w;
var ToPropertyDescriptor$u = ToPropertyDescriptor$z;
var Type$5O = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel$5 = function TestIntegrityLevel(O, level) {
	if (Type$5O(O) !== 'Object') {
		throw new $TypeError$5J('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$5J('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible$s(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN$f(O);
	return theKeys.length === 0 || every$b(theKeys, function (k) {
		var currentDesc = $gOPD$k(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor$Q(ToPropertyDescriptor$u(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var $BooleanValueOf$5 = require$$1('Boolean.prototype.valueOf');

var Type$5N = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue$5 = function thisBooleanValue(value) {
	if (Type$5N(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf$5(value);
};

var callBound$1m = require$$1;

var Type$5M = Type$6D;

var $NumberValueOf$5 = callBound$1m('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue$5 = function thisNumberValue(value) {
	if (Type$5M(value) === 'Number') {
		return value;
	}

	return $NumberValueOf$5(value);
};

var $StringValueOf$5 = require$$1('String.prototype.valueOf');

var Type$5L = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue$5 = function thisStringValue(value) {
	if (Type$5L(value) === 'String') {
		return value;
	}

	return $StringValueOf$5(value);
};

var $DateValueOf$3 = require$$1('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

var thisTimeValue$5 = function thisTimeValue(value) {
	return $DateValueOf$3(value);
};

var GetIntrinsic$6Y = require$$0;

var $Date$g = GetIntrinsic$6Y('%Date%');
var $Number$g = GetIntrinsic$6Y('%Number%');

var $isFinite$G = _isFinite;

var abs$r = abs$t;
var ToNumber$14 = ToNumber$1b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip$5 = function TimeClip(time) {
	if (!$isFinite$G(time) || abs$r(time) > 8.64e15) {
		return NaN;
	}
	return $Number$g(new $Date$g(ToNumber$14(time)));
};

var msPerDay$l = timeConstants$s.msPerDay;

var DayFromYear$f = DayFromYear$h;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear$5 = function TimeFromYear(y) {
	return msPerDay$l * DayFromYear$f(y);
};

var modulo$$ = modulo$16;

var msPerDay$k = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay$5 = function TimeWithinDay(t) {
	return modulo$$(t, msPerDay$k);
};

var GetIntrinsic$6X = require$$0;

var $TypeError$5I = GetIntrinsic$6X('%TypeError%');
var $Date$f = GetIntrinsic$6X('%Date%');

var $isNaN$N = _isNaN;

var Type$5K = Type$6D;

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString$5 = function ToDateString(tv) {
	if (Type$5K(tv) !== 'Number') {
		throw new $TypeError$5I('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN$N(tv)) {
		return 'Invalid Date';
	}
	return $Date$f(tv);
};

var abs$q = abs$t;
var floor$_ = floor$16;
var modulo$_ = modulo$16;
var ToNumber$13 = ToNumber$1b;

var $isNaN$M = _isNaN;
var $isFinite$F = _isFinite;
var $sign$b = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$b = function ToUint16(value) {
	var number = ToNumber$13(value);
	if ($isNaN$M(number) || number === 0 || !$isFinite$F(number)) { return 0; }
	var posInt = $sign$b(number) * floor$_(abs$q(number));
	return modulo$_(posInt, 0x10000);
};

var ToUint16$a = ToUint16$b;

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16$5 = function ToInt16(argument) {
	var int16bit = ToUint16$a(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

var ToNumber$12 = ToNumber$1b;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$a = function ToInt32(x) {
	return ToNumber$12(x) >> 0;
};

var ToNumber$11 = ToNumber$1b;

var $isNaN$L = _isNaN;
var $isFinite$E = _isFinite;
var $sign$a = sign;

var abs$p = abs$t;
var floor$Z = floor$16;
var modulo$Z = modulo$16;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

var ToUint8$b = function ToUint8(argument) {
	var number = ToNumber$11(argument);
	if ($isNaN$L(number) || number === 0 || !$isFinite$E(number)) { return 0; }
	var posInt = $sign$a(number) * floor$Z(abs$p(number));
	return modulo$Z(posInt, 0x100);
};

var ToUint8$a = ToUint8$b;

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8$5 = function ToInt8(argument) {
	var int8bit = ToUint8$a(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var GetIntrinsic$6W = require$$0;

var $String$e = GetIntrinsic$6W('%String%');

var ToPrimitive$q = ToPrimitive$u;
var ToString$H = ToString$N;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey$5 = function ToPropertyKey(argument) {
	var key = ToPrimitive$q(argument, $String$e);
	return typeof key === 'symbol' ? key : ToString$H(key);
};

var ToNumber$10 = ToNumber$1b;
var floor$Y = floor$16;

var $isNaN$K = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp$5 = function ToUint8Clamp(argument) {
	var number = ToNumber$10(argument);
	if ($isNaN$K(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor$Y(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var Day$k = Day$n;
var modulo$Y = modulo$16;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$8 = function WeekDay(t) {
	return modulo$Y(Day$k(t) + 4, 7);
};

/* eslint global-require: 0 */
// https://ecma-international.org/ecma-262/6.0/#sec-abstract-operations
var ES6 = {
	'Abstract Equality Comparison': AbstractEqualityComparison$5,
	'Abstract Relational Comparison': AbstractRelationalComparison$5,
	'Strict Equality Comparison': StrictEqualityComparison$5,
	abs: abs$t,
	AdvanceStringIndex: AdvanceStringIndex$c,
	ArrayCreate: ArrayCreate$5,
	ArraySetLength: ArraySetLength$5,
	ArraySpeciesCreate: ArraySpeciesCreate$5,
	Call: Call$D,
	CanonicalNumericIndexString: CanonicalNumericIndexString$a,
	CompletePropertyDescriptor: CompletePropertyDescriptor$5,
	CreateDataProperty: CreateDataProperty$d,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow$8,
	CreateHTML: CreateHTML$5,
	CreateIterResultObject: CreateIterResultObject$5,
	CreateListFromArrayLike: CreateListFromArrayLike$5,
	CreateMethodProperty: CreateMethodProperty$5,
	DateFromTime: DateFromTime$e,
	Day: Day$n,
	DayFromYear: DayFromYear$h,
	DaysInYear: DaysInYear$b,
	DayWithinYear: DayWithinYear$h,
	DefinePropertyOrThrow: DefinePropertyOrThrow$w,
	DeletePropertyOrThrow: DeletePropertyOrThrow$5,
	EnumerableOwnNames: EnumerableOwnNames$1,
	floor: floor$16,
	FromPropertyDescriptor: FromPropertyDescriptor$t,
	Get: Get$10,
	GetIterator: GetIterator$c,
	GetMethod: GetMethod$o,
	GetOwnPropertyKeys: GetOwnPropertyKeys$5,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor$b,
	GetSubstitution: GetSubstitution$5,
	GetV: GetV$h,
	HasOwnProperty: HasOwnProperty$8,
	HasProperty: HasProperty$7,
	HourFromTime: HourFromTime$8,
	InLeapYear: InLeapYear$h,
	InstanceofOperator: InstanceofOperator$5,
	Invoke: Invoke$b,
	IsAccessorDescriptor: IsAccessorDescriptor$I,
	IsArray: IsArray$18,
	IsCallable: IsCallable$H.exports,
	IsConcatSpreadable: IsConcatSpreadable$5,
	IsConstructor: IsConstructor$n.exports,
	IsDataDescriptor: IsDataDescriptor$_,
	IsExtensible: IsExtensible$w,
	IsGenericDescriptor: IsGenericDescriptor$h,
	IsInteger: IsInteger$L,
	IsPromise: IsPromise$5,
	IsPropertyDescriptor: IsPropertyDescriptor$2,
	IsPropertyKey: IsPropertyKey$1J,
	IsRegExp: IsRegExp$b,
	IteratorClose: IteratorClose$7,
	IteratorComplete: IteratorComplete$b,
	IteratorNext: IteratorNext$b,
	IteratorStep: IteratorStep$c,
	IteratorValue: IteratorValue$c,
	MakeDate: MakeDate$5,
	MakeDay: MakeDay$5,
	MakeTime: MakeTime$5,
	MinFromTime: MinFromTime$8,
	modulo: modulo$16,
	MonthFromTime: MonthFromTime$k,
	msFromTime: msFromTime$5,
	ObjectCreate: ObjectCreate$9,
	OrdinaryCreateFromConstructor: OrdinaryCreateFromConstructor$5,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty$b,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty$h,
	OrdinaryHasInstance: OrdinaryHasInstance$b,
	OrdinaryHasProperty: OrdinaryHasProperty$5,
	QuoteJSONString: QuoteJSONString$5,
	RegExpCreate: RegExpCreate$5,
	RegExpExec: RegExpExec$5,
	RequireObjectCoercible: RequireObjectCoercible$j.exports,
	SameValue: SameValue$U,
	SameValueZero: SameValueZero$8,
	SecFromTime: SecFromTime$8,
	Set: _Set$5,
	SetFunctionName: SetFunctionName$5,
	SetIntegrityLevel: SetIntegrityLevel$5,
	SpeciesConstructor: SpeciesConstructor$5,
	SplitMatch: SplitMatch$5,
	StringCreate: StringCreate$5,
	StringGetIndexProperty: StringGetIndexProperty,
	SymbolDescriptiveString: SymbolDescriptiveString$5,
	TestIntegrityLevel: TestIntegrityLevel$5,
	thisBooleanValue: thisBooleanValue$5,
	thisNumberValue: thisNumberValue$5,
	thisStringValue: thisStringValue$5,
	thisTimeValue: thisTimeValue$5,
	TimeClip: TimeClip$5,
	TimeFromYear: TimeFromYear$5,
	TimeWithinDay: TimeWithinDay$5,
	ToBoolean: ToBoolean$z,
	ToDateString: ToDateString$5,
	ToInt16: ToInt16$5,
	ToInt32: ToInt32$a,
	ToInt8: ToInt8$5,
	ToInteger: ToInteger$r,
	ToLength: ToLength$h,
	ToNumber: ToNumber$1b,
	ToObject: ToObject$i,
	ToPrimitive: ToPrimitive$u,
	ToPropertyDescriptor: ToPropertyDescriptor$z,
	ToPropertyKey: ToPropertyKey$5,
	ToString: ToString$N,
	ToUint16: ToUint16$b,
	ToUint32: ToUint32$f,
	ToUint8: ToUint8$b,
	ToUint8Clamp: ToUint8Clamp$5,
	Type: Type$6D,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor$b,
	WeekDay: WeekDay$8,
	YearFromTime: YearFromTime$q
};

var es2015 = ES6;

var toPrimitive$4 = require$$0$4;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$p = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive$4(input, arguments[1]);
	}
	return toPrimitive$4(input);
};

var GetIntrinsic$6V = require$$0;

var $TypeError$5H = GetIntrinsic$6V('%TypeError%');
var $Number$f = GetIntrinsic$6V('%Number%');
var $RegExp$9 = GetIntrinsic$6V('%RegExp%');
var $parseInteger$4 = GetIntrinsic$6V('%parseInt%');

var callBound$1l = require$$1;
var regexTester$9 = requireRegexTester();
var isPrimitive$a = requireIsPrimitive();

var $strSlice$e = callBound$1l('String.prototype.slice');
var isBinary$4 = regexTester$9(/^0b[01]+$/i);
var isOctal$4 = regexTester$9(/^0o[0-7]+$/i);
var isInvalidHexLiteral$4 = regexTester$9(/^[-+]0x[0-9a-f]+$/i);
var nonWS$4 = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex$4 = new $RegExp$9('[' + nonWS$4 + ']', 'g');
var hasNonWS$4 = regexTester$9(nonWSregex$4);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws$4 = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex$4 = new RegExp('(^[' + ws$4 + ']+)|([' + ws$4 + ']+$)', 'g');
var $replace$9 = callBound$1l('String.prototype.replace');
var $trim$4 = function (value) {
	return $replace$9(value, trimRegex$4, '');
};

var ToPrimitive$o = ToPrimitive$p;

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber$$ = function ToNumber(argument) {
	var value = isPrimitive$a(argument) ? argument : ToPrimitive$o(argument, $Number$f);
	if (typeof value === 'symbol') {
		throw new $TypeError$5H('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary$4(value)) {
			return ToNumber($parseInteger$4($strSlice$e(value, 2), 2));
		} else if (isOctal$4(value)) {
			return ToNumber($parseInteger$4($strSlice$e(value, 2), 8));
		} else if (hasNonWS$4(value) || isInvalidHexLiteral$4(value)) {
			return NaN;
		} else {
			var trimmed = $trim$4(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number$f(value);
};

var ES5Type$4 = Type$6N;

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

var Type$5J = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type$4(x);
};

var ToNumber$_ = ToNumber$$;
var ToPrimitive$n = ToPrimitive$p;
var Type$5I = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison$4 = function AbstractEqualityComparison(x, y) {
	var xType = Type$5I(x);
	var yType = Type$5I(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$_(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$_(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$_(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$_(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$n(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive$n(x), y);
	}
	return false;
};

var GetIntrinsic$6U = require$$0;

var $Number$e = GetIntrinsic$6U('%Number%');
var $TypeError$5G = GetIntrinsic$6U('%TypeError%');

var $isNaN$J = _isNaN;
var $isFinite$D = _isFinite;
var isPrefixOf$7 = requireIsPrefixOf();

var ToNumber$Z = ToNumber$$;
var ToPrimitive$m = ToPrimitive$p;
var Type$5H = Type$5J;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison$4 = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$5H(LeftFirst) !== 'Boolean') {
		throw new $TypeError$5G('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$m(x, $Number$e);
		py = ToPrimitive$m(y, $Number$e);
	} else {
		py = ToPrimitive$m(y, $Number$e);
		px = ToPrimitive$m(x, $Number$e);
	}
	var bothStrings = Type$5H(px) === 'String' && Type$5H(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$Z(px);
		var ny = ToNumber$Z(py);
		if ($isNaN$J(nx) || $isNaN$J(ny)) {
			return undefined;
		}
		if ($isFinite$D(nx) && $isFinite$D(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$7(py, px)) {
		return false;
	}
	if (isPrefixOf$7(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$5G = Type$5J;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison$4 = function StrictEqualityComparison(x, y) {
	var xType = Type$5G(x);
	var yType = Type$5G(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$6T = require$$0;

var $abs$4 = GetIntrinsic$6T('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$o = function abs(x) {
	return $abs$4(x);
};

// var modulo = require('./modulo');
var $floor$4 = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$X = function floor(x) {
	// return x - modulo(x, 1);
	return $floor$4(x);
};

var abs$n = abs$o;
var floor$W = floor$X;

var $isNaN$I = _isNaN;
var $isFinite$C = _isFinite;

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger$E = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN$I(argument) || !$isFinite$C(argument)) {
		return false;
	}
	var absValue = abs$n(argument);
	return floor$W(absValue) === absValue;
};

var GetIntrinsic$6S = require$$0;

var IsInteger$D = IsInteger$E;
var Type$5F = Type$5J;

var MAX_SAFE_INTEGER$b = maxSafeInteger;
var isLeadingSurrogate$b = isLeadingSurrogate$d;
var isTrailingSurrogate$b = isTrailingSurrogate$d;

var $TypeError$5F = GetIntrinsic$6S('%TypeError%');

var $charCodeAt$c = require$$1('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex$a = function AdvanceStringIndex(S, index, unicode) {
	if (Type$5F(S) !== 'String') {
		throw new $TypeError$5F('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$D(index) || index < 0 || index > MAX_SAFE_INTEGER$b) {
		throw new $TypeError$5F('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$5F(unicode) !== 'Boolean') {
		throw new $TypeError$5F('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt$c(S, index);
	if (!isLeadingSurrogate$b(first)) {
		return index + 1;
	}

	var second = $charCodeAt$c(S, index + 1);
	if (!isTrailingSurrogate$b(second)) {
		return index + 1;
	}

	return index + 2;
};

var GetIntrinsic$6R = require$$0;

var $ArrayPrototype$4 = GetIntrinsic$6R('%Array.prototype%');
var $RangeError$h = GetIntrinsic$6R('%RangeError%');
var $SyntaxError$o = GetIntrinsic$6R('%SyntaxError%');
var $TypeError$5E = GetIntrinsic$6R('%TypeError%');

var IsInteger$C = IsInteger$E;

var MAX_ARRAY_LENGTH$4 = Math.pow(2, 32) - 1;

var $setProto$9 = GetIntrinsic$6R('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype$4
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate$4 = function ArrayCreate(length) {
	if (!IsInteger$C(length) || length < 0) {
		throw new $TypeError$5E('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH$4) {
		throw new $RangeError$h('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype$4;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype$4) { // step 8
		if (!$setProto$9) {
			throw new $SyntaxError$o('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto$9(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var GetIntrinsic$6Q = require$$0;

var $Array$9 = GetIntrinsic$6Q('%Array%');

// eslint-disable-next-line global-require
var toStr$4 = !$Array$9.isArray && require$$1('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray$Z = $Array$9.isArray || function IsArray(argument) {
	return toStr$4(argument) === '[object Array]';
};

var has$B = require$$0$1;

var assertRecord$o = assertRecord$y;

var Type$5E = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor$A = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$o(Type$5E, 'Property Descriptor', 'Desc', Desc);

	if (!has$B(Desc, '[[Get]]') && !has$B(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var has$A = require$$0$1;

var assertRecord$n = assertRecord$y;

var Type$5D = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor$P = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$n(Type$5D, 'Property Descriptor', 'Desc', Desc);

	if (!has$A(Desc, '[[Value]]') && !has$A(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$6P = require$$0;

var $Object$e = GetIntrinsic$6P('%Object%');

var isPrimitive$9 = requireIsPrimitive();

var $preventExtensions$9 = $Object$e.preventExtensions;
var $isExtensible$4 = $Object$e.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible$r = $preventExtensions$9
	? function IsExtensible(obj) {
		return !isPrimitive$9(obj) && $isExtensible$4(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive$9(obj);
	};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$1r = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$t = function ToBoolean(value) { return !!value; };

var IsCallable$A = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$A));

var has$z = require$$0$1;

var GetIntrinsic$6O = require$$0;

var $TypeError$5D = GetIntrinsic$6O('%TypeError%');

var Type$5C = Type$5J;
var ToBoolean$s = ToBoolean$t;
var IsCallable$z = IsCallable$A.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$t = function ToPropertyDescriptor(Obj) {
	if (Type$5C(Obj) !== 'Object') {
		throw new $TypeError$5D('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$z(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$s(Obj.enumerable);
	}
	if (has$z(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$s(Obj.configurable);
	}
	if (has$z(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$z(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$s(Obj.writable);
	}
	if (has$z(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$z(getter)) {
			throw new $TypeError$5D('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$z(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$z(setter)) {
			throw new $TypeError$5D('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$z(desc, '[[Get]]') || has$z(desc, '[[Set]]')) && (has$z(desc, '[[Value]]') || has$z(desc, '[[Writable]]'))) {
		throw new $TypeError$5D('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $isNaN$H = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$M = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$H(x) && $isNaN$H(y);
};

var assertRecord$m = assertRecord$y;

var Type$5B = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor$o = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$m(Type$5B, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var assertRecord$l = assertRecord$y;

var IsAccessorDescriptor$z = IsAccessorDescriptor$A;
var IsDataDescriptor$O = IsDataDescriptor$P;
var Type$5A = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor$e = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$l(Type$5A, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$z(Desc) && !IsDataDescriptor$O(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$6N = require$$0;

var $TypeError$5C = GetIntrinsic$6N('%TypeError%');

var DefineOwnProperty$j = requireDefineOwnProperty();
var isPropertyDescriptor$l = isPropertyDescriptor$s;
var isSamePropertyDescriptor$4 = requireIsSamePropertyDescriptor();

var FromPropertyDescriptor$n = FromPropertyDescriptor$o;
var IsAccessorDescriptor$y = IsAccessorDescriptor$A;
var IsDataDescriptor$N = IsDataDescriptor$P;
var IsGenericDescriptor$d = IsGenericDescriptor$e;
var IsPropertyKey$1q = IsPropertyKey$1r;
var SameValue$L = SameValue$M;
var Type$5z = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor$9 = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$5z(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$5C('Assertion failed: O must be undefined or an Object');
	}
	if (Type$5z(extensible) !== 'Boolean') {
		throw new $TypeError$5C('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor$l({
		Type: Type$5z,
		IsDataDescriptor: IsDataDescriptor$N,
		IsAccessorDescriptor: IsAccessorDescriptor$y
	}, Desc)) {
		throw new $TypeError$5C('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$5z(current) !== 'Undefined' && !isPropertyDescriptor$l({
		Type: Type$5z,
		IsDataDescriptor: IsDataDescriptor$N,
		IsAccessorDescriptor: IsAccessorDescriptor$y
	}, current)) {
		throw new $TypeError$5C('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey$1q(P)) {
		throw new $TypeError$5C('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$5z(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor$d(Desc) || IsDataDescriptor$N(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$j(
					IsDataDescriptor$N,
					SameValue$L,
					FromPropertyDescriptor$n,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor$y(Desc)) {
				throw new $TypeError$5C('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty$j(
					IsDataDescriptor$N,
					SameValue$L,
					FromPropertyDescriptor$n,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor$d(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor$4({ SameValue: SameValue$L }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor$d(Desc)) ; else if (IsDataDescriptor$N(current) !== IsDataDescriptor$N(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor$N(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$j(
					IsDataDescriptor$N,
					SameValue$L,
					FromPropertyDescriptor$n,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty$j(
				IsDataDescriptor$N,
				SameValue$L,
				FromPropertyDescriptor$n,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor$N(current) && IsDataDescriptor$N(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue$L(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor$y(current) && IsAccessorDescriptor$y(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue$L(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue$L(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$5C('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty$j(
			IsDataDescriptor$N,
			SameValue$L,
			FromPropertyDescriptor$n,
			O,
			P,
			Desc
		);
	}
	return true;
};

var GetIntrinsic$6M = require$$0;

var $gOPD$j = getOwnPropertyDescriptor;
var $SyntaxError$n = GetIntrinsic$6M('%SyntaxError%');
var $TypeError$5B = GetIntrinsic$6M('%TypeError%');

var isPropertyDescriptor$k = isPropertyDescriptor$s;

var IsAccessorDescriptor$x = IsAccessorDescriptor$A;
var IsDataDescriptor$M = IsDataDescriptor$P;
var IsExtensible$q = IsExtensible$r;
var IsPropertyKey$1p = IsPropertyKey$1r;
var ToPropertyDescriptor$s = ToPropertyDescriptor$t;
var SameValue$K = SameValue$M;
var Type$5y = Type$5J;
var ValidateAndApplyPropertyDescriptor$8 = ValidateAndApplyPropertyDescriptor$9;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty$9 = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$5y(O) !== 'Object') {
		throw new $TypeError$5B('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$1p(P)) {
		throw new $TypeError$5B('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor$k({
		Type: Type$5y,
		IsDataDescriptor: IsDataDescriptor$M,
		IsAccessorDescriptor: IsAccessorDescriptor$x
	}, Desc)) {
		throw new $TypeError$5B('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD$j) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor$x(Desc)) {
			throw new $SyntaxError$n('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue$K(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$n('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD$j(O, P);
	var current = desc && ToPropertyDescriptor$s(desc);
	var extensible = IsExtensible$q(O);
	return ValidateAndApplyPropertyDescriptor$8(O, P, extensible, Desc, current);
};

var GetIntrinsic$6L = require$$0;

var $match$4 = GetIntrinsic$6L('%Symbol.match%', true);

var hasRegExpMatcher$4 = require$$1$2;

var ToBoolean$r = ToBoolean$t;

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp$9 = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match$4) {
		var isRegExp = argument[$match$4];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean$r(isRegExp);
		}
	}
	return hasRegExpMatcher$4(argument);
};

var GetIntrinsic$6K = require$$0;

var $gOPD$i = getOwnPropertyDescriptor;
var $TypeError$5A = GetIntrinsic$6K('%TypeError%');

var callBound$1k = require$$1;

var $isEnumerable$b = callBound$1k('Object.prototype.propertyIsEnumerable');

var has$y = require$$0$1;

var IsArray$Y = IsArray$Z;
var IsPropertyKey$1o = IsPropertyKey$1r;
var IsRegExp$8 = IsRegExp$9;
var ToPropertyDescriptor$r = ToPropertyDescriptor$t;
var Type$5x = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty$e = function OrdinaryGetOwnProperty(O, P) {
	if (Type$5x(O) !== 'Object') {
		throw new $TypeError$5A('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$1o(P)) {
		throw new $TypeError$5A('Assertion failed: P must be a Property Key');
	}
	if (!has$y(O, P)) {
		return void 0;
	}
	if (!$gOPD$i) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray$Y(O) && P === 'length';
		var regexLastIndex = IsRegExp$8(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$b(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor$r($gOPD$i(O, P));
};

var GetIntrinsic$6J = require$$0;

var $String$d = GetIntrinsic$6J('%String%');
var $TypeError$5z = GetIntrinsic$6J('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$G = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$5z('Cannot convert a Symbol value to a string');
	}
	return $String$d(argument);
};

var ToNumber$Y = ToNumber$$;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$d = function ToUint32(x) {
	return ToNumber$Y(x) >>> 0;
};

var GetIntrinsic$6I = require$$0;

var $RangeError$g = GetIntrinsic$6I('%RangeError%');
var $TypeError$5y = GetIntrinsic$6I('%TypeError%');

var assign$5 = require$$1$3;

var isPropertyDescriptor$j = isPropertyDescriptor$s;

var IsArray$X = IsArray$Z;
var IsAccessorDescriptor$w = IsAccessorDescriptor$A;
var IsDataDescriptor$L = IsDataDescriptor$P;
var OrdinaryDefineOwnProperty$8 = OrdinaryDefineOwnProperty$9;
var OrdinaryGetOwnProperty$d = OrdinaryGetOwnProperty$e;
var ToNumber$X = ToNumber$$;
var ToString$F = ToString$G;
var ToUint32$c = ToUint32$d;
var Type$5w = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength$4 = function ArraySetLength(A, Desc) {
	if (!IsArray$X(A)) {
		throw new $TypeError$5y('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor$j({
		Type: Type$5w,
		IsDataDescriptor: IsDataDescriptor$L,
		IsAccessorDescriptor: IsAccessorDescriptor$w
	}, Desc)) {
		throw new $TypeError$5y('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty$8(A, 'length', Desc);
	}
	var newLenDesc = assign$5({}, Desc);
	var newLen = ToUint32$c(Desc['[[Value]]']);
	var numberLen = ToNumber$X(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$g('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty$d(A, 'length');
	if (!IsDataDescriptor$L(oldLenDesc)) {
		throw new $TypeError$5y('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty$8(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty$8(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString$F(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty$8(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty$8(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

var GetIntrinsic$6H = require$$0;

var $TypeError$5x = GetIntrinsic$6H('%TypeError%');

var inspect$c = require$$1$4;

var IsPropertyKey$1n = IsPropertyKey$1r;
var Type$5v = Type$5J;

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get$T = function Get(O, P) {
	// 7.3.1.1
	if (Type$5v(O) !== 'Object') {
		throw new $TypeError$5x('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey$1n(P)) {
		throw new $TypeError$5x('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect$c(P));
	}
	// 7.3.1.3
	return O[P];
};

var IsConstructor$j = {exports: {}};

var GetIntrinsic$6G = require$$0;

var $TypeError$5w = GetIntrinsic$6G('%TypeError%');

var isPropertyDescriptor$i = isPropertyDescriptor$s;
var DefineOwnProperty$i = requireDefineOwnProperty();

var FromPropertyDescriptor$m = FromPropertyDescriptor$o;
var IsAccessorDescriptor$v = IsAccessorDescriptor$A;
var IsDataDescriptor$K = IsDataDescriptor$P;
var IsPropertyKey$1m = IsPropertyKey$1r;
var SameValue$J = SameValue$M;
var ToPropertyDescriptor$q = ToPropertyDescriptor$t;
var Type$5u = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow$r = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$5u(O) !== 'Object') {
		throw new $TypeError$5w('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$1m(P)) {
		throw new $TypeError$5w('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor$i({
		Type: Type$5u,
		IsDataDescriptor: IsDataDescriptor$K,
		IsAccessorDescriptor: IsAccessorDescriptor$v
	}, desc) ? desc : ToPropertyDescriptor$q(desc);
	if (!isPropertyDescriptor$i({
		Type: Type$5u,
		IsDataDescriptor: IsDataDescriptor$K,
		IsAccessorDescriptor: IsAccessorDescriptor$v
	}, Desc)) {
		throw new $TypeError$5w('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty$i(
		IsDataDescriptor$K,
		SameValue$J,
		FromPropertyDescriptor$m,
		O,
		P,
		Desc
	);
};

var GetIntrinsic$6F = GetIntrinsic$7K.exports;

var $construct$4 = GetIntrinsic$6F('%Reflect.construct%', true);

var DefinePropertyOrThrow$q = DefinePropertyOrThrow$r;
try {
	DefinePropertyOrThrow$q({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow$q = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow$q && $construct$4) {
	var isConstructorMarker$4 = {};
	var badArrayLike$4 = {};
	DefinePropertyOrThrow$q(badArrayLike$4, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker$4;
		},
		'[[Enumerable]]': true
	});

	IsConstructor$j.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct$4(argument, badArrayLike$4);
		} catch (err) {
			return err === isConstructorMarker$4;
		}
	};
} else {
	IsConstructor$j.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

var GetIntrinsic$6E = require$$0;

var $Array$8 = GetIntrinsic$6E('%Array%');
var $species$9 = GetIntrinsic$6E('%Symbol.species%', true);
var $TypeError$5v = GetIntrinsic$6E('%TypeError%');

var Get$S = Get$T;
var IsArray$W = IsArray$Z;
var IsConstructor$i = IsConstructor$j.exports;
var IsInteger$B = IsInteger$E;
var Type$5t = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate$4 = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger$B(length) || length < 0) {
		throw new $TypeError$5v('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray$W(originalArray);
	if (isArray) {
		C = Get$S(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species$9 && Type$5t(C) === 'Object') {
			C = Get$S(C, $species$9);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array$8(len);
	}
	if (!IsConstructor$i(C)) {
		throw new $TypeError$5v('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var GetIntrinsic$6D = require$$0;
var callBound$1j = require$$1;

var $TypeError$5u = GetIntrinsic$6D('%TypeError%');

var IsArray$V = IsArray$Z;

var $apply$4 = GetIntrinsic$6D('%Reflect.apply%', true) || callBound$1j('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

var Call$x = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$V(argumentsList)) {
		throw new $TypeError$5u('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply$4(F, V, argumentsList);
};

var GetIntrinsic$6C = require$$0;

var $TypeError$5t = GetIntrinsic$6C('%TypeError%');

var SameValue$I = SameValue$M;
var ToNumber$W = ToNumber$$;
var ToString$E = ToString$G;
var Type$5s = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString$8 = function CanonicalNumericIndexString(argument) {
	if (Type$5s(argument) !== 'String') {
		throw new $TypeError$5t('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber$W(argument);
	if (SameValue$I(ToString$E(n), argument)) { return n; }
	return void 0;
};

var has$x = require$$0$1;

var assertRecord$k = assertRecord$y;

var IsDataDescriptor$J = IsDataDescriptor$P;
var IsGenericDescriptor$c = IsGenericDescriptor$e;
var Type$5r = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor$4 = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord$k(Type$5r, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor$c(Desc) || IsDataDescriptor$J(Desc)) {
		if (!has$x(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has$x(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has$x(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has$x(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has$x(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has$x(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var GetIntrinsic$6B = require$$0;

var $TypeError$5s = GetIntrinsic$6B('%TypeError%');

var DefineOwnProperty$h = requireDefineOwnProperty();

var FromPropertyDescriptor$l = FromPropertyDescriptor$o;
var OrdinaryGetOwnProperty$c = OrdinaryGetOwnProperty$e;
var IsDataDescriptor$I = IsDataDescriptor$P;
var IsExtensible$p = IsExtensible$r;
var IsPropertyKey$1l = IsPropertyKey$1r;
var SameValue$H = SameValue$M;
var Type$5q = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty$b = function CreateDataProperty(O, P, V) {
	if (Type$5q(O) !== 'Object') {
		throw new $TypeError$5s('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$1l(P)) {
		throw new $TypeError$5s('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty$c(O, P);
	var extensible = !oldDesc || IsExtensible$p(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty$h(
		IsDataDescriptor$I,
		SameValue$H,
		FromPropertyDescriptor$l,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var GetIntrinsic$6A = require$$0;

var $TypeError$5r = GetIntrinsic$6A('%TypeError%');

var CreateDataProperty$a = CreateDataProperty$b;
var IsPropertyKey$1k = IsPropertyKey$1r;
var Type$5p = Type$5J;

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$7 = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$5p(O) !== 'Object') {
		throw new $TypeError$5r('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$1k(P)) {
		throw new $TypeError$5r('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty$a(O, P, V);
	if (!success) {
		throw new $TypeError$5r('unable to create data property');
	}
	return success;
};

var RequireObjectCoercible$g = {exports: {}};

(function (module) {

	module.exports = CheckObjectCoercible$1;
} (RequireObjectCoercible$g));

var GetIntrinsic$6z = require$$0;

var $TypeError$5q = GetIntrinsic$6z('%TypeError%');

var callBound$1i = require$$1;

var $replace$8 = callBound$1i('String.prototype.replace');

var RequireObjectCoercible$f = RequireObjectCoercible$g.exports;
var ToString$D = ToString$G;
var Type$5o = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML$4 = function CreateHTML(string, tag, attribute, value) {
	if (Type$5o(tag) !== 'String' || Type$5o(attribute) !== 'String') {
		throw new $TypeError$5q('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible$f(string);
	var S = ToString$D(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString$D(value);
		var escapedV = $replace$8(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var GetIntrinsic$6y = require$$0;

var $TypeError$5p = GetIntrinsic$6y('%TypeError%');

var Type$5n = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject$4 = function CreateIterResultObject(value, done) {
	if (Type$5n(done) !== 'Boolean') {
		throw new $TypeError$5p('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

var ES5ToInteger$4 = ToInteger$u;

var ToNumber$V = ToNumber$$;

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

var ToInteger$n = function ToInteger(value) {
	var number = ToNumber$V(value);
	return ES5ToInteger$4(number);
};

var MAX_SAFE_INTEGER$a = maxSafeInteger;

var ToInteger$m = ToInteger$n;

var ToLength$f = function ToLength(argument) {
	var len = ToInteger$m(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER$a) { return MAX_SAFE_INTEGER$a; }
	return len;
};

var GetIntrinsic$6x = require$$0;

var callBound$1h = require$$1;

var $TypeError$5o = GetIntrinsic$6x('%TypeError%');
var $indexOf$7 = callBound$1h('Array.prototype.indexOf', true) || callBound$1h('String.prototype.indexOf');
var $push$5 = callBound$1h('Array.prototype.push');

var Get$R = Get$T;
var IsArray$U = IsArray$Z;
var ToLength$e = ToLength$f;
var ToString$C = ToString$G;
var Type$5m = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
var CreateListFromArrayLike$4 = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$5m(obj) !== 'Object') {
		throw new $TypeError$5o('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray$U(elementTypes)) {
		throw new $TypeError$5o('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength$e(Get$R(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString$C(index);
		var next = Get$R(obj, indexName);
		var nextType = Type$5m(next);
		if ($indexOf$7(elementTypes, nextType) < 0) {
			throw new $TypeError$5o('item type ' + nextType + ' is not a valid elementType');
		}
		$push$5(list, next);
		index += 1;
	}
	return list;
};

var GetIntrinsic$6w = require$$0;

var $TypeError$5n = GetIntrinsic$6w('%TypeError%');

var DefineOwnProperty$g = requireDefineOwnProperty();

var FromPropertyDescriptor$k = FromPropertyDescriptor$o;
var IsDataDescriptor$H = IsDataDescriptor$P;
var IsPropertyKey$1j = IsPropertyKey$1r;
var SameValue$G = SameValue$M;
var Type$5l = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty$4 = function CreateMethodProperty(O, P, V) {
	if (Type$5l(O) !== 'Object') {
		throw new $TypeError$5n('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$1j(P)) {
		throw new $TypeError$5n('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty$g(
		IsDataDescriptor$H,
		SameValue$G,
		FromPropertyDescriptor$k,
		O,
		P,
		newDesc
	);
};

var floor$V = floor$X;

var msPerDay$j = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$j = function Day(t) {
	return floor$V(t / msPerDay$j);
};

var floor$U = floor$X;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$e = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$U((y - 1969) / 4) - floor$U((y - 1901) / 100) + floor$U((y - 1601) / 400);
};

var GetIntrinsic$6v = require$$0;

var $Date$e = GetIntrinsic$6v('%Date%');

var callBound$1g = require$$1;

var $getUTCFullYear$4 = callBound$1g('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$m = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear$4(new $Date$e(t));
};

var Day$i = Day$j;
var DayFromYear$d = DayFromYear$e;
var YearFromTime$l = YearFromTime$m;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$e = function DayWithinYear(t) {
	return Day$i(t) - DayFromYear$d(YearFromTime$l(t));
};

var mod$4 = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$X = function modulo(x, y) {
	return mod$4(x, y);
};

var modulo$W = modulo$X;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$9 = function DaysInYear(y) {
	if (modulo$W(y, 4) !== 0) {
		return 365;
	}
	if (modulo$W(y, 100) !== 0) {
		return 366;
	}
	if (modulo$W(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$6u = require$$0;

var $EvalError$9 = GetIntrinsic$6u('%EvalError%');

var DaysInYear$8 = DaysInYear$9;
var YearFromTime$k = YearFromTime$m;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$e = function InLeapYear(t) {
	var days = DaysInYear$8(YearFromTime$k(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$9('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$d = DayWithinYear$e;
var InLeapYear$d = InLeapYear$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$h = function MonthFromTime(t) {
	var day = DayWithinYear$d(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$d(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$6t = require$$0;

var $EvalError$8 = GetIntrinsic$6t('%EvalError%');

var DayWithinYear$c = DayWithinYear$e;
var InLeapYear$c = InLeapYear$e;
var MonthFromTime$g = MonthFromTime$h;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$c = function DateFromTime(t) {
	var m = MonthFromTime$g(t);
	var d = DayWithinYear$c(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear$c(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$8('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var GetIntrinsic$6s = require$$0;

var $TypeError$5m = GetIntrinsic$6s('%TypeError%');

var IsPropertyKey$1i = IsPropertyKey$1r;
var Type$5k = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow$4 = function DeletePropertyOrThrow(O, P) {
	if (Type$5k(O) !== 'Object') {
		throw new $TypeError$5m('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$1i(P)) {
		throw new $TypeError$5m('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$5m('Attempt to delete property failed.');
	}
	return success;
};

var GetIntrinsic$6r = require$$0;

var $TypeError$5l = GetIntrinsic$6r('%TypeError%');

var keys$5 = require$$1$5;

var Type$5j = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-enumerableownnames

var EnumerableOwnNames = function EnumerableOwnNames(O) {
	if (Type$5j(O) !== 'Object') {
		throw new $TypeError$5l('Assertion failed: Type(O) is not Object');
	}

	return keys$5(O);
};

var GetIntrinsic$6q = require$$0;

var $Object$d = GetIntrinsic$6q('%Object%');

var RequireObjectCoercible$e = RequireObjectCoercible$g.exports;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$g = function ToObject(value) {
	RequireObjectCoercible$e(value);
	return $Object$d(value);
};

var GetIntrinsic$6p = require$$0;

var $TypeError$5k = GetIntrinsic$6p('%TypeError%');

var IsPropertyKey$1h = IsPropertyKey$1r;
var ToObject$f = ToObject$g;

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV$e = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey$1h(P)) {
		throw new $TypeError$5k('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject$f(V);

	// 7.3.2.4
	return O[P];
};

var GetIntrinsic$6o = require$$0;

var $TypeError$5j = GetIntrinsic$6o('%TypeError%');

var GetV$d = GetV$e;
var IsCallable$y = IsCallable$A.exports;
var IsPropertyKey$1g = IsPropertyKey$1r;

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$k = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey$1g(P)) {
		throw new $TypeError$5j('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV$d(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable$y(func)) {
		throw new $TypeError$5j(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var GetIntrinsic$6n = require$$0;

var $TypeError$5i = GetIntrinsic$6n('%TypeError%');

var getIteratorMethod$5 = requireGetIteratorMethod();
var AdvanceStringIndex$9 = AdvanceStringIndex$a;
var Call$w = Call$x;
var GetMethod$j = GetMethod$k;
var IsArray$T = IsArray$Z;
var Type$5i = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator$b = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod$5(
			{
				AdvanceStringIndex: AdvanceStringIndex$9,
				GetMethod: GetMethod$j,
				IsArray: IsArray$T,
				Type: Type$5i
			},
			obj
		);
	}
	var iterator = Call$w(actualMethod, obj);
	if (Type$5i(iterator) !== 'Object') {
		throw new $TypeError$5i('iterator must return an object');
	}

	return iterator;
};

var GetIntrinsic$6m = require$$0;

var hasSymbols$5 = require$$1$6();

var $TypeError$5h = GetIntrinsic$6m('%TypeError%');

var $gOPN$e = GetIntrinsic$6m('%Object.getOwnPropertyNames%');
var $gOPS$4 = hasSymbols$5 && GetIntrinsic$6m('%Object.getOwnPropertySymbols%');
var keys$4 = require$$1$5;

var esType$4 = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys$4 = function GetOwnPropertyKeys(O, Type) {
	if (esType$4(O) !== 'Object') {
		throw new $TypeError$5h('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS$4 ? $gOPS$4(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$e) {
			return keys$4(O);
		}
		return $gOPN$e(O);
	}
	throw new $TypeError$5h('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var GetIntrinsic$6l = require$$0;

var $Function$4 = GetIntrinsic$6l('%Function%');
var $TypeError$5g = GetIntrinsic$6l('%TypeError%');

var Get$Q = Get$T;
var IsConstructor$h = IsConstructor$j.exports;
var Type$5h = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor$9 = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic$6l(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor$h(constructor)) {
		throw new $TypeError$5g('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get$Q(constructor, 'prototype');
	if (Type$5h(proto) !== 'Object') {
		if (!(constructor instanceof $Function$4)) {
			// ignore other realms, for now
			throw new $TypeError$5g('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var GetIntrinsic$6k = require$$0;

var $TypeError$5f = GetIntrinsic$6k('%TypeError%');
var $parseInt$4 = GetIntrinsic$6k('%parseInt%');

var inspect$b = require$$1$4;

var regexTester$8 = requireRegexTester();
var callBound$1f = require$$1;
var every$a = requireEvery();

var isDigit$4 = regexTester$8(/^[0-9]$/);

var $charAt$e = callBound$1f('String.prototype.charAt');
var $strSlice$d = callBound$1f('String.prototype.slice');

var IsArray$S = IsArray$Z;
var IsInteger$A = IsInteger$E;
var Type$5g = Type$5J;

var canDistinguishSparseFromUndefined$4 = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole$4 = function (capture, index, arr) {
	return Type$5g(capture) === 'String' || (canDistinguishSparseFromUndefined$4 ? !(index in arr) : Type$5g(capture) === 'Undefined');
};

// https://ecma-international.org/ecma-262/6.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution$4 = function GetSubstitution(matched, str, position, captures, replacement) {
	if (Type$5g(matched) !== 'String') {
		throw new $TypeError$5f('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$5g(str) !== 'String') {
		throw new $TypeError$5f('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger$A(position) || position < 0 || position > stringLength) {
		throw new $TypeError$5f('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect$b(position));
	}

	if (!IsArray$S(captures) || !every$a(captures, isStringOrHole$4)) {
		throw new $TypeError$5f('Assertion failed: `captures` must be a List of Strings, got ' + inspect$b(captures));
	}

	if (Type$5g(replacement) !== 'String') {
		throw new $TypeError$5f('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt$e(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt$e(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$d(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$d(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt$e(replacement, i + 2);
				if (isDigit$4(next) && next !== '0' && (nextIsLast || !isDigit$4(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt$4(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type$5g(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit$4(next) && (nextIsLast || isDigit$4(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt$4(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type$5g(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt$e(replacement, i);
		}
	}
	return result;
};

var GetIntrinsic$6j = require$$0;

var $TypeError$5e = GetIntrinsic$6j('%TypeError%');

var has$w = require$$0$1;

var IsPropertyKey$1f = IsPropertyKey$1r;
var Type$5f = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$7 = function HasOwnProperty(O, P) {
	if (Type$5f(O) !== 'Object') {
		throw new $TypeError$5e('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1f(P)) {
		throw new $TypeError$5e('Assertion failed: `P` must be a Property Key');
	}
	return has$w(O, P);
};

var GetIntrinsic$6i = require$$0;

var $TypeError$5d = GetIntrinsic$6i('%TypeError%');

var IsPropertyKey$1e = IsPropertyKey$1r;
var Type$5e = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty$6 = function HasProperty(O, P) {
	if (Type$5e(O) !== 'Object') {
		throw new $TypeError$5d('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1e(P)) {
		throw new $TypeError$5d('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var floor$T = floor$X;
var modulo$V = modulo$X;

var timeConstants$j = timeConstants$s;
var msPerHour$9 = timeConstants$j.msPerHour;
var HoursPerDay$4 = timeConstants$j.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$7 = function HourFromTime(t) {
	return modulo$V(floor$T(t / msPerHour$9), HoursPerDay$4);
};

var GetIntrinsic$6h = require$$0;

var $TypeError$5c = GetIntrinsic$6h('%TypeError%');

var Get$P = Get$T;
var IsCallable$x = IsCallable$A.exports;
var Type$5d = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance$9 = function OrdinaryHasInstance(C, O) {
	if (IsCallable$x(C) === false) {
		return false;
	}
	if (Type$5d(O) !== 'Object') {
		return false;
	}
	var P = Get$P(C, 'prototype');
	if (Type$5d(P) !== 'Object') {
		throw new $TypeError$5c('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var GetIntrinsic$6g = require$$0;

var $TypeError$5b = GetIntrinsic$6g('%TypeError%');

var $hasInstance$4 = GetIntrinsic$6g('Symbol.hasInstance', true);

var Call$v = Call$x;
var GetMethod$i = GetMethod$k;
var IsCallable$w = IsCallable$A.exports;
var OrdinaryHasInstance$8 = OrdinaryHasInstance$9;
var ToBoolean$q = ToBoolean$t;
var Type$5c = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator$4 = function InstanceofOperator(O, C) {
	if (Type$5c(O) !== 'Object') {
		throw new $TypeError$5b('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance$4 ? GetMethod$i(C, $hasInstance$4) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean$q(Call$v(instOfHandler, C, [O]));
	}
	if (!IsCallable$w(C)) {
		throw new $TypeError$5b('`C` is not Callable');
	}
	return OrdinaryHasInstance$8(C, O);
};

var GetIntrinsic$6f = require$$0;

var $TypeError$5a = GetIntrinsic$6f('%TypeError%');

var Call$u = Call$x;
var IsArray$R = IsArray$Z;
var GetV$c = GetV$e;
var IsPropertyKey$1d = IsPropertyKey$1r;

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke$9 = function Invoke(O, P) {
	if (!IsPropertyKey$1d(P)) {
		throw new $TypeError$5a('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$R(argumentsList)) {
		throw new $TypeError$5a('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV$c(O, P);
	return Call$u(func, O, argumentsList);
};

var GetIntrinsic$6e = require$$0;

var $isConcatSpreadable$4 = GetIntrinsic$6e('%Symbol.isConcatSpreadable%', true);

var Get$O = Get$T;
var IsArray$Q = IsArray$Z;
var ToBoolean$p = ToBoolean$t;
var Type$5b = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable$4 = function IsConcatSpreadable(O) {
	if (Type$5b(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable$4) {
		var spreadable = Get$O(O, $isConcatSpreadable$4);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean$p(spreadable);
		}
	}
	return IsArray$Q(O);
};

var callBound$1e = require$$1;

var $PromiseThen$4 = callBound$1e('Promise.prototype.then', true);

var Type$5a = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise$4 = function IsPromise(x) {
	if (Type$5a(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen$4) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen$4(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

// TODO, semver-major: delete this

var isPropertyDescriptor$h = isPropertyDescriptor$s;

var Type$59 = Type$5J;
var IsDataDescriptor$G = IsDataDescriptor$P;
var IsAccessorDescriptor$u = IsAccessorDescriptor$A;

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

var IsPropertyDescriptor$1 = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor$h({
		IsDataDescriptor: IsDataDescriptor$G,
		IsAccessorDescriptor: IsAccessorDescriptor$u,
		Type: Type$59
	}, Desc);
};

var GetIntrinsic$6d = require$$0;

var $TypeError$59 = GetIntrinsic$6d('%TypeError%');

var Get$N = Get$T;
var ToBoolean$o = ToBoolean$t;
var Type$58 = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete$9 = function IteratorComplete(iterResult) {
	if (Type$58(iterResult) !== 'Object') {
		throw new $TypeError$59('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean$o(Get$N(iterResult, 'done'));
};

var GetIntrinsic$6c = require$$0;

var $TypeError$58 = GetIntrinsic$6c('%TypeError%');

var Invoke$8 = Invoke$9;
var Type$57 = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext$9 = function IteratorNext(iterator, value) {
	var result = Invoke$8(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$57(result) !== 'Object') {
		throw new $TypeError$58('iterator next must return an object');
	}
	return result;
};

var IteratorComplete$8 = IteratorComplete$9;
var IteratorNext$8 = IteratorNext$9;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep$b = function IteratorStep(iterator) {
	var result = IteratorNext$8(iterator);
	var done = IteratorComplete$8(result);
	return done === true ? false : result;
};

var GetIntrinsic$6b = require$$0;

var $TypeError$57 = GetIntrinsic$6b('%TypeError%');

var Get$M = Get$T;
var Type$56 = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue$b = function IteratorValue(iterResult) {
	if (Type$56(iterResult) !== 'Object') {
		throw new $TypeError$57('Assertion failed: Type(iterResult) is not Object');
	}
	return Get$M(iterResult, 'value');
};

var callBound$1d = require$$1;
var $arrayPush$4 = callBound$1d('Array.prototype.push');

var getIteratorMethod$4 = requireGetIteratorMethod();
var AdvanceStringIndex$8 = AdvanceStringIndex$a;
var GetIterator$a = GetIterator$b;
var GetMethod$h = GetMethod$k;
var IsArray$P = IsArray$Z;
var IteratorStep$a = IteratorStep$b;
var IteratorValue$a = IteratorValue$b;
var ToObject$e = ToObject$g;
var Type$55 = Type$5J;
var ES$1 = {
	AdvanceStringIndex: AdvanceStringIndex$8,
	GetMethod: GetMethod$h,
	IsArray: IsArray$P,
	Type: Type$55
};

// https://262.ecma-international.org/7.0/#sec-iterabletoarraylike
/**
 * 1. Let usingIterator be ? GetMethod(items, @@iterator).
 * 2. If usingIterator is not undefined, then
 *    1. Let iterator be ? GetIterator(items, usingIterator).
 *    2. Let values be a new empty List.
 *    3. Let next be true.
 *    4. Repeat, while next is not false
 *       1. Let next be ? IteratorStep(iterator).
 *       2. If next is not false, then
 *          1. Let nextValue be ? IteratorValue(next).
 *          2. Append nextValue to the end of the List values.
 *    5. Return CreateArrayFromList(values).
 * 3. NOTE: items is not an Iterable so assume it is already an array-like object.
 * 4. Return ! ToObject(items).
 */

var IterableToArrayLike = function IterableToArrayLike(items) {
	var usingIterator = getIteratorMethod$4(ES$1, items);
	if (typeof usingIterator !== 'undefined') {
		var iterator = GetIterator$a(items, usingIterator);
		var values = [];
		var next = true;
		while (next) {
			next = IteratorStep$a(iterator);
			if (next) {
				var nextValue = IteratorValue$a(next);
				$arrayPush$4(values, nextValue);
			}
		}
		return values;
	}

	return ToObject$e(items);
};

var GetIntrinsic$6a = require$$0;

var $TypeError$56 = GetIntrinsic$6a('%TypeError%');

var Call$t = Call$x;
var GetMethod$g = GetMethod$k;
var IsCallable$v = IsCallable$A.exports;
var Type$54 = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose$6 = function IteratorClose(iterator, completion) {
	if (Type$54(iterator) !== 'Object') {
		throw new $TypeError$56('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable$v(completion)) {
		throw new $TypeError$56('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$g(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call$t(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$54(innerResult) !== 'Object') {
		throw new $TypeError$56('iterator .return must return an object');
	}

	return completionRecord;
};

var $isFinite$B = _isFinite;
var msPerDay$i = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate$4 = function MakeDate(day, time) {
	if (!$isFinite$B(day) || !$isFinite$B(time)) {
		return NaN;
	}
	return (day * msPerDay$i) + time;
};

var GetIntrinsic$69 = require$$0;

var $DateUTC$4 = GetIntrinsic$69('%Date.UTC%');

var $isFinite$A = _isFinite;

var DateFromTime$b = DateFromTime$c;
var Day$h = Day$j;
var floor$S = floor$X;
var modulo$U = modulo$X;
var MonthFromTime$f = MonthFromTime$h;
var ToInteger$l = ToInteger$n;
var YearFromTime$j = YearFromTime$m;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay$4 = function MakeDay(year, month, date) {
	if (!$isFinite$A(year) || !$isFinite$A(month) || !$isFinite$A(date)) {
		return NaN;
	}
	var y = ToInteger$l(year);
	var m = ToInteger$l(month);
	var dt = ToInteger$l(date);
	var ym = y + floor$S(m / 12);
	var mn = modulo$U(m, 12);
	var t = $DateUTC$4(ym, mn, 1);
	if (YearFromTime$j(t) !== ym || MonthFromTime$f(t) !== mn || DateFromTime$b(t) !== 1) {
		return NaN;
	}
	return Day$h(t) + dt - 1;
};

var $isFinite$z = _isFinite;
var timeConstants$i = timeConstants$s;
var msPerSecond$e = timeConstants$i.msPerSecond;
var msPerMinute$9 = timeConstants$i.msPerMinute;
var msPerHour$8 = timeConstants$i.msPerHour;

var ToInteger$k = ToInteger$n;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime$4 = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$z(hour) || !$isFinite$z(min) || !$isFinite$z(sec) || !$isFinite$z(ms)) {
		return NaN;
	}
	var h = ToInteger$k(hour);
	var m = ToInteger$k(min);
	var s = ToInteger$k(sec);
	var milli = ToInteger$k(ms);
	var t = (h * msPerHour$8) + (m * msPerMinute$9) + (s * msPerSecond$e) + milli;
	return t;
};

var floor$R = floor$X;
var modulo$T = modulo$X;

var timeConstants$h = timeConstants$s;
var msPerMinute$8 = timeConstants$h.msPerMinute;
var MinutesPerHour$4 = timeConstants$h.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$7 = function MinFromTime(t) {
	return modulo$T(floor$R(t / msPerMinute$8), MinutesPerHour$4);
};

var modulo$S = modulo$X;

var msPerSecond$d = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime$4 = function msFromTime(t) {
	return modulo$S(t, msPerSecond$d);
};

var GetIntrinsic$68 = require$$0;

var $ObjectCreate$4 = GetIntrinsic$68('%Object.create%', true);
var $TypeError$55 = GetIntrinsic$68('%TypeError%');
var $SyntaxError$m = GetIntrinsic$68('%SyntaxError%');

var Type$53 = Type$5J;

var hasProto$4 = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

var ObjectCreate$7 = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type$53(proto) !== 'Object') {
		throw new $TypeError$55('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError$m('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate$4) {
		return $ObjectCreate$4(proto);
	}
	if (hasProto$4) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$m('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var GetIntrinsic$67 = require$$0;
var $TypeError$54 = GetIntrinsic$67('%TypeError%');

var GetPrototypeFromConstructor$8 = GetPrototypeFromConstructor$9;
var IsArray$O = IsArray$Z;
var ObjectCreate$6 = ObjectCreate$7;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

var OrdinaryCreateFromConstructor$4 = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic$67(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor$8(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray$O(slots)) {
		throw new $TypeError$54('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate$6(proto, slots);
};

var getProto;
var hasRequiredGetProto;

function requireGetProto () {
	if (hasRequiredGetProto) return getProto;
	hasRequiredGetProto = 1;

	var GetIntrinsic = require$$0;

	var originalGetProto = GetIntrinsic('%Object.getPrototypeOf%', true);
	var $ArrayProto = GetIntrinsic('%Array.prototype%');

	getProto = originalGetProto || (
		// eslint-disable-next-line no-proto
		[].__proto__ === $ArrayProto
			? function (O) {
				return O.__proto__; // eslint-disable-line no-proto
			}
			: null
	);
	return getProto;
}

var GetIntrinsic$66 = require$$0;

var $TypeError$53 = GetIntrinsic$66('%TypeError%');

var $getProto$4 = requireGetProto();

var Type$52 = Type$5J;

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

var OrdinaryGetPrototypeOf$9 = function OrdinaryGetPrototypeOf(O) {
	if (Type$52(O) !== 'Object') {
		throw new $TypeError$53('Assertion failed: O must be an Object');
	}
	if (!$getProto$4) {
		throw new $TypeError$53('This environment does not support fetching prototypes.');
	}
	return $getProto$4(O);
};

var GetIntrinsic$65 = require$$0;

var $TypeError$52 = GetIntrinsic$65('%TypeError%');

var IsPropertyKey$1c = IsPropertyKey$1r;
var Type$51 = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty$4 = function OrdinaryHasProperty(O, P) {
	if (Type$51(O) !== 'Object') {
		throw new $TypeError$52('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$1c(P)) {
		throw new $TypeError$52('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$64 = require$$0;

var $TypeError$51 = GetIntrinsic$64('%TypeError%');

var $setProto$8 = requireSetProto();

var OrdinaryGetPrototypeOf$8 = OrdinaryGetPrototypeOf$9;
var Type$50 = Type$5J;

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf$4 = function OrdinarySetPrototypeOf(O, V) {
	if (Type$50(V) !== 'Object' && Type$50(V) !== 'Null') {
		throw new $TypeError$51('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto$8(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf$8(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

var GetIntrinsic$63 = require$$0;

var $TypeError$50 = GetIntrinsic$63('%TypeError%');

var callBound$1c = require$$1;
var forEach$g = requireForEach();

var $charCodeAt$b = callBound$1c('String.prototype.charCodeAt');
var $numberToString$4 = callBound$1c('Number.prototype.toString');
var $toLowerCase$4 = callBound$1c('String.prototype.toLowerCase');
var $strSlice$c = callBound$1c('String.prototype.slice');
var $strSplit$3 = callBound$1c('String.prototype.split');

var Type$4$ = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-quotejsonstring

var escapes$4 = {
	'\u0008': 'b',
	'\u000C': 'f',
	'\u000A': 'n',
	'\u000D': 'r',
	'\u0009': 't'
};

var QuoteJSONString$4 = function QuoteJSONString(value) {
	if (Type$4$(value) !== 'String') {
		throw new $TypeError$50('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach$g($strSplit$3(value), function (C) {
			if (C === '"' || C === '\\') {
				product += '\u005C' + C;
			} else if (C === '\u0008' || C === '\u000C' || C === '\u000A' || C === '\u000D' || C === '\u0009') {
				var abbrev = escapes$4[C];
				product += '\u005C' + abbrev;
			} else {
				var cCharCode = $charCodeAt$b(C, 0);
				if (cCharCode < 0x20) {
					product += '\u005Cu' + $toLowerCase$4($strSlice$c('0000' + $numberToString$4(cCharCode, 16), -4));
				} else {
					product += C;
				}
			}
		});
	}
	product += '"';
	return product;
};

var GetIntrinsic$62 = require$$0;

var $RegExp$8 = GetIntrinsic$62('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString$B = ToString$G;

// https://262.ecma-international.org/6.0/#sec-regexpcreate

var RegExpCreate$4 = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString$B(P);
	var flags = typeof F === 'undefined' ? '' : ToString$B(F);
	return new $RegExp$8(pattern, flags);
};

var GetIntrinsic$61 = require$$0;

var $TypeError$4$ = GetIntrinsic$61('%TypeError%');

var regexExec$4 = require$$1('RegExp.prototype.exec');

var Call$s = Call$x;
var Get$L = Get$T;
var IsCallable$u = IsCallable$A.exports;
var Type$4_ = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec$4 = function RegExpExec(R, S) {
	if (Type$4_(R) !== 'Object') {
		throw new $TypeError$4$('Assertion failed: `R` must be an Object');
	}
	if (Type$4_(S) !== 'String') {
		throw new $TypeError$4$('Assertion failed: `S` must be a String');
	}
	var exec = Get$L(R, 'exec');
	if (IsCallable$u(exec)) {
		var result = Call$s(exec, R, [S]);
		if (result === null || Type$4_(result) === 'Object') {
			return result;
		}
		throw new $TypeError$4$('"exec" method must return `null` or an Object');
	}
	return regexExec$4(R, S);
};

var GetIntrinsic$60 = require$$0;

var $TypeError$4_ = GetIntrinsic$60('%TypeError%');

var SameValue$F = SameValue$M;

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

var SameValueNonNumber$3 = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError$4_('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue$F(x, y);
};

var $isNaN$G = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero$7 = function SameValueZero(x, y) {
	return (x === y) || ($isNaN$G(x) && $isNaN$G(y));
};

var floor$Q = floor$X;
var modulo$R = modulo$X;

var timeConstants$g = timeConstants$s;
var msPerSecond$c = timeConstants$g.msPerSecond;
var SecondsPerMinute$4 = timeConstants$g.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$7 = function SecFromTime(t) {
	return modulo$R(floor$Q(t / msPerSecond$c), SecondsPerMinute$4);
};

var GetIntrinsic$5$ = require$$0;

var $TypeError$4Z = GetIntrinsic$5$('%TypeError%');

var IsPropertyKey$1b = IsPropertyKey$1r;
var SameValue$E = SameValue$M;
var Type$4Z = Type$5J;

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation$4 = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set$4 = function Set(O, P, V, Throw) {
	if (Type$4Z(O) !== 'Object') {
		throw new $TypeError$4Z('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1b(P)) {
		throw new $TypeError$4Z('Assertion failed: `P` must be a Property Key');
	}
	if (Type$4Z(Throw) !== 'Boolean') {
		throw new $TypeError$4Z('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation$4 && !SameValue$E(O[P], V)) {
			throw new $TypeError$4Z('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation$4 ? SameValue$E(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

var GetIntrinsic$5_ = require$$0;

var has$v = require$$0$1;

var $TypeError$4Y = GetIntrinsic$5_('%TypeError%');

var getSymbolDescription$4 = requireGetSymbolDescription();

var DefinePropertyOrThrow$p = DefinePropertyOrThrow$r;
var IsExtensible$o = IsExtensible$r;
var Type$4Y = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName$4 = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$4Y('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible$o(F) || has$v(F, 'name')) {
		throw new $TypeError$4Y('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$4Y(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$4Y('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription$4(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow$p(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var GetIntrinsic$5Z = require$$0;

var $SyntaxError$l = GetIntrinsic$5Z('%SyntaxError%');
var $TypeError$4X = GetIntrinsic$5Z('%TypeError%');
var $preventExtensions$8 = GetIntrinsic$5Z('%Object.preventExtensions%');
var $gOPD$h = getOwnPropertyDescriptor;
var $gOPN$d = GetIntrinsic$5Z('%Object.getOwnPropertyNames%');

var forEach$f = requireForEach();

var DefinePropertyOrThrow$o = DefinePropertyOrThrow$r;
var IsAccessorDescriptor$t = IsAccessorDescriptor$A;
var ToPropertyDescriptor$p = ToPropertyDescriptor$t;
var Type$4X = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel$4 = function SetIntegrityLevel(O, level) {
	if (Type$4X(O) !== 'Object') {
		throw new $TypeError$4X('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$4X('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions$8) {
		throw new $SyntaxError$l('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions$8(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$d) {
		throw new $SyntaxError$l('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$d(O);
	if (level === 'sealed') {
		forEach$f(theKeys, function (k) {
			DefinePropertyOrThrow$o(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach$f(theKeys, function (k) {
			var currentDesc = $gOPD$h(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor$t(ToPropertyDescriptor$p(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow$o(O, k, desc);
			}
		});
	}
	return true;
};

var GetIntrinsic$5Y = require$$0;

var $species$8 = GetIntrinsic$5Y('%Symbol.species%', true);
var $TypeError$4W = GetIntrinsic$5Y('%TypeError%');

var IsConstructor$g = IsConstructor$j.exports;
var Type$4W = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor$4 = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$4W(O) !== 'Object') {
		throw new $TypeError$4W('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$4W(C) !== 'Object') {
		throw new $TypeError$4W('O.constructor is not an Object');
	}
	var S = $species$8 ? C[$species$8] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor$g(S)) {
		return S;
	}
	throw new $TypeError$4W('no constructor found');
};

var GetIntrinsic$5X = require$$0;
var callBound$1b = require$$1;

var $TypeError$4V = GetIntrinsic$5X('%TypeError%');

var IsInteger$z = IsInteger$E;
var Type$4V = Type$5J;

var $charAt$d = callBound$1b('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

var SplitMatch$4 = function SplitMatch(S, q, R) {
	if (Type$4V(S) !== 'String') {
		throw new $TypeError$4V('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$z(q)) {
		throw new $TypeError$4V('Assertion failed: `q` must be an integer');
	}
	if (Type$4V(R) !== 'String') {
		throw new $TypeError$4V('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt$d(S, q + i) !== $charAt$d(R, i)) {
			return false;
		}
	}

	return q + r;
};

var GetIntrinsic$5W = require$$0;

var $Object$c = GetIntrinsic$5W('%Object%');
var $StringPrototype$4 = GetIntrinsic$5W('%String.prototype%');
var $SyntaxError$k = GetIntrinsic$5W('%SyntaxError%');
var $TypeError$4U = GetIntrinsic$5W('%TypeError%');

var DefinePropertyOrThrow$n = DefinePropertyOrThrow$r;
var Type$4U = Type$5J;

var setProto$4 = requireSetProto();

// https://262.ecma-international.org/6.0/#sec-stringcreate

var StringCreate$4 = function StringCreate(value, prototype) {
	if (Type$4U(value) !== 'String') {
		throw new $TypeError$4U('Assertion failed: `S` must be a String');
	}

	var S = $Object$c(value);
	if (S !== $StringPrototype$4) {
		if (setProto$4) {
			setProto$4(S, prototype);
		} else {
			throw new $SyntaxError$k('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow$n(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

var GetIntrinsic$5V = require$$0;

var $TypeError$4T = GetIntrinsic$5V('%TypeError%');

var callBound$1a = require$$1;

var $SymbolToString$4 = callBound$1a('Symbol.prototype.toString', true);

var Type$4T = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString$4 = function SymbolDescriptiveString(sym) {
	if (Type$4T(sym) !== 'Symbol') {
		throw new $TypeError$4T('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString$4(sym);
};

var GetIntrinsic$5U = require$$0;

var $gOPD$g = getOwnPropertyDescriptor;
var $gOPN$c = GetIntrinsic$5U('%Object.getOwnPropertyNames%');
var $TypeError$4S = GetIntrinsic$5U('%TypeError%');

var every$9 = requireEvery();

var IsDataDescriptor$F = IsDataDescriptor$P;
var IsExtensible$n = IsExtensible$r;
var ToPropertyDescriptor$o = ToPropertyDescriptor$t;
var Type$4S = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel$4 = function TestIntegrityLevel(O, level) {
	if (Type$4S(O) !== 'Object') {
		throw new $TypeError$4S('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$4S('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible$n(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN$c(O);
	return theKeys.length === 0 || every$9(theKeys, function (k) {
		var currentDesc = $gOPD$g(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor$F(ToPropertyDescriptor$o(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var $BooleanValueOf$4 = require$$1('Boolean.prototype.valueOf');

var Type$4R = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue$4 = function thisBooleanValue(value) {
	if (Type$4R(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf$4(value);
};

var callBound$19 = require$$1;

var Type$4Q = Type$5J;

var $NumberValueOf$4 = callBound$19('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue$4 = function thisNumberValue(value) {
	if (Type$4Q(value) === 'Number') {
		return value;
	}

	return $NumberValueOf$4(value);
};

var $StringValueOf$4 = require$$1('String.prototype.valueOf');

var Type$4P = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue$4 = function thisStringValue(value) {
	if (Type$4P(value) === 'String') {
		return value;
	}

	return $StringValueOf$4(value);
};

var $DateValueOf$2 = require$$1('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

var thisTimeValue$4 = function thisTimeValue(value) {
	return $DateValueOf$2(value);
};

var GetIntrinsic$5T = require$$0;

var $Date$d = GetIntrinsic$5T('%Date%');
var $Number$d = GetIntrinsic$5T('%Number%');

var $isFinite$y = _isFinite;

var abs$m = abs$o;
var ToNumber$U = ToNumber$$;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip$4 = function TimeClip(time) {
	if (!$isFinite$y(time) || abs$m(time) > 8.64e15) {
		return NaN;
	}
	return $Number$d(new $Date$d(ToNumber$U(time)));
};

var msPerDay$h = timeConstants$s.msPerDay;

var DayFromYear$c = DayFromYear$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear$4 = function TimeFromYear(y) {
	return msPerDay$h * DayFromYear$c(y);
};

var modulo$Q = modulo$X;

var msPerDay$g = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay$4 = function TimeWithinDay(t) {
	return modulo$Q(t, msPerDay$g);
};

var GetIntrinsic$5S = require$$0;

var $TypeError$4R = GetIntrinsic$5S('%TypeError%');
var $Date$c = GetIntrinsic$5S('%Date%');

var $isNaN$F = _isNaN;

var Type$4O = Type$5J;

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString$4 = function ToDateString(tv) {
	if (Type$4O(tv) !== 'Number') {
		throw new $TypeError$4R('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN$F(tv)) {
		return 'Invalid Date';
	}
	return $Date$c(tv);
};

var abs$l = abs$o;
var floor$P = floor$X;
var modulo$P = modulo$X;
var ToNumber$T = ToNumber$$;

var $isNaN$E = _isNaN;
var $isFinite$x = _isFinite;
var $sign$9 = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$9 = function ToUint16(value) {
	var number = ToNumber$T(value);
	if ($isNaN$E(number) || number === 0 || !$isFinite$x(number)) { return 0; }
	var posInt = $sign$9(number) * floor$P(abs$l(number));
	return modulo$P(posInt, 0x10000);
};

var ToUint16$8 = ToUint16$9;

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16$4 = function ToInt16(argument) {
	var int16bit = ToUint16$8(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

var ToNumber$S = ToNumber$$;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$9 = function ToInt32(x) {
	return ToNumber$S(x) >> 0;
};

var ToNumber$R = ToNumber$$;

var $isNaN$D = _isNaN;
var $isFinite$w = _isFinite;
var $sign$8 = sign;

var abs$k = abs$o;
var floor$O = floor$X;
var modulo$O = modulo$X;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

var ToUint8$9 = function ToUint8(argument) {
	var number = ToNumber$R(argument);
	if ($isNaN$D(number) || number === 0 || !$isFinite$w(number)) { return 0; }
	var posInt = $sign$8(number) * floor$O(abs$k(number));
	return modulo$O(posInt, 0x100);
};

var ToUint8$8 = ToUint8$9;

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8$4 = function ToInt8(argument) {
	var int8bit = ToUint8$8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var GetIntrinsic$5R = require$$0;

var $String$c = GetIntrinsic$5R('%String%');

var ToPrimitive$l = ToPrimitive$p;
var ToString$A = ToString$G;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey$4 = function ToPropertyKey(argument) {
	var key = ToPrimitive$l(argument, $String$c);
	return typeof key === 'symbol' ? key : ToString$A(key);
};

var ToNumber$Q = ToNumber$$;
var floor$N = floor$X;

var $isNaN$C = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp$4 = function ToUint8Clamp(argument) {
	var number = ToNumber$Q(argument);
	if ($isNaN$C(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor$N(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var GetIntrinsic$5Q = require$$0;

var $TypeError$4Q = GetIntrinsic$5Q('%TypeError%');
var $fromCharCode$9 = GetIntrinsic$5Q('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate$a = isLeadingSurrogate$d;
var isTrailingSurrogate$a = isTrailingSurrogate$d;

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

var UTF16Decode$3 = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate$a(lead) || !isTrailingSurrogate$a(trail)) {
		throw new $TypeError$4Q('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode$9(lead) + $fromCharCode$9(trail);
};

var isCodePoint$5;
var hasRequiredIsCodePoint;

function requireIsCodePoint () {
	if (hasRequiredIsCodePoint) return isCodePoint$5;
	hasRequiredIsCodePoint = 1;

	isCodePoint$5 = function isCodePoint(cp) {
		return typeof cp === 'number' && cp >= 0 && cp <= 0x10FFFF && (cp | 0) === cp;
	};
	return isCodePoint$5;
}

var GetIntrinsic$5P = require$$0;

var $TypeError$4P = GetIntrinsic$5P('%TypeError%');
var $fromCharCode$8 = GetIntrinsic$5P('%String.fromCharCode%');

var floor$M = floor$X;
var modulo$N = modulo$X;

var isCodePoint$4 = requireIsCodePoint();

// https://262.ecma-international.org/7.0/#sec-utf16encoding

var UTF16Encoding$6 = function UTF16Encoding(cp) {
	if (!isCodePoint$4(cp)) {
		throw new $TypeError$4P('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode$8(cp);
	}
	var cu1 = floor$M((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo$N(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode$8(cu1) + $fromCharCode$8(cu2);
};

var Day$g = Day$j;
var modulo$M = modulo$X;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$7 = function WeekDay(t) {
	return modulo$M(Day$g(t) + 4, 7);
};

/* eslint global-require: 0 */
// https://262.ecma-international.org/7.0/#sec-abstract-operations
var ES2016$1 = {
	'Abstract Equality Comparison': AbstractEqualityComparison$4,
	'Abstract Relational Comparison': AbstractRelationalComparison$4,
	'Strict Equality Comparison': StrictEqualityComparison$4,
	abs: abs$o,
	AdvanceStringIndex: AdvanceStringIndex$a,
	ArrayCreate: ArrayCreate$4,
	ArraySetLength: ArraySetLength$4,
	ArraySpeciesCreate: ArraySpeciesCreate$4,
	Call: Call$x,
	CanonicalNumericIndexString: CanonicalNumericIndexString$8,
	CompletePropertyDescriptor: CompletePropertyDescriptor$4,
	CreateDataProperty: CreateDataProperty$b,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow$7,
	CreateHTML: CreateHTML$4,
	CreateIterResultObject: CreateIterResultObject$4,
	CreateListFromArrayLike: CreateListFromArrayLike$4,
	CreateMethodProperty: CreateMethodProperty$4,
	DateFromTime: DateFromTime$c,
	Day: Day$j,
	DayFromYear: DayFromYear$e,
	DaysInYear: DaysInYear$9,
	DayWithinYear: DayWithinYear$e,
	DefinePropertyOrThrow: DefinePropertyOrThrow$r,
	DeletePropertyOrThrow: DeletePropertyOrThrow$4,
	EnumerableOwnNames: EnumerableOwnNames,
	floor: floor$X,
	FromPropertyDescriptor: FromPropertyDescriptor$o,
	Get: Get$T,
	GetIterator: GetIterator$b,
	GetMethod: GetMethod$k,
	GetOwnPropertyKeys: GetOwnPropertyKeys$4,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor$9,
	GetSubstitution: GetSubstitution$4,
	GetV: GetV$e,
	HasOwnProperty: HasOwnProperty$7,
	HasProperty: HasProperty$6,
	HourFromTime: HourFromTime$7,
	InLeapYear: InLeapYear$e,
	InstanceofOperator: InstanceofOperator$4,
	Invoke: Invoke$9,
	IsAccessorDescriptor: IsAccessorDescriptor$A,
	IsArray: IsArray$Z,
	IsCallable: IsCallable$A.exports,
	IsConcatSpreadable: IsConcatSpreadable$4,
	IsConstructor: IsConstructor$j.exports,
	IsDataDescriptor: IsDataDescriptor$P,
	IsExtensible: IsExtensible$r,
	IsGenericDescriptor: IsGenericDescriptor$e,
	IsInteger: IsInteger$E,
	IsPromise: IsPromise$4,
	IsPropertyDescriptor: IsPropertyDescriptor$1,
	IsPropertyKey: IsPropertyKey$1r,
	IsRegExp: IsRegExp$9,
	IterableToArrayLike: IterableToArrayLike,
	IteratorClose: IteratorClose$6,
	IteratorComplete: IteratorComplete$9,
	IteratorNext: IteratorNext$9,
	IteratorStep: IteratorStep$b,
	IteratorValue: IteratorValue$b,
	MakeDate: MakeDate$4,
	MakeDay: MakeDay$4,
	MakeTime: MakeTime$4,
	MinFromTime: MinFromTime$7,
	modulo: modulo$X,
	MonthFromTime: MonthFromTime$h,
	msFromTime: msFromTime$4,
	ObjectCreate: ObjectCreate$7,
	OrdinaryCreateFromConstructor: OrdinaryCreateFromConstructor$4,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty$9,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty$e,
	OrdinaryGetPrototypeOf: OrdinaryGetPrototypeOf$9,
	OrdinaryHasInstance: OrdinaryHasInstance$9,
	OrdinaryHasProperty: OrdinaryHasProperty$4,
	OrdinarySetPrototypeOf: OrdinarySetPrototypeOf$4,
	QuoteJSONString: QuoteJSONString$4,
	RegExpCreate: RegExpCreate$4,
	RegExpExec: RegExpExec$4,
	RequireObjectCoercible: RequireObjectCoercible$g.exports,
	SameValue: SameValue$M,
	SameValueNonNumber: SameValueNonNumber$3,
	SameValueZero: SameValueZero$7,
	SecFromTime: SecFromTime$7,
	Set: _Set$4,
	SetFunctionName: SetFunctionName$4,
	SetIntegrityLevel: SetIntegrityLevel$4,
	SpeciesConstructor: SpeciesConstructor$4,
	SplitMatch: SplitMatch$4,
	StringCreate: StringCreate$4,
	SymbolDescriptiveString: SymbolDescriptiveString$4,
	TestIntegrityLevel: TestIntegrityLevel$4,
	thisBooleanValue: thisBooleanValue$4,
	thisNumberValue: thisNumberValue$4,
	thisStringValue: thisStringValue$4,
	thisTimeValue: thisTimeValue$4,
	TimeClip: TimeClip$4,
	TimeFromYear: TimeFromYear$4,
	TimeWithinDay: TimeWithinDay$4,
	ToBoolean: ToBoolean$t,
	ToDateString: ToDateString$4,
	ToInt16: ToInt16$4,
	ToInt32: ToInt32$9,
	ToInt8: ToInt8$4,
	ToInteger: ToInteger$n,
	ToLength: ToLength$f,
	ToNumber: ToNumber$$,
	ToObject: ToObject$g,
	ToPrimitive: ToPrimitive$p,
	ToPropertyDescriptor: ToPropertyDescriptor$t,
	ToPropertyKey: ToPropertyKey$4,
	ToString: ToString$G,
	ToUint16: ToUint16$9,
	ToUint32: ToUint32$d,
	ToUint8: ToUint8$9,
	ToUint8Clamp: ToUint8Clamp$4,
	Type: Type$5J,
	UTF16Decode: UTF16Decode$3,
	UTF16Encoding: UTF16Encoding$6,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor$9,
	WeekDay: WeekDay$7,
	YearFromTime: YearFromTime$m
};

var es2016 = ES2016$1;

var toPrimitive$3 = require$$0$4;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$k = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive$3(input, arguments[1]);
	}
	return toPrimitive$3(input);
};

var GetIntrinsic$5O = require$$0;

var $TypeError$4O = GetIntrinsic$5O('%TypeError%');
var $Number$c = GetIntrinsic$5O('%Number%');
var $RegExp$7 = GetIntrinsic$5O('%RegExp%');
var $parseInteger$3 = GetIntrinsic$5O('%parseInt%');

var callBound$18 = require$$1;
var regexTester$7 = requireRegexTester();
var isPrimitive$8 = requireIsPrimitive();

var $strSlice$b = callBound$18('String.prototype.slice');
var isBinary$3 = regexTester$7(/^0b[01]+$/i);
var isOctal$3 = regexTester$7(/^0o[0-7]+$/i);
var isInvalidHexLiteral$3 = regexTester$7(/^[-+]0x[0-9a-f]+$/i);
var nonWS$3 = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex$3 = new $RegExp$7('[' + nonWS$3 + ']', 'g');
var hasNonWS$3 = regexTester$7(nonWSregex$3);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws$3 = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex$3 = new RegExp('(^[' + ws$3 + ']+)|([' + ws$3 + ']+$)', 'g');
var $replace$7 = callBound$18('String.prototype.replace');
var $trim$3 = function (value) {
	return $replace$7(value, trimRegex$3, '');
};

var ToPrimitive$j = ToPrimitive$k;

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber$P = function ToNumber(argument) {
	var value = isPrimitive$8(argument) ? argument : ToPrimitive$j(argument, $Number$c);
	if (typeof value === 'symbol') {
		throw new $TypeError$4O('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary$3(value)) {
			return ToNumber($parseInteger$3($strSlice$b(value, 2), 2));
		} else if (isOctal$3(value)) {
			return ToNumber($parseInteger$3($strSlice$b(value, 2), 8));
		} else if (hasNonWS$3(value) || isInvalidHexLiteral$3(value)) {
			return NaN;
		} else {
			var trimmed = $trim$3(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number$c(value);
};

var ES5Type$3 = Type$6N;

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

var Type$4N = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type$3(x);
};

var ToNumber$O = ToNumber$P;
var ToPrimitive$i = ToPrimitive$k;
var Type$4M = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison$3 = function AbstractEqualityComparison(x, y) {
	var xType = Type$4M(x);
	var yType = Type$4M(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$O(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$O(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$O(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$O(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$i(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive$i(x), y);
	}
	return false;
};

var GetIntrinsic$5N = require$$0;

var $Number$b = GetIntrinsic$5N('%Number%');
var $TypeError$4N = GetIntrinsic$5N('%TypeError%');

var $isNaN$B = _isNaN;
var $isFinite$v = _isFinite;
var isPrefixOf$6 = requireIsPrefixOf();

var ToNumber$N = ToNumber$P;
var ToPrimitive$h = ToPrimitive$k;
var Type$4L = Type$4N;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison$3 = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$4L(LeftFirst) !== 'Boolean') {
		throw new $TypeError$4N('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$h(x, $Number$b);
		py = ToPrimitive$h(y, $Number$b);
	} else {
		py = ToPrimitive$h(y, $Number$b);
		px = ToPrimitive$h(x, $Number$b);
	}
	var bothStrings = Type$4L(px) === 'String' && Type$4L(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$N(px);
		var ny = ToNumber$N(py);
		if ($isNaN$B(nx) || $isNaN$B(ny)) {
			return undefined;
		}
		if ($isFinite$v(nx) && $isFinite$v(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$6(py, px)) {
		return false;
	}
	if (isPrefixOf$6(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$4K = Type$4N;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison$3 = function StrictEqualityComparison(x, y) {
	var xType = Type$4K(x);
	var yType = Type$4K(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$5M = require$$0;

var $abs$3 = GetIntrinsic$5M('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$j = function abs(x) {
	return $abs$3(x);
};

// var modulo = require('./modulo');
var $floor$3 = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$L = function floor(x) {
	// return x - modulo(x, 1);
	return $floor$3(x);
};

var abs$i = abs$j;
var floor$K = floor$L;

var $isNaN$A = _isNaN;
var $isFinite$u = _isFinite;

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger$y = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN$A(argument) || !$isFinite$u(argument)) {
		return false;
	}
	var absValue = abs$i(argument);
	return floor$K(absValue) === absValue;
};

var GetIntrinsic$5L = require$$0;

var IsInteger$x = IsInteger$y;
var Type$4J = Type$4N;

var MAX_SAFE_INTEGER$9 = maxSafeInteger;
var isLeadingSurrogate$9 = isLeadingSurrogate$d;
var isTrailingSurrogate$9 = isTrailingSurrogate$d;

var $TypeError$4M = GetIntrinsic$5L('%TypeError%');

var $charCodeAt$a = require$$1('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex$7 = function AdvanceStringIndex(S, index, unicode) {
	if (Type$4J(S) !== 'String') {
		throw new $TypeError$4M('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$x(index) || index < 0 || index > MAX_SAFE_INTEGER$9) {
		throw new $TypeError$4M('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$4J(unicode) !== 'Boolean') {
		throw new $TypeError$4M('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt$a(S, index);
	if (!isLeadingSurrogate$9(first)) {
		return index + 1;
	}

	var second = $charCodeAt$a(S, index + 1);
	if (!isTrailingSurrogate$9(second)) {
		return index + 1;
	}

	return index + 2;
};

var GetIntrinsic$5K = require$$0;

var $ArrayPrototype$3 = GetIntrinsic$5K('%Array.prototype%');
var $RangeError$f = GetIntrinsic$5K('%RangeError%');
var $SyntaxError$j = GetIntrinsic$5K('%SyntaxError%');
var $TypeError$4L = GetIntrinsic$5K('%TypeError%');

var IsInteger$w = IsInteger$y;

var MAX_ARRAY_LENGTH$3 = Math.pow(2, 32) - 1;

var $setProto$7 = GetIntrinsic$5K('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype$3
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate$3 = function ArrayCreate(length) {
	if (!IsInteger$w(length) || length < 0) {
		throw new $TypeError$4L('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH$3) {
		throw new $RangeError$f('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype$3;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype$3) { // step 8
		if (!$setProto$7) {
			throw new $SyntaxError$j('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto$7(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var GetIntrinsic$5J = require$$0;

var $Array$7 = GetIntrinsic$5J('%Array%');

// eslint-disable-next-line global-require
var toStr$3 = !$Array$7.isArray && require$$1('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray$N = $Array$7.isArray || function IsArray(argument) {
	return toStr$3(argument) === '[object Array]';
};

var has$u = require$$0$1;

var assertRecord$j = assertRecord$y;

var Type$4I = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor$s = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$j(Type$4I, 'Property Descriptor', 'Desc', Desc);

	if (!has$u(Desc, '[[Get]]') && !has$u(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var has$t = require$$0$1;

var assertRecord$i = assertRecord$y;

var Type$4H = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor$E = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$i(Type$4H, 'Property Descriptor', 'Desc', Desc);

	if (!has$t(Desc, '[[Value]]') && !has$t(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$5I = require$$0;

var $Object$b = GetIntrinsic$5I('%Object%');

var isPrimitive$7 = requireIsPrimitive();

var $preventExtensions$7 = $Object$b.preventExtensions;
var $isExtensible$3 = $Object$b.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible$m = $preventExtensions$7
	? function IsExtensible(obj) {
		return !isPrimitive$7(obj) && $isExtensible$3(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive$7(obj);
	};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$1a = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$n = function ToBoolean(value) { return !!value; };

var IsCallable$t = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$t));

var has$s = require$$0$1;

var GetIntrinsic$5H = require$$0;

var $TypeError$4K = GetIntrinsic$5H('%TypeError%');

var Type$4G = Type$4N;
var ToBoolean$m = ToBoolean$n;
var IsCallable$s = IsCallable$t.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$n = function ToPropertyDescriptor(Obj) {
	if (Type$4G(Obj) !== 'Object') {
		throw new $TypeError$4K('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$s(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$m(Obj.enumerable);
	}
	if (has$s(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$m(Obj.configurable);
	}
	if (has$s(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$s(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$m(Obj.writable);
	}
	if (has$s(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$s(getter)) {
			throw new $TypeError$4K('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$s(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$s(setter)) {
			throw new $TypeError$4K('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$s(desc, '[[Get]]') || has$s(desc, '[[Set]]')) && (has$s(desc, '[[Value]]') || has$s(desc, '[[Writable]]'))) {
		throw new $TypeError$4K('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $isNaN$z = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$D = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$z(x) && $isNaN$z(y);
};

var assertRecord$h = assertRecord$y;

var Type$4F = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor$j = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$h(Type$4F, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var assertRecord$g = assertRecord$y;

var IsAccessorDescriptor$r = IsAccessorDescriptor$s;
var IsDataDescriptor$D = IsDataDescriptor$E;
var Type$4E = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor$b = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$g(Type$4E, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$r(Desc) && !IsDataDescriptor$D(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$5G = require$$0;

var $TypeError$4J = GetIntrinsic$5G('%TypeError%');

var DefineOwnProperty$f = requireDefineOwnProperty();
var isPropertyDescriptor$g = isPropertyDescriptor$s;
var isSamePropertyDescriptor$3 = requireIsSamePropertyDescriptor();

var FromPropertyDescriptor$i = FromPropertyDescriptor$j;
var IsAccessorDescriptor$q = IsAccessorDescriptor$s;
var IsDataDescriptor$C = IsDataDescriptor$E;
var IsGenericDescriptor$a = IsGenericDescriptor$b;
var IsPropertyKey$19 = IsPropertyKey$1a;
var SameValue$C = SameValue$D;
var Type$4D = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor$7 = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$4D(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$4J('Assertion failed: O must be undefined or an Object');
	}
	if (Type$4D(extensible) !== 'Boolean') {
		throw new $TypeError$4J('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor$g({
		Type: Type$4D,
		IsDataDescriptor: IsDataDescriptor$C,
		IsAccessorDescriptor: IsAccessorDescriptor$q
	}, Desc)) {
		throw new $TypeError$4J('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$4D(current) !== 'Undefined' && !isPropertyDescriptor$g({
		Type: Type$4D,
		IsDataDescriptor: IsDataDescriptor$C,
		IsAccessorDescriptor: IsAccessorDescriptor$q
	}, current)) {
		throw new $TypeError$4J('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey$19(P)) {
		throw new $TypeError$4J('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$4D(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor$a(Desc) || IsDataDescriptor$C(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$f(
					IsDataDescriptor$C,
					SameValue$C,
					FromPropertyDescriptor$i,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor$q(Desc)) {
				throw new $TypeError$4J('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty$f(
					IsDataDescriptor$C,
					SameValue$C,
					FromPropertyDescriptor$i,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor$a(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor$3({ SameValue: SameValue$C }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor$a(Desc)) ; else if (IsDataDescriptor$C(current) !== IsDataDescriptor$C(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor$C(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$f(
					IsDataDescriptor$C,
					SameValue$C,
					FromPropertyDescriptor$i,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty$f(
				IsDataDescriptor$C,
				SameValue$C,
				FromPropertyDescriptor$i,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor$C(current) && IsDataDescriptor$C(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue$C(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor$q(current) && IsAccessorDescriptor$q(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue$C(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue$C(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$4J('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty$f(
			IsDataDescriptor$C,
			SameValue$C,
			FromPropertyDescriptor$i,
			O,
			P,
			Desc
		);
	}
	return true;
};

var GetIntrinsic$5F = require$$0;

var $gOPD$f = getOwnPropertyDescriptor;
var $SyntaxError$i = GetIntrinsic$5F('%SyntaxError%');
var $TypeError$4I = GetIntrinsic$5F('%TypeError%');

var isPropertyDescriptor$f = isPropertyDescriptor$s;

var IsAccessorDescriptor$p = IsAccessorDescriptor$s;
var IsDataDescriptor$B = IsDataDescriptor$E;
var IsExtensible$l = IsExtensible$m;
var IsPropertyKey$18 = IsPropertyKey$1a;
var ToPropertyDescriptor$m = ToPropertyDescriptor$n;
var SameValue$B = SameValue$D;
var Type$4C = Type$4N;
var ValidateAndApplyPropertyDescriptor$6 = ValidateAndApplyPropertyDescriptor$7;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty$7 = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$4C(O) !== 'Object') {
		throw new $TypeError$4I('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$18(P)) {
		throw new $TypeError$4I('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor$f({
		Type: Type$4C,
		IsDataDescriptor: IsDataDescriptor$B,
		IsAccessorDescriptor: IsAccessorDescriptor$p
	}, Desc)) {
		throw new $TypeError$4I('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD$f) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor$p(Desc)) {
			throw new $SyntaxError$i('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue$B(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$i('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD$f(O, P);
	var current = desc && ToPropertyDescriptor$m(desc);
	var extensible = IsExtensible$l(O);
	return ValidateAndApplyPropertyDescriptor$6(O, P, extensible, Desc, current);
};

var GetIntrinsic$5E = require$$0;

var $match$3 = GetIntrinsic$5E('%Symbol.match%', true);

var hasRegExpMatcher$3 = require$$1$2;

var ToBoolean$l = ToBoolean$n;

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp$7 = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match$3) {
		var isRegExp = argument[$match$3];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean$l(isRegExp);
		}
	}
	return hasRegExpMatcher$3(argument);
};

var GetIntrinsic$5D = require$$0;

var $gOPD$e = getOwnPropertyDescriptor;
var $TypeError$4H = GetIntrinsic$5D('%TypeError%');

var callBound$17 = require$$1;

var $isEnumerable$a = callBound$17('Object.prototype.propertyIsEnumerable');

var has$r = require$$0$1;

var IsArray$M = IsArray$N;
var IsPropertyKey$17 = IsPropertyKey$1a;
var IsRegExp$6 = IsRegExp$7;
var ToPropertyDescriptor$l = ToPropertyDescriptor$n;
var Type$4B = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty$b = function OrdinaryGetOwnProperty(O, P) {
	if (Type$4B(O) !== 'Object') {
		throw new $TypeError$4H('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$17(P)) {
		throw new $TypeError$4H('Assertion failed: P must be a Property Key');
	}
	if (!has$r(O, P)) {
		return void 0;
	}
	if (!$gOPD$e) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray$M(O) && P === 'length';
		var regexLastIndex = IsRegExp$6(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$a(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor$l($gOPD$e(O, P));
};

var GetIntrinsic$5C = require$$0;

var $String$b = GetIntrinsic$5C('%String%');
var $TypeError$4G = GetIntrinsic$5C('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$z = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$4G('Cannot convert a Symbol value to a string');
	}
	return $String$b(argument);
};

var ToNumber$M = ToNumber$P;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$b = function ToUint32(x) {
	return ToNumber$M(x) >>> 0;
};

var GetIntrinsic$5B = require$$0;

var $RangeError$e = GetIntrinsic$5B('%RangeError%');
var $TypeError$4F = GetIntrinsic$5B('%TypeError%');

var assign$4 = require$$1$3;

var isPropertyDescriptor$e = isPropertyDescriptor$s;

var IsArray$L = IsArray$N;
var IsAccessorDescriptor$o = IsAccessorDescriptor$s;
var IsDataDescriptor$A = IsDataDescriptor$E;
var OrdinaryDefineOwnProperty$6 = OrdinaryDefineOwnProperty$7;
var OrdinaryGetOwnProperty$a = OrdinaryGetOwnProperty$b;
var ToNumber$L = ToNumber$P;
var ToString$y = ToString$z;
var ToUint32$a = ToUint32$b;
var Type$4A = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength$3 = function ArraySetLength(A, Desc) {
	if (!IsArray$L(A)) {
		throw new $TypeError$4F('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor$e({
		Type: Type$4A,
		IsDataDescriptor: IsDataDescriptor$A,
		IsAccessorDescriptor: IsAccessorDescriptor$o
	}, Desc)) {
		throw new $TypeError$4F('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty$6(A, 'length', Desc);
	}
	var newLenDesc = assign$4({}, Desc);
	var newLen = ToUint32$a(Desc['[[Value]]']);
	var numberLen = ToNumber$L(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$e('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty$a(A, 'length');
	if (!IsDataDescriptor$A(oldLenDesc)) {
		throw new $TypeError$4F('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty$6(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty$6(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString$y(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty$6(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty$6(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

var GetIntrinsic$5A = require$$0;

var $TypeError$4E = GetIntrinsic$5A('%TypeError%');

var inspect$a = require$$1$4;

var IsPropertyKey$16 = IsPropertyKey$1a;
var Type$4z = Type$4N;

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get$K = function Get(O, P) {
	// 7.3.1.1
	if (Type$4z(O) !== 'Object') {
		throw new $TypeError$4E('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey$16(P)) {
		throw new $TypeError$4E('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect$a(P));
	}
	// 7.3.1.3
	return O[P];
};

var IsConstructor$f = {exports: {}};

var GetIntrinsic$5z = require$$0;

var $TypeError$4D = GetIntrinsic$5z('%TypeError%');

var isPropertyDescriptor$d = isPropertyDescriptor$s;
var DefineOwnProperty$e = requireDefineOwnProperty();

var FromPropertyDescriptor$h = FromPropertyDescriptor$j;
var IsAccessorDescriptor$n = IsAccessorDescriptor$s;
var IsDataDescriptor$z = IsDataDescriptor$E;
var IsPropertyKey$15 = IsPropertyKey$1a;
var SameValue$A = SameValue$D;
var ToPropertyDescriptor$k = ToPropertyDescriptor$n;
var Type$4y = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow$m = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$4y(O) !== 'Object') {
		throw new $TypeError$4D('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$15(P)) {
		throw new $TypeError$4D('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor$d({
		Type: Type$4y,
		IsDataDescriptor: IsDataDescriptor$z,
		IsAccessorDescriptor: IsAccessorDescriptor$n
	}, desc) ? desc : ToPropertyDescriptor$k(desc);
	if (!isPropertyDescriptor$d({
		Type: Type$4y,
		IsDataDescriptor: IsDataDescriptor$z,
		IsAccessorDescriptor: IsAccessorDescriptor$n
	}, Desc)) {
		throw new $TypeError$4D('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty$e(
		IsDataDescriptor$z,
		SameValue$A,
		FromPropertyDescriptor$h,
		O,
		P,
		Desc
	);
};

var GetIntrinsic$5y = GetIntrinsic$7K.exports;

var $construct$3 = GetIntrinsic$5y('%Reflect.construct%', true);

var DefinePropertyOrThrow$l = DefinePropertyOrThrow$m;
try {
	DefinePropertyOrThrow$l({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow$l = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow$l && $construct$3) {
	var isConstructorMarker$3 = {};
	var badArrayLike$3 = {};
	DefinePropertyOrThrow$l(badArrayLike$3, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker$3;
		},
		'[[Enumerable]]': true
	});

	IsConstructor$f.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct$3(argument, badArrayLike$3);
		} catch (err) {
			return err === isConstructorMarker$3;
		}
	};
} else {
	IsConstructor$f.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

var GetIntrinsic$5x = require$$0;

var $Array$6 = GetIntrinsic$5x('%Array%');
var $species$7 = GetIntrinsic$5x('%Symbol.species%', true);
var $TypeError$4C = GetIntrinsic$5x('%TypeError%');

var Get$J = Get$K;
var IsArray$K = IsArray$N;
var IsConstructor$e = IsConstructor$f.exports;
var IsInteger$v = IsInteger$y;
var Type$4x = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate$3 = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger$v(length) || length < 0) {
		throw new $TypeError$4C('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray$K(originalArray);
	if (isArray) {
		C = Get$J(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species$7 && Type$4x(C) === 'Object') {
			C = Get$J(C, $species$7);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array$6(len);
	}
	if (!IsConstructor$e(C)) {
		throw new $TypeError$4C('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var GetIntrinsic$5w = require$$0;
var callBound$16 = require$$1;

var $TypeError$4B = GetIntrinsic$5w('%TypeError%');

var IsArray$J = IsArray$N;

var $apply$3 = GetIntrinsic$5w('%Reflect.apply%', true) || callBound$16('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

var Call$r = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$J(argumentsList)) {
		throw new $TypeError$4B('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply$3(F, V, argumentsList);
};

var GetIntrinsic$5v = require$$0;

var $TypeError$4A = GetIntrinsic$5v('%TypeError%');

var SameValue$z = SameValue$D;
var ToNumber$K = ToNumber$P;
var ToString$x = ToString$z;
var Type$4w = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString$7 = function CanonicalNumericIndexString(argument) {
	if (Type$4w(argument) !== 'String') {
		throw new $TypeError$4A('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber$K(argument);
	if (SameValue$z(ToString$x(n), argument)) { return n; }
	return void 0;
};

var has$q = require$$0$1;

var assertRecord$f = assertRecord$y;

var IsDataDescriptor$y = IsDataDescriptor$E;
var IsGenericDescriptor$9 = IsGenericDescriptor$b;
var Type$4v = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor$3 = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord$f(Type$4v, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor$9(Desc) || IsDataDescriptor$y(Desc)) {
		if (!has$q(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has$q(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has$q(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has$q(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has$q(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has$q(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var GetIntrinsic$5u = require$$0;

var $TypeError$4z = GetIntrinsic$5u('%TypeError%');

var DefineOwnProperty$d = requireDefineOwnProperty();

var FromPropertyDescriptor$g = FromPropertyDescriptor$j;
var OrdinaryGetOwnProperty$9 = OrdinaryGetOwnProperty$b;
var IsDataDescriptor$x = IsDataDescriptor$E;
var IsExtensible$k = IsExtensible$m;
var IsPropertyKey$14 = IsPropertyKey$1a;
var SameValue$y = SameValue$D;
var Type$4u = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty$9 = function CreateDataProperty(O, P, V) {
	if (Type$4u(O) !== 'Object') {
		throw new $TypeError$4z('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$14(P)) {
		throw new $TypeError$4z('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty$9(O, P);
	var extensible = !oldDesc || IsExtensible$k(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty$d(
		IsDataDescriptor$x,
		SameValue$y,
		FromPropertyDescriptor$g,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var GetIntrinsic$5t = require$$0;

var $TypeError$4y = GetIntrinsic$5t('%TypeError%');

var CreateDataProperty$8 = CreateDataProperty$9;
var IsPropertyKey$13 = IsPropertyKey$1a;
var Type$4t = Type$4N;

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$6 = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$4t(O) !== 'Object') {
		throw new $TypeError$4y('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$13(P)) {
		throw new $TypeError$4y('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty$8(O, P, V);
	if (!success) {
		throw new $TypeError$4y('unable to create data property');
	}
	return success;
};

var RequireObjectCoercible$d = {exports: {}};

(function (module) {

	module.exports = CheckObjectCoercible$1;
} (RequireObjectCoercible$d));

var GetIntrinsic$5s = require$$0;

var $TypeError$4x = GetIntrinsic$5s('%TypeError%');

var callBound$15 = require$$1;

var $replace$6 = callBound$15('String.prototype.replace');

var RequireObjectCoercible$c = RequireObjectCoercible$d.exports;
var ToString$w = ToString$z;
var Type$4s = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML$3 = function CreateHTML(string, tag, attribute, value) {
	if (Type$4s(tag) !== 'String' || Type$4s(attribute) !== 'String') {
		throw new $TypeError$4x('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible$c(string);
	var S = ToString$w(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString$w(value);
		var escapedV = $replace$6(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var GetIntrinsic$5r = require$$0;

var $TypeError$4w = GetIntrinsic$5r('%TypeError%');

var Type$4r = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject$3 = function CreateIterResultObject(value, done) {
	if (Type$4r(done) !== 'Boolean') {
		throw new $TypeError$4w('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

var ES5ToInteger$3 = ToInteger$u;

var ToNumber$J = ToNumber$P;

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

var ToInteger$j = function ToInteger(value) {
	var number = ToNumber$J(value);
	return ES5ToInteger$3(number);
};

var MAX_SAFE_INTEGER$8 = maxSafeInteger;

var ToInteger$i = ToInteger$j;

var ToLength$d = function ToLength(argument) {
	var len = ToInteger$i(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER$8) { return MAX_SAFE_INTEGER$8; }
	return len;
};

var GetIntrinsic$5q = require$$0;

var callBound$14 = require$$1;

var $TypeError$4v = GetIntrinsic$5q('%TypeError%');
var $indexOf$6 = callBound$14('Array.prototype.indexOf', true) || callBound$14('String.prototype.indexOf');
var $push$4 = callBound$14('Array.prototype.push');

var Get$I = Get$K;
var IsArray$I = IsArray$N;
var ToLength$c = ToLength$d;
var ToString$v = ToString$z;
var Type$4q = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
var CreateListFromArrayLike$3 = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$4q(obj) !== 'Object') {
		throw new $TypeError$4v('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray$I(elementTypes)) {
		throw new $TypeError$4v('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength$c(Get$I(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString$v(index);
		var next = Get$I(obj, indexName);
		var nextType = Type$4q(next);
		if ($indexOf$6(elementTypes, nextType) < 0) {
			throw new $TypeError$4v('item type ' + nextType + ' is not a valid elementType');
		}
		$push$4(list, next);
		index += 1;
	}
	return list;
};

var GetIntrinsic$5p = require$$0;

var $TypeError$4u = GetIntrinsic$5p('%TypeError%');

var DefineOwnProperty$c = requireDefineOwnProperty();

var FromPropertyDescriptor$f = FromPropertyDescriptor$j;
var IsDataDescriptor$w = IsDataDescriptor$E;
var IsPropertyKey$12 = IsPropertyKey$1a;
var SameValue$x = SameValue$D;
var Type$4p = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty$3 = function CreateMethodProperty(O, P, V) {
	if (Type$4p(O) !== 'Object') {
		throw new $TypeError$4u('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$12(P)) {
		throw new $TypeError$4u('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty$c(
		IsDataDescriptor$w,
		SameValue$x,
		FromPropertyDescriptor$f,
		O,
		P,
		newDesc
	);
};

var floor$J = floor$L;

var msPerDay$f = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$f = function Day(t) {
	return floor$J(t / msPerDay$f);
};

var floor$I = floor$L;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$b = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$I((y - 1969) / 4) - floor$I((y - 1901) / 100) + floor$I((y - 1601) / 400);
};

var GetIntrinsic$5o = require$$0;

var $Date$b = GetIntrinsic$5o('%Date%');

var callBound$13 = require$$1;

var $getUTCFullYear$3 = callBound$13('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$i = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear$3(new $Date$b(t));
};

var Day$e = Day$f;
var DayFromYear$a = DayFromYear$b;
var YearFromTime$h = YearFromTime$i;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$b = function DayWithinYear(t) {
	return Day$e(t) - DayFromYear$a(YearFromTime$h(t));
};

var mod$3 = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$L = function modulo(x, y) {
	return mod$3(x, y);
};

var modulo$K = modulo$L;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$7 = function DaysInYear(y) {
	if (modulo$K(y, 4) !== 0) {
		return 365;
	}
	if (modulo$K(y, 100) !== 0) {
		return 366;
	}
	if (modulo$K(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$5n = require$$0;

var $EvalError$7 = GetIntrinsic$5n('%EvalError%');

var DaysInYear$6 = DaysInYear$7;
var YearFromTime$g = YearFromTime$i;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$b = function InLeapYear(t) {
	var days = DaysInYear$6(YearFromTime$g(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$7('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$a = DayWithinYear$b;
var InLeapYear$a = InLeapYear$b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$e = function MonthFromTime(t) {
	var day = DayWithinYear$a(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$a(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$5m = require$$0;

var $EvalError$6 = GetIntrinsic$5m('%EvalError%');

var DayWithinYear$9 = DayWithinYear$b;
var InLeapYear$9 = InLeapYear$b;
var MonthFromTime$d = MonthFromTime$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$a = function DateFromTime(t) {
	var m = MonthFromTime$d(t);
	var d = DayWithinYear$9(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear$9(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$6('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var GetIntrinsic$5l = require$$0;

var $TypeError$4t = GetIntrinsic$5l('%TypeError%');

var IsPropertyKey$11 = IsPropertyKey$1a;
var Type$4o = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow$3 = function DeletePropertyOrThrow(O, P) {
	if (Type$4o(O) !== 'Object') {
		throw new $TypeError$4t('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$11(P)) {
		throw new $TypeError$4t('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$4t('Attempt to delete property failed.');
	}
	return success;
};

var GetIntrinsic$5k = require$$0;

var $TypeError$4s = GetIntrinsic$5k('%TypeError%');

var objectKeys$3 = require$$1$5;

var callBound$12 = require$$1;

var callBind$6 = require$$1$1;

var $isEnumerable$9 = callBound$12('Object.prototype.propertyIsEnumerable');
var $pushApply$3 = callBind$6.apply(GetIntrinsic$5k('%Array.prototype.push%'));

var forEach$e = requireForEach();

var Type$4n = Type$4N;

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

var EnumerableOwnProperties = function EnumerableOwnProperties(O, kind) {
	if (Type$4n(O) !== 'Object') {
		throw new $TypeError$4s('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys$3(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach$e(keys, function (key) {
			if ($isEnumerable$9(O, key)) {
				$pushApply$3(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError$4s('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

var GetIntrinsic$5j = require$$0;

var $Object$a = GetIntrinsic$5j('%Object%');

var RequireObjectCoercible$b = RequireObjectCoercible$d.exports;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$d = function ToObject(value) {
	RequireObjectCoercible$b(value);
	return $Object$a(value);
};

var GetIntrinsic$5i = require$$0;

var $TypeError$4r = GetIntrinsic$5i('%TypeError%');

var IsPropertyKey$10 = IsPropertyKey$1a;
var ToObject$c = ToObject$d;

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV$b = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey$10(P)) {
		throw new $TypeError$4r('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject$c(V);

	// 7.3.2.4
	return O[P];
};

var GetIntrinsic$5h = require$$0;

var $TypeError$4q = GetIntrinsic$5h('%TypeError%');

var GetV$a = GetV$b;
var IsCallable$r = IsCallable$t.exports;
var IsPropertyKey$$ = IsPropertyKey$1a;

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$f = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey$$(P)) {
		throw new $TypeError$4q('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV$a(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable$r(func)) {
		throw new $TypeError$4q(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var GetIntrinsic$5g = require$$0;

var $TypeError$4p = GetIntrinsic$5g('%TypeError%');

var getIteratorMethod$3 = requireGetIteratorMethod();
var AdvanceStringIndex$6 = AdvanceStringIndex$7;
var Call$q = Call$r;
var GetMethod$e = GetMethod$f;
var IsArray$H = IsArray$N;
var Type$4m = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator$9 = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod$3(
			{
				AdvanceStringIndex: AdvanceStringIndex$6,
				GetMethod: GetMethod$e,
				IsArray: IsArray$H,
				Type: Type$4m
			},
			obj
		);
	}
	var iterator = Call$q(actualMethod, obj);
	if (Type$4m(iterator) !== 'Object') {
		throw new $TypeError$4p('iterator must return an object');
	}

	return iterator;
};

var GetIntrinsic$5f = require$$0;

var hasSymbols$4 = require$$1$6();

var $TypeError$4o = GetIntrinsic$5f('%TypeError%');

var $gOPN$b = GetIntrinsic$5f('%Object.getOwnPropertyNames%');
var $gOPS$3 = hasSymbols$4 && GetIntrinsic$5f('%Object.getOwnPropertySymbols%');
var keys$3 = require$$1$5;

var esType$3 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys$3 = function GetOwnPropertyKeys(O, Type) {
	if (esType$3(O) !== 'Object') {
		throw new $TypeError$4o('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS$3 ? $gOPS$3(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$b) {
			return keys$3(O);
		}
		return $gOPN$b(O);
	}
	throw new $TypeError$4o('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var GetIntrinsic$5e = require$$0;

var $Function$3 = GetIntrinsic$5e('%Function%');
var $TypeError$4n = GetIntrinsic$5e('%TypeError%');

var Get$H = Get$K;
var IsConstructor$d = IsConstructor$f.exports;
var Type$4l = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor$7 = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic$5e(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor$d(constructor)) {
		throw new $TypeError$4n('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get$H(constructor, 'prototype');
	if (Type$4l(proto) !== 'Object') {
		if (!(constructor instanceof $Function$3)) {
			// ignore other realms, for now
			throw new $TypeError$4n('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var GetIntrinsic$5d = require$$0;

var $TypeError$4m = GetIntrinsic$5d('%TypeError%');
var $parseInt$3 = GetIntrinsic$5d('%parseInt%');

var inspect$9 = require$$1$4;

var regexTester$6 = requireRegexTester();
var callBound$11 = require$$1;
var every$8 = requireEvery();

var isDigit$3 = regexTester$6(/^[0-9]$/);

var $charAt$c = callBound$11('String.prototype.charAt');
var $strSlice$a = callBound$11('String.prototype.slice');

var IsArray$G = IsArray$N;
var IsInteger$u = IsInteger$y;
var Type$4k = Type$4N;

var canDistinguishSparseFromUndefined$3 = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole$3 = function (capture, index, arr) {
	return Type$4k(capture) === 'String' || (canDistinguishSparseFromUndefined$3 ? !(index in arr) : Type$4k(capture) === 'Undefined');
};

// https://ecma-international.org/ecma-262/6.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution$3 = function GetSubstitution(matched, str, position, captures, replacement) {
	if (Type$4k(matched) !== 'String') {
		throw new $TypeError$4m('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$4k(str) !== 'String') {
		throw new $TypeError$4m('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger$u(position) || position < 0 || position > stringLength) {
		throw new $TypeError$4m('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect$9(position));
	}

	if (!IsArray$G(captures) || !every$8(captures, isStringOrHole$3)) {
		throw new $TypeError$4m('Assertion failed: `captures` must be a List of Strings, got ' + inspect$9(captures));
	}

	if (Type$4k(replacement) !== 'String') {
		throw new $TypeError$4m('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt$c(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt$c(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$a(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$a(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt$c(replacement, i + 2);
				if (isDigit$3(next) && next !== '0' && (nextIsLast || !isDigit$3(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt$3(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type$4k(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit$3(next) && (nextIsLast || isDigit$3(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt$3(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type$4k(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt$c(replacement, i);
		}
	}
	return result;
};

var GetIntrinsic$5c = require$$0;

var $TypeError$4l = GetIntrinsic$5c('%TypeError%');

var has$p = require$$0$1;

var IsPropertyKey$_ = IsPropertyKey$1a;
var Type$4j = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$6 = function HasOwnProperty(O, P) {
	if (Type$4j(O) !== 'Object') {
		throw new $TypeError$4l('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$_(P)) {
		throw new $TypeError$4l('Assertion failed: `P` must be a Property Key');
	}
	return has$p(O, P);
};

var GetIntrinsic$5b = require$$0;

var $TypeError$4k = GetIntrinsic$5b('%TypeError%');

var IsPropertyKey$Z = IsPropertyKey$1a;
var Type$4i = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty$5 = function HasProperty(O, P) {
	if (Type$4i(O) !== 'Object') {
		throw new $TypeError$4k('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$Z(P)) {
		throw new $TypeError$4k('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var floor$H = floor$L;
var modulo$J = modulo$L;

var timeConstants$f = timeConstants$s;
var msPerHour$7 = timeConstants$f.msPerHour;
var HoursPerDay$3 = timeConstants$f.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$6 = function HourFromTime(t) {
	return modulo$J(floor$H(t / msPerHour$7), HoursPerDay$3);
};

var GetIntrinsic$5a = require$$0;

var $TypeError$4j = GetIntrinsic$5a('%TypeError%');

var Get$G = Get$K;
var IsCallable$q = IsCallable$t.exports;
var Type$4h = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance$7 = function OrdinaryHasInstance(C, O) {
	if (IsCallable$q(C) === false) {
		return false;
	}
	if (Type$4h(O) !== 'Object') {
		return false;
	}
	var P = Get$G(C, 'prototype');
	if (Type$4h(P) !== 'Object') {
		throw new $TypeError$4j('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var GetIntrinsic$59 = require$$0;

var $TypeError$4i = GetIntrinsic$59('%TypeError%');

var $hasInstance$3 = GetIntrinsic$59('Symbol.hasInstance', true);

var Call$p = Call$r;
var GetMethod$d = GetMethod$f;
var IsCallable$p = IsCallable$t.exports;
var OrdinaryHasInstance$6 = OrdinaryHasInstance$7;
var ToBoolean$k = ToBoolean$n;
var Type$4g = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator$3 = function InstanceofOperator(O, C) {
	if (Type$4g(O) !== 'Object') {
		throw new $TypeError$4i('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance$3 ? GetMethod$d(C, $hasInstance$3) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean$k(Call$p(instOfHandler, C, [O]));
	}
	if (!IsCallable$p(C)) {
		throw new $TypeError$4i('`C` is not Callable');
	}
	return OrdinaryHasInstance$6(C, O);
};

var GetIntrinsic$58 = require$$0;

var $TypeError$4h = GetIntrinsic$58('%TypeError%');

var Call$o = Call$r;
var IsArray$F = IsArray$N;
var GetV$9 = GetV$b;
var IsPropertyKey$Y = IsPropertyKey$1a;

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke$7 = function Invoke(O, P) {
	if (!IsPropertyKey$Y(P)) {
		throw new $TypeError$4h('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$F(argumentsList)) {
		throw new $TypeError$4h('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV$9(O, P);
	return Call$o(func, O, argumentsList);
};

var GetIntrinsic$57 = require$$0;

var $isConcatSpreadable$3 = GetIntrinsic$57('%Symbol.isConcatSpreadable%', true);

var Get$F = Get$K;
var IsArray$E = IsArray$N;
var ToBoolean$j = ToBoolean$n;
var Type$4f = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable$3 = function IsConcatSpreadable(O) {
	if (Type$4f(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable$3) {
		var spreadable = Get$F(O, $isConcatSpreadable$3);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean$j(spreadable);
		}
	}
	return IsArray$E(O);
};

var callBound$10 = require$$1;

var $PromiseThen$3 = callBound$10('Promise.prototype.then', true);

var Type$4e = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise$3 = function IsPromise(x) {
	if (Type$4e(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen$3) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen$3(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

// TODO, semver-major: delete this

var isPropertyDescriptor$c = isPropertyDescriptor$s;

var Type$4d = Type$4N;
var IsDataDescriptor$v = IsDataDescriptor$E;
var IsAccessorDescriptor$m = IsAccessorDescriptor$s;

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

var IsPropertyDescriptor = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor$c({
		IsDataDescriptor: IsDataDescriptor$v,
		IsAccessorDescriptor: IsAccessorDescriptor$m,
		Type: Type$4d
	}, Desc);
};

var GetIntrinsic$56 = require$$0;

var $TypeError$4g = GetIntrinsic$56('%TypeError%');

var Get$E = Get$K;
var ToBoolean$i = ToBoolean$n;
var Type$4c = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete$7 = function IteratorComplete(iterResult) {
	if (Type$4c(iterResult) !== 'Object') {
		throw new $TypeError$4g('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean$i(Get$E(iterResult, 'done'));
};

var GetIntrinsic$55 = require$$0;

var $TypeError$4f = GetIntrinsic$55('%TypeError%');

var Invoke$6 = Invoke$7;
var Type$4b = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext$7 = function IteratorNext(iterator, value) {
	var result = Invoke$6(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$4b(result) !== 'Object') {
		throw new $TypeError$4f('iterator next must return an object');
	}
	return result;
};

var IteratorComplete$6 = IteratorComplete$7;
var IteratorNext$6 = IteratorNext$7;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep$9 = function IteratorStep(iterator) {
	var result = IteratorNext$6(iterator);
	var done = IteratorComplete$6(result);
	return done === true ? false : result;
};

var GetIntrinsic$54 = require$$0;

var $TypeError$4e = GetIntrinsic$54('%TypeError%');

var Get$D = Get$K;
var Type$4a = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue$9 = function IteratorValue(iterResult) {
	if (Type$4a(iterResult) !== 'Object') {
		throw new $TypeError$4e('Assertion failed: Type(iterResult) is not Object');
	}
	return Get$D(iterResult, 'value');
};

var callBound$$ = require$$1;
var $arrayPush$3 = callBound$$('Array.prototype.push');

var GetIterator$8 = GetIterator$9;
var IteratorStep$8 = IteratorStep$9;
var IteratorValue$8 = IteratorValue$9;

// https://262.ecma-international.org/8.0/#sec-iterabletolist

var IterableToList$3 = function IterableToList(items, method) {
	var iterator = GetIterator$8(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep$8(iterator);
		if (next) {
			var nextValue = IteratorValue$8(next);
			$arrayPush$3(values, nextValue);
		}
	}
	return values;
};

var GetIntrinsic$53 = require$$0;

var $TypeError$4d = GetIntrinsic$53('%TypeError%');

var Call$n = Call$r;
var GetMethod$c = GetMethod$f;
var IsCallable$o = IsCallable$t.exports;
var Type$49 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose$5 = function IteratorClose(iterator, completion) {
	if (Type$49(iterator) !== 'Object') {
		throw new $TypeError$4d('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable$o(completion)) {
		throw new $TypeError$4d('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$c(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call$n(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$49(innerResult) !== 'Object') {
		throw new $TypeError$4d('iterator .return must return an object');
	}

	return completionRecord;
};

var $isFinite$t = _isFinite;
var msPerDay$e = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate$3 = function MakeDate(day, time) {
	if (!$isFinite$t(day) || !$isFinite$t(time)) {
		return NaN;
	}
	return (day * msPerDay$e) + time;
};

var GetIntrinsic$52 = require$$0;

var $DateUTC$3 = GetIntrinsic$52('%Date.UTC%');

var $isFinite$s = _isFinite;

var DateFromTime$9 = DateFromTime$a;
var Day$d = Day$f;
var floor$G = floor$L;
var modulo$I = modulo$L;
var MonthFromTime$c = MonthFromTime$e;
var ToInteger$h = ToInteger$j;
var YearFromTime$f = YearFromTime$i;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay$3 = function MakeDay(year, month, date) {
	if (!$isFinite$s(year) || !$isFinite$s(month) || !$isFinite$s(date)) {
		return NaN;
	}
	var y = ToInteger$h(year);
	var m = ToInteger$h(month);
	var dt = ToInteger$h(date);
	var ym = y + floor$G(m / 12);
	var mn = modulo$I(m, 12);
	var t = $DateUTC$3(ym, mn, 1);
	if (YearFromTime$f(t) !== ym || MonthFromTime$c(t) !== mn || DateFromTime$9(t) !== 1) {
		return NaN;
	}
	return Day$d(t) + dt - 1;
};

var $isFinite$r = _isFinite;
var timeConstants$e = timeConstants$s;
var msPerSecond$b = timeConstants$e.msPerSecond;
var msPerMinute$7 = timeConstants$e.msPerMinute;
var msPerHour$6 = timeConstants$e.msPerHour;

var ToInteger$g = ToInteger$j;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime$3 = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$r(hour) || !$isFinite$r(min) || !$isFinite$r(sec) || !$isFinite$r(ms)) {
		return NaN;
	}
	var h = ToInteger$g(hour);
	var m = ToInteger$g(min);
	var s = ToInteger$g(sec);
	var milli = ToInteger$g(ms);
	var t = (h * msPerHour$6) + (m * msPerMinute$7) + (s * msPerSecond$b) + milli;
	return t;
};

var floor$F = floor$L;
var modulo$H = modulo$L;

var timeConstants$d = timeConstants$s;
var msPerMinute$6 = timeConstants$d.msPerMinute;
var MinutesPerHour$3 = timeConstants$d.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$6 = function MinFromTime(t) {
	return modulo$H(floor$F(t / msPerMinute$6), MinutesPerHour$3);
};

var modulo$G = modulo$L;

var msPerSecond$a = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime$3 = function msFromTime(t) {
	return modulo$G(t, msPerSecond$a);
};

var GetIntrinsic$51 = require$$0;

var $ObjectCreate$3 = GetIntrinsic$51('%Object.create%', true);
var $TypeError$4c = GetIntrinsic$51('%TypeError%');
var $SyntaxError$h = GetIntrinsic$51('%SyntaxError%');

var Type$48 = Type$4N;

var hasProto$3 = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

var ObjectCreate$5 = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type$48(proto) !== 'Object') {
		throw new $TypeError$4c('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError$h('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate$3) {
		return $ObjectCreate$3(proto);
	}
	if (hasProto$3) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$h('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var GetIntrinsic$50 = require$$0;
var $TypeError$4b = GetIntrinsic$50('%TypeError%');

var GetPrototypeFromConstructor$6 = GetPrototypeFromConstructor$7;
var IsArray$D = IsArray$N;
var ObjectCreate$4 = ObjectCreate$5;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

var OrdinaryCreateFromConstructor$3 = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic$50(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor$6(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray$D(slots)) {
		throw new $TypeError$4b('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate$4(proto, slots);
};

var GetIntrinsic$4$ = require$$0;

var $TypeError$4a = GetIntrinsic$4$('%TypeError%');

var $getProto$3 = requireGetProto();

var Type$47 = Type$4N;

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

var OrdinaryGetPrototypeOf$7 = function OrdinaryGetPrototypeOf(O) {
	if (Type$47(O) !== 'Object') {
		throw new $TypeError$4a('Assertion failed: O must be an Object');
	}
	if (!$getProto$3) {
		throw new $TypeError$4a('This environment does not support fetching prototypes.');
	}
	return $getProto$3(O);
};

var GetIntrinsic$4_ = require$$0;

var $TypeError$49 = GetIntrinsic$4_('%TypeError%');

var IsPropertyKey$X = IsPropertyKey$1a;
var Type$46 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty$3 = function OrdinaryHasProperty(O, P) {
	if (Type$46(O) !== 'Object') {
		throw new $TypeError$49('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$X(P)) {
		throw new $TypeError$49('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$4Z = require$$0;

var $TypeError$48 = GetIntrinsic$4Z('%TypeError%');

var $setProto$6 = requireSetProto();

var OrdinaryGetPrototypeOf$6 = OrdinaryGetPrototypeOf$7;
var Type$45 = Type$4N;

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf$3 = function OrdinarySetPrototypeOf(O, V) {
	if (Type$45(V) !== 'Object' && Type$45(V) !== 'Null') {
		throw new $TypeError$48('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto$6(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf$6(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

var GetIntrinsic$4Y = require$$0;

var $TypeError$47 = GetIntrinsic$4Y('%TypeError%');

var callBound$_ = require$$1;
var forEach$d = requireForEach();

var $charCodeAt$9 = callBound$_('String.prototype.charCodeAt');
var $numberToString$3 = callBound$_('Number.prototype.toString');
var $toLowerCase$3 = callBound$_('String.prototype.toLowerCase');
var $strSlice$9 = callBound$_('String.prototype.slice');
var $strSplit$2 = callBound$_('String.prototype.split');

var Type$44 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-quotejsonstring

var escapes$3 = {
	'\u0008': 'b',
	'\u000C': 'f',
	'\u000A': 'n',
	'\u000D': 'r',
	'\u0009': 't'
};

var QuoteJSONString$3 = function QuoteJSONString(value) {
	if (Type$44(value) !== 'String') {
		throw new $TypeError$47('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach$d($strSplit$2(value), function (C) {
			if (C === '"' || C === '\\') {
				product += '\u005C' + C;
			} else if (C === '\u0008' || C === '\u000C' || C === '\u000A' || C === '\u000D' || C === '\u0009') {
				var abbrev = escapes$3[C];
				product += '\u005C' + abbrev;
			} else {
				var cCharCode = $charCodeAt$9(C, 0);
				if (cCharCode < 0x20) {
					product += '\u005Cu' + $toLowerCase$3($strSlice$9('0000' + $numberToString$3(cCharCode, 16), -4));
				} else {
					product += C;
				}
			}
		});
	}
	product += '"';
	return product;
};

var GetIntrinsic$4X = require$$0;

var $RegExp$6 = GetIntrinsic$4X('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString$u = ToString$z;

// https://262.ecma-international.org/6.0/#sec-regexpcreate

var RegExpCreate$3 = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString$u(P);
	var flags = typeof F === 'undefined' ? '' : ToString$u(F);
	return new $RegExp$6(pattern, flags);
};

var GetIntrinsic$4W = require$$0;

var $TypeError$46 = GetIntrinsic$4W('%TypeError%');

var regexExec$3 = require$$1('RegExp.prototype.exec');

var Call$m = Call$r;
var Get$C = Get$K;
var IsCallable$n = IsCallable$t.exports;
var Type$43 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec$3 = function RegExpExec(R, S) {
	if (Type$43(R) !== 'Object') {
		throw new $TypeError$46('Assertion failed: `R` must be an Object');
	}
	if (Type$43(S) !== 'String') {
		throw new $TypeError$46('Assertion failed: `S` must be a String');
	}
	var exec = Get$C(R, 'exec');
	if (IsCallable$n(exec)) {
		var result = Call$m(exec, R, [S]);
		if (result === null || Type$43(result) === 'Object') {
			return result;
		}
		throw new $TypeError$46('"exec" method must return `null` or an Object');
	}
	return regexExec$3(R, S);
};

var GetIntrinsic$4V = require$$0;

var $TypeError$45 = GetIntrinsic$4V('%TypeError%');

var SameValue$w = SameValue$D;

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

var SameValueNonNumber$2 = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError$45('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue$w(x, y);
};

var $isNaN$y = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero$6 = function SameValueZero(x, y) {
	return (x === y) || ($isNaN$y(x) && $isNaN$y(y));
};

var floor$E = floor$L;
var modulo$F = modulo$L;

var timeConstants$c = timeConstants$s;
var msPerSecond$9 = timeConstants$c.msPerSecond;
var SecondsPerMinute$3 = timeConstants$c.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$6 = function SecFromTime(t) {
	return modulo$F(floor$E(t / msPerSecond$9), SecondsPerMinute$3);
};

var GetIntrinsic$4U = require$$0;

var $TypeError$44 = GetIntrinsic$4U('%TypeError%');

var IsPropertyKey$W = IsPropertyKey$1a;
var SameValue$v = SameValue$D;
var Type$42 = Type$4N;

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation$3 = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set$3 = function Set(O, P, V, Throw) {
	if (Type$42(O) !== 'Object') {
		throw new $TypeError$44('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$W(P)) {
		throw new $TypeError$44('Assertion failed: `P` must be a Property Key');
	}
	if (Type$42(Throw) !== 'Boolean') {
		throw new $TypeError$44('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation$3 && !SameValue$v(O[P], V)) {
			throw new $TypeError$44('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation$3 ? SameValue$v(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

var GetIntrinsic$4T = require$$0;

var has$o = require$$0$1;

var $TypeError$43 = GetIntrinsic$4T('%TypeError%');

var getSymbolDescription$3 = requireGetSymbolDescription();

var DefinePropertyOrThrow$k = DefinePropertyOrThrow$m;
var IsExtensible$j = IsExtensible$m;
var Type$41 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName$3 = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$43('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible$j(F) || has$o(F, 'name')) {
		throw new $TypeError$43('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$41(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$43('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription$3(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow$k(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var GetIntrinsic$4S = require$$0;

var $SyntaxError$g = GetIntrinsic$4S('%SyntaxError%');
var $TypeError$42 = GetIntrinsic$4S('%TypeError%');
var $preventExtensions$6 = GetIntrinsic$4S('%Object.preventExtensions%');
var $gOPD$d = getOwnPropertyDescriptor;
var $gOPN$a = GetIntrinsic$4S('%Object.getOwnPropertyNames%');

var forEach$c = requireForEach();

var DefinePropertyOrThrow$j = DefinePropertyOrThrow$m;
var IsAccessorDescriptor$l = IsAccessorDescriptor$s;
var ToPropertyDescriptor$j = ToPropertyDescriptor$n;
var Type$40 = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel$3 = function SetIntegrityLevel(O, level) {
	if (Type$40(O) !== 'Object') {
		throw new $TypeError$42('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$42('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions$6) {
		throw new $SyntaxError$g('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions$6(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$a) {
		throw new $SyntaxError$g('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$a(O);
	if (level === 'sealed') {
		forEach$c(theKeys, function (k) {
			DefinePropertyOrThrow$j(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach$c(theKeys, function (k) {
			var currentDesc = $gOPD$d(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor$l(ToPropertyDescriptor$j(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow$j(O, k, desc);
			}
		});
	}
	return true;
};

var GetIntrinsic$4R = require$$0;

var $species$6 = GetIntrinsic$4R('%Symbol.species%', true);
var $TypeError$41 = GetIntrinsic$4R('%TypeError%');

var IsConstructor$c = IsConstructor$f.exports;
var Type$3$ = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor$3 = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$3$(O) !== 'Object') {
		throw new $TypeError$41('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$3$(C) !== 'Object') {
		throw new $TypeError$41('O.constructor is not an Object');
	}
	var S = $species$6 ? C[$species$6] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor$c(S)) {
		return S;
	}
	throw new $TypeError$41('no constructor found');
};

var GetIntrinsic$4Q = require$$0;
var callBound$Z = require$$1;

var $TypeError$40 = GetIntrinsic$4Q('%TypeError%');

var IsInteger$t = IsInteger$y;
var Type$3_ = Type$4N;

var $charAt$b = callBound$Z('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

var SplitMatch$3 = function SplitMatch(S, q, R) {
	if (Type$3_(S) !== 'String') {
		throw new $TypeError$40('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$t(q)) {
		throw new $TypeError$40('Assertion failed: `q` must be an integer');
	}
	if (Type$3_(R) !== 'String') {
		throw new $TypeError$40('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt$b(S, q + i) !== $charAt$b(R, i)) {
			return false;
		}
	}

	return q + r;
};

var GetIntrinsic$4P = require$$0;

var $Object$9 = GetIntrinsic$4P('%Object%');
var $StringPrototype$3 = GetIntrinsic$4P('%String.prototype%');
var $SyntaxError$f = GetIntrinsic$4P('%SyntaxError%');
var $TypeError$3$ = GetIntrinsic$4P('%TypeError%');

var DefinePropertyOrThrow$i = DefinePropertyOrThrow$m;
var Type$3Z = Type$4N;

var setProto$3 = requireSetProto();

// https://262.ecma-international.org/6.0/#sec-stringcreate

var StringCreate$3 = function StringCreate(value, prototype) {
	if (Type$3Z(value) !== 'String') {
		throw new $TypeError$3$('Assertion failed: `S` must be a String');
	}

	var S = $Object$9(value);
	if (S !== $StringPrototype$3) {
		if (setProto$3) {
			setProto$3(S, prototype);
		} else {
			throw new $SyntaxError$f('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow$i(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

var GetIntrinsic$4O = require$$0;

var $TypeError$3_ = GetIntrinsic$4O('%TypeError%');

var callBound$Y = require$$1;
var $charAt$a = callBound$Y('String.prototype.charAt');
var $stringToString$3 = callBound$Y('String.prototype.toString');

var CanonicalNumericIndexString$6 = CanonicalNumericIndexString$7;
var IsInteger$s = IsInteger$y;
var IsPropertyKey$V = IsPropertyKey$1a;
var Type$3Y = Type$4N;

var isNegativeZero$4 = require$$6;

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

var StringGetOwnProperty$3 = function StringGetOwnProperty(S, P) {
	var str;
	if (Type$3Y(S) === 'Object') {
		try {
			str = $stringToString$3(S);
		} catch (e) { /**/ }
	}
	if (Type$3Y(str) !== 'String') {
		throw new $TypeError$3_('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey$V(P)) {
		throw new $TypeError$3_('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type$3Y(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString$6(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger$s(index) || isNegativeZero$4(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt$a(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

var GetIntrinsic$4N = require$$0;

var $TypeError$3Z = GetIntrinsic$4N('%TypeError%');

var callBound$X = require$$1;

var $SymbolToString$3 = callBound$X('Symbol.prototype.toString', true);

var Type$3X = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString$3 = function SymbolDescriptiveString(sym) {
	if (Type$3X(sym) !== 'Symbol') {
		throw new $TypeError$3Z('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString$3(sym);
};

var GetIntrinsic$4M = require$$0;

var $gOPD$c = getOwnPropertyDescriptor;
var $gOPN$9 = GetIntrinsic$4M('%Object.getOwnPropertyNames%');
var $TypeError$3Y = GetIntrinsic$4M('%TypeError%');

var every$7 = requireEvery();

var IsDataDescriptor$u = IsDataDescriptor$E;
var IsExtensible$i = IsExtensible$m;
var ToPropertyDescriptor$i = ToPropertyDescriptor$n;
var Type$3W = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel$3 = function TestIntegrityLevel(O, level) {
	if (Type$3W(O) !== 'Object') {
		throw new $TypeError$3Y('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$3Y('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible$i(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN$9(O);
	return theKeys.length === 0 || every$7(theKeys, function (k) {
		var currentDesc = $gOPD$c(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor$u(ToPropertyDescriptor$i(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var $BooleanValueOf$3 = require$$1('Boolean.prototype.valueOf');

var Type$3V = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue$3 = function thisBooleanValue(value) {
	if (Type$3V(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf$3(value);
};

var callBound$W = require$$1;

var Type$3U = Type$4N;

var $NumberValueOf$3 = callBound$W('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue$3 = function thisNumberValue(value) {
	if (Type$3U(value) === 'Number') {
		return value;
	}

	return $NumberValueOf$3(value);
};

var $StringValueOf$3 = require$$1('String.prototype.valueOf');

var Type$3T = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue$3 = function thisStringValue(value) {
	if (Type$3T(value) === 'String') {
		return value;
	}

	return $StringValueOf$3(value);
};

var $DateValueOf$1 = require$$1('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

var thisTimeValue$3 = function thisTimeValue(value) {
	return $DateValueOf$1(value);
};

var GetIntrinsic$4L = require$$0;

var $Date$a = GetIntrinsic$4L('%Date%');
var $Number$a = GetIntrinsic$4L('%Number%');

var $isFinite$q = _isFinite;

var abs$h = abs$j;
var ToNumber$I = ToNumber$P;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip$3 = function TimeClip(time) {
	if (!$isFinite$q(time) || abs$h(time) > 8.64e15) {
		return NaN;
	}
	return $Number$a(new $Date$a(ToNumber$I(time)));
};

var msPerDay$d = timeConstants$s.msPerDay;

var DayFromYear$9 = DayFromYear$b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear$3 = function TimeFromYear(y) {
	return msPerDay$d * DayFromYear$9(y);
};

var modulo$E = modulo$L;

var msPerDay$c = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay$3 = function TimeWithinDay(t) {
	return modulo$E(t, msPerDay$c);
};

var GetIntrinsic$4K = require$$0;

var $TypeError$3X = GetIntrinsic$4K('%TypeError%');
var $Date$9 = GetIntrinsic$4K('%Date%');

var $isNaN$x = _isNaN;

var Type$3S = Type$4N;

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString$3 = function ToDateString(tv) {
	if (Type$3S(tv) !== 'Number') {
		throw new $TypeError$3X('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN$x(tv)) {
		return 'Invalid Date';
	}
	return $Date$9(tv);
};

var GetIntrinsic$4J = require$$0;

var $RangeError$d = GetIntrinsic$4J('%RangeError%');

var ToInteger$f = ToInteger$j;
var ToLength$b = ToLength$d;
var SameValueZero$5 = SameValueZero$6;

// https://262.ecma-international.org/8.0/#sec-toindex

var ToIndex$3 = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger$f(value);
	if (integerIndex < 0) {
		throw new $RangeError$d('index must be >= 0');
	}
	var index = ToLength$b(integerIndex);
	if (!SameValueZero$5(integerIndex, index)) {
		throw new $RangeError$d('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

var abs$g = abs$j;
var floor$D = floor$L;
var modulo$D = modulo$L;
var ToNumber$H = ToNumber$P;

var $isNaN$w = _isNaN;
var $isFinite$p = _isFinite;
var $sign$7 = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$7 = function ToUint16(value) {
	var number = ToNumber$H(value);
	if ($isNaN$w(number) || number === 0 || !$isFinite$p(number)) { return 0; }
	var posInt = $sign$7(number) * floor$D(abs$g(number));
	return modulo$D(posInt, 0x10000);
};

var ToUint16$6 = ToUint16$7;

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16$3 = function ToInt16(argument) {
	var int16bit = ToUint16$6(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

var ToNumber$G = ToNumber$P;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$8 = function ToInt32(x) {
	return ToNumber$G(x) >> 0;
};

var ToNumber$F = ToNumber$P;

var $isNaN$v = _isNaN;
var $isFinite$o = _isFinite;
var $sign$6 = sign;

var abs$f = abs$j;
var floor$C = floor$L;
var modulo$C = modulo$L;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

var ToUint8$7 = function ToUint8(argument) {
	var number = ToNumber$F(argument);
	if ($isNaN$v(number) || number === 0 || !$isFinite$o(number)) { return 0; }
	var posInt = $sign$6(number) * floor$C(abs$f(number));
	return modulo$C(posInt, 0x100);
};

var ToUint8$6 = ToUint8$7;

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8$3 = function ToInt8(argument) {
	var int8bit = ToUint8$6(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var GetIntrinsic$4I = require$$0;

var $String$a = GetIntrinsic$4I('%String%');

var ToPrimitive$g = ToPrimitive$k;
var ToString$t = ToString$z;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey$3 = function ToPropertyKey(argument) {
	var key = ToPrimitive$g(argument, $String$a);
	return typeof key === 'symbol' ? key : ToString$t(key);
};

var ToNumber$E = ToNumber$P;
var floor$B = floor$L;

var $isNaN$u = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp$3 = function ToUint8Clamp(argument) {
	var number = ToNumber$E(argument);
	if ($isNaN$u(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor$B(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var GetIntrinsic$4H = require$$0;

var $TypeError$3W = GetIntrinsic$4H('%TypeError%');
var $fromCharCode$7 = GetIntrinsic$4H('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate$8 = isLeadingSurrogate$d;
var isTrailingSurrogate$8 = isTrailingSurrogate$d;

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

var UTF16Decode$2 = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate$8(lead) || !isTrailingSurrogate$8(trail)) {
		throw new $TypeError$3W('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode$7(lead) + $fromCharCode$7(trail);
};

var GetIntrinsic$4G = require$$0;

var $TypeError$3V = GetIntrinsic$4G('%TypeError%');
var $fromCharCode$6 = GetIntrinsic$4G('%String.fromCharCode%');

var floor$A = floor$L;
var modulo$B = modulo$L;

var isCodePoint$3 = requireIsCodePoint();

// https://262.ecma-international.org/7.0/#sec-utf16encoding

var UTF16Encoding$5 = function UTF16Encoding(cp) {
	if (!isCodePoint$3(cp)) {
		throw new $TypeError$3V('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode$6(cp);
	}
	var cu1 = floor$A((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo$B(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode$6(cu1) + $fromCharCode$6(cu2);
};

var Day$c = Day$f;
var modulo$A = modulo$L;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$6 = function WeekDay(t) {
	return modulo$A(Day$c(t) + 4, 7);
};

/* eslint global-require: 0 */
// https://262.ecma-international.org/8.0/#sec-abstract-operations
var ES2017$1 = {
	'Abstract Equality Comparison': AbstractEqualityComparison$3,
	'Abstract Relational Comparison': AbstractRelationalComparison$3,
	'Strict Equality Comparison': StrictEqualityComparison$3,
	abs: abs$j,
	AdvanceStringIndex: AdvanceStringIndex$7,
	ArrayCreate: ArrayCreate$3,
	ArraySetLength: ArraySetLength$3,
	ArraySpeciesCreate: ArraySpeciesCreate$3,
	Call: Call$r,
	CanonicalNumericIndexString: CanonicalNumericIndexString$7,
	CompletePropertyDescriptor: CompletePropertyDescriptor$3,
	CreateDataProperty: CreateDataProperty$9,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow$6,
	CreateHTML: CreateHTML$3,
	CreateIterResultObject: CreateIterResultObject$3,
	CreateListFromArrayLike: CreateListFromArrayLike$3,
	CreateMethodProperty: CreateMethodProperty$3,
	DateFromTime: DateFromTime$a,
	Day: Day$f,
	DayFromYear: DayFromYear$b,
	DaysInYear: DaysInYear$7,
	DayWithinYear: DayWithinYear$b,
	DefinePropertyOrThrow: DefinePropertyOrThrow$m,
	DeletePropertyOrThrow: DeletePropertyOrThrow$3,
	EnumerableOwnProperties: EnumerableOwnProperties,
	floor: floor$L,
	FromPropertyDescriptor: FromPropertyDescriptor$j,
	Get: Get$K,
	GetIterator: GetIterator$9,
	GetMethod: GetMethod$f,
	GetOwnPropertyKeys: GetOwnPropertyKeys$3,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor$7,
	GetSubstitution: GetSubstitution$3,
	GetV: GetV$b,
	HasOwnProperty: HasOwnProperty$6,
	HasProperty: HasProperty$5,
	HourFromTime: HourFromTime$6,
	InLeapYear: InLeapYear$b,
	InstanceofOperator: InstanceofOperator$3,
	Invoke: Invoke$7,
	IsAccessorDescriptor: IsAccessorDescriptor$s,
	IsArray: IsArray$N,
	IsCallable: IsCallable$t.exports,
	IsConcatSpreadable: IsConcatSpreadable$3,
	IsConstructor: IsConstructor$f.exports,
	IsDataDescriptor: IsDataDescriptor$E,
	IsExtensible: IsExtensible$m,
	IsGenericDescriptor: IsGenericDescriptor$b,
	IsInteger: IsInteger$y,
	IsPromise: IsPromise$3,
	IsPropertyDescriptor: IsPropertyDescriptor,
	IsPropertyKey: IsPropertyKey$1a,
	IsRegExp: IsRegExp$7,
	IterableToList: IterableToList$3,
	IteratorClose: IteratorClose$5,
	IteratorComplete: IteratorComplete$7,
	IteratorNext: IteratorNext$7,
	IteratorStep: IteratorStep$9,
	IteratorValue: IteratorValue$9,
	MakeDate: MakeDate$3,
	MakeDay: MakeDay$3,
	MakeTime: MakeTime$3,
	MinFromTime: MinFromTime$6,
	modulo: modulo$L,
	MonthFromTime: MonthFromTime$e,
	msFromTime: msFromTime$3,
	ObjectCreate: ObjectCreate$5,
	OrdinaryCreateFromConstructor: OrdinaryCreateFromConstructor$3,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty$7,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty$b,
	OrdinaryGetPrototypeOf: OrdinaryGetPrototypeOf$7,
	OrdinaryHasInstance: OrdinaryHasInstance$7,
	OrdinaryHasProperty: OrdinaryHasProperty$3,
	OrdinarySetPrototypeOf: OrdinarySetPrototypeOf$3,
	QuoteJSONString: QuoteJSONString$3,
	RegExpCreate: RegExpCreate$3,
	RegExpExec: RegExpExec$3,
	RequireObjectCoercible: RequireObjectCoercible$d.exports,
	SameValue: SameValue$D,
	SameValueNonNumber: SameValueNonNumber$2,
	SameValueZero: SameValueZero$6,
	SecFromTime: SecFromTime$6,
	Set: _Set$3,
	SetFunctionName: SetFunctionName$3,
	SetIntegrityLevel: SetIntegrityLevel$3,
	SpeciesConstructor: SpeciesConstructor$3,
	SplitMatch: SplitMatch$3,
	StringCreate: StringCreate$3,
	StringGetOwnProperty: StringGetOwnProperty$3,
	SymbolDescriptiveString: SymbolDescriptiveString$3,
	TestIntegrityLevel: TestIntegrityLevel$3,
	thisBooleanValue: thisBooleanValue$3,
	thisNumberValue: thisNumberValue$3,
	thisStringValue: thisStringValue$3,
	thisTimeValue: thisTimeValue$3,
	TimeClip: TimeClip$3,
	TimeFromYear: TimeFromYear$3,
	TimeWithinDay: TimeWithinDay$3,
	ToBoolean: ToBoolean$n,
	ToDateString: ToDateString$3,
	ToIndex: ToIndex$3,
	ToInt16: ToInt16$3,
	ToInt32: ToInt32$8,
	ToInt8: ToInt8$3,
	ToInteger: ToInteger$j,
	ToLength: ToLength$d,
	ToNumber: ToNumber$P,
	ToObject: ToObject$d,
	ToPrimitive: ToPrimitive$k,
	ToPropertyDescriptor: ToPropertyDescriptor$n,
	ToPropertyKey: ToPropertyKey$3,
	ToString: ToString$z,
	ToUint16: ToUint16$7,
	ToUint32: ToUint32$b,
	ToUint8: ToUint8$7,
	ToUint8Clamp: ToUint8Clamp$3,
	Type: Type$4N,
	UTF16Decode: UTF16Decode$2,
	UTF16Encoding: UTF16Encoding$5,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor$7,
	WeekDay: WeekDay$6,
	YearFromTime: YearFromTime$i
};

var es2017 = ES2017$1;

var toPrimitive$2 = require$$0$4;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$f = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive$2(input, arguments[1]);
	}
	return toPrimitive$2(input);
};

var GetIntrinsic$4F = require$$0;

var $TypeError$3U = GetIntrinsic$4F('%TypeError%');
var $Number$9 = GetIntrinsic$4F('%Number%');
var $RegExp$5 = GetIntrinsic$4F('%RegExp%');
var $parseInteger$2 = GetIntrinsic$4F('%parseInt%');

var callBound$V = require$$1;
var regexTester$5 = requireRegexTester();
var isPrimitive$6 = requireIsPrimitive();

var $strSlice$8 = callBound$V('String.prototype.slice');
var isBinary$2 = regexTester$5(/^0b[01]+$/i);
var isOctal$2 = regexTester$5(/^0o[0-7]+$/i);
var isInvalidHexLiteral$2 = regexTester$5(/^[-+]0x[0-9a-f]+$/i);
var nonWS$2 = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex$2 = new $RegExp$5('[' + nonWS$2 + ']', 'g');
var hasNonWS$2 = regexTester$5(nonWSregex$2);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws$2 = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex$2 = new RegExp('(^[' + ws$2 + ']+)|([' + ws$2 + ']+$)', 'g');
var $replace$5 = callBound$V('String.prototype.replace');
var $trim$2 = function (value) {
	return $replace$5(value, trimRegex$2, '');
};

var ToPrimitive$e = ToPrimitive$f;

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber$D = function ToNumber(argument) {
	var value = isPrimitive$6(argument) ? argument : ToPrimitive$e(argument, $Number$9);
	if (typeof value === 'symbol') {
		throw new $TypeError$3U('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary$2(value)) {
			return ToNumber($parseInteger$2($strSlice$8(value, 2), 2));
		} else if (isOctal$2(value)) {
			return ToNumber($parseInteger$2($strSlice$8(value, 2), 8));
		} else if (hasNonWS$2(value) || isInvalidHexLiteral$2(value)) {
			return NaN;
		} else {
			var trimmed = $trim$2(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number$9(value);
};

var ES5Type$2 = Type$6N;

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

var Type$3R = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type$2(x);
};

var ToNumber$C = ToNumber$D;
var ToPrimitive$d = ToPrimitive$f;
var Type$3Q = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison$2 = function AbstractEqualityComparison(x, y) {
	var xType = Type$3Q(x);
	var yType = Type$3Q(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$C(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$C(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$C(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$C(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$d(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive$d(x), y);
	}
	return false;
};

var GetIntrinsic$4E = require$$0;

var $Number$8 = GetIntrinsic$4E('%Number%');
var $TypeError$3T = GetIntrinsic$4E('%TypeError%');

var $isNaN$t = _isNaN;
var $isFinite$n = _isFinite;
var isPrefixOf$5 = requireIsPrefixOf();

var ToNumber$B = ToNumber$D;
var ToPrimitive$c = ToPrimitive$f;
var Type$3P = Type$3R;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison$2 = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$3P(LeftFirst) !== 'Boolean') {
		throw new $TypeError$3T('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$c(x, $Number$8);
		py = ToPrimitive$c(y, $Number$8);
	} else {
		py = ToPrimitive$c(y, $Number$8);
		px = ToPrimitive$c(x, $Number$8);
	}
	var bothStrings = Type$3P(px) === 'String' && Type$3P(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$B(px);
		var ny = ToNumber$B(py);
		if ($isNaN$t(nx) || $isNaN$t(ny)) {
			return undefined;
		}
		if ($isFinite$n(nx) && $isFinite$n(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$5(py, px)) {
		return false;
	}
	if (isPrefixOf$5(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$3O = Type$3R;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison$2 = function StrictEqualityComparison(x, y) {
	var xType = Type$3O(x);
	var yType = Type$3O(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$4D = require$$0;

var $abs$2 = GetIntrinsic$4D('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$e = function abs(x) {
	return $abs$2(x);
};

// var modulo = require('./modulo');
var $floor$2 = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$z = function floor(x) {
	// return x - modulo(x, 1);
	return $floor$2(x);
};

var abs$d = abs$e;
var floor$y = floor$z;

var $isNaN$s = _isNaN;
var $isFinite$m = _isFinite;

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger$r = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN$s(argument) || !$isFinite$m(argument)) {
		return false;
	}
	var absValue = abs$d(argument);
	return floor$y(absValue) === absValue;
};

var GetIntrinsic$4C = require$$0;

var IsInteger$q = IsInteger$r;
var Type$3N = Type$3R;

var MAX_SAFE_INTEGER$7 = maxSafeInteger;
var isLeadingSurrogate$7 = isLeadingSurrogate$d;
var isTrailingSurrogate$7 = isTrailingSurrogate$d;

var $TypeError$3S = GetIntrinsic$4C('%TypeError%');

var $charCodeAt$8 = require$$1('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex$5 = function AdvanceStringIndex(S, index, unicode) {
	if (Type$3N(S) !== 'String') {
		throw new $TypeError$3S('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$q(index) || index < 0 || index > MAX_SAFE_INTEGER$7) {
		throw new $TypeError$3S('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$3N(unicode) !== 'Boolean') {
		throw new $TypeError$3S('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt$8(S, index);
	if (!isLeadingSurrogate$7(first)) {
		return index + 1;
	}

	var second = $charCodeAt$8(S, index + 1);
	if (!isTrailingSurrogate$7(second)) {
		return index + 1;
	}

	return index + 2;
};

var GetIntrinsic$4B = require$$0;

var $ArrayPrototype$2 = GetIntrinsic$4B('%Array.prototype%');
var $RangeError$c = GetIntrinsic$4B('%RangeError%');
var $SyntaxError$e = GetIntrinsic$4B('%SyntaxError%');
var $TypeError$3R = GetIntrinsic$4B('%TypeError%');

var IsInteger$p = IsInteger$r;

var MAX_ARRAY_LENGTH$2 = Math.pow(2, 32) - 1;

var $setProto$5 = GetIntrinsic$4B('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype$2
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate$2 = function ArrayCreate(length) {
	if (!IsInteger$p(length) || length < 0) {
		throw new $TypeError$3R('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH$2) {
		throw new $RangeError$c('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype$2;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype$2) { // step 8
		if (!$setProto$5) {
			throw new $SyntaxError$e('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto$5(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var GetIntrinsic$4A = require$$0;

var $Array$5 = GetIntrinsic$4A('%Array%');

// eslint-disable-next-line global-require
var toStr$2 = !$Array$5.isArray && require$$1('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray$C = $Array$5.isArray || function IsArray(argument) {
	return toStr$2(argument) === '[object Array]';
};

var has$n = require$$0$1;

var assertRecord$e = assertRecord$y;

var Type$3M = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor$k = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$e(Type$3M, 'Property Descriptor', 'Desc', Desc);

	if (!has$n(Desc, '[[Get]]') && !has$n(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var has$m = require$$0$1;

var assertRecord$d = assertRecord$y;

var Type$3L = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor$t = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$d(Type$3L, 'Property Descriptor', 'Desc', Desc);

	if (!has$m(Desc, '[[Value]]') && !has$m(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$4z = require$$0;

var $Object$8 = GetIntrinsic$4z('%Object%');

var isPrimitive$5 = requireIsPrimitive();

var $preventExtensions$5 = $Object$8.preventExtensions;
var $isExtensible$2 = $Object$8.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible$h = $preventExtensions$5
	? function IsExtensible(obj) {
		return !isPrimitive$5(obj) && $isExtensible$2(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive$5(obj);
	};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$U = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$h = function ToBoolean(value) { return !!value; };

var IsCallable$m = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$m));

var has$l = require$$0$1;

var GetIntrinsic$4y = require$$0;

var $TypeError$3Q = GetIntrinsic$4y('%TypeError%');

var Type$3K = Type$3R;
var ToBoolean$g = ToBoolean$h;
var IsCallable$l = IsCallable$m.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$h = function ToPropertyDescriptor(Obj) {
	if (Type$3K(Obj) !== 'Object') {
		throw new $TypeError$3Q('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$l(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$g(Obj.enumerable);
	}
	if (has$l(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$g(Obj.configurable);
	}
	if (has$l(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$l(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$g(Obj.writable);
	}
	if (has$l(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$l(getter)) {
			throw new $TypeError$3Q('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$l(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$l(setter)) {
			throw new $TypeError$3Q('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$l(desc, '[[Get]]') || has$l(desc, '[[Set]]')) && (has$l(desc, '[[Value]]') || has$l(desc, '[[Writable]]'))) {
		throw new $TypeError$3Q('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $isNaN$r = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$u = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$r(x) && $isNaN$r(y);
};

var assertRecord$c = assertRecord$y;

var Type$3J = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor$e = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$c(Type$3J, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var assertRecord$b = assertRecord$y;

var IsAccessorDescriptor$j = IsAccessorDescriptor$k;
var IsDataDescriptor$s = IsDataDescriptor$t;
var Type$3I = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor$8 = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$b(Type$3I, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$j(Desc) && !IsDataDescriptor$s(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$4x = require$$0;

var $TypeError$3P = GetIntrinsic$4x('%TypeError%');

var DefineOwnProperty$b = requireDefineOwnProperty();
var isPropertyDescriptor$b = isPropertyDescriptor$s;
var isSamePropertyDescriptor$2 = requireIsSamePropertyDescriptor();

var FromPropertyDescriptor$d = FromPropertyDescriptor$e;
var IsAccessorDescriptor$i = IsAccessorDescriptor$k;
var IsDataDescriptor$r = IsDataDescriptor$t;
var IsGenericDescriptor$7 = IsGenericDescriptor$8;
var IsPropertyKey$T = IsPropertyKey$U;
var SameValue$t = SameValue$u;
var Type$3H = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor$5 = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$3H(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$3P('Assertion failed: O must be undefined or an Object');
	}
	if (Type$3H(extensible) !== 'Boolean') {
		throw new $TypeError$3P('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor$b({
		Type: Type$3H,
		IsDataDescriptor: IsDataDescriptor$r,
		IsAccessorDescriptor: IsAccessorDescriptor$i
	}, Desc)) {
		throw new $TypeError$3P('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$3H(current) !== 'Undefined' && !isPropertyDescriptor$b({
		Type: Type$3H,
		IsDataDescriptor: IsDataDescriptor$r,
		IsAccessorDescriptor: IsAccessorDescriptor$i
	}, current)) {
		throw new $TypeError$3P('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey$T(P)) {
		throw new $TypeError$3P('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$3H(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor$7(Desc) || IsDataDescriptor$r(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$b(
					IsDataDescriptor$r,
					SameValue$t,
					FromPropertyDescriptor$d,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor$i(Desc)) {
				throw new $TypeError$3P('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty$b(
					IsDataDescriptor$r,
					SameValue$t,
					FromPropertyDescriptor$d,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor$7(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor$2({ SameValue: SameValue$t }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor$7(Desc)) ; else if (IsDataDescriptor$r(current) !== IsDataDescriptor$r(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor$r(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$b(
					IsDataDescriptor$r,
					SameValue$t,
					FromPropertyDescriptor$d,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty$b(
				IsDataDescriptor$r,
				SameValue$t,
				FromPropertyDescriptor$d,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor$r(current) && IsDataDescriptor$r(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue$t(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor$i(current) && IsAccessorDescriptor$i(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue$t(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue$t(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$3P('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty$b(
			IsDataDescriptor$r,
			SameValue$t,
			FromPropertyDescriptor$d,
			O,
			P,
			Desc
		);
	}
	return true;
};

var GetIntrinsic$4w = require$$0;

var $gOPD$b = getOwnPropertyDescriptor;
var $SyntaxError$d = GetIntrinsic$4w('%SyntaxError%');
var $TypeError$3O = GetIntrinsic$4w('%TypeError%');

var isPropertyDescriptor$a = isPropertyDescriptor$s;

var IsAccessorDescriptor$h = IsAccessorDescriptor$k;
var IsDataDescriptor$q = IsDataDescriptor$t;
var IsExtensible$g = IsExtensible$h;
var IsPropertyKey$S = IsPropertyKey$U;
var ToPropertyDescriptor$g = ToPropertyDescriptor$h;
var SameValue$s = SameValue$u;
var Type$3G = Type$3R;
var ValidateAndApplyPropertyDescriptor$4 = ValidateAndApplyPropertyDescriptor$5;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty$5 = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$3G(O) !== 'Object') {
		throw new $TypeError$3O('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$S(P)) {
		throw new $TypeError$3O('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor$a({
		Type: Type$3G,
		IsDataDescriptor: IsDataDescriptor$q,
		IsAccessorDescriptor: IsAccessorDescriptor$h
	}, Desc)) {
		throw new $TypeError$3O('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD$b) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor$h(Desc)) {
			throw new $SyntaxError$d('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue$s(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$d('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD$b(O, P);
	var current = desc && ToPropertyDescriptor$g(desc);
	var extensible = IsExtensible$g(O);
	return ValidateAndApplyPropertyDescriptor$4(O, P, extensible, Desc, current);
};

var GetIntrinsic$4v = require$$0;

var $match$2 = GetIntrinsic$4v('%Symbol.match%', true);

var hasRegExpMatcher$2 = require$$1$2;

var ToBoolean$f = ToBoolean$h;

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp$5 = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match$2) {
		var isRegExp = argument[$match$2];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean$f(isRegExp);
		}
	}
	return hasRegExpMatcher$2(argument);
};

var GetIntrinsic$4u = require$$0;

var $gOPD$a = getOwnPropertyDescriptor;
var $TypeError$3N = GetIntrinsic$4u('%TypeError%');

var callBound$U = require$$1;

var $isEnumerable$8 = callBound$U('Object.prototype.propertyIsEnumerable');

var has$k = require$$0$1;

var IsArray$B = IsArray$C;
var IsPropertyKey$R = IsPropertyKey$U;
var IsRegExp$4 = IsRegExp$5;
var ToPropertyDescriptor$f = ToPropertyDescriptor$h;
var Type$3F = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty$8 = function OrdinaryGetOwnProperty(O, P) {
	if (Type$3F(O) !== 'Object') {
		throw new $TypeError$3N('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$R(P)) {
		throw new $TypeError$3N('Assertion failed: P must be a Property Key');
	}
	if (!has$k(O, P)) {
		return void 0;
	}
	if (!$gOPD$a) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray$B(O) && P === 'length';
		var regexLastIndex = IsRegExp$4(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$8(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor$f($gOPD$a(O, P));
};

var GetIntrinsic$4t = require$$0;

var $String$9 = GetIntrinsic$4t('%String%');
var $TypeError$3M = GetIntrinsic$4t('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$s = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$3M('Cannot convert a Symbol value to a string');
	}
	return $String$9(argument);
};

var ToNumber$A = ToNumber$D;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$9 = function ToUint32(x) {
	return ToNumber$A(x) >>> 0;
};

var GetIntrinsic$4s = require$$0;

var $RangeError$b = GetIntrinsic$4s('%RangeError%');
var $TypeError$3L = GetIntrinsic$4s('%TypeError%');

var assign$3 = require$$1$3;

var isPropertyDescriptor$9 = isPropertyDescriptor$s;

var IsArray$A = IsArray$C;
var IsAccessorDescriptor$g = IsAccessorDescriptor$k;
var IsDataDescriptor$p = IsDataDescriptor$t;
var OrdinaryDefineOwnProperty$4 = OrdinaryDefineOwnProperty$5;
var OrdinaryGetOwnProperty$7 = OrdinaryGetOwnProperty$8;
var ToNumber$z = ToNumber$D;
var ToString$r = ToString$s;
var ToUint32$8 = ToUint32$9;
var Type$3E = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength$2 = function ArraySetLength(A, Desc) {
	if (!IsArray$A(A)) {
		throw new $TypeError$3L('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor$9({
		Type: Type$3E,
		IsDataDescriptor: IsDataDescriptor$p,
		IsAccessorDescriptor: IsAccessorDescriptor$g
	}, Desc)) {
		throw new $TypeError$3L('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty$4(A, 'length', Desc);
	}
	var newLenDesc = assign$3({}, Desc);
	var newLen = ToUint32$8(Desc['[[Value]]']);
	var numberLen = ToNumber$z(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$b('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty$7(A, 'length');
	if (!IsDataDescriptor$p(oldLenDesc)) {
		throw new $TypeError$3L('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty$4(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty$4(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString$r(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty$4(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty$4(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

var GetIntrinsic$4r = require$$0;

var $TypeError$3K = GetIntrinsic$4r('%TypeError%');

var inspect$8 = require$$1$4;

var IsPropertyKey$Q = IsPropertyKey$U;
var Type$3D = Type$3R;

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get$B = function Get(O, P) {
	// 7.3.1.1
	if (Type$3D(O) !== 'Object') {
		throw new $TypeError$3K('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey$Q(P)) {
		throw new $TypeError$3K('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect$8(P));
	}
	// 7.3.1.3
	return O[P];
};

var IsConstructor$b = {exports: {}};

var GetIntrinsic$4q = require$$0;

var $TypeError$3J = GetIntrinsic$4q('%TypeError%');

var isPropertyDescriptor$8 = isPropertyDescriptor$s;
var DefineOwnProperty$a = requireDefineOwnProperty();

var FromPropertyDescriptor$c = FromPropertyDescriptor$e;
var IsAccessorDescriptor$f = IsAccessorDescriptor$k;
var IsDataDescriptor$o = IsDataDescriptor$t;
var IsPropertyKey$P = IsPropertyKey$U;
var SameValue$r = SameValue$u;
var ToPropertyDescriptor$e = ToPropertyDescriptor$h;
var Type$3C = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow$h = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$3C(O) !== 'Object') {
		throw new $TypeError$3J('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$P(P)) {
		throw new $TypeError$3J('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor$8({
		Type: Type$3C,
		IsDataDescriptor: IsDataDescriptor$o,
		IsAccessorDescriptor: IsAccessorDescriptor$f
	}, desc) ? desc : ToPropertyDescriptor$e(desc);
	if (!isPropertyDescriptor$8({
		Type: Type$3C,
		IsDataDescriptor: IsDataDescriptor$o,
		IsAccessorDescriptor: IsAccessorDescriptor$f
	}, Desc)) {
		throw new $TypeError$3J('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty$a(
		IsDataDescriptor$o,
		SameValue$r,
		FromPropertyDescriptor$c,
		O,
		P,
		Desc
	);
};

var GetIntrinsic$4p = GetIntrinsic$7K.exports;

var $construct$2 = GetIntrinsic$4p('%Reflect.construct%', true);

var DefinePropertyOrThrow$g = DefinePropertyOrThrow$h;
try {
	DefinePropertyOrThrow$g({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow$g = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow$g && $construct$2) {
	var isConstructorMarker$2 = {};
	var badArrayLike$2 = {};
	DefinePropertyOrThrow$g(badArrayLike$2, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker$2;
		},
		'[[Enumerable]]': true
	});

	IsConstructor$b.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct$2(argument, badArrayLike$2);
		} catch (err) {
			return err === isConstructorMarker$2;
		}
	};
} else {
	IsConstructor$b.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

var GetIntrinsic$4o = require$$0;

var $Array$4 = GetIntrinsic$4o('%Array%');
var $species$5 = GetIntrinsic$4o('%Symbol.species%', true);
var $TypeError$3I = GetIntrinsic$4o('%TypeError%');

var Get$A = Get$B;
var IsArray$z = IsArray$C;
var IsConstructor$a = IsConstructor$b.exports;
var IsInteger$o = IsInteger$r;
var Type$3B = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate$2 = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger$o(length) || length < 0) {
		throw new $TypeError$3I('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray$z(originalArray);
	if (isArray) {
		C = Get$A(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species$5 && Type$3B(C) === 'Object') {
			C = Get$A(C, $species$5);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array$4(len);
	}
	if (!IsConstructor$a(C)) {
		throw new $TypeError$3I('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var GetIntrinsic$4n = require$$0;
var callBound$T = require$$1;

var $TypeError$3H = GetIntrinsic$4n('%TypeError%');

var IsArray$y = IsArray$C;

var $apply$2 = GetIntrinsic$4n('%Reflect.apply%', true) || callBound$T('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

var Call$l = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$y(argumentsList)) {
		throw new $TypeError$3H('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply$2(F, V, argumentsList);
};

var GetIntrinsic$4m = require$$0;

var $TypeError$3G = GetIntrinsic$4m('%TypeError%');

var SameValue$q = SameValue$u;
var ToNumber$y = ToNumber$D;
var ToString$q = ToString$s;
var Type$3A = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString$5 = function CanonicalNumericIndexString(argument) {
	if (Type$3A(argument) !== 'String') {
		throw new $TypeError$3G('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber$y(argument);
	if (SameValue$q(ToString$q(n), argument)) { return n; }
	return void 0;
};

var has$j = require$$0$1;

var assertRecord$a = assertRecord$y;

var IsDataDescriptor$n = IsDataDescriptor$t;
var IsGenericDescriptor$6 = IsGenericDescriptor$8;
var Type$3z = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor$2 = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord$a(Type$3z, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor$6(Desc) || IsDataDescriptor$n(Desc)) {
		if (!has$j(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has$j(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has$j(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has$j(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has$j(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has$j(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var OwnPropertyKeys$3;
var hasRequiredOwnPropertyKeys;

function requireOwnPropertyKeys () {
	if (hasRequiredOwnPropertyKeys) return OwnPropertyKeys$3;
	hasRequiredOwnPropertyKeys = 1;

	var GetIntrinsic = require$$0;

	var callBind = require$$1$1;
	var callBound = require$$1;

	var $ownKeys = GetIntrinsic('%Reflect.ownKeys%', true);
	var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
	var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);
	var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%', true);
	var $gOPS = $SymbolValueOf ? GetIntrinsic('%Object.getOwnPropertySymbols%') : null;

	var keys = require$$1$5;

	OwnPropertyKeys$3 = $ownKeys || function OwnPropertyKeys(source) {
		var ownKeys = ($gOPN || keys)(source);
		if ($gOPS) {
			$pushApply(ownKeys, $gOPS(source));
		}
		return ownKeys;
	};
	return OwnPropertyKeys$3;
}

var GetIntrinsic$4l = require$$0;

var $TypeError$3F = GetIntrinsic$4l('%TypeError%');

var DefineOwnProperty$9 = requireDefineOwnProperty();

var FromPropertyDescriptor$b = FromPropertyDescriptor$e;
var OrdinaryGetOwnProperty$6 = OrdinaryGetOwnProperty$8;
var IsDataDescriptor$m = IsDataDescriptor$t;
var IsExtensible$f = IsExtensible$h;
var IsPropertyKey$O = IsPropertyKey$U;
var SameValue$p = SameValue$u;
var Type$3y = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty$7 = function CreateDataProperty(O, P, V) {
	if (Type$3y(O) !== 'Object') {
		throw new $TypeError$3F('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$O(P)) {
		throw new $TypeError$3F('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty$6(O, P);
	var extensible = !oldDesc || IsExtensible$f(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty$9(
		IsDataDescriptor$m,
		SameValue$p,
		FromPropertyDescriptor$b,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var RequireObjectCoercible$a = {exports: {}};

(function (module) {

	module.exports = CheckObjectCoercible$1;
} (RequireObjectCoercible$a));

var GetIntrinsic$4k = require$$0;

var $Object$7 = GetIntrinsic$4k('%Object%');

var RequireObjectCoercible$9 = RequireObjectCoercible$a.exports;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$b = function ToObject(value) {
	RequireObjectCoercible$9(value);
	return $Object$7(value);
};

var GetIntrinsic$4j = require$$0;

var $TypeError$3E = GetIntrinsic$4j('%TypeError%');

var callBound$S = require$$1;
var forEach$b = requireForEach();
var OwnPropertyKeys$2 = requireOwnPropertyKeys();

var $isEnumerable$7 = callBound$S('Object.prototype.propertyIsEnumerable');

var CreateDataProperty$6 = CreateDataProperty$7;
var Get$z = Get$B;
var IsArray$x = IsArray$C;
var IsInteger$n = IsInteger$r;
var IsPropertyKey$N = IsPropertyKey$U;
var SameValue$o = SameValue$u;
var ToNumber$x = ToNumber$D;
var ToObject$a = ToObject$b;
var Type$3x = Type$3R;

// https://262.ecma-international.org/9.0/#sec-copydataproperties

var CopyDataProperties$2 = function CopyDataProperties(target, source, excludedItems) {
	if (Type$3x(target) !== 'Object') {
		throw new $TypeError$3E('Assertion failed: "target" must be an Object');
	}

	if (!IsArray$x(excludedItems)) {
		throw new $TypeError$3E('Assertion failed: "excludedItems" must be a List of Property Keys');
	}
	for (var i = 0; i < excludedItems.length; i += 1) {
		if (!IsPropertyKey$N(excludedItems[i])) {
			throw new $TypeError$3E('Assertion failed: "excludedItems" must be a List of Property Keys');
		}
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var fromObj = ToObject$a(source);

	var sourceKeys = OwnPropertyKeys$2(fromObj);
	forEach$b(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach$b(excludedItems, function (e) {
			if (SameValue$o(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable$7(fromObj, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && IsInteger$n(ToNumber$x(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = Get$z(fromObj, nextKey);
			CreateDataProperty$6(target, nextKey, propValue);
		}
	});

	return target;
};

var GetIntrinsic$4i = require$$0;

var $TypeError$3D = GetIntrinsic$4i('%TypeError%');

var CreateDataProperty$5 = CreateDataProperty$7;
var IsPropertyKey$M = IsPropertyKey$U;
var Type$3w = Type$3R;

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$5 = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$3w(O) !== 'Object') {
		throw new $TypeError$3D('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$M(P)) {
		throw new $TypeError$3D('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty$5(O, P, V);
	if (!success) {
		throw new $TypeError$3D('unable to create data property');
	}
	return success;
};

var GetIntrinsic$4h = require$$0;

var $TypeError$3C = GetIntrinsic$4h('%TypeError%');

var callBound$R = require$$1;

var $replace$4 = callBound$R('String.prototype.replace');

var RequireObjectCoercible$8 = RequireObjectCoercible$a.exports;
var ToString$p = ToString$s;
var Type$3v = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML$2 = function CreateHTML(string, tag, attribute, value) {
	if (Type$3v(tag) !== 'String' || Type$3v(attribute) !== 'String') {
		throw new $TypeError$3C('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible$8(string);
	var S = ToString$p(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString$p(value);
		var escapedV = $replace$4(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var GetIntrinsic$4g = require$$0;

var $TypeError$3B = GetIntrinsic$4g('%TypeError%');

var Type$3u = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject$2 = function CreateIterResultObject(value, done) {
	if (Type$3u(done) !== 'Boolean') {
		throw new $TypeError$3B('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

var ES5ToInteger$2 = ToInteger$u;

var ToNumber$w = ToNumber$D;

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

var ToInteger$e = function ToInteger(value) {
	var number = ToNumber$w(value);
	return ES5ToInteger$2(number);
};

var MAX_SAFE_INTEGER$6 = maxSafeInteger;

var ToInteger$d = ToInteger$e;

var ToLength$a = function ToLength(argument) {
	var len = ToInteger$d(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER$6) { return MAX_SAFE_INTEGER$6; }
	return len;
};

var GetIntrinsic$4f = require$$0;

var callBound$Q = require$$1;

var $TypeError$3A = GetIntrinsic$4f('%TypeError%');
var $indexOf$5 = callBound$Q('Array.prototype.indexOf', true) || callBound$Q('String.prototype.indexOf');
var $push$3 = callBound$Q('Array.prototype.push');

var Get$y = Get$B;
var IsArray$w = IsArray$C;
var ToLength$9 = ToLength$a;
var ToString$o = ToString$s;
var Type$3t = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
var CreateListFromArrayLike$2 = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$3t(obj) !== 'Object') {
		throw new $TypeError$3A('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray$w(elementTypes)) {
		throw new $TypeError$3A('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength$9(Get$y(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString$o(index);
		var next = Get$y(obj, indexName);
		var nextType = Type$3t(next);
		if ($indexOf$5(elementTypes, nextType) < 0) {
			throw new $TypeError$3A('item type ' + nextType + ' is not a valid elementType');
		}
		$push$3(list, next);
		index += 1;
	}
	return list;
};

var GetIntrinsic$4e = require$$0;

var $TypeError$3z = GetIntrinsic$4e('%TypeError%');

var DefineOwnProperty$8 = requireDefineOwnProperty();

var FromPropertyDescriptor$a = FromPropertyDescriptor$e;
var IsDataDescriptor$l = IsDataDescriptor$t;
var IsPropertyKey$L = IsPropertyKey$U;
var SameValue$n = SameValue$u;
var Type$3s = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty$2 = function CreateMethodProperty(O, P, V) {
	if (Type$3s(O) !== 'Object') {
		throw new $TypeError$3z('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$L(P)) {
		throw new $TypeError$3z('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty$8(
		IsDataDescriptor$l,
		SameValue$n,
		FromPropertyDescriptor$a,
		O,
		P,
		newDesc
	);
};

var floor$x = floor$z;

var msPerDay$b = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$b = function Day(t) {
	return floor$x(t / msPerDay$b);
};

var floor$w = floor$z;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$8 = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$w((y - 1969) / 4) - floor$w((y - 1901) / 100) + floor$w((y - 1601) / 400);
};

var GetIntrinsic$4d = require$$0;

var $Date$8 = GetIntrinsic$4d('%Date%');

var callBound$P = require$$1;

var $getUTCFullYear$2 = callBound$P('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$e = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear$2(new $Date$8(t));
};

var Day$a = Day$b;
var DayFromYear$7 = DayFromYear$8;
var YearFromTime$d = YearFromTime$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$8 = function DayWithinYear(t) {
	return Day$a(t) - DayFromYear$7(YearFromTime$d(t));
};

var mod$2 = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$z = function modulo(x, y) {
	return mod$2(x, y);
};

var modulo$y = modulo$z;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$5 = function DaysInYear(y) {
	if (modulo$y(y, 4) !== 0) {
		return 365;
	}
	if (modulo$y(y, 100) !== 0) {
		return 366;
	}
	if (modulo$y(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$4c = require$$0;

var $EvalError$5 = GetIntrinsic$4c('%EvalError%');

var DaysInYear$4 = DaysInYear$5;
var YearFromTime$c = YearFromTime$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$8 = function InLeapYear(t) {
	var days = DaysInYear$4(YearFromTime$c(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$5('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$7 = DayWithinYear$8;
var InLeapYear$7 = InLeapYear$8;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$b = function MonthFromTime(t) {
	var day = DayWithinYear$7(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$7(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$4b = require$$0;

var $EvalError$4 = GetIntrinsic$4b('%EvalError%');

var DayWithinYear$6 = DayWithinYear$8;
var InLeapYear$6 = InLeapYear$8;
var MonthFromTime$a = MonthFromTime$b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$8 = function DateFromTime(t) {
	var m = MonthFromTime$a(t);
	var d = DayWithinYear$6(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear$6(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$4('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var padTimeComponent$6;
var hasRequiredPadTimeComponent;

function requirePadTimeComponent () {
	if (hasRequiredPadTimeComponent) return padTimeComponent$6;
	hasRequiredPadTimeComponent = 1;

	var callBound = require$$1;

	var $strSlice = callBound('String.prototype.slice');

	padTimeComponent$6 = function padTimeComponent(c, count) {
		return $strSlice('00' + c, -(count || 2));
	};
	return padTimeComponent$6;
}

var Day$9 = Day$b;
var modulo$x = modulo$z;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$5 = function WeekDay(t) {
	return modulo$x(Day$9(t) + 4, 7);
};

var GetIntrinsic$4a = require$$0;

var $TypeError$3y = GetIntrinsic$4a('%TypeError%');

var weekdays$2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months$2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var $isNaN$q = _isNaN;
var padTimeComponent$5 = requirePadTimeComponent();

var Type$3r = Type$3R;
var WeekDay$4 = WeekDay$5;
var MonthFromTime$9 = MonthFromTime$b;
var YearFromTime$b = YearFromTime$e;
var DateFromTime$7 = DateFromTime$8;

// https://262.ecma-international.org/9.0/#sec-datestring

var DateString$2 = function DateString(tv) {
	if (Type$3r(tv) !== 'Number' || $isNaN$q(tv)) {
		throw new $TypeError$3y('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays$2[WeekDay$4(tv)];
	var month = months$2[MonthFromTime$9(tv)];
	var day = padTimeComponent$5(DateFromTime$7(tv));
	var year = padTimeComponent$5(YearFromTime$b(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

var GetIntrinsic$49 = require$$0;

var $TypeError$3x = GetIntrinsic$49('%TypeError%');

var IsPropertyKey$K = IsPropertyKey$U;
var Type$3q = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow$2 = function DeletePropertyOrThrow(O, P) {
	if (Type$3q(O) !== 'Object') {
		throw new $TypeError$3x('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$K(P)) {
		throw new $TypeError$3x('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$3x('Attempt to delete property failed.');
	}
	return success;
};

var GetIntrinsic$48 = require$$0;

var $TypeError$3w = GetIntrinsic$48('%TypeError%');

var objectKeys$2 = require$$1$5;

var callBound$O = require$$1;

var callBind$5 = require$$1$1;

var $isEnumerable$6 = callBound$O('Object.prototype.propertyIsEnumerable');
var $pushApply$2 = callBind$5.apply(GetIntrinsic$48('%Array.prototype.push%'));

var forEach$a = requireForEach();

var Type$3p = Type$3R;

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

var EnumerableOwnPropertyNames$2 = function EnumerableOwnProperties(O, kind) {
	if (Type$3p(O) !== 'Object') {
		throw new $TypeError$3w('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys$2(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach$a(keys, function (key) {
			if ($isEnumerable$6(O, key)) {
				$pushApply$2(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError$3w('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

var GetIntrinsic$47 = require$$0;

var $TypeError$3v = GetIntrinsic$47('%TypeError%');

var IsPropertyKey$J = IsPropertyKey$U;
var ToObject$9 = ToObject$b;

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV$8 = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey$J(P)) {
		throw new $TypeError$3v('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject$9(V);

	// 7.3.2.4
	return O[P];
};

var GetIntrinsic$46 = require$$0;

var $TypeError$3u = GetIntrinsic$46('%TypeError%');

var GetV$7 = GetV$8;
var IsCallable$k = IsCallable$m.exports;
var IsPropertyKey$I = IsPropertyKey$U;

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$b = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey$I(P)) {
		throw new $TypeError$3u('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV$7(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable$k(func)) {
		throw new $TypeError$3u(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var GetIntrinsic$45 = require$$0;

var $TypeError$3t = GetIntrinsic$45('%TypeError%');

var getIteratorMethod$2 = requireGetIteratorMethod();
var AdvanceStringIndex$4 = AdvanceStringIndex$5;
var Call$k = Call$l;
var GetMethod$a = GetMethod$b;
var IsArray$v = IsArray$C;
var Type$3o = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator$7 = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod$2(
			{
				AdvanceStringIndex: AdvanceStringIndex$4,
				GetMethod: GetMethod$a,
				IsArray: IsArray$v,
				Type: Type$3o
			},
			obj
		);
	}
	var iterator = Call$k(actualMethod, obj);
	if (Type$3o(iterator) !== 'Object') {
		throw new $TypeError$3t('iterator must return an object');
	}

	return iterator;
};

var GetIntrinsic$44 = require$$0;

var hasSymbols$3 = require$$1$6();

var $TypeError$3s = GetIntrinsic$44('%TypeError%');

var $gOPN$8 = GetIntrinsic$44('%Object.getOwnPropertyNames%');
var $gOPS$2 = hasSymbols$3 && GetIntrinsic$44('%Object.getOwnPropertySymbols%');
var keys$2 = require$$1$5;

var esType$2 = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys$2 = function GetOwnPropertyKeys(O, Type) {
	if (esType$2(O) !== 'Object') {
		throw new $TypeError$3s('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS$2 ? $gOPS$2(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$8) {
			return keys$2(O);
		}
		return $gOPN$8(O);
	}
	throw new $TypeError$3s('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var GetIntrinsic$43 = require$$0;

var $Function$2 = GetIntrinsic$43('%Function%');
var $TypeError$3r = GetIntrinsic$43('%TypeError%');

var Get$x = Get$B;
var IsConstructor$9 = IsConstructor$b.exports;
var Type$3n = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor$5 = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic$43(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor$9(constructor)) {
		throw new $TypeError$3r('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get$x(constructor, 'prototype');
	if (Type$3n(proto) !== 'Object') {
		if (!(constructor instanceof $Function$2)) {
			// ignore other realms, for now
			throw new $TypeError$3r('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var GetIntrinsic$42 = require$$0;

var $TypeError$3q = GetIntrinsic$42('%TypeError%');

var callBound$N = require$$1;
var regexTester$4 = requireRegexTester();
var every$6 = requireEvery();

var $charAt$9 = callBound$N('String.prototype.charAt');
var $strSlice$7 = callBound$N('String.prototype.slice');
var $indexOf$4 = callBound$N('String.prototype.indexOf');
var $parseInt$2 = parseInt;

var isDigit$2 = regexTester$4(/^[0-9]$/);

var inspect$7 = require$$1$4;

var Get$w = Get$B;
var IsArray$u = IsArray$C;
var IsInteger$m = IsInteger$r;
var ToObject$8 = ToObject$b;
var ToString$n = ToString$s;
var Type$3m = Type$3R;

var canDistinguishSparseFromUndefined$2 = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole$2 = function (capture, index, arr) {
	return Type$3m(capture) === 'String' || (canDistinguishSparseFromUndefined$2 ? !(index in arr) : Type$3m(capture) === 'Undefined');
};

// http://262.ecma-international.org/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution$2 = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type$3m(matched) !== 'String') {
		throw new $TypeError$3q('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$3m(str) !== 'String') {
		throw new $TypeError$3q('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger$m(position) || position < 0 || position > stringLength) {
		throw new $TypeError$3q('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect$7(position));
	}

	if (!IsArray$u(captures) || !every$6(captures, isStringOrHole$2)) {
		throw new $TypeError$3q('Assertion failed: `captures` must be a List of Strings, got ' + inspect$7(captures));
	}

	if (Type$3m(replacement) !== 'String') {
		throw new $TypeError$3q('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type$3m(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject$8(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt$9(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt$9(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$7(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$7(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt$9(replacement, i + 2);
				if (isDigit$2(next) && next !== '0' && (nextIsLast || !isDigit$2(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt$2(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type$3m(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit$2(next) && (nextIsLast || isDigit$2(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt$2(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type$3m(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type$3m(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf$4(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice$7(replacement, i + '$<'.length, endIndex);
							var capture = Get$w(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type$3m(capture) !== 'Undefined') {
								result += ToString$n(capture);
							}
							i += ('<' + groupName + '>').length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt$9(replacement, i);
		}
	}
	return result;
};

var GetIntrinsic$41 = require$$0;

var $TypeError$3p = GetIntrinsic$41('%TypeError%');

var has$i = require$$0$1;

var IsPropertyKey$H = IsPropertyKey$U;
var Type$3l = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$5 = function HasOwnProperty(O, P) {
	if (Type$3l(O) !== 'Object') {
		throw new $TypeError$3p('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$H(P)) {
		throw new $TypeError$3p('Assertion failed: `P` must be a Property Key');
	}
	return has$i(O, P);
};

var GetIntrinsic$40 = require$$0;

var $TypeError$3o = GetIntrinsic$40('%TypeError%');

var IsPropertyKey$G = IsPropertyKey$U;
var Type$3k = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty$4 = function HasProperty(O, P) {
	if (Type$3k(O) !== 'Object') {
		throw new $TypeError$3o('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$G(P)) {
		throw new $TypeError$3o('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var floor$v = floor$z;
var modulo$w = modulo$z;

var timeConstants$b = timeConstants$s;
var msPerHour$5 = timeConstants$b.msPerHour;
var HoursPerDay$2 = timeConstants$b.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$5 = function HourFromTime(t) {
	return modulo$w(floor$v(t / msPerHour$5), HoursPerDay$2);
};

var GetIntrinsic$3$ = require$$0;

var $TypeError$3n = GetIntrinsic$3$('%TypeError%');

var Get$v = Get$B;
var IsCallable$j = IsCallable$m.exports;
var Type$3j = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance$5 = function OrdinaryHasInstance(C, O) {
	if (IsCallable$j(C) === false) {
		return false;
	}
	if (Type$3j(O) !== 'Object') {
		return false;
	}
	var P = Get$v(C, 'prototype');
	if (Type$3j(P) !== 'Object') {
		throw new $TypeError$3n('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var GetIntrinsic$3_ = require$$0;

var $TypeError$3m = GetIntrinsic$3_('%TypeError%');

var $hasInstance$2 = GetIntrinsic$3_('Symbol.hasInstance', true);

var Call$j = Call$l;
var GetMethod$9 = GetMethod$b;
var IsCallable$i = IsCallable$m.exports;
var OrdinaryHasInstance$4 = OrdinaryHasInstance$5;
var ToBoolean$e = ToBoolean$h;
var Type$3i = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator$2 = function InstanceofOperator(O, C) {
	if (Type$3i(O) !== 'Object') {
		throw new $TypeError$3m('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance$2 ? GetMethod$9(C, $hasInstance$2) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean$e(Call$j(instOfHandler, C, [O]));
	}
	if (!IsCallable$i(C)) {
		throw new $TypeError$3m('`C` is not Callable');
	}
	return OrdinaryHasInstance$4(C, O);
};

var GetIntrinsic$3Z = require$$0;

var $TypeError$3l = GetIntrinsic$3Z('%TypeError%');

var Call$i = Call$l;
var IsArray$t = IsArray$C;
var GetV$6 = GetV$8;
var IsPropertyKey$F = IsPropertyKey$U;

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke$5 = function Invoke(O, P) {
	if (!IsPropertyKey$F(P)) {
		throw new $TypeError$3l('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$t(argumentsList)) {
		throw new $TypeError$3l('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV$6(O, P);
	return Call$i(func, O, argumentsList);
};

var GetIntrinsic$3Y = require$$0;

var $isConcatSpreadable$2 = GetIntrinsic$3Y('%Symbol.isConcatSpreadable%', true);

var Get$u = Get$B;
var IsArray$s = IsArray$C;
var ToBoolean$d = ToBoolean$h;
var Type$3h = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable$2 = function IsConcatSpreadable(O) {
	if (Type$3h(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable$2) {
		var spreadable = Get$u(O, $isConcatSpreadable$2);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean$d(spreadable);
		}
	}
	return IsArray$s(O);
};

var callBound$M = require$$1;

var $PromiseThen$2 = callBound$M('Promise.prototype.then', true);

var Type$3g = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise$2 = function IsPromise(x) {
	if (Type$3g(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen$2) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen$2(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

var GetIntrinsic$3X = require$$0;

var $TypeError$3k = GetIntrinsic$3X('%TypeError%');

var isPrefixOf$4 = requireIsPrefixOf();

// var callBound = require('call-bind/callBound');

// var $charAt = callBound('String.prototype.charAt');

var Type$3f = Type$3R;

// https://262.ecma-international.org/9.0/#sec-isstringprefix

var IsStringPrefix$2 = function IsStringPrefix(p, q) {
	if (Type$3f(p) !== 'String') {
		throw new $TypeError$3k('Assertion failed: "p" must be a String');
	}

	if (Type$3f(q) !== 'String') {
		throw new $TypeError$3k('Assertion failed: "q" must be a String');
	}

	return isPrefixOf$4(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

var GetIntrinsic$3W = require$$0;

var $TypeError$3j = GetIntrinsic$3W('%TypeError%');

var Get$t = Get$B;
var ToBoolean$c = ToBoolean$h;
var Type$3e = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete$5 = function IteratorComplete(iterResult) {
	if (Type$3e(iterResult) !== 'Object') {
		throw new $TypeError$3j('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean$c(Get$t(iterResult, 'done'));
};

var GetIntrinsic$3V = require$$0;

var $TypeError$3i = GetIntrinsic$3V('%TypeError%');

var Invoke$4 = Invoke$5;
var Type$3d = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext$5 = function IteratorNext(iterator, value) {
	var result = Invoke$4(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$3d(result) !== 'Object') {
		throw new $TypeError$3i('iterator next must return an object');
	}
	return result;
};

var IteratorComplete$4 = IteratorComplete$5;
var IteratorNext$4 = IteratorNext$5;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep$7 = function IteratorStep(iterator) {
	var result = IteratorNext$4(iterator);
	var done = IteratorComplete$4(result);
	return done === true ? false : result;
};

var GetIntrinsic$3U = require$$0;

var $TypeError$3h = GetIntrinsic$3U('%TypeError%');

var Get$s = Get$B;
var Type$3c = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue$7 = function IteratorValue(iterResult) {
	if (Type$3c(iterResult) !== 'Object') {
		throw new $TypeError$3h('Assertion failed: Type(iterResult) is not Object');
	}
	return Get$s(iterResult, 'value');
};

var callBound$L = require$$1;
var $arrayPush$2 = callBound$L('Array.prototype.push');

var GetIterator$6 = GetIterator$7;
var IteratorStep$6 = IteratorStep$7;
var IteratorValue$6 = IteratorValue$7;

// https://262.ecma-international.org/8.0/#sec-iterabletolist

var IterableToList$2 = function IterableToList(items, method) {
	var iterator = GetIterator$6(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep$6(iterator);
		if (next) {
			var nextValue = IteratorValue$6(next);
			$arrayPush$2(values, nextValue);
		}
	}
	return values;
};

var GetIntrinsic$3T = require$$0;

var $TypeError$3g = GetIntrinsic$3T('%TypeError%');

var Call$h = Call$l;
var GetMethod$8 = GetMethod$b;
var IsCallable$h = IsCallable$m.exports;
var Type$3b = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose$4 = function IteratorClose(iterator, completion) {
	if (Type$3b(iterator) !== 'Object') {
		throw new $TypeError$3g('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable$h(completion)) {
		throw new $TypeError$3g('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$8(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call$h(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$3b(innerResult) !== 'Object') {
		throw new $TypeError$3g('iterator .return must return an object');
	}

	return completionRecord;
};

var $isFinite$l = _isFinite;
var msPerDay$a = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate$2 = function MakeDate(day, time) {
	if (!$isFinite$l(day) || !$isFinite$l(time)) {
		return NaN;
	}
	return (day * msPerDay$a) + time;
};

var GetIntrinsic$3S = require$$0;

var $DateUTC$2 = GetIntrinsic$3S('%Date.UTC%');

var $isFinite$k = _isFinite;

var DateFromTime$6 = DateFromTime$8;
var Day$8 = Day$b;
var floor$u = floor$z;
var modulo$v = modulo$z;
var MonthFromTime$8 = MonthFromTime$b;
var ToInteger$c = ToInteger$e;
var YearFromTime$a = YearFromTime$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay$2 = function MakeDay(year, month, date) {
	if (!$isFinite$k(year) || !$isFinite$k(month) || !$isFinite$k(date)) {
		return NaN;
	}
	var y = ToInteger$c(year);
	var m = ToInteger$c(month);
	var dt = ToInteger$c(date);
	var ym = y + floor$u(m / 12);
	var mn = modulo$v(m, 12);
	var t = $DateUTC$2(ym, mn, 1);
	if (YearFromTime$a(t) !== ym || MonthFromTime$8(t) !== mn || DateFromTime$6(t) !== 1) {
		return NaN;
	}
	return Day$8(t) + dt - 1;
};

var $isFinite$j = _isFinite;
var timeConstants$a = timeConstants$s;
var msPerSecond$8 = timeConstants$a.msPerSecond;
var msPerMinute$5 = timeConstants$a.msPerMinute;
var msPerHour$4 = timeConstants$a.msPerHour;

var ToInteger$b = ToInteger$e;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime$2 = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$j(hour) || !$isFinite$j(min) || !$isFinite$j(sec) || !$isFinite$j(ms)) {
		return NaN;
	}
	var h = ToInteger$b(hour);
	var m = ToInteger$b(min);
	var s = ToInteger$b(sec);
	var milli = ToInteger$b(ms);
	var t = (h * msPerHour$4) + (m * msPerMinute$5) + (s * msPerSecond$8) + milli;
	return t;
};

var floor$t = floor$z;
var modulo$u = modulo$z;

var timeConstants$9 = timeConstants$s;
var msPerMinute$4 = timeConstants$9.msPerMinute;
var MinutesPerHour$2 = timeConstants$9.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$5 = function MinFromTime(t) {
	return modulo$u(floor$t(t / msPerMinute$4), MinutesPerHour$2);
};

var modulo$t = modulo$z;

var msPerSecond$7 = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime$2 = function msFromTime(t) {
	return modulo$t(t, msPerSecond$7);
};

var GetIntrinsic$3R = require$$0;

var $String$8 = GetIntrinsic$3R('%String%');
var $TypeError$3f = GetIntrinsic$3R('%TypeError%');

var Type$3a = Type$3R;

// https://262.ecma-international.org/9.0/#sec-tostring-applied-to-the-number-type

var NumberToString$1 = function NumberToString(m) {
	if (Type$3a(m) !== 'Number') {
		throw new $TypeError$3f('Assertion failed: "m" must be a String');
	}

	return $String$8(m);
};

var GetIntrinsic$3Q = require$$0;

var $ObjectCreate$2 = GetIntrinsic$3Q('%Object.create%', true);
var $TypeError$3e = GetIntrinsic$3Q('%TypeError%');
var $SyntaxError$c = GetIntrinsic$3Q('%SyntaxError%');

var Type$39 = Type$3R;

var hasProto$2 = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

var ObjectCreate$3 = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type$39(proto) !== 'Object') {
		throw new $TypeError$3e('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError$c('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate$2) {
		return $ObjectCreate$2(proto);
	}
	if (hasProto$2) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$c('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var GetIntrinsic$3P = require$$0;
var $TypeError$3d = GetIntrinsic$3P('%TypeError%');

var GetPrototypeFromConstructor$4 = GetPrototypeFromConstructor$5;
var IsArray$r = IsArray$C;
var ObjectCreate$2 = ObjectCreate$3;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

var OrdinaryCreateFromConstructor$2 = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic$3P(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor$4(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray$r(slots)) {
		throw new $TypeError$3d('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate$2(proto, slots);
};

var GetIntrinsic$3O = require$$0;

var $TypeError$3c = GetIntrinsic$3O('%TypeError%');

var $getProto$2 = requireGetProto();

var Type$38 = Type$3R;

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

var OrdinaryGetPrototypeOf$5 = function OrdinaryGetPrototypeOf(O) {
	if (Type$38(O) !== 'Object') {
		throw new $TypeError$3c('Assertion failed: O must be an Object');
	}
	if (!$getProto$2) {
		throw new $TypeError$3c('This environment does not support fetching prototypes.');
	}
	return $getProto$2(O);
};

var GetIntrinsic$3N = require$$0;

var $TypeError$3b = GetIntrinsic$3N('%TypeError%');

var IsPropertyKey$E = IsPropertyKey$U;
var Type$37 = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty$2 = function OrdinaryHasProperty(O, P) {
	if (Type$37(O) !== 'Object') {
		throw new $TypeError$3b('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$E(P)) {
		throw new $TypeError$3b('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$3M = require$$0;

var $TypeError$3a = GetIntrinsic$3M('%TypeError%');

var $setProto$4 = requireSetProto();

var OrdinaryGetPrototypeOf$4 = OrdinaryGetPrototypeOf$5;
var Type$36 = Type$3R;

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf$2 = function OrdinarySetPrototypeOf(O, V) {
	if (Type$36(V) !== 'Object' && Type$36(V) !== 'Null') {
		throw new $TypeError$3a('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto$4(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf$4(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

var GetIntrinsic$3L = require$$0;
var callBind$4 = require$$1$1;

var $resolve$2 = GetIntrinsic$3L('%Promise.resolve%', true);
var $PromiseResolve$2 = $resolve$2 && callBind$4($resolve$2);

// https://262.ecma-international.org/9.0/#sec-promise-resolve

var PromiseResolve$2 = function PromiseResolve(C, x) {
	if (!$PromiseResolve$2) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve$2(C, x);
};

var GetIntrinsic$3K = require$$0;

var $TypeError$39 = GetIntrinsic$3K('%TypeError%');

var callBound$K = require$$1;

var $charCodeAt$7 = callBound$K('String.prototype.charCodeAt');
var $numberToString$2 = callBound$K('Number.prototype.toString');
var $toLowerCase$2 = callBound$K('String.prototype.toLowerCase');
var $strSlice$6 = callBound$K('String.prototype.slice');

// https://262.ecma-international.org/9.0/#sec-unicodeescape

var UnicodeEscape$5 = function UnicodeEscape(C) {
	if (typeof C !== 'string' || C.length !== 1) {
		throw new $TypeError$39('Assertion failed: `C` must be a single code unit');
	}
	var n = $charCodeAt$7(C, 0);
	if (n > 0xFFFF) {
		throw new $TypeError$39('`Assertion failed: numeric value of `C` must be <= 0xFFFF');
	}

	return '\\u' + $strSlice$6('0000' + $toLowerCase$2($numberToString$2(n, 16)), -4);
};

var GetIntrinsic$3J = require$$0;

var $TypeError$38 = GetIntrinsic$3J('%TypeError%');

var callBound$J = require$$1;
var forEach$9 = requireForEach();

var $charCodeAt$6 = callBound$J('String.prototype.charCodeAt');
var $strSplit$1 = callBound$J('String.prototype.split');

var Type$35 = Type$3R;
var UnicodeEscape$4 = UnicodeEscape$5;

var has$h = require$$0$1;

// https://262.ecma-international.org/9.0/#sec-quotejsonstring

var escapes$2 = {
	'\u0008': '\\b',
	'\u0009': '\\t',
	'\u000A': '\\n',
	'\u000C': '\\f',
	'\u000D': '\\r',
	'\u0022': '\\"',
	'\u005c': '\\\\'
};

var QuoteJSONString$2 = function QuoteJSONString(value) {
	if (Type$35(value) !== 'String') {
		throw new $TypeError$38('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach$9($strSplit$1(value), function (C) {
			if (has$h(escapes$2, C)) {
				product += escapes$2[C];
			} else if ($charCodeAt$6(C, 0) < 0x20) {
				product += UnicodeEscape$4(C);
			} else {
				product += C;
			}
		});
	}
	product += '"';
	return product;
};

var GetIntrinsic$3I = require$$0;

var $RegExp$4 = GetIntrinsic$3I('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString$m = ToString$s;

// https://262.ecma-international.org/6.0/#sec-regexpcreate

var RegExpCreate$2 = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString$m(P);
	var flags = typeof F === 'undefined' ? '' : ToString$m(F);
	return new $RegExp$4(pattern, flags);
};

var GetIntrinsic$3H = require$$0;

var $TypeError$37 = GetIntrinsic$3H('%TypeError%');

var regexExec$2 = require$$1('RegExp.prototype.exec');

var Call$g = Call$l;
var Get$r = Get$B;
var IsCallable$g = IsCallable$m.exports;
var Type$34 = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec$2 = function RegExpExec(R, S) {
	if (Type$34(R) !== 'Object') {
		throw new $TypeError$37('Assertion failed: `R` must be an Object');
	}
	if (Type$34(S) !== 'String') {
		throw new $TypeError$37('Assertion failed: `S` must be a String');
	}
	var exec = Get$r(R, 'exec');
	if (IsCallable$g(exec)) {
		var result = Call$g(exec, R, [S]);
		if (result === null || Type$34(result) === 'Object') {
			return result;
		}
		throw new $TypeError$37('"exec" method must return `null` or an Object');
	}
	return regexExec$2(R, S);
};

var GetIntrinsic$3G = require$$0;

var $TypeError$36 = GetIntrinsic$3G('%TypeError%');

var SameValue$m = SameValue$u;

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

var SameValueNonNumber$1 = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError$36('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue$m(x, y);
};

var $isNaN$p = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero$4 = function SameValueZero(x, y) {
	return (x === y) || ($isNaN$p(x) && $isNaN$p(y));
};

var floor$s = floor$z;
var modulo$s = modulo$z;

var timeConstants$8 = timeConstants$s;
var msPerSecond$6 = timeConstants$8.msPerSecond;
var SecondsPerMinute$2 = timeConstants$8.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$5 = function SecFromTime(t) {
	return modulo$s(floor$s(t / msPerSecond$6), SecondsPerMinute$2);
};

var GetIntrinsic$3F = require$$0;

var $TypeError$35 = GetIntrinsic$3F('%TypeError%');

var IsPropertyKey$D = IsPropertyKey$U;
var SameValue$l = SameValue$u;
var Type$33 = Type$3R;

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation$2 = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set$2 = function Set(O, P, V, Throw) {
	if (Type$33(O) !== 'Object') {
		throw new $TypeError$35('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$D(P)) {
		throw new $TypeError$35('Assertion failed: `P` must be a Property Key');
	}
	if (Type$33(Throw) !== 'Boolean') {
		throw new $TypeError$35('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation$2 && !SameValue$l(O[P], V)) {
			throw new $TypeError$35('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation$2 ? SameValue$l(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

var GetIntrinsic$3E = require$$0;

var $TypeError$34 = GetIntrinsic$3E('%TypeError%');

var DefinePropertyOrThrow$f = DefinePropertyOrThrow$h;
var HasOwnProperty$4 = HasOwnProperty$5;
var IsExtensible$e = IsExtensible$h;
var IsInteger$l = IsInteger$r;
var Type$32 = Type$3R;

// https://262.ecma-international.org/9.0/#sec-setfunctionlength

var SetFunctionLength$2 = function SetFunctionLength(F, length) {
	if (typeof F !== 'function' || !IsExtensible$e(F) || HasOwnProperty$4(F, 'length')) {
		throw new $TypeError$34('Assertion failed: `F` must be an extensible function and lack an own `length` property');
	}
	if (Type$32(length) !== 'Number') {
		throw new $TypeError$34('Assertion failed: `length` must be a Number');
	}
	if (length < 0 || !IsInteger$l(length)) {
		throw new $TypeError$34('Assertion failed: `length` must be an integer >= 0');
	}
	return DefinePropertyOrThrow$f(F, 'length', {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});
};

var GetIntrinsic$3D = require$$0;

var has$g = require$$0$1;

var $TypeError$33 = GetIntrinsic$3D('%TypeError%');

var getSymbolDescription$2 = requireGetSymbolDescription();

var DefinePropertyOrThrow$e = DefinePropertyOrThrow$h;
var IsExtensible$d = IsExtensible$h;
var Type$31 = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName$2 = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$33('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible$d(F) || has$g(F, 'name')) {
		throw new $TypeError$33('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$31(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$33('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription$2(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow$e(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var GetIntrinsic$3C = require$$0;

var $SyntaxError$b = GetIntrinsic$3C('%SyntaxError%');
var $TypeError$32 = GetIntrinsic$3C('%TypeError%');
var $preventExtensions$4 = GetIntrinsic$3C('%Object.preventExtensions%');
var $gOPD$9 = getOwnPropertyDescriptor;
var $gOPN$7 = GetIntrinsic$3C('%Object.getOwnPropertyNames%');

var forEach$8 = requireForEach();

var DefinePropertyOrThrow$d = DefinePropertyOrThrow$h;
var IsAccessorDescriptor$e = IsAccessorDescriptor$k;
var ToPropertyDescriptor$d = ToPropertyDescriptor$h;
var Type$30 = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel$2 = function SetIntegrityLevel(O, level) {
	if (Type$30(O) !== 'Object') {
		throw new $TypeError$32('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$32('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions$4) {
		throw new $SyntaxError$b('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions$4(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$7) {
		throw new $SyntaxError$b('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$7(O);
	if (level === 'sealed') {
		forEach$8(theKeys, function (k) {
			DefinePropertyOrThrow$d(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach$8(theKeys, function (k) {
			var currentDesc = $gOPD$9(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor$e(ToPropertyDescriptor$d(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow$d(O, k, desc);
			}
		});
	}
	return true;
};

var GetIntrinsic$3B = require$$0;

var $species$4 = GetIntrinsic$3B('%Symbol.species%', true);
var $TypeError$31 = GetIntrinsic$3B('%TypeError%');

var IsConstructor$8 = IsConstructor$b.exports;
var Type$2$ = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor$2 = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$2$(O) !== 'Object') {
		throw new $TypeError$31('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$2$(C) !== 'Object') {
		throw new $TypeError$31('O.constructor is not an Object');
	}
	var S = $species$4 ? C[$species$4] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor$8(S)) {
		return S;
	}
	throw new $TypeError$31('no constructor found');
};

var GetIntrinsic$3A = require$$0;
var callBound$I = require$$1;

var $TypeError$30 = GetIntrinsic$3A('%TypeError%');

var IsInteger$k = IsInteger$r;
var Type$2_ = Type$3R;

var $charAt$8 = callBound$I('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

var SplitMatch$2 = function SplitMatch(S, q, R) {
	if (Type$2_(S) !== 'String') {
		throw new $TypeError$30('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$k(q)) {
		throw new $TypeError$30('Assertion failed: `q` must be an integer');
	}
	if (Type$2_(R) !== 'String') {
		throw new $TypeError$30('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt$8(S, q + i) !== $charAt$8(R, i)) {
			return false;
		}
	}

	return q + r;
};

var GetIntrinsic$3z = require$$0;

var $Object$6 = GetIntrinsic$3z('%Object%');
var $StringPrototype$2 = GetIntrinsic$3z('%String.prototype%');
var $SyntaxError$a = GetIntrinsic$3z('%SyntaxError%');
var $TypeError$2$ = GetIntrinsic$3z('%TypeError%');

var DefinePropertyOrThrow$c = DefinePropertyOrThrow$h;
var Type$2Z = Type$3R;

var setProto$2 = requireSetProto();

// https://262.ecma-international.org/6.0/#sec-stringcreate

var StringCreate$2 = function StringCreate(value, prototype) {
	if (Type$2Z(value) !== 'String') {
		throw new $TypeError$2$('Assertion failed: `S` must be a String');
	}

	var S = $Object$6(value);
	if (S !== $StringPrototype$2) {
		if (setProto$2) {
			setProto$2(S, prototype);
		} else {
			throw new $SyntaxError$a('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow$c(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

var GetIntrinsic$3y = require$$0;

var $TypeError$2_ = GetIntrinsic$3y('%TypeError%');

var callBound$H = require$$1;
var $charAt$7 = callBound$H('String.prototype.charAt');
var $stringToString$2 = callBound$H('String.prototype.toString');

var CanonicalNumericIndexString$4 = CanonicalNumericIndexString$5;
var IsInteger$j = IsInteger$r;
var IsPropertyKey$C = IsPropertyKey$U;
var Type$2Y = Type$3R;

var isNegativeZero$3 = require$$6;

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

var StringGetOwnProperty$2 = function StringGetOwnProperty(S, P) {
	var str;
	if (Type$2Y(S) === 'Object') {
		try {
			str = $stringToString$2(S);
		} catch (e) { /**/ }
	}
	if (Type$2Y(str) !== 'String') {
		throw new $TypeError$2_('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey$C(P)) {
		throw new $TypeError$2_('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type$2Y(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString$4(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger$j(index) || isNegativeZero$3(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt$7(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

var GetIntrinsic$3x = require$$0;

var $TypeError$2Z = GetIntrinsic$3x('%TypeError%');

var callBound$G = require$$1;

var $SymbolToString$2 = callBound$G('Symbol.prototype.toString', true);

var Type$2X = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString$2 = function SymbolDescriptiveString(sym) {
	if (Type$2X(sym) !== 'Symbol') {
		throw new $TypeError$2Z('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString$2(sym);
};

var GetIntrinsic$3w = require$$0;

var $gOPD$8 = getOwnPropertyDescriptor;
var $gOPN$6 = GetIntrinsic$3w('%Object.getOwnPropertyNames%');
var $TypeError$2Y = GetIntrinsic$3w('%TypeError%');

var every$5 = requireEvery();

var IsDataDescriptor$k = IsDataDescriptor$t;
var IsExtensible$c = IsExtensible$h;
var ToPropertyDescriptor$c = ToPropertyDescriptor$h;
var Type$2W = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel$2 = function TestIntegrityLevel(O, level) {
	if (Type$2W(O) !== 'Object') {
		throw new $TypeError$2Y('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$2Y('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible$c(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN$6(O);
	return theKeys.length === 0 || every$5(theKeys, function (k) {
		var currentDesc = $gOPD$8(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor$k(ToPropertyDescriptor$c(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var $BooleanValueOf$2 = require$$1('Boolean.prototype.valueOf');

var Type$2V = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue$2 = function thisBooleanValue(value) {
	if (Type$2V(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf$2(value);
};

var callBound$F = require$$1;

var Type$2U = Type$3R;

var $NumberValueOf$2 = callBound$F('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue$2 = function thisNumberValue(value) {
	if (Type$2U(value) === 'Number') {
		return value;
	}

	return $NumberValueOf$2(value);
};

var $StringValueOf$2 = require$$1('String.prototype.valueOf');

var Type$2T = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue$2 = function thisStringValue(value) {
	if (Type$2T(value) === 'String') {
		return value;
	}

	return $StringValueOf$2(value);
};

var callBound$E = require$$1;

var $SymbolValueOf$2 = callBound$E('Symbol.prototype.valueOf', true);

var Type$2S = Type$3R;

// https://262.ecma-international.org/9.0/#sec-thissymbolvalue

var thisSymbolValue$2 = function thisSymbolValue(value) {
	if (!$SymbolValueOf$2) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type$2S(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf$2(value);
};

var $DateValueOf = require$$1('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

var thisTimeValue$2 = function thisTimeValue(value) {
	return $DateValueOf(value);
};

var GetIntrinsic$3v = require$$0;

var $Date$7 = GetIntrinsic$3v('%Date%');
var $Number$7 = GetIntrinsic$3v('%Number%');

var $isFinite$i = _isFinite;

var abs$c = abs$e;
var ToNumber$v = ToNumber$D;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip$2 = function TimeClip(time) {
	if (!$isFinite$i(time) || abs$c(time) > 8.64e15) {
		return NaN;
	}
	return $Number$7(new $Date$7(ToNumber$v(time)));
};

var msPerDay$9 = timeConstants$s.msPerDay;

var DayFromYear$6 = DayFromYear$8;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear$2 = function TimeFromYear(y) {
	return msPerDay$9 * DayFromYear$6(y);
};

var GetIntrinsic$3u = require$$0;

var $TypeError$2X = GetIntrinsic$3u('%TypeError%');

var $isNaN$o = _isNaN;
var padTimeComponent$4 = requirePadTimeComponent();

var HourFromTime$4 = HourFromTime$5;
var MinFromTime$4 = MinFromTime$5;
var SecFromTime$4 = SecFromTime$5;
var Type$2R = Type$3R;

// https://262.ecma-international.org/9.0/#sec-timestring

var TimeString$2 = function TimeString(tv) {
	if (Type$2R(tv) !== 'Number' || $isNaN$o(tv)) {
		throw new $TypeError$2X('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime$4(tv);
	var minute = MinFromTime$4(tv);
	var second = SecFromTime$4(tv);
	return padTimeComponent$4(hour) + ':' + padTimeComponent$4(minute) + ':' + padTimeComponent$4(second) + '\x20GMT';
};

var modulo$r = modulo$z;

var msPerDay$8 = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay$2 = function TimeWithinDay(t) {
	return modulo$r(t, msPerDay$8);
};

var GetIntrinsic$3t = require$$0;

var $TypeError$2W = GetIntrinsic$3t('%TypeError%');
var $Date$6 = GetIntrinsic$3t('%Date%');

var $isNaN$n = _isNaN;

var Type$2Q = Type$3R;

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString$2 = function ToDateString(tv) {
	if (Type$2Q(tv) !== 'Number') {
		throw new $TypeError$2W('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN$n(tv)) {
		return 'Invalid Date';
	}
	return $Date$6(tv);
};

var GetIntrinsic$3s = require$$0;

var $RangeError$a = GetIntrinsic$3s('%RangeError%');

var ToInteger$a = ToInteger$e;
var ToLength$8 = ToLength$a;
var SameValueZero$3 = SameValueZero$4;

// https://262.ecma-international.org/8.0/#sec-toindex

var ToIndex$2 = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger$a(value);
	if (integerIndex < 0) {
		throw new $RangeError$a('index must be >= 0');
	}
	var index = ToLength$8(integerIndex);
	if (!SameValueZero$3(integerIndex, index)) {
		throw new $RangeError$a('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

var abs$b = abs$e;
var floor$r = floor$z;
var modulo$q = modulo$z;
var ToNumber$u = ToNumber$D;

var $isNaN$m = _isNaN;
var $isFinite$h = _isFinite;
var $sign$5 = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$5 = function ToUint16(value) {
	var number = ToNumber$u(value);
	if ($isNaN$m(number) || number === 0 || !$isFinite$h(number)) { return 0; }
	var posInt = $sign$5(number) * floor$r(abs$b(number));
	return modulo$q(posInt, 0x10000);
};

var ToUint16$4 = ToUint16$5;

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16$2 = function ToInt16(argument) {
	var int16bit = ToUint16$4(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

var ToNumber$t = ToNumber$D;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$7 = function ToInt32(x) {
	return ToNumber$t(x) >> 0;
};

var ToNumber$s = ToNumber$D;

var $isNaN$l = _isNaN;
var $isFinite$g = _isFinite;
var $sign$4 = sign;

var abs$a = abs$e;
var floor$q = floor$z;
var modulo$p = modulo$z;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

var ToUint8$5 = function ToUint8(argument) {
	var number = ToNumber$s(argument);
	if ($isNaN$l(number) || number === 0 || !$isFinite$g(number)) { return 0; }
	var posInt = $sign$4(number) * floor$q(abs$a(number));
	return modulo$p(posInt, 0x100);
};

var ToUint8$4 = ToUint8$5;

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8$2 = function ToInt8(argument) {
	var int8bit = ToUint8$4(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var GetIntrinsic$3r = require$$0;

var $String$7 = GetIntrinsic$3r('%String%');

var ToPrimitive$b = ToPrimitive$f;
var ToString$l = ToString$s;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey$2 = function ToPropertyKey(argument) {
	var key = ToPrimitive$b(argument, $String$7);
	return typeof key === 'symbol' ? key : ToString$l(key);
};

var ToNumber$r = ToNumber$D;
var floor$p = floor$z;

var $isNaN$k = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp$2 = function ToUint8Clamp(argument) {
	var number = ToNumber$r(argument);
	if ($isNaN$k(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor$p(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var GetIntrinsic$3q = require$$0;

var $TypeError$2V = GetIntrinsic$3q('%TypeError%');
var $fromCharCode$5 = GetIntrinsic$3q('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate$6 = isLeadingSurrogate$d;
var isTrailingSurrogate$6 = isTrailingSurrogate$d;

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

var UTF16Decode$1 = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate$6(lead) || !isTrailingSurrogate$6(trail)) {
		throw new $TypeError$2V('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode$5(lead) + $fromCharCode$5(trail);
};

var GetIntrinsic$3p = require$$0;

var $TypeError$2U = GetIntrinsic$3p('%TypeError%');
var $fromCharCode$4 = GetIntrinsic$3p('%String.fromCharCode%');

var floor$o = floor$z;
var modulo$o = modulo$z;

var isCodePoint$2 = requireIsCodePoint();

// https://262.ecma-international.org/7.0/#sec-utf16encoding

var UTF16Encoding$4 = function UTF16Encoding(cp) {
	if (!isCodePoint$2(cp)) {
		throw new $TypeError$2U('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode$4(cp);
	}
	var cu1 = floor$o((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo$o(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode$4(cu1) + $fromCharCode$4(cu2);
};

/* eslint global-require: 0 */
// https://262.ecma-international.org/9.0/#sec-abstract-operations
var ES2018$1 = {
	'Abstract Equality Comparison': AbstractEqualityComparison$2,
	'Abstract Relational Comparison': AbstractRelationalComparison$2,
	'Strict Equality Comparison': StrictEqualityComparison$2,
	abs: abs$e,
	AdvanceStringIndex: AdvanceStringIndex$5,
	ArrayCreate: ArrayCreate$2,
	ArraySetLength: ArraySetLength$2,
	ArraySpeciesCreate: ArraySpeciesCreate$2,
	Call: Call$l,
	CanonicalNumericIndexString: CanonicalNumericIndexString$5,
	CompletePropertyDescriptor: CompletePropertyDescriptor$2,
	CopyDataProperties: CopyDataProperties$2,
	CreateDataProperty: CreateDataProperty$7,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow$5,
	CreateHTML: CreateHTML$2,
	CreateIterResultObject: CreateIterResultObject$2,
	CreateListFromArrayLike: CreateListFromArrayLike$2,
	CreateMethodProperty: CreateMethodProperty$2,
	DateFromTime: DateFromTime$8,
	DateString: DateString$2,
	Day: Day$b,
	DayFromYear: DayFromYear$8,
	DaysInYear: DaysInYear$5,
	DayWithinYear: DayWithinYear$8,
	DefinePropertyOrThrow: DefinePropertyOrThrow$h,
	DeletePropertyOrThrow: DeletePropertyOrThrow$2,
	EnumerableOwnPropertyNames: EnumerableOwnPropertyNames$2,
	floor: floor$z,
	FromPropertyDescriptor: FromPropertyDescriptor$e,
	Get: Get$B,
	GetIterator: GetIterator$7,
	GetMethod: GetMethod$b,
	GetOwnPropertyKeys: GetOwnPropertyKeys$2,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor$5,
	GetSubstitution: GetSubstitution$2,
	GetV: GetV$8,
	HasOwnProperty: HasOwnProperty$5,
	HasProperty: HasProperty$4,
	HourFromTime: HourFromTime$5,
	InLeapYear: InLeapYear$8,
	InstanceofOperator: InstanceofOperator$2,
	Invoke: Invoke$5,
	IsAccessorDescriptor: IsAccessorDescriptor$k,
	IsArray: IsArray$C,
	IsCallable: IsCallable$m.exports,
	IsConcatSpreadable: IsConcatSpreadable$2,
	IsConstructor: IsConstructor$b.exports,
	IsDataDescriptor: IsDataDescriptor$t,
	IsExtensible: IsExtensible$h,
	IsGenericDescriptor: IsGenericDescriptor$8,
	IsInteger: IsInteger$r,
	IsPromise: IsPromise$2,
	IsPropertyKey: IsPropertyKey$U,
	IsRegExp: IsRegExp$5,
	IsStringPrefix: IsStringPrefix$2,
	IterableToList: IterableToList$2,
	IteratorClose: IteratorClose$4,
	IteratorComplete: IteratorComplete$5,
	IteratorNext: IteratorNext$5,
	IteratorStep: IteratorStep$7,
	IteratorValue: IteratorValue$7,
	MakeDate: MakeDate$2,
	MakeDay: MakeDay$2,
	MakeTime: MakeTime$2,
	MinFromTime: MinFromTime$5,
	modulo: modulo$z,
	MonthFromTime: MonthFromTime$b,
	msFromTime: msFromTime$2,
	NumberToString: NumberToString$1,
	ObjectCreate: ObjectCreate$3,
	OrdinaryCreateFromConstructor: OrdinaryCreateFromConstructor$2,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty$5,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty$8,
	OrdinaryGetPrototypeOf: OrdinaryGetPrototypeOf$5,
	OrdinaryHasInstance: OrdinaryHasInstance$5,
	OrdinaryHasProperty: OrdinaryHasProperty$2,
	OrdinarySetPrototypeOf: OrdinarySetPrototypeOf$2,
	PromiseResolve: PromiseResolve$2,
	QuoteJSONString: QuoteJSONString$2,
	RegExpCreate: RegExpCreate$2,
	RegExpExec: RegExpExec$2,
	RequireObjectCoercible: RequireObjectCoercible$a.exports,
	SameValue: SameValue$u,
	SameValueNonNumber: SameValueNonNumber$1,
	SameValueZero: SameValueZero$4,
	SecFromTime: SecFromTime$5,
	Set: _Set$2,
	SetFunctionLength: SetFunctionLength$2,
	SetFunctionName: SetFunctionName$2,
	SetIntegrityLevel: SetIntegrityLevel$2,
	SpeciesConstructor: SpeciesConstructor$2,
	SplitMatch: SplitMatch$2,
	StringCreate: StringCreate$2,
	StringGetOwnProperty: StringGetOwnProperty$2,
	SymbolDescriptiveString: SymbolDescriptiveString$2,
	TestIntegrityLevel: TestIntegrityLevel$2,
	thisBooleanValue: thisBooleanValue$2,
	thisNumberValue: thisNumberValue$2,
	thisStringValue: thisStringValue$2,
	thisSymbolValue: thisSymbolValue$2,
	thisTimeValue: thisTimeValue$2,
	TimeClip: TimeClip$2,
	TimeFromYear: TimeFromYear$2,
	TimeString: TimeString$2,
	TimeWithinDay: TimeWithinDay$2,
	ToBoolean: ToBoolean$h,
	ToDateString: ToDateString$2,
	ToIndex: ToIndex$2,
	ToInt16: ToInt16$2,
	ToInt32: ToInt32$7,
	ToInt8: ToInt8$2,
	ToInteger: ToInteger$e,
	ToLength: ToLength$a,
	ToNumber: ToNumber$D,
	ToObject: ToObject$b,
	ToPrimitive: ToPrimitive$f,
	ToPropertyDescriptor: ToPropertyDescriptor$h,
	ToPropertyKey: ToPropertyKey$2,
	ToString: ToString$s,
	ToUint16: ToUint16$5,
	ToUint32: ToUint32$9,
	ToUint8: ToUint8$5,
	ToUint8Clamp: ToUint8Clamp$2,
	Type: Type$3R,
	UnicodeEscape: UnicodeEscape$5,
	UTF16Decode: UTF16Decode$1,
	UTF16Encoding: UTF16Encoding$4,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor$5,
	WeekDay: WeekDay$5,
	YearFromTime: YearFromTime$e
};

var es2018 = ES2018$1;

var toPrimitive$1 = require$$0$4;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$a = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive$1(input, arguments[1]);
	}
	return toPrimitive$1(input);
};

var GetIntrinsic$3o = require$$0;

var $TypeError$2T = GetIntrinsic$3o('%TypeError%');
var $Number$6 = GetIntrinsic$3o('%Number%');
var $RegExp$3 = GetIntrinsic$3o('%RegExp%');
var $parseInteger$1 = GetIntrinsic$3o('%parseInt%');

var callBound$D = require$$1;
var regexTester$3 = requireRegexTester();
var isPrimitive$4 = requireIsPrimitive();

var $strSlice$5 = callBound$D('String.prototype.slice');
var isBinary$1 = regexTester$3(/^0b[01]+$/i);
var isOctal$1 = regexTester$3(/^0o[0-7]+$/i);
var isInvalidHexLiteral$1 = regexTester$3(/^[-+]0x[0-9a-f]+$/i);
var nonWS$1 = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex$1 = new $RegExp$3('[' + nonWS$1 + ']', 'g');
var hasNonWS$1 = regexTester$3(nonWSregex$1);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws$1 = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex$1 = new RegExp('(^[' + ws$1 + ']+)|([' + ws$1 + ']+$)', 'g');
var $replace$3 = callBound$D('String.prototype.replace');
var $trim$1 = function (value) {
	return $replace$3(value, trimRegex$1, '');
};

var ToPrimitive$9 = ToPrimitive$a;

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber$q = function ToNumber(argument) {
	var value = isPrimitive$4(argument) ? argument : ToPrimitive$9(argument, $Number$6);
	if (typeof value === 'symbol') {
		throw new $TypeError$2T('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary$1(value)) {
			return ToNumber($parseInteger$1($strSlice$5(value, 2), 2));
		} else if (isOctal$1(value)) {
			return ToNumber($parseInteger$1($strSlice$5(value, 2), 8));
		} else if (hasNonWS$1(value) || isInvalidHexLiteral$1(value)) {
			return NaN;
		} else {
			var trimmed = $trim$1(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number$6(value);
};

var ES5Type$1 = Type$6N;

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

var Type$2P = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type$1(x);
};

var ToNumber$p = ToNumber$q;
var ToPrimitive$8 = ToPrimitive$a;
var Type$2O = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison$1 = function AbstractEqualityComparison(x, y) {
	var xType = Type$2O(x);
	var yType = Type$2O(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$p(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$p(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$p(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$p(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$8(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive$8(x), y);
	}
	return false;
};

var GetIntrinsic$3n = require$$0;

var $Number$5 = GetIntrinsic$3n('%Number%');
var $TypeError$2S = GetIntrinsic$3n('%TypeError%');

var $isNaN$j = _isNaN;
var $isFinite$f = _isFinite;
var isPrefixOf$3 = requireIsPrefixOf();

var ToNumber$o = ToNumber$q;
var ToPrimitive$7 = ToPrimitive$a;
var Type$2N = Type$2P;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison$1 = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$2N(LeftFirst) !== 'Boolean') {
		throw new $TypeError$2S('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$7(x, $Number$5);
		py = ToPrimitive$7(y, $Number$5);
	} else {
		py = ToPrimitive$7(y, $Number$5);
		px = ToPrimitive$7(x, $Number$5);
	}
	var bothStrings = Type$2N(px) === 'String' && Type$2N(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$o(px);
		var ny = ToNumber$o(py);
		if ($isNaN$j(nx) || $isNaN$j(ny)) {
			return undefined;
		}
		if ($isFinite$f(nx) && $isFinite$f(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$3(py, px)) {
		return false;
	}
	if (isPrefixOf$3(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$2M = Type$2P;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison$1 = function StrictEqualityComparison(x, y) {
	var xType = Type$2M(x);
	var yType = Type$2M(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$3m = require$$0;

var $abs$1 = GetIntrinsic$3m('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$9 = function abs(x) {
	return $abs$1(x);
};

var GetIntrinsic$3l = require$$0;

var $Array$3 = GetIntrinsic$3l('%Array%');

// eslint-disable-next-line global-require
var toStr$1 = !$Array$3.isArray && require$$1('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray$q = $Array$3.isArray || function IsArray(argument) {
	return toStr$1(argument) === '[object Array]';
};

var GetIntrinsic$3k = require$$0;
var callBound$C = require$$1;

var $TypeError$2R = GetIntrinsic$3k('%TypeError%');

var IsArray$p = IsArray$q;

var $apply$1 = GetIntrinsic$3k('%Reflect.apply%', true) || callBound$C('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

var Call$f = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$p(argumentsList)) {
		throw new $TypeError$2R('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply$1(F, V, argumentsList);
};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$B = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

var GetIntrinsic$3j = require$$0;

var $TypeError$2Q = GetIntrinsic$3j('%TypeError%');

var inspect$6 = require$$1$4;

var IsPropertyKey$A = IsPropertyKey$B;
var Type$2L = Type$2P;

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get$q = function Get(O, P) {
	// 7.3.1.1
	if (Type$2L(O) !== 'Object') {
		throw new $TypeError$2Q('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey$A(P)) {
		throw new $TypeError$2Q('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect$6(P));
	}
	// 7.3.1.3
	return O[P];
};

// var modulo = require('./modulo');
var $floor$1 = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$n = function floor(x) {
	// return x - modulo(x, 1);
	return $floor$1(x);
};

var abs$8 = abs$9;
var floor$m = floor$n;

var $isNaN$i = _isNaN;
var $isFinite$e = _isFinite;

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger$i = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN$i(argument) || !$isFinite$e(argument)) {
		return false;
	}
	var absValue = abs$8(argument);
	return floor$m(absValue) === absValue;
};

var GetIntrinsic$3i = require$$0;

var IsInteger$h = IsInteger$i;
var Type$2K = Type$2P;

var MAX_SAFE_INTEGER$5 = maxSafeInteger;
var isLeadingSurrogate$5 = isLeadingSurrogate$d;
var isTrailingSurrogate$5 = isTrailingSurrogate$d;

var $TypeError$2P = GetIntrinsic$3i('%TypeError%');

var $charCodeAt$5 = require$$1('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex$3 = function AdvanceStringIndex(S, index, unicode) {
	if (Type$2K(S) !== 'String') {
		throw new $TypeError$2P('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$h(index) || index < 0 || index > MAX_SAFE_INTEGER$5) {
		throw new $TypeError$2P('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$2K(unicode) !== 'Boolean') {
		throw new $TypeError$2P('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt$5(S, index);
	if (!isLeadingSurrogate$5(first)) {
		return index + 1;
	}

	var second = $charCodeAt$5(S, index + 1);
	if (!isTrailingSurrogate$5(second)) {
		return index + 1;
	}

	return index + 2;
};

var RequireObjectCoercible$7 = {exports: {}};

(function (module) {

	module.exports = CheckObjectCoercible$1;
} (RequireObjectCoercible$7));

var GetIntrinsic$3h = require$$0;

var $Object$5 = GetIntrinsic$3h('%Object%');

var RequireObjectCoercible$6 = RequireObjectCoercible$7.exports;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$7 = function ToObject(value) {
	RequireObjectCoercible$6(value);
	return $Object$5(value);
};

var GetIntrinsic$3g = require$$0;

var $TypeError$2O = GetIntrinsic$3g('%TypeError%');

var IsPropertyKey$z = IsPropertyKey$B;
var ToObject$6 = ToObject$7;

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV$5 = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey$z(P)) {
		throw new $TypeError$2O('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject$6(V);

	// 7.3.2.4
	return O[P];
};

var IsCallable$f = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$f));

var GetIntrinsic$3f = require$$0;

var $TypeError$2N = GetIntrinsic$3f('%TypeError%');

var GetV$4 = GetV$5;
var IsCallable$e = IsCallable$f.exports;
var IsPropertyKey$y = IsPropertyKey$B;

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$7 = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey$y(P)) {
		throw new $TypeError$2N('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV$4(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable$e(func)) {
		throw new $TypeError$2N(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var GetIntrinsic$3e = require$$0;

var $TypeError$2M = GetIntrinsic$3e('%TypeError%');

var getIteratorMethod$1 = requireGetIteratorMethod();
var AdvanceStringIndex$2 = AdvanceStringIndex$3;
var Call$e = Call$f;
var GetMethod$6 = GetMethod$7;
var IsArray$o = IsArray$q;
var Type$2J = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator$5 = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod$1(
			{
				AdvanceStringIndex: AdvanceStringIndex$2,
				GetMethod: GetMethod$6,
				IsArray: IsArray$o,
				Type: Type$2J
			},
			obj
		);
	}
	var iterator = Call$e(actualMethod, obj);
	if (Type$2J(iterator) !== 'Object') {
		throw new $TypeError$2M('iterator must return an object');
	}

	return iterator;
};

var GetIntrinsic$3d = require$$0;

var $TypeError$2L = GetIntrinsic$3d('%TypeError%');

var Call$d = Call$f;
var GetMethod$5 = GetMethod$7;
var IsCallable$d = IsCallable$f.exports;
var Type$2I = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose$3 = function IteratorClose(iterator, completion) {
	if (Type$2I(iterator) !== 'Object') {
		throw new $TypeError$2L('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable$d(completion)) {
		throw new $TypeError$2L('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$5(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call$d(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$2I(innerResult) !== 'Object') {
		throw new $TypeError$2L('iterator .return must return an object');
	}

	return completionRecord;
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$b = function ToBoolean(value) { return !!value; };

var GetIntrinsic$3c = require$$0;

var $TypeError$2K = GetIntrinsic$3c('%TypeError%');

var Get$p = Get$q;
var ToBoolean$a = ToBoolean$b;
var Type$2H = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete$3 = function IteratorComplete(iterResult) {
	if (Type$2H(iterResult) !== 'Object') {
		throw new $TypeError$2K('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean$a(Get$p(iterResult, 'done'));
};

var GetIntrinsic$3b = require$$0;

var $TypeError$2J = GetIntrinsic$3b('%TypeError%');

var Call$c = Call$f;
var IsArray$n = IsArray$q;
var GetV$3 = GetV$5;
var IsPropertyKey$x = IsPropertyKey$B;

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke$3 = function Invoke(O, P) {
	if (!IsPropertyKey$x(P)) {
		throw new $TypeError$2J('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$n(argumentsList)) {
		throw new $TypeError$2J('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV$3(O, P);
	return Call$c(func, O, argumentsList);
};

var GetIntrinsic$3a = require$$0;

var $TypeError$2I = GetIntrinsic$3a('%TypeError%');

var Invoke$2 = Invoke$3;
var Type$2G = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext$3 = function IteratorNext(iterator, value) {
	var result = Invoke$2(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$2G(result) !== 'Object') {
		throw new $TypeError$2I('iterator next must return an object');
	}
	return result;
};

var IteratorComplete$2 = IteratorComplete$3;
var IteratorNext$2 = IteratorNext$3;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep$5 = function IteratorStep(iterator) {
	var result = IteratorNext$2(iterator);
	var done = IteratorComplete$2(result);
	return done === true ? false : result;
};

var GetIntrinsic$39 = require$$0;

var $TypeError$2H = GetIntrinsic$39('%TypeError%');

var Get$o = Get$q;
var Type$2F = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue$5 = function IteratorValue(iterResult) {
	if (Type$2F(iterResult) !== 'Object') {
		throw new $TypeError$2H('Assertion failed: Type(iterResult) is not Object');
	}
	return Get$o(iterResult, 'value');
};

var inspect$5 = require$$1$4;

var GetIntrinsic$38 = require$$0;

var $TypeError$2G = GetIntrinsic$38('%TypeError%');

var Call$b = Call$f;
var Get$n = Get$q;
var GetIterator$4 = GetIterator$5;
var IsCallable$c = IsCallable$f.exports;
var IteratorClose$2 = IteratorClose$3;
var IteratorStep$4 = IteratorStep$5;
var IteratorValue$4 = IteratorValue$5;
var Type$2E = Type$2P;

// https://262.ecma-international.org/10.0//#sec-add-entries-from-iterable

var AddEntriesFromIterable$1 = function AddEntriesFromIterable(target, iterable, adder) {
	if (!IsCallable$c(adder)) {
		throw new $TypeError$2G('Assertion failed: `adder` is not callable');
	}
	if (iterable == null) {
		throw new $TypeError$2G('Assertion failed: `iterable` is present, and not nullish');
	}
	var iteratorRecord = GetIterator$4(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = IteratorStep$4(iteratorRecord);
		if (!next) {
			return target;
		}
		var nextItem = IteratorValue$4(next);
		if (Type$2E(nextItem) !== 'Object') {
			var error = new $TypeError$2G('iterator next must return an Object, got ' + inspect$5(nextItem));
			return IteratorClose$2(
				iteratorRecord,
				function () { throw error; } // eslint-disable-line no-loop-func
			);
		}
		try {
			var k = Get$n(nextItem, '0');
			var v = Get$n(nextItem, '1');
			Call$b(adder, target, [k, v]);
		} catch (e) {
			return IteratorClose$2(
				iteratorRecord,
				function () { throw e; }
			);
		}
	}
};

var GetIntrinsic$37 = require$$0;

var $ArrayPrototype$1 = GetIntrinsic$37('%Array.prototype%');
var $RangeError$9 = GetIntrinsic$37('%RangeError%');
var $SyntaxError$9 = GetIntrinsic$37('%SyntaxError%');
var $TypeError$2F = GetIntrinsic$37('%TypeError%');

var IsInteger$g = IsInteger$i;

var MAX_ARRAY_LENGTH$1 = Math.pow(2, 32) - 1;

var $setProto$3 = GetIntrinsic$37('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype$1
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate$1 = function ArrayCreate(length) {
	if (!IsInteger$g(length) || length < 0) {
		throw new $TypeError$2F('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH$1) {
		throw new $RangeError$9('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype$1;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype$1) { // step 8
		if (!$setProto$3) {
			throw new $SyntaxError$9('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto$3(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var has$f = require$$0$1;

var assertRecord$9 = assertRecord$y;

var Type$2D = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor$d = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$9(Type$2D, 'Property Descriptor', 'Desc', Desc);

	if (!has$f(Desc, '[[Get]]') && !has$f(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var has$e = require$$0$1;

var assertRecord$8 = assertRecord$y;

var Type$2C = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor$j = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$8(Type$2C, 'Property Descriptor', 'Desc', Desc);

	if (!has$e(Desc, '[[Value]]') && !has$e(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$36 = require$$0;

var $Object$4 = GetIntrinsic$36('%Object%');

var isPrimitive$3 = requireIsPrimitive();

var $preventExtensions$3 = $Object$4.preventExtensions;
var $isExtensible$1 = $Object$4.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible$b = $preventExtensions$3
	? function IsExtensible(obj) {
		return !isPrimitive$3(obj) && $isExtensible$1(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive$3(obj);
	};

var has$d = require$$0$1;

var GetIntrinsic$35 = require$$0;

var $TypeError$2E = GetIntrinsic$35('%TypeError%');

var Type$2B = Type$2P;
var ToBoolean$9 = ToBoolean$b;
var IsCallable$b = IsCallable$f.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$b = function ToPropertyDescriptor(Obj) {
	if (Type$2B(Obj) !== 'Object') {
		throw new $TypeError$2E('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$d(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$9(Obj.enumerable);
	}
	if (has$d(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$9(Obj.configurable);
	}
	if (has$d(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$d(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$9(Obj.writable);
	}
	if (has$d(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$b(getter)) {
			throw new $TypeError$2E('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$d(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$b(setter)) {
			throw new $TypeError$2E('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$d(desc, '[[Get]]') || has$d(desc, '[[Set]]')) && (has$d(desc, '[[Value]]') || has$d(desc, '[[Writable]]'))) {
		throw new $TypeError$2E('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $isNaN$h = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$k = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$h(x) && $isNaN$h(y);
};

var assertRecord$7 = assertRecord$y;

var Type$2A = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor$9 = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$7(Type$2A, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var assertRecord$6 = assertRecord$y;

var IsAccessorDescriptor$c = IsAccessorDescriptor$d;
var IsDataDescriptor$i = IsDataDescriptor$j;
var Type$2z = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor$5 = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$6(Type$2z, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$c(Desc) && !IsDataDescriptor$i(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$34 = require$$0;

var $TypeError$2D = GetIntrinsic$34('%TypeError%');

var DefineOwnProperty$7 = requireDefineOwnProperty();
var isPropertyDescriptor$7 = isPropertyDescriptor$s;
var isSamePropertyDescriptor$1 = requireIsSamePropertyDescriptor();

var FromPropertyDescriptor$8 = FromPropertyDescriptor$9;
var IsAccessorDescriptor$b = IsAccessorDescriptor$d;
var IsDataDescriptor$h = IsDataDescriptor$j;
var IsGenericDescriptor$4 = IsGenericDescriptor$5;
var IsPropertyKey$w = IsPropertyKey$B;
var SameValue$j = SameValue$k;
var Type$2y = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor$3 = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$2y(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$2D('Assertion failed: O must be undefined or an Object');
	}
	if (Type$2y(extensible) !== 'Boolean') {
		throw new $TypeError$2D('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor$7({
		Type: Type$2y,
		IsDataDescriptor: IsDataDescriptor$h,
		IsAccessorDescriptor: IsAccessorDescriptor$b
	}, Desc)) {
		throw new $TypeError$2D('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$2y(current) !== 'Undefined' && !isPropertyDescriptor$7({
		Type: Type$2y,
		IsDataDescriptor: IsDataDescriptor$h,
		IsAccessorDescriptor: IsAccessorDescriptor$b
	}, current)) {
		throw new $TypeError$2D('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey$w(P)) {
		throw new $TypeError$2D('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$2y(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor$4(Desc) || IsDataDescriptor$h(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$7(
					IsDataDescriptor$h,
					SameValue$j,
					FromPropertyDescriptor$8,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor$b(Desc)) {
				throw new $TypeError$2D('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty$7(
					IsDataDescriptor$h,
					SameValue$j,
					FromPropertyDescriptor$8,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor$4(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor$1({ SameValue: SameValue$j }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor$4(Desc)) ; else if (IsDataDescriptor$h(current) !== IsDataDescriptor$h(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor$h(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$7(
					IsDataDescriptor$h,
					SameValue$j,
					FromPropertyDescriptor$8,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty$7(
				IsDataDescriptor$h,
				SameValue$j,
				FromPropertyDescriptor$8,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor$h(current) && IsDataDescriptor$h(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue$j(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor$b(current) && IsAccessorDescriptor$b(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue$j(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue$j(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$2D('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty$7(
			IsDataDescriptor$h,
			SameValue$j,
			FromPropertyDescriptor$8,
			O,
			P,
			Desc
		);
	}
	return true;
};

var GetIntrinsic$33 = require$$0;

var $gOPD$7 = getOwnPropertyDescriptor;
var $SyntaxError$8 = GetIntrinsic$33('%SyntaxError%');
var $TypeError$2C = GetIntrinsic$33('%TypeError%');

var isPropertyDescriptor$6 = isPropertyDescriptor$s;

var IsAccessorDescriptor$a = IsAccessorDescriptor$d;
var IsDataDescriptor$g = IsDataDescriptor$j;
var IsExtensible$a = IsExtensible$b;
var IsPropertyKey$v = IsPropertyKey$B;
var ToPropertyDescriptor$a = ToPropertyDescriptor$b;
var SameValue$i = SameValue$k;
var Type$2x = Type$2P;
var ValidateAndApplyPropertyDescriptor$2 = ValidateAndApplyPropertyDescriptor$3;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty$3 = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$2x(O) !== 'Object') {
		throw new $TypeError$2C('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$v(P)) {
		throw new $TypeError$2C('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor$6({
		Type: Type$2x,
		IsDataDescriptor: IsDataDescriptor$g,
		IsAccessorDescriptor: IsAccessorDescriptor$a
	}, Desc)) {
		throw new $TypeError$2C('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD$7) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor$a(Desc)) {
			throw new $SyntaxError$8('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue$i(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$8('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD$7(O, P);
	var current = desc && ToPropertyDescriptor$a(desc);
	var extensible = IsExtensible$a(O);
	return ValidateAndApplyPropertyDescriptor$2(O, P, extensible, Desc, current);
};

var GetIntrinsic$32 = require$$0;

var $match$1 = GetIntrinsic$32('%Symbol.match%', true);

var hasRegExpMatcher$1 = require$$1$2;

var ToBoolean$8 = ToBoolean$b;

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp$3 = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match$1) {
		var isRegExp = argument[$match$1];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean$8(isRegExp);
		}
	}
	return hasRegExpMatcher$1(argument);
};

var GetIntrinsic$31 = require$$0;

var $gOPD$6 = getOwnPropertyDescriptor;
var $TypeError$2B = GetIntrinsic$31('%TypeError%');

var callBound$B = require$$1;

var $isEnumerable$5 = callBound$B('Object.prototype.propertyIsEnumerable');

var has$c = require$$0$1;

var IsArray$m = IsArray$q;
var IsPropertyKey$u = IsPropertyKey$B;
var IsRegExp$2 = IsRegExp$3;
var ToPropertyDescriptor$9 = ToPropertyDescriptor$b;
var Type$2w = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty$5 = function OrdinaryGetOwnProperty(O, P) {
	if (Type$2w(O) !== 'Object') {
		throw new $TypeError$2B('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$u(P)) {
		throw new $TypeError$2B('Assertion failed: P must be a Property Key');
	}
	if (!has$c(O, P)) {
		return void 0;
	}
	if (!$gOPD$6) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray$m(O) && P === 'length';
		var regexLastIndex = IsRegExp$2(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$5(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor$9($gOPD$6(O, P));
};

var GetIntrinsic$30 = require$$0;

var $String$6 = GetIntrinsic$30('%String%');
var $TypeError$2A = GetIntrinsic$30('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$k = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$2A('Cannot convert a Symbol value to a string');
	}
	return $String$6(argument);
};

var ToNumber$n = ToNumber$q;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$7 = function ToUint32(x) {
	return ToNumber$n(x) >>> 0;
};

var GetIntrinsic$2$ = require$$0;

var $RangeError$8 = GetIntrinsic$2$('%RangeError%');
var $TypeError$2z = GetIntrinsic$2$('%TypeError%');

var assign$2 = require$$1$3;

var isPropertyDescriptor$5 = isPropertyDescriptor$s;

var IsArray$l = IsArray$q;
var IsAccessorDescriptor$9 = IsAccessorDescriptor$d;
var IsDataDescriptor$f = IsDataDescriptor$j;
var OrdinaryDefineOwnProperty$2 = OrdinaryDefineOwnProperty$3;
var OrdinaryGetOwnProperty$4 = OrdinaryGetOwnProperty$5;
var ToNumber$m = ToNumber$q;
var ToString$j = ToString$k;
var ToUint32$6 = ToUint32$7;
var Type$2v = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength$1 = function ArraySetLength(A, Desc) {
	if (!IsArray$l(A)) {
		throw new $TypeError$2z('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor$5({
		Type: Type$2v,
		IsDataDescriptor: IsDataDescriptor$f,
		IsAccessorDescriptor: IsAccessorDescriptor$9
	}, Desc)) {
		throw new $TypeError$2z('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty$2(A, 'length', Desc);
	}
	var newLenDesc = assign$2({}, Desc);
	var newLen = ToUint32$6(Desc['[[Value]]']);
	var numberLen = ToNumber$m(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$8('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty$4(A, 'length');
	if (!IsDataDescriptor$f(oldLenDesc)) {
		throw new $TypeError$2z('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty$2(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty$2(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString$j(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty$2(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty$2(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

var IsConstructor$7 = {exports: {}};

var GetIntrinsic$2_ = require$$0;

var $TypeError$2y = GetIntrinsic$2_('%TypeError%');

var isPropertyDescriptor$4 = isPropertyDescriptor$s;
var DefineOwnProperty$6 = requireDefineOwnProperty();

var FromPropertyDescriptor$7 = FromPropertyDescriptor$9;
var IsAccessorDescriptor$8 = IsAccessorDescriptor$d;
var IsDataDescriptor$e = IsDataDescriptor$j;
var IsPropertyKey$t = IsPropertyKey$B;
var SameValue$h = SameValue$k;
var ToPropertyDescriptor$8 = ToPropertyDescriptor$b;
var Type$2u = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow$b = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$2u(O) !== 'Object') {
		throw new $TypeError$2y('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$t(P)) {
		throw new $TypeError$2y('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor$4({
		Type: Type$2u,
		IsDataDescriptor: IsDataDescriptor$e,
		IsAccessorDescriptor: IsAccessorDescriptor$8
	}, desc) ? desc : ToPropertyDescriptor$8(desc);
	if (!isPropertyDescriptor$4({
		Type: Type$2u,
		IsDataDescriptor: IsDataDescriptor$e,
		IsAccessorDescriptor: IsAccessorDescriptor$8
	}, Desc)) {
		throw new $TypeError$2y('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty$6(
		IsDataDescriptor$e,
		SameValue$h,
		FromPropertyDescriptor$7,
		O,
		P,
		Desc
	);
};

var GetIntrinsic$2Z = GetIntrinsic$7K.exports;

var $construct$1 = GetIntrinsic$2Z('%Reflect.construct%', true);

var DefinePropertyOrThrow$a = DefinePropertyOrThrow$b;
try {
	DefinePropertyOrThrow$a({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow$a = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow$a && $construct$1) {
	var isConstructorMarker$1 = {};
	var badArrayLike$1 = {};
	DefinePropertyOrThrow$a(badArrayLike$1, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker$1;
		},
		'[[Enumerable]]': true
	});

	IsConstructor$7.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct$1(argument, badArrayLike$1);
		} catch (err) {
			return err === isConstructorMarker$1;
		}
	};
} else {
	IsConstructor$7.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

var GetIntrinsic$2Y = require$$0;

var $Array$2 = GetIntrinsic$2Y('%Array%');
var $species$3 = GetIntrinsic$2Y('%Symbol.species%', true);
var $TypeError$2x = GetIntrinsic$2Y('%TypeError%');

var Get$m = Get$q;
var IsArray$k = IsArray$q;
var IsConstructor$6 = IsConstructor$7.exports;
var IsInteger$f = IsInteger$i;
var Type$2t = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate$1 = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger$f(length) || length < 0) {
		throw new $TypeError$2x('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray$k(originalArray);
	if (isArray) {
		C = Get$m(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species$3 && Type$2t(C) === 'Object') {
			C = Get$m(C, $species$3);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array$2(len);
	}
	if (!IsConstructor$6(C)) {
		throw new $TypeError$2x('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var GetIntrinsic$2X = require$$0;

var $TypeError$2w = GetIntrinsic$2X('%TypeError%');

var SameValue$g = SameValue$k;
var ToNumber$l = ToNumber$q;
var ToString$i = ToString$k;
var Type$2s = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString$3 = function CanonicalNumericIndexString(argument) {
	if (Type$2s(argument) !== 'String') {
		throw new $TypeError$2w('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber$l(argument);
	if (SameValue$g(ToString$i(n), argument)) { return n; }
	return void 0;
};

var has$b = require$$0$1;

var assertRecord$5 = assertRecord$y;

var IsDataDescriptor$d = IsDataDescriptor$j;
var IsGenericDescriptor$3 = IsGenericDescriptor$5;
var Type$2r = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor$1 = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord$5(Type$2r, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor$3(Desc) || IsDataDescriptor$d(Desc)) {
		if (!has$b(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has$b(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has$b(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has$b(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has$b(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has$b(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var GetIntrinsic$2W = require$$0;

var $TypeError$2v = GetIntrinsic$2W('%TypeError%');

var DefineOwnProperty$5 = requireDefineOwnProperty();

var FromPropertyDescriptor$6 = FromPropertyDescriptor$9;
var OrdinaryGetOwnProperty$3 = OrdinaryGetOwnProperty$5;
var IsDataDescriptor$c = IsDataDescriptor$j;
var IsExtensible$9 = IsExtensible$b;
var IsPropertyKey$s = IsPropertyKey$B;
var SameValue$f = SameValue$k;
var Type$2q = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty$4 = function CreateDataProperty(O, P, V) {
	if (Type$2q(O) !== 'Object') {
		throw new $TypeError$2v('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$s(P)) {
		throw new $TypeError$2v('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty$3(O, P);
	var extensible = !oldDesc || IsExtensible$9(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty$5(
		IsDataDescriptor$c,
		SameValue$f,
		FromPropertyDescriptor$6,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var GetIntrinsic$2V = require$$0;

var $TypeError$2u = GetIntrinsic$2V('%TypeError%');

var callBound$A = require$$1;
var forEach$7 = requireForEach();
var OwnPropertyKeys$1 = requireOwnPropertyKeys();

var $isEnumerable$4 = callBound$A('Object.prototype.propertyIsEnumerable');

var CreateDataProperty$3 = CreateDataProperty$4;
var Get$l = Get$q;
var IsArray$j = IsArray$q;
var IsInteger$e = IsInteger$i;
var IsPropertyKey$r = IsPropertyKey$B;
var SameValue$e = SameValue$k;
var ToNumber$k = ToNumber$q;
var ToObject$5 = ToObject$7;
var Type$2p = Type$2P;

// https://262.ecma-international.org/9.0/#sec-copydataproperties

var CopyDataProperties$1 = function CopyDataProperties(target, source, excludedItems) {
	if (Type$2p(target) !== 'Object') {
		throw new $TypeError$2u('Assertion failed: "target" must be an Object');
	}

	if (!IsArray$j(excludedItems)) {
		throw new $TypeError$2u('Assertion failed: "excludedItems" must be a List of Property Keys');
	}
	for (var i = 0; i < excludedItems.length; i += 1) {
		if (!IsPropertyKey$r(excludedItems[i])) {
			throw new $TypeError$2u('Assertion failed: "excludedItems" must be a List of Property Keys');
		}
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var fromObj = ToObject$5(source);

	var sourceKeys = OwnPropertyKeys$1(fromObj);
	forEach$7(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach$7(excludedItems, function (e) {
			if (SameValue$e(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable$4(fromObj, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && IsInteger$e(ToNumber$k(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = Get$l(fromObj, nextKey);
			CreateDataProperty$3(target, nextKey, propValue);
		}
	});

	return target;
};

var GetIntrinsic$2U = require$$0;

var $TypeError$2t = GetIntrinsic$2U('%TypeError%');

var CreateDataProperty$2 = CreateDataProperty$4;
var IsPropertyKey$q = IsPropertyKey$B;
var Type$2o = Type$2P;

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$4 = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$2o(O) !== 'Object') {
		throw new $TypeError$2t('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$q(P)) {
		throw new $TypeError$2t('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty$2(O, P, V);
	if (!success) {
		throw new $TypeError$2t('unable to create data property');
	}
	return success;
};

var GetIntrinsic$2T = require$$0;

var $TypeError$2s = GetIntrinsic$2T('%TypeError%');

var callBound$z = require$$1;

var $replace$2 = callBound$z('String.prototype.replace');

var RequireObjectCoercible$5 = RequireObjectCoercible$7.exports;
var ToString$h = ToString$k;
var Type$2n = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML$1 = function CreateHTML(string, tag, attribute, value) {
	if (Type$2n(tag) !== 'String' || Type$2n(attribute) !== 'String') {
		throw new $TypeError$2s('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible$5(string);
	var S = ToString$h(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString$h(value);
		var escapedV = $replace$2(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var GetIntrinsic$2S = require$$0;

var $TypeError$2r = GetIntrinsic$2S('%TypeError%');

var Type$2m = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject$1 = function CreateIterResultObject(value, done) {
	if (Type$2m(done) !== 'Boolean') {
		throw new $TypeError$2r('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

var ES5ToInteger$1 = ToInteger$u;

var ToNumber$j = ToNumber$q;

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

var ToInteger$9 = function ToInteger(value) {
	var number = ToNumber$j(value);
	return ES5ToInteger$1(number);
};

var MAX_SAFE_INTEGER$4 = maxSafeInteger;

var ToInteger$8 = ToInteger$9;

var ToLength$7 = function ToLength(argument) {
	var len = ToInteger$8(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER$4) { return MAX_SAFE_INTEGER$4; }
	return len;
};

var GetIntrinsic$2R = require$$0;

var callBound$y = require$$1;

var $TypeError$2q = GetIntrinsic$2R('%TypeError%');
var $indexOf$3 = callBound$y('Array.prototype.indexOf', true) || callBound$y('String.prototype.indexOf');
var $push$2 = callBound$y('Array.prototype.push');

var Get$k = Get$q;
var IsArray$i = IsArray$q;
var ToLength$6 = ToLength$7;
var ToString$g = ToString$k;
var Type$2l = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
var CreateListFromArrayLike$1 = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$2l(obj) !== 'Object') {
		throw new $TypeError$2q('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray$i(elementTypes)) {
		throw new $TypeError$2q('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength$6(Get$k(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString$g(index);
		var next = Get$k(obj, indexName);
		var nextType = Type$2l(next);
		if ($indexOf$3(elementTypes, nextType) < 0) {
			throw new $TypeError$2q('item type ' + nextType + ' is not a valid elementType');
		}
		$push$2(list, next);
		index += 1;
	}
	return list;
};

var GetIntrinsic$2Q = require$$0;

var $TypeError$2p = GetIntrinsic$2Q('%TypeError%');

var DefineOwnProperty$4 = requireDefineOwnProperty();

var FromPropertyDescriptor$5 = FromPropertyDescriptor$9;
var IsDataDescriptor$b = IsDataDescriptor$j;
var IsPropertyKey$p = IsPropertyKey$B;
var SameValue$d = SameValue$k;
var Type$2k = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty$1 = function CreateMethodProperty(O, P, V) {
	if (Type$2k(O) !== 'Object') {
		throw new $TypeError$2p('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$p(P)) {
		throw new $TypeError$2p('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty$4(
		IsDataDescriptor$b,
		SameValue$d,
		FromPropertyDescriptor$5,
		O,
		P,
		newDesc
	);
};

var floor$l = floor$n;

var msPerDay$7 = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$7 = function Day(t) {
	return floor$l(t / msPerDay$7);
};

var floor$k = floor$n;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$5 = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$k((y - 1969) / 4) - floor$k((y - 1901) / 100) + floor$k((y - 1601) / 400);
};

var GetIntrinsic$2P = require$$0;

var $Date$5 = GetIntrinsic$2P('%Date%');

var callBound$x = require$$1;

var $getUTCFullYear$1 = callBound$x('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$9 = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear$1(new $Date$5(t));
};

var Day$6 = Day$7;
var DayFromYear$4 = DayFromYear$5;
var YearFromTime$8 = YearFromTime$9;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$5 = function DayWithinYear(t) {
	return Day$6(t) - DayFromYear$4(YearFromTime$8(t));
};

var mod$1 = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$n = function modulo(x, y) {
	return mod$1(x, y);
};

var modulo$m = modulo$n;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$3 = function DaysInYear(y) {
	if (modulo$m(y, 4) !== 0) {
		return 365;
	}
	if (modulo$m(y, 100) !== 0) {
		return 366;
	}
	if (modulo$m(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$2O = require$$0;

var $EvalError$3 = GetIntrinsic$2O('%EvalError%');

var DaysInYear$2 = DaysInYear$3;
var YearFromTime$7 = YearFromTime$9;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$5 = function InLeapYear(t) {
	var days = DaysInYear$2(YearFromTime$7(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$3('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$4 = DayWithinYear$5;
var InLeapYear$4 = InLeapYear$5;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$7 = function MonthFromTime(t) {
	var day = DayWithinYear$4(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$4(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$2N = require$$0;

var $EvalError$2 = GetIntrinsic$2N('%EvalError%');

var DayWithinYear$3 = DayWithinYear$5;
var InLeapYear$3 = InLeapYear$5;
var MonthFromTime$6 = MonthFromTime$7;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$5 = function DateFromTime(t) {
	var m = MonthFromTime$6(t);
	var d = DayWithinYear$3(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear$3(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$2('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var Day$5 = Day$7;
var modulo$l = modulo$n;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$3 = function WeekDay(t) {
	return modulo$l(Day$5(t) + 4, 7);
};

var GetIntrinsic$2M = require$$0;

var $TypeError$2o = GetIntrinsic$2M('%TypeError%');

var weekdays$1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months$1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var $isNaN$g = _isNaN;
var padTimeComponent$3 = requirePadTimeComponent();

var Type$2j = Type$2P;
var WeekDay$2 = WeekDay$3;
var MonthFromTime$5 = MonthFromTime$7;
var YearFromTime$6 = YearFromTime$9;
var DateFromTime$4 = DateFromTime$5;

// https://262.ecma-international.org/9.0/#sec-datestring

var DateString$1 = function DateString(tv) {
	if (Type$2j(tv) !== 'Number' || $isNaN$g(tv)) {
		throw new $TypeError$2o('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays$1[WeekDay$2(tv)];
	var month = months$1[MonthFromTime$5(tv)];
	var day = padTimeComponent$3(DateFromTime$4(tv));
	var year = padTimeComponent$3(YearFromTime$6(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

var GetIntrinsic$2L = require$$0;

var $TypeError$2n = GetIntrinsic$2L('%TypeError%');

var IsPropertyKey$o = IsPropertyKey$B;
var Type$2i = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow$1 = function DeletePropertyOrThrow(O, P) {
	if (Type$2i(O) !== 'Object') {
		throw new $TypeError$2n('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$o(P)) {
		throw new $TypeError$2n('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$2n('Attempt to delete property failed.');
	}
	return success;
};

var GetIntrinsic$2K = require$$0;

var $TypeError$2m = GetIntrinsic$2K('%TypeError%');

var objectKeys$1 = require$$1$5;

var callBound$w = require$$1;

var callBind$3 = require$$1$1;

var $isEnumerable$3 = callBound$w('Object.prototype.propertyIsEnumerable');
var $pushApply$1 = callBind$3.apply(GetIntrinsic$2K('%Array.prototype.push%'));

var forEach$6 = requireForEach();

var Type$2h = Type$2P;

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

var EnumerableOwnPropertyNames$1 = function EnumerableOwnProperties(O, kind) {
	if (Type$2h(O) !== 'Object') {
		throw new $TypeError$2m('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys$1(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach$6(keys, function (key) {
			if ($isEnumerable$3(O, key)) {
				$pushApply$1(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError$2m('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

var GetIntrinsic$2J = require$$0;

var $TypeError$2l = GetIntrinsic$2J('%TypeError%');

var IsPropertyKey$n = IsPropertyKey$B;
var Type$2g = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty$3 = function HasProperty(O, P) {
	if (Type$2g(O) !== 'Object') {
		throw new $TypeError$2l('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$n(P)) {
		throw new $TypeError$2l('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$2I = require$$0;

var $TypeError$2k = GetIntrinsic$2I('%TypeError%');

var MAX_SAFE_INTEGER$3 = maxSafeInteger;

var Call$a = Call$f;
var CreateDataPropertyOrThrow$3 = CreateDataPropertyOrThrow$4;
var Get$j = Get$q;
var HasProperty$2 = HasProperty$3;
var IsArray$h = IsArray$q;
var ToLength$5 = ToLength$7;
var ToString$f = ToString$k;

// https://262.ecma-international.org/10.0/#sec-flattenintoarray

// eslint-disable-next-line max-params
var FlattenIntoArray$1 = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}

	var targetIndex = start;
	var sourceIndex = 0;
	while (sourceIndex < sourceLen) {
		var P = ToString$f(sourceIndex);
		var exists = HasProperty$2(source, P);
		if (exists === true) {
			var element = Get$j(source, P);
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new $TypeError$2k('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = Call$a(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = IsArray$h(element);
			}
			if (shouldFlatten) {
				var elementLen = ToLength$5(Get$j(element, 'length'));
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER$3) {
					throw new $TypeError$2k('index too large');
				}
				CreateDataPropertyOrThrow$3(target, ToString$f(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

var GetIntrinsic$2H = require$$0;

var hasSymbols$2 = require$$1$6();

var $TypeError$2j = GetIntrinsic$2H('%TypeError%');

var $gOPN$5 = GetIntrinsic$2H('%Object.getOwnPropertyNames%');
var $gOPS$1 = hasSymbols$2 && GetIntrinsic$2H('%Object.getOwnPropertySymbols%');
var keys$1 = require$$1$5;

var esType$1 = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys$1 = function GetOwnPropertyKeys(O, Type) {
	if (esType$1(O) !== 'Object') {
		throw new $TypeError$2j('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS$1 ? $gOPS$1(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$5) {
			return keys$1(O);
		}
		return $gOPN$5(O);
	}
	throw new $TypeError$2j('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var GetIntrinsic$2G = require$$0;

var $Function$1 = GetIntrinsic$2G('%Function%');
var $TypeError$2i = GetIntrinsic$2G('%TypeError%');

var Get$i = Get$q;
var IsConstructor$5 = IsConstructor$7.exports;
var Type$2f = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor$3 = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic$2G(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor$5(constructor)) {
		throw new $TypeError$2i('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get$i(constructor, 'prototype');
	if (Type$2f(proto) !== 'Object') {
		if (!(constructor instanceof $Function$1)) {
			// ignore other realms, for now
			throw new $TypeError$2i('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var GetIntrinsic$2F = require$$0;

var $TypeError$2h = GetIntrinsic$2F('%TypeError%');

var callBound$v = require$$1;
var regexTester$2 = requireRegexTester();
var every$4 = requireEvery();

var $charAt$6 = callBound$v('String.prototype.charAt');
var $strSlice$4 = callBound$v('String.prototype.slice');
var $indexOf$2 = callBound$v('String.prototype.indexOf');
var $parseInt$1 = parseInt;

var isDigit$1 = regexTester$2(/^[0-9]$/);

var inspect$4 = require$$1$4;

var Get$h = Get$q;
var IsArray$g = IsArray$q;
var IsInteger$d = IsInteger$i;
var ToObject$4 = ToObject$7;
var ToString$e = ToString$k;
var Type$2e = Type$2P;

var canDistinguishSparseFromUndefined$1 = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole$1 = function (capture, index, arr) {
	return Type$2e(capture) === 'String' || (canDistinguishSparseFromUndefined$1 ? !(index in arr) : Type$2e(capture) === 'Undefined');
};

// http://262.ecma-international.org/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution$1 = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type$2e(matched) !== 'String') {
		throw new $TypeError$2h('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$2e(str) !== 'String') {
		throw new $TypeError$2h('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger$d(position) || position < 0 || position > stringLength) {
		throw new $TypeError$2h('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect$4(position));
	}

	if (!IsArray$g(captures) || !every$4(captures, isStringOrHole$1)) {
		throw new $TypeError$2h('Assertion failed: `captures` must be a List of Strings, got ' + inspect$4(captures));
	}

	if (Type$2e(replacement) !== 'String') {
		throw new $TypeError$2h('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type$2e(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject$4(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt$6(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt$6(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$4(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$4(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt$6(replacement, i + 2);
				if (isDigit$1(next) && next !== '0' && (nextIsLast || !isDigit$1(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt$1(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type$2e(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit$1(next) && (nextIsLast || isDigit$1(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt$1(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type$2e(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type$2e(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf$2(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice$4(replacement, i + '$<'.length, endIndex);
							var capture = Get$h(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type$2e(capture) !== 'Undefined') {
								result += ToString$e(capture);
							}
							i += ('<' + groupName + '>').length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt$6(replacement, i);
		}
	}
	return result;
};

var GetIntrinsic$2E = require$$0;

var $TypeError$2g = GetIntrinsic$2E('%TypeError%');

var has$a = require$$0$1;

var IsPropertyKey$m = IsPropertyKey$B;
var Type$2d = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$3 = function HasOwnProperty(O, P) {
	if (Type$2d(O) !== 'Object') {
		throw new $TypeError$2g('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$m(P)) {
		throw new $TypeError$2g('Assertion failed: `P` must be a Property Key');
	}
	return has$a(O, P);
};

var floor$j = floor$n;
var modulo$k = modulo$n;

var timeConstants$7 = timeConstants$s;
var msPerHour$3 = timeConstants$7.msPerHour;
var HoursPerDay$1 = timeConstants$7.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$3 = function HourFromTime(t) {
	return modulo$k(floor$j(t / msPerHour$3), HoursPerDay$1);
};

var GetIntrinsic$2D = require$$0;

var $TypeError$2f = GetIntrinsic$2D('%TypeError%');

var Get$g = Get$q;
var IsCallable$a = IsCallable$f.exports;
var Type$2c = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance$3 = function OrdinaryHasInstance(C, O) {
	if (IsCallable$a(C) === false) {
		return false;
	}
	if (Type$2c(O) !== 'Object') {
		return false;
	}
	var P = Get$g(C, 'prototype');
	if (Type$2c(P) !== 'Object') {
		throw new $TypeError$2f('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var GetIntrinsic$2C = require$$0;

var $TypeError$2e = GetIntrinsic$2C('%TypeError%');

var $hasInstance$1 = GetIntrinsic$2C('Symbol.hasInstance', true);

var Call$9 = Call$f;
var GetMethod$4 = GetMethod$7;
var IsCallable$9 = IsCallable$f.exports;
var OrdinaryHasInstance$2 = OrdinaryHasInstance$3;
var ToBoolean$7 = ToBoolean$b;
var Type$2b = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator$1 = function InstanceofOperator(O, C) {
	if (Type$2b(O) !== 'Object') {
		throw new $TypeError$2e('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance$1 ? GetMethod$4(C, $hasInstance$1) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean$7(Call$9(instOfHandler, C, [O]));
	}
	if (!IsCallable$9(C)) {
		throw new $TypeError$2e('`C` is not Callable');
	}
	return OrdinaryHasInstance$2(C, O);
};

var GetIntrinsic$2B = require$$0;

var $isConcatSpreadable$1 = GetIntrinsic$2B('%Symbol.isConcatSpreadable%', true);

var Get$f = Get$q;
var IsArray$f = IsArray$q;
var ToBoolean$6 = ToBoolean$b;
var Type$2a = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable$1 = function IsConcatSpreadable(O) {
	if (Type$2a(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable$1) {
		var spreadable = Get$f(O, $isConcatSpreadable$1);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean$6(spreadable);
		}
	}
	return IsArray$f(O);
};

var callBound$u = require$$1;

var $PromiseThen$1 = callBound$u('Promise.prototype.then', true);

var Type$29 = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise$1 = function IsPromise(x) {
	if (Type$29(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen$1) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen$1(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

var GetIntrinsic$2A = require$$0;

var $TypeError$2d = GetIntrinsic$2A('%TypeError%');

var isPrefixOf$2 = requireIsPrefixOf();

// var callBound = require('call-bind/callBound');

// var $charAt = callBound('String.prototype.charAt');

var Type$28 = Type$2P;

// https://262.ecma-international.org/9.0/#sec-isstringprefix

var IsStringPrefix$1 = function IsStringPrefix(p, q) {
	if (Type$28(p) !== 'String') {
		throw new $TypeError$2d('Assertion failed: "p" must be a String');
	}

	if (Type$28(q) !== 'String') {
		throw new $TypeError$2d('Assertion failed: "q" must be a String');
	}

	return isPrefixOf$2(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

var callBound$t = require$$1;
var $arrayPush$1 = callBound$t('Array.prototype.push');

var GetIterator$3 = GetIterator$5;
var IteratorStep$3 = IteratorStep$5;
var IteratorValue$3 = IteratorValue$5;

// https://262.ecma-international.org/8.0/#sec-iterabletolist

var IterableToList$1 = function IterableToList(items, method) {
	var iterator = GetIterator$3(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep$3(iterator);
		if (next) {
			var nextValue = IteratorValue$3(next);
			$arrayPush$1(values, nextValue);
		}
	}
	return values;
};

var $isFinite$d = _isFinite;
var msPerDay$6 = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate$1 = function MakeDate(day, time) {
	if (!$isFinite$d(day) || !$isFinite$d(time)) {
		return NaN;
	}
	return (day * msPerDay$6) + time;
};

var GetIntrinsic$2z = require$$0;

var $DateUTC$1 = GetIntrinsic$2z('%Date.UTC%');

var $isFinite$c = _isFinite;

var DateFromTime$3 = DateFromTime$5;
var Day$4 = Day$7;
var floor$i = floor$n;
var modulo$j = modulo$n;
var MonthFromTime$4 = MonthFromTime$7;
var ToInteger$7 = ToInteger$9;
var YearFromTime$5 = YearFromTime$9;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay$1 = function MakeDay(year, month, date) {
	if (!$isFinite$c(year) || !$isFinite$c(month) || !$isFinite$c(date)) {
		return NaN;
	}
	var y = ToInteger$7(year);
	var m = ToInteger$7(month);
	var dt = ToInteger$7(date);
	var ym = y + floor$i(m / 12);
	var mn = modulo$j(m, 12);
	var t = $DateUTC$1(ym, mn, 1);
	if (YearFromTime$5(t) !== ym || MonthFromTime$4(t) !== mn || DateFromTime$3(t) !== 1) {
		return NaN;
	}
	return Day$4(t) + dt - 1;
};

var $isFinite$b = _isFinite;
var timeConstants$6 = timeConstants$s;
var msPerSecond$5 = timeConstants$6.msPerSecond;
var msPerMinute$3 = timeConstants$6.msPerMinute;
var msPerHour$2 = timeConstants$6.msPerHour;

var ToInteger$6 = ToInteger$9;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime$1 = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$b(hour) || !$isFinite$b(min) || !$isFinite$b(sec) || !$isFinite$b(ms)) {
		return NaN;
	}
	var h = ToInteger$6(hour);
	var m = ToInteger$6(min);
	var s = ToInteger$6(sec);
	var milli = ToInteger$6(ms);
	var t = (h * msPerHour$2) + (m * msPerMinute$3) + (s * msPerSecond$5) + milli;
	return t;
};

var floor$h = floor$n;
var modulo$i = modulo$n;

var timeConstants$5 = timeConstants$s;
var msPerMinute$2 = timeConstants$5.msPerMinute;
var MinutesPerHour$1 = timeConstants$5.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$3 = function MinFromTime(t) {
	return modulo$i(floor$h(t / msPerMinute$2), MinutesPerHour$1);
};

var modulo$h = modulo$n;

var msPerSecond$4 = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime$1 = function msFromTime(t) {
	return modulo$h(t, msPerSecond$4);
};

var GetIntrinsic$2y = require$$0;

var $String$5 = GetIntrinsic$2y('%String%');
var $TypeError$2c = GetIntrinsic$2y('%TypeError%');

var Type$27 = Type$2P;

// https://262.ecma-international.org/9.0/#sec-tostring-applied-to-the-number-type

var NumberToString = function NumberToString(m) {
	if (Type$27(m) !== 'Number') {
		throw new $TypeError$2c('Assertion failed: "m" must be a String');
	}

	return $String$5(m);
};

var GetIntrinsic$2x = require$$0;

var $ObjectCreate$1 = GetIntrinsic$2x('%Object.create%', true);
var $TypeError$2b = GetIntrinsic$2x('%TypeError%');
var $SyntaxError$7 = GetIntrinsic$2x('%SyntaxError%');

var Type$26 = Type$2P;

var hasProto$1 = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

var ObjectCreate$1 = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type$26(proto) !== 'Object') {
		throw new $TypeError$2b('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError$7('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate$1) {
		return $ObjectCreate$1(proto);
	}
	if (hasProto$1) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$7('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var GetIntrinsic$2w = require$$0;
var $TypeError$2a = GetIntrinsic$2w('%TypeError%');

var GetPrototypeFromConstructor$2 = GetPrototypeFromConstructor$3;
var IsArray$e = IsArray$q;
var ObjectCreate = ObjectCreate$1;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

var OrdinaryCreateFromConstructor$1 = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic$2w(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor$2(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray$e(slots)) {
		throw new $TypeError$2a('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate(proto, slots);
};

var GetIntrinsic$2v = require$$0;

var $TypeError$29 = GetIntrinsic$2v('%TypeError%');

var $getProto$1 = requireGetProto();

var Type$25 = Type$2P;

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

var OrdinaryGetPrototypeOf$3 = function OrdinaryGetPrototypeOf(O) {
	if (Type$25(O) !== 'Object') {
		throw new $TypeError$29('Assertion failed: O must be an Object');
	}
	if (!$getProto$1) {
		throw new $TypeError$29('This environment does not support fetching prototypes.');
	}
	return $getProto$1(O);
};

var GetIntrinsic$2u = require$$0;

var $TypeError$28 = GetIntrinsic$2u('%TypeError%');

var IsPropertyKey$l = IsPropertyKey$B;
var Type$24 = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty$1 = function OrdinaryHasProperty(O, P) {
	if (Type$24(O) !== 'Object') {
		throw new $TypeError$28('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$l(P)) {
		throw new $TypeError$28('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$2t = require$$0;

var $TypeError$27 = GetIntrinsic$2t('%TypeError%');

var $setProto$2 = requireSetProto();

var OrdinaryGetPrototypeOf$2 = OrdinaryGetPrototypeOf$3;
var Type$23 = Type$2P;

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf$1 = function OrdinarySetPrototypeOf(O, V) {
	if (Type$23(V) !== 'Object' && Type$23(V) !== 'Null') {
		throw new $TypeError$27('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto$2(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf$2(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

var GetIntrinsic$2s = require$$0;
var callBind$2 = require$$1$1;

var $resolve$1 = GetIntrinsic$2s('%Promise.resolve%', true);
var $PromiseResolve$1 = $resolve$1 && callBind$2($resolve$1);

// https://262.ecma-international.org/9.0/#sec-promise-resolve

var PromiseResolve$1 = function PromiseResolve(C, x) {
	if (!$PromiseResolve$1) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve$1(C, x);
};

var GetIntrinsic$2r = require$$0;

var $TypeError$26 = GetIntrinsic$2r('%TypeError%');

var callBound$s = require$$1;

var $charCodeAt$4 = callBound$s('String.prototype.charCodeAt');
var $numberToString$1 = callBound$s('Number.prototype.toString');
var $toLowerCase$1 = callBound$s('String.prototype.toLowerCase');
var $strSlice$3 = callBound$s('String.prototype.slice');

// https://262.ecma-international.org/9.0/#sec-unicodeescape

var UnicodeEscape$3 = function UnicodeEscape(C) {
	if (typeof C !== 'string' || C.length !== 1) {
		throw new $TypeError$26('Assertion failed: `C` must be a single code unit');
	}
	var n = $charCodeAt$4(C, 0);
	if (n > 0xFFFF) {
		throw new $TypeError$26('`Assertion failed: numeric value of `C` must be <= 0xFFFF');
	}

	return '\\u' + $strSlice$3('0000' + $toLowerCase$1($numberToString$1(n, 16)), -4);
};

var GetIntrinsic$2q = require$$0;

var $TypeError$25 = GetIntrinsic$2q('%TypeError%');
var $fromCharCode$3 = GetIntrinsic$2q('%String.fromCharCode%');

var floor$g = floor$n;
var modulo$g = modulo$n;

var isCodePoint$1 = requireIsCodePoint();

// https://262.ecma-international.org/7.0/#sec-utf16encoding

var UTF16Encoding$3 = function UTF16Encoding(cp) {
	if (!isCodePoint$1(cp)) {
		throw new $TypeError$25('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode$3(cp);
	}
	var cu1 = floor$g((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo$g(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode$3(cu1) + $fromCharCode$3(cu2);
};

var GetIntrinsic$2p = require$$0;

var $TypeError$24 = GetIntrinsic$2p('%TypeError%');

var callBound$r = require$$1;
var forEach$5 = requireForEach();
var isLeadingSurrogate$4 = isLeadingSurrogate$d;
var isTrailingSurrogate$4 = isTrailingSurrogate$d;

var $charCodeAt$3 = callBound$r('String.prototype.charCodeAt');
var $strSplit = callBound$r('String.prototype.split');

var Type$22 = Type$2P;
var UnicodeEscape$2 = UnicodeEscape$3;
var UTF16Encoding$2 = UTF16Encoding$3;

var has$9 = require$$0$1;

// https://262.ecma-international.org/10.0/#sec-quotejsonstring

var escapes$1 = {
	'\u0008': '\\b',
	'\u0009': '\\t',
	'\u000A': '\\n',
	'\u000C': '\\f',
	'\u000D': '\\r',
	'\u0022': '\\"',
	'\u005c': '\\\\'
};

var QuoteJSONString$1 = function QuoteJSONString(value) {
	if (Type$22(value) !== 'String') {
		throw new $TypeError$24('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach$5($strSplit(value), function (C) {
			if (has$9(escapes$1, C)) {
				product += escapes$1[C];
			} else {
				var cCharCode = $charCodeAt$3(C, 0);
				if (cCharCode < 0x20 || isLeadingSurrogate$4(C) || isTrailingSurrogate$4(C)) {
					product += UnicodeEscape$2(C);
				} else {
					product += UTF16Encoding$2(cCharCode);
				}
			}
		});
	}
	product += '"';
	return product;
};

var GetIntrinsic$2o = require$$0;

var $RegExp$2 = GetIntrinsic$2o('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString$d = ToString$k;

// https://262.ecma-international.org/6.0/#sec-regexpcreate

var RegExpCreate$1 = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString$d(P);
	var flags = typeof F === 'undefined' ? '' : ToString$d(F);
	return new $RegExp$2(pattern, flags);
};

var GetIntrinsic$2n = require$$0;

var $TypeError$23 = GetIntrinsic$2n('%TypeError%');

var regexExec$1 = require$$1('RegExp.prototype.exec');

var Call$8 = Call$f;
var Get$e = Get$q;
var IsCallable$8 = IsCallable$f.exports;
var Type$21 = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec$1 = function RegExpExec(R, S) {
	if (Type$21(R) !== 'Object') {
		throw new $TypeError$23('Assertion failed: `R` must be an Object');
	}
	if (Type$21(S) !== 'String') {
		throw new $TypeError$23('Assertion failed: `S` must be a String');
	}
	var exec = Get$e(R, 'exec');
	if (IsCallable$8(exec)) {
		var result = Call$8(exec, R, [S]);
		if (result === null || Type$21(result) === 'Object') {
			return result;
		}
		throw new $TypeError$23('"exec" method must return `null` or an Object');
	}
	return regexExec$1(R, S);
};

var GetIntrinsic$2m = require$$0;

var $TypeError$22 = GetIntrinsic$2m('%TypeError%');

var SameValue$c = SameValue$k;

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

var SameValueNonNumber = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError$22('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue$c(x, y);
};

var $isNaN$f = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero$2 = function SameValueZero(x, y) {
	return (x === y) || ($isNaN$f(x) && $isNaN$f(y));
};

var floor$f = floor$n;
var modulo$f = modulo$n;

var timeConstants$4 = timeConstants$s;
var msPerSecond$3 = timeConstants$4.msPerSecond;
var SecondsPerMinute$1 = timeConstants$4.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$3 = function SecFromTime(t) {
	return modulo$f(floor$f(t / msPerSecond$3), SecondsPerMinute$1);
};

var GetIntrinsic$2l = require$$0;

var $TypeError$21 = GetIntrinsic$2l('%TypeError%');

var IsPropertyKey$k = IsPropertyKey$B;
var SameValue$b = SameValue$k;
var Type$20 = Type$2P;

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation$1 = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set$1 = function Set(O, P, V, Throw) {
	if (Type$20(O) !== 'Object') {
		throw new $TypeError$21('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$k(P)) {
		throw new $TypeError$21('Assertion failed: `P` must be a Property Key');
	}
	if (Type$20(Throw) !== 'Boolean') {
		throw new $TypeError$21('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation$1 && !SameValue$b(O[P], V)) {
			throw new $TypeError$21('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation$1 ? SameValue$b(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

var GetIntrinsic$2k = require$$0;

var $TypeError$20 = GetIntrinsic$2k('%TypeError%');

var DefinePropertyOrThrow$9 = DefinePropertyOrThrow$b;
var HasOwnProperty$2 = HasOwnProperty$3;
var IsExtensible$8 = IsExtensible$b;
var IsInteger$c = IsInteger$i;
var Type$1$ = Type$2P;

// https://262.ecma-international.org/9.0/#sec-setfunctionlength

var SetFunctionLength$1 = function SetFunctionLength(F, length) {
	if (typeof F !== 'function' || !IsExtensible$8(F) || HasOwnProperty$2(F, 'length')) {
		throw new $TypeError$20('Assertion failed: `F` must be an extensible function and lack an own `length` property');
	}
	if (Type$1$(length) !== 'Number') {
		throw new $TypeError$20('Assertion failed: `length` must be a Number');
	}
	if (length < 0 || !IsInteger$c(length)) {
		throw new $TypeError$20('Assertion failed: `length` must be an integer >= 0');
	}
	return DefinePropertyOrThrow$9(F, 'length', {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});
};

var GetIntrinsic$2j = require$$0;

var has$8 = require$$0$1;

var $TypeError$1$ = GetIntrinsic$2j('%TypeError%');

var getSymbolDescription$1 = requireGetSymbolDescription();

var DefinePropertyOrThrow$8 = DefinePropertyOrThrow$b;
var IsExtensible$7 = IsExtensible$b;
var Type$1_ = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName$1 = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$1$('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible$7(F) || has$8(F, 'name')) {
		throw new $TypeError$1$('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$1_(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$1$('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription$1(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow$8(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var GetIntrinsic$2i = require$$0;

var $SyntaxError$6 = GetIntrinsic$2i('%SyntaxError%');
var $TypeError$1_ = GetIntrinsic$2i('%TypeError%');
var $preventExtensions$2 = GetIntrinsic$2i('%Object.preventExtensions%');
var $gOPD$5 = getOwnPropertyDescriptor;
var $gOPN$4 = GetIntrinsic$2i('%Object.getOwnPropertyNames%');

var forEach$4 = requireForEach();

var DefinePropertyOrThrow$7 = DefinePropertyOrThrow$b;
var IsAccessorDescriptor$7 = IsAccessorDescriptor$d;
var ToPropertyDescriptor$7 = ToPropertyDescriptor$b;
var Type$1Z = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel$1 = function SetIntegrityLevel(O, level) {
	if (Type$1Z(O) !== 'Object') {
		throw new $TypeError$1_('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$1_('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions$2) {
		throw new $SyntaxError$6('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions$2(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$4) {
		throw new $SyntaxError$6('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$4(O);
	if (level === 'sealed') {
		forEach$4(theKeys, function (k) {
			DefinePropertyOrThrow$7(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach$4(theKeys, function (k) {
			var currentDesc = $gOPD$5(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor$7(ToPropertyDescriptor$7(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow$7(O, k, desc);
			}
		});
	}
	return true;
};

var GetIntrinsic$2h = require$$0;

var $species$2 = GetIntrinsic$2h('%Symbol.species%', true);
var $TypeError$1Z = GetIntrinsic$2h('%TypeError%');

var IsConstructor$4 = IsConstructor$7.exports;
var Type$1Y = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor$1 = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$1Y(O) !== 'Object') {
		throw new $TypeError$1Z('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$1Y(C) !== 'Object') {
		throw new $TypeError$1Z('O.constructor is not an Object');
	}
	var S = $species$2 ? C[$species$2] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor$4(S)) {
		return S;
	}
	throw new $TypeError$1Z('no constructor found');
};

var GetIntrinsic$2g = require$$0;
var callBound$q = require$$1;

var $TypeError$1Y = GetIntrinsic$2g('%TypeError%');

var IsInteger$b = IsInteger$i;
var Type$1X = Type$2P;

var $charAt$5 = callBound$q('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

var SplitMatch$1 = function SplitMatch(S, q, R) {
	if (Type$1X(S) !== 'String') {
		throw new $TypeError$1Y('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$b(q)) {
		throw new $TypeError$1Y('Assertion failed: `q` must be an integer');
	}
	if (Type$1X(R) !== 'String') {
		throw new $TypeError$1Y('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt$5(S, q + i) !== $charAt$5(R, i)) {
			return false;
		}
	}

	return q + r;
};

var GetIntrinsic$2f = require$$0;

var $Object$3 = GetIntrinsic$2f('%Object%');
var $StringPrototype$1 = GetIntrinsic$2f('%String.prototype%');
var $SyntaxError$5 = GetIntrinsic$2f('%SyntaxError%');
var $TypeError$1X = GetIntrinsic$2f('%TypeError%');

var DefinePropertyOrThrow$6 = DefinePropertyOrThrow$b;
var Type$1W = Type$2P;

var setProto$1 = requireSetProto();

// https://262.ecma-international.org/6.0/#sec-stringcreate

var StringCreate$1 = function StringCreate(value, prototype) {
	if (Type$1W(value) !== 'String') {
		throw new $TypeError$1X('Assertion failed: `S` must be a String');
	}

	var S = $Object$3(value);
	if (S !== $StringPrototype$1) {
		if (setProto$1) {
			setProto$1(S, prototype);
		} else {
			throw new $SyntaxError$5('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow$6(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

var GetIntrinsic$2e = require$$0;

var $TypeError$1W = GetIntrinsic$2e('%TypeError%');

var callBound$p = require$$1;
var $charAt$4 = callBound$p('String.prototype.charAt');
var $stringToString$1 = callBound$p('String.prototype.toString');

var CanonicalNumericIndexString$2 = CanonicalNumericIndexString$3;
var IsInteger$a = IsInteger$i;
var IsPropertyKey$j = IsPropertyKey$B;
var Type$1V = Type$2P;

var isNegativeZero$2 = require$$6;

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

var StringGetOwnProperty$1 = function StringGetOwnProperty(S, P) {
	var str;
	if (Type$1V(S) === 'Object') {
		try {
			str = $stringToString$1(S);
		} catch (e) { /**/ }
	}
	if (Type$1V(str) !== 'String') {
		throw new $TypeError$1W('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey$j(P)) {
		throw new $TypeError$1W('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type$1V(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString$2(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger$a(index) || isNegativeZero$2(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt$4(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

var GetIntrinsic$2d = require$$0;

var $TypeError$1V = GetIntrinsic$2d('%TypeError%');

var callBound$o = require$$1;

var $SymbolToString$1 = callBound$o('Symbol.prototype.toString', true);

var Type$1U = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString$1 = function SymbolDescriptiveString(sym) {
	if (Type$1U(sym) !== 'Symbol') {
		throw new $TypeError$1V('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString$1(sym);
};

var GetIntrinsic$2c = require$$0;

var $gOPD$4 = getOwnPropertyDescriptor;
var $gOPN$3 = GetIntrinsic$2c('%Object.getOwnPropertyNames%');
var $TypeError$1U = GetIntrinsic$2c('%TypeError%');

var every$3 = requireEvery();

var IsDataDescriptor$a = IsDataDescriptor$j;
var IsExtensible$6 = IsExtensible$b;
var ToPropertyDescriptor$6 = ToPropertyDescriptor$b;
var Type$1T = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel$1 = function TestIntegrityLevel(O, level) {
	if (Type$1T(O) !== 'Object') {
		throw new $TypeError$1U('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$1U('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible$6(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN$3(O);
	return theKeys.length === 0 || every$3(theKeys, function (k) {
		var currentDesc = $gOPD$4(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor$a(ToPropertyDescriptor$6(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var $BooleanValueOf$1 = require$$1('Boolean.prototype.valueOf');

var Type$1S = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue$1 = function thisBooleanValue(value) {
	if (Type$1S(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf$1(value);
};

var callBound$n = require$$1;

var Type$1R = Type$2P;

var $NumberValueOf$1 = callBound$n('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue$1 = function thisNumberValue(value) {
	if (Type$1R(value) === 'Number') {
		return value;
	}

	return $NumberValueOf$1(value);
};

var $StringValueOf$1 = require$$1('String.prototype.valueOf');

var Type$1Q = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue$1 = function thisStringValue(value) {
	if (Type$1Q(value) === 'String') {
		return value;
	}

	return $StringValueOf$1(value);
};

var callBound$m = require$$1;

var $SymbolValueOf$1 = callBound$m('Symbol.prototype.valueOf', true);

var Type$1P = Type$2P;

// https://262.ecma-international.org/9.0/#sec-thissymbolvalue

var thisSymbolValue$1 = function thisSymbolValue(value) {
	if (!$SymbolValueOf$1) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type$1P(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf$1(value);
};

var thisTimeValue$1 = {exports: {}};

(function (module) {

	module.exports = thisTimeValue$2;
} (thisTimeValue$1));

var GetIntrinsic$2b = require$$0;

var $Date$4 = GetIntrinsic$2b('%Date%');
var $Number$4 = GetIntrinsic$2b('%Number%');

var $isFinite$a = _isFinite;

var abs$7 = abs$9;
var ToNumber$i = ToNumber$q;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip$1 = function TimeClip(time) {
	if (!$isFinite$a(time) || abs$7(time) > 8.64e15) {
		return NaN;
	}
	return $Number$4(new $Date$4(ToNumber$i(time)));
};

var msPerDay$5 = timeConstants$s.msPerDay;

var DayFromYear$3 = DayFromYear$5;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear$1 = function TimeFromYear(y) {
	return msPerDay$5 * DayFromYear$3(y);
};

var GetIntrinsic$2a = require$$0;

var $TypeError$1T = GetIntrinsic$2a('%TypeError%');

var $isNaN$e = _isNaN;
var padTimeComponent$2 = requirePadTimeComponent();

var HourFromTime$2 = HourFromTime$3;
var MinFromTime$2 = MinFromTime$3;
var SecFromTime$2 = SecFromTime$3;
var Type$1O = Type$2P;

// https://262.ecma-international.org/9.0/#sec-timestring

var TimeString$1 = function TimeString(tv) {
	if (Type$1O(tv) !== 'Number' || $isNaN$e(tv)) {
		throw new $TypeError$1T('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime$2(tv);
	var minute = MinFromTime$2(tv);
	var second = SecFromTime$2(tv);
	return padTimeComponent$2(hour) + ':' + padTimeComponent$2(minute) + ':' + padTimeComponent$2(second) + '\x20GMT';
};

var modulo$e = modulo$n;

var msPerDay$4 = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay$1 = function TimeWithinDay(t) {
	return modulo$e(t, msPerDay$4);
};

var GetIntrinsic$29 = require$$0;

var $TypeError$1S = GetIntrinsic$29('%TypeError%');
var $Date$3 = GetIntrinsic$29('%Date%');

var $isNaN$d = _isNaN;

var Type$1N = Type$2P;

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString$1 = function ToDateString(tv) {
	if (Type$1N(tv) !== 'Number') {
		throw new $TypeError$1S('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN$d(tv)) {
		return 'Invalid Date';
	}
	return $Date$3(tv);
};

var GetIntrinsic$28 = require$$0;

var $RangeError$7 = GetIntrinsic$28('%RangeError%');

var ToInteger$5 = ToInteger$9;
var ToLength$4 = ToLength$7;
var SameValueZero$1 = SameValueZero$2;

// https://262.ecma-international.org/8.0/#sec-toindex

var ToIndex$1 = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger$5(value);
	if (integerIndex < 0) {
		throw new $RangeError$7('index must be >= 0');
	}
	var index = ToLength$4(integerIndex);
	if (!SameValueZero$1(integerIndex, index)) {
		throw new $RangeError$7('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

var abs$6 = abs$9;
var floor$e = floor$n;
var modulo$d = modulo$n;
var ToNumber$h = ToNumber$q;

var $isNaN$c = _isNaN;
var $isFinite$9 = _isFinite;
var $sign$3 = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$3 = function ToUint16(value) {
	var number = ToNumber$h(value);
	if ($isNaN$c(number) || number === 0 || !$isFinite$9(number)) { return 0; }
	var posInt = $sign$3(number) * floor$e(abs$6(number));
	return modulo$d(posInt, 0x10000);
};

var ToUint16$2 = ToUint16$3;

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16$1 = function ToInt16(argument) {
	var int16bit = ToUint16$2(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

var ToNumber$g = ToNumber$q;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$6 = function ToInt32(x) {
	return ToNumber$g(x) >> 0;
};

var ToNumber$f = ToNumber$q;

var $isNaN$b = _isNaN;
var $isFinite$8 = _isFinite;
var $sign$2 = sign;

var abs$5 = abs$9;
var floor$d = floor$n;
var modulo$c = modulo$n;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

var ToUint8$3 = function ToUint8(argument) {
	var number = ToNumber$f(argument);
	if ($isNaN$b(number) || number === 0 || !$isFinite$8(number)) { return 0; }
	var posInt = $sign$2(number) * floor$d(abs$5(number));
	return modulo$c(posInt, 0x100);
};

var ToUint8$2 = ToUint8$3;

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8$1 = function ToInt8(argument) {
	var int8bit = ToUint8$2(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var GetIntrinsic$27 = require$$0;

var $String$4 = GetIntrinsic$27('%String%');

var ToPrimitive$6 = ToPrimitive$a;
var ToString$c = ToString$k;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey$1 = function ToPropertyKey(argument) {
	var key = ToPrimitive$6(argument, $String$4);
	return typeof key === 'symbol' ? key : ToString$c(key);
};

var ToNumber$e = ToNumber$q;
var floor$c = floor$n;

var $isNaN$a = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp$1 = function ToUint8Clamp(argument) {
	var number = ToNumber$e(argument);
	if ($isNaN$a(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor$c(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var trimStart$1 = require$$0$5;
var trimEnd$1 = require$$1$7;

var GetIntrinsic$26 = require$$0;

var $TypeError$1R = GetIntrinsic$26('%TypeError%');

var RequireObjectCoercible$4 = RequireObjectCoercible$7.exports;
var ToString$b = ToString$k;

// https://262.ecma-international.org/10.0/#sec-trimstring

var TrimString$1 = function TrimString(string, where) {
	var str = RequireObjectCoercible$4(string);
	var S = ToString$b(str);
	var T;
	if (where === 'start') {
		T = trimStart$1(S);
	} else if (where === 'end') {
		T = trimEnd$1(S);
	} else if (where === 'start+end') {
		T = trimStart$1(trimEnd$1(S));
	} else {
		throw new $TypeError$1R('Assertion failed: invalid `where` value; must be "start", "end", or "start+end"');
	}
	return T;
};

var GetIntrinsic$25 = require$$0;

var $TypeError$1Q = GetIntrinsic$25('%TypeError%');
var $fromCharCode$2 = GetIntrinsic$25('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate$3 = isLeadingSurrogate$d;
var isTrailingSurrogate$3 = isTrailingSurrogate$d;

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

var UTF16Decode = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate$3(lead) || !isTrailingSurrogate$3(trail)) {
		throw new $TypeError$1Q('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode$2(lead) + $fromCharCode$2(trail);
};

/* eslint global-require: 0 */
// https://262.ecma-international.org/10.0/#sec-abstract-operations
var ES2019$1 = {
	'Abstract Equality Comparison': AbstractEqualityComparison$1,
	'Abstract Relational Comparison': AbstractRelationalComparison$1,
	'Strict Equality Comparison': StrictEqualityComparison$1,
	abs: abs$9,
	AddEntriesFromIterable: AddEntriesFromIterable$1,
	AdvanceStringIndex: AdvanceStringIndex$3,
	ArrayCreate: ArrayCreate$1,
	ArraySetLength: ArraySetLength$1,
	ArraySpeciesCreate: ArraySpeciesCreate$1,
	Call: Call$f,
	CanonicalNumericIndexString: CanonicalNumericIndexString$3,
	CompletePropertyDescriptor: CompletePropertyDescriptor$1,
	CopyDataProperties: CopyDataProperties$1,
	CreateDataProperty: CreateDataProperty$4,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow$4,
	CreateHTML: CreateHTML$1,
	CreateIterResultObject: CreateIterResultObject$1,
	CreateListFromArrayLike: CreateListFromArrayLike$1,
	CreateMethodProperty: CreateMethodProperty$1,
	DateFromTime: DateFromTime$5,
	DateString: DateString$1,
	Day: Day$7,
	DayFromYear: DayFromYear$5,
	DaysInYear: DaysInYear$3,
	DayWithinYear: DayWithinYear$5,
	DefinePropertyOrThrow: DefinePropertyOrThrow$b,
	DeletePropertyOrThrow: DeletePropertyOrThrow$1,
	EnumerableOwnPropertyNames: EnumerableOwnPropertyNames$1,
	FlattenIntoArray: FlattenIntoArray$1,
	floor: floor$n,
	FromPropertyDescriptor: FromPropertyDescriptor$9,
	Get: Get$q,
	GetIterator: GetIterator$5,
	GetMethod: GetMethod$7,
	GetOwnPropertyKeys: GetOwnPropertyKeys$1,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor$3,
	GetSubstitution: GetSubstitution$1,
	GetV: GetV$5,
	HasOwnProperty: HasOwnProperty$3,
	HasProperty: HasProperty$3,
	HourFromTime: HourFromTime$3,
	InLeapYear: InLeapYear$5,
	InstanceofOperator: InstanceofOperator$1,
	Invoke: Invoke$3,
	IsAccessorDescriptor: IsAccessorDescriptor$d,
	IsArray: IsArray$q,
	IsCallable: IsCallable$f.exports,
	IsConcatSpreadable: IsConcatSpreadable$1,
	IsConstructor: IsConstructor$7.exports,
	IsDataDescriptor: IsDataDescriptor$j,
	IsExtensible: IsExtensible$b,
	IsGenericDescriptor: IsGenericDescriptor$5,
	IsInteger: IsInteger$i,
	IsPromise: IsPromise$1,
	IsPropertyKey: IsPropertyKey$B,
	IsRegExp: IsRegExp$3,
	IsStringPrefix: IsStringPrefix$1,
	IterableToList: IterableToList$1,
	IteratorClose: IteratorClose$3,
	IteratorComplete: IteratorComplete$3,
	IteratorNext: IteratorNext$3,
	IteratorStep: IteratorStep$5,
	IteratorValue: IteratorValue$5,
	MakeDate: MakeDate$1,
	MakeDay: MakeDay$1,
	MakeTime: MakeTime$1,
	MinFromTime: MinFromTime$3,
	modulo: modulo$n,
	MonthFromTime: MonthFromTime$7,
	msFromTime: msFromTime$1,
	NumberToString: NumberToString,
	ObjectCreate: ObjectCreate$1,
	OrdinaryCreateFromConstructor: OrdinaryCreateFromConstructor$1,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty$3,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty$5,
	OrdinaryGetPrototypeOf: OrdinaryGetPrototypeOf$3,
	OrdinaryHasInstance: OrdinaryHasInstance$3,
	OrdinaryHasProperty: OrdinaryHasProperty$1,
	OrdinarySetPrototypeOf: OrdinarySetPrototypeOf$1,
	PromiseResolve: PromiseResolve$1,
	QuoteJSONString: QuoteJSONString$1,
	RegExpCreate: RegExpCreate$1,
	RegExpExec: RegExpExec$1,
	RequireObjectCoercible: RequireObjectCoercible$7.exports,
	SameValue: SameValue$k,
	SameValueNonNumber: SameValueNonNumber,
	SameValueZero: SameValueZero$2,
	SecFromTime: SecFromTime$3,
	Set: _Set$1,
	SetFunctionLength: SetFunctionLength$1,
	SetFunctionName: SetFunctionName$1,
	SetIntegrityLevel: SetIntegrityLevel$1,
	SpeciesConstructor: SpeciesConstructor$1,
	SplitMatch: SplitMatch$1,
	StringCreate: StringCreate$1,
	StringGetOwnProperty: StringGetOwnProperty$1,
	SymbolDescriptiveString: SymbolDescriptiveString$1,
	TestIntegrityLevel: TestIntegrityLevel$1,
	thisBooleanValue: thisBooleanValue$1,
	thisNumberValue: thisNumberValue$1,
	thisStringValue: thisStringValue$1,
	thisSymbolValue: thisSymbolValue$1,
	thisTimeValue: thisTimeValue$1.exports,
	TimeClip: TimeClip$1,
	TimeFromYear: TimeFromYear$1,
	TimeString: TimeString$1,
	TimeWithinDay: TimeWithinDay$1,
	ToBoolean: ToBoolean$b,
	ToDateString: ToDateString$1,
	ToIndex: ToIndex$1,
	ToInt16: ToInt16$1,
	ToInt32: ToInt32$6,
	ToInt8: ToInt8$1,
	ToInteger: ToInteger$9,
	ToLength: ToLength$7,
	ToNumber: ToNumber$q,
	ToObject: ToObject$7,
	ToPrimitive: ToPrimitive$a,
	ToPropertyDescriptor: ToPropertyDescriptor$b,
	ToPropertyKey: ToPropertyKey$1,
	ToString: ToString$k,
	ToUint16: ToUint16$3,
	ToUint32: ToUint32$7,
	ToUint8: ToUint8$3,
	ToUint8Clamp: ToUint8Clamp$1,
	TrimString: TrimString$1,
	Type: Type$2P,
	UnicodeEscape: UnicodeEscape$3,
	UTF16Decode: UTF16Decode,
	UTF16Encoding: UTF16Encoding$3,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor$3,
	WeekDay: WeekDay$3,
	YearFromTime: YearFromTime$9
};

var es2019 = ES2019$1;

var toPrimitive = require$$0$4;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$5 = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

var GetIntrinsic$24 = require$$0;

var $TypeError$1P = GetIntrinsic$24('%TypeError%');
var $Number$3 = GetIntrinsic$24('%Number%');
var $RegExp$1 = GetIntrinsic$24('%RegExp%');
var $parseInteger = GetIntrinsic$24('%parseInt%');

var callBound$l = require$$1;
var regexTester$1 = requireRegexTester();
var isPrimitive$2 = requireIsPrimitive();

var $strSlice$2 = callBound$l('String.prototype.slice');
var isBinary = regexTester$1(/^0b[01]+$/i);
var isOctal = regexTester$1(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester$1(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp$1('[' + nonWS + ']', 'g');
var hasNonWS = regexTester$1(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace$1 = callBound$l('String.prototype.replace');
var $trim = function (value) {
	return $replace$1(value, trimRegex, '');
};

var ToPrimitive$4 = ToPrimitive$5;

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber$d = function ToNumber(argument) {
	var value = isPrimitive$2(argument) ? argument : ToPrimitive$4(argument, $Number$3);
	if (typeof value === 'symbol') {
		throw new $TypeError$1P('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'bigint') {
		throw new $TypeError$1P('Conversion from \'BigInt\' to \'number\' is not allowed.');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice$2(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice$2(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number$3(value);
};

var ES5Type = Type$6N;

// https://262.ecma-international.org/11.0/#sec-ecmascript-data-types-and-values

var Type$1M = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	if (typeof x === 'bigint') {
		return 'BigInt';
	}
	return ES5Type(x);
};

var ToNumber$c = ToNumber$d;
var ToPrimitive$3 = ToPrimitive$5;
var Type$1L = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison = function AbstractEqualityComparison(x, y) {
	var xType = Type$1L(x);
	var yType = Type$1L(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber$c(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber$c(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber$c(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber$c(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive$3(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive$3(x), y);
	}
	return false;
};

var GetIntrinsic$23 = require$$0;

var $Number$2 = GetIntrinsic$23('%Number%');
var $TypeError$1O = GetIntrinsic$23('%TypeError%');

var $isNaN$9 = _isNaN;
var $isFinite$7 = _isFinite;
var isPrefixOf$1 = requireIsPrefixOf();

var ToNumber$b = ToNumber$d;
var ToPrimitive$2 = ToPrimitive$5;
var Type$1K = Type$1M;

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$1K(LeftFirst) !== 'Boolean') {
		throw new $TypeError$1O('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive$2(x, $Number$2);
		py = ToPrimitive$2(y, $Number$2);
	} else {
		py = ToPrimitive$2(y, $Number$2);
		px = ToPrimitive$2(x, $Number$2);
	}
	var bothStrings = Type$1K(px) === 'String' && Type$1K(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber$b(px);
		var ny = ToNumber$b(py);
		if ($isNaN$9(nx) || $isNaN$9(ny)) {
			return undefined;
		}
		if ($isFinite$7(nx) && $isFinite$7(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf$1(py, px)) {
		return false;
	}
	if (isPrefixOf$1(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

var Type$1J = Type$1M;

// https://262.ecma-international.org/5.1/#sec-11.9.6

var StrictEqualityComparison = function StrictEqualityComparison(x, y) {
	var xType = Type$1J(x);
	var yType = Type$1J(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

var GetIntrinsic$22 = require$$0;

var $abs = GetIntrinsic$22('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$4 = function abs(x) {
	return $abs(x);
};

var GetIntrinsic$21 = require$$0;

var $Array$1 = GetIntrinsic$21('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array$1.isArray && require$$1('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray$d = $Array$1.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

var GetIntrinsic$20 = require$$0;
var callBound$k = require$$1;

var $TypeError$1N = GetIntrinsic$20('%TypeError%');

var IsArray$c = IsArray$d;

var $apply = GetIntrinsic$20('%Reflect.apply%', true) || callBound$k('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

var Call$7 = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$c(argumentsList)) {
		throw new $TypeError$1N('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$i = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

var GetIntrinsic$1$ = require$$0;

var $TypeError$1M = GetIntrinsic$1$('%TypeError%');

var inspect$3 = require$$1$4;

var IsPropertyKey$h = IsPropertyKey$i;
var Type$1I = Type$1M;

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get$d = function Get(O, P) {
	// 7.3.1.1
	if (Type$1I(O) !== 'Object') {
		throw new $TypeError$1M('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey$h(P)) {
		throw new $TypeError$1M('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect$3(P));
	}
	// 7.3.1.3
	return O[P];
};

var GetIntrinsic$1_ = require$$0;

var $TypeError$1L = GetIntrinsic$1_('%TypeError%');
var $fromCharCode$1 = GetIntrinsic$1_('%String.fromCharCode%');

var isLeadingSurrogate$2 = isLeadingSurrogate$d;
var isTrailingSurrogate$2 = isTrailingSurrogate$d;

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

var UTF16DecodeSurrogatePair$1 = function UTF16DecodeSurrogatePair(lead, trail) {
	if (!isLeadingSurrogate$2(lead) || !isTrailingSurrogate$2(trail)) {
		throw new $TypeError$1L('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode$1(lead) + $fromCharCode$1(trail);
};

var GetIntrinsic$1Z = require$$0;

var $TypeError$1K = GetIntrinsic$1Z('%TypeError%');
var callBound$j = require$$1;
var isLeadingSurrogate$1 = isLeadingSurrogate$d;
var isTrailingSurrogate$1 = isTrailingSurrogate$d;

var Type$1H = Type$1M;
var UTF16DecodeSurrogatePair = UTF16DecodeSurrogatePair$1;

var $charAt$3 = callBound$j('String.prototype.charAt');
var $charCodeAt$2 = callBound$j('String.prototype.charCodeAt');

// https://262.ecma-international.org/11.0/#sec-codepointat

var CodePointAt$2 = function CodePointAt(string, position) {
	if (Type$1H(string) !== 'String') {
		throw new $TypeError$1K('Assertion failed: `string` must be a String');
	}
	var size = string.length;
	if (position < 0 || position >= size) {
		throw new $TypeError$1K('Assertion failed: `position` must be >= 0, and < the length of `string`');
	}
	var first = $charCodeAt$2(string, position);
	var cp = $charAt$3(string, position);
	var firstIsLeading = isLeadingSurrogate$1(first);
	var firstIsTrailing = isTrailingSurrogate$1(first);
	if (!firstIsLeading && !firstIsTrailing) {
		return {
			'[[CodePoint]]': cp,
			'[[CodeUnitCount]]': 1,
			'[[IsUnpairedSurrogate]]': false
		};
	}
	if (firstIsTrailing || (position + 1 === size)) {
		return {
			'[[CodePoint]]': cp,
			'[[CodeUnitCount]]': 1,
			'[[IsUnpairedSurrogate]]': true
		};
	}
	var second = $charCodeAt$2(string, position + 1);
	if (!isTrailingSurrogate$1(second)) {
		return {
			'[[CodePoint]]': cp,
			'[[CodeUnitCount]]': 1,
			'[[IsUnpairedSurrogate]]': true
		};
	}

	return {
		'[[CodePoint]]': UTF16DecodeSurrogatePair(first, second),
		'[[CodeUnitCount]]': 2,
		'[[IsUnpairedSurrogate]]': false
	};
};

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

var floor$b = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

var abs$3 = abs$4;
var floor$a = floor$b;

var $isNaN$8 = _isNaN;
var $isFinite$6 = _isFinite;

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger$9 = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN$8(argument) || !$isFinite$6(argument)) {
		return false;
	}
	var absValue = abs$3(argument);
	return floor$a(absValue) === absValue;
};

var GetIntrinsic$1Y = require$$0;

var CodePointAt$1 = CodePointAt$2;
var IsInteger$8 = IsInteger$9;
var Type$1G = Type$1M;

var MAX_SAFE_INTEGER$2 = maxSafeInteger;

var $TypeError$1J = GetIntrinsic$1Y('%TypeError%');

// https://262.ecma-international.org/6.0/#sec-advancestringindex

var AdvanceStringIndex$1 = function AdvanceStringIndex(S, index, unicode) {
	if (Type$1G(S) !== 'String') {
		throw new $TypeError$1J('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$8(index) || index < 0 || index > MAX_SAFE_INTEGER$2) {
		throw new $TypeError$1J('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$1G(unicode) !== 'Boolean') {
		throw new $TypeError$1J('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}
	var cp = CodePointAt$1(S, index);
	return index + cp['[[CodeUnitCount]]'];
};

var RequireObjectCoercible$3 = {exports: {}};

(function (module) {

	module.exports = CheckObjectCoercible$1;
} (RequireObjectCoercible$3));

var GetIntrinsic$1X = require$$0;

var $Object$2 = GetIntrinsic$1X('%Object%');

var RequireObjectCoercible$2 = RequireObjectCoercible$3.exports;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$3 = function ToObject(value) {
	RequireObjectCoercible$2(value);
	return $Object$2(value);
};

var GetIntrinsic$1W = require$$0;

var $TypeError$1I = GetIntrinsic$1W('%TypeError%');

var IsPropertyKey$g = IsPropertyKey$i;
var ToObject$2 = ToObject$3;

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV$2 = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey$g(P)) {
		throw new $TypeError$1I('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject$2(V);

	// 7.3.2.4
	return O[P];
};

var IsCallable$7 = {exports: {}};

(function (module) {

	// http://262.ecma-international.org/5.1/#sec-9.11

	module.exports = require$$0$3;
} (IsCallable$7));

var GetIntrinsic$1V = require$$0;

var $TypeError$1H = GetIntrinsic$1V('%TypeError%');

var GetV$1 = GetV$2;
var IsCallable$6 = IsCallable$7.exports;
var IsPropertyKey$f = IsPropertyKey$i;

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$3 = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey$f(P)) {
		throw new $TypeError$1H('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV$1(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable$6(func)) {
		throw new $TypeError$1H(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var GetIntrinsic$1U = require$$0;

var $TypeError$1G = GetIntrinsic$1U('%TypeError%');
var $asyncIterator = GetIntrinsic$1U('%Symbol.asyncIterator%', true);

var inspect$2 = require$$1$4;
var hasSymbols$1 = require$$1$6();

var getIteratorMethod = requireGetIteratorMethod();
var AdvanceStringIndex = AdvanceStringIndex$1;
var Call$6 = Call$7;
var GetMethod$2 = GetMethod$3;
var IsArray$b = IsArray$d;
var Type$1F = Type$1M;

// https://262.ecma-international.org/9.0/#sec-getiterator
var GetIterator$2 = function GetIterator(obj, hint, method) {
	var actualHint = hint;
	if (arguments.length < 2) {
		actualHint = 'sync';
	}
	if (actualHint !== 'sync' && actualHint !== 'async') {
		throw new $TypeError$1G("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect$2(hint));
	}

	var actualMethod = method;
	if (arguments.length < 3) {
		if (actualHint === 'async') {
			if (hasSymbols$1 && $asyncIterator) {
				actualMethod = GetMethod$2(obj, $asyncIterator);
			}
			if (actualMethod === undefined) {
				throw new $TypeError$1G("async from sync iterators aren't currently supported");
			}
		} else {
			actualMethod = getIteratorMethod(
				{
					AdvanceStringIndex: AdvanceStringIndex,
					GetMethod: GetMethod$2,
					IsArray: IsArray$b,
					Type: Type$1F
				},
				obj
			);
		}
	}
	var iterator = Call$6(actualMethod, obj);
	if (Type$1F(iterator) !== 'Object') {
		throw new $TypeError$1G('iterator must return an object');
	}

	return iterator;

	// TODO: This should return an IteratorRecord
	/*
	var nextMethod = GetV(iterator, 'next');
	return {
		'[[Iterator]]': iterator,
		'[[NextMethod]]': nextMethod,
		'[[Done]]': false
	};
	*/
};

var GetIntrinsic$1T = require$$0;

var $TypeError$1F = GetIntrinsic$1T('%TypeError%');

var Call$5 = Call$7;
var GetMethod$1 = GetMethod$3;
var IsCallable$5 = IsCallable$7.exports;
var Type$1E = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose$1 = function IteratorClose(iterator, completion) {
	if (Type$1E(iterator) !== 'Object') {
		throw new $TypeError$1F('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable$5(completion)) {
		throw new $TypeError$1F('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$1(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call$5(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$1E(innerResult) !== 'Object') {
		throw new $TypeError$1F('iterator .return must return an object');
	}

	return completionRecord;
};

// http://262.ecma-international.org/5.1/#sec-9.2

var ToBoolean$5 = function ToBoolean(value) { return !!value; };

var GetIntrinsic$1S = require$$0;

var $TypeError$1E = GetIntrinsic$1S('%TypeError%');

var Get$c = Get$d;
var ToBoolean$4 = ToBoolean$5;
var Type$1D = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete$1 = function IteratorComplete(iterResult) {
	if (Type$1D(iterResult) !== 'Object') {
		throw new $TypeError$1E('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean$4(Get$c(iterResult, 'done'));
};

var GetIntrinsic$1R = require$$0;

var $TypeError$1D = GetIntrinsic$1R('%TypeError%');

var Call$4 = Call$7;
var IsArray$a = IsArray$d;
var GetV = GetV$2;
var IsPropertyKey$e = IsPropertyKey$i;

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke$1 = function Invoke(O, P) {
	if (!IsPropertyKey$e(P)) {
		throw new $TypeError$1D('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray$a(argumentsList)) {
		throw new $TypeError$1D('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call$4(func, O, argumentsList);
};

var GetIntrinsic$1Q = require$$0;

var $TypeError$1C = GetIntrinsic$1Q('%TypeError%');

var Invoke = Invoke$1;
var Type$1C = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext$1 = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$1C(result) !== 'Object') {
		throw new $TypeError$1C('iterator next must return an object');
	}
	return result;
};

var IteratorComplete = IteratorComplete$1;
var IteratorNext = IteratorNext$1;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep$2 = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};

var GetIntrinsic$1P = require$$0;

var $TypeError$1B = GetIntrinsic$1P('%TypeError%');

var Get$b = Get$d;
var Type$1B = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue$2 = function IteratorValue(iterResult) {
	if (Type$1B(iterResult) !== 'Object') {
		throw new $TypeError$1B('Assertion failed: Type(iterResult) is not Object');
	}
	return Get$b(iterResult, 'value');
};

var inspect$1 = require$$1$4;

var GetIntrinsic$1O = require$$0;

var $TypeError$1A = GetIntrinsic$1O('%TypeError%');

var Call$3 = Call$7;
var Get$a = Get$d;
var GetIterator$1 = GetIterator$2;
var IsCallable$4 = IsCallable$7.exports;
var IteratorClose = IteratorClose$1;
var IteratorStep$1 = IteratorStep$2;
var IteratorValue$1 = IteratorValue$2;
var Type$1A = Type$1M;

// https://262.ecma-international.org/10.0//#sec-add-entries-from-iterable

var AddEntriesFromIterable = function AddEntriesFromIterable(target, iterable, adder) {
	if (!IsCallable$4(adder)) {
		throw new $TypeError$1A('Assertion failed: `adder` is not callable');
	}
	if (iterable == null) {
		throw new $TypeError$1A('Assertion failed: `iterable` is present, and not nullish');
	}
	var iteratorRecord = GetIterator$1(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = IteratorStep$1(iteratorRecord);
		if (!next) {
			return target;
		}
		var nextItem = IteratorValue$1(next);
		if (Type$1A(nextItem) !== 'Object') {
			var error = new $TypeError$1A('iterator next must return an Object, got ' + inspect$1(nextItem));
			return IteratorClose(
				iteratorRecord,
				function () { throw error; } // eslint-disable-line no-loop-func
			);
		}
		try {
			var k = Get$a(nextItem, '0');
			var v = Get$a(nextItem, '1');
			Call$3(adder, target, [k, v]);
		} catch (e) {
			return IteratorClose(
				iteratorRecord,
				function () { throw e; }
			);
		}
	}
};

var GetIntrinsic$1N = require$$0;

var $ArrayPrototype = GetIntrinsic$1N('%Array.prototype%');
var $RangeError$6 = GetIntrinsic$1N('%RangeError%');
var $SyntaxError$4 = GetIntrinsic$1N('%SyntaxError%');
var $TypeError$1z = GetIntrinsic$1N('%TypeError%');

var IsInteger$7 = IsInteger$9;

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto$1 = GetIntrinsic$1N('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate = function ArrayCreate(length) {
	if (!IsInteger$7(length) || length < 0) {
		throw new $TypeError$1z('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError$6('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto$1) {
			throw new $SyntaxError$4('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto$1(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var has$7 = require$$0$1;

var assertRecord$4 = assertRecord$y;

var Type$1z = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor$6 = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$4(Type$1z, 'Property Descriptor', 'Desc', Desc);

	if (!has$7(Desc, '[[Get]]') && !has$7(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

var has$6 = require$$0$1;

var assertRecord$3 = assertRecord$y;

var Type$1y = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor$9 = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$3(Type$1y, 'Property Descriptor', 'Desc', Desc);

	if (!has$6(Desc, '[[Value]]') && !has$6(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var GetIntrinsic$1M = require$$0;

var $Object$1 = GetIntrinsic$1M('%Object%');

var isPrimitive$1 = requireIsPrimitive();

var $preventExtensions$1 = $Object$1.preventExtensions;
var $isExtensible = $Object$1.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible$5 = $preventExtensions$1
	? function IsExtensible(obj) {
		return !isPrimitive$1(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive$1(obj);
	};

var has$5 = require$$0$1;

var GetIntrinsic$1L = require$$0;

var $TypeError$1y = GetIntrinsic$1L('%TypeError%');

var Type$1x = Type$1M;
var ToBoolean$3 = ToBoolean$5;
var IsCallable$3 = IsCallable$7.exports;

// https://262.ecma-international.org/5.1/#sec-8.10.5

var ToPropertyDescriptor$5 = function ToPropertyDescriptor(Obj) {
	if (Type$1x(Obj) !== 'Object') {
		throw new $TypeError$1y('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has$5(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean$3(Obj.enumerable);
	}
	if (has$5(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean$3(Obj.configurable);
	}
	if (has$5(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has$5(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean$3(Obj.writable);
	}
	if (has$5(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable$3(getter)) {
			throw new $TypeError$1y('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has$5(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable$3(setter)) {
			throw new $TypeError$1y('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has$5(desc, '[[Get]]') || has$5(desc, '[[Set]]')) && (has$5(desc, '[[Value]]') || has$5(desc, '[[Writable]]'))) {
		throw new $TypeError$1y('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

var $isNaN$7 = _isNaN;

// http://262.ecma-international.org/5.1/#sec-9.12

var SameValue$a = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN$7(x) && $isNaN$7(y);
};

var assertRecord$2 = assertRecord$y;

var Type$1w = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor$4 = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord$2(Type$1w, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

var assertRecord$1 = assertRecord$y;

var IsAccessorDescriptor$5 = IsAccessorDescriptor$6;
var IsDataDescriptor$8 = IsDataDescriptor$9;
var Type$1v = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor$2 = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord$1(Type$1v, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor$5(Desc) && !IsDataDescriptor$8(Desc)) {
		return true;
	}

	return false;
};

var GetIntrinsic$1K = require$$0;

var $TypeError$1x = GetIntrinsic$1K('%TypeError%');

var DefineOwnProperty$3 = requireDefineOwnProperty();
var isPropertyDescriptor$3 = isPropertyDescriptor$s;
var isSamePropertyDescriptor = requireIsSamePropertyDescriptor();

var FromPropertyDescriptor$3 = FromPropertyDescriptor$4;
var IsAccessorDescriptor$4 = IsAccessorDescriptor$6;
var IsDataDescriptor$7 = IsDataDescriptor$9;
var IsGenericDescriptor$1 = IsGenericDescriptor$2;
var IsPropertyKey$d = IsPropertyKey$i;
var SameValue$9 = SameValue$a;
var Type$1u = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor$1 = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$1u(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$1x('Assertion failed: O must be undefined or an Object');
	}
	if (Type$1u(extensible) !== 'Boolean') {
		throw new $TypeError$1x('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor$3({
		Type: Type$1u,
		IsDataDescriptor: IsDataDescriptor$7,
		IsAccessorDescriptor: IsAccessorDescriptor$4
	}, Desc)) {
		throw new $TypeError$1x('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$1u(current) !== 'Undefined' && !isPropertyDescriptor$3({
		Type: Type$1u,
		IsDataDescriptor: IsDataDescriptor$7,
		IsAccessorDescriptor: IsAccessorDescriptor$4
	}, current)) {
		throw new $TypeError$1x('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey$d(P)) {
		throw new $TypeError$1x('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$1u(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor$1(Desc) || IsDataDescriptor$7(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$3(
					IsDataDescriptor$7,
					SameValue$9,
					FromPropertyDescriptor$3,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor$4(Desc)) {
				throw new $TypeError$1x('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty$3(
					IsDataDescriptor$7,
					SameValue$9,
					FromPropertyDescriptor$3,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor$1(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue$9 }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor$1(Desc)) ; else if (IsDataDescriptor$7(current) !== IsDataDescriptor$7(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor$7(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty$3(
					IsDataDescriptor$7,
					SameValue$9,
					FromPropertyDescriptor$3,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty$3(
				IsDataDescriptor$7,
				SameValue$9,
				FromPropertyDescriptor$3,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor$7(current) && IsDataDescriptor$7(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue$9(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor$4(current) && IsAccessorDescriptor$4(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue$9(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue$9(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$1x('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty$3(
			IsDataDescriptor$7,
			SameValue$9,
			FromPropertyDescriptor$3,
			O,
			P,
			Desc
		);
	}
	return true;
};

var GetIntrinsic$1J = require$$0;

var $gOPD$3 = getOwnPropertyDescriptor;
var $SyntaxError$3 = GetIntrinsic$1J('%SyntaxError%');
var $TypeError$1w = GetIntrinsic$1J('%TypeError%');

var isPropertyDescriptor$2 = isPropertyDescriptor$s;

var IsAccessorDescriptor$3 = IsAccessorDescriptor$6;
var IsDataDescriptor$6 = IsDataDescriptor$9;
var IsExtensible$4 = IsExtensible$5;
var IsPropertyKey$c = IsPropertyKey$i;
var ToPropertyDescriptor$4 = ToPropertyDescriptor$5;
var SameValue$8 = SameValue$a;
var Type$1t = Type$1M;
var ValidateAndApplyPropertyDescriptor = ValidateAndApplyPropertyDescriptor$1;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty$1 = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$1t(O) !== 'Object') {
		throw new $TypeError$1w('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$c(P)) {
		throw new $TypeError$1w('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor$2({
		Type: Type$1t,
		IsDataDescriptor: IsDataDescriptor$6,
		IsAccessorDescriptor: IsAccessorDescriptor$3
	}, Desc)) {
		throw new $TypeError$1w('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD$3) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor$3(Desc)) {
			throw new $SyntaxError$3('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue$8(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$3('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD$3(O, P);
	var current = desc && ToPropertyDescriptor$4(desc);
	var extensible = IsExtensible$4(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

var GetIntrinsic$1I = require$$0;

var $match = GetIntrinsic$1I('%Symbol.match%', true);

var hasRegExpMatcher = require$$1$2;

var ToBoolean$2 = ToBoolean$5;

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp$1 = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean$2(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

var GetIntrinsic$1H = require$$0;

var $gOPD$2 = getOwnPropertyDescriptor;
var $TypeError$1v = GetIntrinsic$1H('%TypeError%');

var callBound$i = require$$1;

var $isEnumerable$2 = callBound$i('Object.prototype.propertyIsEnumerable');

var has$4 = require$$0$1;

var IsArray$9 = IsArray$d;
var IsPropertyKey$b = IsPropertyKey$i;
var IsRegExp = IsRegExp$1;
var ToPropertyDescriptor$3 = ToPropertyDescriptor$5;
var Type$1s = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty$2 = function OrdinaryGetOwnProperty(O, P) {
	if (Type$1s(O) !== 'Object') {
		throw new $TypeError$1v('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey$b(P)) {
		throw new $TypeError$1v('Assertion failed: P must be a Property Key');
	}
	if (!has$4(O, P)) {
		return void 0;
	}
	if (!$gOPD$2) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray$9(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$2(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor$3($gOPD$2(O, P));
};

var GetIntrinsic$1G = require$$0;

var $String$3 = GetIntrinsic$1G('%String%');
var $TypeError$1u = GetIntrinsic$1G('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$a = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$1u('Cannot convert a Symbol value to a string');
	}
	return $String$3(argument);
};

var ToNumber$a = ToNumber$d;

// http://262.ecma-international.org/5.1/#sec-9.6

var ToUint32$5 = function ToUint32(x) {
	return ToNumber$a(x) >>> 0;
};

var GetIntrinsic$1F = require$$0;

var $RangeError$5 = GetIntrinsic$1F('%RangeError%');
var $TypeError$1t = GetIntrinsic$1F('%TypeError%');

var assign$1 = require$$1$3;

var isPropertyDescriptor$1 = isPropertyDescriptor$s;

var IsArray$8 = IsArray$d;
var IsAccessorDescriptor$2 = IsAccessorDescriptor$6;
var IsDataDescriptor$5 = IsDataDescriptor$9;
var OrdinaryDefineOwnProperty = OrdinaryDefineOwnProperty$1;
var OrdinaryGetOwnProperty$1 = OrdinaryGetOwnProperty$2;
var ToNumber$9 = ToNumber$d;
var ToString$9 = ToString$a;
var ToUint32$4 = ToUint32$5;
var Type$1r = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength = function ArraySetLength(A, Desc) {
	if (!IsArray$8(A)) {
		throw new $TypeError$1t('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor$1({
		Type: Type$1r,
		IsDataDescriptor: IsDataDescriptor$5,
		IsAccessorDescriptor: IsAccessorDescriptor$2
	}, Desc)) {
		throw new $TypeError$1t('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign$1({}, Desc);
	var newLen = ToUint32$4(Desc['[[Value]]']);
	var numberLen = ToNumber$9(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$5('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty$1(A, 'length');
	if (!IsDataDescriptor$5(oldLenDesc)) {
		throw new $TypeError$1t('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString$9(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

var IsConstructor$3 = {exports: {}};

var GetIntrinsic$1E = require$$0;

var $TypeError$1s = GetIntrinsic$1E('%TypeError%');

var isPropertyDescriptor = isPropertyDescriptor$s;
var DefineOwnProperty$2 = requireDefineOwnProperty();

var FromPropertyDescriptor$2 = FromPropertyDescriptor$4;
var IsAccessorDescriptor$1 = IsAccessorDescriptor$6;
var IsDataDescriptor$4 = IsDataDescriptor$9;
var IsPropertyKey$a = IsPropertyKey$i;
var SameValue$7 = SameValue$a;
var ToPropertyDescriptor$2 = ToPropertyDescriptor$5;
var Type$1q = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow$5 = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$1q(O) !== 'Object') {
		throw new $TypeError$1s('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$a(P)) {
		throw new $TypeError$1s('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type$1q,
		IsDataDescriptor: IsDataDescriptor$4,
		IsAccessorDescriptor: IsAccessorDescriptor$1
	}, desc) ? desc : ToPropertyDescriptor$2(desc);
	if (!isPropertyDescriptor({
		Type: Type$1q,
		IsDataDescriptor: IsDataDescriptor$4,
		IsAccessorDescriptor: IsAccessorDescriptor$1
	}, Desc)) {
		throw new $TypeError$1s('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty$2(
		IsDataDescriptor$4,
		SameValue$7,
		FromPropertyDescriptor$2,
		O,
		P,
		Desc
	);
};

var GetIntrinsic$1D = GetIntrinsic$7K.exports;

var $construct = GetIntrinsic$1D('%Reflect.construct%', true);

var DefinePropertyOrThrow$4 = DefinePropertyOrThrow$5;
try {
	DefinePropertyOrThrow$4({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow$4 = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow$4 && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow$4(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	IsConstructor$3.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	IsConstructor$3.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

var GetIntrinsic$1C = require$$0;

var $Array = GetIntrinsic$1C('%Array%');
var $species$1 = GetIntrinsic$1C('%Symbol.species%', true);
var $TypeError$1r = GetIntrinsic$1C('%TypeError%');

var Get$9 = Get$d;
var IsArray$7 = IsArray$d;
var IsConstructor$2 = IsConstructor$3.exports;
var IsInteger$6 = IsInteger$9;
var Type$1p = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger$6(length) || length < 0) {
		throw new $TypeError$1r('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray$7(originalArray);
	if (isArray) {
		C = Get$9(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species$1 && Type$1p(C) === 'Object') {
			C = Get$9(C, $species$1);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor$2(C)) {
		throw new $TypeError$1r('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var GetIntrinsic$1B = require$$0;

var $TypeError$1q = GetIntrinsic$1B('%TypeError%');

var Type$1o = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-add

var add$3 = function BigIntAdd(x, y) {
	if (Type$1o(x) !== 'BigInt' || Type$1o(y) !== 'BigInt') {
		throw new $TypeError$1q('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x + y;
};

var GetIntrinsic$1A = require$$0;

var $TypeError$1p = GetIntrinsic$1A('%TypeError%');
// var $BigInt = GetIntrinsic('%BigInt%', true);
// var $pow = GetIntrinsic('%Math.pow%');

// var BinaryAnd = require('./BinaryAnd');
// var BinaryOr = require('./BinaryOr');
// var BinaryXor = require('./BinaryXor');
var Type$1n = Type$1M;
// var modulo = require('./modulo');

// var zero = $BigInt && $BigInt(0);
// var negOne = $BigInt && $BigInt(-1);
// var two = $BigInt && $BigInt(2);

// https://262.ecma-international.org/11.0/#sec-bigintbitwiseop

var BigIntBitwiseOp$3 = function BigIntBitwiseOp(op, x, y) {
	if (op !== '&' && op !== '|' && op !== '^') {
		throw new $TypeError$1p('Assertion failed: `op` must be `&`, `|`, or `^`');
	}
	if (Type$1n(x) !== 'BigInt' || Type$1n(y) !== 'BigInt') {
		throw new $TypeError$1p('`x` and `y` must be BigInts');
	}

	if (op === '&') {
		return x & y;
	}
	if (op === '|') {
		return x | y;
	}
	return x ^ y;
	/*
	var result = zero;
	var shift = 0;
	while (x !== zero && x !== negOne && y !== zero && y !== negOne) {
		var xDigit = modulo(x, two);
		var yDigit = modulo(y, two);
		if (op === '&') {
			result += $pow(2, shift) * BinaryAnd(xDigit, yDigit);
		} else if (op === '|') {
			result += $pow(2, shift) * BinaryOr(xDigit, yDigit);
		} else if (op === '^') {
			result += $pow(2, shift) * BinaryXor(xDigit, yDigit);
		}
		shift += 1;
		x = (x - xDigit) / two;
		y = (y - yDigit) / two;
	}
	var tmp;
	if (op === '&') {
		tmp = BinaryAnd(modulo(x, two), modulo(y, two));
	} else if (op === '|') {
		tmp = BinaryAnd(modulo(x, two), modulo(y, two));
	} else {
		tmp = BinaryXor(modulo(x, two), modulo(y, two));
	}
	if (tmp !== 0) {
		result -= $pow(2, shift);
	}
    return result;
    */
};

var GetIntrinsic$1z = require$$0;

var $TypeError$1o = GetIntrinsic$1z('%TypeError%');

var BigIntBitwiseOp$2 = BigIntBitwiseOp$3;
var Type$1m = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseAND

var bitwiseAND$3 = function BigIntBitwiseAND(x, y) {
	if (Type$1m(x) !== 'BigInt' || Type$1m(y) !== 'BigInt') {
		throw new $TypeError$1o('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	return BigIntBitwiseOp$2('&', x, y);
};

var GetIntrinsic$1y = require$$0;

var $BigInt$5 = GetIntrinsic$1y('%BigInt%', true);
var $TypeError$1n = GetIntrinsic$1y('%TypeError%');

var Type$1l = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseNOT

var bitwiseNOT$3 = function BigIntBitwiseNOT(x) {
	if (Type$1l(x) !== 'BigInt') {
		throw new $TypeError$1n('Assertion failed: `x` argument must be a BigInt');
	}
	return -x - $BigInt$5(1);
};

var GetIntrinsic$1x = require$$0;

var $TypeError$1m = GetIntrinsic$1x('%TypeError%');

var BigIntBitwiseOp$1 = BigIntBitwiseOp$3;
var Type$1k = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseOR

var bitwiseOR$3 = function BigIntBitwiseOR(x, y) {
	if (Type$1k(x) !== 'BigInt' || Type$1k(y) !== 'BigInt') {
		throw new $TypeError$1m('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	return BigIntBitwiseOp$1('|', x, y);
};

var GetIntrinsic$1w = require$$0;

var $TypeError$1l = GetIntrinsic$1w('%TypeError%');

var BigIntBitwiseOp = BigIntBitwiseOp$3;
var Type$1j = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseXOR

var bitwiseXOR$3 = function BigIntBitwiseXOR(x, y) {
	if (Type$1j(x) !== 'BigInt' || Type$1j(y) !== 'BigInt') {
		throw new $TypeError$1l('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	return BigIntBitwiseOp('^', x, y);
};

var GetIntrinsic$1v = require$$0;

var $BigInt$4 = GetIntrinsic$1v('%BigInt%', true);
var $RangeError$4 = GetIntrinsic$1v('%RangeError%');
var $TypeError$1k = GetIntrinsic$1v('%TypeError%');

var Type$1i = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-divide

var divide$3 = function BigIntDivide(x, y) {
	if (Type$1i(x) !== 'BigInt' || Type$1i(y) !== 'BigInt') {
		throw new $TypeError$1k('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	if (y === $BigInt$4(0)) {
		throw new $RangeError$4('Division by zero');
	}
	// shortcut for the actual spec mechanics
	return x / y;
};

var GetIntrinsic$1u = require$$0;

var $TypeError$1j = GetIntrinsic$1u('%TypeError%');

var Type$1h = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-equal

var equal$3 = function BigIntEqual(x, y) {
	if (Type$1h(x) !== 'BigInt' || Type$1h(y) !== 'BigInt') {
		throw new $TypeError$1j('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	// shortcut for the actual spec mechanics
	return x === y;
};

var GetIntrinsic$1t = require$$0;

var $BigInt$3 = GetIntrinsic$1t('%BigInt%', true);
var $RangeError$3 = GetIntrinsic$1t('%RangeError%');
var $TypeError$1i = GetIntrinsic$1t('%TypeError%');

var Type$1g = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-exponentiate

var exponentiate$3 = function BigIntExponentiate(base, exponent) {
	if (Type$1g(base) !== 'BigInt' || Type$1g(exponent) !== 'BigInt') {
		throw new $TypeError$1i('Assertion failed: `base` and `exponent` arguments must be BigInts');
	}
	if (exponent < $BigInt$3(0)) {
		throw new $RangeError$3('Exponent must be positive');
	}
	if (/* base === $BigInt(0) && */ exponent === $BigInt$3(0)) {
		return $BigInt$3(1);
	}

	var square = base;
	var remaining = exponent;
	while (remaining > $BigInt$3(0)) {
		square += exponent;
		--remaining; // eslint-disable-line no-plusplus
	}
	return square;
};

var GetIntrinsic$1s = require$$0;

var $TypeError$1h = GetIntrinsic$1s('%TypeError%');

var Type$1f = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-leftShift

var leftShift$3 = function BigIntLeftShift(x, y) {
	if (Type$1f(x) !== 'BigInt' || Type$1f(y) !== 'BigInt') {
		throw new $TypeError$1h('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x << y;
};

var GetIntrinsic$1r = require$$0;

var $TypeError$1g = GetIntrinsic$1r('%TypeError%');

var Type$1e = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-lessThan

var lessThan$3 = function BigIntLessThan(x, y) {
	if (Type$1e(x) !== 'BigInt' || Type$1e(y) !== 'BigInt') {
		throw new $TypeError$1g('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x < y;
};

var GetIntrinsic$1q = require$$0;

var $TypeError$1f = GetIntrinsic$1q('%TypeError%');

var Type$1d = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-multiply

var multiply$3 = function BigIntMultiply(x, y) {
	if (Type$1d(x) !== 'BigInt' || Type$1d(y) !== 'BigInt') {
		throw new $TypeError$1f('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x * y;
};

var GetIntrinsic$1p = require$$0;

var $BigInt$2 = GetIntrinsic$1p('%BigInt%', true);
var $RangeError$2 = GetIntrinsic$1p('%RangeError%');
var $TypeError$1e = GetIntrinsic$1p('%TypeError%');

var Type$1c = Type$1M;

var zero$1 = $BigInt$2 && $BigInt$2(0);

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-remainder

var remainder$3 = function BigIntRemainder(n, d) {
	if (Type$1c(n) !== 'BigInt' || Type$1c(d) !== 'BigInt') {
		throw new $TypeError$1e('Assertion failed: `n` and `d` arguments must be BigInts');
	}

	if (d === zero$1) {
		throw new $RangeError$2('Division by zero');
	}

	if (n === zero$1) {
		return zero$1;
	}

	// shortcut for the actual spec mechanics
	return n % d;
};

var GetIntrinsic$1o = require$$0;

var $TypeError$1d = GetIntrinsic$1o('%TypeError%');

var Type$1b = Type$1M;
var BigIntEqual$1 = equal$3;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-sameValue

var sameValue$3 = function BigIntSameValue(x, y) {
	if (Type$1b(x) !== 'BigInt' || Type$1b(y) !== 'BigInt') {
		throw new $TypeError$1d('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	return BigIntEqual$1(x, y);
};

var GetIntrinsic$1n = require$$0;

var $TypeError$1c = GetIntrinsic$1n('%TypeError%');

var Type$1a = Type$1M;
var BigIntEqual = equal$3;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-sameValueZero

var sameValueZero$3 = function BigIntSameValueZero(x, y) {
	if (Type$1a(x) !== 'BigInt' || Type$1a(y) !== 'BigInt') {
		throw new $TypeError$1c('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	return BigIntEqual(x, y);
};

var GetIntrinsic$1m = require$$0;

var $TypeError$1b = GetIntrinsic$1m('%TypeError%');

var Type$19 = Type$1M;
var BigIntLeftShift = leftShift$3;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-signedRightShift

var signedRightShift$3 = function BigIntSignedRightShift(x, y) {
	if (Type$19(x) !== 'BigInt' || Type$19(y) !== 'BigInt') {
		throw new $TypeError$1b('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	return BigIntLeftShift(x, -y);
};

var GetIntrinsic$1l = require$$0;

var $TypeError$1a = GetIntrinsic$1l('%TypeError%');

var Type$18 = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-subtract

var subtract$3 = function BigIntSubtract(x, y) {
	if (Type$18(x) !== 'BigInt' || Type$18(y) !== 'BigInt') {
		throw new $TypeError$1a('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x - y;
};

var GetIntrinsic$1k = require$$0;

var $String$2 = GetIntrinsic$1k('%String%');
var $TypeError$19 = GetIntrinsic$1k('%TypeError%');

var Type$17 = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-tostring

var toString$3 = function BigIntToString(x) {
	if (Type$17(x) !== 'BigInt') {
		throw new $TypeError$19('Assertion failed: `x` must be a BigInt');
	}

	return $String$2(x);
};

var GetIntrinsic$1j = require$$0;

var $BigInt$1 = GetIntrinsic$1j('%BigInt%', true);
var $TypeError$18 = GetIntrinsic$1j('%TypeError%');

var Type$16 = Type$1M;

var zero = $BigInt$1 && $BigInt$1(0);

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-unaryMinus

var unaryMinus$3 = function BigIntUnaryMinus(x) {
	if (Type$16(x) !== 'BigInt') {
		throw new $TypeError$18('Assertion failed: `x` argument must be a BigInt');
	}

	if (x === zero) {
		return zero;
	}

	return -x;
};

var GetIntrinsic$1i = require$$0;

var $TypeError$17 = GetIntrinsic$1i('%TypeError%');

var Type$15 = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-unsignedRightShift

var unsignedRightShift$3 = function BigIntUnsignedRightShift(x, y) {
	if (Type$15(x) !== 'BigInt' || Type$15(y) !== 'BigInt') {
		throw new $TypeError$17('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	throw new $TypeError$17('BigInts have no unsigned right shift, use >> instead');
};

var add$2 = add$3;
var bitwiseAND$2 = bitwiseAND$3;
var bitwiseNOT$2 = bitwiseNOT$3;
var bitwiseOR$2 = bitwiseOR$3;
var bitwiseXOR$2 = bitwiseXOR$3;
var divide$2 = divide$3;
var equal$2 = equal$3;
var exponentiate$2 = exponentiate$3;
var leftShift$2 = leftShift$3;
var lessThan$2 = lessThan$3;
var multiply$2 = multiply$3;
var remainder$2 = remainder$3;
var sameValue$2 = sameValue$3;
var sameValueZero$2 = sameValueZero$3;
var signedRightShift$2 = signedRightShift$3;
var subtract$2 = subtract$3;
var toString$2 = toString$3;
var unaryMinus$2 = unaryMinus$3;
var unsignedRightShift$2 = unsignedRightShift$3;

var BigInt = {
	add: add$2,
	bitwiseAND: bitwiseAND$2,
	bitwiseNOT: bitwiseNOT$2,
	bitwiseOR: bitwiseOR$2,
	bitwiseXOR: bitwiseXOR$2,
	divide: divide$2,
	equal: equal$2,
	exponentiate: exponentiate$2,
	leftShift: leftShift$2,
	lessThan: lessThan$2,
	multiply: multiply$2,
	remainder: remainder$2,
	sameValue: sameValue$2,
	sameValueZero: sameValueZero$2,
	signedRightShift: signedRightShift$2,
	subtract: subtract$2,
	toString: toString$2,
	unaryMinus: unaryMinus$2,
	unsignedRightShift: unsignedRightShift$2
};

var GetIntrinsic$1h = require$$0;

var $TypeError$16 = GetIntrinsic$1h('%TypeError%');

// https://262.ecma-international.org/11.0/#sec-binaryand

var BinaryAnd = function BinaryAnd(x, y) {
	if ((x !== 0 && x !== 1) || (y !== 0 && y !== 1)) {
		throw new $TypeError$16('Assertion failed: `x` and `y` must be either 0 or 1');
	}
	return x & y;
};

var GetIntrinsic$1g = require$$0;

var $TypeError$15 = GetIntrinsic$1g('%TypeError%');

// https://262.ecma-international.org/11.0/#sec-binaryor

var BinaryOr = function BinaryOr(x, y) {
	if ((x !== 0 && x !== 1) || (y !== 0 && y !== 1)) {
		throw new $TypeError$15('Assertion failed: `x` and `y` must be either 0 or 1');
	}
	return x | y;
};

var GetIntrinsic$1f = require$$0;

var $TypeError$14 = GetIntrinsic$1f('%TypeError%');

// https://262.ecma-international.org/11.0/#sec-binaryxor

var BinaryXor = function BinaryXor(x, y) {
	if ((x !== 0 && x !== 1) || (y !== 0 && y !== 1)) {
		throw new $TypeError$14('Assertion failed: `x` and `y` must be either 0 or 1');
	}
	return x ^ y;
};

var GetIntrinsic$1e = require$$0;

var $TypeError$13 = GetIntrinsic$1e('%TypeError%');

var SameValue$6 = SameValue$a;
var ToNumber$8 = ToNumber$d;
var ToString$8 = ToString$a;
var Type$14 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString$1 = function CanonicalNumericIndexString(argument) {
	if (Type$14(argument) !== 'String') {
		throw new $TypeError$13('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber$8(argument);
	if (SameValue$6(ToString$8(n), argument)) { return n; }
	return void 0;
};

var has$3 = require$$0$1;

var assertRecord = assertRecord$y;

var IsDataDescriptor$3 = IsDataDescriptor$9;
var IsGenericDescriptor = IsGenericDescriptor$2;
var Type$13 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type$13, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor$3(Desc)) {
		if (!has$3(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has$3(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has$3(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has$3(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has$3(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has$3(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var GetIntrinsic$1d = require$$0;

var $TypeError$12 = GetIntrinsic$1d('%TypeError%');

var DefineOwnProperty$1 = requireDefineOwnProperty();

var FromPropertyDescriptor$1 = FromPropertyDescriptor$4;
var OrdinaryGetOwnProperty = OrdinaryGetOwnProperty$2;
var IsDataDescriptor$2 = IsDataDescriptor$9;
var IsExtensible$3 = IsExtensible$5;
var IsPropertyKey$9 = IsPropertyKey$i;
var SameValue$5 = SameValue$a;
var Type$12 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty$1 = function CreateDataProperty(O, P, V) {
	if (Type$12(O) !== 'Object') {
		throw new $TypeError$12('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$9(P)) {
		throw new $TypeError$12('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible$3(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty$1(
		IsDataDescriptor$2,
		SameValue$5,
		FromPropertyDescriptor$1,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var GetIntrinsic$1c = require$$0;

var $TypeError$11 = GetIntrinsic$1c('%TypeError%');

var CreateDataProperty = CreateDataProperty$1;
var IsPropertyKey$8 = IsPropertyKey$i;
var Type$11 = Type$1M;

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$2 = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$11(O) !== 'Object') {
		throw new $TypeError$11('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$8(P)) {
		throw new $TypeError$11('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError$11('unable to create data property');
	}
	return success;
};

var GetIntrinsic$1b = require$$0;

var $TypeError$10 = GetIntrinsic$1b('%TypeError%');

var callBound$h = require$$1;
var forEach$3 = requireForEach();
var every$2 = requireEvery();
var OwnPropertyKeys = requireOwnPropertyKeys();

var $isEnumerable$1 = callBound$h('Object.prototype.propertyIsEnumerable');

var CreateDataPropertyOrThrow$1 = CreateDataPropertyOrThrow$2;
var Get$8 = Get$d;
var IsArray$6 = IsArray$d;
var IsInteger$5 = IsInteger$9;
var IsPropertyKey$7 = IsPropertyKey$i;
var SameValue$4 = SameValue$a;
var ToNumber$7 = ToNumber$d;
var ToObject$1 = ToObject$3;
var Type$10 = Type$1M;

// https://262.ecma-international.org/11.0/#sec-copydataproperties

var CopyDataProperties = function CopyDataProperties(target, source, excludedItems) {
	if (Type$10(target) !== 'Object') {
		throw new $TypeError$10('Assertion failed: "target" must be an Object');
	}

	if (!IsArray$6(excludedItems) || !every$2(excludedItems, IsPropertyKey$7)) {
		throw new $TypeError$10('Assertion failed: "excludedItems" must be a List of Property Keys');
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var from = ToObject$1(source);

	var sourceKeys = OwnPropertyKeys(from);
	forEach$3(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach$3(excludedItems, function (e) {
			if (SameValue$4(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable$1(from, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && IsInteger$5(ToNumber$7(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = Get$8(from, nextKey);
			CreateDataPropertyOrThrow$1(target, nextKey, propValue);
		}
	});

	return target;
};

var GetIntrinsic$1a = require$$0;

var $TypeError$$ = GetIntrinsic$1a('%TypeError%');

var callBound$g = require$$1;

var $replace = callBound$g('String.prototype.replace');

var RequireObjectCoercible$1 = RequireObjectCoercible$3.exports;
var ToString$7 = ToString$a;
var Type$$ = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML = function CreateHTML(string, tag, attribute, value) {
	if (Type$$(tag) !== 'String' || Type$$(attribute) !== 'String') {
		throw new $TypeError$$('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible$1(string);
	var S = ToString$7(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString$7(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var GetIntrinsic$19 = require$$0;

var $TypeError$_ = GetIntrinsic$19('%TypeError%');

var Type$_ = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject = function CreateIterResultObject(value, done) {
	if (Type$_(done) !== 'Boolean') {
		throw new $TypeError$_('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

var ES5ToInteger = ToInteger$u;

var ToNumber$6 = ToNumber$d;

// https://262.ecma-international.org/11.0/#sec-tointeger

var ToInteger$4 = function ToInteger(value) {
	var number = ToNumber$6(value);
	if (number !== 0) {
		number = ES5ToInteger(number);
	}
	return number === 0 ? 0 : number;
};

var MAX_SAFE_INTEGER$1 = maxSafeInteger;

var ToInteger$3 = ToInteger$4;

var ToLength$3 = function ToLength(argument) {
	var len = ToInteger$3(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER$1) { return MAX_SAFE_INTEGER$1; }
	return len;
};

var GetIntrinsic$18 = require$$0;

var $TypeError$Z = GetIntrinsic$18('%TypeError%');

var Get$7 = Get$d;
var ToLength$2 = ToLength$3;
var Type$Z = Type$1M;

// https://262.ecma-international.org/11.0/#sec-lengthofarraylike

var LengthOfArrayLike$2 = function LengthOfArrayLike(obj) {
	if (Type$Z(obj) !== 'Object') {
		throw new $TypeError$Z('Assertion failed: `obj` must be an Object');
	}
	return ToLength$2(Get$7(obj, 'length'));
};

var GetIntrinsic$17 = require$$0;

var callBound$f = require$$1;

var $TypeError$Y = GetIntrinsic$17('%TypeError%');
var $indexOf$1 = callBound$f('Array.prototype.indexOf', true) || callBound$f('String.prototype.indexOf');
var $push$1 = callBound$f('Array.prototype.push');

var Get$6 = Get$d;
var IsArray$5 = IsArray$d;
var LengthOfArrayLike$1 = LengthOfArrayLike$2;
var ToString$6 = ToString$a;
var Type$Y = Type$1M;

// https://262.ecma-international.org/11.0/#sec-createlistfromarraylike

var CreateListFromArrayLike = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$Y(obj) !== 'Object') {
		throw new $TypeError$Y('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray$5(elementTypes)) {
		throw new $TypeError$Y('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = LengthOfArrayLike$1(obj);
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString$6(index);
		var next = Get$6(obj, indexName);
		var nextType = Type$Y(next);
		if ($indexOf$1(elementTypes, nextType) < 0) {
			throw new $TypeError$Y('item type ' + nextType + ' is not a valid elementType');
		}
		$push$1(list, next);
		index += 1;
	}
	return list;
};

var GetIntrinsic$16 = require$$0;

var $TypeError$X = GetIntrinsic$16('%TypeError%');

var DefineOwnProperty = requireDefineOwnProperty();

var FromPropertyDescriptor = FromPropertyDescriptor$4;
var IsDataDescriptor$1 = IsDataDescriptor$9;
var IsPropertyKey$6 = IsPropertyKey$i;
var SameValue$3 = SameValue$a;
var Type$X = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty = function CreateMethodProperty(O, P, V) {
	if (Type$X(O) !== 'Object') {
		throw new $TypeError$X('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$6(P)) {
		throw new $TypeError$X('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor$1,
		SameValue$3,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

var floor$9 = floor$b;

var msPerDay$3 = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var Day$3 = function Day(t) {
	return floor$9(t / msPerDay$3);
};

var floor$8 = floor$b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DayFromYear$2 = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor$8((y - 1969) / 4) - floor$8((y - 1901) / 100) + floor$8((y - 1601) / 400);
};

var GetIntrinsic$15 = require$$0;

var $Date$2 = GetIntrinsic$15('%Date%');

var callBound$e = require$$1;

var $getUTCFullYear = callBound$e('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var YearFromTime$4 = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date$2(t));
};

var Day$2 = Day$3;
var DayFromYear$1 = DayFromYear$2;
var YearFromTime$3 = YearFromTime$4;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var DayWithinYear$2 = function DayWithinYear(t) {
	return Day$2(t) - DayFromYear$1(YearFromTime$3(t));
};

var mod = mod$7;

// https://262.ecma-international.org/5.1/#sec-5.2

var modulo$b = function modulo(x, y) {
	return mod(x, y);
};

var modulo$a = modulo$b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var DaysInYear$1 = function DaysInYear(y) {
	if (modulo$a(y, 4) !== 0) {
		return 365;
	}
	if (modulo$a(y, 100) !== 0) {
		return 366;
	}
	if (modulo$a(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var GetIntrinsic$14 = require$$0;

var $EvalError$1 = GetIntrinsic$14('%EvalError%');

var DaysInYear = DaysInYear$1;
var YearFromTime$2 = YearFromTime$4;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var InLeapYear$2 = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime$2(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError$1('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

var DayWithinYear$1 = DayWithinYear$2;
var InLeapYear$1 = InLeapYear$2;

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

var MonthFromTime$3 = function MonthFromTime(t) {
	var day = DayWithinYear$1(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear$1(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var GetIntrinsic$13 = require$$0;

var $EvalError = GetIntrinsic$13('%EvalError%');

var DayWithinYear = DayWithinYear$2;
var InLeapYear = InLeapYear$2;
var MonthFromTime$2 = MonthFromTime$3;

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

var DateFromTime$2 = function DateFromTime(t) {
	var m = MonthFromTime$2(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var Day$1 = Day$3;
var modulo$9 = modulo$b;

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

var WeekDay$1 = function WeekDay(t) {
	return modulo$9(Day$1(t) + 4, 7);
};

var GetIntrinsic$12 = require$$0;

var $TypeError$W = GetIntrinsic$12('%TypeError%');

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var $isNaN$6 = _isNaN;
var padTimeComponent$1 = requirePadTimeComponent();

var Type$W = Type$1M;
var WeekDay = WeekDay$1;
var MonthFromTime$1 = MonthFromTime$3;
var YearFromTime$1 = YearFromTime$4;
var DateFromTime$1 = DateFromTime$2;

// https://262.ecma-international.org/9.0/#sec-datestring

var DateString = function DateString(tv) {
	if (Type$W(tv) !== 'Number' || $isNaN$6(tv)) {
		throw new $TypeError$W('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays[WeekDay(tv)];
	var month = months[MonthFromTime$1(tv)];
	var day = padTimeComponent$1(DateFromTime$1(tv));
	var year = padTimeComponent$1(YearFromTime$1(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

var GetIntrinsic$11 = require$$0;

var $TypeError$V = GetIntrinsic$11('%TypeError%');

var IsPropertyKey$5 = IsPropertyKey$i;
var Type$V = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow = function DeletePropertyOrThrow(O, P) {
	if (Type$V(O) !== 'Object') {
		throw new $TypeError$V('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey$5(P)) {
		throw new $TypeError$V('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$V('Attempt to delete property failed.');
	}
	return success;
};

var GetIntrinsic$10 = require$$0;

var $TypeError$U = GetIntrinsic$10('%TypeError%');

var objectKeys = require$$1$5;

var callBound$d = require$$1;

var callBind$1 = require$$1$1;

var $isEnumerable = callBound$d('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind$1.apply(GetIntrinsic$10('%Array.prototype.push%'));

var forEach$2 = requireForEach();

var Type$U = Type$1M;

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

var EnumerableOwnPropertyNames = function EnumerableOwnProperties(O, kind) {
	if (Type$U(O) !== 'Object') {
		throw new $TypeError$U('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach$2(keys, function (key) {
			if ($isEnumerable(O, key)) {
				$pushApply(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError$U('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

var GetIntrinsic$$ = require$$0;

var $TypeError$T = GetIntrinsic$$('%TypeError%');

var IsPropertyKey$4 = IsPropertyKey$i;
var Type$T = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty$1 = function HasProperty(O, P) {
	if (Type$T(O) !== 'Object') {
		throw new $TypeError$T('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$4(P)) {
		throw new $TypeError$T('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$_ = require$$0;

var $TypeError$S = GetIntrinsic$_('%TypeError%');

var MAX_SAFE_INTEGER = maxSafeInteger;

var Call$2 = Call$7;
var CreateDataPropertyOrThrow = CreateDataPropertyOrThrow$2;
var Get$5 = Get$d;
var HasProperty = HasProperty$1;
var IsArray$4 = IsArray$d;
var LengthOfArrayLike = LengthOfArrayLike$2;
var ToString$5 = ToString$a;

// https://262.ecma-international.org/11.0/#sec-flattenintoarray

// eslint-disable-next-line max-params
var FlattenIntoArray = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}

	var targetIndex = start;
	var sourceIndex = 0;
	while (sourceIndex < sourceLen) {
		var P = ToString$5(sourceIndex);
		var exists = HasProperty(source, P);
		if (exists === true) {
			var element = Get$5(source, P);
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new $TypeError$S('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = Call$2(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = IsArray$4(element);
			}
			if (shouldFlatten) {
				var elementLen = LengthOfArrayLike(element);
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER) {
					throw new $TypeError$S('index too large');
				}
				CreateDataPropertyOrThrow(target, ToString$5(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

var GetIntrinsic$Z = require$$0;

var hasSymbols = require$$1$6();

var $TypeError$R = GetIntrinsic$Z('%TypeError%');

var $gOPN$2 = GetIntrinsic$Z('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic$Z('%Object.getOwnPropertySymbols%');
var keys = require$$1$5;

var esType = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError$R('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$2) {
			return keys(O);
		}
		return $gOPN$2(O);
	}
	throw new $TypeError$R('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var GetIntrinsic$Y = require$$0;

var $Function = GetIntrinsic$Y('%Function%');
var $TypeError$Q = GetIntrinsic$Y('%TypeError%');

var Get$4 = Get$d;
var IsConstructor$1 = IsConstructor$3.exports;
var Type$S = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor$1 = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic$Y(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor$1(constructor)) {
		throw new $TypeError$Q('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get$4(constructor, 'prototype');
	if (Type$S(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError$Q('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var GetIntrinsic$X = require$$0;

var $TypeError$P = GetIntrinsic$X('%TypeError%');

var callBound$c = require$$1;
var regexTester = requireRegexTester();
var every$1 = requireEvery();

var $charAt$2 = callBound$c('String.prototype.charAt');
var $strSlice$1 = callBound$c('String.prototype.slice');
var $indexOf = callBound$c('String.prototype.indexOf');
var $parseInt = parseInt;

var isDigit = regexTester(/^[0-9]$/);

var inspect = require$$1$4;

var Get$3 = Get$d;
var IsArray$3 = IsArray$d;
var IsInteger$4 = IsInteger$9;
var ToObject = ToObject$3;
var ToString$4 = ToString$a;
var Type$R = Type$1M;

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type$R(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type$R(capture) === 'Undefined');
};

// http://262.ecma-international.org/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type$R(matched) !== 'String') {
		throw new $TypeError$P('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$R(str) !== 'String') {
		throw new $TypeError$P('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger$4(position) || position < 0 || position > stringLength) {
		throw new $TypeError$P('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray$3(captures) || !every$1(captures, isStringOrHole)) {
		throw new $TypeError$P('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type$R(replacement) !== 'String') {
		throw new $TypeError$P('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type$R(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt$2(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt$2(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$1(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$1(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt$2(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type$R(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type$R(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type$R(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice$1(replacement, i + '$<'.length, endIndex);
							var capture = Get$3(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type$R(capture) !== 'Undefined') {
								result += ToString$4(capture);
							}
							i += ('<' + groupName + '>').length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt$2(replacement, i);
		}
	}
	return result;
};

var GetIntrinsic$W = require$$0;

var $TypeError$O = GetIntrinsic$W('%TypeError%');

var has$2 = require$$0$1;

var IsPropertyKey$3 = IsPropertyKey$i;
var Type$Q = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$1 = function HasOwnProperty(O, P) {
	if (Type$Q(O) !== 'Object') {
		throw new $TypeError$O('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$3(P)) {
		throw new $TypeError$O('Assertion failed: `P` must be a Property Key');
	}
	return has$2(O, P);
};

var floor$7 = floor$b;
var modulo$8 = modulo$b;

var timeConstants$3 = timeConstants$s;
var msPerHour$1 = timeConstants$3.msPerHour;
var HoursPerDay = timeConstants$3.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var HourFromTime$1 = function HourFromTime(t) {
	return modulo$8(floor$7(t / msPerHour$1), HoursPerDay);
};

var GetIntrinsic$V = require$$0;

var $TypeError$N = GetIntrinsic$V('%TypeError%');

var Get$2 = Get$d;
var IsCallable$2 = IsCallable$7.exports;
var Type$P = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance$1 = function OrdinaryHasInstance(C, O) {
	if (IsCallable$2(C) === false) {
		return false;
	}
	if (Type$P(O) !== 'Object') {
		return false;
	}
	var P = Get$2(C, 'prototype');
	if (Type$P(P) !== 'Object') {
		throw new $TypeError$N('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var GetIntrinsic$U = require$$0;

var $TypeError$M = GetIntrinsic$U('%TypeError%');

var $hasInstance = GetIntrinsic$U('Symbol.hasInstance', true);

var Call$1 = Call$7;
var GetMethod = GetMethod$3;
var IsCallable$1 = IsCallable$7.exports;
var OrdinaryHasInstance = OrdinaryHasInstance$1;
var ToBoolean$1 = ToBoolean$5;
var Type$O = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator = function InstanceofOperator(O, C) {
	if (Type$O(O) !== 'Object') {
		throw new $TypeError$M('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean$1(Call$1(instOfHandler, C, [O]));
	}
	if (!IsCallable$1(C)) {
		throw new $TypeError$M('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

// https://262.ecma-international.org/11.0/#sec-isbigintelementtype

var IsBigIntElementType$1 = function IsBigIntElementType(type) {
	return type === 'BigUint64' || type === 'BigInt64';
};

var GetIntrinsic$T = require$$0;

var $isConcatSpreadable = GetIntrinsic$T('%Symbol.isConcatSpreadable%', true);

var Get$1 = Get$d;
var IsArray$2 = IsArray$d;
var ToBoolean = ToBoolean$5;
var Type$N = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable = function IsConcatSpreadable(O) {
	if (Type$N(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get$1(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray$2(O);
};

var IsInteger$3 = IsInteger$9;

// https://262.ecma-international.org/11.0/#sec-isnonnegativeinteger

var IsNonNegativeInteger$1 = function IsNonNegativeInteger(argument) {
	return !!IsInteger$3(argument) && argument >= 0;
};

// https://262.ecma-international.org/11.0/#sec-isunclampedintegerelementtype

var IsUnclampedIntegerElementType$1 = function IsUnclampedIntegerElementType(type) {
	return type === 'Int8'
        || type === 'Uint8'
        || type === 'Int16'
        || type === 'Uint16'
        || type === 'Int32'
        || type === 'Uint32';
};

var IsUnclampedIntegerElementType = IsUnclampedIntegerElementType$1;
var IsBigIntElementType = IsBigIntElementType$1;

// https://262.ecma-international.org/11.0/#sec-isnotearconfiguration

var IsNoTearConfiguration = function IsNoTearConfiguration(type, order) {
	if (IsUnclampedIntegerElementType(type)) {
		return true;
	}
	if (IsBigIntElementType(type) && order !== 'Init' && order !== 'Unordered') {
		return true;
	}
	return false;
};

var callBound$b = require$$1;

var $PromiseThen = callBound$b('Promise.prototype.then', true);

var Type$M = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise = function IsPromise(x) {
	if (Type$M(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

var GetIntrinsic$S = require$$0;

var $TypeError$L = GetIntrinsic$S('%TypeError%');

var isPrefixOf = requireIsPrefixOf();

// var callBound = require('call-bind/callBound');

// var $charAt = callBound('String.prototype.charAt');

var Type$L = Type$1M;

// https://262.ecma-international.org/9.0/#sec-isstringprefix

var IsStringPrefix = function IsStringPrefix(p, q) {
	if (Type$L(p) !== 'String') {
		throw new $TypeError$L('Assertion failed: "p" must be a String');
	}

	if (Type$L(q) !== 'String') {
		throw new $TypeError$L('Assertion failed: "q" must be a String');
	}

	return isPrefixOf(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

// https://262.ecma-international.org/11.0/#sec-isunsignedelementtype

var IsUnsignedElementType = function IsUnsignedElementType(type) {
	return type === 'Uint8'
        || type === 'Uint8C'
        || type === 'Uint16'
        || type === 'Uint32'
        || type === 'BigUint64';
};

var callBound$a = require$$1;
var $arrayPush = callBound$a('Array.prototype.push');

var GetIterator = GetIterator$2;
var IteratorStep = IteratorStep$2;
var IteratorValue = IteratorValue$2;

// https://262.ecma-international.org/9.0/#sec-iterabletolist

var IterableToList = function IterableToList(items, method) {
	var iterator = GetIterator(items, 'sync', method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep(iterator);
		if (next) {
			var nextValue = IteratorValue(next);
			$arrayPush(values, nextValue);
		}
	}
	return values;
};

var $isFinite$5 = _isFinite;
var msPerDay$2 = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

var MakeDate = function MakeDate(day, time) {
	if (!$isFinite$5(day) || !$isFinite$5(time)) {
		return NaN;
	}
	return (day * msPerDay$2) + time;
};

var GetIntrinsic$R = require$$0;

var $DateUTC = GetIntrinsic$R('%Date.UTC%');

var $isFinite$4 = _isFinite;

var DateFromTime = DateFromTime$2;
var Day = Day$3;
var floor$6 = floor$b;
var modulo$7 = modulo$b;
var MonthFromTime = MonthFromTime$3;
var ToInteger$2 = ToInteger$4;
var YearFromTime = YearFromTime$4;

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

var MakeDay = function MakeDay(year, month, date) {
	if (!$isFinite$4(year) || !$isFinite$4(month) || !$isFinite$4(date)) {
		return NaN;
	}
	var y = ToInteger$2(year);
	var m = ToInteger$2(month);
	var dt = ToInteger$2(date);
	var ym = y + floor$6(m / 12);
	var mn = modulo$7(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

var $isFinite$3 = _isFinite;
var timeConstants$2 = timeConstants$s;
var msPerSecond$2 = timeConstants$2.msPerSecond;
var msPerMinute$1 = timeConstants$2.msPerMinute;
var msPerHour = timeConstants$2.msPerHour;

var ToInteger$1 = ToInteger$4;

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

var MakeTime = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite$3(hour) || !$isFinite$3(min) || !$isFinite$3(sec) || !$isFinite$3(ms)) {
		return NaN;
	}
	var h = ToInteger$1(hour);
	var m = ToInteger$1(min);
	var s = ToInteger$1(sec);
	var milli = ToInteger$1(ms);
	var t = (h * msPerHour) + (m * msPerMinute$1) + (s * msPerSecond$2) + milli;
	return t;
};

var floor$5 = floor$b;
var modulo$6 = modulo$b;

var timeConstants$1 = timeConstants$s;
var msPerMinute = timeConstants$1.msPerMinute;
var MinutesPerHour = timeConstants$1.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var MinFromTime$1 = function MinFromTime(t) {
	return modulo$6(floor$5(t / msPerMinute), MinutesPerHour);
};

var modulo$5 = modulo$b;

var msPerSecond$1 = timeConstants$s.msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var msFromTime = function msFromTime(t) {
	return modulo$5(t, msPerSecond$1);
};

var GetIntrinsic$Q = require$$0;

var $TypeError$K = GetIntrinsic$Q('%TypeError%');

var isNaN$7 = _isNaN;

var Type$K = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-add

var add$1 = function NumberAdd(x, y) {
	if (Type$K(x) !== 'Number' || Type$K(y) !== 'Number') {
		throw new $TypeError$K('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	if (isNaN$7(x) || isNaN$7(y) || (x === Infinity && y === -Infinity) || (x === -Infinity && y === Infinity)) {
		return NaN;
	}

	if ((x === Infinity && y === Infinity) || (x === -Infinity && y === -Infinity)) {
		return x;
	}

	if (x === Infinity) {
		return x;
	}

	if (y === Infinity) {
		return y;
	}

	if (x === y && x === 0) {
		return Infinity / x === -Infinity && Infinity / y === -Infinity ? -0 : +0;
	}

	if (x === -y || -x === y) {
		return +0;
	}

	// shortcut for the actual spec mechanics
	return x + y;
};

var ToNumber$5 = ToNumber$d;

// http://262.ecma-international.org/5.1/#sec-9.5

var ToInt32$5 = function ToInt32(x) {
	return ToNumber$5(x) >> 0;
};

var GetIntrinsic$P = require$$0;

var $TypeError$J = GetIntrinsic$P('%TypeError%');

var ToInt32$4 = ToInt32$5;
var ToUint32$3 = ToUint32$5;
var Type$J = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numberbitwiseop

var NumberBitwiseOp$3 = function NumberBitwiseOp(op, x, y) {
	if (op !== '&' && op !== '|' && op !== '^') {
		throw new $TypeError$J('Assertion failed: `op` must be `&`, `|`, or `^`');
	}
	if (Type$J(x) !== 'Number' || Type$J(y) !== 'Number') {
		throw new $TypeError$J('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	var lnum = ToInt32$4(x);
	var rnum = ToUint32$3(y);
	if (op === '&') {
		return lnum & rnum;
	}
	if (op === '|') {
		return lnum | rnum;
	}
	return lnum ^ rnum;
};

var GetIntrinsic$O = require$$0;

var $TypeError$I = GetIntrinsic$O('%TypeError%');

var NumberBitwiseOp$2 = NumberBitwiseOp$3;
var Type$I = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseAND

var bitwiseAND$1 = function NumberBitwiseAND(x, y) {
	if (Type$I(x) !== 'Number' || Type$I(y) !== 'Number') {
		throw new $TypeError$I('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return NumberBitwiseOp$2('&', x, y);
};

var GetIntrinsic$N = require$$0;

var $TypeError$H = GetIntrinsic$N('%TypeError%');

var ToInt32$3 = ToInt32$5;
var Type$H = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseNOT

var bitwiseNOT$1 = function NumberBitwiseNOT(x) {
	if (Type$H(x) !== 'Number') {
		throw new $TypeError$H('Assertion failed: `x` argument must be a Number');
	}
	var oldValue = ToInt32$3(x);
	// Return the result of applying the bitwise operator op to lnum and rnum. The result is a signed 32-bit integer.
	return ~oldValue;
};

var GetIntrinsic$M = require$$0;

var $TypeError$G = GetIntrinsic$M('%TypeError%');

var NumberBitwiseOp$1 = NumberBitwiseOp$3;
var Type$G = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseOR

var bitwiseOR$1 = function NumberBitwiseOR(x, y) {
	if (Type$G(x) !== 'Number' || Type$G(y) !== 'Number') {
		throw new $TypeError$G('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return NumberBitwiseOp$1('|', x, y);
};

var GetIntrinsic$L = require$$0;

var $TypeError$F = GetIntrinsic$L('%TypeError%');

var NumberBitwiseOp = NumberBitwiseOp$3;
var Type$F = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseXOR

var bitwiseXOR$1 = function NumberBitwiseXOR(x, y) {
	if (Type$F(x) !== 'Number' || Type$F(y) !== 'Number') {
		throw new $TypeError$F('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return NumberBitwiseOp('^', x, y);
};

var GetIntrinsic$K = require$$0;

var $TypeError$E = GetIntrinsic$K('%TypeError%');

var isFinite$1 = _isFinite;
var isNaN$6 = _isNaN;
var Type$E = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-divide

var divide$1 = function NumberDivide(x, y) {
	if (Type$E(x) !== 'Number' || Type$E(y) !== 'Number') {
		throw new $TypeError$E('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	if (isNaN$6(x) || isNaN$6(y) || (!isFinite$1(x) && !isFinite$1(y))) {
		return NaN;
	}
	// shortcut for the actual spec mechanics
	return x / y;
};

var GetIntrinsic$J = require$$0;

var $TypeError$D = GetIntrinsic$J('%TypeError%');

var isNaN$5 = _isNaN;
var Type$D = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-equal

var equal$1 = function NumberEqual(x, y) {
	if (Type$D(x) !== 'Number' || Type$D(y) !== 'Number') {
		throw new $TypeError$D('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	if (isNaN$5(x) || isNaN$5(y)) {
		return false;
	}
	// shortcut for the actual spec mechanics
	return x === y;
};

var GetIntrinsic$I = require$$0;
// var isNegativeZero = require('is-negative-zero');

var $pow = GetIntrinsic$I('%Math.pow%');

var $TypeError$C = GetIntrinsic$I('%TypeError%');

/*
var abs = require('../../helpers/abs');
var isFinite = require('../../helpers/isFinite');
var isNaN = require('../../helpers/isNaN');

var IsInteger = require('../IsInteger');
*/
var Type$C = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-exponentiate

/* eslint max-lines-per-function: 0, max-statements: 0 */

var exponentiate$1 = function NumberExponentiate(base, exponent) {
	if (Type$C(base) !== 'Number' || Type$C(exponent) !== 'Number') {
		throw new $TypeError$C('Assertion failed: `base` and `exponent` arguments must be Numbers');
	}
	return $pow(base, exponent);
	/*
	if (isNaN(exponent)) {
		return NaN;
	}
	if (exponent === 0) {
		return 1;
	}
	if (isNaN(base)) {
		return NaN;
	}
	var aB = abs(base);
	if (aB > 1 && exponent === Infinity) {
		return Infinity;
	}
	if (aB > 1 && exponent === -Infinity) {
		return 0;
	}
	if (aB === 1 && (exponent === Infinity || exponent === -Infinity)) {
		return NaN;
	}
	if (aB < 1 && exponent === Infinity) {
		return +0;
	}
	if (aB < 1 && exponent === -Infinity) {
		return Infinity;
	}
	if (base === Infinity) {
		return exponent > 0 ? Infinity : 0;
	}
	if (base === -Infinity) {
		var isOdd = true;
		if (exponent > 0) {
			return isOdd ? -Infinity : Infinity;
		}
		return isOdd ? -0 : 0;
	}
	if (exponent > 0) {
		return isNegativeZero(base) ? Infinity : 0;
	}
	if (isNegativeZero(base)) {
		if (exponent > 0) {
			return isOdd ? -0 : 0;
		}
		return isOdd ? -Infinity : Infinity;
	}
	if (base < 0 && isFinite(base) && isFinite(exponent) && !IsInteger(exponent)) {
		return NaN;
    }
    */
};

var GetIntrinsic$H = require$$0;

var $TypeError$B = GetIntrinsic$H('%TypeError%');

var ToInt32$2 = ToInt32$5;
var ToUint32$2 = ToUint32$5;
var Type$B = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-leftShift

var leftShift$1 = function NumberLeftShift(x, y) {
	if (Type$B(x) !== 'Number' || Type$B(y) !== 'Number') {
		throw new $TypeError$B('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var lnum = ToInt32$2(x);
	var rnum = ToUint32$2(y);

	var shiftCount = rnum & 0x1F;

	return lnum << shiftCount;
};

var GetIntrinsic$G = require$$0;

var $TypeError$A = GetIntrinsic$G('%TypeError%');

var isNaN$4 = _isNaN;

var Type$A = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-lessThan

var lessThan$1 = function NumberLessThan(x, y) {
	if (Type$A(x) !== 'Number' || Type$A(y) !== 'Number') {
		throw new $TypeError$A('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	// If x is NaN, return undefined.
	// If y is NaN, return undefined.
	if (isNaN$4(x) || isNaN$4(y)) {
		return void undefined;
	}

	// shortcut for the actual spec mechanics
	return x < y;
};

var GetIntrinsic$F = require$$0;

var $TypeError$z = GetIntrinsic$F('%TypeError%');

var isNaN$3 = _isNaN;

var Type$z = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-multiply

var multiply$1 = function NumberMultiply(x, y) {
	if (Type$z(x) !== 'Number' || Type$z(y) !== 'Number') {
		throw new $TypeError$z('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	if (isNaN$3(x) || isNaN$3(y) || (x === 0 && !isFinite(y)) || (!isFinite(x) && y === 0)) {
		return NaN;
	}
	if (!isFinite(x) && !isFinite(y)) {
		return x === y ? Infinity : -Infinity;
	}
	if (!isFinite(x) && y !== 0) {
		return x > 0 ? Infinity : -Infinity;
	}
	if (!isFinite(y) && x !== 0) {
		return y > 0 ? Infinity : -Infinity;
	}

	// shortcut for the actual spec mechanics
	return x * y;
};

var GetIntrinsic$E = require$$0;

var $TypeError$y = GetIntrinsic$E('%TypeError%');

var isNaN$2 = _isNaN;

var Type$y = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-remainder

var remainder$1 = function NumberRemainder(n, d) {
	if (Type$y(n) !== 'Number' || Type$y(d) !== 'Number') {
		throw new $TypeError$y('Assertion failed: `n` and `d` arguments must be Numbers');
	}

	// If either operand is NaN, the result is NaN.
	// If the dividend is an infinity, or the divisor is a zero, or both, the result is NaN.
	if (isNaN$2(n) || isNaN$2(d) || !isFinite(n) || d === 0) {
		return NaN;
	}

	// If the dividend is finite and the divisor is an infinity, the result equals the dividend.
	// If the dividend is a zero and the divisor is nonzero and finite, the result is the same as the dividend.
	if (!isFinite(d) || (n === 0 && d !== 0)) {
		return n;
	}

	// In the remaining cases, where neither an infinity, nor a zero, nor NaN is involved…
	return n % d;
};

var GetIntrinsic$D = require$$0;

var $TypeError$x = GetIntrinsic$D('%TypeError%');

var isNaN$1 = _isNaN;

var Type$x = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-sameValueZero

var sameValueZero$1 = function NumberSameValueZero(x, y) {
	if (Type$x(x) !== 'Number' || Type$x(y) !== 'Number') {
		throw new $TypeError$x('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var xNaN = isNaN$1(x);
	var yNaN = isNaN$1(y);
	if (xNaN || yNaN) {
		return xNaN === yNaN;
	}
	return x === y;
};

var GetIntrinsic$C = require$$0;
var isNegativeZero$1 = require$$6;

var $TypeError$w = GetIntrinsic$C('%TypeError%');

var Type$w = Type$1M;
var NumberSameValueZero = sameValueZero$1;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-sameValue

var sameValue$1 = function NumberSameValue(x, y) {
	if (Type$w(x) !== 'Number' || Type$w(y) !== 'Number') {
		throw new $TypeError$w('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	if (x === 0 && y === 0) {
		return !(isNegativeZero$1(x) ^ isNegativeZero$1(y));
	}
	return NumberSameValueZero(x, y);
};

var GetIntrinsic$B = require$$0;

var $TypeError$v = GetIntrinsic$B('%TypeError%');

var ToInt32$1 = ToInt32$5;
var ToUint32$1 = ToUint32$5;
var Type$v = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-signedRightShift

var signedRightShift$1 = function NumberSignedRightShift(x, y) {
	if (Type$v(x) !== 'Number' || Type$v(y) !== 'Number') {
		throw new $TypeError$v('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var lnum = ToInt32$1(x);
	var rnum = ToUint32$1(y);

	var shiftCount = rnum & 0x1F;

	return lnum >> shiftCount;
};

var GetIntrinsic$A = require$$0;

var $TypeError$u = GetIntrinsic$A('%TypeError%');

var Type$u = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-subtract

var subtract$1 = function NumberSubtract(x, y) {
	if (Type$u(x) !== 'Number' || Type$u(y) !== 'Number') {
		throw new $TypeError$u('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return x - y;
};

var GetIntrinsic$z = require$$0;

var $String$1 = GetIntrinsic$z('%String%');
var $TypeError$t = GetIntrinsic$z('%TypeError%');

var Type$t = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-tostring

var toString$1 = function NumberToString(x) {
	if (Type$t(x) !== 'Number') {
		throw new $TypeError$t('Assertion failed: `x` must be a Number');
	}

	return $String$1(x);
};

var GetIntrinsic$y = require$$0;

var $TypeError$s = GetIntrinsic$y('%TypeError%');

var isNaN = _isNaN;

var Type$s = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-unaryMinus

var unaryMinus$1 = function NumberUnaryMinus(x) {
	if (Type$s(x) !== 'Number') {
		throw new $TypeError$s('Assertion failed: `x` argument must be a Number');
	}
	if (isNaN(x)) {
		return NaN;
	}
	return -x;
};

var GetIntrinsic$x = require$$0;

var $TypeError$r = GetIntrinsic$x('%TypeError%');

var ToInt32 = ToInt32$5;
var ToUint32 = ToUint32$5;
var Type$r = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-unsignedRightShift

var unsignedRightShift$1 = function NumberUnsignedRightShift(x, y) {
	if (Type$r(x) !== 'Number' || Type$r(y) !== 'Number') {
		throw new $TypeError$r('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var lnum = ToInt32(x);
	var rnum = ToUint32(y);

	var shiftCount = rnum & 0x1F;

	return lnum >>> shiftCount;
};

var add = add$1;
var bitwiseAND = bitwiseAND$1;
var bitwiseNOT = bitwiseNOT$1;
var bitwiseOR = bitwiseOR$1;
var bitwiseXOR = bitwiseXOR$1;
var divide = divide$1;
var equal = equal$1;
var exponentiate = exponentiate$1;
var leftShift = leftShift$1;
var lessThan = lessThan$1;
var multiply = multiply$1;
var remainder = remainder$1;
var sameValue = sameValue$1;
var sameValueZero = sameValueZero$1;
var signedRightShift = signedRightShift$1;
var subtract = subtract$1;
var toString = toString$1;
var unaryMinus = unaryMinus$1;
var unsignedRightShift = unsignedRightShift$1;

var _Number = {
	add: add,
	bitwiseAND: bitwiseAND,
	bitwiseNOT: bitwiseNOT,
	bitwiseOR: bitwiseOR,
	bitwiseXOR: bitwiseXOR,
	divide: divide,
	equal: equal,
	exponentiate: exponentiate,
	leftShift: leftShift,
	lessThan: lessThan,
	multiply: multiply,
	remainder: remainder,
	sameValue: sameValue,
	sameValueZero: sameValueZero,
	signedRightShift: signedRightShift,
	subtract: subtract,
	toString: toString,
	unaryMinus: unaryMinus,
	unsignedRightShift: unsignedRightShift
};

var GetIntrinsic$w = require$$0;

var $BigInt = GetIntrinsic$w('%BigInt%', true);
var $RangeError$1 = GetIntrinsic$w('%RangeError%');
var $TypeError$q = GetIntrinsic$w('%TypeError%');

var IsInteger$2 = IsInteger$9;
var Type$q = Type$1M;

// https://262.ecma-international.org/11.0/#sec-numbertobigint

var NumberToBigInt = function NumberToBigInt(number) {
	if (Type$q(number) !== 'Number') {
		throw new $TypeError$q('Assertion failed: `number` must be a String');
	}
	if (!IsInteger$2(number)) {
		throw new $RangeError$1('The number ' + number + ' cannot be converted to a BigInt because it is not an integer');
	}
	return $BigInt(number);
};

var GetIntrinsic$v = require$$0;

var $ObjectCreate = GetIntrinsic$v('%Object.create%', true);
var $TypeError$p = GetIntrinsic$v('%TypeError%');
var $SyntaxError$2 = GetIntrinsic$v('%SyntaxError%');

var IsArray$1 = IsArray$d;
var Type$p = Type$1M;

var hasProto = !({ __proto__: null } instanceof Object);

// https://262.ecma-international.org/6.0/#sec-objectcreate

var OrdinaryObjectCreate$1 = function OrdinaryObjectCreate(proto) {
	if (proto !== null && Type$p(proto) !== 'Object') {
		throw new $TypeError$p('Assertion failed: `proto` must be null or an object');
	}
	var additionalInternalSlotsList = arguments.length < 2 ? [] : arguments[1];
	if (!IsArray$1(additionalInternalSlotsList)) {
		throw new $TypeError$p('Assertion failed: `additionalInternalSlotsList` must be an Array');
	}
	// var internalSlotsList = ['[[Prototype]]', '[[Extensible]]'];
	if (additionalInternalSlotsList.length > 0) {
		throw new $SyntaxError$2('es-abstract does not yet support internal slots');
		// internalSlotsList.push(...additionalInternalSlotsList);
	}
	// var O = MakeBasicObject(internalSlotsList);
	// setProto(O, proto);
	// return O;

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$2('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var GetIntrinsic$u = require$$0;
var $TypeError$o = GetIntrinsic$u('%TypeError%');

var GetPrototypeFromConstructor = GetPrototypeFromConstructor$1;
var IsArray = IsArray$d;
var OrdinaryObjectCreate = OrdinaryObjectCreate$1;

// https://262.ecma-international.org/6.0/#sec-ordinarycreatefromconstructor

var OrdinaryCreateFromConstructor = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic$u(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError$o('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return OrdinaryObjectCreate(proto, slots);
};

var GetIntrinsic$t = require$$0;

var $TypeError$n = GetIntrinsic$t('%TypeError%');

var $getProto = requireGetProto();

var Type$o = Type$1M;

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

var OrdinaryGetPrototypeOf$1 = function OrdinaryGetPrototypeOf(O) {
	if (Type$o(O) !== 'Object') {
		throw new $TypeError$n('Assertion failed: O must be an Object');
	}
	if (!$getProto) {
		throw new $TypeError$n('This environment does not support fetching prototypes.');
	}
	return $getProto(O);
};

var GetIntrinsic$s = require$$0;

var $TypeError$m = GetIntrinsic$s('%TypeError%');

var IsPropertyKey$2 = IsPropertyKey$i;
var Type$n = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty = function OrdinaryHasProperty(O, P) {
	if (Type$n(O) !== 'Object') {
		throw new $TypeError$m('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey$2(P)) {
		throw new $TypeError$m('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var GetIntrinsic$r = require$$0;

var $TypeError$l = GetIntrinsic$r('%TypeError%');

var $setProto = requireSetProto();

var OrdinaryGetPrototypeOf = OrdinaryGetPrototypeOf$1;
var Type$m = Type$1M;

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf = function OrdinarySetPrototypeOf(O, V) {
	if (Type$m(V) !== 'Object' && Type$m(V) !== 'Null') {
		throw new $TypeError$l('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

var GetIntrinsic$q = require$$0;
var callBind = require$$1$1;

var $resolve = GetIntrinsic$q('%Promise.resolve%', true);
var $PromiseResolve = $resolve && callBind($resolve);

// https://262.ecma-international.org/9.0/#sec-promise-resolve

var PromiseResolve = function PromiseResolve(C, x) {
	if (!$PromiseResolve) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve(C, x);
};

var GetIntrinsic$p = require$$0;

var $TypeError$k = GetIntrinsic$p('%TypeError%');

var callBound$9 = require$$1;

var ToLength$1 = ToLength$3;
var ToString$3 = ToString$a;

var $strSlice = callBound$9('String.prototype.slice');

// https://262.ecma-international.org/11.0/#sec-stringpad

var StringPad$1 = function StringPad(O, maxLength, fillString, placement) {
	if (placement !== 'start' && placement !== 'end') {
		throw new $TypeError$k('Assertion failed: `placement` must be "start" or "end"');
	}
	var S = ToString$3(O);
	var intMaxLength = ToLength$1(maxLength);
	var stringLength = S.length;
	if (intMaxLength <= stringLength) {
		return S;
	}
	var filler = typeof fillString === 'undefined' ? ' ' : ToString$3(fillString);
	if (filler === '') {
		return S;
	}
	var fillLen = intMaxLength - stringLength;

	// the String value consisting of repeated concatenations of filler truncated to length fillLen.
	var truncatedStringFiller = '';
	while (truncatedStringFiller.length < fillLen) {
		truncatedStringFiller += filler;
	}
	truncatedStringFiller = $strSlice(truncatedStringFiller, 0, fillLen);

	if (placement === 'start') {
		return truncatedStringFiller + S;
	}
	return S + truncatedStringFiller;
};

var GetIntrinsic$o = require$$0;

var $TypeError$j = GetIntrinsic$o('%TypeError%');

var callBound$8 = require$$1;

var $charCodeAt$1 = callBound$8('String.prototype.charCodeAt');
var $numberToString = callBound$8('Number.prototype.toString');
var $toLowerCase = callBound$8('String.prototype.toLowerCase');

var StringPad = StringPad$1;

// https://262.ecma-international.org/11.0/#sec-unicodeescape

var UnicodeEscape$1 = function UnicodeEscape(C) {
	if (typeof C !== 'string' || C.length !== 1) {
		throw new $TypeError$j('Assertion failed: `C` must be a single code unit');
	}
	var n = $charCodeAt$1(C, 0);
	if (n > 0xFFFF) {
		throw new $TypeError$j('`Assertion failed: numeric value of `C` must be <= 0xFFFF');
	}

	return '\\u' + StringPad($toLowerCase($numberToString(n, 16)), 4, '0', 'start');
};

var GetIntrinsic$n = require$$0;

var $TypeError$i = GetIntrinsic$n('%TypeError%');
var $fromCharCode = GetIntrinsic$n('%String.fromCharCode%');

var floor$4 = floor$b;
var modulo$4 = modulo$b;

var isCodePoint = requireIsCodePoint();

// https://262.ecma-international.org/7.0/#sec-utf16encoding

var UTF16Encoding$1 = function UTF16Encoding(cp) {
	if (!isCodePoint(cp)) {
		throw new $TypeError$i('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode(cp);
	}
	var cu1 = floor$4((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo$4(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode(cu1) + $fromCharCode(cu2);
};

var GetIntrinsic$m = require$$0;

var $TypeError$h = GetIntrinsic$m('%TypeError%');

var callBound$7 = require$$1;

var $push = callBound$7('Array.prototype.push');

var CodePointAt = CodePointAt$2;
var Type$l = Type$1M;

// https://262.ecma-international.org/11.0/#sec-utf16decodestring

var UTF16DecodeString$1 = function UTF16DecodeString(string) {
	if (Type$l(string) !== 'String') {
		throw new $TypeError$h('Assertion failed: `string` must be a String');
	}
	var codePoints = [];
	var size = string.length;
	var position = 0;
	while (position < size) {
		var cp = CodePointAt(string, position);
		$push(codePoints, cp['[[CodePoint]]']);
		position += cp['[[CodeUnitCount]]'];
	}
	return codePoints;
};

var GetIntrinsic$l = require$$0;

var $TypeError$g = GetIntrinsic$l('%TypeError%');

var callBound$6 = require$$1;
var forEach$1 = requireForEach();
var isLeadingSurrogate = isLeadingSurrogate$d;
var isTrailingSurrogate = isTrailingSurrogate$d;

var $charCodeAt = callBound$6('String.prototype.charCodeAt');

var Type$k = Type$1M;
var UnicodeEscape = UnicodeEscape$1;
var UTF16Encoding = UTF16Encoding$1;
var UTF16DecodeString = UTF16DecodeString$1;

var has$1 = require$$0$1;

// https://262.ecma-international.org/11.0/#sec-quotejsonstring

var escapes = {
	'\u0008': '\\b',
	'\u0009': '\\t',
	'\u000A': '\\n',
	'\u000C': '\\f',
	'\u000D': '\\r',
	'\u0022': '\\"',
	'\u005c': '\\\\'
};

var QuoteJSONString = function QuoteJSONString(value) {
	if (Type$k(value) !== 'String') {
		throw new $TypeError$g('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach$1(UTF16DecodeString(value), function (C) {
			if (has$1(escapes, C)) {
				product += escapes[C];
			} else {
				var cCharCode = $charCodeAt(C, 0);
				if (cCharCode < 0x20 || isLeadingSurrogate(C) || isTrailingSurrogate(C)) {
					product += UnicodeEscape(C);
				} else {
					product += UTF16Encoding(cCharCode);
				}
			}
		});
	}
	product += '"';
	return product;
};

var GetIntrinsic$k = require$$0;

var $RegExp = GetIntrinsic$k('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString$2 = ToString$a;

// https://262.ecma-international.org/6.0/#sec-regexpcreate

var RegExpCreate = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString$2(P);
	var flags = typeof F === 'undefined' ? '' : ToString$2(F);
	return new $RegExp(pattern, flags);
};

var GetIntrinsic$j = require$$0;

var $TypeError$f = GetIntrinsic$j('%TypeError%');

var regexExec = require$$1('RegExp.prototype.exec');

var Call = Call$7;
var Get = Get$d;
var IsCallable = IsCallable$7.exports;
var Type$j = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec = function RegExpExec(R, S) {
	if (Type$j(R) !== 'Object') {
		throw new $TypeError$f('Assertion failed: `R` must be an Object');
	}
	if (Type$j(S) !== 'String') {
		throw new $TypeError$f('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type$j(result) === 'Object') {
			return result;
		}
		throw new $TypeError$f('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

var GetIntrinsic$i = require$$0;

var $TypeError$e = GetIntrinsic$i('%TypeError%');

var SameValue$2 = SameValue$a;
var Type$i = Type$1M;

// https://262.ecma-international.org/11.0/#sec-samevaluenonnumeric

var SameValueNonNumeric = function SameValueNonNumeric(x, y) {
	var xType = Type$i(x);
	if (xType === 'Number' || xType === 'Bigint') {
		throw new $TypeError$e('Assertion failed: SameValueNonNumeric does not accept Number or BigInt values');
	}
	if (xType !== Type$i(y)) {
		throw new $TypeError$e('SameValueNonNumeric requires two non-numeric values of the same type.');
	}
	return SameValue$2(x, y);
};

var $isNaN$5 = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero = function SameValueZero(x, y) {
	return (x === y) || ($isNaN$5(x) && $isNaN$5(y));
};

var floor$3 = floor$b;
var modulo$3 = modulo$b;

var timeConstants = timeConstants$s;
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

var SecFromTime$1 = function SecFromTime(t) {
	return modulo$3(floor$3(t / msPerSecond), SecondsPerMinute);
};

var GetIntrinsic$h = require$$0;

var $TypeError$d = GetIntrinsic$h('%TypeError%');

var IsPropertyKey$1 = IsPropertyKey$i;
var SameValue$1 = SameValue$a;
var Type$h = Type$1M;

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set = function Set(O, P, V, Throw) {
	if (Type$h(O) !== 'Object') {
		throw new $TypeError$d('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey$1(P)) {
		throw new $TypeError$d('Assertion failed: `P` must be a Property Key');
	}
	if (Type$h(Throw) !== 'Boolean') {
		throw new $TypeError$d('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue$1(O[P], V)) {
			throw new $TypeError$d('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue$1(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

var GetIntrinsic$g = require$$0;

var $TypeError$c = GetIntrinsic$g('%TypeError%');

var DefinePropertyOrThrow$3 = DefinePropertyOrThrow$5;
var HasOwnProperty = HasOwnProperty$1;
var IsExtensible$2 = IsExtensible$5;
var IsNonNegativeInteger = IsNonNegativeInteger$1;
var Type$g = Type$1M;

// https://262.ecma-international.org/11.0/#sec-setfunctionlength

var SetFunctionLength = function SetFunctionLength(F, length) {
	if (typeof F !== 'function' || !IsExtensible$2(F) || HasOwnProperty(F, 'length')) {
		throw new $TypeError$c('Assertion failed: `F` must be an extensible function and lack an own `length` property');
	}
	if (Type$g(length) !== 'Number') {
		throw new $TypeError$c('Assertion failed: `length` must be a Number');
	}
	if (!IsNonNegativeInteger(length)) {
		throw new $TypeError$c('Assertion failed: `length` must be an integer >= 0');
	}
	return DefinePropertyOrThrow$3(F, 'length', {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});
};

var GetIntrinsic$f = require$$0;

var has = require$$0$1;

var $TypeError$b = GetIntrinsic$f('%TypeError%');

var getSymbolDescription = requireGetSymbolDescription();

var DefinePropertyOrThrow$2 = DefinePropertyOrThrow$5;
var IsExtensible$1 = IsExtensible$5;
var Type$f = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$b('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible$1(F) || has(F, 'name')) {
		throw new $TypeError$b('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$f(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$b('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow$2(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var GetIntrinsic$e = require$$0;

var $SyntaxError$1 = GetIntrinsic$e('%SyntaxError%');
var $TypeError$a = GetIntrinsic$e('%TypeError%');
var $preventExtensions = GetIntrinsic$e('%Object.preventExtensions%');
var $gOPD$1 = getOwnPropertyDescriptor;
var $gOPN$1 = GetIntrinsic$e('%Object.getOwnPropertyNames%');

var forEach = requireForEach();

var DefinePropertyOrThrow$1 = DefinePropertyOrThrow$5;
var IsAccessorDescriptor = IsAccessorDescriptor$6;
var ToPropertyDescriptor$1 = ToPropertyDescriptor$5;
var Type$e = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel = function SetIntegrityLevel(O, level) {
	if (Type$e(O) !== 'Object') {
		throw new $TypeError$a('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$a('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError$1('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$1) {
		throw new $SyntaxError$1('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$1(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow$1(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD$1(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor$1(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow$1(O, k, desc);
			}
		});
	}
	return true;
};

var GetIntrinsic$d = require$$0;

var $species = GetIntrinsic$d('%Symbol.species%', true);
var $TypeError$9 = GetIntrinsic$d('%TypeError%');

var IsConstructor = IsConstructor$3.exports;
var Type$d = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$d(O) !== 'Object') {
		throw new $TypeError$9('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$d(C) !== 'Object') {
		throw new $TypeError$9('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError$9('no constructor found');
};

var GetIntrinsic$c = require$$0;
var callBound$5 = require$$1;

var $TypeError$8 = GetIntrinsic$c('%TypeError%');

var IsInteger$1 = IsInteger$9;
var Type$c = Type$1M;

var $charAt$1 = callBound$5('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

var SplitMatch = function SplitMatch(S, q, R) {
	if (Type$c(S) !== 'String') {
		throw new $TypeError$8('Assertion failed: `S` must be a String');
	}
	if (!IsInteger$1(q)) {
		throw new $TypeError$8('Assertion failed: `q` must be an integer');
	}
	if (Type$c(R) !== 'String') {
		throw new $TypeError$8('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt$1(S, q + i) !== $charAt$1(R, i)) {
			return false;
		}
	}

	return q + r;
};

var GetIntrinsic$b = require$$0;

var $Object = GetIntrinsic$b('%Object%');
var $StringPrototype = GetIntrinsic$b('%String.prototype%');
var $SyntaxError = GetIntrinsic$b('%SyntaxError%');
var $TypeError$7 = GetIntrinsic$b('%TypeError%');

var DefinePropertyOrThrow = DefinePropertyOrThrow$5;
var Type$b = Type$1M;

var setProto = requireSetProto();

// https://262.ecma-international.org/6.0/#sec-stringcreate

var StringCreate = function StringCreate(value, prototype) {
	if (Type$b(value) !== 'String') {
		throw new $TypeError$7('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

var GetIntrinsic$a = require$$0;

var $TypeError$6 = GetIntrinsic$a('%TypeError%');

var callBound$4 = require$$1;
var $charAt = callBound$4('String.prototype.charAt');
var $stringToString = callBound$4('String.prototype.toString');

var CanonicalNumericIndexString = CanonicalNumericIndexString$1;
var IsInteger = IsInteger$9;
var IsPropertyKey = IsPropertyKey$i;
var Type$a = Type$1M;

var isNegativeZero = require$$6;

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

var StringGetOwnProperty = function StringGetOwnProperty(S, P) {
	var str;
	if (Type$a(S) === 'Object') {
		try {
			str = $stringToString(S);
		} catch (e) { /**/ }
	}
	if (Type$a(str) !== 'String') {
		throw new $TypeError$6('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$6('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type$a(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger(index) || isNegativeZero(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

var GetIntrinsic$9 = require$$0;

var $TypeError$5 = GetIntrinsic$9('%TypeError%');

var callBound$3 = require$$1;

var $SymbolToString = callBound$3('Symbol.prototype.toString', true);

var Type$9 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString = function SymbolDescriptiveString(sym) {
	if (Type$9(sym) !== 'Symbol') {
		throw new $TypeError$5('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

var GetIntrinsic$8 = require$$0;

var $gOPD = getOwnPropertyDescriptor;
var $gOPN = GetIntrinsic$8('%Object.getOwnPropertyNames%');
var $TypeError$4 = GetIntrinsic$8('%TypeError%');

var every = requireEvery();

var IsDataDescriptor = IsDataDescriptor$9;
var IsExtensible = IsExtensible$5;
var ToPropertyDescriptor = ToPropertyDescriptor$5;
var Type$8 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel = function TestIntegrityLevel(O, level) {
	if (Type$8(O) !== 'Object') {
		throw new $TypeError$4('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$4('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var GetIntrinsic$7 = require$$0;
var callBound$2 = require$$1;

var $TypeError$3 = GetIntrinsic$7('%TypeError%');
var $bigIntValueOf = callBound$2('BigInt.prototype.valueOf', true);

var Type$7 = Type$1M;

// https://262.ecma-international.org/11.0/#sec-thisbigintvalue

var thisBigIntValue = function thisBigIntValue(value) {
	var type = Type$7(value);
	if (type === 'BigInt') {
		return value;
	}
	if (!$bigIntValueOf) {
		throw new $TypeError$3('BigInt is not supported');
	}
	return $bigIntValueOf(value);
};

var $BooleanValueOf = require$$1('Boolean.prototype.valueOf');

var Type$6 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue = function thisBooleanValue(value) {
	if (Type$6(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

var callBound$1 = require$$1;

var Type$5 = Type$1M;

var $NumberValueOf = callBound$1('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue = function thisNumberValue(value) {
	if (Type$5(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};

var $StringValueOf = require$$1('String.prototype.valueOf');

var Type$4 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue = function thisStringValue(value) {
	if (Type$4(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

var callBound = require$$1;

var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);

var Type$3 = Type$1M;

// https://262.ecma-international.org/9.0/#sec-thissymbolvalue

var thisSymbolValue = function thisSymbolValue(value) {
	if (!$SymbolValueOf) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type$3(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf(value);
};

var thisTimeValue = {exports: {}};

(function (module) {

	module.exports = thisTimeValue$2;
} (thisTimeValue));

var GetIntrinsic$6 = require$$0;

var $Date$1 = GetIntrinsic$6('%Date%');
var $Number$1 = GetIntrinsic$6('%Number%');

var $isFinite$2 = _isFinite;

var abs$2 = abs$4;
var ToNumber$4 = ToNumber$d;

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

var TimeClip = function TimeClip(time) {
	if (!$isFinite$2(time) || abs$2(time) > 8.64e15) {
		return NaN;
	}
	return $Number$1(new $Date$1(ToNumber$4(time)));
};

var msPerDay$1 = timeConstants$s.msPerDay;

var DayFromYear = DayFromYear$2;

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

var TimeFromYear = function TimeFromYear(y) {
	return msPerDay$1 * DayFromYear(y);
};

var GetIntrinsic$5 = require$$0;

var $TypeError$2 = GetIntrinsic$5('%TypeError%');

var $isNaN$4 = _isNaN;
var padTimeComponent = requirePadTimeComponent();

var HourFromTime = HourFromTime$1;
var MinFromTime = MinFromTime$1;
var SecFromTime = SecFromTime$1;
var Type$2 = Type$1M;

// https://262.ecma-international.org/9.0/#sec-timestring

var TimeString = function TimeString(tv) {
	if (Type$2(tv) !== 'Number' || $isNaN$4(tv)) {
		throw new $TypeError$2('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime(tv);
	var minute = MinFromTime(tv);
	var second = SecFromTime(tv);
	return padTimeComponent(hour) + ':' + padTimeComponent(minute) + ':' + padTimeComponent(second) + '\x20GMT';
};

var modulo$2 = modulo$b;

var msPerDay = timeConstants$s.msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

var TimeWithinDay = function TimeWithinDay(t) {
	return modulo$2(t, msPerDay);
};

var GetIntrinsic$4 = require$$0;

var $TypeError$1 = GetIntrinsic$4('%TypeError%');
var $Date = GetIntrinsic$4('%Date%');

var $isNaN$3 = _isNaN;

var Type$1 = Type$1M;

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString = function ToDateString(tv) {
	if (Type$1(tv) !== 'Number') {
		throw new $TypeError$1('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN$3(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

var GetIntrinsic$3 = require$$0;

var $RangeError = GetIntrinsic$3('%RangeError%');

var ToInteger = ToInteger$4;
var ToLength = ToLength$3;
var SameValue = SameValue$a;

// https://262.ecma-international.org/12.0/#sec-toindex

var ToIndex = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger(value);
	if (integerIndex < 0) {
		throw new $RangeError('index must be >= 0');
	}
	var index = ToLength(integerIndex);
	if (!SameValue(integerIndex, index)) {
		throw new $RangeError('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

var abs$1 = abs$4;
var floor$2 = floor$b;
var modulo$1 = modulo$b;
var ToNumber$3 = ToNumber$d;

var $isNaN$2 = _isNaN;
var $isFinite$1 = _isFinite;
var $sign$1 = sign;

// http://262.ecma-international.org/5.1/#sec-9.7

var ToUint16$1 = function ToUint16(value) {
	var number = ToNumber$3(value);
	if ($isNaN$2(number) || number === 0 || !$isFinite$1(number)) { return 0; }
	var posInt = $sign$1(number) * floor$2(abs$1(number));
	return modulo$1(posInt, 0x10000);
};

var ToUint16 = ToUint16$1;

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16 = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

var ToNumber$2 = ToNumber$d;

var $isNaN$1 = _isNaN;
var $isFinite = _isFinite;
var $sign = sign;

var abs = abs$4;
var floor$1 = floor$b;
var modulo = modulo$b;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

var ToUint8$1 = function ToUint8(argument) {
	var number = ToNumber$2(argument);
	if ($isNaN$1(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor$1(abs(number));
	return modulo(posInt, 0x100);
};

var ToUint8 = ToUint8$1;

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8 = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var GetIntrinsic$2 = require$$0;

var $Number = GetIntrinsic$2('%Number%');

var isPrimitive = requireIsPrimitive();

var ToPrimitive$1 = ToPrimitive$5;
var ToNumber$1 = ToNumber$d;
var Type = Type$1M;

// https://262.ecma-international.org/6.0/#sec-tonumber

var ToNumeric = function ToNumeric(argument) {
	var primValue = isPrimitive(argument) ? argument : ToPrimitive$1(argument, $Number);
	if (Type(primValue) === 'BigInt') {
		return primValue;
	}
	return ToNumber$1(primValue);
};

var GetIntrinsic$1 = require$$0;

var $String = GetIntrinsic$1('%String%');

var ToPrimitive = ToPrimitive$5;
var ToString$1 = ToString$a;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString$1(key);
};

var ToNumber = ToNumber$d;
var floor = floor$b;

var $isNaN = _isNaN;

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var trimStart = require$$0$5;
var trimEnd = require$$1$7;

var GetIntrinsic = require$$0;

var $TypeError = GetIntrinsic('%TypeError%');

var RequireObjectCoercible = RequireObjectCoercible$3.exports;
var ToString = ToString$a;

// https://262.ecma-international.org/10.0/#sec-trimstring

var TrimString = function TrimString(string, where) {
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var T;
	if (where === 'start') {
		T = trimStart(S);
	} else if (where === 'end') {
		T = trimEnd(S);
	} else if (where === 'start+end') {
		T = trimStart(trimEnd(S));
	} else {
		throw new $TypeError('Assertion failed: invalid `where` value; must be "start", "end", or "start+end"');
	}
	return T;
};

/* eslint global-require: 0 */
// https://ecma-international.org/ecma-262/11.0/#sec-abstract-operations
var ES2020$1 = {
	'Abstract Equality Comparison': AbstractEqualityComparison,
	'Abstract Relational Comparison': AbstractRelationalComparison,
	'Strict Equality Comparison': StrictEqualityComparison,
	abs: abs$4,
	AddEntriesFromIterable: AddEntriesFromIterable,
	AdvanceStringIndex: AdvanceStringIndex$1,
	ArrayCreate: ArrayCreate,
	ArraySetLength: ArraySetLength,
	ArraySpeciesCreate: ArraySpeciesCreate,
	BigInt: BigInt,
	BigIntBitwiseOp: BigIntBitwiseOp$3,
	BinaryAnd: BinaryAnd,
	BinaryOr: BinaryOr,
	BinaryXor: BinaryXor,
	Call: Call$7,
	CanonicalNumericIndexString: CanonicalNumericIndexString$1,
	CodePointAt: CodePointAt$2,
	CompletePropertyDescriptor: CompletePropertyDescriptor,
	CopyDataProperties: CopyDataProperties,
	CreateDataProperty: CreateDataProperty$1,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow$2,
	CreateHTML: CreateHTML,
	CreateIterResultObject: CreateIterResultObject,
	CreateListFromArrayLike: CreateListFromArrayLike,
	CreateMethodProperty: CreateMethodProperty,
	DateFromTime: DateFromTime$2,
	DateString: DateString,
	Day: Day$3,
	DayFromYear: DayFromYear$2,
	DaysInYear: DaysInYear$1,
	DayWithinYear: DayWithinYear$2,
	DefinePropertyOrThrow: DefinePropertyOrThrow$5,
	DeletePropertyOrThrow: DeletePropertyOrThrow,
	EnumerableOwnPropertyNames: EnumerableOwnPropertyNames,
	FlattenIntoArray: FlattenIntoArray,
	floor: floor$b,
	FromPropertyDescriptor: FromPropertyDescriptor$4,
	Get: Get$d,
	GetIterator: GetIterator$2,
	GetMethod: GetMethod$3,
	GetOwnPropertyKeys: GetOwnPropertyKeys,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor$1,
	GetSubstitution: GetSubstitution,
	GetV: GetV$2,
	HasOwnProperty: HasOwnProperty$1,
	HasProperty: HasProperty$1,
	HourFromTime: HourFromTime$1,
	InLeapYear: InLeapYear$2,
	InstanceofOperator: InstanceofOperator,
	Invoke: Invoke$1,
	IsAccessorDescriptor: IsAccessorDescriptor$6,
	IsArray: IsArray$d,
	IsBigIntElementType: IsBigIntElementType$1,
	IsCallable: IsCallable$7.exports,
	IsConcatSpreadable: IsConcatSpreadable,
	IsConstructor: IsConstructor$3.exports,
	IsDataDescriptor: IsDataDescriptor$9,
	IsExtensible: IsExtensible$5,
	IsGenericDescriptor: IsGenericDescriptor$2,
	IsInteger: IsInteger$9,
	IsNonNegativeInteger: IsNonNegativeInteger$1,
	IsNoTearConfiguration: IsNoTearConfiguration,
	IsPromise: IsPromise,
	IsPropertyKey: IsPropertyKey$i,
	IsRegExp: IsRegExp$1,
	IsStringPrefix: IsStringPrefix,
	IsUnclampedIntegerElementType: IsUnclampedIntegerElementType$1,
	IsUnsignedElementType: IsUnsignedElementType,
	IterableToList: IterableToList,
	IteratorClose: IteratorClose$1,
	IteratorComplete: IteratorComplete$1,
	IteratorNext: IteratorNext$1,
	IteratorStep: IteratorStep$2,
	IteratorValue: IteratorValue$2,
	LengthOfArrayLike: LengthOfArrayLike$2,
	MakeDate: MakeDate,
	MakeDay: MakeDay,
	MakeTime: MakeTime,
	MinFromTime: MinFromTime$1,
	modulo: modulo$b,
	MonthFromTime: MonthFromTime$3,
	msFromTime: msFromTime,
	Number: _Number,
	NumberBitwiseOp: NumberBitwiseOp$3,
	NumberToBigInt: NumberToBigInt,
	OrdinaryCreateFromConstructor: OrdinaryCreateFromConstructor,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty$1,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty$2,
	OrdinaryGetPrototypeOf: OrdinaryGetPrototypeOf$1,
	OrdinaryHasInstance: OrdinaryHasInstance$1,
	OrdinaryHasProperty: OrdinaryHasProperty,
	OrdinaryObjectCreate: OrdinaryObjectCreate$1,
	OrdinarySetPrototypeOf: OrdinarySetPrototypeOf,
	PromiseResolve: PromiseResolve,
	QuoteJSONString: QuoteJSONString,
	RegExpCreate: RegExpCreate,
	RegExpExec: RegExpExec,
	RequireObjectCoercible: RequireObjectCoercible$3.exports,
	SameValue: SameValue$a,
	SameValueNonNumeric: SameValueNonNumeric,
	SameValueZero: SameValueZero,
	SecFromTime: SecFromTime$1,
	Set: _Set,
	SetFunctionLength: SetFunctionLength,
	SetFunctionName: SetFunctionName,
	SetIntegrityLevel: SetIntegrityLevel,
	SpeciesConstructor: SpeciesConstructor,
	SplitMatch: SplitMatch,
	StringCreate: StringCreate,
	StringGetOwnProperty: StringGetOwnProperty,
	StringPad: StringPad$1,
	SymbolDescriptiveString: SymbolDescriptiveString,
	TestIntegrityLevel: TestIntegrityLevel,
	thisBigIntValue: thisBigIntValue,
	thisBooleanValue: thisBooleanValue,
	thisNumberValue: thisNumberValue,
	thisStringValue: thisStringValue,
	thisSymbolValue: thisSymbolValue,
	thisTimeValue: thisTimeValue.exports,
	TimeClip: TimeClip,
	TimeFromYear: TimeFromYear,
	TimeString: TimeString,
	TimeWithinDay: TimeWithinDay,
	ToBoolean: ToBoolean$5,
	ToDateString: ToDateString,
	ToIndex: ToIndex,
	ToInt16: ToInt16,
	ToInt32: ToInt32$5,
	ToInt8: ToInt8,
	ToInteger: ToInteger$4,
	ToLength: ToLength$3,
	ToNumber: ToNumber$d,
	ToNumeric: ToNumeric,
	ToObject: ToObject$3,
	ToPrimitive: ToPrimitive$5,
	ToPropertyDescriptor: ToPropertyDescriptor$5,
	ToPropertyKey: ToPropertyKey,
	ToString: ToString$a,
	ToUint16: ToUint16$1,
	ToUint32: ToUint32$5,
	ToUint8: ToUint8$1,
	ToUint8Clamp: ToUint8Clamp,
	TrimString: TrimString,
	Type: Type$1M,
	UnicodeEscape: UnicodeEscape$1,
	UTF16DecodeString: UTF16DecodeString$1,
	UTF16DecodeSurrogatePair: UTF16DecodeSurrogatePair$1,
	UTF16Encoding: UTF16Encoding$1,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor$1,
	WeekDay: WeekDay$1,
	YearFromTime: YearFromTime$4
};

var es2020 = ES2020$1;

var assign = assign$7;

var ES5 = es5;
var ES2015 = es2015;
var ES2016 = es2016;
var ES2017 = es2017;
var ES2018 = es2018;
var ES2019 = es2019;
var ES2020 = es2020;

var ES = {
	ES5: ES5,
	ES6: ES2015,
	ES2015: ES2015,
	ES7: ES2016,
	ES2016: ES2016,
	ES2017: ES2017,
	ES2018: ES2018,
	ES2019: ES2019,
	ES2020: ES2020
};
assign(ES, ES5);
delete ES.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible
assign(ES, ES2015);

var esAbstract = ES;

export { esAbstract as default };
