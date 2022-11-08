function N() {}
const ht = (e) => e;
function at(e) {
	return e();
}
function G1() {
	return /* @__PURE__ */ Object.create(null);
}
function F(e) {
	e.forEach(at);
}
function q1(e) {
	return typeof e == 'function';
}
function c1(e, t) {
	return e != e ? t == t : e !== t || (e && typeof e == 'object') || typeof e == 'function';
}
let g1;
function I1(e, t) {
	return g1 || (g1 = document.createElement('a')), (g1.href = t), e === g1.href;
}
function G(e, t, n, o) {
	if (e) {
		const l = dt(e, t, n, o);
		return e[0](l);
	}
}
function dt(e, t, n, o) {
	return e[1] && o
		? (function (l, c) {
				for (const s in c) l[s] = c[s];
				return l;
		  })(n.ctx.slice(), e[1](o(t)))
		: n.ctx;
}
function I(e, t, n, o) {
	if (e[2] && o) {
		const l = e[2](o(n));
		if (t.dirty === void 0) return l;
		if (typeof l == 'object') {
			const c = [],
				s = Math.max(t.dirty.length, l.length);
			for (let i = 0; i < s; i += 1) c[i] = t.dirty[i] | l[i];
			return c;
		}
		return t.dirty | l;
	}
	return t.dirty;
}
function Q(e, t, n, o, l, c) {
	if (l) {
		const s = dt(t, n, o, c);
		e.p(s, l);
	}
}
function J(e) {
	if (e.ctx.length > 32) {
		const t = [],
			n = e.ctx.length / 32;
		for (let o = 0; o < n; o++) t[o] = -1;
		return t;
	}
	return -1;
}
const ut = typeof window < 'u';
let wt = ut ? () => window.performance.now() : () => Date.now(),
	N1 = ut ? (e) => requestAnimationFrame(e) : N;
