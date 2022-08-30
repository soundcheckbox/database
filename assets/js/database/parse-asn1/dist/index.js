import require$$0 from '../../asn1.js/dist/index.js';
import require$$0$1 from '../../evp_bytestokey/dist/index.js';
import require$$1$1 from '../../browserify-aes/dist/index.js';
import require$$2 from '../../safe-buffer/dist/index.js';
import require$$4 from '../../pbkdf2/dist/index.js';

var asn1$2 = {};

var asn = require$$0;

var Time = asn.define('Time', function () {
  this.choice({
    utcTime: this.utctime(),
    generalTime: this.gentime()
  });
});

var AttributeTypeValue = asn.define('AttributeTypeValue', function () {
  this.seq().obj(
    this.key('type').objid(),
    this.key('value').any()
  );
});

var AlgorithmIdentifier$1 = asn.define('AlgorithmIdentifier', function () {
  this.seq().obj(
    this.key('algorithm').objid(),
    this.key('parameters').optional(),
    this.key('curve').objid().optional()
  );
});

var SubjectPublicKeyInfo = asn.define('SubjectPublicKeyInfo', function () {
  this.seq().obj(
    this.key('algorithm').use(AlgorithmIdentifier$1),
    this.key('subjectPublicKey').bitstr()
  );
});

var RelativeDistinguishedName = asn.define('RelativeDistinguishedName', function () {
  this.setof(AttributeTypeValue);
});

var RDNSequence = asn.define('RDNSequence', function () {
  this.seqof(RelativeDistinguishedName);
});

var Name = asn.define('Name', function () {
  this.choice({
    rdnSequence: this.use(RDNSequence)
  });
});

var Validity = asn.define('Validity', function () {
  this.seq().obj(
    this.key('notBefore').use(Time),
    this.key('notAfter').use(Time)
  );
});

var Extension = asn.define('Extension', function () {
  this.seq().obj(
    this.key('extnID').objid(),
    this.key('critical').bool().def(false),
    this.key('extnValue').octstr()
  );
});

var TBSCertificate = asn.define('TBSCertificate', function () {
  this.seq().obj(
    this.key('version').explicit(0).int().optional(),
    this.key('serialNumber').int(),
    this.key('signature').use(AlgorithmIdentifier$1),
    this.key('issuer').use(Name),
    this.key('validity').use(Validity),
    this.key('subject').use(Name),
    this.key('subjectPublicKeyInfo').use(SubjectPublicKeyInfo),
    this.key('issuerUniqueID').implicit(1).bitstr().optional(),
    this.key('subjectUniqueID').implicit(2).bitstr().optional(),
    this.key('extensions').explicit(3).seqof(Extension).optional()
  );
});

var X509Certificate = asn.define('X509Certificate', function () {
  this.seq().obj(
    this.key('tbsCertificate').use(TBSCertificate),
    this.key('signatureAlgorithm').use(AlgorithmIdentifier$1),
    this.key('signatureValue').bitstr()
  );
});

var certificate = X509Certificate;

var asn1$1 = require$$0;

asn1$2.certificate = certificate;

var RSAPrivateKey = asn1$1.define('RSAPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('modulus').int(),
    this.key('publicExponent').int(),
    this.key('privateExponent').int(),
    this.key('prime1').int(),
    this.key('prime2').int(),
    this.key('exponent1').int(),
    this.key('exponent2').int(),
    this.key('coefficient').int()
  );
});
asn1$2.RSAPrivateKey = RSAPrivateKey;

var RSAPublicKey = asn1$1.define('RSAPublicKey', function () {
  this.seq().obj(
    this.key('modulus').int(),
    this.key('publicExponent').int()
  );
});
asn1$2.RSAPublicKey = RSAPublicKey;

var PublicKey = asn1$1.define('SubjectPublicKeyInfo', function () {
  this.seq().obj(
    this.key('algorithm').use(AlgorithmIdentifier),
    this.key('subjectPublicKey').bitstr()
  );
});
asn1$2.PublicKey = PublicKey;

var AlgorithmIdentifier = asn1$1.define('AlgorithmIdentifier', function () {
  this.seq().obj(
    this.key('algorithm').objid(),
    this.key('none').null_().optional(),
    this.key('curve').objid().optional(),
    this.key('params').seq().obj(
      this.key('p').int(),
      this.key('q').int(),
      this.key('g').int()
    ).optional()
  );
});

