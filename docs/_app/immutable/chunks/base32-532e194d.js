var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { m as makeCborEncoders, q as quickEncodeToken, T as Token, g as Type, e as encode$n, d as decode$y, c as commonjsGlobal, h as getDefaultExportFromCjs, i as concat$1, j as fromString$5, t as toString$5, k as encode$o, l as decode$z, n as encodeErrPrefix, o as fromString$6, p as asU8A, r as encodeCustom, s as decodeErrPrefix, u as decodeCodePointsArray } from "./_page-a9965d2d.js";
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
var browserExports = {};
var browser = {
  get exports() {
    return browserExports;
  },
  set exports(v) {
    browserExports = v;
  }
};
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
    function debug(...args) {
      if (!debug.enabled) {
        return;
      }
      const self2 = debug;
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
    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy;
    Object.defineProperty(debug, "enabled", {
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
      createDebug.init(debug);
    }
    return debug;
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
var common = setup;
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
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
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
      r = { "NODE_DEBUG": false }.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {
    }
  }
  module.exports = common(exports);
  const { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
})(browser, browserExports);
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
var encode_1$6 = encode$m;
var MSB$8 = 128, REST$8 = 127, MSBALL$6 = ~REST$8, INT$6 = Math.pow(2, 31);
function encode$m(num, out, offset) {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    encode$m.bytes = 0;
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
  encode$m.bytes = offset - oldOffset + 1;
  return out;
}
var decode$x = read$6;
var MSB$7 = 128, REST$7 = 127;
function read$6(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l || shift > 49) {
      read$6.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
  decode: decode$x,
  encodingLength: length$7
};
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
  const headerBytes = encode$n({
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
const createWriter = (buffer, options = {}) => {
  const { roots: roots2 = [], byteOffset = 0, byteLength = buffer.byteLength, headerSize = headerLength({ roots: roots2 }) } = options;
  const bytes2 = new Uint8Array(buffer, byteOffset, byteLength);
  const writer2 = new CarBufferWriter(bytes2, headerSize);
  for (const root of roots2) {
    writer2.addRoot(root);
  }
  return writer2;
};
var encode_1$5 = encode$l;
var MSB$6 = 128, REST$6 = 127, MSBALL$5 = ~REST$6, INT$5 = Math.pow(2, 31);
function encode$l(num, out, offset) {
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
  encode$l.bytes = offset - oldOffset + 1;
  return out;
}
var decode$w = read$5;
var MSB$1$5 = 128, REST$1$5 = 127;
function read$5(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read$5.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
const coerce$9 = (o) => {
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
  const bytes2 = coerce$9(multihash);
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
let Digest$5 = class Digest2 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};
function base$9(ALPHABET, name2) {
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$9 = base$9;
var _brrp__multiformats_scope_baseX$9 = src$9;
let Encoder$9 = class Encoder2 {
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
};
let Decoder$9 = class Decoder2 {
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
    return or$9(this, decoder);
  }
};
let ComposedDecoder$9 = class ComposedDecoder2 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$9(this, decoder);
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
};
const or$9 = (left, right) => new ComposedDecoder$9({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
let Codec$9 = class Codec2 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$9(name2, prefix, baseEncode);
    this.decoder = new Decoder$9(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
const from$a = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$9(name2, prefix, encode2, decode2);
const baseX$9 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$9(alphabet2, name2);
  return from$a({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$9(decode2(text))
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$k = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$9 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$a({
    prefix,
    name: name2,
    encode(input) {
      return encode$k(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$t(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$9 = baseX$9({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$9({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$b = rfc4648$9({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$9({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
let CID$5 = class CID2 {
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
        return toStringV0$5(bytes2, _baseCache, base3 || base58btc$9.encoder);
      default:
        return toStringV1$5(bytes2, _baseCache, base3 || base32$b.encoder);
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
    const multihashBytes = coerce$9(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
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
};
const parseCIDtoBytes$5 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$9;
      return [
        base58btc$9.prefix,
        decoder.decode(`${base58btc$9.prefix}${source}`)
      ];
    }
    case base58btc$9.prefix: {
      const decoder = base3 || base58btc$9;
      return [
        base58btc$9.prefix,
        decoder.decode(source)
      ];
    }
    case base32$b.prefix: {
      const decoder = base3 || base32$b;
      return [
        base32$b.prefix,
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
const toStringV0$5 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$9.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$5 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache2.set(prefix, cid2);
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
  const block = decode$y(header);
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
    const multihash2 = decode$u(bytes3);
    return CID$5.create(0, CIDV0_BYTES.DAG_PB, multihash2);
  }
  const version2 = await readVarint(reader2);
  if (version2 !== 1) {
    throw new Error(`Unexpected CID version (${version2})`);
  }
  const codec = await readVarint(reader2);
  const bytes2 = await readMultihash(reader2);
  const multihash = decode$u(bytes2);
  return CID$5.create(version2, codec, multihash);
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
  const iterator = asyncIterable[Symbol.asyncIterator]();
  async function readChunk() {
    const next = await iterator.next();
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
var encode_1$4 = encode$j;
var MSB$5 = 128, REST$5 = 127, MSBALL$4 = ~REST$5, INT$4 = Math.pow(2, 31);
function encode$j(num, out, offset) {
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
  encode$j.bytes = offset - oldOffset + 1;
  return out;
}
var decode$s = read$4;
var MSB$1$4 = 128, REST$1$4 = 127;
function read$4(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read$4.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
  decode: decode$s,
  encodingLength: length$5
};
var _brrp_varint$4 = varint$4;
const decode$r = (data, offset = 0) => {
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
const coerce$8 = (o) => {
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
const decode$q = (multihash) => {
  const bytes2 = coerce$8(multihash);
  const [code2, sizeOffset] = decode$r(bytes2);
  const [size, digestOffset] = decode$r(bytes2.subarray(sizeOffset));
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
let Digest$4 = class Digest3 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};
function base$8(ALPHABET, name2) {
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src$8 = base$8;
var _brrp__multiformats_scope_baseX$8 = src$8;
let Encoder$8 = class Encoder3 {
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
};
let Decoder$8 = class Decoder3 {
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
    return or$8(this, decoder);
  }
};
let ComposedDecoder$8 = class ComposedDecoder3 {
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or$8(this, decoder);
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
};
const or$8 = (left, right) => new ComposedDecoder$8({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
let Codec$8 = class Codec3 {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$8(name2, prefix, baseEncode);
    this.decoder = new Decoder$8(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
const from$9 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$8(name2, prefix, encode2, decode2);
const baseX$8 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$8(alphabet2, name2);
  return from$9({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$8(decode2(text))
  });
};
const decode$p = (string2, alphabet2, bitsPerChar, name2) => {
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$i = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$8 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$9({
    prefix,
    name: name2,
    encode(input) {
      return encode$i(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$p(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$8 = baseX$8({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$8({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$a = rfc4648$8({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$8({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
let CID$4 = class CID3 {
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
        return toStringV0$4(bytes2, _baseCache, base3 || base58btc$8.encoder);
      default:
        return toStringV1$4(bytes2, _baseCache, base3 || base32$a.encoder);
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
      const digest2 = decode$q(multihash);
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
    const multihashBytes = coerce$8(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
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
      const [i, length2] = decode$r(initialBytes.subarray(offset));
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
};
const parseCIDtoBytes$4 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$8;
      return [
        base58btc$8.prefix,
        decoder.decode(`${base58btc$8.prefix}${source}`)
      ];
    }
    case base58btc$8.prefix: {
      const decoder = base3 || base58btc$8;
      return [
        base58btc$8.prefix,
        decoder.decode(source)
      ];
    }
    case base32$a.prefix: {
      const decoder = base3 || base32$a;
      return [
        base32$a.prefix,
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
const toStringV0$4 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$8.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$4 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache2.set(prefix, cid2);
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
const fromString$4 = (str) => new TextEncoder().encode(str);
const toString$4 = (b) => new TextDecoder().decode(b);
let Encoder$7 = class Encoder4 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
let Decoder$7 = class Decoder4 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
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
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or$7(this, decoder);
  }
};
let ComposedDecoder$7 = class ComposedDecoder4 {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or$7(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
const or$7 = (left, right) => new ComposedDecoder$7(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
let Codec$7 = class Codec4 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$7(name2, prefix, baseEncode);
    this.decoder = new Decoder$7(name2, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
const from$8 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$7(name2, prefix, encode2, decode2);
const baseX$7 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$7(alphabet2, name2);
  return from$8({
    prefix,
    name: name2,
    encode: encode2,
    /**
     * @param {string} text
     */
    decode: (text) => coerce$7(decode2(text))
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$h = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$7 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$8({
    prefix,
    name: name2,
    encode(input) {
      return encode$h(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$o(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const identity$2 = from$8({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString$4(buf),
  decode: (str) => fromString$4(str)
});
const identityBase$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$2
}, Symbol.toStringTag, { value: "Module" }));
const base2$2 = rfc4648$7({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: base2$2
}, Symbol.toStringTag, { value: "Module" }));
const base8$2 = rfc4648$7({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: base8$2
}, Symbol.toStringTag, { value: "Module" }));
const base10$2 = baseX$7({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: base10$2
}, Symbol.toStringTag, { value: "Module" }));
const base16$2 = rfc4648$7({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper$1 = rfc4648$7({
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
const base32$8 = rfc4648$7({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper$1 = rfc4648$7({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad$2 = rfc4648$7({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper$1 = rfc4648$7({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex$1 = rfc4648$7({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper$1 = rfc4648$7({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad$1 = rfc4648$7({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper$1 = rfc4648$7({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z$1 = rfc4648$7({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: base32$8,
  base32hex: base32hex$1,
  base32hexpad: base32hexpad$1,
  base32hexpadupper: base32hexpadupper$1,
  base32hexupper: base32hexupper$1,
  base32pad: base32pad$2,
  base32padupper: base32padupper$1,
  base32upper: base32upper$1,
  base32z: base32z$1
}, Symbol.toStringTag, { value: "Module" }));
const base36$2 = baseX$7({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper$1 = baseX$7({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: base36$2,
  base36upper: base36upper$1
}, Symbol.toStringTag, { value: "Module" }));
const base58btc$7 = baseX$7({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr$1 = baseX$7({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: base58btc$7,
  base58flickr: base58flickr$1
}, Symbol.toStringTag, { value: "Module" }));
const base64$6 = rfc4648$7({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad$1 = rfc4648$7({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url$2 = rfc4648$7({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad$1 = rfc4648$7({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: base64$6,
  base64pad: base64pad$1,
  base64url: base64url$2,
  base64urlpad: base64urlpad$1
}, Symbol.toStringTag, { value: "Module" }));
const alphabet$1 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
const alphabetBytesToChars$1 = (
  /** @type {string[]} */
  alphabet$1.reduce(
    (p, c, i) => {
      p[i] = c;
      return p;
    },
    /** @type {string[]} */
    []
  )
);
const alphabetCharsToBytes$1 = (
  /** @type {number[]} */
  alphabet$1.reduce(
    (p, c, i) => {
      p[
        /** @type {number} */
        c.codePointAt(0)
      ] = i;
      return p;
    },
    /** @type {number[]} */
    []
  )
);
function encode$g(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars$1[c];
    return p;
  }, "");
}
function decode$n(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes$1[
      /** @type {number} */
      char.codePointAt(0)
    ];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji$2 = from$8({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode$g,
  decode: decode$n
});
const base256emoji$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: base256emoji$2
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const bases$1 = { ...identityBase$1, ...base2$3, ...base8$3, ...base10$3, ...base16$3, ...base32$9, ...base36$3, ...base58$1, ...base64$7, ...base256emoji$3 };
function asUint8Array$1(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}
function allocUnsafe$1(size = 0) {
  var _a2;
  if (((_a2 = globalThis.Buffer) == null ? void 0 : _a2.allocUnsafe) != null) {
    return asUint8Array$1(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}
function createCodec$1(name2, prefix, encode2, decode2) {
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
const string$1 = createCodec$1("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii$1 = createCodec$1("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i = 0; i < buf.length; i++) {
    string2 += String.fromCharCode(buf[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe$1(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
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
function toString$3(array, encoding = "utf8") {
  const base3 = BASES$1[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
function fromString$3(string2, encoding = "utf8") {
  const base3 = BASES$1[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array$1(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
const pathSepS = "/";
const pathSepB = new TextEncoder().encode(pathSepS);
const pathSep = pathSepB[0];
class Key {
  /**
   * @param {string | Uint8Array} s
   * @param {boolean} [clean]
   */
  constructor(s, clean) {
    if (typeof s === "string") {
      this._buf = fromString$3(s);
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
  /**
   * Convert to the string representation
   *
   * @param {import('uint8arrays/to-string').SupportedEncodings} [encoding='utf8'] - The encoding to use.
   * @returns {string}
   */
  toString(encoding = "utf8") {
    return toString$3(this._buf, encoding);
  }
  /**
   * Return the Uint8Array representation of the key
   *
   * @returns {Uint8Array}
   */
  uint8Array() {
    return this._buf;
  }
  /**
   * Return string representation of the key
   *
   * @returns {string}
   */
  get [Symbol.toStringTag]() {
    return `Key(${this.toString()})`;
  }
  /**
   * Constructs a key out of a namespace array.
   *
   * @param {Array<string>} list - The array of namespaces
   * @returns {Key}
   *
   * @example
   * ```js
   * Key.withNamespaces(['one', 'two'])
   * // => Key('/one/two')
   * ```
   */
  static withNamespaces(list) {
    return new Key(list.join(pathSepS));
  }
  /**
   * Returns a randomly (uuid) generated key.
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * Key.random()
   * // => Key('/f98719ea086343f7b71f32ea9d9d521d')
   * ```
   */
  static random() {
    return new Key(nanoid().replace(/-/g, ""));
  }
  /**
   * @param {*} other
   */
  static asKey(other) {
    if (other instanceof Uint8Array || typeof other === "string") {
      return new Key(other);
    }
    if (typeof other.uint8Array === "function") {
      return new Key(other.uint8Array());
    }
    return null;
  }
  /**
   * Cleanup the current key
   *
   * @returns {void}
   */
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
  /**
   * Check if the given key is sorted lower than ourself.
   *
   * @param {Key} key - The other Key to check against
   * @returns {boolean}
   */
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
  /**
   * Returns the key with all parts in reversed order.
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').reverse()
   * // => Key('/Actor:JohnCleese/MontyPython/Comedy')
   * ```
   */
  reverse() {
    return Key.withNamespaces(this.list().slice().reverse());
  }
  /**
   * Returns the `namespaces` making up this Key.
   *
   * @returns {Array<string>}
   */
  namespaces() {
    return this.list();
  }
  /** Returns the "base" namespace of this key.
   *
   * @returns {string}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').baseNamespace()
   * // => 'Actor:JohnCleese'
   * ```
   */
  baseNamespace() {
    const ns = this.namespaces();
    return ns[ns.length - 1];
  }
  /**
   * Returns the `list` representation of this key.
   *
   * @returns {Array<string>}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').list()
   * // => ['Comedy', 'MontyPythong', 'Actor:JohnCleese']
   * ```
   */
  list() {
    return this.toString().split(pathSepS).slice(1);
  }
  /**
   * Returns the "type" of this key (value of last namespace).
   *
   * @returns {string}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').type()
   * // => 'Actor'
   * ```
   */
  type() {
    return namespaceType(this.baseNamespace());
  }
  /**
   * Returns the "name" of this key (field of last namespace).
   *
   * @returns {string}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').name()
   * // => 'JohnCleese'
   * ```
   */
  name() {
    return namespaceValue(this.baseNamespace());
  }
  /**
   * Returns an "instance" of this type key (appends value to namespace).
   *
   * @param {string} s - The string to append.
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor').instance('JohnClesse')
   * // => Key('/Comedy/MontyPython/Actor:JohnCleese')
   * ```
   */
  instance(s) {
    return new Key(this.toString() + ":" + s);
  }
  /**
   * Returns the "path" of this key (parent + type).
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython/Actor:JohnCleese').path()
   * // => Key('/Comedy/MontyPython/Actor')
   * ```
   */
  path() {
    let p = this.parent().toString();
    if (!p.endsWith(pathSepS)) {
      p += pathSepS;
    }
    p += this.type();
    return new Key(p);
  }
  /**
   * Returns the `parent` Key of this Key.
   *
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key("/Comedy/MontyPython/Actor:JohnCleese").parent()
   * // => Key("/Comedy/MontyPython")
   * ```
   */
  parent() {
    const list = this.list();
    if (list.length === 1) {
      return new Key(pathSepS);
    }
    return new Key(list.slice(0, -1).join(pathSepS));
  }
  /**
   * Returns the `child` Key of this Key.
   *
   * @param {Key} key - The child Key to add
   * @returns {Key}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython').child(new Key('Actor:JohnCleese'))
   * // => Key('/Comedy/MontyPython/Actor:JohnCleese')
   * ```
   */
  child(key) {
    if (this.toString() === pathSepS) {
      return key;
    } else if (key.toString() === pathSepS) {
      return this;
    }
    return new Key(this.toString() + key.toString(), false);
  }
  /**
   * Returns whether this key is a prefix of `other`
   *
   * @param {Key} other - The other key to test against
   * @returns {boolean}
   *
   * @example
   * ```js
   * new Key('/Comedy').isAncestorOf('/Comedy/MontyPython')
   * // => true
   * ```
   */
  isAncestorOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }
    return other.toString().startsWith(this.toString());
  }
  /**
   * Returns whether this key is a contains another as prefix.
   *
   * @param {Key} other - The other Key to test against
   * @returns {boolean}
   *
   * @example
   * ```js
   * new Key('/Comedy/MontyPython').isDecendantOf('/Comedy')
   * // => true
   * ```
   */
  isDecendantOf(other) {
    if (other.toString() === this.toString()) {
      return false;
    }
    return this.toString().startsWith(other.toString());
  }
  /**
   * Checks if this key has only one namespace.
   *
   * @returns {boolean}
   *
   */
  isTopLevel() {
    return this.list().length === 1;
  }
  /**
   * Concats one or more Keys into one new Key.
   *
   * @param {Array<Key>} keys - The array of keys to concatenate
   * @returns {Key}
   */
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
const length$4 = async (iterator) => {
  let count = 0;
  for await (const _ of iterator) {
    count++;
  }
  return count;
};
var itLength = length$4;
const code$3 = 85;
const log$7 = browserExports("ipfs:repo:migrator:migration-8");
function unwrap$1(blockstore) {
  if (blockstore.child) {
    return unwrap$1(blockstore.child);
  }
  return blockstore;
}
function keyToMultihash$1(key) {
  try {
    const buf = base32$a.decode(`b${key.toString().toLowerCase().slice(1)}`);
    const multihash = CID$4.decode(buf).multihash.bytes;
    const multihashStr = base32$a.encode(multihash).slice(1).toUpperCase();
    return new Key(`/${multihashStr}`, false);
  } catch (err) {
    return key;
  }
}
function keyToCid(key) {
  try {
    const buf = base32$a.decode(`b${key.toString().toLowerCase().slice(1)}`);
    const digest2 = decode$q(buf);
    const multihash = base32$a.encode(CID$4.createV1(code$3, digest2).bytes).slice(1);
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
var encode_1$3 = encode$f;
var MSB$4 = 128, REST$4 = 127, MSBALL$3 = ~REST$4, INT$3 = Math.pow(2, 31);
function encode$f(num, out, offset) {
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
  encode$f.bytes = offset - oldOffset + 1;
  return out;
}
var decode$m = read$3;
var MSB$1$3 = 128, REST$1$3 = 127;
function read$3(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read$3.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
var length$3 = function(value) {
  return value < N1$3 ? 1 : value < N2$3 ? 2 : value < N3$3 ? 3 : value < N4$3 ? 4 : value < N5$3 ? 5 : value < N6$3 ? 6 : value < N7$3 ? 7 : value < N8$3 ? 8 : value < N9$3 ? 9 : 10;
};
var varint$3 = {
  encode: encode_1$3,
  decode: decode$m,
  encodingLength: length$3
};
var _brrp_varint$3 = varint$3;
const decode$l = (data, offset = 0) => {
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
const decode$k = (multihash) => {
  const bytes2 = coerce$6(multihash);
  const [code2, sizeOffset] = decode$l(bytes2);
  const [size, digestOffset] = decode$l(bytes2.subarray(sizeOffset));
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
let Digest$3 = class Digest4 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
let Encoder$6 = class Encoder5 {
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
};
let Decoder$6 = class Decoder5 {
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
};
let ComposedDecoder$6 = class ComposedDecoder5 {
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
};
const or$6 = (left, right) => new ComposedDecoder$6({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
let Codec$6 = class Codec5 {
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
};
const from$7 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$6(name2, prefix, encode2, decode2);
const baseX$6 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$6(alphabet2, name2);
  return from$7({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$6(decode2(text))
  });
};
const decode$j = (string2, alphabet2, bitsPerChar, name2) => {
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$e = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$6 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$7({
    prefix,
    name: name2,
    encode(input) {
      return encode$e(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$j(input, alphabet2, bitsPerChar, name2);
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
const base32$7 = rfc4648$6({
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
let CID$3 = class CID4 {
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
        return toStringV0$3(bytes2, _baseCache, base3 || base58btc$6.encoder);
      default:
        return toStringV1$3(bytes2, _baseCache, base3 || base32$7.encoder);
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
      const digest2 = decode$k(multihash);
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
    const multihashBytes = coerce$6(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
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
      const [i, length2] = decode$l(initialBytes.subarray(offset));
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
};
const parseCIDtoBytes$3 = (source, base3) => {
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
    case base32$7.prefix: {
      const decoder = base3 || base32$7;
      return [
        base32$7.prefix,
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
const toStringV0$3 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$6.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$3 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache2.set(prefix, cid2);
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
const textDecoder = new TextDecoder();
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
      link.Name = textDecoder.decode(byts);
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
const textEncoder$1 = new TextEncoder();
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
    const nameBytes = textEncoder$1.encode(link.Name);
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
    const l = textEncoder$1.encode(link.Name).length;
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
const textEncoder = new TextEncoder();
function linkComparator(a, b) {
  if (a === b) {
    return 0;
  }
  const abuf = a.Name ? textEncoder.encode(a.Name) : [];
  const bbuf = b.Name ? textEncoder.encode(b.Name) : [];
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
const code$2 = 112;
function encode$d(node) {
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
function decode$i(bytes2) {
  const pbn = decodeNode(bytes2);
  const node = {};
  if (pbn.Data) {
    node.Data = pbn.Data;
  }
  if (pbn.Links) {
    node.Links = pbn.Links.map((l) => {
      const link = {};
      try {
        link.Hash = CID$3.decode(l.Hash);
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
var minimalExports = {};
var minimal$1 = {
  get exports() {
    return minimalExports;
  },
  set exports(v) {
    minimalExports = v;
  }
};
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
var base64$5 = {};
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
  base642.encode = function encode2(buffer, start, end2) {
    var parts = null, chunk = [];
    var i2 = 0, j = 0, t;
    while (start < end2) {
      var b = buffer[start++];
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
  base642.decode = function decode2(string2, buffer, offset) {
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
          buffer[offset++] = t << 2 | (c & 48) >> 4;
          t = c;
          j = 2;
          break;
        case 2:
          buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
          t = c;
          j = 3;
          break;
        case 3:
          buffer[offset++] = (t & 3) << 6 | c;
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
})(base64$5);
var eventemitter = EventEmitter;
function EventEmitter() {
  this._listeners = {};
}
EventEmitter.prototype.on = function on(evt, fn, ctx) {
  (this._listeners[evt] || (this._listeners[evt] = [])).push({
    fn,
    ctx: ctx || this
  });
  return this;
};
EventEmitter.prototype.off = function off(evt, fn) {
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
EventEmitter.prototype.emit = function emit(evt) {
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
      function writeFloat_f32_cpy(val, buf, pos) {
        f32[0] = val;
        buf[pos] = f8b[0];
        buf[pos + 1] = f8b[1];
        buf[pos + 2] = f8b[2];
        buf[pos + 3] = f8b[3];
      }
      function writeFloat_f32_rev(val, buf, pos) {
        f32[0] = val;
        buf[pos] = f8b[3];
        buf[pos + 1] = f8b[2];
        buf[pos + 2] = f8b[1];
        buf[pos + 3] = f8b[0];
      }
      exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
      exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
      function readFloat_f32_cpy(buf, pos) {
        f8b[0] = buf[pos];
        f8b[1] = buf[pos + 1];
        f8b[2] = buf[pos + 2];
        f8b[3] = buf[pos + 3];
        return f32[0];
      }
      function readFloat_f32_rev(buf, pos) {
        f8b[3] = buf[pos];
        f8b[2] = buf[pos + 1];
        f8b[1] = buf[pos + 2];
        f8b[0] = buf[pos + 3];
        return f32[0];
      }
      exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
      exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    })();
  else
    (function() {
      function writeFloat_ieee754(writeUint, val, buf, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0)
          writeUint(1 / val > 0 ? (
            /* positive */
            0
          ) : (
            /* negative 0 */
            2147483648
          ), buf, pos);
        else if (isNaN(val))
          writeUint(2143289344, buf, pos);
        else if (val > 34028234663852886e22)
          writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
        else if (val < 11754943508222875e-54)
          writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
        else {
          var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
          writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
        }
      }
      exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
      exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
      function readFloat_ieee754(readUint, buf, pos) {
        var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
        return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
      }
      exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
      exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();
  if (typeof Float64Array !== "undefined")
    (function() {
      var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
      function writeDouble_f64_cpy(val, buf, pos) {
        f64[0] = val;
        buf[pos] = f8b[0];
        buf[pos + 1] = f8b[1];
        buf[pos + 2] = f8b[2];
        buf[pos + 3] = f8b[3];
        buf[pos + 4] = f8b[4];
        buf[pos + 5] = f8b[5];
        buf[pos + 6] = f8b[6];
        buf[pos + 7] = f8b[7];
      }
      function writeDouble_f64_rev(val, buf, pos) {
        f64[0] = val;
        buf[pos] = f8b[7];
        buf[pos + 1] = f8b[6];
        buf[pos + 2] = f8b[5];
        buf[pos + 3] = f8b[4];
        buf[pos + 4] = f8b[3];
        buf[pos + 5] = f8b[2];
        buf[pos + 6] = f8b[1];
        buf[pos + 7] = f8b[0];
      }
      exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
      exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
      function readDouble_f64_cpy(buf, pos) {
        f8b[0] = buf[pos];
        f8b[1] = buf[pos + 1];
        f8b[2] = buf[pos + 2];
        f8b[3] = buf[pos + 3];
        f8b[4] = buf[pos + 4];
        f8b[5] = buf[pos + 5];
        f8b[6] = buf[pos + 6];
        f8b[7] = buf[pos + 7];
        return f64[0];
      }
      function readDouble_f64_rev(buf, pos) {
        f8b[7] = buf[pos];
        f8b[6] = buf[pos + 1];
        f8b[5] = buf[pos + 2];
        f8b[4] = buf[pos + 3];
        f8b[3] = buf[pos + 4];
        f8b[2] = buf[pos + 5];
        f8b[1] = buf[pos + 6];
        f8b[0] = buf[pos + 7];
        return f64[0];
      }
      exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
      exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    })();
  else
    (function() {
      function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
        var sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        if (val === 0) {
          writeUint(0, buf, pos + off0);
          writeUint(1 / val > 0 ? (
            /* positive */
            0
          ) : (
            /* negative 0 */
            2147483648
          ), buf, pos + off1);
        } else if (isNaN(val)) {
          writeUint(0, buf, pos + off0);
          writeUint(2146959360, buf, pos + off1);
        } else if (val > 17976931348623157e292) {
          writeUint(0, buf, pos + off0);
          writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
        } else {
          var mantissa;
          if (val < 22250738585072014e-324) {
            mantissa = val / 5e-324;
            writeUint(mantissa >>> 0, buf, pos + off0);
            writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
          } else {
            var exponent = Math.floor(Math.log(val) / Math.LN2);
            if (exponent === 1024)
              exponent = 1023;
            mantissa = val * Math.pow(2, -exponent);
            writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
            writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
          }
        }
      }
      exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
      exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
      function readDouble_ieee754(readUint, off0, off1, buf, pos) {
        var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
        var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
        return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
      }
      exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
      exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();
  return exports;
}
function writeUintLE(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf, pos) {
  buf[pos] = val >>> 24;
  buf[pos + 1] = val >>> 16 & 255;
  buf[pos + 2] = val >>> 8 & 255;
  buf[pos + 3] = val & 255;
}
function readUintLE(buf, pos) {
  return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}
function readUintBE(buf, pos) {
  return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
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
  utf82.read = function utf8_read(buffer, start, end2) {
    var len = end2 - start;
    if (len < 1)
      return "";
    var parts = null, chunk = [], i = 0, t;
    while (start < end2) {
      t = buffer[start++];
      if (t < 128)
        chunk[i++] = t;
      else if (t > 191 && t < 224)
        chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
      else if (t > 239 && t < 365) {
        t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
        chunk[i++] = 55296 + (t >> 10);
        chunk[i++] = 56320 + (t & 1023);
      } else
        chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
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
  utf82.write = function utf8_write(string2, buffer, offset) {
    var start = offset, c1, c2;
    for (var i = 0; i < string2.length; ++i) {
      c1 = string2.charCodeAt(i);
      if (c1 < 128) {
        buffer[offset++] = c1;
      } else if (c1 < 2048) {
        buffer[offset++] = c1 >> 6 | 192;
        buffer[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer[offset++] = c1 >> 18 | 240;
        buffer[offset++] = c1 >> 12 & 63 | 128;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      } else {
        buffer[offset++] = c1 >> 12 | 224;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      }
    }
    return offset - start;
  };
})(utf8$2);
var pool_1 = pool;
function pool(alloc2, slice, size) {
  var SIZE = size || 8192;
  var MAX = SIZE >>> 1;
  var slab = null;
  var offset = SIZE;
  return function pool_alloc(size2) {
    if (size2 < 1 || size2 > MAX)
      return alloc2(size2);
    if (offset + size2 > SIZE) {
      slab = alloc2(SIZE);
      offset = 0;
    }
    var buf = slice.call(slab, offset, offset += size2);
    if (offset & 7)
      offset = (offset | 7) + 1;
    return buf;
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
    util2.base64 = base64$5;
    util2.EventEmitter = eventemitter;
    util2.float = float;
    util2.inquire = inquire_1;
    util2.utf8 = utf8$2;
    util2.pool = pool_1;
    util2.LongBits = requireLongbits();
    util2.isNode = Boolean(typeof commonjsGlobal !== "undefined" && commonjsGlobal && commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node);
    util2.global = util2.isNode && commonjsGlobal || typeof window !== "undefined" && window || typeof self !== "undefined" && self || commonjsGlobal;
    util2.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util2.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util2.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util2.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util2.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util2.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util2.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util2.Buffer = function() {
      try {
        var Buffer2 = util2.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
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
    util2.Long = /* istanbul ignore next */
    util2.global.dcodeIO && /* istanbul ignore next */
    util2.global.dcodeIO.Long || /* istanbul ignore next */
    util2.global.Long || util2.inquire("long");
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
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
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
      util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  })(minimal);
  return minimal;
}
var writer = Writer$1;
var util$4 = requireMinimal();
var BufferWriter$1;
var LongBits$1 = util$4.LongBits, base64$4 = util$4.base64, utf8$1 = util$4.utf8;
function Op(fn, len, val) {
  this.fn = fn;
  this.len = len;
  this.next = void 0;
  this.val = val;
}
function noop() {
}
function State(writer2) {
  this.head = writer2.head;
  this.tail = writer2.tail;
  this.len = writer2.len;
  this.next = writer2.states;
}
function Writer$1() {
  this.len = 0;
  this.head = new Op(noop, 0, 0);
  this.tail = this.head;
  this.states = null;
}
var create$4 = function create2() {
  return util$4.Buffer ? function create_buffer_setup() {
    return (Writer$1.create = function create_buffer() {
      return new BufferWriter$1();
    })();
  } : function create_array3() {
    return new Writer$1();
  };
};
Writer$1.create = create$4();
Writer$1.alloc = function alloc(size) {
  return new util$4.Array(size);
};
if (util$4.Array !== Array)
  Writer$1.alloc = util$4.pool(Writer$1.alloc, util$4.Array.prototype.subarray);
Writer$1.prototype._push = function push(fn, len, val) {
  this.tail = this.tail.next = new Op(fn, len, val);
  this.len += len;
  return this;
};
function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
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
function writeVarint64(val, buf, pos) {
  while (val.hi) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
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
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
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
var writeBytes = util$4.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
  buf.set(val, pos);
} : function writeBytes_for(val, buf, pos) {
  for (var i = 0; i < val.length; ++i)
    buf[pos + i] = val[i];
};
Writer$1.prototype.bytes = function write_bytes(value) {
  var len = value.length >>> 0;
  if (!len)
    return this._push(writeByte, 1, 0);
  if (util$4.isString(value)) {
    var buf = Writer$1.alloc(len = base64$4.length(value));
    base64$4.decode(value, buf, 0);
    value = buf;
  }
  return this.uint32(len)._push(writeBytes, len, value);
};
Writer$1.prototype.string = function write_string(value) {
  var len = utf8$1.length(value);
  return len ? this.uint32(len)._push(utf8$1.write, len, value) : this._push(writeByte, 1, 0);
};
Writer$1.prototype.fork = function fork() {
  this.states = new State(this);
  this.head = this.tail = new Op(noop, 0, 0);
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
    this.head = this.tail = new Op(noop, 0, 0);
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
  var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
  while (head) {
    head.fn(head.val, buf, pos);
    pos += head.len;
    head = head.next;
  }
  return buf;
};
Writer$1._configure = function(BufferWriter_) {
  BufferWriter$1 = BufferWriter_;
  Writer$1.create = create$4();
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
  BufferWriter.writeBytesBuffer = util$3.Buffer && util$3.Buffer.prototype instanceof Uint8Array && util$3.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
    buf.set(val, pos);
  } : function writeBytesBuffer_copy(val, buf, pos) {
    if (val.copy)
      val.copy(buf, pos, 0, val.length);
    else
      for (var i = 0; i < val.length; )
        buf[pos++] = val[i++];
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
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40)
    util$3.utf8.write(val, buf, pos);
  else if (buf.utf8Write)
    buf.utf8Write(val, pos);
  else
    buf.write(val, pos);
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
function Reader$1(buffer) {
  this.buf = buffer;
  this.pos = 0;
  this.len = buffer.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
  if (buffer instanceof Uint8Array || Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
} : function create_array2(buffer) {
  if (Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
};
var create$3 = function create3() {
  return util$2.Buffer ? function create_buffer_setup(buffer) {
    return (Reader$1.create = function create_buffer(buffer2) {
      return util$2.Buffer.isBuffer(buffer2) ? new BufferReader$1(buffer2) : create_array(buffer2);
    })(buffer);
  } : create_array;
};
Reader$1.create = create$3();
Reader$1.prototype._slice = util$2.Array.prototype.subarray || /* istanbul ignore next */
util$2.Array.prototype.slice;
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
function readFixed32_end(buf, end2) {
  return (buf[end2 - 4] | buf[end2 - 3] << 8 | buf[end2 - 2] << 16 | buf[end2 - 1] << 24) >>> 0;
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
  Reader$1.create = create$3();
  BufferReader$1._configure();
  var fn = util$2.Long ? "toLong" : (
    /* istanbul ignore next */
    "toNumber"
  );
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
function BufferReader(buffer) {
  Reader.call(this, buffer);
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
          self2.end(
            /* endedByRPC */
            true
          );
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
const $protobuf = /* @__PURE__ */ getDefaultExportFromCjs(minimalExports);
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
var fnv1aExports = {};
var fnv1a$1 = {
  get exports() {
    return fnv1aExports;
  },
  set exports(v) {
    fnv1aExports = v;
  }
};
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
})(fnv1a$1, fnv1aExports);
const fnv1a = /* @__PURE__ */ getDefaultExportFromCjs(fnv1aExports);
const PIN_DS_KEY = new Key("/local/pins");
const DEFAULT_FANOUT = 256;
const MAX_ITEMS = 8192;
const EMPTY_KEY = CID$4.parse("QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n");
const PinTypes$1 = {
  direct: "direct",
  recursive: "recursive"
};
function cidToKey$1(cid) {
  return new Key(`/${base32$a.encode(cid.multihash.bytes).toUpperCase().substring(1)}`);
}
const from$6 = ({ name: name2, code: code2, encode: encode2 }) => new Hasher(name2, code2, encode2);
class Hasher {
  constructor(name2, code2, encode2) {
    this.name = name2;
    this.code = code2;
    this.encode = encode2;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create$6(this.code, result) : result.then((digest2) => create$6(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256 = from$6({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
from$6({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});
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
  const buffer = new Uint8Array(4);
  const dataView = new DataView(buffer.buffer);
  dataView.setUint32(0, seed, true);
  const encodedKey = fromString$5(key.toString());
  const data = concat$1([buffer, encodedKey], buffer.byteLength + encodedKey.byteLength);
  return fnv1a(toString$5(data));
}
async function* walkItems(blockstore, node) {
  const pbh = readHeader(node);
  let idx = 0;
  for (const link of node.Links) {
    if (idx < pbh.header.fanout) {
      const linkHash = link.Hash;
      if (!EMPTY_KEY.equals(linkHash)) {
        const buf = await blockstore.get(linkHash);
        const node2 = decode$i(buf);
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
  const buf = await blockstore.get(link.Hash);
  const node = decode$i(buf);
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
      const buf = encode$d(child);
      const digest2 = await sha256.digest(buf);
      const cid = CID$4.createV0(digest2);
      await blockstore.put(cid, buf);
      const size = child.Links.reduce((acc, curr) => acc + (curr.Tsize || 0), 0) + buf.length;
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
  const buf = encode$d(rootNode);
  const digest2 = await sha256.digest(buf);
  const cid = CID$4.createV0(digest2);
  await blockstore.put(cid, buf);
  const size = rootNode.Links.reduce((acc, curr) => acc + curr.Tsize, 0) + buf.length;
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
  const cid = CID$4.decode(mh);
  const pinRootBuf = await blockstore.get(cid);
  const pinRoot = decode$i(pinRootBuf);
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
    if (cid2.code !== code$2) {
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
    if (cid2.code !== code$2) {
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
    const pin = decode$z(value);
    const cid2 = CID$4.create(
      pin.version || 0,
      pin.codec || code$2,
      decode$q(base32$a.decode("b" + key.toString().toLowerCase().split("/").pop()))
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
  const buf = encode$d(pinRoot);
  const digest2 = await sha256.digest(buf);
  const cid = CID$4.createV0(digest2);
  await blockstore.put(cid, buf);
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
      { type: "put", key: fromString$5(key), value }
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
      { type: "put", key: toString$5(key), value }
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
  /** Run a parser, and restore the pre-parse state if it fails. */
  readAtomically(fn) {
    const index = this.index;
    const result = fn();
    if (result === void 0) {
      this.index = index;
    }
    return result;
  }
  /** Run a parser, but fail if the entire input wasn't consumed. Doesn't run atomically. */
  parseWith(fn) {
    const result = fn();
    if (this.index !== this.input.length) {
      return void 0;
    }
    return result;
  }
  /** Peek the next character from the input */
  peekChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index];
  }
  /** Read the next character from the input */
  readChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index++];
  }
  /** Read the next character from the input if it matches the target. */
  readGivenChar(target) {
    return this.readAtomically(() => {
      const char = this.readChar();
      if (char !== target) {
        return void 0;
      }
      return char;
    });
  }
  /**
   * Helper for reading separators in an indexed loop. Reads the separator
   * character iff index > 0, then runs the parser. When used in a loop,
   * the separator character will only be read on index > 0 (see
   * readIPv4Addr for an example)
   */
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
  /**
   * Read a number off the front of the input in the given radix, stopping
   * at the first non-digit character or eof. Fails if the number has more
   * digits than max_digits or if there is no number.
   */
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
  /** Read an IPv4 address. */
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
  /** Read an IPv6 Address. */
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
  /** Read an IP Address, either IPv4 or IPv6. */
  readIPAddr() {
    return this.readIPv4Addr() ?? this.readIPv6Addr();
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
const fromString$2 = (str) => new TextEncoder().encode(str);
const toString$2 = (b) => new TextDecoder().decode(b);
let Encoder$5 = class Encoder6 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
let Decoder$5 = class Decoder6 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
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
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or$5(this, decoder);
  }
};
let ComposedDecoder$5 = class ComposedDecoder6 {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or$5(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
const or$5 = (left, right) => new ComposedDecoder$5(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
let Codec$5 = class Codec6 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$5(name2, prefix, baseEncode);
    this.decoder = new Decoder$5(name2, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
const from$5 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$5(name2, prefix, encode2, decode2);
const baseX$5 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$5(alphabet2, name2);
  return from$5({
    prefix,
    name: name2,
    encode: encode2,
    /**
     * @param {string} text
     */
    decode: (text) => coerce$5(decode2(text))
  });
};
const decode$h = (string2, alphabet2, bitsPerChar, name2) => {
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$c = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$5 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$5({
    prefix,
    name: name2,
    encode(input) {
      return encode$c(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$h(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const identity$1 = from$5({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString$2(buf),
  decode: (str) => fromString$2(str)
});
const identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$1
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648$5({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648$5({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX$5({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648$5({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648$5({
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
const base32$5 = rfc4648$5({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648$5({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad$1 = rfc4648$5({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648$5({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648$5({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648$5({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648$5({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648$5({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648$5({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: base32$5,
  base32hex,
  base32hexpad,
  base32hexpadupper,
  base32hexupper,
  base32pad: base32pad$1,
  base32padupper,
  base32upper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
const base36 = baseX$5({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX$5({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base58btc$5 = baseX$5({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX$5({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: base58btc$5,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base64$2 = rfc4648$5({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648$5({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url$1 = rfc4648$5({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad = rfc4648$5({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: base64$2,
  base64pad,
  base64url: base64url$1,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
const alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
const alphabetBytesToChars = (
  /** @type {string[]} */
  alphabet.reduce(
    (p, c, i) => {
      p[i] = c;
      return p;
    },
    /** @type {string[]} */
    []
  )
);
const alphabetCharsToBytes = (
  /** @type {number[]} */
  alphabet.reduce(
    (p, c, i) => {
      p[
        /** @type {number} */
        c.codePointAt(0)
      ] = i;
      return p;
    },
    /** @type {number[]} */
    []
  )
);
function encode$b(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode$g(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[
      /** @type {number} */
      char.codePointAt(0)
    ];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji = from$5({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode$b,
  decode: decode$g
});
const base256emoji$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji
}, Symbol.toStringTag, { value: "Module" }));
var encode_1$2 = encode$a;
var MSB$3 = 128, REST$3 = 127, MSBALL$2 = ~REST$3, INT$2 = Math.pow(2, 31);
function encode$a(num, out, offset) {
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
  encode$a.bytes = offset - oldOffset + 1;
  return out;
}
var decode$f = read$2;
var MSB$1$2 = 128, REST$1$2 = 127;
function read$2(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read$2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
  decode: decode$f,
  encodingLength: length$2
};
var _brrp_varint$2 = varint$2;
const decode$e = (data, offset = 0) => {
  const code2 = _brrp_varint$2.decode(data, offset);
  return [code2, _brrp_varint$2.decode.bytes];
};
const encodeTo$2 = (int, target, offset = 0) => {
  _brrp_varint$2.encode(int, target, offset);
  return target;
};
const encodingLength$2 = (int) => {
  return _brrp_varint$2.encodingLength(int);
};
const create$2 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$2(code2);
  const digestOffset = sizeOffset + encodingLength$2(size);
  const bytes2 = new Uint8Array(digestOffset + size);
  encodeTo$2(code2, bytes2, 0);
  encodeTo$2(size, bytes2, sizeOffset);
  bytes2.set(digest2, digestOffset);
  return new Digest$2(code2, size, digest2, bytes2);
};
const decode$d = (multihash) => {
  const bytes2 = coerce$5(multihash);
  const [code2, sizeOffset] = decode$e(bytes2);
  const [size, digestOffset] = decode$e(bytes2.subarray(sizeOffset));
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
    const data = (
      /** @type {{code?:unknown, size?:unknown, bytes?:unknown}} */
      b
    );
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals$8(a.bytes, data.bytes);
  }
};
let Digest$2 = class Digest5 {
  /**
   * Creates a multihash digest.
   *
   * @param {Code} code
   * @param {Size} size
   * @param {Uint8Array} digest
   * @param {Uint8Array} bytes
   */
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};
new TextEncoder();
new TextDecoder();
const format$1 = (link, base3) => {
  const { bytes: bytes2, version: version2 } = link;
  switch (version2) {
    case 0:
      return toStringV0$2(
        bytes2,
        baseCache(link),
        /** @type {API.MultibaseEncoder<"z">} */
        base3 || base58btc$5.encoder
      );
    default:
      return toStringV1$2(
        bytes2,
        baseCache(link),
        /** @type {API.MultibaseEncoder<Prefix>} */
        base3 || base32$5.encoder
      );
  }
};
const cache = /* @__PURE__ */ new WeakMap();
const baseCache = (cid) => {
  const baseCache2 = cache.get(cid);
  if (baseCache2 == null) {
    const baseCache3 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache3);
    return baseCache3;
  }
  return baseCache2;
};
let CID$2 = class CID5 {
  /**
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} multihash - (Multi)hash of the of the content.
   * @param {Uint8Array} bytes
   *
   */
  constructor(version2, code2, multihash, bytes2) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes2;
    this["/"] = bytes2;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  /**
   * @returns {CID<Data, API.DAG_PB, API.SHA_256, 0>}
   */
  toV0() {
    switch (this.version) {
      case 0: {
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          this
        );
      }
      case 1: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          CID$2.createV0(
            /** @type {API.MultihashDigest<API.SHA_256>} */
            multihash
          )
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 0. This is a bug please report`
        );
      }
    }
  }
  /**
   * @returns {CID<Data, Format, Alg, 1>}
   */
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$2(code2, digest2);
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          CID$2.createV1(this.code, multihash)
        );
      }
      case 1: {
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          this
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 1. This is a bug please report`
        );
      }
    }
  }
  /**
   * @param {unknown} other
   * @returns {other is CID<Data, Format, Alg, Version>}
   */
  equals(other) {
    return CID$2.equals(this, other);
  }
  /**
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {API.Link<Data, Format, Alg, Version>} self
   * @param {unknown} other
   * @returns {other is CID}
   */
  static equals(self2, other) {
    const unknown = (
      /** @type {{code?:unknown, version?:unknown, multihash?:unknown}} */
      other
    );
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals$7(self2.multihash, unknown.multihash);
  }
  /**
   * @param {API.MultibaseEncoder<string>} [base]
   * @returns {string}
   */
  toString(base3) {
    return format$1(this, base3);
  }
  toJSON() {
    return { "/": format$1(this) };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @template {unknown} U
   * @param {API.Link<Data, Format, Alg, Version>|U} input
   * @returns {CID<Data, Format, Alg, Version>|null}
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = (
      /** @type {any} */
      input
    );
    if (value instanceof CID$2) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes: bytes2 } = value;
      return new CID$2(
        version2,
        code2,
        /** @type {API.MultihashDigest<Alg>} */
        multihash,
        bytes2 || encodeCID$2(version2, code2, multihash.bytes)
      );
    } else if (value[cidSymbol$2] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = (
        /** @type {API.MultihashDigest<Alg>} */
        decode$d(multihash)
      );
      return CID$2.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  /**
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} digest - (Multi)hash of the of the content.
   * @returns {CID<Data, Format, Alg, Version>}
   */
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest2.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$2) {
          throw new Error(
            `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$2}) block encoding`
          );
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
  /**
   * Simplified version of `create` for CIDv0.
   *
   * @template {unknown} [T=unknown]
   * @param {API.MultihashDigest<typeof SHA_256_CODE>} digest - Multihash.
   * @returns {CID<T, typeof DAG_PB_CODE, typeof SHA_256_CODE, 0>}
   */
  static createV0(digest2) {
    return CID$2.create(0, DAG_PB_CODE$2, digest2);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @param {Code} code - Content encoding format code.
   * @param {API.MultihashDigest<Alg>} digest - Miltihash of the content.
   * @returns {CID<Data, Code, Alg, 1>}
   */
  static createV1(code2, digest2) {
    return CID$2.create(1, code2, digest2);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ByteView<API.Link<Data, Code, Alg, Ver>>} bytes
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static decode(bytes2) {
    const [cid, remainder] = CID$2.decodeFirst(bytes2);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} bytes
   * @returns {[CID<T, C, A, V>, Uint8Array]}
   */
  static decodeFirst(bytes2) {
    const specs = CID$2.inspectBytes(bytes2);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$5(
      bytes2.subarray(prefixSize, prefixSize + specs.multihashSize)
    );
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(
      specs.multihashSize - specs.digestSize
    );
    const digest2 = new Digest$2(
      specs.multihashCode,
      specs.digestSize,
      digestBytes,
      multihashBytes
    );
    const cid = specs.version === 0 ? CID$2.createV0(
      /** @type {API.MultihashDigest<API.SHA_256>} */
      digest2
    ) : CID$2.createV1(specs.codec, digest2);
    return [
      /** @type {CID<T, C, A, V>} */
      cid,
      bytes2.subarray(specs.size)
    ];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} initialBytes
   * @returns {{ version:V, codec:C, multihashCode:A, digestSize:number, multihashSize:number, size:number }}
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$e(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = (
      /** @type {V} */
      next()
    );
    let codec = (
      /** @type {C} */
      DAG_PB_CODE$2
    );
    if (
      /** @type {number} */
      version2 === 18
    ) {
      version2 = /** @type {V} */
      0;
      offset = 0;
    } else {
      codec = /** @type {C} */
      next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = (
      /** @type {A} */
      next()
    );
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version: version2, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   *
   * @template {string} Prefix
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ToString<API.Link<Data, Code, Alg, Ver>, Prefix>} source
   * @param {API.MultibaseDecoder<Prefix>} [base]
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static parse(source, base3) {
    const [prefix, bytes2] = parseCIDtoBytes$2(source, base3);
    const cid = CID$2.decode(bytes2);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source);
    return cid;
  }
};
const parseCIDtoBytes$2 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$5;
      return [
        /** @type {Prefix} */
        base58btc$5.prefix,
        decoder.decode(`${base58btc$5.prefix}${source}`)
      ];
    }
    case base58btc$5.prefix: {
      const decoder = base3 || base58btc$5;
      return [
        /** @type {Prefix} */
        base58btc$5.prefix,
        decoder.decode(source)
      ];
    }
    case base32$5.prefix: {
      const decoder = base3 || base32$5;
      return [
        /** @type {Prefix} */
        base32$5.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error(
          "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
        );
      }
      return [
        /** @type {Prefix} */
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$2 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$5.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$2 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache2.set(prefix, cid2);
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
const bases = { ...identityBase, ...base2$1, ...base8$1, ...base10$1, ...base16$1, ...base32$6, ...base36$1, ...base58, ...base64$3, ...base256emoji$1 };
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}
function allocUnsafe(size = 0) {
  var _a2;
  if (((_a2 = globalThis.Buffer) == null ? void 0 : _a2.allocUnsafe) != null) {
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
    decoder: {
      decode: decode2
    }
  };
}
const string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i = 0; i < buf.length; i++) {
    string2 += String.fromCharCode(buf[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
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
function toString$1(array, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
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
        sections[i] = toString$1(v4Buffer.slice(0, 2), "base16");
      }
      if (v4Buffer != null && ++i < 8) {
        sections.splice(i, 0, toString$1(v4Buffer.slice(2, 4), "base16"));
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
const toString = function(buf, offset = 0, length2) {
  offset = ~~offset;
  length2 = length2 ?? buf.length - offset;
  const view = new DataView(buf.buffer);
  if (length2 === 4) {
    const result = [];
    for (let i = 0; i < length2; i++) {
      result.push(buf[offset + i]);
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
  [43, 8, "ipcidr"],
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
  // `ipfs` is added before `p2p` for legacy support.
  // All text representations will default to `p2p`, but `ipfs` will
  // still be supported
  [421, V, "ipfs"],
  // `p2p` is the preferred name for 421, and is now the default
  [421, V, "p2p"],
  [443, 0, "https"],
  [444, 96, "onion"],
  [445, 296, "onion3"],
  [446, V, "garlic64"],
  [460, 0, "quic"],
  [461, 0, "quic-v1"],
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
function fromString$1(string2, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (base3 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
function concat(arrays, length2) {
  if (length2 == null) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}
function convertToString(proto, buf) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
    case 41:
      return bytes2ip(buf);
    case 42:
      return bytes2str(buf);
    case 6:
    case 273:
    case 33:
    case 132:
      return bytes2port(buf).toString();
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 777:
      return bytes2str(buf);
    case 421:
      return bytes2mh(buf);
    case 444:
      return bytes2onion(buf);
    case 445:
      return bytes2onion(buf);
    case 466:
      return bytes2mb(buf);
    default:
      return toString$1(buf, "base16");
  }
}
function convertToBytes(proto, str) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
      return ip2bytes(str);
    case 41:
      return ip2bytes(str);
    case 42:
      return str2bytes(str);
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
      return fromString$1(str, "base16");
  }
}
const decoders = Object.values(bases).map((c) => c.decoder);
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
  const ipString = toString(ipBuff, 0, ipBuff.length);
  if (ipString == null) {
    throw new Error("ipBuff is required");
  }
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return ipString;
}
function port2bytes(port) {
  const buf = new ArrayBuffer(2);
  const view = new DataView(buf);
  view.setUint16(0, port);
  return new Uint8Array(buf);
}
function bytes2port(buf) {
  const view = new DataView(buf.buffer);
  return view.getUint16(buf.byteOffset);
}
function str2bytes(str) {
  const buf = fromString$1(str);
  const size = Uint8Array.from(varint$6.encode(buf.length));
  return concat([size, buf], size.length + buf.length);
}
function bytes2str(buf) {
  const size = varint$6.decode(buf);
  buf = buf.slice(varint$6.decode.bytes);
  if (buf.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString$1(buf);
}
function mh2bytes(hash2) {
  let mh;
  if (hash2[0] === "Q" || hash2[0] === "1") {
    mh = decode$d(base58btc$5.decode(`z${hash2}`)).bytes;
  } else {
    mh = CID$2.parse(hash2).multihash.bytes;
  }
  const size = Uint8Array.from(varint$6.encode(mh.length));
  return concat([size, mh], size.length + mh.length);
}
function mb2bytes(mbstr) {
  const mb = anybaseDecoder.decode(mbstr);
  const size = Uint8Array.from(varint$6.encode(mb.length));
  return concat([size, mb], size.length + mb.length);
}
function bytes2mb(buf) {
  const size = varint$6.decode(buf);
  const hash2 = buf.slice(varint$6.decode.bytes);
  if (hash2.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return "u" + toString$1(hash2, "base64url");
}
function bytes2mh(buf) {
  const size = varint$6.decode(buf);
  const address = buf.slice(varint$6.decode.bytes);
  if (address.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString$1(address, "base58btc");
}
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf = base32$5.decode("b" + addr[0]);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf, portBuf], buf.length + portBuf.length);
}
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf = base32$5.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf, portBuf], buf.length + portBuf.length);
}
function bytes2onion(buf) {
  const addrBytes = buf.slice(0, buf.length - 2);
  const portBytes = buf.slice(buf.length - 2);
  const addr = toString$1(addrBytes, "base32");
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
        // should we need to check each path part to see if it's a proto?
        // This would allow for other protocols to be added after a unix path,
        // however it would have issues if the path had a protocol name in the path
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
    let buf = Uint8Array.from(varint$6.encode(proto.code));
    if (tup.length > 1 && tup[1] != null) {
      buf = concat([buf, tup[1]]);
    }
    return buf;
  })));
}
function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = varint$6.decode(addr);
    return size + (varint$6.decode.bytes ?? 0);
  }
}
function bytesToTuples(buf) {
  const tuples = [];
  let i = 0;
  while (i < buf.length) {
    const code2 = varint$6.decode(buf, i);
    const n = varint$6.decode.bytes ?? 0;
    const p = getProtocol(code2);
    const size = sizeForAddr(p, buf.slice(i + n));
    if (size === 0) {
      tuples.push([code2]);
      i += n;
      continue;
    }
    const addr = buf.slice(i + n, i + n + size);
    i += size + n;
    if (i > buf.length) {
      throw ParseError("Invalid address Uint8Array: " + toString$1(buf, "base16"));
    }
    tuples.push([code2, addr]);
  }
  return tuples;
}
function bytesToString(buf) {
  const a = bytesToTuples(buf);
  const b = tuplesToStringTuples(a);
  return stringTuplesToString(b);
}
function stringToBytes(str) {
  str = cleanPath(str);
  const a = stringToStringTuples(str);
  const b = stringTuplesToTuples(a);
  return tuplesToBytes(b);
}
function fromString(str) {
  return stringToBytes(str);
}
function fromBytes(buf) {
  const err = validateBytes(buf);
  if (err != null) {
    throw err;
  }
  return Uint8Array.from(buf);
}
function validateBytes(buf) {
  try {
    bytesToTuples(buf);
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
      this.bytes = fromString(addr);
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
    let family;
    let transport;
    let host;
    let port;
    let zone = "";
    const tcp = getProtocol("tcp");
    const udp = getProtocol("udp");
    const ip4 = getProtocol("ip4");
    const ip6 = getProtocol("ip6");
    const dns6 = getProtocol("dns6");
    const ip6zone = getProtocol("ip6zone");
    for (const [code2, value] of this.stringTuples()) {
      if (code2 === ip6zone.code) {
        zone = `%${value ?? ""}`;
      }
      if (DNS_CODES.includes(code2)) {
        transport = tcp.name;
        port = 443;
        host = `${value ?? ""}${zone}`;
        family = code2 === dns6.code ? 6 : 4;
      }
      if (code2 === tcp.code || code2 === udp.code) {
        transport = getProtocol(code2).name;
        port = parseInt(value ?? "");
      }
      if (code2 === ip4.code || code2 === ip6.code) {
        transport = getProtocol(code2).name;
        host = `${value ?? ""}${zone}`;
        family = code2 === ip6.code ? 6 : 4;
      }
    }
    if (family == null || transport == null || host == null || port == null) {
      throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".');
    }
    const opts = {
      family,
      host,
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
    const buf = this.bytes;
    let i = 0;
    while (i < buf.length) {
      const code2 = varint$6.decode(buf, i);
      const n = varint$6.decode.bytes ?? 0;
      const p = getProtocol(code2);
      const size = sizeForAddr(p, buf.slice(i + n));
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
          return toString$1(base58btc$5.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString$1(CID$2.parse(peerIdStr).multihash.bytes, "base58btc");
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
    const protos = (addr ?? this).protos();
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
  /**
   * Returns Multiaddr as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```js
   * import { multiaddr } from '@multiformats/multiaddr'
   *
   * console.info(multiaddr('/ip4/127.0.0.1/tcp/4001'))
   * // 'Multiaddr(/ip4/127.0.0.1/tcp/4001)'
   * ```
   */
  [(_DefaultMultiaddr_string = /* @__PURE__ */ new WeakMap(), _DefaultMultiaddr_tuples = /* @__PURE__ */ new WeakMap(), _DefaultMultiaddr_stringTuples = /* @__PURE__ */ new WeakMap(), _a = symbol, inspect)]() {
    return `Multiaddr(${bytesToString(this.bytes)})`;
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
  // @ts-ignore
  migrate: () => {
  },
  // @ts-ignore
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
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "NonReversibleMigrationError";
    this.code = NonReversibleMigrationError.code;
    this.message = message;
  }
}
NonReversibleMigrationError.code = "ERR_NON_REVERSIBLE_MIGRATION";
class NotInitializedRepoError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "NotInitializedRepoError";
    this.code = NotInitializedRepoError.code;
    this.message = message;
  }
}
NotInitializedRepoError.code = "ERR_NOT_INITIALIZED_REPO";
class RequiredParameterError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "RequiredParameterError";
    this.code = RequiredParameterError.code;
    this.message = message;
  }
}
RequiredParameterError.code = "ERR_REQUIRED_PARAMETER";
class InvalidValueError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "InvalidValueError";
    this.code = InvalidValueError.code;
    this.message = message;
  }
}
InvalidValueError.code = "ERR_INVALID_VALUE";
class MissingRepoOptionsError extends Error {
  /**
   * @param {string} message
   */
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
  InvalidValueError,
  MissingRepoOptionsError,
  NonReversibleMigrationError,
  NotInitializedRepoError,
  RequiredParameterError
}, Symbol.toStringTag, { value: "Module" }));
const log$6 = browserExports("ipfs:repo:migrator:repo:init");
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
    return parseInt(toString$5(await store.get(VERSION_KEY)));
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
  await store.put(VERSION_KEY, fromString$5(String(version2)));
  await store.close();
}
const log$5 = browserExports("ipfs:repo:migrator");
function getLatestMigrationVersion(migrations) {
  migrations = migrations || defaultMigrations;
  if (!Array.isArray(migrations) || migrations.length === 0) {
    return 0;
  }
  return migrations[migrations.length - 1].version;
}
async function migrate(path, backends, repoOptions, toVersion, options = {}) {
  const ignoreLock = options.ignoreLock ?? false;
  const onProgress = options.onProgress;
  const isDryRun = options.isDryRun ?? false;
  const migrations = options.migrations ?? defaultMigrations;
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
  const ignoreLock = options.ignoreLock ?? false;
  const onProgress = options.onProgress;
  const isDryRun = options.isDryRun ?? false;
  const migrations = options.migrations ?? defaultMigrations;
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
var bytesExports = {};
var bytes$1 = {
  get exports() {
    return bytesExports;
  },
  set exports(v) {
    bytesExports = v;
  }
};
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */
bytes$1.exports = bytes;
bytesExports.format = format;
bytesExports.parse = parse;
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
const { hasOwnProperty } = Object.prototype;
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
    if (hasOwnProperty.call(value, key)) {
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
      defineProperty(merged, key, merge$2(merged[key], source[key], config2));
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
      if (!hasOwnProperty.call(array, k)) {
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
function merge$2(merged, source, config2) {
  if (config2.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
    return concatArrays(merged, source, config2);
  }
  if (!isOptionObject(source) || !isOptionObject(merged)) {
    return clone(source);
  }
  return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config2);
}
var mergeOptions = function(...options) {
  const config2 = merge$2(clone(defaultMergeOptions), this !== globalThis$1 && this || {}, defaultMergeOptions);
  let merged = { _: {} };
  for (const option of options) {
    if (option === void 0) {
      continue;
    }
    if (!isOptionObject(option)) {
      throw new TypeError("`" + option + "` is not an Option Object");
    }
    merged = merge$2(merged, { _: option }, config2);
  }
  return merged._;
};
const repoVersion = 12;
class LockExistsError extends Error {
  /**
   * @param {string} [message]
   */
  constructor(message) {
    super(message);
    this.name = "LockExistsError";
    this.code = LockExistsError.code;
  }
}
LockExistsError.code = "ERR_LOCK_EXISTS";
class NotFoundError extends Error {
  /**
   * @param {string} [message]
   */
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.code = NotFoundError.code;
  }
}
NotFoundError.code = "ERR_NOT_FOUND";
class InvalidRepoVersionError extends Error {
  /**
   * @param {string} [message]
   */
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
const log$4 = browserExports("ipfs:repo:version");
const versionKey = new Key("version");
function version$2(store) {
  return {
    /**
     * Check if a version file exists.
     *
     */
    async exists() {
      return hasWithFallback(versionKey, store.has.bind(store), store);
    },
    /**
     * Get the current version.
     *
     * @returns {Promise<number>}
     */
    async get() {
      const buf = await getWithFallback(versionKey, store.get.bind(store), store.has.bind(store), store);
      return parseInt(toString$5(buf), 10);
    },
    /**
     * Set the version of the repo, writing it to the underlying store.
     *
     * @param {number} version
     * @returns {Promise<void>}
     */
    set(version2) {
      return store.put(versionKey, fromString$5(String(version2)));
    },
    /**
     * Check the current version, and returns true if versions matches
     *
     * @param {number} expected
     */
    async check(expected) {
      const version2 = await this.get();
      log$4("comparing version: %s and %s", version2, expected);
      const compatibleVersion = version2 === 6 && expected === 7 || expected === 6 && version2 === 7;
      return version2 === expected || compatibleVersion;
    }
  };
}
var eventemitter3Exports = {};
var eventemitter3 = {
  get exports() {
    return eventemitter3Exports;
  },
  set exports(v) {
    eventemitter3Exports = v;
  }
};
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
let TimeoutError$1 = class TimeoutError2 extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
let AbortError$2 = class AbortError2 extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
const getDOMException$1 = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError$2(errorMessage) : new DOMException(errorMessage);
const getAbortedReason$1 = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException$1("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException$1(reason);
};
function pTimeout$1(promise, milliseconds, fallback, options) {
  let timer;
  const cancelablePromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve(promise);
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
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      reject(timeoutError2);
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
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
let AbortError$1 = class AbortError3 extends Error {
};
class PQueue extends eventemitter3Exports {
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
  /**
  Adds a sync or async task to the queue. Always returns a promise.
  */
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
  /**
      Same as `.add()`, but accepts an array of sync or async functions.
  
      @returns A promise that resolves when all functions are resolved.
      */
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!__classPrivateFieldGet(this, _PQueue_isPaused, "f")) {
      return this;
    }
    __classPrivateFieldSet(this, _PQueue_isPaused, false, "f");
    __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_processQueue).call(this);
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    __classPrivateFieldSet(this, _PQueue_isPaused, true, "f");
  }
  /**
  Clear the queue.
  */
  clear() {
    __classPrivateFieldSet(this, _PQueue_queue, new (__classPrivateFieldGet(this, _PQueue_queueClass, "f"))(), "f");
  }
  /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
  async onEmpty() {
    if (__classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "empty");
  }
  /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
  async onSizeLessThan(limit) {
    if (__classPrivateFieldGet(this, _PQueue_queue, "f").size < limit) {
      return;
    }
    await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "next", () => __classPrivateFieldGet(this, _PQueue_queue, "f").size < limit);
  }
  /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
  async onIdle() {
    if (__classPrivateFieldGet(this, _PQueue_pendingCount, "f") === 0 && __classPrivateFieldGet(this, _PQueue_queue, "f").size === 0) {
      return;
    }
    await __classPrivateFieldGet(this, _PQueue_instances, "m", _PQueue_onEvent).call(this, "idle");
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return __classPrivateFieldGet(this, _PQueue_queue, "f").size;
  }
  /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
  sizeBy(options) {
    return __classPrivateFieldGet(this, _PQueue_queue, "f").filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return __classPrivateFieldGet(this, _PQueue_pendingCount, "f");
  }
  /**
  Whether the queue is currently paused.
  */
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
    /**
     * Get the current configuration from the repo.
     *
     * @param {object} [options] - options
     * @param {AbortSignal} [options.signal] - abort this config read
     * @returns {Promise<Config>}
     */
    async getAll(options = {}) {
      const encodedValue = await getWithFallback(configKey, store.get.bind(store), store.has.bind(store), store);
      return JSON.parse(toString$5(encodedValue));
    },
    /**
     * Get the value for the passed configuration key from the repo.
     *
     * @param {string} key - the config key to get
     * @param {object} [options] - options
     * @param {AbortSignal} [options.signal] - abort this config read
     */
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
    /**
     * Set the current configuration for this repo.
     *
     * @param {string} key - the config key to be written
     * @param {any} [value] - the config value to be written
     * @param {object} [options] - options
     * @param {AbortSignal} [options.signal] - abort this config write
     */
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
    /**
     * Set the current configuration for this repo.
     *
     * @param {Config} [value] - the config value to be written
     * @param {object} [options] - options
     * @param {AbortSignal} [options.signal] - abort this config write
     */
    replace(value, options = {}) {
      if (!value || value instanceof Uint8Array) {
        throw errCode(new Error("Invalid value type: " + typeof value), "ERR_INVALID_VALUE");
      }
      return setQueue.add(() => _maybeDoSet({
        key: void 0,
        value
      }, options.signal));
    },
    /**
     * Check if a config file exists.
     *
     */
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
    const buf = fromString$5(JSON.stringify(config2, null, 2));
    return store.put(configKey, buf);
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
    /**
     * Check if a datastore spec file exists.
     *
     */
    exists() {
      return store.has(specKey);
    },
    /**
     * Get the current datastore spec.
     *
     * @returns {Promise<Uint8Array>}
     */
    async get() {
      const buf = await store.get(specKey);
      return JSON.parse(toString$5(buf));
    },
    /**
     * Set the datastore spec of the repo, writing it to the underlying store.
     * TODO unclear on what the type should be or if it's required
     *
     * @param {any} spec
     * @returns {Promise<void>}
     */
    async set(spec2) {
      return store.put(specKey, fromString$5(JSON.stringify(sortKeys(spec2, { deep: true }))));
    }
  };
}
const apiFile = new Key("api");
function apiAddr(store) {
  return {
    /**
     * Get the current configuration from the repo.
     *
     * @returns {Promise<string>}
     */
    async get() {
      const value = await store.get(apiFile);
      return value && value.toString();
    },
    /**
     * Set the current configuration for this repo.
     * TODO: fix find the proper type or remove this API
     *
     * @param {string} value - the api address to be written
     */
    set(value) {
      return store.put(apiFile, fromString$5(value.toString()));
    },
    /**
     * Deletes api file
     */
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
let FixedFIFO$1 = class FixedFIFO2 {
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
};
let FIFO$1 = class FIFO2 {
  constructor(options = {}) {
    this.hwm = options.splitLimit ?? 16;
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
};
function pushable$1(options = {}) {
  const getNext = (buffer) => {
    const next = buffer.shift();
    if (next == null) {
      return { done: true };
    }
    if (next.error != null) {
      throw next.error;
    }
    return {
      done: next.done === true,
      // @ts-expect-error
      value: next.value
    };
  };
  return _pushable(getNext, options);
}
function _pushable(getNext, options) {
  options = options ?? {};
  let onEnd = options.onEnd;
  let buffer = new FIFO$1();
  let pushable2;
  let onNext;
  let ended;
  const waitNext = async () => {
    if (!buffer.isEmpty()) {
      return getNext(buffer);
    }
    if (ended) {
      return { done: true };
    }
    return await new Promise((resolve, reject) => {
      onNext = (next) => {
        onNext = null;
        buffer.push(next);
        try {
          resolve(getNext(buffer));
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
    buffer.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer = new FIFO$1();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer.push({ error: err });
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
    buffer = new FIFO$1();
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
      return buffer.size;
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
var encode_1$1 = encode$9;
var MSB$2 = 128, REST$2 = 127, MSBALL$1 = ~REST$2, INT$1 = Math.pow(2, 31);
function encode$9(num, out, offset) {
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
  encode$9.bytes = offset - oldOffset + 1;
  return out;
}
var decode$c = read$1;
var MSB$1$1 = 128, REST$1$1 = 127;
function read$1(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read$1.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
  decode: decode$c,
  encodingLength: length$1
};
var _brrp_varint$1 = varint$1;
const decode$b = (data, offset = 0) => {
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
const decode$a = (multihash) => {
  const bytes2 = coerce$4(multihash);
  const [code2, sizeOffset] = decode$b(bytes2);
  const [size, digestOffset] = decode$b(bytes2.subarray(sizeOffset));
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
let Digest$1 = class Digest6 {
  constructor(code2, size, digest2, bytes2) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes2;
  }
};
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
let Encoder$4 = class Encoder7 {
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
};
let Decoder$4 = class Decoder7 {
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
};
let ComposedDecoder$4 = class ComposedDecoder7 {
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
};
const or$4 = (left, right) => new ComposedDecoder$4({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
let Codec$4 = class Codec7 {
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
};
const from$4 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$4(name2, prefix, encode2, decode2);
const baseX$4 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$4(alphabet2, name2);
  return from$4({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce$4(decode2(text))
  });
};
const decode$9 = (string2, alphabet2, bitsPerChar, name2) => {
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$8 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$4 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$4({
    prefix,
    name: name2,
    encode(input) {
      return encode$8(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$9(input, alphabet2, bitsPerChar, name2);
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
const base32$4 = rfc4648$4({
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
let CID$1 = class CID6 {
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
        return toStringV0$1(bytes2, _baseCache, base3 || base58btc$4.encoder);
      default:
        return toStringV1$1(bytes2, _baseCache, base3 || base32$4.encoder);
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
      const digest2 = decode$a(multihash);
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
    const multihashBytes = coerce$4(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
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
      const [i, length2] = decode$b(initialBytes.subarray(offset));
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
};
const parseCIDtoBytes$1 = (source, base3) => {
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
    case base32$4.prefix: {
      const decoder = base3 || base32$4;
      return [
        base32$4.prefix,
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
const toStringV0$1 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$4.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$1 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache2.set(prefix, cid2);
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
const version$1 = "0.0.0-dev";
const deprecate$1 = (range, message) => {
  if (range.test(version$1)) {
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
const code$1 = 0;
const name$1 = "identity";
const encode$7 = coerce$4;
const digest = (input) => create$1(code$1, encode$7(input));
const identity = {
  code: code$1,
  name: name$1,
  encode: encode$7,
  digest
};
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
    async put(cid, buf, options) {
      const { isIdentity } = extractContents(cid);
      if (isIdentity) {
        return;
      }
      await store.put(cid, buf, options);
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
        put(cid, buf) {
          const { isIdentity } = extractContents(cid);
          if (isIdentity) {
            return;
          }
          batch2.put(cid, buf);
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
  if (cid.multihash.code !== identity.code) {
    return {
      isIdentity: false
    };
  }
  return {
    isIdentity: true,
    digest: cid.multihash.digest
  };
}
const log$3 = browserExports("ipfs:repo:lock:memory");
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
  const encoded = base32$4.encode(cid.multihash.bytes);
  return new Key("/" + encoded.slice(1).toUpperCase(), false);
}
function keyToMultihash(key) {
  return decode$a(base32$4.decode(`b${key.toString().toLowerCase().substring(1)}`));
}
const log$2 = browserExports("ipfs:repo:utils:walk-dag");
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
  /** @type {'direct'} */
  direct: "direct",
  /** @type {'recursive'} */
  recursive: "recursive",
  /** @type {'indirect'} */
  indirect: "indirect",
  /** @type {'all'} */
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
  // TODO: Use private class methods when targeting Node.js 16.
  _emitEvictions(cache2) {
    if (typeof this.onEviction !== "function") {
      return;
    }
    for (const [key, item] of cache2) {
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
  _peek(key, cache2) {
    const item = cache2.get(key);
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
  /**
   * @param {object} config
   * @param {import('interface-datastore').Datastore} config.pinstore
   * @param {import('interface-blockstore').Blockstore} config.blockstore
   * @param {import('./types').loadCodec} config.loadCodec
   */
  constructor({ pinstore, blockstore, loadCodec }) {
    this.pinstore = pinstore;
    this.blockstore = blockstore;
    this.loadCodec = loadCodec;
    this.log = browserExports("ipfs:repo:pin");
    this.directPins = /* @__PURE__ */ new Set();
    this.recursivePins = /* @__PURE__ */ new Set();
  }
  /**
   * @param {CID} cid
   * @param {PinOptions & AbortOptions} [options]
   */
  async pinDirectly(cid, options = {}) {
    await this.blockstore.get(cid, options);
    const pin = {
      depth: 0
    };
    if (cid.version !== 0) {
      pin.version = cid.version;
    }
    if (cid.code !== code$2) {
      pin.codec = cid.code;
    }
    if (options.metadata) {
      pin.metadata = options.metadata;
    }
    return this.pinstore.put(cidToKey(cid), encode$o(pin));
  }
  /**
   * @param {CID} cid
   * @param {AbortOptions} [options]
   */
  unpin(cid, options) {
    return this.pinstore.delete(cidToKey(cid), options);
  }
  /**
   * @param {CID} cid
   * @param {PinOptions & FetchCompleteDagOptions & AbortOptions} [options]
   */
  async pinRecursively(cid, options = {}) {
    await this.fetchCompleteDag(cid, options);
    const pin = {
      depth: Infinity
    };
    if (cid.version !== 0) {
      pin.version = cid.version;
    }
    if (cid.code !== code$2) {
      pin.codec = cid.code;
    }
    if (options.metadata) {
      pin.metadata = options.metadata;
    }
    await this.pinstore.put(cidToKey(cid), encode$o(pin));
  }
  /**
   * @param {AbortOptions} [options]
   */
  async *directKeys(options) {
    for await (const entry of this.pinstore.query({
      filters: [(entry2) => {
        const pin = decode$z(entry2.value);
        return pin.depth === 0;
      }]
    })) {
      const pin = decode$z(entry.value);
      const version2 = pin.version || 0;
      const codec = pin.codec != null ? pin.codec : code$2;
      const multihash = keyToMultihash(entry.key);
      yield {
        cid: CID$1.create(version2, codec, multihash),
        metadata: pin.metadata
      };
    }
  }
  /**
   * @param {AbortOptions} [options]
   */
  async *recursiveKeys(options) {
    for await (const entry of this.pinstore.query({
      filters: [(entry2) => {
        const pin = decode$z(entry2.value);
        return pin.depth === Infinity;
      }]
    })) {
      const pin = decode$z(entry.value);
      const version2 = pin.version || 0;
      const codec = pin.codec != null ? pin.codec : code$2;
      const multihash = keyToMultihash(entry.key);
      yield {
        cid: CID$1.create(version2, codec, multihash),
        metadata: pin.metadata
      };
    }
  }
  /**
   * @param {AbortOptions} [options]
   */
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
  /**
   * @param {CID} cid
   * @param {PinQueryType|PinQueryType[]} types
   * @param {AbortOptions} [options]
   */
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
          const pin = decode$z(entry.value);
          return types.includes(pin.depth === 0 ? PinTypes.direct : PinTypes.recursive);
        }],
        limit: 1
      }));
      if (result) {
        const pin = decode$z(result.value);
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
  /**
   * @param {CID} cid
   * @param {FetchCompleteDagOptions} [options]
   */
  async fetchCompleteDag(cid, options = {}) {
    const seen = new QuickLRU({ maxSize: options.cidCacheMaxSize ?? CID_CACHE_MAX_SIZE });
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
  /**
   * Throws an error if the pin type is invalid
   *
   * @param {any} type
   * @returns {type is PinType}
   */
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
    async put(cid, buf, options) {
      await store.put(cid, buf, options);
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
function pTimeout(promise, options) {
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
      resolve(promise);
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
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      reject(timeoutError2);
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
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
      /**
       * @param {() => Promise<T>} p
       */
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
async function* merge$1(...sources) {
  const output = pushable$1({
    objectMode: true
  });
  void Promise.resolve().then(async () => {
    try {
      await Promise.all(sources.map(async (source) => {
        for await (const item of source) {
          output.push(item);
        }
      }));
      output.end();
    } catch (err) {
      output.end(err);
    }
  });
  yield* output;
}
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
      return merge$1(stream, sourceWrap());
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
var fixedSize = class FixedFIFO3 {
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
  let buffer = new FIFO();
  let pushable2, onNext, ended;
  const waitNext = () => {
    if (!buffer.isEmpty()) {
      if (options.writev) {
        let next2;
        const values = [];
        while (!buffer.isEmpty()) {
          next2 = buffer.shift();
          if (next2.error)
            throw next2.error;
          values.push(next2.value);
        }
        return { done: next2.done, value: values };
      }
      const next = buffer.shift();
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
    buffer.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer = new FIFO();
    if (onNext)
      return onNext({ error: err });
    buffer.push({ error: err });
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
    buffer = new FIFO();
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
const log$1 = browserExports("ipfs:repo:gc");
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
    output.add(base32$4.encode(cid.multihash.bytes));
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
        const b32 = base32$4.encode(cid.multihash.bytes);
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
    // filter nulls (blocks that were retained)
    (source) => itFilter(source, Boolean)
  );
  log$1(`Marked set has ${markedSet.size} unique blocks. Blockstore has ${blocksCount} blocks. Deleted ${removedBlocksCount} blocks.`);
}
const log = browserExports("ipfs:repo");
const noLimit = Number.MAX_SAFE_INTEGER;
const AUTO_MIGRATE_CONFIG_KEY = "repoAutoMigrate";
class Repo {
  /**
   * @param {string} path - Where this repo is stored
   * @param {import('./types').loadCodec} loadCodec - a function that will load multiformat block codecs
   * @param {Backends} backends - backends used by this repo
   * @param {Partial<Options>} [options] - Configuration
   */
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
    this.version = version$2(this.root);
    this.config = config(this.root);
    this.spec = spec(this.root);
    this.apiAddr = apiAddr(this.root);
    this.gcLock = createMortice({
      name: path,
      singleProcess: this.options.repoOwner !== false
    });
    this.gc = gc({ gcLock: this.gcLock, pins: this.pins, blockstore: this.blocks, root: this.root, loadCodec });
  }
  /**
   * Initialize a new repo.
   *
   * @param {import('./types').Config} config - config to write into `config`.
   * @returns {Promise<void>}
   */
  async init(config2) {
    log("initializing at: %s", this.path);
    await this._openRoot();
    await this.config.replace(buildConfig(config2));
    await this.spec.set(buildDatastoreSpec(config2));
    await this.version.set(repoVersion);
  }
  /**
   * Check if the repo is already initialized.
   *
   * @returns {Promise<boolean>}
   */
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
  /**
   * Open the repo. If the repo is already open an error will be thrown.
   * If the repo is not initialized it will throw an error.
   *
   * @returns {Promise<void>}
   */
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
  /**
   * Opens the root backend, catching and ignoring an 'Already open' error
   *
   * @private
   */
  async _openRoot() {
    try {
      await this.root.open();
    } catch (err) {
      if (err.message !== "Already open") {
        throw err;
      }
    }
  }
  /**
   * Creates a lock on the repo if a locker is specified. The lockfile object will
   * be returned in the callback if one has been created.
   *
   * @private
   * @returns {Promise<LockCloser>}
   */
  async _openLock() {
    const lockfile = await this.options.repoLock.lock(this.path);
    if (typeof lockfile.close !== "function") {
      throw errCode(new Error("Locks must have a close method"), "ERR_NO_CLOSE_FUNCTION");
    }
    return lockfile;
  }
  /**
   * Closes the lock on the repo
   *
   * @private
   */
  _closeLock() {
    return this._lockfile && this._lockfile.close();
  }
  /**
   * Check if the repo is already initialized.
   *
   * @private
   */
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
  /**
   * Close the repo and cleanup.
   *
   * @returns {Promise<void>}
   */
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
  /**
   * Check if a repo exists.
   *
   * @returns {Promise<boolean>}
   */
  exists() {
    return this.version.exists();
  }
  /**
   * Get repo status.
   *
   * @returns {Promise<Stat>}
   */
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
  /**
   * @private
   */
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
  /**
   * Internal migration
   *
   * @private
   * @param {number} toVersion
   * @param {Backends} backends
   */
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
  /**
   * @private
   */
  async _storageMaxStat() {
    try {
      const max = (
        /** @type {number} */
        await this.config.get("Datastore.StorageMax")
      );
      return BigInt(bytesExports(max));
    } catch (err) {
      return BigInt(noLimit);
    }
  }
  /**
   * @private
   */
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
new Key(SHARDING_FN);
new Key(README_FN);
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
let Encoder$3 = class Encoder8 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes2) {
    if (bytes2 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes2)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
let Decoder$3 = class Decoder8 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
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
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or$3(this, decoder);
  }
};
let ComposedDecoder$3 = class ComposedDecoder8 {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or$3(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
const or$3 = (left, right) => new ComposedDecoder$3(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
let Codec$3 = class Codec8 {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder$3(name2, prefix, baseEncode);
    this.decoder = new Decoder$3(name2, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
const from$3 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec$3(name2, prefix, encode2, decode2);
const baseX$3 = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX$3(alphabet2, name2);
  return from$3({
    prefix,
    name: name2,
    encode: encode2,
    /**
     * @param {string} text
     */
    decode: (text) => coerce$3(decode2(text))
  });
};
const decode$8 = (string2, alphabet2, bitsPerChar, name2) => {
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$6 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648$3 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$3({
    prefix,
    name: name2,
    encode(input) {
      return encode$6(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$8(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc$3 = baseX$3({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
baseX$3({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base32$3 = rfc4648$3({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
rfc4648$3({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base64$1 = rfc4648$3({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
rfc4648$3({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
rfc4648$3({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
rfc4648$3({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
browserExports.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc$3.baseEncode(v);
};
browserExports.formatters.t = (v) => {
  return v == null ? "undefined" : base32$3.baseEncode(v);
};
browserExports.formatters.m = (v) => {
  return v == null ? "undefined" : base64$1.baseEncode(v);
};
browserExports.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
browserExports.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
browserExports.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
function logger(name2) {
  return Object.assign(browserExports(name2), {
    error: browserExports(`${name2}:error`),
    trace: browserExports(`${name2}:trace`)
  });
}
logger("datastore:core:tiered");
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
let Encoder$2 = class Encoder9 {
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
};
let Decoder$2 = class Decoder9 {
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
};
let ComposedDecoder$2 = class ComposedDecoder9 {
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
};
const or$2 = (left, right) => new ComposedDecoder$2({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
let Codec$2 = class Codec9 {
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
};
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$5 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
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
const all = async (source) => {
  const arr = [];
  for await (const entry of source) {
    arr.push(entry);
  }
  return arr;
};
var itAll = all;
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
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
let Encoder$1 = class Encoder10 {
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
};
let Decoder$1 = class Decoder10 {
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
};
let ComposedDecoder$1 = class ComposedDecoder10 {
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
};
const or$1 = (left, right) => new ComposedDecoder$1({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
let Codec$1 = class Codec10 {
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
};
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$3 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
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
const toStringV0 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$1.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes2, cache2, base3) => {
  const { prefix } = base3;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes2);
    cache2.set(prefix, cid2);
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
  prefix(buf) {
    const recurs = this.inRecursive[this.inRecursive.length - 1];
    if (recurs) {
      if (recurs.type === Type.array) {
        recurs.elements++;
        if (recurs.elements !== 1) {
          buf.push([44]);
        }
      }
      if (recurs.type === Type.map) {
        recurs.elements++;
        if (recurs.elements !== 1) {
          if (recurs.elements % 2 === 1) {
            buf.push([44]);
          } else {
            buf.push([58]);
          }
        }
      }
    }
  }
  [Type.uint.major](buf, token) {
    this.prefix(buf);
    const is = String(token.value);
    const isa = [];
    for (let i = 0; i < is.length; i++) {
      isa[i] = is.charCodeAt(i);
    }
    buf.push(isa);
  }
  [Type.negint.major](buf, token) {
    this[Type.uint.major](buf, token);
  }
  [Type.bytes.major](_buf, _token) {
    throw new Error(`${encodeErrPrefix} unsupported type: Uint8Array`);
  }
  [Type.string.major](buf, token) {
    this.prefix(buf);
    const byts = fromString$6(JSON.stringify(token.value));
    buf.push(byts.length > 32 ? asU8A(byts) : byts);
  }
  [Type.array.major](buf, _token) {
    this.prefix(buf);
    this.inRecursive.push({
      type: Type.array,
      elements: 0
    });
    buf.push([91]);
  }
  [Type.map.major](buf, _token) {
    this.prefix(buf);
    this.inRecursive.push({
      type: Type.map,
      elements: 0
    });
    buf.push([123]);
  }
  [Type.tag.major](_buf, _token) {
  }
  [Type.float.major](buf, token) {
    if (token.type.name === "break") {
      const recurs = this.inRecursive.pop();
      if (recurs) {
        if (recurs.type === Type.array) {
          buf.push([93]);
        } else if (recurs.type === Type.map) {
          buf.push([125]);
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
    this.prefix(buf);
    if (token.type.name === "true") {
      buf.push([
        116,
        114,
        117,
        101
      ]);
      return;
    } else if (token.type.name === "false") {
      buf.push([
        102,
        97,
        108,
        115,
        101
      ]);
      return;
    } else if (token.type.name === "null") {
      buf.push([
        110,
        117,
        108,
        108
      ]);
      return;
    }
    const is = String(token.value);
    const isa = [];
    let dp = false;
    for (let i = 0; i < is.length; i++) {
      isa[i] = is.charCodeAt(i);
      if (!dp && (isa[i] === 46 || isa[i] === 101 || isa[i] === 69)) {
        dp = true;
      }
    }
    if (!dp) {
      isa.push(46);
      isa.push(48);
    }
    buf.push(isa);
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
  return decode$z(data, options);
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
  code,
  decode: decode$1,
  encode: encode$1,
  name
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
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
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
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end2; ++i) {
    const value = codes2[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
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
  CarReader as C,
  Key as K,
  MemoryLock as M,
  dbWriteFailedError as a,
  browserExports as b,
  dbDeleteFailedError as c,
  dbOpenFailedError as d,
  errCode as e,
  coerce$2 as f,
  equals$3 as g,
  base32$2 as h,
  base58btc$2 as i,
  itDrain as j,
  itFilter as k,
  itAll as l,
  base32pad as m,
  notFoundError as n,
  createRepo as o,
  pushable$1 as p,
  base64url as q,
  coerce as r,
  equals as s,
  base32 as t,
  base58btc as u,
  mitt as v,
  headerLength as w,
  blockLength as x,
  createWriter as y,
  dagJSON as z
};
//# sourceMappingURL=base32-532e194d.js.map
