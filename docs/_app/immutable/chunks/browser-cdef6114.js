import { b as buffer } from "./index-4cd244b0.js";
import { e as eventsExports } from "./events-76efbe50.js";
import { c as commonjsGlobal } from "./_page-a9965d2d.js";
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise;
var queueMicrotask_1 = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : commonjsGlobal) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
  throw err;
}, 0));
var browser = {};
var browserLevel = {};
var abstractLevel$1 = {};
var abstractLevel = {};
var levelSupports = {};
levelSupports.supports = function supports(...manifests) {
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
var moduleError = class ModuleError extends Error {
  /**
   * @param {string} message Error message
   * @param {{ code?: string, cause?: Error, expected?: boolean, transient?: boolean }} [options]
   */
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
let Encoding$2 = class Encoding {
  /**
   * @param {IEncoding<TIn,TFormat,TOut>} options
   */
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
    return (
      /** @type {string} */
      this.name.split("+")[0]
    );
  }
  /** @return {BufferFormat<TIn,TOut>} */
  createBufferTranscoder() {
    throw new ModuleError$8(`Encoding '${this.name}' cannot be transcoded to 'buffer'`, {
      code: "LEVEL_ENCODING_NOT_SUPPORTED"
    });
  }
  /** @return {ViewFormat<TIn,TOut>} */
  createViewTranscoder() {
    throw new ModuleError$8(`Encoding '${this.name}' cannot be transcoded to 'view'`, {
      code: "LEVEL_ENCODING_NOT_SUPPORTED"
    });
  }
  /** @return {UTF8Format<TIn,TOut>} */
  createUTF8Transcoder() {
    throw new ModuleError$8(`Encoding '${this.name}' cannot be transcoded to 'utf8'`, {
      code: "LEVEL_ENCODING_NOT_SUPPORTED"
    });
  }
};
encoding.Encoding = Encoding$2;
const { Buffer: Buffer$1 } = buffer || {};
const { Encoding: Encoding$1 } = encoding;
const textEndec = textEndec$1;
let BufferFormat$2 = class BufferFormat extends Encoding$1 {
  /**
   * @param {Omit<IEncoding<TIn, Buffer, TOut>, 'format'>} options
   */
  constructor(options) {
    super({ ...options, format: "buffer" });
  }
  /** @override */
  createViewTranscoder() {
    return new ViewFormat$2({
      encode: this.encode,
      // Buffer is a view (UInt8Array)
      decode: (data) => this.decode(
        Buffer$1.from(data.buffer, data.byteOffset, data.byteLength)
      ),
      name: `${this.name}+view`
    });
  }
  /** @override */
  createBufferTranscoder() {
    return this;
  }
};
let ViewFormat$2 = class ViewFormat extends Encoding$1 {
  /**
   * @param {Omit<IEncoding<TIn, Uint8Array, TOut>, 'format'>} options
   */
  constructor(options) {
    super({ ...options, format: "view" });
  }
  /** @override */
  createBufferTranscoder() {
    return new BufferFormat$2({
      encode: (data) => {
        const view = this.encode(data);
        return Buffer$1.from(view.buffer, view.byteOffset, view.byteLength);
      },
      decode: this.decode,
      // Buffer is a view (UInt8Array)
      name: `${this.name}+buffer`
    });
  }
  /** @override */
  createViewTranscoder() {
    return this;
  }
};
let UTF8Format$2 = class UTF8Format extends Encoding$1 {
  /**
   * @param {Omit<IEncoding<TIn, string, TOut>, 'format'>} options
   */
  constructor(options) {
    super({ ...options, format: "utf8" });
  }
  /** @override */
  createBufferTranscoder() {
    return new BufferFormat$2({
      encode: (data) => Buffer$1.from(this.encode(data), "utf8"),
      decode: (data) => this.decode(data.toString("utf8")),
      name: `${this.name}+buffer`
    });
  }
  /** @override */
  createViewTranscoder() {
    const { textEncoder: textEncoder2, textDecoder: textDecoder2 } = textEndec();
    return new ViewFormat$2({
      encode: (data) => textEncoder2.encode(this.encode(data)),
      decode: (data) => this.decode(textDecoder2.decode(data)),
      name: `${this.name}+view`
    });
  }
  /** @override */
  createUTF8Transcoder() {
    return this;
  }
};
formats$2.BufferFormat = BufferFormat$2;
formats$2.ViewFormat = ViewFormat$2;
formats$2.UTF8Format = UTF8Format$2;
const { Buffer } = buffer || { Buffer: { isBuffer: () => false } };
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
const { Encoding: Encoding2 } = encoding;
const { BufferFormat: BufferFormat2, ViewFormat: ViewFormat2, UTF8Format: UTF8Format2 } = formats$2;
const kFormats = Symbol("formats");
const kEncodings = Symbol("encodings");
const validFormats = /* @__PURE__ */ new Set(["buffer", "view", "utf8"]);
let Transcoder$1 = class Transcoder {
  /**
   * @param {Array<'buffer'|'view'|'utf8'>} formats
   */
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
  /**
   * @returns {Array<Encoding<any,T,any>>}
   */
  encodings() {
    return Array.from(new Set(this[kEncodings].values()));
  }
  /**
   * @param {string|MixedEncoding<any, any, any>} encoding
   * @returns {Encoding<any, T, any>}
   */
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
        resolved = from(encoding2);
      }
      const { name, format } = resolved;
      if (!this[kFormats].has(format)) {
        if (this[kFormats].has("view")) {
          resolved = resolved.createViewTranscoder();
        } else if (this[kFormats].has("buffer")) {
          resolved = resolved.createBufferTranscoder();
        } else if (this[kFormats].has("utf8")) {
          resolved = resolved.createUTF8Transcoder();
        } else {
          throw new ModuleError$7(`Encoding '${name}' cannot be transcoded`, {
            code: "LEVEL_ENCODING_NOT_SUPPORTED"
          });
        }
      }
      for (const k of [encoding2, name, resolved.name, resolved.commonName]) {
        this[kEncodings].set(k, resolved);
      }
    }
    return resolved;
  }
};
levelTranscoder.Transcoder = Transcoder$1;
function from(options) {
  if (options instanceof Encoding2) {
    return options;
  }
  const maybeType = "type" in options && typeof options.type === "string" ? options.type : void 0;
  const name = options.name || maybeType || `anonymous-${anonymousCount++}`;
  switch (detectFormat(options)) {
    case "view":
      return new ViewFormat2({ ...options, name });
    case "utf8":
      return new UTF8Format2({ ...options, name });
    case "buffer":
      return new BufferFormat2({ ...options, name });
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
catering.fromCallback = function(callback, symbol) {
  if (callback === void 0) {
    var promise2 = new Promise(function(resolve, reject) {
      callback = function(err, res) {
        if (err)
          reject(err);
        else
          resolve(res);
      };
    });
    callback[symbol !== void 0 ? symbol : "promise"] = promise2;
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
let AbstractIterator$3 = class AbstractIterator extends CommonIterator {
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
};
let AbstractKeyIterator$2 = class AbstractKeyIterator extends CommonIterator {
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
};
let AbstractValueIterator$2 = class AbstractValueIterator extends CommonIterator {
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
};
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
let DefaultKeyIterator$1 = class DefaultKeyIterator extends AbstractKeyIterator$1 {
  constructor(db, options) {
    super(db, options);
    this[kIterator] = db.iterator({ ...options, keys: true, values: false });
    this[kHandleOne] = this[kHandleOne].bind(this);
    this[kHandleMany] = this[kHandleMany].bind(this);
  }
};
let DefaultValueIterator$1 = class DefaultValueIterator extends AbstractValueIterator$1 {
  constructor(db, options) {
    super(db, options);
    this[kIterator] = db.iterator({ ...options, keys: false, values: true });
    this[kHandleOne] = this[kHandleOne].bind(this);
    this[kHandleMany] = this[kHandleMany].bind(this);
  }
};
for (const Iterator3 of [DefaultKeyIterator$1, DefaultValueIterator$1]) {
  const keys = Iterator3 === DefaultKeyIterator$1;
  const mapEntry = keys ? (entry) => entry[0] : (entry) => entry[1];
  Iterator3.prototype._next = function(callback) {
    this[kCallback] = callback;
    this[kIterator].next(this[kHandleOne]);
  };
  Iterator3.prototype[kHandleOne] = function(err, key, value) {
    const callback = this[kCallback];
    if (err)
      callback(err);
    else
      callback(null, keys ? key : value);
  };
  Iterator3.prototype._nextv = function(size, options, callback) {
    this[kCallback] = callback;
    this[kIterator].nextv(size, options, this[kHandleMany]);
  };
  Iterator3.prototype._all = function(options, callback) {
    this[kCallback] = callback;
    this[kIterator].all(options, this[kHandleMany]);
  };
  Iterator3.prototype[kHandleMany] = function(err, entries) {
    const callback = this[kCallback];
    if (err)
      callback(err);
    else
      callback(null, entries.map(mapEntry));
  };
  Iterator3.prototype._seek = function(target, options) {
    this[kIterator].seek(target, options);
  };
  Iterator3.prototype._close = function(callback) {
    this[kIterator].close(callback);
  };
}
defaultKvIterator.DefaultKeyIterator = DefaultKeyIterator$1;
defaultKvIterator.DefaultValueIterator = DefaultValueIterator$1;
var deferredIterator = {};
const { AbstractIterator: AbstractIterator$2, AbstractKeyIterator: AbstractKeyIterator2, AbstractValueIterator: AbstractValueIterator2 } = abstractIterator;
const ModuleError$5 = moduleError;
const kNut = Symbol("nut");
const kUndefer$1 = Symbol("undefer");
const kFactory = Symbol("factory");
let DeferredIterator$1 = class DeferredIterator extends AbstractIterator$2 {
  constructor(db, options) {
    super(db, options);
    this[kNut] = null;
    this[kFactory] = () => db.iterator(options);
    this.db.defer(() => this[kUndefer$1]());
  }
};
let DeferredKeyIterator$1 = class DeferredKeyIterator extends AbstractKeyIterator2 {
  constructor(db, options) {
    super(db, options);
    this[kNut] = null;
    this[kFactory] = () => db.keys(options);
    this.db.defer(() => this[kUndefer$1]());
  }
};
let DeferredValueIterator$1 = class DeferredValueIterator extends AbstractValueIterator2 {
  constructor(db, options) {
    super(db, options);
    this[kNut] = null;
    this[kFactory] = () => db.values(options);
    this.db.defer(() => this[kUndefer$1]());
  }
};
for (const Iterator3 of [DeferredIterator$1, DeferredKeyIterator$1, DeferredValueIterator$1]) {
  Iterator3.prototype[kUndefer$1] = function() {
    if (this.db.status === "open") {
      this[kNut] = this[kFactory]();
    }
  };
  Iterator3.prototype._next = function(callback) {
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
  Iterator3.prototype._nextv = function(size, options, callback) {
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
  Iterator3.prototype._all = function(options, callback) {
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
  Iterator3.prototype._seek = function(target, options) {
    if (this[kNut] !== null) {
      this[kNut]._seek(target, options);
    } else if (this.db.status === "opening") {
      this.db.defer(() => this._seek(target, options));
    }
  };
  Iterator3.prototype._close = function(callback) {
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
let AbstractChainedBatch$1 = class AbstractChainedBatch {
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
};
abstractChainedBatch.AbstractChainedBatch = AbstractChainedBatch$1;
const { AbstractChainedBatch: AbstractChainedBatch2 } = abstractChainedBatch;
const ModuleError$3 = moduleError;
const kEncoded = Symbol("encoded");
let DefaultChainedBatch$1 = class DefaultChainedBatch extends AbstractChainedBatch2 {
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
  // Assumes this[kEncoded] cannot change after write()
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
};
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
  const { AbstractIterator: AbstractIterator3, AbstractKeyIterator: AbstractKeyIterator3, AbstractValueIterator: AbstractValueIterator3 } = abstractIterator;
  const kUnfix = Symbol("unfix");
  const kIterator2 = Symbol("iterator");
  const kHandleOne2 = Symbol("handleOne");
  const kHandleMany2 = Symbol("handleMany");
  const kCallback2 = Symbol("callback");
  class AbstractSublevelIterator extends AbstractIterator3 {
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
  class AbstractSublevelKeyIterator extends AbstractKeyIterator3 {
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
  class AbstractSublevelValueIterator extends AbstractValueIterator3 {
    constructor(db, options, iterator2) {
      super(db, options);
      this[kIterator2] = iterator2;
    }
  }
  for (const Iterator3 of [AbstractSublevelIterator, AbstractSublevelKeyIterator]) {
    Iterator3.prototype._next = function(callback) {
      this[kCallback2] = callback;
      this[kIterator2].next(this[kHandleOne2]);
    };
    Iterator3.prototype._nextv = function(size, options, callback) {
      this[kCallback2] = callback;
      this[kIterator2].nextv(size, options, this[kHandleMany2]);
    };
    Iterator3.prototype._all = function(options, callback) {
      this[kCallback2] = callback;
      this[kIterator2].all(options, this[kHandleMany2]);
    };
  }
  for (const Iterator3 of [AbstractSublevelValueIterator]) {
    Iterator3.prototype._next = function(callback) {
      this[kIterator2].next(callback);
    };
    Iterator3.prototype._nextv = function(size, options, callback) {
      this[kIterator2].nextv(size, options, callback);
    };
    Iterator3.prototype._all = function(options, callback) {
      this[kIterator2].all(options, callback);
    };
  }
  for (const Iterator3 of [AbstractSublevelIterator, AbstractSublevelKeyIterator, AbstractSublevelValueIterator]) {
    Iterator3.prototype._seek = function(target, options) {
      this[kIterator2].seek(target, options);
    };
    Iterator3.prototype._close = function(callback) {
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
  const { Buffer: Buffer2 } = buffer || {};
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
  abstractSublevel = function({ AbstractLevel: AbstractLevel3 }) {
    class AbstractSublevel2 extends AbstractLevel3 {
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
      // TODO: add autoClose option, which if true, does parent.attachResource(this)
      constructor(db, name, options) {
        const { separator, manifest, ...forward } = AbstractSublevel2.defaults(options);
        name = trim(name, separator);
        const reserved = separator.charCodeAt(0) + 1;
        const parent = db[kParent] || db;
        if (!textEncoder2.encode(name).every((x) => x > reserved && x < 127)) {
          throw new ModuleError3(`Prefix must use bytes > ${reserved} < ${127}`, {
            code: "LEVEL_INVALID_PREFIX"
          });
        }
        super(mergeManifests(parent, manifest), forward);
        const prefix = (db.prefix || "") + separator + name + separator;
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
      // Not exposed for now.
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
      // Inherit manifest of parent db
      ...parent.supports,
      // Disable unsupported features
      createIfMissing: false,
      errorIfExists: false,
      // Unset additional events because we're not forwarding them
      events: {},
      // Unset additional methods (like approximateSize) which we can't support here unless
      // the AbstractSublevel class is overridden by an implementation of `abstract-level`.
      additionalMethods: {},
      // Inherit manifest of custom AbstractSublevel subclass. Such a class is not
      // allowed to override encodings.
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
    let end = str.length;
    while (start < end && str[start] === char)
      start++;
    while (end > start && str[end - 1] === char)
      end--;
    return str.slice(start, end);
  };
  return abstractSublevel;
}
const { supports: supports2 } = levelSupports;
const { Transcoder: Transcoder2 } = levelTranscoder;
const { EventEmitter } = eventsExports;
const { fromCallback: fromCallback$1 } = catering;
const ModuleError$1 = moduleError;
const { AbstractIterator: AbstractIterator$1 } = abstractIterator;
const { DefaultKeyIterator: DefaultKeyIterator2, DefaultValueIterator: DefaultValueIterator2 } = defaultKvIterator;
const { DeferredIterator: DeferredIterator2, DeferredKeyIterator: DeferredKeyIterator2, DeferredValueIterator: DeferredValueIterator2 } = deferredIterator;
const { DefaultChainedBatch: DefaultChainedBatch2 } = defaultChainedBatch;
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
let AbstractLevel$1 = class AbstractLevel extends EventEmitter {
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
    this.supports = supports2(manifest, {
      status: true,
      promises: true,
      clear: true,
      getMany: true,
      deferredOpen: true,
      // TODO (next major): add seek
      snapshots: manifest.snapshots !== false,
      permanence: manifest.permanence !== false,
      // TODO: remove from level-supports because it's always supported
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
    this[kTranscoder] = new Transcoder2(formats(this));
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
        return new DefaultChainedBatch2(this);
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
  sublevel(name, options) {
    return this._sublevel(name, AbstractSublevel.defaults(options));
  }
  _sublevel(name, options) {
    return new AbstractSublevel(this, name, options);
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
      return new DeferredIterator2(this, options);
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
      return new DeferredKeyIterator2(this, options);
    } else if (this[kStatus] !== "open") {
      throw new ModuleError$1("Database is not open", {
        code: "LEVEL_DATABASE_NOT_OPEN"
      });
    }
    return this._keys(options);
  }
  _keys(options) {
    return new DefaultKeyIterator2(this, options);
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
      return new DeferredValueIterator2(this, options);
    } else if (this[kStatus] !== "open") {
      throw new ModuleError$1("Database is not open", {
        code: "LEVEL_DATABASE_NOT_OPEN"
      });
    }
    return this._values(options);
  }
  _values(options) {
    return new DefaultValueIterator2(this, options);
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
  // TODO: docs and types
  attachResource(resource) {
    if (typeof resource !== "object" || resource === null || typeof resource.close !== "function") {
      throw new TypeError("The first argument must be a resource object");
    }
    this[kResources].add(resource);
  }
  // TODO: docs and types
  detachResource(resource) {
    this[kResources].delete(resource);
  }
  _chainedBatch() {
    return new DefaultChainedBatch2(this);
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
};
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
    function end() {
      if (cb)
        cb(err, results);
      cb = null;
    }
    if (isSync)
      queueMicrotask$1(end);
    else
      end();
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
var keyRange = function createKeyRange(options) {
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
const { AbstractIterator: AbstractIterator2 } = abstractLevel$1;
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
let Iterator$1 = class Iterator extends AbstractIterator2 {
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
  // Note: if called by _all() then size can be Infinity. This is an internal
  // detail; by design AbstractIterator.nextv() does not support Infinity.
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
        const length = Math.max(keys.length, values.length);
        if (length === 0 || size === Infinity) {
          this[kFinished] = true;
        } else {
          this[kPosition] = keys[length - 1];
        }
        entries.length = length;
        for (let i = 0; i < length; i++) {
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
};
iterator.Iterator = Iterator$1;
function maybeCommit(transaction) {
  if (typeof transaction.commit === "function") {
    transaction.commit();
  }
}
var clear$1 = function clear(db, location, keyRange2, options, callback) {
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
const { AbstractLevel: AbstractLevel2 } = abstractLevel$1;
const ModuleError2 = moduleError;
const parallel = runParallelLimit_1;
const { fromCallback } = catering;
const { Iterator: Iterator2 } = iterator;
const deserialize = deserialize$2;
const clear2 = clear$1;
const createKeyRange2 = keyRange;
const DEFAULT_PREFIX = "level-js-";
const kIDB = Symbol("idb");
const kNamePrefix = Symbol("namePrefix");
const kLocation = Symbol("location");
const kVersion = Symbol("version");
const kStore = Symbol("store");
const kOnComplete = Symbol("onComplete");
const kPromise = Symbol("promise");
class BrowserLevel extends AbstractLevel2 {
  constructor(location, options, _) {
    if (typeof options === "function" || typeof _ === "function") {
      throw new ModuleError2("The levelup-style callback argument has been removed", {
        code: "LEVEL_LEGACY"
      });
    }
    const { prefix, version, ...forward } = options || {};
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
    this[kVersion] = parseInt(version || 1, 10);
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
  // Exposed for backwards compat and unit tests
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
        return callback(new ModuleError2("Entry not found", {
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
  // TODO: implement key and value iterators
  _iterator(options) {
    return new Iterator2(this, this[kLocation], options);
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
      keyRange2 = createKeyRange2(options);
    } catch (e) {
      return this.nextTick(callback);
    }
    if (options.limit >= 0) {
      return clear2(this, this[kLocation], keyRange2, options, callback);
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
var Level = browser.Level = browserLevel.BrowserLevel;
export {
  Level as L,
  abstractLevel$1 as a,
  browser as b,
  moduleError as m,
  queueMicrotask_1 as q
};
//# sourceMappingURL=browser-cdef6114.js.map
