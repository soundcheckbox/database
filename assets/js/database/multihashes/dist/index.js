import require$$0 from '../../multibase/dist/index.js';
import require$$1 from '../../varint/dist/index.js';
import require$$3 from '../../uint8arrays/dist/to-string.js';
import require$$4 from '../../uint8arrays/dist/from-string.js';
import require$$5 from '../../uint8arrays/dist/concat.js';

/* eslint quote-props: off */

/**
 * Names for all available hashes
 *
 * @typedef { "identity" | "sha1" | "sha2-256" | "sha2-512" | "sha3-512" | "sha3-384" | "sha3-256" | "sha3-224" | "shake-128" | "shake-256" | "keccak-224" | "keccak-256" | "keccak-384" | "keccak-512" | "blake3" | "murmur3-128" | "murmur3-32" | "dbl-sha2-256" | "md4" | "md5" | "bmt" | "sha2-256-trunc254-padded" | "ripemd-128" | "ripemd-160" | "ripemd-256" | "ripemd-320" | "x11" | "kangarootwelve" | "sm3-256" | "blake2b-8" | "blake2b-16" | "blake2b-24" | "blake2b-32" | "blake2b-40" | "blake2b-48" | "blake2b-56" | "blake2b-64" | "blake2b-72" | "blake2b-80" | "blake2b-88" | "blake2b-96" | "blake2b-104" | "blake2b-112" | "blake2b-120" | "blake2b-128" | "blake2b-136" | "blake2b-144" | "blake2b-152" | "blake2b-160" | "blake2b-168" | "blake2b-176" | "blake2b-184" | "blake2b-192" | "blake2b-200" | "blake2b-208" | "blake2b-216" | "blake2b-224" | "blake2b-232" | "blake2b-240" | "blake2b-248" | "blake2b-256" | "blake2b-264" | "blake2b-272" | "blake2b-280" | "blake2b-288" | "blake2b-296" | "blake2b-304" | "blake2b-312" | "blake2b-320" | "blake2b-328" | "blake2b-336" | "blake2b-344" | "blake2b-352" | "blake2b-360" | "blake2b-368" | "blake2b-376" | "blake2b-384" | "blake2b-392" | "blake2b-400" | "blake2b-408" | "blake2b-416" | "blake2b-424" | "blake2b-432" | "blake2b-440" | "blake2b-448" | "blake2b-456" | "blake2b-464" | "blake2b-472" | "blake2b-480" | "blake2b-488" | "blake2b-496" | "blake2b-504" | "blake2b-512" | "blake2s-8" | "blake2s-16" | "blake2s-24" | "blake2s-32" | "blake2s-40" | "blake2s-48" | "blake2s-56" | "blake2s-64" | "blake2s-72" | "blake2s-80" | "blake2s-88" | "blake2s-96" | "blake2s-104" | "blake2s-112" | "blake2s-120" | "blake2s-128" | "blake2s-136" | "blake2s-144" | "blake2s-152" | "blake2s-160" | "blake2s-168" | "blake2s-176" | "blake2s-184" | "blake2s-192" | "blake2s-200" | "blake2s-208" | "blake2s-216" | "blake2s-224" | "blake2s-232" | "blake2s-240" | "blake2s-248" | "blake2s-256" | "skein256-8" | "skein256-16" | "skein256-24" | "skein256-32" | "skein256-40" | "skein256-48" | "skein256-56" | "skein256-64" | "skein256-72" | "skein256-80" | "skein256-88" | "skein256-96" | "skein256-104" | "skein256-112" | "skein256-120" | "skein256-128" | "skein256-136" | "skein256-144" | "skein256-152" | "skein256-160" | "skein256-168" | "skein256-176" | "skein256-184" | "skein256-192" | "skein256-200" | "skein256-208" | "skein256-216" | "skein256-224" | "skein256-232" | "skein256-240" | "skein256-248" | "skein256-256" | "skein512-8" | "skein512-16" | "skein512-24" | "skein512-32" | "skein512-40" | "skein512-48" | "skein512-56" | "skein512-64" | "skein512-72" | "skein512-80" | "skein512-88" | "skein512-96" | "skein512-104" | "skein512-112" | "skein512-120" | "skein512-128" | "skein512-136" | "skein512-144" | "skein512-152" | "skein512-160" | "skein512-168" | "skein512-176" | "skein512-184" | "skein512-192" | "skein512-200" | "skein512-208" | "skein512-216" | "skein512-224" | "skein512-232" | "skein512-240" | "skein512-248" | "skein512-256" | "skein512-264" | "skein512-272" | "skein512-280" | "skein512-288" | "skein512-296" | "skein512-304" | "skein512-312" | "skein512-320" | "skein512-328" | "skein512-336" | "skein512-344" | "skein512-352" | "skein512-360" | "skein512-368" | "skein512-376" | "skein512-384" | "skein512-392" | "skein512-400" | "skein512-408" | "skein512-416" | "skein512-424" | "skein512-432" | "skein512-440" | "skein512-448" | "skein512-456" | "skein512-464" | "skein512-472" | "skein512-480" | "skein512-488" | "skein512-496" | "skein512-504" | "skein512-512" | "skein1024-8" | "skein1024-16" | "skein1024-24" | "skein1024-32" | "skein1024-40" | "skein1024-48" | "skein1024-56" | "skein1024-64" | "skein1024-72" | "skein1024-80" | "skein1024-88" | "skein1024-96" | "skein1024-104" | "skein1024-112" | "skein1024-120" | "skein1024-128" | "skein1024-136" | "skein1024-144" | "skein1024-152" | "skein1024-160" | "skein1024-168" | "skein1024-176" | "skein1024-184" | "skein1024-192" | "skein1024-200" | "skein1024-208" | "skein1024-216" | "skein1024-224" | "skein1024-232" | "skein1024-240" | "skein1024-248" | "skein1024-256" | "skein1024-264" | "skein1024-272" | "skein1024-280" | "skein1024-288" | "skein1024-296" | "skein1024-304" | "skein1024-312" | "skein1024-320" | "skein1024-328" | "skein1024-336" | "skein1024-344" | "skein1024-352" | "skein1024-360" | "skein1024-368" | "skein1024-376" | "skein1024-384" | "skein1024-392" | "skein1024-400" | "skein1024-408" | "skein1024-416" | "skein1024-424" | "skein1024-432" | "skein1024-440" | "skein1024-448" | "skein1024-456" | "skein1024-464" | "skein1024-472" | "skein1024-480" | "skein1024-488" | "skein1024-496" | "skein1024-504" | "skein1024-512" | "skein1024-520" | "skein1024-528" | "skein1024-536" | "skein1024-544" | "skein1024-552" | "skein1024-560" | "skein1024-568" | "skein1024-576" | "skein1024-584" | "skein1024-592" | "skein1024-600" | "skein1024-608" | "skein1024-616" | "skein1024-624" | "skein1024-632" | "skein1024-640" | "skein1024-648" | "skein1024-656" | "skein1024-664" | "skein1024-672" | "skein1024-680" | "skein1024-688" | "skein1024-696" | "skein1024-704" | "skein1024-712" | "skein1024-720" | "skein1024-728" | "skein1024-736" | "skein1024-744" | "skein1024-752" | "skein1024-760" | "skein1024-768" | "skein1024-776" | "skein1024-784" | "skein1024-792" | "skein1024-800" | "skein1024-808" | "skein1024-816" | "skein1024-824" | "skein1024-832" | "skein1024-840" | "skein1024-848" | "skein1024-856" | "skein1024-864" | "skein1024-872" | "skein1024-880" | "skein1024-888" | "skein1024-896" | "skein1024-904" | "skein1024-912" | "skein1024-920" | "skein1024-928" | "skein1024-936" | "skein1024-944" | "skein1024-952" | "skein1024-960" | "skein1024-968" | "skein1024-976" | "skein1024-984" | "skein1024-992" | "skein1024-1000" | "skein1024-1008" | "skein1024-1016" | "skein1024-1024" | "poseidon-bls12_381-a2-fc1" | "poseidon-bls12_381-a2-fc1-sc" } HashName
 */
