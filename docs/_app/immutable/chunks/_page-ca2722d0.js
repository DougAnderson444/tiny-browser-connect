import { S as SvelteComponent, i as init, s as safe_not_equal, e as empty, b as insert_hydration, f as transition_in, g as group_outros, t as transition_out, d as check_outros, h as detach, H as createEventDispatcher, o as onMount, v as create_component, a as space, w as claim_component, c as claim_space, x as mount_component, y as destroy_component, B as create_slot, C as update_slot_base, D as get_all_dirty_from_scope, E as get_slot_changes, k as element, q as text, l as claim_element, m as children, r as claim_text, n as attr, F as append_hydration, I as listen, u as set_data, J as destroy_each, A as noop, K as binding_callbacks, L as toggle_class, M as run_all, N as is_function } from "./index-a6b7f7ba.js";
import { _ as __vitePreload } from "./preload-helper-b21cceae.js";
const get_default_slot_changes$3 = (dirty) => ({
  wallet: dirty & 1,
  ownerAddress: dirty & 16,
  RSAPublicKey: dirty & 4,
  Ed25519PublicKey: dirty & 8
});
const get_default_slot_context$3 = (ctx) => ({
  wallet: ctx[0],
  ownerAddress: ctx[4],
  RSAPublicKey: ctx[2],
  Ed25519PublicKey: ctx[3]
});
function create_if_block$3(ctx) {
  let switch_instance;
  let t;
  let if_block_anchor;
  let current;
  var switch_value = ctx[1];
  function switch_props(ctx2) {
    return {};
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
    switch_instance.$on("walletReady", ctx[5]);
  }
  let if_block = ctx[0] && ctx[2] && ctx[3] && create_if_block_1$1(ctx);
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = ctx2[1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          switch_instance.$on("walletReady", ctx2[5]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, t.parentNode, t);
        } else {
          switch_instance = null;
        }
      }
      if (ctx2[0] && ctx2[2] && ctx2[3]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 13) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (switch_instance)
        destroy_component(switch_instance, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_1$1(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], get_default_slot_context$3);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 93)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[6],
            !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, get_default_slot_changes$3),
            get_default_slot_context$3
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$7(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block$3(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let wallet;
  let Web3WalletMenu;
  let RSAPublicKey;
  let Ed25519PublicKey;
  let ownerAddress;
  const dispatch = createEventDispatcher();
  onMount(async () => {
    $$invalidate(1, { Web3WalletMenu } = await __vitePreload(() => import("./index-98e6f1ed.js"), true ? ["./index-98e6f1ed.js","./index-a6b7f7ba.js","./preload-helper-b21cceae.js","..\\assets\\index-da57bcef.css"] : void 0, import.meta.url), Web3WalletMenu);
  });
  async function walletReady(e) {
    var _a;
    $$invalidate(0, wallet = e.detail.wallet);
    $$invalidate(4, ownerAddress = await ((_a = wallet == null ? void 0 : wallet.arweaveWalletAPI) == null ? void 0 : _a.getActiveAddress()));
    $$invalidate(2, RSAPublicKey = await wallet.arweaveWalletAPI.getActivePublicKey());
    $$invalidate(3, Ed25519PublicKey = await wallet.proxcryptor.getPublicKey());
    dispatch("RSAPublicKey", RSAPublicKey);
    dispatch("Ed25519PublicKey", Ed25519PublicKey);
    dispatch("ownerAddress", ownerAddress);
  }
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  return [
    wallet,
    Web3WalletMenu,
    RSAPublicKey,
    Ed25519PublicKey,
    ownerAddress,
    walletReady,
    $$scope,
    slots
  ];
}
class WalletManager extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$7, safe_not_equal, {});
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof {} !== "undefined" ? {} : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var base64 = {};
var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(base64, "__esModule", { value: true });
var INVALID_BYTE = 256;
var Coder = function() {
  function Coder2(_paddingCharacter) {
    if (_paddingCharacter === void 0) {
      _paddingCharacter = "=";
    }
    this._paddingCharacter = _paddingCharacter;
  }
  Coder2.prototype.encodedLength = function(length2) {
    if (!this._paddingCharacter) {
      return (length2 * 8 + 5) / 6 | 0;
    }
    return (length2 + 2) / 3 * 4 | 0;
  };
  Coder2.prototype.encode = function(data) {
    var out = "";
    var i = 0;
    for (; i < data.length - 2; i += 3) {
      var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
      out += this._encodeByte(c >>> 3 * 6 & 63);
      out += this._encodeByte(c >>> 2 * 6 & 63);
      out += this._encodeByte(c >>> 1 * 6 & 63);
      out += this._encodeByte(c >>> 0 * 6 & 63);
    }
    var left = data.length - i;
    if (left > 0) {
      var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
      out += this._encodeByte(c >>> 3 * 6 & 63);
      out += this._encodeByte(c >>> 2 * 6 & 63);
      if (left === 2) {
        out += this._encodeByte(c >>> 1 * 6 & 63);
      } else {
        out += this._paddingCharacter || "";
      }
      out += this._paddingCharacter || "";
    }
    return out;
  };
  Coder2.prototype.maxDecodedLength = function(length2) {
    if (!this._paddingCharacter) {
      return (length2 * 6 + 7) / 8 | 0;
    }
    return length2 / 4 * 3 | 0;
  };
  Coder2.prototype.decodedLength = function(s) {
    return this.maxDecodedLength(s.length - this._getPaddingLength(s));
  };
  Coder2.prototype.decode = function(s) {
    if (s.length === 0) {
      return new Uint8Array(0);
    }
    var paddingLength = this._getPaddingLength(s);
    var length2 = s.length - paddingLength;
    var out = new Uint8Array(this.maxDecodedLength(length2));
    var op = 0;
    var i = 0;
    var haveBad = 0;
    var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
    for (; i < length2 - 4; i += 4) {
      v0 = this._decodeChar(s.charCodeAt(i + 0));
      v1 = this._decodeChar(s.charCodeAt(i + 1));
      v2 = this._decodeChar(s.charCodeAt(i + 2));
      v3 = this._decodeChar(s.charCodeAt(i + 3));
      out[op++] = v0 << 2 | v1 >>> 4;
      out[op++] = v1 << 4 | v2 >>> 2;
      out[op++] = v2 << 6 | v3;
      haveBad |= v0 & INVALID_BYTE;
      haveBad |= v1 & INVALID_BYTE;
      haveBad |= v2 & INVALID_BYTE;
      haveBad |= v3 & INVALID_BYTE;
    }
    if (i < length2 - 1) {
      v0 = this._decodeChar(s.charCodeAt(i));
      v1 = this._decodeChar(s.charCodeAt(i + 1));
      out[op++] = v0 << 2 | v1 >>> 4;
      haveBad |= v0 & INVALID_BYTE;
      haveBad |= v1 & INVALID_BYTE;
    }
    if (i < length2 - 2) {
      v2 = this._decodeChar(s.charCodeAt(i + 2));
      out[op++] = v1 << 4 | v2 >>> 2;
      haveBad |= v2 & INVALID_BYTE;
    }
    if (i < length2 - 3) {
      v3 = this._decodeChar(s.charCodeAt(i + 3));
      out[op++] = v2 << 6 | v3;
      haveBad |= v3 & INVALID_BYTE;
    }
    if (haveBad !== 0) {
      throw new Error("Base64Coder: incorrect characters for decoding");
    }
    return out;
  };
  Coder2.prototype._encodeByte = function(b) {
    var result = b;
    result += 65;
    result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
    result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
    result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
    result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
    return String.fromCharCode(result);
  };
  Coder2.prototype._decodeChar = function(c) {
    var result = INVALID_BYTE;
    result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
    result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
    result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
    result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
    result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
    return result;
  };
  Coder2.prototype._getPaddingLength = function(s) {
    var paddingLength = 0;
    if (this._paddingCharacter) {
      for (var i = s.length - 1; i >= 0; i--) {
        if (s[i] !== this._paddingCharacter) {
          break;
        }
        paddingLength++;
      }
      if (s.length < 4 || paddingLength > 2) {
        throw new Error("Base64Coder: incorrect padding");
      }
    }
    return paddingLength;
  };
  return Coder2;
}();
base64.Coder = Coder;
var stdCoder = new Coder();
function encode$2(data) {
  return stdCoder.encode(data);
}
base64.encode = encode$2;
function decode$4(s) {
  return stdCoder.decode(s);
}
base64.decode = decode$4;
var URLSafeCoder = function(_super) {
  __extends(URLSafeCoder2, _super);
  function URLSafeCoder2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  URLSafeCoder2.prototype._encodeByte = function(b) {
    var result = b;
    result += 65;
    result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
    result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
    result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
    result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
    return String.fromCharCode(result);
  };
  URLSafeCoder2.prototype._decodeChar = function(c) {
    var result = INVALID_BYTE;
    result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
    result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
    result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
    result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
    result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
    return result;
  };
  return URLSafeCoder2;
}(Coder);
base64.URLSafeCoder = URLSafeCoder;
var urlSafeCoder = new URLSafeCoder();
function encodeURLSafe(data) {
  return urlSafeCoder.encode(data);
}
var encodeURLSafe_1 = base64.encodeURLSafe = encodeURLSafe;
function decodeURLSafe(s) {
  return urlSafeCoder.decode(s);
}
base64.decodeURLSafe = decodeURLSafe;
base64.encodedLength = function(length2) {
  return stdCoder.encodedLength(length2);
};
base64.maxDecodedLength = function(length2) {
  return stdCoder.maxDecodedLength(length2);
};
base64.decodedLength = function(s) {
  return stdCoder.decodedLength(s);
};
var sha256 = {};
var binary = {};
var int = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function imulShim(a, b) {
    var ah = a >>> 16 & 65535, al = a & 65535;
    var bh = b >>> 16 & 65535, bl = b & 65535;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
  }
  exports.mul = Math.imul || imulShim;
  function add(a, b) {
    return a + b | 0;
  }
  exports.add = add;
  function sub(a, b) {
    return a - b | 0;
  }
  exports.sub = sub;
  function rotl(x, n) {
    return x << n | x >>> 32 - n;
  }
  exports.rotl = rotl;
  function rotr(x, n) {
    return x << 32 - n | x >>> n;
  }
  exports.rotr = rotr;
  function isIntegerShim(n) {
    return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
  }
  exports.isInteger = Number.isInteger || isIntegerShim;
  exports.MAX_SAFE_INTEGER = 9007199254740991;
  exports.isSafeInteger = function(n) {
    return exports.isInteger(n) && (n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER);
  };
})(int);
Object.defineProperty(binary, "__esModule", { value: true });
var int_1 = int;
function readInt16BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
}
binary.readInt16BE = readInt16BE;
function readUint16BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
}
binary.readUint16BE = readUint16BE;
function readInt16LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
}
binary.readInt16LE = readInt16LE;
function readUint16LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 1] << 8 | array[offset]) >>> 0;
}
binary.readUint16LE = readUint16LE;
function writeUint16BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(2);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 8;
  out[offset + 1] = value >>> 0;
  return out;
}
binary.writeUint16BE = writeUint16BE;
binary.writeInt16BE = writeUint16BE;
function writeUint16LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(2);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 0;
  out[offset + 1] = value >>> 8;
  return out;
}
binary.writeUint16LE = writeUint16LE;
binary.writeInt16LE = writeUint16LE;
function readInt32BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
}
binary.readInt32BE = readInt32BE;
function readUint32BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
}
binary.readUint32BE = readUint32BE;
function readInt32LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
}
binary.readInt32LE = readInt32LE;
function readUint32LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
}
binary.readUint32LE = readUint32LE;
function writeUint32BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 24;
  out[offset + 1] = value >>> 16;
  out[offset + 2] = value >>> 8;
  out[offset + 3] = value >>> 0;
  return out;
}
binary.writeUint32BE = writeUint32BE;
binary.writeInt32BE = writeUint32BE;
function writeUint32LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 0;
  out[offset + 1] = value >>> 8;
  out[offset + 2] = value >>> 16;
  out[offset + 3] = value >>> 24;
  return out;
}
binary.writeUint32LE = writeUint32LE;
binary.writeInt32LE = writeUint32LE;
function readInt64BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var hi = readInt32BE(array, offset);
  var lo = readInt32BE(array, offset + 4);
  return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
}
binary.readInt64BE = readInt64BE;
function readUint64BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var hi = readUint32BE(array, offset);
  var lo = readUint32BE(array, offset + 4);
  return hi * 4294967296 + lo;
}
binary.readUint64BE = readUint64BE;
function readInt64LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var lo = readInt32LE(array, offset);
  var hi = readInt32LE(array, offset + 4);
  return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
}
binary.readInt64LE = readInt64LE;
function readUint64LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var lo = readUint32LE(array, offset);
  var hi = readUint32LE(array, offset + 4);
  return hi * 4294967296 + lo;
}
binary.readUint64LE = readUint64LE;
function writeUint64BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  writeUint32BE(value / 4294967296 >>> 0, out, offset);
  writeUint32BE(value >>> 0, out, offset + 4);
  return out;
}
binary.writeUint64BE = writeUint64BE;
binary.writeInt64BE = writeUint64BE;
function writeUint64LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  writeUint32LE(value >>> 0, out, offset);
  writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
  return out;
}
binary.writeUint64LE = writeUint64LE;
binary.writeInt64LE = writeUint64LE;
function readUintBE(bitLength, array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  }
  if (bitLength / 8 > array.length - offset) {
    throw new Error("readUintBE: array is too short for the given bitLength");
  }
  var result = 0;
  var mul = 1;
  for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
    result += array[i] * mul;
    mul *= 256;
  }
  return result;
}
binary.readUintBE = readUintBE;
function readUintLE(bitLength, array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  }
  if (bitLength / 8 > array.length - offset) {
    throw new Error("readUintLE: array is too short for the given bitLength");
  }
  var result = 0;
  var mul = 1;
  for (var i = offset; i < offset + bitLength / 8; i++) {
    result += array[i] * mul;
    mul *= 256;
  }
  return result;
}
binary.readUintLE = readUintLE;
function writeUintBE(bitLength, value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(bitLength / 8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  }
  if (!int_1.isSafeInteger(value)) {
    throw new Error("writeUintBE value must be an integer");
  }
  var div = 1;
  for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
    out[i] = value / div & 255;
    div *= 256;
  }
  return out;
}
binary.writeUintBE = writeUintBE;
function writeUintLE(bitLength, value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(bitLength / 8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  }
  if (!int_1.isSafeInteger(value)) {
    throw new Error("writeUintLE value must be an integer");
  }
  var div = 1;
  for (var i = offset; i < offset + bitLength / 8; i++) {
    out[i] = value / div & 255;
    div *= 256;
  }
  return out;
}
binary.writeUintLE = writeUintLE;
function readFloat32BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat32(offset);
}
binary.readFloat32BE = readFloat32BE;
function readFloat32LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat32(offset, true);
}
binary.readFloat32LE = readFloat32LE;
function readFloat64BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat64(offset);
}
binary.readFloat64BE = readFloat64BE;
function readFloat64LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat64(offset, true);
}
binary.readFloat64LE = readFloat64LE;
function writeFloat32BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat32(offset, value);
  return out;
}
binary.writeFloat32BE = writeFloat32BE;
function writeFloat32LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat32(offset, value, true);
  return out;
}
binary.writeFloat32LE = writeFloat32LE;
function writeFloat64BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat64(offset, value);
  return out;
}
binary.writeFloat64BE = writeFloat64BE;
function writeFloat64LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat64(offset, value, true);
  return out;
}
binary.writeFloat64LE = writeFloat64LE;
var wipe$1 = {};
Object.defineProperty(wipe$1, "__esModule", { value: true });
function wipe(array) {
  for (var i = 0; i < array.length; i++) {
    array[i] = 0;
  }
  return array;
}
wipe$1.wipe = wipe;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var binary_1 = binary;
  var wipe_1 = wipe$1;
  exports.DIGEST_LENGTH = 32;
  exports.BLOCK_SIZE = 64;
  var SHA256 = function() {
    function SHA2562() {
      this.digestLength = exports.DIGEST_LENGTH;
      this.blockSize = exports.BLOCK_SIZE;
      this._state = new Int32Array(8);
      this._temp = new Int32Array(64);
      this._buffer = new Uint8Array(128);
      this._bufferLength = 0;
      this._bytesHashed = 0;
      this._finished = false;
      this.reset();
    }
    SHA2562.prototype._initState = function() {
      this._state[0] = 1779033703;
      this._state[1] = 3144134277;
      this._state[2] = 1013904242;
      this._state[3] = 2773480762;
      this._state[4] = 1359893119;
      this._state[5] = 2600822924;
      this._state[6] = 528734635;
      this._state[7] = 1541459225;
    };
    SHA2562.prototype.reset = function() {
      this._initState();
      this._bufferLength = 0;
      this._bytesHashed = 0;
      this._finished = false;
      return this;
    };
    SHA2562.prototype.clean = function() {
      wipe_1.wipe(this._buffer);
      wipe_1.wipe(this._temp);
      this.reset();
    };
    SHA2562.prototype.update = function(data, dataLength) {
      if (dataLength === void 0) {
        dataLength = data.length;
      }
      if (this._finished) {
        throw new Error("SHA256: can't update because hash was finished.");
      }
      var dataPos = 0;
      this._bytesHashed += dataLength;
      if (this._bufferLength > 0) {
        while (this._bufferLength < this.blockSize && dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }
        if (this._bufferLength === this.blockSize) {
          hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
          this._bufferLength = 0;
        }
      }
      if (dataLength >= this.blockSize) {
        dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
        dataLength %= this.blockSize;
      }
      while (dataLength > 0) {
        this._buffer[this._bufferLength++] = data[dataPos++];
        dataLength--;
      }
      return this;
    };
    SHA2562.prototype.finish = function(out) {
      if (!this._finished) {
        var bytesHashed = this._bytesHashed;
        var left = this._bufferLength;
        var bitLenHi = bytesHashed / 536870912 | 0;
        var bitLenLo = bytesHashed << 3;
        var padLength = bytesHashed % 64 < 56 ? 64 : 128;
        this._buffer[left] = 128;
        for (var i = left + 1; i < padLength - 8; i++) {
          this._buffer[i] = 0;
        }
        binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
        binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
        hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
        this._finished = true;
      }
      for (var i = 0; i < this.digestLength / 4; i++) {
        binary_1.writeUint32BE(this._state[i], out, i * 4);
      }
      return this;
    };
    SHA2562.prototype.digest = function() {
      var out = new Uint8Array(this.digestLength);
      this.finish(out);
      return out;
    };
    SHA2562.prototype.saveState = function() {
      if (this._finished) {
        throw new Error("SHA256: cannot save finished state");
      }
      return {
        state: new Int32Array(this._state),
        buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
        bufferLength: this._bufferLength,
        bytesHashed: this._bytesHashed
      };
    };
    SHA2562.prototype.restoreState = function(savedState) {
      this._state.set(savedState.state);
      this._bufferLength = savedState.bufferLength;
      if (savedState.buffer) {
        this._buffer.set(savedState.buffer);
      }
      this._bytesHashed = savedState.bytesHashed;
      this._finished = false;
      return this;
    };
    SHA2562.prototype.cleanSavedState = function(savedState) {
      wipe_1.wipe(savedState.state);
      if (savedState.buffer) {
        wipe_1.wipe(savedState.buffer);
      }
      savedState.bufferLength = 0;
      savedState.bytesHashed = 0;
    };
    return SHA2562;
  }();
  exports.SHA256 = SHA256;
  var K = new Int32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function hashBlocks(w, v, p, pos, len) {
    while (len >= 64) {
      var a = v[0];
      var b = v[1];
      var c = v[2];
      var d = v[3];
      var e = v[4];
      var f = v[5];
      var g = v[6];
      var h = v[7];
      for (var i = 0; i < 16; i++) {
        var j = pos + i * 4;
        w[i] = binary_1.readUint32BE(p, j);
      }
      for (var i = 16; i < 64; i++) {
        var u = w[i - 2];
        var t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
        u = w[i - 15];
        var t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
        w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
      }
      for (var i = 0; i < 64; i++) {
        var t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
        var t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
        h = g;
        g = f;
        f = e;
        e = d + t1 | 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 | 0;
      }
      v[0] += a;
      v[1] += b;
      v[2] += c;
      v[3] += d;
      v[4] += e;
      v[5] += f;
      v[6] += g;
      v[7] += h;
      pos += 64;
      len -= 64;
    }
    return pos;
  }
  function hash(data) {
    var h = new SHA256();
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
  }
  exports.hash = hash;
})(sha256);
function getAddress(Ed25519PublicKey) {
  const hashed = sha256.hash(new Uint8Array(Ed25519PublicKey));
  const hashB64 = encodeURLSafe_1(new Uint8Array(hashed)).replace("=", "");
  return hashB64;
}
var encode_1 = encode$1;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode$1(num, out, offset) {
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
  encode$1.bytes = offset - oldOffset + 1;
  return out;
}
var decode$3 = read;
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
  decode: decode$3,
  encodingLength: length
};
var _brrp_varint = varint;
const decode$2 = (data, offset = 0) => {
  const code = _brrp_varint.decode(data, offset);
  return [code, _brrp_varint.decode.bytes];
};
const encodeTo = (int2, target, offset = 0) => {
  _brrp_varint.encode(int2, target, offset);
  return target;
};
const encodingLength = (int2) => {
  return _brrp_varint.encodingLength(int2);
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
const fromString = (str) => new TextEncoder().encode(str);
const toString = (b) => new TextDecoder().decode(b);
const create = (code, digest) => {
  const size = digest.byteLength;
  const sizeOffset = encodingLength(code);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest, digestOffset);
  return new Digest(code, size, digest, bytes);
};
const decode$1 = (multihash) => {
  const bytes = coerce(multihash);
  const [code, sizeOffset] = decode$2(bytes);
  const [size, digestOffset] = decode$2(bytes.subarray(sizeOffset));
  const digest = bytes.subarray(sizeOffset + digestOffset);
  if (digest.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code, size, digest, bytes);
};
const equals = (a, b) => {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals$1(a.bytes, data.bytes);
  }
};
class Digest {
  constructor(code, size, digest, bytes) {
    this.code = code;
    this.size = size;
    this.digest = digest;
    this.bytes = bytes;
  }
}
function base(ALPHABET, name) {
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
  function decode2(string) {
    var buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name} character`);
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
  constructor(name, prefix, baseEncode) {
    this.name = name;
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
  constructor(name, prefix, baseDecode) {
    this.name = name;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text2) {
    if (typeof text2 === "string") {
      if (text2.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text2.slice(this.prefix.length));
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
  constructor(name, prefix, baseEncode, baseDecode) {
    this.name = name;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name, prefix, baseEncode);
    this.decoder = new Decoder(name, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from = ({ name, prefix, encode: encode2, decode: decode2 }) => new Codec(name, prefix, encode2, decode2);
const baseX = ({ prefix, name, alphabet }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet, name);
  return from({
    prefix,
    name,
    encode: encode2,
    decode: (text2) => coerce(decode2(text2))
  });
};
const decode = (string, alphabet, bitsPerChar, name) => {
  const codes = {};
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i;
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
      throw new SyntaxError(`Non-${name} character`);
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
const encode = (data, alphabet, bitsPerChar) => {
  const pad = alphabet[alphabet.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648 = ({ name, prefix, bitsPerChar, alphabet }) => {
  return from({
    prefix,
    name,
    encode(input) {
      return encode(input, alphabet, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet, bitsPerChar, name);
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
const format = (link, base2) => {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV0(
        bytes,
        baseCache(link),
        base2 || base58btc.encoder
      );
    default:
      return toStringV1(
        bytes,
        baseCache(link),
        base2 || base32.encoder
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
class CID {
  constructor(version, code, multihash, bytes) {
    this.code = code;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  get asCID() {
    return this;
  }
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code, multihash } = this;
        if (code !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(
          multihash
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 0. This is a bug please report`
        );
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code, digest } = this.multihash;
        const multihash = create(code, digest);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 1. This is a bug please report`
        );
      }
    }
  }
  equals(other) {
    return CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals(self2.multihash, unknown.multihash);
  }
  toString(base2) {
    return format(this, base2);
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code, multihash, bytes } = value;
      return new CID(
        version,
        code,
        multihash,
        bytes || encodeCID(version, code, multihash.bytes)
      );
    } else if (value[cidSymbol] === true) {
      const { version, multihash, code } = value;
      const digest = decode$1(multihash);
      return CID.create(version, code, digest);
    } else {
      return null;
    }
  }
  static create(version, code, digest) {
    if (typeof code !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code !== DAG_PB_CODE) {
          throw new Error(
            `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`
          );
        } else {
          return new CID(version, code, digest, digest.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version, code, digest.bytes);
        return new CID(version, code, digest, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest) {
    return CID.create(0, DAG_PB_CODE, digest);
  }
  static createV1(code, digest) {
    return CID.create(1, code, digest);
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
    const multihashBytes = coerce(
      bytes.subarray(prefixSize, prefixSize + specs.multihashSize)
    );
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(
      specs.multihashSize - specs.digestSize
    );
    const digest = new Digest(
      specs.multihashCode,
      specs.digestSize,
      digestBytes,
      multihashBytes
    );
    const cid = specs.version === 0 ? CID.createV0(digest) : CID.createV1(specs.codec, digest);
    return [cid, bytes.subarray(specs.size)];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$2(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  static parse(source, base2) {
    const [prefix, bytes] = parseCIDtoBytes(source, base2);
    const cid = CID.decode(bytes);
    baseCache(cid).set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes = (source, base2) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base2 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base2 || base58btc;
      return [base58btc.prefix, decoder.decode(source)];
    }
    case base32.prefix: {
      const decoder = base2 || base32;
      return [base32.prefix, decoder.decode(source)];
    }
    default: {
      if (base2 == null) {
        throw Error(
          "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
        );
      }
      return [source[0], base2.decode(source)];
    }
  }
};
const toStringV0 = (bytes, cache2, base2) => {
  const { prefix } = base2;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base2.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base2.encode(bytes).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes, cache2, base2) => {
  const { prefix } = base2;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base2.encode(bytes);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version, code, multihash) => {
  const codeOffset = encodingLength(version);
  const hashOffset = codeOffset + encodingLength(code);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version, bytes, 0);
  encodeTo(code, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const get_default_slot_changes$2 = (dirty) => ({});
const get_default_slot_context$2 = (ctx) => ({ handleChange: ctx[3] });
function create_fragment$6(ctx) {
  let button;
  let t0_value = ctx[1] == "saving" ? "Saving" : ctx[1] == "saved" ? "Saved" : "Save";
  let t0;
  let button_class_value;
  let button_disabled_value;
  let t1;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[8].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[7], get_default_slot_context$2);
  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t0 = claim_text(button_nodes, t0_value);
      button_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      this.h();
    },
    h() {
      attr(button, "class", button_class_value = "flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none " + (ctx[1] == "saved" ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-500"));
      button.disabled = button_disabled_value = !ctx[0] || ctx[1] == "saved";
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, t0);
      insert_hydration(target, t1, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[2]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & 2) && t0_value !== (t0_value = ctx2[1] == "saving" ? "Saving" : ctx2[1] == "saved" ? "Saved" : "Save"))
        set_data(t0, t0_value);
      if (!current || dirty & 2 && button_class_value !== (button_class_value = "flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none " + (ctx2[1] == "saved" ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-500"))) {
        attr(button, "class", button_class_value);
      }
      if (!current || dirty & 3 && button_disabled_value !== (button_disabled_value = !ctx2[0] || ctx2[1] == "saved")) {
        button.disabled = button_disabled_value;
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[7],
            !current ? get_all_dirty_from_scope(ctx2[7]) : get_slot_changes(default_slot_template, ctx2[7], dirty, get_default_slot_changes$2),
            get_default_slot_context$2
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (detaching)
        detach(t1);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { tag } = $$props;
  let { tagNode } = $$props;
  let { data } = $$props;
  let { dag } = $$props;
  let state = "saved";
  async function handleSave() {
    $$invalidate(1, state = "saving");
    console.log(state, { data, tagNode });
    if (!data || !tagNode)
      return;
    const dataCid = await dag.tx.addData({ value: data });
    $$invalidate(4, tagNode.data = dataCid, tagNode);
    console.log("saving tagNode", tagNode);
    await dag.tx.add(tag, tagNode);
    await dag.tx.commit();
    $$invalidate(5, dag);
    console.log("saved tagNode", dag.rootCID.toString());
    $$invalidate(1, state = "saved");
  }
  function handleChange(e) {
    console.log(e.detail);
    $$invalidate(0, data = e.detail);
    $$invalidate(1, state = null);
  }
  $$self.$$set = ($$props2) => {
    if ("tag" in $$props2)
      $$invalidate(6, tag = $$props2.tag);
    if ("tagNode" in $$props2)
      $$invalidate(4, tagNode = $$props2.tagNode);
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("dag" in $$props2)
      $$invalidate(5, dag = $$props2.dag);
    if ("$$scope" in $$props2)
      $$invalidate(7, $$scope = $$props2.$$scope);
  };
  return [data, state, handleSave, handleChange, tagNode, dag, tag, $$scope, slots];
}
class Saver extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$6, safe_not_equal, { tag: 6, tagNode: 4, data: 0, dag: 5 });
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
const get_default_slot_changes$1 = (dirty) => ({
  handleChange: dirty & 32768,
  esModule: dirty & 32,
  props: dirty & 64
});
const get_default_slot_context$1 = (ctx) => ({
  handleChange: ctx[15],
  esModule: ctx[5],
  props: ctx[6]
});
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  return child_ctx;
}
function create_if_block_2(ctx) {
  let ul;
  let each_value_1 = Object.keys(ctx[2]);
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      ul = claim_element(nodes, "UL", { class: true });
      var ul_nodes = children(ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(ul_nodes);
      }
      ul_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(ul, "class", "w-1/3 list-none");
    },
    m(target, anchor) {
      insert_hydration(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 12) {
        each_value_1 = Object.keys(ctx2[2]);
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let li;
  let t0_value = ctx[16] + "";
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[8](ctx[16], ...args);
  }
  return {
    c() {
      li = element("li");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l(nodes) {
      li = claim_element(nodes, "LI", { class: true });
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_space(li_nodes);
      li_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(li, "class", "bg-neutral-600 w-full rounded m-4 p-4 cursor-pointer user-select-none");
    },
    m(target, anchor) {
      insert_hydration(target, li, anchor);
      append_hydration(li, t0);
      append_hydration(li, t1);
      if (!mounted) {
        dispose = listen(li, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 4 && t0_value !== (t0_value = ctx[16] + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let saver;
  let current;
  saver = new Saver({
    props: {
      tag: ctx[3],
      dag: ctx[0],
      tagNode: ctx[4],
      $$slots: {
        default: [
          create_default_slot$1,
          ({ handleChange }) => ({ 15: handleChange }),
          ({ handleChange }) => handleChange ? 32768 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(saver.$$.fragment);
    },
    l(nodes) {
      claim_component(saver.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(saver, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const saver_changes = {};
      if (dirty & 8)
        saver_changes.tag = ctx2[3];
      if (dirty & 1)
        saver_changes.dag = ctx2[0];
      if (dirty & 16)
        saver_changes.tagNode = ctx2[4];
      if (dirty & 33376) {
        saver_changes.$$scope = { dirty, ctx: ctx2 };
      }
      saver.$set(saver_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(saver.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(saver.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(saver, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], get_default_slot_context$1);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 33376)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[9],
            !current ? get_all_dirty_from_scope(ctx2[9]) : get_slot_changes(default_slot_template, ctx2[9], dirty, get_default_slot_changes$1),
            get_default_slot_context$1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block$2(ctx) {
  let div1;
  let t;
  let div0;
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      div1 = element("div");
      t = text("Showing roots\r\n		");
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t = claim_text(div1_nodes, "Showing roots\r\n		");
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div0_nodes);
      }
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "font-mono text-xs overflow-auto");
      attr(div1, "class", "m-4 p-4");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, t);
      append_hydration(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div0, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 2) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div0, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block$1(ctx) {
  let div;
  let t0_value = ctx[12] + "";
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, t0_value);
      t1 = claim_space(div_nodes);
      div_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t0_value !== (t0_value = ctx2[12] + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$5(ctx) {
  let t0;
  let t1;
  let if_block2_anchor;
  let current;
  let if_block0 = ctx[2] && create_if_block_2(ctx);
  let if_block1 = ctx[5] && ctx[3] && create_if_block_1(ctx);
  let if_block2 = ctx[1] && create_if_block$2(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t1 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      if_block2_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, if_block2_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[2]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_2(ctx2);
          if_block0.c();
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[5] && ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 40) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t1.parentNode, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (ctx2[1]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block$2(ctx2);
          if_block2.c();
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t0);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(t1);
      if (if_block2)
        if_block2.d(detaching);
      if (detaching)
        detach(if_block2_anchor);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let dag;
  let roots = [];
  let rootObj;
  let selectedTag = "ContactCard";
  let tagNode, esModule, props;
  let handleRootCIDChange;
  let saveToBrowser;
  onMount(async () => {
    const { createDag, createContactCard } = await __vitePreload(() => import("./lib-cc382c34.js"), true ? [] : void 0, import.meta.url);
    $$invalidate(0, dag = await createDag());
    dag.on("rootCID", (val) => handleRootCIDChange());
    if (typeof localStorage !== "undefined") {
      saveToBrowser = (key, value) => localStorage.setItem(key, value);
      const res = localStorage.getItem("ROOT_CID");
      if (res) {
        const cid = CID.asCID(res) || CID.parse(res);
        if (cid) {
          $$invalidate(0, dag.rootCID = cid, dag);
          $$invalidate(1, roots = [...roots, cid.toString()]);
          console.log("roots", roots);
          $$invalidate(2, rootObj = (await dag.get(cid)).value);
        }
      }
    }
    handleRootCIDChange = async () => {
      console.log("handleRootCIDChange", dag.rootCID.toString());
      if (!dag.rootCID)
        return;
      const cid = CID.asCID(dag.rootCID) || CID.parse(dag.rootCID);
      console.log("cid", cid);
      if (!cid)
        return;
      $$invalidate(2, rootObj = (await dag.get(cid)).value);
      if (saveToBrowser)
        saveToBrowser("ROOT_CID", cid.toString());
      $$invalidate(1, roots = [...roots, cid.toString()]);
      console.log("roots", roots);
    };
    let exists = false;
    try {
      exists = await dag.latest("ContactCard");
    } catch (error) {
      console.log("tag does not exist, create it");
    }
    if (!exists) {
      try {
        await createContactCard(dag);
        $$invalidate(0, dag);
      } catch (error) {
        console.log("error creating contact card");
      }
    } else {
      console.log("tag exists, load it");
    }
    try {
      $$invalidate(4, tagNode = await dag.latest("ContactCard"));
    } catch (error) {
      console.log("error loading tag");
    }
    try {
      $$invalidate(6, props = (await dag.latest("ContactCard", "data")).value || null);
    } catch (error) {
      console.log("No prop data, but thats ok");
    }
    try {
      $$invalidate(5, esModule = (await dag.latest("ContactCard", "compiled")).value);
    } catch (error) {
      console.log("No compiled module, thats an issue");
    }
  });
  const click_handler = (tag, e) => $$invalidate(3, selectedTag = tag);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(9, $$scope = $$props2.$$scope);
  };
  return [
    dag,
    roots,
    rootObj,
    selectedTag,
    tagNode,
    esModule,
    props,
    slots,
    click_handler,
    $$scope
  ];
}
class Repo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$5, safe_not_equal, {});
  }
}
function create_fragment$4(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "z-10 p-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      ctx[3](div);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      ctx[3](null);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { src: src2 } = $$props;
  let { props = null } = $$props;
  let target;
  const dispatch = createEventDispatcher();
  onMount(async () => {
    if (!src2)
      return;
    mountSrc({ text: src2, target, props });
  });
  async function mountSrc({ text: text2, target: target2, props: props2 }) {
    dispatch("target", target2);
    const blob = new Blob([text2], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const App = (await __vitePreload(() => import(
      /* @vite-ignore */
      url
    ), true ? [] : void 0, import.meta.url)).default;
    dispatch("ready", App);
    target2.innerHTML = "";
    const app = new App({ target: target2, props: props2 });
    if (url)
      URL.revokeObjectURL(url);
    dispatch("mounted", app);
    app.$on("change", (evt) => {
      dispatch("change", evt.detail);
    });
    return app;
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      target = $$value;
      $$invalidate(0, target);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("src" in $$props2)
      $$invalidate(1, src2 = $$props2.src);
    if ("props" in $$props2)
      $$invalidate(2, props = $$props2.props);
  };
  return [target, src2, props, div_binding];
}
class Mount extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$4, safe_not_equal, { src: 1, props: 2 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_if_block$1(ctx) {
  let div;
  let t;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      t = text("Peers\r\n		");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "Peers\r\n		");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "p-2 bg-neutral-900");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block(ctx) {
  let div;
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, t0_value);
      t1 = claim_space(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "m-1 p-1 flex flex-row items-left text-green-400 text-sm font-mono");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t0_value !== (t0_value = ctx2[1] + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$3(ctx) {
  let if_block_anchor;
  let if_block = ctx[0] && ctx[0].length && create_if_block$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] && ctx2[0].length) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { peers = [] } = $$props;
  $$self.$$set = ($$props2) => {
    if ("peers" in $$props2)
      $$invalidate(0, peers = $$props2.peers);
  };
  return [peers];
}
class Peers extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$3, safe_not_equal, { peers: 0 });
  }
}
const Icon_svelte_svelte_type_style_lang = "";
const Content_svelte_svelte_type_style_lang = "";
const ContextMenu_svelte_svelte_type_style_lang = "";
const Modal_svelte_svelte_type_style_lang = "";
const SideNav_svelte_svelte_type_style_lang = "";
const get_default_slot_changes = (dirty) => ({});
const get_default_slot_context = (ctx) => ({ hideNav: ctx[4] });
function create_if_block(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], get_default_slot_context);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "sidenav absolute top-0 left-0 h-[15%] w-0 z-30 bg-neutral-600 overflow-x-hidden pt-16 transition duration-500 svelte-18lepxh");
      toggle_class(div, "open", ctx[1]);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[5],
            !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(default_slot_template, ctx2[5], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      }
      if (dirty & 2) {
        toggle_class(div, "open", ctx2[1]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div4;
  let div3;
  let div0;
  let t0;
  let div1;
  let t1;
  let div2;
  let t2;
  let t3;
  let div5;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[0] && create_if_block(ctx);
  return {
    c() {
      div4 = element("div");
      div3 = element("div");
      div0 = element("div");
      t0 = space();
      div1 = element("div");
      t1 = space();
      div2 = element("div");
      t2 = space();
      if (if_block)
        if_block.c();
      t3 = space();
      div5 = element("div");
      this.h();
    },
    l(nodes) {
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      t0 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", { class: true });
      children(div1).forEach(detach);
      t1 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      children(div2).forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t2 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      t3 = claim_space(nodes);
      div5 = claim_element(nodes, "DIV", { class: true });
      children(div5).forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "bar1 svelte-18lepxh");
      attr(div1, "class", "bar2 svelte-18lepxh");
      attr(div2, "class", "bar3 svelte-18lepxh");
      attr(div3, "class", "inline-block svelte-18lepxh");
      attr(div4, "class", "flex absolute top-0 left-0 z-40 cursor-pointer m-6 opacity-90 w-auto svelte-18lepxh");
      toggle_class(div4, "change", ctx[1]);
      attr(div5, "class", "svelte-18lepxh");
      toggle_class(div5, "mask", ctx[1]);
    },
    m(target, anchor) {
      insert_hydration(target, div4, anchor);
      append_hydration(div4, div3);
      append_hydration(div3, div0);
      append_hydration(div3, t0);
      append_hydration(div3, div1);
      append_hydration(div3, t1);
      append_hydration(div3, div2);
      insert_hydration(target, t2, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, div5, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(div4, "keypress", ctx[2]),
          listen(div4, "click", ctx[2]),
          listen(div5, "keypress", ctx[3]),
          listen(div5, "click", ctx[3])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2) {
        toggle_class(div4, "change", ctx2[1]);
      }
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t3.parentNode, t3);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & 2) {
        toggle_class(div5, "mask", ctx2[1]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      if (detaching)
        detach(t2);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div5);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let ready;
  let navOpen;
  onMount(async () => {
    $$invalidate(0, ready = true);
  });
  function handleNav() {
    $$invalidate(1, navOpen = !navOpen);
  }
  function onClickOutside(event) {
    $$invalidate(1, navOpen = false);
  }
  function hideNav() {
    $$invalidate(1, navOpen = false);
  }
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [ready, navOpen, handleNav, onClickOutside, hideNav, $$scope, slots];
}
class SideNav extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {});
  }
}
function create_default_slot_1(ctx) {
  let section;
  let div2;
  let t0;
  let div0;
  let t1;
  let t2;
  let div1;
  let t3;
  let t4;
  let peers_1;
  let current;
  peers_1 = new Peers({ props: { peers: ctx[1] } });
  return {
    c() {
      section = element("section");
      div2 = element("div");
      t0 = text("My Stuff\r\n				");
      div0 = element("div");
      t1 = text("Username");
      t2 = space();
      div1 = element("div");
      t3 = text(ctx[0]);
      t4 = space();
      create_component(peers_1.$$.fragment);
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      div2 = claim_element(section_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      t0 = claim_text(div2_nodes, "My Stuff\r\n				");
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t1 = claim_text(div0_nodes, "Username");
      div0_nodes.forEach(detach);
      t2 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t3 = claim_text(div1_nodes, ctx[0]);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      t4 = claim_space(section_nodes);
      claim_component(peers_1.$$.fragment, section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "ml-2 text-sm");
      attr(div1, "class", "ml-2 text-xs font-mono");
      attr(div2, "class", "flex flex-col items-left");
      attr(section, "class", "flex z-50 flex-col h-full break-words break-all justify-left");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      append_hydration(section, div2);
      append_hydration(div2, t0);
      append_hydration(div2, div0);
      append_hydration(div0, t1);
      append_hydration(div2, t2);
      append_hydration(div2, div1);
      append_hydration(div1, t3);
      append_hydration(section, t4);
      mount_component(peers_1, section, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 1)
        set_data(t3, ctx2[0]);
      const peers_1_changes = {};
      if (dirty & 2)
        peers_1_changes.peers = ctx2[1];
      peers_1.$set(peers_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(peers_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(peers_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(section);
      destroy_component(peers_1);
    }
  };
}
function create_default_slot(ctx) {
  let mount;
  let current;
  mount = new Mount({
    props: {
      src: ctx[13],
      props: ctx[14]
    }
  });
  mount.$on("change", function() {
    if (is_function(ctx[15]))
      ctx[15].apply(this, arguments);
  });
  return {
    c() {
      create_component(mount.$$.fragment);
    },
    l(nodes) {
      claim_component(mount.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(mount, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const mount_changes = {};
      if (dirty & 8192)
        mount_changes.src = ctx[13];
      if (dirty & 16384)
        mount_changes.props = ctx[14];
      mount.$set(mount_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(mount.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mount.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(mount, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let walletmanager;
  let t0;
  let div0;
  let sidenav;
  let t1;
  let div2;
  let div1;
  let repo;
  let current;
  walletmanager = new WalletManager({});
  walletmanager.$on("Ed25519PublicKey", ctx[2]);
  sidenav = new SideNav({
    props: {
      $$slots: {
        default: [
          create_default_slot_1,
          ({ hideNav }) => ({ 16: hideNav }),
          ({ hideNav }) => hideNav ? 65536 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  repo = new Repo({
    props: {
      $$slots: {
        default: [
          create_default_slot,
          ({ esModule, props, handleChange }) => ({
            13: esModule,
            14: props,
            15: handleChange
          }),
          ({ esModule, props, handleChange }) => (esModule ? 8192 : 0) | (props ? 16384 : 0) | (handleChange ? 32768 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(walletmanager.$$.fragment);
      t0 = space();
      div0 = element("div");
      create_component(sidenav.$$.fragment);
      t1 = space();
      div2 = element("div");
      div1 = element("div");
      create_component(repo.$$.fragment);
      this.h();
    },
    l(nodes) {
      claim_component(walletmanager.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div0 = claim_element(nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(sidenav.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      t1 = claim_space(nodes);
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      claim_component(repo.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "text-white");
      attr(div1, "class", "flex-1 w-2/3 bg-neutral-700 text-neutral-200 pt-16");
      attr(div2, "class", "flex flex-row min-h-screen h-full");
    },
    m(target, anchor) {
      mount_component(walletmanager, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div0, anchor);
      mount_component(sidenav, div0, null);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
      mount_component(repo, div1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const sidenav_changes = {};
      if (dirty & 131075) {
        sidenav_changes.$$scope = { dirty, ctx: ctx2 };
      }
      sidenav.$set(sidenav_changes);
      const repo_changes = {};
      if (dirty & 188416) {
        repo_changes.$$scope = { dirty, ctx: ctx2 };
      }
      repo.$set(repo_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(walletmanager.$$.fragment, local);
      transition_in(sidenav.$$.fragment, local);
      transition_in(repo.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(walletmanager.$$.fragment, local);
      transition_out(sidenav.$$.fragment, local);
      transition_out(repo.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(walletmanager, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div0);
      destroy_component(sidenav);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div2);
      destroy_component(repo);
    }
  };
}
function handleMsg() {
}
function instance($$self, $$props, $$invalidate) {
  let Ed25519PublicKey;
  let connect;
  let username;
  let peers = /* @__PURE__ */ new Set();
  onMount(async () => {
    ({ connect } = await __vitePreload(() => import("./lib-cc382c34.js"), true ? [] : void 0, import.meta.url));
  });
  function keyConnect(e) {
    Ed25519PublicKey = e.detail;
    $$invalidate(0, username = getAddress(Ed25519PublicKey));
    connect({
      username,
      topic: "peerpiper",
      handleConnect,
      handleClose,
      handleMsg
    });
  }
  function handleConnect(peer) {
    console.log("handleConnect", peer);
    $$invalidate(1, peers = peers.add(peer.client_id));
  }
  function handleClose(peer) {
    console.log("handleClose", peer);
    $$invalidate(1, peers = peers.delete(peer.client_id));
  }
  return [username, peers, keyConnect];
}
class Demo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let demo;
  let current;
  demo = new Demo({});
  return {
    c() {
      create_component(demo.$$.fragment);
    },
    l(nodes) {
      claim_component(demo.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(demo, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(demo.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(demo.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(demo, detaching);
    }
  };
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export {
  CID as C,
  Page as P,
  fromString as a,
  baseX as b,
  commonjsGlobal as c,
  create as d,
  coerce as e,
  from as f,
  base32$1 as g,
  base58 as h,
  getDefaultExportFromCjs as i,
  decode$1 as j,
  base58btc as k,
  base32 as l,
  rfc4648 as r,
  toString as t
};
//# sourceMappingURL=_page-ca2722d0.js.map
