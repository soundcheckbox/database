/**
 * Returns a new Uint8Array created by concatenating the passed ArrayLikes
 *
 * @param {Array<ArrayLike<number>>} arrays
 * @param {number} [length]
 */
function concat (arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }

  const output = new Uint8Array(length);
  let offset = 0;

  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }

  return output
}

var concat_1 = concat;

export {concat}
export { concat_1 as default };
