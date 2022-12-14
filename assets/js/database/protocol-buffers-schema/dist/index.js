var protocolBuffersSchema = {exports: {}};

var tokenize$1 = function (sch) {
  var noComments = function (line) {
    var i = line.indexOf('//');
    return i > -1 ? line.slice(0, i) : line
  };

  var noMultilineComments = function () {
    var inside = false;
    return function (token) {
      if (token === '/*') {
        inside = true;
        return false
      }
      if (token === '*/') {
        inside = false;
        return false
      }
      return !inside
    }
  };

  var trim = function (line) {
    return line.trim()
  };

  var removeQuotedLines = function (list) {
    return function (str) {
      var s = '$' + list.length + '$';
      list.push(str);
      return s
    }
  };

  var restoreQuotedLines = function (list) {
    var re = /^\$(\d+)\$$/;
    return function (line) {
      var m = line.match(re);
      return m ? list[+m[1]] : line
    }
  };

  var replacements = [];
  return sch
    .replace(/"(\\"|[^"\n])*?"|'(\\'|[^'\n])*?'/gm, removeQuotedLines(replacements))
    .replace(/([;,{}()=:[\]<>]|\/\*|\*\/)/g, ' $1 ')
    .split(/\n/)
    .map(trim)
    .filter(Boolean)
    .map(noComments)
    .map(trim)
    .filter(Boolean)
    .join('\n')
    .split(/\s+|\n+/gm)
    .filter(noMultilineComments())
    .map(restoreQuotedLines(replacements))
};

var tokenize = tokenize$1;
var MAX_RANGE = 0x1FFFFFFF;

// "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire types) can be declared "packed"."
// https://developers.google.com/protocol-buffers/docs/encoding#optional
var PACKABLE_TYPES = [
  // varint wire types
  'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'bool',
  // + ENUMS
  // 64-bit wire types
  'fixed64', 'sfixed64', 'double',
  // 32-bit wire types
  'fixed32', 'sfixed32', 'float'
];

var onfieldoptionvalue = function (tokens) {
  var value = tokens.shift();
  if (value !== '{') {
    return value
  }
  value = {};
  var field = '';
  while (tokens.length) {
    switch (tokens[0]) {
      case '}':
        tokens.shift();
        return value
      case ':':
        tokens.shift();
        value[field] = onfieldoptionvalue(tokens);
        break
      default:
        field = tokens.shift();
    }
  }
};

var onfieldoptions = function (tokens) {
  var opts = {};

  while (tokens.length) {
    switch (tokens[0]) {
      case '[':
      case ',': {
        tokens.shift();
        var name = tokens.shift();
        if (name === '(') { // handling [(A) = B]
          name = tokens.shift();
          tokens.shift(); // remove the end of bracket
        }
        var field = [];
        if (tokens[0][0] === '.') {
          field = tokens[0].substr(1).split('.');
          tokens.shift();
        }
        if (tokens[0] !== '=') throw new Error('Unexpected token in field options: ' + tokens[0])
        tokens.shift();
        if (tokens[0] === ']') throw new Error('Unexpected ] in field option')

        // for option (A).b.c
        // path will be ['A', 'b'] and lastFieldName 'c'
        var path = [name].concat(field);
        var lastFieldName = path.pop();

        // opt references opts.A.b
        var opt = path.reduce(function (opt, n, index) {
          if (opt[n] == null) {
            opt[n] = {};
          }
          return opt[n]
        }, opts);

        // now set opt['c'] that references opts.A.b['c']
        opt[lastFieldName] = onfieldoptionvalue(tokens);
        break
      }
      case ']':
        tokens.shift();
        return opts

      default:
        throw new Error('Unexpected token in field options: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for field options')
};

var onfield$1 = function (tokens) {
  var field = {
    name: null,
    type: null,
    tag: -1,
    map: null,
    oneof: null,
    required: false,
    repeated: false,
    options: {}
  };

  while (tokens.length) {
    switch (tokens[0]) {
      case '=':
        tokens.shift();
        field.tag = Number(tokens.shift());
        break

      case 'map':
        field.type = 'map';
        field.map = { from: null, to: null };
        tokens.shift();
        if (tokens[0] !== '<') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift();
        field.map.from = tokens.shift();
        if (tokens[0] !== ',') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift();
        field.map.to = tokens.shift();
        if (tokens[0] !== '>') throw new Error('Unexpected token in map type: ' + tokens[0])
        tokens.shift();
        field.name = tokens.shift();
        break

      case 'repeated':
      case 'required':
      case 'optional':
        var t = tokens.shift();
        field.required = t === 'required';
        field.repeated = t === 'repeated';
        field.type = tokens.shift();
        field.name = tokens.shift();
        break

      case '[':
        field.options = onfieldoptions(tokens);
        break

      case ';':
        if (field.name === null) throw new Error('Missing field name')
        if (field.type === null) throw new Error('Missing type in message field: ' + field.name)
        if (field.tag === -1) throw new Error('Missing tag number in message field: ' + field.name)
        tokens.shift();
        return field

      default:
        throw new Error('Unexpected token in message field: ' + tokens[0])
    }
  }

  throw new Error('No ; found for message field')
};

var onmessagebody = function (tokens) {
  var body = {
    enums: [],
    options: {},
    messages: [],
    fields: [],
    extends: [],
    extensions: null
  };

  while (tokens.length) {
    switch (tokens[0]) {
      case 'map':
      case 'repeated':
      case 'optional':
      case 'required':
        body.fields.push(onfield$1(tokens));
        break

      case 'enum':
        body.enums.push(onenum$1(tokens));
        break

      case 'message':
        body.messages.push(onmessage$1(tokens));
        break

      case 'extensions':
        body.extensions = onextensions(tokens);
        break

      case 'oneof':
        tokens.shift();
        var name = tokens.shift();
        if (tokens[0] !== '{') throw new Error('Unexpected token in oneof: ' + tokens[0])
        tokens.shift();
        while (tokens[0] !== '}') {
          tokens.unshift('optional');
          var field = onfield$1(tokens);
          field.oneof = name;
          body.fields.push(field);
        }
        tokens.shift();
        break

      case 'extend':
        body.extends.push(onextend(tokens));
        break

      case ';':
        tokens.shift();
        break

      case 'reserved':
        tokens.shift();
        while (tokens[0] !== ';') {
          tokens.shift();
        }
        break

      case 'option':
        var opt = onoption$1(tokens);
        if (body.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
        body.options[opt.name] = opt.value;
        break

      default:
        // proto3 does not require the use of optional/required, assumed as optional
        // "singular: a well-formed message can have zero or one of this field (but not more than one)."
        // https://developers.google.com/protocol-buffers/docs/proto3#specifying-field-rules
        tokens.unshift('optional');
        body.fields.push(onfield$1(tokens));
    }
  }

  return body
};

var onextend = function (tokens) {
  var out = {
    name: tokens[1],
    message: onmessage$1(tokens)
  };
  return out
};

var onextensions = function (tokens) {
  tokens.shift();
  var from = Number(tokens.shift());
  if (isNaN(from)) throw new Error('Invalid from in extensions definition')
  if (tokens.shift() !== 'to') throw new Error("Expected keyword 'to' in extensions definition")
  var to = tokens.shift();
  if (to === 'max') to = MAX_RANGE;
  to = Number(to);
  if (isNaN(to)) throw new Error('Invalid to in extensions definition')
  if (tokens.shift() !== ';') throw new Error('Missing ; in extensions definition')
  return { from: from, to: to }
};
var onmessage$1 = function (tokens) {
  tokens.shift();

  var lvl = 1;
  var body = [];
  var msg = {
    name: tokens.shift(),
    options: {},
    enums: [],
    extends: [],
    messages: [],
    fields: []
  };

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift();

  while (tokens.length) {
    if (tokens[0] === '{') lvl++;
    else if (tokens[0] === '}') lvl--;

    if (!lvl) {
      tokens.shift();
      body = onmessagebody(body);
      msg.enums = body.enums;
      msg.messages = body.messages;
      msg.fields = body.fields;
      msg.extends = body.extends;
      msg.extensions = body.extensions;
      msg.options = body.options;
      return msg
    }

    body.push(tokens.shift());
  }

  if (lvl) throw new Error('No closing tag for message')
};

var onpackagename = function (tokens) {
  tokens.shift();
  var name = tokens.shift();
  if (tokens[0] !== ';') throw new Error('Expected ; but found ' + tokens[0])
  tokens.shift();
  return name
};

var onsyntaxversion = function (tokens) {
  tokens.shift();

  if (tokens[0] !== '=') throw new Error('Expected = but found ' + tokens[0])
  tokens.shift();

  var version = tokens.shift();
  switch (version) {
    case '"proto2"':
      version = 2;
      break

    case '"proto3"':
      version = 3;
      break

    default:
      throw new Error('Expected protobuf syntax version but found ' + version)
  }

  if (tokens[0] !== ';') throw new Error('Expected ; but found ' + tokens[0])
  tokens.shift();

  return version
};

var onenumvalue$1 = function (tokens) {
  if (tokens.length < 4) throw new Error('Invalid enum value: ' + tokens.slice(0, 3).join(' '))
  if (tokens[1] !== '=') throw new Error('Expected = but found ' + tokens[1])
  if (tokens[3] !== ';' && tokens[3] !== '[') throw new Error('Expected ; or [ but found ' + tokens[1])

  var name = tokens.shift();
  tokens.shift();
  var val = {
    value: null,
    options: {}
  };
  val.value = Number(tokens.shift());
  if (tokens[0] === '[') {
    val.options = onfieldoptions(tokens);
  }
  tokens.shift(); // expecting the semicolon here

  return {
    name: name,
    val: val
  }
};

var onenum$1 = function (tokens) {
  tokens.shift();
  var options = {};
  var e = {
    name: tokens.shift(),
    values: {},
    options: {}
  };

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift();

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift();
      return e
    }
    if (tokens[0] === 'option') {
      options = onoption$1(tokens);
      e.options[options.name] = options.value;
      continue
    }
    var val = onenumvalue$1(tokens);
    e.values[val.name] = val.val;
  }

  throw new Error('No closing tag for enum')
};

var onoption$1 = function (tokens) {
  var name = null;
  var value = null;

  var parse = function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value.replace(/^"+|"+$/gm, '')
  };

  while (tokens.length) {
    if (tokens[0] === ';') {
      tokens.shift();
      return { name: name, value: value }
    }
    switch (tokens[0]) {
      case 'option':
        tokens.shift();

        var hasBracket = tokens[0] === '(';
        if (hasBracket) tokens.shift();

        name = tokens.shift();

        if (hasBracket) {
          if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
          tokens.shift();
        }

        if (tokens[0][0] === '.') {
          name += tokens.shift();
        }

        break

      case '=':
        tokens.shift();
        if (name === null) throw new Error('Expected key for option with value: ' + tokens[0])
        value = parse(tokens.shift());

        if (name === 'optimize_for' && !/^(SPEED|CODE_SIZE|LITE_RUNTIME)$/.test(value)) {
          throw new Error('Unexpected value for option optimize_for: ' + value)
        } else if (value === '{') {
          // option foo = {bar: baz}
          value = onoptionMap$1(tokens);
        }
        break

      default:
        throw new Error('Unexpected token in option: ' + tokens[0])
    }
  }
};

var onoptionMap$1 = function (tokens) {
  var parse = function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value.replace(/^"+|"+$/gm, '')
  };

  var map = {};

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      return map
    }

    var hasBracket = tokens[0] === '(';
    if (hasBracket) tokens.shift();

    var key = tokens.shift();
    if (hasBracket) {
      if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
      tokens.shift();
    }

    var value = null;

    switch (tokens[0]) {
      case ':':
        if (map[key] !== undefined) throw new Error('Duplicate option map key ' + key)

        tokens.shift();

        value = parse(tokens.shift());

        if (value === '{') {
          // option foo = {bar: baz}
          value = onoptionMap$1(tokens);
        }

        map[key] = value;

        if (tokens[0] === ';') {
          tokens.shift();
        }
        break

      case '{':
        tokens.shift();
        value = onoptionMap$1(tokens);

        if (map[key] === undefined) map[key] = [];
        if (!Array.isArray(map[key])) throw new Error('Duplicate option map key ' + key)

        map[key].push(value);
        break

      default:
        throw new Error('Unexpected token in option map: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for option map')
};

var onimport = function (tokens) {
  tokens.shift();
  var file = tokens.shift().replace(/^"+|"+$/gm, '');

  if (tokens[0] !== ';') throw new Error('Unexpected token: ' + tokens[0] + '. Expected ";"')

  tokens.shift();
  return file
};

var onservice = function (tokens) {
  tokens.shift();

  var service = {
    name: tokens.shift(),
    methods: [],
    options: {}
  };

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift();

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift();
      return service
    }

    switch (tokens[0]) {
      case 'option':
        var opt = onoption$1(tokens);
        if (service.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
        service.options[opt.name] = opt.value;
        break
      case 'rpc':
        service.methods.push(onrpc$1(tokens));
        break
      default:
        throw new Error('Unexpected token in service: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for service')
};

var onrpc$1 = function (tokens) {
  tokens.shift();

  var rpc = {
    name: tokens.shift(),
    input_type: null,
    output_type: null,
    client_streaming: false,
    server_streaming: false,
    options: {}
  };

  if (tokens[0] !== '(') throw new Error('Expected ( but found ' + tokens[0])
  tokens.shift();

  if (tokens[0] === 'stream') {
    tokens.shift();
    rpc.client_streaming = true;
  }

  rpc.input_type = tokens.shift();

  if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
  tokens.shift();

  if (tokens[0] !== 'returns') throw new Error('Expected returns but found ' + tokens[0])
  tokens.shift();

  if (tokens[0] !== '(') throw new Error('Expected ( but found ' + tokens[0])
  tokens.shift();

  if (tokens[0] === 'stream') {
    tokens.shift();
    rpc.server_streaming = true;
  }

  rpc.output_type = tokens.shift();

  if (tokens[0] !== ')') throw new Error('Expected ) but found ' + tokens[0])
  tokens.shift();

  if (tokens[0] === ';') {
    tokens.shift();
    return rpc
  }

  if (tokens[0] !== '{') throw new Error('Expected { but found ' + tokens[0])
  tokens.shift();

  while (tokens.length) {
    if (tokens[0] === '}') {
      tokens.shift();
      // there goes optional semicolon after the enclosing "}"
      if (tokens[0] === ';') tokens.shift();
      return rpc
    }

    if (tokens[0] === 'option') {
      var opt = onoption$1(tokens);
      if (rpc.options[opt.name] !== undefined) throw new Error('Duplicate option ' + opt.name)
      rpc.options[opt.name] = opt.value;
    } else {
      throw new Error('Unexpected token in rpc options: ' + tokens[0])
    }
  }

  throw new Error('No closing tag for rpc')
};

var parse$1 = function (buf) {
  var tokens = tokenize(buf.toString());
  // check for isolated strings in tokens by looking for opening quote
  for (var i = 0; i < tokens.length; i++) {
    if (/^("|')([^'"]*)$/.test(tokens[i])) {
      var j;
      if (tokens[i].length === 1) {
        j = i + 1;
      } else {
        j = i;
      }
      // look ahead for the closing quote and collapse all
      // in-between tokens into a single token
      for (j; j < tokens.length; j++) {
        if (/^[^'"\\]*(?:\\.[^'"\\]*)*("|')$/.test(tokens[j])) {
          tokens = tokens.slice(0, i).concat(tokens.slice(i, j + 1).join('')).concat(tokens.slice(j + 1));
          break
        }
      }
    }
  }
  var schema = {
    syntax: 3,
    package: null,
    imports: [],
    enums: [],
    messages: [],
    options: {},
    extends: []
  };

  var firstline = true;

  while (tokens.length) {
    switch (tokens[0]) {
      case 'package':
        schema.package = onpackagename(tokens);
        break

      case 'syntax':
        if (!firstline) throw new Error('Protobuf syntax version should be first thing in file')
        schema.syntax = onsyntaxversion(tokens);
        break

      case 'message':
        schema.messages.push(onmessage$1(tokens));
        break

      case 'enum':
        schema.enums.push(onenum$1(tokens));
        break

      case 'option':
        var opt = onoption$1(tokens);
        if (schema.options[opt.name]) throw new Error('Duplicate option ' + opt.name)
        schema.options[opt.name] = opt.value;
        break

      case 'import':
        schema.imports.push(onimport(tokens));
        break

      case 'extend':
        schema.extends.push(onextend(tokens));
        break

      case 'service':
        if (!schema.services) schema.services = [];
        schema.services.push(onservice(tokens));
        break

      default:
        throw new Error('Unexpected token: ' + tokens[0])
    }
    firstline = false;
  }

  // now iterate over messages and propagate extends
  schema.extends.forEach(function (ext) {
    schema.messages.forEach(function (msg) {
      if (msg.name === ext.name) {
        ext.message.fields.forEach(function (field) {
          if (!msg.extensions || field.tag < msg.extensions.from || field.tag > msg.extensions.to) {
            throw new Error(msg.name + ' does not declare ' + field.tag + ' as an extension number')
          }
          msg.fields.push(field);
        });
      }
    });
  });

  schema.messages.forEach(function (msg) {
    msg.fields.forEach(function (field) {
      var fieldSplit;
      var messageName;
      var nestedEnumName;
      var message;

      function enumNameIsFieldType (en) {
        return en.name === field.type
      }

      function enumNameIsNestedEnumName (en) {
        return en.name === nestedEnumName
      }

      if (field.options && field.options.packed === 'true') {
        if (PACKABLE_TYPES.indexOf(field.type) === -1) {
          // let's see if it's an enum
          if (field.type.indexOf('.') === -1) {
            if (msg.enums && msg.enums.some(enumNameIsFieldType)) {
              return
            }
          } else {
            fieldSplit = field.type.split('.');
            if (fieldSplit.length > 2) {
              throw new Error('what is this?')
            }

            messageName = fieldSplit[0];
            nestedEnumName = fieldSplit[1];

            schema.messages.some(function (msg) {
              if (msg.name === messageName) {
                message = msg;
                return msg
              }
            });

            if (message && message.enums && message.enums.some(enumNameIsNestedEnumName)) {
              return
            }
          }

          throw new Error(
            'Fields of type ' + field.type + ' cannot be declared [packed=true]. ' +
            'Only repeated fields of primitive numeric types (types which use ' +
            'the varint, 32-bit, or 64-bit wire types) can be declared "packed". ' +
            'See https://developers.google.com/protocol-buffers/docs/encoding#optional'
          )
        }
      }
    });
  });

  return schema
};

var parse_1$1 = parse$1;

var onfield = function (f, result) {
  var prefix = f.repeated ? 'repeated' : f.required ? 'required' : 'optional';
  if (f.type === 'map') prefix = 'map<' + f.map.from + ',' + f.map.to + '>';
  if (f.oneof) prefix = '';

  var opts = Object.keys(f.options || {}).map(function (key) {
    return key + ' = ' + f.options[key]
  }).join(',');

  if (opts) opts = ' [' + opts + ']';

  result.push((prefix ? prefix + ' ' : '') + (f.map === 'map' ? '' : f.type + ' ') + f.name + ' = ' + f.tag + opts + ';');
  return result
};

var onmessage = function (m, result) {
  result.push('message ' + m.name + ' {');

  if (!m.options) m.options = {};
  onoption(m.options, result);

  if (!m.enums) m.enums = [];
  m.enums.forEach(function (e) {
    result.push(onenum(e, []));
  });

  if (!m.messages) m.messages = [];
  m.messages.forEach(function (m) {
    result.push(onmessage(m, []));
  });

  var oneofs = {};

  if (!m.fields) m.fields = [];
  m.fields.forEach(function (f) {
    if (f.oneof) {
      if (!oneofs[f.oneof]) oneofs[f.oneof] = [];
      oneofs[f.oneof].push(onfield(f, []));
    } else {
      result.push(onfield(f, []));
    }
  });

  Object.keys(oneofs).forEach(function (n) {
    oneofs[n].unshift('oneof ' + n + ' {');
    oneofs[n].push('}');
    result.push(oneofs[n]);
  });

  result.push('}', '');
  return result
};

var onenum = function (e, result) {
  result.push('enum ' + e.name + ' {');
  if (!e.options) e.options = {};
  var options = onoption(e.options, []);
  if (options.length > 1) {
    result.push(options.slice(0, -1));
  }
  Object.keys(e.values).map(function (v) {
    var val = onenumvalue(e.values[v]);
    result.push([v + ' = ' + val + ';']);
  });
  result.push('}', '');
  return result
};

var onenumvalue = function (v, result) {
  var opts = Object.keys(v.options || {}).map(function (key) {
    return key + ' = ' + v.options[key]
  }).join(',');

  if (opts) opts = ' [' + opts + ']';
  var val = v.value + opts;
  return val
};

var onoption = function (o, result) {
  var keys = Object.keys(o);
  keys.forEach(function (option) {
    var v = o[option];
    if (~option.indexOf('.')) option = '(' + option + ')';

    var type = typeof v;

    if (type === 'object') {
      v = onoptionMap(v, []);
      if (v.length) result.push('option ' + option + ' = {', v, '};');
    } else {
      if (type === 'string' && option !== 'optimize_for') v = '"' + v + '"';
      result.push('option ' + option + ' = ' + v + ';');
    }
  });
  if (keys.length > 0) {
    result.push('');
  }

  return result
};

var onoptionMap = function (o, result) {
  var keys = Object.keys(o);
  keys.forEach(function (k) {
    var v = o[k];

    var type = typeof v;

    if (type === 'object') {
      if (Array.isArray(v)) {
        v.forEach(function (v) {
          v = onoptionMap(v, []);
          if (v.length) result.push(k + ' {', v, '}');
        });
      } else {
        v = onoptionMap(v, []);
        if (v.length) result.push(k + ' {', v, '}');
      }
    } else {
      if (type === 'string') v = '"' + v + '"';
      result.push(k + ': ' + v);
    }
  });

  return result
};

var onservices = function (s, result) {
  result.push('service ' + s.name + ' {');

  if (!s.options) s.options = {};
  onoption(s.options, result);
  if (!s.methods) s.methods = [];
  s.methods.forEach(function (m) {
    result.push(onrpc(m, []));
  });

  result.push('}', '');
  return result
};

var onrpc = function (rpc, result) {
  var def = 'rpc ' + rpc.name + '(';
  if (rpc.client_streaming) def += 'stream ';
  def += rpc.input_type + ') returns (';
  if (rpc.server_streaming) def += 'stream ';
  def += rpc.output_type + ')';

  if (!rpc.options) rpc.options = {};

  var options = onoption(rpc.options, []);
  if (options.length > 1) {
    result.push(def + ' {', options.slice(0, -1), '}');
  } else {
    result.push(def + ';');
  }

  return result
};

var indent = function (lvl) {
  return function (line) {
    if (Array.isArray(line)) return line.map(indent(lvl + '  ')).join('\n')
    return lvl + line
  }
};

var stringify$1 = function (schema) {
  var result = [];

  result.push('syntax = "proto' + schema.syntax + '";', '');

  if (schema.package) result.push('package ' + schema.package + ';', '');

  if (!schema.options) schema.options = {};

  onoption(schema.options, result);

  if (!schema.enums) schema.enums = [];
  schema.enums.forEach(function (e) {
    onenum(e, result);
  });

  if (!schema.messages) schema.messages = [];
  schema.messages.forEach(function (m) {
    onmessage(m, result);
  });

  if (schema.services) {
    schema.services.forEach(function (s) {
      onservices(s, result);
    });
  }
  return result.map(indent('')).join('\n')
};

var parse = parse_1$1;
var stringify = stringify$1;

protocolBuffersSchema.exports = parse;
var parse_1 = protocolBuffersSchema.exports.parse = parse;
var stringify_1 = protocolBuffersSchema.exports.stringify = stringify;

var exports = protocolBuffersSchema.exports;
export { exports as default, parse_1 as parse, stringify_1 as stringify };
