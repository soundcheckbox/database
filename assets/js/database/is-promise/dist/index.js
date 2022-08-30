var isPromise_1 = isPromise;

function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

export { isPromise_1 as default };
