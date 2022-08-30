import Buffer from '../../buffer/dist/index.js'
var util = {};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
var isArray_1 = util.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
var isBoolean_1 = util.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
var isNull_1 = util.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
var isNullOrUndefined_1 = util.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
var isNumber_1 = util.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
var isString_1 = util.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
var isSymbol_1 = util.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
var isUndefined_1 = util.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
var isRegExp_1 = util.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
var isObject_1 = util.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
var isDate_1 = util.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
var isError_1 = util.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
var isFunction_1 = util.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
var isPrimitive_1 = util.isPrimitive = isPrimitive;
var isBuffer = util.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

export { util as default, isArray_1 as isArray, isBoolean_1 as isBoolean, isBuffer, isDate_1 as isDate, isError_1 as isError, isFunction_1 as isFunction, isNull_1 as isNull, isNullOrUndefined_1 as isNullOrUndefined, isNumber_1 as isNumber, isObject_1 as isObject, isPrimitive_1 as isPrimitive, isRegExp_1 as isRegExp, isString_1 as isString, isSymbol_1 as isSymbol, isUndefined_1 as isUndefined };
