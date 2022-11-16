import { S as SvelteComponent, i as init, s as safe_not_equal, e as empty, b as insert_hydration, f as transition_in, g as group_outros, t as transition_out, d as check_outros, h as detach, H as createEventDispatcher, o as onMount, v as create_component, a as space, w as claim_component, c as claim_space, x as mount_component, y as destroy_component, B as create_slot, C as update_slot_base, D as get_all_dirty_from_scope, E as get_slot_changes, A as noop, k as element, q as text, l as claim_element, m as children, r as claim_text, n as attr, F as append_hydration, I as listen, u as set_data, J as getContext, K as identity, L as add_render_callback, M as create_bidirectional_transition, N as svg_element, O as claim_svg_element, P as destroy_each, Q as binding_callbacks, R as toggle_class, T as run_all, U as setContext, V as is_function } from "./index-8a0ef0c4.js";
import { _ as __vitePreload } from "./preload-helper-b21cceae.js";
const get_default_slot_changes$4 = (dirty) => ({
  wallet: dirty & 1,
  ownerAddress: dirty & 16,
  RSAPublicKey: dirty & 4,
  Ed25519PublicKey: dirty & 8
});
const get_default_slot_context$4 = (ctx) => ({
  wallet: ctx[0],
  ownerAddress: ctx[4],
  RSAPublicKey: ctx[2],
  Ed25519PublicKey: ctx[3]
});
function create_if_block$7(ctx) {
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
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], get_default_slot_context$4);
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
            !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, get_default_slot_changes$4),
            get_default_slot_context$4
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
function create_fragment$b(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block$7(ctx);
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
          if_block = create_if_block$7(ctx2);
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
function instance$a($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let wallet;
  let Web3WalletMenu;
  let RSAPublicKey;
  let Ed25519PublicKey;
  let ownerAddress;
  const dispatch = createEventDispatcher();
  onMount(async () => {
    $$invalidate(1, { Web3WalletMenu } = await __vitePreload(() => import("./index-f07c0202.js"), true ? ["./index-f07c0202.js","./preload-helper-b21cceae.js","./index-8a0ef0c4.js","..\\assets\\index-e42c8a49.css"] : void 0, import.meta.url), Web3WalletMenu);
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
    dispatch("wallet", { wallet });
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
    init(this, options, instance$a, create_fragment$b, safe_not_equal, {});
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof {} !== "undefined" ? {} : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  var f = n.default;
  if (typeof f == "function") {
    var a = function() {
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
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
var encode_1$1 = base64.encode = encode$2;
function decode$4(s) {
  return stdCoder.decode(s);
}
var decode_1 = base64.decode = decode$4;
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
function create_if_block$6(ctx) {
  let div8;
  let div7;
  let div0;
  let t0;
  let span;
  let t1;
  let t2;
  let div6;
  let div4;
  let div3;
  let div2;
  let h3;
  let t3;
  let t4;
  let div1;
  let p0;
  let t5;
  let t6;
  let p1;
  let t7;
  let t8;
  let div5;
  let button;
  let t9;
  let mounted;
  let dispose;
  return {
    c() {
      div8 = element("div");
      div7 = element("div");
      div0 = element("div");
      t0 = space();
      span = element("span");
      t1 = text("\u200B");
      t2 = space();
      div6 = element("div");
      div4 = element("div");
      div3 = element("div");
      div2 = element("div");
      h3 = element("h3");
      t3 = text("Error");
      t4 = space();
      div1 = element("div");
      p0 = element("p");
      t5 = text(ctx[0]);
      t6 = space();
      p1 = element("p");
      t7 = text(ctx[1]);
      t8 = space();
      div5 = element("div");
      button = element("button");
      t9 = text("OK");
      this.h();
    },
    l(nodes) {
      div8 = claim_element(nodes, "DIV", {
        class: true,
        "aria-labelledby": true,
        role: true,
        "aria-modal": true
      });
      var div8_nodes = children(div8);
      div7 = claim_element(div8_nodes, "DIV", { class: true });
      var div7_nodes = children(div7);
      div0 = claim_element(div7_nodes, "DIV", { class: true, "aria-hidden": true });
      children(div0).forEach(detach);
      t0 = claim_space(div7_nodes);
      span = claim_element(div7_nodes, "SPAN", { class: true, "aria-hidden": true });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, "\u200B");
      span_nodes.forEach(detach);
      t2 = claim_space(div7_nodes);
      div6 = claim_element(div7_nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div4 = claim_element(div6_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      h3 = claim_element(div2_nodes, "H3", { class: true, id: true });
      var h3_nodes = children(h3);
      t3 = claim_text(h3_nodes, "Error");
      h3_nodes.forEach(detach);
      t4 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      p0 = claim_element(div1_nodes, "P", { class: true });
      var p0_nodes = children(p0);
      t5 = claim_text(p0_nodes, ctx[0]);
      p0_nodes.forEach(detach);
      t6 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", { class: true });
      var p1_nodes = children(p1);
      t7 = claim_text(p1_nodes, ctx[1]);
      p1_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t8 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { class: true });
      var div5_nodes = children(div5);
      button = claim_element(div5_nodes, "BUTTON", { type: true, class: true });
      var button_nodes = children(button);
      t9 = claim_text(button_nodes, "OK");
      button_nodes.forEach(detach);
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      div7_nodes.forEach(detach);
      div8_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity");
      attr(div0, "aria-hidden", "true");
      attr(span, "class", "hidden sm:inline-block sm:align-middle sm:h-screen");
      attr(span, "aria-hidden", "true");
      attr(h3, "class", "text-lg leading-6 font-medium ");
      attr(h3, "id", "modal-title");
      attr(p0, "class", "text-sm ");
      attr(p1, "class", "text-sm ");
      attr(div1, "class", "mt-2");
      attr(div2, "class", "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-gray-800");
      attr(div3, "class", "sm:flex sm:items-start");
      attr(div4, "class", "px-4 pt-5 pb-4 sm:p-6 sm:pb-4");
      attr(button, "type", "button");
      attr(button, "class", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm");
      attr(div5, "class", "px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse");
      attr(div6, "class", "inline-block w-fit align-bottom bg-yellow-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full");
      attr(div7, "class", "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0");
      attr(div8, "class", "fixed z-10 inset-0 overflow-y-auto");
      attr(div8, "aria-labelledby", "modal-title");
      attr(div8, "role", "dialog");
      attr(div8, "aria-modal", "true");
    },
    m(target, anchor) {
      insert_hydration(target, div8, anchor);
      append_hydration(div8, div7);
      append_hydration(div7, div0);
      append_hydration(div7, t0);
      append_hydration(div7, span);
      append_hydration(span, t1);
      append_hydration(div7, t2);
      append_hydration(div7, div6);
      append_hydration(div6, div4);
      append_hydration(div4, div3);
      append_hydration(div3, div2);
      append_hydration(div2, h3);
      append_hydration(h3, t3);
      append_hydration(div2, t4);
      append_hydration(div2, div1);
      append_hydration(div1, p0);
      append_hydration(p0, t5);
      append_hydration(div1, t6);
      append_hydration(div1, p1);
      append_hydration(p1, t7);
      append_hydration(div6, t8);
      append_hydration(div6, div5);
      append_hydration(div5, button);
      append_hydration(button, t9);
      if (!mounted) {
        dispose = listen(button, "click", ctx[2]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 1)
        set_data(t5, ctx2[0]);
      if (dirty & 2)
        set_data(t7, ctx2[1]);
    },
    d(detaching) {
      if (detaching)
        detach(div8);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$a(ctx) {
  let if_block_anchor;
  let if_block = ctx[0] && create_if_block$6(ctx);
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
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$6(ctx2);
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
function instance$9($$self, $$props, $$invalidate) {
  let { error } = $$props;
  let { hint = "Are you connected to the network?" } = $$props;
  const click_handler = () => $$invalidate(0, error = null);
  $$self.$$set = ($$props2) => {
    if ("error" in $$props2)
      $$invalidate(0, error = $$props2.error);
    if ("hint" in $$props2)
      $$invalidate(1, hint = $$props2.hint);
  };
  return [error, hint, click_handler];
}
class Error$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$a, safe_not_equal, { error: 0, hint: 1 });
  }
}
function create_fragment$9(ctx) {
  var _a;
  let error_1;
  let t0;
  let button;
  let t1;
  let t2_value = ((_a = ctx[1]) == null ? void 0 : _a.length) == 0 ? "ed" : "";
  let t2;
  let t3;
  let t4_value = renderSize(ctx[5]()) + "";
  let t4;
  let t5;
  let button_disabled_value;
  let button_class_value;
  let current;
  let mounted;
  let dispose;
  error_1 = new Error$1({ props: { error: ctx[2] } });
  return {
    c() {
      create_component(error_1.$$.fragment);
      t0 = space();
      button = element("button");
      t1 = text("Publish");
      t2 = text(t2_value);
      t3 = text(" (");
      t4 = text(t4_value);
      t5 = text(")");
      this.h();
    },
    l(nodes) {
      claim_component(error_1.$$.fragment, nodes);
      t0 = claim_space(nodes);
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t1 = claim_text(button_nodes, "Publish");
      t2 = claim_text(button_nodes, t2_value);
      t3 = claim_text(button_nodes, " (");
      t4 = claim_text(button_nodes, t4_value);
      t5 = claim_text(button_nodes, ")");
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a2;
      button.disabled = button_disabled_value = !ctx[1] || ctx[3];
      attr(button, "class", button_class_value = "flex-0 w-fit -m-3 pl-4 p-2 shadow-lg rounded-r-lg text-white font-semibold select-none " + (ctx[0] == "saved" && ctx[1] && ((_a2 = ctx[1]) == null ? void 0 : _a2.length) > 0 && !ctx[3] ? "cursor-pointer bg-blue-500" : "cursor-not-allowed bg-gray-400"));
    },
    m(target, anchor) {
      mount_component(error_1, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, button, anchor);
      append_hydration(button, t1);
      append_hydration(button, t2);
      append_hydration(button, t3);
      append_hydration(button, t4);
      append_hydration(button, t5);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2, _b;
      const error_1_changes = {};
      if (dirty & 4)
        error_1_changes.error = ctx2[2];
      error_1.$set(error_1_changes);
      if ((!current || dirty & 2) && t2_value !== (t2_value = ((_a2 = ctx2[1]) == null ? void 0 : _a2.length) == 0 ? "ed" : ""))
        set_data(t2, t2_value);
      if (!current || dirty & 10 && button_disabled_value !== (button_disabled_value = !ctx2[1] || ctx2[3])) {
        button.disabled = button_disabled_value;
      }
      if (!current || dirty & 11 && button_class_value !== (button_class_value = "flex-0 w-fit -m-3 pl-4 p-2 shadow-lg rounded-r-lg text-white font-semibold select-none " + (ctx2[0] == "saved" && ctx2[1] && ((_b = ctx2[1]) == null ? void 0 : _b.length) > 0 && !ctx2[3] ? "cursor-pointer bg-blue-500" : "cursor-not-allowed bg-gray-400"))) {
        attr(button, "class", button_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(error_1, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function renderSize(value) {
  if (null == value || value == "") {
    return "0 Bytes";
  }
  const unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
  let index = 0;
  let srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  let size = srcsize / Math.pow(1024, index);
  size = size.toFixed(0);
  return size + unitArr[index];
}
function instance$8($$self, $$props, $$invalidate) {
  let { state = "saved" } = $$props;
  let { commits } = $$props;
  let { local = getContext("local") } = $$props;
  const ownerAddress = getContext("ownerAddress");
  const dispatch = createEventDispatcher();
  let ardag = null;
  let error = null;
  let publishing = false;
  onMount(async () => {
    const Buffer = await __vitePreload(() => import("./index-fcbc46b5.js").then((n) => n.i), true ? ["./index-fcbc46b5.js","./index-bfa8ea01.js"] : void 0, import.meta.url);
    window.Buffer = Buffer.Buffer;
    const { initializeArDag } = await __vitePreload(() => import("./index-f94963c4.js"), true ? ["./index-f94963c4.js","./base32-9ef16083.js","./index-fcbc46b5.js","./index-bfa8ea01.js","./events-4b10efcd.js"] : void 0, import.meta.url);
    const { post: bundlrPost } = await __vitePreload(() => import("./index-23828e7b.js"), true ? ["./index-23828e7b.js","./index-bfa8ea01.js","./index-2bba3d3e.js","./index-fcbc46b5.js","./events-4b10efcd.js"] : void 0, import.meta.url);
    const Arweave = (await __vitePreload(() => import("./index-2bba3d3e.js").then((n) => n.i), true ? ["./index-2bba3d3e.js","./index-bfa8ea01.js"] : void 0, import.meta.url)).default;
    let arweave;
    let post = null;
    if (local) {
      let mine;
      arweave = Arweave.init({
        host: "localhost",
        port: 1984,
        protocol: "http",
        timeout: 2e4,
        logging: false
      });
      try {
        await arweave.api.get(`/mint/${ownerAddress}/1000000000000000`);
        mine = async () => await arweave.api.get(`/mine`);
      } catch (err) {
        $$invalidate(2, error = err);
      }
      const doPost = arweave.transactions.post;
      const p = doPost.bind(arweave.transactions);
      post = async (tx) => {
        const resp = await p(tx);
        await mine();
        return resp;
      };
    } else {
      arweave = Arweave.init({});
      post = bundlrPost;
    }
    ardag = await initializeArDag({ arweave, post });
  });
  async function handlePublish(e) {
    if (publishing)
      return;
    $$invalidate(3, publishing = true);
    if (!commits || !commits.length)
      return;
    for (let i = 0; i < commits.length; i++) {
      const buffer = new Uint8Array(commits[i]);
      await ardag.persist({ buffer, tags: [] });
    }
    dispatch("published", true);
    $$invalidate(3, publishing = false);
  }
  function maxSize(arr = commits) {
    console.log("commits", { commits });
    if (!arr || !arr.length)
      return;
    const max = arr.reduce(
      (acc, curr) => {
        if (curr.length > acc)
          return curr.length;
        return acc;
      },
      0
    );
    return max;
  }
  $$self.$$set = ($$props2) => {
    if ("state" in $$props2)
      $$invalidate(0, state = $$props2.state);
    if ("commits" in $$props2)
      $$invalidate(1, commits = $$props2.commits);
    if ("local" in $$props2)
      $$invalidate(6, local = $$props2.local);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      if (commits)
        console.log({ commits });
    }
    if ($$self.$$.dirty & 2) {
      if (commits && commits.length)
        maxSize();
    }
  };
  return [state, commits, error, publishing, handlePublish, maxSize, local];
}
class Publish extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$9, safe_not_equal, { state: 0, commits: 1, local: 6 });
  }
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
  };
}
const get_default_slot_changes$3 = (dirty) => ({});
const get_default_slot_context$3 = (ctx) => ({ handleChange: ctx[5] });
function create_if_block$5(ctx) {
  let div;
  let publish;
  let div_transition;
  let current;
  publish = new Publish({
    props: {
      dag: ctx[1],
      state: ctx[2],
      commits: ctx[3]
    }
  });
  publish.$on("published", ctx[6]);
  return {
    c() {
      div = element("div");
      create_component(publish.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(publish.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "inline-block");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(publish, div, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const publish_changes = {};
      if (dirty & 2)
        publish_changes.dag = ctx[1];
      if (dirty & 4)
        publish_changes.state = ctx[2];
      if (dirty & 8)
        publish_changes.commits = ctx[3];
      publish.$set(publish_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(publish.$$.fragment, local);
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(
            div,
            fly,
            {
              delay: 0,
              duration: 300,
              x: -100,
              y: 0,
              opacity: 0.5,
              easing: quintOut
            },
            true
          );
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      transition_out(publish.$$.fragment, local);
      if (!div_transition)
        div_transition = create_bidirectional_transition(
          div,
          fly,
          {
            delay: 0,
            duration: 300,
            x: -100,
            y: 0,
            opacity: 0.5,
            easing: quintOut
          },
          false
        );
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(publish);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_fragment$8(ctx) {
  let div;
  let button;
  let t0_value = ctx[2] == "saving" ? "Saving" : ctx[2] == "saved" ? "Saved" : "Save";
  let t0;
  let button_class_value;
  let button_disabled_value;
  let t1;
  let t2;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[2] == "saved" && ctx[3].length > 0 && create_if_block$5(ctx);
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[10], get_default_slot_context$3);
  return {
    c() {
      div = element("div");
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      button = claim_element(div_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t0 = claim_text(button_nodes, t0_value);
      button_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      t2 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      this.h();
    },
    h() {
      attr(button, "class", button_class_value = "relative flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none " + (ctx[2] == "saved" ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-500"));
      button.disabled = button_disabled_value = !ctx[0] || ctx[2] == "saved";
      attr(div, "class", "relative");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, button);
      append_hydration(button, t0);
      append_hydration(div, t1);
      if (if_block)
        if_block.m(div, null);
      insert_hydration(target, t2, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[12]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & 4) && t0_value !== (t0_value = ctx2[2] == "saving" ? "Saving" : ctx2[2] == "saved" ? "Saved" : "Save"))
        set_data(t0, t0_value);
      if (!current || dirty & 4 && button_class_value !== (button_class_value = "relative flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none " + (ctx2[2] == "saved" ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-500"))) {
        attr(button, "class", button_class_value);
      }
      if (!current || dirty & 5 && button_disabled_value !== (button_disabled_value = !ctx2[0] || ctx2[2] == "saved")) {
        button.disabled = button_disabled_value;
      }
      if (ctx2[2] == "saved" && ctx2[3].length > 0) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 12) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1024)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[10],
            !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(default_slot_template, ctx2[10], dirty, get_default_slot_changes$3),
            get_default_slot_context$3
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      if (detaching)
        detach(t2);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function clearCache() {
  localStorage.removeItem("unpublishedBuffers");
}
function instance$7($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { tag } = $$props;
  let { tagNode } = $$props;
  let { data } = $$props;
  let { dag } = $$props;
  let { commits = null } = $$props;
  let state = "saved";
  let unpublishedBuffers = commits ? commits : [];
  onMount(async () => {
    const res = localStorage.getItem("unpublishedBuffers");
    if (res) {
      const arr = JSON.parse(res);
      $$invalidate(3, unpublishedBuffers = [...unpublishedBuffers, ...arr.map((b64str) => decode_1(b64str))]);
    } else if (unpublishedBuffers.length) {
      cache2(unpublishedBuffers);
    }
    console.log({ unpublishedBuffers });
  });
  async function handleSave(tagProp = "data") {
    console.log("Saving...", { tagProp }, { data }, { tagNode });
    $$invalidate(2, state = "saving");
    if (!data || !tagNode)
      return;
    const dataCid = await dag.tx.addData({ value: data });
    $$invalidate(7, tagNode[tagProp] = dataCid, tagNode);
    await dag.tx.add(tag, tagNode);
    const buffer = await dag.tx.commit();
    $$invalidate(3, unpublishedBuffers = [...unpublishedBuffers, new Uint8Array(buffer)]);
    console.log({ unpublishedBuffers });
    cache2(unpublishedBuffers);
    $$invalidate(1, dag);
    $$invalidate(2, state = "saved");
  }
  function handleChange(e) {
    console.log(e.detail);
    $$invalidate(0, data = e.detail);
    $$invalidate(2, state = null);
  }
  function handlePublished() {
    console.log("Published! Clear caches");
    $$invalidate(3, unpublishedBuffers = []);
    $$invalidate(3, unpublishedBuffers);
    clearCache();
    console.log({ unpublishedBuffers });
  }
  function cache2(buffers) {
    const b64Buffers = buffers.map((buffer) => encode_1$1(buffer));
    localStorage.setItem("unpublishedBuffers", JSON.stringify(b64Buffers));
  }
  const click_handler = (e) => handleSave();
  $$self.$$set = ($$props2) => {
    if ("tag" in $$props2)
      $$invalidate(8, tag = $$props2.tag);
    if ("tagNode" in $$props2)
      $$invalidate(7, tagNode = $$props2.tagNode);
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("dag" in $$props2)
      $$invalidate(1, dag = $$props2.dag);
    if ("commits" in $$props2)
      $$invalidate(9, commits = $$props2.commits);
    if ("$$scope" in $$props2)
      $$invalidate(10, $$scope = $$props2.$$scope);
  };
  return [
    data,
    dag,
    state,
    unpublishedBuffers,
    handleSave,
    handleChange,
    handlePublished,
    tagNode,
    tag,
    commits,
    $$scope,
    slots,
    click_handler
  ];
}
class Saver extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$8, safe_not_equal, {
      tag: 8,
      tagNode: 7,
      data: 0,
      dag: 1,
      commits: 9
    });
  }
}
const contactCard = 'function V() {\r\n}\r\nconst ht = (e) => e;\r\nfunction at(e) {\r\n  return e();\r\n}\r\nfunction G1() {\r\n  return /* @__PURE__ */ Object.create(null);\r\n}\r\nfunction F(e) {\r\n  e.forEach(at);\r\n}\r\nfunction j1(e) {\r\n  return typeof e == "function";\r\n}\r\nfunction s1(e, t) {\r\n  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";\r\n}\r\nlet y1;\r\nfunction I1(e, t) {\r\n  return y1 || (y1 = document.createElement("a")), y1.href = t, e === y1.href;\r\n}\r\nfunction G(e, t, n, o) {\r\n  if (e) {\r\n    const l = dt(e, t, n, o);\r\n    return e[0](l);\r\n  }\r\n}\r\nfunction dt(e, t, n, o) {\r\n  return e[1] && o ? function(l, s) {\r\n    for (const c in s)\r\n      l[c] = s[c];\r\n    return l;\r\n  }(n.ctx.slice(), e[1](o(t))) : n.ctx;\r\n}\r\nfunction I(e, t, n, o) {\r\n  if (e[2] && o) {\r\n    const l = e[2](o(n));\r\n    if (t.dirty === void 0)\r\n      return l;\r\n    if (typeof l == "object") {\r\n      const s = [], c = Math.max(t.dirty.length, l.length);\r\n      for (let r = 0; r < c; r += 1)\r\n        s[r] = t.dirty[r] | l[r];\r\n      return s;\r\n    }\r\n    return t.dirty | l;\r\n  }\r\n  return t.dirty;\r\n}\r\nfunction Q(e, t, n, o, l, s) {\r\n  if (l) {\r\n    const c = dt(t, n, o, s);\r\n    e.p(c, l);\r\n  }\r\n}\r\nfunction J(e) {\r\n  if (e.ctx.length > 32) {\r\n    const t = [], n = e.ctx.length / 32;\r\n    for (let o = 0; o < n; o++)\r\n      t[o] = -1;\r\n    return t;\r\n  }\r\n  return -1;\r\n}\r\nconst ut = typeof window < "u";\r\nlet vt = ut ? () => window.performance.now() : () => Date.now(), V1 = ut ? (e) => requestAnimationFrame(e) : V;\r\nconst u1 = /* @__PURE__ */ new Set();\r\nfunction pt(e) {\r\n  u1.forEach((t) => {\r\n    t.c(e) || (u1.delete(t), t.f());\r\n  }), u1.size !== 0 && V1(pt);\r\n}\r\nfunction k(e, t) {\r\n  e.appendChild(t);\r\n}\r\nfunction L1(e, t, n) {\r\n  const o = q1(e);\r\n  if (!o.getElementById(t)) {\r\n    const l = g("style");\r\n    l.id = t, l.textContent = n, mt(o, l);\r\n  }\r\n}\r\nfunction q1(e) {\r\n  if (!e)\r\n    return document;\r\n  const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;\r\n  return t && t.host ? t : e.ownerDocument;\r\n}\r\nfunction xt(e) {\r\n  const t = g("style");\r\n  return mt(q1(e), t), t.sheet;\r\n}\r\nfunction mt(e, t) {\r\n  return k(e.head || e, t), t.sheet;\r\n}\r\nfunction j(e, t, n) {\r\n  e.insertBefore(t, n || null);\r\n}\r\nfunction w(e) {\r\n  e.parentNode.removeChild(e);\r\n}\r\nfunction g(e) {\r\n  return document.createElement(e);\r\n}\r\nfunction C1(e) {\r\n  return document.createElementNS("http://www.w3.org/2000/svg", e);\r\n}\r\nfunction S1(e) {\r\n  return document.createTextNode(e);\r\n}\r\nfunction B() {\r\n  return S1(" ");\r\n}\r\nfunction R(e, t, n, o) {\r\n  return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);\r\n}\r\nfunction h(e, t, n) {\r\n  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);\r\n}\r\nfunction Q1(e, t, n) {\r\n  e.setAttributeNS("http://www.w3.org/1999/xlink", t, n);\r\n}\r\nfunction J1(e, t) {\r\n  e.value = t == null ? "" : t;\r\n}\r\nfunction p1(e, t, n, o) {\r\n  n === null ? e.style.removeProperty(t) : e.style.setProperty(t, n, o ? "important" : "");\r\n}\r\nfunction ft(e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {\r\n  const l = document.createEvent("CustomEvent");\r\n  return l.initCustomEvent(e, n, o, t), l;\r\n}\r\nconst M1 = /* @__PURE__ */ new Map();\r\nlet h1, b1 = 0;\r\nfunction W1(e, t, n, o, l, s, c, r = 0) {\r\n  const d = 16.666 / o;\r\n  let u = `{\r\n`;\r\n  for (let b = 0; b <= 1; b += d) {\r\n    const z = t + (n - t) * s(b);\r\n    u += 100 * b + `%{${c(z, 1 - z)}}\r\n`;\r\n  }\r\n  const i = u + `100% {${c(n, 1 - n)}}\r\n}`, a = `__svelte_${function(b) {\r\n    let z = 5381, L = b.length;\r\n    for (; L--; )\r\n      z = (z << 5) - z ^ b.charCodeAt(L);\r\n    return z >>> 0;\r\n  }(i)}_${r}`, p = q1(e), { stylesheet: f, rules: C } = M1.get(p) || function(b, z) {\r\n    const L = { stylesheet: xt(z), rules: {} };\r\n    return M1.set(b, L), L;\r\n  }(p, e);\r\n  C[a] || (C[a] = !0, f.insertRule(`@keyframes ${a} ${i}`, f.cssRules.length));\r\n  const x = e.style.animation || "";\r\n  return e.style.animation = `${x ? `${x}, ` : ""}${a} ${o}ms linear ${l}ms 1 both`, b1 += 1, a;\r\n}\r\nfunction m1(e) {\r\n  h1 = e;\r\n}\r\nfunction Z1() {\r\n  const e = function() {\r\n    if (!h1)\r\n      throw new Error("Function called outside component initialization");\r\n    return h1;\r\n  }();\r\n  return (t, n, { cancelable: o = !1 } = {}) => {\r\n    const l = e.$$.callbacks[t];\r\n    if (l) {\r\n      const s = ft(t, n, { cancelable: o });\r\n      return l.slice().forEach((c) => {\r\n        c.call(e, s);\r\n      }), !s.defaultPrevented;\r\n    }\r\n    return !0;\r\n  };\r\n}\r\nfunction $t(e, t) {\r\n  const n = e.$$.callbacks[t.type];\r\n  n && n.slice().forEach((o) => o.call(this, t));\r\n}\r\nconst d1 = [], D = [], z1 = [], A1 = [], gt = Promise.resolve();\r\nlet P1 = !1;\r\nfunction l1(e) {\r\n  z1.push(e);\r\n}\r\nfunction e1(e) {\r\n  A1.push(e);\r\n}\r\nconst E1 = /* @__PURE__ */ new Set();\r\nlet a1, w1 = 0;\r\nfunction X1() {\r\n  const e = h1;\r\n  do {\r\n    for (; w1 < d1.length; ) {\r\n      const t = d1[w1];\r\n      w1++, m1(t), yt(t.$$);\r\n    }\r\n    for (m1(null), d1.length = 0, w1 = 0; D.length; )\r\n      D.pop()();\r\n    for (let t = 0; t < z1.length; t += 1) {\r\n      const n = z1[t];\r\n      E1.has(n) || (E1.add(n), n());\r\n    }\r\n    z1.length = 0;\r\n  } while (d1.length);\r\n  for (; A1.length; )\r\n    A1.pop()();\r\n  P1 = !1, E1.clear(), m1(e);\r\n}\r\nfunction yt(e) {\r\n  if (e.fragment !== null) {\r\n    e.update(), F(e.before_update);\r\n    const t = e.dirty;\r\n    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(l1);\r\n  }\r\n}\r\nfunction N1(e, t, n) {\r\n  e.dispatchEvent(ft(`${t ? "intro" : "outro"}${n}`));\r\n}\r\nconst k1 = /* @__PURE__ */ new Set();\r\nlet U;\r\nfunction R1() {\r\n  U = { r: 0, c: [], p: U };\r\n}\r\nfunction O1() {\r\n  U.r || F(U.c), U = U.p;\r\n}\r\nfunction $(e, t) {\r\n  e && e.i && (k1.delete(e), e.i(t));\r\n}\r\nfunction y(e, t, n, o) {\r\n  if (e && e.o) {\r\n    if (k1.has(e))\r\n      return;\r\n    k1.add(e), U.c.push(() => {\r\n      k1.delete(e), o && (n && e.d(1), o());\r\n    }), e.o(t);\r\n  } else\r\n    o && o();\r\n}\r\nconst wt = { duration: 0 };\r\nfunction Y1(e, t, n, o) {\r\n  let l = t(e, n), s = o ? 0 : 1, c = null, r = null, d = null;\r\n  function u() {\r\n    d && function(p, f) {\r\n      const C = (p.style.animation || "").split(", "), x = C.filter(f ? (z) => z.indexOf(f) < 0 : (z) => z.indexOf("__svelte") === -1), b = C.length - x.length;\r\n      b && (p.style.animation = x.join(", "), b1 -= b, b1 || V1(() => {\r\n        b1 || (M1.forEach((z) => {\r\n          const { ownerNode: L } = z.stylesheet;\r\n          L && w(L);\r\n        }), M1.clear());\r\n      }));\r\n    }(e, d);\r\n  }\r\n  function i(p, f) {\r\n    const C = p.b - s;\r\n    return f *= Math.abs(C), { a: s, b: p.b, d: C, duration: f, start: p.start, end: p.start + f, group: p.group };\r\n  }\r\n  function a(p) {\r\n    const { delay: f = 0, duration: C = 300, easing: x = ht, tick: b = V, css: z } = l || wt, L = { start: vt() + f, b: p };\r\n    p || (L.group = U, U.r += 1), c || r ? r = L : (z && (u(), d = W1(e, s, p, C, f, x, z)), p && b(0, 1), c = i(L, C), l1(() => N1(e, p, "start")), function(K) {\r\n      let W;\r\n      u1.size === 0 && V1(pt), new Promise((A) => {\r\n        u1.add(W = { c: K, f: A });\r\n      });\r\n    }((K) => {\r\n      if (r && K > r.start && (c = i(r, C), r = null, N1(e, c.b, "start"), z && (u(), d = W1(e, s, c.b, c.duration, 0, x, l.css))), c) {\r\n        if (K >= c.end)\r\n          b(s = c.b, 1 - s), N1(e, c.b, "end"), r || (c.b ? u() : --c.group.r || F(c.group.c)), c = null;\r\n        else if (K >= c.start) {\r\n          const W = K - c.start;\r\n          s = c.a + c.d * x(W / c.duration), b(s, 1 - s);\r\n        }\r\n      }\r\n      return !(!c && !r);\r\n    }));\r\n  }\r\n  return { run(p) {\r\n    j1(l) ? (a1 || (a1 = Promise.resolve(), a1.then(() => {\r\n      a1 = null;\r\n    })), a1).then(() => {\r\n      l = l(), a(p);\r\n    }) : a(p);\r\n  }, end() {\r\n    u(), c = r = null;\r\n  } };\r\n}\r\nfunction n1(e, t, n) {\r\n  const o = e.$$.props[t];\r\n  o !== void 0 && (e.$$.bound[o] = n, n(e.$$.ctx[o]));\r\n}\r\nfunction P(e) {\r\n  e && e.c();\r\n}\r\nfunction E(e, t, n, o) {\r\n  const { fragment: l, on_mount: s, on_destroy: c, after_update: r } = e.$$;\r\n  l && l.m(t, n), o || l1(() => {\r\n    const d = s.map(at).filter(j1);\r\n    c ? c.push(...d) : F(d), e.$$.on_mount = [];\r\n  }), r.forEach(l1);\r\n}\r\nfunction N(e, t) {\r\n  const n = e.$$;\r\n  n.fragment !== null && (F(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);\r\n}\r\nfunction c1(e, t, n, o, l, s, c, r = [-1]) {\r\n  const d = h1;\r\n  m1(e);\r\n  const u = e.$$ = { fragment: null, ctx: null, props: s, update: V, not_equal: l, bound: G1(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(t.context || (d ? d.$$.context : [])), callbacks: G1(), dirty: r, skip_bound: !1, root: t.target || d.$$.root };\r\n  c && c(u.root);\r\n  let i = !1;\r\n  if (u.ctx = n ? n(e, t.props || {}, (a, p, ...f) => {\r\n    const C = f.length ? f[0] : p;\r\n    return u.ctx && l(u.ctx[a], u.ctx[a] = C) && (!u.skip_bound && u.bound[a] && u.bound[a](C), i && function(x, b) {\r\n      x.$$.dirty[0] === -1 && (d1.push(x), P1 || (P1 = !0, gt.then(X1)), x.$$.dirty.fill(0)), x.$$.dirty[b / 31 | 0] |= 1 << b % 31;\r\n    }(e, a)), p;\r\n  }) : [], u.update(), i = !0, F(u.before_update), u.fragment = !!o && o(u.ctx), t.target) {\r\n    if (t.hydrate) {\r\n      const a = function(p) {\r\n        return Array.from(p.childNodes);\r\n      }(t.target);\r\n      u.fragment && u.fragment.l(a), a.forEach(w);\r\n    } else\r\n      u.fragment && u.fragment.c();\r\n    t.intro && $(e.$$.fragment), E(e, t.target, t.anchor, t.customElement), X1();\r\n  }\r\n  m1(d);\r\n}\r\nclass r1 {\r\n  $destroy() {\r\n    N(this, 1), this.$destroy = V;\r\n  }\r\n  $on(t, n) {\r\n    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);\r\n    return o.push(n), () => {\r\n      const l = o.indexOf(n);\r\n      l !== -1 && o.splice(l, 1);\r\n    };\r\n  }\r\n  $set(t) {\r\n    var n;\r\n    this.$$set && (n = t, Object.keys(n).length !== 0) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);\r\n  }\r\n}\r\nfunction bt(e) {\r\n  let t, n, o, l;\r\n  const s = e[5].default, c = G(s, e, e[4], null);\r\n  return { c() {\r\n    t = g("span"), c && c.c(), h(t, "contenteditable", ""), e[0] === void 0 && l1(() => e[7].call(t));\r\n  }, m(r, d) {\r\n    j(r, t, d), c && c.m(t, null), e[6](t), e[0] !== void 0 && (t.textContent = e[0]), n = !0, o || (l = [R(t, "input", e[7]), R(t, "keydown", e[2]), R(t, "blur", e[2])], o = !0);\r\n  }, p(r, [d]) {\r\n    c && c.p && (!n || 16 & d) && Q(c, s, r, r[4], n ? I(s, r[4], d, null) : J(r[4]), null), 1 & d && r[0] !== t.textContent && (t.textContent = r[0]);\r\n  }, i(r) {\r\n    n || ($(c, r), n = !0);\r\n  }, o(r) {\r\n    y(c, r), n = !1;\r\n  }, d(r) {\r\n    r && w(t), c && c.d(r), e[6](null), o = !1, F(l);\r\n  } };\r\n}\r\nfunction zt(e, t, n) {\r\n  let { $$slots: o = {}, $$scope: l } = t;\r\n  const s = Z1();\r\n  let c, { item: r } = t, { options: d = { singleLine: !0 } } = t;\r\n  return e.$$set = (u) => {\r\n    "item" in u && n(0, r = u.item), "options" in u && n(3, d = u.options), "$$scope" in u && n(4, l = u.$$scope);\r\n  }, e.$$.update = () => {\r\n    1 & e.$$.dirty && r && s("change", { item: r });\r\n  }, [r, c, (u) => {\r\n    u.keyCode === 13 && d.singleLine && (u.preventDefault(), c.blur());\r\n  }, d, l, o, function(u) {\r\n    D[u ? "unshift" : "push"](() => {\r\n      c = u, n(1, c);\r\n    });\r\n  }, function() {\r\n    r = this.textContent, n(0, r);\r\n  }];\r\n}\r\nclass o1 extends r1 {\r\n  constructor(t) {\r\n    super(), c1(this, t, zt, bt, s1, { item: 0, options: 3 });\r\n  }\r\n}\r\nfunction kt(e) {\r\n  let t;\r\n  return { c() {\r\n    t = g("div"), t.innerHTML = \'<svg><symbol id="avatar" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"></path></symbol><symbol id="address" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M412 414a111 111 0 0 1 90-77v-40h31c7 0 13-6 13-13v-15c0-5-2-9-7-11L355 153c-4-2-8-2-12 0l-65 37v-13c0-5-4-9-9-9h-29c-5 0-8 4-8 9v39l-74 42c-4 2-7 7-7 11v15c0 7 6 13 13 13h31v180c0 12 9 21 20 21h203c-13-25-15-56-6-84z"></path><path d="M592 412a81 81 0 0 0-109-36 82 82 0 0 0-36 109l61 108c5 9 18 9 23 0l61-108c12-22 12-49 0-73zm-73 72a35 35 0 1 1 0-70 35 35 0 1 1 0 70z"></path></symbol><symbol id="email" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="m582.1 312.4-197.5-128c-4.3-2.8-10-2.8-14.4 0l-199 128c-3.8 2.4-7.8 6.6-7.8 11v230.3c0 7.3 9.3 15.6 16.6 15.6h394.5c7.3 0 14.1-8.3 14.1-15.6V323.4c0-4.4-2.7-8.6-6.4-11zm-385 35.2 113 73.3-113 103zm131.8 88 41.2 26.8a13.2 13.2 0 0 0 14.3 0l41.1-26.8 115 104.7H214zM451.5 421l113-73.3V524zm-74.3-209.8 173.1 112.3-173 112.3-173.1-112.3zm0 200.6c20.7 0 40.9-7.3 56.7-20.6A13.2 13.2 0 0 0 417 371a62 62 0 1 1 22.2-47.5c0 6-4.9 10.9-10.8 10.9a11 11 0 0 1-10.9-10v-.9a40.3 40.3 0 1 0-12.3 29 37 37 0 0 0 60.3-29 88.4 88.4 0 1 0-88.3 88.4zm0-74.3a14 14 0 1 1 0-28 14 14 0 0 1 0 28z"></path></symbol><symbol id="phone" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path fill-rule="evenodd" d="m587 561-3 3c-96 96-241-7-315-81S92 264 188 168l3-3 107 106-13 14a39 39 0 0 0-5 49 503 503 0 0 0 138 138c16 11 36 9 49-5l14-13zm-92-118 104 103c7-14 4-33-8-45l-51-51a39 39 0 0 0-45-7zM206 153l103 104c7-15 5-33-7-45l-51-51a39 39 0 0 0-45-8z"></path></symbol><symbol id="arrow-left" class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></symbol><symbol id="arrow-right" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></symbol><symbol id="arrow-up" class="icon" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></symbol><symbol id="arrow-down" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></symbol><symbol id="check" class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></symbol><symbol id="close" class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol><symbol id="download" class="icon" viewBox="0 0 24 24"><path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></symbol><symbol id="edit" class="icon" viewBox="0 0 24 24"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></symbol><symbol id="github" class="icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z" fill="currentColor" stroke="none"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z" fill="currentColor" stroke="none"></path></symbol><symbol id="git-branch" class="icon" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></symbol><symbol id="log-in" class="icon" viewBox="0 0 24 24"><path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></symbol><symbol id="maximize" class="icon" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></symbol><symbol id="maximize-2" class="icon" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></symbol><symbol id="menu" class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol><symbol id="message-square" class="icon" viewBox="0 0 24 24"><g transform="translate(0, 1)"><path d="M16.5 19H11V15H18V11H22V19H19.5L18 20.5L16.5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 3H18V15H8.5L6.5 17L4.5 15H2V3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 11H9" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 7H12" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></g></symbol><symbol id="minus" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="plus" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="save" class="icon" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></symbol><symbol id="link" class="icon" viewBox="0 0 24 24"><path d="M9,7L6,7A2 2 0 0 0 6,17L9,17"></path><path d="M15,7L18,7A2 2 0 0 1 18,17L15,17"></path><path d="M7,12L17,12"></path></symbol><symbol id="chevron" class="icon" viewBox="0 0 24 24"><path d="M2,7 L12,17 L20,7"></path></symbol><symbol id="delete" class="icon" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M22 4.2h-5.6L15 1.6c-.1-.2-.4-.4-.7-.4H9.6c-.2 0-.5.2-.6.4L7.6 4.2H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.8V22c0 .4.3.8.8.8h15c.4 0 .8-.3.8-.8V5.8H22c.4 0 .8-.3.8-.8s-.4-.8-.8-.8zM10.8 16.5c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5zm4 0c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5z"></path></symbol><symbol id="scanQR" class="icon" width="100%" height="100%" viewBox="0 0 760 760"><path d="M684 630c-31-34-9-38-2-84 7-34 13-75-2-123l-34-64c-22-39-51-89-58-117v-2c-6-24-9-43-9-60-2-22-4-35-20-41h-2c-11-3-22-5-33 2V59c0-22-20-41-43-41H205c-25 0-42 19-42 41v49s-29-26-49-30c-5 0-21 2-32 13a44 44 0 0 0-11 43c2 11 31 50 65 69 7 7 15 11 27 15v3h-5c-49 4-69 64-31 94-34 20-34 65-2 87a54 52 0 0 0 38 92v72c0 23 17 62 42 62h89c13 30 25 41 69 50h7c11 4 31 8 47 6l2 2 7 13c6 11 11 22 13 35 2 6 9 11 16 9 6-3 11-9 9-16-3-15-9-28-16-38l-9-13c-2-7-4-9-11-13l-2-2h-9c-11 2-31-3-43-5l-6-2c-32-6-34-4-47-26h160c23 0 43-17 43-41 0 0-20-60-18-86s24-65 24-65l18-30c9-24-4-47-18-78l-9-15c-11-23-20-47-20-75-2-11 5-41 20-63 7-8 16-19 29-17l5 24c0 17 2 39 11 64 7 33 34 82 58 123l33 63c12 41 7 78 0 112-6 45-31 58 9 101 12 5 20-4 18-15zM205 41h276c9 0 18 9 18 18v19H187V59c0-9 7-18 18-18zm-58 143c-18-11-51-48-51-54-3-7-3-17 4-22 5-4 14-4 16-6 4 0 47 30 47 30v58zm11 60a30 29 0 1 1 0 58 30 29 0 0 1 0-58zm0 145a30 29 0 1 1 0-58 30 29 0 0 1 0 58zm-29 54a30 29 0 1 1 60 0 30 29 0 0 1-60 0zm85 0c0-18-9-33-22-41 31-22 31-67-3-87 34-21 34-69-2-88V102h312v62c-15 26-24 59-22 76 0 30 11 58 22 82 31 267-67 211-312 211v-45c16-9 27-26 27-45zm267 161H205c-11 0-18-28-18-38v-9h312v9c0 10-9 38-18 38z"></path><path d="m306 191-2 18v18h5c4 0 4 2 4 3 1 4 0 5-4 5-5 0-5 0-5 10 0 8 0 8 5 8 4 0 5-1 5-5l3-3c5 0 5 0 5 13 2 13 2 13 5 13 4 2 5 0 5-3s2-5 5-5 3 0 3-5 0-5 5-5 5 0 5-3c0-5 0-5-5-5-3 0-5 0-5 5 0 3 0 3-3 3-5 0-5 0-5-18l-1-16-4-2c-3 0-5-1-5-5l-3-3c-3 0-5-2-5-10s-1-8-3-10z"></path><path d="m352 191-2 5c0 3 0 3-8 3-10 0-10 0-10 5 0 3 0 5 5 5 3 0 3 0 3 13v13h18v9c0 9 0 9 5 9h5v-26h10c8 0 8 0 8-5s0-5-8-5c-10 0-10 0-10-5 0-3 0-3-5-3s-5 0-5 3c0 4 2 5 5 5 5 0 5 2 5 5 0 5 0 5-5 5-3 0-5-2-5-5s-1-5-4-5c-4 0-4 0-4-10 0-8 0-8 5-8 3 0 3 0 3-5-1-3-4-6-6-3zm26 2c-1 5 0 6 5 6 3 0 3 0 3-5-1-5-8-6-9-1zm-146 29v31h62v-62h-62Zm54 0v23h-46v-46h46z"></path><path d="M250 222v13h26v-26h-26Zm146 0v31h63v-62h-63zm54 0v23h-46v-46h46z"></path><path d="M414 222v13h27v-26h-27zm-37 15v10l4 6c5 0 5 0 5-8 0-10 0-10-3-10zm-25 18-2 5c0 2 2 3 5 3s3 0 3-5c-1-3-4-6-6-3zm-122 10v10l5 6c5 0 5 2 5 5 0 5 0 5-5 5h-5v26h20v5c0 5 0 5 5 5 3 0 3 0 3-5 0-3-1-5-5-5l-3-3c0-3-1-5-5-5-5 0-5 0-5-10 0-8 0-8 5-8s5 0 5 5c0 12 0 13 5 13 3 0 3 2 3 5s2 3 5 3c5 0 5 0 5-3s-1-5-5-5c-5 0-5 0-5-10v-8h10c8 0 8 0 8 5 0 3 2 3 5 3 5 0 5 0 5 5s0 5-5 5-5 0-5 10c0 8 0 8-3 8s-5 2-5 4c0 4 5 6 13 4 4 0 5-1 5-4 0-2 2-4 5-4s3 2 3 5 2 3 15 3c5 0 5 0 5 5s0 5 5 5c3 0 3 0 3 10 0 8 0 8 5 8h5v-13c2-13 2-13 5-15 2 0 3-1 3-4 0-4 2-4 5-4 5 0 5 0 5 5s8 5 8 0c2-3 2-3 10-5 9 0 9 0 9-5s0-5-10-5c-9 0-9 0-9-3s2-5 5-5c4 0 5-1 5-5 0-3 0-5-5-5-3 0-5-1-5-5 0-1 0-3 5-3 4-1 5-1 5-10 0-8 0-8-5-8h-8c-5 0-5 0-5 8-1 9-1 9-5 10-3 0-5 2-5 5 0 2 0 3-3 3-5 0-5 0-5 5s0 5-5 5c-3 0-5 0-5 3 0 4 0 5-3 5-5 0-5 0-5 5 0 4 0 5 5 5 3 0 3 0 3 4 0 6-8 6-8 1-1-3-1-5-10-5-10 0-10 0-10-5s0-5-3-5-5-1-5-5c0-3 0-3 10-3 8 0 8 0 8 5 0 3 0 3 5 3 7-1 7-6 0-8-5 0-5 0-5-10 0-8 0-8 5-8 4 0 5 2 5 5 0 5 8 5 8 0 0-3 2-5 5-5 4 0 4-1 4-5 1-3 0-3-14-5-13 0-13 0-13-3 0-5 0-5-5-5s-5 0-5 3c0 4 2 5 5 5 5 0 5 2 5 5 0 5 0 5-5 5s-5 0-5-5v-5h-36v-3c0-7-8-7-8-2 0 4-1 5-5 5-5 0-5 0-5-3s2-5 5-5c4 0 5-2 5-5s-1-3-10-5zm64 29c0 5 0 5-3 5s-5 0-5-3 2-5 5-5 3 2 3 5zm56 10c0 4-1 5-5 5-3 0-5 2-5 5 0 2 0 3-3 3s-5 0-5-3 2-5 5-5 3 0 3-5 0-5 5-5c4 0 4 2 4 5z"></path><path d="M268 268c2 3 2 3 13 3 12 0 13 0 13-3v-5h-26Zm74-3c-2 2-2 6 2 6 3 2 6 0 6-3-1-5-6-6-8-3zm35 2c0 3 3 6 6 6l3-6c0-4 0-4-3-4zm29-2c-2 2-2 6 2 6 3 2 6 0 6-3-1-5-6-6-8-3zm16 8c0 8 0 8-4 8s-4 0-4 5c0 4 2 5 5 5 2 0 3-1 3-5 0-5 2-5 5-5 4 0 5 0 5-3 0-5 0-5 10-5 8 0 8 0 8 3 0 4-1 5-5 5-3 0-4 2-4 5 0 4-2 5-5 5-2 0-4 2-4 5s2 3 4 3c3 0 5 2 5 5 0 4 1 5 4 5 4 0 5 2 5 5s2 3 5 3h5v-52l-19-2h-19zm-36 5c0 3 0 3-3 3-5 0-6 2-6 7 3 5 8 3 9-2 0-3 2-5 5-5 4 0 5-1 5-5 0-3 0-3-5-3s-5 0-5 3zm10 26c0 13 0 13 5 13 3 0 3 0 3-13s0-13-3-13c-5 0-5 0-5 13zm28 7-2 3c0 2 2 3 5 3 5 0 5 0 5-5 0-3 0-3-3-3zm-8 8-2 5c0 2 2 3 5 3s3 0 3-5c-1-3-4-6-6-3zm-30 12c0 3-1 4-5 4s-4 2-4 15 0 13-4 13c-5 0-5 0-5 5s0 5-8 5c-10 0-10 0-10 4 0 3 2 4 5 4s3 0 3 5 0 5-3 5-5-1-5-5c0-3-1-5-5-5-3 0-5 2-5 5 0 4-1 5-3 5-3 0-5-1-5-5 0-3-1-5-5-5-3 0-5 2-5 5 0 4-1 5-5 5s-4 8 0 8 5 2 5 5c0 5 0 5-3 5s-5-1-5-5c0-3-1-5-5-5-3 2-3 2-3 10v10h8c7 0 8-1 8-5 0-5 0-5 10-5 8 0 8 0 8 5 2 4 2 4 10 5h8v-10c2-8 2-10 5-10 4 0 5-1 5-4 0-4 2-4 4-4 5 0 5 0 5 8 1 9 1 9 4 10 5 0 5 0 5-8v-10h15c13 0 13 0 13 4 0 3-1 4-5 4-3 0-3 2-3 10v10h54v-10c0-8-1-8-5-8-3 0-5 0-5 3 0 5-1 5-5 5-3 0-4-1-4-5 0-5 0-5 4-5s5 0 5-3 2-5 5-5c4 0 4-1 4-5 0-3 0-3-9-3h-9v16h-10c-9 0-9 0-9-3s-1-5-4-5c-4 0-4 0-4-5 0-3 0-5 4-5 3 0 4 0 4-3 0-5 0-5 19-5l18-1v-7l-18-2c-19 0-19 0-19-3s2-5 5-5c4 0 5-1 5-5 0-5 0-5-5-5-3 0-5-1-5-5-1-3-1-3-9-5-9 0-9 0-9-4s0-4-9-4-9 0-9 4zm28 27v15h-26l-2-15v-13h14l14 2v13zm-37 20c0 3 0 3-4 3-3 0-5 0-5-3s2-5 5-5c4 0 4 2 4 5zm-27 26c0 5 0 5-5 5s-5 0-5-3c0-5 2-7 7-7 2 0 3 2 3 5z"></path><path d="M396 360c0 3 2 3 5 3s3 0 3-3 0-5-3-5-5 2-5 5zm36-28c0 3 2 3 5 3 4 0 4 0 4-3s0-5-4-5c-3 0-5 2-5 5zm-202 5c-1 7 2 8 10 8 9 0 10-1 10-5 0-3-1-3-10-5zm30 0-2 5c0 3 0 3 5 3 4 0 5-1 5-3 0-5-5-8-8-5zm28 0-2 5c0 2 2 3 5 3s3 0 3-5c0-3-4-6-6-3zm54 0c-3 2-2 8 3 8 4 0 5-1 5-3 0-3-1-7-5-7zm108 0v10c2 7 2 7 5 7 4 1 5 0 5-9 0-8-1-8-5-10zm-146 13c2 5 9 7 10 2 0-5-1-7-6-7-4 0-4 0-4 5zm46 0c0 4 2 4 5 4 2 0 3 0 3-4 0-5 0-5-4-5s-4 0-4 5zm-118 36v32h62v-63h-62Zm54 0v23h-46v-46h46z"></path><path d="M250 386v13h26v-26h-26Zm54-13c0 8 0 8 5 8 4-1 4-1 4-9 1-7 0-7-4-9-5 0-5 0-5 10zm36-8c-1 5 2 8 5 8 4 0 5-1 5-5 0-3-1-5-5-5zm-8 13c0 3 2 3 5 3s3 0 3-3 0-5-3-5-5 2-5 5zm90 5c-1 5 2 8 5 8 4 0 5-1 5-5 0-3-1-5-5-5zm-54 31c0 4 2 5 5 5 4 0 4 0 4-5s0-5-5-5c-4 0-4 0-4 5z"></path></symbol></svg>\', p1(t, "display", "none");\r\n  }, m(n, o) {\r\n    j(n, t, o);\r\n  }, p: V, i: V, o: V, d(n) {\r\n    n && w(t);\r\n  } };\r\n}\r\nclass jt extends r1 {\r\n  constructor(t) {\r\n    super(), c1(this, t, null, kt, s1, {});\r\n  }\r\n}\r\nfunction Ct(e) {\r\n  L1(e, "svelte-wxgj7p", ".icon.svelte-wxgj7p{position:relative;overflow:hidden;vertical-align:middle;-o-object-fit:contain;object-fit:contain;transform-origin:center center;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;fill:currentColor}");\r\n}\r\nfunction tt(e) {\r\n  let t, n, o, l, s, c, r;\r\n  const d = e[3].default, u = G(d, e, e[2], null);\r\n  return c = new jt({}), { c() {\r\n    t = C1("svg"), n = C1("use"), l = B(), u && u.c(), s = B(), P(c.$$.fragment), Q1(n, "xlink:href", o = "#" + e[0]), h(t, "width", e[1]), h(t, "height", e[1]), h(t, "class", "icon  svelte-wxgj7p");\r\n  }, m(i, a) {\r\n    j(i, t, a), k(t, n), j(i, l, a), u && u.m(i, a), j(i, s, a), E(c, i, a), r = !0;\r\n  }, p(i, a) {\r\n    (!r || 1 & a && o !== (o = "#" + i[0])) && Q1(n, "xlink:href", o), (!r || 2 & a) && h(t, "width", i[1]), (!r || 2 & a) && h(t, "height", i[1]), u && u.p && (!r || 4 & a) && Q(u, d, i, i[2], r ? I(d, i[2], a, null) : J(i[2]), null);\r\n  }, i(i) {\r\n    r || ($(u, i), $(c.$$.fragment, i), r = !0);\r\n  }, o(i) {\r\n    y(u, i), y(c.$$.fragment, i), r = !1;\r\n  }, d(i) {\r\n    i && w(t), i && w(l), u && u.d(i), i && w(s), N(c, i);\r\n  } };\r\n}\r\nfunction Mt(e) {\r\n  let t, n, o = e[0] && tt(e);\r\n  return { c() {\r\n    o && o.c(), t = S1("");\r\n  }, m(l, s) {\r\n    o && o.m(l, s), j(l, t, s), n = !0;\r\n  }, p(l, [s]) {\r\n    l[0] ? o ? (o.p(l, s), 1 & s && $(o, 1)) : (o = tt(l), o.c(), $(o, 1), o.m(t.parentNode, t)) : o && (R1(), y(o, 1, 1, () => {\r\n      o = null;\r\n    }), O1());\r\n  }, i(l) {\r\n    n || ($(o), n = !0);\r\n  }, o(l) {\r\n    y(o), n = !1;\r\n  }, d(l) {\r\n    o && o.d(l), l && w(t);\r\n  } };\r\n}\r\nfunction Lt(e, t, n) {\r\n  let { $$slots: o = {}, $$scope: l } = t, { name: s } = t, { size: c = "100%" } = t;\r\n  return e.$$set = (r) => {\r\n    "name" in r && n(0, s = r.name), "size" in r && n(1, c = r.size), "$$scope" in r && n(2, l = r.$$scope);\r\n  }, [s, c, l, o];\r\n}\r\nclass _t extends r1 {\r\n  constructor(t) {\r\n    super(), c1(this, t, Lt, Mt, s1, { name: 0, size: 1 }, Ct);\r\n  }\r\n}\r\nfunction Bt(e) {\r\n  L1(e, "svelte-nn8bp4", `.m-2.svelte-nn8bp4{margin:0.5rem\r\n}.flex.svelte-nn8bp4{display:flex\r\n}.h-8.svelte-nn8bp4{height:2rem\r\n}.w-8.svelte-nn8bp4{width:2rem\r\n}.items-center.svelte-nn8bp4{align-items:center\r\n}.justify-center.svelte-nn8bp4{justify-content:center\r\n}.bg-contain.svelte-nn8bp4{background-size:contain\r\n}.bg-no-repeat.svelte-nn8bp4{background-repeat:no-repeat\r\n}.text-center.svelte-nn8bp4{text-align:center\r\n}.align-middle.svelte-nn8bp4{vertical-align:middle\r\n}.text-slate-500.svelte-nn8bp4{--tw-text-opacity:1;color:rgb(100 116 139 / var(--tw-text-opacity))\r\n}`);\r\n}\r\nconst Ht = (e) => ({}), et = (e) => ({});\r\nfunction Et(e) {\r\n  let t, n, o, l, s;\r\n  const c = e[2].first, r = G(c, e, e[1], et), d = r || function(a) {\r\n    let p, f, C;\r\n    return f = new _t({ props: { name: a[0] } }), { c() {\r\n      p = g("div"), P(f.$$.fragment), h(p, "class", "text-slate-500 svelte-nn8bp4");\r\n    }, m(x, b) {\r\n      j(x, p, b), E(f, p, null), C = !0;\r\n    }, p(x, b) {\r\n      const z = {};\r\n      1 & b && (z.name = x[0]), f.$set(z);\r\n    }, i(x) {\r\n      C || ($(f.$$.fragment, x), C = !0);\r\n    }, o(x) {\r\n      y(f.$$.fragment, x), C = !1;\r\n    }, d(x) {\r\n      x && w(p), N(f);\r\n    } };\r\n  }(e), u = e[2].default, i = G(u, e, e[1], null);\r\n  return { c() {\r\n    t = g("div"), n = g("div"), d && d.c(), o = B(), l = g("div"), i && i.c(), h(n, "class", "align-middle w-8 h-8 svelte-nn8bp4"), h(l, "class", "align-middle svelte-nn8bp4"), h(t, "class", "flex align-middle items-center text-center justify-center bg-contain bg-no-repeat m-2 svelte-nn8bp4");\r\n  }, m(a, p) {\r\n    j(a, t, p), k(t, n), d && d.m(n, null), k(t, o), k(t, l), i && i.m(l, null), s = !0;\r\n  }, p(a, [p]) {\r\n    r ? r.p && (!s || 2 & p) && Q(r, c, a, a[1], s ? I(c, a[1], p, Ht) : J(a[1]), et) : d && d.p && (!s || 1 & p) && d.p(a, s ? p : -1), i && i.p && (!s || 2 & p) && Q(i, u, a, a[1], s ? I(u, a[1], p, null) : J(a[1]), null);\r\n  }, i(a) {\r\n    s || ($(d, a), $(i, a), s = !0);\r\n  }, o(a) {\r\n    y(d, a), y(i, a), s = !1;\r\n  }, d(a) {\r\n    a && w(t), d && d.d(a), i && i.d(a);\r\n  } };\r\n}\r\nfunction Nt(e, t, n) {\r\n  let { $$slots: o = {}, $$scope: l } = t, { name: s = null } = t;\r\n  return e.$$set = (c) => {\r\n    "name" in c && n(0, s = c.name), "$$scope" in c && n(1, l = c.$$scope);\r\n  }, [s, l, o];\r\n}\r\nclass f1 extends r1 {\r\n  constructor(t) {\r\n    super(), c1(this, t, Nt, Et, s1, { name: 0 }, Bt);\r\n  }\r\n}\r\nfunction Vt(e) {\r\n  const t = e - 1;\r\n  return t * t * t + 1;\r\n}\r\nfunction nt(e) {\r\n  return --e * e * e * e * e + 1;\r\n}\r\nfunction ot(e, { delay: t = 0, duration: n = 400, easing: o = Vt, x: l = 0, y: s = 0, opacity: c = 0 } = {}) {\r\n  const r = getComputedStyle(e), d = +r.opacity, u = r.transform === "none" ? "" : r.transform, i = d * (1 - c);\r\n  return { delay: t, duration: n, easing: o, css: (a, p) => `\r\n			transform: ${u} translate(${(1 - a) * l}px, ${(1 - a) * s}px);\r\n			opacity: ${d - i * p}` };\r\n}\r\nfunction At(e) {\r\n  L1(e, "svelte-17dj42", `.z-50.svelte-17dj42{z-index:50\r\n}.mx-4.svelte-17dj42{margin-left:1rem;margin-right:1rem\r\n}.mx-1.svelte-17dj42{margin-left:0.25rem;margin-right:0.25rem\r\n}.flex.svelte-17dj42{display:flex\r\n}.h-10.svelte-17dj42{height:2.5rem\r\n}.w-10.svelte-17dj42{width:2.5rem\r\n}.flex-row.svelte-17dj42{flex-direction:row\r\n}.flex-col.svelte-17dj42{flex-direction:column\r\n}.justify-end.svelte-17dj42{justify-content:flex-end\r\n}.rounded-sm.svelte-17dj42{border-radius:0.125rem\r\n}.border.svelte-17dj42{border-width:1px\r\n}.border-slate-300.svelte-17dj42{--tw-border-opacity:1;border-color:rgb(203 213 225 / var(--tw-border-opacity))\r\n}.bg-slate-50.svelte-17dj42{--tw-bg-opacity:1;background-color:rgb(248 250 252 / var(--tw-bg-opacity))\r\n}.p-4.svelte-17dj42{padding:1rem\r\n}.text-left.svelte-17dj42{text-align:left\r\n}.text-sm.svelte-17dj42{font-size:0.875rem;line-height:1.25rem\r\n}.shadow-lg.svelte-17dj42{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\r\n}`);\r\n}\r\nfunction lt(e) {\r\n  let t, n, o, l, s, c;\r\n  const r = [qt, Pt], d = [];\r\n  function u(i, a) {\r\n    return i[1] ? 1 : 0;\r\n  }\r\n  return o = u(e), l = d[o] = r[o](e), { c() {\r\n    t = g("div"), n = g("div"), l.c(), h(n, "class", "text-left border-slate-300 svelte-17dj42"), h(t, "class", "flex flex-row justify-end z-50 bg-slate-50 border shadow-lg p-4 mx-4 rounded-sm svelte-17dj42");\r\n  }, m(i, a) {\r\n    j(i, t, a), k(t, n), d[o].m(n, null), c = !0;\r\n  }, p(i, a) {\r\n    let p = o;\r\n    o = u(e = i), o === p ? d[o].p(e, a) : (R1(), y(d[p], 1, 1, () => {\r\n      d[p] = null;\r\n    }), O1(), l = d[o], l ? l.p(e, a) : (l = d[o] = r[o](e), l.c()), $(l, 1), l.m(n, null));\r\n  }, i(i) {\r\n    c || ($(l), l1(() => {\r\n      s || (s = Y1(t, ot, { delay: 0, duration: 400, x: 0, y: -100, opacity: 0.1, easing: nt }, !0)), s.run(1);\r\n    }), c = !0);\r\n  }, o(i) {\r\n    y(l), s || (s = Y1(t, ot, { delay: 0, duration: 400, x: 0, y: -100, opacity: 0.1, easing: nt }, !1)), s.run(0), c = !1;\r\n  }, d(i) {\r\n    i && w(t), d[o].d(), i && s && s.end();\r\n  } };\r\n}\r\nfunction Pt(e) {\r\n  let t;\r\n  return { c() {\r\n    t = S1("Requesting access...");\r\n  }, m(n, o) {\r\n    j(n, t, o);\r\n  }, p: V, i: V, o: V, d(n) {\r\n    n && w(t);\r\n  } };\r\n}\r\nfunction qt(e) {\r\n  let t, n, o, l, s, c;\r\n  return o = new f1({ props: { $$slots: { first: [Zt], default: [St] }, $$scope: { ctx: e } } }), s = new f1({ props: { $$slots: { first: [Ot], default: [Rt] }, $$scope: { ctx: e } } }), { c() {\r\n    t = g("span"), t.innerHTML = "Paste the <b>Public Key</b> you want to grant access", n = B(), P(o.$$.fragment), l = B(), P(s.$$.fragment), h(t, "class", "text-sm svelte-17dj42");\r\n  }, m(r, d) {\r\n    j(r, t, d), j(r, n, d), E(o, r, d), j(r, l, d), E(s, r, d), c = !0;\r\n  }, p(r, d) {\r\n    const u = {};\r\n    260 & d && (u.$$scope = { dirty: d, ctx: r }), o.$set(u);\r\n    const i = {};\r\n    256 & d && (i.$$scope = { dirty: d, ctx: r }), s.$set(i);\r\n  }, i(r) {\r\n    c || ($(o.$$.fragment, r), $(s.$$.fragment, r), c = !0);\r\n  }, o(r) {\r\n    y(o.$$.fragment, r), y(s.$$.fragment, r), c = !1;\r\n  }, d(r) {\r\n    r && w(t), r && w(n), N(o, r), r && w(l), N(s, r);\r\n  } };\r\n}\r\nfunction St(e) {\r\n  let t, n, o;\r\n  return { c() {\r\n    t = g("input"), h(t, "type", "text"), h(t, "placeholder", "Their Public Key");\r\n  }, m(l, s) {\r\n    j(l, t, s), J1(t, e[2]), n || (o = [R(t, "input", e[5]), R(t, "keydown", e[4])], n = !0);\r\n  }, p(l, s) {\r\n    4 & s && t.value !== l[2] && J1(t, l[2]);\r\n  }, d(l) {\r\n    l && w(t), n = !1, F(o);\r\n  } };\r\n}\r\nfunction Zt(e) {\r\n  let t;\r\n  return { c() {\r\n    t = g("span"), t.textContent = "Grant Acess:", h(t, "class", "text-sm mx-1 svelte-17dj42");\r\n  }, m(n, o) {\r\n    j(n, t, o);\r\n  }, p: V, d(n) {\r\n    n && w(t);\r\n  } };\r\n}\r\nfunction Rt(e) {\r\n  let t, n, o;\r\n  return { c() {\r\n    t = g("input"), h(t, "type", "text"), h(t, "placeholder", "douganderson444");\r\n  }, m(l, s) {\r\n    j(l, t, s), n || (o = R(t, "keydown", e[4]), n = !0);\r\n  }, p: V, d(l) {\r\n    l && w(t), n = !1, o();\r\n  } };\r\n}\r\nfunction Ot(e) {\r\n  let t, n, o;\r\n  return { c() {\r\n    t = g("input"), n = B(), o = g("span"), o.innerHTML = "Add <b>Contact</b>", h(t, "type", "checkbox"), t.checked = !0, h(o, "class", "text-sm mx-1 svelte-17dj42");\r\n  }, m(l, s) {\r\n    j(l, t, s), j(l, n, s), j(l, o, s);\r\n  }, p: V, d(l) {\r\n    l && w(t), l && w(n), l && w(o);\r\n  } };\r\n}\r\nfunction Tt(e) {\r\n  let t, n, o, l, s, c, r, d, u = e[0] && lt(e);\r\n  return { c() {\r\n    t = g("div"), n = g("div"), o = g("div"), o.innerHTML = \'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752 752"><path d="M346.9 153.4c-6.2 0-12.1 5.2-13.7 10.2l-12.4 43.5a176 176 0 0 0-25.2 10.4l-39.5-21.9c-5.3-3-12.7-2-17 2.4l-41 41.1a14.6 14.6 0 0 0-2.4 16.9l22 39.6a171 171 0 0 0-10.4 25l-43.5 12.5c-6 1.7-10.4 7.6-10.4 13.8v58.3c0 6 4.5 12 10.4 13.6L207 431c2.9 8.7 6.5 17 10.5 25.1L195.7 496a14.7 14.7 0 0 0 2.4 16.9l41 41.1a14.6 14.6 0 0 0 17 2.4l39.5-22c8.1 4.2 16.5 7.7 25.2 10.6l12.4 43.3a14.6 14.6 0 0 0 13.7 10.4h58.3c6 0 12-4.5 13.6-10.4l12.4-43.3c8.7-2.9 17.1-6.4 25.2-10.5l39.5 21.9c5.3 3 12.7 2 17-2.4l41-41.1a14.6 14.6 0 0 0 2.4-17l-22-39.6c4.2-8 7.7-16.4 10.6-25.1l43.3-12.3a14.6 14.6 0 0 0 10.4-13.6V347c0-6.2-4.4-12.1-10.4-13.8l-43.5-12.4c-2.8-8.7-6.3-17-10.3-25l21.9-39.7a14.7 14.7 0 0 0-2.4-16.9l-41-41.1a14.6 14.6 0 0 0-17-2.4l-39.5 21.9c-8-4.1-16.5-7.5-25.2-10.4l-12.4-43.5a14.6 14.6 0 0 0-13.6-10.2zm10.6 28.4h37L406 222c1.3 4.7 5.2 8.7 10 10 11.9 3.2 23.2 8 33.8 14 4.2 2.4 9.7 2.5 14 .2l36.6-20.5 26 26-20.4 36.6a14.5 14.5 0 0 0 0 14c6.1 10.6 11 22 14.3 34a14 14 0 0 0 9.7 9.9l40.3 11.4v36.9L530 406a14.5 14.5 0 0 0-9.7 9.8 149 149 0 0 1-14.3 34 14.5 14.5 0 0 0 0 14l20.5 36.6-26 26-36.8-20.5a14.5 14.5 0 0 0-13.9.1c-10.6 6-22 11-33.9 14.2a14.5 14.5 0 0 0-9.9 9.8l-11.4 40.3h-37L346.2 530a14.5 14.5 0 0 0-9.9-9.8c-12-3.3-23.3-8.1-33.9-14.2a14.5 14.5 0 0 0-13.9-.1l-36.7 20.4-26-25.9 20.4-36.7c2.3-4.2 2.3-9.7 0-13.9-6-10.6-11-22-14.2-34a14.5 14.5 0 0 0-9.8-9.8l-40.3-11.5v-36.9l40.3-11.4c4.6-1.3 8.5-5.2 9.8-10a149 149 0 0 1 14.2-34c2.3-4.2 2.3-9.6 0-13.9l-20.5-36.5 26-26 36.8 20.4c4.2 2.3 9.7 2.2 14-.2a146 146 0 0 1 33.8-14 15 15 0 0 0 10-10zm18.5 90c-57.4 0-104.2 46.8-104.2 104.2S318.6 480.2 376 480.2c57.4 0 104.2-46.8 104.2-104.2S433.4 271.8 376 271.8zm0 28.4c42 0 75.8 33.8 75.8 75.8S418 451.8 376 451.8 300.2 418 300.2 376s33.8-75.8 75.8-75.8z"></path></svg>\', l = B(), u && u.c(), h(o, "class", "w-10 h-10 svelte-17dj42"), h(n, "class", "flex flex-row justify-end svelte-17dj42"), h(t, "class", "flex flex-col svelte-17dj42");\r\n  }, m(i, a) {\r\n    var p;\r\n    j(i, t, a), k(t, n), k(n, o), k(t, l), u && u.m(t, null), c = !0, r || (d = [R(o, "click", e[3]), R(o, "keypress", e[3]), (p = s = Dt.call(null, t, { enabled: e[0], cb: e[6] }), p && j1(p.destroy) ? p.destroy : V)], r = !0);\r\n  }, p(i, [a]) {\r\n    i[0] ? u ? (u.p(i, a), 1 & a && $(u, 1)) : (u = lt(i), u.c(), $(u, 1), u.m(t, null)) : u && (R1(), y(u, 1, 1, () => {\r\n      u = null;\r\n    }), O1()), s && j1(s.update) && 3 & a && s.update.call(null, { enabled: i[0], cb: i[6] });\r\n  }, i(i) {\r\n    c || ($(u), c = !0);\r\n  }, o(i) {\r\n    y(u), c = !1;\r\n  }, d(i) {\r\n    i && w(t), u && u.d(), r = !1, F(d);\r\n  } };\r\n}\r\nfunction Dt(e, { enabled: t, cb: n }) {\r\n  const o = ({ target: s }) => {\r\n    e.contains(s) || n();\r\n  };\r\n  function l({ enabled: s }) {\r\n    s ? window.addEventListener("click", o) : window.removeEventListener("click", o);\r\n  }\r\n  return l({ enabled: t }), { update: l, destroy() {\r\n    window.removeEventListener("click", o);\r\n  } };\r\n}\r\nfunction Ft(e, t, n) {\r\n  const o = Z1();\r\n  let l, s, c = !1;\r\n  return [c, l, s, function(r) {\r\n    n(0, c = !c);\r\n  }, function(r) {\r\n    r.code === "Enter" && (n(1, l = !0), o("change", { targetPublicKey: s }));\r\n  }, function() {\r\n    s = this.value, n(2, s);\r\n  }, () => {\r\n    n(0, c = !1), n(1, l = !1);\r\n  }];\r\n}\r\nclass Kt extends r1 {\r\n  constructor(t) {\r\n    super(), c1(this, t, Ft, Tt, s1, {}, At);\r\n  }\r\n}\r\nfunction Ut(e) {\r\n  L1(e, "svelte-1r987x6", `.absolute.svelte-1r987x6{position:absolute\r\n}.relative.svelte-1r987x6{position:relative\r\n}.z-10.svelte-1r987x6{z-index:10\r\n}.m-auto.svelte-1r987x6{margin:auto\r\n}.my-2.svelte-1r987x6{margin-top:0.5rem;margin-bottom:0.5rem\r\n}.mx-auto.svelte-1r987x6{margin-left:auto;margin-right:auto\r\n}.mx-2.svelte-1r987x6{margin-left:0.5rem;margin-right:0.5rem\r\n}.-mt-20.svelte-1r987x6{margin-top:-5rem\r\n}.mt-5.svelte-1r987x6{margin-top:1.25rem\r\n}.mb-7.svelte-1r987x6{margin-bottom:1.75rem\r\n}.flex.svelte-1r987x6{display:flex\r\n}.h-24.svelte-1r987x6{height:6rem\r\n}.h-32.svelte-1r987x6{height:8rem\r\n}.w-full.svelte-1r987x6{width:100%\r\n}.w-32.svelte-1r987x6{width:8rem\r\n}.max-w-lg.svelte-1r987x6{max-width:32rem\r\n}.max-w-none.svelte-1r987x6{max-width:none\r\n}.flex-none.svelte-1r987x6{flex:none\r\n}.items-center.svelte-1r987x6{align-items:center\r\n}.justify-center.svelte-1r987x6{justify-content:center\r\n}.overflow-hidden.svelte-1r987x6{overflow:hidden\r\n}.rounded-2xl.svelte-1r987x6{border-radius:1rem\r\n}.rounded-full.svelte-1r987x6{border-radius:9999px\r\n}.bg-slate-100.svelte-1r987x6{--tw-bg-opacity:1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))\r\n}.bg-white.svelte-1r987x6{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))\r\n}.bg-green-400.svelte-1r987x6{--tw-bg-opacity:1;background-color:rgb(74 222 128 / var(--tw-bg-opacity))\r\n}.fill-slate-500.svelte-1r987x6{fill:#64748b\r\n}.object-cover.svelte-1r987x6{-o-object-fit:cover;object-fit:cover\r\n}.px-3.svelte-1r987x6{padding-left:0.75rem;padding-right:0.75rem\r\n}.text-center.svelte-1r987x6{text-align:center\r\n}.text-xl.svelte-1r987x6{font-size:1.25rem;line-height:1.75rem\r\n}.text-base.svelte-1r987x6{font-size:1rem;line-height:1.5rem\r\n}.text-neutral-800.svelte-1r987x6{--tw-text-opacity:1;color:rgb(38 38 38 / var(--tw-text-opacity))\r\n}.text-sky-500.svelte-1r987x6{--tw-text-opacity:1;color:rgb(14 165 233 / var(--tw-text-opacity))\r\n}.text-white.svelte-1r987x6{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\r\n}.shadow-xl.svelte-1r987x6{--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\r\n}.drop-shadow-xl.svelte-1r987x6{--tw-drop-shadow:drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)\r\n}`);\r\n}\r\nconst Gt = (e) => ({}), st = (e) => ({}), It = (e) => ({}), ct = (e) => ({}), Qt = (e) => ({}), rt = (e) => ({}), Jt = (e) => ({}), it = (e) => ({});\r\nfunction Wt(e) {\r\n  let t, n, o;\r\n  return { c() {\r\n    t = g("div"), n = g("img"), h(n, "class", "rounded-full bg-white absolute max-w-none object-cover svelte-1r987x6"), I1(n.src, o = e[0].avatar) || h(n, "src", o), h(n, "alt", "d"), p1(n, "width", "100%"), p1(n, "height", "100%"), p1(n, "transform-origin", "50% 50% 0px"), h(t, "class", "relative z-10 overflow-hidden flex-none mx-auto w-32 h-32 drop-shadow-xl svelte-1r987x6");\r\n  }, m(l, s) {\r\n    j(l, t, s), k(t, n);\r\n  }, p(l, s) {\r\n    1 & s && !I1(n.src, o = l[0].avatar) && h(n, "src", o);\r\n  }, d(l) {\r\n    l && w(t);\r\n  } };\r\n}\r\nfunction Xt(e) {\r\n  let t, n;\r\n  return { c() {\r\n    t = C1("svg"), n = C1("path"), h(n, "d", "M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"), h(t, "class", "rounded-full bg-white shadow-xl drop-shadow-xl svelte-1r987x6"), h(t, "xmlns", "http://www.w3.org/2000/svg"), h(t, "version", "1.0"), h(t, "viewBox", "0 0 256 256");\r\n  }, m(o, l) {\r\n    j(o, t, l), k(t, n);\r\n  }, p: V, d(o) {\r\n    o && w(t);\r\n  } };\r\n}\r\nfunction Yt(e) {\r\n  let t;\r\n  const n = e[3].address, o = G(n, e, e[15], rt), l = o || function(s) {\r\n    let c, r, d;\r\n    function u(a) {\r\n      s[11](a);\r\n    }\r\n    let i = {};\r\n    return s[0].address !== void 0 && (i.item = s[0].address), c = new o1({ props: i }), D.push(() => n1(c, "item", u)), { c() {\r\n      P(c.$$.fragment);\r\n    }, m(a, p) {\r\n      E(c, a, p), d = !0;\r\n    }, p(a, p) {\r\n      const f = {};\r\n      !r && 1 & p && (r = !0, f.item = a[0].address, e1(() => r = !1)), c.$set(f);\r\n    }, i(a) {\r\n      d || ($(c.$$.fragment, a), d = !0);\r\n    }, o(a) {\r\n      y(c.$$.fragment, a), d = !1;\r\n    }, d(a) {\r\n      N(c, a);\r\n    } };\r\n  }(e);\r\n  return { c() {\r\n    l && l.c();\r\n  }, m(s, c) {\r\n    l && l.m(s, c), t = !0;\r\n  }, p(s, c) {\r\n    o ? o.p && (!t || 32768 & c) && Q(o, n, s, s[15], t ? I(n, s[15], c, Qt) : J(s[15]), rt) : l && l.p && (!t || 1 & c) && l.p(s, t ? c : -1);\r\n  }, i(s) {\r\n    t || ($(l, s), t = !0);\r\n  }, o(s) {\r\n    y(l, s), t = !1;\r\n  }, d(s) {\r\n    l && l.d(s);\r\n  } };\r\n}\r\nfunction t0(e) {\r\n  let t;\r\n  const n = e[3].email, o = G(n, e, e[15], ct), l = o || function(s) {\r\n    let c, r, d;\r\n    function u(a) {\r\n      s[12](a);\r\n    }\r\n    let i = {};\r\n    return s[0].email !== void 0 && (i.item = s[0].email), c = new o1({ props: i }), D.push(() => n1(c, "item", u)), { c() {\r\n      P(c.$$.fragment);\r\n    }, m(a, p) {\r\n      E(c, a, p), d = !0;\r\n    }, p(a, p) {\r\n      const f = {};\r\n      !r && 1 & p && (r = !0, f.item = a[0].email, e1(() => r = !1)), c.$set(f);\r\n    }, i(a) {\r\n      d || ($(c.$$.fragment, a), d = !0);\r\n    }, o(a) {\r\n      y(c.$$.fragment, a), d = !1;\r\n    }, d(a) {\r\n      N(c, a);\r\n    } };\r\n  }(e);\r\n  return { c() {\r\n    l && l.c();\r\n  }, m(s, c) {\r\n    l && l.m(s, c), t = !0;\r\n  }, p(s, c) {\r\n    o ? o.p && (!t || 32768 & c) && Q(o, n, s, s[15], t ? I(n, s[15], c, It) : J(s[15]), ct) : l && l.p && (!t || 1 & c) && l.p(s, t ? c : -1);\r\n  }, i(s) {\r\n    t || ($(l, s), t = !0);\r\n  }, o(s) {\r\n    y(l, s), t = !1;\r\n  }, d(s) {\r\n    l && l.d(s);\r\n  } };\r\n}\r\nfunction e0(e) {\r\n  let t;\r\n  const n = e[3].phone, o = G(n, e, e[15], st), l = o || function(s) {\r\n    let c, r, d;\r\n    function u(a) {\r\n      s[13](a);\r\n    }\r\n    let i = {};\r\n    return s[0].phone !== void 0 && (i.item = s[0].phone), c = new o1({ props: i }), D.push(() => n1(c, "item", u)), { c() {\r\n      P(c.$$.fragment);\r\n    }, m(a, p) {\r\n      E(c, a, p), d = !0;\r\n    }, p(a, p) {\r\n      const f = {};\r\n      !r && 1 & p && (r = !0, f.item = a[0].phone, e1(() => r = !1)), c.$set(f);\r\n    }, i(a) {\r\n      d || ($(c.$$.fragment, a), d = !0);\r\n    }, o(a) {\r\n      y(c.$$.fragment, a), d = !1;\r\n    }, d(a) {\r\n      N(c, a);\r\n    } };\r\n  }(e);\r\n  return { c() {\r\n    l && l.c();\r\n  }, m(s, c) {\r\n    l && l.m(s, c), t = !0;\r\n  }, p(s, c) {\r\n    o ? o.p && (!t || 32768 & c) && Q(o, n, s, s[15], t ? I(n, s[15], c, Gt) : J(s[15]), st) : l && l.p && (!t || 1 & c) && l.p(s, t ? c : -1);\r\n  }, i(s) {\r\n    t || ($(l, s), t = !0);\r\n  }, o(s) {\r\n    y(l, s), t = !1;\r\n  }, d(s) {\r\n    l && l.d(s);\r\n  } };\r\n}\r\nfunction n0(e) {\r\n  let t, n, o, l, s, c, r, d, u, i, a, p, f, C, x, b, z, L, K, W, A, _1, T1;\r\n  function D1(m, v) {\r\n    return m[0].avatar ? Wt : Xt;\r\n  }\r\n  o = new Kt({}), o.$on("change", e[4]);\r\n  let v1 = D1(e), O = v1(e);\r\n  const B1 = e[3].name, x1 = G(B1, e, e[15], it), S = x1 || function(m) {\r\n    let v, H, T, _, i1, X;\r\n    function q(M) {\r\n      m[9](M);\r\n    }\r\n    let Y = {};\r\n    function g1(M) {\r\n      m[10](M);\r\n    }\r\n    m[0].firstName !== void 0 && (Y.item = m[0].firstName), v = new o1({ props: Y }), D.push(() => n1(v, "item", q));\r\n    let F1 = {};\r\n    return m[0].lastName !== void 0 && (F1.item = m[0].lastName), _ = new o1({ props: F1 }), D.push(() => n1(_, "item", g1)), { c() {\r\n      P(v.$$.fragment), T = B(), P(_.$$.fragment);\r\n    }, m(M, t1) {\r\n      E(v, M, t1), j(M, T, t1), E(_, M, t1), X = !0;\r\n    }, p(M, t1) {\r\n      const K1 = {};\r\n      !H && 1 & t1 && (H = !0, K1.item = M[0].firstName, e1(() => H = !1)), v.$set(K1);\r\n      const U1 = {};\r\n      !i1 && 1 & t1 && (i1 = !0, U1.item = M[0].lastName, e1(() => i1 = !1)), _.$set(U1);\r\n    }, i(M) {\r\n      X || ($(v.$$.fragment, M), $(_.$$.fragment, M), X = !0);\r\n    }, o(M) {\r\n      y(v.$$.fragment, M), y(_.$$.fragment, M), X = !1;\r\n    }, d(M) {\r\n      N(v, M), M && w(T), N(_, M);\r\n    } };\r\n  }(e);\r\n  a = new f1({ props: { name: "address", $$slots: { default: [Yt] }, $$scope: { ctx: e } } }), f = new f1({ props: { name: "email", $$slots: { default: [t0] }, $$scope: { ctx: e } } }), x = new f1({ props: { name: "phone", $$slots: { default: [e0] }, $$scope: { ctx: e } } });\r\n  const H1 = e[3].default, $1 = G(H1, e, e[15], null), Z = $1 || function(m) {\r\n    let v, H, T, _;\r\n    function i1(q) {\r\n      m[14](q);\r\n    }\r\n    let X = { options: { singleLine: !1 } };\r\n    return m[0].notes !== void 0 && (X.item = m[0].notes), H = new o1({ props: X }), D.push(() => n1(H, "item", i1)), { c() {\r\n      v = g("span"), P(H.$$.fragment), h(v, "class", "text-sky-500 svelte-1r987x6");\r\n    }, m(q, Y) {\r\n      j(q, v, Y), E(H, v, null), _ = !0;\r\n    }, p(q, Y) {\r\n      const g1 = {};\r\n      !T && 1 & Y && (T = !0, g1.item = q[0].notes, e1(() => T = !1)), H.$set(g1);\r\n    }, i(q) {\r\n      _ || ($(H.$$.fragment, q), _ = !0);\r\n    }, o(q) {\r\n      y(H.$$.fragment, q), _ = !1;\r\n    }, d(q) {\r\n      q && w(v), N(H);\r\n    } };\r\n  }(e);\r\n  return { c() {\r\n    t = g("div"), n = g("div"), P(o.$$.fragment), l = B(), s = g("input"), c = B(), r = g("div"), O.c(), d = B(), u = g("div"), S && S.c(), i = B(), P(a.$$.fragment), p = B(), P(f.$$.fragment), C = B(), P(x.$$.fragment), b = B(), z = g("blockquote"), L = g("p"), Z && Z.c(), K = B(), W = g("footer"), W.textContent = "Powered by PeerPiper", h(n, "class", "h-24 bg-white svelte-1r987x6"), p1(s, "display", "none"), h(s, "type", "file"), h(s, "accept", ".jpg, .jpeg, .png"), h(r, "class", "-mt-20 h-32 flex justify-center svelte-1r987x6"), h(u, "class", "mt-5 mb-7 px-3 text-center text-xl svelte-1r987x6"), h(L, "class", "mx-2 mb-7 text-center text-base svelte-1r987x6"), h(W, "class", "text-center bg-green-400 text-white svelte-1r987x6"), h(t, "class", "m-auto text-neutral-800 fill-slate-500 my-2 w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl svelte-1r987x6");\r\n  }, m(m, v) {\r\n    j(m, t, v), k(t, n), E(o, n, null), k(t, l), k(t, s), e[6](s), k(t, c), k(t, r), O.m(r, null), k(t, d), k(t, u), S && S.m(u, null), k(t, i), E(a, t, null), k(t, p), E(f, t, null), k(t, C), E(x, t, null), k(t, b), k(t, z), k(z, L), Z && Z.m(L, null), k(t, K), k(t, W), A = !0, _1 || (T1 = [R(s, "change", e[5]), R(r, "keypress", e[7]), R(r, "click", e[8])], _1 = !0);\r\n  }, p(m, [v]) {\r\n    v1 === (v1 = D1(m)) && O ? O.p(m, v) : (O.d(1), O = v1(m), O && (O.c(), O.m(r, null))), x1 ? x1.p && (!A || 32768 & v) && Q(x1, B1, m, m[15], A ? I(B1, m[15], v, Jt) : J(m[15]), it) : S && S.p && (!A || 1 & v) && S.p(m, A ? v : -1);\r\n    const H = {};\r\n    32769 & v && (H.$$scope = { dirty: v, ctx: m }), a.$set(H);\r\n    const T = {};\r\n    32769 & v && (T.$$scope = { dirty: v, ctx: m }), f.$set(T);\r\n    const _ = {};\r\n    32769 & v && (_.$$scope = { dirty: v, ctx: m }), x.$set(_), $1 ? $1.p && (!A || 32768 & v) && Q($1, H1, m, m[15], A ? I(H1, m[15], v, null) : J(m[15]), null) : Z && Z.p && (!A || 1 & v) && Z.p(m, A ? v : -1);\r\n  }, i(m) {\r\n    A || ($(o.$$.fragment, m), $(S, m), $(a.$$.fragment, m), $(f.$$.fragment, m), $(x.$$.fragment, m), $(Z, m), A = !0);\r\n  }, o(m) {\r\n    y(o.$$.fragment, m), y(S, m), y(a.$$.fragment, m), y(f.$$.fragment, m), y(x.$$.fragment, m), y(Z, m), A = !1;\r\n  }, d(m) {\r\n    m && w(t), N(o), e[6](null), O.d(), S && S.d(m), N(a), N(f), N(x), Z && Z.d(m), _1 = !1, F(T1);\r\n  } };\r\n}\r\nfunction o0(e, t, n) {\r\n  let { $$slots: o = {}, $$scope: l } = t;\r\n  const s = Z1();\r\n  let c, r = { firstName: "FirstName", lastName: "Lastname", address: "Unknown address", email: "Unknown email", phone: "No phone", notes: "No notes", avatar: null }, { profile: d = r } = t;\r\n  const u = (i) => {\r\n    let a = i.target.files[0], p = new FileReader();\r\n    p.readAsDataURL(a), p.onload = (f) => {\r\n      n(0, d.avatar = f.target.result, d);\r\n    };\r\n  };\r\n  return e.$$set = (i) => {\r\n    "profile" in i && n(0, d = i.profile), "$$scope" in i && n(15, l = i.$$scope);\r\n  }, e.$$.update = () => {\r\n    1 & e.$$.dirty && d && (n(0, d = Object.assign({}, r, d)), s("change", { profile: d }));\r\n  }, [d, c, u, o, function(i) {\r\n    $t.call(this, e, i);\r\n  }, (i) => u(i), function(i) {\r\n    D[i ? "unshift" : "push"](() => {\r\n      c = i, n(1, c);\r\n    });\r\n  }, () => {\r\n    c.click();\r\n  }, () => {\r\n    c.click();\r\n  }, function(i) {\r\n    e.$$.not_equal(d.firstName, i) && (d.firstName = i, n(0, d), n(17, r));\r\n  }, function(i) {\r\n    e.$$.not_equal(d.lastName, i) && (d.lastName = i, n(0, d), n(17, r));\r\n  }, function(i) {\r\n    e.$$.not_equal(d.address, i) && (d.address = i, n(0, d), n(17, r));\r\n  }, function(i) {\r\n    e.$$.not_equal(d.email, i) && (d.email = i, n(0, d), n(17, r));\r\n  }, function(i) {\r\n    e.$$.not_equal(d.phone, i) && (d.phone = i, n(0, d), n(17, r));\r\n  }, function(i) {\r\n    e.$$.not_equal(d.notes, i) && (d.notes = i, n(0, d), n(17, r));\r\n  }, l];\r\n}\r\nclass l0 extends r1 {\r\n  constructor(t) {\r\n    super(), c1(this, t, o0, n0, s1, { profile: 0 }, Ut);\r\n  }\r\n}\r\nexport {\r\n  l0 as default\r\n};\r\n';
const get_default_slot_changes$2 = (dirty) => ({
  props: dirty & 16,
  esModule: dirty & 32,
  selectedTag: dirty & 1,
  commits: dirty & 4,
  tagNode: dirty & 8
});
const get_default_slot_context$2 = (ctx) => ({
  props: ctx[4],
  esModule: ctx[5],
  selectedTag: ctx[0],
  commits: ctx[2],
  tagNode: ctx[3]
});
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let ul;
  let each_value = Object.keys(ctx[1]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
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
      attr(ul, "class", "flex-1 m-1 w-full list-none");
    },
    m(target, anchor) {
      insert_hydration(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 3) {
        each_value = Object.keys(ctx2[1]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
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
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block$2(ctx) {
  let li;
  let t0_value = ctx[15] + "";
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[10](ctx[15], ...args);
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
      attr(li, "class", "w-full p-4 cursor-pointer user-select-none");
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
      if (dirty & 2 && t0_value !== (t0_value = ctx[15] + ""))
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
function create_if_block$4(ctx) {
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], get_default_slot_context$2);
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
        if (default_slot.p && (!current || dirty & 317)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, get_default_slot_changes$2),
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
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$7(ctx) {
  let section;
  let t0;
  let div;
  let svg;
  let path;
  let t1;
  let if_block1_anchor;
  let current;
  let if_block0 = ctx[1] && create_if_block_1(ctx);
  let if_block1 = ctx[5] && create_if_block$4(ctx);
  return {
    c() {
      section = element("section");
      if (if_block0)
        if_block0.c();
      t0 = space();
      div = element("div");
      svg = svg_element("svg");
      path = svg_element("path");
      t1 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      if (if_block0)
        if_block0.l(section_nodes);
      t0 = claim_space(section_nodes);
      div = claim_element(section_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", { class: true, viewBox: true });
      var svg_nodes = children(svg);
      path = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      section_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
      this.h();
    },
    h() {
      attr(path, "d", "M7 10l5 5 5-5z");
      attr(path, "fill", "currentColor");
      attr(svg, "class", "arrow h-full w-full");
      attr(svg, "viewBox", "0 0 20 20");
      attr(div, "class", "flex-0 m-4 h-8 w-8 items-center text-center");
      attr(section, "class", "flex flex-row rounded items-center justify-between bg-neutral-600 sm:w-1/2 m-4 max-w-full flex-wrap");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      if (if_block0)
        if_block0.m(section, null);
      append_hydration(section, t0);
      append_hydration(section, div);
      append_hydration(div, svg);
      append_hydration(svg, path);
      insert_hydration(target, t1, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          if_block0.m(section, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[5]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$4(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
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
      if (detaching)
        detach(section);
      if (if_block0)
        if_block0.d();
      if (detaching)
        detach(t1);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { dag } = $$props;
  let rootObj;
  let commitTagData;
  let selectedTag;
  let commits = null;
  let tags;
  let tagNode, props, esModule;
  onMount(async () => {
    $$invalidate(7, { commitTagData } = await __vitePreload(() => import("./lib-1e1277cc.js"), true ? ["./lib-1e1277cc.js","./events-4b10efcd.js","./base32-9ef16083.js","./index-fcbc46b5.js","./index-bfa8ea01.js"] : void 0, import.meta.url), commitTagData);
  });
  async function handleDagReady(dag2) {
    dag2.on("rootCID", (_) => handleDagReady(dag2));
    if (!dag2.rootCID) {
      makeDefault();
      return;
    }
    const cid = CID.asCID(dag2.rootCID) || CID.parse(dag2.rootCID);
    if (!cid)
      return;
    $$invalidate(1, rootObj = (await dag2.get(cid)).value);
    tags = Object.keys(rootObj);
    if (!tags)
      makeDefault();
    if (!selectedTag)
      $$invalidate(0, selectedTag = tags[0]);
  }
  async function makeDefault() {
    let exists = false;
    try {
      exists = await dag.latest("ContactCard");
    } catch (error) {
      console.log("tag does not exist, create it");
    }
    if (!exists) {
      try {
        const params = {
          dag,
          tag: "ContactCard",
          data: contactCard,
          key: "compiled",
          tagNode: {}
        };
        $$invalidate(2, commits = [await commitTagData(params)]);
        $$invalidate(6, dag);
        $$invalidate(0, selectedTag = "ContactCard");
      } catch (error) {
        console.log("error creating contact card", error);
      }
    } else {
      console.log("tag exists, load it");
    }
  }
  async function loadLatest(tag) {
    try {
      $$invalidate(3, tagNode = await dag.latest(tag));
    } catch (error) {
      console.log("error loading tag", error);
    }
    try {
      $$invalidate(4, props = (await dag.latest(tag, "data")).value || null);
    } catch (error) {
      console.log("No prop data, but thats ok", error);
    }
    try {
      $$invalidate(5, esModule = (await dag.latest(tag, "compiled")).value);
    } catch (error) {
      console.log("No compiled module, thats an issue", error);
    }
  }
  const click_handler = (tag, e) => $$invalidate(0, selectedTag = tag);
  $$self.$$set = ($$props2) => {
    if ("dag" in $$props2)
      $$invalidate(6, dag = $$props2.dag);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 192) {
      if (dag && commitTagData)
        handleDagReady(dag);
    }
    if ($$self.$$.dirty & 1) {
      if (selectedTag)
        loadLatest(selectedTag);
    }
  };
  return [
    selectedTag,
    rootObj,
    commits,
    tagNode,
    props,
    esModule,
    dag,
    commitTagData,
    $$scope,
    slots,
    click_handler
  ];
}
class RepoMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$7, safe_not_equal, { dag: 6 });
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}
const get_default_slot_changes$1 = (dirty) => ({
  handleChange: dirty & 65536,
  esModule: dirty & 2048,
  props: dirty & 4096
});
const get_default_slot_context$1 = (ctx) => ({
  handleChange: ctx[16],
  esModule: ctx[11],
  props: ctx[12]
});
function create_default_slot_1$1(ctx) {
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], get_default_slot_context$1);
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
        if (default_slot.p && (!current || dirty & 71688)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[3],
            !current ? get_all_dirty_from_scope(ctx2[3]) : get_slot_changes(default_slot_template, ctx2[3], dirty, get_default_slot_changes$1),
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
function create_default_slot$1(ctx) {
  let saver;
  let current;
  saver = new Saver({
    props: {
      tag: ctx[13],
      dag: ctx[0],
      tagNode: ctx[15],
      commits: ctx[14],
      $$slots: {
        default: [
          create_default_slot_1$1,
          ({ handleChange }) => ({ 16: handleChange }),
          ({ handleChange }) => handleChange ? 65536 : 0
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
      if (dirty & 8192)
        saver_changes.tag = ctx2[13];
      if (dirty & 1)
        saver_changes.dag = ctx2[0];
      if (dirty & 32768)
        saver_changes.tagNode = ctx2[15];
      if (dirty & 16384)
        saver_changes.commits = ctx2[14];
      if (dirty & 71688) {
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
function create_if_block$3(ctx) {
  let div1;
  let div0;
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
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
  let t0_value = ctx[8] + "";
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
      if (dirty & 2 && t0_value !== (t0_value = ctx2[8] + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$6(ctx) {
  let section;
  let repomenu;
  let t;
  let current;
  repomenu = new RepoMenu({
    props: {
      dag: ctx[0],
      $$slots: {
        default: [
          create_default_slot$1,
          ({ esModule, props, selectedTag, commits, tagNode }) => ({
            11: esModule,
            12: props,
            13: selectedTag,
            14: commits,
            15: tagNode
          }),
          ({ esModule, props, selectedTag, commits, tagNode }) => (esModule ? 2048 : 0) | (props ? 4096 : 0) | (selectedTag ? 8192 : 0) | (commits ? 16384 : 0) | (tagNode ? 32768 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  let if_block = ctx[1] && create_if_block$3(ctx);
  return {
    c() {
      section = element("section");
      create_component(repomenu.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      claim_component(repomenu.$$.fragment, section_nodes);
      t = claim_space(section_nodes);
      if (if_block)
        if_block.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(section, "class", "w-full");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      mount_component(repomenu, section, null);
      append_hydration(section, t);
      if (if_block)
        if_block.m(section, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const repomenu_changes = {};
      if (dirty & 1)
        repomenu_changes.dag = ctx2[0];
      if (dirty & 63497) {
        repomenu_changes.$$scope = { dirty, ctx: ctx2 };
      }
      repomenu.$set(repomenu_changes);
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          if_block.m(section, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(repomenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(repomenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(section);
      destroy_component(repomenu);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let dag;
  let roots = [];
  let handleRootCIDChange;
  let saveToBrowser;
  onMount(async () => {
    const { createDag, createContactCard } = await __vitePreload(() => import("./lib-1e1277cc.js"), true ? ["./lib-1e1277cc.js","./events-4b10efcd.js","./base32-9ef16083.js","./index-fcbc46b5.js","./index-bfa8ea01.js"] : void 0, import.meta.url);
    $$invalidate(0, dag = await createDag({ persist: true }));
    dag.on("rootCID", (val) => handleRootCIDChange());
    if (typeof localStorage !== "undefined") {
      saveToBrowser = (key, value) => localStorage.setItem(key, value);
      const res = localStorage.getItem("ROOT_CID");
      if (res) {
        const cid = CID.asCID(res) || CID.parse(res);
        if (cid) {
          $$invalidate(0, dag.rootCID = cid, dag);
          $$invalidate(1, roots = [...roots, cid.toString()]);
          (await dag.get(cid)).value;
        }
      }
    }
    handleRootCIDChange = async () => {
      if (!dag.rootCID)
        return;
      const cid = CID.asCID(dag.rootCID) || CID.parse(dag.rootCID);
      if (!cid)
        return;
      (await dag.get(cid)).value;
      if (saveToBrowser)
        saveToBrowser("ROOT_CID", cid.toString());
      $$invalidate(1, roots = [...roots, cid.toString()]);
    };
  });
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [dag, roots, slots, $$scope];
}
class Repo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$6, safe_not_equal, {});
  }
}
function create_fragment$5(ctx) {
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
function instance$4($$self, $$props, $$invalidate) {
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
    init(this, options, instance$4, create_fragment$5, safe_not_equal, { src: 1, props: 2 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_if_block$2(ctx) {
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
function create_fragment$4(ctx) {
  let if_block_anchor;
  let if_block = ctx[0] && ctx[0].length && create_if_block$2(ctx);
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
          if_block = create_if_block$2(ctx2);
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
function instance$3($$self, $$props, $$invalidate) {
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
    init(this, options, instance$3, create_fragment$4, safe_not_equal, { peers: 0 });
  }
}
const Icon_svelte_svelte_type_style_lang = "";
const Content_svelte_svelte_type_style_lang = "";
const ContextMenu_svelte_svelte_type_style_lang = "";
const Modal_svelte_svelte_type_style_lang = "";
const SideNav_svelte_svelte_type_style_lang = "";
const get_default_slot_changes = (dirty) => ({});
const get_default_slot_context = (ctx) => ({ hideNav: ctx[4] });
function create_if_block$1(ctx) {
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
function create_fragment$3(ctx) {
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
  let if_block = ctx[0] && create_if_block$1(ctx);
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
          if_block = create_if_block$1(ctx2);
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
function instance$2($$self, $$props, $$invalidate) {
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
    init(this, options, instance$2, create_fragment$3, safe_not_equal, {});
  }
}
function create_fragment$2(ctx) {
  let current;
  const default_slot_template = ctx[4].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], null);
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
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[3],
            !current ? get_all_dirty_from_scope(ctx2[3]) : get_slot_changes(default_slot_template, ctx2[3], dirty, null),
            null
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
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { wallet } = $$props;
  let { ownerAddress } = $$props;
  let { local = false } = $$props;
  setContext("wallet", wallet);
  setContext("local", local);
  setContext("ownerAddress", ownerAddress);
  $$self.$$set = ($$props2) => {
    if ("wallet" in $$props2)
      $$invalidate(0, wallet = $$props2.wallet);
    if ("ownerAddress" in $$props2)
      $$invalidate(1, ownerAddress = $$props2.ownerAddress);
    if ("local" in $$props2)
      $$invalidate(2, local = $$props2.local);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [wallet, ownerAddress, local, $$scope, slots];
}
class AppContext extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, { wallet: 0, ownerAddress: 1, local: 2 });
  }
}
function create_default_slot_2(ctx) {
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
  peers_1 = new Peers({ props: { peers: ctx[3] } });
  return {
    c() {
      section = element("section");
      div2 = element("div");
      t0 = text("My Stuff\r\n					");
      div0 = element("div");
      t1 = text("Username");
      t2 = space();
      div1 = element("div");
      t3 = text(ctx[2]);
      t4 = space();
      create_component(peers_1.$$.fragment);
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      div2 = claim_element(section_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      t0 = claim_text(div2_nodes, "My Stuff\r\n					");
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t1 = claim_text(div0_nodes, "Username");
      div0_nodes.forEach(detach);
      t2 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t3 = claim_text(div1_nodes, ctx[2]);
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
      if (!current || dirty & 4)
        set_data(t3, ctx2[2]);
      const peers_1_changes = {};
      if (dirty & 8)
        peers_1_changes.peers = ctx2[3];
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
function create_else_block(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_if_block(ctx) {
  let appcontext;
  let current;
  appcontext = new AppContext({
    props: {
      wallet: ctx[0],
      ownerAddress: ctx[1],
      local: ctx[4],
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(appcontext.$$.fragment);
    },
    l(nodes) {
      claim_component(appcontext.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(appcontext, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const appcontext_changes = {};
      if (dirty & 1)
        appcontext_changes.wallet = ctx2[0];
      if (dirty & 2)
        appcontext_changes.ownerAddress = ctx2[1];
      if (dirty & 1048576) {
        appcontext_changes.$$scope = { dirty, ctx: ctx2 };
      }
      appcontext.$set(appcontext_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(appcontext.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(appcontext.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(appcontext, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let mount;
  let current;
  mount = new Mount({
    props: {
      src: ctx[16],
      props: ctx[17]
    }
  });
  mount.$on("change", function() {
    if (is_function(ctx[18]))
      ctx[18].apply(this, arguments);
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
      if (dirty & 65536)
        mount_changes.src = ctx[16];
      if (dirty & 131072)
        mount_changes.props = ctx[17];
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
function create_default_slot(ctx) {
  let div1;
  let div0;
  let repo;
  let current;
  repo = new Repo({
    props: {
      $$slots: {
        default: [
          create_default_slot_1,
          ({ esModule, props, handleChange }) => ({
            16: esModule,
            17: props,
            18: handleChange
          }),
          ({ esModule, props, handleChange }) => (esModule ? 65536 : 0) | (props ? 131072 : 0) | (handleChange ? 262144 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(repo.$$.fragment);
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(repo.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "flex-1 w-2/3 bg-neutral-700 text-neutral-200 pt-16");
      attr(div1, "class", "flex flex-row min-h-screen h-full");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      mount_component(repo, div0, null);
      current = true;
    },
    p(ctx2, dirty) {
      const repo_changes = {};
      if (dirty & 1507328) {
        repo_changes.$$scope = { dirty, ctx: ctx2 };
      }
      repo.$set(repo_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(repo.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(repo.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(repo);
    }
  };
}
function create_fragment$1(ctx) {
  let main;
  let walletmanager;
  let t0;
  let div;
  let sidenav;
  let t1;
  let current_block_type_index;
  let if_block;
  let current;
  walletmanager = new WalletManager({});
  walletmanager.$on("ownerAddress", ctx[6]);
  walletmanager.$on("Ed25519PublicKey", ctx[5]);
  walletmanager.$on("wallet", ctx[7]);
  sidenav = new SideNav({
    props: {
      $$slots: {
        default: [
          create_default_slot_2,
          ({ hideNav }) => ({ 19: hideNav }),
          ({ hideNav }) => hideNav ? 524288 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0] && ctx2[1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      main = element("main");
      create_component(walletmanager.$$.fragment);
      t0 = space();
      div = element("div");
      create_component(sidenav.$$.fragment);
      t1 = space();
      if_block.c();
      this.h();
    },
    l(nodes) {
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      claim_component(walletmanager.$$.fragment, main_nodes);
      t0 = claim_space(main_nodes);
      div = claim_element(main_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(sidenav.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      t1 = claim_space(main_nodes);
      if_block.l(main_nodes);
      main_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "text-white");
      attr(main, "class", "w-screen");
    },
    m(target, anchor) {
      insert_hydration(target, main, anchor);
      mount_component(walletmanager, main, null);
      append_hydration(main, t0);
      append_hydration(main, div);
      mount_component(sidenav, div, null);
      append_hydration(main, t1);
      if_blocks[current_block_type_index].m(main, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const sidenav_changes = {};
      if (dirty & 1048588) {
        sidenav_changes.$$scope = { dirty, ctx: ctx2 };
      }
      sidenav.$set(sidenav_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(main, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(walletmanager.$$.fragment, local);
      transition_in(sidenav.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(walletmanager.$$.fragment, local);
      transition_out(sidenav.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(walletmanager);
      destroy_component(sidenav);
      if_blocks[current_block_type_index].d();
    }
  };
}
function handleMsg() {
}
function instance($$self, $$props, $$invalidate) {
  let local = false;
  let wallet;
  let ownerAddress;
  let Ed25519PublicKey;
  let connect;
  let username;
  let peers = /* @__PURE__ */ new Set();
  onMount(async () => {
    ({ connect } = await __vitePreload(() => import("./lib-1e1277cc.js"), true ? ["./lib-1e1277cc.js","./events-4b10efcd.js","./base32-9ef16083.js","./index-fcbc46b5.js","./index-bfa8ea01.js"] : void 0, import.meta.url));
  });
  function keyConnect(e) {
    Ed25519PublicKey = e.detail;
    $$invalidate(2, username = getAddress(Ed25519PublicKey));
    connect({
      username,
      topic: "peerpiper",
      handleConnect,
      handleClose,
      handleMsg
    });
  }
  const handleAddress = (e) => $$invalidate(1, ownerAddress = e.detail);
  function handleConnect(peer) {
    console.log("handleConnect", peer);
    $$invalidate(3, peers = peers.add(peer.client_id));
  }
  function handleClose(peer) {
    console.log("handleClose", peer);
    $$invalidate(3, peers = peers.delete(peer.client_id));
  }
  const handleWallet = (e) => $$invalidate(0, wallet = e.detail.wallet);
  return [
    wallet,
    ownerAddress,
    username,
    peers,
    local,
    keyConnect,
    handleAddress,
    handleWallet
  ];
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
  base32 as b,
  commonjsGlobal as c,
  decode$1 as d,
  baseX as e,
  from as f,
  create as g,
  coerce as h,
  base32$1 as i,
  base58 as j,
  getDefaultExportFromCjs as k,
  base58btc as l,
  fade as m,
  getAugmentedNamespace as n,
  rfc4648 as r,
  toString as t
};
//# sourceMappingURL=_page-08a178f6.js.map
