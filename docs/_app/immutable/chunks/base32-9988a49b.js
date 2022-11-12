var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { f as from$c, t as toString$7, a as fromString$7, r as rfc4648$8, e as baseX$8, g as create$8, h as coerce$8, i as base32$a, j as base58$2, c as commonjsGlobal, k as getDefaultExportFromCjs, d as decode$z, l as base58btc$8, C as CID$6, b as base32$b } from "./_page-c4e5a7f2.js";
import { b as buffer$1, e as events$1 } from "./index-3f3061f9.js";
var browser = { exports: {} };
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse2(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse2(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d) {
      return plural(ms2, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms2, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms2, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms2, msAbs, s, "second");
    }
    return ms2 + " ms";
  }
  function plural(ms2, msAbs, n, name2) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms2 / n) + " " + name2 + (isPlural ? "s" : "");
  }
  return ms;
}
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce2;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = requireMs();
  createDebug.destroy = destroy;
  Object.keys(env).forEach((key) => {
    createDebug[key] = env[key];
  });
  createDebug.names = [];
  createDebug.skips = [];
  createDebug.formatters = {};
  function selectColor(namespace) {
    let hash2 = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash2 = (hash2 << 5) - hash2 + namespace.charCodeAt(i);
      hash2 |= 0;
    }
    return createDebug.colors[Math.abs(hash2) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug2(...args) {
      if (!debug2.enabled) {
        return;
      }
      const self2 = debug2;
      const curr = Number(new Date());
      const ms2 = curr - (prevTime || curr);
      self2.diff = ms2;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
        if (match === "%%") {
          return "%";
        }
        index++;
        const formatter = createDebug.formatters[format2];
        if (typeof formatter === "function") {
          const val = args[index];
          match = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      createDebug.formatArgs.call(self2, args);
      const logFn = self2.log || createDebug.log;
      logFn.apply(self2, args);
    }
    debug2.namespace = namespace;
    debug2.useColors = createDebug.useColors();
    debug2.color = createDebug.selectColor(namespace);
    debug2.extend = extend;
    debug2.destroy = createDebug.destroy;
    Object.defineProperty(debug2, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: (v) => {
        enableOverride = v;
      }
    });
    if (typeof createDebug.init === "function") {
      createDebug.init(debug2);
    }
    return debug2;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    const len = split.length;
    for (i = 0; i < len; i++) {
      if (!split[i]) {
        continue;
      }
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
      } else {
        createDebug.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
    ].join(",");
    createDebug.enable("");
    return namespaces;
  }
  function enabled(name2) {
    if (name2[name2.length - 1] === "*") {
      return true;
    }
    let i;
    let len;
    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name2)) {
        return false;
      }
    }
    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name2)) {
        return true;
      }
    }
    return false;
  }
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function coerce2(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }
  function destroy() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  createDebug.enable(createDebug.load());
  return createDebug;
}
var common$1 = setup;
(function(module, exports) {
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  exports.log = console.debug || console.log || (() => {
  });
  function save(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error) {
    }
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch (error) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {
    }
  }
  module.exports = common$1(exports);
  const { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
})(browser, browser.exports);
const debug = browser.exports;
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise;
var queueMicrotask_1 = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : {}) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
  throw err;
}, 0));
function assign(obj, props) {
  for (const key in props) {
    Object.defineProperty(obj, key, {
      value: props[key],
      enumerable: true,
      configurable: true
    });
  }
  return obj;
}
function createError(err, code2, props) {
  if (!err || typeof err === "string") {
    throw new TypeError("Please pass an Error to err-code");
  }
  if (!props) {
    props = {};
  }
  if (typeof code2 === "object") {
    props = code2;
    code2 = "";
  }
  if (code2) {
    props.code = code2;
  }
  try {
    return assign(err, props);
  } catch (_) {
    props.message = err.message;
    props.stack = err.stack;
    const ErrClass = function() {
    };
    ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
    const output = assign(new ErrClass(), props);
    return output;
  }
}
var errCode = createError;
var encode_1$6 = encode$p;
var MSB$8 = 128, REST$8 = 127, MSBALL$6 = ~REST$8, INT$6 = Math.pow(2, 31);
function encode$p(num, out, offset) {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    encode$p.bytes = 0;
    throw new RangeError("Could not encode varint");
  }
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$6) {
    out[offset++] = num & 255 | MSB$8;
    num /= 128;
  }
  while (num & MSBALL$6) {
    out[offset++] = num & 255 | MSB$8;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$p.bytes = offset - oldOffset + 1;
  return out;
}
var decode$y = read$6;
var MSB$7 = 128, REST$7 = 127;
function read$6(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l || shift > 49) {
      read$6.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$7) << shift : (b & REST$7) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$7);
  read$6.bytes = counter - offset;
  return res;
}
var N1$6 = Math.pow(2, 7);
var N2$6 = Math.pow(2, 14);
var N3$6 = Math.pow(2, 21);
var N4$6 = Math.pow(2, 28);
var N5$6 = Math.pow(2, 35);
var N6$6 = Math.pow(2, 42);
var N7$6 = Math.pow(2, 49);
var N8$6 = Math.pow(2, 56);
var N9$6 = Math.pow(2, 63);
var length$7 = function(value) {
  return value < N1$6 ? 1 : value < N2$6 ? 2 : value < N3$6 ? 3 : value < N4$6 ? 4 : value < N5$6 ? 5 : value < N6$6 ? 6 : value < N7$6 ? 7 : value < N8$6 ? 8 : value < N9$6 ? 9 : 10;
};
var varint$6 = {
  encode: encode_1$6,
  decode: decode$y,
  encodingLength: length$7
};
const typeofs = [
  "string",
  "number",
  "bigint",
  "symbol"
];
const objectTypeNames = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "HTMLElement",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array"
];
function is(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer$1(value)) {
    return "Buffer";
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer$1(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
class Type {
  constructor(major, name2, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name2;
    this.terminal = terminal;
  }
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
}
Type.uint = new Type(0, "uint", true);
Type.negint = new Type(1, "negint", true);
Type.bytes = new Type(2, "bytes", true);
Type.string = new Type(3, "string", true);
Type.array = new Type(4, "array", false);
Type.map = new Type(5, "map", false);
Type.tag = new Type(6, "tag", false);
Type.float = new Type(7, "float", true);
Type.false = new Type(7, "false", true);
Type.true = new Type(7, "true", true);
Type.null = new Type(7, "null", true);
Type.undefined = new Type(7, "undefined", true);
Type.break = new Type(7, "break", true);
class Token {
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = void 0;
    this.byteValue = void 0;
  }
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
}
const useBuffer = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer === "function";
const textDecoder$2 = new TextDecoder();
const textEncoder$4 = new TextEncoder();
function isBuffer(buf2) {
  return useBuffer && globalThis.Buffer.isBuffer(buf2);
}
function asU8A(buf2) {
  if (!(buf2 instanceof Uint8Array)) {
    return Uint8Array.from(buf2);
  }
  return isBuffer(buf2) ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength) : buf2;
}
const toString$6 = useBuffer ? (bytes2, start, end2) => {
  return end2 - start > 64 ? globalThis.Buffer.from(bytes2.subarray(start, end2)).toString("utf8") : utf8Slice(bytes2, start, end2);
} : (bytes2, start, end2) => {
  return end2 - start > 64 ? textDecoder$2.decode(bytes2.subarray(start, end2)) : utf8Slice(bytes2, start, end2);
};
const fromString$6 = useBuffer ? (string2) => {
  return string2.length > 64 ? globalThis.Buffer.from(string2) : utf8ToBytes(string2);
} : (string2) => {
  return string2.length > 64 ? textEncoder$4.encode(string2) : utf8ToBytes(string2);
};
const fromArray = (arr) => {
  return Uint8Array.from(arr);
};
const slice = useBuffer ? (bytes2, start, end2) => {
  if (isBuffer(bytes2)) {
    return new Uint8Array(bytes2.subarray(start, end2));
  }
  return bytes2.slice(start, end2);
} : (bytes2, start, end2) => {
  return bytes2.slice(start, end2);
};
const concat$2 = useBuffer ? (chunks, length2) => {
  chunks = chunks.map((c) => c instanceof Uint8Array ? c : globalThis.Buffer.from(c));
  return asU8A(globalThis.Buffer.concat(chunks, length2));
} : (chunks, length2) => {
  const out = new Uint8Array(length2);
  let off2 = 0;
  for (let b of chunks) {
    if (off2 + b.length > out.length) {
      b = b.subarray(0, out.length - off2);
    }
    out.set(b, off2);
    off2 += b.length;
  }
  return out;
};
const alloc = useBuffer ? (size) => {
  return globalThis.Buffer.allocUnsafe(size);
} : (size) => {
  return new Uint8Array(size);
};
function compare$1(b1, b2) {
  if (isBuffer(b1) && isBuffer(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(string2, units = Infinity) {
  let codePoint;
  const length2 = string2.length;
  let leadSurrogate = null;
  const bytes2 = [];
  for (let i = 0; i < length2; ++i) {
    codePoint = string2.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes2.push(239, 191, 189);
          continue;
        } else if (i + 1 === length2) {
          if ((units -= 3) > -1)
            bytes2.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes2.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes2.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes2.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes2.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes2.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes2.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes2;
}
function utf8Slice(buf2, offset, end2) {
  const res = [];
  while (offset < end2) {
    const firstByte = buf2[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end2) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf2[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          fourthByte = buf2[offset + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}
const defaultChunkSize = 256;
class Bl {
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0;
    this.maxCursor = -1;
    if (this.chunks.length) {
      this.chunks = [];
    }
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  push(bytes2) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes2.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes2, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes2.length < 64 && bytes2.length < this.chunkSize) {
        topChunk = alloc(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes2, 0);
      } else {
        this.chunks.push(bytes2);
        this.maxCursor += bytes2.length;
      }
    }
    this.cursor += bytes2.length;
  }
  toBytes(reset2 = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset2 && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = slice(chunk, 0, this.cursor);
      }
    } else {
      byts = concat$2(this.chunks, this.cursor);
    }
    if (reset2) {
      this.reset();
    }
    return byts;
  }
}
const decodeErrPrefix = "CBOR decode error:";
const encodeErrPrefix = "CBOR encode error:";
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix} not enough data for type`);
  }
}
const uintBoundaries = [
  24,
  256,
  65536,
  4294967296,
  BigInt("18446744073709551616")
];
function readUint8(data, offset, options) {
  assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint16(data, offset, options) {
  assertEnoughData(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint32(data, offset, options) {
  assertEnoughData(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint64(data, offset, options) {
  assertEnoughData(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
}
function decodeUint8(data, pos, _minor, options) {
  return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf2, token) {
  return encodeUintValue(buf2, 0, token.value);
}
function encodeUintValue(buf2, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf2.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf2.push([
      major | 24,
      nuint
    ]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf2.push([
      major | 25,
      nuint >>> 8,
      nuint & 255
    ]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf2.push([
      major | 26,
      nuint >>> 24 & 255,
      nuint >>> 16 & 255,
      nuint >>> 8 & 255,
      nuint & 255
    ]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set2 = [
        major | 27,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set2[8] = lo & 255;
      lo = lo >> 8;
      set2[7] = lo & 255;
      lo = lo >> 8;
      set2[6] = lo & 255;
      lo = lo >> 8;
      set2[5] = lo & 255;
      set2[4] = hi & 255;
      hi = hi >> 8;
      set2[3] = hi & 255;
      hi = hi >> 8;
      set2[2] = hi & 255;
      hi = hi >> 8;
      set2[1] = hi & 255;
      buf2.push(set2);
    } else {
      throw new Error(`${decodeErrPrefix} encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize2(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
};
function decodeNegint8(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
}
const neg1b = BigInt(-1);
const pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int = readUint64(data, pos + 1, options);
  if (typeof int !== "bigint") {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token(Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
  }
  return new Token(Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf2, token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  encodeUintValue(buf2, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize3(token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
};
function toToken$3(data, pos, prefix, length2) {
  assertEnoughData(data, pos, prefix + length2);
  const buf2 = slice(data, pos + prefix, pos + prefix + length2);
  return new Token(Type.bytes, buf2, prefix + length2);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken$3(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken$3(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken$3(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken$3(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer bytes lengths not supported`);
  }
  return toToken$3(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes = token.type === Type.string ? fromString$6(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf2, token) {
  const bytes2 = tokenBytes(token);
  encodeUintValue(buf2, token.type.majorEncoded, bytes2.length);
  buf2.push(bytes2);
}
encodeBytes.encodedSize = function encodedSize4(token) {
  const bytes2 = tokenBytes(token);
  return encodeUintValue.encodedSize(bytes2.length) + bytes2.length;
};
encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : compare$1(b1, b2);
}
function toToken$2(data, pos, prefix, length2, options) {
  const totLength = prefix + length2;
  assertEnoughData(data, pos, totLength);
  const tok = new Token(Type.string, toString$6(data, pos + prefix, pos + totLength), totLength);
  if (options.retainStringBytes === true) {
    tok.byteValue = slice(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact(data, pos, minor, options) {
  return toToken$2(data, pos, 1, minor, options);
}
function decodeString8(data, pos, _minor, options) {
  return toToken$2(data, pos, 2, readUint8(data, pos + 1, options), options);
}
function decodeString16(data, pos, _minor, options) {
  return toToken$2(data, pos, 3, readUint16(data, pos + 1, options), options);
}
function decodeString32(data, pos, _minor, options) {
  return toToken$2(data, pos, 5, readUint32(data, pos + 1, options), options);
}
function decodeString64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer string lengths not supported`);
  }
  return toToken$2(data, pos, 9, l, options);
}
const encodeString = encodeBytes;
function toToken$1(_data, _pos, prefix, length2) {
  return new Token(Type.array, length2, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken$1(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken$1(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken$1(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken$1(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer array lengths not supported`);
  }
  return toToken$1(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken$1(data, pos, 1, Infinity);
}
function encodeArray(buf2, token) {
  encodeUintValue(buf2, Type.array.majorEncoded, token.value);
}
encodeArray.compareTokens = encodeUint.compareTokens;
encodeArray.encodedSize = function encodedSize5(token) {
  return encodeUintValue.encodedSize(token.value);
};
function toToken(_data, _pos, prefix, length2) {
  return new Token(Type.map, length2, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer map lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken(data, pos, 1, Infinity);
}
function encodeMap(buf2, token) {
  encodeUintValue(buf2, Type.map.majorEncoded, token.value);
}
encodeMap.compareTokens = encodeUint.compareTokens;
encodeMap.encodedSize = function encodedSize6(token) {
  return encodeUintValue.encodedSize(token.value);
};
function decodeTagCompact(_data, _pos, minor, _options) {
  return new Token(Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf2, token) {
  encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
}
encodeTag.compareTokens = encodeUint.compareTokens;
encodeTag.encodedSize = function encodedSize7(token) {
  return encodeUintValue.encodedSize(token.value);
};
const MINOR_FALSE = 20;
const MINOR_TRUE = 21;
const MINOR_NULL = 22;
const MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token(Type.null, null, 1);
  }
  return new Token(Type.undefined, void 0, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return new Token(Type.break, void 0, 1);
}
function createToken(value, bytes2, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix} NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
    }
  }
  return new Token(Type.float, value, bytes2);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf2, token, options) {
  const float2 = token.value;
  if (float2 === false) {
    buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float2 === true) {
    buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float2 === null) {
    buf2.push([Type.float.majorEncoded | MINOR_NULL]);
  } else if (float2 === void 0) {
    buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float2);
      decoded = readFloat16(ui8a, 1);
      if (float2 === decoded || Number.isNaN(float2)) {
        ui8a[0] = 249;
        buf2.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float2);
        decoded = readFloat32(ui8a, 1);
        if (float2 === decoded) {
          ui8a[0] = 250;
          buf2.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float2);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf2.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize8(token, options) {
  const float2 = token.value;
  if (float2 === false || float2 === true || float2 === null || float2 === void 0) {
    return 1;
  }
  if (!options || options.float64 !== true) {
    encodeFloat16(float2);
    let decoded = readFloat16(ui8a, 1);
    if (float2 === decoded || Number.isNaN(float2)) {
      return 3;
    }
    encodeFloat32(float2);
    decoded = readFloat32(ui8a, 1);
    if (float2 === decoded) {
      return 5;
    }
  }
  return 9;
};
const buffer = new ArrayBuffer(9);
const dataView = new DataView(buffer, 1);
const ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | 1 << 24 + logicalExponent, false);
      } else {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat16(ui8a2, pos) {
  if (ui8a2.length - pos < 2) {
    throw new Error(`${decodeErrPrefix} not enough data for float16`);
  }
  const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a2, pos) {
  if (ui8a2.length - pos < 4) {
    throw new Error(`${decodeErrPrefix} not enough data for float32`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a2, pos) {
  if (ui8a2.length - pos < 8) {
    throw new Error(`${decodeErrPrefix} not enough data for float64`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = encodeUint.compareTokens;
function invalidMinor(data, pos, minor) {
  throw new Error(`${decodeErrPrefix} encountered invalid minor (${minor}) for major ${data[pos] >>> 5}`);
}
function errorer(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix} ${msg}`);
  };
}
const jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = decodeUint8;
jump[25] = decodeUint16;
jump[26] = decodeUint32;
jump[27] = decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = decodeNegint8;
jump[57] = decodeNegint16;
jump[58] = decodeNegint32;
jump[59] = decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = decodeBytesCompact;
}
jump[88] = decodeBytes8;
jump[89] = decodeBytes16;
jump[90] = decodeBytes32;
jump[91] = decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer("indefinite length bytes/strings are not supported");
for (let i = 96; i <= 119; i++) {
  jump[i] = decodeStringCompact;
}
jump[120] = decodeString8;
jump[121] = decodeString16;
jump[122] = decodeString32;
jump[123] = decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer("indefinite length bytes/strings are not supported");
for (let i = 128; i <= 151; i++) {
  jump[i] = decodeArrayCompact;
}
jump[152] = decodeArray8;
jump[153] = decodeArray16;
jump[154] = decodeArray32;
jump[155] = decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = decodeMapCompact;
}
jump[184] = decodeMap8;
jump[185] = decodeMap16;
jump[186] = decodeMap32;
jump[187] = decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = decodeTagCompact;
}
jump[216] = decodeTag8;
jump[217] = decodeTag16;
jump[218] = decodeTag32;
jump[219] = decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer("simple values are not supported");
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = decodeUndefined;
jump[248] = errorer("simple values are not supported");
jump[249] = decodeFloat16;
jump[250] = decodeFloat32;
jump[251] = decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = decodeBreak;
const quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new Token(Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new Token(Type.negint, i, 1);
}
quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
quick[96] = new Token(Type.string, "", 1);
quick[128] = new Token(Type.array, 0, 1);
quick[160] = new Token(Type.map, 0, 1);
quick[244] = new Token(Type.false, false, 1);
quick[245] = new Token(Type.true, true, 1);
quick[246] = new Token(Type.null, null, 1);
function quickEncodeToken(token) {
  switch (token.type) {
    case Type.false:
      return fromArray([244]);
    case Type.true:
      return fromArray([245]);
    case Type.null:
      return fromArray([246]);
    case Type.bytes:
      if (!token.value.length) {
        return fromArray([64]);
      }
      return;
    case Type.string:
      if (token.value === "") {
        return fromArray([96]);
      }
      return;
    case Type.array:
      if (token.value === 0) {
        return fromArray([128]);
      }
      return;
    case Type.map:
      if (token.value === 0) {
        return fromArray([160]);
      }
      return;
    case Type.uint:
      if (token.value < 24) {
        return fromArray([Number(token.value)]);
      }
      return;
    case Type.negint:
      if (token.value >= -24) {
        return fromArray([31 - Number(token.value)]);
      }
  }
}
const defaultEncodeOptions$2 = {
  float64: false,
  mapSorter: mapSorter$1,
  quickEncodeToken
};
function makeCborEncoders() {
  const encoders = [];
  encoders[Type.uint.major] = encodeUint;
  encoders[Type.negint.major] = encodeNegint;
  encoders[Type.bytes.major] = encodeBytes;
  encoders[Type.string.major] = encodeString;
  encoders[Type.array.major] = encodeArray;
  encoders[Type.map.major] = encodeMap;
  encoders[Type.tag.major] = encodeTag;
  encoders[Type.float.major] = encodeFloat;
  return encoders;
}
const cborEncoders$1 = makeCborEncoders();
const buf = new Bl();
class Ref {
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${encodeErrPrefix} object contains circular references`);
    }
    return new Ref(obj, stack);
  }
}
const simpleTokens = {
  null: new Token(Type.null, null),
  undefined: new Token(Type.undefined, void 0),
  true: new Token(Type.true, true),
  false: new Token(Type.false, false),
  emptyArray: new Token(Type.array, 0),
  emptyMap: new Token(Type.map, 0)
};
const typeEncoders = {
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new Token(Type.float, obj);
    } else if (obj >= 0) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  Uint8Array(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, obj);
  },
  string(obj, _typ, _options, _refStack) {
    return new Token(Type.string, obj);
  },
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj));
  },
  DataView(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyArray,
          new Token(Type.break)
        ];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [
        new Token(Type.array, obj.length),
        entries,
        new Token(Type.break)
      ];
    }
    return [
      new Token(Type.array, obj.length),
      entries
    ];
  },
  Object(obj, typ, options, refStack) {
    const isMap = typ !== "Object";
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length2 = isMap ? obj.size : keys.length;
    if (!length2) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyMap,
          new Token(Type.break)
        ];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens(key, options, refStack),
        objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack)
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [
        new Token(Type.map, length2),
        entries,
        new Token(Type.break)
      ];
    }
    return [
      new Token(Type.map, length2),
      entries
    ];
  }
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
  typeEncoders[`${typ}Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = is(obj);
  const customTypeEncoder = options && options.typeEncoders && options.typeEncoders[typ] || typeEncoders[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter$1(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders$1[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone");
  }
  return tcmp;
}
function tokensToEncoded(buf2, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf2, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf2, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf2 = new Bl(size);
      encoder(buf2, tokens, options);
      if (buf2.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${tokens} was wrong`);
      }
      return asU8A(buf2.chunks[0]);
    }
  }
  buf.reset();
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode$o(data, options) {
  options = Object.assign({}, defaultEncodeOptions$2, options);
  return encodeCustom(data, cborEncoders$1, options);
}
const defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
class Tokeniser {
  constructor(data, options = {}) {
    this.pos = 0;
    this.data = data;
    this.options = options;
  }
  done() {
    return this.pos >= this.data.length;
  }
  next() {
    const byt = this.data[this.pos];
    let token = quick[byt];
    if (token === void 0) {
      const decoder = jump[byt];
      if (!decoder) {
        throw new Error(`${decodeErrPrefix} no decoder for major type ${byt >>> 5} (byte 0x${byt.toString(16).padStart(2, "0")})`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this.pos, minor, this.options);
    }
    this.pos += token.encodedLength;
    return token;
  }
}
const DONE = Symbol.for("DONE");
const BREAK = Symbol.for("BREAK");
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed array`);
    }
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed map`);
    }
    if (key === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`);
    }
    if (useMaps !== true && typeof key !== "string") {
      throw new Error(`${decodeErrPrefix} non-string keys not supported (got ${typeof key})`);
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`);
    }
    if (useMaps) {
      m.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === Type.break) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === Type.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decode$x(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${decodeErrPrefix} did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${decodeErrPrefix} got unexpected break`);
  }
  if (!tokeniser.done()) {
    throw new Error(`${decodeErrPrefix} too many terminals, data makes no sense`);
  }
  return decoded;
}
const cborEncoders = makeCborEncoders();
const defaultEncodeOptions$1 = {
  float64: false,
  quickEncodeToken
};
function tokensToLength(tokens, encoders = cborEncoders, options = defaultEncodeOptions$1) {
  if (Array.isArray(tokens)) {
    let len = 0;
    for (const token of tokens) {
      len += tokensToLength(token, encoders, options);
    }
    return len;
  } else {
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize === void 0 || typeof encoder.encodedSize !== "function") {
      throw new Error(`Encoder for ${tokens.type.name} does not have an encodedSize()`);
    }
    return encoder.encodedSize(tokens, options);
  }
}
var encode_1$5 = encode$n;
var MSB$6 = 128, REST$6 = 127, MSBALL$5 = ~REST$6, INT$5 = Math.pow(2, 31);
function encode$n(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$5) {
    out[offset++] = num & 255 | MSB$6;
    num /= 128;
  }
  while (num & MSBALL$5) {
    out[offset++] = num & 255 | MSB$6;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$n.bytes = offset - oldOffset + 1;
  return out;
}
var decode$w = read$5;
var MSB$1$5 = 128, REST$1$5 = 127;
function read$5(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read$5.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1$5) << shift : (b & REST$1$5) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1$5);
  read$5.bytes = counter - offset;
  return res;
}
var N1$5 = Math.pow(2, 7);
var N2$5 = Math.pow(2, 14);
var N3$5 = Math.pow(2, 21);
var N4$5 = Math.pow(2, 28);
var N5$5 = Math.pow(2, 35);
var N6$5 = Math.pow(2, 42);
var N7$5 = Math.pow(2, 49);
var N8$5 = Math.pow(2, 56);
var N9$5 = Math.pow(2, 63);
var length$6 = function(value) {
  return value < N1$5 ? 1 : value < N2$5 ? 2 : value < N3$5 ? 3 : value < N4$5 ? 4 : value < N5$5 ? 5 : value < N6$5 ? 6 : value < N7$5 ? 7 : value < N8$5 ? 8 : value < N9$5 ? 9 : 10;
};
var varint$5 = {
  encode: encode_1$5,
  decode: decode$w,
  encodingLength: length$6
};
var _brrp_varint$5 = varint$5;
const decode$v = (data, offset = 0) => {
  const code2 = _brrp_varint$5.decode(data, offset);
  return [
    code2,
    _brrp_varint$5.decode.bytes
  ];
};
const encodeTo$5 = (int, target, offset = 0) => {
  _brrp_varint$5.encode(int, target, offset);
  return target;
};
const encodingLength$5 = (int) => {
  return _brrp_varint$5.encodingLength(int);
};
const equals$e = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$7 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const create$7 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$5(code2);
  const digestOffset = sizeOffset + encodingLength$5(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo$5(code2, bytes2, 0);
  encodeTo$5(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest$5(code2, size, digest2, bytes2);
};
const decode$u = (multihash) => {
  const bytes2 = coerce$7(multihash);
  const [code2, sizeOffset] = decode$v(bytes2);
  const [size, digestOffset] = decode$v(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$5(code2, size, digest2, bytes2);
};
const equals$d = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$e(a.bytes, b.bytes);
  }
};
class Digest$5 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
}
function base$7(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$7 = base$7;
var _brrp__multiformats_scope_baseX$7 = src$7;
class Encoder$7 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$7 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$7(this, decoder);
  }
}
class ComposedDecoder$7 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$7(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$7 = (left, right) => new ComposedDecoder$7({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$7 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$7(name2, prefix, baseEncode);
    this.decoder = new Decoder$7(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$b = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$7(name2, prefix, encode2, decode2);
const baseX$7 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$7(alphabet2, name2);
  return from$b({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$7(decode2(text))
  });
};
const decode$t = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$m = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$7 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$b({
    prefix,
    name: name2,
    encode(input) {
      return encode$m(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$t(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$7 = baseX$7({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$7({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$9 = rfc4648$7({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$7({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
class CID$5 {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$5,
      byteLength: hidden$5,
      code: readonly$6,
      version: readonly$6,
      multihash: readonly$6,
      bytes: readonly$6,
      _baseCache: hidden$5,
      asCID: hidden$5
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$5) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$5) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$5.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$7(code2, digest2);
        return CID$5.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$d(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$5(bytes2, _baseCache, base3 || base58btc$7.encoder);
      default:
        return toStringV1$5(bytes2, _baseCache, base3 || base32$9.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$5(/^0\.0/, IS_CID_DEPRECATION$5);
    return !!(value && (value[cidSymbol$5] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$5) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID$5(version2, code2, multihash, bytes2 || encodeCID$5(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$5] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$u(multihash);
      return CID$5.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$5) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$5}) block encoding`);
        } else {
          return new CID$5(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID$5(version2, code2, digest2.bytes);
        return new CID$5(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$5.create(0, DAG_PB_CODE$5, digest2);
  }
  static createV1(code2, digest2) {
    return CID$5.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID$5.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID$5.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$7(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$5(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$5.createV0(digest2) : CID$5.createV1(specs.codec, digest2);
    return [
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$v(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$5;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes$5(source, base3);
    const cid = CID$5.decode(bytes2);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$5 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$7;
      return [
        base58btc$7.prefix,
        decoder.decode(`${base58btc$7.prefix}${source}`)
      ];
    }
    case base58btc$7.prefix: {
      const decoder = base3 || base58btc$7;
      return [
        base58btc$7.prefix,
        decoder.decode(source)
      ];
    }
    case base32$9.prefix: {
      const decoder = base3 || base32$9;
      return [
        base32$9.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$5 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$7.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$5 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$5 = 112;
const SHA_256_CODE$5 = 18;
const encodeCID$5 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$5(version2);
  const hashOffset = codeOffset + encodingLength$5(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$5(version2, bytes2, 0);
  encodeTo$5(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
const cidSymbol$5 = Symbol.for("@ipld/js-cid/CID");
const readonly$6 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$5 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$6 = "0.0.0-dev";
const deprecate$5 = (range, message) => {
  if (range.test(version$6)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$5 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const CID_CBOR_TAG = 42;
function cidEncoder$1(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid = CID$5.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes2 = new Uint8Array(cid.bytes.byteLength + 1);
  bytes2.set(cid.bytes, 1);
  return [
    new Token(Type.tag, CID_CBOR_TAG),
    new Token(Type.bytes, bytes2)
  ];
}
function undefinedEncoder$1() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder$1(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
const encodeOptions$1 = {
  float64: true,
  typeEncoders: {
    Object: cidEncoder$1,
    undefined: undefinedEncoder$1,
    number: numberEncoder$1
  }
};
function cidDecoder(bytes2) {
  if (bytes2[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID$5.decode(bytes2.subarray(1));
}
const decodeOptions$1 = {
  allowIndefinite: false,
  coerceUndefinedToNull: true,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  strict: true,
  useMaps: false,
  tags: []
};
decodeOptions$1.tags[CID_CBOR_TAG] = cidDecoder;
const name$4 = "dag-cbor";
const code$6 = 113;
const encode$l = (node) => encode$o(node, encodeOptions$1);
const decode$s = (data) => decode$x(data, decodeOptions$1);
const dagCBOR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: name$4,
  code: code$6,
  encode: encode$l,
  decode: decode$s
}, Symbol.toStringTag, { value: "Module" }));
class CarBufferWriter {
  constructor(bytes2, headerSize) {
    this.bytes = bytes2;
    this.byteOffset = headerSize;
    this.roots = [];
    this.headerSize = headerSize;
  }
  addRoot(root, options) {
    addRoot(this, root, options);
    return this;
  }
  write(block) {
    addBlock(this, block);
    return this;
  }
  close(options) {
    return close(this, options);
  }
}
const addRoot = (writer2, root, options = {}) => {
  const {
    resize = false
  } = options;
  const { bytes: bytes2, headerSize, byteOffset, roots: roots2 } = writer2;
  writer2.roots.push(root);
  const size = headerLength(writer2);
  if (size > headerSize) {
    if (size - headerSize + byteOffset < bytes2.byteLength) {
      if (resize) {
        resizeHeader(writer2, size);
      } else {
        roots2.pop();
        throw new RangeError(`Header of size ${headerSize} has no capacity for new root ${root}.
  However there is a space in the buffer and you could call addRoot(root, { resize: root }) to resize header to make a space for this root.`);
      }
    } else {
      roots2.pop();
      throw new RangeError(`Buffer has no capacity for a new root ${root}`);
    }
  }
};
const blockLength = ({ cid, bytes: bytes2 }) => {
  const size = cid.bytes.byteLength + bytes2.byteLength;
  return varint$6.encodingLength(size) + size;
};
const addBlock = (writer2, { cid, bytes: bytes2 }) => {
  const byteLength = cid.bytes.byteLength + bytes2.byteLength;
  const size = varint$6.encode(byteLength);
  if (writer2.byteOffset + size.length + byteLength > writer2.bytes.byteLength) {
    throw new RangeError("Buffer has no capacity for this block");
  } else {
    writeBytes$1(writer2, size);
    writeBytes$1(writer2, cid.bytes);
    writeBytes$1(writer2, bytes2);
  }
};
const close = (writer2, options = {}) => {
  const {
    resize = false
  } = options;
  const { roots: roots2, bytes: bytes2, byteOffset, headerSize } = writer2;
  const headerBytes = encode$l({
    version: 1,
    roots: roots2
  });
  const varintBytes = varint$6.encode(headerBytes.length);
  const size = varintBytes.length + headerBytes.byteLength;
  const offset = headerSize - size;
  if (offset === 0) {
    writeHeader(writer2, varintBytes, headerBytes);
    return bytes2.subarray(0, byteOffset);
  } else if (resize) {
    resizeHeader(writer2, size);
    writeHeader(writer2, varintBytes, headerBytes);
    return bytes2.subarray(0, writer2.byteOffset);
  } else {
    throw new RangeError(`Header size was overestimated.
You can use close({ resize: true }) to resize header`);
  }
};
const resizeHeader = (writer2, byteLength) => {
  const { bytes: bytes2, headerSize } = writer2;
  bytes2.set(bytes2.subarray(headerSize, writer2.byteOffset), byteLength);
  writer2.byteOffset += byteLength - headerSize;
  writer2.headerSize = byteLength;
};
const writeBytes$1 = (writer2, bytes2) => {
  writer2.bytes.set(bytes2, writer2.byteOffset);
  writer2.byteOffset += bytes2.length;
};
const writeHeader = ({ bytes: bytes2 }, varint2, header) => {
  bytes2.set(varint2);
  bytes2.set(header, varint2.length);
};
const headerPreludeTokens = [
  new Token(Type.map, 2),
  new Token(Type.string, "version"),
  new Token(Type.uint, 1),
  new Token(Type.string, "roots")
];
const CID_TAG = new Token(Type.tag, 42);
const calculateHeaderLength = (rootLengths) => {
  const tokens = [...headerPreludeTokens];
  tokens.push(new Token(Type.array, rootLengths.length));
  for (const rootLength of rootLengths) {
    tokens.push(CID_TAG);
    tokens.push(new Token(Type.bytes, { length: rootLength + 1 }));
  }
  const length2 = tokensToLength(tokens);
  return varint$6.encodingLength(length2) + length2;
};
const headerLength = ({ roots: roots2 }) => calculateHeaderLength(roots2.map((cid) => cid.bytes.byteLength));
const createWriter = (buffer2, options = {}) => {
  const { roots: roots2 = [], byteOffset = 0, byteLength = buffer2.byteLength, headerSize = headerLength({ roots: roots2 }) } = options;
  const bytes2 = new Uint8Array(buffer2, byteOffset, byteLength);
  const writer2 = new CarBufferWriter(bytes2, headerSize);
  for (const root of roots2) {
    writer2.addRoot(root);
  }
  return writer2;
};
var encode_1$4 = encode$k;
var MSB$5 = 128, REST$5 = 127, MSBALL$4 = ~REST$5, INT$4 = Math.pow(2, 31);
function encode$k(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$4) {
    out[offset++] = num & 255 | MSB$5;
    num /= 128;
  }
  while (num & MSBALL$4) {
    out[offset++] = num & 255 | MSB$5;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$k.bytes = offset - oldOffset + 1;
  return out;
}
var decode$r = read$4;
var MSB$1$4 = 128, REST$1$4 = 127;
function read$4(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read$4.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1$4) << shift : (b & REST$1$4) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1$4);
  read$4.bytes = counter - offset;
  return res;
}
var N1$4 = Math.pow(2, 7);
var N2$4 = Math.pow(2, 14);
var N3$4 = Math.pow(2, 21);
var N4$4 = Math.pow(2, 28);
var N5$4 = Math.pow(2, 35);
var N6$4 = Math.pow(2, 42);
var N7$4 = Math.pow(2, 49);
var N8$4 = Math.pow(2, 56);
var N9$4 = Math.pow(2, 63);
var length$5 = function(value) {
  return value < N1$4 ? 1 : value < N2$4 ? 2 : value < N3$4 ? 3 : value < N4$4 ? 4 : value < N5$4 ? 5 : value < N6$4 ? 6 : value < N7$4 ? 7 : value < N8$4 ? 8 : value < N9$4 ? 9 : 10;
};
var varint$4 = {
  encode: encode_1$4,
  decode: decode$r,
  encodingLength: length$5
};
var _brrp_varint$4 = varint$4;
const decode$q = (data, offset = 0) => {
  const code2 = _brrp_varint$4.decode(data, offset);
  return [
    code2,
    _brrp_varint$4.decode.bytes
  ];
};
const encodeTo$4 = (int, target, offset = 0) => {
  _brrp_varint$4.encode(int, target, offset);
  return target;
};
const encodingLength$4 = (int) => {
  return _brrp_varint$4.encodingLength(int);
};
const equals$c = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$6 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const create$6 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$4(code2);
  const digestOffset = sizeOffset + encodingLength$4(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo$4(code2, bytes2, 0);
  encodeTo$4(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest$4(code2, size, digest2, bytes2);
};
const decode$p = (multihash) => {
  const bytes2 = coerce$6(multihash);
  const [code2, sizeOffset] = decode$q(bytes2);
  const [size, digestOffset] = decode$q(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$4(code2, size, digest2, bytes2);
};
const equals$b = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$c(a.bytes, b.bytes);
  }
};
class Digest$4 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
}
function base$6(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$6 = base$6;
var _brrp__multiformats_scope_baseX$6 = src$6;
class Encoder$6 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$6 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$6(this, decoder);
  }
}
class ComposedDecoder$6 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$6(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$6 = (left, right) => new ComposedDecoder$6({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$6 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$6(name2, prefix, baseEncode);
    this.decoder = new Decoder$6(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$a = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$6(name2, prefix, encode2, decode2);
const baseX$6 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$6(alphabet2, name2);
  return from$a({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$6(decode2(text))
  });
};
const decode$o = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$j = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$6 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$a({
    prefix,
    name: name2,
    encode(input) {
      return encode$j(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$o(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$6 = baseX$6({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$6({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$8 = rfc4648$6({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$6({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
class CID$4 {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$4,
      byteLength: hidden$4,
      code: readonly$5,
      version: readonly$5,
      multihash: readonly$5,
      bytes: readonly$5,
      _baseCache: hidden$4,
      asCID: hidden$4
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$4) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$4) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$4.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$6(code2, digest2);
        return CID$4.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$b(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$4(bytes2, _baseCache, base3 || base58btc$6.encoder);
      default:
        return toStringV1$4(bytes2, _baseCache, base3 || base32$8.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$4(/^0\.0/, IS_CID_DEPRECATION$4);
    return !!(value && (value[cidSymbol$4] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$4) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID$4(version2, code2, multihash, bytes2 || encodeCID$4(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$4] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$p(multihash);
      return CID$4.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$4) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$4}) block encoding`);
        } else {
          return new CID$4(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID$4(version2, code2, digest2.bytes);
        return new CID$4(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$4.create(0, DAG_PB_CODE$4, digest2);
  }
  static createV1(code2, digest2) {
    return CID$4.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID$4.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID$4.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$6(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$4(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$4.createV0(digest2) : CID$4.createV1(specs.codec, digest2);
    return [
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$q(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$4;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes$4(source, base3);
    const cid = CID$4.decode(bytes2);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$4 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$6;
      return [
        base58btc$6.prefix,
        decoder.decode(`${base58btc$6.prefix}${source}`)
      ];
    }
    case base58btc$6.prefix: {
      const decoder = base3 || base58btc$6;
      return [
        base58btc$6.prefix,
        decoder.decode(source)
      ];
    }
    case base32$8.prefix: {
      const decoder = base3 || base32$8;
      return [
        base32$8.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$4 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$6.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$4 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$4 = 112;
const SHA_256_CODE$4 = 18;
const encodeCID$4 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$4(version2);
  const hashOffset = codeOffset + encodingLength$4(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$4(version2, bytes2, 0);
  encodeTo$4(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
const cidSymbol$4 = Symbol.for("@ipld/js-cid/CID");
const readonly$5 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$4 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$5 = "0.0.0-dev";
const deprecate$4 = (range, message) => {
  if (range.test(version$5)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$4 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const Kinds = {
  Null: (obj) => obj === null,
  Int: (obj) => Number.isInteger(obj),
  Float: (obj) => typeof obj === "number" && Number.isFinite(obj),
  String: (obj) => typeof obj === "string",
  Bool: (obj) => typeof obj === "boolean",
  Bytes: (obj) => obj instanceof Uint8Array,
  Link: (obj) => !Kinds.Null(obj) && typeof obj === "object" && obj.asCID === obj,
  List: (obj) => Array.isArray(obj),
  Map: (obj) => !Kinds.Null(obj) && typeof obj === "object" && obj.asCID !== obj && !Kinds.List(obj) && !Kinds.Bytes(obj)
};
const Types = {
  Int: Kinds.Int,
  "CarHeader > version": (obj) => Types.Int(obj),
  "CarHeader > roots (anon) > valueType (anon)": Kinds.Link,
  "CarHeader > roots (anon)": (obj) => Kinds.List(obj) && Array.prototype.every.call(obj, Types["CarHeader > roots (anon) > valueType (anon)"]),
  "CarHeader > roots": (obj) => Types["CarHeader > roots (anon)"](obj),
  CarHeader: (obj) => {
    const keys = obj && Object.keys(obj);
    return Kinds.Map(obj) && ["version"].every((k) => keys.includes(k)) && Object.entries(obj).every(([name2, value]) => Types["CarHeader > " + name2] && Types["CarHeader > " + name2](value));
  }
};
const CarHeader = Types.CarHeader;
const CIDV0_BYTES = {
  SHA2_256: 18,
  LENGTH: 32,
  DAG_PB: 112
};
const V2_HEADER_LENGTH = 16 + 8 + 8 + 8;
async function readVarint(reader2) {
  const bytes2 = await reader2.upTo(8);
  if (!bytes2.length) {
    throw new Error("Unexpected end of data");
  }
  const i = varint$6.decode(bytes2);
  reader2.seek(varint$6.decode.bytes);
  return i;
}
async function readV2Header(reader2) {
  const bytes2 = await reader2.exactly(V2_HEADER_LENGTH);
  const dv = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  let offset = 0;
  const header = {
    version: 2,
    characteristics: [
      dv.getBigUint64(offset, true),
      dv.getBigUint64(offset += 8, true)
    ],
    dataOffset: Number(dv.getBigUint64(offset += 8, true)),
    dataSize: Number(dv.getBigUint64(offset += 8, true)),
    indexOffset: Number(dv.getBigUint64(offset += 8, true))
  };
  reader2.seek(V2_HEADER_LENGTH);
  return header;
}
async function readHeader$1(reader2, strictVersion) {
  const length2 = await readVarint(reader2);
  if (length2 === 0) {
    throw new Error("Invalid CAR header (zero length)");
  }
  const header = await reader2.exactly(length2);
  reader2.seek(length2);
  const block = decode$s(header);
  if (!CarHeader(block)) {
    throw new Error("Invalid CAR header format");
  }
  if (block.version !== 1 && block.version !== 2 || strictVersion !== void 0 && block.version !== strictVersion) {
    throw new Error(`Invalid CAR version: ${block.version}${strictVersion !== void 0 ? ` (expected ${strictVersion})` : ""}`);
  }
  const hasRoots = Array.isArray(block.roots);
  if (block.version === 1 && !hasRoots || block.version === 2 && hasRoots) {
    throw new Error("Invalid CAR header format");
  }
  if (block.version === 1) {
    return block;
  }
  const v2Header = await readV2Header(reader2);
  reader2.seek(v2Header.dataOffset - reader2.pos);
  const v1Header = await readHeader$1(reader2, 1);
  return Object.assign(v1Header, v2Header);
}
async function readMultihash(reader2) {
  const bytes2 = await reader2.upTo(8);
  varint$6.decode(bytes2);
  const codeLength = varint$6.decode.bytes;
  const length2 = varint$6.decode(bytes2.subarray(varint$6.decode.bytes));
  const lengthLength = varint$6.decode.bytes;
  const mhLength = codeLength + lengthLength + length2;
  const multihash = await reader2.exactly(mhLength);
  reader2.seek(mhLength);
  return multihash;
}
async function readCid(reader2) {
  const first2 = await reader2.exactly(2);
  if (first2[0] === CIDV0_BYTES.SHA2_256 && first2[1] === CIDV0_BYTES.LENGTH) {
    const bytes3 = await reader2.exactly(34);
    reader2.seek(34);
    const multihash2 = decode$p(bytes3);
    return CID$4.create(0, CIDV0_BYTES.DAG_PB, multihash2);
  }
  const version2 = await readVarint(reader2);
  if (version2 !== 1) {
    throw new Error(`Unexpected CID version (${version2})`);
  }
  const codec = await readVarint(reader2);
  const bytes2 = await readMultihash(reader2);
  const multihash = decode$p(bytes2);
  return CID$4.create(version2, codec, multihash);
}
async function readBlockHead(reader2) {
  const start = reader2.pos;
  let length2 = await readVarint(reader2);
  if (length2 === 0) {
    throw new Error("Invalid CAR section (zero length)");
  }
  length2 += reader2.pos - start;
  const cid = await readCid(reader2);
  const blockLength2 = length2 - Number(reader2.pos - start);
  return {
    cid,
    length: length2,
    blockLength: blockLength2
  };
}
async function readBlock(reader2) {
  const { cid, blockLength: blockLength2 } = await readBlockHead(reader2);
  const bytes2 = await reader2.exactly(blockLength2);
  reader2.seek(blockLength2);
  return {
    bytes: bytes2,
    cid
  };
}
async function readBlockIndex(reader2) {
  const offset = reader2.pos;
  const { cid, length: length2, blockLength: blockLength2 } = await readBlockHead(reader2);
  const index = {
    cid,
    length: length2,
    blockLength: blockLength2,
    offset,
    blockOffset: reader2.pos
  };
  reader2.seek(index.blockLength);
  return index;
}
function createDecoder(reader2) {
  const headerPromise = (async () => {
    const header = await readHeader$1(reader2);
    if (header.version === 2) {
      const v1length = reader2.pos - header.dataOffset;
      reader2 = limitReader(reader2, header.dataSize - v1length);
    }
    return header;
  })();
  return {
    header: () => headerPromise,
    async *blocks() {
      await headerPromise;
      while ((await reader2.upTo(8)).length > 0) {
        yield await readBlock(reader2);
      }
    },
    async *blocksIndex() {
      await headerPromise;
      while ((await reader2.upTo(8)).length > 0) {
        yield await readBlockIndex(reader2);
      }
    }
  };
}
function bytesReader(bytes2) {
  let pos = 0;
  return {
    async upTo(length2) {
      return bytes2.subarray(pos, pos + Math.min(length2, bytes2.length - pos));
    },
    async exactly(length2) {
      if (length2 > bytes2.length - pos) {
        throw new Error("Unexpected end of data");
      }
      return bytes2.subarray(pos, pos + length2);
    },
    seek(length2) {
      pos += length2;
    },
    get pos() {
      return pos;
    }
  };
}
function chunkReader(readChunk) {
  let pos = 0;
  let have = 0;
  let offset = 0;
  let currentChunk = new Uint8Array(0);
  const read2 = async (length2) => {
    have = currentChunk.length - offset;
    const bufa = [currentChunk.subarray(offset)];
    while (have < length2) {
      const chunk = await readChunk();
      if (chunk == null) {
        break;
      }
      if (have < 0) {
        if (chunk.length > have) {
          bufa.push(chunk.subarray(-have));
        }
      } else {
        bufa.push(chunk);
      }
      have += chunk.length;
    }
    currentChunk = new Uint8Array(bufa.reduce((p, c) => p + c.length, 0));
    let off2 = 0;
    for (const b of bufa) {
      currentChunk.set(b, off2);
      off2 += b.length;
    }
    offset = 0;
  };
  return {
    async upTo(length2) {
      if (currentChunk.length - offset < length2) {
        await read2(length2);
      }
      return currentChunk.subarray(offset, offset + Math.min(currentChunk.length - offset, length2));
    },
    async exactly(length2) {
      if (currentChunk.length - offset < length2) {
        await read2(length2);
      }
      if (currentChunk.length - offset < length2) {
        throw new Error("Unexpected end of data");
      }
      return currentChunk.subarray(offset, offset + length2);
    },
    seek(length2) {
      pos += length2;
      offset += length2;
    },
    get pos() {
      return pos;
    }
  };
}
function asyncIterableReader(asyncIterable) {
  const iterator2 = asyncIterable[Symbol.asyncIterator]();
  async function readChunk() {
    const next = await iterator2.next();
    if (next.done) {
      return null;
    }
    return next.value;
  }
  return chunkReader(readChunk);
}
function limitReader(reader2, byteLimit) {
  let bytesRead = 0;
  return {
    async upTo(length2) {
      let bytes2 = await reader2.upTo(length2);
      if (bytes2.length + bytesRead > byteLimit) {
        bytes2 = bytes2.subarray(0, byteLimit - bytesRead);
      }
      return bytes2;
    },
    async exactly(length2) {
      const bytes2 = await reader2.exactly(length2);
      if (bytes2.length + bytesRead > byteLimit) {
        throw new Error("Unexpected end of data");
      }
      return bytes2;
    },
    seek(length2) {
      bytesRead += length2;
      reader2.seek(length2);
    },
    get pos() {
      return reader2.pos;
    }
  };
}
class CarReader {
  constructor(header, blocks) {
    this._header = header;
    this._blocks = blocks;
    this._keys = blocks.map((b) => b.cid.toString());
  }
  get version() {
    return this._header.version;
  }
  async getRoots() {
    return this._header.roots;
  }
  async has(key) {
    return this._keys.indexOf(key.toString()) > -1;
  }
  async get(key) {
    const index = this._keys.indexOf(key.toString());
    return index > -1 ? this._blocks[index] : void 0;
  }
  async *blocks() {
    for (const block of this._blocks) {
      yield block;
    }
  }
  async *cids() {
    for (const block of this._blocks) {
      yield block.cid;
    }
  }
  static async fromBytes(bytes2) {
    if (!(bytes2 instanceof Uint8Array)) {
      throw new TypeError("fromBytes() requires a Uint8Array");
    }
    return decodeReaderComplete(bytesReader(bytes2));
  }
  static async fromIterable(asyncIterable) {
    if (!asyncIterable || !(typeof asyncIterable[Symbol.asyncIterator] === "function")) {
      throw new TypeError("fromIterable() requires an async iterable");
    }
    return decodeReaderComplete(asyncIterableReader(asyncIterable));
  }
}
async function decodeReaderComplete(reader2) {
  const decoder = createDecoder(reader2);
  const header = await decoder.header();
  const blocks = [];
  for await (const block of decoder.blocks()) {
    blocks.push(block);
  }
  return new CarReader(header, blocks);
}
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
var objectSafeGet = get$1;
function get$1(obj, propsArg, defaultValue) {
  if (!obj) {
    return defaultValue;
  }
  var props, prop;
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0);
  }
  if (typeof propsArg == "string") {
    props = propsArg.split(".");
  }
  if (typeof propsArg == "symbol") {
    props = [propsArg];
  }
  if (!Array.isArray(props)) {
    throw new Error("props arg must be an array, a string or a symbol");
  }
  while (props.length) {
    prop = props.shift();
    if (!obj) {
      return defaultValue;
    }
    obj = obj[prop];
    if (obj === void 0) {
      return defaultValue;
    }
  }
  return obj;
}
var encode_1$3 = encode$i;
var MSB$4 = 128, REST$4 = 127, MSBALL$3 = ~REST$4, INT$3 = Math.pow(2, 31);
function encode$i(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$3) {
    out[offset++] = num & 255 | MSB$4;
    num /= 128;
  }
  while (num & MSBALL$3) {
    out[offset++] = num & 255 | MSB$4;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$i.bytes = offset - oldOffset + 1;
  return out;
}
var decode$n = read$3;
var MSB$1$3 = 128, REST$1$3 = 127;
function read$3(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read$3.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1$3) << shift : (b & REST$1$3) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1$3);
  read$3.bytes = counter - offset;
  return res;
}
var N1$3 = Math.pow(2, 7);
var N2$3 = Math.pow(2, 14);
var N3$3 = Math.pow(2, 21);
var N4$3 = Math.pow(2, 28);
var N5$3 = Math.pow(2, 35);
var N6$3 = Math.pow(2, 42);
var N7$3 = Math.pow(2, 49);
var N8$3 = Math.pow(2, 56);
var N9$3 = Math.pow(2, 63);
var length$4 = function(value) {
  return value < N1$3 ? 1 : value < N2$3 ? 2 : value < N3$3 ? 3 : value < N4$3 ? 4 : value < N5$3 ? 5 : value < N6$3 ? 6 : value < N7$3 ? 7 : value < N8$3 ? 8 : value < N9$3 ? 9 : 10;
};
var varint$3 = {
  encode: encode_1$3,
  decode: decode$n,
  encodingLength: length$4
};
var _brrp_varint$3 = varint$3;
const decode$m = (data, offset = 0) => {
  const code2 = _brrp_varint$3.decode(data, offset);
  return [
    code2,
    _brrp_varint$3.decode.bytes
  ];
};
const encodeTo$3 = (int, target, offset = 0) => {
  _brrp_varint$3.encode(int, target, offset);
  return target;
};
const encodingLength$3 = (int) => {
  return _brrp_varint$3.encodingLength(int);
};
const equals$a = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$5 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const fromString$5 = (str) => new TextEncoder().encode(str);
const toString$5 = (b) => new TextDecoder().decode(b);
const create$5 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$3(code2);
  const digestOffset = sizeOffset + encodingLength$3(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo$3(code2, bytes2, 0);
  encodeTo$3(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest$3(code2, size, digest2, bytes2);
};
const decode$l = (multihash) => {
  const bytes2 = coerce$5(multihash);
  const [code2, sizeOffset] = decode$m(bytes2);
  const [size, digestOffset] = decode$m(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$3(code2, size, digest2, bytes2);
};
const equals$9 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$a(a.bytes, b.bytes);
  }
};
class Digest$3 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
}
function base$5(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$5 = base$5;
var _brrp__multiformats_scope_baseX$5 = src$5;
class Encoder$5 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$5 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$5(this, decoder);
  }
}
class ComposedDecoder$5 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$5(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$5 = (left, right) => new ComposedDecoder$5({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$5 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$5(name2, prefix, baseEncode);
    this.decoder = new Decoder$5(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$9 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$5(name2, prefix, encode2, decode2);
const baseX$5 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$5(alphabet2, name2);
  return from$9({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$5(decode2(text))
  });
};
const decode$k = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$h = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$5 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$9({
    prefix,
    name: name2,
    encode(input) {
      return encode$h(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$k(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$5 = baseX$5({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr$1 = baseX$5({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: base58btc$5,
  base58flickr: base58flickr$1
}, Symbol.toStringTag, { value: "Module" }));
const base32$6 = rfc4648$5({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper$1 = rfc4648$5({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad$2 = rfc4648$5({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper$1 = rfc4648$5({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex$1 = rfc4648$5({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper$1 = rfc4648$5({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad$1 = rfc4648$5({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper$1 = rfc4648$5({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z$1 = rfc4648$5({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: base32$6,
  base32upper: base32upper$1,
  base32pad: base32pad$2,
  base32padupper: base32padupper$1,
  base32hex: base32hex$1,
  base32hexupper: base32hexupper$1,
  base32hexpad: base32hexpad$1,
  base32hexpadupper: base32hexpadupper$1,
  base32z: base32z$1
}, Symbol.toStringTag, { value: "Module" }));
class CID$3 {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$3,
      byteLength: hidden$3,
      code: readonly$4,
      version: readonly$4,
      multihash: readonly$4,
      bytes: readonly$4,
      _baseCache: hidden$3,
      asCID: hidden$3
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$3) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$3) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$3.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$5(code2, digest2);
        return CID$3.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$9(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$3(bytes2, _baseCache, base3 || base58btc$5.encoder);
      default:
        return toStringV1$3(bytes2, _baseCache, base3 || base32$6.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$3(/^0\.0/, IS_CID_DEPRECATION$3);
    return !!(value && (value[cidSymbol$3] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$3) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID$3(version2, code2, multihash, bytes2 || encodeCID$3(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$3] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$l(multihash);
      return CID$3.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$3) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$3}) block encoding`);
        } else {
          return new CID$3(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID$3(version2, code2, digest2.bytes);
        return new CID$3(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$3.create(0, DAG_PB_CODE$3, digest2);
  }
  static createV1(code2, digest2) {
    return CID$3.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID$3.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID$3.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$5(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$3(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$3.createV0(digest2) : CID$3.createV1(specs.codec, digest2);
    return [
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$m(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$3;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes$3(source, base3);
    const cid = CID$3.decode(bytes2);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$3 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$5;
      return [
        base58btc$5.prefix,
        decoder.decode(`${base58btc$5.prefix}${source}`)
      ];
    }
    case base58btc$5.prefix: {
      const decoder = base3 || base58btc$5;
      return [
        base58btc$5.prefix,
        decoder.decode(source)
      ];
    }
    case base32$6.prefix: {
      const decoder = base3 || base32$6;
      return [
        base32$6.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$3 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$5.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$3 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$3 = 112;
const SHA_256_CODE$3 = 18;
const encodeCID$3 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$3(version2);
  const hashOffset = codeOffset + encodingLength$3(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$3(version2, bytes2, 0);
  encodeTo$3(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
const cidSymbol$3 = Symbol.for("@ipld/js-cid/CID");
const readonly$4 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$3 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$4 = "0.0.0-dev";
const deprecate$3 = (range, message) => {
  if (range.test(version$4)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$3 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
let nanoid$1 = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
const identity$9 = from$c({
  prefix: "\0",
  name: "identity",
  encode: (buf2) => toString$7(buf2),
  decode: (str) => fromString$7(str)
});
const identityBase$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$9
}, Symbol.toStringTag, { value: "Module" }));
const base2$4 = rfc4648$8({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: base2$4
}, Symbol.toStringTag, { value: "Module" }));
const base8$4 = rfc4648$8({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: base8$4
}, Symbol.toStringTag, { value: "Module" }));
const base10$4 = baseX$8({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: base10$4
}, Symbol.toStringTag, { value: "Module" }));
const base16$4 = rfc4648$8({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper$2 = rfc4648$8({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
const base16$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: base16$4,
  base16upper: base16upper$2
}, Symbol.toStringTag, { value: "Module" }));
const base36$4 = baseX$8({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper$2 = baseX$8({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: base36$4,
  base36upper: base36upper$2
}, Symbol.toStringTag, { value: "Module" }));
const base64$7 = rfc4648$8({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad$2 = rfc4648$8({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url$3 = rfc4648$8({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad$2 = rfc4648$8({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: base64$7,
  base64pad: base64pad$2,
  base64url: base64url$3,
  base64urlpad: base64urlpad$2
}, Symbol.toStringTag, { value: "Module" }));
const alphabet$2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
const alphabetBytesToChars$2 = alphabet$2.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
const alphabetCharsToBytes$2 = alphabet$2.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode$g(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars$2[c];
    return p;
  }, "");
}
function decode$j(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes$2[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji$4 = from$c({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode$g,
  decode: decode$j
});
const base256emoji$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: base256emoji$4
}, Symbol.toStringTag, { value: "Module" }));
const from$8 = ({ name: name2, code: code2, encode: encode2 }) => new Hasher$2(name2, code2, encode2);
class Hasher$2 {
  constructor(name2, code2, encode2) {
    this.name = name2;
    this.code = code2;
    this.encode = encode2;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create$8(this.code, result) : result.then((digest2) => create$8(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const sha$2 = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256$2 = from$8({
  name: "sha2-256",
  code: 18,
  encode: sha$2("SHA-256")
});
const sha512$2 = from$8({
  name: "sha2-512",
  code: 19,
  encode: sha$2("SHA-512")
});
const sha2$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256: sha256$2,
  sha512: sha512$2
}, Symbol.toStringTag, { value: "Module" }));
const code$5 = 0;
const name$3 = "identity";
const encode$f = coerce$8;
const digest$2 = (input) => create$8(code$5, encode$f(input));
const identity$7 = { code: code$5, name: name$3, encode: encode$f, digest: digest$2 };
const identity$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$7
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const bases$2 = { ...identityBase$2, ...base2$5, ...base8$5, ...base10$5, ...base16$5, ...base32$a, ...base36$5, ...base58$2, ...base64$8, ...base256emoji$5 };
({ ...sha2$2, ...identity$8 });
function asUint8Array$2(buf2) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength);
  }
  return buf2;
}
function allocUnsafe$2(size = 0) {
  var _a2;
  if (((_a2 = globalThis.Buffer) == null ? void 0 : _a2.allocUnsafe) != null) {
    return asUint8Array$2(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}
function createCodec$2(name2, prefix, encode2, decode2) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode2
    },
    decoder: {
      decode: decode2
    }
  };
}
const string$2 = createCodec$2("utf8", "u", (buf2) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf2);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii$2 = createCodec$2("ascii", "a", (buf2) => {
  let string2 = "a";
  for (let i = 0; i < buf2.length; i++) {
    string2 += String.fromCharCode(buf2[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf2 = allocUnsafe$2(str.length);
  for (let i = 0; i < str.length; i++) {
    buf2[i] = str.charCodeAt(i);
  }
  return buf2;
});
const BASES$2 = {
  utf8: string$2,
  "utf-8": string$2,
  hex: bases$2.base16,
  latin1: ascii$2,
  ascii: ascii$2,
  binary: ascii$2,
  ...bases$2
};
function toString$4(array, encoding2 = "utf8") {
  const base3 = BASES$2[encoding2];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding2}"`);
  }
  if ((encoding2 === "utf8" || encoding2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
function fromString$4(string2, encoding2 = "utf8") {
  const base3 = BASES$2[encoding2];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding2}"`);
  }
  if ((encoding2 === "utf8" || encoding2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array$2(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
const pathSepS = "/";
const pathSepB = new TextEncoder().encode(pathSepS);
const pathSep = pathSepB[0];
class Key {
  constructor(s, clean) {
    if (typeof s === "string") {
      this._buf = fromString$4(s);
    } else if (s instanceof Uint8Array) {
      this._buf = s;
    } else {
      throw new Error("Invalid key, should be String of Uint8Array");
    }
    if (clean == null) {
      clean = true;
    }
    if (clean) {
      this.clean();
    }
    if (this._buf.byteLength === 0 || this._buf[0] !== pathSep) {
      throw new Error("Invalid key");
    }
  }
  toString(encoding2 = "utf8") {
    return toString$4(this._buf, encoding2);
  }
  uint8Array() {
    return this._buf;
  }
  get [Symbol.toStringTag]() {
    return `Key(${this.toString()})`;
  }
  static withNamespaces(list) {
    return new Key(list.join(pathSepS));
  }
  static random() {
    return new Key(nanoid$1().replace(/-/g, ""));
  }
  static asKey(other) {
    if (other instanceof Uint8Array || typeof other === "string") {
      return new Key(other);
    }
    if (typeof other.uint8Array === "function") {
      return new Key(other.uint8Array());
    }
    return null;
  }
  clean() {
    if (this._buf == null || this._buf.byteLength === 0) {
      this._buf = pathSepB;
    }
    if (this._buf[0] !== pathSep) {
      const bytes2 = new Uint8Array(this._buf.byteLength + 1);
      bytes2.fill(pathSep, 0, 1);
      bytes2.set(this._buf, 1);
      this._buf = bytes2;
    }
    while (this._buf.byteLength > 1 && this._buf[this._buf.byteLength - 1] === pathSep) {
      this._buf = this._buf.subarray(0, -1);
    }
  }
  less(key) {
    const list1 = this.list();
    const list2 = key.list();
    for (let i = 0; i < list1.length; i++) {
      if (list2.length < i + 1) {
        return false;
      }
      const c1 = list1[i];
      const c2 = list2[i];
      if (c1 < c2) {
        return true;
      } else if (c1 > c2) {
        return false;
      }
    }
    return list1.length < list2.length;
  }
  reverse() {
    return Key.withNamespaces(this.list().slice().reverse());
  }
  namespaces() {
    return this.list();
  }
  baseNamespace() {
    const ns = this.namespaces();
    return ns[ns.length - 1];
  }
  list() {
    return this.toString().split(pathSepS).slice(1);
  }
  type() {
    return namespaceType(this.baseNamespace());
  }
  name() {
    return namespaceValue(this.baseNamespace());
  }
  instance(s) {
    return new Key(this.toString() + ":" + s);
  }
  path() {
    let p = this.parent().toString();
    if (!p.endsWith(pathSepS)) {
      p += pathSepS;
    }
    p += this.type();
    return new Key(p);
  }
  parent() {
    const list = this.list();
    if (list.length === 1) {
      return new Key(pathSepS);
    }
    return new Key(list.slice(0, -1).join(pathSepS));
  }
  child(key) {
    if (this.toString() === pathSepS) {
      return key;
    } else if (key.toString() === pathSepS) {
      return this;
    }
    return new Key(this.toString() + key.toString(), false);
  }
  isAncestorOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }
    return other.toString().startsWith(this.toString());
  }
  isDecendantOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }
    return this.toString().startsWith(other.toString());
  }
  isTopLevel() {
    return this.list().length === 1;
  }
  concat(...keys) {
    return Key.withNamespaces([...this.namespaces(), ...flatten(keys.map((key) => key.namespaces()))]);
  }
}
function namespaceType(ns) {
  const parts = ns.split(":");
  if (parts.length < 2) {
    return "";
  }
  return parts.slice(0, -1).join(":");
}
function namespaceValue(ns) {
  const parts = ns.split(":");
  return parts[parts.length - 1];
}
function flatten(arr) {
  return [].concat(...arr);
}
const length$3 = async (iterator2) => {
  let count = 0;
  for await (const _ of iterator2) {
    count++;
  }
  return count;
};
var itLength = length$3;
const code$4 = 85;
const log$7 = debug("ipfs:repo:migrator:migration-8");
function unwrap$1(blockstore) {
  if (blockstore.child) {
    return unwrap$1(blockstore.child);
  }
  return blockstore;
}
function keyToMultihash$1(key) {
  try {
    const buf2 = base32$6.decode(`b${key.toString().toLowerCase().slice(1)}`);
    const multihash = CID$3.decode(buf2).multihash.bytes;
    const multihashStr = base32$6.encode(multihash).slice(1).toUpperCase();
    return new Key(`/${multihashStr}`, false);
  } catch (err) {
    return key;
  }
}
function keyToCid(key) {
  try {
    const buf2 = base32$6.decode(`b${key.toString().toLowerCase().slice(1)}`);
    const digest2 = decode$l(buf2);
    const multihash = base32$6.encode(CID$3.createV1(code$4, digest2).bytes).slice(1);
    return new Key(`/${multihash.toUpperCase()}`, false);
  } catch {
    return key;
  }
}
async function process$3(backends, onProgress, keyFunction) {
  const blockstore = backends.blocks;
  await blockstore.open();
  const unwrapped = unwrap$1(blockstore);
  const blockCount = await itLength(unwrapped.queryKeys({
    filters: [(key) => {
      const newKey = keyFunction(key);
      return newKey.toString() !== key.toString();
    }]
  }));
  try {
    let counter = 0;
    for await (const block of unwrapped.query({})) {
      const newKey = keyFunction(block.key);
      if (newKey.toString() !== block.key.toString()) {
        counter += 1;
        log$7(`Migrating Block from ${block.key} to ${newKey}`, await unwrapped.has(block.key));
        await unwrapped.delete(block.key);
        await unwrapped.put(newKey, block.value);
        onProgress(counter / blockCount * 100, `Migrated Block from ${block.key} to ${newKey}`);
      }
    }
  } finally {
    await blockstore.close();
  }
}
const migration$4 = {
  version: 8,
  description: "Transforms key names into base32 encoding and converts Block store to use bare multihashes encoded as base32",
  migrate: (backends, onProgress = () => {
  }) => {
    return process$3(backends, onProgress, keyToMultihash$1);
  },
  revert: (backends, onProgress = () => {
  }) => {
    return process$3(backends, onProgress, keyToCid);
  }
};
var encode_1$2 = encode$e;
var MSB$3 = 128, REST$3 = 127, MSBALL$2 = ~REST$3, INT$2 = Math.pow(2, 31);
function encode$e(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$2) {
    out[offset++] = num & 255 | MSB$3;
    num /= 128;
  }
  while (num & MSBALL$2) {
    out[offset++] = num & 255 | MSB$3;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$e.bytes = offset - oldOffset + 1;
  return out;
}
var decode$i = read$2;
var MSB$1$2 = 128, REST$1$2 = 127;
function read$2(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read$2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1$2) << shift : (b & REST$1$2) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1$2);
  read$2.bytes = counter - offset;
  return res;
}
var N1$2 = Math.pow(2, 7);
var N2$2 = Math.pow(2, 14);
var N3$2 = Math.pow(2, 21);
var N4$2 = Math.pow(2, 28);
var N5$2 = Math.pow(2, 35);
var N6$2 = Math.pow(2, 42);
var N7$2 = Math.pow(2, 49);
var N8$2 = Math.pow(2, 56);
var N9$2 = Math.pow(2, 63);
var length$2 = function(value) {
  return value < N1$2 ? 1 : value < N2$2 ? 2 : value < N3$2 ? 3 : value < N4$2 ? 4 : value < N5$2 ? 5 : value < N6$2 ? 6 : value < N7$2 ? 7 : value < N8$2 ? 8 : value < N9$2 ? 9 : 10;
};
var varint$2 = {
  encode: encode_1$2,
  decode: decode$i,
  encodingLength: length$2
};
var _brrp_varint$2 = varint$2;
const decode$h = (data, offset = 0) => {
  const code2 = _brrp_varint$2.decode(data, offset);
  return [
    code2,
    _brrp_varint$2.decode.bytes
  ];
};
const encodeTo$2 = (int, target, offset = 0) => {
  _brrp_varint$2.encode(int, target, offset);
  return target;
};
const encodingLength$2 = (int) => {
  return _brrp_varint$2.encodingLength(int);
};
const equals$8 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$4 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const create$4 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$2(code2);
  const digestOffset = sizeOffset + encodingLength$2(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo$2(code2, bytes2, 0);
  encodeTo$2(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest$2(code2, size, digest2, bytes2);
};
const decode$g = (multihash) => {
  const bytes2 = coerce$4(multihash);
  const [code2, sizeOffset] = decode$h(bytes2);
  const [size, digestOffset] = decode$h(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$2(code2, size, digest2, bytes2);
};
const equals$7 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$8(a.bytes, b.bytes);
  }
};
class Digest$2 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
}
function base$4(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$4 = base$4;
var _brrp__multiformats_scope_baseX$4 = src$4;
class Encoder$4 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$4 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$4(this, decoder);
  }
}
class ComposedDecoder$4 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$4(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$4 = (left, right) => new ComposedDecoder$4({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$4 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$4(name2, prefix, baseEncode);
    this.decoder = new Decoder$4(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$7 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$4(name2, prefix, encode2, decode2);
const baseX$4 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$4(alphabet2, name2);
  return from$7({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$4(decode2(text))
  });
};
const decode$f = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$d = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$4 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$7({
    prefix,
    name: name2,
    encode(input) {
      return encode$d(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$f(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$4 = baseX$4({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$4({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$5 = rfc4648$4({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$4({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
class CID$2 {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$2,
      byteLength: hidden$2,
      code: readonly$3,
      version: readonly$3,
      multihash: readonly$3,
      bytes: readonly$3,
      _baseCache: hidden$2,
      asCID: hidden$2
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$2.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$4(code2, digest2);
        return CID$2.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$7(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$2(bytes2, _baseCache, base3 || base58btc$4.encoder);
      default:
        return toStringV1$2(bytes2, _baseCache, base3 || base32$5.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$2(/^0\.0/, IS_CID_DEPRECATION$2);
    return !!(value && (value[cidSymbol$2] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$2) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID$2(version2, code2, multihash, bytes2 || encodeCID$2(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$2] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$g(multihash);
      return CID$2.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$2) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$2}) block encoding`);
        } else {
          return new CID$2(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID$2(version2, code2, digest2.bytes);
        return new CID$2(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$2.create(0, DAG_PB_CODE$2, digest2);
  }
  static createV1(code2, digest2) {
    return CID$2.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID$2.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID$2.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$4(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$2(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$2.createV0(digest2) : CID$2.createV1(specs.codec, digest2);
    return [
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$h(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$2;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes$2(source, base3);
    const cid = CID$2.decode(bytes2);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$2 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$4;
      return [
        base58btc$4.prefix,
        decoder.decode(`${base58btc$4.prefix}${source}`)
      ];
    }
    case base58btc$4.prefix: {
      const decoder = base3 || base58btc$4;
      return [
        base58btc$4.prefix,
        decoder.decode(source)
      ];
    }
    case base32$5.prefix: {
      const decoder = base3 || base32$5;
      return [
        base32$5.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$2 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$4.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$2 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$2 = 112;
const SHA_256_CODE$2 = 18;
const encodeCID$2 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$2(version2);
  const hashOffset = codeOffset + encodingLength$2(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$2(version2, bytes2, 0);
  encodeTo$2(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
const cidSymbol$2 = Symbol.for("@ipld/js-cid/CID");
const readonly$3 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$2 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$3 = "0.0.0-dev";
const deprecate$2 = (range, message) => {
  if (range.test(version$3)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$2 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const textDecoder$1 = new TextDecoder();
function decodeVarint(bytes2, offset) {
  let v = 0;
  for (let shift = 0; ; shift += 7) {
    if (shift >= 64) {
      throw new Error("protobuf: varint overflow");
    }
    if (offset >= bytes2.length) {
      throw new Error("protobuf: unexpected end of data");
    }
    const b = bytes2[offset++];
    v += shift < 28 ? (b & 127) << shift : (b & 127) * 2 ** shift;
    if (b < 128) {
      break;
    }
  }
  return [
    v,
    offset
  ];
}
function decodeBytes(bytes2, offset) {
  let byteLen;
  [byteLen, offset] = decodeVarint(bytes2, offset);
  const postOffset = offset + byteLen;
  if (byteLen < 0 || postOffset < 0) {
    throw new Error("protobuf: invalid length");
  }
  if (postOffset > bytes2.length) {
    throw new Error("protobuf: unexpected end of data");
  }
  return [
    bytes2.subarray(offset, postOffset),
    postOffset
  ];
}
function decodeKey(bytes2, index) {
  let wire;
  [wire, index] = decodeVarint(bytes2, index);
  return [
    wire & 7,
    wire >> 3,
    index
  ];
}
function decodeLink(bytes2) {
  const link = {};
  const l = bytes2.length;
  let index = 0;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes2, index);
    if (fieldNum === 1) {
      if (link.Hash) {
        throw new Error("protobuf: (PBLink) duplicate Hash section");
      }
      if (wireType !== 2) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${wireType}) for Hash`);
      }
      if (link.Name !== void 0) {
        throw new Error("protobuf: (PBLink) invalid order, found Name before Hash");
      }
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) invalid order, found Tsize before Hash");
      }
      [link.Hash, index] = decodeBytes(bytes2, index);
    } else if (fieldNum === 2) {
      if (link.Name !== void 0) {
        throw new Error("protobuf: (PBLink) duplicate Name section");
      }
      if (wireType !== 2) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${wireType}) for Name`);
      }
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) invalid order, found Tsize before Name");
      }
      let byts;
      [byts, index] = decodeBytes(bytes2, index);
      link.Name = textDecoder$1.decode(byts);
    } else if (fieldNum === 3) {
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) duplicate Tsize section");
      }
      if (wireType !== 0) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${wireType}) for Tsize`);
      }
      [link.Tsize, index] = decodeVarint(bytes2, index);
    } else {
      throw new Error(`protobuf: (PBLink) invalid fieldNumber, expected 1, 2 or 3, got ${fieldNum}`);
    }
  }
  if (index > l) {
    throw new Error("protobuf: (PBLink) unexpected end of data");
  }
  return link;
}
function decodeNode(bytes2) {
  const l = bytes2.length;
  let index = 0;
  let links2;
  let linksBeforeData = false;
  let data;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes2, index);
    if (wireType !== 2) {
      throw new Error(`protobuf: (PBNode) invalid wireType, expected 2, got ${wireType}`);
    }
    if (fieldNum === 1) {
      if (data) {
        throw new Error("protobuf: (PBNode) duplicate Data section");
      }
      [data, index] = decodeBytes(bytes2, index);
      if (links2) {
        linksBeforeData = true;
      }
    } else if (fieldNum === 2) {
      if (linksBeforeData) {
        throw new Error("protobuf: (PBNode) duplicate Links section");
      } else if (!links2) {
        links2 = [];
      }
      let byts;
      [byts, index] = decodeBytes(bytes2, index);
      links2.push(decodeLink(byts));
    } else {
      throw new Error(`protobuf: (PBNode) invalid fieldNumber, expected 1 or 2, got ${fieldNum}`);
    }
  }
  if (index > l) {
    throw new Error("protobuf: (PBNode) unexpected end of data");
  }
  const node = {};
  if (data) {
    node.Data = data;
  }
  node.Links = links2 || [];
  return node;
}
const textEncoder$3 = new TextEncoder();
const maxInt32 = 2 ** 32;
const maxUInt32 = 2 ** 31;
function encodeLink(link, bytes2) {
  let i = bytes2.length;
  if (typeof link.Tsize === "number") {
    if (link.Tsize < 0) {
      throw new Error("Tsize cannot be negative");
    }
    if (!Number.isSafeInteger(link.Tsize)) {
      throw new Error("Tsize too large for encoding");
    }
    i = encodeVarint(bytes2, i, link.Tsize) - 1;
    bytes2[i] = 24;
  }
  if (typeof link.Name === "string") {
    const nameBytes = textEncoder$3.encode(link.Name);
    i -= nameBytes.length;
    bytes2.set(nameBytes, i);
    i = encodeVarint(bytes2, i, nameBytes.length) - 1;
    bytes2[i] = 18;
  }
  if (link.Hash) {
    i -= link.Hash.length;
    bytes2.set(link.Hash, i);
    i = encodeVarint(bytes2, i, link.Hash.length) - 1;
    bytes2[i] = 10;
  }
  return bytes2.length - i;
}
function encodeNode(node) {
  const size = sizeNode(node);
  const bytes2 = new Uint8Array(size);
  let i = size;
  if (node.Data) {
    i -= node.Data.length;
    bytes2.set(node.Data, i);
    i = encodeVarint(bytes2, i, node.Data.length) - 1;
    bytes2[i] = 10;
  }
  if (node.Links) {
    for (let index = node.Links.length - 1; index >= 0; index--) {
      const size2 = encodeLink(node.Links[index], bytes2.subarray(0, i));
      i -= size2;
      i = encodeVarint(bytes2, i, size2) - 1;
      bytes2[i] = 18;
    }
  }
  return bytes2;
}
function sizeLink(link) {
  let n = 0;
  if (link.Hash) {
    const l = link.Hash.length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Name === "string") {
    const l = textEncoder$3.encode(link.Name).length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Tsize === "number") {
    n += 1 + sov(link.Tsize);
  }
  return n;
}
function sizeNode(node) {
  let n = 0;
  if (node.Data) {
    const l = node.Data.length;
    n += 1 + l + sov(l);
  }
  if (node.Links) {
    for (const link of node.Links) {
      const l = sizeLink(link);
      n += 1 + l + sov(l);
    }
  }
  return n;
}
function encodeVarint(bytes2, offset, v) {
  offset -= sov(v);
  const base3 = offset;
  while (v >= maxUInt32) {
    bytes2[offset++] = v & 127 | 128;
    v /= 128;
  }
  while (v >= 128) {
    bytes2[offset++] = v & 127 | 128;
    v >>>= 7;
  }
  bytes2[offset] = v;
  return base3;
}
function sov(x) {
  if (x % 2 === 0) {
    x++;
  }
  return Math.floor((len64(x) + 6) / 7);
}
function len64(x) {
  let n = 0;
  if (x >= maxInt32) {
    x = Math.floor(x / maxInt32);
    n = 32;
  }
  if (x >= 1 << 16) {
    x >>>= 16;
    n += 16;
  }
  if (x >= 1 << 8) {
    x >>>= 8;
    n += 8;
  }
  return n + len8tab[x];
}
const len8tab = [
  0,
  1,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8
];
const pbNodeProperties = [
  "Data",
  "Links"
];
const pbLinkProperties = [
  "Hash",
  "Name",
  "Tsize"
];
const textEncoder$2 = new TextEncoder();
function linkComparator(a, b) {
  if (a === b) {
    return 0;
  }
  const abuf = a.Name ? textEncoder$2.encode(a.Name) : [];
  const bbuf = b.Name ? textEncoder$2.encode(b.Name) : [];
  let x = abuf.length;
  let y = bbuf.length;
  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (abuf[i] !== bbuf[i]) {
      x = abuf[i];
      y = bbuf[i];
      break;
    }
  }
  return x < y ? -1 : y < x ? 1 : 0;
}
function hasOnlyProperties(node, properties) {
  return !Object.keys(node).some((p) => !properties.includes(p));
}
function validate(node) {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    throw new TypeError("Invalid DAG-PB form");
  }
  if (!hasOnlyProperties(node, pbNodeProperties)) {
    throw new TypeError("Invalid DAG-PB form (extraneous properties)");
  }
  if (node.Data !== void 0 && !(node.Data instanceof Uint8Array)) {
    throw new TypeError("Invalid DAG-PB form (Data must be a Uint8Array)");
  }
  if (!Array.isArray(node.Links)) {
    throw new TypeError("Invalid DAG-PB form (Links must be an array)");
  }
  for (let i = 0; i < node.Links.length; i++) {
    const link = node.Links[i];
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      throw new TypeError("Invalid DAG-PB form (bad link object)");
    }
    if (!hasOnlyProperties(link, pbLinkProperties)) {
      throw new TypeError("Invalid DAG-PB form (extraneous properties on link object)");
    }
    if (!link.Hash) {
      throw new TypeError("Invalid DAG-PB form (link must have a Hash)");
    }
    if (link.Hash.asCID !== link.Hash) {
      throw new TypeError("Invalid DAG-PB form (link Hash must be a CID)");
    }
    if (link.Name !== void 0 && typeof link.Name !== "string") {
      throw new TypeError("Invalid DAG-PB form (link Name must be a string)");
    }
    if (link.Tsize !== void 0 && (typeof link.Tsize !== "number" || link.Tsize % 1 !== 0)) {
      throw new TypeError("Invalid DAG-PB form (link Tsize must be an integer)");
    }
    if (i > 0 && linkComparator(link, node.Links[i - 1]) === -1) {
      throw new TypeError("Invalid DAG-PB form (links must be sorted by Name bytes)");
    }
  }
}
const code$3 = 112;
function encode$c(node) {
  validate(node);
  const pbn = {};
  if (node.Links) {
    pbn.Links = node.Links.map((l) => {
      const link = {};
      if (l.Hash) {
        link.Hash = l.Hash.bytes;
      }
      if (l.Name !== void 0) {
        link.Name = l.Name;
      }
      if (l.Tsize !== void 0) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  if (node.Data) {
    pbn.Data = node.Data;
  }
  return encodeNode(pbn);
}
function decode$e(bytes2) {
  const pbn = decodeNode(bytes2);
  const node = {};
  if (pbn.Data) {
    node.Data = pbn.Data;
  }
  if (pbn.Links) {
    node.Links = pbn.Links.map((l) => {
      const link = {};
      try {
        link.Hash = CID$2.decode(l.Hash);
      } catch (e) {
      }
      if (!link.Hash) {
        throw new Error("Invalid Hash field found in link, expected CID");
      }
      if (l.Name !== void 0) {
        link.Name = l.Name;
      }
      if (l.Tsize !== void 0) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  return node;
}
var minimal$1 = { exports: {} };
var indexMinimal = {};
var minimal = {};
var aspromise = asPromise;
function asPromise(fn, ctx) {
  var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
  while (index < arguments.length)
    params[offset++] = arguments[index++];
  return new Promise(function executor(resolve, reject) {
    params[offset] = function callback(err) {
      if (pending) {
        pending = false;
        if (err)
          reject(err);
        else {
          var params2 = new Array(arguments.length - 1), offset2 = 0;
          while (offset2 < params2.length)
            params2[offset2++] = arguments[offset2];
          resolve.apply(null, params2);
        }
      }
    };
    try {
      fn.apply(ctx || null, params);
    } catch (err) {
      if (pending) {
        pending = false;
        reject(err);
      }
    }
  });
}
var base64$6 = {};
(function(exports) {
  var base642 = exports;
  base642.length = function length2(string2) {
    var p = string2.length;
    if (!p)
      return 0;
    var n = 0;
    while (--p % 4 > 1 && string2.charAt(p) === "=")
      ++n;
    return Math.ceil(string2.length * 3) / 4 - n;
  };
  var b64 = new Array(64);
  var s64 = new Array(123);
  for (var i = 0; i < 64; )
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
  base642.encode = function encode2(buffer2, start, end2) {
    var parts = null, chunk = [];
    var i2 = 0, j = 0, t;
    while (start < end2) {
      var b = buffer2[start++];
      switch (j) {
        case 0:
          chunk[i2++] = b64[b >> 2];
          t = (b & 3) << 4;
          j = 1;
          break;
        case 1:
          chunk[i2++] = b64[t | b >> 4];
          t = (b & 15) << 2;
          j = 2;
          break;
        case 2:
          chunk[i2++] = b64[t | b >> 6];
          chunk[i2++] = b64[b & 63];
          j = 0;
          break;
      }
      if (i2 > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i2 = 0;
      }
    }
    if (j) {
      chunk[i2++] = b64[t];
      chunk[i2++] = 61;
      if (j === 1)
        chunk[i2++] = 61;
    }
    if (parts) {
      if (i2)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i2));
  };
  var invalidEncoding = "invalid encoding";
  base642.decode = function decode2(string2, buffer2, offset) {
    var start = offset;
    var j = 0, t;
    for (var i2 = 0; i2 < string2.length; ) {
      var c = string2.charCodeAt(i2++);
      if (c === 61 && j > 1)
        break;
      if ((c = s64[c]) === void 0)
        throw Error(invalidEncoding);
      switch (j) {
        case 0:
          t = c;
          j = 1;
          break;
        case 1:
          buffer2[offset++] = t << 2 | (c & 48) >> 4;
          t = c;
          j = 2;
          break;
        case 2:
          buffer2[offset++] = (t & 15) << 4 | (c & 60) >> 2;
          t = c;
          j = 3;
          break;
        case 3:
          buffer2[offset++] = (t & 3) << 6 | c;
          j = 0;
          break;
      }
    }
    if (j === 1)
      throw Error(invalidEncoding);
    return offset - start;
  };
  base642.test = function test(string2) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string2);
  };
})(base64$6);
var eventemitter = EventEmitter$2;
function EventEmitter$2() {
  this._listeners = {};
}
EventEmitter$2.prototype.on = function on(evt, fn, ctx) {
  (this._listeners[evt] || (this._listeners[evt] = [])).push({
    fn,
    ctx: ctx || this
  });
  return this;
};
EventEmitter$2.prototype.off = function off(evt, fn) {
  if (evt === void 0)
    this._listeners = {};
  else {
    if (fn === void 0)
      this._listeners[evt] = [];
    else {
      var listeners = this._listeners[evt];
      for (var i = 0; i < listeners.length; )
        if (listeners[i].fn === fn)
          listeners.splice(i, 1);
        else
          ++i;
    }
  }
  return this;
};
EventEmitter$2.prototype.emit = function emit(evt) {
  var listeners = this._listeners[evt];
  if (listeners) {
    var args = [], i = 1;
    for (; i < arguments.length; )
      args.push(arguments[i++]);
    for (i = 0; i < listeners.length; )
      listeners[i].fn.apply(listeners[i++].ctx, args);
  }
  return this;
};
var float = factory(factory);
function factory(exports) {
  if (typeof Float32Array !== "undefined")
    (function() {
      var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
      function writeFloat_f32_cpy(val, buf2, pos) {
        f32[0] = val;
        buf2[pos] = f8b[0];
        buf2[pos + 1] = f8b[1];
        buf2[pos + 2] = f8b[2];
        buf2[pos + 3] = f8b[3];
      }
      function writeFloat_f32_rev(val, buf2, pos) {
        f32[0] = val;
        buf2[pos] = f8b[3];
        buf2[pos + 1] = f8b[2];
        buf2[pos + 2] = f8b[1];
        buf2[pos + 3] = f8b[0];
      }
      exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
      exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
      function readFloat_f32_cpy(buf2, pos) {
        f8b[0] = buf2[pos];
        f8b[1] = buf2[pos + 1];
        f8b[2] = buf2[pos + 2];
        f8b[3] = buf2[pos + 3];
        return f32[0];
      }
      function readFloat_f32_rev(buf2, pos) {
        f8b[3] = buf2[pos];
        f8b[2] = buf2[pos + 1];
        f8b[1] = buf2[pos + 2];
        f8b[0] = buf2[pos + 3];
        return f32[0];
      }
      exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
      exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    })();
  else
    (function() {
      function writeFloat_ieee754(writeUint, val, buf2, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0)
          writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos);
        else if (isNaN(val))
          writeUint(2143289344, buf2, pos);
        else if (val > 34028234663852886e22)
          writeUint((sign << 31 | 2139095040) >>> 0, buf2, pos);
        else if (val < 11754943508222875e-54)
          writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf2, pos);
        else {
          var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
          writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf2, pos);
        }
      }
      exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
      exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
      function readFloat_ieee754(readUint, buf2, pos) {
        var uint = readUint(buf2, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
        return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
      }
      exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
      exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();
  if (typeof Float64Array !== "undefined")
    (function() {
      var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
      function writeDouble_f64_cpy(val, buf2, pos) {
        f64[0] = val;
        buf2[pos] = f8b[0];
        buf2[pos + 1] = f8b[1];
        buf2[pos + 2] = f8b[2];
        buf2[pos + 3] = f8b[3];
        buf2[pos + 4] = f8b[4];
        buf2[pos + 5] = f8b[5];
        buf2[pos + 6] = f8b[6];
        buf2[pos + 7] = f8b[7];
      }
      function writeDouble_f64_rev(val, buf2, pos) {
        f64[0] = val;
        buf2[pos] = f8b[7];
        buf2[pos + 1] = f8b[6];
        buf2[pos + 2] = f8b[5];
        buf2[pos + 3] = f8b[4];
        buf2[pos + 4] = f8b[3];
        buf2[pos + 5] = f8b[2];
        buf2[pos + 6] = f8b[1];
        buf2[pos + 7] = f8b[0];
      }
      exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
      exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
      function readDouble_f64_cpy(buf2, pos) {
        f8b[0] = buf2[pos];
        f8b[1] = buf2[pos + 1];
        f8b[2] = buf2[pos + 2];
        f8b[3] = buf2[pos + 3];
        f8b[4] = buf2[pos + 4];
        f8b[5] = buf2[pos + 5];
        f8b[6] = buf2[pos + 6];
        f8b[7] = buf2[pos + 7];
        return f64[0];
      }
      function readDouble_f64_rev(buf2, pos) {
        f8b[7] = buf2[pos];
        f8b[6] = buf2[pos + 1];
        f8b[5] = buf2[pos + 2];
        f8b[4] = buf2[pos + 3];
        f8b[3] = buf2[pos + 4];
        f8b[2] = buf2[pos + 5];
        f8b[1] = buf2[pos + 6];
        f8b[0] = buf2[pos + 7];
        return f64[0];
      }
      exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
      exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    })();
  else
    (function() {
      function writeDouble_ieee754(writeUint, off0, off1, val, buf2, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0) {
          writeUint(0, buf2, pos + off0);
          writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos + off1);
        } else if (isNaN(val)) {
          writeUint(0, buf2, pos + off0);
          writeUint(2146959360, buf2, pos + off1);
        } else if (val > 17976931348623157e292) {
          writeUint(0, buf2, pos + off0);
          writeUint((sign << 31 | 2146435072) >>> 0, buf2, pos + off1);
        } else {
          var mantissa;
          if (val < 22250738585072014e-324) {
            mantissa = val / 5e-324;
            writeUint(mantissa >>> 0, buf2, pos + off0);
            writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf2, pos + off1);
          } else {
            var exponent = Math.floor(Math.log(val) / Math.LN2);
            if (exponent === 1024)
              exponent = 1023;
            mantissa = val * Math.pow(2, -exponent);
            writeUint(mantissa * 4503599627370496 >>> 0, buf2, pos + off0);
            writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf2, pos + off1);
          }
        }
      }
      exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
      exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
      function readDouble_ieee754(readUint, off0, off1, buf2, pos) {
        var lo = readUint(buf2, pos + off0), hi = readUint(buf2, pos + off1);
        var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
        return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
      }
      exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
      exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();
  return exports;
}
function writeUintLE(val, buf2, pos) {
  buf2[pos] = val & 255;
  buf2[pos + 1] = val >>> 8 & 255;
  buf2[pos + 2] = val >>> 16 & 255;
  buf2[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf2, pos) {
  buf2[pos] = val >>> 24;
  buf2[pos + 1] = val >>> 16 & 255;
  buf2[pos + 2] = val >>> 8 & 255;
  buf2[pos + 3] = val & 255;
}
function readUintLE(buf2, pos) {
  return (buf2[pos] | buf2[pos + 1] << 8 | buf2[pos + 2] << 16 | buf2[pos + 3] << 24) >>> 0;
}
function readUintBE(buf2, pos) {
  return (buf2[pos] << 24 | buf2[pos + 1] << 16 | buf2[pos + 2] << 8 | buf2[pos + 3]) >>> 0;
}
var inquire_1 = inquire;
function inquire(moduleName) {
  try {
    var mod = eval("quire".replace(/^/, "re"))(moduleName);
    if (mod && (mod.length || Object.keys(mod).length))
      return mod;
  } catch (e) {
  }
  return null;
}
var utf8$2 = {};
(function(exports) {
  var utf82 = exports;
  utf82.length = function utf8_length(string2) {
    var len = 0, c = 0;
    for (var i = 0; i < string2.length; ++i) {
      c = string2.charCodeAt(i);
      if (c < 128)
        len += 1;
      else if (c < 2048)
        len += 2;
      else if ((c & 64512) === 55296 && (string2.charCodeAt(i + 1) & 64512) === 56320) {
        ++i;
        len += 4;
      } else
        len += 3;
    }
    return len;
  };
  utf82.read = function utf8_read(buffer2, start, end2) {
    var len = end2 - start;
    if (len < 1)
      return "";
    var parts = null, chunk = [], i = 0, t;
    while (start < end2) {
      t = buffer2[start++];
      if (t < 128)
        chunk[i++] = t;
      else if (t > 191 && t < 224)
        chunk[i++] = (t & 31) << 6 | buffer2[start++] & 63;
      else if (t > 239 && t < 365) {
        t = ((t & 7) << 18 | (buffer2[start++] & 63) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63) - 65536;
        chunk[i++] = 55296 + (t >> 10);
        chunk[i++] = 56320 + (t & 1023);
      } else
        chunk[i++] = (t & 15) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63;
      if (i > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i = 0;
      }
    }
    if (parts) {
      if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
  };
  utf82.write = function utf8_write(string2, buffer2, offset) {
    var start = offset, c1, c2;
    for (var i = 0; i < string2.length; ++i) {
      c1 = string2.charCodeAt(i);
      if (c1 < 128) {
        buffer2[offset++] = c1;
      } else if (c1 < 2048) {
        buffer2[offset++] = c1 >> 6 | 192;
        buffer2[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer2[offset++] = c1 >> 18 | 240;
        buffer2[offset++] = c1 >> 12 & 63 | 128;
        buffer2[offset++] = c1 >> 6 & 63 | 128;
        buffer2[offset++] = c1 & 63 | 128;
      } else {
        buffer2[offset++] = c1 >> 12 | 224;
        buffer2[offset++] = c1 >> 6 & 63 | 128;
        buffer2[offset++] = c1 & 63 | 128;
      }
    }
    return offset - start;
  };
})(utf8$2);
var pool_1 = pool;
function pool(alloc3, slice2, size) {
  var SIZE = size || 8192;
  var MAX = SIZE >>> 1;
  var slab = null;
  var offset = SIZE;
  return function pool_alloc(size2) {
    if (size2 < 1 || size2 > MAX)
      return alloc3(size2);
    if (offset + size2 > SIZE) {
      slab = alloc3(SIZE);
      offset = 0;
    }
    var buf2 = slice2.call(slab, offset, offset += size2);
    if (offset & 7)
      offset = (offset | 7) + 1;
    return buf2;
  };
}
var longbits;
var hasRequiredLongbits;
function requireLongbits() {
  if (hasRequiredLongbits)
    return longbits;
  hasRequiredLongbits = 1;
  longbits = LongBits2;
  var util2 = requireMinimal();
  function LongBits2(lo, hi) {
    this.lo = lo >>> 0;
    this.hi = hi >>> 0;
  }
  var zero = LongBits2.zero = new LongBits2(0, 0);
  zero.toNumber = function() {
    return 0;
  };
  zero.zzEncode = zero.zzDecode = function() {
    return this;
  };
  zero.length = function() {
    return 1;
  };
  var zeroHash = LongBits2.zeroHash = "\0\0\0\0\0\0\0\0";
  LongBits2.fromNumber = function fromNumber(value) {
    if (value === 0)
      return zero;
    var sign = value < 0;
    if (sign)
      value = -value;
    var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295)
          hi = 0;
      }
    }
    return new LongBits2(lo, hi);
  };
  LongBits2.from = function from2(value) {
    if (typeof value === "number")
      return LongBits2.fromNumber(value);
    if (util2.isString(value)) {
      if (util2.Long)
        value = util2.Long.fromString(value);
      else
        return LongBits2.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits2(value.low >>> 0, value.high >>> 0) : zero;
  };
  LongBits2.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
      var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
      if (!lo)
        hi = hi + 1 >>> 0;
      return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  };
  LongBits2.prototype.toLong = function toLong(unsigned) {
    return util2.Long ? new util2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
  };
  var charCodeAt = String.prototype.charCodeAt;
  LongBits2.fromHash = function fromHash(hash2) {
    if (hash2 === zeroHash)
      return zero;
    return new LongBits2(
      (charCodeAt.call(hash2, 0) | charCodeAt.call(hash2, 1) << 8 | charCodeAt.call(hash2, 2) << 16 | charCodeAt.call(hash2, 3) << 24) >>> 0,
      (charCodeAt.call(hash2, 4) | charCodeAt.call(hash2, 5) << 8 | charCodeAt.call(hash2, 6) << 16 | charCodeAt.call(hash2, 7) << 24) >>> 0
    );
  };
  LongBits2.prototype.toHash = function toHash() {
    return String.fromCharCode(
      this.lo & 255,
      this.lo >>> 8 & 255,
      this.lo >>> 16 & 255,
      this.lo >>> 24,
      this.hi & 255,
      this.hi >>> 8 & 255,
      this.hi >>> 16 & 255,
      this.hi >>> 24
    );
  };
  LongBits2.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
  };
  LongBits2.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
  };
  LongBits2.prototype.length = function length2() {
    var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
  };
  return longbits;
}
var hasRequiredMinimal;
function requireMinimal() {
  if (hasRequiredMinimal)
    return minimal;
  hasRequiredMinimal = 1;
  (function(exports) {
    var util2 = exports;
    util2.asPromise = aspromise;
    util2.base64 = base64$6;
    util2.EventEmitter = eventemitter;
    util2.float = float;
    util2.inquire = inquire_1;
    util2.utf8 = utf8$2;
    util2.pool = pool_1;
    util2.LongBits = requireLongbits();
    util2.isNode = Boolean(typeof {} !== "undefined" && {} && {}.process && {}.process.versions && {}.process.versions.node);
    util2.global = util2.isNode && {} || typeof window !== "undefined" && window || typeof self !== "undefined" && self || commonjsGlobal;
    util2.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util2.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util2.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util2.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util2.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util2.isset = util2.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util2.Buffer = function() {
      try {
        var Buffer2 = util2.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util2._Buffer_from = null;
    util2._Buffer_allocUnsafe = null;
    util2.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util2.Buffer ? util2._Buffer_allocUnsafe(sizeOrArray) : new util2.Array(sizeOrArray) : util2.Buffer ? util2._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util2.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util2.Long = util2.global.dcodeIO && util2.global.dcodeIO.Long || util2.global.Long || util2.inquire("long");
    util2.key2Re = /^true|false|0|1$/;
    util2.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util2.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util2.longToHash = function longToHash(value) {
      return value ? util2.LongBits.from(value).toHash() : util2.LongBits.zeroHash;
    };
    util2.longFromHash = function longFromHash(hash2, unsigned) {
      var bits = util2.LongBits.fromHash(hash2);
      if (util2.Long)
        return util2.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge2(dst, src2, ifNotSet) {
      for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src2[keys[i]];
      return dst;
    }
    util2.merge = merge2;
    util2.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name2) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge2(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get() {
            return name2;
          },
          set: void 0,
          enumerable: false,
          configurable: true
        },
        toString: {
          value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    util2.newError = newError;
    util2.ProtocolError = newError("ProtocolError");
    util2.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util2.oneOfSetter = function setOneOf(fieldNames) {
      return function(name2) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name2)
            delete this[fieldNames[i]];
      };
    };
    util2.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util2._configure = function() {
      var Buffer2 = util2.Buffer;
      if (!Buffer2) {
        util2._Buffer_from = util2._Buffer_allocUnsafe = null;
        return;
      }
      util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding2) {
        return new Buffer2(value, encoding2);
      };
      util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  })(minimal);
  return minimal;
}
var writer = Writer$1;
var util$4 = requireMinimal();
var BufferWriter$1;
var LongBits$1 = util$4.LongBits, base64$5 = util$4.base64, utf8$1 = util$4.utf8;
function Op(fn, len, val) {
  this.fn = fn;
  this.len = len;
  this.next = void 0;
  this.val = val;
}
function noop$2() {
}
function State(writer2) {
  this.head = writer2.head;
  this.tail = writer2.tail;
  this.len = writer2.len;
  this.next = writer2.states;
}
function Writer$1() {
  this.len = 0;
  this.head = new Op(noop$2, 0, 0);
  this.tail = this.head;
  this.states = null;
}
var create$3 = function create2() {
  return util$4.Buffer ? function create_buffer_setup() {
    return (Writer$1.create = function create_buffer() {
      return new BufferWriter$1();
    })();
  } : function create_array3() {
    return new Writer$1();
  };
};
Writer$1.create = create$3();
Writer$1.alloc = function alloc2(size) {
  return new util$4.Array(size);
};
if (util$4.Array !== Array)
  Writer$1.alloc = util$4.pool(Writer$1.alloc, util$4.Array.prototype.subarray);
Writer$1.prototype._push = function push(fn, len, val) {
  this.tail = this.tail.next = new Op(fn, len, val);
  this.len += len;
  return this;
};
function writeByte(val, buf2, pos) {
  buf2[pos] = val & 255;
}
function writeVarint32(val, buf2, pos) {
  while (val > 127) {
    buf2[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf2[pos] = val;
}
function VarintOp(len, val) {
  this.len = len;
  this.next = void 0;
  this.val = val;
}
VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;
Writer$1.prototype.uint32 = function write_uint32(value) {
  this.len += (this.tail = this.tail.next = new VarintOp(
    (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
    value
  )).len;
  return this;
};
Writer$1.prototype.int32 = function write_int32(value) {
  return value < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(value)) : this.uint32(value);
};
Writer$1.prototype.sint32 = function write_sint32(value) {
  return this.uint32((value << 1 ^ value >> 31) >>> 0);
};
function writeVarint64(val, buf2, pos) {
  while (val.hi) {
    buf2[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf2[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf2[pos++] = val.lo;
}
Writer$1.prototype.uint64 = function write_uint64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.int64 = Writer$1.prototype.uint64;
Writer$1.prototype.sint64 = function write_sint64(value) {
  var bits = LongBits$1.from(value).zzEncode();
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.bool = function write_bool(value) {
  return this._push(writeByte, 1, value ? 1 : 0);
};
function writeFixed32(val, buf2, pos) {
  buf2[pos] = val & 255;
  buf2[pos + 1] = val >>> 8 & 255;
  buf2[pos + 2] = val >>> 16 & 255;
  buf2[pos + 3] = val >>> 24;
}
Writer$1.prototype.fixed32 = function write_fixed32(value) {
  return this._push(writeFixed32, 4, value >>> 0);
};
Writer$1.prototype.sfixed32 = Writer$1.prototype.fixed32;
Writer$1.prototype.fixed64 = function write_fixed64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};
Writer$1.prototype.sfixed64 = Writer$1.prototype.fixed64;
Writer$1.prototype.float = function write_float(value) {
  return this._push(util$4.float.writeFloatLE, 4, value);
};
Writer$1.prototype.double = function write_double(value) {
  return this._push(util$4.float.writeDoubleLE, 8, value);
};
var writeBytes = util$4.Array.prototype.set ? function writeBytes_set(val, buf2, pos) {
  buf2.set(val, pos);
} : function writeBytes_for(val, buf2, pos) {
  for (var i = 0; i < val.length; ++i)
    buf2[pos + i] = val[i];
};
Writer$1.prototype.bytes = function write_bytes(value) {
  var len = value.length >>> 0;
  if (!len)
    return this._push(writeByte, 1, 0);
  if (util$4.isString(value)) {
    var buf2 = Writer$1.alloc(len = base64$5.length(value));
    base64$5.decode(value, buf2, 0);
    value = buf2;
  }
  return this.uint32(len)._push(writeBytes, len, value);
};
Writer$1.prototype.string = function write_string(value) {
  var len = utf8$1.length(value);
  return len ? this.uint32(len)._push(utf8$1.write, len, value) : this._push(writeByte, 1, 0);
};
Writer$1.prototype.fork = function fork() {
  this.states = new State(this);
  this.head = this.tail = new Op(noop$2, 0, 0);
  this.len = 0;
  return this;
};
Writer$1.prototype.reset = function reset() {
  if (this.states) {
    this.head = this.states.head;
    this.tail = this.states.tail;
    this.len = this.states.len;
    this.states = this.states.next;
  } else {
    this.head = this.tail = new Op(noop$2, 0, 0);
    this.len = 0;
  }
  return this;
};
Writer$1.prototype.ldelim = function ldelim() {
  var head = this.head, tail = this.tail, len = this.len;
  this.reset().uint32(len);
  if (len) {
    this.tail.next = head.next;
    this.tail = tail;
    this.len += len;
  }
  return this;
};
Writer$1.prototype.finish = function finish() {
  var head = this.head.next, buf2 = this.constructor.alloc(this.len), pos = 0;
  while (head) {
    head.fn(head.val, buf2, pos);
    pos += head.len;
    head = head.next;
  }
  return buf2;
};
Writer$1._configure = function(BufferWriter_) {
  BufferWriter$1 = BufferWriter_;
  Writer$1.create = create$3();
  BufferWriter$1._configure();
};
var writer_buffer = BufferWriter;
var Writer = writer;
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util$3 = requireMinimal();
function BufferWriter() {
  Writer.call(this);
}
BufferWriter._configure = function() {
  BufferWriter.alloc = util$3._Buffer_allocUnsafe;
  BufferWriter.writeBytesBuffer = util$3.Buffer && util$3.Buffer.prototype instanceof Uint8Array && util$3.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf2, pos) {
    buf2.set(val, pos);
  } : function writeBytesBuffer_copy(val, buf2, pos) {
    if (val.copy)
      val.copy(buf2, pos, 0, val.length);
    else
      for (var i = 0; i < val.length; )
        buf2[pos++] = val[i++];
  };
};
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
  if (util$3.isString(value))
    value = util$3._Buffer_from(value, "base64");
  var len = value.length >>> 0;
  this.uint32(len);
  if (len)
    this._push(BufferWriter.writeBytesBuffer, len, value);
  return this;
};
function writeStringBuffer(val, buf2, pos) {
  if (val.length < 40)
    util$3.utf8.write(val, buf2, pos);
  else if (buf2.utf8Write)
    buf2.utf8Write(val, pos);
  else
    buf2.write(val, pos);
}
BufferWriter.prototype.string = function write_string_buffer(value) {
  var len = util$3.Buffer.byteLength(value);
  this.uint32(len);
  if (len)
    this._push(writeStringBuffer, len, value);
  return this;
};
BufferWriter._configure();
var reader = Reader$1;
var util$2 = requireMinimal();
var BufferReader$1;
var LongBits = util$2.LongBits, utf8 = util$2.utf8;
function indexOutOfRange(reader2, writeLength) {
  return RangeError("index out of range: " + reader2.pos + " + " + (writeLength || 1) + " > " + reader2.len);
}
function Reader$1(buffer2) {
  this.buf = buffer2;
  this.pos = 0;
  this.len = buffer2.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer2) {
  if (buffer2 instanceof Uint8Array || Array.isArray(buffer2))
    return new Reader$1(buffer2);
  throw Error("illegal buffer");
} : function create_array2(buffer2) {
  if (Array.isArray(buffer2))
    return new Reader$1(buffer2);
  throw Error("illegal buffer");
};
var create$2 = function create3() {
  return util$2.Buffer ? function create_buffer_setup(buffer2) {
    return (Reader$1.create = function create_buffer(buffer3) {
      return util$2.Buffer.isBuffer(buffer3) ? new BufferReader$1(buffer3) : create_array(buffer3);
    })(buffer2);
  } : create_array;
};
Reader$1.create = create$2();
Reader$1.prototype._slice = util$2.Array.prototype.subarray || util$2.Array.prototype.slice;
Reader$1.prototype.uint32 = function read_uint32_setup() {
  var value = 4294967295;
  return function read_uint32() {
    value = (this.buf[this.pos] & 127) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value;
  };
}();
Reader$1.prototype.int32 = function read_int32() {
  return this.uint32() | 0;
};
Reader$1.prototype.sint32 = function read_sint32() {
  var value = this.uint32();
  return value >>> 1 ^ -(value & 1) | 0;
};
function readLongVarint() {
  var bits = new LongBits(0, 0);
  var i = 0;
  if (this.len - this.pos > 4) {
    for (; i < 4; ++i) {
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
    bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
    if (this.buf[this.pos++] < 128)
      return bits;
    i = 0;
  } else {
    for (; i < 3; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
    return bits;
  }
  if (this.len - this.pos > 4) {
    for (; i < 5; ++i) {
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  } else {
    for (; i < 5; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  }
  throw Error("invalid varint encoding");
}
Reader$1.prototype.bool = function read_bool() {
  return this.uint32() !== 0;
};
function readFixed32_end(buf2, end2) {
  return (buf2[end2 - 4] | buf2[end2 - 3] << 8 | buf2[end2 - 2] << 16 | buf2[end2 - 1] << 24) >>> 0;
}
Reader$1.prototype.fixed32 = function read_fixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4);
};
Reader$1.prototype.sfixed32 = function read_sfixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4) | 0;
};
function readFixed64() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 8);
  return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}
Reader$1.prototype.float = function read_float() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$2.float.readFloatLE(this.buf, this.pos);
  this.pos += 4;
  return value;
};
Reader$1.prototype.double = function read_double() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$2.float.readDoubleLE(this.buf, this.pos);
  this.pos += 8;
  return value;
};
Reader$1.prototype.bytes = function read_bytes() {
  var length2 = this.uint32(), start = this.pos, end2 = this.pos + length2;
  if (end2 > this.len)
    throw indexOutOfRange(this, length2);
  this.pos += length2;
  if (Array.isArray(this.buf))
    return this.buf.slice(start, end2);
  return start === end2 ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end2);
};
Reader$1.prototype.string = function read_string() {
  var bytes2 = this.bytes();
  return utf8.read(bytes2, 0, bytes2.length);
};
Reader$1.prototype.skip = function skip(length2) {
  if (typeof length2 === "number") {
    if (this.pos + length2 > this.len)
      throw indexOutOfRange(this, length2);
    this.pos += length2;
  } else {
    do {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
    } while (this.buf[this.pos++] & 128);
  }
  return this;
};
Reader$1.prototype.skipType = function(wireType) {
  switch (wireType) {
    case 0:
      this.skip();
      break;
    case 1:
      this.skip(8);
      break;
    case 2:
      this.skip(this.uint32());
      break;
    case 3:
      while ((wireType = this.uint32() & 7) !== 4) {
        this.skipType(wireType);
      }
      break;
    case 5:
      this.skip(4);
      break;
    default:
      throw Error("invalid wire type " + wireType + " at offset " + this.pos);
  }
  return this;
};
Reader$1._configure = function(BufferReader_) {
  BufferReader$1 = BufferReader_;
  Reader$1.create = create$2();
  BufferReader$1._configure();
  var fn = util$2.Long ? "toLong" : "toNumber";
  util$2.merge(Reader$1.prototype, {
    int64: function read_int64() {
      return readLongVarint.call(this)[fn](false);
    },
    uint64: function read_uint64() {
      return readLongVarint.call(this)[fn](true);
    },
    sint64: function read_sint64() {
      return readLongVarint.call(this).zzDecode()[fn](false);
    },
    fixed64: function read_fixed64() {
      return readFixed64.call(this)[fn](true);
    },
    sfixed64: function read_sfixed64() {
      return readFixed64.call(this)[fn](false);
    }
  });
};
var reader_buffer = BufferReader;
var Reader = reader;
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util$1 = requireMinimal();
function BufferReader(buffer2) {
  Reader.call(this, buffer2);
}
BufferReader._configure = function() {
  if (util$1.Buffer)
    BufferReader.prototype._slice = util$1.Buffer.prototype.slice;
};
BufferReader.prototype.string = function read_string_buffer() {
  var len = this.uint32();
  return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};
BufferReader._configure();
var rpc = {};
var service = Service;
var util = requireMinimal();
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
function Service(rpcImpl, requestDelimited, responseDelimited) {
  if (typeof rpcImpl !== "function")
    throw TypeError("rpcImpl must be a function");
  util.EventEmitter.call(this);
  this.rpcImpl = rpcImpl;
  this.requestDelimited = Boolean(requestDelimited);
  this.responseDelimited = Boolean(responseDelimited);
}
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
  if (!request)
    throw TypeError("request must be specified");
  var self2 = this;
  if (!callback)
    return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
  if (!self2.rpcImpl) {
    setTimeout(function() {
      callback(Error("already ended"));
    }, 0);
    return void 0;
  }
  try {
    return self2.rpcImpl(
      method,
      requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
      function rpcCallback(err, response) {
        if (err) {
          self2.emit("error", err, method);
          return callback(err);
        }
        if (response === null) {
          self2.end(true);
          return void 0;
        }
        if (!(response instanceof responseCtor)) {
          try {
            response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
          } catch (err2) {
            self2.emit("error", err2, method);
            return callback(err2);
          }
        }
        self2.emit("data", response, method);
        return callback(null, response);
      }
    );
  } catch (err) {
    self2.emit("error", err, method);
    setTimeout(function() {
      callback(err);
    }, 0);
    return void 0;
  }
};
Service.prototype.end = function end(endedByRPC) {
  if (this.rpcImpl) {
    if (!endedByRPC)
      this.rpcImpl(null, null, null);
    this.rpcImpl = null;
    this.emit("end").off();
  }
  return this;
};
(function(exports) {
  var rpc2 = exports;
  rpc2.Service = service;
})(rpc);
var roots = {};
(function(exports) {
  var protobuf = exports;
  protobuf.build = "minimal";
  protobuf.Writer = writer;
  protobuf.BufferWriter = writer_buffer;
  protobuf.Reader = reader;
  protobuf.BufferReader = reader_buffer;
  protobuf.util = requireMinimal();
  protobuf.rpc = rpc;
  protobuf.roots = roots;
  protobuf.configure = configure;
  function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
  }
  configure();
})(indexMinimal);
(function(module) {
  module.exports = indexMinimal;
})(minimal$1);
const $protobuf = /* @__PURE__ */ getDefaultExportFromCjs(minimal$1.exports);
const $Reader$5 = $protobuf.Reader, $Writer$5 = $protobuf.Writer;
$protobuf.util;
const $root$5 = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
const ipfs = $root$5.ipfs = (() => {
  const ipfs2 = {};
  ipfs2.pin = function() {
    const pin = {};
    pin.Set = function() {
      function Set2(p) {
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null)
              this[ks[i]] = p[ks[i]];
        }
      }
      Set2.prototype.version = 0;
      Set2.prototype.fanout = 0;
      Set2.prototype.seed = 0;
      Set2.encode = function encode2(m, w) {
        if (!w)
          w = $Writer$5.create();
        if (m.version != null && Object.hasOwnProperty.call(m, "version"))
          w.uint32(8).uint32(m.version);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
          w.uint32(16).uint32(m.fanout);
        if (m.seed != null && Object.hasOwnProperty.call(m, "seed"))
          w.uint32(29).fixed32(m.seed);
        return w;
      };
      Set2.decode = function decode2(r, l) {
        if (!(r instanceof $Reader$5))
          r = $Reader$5.create(r);
        var c = l === void 0 ? r.len : r.pos + l, m = new $root$5.ipfs.pin.Set();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.version = r.uint32();
              break;
            case 2:
              m.fanout = r.uint32();
              break;
            case 3:
              m.seed = r.fixed32();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      Set2.fromObject = function fromObject(d) {
        if (d instanceof $root$5.ipfs.pin.Set)
          return d;
        var m = new $root$5.ipfs.pin.Set();
        if (d.version != null) {
          m.version = d.version >>> 0;
        }
        if (d.fanout != null) {
          m.fanout = d.fanout >>> 0;
        }
        if (d.seed != null) {
          m.seed = d.seed >>> 0;
        }
        return m;
      };
      Set2.toObject = function toObject(m, o) {
        if (!o)
          o = {};
        var d = {};
        if (o.defaults) {
          d.version = 0;
          d.fanout = 0;
          d.seed = 0;
        }
        if (m.version != null && m.hasOwnProperty("version")) {
          d.version = m.version;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
          d.fanout = m.fanout;
        }
        if (m.seed != null && m.hasOwnProperty("seed")) {
          d.seed = m.seed;
        }
        return d;
      };
      Set2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return Set2;
    }();
    return pin;
  }();
  return ipfs2;
})();
var fnv1a$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  hash2.BASE = 2166136261;
  function hash2(s, h = hash2.BASE) {
    const l = s.length;
    for (let i = 0; i < l; i++) {
      h ^= s.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  }
  exports.default = hash2;
  module.exports = hash2;
})(fnv1a$1, fnv1a$1.exports);
const fnv1a = /* @__PURE__ */ getDefaultExportFromCjs(fnv1a$1.exports);
const PIN_DS_KEY = new Key("/local/pins");
const DEFAULT_FANOUT = 256;
const MAX_ITEMS = 8192;
const EMPTY_KEY = CID$3.parse("QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n");
const PinTypes$1 = {
  direct: "direct",
  recursive: "recursive"
};
function cidToKey$1(cid) {
  return new Key(`/${base32$6.encode(cid.multihash.bytes).toUpperCase().substring(1)}`);
}
function asUint8Array$1(buf2) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength);
  }
  return buf2;
}
function allocUnsafe$1(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array$1(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}
function concat$1(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe$1(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array$1(output);
}
function compare(a, b) {
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i]) {
      return -1;
    }
    if (a[i] > b[i]) {
      return 1;
    }
  }
  if (a.byteLength > b.byteLength) {
    return 1;
  }
  if (a.byteLength < b.byteLength) {
    return -1;
  }
  return 0;
}
const identity$6 = from$9({
  prefix: "\0",
  name: "identity",
  encode: (buf2) => toString$5(buf2),
  decode: (str) => fromString$5(str)
});
const identityBase$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$6
}, Symbol.toStringTag, { value: "Module" }));
const base2$2 = rfc4648$5({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: base2$2
}, Symbol.toStringTag, { value: "Module" }));
const base8$2 = rfc4648$5({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: base8$2
}, Symbol.toStringTag, { value: "Module" }));
const base10$2 = baseX$5({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: base10$2
}, Symbol.toStringTag, { value: "Module" }));
const base16$2 = rfc4648$5({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper$1 = rfc4648$5({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
const base16$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: base16$2,
  base16upper: base16upper$1
}, Symbol.toStringTag, { value: "Module" }));
const base36$2 = baseX$5({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper$1 = baseX$5({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: base36$2,
  base36upper: base36upper$1
}, Symbol.toStringTag, { value: "Module" }));
const base64$3 = rfc4648$5({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad$1 = rfc4648$5({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url$2 = rfc4648$5({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad$1 = rfc4648$5({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: base64$3,
  base64pad: base64pad$1,
  base64url: base64url$2,
  base64urlpad: base64urlpad$1
}, Symbol.toStringTag, { value: "Module" }));
const alphabet$1 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
const alphabetBytesToChars$1 = alphabet$1.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
const alphabetCharsToBytes$1 = alphabet$1.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode$b(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars$1[c];
    return p;
  }, "");
}
function decode$d(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes$1[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji$2 = from$9({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode$b,
  decode: decode$d
});
const base256emoji$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: base256emoji$2
}, Symbol.toStringTag, { value: "Module" }));
const from$6 = ({ name: name2, code: code2, encode: encode2 }) => new Hasher$1(name2, code2, encode2);
class Hasher$1 {
  constructor(name2, code2, encode2) {
    this.name = name2;
    this.code = code2;
    this.encode = encode2;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create$5(this.code, result) : result.then((digest2) => create$5(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const sha$1 = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256$1 = from$6({
  name: "sha2-256",
  code: 18,
  encode: sha$1("SHA-256")
});
const sha512$1 = from$6({
  name: "sha2-512",
  code: 19,
  encode: sha$1("SHA-512")
});
const sha2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256: sha256$1,
  sha512: sha512$1
}, Symbol.toStringTag, { value: "Module" }));
const code$2 = 0;
const name$2 = "identity";
const encode$a = coerce$5;
const digest$1 = (input) => create$5(code$2, encode$a(input));
const identity$4 = {
  code: code$2,
  name: name$2,
  encode: encode$a,
  digest: digest$1
};
const identity$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$4
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const bases$1 = {
  ...identityBase$1,
  ...base2$3,
  ...base8$3,
  ...base10$3,
  ...base16$3,
  ...base32$7,
  ...base36$3,
  ...base58$1,
  ...base64$4,
  ...base256emoji$3
};
({
  ...sha2$1,
  ...identity$5
});
function createCodec$1(name2, prefix, encode2, decode2) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode2
    },
    decoder: { decode: decode2 }
  };
}
const string$1 = createCodec$1("utf8", "u", (buf2) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf2);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii$1 = createCodec$1("ascii", "a", (buf2) => {
  let string2 = "a";
  for (let i = 0; i < buf2.length; i++) {
    string2 += String.fromCharCode(buf2[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf2 = allocUnsafe$1(str.length);
  for (let i = 0; i < str.length; i++) {
    buf2[i] = str.charCodeAt(i);
  }
  return buf2;
});
const BASES$1 = {
  utf8: string$1,
  "utf-8": string$1,
  hex: bases$1.base16,
  latin1: ascii$1,
  ascii: ascii$1,
  binary: ascii$1,
  ...bases$1
};
function toString$3(array, encoding2 = "utf8") {
  const base3 = BASES$1[encoding2];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding2}"`);
  }
  if ((encoding2 === "utf8" || encoding2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
function fromString$3(string2, encoding2 = "utf8") {
  const base3 = BASES$1[encoding2];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding2}"`);
  }
  if ((encoding2 === "utf8" || encoding2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array$1(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
const PinSet = ipfs.pin.Set;
function readHeader(rootNode) {
  const rootData = rootNode.Data;
  if (!rootData) {
    throw new Error("No data present");
  }
  const hdrLength = varint$6.decode(rootData);
  const vBytes = varint$6.decode.bytes;
  if (vBytes <= 0) {
    throw new Error("Invalid Set header length");
  }
  if (vBytes + hdrLength > rootData.length) {
    throw new Error("Impossibly large set header length");
  }
  const hdrSlice = rootData.slice(vBytes, hdrLength + vBytes);
  const header = PinSet.toObject(PinSet.decode(hdrSlice), {
    defaults: false,
    arrays: true,
    longs: Number,
    objects: false
  });
  if (header.version !== 1) {
    throw new Error(`Unsupported Set version: ${header.version}`);
  }
  if (header.fanout > rootNode.Links.length) {
    throw new Error("Impossibly large fanout");
  }
  return {
    header,
    data: rootData.slice(hdrLength + vBytes)
  };
}
function hash(seed, key) {
  const buffer2 = new Uint8Array(4);
  const dataView2 = new DataView(buffer2.buffer);
  dataView2.setUint32(0, seed, true);
  const encodedKey = fromString$3(key.toString());
  const data = concat$1([buffer2, encodedKey], buffer2.byteLength + encodedKey.byteLength);
  return fnv1a(toString$3(data));
}
async function* walkItems(blockstore, node) {
  const pbh = readHeader(node);
  let idx = 0;
  for (const link of node.Links) {
    if (idx < pbh.header.fanout) {
      const linkHash = link.Hash;
      if (!EMPTY_KEY.equals(linkHash)) {
        const buf2 = await blockstore.get(linkHash);
        const node2 = decode$e(buf2);
        yield* walkItems(blockstore, node2);
      }
    } else {
      yield link.Hash;
    }
    idx++;
  }
}
async function* loadSet(blockstore, rootNode, name2) {
  const link = rootNode.Links.find((l) => l.Name === name2);
  if (!link) {
    throw new Error("No link found with name " + name2);
  }
  const buf2 = await blockstore.get(link.Hash);
  const node = decode$e(buf2);
  yield* walkItems(blockstore, node);
}
function storeItems(blockstore, items) {
  return storePins(items, 0);
  async function storePins(pins, depth) {
    const pbHeader = PinSet.encode({
      version: 1,
      fanout: DEFAULT_FANOUT,
      seed: depth
    }).finish();
    const header = varint$6.encode(pbHeader.length);
    const headerBuf = concat$1([header, pbHeader]);
    const fanoutLinks = [];
    for (let i = 0; i < DEFAULT_FANOUT; i++) {
      fanoutLinks.push({
        Name: "",
        Tsize: 1,
        Hash: EMPTY_KEY
      });
    }
    if (pins.length <= MAX_ITEMS) {
      const nodes = pins.map((item) => {
        return {
          link: {
            Name: "",
            Tsize: 1,
            Hash: item.key
          },
          data: item.data || new Uint8Array()
        };
      }).sort((a, b) => {
        return compare(a.link.Hash.bytes, b.link.Hash.bytes);
      });
      const rootLinks = fanoutLinks.concat(nodes.map((item) => item.link));
      const rootData = concat$1([headerBuf, ...nodes.map((item) => item.data)]);
      return {
        Data: rootData,
        Links: rootLinks
      };
    } else {
      const bins = pins.reduce((bins2, pin) => {
        const n = hash(depth, pin.key) % DEFAULT_FANOUT;
        bins2[n] = n in bins2 ? bins2[n].concat([pin]) : [pin];
        return bins2;
      }, []);
      let idx = 0;
      for (const bin of bins) {
        const child = await storePins(bin, depth + 1);
        await storeChild(child, idx);
        idx++;
      }
      return {
        Data: headerBuf,
        Links: fanoutLinks
      };
    }
    async function storeChild(child, binIdx) {
      const buf2 = encode$c(child);
      const digest2 = await sha256$1.digest(buf2);
      const cid = CID$3.createV0(digest2);
      await blockstore.put(cid, buf2);
      const size = child.Links.reduce((acc, curr) => acc + (curr.Tsize || 0), 0) + buf2.length;
      fanoutLinks[binIdx] = {
        Name: "",
        Tsize: size,
        Hash: cid
      };
    }
  }
}
async function storeSet(blockstore, type, cids) {
  const rootNode = await storeItems(blockstore, cids.map((cid2) => {
    return {
      key: cid2
    };
  }));
  const buf2 = encode$c(rootNode);
  const digest2 = await sha256$1.digest(buf2);
  const cid = CID$3.createV0(digest2);
  await blockstore.put(cid, buf2);
  const size = rootNode.Links.reduce((acc, curr) => acc + curr.Tsize, 0) + buf2.length;
  return {
    Name: type,
    Tsize: size,
    Hash: cid
  };
}
async function pinsToDatastore(blockstore, datastore, pinstore, onProgress) {
  if (!await datastore.has(PIN_DS_KEY)) {
    return;
  }
  const mh = await datastore.get(PIN_DS_KEY);
  const cid = CID$3.decode(mh);
  const pinRootBuf = await blockstore.get(cid);
  const pinRoot = decode$e(pinRootBuf);
  let counter = 0;
  const pinCount = await itLength(loadSet(blockstore, pinRoot, PinTypes$1.recursive)) + await itLength(loadSet(blockstore, pinRoot, PinTypes$1.direct));
  for await (const cid2 of loadSet(blockstore, pinRoot, PinTypes$1.recursive)) {
    counter++;
    const pin = {
      depth: Infinity
    };
    if (cid2.version !== 0) {
      pin.version = cid2.version;
    }
    if (cid2.code !== code$3) {
      pin.codec = cid2.code;
    }
    await pinstore.put(cidToKey$1(cid2), encode$o(pin));
    onProgress(counter / pinCount * 100, `Migrated recursive pin ${cid2}`);
  }
  for await (const cid2 of loadSet(blockstore, pinRoot, PinTypes$1.direct)) {
    counter++;
    const pin = {
      depth: 0
    };
    if (cid2.version !== 0) {
      pin.version = cid2.version;
    }
    if (cid2.code !== code$3) {
      pin.codec = cid2.code;
    }
    await pinstore.put(cidToKey$1(cid2), encode$o(pin));
    onProgress(counter / pinCount * 100, `Migrated direct pin ${cid2}`);
  }
  await blockstore.delete(cid);
  await datastore.delete(PIN_DS_KEY);
}
async function pinsToDAG(blockstore, datastore, pinstore, onProgress) {
  const recursivePins = [];
  const directPins = [];
  let counter = 0;
  const pinCount = await itLength(pinstore.queryKeys({}));
  for await (const { key, value } of pinstore.query({})) {
    counter++;
    const pin = decode$x(value);
    const cid2 = CID$3.create(
      pin.version || 0,
      pin.codec || code$3,
      decode$l(base32$6.decode("b" + key.toString().toLowerCase().split("/").pop()))
    );
    if (pin.depth === 0) {
      onProgress(counter / pinCount * 100, `Reverted direct pin ${cid2}`);
      directPins.push(cid2);
    } else {
      onProgress(counter / pinCount * 100, `Reverted recursive pin ${cid2}`);
      recursivePins.push(cid2);
    }
  }
  onProgress(100, "Updating pin root");
  const pinRoot = {
    Links: [
      await storeSet(blockstore, PinTypes$1.direct, directPins),
      await storeSet(blockstore, PinTypes$1.recursive, recursivePins)
    ]
  };
  const buf2 = encode$c(pinRoot);
  const digest2 = await sha256$1.digest(buf2);
  const cid = CID$3.createV0(digest2);
  await blockstore.put(cid, buf2);
  await datastore.put(PIN_DS_KEY, cid.bytes);
}
async function process$2(backends, onProgress, fn) {
  const blockstore = backends.blocks;
  const datastore = backends.datastore;
  const pinstore = backends.pins;
  await blockstore.open();
  await datastore.open();
  await pinstore.open();
  try {
    await fn(blockstore, datastore, pinstore, onProgress);
  } finally {
    await pinstore.close();
    await datastore.close();
    await blockstore.close();
  }
}
const migration$3 = {
  version: 9,
  description: "Migrates pins to datastore",
  migrate: (backends, onProgress = () => {
  }) => {
    return process$2(backends, onProgress, pinsToDatastore);
  },
  revert: (backends, onProgress = () => {
  }) => {
    return process$2(backends, onProgress, pinsToDAG);
  }
};
function dbOpenFailedError(err) {
  err = err || new Error("Cannot open database");
  return errCode(err, "ERR_DB_OPEN_FAILED");
}
function dbDeleteFailedError(err) {
  err = err || new Error("Delete failed");
  return errCode(err, "ERR_DB_DELETE_FAILED");
}
function dbWriteFailedError(err) {
  err = err || new Error("Write failed");
  return errCode(err, "ERR_DB_WRITE_FAILED");
}
function notFoundError(err) {
  err = err || new Error("Not Found");
  return errCode(err, "ERR_NOT_FOUND");
}
const CONFIG_KEY = new Key("/config");
const VERSION_KEY = new Key("/version");
function findLevelJs$1(store) {
  let db = store;
  while (db.db || db.child) {
    db = db.db || db.child;
    if (db.type === "level-js" || db.constructor.name === "Level") {
      return db;
    }
  }
}
async function hasWithFallback$1(key, has, store) {
  const result = await has(key);
  if (result) {
    return result;
  }
  const levelJs = findLevelJs$1(store);
  if (!levelJs) {
    return false;
  }
  return new Promise((resolve, reject) => {
    const req = levelJs.store("readonly").get(key.toString());
    req.transaction.onabort = () => {
      reject(req.transaction.error);
    };
    req.transaction.oncomplete = () => {
      resolve(Boolean(req.result));
    };
  });
}
async function getWithFallback$1(key, get2, has, store) {
  if (await has(key)) {
    return get2(key);
  }
  const levelJs = findLevelJs$1(store);
  if (!levelJs) {
    throw notFoundError();
  }
  return new Promise((resolve, reject) => {
    const req = levelJs.store("readonly").get(key.toString());
    req.transaction.onabort = () => {
      reject(req.transaction.error);
    };
    req.transaction.oncomplete = () => {
      if (req.result) {
        return resolve(req.result);
      }
      reject(notFoundError());
    };
  });
}
function wrapStore(store) {
  const originalGet = store.get.bind(store);
  const originalHas = store.has.bind(store);
  store.get = (key) => getWithFallback$1(key, originalGet, originalHas, store);
  store.has = (key) => hasWithFallback$1(key, originalHas, store);
  return store;
}
function wrapBackends(backends) {
  return {
    ...backends,
    root: wrapStore(backends.root),
    datastore: wrapStore(backends.datastore),
    pins: wrapStore(backends.pins),
    keys: wrapStore(backends.keys)
  };
}
async function keysToBinary(name2, store, onProgress = () => {
}) {
  const db = findLevelJs$1(store);
  if (!db) {
    onProgress(`${name2} did not need an upgrade`);
    return;
  }
  onProgress(`Upgrading ${name2}`);
  const upgrade = (key, value) => {
    return [
      { type: "del", key },
      { type: "put", key: fromString$3(key), value }
    ];
  };
  await withEach(db, upgrade);
}
async function keysToStrings(name2, store, onProgress = () => {
}) {
  const db = findLevelJs$1(store);
  if (!db) {
    onProgress(`${name2} did not need a downgrade`);
    return;
  }
  onProgress(`Downgrading ${name2}`);
  const downgrade = (key, value) => {
    return [
      { type: "del", key },
      { type: "put", key: toString$3(key), value }
    ];
  };
  await withEach(db, downgrade);
}
function unwrap(store) {
  if (store.child) {
    return unwrap(store.child);
  }
  return store;
}
async function process$1(backends, onProgress, fn) {
  const datastores = Object.entries(backends).map(([key, backend]) => ({ key, backend: unwrap(backend) })).filter(({ key, backend }) => backend.constructor.name === "LevelDatastore").map(({ key, backend }) => ({
    name: key,
    store: backend
  }));
  onProgress(0, `Migrating ${datastores.length} dbs`);
  let migrated = 0;
  const progress = (message) => {
    onProgress(Math.round(migrated / datastores.length * 100), message);
  };
  for (const { name: name2, store } of datastores) {
    await store.open();
    try {
      await fn(name2, store, progress);
    } finally {
      migrated++;
      await store.close();
    }
  }
  onProgress(100, `Migrated ${datastores.length} dbs`);
}
const migration$2 = {
  version: 10,
  description: "Migrates datastore-level keys to binary",
  migrate: (backends, onProgress = () => {
  }) => {
    return process$1(backends, onProgress, keysToBinary);
  },
  revert: (backends, onProgress = () => {
  }) => {
    return process$1(backends, onProgress, keysToStrings);
  }
};
function withEach(db, fn) {
  function batch2(operations, next) {
    const store = db.store("readwrite");
    const transaction = store.transaction;
    let index = 0;
    let error;
    transaction.onabort = () => next(error || transaction.error || new Error("aborted by user"));
    transaction.oncomplete = () => next();
    function loop() {
      const op = operations[index++];
      const key = op.key;
      let req;
      try {
        req = op.type === "del" ? store.delete(key) : store.put(op.value, key);
      } catch (err) {
        error = err;
        transaction.abort();
        return;
      }
      if (index < operations.length) {
        req.onsuccess = loop;
      }
    }
    loop();
  }
  return new Promise((resolve, reject) => {
    const it = db.iterator();
    const id = (data) => data;
    it._deserializeKey = it._deserializeValue = id;
    next();
    function next() {
      const handleNext = (err, key, value) => {
        if (err || key === void 0) {
          const handleEnd = (err2) => {
            if (err2) {
              reject(err2);
              return;
            }
            resolve();
          };
          it.end(handleEnd);
          return;
        }
        batch2(fn(key, value), next);
      };
      it.next(handleNext);
    }
  });
}
const MFS_ROOT_KEY$1 = new Key("/local/filesroot");
async function storeMfsRootInDatastore(backends, onProgress = () => {
}) {
  onProgress(100, "Migrating MFS root to repo datastore");
  await backends.root.open();
  await backends.datastore.open();
  if (await backends.root.has(MFS_ROOT_KEY$1)) {
    const root = await backends.root.get(MFS_ROOT_KEY$1);
    await backends.datastore.put(MFS_ROOT_KEY$1, root);
    await backends.root.delete(MFS_ROOT_KEY$1);
  }
  await backends.datastore.close();
  await backends.root.close();
  onProgress(100, "Stored MFS root in repo datastore");
}
async function storeMfsRootInRoot(backends, onProgress = () => {
}) {
  onProgress(100, "Migrating MFS root to repo root datastore");
  await backends.root.open();
  await backends.datastore.open();
  if (await backends.datastore.has(MFS_ROOT_KEY$1)) {
    const root = await backends.datastore.get(MFS_ROOT_KEY$1);
    await backends.root.put(MFS_ROOT_KEY$1, root);
    await backends.datastore.delete(MFS_ROOT_KEY$1);
  }
  await backends.datastore.close();
  await backends.root.close();
  onProgress(100, "Stored MFS root in repo root datastore");
}
const migration$1 = {
  version: 11,
  description: "Store mfs root in the datastore",
  migrate: storeMfsRootInDatastore,
  revert: storeMfsRootInRoot
};
const $Reader$4 = $protobuf.Reader, $Writer$4 = $protobuf.Writer, $util$4 = $protobuf.util;
const $root$4 = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
const Protocols = $root$4.Protocols = (() => {
  function Protocols2(p) {
    this.protocols = [];
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Protocols2.prototype.protocols = $util$4.emptyArray;
  Protocols2.encode = function encode2(m, w) {
    if (!w)
      w = $Writer$4.create();
    if (m.protocols != null && m.protocols.length) {
      for (var i = 0; i < m.protocols.length; ++i)
        w.uint32(10).string(m.protocols[i]);
    }
    return w;
  };
  Protocols2.decode = function decode2(r, l) {
    if (!(r instanceof $Reader$4))
      r = $Reader$4.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root$4.Protocols();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          if (!(m.protocols && m.protocols.length))
            m.protocols = [];
          m.protocols.push(r.string());
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Protocols2.fromObject = function fromObject(d) {
    if (d instanceof $root$4.Protocols)
      return d;
    var m = new $root$4.Protocols();
    if (d.protocols) {
      if (!Array.isArray(d.protocols))
        throw TypeError(".Protocols.protocols: array expected");
      m.protocols = [];
      for (var i = 0; i < d.protocols.length; ++i) {
        m.protocols[i] = String(d.protocols[i]);
      }
    }
    return m;
  };
  Protocols2.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.arrays || o.defaults) {
      d.protocols = [];
    }
    if (m.protocols && m.protocols.length) {
      d.protocols = [];
      for (var j = 0; j < m.protocols.length; ++j) {
        d.protocols[j] = m.protocols[j];
      }
    }
    return d;
  };
  Protocols2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  return Protocols2;
})();
const $Reader$3 = $protobuf.Reader, $Writer$3 = $protobuf.Writer, $util$3 = $protobuf.util;
const $root$3 = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
const Addresses = $root$3.Addresses = (() => {
  function Addresses2(p) {
    this.addrs = [];
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Addresses2.prototype.addrs = $util$3.emptyArray;
  Addresses2.prototype.certifiedRecord = null;
  Addresses2.encode = function encode2(m, w) {
    if (!w)
      w = $Writer$3.create();
    if (m.addrs != null && m.addrs.length) {
      for (var i = 0; i < m.addrs.length; ++i)
        $root$3.Addresses.Address.encode(m.addrs[i], w.uint32(10).fork()).ldelim();
    }
    if (m.certifiedRecord != null && Object.hasOwnProperty.call(m, "certifiedRecord"))
      $root$3.Addresses.CertifiedRecord.encode(m.certifiedRecord, w.uint32(18).fork()).ldelim();
    return w;
  };
  Addresses2.decode = function decode2(r, l) {
    if (!(r instanceof $Reader$3))
      r = $Reader$3.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root$3.Addresses();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          if (!(m.addrs && m.addrs.length))
            m.addrs = [];
          m.addrs.push($root$3.Addresses.Address.decode(r, r.uint32()));
          break;
        case 2:
          m.certifiedRecord = $root$3.Addresses.CertifiedRecord.decode(r, r.uint32());
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Addresses2.fromObject = function fromObject(d) {
    if (d instanceof $root$3.Addresses)
      return d;
    var m = new $root$3.Addresses();
    if (d.addrs) {
      if (!Array.isArray(d.addrs))
        throw TypeError(".Addresses.addrs: array expected");
      m.addrs = [];
      for (var i = 0; i < d.addrs.length; ++i) {
        if (typeof d.addrs[i] !== "object")
          throw TypeError(".Addresses.addrs: object expected");
        m.addrs[i] = $root$3.Addresses.Address.fromObject(d.addrs[i]);
      }
    }
    if (d.certifiedRecord != null) {
      if (typeof d.certifiedRecord !== "object")
        throw TypeError(".Addresses.certifiedRecord: object expected");
      m.certifiedRecord = $root$3.Addresses.CertifiedRecord.fromObject(d.certifiedRecord);
    }
    return m;
  };
  Addresses2.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.arrays || o.defaults) {
      d.addrs = [];
    }
    if (o.defaults) {
      d.certifiedRecord = null;
    }
    if (m.addrs && m.addrs.length) {
      d.addrs = [];
      for (var j = 0; j < m.addrs.length; ++j) {
        d.addrs[j] = $root$3.Addresses.Address.toObject(m.addrs[j], o);
      }
    }
    if (m.certifiedRecord != null && m.hasOwnProperty("certifiedRecord")) {
      d.certifiedRecord = $root$3.Addresses.CertifiedRecord.toObject(m.certifiedRecord, o);
    }
    return d;
  };
  Addresses2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  Addresses2.Address = function() {
    function Address(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null)
            this[ks[i]] = p[ks[i]];
      }
    }
    Address.prototype.multiaddr = $util$3.newBuffer([]);
    Address.prototype.isCertified = null;
    let $oneOfFields;
    Object.defineProperty(Address.prototype, "_isCertified", {
      get: $util$3.oneOfGetter($oneOfFields = ["isCertified"]),
      set: $util$3.oneOfSetter($oneOfFields)
    });
    Address.encode = function encode2(m, w) {
      if (!w)
        w = $Writer$3.create();
      if (m.multiaddr != null && Object.hasOwnProperty.call(m, "multiaddr"))
        w.uint32(10).bytes(m.multiaddr);
      if (m.isCertified != null && Object.hasOwnProperty.call(m, "isCertified"))
        w.uint32(16).bool(m.isCertified);
      return w;
    };
    Address.decode = function decode2(r, l) {
      if (!(r instanceof $Reader$3))
        r = $Reader$3.create(r);
      var c = l === void 0 ? r.len : r.pos + l, m = new $root$3.Addresses.Address();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.multiaddr = r.bytes();
            break;
          case 2:
            m.isCertified = r.bool();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    Address.fromObject = function fromObject(d) {
      if (d instanceof $root$3.Addresses.Address)
        return d;
      var m = new $root$3.Addresses.Address();
      if (d.multiaddr != null) {
        if (typeof d.multiaddr === "string")
          $util$3.base64.decode(d.multiaddr, m.multiaddr = $util$3.newBuffer($util$3.base64.length(d.multiaddr)), 0);
        else if (d.multiaddr.length)
          m.multiaddr = d.multiaddr;
      }
      if (d.isCertified != null) {
        m.isCertified = Boolean(d.isCertified);
      }
      return m;
    };
    Address.toObject = function toObject(m, o) {
      if (!o)
        o = {};
      var d = {};
      if (o.defaults) {
        if (o.bytes === String)
          d.multiaddr = "";
        else {
          d.multiaddr = [];
          if (o.bytes !== Array)
            d.multiaddr = $util$3.newBuffer(d.multiaddr);
        }
      }
      if (m.multiaddr != null && m.hasOwnProperty("multiaddr")) {
        d.multiaddr = o.bytes === String ? $util$3.base64.encode(m.multiaddr, 0, m.multiaddr.length) : o.bytes === Array ? Array.prototype.slice.call(m.multiaddr) : m.multiaddr;
      }
      if (m.isCertified != null && m.hasOwnProperty("isCertified")) {
        d.isCertified = m.isCertified;
        if (o.oneofs)
          d._isCertified = "isCertified";
      }
      return d;
    };
    Address.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return Address;
  }();
  Addresses2.CertifiedRecord = function() {
    function CertifiedRecord(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null)
            this[ks[i]] = p[ks[i]];
      }
    }
    CertifiedRecord.prototype.seq = $util$3.Long ? $util$3.Long.fromBits(0, 0, true) : 0;
    CertifiedRecord.prototype.raw = $util$3.newBuffer([]);
    CertifiedRecord.encode = function encode2(m, w) {
      if (!w)
        w = $Writer$3.create();
      if (m.seq != null && Object.hasOwnProperty.call(m, "seq"))
        w.uint32(8).uint64(m.seq);
      if (m.raw != null && Object.hasOwnProperty.call(m, "raw"))
        w.uint32(18).bytes(m.raw);
      return w;
    };
    CertifiedRecord.decode = function decode2(r, l) {
      if (!(r instanceof $Reader$3))
        r = $Reader$3.create(r);
      var c = l === void 0 ? r.len : r.pos + l, m = new $root$3.Addresses.CertifiedRecord();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.seq = r.uint64();
            break;
          case 2:
            m.raw = r.bytes();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    CertifiedRecord.fromObject = function fromObject(d) {
      if (d instanceof $root$3.Addresses.CertifiedRecord)
        return d;
      var m = new $root$3.Addresses.CertifiedRecord();
      if (d.seq != null) {
        if ($util$3.Long)
          (m.seq = $util$3.Long.fromValue(d.seq)).unsigned = true;
        else if (typeof d.seq === "string")
          m.seq = parseInt(d.seq, 10);
        else if (typeof d.seq === "number")
          m.seq = d.seq;
        else if (typeof d.seq === "object")
          m.seq = new $util$3.LongBits(d.seq.low >>> 0, d.seq.high >>> 0).toNumber(true);
      }
      if (d.raw != null) {
        if (typeof d.raw === "string")
          $util$3.base64.decode(d.raw, m.raw = $util$3.newBuffer($util$3.base64.length(d.raw)), 0);
        else if (d.raw.length)
          m.raw = d.raw;
      }
      return m;
    };
    CertifiedRecord.toObject = function toObject(m, o) {
      if (!o)
        o = {};
      var d = {};
      if (o.defaults) {
        if ($util$3.Long) {
          var n = new $util$3.Long(0, 0, true);
          d.seq = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
        } else
          d.seq = o.longs === String ? "0" : 0;
        if (o.bytes === String)
          d.raw = "";
        else {
          d.raw = [];
          if (o.bytes !== Array)
            d.raw = $util$3.newBuffer(d.raw);
        }
      }
      if (m.seq != null && m.hasOwnProperty("seq")) {
        if (typeof m.seq === "number")
          d.seq = o.longs === String ? String(m.seq) : m.seq;
        else
          d.seq = o.longs === String ? $util$3.Long.prototype.toString.call(m.seq) : o.longs === Number ? new $util$3.LongBits(m.seq.low >>> 0, m.seq.high >>> 0).toNumber(true) : m.seq;
      }
      if (m.raw != null && m.hasOwnProperty("raw")) {
        d.raw = o.bytes === String ? $util$3.base64.encode(m.raw, 0, m.raw.length) : o.bytes === Array ? Array.prototype.slice.call(m.raw) : m.raw;
      }
      return d;
    };
    CertifiedRecord.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return CertifiedRecord;
  }();
  return Addresses2;
})();
const $Reader$2 = $protobuf.Reader, $Writer$2 = $protobuf.Writer, $util$2 = $protobuf.util;
const $root$2 = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
const Peer = $root$2.Peer = (() => {
  function Peer2(p) {
    this.addresses = [];
    this.protocols = [];
    this.metadata = [];
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Peer2.prototype.addresses = $util$2.emptyArray;
  Peer2.prototype.protocols = $util$2.emptyArray;
  Peer2.prototype.metadata = $util$2.emptyArray;
  Peer2.prototype.pubKey = null;
  Peer2.prototype.peerRecordEnvelope = null;
  let $oneOfFields;
  Object.defineProperty(Peer2.prototype, "_pubKey", {
    get: $util$2.oneOfGetter($oneOfFields = ["pubKey"]),
    set: $util$2.oneOfSetter($oneOfFields)
  });
  Object.defineProperty(Peer2.prototype, "_peerRecordEnvelope", {
    get: $util$2.oneOfGetter($oneOfFields = ["peerRecordEnvelope"]),
    set: $util$2.oneOfSetter($oneOfFields)
  });
  Peer2.encode = function encode2(m, w) {
    if (!w)
      w = $Writer$2.create();
    if (m.addresses != null && m.addresses.length) {
      for (var i = 0; i < m.addresses.length; ++i)
        $root$2.Address.encode(m.addresses[i], w.uint32(10).fork()).ldelim();
    }
    if (m.protocols != null && m.protocols.length) {
      for (var i = 0; i < m.protocols.length; ++i)
        w.uint32(18).string(m.protocols[i]);
    }
    if (m.metadata != null && m.metadata.length) {
      for (var i = 0; i < m.metadata.length; ++i)
        $root$2.Metadata.encode(m.metadata[i], w.uint32(26).fork()).ldelim();
    }
    if (m.pubKey != null && Object.hasOwnProperty.call(m, "pubKey"))
      w.uint32(34).bytes(m.pubKey);
    if (m.peerRecordEnvelope != null && Object.hasOwnProperty.call(m, "peerRecordEnvelope"))
      w.uint32(42).bytes(m.peerRecordEnvelope);
    return w;
  };
  Peer2.decode = function decode2(r, l) {
    if (!(r instanceof $Reader$2))
      r = $Reader$2.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root$2.Peer();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          if (!(m.addresses && m.addresses.length))
            m.addresses = [];
          m.addresses.push($root$2.Address.decode(r, r.uint32()));
          break;
        case 2:
          if (!(m.protocols && m.protocols.length))
            m.protocols = [];
          m.protocols.push(r.string());
          break;
        case 3:
          if (!(m.metadata && m.metadata.length))
            m.metadata = [];
          m.metadata.push($root$2.Metadata.decode(r, r.uint32()));
          break;
        case 4:
          m.pubKey = r.bytes();
          break;
        case 5:
          m.peerRecordEnvelope = r.bytes();
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Peer2.fromObject = function fromObject(d) {
    if (d instanceof $root$2.Peer)
      return d;
    var m = new $root$2.Peer();
    if (d.addresses) {
      if (!Array.isArray(d.addresses))
        throw TypeError(".Peer.addresses: array expected");
      m.addresses = [];
      for (var i = 0; i < d.addresses.length; ++i) {
        if (typeof d.addresses[i] !== "object")
          throw TypeError(".Peer.addresses: object expected");
        m.addresses[i] = $root$2.Address.fromObject(d.addresses[i]);
      }
    }
    if (d.protocols) {
      if (!Array.isArray(d.protocols))
        throw TypeError(".Peer.protocols: array expected");
      m.protocols = [];
      for (var i = 0; i < d.protocols.length; ++i) {
        m.protocols[i] = String(d.protocols[i]);
      }
    }
    if (d.metadata) {
      if (!Array.isArray(d.metadata))
        throw TypeError(".Peer.metadata: array expected");
      m.metadata = [];
      for (var i = 0; i < d.metadata.length; ++i) {
        if (typeof d.metadata[i] !== "object")
          throw TypeError(".Peer.metadata: object expected");
        m.metadata[i] = $root$2.Metadata.fromObject(d.metadata[i]);
      }
    }
    if (d.pubKey != null) {
      if (typeof d.pubKey === "string")
        $util$2.base64.decode(d.pubKey, m.pubKey = $util$2.newBuffer($util$2.base64.length(d.pubKey)), 0);
      else if (d.pubKey.length)
        m.pubKey = d.pubKey;
    }
    if (d.peerRecordEnvelope != null) {
      if (typeof d.peerRecordEnvelope === "string")
        $util$2.base64.decode(d.peerRecordEnvelope, m.peerRecordEnvelope = $util$2.newBuffer($util$2.base64.length(d.peerRecordEnvelope)), 0);
      else if (d.peerRecordEnvelope.length)
        m.peerRecordEnvelope = d.peerRecordEnvelope;
    }
    return m;
  };
  Peer2.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.arrays || o.defaults) {
      d.addresses = [];
      d.protocols = [];
      d.metadata = [];
    }
    if (m.addresses && m.addresses.length) {
      d.addresses = [];
      for (var j = 0; j < m.addresses.length; ++j) {
        d.addresses[j] = $root$2.Address.toObject(m.addresses[j], o);
      }
    }
    if (m.protocols && m.protocols.length) {
      d.protocols = [];
      for (var j = 0; j < m.protocols.length; ++j) {
        d.protocols[j] = m.protocols[j];
      }
    }
    if (m.metadata && m.metadata.length) {
      d.metadata = [];
      for (var j = 0; j < m.metadata.length; ++j) {
        d.metadata[j] = $root$2.Metadata.toObject(m.metadata[j], o);
      }
    }
    if (m.pubKey != null && m.hasOwnProperty("pubKey")) {
      d.pubKey = o.bytes === String ? $util$2.base64.encode(m.pubKey, 0, m.pubKey.length) : o.bytes === Array ? Array.prototype.slice.call(m.pubKey) : m.pubKey;
      if (o.oneofs)
        d._pubKey = "pubKey";
    }
    if (m.peerRecordEnvelope != null && m.hasOwnProperty("peerRecordEnvelope")) {
      d.peerRecordEnvelope = o.bytes === String ? $util$2.base64.encode(m.peerRecordEnvelope, 0, m.peerRecordEnvelope.length) : o.bytes === Array ? Array.prototype.slice.call(m.peerRecordEnvelope) : m.peerRecordEnvelope;
      if (o.oneofs)
        d._peerRecordEnvelope = "peerRecordEnvelope";
    }
    return d;
  };
  Peer2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  return Peer2;
})();
$root$2.Address = (() => {
  function Address(p) {
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Address.prototype.multiaddr = $util$2.newBuffer([]);
  Address.prototype.isCertified = null;
  let $oneOfFields;
  Object.defineProperty(Address.prototype, "_isCertified", {
    get: $util$2.oneOfGetter($oneOfFields = ["isCertified"]),
    set: $util$2.oneOfSetter($oneOfFields)
  });
  Address.encode = function encode2(m, w) {
    if (!w)
      w = $Writer$2.create();
    if (m.multiaddr != null && Object.hasOwnProperty.call(m, "multiaddr"))
      w.uint32(10).bytes(m.multiaddr);
    if (m.isCertified != null && Object.hasOwnProperty.call(m, "isCertified"))
      w.uint32(16).bool(m.isCertified);
    return w;
  };
  Address.decode = function decode2(r, l) {
    if (!(r instanceof $Reader$2))
      r = $Reader$2.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root$2.Address();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.multiaddr = r.bytes();
          break;
        case 2:
          m.isCertified = r.bool();
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Address.fromObject = function fromObject(d) {
    if (d instanceof $root$2.Address)
      return d;
    var m = new $root$2.Address();
    if (d.multiaddr != null) {
      if (typeof d.multiaddr === "string")
        $util$2.base64.decode(d.multiaddr, m.multiaddr = $util$2.newBuffer($util$2.base64.length(d.multiaddr)), 0);
      else if (d.multiaddr.length)
        m.multiaddr = d.multiaddr;
    }
    if (d.isCertified != null) {
      m.isCertified = Boolean(d.isCertified);
    }
    return m;
  };
  Address.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.defaults) {
      if (o.bytes === String)
        d.multiaddr = "";
      else {
        d.multiaddr = [];
        if (o.bytes !== Array)
          d.multiaddr = $util$2.newBuffer(d.multiaddr);
      }
    }
    if (m.multiaddr != null && m.hasOwnProperty("multiaddr")) {
      d.multiaddr = o.bytes === String ? $util$2.base64.encode(m.multiaddr, 0, m.multiaddr.length) : o.bytes === Array ? Array.prototype.slice.call(m.multiaddr) : m.multiaddr;
    }
    if (m.isCertified != null && m.hasOwnProperty("isCertified")) {
      d.isCertified = m.isCertified;
      if (o.oneofs)
        d._isCertified = "isCertified";
    }
    return d;
  };
  Address.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  return Address;
})();
$root$2.Metadata = (() => {
  function Metadata(p) {
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Metadata.prototype.key = "";
  Metadata.prototype.value = $util$2.newBuffer([]);
  Metadata.encode = function encode2(m, w) {
    if (!w)
      w = $Writer$2.create();
    if (m.key != null && Object.hasOwnProperty.call(m, "key"))
      w.uint32(10).string(m.key);
    if (m.value != null && Object.hasOwnProperty.call(m, "value"))
      w.uint32(18).bytes(m.value);
    return w;
  };
  Metadata.decode = function decode2(r, l) {
    if (!(r instanceof $Reader$2))
      r = $Reader$2.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root$2.Metadata();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.key = r.string();
          break;
        case 2:
          m.value = r.bytes();
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Metadata.fromObject = function fromObject(d) {
    if (d instanceof $root$2.Metadata)
      return d;
    var m = new $root$2.Metadata();
    if (d.key != null) {
      m.key = String(d.key);
    }
    if (d.value != null) {
      if (typeof d.value === "string")
        $util$2.base64.decode(d.value, m.value = $util$2.newBuffer($util$2.base64.length(d.value)), 0);
      else if (d.value.length)
        m.value = d.value;
    }
    return m;
  };
  Metadata.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.defaults) {
      d.key = "";
      if (o.bytes === String)
        d.value = "";
      else {
        d.value = [];
        if (o.bytes !== Array)
          d.value = $util$2.newBuffer(d.value);
      }
    }
    if (m.key != null && m.hasOwnProperty("key")) {
      d.key = m.key;
    }
    if (m.value != null && m.hasOwnProperty("value")) {
      d.value = o.bytes === String ? $util$2.base64.encode(m.value, 0, m.value.length) : o.bytes === Array ? Array.prototype.slice.call(m.value) : m.value;
    }
    return d;
  };
  Metadata.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  return Metadata;
})();
const $Reader$1 = $protobuf.Reader, $Writer$1 = $protobuf.Writer, $util$1 = $protobuf.util;
const $root$1 = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
const Envelope = $root$1.Envelope = (() => {
  function Envelope2(p) {
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  Envelope2.prototype.publicKey = $util$1.newBuffer([]);
  Envelope2.prototype.payloadType = $util$1.newBuffer([]);
  Envelope2.prototype.payload = $util$1.newBuffer([]);
  Envelope2.prototype.signature = $util$1.newBuffer([]);
  Envelope2.encode = function encode2(m, w) {
    if (!w)
      w = $Writer$1.create();
    if (m.publicKey != null && Object.hasOwnProperty.call(m, "publicKey"))
      w.uint32(10).bytes(m.publicKey);
    if (m.payloadType != null && Object.hasOwnProperty.call(m, "payloadType"))
      w.uint32(18).bytes(m.payloadType);
    if (m.payload != null && Object.hasOwnProperty.call(m, "payload"))
      w.uint32(26).bytes(m.payload);
    if (m.signature != null && Object.hasOwnProperty.call(m, "signature"))
      w.uint32(42).bytes(m.signature);
    return w;
  };
  Envelope2.decode = function decode2(r, l) {
    if (!(r instanceof $Reader$1))
      r = $Reader$1.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root$1.Envelope();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.publicKey = r.bytes();
          break;
        case 2:
          m.payloadType = r.bytes();
          break;
        case 3:
          m.payload = r.bytes();
          break;
        case 5:
          m.signature = r.bytes();
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  Envelope2.fromObject = function fromObject(d) {
    if (d instanceof $root$1.Envelope)
      return d;
    var m = new $root$1.Envelope();
    if (d.publicKey != null) {
      if (typeof d.publicKey === "string")
        $util$1.base64.decode(d.publicKey, m.publicKey = $util$1.newBuffer($util$1.base64.length(d.publicKey)), 0);
      else if (d.publicKey.length)
        m.publicKey = d.publicKey;
    }
    if (d.payloadType != null) {
      if (typeof d.payloadType === "string")
        $util$1.base64.decode(d.payloadType, m.payloadType = $util$1.newBuffer($util$1.base64.length(d.payloadType)), 0);
      else if (d.payloadType.length)
        m.payloadType = d.payloadType;
    }
    if (d.payload != null) {
      if (typeof d.payload === "string")
        $util$1.base64.decode(d.payload, m.payload = $util$1.newBuffer($util$1.base64.length(d.payload)), 0);
      else if (d.payload.length)
        m.payload = d.payload;
    }
    if (d.signature != null) {
      if (typeof d.signature === "string")
        $util$1.base64.decode(d.signature, m.signature = $util$1.newBuffer($util$1.base64.length(d.signature)), 0);
      else if (d.signature.length)
        m.signature = d.signature;
    }
    return m;
  };
  Envelope2.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.defaults) {
      if (o.bytes === String)
        d.publicKey = "";
      else {
        d.publicKey = [];
        if (o.bytes !== Array)
          d.publicKey = $util$1.newBuffer(d.publicKey);
      }
      if (o.bytes === String)
        d.payloadType = "";
      else {
        d.payloadType = [];
        if (o.bytes !== Array)
          d.payloadType = $util$1.newBuffer(d.payloadType);
      }
      if (o.bytes === String)
        d.payload = "";
      else {
        d.payload = [];
        if (o.bytes !== Array)
          d.payload = $util$1.newBuffer(d.payload);
      }
      if (o.bytes === String)
        d.signature = "";
      else {
        d.signature = [];
        if (o.bytes !== Array)
          d.signature = $util$1.newBuffer(d.signature);
      }
    }
    if (m.publicKey != null && m.hasOwnProperty("publicKey")) {
      d.publicKey = o.bytes === String ? $util$1.base64.encode(m.publicKey, 0, m.publicKey.length) : o.bytes === Array ? Array.prototype.slice.call(m.publicKey) : m.publicKey;
    }
    if (m.payloadType != null && m.hasOwnProperty("payloadType")) {
      d.payloadType = o.bytes === String ? $util$1.base64.encode(m.payloadType, 0, m.payloadType.length) : o.bytes === Array ? Array.prototype.slice.call(m.payloadType) : m.payloadType;
    }
    if (m.payload != null && m.hasOwnProperty("payload")) {
      d.payload = o.bytes === String ? $util$1.base64.encode(m.payload, 0, m.payload.length) : o.bytes === Array ? Array.prototype.slice.call(m.payload) : m.payload;
    }
    if (m.signature != null && m.hasOwnProperty("signature")) {
      d.signature = o.bytes === String ? $util$1.base64.encode(m.signature, 0, m.signature.length) : o.bytes === Array ? Array.prototype.slice.call(m.signature) : m.signature;
    }
    return d;
  };
  Envelope2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  return Envelope2;
})();
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
const PeerRecord = $root.PeerRecord = (() => {
  function PeerRecord2(p) {
    this.addresses = [];
    if (p) {
      for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
        if (p[ks[i]] != null)
          this[ks[i]] = p[ks[i]];
    }
  }
  PeerRecord2.prototype.peerId = $util.newBuffer([]);
  PeerRecord2.prototype.seq = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
  PeerRecord2.prototype.addresses = $util.emptyArray;
  PeerRecord2.encode = function encode2(m, w) {
    if (!w)
      w = $Writer.create();
    if (m.peerId != null && Object.hasOwnProperty.call(m, "peerId"))
      w.uint32(10).bytes(m.peerId);
    if (m.seq != null && Object.hasOwnProperty.call(m, "seq"))
      w.uint32(16).uint64(m.seq);
    if (m.addresses != null && m.addresses.length) {
      for (var i = 0; i < m.addresses.length; ++i)
        $root.PeerRecord.AddressInfo.encode(m.addresses[i], w.uint32(26).fork()).ldelim();
    }
    return w;
  };
  PeerRecord2.decode = function decode2(r, l) {
    if (!(r instanceof $Reader))
      r = $Reader.create(r);
    var c = l === void 0 ? r.len : r.pos + l, m = new $root.PeerRecord();
    while (r.pos < c) {
      var t = r.uint32();
      switch (t >>> 3) {
        case 1:
          m.peerId = r.bytes();
          break;
        case 2:
          m.seq = r.uint64();
          break;
        case 3:
          if (!(m.addresses && m.addresses.length))
            m.addresses = [];
          m.addresses.push($root.PeerRecord.AddressInfo.decode(r, r.uint32()));
          break;
        default:
          r.skipType(t & 7);
          break;
      }
    }
    return m;
  };
  PeerRecord2.fromObject = function fromObject(d) {
    if (d instanceof $root.PeerRecord)
      return d;
    var m = new $root.PeerRecord();
    if (d.peerId != null) {
      if (typeof d.peerId === "string")
        $util.base64.decode(d.peerId, m.peerId = $util.newBuffer($util.base64.length(d.peerId)), 0);
      else if (d.peerId.length)
        m.peerId = d.peerId;
    }
    if (d.seq != null) {
      if ($util.Long)
        (m.seq = $util.Long.fromValue(d.seq)).unsigned = true;
      else if (typeof d.seq === "string")
        m.seq = parseInt(d.seq, 10);
      else if (typeof d.seq === "number")
        m.seq = d.seq;
      else if (typeof d.seq === "object")
        m.seq = new $util.LongBits(d.seq.low >>> 0, d.seq.high >>> 0).toNumber(true);
    }
    if (d.addresses) {
      if (!Array.isArray(d.addresses))
        throw TypeError(".PeerRecord.addresses: array expected");
      m.addresses = [];
      for (var i = 0; i < d.addresses.length; ++i) {
        if (typeof d.addresses[i] !== "object")
          throw TypeError(".PeerRecord.addresses: object expected");
        m.addresses[i] = $root.PeerRecord.AddressInfo.fromObject(d.addresses[i]);
      }
    }
    return m;
  };
  PeerRecord2.toObject = function toObject(m, o) {
    if (!o)
      o = {};
    var d = {};
    if (o.arrays || o.defaults) {
      d.addresses = [];
    }
    if (o.defaults) {
      if (o.bytes === String)
        d.peerId = "";
      else {
        d.peerId = [];
        if (o.bytes !== Array)
          d.peerId = $util.newBuffer(d.peerId);
      }
      if ($util.Long) {
        var n = new $util.Long(0, 0, true);
        d.seq = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
      } else
        d.seq = o.longs === String ? "0" : 0;
    }
    if (m.peerId != null && m.hasOwnProperty("peerId")) {
      d.peerId = o.bytes === String ? $util.base64.encode(m.peerId, 0, m.peerId.length) : o.bytes === Array ? Array.prototype.slice.call(m.peerId) : m.peerId;
    }
    if (m.seq != null && m.hasOwnProperty("seq")) {
      if (typeof m.seq === "number")
        d.seq = o.longs === String ? String(m.seq) : m.seq;
      else
        d.seq = o.longs === String ? $util.Long.prototype.toString.call(m.seq) : o.longs === Number ? new $util.LongBits(m.seq.low >>> 0, m.seq.high >>> 0).toNumber(true) : m.seq;
    }
    if (m.addresses && m.addresses.length) {
      d.addresses = [];
      for (var j = 0; j < m.addresses.length; ++j) {
        d.addresses[j] = $root.PeerRecord.AddressInfo.toObject(m.addresses[j], o);
      }
    }
    return d;
  };
  PeerRecord2.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };
  PeerRecord2.AddressInfo = function() {
    function AddressInfo(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null)
            this[ks[i]] = p[ks[i]];
      }
    }
    AddressInfo.prototype.multiaddr = $util.newBuffer([]);
    AddressInfo.encode = function encode2(m, w) {
      if (!w)
        w = $Writer.create();
      if (m.multiaddr != null && Object.hasOwnProperty.call(m, "multiaddr"))
        w.uint32(10).bytes(m.multiaddr);
      return w;
    };
    AddressInfo.decode = function decode2(r, l) {
      if (!(r instanceof $Reader))
        r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l, m = new $root.PeerRecord.AddressInfo();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.multiaddr = r.bytes();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    AddressInfo.fromObject = function fromObject(d) {
      if (d instanceof $root.PeerRecord.AddressInfo)
        return d;
      var m = new $root.PeerRecord.AddressInfo();
      if (d.multiaddr != null) {
        if (typeof d.multiaddr === "string")
          $util.base64.decode(d.multiaddr, m.multiaddr = $util.newBuffer($util.base64.length(d.multiaddr)), 0);
        else if (d.multiaddr.length)
          m.multiaddr = d.multiaddr;
      }
      return m;
    };
    AddressInfo.toObject = function toObject(m, o) {
      if (!o)
        o = {};
      var d = {};
      if (o.defaults) {
        if (o.bytes === String)
          d.multiaddr = "";
        else {
          d.multiaddr = [];
          if (o.bytes !== Array)
            d.multiaddr = $util.newBuffer(d.multiaddr);
        }
      }
      if (m.multiaddr != null && m.hasOwnProperty("multiaddr")) {
        d.multiaddr = o.bytes === String ? $util.base64.encode(m.multiaddr, 0, m.multiaddr.length) : o.bytes === Array ? Array.prototype.slice.call(m.multiaddr) : m.multiaddr;
      }
      return d;
    };
    AddressInfo.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return AddressInfo;
  }();
  return PeerRecord2;
})();
class Parser {
  constructor() {
    __publicField(this, "index", 0);
    __publicField(this, "input", "");
  }
  new(input) {
    this.index = 0;
    this.input = input;
    return this;
  }
  readAtomically(fn) {
    const index = this.index;
    const result = fn();
    if (result === void 0) {
      this.index = index;
    }
    return result;
  }
  parseWith(fn) {
    const result = fn();
    if (this.index !== this.input.length) {
      return void 0;
    }
    return result;
  }
  peekChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index];
  }
  readChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index++];
  }
  readGivenChar(target) {
    return this.readAtomically(() => {
      const char = this.readChar();
      if (char !== target) {
        return void 0;
      }
      return char;
    });
  }
  readSeparator(sep, index, inner) {
    return this.readAtomically(() => {
      if (index > 0) {
        if (this.readGivenChar(sep) === void 0) {
          return void 0;
        }
      }
      return inner();
    });
  }
  readNumber(radix, maxDigits, allowZeroPrefix, maxBytes) {
    return this.readAtomically(() => {
      let result = 0;
      let digitCount = 0;
      const leadingChar = this.peekChar();
      if (leadingChar === void 0) {
        return void 0;
      }
      const hasLeadingZero = leadingChar === "0";
      const maxValue = 2 ** (8 * maxBytes) - 1;
      while (true) {
        const digit = this.readAtomically(() => {
          const char = this.readChar();
          if (char === void 0) {
            return void 0;
          }
          const num = Number.parseInt(char, radix);
          if (Number.isNaN(num)) {
            return void 0;
          }
          return num;
        });
        if (digit === void 0) {
          break;
        }
        result *= radix;
        result += digit;
        if (result > maxValue) {
          return void 0;
        }
        digitCount += 1;
        if (maxDigits !== void 0) {
          if (digitCount > maxDigits) {
            return void 0;
          }
        }
      }
      if (digitCount === 0) {
        return void 0;
      } else if (!allowZeroPrefix && hasLeadingZero && digitCount > 1) {
        return void 0;
      } else {
        return result;
      }
    });
  }
  readIPv4Addr() {
    return this.readAtomically(() => {
      const out = new Uint8Array(4);
      for (let i = 0; i < out.length; i++) {
        const ix = this.readSeparator(".", i, () => this.readNumber(10, 3, false, 1));
        if (ix === void 0) {
          return void 0;
        }
        out[i] = ix;
      }
      return out;
    });
  }
  readIPv6Addr() {
    const readGroups = (groups) => {
      for (let i = 0; i < groups.length / 2; i++) {
        const ix = i * 2;
        if (i < groups.length - 3) {
          const ipv4 = this.readSeparator(":", i, () => this.readIPv4Addr());
          if (ipv4 !== void 0) {
            groups[ix] = ipv4[0];
            groups[ix + 1] = ipv4[1];
            groups[ix + 2] = ipv4[2];
            groups[ix + 3] = ipv4[3];
            return [ix + 4, true];
          }
        }
        const group = this.readSeparator(":", i, () => this.readNumber(16, 4, true, 2));
        if (group === void 0) {
          return [ix, false];
        }
        groups[ix] = group >> 8;
        groups[ix + 1] = group & 255;
      }
      return [groups.length, false];
    };
    return this.readAtomically(() => {
      const head = new Uint8Array(16);
      const [headSize, headIp4] = readGroups(head);
      if (headSize === 16) {
        return head;
      }
      if (headIp4) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      const tail = new Uint8Array(14);
      const limit = 16 - (headSize + 2);
      const [tailSize] = readGroups(tail.subarray(0, limit));
      head.set(tail.subarray(0, tailSize), 16 - tailSize);
      return head;
    });
  }
  readIPAddr() {
    var _a2;
    return (_a2 = this.readIPv4Addr()) != null ? _a2 : this.readIPv6Addr();
  }
}
const MAX_IPV6_LENGTH = 45;
const MAX_IPV4_LENGTH = 15;
const parser = new Parser();
function parseIPv4(input) {
  if (input.length > MAX_IPV4_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv4Addr());
}
function parseIPv6(input) {
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv6Addr());
}
function parseIP(input) {
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPAddr());
}
function isIPv4(input) {
  return Boolean(parseIPv4(input));
}
function isIPv6(input) {
  return Boolean(parseIPv6(input));
}
function isIP(input) {
  return Boolean(parseIP(input));
}
const isV4 = isIPv4;
const isV6 = isIPv6;
const toBytes = function(ip) {
  let offset = 0;
  ip = ip.toString().trim();
  if (isV4(ip)) {
    const bytes2 = new Uint8Array(offset + 4);
    ip.split(/\./g).forEach((byte) => {
      bytes2[offset++] = parseInt(byte, 10) & 255;
    });
    return bytes2;
  }
  if (isV6(ip)) {
    const sections = ip.split(":", 8);
    let i;
    for (i = 0; i < sections.length; i++) {
      const isv4 = isV4(sections[i]);
      let v4Buffer;
      if (isv4) {
        v4Buffer = toBytes(sections[i]);
        sections[i] = toString$4(v4Buffer.slice(0, 2), "base16");
      }
      if (v4Buffer != null && ++i < 8) {
        sections.splice(i, 0, toString$4(v4Buffer.slice(2, 4), "base16"));
      }
    }
    if (sections[0] === "") {
      while (sections.length < 8)
        sections.unshift("0");
    } else if (sections[sections.length - 1] === "") {
      while (sections.length < 8)
        sections.push("0");
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ""; i++)
        ;
      const argv = [i, 1];
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push("0");
      }
      sections.splice.apply(sections, argv);
    }
    const bytes2 = new Uint8Array(offset + 16);
    for (i = 0; i < sections.length; i++) {
      const word = parseInt(sections[i], 16);
      bytes2[offset++] = word >> 8 & 255;
      bytes2[offset++] = word & 255;
    }
    return bytes2;
  }
  throw new Error("invalid ip address");
};
const toString$2 = function(buf2, offset = 0, length2) {
  offset = ~~offset;
  length2 = length2 != null ? length2 : buf2.length - offset;
  const view = new DataView(buf2.buffer);
  if (length2 === 4) {
    const result = [];
    for (let i = 0; i < length2; i++) {
      result.push(buf2[offset + i]);
    }
    return result.join(".");
  }
  if (length2 === 16) {
    const result = [];
    for (let i = 0; i < length2; i += 2) {
      result.push(view.getUint16(offset + i).toString(16));
    }
    return result.join(":").replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
  }
  return "";
};
const V = -1;
const names = {};
const codes = {};
const table = [
  [4, 32, "ip4"],
  [6, 16, "tcp"],
  [33, 16, "dccp"],
  [41, 128, "ip6"],
  [42, V, "ip6zone"],
  [53, V, "dns", true],
  [54, V, "dns4", true],
  [55, V, "dns6", true],
  [56, V, "dnsaddr", true],
  [132, 16, "sctp"],
  [273, 16, "udp"],
  [275, 0, "p2p-webrtc-star"],
  [276, 0, "p2p-webrtc-direct"],
  [277, 0, "p2p-stardust"],
  [280, 0, "webrtc"],
  [290, 0, "p2p-circuit"],
  [301, 0, "udt"],
  [302, 0, "utp"],
  [400, V, "unix", false, true],
  [421, V, "ipfs"],
  [421, V, "p2p"],
  [443, 0, "https"],
  [444, 96, "onion"],
  [445, 296, "onion3"],
  [446, V, "garlic64"],
  [460, 0, "quic"],
  [465, 0, "webtransport"],
  [466, V, "certhash"],
  [477, 0, "ws"],
  [478, 0, "wss"],
  [479, 0, "p2p-websocket-star"],
  [480, 0, "http"],
  [777, V, "memory"]
];
table.forEach((row) => {
  const proto = createProtocol(...row);
  codes[proto.code] = proto;
  names[proto.name] = proto;
});
function createProtocol(code2, size, name2, resolvable, path) {
  return {
    code: code2,
    size,
    name: name2,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  };
}
function getProtocol(proto) {
  if (typeof proto === "number") {
    if (codes[proto] != null) {
      return codes[proto];
    }
    throw new Error(`no protocol with code: ${proto}`);
  } else if (typeof proto === "string") {
    if (names[proto] != null) {
      return names[proto];
    }
    throw new Error(`no protocol with name: ${proto}`);
  }
  throw new Error(`invalid protocol id type: ${typeof proto}`);
}
function concat(arrays, length2) {
  if (length2 == null) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe$2(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array$2(output);
}
function convertToString(proto, buf2) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
    case 41:
      return bytes2ip(buf2);
    case 6:
    case 273:
    case 33:
    case 132:
      return bytes2port(buf2).toString();
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 777:
      return bytes2str(buf2);
    case 421:
      return bytes2mh(buf2);
    case 444:
      return bytes2onion(buf2);
    case 445:
      return bytes2onion(buf2);
    case 466:
      return bytes2mb(buf2);
    default:
      return toString$4(buf2, "base16");
  }
}
function convertToBytes(proto, str) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
      return ip2bytes(str);
    case 41:
      return ip2bytes(str);
    case 6:
    case 273:
    case 33:
    case 132:
      return port2bytes(parseInt(str, 10));
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 777:
      return str2bytes(str);
    case 421:
      return mh2bytes(str);
    case 444:
      return onion2bytes(str);
    case 445:
      return onion32bytes(str);
    case 466:
      return mb2bytes(str);
    default:
      return fromString$4(str, "base16");
  }
}
const decoders = Object.values(bases$2).map((c) => c.decoder);
const anybaseDecoder = function() {
  let acc = decoders[0].or(decoders[1]);
  decoders.slice(2).forEach((d) => acc = acc.or(d));
  return acc;
}();
function ip2bytes(ipString) {
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return toBytes(ipString);
}
function bytes2ip(ipBuff) {
  const ipString = toString$2(ipBuff, 0, ipBuff.length);
  if (ipString == null) {
    throw new Error("ipBuff is required");
  }
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return ipString;
}
function port2bytes(port) {
  const buf2 = new ArrayBuffer(2);
  const view = new DataView(buf2);
  view.setUint16(0, port);
  return new Uint8Array(buf2);
}
function bytes2port(buf2) {
  const view = new DataView(buf2.buffer);
  return view.getUint16(buf2.byteOffset);
}
function str2bytes(str) {
  const buf2 = fromString$4(str);
  const size = Uint8Array.from(varint$6.encode(buf2.length));
  return concat([size, buf2], size.length + buf2.length);
}
function bytes2str(buf2) {
  const size = varint$6.decode(buf2);
  buf2 = buf2.slice(varint$6.decode.bytes);
  if (buf2.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString$4(buf2);
}
function mh2bytes(hash2) {
  let mh;
  if (hash2[0] === "Q" || hash2[0] === "1") {
    mh = decode$z(base58btc$8.decode(`z${hash2}`)).bytes;
  } else {
    mh = CID$6.parse(hash2).multihash.bytes;
  }
  const size = Uint8Array.from(varint$6.encode(mh.length));
  return concat([size, mh], size.length + mh.length);
}
function mb2bytes(mbstr) {
  const mb = anybaseDecoder.decode(mbstr);
  const size = Uint8Array.from(varint$6.encode(mb.length));
  return concat([size, mb], size.length + mb.length);
}
function bytes2mb(buf2) {
  const size = varint$6.decode(buf2);
  const hash2 = buf2.slice(varint$6.decode.bytes);
  if (hash2.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return "u" + toString$4(hash2, "base64url");
}
function bytes2mh(buf2) {
  const size = varint$6.decode(buf2);
  const address = buf2.slice(varint$6.decode.bytes);
  if (address.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString$4(address, "base58btc");
}
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf2 = base32$b.decode("b" + addr[0]);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf2, portBuf], buf2.length + portBuf.length);
}
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf2 = base32$b.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf2, portBuf], buf2.length + portBuf.length);
}
function bytes2onion(buf2) {
  const addrBytes = buf2.slice(0, buf2.length - 2);
  const portBytes = buf2.slice(buf2.length - 2);
  const addr = toString$4(addrBytes, "base32");
  const port = bytes2port(portBytes);
  return `${addr}:${port}`;
}
function stringToStringTuples(str) {
  const tuples = [];
  const parts = str.split("/").slice(1);
  if (parts.length === 1 && parts[0] === "") {
    return [];
  }
  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];
    const proto = getProtocol(part);
    if (proto.size === 0) {
      tuples.push([part]);
      continue;
    }
    p++;
    if (p >= parts.length) {
      throw ParseError("invalid address: " + str);
    }
    if (proto.path === true) {
      tuples.push([
        part,
        cleanPath(parts.slice(p).join("/"))
      ]);
      break;
    }
    tuples.push([part, parts[p]]);
  }
  return tuples;
}
function stringTuplesToString(tuples) {
  const parts = [];
  tuples.map((tup) => {
    const proto = protoFromTuple(tup);
    parts.push(proto.name);
    if (tup.length > 1 && tup[1] != null) {
      parts.push(tup[1]);
    }
    return null;
  });
  return cleanPath(parts.join("/"));
}
function stringTuplesToTuples(tuples) {
  return tuples.map((tup) => {
    if (!Array.isArray(tup)) {
      tup = [tup];
    }
    const proto = protoFromTuple(tup);
    if (tup.length > 1) {
      return [proto.code, convertToBytes(proto.code, tup[1])];
    }
    return [proto.code];
  });
}
function tuplesToStringTuples(tuples) {
  return tuples.map((tup) => {
    const proto = protoFromTuple(tup);
    if (tup[1] != null) {
      return [proto.code, convertToString(proto.code, tup[1])];
    }
    return [proto.code];
  });
}
function tuplesToBytes(tuples) {
  return fromBytes(concat(tuples.map((tup) => {
    const proto = protoFromTuple(tup);
    let buf2 = Uint8Array.from(varint$6.encode(proto.code));
    if (tup.length > 1 && tup[1] != null) {
      buf2 = concat([buf2, tup[1]]);
    }
    return buf2;
  })));
}
function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = varint$6.decode(addr);
    return size + varint$6.decode.bytes;
  }
}
function bytesToTuples(buf2) {
  const tuples = [];
  let i = 0;
  while (i < buf2.length) {
    const code2 = varint$6.decode(buf2, i);
    const n = varint$6.decode.bytes;
    const p = getProtocol(code2);
    const size = sizeForAddr(p, buf2.slice(i + n));
    if (size === 0) {
      tuples.push([code2]);
      i += n;
      continue;
    }
    const addr = buf2.slice(i + n, i + n + size);
    i += size + n;
    if (i > buf2.length) {
      throw ParseError("Invalid address Uint8Array: " + toString$4(buf2, "base16"));
    }
    tuples.push([code2, addr]);
  }
  return tuples;
}
function bytesToString(buf2) {
  const a = bytesToTuples(buf2);
  const b = tuplesToStringTuples(a);
  return stringTuplesToString(b);
}
function stringToBytes(str) {
  str = cleanPath(str);
  const a = stringToStringTuples(str);
  const b = stringTuplesToTuples(a);
  return tuplesToBytes(b);
}
function fromString$2(str) {
  return stringToBytes(str);
}
function fromBytes(buf2) {
  const err = validateBytes(buf2);
  if (err != null) {
    throw err;
  }
  return Uint8Array.from(buf2);
}
function validateBytes(buf2) {
  try {
    bytesToTuples(buf2);
  } catch (err) {
    return err;
  }
}
function cleanPath(str) {
  return "/" + str.trim().split("/").filter((a) => a).join("/");
}
function ParseError(str) {
  return new Error("Error parsing address: " + str);
}
function protoFromTuple(tup) {
  const proto = getProtocol(tup[0]);
  return proto;
}
function equals$6(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var __classPrivateFieldGet$2 = globalThis && globalThis.__classPrivateFieldGet || function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$1 = globalThis && globalThis.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _DefaultMultiaddr_string, _DefaultMultiaddr_tuples, _DefaultMultiaddr_stringTuples, _a;
const inspect = Symbol.for("nodejs.util.inspect.custom");
const DNS_CODES = [
  getProtocol("dns").code,
  getProtocol("dns4").code,
  getProtocol("dns6").code,
  getProtocol("dnsaddr").code
];
const P2P_CODES = [
  getProtocol("p2p").code,
  getProtocol("ipfs").code
];
const resolvers = /* @__PURE__ */ new Map();
const symbol = Symbol.for("@multiformats/js-multiaddr/multiaddr");
function isMultiaddr(value) {
  return Boolean(value == null ? void 0 : value[symbol]);
}
class DefaultMultiaddr {
  constructor(addr) {
    _DefaultMultiaddr_string.set(this, void 0);
    _DefaultMultiaddr_tuples.set(this, void 0);
    _DefaultMultiaddr_stringTuples.set(this, void 0);
    this[_a] = true;
    if (addr == null) {
      addr = "";
    }
    if (addr instanceof Uint8Array) {
      this.bytes = fromBytes(addr);
    } else if (typeof addr === "string") {
      if (addr.length > 0 && addr.charAt(0) !== "/") {
        throw new Error(`multiaddr "${addr}" must start with a "/"`);
      }
      this.bytes = fromString$2(addr);
    } else if (isMultiaddr(addr)) {
      this.bytes = fromBytes(addr.bytes);
    } else {
      throw new Error("addr must be a string, Buffer, or another Multiaddr");
    }
  }
  toString() {
    if (__classPrivateFieldGet$2(this, _DefaultMultiaddr_string, "f") == null) {
      __classPrivateFieldSet$1(this, _DefaultMultiaddr_string, bytesToString(this.bytes), "f");
    }
    return __classPrivateFieldGet$2(this, _DefaultMultiaddr_string, "f");
  }
  toJSON() {
    return this.toString();
  }
  toOptions() {
    const codes2 = this.protoCodes();
    const parts = this.toString().split("/").slice(1);
    let transport;
    let port;
    if (parts.length > 2) {
      if (DNS_CODES.includes(codes2[0]) && P2P_CODES.includes(codes2[1])) {
        transport = getProtocol("tcp").name;
        port = 443;
      } else {
        transport = getProtocol(parts[2]).name;
        port = parseInt(parts[3]);
      }
    } else if (DNS_CODES.includes(codes2[0])) {
      transport = getProtocol("tcp").name;
      port = 443;
    } else {
      throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".');
    }
    const opts = {
      family: codes2[0] === 41 || codes2[0] === 55 ? 6 : 4,
      host: parts[1],
      transport,
      port
    };
    return opts;
  }
  protos() {
    return this.protoCodes().map((code2) => Object.assign({}, getProtocol(code2)));
  }
  protoCodes() {
    const codes2 = [];
    const buf2 = this.bytes;
    let i = 0;
    while (i < buf2.length) {
      const code2 = varint$6.decode(buf2, i);
      const n = varint$6.decode.bytes;
      const p = getProtocol(code2);
      const size = sizeForAddr(p, buf2.slice(i + n));
      i += size + n;
      codes2.push(code2);
    }
    return codes2;
  }
  protoNames() {
    return this.protos().map((proto) => proto.name);
  }
  tuples() {
    if (__classPrivateFieldGet$2(this, _DefaultMultiaddr_tuples, "f") == null) {
      __classPrivateFieldSet$1(this, _DefaultMultiaddr_tuples, bytesToTuples(this.bytes), "f");
    }
    return __classPrivateFieldGet$2(this, _DefaultMultiaddr_tuples, "f");
  }
  stringTuples() {
    if (__classPrivateFieldGet$2(this, _DefaultMultiaddr_stringTuples, "f") == null) {
      __classPrivateFieldSet$1(this, _DefaultMultiaddr_stringTuples, tuplesToStringTuples(this.tuples()), "f");
    }
    return __classPrivateFieldGet$2(this, _DefaultMultiaddr_stringTuples, "f");
  }
  encapsulate(addr) {
    addr = new DefaultMultiaddr(addr);
    return new DefaultMultiaddr(this.toString() + addr.toString());
  }
  decapsulate(addr) {
    const addrString = addr.toString();
    const s = this.toString();
    const i = s.lastIndexOf(addrString);
    if (i < 0) {
      throw new Error(`Address ${this.toString()} does not contain subaddress: ${addr.toString()}`);
    }
    return new DefaultMultiaddr(s.slice(0, i));
  }
  decapsulateCode(code2) {
    const tuples = this.tuples();
    for (let i = tuples.length - 1; i >= 0; i--) {
      if (tuples[i][0] === code2) {
        return new DefaultMultiaddr(tuplesToBytes(tuples.slice(0, i)));
      }
    }
    return this;
  }
  getPeerId() {
    try {
      const tuples = this.stringTuples().filter((tuple2) => {
        if (tuple2[0] === names.ipfs.code) {
          return true;
        }
        return false;
      });
      const tuple = tuples.pop();
      if ((tuple == null ? void 0 : tuple[1]) != null) {
        const peerIdStr = tuple[1];
        if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
          return toString$4(base58btc$8.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString$4(CID$6.parse(peerIdStr).multihash.bytes, "base58btc");
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  getPath() {
    let path = null;
    try {
      path = this.stringTuples().filter((tuple) => {
        const proto = getProtocol(tuple[0]);
        if (proto.path === true) {
          return true;
        }
        return false;
      })[0][1];
      if (path == null) {
        path = null;
      }
    } catch {
      path = null;
    }
    return path;
  }
  equals(addr) {
    return equals$6(this.bytes, addr.bytes);
  }
  async resolve(options) {
    const resolvableProto = this.protos().find((p) => p.resolvable);
    if (resolvableProto == null) {
      return [this];
    }
    const resolver = resolvers.get(resolvableProto.name);
    if (resolver == null) {
      throw errCode(new Error(`no available resolver for ${resolvableProto.name}`), "ERR_NO_AVAILABLE_RESOLVER");
    }
    const addresses = await resolver(this, options);
    return addresses.map((a) => new DefaultMultiaddr(a));
  }
  nodeAddress() {
    const options = this.toOptions();
    if (options.transport !== "tcp" && options.transport !== "udp") {
      throw new Error(`multiaddr must have a valid format - no protocol with name: "${options.transport}". Must have a valid transport protocol: "{tcp, udp}"`);
    }
    return {
      family: options.family,
      address: options.host,
      port: options.port
    };
  }
  isThinWaistAddress(addr) {
    const protos = (addr != null ? addr : this).protos();
    if (protos.length !== 2) {
      return false;
    }
    if (protos[0].code !== 4 && protos[0].code !== 41) {
      return false;
    }
    if (protos[1].code !== 6 && protos[1].code !== 273) {
      return false;
    }
    return true;
  }
  [(_DefaultMultiaddr_string = /* @__PURE__ */ new WeakMap(), _DefaultMultiaddr_tuples = /* @__PURE__ */ new WeakMap(), _DefaultMultiaddr_stringTuples = /* @__PURE__ */ new WeakMap(), _a = symbol, inspect)]() {
    return this.inspect();
  }
  inspect() {
    return "<Multiaddr " + toString$4(this.bytes, "base16") + " - " + bytesToString(this.bytes) + ">";
  }
}
function multiaddr(addr) {
  return new DefaultMultiaddr(addr);
}
$protobuf.util.Long = void 0;
$protobuf.configure();
async function storePeerUnderSingleDatastoreKey(backends, onProgress = () => {
}) {
  onProgress(0, "Storing each peerstore key under a single datastore key");
  await backends.datastore.open();
  const peers = {};
  const keys = [];
  for await (const { key, value } of backends.datastore.query({
    prefix: "/peers"
  })) {
    keys.push(key);
    const keyStr = key.toString();
    const [_, prefix, type, peerId, metadataKey] = keyStr.split("/");
    if (prefix !== "peers") {
      continue;
    }
    if (!["protos", "addrs", "metadata", "keys"].includes(type)) {
      continue;
    }
    if (!peerId) {
      continue;
    }
    peers[peerId] = peers[peerId] || {
      addresses: [],
      protocols: [],
      metadata: []
    };
    if (type === "protos") {
      const protos = Protocols.decode(value);
      peers[peerId].protocols = protos.protocols.sort();
    } else if (type === "addrs") {
      const addrs = Addresses.decode(value);
      peers[peerId].addresses = addrs.addrs.sort((a, b) => {
        return multiaddr(a.multiaddr).toString().localeCompare(multiaddr(b.multiaddr).toString());
      });
      if (addrs.certifiedRecord && addrs.certifiedRecord.raw) {
        peers[peerId].peerRecordEnvelope = addrs.certifiedRecord.raw;
      }
    } else if (type === "metadata") {
      peers[peerId].metadata.push({ key: metadataKey, value });
    } else if (type === "keys") {
      peers[peerId].pubKey = value;
    }
  }
  onProgress(33, "Read peer data from store");
  for (const key of keys) {
    await backends.datastore.delete(key);
  }
  onProgress(66, "Removed existing peer data from store");
  for (const peerId of Object.keys(peers)) {
    const peer = peers[peerId];
    peer.metadata = peer.metadata.sort((a, b) => a.key.localeCompare(b.key));
    const data = Peer.encode(peer).finish();
    await backends.datastore.put(new Key(`/peers/${peerId}`), data);
  }
  await backends.datastore.close();
  onProgress(100, "Stored each peerstore key under a single datastore key");
}
async function storePeerUnderMultipleDatastoreKeys(backends, onProgress = () => {
}) {
  onProgress(0, "Storing each peerstore key under a multiple datastore keys");
  await backends.datastore.open();
  const peers = {};
  const keys = [];
  for await (const { key, value } of backends.datastore.query({
    prefix: "/peers"
  })) {
    keys.push(key);
    const keyStr = key.toString();
    const [_, _prefix, peerId] = keyStr.split("/");
    peers[peerId] = Peer.decode(value);
  }
  onProgress(33, "Read peer data from store");
  for (const key of keys) {
    await backends.datastore.delete(key);
  }
  onProgress(66, "Removed existing peer data from store");
  for (const [peerId, peer] of Object.entries(peers)) {
    if (peer.protocols && peer.protocols.length > 0) {
      await backends.datastore.put(new Key(`/peers/protos/${peerId}`), Protocols.encode({
        protocols: peer.protocols
      }).finish());
    }
    if (peer.addresses && peer.addresses.length > 0) {
      const peerRecordEnvelope = peer.peerRecordEnvelope;
      let certifiedRecord;
      if (peerRecordEnvelope) {
        const envelope = Envelope.decode(peerRecordEnvelope);
        const record = PeerRecord.decode(envelope.payload);
        certifiedRecord = {
          raw: peerRecordEnvelope,
          seq: record.seq
        };
      }
      await backends.datastore.put(new Key(`/peers/addrs/${peerId}`), Addresses.encode({
        addrs: peer.addresses,
        certifiedRecord
      }).finish());
    }
    if (peer.metadata && peer.metadata.length > 0) {
      for (const { key, value } of peer.metadata) {
        await backends.datastore.put(new Key(`/peers/metadata/${peerId}/${key}`), value);
      }
    }
    if (peer.pubKey) {
      await backends.datastore.put(new Key(`/peers/keys/${peerId}`), peer.pubKey);
    }
  }
  await backends.datastore.close();
  onProgress(100, "Stored each peerstore key under multiple datastore keys");
}
const migration = {
  version: 12,
  description: "Store each peerstore peer under a single datastore key",
  migrate: storePeerUnderSingleDatastoreKey,
  revert: storePeerUnderMultipleDatastoreKeys
};
const emptyMigration = {
  description: "Empty migration.",
  migrate: () => {
  },
  revert: () => {
  },
  empty: true
};
const defaultMigrations = [
  Object.assign({ version: 1 }, emptyMigration),
  Object.assign({ version: 2 }, emptyMigration),
  Object.assign({ version: 3 }, emptyMigration),
  Object.assign({ version: 4 }, emptyMigration),
  Object.assign({ version: 5 }, emptyMigration),
  Object.assign({ version: 6 }, emptyMigration),
  Object.assign({ version: 7 }, emptyMigration),
  migration$4,
  migration$3,
  migration$2,
  migration$1,
  migration
];
class NonReversibleMigrationError extends Error {
  constructor(message) {
    super(message);
    this.name = "NonReversibleMigrationError";
    this.code = NonReversibleMigrationError.code;
    this.message = message;
  }
}
NonReversibleMigrationError.code = "ERR_NON_REVERSIBLE_MIGRATION";
class NotInitializedRepoError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotInitializedRepoError";
    this.code = NotInitializedRepoError.code;
    this.message = message;
  }
}
NotInitializedRepoError.code = "ERR_NOT_INITIALIZED_REPO";
class RequiredParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequiredParameterError";
    this.code = RequiredParameterError.code;
    this.message = message;
  }
}
RequiredParameterError.code = "ERR_REQUIRED_PARAMETER";
class InvalidValueError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidValueError";
    this.code = InvalidValueError.code;
    this.message = message;
  }
}
InvalidValueError.code = "ERR_INVALID_VALUE";
class MissingRepoOptionsError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingRepoOptionsError";
    this.code = MissingRepoOptionsError.code;
    this.message = message;
  }
}
MissingRepoOptionsError.code = "ERR_MISSING_REPO_OPTIONS";
const Errors = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NonReversibleMigrationError,
  NotInitializedRepoError,
  RequiredParameterError,
  InvalidValueError,
  MissingRepoOptionsError
}, Symbol.toStringTag, { value: "Module" }));
const log$6 = debug("ipfs:repo:migrator:repo:init");
async function isRepoInitialized(backends) {
  if (!backends) {
    throw new MissingRepoOptionsError("Please pass repo options when trying to open a repo");
  }
  const root = backends.root;
  try {
    await root.open();
    const versionCheck = await root.has(VERSION_KEY);
    const configCheck = await root.has(CONFIG_KEY);
    if (!versionCheck || !configCheck) {
      log$6(`Version entry present: ${versionCheck}`);
      log$6(`Config entry present: ${configCheck}`);
      return false;
    }
    return true;
  } catch (e) {
    log$6("While checking if repo is initialized error was thrown: " + e.message);
    return false;
  } finally {
    if (root !== void 0) {
      try {
        await root.close();
      } catch {
      }
    }
  }
}
async function getVersion(backends) {
  if (!await isRepoInitialized(backends)) {
    throw new NotInitializedRepoError("Repo is not initialized!");
  }
  const store = backends.root;
  await store.open();
  try {
    return parseInt(toString$3(await store.get(VERSION_KEY)));
  } finally {
    await store.close();
  }
}
async function setVersion(version2, backends) {
  if (!backends) {
    throw new MissingRepoOptionsError("Please pass repo options when trying to open a repo");
  }
  const store = backends.root;
  await store.open();
  await store.put(VERSION_KEY, fromString$3(String(version2)));
  await store.close();
}
const log$5 = debug("ipfs:repo:migrator");
function getLatestMigrationVersion(migrations) {
  migrations = migrations || defaultMigrations;
  if (!Array.isArray(migrations) || migrations.length === 0) {
    return 0;
  }
  return migrations[migrations.length - 1].version;
}
async function migrate(path, backends, repoOptions, toVersion, options = {}) {
  var _a2, _b, _c;
  const ignoreLock = (_a2 = options.ignoreLock) != null ? _a2 : false;
  const onProgress = options.onProgress;
  const isDryRun = (_b = options.isDryRun) != null ? _b : false;
  const migrations = (_c = options.migrations) != null ? _c : defaultMigrations;
  if (!path) {
    throw new errors.RequiredParameterError("Path argument is required!");
  }
  if (!repoOptions) {
    throw new errors.RequiredParameterError("repoOptions argument is required!");
  }
  if (!toVersion) {
    throw new errors.RequiredParameterError("toVersion argument is required!");
  }
  if (!Number.isInteger(toVersion) || toVersion <= 0) {
    throw new errors.InvalidValueError("Version has to be positive integer!");
  }
  backends = wrapBackends(backends);
  const currentVersion = await getVersion(backends);
  if (currentVersion === toVersion) {
    log$5("Nothing to migrate.");
    return;
  }
  if (currentVersion > toVersion) {
    throw new errors.InvalidValueError(`Current repo's version (${currentVersion}) is higher then toVersion (${toVersion}), you probably wanted to revert it?`);
  }
  verifyAvailableMigrations(migrations, currentVersion, toVersion);
  let lock2;
  if (!isDryRun && !ignoreLock) {
    lock2 = await repoOptions.repoLock.lock(path);
  }
  try {
    for (const migration2 of migrations) {
      if (toVersion !== void 0 && migration2.version > toVersion) {
        break;
      }
      if (migration2.version <= currentVersion) {
        continue;
      }
      log$5(`Migrating version ${migration2.version}`);
      try {
        if (!isDryRun) {
          let progressCallback = () => {
          };
          if (onProgress) {
            progressCallback = (percent, message) => onProgress(migration2.version, percent.toFixed(2), message);
          }
          await migration2.migrate(backends, progressCallback);
        }
      } catch (e) {
        const lastSuccessfullyMigratedVersion = migration2.version - 1;
        log$5(`An exception was raised during execution of migration. Setting the repo's version to last successfully migrated version: ${lastSuccessfullyMigratedVersion}`);
        await setVersion(lastSuccessfullyMigratedVersion, backends);
        throw new Error(`During migration to version ${migration2.version} exception was raised: ${e.stack || e.message || e}`);
      }
      log$5(`Migrating to version ${migration2.version} finished`);
    }
    if (!isDryRun) {
      await setVersion(toVersion || getLatestMigrationVersion(migrations), backends);
    }
    log$5("Repo successfully migrated", toVersion !== void 0 ? `to version ${toVersion}!` : "to latest version!");
  } finally {
    if (!isDryRun && !ignoreLock && lock2) {
      await lock2.close();
    }
  }
}
async function revert(path, backends, repoOptions, toVersion, options = {}) {
  var _a2, _b, _c;
  const ignoreLock = (_a2 = options.ignoreLock) != null ? _a2 : false;
  const onProgress = options.onProgress;
  const isDryRun = (_b = options.isDryRun) != null ? _b : false;
  const migrations = (_c = options.migrations) != null ? _c : defaultMigrations;
  if (!path) {
    throw new errors.RequiredParameterError("Path argument is required!");
  }
  if (!repoOptions) {
    throw new errors.RequiredParameterError("repoOptions argument is required!");
  }
  if (!toVersion) {
    throw new errors.RequiredParameterError("When reverting migrations, you have to specify to which version to revert!");
  }
  if (!Number.isInteger(toVersion) || toVersion <= 0) {
    throw new errors.InvalidValueError("Version has to be positive integer!");
  }
  backends = wrapBackends(backends);
  const currentVersion = await getVersion(backends);
  if (currentVersion === toVersion) {
    log$5("Nothing to revert.");
    return;
  }
  if (currentVersion < toVersion) {
    throw new errors.InvalidValueError(`Current repo's version (${currentVersion}) is lower then toVersion (${toVersion}), you probably wanted to migrate it?`);
  }
  verifyAvailableMigrations(migrations, toVersion, currentVersion, true);
  let lock2;
  if (!isDryRun && !ignoreLock) {
    lock2 = await repoOptions.repoLock.lock(path);
  }
  log$5(`Reverting from version ${currentVersion} to ${toVersion}`);
  try {
    const reversedMigrationArray = migrations.slice().reverse();
    for (const migration2 of reversedMigrationArray) {
      if (migration2.version <= toVersion) {
        break;
      }
      if (migration2.version > currentVersion) {
        continue;
      }
      log$5(`Reverting migration version ${migration2.version}`);
      try {
        if (!isDryRun) {
          let progressCallback = () => {
          };
          if (onProgress) {
            progressCallback = (percent, message) => onProgress(migration2.version, percent.toFixed(2), message);
          }
          await migration2.revert(backends, progressCallback);
        }
      } catch (e) {
        const lastSuccessfullyRevertedVersion = migration2.version;
        log$5(`An exception was raised during execution of migration. Setting the repo's version to last successfully reverted version: ${lastSuccessfullyRevertedVersion}`);
        await setVersion(lastSuccessfullyRevertedVersion, backends);
        e.message = `During reversion to version ${migration2.version} exception was raised: ${e.message}`;
        throw e;
      }
      log$5(`Reverting to version ${migration2.version} finished`);
    }
    if (!isDryRun) {
      await setVersion(toVersion, backends);
    }
    log$5(`All migrations successfully reverted to version ${toVersion}!`);
  } finally {
    if (!isDryRun && !ignoreLock && lock2) {
      await lock2.close();
    }
  }
}
function verifyAvailableMigrations(migrations, fromVersion, toVersion, checkReversibility = false) {
  let migrationCounter = 0;
  for (const migration2 of migrations) {
    if (migration2.version > toVersion) {
      break;
    }
    if (migration2.version > fromVersion) {
      if (checkReversibility && !migration2.revert) {
        throw new errors.NonReversibleMigrationError(`It is not possible to revert to version ${fromVersion} because migration version ${migration2.version} is not reversible. Cancelling reversion.`);
      }
      migrationCounter++;
    }
  }
  if (migrationCounter !== toVersion - fromVersion) {
    throw new errors.InvalidValueError(`The ipfs-repo-migrations package does not have all migration to migrate from version ${fromVersion} to ${toVersion}`);
  }
}
const errors = Errors;
var bytes$1 = { exports: {} };
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */
bytes$1.exports = bytes;
bytes$1.exports.format = format;
bytes$1.exports.parse = parse;
var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;
var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;
var map$1 = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
};
var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function bytes(value, options) {
  if (typeof value === "string") {
    return parse(value);
  }
  if (typeof value === "number") {
    return format(value, options);
  }
  return null;
}
function format(value, options) {
  if (!Number.isFinite(value)) {
    return null;
  }
  var mag = Math.abs(value);
  var thousandsSeparator = options && options.thousandsSeparator || "";
  var unitSeparator = options && options.unitSeparator || "";
  var decimalPlaces = options && options.decimalPlaces !== void 0 ? options.decimalPlaces : 2;
  var fixedDecimals = Boolean(options && options.fixedDecimals);
  var unit = options && options.unit || "";
  if (!unit || !map$1[unit.toLowerCase()]) {
    if (mag >= map$1.pb) {
      unit = "PB";
    } else if (mag >= map$1.tb) {
      unit = "TB";
    } else if (mag >= map$1.gb) {
      unit = "GB";
    } else if (mag >= map$1.mb) {
      unit = "MB";
    } else if (mag >= map$1.kb) {
      unit = "KB";
    } else {
      unit = "B";
    }
  }
  var val = value / map$1[unit.toLowerCase()];
  var str = val.toFixed(decimalPlaces);
  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, "$1");
  }
  if (thousandsSeparator) {
    str = str.split(".").map(function(s, i) {
      return i === 0 ? s.replace(formatThousandsRegExp, thousandsSeparator) : s;
    }).join(".");
  }
  return str + unitSeparator + unit;
}
function parse(val) {
  if (typeof val === "number" && !isNaN(val)) {
    return val;
  }
  if (typeof val !== "string") {
    return null;
  }
  var results = parseRegExp.exec(val);
  var floatValue;
  var unit = "b";
  if (!results) {
    floatValue = parseInt(val, 10);
    unit = "b";
  } else {
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }
  if (isNaN(floatValue)) {
    return null;
  }
  return Math.floor(map$1[unit] * floatValue);
}
var isPlainObj = (value) => {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};
const isOptionObject = isPlainObj;
const { hasOwnProperty: hasOwnProperty$1 } = Object.prototype;
const { propertyIsEnumerable } = Object;
const defineProperty = (object, name2, value) => Object.defineProperty(object, name2, {
  value,
  writable: true,
  enumerable: true,
  configurable: true
});
const globalThis$1 = commonjsGlobal;
const defaultMergeOptions = {
  concatArrays: false,
  ignoreUndefined: false
};
const getEnumerableOwnPropertyKeys = (value) => {
  const keys = [];
  for (const key in value) {
    if (hasOwnProperty$1.call(value, key)) {
      keys.push(key);
    }
  }
  if (Object.getOwnPropertySymbols) {
    const symbols = Object.getOwnPropertySymbols(value);
    for (const symbol2 of symbols) {
      if (propertyIsEnumerable.call(value, symbol2)) {
        keys.push(symbol2);
      }
    }
  }
  return keys;
};
function clone(value) {
  if (Array.isArray(value)) {
    return cloneArray(value);
  }
  if (isOptionObject(value)) {
    return cloneOptionObject(value);
  }
  return value;
}
function cloneArray(array) {
  const result = array.slice(0, 0);
  getEnumerableOwnPropertyKeys(array).forEach((key) => {
    defineProperty(result, key, clone(array[key]));
  });
  return result;
}
function cloneOptionObject(object) {
  const result = Object.getPrototypeOf(object) === null ? /* @__PURE__ */ Object.create(null) : {};
  getEnumerableOwnPropertyKeys(object).forEach((key) => {
    defineProperty(result, key, clone(object[key]));
  });
  return result;
}
const mergeKeys = (merged, source, keys, config2) => {
  keys.forEach((key) => {
    if (typeof source[key] === "undefined" && config2.ignoreUndefined) {
      return;
    }
    if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
      defineProperty(merged, key, merge$1(merged[key], source[key], config2));
    } else {
      defineProperty(merged, key, clone(source[key]));
    }
  });
  return merged;
};
const concatArrays = (merged, source, config2) => {
  let result = merged.slice(0, 0);
  let resultIndex = 0;
  [merged, source].forEach((array) => {
    const indices = [];
    for (let k = 0; k < array.length; k++) {
      if (!hasOwnProperty$1.call(array, k)) {
        continue;
      }
      indices.push(String(k));
      if (array === merged) {
        defineProperty(result, resultIndex++, array[k]);
      } else {
        defineProperty(result, resultIndex++, clone(array[k]));
      }
    }
    result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter((key) => !indices.includes(key)), config2);
  });
  return result;
};
function merge$1(merged, source, config2) {
  if (config2.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
    return concatArrays(merged, source, config2);
  }
  if (!isOptionObject(source) || !isOptionObject(merged)) {
    return clone(source);
  }
  return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config2);
}
var mergeOptions = function(...options) {
  const config2 = merge$1(clone(defaultMergeOptions), this !== globalThis$1 && this || {}, defaultMergeOptions);
  let merged = { _: {} };
  for (const option of options) {
    if (option === void 0) {
      continue;
    }
    if (!isOptionObject(option)) {
      throw new TypeError("`" + option + "` is not an Option Object");
    }
    merged = merge$1(merged, { _: option }, config2);
  }
  return merged._;
};
const repoVersion = 12;
function base$3(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$3 = base$3;
var _brrp__multiformats_scope_baseX$3 = src$3;
const equals$5 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$3 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const fromString$1 = (str) => new TextEncoder().encode(str);
const toString$1 = (b) => new TextDecoder().decode(b);
class Encoder$3 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$3 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$3(this, decoder);
  }
}
class ComposedDecoder$3 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$3(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$3 = (left, right) => new ComposedDecoder$3({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$3 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$3(name2, prefix, baseEncode);
    this.decoder = new Decoder$3(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$5 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$3(name2, prefix, encode2, decode2);
const baseX$3 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$3(alphabet2, name2);
  return from$5({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$3(decode2(text))
  });
};
const decode$c = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$9 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$3 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$5({
    prefix,
    name: name2,
    encode(input) {
      return encode$9(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$c(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const identity$3 = from$5({
  prefix: "\0",
  name: "identity",
  encode: (buf2) => toString$1(buf2),
  decode: (str) => fromString$1(str)
});
const identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$3
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648$3({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648$3({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX$3({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648$3({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648$3({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
const base16$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16,
  base16upper
}, Symbol.toStringTag, { value: "Module" }));
const base32$3 = rfc4648$3({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648$3({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad$1 = rfc4648$3({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648$3({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648$3({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648$3({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648$3({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648$3({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648$3({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: base32$3,
  base32upper,
  base32pad: base32pad$1,
  base32padupper,
  base32hex,
  base32hexupper,
  base32hexpad,
  base32hexpadupper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
const base36 = baseX$3({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX$3({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base58btc$3 = baseX$3({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX$3({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: base58btc$3,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base64$1 = rfc4648$3({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648$3({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url$1 = rfc4648$3({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad = rfc4648$3({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: base64$1,
  base64pad,
  base64url: base64url$1,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
const alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
const alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode$8(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode$b(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji = from$5({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode$8,
  decode: decode$b
});
const base256emoji$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji
}, Symbol.toStringTag, { value: "Module" }));
var encode_1$1 = encode$7;
var MSB$2 = 128, REST$2 = 127, MSBALL$1 = ~REST$2, INT$1 = Math.pow(2, 31);
function encode$7(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$1) {
    out[offset++] = num & 255 | MSB$2;
    num /= 128;
  }
  while (num & MSBALL$1) {
    out[offset++] = num & 255 | MSB$2;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$7.bytes = offset - oldOffset + 1;
  return out;
}
var decode$a = read$1;
var MSB$1$1 = 128, REST$1$1 = 127;
function read$1(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read$1.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1$1) << shift : (b & REST$1$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1$1);
  read$1.bytes = counter - offset;
  return res;
}
var N1$1 = Math.pow(2, 7);
var N2$1 = Math.pow(2, 14);
var N3$1 = Math.pow(2, 21);
var N4$1 = Math.pow(2, 28);
var N5$1 = Math.pow(2, 35);
var N6$1 = Math.pow(2, 42);
var N7$1 = Math.pow(2, 49);
var N8$1 = Math.pow(2, 56);
var N9$1 = Math.pow(2, 63);
var length$1 = function(value) {
  return value < N1$1 ? 1 : value < N2$1 ? 2 : value < N3$1 ? 3 : value < N4$1 ? 4 : value < N5$1 ? 5 : value < N6$1 ? 6 : value < N7$1 ? 7 : value < N8$1 ? 8 : value < N9$1 ? 9 : 10;
};
var varint$1 = {
  encode: encode_1$1,
  decode: decode$a,
  encodingLength: length$1
};
var _brrp_varint$1 = varint$1;
const decode$9 = (data, offset = 0) => {
  const code2 = _brrp_varint$1.decode(data, offset);
  return [
    code2,
    _brrp_varint$1.decode.bytes
  ];
};
const encodeTo$1 = (int, target, offset = 0) => {
  _brrp_varint$1.encode(int, target, offset);
  return target;
};
const encodingLength$1 = (int) => {
  return _brrp_varint$1.encodingLength(int);
};
const create$1 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$1(code2);
  const digestOffset = sizeOffset + encodingLength$1(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo$1(code2, bytes2, 0);
  encodeTo$1(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest$1(code2, size, digest2, bytes2);
};
const decode$8 = (multihash) => {
  const bytes2 = coerce$3(multihash);
  const [code2, sizeOffset] = decode$9(bytes2);
  const [size, digestOffset] = decode$9(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$1(code2, size, digest2, bytes2);
};
const equals$4 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$5(a.bytes, b.bytes);
  }
};
class Digest$1 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
}
const from$4 = ({ name: name2, code: code2, encode: encode2 }) => new Hasher(name2, code2, encode2);
class Hasher {
  constructor(name2, code2, encode2) {
    this.name = name2;
    this.code = code2;
    this.encode = encode2;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create$1(this.code, result) : result.then((digest2) => create$1(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256 = from$4({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
const sha512 = from$4({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});
const sha2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256,
  sha512
}, Symbol.toStringTag, { value: "Module" }));
const code$1 = 0;
const name$1 = "identity";
const encode$6 = coerce$3;
const digest = (input) => create$1(code$1, encode$6(input));
const identity$1 = {
  code: code$1,
  name: name$1,
  encode: encode$6,
  digest
};
const identity$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$1
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
class CID$1 {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$1,
      byteLength: hidden$1,
      code: readonly$2,
      version: readonly$2,
      multihash: readonly$2,
      bytes: readonly$2,
      _baseCache: hidden$1,
      asCID: hidden$1
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$1) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$1) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$1.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$1(code2, digest2);
        return CID$1.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$4(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$1(bytes2, _baseCache, base3 || base58btc$3.encoder);
      default:
        return toStringV1$1(bytes2, _baseCache, base3 || base32$3.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$1(/^0\.0/, IS_CID_DEPRECATION$1);
    return !!(value && (value[cidSymbol$1] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$1) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID$1(version2, code2, multihash, bytes2 || encodeCID$1(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$1] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$8(multihash);
      return CID$1.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$1) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$1}) block encoding`);
        } else {
          return new CID$1(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID$1(version2, code2, digest2.bytes);
        return new CID$1(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$1.create(0, DAG_PB_CODE$1, digest2);
  }
  static createV1(code2, digest2) {
    return CID$1.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID$1.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID$1.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$3(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$1(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$1.createV0(digest2) : CID$1.createV1(specs.codec, digest2);
    return [
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$9(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$1;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes$1(source, base3);
    const cid = CID$1.decode(bytes2);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$1 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$3;
      return [
        base58btc$3.prefix,
        decoder.decode(`${base58btc$3.prefix}${source}`)
      ];
    }
    case base58btc$3.prefix: {
      const decoder = base3 || base58btc$3;
      return [
        base58btc$3.prefix,
        decoder.decode(source)
      ];
    }
    case base32$3.prefix: {
      const decoder = base3 || base32$3;
      return [
        base32$3.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$1 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$3.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$1 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$1 = 112;
const SHA_256_CODE$1 = 18;
const encodeCID$1 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$1(version2);
  const hashOffset = codeOffset + encodingLength$1(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$1(version2, bytes2, 0);
  encodeTo$1(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
const cidSymbol$1 = Symbol.for("@ipld/js-cid/CID");
const readonly$2 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$1 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$2 = "0.0.0-dev";
const deprecate$1 = (range, message) => {
  if (range.test(version$2)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$1 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const bases = {
  ...identityBase,
  ...base2$1,
  ...base8$1,
  ...base10$1,
  ...base16$1,
  ...base32$4,
  ...base36$1,
  ...base58,
  ...base64$2,
  ...base256emoji$1
};
({
  ...sha2,
  ...identity$2
});
function asUint8Array(buf2) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength);
  }
  return buf2;
}
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}
function createCodec(name2, prefix, encode2, decode2) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode2
    },
    decoder: { decode: decode2 }
  };
}
const string = createCodec("utf8", "u", (buf2) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf2);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf2) => {
  let string2 = "a";
  for (let i = 0; i < buf2.length; i++) {
    string2 += String.fromCharCode(buf2[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf2 = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf2[i] = str.charCodeAt(i);
  }
  return buf2;
});
const BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
function toString(array, encoding2 = "utf8") {
  const base3 = BASES[encoding2];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding2}"`);
  }
  if ((encoding2 === "utf8" || encoding2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
function fromString(string2, encoding2 = "utf8") {
  const base3 = BASES[encoding2];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding2}"`);
  }
  if ((encoding2 === "utf8" || encoding2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
class LockExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "LockExistsError";
    this.code = LockExistsError.code;
  }
}
LockExistsError.code = "ERR_LOCK_EXISTS";
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.code = NotFoundError.code;
  }
}
NotFoundError.code = "ERR_NOT_FOUND";
class InvalidRepoVersionError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidRepoVersionError";
    this.code = InvalidRepoVersionError.code;
  }
}
InvalidRepoVersionError.code = "ERR_INVALID_REPO_VERSION";
const ERR_REPO_NOT_INITIALIZED = "ERR_REPO_NOT_INITIALIZED";
const ERR_REPO_ALREADY_OPEN = "ERR_REPO_ALREADY_OPEN";
const ERR_REPO_ALREADY_CLOSED = "ERR_REPO_ALREADY_CLOSED";
async function hasWithFallback(key, has, store) {
  const result = await has(key);
  if (result) {
    return result;
  }
  const levelJs = findLevelJs(store);
  if (!levelJs) {
    return false;
  }
  return new Promise((resolve, reject) => {
    const req = levelJs.store("readonly").get(key.toString());
    req.transaction.onabort = () => {
      reject(req.transaction.error);
    };
    req.transaction.oncomplete = () => {
      resolve(Boolean(req.result));
    };
  });
}
async function getWithFallback(key, get2, has, store) {
  if (await has(key)) {
    return get2(key);
  }
  const levelJs = findLevelJs(store);
  if (!levelJs) {
    throw new NotFoundError();
  }
  return new Promise((resolve, reject) => {
    const req = levelJs.store("readonly").get(key.toString());
    req.transaction.onabort = () => {
      reject(req.transaction.error);
    };
    req.transaction.oncomplete = () => {
      if (req.result) {
        return resolve(req.result);
      }
      reject(new NotFoundError());
    };
  });
}
function findLevelJs(store) {
  let db = store;
  while (db.db || db.child) {
    db = db.db || db.child;
    if (db.type === "level-js" || db.constructor.name === "Level") {
      return db;
    }
  }
}
const log$4 = debug("ipfs:repo:version");
const versionKey = new Key("version");
function version$1(store) {
  return {
    async exists() {
      return hasWithFallback(versionKey, store.has.bind(store), store);
    },
    async get() {
      const buf2 = await getWithFallback(versionKey, store.get.bind(store), store.has.bind(store), store);
      return parseInt(toString(buf2), 10);
    },
    set(version2) {
      return store.put(versionKey, fromString(String(version2)));
    },
    async check(expected) {
      const version2 = await this.get();
      log$4("comparing version: %s and %s", version2, expected);
      const compatibleVersion = version2 === 6 && expected === 7 || expected === 6 && version2 === 7;
      return version2 === expected || compatibleVersion;
    }
  };
}
var eventemitter3 = { exports: {} };
(function(module) {
  var has = Object.prototype.hasOwnProperty, prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = /* @__PURE__ */ Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events();
    else
      delete emitter._events[evt];
  }
  function EventEmitter2() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    var names2 = [], events2, name2;
    if (this._eventsCount === 0)
      return names2;
    for (name2 in events2 = this._events) {
      if (has.call(events2, name2))
        names2.push(prefix ? name2.slice(1) : name2);
    }
    if (Object.getOwnPropertySymbols) {
      return names2.concat(Object.getOwnPropertySymbols(events2));
    }
    return names2;
  };
  EventEmitter2.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter2.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter2.prototype.emit = function emit2(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length2 = listeners.length, j;
      for (i = 0; i < length2; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter2.prototype.on = function on2(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter2.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events2 = [], length2 = listeners.length; i < length2; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events2.push(listeners[i]);
        }
      }
      if (events2.length)
        this._events[evt] = events2.length === 1 ? events2[0] : events2;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
  EventEmitter2.prefixed = prefix;
  EventEmitter2.EventEmitter = EventEmitter2;
  {
    module.exports = EventEmitter2;
  }
})(eventemitter3);
const EventEmitter$1 = eventemitter3.exports;
class TimeoutError$1 extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}
class AbortError$2 extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
}
const getDOMException$1 = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError$2(errorMessage) : new DOMException(errorMessage);
const getAbortedReason$1 = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException$1("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException$1(reason);
};
function pTimeout$1(promise2, milliseconds, fallback, options) {
  let timer;
  const cancelablePromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve(promise2);
      return;
    }
    options = {
      customTimers: { setTimeout, clearTimeout },
      ...options
    };
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason$1(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason$1(signal));
      });
    }
    timer = options.customTimers.setTimeout.call(void 0, () => {
      if (typeof fallback === "function") {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
      const timeoutError2 = fallback instanceof Error ? fallback : new TimeoutError$1(message);
      if (typeof promise2.cancel === "function") {
        promise2.cancel();
      }
      reject(timeoutError2);
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise2);
      } catch (error) {
        reject(error);
      } finally {
        options.customTimers.clearTimeout.call(void 0, timer);
      }
    })();
  });
  cancelablePromise.clear = () => {
    clearTimeout(timer);
    timer = void 0;
  };
  return cancelablePromise;
}
function lowerBound(array, value, comparator) {
  let first2 = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first2 + step;
    if (comparator(array[it], value) <= 0) {
      first2 = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first2;
}
var __classPrivateFieldGet$1 = globalThis && globalThis.__classPrivateFieldGet || function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PriorityQueue_queue;
class PriorityQueue {
  constructor() {
    _PriorityQueue_queue.set(this, []);
  }
  enqueue(run, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run
    };
    if (this.size && __classPrivateFieldGet$1(this, _PriorityQueue_queue, "f")[this.size - 1].priority >= options.priority) {
      __classPrivateFieldGet$1(this, _PriorityQueue_queue, "f").push(element);
      return;
    }
    const index = lowerBound(__classPrivateFieldGet$1(this, _PriorityQueue_queue, "f"), element, (a, b) => b.priority - a.priority);
    __classPrivateFieldGet$1(this, _PriorityQueue_queue, "f").splice(index, 0, element);
  }
  dequeue() {
    const item = __classPrivateFieldGet$1(this, _PriorityQueue_queue, "f").shift();
    return item === null || item === void 0 ? void 0 : item.run;
  }
  filter(options) {
    return __classPrivateFieldGet$1(this, _PriorityQueue_queue, "f").filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __classPrivateFieldGet$1(this, _PriorityQueue_queue, "f").length;
  }
}
_PriorityQueue_queue = /* @__PURE__ */ new WeakMap();
var __classPrivateFieldSet = globalThis && globalThis.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = globalThis && globalThis.__classPrivateFieldGet || function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PQueue_instances, _PQueue_carryoverConcurrencyCount, _PQueue_isIntervalIgnored, _PQueue_intervalCount, _PQueue_intervalCap, _PQueue_interval, _PQueue_intervalEnd, _PQueue_intervalId, _PQueue_timeoutId, _PQueue_queue, _PQueue_queueClass, _PQueue_pendingCount, _PQueue_concurrency, _PQueue_isPaused, _PQueue_throwOnTimeout, _PQueue_doesIntervalAllowAnother_get, _PQueue_doesConcurrentAllowAnother_get, _PQueue_next, _PQueue_emitEvents, _PQueue_onResumeInterval, _PQueue_isIntervalPaused_get, _PQueue_tryToStartAnother, _PQueue_initializeIntervalIfNeeded, _PQueue_onInterval, _PQueue_processQueue, _PQueue_onEvent;
const timeoutError = new TimeoutError$1();
class AbortError$1 extends Error {
}
class PQueue extends EventEmitter$1 {
  constructor(options) {
    var _a2, _b, _c, _d;
    super();
    _PQueue_instances.add(this);
    _PQueue_carryoverConcurrencyCount.set(this, void 0);
    _PQueue_isIntervalIgnored.set(this, void 0);
    _PQueue_intervalCount.set(this, 0);
    _PQueue_intervalCap.set(this, void 0);
    _PQueue_interval.set(this, void 0);
    _PQueue_intervalEnd.set(this, 0);
    _PQueue_intervalId.set(this, void 0);
    _PQueue_timeoutId.set(this, void 0);
    _PQueue_queue.set(this, void 0);
    _PQueue_queueClass.set(this, void 0);
    _PQueue_pendingCount.set(this, 0);
    _PQueue_concurrency.set(this, void 0);
    _PQueue_isPaused.set(this, void 0);
    _PQueue_throwOnTimeout.set(this, void 0);
    Object.defineProperty(this, "timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: PriorityQueue,
      ...options
    };
    if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a2 = options.intervalCap) === null || _a2 === void 0 ? void 0 : _a2.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
    }
    __classPrivateFieldSet(this, _PQueue_carryoverConcurrencyCount, options.carryoverConcurrencyCount, "f");
    __classPrivateFieldSet(this, _PQueue_isIntervalIgnored, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0, "f");
    __classPrivateFieldSet(this, _PQueue_intervalCap, options.intervalCap, "f");
    __classPrivateFieldSet(this, _PQueue_interval, options.interval, "f");
    __classPrivateFieldSet(this, _PQueue_queue, new options.queueClass(), "f");
    __classPrivateFieldSet(this, _PQueue_queueClass, options.queueClass, "f");
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    __classPrivateFieldSet(this, _PQueue_throwOnTimeout, options.throwOnTimeout === true, "f");
    __classPrivateFieldSet(this, _PQueue_isPaused, options.autoStart === false, "f");
  }
  get concurrency() {
    return __classPrivateFieldGet(this, _PQueue_concurrency, "f");
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    __classPrivateFieldSet(this, _PQueue_concurrency, newConcurrency, "f");
    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
  }
  async add(fn, options = {}) {
    return new Promise((resolve, reject) => {
      const run = async () => {
        var _a2;
        var _b, _c;
        __classPrivateFieldSet(this, _PQueue_pendingCount, (_b = __classPrivateFieldGet(this, _PQueue_pendingCount, "f"), _b++, _b), "f");
        __classPrivateFieldSet(this, _PQueue_intervalCount, (_c = __classPrivateFieldGet(this, _PQueue_intervalCount, "f"), _c++, _c), "f");
        try {
          if ((_a2 = options.signal) === null || _a2 === void 0 ? void 0 : _a2.aborted) {
            reject(new AbortError$1("The task was aborted."));
            return;
          }
          const operation = this.timeout === void 0 && options.timeout === void 0 ? fn({ signal: options.signal }) : pTimeout$1(Promise.resolve(fn({ signal: options.signal })), options.timeout === void 0 ? this.timeout : options.timeout, () => {
            if (options.throwOnTimeout === void 0 ? __classPrivateFieldGet(this, _PQueue_throwOnTimeout, "f") : options.throwOnTimeout) {
              reject(timeoutError);
            }
            return void 0;
          });
          const result = await operation;
          resolve(result);
          this.emit("completed", result);
        } catch (error) {
          reject(error);
          this.emit("error", error);
        }
        __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_next).call(this);
      };
      __classPrivateFieldGet(this, _PQueue_queue, "f").enqueue(run, options);
      __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
      this.emit("add");
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  start() {
    if (!__classPrivateFieldGet(this, _PQueue_isPaused, "f")) {
      return this;
    }
    __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
    return this;
  }
  pause() {
    __classPrivateFieldSet(this, _PQueue_isPaused, true, "f");
  }
  clear() {
    __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet(this, _PQueue_queueClass, "f"))(), "f");
  }
  async onEmpty() {
    if (__classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "empty");
  }
  async onSizeLessThan(limit) {
    if (__classPrivateFieldGet(this, _PQueue_queue, "f").size < limit) {
      return;
    }
    await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "next", () => __classPrivateFieldGet(this, _PQueue_queue, "f").size < limit);
  }
  async onIdle() {
    if (__classPrivateFieldGet(this, _PQueue_pendingCount, "f") === 0 && __classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "idle");
  }
  get size() {
    return __classPrivateFieldGet(this, _PQueue_queue, "f").size;
  }
  sizeBy(options) {
    return __classPrivateFieldGet(this, _PQueue_queue, "f").filter(options).length;
  }
  get pending() {
    return __classPrivateFieldGet(this, _PQueue_pendingCount, "f");
  }
  get isPaused() {
    return __classPrivateFieldGet(this, _PQueue_isPaused, "f");
  }
}
_PQueue_carryoverConcurrencyCount = /* @__PURE__ */ new WeakMap(), _PQueue_isIntervalIgnored = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCount = /* @__PURE__ */ new WeakMap(), _PQueue_intervalCap = /* @__PURE__ */ new WeakMap(), _PQueue_interval = /* @__PURE__ */ new WeakMap(), _PQueue_intervalEnd = /* @__PURE__ */ new WeakMap(), _PQueue_intervalId = /* @__PURE__ */ new WeakMap(), _PQueue_timeoutId = /* @__PURE__ */ new WeakMap(), _PQueue_queue = /* @__PURE__ */ new WeakMap(), _PQueue_queueClass = /* @__PURE__ */ new WeakMap(), _PQueue_pendingCount = /* @__PURE__ */ new WeakMap(), _PQueue_concurrency = /* @__PURE__ */ new WeakMap(), _PQueue_isPaused = /* @__PURE__ */ new WeakMap(), _PQueue_throwOnTimeout = /* @__PURE__ */ new WeakMap(), _PQueue_instances = /* @__PURE__ */ new WeakSet(), _PQueue_doesIntervalAllowAnother_get = function _PQueue_doesIntervalAllowAnother_get2() {
  return __classPrivateFieldGet(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet(this, _PQueue_intervalCount, "f") < __classPrivateFieldGet(this, _PQueue_intervalCap, "f");
}, _PQueue_doesConcurrentAllowAnother_get = function _PQueue_doesConcurrentAllowAnother_get2() {
  return __classPrivateFieldGet(this, _PQueue_pendingCount, "f") < __classPrivateFieldGet(this, _PQueue_concurrency, "f");
}, _PQueue_next = function _PQueue_next2() {
  var _a2;
  __classPrivateFieldSet(this, _PQueue_pendingCount, (_a2 = __classPrivateFieldGet(this, _PQueue_pendingCount, "f"), _a2--, _a2), "f");
  __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this);
  this.emit("next");
}, _PQueue_emitEvents = function _PQueue_emitEvents2() {
  this.emit("empty");
  if (__classPrivateFieldGet(this, _PQueue_pendingCount, "f") === 0) {
    this.emit("idle");
  }
}, _PQueue_onResumeInterval = function _PQueue_onResumeInterval2() {
  __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
  __classPrivateFieldSet(this, _PQueue_timeoutId, void 0, "f");
}, _PQueue_isIntervalPaused_get = function _PQueue_isIntervalPaused_get2() {
  const now = Date.now();
  if (__classPrivateFieldGet(this, _PQueue_intervalId, "f") === void 0) {
    const delay = __classPrivateFieldGet(this, _PQueue_intervalEnd, "f") - now;
    if (delay < 0) {
      __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet(this, _PQueue_pendingCount, "f") : 0, "f");
    } else {
      if (__classPrivateFieldGet(this, _PQueue_timeoutId, "f") === void 0) {
        __classPrivateFieldSet(this, _PQueue_timeoutId, setTimeout(() => {
          __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onResumeInterval).call(this);
        }, delay), "f");
      }
      return true;
    }
  }
  return false;
}, _PQueue_tryToStartAnother = function _PQueue_tryToStartAnother2() {
  if (__classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
    if (__classPrivateFieldGet(this, _PQueue_intervalId, "f")) {
      clearInterval(__classPrivateFieldGet(this, _PQueue_intervalId, "f"));
    }
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_emitEvents).call(this);
    return false;
  }
  if (!__classPrivateFieldGet(this, _PQueue_isPaused, "f")) {
    const canInitializeInterval = !__classPrivateFieldGet(this, _PQueue_instances, "a", _PQueue_isIntervalPaused_get);
    if (__classPrivateFieldGet(this, _PQueue_instances, "a", _PQueue_doesIntervalAllowAnother_get) && __classPrivateFieldGet(this, _PQueue_instances, "a", _PQueue_doesConcurrentAllowAnother_get)) {
      const job = __classPrivateFieldGet(this, _PQueue_queue, "f").dequeue();
      if (!job) {
        return false;
      }
      this.emit("active");
      job();
      if (canInitializeInterval) {
        __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_initializeIntervalIfNeeded).call(this);
      }
      return true;
    }
  }
  return false;
}, _PQueue_initializeIntervalIfNeeded = function _PQueue_initializeIntervalIfNeeded2() {
  if (__classPrivateFieldGet(this, _PQueue_isIntervalIgnored, "f") || __classPrivateFieldGet(this, _PQueue_intervalId, "f") !== void 0) {
    return;
  }
  __classPrivateFieldSet(this, _PQueue_intervalId, setInterval(() => {
    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onInterval).call(this);
  }, __classPrivateFieldGet(this, _PQueue_interval, "f")), "f");
  __classPrivateFieldSet(this, _PQueue_intervalEnd, Date.now() + __classPrivateFieldGet(this, _PQueue_interval, "f"), "f");
}, _PQueue_onInterval = function _PQueue_onInterval2() {
  if (__classPrivateFieldGet(this, _PQueue_intervalCount, "f") === 0 && __classPrivateFieldGet(this, _PQueue_pendingCount, "f") === 0 && __classPrivateFieldGet(this, _PQueue_intervalId, "f")) {
    clearInterval(__classPrivateFieldGet(this, _PQueue_intervalId, "f"));
    __classPrivateFieldSet(this, _PQueue_intervalId, void 0, "f");
  }
  __classPrivateFieldSet(this, _PQueue_intervalCount, __classPrivateFieldGet(this, _PQueue_carryoverConcurrencyCount, "f") ? __classPrivateFieldGet(this, _PQueue_pendingCount, "f") : 0, "f");
  __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
}, _PQueue_processQueue = function _PQueue_processQueue2() {
  while (__classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_tryToStartAnother).call(this)) {
  }
}, _PQueue_onEvent = async function _PQueue_onEvent2(event, filter2) {
  return new Promise((resolve) => {
    const listener = () => {
      if (filter2 && !filter2()) {
        return;
      }
      this.off(event, listener);
      resolve();
    };
    this.on(event, listener);
  });
};
var objectSafeSet = set;
function set(obj, propsArg, value) {
  var props, lastProp;
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0);
  }
  if (typeof propsArg == "string") {
    props = propsArg.split(".");
  }
  if (typeof propsArg == "symbol") {
    props = [propsArg];
  }
  if (!Array.isArray(props)) {
    throw new Error("props arg must be an array, a string or a symbol");
  }
  lastProp = props.pop();
  if (!lastProp) {
    return false;
  }
  prototypeCheck(lastProp);
  var thisProp;
  while (thisProp = props.shift()) {
    prototypeCheck(thisProp);
    if (typeof obj[thisProp] == "undefined") {
      obj[thisProp] = {};
    }
    obj = obj[thisProp];
    if (!obj || typeof obj != "object") {
      return false;
    }
  }
  obj[lastProp] = value;
  return true;
}
function prototypeCheck(prop) {
  if (prop == "__proto__" || prop == "constructor" || prop == "prototype") {
    throw new Error("setting of prototype values not supported");
  }
}
const Queue = PQueue.default ? PQueue.default : PQueue;
const configKey = new Key("config");
function config(store) {
  const setQueue = new Queue({ concurrency: 1 });
  const configStore = {
    async getAll(options = {}) {
      const encodedValue = await getWithFallback(configKey, store.get.bind(store), store.has.bind(store), store);
      return JSON.parse(toString(encodedValue));
    },
    async get(key, options = {}) {
      if (key == null) {
        throw new NotFoundError(`Key ${key} does not exist in config`);
      }
      const config2 = await this.getAll(options);
      const value = objectSafeGet(config2, key);
      if (value === void 0) {
        throw new NotFoundError(`Key ${key} does not exist in config`);
      }
      return value;
    },
    set(key, value, options = {}) {
      if (typeof key !== "string" && !(key instanceof String)) {
        throw errCode(new Error("Invalid key type: " + typeof key), "ERR_INVALID_KEY");
      }
      if (value === void 0 || value instanceof Uint8Array) {
        throw errCode(new Error("Invalid value type: " + typeof value), "ERR_INVALID_VALUE");
      }
      return setQueue.add(() => _maybeDoSet({
        key,
        value
      }, options.signal));
    },
    replace(value, options = {}) {
      if (!value || value instanceof Uint8Array) {
        throw errCode(new Error("Invalid value type: " + typeof value), "ERR_INVALID_VALUE");
      }
      return setQueue.add(() => _maybeDoSet({
        key: void 0,
        value
      }, options.signal));
    },
    async exists() {
      return hasWithFallback(configKey, store.has.bind(store), store);
    }
  };
  return configStore;
  async function _maybeDoSet(m, signal) {
    if (signal && signal.aborted) {
      return;
    }
    const key = m.key;
    const value = m.value;
    if (key) {
      const config2 = await configStore.getAll();
      if (typeof config2 === "object" && config2 !== null) {
        objectSafeSet(config2, key, value);
      }
      return _saveAll(config2);
    }
    return _saveAll(value);
  }
  function _saveAll(config2) {
    const buf2 = fromString(JSON.stringify(config2, null, 2));
    return store.put(configKey, buf2);
  }
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function sortKeys(object, options = {}) {
  if (!isPlainObject(object) && !Array.isArray(object)) {
    throw new TypeError("Expected a plain object or array");
  }
  const { deep, compare: compare2 } = options;
  const seenInput = [];
  const seenOutput = [];
  const deepSortArray = (array) => {
    const seenIndex = seenInput.indexOf(array);
    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }
    const result = [];
    seenInput.push(array);
    seenOutput.push(result);
    result.push(...array.map((item) => {
      if (Array.isArray(item)) {
        return deepSortArray(item);
      }
      if (isPlainObject(item)) {
        return _sortKeys(item);
      }
      return item;
    }));
    return result;
  };
  const _sortKeys = (object2) => {
    const seenIndex = seenInput.indexOf(object2);
    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }
    const result = {};
    const keys = Object.keys(object2).sort(compare2);
    seenInput.push(object2);
    seenOutput.push(result);
    for (const key of keys) {
      const value = object2[key];
      let newValue;
      if (deep && Array.isArray(value)) {
        newValue = deepSortArray(value);
      } else {
        newValue = deep && isPlainObject(value) ? _sortKeys(value) : value;
      }
      Object.defineProperty(result, key, {
        ...Object.getOwnPropertyDescriptor(object2, key),
        value: newValue
      });
    }
    return result;
  };
  if (Array.isArray(object)) {
    return deep ? deepSortArray(object) : object.slice();
  }
  return _sortKeys(object);
}
const specKey = new Key("datastore_spec");
function spec(store) {
  return {
    exists() {
      return store.has(specKey);
    },
    async get() {
      const buf2 = await store.get(specKey);
      return JSON.parse(toString(buf2));
    },
    async set(spec2) {
      return store.put(specKey, fromString(JSON.stringify(sortKeys(spec2, { deep: true }))));
    }
  };
}
const apiFile = new Key("api");
function apiAddr(store) {
  return {
    async get() {
      const value = await store.get(apiFile);
      return value && value.toString();
    },
    set(value) {
      return store.put(apiFile, fromString(value.toString()));
    },
    delete() {
      return store.delete(apiFile);
    }
  };
}
const filter = async function* (source, fn) {
  for await (const entry of source) {
    if (await fn(entry)) {
      yield entry;
    }
  }
};
var itFilter = filter;
class FixedFIFO$1 {
  constructor(hwm) {
    if (!(hwm > 0) || (hwm - 1 & hwm) !== 0) {
      throw new Error("Max size for a FixedFIFO should be a power of two");
    }
    this.buffer = new Array(hwm);
    this.mask = hwm - 1;
    this.top = 0;
    this.btm = 0;
    this.next = null;
  }
  push(data) {
    if (this.buffer[this.top] !== void 0) {
      return false;
    }
    this.buffer[this.top] = data;
    this.top = this.top + 1 & this.mask;
    return true;
  }
  shift() {
    const last = this.buffer[this.btm];
    if (last === void 0) {
      return void 0;
    }
    this.buffer[this.btm] = void 0;
    this.btm = this.btm + 1 & this.mask;
    return last;
  }
  isEmpty() {
    return this.buffer[this.btm] === void 0;
  }
}
class FIFO$1 {
  constructor(options = {}) {
    var _a2;
    this.hwm = (_a2 = options.splitLimit) != null ? _a2 : 16;
    this.head = new FixedFIFO$1(this.hwm);
    this.tail = this.head;
    this.size = 0;
  }
  calculateSize(obj) {
    if ((obj == null ? void 0 : obj.byteLength) != null) {
      return obj.byteLength;
    }
    return 1;
  }
  push(val) {
    if ((val == null ? void 0 : val.value) != null) {
      this.size += this.calculateSize(val.value);
    }
    if (!this.head.push(val)) {
      const prev = this.head;
      this.head = prev.next = new FixedFIFO$1(2 * this.head.buffer.length);
      this.head.push(val);
    }
  }
  shift() {
    let val = this.tail.shift();
    if (val === void 0 && this.tail.next != null) {
      const next = this.tail.next;
      this.tail.next = null;
      this.tail = next;
      val = this.tail.shift();
    }
    if ((val == null ? void 0 : val.value) != null) {
      this.size -= this.calculateSize(val.value);
    }
    return val;
  }
  isEmpty() {
    return this.head.isEmpty();
  }
}
function pushable$1(options = {}) {
  const getNext = (buffer2) => {
    const next = buffer2.shift();
    if (next == null) {
      return { done: true };
    }
    if (next.error != null) {
      throw next.error;
    }
    return {
      done: next.done === true,
      value: next.value
    };
  };
  return _pushable(getNext, options);
}
function _pushable(getNext, options) {
  options = options != null ? options : {};
  let onEnd = options.onEnd;
  let buffer2 = new FIFO$1();
  let pushable2;
  let onNext;
  let ended;
  const waitNext = async () => {
    if (!buffer2.isEmpty()) {
      return getNext(buffer2);
    }
    if (ended) {
      return { done: true };
    }
    return await new Promise((resolve, reject) => {
      onNext = (next) => {
        onNext = null;
        buffer2.push(next);
        try {
          resolve(getNext(buffer2));
        } catch (err) {
          reject(err);
        }
        return pushable2;
      };
    });
  };
  const bufferNext = (next) => {
    if (onNext != null) {
      return onNext(next);
    }
    buffer2.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer2 = new FIFO$1();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer2.push({ error: err });
    return pushable2;
  };
  const push2 = (value) => {
    if (ended) {
      return pushable2;
    }
    if ((options == null ? void 0 : options.objectMode) !== true && (value == null ? void 0 : value.byteLength) == null) {
      throw new Error("objectMode was not true but tried to push non-Uint8Array value");
    }
    return bufferNext({ done: false, value });
  };
  const end2 = (err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err != null ? bufferError(err) : bufferNext({ done: true });
  };
  const _return = () => {
    buffer2 = new FIFO$1();
    end2();
    return { done: true };
  };
  const _throw = (err) => {
    end2(err);
    return { done: true };
  };
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next: waitNext,
    return: _return,
    throw: _throw,
    push: push2,
    end: end2,
    get readableLength() {
      return buffer2.size;
    }
  };
  if (onEnd == null) {
    return pushable2;
  }
  const _pushable2 = pushable2;
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return _pushable2.next();
    },
    throw(err) {
      _pushable2.throw(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return { done: true };
    },
    return() {
      _pushable2.return();
      if (onEnd != null) {
        onEnd();
        onEnd = void 0;
      }
      return { done: true };
    },
    push: push2,
    end(err) {
      _pushable2.end(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return pushable2;
    },
    get readableLength() {
      return _pushable2.readableLength;
    }
  };
  return pushable2;
}
const drain = async (source) => {
  for await (const _ of source) {
  }
};
var itDrain = drain;
function createIdStore(store) {
  return {
    open() {
      return store.open();
    },
    close() {
      return store.close();
    },
    query(query, options) {
      return store.query(query, options);
    },
    queryKeys(query, options) {
      return store.queryKeys(query, options);
    },
    async get(cid, options) {
      const extracted = extractContents(cid);
      if (extracted.isIdentity) {
        return Promise.resolve(extracted.digest);
      }
      return store.get(cid, options);
    },
    async *getMany(cids, options) {
      for await (const cid of cids) {
        yield this.get(cid, options);
      }
    },
    async put(cid, buf2, options) {
      const { isIdentity } = extractContents(cid);
      if (isIdentity) {
        return;
      }
      await store.put(cid, buf2, options);
    },
    async *putMany(pairs, options) {
      const output = pushable$1({
        objectMode: true
      });
      const runner = globalThis.process && globalThis.process.nextTick ? globalThis.process.nextTick : globalThis.setImmediate || globalThis.setTimeout;
      runner(async () => {
        try {
          await itDrain(store.putMany(async function* () {
            for await (const { key, value } of pairs) {
              if (!extractContents(key).isIdentity) {
                yield { key, value };
              }
              output.push({ key, value });
            }
          }()));
          output.end();
        } catch (err) {
          output.end(err);
        }
      });
      yield* output;
    },
    has(cid, options) {
      const { isIdentity } = extractContents(cid);
      if (isIdentity) {
        return Promise.resolve(true);
      }
      return store.has(cid, options);
    },
    delete(cid, options) {
      const { isIdentity } = extractContents(cid);
      if (isIdentity) {
        return Promise.resolve();
      }
      return store.delete(cid, options);
    },
    deleteMany(cids, options) {
      return store.deleteMany(itFilter(cids, (cid) => !extractContents(cid).isIdentity), options);
    },
    batch() {
      const batch2 = store.batch();
      return {
        put(cid, buf2) {
          const { isIdentity } = extractContents(cid);
          if (isIdentity) {
            return;
          }
          batch2.put(cid, buf2);
        },
        delete(cid) {
          const { isIdentity } = extractContents(cid);
          if (isIdentity) {
            return;
          }
          batch2.delete(cid);
        },
        commit: (options) => {
          return batch2.commit(options);
        }
      };
    }
  };
}
function extractContents(k) {
  const cid = CID$1.asCID(k);
  if (cid == null) {
    throw errCode(new Error("Not a valid cid"), "ERR_INVALID_CID");
  }
  if (cid.multihash.code !== identity$1.code) {
    return {
      isIdentity: false
    };
  }
  return {
    isIdentity: true,
    digest: cid.multihash.digest
  };
}
const log$3 = debug("ipfs:repo:lock:memory");
const lockFile = "repo.lock";
const LOCKS = {};
async function lock(dir) {
  const file = dir + "/" + lockFile;
  log$3("locking %s", file);
  if (LOCKS[file] === true) {
    throw new LockExistsError(`Lock already being held for file: ${file}`);
  }
  LOCKS[file] = true;
  const closer = {
    async close() {
      if (LOCKS[file]) {
        delete LOCKS[file];
      }
    }
  };
  return closer;
}
async function locked(dir) {
  const file = dir + "/" + lockFile;
  log$3(`checking lock: ${file}`);
  return Boolean(LOCKS[file]);
}
const MemoryLock = {
  lock,
  locked
};
const defaultOptions$2 = {
  autoMigrate: true,
  onMigrationProgress: () => {
  },
  repoOwner: true,
  repoLock: MemoryLock
};
const defaultDatastore = {
  Spec: {
    type: "mount",
    mounts: [
      {
        mountpoint: "/blocks",
        type: "measure",
        prefix: "flatfs.datastore",
        child: {
          type: "flatfs",
          path: "blocks",
          sync: true,
          shardFunc: "/repo/flatfs/shard/v1/next-to-last/2"
        }
      },
      {
        mountpoint: "/",
        type: "measure",
        prefix: "leveldb.datastore",
        child: {
          type: "levelds",
          path: "datastore",
          compression: "none"
        }
      }
    ]
  }
};
const first = async (source) => {
  for await (const entry of source) {
    return entry;
  }
  return void 0;
};
var itFirst = first;
const readonly$1 = ({ enumerable = true, configurable = false } = {}) => ({
  enumerable,
  configurable,
  writable: false
});
const links = function* (source, base3) {
  if (source == null)
    return;
  if (source instanceof Uint8Array)
    return;
  for (const [key, value] of Object.entries(source)) {
    const path = [
      ...base3,
      key
    ];
    if (value != null && typeof value === "object") {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          const cid = CID$1.asCID(element);
          if (cid) {
            yield [
              elementPath.join("/"),
              cid
            ];
          } else if (typeof element === "object") {
            yield* links(element, elementPath);
          }
        }
      } else {
        const cid = CID$1.asCID(value);
        if (cid) {
          yield [
            path.join("/"),
            cid
          ];
        } else {
          yield* links(value, path);
        }
      }
    }
  }
};
const tree = function* (source, base3) {
  if (source == null)
    return;
  for (const [key, value] of Object.entries(source)) {
    const path = [
      ...base3,
      key
    ];
    yield path.join("/");
    if (value != null && !(value instanceof Uint8Array) && typeof value === "object" && !CID$1.asCID(value)) {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          yield elementPath.join("/");
          if (typeof element === "object" && !CID$1.asCID(element)) {
            yield* tree(element, elementPath);
          }
        }
      } else {
        yield* tree(value, path);
      }
    }
  }
};
const get = (source, path) => {
  let node = source;
  for (const [index, key] of path.entries()) {
    node = node[key];
    if (node == null) {
      throw new Error(`Object has no property at ${path.slice(0, index + 1).map((part) => `[${JSON.stringify(part)}]`).join("")}`);
    }
    const cid = CID$1.asCID(node);
    if (cid) {
      return {
        value: cid,
        remaining: path.slice(index + 1).join("/")
      };
    }
  }
  return { value: node };
};
class Block {
  constructor({ cid, bytes: bytes2, value }) {
    if (!cid || !bytes2 || typeof value === "undefined")
      throw new Error("Missing required argument");
    this.cid = cid;
    this.bytes = bytes2;
    this.value = value;
    this.asBlock = this;
    Object.defineProperties(this, {
      cid: readonly$1(),
      bytes: readonly$1(),
      value: readonly$1(),
      asBlock: readonly$1()
    });
  }
  links() {
    return links(this.value, []);
  }
  tree() {
    return tree(this.value, []);
  }
  get(path = "/") {
    return get(this.value, path.split("/").filter(Boolean));
  }
}
const createUnsafe = ({
  bytes: bytes2,
  cid,
  value: maybeValue,
  codec
}) => {
  const value = maybeValue !== void 0 ? maybeValue : codec && codec.decode(bytes2);
  if (value === void 0)
    throw new Error('Missing required argument, must either provide "value" or "codec"');
  return new Block({
    cid,
    bytes: bytes2,
    value
  });
};
function cidToKey(c) {
  const cid = CID$1.asCID(c);
  if (cid == null) {
    throw errCode(new Error("Not a valid cid"), "ERR_INVALID_CID");
  }
  const encoded = base32$3.encode(cid.multihash.bytes);
  return new Key("/" + encoded.slice(1).toUpperCase(), false);
}
function keyToMultihash(key) {
  return decode$8(base32$3.decode(`b${key.toString().toLowerCase().substring(1)}`));
}
const log$2 = debug("ipfs:repo:utils:walk-dag");
async function* walkDag(cid, blockstore, loadCodec, options) {
  try {
    const bytes2 = await blockstore.get(cid, options);
    const codec = await loadCodec(cid.code);
    const block = createUnsafe({ bytes: bytes2, cid, codec });
    for (const [, childCid] of block.links()) {
      yield childCid;
      yield* walkDag(childCid, blockstore, loadCodec, options);
    }
  } catch (err) {
    log$2("Could not walk DAG for CID", cid.toString(), err);
    throw err;
  }
}
const PinTypes = {
  direct: "direct",
  recursive: "recursive",
  indirect: "indirect",
  all: "all"
};
class QuickLRU extends Map {
  constructor(options = {}) {
    super();
    if (!(options.maxSize && options.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    if (typeof options.maxAge === "number" && options.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }
    this.maxSize = options.maxSize;
    this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
    this.onEviction = options.onEviction;
    this.cache = /* @__PURE__ */ new Map();
    this.oldCache = /* @__PURE__ */ new Map();
    this._size = 0;
  }
  _emitEvictions(cache) {
    if (typeof this.onEviction !== "function") {
      return;
    }
    for (const [key, item] of cache) {
      this.onEviction(key, item.value);
    }
  }
  _deleteIfExpired(key, item) {
    if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
      if (typeof this.onEviction === "function") {
        this.onEviction(key, item.value);
      }
      return this.delete(key);
    }
    return false;
  }
  _getOrDeleteIfExpired(key, item) {
    const deleted = this._deleteIfExpired(key, item);
    if (deleted === false) {
      return item.value;
    }
  }
  _getItemValue(key, item) {
    return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
  }
  _peek(key, cache) {
    const item = cache.get(key);
    return this._getItemValue(key, item);
  }
  _set(key, value) {
    this.cache.set(key, value);
    this._size++;
    if (this._size >= this.maxSize) {
      this._size = 0;
      this._emitEvictions(this.oldCache);
      this.oldCache = this.cache;
      this.cache = /* @__PURE__ */ new Map();
    }
  }
  _moveToRecent(key, item) {
    this.oldCache.delete(key);
    this._set(key, item);
  }
  *_entriesAscending() {
    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield item;
        }
      }
    }
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield item;
      }
    }
  }
  get(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      return this._getItemValue(key, item);
    }
    if (this.oldCache.has(key)) {
      const item = this.oldCache.get(key);
      if (this._deleteIfExpired(key, item) === false) {
        this._moveToRecent(key, item);
        return item.value;
      }
    }
  }
  set(key, value, { maxAge = this.maxAge } = {}) {
    const expiry = typeof maxAge === "number" && maxAge !== Number.POSITIVE_INFINITY ? Date.now() + maxAge : void 0;
    if (this.cache.has(key)) {
      this.cache.set(key, {
        value,
        expiry
      });
    } else {
      this._set(key, { value, expiry });
    }
  }
  has(key) {
    if (this.cache.has(key)) {
      return !this._deleteIfExpired(key, this.cache.get(key));
    }
    if (this.oldCache.has(key)) {
      return !this._deleteIfExpired(key, this.oldCache.get(key));
    }
    return false;
  }
  peek(key) {
    if (this.cache.has(key)) {
      return this._peek(key, this.cache);
    }
    if (this.oldCache.has(key)) {
      return this._peek(key, this.oldCache);
    }
  }
  delete(key) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this._size--;
    }
    return this.oldCache.delete(key) || deleted;
  }
  clear() {
    this.cache.clear();
    this.oldCache.clear();
    this._size = 0;
  }
  resize(newSize) {
    if (!(newSize && newSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    const items = [...this._entriesAscending()];
    const removeCount = items.length - newSize;
    if (removeCount < 0) {
      this.cache = new Map(items);
      this.oldCache = /* @__PURE__ */ new Map();
      this._size = items.length;
    } else {
      if (removeCount > 0) {
        this._emitEvictions(items.slice(0, removeCount));
      }
      this.oldCache = new Map(items.slice(removeCount));
      this.cache = /* @__PURE__ */ new Map();
      this._size = 0;
    }
    this.maxSize = newSize;
  }
  *keys() {
    for (const [key] of this) {
      yield key;
    }
  }
  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }
  *[Symbol.iterator]() {
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesDescending() {
    let items = [...this.cache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    items = [...this.oldCache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesAscending() {
    for (const [key, value] of this._entriesAscending()) {
      yield [key, value.value];
    }
  }
  get size() {
    if (!this._size) {
      return this.oldCache.size;
    }
    let oldCacheSize = 0;
    for (const key of this.oldCache.keys()) {
      if (!this.cache.has(key)) {
        oldCacheSize++;
      }
    }
    return Math.min(this._size + oldCacheSize, this.maxSize);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(callbackFunction, thisArgument = this) {
    for (const [key, value] of this.entriesAscending()) {
      callbackFunction.call(thisArgument, value, key, this);
    }
  }
  get [Symbol.toStringTag]() {
    return JSON.stringify([...this.entriesAscending()]);
  }
}
const CID_CACHE_MAX_SIZE = 2048;
function invalidPinTypeErr(type) {
  const errMsg = `Invalid type '${type}', must be one of {direct, indirect, recursive, all}`;
  return errCode(new Error(errMsg), "ERR_INVALID_PIN_TYPE");
}
class PinManager {
  constructor({ pinstore, blockstore, loadCodec }) {
    this.pinstore = pinstore;
    this.blockstore = blockstore;
    this.loadCodec = loadCodec;
    this.log = debug("ipfs:repo:pin");
    this.directPins = /* @__PURE__ */ new Set();
    this.recursivePins = /* @__PURE__ */ new Set();
  }
  async pinDirectly(cid, options = {}) {
    await this.blockstore.get(cid, options);
    const pin = {
      depth: 0
    };
    if (cid.version !== 0) {
      pin.version = cid.version;
    }
    if (cid.code !== code$3) {
      pin.codec = cid.code;
    }
    if (options.metadata) {
      pin.metadata = options.metadata;
    }
    return this.pinstore.put(cidToKey(cid), encode$o(pin));
  }
  unpin(cid, options) {
    return this.pinstore.delete(cidToKey(cid), options);
  }
  async pinRecursively(cid, options = {}) {
    await this.fetchCompleteDag(cid, options);
    const pin = {
      depth: Infinity
    };
    if (cid.version !== 0) {
      pin.version = cid.version;
    }
    if (cid.code !== code$3) {
      pin.codec = cid.code;
    }
    if (options.metadata) {
      pin.metadata = options.metadata;
    }
    await this.pinstore.put(cidToKey(cid), encode$o(pin));
  }
  async *directKeys(options) {
    for await (const entry of this.pinstore.query({
      filters: [(entry2) => {
        const pin = decode$x(entry2.value);
        return pin.depth === 0;
      }]
    })) {
      const pin = decode$x(entry.value);
      const version2 = pin.version || 0;
      const codec = pin.codec != null ? pin.codec : code$3;
      const multihash = keyToMultihash(entry.key);
      yield {
        cid: CID$1.create(version2, codec, multihash),
        metadata: pin.metadata
      };
    }
  }
  async *recursiveKeys(options) {
    for await (const entry of this.pinstore.query({
      filters: [(entry2) => {
        const pin = decode$x(entry2.value);
        return pin.depth === Infinity;
      }]
    })) {
      const pin = decode$x(entry.value);
      const version2 = pin.version || 0;
      const codec = pin.codec != null ? pin.codec : code$3;
      const multihash = keyToMultihash(entry.key);
      yield {
        cid: CID$1.create(version2, codec, multihash),
        metadata: pin.metadata
      };
    }
  }
  async *indirectKeys(options) {
    for await (const { cid } of this.recursiveKeys()) {
      for await (const childCid of walkDag(cid, this.blockstore, this.loadCodec, options)) {
        const types = [
          PinTypes.recursive
        ];
        const result = await this.isPinnedWithType(childCid, types);
        if (result.pinned) {
          continue;
        }
        yield childCid;
      }
    }
  }
  async isPinnedWithType(cid, types, options) {
    if (!Array.isArray(types)) {
      types = [types];
    }
    const all2 = types.includes(PinTypes.all);
    const direct = types.includes(PinTypes.direct);
    const recursive = types.includes(PinTypes.recursive);
    const indirect = types.includes(PinTypes.indirect);
    if (recursive || direct || all2) {
      const result = await itFirst(this.pinstore.query({
        prefix: cidToKey(cid).toString(),
        filters: [(entry) => {
          if (all2) {
            return true;
          }
          const pin = decode$x(entry.value);
          return types.includes(pin.depth === 0 ? PinTypes.direct : PinTypes.recursive);
        }],
        limit: 1
      }));
      if (result) {
        const pin = decode$x(result.value);
        return {
          cid,
          pinned: true,
          reason: pin.depth === 0 ? PinTypes.direct : PinTypes.recursive,
          metadata: pin.metadata
        };
      }
    }
    const self2 = this;
    async function* findChild(key, source) {
      for await (const { cid: parentCid } of source) {
        for await (const childCid of walkDag(parentCid, self2.blockstore, self2.loadCodec)) {
          if (childCid.equals(key)) {
            yield parentCid;
            return;
          }
        }
      }
    }
    if (all2 || indirect) {
      const parentCid = await itFirst(findChild(cid, this.recursiveKeys()));
      if (parentCid) {
        return {
          cid,
          pinned: true,
          reason: PinTypes.indirect,
          parent: parentCid
        };
      }
    }
    return {
      cid,
      pinned: false
    };
  }
  async fetchCompleteDag(cid, options = {}) {
    var _a2;
    const seen = new QuickLRU({ maxSize: (_a2 = options.cidCacheMaxSize) != null ? _a2 : CID_CACHE_MAX_SIZE });
    const walkDag2 = async (cid2, options2) => {
      if (seen.has(cid2.toString())) {
        return;
      }
      seen.set(cid2.toString(), true);
      const bytes2 = await this.blockstore.get(cid2, options2);
      const codec = await this.loadCodec(cid2.code);
      const block = createUnsafe({ bytes: bytes2, cid: cid2, codec });
      await Promise.all(
        [...block.links()].map(([, childCid]) => walkDag2(childCid, options2))
      );
    };
    await walkDag2(cid, options);
  }
  static checkPinType(type) {
    if (typeof type !== "string" || !Object.keys(PinTypes).includes(type)) {
      throw invalidPinTypeErr(type);
    }
    return true;
  }
}
const map = async function* (source, func) {
  for await (const val of source) {
    yield func(val);
  }
};
var itMap = map;
function createPinnedBlockstore(pins, store) {
  return {
    open() {
      return store.open();
    },
    close() {
      return store.close();
    },
    query(query, options) {
      return store.query(query, options);
    },
    queryKeys(query, options) {
      return store.queryKeys(query, options);
    },
    async get(cid, options) {
      return store.get(cid, options);
    },
    async *getMany(cids, options) {
      yield* store.getMany(cids, options);
    },
    async put(cid, buf2, options) {
      await store.put(cid, buf2, options);
    },
    async *putMany(pairs, options) {
      yield* store.putMany(pairs, options);
    },
    has(cid, options) {
      return store.has(cid, options);
    },
    async delete(cid, options) {
      await ensureNotPinned(cid, pins);
      return store.delete(cid, options);
    },
    deleteMany(cids, options) {
      return store.deleteMany(itMap(cids, async (cid) => {
        await ensureNotPinned(cid, pins);
        return cid;
      }), options);
    },
    batch() {
      return store.batch();
    }
  };
}
async function ensureNotPinned(cid, pins) {
  const { pinned, reason } = await pins.isPinnedWithType(cid, PinTypes.all);
  if (pinned) {
    throw errCode(new Error(`pinned: ${reason}`), "ERR_BLOCK_PINNED");
  }
}
class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}
class AbortError extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
}
const getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
const getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise2, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  const cancelablePromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve(promise2);
      return;
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      const errorMessage = typeof message === "string" ? message : `Promise timed out after ${milliseconds} milliseconds`;
      const timeoutError2 = message instanceof Error ? message : new TimeoutError(errorMessage);
      if (typeof promise2.cancel === "function") {
        promise2.cancel();
      }
      reject(timeoutError2);
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise2);
      } catch (error) {
        reject(error);
      } finally {
        customTimers.clearTimeout.call(void 0, timer);
      }
    })();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
const WORKER_REQUEST_READ_LOCK = "lock:worker:request-read";
const WORKER_RELEASE_READ_LOCK = "lock:worker:release-read";
const MASTER_GRANT_READ_LOCK = "lock:master:grant-read";
const WORKER_REQUEST_WRITE_LOCK = "lock:worker:request-write";
const WORKER_RELEASE_WRITE_LOCK = "lock:worker:release-write";
const MASTER_GRANT_WRITE_LOCK = "lock:master:grant-write";
const events = {};
const observable = (worker) => {
  worker.addEventListener("message", (event) => {
    observable.dispatchEvent("message", worker, event);
  });
  if (worker.port != null) {
    worker.port.addEventListener("message", (event) => {
      observable.dispatchEvent("message", worker, event);
    });
  }
};
observable.addEventListener = (type, fn) => {
  if (events[type] == null) {
    events[type] = [];
  }
  events[type].push(fn);
};
observable.removeEventListener = (type, fn) => {
  if (events[type] == null) {
    return;
  }
  events[type] = events[type].filter((listener) => listener === fn);
};
observable.dispatchEvent = function(type, worker, event) {
  if (events[type] == null) {
    return;
  }
  events[type].forEach((fn) => fn(worker, event));
};
const handleWorkerLockRequest = (emitter, masterEvent, requestType, releaseType, grantType) => {
  return (worker, event) => {
    if (event.data.type !== requestType) {
      return;
    }
    const requestEvent = {
      type: event.data.type,
      name: event.data.name,
      identifier: event.data.identifier
    };
    emitter.dispatchEvent(new MessageEvent(masterEvent, {
      data: {
        name: requestEvent.name,
        handler: async () => {
          worker.postMessage({
            type: grantType,
            name: requestEvent.name,
            identifier: requestEvent.identifier
          });
          return await new Promise((resolve) => {
            const releaseEventListener = (event2) => {
              if (event2 == null || event2.data == null) {
                return;
              }
              const releaseEvent = {
                type: event2.data.type,
                name: event2.data.name,
                identifier: event2.data.identifier
              };
              if (releaseEvent.type === releaseType && releaseEvent.identifier === requestEvent.identifier) {
                worker.removeEventListener("message", releaseEventListener);
                resolve();
              }
            };
            worker.addEventListener("message", releaseEventListener);
          });
        }
      }
    }));
  };
};
const makeWorkerLockRequest = (name2, requestType, grantType, releaseType) => {
  return async () => {
    const id = nanoid();
    globalThis.postMessage({
      type: requestType,
      identifier: id,
      name: name2
    });
    return await new Promise((resolve) => {
      const listener = (event) => {
        if (event == null || event.data == null) {
          return;
        }
        const responseEvent = {
          type: event.data.type,
          identifier: event.data.identifier
        };
        if (responseEvent.type === grantType && responseEvent.identifier === id) {
          globalThis.removeEventListener("message", listener);
          resolve(() => {
            globalThis.postMessage({
              type: releaseType,
              identifier: id,
              name: name2
            });
          });
        }
      };
      globalThis.addEventListener("message", listener);
    });
  };
};
const defaultOptions$1 = {
  singleProcess: false
};
const impl = (options) => {
  options = Object.assign({}, defaultOptions$1, options);
  const isPrimary = Boolean(globalThis.document) || options.singleProcess;
  if (isPrimary) {
    const emitter = new EventTarget();
    observable.addEventListener("message", handleWorkerLockRequest(emitter, "requestReadLock", WORKER_REQUEST_READ_LOCK, WORKER_RELEASE_READ_LOCK, MASTER_GRANT_READ_LOCK));
    observable.addEventListener("message", handleWorkerLockRequest(emitter, "requestWriteLock", WORKER_REQUEST_WRITE_LOCK, WORKER_RELEASE_WRITE_LOCK, MASTER_GRANT_WRITE_LOCK));
    return emitter;
  }
  return {
    isWorker: true,
    readLock: (name2) => makeWorkerLockRequest(name2, WORKER_REQUEST_READ_LOCK, MASTER_GRANT_READ_LOCK, WORKER_RELEASE_READ_LOCK),
    writeLock: (name2) => makeWorkerLockRequest(name2, WORKER_REQUEST_WRITE_LOCK, MASTER_GRANT_WRITE_LOCK, WORKER_RELEASE_WRITE_LOCK)
  };
};
const mutexes = {};
let implementation;
async function createReleaseable(queue, options) {
  let res;
  const p = new Promise((resolve) => {
    res = resolve;
  });
  void queue.add(async () => await pTimeout((async () => {
    return await new Promise((resolve) => {
      res(() => {
        resolve();
      });
    });
  })(), {
    milliseconds: options.timeout
  }));
  return await p;
}
const createMutex = (name2, options) => {
  if (implementation.isWorker === true) {
    return {
      readLock: implementation.readLock(name2, options),
      writeLock: implementation.writeLock(name2, options)
    };
  }
  const masterQueue = new PQueue({ concurrency: 1 });
  let readQueue;
  return {
    async readLock() {
      if (readQueue != null) {
        return await createReleaseable(readQueue, options);
      }
      readQueue = new PQueue({
        concurrency: options.concurrency,
        autoStart: false
      });
      const localReadQueue = readQueue;
      const readPromise = createReleaseable(readQueue, options);
      void masterQueue.add(async () => {
        localReadQueue.start();
        return await localReadQueue.onIdle().then(() => {
          if (readQueue === localReadQueue) {
            readQueue = null;
          }
        });
      });
      return await readPromise;
    },
    async writeLock() {
      readQueue = null;
      return await createReleaseable(masterQueue, options);
    }
  };
};
const defaultOptions = {
  name: "lock",
  concurrency: Infinity,
  timeout: 846e5,
  singleProcess: false
};
function createMortice(options) {
  const opts = Object.assign({}, defaultOptions, options);
  if (implementation == null) {
    implementation = impl(opts);
    if (implementation.isWorker !== true) {
      implementation.addEventListener("requestReadLock", (event) => {
        if (mutexes[event.data.name] == null) {
          return;
        }
        void mutexes[event.data.name].readLock().then(async (release) => await event.data.handler().finally(() => release()));
      });
      implementation.addEventListener("requestWriteLock", async (event) => {
        if (mutexes[event.data.name] == null) {
          return;
        }
        void mutexes[event.data.name].writeLock().then(async (release) => await event.data.handler().finally(() => release()));
      });
    }
  }
  if (mutexes[opts.name] == null) {
    mutexes[opts.name] = createMutex(opts.name, opts);
  }
  return mutexes[opts.name];
}
async function* batch$1(source, size = 1) {
  let things = [];
  if (size < 1) {
    size = 1;
  }
  for await (const thing of source) {
    things.push(thing);
    while (things.length >= size) {
      yield things.slice(0, size);
      things = things.slice(size);
    }
  }
  while (things.length) {
    yield things.slice(0, size);
    things = things.slice(size);
  }
}
var itBatch = batch$1;
const batch = itBatch;
async function* parallelBatch(source, size = 1) {
  for await (const tasks of batch(source, size)) {
    const things = tasks.map(
      (p) => {
        return p().then((value) => ({ ok: true, value }), (err) => ({ ok: false, err }));
      }
    );
    for (let i = 0; i < things.length; i++) {
      const result = await things[i];
      if (result.ok) {
        yield result.value;
      } else {
        throw result.err;
      }
    }
  }
}
var itParallelBatch = parallelBatch;
var fixedSize = class FixedFIFO2 {
  constructor(hwm) {
    if (!(hwm > 0) || (hwm - 1 & hwm) !== 0)
      throw new Error("Max size for a FixedFIFO should be a power of two");
    this.buffer = new Array(hwm);
    this.mask = hwm - 1;
    this.top = 0;
    this.btm = 0;
    this.next = null;
  }
  push(data) {
    if (this.buffer[this.top] !== void 0)
      return false;
    this.buffer[this.top] = data;
    this.top = this.top + 1 & this.mask;
    return true;
  }
  shift() {
    const last = this.buffer[this.btm];
    if (last === void 0)
      return void 0;
    this.buffer[this.btm] = void 0;
    this.btm = this.btm + 1 & this.mask;
    return last;
  }
  peek() {
    return this.buffer[this.btm];
  }
  isEmpty() {
    return this.buffer[this.btm] === void 0;
  }
};
const FixedFIFO = fixedSize;
var fastFifo = class FastFIFO {
  constructor(hwm) {
    this.hwm = hwm || 16;
    this.head = new FixedFIFO(this.hwm);
    this.tail = this.head;
  }
  push(val) {
    if (!this.head.push(val)) {
      const prev = this.head;
      this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
      this.head.push(val);
    }
  }
  shift() {
    const val = this.tail.shift();
    if (val === void 0 && this.tail.next) {
      const next = this.tail.next;
      this.tail.next = null;
      this.tail = next;
      return this.tail.shift();
    }
    return val;
  }
  peek() {
    return this.tail.peek();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
};
const FIFO = fastFifo;
var itPushable = (options) => {
  options = options || {};
  let onEnd;
  if (typeof options === "function") {
    onEnd = options;
    options = {};
  } else {
    onEnd = options.onEnd;
  }
  let buffer2 = new FIFO();
  let pushable2, onNext, ended;
  const waitNext = () => {
    if (!buffer2.isEmpty()) {
      if (options.writev) {
        let next2;
        const values = [];
        while (!buffer2.isEmpty()) {
          next2 = buffer2.shift();
          if (next2.error)
            throw next2.error;
          values.push(next2.value);
        }
        return { done: next2.done, value: values };
      }
      const next = buffer2.shift();
      if (next.error)
        throw next.error;
      return next;
    }
    if (ended)
      return { done: true };
    return new Promise((resolve, reject) => {
      onNext = (next) => {
        onNext = null;
        if (next.error) {
          reject(next.error);
        } else {
          if (options.writev && !next.done) {
            resolve({ done: next.done, value: [next.value] });
          } else {
            resolve(next);
          }
        }
        return pushable2;
      };
    });
  };
  const bufferNext = (next) => {
    if (onNext)
      return onNext(next);
    buffer2.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer2 = new FIFO();
    if (onNext)
      return onNext({ error: err });
    buffer2.push({ error: err });
    return pushable2;
  };
  const push2 = (value) => {
    if (ended)
      return pushable2;
    return bufferNext({ done: false, value });
  };
  const end2 = (err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err ? bufferError(err) : bufferNext({ done: true });
  };
  const _return = () => {
    buffer2 = new FIFO();
    end2();
    return { done: true };
  };
  const _throw = (err) => {
    end2(err);
    return { done: true };
  };
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next: waitNext,
    return: _return,
    throw: _throw,
    push: push2,
    end: end2
  };
  if (!onEnd)
    return pushable2;
  const _pushable2 = pushable2;
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return _pushable2.next();
    },
    throw(err) {
      _pushable2.throw(err);
      if (onEnd) {
        onEnd(err);
        onEnd = null;
      }
      return { done: true };
    },
    return() {
      _pushable2.return();
      if (onEnd) {
        onEnd();
        onEnd = null;
      }
      return { done: true };
    },
    push: push2,
    end(err) {
      _pushable2.end(err);
      if (onEnd) {
        onEnd(err);
        onEnd = null;
      }
      return pushable2;
    }
  };
  return pushable2;
};
const pushable = itPushable;
const merge = async function* (...sources) {
  const output = pushable();
  setTimeout(async () => {
    try {
      await Promise.all(
        sources.map(async (source) => {
          for await (const item of source) {
            output.push(item);
          }
        })
      );
      output.end();
    } catch (err) {
      output.end(err);
    }
  }, 0);
  yield* output;
};
var itMerge = merge;
const rawPipe = (...fns) => {
  let res;
  while (fns.length > 0) {
    res = fns.shift()(res);
  }
  return res;
};
const isIterable = (obj) => {
  return obj != null && (typeof obj[Symbol.asyncIterator] === "function" || typeof obj[Symbol.iterator] === "function" || typeof obj.next === "function");
};
const isDuplex = (obj) => {
  return obj != null && typeof obj.sink === "function" && isIterable(obj.source);
};
const duplexPipelineFn = (duplex) => {
  return (source) => {
    const p = duplex.sink(source);
    if (p.then != null) {
      const stream = pushable$1({
        objectMode: true
      });
      p.then(() => {
        stream.end();
      }, (err) => {
        stream.end(err);
      });
      const sourceWrap = async function* () {
        yield* duplex.source;
        stream.end();
      };
      return itMerge(stream, sourceWrap());
    }
    return duplex.source;
  };
};
function pipe(first2, ...rest) {
  if (isDuplex(first2)) {
    const duplex = first2;
    first2 = () => duplex.source;
  } else if (isIterable(first2)) {
    const source = first2;
    first2 = () => source;
  }
  const fns = [first2, ...rest];
  if (fns.length > 1) {
    if (isDuplex(fns[fns.length - 1])) {
      fns[fns.length - 1] = fns[fns.length - 1].sink;
    }
  }
  if (fns.length > 2) {
    for (let i = 1; i < fns.length - 1; i++) {
      if (isDuplex(fns[i])) {
        fns[i] = duplexPipelineFn(fns[i]);
      }
    }
  }
  return rawPipe(...fns);
}
const log$1 = debug("ipfs:repo:gc");
const ERR_NOT_FOUND = notFoundError().code;
const BLOCK_RM_CONCURRENCY = 256;
const MFS_ROOT_KEY = new Key("/local/filesroot");
function gc({ gcLock, pins, blockstore, root, loadCodec }) {
  async function* gc2() {
    const start = Date.now();
    log$1("Creating set of marked blocks");
    const release = await gcLock.writeLock();
    try {
      const markedSet = await createMarkedSet({ pins, blockstore, root, loadCodec });
      const blockKeys = blockstore.queryKeys({});
      yield* deleteUnmarkedBlocks({ blockstore }, markedSet, blockKeys);
      log$1(`Complete (${Date.now() - start}ms)`);
    } finally {
      release();
    }
  }
  return gc2;
}
async function createMarkedSet({ pins, blockstore, loadCodec, root }) {
  const mfsSource = async function* () {
    let mh;
    try {
      mh = await root.get(MFS_ROOT_KEY);
    } catch (err) {
      if (err.code === ERR_NOT_FOUND) {
        log$1("No blocks in MFS");
        return;
      }
      throw err;
    }
    const rootCid = CID$1.decode(mh);
    yield rootCid;
    yield* walkDag(rootCid, blockstore, loadCodec);
  }();
  const pinsSource = itMerge(
    itMap(pins.recursiveKeys(), ({ cid }) => cid),
    pins.indirectKeys(),
    itMap(pins.directKeys(), ({ cid }) => cid),
    mfsSource
  );
  const output = /* @__PURE__ */ new Set();
  for await (const cid of itMerge(pinsSource, mfsSource)) {
    output.add(base32$3.encode(cid.multihash.bytes));
  }
  return output;
}
async function* deleteUnmarkedBlocks({ blockstore }, markedSet, blockKeys) {
  let blocksCount = 0;
  let removedBlocksCount = 0;
  const removeBlock = async (cid) => {
    return async function remove() {
      blocksCount++;
      try {
        const b32 = base32$3.encode(cid.multihash.bytes);
        if (markedSet.has(b32)) {
          return null;
        }
        try {
          await blockstore.delete(cid);
          removedBlocksCount++;
        } catch (err) {
          return {
            err: new Error(`Could not delete block with CID ${cid}: ${err.message}`)
          };
        }
        return { cid };
      } catch (err) {
        const msg = `Could delete block with CID ${cid}`;
        log$1(msg, err);
        return { err: new Error(msg + `: ${err.message}`) };
      }
    };
  };
  yield* pipe(
    itParallelBatch(itMap(blockKeys, removeBlock), BLOCK_RM_CONCURRENCY),
    (source) => itFilter(source, Boolean)
  );
  log$1(`Marked set has ${markedSet.size} unique blocks. Blockstore has ${blocksCount} blocks. Deleted ${removedBlocksCount} blocks.`);
}
const log = debug("ipfs:repo");
const noLimit = Number.MAX_SAFE_INTEGER;
const AUTO_MIGRATE_CONFIG_KEY = "repoAutoMigrate";
class Repo {
  constructor(path, loadCodec, backends, options) {
    if (typeof path !== "string") {
      throw new Error("missing repo path");
    }
    if (typeof loadCodec !== "function") {
      throw new Error("missing codec loader");
    }
    this.options = mergeOptions(defaultOptions$2, options);
    this.closed = true;
    this.path = path;
    this.root = backends.root;
    this.datastore = backends.datastore;
    this.keys = backends.keys;
    const blockstore = backends.blocks;
    const pinstore = backends.pins;
    this.pins = new PinManager({ pinstore, blockstore, loadCodec });
    const pinnedBlockstore = createPinnedBlockstore(this.pins, blockstore);
    this.blocks = createIdStore(pinnedBlockstore);
    this.version = version$1(this.root);
    this.config = config(this.root);
    this.spec = spec(this.root);
    this.apiAddr = apiAddr(this.root);
    this.gcLock = createMortice({
      name: path,
      singleProcess: this.options.repoOwner !== false
    });
    this.gc = gc({ gcLock: this.gcLock, pins: this.pins, blockstore: this.blocks, root: this.root, loadCodec });
  }
  async init(config2) {
    log("initializing at: %s", this.path);
    await this._openRoot();
    await this.config.replace(buildConfig(config2));
    await this.spec.set(buildDatastoreSpec(config2));
    await this.version.set(repoVersion);
  }
  async isInitialized() {
    if (!this.closed) {
      return true;
    }
    try {
      await this._openRoot();
      await this._checkInitialized();
      await this.root.close();
      return true;
    } catch (err) {
      return false;
    }
  }
  async open() {
    if (!this.closed) {
      throw errCode(new Error("repo is already open"), ERR_REPO_ALREADY_OPEN);
    }
    log("opening at: %s", this.path);
    try {
      await this._openRoot();
      await this._checkInitialized();
      this._lockfile = await this._openLock();
      log("acquired repo.lock");
      const isCompatible = await this.version.check(repoVersion);
      if (!isCompatible) {
        if (await this._isAutoMigrationEnabled()) {
          await this._migrate(repoVersion, {
            root: this.root,
            datastore: this.datastore,
            pins: this.pins.pinstore,
            blocks: this.pins.blockstore,
            keys: this.keys
          });
        } else {
          throw new InvalidRepoVersionError("Incompatible repo versions. Automatic migrations disabled. Please migrate the repo manually.");
        }
      }
      log("creating datastore");
      await this.datastore.open();
      log("creating blocks");
      await this.blocks.open();
      log("creating keystore");
      await this.keys.open();
      log("creating pins");
      await this.pins.pinstore.open();
      this.closed = false;
      log("all opened");
    } catch (err) {
      if (this._lockfile) {
        try {
          await this._closeLock();
          this._lockfile = null;
        } catch (err2) {
          log("error removing lock", err2);
        }
      }
      throw err;
    }
  }
  async _openRoot() {
    try {
      await this.root.open();
    } catch (err) {
      if (err.message !== "Already open") {
        throw err;
      }
    }
  }
  async _openLock() {
    const lockfile = await this.options.repoLock.lock(this.path);
    if (typeof lockfile.close !== "function") {
      throw errCode(new Error("Locks must have a close method"), "ERR_NO_CLOSE_FUNCTION");
    }
    return lockfile;
  }
  _closeLock() {
    return this._lockfile && this._lockfile.close();
  }
  async _checkInitialized() {
    log("init check");
    let config2;
    try {
      [config2] = await Promise.all([
        this.config.exists(),
        this.spec.exists(),
        this.version.exists()
      ]);
    } catch (err) {
      if (err.code === "ERR_NOT_FOUND") {
        throw errCode(new Error("repo is not initialized yet"), ERR_REPO_NOT_INITIALIZED, {
          path: this.path
        });
      }
      throw err;
    }
    if (!config2) {
      throw errCode(new Error("repo is not initialized yet"), ERR_REPO_NOT_INITIALIZED, {
        path: this.path
      });
    }
  }
  async close() {
    if (this.closed) {
      throw errCode(new Error("repo is already closed"), ERR_REPO_ALREADY_CLOSED);
    }
    log("closing at: %s", this.path);
    try {
      await this.apiAddr.delete();
    } catch (err) {
      if (err.code !== ERR_REPO_NOT_INITIALIZED && !err.message.startsWith("ENOENT")) {
        throw err;
      }
    }
    await Promise.all([
      this.root,
      this.blocks,
      this.keys,
      this.datastore,
      this.pins.pinstore
    ].map((store) => store && store.close()));
    log("unlocking");
    this.closed = true;
    await this._closeLock();
  }
  exists() {
    return this.version.exists();
  }
  async stat() {
    if (this.datastore && this.keys) {
      const [storageMax, blocks, version2, datastore, keys] = await Promise.all([
        this._storageMaxStat(),
        this._blockStat(),
        this.version.get(),
        getSize(this.datastore),
        getSize(this.keys)
      ]);
      const size = blocks.size + datastore + keys;
      return {
        repoPath: this.path,
        storageMax,
        version: version2,
        numObjects: blocks.count,
        repoSize: size
      };
    }
    throw errCode(new Error("repo is not initialized yet"), ERR_REPO_NOT_INITIALIZED, {
      path: this.path
    });
  }
  async _isAutoMigrationEnabled() {
    if (this.options.autoMigrate !== void 0) {
      return this.options.autoMigrate;
    }
    let autoMigrateConfig;
    try {
      autoMigrateConfig = await this.config.get(AUTO_MIGRATE_CONFIG_KEY);
    } catch (e) {
      if (e.code === NotFoundError.code) {
        autoMigrateConfig = true;
      } else {
        throw e;
      }
    }
    return autoMigrateConfig;
  }
  async _migrate(toVersion, backends) {
    const currentRepoVersion = await this.version.get();
    if (currentRepoVersion > toVersion) {
      log(`reverting to version ${toVersion}`);
      return revert(this.path, backends, this.options, toVersion, {
        ignoreLock: true,
        onProgress: this.options.onMigrationProgress
      });
    } else {
      log(`migrating to version ${toVersion}`);
      return migrate(this.path, backends, this.options, toVersion, {
        ignoreLock: true,
        onProgress: this.options.onMigrationProgress
      });
    }
  }
  async _storageMaxStat() {
    try {
      const max = await this.config.get("Datastore.StorageMax");
      return BigInt(bytes$1.exports(max));
    } catch (err) {
      return BigInt(noLimit);
    }
  }
  async _blockStat() {
    let count = BigInt(0);
    let size = BigInt(0);
    if (this.blocks) {
      for await (const { key, value } of this.blocks.query({})) {
        count += BigInt(1);
        size += BigInt(value.byteLength);
        size += BigInt(key.bytes.byteLength);
      }
    }
    return { count, size };
  }
}
async function getSize(datastore) {
  let sum = BigInt(0);
  for await (const block of datastore.query({})) {
    sum += BigInt(block.value.byteLength);
    sum += BigInt(block.key.uint8Array().byteLength);
  }
  return sum;
}
function createRepo(path, loadCodec, backends, options) {
  return new Repo(path, loadCodec, backends, options);
}
function buildConfig(_config) {
  _config.Datastore = Object.assign({}, defaultDatastore, objectSafeGet(_config, "datastore"));
  return _config;
}
function buildDatastoreSpec(_config) {
  const spec2 = {
    ...defaultDatastore.Spec,
    ...objectSafeGet(_config, "Datastore.Spec")
  };
  return {
    type: spec2.type,
    mounts: spec2.mounts.map((mounting) => ({
      mountpoint: mounting.mountpoint,
      type: mounting.child.type,
      path: mounting.child.path,
      shardFunc: mounting.child.shardFunc
    }))
  };
}
const SHARDING_FN = "SHARDING";
const README_FN = "_README";
const all = async (source) => {
  const arr = [];
  for await (const entry of source) {
    arr.push(entry);
  }
  return arr;
};
var itAll = all;
new Key(SHARDING_FN);
new Key(README_FN);
debug.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc$8.baseEncode(v);
};
debug.formatters.t = (v) => {
  return v == null ? "undefined" : base32$b.baseEncode(v);
};
debug.formatters.m = (v) => {
  return v == null ? "undefined" : base64$7.baseEncode(v);
};
debug.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
debug.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
debug.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
function logger(name2) {
  return Object.assign(debug(name2), {
    error: debug(`${name2}:error`),
    trace: debug(`${name2}:trace`)
  });
}
logger("datastore:core:tiered");
var browserLevel = {};
var abstractLevel$1 = {};
var abstractLevel = {};
var levelSupports = {};
levelSupports.supports = function supports2(...manifests) {
  const manifest = manifests.reduce((acc, m) => Object.assign(acc, m), {});
  return Object.assign(manifest, {
    snapshots: manifest.snapshots || false,
    permanence: manifest.permanence || false,
    seek: manifest.seek || false,
    clear: manifest.clear || false,
    getMany: manifest.getMany || false,
    keyIterator: manifest.keyIterator || false,
    valueIterator: manifest.valueIterator || false,
    iteratorNextv: manifest.iteratorNextv || false,
    iteratorAll: manifest.iteratorAll || false,
    status: manifest.status || false,
    createIfMissing: manifest.createIfMissing || false,
    errorIfExists: manifest.errorIfExists || false,
    deferredOpen: manifest.deferredOpen || false,
    promises: manifest.promises || false,
    streams: manifest.streams || false,
    encodings: Object.assign({}, manifest.encodings),
    events: Object.assign({}, manifest.events),
    additionalMethods: Object.assign({}, manifest.additionalMethods)
  });
};
var levelTranscoder = {};
var moduleError = class ModuleError2 extends Error {
  constructor(message, options) {
    super(message || "");
    if (typeof options === "object" && options !== null) {
      if (options.code)
        this.code = String(options.code);
      if (options.expected)
        this.expected = true;
      if (options.transient)
        this.transient = true;
      if (options.cause)
        this.cause = options.cause;
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var encodings$1 = {};
let lazy = null;
var textEndec$1 = function() {
  if (lazy === null) {
    lazy = {
      textEncoder: new TextEncoder(),
      textDecoder: new TextDecoder()
    };
  }
  return lazy;
};
var formats$2 = {};
var encoding = {};
const ModuleError$8 = moduleError;
const formats$1 = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
class Encoding$2 {
  constructor(options) {
    this.encode = options.encode || this.encode;
    this.decode = options.decode || this.decode;
    this.name = options.name || this.name;
    this.format = options.format || this.format;
    if (typeof this.encode !== "function") {
      throw new TypeError("The 'encode' property must be a function");
    }
    if (typeof this.decode !== "function") {
      throw new TypeError("The 'decode' property must be a function");
    }
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
    if (typeof this.name !== "string" || this.name === "") {
      throw new TypeError("The 'name' property must be a string");
    }
    if (typeof this.format !== "string" || !formats$1.has(this.format)) {
      throw new TypeError("The 'format' property must be one of 'buffer', 'view', 'utf8'");
    }
    if (options.createViewTranscoder) {
      this.createViewTranscoder = options.createViewTranscoder;
    }
    if (options.createBufferTranscoder) {
      this.createBufferTranscoder = options.createBufferTranscoder;
    }
    if (options.createUTF8Transcoder) {
      this.createUTF8Transcoder = options.createUTF8Transcoder;
    }
  }
  get commonName() {
    return this.name.split("+")[0];
  }
  createBufferTranscoder() {
    throw new ModuleError$8(`Encoding '${this.name}' cannot be transcoded to 'buffer'`, {
      code: "LEVEL_ENCODING_NOT_SUPPORTED"
    });
  }
  createViewTranscoder() {
    throw new ModuleError$8(`Encoding '${this.name}' cannot be transcoded to 'view'`, {
      code: "LEVEL_ENCODING_NOT_SUPPORTED"
    });
  }
  createUTF8Transcoder() {
    throw new ModuleError$8(`Encoding '${this.name}' cannot be transcoded to 'utf8'`, {
      code: "LEVEL_ENCODING_NOT_SUPPORTED"
    });
  }
}
encoding.Encoding = Encoding$2;
const { Buffer: Buffer$1 } = buffer$1 || {};
const { Encoding: Encoding$1 } = encoding;
const textEndec = textEndec$1;
class BufferFormat$2 extends Encoding$1 {
  constructor(options) {
    super({ ...options, format: "buffer" });
  }
  createViewTranscoder() {
    return new ViewFormat$2({
      encode: this.encode,
      decode: (data) => this.decode(
        Buffer$1.from(data.buffer, data.byteOffset, data.byteLength)
      ),
      name: `${this.name}+view`
    });
  }
  createBufferTranscoder() {
    return this;
  }
}
class ViewFormat$2 extends Encoding$1 {
  constructor(options) {
    super({ ...options, format: "view" });
  }
  createBufferTranscoder() {
    return new BufferFormat$2({
      encode: (data) => {
        const view = this.encode(data);
        return Buffer$1.from(view.buffer, view.byteOffset, view.byteLength);
      },
      decode: this.decode,
      name: `${this.name}+buffer`
    });
  }
  createViewTranscoder() {
    return this;
  }
}
class UTF8Format$2 extends Encoding$1 {
  constructor(options) {
    super({ ...options, format: "utf8" });
  }
  createBufferTranscoder() {
    return new BufferFormat$2({
      encode: (data) => Buffer$1.from(this.encode(data), "utf8"),
      decode: (data) => this.decode(data.toString("utf8")),
      name: `${this.name}+buffer`
    });
  }
  createViewTranscoder() {
    const { textEncoder: textEncoder2, textDecoder: textDecoder2 } = textEndec();
    return new ViewFormat$2({
      encode: (data) => textEncoder2.encode(this.encode(data)),
      decode: (data) => this.decode(textDecoder2.decode(data)),
      name: `${this.name}+view`
    });
  }
  createUTF8Transcoder() {
    return this;
  }
}
formats$2.BufferFormat = BufferFormat$2;
formats$2.ViewFormat = ViewFormat$2;
formats$2.UTF8Format = UTF8Format$2;
const { Buffer } = buffer$1 || { Buffer: { isBuffer: () => false } };
const { textEncoder: textEncoder$1, textDecoder } = textEndec$1();
const { BufferFormat: BufferFormat$1, ViewFormat: ViewFormat$1, UTF8Format: UTF8Format$1 } = formats$2;
const identity = (v) => v;
encodings$1.utf8 = new UTF8Format$1({
  encode: function(data) {
    return Buffer.isBuffer(data) ? data.toString("utf8") : ArrayBuffer.isView(data) ? textDecoder.decode(data) : String(data);
  },
  decode: identity,
  name: "utf8",
  createViewTranscoder() {
    return new ViewFormat$1({
      encode: function(data) {
        return ArrayBuffer.isView(data) ? data : textEncoder$1.encode(data);
      },
      decode: function(data) {
        return textDecoder.decode(data);
      },
      name: `${this.name}+view`
    });
  },
  createBufferTranscoder() {
    return new BufferFormat$1({
      encode: function(data) {
        return Buffer.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer.from(data.buffer, data.byteOffset, data.byteLength) : Buffer.from(String(data), "utf8");
      },
      decode: function(data) {
        return data.toString("utf8");
      },
      name: `${this.name}+buffer`
    });
  }
});
encodings$1.json = new UTF8Format$1({
  encode: JSON.stringify,
  decode: JSON.parse,
  name: "json"
});
encodings$1.buffer = new BufferFormat$1({
  encode: function(data) {
    return Buffer.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer.from(data.buffer, data.byteOffset, data.byteLength) : Buffer.from(String(data), "utf8");
  },
  decode: identity,
  name: "buffer",
  createViewTranscoder() {
    return new ViewFormat$1({
      encode: function(data) {
        return ArrayBuffer.isView(data) ? data : Buffer.from(String(data), "utf8");
      },
      decode: function(data) {
        return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      },
      name: `${this.name}+view`
    });
  }
});
encodings$1.view = new ViewFormat$1({
  encode: function(data) {
    return ArrayBuffer.isView(data) ? data : textEncoder$1.encode(data);
  },
  decode: identity,
  name: "view",
  createBufferTranscoder() {
    return new BufferFormat$1({
      encode: function(data) {
        return Buffer.isBuffer(data) ? data : ArrayBuffer.isView(data) ? Buffer.from(data.buffer, data.byteOffset, data.byteLength) : Buffer.from(String(data), "utf8");
      },
      decode: identity,
      name: `${this.name}+buffer`
    });
  }
});
encodings$1.hex = new BufferFormat$1({
  encode: function(data) {
    return Buffer.isBuffer(data) ? data : Buffer.from(String(data), "hex");
  },
  decode: function(buffer2) {
    return buffer2.toString("hex");
  },
  name: "hex"
});
encodings$1.base64 = new BufferFormat$1({
  encode: function(data) {
    return Buffer.isBuffer(data) ? data : Buffer.from(String(data), "base64");
  },
  decode: function(buffer2) {
    return buffer2.toString("base64");
  },
  name: "base64"
});
const ModuleError$7 = moduleError;
const encodings = encodings$1;
const { Encoding } = encoding;
const { BufferFormat, ViewFormat, UTF8Format } = formats$2;
const kFormats = Symbol("formats");
const kEncodings = Symbol("encodings");
const validFormats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
class Transcoder$1 {
  constructor(formats2) {
    if (!Array.isArray(formats2)) {
      throw new TypeError("The first argument 'formats' must be an array");
    } else if (!formats2.every((f) => validFormats.has(f))) {
      throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
    }
    this[kEncodings] = /* @__PURE__ */ new Map();
    this[kFormats] = new Set(formats2);
    for (const k in encodings) {
      try {
        this.encoding(k);
      } catch (err) {
        if (err.code !== "LEVEL_ENCODING_NOT_SUPPORTED")
          throw err;
      }
    }
  }
  encodings() {
    return Array.from(new Set(this[kEncodings].values()));
  }
  encoding(encoding2) {
    let resolved = this[kEncodings].get(encoding2);
    if (resolved === void 0) {
      if (typeof encoding2 === "string" && encoding2 !== "") {
        resolved = lookup[encoding2];
        if (!resolved) {
          throw new ModuleError$7(`Encoding '${encoding2}' is not found`, {
            code: "LEVEL_ENCODING_NOT_FOUND"
          });
        }
      } else if (typeof encoding2 !== "object" || encoding2 === null) {
        throw new TypeError("First argument 'encoding' must be a string or object");
      } else {
        resolved = from$3(encoding2);
      }
      const { name: name2, format: format2 } = resolved;
      if (!this[kFormats].has(format2)) {
        if (this[kFormats].has("view")) {
          resolved = resolved.createViewTranscoder();
        } else if (this[kFormats].has("buffer")) {
          resolved = resolved.createBufferTranscoder();
        } else if (this[kFormats].has("utf8")) {
          resolved = resolved.createUTF8Transcoder();
        } else {
          throw new ModuleError$7(`Encoding '${name2}' cannot be transcoded`, {
            code: "LEVEL_ENCODING_NOT_SUPPORTED"
          });
        }
      }
      for (const k of [encoding2, name2, resolved.name, resolved.commonName]) {
        this[kEncodings].set(k, resolved);
      }
    }
    return resolved;
  }
}
levelTranscoder.Transcoder = Transcoder$1;
function from$3(options) {
  if (options instanceof Encoding) {
    return options;
  }
  const maybeType = "type" in options && typeof options.type === "string" ? options.type : void 0;
  const name2 = options.name || maybeType || `anonymous-${anonymousCount++}`;
  switch (detectFormat(options)) {
    case "view":
      return new ViewFormat({ ...options, name: name2 });
    case "utf8":
      return new UTF8Format({ ...options, name: name2 });
    case "buffer":
      return new BufferFormat({ ...options, name: name2 });
    default: {
      throw new TypeError("Format must be one of 'buffer', 'view', 'utf8'");
    }
  }
}
function detectFormat(options) {
  if ("format" in options && options.format !== void 0) {
    return options.format;
  } else if ("buffer" in options && typeof options.buffer === "boolean") {
    return options.buffer ? "buffer" : "utf8";
  } else if ("code" in options && Number.isInteger(options.code)) {
    return "view";
  } else {
    return "buffer";
  }
}
const aliases = {
  binary: encodings.buffer,
  "utf-8": encodings.utf8
};
const lookup = {
  ...encodings,
  ...aliases
};
let anonymousCount = 0;
var catering = {};
var nextTickBrowser$1 = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => Promise.resolve().then(fn);
var nextTick = nextTickBrowser$1;
catering.fromCallback = function(callback, symbol2) {
  if (callback === void 0) {
    var promise2 = new Promise(function(resolve, reject) {
      callback = function(err, res) {
        if (err)
          reject(err);
        else
          resolve(res);
      };
    });
    callback[symbol2 !== void 0 ? symbol2 : "promise"] = promise2;
  } else if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }
  return callback;
};
catering.fromPromise = function(promise2, callback) {
  if (callback === void 0)
    return promise2;
  promise2.then(function(res) {
    nextTick(() => callback(null, res));
  }).catch(function(err) {
    nextTick(() => callback(err));
  });
};
var abstractIterator = {};
var common = {};
common.getCallback = function(options, callback) {
  return typeof options === "function" ? options : callback;
};
common.getOptions = function(options, def) {
  if (typeof options === "object" && options !== null) {
    return options;
  }
  if (def !== void 0) {
    return def;
  }
  return {};
};
const { fromCallback: fromCallback$3 } = catering;
const ModuleError$6 = moduleError;
const { getOptions: getOptions$2, getCallback: getCallback$2 } = common;
const kPromise$3 = Symbol("promise");
const kCallback$1 = Symbol("callback");
const kWorking = Symbol("working");
const kHandleOne$1 = Symbol("handleOne");
const kHandleMany$1 = Symbol("handleMany");
const kAutoClose = Symbol("autoClose");
const kFinishWork = Symbol("finishWork");
const kReturnMany = Symbol("returnMany");
const kClosing = Symbol("closing");
const kHandleClose = Symbol("handleClose");
const kClosed = Symbol("closed");
const kCloseCallbacks$1 = Symbol("closeCallbacks");
const kKeyEncoding$1 = Symbol("keyEncoding");
const kValueEncoding$1 = Symbol("valueEncoding");
const kAbortOnClose = Symbol("abortOnClose");
const kLegacy = Symbol("legacy");
const kKeys = Symbol("keys");
const kValues = Symbol("values");
const kLimit = Symbol("limit");
const kCount = Symbol("count");
const emptyOptions$1 = Object.freeze({});
const noop$1 = () => {
};
let warnedEnd = false;
class CommonIterator {
  constructor(db, options, legacy) {
    if (typeof db !== "object" || db === null) {
      const hint = db === null ? "null" : typeof db;
      throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
    }
    if (typeof options !== "object" || options === null) {
      throw new TypeError("The second argument must be an options object");
    }
    this[kClosed] = false;
    this[kCloseCallbacks$1] = [];
    this[kWorking] = false;
    this[kClosing] = false;
    this[kAutoClose] = false;
    this[kCallback$1] = null;
    this[kHandleOne$1] = this[kHandleOne$1].bind(this);
    this[kHandleMany$1] = this[kHandleMany$1].bind(this);
    this[kHandleClose] = this[kHandleClose].bind(this);
    this[kKeyEncoding$1] = options[kKeyEncoding$1];
    this[kValueEncoding$1] = options[kValueEncoding$1];
    this[kLegacy] = legacy;
    this[kLimit] = Number.isInteger(options.limit) && options.limit >= 0 ? options.limit : Infinity;
    this[kCount] = 0;
    this[kAbortOnClose] = !!options.abortOnClose;
    this.db = db;
    this.db.attachResource(this);
    this.nextTick = db.nextTick;
  }
  get count() {
    return this[kCount];
  }
  get limit() {
    return this[kLimit];
  }
  next(callback) {
    let promise2;
    if (callback === void 0) {
      promise2 = new Promise((resolve, reject) => {
        callback = (err, key, value) => {
          if (err)
            reject(err);
          else if (!this[kLegacy])
            resolve(key);
          else if (key === void 0 && value === void 0)
            resolve();
          else
            resolve([key, value]);
        };
      });
    } else if (typeof callback !== "function") {
      throw new TypeError("Callback must be a function");
    }
    if (this[kClosing]) {
      this.nextTick(callback, new ModuleError$6("Iterator is not open: cannot call next() after close()", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
    } else if (this[kWorking]) {
      this.nextTick(callback, new ModuleError$6("Iterator is busy: cannot call next() until previous call has completed", {
        code: "LEVEL_ITERATOR_BUSY"
      }));
    } else {
      this[kWorking] = true;
      this[kCallback$1] = callback;
      if (this[kCount] >= this[kLimit])
        this.nextTick(this[kHandleOne$1], null);
      else
        this._next(this[kHandleOne$1]);
    }
    return promise2;
  }
  _next(callback) {
    this.nextTick(callback);
  }
  nextv(size, options, callback) {
    callback = getCallback$2(options, callback);
    callback = fromCallback$3(callback, kPromise$3);
    options = getOptions$2(options, emptyOptions$1);
    if (!Number.isInteger(size)) {
      this.nextTick(callback, new TypeError("The first argument 'size' must be an integer"));
      return callback[kPromise$3];
    }
    if (this[kClosing]) {
      this.nextTick(callback, new ModuleError$6("Iterator is not open: cannot call nextv() after close()", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
    } else if (this[kWorking]) {
      this.nextTick(callback, new ModuleError$6("Iterator is busy: cannot call nextv() until previous call has completed", {
        code: "LEVEL_ITERATOR_BUSY"
      }));
    } else {
      if (size < 1)
        size = 1;
      if (this[kLimit] < Infinity)
        size = Math.min(size, this[kLimit] - this[kCount]);
      this[kWorking] = true;
      this[kCallback$1] = callback;
      if (size <= 0)
        this.nextTick(this[kHandleMany$1], null, []);
      else
        this._nextv(size, options, this[kHandleMany$1]);
    }
    return callback[kPromise$3];
  }
  _nextv(size, options, callback) {
    const acc = [];
    const onnext = (err, key, value) => {
      if (err) {
        return callback(err);
      } else if (this[kLegacy] ? key === void 0 && value === void 0 : key === void 0) {
        return callback(null, acc);
      }
      acc.push(this[kLegacy] ? [key, value] : key);
      if (acc.length === size) {
        callback(null, acc);
      } else {
        this._next(onnext);
      }
    };
    this._next(onnext);
  }
  all(options, callback) {
    callback = getCallback$2(options, callback);
    callback = fromCallback$3(callback, kPromise$3);
    options = getOptions$2(options, emptyOptions$1);
    if (this[kClosing]) {
      this.nextTick(callback, new ModuleError$6("Iterator is not open: cannot call all() after close()", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
    } else if (this[kWorking]) {
      this.nextTick(callback, new ModuleError$6("Iterator is busy: cannot call all() until previous call has completed", {
        code: "LEVEL_ITERATOR_BUSY"
      }));
    } else {
      this[kWorking] = true;
      this[kCallback$1] = callback;
      this[kAutoClose] = true;
      if (this[kCount] >= this[kLimit])
        this.nextTick(this[kHandleMany$1], null, []);
      else
        this._all(options, this[kHandleMany$1]);
    }
    return callback[kPromise$3];
  }
  _all(options, callback) {
    let count = this[kCount];
    const acc = [];
    const nextv = () => {
      const size = this[kLimit] < Infinity ? Math.min(1e3, this[kLimit] - count) : 1e3;
      if (size <= 0) {
        this.nextTick(callback, null, acc);
      } else {
        this._nextv(size, emptyOptions$1, onnextv);
      }
    };
    const onnextv = (err, items) => {
      if (err) {
        callback(err);
      } else if (items.length === 0) {
        callback(null, acc);
      } else {
        acc.push.apply(acc, items);
        count += items.length;
        nextv();
      }
    };
    nextv();
  }
  [kFinishWork]() {
    const cb = this[kCallback$1];
    if (this[kAbortOnClose] && cb === null)
      return noop$1;
    this[kWorking] = false;
    this[kCallback$1] = null;
    if (this[kClosing])
      this._close(this[kHandleClose]);
    return cb;
  }
  [kReturnMany](cb, err, items) {
    if (this[kAutoClose]) {
      this.close(cb.bind(null, err, items));
    } else {
      cb(err, items);
    }
  }
  seek(target, options) {
    options = getOptions$2(options, emptyOptions$1);
    if (this[kClosing])
      ;
    else if (this[kWorking]) {
      throw new ModuleError$6("Iterator is busy: cannot call seek() until next() has completed", {
        code: "LEVEL_ITERATOR_BUSY"
      });
    } else {
      const keyEncoding = this.db.keyEncoding(options.keyEncoding || this[kKeyEncoding$1]);
      const keyFormat = keyEncoding.format;
      if (options.keyEncoding !== keyFormat) {
        options = { ...options, keyEncoding: keyFormat };
      }
      const mapped = this.db.prefixKey(keyEncoding.encode(target), keyFormat);
      this._seek(mapped, options);
    }
  }
  _seek(target, options) {
    throw new ModuleError$6("Iterator does not support seek()", {
      code: "LEVEL_NOT_SUPPORTED"
    });
  }
  close(callback) {
    callback = fromCallback$3(callback, kPromise$3);
    if (this[kClosed]) {
      this.nextTick(callback);
    } else if (this[kClosing]) {
      this[kCloseCallbacks$1].push(callback);
    } else {
      this[kClosing] = true;
      this[kCloseCallbacks$1].push(callback);
      if (!this[kWorking]) {
        this._close(this[kHandleClose]);
      } else if (this[kAbortOnClose]) {
        const cb = this[kFinishWork]();
        cb(new ModuleError$6("Aborted on iterator close()", {
          code: "LEVEL_ITERATOR_NOT_OPEN"
        }));
      }
    }
    return callback[kPromise$3];
  }
  _close(callback) {
    this.nextTick(callback);
  }
  [kHandleClose]() {
    this[kClosed] = true;
    this.db.detachResource(this);
    const callbacks = this[kCloseCallbacks$1];
    this[kCloseCallbacks$1] = [];
    for (const cb of callbacks) {
      cb();
    }
  }
  async *[Symbol.asyncIterator]() {
    try {
      let item;
      while ((item = await this.next()) !== void 0) {
        yield item;
      }
    } finally {
      if (!this[kClosed])
        await this.close();
    }
  }
}
class AbstractIterator$3 extends CommonIterator {
  constructor(db, options) {
    super(db, options, true);
    this[kKeys] = options.keys !== false;
    this[kValues] = options.values !== false;
  }
  [kHandleOne$1](err, key, value) {
    const cb = this[kFinishWork]();
    if (err)
      return cb(err);
    try {
      key = this[kKeys] && key !== void 0 ? this[kKeyEncoding$1].decode(key) : void 0;
      value = this[kValues] && value !== void 0 ? this[kValueEncoding$1].decode(value) : void 0;
    } catch (err2) {
      return cb(new IteratorDecodeError("entry", err2));
    }
    if (!(key === void 0 && value === void 0)) {
      this[kCount]++;
    }
    cb(null, key, value);
  }
  [kHandleMany$1](err, entries) {
    const cb = this[kFinishWork]();
    if (err)
      return this[kReturnMany](cb, err);
    try {
      for (const entry of entries) {
        const key = entry[0];
        const value = entry[1];
        entry[0] = this[kKeys] && key !== void 0 ? this[kKeyEncoding$1].decode(key) : void 0;
        entry[1] = this[kValues] && value !== void 0 ? this[kValueEncoding$1].decode(value) : void 0;
      }
    } catch (err2) {
      return this[kReturnMany](cb, new IteratorDecodeError("entries", err2));
    }
    this[kCount] += entries.length;
    this[kReturnMany](cb, null, entries);
  }
  end(callback) {
    if (!warnedEnd && typeof console !== "undefined") {
      warnedEnd = true;
      console.warn(new ModuleError$6(
        "The iterator.end() method was renamed to close() and end() is an alias that will be removed in a future version",
        { code: "LEVEL_LEGACY" }
      ));
    }
    return this.close(callback);
  }
}
class AbstractKeyIterator$2 extends CommonIterator {
  constructor(db, options) {
    super(db, options, false);
  }
  [kHandleOne$1](err, key) {
    const cb = this[kFinishWork]();
    if (err)
      return cb(err);
    try {
      key = key !== void 0 ? this[kKeyEncoding$1].decode(key) : void 0;
    } catch (err2) {
      return cb(new IteratorDecodeError("key", err2));
    }
    if (key !== void 0)
      this[kCount]++;
    cb(null, key);
  }
  [kHandleMany$1](err, keys) {
    const cb = this[kFinishWork]();
    if (err)
      return this[kReturnMany](cb, err);
    try {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        keys[i] = key !== void 0 ? this[kKeyEncoding$1].decode(key) : void 0;
      }
    } catch (err2) {
      return this[kReturnMany](cb, new IteratorDecodeError("keys", err2));
    }
    this[kCount] += keys.length;
    this[kReturnMany](cb, null, keys);
  }
}
class AbstractValueIterator$2 extends CommonIterator {
  constructor(db, options) {
    super(db, options, false);
  }
  [kHandleOne$1](err, value) {
    const cb = this[kFinishWork]();
    if (err)
      return cb(err);
    try {
      value = value !== void 0 ? this[kValueEncoding$1].decode(value) : void 0;
    } catch (err2) {
      return cb(new IteratorDecodeError("value", err2));
    }
    if (value !== void 0)
      this[kCount]++;
    cb(null, value);
  }
  [kHandleMany$1](err, values) {
    const cb = this[kFinishWork]();
    if (err)
      return this[kReturnMany](cb, err);
    try {
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        values[i] = value !== void 0 ? this[kValueEncoding$1].decode(value) : void 0;
      }
    } catch (err2) {
      return this[kReturnMany](cb, new IteratorDecodeError("values", err2));
    }
    this[kCount] += values.length;
    this[kReturnMany](cb, null, values);
  }
}
class IteratorDecodeError extends ModuleError$6 {
  constructor(subject, cause) {
    super(`Iterator could not decode ${subject}`, {
      code: "LEVEL_DECODE_ERROR",
      cause
    });
  }
}
for (const k of ["_ended property", "_nexting property", "_end method"]) {
  Object.defineProperty(AbstractIterator$3.prototype, k.split(" ")[0], {
    get() {
      throw new ModuleError$6(`The ${k} has been removed`, { code: "LEVEL_LEGACY" });
    },
    set() {
      throw new ModuleError$6(`The ${k} has been removed`, { code: "LEVEL_LEGACY" });
    }
  });
}
AbstractIterator$3.keyEncoding = kKeyEncoding$1;
AbstractIterator$3.valueEncoding = kValueEncoding$1;
abstractIterator.AbstractIterator = AbstractIterator$3;
abstractIterator.AbstractKeyIterator = AbstractKeyIterator$2;
abstractIterator.AbstractValueIterator = AbstractValueIterator$2;
var defaultKvIterator = {};
const { AbstractKeyIterator: AbstractKeyIterator$1, AbstractValueIterator: AbstractValueIterator$1 } = abstractIterator;
const kIterator = Symbol("iterator");
const kCallback = Symbol("callback");
const kHandleOne = Symbol("handleOne");
const kHandleMany = Symbol("handleMany");
class DefaultKeyIterator$1 extends AbstractKeyIterator$1 {
  constructor(db, options) {
    super(db, options);
    this[kIterator] = db.iterator({ ...options, keys: true, values: false });
    this[kHandleOne] = this[kHandleOne].bind(this);
    this[kHandleMany] = this[kHandleMany].bind(this);
  }
}
class DefaultValueIterator$1 extends AbstractValueIterator$1 {
  constructor(db, options) {
    super(db, options);
    this[kIterator] = db.iterator({ ...options, keys: false, values: true });
    this[kHandleOne] = this[kHandleOne].bind(this);
    this[kHandleMany] = this[kHandleMany].bind(this);
  }
}
for (const Iterator2 of [DefaultKeyIterator$1, DefaultValueIterator$1]) {
  const keys = Iterator2 === DefaultKeyIterator$1;
  const mapEntry = keys ? (entry) => entry[0] : (entry) => entry[1];
  Iterator2.prototype._next = function(callback) {
    this[kCallback] = callback;
    this[kIterator].next(this[kHandleOne]);
  };
  Iterator2.prototype[kHandleOne] = function(err, key, value) {
    const callback = this[kCallback];
    if (err)
      callback(err);
    else
      callback(null, keys ? key : value);
  };
  Iterator2.prototype._nextv = function(size, options, callback) {
    this[kCallback] = callback;
    this[kIterator].nextv(size, options, this[kHandleMany]);
  };
  Iterator2.prototype._all = function(options, callback) {
    this[kCallback] = callback;
    this[kIterator].all(options, this[kHandleMany]);
  };
  Iterator2.prototype[kHandleMany] = function(err, entries) {
    const callback = this[kCallback];
    if (err)
      callback(err);
    else
      callback(null, entries.map(mapEntry));
  };
  Iterator2.prototype._seek = function(target, options) {
    this[kIterator].seek(target, options);
  };
  Iterator2.prototype._close = function(callback) {
    this[kIterator].close(callback);
  };
}
defaultKvIterator.DefaultKeyIterator = DefaultKeyIterator$1;
defaultKvIterator.DefaultValueIterator = DefaultValueIterator$1;
var deferredIterator = {};
const { AbstractIterator: AbstractIterator$2, AbstractKeyIterator, AbstractValueIterator } = abstractIterator;
const ModuleError$5 = moduleError;
const kNut = Symbol("nut");
const kUndefer$1 = Symbol("undefer");
const kFactory = Symbol("factory");
class DeferredIterator$1 extends AbstractIterator$2 {
  constructor(db, options) {
    super(db, options);
    this[kNut] = null;
    this[kFactory] = () => db.iterator(options);
    this.db.defer(() => this[kUndefer$1]());
  }
}
class DeferredKeyIterator$1 extends AbstractKeyIterator {
  constructor(db, options) {
    super(db, options);
    this[kNut] = null;
    this[kFactory] = () => db.keys(options);
    this.db.defer(() => this[kUndefer$1]());
  }
}
class DeferredValueIterator$1 extends AbstractValueIterator {
  constructor(db, options) {
    super(db, options);
    this[kNut] = null;
    this[kFactory] = () => db.values(options);
    this.db.defer(() => this[kUndefer$1]());
  }
}
for (const Iterator2 of [DeferredIterator$1, DeferredKeyIterator$1, DeferredValueIterator$1]) {
  Iterator2.prototype[kUndefer$1] = function() {
    if (this.db.status === "open") {
      this[kNut] = this[kFactory]();
    }
  };
  Iterator2.prototype._next = function(callback) {
    if (this[kNut] !== null) {
      this[kNut].next(callback);
    } else if (this.db.status === "opening") {
      this.db.defer(() => this._next(callback));
    } else {
      this.nextTick(callback, new ModuleError$5("Iterator is not open: cannot call next() after close()", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
    }
  };
  Iterator2.prototype._nextv = function(size, options, callback) {
    if (this[kNut] !== null) {
      this[kNut].nextv(size, options, callback);
    } else if (this.db.status === "opening") {
      this.db.defer(() => this._nextv(size, options, callback));
    } else {
      this.nextTick(callback, new ModuleError$5("Iterator is not open: cannot call nextv() after close()", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
    }
  };
  Iterator2.prototype._all = function(options, callback) {
    if (this[kNut] !== null) {
      this[kNut].all(callback);
    } else if (this.db.status === "opening") {
      this.db.defer(() => this._all(options, callback));
    } else {
      this.nextTick(callback, new ModuleError$5("Iterator is not open: cannot call all() after close()", {
        code: "LEVEL_ITERATOR_NOT_OPEN"
      }));
    }
  };
  Iterator2.prototype._seek = function(target, options) {
    if (this[kNut] !== null) {
      this[kNut]._seek(target, options);
    } else if (this.db.status === "opening") {
      this.db.defer(() => this._seek(target, options));
    }
  };
  Iterator2.prototype._close = function(callback) {
    if (this[kNut] !== null) {
      this[kNut].close(callback);
    } else if (this.db.status === "opening") {
      this.db.defer(() => this._close(callback));
    } else {
      this.nextTick(callback);
    }
  };
}
deferredIterator.DeferredIterator = DeferredIterator$1;
deferredIterator.DeferredKeyIterator = DeferredKeyIterator$1;
deferredIterator.DeferredValueIterator = DeferredValueIterator$1;
var defaultChainedBatch = {};
var abstractChainedBatch = {};
const { fromCallback: fromCallback$2 } = catering;
const ModuleError$4 = moduleError;
const { getCallback: getCallback$1, getOptions: getOptions$1 } = common;
const kPromise$2 = Symbol("promise");
const kStatus$1 = Symbol("status");
const kOperations$1 = Symbol("operations");
const kFinishClose = Symbol("finishClose");
const kCloseCallbacks = Symbol("closeCallbacks");
class AbstractChainedBatch$1 {
  constructor(db) {
    if (typeof db !== "object" || db === null) {
      const hint = db === null ? "null" : typeof db;
      throw new TypeError(`The first argument must be an abstract-level database, received ${hint}`);
    }
    this[kOperations$1] = [];
    this[kCloseCallbacks] = [];
    this[kStatus$1] = "open";
    this[kFinishClose] = this[kFinishClose].bind(this);
    this.db = db;
    this.db.attachResource(this);
    this.nextTick = db.nextTick;
  }
  get length() {
    return this[kOperations$1].length;
  }
  put(key, value, options) {
    if (this[kStatus$1] !== "open") {
      throw new ModuleError$4("Batch is not open: cannot call put() after write() or close()", {
        code: "LEVEL_BATCH_NOT_OPEN"
      });
    }
    const err = this.db._checkKey(key) || this.db._checkValue(value);
    if (err)
      throw err;
    const db = options && options.sublevel != null ? options.sublevel : this.db;
    const original = options;
    const keyEncoding = db.keyEncoding(options && options.keyEncoding);
    const valueEncoding = db.valueEncoding(options && options.valueEncoding);
    const keyFormat = keyEncoding.format;
    options = { ...options, keyEncoding: keyFormat, valueEncoding: valueEncoding.format };
    if (db !== this.db) {
      options.sublevel = null;
    }
    const mappedKey = db.prefixKey(keyEncoding.encode(key), keyFormat);
    const mappedValue = valueEncoding.encode(value);
    this._put(mappedKey, mappedValue, options);
    this[kOperations$1].push({ ...original, type: "put", key, value });
    return this;
  }
  _put(key, value, options) {
  }
  del(key, options) {
    if (this[kStatus$1] !== "open") {
      throw new ModuleError$4("Batch is not open: cannot call del() after write() or close()", {
        code: "LEVEL_BATCH_NOT_OPEN"
      });
    }
    const err = this.db._checkKey(key);
    if (err)
      throw err;
    const db = options && options.sublevel != null ? options.sublevel : this.db;
    const original = options;
    const keyEncoding = db.keyEncoding(options && options.keyEncoding);
    const keyFormat = keyEncoding.format;
    options = { ...options, keyEncoding: keyFormat };
    if (db !== this.db) {
      options.sublevel = null;
    }
    this._del(db.prefixKey(keyEncoding.encode(key), keyFormat), options);
    this[kOperations$1].push({ ...original, type: "del", key });
    return this;
  }
  _del(key, options) {
  }
  clear() {
    if (this[kStatus$1] !== "open") {
      throw new ModuleError$4("Batch is not open: cannot call clear() after write() or close()", {
        code: "LEVEL_BATCH_NOT_OPEN"
      });
    }
    this._clear();
    this[kOperations$1] = [];
    return this;
  }
  _clear() {
  }
  write(options, callback) {
    callback = getCallback$1(options, callback);
    callback = fromCallback$2(callback, kPromise$2);
    options = getOptions$1(options);
    if (this[kStatus$1] !== "open") {
      this.nextTick(callback, new ModuleError$4("Batch is not open: cannot call write() after write() or close()", {
        code: "LEVEL_BATCH_NOT_OPEN"
      }));
    } else if (this.length === 0) {
      this.close(callback);
    } else {
      this[kStatus$1] = "writing";
      this._write(options, (err) => {
        this[kStatus$1] = "closing";
        this[kCloseCallbacks].push(() => callback(err));
        if (!err)
          this.db.emit("batch", this[kOperations$1]);
        this._close(this[kFinishClose]);
      });
    }
    return callback[kPromise$2];
  }
  _write(options, callback) {
  }
  close(callback) {
    callback = fromCallback$2(callback, kPromise$2);
    if (this[kStatus$1] === "closing") {
      this[kCloseCallbacks].push(callback);
    } else if (this[kStatus$1] === "closed") {
      this.nextTick(callback);
    } else {
      this[kCloseCallbacks].push(callback);
      if (this[kStatus$1] !== "writing") {
        this[kStatus$1] = "closing";
        this._close(this[kFinishClose]);
      }
    }
    return callback[kPromise$2];
  }
  _close(callback) {
    this.nextTick(callback);
  }
  [kFinishClose]() {
    this[kStatus$1] = "closed";
    this.db.detachResource(this);
    const callbacks = this[kCloseCallbacks];
    this[kCloseCallbacks] = [];
    for (const cb of callbacks) {
      cb();
    }
  }
}
abstractChainedBatch.AbstractChainedBatch = AbstractChainedBatch$1;
const { AbstractChainedBatch } = abstractChainedBatch;
const ModuleError$3 = moduleError;
const kEncoded = Symbol("encoded");
class DefaultChainedBatch$1 extends AbstractChainedBatch {
  constructor(db) {
    super(db);
    this[kEncoded] = [];
  }
  _put(key, value, options) {
    this[kEncoded].push({ ...options, type: "put", key, value });
  }
  _del(key, options) {
    this[kEncoded].push({ ...options, type: "del", key });
  }
  _clear() {
    this[kEncoded] = [];
  }
  _write(options, callback) {
    if (this.db.status === "opening") {
      this.db.defer(() => this._write(options, callback));
    } else if (this.db.status === "open") {
      if (this[kEncoded].length === 0)
        this.nextTick(callback);
      else
        this.db._batch(this[kEncoded], options, callback);
    } else {
      this.nextTick(callback, new ModuleError$3("Batch is not open: cannot call write() after write() or close()", {
        code: "LEVEL_BATCH_NOT_OPEN"
      }));
    }
  }
}
defaultChainedBatch.DefaultChainedBatch = DefaultChainedBatch$1;
const ModuleError$2 = moduleError;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const rangeOptions$1 = /* @__PURE__ */ new Set(["lt", "lte", "gt", "gte"]);
var rangeOptions_1 = function(options, keyEncoding) {
  const result = {};
  for (const k in options) {
    if (!hasOwnProperty.call(options, k))
      continue;
    if (k === "keyEncoding" || k === "valueEncoding")
      continue;
    if (k === "start" || k === "end") {
      throw new ModuleError$2(`The legacy range option '${k}' has been removed`, {
        code: "LEVEL_LEGACY"
      });
    } else if (k === "encoding") {
      throw new ModuleError$2("The levelup-style 'encoding' alias has been removed, use 'valueEncoding' instead", {
        code: "LEVEL_LEGACY"
      });
    }
    if (rangeOptions$1.has(k)) {
      result[k] = keyEncoding.encode(options[k]);
    } else {
      result[k] = options[k];
    }
  }
  result.reverse = !!result.reverse;
  result.limit = Number.isInteger(result.limit) && result.limit >= 0 ? result.limit : -1;
  return result;
};
var nextTickBrowser;
var hasRequiredNextTickBrowser;
function requireNextTickBrowser() {
  if (hasRequiredNextTickBrowser)
    return nextTickBrowser;
  hasRequiredNextTickBrowser = 1;
  const queueMicrotask2 = queueMicrotask_1;
  nextTickBrowser = function(fn, ...args) {
    if (args.length === 0) {
      queueMicrotask2(fn);
    } else {
      queueMicrotask2(() => fn(...args));
    }
  };
  return nextTickBrowser;
}
var abstractSublevelIterator = {};
var hasRequiredAbstractSublevelIterator;
function requireAbstractSublevelIterator() {
  if (hasRequiredAbstractSublevelIterator)
    return abstractSublevelIterator;
  hasRequiredAbstractSublevelIterator = 1;
  const { AbstractIterator: AbstractIterator2, AbstractKeyIterator: AbstractKeyIterator2, AbstractValueIterator: AbstractValueIterator2 } = abstractIterator;
  const kUnfix = Symbol("unfix");
  const kIterator2 = Symbol("iterator");
  const kHandleOne2 = Symbol("handleOne");
  const kHandleMany2 = Symbol("handleMany");
  const kCallback2 = Symbol("callback");
  class AbstractSublevelIterator extends AbstractIterator2 {
    constructor(db, options, iterator2, unfix) {
      super(db, options);
      this[kIterator2] = iterator2;
      this[kUnfix] = unfix;
      this[kHandleOne2] = this[kHandleOne2].bind(this);
      this[kHandleMany2] = this[kHandleMany2].bind(this);
      this[kCallback2] = null;
    }
    [kHandleOne2](err, key, value) {
      const callback = this[kCallback2];
      if (err)
        return callback(err);
      if (key !== void 0)
        key = this[kUnfix](key);
      callback(err, key, value);
    }
    [kHandleMany2](err, entries) {
      const callback = this[kCallback2];
      if (err)
        return callback(err);
      for (const entry of entries) {
        const key = entry[0];
        if (key !== void 0)
          entry[0] = this[kUnfix](key);
      }
      callback(err, entries);
    }
  }
  class AbstractSublevelKeyIterator extends AbstractKeyIterator2 {
    constructor(db, options, iterator2, unfix) {
      super(db, options);
      this[kIterator2] = iterator2;
      this[kUnfix] = unfix;
      this[kHandleOne2] = this[kHandleOne2].bind(this);
      this[kHandleMany2] = this[kHandleMany2].bind(this);
      this[kCallback2] = null;
    }
    [kHandleOne2](err, key) {
      const callback = this[kCallback2];
      if (err)
        return callback(err);
      if (key !== void 0)
        key = this[kUnfix](key);
      callback(err, key);
    }
    [kHandleMany2](err, keys) {
      const callback = this[kCallback2];
      if (err)
        return callback(err);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== void 0)
          keys[i] = this[kUnfix](key);
      }
      callback(err, keys);
    }
  }
  class AbstractSublevelValueIterator extends AbstractValueIterator2 {
    constructor(db, options, iterator2) {
      super(db, options);
      this[kIterator2] = iterator2;
    }
  }
  for (const Iterator2 of [AbstractSublevelIterator, AbstractSublevelKeyIterator]) {
    Iterator2.prototype._next = function(callback) {
      this[kCallback2] = callback;
      this[kIterator2].next(this[kHandleOne2]);
    };
    Iterator2.prototype._nextv = function(size, options, callback) {
      this[kCallback2] = callback;
      this[kIterator2].nextv(size, options, this[kHandleMany2]);
    };
    Iterator2.prototype._all = function(options, callback) {
      this[kCallback2] = callback;
      this[kIterator2].all(options, this[kHandleMany2]);
    };
  }
  for (const Iterator2 of [AbstractSublevelValueIterator]) {
    Iterator2.prototype._next = function(callback) {
      this[kIterator2].next(callback);
    };
    Iterator2.prototype._nextv = function(size, options, callback) {
      this[kIterator2].nextv(size, options, callback);
    };
    Iterator2.prototype._all = function(options, callback) {
      this[kIterator2].all(options, callback);
    };
  }
  for (const Iterator2 of [AbstractSublevelIterator, AbstractSublevelKeyIterator, AbstractSublevelValueIterator]) {
    Iterator2.prototype._seek = function(target, options) {
      this[kIterator2].seek(target, options);
    };
    Iterator2.prototype._close = function(callback) {
      this[kIterator2].close(callback);
    };
  }
  abstractSublevelIterator.AbstractSublevelIterator = AbstractSublevelIterator;
  abstractSublevelIterator.AbstractSublevelKeyIterator = AbstractSublevelKeyIterator;
  abstractSublevelIterator.AbstractSublevelValueIterator = AbstractSublevelValueIterator;
  return abstractSublevelIterator;
}
var abstractSublevel;
var hasRequiredAbstractSublevel;
function requireAbstractSublevel() {
  if (hasRequiredAbstractSublevel)
    return abstractSublevel;
  hasRequiredAbstractSublevel = 1;
  const ModuleError3 = moduleError;
  const { Buffer: Buffer2 } = buffer$1 || {};
  const {
    AbstractSublevelIterator,
    AbstractSublevelKeyIterator,
    AbstractSublevelValueIterator
  } = requireAbstractSublevelIterator();
  const kPrefix = Symbol("prefix");
  const kUpperBound = Symbol("upperBound");
  const kPrefixRange = Symbol("prefixRange");
  const kParent = Symbol("parent");
  const kUnfix = Symbol("unfix");
  const textEncoder2 = new TextEncoder();
  const defaults = { separator: "!" };
  abstractSublevel = function({ AbstractLevel: AbstractLevel2 }) {
    class AbstractSublevel2 extends AbstractLevel2 {
      static defaults(options) {
        if (typeof options === "string") {
          throw new ModuleError3("The subleveldown string shorthand for { separator } has been removed", {
            code: "LEVEL_LEGACY"
          });
        } else if (options && options.open) {
          throw new ModuleError3("The subleveldown open option has been removed", {
            code: "LEVEL_LEGACY"
          });
        }
        if (options == null) {
          return defaults;
        } else if (!options.separator) {
          return { ...options, separator: "!" };
        } else {
          return options;
        }
      }
      constructor(db, name2, options) {
        const { separator, manifest, ...forward } = AbstractSublevel2.defaults(options);
        name2 = trim(name2, separator);
        const reserved = separator.charCodeAt(0) + 1;
        const parent = db[kParent] || db;
        if (!textEncoder2.encode(name2).every((x) => x > reserved && x < 127)) {
          throw new ModuleError3(`Prefix must use bytes > ${reserved} < ${127}`, {
            code: "LEVEL_INVALID_PREFIX"
          });
        }
        super(mergeManifests(parent, manifest), forward);
        const prefix = (db.prefix || "") + separator + name2 + separator;
        const upperBound = prefix.slice(0, -1) + String.fromCharCode(reserved);
        this[kParent] = parent;
        this[kPrefix] = new MultiFormat(prefix);
        this[kUpperBound] = new MultiFormat(upperBound);
        this[kUnfix] = new Unfixer();
        this.nextTick = parent.nextTick;
      }
      prefixKey(key, keyFormat) {
        if (keyFormat === "utf8") {
          return this[kPrefix].utf8 + key;
        } else if (key.byteLength === 0) {
          return this[kPrefix][keyFormat];
        } else if (keyFormat === "view") {
          const view = this[kPrefix].view;
          const result = new Uint8Array(view.byteLength + key.byteLength);
          result.set(view, 0);
          result.set(key, view.byteLength);
          return result;
        } else {
          const buffer2 = this[kPrefix].buffer;
          return Buffer2.concat([buffer2, key], buffer2.byteLength + key.byteLength);
        }
      }
      [kPrefixRange](range, keyFormat) {
        if (range.gte !== void 0) {
          range.gte = this.prefixKey(range.gte, keyFormat);
        } else if (range.gt !== void 0) {
          range.gt = this.prefixKey(range.gt, keyFormat);
        } else {
          range.gte = this[kPrefix][keyFormat];
        }
        if (range.lte !== void 0) {
          range.lte = this.prefixKey(range.lte, keyFormat);
        } else if (range.lt !== void 0) {
          range.lt = this.prefixKey(range.lt, keyFormat);
        } else {
          range.lte = this[kUpperBound][keyFormat];
        }
      }
      get prefix() {
        return this[kPrefix].utf8;
      }
      get db() {
        return this[kParent];
      }
      _open(options, callback) {
        this[kParent].open({ passive: true }, callback);
      }
      _put(key, value, options, callback) {
        this[kParent].put(key, value, options, callback);
      }
      _get(key, options, callback) {
        this[kParent].get(key, options, callback);
      }
      _getMany(keys, options, callback) {
        this[kParent].getMany(keys, options, callback);
      }
      _del(key, options, callback) {
        this[kParent].del(key, options, callback);
      }
      _batch(operations, options, callback) {
        this[kParent].batch(operations, options, callback);
      }
      _clear(options, callback) {
        this[kPrefixRange](options, options.keyEncoding);
        this[kParent].clear(options, callback);
      }
      _iterator(options) {
        this[kPrefixRange](options, options.keyEncoding);
        const iterator2 = this[kParent].iterator(options);
        const unfix = this[kUnfix].get(this[kPrefix].utf8.length, options.keyEncoding);
        return new AbstractSublevelIterator(this, options, iterator2, unfix);
      }
      _keys(options) {
        this[kPrefixRange](options, options.keyEncoding);
        const iterator2 = this[kParent].keys(options);
        const unfix = this[kUnfix].get(this[kPrefix].utf8.length, options.keyEncoding);
        return new AbstractSublevelKeyIterator(this, options, iterator2, unfix);
      }
      _values(options) {
        this[kPrefixRange](options, options.keyEncoding);
        const iterator2 = this[kParent].values(options);
        return new AbstractSublevelValueIterator(this, options, iterator2);
      }
    }
    return { AbstractSublevel: AbstractSublevel2 };
  };
  const mergeManifests = function(parent, manifest) {
    return {
      ...parent.supports,
      createIfMissing: false,
      errorIfExists: false,
      events: {},
      additionalMethods: {},
      ...manifest,
      encodings: {
        utf8: supportsEncoding(parent, "utf8"),
        buffer: supportsEncoding(parent, "buffer"),
        view: supportsEncoding(parent, "view")
      }
    };
  };
  const supportsEncoding = function(parent, encoding2) {
    return parent.supports.encodings[encoding2] ? parent.keyEncoding(encoding2).name === encoding2 : false;
  };
  class MultiFormat {
    constructor(key) {
      this.utf8 = key;
      this.view = textEncoder2.encode(key);
      this.buffer = Buffer2 ? Buffer2.from(this.view.buffer, 0, this.view.byteLength) : {};
    }
  }
  class Unfixer {
    constructor() {
      this.cache = /* @__PURE__ */ new Map();
    }
    get(prefixLength, keyFormat) {
      let unfix = this.cache.get(keyFormat);
      if (unfix === void 0) {
        if (keyFormat === "view") {
          unfix = function(prefixLength2, key) {
            return key.subarray(prefixLength2);
          }.bind(null, prefixLength);
        } else {
          unfix = function(prefixLength2, key) {
            return key.slice(prefixLength2);
          }.bind(null, prefixLength);
        }
        this.cache.set(keyFormat, unfix);
      }
      return unfix;
    }
  }
  const trim = function(str, char) {
    let start = 0;
    let end2 = str.length;
    while (start < end2 && str[start] === char)
      start++;
    while (end2 > start && str[end2 - 1] === char)
      end2--;
    return str.slice(start, end2);
  };
  return abstractSublevel;
}
const { supports } = levelSupports;
const { Transcoder } = levelTranscoder;
const { EventEmitter } = events$1.exports;
const { fromCallback: fromCallback$1 } = catering;
const ModuleError$1 = moduleError;
const { AbstractIterator: AbstractIterator$1 } = abstractIterator;
const { DefaultKeyIterator, DefaultValueIterator } = defaultKvIterator;
const { DeferredIterator, DeferredKeyIterator, DeferredValueIterator } = deferredIterator;
const { DefaultChainedBatch } = defaultChainedBatch;
const { getCallback, getOptions } = common;
const rangeOptions = rangeOptions_1;
const kPromise$1 = Symbol("promise");
const kLanded = Symbol("landed");
const kResources = Symbol("resources");
const kCloseResources = Symbol("closeResources");
const kOperations = Symbol("operations");
const kUndefer = Symbol("undefer");
const kDeferOpen = Symbol("deferOpen");
const kOptions$1 = Symbol("options");
const kStatus = Symbol("status");
const kDefaultOptions = Symbol("defaultOptions");
const kTranscoder = Symbol("transcoder");
const kKeyEncoding = Symbol("keyEncoding");
const kValueEncoding = Symbol("valueEncoding");
const noop = () => {
};
class AbstractLevel$1 extends EventEmitter {
  constructor(manifest, options) {
    super();
    if (typeof manifest !== "object" || manifest === null) {
      throw new TypeError("The first argument 'manifest' must be an object");
    }
    options = getOptions(options);
    const { keyEncoding, valueEncoding, passive, ...forward } = options;
    this[kResources] = /* @__PURE__ */ new Set();
    this[kOperations] = [];
    this[kDeferOpen] = true;
    this[kOptions$1] = forward;
    this[kStatus] = "opening";
    this.supports = supports(manifest, {
      status: true,
      promises: true,
      clear: true,
      getMany: true,
      deferredOpen: true,
      snapshots: manifest.snapshots !== false,
      permanence: manifest.permanence !== false,
      keyIterator: true,
      valueIterator: true,
      iteratorNextv: true,
      iteratorAll: true,
      encodings: manifest.encodings || {},
      events: Object.assign({}, manifest.events, {
        opening: true,
        open: true,
        closing: true,
        closed: true,
        put: true,
        del: true,
        batch: true,
        clear: true
      })
    });
    this[kTranscoder] = new Transcoder(formats(this));
    this[kKeyEncoding] = this[kTranscoder].encoding(keyEncoding || "utf8");
    this[kValueEncoding] = this[kTranscoder].encoding(valueEncoding || "utf8");
    for (const encoding2 of this[kTranscoder].encodings()) {
      if (!this.supports.encodings[encoding2.commonName]) {
        this.supports.encodings[encoding2.commonName] = true;
      }
    }
    this[kDefaultOptions] = {
      empty: Object.freeze({}),
      entry: Object.freeze({
        keyEncoding: this[kKeyEncoding].commonName,
        valueEncoding: this[kValueEncoding].commonName
      }),
      key: Object.freeze({
        keyEncoding: this[kKeyEncoding].commonName
      })
    };
    this.nextTick(() => {
      if (this[kDeferOpen]) {
        this.open({ passive: false }, noop);
      }
    });
  }
  get status() {
    return this[kStatus];
  }
  keyEncoding(encoding2) {
    return this[kTranscoder].encoding(encoding2 != null ? encoding2 : this[kKeyEncoding]);
  }
  valueEncoding(encoding2) {
    return this[kTranscoder].encoding(encoding2 != null ? encoding2 : this[kValueEncoding]);
  }
  open(options, callback) {
    callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = { ...this[kOptions$1], ...getOptions(options) };
    options.createIfMissing = options.createIfMissing !== false;
    options.errorIfExists = !!options.errorIfExists;
    const maybeOpened = (err) => {
      if (this[kStatus] === "closing" || this[kStatus] === "opening") {
        this.once(kLanded, err ? () => maybeOpened(err) : maybeOpened);
      } else if (this[kStatus] !== "open") {
        callback(new ModuleError$1("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN",
          cause: err
        }));
      } else {
        callback();
      }
    };
    if (options.passive) {
      if (this[kStatus] === "opening") {
        this.once(kLanded, maybeOpened);
      } else {
        this.nextTick(maybeOpened);
      }
    } else if (this[kStatus] === "closed" || this[kDeferOpen]) {
      this[kDeferOpen] = false;
      this[kStatus] = "opening";
      this.emit("opening");
      this._open(options, (err) => {
        if (err) {
          this[kStatus] = "closed";
          this[kCloseResources](() => {
            this.emit(kLanded);
            maybeOpened(err);
          });
          this[kUndefer]();
          return;
        }
        this[kStatus] = "open";
        this[kUndefer]();
        this.emit(kLanded);
        if (this[kStatus] === "open")
          this.emit("open");
        if (this[kStatus] === "open")
          this.emit("ready");
        maybeOpened();
      });
    } else if (this[kStatus] === "open") {
      this.nextTick(maybeOpened);
    } else {
      this.once(kLanded, () => this.open(options, callback));
    }
    return callback[kPromise$1];
  }
  _open(options, callback) {
    this.nextTick(callback);
  }
  close(callback) {
    callback = fromCallback$1(callback, kPromise$1);
    const maybeClosed = (err) => {
      if (this[kStatus] === "opening" || this[kStatus] === "closing") {
        this.once(kLanded, err ? maybeClosed(err) : maybeClosed);
      } else if (this[kStatus] !== "closed") {
        callback(new ModuleError$1("Database is not closed", {
          code: "LEVEL_DATABASE_NOT_CLOSED",
          cause: err
        }));
      } else {
        callback();
      }
    };
    if (this[kStatus] === "open") {
      this[kStatus] = "closing";
      this.emit("closing");
      const cancel = (err) => {
        this[kStatus] = "open";
        this[kUndefer]();
        this.emit(kLanded);
        maybeClosed(err);
      };
      this[kCloseResources](() => {
        this._close((err) => {
          if (err)
            return cancel(err);
          this[kStatus] = "closed";
          this[kUndefer]();
          this.emit(kLanded);
          if (this[kStatus] === "closed")
            this.emit("closed");
          maybeClosed();
        });
      });
    } else if (this[kStatus] === "closed") {
      this.nextTick(maybeClosed);
    } else {
      this.once(kLanded, () => this.close(callback));
    }
    return callback[kPromise$1];
  }
  [kCloseResources](callback) {
    if (this[kResources].size === 0) {
      return this.nextTick(callback);
    }
    let pending = this[kResources].size;
    let sync = true;
    const next = () => {
      if (--pending === 0) {
        if (sync)
          this.nextTick(callback);
        else
          callback();
      }
    };
    for (const resource of this[kResources]) {
      resource.close(next);
    }
    sync = false;
    this[kResources].clear();
  }
  _close(callback) {
    this.nextTick(callback);
  }
  get(key, options, callback) {
    callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = getOptions(options, this[kDefaultOptions].entry);
    if (this[kStatus] === "opening") {
      this.defer(() => this.get(key, options, callback));
      return callback[kPromise$1];
    }
    if (maybeError(this, callback)) {
      return callback[kPromise$1];
    }
    const err = this._checkKey(key);
    if (err) {
      this.nextTick(callback, err);
      return callback[kPromise$1];
    }
    const keyEncoding = this.keyEncoding(options.keyEncoding);
    const valueEncoding = this.valueEncoding(options.valueEncoding);
    const keyFormat = keyEncoding.format;
    const valueFormat = valueEncoding.format;
    if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
      options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
    }
    this._get(this.prefixKey(keyEncoding.encode(key), keyFormat), options, (err2, value) => {
      if (err2) {
        if (err2.code === "LEVEL_NOT_FOUND" || err2.notFound || /NotFound/i.test(err2)) {
          if (!err2.code)
            err2.code = "LEVEL_NOT_FOUND";
          if (!err2.notFound)
            err2.notFound = true;
          if (!err2.status)
            err2.status = 404;
        }
        return callback(err2);
      }
      try {
        value = valueEncoding.decode(value);
      } catch (err3) {
        return callback(new ModuleError$1("Could not decode value", {
          code: "LEVEL_DECODE_ERROR",
          cause: err3
        }));
      }
      callback(null, value);
    });
    return callback[kPromise$1];
  }
  _get(key, options, callback) {
    this.nextTick(callback, new Error("NotFound"));
  }
  getMany(keys, options, callback) {
    callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = getOptions(options, this[kDefaultOptions].entry);
    if (this[kStatus] === "opening") {
      this.defer(() => this.getMany(keys, options, callback));
      return callback[kPromise$1];
    }
    if (maybeError(this, callback)) {
      return callback[kPromise$1];
    }
    if (!Array.isArray(keys)) {
      this.nextTick(callback, new TypeError("The first argument 'keys' must be an array"));
      return callback[kPromise$1];
    }
    if (keys.length === 0) {
      this.nextTick(callback, null, []);
      return callback[kPromise$1];
    }
    const keyEncoding = this.keyEncoding(options.keyEncoding);
    const valueEncoding = this.valueEncoding(options.valueEncoding);
    const keyFormat = keyEncoding.format;
    const valueFormat = valueEncoding.format;
    if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
      options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
    }
    const mappedKeys = new Array(keys.length);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const err = this._checkKey(key);
      if (err) {
        this.nextTick(callback, err);
        return callback[kPromise$1];
      }
      mappedKeys[i] = this.prefixKey(keyEncoding.encode(key), keyFormat);
    }
    this._getMany(mappedKeys, options, (err, values) => {
      if (err)
        return callback(err);
      try {
        for (let i = 0; i < values.length; i++) {
          if (values[i] !== void 0) {
            values[i] = valueEncoding.decode(values[i]);
          }
        }
      } catch (err2) {
        return callback(new ModuleError$1(`Could not decode one or more of ${values.length} value(s)`, {
          code: "LEVEL_DECODE_ERROR",
          cause: err2
        }));
      }
      callback(null, values);
    });
    return callback[kPromise$1];
  }
  _getMany(keys, options, callback) {
    this.nextTick(callback, null, new Array(keys.length).fill(void 0));
  }
  put(key, value, options, callback) {
    callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = getOptions(options, this[kDefaultOptions].entry);
    if (this[kStatus] === "opening") {
      this.defer(() => this.put(key, value, options, callback));
      return callback[kPromise$1];
    }
    if (maybeError(this, callback)) {
      return callback[kPromise$1];
    }
    const err = this._checkKey(key) || this._checkValue(value);
    if (err) {
      this.nextTick(callback, err);
      return callback[kPromise$1];
    }
    const keyEncoding = this.keyEncoding(options.keyEncoding);
    const valueEncoding = this.valueEncoding(options.valueEncoding);
    const keyFormat = keyEncoding.format;
    const valueFormat = valueEncoding.format;
    if (options.keyEncoding !== keyFormat || options.valueEncoding !== valueFormat) {
      options = Object.assign({}, options, { keyEncoding: keyFormat, valueEncoding: valueFormat });
    }
    const mappedKey = this.prefixKey(keyEncoding.encode(key), keyFormat);
    const mappedValue = valueEncoding.encode(value);
    this._put(mappedKey, mappedValue, options, (err2) => {
      if (err2)
        return callback(err2);
      this.emit("put", key, value);
      callback();
    });
    return callback[kPromise$1];
  }
  _put(key, value, options, callback) {
    this.nextTick(callback);
  }
  del(key, options, callback) {
    callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = getOptions(options, this[kDefaultOptions].key);
    if (this[kStatus] === "opening") {
      this.defer(() => this.del(key, options, callback));
      return callback[kPromise$1];
    }
    if (maybeError(this, callback)) {
      return callback[kPromise$1];
    }
    const err = this._checkKey(key);
    if (err) {
      this.nextTick(callback, err);
      return callback[kPromise$1];
    }
    const keyEncoding = this.keyEncoding(options.keyEncoding);
    const keyFormat = keyEncoding.format;
    if (options.keyEncoding !== keyFormat) {
      options = Object.assign({}, options, { keyEncoding: keyFormat });
    }
    this._del(this.prefixKey(keyEncoding.encode(key), keyFormat), options, (err2) => {
      if (err2)
        return callback(err2);
      this.emit("del", key);
      callback();
    });
    return callback[kPromise$1];
  }
  _del(key, options, callback) {
    this.nextTick(callback);
  }
  batch(operations, options, callback) {
    if (!arguments.length) {
      if (this[kStatus] === "opening")
        return new DefaultChainedBatch(this);
      if (this[kStatus] !== "open") {
        throw new ModuleError$1("Database is not open", {
          code: "LEVEL_DATABASE_NOT_OPEN"
        });
      }
      return this._chainedBatch();
    }
    if (typeof operations === "function")
      callback = operations;
    else
      callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = getOptions(options, this[kDefaultOptions].empty);
    if (this[kStatus] === "opening") {
      this.defer(() => this.batch(operations, options, callback));
      return callback[kPromise$1];
    }
    if (maybeError(this, callback)) {
      return callback[kPromise$1];
    }
    if (!Array.isArray(operations)) {
      this.nextTick(callback, new TypeError("The first argument 'operations' must be an array"));
      return callback[kPromise$1];
    }
    if (operations.length === 0) {
      this.nextTick(callback);
      return callback[kPromise$1];
    }
    const mapped = new Array(operations.length);
    const { keyEncoding: ke, valueEncoding: ve, ...forward } = options;
    for (let i = 0; i < operations.length; i++) {
      if (typeof operations[i] !== "object" || operations[i] === null) {
        this.nextTick(callback, new TypeError("A batch operation must be an object"));
        return callback[kPromise$1];
      }
      const op = Object.assign({}, operations[i]);
      if (op.type !== "put" && op.type !== "del") {
        this.nextTick(callback, new TypeError("A batch operation must have a type property that is 'put' or 'del'"));
        return callback[kPromise$1];
      }
      const err = this._checkKey(op.key);
      if (err) {
        this.nextTick(callback, err);
        return callback[kPromise$1];
      }
      const db = op.sublevel != null ? op.sublevel : this;
      const keyEncoding = db.keyEncoding(op.keyEncoding || ke);
      const keyFormat = keyEncoding.format;
      op.key = db.prefixKey(keyEncoding.encode(op.key), keyFormat);
      op.keyEncoding = keyFormat;
      if (op.type === "put") {
        const valueErr = this._checkValue(op.value);
        if (valueErr) {
          this.nextTick(callback, valueErr);
          return callback[kPromise$1];
        }
        const valueEncoding = db.valueEncoding(op.valueEncoding || ve);
        op.value = valueEncoding.encode(op.value);
        op.valueEncoding = valueEncoding.format;
      }
      if (db !== this) {
        op.sublevel = null;
      }
      mapped[i] = op;
    }
    this._batch(mapped, forward, (err) => {
      if (err)
        return callback(err);
      this.emit("batch", operations);
      callback();
    });
    return callback[kPromise$1];
  }
  _batch(operations, options, callback) {
    this.nextTick(callback);
  }
  sublevel(name2, options) {
    return this._sublevel(name2, AbstractSublevel.defaults(options));
  }
  _sublevel(name2, options) {
    return new AbstractSublevel(this, name2, options);
  }
  prefixKey(key, keyFormat) {
    return key;
  }
  clear(options, callback) {
    callback = getCallback(options, callback);
    callback = fromCallback$1(callback, kPromise$1);
    options = getOptions(options, this[kDefaultOptions].empty);
    if (this[kStatus] === "opening") {
      this.defer(() => this.clear(options, callback));
      return callback[kPromise$1];
    }
    if (maybeError(this, callback)) {
      return callback[kPromise$1];
    }
    const original = options;
    const keyEncoding = this.keyEncoding(options.keyEncoding);
    options = rangeOptions(options, keyEncoding);
    options.keyEncoding = keyEncoding.format;
    if (options.limit === 0) {
      this.nextTick(callback);
    } else {
      this._clear(options, (err) => {
        if (err)
          return callback(err);
        this.emit("clear", original);
        callback();
      });
    }
    return callback[kPromise$1];
  }
  _clear(options, callback) {
    this.nextTick(callback);
  }
  iterator(options) {
    const keyEncoding = this.keyEncoding(options && options.keyEncoding);
    const valueEncoding = this.valueEncoding(options && options.valueEncoding);
    options = rangeOptions(options, keyEncoding);
    options.keys = options.keys !== false;
    options.values = options.values !== false;
    options[AbstractIterator$1.keyEncoding] = keyEncoding;
    options[AbstractIterator$1.valueEncoding] = valueEncoding;
    options.keyEncoding = keyEncoding.format;
    options.valueEncoding = valueEncoding.format;
    if (this[kStatus] === "opening") {
      return new DeferredIterator(this, options);
    } else if (this[kStatus] !== "open") {
      throw new ModuleError$1("Database is not open", {
        code: "LEVEL_DATABASE_NOT_OPEN"
      });
    }
    return this._iterator(options);
  }
  _iterator(options) {
    return new AbstractIterator$1(this, options);
  }
  keys(options) {
    const keyEncoding = this.keyEncoding(options && options.keyEncoding);
    const valueEncoding = this.valueEncoding(options && options.valueEncoding);
    options = rangeOptions(options, keyEncoding);
    options[AbstractIterator$1.keyEncoding] = keyEncoding;
    options[AbstractIterator$1.valueEncoding] = valueEncoding;
    options.keyEncoding = keyEncoding.format;
    options.valueEncoding = valueEncoding.format;
    if (this[kStatus] === "opening") {
      return new DeferredKeyIterator(this, options);
    } else if (this[kStatus] !== "open") {
      throw new ModuleError$1("Database is not open", {
        code: "LEVEL_DATABASE_NOT_OPEN"
      });
    }
    return this._keys(options);
  }
  _keys(options) {
    return new DefaultKeyIterator(this, options);
  }
  values(options) {
    const keyEncoding = this.keyEncoding(options && options.keyEncoding);
    const valueEncoding = this.valueEncoding(options && options.valueEncoding);
    options = rangeOptions(options, keyEncoding);
    options[AbstractIterator$1.keyEncoding] = keyEncoding;
    options[AbstractIterator$1.valueEncoding] = valueEncoding;
    options.keyEncoding = keyEncoding.format;
    options.valueEncoding = valueEncoding.format;
    if (this[kStatus] === "opening") {
      return new DeferredValueIterator(this, options);
    } else if (this[kStatus] !== "open") {
      throw new ModuleError$1("Database is not open", {
        code: "LEVEL_DATABASE_NOT_OPEN"
      });
    }
    return this._values(options);
  }
  _values(options) {
    return new DefaultValueIterator(this, options);
  }
  defer(fn) {
    if (typeof fn !== "function") {
      throw new TypeError("The first argument must be a function");
    }
    this[kOperations].push(fn);
  }
  [kUndefer]() {
    if (this[kOperations].length === 0) {
      return;
    }
    const operations = this[kOperations];
    this[kOperations] = [];
    for (const op of operations) {
      op();
    }
  }
  attachResource(resource) {
    if (typeof resource !== "object" || resource === null || typeof resource.close !== "function") {
      throw new TypeError("The first argument must be a resource object");
    }
    this[kResources].add(resource);
  }
  detachResource(resource) {
    this[kResources].delete(resource);
  }
  _chainedBatch() {
    return new DefaultChainedBatch(this);
  }
  _checkKey(key) {
    if (key === null || key === void 0) {
      return new ModuleError$1("Key cannot be null or undefined", {
        code: "LEVEL_INVALID_KEY"
      });
    }
  }
  _checkValue(value) {
    if (value === null || value === void 0) {
      return new ModuleError$1("Value cannot be null or undefined", {
        code: "LEVEL_INVALID_VALUE"
      });
    }
  }
}
AbstractLevel$1.prototype.nextTick = requireNextTickBrowser();
const { AbstractSublevel } = requireAbstractSublevel()({ AbstractLevel: AbstractLevel$1 });
abstractLevel.AbstractLevel = AbstractLevel$1;
abstractLevel.AbstractSublevel = AbstractSublevel;
const maybeError = function(db, callback) {
  if (db[kStatus] !== "open") {
    db.nextTick(callback, new ModuleError$1("Database is not open", {
      code: "LEVEL_DATABASE_NOT_OPEN"
    }));
    return true;
  }
  return false;
};
const formats = function(db) {
  return Object.keys(db.supports.encodings).filter((k) => !!db.supports.encodings[k]);
};
abstractLevel$1.AbstractLevel = abstractLevel.AbstractLevel;
abstractLevel$1.AbstractSublevel = abstractLevel.AbstractSublevel;
abstractLevel$1.AbstractIterator = abstractIterator.AbstractIterator;
abstractLevel$1.AbstractKeyIterator = abstractIterator.AbstractKeyIterator;
abstractLevel$1.AbstractValueIterator = abstractIterator.AbstractValueIterator;
abstractLevel$1.AbstractChainedBatch = abstractChainedBatch.AbstractChainedBatch;
/*! run-parallel-limit. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var runParallelLimit_1 = runParallelLimit;
const queueMicrotask$1 = queueMicrotask_1;
function runParallelLimit(tasks, limit, cb) {
  if (typeof limit !== "number")
    throw new Error("second argument must be a Number");
  let results, len, pending, keys, isErrored;
  let isSync = true;
  let next;
  if (Array.isArray(tasks)) {
    results = [];
    pending = len = tasks.length;
  } else {
    keys = Object.keys(tasks);
    results = {};
    pending = len = keys.length;
  }
  function done(err) {
    function end2() {
      if (cb)
        cb(err, results);
      cb = null;
    }
    if (isSync)
      queueMicrotask$1(end2);
    else
      end2();
  }
  function each(i, err, result) {
    results[i] = result;
    if (err)
      isErrored = true;
    if (--pending === 0 || err) {
      done(err);
    } else if (!isErrored && next < len) {
      let key;
      if (keys) {
        key = keys[next];
        next += 1;
        tasks[key](function(err2, result2) {
          each(key, err2, result2);
        });
      } else {
        key = next;
        next += 1;
        tasks[key](function(err2, result2) {
          each(key, err2, result2);
        });
      }
    }
  }
  next = limit;
  if (!pending) {
    done(null);
  } else if (keys) {
    keys.some(function(key, i) {
      tasks[key](function(err, result) {
        each(key, err, result);
      });
      if (i === limit - 1)
        return true;
      return false;
    });
  } else {
    tasks.some(function(task, i) {
      task(function(err, result) {
        each(i, err, result);
      });
      if (i === limit - 1)
        return true;
      return false;
    });
  }
  isSync = false;
}
var iterator = {};
var keyRange = function createKeyRange2(options) {
  const lower = options.gte !== void 0 ? options.gte : options.gt !== void 0 ? options.gt : void 0;
  const upper = options.lte !== void 0 ? options.lte : options.lt !== void 0 ? options.lt : void 0;
  const lowerExclusive = options.gte === void 0;
  const upperExclusive = options.lte === void 0;
  if (lower !== void 0 && upper !== void 0) {
    return IDBKeyRange.bound(lower, upper, lowerExclusive, upperExclusive);
  } else if (lower !== void 0) {
    return IDBKeyRange.lowerBound(lower, lowerExclusive);
  } else if (upper !== void 0) {
    return IDBKeyRange.upperBound(upper, upperExclusive);
  } else {
    return null;
  }
};
const textEncoder = new TextEncoder();
var deserialize$2 = function(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return textEncoder.encode(data);
  }
};
const { AbstractIterator } = abstractLevel$1;
const createKeyRange$1 = keyRange;
const deserialize$1 = deserialize$2;
const kCache = Symbol("cache");
const kFinished = Symbol("finished");
const kOptions = Symbol("options");
const kCurrentOptions = Symbol("currentOptions");
const kPosition = Symbol("position");
const kLocation$1 = Symbol("location");
const kFirst = Symbol("first");
const emptyOptions = {};
class Iterator$1 extends AbstractIterator {
  constructor(db, location, options) {
    super(db, options);
    this[kCache] = [];
    this[kFinished] = this.limit === 0;
    this[kOptions] = options;
    this[kCurrentOptions] = { ...options };
    this[kPosition] = void 0;
    this[kLocation$1] = location;
    this[kFirst] = true;
  }
  _nextv(size, options, callback) {
    this[kFirst] = false;
    if (this[kFinished]) {
      return this.nextTick(callback, null, []);
    } else if (this[kCache].length > 0) {
      size = Math.min(size, this[kCache].length);
      return this.nextTick(callback, null, this[kCache].splice(0, size));
    }
    if (this[kPosition] !== void 0) {
      if (this[kOptions].reverse) {
        this[kCurrentOptions].lt = this[kPosition];
        this[kCurrentOptions].lte = void 0;
      } else {
        this[kCurrentOptions].gt = this[kPosition];
        this[kCurrentOptions].gte = void 0;
      }
    }
    let keyRange2;
    try {
      keyRange2 = createKeyRange$1(this[kCurrentOptions]);
    } catch (_) {
      this[kFinished] = true;
      return this.nextTick(callback, null, []);
    }
    const transaction = this.db.db.transaction([this[kLocation$1]], "readonly");
    const store = transaction.objectStore(this[kLocation$1]);
    const entries = [];
    if (!this[kOptions].reverse) {
      let keys;
      let values;
      const complete = () => {
        if (keys === void 0 || values === void 0)
          return;
        const length2 = Math.max(keys.length, values.length);
        if (length2 === 0 || size === Infinity) {
          this[kFinished] = true;
        } else {
          this[kPosition] = keys[length2 - 1];
        }
        entries.length = length2;
        for (let i = 0; i < length2; i++) {
          const key = keys[i];
          const value = values[i];
          entries[i] = [
            this[kOptions].keys && key !== void 0 ? deserialize$1(key) : void 0,
            this[kOptions].values && value !== void 0 ? deserialize$1(value) : void 0
          ];
        }
        maybeCommit(transaction);
      };
      if (this[kOptions].keys || size < Infinity) {
        store.getAllKeys(keyRange2, size < Infinity ? size : void 0).onsuccess = (ev) => {
          keys = ev.target.result;
          complete();
        };
      } else {
        keys = [];
        this.nextTick(complete);
      }
      if (this[kOptions].values) {
        store.getAll(keyRange2, size < Infinity ? size : void 0).onsuccess = (ev) => {
          values = ev.target.result;
          complete();
        };
      } else {
        values = [];
        this.nextTick(complete);
      }
    } else {
      const method = !this[kOptions].values && store.openKeyCursor ? "openKeyCursor" : "openCursor";
      store[method](keyRange2, "prev").onsuccess = (ev) => {
        const cursor = ev.target.result;
        if (cursor) {
          const { key, value } = cursor;
          this[kPosition] = key;
          entries.push([
            this[kOptions].keys && key !== void 0 ? deserialize$1(key) : void 0,
            this[kOptions].values && value !== void 0 ? deserialize$1(value) : void 0
          ]);
          if (entries.length < size) {
            cursor.continue();
          } else {
            maybeCommit(transaction);
          }
        } else {
          this[kFinished] = true;
        }
      };
    }
    transaction.onabort = () => {
      callback(transaction.error || new Error("aborted by user"));
      callback = null;
    };
    transaction.oncomplete = () => {
      callback(null, entries);
      callback = null;
    };
  }
  _next(callback) {
    if (this[kCache].length > 0) {
      const [key, value] = this[kCache].shift();
      this.nextTick(callback, null, key, value);
    } else if (this[kFinished]) {
      this.nextTick(callback);
    } else {
      let size = Math.min(100, this.limit - this.count);
      if (this[kFirst]) {
        this[kFirst] = false;
        size = 1;
      }
      this._nextv(size, emptyOptions, (err, entries) => {
        if (err)
          return callback(err);
        this[kCache] = entries;
        this._next(callback);
      });
    }
  }
  _all(options, callback) {
    this[kFirst] = false;
    const cache = this[kCache].splice(0, this[kCache].length);
    const size = this.limit - this.count - cache.length;
    if (size <= 0) {
      return this.nextTick(callback, null, cache);
    }
    this._nextv(size, emptyOptions, (err, entries) => {
      if (err)
        return callback(err);
      if (cache.length > 0)
        entries = cache.concat(entries);
      callback(null, entries);
    });
  }
  _seek(target, options) {
    this[kFirst] = true;
    this[kCache] = [];
    this[kFinished] = false;
    this[kPosition] = void 0;
    this[kCurrentOptions] = { ...this[kOptions] };
    let keyRange2;
    try {
      keyRange2 = createKeyRange$1(this[kOptions]);
    } catch (_) {
      this[kFinished] = true;
      return;
    }
    if (keyRange2 !== null && !keyRange2.includes(target)) {
      this[kFinished] = true;
    } else if (this[kOptions].reverse) {
      this[kCurrentOptions].lte = target;
    } else {
      this[kCurrentOptions].gte = target;
    }
  }
}
iterator.Iterator = Iterator$1;
function maybeCommit(transaction) {
  if (typeof transaction.commit === "function") {
    transaction.commit();
  }
}
var clear$1 = function clear2(db, location, keyRange2, options, callback) {
  if (options.limit === 0)
    return db.nextTick(callback);
  const transaction = db.db.transaction([location], "readwrite");
  const store = transaction.objectStore(location);
  let count = 0;
  transaction.oncomplete = function() {
    callback();
  };
  transaction.onabort = function() {
    callback(transaction.error || new Error("aborted by user"));
  };
  const method = store.openKeyCursor ? "openKeyCursor" : "openCursor";
  const direction = options.reverse ? "prev" : "next";
  store[method](keyRange2, direction).onsuccess = function(ev) {
    const cursor = ev.target.result;
    if (cursor) {
      store.delete(cursor.key).onsuccess = function() {
        if (options.limit <= 0 || ++count < options.limit) {
          cursor.continue();
        }
      };
    }
  };
};
const { AbstractLevel } = abstractLevel$1;
const ModuleError = moduleError;
const parallel = runParallelLimit_1;
const { fromCallback } = catering;
const { Iterator } = iterator;
const deserialize = deserialize$2;
const clear = clear$1;
const createKeyRange = keyRange;
const DEFAULT_PREFIX = "level-js-";
const kIDB = Symbol("idb");
const kNamePrefix = Symbol("namePrefix");
const kLocation = Symbol("location");
const kVersion = Symbol("version");
const kStore = Symbol("store");
const kOnComplete = Symbol("onComplete");
const kPromise = Symbol("promise");
class BrowserLevel extends AbstractLevel {
  constructor(location, options, _) {
    if (typeof options === "function" || typeof _ === "function") {
      throw new ModuleError("The levelup-style callback argument has been removed", {
        code: "LEVEL_LEGACY"
      });
    }
    const { prefix, version: version2, ...forward } = options || {};
    super({
      encodings: { view: true },
      snapshots: false,
      createIfMissing: false,
      errorIfExists: false,
      seek: true
    }, forward);
    if (typeof location !== "string") {
      throw new Error("constructor requires a location string argument");
    }
    this[kLocation] = location;
    this[kNamePrefix] = prefix == null ? DEFAULT_PREFIX : prefix;
    this[kVersion] = parseInt(version2 || 1, 10);
    this[kIDB] = null;
  }
  get location() {
    return this[kLocation];
  }
  get namePrefix() {
    return this[kNamePrefix];
  }
  get version() {
    return this[kVersion];
  }
  get db() {
    return this[kIDB];
  }
  get type() {
    return "browser-level";
  }
  _open(options, callback) {
    const req = indexedDB.open(this[kNamePrefix] + this[kLocation], this[kVersion]);
    req.onerror = function() {
      callback(req.error || new Error("unknown error"));
    };
    req.onsuccess = () => {
      this[kIDB] = req.result;
      callback();
    };
    req.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(this[kLocation])) {
        db.createObjectStore(this[kLocation]);
      }
    };
  }
  [kStore](mode) {
    const transaction = this[kIDB].transaction([this[kLocation]], mode);
    return transaction.objectStore(this[kLocation]);
  }
  [kOnComplete](request, callback) {
    const transaction = request.transaction;
    transaction.onabort = function() {
      callback(transaction.error || new Error("aborted by user"));
    };
    transaction.oncomplete = function() {
      callback(null, request.result);
    };
  }
  _get(key, options, callback) {
    const store = this[kStore]("readonly");
    let req;
    try {
      req = store.get(key);
    } catch (err) {
      return this.nextTick(callback, err);
    }
    this[kOnComplete](req, function(err, value) {
      if (err)
        return callback(err);
      if (value === void 0) {
        return callback(new ModuleError("Entry not found", {
          code: "LEVEL_NOT_FOUND"
        }));
      }
      callback(null, deserialize(value));
    });
  }
  _getMany(keys, options, callback) {
    const store = this[kStore]("readonly");
    const tasks = keys.map((key) => (next) => {
      let request;
      try {
        request = store.get(key);
      } catch (err) {
        return next(err);
      }
      request.onsuccess = () => {
        const value = request.result;
        next(null, value === void 0 ? value : deserialize(value));
      };
      request.onerror = (ev) => {
        ev.stopPropagation();
        next(request.error);
      };
    });
    parallel(tasks, 16, callback);
  }
  _del(key, options, callback) {
    const store = this[kStore]("readwrite");
    let req;
    try {
      req = store.delete(key);
    } catch (err) {
      return this.nextTick(callback, err);
    }
    this[kOnComplete](req, callback);
  }
  _put(key, value, options, callback) {
    const store = this[kStore]("readwrite");
    let req;
    try {
      req = store.put(value, key);
    } catch (err) {
      return this.nextTick(callback, err);
    }
    this[kOnComplete](req, callback);
  }
  _iterator(options) {
    return new Iterator(this, this[kLocation], options);
  }
  _batch(operations, options, callback) {
    const store = this[kStore]("readwrite");
    const transaction = store.transaction;
    let index = 0;
    let error;
    transaction.onabort = function() {
      callback(error || transaction.error || new Error("aborted by user"));
    };
    transaction.oncomplete = function() {
      callback();
    };
    function loop() {
      const op = operations[index++];
      const key = op.key;
      let req;
      try {
        req = op.type === "del" ? store.delete(key) : store.put(op.value, key);
      } catch (err) {
        error = err;
        transaction.abort();
        return;
      }
      if (index < operations.length) {
        req.onsuccess = loop;
      } else if (typeof transaction.commit === "function") {
        transaction.commit();
      }
    }
    loop();
  }
  _clear(options, callback) {
    let keyRange2;
    let req;
    try {
      keyRange2 = createKeyRange(options);
    } catch (e) {
      return this.nextTick(callback);
    }
    if (options.limit >= 0) {
      return clear(this, this[kLocation], keyRange2, options, callback);
    }
    try {
      const store = this[kStore]("readwrite");
      req = keyRange2 ? store.delete(keyRange2) : store.clear();
    } catch (err) {
      return this.nextTick(callback, err);
    }
    this[kOnComplete](req, callback);
  }
  _close(callback) {
    this[kIDB].close();
    this.nextTick(callback);
  }
}
BrowserLevel.destroy = function(location, prefix, callback) {
  if (typeof prefix === "function") {
    callback = prefix;
    prefix = DEFAULT_PREFIX;
  }
  callback = fromCallback(callback, kPromise);
  const request = indexedDB.deleteDatabase(prefix + location);
  request.onsuccess = function() {
    callback();
  };
  request.onerror = function(err) {
    callback(err);
  };
  return callback[kPromise];
};
browserLevel.BrowserLevel = BrowserLevel;
const equals$3 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$2 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
function base$2(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$2 = base$2;
var _brrp__multiformats_scope_baseX$2 = src$2;
class Encoder$2 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$2 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$2(this, decoder);
  }
}
class ComposedDecoder$2 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$2(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$2 = (left, right) => new ComposedDecoder$2({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$2 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$2(name2, prefix, baseEncode);
    this.decoder = new Decoder$2(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$2 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$2(name2, prefix, encode2, decode2);
const baseX$2 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$2(alphabet2, name2);
  return from$2({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$2(decode2(text))
  });
};
const decode$7 = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$5 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$2 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$2({
    prefix,
    name: name2,
    encode(input) {
      return encode$5(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$7(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$2 = baseX$2({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$2({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$2 = rfc4648$2({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad = rfc4648$2({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$2({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
var encode_1 = encode$4;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode$4(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$4.bytes = offset - oldOffset + 1;
  return out;
}
var decode$6 = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode$6,
  encodingLength: length
};
var _brrp_varint = varint;
const decode$5 = (data, offset = 0) => {
  const code2 = _brrp_varint.decode(data, offset);
  return [
    code2,
    _brrp_varint.decode.bytes
  ];
};
const encodeTo = (int, target, offset = 0) => {
  _brrp_varint.encode(int, target, offset);
  return target;
};
const encodingLength = (int) => {
  return _brrp_varint.encodingLength(int);
};
const equals$2 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce$1 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const create = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes2, 0);
  encodeTo(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes2);
};
const decode$4 = (multihash) => {
  const bytes2 = coerce$1(multihash);
  const [code2, sizeOffset] = decode$5(bytes2);
  const [size, digestOffset] = decode$5(bytes2.subarray(sizeOffset));
  const digest2 = bytes2.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes2);
};
const equals$1 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$2(a.bytes, b.bytes);
  }
};
class Digest {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
}
function base$1(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$1 = base$1;
var _brrp__multiformats_scope_baseX$1 = src$1;
class Encoder$1 {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder$1 {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or$1(this, decoder);
  }
}
class ComposedDecoder$1 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$1(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or$1 = (left, right) => new ComposedDecoder$1({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec$1 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$1(name2, prefix, baseEncode);
    this.decoder = new Decoder$1(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$1 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$1(name2, prefix, encode2, decode2);
const baseX$1 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$1(alphabet2, name2);
  return from$1({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$1(decode2(text))
  });
};
const decode$3 = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$3 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$1 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$1({
    prefix,
    name: name2,
    encode(input) {
      return encode$3(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$3(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$1 = baseX$1({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$1({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$1 = rfc4648$1({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$1({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
class CID {
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this.byteOffset = bytes2.byteOffset;
    this.byteLength = bytes2.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$1(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes: bytes2, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes2, _baseCache, base3 || base58btc$1.encoder);
      default:
        return toStringV1(bytes2, _baseCache, base3 || base32$1.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID(version2, code2, multihash, bytes2 || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$4(multihash);
      return CID.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes2 = encodeCID(version2, code2, digest2.bytes);
        return new CID(version2, code2, digest2, bytes2);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return CID.create(1, code2, digest2);
  }
  static decode(bytes2) {
    const [cid, remainder] = CID.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes2) {
    const specs = CID.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$1(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$5(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes(source, base3);
    const cid = CID.decode(bytes2);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$1;
      return [
        base58btc$1.prefix,
        decoder.decode(`${base58btc$1.prefix}${source}`)
      ];
    }
    case base58btc$1.prefix: {
      const decoder = base3 || base58btc$1;
      return [
        base58btc$1.prefix,
        decoder.decode(source)
      ];
    }
    case base32$1.prefix: {
      const decoder = base3 || base32$1;
      return [
        base32$1.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$1.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes2, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes2, 0);
  encodeTo(code2, bytes2, codeOffset);
  bytes2.set(multihash, hashOffset);
  return bytes2;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version = "0.0.0-dev";
const deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const base64 = rfc4648$1({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
rfc4648$1({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
rfc4648$1({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
rfc4648$1({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
class JSONEncoder extends Array {
  constructor() {
    super();
    this.inRecursive = [];
  }
  prefix(buf2) {
    const recurs = this.inRecursive[this.inRecursive.length - 1];
    if (recurs) {
      if (recurs.type === Type.array) {
        recurs.elements++;
        if (recurs.elements !== 1) {
          buf2.push([44]);
        }
      }
      if (recurs.type === Type.map) {
        recurs.elements++;
        if (recurs.elements !== 1) {
          if (recurs.elements % 2 === 1) {
            buf2.push([44]);
          } else {
            buf2.push([58]);
          }
        }
      }
    }
  }
  [Type.uint.major](buf2, token) {
    this.prefix(buf2);
    const is2 = String(token.value);
    const isa = [];
    for (let i = 0; i < is2.length; i++) {
      isa[i] = is2.charCodeAt(i);
    }
    buf2.push(isa);
  }
  [Type.negint.major](buf2, token) {
    this[Type.uint.major](buf2, token);
  }
  [Type.bytes.major](_buf, _token) {
    throw new Error(`${encodeErrPrefix} unsupported type: Uint8Array`);
  }
  [Type.string.major](buf2, token) {
    this.prefix(buf2);
    const byts = fromString$6(JSON.stringify(token.value));
    buf2.push(byts.length > 32 ? asU8A(byts) : byts);
  }
  [Type.array.major](buf2, _token) {
    this.prefix(buf2);
    this.inRecursive.push({
      type: Type.array,
      elements: 0
    });
    buf2.push([91]);
  }
  [Type.map.major](buf2, _token) {
    this.prefix(buf2);
    this.inRecursive.push({
      type: Type.map,
      elements: 0
    });
    buf2.push([123]);
  }
  [Type.tag.major](_buf, _token) {
  }
  [Type.float.major](buf2, token) {
    if (token.type.name === "break") {
      const recurs = this.inRecursive.pop();
      if (recurs) {
        if (recurs.type === Type.array) {
          buf2.push([93]);
        } else if (recurs.type === Type.map) {
          buf2.push([125]);
        } else {
          throw new Error("Unexpected recursive type; this should not happen!");
        }
        return;
      }
      throw new Error("Unexpected break; this should not happen!");
    }
    if (token.value === void 0) {
      throw new Error(`${encodeErrPrefix} unsupported type: undefined`);
    }
    this.prefix(buf2);
    if (token.type.name === "true") {
      buf2.push([
        116,
        114,
        117,
        101
      ]);
      return;
    } else if (token.type.name === "false") {
      buf2.push([
        102,
        97,
        108,
        115,
        101
      ]);
      return;
    } else if (token.type.name === "null") {
      buf2.push([
        110,
        117,
        108,
        108
      ]);
      return;
    }
    const is2 = String(token.value);
    const isa = [];
    let dp = false;
    for (let i = 0; i < is2.length; i++) {
      isa[i] = is2.charCodeAt(i);
      if (!dp && (isa[i] === 46 || isa[i] === 101 || isa[i] === 69)) {
        dp = true;
      }
    }
    if (!dp) {
      isa.push(46);
      isa.push(48);
    }
    buf2.push(isa);
  }
}
function mapSorter(e1, e2) {
  if (Array.isArray(e1[0]) || Array.isArray(e2[0])) {
    throw new Error(`${encodeErrPrefix} complex map keys are not supported`);
  }
  const keyToken1 = e1[0];
  const keyToken2 = e2[0];
  if (keyToken1.type !== Type.string || keyToken2.type !== Type.string) {
    throw new Error(`${encodeErrPrefix} non-string map keys are not supported`);
  }
  if (keyToken1 < keyToken2) {
    return -1;
  }
  if (keyToken1 > keyToken2) {
    return 1;
  }
  throw new Error(`${encodeErrPrefix} unexpected duplicate map keys, this is not supported`);
}
const defaultEncodeOptions = {
  addBreakTokens: true,
  mapSorter
};
function encode$2(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, new JSONEncoder(), options);
}
class Tokenizer {
  constructor(data, options = {}) {
    this.pos = 0;
    this.data = data;
    this.options = options;
    this.modeStack = ["value"];
    this.lastToken = "";
  }
  done() {
    return this.pos >= this.data.length;
  }
  ch() {
    return this.data[this.pos];
  }
  currentMode() {
    return this.modeStack[this.modeStack.length - 1];
  }
  skipWhitespace() {
    let c = this.ch();
    while (c === 32 || c === 9 || c === 13 || c === 10) {
      c = this.data[++this.pos];
    }
  }
  expect(str) {
    if (this.data.length - this.pos < str.length) {
      throw new Error(`${decodeErrPrefix} unexpected end of input at position ${this.pos}`);
    }
    for (let i = 0; i < str.length; i++) {
      if (this.data[this.pos++] !== str[i]) {
        throw new Error(`${decodeErrPrefix} unexpected token at position ${this.pos}, expected to find '${String.fromCharCode(...str)}'`);
      }
    }
  }
  parseNumber() {
    const startPos = this.pos;
    let negative = false;
    let float2 = false;
    const swallow = (chars) => {
      while (!this.done()) {
        const ch = this.ch();
        if (chars.includes(ch)) {
          this.pos++;
        } else {
          break;
        }
      }
    };
    if (this.ch() === 45) {
      negative = true;
      this.pos++;
    }
    if (this.ch() === 48) {
      this.pos++;
      if (this.ch() === 46) {
        this.pos++;
        float2 = true;
      } else {
        return new Token(Type.uint, 0, this.pos - startPos);
      }
    }
    swallow([
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57
    ]);
    if (negative && this.pos === startPos + 1) {
      throw new Error(`${decodeErrPrefix} unexpected token at position ${this.pos}`);
    }
    if (!this.done() && this.ch() === 46) {
      if (float2) {
        throw new Error(`${decodeErrPrefix} unexpected token at position ${this.pos}`);
      }
      float2 = true;
      this.pos++;
      swallow([
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57
      ]);
    }
    if (!this.done() && (this.ch() === 101 || this.ch() === 69)) {
      float2 = true;
      this.pos++;
      if (!this.done() && (this.ch() === 43 || this.ch() === 45)) {
        this.pos++;
      }
      swallow([
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57
      ]);
    }
    const numStr = String.fromCharCode.apply(null, this.data.subarray(startPos, this.pos));
    const num = parseFloat(numStr);
    if (float2) {
      return new Token(Type.float, num, this.pos - startPos);
    }
    if (this.options.allowBigInt !== true || Number.isSafeInteger(num)) {
      return new Token(num >= 0 ? Type.uint : Type.negint, num, this.pos - startPos);
    }
    return new Token(num >= 0 ? Type.uint : Type.negint, BigInt(numStr), this.pos - startPos);
  }
  parseString() {
    if (this.ch() !== 34) {
      throw new Error(`${decodeErrPrefix} unexpected character at position ${this.pos}; this shouldn't happen`);
    }
    this.pos++;
    for (let i = this.pos, l = 0; i < this.data.length && l < 65536; i++, l++) {
      const ch = this.data[i];
      if (ch === 92 || ch < 32 || ch >= 128) {
        break;
      }
      if (ch === 34) {
        const str = String.fromCharCode.apply(null, this.data.subarray(this.pos, i));
        this.pos = i + 1;
        return new Token(Type.string, str, l);
      }
    }
    const startPos = this.pos;
    const chars = [];
    const readu4 = () => {
      if (this.pos + 4 >= this.data.length) {
        throw new Error(`${decodeErrPrefix} unexpected end of unicode escape sequence at position ${this.pos}`);
      }
      let u4 = 0;
      for (let i = 0; i < 4; i++) {
        let ch = this.ch();
        if (ch >= 48 && ch <= 57) {
          ch -= 48;
        } else if (ch >= 97 && ch <= 102) {
          ch = ch - 97 + 10;
        } else if (ch >= 65 && ch <= 70) {
          ch = ch - 65 + 10;
        } else {
          throw new Error(`${decodeErrPrefix} unexpected unicode escape character at position ${this.pos}`);
        }
        u4 = u4 * 16 + ch;
        this.pos++;
      }
      return u4;
    };
    const readUtf8Char = () => {
      const firstByte = this.ch();
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (this.pos + bytesPerSequence > this.data.length) {
        throw new Error(`${decodeErrPrefix} unexpected unicode sequence at position ${this.pos}`);
      }
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = this.data[this.pos + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = this.data[this.pos + 1];
          thirdByte = this.data[this.pos + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = this.data[this.pos + 1];
          thirdByte = this.data[this.pos + 2];
          fourthByte = this.data[this.pos + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        chars.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      chars.push(codePoint);
      this.pos += bytesPerSequence;
    };
    while (!this.done()) {
      const ch = this.ch();
      let ch1;
      switch (ch) {
        case 92:
          this.pos++;
          if (this.done()) {
            throw new Error(`${decodeErrPrefix} unexpected string termination at position ${this.pos}`);
          }
          ch1 = this.ch();
          this.pos++;
          switch (ch1) {
            case 34:
            case 39:
            case 92:
            case 47:
              chars.push(ch1);
              break;
            case 98:
              chars.push(8);
              break;
            case 116:
              chars.push(9);
              break;
            case 110:
              chars.push(10);
              break;
            case 102:
              chars.push(12);
              break;
            case 114:
              chars.push(13);
              break;
            case 117:
              chars.push(readu4());
              break;
            default:
              throw new Error(`${decodeErrPrefix} unexpected string escape character at position ${this.pos}`);
          }
          break;
        case 34:
          this.pos++;
          return new Token(Type.string, decodeCodePointsArray(chars), this.pos - startPos);
        default:
          if (ch < 32) {
            throw new Error(`${decodeErrPrefix} invalid control character at position ${this.pos}`);
          } else if (ch < 128) {
            chars.push(ch);
            this.pos++;
          } else {
            readUtf8Char();
          }
      }
    }
    throw new Error(`${decodeErrPrefix} unexpected end of string at position ${this.pos}`);
  }
  parseValue() {
    switch (this.ch()) {
      case 123:
        this.modeStack.push("obj-start");
        this.pos++;
        return new Token(Type.map, Infinity, 1);
      case 91:
        this.modeStack.push("array-start");
        this.pos++;
        return new Token(Type.array, Infinity, 1);
      case 34: {
        return this.parseString();
      }
      case 110:
        this.expect([
          110,
          117,
          108,
          108
        ]);
        return new Token(Type.null, null, 4);
      case 102:
        this.expect([
          102,
          97,
          108,
          115,
          101
        ]);
        return new Token(Type.false, false, 5);
      case 116:
        this.expect([
          116,
          114,
          117,
          101
        ]);
        return new Token(Type.true, true, 4);
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.parseNumber();
      default:
        throw new Error(`${decodeErrPrefix} unexpected character at position ${this.pos}`);
    }
  }
  next() {
    this.skipWhitespace();
    switch (this.currentMode()) {
      case "value":
        this.modeStack.pop();
        return this.parseValue();
      case "array-value": {
        this.modeStack.pop();
        if (this.ch() === 93) {
          this.pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        if (this.ch() !== 44) {
          throw new Error(`${decodeErrPrefix} unexpected character at position ${this.pos}, was expecting array delimiter but found '${String.fromCharCode(this.ch())}'`);
        }
        this.pos++;
        this.modeStack.push("array-value");
        this.skipWhitespace();
        return this.parseValue();
      }
      case "array-start": {
        this.modeStack.pop();
        if (this.ch() === 93) {
          this.pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        this.modeStack.push("array-value");
        this.skipWhitespace();
        return this.parseValue();
      }
      case "obj-key":
        if (this.ch() === 125) {
          this.modeStack.pop();
          this.pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        if (this.ch() !== 44) {
          throw new Error(`${decodeErrPrefix} unexpected character at position ${this.pos}, was expecting object delimiter but found '${String.fromCharCode(this.ch())}'`);
        }
        this.pos++;
        this.skipWhitespace();
      case "obj-start": {
        this.modeStack.pop();
        if (this.ch() === 125) {
          this.pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        const token = this.parseString();
        this.skipWhitespace();
        if (this.ch() !== 58) {
          throw new Error(`${decodeErrPrefix} unexpected character at position ${this.pos}, was expecting key/value delimiter ':' but found '${String.fromCharCode(this.ch())}'`);
        }
        this.pos++;
        this.modeStack.push("obj-value");
        return token;
      }
      case "obj-value": {
        this.modeStack.pop();
        this.modeStack.push("obj-key");
        this.skipWhitespace();
        return this.parseValue();
      }
      default:
        throw new Error(`${decodeErrPrefix} unexpected parse state at position ${this.pos}; this shouldn't happen`);
    }
  }
}
function decode$2(data, options) {
  options = Object.assign({ tokenizer: new Tokenizer(data, options) }, options);
  return decode$x(data, options);
}
function cidEncoder(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid = CID.asCID(obj);
  if (!cid) {
    return null;
  }
  const cidString = cid.toString();
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "/", 1),
    new Token(Type.string, cidString, cidString.length),
    new Token(Type.break, void 0, 1)
  ];
}
function bytesEncoder(bytes2) {
  const bytesString = base64.encode(bytes2).slice(1);
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "/", 1),
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "bytes", 5),
    new Token(Type.string, bytesString, bytesString.length),
    new Token(Type.break, void 0, 1),
    new Token(Type.break, void 0, 1)
  ];
}
function undefinedEncoder() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
const encodeOptions = {
  typeEncoders: {
    Object: cidEncoder,
    Uint8Array: bytesEncoder,
    Buffer: bytesEncoder,
    undefined: undefinedEncoder,
    number: numberEncoder
  }
};
class DagJsonTokenizer extends Tokenizer {
  constructor(data, options) {
    super(data, options);
    this.tokenBuffer = [];
  }
  done() {
    return this.tokenBuffer.length === 0 && super.done();
  }
  _next() {
    if (this.tokenBuffer.length > 0) {
      return this.tokenBuffer.pop();
    }
    return super.next();
  }
  next() {
    const token = this._next();
    if (token.type === Type.map) {
      const keyToken = this._next();
      if (keyToken.type === Type.string && keyToken.value === "/") {
        const valueToken = this._next();
        if (valueToken.type === Type.string) {
          const breakToken = this._next();
          if (breakToken.type !== Type.break) {
            throw new Error("Invalid encoded CID form");
          }
          this.tokenBuffer.push(valueToken);
          return new Token(Type.tag, 42, 0);
        }
        if (valueToken.type === Type.map) {
          const innerKeyToken = this._next();
          if (innerKeyToken.type === Type.string && innerKeyToken.value === "bytes") {
            const innerValueToken = this._next();
            if (innerValueToken.type === Type.string) {
              for (let i = 0; i < 2; i++) {
                const breakToken = this._next();
                if (breakToken.type !== Type.break) {
                  throw new Error("Invalid encoded Bytes form");
                }
              }
              const bytes2 = base64.decode(`m${innerValueToken.value}`);
              return new Token(Type.bytes, bytes2, innerValueToken.value.length);
            }
            this.tokenBuffer.push(innerValueToken);
          }
          this.tokenBuffer.push(innerKeyToken);
        }
        this.tokenBuffer.push(valueToken);
      }
      this.tokenBuffer.push(keyToken);
    }
    return token;
  }
}
const decodeOptions = {
  allowIndefinite: false,
  allowUndefined: false,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  strict: true,
  useMaps: false,
  tags: []
};
decodeOptions.tags[42] = CID.parse;
const name = "dag-json";
const code = 297;
const encode$1 = (node) => encode$2(node, encodeOptions);
const decode$1 = (data) => {
  const options = Object.assign(decodeOptions, { tokenizer: new DagJsonTokenizer(data, decodeOptions) });
  return decode$2(data, options);
};
const dagJSON = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name,
  code,
  encode: encode$1,
  decode: decode$1
}, Symbol.toStringTag, { value: "Module" }));
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
const equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
class Encoder {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
}
class ComposedDecoder {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec(name2, prefix, encode2, decode2);
const baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet2, name2);
  return from({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce(decode2(text))
  });
};
const decode = (string2, alphabet2, bitsPerChar, name2) => {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end2 = string2.length;
  while (string2[end2 - 1] === "=") {
    --end2;
  }
  const out = new Uint8Array(end2 * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet2, bitsPerChar, name2);
    }
  });
};
rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
export {
  headerLength as A,
  blockLength as B,
  CarReader as C,
  createWriter as D,
  dagCBOR as E,
  dagJSON as F,
  Key as K,
  MemoryLock as M,
  itDrain as a,
  browser as b,
  itFilter as c,
  browserLevel as d,
  errCode as e,
  dbOpenFailedError as f,
  dbWriteFailedError as g,
  dbDeleteFailedError as h,
  itAll as i,
  coerce$2 as j,
  equals$3 as k,
  base32$2 as l,
  base58btc$2 as m,
  notFoundError as n,
  base32pad as o,
  pushable$1 as p,
  queueMicrotask_1 as q,
  createRepo as r,
  base64url as s,
  coerce as t,
  equals as u,
  base32 as v,
  base58btc as w,
  encode$l as x,
  decode$s as y,
  mitt as z
};
//# sourceMappingURL=base32-9988a49b.js.map
