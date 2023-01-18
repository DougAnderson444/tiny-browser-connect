import { S as SvelteComponent, i as init, s as safe_not_equal, w as create_component, x as claim_component, y as mount_component, f as transition_in, t as transition_out, z as destroy_component, k as element, q as text, l as claim_element, m as children, r as claim_text, h as detach, n as attr, b as insert_hydration, G as append_hydration, B as noop } from "../../../chunks/index-4317dbfd.js";
import { D as DropDown } from "../../../chunks/DropDown-ac750261.js";
function create_title_slot(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text("My DropDown");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, slot: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "My DropDown");
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "p-0");
      attr(div, "slot", "title");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let dropdown;
  let current;
  dropdown = new DropDown({
    props: {
      $$slots: { title: [create_title_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(dropdown.$$.fragment);
    },
    l(nodes) {
      claim_component(dropdown.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dropdown, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const dropdown_changes = {};
      if (dirty & /*$$scope*/
      2) {
        dropdown_changes.$$scope = { dirty, ctx: ctx2 };
      }
      dropdown.$set(dropdown_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dropdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dropdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dropdown, detaching);
    }
  };
}
function instance($$self) {
  return [];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
//# sourceMappingURL=_page.svelte-1cb81cdd.js.map
