import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, a as space, l as claim_element, m as children, r as claim_text, h as detach, c as claim_space, n as attr, p as set_style, b as insert_hydration, F as append_hydration, A as noop, o as onMount, v as create_component, w as claim_component, x as mount_component, f as transition_in, t as transition_out, y as destroy_component } from "../../chunks/index-2b05990c.js";
import { _ as __vitePreload } from "../../chunks/preload-helper-b21cceae.js";
function create_fragment$1(ctx) {
  let main;
  let h3;
  let t0;
  let t1;
  let h6;
  let t2;
  let t3;
  let div4;
  let div1;
  let t4;
  let div0;
  let t5;
  let div3;
  let t6;
  let div2;
  let t7;
  let div5;
  let t8;
  let div7;
  let div6;
  let t9;
  let form;
  let input;
  let t10;
  let button0;
  let t11;
  let t12;
  let button1;
  let t13;
  return {
    c() {
      main = element("main");
      h3 = element("h3");
      t0 = text("P2PCF example");
      t1 = space();
      h6 = element("h6");
      t2 = text("Share this URL to connect via P2PCF + WebRTC");
      t3 = space();
      div4 = element("div");
      div1 = element("div");
      t4 = text("Peers:\r\n			");
      div0 = element("div");
      t5 = space();
      div3 = element("div");
      t6 = text("Messages:\r\n			");
      div2 = element("div");
      t7 = space();
      div5 = element("div");
      t8 = space();
      div7 = element("div");
      div6 = element("div");
      t9 = space();
      form = element("form");
      input = element("input");
      t10 = space();
      button0 = element("button");
      t11 = text("Send");
      t12 = space();
      button1 = element("button");
      t13 = text("Enable Video");
      this.h();
    },
    l(nodes) {
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      h3 = claim_element(main_nodes, "H3", { class: true, style: true });
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "P2PCF example");
      h3_nodes.forEach(detach);
      t1 = claim_space(main_nodes);
      h6 = claim_element(main_nodes, "H6", { style: true });
      var h6_nodes = children(h6);
      t2 = claim_text(h6_nodes, "Share this URL to connect via P2PCF + WebRTC");
      h6_nodes.forEach(detach);
      t3 = claim_space(main_nodes);
      div4 = claim_element(main_nodes, "DIV", { style: true });
      var div4_nodes = children(div4);
      div1 = claim_element(div4_nodes, "DIV", { style: true });
      var div1_nodes = children(div1);
      t4 = claim_text(div1_nodes, "Peers:\r\n			");
      div0 = claim_element(div1_nodes, "DIV", { id: true, style: true });
      children(div0).forEach(detach);
      div1_nodes.forEach(detach);
      t5 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { style: true });
      var div3_nodes = children(div3);
      t6 = claim_text(div3_nodes, "Messages:\r\n			");
      div2 = claim_element(div3_nodes, "DIV", { id: true, style: true });
      children(div2).forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t7 = claim_space(main_nodes);
      div5 = claim_element(main_nodes, "DIV", { id: true, style: true });
      children(div5).forEach(detach);
      t8 = claim_space(main_nodes);
      div7 = claim_element(main_nodes, "DIV", { style: true });
      var div7_nodes = children(div7);
      div6 = claim_element(div7_nodes, "DIV", { style: true, id: true });
      children(div6).forEach(detach);
      t9 = claim_space(div7_nodes);
      form = claim_element(div7_nodes, "FORM", { onsubmit: true });
      var form_nodes = children(form);
      input = claim_element(form_nodes, "INPUT", { class: true, id: true, type: true });
      t10 = claim_space(form_nodes);
      button0 = claim_element(form_nodes, "BUTTON", { class: true, type: true, id: true });
      var button0_nodes = children(button0);
      t11 = claim_text(button0_nodes, "Send");
      button0_nodes.forEach(detach);
      form_nodes.forEach(detach);
      div7_nodes.forEach(detach);
      t12 = claim_space(main_nodes);
      button1 = claim_element(main_nodes, "BUTTON", {
        class: true,
        style: true,
        type: true,
        id: true
      });
      var button1_nodes = children(button1);
      t13 = claim_text(button1_nodes, "Enable Video");
      button1_nodes.forEach(detach);
      main_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h3, "class", "pt-2 m-0");
      set_style(h3, "padding-top", "8px");
      set_style(h3, "margin", "0");
      set_style(h6, "padding-top", "8px");
      set_style(h6, "padding-bottom", "24px");
      set_style(h6, "margin", "0");
      attr(div0, "id", "peers");
      set_style(div0, "display", "flex");
      set_style(div0, "flex-direction", "column");
      set_style(div1, "display", "flex");
      set_style(div1, "flex-direction", "column");
      set_style(div1, "min-width", "200px");
      attr(div2, "id", "messages");
      set_style(div2, "display", "flex");
      set_style(div2, "flex-direction", "column");
      set_style(div3, "display", "flex");
      set_style(div3, "flex-direction", "column");
      set_style(div4, "display", "flex");
      set_style(div4, "flex-direction", "row");
      attr(div5, "id", "videos");
      set_style(div5, "display", "flex");
      set_style(div5, "flex-direction", "row");
      set_style(div6, "padding-right", "4px");
      attr(div6, "id", "session-id");
      attr(input, "class", "border");
      attr(input, "id", "send-box");
      attr(input, "type", "text");
      attr(button0, "class", "border p-2 rounded bg-neutral-200");
      attr(button0, "type", "submit");
      attr(button0, "id", "send-button");
      attr(form, "onsubmit", "return false;");
      set_style(div7, "padding-top", "24px");
      set_style(div7, "display", "flex");
      set_style(div7, "flex-direction", "row");
      attr(button1, "class", "border w-24 bg-neutral-200 p-2 rounded");
      set_style(button1, "width", "100px");
      attr(button1, "type", "submit");
      attr(button1, "id", "video-button");
      attr(main, "class", "p-4");
    },
    m(target, anchor) {
      insert_hydration(target, main, anchor);
      append_hydration(main, h3);
      append_hydration(h3, t0);
      append_hydration(main, t1);
      append_hydration(main, h6);
      append_hydration(h6, t2);
      append_hydration(main, t3);
      append_hydration(main, div4);
      append_hydration(div4, div1);
      append_hydration(div1, t4);
      append_hydration(div1, div0);
      append_hydration(div4, t5);
      append_hydration(div4, div3);
      append_hydration(div3, t6);
      append_hydration(div3, div2);
      append_hydration(main, t7);
      append_hydration(main, div5);
      append_hydration(main, t8);
      append_hydration(main, div7);
      append_hydration(div7, div6);
      append_hydration(div7, t9);
      append_hydration(div7, form);
      append_hydration(form, input);
      append_hydration(form, t10);
      append_hydration(form, button0);
      append_hydration(button0, t11);
      append_hydration(main, t12);
      append_hydration(main, button1);
      append_hydration(button1, t13);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(main);
    }
  };
}
function handleMsg(peer, msg) {
  console.log("Peer msg", peer.id, peer, msg);
  addMessage(peer.id.substring(0, 5) + ": " + new TextDecoder("utf-8").decode(msg));
}
function addMessage(message) {
  const messageEl = document.createElement("div");
  messageEl.innerText = message;
  document.getElementById("messages").appendChild(messageEl);
}
function instance($$self) {
  const myWorker = {
    workerUrl: "https://p2pcf.douganderson444.workers.dev/",
    stateHeartbeatWindowMs: 6e4,
    fastPollingRateMs: 1e3,
    slowPollingRateMs: 5e3
  };
  let P2PCF;
  let stream;
  const removePeerUi = (clientId) => {
    var _a, _b;
    (_a = document.getElementById(clientId)) == null ? void 0 : _a.remove();
    (_b = document.getElementById(`${clientId}-video`)) == null ? void 0 : _b.remove();
  };
  const addPeerUi = (sessionId) => {
    if (document.getElementById(sessionId))
      return;
    const peerEl = document.createElement("div");
    peerEl.style = "display: flex;";
    const name = document.createElement("div");
    name.innerText = sessionId.substring(0, 5);
    peerEl.id = sessionId;
    peerEl.appendChild(name);
    document.getElementById("peers").appendChild(peerEl);
  };
  onMount(async () => {
    if (!document.location.hash) {
      document.location = document.location.toString() + `#room-example-${Math.floor(Math.random() * 1e5)}`;
    }
    P2PCF = (await __vitePreload(() => import("../../chunks/p2pcf-c856d469.js"), true ? [] : void 0, import.meta.url)).default;
    connect();
    document.getElementById("session-id").innerText = p2pcf.sessionId.substring(0, 5) + "@" + p2pcf.roomId + ":";
    document.getElementById("send-button").addEventListener("click", () => {
      const box = document.getElementById("send-box");
      addMessage(p2pcf.sessionId.substring(0, 5) + ": " + box.value);
      p2pcf.broadcast(new TextEncoder().encode(box.value));
      box.value = "";
    });
    document.getElementById("video-button").addEventListener("click", async () => {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      for (const peer of p2pcf.peers.values()) {
        peer.addStream(stream);
      }
    });
    p2pcf.start();
  });
  function handleConnect(peer) {
    console.log("Peer connect", peer.id, peer);
    if (stream) {
      peer.addStream(stream);
    }
    peer.on("track", (track, stream2) => {
      console.log("got track", track);
      const video = document.createElement("video");
      video.id = `${peer.id}-video`;
      video.srcObject = stream2;
      video.setAttribute("playsinline", true);
      document.getElementById("videos").appendChild(video);
      video.play();
    });
    addPeerUi(peer.id);
  }
  function handleClose(peer) {
    console.log("Peer close", peer.id, peer);
    removePeerUi(peer.id);
  }
  function connect() {
    const myUsername = "user-" + Math.floor(Math.random() * 1e5);
    const myRoom = document.location.hash.substring(1);
    const p2pcf2 = new P2PCF(myUsername, myRoom, myWorker);
    window.p2pcf = p2pcf2;
    p2pcf2.on("peerconnect", handleConnect);
    p2pcf2.on("peerclose", handleClose);
    p2pcf2.on("msg", handleMsg);
  }
  return [];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let app;
  let current;
  app = new App({});
  return {
    c() {
      create_component(app.$$.fragment);
    },
    l(nodes) {
      claim_component(app.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(app, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(app.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(app.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(app, detaching);
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
  Page as default
};
//# sourceMappingURL=_page.svelte-a531996f.js.map