/**
 * Codes for all available hashes
 *
 * @typedef { 0x00 | 0x11 | 0x12 | 0x13 | 0x14 | 0x15 | 0x16 | 0x17 | 0x18 | 0x19 | 0x1a | 0x1b | 0x1c | 0x1d | 0x1e | 0x22 | 0x23 | 0x56 | 0xd4 | 0xd5 | 0xd6 | 0x1012 | 0x1052 | 0x1053 | 0x1054 | 0x1055 | 0x1100 | 0x1d01 | 0x534d | 0xb201 | 0xb202 | 0xb203 | 0xb204 | 0xb205 | 0xb206 | 0xb207 | 0xb208 | 0xb209 | 0xb20a | 0xb20b | 0xb20c | 0xb20d | 0xb20e | 0xb20f | 0xb210 | 0xb211 | 0xb212 | 0xb213 | 0xb214 | 0xb215 | 0xb216 | 0xb217 | 0xb218 | 0xb219 | 0xb21a | 0xb21b | 0xb21c | 0xb21d | 0xb21e | 0xb21f | 0xb220 | 0xb221 | 0xb222 | 0xb223 | 0xb224 | 0xb225 | 0xb226 | 0xb227 | 0xb228 | 0xb229 | 0xb22a | 0xb22b | 0xb22c | 0xb22d | 0xb22e | 0xb22f | 0xb230 | 0xb231 | 0xb232 | 0xb233 | 0xb234 | 0xb235 | 0xb236 | 0xb237 | 0xb238 | 0xb239 | 0xb23a | 0xb23b | 0xb23c | 0xb23d | 0xb23e | 0xb23f | 0xb240 | 0xb241 | 0xb242 | 0xb243 | 0xb244 | 0xb245 | 0xb246 | 0xb247 | 0xb248 | 0xb249 | 0xb24a | 0xb24b | 0xb24c | 0xb24d | 0xb24e | 0xb24f | 0xb250 | 0xb251 | 0xb252 | 0xb253 | 0xb254 | 0xb255 | 0xb256 | 0xb257 | 0xb258 | 0xb259 | 0xb25a | 0xb25b | 0xb25c | 0xb25d | 0xb25e | 0xb25f | 0xb260 | 0xb301 | 0xb302 | 0xb303 | 0xb304 | 0xb305 | 0xb306 | 0xb307 | 0xb308 | 0xb309 | 0xb30a | 0xb30b | 0xb30c | 0xb30d | 0xb30e | 0xb30f | 0xb310 | 0xb311 | 0xb312 | 0xb313 | 0xb314 | 0xb315 | 0xb316 | 0xb317 | 0xb318 | 0xb319 | 0xb31a | 0xb31b | 0xb31c | 0xb31d | 0xb31e | 0xb31f | 0xb320 | 0xb321 | 0xb322 | 0xb323 | 0xb324 | 0xb325 | 0xb326 | 0xb327 | 0xb328 | 0xb329 | 0xb32a | 0xb32b | 0xb32c | 0xb32d | 0xb32e | 0xb32f | 0xb330 | 0xb331 | 0xb332 | 0xb333 | 0xb334 | 0xb335 | 0xb336 | 0xb337 | 0xb338 | 0xb339 | 0xb33a | 0xb33b | 0xb33c | 0xb33d | 0xb33e | 0xb33f | 0xb340 | 0xb341 | 0xb342 | 0xb343 | 0xb344 | 0xb345 | 0xb346 | 0xb347 | 0xb348 | 0xb349 | 0xb34a | 0xb34b | 0xb34c | 0xb34d | 0xb34e | 0xb34f | 0xb350 | 0xb351 | 0xb352 | 0xb353 | 0xb354 | 0xb355 | 0xb356 | 0xb357 | 0xb358 | 0xb359 | 0xb35a | 0xb35b | 0xb35c | 0xb35d | 0xb35e | 0xb35f | 0xb360 | 0xb361 | 0xb362 | 0xb363 | 0xb364 | 0xb365 | 0xb366 | 0xb367 | 0xb368 | 0xb369 | 0xb36a | 0xb36b | 0xb36c | 0xb36d | 0xb36e | 0xb36f | 0xb370 | 0xb371 | 0xb372 | 0xb373 | 0xb374 | 0xb375 | 0xb376 | 0xb377 | 0xb378 | 0xb379 | 0xb37a | 0xb37b | 0xb37c | 0xb37d | 0xb37e | 0xb37f | 0xb380 | 0xb381 | 0xb382 | 0xb383 | 0xb384 | 0xb385 | 0xb386 | 0xb387 | 0xb388 | 0xb389 | 0xb38a | 0xb38b | 0xb38c | 0xb38d | 0xb38e | 0xb38f | 0xb390 | 0xb391 | 0xb392 | 0xb393 | 0xb394 | 0xb395 | 0xb396 | 0xb397 | 0xb398 | 0xb399 | 0xb39a | 0xb39b | 0xb39c | 0xb39d | 0xb39e | 0xb39f | 0xb3a0 | 0xb3a1 | 0xb3a2 | 0xb3a3 | 0xb3a4 | 0xb3a5 | 0xb3a6 | 0xb3a7 | 0xb3a8 | 0xb3a9 | 0xb3aa | 0xb3ab | 0xb3ac | 0xb3ad | 0xb3ae | 0xb3af | 0xb3b0 | 0xb3b1 | 0xb3b2 | 0xb3b3 | 0xb3b4 | 0xb3b5 | 0xb3b6 | 0xb3b7 | 0xb3b8 | 0xb3b9 | 0xb3ba | 0xb3bb | 0xb3bc | 0xb3bd | 0xb3be | 0xb3bf | 0xb3c0 | 0xb3c1 | 0xb3c2 | 0xb3c3 | 0xb3c4 | 0xb3c5 | 0xb3c6 | 0xb3c7 | 0xb3c8 | 0xb3c9 | 0xb3ca | 0xb3cb | 0xb3cc | 0xb3cd | 0xb3ce | 0xb3cf | 0xb3d0 | 0xb3d1 | 0xb3d2 | 0xb3d3 | 0xb3d4 | 0xb3d5 | 0xb3d6 | 0xb3d7 | 0xb3d8 | 0xb3d9 | 0xb3da | 0xb3db | 0xb3dc | 0xb3dd | 0xb3de | 0xb3df | 0xb3e0 | 0xb401 | 0xb402 } HashCode
 */

