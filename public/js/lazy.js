/*!
  [be]Lazy.js - v1.1.3 - 2014.01.21
  A lazy loading and multi-serving image script
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
/*=== lazyLoading ===*/
window.addEventListener('load', function() {
	var bLazy = new Blazy();
}, false);

var Blazy = function(c, h) {
	function g(b) {
		if (!h.querySelectorAll) {
			var d = h.createStyleSheet();
			h.querySelectorAll = function(b, a, c, e, g) {
				g = h.all;
				a = [];
				b = b.replace(/\[for\b/gi, "[htmlFor").split(",");
				for (c = b.length; c--;) {
					d.addRule(b[c], "k:v");
					for (e = g.length; e--;) g[e].currentStyle.k && a.push(g[e]);
					d.removeRule(0);
				}
				return a;
			}
		}
		a = b || {};
		a.src = a.src || "data-src";
		a.multi = a.multi || !1;
		a.error = a.error || !1;
		a.offset = a.offset || 100;
		a.success = a.success || !1;
		a.selector = a.selector || ".b-lazy";
		a.separator = a.separator || "|";
		a.container = a.container ? h.querySelectorAll(a.container) : !1;
		a.errorClass = a.errorClass || "b-error";
		a.successClass = a.successClass || "b-loaded";
		q = a.src;
		u = 1 < c.devicePixelRatio;
		e = v(w, 20);
		r = v(x, 50);
		x();
		l(a.multi, function(b) {
			if (b.width >= c.screen.width) return q = b.src, !1
		});
		y()
	}

	function w() {
		for (var b = 0; b < k; b++) {
			var d = m[b],
				t = -1 !== (" " + d.className + " ").indexOf(" " + a.successClass + " "),
				f = d.getBoundingClientRect(),
				c = z + a.offset;
			if (0 <= f.left && f.right <= A + a.offset && (0 <= f.top && f.top <= c || f.bottom <= c && f.bottom >= 0 - a.offset) || t) t || B(d), m.splice(b, 1), k--, b--
		}
		0 === k && g.prototype.destroy()
	}

	function B(b) {
		if (0 < b.offsetWidth && 0 < b.offsetHeight) {
			var d = b.getAttribute(q) || b.getAttribute(a.src);
			if (d) {
				var d = d.split(a.separator),
					c = d[u && 1 < d.length ? 1 : 0],
					d = new Image;
				l(a.multi, function(a) {
					b.removeAttribute(a.src)
				});
				b.removeAttribute(a.src);
				d.onerror = function() {
					a.error && a.error(b, "invalid");
					b.className = b.className + " " + a.errorClass
				};
				d.onload = function() {
					"img" === b.nodeName.toLowerCase() ? b.src = c : b.setAttribute("style", 'background-image: url("' + c + '");');
					b.className = b.className + " " + a.successClass;
					a.success && a.success(b)
				};
				d.src = c
			} else a.error && a.error(b, "missing"), b.className = b.className + " " + a.errorClass
		}
	}

	function C(b) {
		b = h.querySelectorAll(b);
		for (var a = k = b.length; a--; m.unshift(b[a]));
	}

	function x() {
		var b = h.documentElement;
		z = c.innerHeight || b.clientHeight;
		A = c.innerWidth || b.clientWidth
	}

	function y() {
		C(a.selector);
		s && (s = !1, a.container && l(a.container, function(b) {
			n(b, "scroll", e)
		}), n(c, "scroll", e), n(c, "resize", e), n(c, "resize", r));
		w()
	}

	function n(b, a, c) {
		b.attachEvent ? b.attachEvent && b.attachEvent("on" + a, c) : b.addEventListener(a, c, !1)
	}

	function p(b, a, c) {
		b.detachEvent ? b.detachEvent && b.detachEvent("on" + a, c) : b.removeEventListener(a, c, !1)
	}

	function l(b, a) {
		if (b && a)
			for (var c = b.length, f = 0; f < c && !1 !== a(b[f], f); f++);
	}

	function v(a, c) {
		var e = 0;
		return function() {
			var f = +new Date;
			f - e < c || (e = f, a.apply(this, arguments))
		}
	}
	var q, a, A, z, u, s = !0,
		k = 0,
		m = [],
		e, r;
	g.prototype.revalidate = function() {
		y()
	};
	g.prototype.load = function(b) {
		-1 === (" " + b.className + " ").indexOf(" " + a.successClass + " ") && B(b)
	};
	g.prototype.destroy = function() {
		a.container && l(a.container, function(a) {
			p(a, "scroll", e)
		});
		p(c, "scroll", e);
		p(c, "resize", e);
		p(c, "resize", r);
		k = 0;
		m.length = 0;
		s = !0
	};
	return g
}(window, document);