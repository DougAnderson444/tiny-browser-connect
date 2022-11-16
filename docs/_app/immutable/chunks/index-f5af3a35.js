import { z as mitt, C as CarReader, A as headerLength, B as blockLength, D as createWriter, E as dagCBOR, i as itAll } from "./base32-4c9972d0.js";
import { k as getDefaultExportFromCjs } from "./_page-dd37122a.js";
var encode_1 = encode$7;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode$7(num, out, offset) {
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
  encode$7.bytes = offset - oldOffset + 1;
  return out;
}
var decode$6 = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b2, l2 = buf.length;
  do {
    if (counter >= l2) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b2 = buf[counter++];
    res += shift < 28 ? (b2 & REST$1) << shift : (b2 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b2 >= MSB$1);
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
const decode$5 = (data2, offset = 0) => {
  const code2 = _brrp_varint.decode(data2, offset);
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
const empty = new Uint8Array(0);
const toHex = (d2) => d2.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
const fromHex = (hex) => {
  const hexes = hex.match(/../g);
  return hexes ? new Uint8Array(hexes.map((b2) => parseInt(b2, 16))) : empty;
};
const equals$1 = (aa, bb) => {
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
const isBinary$1 = (o) => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
const fromString = (str) => new TextEncoder().encode(str);
const toString$1 = (b2) => new TextDecoder().decode(b2);
const byteslib = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  equals: equals$1,
  coerce,
  isBinary: isBinary$1,
  fromHex,
  toHex,
  fromString,
  toString: toString$1,
  empty
}, Symbol.toStringTag, { value: "Module" }));
const create$1 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes);
};
const decode$4 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode$5(bytes);
  const [size, digestOffset] = decode$5(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes);
};
const equals = (a2, b2) => {
  if (a2 === b2) {
    return true;
  } else {
    return a2.code === b2.code && a2.size === b2.size && equals$1(a2.bytes, b2.bytes);
  }
};
class Digest {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
}
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x2 = ALPHABET.charAt(i);
    var xc = x2.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x2 + " is ambiguous");
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
  function decode2(string) {
    var buffer = decodeUnsafe(string);
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
class Encoder {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
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
  constructor(decoders) {
    this.decoders = decoders;
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
const from$1 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec(name2, prefix, encode2, decode2);
const baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet2, name2);
  return from$1({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce(decode2(text))
  });
};
const decode$3 = (string, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string.length;
  while (string[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string[i]];
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
const encode$6 = (data2, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data2.length; ++i) {
    buffer = buffer << 8 | data2[i];
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
  return from$1({
    prefix,
    name: name2,
    encode(input) {
      return encode$6(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$3(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32,
  base32upper,
  base32pad,
  base32padupper,
  base32hex,
  base32hexupper,
  base32hexpad,
  base32hexpadupper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
class CID {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly$1,
      version: readonly$1,
      multihash: readonly$1,
      bytes: readonly$1,
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
        const multihash = create$1(code2, digest2);
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
    return other && this.code === other.code && this.version === other.version && equals(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
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
      const { version: version2, code: code2, multihash, bytes } = value;
      return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
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
        const bytes = encodeCID(version2, code2, digest2.bytes);
        return new CID(version2, code2, digest2, bytes);
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
  static decode(bytes) {
    const [cid, remainder] = CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
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
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
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
const toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
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
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const readonly$1 = {
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
const from = ({ name: name2, code: code2, encode: encode2 }) => new Hasher(name2, code2, encode2);
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
const name$1 = "raw";
const code$1 = 85;
const encode$5 = (node) => coerce(node);
const decode$2 = (data2) => coerce(data2);
const raw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: name$1,
  code: code$1,
  encode: encode$5,
  decode: decode$2
}, Symbol.toStringTag, { value: "Module" }));
const sha = (name2) => async (data2) => new Uint8Array(await crypto.subtle.digest(name2, data2));
const sha256 = from({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
const sha512 = from({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});
const sha2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256,
  sha512
}, Symbol.toStringTag, { value: "Module" }));
const readonly = ({ enumerable = true, configurable = false } = {}) => ({
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
          const cid = CID.asCID(element);
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
        const cid = CID.asCID(value);
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
    if (value != null && !(value instanceof Uint8Array) && typeof value === "object" && !CID.asCID(value)) {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          yield elementPath.join("/");
          if (typeof element === "object" && !CID.asCID(element)) {
            yield* tree(element, elementPath);
          }
        }
      } else {
        yield* tree(value, path);
      }
    }
  }
};
const get$1 = (source, path) => {
  let node = source;
  for (const [index, key] of path.entries()) {
    node = node[key];
    if (node == null) {
      throw new Error(`Object has no property at ${path.slice(0, index + 1).map((part) => `[${JSON.stringify(part)}]`).join("")}`);
    }
    const cid = CID.asCID(node);
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
  constructor({ cid, bytes, value }) {
    if (!cid || !bytes || typeof value === "undefined")
      throw new Error("Missing required argument");
    this.cid = cid;
    this.bytes = bytes;
    this.value = value;
    this.asBlock = this;
    Object.defineProperties(this, {
      cid: readonly(),
      bytes: readonly(),
      value: readonly(),
      asBlock: readonly()
    });
  }
  links() {
    return links(this.value, []);
  }
  tree() {
    return tree(this.value, []);
  }
  get(path = "/") {
    return get$1(this.value, path.split("/").filter(Boolean));
  }
}
const encode$4 = async ({ value, codec, hasher }) => {
  if (typeof value === "undefined")
    throw new Error('Missing required argument "value"');
  if (!codec || !hasher)
    throw new Error("Missing required argument: codec or hasher");
  const bytes = codec.encode(value);
  const hash = await hasher.digest(bytes);
  const cid = CID.create(1, codec.code, hash);
  return new Block({
    value,
    bytes,
    cid
  });
};
const createUnsafe = ({
  bytes,
  cid,
  value: maybeValue,
  codec
}) => {
  const value = maybeValue !== void 0 ? maybeValue : codec && codec.decode(bytes);
  if (value === void 0)
    throw new Error('Missing required argument, must either provide "value" or "codec"');
  return new Block({
    cid,
    bytes,
    value
  });
};
const create = async ({ bytes, cid, hasher, codec }) => {
  if (!bytes)
    throw new Error('Missing required argument "bytes"');
  if (!hasher)
    throw new Error('Missing required argument "hasher"');
  const value = codec.decode(bytes);
  const hash = await hasher.digest(bytes);
  if (!equals$1(cid.multihash.bytes, hash.bytes)) {
    throw new Error("CID hash does not match bytes");
  }
  return createUnsafe({
    bytes,
    cid,
    value,
    codec
  });
};
const { isBinary } = byteslib;
const encode$3 = (value) => {
  if (isBinary(value)) {
    return encode$4({ value, hasher: sha256, codec: raw });
  }
  return encode$4({ value, hasher: sha256, codec: dagCBOR });
};
const decode$1 = ({ bytes, cid }) => {
  let hasher, codec;
  const { code: code2 } = cid;
  const hashcode = cid.multihash.code || decode$4(cid.multihash).code;
  if (hashcode === 18) {
    hasher = sha256;
  } else {
    throw new Error("Unsupported hash function: " + hashcode);
  }
  if (code2 === 113) {
    codec = dagCBOR;
  } else if (code2 === 85) {
    codec = raw;
  } else {
    throw new Error("Unsupported codec: " + code2);
  }
  return create({ bytes, cid, codec, hasher });
};
class Transaction {
  constructor() {
    Object.assign(this, mitt());
    this.blocks = [];
  }
  static create() {
    return new this();
  }
  static async load(buffer) {
    const reader = await CarReader.fromBytes(buffer);
    const [root] = await reader.getRoots();
    const get2 = (cid) => reader.get(cid).then((block) => decode$1(block)).then(({ value }) => value);
    return { root, get: get2 };
  }
  async add(obj) {
    const block = await encode$3(obj);
    this.last = block;
    this.blocks.push(block);
    this.emit("size", this.size);
    return block.cid;
  }
  async get(block) {
    const { cid, bytes, value } = await decode$1(block);
    return { cid, bytes, value };
  }
  undo() {
    return this.blocks.pop();
  }
  async commit() {
    const cid = this.last.cid;
    let size = 0;
    let headerSize = headerLength({ roots: [cid] });
    size += headerSize;
    for (const block of this.blocks) {
      size += blockLength(block);
    }
    const buffer = new Uint8Array(size);
    const writer = await createWriter(buffer, { headerSize });
    writer.addRoot(cid);
    for (const block of this.blocks) {
      writer.write(block);
    }
    await writer.close();
    return writer.bytes;
  }
  get size() {
    if (!(this == null ? void 0 : this.last))
      return 0;
    const cid = this.last.cid;
    let size = 0;
    let headerSize = headerLength({ roots: [cid] });
    size += headerSize;
    for (const block of this.blocks) {
      size += blockLength(block);
    }
    return size;
  }
}
var Tc = Object.create;
var nr = Object.defineProperty;
var Ic = Object.getOwnPropertyDescriptor;
var Sc = Object.getOwnPropertyNames;
var Uc = Object.getPrototypeOf, Fc = Object.prototype.hasOwnProperty;
var F = (t, e) => () => (t && (e = t(t = 0)), e);
var S = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), M = (t, e) => {
  for (var r in e)
    nr(t, r, { get: e[r], enumerable: true });
}, No = (t, e, r, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of Sc(e))
      !Fc.call(t, o) && o !== r && nr(t, o, { get: () => e[o], enumerable: !(n = Ic(e, o)) || n.enumerable });
  return t;
};
var J = (t, e, r) => (r = t != null ? Tc(Uc(t)) : {}, No(e || !t || !t.__esModule ? nr(r, "default", { value: t, enumerable: true }) : r, t)), R = (t) => No(nr({}, "__esModule", { value: true }), t);
var Po = S((or2) => {
  a();
  or2.byteLength = kc;
  or2.toByteArray = Nc;
  or2.fromByteArray = Pc;
  var De = [], ue = [], vc = typeof Uint8Array < "u" ? Uint8Array : Array, Xr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ge = 0, $o = Xr.length; Ge < $o; ++Ge)
    De[Ge] = Xr[Ge], ue[Xr.charCodeAt(Ge)] = Ge;
  var Ge, $o;
  ue["-".charCodeAt(0)] = 62;
  ue["_".charCodeAt(0)] = 63;
  function Lo(t) {
    var e = t.length;
    if (e % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var r = t.indexOf("=");
    r === -1 && (r = e);
    var n = r === e ? 0 : 4 - r % 4;
    return [r, n];
  }
  function kc(t) {
    var e = Lo(t), r = e[0], n = e[1];
    return (r + n) * 3 / 4 - n;
  }
  function _c(t, e, r) {
    return (e + r) * 3 / 4 - r;
  }
  function Nc(t) {
    var e, r = Lo(t), n = r[0], o = r[1], i = new vc(_c(t, n, o)), s = 0, u = o > 0 ? n - 4 : n, h;
    for (h = 0; h < u; h += 4)
      e = ue[t.charCodeAt(h)] << 18 | ue[t.charCodeAt(h + 1)] << 12 | ue[t.charCodeAt(h + 2)] << 6 | ue[t.charCodeAt(h + 3)], i[s++] = e >> 16 & 255, i[s++] = e >> 8 & 255, i[s++] = e & 255;
    return o === 2 && (e = ue[t.charCodeAt(h)] << 2 | ue[t.charCodeAt(h + 1)] >> 4, i[s++] = e & 255), o === 1 && (e = ue[t.charCodeAt(h)] << 10 | ue[t.charCodeAt(h + 1)] << 4 | ue[t.charCodeAt(h + 2)] >> 2, i[s++] = e >> 8 & 255, i[s++] = e & 255), i;
  }
  function $c(t) {
    return De[t >> 18 & 63] + De[t >> 12 & 63] + De[t >> 6 & 63] + De[t & 63];
  }
  function Lc(t, e, r) {
    for (var n, o = [], i = e; i < r; i += 3)
      n = (t[i] << 16 & 16711680) + (t[i + 1] << 8 & 65280) + (t[i + 2] & 255), o.push($c(n));
    return o.join("");
  }
  function Pc(t) {
    for (var e, r = t.length, n = r % 3, o = [], i = 16383, s = 0, u = r - n; s < u; s += i)
      o.push(Lc(t, s, s + i > u ? u : s + i));
    return n === 1 ? (e = t[r - 1], o.push(De[e >> 2] + De[e << 4 & 63] + "==")) : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], o.push(De[e >> 10] + De[e >> 4 & 63] + De[e << 2 & 63] + "=")), o.join("");
  }
});
var Ro = S((Yr) => {
  a();
  Yr.read = function(t, e, r, n, o) {
    var i, s, u = o * 8 - n - 1, h = (1 << u) - 1, w = h >> 1, c = -7, g = r ? o - 1 : 0, B = r ? -1 : 1, k = t[e + g];
    for (g += B, i = k & (1 << -c) - 1, k >>= -c, c += u; c > 0; i = i * 256 + t[e + g], g += B, c -= 8)
      ;
    for (s = i & (1 << -c) - 1, i >>= -c, c += n; c > 0; s = s * 256 + t[e + g], g += B, c -= 8)
      ;
    if (i === 0)
      i = 1 - w;
    else {
      if (i === h)
        return s ? NaN : (k ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, n), i = i - w;
    }
    return (k ? -1 : 1) * s * Math.pow(2, i - n);
  };
  Yr.write = function(t, e, r, n, o, i) {
    var s, u, h, w = i * 8 - o - 1, c = (1 << w) - 1, g = c >> 1, B = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = n ? 0 : i - 1, I = n ? 1 : -1, v = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), s + g >= 1 ? e += B / h : e += B * Math.pow(2, 1 - g), e * h >= 2 && (s++, h /= 2), s + g >= c ? (u = 0, s = c) : s + g >= 1 ? (u = (e * h - 1) * Math.pow(2, o), s = s + g) : (u = e * Math.pow(2, g - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + k] = u & 255, k += I, u /= 256, o -= 8)
      ;
    for (s = s << o | u, w += o; w > 0; t[r + k] = s & 255, k += I, s /= 256, w -= 8)
      ;
    t[r + k - I] |= v * 128;
  };
});
var ti = S((st) => {
  a();
  var Qr = Po(), ot = Ro(), Mo = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  st.Buffer = f;
  st.SlowBuffer = Hc;
  st.INSPECT_MAX_BYTES = 50;
  var ir = 2147483647;
  st.kMaxLength = ir;
  f.TYPED_ARRAY_SUPPORT = Rc();
  !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function Rc() {
    try {
      let t = new Uint8Array(1), e = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), t.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(f.prototype, "parent", { enumerable: true, get: function() {
    if (!!f.isBuffer(this))
      return this.buffer;
  } });
  Object.defineProperty(f.prototype, "offset", { enumerable: true, get: function() {
    if (!!f.isBuffer(this))
      return this.byteOffset;
  } });
  function Ae(t) {
    if (t > ir)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
    let e = new Uint8Array(t);
    return Object.setPrototypeOf(e, f.prototype), e;
  }
  function f(t, e, r) {
    if (typeof t == "number") {
      if (typeof e == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return tn(t);
    }
    return Ho(t, e, r);
  }
  f.poolSize = 8192;
  function Ho(t, e, r) {
    if (typeof t == "string")
      return Oc(t, e);
    if (ArrayBuffer.isView(t))
      return zc(t);
    if (t == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
    if (be(t, ArrayBuffer) || t && be(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (be(t, SharedArrayBuffer) || t && be(t.buffer, SharedArrayBuffer)))
      return Kr(t, e, r);
    if (typeof t == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return f.from(n, e, r);
    let o = qc(t);
    if (o)
      return o;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
      return f.from(t[Symbol.toPrimitive]("string"), e, r);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
  }
  f.from = function(t, e, r) {
    return Ho(t, e, r);
  };
  Object.setPrototypeOf(f.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(f, Uint8Array);
  function jo(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function Mc(t, e, r) {
    return jo(t), t <= 0 ? Ae(t) : e !== void 0 ? typeof r == "string" ? Ae(t).fill(e, r) : Ae(t).fill(e) : Ae(t);
  }
  f.alloc = function(t, e, r) {
    return Mc(t, e, r);
  };
  function tn(t) {
    return jo(t), Ae(t < 0 ? 0 : rn(t) | 0);
  }
  f.allocUnsafe = function(t) {
    return tn(t);
  };
  f.allocUnsafeSlow = function(t) {
    return tn(t);
  };
  function Oc(t, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e))
      throw new TypeError("Unknown encoding: " + e);
    let r = Vo(t, e) | 0, n = Ae(r), o = n.write(t, e);
    return o !== r && (n = n.slice(0, o)), n;
  }
  function Zr(t) {
    let e = t.length < 0 ? 0 : rn(t.length) | 0, r = Ae(e);
    for (let n = 0; n < e; n += 1)
      r[n] = t[n] & 255;
    return r;
  }
  function zc(t) {
    if (be(t, Uint8Array)) {
      let e = new Uint8Array(t);
      return Kr(e.buffer, e.byteOffset, e.byteLength);
    }
    return Zr(t);
  }
  function Kr(t, e, r) {
    if (e < 0 || t.byteLength < e)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < e + (r || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && r === void 0 ? n = new Uint8Array(t) : r === void 0 ? n = new Uint8Array(t, e) : n = new Uint8Array(t, e, r), Object.setPrototypeOf(n, f.prototype), n;
  }
  function qc(t) {
    if (f.isBuffer(t)) {
      let e = rn(t.length) | 0, r = Ae(e);
      return r.length === 0 || t.copy(r, 0, 0, e), r;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || on(t.length) ? Ae(0) : Zr(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return Zr(t.data);
  }
  function rn(t) {
    if (t >= ir)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ir.toString(16) + " bytes");
    return t | 0;
  }
  function Hc(t) {
    return +t != t && (t = 0), f.alloc(+t);
  }
  f.isBuffer = function(e) {
    return e != null && e._isBuffer === true && e !== f.prototype;
  };
  f.compare = function(e, r) {
    if (be(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), be(r, Uint8Array) && (r = f.from(r, r.offset, r.byteLength)), !f.isBuffer(e) || !f.isBuffer(r))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === r)
      return 0;
    let n = e.length, o = r.length;
    for (let i = 0, s = Math.min(n, o); i < s; ++i)
      if (e[i] !== r[i]) {
        n = e[i], o = r[i];
        break;
      }
    return n < o ? -1 : o < n ? 1 : 0;
  };
  f.isEncoding = function(e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  f.concat = function(e, r) {
    if (!Array.isArray(e))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0)
      return f.alloc(0);
    let n;
    if (r === void 0)
      for (r = 0, n = 0; n < e.length; ++n)
        r += e[n].length;
    let o = f.allocUnsafe(r), i = 0;
    for (n = 0; n < e.length; ++n) {
      let s = e[n];
      if (be(s, Uint8Array))
        i + s.length > o.length ? (f.isBuffer(s) || (s = f.from(s)), s.copy(o, i)) : Uint8Array.prototype.set.call(o, s, i);
      else if (f.isBuffer(s))
        s.copy(o, i);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      i += s.length;
    }
    return o;
  };
  function Vo(t, e) {
    if (f.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || be(t, ArrayBuffer))
      return t.byteLength;
    if (typeof t != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
    let r = t.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && r === 0)
      return 0;
    let o = false;
    for (; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
          return en(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return r * 2;
        case "hex":
          return r >>> 1;
        case "base64":
          return ei(t).length;
        default:
          if (o)
            return n ? -1 : en(t).length;
          e = ("" + e).toLowerCase(), o = true;
      }
  }
  f.byteLength = Vo;
  function jc(t, e, r) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, e >>>= 0, r <= e))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return ef(this, e, r);
        case "utf8":
        case "utf-8":
          return Wo(this, e, r);
        case "ascii":
          return Zc(this, e, r);
        case "latin1":
        case "binary":
          return Kc(this, e, r);
        case "base64":
          return Yc(this, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return tf(this, e, r);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = true;
      }
  }
  f.prototype._isBuffer = true;
  function We(t, e, r) {
    let n = t[e];
    t[e] = t[r], t[r] = n;
  }
  f.prototype.swap16 = function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let r = 0; r < e; r += 2)
      We(this, r, r + 1);
    return this;
  };
  f.prototype.swap32 = function() {
    let e = this.length;
    if (e % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let r = 0; r < e; r += 4)
      We(this, r, r + 3), We(this, r + 1, r + 2);
    return this;
  };
  f.prototype.swap64 = function() {
    let e = this.length;
    if (e % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let r = 0; r < e; r += 8)
      We(this, r, r + 7), We(this, r + 1, r + 6), We(this, r + 2, r + 5), We(this, r + 3, r + 4);
    return this;
  };
  f.prototype.toString = function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? Wo(this, 0, e) : jc.apply(this, arguments);
  };
  f.prototype.toLocaleString = f.prototype.toString;
  f.prototype.equals = function(e) {
    if (!f.isBuffer(e))
      throw new TypeError("Argument must be a Buffer");
    return this === e ? true : f.compare(this, e) === 0;
  };
  f.prototype.inspect = function() {
    let e = "", r = st.INSPECT_MAX_BYTES;
    return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">";
  };
  Mo && (f.prototype[Mo] = f.prototype.inspect);
  f.prototype.compare = function(e, r, n, o, i) {
    if (be(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (r === void 0 && (r = 0), n === void 0 && (n = e ? e.length : 0), o === void 0 && (o = 0), i === void 0 && (i = this.length), r < 0 || n > e.length || o < 0 || i > this.length)
      throw new RangeError("out of range index");
    if (o >= i && r >= n)
      return 0;
    if (o >= i)
      return -1;
    if (r >= n)
      return 1;
    if (r >>>= 0, n >>>= 0, o >>>= 0, i >>>= 0, this === e)
      return 0;
    let s = i - o, u = n - r, h = Math.min(s, u), w = this.slice(o, i), c = e.slice(r, n);
    for (let g = 0; g < h; ++g)
      if (w[g] !== c[g]) {
        s = w[g], u = c[g];
        break;
      }
    return s < u ? -1 : u < s ? 1 : 0;
  };
  function Go(t, e, r, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, on(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
      if (o)
        return -1;
      r = t.length - 1;
    } else if (r < 0)
      if (o)
        r = 0;
      else
        return -1;
    if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e))
      return e.length === 0 ? -1 : Oo(t, e, r, n, o);
    if (typeof e == "number")
      return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Oo(t, [e], r, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Oo(t, e, r, n, o) {
    let i = 1, s = t.length, u = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || e.length < 2)
        return -1;
      i = 2, s /= 2, u /= 2, r /= 2;
    }
    function h(c, g) {
      return i === 1 ? c[g] : c.readUInt16BE(g * i);
    }
    let w;
    if (o) {
      let c = -1;
      for (w = r; w < s; w++)
        if (h(t, w) === h(e, c === -1 ? 0 : w - c)) {
          if (c === -1 && (c = w), w - c + 1 === u)
            return c * i;
        } else
          c !== -1 && (w -= w - c), c = -1;
    } else
      for (r + u > s && (r = s - u), w = r; w >= 0; w--) {
        let c = true;
        for (let g = 0; g < u; g++)
          if (h(t, w + g) !== h(e, g)) {
            c = false;
            break;
          }
        if (c)
          return w;
      }
    return -1;
  }
  f.prototype.includes = function(e, r, n) {
    return this.indexOf(e, r, n) !== -1;
  };
  f.prototype.indexOf = function(e, r, n) {
    return Go(this, e, r, n, true);
  };
  f.prototype.lastIndexOf = function(e, r, n) {
    return Go(this, e, r, n, false);
  };
  function Vc(t, e, r, n) {
    r = Number(r) || 0;
    let o = t.length - r;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    let i = e.length;
    n > i / 2 && (n = i / 2);
    let s;
    for (s = 0; s < n; ++s) {
      let u = parseInt(e.substr(s * 2, 2), 16);
      if (on(u))
        return s;
      t[r + s] = u;
    }
    return s;
  }
  function Gc(t, e, r, n) {
    return sr(en(e, t.length - r), t, r, n);
  }
  function Wc(t, e, r, n) {
    return sr(sf(e), t, r, n);
  }
  function Jc(t, e, r, n) {
    return sr(ei(e), t, r, n);
  }
  function Xc(t, e, r, n) {
    return sr(af(e, t.length - r), t, r, n);
  }
  f.prototype.write = function(e, r, n, o) {
    if (r === void 0)
      o = "utf8", n = this.length, r = 0;
    else if (n === void 0 && typeof r == "string")
      o = r, n = this.length, r = 0;
    else if (isFinite(r))
      r = r >>> 0, isFinite(n) ? (n = n >>> 0, o === void 0 && (o = "utf8")) : (o = n, n = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let i = this.length - r;
    if ((n === void 0 || n > i) && (n = i), e.length > 0 && (n < 0 || r < 0) || r > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    o || (o = "utf8");
    let s = false;
    for (; ; )
      switch (o) {
        case "hex":
          return Vc(this, e, r, n);
        case "utf8":
        case "utf-8":
          return Gc(this, e, r, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Wc(this, e, r, n);
        case "base64":
          return Jc(this, e, r, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Xc(this, e, r, n);
        default:
          if (s)
            throw new TypeError("Unknown encoding: " + o);
          o = ("" + o).toLowerCase(), s = true;
      }
  };
  f.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function Yc(t, e, r) {
    return e === 0 && r === t.length ? Qr.fromByteArray(t) : Qr.fromByteArray(t.slice(e, r));
  }
  function Wo(t, e, r) {
    r = Math.min(t.length, r);
    let n = [], o = e;
    for (; o < r; ) {
      let i = t[o], s = null, u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
      if (o + u <= r) {
        let h, w, c, g;
        switch (u) {
          case 1:
            i < 128 && (s = i);
            break;
          case 2:
            h = t[o + 1], (h & 192) === 128 && (g = (i & 31) << 6 | h & 63, g > 127 && (s = g));
            break;
          case 3:
            h = t[o + 1], w = t[o + 2], (h & 192) === 128 && (w & 192) === 128 && (g = (i & 15) << 12 | (h & 63) << 6 | w & 63, g > 2047 && (g < 55296 || g > 57343) && (s = g));
            break;
          case 4:
            h = t[o + 1], w = t[o + 2], c = t[o + 3], (h & 192) === 128 && (w & 192) === 128 && (c & 192) === 128 && (g = (i & 15) << 18 | (h & 63) << 12 | (w & 63) << 6 | c & 63, g > 65535 && g < 1114112 && (s = g));
        }
      }
      s === null ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), o += u;
    }
    return Qc(n);
  }
  var zo = 4096;
  function Qc(t) {
    let e = t.length;
    if (e <= zo)
      return String.fromCharCode.apply(String, t);
    let r = "", n = 0;
    for (; n < e; )
      r += String.fromCharCode.apply(String, t.slice(n, n += zo));
    return r;
  }
  function Zc(t, e, r) {
    let n = "";
    r = Math.min(t.length, r);
    for (let o = e; o < r; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Kc(t, e, r) {
    let n = "";
    r = Math.min(t.length, r);
    for (let o = e; o < r; ++o)
      n += String.fromCharCode(t[o]);
    return n;
  }
  function ef(t, e, r) {
    let n = t.length;
    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
    let o = "";
    for (let i = e; i < r; ++i)
      o += uf[t[i]];
    return o;
  }
  function tf(t, e, r) {
    let n = t.slice(e, r), o = "";
    for (let i = 0; i < n.length - 1; i += 2)
      o += String.fromCharCode(n[i] + n[i + 1] * 256);
    return o;
  }
  f.prototype.slice = function(e, r) {
    let n = this.length;
    e = ~~e, r = r === void 0 ? n : ~~r, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < e && (r = e);
    let o = this.subarray(e, r);
    return Object.setPrototypeOf(o, f.prototype), o;
  };
  function O(t, e, r) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + e > r)
      throw new RangeError("Trying to access beyond buffer length");
  }
  f.prototype.readUintLE = f.prototype.readUIntLE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = this[e], i = 1, s = 0;
    for (; ++s < r && (i *= 256); )
      o += this[e + s] * i;
    return o;
  };
  f.prototype.readUintBE = f.prototype.readUIntBE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = this[e + --r], i = 1;
    for (; r > 0 && (i *= 256); )
      o += this[e + --r] * i;
    return o;
  };
  f.prototype.readUint8 = f.prototype.readUInt8 = function(e, r) {
    return e = e >>> 0, r || O(e, 1, this.length), this[e];
  };
  f.prototype.readUint16LE = f.prototype.readUInt16LE = function(e, r) {
    return e = e >>> 0, r || O(e, 2, this.length), this[e] | this[e + 1] << 8;
  };
  f.prototype.readUint16BE = f.prototype.readUInt16BE = function(e, r) {
    return e = e >>> 0, r || O(e, 2, this.length), this[e] << 8 | this[e + 1];
  };
  f.prototype.readUint32LE = f.prototype.readUInt32LE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  };
  f.prototype.readUint32BE = f.prototype.readUInt32BE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  };
  f.prototype.readBigUInt64LE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, i = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(o) + (BigInt(i) << BigInt(32));
  });
  f.prototype.readBigUInt64BE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = r * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], i = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(o) << BigInt(32)) + BigInt(i);
  });
  f.prototype.readIntLE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = this[e], i = 1, s = 0;
    for (; ++s < r && (i *= 256); )
      o += this[e + s] * i;
    return i *= 128, o >= i && (o -= Math.pow(2, 8 * r)), o;
  };
  f.prototype.readIntBE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = r, i = 1, s = this[e + --o];
    for (; o > 0 && (i *= 256); )
      s += this[e + --o] * i;
    return i *= 128, s >= i && (s -= Math.pow(2, 8 * r)), s;
  };
  f.prototype.readInt8 = function(e, r) {
    return e = e >>> 0, r || O(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  };
  f.prototype.readInt16LE = function(e, r) {
    e = e >>> 0, r || O(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  f.prototype.readInt16BE = function(e, r) {
    e = e >>> 0, r || O(e, 2, this.length);
    let n = this[e + 1] | this[e] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  f.prototype.readInt32LE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  };
  f.prototype.readInt32BE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  };
  f.prototype.readBigInt64LE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(o) << BigInt(32)) + BigInt(r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  });
  f.prototype.readBigInt64BE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = (r << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(o) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n);
  });
  f.prototype.readFloatLE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), ot.read(this, e, true, 23, 4);
  };
  f.prototype.readFloatBE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), ot.read(this, e, false, 23, 4);
  };
  f.prototype.readDoubleLE = function(e, r) {
    return e = e >>> 0, r || O(e, 8, this.length), ot.read(this, e, true, 52, 8);
  };
  f.prototype.readDoubleBE = function(e, r) {
    return e = e >>> 0, r || O(e, 8, this.length), ot.read(this, e, false, 52, 8);
  };
  function X(t, e, r, n, o, i) {
    if (!f.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > o || e < i)
      throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length)
      throw new RangeError("Index out of range");
  }
  f.prototype.writeUintLE = f.prototype.writeUIntLE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, n = n >>> 0, !o) {
      let u = Math.pow(2, 8 * n) - 1;
      X(this, e, r, n, u, 0);
    }
    let i = 1, s = 0;
    for (this[r] = e & 255; ++s < n && (i *= 256); )
      this[r + s] = e / i & 255;
    return r + n;
  };
  f.prototype.writeUintBE = f.prototype.writeUIntBE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, n = n >>> 0, !o) {
      let u = Math.pow(2, 8 * n) - 1;
      X(this, e, r, n, u, 0);
    }
    let i = n - 1, s = 1;
    for (this[r + i] = e & 255; --i >= 0 && (s *= 256); )
      this[r + i] = e / s & 255;
    return r + n;
  };
  f.prototype.writeUint8 = f.prototype.writeUInt8 = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 1, 255, 0), this[r] = e & 255, r + 1;
  };
  f.prototype.writeUint16LE = f.prototype.writeUInt16LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 65535, 0), this[r] = e & 255, this[r + 1] = e >>> 8, r + 2;
  };
  f.prototype.writeUint16BE = f.prototype.writeUInt16BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 65535, 0), this[r] = e >>> 8, this[r + 1] = e & 255, r + 2;
  };
  f.prototype.writeUint32LE = f.prototype.writeUInt32LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 4294967295, 0), this[r + 3] = e >>> 24, this[r + 2] = e >>> 16, this[r + 1] = e >>> 8, this[r] = e & 255, r + 4;
  };
  f.prototype.writeUint32BE = f.prototype.writeUInt32BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 4294967295, 0), this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255, r + 4;
  };
  function Jo(t, e, r, n, o) {
    Ko(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    t[r++] = i, i = i >> 8, t[r++] = i, i = i >> 8, t[r++] = i, i = i >> 8, t[r++] = i;
    let s = Number(e >> BigInt(32) & BigInt(4294967295));
    return t[r++] = s, s = s >> 8, t[r++] = s, s = s >> 8, t[r++] = s, s = s >> 8, t[r++] = s, r;
  }
  function Xo(t, e, r, n, o) {
    Ko(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    t[r + 7] = i, i = i >> 8, t[r + 6] = i, i = i >> 8, t[r + 5] = i, i = i >> 8, t[r + 4] = i;
    let s = Number(e >> BigInt(32) & BigInt(4294967295));
    return t[r + 3] = s, s = s >> 8, t[r + 2] = s, s = s >> 8, t[r + 1] = s, s = s >> 8, t[r] = s, r + 8;
  }
  f.prototype.writeBigUInt64LE = _e(function(e, r = 0) {
    return Jo(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  f.prototype.writeBigUInt64BE = _e(function(e, r = 0) {
    return Xo(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  f.prototype.writeIntLE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, !o) {
      let h = Math.pow(2, 8 * n - 1);
      X(this, e, r, n, h - 1, -h);
    }
    let i = 0, s = 1, u = 0;
    for (this[r] = e & 255; ++i < n && (s *= 256); )
      e < 0 && u === 0 && this[r + i - 1] !== 0 && (u = 1), this[r + i] = (e / s >> 0) - u & 255;
    return r + n;
  };
  f.prototype.writeIntBE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, !o) {
      let h = Math.pow(2, 8 * n - 1);
      X(this, e, r, n, h - 1, -h);
    }
    let i = n - 1, s = 1, u = 0;
    for (this[r + i] = e & 255; --i >= 0 && (s *= 256); )
      e < 0 && u === 0 && this[r + i + 1] !== 0 && (u = 1), this[r + i] = (e / s >> 0) - u & 255;
    return r + n;
  };
  f.prototype.writeInt8 = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[r] = e & 255, r + 1;
  };
  f.prototype.writeInt16LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 32767, -32768), this[r] = e & 255, this[r + 1] = e >>> 8, r + 2;
  };
  f.prototype.writeInt16BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 32767, -32768), this[r] = e >>> 8, this[r + 1] = e & 255, r + 2;
  };
  f.prototype.writeInt32LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 2147483647, -2147483648), this[r] = e & 255, this[r + 1] = e >>> 8, this[r + 2] = e >>> 16, this[r + 3] = e >>> 24, r + 4;
  };
  f.prototype.writeInt32BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255, r + 4;
  };
  f.prototype.writeBigInt64LE = _e(function(e, r = 0) {
    return Jo(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  f.prototype.writeBigInt64BE = _e(function(e, r = 0) {
    return Xo(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Yo(t, e, r, n, o, i) {
    if (r + n > t.length)
      throw new RangeError("Index out of range");
    if (r < 0)
      throw new RangeError("Index out of range");
  }
  function Qo(t, e, r, n, o) {
    return e = +e, r = r >>> 0, o || Yo(t, e, r, 4), ot.write(t, e, r, n, 23, 4), r + 4;
  }
  f.prototype.writeFloatLE = function(e, r, n) {
    return Qo(this, e, r, true, n);
  };
  f.prototype.writeFloatBE = function(e, r, n) {
    return Qo(this, e, r, false, n);
  };
  function Zo(t, e, r, n, o) {
    return e = +e, r = r >>> 0, o || Yo(t, e, r, 8), ot.write(t, e, r, n, 52, 8), r + 8;
  }
  f.prototype.writeDoubleLE = function(e, r, n) {
    return Zo(this, e, r, true, n);
  };
  f.prototype.writeDoubleBE = function(e, r, n) {
    return Zo(this, e, r, false, n);
  };
  f.prototype.copy = function(e, r, n, o) {
    if (!f.isBuffer(e))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !o && o !== 0 && (o = this.length), r >= e.length && (r = e.length), r || (r = 0), o > 0 && o < n && (o = n), o === n || e.length === 0 || this.length === 0)
      return 0;
    if (r < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (o < 0)
      throw new RangeError("sourceEnd out of bounds");
    o > this.length && (o = this.length), e.length - r < o - n && (o = e.length - r + n);
    let i = o - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r, n, o) : Uint8Array.prototype.set.call(e, this.subarray(n, o), r), i;
  };
  f.prototype.fill = function(e, r, n, o) {
    if (typeof e == "string") {
      if (typeof r == "string" ? (o = r, r = 0, n = this.length) : typeof n == "string" && (o = n, n = this.length), o !== void 0 && typeof o != "string")
        throw new TypeError("encoding must be a string");
      if (typeof o == "string" && !f.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      if (e.length === 1) {
        let s = e.charCodeAt(0);
        (o === "utf8" && s < 128 || o === "latin1") && (e = s);
      }
    } else
      typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (r < 0 || this.length < r || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= r)
      return this;
    r = r >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let i;
    if (typeof e == "number")
      for (i = r; i < n; ++i)
        this[i] = e;
    else {
      let s = f.isBuffer(e) ? e : f.from(e, o), u = s.length;
      if (u === 0)
        throw new TypeError('The value "' + e + '" is invalid for argument "value"');
      for (i = 0; i < n - r; ++i)
        this[i + r] = s[i % u];
    }
    return this;
  };
  var nt = {};
  function nn(t, e, r) {
    nt[t] = class extends r {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: e.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${t}]`, this.stack, delete this.name;
      }
      get code() {
        return t;
      }
      set code(o) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: o, writable: true });
      }
      toString() {
        return `${this.name} [${t}]: ${this.message}`;
      }
    };
  }
  nn("ERR_BUFFER_OUT_OF_BOUNDS", function(t) {
    return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  nn("ERR_INVALID_ARG_TYPE", function(t, e) {
    return `The "${t}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  nn("ERR_OUT_OF_RANGE", function(t, e, r) {
    let n = `The value of "${t}" is out of range.`, o = r;
    return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? o = qo(String(r)) : typeof r == "bigint" && (o = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (o = qo(o)), o += "n"), n += ` It must be ${e}. Received ${o}`, n;
  }, RangeError);
  function qo(t) {
    let e = "", r = t.length, n = t[0] === "-" ? 1 : 0;
    for (; r >= n + 4; r -= 3)
      e = `_${t.slice(r - 3, r)}${e}`;
    return `${t.slice(0, r)}${e}`;
  }
  function rf(t, e, r) {
    it(e, "offset"), (t[e] === void 0 || t[e + r] === void 0) && $t(e, t.length - (r + 1));
  }
  function Ko(t, e, r, n, o, i) {
    if (t > r || t < e) {
      let s = typeof e == "bigint" ? "n" : "", u;
      throw i > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${s} and < 2${s} ** ${(i + 1) * 8}${s}` : u = `>= -(2${s} ** ${(i + 1) * 8 - 1}${s}) and < 2 ** ${(i + 1) * 8 - 1}${s}` : u = `>= ${e}${s} and <= ${r}${s}`, new nt.ERR_OUT_OF_RANGE("value", u, t);
    }
    rf(n, o, i);
  }
  function it(t, e) {
    if (typeof t != "number")
      throw new nt.ERR_INVALID_ARG_TYPE(e, "number", t);
  }
  function $t(t, e, r) {
    throw Math.floor(t) !== t ? (it(t, r), new nt.ERR_OUT_OF_RANGE(r || "offset", "an integer", t)) : e < 0 ? new nt.ERR_BUFFER_OUT_OF_BOUNDS() : new nt.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${e}`, t);
  }
  var nf = /[^+/0-9A-Za-z-_]/g;
  function of(t) {
    if (t = t.split("=")[0], t = t.trim().replace(nf, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function en(t, e) {
    e = e || 1 / 0;
    let r, n = t.length, o = null, i = [];
    for (let s = 0; s < n; ++s) {
      if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
        if (!o) {
          if (r > 56319) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          } else if (s + 1 === n) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          o = r;
          continue;
        }
        if (r < 56320) {
          (e -= 3) > -1 && i.push(239, 191, 189), o = r;
          continue;
        }
        r = (o - 55296 << 10 | r - 56320) + 65536;
      } else
        o && (e -= 3) > -1 && i.push(239, 191, 189);
      if (o = null, r < 128) {
        if ((e -= 1) < 0)
          break;
        i.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0)
          break;
        i.push(r >> 6 | 192, r & 63 | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0)
          break;
        i.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
      } else if (r < 1114112) {
        if ((e -= 4) < 0)
          break;
        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return i;
  }
  function sf(t) {
    let e = [];
    for (let r = 0; r < t.length; ++r)
      e.push(t.charCodeAt(r) & 255);
    return e;
  }
  function af(t, e) {
    let r, n, o, i = [];
    for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
      r = t.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
    return i;
  }
  function ei(t) {
    return Qr.toByteArray(of(t));
  }
  function sr(t, e, r, n) {
    let o;
    for (o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
      e[o + r] = t[o];
    return o;
  }
  function be(t, e) {
    return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
  }
  function on(t) {
    return t !== t;
  }
  var uf = function() {
    let t = "0123456789abcdef", e = new Array(256);
    for (let r = 0; r < 16; ++r) {
      let n = r * 16;
      for (let o = 0; o < 16; ++o)
        e[n + o] = t[r] + t[o];
    }
    return e;
  }();
  function _e(t) {
    return typeof BigInt > "u" ? cf : t;
  }
  function cf() {
    throw new Error("BigInt not supported");
  }
});
var si = S((Yh, ii) => {
  a();
  var N = ii.exports = {}, Ee, xe;
  function sn() {
    throw new Error("setTimeout has not been defined");
  }
  function an() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? Ee = setTimeout : Ee = sn;
    } catch {
      Ee = sn;
    }
    try {
      typeof clearTimeout == "function" ? xe = clearTimeout : xe = an;
    } catch {
      xe = an;
    }
  })();
  function ri(t) {
    if (Ee === setTimeout)
      return setTimeout(t, 0);
    if ((Ee === sn || !Ee) && setTimeout)
      return Ee = setTimeout, setTimeout(t, 0);
    try {
      return Ee(t, 0);
    } catch {
      try {
        return Ee.call(null, t, 0);
      } catch {
        return Ee.call(this, t, 0);
      }
    }
  }
  function ff(t) {
    if (xe === clearTimeout)
      return clearTimeout(t);
    if ((xe === an || !xe) && clearTimeout)
      return xe = clearTimeout, clearTimeout(t);
    try {
      return xe(t);
    } catch {
      try {
        return xe.call(null, t);
      } catch {
        return xe.call(this, t);
      }
    }
  }
  var Te = [], at = false, Je, ar = -1;
  function lf() {
    !at || !Je || (at = false, Je.length ? Te = Je.concat(Te) : ar = -1, Te.length && ni());
  }
  function ni() {
    if (!at) {
      var t = ri(lf);
      at = true;
      for (var e = Te.length; e; ) {
        for (Je = Te, Te = []; ++ar < e; )
          Je && Je[ar].run();
        ar = -1, e = Te.length;
      }
      Je = null, at = false, ff(t);
    }
  }
  N.nextTick = function(t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1; r < arguments.length; r++)
        e[r - 1] = arguments[r];
    Te.push(new oi(t, e)), Te.length === 1 && !at && ri(ni);
  };
  function oi(t, e) {
    this.fun = t, this.array = e;
  }
  oi.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  N.title = "browser";
  N.browser = true;
  N.env = {};
  N.argv = [];
  N.version = "";
  N.versions = {};
  function Ie() {
  }
  N.on = Ie;
  N.addListener = Ie;
  N.once = Ie;
  N.off = Ie;
  N.removeListener = Ie;
  N.removeAllListeners = Ie;
  N.emit = Ie;
  N.prependListener = Ie;
  N.prependOnceListener = Ie;
  N.listeners = function(t) {
    return [];
  };
  N.binding = function(t) {
    throw new Error("process.binding is not supported");
  };
  N.cwd = function() {
    return "/";
  };
  N.chdir = function(t) {
    throw new Error("process.chdir is not supported");
  };
  N.umask = function() {
    return 0;
  };
});
var p, d, a = F(() => {
  ti().Buffer, p = si(), d = globalThis;
  globalThis && globalThis.process && globalThis.process.env && (globalThis.process.env.LIBP2P_FORCE_PNET = false);
});
function ci(t, e, r) {
  e = e || [], r = r || 0;
  for (var n = r; t >= mf; )
    e[r++] = t & 255 | ai, t /= 128;
  for (; t & pf; )
    e[r++] = t & 255 | ai, t >>>= 7;
  return e[r] = t | 0, ci.bytes = r - n + 1, e;
}
function un(t, n) {
  var r = 0, n = n || 0, o = 0, i = n, s, u = t.length;
  do {
    if (i >= u)
      throw un.bytes = 0, new RangeError("Could not decode varint");
    s = t[i++], r += o < 28 ? (s & ui) << o : (s & ui) * Math.pow(2, o), o += 7;
  } while (s >= wf);
  return un.bytes = i - n, r;
}
var df, ai, hf, pf, mf, yf, wf, ui, gf, Df, bf, Ef, xf, Cf, Bf, Af, Tf, If, Sf, Uf, Lt, fi = F(() => {
  a();
  df = ci, ai = 128, hf = 127, pf = ~hf, mf = Math.pow(2, 31);
  yf = un, wf = 128, ui = 127;
  gf = Math.pow(2, 7), Df = Math.pow(2, 14), bf = Math.pow(2, 21), Ef = Math.pow(2, 28), xf = Math.pow(2, 35), Cf = Math.pow(2, 42), Bf = Math.pow(2, 49), Af = Math.pow(2, 56), Tf = Math.pow(2, 63), If = function(t) {
    return t < gf ? 1 : t < Df ? 2 : t < bf ? 3 : t < Ef ? 4 : t < xf ? 5 : t < Cf ? 6 : t < Bf ? 7 : t < Af ? 8 : t < Tf ? 9 : 10;
  }, Sf = { encode: df, decode: yf, encodingLength: If }, Uf = Sf, Lt = Uf;
});
var Pt, ut, ct, cr = F(() => {
  a();
  fi();
  Pt = (t) => [Lt.decode(t), Lt.decode.bytes], ut = (t, e, r = 0) => (Lt.encode(t, e, r), e), ct = (t) => Lt.encodingLength(t);
});
var li, Se, di, hi, Ne = F(() => {
  a();
  li = (t, e) => {
    if (t === e)
      return true;
    if (t.byteLength !== e.byteLength)
      return false;
    for (let r = 0; r < t.byteLength; r++)
      if (t[r] !== e[r])
        return false;
    return true;
  }, Se = (t) => {
    if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
      return t;
    if (t instanceof ArrayBuffer)
      return new Uint8Array(t);
    if (ArrayBuffer.isView(t))
      return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    throw new Error("Unknown type, must be binary type");
  }, di = (t) => new TextEncoder().encode(t), hi = (t) => new TextDecoder().decode(t);
});
var Ue = {};
M(Ue, { Digest: () => Xe, create: () => $e, decode: () => ft, equals: () => fn });
var $e, ft, fn, Xe, Le = F(() => {
  a();
  Ne();
  cr();
  $e = (t, e) => {
    let r = e.byteLength, n = ct(t), o = n + ct(r), i = new Uint8Array(o + r);
    return ut(t, i, 0), ut(r, i, n), i.set(e, o), new Xe(t, r, e, i);
  }, ft = (t) => {
    let e = Se(t), [r, n] = Pt(e), [o, i] = Pt(e.subarray(n)), s = e.subarray(n + i);
    if (s.byteLength !== o)
      throw new Error("Incorrect length");
    return new Xe(r, o, s, e);
  }, fn = (t, e) => t === e ? true : t.code === e.code && t.size === e.size && li(t.bytes, e.bytes), Xe = class {
    constructor(e, r, n, o) {
      this.code = e, this.size = r, this.digest = n, this.bytes = o;
    }
  };
});
function Ff(t, e) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), n = 0; n < r.length; n++)
    r[n] = 255;
  for (var o = 0; o < t.length; o++) {
    var i = t.charAt(o), s = i.charCodeAt(0);
    if (r[s] !== 255)
      throw new TypeError(i + " is ambiguous");
    r[s] = o;
  }
  var u = t.length, h = t.charAt(0), w = Math.log(u) / Math.log(256), c = Math.log(256) / Math.log(u);
  function g(I) {
    if (I instanceof Uint8Array || (ArrayBuffer.isView(I) ? I = new Uint8Array(I.buffer, I.byteOffset, I.byteLength) : Array.isArray(I) && (I = Uint8Array.from(I))), !(I instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (I.length === 0)
      return "";
    for (var v = 0, $ = 0, P = 0, W = I.length; P !== W && I[P] === 0; )
      P++, v++;
    for (var ie = (W - P) * c + 1 >>> 0, q = new Uint8Array(ie); P !== W; ) {
      for (var he = I[P], se = 0, K = ie - 1; (he !== 0 || se < $) && K !== -1; K--, se++)
        he += 256 * q[K] >>> 0, q[K] = he % u >>> 0, he = he / u >>> 0;
      if (he !== 0)
        throw new Error("Non-zero carry");
      $ = se, P++;
    }
    for (var ae = ie - $; ae !== ie && q[ae] === 0; )
      ae++;
    for (var rt = h.repeat(v); ae < ie; ++ae)
      rt += t.charAt(q[ae]);
    return rt;
  }
  function B(I) {
    if (typeof I != "string")
      throw new TypeError("Expected String");
    if (I.length === 0)
      return new Uint8Array();
    var v = 0;
    if (I[v] !== " ") {
      for (var $ = 0, P = 0; I[v] === h; )
        $++, v++;
      for (var W = (I.length - v) * w + 1 >>> 0, ie = new Uint8Array(W); I[v]; ) {
        var q = r[I.charCodeAt(v)];
        if (q === 255)
          return;
        for (var he = 0, se = W - 1; (q !== 0 || he < P) && se !== -1; se--, he++)
          q += u * ie[se] >>> 0, ie[se] = q % 256 >>> 0, q = q / 256 >>> 0;
        if (q !== 0)
          throw new Error("Non-zero carry");
        P = he, v++;
      }
      if (I[v] !== " ") {
        for (var K = W - P; K !== W && ie[K] === 0; )
          K++;
        for (var ae = new Uint8Array($ + (W - K)), rt = $; K !== W; )
          ae[rt++] = ie[K++];
        return ae;
      }
    }
  }
  function k(I) {
    var v = B(I);
    if (v)
      return v;
    throw new Error(`Non-${e} character`);
  }
  return { encode: g, decodeUnsafe: B, decode: k };
}
var vf, kf, pi, mi = F(() => {
  a();
  vf = Ff, kf = vf, pi = kf;
});
var ln, dn, hn, yi, pn, lt, Pe, _f, Nf, _, pe = F(() => {
  a();
  mi();
  Ne();
  ln = class {
    constructor(e, r, n) {
      this.name = e, this.prefix = r, this.baseEncode = n;
    }
    encode(e) {
      if (e instanceof Uint8Array)
        return `${this.prefix}${this.baseEncode(e)}`;
      throw Error("Unknown type, must be binary type");
    }
  }, dn = class {
    constructor(e, r, n) {
      if (this.name = e, this.prefix = r, r.codePointAt(0) === void 0)
        throw new Error("Invalid prefix character");
      this.prefixCodePoint = r.codePointAt(0), this.baseDecode = n;
    }
    decode(e) {
      if (typeof e == "string") {
        if (e.codePointAt(0) !== this.prefixCodePoint)
          throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        return this.baseDecode(e.slice(this.prefix.length));
      } else
        throw Error("Can only multibase decode strings");
    }
    or(e) {
      return yi(this, e);
    }
  }, hn = class {
    constructor(e) {
      this.decoders = e;
    }
    or(e) {
      return yi(this, e);
    }
    decode(e) {
      let r = e[0], n = this.decoders[r];
      if (n)
        return n.decode(e);
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }, yi = (t, e) => new hn({ ...t.decoders || { [t.prefix]: t }, ...e.decoders || { [e.prefix]: e } }), pn = class {
    constructor(e, r, n, o) {
      this.name = e, this.prefix = r, this.baseEncode = n, this.baseDecode = o, this.encoder = new ln(e, r, n), this.decoder = new dn(e, r, o);
    }
    encode(e) {
      return this.encoder.encode(e);
    }
    decode(e) {
      return this.decoder.decode(e);
    }
  }, lt = ({ name: t, prefix: e, encode: r, decode: n }) => new pn(t, e, r, n), Pe = ({ prefix: t, name: e, alphabet: r }) => {
    let { encode: n, decode: o } = pi(r, e);
    return lt({ prefix: t, name: e, encode: n, decode: (i) => Se(o(i)) });
  }, _f = (t, e, r, n) => {
    let o = {};
    for (let c = 0; c < e.length; ++c)
      o[e[c]] = c;
    let i = t.length;
    for (; t[i - 1] === "="; )
      --i;
    let s = new Uint8Array(i * r / 8 | 0), u = 0, h = 0, w = 0;
    for (let c = 0; c < i; ++c) {
      let g = o[t[c]];
      if (g === void 0)
        throw new SyntaxError(`Non-${n} character`);
      h = h << r | g, u += r, u >= 8 && (u -= 8, s[w++] = 255 & h >> u);
    }
    if (u >= r || 255 & h << 8 - u)
      throw new SyntaxError("Unexpected end of data");
    return s;
  }, Nf = (t, e, r) => {
    let n = e[e.length - 1] === "=", o = (1 << r) - 1, i = "", s = 0, u = 0;
    for (let h = 0; h < t.length; ++h)
      for (u = u << 8 | t[h], s += 8; s > r; )
        s -= r, i += e[o & u >> s];
    if (s && (i += e[o & u << r - s]), n)
      for (; i.length * r & 7; )
        i += "=";
    return i;
  }, _ = ({ name: t, prefix: e, bitsPerChar: r, alphabet: n }) => lt({ prefix: e, name: t, encode(o) {
    return Nf(o, n, r);
  }, decode(o) {
    return _f(o, n, r, t);
  } });
});
var dt = {};
M(dt, { base58btc: () => Y, base58flickr: () => $f });
var Y, $f, Re = F(() => {
  a();
  pe();
  Y = Pe({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), $f = Pe({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
});
var Rt = {};
M(Rt, { base32: () => Me, base32hex: () => Mf, base32hexpad: () => zf, base32hexpadupper: () => qf, base32hexupper: () => Of, base32pad: () => Pf, base32padupper: () => Rf, base32upper: () => Lf, base32z: () => Hf });
var Me, Lf, Pf, Rf, Mf, Of, zf, qf, Hf, ht = F(() => {
  a();
  pe();
  Me = _({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Lf = _({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Pf = _({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Rf = _({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Mf = _({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), Of = _({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), zf = _({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), qf = _({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), Hf = _({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
});
var dr = {};
M(dr, { CID: () => x });
var x, jf, Vf, Gf, Mt, Wf, wi, gi, fr, lr, Jf, Xf, Yf, Q = F(() => {
  a();
  cr();
  Le();
  Re();
  ht();
  Ne();
  x = class {
    constructor(e, r, n, o) {
      this.code = r, this.version = e, this.multihash = n, this.bytes = o, this.byteOffset = o.byteOffset, this.byteLength = o.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, { byteOffset: lr, byteLength: lr, code: fr, version: fr, multihash: fr, bytes: fr, _baseCache: lr, asCID: lr });
    }
    toV0() {
      switch (this.version) {
        case 0:
          return this;
        default: {
          let { code: e, multihash: r } = this;
          if (e !== Mt)
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          if (r.code !== Wf)
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          return x.createV0(r);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          let { code: e, digest: r } = this.multihash, n = $e(e, r);
          return x.createV1(this.code, n);
        }
        case 1:
          return this;
        default:
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
    equals(e) {
      return e && this.code === e.code && this.version === e.version && fn(this.multihash, e.multihash);
    }
    toString(e) {
      let { bytes: r, version: n, _baseCache: o } = this;
      switch (n) {
        case 0:
          return Vf(r, o, e || Y.encoder);
        default:
          return Gf(r, o, e || Me.encoder);
      }
    }
    toJSON() {
      return { code: this.code, version: this.version, hash: this.multihash.bytes };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(e) {
      return Xf(/^0\.0/, Yf), !!(e && (e[gi] || e.asCID === e));
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
    static asCID(e) {
      if (e instanceof x)
        return e;
      if (e != null && e.asCID === e) {
        let { version: r, code: n, multihash: o, bytes: i } = e;
        return new x(r, n, o, i || wi(r, n, o.bytes));
      } else if (e != null && e[gi] === true) {
        let { version: r, multihash: n, code: o } = e, i = ft(n);
        return x.create(r, o, i);
      } else
        return null;
    }
    static create(e, r, n) {
      if (typeof r != "number")
        throw new Error("String codecs are no longer supported");
      switch (e) {
        case 0: {
          if (r !== Mt)
            throw new Error(`Version 0 CID must use dag-pb (code: ${Mt}) block encoding`);
          return new x(e, r, n, n.bytes);
        }
        case 1: {
          let o = wi(e, r, n.bytes);
          return new x(e, r, n, o);
        }
        default:
          throw new Error("Invalid version");
      }
    }
    static createV0(e) {
      return x.create(0, Mt, e);
    }
    static createV1(e, r) {
      return x.create(1, e, r);
    }
    static decode(e) {
      let [r, n] = x.decodeFirst(e);
      if (n.length)
        throw new Error("Incorrect length");
      return r;
    }
    static decodeFirst(e) {
      let r = x.inspectBytes(e), n = r.size - r.multihashSize, o = Se(e.subarray(n, n + r.multihashSize));
      if (o.byteLength !== r.multihashSize)
        throw new Error("Incorrect length");
      let i = o.subarray(r.multihashSize - r.digestSize), s = new Xe(r.multihashCode, r.digestSize, i, o);
      return [r.version === 0 ? x.createV0(s) : x.createV1(r.codec, s), e.subarray(r.size)];
    }
    static inspectBytes(e) {
      let r = 0, n = () => {
        let [g, B] = Pt(e.subarray(r));
        return r += B, g;
      }, o = n(), i = Mt;
      if (o === 18 ? (o = 0, r = 0) : o === 1 && (i = n()), o !== 0 && o !== 1)
        throw new RangeError(`Invalid CID version ${o}`);
      let s = r, u = n(), h = n(), w = r + h, c = w - s;
      return { version: o, codec: i, multihashCode: u, digestSize: h, multihashSize: c, size: w };
    }
    static parse(e, r) {
      let [n, o] = jf(e, r), i = x.decode(o);
      return i._baseCache.set(n, e), i;
    }
  }, jf = (t, e) => {
    switch (t[0]) {
      case "Q": {
        let r = e || Y;
        return [Y.prefix, r.decode(`${Y.prefix}${t}`)];
      }
      case Y.prefix: {
        let r = e || Y;
        return [Y.prefix, r.decode(t)];
      }
      case Me.prefix: {
        let r = e || Me;
        return [Me.prefix, r.decode(t)];
      }
      default: {
        if (e == null)
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        return [t[0], e.decode(t)];
      }
    }
  }, Vf = (t, e, r) => {
    let { prefix: n } = r;
    if (n !== Y.prefix)
      throw Error(`Cannot string encode V0 in ${r.name} encoding`);
    let o = e.get(n);
    if (o == null) {
      let i = r.encode(t).slice(1);
      return e.set(n, i), i;
    } else
      return o;
  }, Gf = (t, e, r) => {
    let { prefix: n } = r, o = e.get(n);
    if (o == null) {
      let i = r.encode(t);
      return e.set(n, i), i;
    } else
      return o;
  }, Mt = 112, Wf = 18, wi = (t, e, r) => {
    let n = ct(t), o = n + ct(e), i = new Uint8Array(o + r.byteLength);
    return ut(t, i, 0), ut(e, i, n), i.set(r, o), i;
  }, gi = Symbol.for("@ipld/js-cid/CID"), fr = { writable: false, configurable: false, enumerable: true }, lr = { writable: false, enumerable: false, configurable: false }, Jf = "0.0.0-dev", Xf = (t, e) => {
    if (t.test(Jf))
      console.warn(e);
    else
      throw new Error(e);
  }, Yf = `CID.isCID(v) is deprecated and will be removed in the next major release.
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
});
var yn, mn, wn = F(() => {
  a();
  Le();
  yn = ({ name: t, code: e, encode: r }) => new mn(t, e, r), mn = class {
    constructor(e, r, n) {
      this.name = e, this.code = r, this.encode = n;
    }
    digest(e) {
      if (e instanceof Uint8Array) {
        let r = this.encode(e);
        return r instanceof Uint8Array ? $e(this.code, r) : r.then((n) => $e(this.code, n));
      } else
        throw Error("Unknown type, must be binary type");
    }
  };
});
var gn = F(() => {
  a();
  Q();
  cr();
  Ne();
  wn();
  Le();
});
var Ci = S((mp, xi) => {
  a();
  xi.exports = xn;
  var Ei = 128, Zf = 127, Kf = ~Zf, el = Math.pow(2, 31);
  function xn(t, e, r) {
    if (Number.MAX_SAFE_INTEGER && t > Number.MAX_SAFE_INTEGER)
      throw xn.bytes = 0, new RangeError("Could not encode varint");
    e = e || [], r = r || 0;
    for (var n = r; t >= el; )
      e[r++] = t & 255 | Ei, t /= 128;
    for (; t & Kf; )
      e[r++] = t & 255 | Ei, t >>>= 7;
    return e[r] = t | 0, xn.bytes = r - n + 1, e;
  }
});
var Ti = S((yp, Ai) => {
  a();
  Ai.exports = Cn;
  var tl = 128, Bi = 127;
  function Cn(t, n) {
    var r = 0, n = n || 0, o = 0, i = n, s, u = t.length;
    do {
      if (i >= u || o > 49)
        throw Cn.bytes = 0, new RangeError("Could not decode varint");
      s = t[i++], r += o < 28 ? (s & Bi) << o : (s & Bi) * Math.pow(2, o), o += 7;
    } while (s >= tl);
    return Cn.bytes = i - n, r;
  }
});
var Si = S((wp, Ii) => {
  a();
  var rl = Math.pow(2, 7), nl = Math.pow(2, 14), ol = Math.pow(2, 21), il = Math.pow(2, 28), sl = Math.pow(2, 35), al = Math.pow(2, 42), ul = Math.pow(2, 49), cl = Math.pow(2, 56), fl = Math.pow(2, 63);
  Ii.exports = function(t) {
    return t < rl ? 1 : t < nl ? 2 : t < ol ? 3 : t < il ? 4 : t < sl ? 5 : t < al ? 6 : t < ul ? 7 : t < cl ? 8 : t < fl ? 9 : 10;
  };
});
var pt = S((gp, Ui) => {
  a();
  Ui.exports = { encode: Ci(), decode: Ti(), encodingLength: Si() };
});
var Ws = S((vm, Gs) => {
  a();
  Gs.exports = function() {
    return Date.now();
  };
});
var Xs = S((km, Js) => {
  a();
  var Ur = Ws(), Pn = class {
    constructor(e, r, n) {
      let o = this;
      this._started = Ur(), this._rescheduled = 0, this._scheduled = r, this._args = n, this._triggered = false, this._timerWrapper = () => {
        o._rescheduled > 0 ? (o._scheduled = o._rescheduled - (Ur() - o._started), o._schedule(o._scheduled)) : (o._triggered = true, e.apply(null, o._args));
      }, this._timer = setTimeout(this._timerWrapper, r);
    }
    reschedule(e) {
      e || (e = this._scheduled);
      let r = Ur();
      r + e - (this._started + this._scheduled) < 0 ? (clearTimeout(this._timer), this._schedule(e)) : this._triggered ? this._schedule(e) : (this._started = r, this._rescheduled = e);
    }
    _schedule(e) {
      this._triggered = false, this._started = Ur(), this._rescheduled = 0, this._scheduled = e, this._timer = setTimeout(this._timerWrapper, e);
    }
    clear() {
      clearTimeout(this._timer);
    }
  };
  function ed() {
    if (typeof arguments[0] != "function")
      throw new Error("callback needed");
    if (typeof arguments[1] != "number")
      throw new Error("timeout needed");
    let t;
    if (arguments.length > 0) {
      t = new Array(arguments.length - 2);
      for (var e = 0; e < t.length; e++)
        t[e] = arguments[e + 2];
    }
    return new Pn(arguments[0], arguments[1], t);
  }
  Js.exports = ed;
});
var Zs = S((_m, Qs) => {
  a();
  var { AbortController: td } = globalThis, Ys = Xs(), Gt = class extends td {
    constructor(e) {
      super(), this._ms = e, this._timer = Ys(() => this.abort(), e), Object.setPrototypeOf(this, Gt.prototype);
    }
    abort() {
      return this._timer.clear(), super.abort();
    }
    clear() {
      this._timer.clear();
    }
    reset() {
      this._timer.clear(), this._timer = Ys(() => this.abort(), this._ms);
    }
  };
  Qs.exports = { TimeoutController: Gt };
});
var ea = S((Nm, Rn) => {
  a();
  function Ks(t) {
    let e = new globalThis.AbortController();
    function r() {
      e.abort();
      for (let n of t)
        !n || !n.removeEventListener || n.removeEventListener("abort", r);
    }
    for (let n of t)
      if (!(!n || !n.addEventListener)) {
        if (n.aborted) {
          r();
          break;
        }
        n.addEventListener("abort", r);
      }
    return e.signal;
  }
  Rn.exports = Ks;
  Rn.exports.anySignal = Ks;
});
var sa = S((Om, ia) => {
  a();
  var xt = 1e3, Ct = xt * 60, Bt = Ct * 60, Ze = Bt * 24, nd = Ze * 7, od = Ze * 365.25;
  ia.exports = function(t, e) {
    e = e || {};
    var r = typeof t;
    if (r === "string" && t.length > 0)
      return id(t);
    if (r === "number" && isFinite(t))
      return e.long ? ad(t) : sd(t);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
  };
  function id(t) {
    if (t = String(t), !(t.length > 100)) {
      var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);
      if (!!e) {
        var r = parseFloat(e[1]), n = (e[2] || "ms").toLowerCase();
        switch (n) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * od;
          case "weeks":
          case "week":
          case "w":
            return r * nd;
          case "days":
          case "day":
          case "d":
            return r * Ze;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * Bt;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * Ct;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * xt;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function sd(t) {
    var e = Math.abs(t);
    return e >= Ze ? Math.round(t / Ze) + "d" : e >= Bt ? Math.round(t / Bt) + "h" : e >= Ct ? Math.round(t / Ct) + "m" : e >= xt ? Math.round(t / xt) + "s" : t + "ms";
  }
  function ad(t) {
    var e = Math.abs(t);
    return e >= Ze ? Fr(t, e, Ze, "day") : e >= Bt ? Fr(t, e, Bt, "hour") : e >= Ct ? Fr(t, e, Ct, "minute") : e >= xt ? Fr(t, e, xt, "second") : t + " ms";
  }
  function Fr(t, e, r, n) {
    var o = e >= r * 1.5;
    return Math.round(t / r) + " " + n + (o ? "s" : "");
  }
});
var ua = S((zm, aa) => {
  a();
  function ud(t) {
    r.debug = r, r.default = r, r.coerce = h, r.disable = i, r.enable = o, r.enabled = s, r.humanize = sa(), r.destroy = w, Object.keys(t).forEach((c) => {
      r[c] = t[c];
    }), r.names = [], r.skips = [], r.formatters = {};
    function e(c) {
      let g = 0;
      for (let B = 0; B < c.length; B++)
        g = (g << 5) - g + c.charCodeAt(B), g |= 0;
      return r.colors[Math.abs(g) % r.colors.length];
    }
    r.selectColor = e;
    function r(c) {
      let g, B = null, k, I;
      function v(...$) {
        if (!v.enabled)
          return;
        let P = v, W = Number(new Date()), ie = W - (g || W);
        P.diff = ie, P.prev = g, P.curr = W, g = W, $[0] = r.coerce($[0]), typeof $[0] != "string" && $.unshift("%O");
        let q = 0;
        $[0] = $[0].replace(/%([a-zA-Z%])/g, (se, K) => {
          if (se === "%%")
            return "%";
          q++;
          let ae = r.formatters[K];
          if (typeof ae == "function") {
            let rt = $[q];
            se = ae.call(P, rt), $.splice(q, 1), q--;
          }
          return se;
        }), r.formatArgs.call(P, $), (P.log || r.log).apply(P, $);
      }
      return v.namespace = c, v.useColors = r.useColors(), v.color = r.selectColor(c), v.extend = n, v.destroy = r.destroy, Object.defineProperty(v, "enabled", { enumerable: true, configurable: false, get: () => B !== null ? B : (k !== r.namespaces && (k = r.namespaces, I = r.enabled(c)), I), set: ($) => {
        B = $;
      } }), typeof r.init == "function" && r.init(v), v;
    }
    function n(c, g) {
      let B = r(this.namespace + (typeof g > "u" ? ":" : g) + c);
      return B.log = this.log, B;
    }
    function o(c) {
      r.save(c), r.namespaces = c, r.names = [], r.skips = [];
      let g, B = (typeof c == "string" ? c : "").split(/[\s,]+/), k = B.length;
      for (g = 0; g < k; g++)
        !B[g] || (c = B[g].replace(/\*/g, ".*?"), c[0] === "-" ? r.skips.push(new RegExp("^" + c.slice(1) + "$")) : r.names.push(new RegExp("^" + c + "$")));
    }
    function i() {
      let c = [...r.names.map(u), ...r.skips.map(u).map((g) => "-" + g)].join(",");
      return r.enable(""), c;
    }
    function s(c) {
      if (c[c.length - 1] === "*")
        return true;
      let g, B;
      for (g = 0, B = r.skips.length; g < B; g++)
        if (r.skips[g].test(c))
          return false;
      for (g = 0, B = r.names.length; g < B; g++)
        if (r.names[g].test(c))
          return true;
      return false;
    }
    function u(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function h(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function w() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  aa.exports = ud;
});
var ca = S((oe, vr) => {
  a();
  oe.formatArgs = fd;
  oe.save = ld;
  oe.load = dd;
  oe.useColors = cd;
  oe.storage = hd();
  oe.destroy = (() => {
    let t = false;
    return () => {
      t || (t = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })();
  oe.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function cd() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? true : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? false : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function fd(t) {
    if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + vr.exports.humanize(this.diff), !this.useColors)
      return;
    let e = "color: " + this.color;
    t.splice(1, 0, e, "color: inherit");
    let r = 0, n = 0;
    t[0].replace(/%[a-zA-Z%]/g, (o) => {
      o !== "%%" && (r++, o === "%c" && (n = r));
    }), t.splice(n, 0, e);
  }
  oe.log = console.debug || console.log || (() => {
  });
  function ld(t) {
    try {
      t ? oe.storage.setItem("debug", t) : oe.storage.removeItem("debug");
    } catch {
    }
  }
  function dd() {
    let t;
    try {
      t = oe.storage.getItem("debug");
    } catch {
    }
    return !t && typeof p < "u" && "env" in p && (t = p.env.DEBUG), t;
  }
  function hd() {
    try {
      return localStorage;
    } catch {
    }
  }
  vr.exports = ua()(oe);
  var { formatters: pd } = vr.exports;
  pd.j = function(t) {
    try {
      return JSON.stringify(t);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
});
var On = {};
M(On, { base64: () => Mn, base64pad: () => md, base64url: () => yd, base64urlpad: () => wd });
var Mn, md, yd, wd, zn = F(() => {
  a();
  pe();
  Mn = _({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), md = _({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), yd = _({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), wd = _({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
});
var qn = F(() => {
  a();
  Ne();
});
var Hn = F(() => {
  a();
  new TextEncoder(), new TextDecoder();
});
var wa = S((i0, ya) => {
  a();
  var bd = async (t) => {
    for await (let e of t)
      return e;
  };
  ya.exports = bd;
});
var Da = S((s0, ga) => {
  a();
  var Ed = async (t) => {
    let e;
    for await (let r of t)
      e = r;
    return e;
  };
  ga.exports = Ed;
});
var xa = S((a0, Ea) => {
  a();
  var ba = "[a-fA-F\\d:]", je = (t) => t && t.includeBoundaries ? `(?:(?<=\\s|^)(?=${ba})|(?<=${ba})(?=\\s|$))` : "", we = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", L = "[a-fA-F\\d]{1,4}", _r = `
(?:
(?:${L}:){7}(?:${L}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${L}:){6}(?:${we}|:${L}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${L}:){5}(?::${we}|(?::${L}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${L}:){4}(?:(?::${L}){0,1}:${we}|(?::${L}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${L}:){3}(?:(?::${L}){0,2}:${we}|(?::${L}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${L}:){2}(?:(?::${L}){0,3}:${we}|(?::${L}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${L}:){1}(?:(?::${L}){0,4}:${we}|(?::${L}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${L}){0,5}:${we}|(?::${L}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), xd = new RegExp(`(?:^${we}$)|(?:^${_r}$)`), Cd = new RegExp(`^${we}$`), Bd = new RegExp(`^${_r}$`), Vn = (t) => t && t.exact ? xd : new RegExp(`(?:${je(t)}${we}${je(t)})|(?:${je(t)}${_r}${je(t)})`, "g");
  Vn.v4 = (t) => t && t.exact ? Cd : new RegExp(`${je(t)}${we}${je(t)}`, "g");
  Vn.v6 = (t) => t && t.exact ? Bd : new RegExp(`${je(t)}${_r}${je(t)}`, "g");
  Ea.exports = Vn;
});
var Ba = S((u0, Ca) => {
  a();
  var Gn = xa(), At = (t) => Gn({ exact: true }).test(t);
  At.v4 = (t) => Gn.v4({ exact: true }).test(t);
  At.v6 = (t) => Gn.v6({ exact: true }).test(t);
  At.version = (t) => At(t) ? At.v4(t) ? 4 : 6 : void 0;
  Ca.exports = At;
});
var Wn = {};
M(Wn, { identity: () => Ad });
var Ad, Aa = F(() => {
  a();
  pe();
  Ne();
  Ad = lt({ prefix: "\0", name: "identity", encode: (t) => hi(t), decode: (t) => di(t) });
});
var Jn = {};
M(Jn, { base2: () => Td });
var Td, Ta = F(() => {
  a();
  pe();
  Td = _({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
});
var Xn = {};
M(Xn, { base8: () => Id });
var Id, Ia = F(() => {
  a();
  pe();
  Id = _({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
});
var Yn = {};
M(Yn, { base10: () => Sd });
var Sd, Sa = F(() => {
  a();
  pe();
  Sd = Pe({ prefix: "9", name: "base10", alphabet: "0123456789" });
});
var Qn = {};
M(Qn, { base16: () => Ud, base16upper: () => Fd });
var Ud, Fd, Ua = F(() => {
  a();
  pe();
  Ud = _({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Fd = _({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
});
var Zn = {};
M(Zn, { base36: () => vd, base36upper: () => kd });
var vd, kd, Fa = F(() => {
  a();
  pe();
  vd = Pe({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), kd = Pe({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
});
var Kn = {};
M(Kn, { base256emoji: () => Pd });
function $d(t) {
  return t.reduce((e, r) => (e += _d[r], e), "");
}
function Ld(t) {
  let e = [];
  for (let r of t) {
    let n = Nd[r.codePointAt(0)];
    if (n === void 0)
      throw new Error(`Non-base256emoji character: ${r}`);
    e.push(n);
  }
  return new Uint8Array(e);
}
var va, _d, Nd, Pd, ka = F(() => {
  a();
  pe();
  va = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"), _d = va.reduce((t, e, r) => (t[r] = e, t), []), Nd = va.reduce((t, e, r) => (t[e.codePointAt(0)] = r, t), []);
  Pd = lt({ prefix: "\u{1F680}", name: "base256emoji", encode: $d, decode: Ld });
});
var eo = {};
M(eo, { sha256: () => Rd, sha512: () => Md });
var _a, Rd, Md, Na = F(() => {
  a();
  wn();
  _a = (t) => async (e) => new Uint8Array(await crypto.subtle.digest(t, e)), Rd = yn({ name: "sha2-256", code: 18, encode: _a("SHA-256") }), Md = yn({ name: "sha2-512", code: 19, encode: _a("SHA-512") });
});
var to = {};
M(to, { identity: () => qd });
var $a, Od, La, zd, qd, Pa = F(() => {
  a();
  Ne();
  Le();
  $a = 0, Od = "identity", La = Se, zd = (t) => $e($a, La(t)), qd = { code: $a, name: Od, encode: La, digest: zd };
});
var ro, Ra = F(() => {
  a();
  Aa();
  Ta();
  Ia();
  Sa();
  Ua();
  ht();
  Fa();
  Re();
  zn();
  ka();
  Na();
  Pa();
  qn();
  Hn();
  gn();
  ro = { ...Wn, ...Jn, ...Xn, ...Yn, ...Qn, ...Rt, ...Zn, ...dt, ...On, ...Kn }, { ...eo, ...to };
});
function Nr(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(t) : new Uint8Array(t);
}
var no = F(() => {
  a();
});
function Oa(t, e, r, n) {
  return { name: t, prefix: e, encoder: { name: t, prefix: e, encode: r }, decoder: { decode: n } };
}
var Ma, oo, Hd, $r, io = F(() => {
  a();
  Ra();
  no();
  Ma = Oa("utf8", "u", (t) => {
    let e = new TextDecoder("utf8");
    return "u" + e.decode(t);
  }, (t) => new TextEncoder().encode(t.substring(1))), oo = Oa("ascii", "a", (t) => {
    let e = "a";
    for (let r = 0; r < t.length; r++)
      e += String.fromCharCode(t[r]);
    return e;
  }, (t) => {
    t = t.substring(1);
    let e = Nr(t.length);
    for (let r = 0; r < t.length; r++)
      e[r] = t.charCodeAt(r);
    return e;
  }), Hd = { utf8: Ma, "utf-8": Ma, hex: ro.base16, latin1: oo, ascii: oo, binary: oo, ...ro }, $r = Hd;
});
var Tt = {};
M(Tt, { toString: () => so });
function so(t, e = "utf8") {
  let r = $r[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : r.encoder.encode(t).substring(1);
}
var Ke = F(() => {
  a();
  io();
});
var Va = S((I0, ja) => {
  a();
  var uo = Ba(), { toString: za } = (Ke(), R(Tt)), jd = uo, ao = uo.v4, qa = uo.v6, Ha = function(t, e, r) {
    r = ~~r;
    let n;
    if (ao(t))
      n = e || new Uint8Array(r + 4), t.split(/\./g).map(function(o) {
        n[r++] = parseInt(o, 10) & 255;
      });
    else if (qa(t)) {
      let o = t.split(":", 8), i;
      for (i = 0; i < o.length; i++) {
        let s = ao(o[i]), u;
        s && (u = Ha(o[i]), o[i] = za(u.slice(0, 2), "base16")), u && ++i < 8 && o.splice(i, 0, za(u.slice(2, 4), "base16"));
      }
      if (o[0] === "")
        for (; o.length < 8; )
          o.unshift("0");
      else if (o[o.length - 1] === "")
        for (; o.length < 8; )
          o.push("0");
      else if (o.length < 8) {
        for (i = 0; i < o.length && o[i] !== ""; i++)
          ;
        let s = [i, "1"];
        for (i = 9 - o.length; i > 0; i--)
          s.push("0");
        o.splice.apply(o, s);
      }
      for (n = e || new Uint8Array(r + 16), i = 0; i < o.length; i++) {
        let s = parseInt(o[i], 16);
        n[r++] = s >> 8 & 255, n[r++] = s & 255;
      }
    }
    if (!n)
      throw Error("Invalid ip address: " + t);
    return n;
  }, Vd = function(t, e, r) {
    e = ~~e, r = r || t.length - e;
    let n = [], o, i = new DataView(t.buffer);
    if (r === 4) {
      for (let s = 0; s < r; s++)
        n.push(t[e + s]);
      o = n.join(".");
    } else if (r === 16) {
      for (let s = 0; s < r; s += 2)
        n.push(i.getUint16(e + s).toString(16));
      o = n.join(":"), o = o.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3"), o = o.replace(/:{3,4}/, "::");
    }
    return o;
  };
  ja.exports = { isIP: jd, isV4: ao, isV6: qa, toBytes: Ha, toString: Vd };
});
var Lr = S((S0, Wa) => {
  a();
  function Z(t) {
    if (typeof t == "number") {
      if (Z.codes[t])
        return Z.codes[t];
      throw new Error("no protocol with code: " + t);
    } else if (typeof t == "string") {
      if (Z.names[t])
        return Z.names[t];
      throw new Error("no protocol with name: " + t);
    }
    throw new Error("invalid protocol id type: " + t);
  }
  var de = -1;
  Z.lengthPrefixedVarSize = de;
  Z.V = de;
  Z.table = [[4, 32, "ip4"], [6, 16, "tcp"], [33, 16, "dccp"], [41, 128, "ip6"], [42, de, "ip6zone"], [53, de, "dns", "resolvable"], [54, de, "dns4", "resolvable"], [55, de, "dns6", "resolvable"], [56, de, "dnsaddr", "resolvable"], [132, 16, "sctp"], [273, 16, "udp"], [275, 0, "p2p-webrtc-star"], [276, 0, "p2p-webrtc-direct"], [277, 0, "p2p-stardust"], [290, 0, "p2p-circuit"], [301, 0, "udt"], [302, 0, "utp"], [400, de, "unix", false, "path"], [421, de, "ipfs"], [421, de, "p2p"], [443, 0, "https"], [444, 96, "onion"], [445, 296, "onion3"], [446, de, "garlic64"], [460, 0, "quic"], [477, 0, "ws"], [478, 0, "wss"], [479, 0, "p2p-websocket-star"], [480, 0, "http"], [777, de, "memory"]];
  Z.names = {};
  Z.codes = {};
  Z.table.map((t) => {
    let e = Ga.apply(null, t);
    return Z.codes[e.code] = e, Z.names[e.name] = e, null;
  });
  Z.object = Ga;
  function Ga(t, e, r, n, o) {
    return { code: t, size: e, name: r, resolvable: Boolean(n), path: Boolean(o) };
  }
  Wa.exports = Z;
});
var Ja = {};
M(Ja, { fromString: () => co });
function co(t, e = "utf8") {
  let r = $r[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t, "utf8") : r.decoder.decode(`${r.prefix}${t}`);
}
var fo = F(() => {
  a();
  io();
});
var lo = {};
M(lo, { concat: () => Gd });
function Gd(t, e) {
  e || (e = t.reduce((o, i) => o + i.length, 0));
  let r = Nr(e), n = 0;
  for (let o of t)
    r.set(o, n), n += o.length;
  return r;
}
var ho = F(() => {
  a();
  no();
});
var ru = S((v0, tu) => {
  a();
  var Pr = Va(), Qa = Lr(), { CID: Wd } = (Q(), R(dr)), { base32: Za } = (ht(), R(Rt)), { base58btc: Jd } = (Re(), R(dt)), Xd = (Le(), R(Ue)), It = pt(), { toString: Rr } = (Ke(), R(Tt)), { fromString: Ka } = (fo(), R(Ja)), { concat: Mr } = (ho(), R(lo));
  tu.exports = Wt;
  function Wt(t, e) {
    return e instanceof Uint8Array ? Wt.toString(t, e) : Wt.toBytes(t, e);
  }
  Wt.toString = function(e, r) {
    switch (Qa(e).code) {
      case 4:
      case 41:
        return Yd(r);
      case 6:
      case 273:
      case 33:
      case 132:
        return eu(r).toString();
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return Zd(r);
      case 421:
        return eh(r);
      case 444:
        return Ya(r);
      case 445:
        return Ya(r);
      default:
        return Rr(r, "base16");
    }
  };
  Wt.toBytes = function(e, r) {
    switch (Qa(e).code) {
      case 4:
        return Xa(r);
      case 41:
        return Xa(r);
      case 6:
      case 273:
      case 33:
      case 132:
        return po(parseInt(r, 10));
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return Qd(r);
      case 421:
        return Kd(r);
      case 444:
        return th(r);
      case 445:
        return rh(r);
      default:
        return Ka(r, "base16");
    }
  };
  function Xa(t) {
    if (!Pr.isIP(t))
      throw new Error("invalid ip address");
    return Pr.toBytes(t);
  }
  function Yd(t) {
    let e = Pr.toString(t);
    if (!e || !Pr.isIP(e))
      throw new Error("invalid ip address");
    return e;
  }
  function po(t) {
    let e = new ArrayBuffer(2);
    return new DataView(e).setUint16(0, t), new Uint8Array(e);
  }
  function eu(t) {
    return new DataView(t.buffer).getUint16(t.byteOffset);
  }
  function Qd(t) {
    let e = Ka(t), r = Uint8Array.from(It.encode(e.length));
    return Mr([r, e], r.length + e.length);
  }
  function Zd(t) {
    let e = It.decode(t);
    if (t = t.slice(It.decode.bytes), t.length !== e)
      throw new Error("inconsistent lengths");
    return Rr(t);
  }
  function Kd(t) {
    let e;
    t[0] === "Q" || t[0] === "1" ? e = Xd.decode(Jd.decode(`z${t}`)).bytes : e = Wd.parse(t).multihash.bytes;
    let r = Uint8Array.from(It.encode(e.length));
    return Mr([r, e], r.length + e.length);
  }
  function eh(t) {
    let e = It.decode(t), r = t.slice(It.decode.bytes);
    if (r.length !== e)
      throw new Error("inconsistent lengths");
    return Rr(r, "base58btc");
  }
  function th(t) {
    let e = t.split(":");
    if (e.length !== 2)
      throw new Error("failed to parse onion addr: " + e + " does not contain a port number");
    if (e[0].length !== 16)
      throw new Error("failed to parse onion addr: " + e[0] + " not a Tor onion address.");
    let r = Za.decode("b" + e[0]), n = parseInt(e[1], 10);
    if (n < 1 || n > 65536)
      throw new Error("Port number is not in range(1, 65536)");
    let o = po(n);
    return Mr([r, o], r.length + o.length);
  }
  function rh(t) {
    let e = t.split(":");
    if (e.length !== 2)
      throw new Error("failed to parse onion addr: " + e + " does not contain a port number");
    if (e[0].length !== 56)
      throw new Error("failed to parse onion addr: " + e[0] + " not a Tor onion3 address.");
    let r = Za.decode("b" + e[0]), n = parseInt(e[1], 10);
    if (n < 1 || n > 65536)
      throw new Error("Port number is not in range(1, 65536)");
    let o = po(n);
    return Mr([r, o], r.length + o.length);
  }
  function Ya(t) {
    let e = t.slice(0, t.length - 2), r = t.slice(t.length - 2), n = Rr(e, "base32"), o = eu(r);
    return n + ":" + o;
  }
});
var pu = S((k0, hu) => {
  a();
  var ou = ru(), mo = Lr(), Jt = pt(), { concat: nu } = (ho(), R(lo)), { toString: nh } = (Ke(), R(Tt));
  hu.exports = { stringToStringTuples: iu, stringTuplesToString: su, tuplesToStringTuples: uu, stringTuplesToTuples: au, bytesToTuples: yo, tuplesToBytes: cu, bytesToString: oh, stringToBytes: lu, fromString: ih, fromBytes: du, validateBytes: wo, isValidBytes: sh, cleanPath: Or, ParseError: go, protoFromTuple: Xt, sizeForAddr: fu };
  function iu(t) {
    let e = [], r = t.split("/").slice(1);
    if (r.length === 1 && r[0] === "")
      return [];
    for (let n = 0; n < r.length; n++) {
      let o = r[n], i = mo(o);
      if (i.size === 0) {
        e.push([o]);
        continue;
      }
      if (n++, n >= r.length)
        throw go("invalid address: " + t);
      if (i.path) {
        e.push([o, Or(r.slice(n).join("/"))]);
        break;
      }
      e.push([o, r[n]]);
    }
    return e;
  }
  function su(t) {
    let e = [];
    return t.map((r) => {
      let n = Xt(r);
      return e.push(n.name), r.length > 1 && e.push(r[1]), null;
    }), Or(e.join("/"));
  }
  function au(t) {
    return t.map((e) => {
      Array.isArray(e) || (e = [e]);
      let r = Xt(e);
      return e.length > 1 ? [r.code, ou.toBytes(r.code, e[1])] : [r.code];
    });
  }
  function uu(t) {
    return t.map((e) => {
      let r = Xt(e);
      return e[1] ? [r.code, ou.toString(r.code, e[1])] : [r.code];
    });
  }
  function cu(t) {
    return du(nu(t.map((e) => {
      let r = Xt(e), n = Uint8Array.from(Jt.encode(r.code));
      return e.length > 1 && (n = nu([n, e[1]])), n;
    })));
  }
  function fu(t, e) {
    return t.size > 0 ? t.size / 8 : t.size === 0 ? 0 : Jt.decode(e) + Jt.decode.bytes;
  }
  function yo(t) {
    let e = [], r = 0;
    for (; r < t.length; ) {
      let n = Jt.decode(t, r), o = Jt.decode.bytes, i = mo(n), s = fu(i, t.slice(r + o));
      if (s === 0) {
        e.push([n]), r += o;
        continue;
      }
      let u = t.slice(r + o, r + o + s);
      if (r += s + o, r > t.length)
        throw go("Invalid address Uint8Array: " + nh(t, "base16"));
      e.push([n, u]);
    }
    return e;
  }
  function oh(t) {
    let e = yo(t), r = uu(e);
    return su(r);
  }
  function lu(t) {
    t = Or(t);
    let e = iu(t), r = au(e);
    return cu(r);
  }
  function ih(t) {
    return lu(t);
  }
  function du(t) {
    let e = wo(t);
    if (e)
      throw e;
    return Uint8Array.from(t);
  }
  function wo(t) {
    try {
      yo(t);
    } catch (e) {
      return e;
    }
  }
  function sh(t) {
    return wo(t) === void 0;
  }
  function Or(t) {
    return "/" + t.trim().split("/").filter((e) => e).join("/");
  }
  function go(t) {
    return new Error("Error parsing address: " + t);
  }
  function Xt(t) {
    return mo(t[0]);
  }
});
var Yt = S((_0, yu) => {
  a();
  function mu(t, e) {
    for (let r in e)
      Object.defineProperty(t, r, { value: e[r], enumerable: true, configurable: true });
    return t;
  }
  function ah(t, e, r) {
    if (!t || typeof t == "string")
      throw new TypeError("Please pass an Error to err-code");
    r || (r = {}), typeof e == "object" && (r = e, e = ""), e && (r.code = e);
    try {
      return mu(t, r);
    } catch {
      r.message = t.message, r.stack = t.stack;
      let o = function() {
      };
      return o.prototype = Object.create(Object.getPrototypeOf(t)), mu(new o(), r);
    }
  }
  yu.exports = ah;
});
var wu = {};
M(wu, { equals: () => uh });
function uh(t, e) {
  if (t === e)
    return true;
  if (t.byteLength !== e.byteLength)
    return false;
  for (let r = 0; r < t.byteLength; r++)
    if (t[r] !== e[r])
      return false;
  return true;
}
var gu = F(() => {
  a();
});
var bo = S((N0, Eu) => {
  a();
  var ge = pu(), St = Lr(), Du = pt(), { CID: ch } = (Q(), R(dr)), { base58btc: fh } = (Re(), R(dt)), lh = Yt(), dh = Symbol.for("nodejs.util.inspect.custom"), { toString: zr } = (Ke(), R(Tt)), { equals: hh } = (gu(), R(wu)), Do = /* @__PURE__ */ new Map(), bu = Symbol.for("@multiformats/js-multiaddr/multiaddr"), j = class {
    constructor(e) {
      if (e == null && (e = ""), Object.defineProperty(this, bu, { value: true }), e instanceof Uint8Array)
        this.bytes = ge.fromBytes(e);
      else if (typeof e == "string") {
        if (e.length > 0 && e.charAt(0) !== "/")
          throw new Error(`multiaddr "${e}" must start with a "/"`);
        this.bytes = ge.fromString(e);
      } else if (j.isMultiaddr(e))
        this.bytes = ge.fromBytes(e.bytes);
      else
        throw new Error("addr must be a string, Buffer, or another Multiaddr");
    }
    toString() {
      return ge.bytesToString(this.bytes);
    }
    toJSON() {
      return this.toString();
    }
    toOptions() {
      let e = {}, r = this.toString().split("/");
      return e.family = r[1] === "ip4" ? 4 : 6, e.host = r[2], e.transport = r[3], e.port = parseInt(r[4]), e;
    }
    protos() {
      return this.protoCodes().map((e) => Object.assign({}, St(e)));
    }
    protoCodes() {
      let e = [], r = this.bytes, n = 0;
      for (; n < r.length; ) {
        let o = Du.decode(r, n), i = Du.decode.bytes, s = St(o);
        n += ge.sizeForAddr(s, r.slice(n + i)) + i, e.push(o);
      }
      return e;
    }
    protoNames() {
      return this.protos().map((e) => e.name);
    }
    tuples() {
      return ge.bytesToTuples(this.bytes);
    }
    stringTuples() {
      let e = ge.bytesToTuples(this.bytes);
      return ge.tuplesToStringTuples(e);
    }
    encapsulate(e) {
      return e = new j(e), new j(this.toString() + e.toString());
    }
    decapsulate(e) {
      let r = e.toString(), n = this.toString(), o = n.lastIndexOf(r);
      if (o < 0)
        throw new Error("Address " + this + " does not contain subaddress: " + e);
      return new j(n.slice(0, o));
    }
    decapsulateCode(e) {
      let r = this.tuples();
      for (let n = r.length - 1; n >= 0; n--)
        if (r[n][0] === e)
          return new j(ge.tuplesToBytes(r.slice(0, n)));
      return this;
    }
    getPeerId() {
      try {
        let r = this.stringTuples().filter((n) => n[0] === St.names.ipfs.code).pop();
        if (r && r[1]) {
          let n = r[1];
          return n[0] === "Q" || n[0] === "1" ? zr(fh.decode(`z${n}`), "base58btc") : zr(ch.parse(n).multihash.bytes, "base58btc");
        }
        return null;
      } catch {
        return null;
      }
    }
    getPath() {
      let e = null;
      try {
        e = this.stringTuples().filter((r) => !!St(r[0]).path)[0][1], e || (e = null);
      } catch {
        e = null;
      }
      return e;
    }
    equals(e) {
      return hh(this.bytes, e.bytes);
    }
    async resolve() {
      let e = this.protos().find((o) => o.resolvable);
      if (!e)
        return [this];
      let r = Do.get(e.name);
      if (!r)
        throw lh(new Error(`no available resolver for ${e.name}`), "ERR_NO_AVAILABLE_RESOLVER");
      return (await r(this)).map((o) => new j(o));
    }
    nodeAddress() {
      let e = this.protoCodes(), r = this.protoNames(), n = this.toString().split("/").slice(1);
      if (n.length < 4)
        throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".');
      if (e[0] !== 4 && e[0] !== 41 && e[0] !== 54 && e[0] !== 55)
        throw new Error(`no protocol with name: "'${r[0]}'". Must have a valid family name: "{ip4, ip6, dns4, dns6}".`);
      if (n[2] !== "tcp" && n[2] !== "udp")
        throw new Error(`no protocol with name: "'${r[1]}'". Must have a valid transport protocol: "{tcp, udp}".`);
      return { family: e[0] === 41 || e[0] === 55 ? 6 : 4, address: n[1], port: parseInt(n[3]) };
    }
    isThinWaistAddress(e) {
      let r = (e || this).protos();
      return !(r.length !== 2 || r[0].code !== 4 && r[0].code !== 41 || r[1].code !== 6 && r[1].code !== 273);
    }
    static fromNodeAddress(e, r) {
      if (!e)
        throw new Error("requires node address object");
      if (!r)
        throw new Error("requires transport protocol");
      let n;
      switch (e.family) {
        case 4:
          n = "ip4";
          break;
        case 6:
          n = "ip6";
          break;
        default:
          throw Error(`Invalid addr family. Got '${e.family}' instead of 4 or 6`);
      }
      return new j("/" + [n, e.address, r, e.port].join("/"));
    }
    static isName(e) {
      return j.isMultiaddr(e) ? e.protos().some((r) => r.resolvable) : false;
    }
    static isMultiaddr(e) {
      return e instanceof j || Boolean(e && e[bu]);
    }
    [dh]() {
      return "<Multiaddr " + zr(this.bytes, "base16") + " - " + ge.bytesToString(this.bytes) + ">";
    }
    inspect() {
      return "<Multiaddr " + zr(this.bytes, "base16") + " - " + ge.bytesToString(this.bytes) + ">";
    }
  };
  j.protocols = St;
  j.resolvers = Do;
  function ph(t) {
    return new j(t);
  }
  Eu.exports = { Multiaddr: j, multiaddr: ph, protocols: St, resolvers: Do };
});
var ku = S(($0, vu) => {
  a();
  var { Multiaddr: Eo } = bo(), Bu = E("dns4"), Au = E("dns6"), Tu = E("dnsaddr"), et = V(E("dns"), Tu, Bu, Au), Qt = V(E("ip4"), E("ip6")), _t = V(A(Qt, E("tcp")), A(et, E("tcp"))), xo = A(Qt, E("udp")), Iu = A(xo, E("utp")), Su = A(xo, E("quic")), Ft = V(A(_t, E("ws")), A(et, E("ws"))), vt = V(A(_t, E("wss")), A(et, E("wss"))), qr = V(A(_t, E("http")), A(Qt, E("http")), A(et, E("http"))), Hr = V(A(_t, E("https")), A(Qt, E("https")), A(et, E("https"))), Co = V(A(Ft, E("p2p-webrtc-star"), E("p2p")), A(vt, E("p2p-webrtc-star"), E("p2p")), A(Ft, E("p2p-webrtc-star")), A(vt, E("p2p-webrtc-star"))), mh = V(A(Ft, E("p2p-websocket-star"), E("p2p")), A(vt, E("p2p-websocket-star"), E("p2p")), A(Ft, E("p2p-websocket-star")), A(vt, E("p2p-websocket-star"))), Bo = V(A(qr, E("p2p-webrtc-direct"), E("p2p")), A(Hr, E("p2p-webrtc-direct"), E("p2p")), A(qr, E("p2p-webrtc-direct")), A(Hr, E("p2p-webrtc-direct"))), kt = V(Ft, vt, qr, Hr, Co, Bo, _t, Iu, Su, et), yh = V(A(kt, E("p2p-stardust"), E("p2p")), A(kt, E("p2p-stardust"))), Ve = V(A(kt, E("p2p")), Co, Bo, E("p2p")), xu = V(A(Ve, E("p2p-circuit"), Ve), A(Ve, E("p2p-circuit")), A(E("p2p-circuit"), Ve), A(kt, E("p2p-circuit")), A(E("p2p-circuit"), kt), E("p2p-circuit")), Uu = () => V(A(xu, Uu), xu), Ut = Uu(), Cu = V(A(Ut, Ve, Ut), A(Ve, Ut), A(Ut, Ve), Ut, Ve);
  vu.exports = { DNS: et, DNS4: Bu, DNS6: Au, DNSADDR: Tu, IP: Qt, TCP: _t, UDP: xo, QUIC: Su, UTP: Iu, HTTP: qr, HTTPS: Hr, WebSockets: Ft, WebSocketsSecure: vt, WebSocketStar: mh, WebRTCStar: Co, WebRTCDirect: Bo, Reliable: kt, Stardust: yh, Circuit: Ut, P2P: Cu, IPFS: Cu };
  function Fu(t) {
    function e(r) {
      if (!Eo.isMultiaddr(r))
        try {
          r = new Eo(r);
        } catch {
          return false;
        }
      let n = t(r.protoNames());
      return n === null ? false : n === true || n === false ? n : n.length === 0;
    }
    return e;
  }
  function A(...t) {
    function e(r) {
      if (r.length < t.length)
        return null;
      let n = r;
      return t.some((o) => (n = typeof o == "function" ? o().partialMatch(r) : o.partialMatch(r), Array.isArray(n) && (r = n), n === null)), n;
    }
    return { toString: function() {
      return "{ " + t.join(" ") + " }";
    }, input: t, matches: Fu(e), partialMatch: e };
  }
  function V(...t) {
    function e(n) {
      let o = null;
      return t.some((i) => {
        let s = typeof i == "function" ? i().partialMatch(n) : i.partialMatch(n);
        return s ? (o = s, true) : false;
      }), o;
    }
    return { toString: function() {
      return "{ " + t.join(" ") + " }";
    }, input: t, matches: Fu(e), partialMatch: e };
  }
  function E(t) {
    let e = t;
    function r(o) {
      let i;
      if (typeof o == "string" || o instanceof Uint8Array)
        try {
          i = new Eo(o);
        } catch {
          return false;
        }
      else
        i = o;
      let s = i.protoNames();
      return s.length === 1 && s[0] === e;
    }
    function n(o) {
      return o.length === 0 ? null : o[0] === e ? o.slice(1) : null;
    }
    return { toString: function() {
      return e;
    }, matches: r, partialMatch: n };
  }
});
var To = S((L0, Nu) => {
  a();
  var wh = typeof navigator < "u" && navigator.product === "ReactNative";
  function gh() {
    return wh ? "http://localhost" : d.location ? d.location.protocol + "//" + d.location.host : "";
  }
  var Zt = d.URL, _u = gh(), Ao = class {
    constructor(e = "", r = _u) {
      this.super = new Zt(e, r), this.path = this.pathname + this.search, this.auth = this.username && this.password ? this.username + ":" + this.password : null, this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null;
    }
    get hash() {
      return this.super.hash;
    }
    get host() {
      return this.super.host;
    }
    get hostname() {
      return this.super.hostname;
    }
    get href() {
      return this.super.href;
    }
    get origin() {
      return this.super.origin;
    }
    get password() {
      return this.super.password;
    }
    get pathname() {
      return this.super.pathname;
    }
    get port() {
      return this.super.port;
    }
    get protocol() {
      return this.super.protocol;
    }
    get search() {
      return this.super.search;
    }
    get searchParams() {
      return this.super.searchParams;
    }
    get username() {
      return this.super.username;
    }
    set hash(e) {
      this.super.hash = e;
    }
    set host(e) {
      this.super.host = e;
    }
    set hostname(e) {
      this.super.hostname = e;
    }
    set href(e) {
      this.super.href = e;
    }
    set password(e) {
      this.super.password = e;
    }
    set pathname(e) {
      this.super.pathname = e;
    }
    set port(e) {
      this.super.port = e;
    }
    set protocol(e) {
      this.super.protocol = e;
    }
    set search(e) {
      this.super.search = e;
    }
    set username(e) {
      this.super.username = e;
    }
    static createObjectURL(e) {
      return Zt.createObjectURL(e);
    }
    static revokeObjectURL(e) {
      Zt.revokeObjectURL(e);
    }
    toJSON() {
      return this.super.toJSON();
    }
    toString() {
      return this.super.toString();
    }
    format() {
      return this.toString();
    }
  };
  function Dh(t) {
    if (typeof t == "string")
      return new Zt(t).toString();
    if (!(t instanceof Zt)) {
      let e = t.username && t.password ? `${t.username}:${t.password}@` : "", r = t.auth ? t.auth + "@" : "", n = t.port ? ":" + t.port : "", o = t.protocol ? t.protocol + "//" : "", i = t.host || "", s = t.hostname || "", u = t.search || (t.query ? "?" + t.query : ""), h = t.hash || "", w = t.pathname || "", c = t.path || w + u;
      return `${o}${e || r}${i || s + n}${c}${h}`;
    }
  }
  Nu.exports = { URLWithLegacySupport: Ao, URLSearchParams: d.URLSearchParams, defaultBase: _u, format: Dh };
});
var Pu = S((P0, Lu) => {
  a();
  var { URLWithLegacySupport: $u, format: bh } = To();
  Lu.exports = (t, e = {}, r = {}, n) => {
    let o = e.protocol ? e.protocol.replace(":", "") : "http";
    o = (r[o] || n || o) + ":";
    let i;
    try {
      i = new $u(t);
    } catch {
      i = {};
    }
    let s = Object.assign({}, e, { protocol: o || i.protocol, host: e.host || i.host });
    return new $u(t, bh(s)).toString();
  };
});
var Mu = S((R0, Ru) => {
  a();
  var { URLWithLegacySupport: Eh, format: xh, URLSearchParams: Ch, defaultBase: Bh } = To(), Ah = Pu();
  Ru.exports = { URL: Eh, URLSearchParams: Ch, format: xh, relative: Ah, defaultBase: Bh };
});
var Ku = S((M0, Zu) => {
  a();
  var { base58btc: Th } = (Re(), R(dt)), { base32: Ih } = (ht(), R(Rt)), Sh = (Le(), R(Ue)), { Multiaddr: Ou } = bo(), Uh = ku(), { CID: Io } = (Q(), R(dr)), { URL: Fh } = Mu(), { toString: vh } = (Ke(), R(Tt)), So = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/, Nt = /^\/(ip[fn]s)\/([^/?#]+)/, Hu = 1, ju = 2, tr = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/, Vu = 1, Gu = 2, kh = /^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)+([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/;
  function _h(t) {
    let e = Uo(t);
    try {
      Sh.decode(Th.decode("z" + e));
    } catch {
      return false;
    }
    return true;
  }
  function Nh(t) {
    try {
      Ih.decode(t);
    } catch {
      return false;
    }
    return true;
  }
  function Kt(t) {
    try {
      return typeof t == "string" ? Boolean(Io.parse(t)) : t instanceof Uint8Array ? Boolean(Io.decode(t)) : Boolean(Io.asCID(t));
    } catch {
      return false;
    }
  }
  function Wu(t) {
    if (!t)
      return false;
    if (Ou.isMultiaddr(t))
      return true;
    try {
      return new Ou(t), true;
    } catch {
      return false;
    }
  }
  function $h(t) {
    return Wu(t) && Uh.P2P.matches(t);
  }
  function er(t, e, r = Hu, n = ju) {
    let o = Uo(t);
    if (!o)
      return false;
    let i = o.match(e);
    if (!i || i[r] !== "ipfs")
      return false;
    let s = i[n];
    return s && e === tr && (s = s.toLowerCase()), Kt(s);
  }
  function jr(t, e, r = Hu, n = ju) {
    let o = Uo(t);
    if (!o)
      return false;
    let i = o.match(e);
    if (!i || i[r] !== "ipns")
      return false;
    let s = i[n];
    if (s && e === tr) {
      if (s = s.toLowerCase(), Kt(s))
        return true;
      try {
        !s.includes(".") && s.includes("-") && (s = s.replace(/--/g, "@").replace(/-/g, ".").replace(/@/g, "-"));
        let { hostname: u } = new Fh(`http://${s}`);
        return kh.test(u);
      } catch {
        return false;
      }
    }
    return true;
  }
  function Ju(t) {
    return typeof t == "string";
  }
  function Uo(t) {
    return t instanceof Uint8Array ? vh(t, "base58btc") : Ju(t) ? t : false;
  }
  var Fo = (t) => er(t, tr, Gu, Vu), vo = (t) => jr(t, tr, Gu, Vu), Xu = (t) => Fo(t) || vo(t), Yu = (t) => er(t, So) || Fo(t), Qu = (t) => jr(t, So) || vo(t), zu = (t) => Yu(t) || Qu(t) || Xu(t), qu = (t) => er(t, Nt) || jr(t, Nt);
  Zu.exports = { multihash: _h, multiaddr: Wu, peerMultiaddr: $h, cid: Kt, base32cid: (t) => Nh(t) && Kt(t), ipfsSubdomain: Fo, ipnsSubdomain: vo, subdomain: Xu, subdomainGatewayPattern: tr, ipfsUrl: Yu, ipnsUrl: Qu, url: zu, pathGatewayPattern: So, ipfsPath: (t) => er(t, Nt), ipnsPath: (t) => jr(t, Nt), path: qu, pathPattern: Nt, urlOrPath: (t) => zu(t) || qu(t), cidPath: (t) => Ju(t) && !Kt(t) && er(`/ipfs/${t}`, Nt) };
});
var hc = S((Iy, dc) => {
  a();
  function zh(t) {
    let [e, r] = t[Symbol.asyncIterator] ? [t[Symbol.asyncIterator](), Symbol.asyncIterator] : [t[Symbol.iterator](), Symbol.iterator], n = [];
    return { peek: () => e.next(), push: (o) => {
      n.push(o);
    }, next: () => n.length ? { done: false, value: n.shift() } : e.next(), [r]() {
      return this;
    } };
  }
  dc.exports = zh;
});
var mc = S((Sy, pc) => {
  a();
  var qh = async (t) => {
    for await (let e of t)
      ;
  };
  pc.exports = qh;
});
var wc = S((Uy, yc) => {
  a();
  var Hh = async function* (t, e) {
    for await (let r of t)
      yield e(r);
  };
  yc.exports = Hh;
});
a();
a();
Q();
a();
gn();
a();
Q();
a();
J(pt(), 1);
a();
a();
a();
a();
var ll = ["string", "number", "bigint", "symbol"], dl = ["Function", "Generator", "AsyncGenerator", "GeneratorFunction", "AsyncGeneratorFunction", "AsyncFunction", "Observable", "Array", "Buffer", "Object", "RegExp", "Date", "Error", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Promise", "URL", "HTMLElement", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
function Fi(t) {
  if (t === null)
    return "null";
  if (t === void 0)
    return "undefined";
  if (t === true || t === false)
    return "boolean";
  let e = typeof t;
  if (ll.includes(e))
    return e;
  if (e === "function")
    return "Function";
  if (Array.isArray(t))
    return "Array";
  if (hl(t))
    return "Buffer";
  let r = pl(t);
  return r || "Object";
}
function hl(t) {
  return t && t.constructor && t.constructor.isBuffer && t.constructor.isBuffer.call(null, t);
}
function pl(t) {
  let e = Object.prototype.toString.call(t).slice(8, -1);
  if (dl.includes(e))
    return e;
}
a();
var l = class {
  constructor(e, r, n) {
    this.major = e, this.majorEncoded = e << 5, this.name = r, this.terminal = n;
  }
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  compare(e) {
    return this.major < e.major ? -1 : this.major > e.major ? 1 : 0;
  }
};
l.uint = new l(0, "uint", true);
l.negint = new l(1, "negint", true);
l.bytes = new l(2, "bytes", true);
l.string = new l(3, "string", true);
l.array = new l(4, "array", false);
l.map = new l(5, "map", false);
l.tag = new l(6, "tag", false);
l.float = new l(7, "float", true);
l.false = new l(7, "false", true);
l.true = new l(7, "true", true);
l.null = new l(7, "null", true);
l.undefined = new l(7, "undefined", true);
l.break = new l(7, "break", true);
var b = class {
  constructor(e, r, n) {
    this.type = e, this.value = r, this.encodedLength = n, this.encodedBytes = void 0, this.byteValue = void 0;
  }
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
};
a();
a();
var mt = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer == "function";
new TextDecoder();
var yl = new TextEncoder();
function pr(t) {
  return mt && globalThis.Buffer.isBuffer(t);
}
var $i = mt ? (t) => t.length > 64 ? globalThis.Buffer.from(t) : vi(t) : (t) => t.length > 64 ? yl.encode(t) : vi(t);
function Ri(t, e) {
  if (pr(t) && pr(e))
    return t.compare(e);
  for (let r = 0; r < t.length; r++)
    if (t[r] !== e[r])
      return t[r] < e[r] ? -1 : 1;
  return 0;
}
function vi(t, e = 1 / 0) {
  let r, n = t.length, o = null, i = [];
  for (let s = 0; s < n; ++s) {
    if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
      if (!o) {
        if (r > 56319) {
          (e -= 3) > -1 && i.push(239, 191, 189);
          continue;
        } else if (s + 1 === n) {
          (e -= 3) > -1 && i.push(239, 191, 189);
          continue;
        }
        o = r;
        continue;
      }
      if (r < 56320) {
        (e -= 3) > -1 && i.push(239, 191, 189), o = r;
        continue;
      }
      r = (o - 55296 << 10 | r - 56320) + 65536;
    } else
      o && (e -= 3) > -1 && i.push(239, 191, 189);
    if (o = null, r < 128) {
      if ((e -= 1) < 0)
        break;
      i.push(r);
    } else if (r < 2048) {
      if ((e -= 2) < 0)
        break;
      i.push(r >> 6 | 192, r & 63 | 128);
    } else if (r < 65536) {
      if ((e -= 3) < 0)
        break;
      i.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
    } else if (r < 1114112) {
      if ((e -= 4) < 0)
        break;
      i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
    } else
      throw new Error("Invalid code point");
  }
  return i;
}
a();
var C = "CBOR decode error:", An = "CBOR encode error:";
a();
a();
var z = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
function ce(t, e) {
  return H(t, 0, e.value);
}
function H(t, e, r) {
  if (r < z[0]) {
    let n = Number(r);
    t.push([e | n]);
  } else if (r < z[1]) {
    let n = Number(r);
    t.push([e | 24, n]);
  } else if (r < z[2]) {
    let n = Number(r);
    t.push([e | 25, n >>> 8, n & 255]);
  } else if (r < z[3]) {
    let n = Number(r);
    t.push([e | 26, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255]);
  } else {
    let n = BigInt(r);
    if (n < z[4]) {
      let o = [e | 27, 0, 0, 0, 0, 0, 0, 0], i = Number(n & BigInt(4294967295)), s = Number(n >> BigInt(32) & BigInt(4294967295));
      o[8] = i & 255, i = i >> 8, o[7] = i & 255, i = i >> 8, o[6] = i & 255, i = i >> 8, o[5] = i & 255, o[4] = s & 255, s = s >> 8, o[3] = s & 255, s = s >> 8, o[2] = s & 255, s = s >> 8, o[1] = s & 255, t.push(o);
    } else
      throw new Error(`${C} encountered BigInt larger than allowable range`);
  }
}
ce.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
H.encodedSize = function(e) {
  return e < z[0] ? 1 : e < z[1] ? 2 : e < z[2] ? 3 : e < z[3] ? 5 : 9;
};
ce.compareTokens = function(e, r) {
  return e.value < r.value ? -1 : e.value > r.value ? 1 : 0;
};
a();
var Tn = BigInt(-1), Gi = BigInt(1);
function mr(t, e) {
  let r = e.value, n = typeof r == "bigint" ? r * Tn - Gi : r * -1 - 1;
  H(t, e.type.majorEncoded, n);
}
mr.encodedSize = function(e) {
  let r = e.value, n = typeof r == "bigint" ? r * Tn - Gi : r * -1 - 1;
  return n < z[0] ? 1 : n < z[1] ? 2 : n < z[2] ? 3 : n < z[3] ? 5 : 9;
};
mr.compareTokens = function(e, r) {
  return e.value < r.value ? 1 : e.value > r.value ? -1 : 0;
};
a();
function yr(t) {
  return t.encodedBytes === void 0 && (t.encodedBytes = t.type === l.string ? $i(t.value) : t.value), t.encodedBytes;
}
function wt(t, e) {
  let r = yr(e);
  H(t, e.type.majorEncoded, r.length), t.push(r);
}
wt.encodedSize = function(e) {
  let r = yr(e);
  return H.encodedSize(r.length) + r.length;
};
wt.compareTokens = function(e, r) {
  return bl(yr(e), yr(r));
};
function bl(t, e) {
  return t.length < e.length ? -1 : t.length > e.length ? 1 : Ri(t, e);
}
a();
var os = wt;
a();
function wr(t, e) {
  H(t, l.array.majorEncoded, e.value);
}
wr.compareTokens = ce.compareTokens;
wr.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
a();
function gr(t, e) {
  H(t, l.map.majorEncoded, e.value);
}
gr.compareTokens = ce.compareTokens;
gr.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
a();
function Dr(t, e) {
  H(t, l.tag.majorEncoded, e.value);
}
Dr.compareTokens = ce.compareTokens;
Dr.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
a();
var Tl = 20, Il = 21, Sl = 22, Ul = 23;
function br(t, e, r) {
  let n = e.value;
  if (n === false)
    t.push([l.float.majorEncoded | Tl]);
  else if (n === true)
    t.push([l.float.majorEncoded | Il]);
  else if (n === null)
    t.push([l.float.majorEncoded | Sl]);
  else if (n === void 0)
    t.push([l.float.majorEncoded | Ul]);
  else {
    let o, i = false;
    (!r || r.float64 !== true) && (Ss(n), o = Sn(me, 1), n === o || Number.isNaN(n) ? (me[0] = 249, t.push(me.slice(0, 3)), i = true) : (Us(n), o = Un(me, 1), n === o && (me[0] = 250, t.push(me.slice(0, 5)), i = true))), i || (Fl(n), o = Fs(me, 1), me[0] = 251, t.push(me.slice(0, 9)));
  }
}
br.encodedSize = function(e, r) {
  let n = e.value;
  if (n === false || n === true || n === null || n === void 0)
    return 1;
  if (!r || r.float64 !== true) {
    Ss(n);
    let o = Sn(me, 1);
    if (n === o || Number.isNaN(n))
      return 3;
    if (Us(n), o = Un(me, 1), n === o)
      return 5;
  }
  return 9;
};
var Is = new ArrayBuffer(9), fe = new DataView(Is, 1), me = new Uint8Array(Is, 0);
function Ss(t) {
  if (t === 1 / 0)
    fe.setUint16(0, 31744, false);
  else if (t === -1 / 0)
    fe.setUint16(0, 64512, false);
  else if (Number.isNaN(t))
    fe.setUint16(0, 32256, false);
  else {
    fe.setFloat32(0, t);
    let e = fe.getUint32(0), r = (e & 2139095040) >> 23, n = e & 8388607;
    if (r === 255)
      fe.setUint16(0, 31744, false);
    else if (r === 0)
      fe.setUint16(0, (t & 2147483648) >> 16 | n >> 13, false);
    else {
      let o = r - 127;
      o < -24 ? fe.setUint16(0, 0) : o < -14 ? fe.setUint16(0, (e & 2147483648) >> 16 | 1 << 24 + o, false) : fe.setUint16(0, (e & 2147483648) >> 16 | o + 15 << 10 | n >> 13, false);
    }
  }
}
function Sn(t, e) {
  if (t.length - e < 2)
    throw new Error(`${C} not enough data for float16`);
  let r = (t[e] << 8) + t[e + 1];
  if (r === 31744)
    return 1 / 0;
  if (r === 64512)
    return -1 / 0;
  if (r === 32256)
    return NaN;
  let n = r >> 10 & 31, o = r & 1023, i;
  return n === 0 ? i = o * 2 ** -24 : n !== 31 ? i = (o + 1024) * 2 ** (n - 25) : i = o === 0 ? 1 / 0 : NaN, r & 32768 ? -i : i;
}
function Us(t) {
  fe.setFloat32(0, t, false);
}
function Un(t, e) {
  if (t.length - e < 4)
    throw new Error(`${C} not enough data for float32`);
  let r = (t.byteOffset || 0) + e;
  return new DataView(t.buffer, r, 4).getFloat32(0, false);
}
function Fl(t) {
  fe.setFloat64(0, t, false);
}
function Fs(t, e) {
  if (t.length - e < 8)
    throw new Error(`${C} not enough data for float64`);
  let r = (t.byteOffset || 0) + e;
  return new DataView(t.buffer, r, 8).getFloat64(0, false);
}
br.compareTokens = ce.compareTokens;
for (let t = 0; t < 24; t++)
  new b(l.uint, t, 1);
for (let t = -1; t >= -24; t--)
  new b(l.negint, t, 1);
new b(l.bytes, new Uint8Array(0), 1);
new b(l.string, "", 1);
new b(l.array, 0, 1);
new b(l.map, 0, 1);
new b(l.false, false, 1);
new b(l.true, true, 1);
new b(l.null, null, 1);
function _l() {
  let t = [];
  return t[l.uint.major] = ce, t[l.negint.major] = mr, t[l.bytes.major] = wt, t[l.string.major] = os, t[l.array.major] = wr, t[l.map.major] = gr, t[l.tag.major] = Dr, t[l.float.major] = br, t;
}
_l();
var bt = class {
  constructor(e, r) {
    this.obj = e, this.parent = r;
  }
  includes(e) {
    let r = this;
    do
      if (r.obj === e)
        return true;
    while (r = r.parent);
    return false;
  }
  static createCheck(e, r) {
    if (e && e.includes(r))
      throw new Error(`${An} object contains circular references`);
    return new bt(r, e);
  }
}, Oe = { null: new b(l.null, null), undefined: new b(l.undefined, void 0), true: new b(l.true, true), false: new b(l.false, false), emptyArray: new b(l.array, 0), emptyMap: new b(l.map, 0) }, ze = { number(t, e, r, n) {
  return !Number.isInteger(t) || !Number.isSafeInteger(t) ? new b(l.float, t) : t >= 0 ? new b(l.uint, t) : new b(l.negint, t);
}, bigint(t, e, r, n) {
  return t >= BigInt(0) ? new b(l.uint, t) : new b(l.negint, t);
}, Uint8Array(t, e, r, n) {
  return new b(l.bytes, t);
}, string(t, e, r, n) {
  return new b(l.string, t);
}, boolean(t, e, r, n) {
  return t ? Oe.true : Oe.false;
}, null(t, e, r, n) {
  return Oe.null;
}, undefined(t, e, r, n) {
  return Oe.undefined;
}, ArrayBuffer(t, e, r, n) {
  return new b(l.bytes, new Uint8Array(t));
}, DataView(t, e, r, n) {
  return new b(l.bytes, new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}, Array(t, e, r, n) {
  if (!t.length)
    return r.addBreakTokens === true ? [Oe.emptyArray, new b(l.break)] : Oe.emptyArray;
  n = bt.createCheck(n, t);
  let o = [], i = 0;
  for (let s of t)
    o[i++] = xr(s, r, n);
  return r.addBreakTokens ? [new b(l.array, t.length), o, new b(l.break)] : [new b(l.array, t.length), o];
}, Object(t, e, r, n) {
  let o = e !== "Object", i = o ? t.keys() : Object.keys(t), s = o ? t.size : i.length;
  if (!s)
    return r.addBreakTokens === true ? [Oe.emptyMap, new b(l.break)] : Oe.emptyMap;
  n = bt.createCheck(n, t);
  let u = [], h = 0;
  for (let w of i)
    u[h++] = [xr(w, r, n), xr(o ? t.get(w) : t[w], r, n)];
  return Nl(u, r), r.addBreakTokens ? [new b(l.map, s), u, new b(l.break)] : [new b(l.map, s), u];
} };
ze.Map = ze.Object;
ze.Buffer = ze.Uint8Array;
for (let t of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" "))
  ze[`${t}Array`] = ze.DataView;
function xr(t, e = {}, r) {
  let n = Fi(t), o = e && e.typeEncoders && e.typeEncoders[n] || ze[n];
  if (typeof o == "function") {
    let s = o(t, n, e, r);
    if (s != null)
      return s;
  }
  let i = ze[n];
  if (!i)
    throw new Error(`${An} unsupported type: ${n}`);
  return i(t, n, e, r);
}
function Nl(t, e) {
  e.mapSorter && t.sort(e.mapSorter);
}
a();
Q();
a();
a();
J(pt(), 1);
Q();
Le();
a();
a();
J(Zs(), 1);
J(ea(), 1);
a();
a();
var ve = class extends Error {
  constructor(e = "request timed out") {
    super(e), this.name = "TimeoutError", this.code = ve.code;
  }
};
ve.code = "ERR_TIMEOUT";
a();
var Be = J(ca(), 1);
Re();
ht();
zn();
Be.default.formatters.b = (t) => t == null ? "undefined" : Y.baseEncode(t);
Be.default.formatters.t = (t) => t == null ? "undefined" : Me.baseEncode(t);
Be.default.formatters.m = (t) => t == null ? "undefined" : Mn.baseEncode(t);
Be.default.formatters.p = (t) => t == null ? "undefined" : t.toString();
Be.default.formatters.c = (t) => t == null ? "undefined" : t.toString();
Be.default.formatters.k = (t) => t == null ? "undefined" : t.toString();
function kr(t) {
  return Object.assign((0, Be.default)(t), { error: (0, Be.default)(`${t}:error`), trace: (0, Be.default)(`${t}:trace`) });
}
qn();
Hn();
a();
Re();
kr("ipfs:components:dag:import");
a();
J(wa(), 1);
J(Da(), 1);
a();
J(Ku(), 1);
Q();
a();
a();
a();
var ec = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, r) => (r &= 63, r < 36 ? e += r.toString(36) : r < 62 ? e += (r - 26).toString(36).toUpperCase() : r > 62 ? e += "-" : e += "_", e), "");
Ke();
fo();
var ke = "/", tc = new TextEncoder().encode(ke), Vr = tc[0], G = class {
  constructor(e, r) {
    if (typeof e == "string")
      this._buf = co(e);
    else if (e instanceof Uint8Array)
      this._buf = e;
    else
      throw new Error("Invalid key, should be String of Uint8Array");
    if (r == null && (r = true), r && this.clean(), this._buf.byteLength === 0 || this._buf[0] !== Vr)
      throw new Error("Invalid key");
  }
  toString(e = "utf8") {
    return so(this._buf, e);
  }
  uint8Array() {
    return this._buf;
  }
  get [Symbol.toStringTag]() {
    return `Key(${this.toString()})`;
  }
  static withNamespaces(e) {
    return new G(e.join(ke));
  }
  static random() {
    return new G(ec().replace(/-/g, ""));
  }
  static asKey(e) {
    return e instanceof Uint8Array || typeof e == "string" ? new G(e) : e.uint8Array ? new G(e.uint8Array()) : null;
  }
  clean() {
    if ((!this._buf || this._buf.byteLength === 0) && (this._buf = tc), this._buf[0] !== Vr) {
      let e = new Uint8Array(this._buf.byteLength + 1);
      e.fill(Vr, 0, 1), e.set(this._buf, 1), this._buf = e;
    }
    for (; this._buf.byteLength > 1 && this._buf[this._buf.byteLength - 1] === Vr; )
      this._buf = this._buf.subarray(0, -1);
  }
  less(e) {
    let r = this.list(), n = e.list();
    for (let o = 0; o < r.length; o++) {
      if (n.length < o + 1)
        return false;
      let i = r[o], s = n[o];
      if (i < s)
        return true;
      if (i > s)
        return false;
    }
    return r.length < n.length;
  }
  reverse() {
    return G.withNamespaces(this.list().slice().reverse());
  }
  namespaces() {
    return this.list();
  }
  baseNamespace() {
    let e = this.namespaces();
    return e[e.length - 1];
  }
  list() {
    return this.toString().split(ke).slice(1);
  }
  type() {
    return Lh(this.baseNamespace());
  }
  name() {
    return Ph(this.baseNamespace());
  }
  instance(e) {
    return new G(this.toString() + ":" + e);
  }
  path() {
    let e = this.parent().toString();
    return e.endsWith(ke) || (e += ke), e += this.type(), new G(e);
  }
  parent() {
    let e = this.list();
    return e.length === 1 ? new G(ke) : new G(e.slice(0, -1).join(ke));
  }
  child(e) {
    return this.toString() === ke ? e : e.toString() === ke ? this : new G(this.toString() + e.toString(), false);
  }
  isAncestorOf(e) {
    return e.toString() === this.toString() ? false : e.toString().startsWith(this.toString());
  }
  isDecendantOf(e) {
    return e.toString() === this.toString() ? false : this.toString().startsWith(e.toString());
  }
  isTopLevel() {
    return this.list().length === 1;
  }
  concat(...e) {
    return G.withNamespaces([...this.namespaces(), ...Rh(e.map((r) => r.namespaces()))]);
  }
};
function Lh(t) {
  let e = t.split(":");
  return e.length < 2 ? "" : e.slice(0, -1).join(":");
}
function Ph(t) {
  let e = t.split(":");
  return e[e.length - 1];
}
function Rh(t) {
  return [].concat(...t);
}
J(Yt(), 1);
a();
Q();
J(Yt(), 1);
a();
Q();
a();
new TextDecoder();
a();
new TextEncoder();
a();
Q();
new TextEncoder();
new G("/local/filesroot");
J(Yt(), 1);
a();
a();
J(hc(), 1);
J(mc(), 1);
J(wc(), 1);
kr("ipfs:components:dag:import");
a();
Q();
a();
/*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
const code = 0;
const name = "identity";
const encode$2 = coerce;
const digest = (input) => create$1(code, encode$2(input));
const identity$1 = {
  code,
  name,
  encode: encode$2,
  digest
};
const identity$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$1
}, Symbol.toStringTag, { value: "Module" }));
const identity = from$1({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString$1(buf),
  decode: (str) => fromString(str)
});
const identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648({
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
const base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648({
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
const base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64,
  base64pad,
  base64url,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
const alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
const alphabetBytesToChars = alphabet.reduce((p2, c, i) => {
  p2[i] = c;
  return p2;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p2, c, i) => {
  p2[c.codePointAt(0)] = i;
  return p2;
}, []);
function encode$1(data2) {
  return data2.reduce((p2, c) => {
    p2 += alphabetBytesToChars[c];
    return p2;
  }, "");
}
function decode(str) {
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
const base256emoji = from$1({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode$1,
  decode
});
const base256emoji$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
({
  ...identityBase,
  ...base2$1,
  ...base8$1,
  ...base10$1,
  ...base16$1,
  ...base32$1,
  ...base36$1,
  ...base58,
  ...base64$1,
  ...base256emoji$1
});
({
  ...sha2,
  ...identity$2
});
async function* makeIterable(array) {
  let nextIndex = 0;
  while (nextIndex < array.length) {
    yield array[nextIndex++];
  }
}
async function importBuffer(dag, buffer) {
  const it = await makeIterable([buffer]);
  const [{ root }] = await itAll(dag.import(it));
  return root.cid;
}
var axios$3 = { exports: {} };
var axios$2 = { exports: {} };
var bind$2 = function bind(fn2, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn2.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn2) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l2 = obj.length; i < l2; i++) {
      fn2.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn2.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l2 = arguments.length; i < l2; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a2, b2, thisArg) {
  forEach(b2, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a2[key] = bind$1(val, thisArg);
    } else {
      a2[key] = val;
    }
  });
  return a2;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$b = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray,
  isFileList
};
var utils$a = utils$b;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$a.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$a.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$a.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$a.forEach(val, function parseValue(v) {
        if (utils$a.isDate(v)) {
          v = v.toISOString();
        } else if (utils$a.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$9 = utils$b;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn2) {
  utils$9.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn2(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$8 = utils$b;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$8.forEach(headers, function processHeader(value, name2) {
    if (name2 !== normalizedName && name2.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name2];
    }
  });
};
var utils$7 = utils$b;
function AxiosError$2(message, code2, config, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code2 && (this.code = code2);
  config && (this.config = config);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$7.inherits(AxiosError$2, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$2.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code2) {
  descriptors[code2] = { value: code2 };
});
Object.defineProperties(AxiosError$2, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$2.from = function(error, code2, config, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$7.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$2.call(axiosError, error.message, code2, config, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$2;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$6 = utils$b;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$6.isDate(value)) {
      return value.toISOString();
    }
    if (utils$6.isArrayBuffer(value) || utils$6.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$6.isPlainObject(data2) || utils$6.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$6.forEach(data2, function each(value, key) {
        if (utils$6.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$6.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$6.endsWith(key, "[]") && (arr = utils$6.toArray(value))) {
            arr.forEach(function(el) {
              !utils$6.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var AxiosError2 = AxiosError_1;
  settle = function settle2(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError2(
        "Request failed with status code " + response.status,
        [AxiosError2.ERR_BAD_REQUEST, AxiosError2.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var utils2 = utils$b;
  cookies = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name2, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name2 + "=" + encodeURIComponent(value));
        if (utils2.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils2.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils2.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read2(name2) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name2) {
        this.write(name2, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read2() {
        return null;
      },
      remove: function remove() {
      }
    };
  }();
  return cookies;
}
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = utils$b;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = utils$b;
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }();
  return isURLSameOrigin;
}
var CanceledError_1;
var hasRequiredCanceledError;
function requireCanceledError() {
  if (hasRequiredCanceledError)
    return CanceledError_1;
  hasRequiredCanceledError = 1;
  var AxiosError2 = AxiosError_1;
  var utils2 = utils$b;
  function CanceledError2(message) {
    AxiosError2.call(this, message == null ? "canceled" : message, AxiosError2.ERR_CANCELED);
    this.name = "CanceledError";
  }
  utils2.inherits(CanceledError2, AxiosError2, {
    __CANCEL__: true
  });
  CanceledError_1 = CanceledError2;
  return CanceledError_1;
}
var parseProtocol;
var hasRequiredParseProtocol;
function requireParseProtocol() {
  if (hasRequiredParseProtocol)
    return parseProtocol;
  hasRequiredParseProtocol = 1;
  parseProtocol = function parseProtocol2(url) {
    var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  };
  return parseProtocol;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var utils2 = utils$b;
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL3 = buildURL$1;
  var buildFullPath3 = buildFullPath$1;
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var transitionalDefaults2 = transitional;
  var AxiosError2 = AxiosError_1;
  var CanceledError2 = requireCanceledError();
  var parseProtocol2 = requireParseProtocol();
  xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils2.isFormData(requestData) && utils2.isStandardBrowserEnv()) {
        delete requestHeaders["Content-Type"];
      }
      var request2 = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath3(config.baseURL, config.url);
      request2.open(config.method.toUpperCase(), buildURL3(fullPath, config.params, config.paramsSerializer), true);
      request2.timeout = config.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config,
          request: request2
        };
        settle2(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(new AxiosError2("Request aborted", AxiosError2.ECONNABORTED, config, request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(new AxiosError2("Network Error", AxiosError2.ERR_NETWORK, config, request2, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        var transitional3 = config.transitional || transitionalDefaults2;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError2(
          timeoutErrorMessage,
          transitional3.clarifyTimeoutError ? AxiosError2.ETIMEDOUT : AxiosError2.ECONNABORTED,
          config,
          request2
        ));
        request2 = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin2(fullPath)) && config.xsrfCookieName ? cookies2.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request2) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request2.setRequestHeader(key, val);
          }
        });
      }
      if (!utils2.isUndefined(config.withCredentials)) {
        request2.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request2.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken || config.signal) {
        onCanceled = function(cancel) {
          if (!request2) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new CanceledError2() : cancel);
          request2.abort();
          request2 = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      var protocol = parseProtocol2(fullPath);
      if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
        reject(new AxiosError2("Unsupported protocol " + protocol + ":", AxiosError2.ERR_BAD_REQUEST, config));
        return;
      }
      request2.send(requestData);
    });
  };
  return xhr;
}
var _null;
var hasRequired_null;
function require_null() {
  if (hasRequired_null)
    return _null;
  hasRequired_null = 1;
  _null = null;
  return _null;
}
var utils$5 = utils$b;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = requireXhr();
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = requireXhr();
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$5.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$5.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$5.isFormData(data2) || utils$5.isArrayBuffer(data2) || utils$5.isBuffer(data2) || utils$5.isStream(data2) || utils$5.isFile(data2) || utils$5.isBlob(data2)) {
      return data2;
    }
    if (utils$5.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$5.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$5.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$5.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$5.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: require_null()
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$5.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$5.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$4 = utils$b;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$4.forEach(fns, function transform(fn2) {
    data2 = fn2.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel)
    return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}
var utils$3 = utils$b;
var transformData2 = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = defaults_1;
var CanceledError = requireCanceledError();
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = utils$3.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );
  utils$3.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$2 = utils$b;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source) {
    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
      return utils$2.merge(target, source);
    } else if (utils$2.isPlainObject(source)) {
      return utils$2.merge({}, source);
    } else if (utils$2.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$2.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data;
var hasRequiredData;
function requireData() {
  if (hasRequiredData)
    return data;
  hasRequiredData = 1;
  data = {
    "version": "0.27.2"
  };
  return data;
}
var VERSION = requireData().version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$1 = utils$b;
var buildURL2 = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$1;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  var fullPath = buildFullPath2(config.baseURL, config.url);
  return buildURL2(fullPath, config.params, config.paramsSerializer);
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var CanceledError2 = requireCanceledError();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    this.promise.then(function(cancel) {
      if (!token._listeners)
        return;
      var i;
      var l2 = token._listeners.length;
      for (i = 0; i < l2; i++) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve) {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError2(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread)
    return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError)
    return isAxiosError;
  hasRequiredIsAxiosError = 1;
  var utils2 = utils$b;
  isAxiosError = function isAxiosError2(payload) {
    return utils2.isObject(payload) && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var utils = utils$b;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios$1 = createInstance(defaults);
axios$1.Axios = Axios;
axios$1.CanceledError = requireCanceledError();
axios$1.CancelToken = requireCancelToken();
axios$1.isCancel = requireIsCancel();
axios$1.VERSION = requireData().version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = requireSpread();
axios$1.isAxiosError = requireIsAxiosError();
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
(function(module) {
  module.exports = axios$2.exports;
})(axios$3);
const axios = /* @__PURE__ */ getDefaultExportFromCjs(axios$3.exports);
let GQL_ENDPOINT = "https://arweave.net/graphql";
const setEndpointUrl = (full_GQL_Url) => GQL_ENDPOINT = full_GQL_Url;
const run = async (query, variables) => {
  const graphql = JSON.stringify({
    query,
    variables
  });
  const { data: res } = await axios.post(GQL_ENDPOINT, graphql, {
    headers: {
      "content-type": "application/json"
    }
  });
  return res;
};
const all2 = async (query, variables) => {
  let hasNextPage = true;
  let edges = [];
  let cursor = "";
  while (hasNextPage) {
    const res = (await run(query, {
      ...variables,
      cursor
    })).data.transactions;
    if (res.edges && res.edges.length) {
      edges = edges.concat(res.edges);
      cursor = res.edges[res.edges.length - 1].cursor;
    }
    hasNextPage = res.pageInfo.hasNextPage;
  }
  return edges;
};
const backupEndpoint = "https://arweave-search.goldsky.com/graphql";
async function getOwnerArDag({ arweave, searchTags, dagOwner }) {
  const { host, port, protocol } = arweave.api.config;
  const endpoint = `${protocol}://${host}:${port}/graphql`;
  setEndpointUrl(endpoint);
  const query = `query($cursor: String) {
    transactions(
    owners: ["${dagOwner}"]
    tags: [{ name: "App-Name", values: ["ArDag"] }]
    after: $cursor
    first: 100
  ) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        id
      }
    }
  }
}`;
  try {
    const txs = await all2(query);
    return txs.map((tx) => tx.node);
  } catch (error) {
    console.log("ArGQL failed", error);
    setEndpointUrl(backupEndpoint);
  }
  try {
    const txs = await all2(query);
    return txs.map((tx) => tx.node);
  } catch (error) {
    console.log("ArGQL failed, both gateways down", error);
  }
}
const AR_DAG = "ArDag";
async function persist({ buffer = null, arweave = null, wallet = null, tags = [] }) {
  if (!buffer)
    throw new Error("buffer is required");
  if (!arweave) {
    if (!this.arweave)
      throw new Error("Arweave is required");
    arweave = this.arweave;
  }
  if (!wallet) {
    if (this.wallet)
      wallet = this.wallet;
  }
  const { root: rootCID } = await Transaction.load(buffer);
  const { cid: carCid } = await encode$3(buffer);
  let tx = await arweave.createTransaction({ data: buffer });
  tags.push({ name: "App-Name", value: [AR_DAG] });
  tags.push({ name: "Root-CID", value: [rootCID.toString()] });
  tags.push({ name: "CAR-CID", value: [carCid.toString()] });
  if (tags && tags.length) {
    for (const tag of tags) {
      tx.addTag(tag.name.toString(), tag.value.toString());
    }
  }
  await arweave.transactions.sign(tx, wallet);
  await this.post(tx);
  return rootCID;
}
async function load({ dagOwner, dag, arweave = null }) {
  if (!dagOwner)
    throw new Error("dagOwner is required");
  if (!dag) {
    if (!this.dag)
      throw new Error("DagRepo is required");
    dag = this.dag;
  }
  if (!arweave) {
    if (!this.arweave)
      throw new Error("Arweave is required");
    arweave = this.arweave;
  }
  const searchTags = [{ name: "App-Name", values: [AR_DAG] }];
  let txs = null;
  try {
    txs = await getOwnerArDag({ arweave, searchTags, dagOwner });
  } catch (error) {
    console.log("ArDag get failed", error);
  }
  let rootCID;
  const importer = async (dag2, tx) => {
    try {
      const data2 = await getData({ arweave, txid: tx.id });
      const cid = await importBuffer(dag2, data2);
      if (!rootCID)
        rootCID = cid;
      if (dag2.hasOwnProperty("rootCID") && !(dag2 == null ? void 0 : dag2.rootCID))
        dag2.rootCID = cid;
    } catch (error) {
      console.log("Import failed", error);
    }
  };
  for (const tx of txs) {
    await importer(dag, tx);
  }
  return rootCID;
}
async function get({ dagOwner, tag = null, arweave = null, cid = null }) {
  if (!dagOwner)
    throw new Error("dagOwner is required");
  if (!arweave) {
    if (!this.arweave) {
      const Arweave = require("arweave").default;
      arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 2e4,
        logging: false
      });
    } else {
      arweave = this.arweave;
    }
  }
  const searchTags = [{ name: "App-Name", values: [AR_DAG] }];
  let txs = null;
  try {
    txs = await getOwnerArDag({ arweave, searchTags, dagOwner });
  } catch (error) {
    console.log("ArDag get failed", error);
  }
  if (!txs)
    return null;
  let latest2;
  let latestCID = cid;
  while (!latest2 && txs.length) {
    let data2;
    let txid = txs.shift().id;
    try {
      data2 = await getData({ arweave, txid });
    } catch (error) {
      console.log("get Data txid failed", { txid }, error);
      if (!data2)
        continue;
    }
    const { root, get: get2 } = await Transaction.load(data2);
    const rootNode = await get2(root);
    if (!tag && !cid)
      return rootNode;
    if (tag && rootNode.hasOwnProperty(tag) && !latestCID)
      latestCID = rootNode[tag].obj;
    try {
      latest2 = await get2(latestCID);
    } catch (error) {
    }
  }
  return latest2;
}
async function latest(tag) {
  const res = await this.dag.get(this.rootCID, { path: `/${tag}/obj` });
  return res.value;
}
async function getInstance({
  dag,
  wallet = null,
  dagOwner = false
}) {
  if (!dag)
    throw new Error("Supply a DagRepo from https://github.com/DougAnderson444/ipld-car-txs");
  if (!dagOwner) {
    dagOwner = await this.arweave.wallets.jwkToAddress(wallet);
  } else {
    this.rootCID = await this.load({ dag, dagOwner });
  }
  return {
    arweave: this.arweave,
    post: this.post,
    dagOwner,
    wallet,
    dag,
    load,
    rootCID: this.rootCID || null,
    latest,
    persist,
    async save(tag, obj, { tags } = { tags: [] }) {
      const rootCID = await this.dag.tx.add(tag, obj);
      this.rootCID = rootCID;
      const buffer = await this.dag.tx.commit();
      await this.persist({ buffer, tags });
      return rootCID;
    }
  };
}
function initializeArDag({ arweave, post = null }) {
  if (!arweave)
    throw new Error("Arweave instance must be provided");
  const doPost = arweave.transactions.post;
  const boundPost = doPost.bind(arweave.transactions);
  return {
    arweave,
    post: post || boundPost,
    getData,
    getInstance,
    persist,
    get,
    load
  };
}
async function getData({ arweave = null, txid }) {
  if (!txid)
    throw new Error("txid is required");
  if (!arweave) {
    if (!this.arweave)
      throw new Error("Arweave is required");
    arweave = this.arweave;
  }
  try {
    let result = await arweave.api.get(`/${txid}`, { responseType: "arraybuffer" });
    if (result.status >= 200 && result.status < 300) {
      return new Uint8Array(result.data);
    }
  } catch (error) {
    console.log("get Data failed", { txid }, error);
  }
}
export {
  get,
  initializeArDag,
  load,
  persist
};
//# sourceMappingURL=index-f5af3a35.js.map
