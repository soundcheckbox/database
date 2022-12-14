import { from } from './base.js'

const alphabet = Array.from('๐๐ชโ๐ฐ๐๐๐๐๐๐๐๐๐๐๐๐๐โ๐ป๐ฅ๐พ๐ฟ๐โค๐๐คฃ๐๐๐๐ญ๐๐๐๐๐๐ฅ๐ฅฐ๐๐๐๐ข๐ค๐๐๐ช๐โบ๐๐ค๐๐๐๐๐น๐คฆ๐๐โโจ๐คท๐ฑ๐๐ธ๐๐๐๐๐๐๐๐๐คฉ๐๐๐ค๐๐ฏ๐๐๐ถ๐๐คญโฃ๐๐๐๐ช๐๐ฅ๐๐๐ฉ๐ก๐คช๐๐ฅณ๐ฅ๐คค๐๐๐ณโ๐๐๐ด๐๐ฌ๐๐๐ท๐ป๐โญโ๐ฅบ๐๐๐ค๐ฆโ๐ฃ๐๐โน๐๐๐ โ๐๐บ๐๐ป๐๐๐๐๐น๐ฃ๐ซ๐๐๐ต๐ค๐๐ด๐ค๐ผ๐ซโฝ๐คโ๐๐คซ๐๐ฎ๐๐ป๐๐ถ๐๐ฒ๐ฟ๐งก๐โก๐๐โโ๐๐ฐ๐คจ๐ถ๐ค๐ถ๐ฐ๐๐ข๐ค๐๐จ๐จ๐คฌโ๐๐บ๐ค๐๐๐ฑ๐๐ถ๐ฅดโถโกโ๐๐ธโฌ๐จ๐๐ฆ๐ท๐บโ ๐๐๐ต๐๐คฒ๐ค ๐คง๐๐ต๐๐ง๐พ๐๐๐ค๐๐คฏ๐ทโ๐ง๐ฏ๐๐๐ค๐๐โ๐ด๐ฃ๐ธ๐๐๐ฅ๐คข๐๐ก๐ฉ๐๐ธ๐ป๐ค๐คฎ๐ผ๐ฅต๐ฉ๐๐๐ผ๐๐ฃ๐ฅ')
const alphabetBytesToChars = /** @type {string[]} */ (alphabet.reduce((p, c, i) => { p[i] = c; return p }, /** @type {string[]} */([])))
const alphabetCharsToBytes = /** @type {number[]} */ (alphabet.reduce((p, c, i) => { p[/** @type {number} */ (c.codePointAt(0))] = i; return p }, /** @type {number[]} */([])))

/**
 * @param {Uint8Array} data
 * @returns {string}
 */
function encode (data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c]
    return p
  }, '')
}

/**
 * @param {string} str
 * @returns {Uint8Array}
 */
function decode (str) {
  const byts = []
  for (const char of str) {
    const byt = alphabetCharsToBytes[/** @type {number} */ (char.codePointAt(0))]
    if (byt === undefined) {
      throw new Error(`Non-base256emoji character: ${char}`)
    }
    byts.push(byt)
  }
  return new Uint8Array(byts)
}

export const base256emoji = from({
  prefix: '๐',
  name: 'base256emoji',
  encode,
  decode
})
