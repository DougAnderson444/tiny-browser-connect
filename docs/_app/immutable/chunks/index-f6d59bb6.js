import { c as commonjsGlobal, h as getDefaultExportFromCjs } from "./_page-a9965d2d.js";
import { b as bignumberExports, r as requireUtil } from "./bignumber-bfee6961.js";
import { b as base64Js } from "./index-9d4233a1.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var web = {};
var common = {};
var ar = {};
Object.defineProperty(ar, "__esModule", { value: true });
const bignumber_js_1 = bignumberExports;
class Ar {
  constructor() {
    this.BigNum = (value, decimals) => {
      let instance = bignumber_js_1.BigNumber.clone({ DECIMAL_PLACES: decimals });
      return new instance(value);
    };
  }
  winstonToAr(winstonString, { formatted = false, decimals = 12, trim = true } = {}) {
    let number = this.stringToBigNum(winstonString, decimals).shiftedBy(-12);
    return formatted ? number.toFormat(decimals) : number.toFixed(decimals);
  }
  arToWinston(arString, { formatted = false } = {}) {
    let number = this.stringToBigNum(arString).shiftedBy(12);
    return formatted ? number.toFormat() : number.toFixed(0);
  }
  compare(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.comparedTo(b);
  }
  isEqual(winstonStringA, winstonStringB) {
    return this.compare(winstonStringA, winstonStringB) === 0;
  }
  isLessThan(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.isLessThan(b);
  }
  isGreaterThan(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    let b = this.stringToBigNum(winstonStringB);
    return a.isGreaterThan(b);
  }
  add(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    this.stringToBigNum(winstonStringB);
    return a.plus(winstonStringB).toFixed(0);
  }
  sub(winstonStringA, winstonStringB) {
    let a = this.stringToBigNum(winstonStringA);
    this.stringToBigNum(winstonStringB);
    return a.minus(winstonStringB).toFixed(0);
  }
  stringToBigNum(stringValue, decimalPlaces = 12) {
    return this.BigNum(stringValue, decimalPlaces);
  }
}
ar.default = Ar;
var api = {};
Object.defineProperty(api, "__esModule", { value: true });
class Api {
  constructor(config) {
    this.METHOD_GET = "GET";
    this.METHOD_POST = "POST";
    this.applyConfig(config);
  }
  applyConfig(config) {
    this.config = this.mergeDefaults(config);
  }
  getConfig() {
    return this.config;
  }
  mergeDefaults(config) {
    const protocol = config.protocol || "http";
    const port = config.port || (protocol === "https" ? 443 : 80);
    return {
      host: config.host || "127.0.0.1",
      protocol,
      port,
      timeout: config.timeout || 2e4,
      logging: config.logging || false,
      logger: config.logger || console.log,
      network: config.network
    };
  }
  async get(endpoint, config) {
    return await this.request(endpoint, Object.assign(Object.assign({}, config), { method: this.METHOD_GET }));
  }
  async post(endpoint, body, config) {
    const headers = new Headers((config === null || config === void 0 ? void 0 : config.headers) || {});
    headers.append("content-type", "application/json");
    headers.append("accept", "application/json, text/plain, */*");
    return await this.request(endpoint, Object.assign(Object.assign({}, config), { method: this.METHOD_POST, body: JSON.stringify(body), headers }));
  }
  async request(endpoint, init) {
    const headers = new Headers((init === null || init === void 0 ? void 0 : init.headers) || {});
    const baseURL = `${this.config.protocol}://${this.config.host}:${this.config.port}`;
    if (endpoint.startsWith("/")) {
      endpoint = endpoint.replace("/", "");
    }
    if (this.config.network) {
      headers.append("x-network", this.config.network);
    }
    if (this.config.logging) {
      this.config.logger(`Requesting: ${baseURL}/${endpoint}`);
    }
    let res = await fetch(`${baseURL}/${endpoint}`, Object.assign(Object.assign({}, init || {}), { headers }));
    if (this.config.logging) {
      this.config.logger(`Response:   ${res.url} - ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    const response = res;
    if (contentType === null || contentType === void 0 ? void 0 : contentType.startsWith("application/json")) {
      response.data = await res.clone().json();
    } else {
      try {
        response.data = await res.clone().text();
      } catch (_a) {
        response.data = await res.clone().arrayBuffer();
      }
    }
    return response;
  }
}
api.default = Api;
var webcryptoDriver = {};
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.b64UrlDecode = utils.b64UrlEncode = utils.bufferTob64Url = utils.bufferTob64 = utils.b64UrlToBuffer = utils.stringToB64Url = utils.stringToBuffer = utils.bufferToString = utils.b64UrlToString = utils.concatBuffers = void 0;
const B64js = base64Js;
function concatBuffers(buffers) {
  let total_length = 0;
  for (let i = 0; i < buffers.length; i++) {
    total_length += buffers[i].byteLength;
  }
  let temp = new Uint8Array(total_length);
  let offset = 0;
  temp.set(new Uint8Array(buffers[0]), offset);
  offset += buffers[0].byteLength;
  for (let i = 1; i < buffers.length; i++) {
    temp.set(new Uint8Array(buffers[i]), offset);
    offset += buffers[i].byteLength;
  }
  return temp;
}
utils.concatBuffers = concatBuffers;
function b64UrlToString(b64UrlString) {
  let buffer = b64UrlToBuffer(b64UrlString);
  return bufferToString(buffer);
}
utils.b64UrlToString = b64UrlToString;
function bufferToString(buffer) {
  if (typeof TextDecoder == "undefined") {
    const TextDecoder2 = requireUtil().TextDecoder;
    return new TextDecoder2("utf-8", { fatal: true }).decode(buffer);
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
}
utils.bufferToString = bufferToString;
function stringToBuffer(string) {
  if (typeof TextEncoder == "undefined") {
    const TextEncoder2 = requireUtil().TextEncoder;
    return new TextEncoder2().encode(string);
  }
  return new TextEncoder().encode(string);
}
utils.stringToBuffer = stringToBuffer;
function stringToB64Url(string) {
  return bufferTob64Url(stringToBuffer(string));
}
utils.stringToB64Url = stringToB64Url;
function b64UrlToBuffer(b64UrlString) {
  return new Uint8Array(B64js.toByteArray(b64UrlDecode(b64UrlString)));
}
utils.b64UrlToBuffer = b64UrlToBuffer;
function bufferTob64(buffer) {
  return B64js.fromByteArray(new Uint8Array(buffer));
}
utils.bufferTob64 = bufferTob64;
function bufferTob64Url(buffer) {
  return b64UrlEncode(bufferTob64(buffer));
}
utils.bufferTob64Url = bufferTob64Url;
function b64UrlEncode(b64UrlString) {
  return b64UrlString.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
}
utils.b64UrlEncode = b64UrlEncode;
function b64UrlDecode(b64UrlString) {
  b64UrlString = b64UrlString.replace(/\-/g, "+").replace(/\_/g, "/");
  let padding;
  b64UrlString.length % 4 == 0 ? padding = 0 : padding = 4 - b64UrlString.length % 4;
  return b64UrlString.concat("=".repeat(padding));
}
utils.b64UrlDecode = b64UrlDecode;
Object.defineProperty(webcryptoDriver, "__esModule", { value: true });
const ArweaveUtils$3 = utils;
class WebCryptoDriver {
  constructor() {
    this.keyLength = 4096;
    this.publicExponent = 65537;
    this.hashAlgorithm = "sha256";
    if (!this.detectWebCrypto()) {
      throw new Error("SubtleCrypto not available!");
    }
    this.driver = crypto.subtle;
  }
  async generateJWK() {
    let cryptoKey = await this.driver.generateKey({
      name: "RSA-PSS",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: {
        name: "SHA-256"
      }
    }, true, ["sign"]);
    let jwk = await this.driver.exportKey("jwk", cryptoKey.privateKey);
    return {
      kty: jwk.kty,
      e: jwk.e,
      n: jwk.n,
      d: jwk.d,
      p: jwk.p,
      q: jwk.q,
      dp: jwk.dp,
      dq: jwk.dq,
      qi: jwk.qi
    };
  }
  async sign(jwk, data, { saltLength } = {}) {
    let signature = await this.driver.sign({
      name: "RSA-PSS",
      saltLength: 32
    }, await this.jwkToCryptoKey(jwk), data);
    return new Uint8Array(signature);
  }
  async hash(data, algorithm = "SHA-256") {
    let digest = await this.driver.digest(algorithm, data);
    return new Uint8Array(digest);
  }
  async verify(publicModulus, data, signature) {
    const publicKey = {
      kty: "RSA",
      e: "AQAB",
      n: publicModulus
    };
    const key = await this.jwkToPublicCryptoKey(publicKey);
    const digest = await this.driver.digest("SHA-256", data);
    const salt0 = await this.driver.verify({
      name: "RSA-PSS",
      saltLength: 0
    }, key, signature, data);
    const salt32 = await this.driver.verify({
      name: "RSA-PSS",
      saltLength: 32
    }, key, signature, data);
    const saltN = await this.driver.verify({
      name: "RSA-PSS",
      saltLength: Math.ceil((key.algorithm.modulusLength - 1) / 8) - digest.byteLength - 2
    }, key, signature, data);
    return salt0 || salt32 || saltN;
  }
  async jwkToCryptoKey(jwk) {
    return this.driver.importKey("jwk", jwk, {
      name: "RSA-PSS",
      hash: {
        name: "SHA-256"
      }
    }, false, ["sign"]);
  }
  async jwkToPublicCryptoKey(publicJwk) {
    return this.driver.importKey("jwk", publicJwk, {
      name: "RSA-PSS",
      hash: {
        name: "SHA-256"
      }
    }, false, ["verify"]);
  }
  detectWebCrypto() {
    if (typeof crypto === "undefined") {
      return false;
    }
    const subtle = crypto === null || crypto === void 0 ? void 0 : crypto.subtle;
    if (subtle === void 0) {
      return false;
    }
    const names = [
      "generateKey",
      "importKey",
      "exportKey",
      "digest",
      "sign"
    ];
    return names.every((name) => typeof subtle[name] === "function");
  }
  async encrypt(data, key, salt) {
    const initialKey = await this.driver.importKey("raw", typeof key == "string" ? ArweaveUtils$3.stringToBuffer(key) : key, {
      name: "PBKDF2",
      length: 32
    }, false, ["deriveKey"]);
    const derivedkey = await this.driver.deriveKey({
      name: "PBKDF2",
      salt: salt ? ArweaveUtils$3.stringToBuffer(salt) : ArweaveUtils$3.stringToBuffer("salt"),
      iterations: 1e5,
      hash: "SHA-256"
    }, initialKey, {
      name: "AES-CBC",
      length: 256
    }, false, ["encrypt", "decrypt"]);
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);
    const encryptedData = await this.driver.encrypt({
      name: "AES-CBC",
      iv
    }, derivedkey, data);
    return ArweaveUtils$3.concatBuffers([iv, encryptedData]);
  }
  async decrypt(encrypted, key, salt) {
    const initialKey = await this.driver.importKey("raw", typeof key == "string" ? ArweaveUtils$3.stringToBuffer(key) : key, {
      name: "PBKDF2",
      length: 32
    }, false, ["deriveKey"]);
    const derivedkey = await this.driver.deriveKey({
      name: "PBKDF2",
      salt: salt ? ArweaveUtils$3.stringToBuffer(salt) : ArweaveUtils$3.stringToBuffer("salt"),
      iterations: 1e5,
      hash: "SHA-256"
    }, initialKey, {
      name: "AES-CBC",
      length: 256
    }, false, ["encrypt", "decrypt"]);
    const iv = encrypted.slice(0, 16);
    const data = await this.driver.decrypt({
      name: "AES-CBC",
      iv
    }, derivedkey, encrypted.slice(16));
    return ArweaveUtils$3.concatBuffers([data]);
  }
}
webcryptoDriver.default = WebCryptoDriver;
var network = {};
Object.defineProperty(network, "__esModule", { value: true });
class Network {
  constructor(api2) {
    this.api = api2;
  }
  getInfo() {
    return this.api.get(`info`).then((response) => {
      return response.data;
    });
  }
  getPeers() {
    return this.api.get(`peers`).then((response) => {
      return response.data;
    });
  }
}
network.default = Network;
var transactions = {};
var error = {};
Object.defineProperty(error, "__esModule", { value: true });
error.getError = void 0;
class ArweaveError extends Error {
  constructor(type, optional = {}) {
    if (optional.message) {
      super(optional.message);
    } else {
      super();
    }
    this.type = type;
    this.response = optional.response;
  }
  getType() {
    return this.type;
  }
}
error.default = ArweaveError;
function getError(resp) {
  let data = resp.data;
  if (typeof resp.data === "string") {
    try {
      data = JSON.parse(resp.data);
    } catch (e) {
    }
  }
  if (resp.data instanceof ArrayBuffer || resp.data instanceof Uint8Array) {
    try {
      data = JSON.parse(data.toString());
    } catch (e) {
    }
  }
  return data ? data.error || data : resp.statusText || "unknown";
}
error.getError = getError;
var transaction = {};
var deepHash = {};
var hasRequiredDeepHash;
function requireDeepHash() {
  if (hasRequiredDeepHash)
    return deepHash;
  hasRequiredDeepHash = 1;
  Object.defineProperty(deepHash, "__esModule", { value: true });
  const common_1 = requireCommon();
  async function deepHash$1(data) {
    if (Array.isArray(data)) {
      const tag2 = common_1.default.utils.concatBuffers([
        common_1.default.utils.stringToBuffer("list"),
        common_1.default.utils.stringToBuffer(data.length.toString())
      ]);
      return await deepHashChunks(data, await common_1.default.crypto.hash(tag2, "SHA-384"));
    }
    const tag = common_1.default.utils.concatBuffers([
      common_1.default.utils.stringToBuffer("blob"),
      common_1.default.utils.stringToBuffer(data.byteLength.toString())
    ]);
    const taggedHash = common_1.default.utils.concatBuffers([
      await common_1.default.crypto.hash(tag, "SHA-384"),
      await common_1.default.crypto.hash(data, "SHA-384")
    ]);
    return await common_1.default.crypto.hash(taggedHash, "SHA-384");
  }
  deepHash.default = deepHash$1;
  async function deepHashChunks(chunks2, acc) {
    if (chunks2.length < 1) {
      return acc;
    }
    const hashPair = common_1.default.utils.concatBuffers([
      acc,
      await deepHash$1(chunks2[0])
    ]);
    const newAcc = await common_1.default.crypto.hash(hashPair, "SHA-384");
    return await deepHashChunks(chunks2.slice(1), newAcc);
  }
  return deepHash;
}
var merkle = {};
var hasRequiredMerkle;
function requireMerkle() {
  if (hasRequiredMerkle)
    return merkle;
  hasRequiredMerkle = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.debug = exports.validatePath = exports.arrayCompare = exports.bufferToInt = exports.intToBuffer = exports.arrayFlatten = exports.generateProofs = exports.buildLayers = exports.generateTransactionChunks = exports.generateTree = exports.computeRootHash = exports.generateLeaves = exports.chunkData = exports.MIN_CHUNK_SIZE = exports.MAX_CHUNK_SIZE = void 0;
    const common_1 = requireCommon();
    const utils_1 = utils;
    exports.MAX_CHUNK_SIZE = 256 * 1024;
    exports.MIN_CHUNK_SIZE = 32 * 1024;
    const NOTE_SIZE = 32;
    const HASH_SIZE = 32;
    async function chunkData(data) {
      let chunks2 = [];
      let rest = data;
      let cursor = 0;
      while (rest.byteLength >= exports.MAX_CHUNK_SIZE) {
        let chunkSize = exports.MAX_CHUNK_SIZE;
        let nextChunkSize = rest.byteLength - exports.MAX_CHUNK_SIZE;
        if (nextChunkSize > 0 && nextChunkSize < exports.MIN_CHUNK_SIZE) {
          chunkSize = Math.ceil(rest.byteLength / 2);
        }
        const chunk = rest.slice(0, chunkSize);
        const dataHash = await common_1.default.crypto.hash(chunk);
        cursor += chunk.byteLength;
        chunks2.push({
          dataHash,
          minByteRange: cursor - chunk.byteLength,
          maxByteRange: cursor
        });
        rest = rest.slice(chunkSize);
      }
      chunks2.push({
        dataHash: await common_1.default.crypto.hash(rest),
        minByteRange: cursor,
        maxByteRange: cursor + rest.byteLength
      });
      return chunks2;
    }
    exports.chunkData = chunkData;
    async function generateLeaves(chunks2) {
      return Promise.all(chunks2.map(async ({ dataHash, minByteRange, maxByteRange }) => {
        return {
          type: "leaf",
          id: await hash(await Promise.all([hash(dataHash), hash(intToBuffer(maxByteRange))])),
          dataHash,
          minByteRange,
          maxByteRange
        };
      }));
    }
    exports.generateLeaves = generateLeaves;
    async function computeRootHash(data) {
      const rootNode = await generateTree(data);
      return rootNode.id;
    }
    exports.computeRootHash = computeRootHash;
    async function generateTree(data) {
      const rootNode = await buildLayers(await generateLeaves(await chunkData(data)));
      return rootNode;
    }
    exports.generateTree = generateTree;
    async function generateTransactionChunks(data) {
      const chunks2 = await chunkData(data);
      const leaves = await generateLeaves(chunks2);
      const root = await buildLayers(leaves);
      const proofs = await generateProofs(root);
      const lastChunk = chunks2.slice(-1)[0];
      if (lastChunk.maxByteRange - lastChunk.minByteRange === 0) {
        chunks2.splice(chunks2.length - 1, 1);
        proofs.splice(proofs.length - 1, 1);
      }
      return {
        data_root: root.id,
        chunks: chunks2,
        proofs
      };
    }
    exports.generateTransactionChunks = generateTransactionChunks;
    async function buildLayers(nodes, level = 0) {
      if (nodes.length < 2) {
        const root = nodes[0];
        return root;
      }
      const nextLayer = [];
      for (let i = 0; i < nodes.length; i += 2) {
        nextLayer.push(await hashBranch(nodes[i], nodes[i + 1]));
      }
      return buildLayers(nextLayer, level + 1);
    }
    exports.buildLayers = buildLayers;
    function generateProofs(root) {
      const proofs = resolveBranchProofs(root);
      if (!Array.isArray(proofs)) {
        return [proofs];
      }
      return arrayFlatten(proofs);
    }
    exports.generateProofs = generateProofs;
    function resolveBranchProofs(node, proof = new Uint8Array(), depth = 0) {
      if (node.type == "leaf") {
        return {
          offset: node.maxByteRange - 1,
          proof: (0, utils_1.concatBuffers)([
            proof,
            node.dataHash,
            intToBuffer(node.maxByteRange)
          ])
        };
      }
      if (node.type == "branch") {
        const partialProof = (0, utils_1.concatBuffers)([
          proof,
          node.leftChild.id,
          node.rightChild.id,
          intToBuffer(node.byteRange)
        ]);
        return [
          resolveBranchProofs(node.leftChild, partialProof, depth + 1),
          resolveBranchProofs(node.rightChild, partialProof, depth + 1)
        ];
      }
      throw new Error(`Unexpected node type`);
    }
    function arrayFlatten(input) {
      const flat = [];
      input.forEach((item) => {
        if (Array.isArray(item)) {
          flat.push(...arrayFlatten(item));
        } else {
          flat.push(item);
        }
      });
      return flat;
    }
    exports.arrayFlatten = arrayFlatten;
    async function hashBranch(left, right) {
      if (!right) {
        return left;
      }
      let branch = {
        type: "branch",
        id: await hash([
          await hash(left.id),
          await hash(right.id),
          await hash(intToBuffer(left.maxByteRange))
        ]),
        byteRange: left.maxByteRange,
        maxByteRange: right.maxByteRange,
        leftChild: left,
        rightChild: right
      };
      return branch;
    }
    async function hash(data) {
      if (Array.isArray(data)) {
        data = common_1.default.utils.concatBuffers(data);
      }
      return new Uint8Array(await common_1.default.crypto.hash(data));
    }
    function intToBuffer(note) {
      const buffer = new Uint8Array(NOTE_SIZE);
      for (var i = buffer.length - 1; i >= 0; i--) {
        var byte = note % 256;
        buffer[i] = byte;
        note = (note - byte) / 256;
      }
      return buffer;
    }
    exports.intToBuffer = intToBuffer;
    function bufferToInt(buffer) {
      let value = 0;
      for (var i = 0; i < buffer.length; i++) {
        value *= 256;
        value += buffer[i];
      }
      return value;
    }
    exports.bufferToInt = bufferToInt;
    const arrayCompare = (a, b) => a.every((value, index2) => b[index2] === value);
    exports.arrayCompare = arrayCompare;
    async function validatePath(id, dest, leftBound, rightBound, path) {
      if (rightBound <= 0) {
        return false;
      }
      if (dest >= rightBound) {
        return validatePath(id, 0, rightBound - 1, rightBound, path);
      }
      if (dest < 0) {
        return validatePath(id, 0, 0, rightBound, path);
      }
      if (path.length == HASH_SIZE + NOTE_SIZE) {
        const pathData = path.slice(0, HASH_SIZE);
        const endOffsetBuffer = path.slice(pathData.length, pathData.length + NOTE_SIZE);
        const pathDataHash = await hash([
          await hash(pathData),
          await hash(endOffsetBuffer)
        ]);
        let result = (0, exports.arrayCompare)(id, pathDataHash);
        if (result) {
          return {
            offset: rightBound - 1,
            leftBound,
            rightBound,
            chunkSize: rightBound - leftBound
          };
        }
        return false;
      }
      const left = path.slice(0, HASH_SIZE);
      const right = path.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = path.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = path.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      if ((0, exports.arrayCompare)(id, pathHash)) {
        if (dest < offset) {
          return await validatePath(left, dest, leftBound, Math.min(rightBound, offset), remainder);
        }
        return await validatePath(right, dest, Math.max(leftBound, offset), rightBound, remainder);
      }
      return false;
    }
    exports.validatePath = validatePath;
    async function debug(proof, output = "") {
      if (proof.byteLength < 1) {
        return output;
      }
      const left = proof.slice(0, HASH_SIZE);
      const right = proof.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = proof.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = proof.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      const updatedOutput = `${output}
${JSON.stringify(Buffer.from(left))},${JSON.stringify(Buffer.from(right))},${offset} => ${JSON.stringify(pathHash)}`;
      return debug(remainder, updatedOutput);
    }
    exports.debug = debug;
  })(merkle);
  return merkle;
}
var hasRequiredTransaction;
function requireTransaction() {
  if (hasRequiredTransaction)
    return transaction;
  hasRequiredTransaction = 1;
  Object.defineProperty(transaction, "__esModule", { value: true });
  transaction.Tag = void 0;
  const ArweaveUtils2 = utils;
  const deepHash_1 = requireDeepHash();
  const merkle_1 = requireMerkle();
  class BaseObject {
    get(field, options) {
      if (!Object.getOwnPropertyNames(this).includes(field)) {
        throw new Error(`Field "${field}" is not a property of the Arweave Transaction class.`);
      }
      if (this[field] instanceof Uint8Array) {
        if (options && options.decode && options.string) {
          return ArweaveUtils2.bufferToString(this[field]);
        }
        if (options && options.decode && !options.string) {
          return this[field];
        }
        return ArweaveUtils2.bufferTob64Url(this[field]);
      }
      if (options && options.decode == true) {
        if (options && options.string) {
          return ArweaveUtils2.b64UrlToString(this[field]);
        }
        return ArweaveUtils2.b64UrlToBuffer(this[field]);
      }
      return this[field];
    }
  }
  class Tag extends BaseObject {
    constructor(name, value, decode = false) {
      super();
      this.name = name;
      this.value = value;
    }
  }
  transaction.Tag = Tag;
  class Transaction extends BaseObject {
    constructor(attributes = {}) {
      super();
      this.format = 2;
      this.id = "";
      this.last_tx = "";
      this.owner = "";
      this.tags = [];
      this.target = "";
      this.quantity = "0";
      this.data_size = "0";
      this.data = new Uint8Array();
      this.data_root = "";
      this.reward = "0";
      this.signature = "";
      Object.assign(this, attributes);
      if (typeof this.data === "string") {
        this.data = ArweaveUtils2.b64UrlToBuffer(this.data);
      }
      if (attributes.tags) {
        this.tags = attributes.tags.map((tag) => {
          return new Tag(tag.name, tag.value);
        });
      }
    }
    addTag(name, value) {
      this.tags.push(new Tag(ArweaveUtils2.stringToB64Url(name), ArweaveUtils2.stringToB64Url(value)));
    }
    toJSON() {
      return {
        format: this.format,
        id: this.id,
        last_tx: this.last_tx,
        owner: this.owner,
        tags: this.tags,
        target: this.target,
        quantity: this.quantity,
        data: ArweaveUtils2.bufferTob64Url(this.data),
        data_size: this.data_size,
        data_root: this.data_root,
        data_tree: this.data_tree,
        reward: this.reward,
        signature: this.signature
      };
    }
    setOwner(owner) {
      this.owner = owner;
    }
    setSignature({ id, owner, reward, tags, signature }) {
      this.id = id;
      this.owner = owner;
      if (reward)
        this.reward = reward;
      if (tags)
        this.tags = tags;
      this.signature = signature;
    }
    async prepareChunks(data) {
      if (!this.chunks && data.byteLength > 0) {
        this.chunks = await (0, merkle_1.generateTransactionChunks)(data);
        this.data_root = ArweaveUtils2.bufferTob64Url(this.chunks.data_root);
      }
      if (!this.chunks && data.byteLength === 0) {
        this.chunks = {
          chunks: [],
          data_root: new Uint8Array(),
          proofs: []
        };
        this.data_root = "";
      }
    }
    // Returns a chunk in a format suitable for posting to /chunk.
    // Similar to `prepareChunks()` this does not operate `this.data`,
    // instead using the data passed in.
    getChunk(idx, data) {
      if (!this.chunks) {
        throw new Error(`Chunks have not been prepared`);
      }
      const proof = this.chunks.proofs[idx];
      const chunk = this.chunks.chunks[idx];
      return {
        data_root: this.data_root,
        data_size: this.data_size,
        data_path: ArweaveUtils2.bufferTob64Url(proof.proof),
        offset: proof.offset.toString(),
        chunk: ArweaveUtils2.bufferTob64Url(data.slice(chunk.minByteRange, chunk.maxByteRange))
      };
    }
    async getSignatureData() {
      switch (this.format) {
        case 1:
          let tags = this.tags.reduce((accumulator, tag) => {
            return ArweaveUtils2.concatBuffers([
              accumulator,
              tag.get("name", { decode: true, string: false }),
              tag.get("value", { decode: true, string: false })
            ]);
          }, new Uint8Array());
          return ArweaveUtils2.concatBuffers([
            this.get("owner", { decode: true, string: false }),
            this.get("target", { decode: true, string: false }),
            this.get("data", { decode: true, string: false }),
            ArweaveUtils2.stringToBuffer(this.quantity),
            ArweaveUtils2.stringToBuffer(this.reward),
            this.get("last_tx", { decode: true, string: false }),
            tags
          ]);
        case 2:
          if (!this.data_root) {
            await this.prepareChunks(this.data);
          }
          const tagList = this.tags.map((tag) => [
            tag.get("name", { decode: true, string: false }),
            tag.get("value", { decode: true, string: false })
          ]);
          return await (0, deepHash_1.default)([
            ArweaveUtils2.stringToBuffer(this.format.toString()),
            this.get("owner", { decode: true, string: false }),
            this.get("target", { decode: true, string: false }),
            ArweaveUtils2.stringToBuffer(this.quantity),
            ArweaveUtils2.stringToBuffer(this.reward),
            this.get("last_tx", { decode: true, string: false }),
            tagList,
            ArweaveUtils2.stringToBuffer(this.data_size),
            this.get("data_root", { decode: true, string: false })
          ]);
        default:
          throw new Error(`Unexpected transaction format: ${this.format}`);
      }
    }
  }
  transaction.default = Transaction;
  return transaction;
}
var transactionUploader = {};
var hasRequiredTransactionUploader;
function requireTransactionUploader() {
  if (hasRequiredTransactionUploader)
    return transactionUploader;
  hasRequiredTransactionUploader = 1;
  Object.defineProperty(transactionUploader, "__esModule", { value: true });
  transactionUploader.TransactionUploader = void 0;
  const transaction_1 = requireTransaction();
  const ArweaveUtils2 = utils;
  const error_12 = error;
  const merkle_1 = requireMerkle();
  const MAX_CHUNKS_IN_BODY = 1;
  const FATAL_CHUNK_UPLOAD_ERRORS = [
    "invalid_json",
    "chunk_too_big",
    "data_path_too_big",
    "offset_too_big",
    "data_size_too_big",
    "chunk_proof_ratio_not_attractive",
    "invalid_proof"
  ];
  const ERROR_DELAY = 1e3 * 40;
  class TransactionUploader {
    get isComplete() {
      return this.txPosted && this.chunkIndex === this.transaction.chunks.chunks.length;
    }
    get totalChunks() {
      return this.transaction.chunks.chunks.length;
    }
    get uploadedChunks() {
      return this.chunkIndex;
    }
    get pctComplete() {
      return Math.trunc(this.uploadedChunks / this.totalChunks * 100);
    }
    constructor(api2, transaction2) {
      this.api = api2;
      this.chunkIndex = 0;
      this.txPosted = false;
      this.lastRequestTimeEnd = 0;
      this.totalErrors = 0;
      this.lastResponseStatus = 0;
      this.lastResponseError = "";
      if (!transaction2.id) {
        throw new Error(`Transaction is not signed`);
      }
      if (!transaction2.chunks) {
        throw new Error(`Transaction chunks not prepared`);
      }
      this.data = transaction2.data;
      this.transaction = new transaction_1.default(Object.assign({}, transaction2, { data: new Uint8Array(0) }));
    }
    /**
     * Uploads the next part of the transaction.
     * On the first call this posts the transaction
     * itself and on any subsequent calls uploads the
     * next chunk until it completes.
     */
    async uploadChunk(chunkIndex_) {
      if (this.isComplete) {
        throw new Error(`Upload is already complete`);
      }
      if (this.lastResponseError !== "") {
        this.totalErrors++;
      } else {
        this.totalErrors = 0;
      }
      if (this.totalErrors === 100) {
        throw new Error(`Unable to complete upload: ${this.lastResponseStatus}: ${this.lastResponseError}`);
      }
      let delay = this.lastResponseError === "" ? 0 : Math.max(this.lastRequestTimeEnd + ERROR_DELAY - Date.now(), ERROR_DELAY);
      if (delay > 0) {
        delay = delay - delay * Math.random() * 0.3;
        await new Promise((res) => setTimeout(res, delay));
      }
      this.lastResponseError = "";
      if (!this.txPosted) {
        await this.postTransaction();
        return;
      }
      if (chunkIndex_) {
        this.chunkIndex = chunkIndex_;
      }
      const chunk = this.transaction.getChunk(chunkIndex_ || this.chunkIndex, this.data);
      const chunkOk = await (0, merkle_1.validatePath)(this.transaction.chunks.data_root, parseInt(chunk.offset), 0, parseInt(chunk.data_size), ArweaveUtils2.b64UrlToBuffer(chunk.data_path));
      if (!chunkOk) {
        throw new Error(`Unable to validate chunk ${this.chunkIndex}`);
      }
      const resp = await this.api.post(`chunk`, this.transaction.getChunk(this.chunkIndex, this.data)).catch((e) => {
        console.error(e.message);
        return { status: -1, data: { error: e.message } };
      });
      this.lastRequestTimeEnd = Date.now();
      this.lastResponseStatus = resp.status;
      if (this.lastResponseStatus == 200) {
        this.chunkIndex++;
      } else {
        this.lastResponseError = (0, error_12.getError)(resp);
        if (FATAL_CHUNK_UPLOAD_ERRORS.includes(this.lastResponseError)) {
          throw new Error(`Fatal error uploading chunk ${this.chunkIndex}: ${this.lastResponseError}`);
        }
      }
    }
    /**
     * Reconstructs an upload from its serialized state and data.
     * Checks if data matches the expected data_root.
     *
     * @param serialized
     * @param data
     */
    static async fromSerialized(api2, serialized, data) {
      if (!serialized || typeof serialized.chunkIndex !== "number" || typeof serialized.transaction !== "object") {
        throw new Error(`Serialized object does not match expected format.`);
      }
      var transaction2 = new transaction_1.default(serialized.transaction);
      if (!transaction2.chunks) {
        await transaction2.prepareChunks(data);
      }
      const upload = new TransactionUploader(api2, transaction2);
      upload.chunkIndex = serialized.chunkIndex;
      upload.lastRequestTimeEnd = serialized.lastRequestTimeEnd;
      upload.lastResponseError = serialized.lastResponseError;
      upload.lastResponseStatus = serialized.lastResponseStatus;
      upload.txPosted = serialized.txPosted;
      upload.data = data;
      if (upload.transaction.data_root !== serialized.transaction.data_root) {
        throw new Error(`Data mismatch: Uploader doesn't match provided data.`);
      }
      return upload;
    }
    /**
     * Reconstruct an upload from the tx metadata, ie /tx/<id>.
     *
     * @param api
     * @param id
     * @param data
     */
    static async fromTransactionId(api2, id) {
      const resp = await api2.get(`tx/${id}`);
      if (resp.status !== 200) {
        throw new Error(`Tx ${id} not found: ${resp.status}`);
      }
      const transaction2 = resp.data;
      transaction2.data = new Uint8Array(0);
      const serialized = {
        txPosted: true,
        chunkIndex: 0,
        lastResponseError: "",
        lastRequestTimeEnd: 0,
        lastResponseStatus: 0,
        transaction: transaction2
      };
      return serialized;
    }
    toJSON() {
      return {
        chunkIndex: this.chunkIndex,
        transaction: this.transaction,
        lastRequestTimeEnd: this.lastRequestTimeEnd,
        lastResponseStatus: this.lastResponseStatus,
        lastResponseError: this.lastResponseError,
        txPosted: this.txPosted
      };
    }
    // POST to /tx
    async postTransaction() {
      const uploadInBody = this.totalChunks <= MAX_CHUNKS_IN_BODY;
      if (uploadInBody) {
        this.transaction.data = this.data;
        const resp2 = await this.api.post(`tx`, this.transaction).catch((e) => {
          console.error(e);
          return { status: -1, data: { error: e.message } };
        });
        this.lastRequestTimeEnd = Date.now();
        this.lastResponseStatus = resp2.status;
        this.transaction.data = new Uint8Array(0);
        if (resp2.status >= 200 && resp2.status < 300) {
          this.txPosted = true;
          this.chunkIndex = MAX_CHUNKS_IN_BODY;
          return;
        }
        this.lastResponseError = (0, error_12.getError)(resp2);
        throw new Error(`Unable to upload transaction: ${resp2.status}, ${this.lastResponseError}`);
      }
      const resp = await this.api.post(`tx`, this.transaction);
      this.lastRequestTimeEnd = Date.now();
      this.lastResponseStatus = resp.status;
      if (!(resp.status >= 200 && resp.status < 300)) {
        this.lastResponseError = (0, error_12.getError)(resp);
        throw new Error(`Unable to upload transaction: ${resp.status}, ${this.lastResponseError}`);
      }
      this.txPosted = true;
    }
  }
  transactionUploader.TransactionUploader = TransactionUploader;
  return transactionUploader;
}
var hasRequiredTransactions;
function requireTransactions() {
  if (hasRequiredTransactions)
    return transactions;
  hasRequiredTransactions = 1;
  var __await = commonjsGlobal && commonjsGlobal.__await || function(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };
  var __asyncGenerator = commonjsGlobal && commonjsGlobal.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  };
  Object.defineProperty(transactions, "__esModule", { value: true });
  const error_12 = error;
  const transaction_1 = requireTransaction();
  const ArweaveUtils2 = utils;
  const transaction_uploader_1 = requireTransactionUploader();
  class Transactions {
    constructor(api2, crypto2, chunks2) {
      this.api = api2;
      this.crypto = crypto2;
      this.chunks = chunks2;
    }
    getTransactionAnchor() {
      return this.api.get(`tx_anchor`).then((response) => {
        return response.data;
      });
    }
    getPrice(byteSize, targetAddress) {
      let endpoint = targetAddress ? `price/${byteSize}/${targetAddress}` : `price/${byteSize}`;
      return this.api.get(endpoint).then((response) => {
        return response.data;
      });
    }
    async get(id) {
      const response = await this.api.get(`tx/${id}`);
      if (response.status == 200) {
        const data_size = parseInt(response.data.data_size);
        if (response.data.format >= 2 && data_size > 0 && data_size <= 1024 * 1024 * 12) {
          const data = await this.getData(id);
          return new transaction_1.default(Object.assign(Object.assign({}, response.data), { data }));
        }
        return new transaction_1.default(Object.assign(Object.assign({}, response.data), { format: response.data.format || 1 }));
      }
      if (response.status == 404) {
        throw new error_12.default(
          "TX_NOT_FOUND"
          /* ArweaveErrorType.TX_NOT_FOUND */
        );
      }
      if (response.status == 410) {
        throw new error_12.default(
          "TX_FAILED"
          /* ArweaveErrorType.TX_FAILED */
        );
      }
      throw new error_12.default(
        "TX_INVALID"
        /* ArweaveErrorType.TX_INVALID */
      );
    }
    fromRaw(attributes) {
      return new transaction_1.default(attributes);
    }
    async search(tagName, tagValue) {
      return this.api.post(`arql`, {
        op: "equals",
        expr1: tagName,
        expr2: tagValue
      }).then((response) => {
        if (!response.data) {
          return [];
        }
        return response.data;
      });
    }
    getStatus(id) {
      return this.api.get(`tx/${id}/status`).then((response) => {
        if (response.status == 200) {
          return {
            status: 200,
            confirmed: response.data
          };
        }
        return {
          status: response.status,
          confirmed: null
        };
      });
    }
    async getData(id, options) {
      let data = void 0;
      try {
        data = await this.chunks.downloadChunkedData(id);
      } catch (error2) {
        console.error(`Error while trying to download chunked data for ${id}`);
        console.error(error2);
      }
      if (!data) {
        console.warn(`Falling back to gateway cache for ${id}`);
        try {
          data = (await this.api.get(`/${id}`)).data;
        } catch (error2) {
          console.error(`Error while trying to download contiguous data from gateway cache for ${id}`);
          console.error(error2);
        }
      }
      if (!data) {
        throw new Error(`${id} was not found!`);
      }
      if (options && options.decode && !options.string) {
        return data;
      }
      if (options && options.decode && options.string) {
        return ArweaveUtils2.bufferToString(data);
      }
      return ArweaveUtils2.bufferTob64Url(data);
    }
    async sign(transaction2, jwk, options) {
      if (!jwk && typeof arweaveWallet !== "object") {
        throw new Error(`A new Arweave transaction must provide the jwk parameter.`);
      } else if (!jwk || jwk === "use_wallet") {
        try {
          const existingPermissions = await arweaveWallet.getPermissions();
          if (!existingPermissions.includes("SIGN_TRANSACTION"))
            await arweaveWallet.connect(["SIGN_TRANSACTION"]);
        } catch (_a) {
        }
        const signedTransaction = await arweaveWallet.sign(transaction2, options);
        transaction2.setSignature({
          id: signedTransaction.id,
          owner: signedTransaction.owner,
          reward: signedTransaction.reward,
          tags: signedTransaction.tags,
          signature: signedTransaction.signature
        });
      } else {
        transaction2.setOwner(jwk.n);
        let dataToSign = await transaction2.getSignatureData();
        let rawSignature = await this.crypto.sign(jwk, dataToSign, options);
        let id = await this.crypto.hash(rawSignature);
        transaction2.setSignature({
          id: ArweaveUtils2.bufferTob64Url(id),
          owner: jwk.n,
          signature: ArweaveUtils2.bufferTob64Url(rawSignature)
        });
      }
    }
    async verify(transaction2) {
      const signaturePayload = await transaction2.getSignatureData();
      const rawSignature = transaction2.get("signature", {
        decode: true,
        string: false
      });
      const expectedId = ArweaveUtils2.bufferTob64Url(await this.crypto.hash(rawSignature));
      if (transaction2.id !== expectedId) {
        throw new Error(`Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature.`);
      }
      return this.crypto.verify(transaction2.owner, signaturePayload, rawSignature);
    }
    async post(transaction2) {
      if (typeof transaction2 === "string") {
        transaction2 = new transaction_1.default(JSON.parse(transaction2));
      } else if (typeof transaction2.readInt32BE === "function") {
        transaction2 = new transaction_1.default(JSON.parse(transaction2.toString()));
      } else if (typeof transaction2 === "object" && !(transaction2 instanceof transaction_1.default)) {
        transaction2 = new transaction_1.default(transaction2);
      }
      if (!(transaction2 instanceof transaction_1.default)) {
        throw new Error(`Must be Transaction object`);
      }
      if (!transaction2.chunks) {
        await transaction2.prepareChunks(transaction2.data);
      }
      const uploader = await this.getUploader(transaction2, transaction2.data);
      try {
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
        }
      } catch (e) {
        if (uploader.lastResponseStatus > 0) {
          return {
            status: uploader.lastResponseStatus,
            statusText: uploader.lastResponseError,
            data: {
              error: uploader.lastResponseError
            }
          };
        }
        throw e;
      }
      return {
        status: 200,
        statusText: "OK",
        data: {}
      };
    }
    /**
     * Gets an uploader than can be used to upload a transaction chunk by chunk, giving progress
     * and the ability to resume.
     *
     * Usage example:
     *
     * ```
     * const uploader = arweave.transactions.getUploader(transaction);
     * while (!uploader.isComplete) {
     *   await uploader.uploadChunk();
     *   console.log(`${uploader.pctComplete}%`);
     * }
     * ```
     *
     * @param upload a Transaction object, a previously save progress object, or a transaction id.
     * @param data the data of the transaction. Required when resuming an upload.
     */
    async getUploader(upload, data) {
      let uploader;
      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
      }
      if (upload instanceof transaction_1.default) {
        if (!data) {
          data = upload.data;
        }
        if (!(data instanceof Uint8Array)) {
          throw new Error("Data format is invalid");
        }
        if (!upload.chunks) {
          await upload.prepareChunks(data);
        }
        uploader = new transaction_uploader_1.TransactionUploader(this.api, upload);
        if (!uploader.data || uploader.data.length === 0) {
          uploader.data = data;
        }
      } else {
        if (typeof upload === "string") {
          upload = await transaction_uploader_1.TransactionUploader.fromTransactionId(this.api, upload);
        }
        if (!data || !(data instanceof Uint8Array)) {
          throw new Error(`Must provide data when resuming upload`);
        }
        uploader = await transaction_uploader_1.TransactionUploader.fromSerialized(this.api, upload, data);
      }
      return uploader;
    }
    /**
     * Async generator version of uploader
     *
     * Usage example:
     *
     * ```
     * for await (const uploader of arweave.transactions.upload(tx)) {
     *  console.log(`${uploader.pctComplete}%`);
     * }
     * ```
     *
     * @param upload a Transaction object, a previously save uploader, or a transaction id.
     * @param data the data of the transaction. Required when resuming an upload.
     */
    upload(upload, data) {
      return __asyncGenerator(this, arguments, function* upload_1() {
        const uploader = yield __await(this.getUploader(upload, data));
        while (!uploader.isComplete) {
          yield __await(uploader.uploadChunk());
          yield yield __await(uploader);
        }
        return yield __await(uploader);
      });
    }
  }
  transactions.default = Transactions;
  return transactions;
}
var wallets = {};
Object.defineProperty(wallets, "__esModule", { value: true });
const ArweaveUtils$2 = utils;
class Wallets {
  constructor(api2, crypto2) {
    this.api = api2;
    this.crypto = crypto2;
  }
  /**
   * Get the wallet balance for the given address.
   *
   * @param {string} address - The arweave address to get the balance for.
   *
   * @returns {Promise<string>} - Promise which resolves with a winston string balance.
   */
  getBalance(address) {
    return this.api.get(`wallet/${address}/balance`).then((response) => {
      return response.data;
    });
  }
  /**
   * Get the last transaction ID for the given wallet address.
   *
   * @param {string} address - The arweave address to get the transaction for.
   *
   * @returns {Promise<string>} - Promise which resolves with a transaction ID.
   */
  getLastTransactionID(address) {
    return this.api.get(`wallet/${address}/last_tx`).then((response) => {
      return response.data;
    });
  }
  generate() {
    return this.crypto.generateJWK();
  }
  async jwkToAddress(jwk) {
    if (!jwk || jwk === "use_wallet") {
      return this.getAddress();
    } else {
      return this.getAddress(jwk);
    }
  }
  async getAddress(jwk) {
    if (!jwk || jwk === "use_wallet") {
      try {
        await arweaveWallet.connect(["ACCESS_ADDRESS"]);
      } catch (_a) {
      }
      return arweaveWallet.getActiveAddress();
    } else {
      return this.ownerToAddress(jwk.n);
    }
  }
  async ownerToAddress(owner) {
    return ArweaveUtils$2.bufferTob64Url(await this.crypto.hash(ArweaveUtils$2.b64UrlToBuffer(owner)));
  }
}
wallets.default = Wallets;
var silo = {};
Object.defineProperty(silo, "__esModule", { value: true });
silo.SiloResource = void 0;
const ArweaveUtils$1 = utils;
class Silo {
  constructor(api2, crypto2, transactions2) {
    this.api = api2;
    this.crypto = crypto2;
    this.transactions = transactions2;
  }
  async get(siloURI) {
    if (!siloURI) {
      throw new Error(`No Silo URI specified`);
    }
    const resource = await this.parseUri(siloURI);
    const ids = await this.transactions.search("Silo-Name", resource.getAccessKey());
    if (ids.length == 0) {
      throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
    }
    const transaction2 = await this.transactions.get(ids[0]);
    if (!transaction2) {
      throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
    }
    const encrypted = transaction2.get("data", { decode: true, string: false });
    return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
  }
  async readTransactionData(transaction2, siloURI) {
    if (!siloURI) {
      throw new Error(`No Silo URI specified`);
    }
    const resource = await this.parseUri(siloURI);
    const encrypted = transaction2.get("data", { decode: true, string: false });
    return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
  }
  async parseUri(siloURI) {
    const parsed = siloURI.match(/^([a-z0-9-_]+)\.([0-9]+)/i);
    if (!parsed) {
      throw new Error(`Invalid Silo name, must be a name in the format of [a-z0-9]+.[0-9]+, e.g. 'bubble.7'`);
    }
    const siloName = parsed[1];
    const hashIterations = Math.pow(2, parseInt(parsed[2]));
    const digest = await this.hash(ArweaveUtils$1.stringToBuffer(siloName), hashIterations);
    const accessKey = ArweaveUtils$1.bufferTob64(digest.slice(0, 15));
    const encryptionkey = await this.hash(digest.slice(16, 31), 1);
    return new SiloResource(siloURI, accessKey, encryptionkey);
  }
  async hash(input, iterations) {
    let digest = await this.crypto.hash(input);
    for (let count = 0; count < iterations - 1; count++) {
      digest = await this.crypto.hash(digest);
    }
    return digest;
  }
}
silo.default = Silo;
class SiloResource {
  constructor(uri, accessKey, encryptionKey) {
    this.uri = uri;
    this.accessKey = accessKey;
    this.encryptionKey = encryptionKey;
  }
  getUri() {
    return this.uri;
  }
  getAccessKey() {
    return this.accessKey;
  }
  getEncryptionKey() {
    return this.encryptionKey;
  }
}
silo.SiloResource = SiloResource;
var chunks = {};
Object.defineProperty(chunks, "__esModule", { value: true });
const error_1$1 = error;
const ArweaveUtils = utils;
class Chunks {
  constructor(api2) {
    this.api = api2;
  }
  async getTransactionOffset(id) {
    const resp = await this.api.get(`tx/${id}/offset`);
    if (resp.status === 200) {
      return resp.data;
    }
    throw new Error(`Unable to get transaction offset: ${(0, error_1$1.getError)(resp)}`);
  }
  async getChunk(offset) {
    const resp = await this.api.get(`chunk/${offset}`);
    if (resp.status === 200) {
      return resp.data;
    }
    throw new Error(`Unable to get chunk: ${(0, error_1$1.getError)(resp)}`);
  }
  async getChunkData(offset) {
    const chunk = await this.getChunk(offset);
    const buf = ArweaveUtils.b64UrlToBuffer(chunk.chunk);
    return buf;
  }
  firstChunkOffset(offsetResponse) {
    return parseInt(offsetResponse.offset) - parseInt(offsetResponse.size) + 1;
  }
  async downloadChunkedData(id) {
    const offsetResponse = await this.getTransactionOffset(id);
    const size = parseInt(offsetResponse.size);
    const endOffset = parseInt(offsetResponse.offset);
    const startOffset = endOffset - size + 1;
    const data = new Uint8Array(size);
    let byte = 0;
    while (byte < size) {
      if (this.api.config.logging) {
        console.log(`[chunk] ${byte}/${size}`);
      }
      let chunkData;
      try {
        chunkData = await this.getChunkData(startOffset + byte);
      } catch (error2) {
        console.error(`[chunk] Failed to fetch chunk at offset ${startOffset + byte}`);
        console.error(`[chunk] This could indicate that the chunk wasn't uploaded or hasn't yet seeded properly to a particular gateway/node`);
      }
      if (chunkData) {
        data.set(chunkData, byte);
        byte += chunkData.length;
      } else {
        throw new Error(`Couldn't complete data download at ${byte}/${size}`);
      }
    }
    return data;
  }
}
chunks.default = Chunks;
var blocks = {};
Object.defineProperty(blocks, "__esModule", { value: true });
const error_1 = error;
class Blocks {
  constructor(api2, network2) {
    this.api = api2;
    this.network = network2;
  }
  /**
   * Gets a block by its "indep_hash"
   */
  async get(indepHash) {
    const response = await this.api.get(`${Blocks.ENDPOINT}${indepHash}`);
    if (response.status === 200) {
      return response.data;
    } else {
      if (response.status === 404) {
        throw new error_1.default(
          "BLOCK_NOT_FOUND"
          /* ArweaveErrorType.BLOCK_NOT_FOUND */
        );
      } else {
        throw new Error(`Error while loading block data: ${response}`);
      }
    }
  }
  /**
   * Gets current block data (ie. block with indep_hash = Network.getInfo().current)
   */
  async getCurrent() {
    const { current } = await this.network.getInfo();
    return await this.get(current);
  }
}
blocks.default = Blocks;
Blocks.ENDPOINT = "block/hash/";
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon)
    return common;
  hasRequiredCommon = 1;
  Object.defineProperty(common, "__esModule", { value: true });
  const ar_1 = ar;
  const api_1 = api;
  const node_driver_1 = webcryptoDriver;
  const network_1 = network;
  const transactions_1 = requireTransactions();
  const wallets_1 = wallets;
  const transaction_1 = requireTransaction();
  const ArweaveUtils2 = utils;
  const silo_1 = silo;
  const chunks_1 = chunks;
  const blocks_1 = blocks;
  class Arweave {
    constructor(apiConfig) {
      this.api = new api_1.default(apiConfig);
      this.wallets = new wallets_1.default(this.api, Arweave.crypto);
      this.chunks = new chunks_1.default(this.api);
      this.transactions = new transactions_1.default(this.api, Arweave.crypto, this.chunks);
      this.silo = new silo_1.default(this.api, this.crypto, this.transactions);
      this.network = new network_1.default(this.api);
      this.blocks = new blocks_1.default(this.api, this.network);
      this.ar = new ar_1.default();
    }
    /** @deprecated */
    get crypto() {
      return Arweave.crypto;
    }
    /** @deprecated */
    get utils() {
      return Arweave.utils;
    }
    getConfig() {
      return {
        api: this.api.getConfig(),
        crypto: null
      };
    }
    async createTransaction(attributes, jwk) {
      const transaction2 = {};
      Object.assign(transaction2, attributes);
      if (!attributes.data && !(attributes.target && attributes.quantity)) {
        throw new Error(`A new Arweave transaction must have a 'data' value, or 'target' and 'quantity' values.`);
      }
      if (attributes.owner == void 0) {
        if (jwk && jwk !== "use_wallet") {
          transaction2.owner = jwk.n;
        }
      }
      if (attributes.last_tx == void 0) {
        transaction2.last_tx = await this.transactions.getTransactionAnchor();
      }
      if (typeof attributes.data === "string") {
        attributes.data = ArweaveUtils2.stringToBuffer(attributes.data);
      }
      if (attributes.data instanceof ArrayBuffer) {
        attributes.data = new Uint8Array(attributes.data);
      }
      if (attributes.data && !(attributes.data instanceof Uint8Array)) {
        throw new Error("Expected data to be a string, Uint8Array or ArrayBuffer");
      }
      if (attributes.reward == void 0) {
        const length = attributes.data ? attributes.data.byteLength : 0;
        transaction2.reward = await this.transactions.getPrice(length, transaction2.target);
      }
      transaction2.data_root = "";
      transaction2.data_size = attributes.data ? attributes.data.byteLength.toString() : "0";
      transaction2.data = attributes.data || new Uint8Array(0);
      const createdTransaction = new transaction_1.default(transaction2);
      await createdTransaction.getSignatureData();
      return createdTransaction;
    }
    async createSiloTransaction(attributes, jwk, siloUri) {
      const transaction2 = {};
      Object.assign(transaction2, attributes);
      if (!attributes.data) {
        throw new Error(`Silo transactions must have a 'data' value`);
      }
      if (!siloUri) {
        throw new Error(`No Silo URI specified.`);
      }
      if (attributes.target || attributes.quantity) {
        throw new Error(`Silo transactions can only be used for storing data, sending AR to other wallets isn't supported.`);
      }
      if (attributes.owner == void 0) {
        if (!jwk || !jwk.n) {
          throw new Error(`A new Arweave transaction must either have an 'owner' attribute, or you must provide the jwk parameter.`);
        }
        transaction2.owner = jwk.n;
      }
      if (attributes.last_tx == void 0) {
        transaction2.last_tx = await this.transactions.getTransactionAnchor();
      }
      const siloResource = await this.silo.parseUri(siloUri);
      if (typeof attributes.data == "string") {
        const encrypted = await this.crypto.encrypt(ArweaveUtils2.stringToBuffer(attributes.data), siloResource.getEncryptionKey());
        transaction2.reward = await this.transactions.getPrice(encrypted.byteLength);
        transaction2.data = ArweaveUtils2.bufferTob64Url(encrypted);
      }
      if (attributes.data instanceof Uint8Array) {
        const encrypted = await this.crypto.encrypt(attributes.data, siloResource.getEncryptionKey());
        transaction2.reward = await this.transactions.getPrice(encrypted.byteLength);
        transaction2.data = ArweaveUtils2.bufferTob64Url(encrypted);
      }
      const siloTransaction = new transaction_1.default(transaction2);
      siloTransaction.addTag("Silo-Name", siloResource.getAccessKey());
      siloTransaction.addTag("Silo-Version", `0.1.0`);
      return siloTransaction;
    }
    arql(query) {
      return this.api.post("/arql", query).then((response) => response.data || []);
    }
  }
  common.default = Arweave;
  Arweave.crypto = new node_driver_1.default();
  Arweave.utils = ArweaveUtils2;
  return common;
}
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  const common_1 = requireCommon();
  common_1.default.init = function(apiConfig = {}) {
    function getDefaultConfig() {
      const defaults = {
        host: "arweave.net",
        port: 443,
        protocol: "https"
      };
      if (typeof location !== "object" || !location.protocol || !location.hostname) {
        return defaults;
      }
      const currentProtocol = location.protocol.replace(":", "");
      const currentHost = location.hostname;
      const currentPort = location.port ? parseInt(location.port) : currentProtocol == "https" ? 443 : 80;
      const isLocal = ["localhost", "127.0.0.1"].includes(currentHost) || currentProtocol == "file";
      if (isLocal) {
        return defaults;
      }
      return {
        host: currentHost,
        port: currentPort,
        protocol: currentProtocol
      };
    }
    const defaultConfig = getDefaultConfig();
    const protocol = apiConfig.protocol || defaultConfig.protocol;
    const host = apiConfig.host || defaultConfig.host;
    const port = apiConfig.port || defaultConfig.port;
    return new common_1.default(Object.assign(Object.assign({}, apiConfig), {
      host,
      protocol,
      port
    }));
  };
  if (typeof globalThis === "object") {
    globalThis.Arweave = common_1.default;
  } else if (typeof self === "object") {
    self.Arweave = common_1.default;
  }
  __exportStar(requireCommon(), exports);
  exports.default = common_1.default;
})(web);
const index = /* @__PURE__ */ getDefaultExportFromCjs(web);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [web]);
export {
  index$1 as i,
  requireDeepHash as r,
  web as w
};
//# sourceMappingURL=index-f6d59bb6.js.map
