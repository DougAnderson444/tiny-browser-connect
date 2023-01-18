import { Z as identity, S as SvelteComponent, i as init, s as safe_not_equal, k as element, _ as svg_element, l as claim_element, m as children, $ as claim_svg_element, h as detach, n as attr, b as insert_hydration, G as append_hydration, B as noop, C as create_slot, w as create_component, a as space, x as claim_component, c as claim_space, y as mount_component, J as listen, a0 as action_destroyer, D as update_slot_base, E as get_all_dirty_from_scope, F as get_slot_changes, f as transition_in, g as group_outros, t as transition_out, d as check_outros, Y as is_function, z as destroy_component, T as run_all, L as add_render_callback, M as create_bidirectional_transition } from "./index-4317dbfd.js";
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function fade(node, { delay = 0, duration: duration2 = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration: duration2,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration: duration2 = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration: duration2,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
  };
}
function slide(node, { delay = 0, duration: duration2 = 400, easing = cubicOut } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const height = parseFloat(style.height);
  const padding_top = parseFloat(style.paddingTop);
  const padding_bottom = parseFloat(style.paddingBottom);
  const margin_top = parseFloat(style.marginTop);
  const margin_bottom = parseFloat(style.marginBottom);
  const border_top_width = parseFloat(style.borderTopWidth);
  const border_bottom_width = parseFloat(style.borderBottomWidth);
  return {
    delay,
    duration: duration2,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};height: ${t * height}px;padding-top: ${t * padding_top}px;padding-bottom: ${t * padding_bottom}px;margin-top: ${t * margin_top}px;margin-bottom: ${t * margin_bottom}px;border-top-width: ${t * border_top_width}px;border-bottom-width: ${t * border_bottom_width}px;`
  };
}
const Chevron_svelte_svelte_type_style_lang = "";
function create_fragment$1(ctx) {
  let button;
  let svg;
  let path;
  let button_class_value;
  return {
    c() {
      button = element("button");
      svg = svg_element("svg");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      svg = claim_svg_element(button_nodes, "svg", {
        class: true,
        xmlns: true,
        viewBox: true,
        fill: true,
        "stroke-linecap": true,
        "stroke-linejoin": true,
        "stroke-width": true
      });
      var svg_nodes = children(svg);
      path = claim_svg_element(svg_nodes, "path", { d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M19 9l-7 7-7-7");
      attr(svg, "class", "stroke-neutral-200 svelte-r12ma8");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "stroke-width", "3");
      attr(button, "class", button_class_value = /*open*/
      (ctx[0] ? "rotate-180 " : "") + " duration-" + /*duration*/
      ctx[1]);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, svg);
      append_hydration(svg, path);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*open, duration*/
      3 && button_class_value !== (button_class_value = /*open*/
      (ctx2[0] ? "rotate-180 " : "") + " duration-" + /*duration*/
      ctx2[1])) {
        attr(button, "class", button_class_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(button);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { open = false } = $$props;
  let { duration: duration2 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
    if ("duration" in $$props2)
      $$invalidate(1, duration2 = $$props2.duration);
  };
  return [open, duration2];
}
class Chevron extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { open: 0, duration: 1 });
  }
}
const get_title_slot_changes = (dirty) => ({});
const get_title_slot_context = (ctx) => ({});
function create_if_block(ctx) {
  let div;
  let div_transition;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
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
      attr(div, "class", "absoulte h-96 min-h-fit z-10 overflow-y-auto");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[3],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, slide, { duration }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, slide, { duration }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_fragment(ctx) {
  let section;
  let button;
  let chevron;
  let t0;
  let div1;
  let div0;
  let t1;
  let div1_class_value;
  let section_class_value;
  let clickOutside_action;
  let current;
  let mounted;
  let dispose;
  chevron = new Chevron({
    props: { duration, open: (
      /*open*/
      ctx[1]
    ) }
  });
  const title_slot_template = (
    /*#slots*/
    ctx[4].title
  );
  const title_slot = create_slot(
    title_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    get_title_slot_context
  );
  let if_block = (
    /*open*/
    ctx[1] && create_if_block(ctx)
  );
  return {
    c() {
      section = element("section");
      button = element("button");
      create_component(chevron.$$.fragment);
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      if (title_slot)
        title_slot.c();
      t1 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      button = claim_element(section_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      claim_component(chevron.$$.fragment, button_nodes);
      button_nodes.forEach(detach);
      t0 = claim_space(section_nodes);
      div1 = claim_element(section_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (title_slot)
        title_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      t1 = claim_space(div1_nodes);
      if (if_block)
        if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "flex-0 z-20");
      attr(div0, "class", "");
      attr(div1, "class", div1_class_value = "flex-1 " + /*containerStyle*/
      ctx[0] + " " + commonStyle + " absolute top-0 right-0 w-full z-10");
      attr(section, "class", section_class_value = /*containerStyle*/
      ctx[0] + " " + commonStyle + " relative flex flex-row justify-end items-end md:w-1/2 m-4 text-neutral-200");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      append_hydration(section, button);
      mount_component(chevron, button, null);
      append_hydration(section, t0);
      append_hydration(section, div1);
      append_hydration(div1, div0);
      if (title_slot) {
        title_slot.m(div0, null);
      }
      append_hydration(div1, t1);
      if (if_block)
        if_block.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*onClick*/
            ctx[2]
          ),
          listen(
            div0,
            "click",
            /*onClick*/
            ctx[2]
          ),
          action_destroyer(clickOutside_action = clickOutside.call(null, section, {
            enabled: (
              /*open*/
              ctx[1]
            ),
            cb: (
              /*clickOutside_function*/
              ctx[5]
            )
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const chevron_changes = {};
      if (dirty & /*open*/
      2)
        chevron_changes.open = /*open*/
        ctx2[1];
      chevron.$set(chevron_changes);
      if (title_slot) {
        if (title_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            title_slot,
            title_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              title_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              get_title_slot_changes
            ),
            get_title_slot_context
          );
        }
      }
      if (
        /*open*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*open*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & /*containerStyle*/
      1 && div1_class_value !== (div1_class_value = "flex-1 " + /*containerStyle*/
      ctx2[0] + " " + commonStyle + " absolute top-0 right-0 w-full z-10")) {
        attr(div1, "class", div1_class_value);
      }
      if (!current || dirty & /*containerStyle*/
      1 && section_class_value !== (section_class_value = /*containerStyle*/
      ctx2[0] + " " + commonStyle + " relative flex flex-row justify-end items-end md:w-1/2 m-4 text-neutral-200")) {
        attr(section, "class", section_class_value);
      }
      if (clickOutside_action && is_function(clickOutside_action.update) && dirty & /*open*/
      2)
        clickOutside_action.update.call(null, {
          enabled: (
            /*open*/
            ctx2[1]
          ),
          cb: (
            /*clickOutside_function*/
            ctx2[5]
          )
        });
    },
    i(local) {
      if (current)
        return;
      transition_in(chevron.$$.fragment, local);
      transition_in(title_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(chevron.$$.fragment, local);
      transition_out(title_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(section);
      destroy_component(chevron);
      if (title_slot)
        title_slot.d(detaching);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
let duration = 300;
let commonStyle = "rounded max-w-full p-4 ";
function clickOutside(node, { enabled: initialEnabled, cb }) {
  const handleOutsideClick = ({ target }) => {
    if (!node.contains(target)) {
      cb();
    }
  };
  function update({ enabled }) {
    if (enabled) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }
  }
  update({ enabled: initialEnabled });
  return {
    update,
    destroy() {
      window.removeEventListener("click", handleOutsideClick);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let onClick = () => {
    $$invalidate(1, open = !open);
  };
  let open;
  let { containerStyle = "bg-neutral-600" } = $$props;
  const clickOutside_function = () => $$invalidate(1, open = false);
  $$self.$$set = ($$props2) => {
    if ("containerStyle" in $$props2)
      $$invalidate(0, containerStyle = $$props2.containerStyle);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [containerStyle, open, onClick, $$scope, slots, clickOutside_function];
}
class DropDown extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { containerStyle: 0 });
  }
}
export {
  DropDown as D,
  fade as a,
  fly as f,
  quintOut as q
};
//# sourceMappingURL=DropDown-ac750261.js.map
