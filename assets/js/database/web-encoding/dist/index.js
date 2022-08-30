import require$$0 from '../../util/dist/index.js';

var lib = {};

var TextEncoder_1 = lib.TextEncoder =
  typeof TextEncoder !== "undefined" ? TextEncoder : require$$0.TextEncoder;

var TextDecoder_1 = lib.TextDecoder =
  typeof TextDecoder !== "undefined" ? TextDecoder : require$$0.TextDecoder;

export { TextDecoder_1 as TextDecoder, TextEncoder_1 as TextEncoder, lib as default };
