import { S as SvelteComponent, i as init, s as safe_not_equal, a as space, e as empty, c as claim_space, b as insert_hydration, g as group_outros, t as transition_out, d as check_outros, f as transition_in, h as detach, j as afterUpdate, o as onMount, k as element, l as claim_element, m as children, n as attr, p as set_style, q as text, r as claim_text, u as set_data, v as create_component, w as claim_component, x as mount_component, y as destroy_component, z as tick } from "./chunks/index-8a0ef0c4.js";
import { g as get_base_uri, f as find_anchor, s as stores, a as scroll_state, b as set_paths, i as init$1 } from "./chunks/singletons-003ef411.js";
import { _ as __vitePreload } from "./chunks/preload-helper-b21cceae.js";
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_params(params) {
  for (const key in params) {
    params[key] = params[key].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
const tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
const DATA_SUFFIX = "/__data.json";
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function hash(value) {
  let hash2 = 5381;
  if (typeof value === "string") {
    let i = value.length;
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else if (ArrayBuffer.isView(value)) {
    const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    let i = buffer.length;
    while (i)
      hash2 = hash2 * 33 ^ buffer[--i];
  } else {
    throw new TypeError("value must be a string or TypedArray");
  }
  return (hash2 >>> 0).toString(36);
}
const native_fetch = window.fetch;
{
  window.fetch = (input, init2) => {
    const method = input instanceof Request ? input.method : (init2 == null ? void 0 : init2.method) || "GET";
    if (method !== "GET") {
      const url = new URL(input instanceof Request ? input.url : input.toString(), document.baseURI).href;
      cache.delete(url);
    }
    return native_fetch(input, init2);
  };
}
const cache = /* @__PURE__ */ new Map();
function initial_fetch(resource, resolved, opts) {
  const url = JSON.stringify(resource instanceof Request ? resource.url : resource);
  let selector = `script[data-sveltekit-fetched][data-url=${url}]`;
  if ((opts == null ? void 0 : opts.body) && (typeof opts.body === "string" || ArrayBuffer.isView(opts.body))) {
    selector += `[data-hash="${hash(opts.body)}"]`;
  }
  const script = document.querySelector(selector);
  if (script == null ? void 0 : script.textContent) {
    const { body, ...init2 } = JSON.parse(script.textContent);
    const ttl = script.getAttribute("data-ttl");
    if (ttl)
      cache.set(resolved, { body, init: init2, ttl: 1e3 * Number(ttl) });
    return Promise.resolve(new Response(body, init2));
  }
  return native_fetch(resource, opts);
}
function subsequent_fetch(resolved, opts) {
  const cached = cache.get(resolved);
  if (cached) {
    if (performance.now() < cached.ttl) {
      return new Response(cached.body, cached.init);
    }
    cache.delete(resolved);
  }
  return native_fetch(resolved, opts);
}
const param_pattern = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function parse_route_id(id) {
  const names = [];
  const types = [];
  const optional = [];
  let add_trailing_slash = true;
  const pattern = id === "/" ? /^\/$/ : new RegExp(
    `^${get_route_segments(id).map((segment, i, segments) => {
      const decoded_segment = decodeURIComponent(segment);
      const rest_match = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(decoded_segment);
      if (rest_match) {
        names.push(rest_match[1]);
        types.push(rest_match[2]);
        optional.push(false);
        return "(?:/(.*))?";
      }
      const optional_match = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(decoded_segment);
      if (optional_match) {
        names.push(optional_match[1]);
        types.push(optional_match[2]);
        optional.push(true);
        return "(?:/([^/]+))?";
      }
      const is_last = i === segments.length - 1;
      if (!decoded_segment) {
        return;
      }
      const parts = decoded_segment.split(/\[(.+?)\](?!\])/);
      const result = parts.map((content, i2) => {
        if (i2 % 2) {
          const match = param_pattern.exec(content);
          if (!match) {
            throw new Error(
              `Invalid param: ${content}. Params and matcher names can only have underscores and alphanumeric characters.`
            );
          }
          const [, is_optional, is_rest, name, type] = match;
          names.push(name);
          types.push(type);
          optional.push(!!is_optional);
          return is_rest ? "(.*?)" : is_optional ? "([^/]*)?" : "([^/]+?)";
        }
        if (is_last && content.includes("."))
          add_trailing_slash = false;
        return content.normalize().replace(/%5[Bb]/g, "[").replace(/%5[Dd]/g, "]").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }).join("");
      return "/" + result;
    }).join("")}${add_trailing_slash ? "/?" : ""}$`
  );
  return { pattern, names, types, optional };
}
function affects_path(segment) {
  return !/^\([^)]+\)$/.test(segment);
}
function get_route_segments(route) {
  return route.slice(1).split("/").filter(affects_path);
}
function exec(match, { names, types, optional }, matchers2) {
  const params = {};
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const type = types[i];
    let value = match[i + 1];
    if (value || !optional[i]) {
      if (type) {
        const matcher = matchers2[type];
        if (!matcher)
          throw new Error(`Missing "${type}" param matcher`);
        if (!matcher(value))
          return;
      }
      params[name] = value != null ? value : "";
    }
  }
  return params;
}
function parse(nodes2, server_loads2, dictionary2, matchers2) {
  const layouts_with_server_load = new Set(server_loads2);
  return Object.entries(dictionary2).map(([id, [leaf, layouts, errors]]) => {
    const { pattern, names, types, optional } = parse_route_id(id);
    const route = {
      id,
      exec: (path) => {
        const match = pattern.exec(path);
        if (match)
          return exec(match, { names, types, optional }, matchers2);
      },
      errors: [1, ...errors || []].map((n) => nodes2[n]),
      layouts: [0, ...layouts || []].map(create_layout_loader),
      leaf: create_leaf_loader(leaf)
    };
    route.errors.length = route.layouts.length = Math.max(
      route.errors.length,
      route.layouts.length
    );
    return route;
  });
  function create_leaf_loader(id) {
    const uses_server_data = id < 0;
    if (uses_server_data)
      id = ~id;
    return [uses_server_data, nodes2[id]];
  }
  function create_layout_loader(id) {
    return id === void 0 ? id : [layouts_with_server_load.has(id), nodes2[id]];
  }
}
function create_else_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[2],
        form: ctx2[1]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 4)
        switch_instance_changes.data = ctx2[2];
      if (dirty & 2)
        switch_instance_changes.form = ctx2[1];
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[2],
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx: ctx2 }
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 4)
        switch_instance_changes.data = ctx2[2];
      if (dirty & 523) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][1];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[3],
        form: ctx2[1]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 8)
        switch_instance_changes.data = ctx2[3];
      if (dirty & 2)
        switch_instance_changes.form = ctx2[1];
      if (switch_value !== (switch_value = ctx2[0][1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let if_block = ctx[5] && create_if_block_1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes2) {
      div = claim_element(nodes2, "DIV", {
        id: true,
        "aria-live": true,
        "aria-atomic": true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", "svelte-announcer");
      attr(div, "aria-live", "assertive");
      attr(div, "aria-atomic", "true");
      set_style(div, "position", "absolute");
      set_style(div, "left", "0");
      set_style(div, "top", "0");
      set_style(div, "clip", "rect(0 0 0 0)");
      set_style(div, "clip-path", "inset(50%)");
      set_style(div, "overflow", "hidden");
      set_style(div, "white-space", "nowrap");
      set_style(div, "width", "1px");
      set_style(div, "height", "1px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[6]);
    },
    l(nodes2) {
      t = claim_text(nodes2, ctx[6]);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 64)
        set_data(t, ctx2[6]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block0;
  let t;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_2, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0][1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = ctx[4] && create_if_block(ctx);
  return {
    c() {
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes2) {
      if_block0.l(nodes2);
      t = claim_space(nodes2);
      if (if_block1)
        if_block1.l(nodes2);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
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
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(t.parentNode, t);
      }
      if (ctx2[4]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { stores: stores2 } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  afterUpdate(stores2.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores2.page.subscribe(() => {
      if (mounted) {
        $$invalidate(5, navigated = true);
        $$invalidate(6, title = document.title || "untitled page");
      }
    });
    $$invalidate(4, mounted = true);
    return unsubscribe;
  });
  $$self.$$set = ($$props2) => {
    if ("stores" in $$props2)
      $$invalidate(7, stores2 = $$props2.stores);
    if ("page" in $$props2)
      $$invalidate(8, page = $$props2.page);
    if ("components" in $$props2)
      $$invalidate(0, components = $$props2.components);
    if ("form" in $$props2)
      $$invalidate(1, form = $$props2.form);
    if ("data_0" in $$props2)
      $$invalidate(2, data_0 = $$props2.data_0);
    if ("data_1" in $$props2)
      $$invalidate(3, data_1 = $$props2.data_1);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 384) {
      stores2.page.set(page);
    }
  };
  return [components, form, data_0, data_1, mounted, navigated, title, stores2, page];
}
class Root extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      stores: 7,
      page: 8,
      components: 0,
      form: 1,
      data_0: 2,
      data_1: 3
    });
  }
}
const matchers = {};
const nodes = [
  () => __vitePreload(() => import("./chunks/0-61165e22.js"), true ? ["./chunks\\0-61165e22.js","./chunks\\_layout-8d2a742b.js","./components\\pages\\_layout.svelte-4978bb9e.js","./chunks\\index-8a0ef0c4.js","./assets\\_layout-e0ca041c.css"] : void 0, import.meta.url),
  () => __vitePreload(() => import("./chunks/1-1033a0da.js"), true ? ["./chunks\\1-1033a0da.js","./components\\error.svelte-a4595f4b.js","./chunks\\index-8a0ef0c4.js","./chunks\\singletons-003ef411.js"] : void 0, import.meta.url),
  () => __vitePreload(() => import("./chunks/2-05b05842.js"), true ? ["./chunks\\2-05b05842.js","./chunks\\_page-08a178f6.js","./chunks\\index-8a0ef0c4.js","./chunks\\preload-helper-b21cceae.js","./assets\\_page-f9f0bcbc.css"] : void 0, import.meta.url)
];
const server_loads = [];
const dictionary = {
  "/": [2]
};
const hooks = {
  handleError: ({ error }) => {
    console.error(error);
  }
};
class HttpError {
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Redirect {
  constructor(status, location2) {
    this.status = status;
    this.location = location2;
  }
}
async function unwrap_promises(object) {
  var _a;
  for (const key in object) {
    if (typeof ((_a = object[key]) == null ? void 0 : _a.then) === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key2, value]) => [key2, await value]))
      );
    }
  }
  return object;
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;
function unflatten(parsed) {
  if (typeof parsed === "number")
    return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = parsed;
  const hydrated = Array(values.length);
  function hydrate(index, standalone = false) {
    if (index === UNDEFINED)
      return void 0;
    if (index === NAN)
      return NaN;
    if (index === POSITIVE_INFINITY)
      return Infinity;
    if (index === NEGATIVE_INFINITY)
      return -Infinity;
    if (index === NEGATIVE_ZERO)
      return -0;
    if (standalone)
      throw new Error(`Invalid input`);
    if (index in hydrated)
      return hydrated[index];
    const value = values[index];
    if (!value || typeof value !== "object") {
      hydrated[index] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        switch (type) {
          case "Date":
            hydrated[index] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index] = set;
            for (let i = 1; i < value.length; i += 1) {
              set.add(hydrate(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate(value[i + 1]);
            }
            break;
        }
      } else {
        const array = new Array(value.length);
        hydrated[index] = array;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE)
            continue;
          array[i] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index] = object;
      for (const key in value) {
        const n = value[key];
        object[key] = hydrate(n);
      }
    }
    return hydrated[index];
  }
  return hydrate(0);
}
const SCROLL_KEY = "sveltekit:scroll";
const INDEX_KEY = "sveltekit:index";
const routes = parse(nodes, server_loads, dictionary, matchers);
const default_layout_loader = nodes[0];
const default_error_loader = nodes[1];
default_layout_loader();
default_error_loader();
let scroll_positions = {};
try {
  scroll_positions = JSON.parse(sessionStorage[SCROLL_KEY]);
} catch {
}
function update_scroll_positions(index) {
  scroll_positions[index] = scroll_state();
}
function create_client({ target, base, trailing_slash }) {
  var _a;
  const invalidated = [];
  let load_cache = null;
  const callbacks = {
    before_navigate: [],
    after_navigate: []
  };
  let current = {
    branch: [],
    error: null,
    url: null
  };
  let hydrated = false;
  let started = false;
  let autoscroll = true;
  let updating = false;
  let navigating = false;
  let hash_navigating = false;
  let force_invalidation = false;
  let root;
  let current_history_index = (_a = history.state) == null ? void 0 : _a[INDEX_KEY];
  if (!current_history_index) {
    current_history_index = Date.now();
    history.replaceState(
      { ...history.state, [INDEX_KEY]: current_history_index },
      "",
      location.href
    );
  }
  const scroll = scroll_positions[current_history_index];
  if (scroll) {
    history.scrollRestoration = "manual";
    scrollTo(scroll.x, scroll.y);
  }
  let page;
  let token;
  let pending_invalidate;
  async function invalidate() {
    pending_invalidate = pending_invalidate || Promise.resolve();
    await pending_invalidate;
    pending_invalidate = null;
    const url = new URL(location.href);
    const intent = get_navigation_intent(url, true);
    load_cache = null;
    await update(intent, url, []);
  }
  async function goto(url, {
    noScroll = false,
    replaceState = false,
    keepFocus = false,
    state = {},
    invalidateAll = false
  }, redirect_chain, nav_token) {
    if (typeof url === "string") {
      url = new URL(url, get_base_uri(document));
    }
    return navigate({
      url,
      scroll: noScroll ? scroll_state() : null,
      keepfocus: keepFocus,
      redirect_chain,
      details: {
        state,
        replaceState
      },
      nav_token,
      accepted: () => {
        if (invalidateAll) {
          force_invalidation = true;
        }
      },
      blocked: () => {
      },
      type: "goto"
    });
  }
  async function prefetch(url) {
    const intent = get_navigation_intent(url, false);
    if (!intent) {
      throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${url}`);
    }
    load_cache = { id: intent.id, promise: load_route(intent) };
    return load_cache.promise;
  }
  async function update(intent, url, redirect_chain, opts, nav_token = {}, callback) {
    var _a2, _b;
    token = nav_token;
    let navigation_result = intent && await load_route(intent);
    if (!navigation_result) {
      navigation_result = await server_fallback(
        url,
        { id: null },
        handle_error(new Error(`Not found: ${url.pathname}`), {
          url,
          params: {},
          route: { id: null }
        }),
        404
      );
    }
    url = (intent == null ? void 0 : intent.url) || url;
    if (token !== nav_token)
      return false;
    if (navigation_result.type === "redirect") {
      if (redirect_chain.length > 10 || redirect_chain.includes(url.pathname)) {
        navigation_result = await load_root_error_page({
          status: 500,
          error: handle_error(new Error("Redirect loop"), { url, params: {}, route: { id: null } }),
          url,
          route: { id: null }
        });
      } else {
        goto(
          new URL(navigation_result.location, url).href,
          {},
          [...redirect_chain, url.pathname],
          nav_token
        );
        return false;
      }
    } else if (((_b = (_a2 = navigation_result.props) == null ? void 0 : _a2.page) == null ? void 0 : _b.status) >= 400) {
      const updated = await stores.updated.check();
      if (updated) {
        await native_navigation(url);
      }
    }
    invalidated.length = 0;
    force_invalidation = false;
    updating = true;
    if (opts && opts.details) {
      const { details } = opts;
      const change = details.replaceState ? 0 : 1;
      details.state[INDEX_KEY] = current_history_index += change;
      history[details.replaceState ? "replaceState" : "pushState"](details.state, "", url);
    }
    load_cache = null;
    if (started) {
      current = navigation_result.state;
      if (navigation_result.props.page) {
        navigation_result.props.page.url = url;
      }
      const post_update = pre_update();
      root.$set(navigation_result.props);
      post_update();
    } else {
      initialize(navigation_result);
    }
    if (opts) {
      const { scroll: scroll2, keepfocus } = opts;
      if (!keepfocus) {
        const root2 = document.body;
        const tabindex = root2.getAttribute("tabindex");
        root2.tabIndex = -1;
        root2.focus({ preventScroll: true });
        setTimeout(() => {
          var _a3;
          (_a3 = getSelection()) == null ? void 0 : _a3.removeAllRanges();
        });
        if (tabindex !== null) {
          root2.setAttribute("tabindex", tabindex);
        } else {
          root2.removeAttribute("tabindex");
        }
      }
      await tick();
      if (autoscroll) {
        const deep_linked = url.hash && document.getElementById(url.hash.slice(1));
        if (scroll2) {
          scrollTo(scroll2.x, scroll2.y);
        } else if (deep_linked) {
          deep_linked.scrollIntoView();
        } else {
          scrollTo(0, 0);
        }
      }
    } else {
      await tick();
    }
    autoscroll = true;
    if (navigation_result.props.page) {
      page = navigation_result.props.page;
    }
    if (callback)
      callback();
    updating = false;
  }
  function initialize(result) {
    var _a2, _b;
    current = result.state;
    const style = document.querySelector("style[data-sveltekit]");
    if (style)
      style.remove();
    page = result.props.page;
    const post_update = pre_update();
    root = new Root({
      target,
      props: { ...result.props, stores },
      hydrate: true
    });
    post_update();
    const navigation = {
      from: null,
      to: add_url_properties("to", {
        params: current.params,
        route: { id: (_b = (_a2 = current.route) == null ? void 0 : _a2.id) != null ? _b : null },
        url: new URL(location.href)
      }),
      willUnload: false,
      type: "enter"
    };
    callbacks.after_navigate.forEach((fn) => fn(navigation));
    started = true;
  }
  async function get_navigation_result_from_branch({
    url,
    params,
    branch,
    status,
    error,
    route,
    form
  }) {
    var _a2;
    const filtered = branch.filter(Boolean);
    const result = {
      type: "loaded",
      state: {
        url,
        params,
        branch,
        error,
        route
      },
      props: {
        components: filtered.map((branch_node) => branch_node.node.component)
      }
    };
    if (form !== void 0) {
      result.props.form = form;
    }
    let data = {};
    let data_changed = !page;
    for (let i = 0; i < filtered.length; i += 1) {
      const node = filtered[i];
      data = { ...data, ...node.data };
      if (data_changed || !current.branch.some((previous) => previous === node)) {
        result.props[`data_${i}`] = data;
        data_changed = data_changed || Object.keys((_a2 = node.data) != null ? _a2 : {}).length > 0;
      }
    }
    if (!data_changed) {
      data_changed = Object.keys(page.data).length !== Object.keys(data).length;
    }
    const page_changed = !current.url || url.href !== current.url.href || current.error !== error || form !== void 0 || data_changed;
    if (page_changed) {
      result.props.page = {
        error,
        params,
        route,
        status,
        url,
        form,
        data: data_changed ? data : page.data
      };
      const print_error = (property, replacement) => {
        Object.defineProperty(result.props.page, property, {
          get: () => {
            throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
          }
        });
      };
      print_error("origin", "origin");
      print_error("path", "pathname");
      print_error("query", "searchParams");
    }
    return result;
  }
  async function load_node({ loader, parent, url, params, route, server_data_node }) {
    var _a2, _b, _c, _d, _e;
    let data = null;
    const uses = {
      dependencies: /* @__PURE__ */ new Set(),
      params: /* @__PURE__ */ new Set(),
      parent: false,
      route: false,
      url: false
    };
    const node = await loader();
    if ((_a2 = node.shared) == null ? void 0 : _a2.load) {
      let depends = function(...deps) {
        for (const dep of deps) {
          const { href } = new URL(dep, url);
          uses.dependencies.add(href);
        }
      };
      const load_input = {
        route: {
          get id() {
            uses.route = true;
            return route.id;
          }
        },
        params: new Proxy(params, {
          get: (target2, key) => {
            uses.params.add(key);
            return target2[key];
          }
        }),
        data: (_b = server_data_node == null ? void 0 : server_data_node.data) != null ? _b : null,
        url: make_trackable(url, () => {
          uses.url = true;
        }),
        async fetch(resource, init2) {
          let requested;
          if (resource instanceof Request) {
            requested = resource.url;
            init2 = {
              body: resource.method === "GET" || resource.method === "HEAD" ? void 0 : await resource.blob(),
              cache: resource.cache,
              credentials: resource.credentials,
              headers: resource.headers,
              integrity: resource.integrity,
              keepalive: resource.keepalive,
              method: resource.method,
              mode: resource.mode,
              redirect: resource.redirect,
              referrer: resource.referrer,
              referrerPolicy: resource.referrerPolicy,
              signal: resource.signal,
              ...init2
            };
          } else {
            requested = resource;
          }
          const resolved = new URL(requested, url).href;
          depends(resolved);
          return started ? subsequent_fetch(resolved, init2) : initial_fetch(requested, resolved, init2);
        },
        setHeaders: () => {
        },
        depends,
        parent() {
          uses.parent = true;
          return parent();
        }
      };
      Object.defineProperties(load_input, {
        props: {
          get() {
            throw new Error(
              "@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693"
            );
          },
          enumerable: false
        },
        session: {
          get() {
            throw new Error(
              "session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
            );
          },
          enumerable: false
        },
        stuff: {
          get() {
            throw new Error(
              "@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693"
            );
          },
          enumerable: false
        },
        routeId: {
          get() {
            throw new Error("routeId has been replaced by route.id");
          },
          enumerable: false
        }
      });
      {
        data = (_c = await node.shared.load.call(null, load_input)) != null ? _c : null;
      }
      data = data ? await unwrap_promises(data) : null;
    }
    return {
      node,
      loader,
      server: server_data_node,
      shared: ((_d = node.shared) == null ? void 0 : _d.load) ? { type: "data", data, uses } : null,
      data: (_e = data != null ? data : server_data_node == null ? void 0 : server_data_node.data) != null ? _e : null
    };
  }
  function has_changed(parent_changed, route_changed, url_changed, uses, params) {
    if (force_invalidation)
      return true;
    if (!uses)
      return false;
    if (uses.parent && parent_changed)
      return true;
    if (uses.route && route_changed)
      return true;
    if (uses.url && url_changed)
      return true;
    for (const param of uses.params) {
      if (params[param] !== current.params[param])
        return true;
    }
    for (const href of uses.dependencies) {
      if (invalidated.some((fn) => fn(new URL(href))))
        return true;
    }
    return false;
  }
  function create_data_node(node, previous) {
    var _a2, _b;
    if ((node == null ? void 0 : node.type) === "data") {
      return {
        type: "data",
        data: node.data,
        uses: {
          dependencies: new Set((_a2 = node.uses.dependencies) != null ? _a2 : []),
          params: new Set((_b = node.uses.params) != null ? _b : []),
          parent: !!node.uses.parent,
          route: !!node.uses.route,
          url: !!node.uses.url
        }
      };
    } else if ((node == null ? void 0 : node.type) === "skip") {
      return previous != null ? previous : null;
    }
    return null;
  }
  async function load_route({ id, invalidating, url, params, route }) {
    var _a2;
    if ((load_cache == null ? void 0 : load_cache.id) === id) {
      return load_cache.promise;
    }
    const { errors, layouts, leaf } = route;
    const loaders = [...layouts, leaf];
    errors.forEach((loader) => loader == null ? void 0 : loader().catch(() => {
    }));
    loaders.forEach((loader) => loader == null ? void 0 : loader[1]().catch(() => {
    }));
    let server_data = null;
    const url_changed = current.url ? id !== current.url.pathname + current.url.search : false;
    const route_changed = current.route ? id !== current.route.id : false;
    const invalid_server_nodes = loaders.reduce((acc, loader, i) => {
      var _a3;
      const previous = current.branch[i];
      const invalid = !!(loader == null ? void 0 : loader[0]) && ((previous == null ? void 0 : previous.loader) !== loader[1] || has_changed(
        acc.some(Boolean),
        route_changed,
        url_changed,
        (_a3 = previous.server) == null ? void 0 : _a3.uses,
        params
      ));
      acc.push(invalid);
      return acc;
    }, []);
    if (invalid_server_nodes.some(Boolean)) {
      try {
        server_data = await load_data(url, invalid_server_nodes);
      } catch (error) {
        return load_root_error_page({
          status: 500,
          error: handle_error(error, { url, params, route: { id: route.id } }),
          url,
          route
        });
      }
      if (server_data.type === "redirect") {
        return server_data;
      }
    }
    const server_data_nodes = server_data == null ? void 0 : server_data.nodes;
    let parent_changed = false;
    const branch_promises = loaders.map(async (loader, i) => {
      var _a3;
      if (!loader)
        return;
      const previous = current.branch[i];
      const server_data_node = server_data_nodes == null ? void 0 : server_data_nodes[i];
      const valid = (!server_data_node || server_data_node.type === "skip") && loader[1] === (previous == null ? void 0 : previous.loader) && !has_changed(parent_changed, route_changed, url_changed, (_a3 = previous.shared) == null ? void 0 : _a3.uses, params);
      if (valid)
        return previous;
      parent_changed = true;
      if ((server_data_node == null ? void 0 : server_data_node.type) === "error") {
        throw server_data_node;
      }
      return load_node({
        loader: loader[1],
        url,
        params,
        route,
        parent: async () => {
          var _a4;
          const data = {};
          for (let j = 0; j < i; j += 1) {
            Object.assign(data, (_a4 = await branch_promises[j]) == null ? void 0 : _a4.data);
          }
          return data;
        },
        server_data_node: create_data_node(
          server_data_node === void 0 && loader[0] ? { type: "skip" } : server_data_node != null ? server_data_node : null,
          previous == null ? void 0 : previous.server
        )
      });
    });
    for (const p of branch_promises)
      p.catch(() => {
      });
    const branch = [];
    for (let i = 0; i < loaders.length; i += 1) {
      if (loaders[i]) {
        try {
          branch.push(await branch_promises[i]);
        } catch (err) {
          if (err instanceof Redirect) {
            return {
              type: "redirect",
              location: err.location
            };
          }
          let status = 500;
          let error;
          if (server_data_nodes == null ? void 0 : server_data_nodes.includes(err)) {
            status = (_a2 = err.status) != null ? _a2 : status;
            error = err.error;
          } else if (err instanceof HttpError) {
            status = err.status;
            error = err.body;
          } else {
            error = handle_error(err, { params, url, route: { id: route.id } });
          }
          const error_load = await load_nearest_error_page(i, branch, errors);
          if (error_load) {
            return await get_navigation_result_from_branch({
              url,
              params,
              branch: branch.slice(0, error_load.idx).concat(error_load.node),
              status,
              error,
              route
            });
          } else {
            return await server_fallback(url, { id: route.id }, error, status);
          }
        }
      } else {
        branch.push(void 0);
      }
    }
    return await get_navigation_result_from_branch({
      url,
      params,
      branch,
      status: 200,
      error: null,
      route,
      form: invalidating ? void 0 : null
    });
  }
  async function load_nearest_error_page(i, branch, errors) {
    while (i--) {
      if (errors[i]) {
        let j = i;
        while (!branch[j])
          j -= 1;
        try {
          return {
            idx: j + 1,
            node: {
              node: await errors[i](),
              loader: errors[i],
              data: {},
              server: null,
              shared: null
            }
          };
        } catch (e) {
          continue;
        }
      }
    }
  }
  async function load_root_error_page({ status, error, url, route }) {
    var _a2;
    const params = {};
    const node = await default_layout_loader();
    let server_data_node = null;
    if (node.server) {
      try {
        const server_data = await load_data(url, [true]);
        if (server_data.type !== "data" || server_data.nodes[0] && server_data.nodes[0].type !== "data") {
          throw 0;
        }
        server_data_node = (_a2 = server_data.nodes[0]) != null ? _a2 : null;
      } catch {
        if (url.origin !== location.origin || url.pathname !== location.pathname || hydrated) {
          await native_navigation(url);
        }
      }
    }
    const root_layout = await load_node({
      loader: default_layout_loader,
      url,
      params,
      route,
      parent: () => Promise.resolve({}),
      server_data_node: create_data_node(server_data_node)
    });
    const root_error = {
      node: await default_error_loader(),
      loader: default_error_loader,
      shared: null,
      server: null,
      data: null
    };
    return await get_navigation_result_from_branch({
      url,
      params,
      branch: [root_layout, root_error],
      status,
      error,
      route: null
    });
  }
  function get_navigation_intent(url, invalidating) {
    if (is_external_url(url))
      return;
    const path = decodeURI(url.pathname.slice(base.length) || "/");
    for (const route of routes) {
      const params = route.exec(path);
      if (params) {
        const normalized = new URL(
          url.origin + normalize_path(url.pathname, trailing_slash) + url.search + url.hash
        );
        const id = normalized.pathname + normalized.search;
        const intent = { id, invalidating, route, params: decode_params(params), url: normalized };
        return intent;
      }
    }
  }
  function is_external_url(url) {
    return url.origin !== location.origin || !url.pathname.startsWith(base);
  }
  function before_navigate({ url, type, intent, delta }) {
    var _a2, _b, _c, _d, _e;
    let should_block = false;
    const navigation = {
      from: add_url_properties("from", {
        params: current.params,
        route: { id: (_b = (_a2 = current.route) == null ? void 0 : _a2.id) != null ? _b : null },
        url: current.url
      }),
      to: add_url_properties("to", {
        params: (_c = intent == null ? void 0 : intent.params) != null ? _c : null,
        route: { id: (_e = (_d = intent == null ? void 0 : intent.route) == null ? void 0 : _d.id) != null ? _e : null },
        url
      }),
      willUnload: !intent,
      type
    };
    if (delta !== void 0) {
      navigation.delta = delta;
    }
    const cancellable = {
      ...navigation,
      cancel: () => {
        should_block = true;
      }
    };
    callbacks.before_navigate.forEach((fn) => fn(cancellable));
    return should_block ? null : navigation;
  }
  async function navigate({
    url,
    scroll: scroll2,
    keepfocus,
    redirect_chain,
    details,
    type,
    delta,
    nav_token,
    accepted,
    blocked
  }) {
    const intent = get_navigation_intent(url, false);
    const navigation = before_navigate({ url, type, delta, intent });
    if (!navigation) {
      blocked();
      return;
    }
    update_scroll_positions(current_history_index);
    accepted();
    navigating = true;
    if (started) {
      stores.navigating.set(navigation);
    }
    await update(
      intent,
      url,
      redirect_chain,
      {
        scroll: scroll2,
        keepfocus,
        details
      },
      nav_token,
      () => {
        navigating = false;
        callbacks.after_navigate.forEach(
          (fn) => fn(navigation)
        );
        stores.navigating.set(null);
      }
    );
  }
  async function server_fallback(url, route, error, status) {
    if (url.origin === location.origin && url.pathname === location.pathname && !hydrated) {
      return await load_root_error_page({
        status,
        error,
        url,
        route
      });
    }
    return await native_navigation(url);
  }
  function native_navigation(url) {
    location.href = url.href;
    return new Promise(() => {
    });
  }
  return {
    after_navigate: (fn) => {
      onMount(() => {
        callbacks.after_navigate.push(fn);
        return () => {
          const i = callbacks.after_navigate.indexOf(fn);
          callbacks.after_navigate.splice(i, 1);
        };
      });
    },
    before_navigate: (fn) => {
      onMount(() => {
        callbacks.before_navigate.push(fn);
        return () => {
          const i = callbacks.before_navigate.indexOf(fn);
          callbacks.before_navigate.splice(i, 1);
        };
      });
    },
    disable_scroll_handling: () => {
      if (updating || !started) {
        autoscroll = false;
      }
    },
    goto: (href, opts = {}) => {
      if ("keepfocus" in opts) {
        throw new Error(
          "`keepfocus` has been renamed to `keepFocus` (note the difference in casing)"
        );
      }
      if ("noscroll" in opts) {
        throw new Error(
          "`noscroll` has been renamed to `noScroll` (note the difference in casing)"
        );
      }
      return goto(href, opts, []);
    },
    invalidate: (resource) => {
      if (resource === void 0) {
        throw new Error(
          "`invalidate()` (with no arguments) has been replaced by `invalidateAll()`"
        );
      }
      if (typeof resource === "function") {
        invalidated.push(resource);
      } else {
        const { href } = new URL(resource, location.href);
        invalidated.push((url) => url.href === href);
      }
      return invalidate();
    },
    invalidateAll: () => {
      force_invalidation = true;
      return invalidate();
    },
    prefetch: async (href) => {
      const url = new URL(href, get_base_uri(document));
      await prefetch(url);
    },
    prefetch_routes: async (pathnames) => {
      const matching = pathnames ? routes.filter((route) => pathnames.some((pathname) => route.exec(pathname))) : routes;
      const promises = matching.map((r) => {
        return Promise.all([...r.layouts, r.leaf].map((load) => load == null ? void 0 : load[1]()));
      });
      await Promise.all(promises);
    },
    apply_action: async (result) => {
      if (result.type === "error") {
        const url = new URL(location.href);
        const { branch, route } = current;
        if (!route)
          return;
        const error_load = await load_nearest_error_page(
          current.branch.length,
          branch,
          route.errors
        );
        if (error_load) {
          const navigation_result = await get_navigation_result_from_branch({
            url,
            params: current.params,
            branch: branch.slice(0, error_load.idx).concat(error_load.node),
            status: 500,
            error: result.error,
            route
          });
          current = navigation_result.state;
          const post_update = pre_update();
          root.$set(navigation_result.props);
          post_update();
        }
      } else if (result.type === "redirect") {
        goto(result.location, { invalidateAll: true }, []);
      } else {
        const props = {
          form: result.data,
          page: { ...page, form: result.data, status: result.status }
        };
        const post_update = pre_update();
        root.$set(props);
        post_update();
      }
    },
    _start_router: () => {
      history.scrollRestoration = "manual";
      addEventListener("beforeunload", (e) => {
        var _a2, _b;
        let should_block = false;
        if (!navigating) {
          const navigation = {
            from: add_url_properties("from", {
              params: current.params,
              route: { id: (_b = (_a2 = current.route) == null ? void 0 : _a2.id) != null ? _b : null },
              url: current.url
            }),
            to: null,
            willUnload: true,
            type: "leave",
            cancel: () => should_block = true
          };
          callbacks.before_navigate.forEach((fn) => fn(navigation));
        }
        if (should_block) {
          e.preventDefault();
          e.returnValue = "";
        } else {
          history.scrollRestoration = "auto";
        }
      });
      addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          update_scroll_positions(current_history_index);
          try {
            sessionStorage[SCROLL_KEY] = JSON.stringify(scroll_positions);
          } catch {
          }
        }
      });
      const trigger_prefetch = (event) => {
        const { url, options } = find_anchor(event);
        if (url && options.prefetch) {
          if (is_external_url(url))
            return;
          prefetch(url);
        }
      };
      let mousemove_timeout;
      const handle_mousemove = (event) => {
        clearTimeout(mousemove_timeout);
        mousemove_timeout = setTimeout(() => {
          var _a2;
          (_a2 = event.target) == null ? void 0 : _a2.dispatchEvent(
            new CustomEvent("sveltekit:trigger_prefetch", { bubbles: true })
          );
        }, 20);
      };
      addEventListener("touchstart", trigger_prefetch);
      addEventListener("mousemove", handle_mousemove);
      addEventListener("sveltekit:trigger_prefetch", trigger_prefetch);
      addEventListener("click", (event) => {
        if (event.button || event.which !== 1)
          return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        if (event.defaultPrevented)
          return;
        const { a, url, options } = find_anchor(event);
        if (!a || !url)
          return;
        const is_svg_a_element = a instanceof SVGAElement;
        if (!is_svg_a_element && url.protocol !== location.protocol && !(url.protocol === "https:" || url.protocol === "http:"))
          return;
        if (a.hasAttribute("download"))
          return;
        const rel = (a.getAttribute("rel") || "").split(/\s+/);
        if (rel.includes("external") || options.reload || (is_svg_a_element ? a.target.baseVal : a.target)) {
          const navigation = before_navigate({ url, type: "link" });
          if (!navigation) {
            event.preventDefault();
          }
          navigating = true;
          return;
        }
        const [base2, hash2] = url.href.split("#");
        if (hash2 !== void 0 && base2 === location.href.split("#")[0]) {
          hash_navigating = true;
          update_scroll_positions(current_history_index);
          current.url = url;
          stores.page.set({ ...page, url });
          stores.page.notify();
          return;
        }
        navigate({
          url,
          scroll: options.noscroll ? scroll_state() : null,
          keepfocus: false,
          redirect_chain: [],
          details: {
            state: {},
            replaceState: url.href === location.href
          },
          accepted: () => event.preventDefault(),
          blocked: () => event.preventDefault(),
          type: "link"
        });
      });
      addEventListener("popstate", (event) => {
        if (event.state) {
          if (event.state[INDEX_KEY] === current_history_index)
            return;
          const delta = event.state[INDEX_KEY] - current_history_index;
          navigate({
            url: new URL(location.href),
            scroll: scroll_positions[event.state[INDEX_KEY]],
            keepfocus: false,
            redirect_chain: [],
            details: null,
            accepted: () => {
              current_history_index = event.state[INDEX_KEY];
            },
            blocked: () => {
              history.go(-delta);
            },
            type: "popstate",
            delta
          });
        }
      });
      addEventListener("hashchange", () => {
        if (hash_navigating) {
          hash_navigating = false;
          history.replaceState(
            { ...history.state, [INDEX_KEY]: ++current_history_index },
            "",
            location.href
          );
        }
      });
      for (const link of document.querySelectorAll("link")) {
        if (link.rel === "icon")
          link.href = link.href;
      }
      addEventListener("pageshow", (event) => {
        if (event.persisted) {
          stores.navigating.set(null);
        }
      });
    },
    _hydrate: async ({ status, error, node_ids, params, route, data: server_data_nodes, form }) => {
      var _a2;
      hydrated = true;
      const url = new URL(location.href);
      let result;
      try {
        const branch_promises = node_ids.map(async (n, i) => {
          const server_data_node = server_data_nodes[i];
          return load_node({
            loader: nodes[n],
            url,
            params,
            route,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, (await branch_promises[j]).data);
              }
              return data;
            },
            server_data_node: create_data_node(server_data_node)
          });
        });
        result = await get_navigation_result_from_branch({
          url,
          params,
          branch: await Promise.all(branch_promises),
          status,
          error,
          form,
          route: (_a2 = routes.find(({ id }) => id === route.id)) != null ? _a2 : null
        });
      } catch (error2) {
        if (error2 instanceof Redirect) {
          await native_navigation(new URL(error2.location, location.href));
          return;
        }
        result = await load_root_error_page({
          status: error2 instanceof HttpError ? error2.status : 500,
          error: handle_error(error2, { url, params, route }),
          url,
          route
        });
      }
      initialize(result);
    }
  };
}
async function load_data(url, invalid) {
  var _a;
  const data_url = new URL(url);
  data_url.pathname = add_data_suffix(url.pathname);
  const res = await native_fetch(data_url.href, {
    headers: {
      "x-sveltekit-invalidated": invalid.map((x) => x ? "1" : "").join(",")
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  (_a = data.nodes) == null ? void 0 : _a.forEach((node) => {
    var _a2, _b;
    if ((node == null ? void 0 : node.type) === "data") {
      node.data = unflatten(node.data);
      node.uses = {
        dependencies: new Set((_a2 = node.uses.dependencies) != null ? _a2 : []),
        params: new Set((_b = node.uses.params) != null ? _b : []),
        parent: !!node.uses.parent,
        route: !!node.uses.route,
        url: !!node.uses.url
      };
    }
  });
  return data;
}
function handle_error(error, event) {
  var _a;
  if (error instanceof HttpError) {
    return error.body;
  }
  return (_a = hooks.handleError({ error, event })) != null ? _a : { message: event.route.id != null ? "Internal Error" : "Not Found" };
}
const properties = [
  "hash",
  "href",
  "host",
  "hostname",
  "origin",
  "pathname",
  "port",
  "protocol",
  "search",
  "searchParams",
  "toString",
  "toJSON"
];
function add_url_properties(type, target) {
  for (const prop of properties) {
    Object.defineProperty(target, prop, {
      get() {
        throw new Error(
          `The navigation shape changed - ${type}.${prop} should now be ${type}.url.${prop}`
        );
      },
      enumerable: false
    });
  }
  Object.defineProperty(target, "routeId", {
    get() {
      throw new Error(
        `The navigation shape changed - ${type}.routeId should now be ${type}.route.id`
      );
    },
    enumerable: false
  });
  return target;
}
function pre_update() {
  return () => {
  };
}
async function start({ env, hydrate, paths, target, trailing_slash }) {
  set_paths(paths);
  const client = create_client({
    target,
    base: paths.base,
    trailing_slash
  });
  init$1({ client });
  if (hydrate) {
    await client._hydrate(hydrate);
  } else {
    client.goto(location.href, { replaceState: true });
  }
  client._start_router();
}
export {
  start
};
//# sourceMappingURL=start-2bca8e57.js.map