const u1 = /* @__PURE__ */ new Set();
function pt(e) {
	u1.forEach((t) => {
		t.c(e) || (u1.delete(t), t.f());
	}),
		u1.size !== 0 && N1(pt);
}
function k(e, t) {
	e.appendChild(t);
}
function M1(e, t, n) {
	const o = P1(e);
	if (!o.getElementById(t)) {
		const l = $('style');
		(l.id = t), (l.textContent = n), mt(o, l);
	}
}
function P1(e) {
	if (!e) return document;
	const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
	return t && t.host ? t : e.ownerDocument;
}
function vt(e) {
	const t = $('style');
	return mt(P1(e), t), t.sheet;
}
function mt(e, t) {
	return k(e.head || e, t), t.sheet;
}
function q(e, t, n) {
	e.insertBefore(t, n || null);
}
function y(e) {
	e.parentNode.removeChild(e);
}
function $(e) {
	return document.createElement(e);
}
function C1(e) {
	return document.createElementNS('http://www.w3.org/2000/svg', e);
}
function S1(e) {
	return document.createTextNode(e);
}
function _() {
	return S1(' ');
}
function R(e, t, n, o) {
	return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
}
function h(e, t, n) {
	n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function Q1(e, t, n) {
	e.setAttributeNS('http://www.w3.org/1999/xlink', t, n);
}
function J1(e, t) {
	e.value = t == null ? '' : t;
}
function p1(e, t, n, o) {
	n === null ? e.style.removeProperty(t) : e.style.setProperty(t, n, o ? 'important' : '');
}
function ft(e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {
	const l = document.createEvent('CustomEvent');
	return l.initCustomEvent(e, n, o, t), l;
}
const j1 = /* @__PURE__ */ new Map();
let h1,
	b1 = 0;
function W1(e, t, n, o, l, c, s, i = 0) {
	const d = 16.666 / o;
	let u = `{
`;
	for (let b = 0; b <= 1; b += d) {
		const z = t + (n - t) * c(b);
		u +=
			100 * b +
			`%{${s(z, 1 - z)}}
`;
	}
	const r =
			u +
			`100% {${s(n, 1 - n)}}
}`,
		a = `__svelte_${(function (b) {
			let z = 5381,
				M = b.length;
			for (; M--; ) z = ((z << 5) - z) ^ b.charCodeAt(M);
			return z >>> 0;
		})(r)}_${i}`,
		p = P1(e),
		{ stylesheet: f, rules: C } =
			j1.get(p) ||
			(function (b, z) {
				const M = { stylesheet: vt(z), rules: {} };
				return j1.set(b, M), M;
			})(p, e);
	C[a] || ((C[a] = !0), f.insertRule(`@keyframes ${a} ${r}`, f.cssRules.length));
	const v = e.style.animation || '';
	return (e.style.animation = `${v ? `${v}, ` : ''}${a} ${o}ms linear ${l}ms 1 both`), (b1 += 1), a;
}
function m1(e) {
	h1 = e;
}
function Z1() {
	const e = (function () {
		if (!h1) throw new Error('Function called outside component initialization');
		return h1;
	})();
	return (t, n, { cancelable: o = !1 } = {}) => {
		const l = e.$$.callbacks[t];
		if (l) {
			const c = ft(t, n, { cancelable: o });
			return (
				l.slice().forEach((s) => {
					s.call(e, c);
				}),
				!c.defaultPrevented
			);
		}
		return !0;
	};
}
function xt(e, t) {
	const n = e.$$.callbacks[t.type];
	n && n.slice().forEach((o) => o.call(this, t));
}
const d1 = [],
	D = [],
	z1 = [],
	V1 = [],
	$t = Promise.resolve();
let A1 = !1;
function l1(e) {
	z1.push(e);
}
function e1(e) {
	V1.push(e);
}
const H1 = /* @__PURE__ */ new Set();
let a1,
	y1 = 0;
function X1() {
	const e = h1;
	do {
		for (; y1 < d1.length; ) {
			const t = d1[y1];
			y1++, m1(t), gt(t.$$);
		}
		for (m1(null), d1.length = 0, y1 = 0; D.length; ) D.pop()();
		for (let t = 0; t < z1.length; t += 1) {
			const n = z1[t];
			H1.has(n) || (H1.add(n), n());
		}
		z1.length = 0;
	} while (d1.length);
	for (; V1.length; ) V1.pop()();
	(A1 = !1), H1.clear(), m1(e);
}
function gt(e) {
	if (e.fragment !== null) {
		e.update(), F(e.before_update);
		const t = e.dirty;
		(e.dirty = [-1]), e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(l1);
	}
}
function E1(e, t, n) {
	e.dispatchEvent(ft(`${t ? 'intro' : 'outro'}${n}`));
}
const k1 = /* @__PURE__ */ new Set();
let U;
function R1() {
	U = { r: 0, c: [], p: U };
}
function O1() {
	U.r || F(U.c), (U = U.p);
}
function x(e, t) {
	e && e.i && (k1.delete(e), e.i(t));
}
function g(e, t, n, o) {
	if (e && e.o) {
		if (k1.has(e)) return;
		k1.add(e),
			U.c.push(() => {
				k1.delete(e), o && (n && e.d(1), o());
			}),
			e.o(t);
	} else o && o();
}
const yt = { duration: 0 };
function Y1(e, t, n, o) {
	let l = t(e, n),
		c = o ? 0 : 1,
		s = null,
		i = null,
		d = null;
	function u() {
		d &&
			(function (p, f) {
				const C = (p.style.animation || '').split(', '),
					v = C.filter(f ? (z) => z.indexOf(f) < 0 : (z) => z.indexOf('__svelte') === -1),
					b = C.length - v.length;
				b &&
					((p.style.animation = v.join(', ')),
					(b1 -= b),
					b1 ||
						N1(() => {
							b1 ||
								(j1.forEach((z) => {
									const { ownerNode: M } = z.stylesheet;
									M && y(M);
								}),
								j1.clear());
						}));
			})(e, d);
	}
	function r(p, f) {
		const C = p.b - c;
		return (
			(f *= Math.abs(C)),
			{ a: c, b: p.b, d: C, duration: f, start: p.start, end: p.start + f, group: p.group }
		);
	}
	function a(p) {
		const { delay: f = 0, duration: C = 300, easing: v = ht, tick: b = N, css: z } = l || yt,
			M = { start: wt() + f, b: p };
		p || ((M.group = U), (U.r += 1)),
			s || i
				? (i = M)
				: (z && (u(), (d = W1(e, c, p, C, f, v, z))),
				  p && b(0, 1),
				  (s = r(M, C)),
				  l1(() => E1(e, p, 'start')),
				  (function (K) {
						let W;
						u1.size === 0 && N1(pt),
							new Promise((V) => {
								u1.add((W = { c: K, f: V }));
							});
				  })((K) => {
						if (
							(i &&
								K > i.start &&
								((s = r(i, C)),
								(i = null),
								E1(e, s.b, 'start'),
								z && (u(), (d = W1(e, c, s.b, s.duration, 0, v, l.css)))),
							s)
						) {
							if (K >= s.end)
								b((c = s.b), 1 - c),
									E1(e, s.b, 'end'),
									i || (s.b ? u() : --s.group.r || F(s.group.c)),
									(s = null);
							else if (K >= s.start) {
								const W = K - s.start;
								(c = s.a + s.d * v(W / s.duration)), b(c, 1 - c);
							}
						}
						return !(!s && !i);
				  }));
	}
	return {
		run(p) {
			q1(l)
				? (a1 ||
						((a1 = Promise.resolve()),
						a1.then(() => {
							a1 = null;
						})),
				  a1).then(() => {
						(l = l()), a(p);
				  })
				: a(p);
		},
		end() {
			u(), (s = i = null);
		}
	};
}
function n1(e, t, n) {
	const o = e.$$.props[t];
	o !== void 0 && ((e.$$.bound[o] = n), n(e.$$.ctx[o]));
}
function A(e) {
	e && e.c();
}
function H(e, t, n, o) {
	const { fragment: l, on_mount: c, on_destroy: s, after_update: i } = e.$$;
	l && l.m(t, n),
		o ||
			l1(() => {
				const d = c.map(at).filter(q1);
				s ? s.push(...d) : F(d), (e.$$.on_mount = []);
			}),
		i.forEach(l1);
}
function E(e, t) {
	const n = e.$$;
	n.fragment !== null &&
		(F(n.on_destroy),
		n.fragment && n.fragment.d(t),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function s1(e, t, n, o, l, c, s, i = [-1]) {
	const d = h1;
	m1(e);
	const u = (e.$$ = {
		fragment: null,
		ctx: null,
		props: c,
		update: N,
		not_equal: l,
		bound: G1(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(t.context || (d ? d.$$.context : [])),
		callbacks: G1(),
		dirty: i,
		skip_bound: !1,
		root: t.target || d.$$.root
	});
	s && s(u.root);
	let r = !1;
	if (
		((u.ctx = n
			? n(e, t.props || {}, (a, p, ...f) => {
					const C = f.length ? f[0] : p;
					return (
						u.ctx &&
							l(u.ctx[a], (u.ctx[a] = C)) &&
							(!u.skip_bound && u.bound[a] && u.bound[a](C),
							r &&
								(function (v, b) {
									v.$$.dirty[0] === -1 &&
										(d1.push(v), A1 || ((A1 = !0), $t.then(X1)), v.$$.dirty.fill(0)),
										(v.$$.dirty[(b / 31) | 0] |= 1 << b % 31);
								})(e, a)),
						p
					);
			  })
			: []),
		u.update(),
		(r = !0),
		F(u.before_update),
		(u.fragment = !!o && o(u.ctx)),
		t.target)
	) {
		if (t.hydrate) {
			const a = (function (p) {
				return Array.from(p.childNodes);
			})(t.target);
			u.fragment && u.fragment.l(a), a.forEach(y);
		} else u.fragment && u.fragment.c();
		t.intro && x(e.$$.fragment), H(e, t.target, t.anchor, t.customElement), X1();
	}
	m1(d);
}
class i1 {
	$destroy() {
		E(this, 1), (this.$destroy = N);
	}
	$on(t, n) {
		const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
		return (
			o.push(n),
			() => {
				const l = o.indexOf(n);
				l !== -1 && o.splice(l, 1);
			}
		);
	}
	$set(t) {
		var n;
		this.$$set &&
			((n = t), Object.keys(n).length !== 0) &&
			((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
	}
}
function bt(e) {
	let t, n, o, l;
	const c = e[5].default,
		s = G(c, e, e[4], null);
	return {
		c() {
			(t = $('span')),
				s && s.c(),
				h(t, 'contenteditable', ''),
				e[0] === void 0 && l1(() => e[7].call(t));
		},
		m(i, d) {
			q(i, t, d),
				s && s.m(t, null),
				e[6](t),
				e[0] !== void 0 && (t.textContent = e[0]),
				(n = !0),
				o || ((l = [R(t, 'input', e[7]), R(t, 'keydown', e[2]), R(t, 'blur', e[2])]), (o = !0));
		},
		p(i, [d]) {
			s && s.p && (!n || 16 & d) && Q(s, c, i, i[4], n ? I(c, i[4], d, null) : J(i[4]), null),
				1 & d && i[0] !== t.textContent && (t.textContent = i[0]);
		},
		i(i) {
			n || (x(s, i), (n = !0));
		},
		o(i) {
			g(s, i), (n = !1);
		},
		d(i) {
			i && y(t), s && s.d(i), e[6](null), (o = !1), F(l);
		}
	};
}
function zt(e, t, n) {
	let { $$slots: o = {}, $$scope: l } = t;
	const c = Z1();
	let s,
		{ item: i } = t,
		{ options: d = { singleLine: !0 } } = t;
	return (
		(e.$$set = (u) => {
			'item' in u && n(0, (i = u.item)),
				'options' in u && n(3, (d = u.options)),
				'$$scope' in u && n(4, (l = u.$$scope));
		}),
		(e.$$.update = () => {
			1 & e.$$.dirty && i && c('change', { item: i });
		}),
		[
			i,
			s,
			(u) => {
				u.keyCode === 13 && d.singleLine && (u.preventDefault(), s.blur());
			},
			d,
			l,
			o,
			function (u) {
				D[u ? 'unshift' : 'push'](() => {
					(s = u), n(1, s);
				});
			},
			function () {
				(i = this.textContent), n(0, i);
			}
		]
	);
}
class o1 extends i1 {
	constructor(t) {
		super(), s1(this, t, zt, bt, c1, { item: 0, options: 3 });
	}
}
function kt(e) {
	let t;
	return {
		c() {
			(t = $('div')),
				(t.innerHTML =
					'<svg><symbol id="avatar" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"></path></symbol><symbol id="address" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M412 414a111 111 0 0 1 90-77v-40h31c7 0 13-6 13-13v-15c0-5-2-9-7-11L355 153c-4-2-8-2-12 0l-65 37v-13c0-5-4-9-9-9h-29c-5 0-8 4-8 9v39l-74 42c-4 2-7 7-7 11v15c0 7 6 13 13 13h31v180c0 12 9 21 20 21h203c-13-25-15-56-6-84z"></path><path d="M592 412a81 81 0 0 0-109-36 82 82 0 0 0-36 109l61 108c5 9 18 9 23 0l61-108c12-22 12-49 0-73zm-73 72a35 35 0 1 1 0-70 35 35 0 1 1 0 70z"></path></symbol><symbol id="email" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="m582.1 312.4-197.5-128c-4.3-2.8-10-2.8-14.4 0l-199 128c-3.8 2.4-7.8 6.6-7.8 11v230.3c0 7.3 9.3 15.6 16.6 15.6h394.5c7.3 0 14.1-8.3 14.1-15.6V323.4c0-4.4-2.7-8.6-6.4-11zm-385 35.2 113 73.3-113 103zm131.8 88 41.2 26.8a13.2 13.2 0 0 0 14.3 0l41.1-26.8 115 104.7H214zM451.5 421l113-73.3V524zm-74.3-209.8 173.1 112.3-173 112.3-173.1-112.3zm0 200.6c20.7 0 40.9-7.3 56.7-20.6A13.2 13.2 0 0 0 417 371a62 62 0 1 1 22.2-47.5c0 6-4.9 10.9-10.8 10.9a11 11 0 0 1-10.9-10v-.9a40.3 40.3 0 1 0-12.3 29 37 37 0 0 0 60.3-29 88.4 88.4 0 1 0-88.3 88.4zm0-74.3a14 14 0 1 1 0-28 14 14 0 0 1 0 28z"></path></symbol><symbol id="phone" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path fill-rule="evenodd" d="m587 561-3 3c-96 96-241-7-315-81S92 264 188 168l3-3 107 106-13 14a39 39 0 0 0-5 49 503 503 0 0 0 138 138c16 11 36 9 49-5l14-13zm-92-118 104 103c7-14 4-33-8-45l-51-51a39 39 0 0 0-45-7zM206 153l103 104c7-15 5-33-7-45l-51-51a39 39 0 0 0-45-8z"></path></symbol><symbol id="arrow-left" class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></symbol><symbol id="arrow-right" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></symbol><symbol id="arrow-up" class="icon" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></symbol><symbol id="arrow-down" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></symbol><symbol id="check" class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></symbol><symbol id="close" class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol><symbol id="download" class="icon" viewBox="0 0 24 24"><path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></symbol><symbol id="edit" class="icon" viewBox="0 0 24 24"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></symbol><symbol id="github" class="icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z" fill="currentColor" stroke="none"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z" fill="currentColor" stroke="none"></path></symbol><symbol id="git-branch" class="icon" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></symbol><symbol id="log-in" class="icon" viewBox="0 0 24 24"><path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></symbol><symbol id="maximize" class="icon" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></symbol><symbol id="maximize-2" class="icon" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></symbol><symbol id="menu" class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol><symbol id="message-square" class="icon" viewBox="0 0 24 24"><g transform="translate(0, 1)"><path d="M16.5 19H11V15H18V11H22V19H19.5L18 20.5L16.5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 3H18V15H8.5L6.5 17L4.5 15H2V3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 11H9" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 7H12" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></g></symbol><symbol id="minus" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="plus" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="save" class="icon" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></symbol><symbol id="link" class="icon" viewBox="0 0 24 24"><path d="M9,7L6,7A2 2 0 0 0 6,17L9,17"></path><path d="M15,7L18,7A2 2 0 0 1 18,17L15,17"></path><path d="M7,12L17,12"></path></symbol><symbol id="chevron" class="icon" viewBox="0 0 24 24"><path d="M2,7 L12,17 L20,7"></path></symbol><symbol id="delete" class="icon" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M22 4.2h-5.6L15 1.6c-.1-.2-.4-.4-.7-.4H9.6c-.2 0-.5.2-.6.4L7.6 4.2H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.8V22c0 .4.3.8.8.8h15c.4 0 .8-.3.8-.8V5.8H22c.4 0 .8-.3.8-.8s-.4-.8-.8-.8zM10.8 16.5c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5zm4 0c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5z"></path></symbol><symbol id="scanQR" class="icon" width="100%" height="100%" viewBox="0 0 760 760"><path d="M684 630c-31-34-9-38-2-84 7-34 13-75-2-123l-34-64c-22-39-51-89-58-117v-2c-6-24-9-43-9-60-2-22-4-35-20-41h-2c-11-3-22-5-33 2V59c0-22-20-41-43-41H205c-25 0-42 19-42 41v49s-29-26-49-30c-5 0-21 2-32 13a44 44 0 0 0-11 43c2 11 31 50 65 69 7 7 15 11 27 15v3h-5c-49 4-69 64-31 94-34 20-34 65-2 87a54 52 0 0 0 38 92v72c0 23 17 62 42 62h89c13 30 25 41 69 50h7c11 4 31 8 47 6l2 2 7 13c6 11 11 22 13 35 2 6 9 11 16 9 6-3 11-9 9-16-3-15-9-28-16-38l-9-13c-2-7-4-9-11-13l-2-2h-9c-11 2-31-3-43-5l-6-2c-32-6-34-4-47-26h160c23 0 43-17 43-41 0 0-20-60-18-86s24-65 24-65l18-30c9-24-4-47-18-78l-9-15c-11-23-20-47-20-75-2-11 5-41 20-63 7-8 16-19 29-17l5 24c0 17 2 39 11 64 7 33 34 82 58 123l33 63c12 41 7 78 0 112-6 45-31 58 9 101 12 5 20-4 18-15zM205 41h276c9 0 18 9 18 18v19H187V59c0-9 7-18 18-18zm-58 143c-18-11-51-48-51-54-3-7-3-17 4-22 5-4 14-4 16-6 4 0 47 30 47 30v58zm11 60a30 29 0 1 1 0 58 30 29 0 0 1 0-58zm0 145a30 29 0 1 1 0-58 30 29 0 0 1 0 58zm-29 54a30 29 0 1 1 60 0 30 29 0 0 1-60 0zm85 0c0-18-9-33-22-41 31-22 31-67-3-87 34-21 34-69-2-88V102h312v62c-15 26-24 59-22 76 0 30 11 58 22 82 31 267-67 211-312 211v-45c16-9 27-26 27-45zm267 161H205c-11 0-18-28-18-38v-9h312v9c0 10-9 38-18 38z"></path><path d="m306 191-2 18v18h5c4 0 4 2 4 3 1 4 0 5-4 5-5 0-5 0-5 10 0 8 0 8 5 8 4 0 5-1 5-5l3-3c5 0 5 0 5 13 2 13 2 13 5 13 4 2 5 0 5-3s2-5 5-5 3 0 3-5 0-5 5-5 5 0 5-3c0-5 0-5-5-5-3 0-5 0-5 5 0 3 0 3-3 3-5 0-5 0-5-18l-1-16-4-2c-3 0-5-1-5-5l-3-3c-3 0-5-2-5-10s-1-8-3-10z"></path><path d="m352 191-2 5c0 3 0 3-8 3-10 0-10 0-10 5 0 3 0 5 5 5 3 0 3 0 3 13v13h18v9c0 9 0 9 5 9h5v-26h10c8 0 8 0 8-5s0-5-8-5c-10 0-10 0-10-5 0-3 0-3-5-3s-5 0-5 3c0 4 2 5 5 5 5 0 5 2 5 5 0 5 0 5-5 5-3 0-5-2-5-5s-1-5-4-5c-4 0-4 0-4-10 0-8 0-8 5-8 3 0 3 0 3-5-1-3-4-6-6-3zm26 2c-1 5 0 6 5 6 3 0 3 0 3-5-1-5-8-6-9-1zm-146 29v31h62v-62h-62Zm54 0v23h-46v-46h46z"></path><path d="M250 222v13h26v-26h-26Zm146 0v31h63v-62h-63zm54 0v23h-46v-46h46z"></path><path d="M414 222v13h27v-26h-27zm-37 15v10l4 6c5 0 5 0 5-8 0-10 0-10-3-10zm-25 18-2 5c0 2 2 3 5 3s3 0 3-5c-1-3-4-6-6-3zm-122 10v10l5 6c5 0 5 2 5 5 0 5 0 5-5 5h-5v26h20v5c0 5 0 5 5 5 3 0 3 0 3-5 0-3-1-5-5-5l-3-3c0-3-1-5-5-5-5 0-5 0-5-10 0-8 0-8 5-8s5 0 5 5c0 12 0 13 5 13 3 0 3 2 3 5s2 3 5 3c5 0 5 0 5-3s-1-5-5-5c-5 0-5 0-5-10v-8h10c8 0 8 0 8 5 0 3 2 3 5 3 5 0 5 0 5 5s0 5-5 5-5 0-5 10c0 8 0 8-3 8s-5 2-5 4c0 4 5 6 13 4 4 0 5-1 5-4 0-2 2-4 5-4s3 2 3 5 2 3 15 3c5 0 5 0 5 5s0 5 5 5c3 0 3 0 3 10 0 8 0 8 5 8h5v-13c2-13 2-13 5-15 2 0 3-1 3-4 0-4 2-4 5-4 5 0 5 0 5 5s8 5 8 0c2-3 2-3 10-5 9 0 9 0 9-5s0-5-10-5c-9 0-9 0-9-3s2-5 5-5c4 0 5-1 5-5 0-3 0-5-5-5-3 0-5-1-5-5 0-1 0-3 5-3 4-1 5-1 5-10 0-8 0-8-5-8h-8c-5 0-5 0-5 8-1 9-1 9-5 10-3 0-5 2-5 5 0 2 0 3-3 3-5 0-5 0-5 5s0 5-5 5c-3 0-5 0-5 3 0 4 0 5-3 5-5 0-5 0-5 5 0 4 0 5 5 5 3 0 3 0 3 4 0 6-8 6-8 1-1-3-1-5-10-5-10 0-10 0-10-5s0-5-3-5-5-1-5-5c0-3 0-3 10-3 8 0 8 0 8 5 0 3 0 3 5 3 7-1 7-6 0-8-5 0-5 0-5-10 0-8 0-8 5-8 4 0 5 2 5 5 0 5 8 5 8 0 0-3 2-5 5-5 4 0 4-1 4-5 1-3 0-3-14-5-13 0-13 0-13-3 0-5 0-5-5-5s-5 0-5 3c0 4 2 5 5 5 5 0 5 2 5 5 0 5 0 5-5 5s-5 0-5-5v-5h-36v-3c0-7-8-7-8-2 0 4-1 5-5 5-5 0-5 0-5-3s2-5 5-5c4 0 5-2 5-5s-1-3-10-5zm64 29c0 5 0 5-3 5s-5 0-5-3 2-5 5-5 3 2 3 5zm56 10c0 4-1 5-5 5-3 0-5 2-5 5 0 2 0 3-3 3s-5 0-5-3 2-5 5-5 3 0 3-5 0-5 5-5c4 0 4 2 4 5z"></path><path d="M268 268c2 3 2 3 13 3 12 0 13 0 13-3v-5h-26Zm74-3c-2 2-2 6 2 6 3 2 6 0 6-3-1-5-6-6-8-3zm35 2c0 3 3 6 6 6l3-6c0-4 0-4-3-4zm29-2c-2 2-2 6 2 6 3 2 6 0 6-3-1-5-6-6-8-3zm16 8c0 8 0 8-4 8s-4 0-4 5c0 4 2 5 5 5 2 0 3-1 3-5 0-5 2-5 5-5 4 0 5 0 5-3 0-5 0-5 10-5 8 0 8 0 8 3 0 4-1 5-5 5-3 0-4 2-4 5 0 4-2 5-5 5-2 0-4 2-4 5s2 3 4 3c3 0 5 2 5 5 0 4 1 5 4 5 4 0 5 2 5 5s2 3 5 3h5v-52l-19-2h-19zm-36 5c0 3 0 3-3 3-5 0-6 2-6 7 3 5 8 3 9-2 0-3 2-5 5-5 4 0 5-1 5-5 0-3 0-3-5-3s-5 0-5 3zm10 26c0 13 0 13 5 13 3 0 3 0 3-13s0-13-3-13c-5 0-5 0-5 13zm28 7-2 3c0 2 2 3 5 3 5 0 5 0 5-5 0-3 0-3-3-3zm-8 8-2 5c0 2 2 3 5 3s3 0 3-5c-1-3-4-6-6-3zm-30 12c0 3-1 4-5 4s-4 2-4 15 0 13-4 13c-5 0-5 0-5 5s0 5-8 5c-10 0-10 0-10 4 0 3 2 4 5 4s3 0 3 5 0 5-3 5-5-1-5-5c0-3-1-5-5-5-3 0-5 2-5 5 0 4-1 5-3 5-3 0-5-1-5-5 0-3-1-5-5-5-3 0-5 2-5 5 0 4-1 5-5 5s-4 8 0 8 5 2 5 5c0 5 0 5-3 5s-5-1-5-5c0-3-1-5-5-5-3 2-3 2-3 10v10h8c7 0 8-1 8-5 0-5 0-5 10-5 8 0 8 0 8 5 2 4 2 4 10 5h8v-10c2-8 2-10 5-10 4 0 5-1 5-4 0-4 2-4 4-4 5 0 5 0 5 8 1 9 1 9 4 10 5 0 5 0 5-8v-10h15c13 0 13 0 13 4 0 3-1 4-5 4-3 0-3 2-3 10v10h54v-10c0-8-1-8-5-8-3 0-5 0-5 3 0 5-1 5-5 5-3 0-4-1-4-5 0-5 0-5 4-5s5 0 5-3 2-5 5-5c4 0 4-1 4-5 0-3 0-3-9-3h-9v16h-10c-9 0-9 0-9-3s-1-5-4-5c-4 0-4 0-4-5 0-3 0-5 4-5 3 0 4 0 4-3 0-5 0-5 19-5l18-1v-7l-18-2c-19 0-19 0-19-3s2-5 5-5c4 0 5-1 5-5 0-5 0-5-5-5-3 0-5-1-5-5-1-3-1-3-9-5-9 0-9 0-9-4s0-4-9-4-9 0-9 4zm28 27v15h-26l-2-15v-13h14l14 2v13zm-37 20c0 3 0 3-4 3-3 0-5 0-5-3s2-5 5-5c4 0 4 2 4 5zm-27 26c0 5 0 5-5 5s-5 0-5-3c0-5 2-7 7-7 2 0 3 2 3 5z"></path><path d="M396 360c0 3 2 3 5 3s3 0 3-3 0-5-3-5-5 2-5 5zm36-28c0 3 2 3 5 3 4 0 4 0 4-3s0-5-4-5c-3 0-5 2-5 5zm-202 5c-1 7 2 8 10 8 9 0 10-1 10-5 0-3-1-3-10-5zm30 0-2 5c0 3 0 3 5 3 4 0 5-1 5-3 0-5-5-8-8-5zm28 0-2 5c0 2 2 3 5 3s3 0 3-5c0-3-4-6-6-3zm54 0c-3 2-2 8 3 8 4 0 5-1 5-3 0-3-1-7-5-7zm108 0v10c2 7 2 7 5 7 4 1 5 0 5-9 0-8-1-8-5-10zm-146 13c2 5 9 7 10 2 0-5-1-7-6-7-4 0-4 0-4 5zm46 0c0 4 2 4 5 4 2 0 3 0 3-4 0-5 0-5-4-5s-4 0-4 5zm-118 36v32h62v-63h-62Zm54 0v23h-46v-46h46z"></path><path d="M250 386v13h26v-26h-26Zm54-13c0 8 0 8 5 8 4-1 4-1 4-9 1-7 0-7-4-9-5 0-5 0-5 10zm36-8c-1 5 2 8 5 8 4 0 5-1 5-5 0-3-1-5-5-5zm-8 13c0 3 2 3 5 3s3 0 3-3 0-5-3-5-5 2-5 5zm90 5c-1 5 2 8 5 8 4 0 5-1 5-5 0-3-1-5-5-5zm-54 31c0 4 2 5 5 5 4 0 4 0 4-5s0-5-5-5c-4 0-4 0-4 5z"></path></symbol></svg>'),
				p1(t, 'display', 'none');
		},
		m(n, o) {
			q(n, t, o);
		},
		p: N,
		i: N,
		o: N,
		d(n) {
			n && y(t);
		}
	};
}
class qt extends i1 {
	constructor(t) {
		super(), s1(this, t, null, kt, c1, {});
	}
}
function Ct(e) {
	M1(
		e,
		'svelte-wxgj7p',
		'.icon.svelte-wxgj7p{position:relative;overflow:hidden;vertical-align:middle;-o-object-fit:contain;object-fit:contain;transform-origin:center center;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;fill:currentColor}'
	);
}
function tt(e) {
	let t, n, o, l, c, s, i;
	const d = e[3].default,
		u = G(d, e, e[2], null);
	return (
		(s = new qt({})),
		{
			c() {
				(t = C1('svg')),
					(n = C1('use')),
					(l = _()),
					u && u.c(),
					(c = _()),
					A(s.$$.fragment),
					Q1(n, 'xlink:href', (o = '#' + e[0])),
					h(t, 'width', e[1]),
					h(t, 'height', e[1]),
					h(t, 'class', 'icon  svelte-wxgj7p');
			},
			m(r, a) {
				q(r, t, a), k(t, n), q(r, l, a), u && u.m(r, a), q(r, c, a), H(s, r, a), (i = !0);
			},
			p(r, a) {
				(!i || (1 & a && o !== (o = '#' + r[0]))) && Q1(n, 'xlink:href', o),
					(!i || 2 & a) && h(t, 'width', r[1]),
					(!i || 2 & a) && h(t, 'height', r[1]),
					u && u.p && (!i || 4 & a) && Q(u, d, r, r[2], i ? I(d, r[2], a, null) : J(r[2]), null);
			},
			i(r) {
				i || (x(u, r), x(s.$$.fragment, r), (i = !0));
			},
			o(r) {
				g(u, r), g(s.$$.fragment, r), (i = !1);
			},
			d(r) {
				r && y(t), r && y(l), u && u.d(r), r && y(c), E(s, r);
			}
		}
	);
}
function jt(e) {
	let t,
		n,
		o = e[0] && tt(e);
	return {
		c() {
			o && o.c(), (t = S1(''));
		},
		m(l, c) {
			o && o.m(l, c), q(l, t, c), (n = !0);
		},
		p(l, [c]) {
			l[0]
				? o
					? (o.p(l, c), 1 & c && x(o, 1))
					: ((o = tt(l)), o.c(), x(o, 1), o.m(t.parentNode, t))
				: o &&
				  (R1(),
				  g(o, 1, 1, () => {
						o = null;
				  }),
				  O1());
		},
		i(l) {
			n || (x(o), (n = !0));
		},
		o(l) {
			g(o), (n = !1);
		},
		d(l) {
			o && o.d(l), l && y(t);
		}
	};
}
function Mt(e, t, n) {
	let { $$slots: o = {}, $$scope: l } = t,
		{ name: c } = t,
		{ size: s = '100%' } = t;
	return (
		(e.$$set = (i) => {
			'name' in i && n(0, (c = i.name)),
				'size' in i && n(1, (s = i.size)),
				'$$scope' in i && n(2, (l = i.$$scope));
		}),
		[c, s, l, o]
	);
}
class Lt extends i1 {
	constructor(t) {
		super(), s1(this, t, Mt, jt, c1, { name: 0, size: 1 }, Ct);
	}
}
function _t(e) {
	M1(
		e,
		'svelte-nn8bp4',
		`.m-2.svelte-nn8bp4{margin:0.5rem
}.flex.svelte-nn8bp4{display:flex
}.h-8.svelte-nn8bp4{height:2rem
}.w-8.svelte-nn8bp4{width:2rem
}.items-center.svelte-nn8bp4{align-items:center
}.justify-center.svelte-nn8bp4{justify-content:center
}.bg-contain.svelte-nn8bp4{background-size:contain
}.bg-no-repeat.svelte-nn8bp4{background-repeat:no-repeat
}.text-center.svelte-nn8bp4{text-align:center
}.align-middle.svelte-nn8bp4{vertical-align:middle
}.text-slate-500.svelte-nn8bp4{--tw-text-opacity:1;color:rgb(100 116 139 / var(--tw-text-opacity))
}`
	);
}
const Bt = (e) => ({}),
	et = (e) => ({});
function Ht(e) {
	let t, n, o, l, c;
	const s = e[2].first,
		i = G(s, e, e[1], et),
		d =
			i ||
			(function (a) {
				let p, f, C;
				return (
					(f = new Lt({ props: { name: a[0] } })),
					{
						c() {
							(p = $('div')), A(f.$$.fragment), h(p, 'class', 'text-slate-500 svelte-nn8bp4');
						},
						m(v, b) {
							q(v, p, b), H(f, p, null), (C = !0);
						},
						p(v, b) {
							const z = {};
							1 & b && (z.name = v[0]), f.$set(z);
						},
						i(v) {
							C || (x(f.$$.fragment, v), (C = !0));
						},
						o(v) {
							g(f.$$.fragment, v), (C = !1);
						},
						d(v) {
							v && y(p), E(f);
						}
					}
				);
			})(e),
		u = e[2].default,
		r = G(u, e, e[1], null);
	return {
		c() {
			(t = $('div')),
				(n = $('div')),
				d && d.c(),
				(o = _()),
				(l = $('div')),
				r && r.c(),
				h(n, 'class', 'align-middle w-8 h-8 svelte-nn8bp4'),
				h(l, 'class', 'align-middle svelte-nn8bp4'),
				h(
					t,
					'class',
					'flex align-middle items-center text-center justify-center bg-contain bg-no-repeat m-2 svelte-nn8bp4'
				);
		},
		m(a, p) {
			q(a, t, p), k(t, n), d && d.m(n, null), k(t, o), k(t, l), r && r.m(l, null), (c = !0);
		},
		p(a, [p]) {
			i
				? i.p && (!c || 2 & p) && Q(i, s, a, a[1], c ? I(s, a[1], p, Bt) : J(a[1]), et)
				: d && d.p && (!c || 1 & p) && d.p(a, c ? p : -1),
				r && r.p && (!c || 2 & p) && Q(r, u, a, a[1], c ? I(u, a[1], p, null) : J(a[1]), null);
		},
		i(a) {
			c || (x(d, a), x(r, a), (c = !0));
		},
		o(a) {
			g(d, a), g(r, a), (c = !1);
		},
		d(a) {
			a && y(t), d && d.d(a), r && r.d(a);
		}
	};
}
function Et(e, t, n) {
	let { $$slots: o = {}, $$scope: l } = t,
		{ name: c = null } = t;
	return (
		(e.$$set = (s) => {
			'name' in s && n(0, (c = s.name)), '$$scope' in s && n(1, (l = s.$$scope));
		}),
		[c, l, o]
	);
}
class f1 extends i1 {
	constructor(t) {
		super(), s1(this, t, Et, Ht, c1, { name: 0 }, _t);
	}
}
function Nt(e) {
	const t = e - 1;
	return t * t * t + 1;
}
function nt(e) {
	return --e * e * e * e * e + 1;
}
function ot(
	e,
	{ delay: t = 0, duration: n = 400, easing: o = Nt, x: l = 0, y: c = 0, opacity: s = 0 } = {}
) {
	const i = getComputedStyle(e),
		d = +i.opacity,
		u = i.transform === 'none' ? '' : i.transform,
		r = d * (1 - s);
	return {
		delay: t,
		duration: n,
		easing: o,
		css: (a, p) => `
			transform: ${u} translate(${(1 - a) * l}px, ${(1 - a) * c}px);
			opacity: ${d - r * p}`
	};
}
function Vt(e) {
	M1(
		e,
		'svelte-17dj42',
		`.z-50.svelte-17dj42{z-index:50
}.mx-4.svelte-17dj42{margin-left:1rem;margin-right:1rem
}.mx-1.svelte-17dj42{margin-left:0.25rem;margin-right:0.25rem
}.flex.svelte-17dj42{display:flex
}.h-10.svelte-17dj42{height:2.5rem
}.w-10.svelte-17dj42{width:2.5rem
}.flex-row.svelte-17dj42{flex-direction:row
}.flex-col.svelte-17dj42{flex-direction:column
}.justify-end.svelte-17dj42{justify-content:flex-end
}.rounded-sm.svelte-17dj42{border-radius:0.125rem
}.border.svelte-17dj42{border-width:1px
}.border-slate-300.svelte-17dj42{--tw-border-opacity:1;border-color:rgb(203 213 225 / var(--tw-border-opacity))
}.bg-slate-50.svelte-17dj42{--tw-bg-opacity:1;background-color:rgb(248 250 252 / var(--tw-bg-opacity))
}.p-4.svelte-17dj42{padding:1rem
}.text-left.svelte-17dj42{text-align:left
}.text-sm.svelte-17dj42{font-size:0.875rem;line-height:1.25rem
}.shadow-lg.svelte-17dj42{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}`
	);
}
function lt(e) {
	let t, n, o, l, c, s;
	const i = [Pt, At],
		d = [];
	function u(r, a) {
		return r[1] ? 1 : 0;
	}
	return (
		(o = u(e)),
		(l = d[o] = i[o](e)),
		{
			c() {
				(t = $('div')),
					(n = $('div')),
					l.c(),
					h(n, 'class', 'text-left border-slate-300 svelte-17dj42'),
					h(
						t,
						'class',
						'flex flex-row justify-end z-50 bg-slate-50 border shadow-lg p-4 mx-4 rounded-sm svelte-17dj42'
					);
			},
			m(r, a) {
				q(r, t, a), k(t, n), d[o].m(n, null), (s = !0);
			},
			p(r, a) {
				let p = o;
				(o = u((e = r))),
					o === p
						? d[o].p(e, a)
						: (R1(),
						  g(d[p], 1, 1, () => {
								d[p] = null;
						  }),
						  O1(),
						  (l = d[o]),
						  l ? l.p(e, a) : ((l = d[o] = i[o](e)), l.c()),
						  x(l, 1),
						  l.m(n, null));
			},
			i(r) {
				s ||
					(x(l),
					l1(() => {
						c ||
							(c = Y1(
								t,
								ot,
								{ delay: 0, duration: 400, x: 0, y: -100, opacity: 0.1, easing: nt },
								!0
							)),
							c.run(1);
					}),
					(s = !0));
			},
			o(r) {
				g(l),
					c ||
						(c = Y1(
							t,
							ot,
							{ delay: 0, duration: 400, x: 0, y: -100, opacity: 0.1, easing: nt },
							!1
						)),
					c.run(0),
					(s = !1);
			},
			d(r) {
				r && y(t), d[o].d(), r && c && c.end();
			}
		}
	);
}
function At(e) {
	let t;
	return {
		c() {
			t = S1('Requesting access...');
		},
		m(n, o) {
			q(n, t, o);
		},
		p: N,
		i: N,
		o: N,
		d(n) {
			n && y(t);
		}
	};
}
function Pt(e) {
	let t, n, o, l, c, s;
	return (
		(o = new f1({ props: { $$slots: { first: [Zt], default: [St] }, $$scope: { ctx: e } } })),
		(c = new f1({ props: { $$slots: { first: [Ot], default: [Rt] }, $$scope: { ctx: e } } })),
		{
			c() {
				(t = $('span')),
					(t.innerHTML = 'Paste the <b>Public Key</b> you want to grant access'),
					(n = _()),
					A(o.$$.fragment),
					(l = _()),
					A(c.$$.fragment),
					h(t, 'class', 'text-sm svelte-17dj42');
			},
			m(i, d) {
				q(i, t, d), q(i, n, d), H(o, i, d), q(i, l, d), H(c, i, d), (s = !0);
			},
			p(i, d) {
				const u = {};
				260 & d && (u.$$scope = { dirty: d, ctx: i }), o.$set(u);
				const r = {};
				256 & d && (r.$$scope = { dirty: d, ctx: i }), c.$set(r);
			},
			i(i) {
				s || (x(o.$$.fragment, i), x(c.$$.fragment, i), (s = !0));
			},
			o(i) {
				g(o.$$.fragment, i), g(c.$$.fragment, i), (s = !1);
			},
			d(i) {
				i && y(t), i && y(n), E(o, i), i && y(l), E(c, i);
			}
		}
	);
}
function St(e) {
	let t, n, o;
	return {
		c() {
			(t = $('input')), h(t, 'type', 'text'), h(t, 'placeholder', 'Their Public Key');
		},
		m(l, c) {
			q(l, t, c), J1(t, e[2]), n || ((o = [R(t, 'input', e[5]), R(t, 'keydown', e[4])]), (n = !0));
		},
		p(l, c) {
			4 & c && t.value !== l[2] && J1(t, l[2]);
		},
		d(l) {
			l && y(t), (n = !1), F(o);
		}
	};
}
function Zt(e) {
	let t;
	return {
		c() {
			(t = $('span')),
				(t.textContent = 'Grant Acess:'),
				h(t, 'class', 'text-sm mx-1 svelte-17dj42');
		},
		m(n, o) {
			q(n, t, o);
		},
		p: N,
		d(n) {
			n && y(t);
		}
	};
}
function Rt(e) {
	let t, n, o;
	return {
		c() {
			(t = $('input')), h(t, 'type', 'text'), h(t, 'placeholder', 'douganderson444');
		},
		m(l, c) {
			q(l, t, c), n || ((o = R(t, 'keydown', e[4])), (n = !0));
		},
		p: N,
		d(l) {
			l && y(t), (n = !1), o();
		}
	};
}
function Ot(e) {
	let t, n, o;
	return {
		c() {
			(t = $('input')),
				(n = _()),
				(o = $('span')),
				(o.innerHTML = 'Add <b>Contact</b>'),
				h(t, 'type', 'checkbox'),
				(t.checked = !0),
				h(o, 'class', 'text-sm mx-1 svelte-17dj42');
		},
		m(l, c) {
			q(l, t, c), q(l, n, c), q(l, o, c);
		},
		p: N,
		d(l) {
			l && y(t), l && y(n), l && y(o);
		}
	};
}
function Tt(e) {
	let t,
		n,
		o,
		l,
		c,
		s,
		i,
		d,
		u = e[0] && lt(e);
	return {
		c() {
			(t = $('div')),
				(n = $('div')),
				(o = $('div')),
				(o.innerHTML =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752 752"><path d="M346.9 153.4c-6.2 0-12.1 5.2-13.7 10.2l-12.4 43.5a176 176 0 0 0-25.2 10.4l-39.5-21.9c-5.3-3-12.7-2-17 2.4l-41 41.1a14.6 14.6 0 0 0-2.4 16.9l22 39.6a171 171 0 0 0-10.4 25l-43.5 12.5c-6 1.7-10.4 7.6-10.4 13.8v58.3c0 6 4.5 12 10.4 13.6L207 431c2.9 8.7 6.5 17 10.5 25.1L195.7 496a14.7 14.7 0 0 0 2.4 16.9l41 41.1a14.6 14.6 0 0 0 17 2.4l39.5-22c8.1 4.2 16.5 7.7 25.2 10.6l12.4 43.3a14.6 14.6 0 0 0 13.7 10.4h58.3c6 0 12-4.5 13.6-10.4l12.4-43.3c8.7-2.9 17.1-6.4 25.2-10.5l39.5 21.9c5.3 3 12.7 2 17-2.4l41-41.1a14.6 14.6 0 0 0 2.4-17l-22-39.6c4.2-8 7.7-16.4 10.6-25.1l43.3-12.3a14.6 14.6 0 0 0 10.4-13.6V347c0-6.2-4.4-12.1-10.4-13.8l-43.5-12.4c-2.8-8.7-6.3-17-10.3-25l21.9-39.7a14.7 14.7 0 0 0-2.4-16.9l-41-41.1a14.6 14.6 0 0 0-17-2.4l-39.5 21.9c-8-4.1-16.5-7.5-25.2-10.4l-12.4-43.5a14.6 14.6 0 0 0-13.6-10.2zm10.6 28.4h37L406 222c1.3 4.7 5.2 8.7 10 10 11.9 3.2 23.2 8 33.8 14 4.2 2.4 9.7 2.5 14 .2l36.6-20.5 26 26-20.4 36.6a14.5 14.5 0 0 0 0 14c6.1 10.6 11 22 14.3 34a14 14 0 0 0 9.7 9.9l40.3 11.4v36.9L530 406a14.5 14.5 0 0 0-9.7 9.8 149 149 0 0 1-14.3 34 14.5 14.5 0 0 0 0 14l20.5 36.6-26 26-36.8-20.5a14.5 14.5 0 0 0-13.9.1c-10.6 6-22 11-33.9 14.2a14.5 14.5 0 0 0-9.9 9.8l-11.4 40.3h-37L346.2 530a14.5 14.5 0 0 0-9.9-9.8c-12-3.3-23.3-8.1-33.9-14.2a14.5 14.5 0 0 0-13.9-.1l-36.7 20.4-26-25.9 20.4-36.7c2.3-4.2 2.3-9.7 0-13.9-6-10.6-11-22-14.2-34a14.5 14.5 0 0 0-9.8-9.8l-40.3-11.5v-36.9l40.3-11.4c4.6-1.3 8.5-5.2 9.8-10a149 149 0 0 1 14.2-34c2.3-4.2 2.3-9.6 0-13.9l-20.5-36.5 26-26 36.8 20.4c4.2 2.3 9.7 2.2 14-.2a146 146 0 0 1 33.8-14 15 15 0 0 0 10-10zm18.5 90c-57.4 0-104.2 46.8-104.2 104.2S318.6 480.2 376 480.2c57.4 0 104.2-46.8 104.2-104.2S433.4 271.8 376 271.8zm0 28.4c42 0 75.8 33.8 75.8 75.8S418 451.8 376 451.8 300.2 418 300.2 376s33.8-75.8 75.8-75.8z"></path></svg>'),
				(l = _()),
				u && u.c(),
				h(o, 'class', 'w-10 h-10 svelte-17dj42'),
				h(n, 'class', 'flex flex-row justify-end svelte-17dj42'),
				h(t, 'class', 'flex flex-col svelte-17dj42');
		},
		m(r, a) {
			var p;
			q(r, t, a),
				k(t, n),
				k(n, o),
				k(t, l),
				u && u.m(t, null),
				(s = !0),
				i ||
					((d = [
						R(o, 'click', e[3]),
						R(o, 'keypress', e[3]),
						((p = c = Dt.call(null, t, { enabled: e[0], cb: e[6] })),
						p && q1(p.destroy) ? p.destroy : N)
					]),
					(i = !0));
		},
		p(r, [a]) {
			r[0]
				? u
					? (u.p(r, a), 1 & a && x(u, 1))
					: ((u = lt(r)), u.c(), x(u, 1), u.m(t, null))
				: u &&
				  (R1(),
				  g(u, 1, 1, () => {
						u = null;
				  }),
				  O1()),
				c && q1(c.update) && 3 & a && c.update.call(null, { enabled: r[0], cb: r[6] });
		},
		i(r) {
			s || (x(u), (s = !0));
		},
		o(r) {
			g(u), (s = !1);
		},
		d(r) {
			r && y(t), u && u.d(), (i = !1), F(d);
		}
	};
}
function Dt(e, { enabled: t, cb: n }) {
	const o = ({ target: c }) => {
		e.contains(c) || n();
	};
	function l({ enabled: c }) {
		c ? window.addEventListener('click', o) : window.removeEventListener('click', o);
	}
	return (
		l({ enabled: t }),
		{
			update: l,
			destroy() {
				window.removeEventListener('click', o);
			}
		}
	);
}
function Ft(e, t, n) {
	const o = Z1();
	let l,
		c,
		s = !1;
	return [
		s,
		l,
		c,
		function (i) {
			n(0, (s = !s));
		},
		function (i) {
			i.code === 'Enter' && (n(1, (l = !0)), o('change', { targetPublicKey: c }));
		},
		function () {
			(c = this.value), n(2, c);
		},
		() => {
			n(0, (s = !1)), n(1, (l = !1));
		}
	];
}
class Kt extends i1 {
	constructor(t) {
		super(), s1(this, t, Ft, Tt, c1, {}, Vt);
	}
}
function Ut(e) {
	M1(
		e,
		'svelte-weoqwc',
		`.absolute.svelte-weoqwc{position:absolute
}.relative.svelte-weoqwc{position:relative
}.z-10.svelte-weoqwc{z-index:10
}.m-auto.svelte-weoqwc{margin:auto
}.my-2.svelte-weoqwc{margin-top:0.5rem;margin-bottom:0.5rem
}.mx-auto.svelte-weoqwc{margin-left:auto;margin-right:auto
}.mx-2.svelte-weoqwc{margin-left:0.5rem;margin-right:0.5rem
}.-mt-20.svelte-weoqwc{margin-top:-5rem
}.mt-5.svelte-weoqwc{margin-top:1.25rem
}.mb-7.svelte-weoqwc{margin-bottom:1.75rem
}.flex.svelte-weoqwc{display:flex
}.h-24.svelte-weoqwc{height:6rem
}.h-32.svelte-weoqwc{height:8rem
}.w-96.svelte-weoqwc{width:24rem
}.w-32.svelte-weoqwc{width:8rem
}.max-w-lg.svelte-weoqwc{max-width:32rem
}.max-w-none.svelte-weoqwc{max-width:none
}.flex-none.svelte-weoqwc{flex:none
}.items-center.svelte-weoqwc{align-items:center
}.justify-center.svelte-weoqwc{justify-content:center
}.overflow-hidden.svelte-weoqwc{overflow:hidden
}.rounded-2xl.svelte-weoqwc{border-radius:1rem
}.rounded-full.svelte-weoqwc{border-radius:9999px
}.bg-slate-100.svelte-weoqwc{--tw-bg-opacity:1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))
}.bg-white.svelte-weoqwc{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))
}.bg-green-400.svelte-weoqwc{--tw-bg-opacity:1;background-color:rgb(74 222 128 / var(--tw-bg-opacity))
}.fill-slate-500.svelte-weoqwc{fill:#64748b
}.object-cover.svelte-weoqwc{-o-object-fit:cover;object-fit:cover
}.px-3.svelte-weoqwc{padding-left:0.75rem;padding-right:0.75rem
}.text-center.svelte-weoqwc{text-align:center
}.text-xl.svelte-weoqwc{font-size:1.25rem;line-height:1.75rem
}.text-base.svelte-weoqwc{font-size:1rem;line-height:1.5rem
}.text-neutral-800.svelte-weoqwc{--tw-text-opacity:1;color:rgb(38 38 38 / var(--tw-text-opacity))
}.text-sky-500.svelte-weoqwc{--tw-text-opacity:1;color:rgb(14 165 233 / var(--tw-text-opacity))
}.text-white.svelte-weoqwc{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))
}.shadow-xl.svelte-weoqwc{--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}.drop-shadow-xl.svelte-weoqwc{--tw-drop-shadow:drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}`
	);
}
const Gt = (e) => ({}),
	ct = (e) => ({}),
	It = (e) => ({}),
	st = (e) => ({}),
	Qt = (e) => ({}),
	it = (e) => ({}),
	Jt = (e) => ({}),
	rt = (e) => ({});
function Wt(e) {
	let t, n, o;
	return {
		c() {
			(t = $('div')),
				(n = $('img')),
				h(n, 'class', 'rounded-full bg-white absolute max-w-none object-cover svelte-weoqwc'),
				I1(n.src, (o = e[0].avatar)) || h(n, 'src', o),
				h(n, 'alt', 'd'),
				p1(n, 'width', '100%'),
				p1(n, 'height', '100%'),
				p1(n, 'transform-origin', '50% 50% 0px'),
				h(
					t,
					'class',
					'relative z-10 overflow-hidden flex-none mx-auto w-32 h-32 drop-shadow-xl svelte-weoqwc'
				);
		},
		m(l, c) {
			q(l, t, c), k(t, n);
		},
		p(l, c) {
			1 & c && !I1(n.src, (o = l[0].avatar)) && h(n, 'src', o);
		},
		d(l) {
			l && y(t);
		}
	};
}
function Xt(e) {
	let t, n;
	return {
		c() {
			(t = C1('svg')),
				(n = C1('path')),
				h(
					n,
					'd',
					'M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z'
				),
				h(t, 'class', 'rounded-full bg-white shadow-xl drop-shadow-xl svelte-weoqwc'),
				h(t, 'xmlns', 'http://www.w3.org/2000/svg'),
				h(t, 'version', '1.0'),
				h(t, 'viewBox', '0 0 256 256');
		},
		m(o, l) {
			q(o, t, l), k(t, n);
		},
		p: N,
		d(o) {
			o && y(t);
		}
	};
}
function Yt(e) {
	let t;
	const n = e[3].address,
		o = G(n, e, e[15], it),
		l =
			o ||
			(function (c) {
				let s, i, d;
				function u(a) {
					c[11](a);
				}
				let r = {};
				return (
					c[0].address !== void 0 && (r.item = c[0].address),
					(s = new o1({ props: r })),
					D.push(() => n1(s, 'item', u)),
					{
						c() {
							A(s.$$.fragment);
						},
						m(a, p) {
							H(s, a, p), (d = !0);
						},
						p(a, p) {
							const f = {};
							!i && 1 & p && ((i = !0), (f.item = a[0].address), e1(() => (i = !1))), s.$set(f);
						},
						i(a) {
							d || (x(s.$$.fragment, a), (d = !0));
						},
						o(a) {
							g(s.$$.fragment, a), (d = !1);
						},
						d(a) {
							E(s, a);
						}
					}
				);
			})(e);
	return {
		c() {
			l && l.c();
		},
		m(c, s) {
			l && l.m(c, s), (t = !0);
		},
		p(c, s) {
			o
				? o.p && (!t || 32768 & s) && Q(o, n, c, c[15], t ? I(n, c[15], s, Qt) : J(c[15]), it)
				: l && l.p && (!t || 1 & s) && l.p(c, t ? s : -1);
		},
		i(c) {
			t || (x(l, c), (t = !0));
		},
		o(c) {
			g(l, c), (t = !1);
		},
		d(c) {
			l && l.d(c);
		}
	};
}
function t0(e) {
	let t;
	const n = e[3].email,
		o = G(n, e, e[15], st),
		l =
			o ||
			(function (c) {
				let s, i, d;
				function u(a) {
					c[12](a);
				}
				let r = {};
				return (
					c[0].email !== void 0 && (r.item = c[0].email),
					(s = new o1({ props: r })),
					D.push(() => n1(s, 'item', u)),
					{
						c() {
							A(s.$$.fragment);
						},
						m(a, p) {
							H(s, a, p), (d = !0);
						},
						p(a, p) {
							const f = {};
							!i && 1 & p && ((i = !0), (f.item = a[0].email), e1(() => (i = !1))), s.$set(f);
						},
						i(a) {
							d || (x(s.$$.fragment, a), (d = !0));
						},
						o(a) {
							g(s.$$.fragment, a), (d = !1);
						},
						d(a) {
							E(s, a);
						}
					}
				);
			})(e);
	return {
		c() {
			l && l.c();
		},
		m(c, s) {
			l && l.m(c, s), (t = !0);
		},
		p(c, s) {
			o
				? o.p && (!t || 32768 & s) && Q(o, n, c, c[15], t ? I(n, c[15], s, It) : J(c[15]), st)
				: l && l.p && (!t || 1 & s) && l.p(c, t ? s : -1);
		},
		i(c) {
			t || (x(l, c), (t = !0));
		},
		o(c) {
			g(l, c), (t = !1);
		},
		d(c) {
			l && l.d(c);
		}
	};
}
function e0(e) {
	let t;
	const n = e[3].phone,
		o = G(n, e, e[15], ct),
		l =
			o ||
			(function (c) {
				let s, i, d;
				function u(a) {
					c[13](a);
				}
				let r = {};
				return (
					c[0].phone !== void 0 && (r.item = c[0].phone),
					(s = new o1({ props: r })),
					D.push(() => n1(s, 'item', u)),
					{
						c() {
							A(s.$$.fragment);
						},
						m(a, p) {
							H(s, a, p), (d = !0);
						},
						p(a, p) {
							const f = {};
							!i && 1 & p && ((i = !0), (f.item = a[0].phone), e1(() => (i = !1))), s.$set(f);
						},
						i(a) {
							d || (x(s.$$.fragment, a), (d = !0));
						},
						o(a) {
							g(s.$$.fragment, a), (d = !1);
						},
						d(a) {
							E(s, a);
						}
					}
				);
			})(e);
	return {
		c() {
			l && l.c();
		},
		m(c, s) {
			l && l.m(c, s), (t = !0);
		},
		p(c, s) {
			o
				? o.p && (!t || 32768 & s) && Q(o, n, c, c[15], t ? I(n, c[15], s, Gt) : J(c[15]), ct)
				: l && l.p && (!t || 1 & s) && l.p(c, t ? s : -1);
		},
		i(c) {
			t || (x(l, c), (t = !0));
		},
		o(c) {
			g(l, c), (t = !1);
		},
		d(c) {
			l && l.d(c);
		}
	};
}
function n0(e) {
	let t, n, o, l, c, s, i, d, u, r, a, p, f, C, v, b, z, M, K, W, V, L1, T1;
	function D1(m, w) {
		return m[0].avatar ? Wt : Xt;
	}
	(o = new Kt({})), o.$on('change', e[4]);
	let w1 = D1(e),
		O = w1(e);
	const _1 = e[3].name,
		v1 = G(_1, e, e[15], rt),
		S =
			v1 ||
			(function (m) {
				let w, B, T, L, r1, X;
				function P(j) {
					m[9](j);
				}
				let Y = {};
				function $1(j) {
					m[10](j);
				}
				m[0].firstName !== void 0 && (Y.item = m[0].firstName),
					(w = new o1({ props: Y })),
					D.push(() => n1(w, 'item', P));
				let F1 = {};
				return (
					m[0].lastName !== void 0 && (F1.item = m[0].lastName),
					(L = new o1({ props: F1 })),
					D.push(() => n1(L, 'item', $1)),
					{
						c() {
							A(w.$$.fragment), (T = _()), A(L.$$.fragment);
						},
						m(j, t1) {
							H(w, j, t1), q(j, T, t1), H(L, j, t1), (X = !0);
						},
						p(j, t1) {
							const K1 = {};
							!B && 1 & t1 && ((B = !0), (K1.item = j[0].firstName), e1(() => (B = !1))),
								w.$set(K1);
							const U1 = {};
							!r1 && 1 & t1 && ((r1 = !0), (U1.item = j[0].lastName), e1(() => (r1 = !1))),
								L.$set(U1);
						},
						i(j) {
							X || (x(w.$$.fragment, j), x(L.$$.fragment, j), (X = !0));
						},
						o(j) {
							g(w.$$.fragment, j), g(L.$$.fragment, j), (X = !1);
						},
						d(j) {
							E(w, j), j && y(T), E(L, j);
						}
					}
				);
			})(e);
	(a = new f1({ props: { name: 'address', $$slots: { default: [Yt] }, $$scope: { ctx: e } } })),
		(f = new f1({ props: { name: 'email', $$slots: { default: [t0] }, $$scope: { ctx: e } } })),
		(v = new f1({ props: { name: 'phone', $$slots: { default: [e0] }, $$scope: { ctx: e } } }));
	const B1 = e[3].default,
		x1 = G(B1, e, e[15], null),
		Z =
			x1 ||
			(function (m) {
				let w, B, T, L;
				function r1(P) {
					m[14](P);
				}
				let X = { options: { singleLine: !1 } };
				return (
					m[0].notes !== void 0 && (X.item = m[0].notes),
					(B = new o1({ props: X })),
					D.push(() => n1(B, 'item', r1)),
					{
						c() {
							(w = $('span')), A(B.$$.fragment), h(w, 'class', 'text-sky-500 svelte-weoqwc');
						},
						m(P, Y) {
							q(P, w, Y), H(B, w, null), (L = !0);
						},
						p(P, Y) {
							const $1 = {};
							!T && 1 & Y && ((T = !0), ($1.item = P[0].notes), e1(() => (T = !1))), B.$set($1);
						},
						i(P) {
							L || (x(B.$$.fragment, P), (L = !0));
						},
						o(P) {
							g(B.$$.fragment, P), (L = !1);
						},
						d(P) {
							P && y(w), E(B);
						}
					}
				);
			})(e);
	return {
		c() {
			(t = $('div')),
				(n = $('div')),
				A(o.$$.fragment),
				(l = _()),
				(c = $('input')),
				(s = _()),
				(i = $('div')),
				O.c(),
				(d = _()),
				(u = $('div')),
				S && S.c(),
				(r = _()),
				A(a.$$.fragment),
				(p = _()),
				A(f.$$.fragment),
				(C = _()),
				A(v.$$.fragment),
				(b = _()),
				(z = $('blockquote')),
				(M = $('p')),
				Z && Z.c(),
				(K = _()),
				(W = $('footer')),
				(W.textContent = 'Powered by PeerPiper'),
				h(n, 'class', 'h-24 bg-white svelte-weoqwc'),
				p1(c, 'display', 'none'),
				h(c, 'type', 'file'),
				h(c, 'accept', '.jpg, .jpeg, .png'),
				h(i, 'class', '-mt-20 h-32 flex justify-center svelte-weoqwc'),
				h(u, 'class', 'mt-5 mb-7 px-3 text-center text-xl svelte-weoqwc'),
				h(M, 'class', 'mx-2 mb-7 text-center text-base svelte-weoqwc'),
				h(W, 'class', 'text-center bg-green-400 text-white svelte-weoqwc'),
				h(
					t,
					'class',
					'm-auto text-neutral-800 fill-slate-500 my-2 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl svelte-weoqwc'
				);
		},
		m(m, w) {
			q(m, t, w),
				k(t, n),
				H(o, n, null),
				k(t, l),
				k(t, c),
				e[6](c),
				k(t, s),
				k(t, i),
				O.m(i, null),
				k(t, d),
				k(t, u),
				S && S.m(u, null),
				k(t, r),
				H(a, t, null),
				k(t, p),
				H(f, t, null),
				k(t, C),
				H(v, t, null),
				k(t, b),
				k(t, z),
				k(z, M),
				Z && Z.m(M, null),
				k(t, K),
				k(t, W),
				(V = !0),
				L1 ||
					((T1 = [R(c, 'change', e[5]), R(i, 'keypress', e[7]), R(i, 'click', e[8])]), (L1 = !0));
		},
		p(m, [w]) {
			w1 === (w1 = D1(m)) && O ? O.p(m, w) : (O.d(1), (O = w1(m)), O && (O.c(), O.m(i, null))),
				v1
					? v1.p && (!V || 32768 & w) && Q(v1, _1, m, m[15], V ? I(_1, m[15], w, Jt) : J(m[15]), rt)
					: S && S.p && (!V || 1 & w) && S.p(m, V ? w : -1);
			const B = {};
			32769 & w && (B.$$scope = { dirty: w, ctx: m }), a.$set(B);
			const T = {};
			32769 & w && (T.$$scope = { dirty: w, ctx: m }), f.$set(T);
			const L = {};
			32769 & w && (L.$$scope = { dirty: w, ctx: m }),
				v.$set(L),
				x1
					? x1.p &&
					  (!V || 32768 & w) &&
					  Q(x1, B1, m, m[15], V ? I(B1, m[15], w, null) : J(m[15]), null)
					: Z && Z.p && (!V || 1 & w) && Z.p(m, V ? w : -1);
		},
		i(m) {
			V ||
				(x(o.$$.fragment, m),
				x(S, m),
				x(a.$$.fragment, m),
				x(f.$$.fragment, m),
				x(v.$$.fragment, m),
				x(Z, m),
				(V = !0));
		},
		o(m) {
			g(o.$$.fragment, m),
				g(S, m),
				g(a.$$.fragment, m),
				g(f.$$.fragment, m),
				g(v.$$.fragment, m),
				g(Z, m),
				(V = !1);
		},
		d(m) {
			m && y(t),
				E(o),
				e[6](null),
				O.d(),
				S && S.d(m),
				E(a),
				E(f),
				E(v),
				Z && Z.d(m),
				(L1 = !1),
				F(T1);
		}
	};
}
function o0(e, t, n) {
	let { $$slots: o = {}, $$scope: l } = t;
	const c = Z1();
	let s,
		i = {
			firstName: 'FirstName',
			lastName: 'Lastname',
			address: 'Unknown address',
			email: 'Unknown email',
			phone: 'No phone',
			notes: 'No notes',
			avatar: null
		},
		{ profile: d = i } = t;
	const u = (r) => {
		let a = r.target.files[0],
			p = new FileReader();
		p.readAsDataURL(a),
			(p.onload = (f) => {
				n(0, (d.avatar = f.target.result), d);
			});
	};
	return (
		(e.$$set = (r) => {
			'profile' in r && n(0, (d = r.profile)), '$$scope' in r && n(15, (l = r.$$scope));
		}),
		(e.$$.update = () => {
			1 & e.$$.dirty && d && (n(0, (d = Object.assign({}, i, d))), c('change', { profile: d }));
		}),
		[
			d,
			s,
			u,
			o,
			function (r) {
				xt.call(this, e, r);
			},
			(r) => u(r),
			function (r) {
				D[r ? 'unshift' : 'push'](() => {
					(s = r), n(1, s);
				});
			},
			() => {
				s.click();
			},
			() => {
				s.click();
			},
			function (r) {
				e.$$.not_equal(d.firstName, r) && ((d.firstName = r), n(0, d), n(17, i));
			},
			function (r) {
				e.$$.not_equal(d.lastName, r) && ((d.lastName = r), n(0, d), n(17, i));
			},
			function (r) {
				e.$$.not_equal(d.address, r) && ((d.address = r), n(0, d), n(17, i));
			},
			function (r) {
				e.$$.not_equal(d.email, r) && ((d.email = r), n(0, d), n(17, i));
			},
			function (r) {
				e.$$.not_equal(d.phone, r) && ((d.phone = r), n(0, d), n(17, i));
			},
			function (r) {
				e.$$.not_equal(d.notes, r) && ((d.notes = r), n(0, d), n(17, i));
			},
			l
		]
	);
}
class l0 extends i1 {
	constructor(t) {
		super(), s1(this, t, o0, n0, c1, { profile: 0 }, Ut);
	}
}
export { l0 as default };
