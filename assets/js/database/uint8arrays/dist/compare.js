/**
 * Can be used with Array.sort to sort and array with Uint8Array entries
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
function compare (a, b) {
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i]) {
      return -1
    }

    if (a[i] > b[i]) {
      return 1
    }
  }

  if (a.byteLength > b.byteLength) {
    return 1
  }

  if (a.byteLength < b.byteLength) {
    return -1
  }

  return 0
}

var compare_1 = compare;

export { compare_1 as default };
