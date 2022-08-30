/**
 * Node.js module for Forge.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2016 Digital Bazaar, Inc.
 */
import ed25519 from './ed25519.js'
import asn1 from './asn1.js'
var forge = {
  // default options
  asn1: asn1,
  pki: {
    ed25519: ed25519,
  },
  options: {
    usePureJavaScript: false
  }
};

export { forge as default };