var PrivateKeyInfo = asn1$1.define('PrivateKeyInfo', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('algorithm').use(AlgorithmIdentifier),
    this.key('subjectPrivateKey').octstr()
  );
});
asn1$2.PrivateKey = PrivateKeyInfo;
var EncryptedPrivateKeyInfo = asn1$1.define('EncryptedPrivateKeyInfo', function () {
  this.seq().obj(
    this.key('algorithm').seq().obj(
      this.key('id').objid(),
      this.key('decrypt').seq().obj(
        this.key('kde').seq().obj(
          this.key('id').objid(),
          this.key('kdeparams').seq().obj(
            this.key('salt').octstr(),
            this.key('iters').int()
          )
        ),
        this.key('cipher').seq().obj(
          this.key('algo').objid(),
          this.key('iv').octstr()
        )
      )
    ),
    this.key('subjectPrivateKey').octstr()
  );
});

asn1$2.EncryptedPrivateKey = EncryptedPrivateKeyInfo;

var DSAPrivateKey = asn1$1.define('DSAPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('p').int(),
    this.key('q').int(),
    this.key('g').int(),
    this.key('pub_key').int(),
    this.key('priv_key').int()
  );
});
asn1$2.DSAPrivateKey = DSAPrivateKey;

asn1$2.DSAparam = asn1$1.define('DSAparam', function () {
  this.int();
});

var ECPrivateKey = asn1$1.define('ECPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('privateKey').octstr(),
    this.key('parameters').optional().explicit(0).use(ECParameters),
    this.key('publicKey').optional().explicit(1).bitstr()
  );
});
asn1$2.ECPrivateKey = ECPrivateKey;

var ECParameters = asn1$1.define('ECParameters', function () {
  this.choice({
    namedCurve: this.objid()
  });
});

asn1$2.signature = asn1$1.define('signature', function () {
  this.seq().obj(
    this.key('r').int(),
    this.key('s').int()
  );
});