/**
 * @type { Record<HashName,HashCode> }
 */
const names$1 = Object.freeze({
  'identity': 0x00,
  'sha1': 0x11,
  'sha2-256': 0x12,
  'sha2-512': 0x13,
  'sha3-512': 0x14,
  'sha3-384': 0x15,
  'sha3-256': 0x16,
  'sha3-224': 0x17,
  'shake-128': 0x18,
  'shake-256': 0x19,
  'keccak-224': 0x1a,
  'keccak-256': 0x1b,
  'keccak-384': 0x1c,
  'keccak-512': 0x1d,
  'blake3': 0x1e,
  'murmur3-128': 0x22,
  'murmur3-32': 0x23,
  'dbl-sha2-256': 0x56,
  'md4': 0xd4,
  'md5': 0xd5,
  'bmt': 0xd6,
  'sha2-256-trunc254-padded': 0x1012,
  'ripemd-128': 0x1052,
  'ripemd-160': 0x1053,
  'ripemd-256': 0x1054,
  'ripemd-320': 0x1055,
  'x11': 0x1100,
  'kangarootwelve': 0x1d01,
  'sm3-256': 0x534d,
  'blake2b-8': 0xb201,
  'blake2b-16': 0xb202,
  'blake2b-24': 0xb203,
  'blake2b-32': 0xb204,
  'blake2b-40': 0xb205,
  'blake2b-48': 0xb206,
  'blake2b-56': 0xb207,
  'blake2b-64': 0xb208,
  'blake2b-72': 0xb209,
  'blake2b-80': 0xb20a,
  'blake2b-88': 0xb20b,
  'blake2b-96': 0xb20c,
  'blake2b-104': 0xb20d,
  'blake2b-112': 0xb20e,
  'blake2b-120': 0xb20f,
  'blake2b-128': 0xb210,
  'blake2b-136': 0xb211,
  'blake2b-144': 0xb212,
  'blake2b-152': 0xb213,
  'blake2b-160': 0xb214,
  'blake2b-168': 0xb215,
  'blake2b-176': 0xb216,
  'blake2b-184': 0xb217,
  'blake2b-192': 0xb218,
  'blake2b-200': 0xb219,
  'blake2b-208': 0xb21a,
  'blake2b-216': 0xb21b,
  'blake2b-224': 0xb21c,
  'blake2b-232': 0xb21d,
  'blake2b-240': 0xb21e,
  'blake2b-248': 0xb21f,
  'blake2b-256': 0xb220,
  'blake2b-264': 0xb221,
  'blake2b-272': 0xb222,
  'blake2b-280': 0xb223,
  'blake2b-288': 0xb224,
  'blake2b-296': 0xb225,
  'blake2b-304': 0xb226,
  'blake2b-312': 0xb227,
  'blake2b-320': 0xb228,
  'blake2b-328': 0xb229,
  'blake2b-336': 0xb22a,
  'blake2b-344': 0xb22b,
  'blake2b-352': 0xb22c,
  'blake2b-360': 0xb22d,
  'blake2b-368': 0xb22e,
  'blake2b-376': 0xb22f,
  'blake2b-384': 0xb230,
  'blake2b-392': 0xb231,
  'blake2b-400': 0xb232,
  'blake2b-408': 0xb233,
  'blake2b-416': 0xb234,
  'blake2b-424': 0xb235,
  'blake2b-432': 0xb236,
  'blake2b-440': 0xb237,
  'blake2b-448': 0xb238,
  'blake2b-456': 0xb239,
  'blake2b-464': 0xb23a,
  'blake2b-472': 0xb23b,
  'blake2b-480': 0xb23c,
  'blake2b-488': 0xb23d,
  'blake2b-496': 0xb23e,
  'blake2b-504': 0xb23f,
  'blake2b-512': 0xb240,
  'blake2s-8': 0xb241,
  'blake2s-16': 0xb242,
  'blake2s-24': 0xb243,
  'blake2s-32': 0xb244,
  'blake2s-40': 0xb245,
  'blake2s-48': 0xb246,
  'blake2s-56': 0xb247,
  'blake2s-64': 0xb248,
  'blake2s-72': 0xb249,
  'blake2s-80': 0xb24a,
  'blake2s-88': 0xb24b,
  'blake2s-96': 0xb24c,
  'blake2s-104': 0xb24d,
  'blake2s-112': 0xb24e,
  'blake2s-120': 0xb24f,
  'blake2s-128': 0xb250,
  'blake2s-136': 0xb251,
  'blake2s-144': 0xb252,
  'blake2s-152': 0xb253,
  'blake2s-160': 0xb254,
  'blake2s-168': 0xb255,
  'blake2s-176': 0xb256,
  'blake2s-184': 0xb257,
  'blake2s-192': 0xb258,
  'blake2s-200': 0xb259,
  'blake2s-208': 0xb25a,
  'blake2s-216': 0xb25b,
  'blake2s-224': 0xb25c,
  'blake2s-232': 0xb25d,
  'blake2s-240': 0xb25e,
  'blake2s-248': 0xb25f,
  'blake2s-256': 0xb260,
  'skein256-8': 0xb301,
  'skein256-16': 0xb302,
  'skein256-24': 0xb303,
  'skein256-32': 0xb304,
  'skein256-40': 0xb305,
  'skein256-48': 0xb306,
  'skein256-56': 0xb307,
  'skein256-64': 0xb308,
  'skein256-72': 0xb309,
  'skein256-80': 0xb30a,
  'skein256-88': 0xb30b,
  'skein256-96': 0xb30c,
  'skein256-104': 0xb30d,
  'skein256-112': 0xb30e,
  'skein256-120': 0xb30f,
  'skein256-128': 0xb310,
  'skein256-136': 0xb311,
  'skein256-144': 0xb312,
  'skein256-152': 0xb313,
  'skein256-160': 0xb314,
  'skein256-168': 0xb315,
  'skein256-176': 0xb316,
  'skein256-184': 0xb317,
  'skein256-192': 0xb318,
  'skein256-200': 0xb319,
  'skein256-208': 0xb31a,
  'skein256-216': 0xb31b,
  'skein256-224': 0xb31c,
  'skein256-232': 0xb31d,
  'skein256-240': 0xb31e,
  'skein256-248': 0xb31f,
  'skein256-256': 0xb320,
  'skein512-8': 0xb321,
  'skein512-16': 0xb322,
  'skein512-24': 0xb323,
  'skein512-32': 0xb324,
  'skein512-40': 0xb325,
  'skein512-48': 0xb326,
  'skein512-56': 0xb327,
  'skein512-64': 0xb328,
  'skein512-72': 0xb329,
  'skein512-80': 0xb32a,
  'skein512-88': 0xb32b,
  'skein512-96': 0xb32c,
  'skein512-104': 0xb32d,
  'skein512-112': 0xb32e,
  'skein512-120': 0xb32f,
  'skein512-128': 0xb330,
  'skein512-136': 0xb331,
  'skein512-144': 0xb332,
  'skein512-152': 0xb333,
  'skein512-160': 0xb334,
  'skein512-168': 0xb335,
  'skein512-176': 0xb336,
  'skein512-184': 0xb337,
  'skein512-192': 0xb338,
  'skein512-200': 0xb339,
  'skein512-208': 0xb33a,
  'skein512-216': 0xb33b,
  'skein512-224': 0xb33c,
  'skein512-232': 0xb33d,
  'skein512-240': 0xb33e,
  'skein512-248': 0xb33f,
  'skein512-256': 0xb340,
  'skein512-264': 0xb341,
  'skein512-272': 0xb342,
  'skein512-280': 0xb343,
  'skein512-288': 0xb344,
  'skein512-296': 0xb345,
  'skein512-304': 0xb346,
  'skein512-312': 0xb347,
  'skein512-320': 0xb348,
  'skein512-328': 0xb349,
  'skein512-336': 0xb34a,
  'skein512-344': 0xb34b,
  'skein512-352': 0xb34c,
  'skein512-360': 0xb34d,
  'skein512-368': 0xb34e,
  'skein512-376': 0xb34f,
  'skein512-384': 0xb350,
  'skein512-392': 0xb351,
  'skein512-400': 0xb352,
  'skein512-408': 0xb353,
  'skein512-416': 0xb354,
  'skein512-424': 0xb355,
  'skein512-432': 0xb356,
  'skein512-440': 0xb357,
  'skein512-448': 0xb358,
  'skein512-456': 0xb359,
  'skein512-464': 0xb35a,
  'skein512-472': 0xb35b,
  'skein512-480': 0xb35c,
  'skein512-488': 0xb35d,
  'skein512-496': 0xb35e,
  'skein512-504': 0xb35f,
  'skein512-512': 0xb360,
  'skein1024-8': 0xb361,
  'skein1024-16': 0xb362,
  'skein1024-24': 0xb363,
  'skein1024-32': 0xb364,
  'skein1024-40': 0xb365,
  'skein1024-48': 0xb366,
  'skein1024-56': 0xb367,
  'skein1024-64': 0xb368,
  'skein1024-72': 0xb369,
  'skein1024-80': 0xb36a,
  'skein1024-88': 0xb36b,
  'skein1024-96': 0xb36c,
  'skein1024-104': 0xb36d,
  'skein1024-112': 0xb36e,
  'skein1024-120': 0xb36f,
  'skein1024-128': 0xb370,
  'skein1024-136': 0xb371,
  'skein1024-144': 0xb372,
  'skein1024-152': 0xb373,
  'skein1024-160': 0xb374,
  'skein1024-168': 0xb375,
  'skein1024-176': 0xb376,
  'skein1024-184': 0xb377,
  'skein1024-192': 0xb378,
  'skein1024-200': 0xb379,
  'skein1024-208': 0xb37a,
  'skein1024-216': 0xb37b,
  'skein1024-224': 0xb37c,
  'skein1024-232': 0xb37d,
  'skein1024-240': 0xb37e,
  'skein1024-248': 0xb37f,
  'skein1024-256': 0xb380,
  'skein1024-264': 0xb381,
  'skein1024-272': 0xb382,
  'skein1024-280': 0xb383,
  'skein1024-288': 0xb384,
  'skein1024-296': 0xb385,
  'skein1024-304': 0xb386,
  'skein1024-312': 0xb387,
  'skein1024-320': 0xb388,
  'skein1024-328': 0xb389,
  'skein1024-336': 0xb38a,
  'skein1024-344': 0xb38b,
  'skein1024-352': 0xb38c,
  'skein1024-360': 0xb38d,
  'skein1024-368': 0xb38e,
  'skein1024-376': 0xb38f,
  'skein1024-384': 0xb390,
  'skein1024-392': 0xb391,
  'skein1024-400': 0xb392,
  'skein1024-408': 0xb393,
  'skein1024-416': 0xb394,
  'skein1024-424': 0xb395,
  'skein1024-432': 0xb396,
  'skein1024-440': 0xb397,
  'skein1024-448': 0xb398,
  'skein1024-456': 0xb399,
  'skein1024-464': 0xb39a,
  'skein1024-472': 0xb39b,
  'skein1024-480': 0xb39c,
  'skein1024-488': 0xb39d,
  'skein1024-496': 0xb39e,
  'skein1024-504': 0xb39f,
  'skein1024-512': 0xb3a0,
  'skein1024-520': 0xb3a1,
  'skein1024-528': 0xb3a2,
  'skein1024-536': 0xb3a3,
  'skein1024-544': 0xb3a4,
  'skein1024-552': 0xb3a5,
  'skein1024-560': 0xb3a6,
  'skein1024-568': 0xb3a7,
  'skein1024-576': 0xb3a8,
  'skein1024-584': 0xb3a9,
  'skein1024-592': 0xb3aa,
  'skein1024-600': 0xb3ab,
  'skein1024-608': 0xb3ac,
  'skein1024-616': 0xb3ad,
  'skein1024-624': 0xb3ae,
  'skein1024-632': 0xb3af,
  'skein1024-640': 0xb3b0,
  'skein1024-648': 0xb3b1,
  'skein1024-656': 0xb3b2,
  'skein1024-664': 0xb3b3,
  'skein1024-672': 0xb3b4,
  'skein1024-680': 0xb3b5,
  'skein1024-688': 0xb3b6,
  'skein1024-696': 0xb3b7,
  'skein1024-704': 0xb3b8,
  'skein1024-712': 0xb3b9,
  'skein1024-720': 0xb3ba,
  'skein1024-728': 0xb3bb,
  'skein1024-736': 0xb3bc,
  'skein1024-744': 0xb3bd,
  'skein1024-752': 0xb3be,
  'skein1024-760': 0xb3bf,
  'skein1024-768': 0xb3c0,
  'skein1024-776': 0xb3c1,
  'skein1024-784': 0xb3c2,
  'skein1024-792': 0xb3c3,
  'skein1024-800': 0xb3c4,
  'skein1024-808': 0xb3c5,
  'skein1024-816': 0xb3c6,
  'skein1024-824': 0xb3c7,
  'skein1024-832': 0xb3c8,
  'skein1024-840': 0xb3c9,
  'skein1024-848': 0xb3ca,
  'skein1024-856': 0xb3cb,
  'skein1024-864': 0xb3cc,
  'skein1024-872': 0xb3cd,
  'skein1024-880': 0xb3ce,
  'skein1024-888': 0xb3cf,
  'skein1024-896': 0xb3d0,
  'skein1024-904': 0xb3d1,
  'skein1024-912': 0xb3d2,
  'skein1024-920': 0xb3d3,
  'skein1024-928': 0xb3d4,
  'skein1024-936': 0xb3d5,
  'skein1024-944': 0xb3d6,
  'skein1024-952': 0xb3d7,
  'skein1024-960': 0xb3d8,
  'skein1024-968': 0xb3d9,
  'skein1024-976': 0xb3da,
  'skein1024-984': 0xb3db,
  'skein1024-992': 0xb3dc,
  'skein1024-1000': 0xb3dd,
  'skein1024-1008': 0xb3de,
  'skein1024-1016': 0xb3df,
  'skein1024-1024': 0xb3e0,
  'poseidon-bls12_381-a2-fc1': 0xb401,
  'poseidon-bls12_381-a2-fc1-sc': 0xb402
});

