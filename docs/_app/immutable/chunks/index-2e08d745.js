var _a, _b, _c;
import { _ as __vitePreload } from "./preload-helper-b21cceae.js";
import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, l as claim_element, m as children, h as detach, n as attr, b as insert_hydration, f as transition_in, g as group_outros, t as transition_out, d as check_outros, H as createEventDispatcher, o as onMount, v as create_component, a as space, e as empty, w as claim_component, c as claim_space, x as mount_component, y as destroy_component, B as create_slot, C as update_slot_base, D as get_all_dirty_from_scope, E as get_slot_changes, U as svg_element, V as claim_svg_element, W as xlink_attr, F as append_hydration, A as noop, P as toggle_class, I as listen, X as action_destroyer, Q as run_all, L as add_render_callback, M as create_bidirectional_transition, Y as null_to_empty, p as set_style, Z as src_url_equal, _ as set_input_value, $ as add_resize_listener, a0 as globals, q as text, r as claim_text, u as set_data, O as binding_callbacks, a1 as bind, T as is_function, a2 as add_flush_callback, a3 as bubble } from "./index-44914e8a.js";
import { m as fade } from "./_page-dd37122a.js";
const WalletManager_svelte_svelte_type_style_lang = "";
const get_default_slot_changes$1 = (dirty) => ({
  wallet: dirty & 1,
  ownerAddress: dirty & 16,
  RSAPublicKey: dirty & 4,
  Ed25519PublicKey: dirty & 8
});
const get_default_slot_context$1 = (ctx) => ({
  wallet: ctx[0],
  ownerAddress: ctx[4],
  RSAPublicKey: ctx[2],
  Ed25519PublicKey: ctx[3]
});
function create_if_block$3(ctx) {
  let switch_instance;
  let t2;
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
      t2 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      t2 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, t2, anchor);
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
          mount_component(switch_instance, t2.parentNode, t2);
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
        detach(t2);
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
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], get_default_slot_context$1);
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
            !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, get_default_slot_changes$1),
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
function create_fragment$5(ctx) {
  let section;
  let current;
  let if_block = ctx[1] && create_if_block$3(ctx);
  return {
    c() {
      section = element("section");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      if (if_block)
        if_block.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(section, "class", "m-0 svelte-7sl4wr");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      if (if_block)
        if_block.m(section, null);
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
          if_block.m(section, null);
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
      if (detaching)
        detach(section);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let wallet;
  let Web3WalletMenu2;
  let RSAPublicKey;
  let Ed25519PublicKey;
  let ownerAddress;
  const dispatch = createEventDispatcher();
  onMount(async () => {
    $$invalidate(1, Web3WalletMenu2 = await __vitePreload(() => Promise.resolve().then(() => Web3WalletMenu$2), true ? void 0 : void 0, import.meta.url));
  });
  async function walletReady(e2) {
    var _a2;
    $$invalidate(0, wallet = e2.detail.wallet);
    console.log("walletReady", wallet);
    $$invalidate(4, ownerAddress = await ((_a2 = wallet == null ? void 0 : wallet.arweaveWalletAPI) == null ? void 0 : _a2.getActiveAddress()));
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
    Web3WalletMenu2,
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
    init(this, options, instance$4, create_fragment$5, safe_not_equal, {});
  }
}
const WalletManager$1 = WalletManager;
function e(e2, t2, n2, o2) {
  var r2, i2 = null == (r2 = o2) || "number" == typeof r2 || "boolean" == typeof r2 ? o2 : n2(o2), a2 = t2.get(i2);
  return void 0 === a2 && (a2 = e2.call(this, o2), t2.set(i2, a2)), a2;
}
function t(e2, t2, n2) {
  var o2 = Array.prototype.slice.call(arguments, 3), r2 = n2(o2), i2 = t2.get(r2);
  return void 0 === i2 && (i2 = e2.apply(this, o2), t2.set(r2, i2)), i2;
}
function n(n2, o2) {
  return function(e2, t2, n3, o3, r2) {
    return n3.bind(t2, e2, o3, r2);
  }(n2, this, 1 === n2.length ? e : t, o2.cache.create(), o2.serializer);
}
const o = JSON.stringify;
function r() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
r.prototype.has = function(e2) {
  return e2 in this.cache;
}, r.prototype.get = function(e2) {
  return this.cache[e2];
}, r.prototype.set = function(e2, t2) {
  this.cache[e2] = t2;
};
var i = { create: function() {
  return new r();
} };
const a = (e2, t2 = {}) => {
  var _a2, _b2;
  let { bounds: n2, axis: o2 = "both", gpuAcceleration: r2 = true, applyUserSelectHack: i2 = true, disabled: a2 = false, ignoreMultitouch: d2 = false, grid: h2, position: f2, cancel: g2, handle: y, defaultClass: b = "neodrag", defaultClassDragging: w = "neodrag-dragging", defaultClassDragged: v = "neodrag-dragged", defaultPosition: E = { x: 0, y: 0 }, onDragStart: A, onDrag: x, onDragEnd: C } = t2;
  const M = new Promise(requestAnimationFrame);
  let S, H, L = false, D = 0, N = 0, R = 0, T = 0, B = 0, q = 0, { x: $, y: z } = f2 ? { x: (_a2 = f2 == null ? void 0 : f2.x) != null ? _a2 : 0, y: (_b2 = f2 == null ? void 0 : f2.y) != null ? _b2 : 0 } : E;
  m($, z, e2, r2);
  let X, Y, j, k, O = "", P = !!f2;
  const U = document.body.style, W = e2.classList, F = (t3, n3) => {
    const o3 = { offsetX: D, offsetY: N, domRect: e2.getBoundingClientRect() };
    e2.dispatchEvent(new CustomEvent(t3, { detail: o3 })), n3 == null ? void 0 : n3(o3);
  };
  const J = addEventListener;
  J("touchstart", I, false), J("touchend", K, false), J("touchmove", Q, false), J("mousedown", I, false), J("mouseup", K, false), J("mousemove", Q, false), e2.style.touchAction = "none";
  const G = () => {
    let t3 = e2.offsetWidth / Y.width;
    return isNaN(t3) && (t3 = 1), t3;
  };
  function I(t3) {
    if (a2)
      return;
    if (d2 && "touchstart" === t3.type && t3.touches.length > 1)
      return;
    if (W.add(b), j = function(e3, t4) {
      if (!e3)
        return t4;
      if (e3 instanceof HTMLElement || Array.isArray(e3))
        return e3;
      const n3 = t4.querySelectorAll(e3);
      if (null === n3)
        throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");
      return Array.from(n3.values());
    }(y, e2), k = function(e3, t4) {
      if (!e3)
        return;
      if (e3 instanceof HTMLElement || Array.isArray(e3))
        return e3;
      const n3 = t4.querySelectorAll(e3);
      if (null === n3)
        throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");
      return Array.from(n3.values());
    }(g2, e2), S = /(both|x)/.test(o2), H = /(both|y)/.test(o2), void 0 !== n2 && (X = function(e3, t4) {
      if (e3 instanceof HTMLElement)
        return e3.getBoundingClientRect();
      if ("object" == typeof e3) {
        const { top: t5 = 0, left: n4 = 0, right: o3 = 0, bottom: r4 = 0 } = e3;
        return { top: t5, right: window.innerWidth - o3, bottom: window.innerHeight - r4, left: n4 };
      }
      if ("parent" === e3)
        return t4.parentNode.getBoundingClientRect();
      const n3 = document.querySelector(e3);
      if (null === n3)
        throw new Error("The selector provided for bound doesn't exists in the document.");
      return n3.getBoundingClientRect();
    }(n2, e2)), Y = e2.getBoundingClientRect(), l(y) && l(g2) && y === g2)
      throw new Error("`handle` selector can't be same as `cancel` selector");
    if (p(k, j))
      throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");
    if ((j instanceof HTMLElement ? j.contains(t3.target) : j.some((e3) => e3.contains(t3.target))) && !p(k, t3.target) && (L = true), !L)
      return;
    i2 && (O = U.userSelect, U.userSelect = "none"), F("neodrag:start", A);
    const { clientX: r3, clientY: c2 } = s(t3) ? t3.touches[0] : t3, u2 = G();
    S && (R = r3 - $ / u2), H && (T = c2 - z / u2), X && (B = r3 - Y.left, q = c2 - Y.top);
  }
  function K() {
    L && (W.remove(w), W.add(v), i2 && (U.userSelect = O), F("neodrag:end", C), S && (R = D), S && (T = N), L = false);
  }
  function Q(t3) {
    if (!L)
      return;
    W.add(w), t3.preventDefault(), Y = e2.getBoundingClientRect();
    const { clientX: n3, clientY: o3 } = s(t3) ? t3.touches[0] : t3;
    let i3 = n3, a3 = o3;
    const l2 = G();
    if (X) {
      const e3 = { left: X.left + B, top: X.top + q, right: X.right + B - Y.width, bottom: X.bottom + q - Y.height };
      i3 = c(i3, e3.left, e3.right), a3 = c(a3, e3.top, e3.bottom);
    }
    if (Array.isArray(h2)) {
      let [e3, t4] = h2;
      if (isNaN(+e3) || e3 < 0)
        throw new Error("1st argument of `grid` must be a valid positive number");
      if (isNaN(+t4) || t4 < 0)
        throw new Error("2nd argument of `grid` must be a valid positive number");
      let n4 = i3 - R, o4 = a3 - T;
      [n4, o4] = u([e3 / l2, t4 / l2], n4, o4), i3 = R + n4, a3 = T + o4;
    }
    S && (D = Math.round((i3 - R) * l2)), H && (N = Math.round((a3 - T) * l2)), $ = D, z = N, F("neodrag", x), M.then(() => m(D, N, e2, r2));
  }
  return { destroy: () => {
    const e3 = removeEventListener;
    e3("touchstart", I, false), e3("touchend", K, false), e3("touchmove", Q, false), e3("mousedown", I, false), e3("mouseup", K, false), e3("mousemove", Q, false);
  }, update: (t3) => {
    var _a3, _b3, _c2, _d, _e, _f, _g, _h, _i, _j, _k;
    o2 = t3.axis || "both", a2 = (_a3 = t3.disabled) != null ? _a3 : false, d2 = (_b3 = t3.ignoreMultitouch) != null ? _b3 : false, y = t3.handle, n2 = t3.bounds, g2 = t3.cancel, i2 = (_c2 = t3.applyUserSelectHack) != null ? _c2 : true, h2 = t3.grid, r2 = (_d = t3.gpuAcceleration) != null ? _d : true;
    const s2 = W.contains(v);
    W.remove(b, v), b = (_e = t3.defaultClass) != null ? _e : "neodrag", w = (_f = t3.defaultClassDragging) != null ? _f : "neodrag-dragging", v = (_g = t3.defaultClassDragged) != null ? _g : "neodrag-dragged", W.add(b), s2 && W.add(v), P && ($ = D = (_i = (_h = t3.position) == null ? void 0 : _h.x) != null ? _i : D, z = N = (_k = (_j = t3.position) == null ? void 0 : _j.y) != null ? _k : N, M.then(() => m(D, N, e2, r2)));
  } };
}, s = (e2) => {
  var _a2;
  return !!((_a2 = e2.touches) == null ? void 0 : _a2.length);
}, c = (e2, t2, n2) => Math.min(Math.max(e2, t2), n2), l = (e2) => "string" == typeof e2, u = (d = ([e2, t2], n2, o2) => {
  const r2 = (e3, t3) => Math.ceil(e3 / t3) * t3;
  return [r2(n2, e2), r2(o2, t2)];
}, f = (_a = h == null ? void 0 : h.cache) != null ? _a : i, g = (_b = h == null ? void 0 : h.serializer) != null ? _b : o, ((_c = h == null ? void 0 : h.strategy) != null ? _c : n)(d, { cache: f, serializer: g }));
var d, h, f, g;
function p(e2, t2) {
  const n2 = t2 instanceof HTMLElement ? [t2] : t2;
  return e2 instanceof HTMLElement ? n2.some((t3) => e2.contains(t3)) : !!Array.isArray(e2) && e2.some((e3) => n2.some((t3) => e3.contains(t3)));
}
function m(e2, t2, n2, o2) {
  n2.style.transform = o2 ? `translate3d(${+e2}px, ${+t2}px, 0)` : `translate(${+e2}px, ${+t2}px)`;
}
const Logo_svelte_svelte_type_style_lang = "";
function create_fragment$4(ctx) {
  let div;
  let svg;
  let defs0;
  let defs1;
  let path0;
  let path1;
  let path2;
  let radialGradient;
  let stop0;
  let stop1;
  let use0;
  let use1;
  let use2;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      defs0 = svg_element("defs");
      defs1 = svg_element("defs");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      radialGradient = svg_element("radialGradient");
      stop0 = svg_element("stop");
      stop1 = svg_element("stop");
      use0 = svg_element("use");
      use1 = svg_element("use");
      use2 = svg_element("use");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        xmlns: true,
        "xmlns:xlink": true,
        viewBox: true,
        width: true,
        height: true,
        class: true
      });
      var svg_nodes = children(svg);
      defs0 = claim_svg_element(svg_nodes, "defs", {});
      children(defs0).forEach(detach);
      defs1 = claim_svg_element(svg_nodes, "defs", {});
      var defs1_nodes = children(defs1);
      path0 = claim_svg_element(defs1_nodes, "path", { id: true, d: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(defs1_nodes, "path", { id: true, d: true });
      children(path1).forEach(detach);
      path2 = claim_svg_element(defs1_nodes, "path", { id: true, d: true });
      children(path2).forEach(detach);
      radialGradient = claim_svg_element(defs1_nodes, "radialGradient", {
        id: true,
        cx: true,
        cy: true,
        r: true,
        gradientUnits: true
      });
      var radialGradient_nodes = children(radialGradient);
      stop0 = claim_svg_element(radialGradient_nodes, "stop", { offset: true, "stop-color": true });
      children(stop0).forEach(detach);
      stop1 = claim_svg_element(radialGradient_nodes, "stop", { offset: true, "stop-color": true });
      children(stop1).forEach(detach);
      radialGradient_nodes.forEach(detach);
      defs1_nodes.forEach(detach);
      use0 = claim_svg_element(svg_nodes, "use", { fill: true, "xlink:href": true });
      children(use0).forEach(detach);
      use1 = claim_svg_element(svg_nodes, "use", { fill: true, "xlink:href": true });
      children(use1).forEach(detach);
      use2 = claim_svg_element(svg_nodes, "use", { fill: true, "xlink:href": true });
      children(use2).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "id", "a");
      attr(path0, "d", "M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z");
      attr(path1, "id", "c");
      attr(path1, "d", "M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z");
      attr(path2, "id", "d");
      attr(path2, "d", "M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z");
      attr(stop0, "offset", "0%");
      attr(stop0, "stop-color", "#69ed66");
      attr(stop1, "offset", "100%");
      attr(stop1, "stop-color", "#279c19");
      attr(radialGradient, "id", "b");
      attr(radialGradient, "cx", "992.3");
      attr(radialGradient, "cy", "174.2");
      attr(radialGradient, "r", "1312.8");
      attr(radialGradient, "gradientUnits", "userSpaceOnUse");
      attr(use0, "fill", "url(#b)");
      xlink_attr(use0, "xlink:href", "#a");
      attr(use1, "fill", "#fff");
      xlink_attr(use1, "xlink:href", "#c");
      attr(use2, "fill", "#fff");
      xlink_attr(use2, "xlink:href", "#d");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
      attr(svg, "viewBox", "0 0 1440 1440");
      attr(svg, "width", "100");
      attr(svg, "height", "100");
      attr(svg, "class", "svelte-189qcdl");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, defs0);
      append_hydration(svg, defs1);
      append_hydration(defs1, path0);
      append_hydration(defs1, path1);
      append_hydration(defs1, path2);
      append_hydration(defs1, radialGradient);
      append_hydration(radialGradient, stop0);
      append_hydration(radialGradient, stop1);
      append_hydration(svg, use0);
      append_hydration(svg, use1);
      append_hydration(svg, use2);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
class Logo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$4, safe_not_equal, {});
  }
}
const MenuWrapper_svelte_svelte_type_style_lang = "";
const get_default_slot_changes = (dirty) => ({
  saveInputURL: dirty & 8,
  url: dirty & 1
});
const get_default_slot_context = (ctx) => ({
  openNav: ctx[7],
  hideNav: ctx[6],
  saveInputURL: ctx[3],
  url: ctx[0]
});
function create_if_block$2(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], get_default_slot_context);
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
      attr(div, "class", "sidenav svelte-1aua2m3");
      toggle_class(div, "open", ctx[2]);
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
        if (default_slot.p && (!current || dirty & 265)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      }
      if (dirty & 4) {
        toggle_class(div, "open", ctx2[2]);
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
  let logo;
  let t0;
  let div3;
  let div0;
  let t1;
  let div1;
  let t2;
  let div2;
  let t3;
  let div5;
  let t4;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  logo = new Logo({});
  let if_block = ctx[1] && create_if_block$2(ctx);
  return {
    c() {
      div4 = element("div");
      create_component(logo.$$.fragment);
      t0 = space();
      div3 = element("div");
      div0 = element("div");
      t1 = space();
      div1 = element("div");
      t2 = space();
      div2 = element("div");
      t3 = space();
      div5 = element("div");
      t4 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      claim_component(logo.$$.fragment, div4_nodes);
      t0 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      t1 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", { class: true });
      children(div1).forEach(detach);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      children(div2).forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t3 = claim_space(nodes);
      div5 = claim_element(nodes, "DIV", { class: true });
      children(div5).forEach(detach);
      t4 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(div0, "class", "bar1 svelte-1aua2m3");
      attr(div1, "class", "bar2 svelte-1aua2m3");
      attr(div2, "class", "bar3 svelte-1aua2m3");
      attr(div3, "class", "menu-icon svelte-1aua2m3");
      attr(div4, "class", "container svelte-1aua2m3");
      toggle_class(div4, "change", ctx[2]);
      attr(div5, "class", "w-screen svelte-1aua2m3");
      toggle_class(div5, "mask", ctx[2]);
    },
    m(target, anchor) {
      insert_hydration(target, div4, anchor);
      mount_component(logo, div4, null);
      append_hydration(div4, t0);
      append_hydration(div4, div3);
      append_hydration(div3, div0);
      append_hydration(div3, t1);
      append_hydration(div3, div1);
      append_hydration(div3, t2);
      append_hydration(div3, div2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, div5, anchor);
      insert_hydration(target, t4, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(div4, "keypress", ctx[4]),
          listen(div4, "click", ctx[4]),
          action_destroyer(a.call(null, div4)),
          listen(div5, "keypress", ctx[5]),
          listen(div5, "click", ctx[5])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 4) {
        toggle_class(div4, "change", ctx2[2]);
      }
      if (dirty & 4) {
        toggle_class(div5, "mask", ctx2[2]);
      }
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
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
      transition_in(logo.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(logo.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      destroy_component(logo);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div5);
      if (detaching)
        detach(t4);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
const INPUT_URL = "INPUT_URL";
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { inputUrl } = $$props;
  let ready;
  let navOpen;
  let saveInputURL;
  onMount(async () => {
    if (typeof window.indexedDB === "undefined") {
      console.log("IndexedDB not available");
      return;
    }
    const { ImmortalDB } = await __vitePreload(() => import("./index-f3824ee7.js"), true ? [] : void 0, import.meta.url);
    $$invalidate(3, saveInputURL = async (e2) => {
      const src = e2.detail;
      try {
        await ImmortalDB.set(INPUT_URL, src);
      } catch (error) {
        console.warn("Did not save", src, error);
      }
    });
    try {
      const storedValue = await ImmortalDB.get(INPUT_URL, null);
      if (storedValue) {
        $$invalidate(0, inputUrl = storedValue);
      }
    } catch (error) {
      console.warn("Did not get", error);
    }
    $$invalidate(1, ready = true);
  });
  function handleNav() {
    $$invalidate(2, navOpen = !navOpen);
  }
  function onClickOutside(event) {
    $$invalidate(2, navOpen = false);
  }
  function hideNav() {
    $$invalidate(2, navOpen = false);
  }
  const openNav = () => $$invalidate(2, navOpen = true);
  $$self.$$set = ($$props2) => {
    if ("inputUrl" in $$props2)
      $$invalidate(0, inputUrl = $$props2.inputUrl);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  return [
    inputUrl,
    ready,
    navOpen,
    saveInputURL,
    handleNav,
    onClickOutside,
    hideNav,
    openNav,
    $$scope,
    slots
  ];
}
class MenuWrapper extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { inputUrl: 0 });
  }
}
var MessageType;
(function(MessageType2) {
  MessageType2["Call"] = "call";
  MessageType2["Reply"] = "reply";
  MessageType2["Syn"] = "syn";
  MessageType2["SynAck"] = "synAck";
  MessageType2["Ack"] = "ack";
})(MessageType || (MessageType = {}));
var Resolution;
(function(Resolution2) {
  Resolution2["Fulfilled"] = "fulfilled";
  Resolution2["Rejected"] = "rejected";
})(Resolution || (Resolution = {}));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["ConnectionDestroyed"] = "ConnectionDestroyed";
  ErrorCode2["ConnectionTimeout"] = "ConnectionTimeout";
  ErrorCode2["NoIframeSrc"] = "NoIframeSrc";
})(ErrorCode || (ErrorCode = {}));
var NativeErrorName;
(function(NativeErrorName2) {
  NativeErrorName2["DataCloneError"] = "DataCloneError";
})(NativeErrorName || (NativeErrorName = {}));
var NativeEventType;
(function(NativeEventType2) {
  NativeEventType2["Message"] = "message";
})(NativeEventType || (NativeEventType = {}));
const createDestructor = (localName, log) => {
  const callbacks = [];
  let destroyed = false;
  return {
    destroy(error) {
      if (!destroyed) {
        destroyed = true;
        log(`${localName}: Destroying connection`);
        callbacks.forEach((callback) => {
          callback(error);
        });
      }
    },
    onDestroy(callback) {
      destroyed ? callback() : callbacks.push(callback);
    }
  };
};
const createLogger = (debug) => {
  return (...args) => {
    if (debug) {
      console.log("[Penpal]", ...args);
    }
  };
};
const DEFAULT_PORT_BY_PROTOCOL = {
  "http:": "80",
  "https:": "443"
};
const URL_REGEX = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/;
const opaqueOriginSchemes = ["file:", "data:"];
const getOriginFromSrc = (src) => {
  if (src && opaqueOriginSchemes.find((scheme) => src.startsWith(scheme))) {
    return "null";
  }
  const location = document.location;
  const regexResult = URL_REGEX.exec(src);
  let protocol;
  let hostname;
  let port;
  if (regexResult) {
    protocol = regexResult[1] ? regexResult[1] : location.protocol;
    hostname = regexResult[2];
    port = regexResult[4];
  } else {
    protocol = location.protocol;
    hostname = location.hostname;
    port = location.port;
  }
  const portSuffix = port && port !== DEFAULT_PORT_BY_PROTOCOL[protocol] ? `:${port}` : "";
  return `${protocol}//${hostname}${portSuffix}`;
};
const serializeError = ({ name, message, stack }) => ({
  name,
  message,
  stack
});
const deserializeError = (obj) => {
  const deserializedError = new Error();
  Object.keys(obj).forEach((key) => deserializedError[key] = obj[key]);
  return deserializedError;
};
const connectCallReceiver = (info, serializedMethods, log) => {
  const { localName, local, remote, originForSending, originForReceiving } = info;
  let destroyed = false;
  const handleMessageEvent = (event) => {
    if (event.source !== remote || event.data.penpal !== MessageType.Call) {
      return;
    }
    if (originForReceiving !== "*" && event.origin !== originForReceiving) {
      log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);
      return;
    }
    const callMessage = event.data;
    const { methodName, args, id: id2 } = callMessage;
    log(`${localName}: Received ${methodName}() call`);
    const createPromiseHandler = (resolution) => {
      return (returnValue) => {
        log(`${localName}: Sending ${methodName}() reply`);
        if (destroyed) {
          log(`${localName}: Unable to send ${methodName}() reply due to destroyed connection`);
          return;
        }
        const message = {
          penpal: MessageType.Reply,
          id: id2,
          resolution,
          returnValue
        };
        if (resolution === Resolution.Rejected && returnValue instanceof Error) {
          message.returnValue = serializeError(returnValue);
          message.returnValueIsError = true;
        }
        try {
          remote.postMessage(message, originForSending);
        } catch (err) {
          if (err.name === NativeErrorName.DataCloneError) {
            const errorReplyMessage = {
              penpal: MessageType.Reply,
              id: id2,
              resolution: Resolution.Rejected,
              returnValue: serializeError(err),
              returnValueIsError: true
            };
            remote.postMessage(errorReplyMessage, originForSending);
          }
          throw err;
        }
      };
    };
    new Promise((resolve) => resolve(serializedMethods[methodName].apply(serializedMethods, args))).then(createPromiseHandler(Resolution.Fulfilled), createPromiseHandler(Resolution.Rejected));
  };
  local.addEventListener(NativeEventType.Message, handleMessageEvent);
  return () => {
    destroyed = true;
    local.removeEventListener(NativeEventType.Message, handleMessageEvent);
  };
};
let id = 0;
const generateId = () => ++id;
const KEY_PATH_DELIMITER = ".";
const keyPathToSegments = (keyPath) => keyPath ? keyPath.split(KEY_PATH_DELIMITER) : [];
const segmentsToKeyPath = (segments) => segments.join(KEY_PATH_DELIMITER);
const createKeyPath = (key, prefix) => {
  const segments = keyPathToSegments(prefix || "");
  segments.push(key);
  return segmentsToKeyPath(segments);
};
const setAtKeyPath = (subject, keyPath, value) => {
  const segments = keyPathToSegments(keyPath);
  segments.reduce((prevSubject, key, idx) => {
    if (typeof prevSubject[key] === "undefined") {
      prevSubject[key] = {};
    }
    if (idx === segments.length - 1) {
      prevSubject[key] = value;
    }
    return prevSubject[key];
  }, subject);
  return subject;
};
const serializeMethods = (methods, prefix) => {
  const flattenedMethods = {};
  Object.keys(methods).forEach((key) => {
    const value = methods[key];
    const keyPath = createKeyPath(key, prefix);
    if (typeof value === "object") {
      Object.assign(flattenedMethods, serializeMethods(value, keyPath));
    }
    if (typeof value === "function") {
      flattenedMethods[keyPath] = value;
    }
  });
  return flattenedMethods;
};
const deserializeMethods = (flattenedMethods) => {
  const methods = {};
  for (const keyPath in flattenedMethods) {
    setAtKeyPath(methods, keyPath, flattenedMethods[keyPath]);
  }
  return methods;
};
const connectCallSender = (callSender, info, methodKeyPaths, destroyConnection, log) => {
  const { localName, local, remote, originForSending, originForReceiving } = info;
  let destroyed = false;
  log(`${localName}: Connecting call sender`);
  const createMethodProxy = (methodName) => {
    return (...args) => {
      log(`${localName}: Sending ${methodName}() call`);
      let iframeRemoved;
      try {
        if (remote.closed) {
          iframeRemoved = true;
        }
      } catch (e2) {
        iframeRemoved = true;
      }
      if (iframeRemoved) {
        destroyConnection();
      }
      if (destroyed) {
        const error = new Error(`Unable to send ${methodName}() call due to destroyed connection`);
        error.code = ErrorCode.ConnectionDestroyed;
        throw error;
      }
      return new Promise((resolve, reject) => {
        const id2 = generateId();
        const handleMessageEvent = (event) => {
          if (event.source !== remote || event.data.penpal !== MessageType.Reply || event.data.id !== id2) {
            return;
          }
          if (originForReceiving !== "*" && event.origin !== originForReceiving) {
            log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);
            return;
          }
          const replyMessage = event.data;
          log(`${localName}: Received ${methodName}() reply`);
          local.removeEventListener(NativeEventType.Message, handleMessageEvent);
          let returnValue = replyMessage.returnValue;
          if (replyMessage.returnValueIsError) {
            returnValue = deserializeError(returnValue);
          }
          (replyMessage.resolution === Resolution.Fulfilled ? resolve : reject)(returnValue);
        };
        local.addEventListener(NativeEventType.Message, handleMessageEvent);
        const callMessage = {
          penpal: MessageType.Call,
          id: id2,
          methodName,
          args
        };
        remote.postMessage(callMessage, originForSending);
      });
    };
  };
  const flattenedMethods = methodKeyPaths.reduce((api, name) => {
    api[name] = createMethodProxy(name);
    return api;
  }, {});
  Object.assign(callSender, deserializeMethods(flattenedMethods));
  return () => {
    destroyed = true;
  };
};
const handleAckMessageFactory = (serializedMethods, childOrigin, originForSending, destructor, log) => {
  const { destroy, onDestroy } = destructor;
  let destroyCallReceiver;
  let receiverMethodNames;
  const callSender = {};
  return (event) => {
    if (childOrigin !== "*" && event.origin !== childOrigin) {
      log(`Parent: Handshake - Received ACK message from origin ${event.origin} which did not match expected origin ${childOrigin}`);
      return;
    }
    log("Parent: Handshake - Received ACK");
    const info = {
      localName: "Parent",
      local: window,
      remote: event.source,
      originForSending,
      originForReceiving: childOrigin
    };
    if (destroyCallReceiver) {
      destroyCallReceiver();
    }
    destroyCallReceiver = connectCallReceiver(info, serializedMethods, log);
    onDestroy(destroyCallReceiver);
    if (receiverMethodNames) {
      receiverMethodNames.forEach((receiverMethodName) => {
        delete callSender[receiverMethodName];
      });
    }
    receiverMethodNames = event.data.methodNames;
    const destroyCallSender = connectCallSender(callSender, info, receiverMethodNames, destroy, log);
    onDestroy(destroyCallSender);
    return callSender;
  };
};
const handleSynMessageFactory = (log, serializedMethods, childOrigin, originForSending) => {
  return (event) => {
    if (!event.source) {
      return;
    }
    if (childOrigin !== "*" && event.origin !== childOrigin) {
      log(`Parent: Handshake - Received SYN message from origin ${event.origin} which did not match expected origin ${childOrigin}`);
      return;
    }
    log("Parent: Handshake - Received SYN, responding with SYN-ACK");
    const synAckMessage = {
      penpal: MessageType.SynAck,
      methodNames: Object.keys(serializedMethods)
    };
    event.source.postMessage(synAckMessage, originForSending);
  };
};
const CHECK_IFRAME_IN_DOC_INTERVAL = 6e4;
const monitorIframeRemoval = (iframe, destructor) => {
  const { destroy, onDestroy } = destructor;
  const checkIframeInDocIntervalId = setInterval(() => {
    if (!iframe.isConnected) {
      clearInterval(checkIframeInDocIntervalId);
      destroy();
    }
  }, CHECK_IFRAME_IN_DOC_INTERVAL);
  onDestroy(() => {
    clearInterval(checkIframeInDocIntervalId);
  });
};
const startConnectionTimeout = (timeout, callback) => {
  let timeoutId;
  if (timeout !== void 0) {
    timeoutId = window.setTimeout(() => {
      const error = new Error(`Connection timed out after ${timeout}ms`);
      error.code = ErrorCode.ConnectionTimeout;
      callback(error);
    }, timeout);
  }
  return () => {
    clearTimeout(timeoutId);
  };
};
const validateIframeHasSrcOrSrcDoc = (iframe) => {
  if (!iframe.src && !iframe.srcdoc) {
    const error = new Error("Iframe must have src or srcdoc property defined.");
    error.code = ErrorCode.NoIframeSrc;
    throw error;
  }
};
const connectToChild = (options) => {
  let { iframe, methods = {}, childOrigin, timeout, debug = false } = options;
  const log = createLogger(debug);
  const destructor = createDestructor("Parent", log);
  const { onDestroy, destroy } = destructor;
  if (!childOrigin) {
    validateIframeHasSrcOrSrcDoc(iframe);
    childOrigin = getOriginFromSrc(iframe.src);
  }
  const originForSending = childOrigin === "null" ? "*" : childOrigin;
  const serializedMethods = serializeMethods(methods);
  const handleSynMessage = handleSynMessageFactory(log, serializedMethods, childOrigin, originForSending);
  const handleAckMessage = handleAckMessageFactory(serializedMethods, childOrigin, originForSending, destructor, log);
  const promise = new Promise((resolve, reject) => {
    const stopConnectionTimeout = startConnectionTimeout(timeout, destroy);
    const handleMessage = (event) => {
      if (event.source !== iframe.contentWindow || !event.data) {
        return;
      }
      if (event.data.penpal === MessageType.Syn) {
        handleSynMessage(event);
        return;
      }
      if (event.data.penpal === MessageType.Ack) {
        const callSender = handleAckMessage(event);
        if (callSender) {
          stopConnectionTimeout();
          resolve(callSender);
        }
        return;
      }
    };
    window.addEventListener(NativeEventType.Message, handleMessage);
    log("Parent: Awaiting handshake");
    monitorIframeRemoval(iframe, destructor);
    onDestroy((error) => {
      window.removeEventListener(NativeEventType.Message, handleMessage);
      if (error) {
        reject(error);
      }
    });
  });
  return {
    promise,
    destroy() {
      destroy();
    }
  };
};
function create_if_block_3(ctx) {
  let div;
  let svg;
  let rect;
  let path;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        xmlns: true,
        "enable-background": true,
        viewBox: true,
        fill: true
      });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", { fill: true, height: true, width: true });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", { d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "fill", "none");
      attr(rect, "height", "24");
      attr(rect, "width", "24");
      attr(path, "d", "M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "enable-background", "new 0 0 24 24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, rect);
      append_hydration(svg, path);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  let svg;
  let path0;
  let path1;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", { xmlns: true, viewBox: true, fill: true });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0 0h24v24H0z");
      attr(path0, "fill", "none");
      attr(path1, "d", "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let svg;
  let path0;
  let path1;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", { xmlns: true, viewBox: true, fill: true });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0 0h24v24H0z");
      attr(path0, "fill", "none");
      attr(path1, "d", "M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block$1(ctx) {
  let div;
  let svg;
  let path0;
  let path1;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", { xmlns: true, viewBox: true, fill: true });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0 0h24v24H0V0z");
      attr(path0, "fill", "none");
      attr(path1, "d", "M18 14.49V9c0-1-1.01-2.01-2-2V3h-2v4h-4V3H8v2.48l9.51 9.5.49-.49zm-1.76 1.77L7.2 7.2l-.01.01L3.98 4 2.71 5.25l3.36 3.36C6.04 8.74 6 8.87 6 9v5.48L9.5 18v3h5v-3l.48-.48L19.45 22l1.26-1.28-4.47-4.46z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_fragment$2(ctx) {
  let button;
  let div;
  let t0;
  let t1;
  let t2;
  let t3;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[0] === "close" && create_if_block_3();
  let if_block1 = ctx[0] === "launch" && create_if_block_2();
  let if_block2 = ctx[0] === "plug" && create_if_block_1();
  let if_block3 = ctx[0] === "unplug" && create_if_block$1();
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      button = element("button");
      div = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      if (if_block3)
        if_block3.c();
      t3 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {});
      var button_nodes = children(button);
      div = claim_element(button_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block2)
        if_block2.l(div_nodes);
      t2 = claim_space(div_nodes);
      if (if_block3)
        if_block3.l(div_nodes);
      div_nodes.forEach(detach);
      t3 = claim_space(button_nodes);
      if (default_slot)
        default_slot.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "img-container");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, div);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t0);
      if (if_block1)
        if_block1.m(div, null);
      append_hydration(div, t1);
      if (if_block2)
        if_block2.m(div, null);
      append_hydration(div, t2);
      if (if_block3)
        if_block3.m(div, null);
      append_hydration(button, t3);
      if (default_slot) {
        default_slot.m(button, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "keypress", ctx[4]),
          listen(button, "click", ctx[5])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] === "close") {
        if (if_block0) {
          if (dirty & 1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3();
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[0] === "launch") {
        if (if_block1) {
          if (dirty & 1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2();
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (ctx2[0] === "plug") {
        if (if_block2) {
          if (dirty & 1) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1();
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (ctx2[0] === "unplug") {
        if (if_block3) {
          if (dirty & 1) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block$1();
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(div, null);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(if_block3);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(if_block3);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { icon } = $$props;
  const dispatch = createEventDispatcher();
  const keypress_handler = () => dispatch("click", "detail value");
  const click_handler = () => dispatch("click", "detail value");
  $$self.$$set = ($$props2) => {
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [icon, dispatch, $$scope, slots, keypress_handler, click_handler];
}
class WalletSelectorIcons extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { icon: 0 });
  }
}
const ConnectorInside_svelte_svelte_type_style_lang = "";
const { window: window_1 } = globals;
function create_default_slot$1(ctx) {
  let span;
  let t_value = ctx[9].loading || !ctx[7] ? "Loading..." : "Load";
  let t2;
  let span_class_value;
  return {
    c() {
      span = element("span");
      t2 = text(t_value);
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t2 = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a2;
      attr(span, "class", span_class_value = (((_a2 = ctx[0]) == null ? void 0 : _a2.address) ? " connected " : " disconnected ") + " hidden sm:flex svelte-nu5b3h");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t2);
    },
    p(ctx2, dirty) {
      var _a2;
      if (dirty & 640 && t_value !== (t_value = ctx2[9].loading || !ctx2[7] ? "Loading..." : "Load"))
        set_data(t2, t_value);
      if (dirty & 1 && span_class_value !== (span_class_value = (((_a2 = ctx2[0]) == null ? void 0 : _a2.address) ? " connected " : " disconnected ") + " hidden sm:flex svelte-nu5b3h")) {
        attr(span, "class", span_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_fragment$1(ctx) {
  let div6;
  let div4;
  let a2;
  let div0;
  let logo;
  let t0;
  let div1;
  let input;
  let t1;
  let span;
  let t2;
  let div3;
  let div2;
  let iconbutton;
  let div2_class_value;
  let div4_resize_listener;
  let t3;
  let div5;
  let iframe_1;
  let iframe_1_src_value;
  let div5_resize_listener;
  let current;
  let mounted;
  let dispose;
  logo = new Logo({});
  iconbutton = new WalletSelectorIcons({
    props: {
      icon: ctx[10],
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  iconbutton.$on("keypress", ctx[20]);
  iconbutton.$on("click", ctx[21]);
  return {
    c() {
      div6 = element("div");
      div4 = element("div");
      a2 = element("a");
      div0 = element("div");
      create_component(logo.$$.fragment);
      t0 = space();
      div1 = element("div");
      input = element("input");
      t1 = space();
      span = element("span");
      t2 = space();
      div3 = element("div");
      div2 = element("div");
      create_component(iconbutton.$$.fragment);
      t3 = space();
      div5 = element("div");
      iframe_1 = element("iframe");
      this.h();
    },
    l(nodes) {
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div4 = claim_element(div6_nodes, "DIV", { class: true, style: true });
      var div4_nodes = children(div4);
      a2 = claim_element(div4_nodes, "A", {
        class: true,
        href: true,
        target: true,
        rel: true
      });
      var a_nodes = children(a2);
      div0 = claim_element(a_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(logo.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      a_nodes.forEach(detach);
      t0 = claim_space(div4_nodes);
      div1 = claim_element(div4_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      input = claim_element(div1_nodes, "INPUT", { class: true, placeholder: true });
      t1 = claim_space(div1_nodes);
      span = claim_element(div1_nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      div1_nodes.forEach(detach);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      claim_component(iconbutton.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t3 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { class: true, style: true });
      var div5_nodes = children(div5);
      iframe_1 = claim_element(div5_nodes, "IFRAME", {
        title: true,
        class: true,
        src: true,
        allow: true
      });
      children(iframe_1).forEach(detach);
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a2, _b2;
      attr(div0, "class", "actions logo svelte-nu5b3h");
      attr(a2, "class", "flex-0 hidden md:flex svelte-nu5b3h");
      attr(a2, "href", "https://PeerPiper.io");
      attr(a2, "target", "_blank");
      attr(a2, "rel", "noreferrer");
      attr(input, "class", "border-b-4 border-toxic url pl-0 p-2 pr-0 m-2 text-white bg-none border-none text-sm sm:text-base outline-none svelte-nu5b3h");
      attr(input, "placeholder", placeholder);
      attr(span, "class", "border-b-4 border-toxic flex-1 relative -top-2 svelte-nu5b3h");
      attr(div1, "class", "flex-shrink flex flex-col w-full pl-2 md:p-2 svelte-nu5b3h");
      attr(div2, "class", div2_class_value = null_to_empty(((_a2 = ctx[9]) == null ? void 0 : _a2.loading) ? "action dim" : ((_b2 = ctx[0]) == null ? void 0 : _b2.address) ? " connected " : " disconnected ") + " svelte-nu5b3h");
      attr(div3, "class", "hidden md:flex svelte-nu5b3h");
      attr(div4, "class", "flex flex-row space-between items-center svelte-nu5b3h");
      set_style(div4, "--topOffsetHeight", ctx[2]);
      add_render_callback(() => ctx[22].call(div4));
      attr(iframe_1, "title", "Web Wallet");
      attr(iframe_1, "class", "w-full h-full border-none min-h-full svelte-nu5b3h");
      if (!src_url_equal(iframe_1.src, iframe_1_src_value = ctx[7]))
        attr(iframe_1, "src", iframe_1_src_value);
      attr(iframe_1, "allow", "clipboard-read 'self' 'src'; clipboard-write 'self' 'src';");
      attr(div5, "class", "iframe flex w-full h-full border-none min-h-full svelte-nu5b3h");
      set_style(div5, "height", "calc(" + ctx[4] + "px + 18px)");
      add_render_callback(() => ctx[24].call(div5));
      attr(div6, "class", "flex flex-col m-2 max-w-full h-screen svelte-nu5b3h");
    },
    m(target, anchor) {
      insert_hydration(target, div6, anchor);
      append_hydration(div6, div4);
      append_hydration(div4, a2);
      append_hydration(a2, div0);
      mount_component(logo, div0, null);
      append_hydration(div4, t0);
      append_hydration(div4, div1);
      append_hydration(div1, input);
      set_input_value(input, ctx[1]);
      append_hydration(div1, t1);
      append_hydration(div1, span);
      append_hydration(div4, t2);
      append_hydration(div4, div3);
      append_hydration(div3, div2);
      mount_component(iconbutton, div2, null);
      div4_resize_listener = add_resize_listener(div4, ctx[22].bind(div4));
      append_hydration(div6, t3);
      append_hydration(div6, div5);
      append_hydration(div5, iframe_1);
      ctx[23](iframe_1);
      div5_resize_listener = add_resize_listener(div5, ctx[24].bind(div5));
      current = true;
      if (!mounted) {
        dispose = [
          listen(window_1, "keydown", ctx[13]),
          listen(input, "focus", ctx[17]),
          listen(input, "blur", ctx[18]),
          listen(input, "input", ctx[19])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2, _b2;
      if (dirty & 2 && input.value !== ctx2[1]) {
        set_input_value(input, ctx2[1]);
      }
      const iconbutton_changes = {};
      if (dirty & 1024)
        iconbutton_changes.icon = ctx2[10];
      if (dirty & 536871553) {
        iconbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      iconbutton.$set(iconbutton_changes);
      if (!current || dirty & 513 && div2_class_value !== (div2_class_value = null_to_empty(((_a2 = ctx2[9]) == null ? void 0 : _a2.loading) ? "action dim" : ((_b2 = ctx2[0]) == null ? void 0 : _b2.address) ? " connected " : " disconnected ") + " svelte-nu5b3h")) {
        attr(div2, "class", div2_class_value);
      }
      if (!current || dirty & 4) {
        set_style(div4, "--topOffsetHeight", ctx2[2]);
      }
      if (!current || dirty & 128 && !src_url_equal(iframe_1.src, iframe_1_src_value = ctx2[7])) {
        attr(iframe_1, "src", iframe_1_src_value);
      }
      if (!current || dirty & 16) {
        set_style(div5, "height", "calc(" + ctx2[4] + "px + 18px)");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(logo.$$.fragment, local);
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(logo.$$.fragment, local);
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div6);
      destroy_component(logo);
      destroy_component(iconbutton);
      div4_resize_listener();
      ctx[23](null);
      div5_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
let placeholder = "Enter Wallet Url";
function instance$1($$self, $$props, $$invalidate) {
  let connectionIcon;
  let { wallet = null } = $$props;
  let { inputUrl = "https://peerpiper.github.io/iframe-wallet-sdk/" } = $$props;
  let { topOffsetHeight = 0 } = $$props;
  let { topOffsetWidth = 0 } = $$props;
  let { iframeParentHeight = 0 } = $$props;
  let { iframeParentWidth = 0 } = $$props;
  let iframeOffsetWidth;
  let { show } = $$props;
  let { hide } = $$props;
  const dispatch = createEventDispatcher();
  let src;
  let iframe;
  let focused;
  const data = {
    loading: true
  };
  onMount(async () => {
    connect();
  });
  async function handleIframeLoad() {
    $$invalidate(9, data.loading = false, data);
    let pending;
    const connection = connectToChild({
      iframe,
      methods: {
        setIframeParentHeight(height) {
          $$invalidate(4, iframeParentHeight = height);
        },
        setIframeParentWidth(width) {
          $$invalidate(14, iframeParentWidth = width);
        },
        show() {
          show();
        },
        hide() {
          console.log("hiding", { hide });
          hide();
        },
        walletReady() {
          $$invalidate(0, wallet = pending);
          dispatch("walletReady", { wallet });
          window.arweaveWallet = wallet.arweaveWalletAPI;
          if (wallet) {
            setTimeout(
              () => {
                hide();
              },
              250
            );
          }
          return true;
        }
      }
    });
    pending = await connection.promise;
    show();
  }
  const connect = () => {
    if (src === inputUrl)
      return;
    $$invalidate(7, src = "");
    $$invalidate(7, src = inputUrl);
    $$invalidate(9, data.loading = true, data);
    dispatch("inputUrl", inputUrl);
  };
  const disconnect = () => wallet.disconnect();
  function handleKeydown(event) {
    if (event.key === "Enter" && focused)
      connect();
  }
  const focus_handler = () => $$invalidate(8, focused = true);
  const blur_handler = () => $$invalidate(8, focused = false);
  function input_input_handler() {
    inputUrl = this.value;
    $$invalidate(1, inputUrl);
  }
  const keypress_handler = () => {
    (wallet == null ? void 0 : wallet.address) ? disconnect() : connect();
  };
  const click_handler = () => {
    (wallet == null ? void 0 : wallet.address) ? disconnect() : connect();
  };
  function div4_elementresize_handler() {
    topOffsetHeight = this.offsetHeight;
    topOffsetWidth = this.offsetWidth;
    $$invalidate(2, topOffsetHeight);
    $$invalidate(3, topOffsetWidth);
  }
  function iframe_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      iframe = $$value;
      $$invalidate(6, iframe);
    });
  }
  function div5_elementresize_handler() {
    iframeOffsetWidth = this.offsetWidth;
    $$invalidate(5, iframeOffsetWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("wallet" in $$props2)
      $$invalidate(0, wallet = $$props2.wallet);
    if ("inputUrl" in $$props2)
      $$invalidate(1, inputUrl = $$props2.inputUrl);
    if ("topOffsetHeight" in $$props2)
      $$invalidate(2, topOffsetHeight = $$props2.topOffsetHeight);
    if ("topOffsetWidth" in $$props2)
      $$invalidate(3, topOffsetWidth = $$props2.topOffsetWidth);
    if ("iframeParentHeight" in $$props2)
      $$invalidate(4, iframeParentHeight = $$props2.iframeParentHeight);
    if ("iframeParentWidth" in $$props2)
      $$invalidate(14, iframeParentWidth = $$props2.iframeParentWidth);
    if ("show" in $$props2)
      $$invalidate(15, show = $$props2.show);
    if ("hide" in $$props2)
      $$invalidate(16, hide = $$props2.hide);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 64) {
      iframe && iframe.addEventListener("load", handleIframeLoad);
    }
    if ($$self.$$.dirty & 1) {
      (wallet == null ? void 0 : wallet.keepPopup) ? "close" : "launch";
    }
    if ($$self.$$.dirty & 1) {
      $$invalidate(10, connectionIcon = (wallet == null ? void 0 : wallet.address) ? "unplug" : "plug");
    }
    if ($$self.$$.dirty & 33) {
      iframeOffsetWidth && wallet && (wallet == null ? void 0 : wallet.setWidth(iframeOffsetWidth));
    }
  };
  return [
    wallet,
    inputUrl,
    topOffsetHeight,
    topOffsetWidth,
    iframeParentHeight,
    iframeOffsetWidth,
    iframe,
    src,
    focused,
    data,
    connectionIcon,
    connect,
    disconnect,
    handleKeydown,
    iframeParentWidth,
    show,
    hide,
    focus_handler,
    blur_handler,
    input_input_handler,
    keypress_handler,
    click_handler,
    div4_elementresize_handler,
    iframe_1_binding,
    div5_elementresize_handler
  ];
}
class ConnectorInside extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      wallet: 0,
      inputUrl: 1,
      topOffsetHeight: 2,
      topOffsetWidth: 3,
      iframeParentHeight: 4,
      iframeParentWidth: 14,
      show: 15,
      hide: 16
    });
  }
}
const Web3WalletMenu_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let menuwrapper;
  let current;
  menuwrapper = new MenuWrapper({
    props: {
      inputUrl: ctx[1],
      $$slots: {
        default: [
          create_default_slot,
          ({ openNav, hideNav, saveInputURL, url }) => ({
            5: openNav,
            6: hideNav,
            7: saveInputURL,
            8: url
          }),
          ({ openNav, hideNav, saveInputURL, url }) => (openNav ? 32 : 0) | (hideNav ? 64 : 0) | (saveInputURL ? 128 : 0) | (url ? 256 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(menuwrapper.$$.fragment);
    },
    l(nodes) {
      claim_component(menuwrapper.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(menuwrapper, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const menuwrapper_changes = {};
      if (dirty & 2)
        menuwrapper_changes.inputUrl = ctx2[1];
      if (dirty & 993) {
        menuwrapper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      menuwrapper.$set(menuwrapper_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuwrapper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuwrapper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuwrapper, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let connectorinside;
  let updating_wallet;
  let current;
  function connectorinside_wallet_binding(value) {
    ctx[3](value);
  }
  let connectorinside_props = {
    show: ctx[5],
    hide: ctx[6],
    inputUrl: ctx[8]
  };
  if (ctx[0] !== void 0) {
    connectorinside_props.wallet = ctx[0];
  }
  connectorinside = new ConnectorInside({ props: connectorinside_props });
  binding_callbacks.push(() => bind(connectorinside, "wallet", connectorinside_wallet_binding));
  connectorinside.$on("walletReady", ctx[4]);
  connectorinside.$on("inputUrl", function() {
    if (is_function(ctx[7]))
      ctx[7].apply(this, arguments);
  });
  return {
    c() {
      create_component(connectorinside.$$.fragment);
    },
    l(nodes) {
      claim_component(connectorinside.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(connectorinside, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const connectorinside_changes = {};
      if (dirty & 32)
        connectorinside_changes.show = ctx[5];
      if (dirty & 64)
        connectorinside_changes.hide = ctx[6];
      if (dirty & 256)
        connectorinside_changes.inputUrl = ctx[8];
      if (!updating_wallet && dirty & 1) {
        updating_wallet = true;
        connectorinside_changes.wallet = ctx[0];
        add_flush_callback(() => updating_wallet = false);
      }
      connectorinside.$set(connectorinside_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(connectorinside.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(connectorinside.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(connectorinside, detaching);
    }
  };
}
function create_fragment(ctx) {
  let section;
  let current;
  let if_block = ctx[2] && create_if_block(ctx);
  return {
    c() {
      section = element("section");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      if (if_block)
        if_block.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(section, "class", "m-0 svelte-7sl4wr");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      if (if_block)
        if_block.m(section, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
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
      if (detaching)
        detach(section);
      if (if_block)
        if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { inputUrl = "https://peerpiper.github.io/iframe-wallet-sdk/" } = $$props;
  let { wallet = null } = $$props;
  let mounted;
  onMount(() => {
    $$invalidate(2, mounted = true);
  });
  function connectorinside_wallet_binding(value) {
    wallet = value;
    $$invalidate(0, wallet);
  }
  function walletReady_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("inputUrl" in $$props2)
      $$invalidate(1, inputUrl = $$props2.inputUrl);
    if ("wallet" in $$props2)
      $$invalidate(0, wallet = $$props2.wallet);
  };
  return [wallet, inputUrl, mounted, connectorinside_wallet_binding, walletReady_handler];
}
class Web3WalletMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { inputUrl: 1, wallet: 0 });
  }
}
const Web3WalletMenu$1 = Web3WalletMenu;
const Web3WalletMenu$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Web3WalletMenu$1
}, Symbol.toStringTag, { value: "Module" }));
export {
  WalletManager$1 as WalletManager,
  Web3WalletMenu$1 as Web3WalletMenu,
  Web3WalletMenu$1 as default
};
//# sourceMappingURL=index-2e08d745.js.map