var require$$1 = {
	"2.16.840.1.101.3.4.1.1": "aes-128-ecb",
	"2.16.840.1.101.3.4.1.2": "aes-128-cbc",
	"2.16.840.1.101.3.4.1.3": "aes-128-ofb",
	"2.16.840.1.101.3.4.1.4": "aes-128-cfb",
	"2.16.840.1.101.3.4.1.21": "aes-192-ecb",
	"2.16.840.1.101.3.4.1.22": "aes-192-cbc",
	"2.16.840.1.101.3.4.1.23": "aes-192-ofb",
	"2.16.840.1.101.3.4.1.24": "aes-192-cfb",
	"2.16.840.1.101.3.4.1.41": "aes-256-ecb",
	"2.16.840.1.101.3.4.1.42": "aes-256-cbc",
	"2.16.840.1.101.3.4.1.43": "aes-256-ofb",
	"2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};

// adapted from https://github.com/apatil/pemstrip
var findProc = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m;
var startRegex = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m;
var fullRegex = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m;
var evp = require$$0$1;
var ciphers$1 = require$$1$1;
var Buffer$1 = require$$2.Buffer;
var fixProc$1 = function (okey, password) {
  var key = okey.toString();
  var match = key.match(findProc);
  var decrypted;
  if (!match) {
    var match2 = key.match(fullRegex);
    decrypted = Buffer$1.from(match2[2].replace(/[\r\n]/g, ''), 'base64');
  } else {
    var suite = 'aes' + match[1];
    var iv = Buffer$1.from(match[2], 'hex');
    var cipherText = Buffer$1.from(match[3].replace(/[\r\n]/g, ''), 'base64');
    var cipherKey = evp(password, iv.slice(0, 8), parseInt(match[1], 10)).key;
    var out = [];
    var cipher = ciphers$1.createDecipheriv(suite, cipherKey, iv);
    out.push(cipher.update(cipherText));
    out.push(cipher.final());
    decrypted = Buffer$1.concat(out);
  }
  var tag = key.match(startRegex)[1];
  return {
    tag: tag,
    data: decrypted
  }
};

var asn1 = asn1$2;
var aesid = require$$1;
var fixProc = fixProc$1;
var ciphers = require$$1$1;
var compat = require$$4;
var Buffer = require$$2.Buffer;
var parseAsn1 = parseKeys;

function parseKeys (buffer) {
  var password;
  if (typeof buffer === 'object' && !Buffer.isBuffer(buffer)) {
    password = buffer.passphrase;
    buffer = buffer.key;
  }
  if (typeof buffer === 'string') {
    buffer = Buffer.from(buffer);
  }

  var stripped = fixProc(buffer, password);

  var type = stripped.tag;
  var data = stripped.data;
  var subtype, ndata;
  switch (type) {
    case 'CERTIFICATE':
      ndata = asn1.certificate.decode(data, 'der').tbsCertificate.subjectPublicKeyInfo;
      // falls through
    case 'PUBLIC KEY':
      if (!ndata) {
        ndata = asn1.PublicKey.decode(data, 'der');
      }
      subtype = ndata.algorithm.algorithm.join('.');
      switch (subtype) {
        case '1.2.840.113549.1.1.1':
          return asn1.RSAPublicKey.decode(ndata.subjectPublicKey.data, 'der')
        case '1.2.840.10045.2.1':
          ndata.subjectPrivateKey = ndata.subjectPublicKey;
          return {
            type: 'ec',
            data: ndata
          }
        case '1.2.840.10040.4.1':
          ndata.algorithm.params.pub_key = asn1.DSAparam.decode(ndata.subjectPublicKey.data, 'der');
          return {
            type: 'dsa',
            data: ndata.algorithm.params
          }
        default: throw new Error('unknown key id ' + subtype)
      }
      // throw new Error('unknown key type ' + type)
    case 'ENCRYPTED PRIVATE KEY':
      data = asn1.EncryptedPrivateKey.decode(data, 'der');
      data = decrypt(data, password);
      // falls through
    case 'PRIVATE KEY':
      ndata = asn1.PrivateKey.decode(data, 'der');
      subtype = ndata.algorithm.algorithm.join('.');
      switch (subtype) {
        case '1.2.840.113549.1.1.1':
          return asn1.RSAPrivateKey.decode(ndata.subjectPrivateKey, 'der')
        case '1.2.840.10045.2.1':
          return {
            curve: ndata.algorithm.curve,
            privateKey: asn1.ECPrivateKey.decode(ndata.subjectPrivateKey, 'der').privateKey
          }
        case '1.2.840.10040.4.1':
          ndata.algorithm.params.priv_key = asn1.DSAparam.decode(ndata.subjectPrivateKey, 'der');
          return {
            type: 'dsa',
            params: ndata.algorithm.params
          }
        default: throw new Error('unknown key id ' + subtype)
      }
      // throw new Error('unknown key type ' + type)
    case 'RSA PUBLIC KEY':
      return asn1.RSAPublicKey.decode(data, 'der')
    case 'RSA PRIVATE KEY':
      return asn1.RSAPrivateKey.decode(data, 'der')
    case 'DSA PRIVATE KEY':
      return {
        type: 'dsa',
        params: asn1.DSAPrivateKey.decode(data, 'der')
      }
    case 'EC PRIVATE KEY':
      data = asn1.ECPrivateKey.decode(data, 'der');
      return {
        curve: data.parameters.value,
        privateKey: data.privateKey
      }
    default: throw new Error('unknown key type ' + type)
  }
}
parseKeys.signature = asn1.signature;
function decrypt (data, password) {
  var salt = data.algorithm.decrypt.kde.kdeparams.salt;
  var iters = parseInt(data.algorithm.decrypt.kde.kdeparams.iters.toString(), 10);
  var algo = aesid[data.algorithm.decrypt.cipher.algo.join('.')];
  var iv = data.algorithm.decrypt.cipher.iv;
  var cipherText = data.subjectPrivateKey;
  var keylen = parseInt(algo.split('-')[1], 10) / 8;
  var key = compat.pbkdf2Sync(password, salt, iters, keylen, 'sha1');
  var cipher = ciphers.createDecipheriv(algo, key, iv);
  var out = [];
  out.push(cipher.update(cipherText));
  out.push(cipher.final());
  return Buffer.concat(out)
}

export { parseAsn1 as default };