var constants = { names: names$1 };

/**
 * Multihash implementation in JavaScript.
 */

const multibase = require$$0;
const varint = require$$1;
const { names } = constants;
const uint8ArrayToString = require$$3;
const uint8ArrayFromString = require$$4;
const uint8ArrayConcat = require$$5;

const codes = /** @type {import('./types').CodeNameMap} */({});

// eslint-disable-next-line guard-for-in
for (const key in names) {
  const name = /** @type {HashName} */(key);
  codes[names[name]] = name;
}
Object.freeze(codes);

/**
 * Convert the given multihash to a hex encoded string.
 *
 * @param {Uint8Array} hash
 * @returns {string}
 */
function toHexString (hash) {
  if (!(hash instanceof Uint8Array)) {
    throw new Error('must be passed a Uint8Array')
  }

  return uint8ArrayToString(hash, 'base16')
}

/**
 * Convert the given hex encoded string to a multihash.
 *
 * @param {string} hash
 * @returns {Uint8Array}
 */
function fromHexString (hash) {
  return uint8ArrayFromString(hash, 'base16')
}

/**
 * Convert the given multihash to a base58 encoded string.
 *
 * @param {Uint8Array} hash
 * @returns {string}
 */
function toB58String (hash) {
  if (!(hash instanceof Uint8Array)) {
    throw new Error('must be passed a Uint8Array')
  }

  return uint8ArrayToString(multibase.encode('base58btc', hash)).slice(1)
}

/**
 * Convert the given base58 encoded string to a multihash.
 *
 * @param {string|Uint8Array} hash
 * @returns {Uint8Array}
 */
function fromB58String (hash) {
  const encoded = hash instanceof Uint8Array
    ? uint8ArrayToString(hash)
    : hash;

  return multibase.decode('z' + encoded)
}

/**
 * Decode a hash from the given multihash.
 *
 * @param {Uint8Array} bytes
 * @returns {{code: HashCode, name: HashName, length: number, digest: Uint8Array}} result
 */
function decode (bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new Error('multihash must be a Uint8Array')
  }

  if (bytes.length < 2) {
    throw new Error('multihash too short. must be > 2 bytes.')
  }

  const code = /** @type {HashCode} */(varint.decode(bytes));
  if (!isValidCode(code)) {
    throw new Error(`multihash unknown function code: 0x${code.toString(16)}`)
  }
  bytes = bytes.slice(varint.decode.bytes);

  const len = varint.decode(bytes);
  if (len < 0) {
    throw new Error(`multihash invalid length: ${len}`)
  }
  bytes = bytes.slice(varint.decode.bytes);

  if (bytes.length !== len) {
    throw new Error(`multihash length inconsistent: 0x${uint8ArrayToString(bytes, 'base16')}`)
  }

  return {
    code,
    name: codes[code],
    length: len,
    digest: bytes
  }
}

/**
 * Encode a hash digest along with the specified function code.
 *
 * > **Note:** the length is derived from the length of the digest itself.
 *
 * @param {Uint8Array} digest
 * @param {HashName | HashCode} code
 * @param {number} [length]
 * @returns {Uint8Array}
 */
function encode (digest, code, length) {
  if (!digest || code === undefined) {
    throw new Error('multihash encode requires at least two args: digest, code')
  }

  // ensure it's a hashfunction code.
  const hashfn = coerceCode(code);

  if (!(digest instanceof Uint8Array)) {
    throw new Error('digest should be a Uint8Array')
  }

  if (length == null) {
    length = digest.length;
  }

  if (length && digest.length !== length) {
    throw new Error('digest length should be equal to specified length.')
  }

  const hash = varint.encode(hashfn);
  const len = varint.encode(length);
  return uint8ArrayConcat([hash, len, digest], hash.length + len.length + digest.length)
}

/**
 * Converts a hash function name into the matching code.
 * If passed a number it will return the number if it's a valid code.
 *
 * @param {HashName | number} name
 * @returns {number}
 */
function coerceCode (name) {
  let code = name;

  if (typeof name === 'string') {
    if (names[name] === undefined) {
      throw new Error(`Unrecognized hash function named: ${name}`)
    }
    code = names[name];
  }

  if (typeof code !== 'number') {
    throw new Error(`Hash function code should be a number. Got: ${code}`)
  }

  // @ts-ignore
  if (codes[code] === undefined && !isAppCode(code)) {
    throw new Error(`Unrecognized function code: ${code}`)
  }

  return code
}

/**
 * Checks if a code is part of the app range
 *
 * @param {number} code
 * @returns {boolean}
 */
function isAppCode (code) {
  return code > 0 && code < 0x10
}

/**
 * Checks whether a multihash code is valid.
 *
 * @param {HashCode} code
 * @returns {boolean}
 */
function isValidCode (code) {
  if (isAppCode(code)) {
    return true
  }

  if (codes[code]) {
    return true
  }

  return false
}

/**
 * Check if the given buffer is a valid multihash. Throws an error if it is not valid.
 *
 * @param {Uint8Array} multihash
 * @returns {void}
 * @throws {Error}
 */
function validate (multihash) {
  decode(multihash); // throws if bad.
}

/**
 * Returns a prefix from a valid multihash. Throws an error if it is not valid.
 *
 * @param {Uint8Array} multihash
 * @returns {Uint8Array}
 * @throws {Error}
 */
function prefix (multihash) {
  validate(multihash);

  return multihash.subarray(0, 2)
}

var src = {
  names,
  codes,
  toHexString,
  fromHexString,
  toB58String,
  fromB58String,
  decode,
  encode,
  coerceCode,
  isAppCode,
  validate,
  prefix,
  isValidCode
};

export { src as default };
