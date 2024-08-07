!function() {
    function i(e) {
        return e && (e.ownerDocument || e.document).documentElement
    }
    function s(e) {
        return e && e.ownerDocument ? e.ownerDocument.defaultView : e
    }
    function p(e, t) {
        return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
    }
    function d(e) {
        return e === null ? NaN : +e
    }
    function v(e) {
        return !isNaN(e)
    }
    function m(e) {
        return {
            left: function(t, n, r, i) {
                arguments.length < 3 && (r = 0),
                arguments.length < 4 && (i = t.length);
                while (r < i) {
                    var s = r + i >>> 1;
                    e(t[s], n) < 0 ? r = s + 1 : i = s
                }
                return r
            },
            right: function(t, n, r, i) {
                arguments.length < 3 && (r = 0),
                arguments.length < 4 && (i = t.length);
                while (r < i) {
                    var s = r + i >>> 1;
                    e(t[s], n) > 0 ? i = s : r = s + 1
                }
                return r
            }
        }
    }
    function y(e) {
        return e.length
    }
    function w(e) {
        var t = 1;
        while (e * t % 1)
            t *= 10;
        return t
    }
    function E(e, t) {
        for (var n in t)
            Object.defineProperty(e.prototype, n, {
                value: t[n],
                enumerable: !1
            })
    }
    function S() {
        this._ = Object.create(null)
    }
    function N(e) {
        return (e += "") === x || e[0] === T ? T + e : e
    }
    function C(e) {
        return (e += "")[0] === T ? e.slice(1) : e
    }
    function k(e) {
        return N(e)in this._
    }
    function L(e) {
        return (e = N(e))in this._ && delete this._[e]
    }
    function A() {
        var e = [];
        for (var t in this._)
            e.push(C(t));
        return e
    }
    function O() {
        var e = 0;
        for (var t in this._)
            ++e;
        return e
    }
    function M() {
        for (var e in this._)
            return !1;
        return !0
    }
    function _() {
        this._ = Object.create(null)
    }
    function D(e) {
        return e
    }
    function P(e, t, n) {
        return function() {
            var r = n.apply(t, arguments);
            return r === t ? e : r
        }
    }
    function H(e, t) {
        if (t in e)
            return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var n = 0, r = B.length; n < r; ++n) {
            var i = B[n] + t;
            if (i in e)
                return i
        }
    }
    function j() {}
    function F() {}
    function I(e) {
        function r() {
            var n = t, r = -1, i = n.length, s;
            while (++r < i)
                (s = n[r].on) && s.apply(this, arguments);
            return e
        }
        var t = []
          , n = new S;
        return r.on = function(r, i) {
            var s = n.get(r), o;
            return arguments.length < 2 ? s && s.on : (s && (s.on = null,
            t = t.slice(0, o = t.indexOf(s)).concat(t.slice(o + 1)),
            n.remove(r)),
            i && t.push(n.set(r, {
                on: i
            })),
            e)
        }
        ,
        r
    }
    function q() {
        e.event.preventDefault()
    }
    function R() {
        var t = e.event, n;
        while (n = t.sourceEvent)
            t = n;
        return t
    }
    function U(t) {
        var n = new F
          , r = 0
          , i = arguments.length;
        while (++r < i)
            n[arguments[r]] = I(n);
        return n.of = function(r, i) {
            return function(s) {
                try {
                    var o = s.sourceEvent = e.event;
                    s.target = t,
                    e.event = s,
                    n[s.type].apply(r, i)
                } finally {
                    e.event = o
                }
            }
        }
        ,
        n
    }
    function X(e) {
        return W(e, K),
        e
    }
    function Q(e) {
        return typeof e == "function" ? e : function() {
            return V(e, this)
        }
    }
    function G(e) {
        return typeof e == "function" ? e : function() {
            return $(e, this)
        }
    }
    function Z(t, n) {
        function r() {
            this.removeAttribute(t)
        }
        function i() {
            this.removeAttributeNS(t.space, t.local)
        }
        function s() {
            this.setAttribute(t, n)
        }
        function o() {
            this.setAttributeNS(t.space, t.local, n)
        }
        function u() {
            var e = n.apply(this, arguments);
            e == null ? this.removeAttribute(t) : this.setAttribute(t, e)
        }
        function a() {
            var e = n.apply(this, arguments);
            e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
        }
        return t = e.ns.qualify(t),
        n == null ? t.local ? i : r : typeof n == "function" ? t.local ? a : u : t.local ? o : s
    }
    function et(e) {
        return e.trim().replace(/\s+/g, " ")
    }
    function tt(t) {
        return new RegExp("(?:^|\\s+)" + e.requote(t) + "(?:\\s+|$)","g")
    }
    function nt(e) {
        return (e + "").trim().split(/^|\s+/)
    }
    function rt(e, t) {
        function r() {
            var r = -1;
            while (++r < n)
                e[r](this, t)
        }
        function i() {
            var r = -1
              , i = t.apply(this, arguments);
            while (++r < n)
                e[r](this, i)
        }
        e = nt(e).map(it);
        var n = e.length;
        return typeof t == "function" ? i : r
    }
    function it(e) {
        var t = tt(e);
        return function(n, r) {
            if (i = n.classList)
                return r ? i.add(e) : i.remove(e);
            var i = n.getAttribute("class") || "";
            r ? (t.lastIndex = 0,
            t.test(i) || n.setAttribute("class", et(i + " " + e))) : n.setAttribute("class", et(i.replace(t, " ")))
        }
    }
    function st(e, t, n) {
        function r() {
            this.style.removeProperty(e)
        }
        function i() {
            this.style.setProperty(e, t, n)
        }
        function s() {
            var r = t.apply(this, arguments);
            r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n)
        }
        return t == null ? r : typeof t == "function" ? s : i
    }
    function ot(e, t) {
        function n() {
            delete this[e]
        }
        function r() {
            this[e] = t
        }
        function i() {
            var n = t.apply(this, arguments);
            n == null ? delete this[e] : this[e] = n
        }
        return t == null ? n : typeof t == "function" ? i : r
    }
    function ut(t) {
        function n() {
            var e = this.ownerDocument
              , n = this.namespaceURI;
            return n ? e.createElementNS(n, t) : e.createElement(t)
        }
        function r() {
            return this.ownerDocument.createElementNS(t.space, t.local)
        }
        return typeof t == "function" ? t : (t = e.ns.qualify(t)).local ? r : n
    }
    function at() {
        var e = this.parentNode;
        e && e.removeChild(this)
    }
    function ft(e) {
        return {
            __data__: e
        }
    }
    function lt(e) {
        return function() {
            return J(this, e)
        }
    }
    function ct(e) {
        return arguments.length || (e = p),
        function(t, n) {
            return t && n ? e(t.__data__, n.__data__) : !t - !n
        }
    }
    function ht(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            for (var i = e[n], s = 0, o = i.length, u; s < o; s++)
                (u = i[s]) && t(u, s, n);
        return e
    }
    function pt(e) {
        return W(e, dt),
        e
    }
    function vt(e) {
        var t, n;
        return function(r, i, s) {
            var o = e[s].update, u = o.length, a;
            s != n && (n = s,
            t = 0),
            i >= t && (t = i + 1);
            while (!(a = o[t]) && ++t < u)
                ;
            return a
        }
    }
    function mt(t, r, i) {
        function f() {
            var e = this[s];
            e && (this.removeEventListener(t, e, e.$),
            delete this[s])
        }
        function l() {
            var e = u(r, n(arguments));
            f.call(this),
            this.addEventListener(t, this[s] = e, e.$ = i),
            e._ = r
        }
        function c() {
            var n = new RegExp("^__on([^.]+)" + e.requote(t) + "$"), r;
            for (var i in this)
                if (r = i.match(n)) {
                    var s = this[i];
                    this.removeEventListener(r[1], s, s.$),
                    delete this[i]
                }
        }
        var s = "__on" + t
          , o = t.indexOf(".")
          , u = yt;
        o > 0 && (t = t.slice(0, o));
        var a = gt.get(t);
        return a && (t = a,
        u = bt),
        o ? r ? l : f : r ? j : c
    }
    function yt(t, n) {
        return function(r) {
            var i = e.event;
            e.event = r,
            n[0] = this.__data__;
            try {
                t.apply(this, n)
            } finally {
                e.event = i
            }
        }
    }
    function bt(e, t) {
        var n = yt(e, t);
        return function(e) {
            var t = this
              , r = e.relatedTarget;
            (!r || r !== t && !(r.compareDocumentPosition(t) & 8)) && n.call(t, e)
        }
    }
    function St(t) {
        var n = ".dragsuppress-" + ++Et
          , r = "click" + n
          , o = e.select(s(t)).on("touchmove" + n, q).on("dragstart" + n, q).on("selectstart" + n, q);
        wt == null && (wt = "onselectstart"in t ? !1 : H(t.style, "userSelect"));
        if (wt) {
            var u = i(t).style
              , a = u[wt];
            u[wt] = "none"
        }
        return function(e) {
            o.on(n, null),
            wt && (u[wt] = a);
            if (e) {
                var t = function() {
                    o.on(r, null)
                };
                o.on(r, function() {
                    q(),
                    t()
                }, !0),
                setTimeout(t, 0)
            }
        }
    }
    function Tt(t, n) {
        n.changedTouches && (n = n.changedTouches[0]);
        var r = t.ownerSVGElement || t;
        if (r.createSVGPoint) {
            var i = r.createSVGPoint();
            if (xt < 0) {
                var o = s(t);
                if (o.scrollX || o.scrollY) {
                    r = e.select("body").append("svg").style({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                        border: "none"
                    }, "important");
                    var u = r[0][0].getScreenCTM();
                    xt = !u.f && !u.e,
                    r.remove()
                }
            }
            return xt ? (i.x = n.pageX,
            i.y = n.pageY) : (i.x = n.clientX,
            i.y = n.clientY),
            i = i.matrixTransform(t.getScreenCTM().inverse()),
            [i.x, i.y]
        }
        var a = t.getBoundingClientRect();
        return [n.clientX - a.left - t.clientLeft, n.clientY - a.top - t.clientTop]
    }
    function Nt() {
        return e.event.changedTouches[0].identifier
    }
    function Pt(e) {
        return e > 0 ? 1 : e < 0 ? -1 : 0
    }
    function Ht(e, t, n) {
        return (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0])
    }
    function Bt(e) {
        return e > 1 ? 0 : e < -1 ? Lt : Math.acos(e)
    }
    function jt(e) {
        return e > 1 ? Mt : e < -1 ? -Mt : Math.asin(e)
    }
    function Ft(e) {
        return ((e = Math.exp(e)) - 1 / e) / 2
    }
    function It(e) {
        return ((e = Math.exp(e)) + 1 / e) / 2
    }
    function qt(e) {
        return ((e = Math.exp(2 * e)) - 1) / (e + 1)
    }
    function Rt(e) {
        return (e = Math.sin(e / 2)) * e
    }
    function Jt() {}
    function Kt(e, t, n) {
        return this instanceof Kt ? void (this.h = +e,
        this.s = +t,
        this.l = +n) : arguments.length < 2 ? e instanceof Kt ? new Kt(e.h,e.s,e.l) : yn("" + e, bn, Kt) : new Kt(e,t,n)
    }
    function Gt(e, t, n) {
        function s(e) {
            return e > 360 ? e -= 360 : e < 0 && (e += 360),
            e < 60 ? r + (i - r) * e / 60 : e < 180 ? i : e < 240 ? r + (i - r) * (240 - e) / 60 : r
        }
        function o(e) {
            return Math.round(s(e) * 255)
        }
        var r, i;
        return e = isNaN(e) ? 0 : (e %= 360) < 0 ? e + 360 : e,
        t = isNaN(t) ? 0 : t < 0 ? 0 : t > 1 ? 1 : t,
        n = n < 0 ? 0 : n > 1 ? 1 : n,
        i = n <= .5 ? n * (1 + t) : n + t - n * t,
        r = 2 * n - i,
        new pn(o(e + 120),o(e),o(e - 120))
    }
    function Yt(t, n, r) {
        return this instanceof Yt ? void (this.h = +t,
        this.c = +n,
        this.l = +r) : arguments.length < 2 ? t instanceof Yt ? new Yt(t.h,t.c,t.l) : t instanceof tn ? fn(t.l, t.a, t.b) : fn((t = wn((t = e.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : new Yt(t,n,r)
    }
    function en(e, t, n) {
        return isNaN(e) && (e = 0),
        isNaN(t) && (t = 0),
        new tn(n,Math.cos(e *= _t) * t,Math.sin(e) * t)
    }
    function tn(e, t, n) {
        return this instanceof tn ? void (this.l = +e,
        this.a = +t,
        this.b = +n) : arguments.length < 2 ? e instanceof tn ? new tn(e.l,e.a,e.b) : e instanceof Yt ? en(e.h, e.c, e.l) : wn((e = pn(e)).r, e.g, e.b) : new tn(e,t,n)
    }
    function an(e, t, n) {
        var r = (e + 16) / 116
          , i = r + t / 500
          , s = r - n / 200;
        return i = ln(i) * rn,
        r = ln(r) * sn,
        s = ln(s) * on,
        new pn(hn(3.2404542 * i - 1.5371385 * r - .4985314 * s),hn(-0.969266 * i + 1.8760108 * r + .041556 * s),hn(.0556434 * i - .2040259 * r + 1.0572252 * s))
    }
    function fn(e, t, n) {
        return e > 0 ? new Yt(Math.atan2(n, t) * Dt,Math.sqrt(t * t + n * n),e) : new Yt(NaN,NaN,e)
    }
    function ln(e) {
        return e > .206893034 ? e * e * e : (e - 4 / 29) / 7.787037
    }
    function cn(e) {
        return e > .008856 ? Math.pow(e, 1 / 3) : 7.787037 * e + 4 / 29
    }
    function hn(e) {
        return Math.round(255 * (e <= .00304 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - .055))
    }
    function pn(e, t, n) {
        return this instanceof pn ? void (this.r = ~~e,
        this.g = ~~t,
        this.b = ~~n) : arguments.length < 2 ? e instanceof pn ? new pn(e.r,e.g,e.b) : yn("" + e, pn, Gt) : new pn(e,t,n)
    }
    function dn(e) {
        return new pn(e >> 16,e >> 8 & 255,e & 255)
    }
    function vn(e) {
        return dn(e) + ""
    }
    function gn(e) {
        return e < 16 ? "0" + Math.max(0, e).toString(16) : Math.min(255, e).toString(16)
    }
    function yn(e, t, n) {
        var r = 0, i = 0, s = 0, o, u, a;
        o = /([a-z]+)\((.*)\)/i.exec(e);
        if (o) {
            u = o[2].split(",");
            switch (o[1]) {
            case "hsl":
                return n(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100);
            case "rgb":
                return t(Sn(u[0]), Sn(u[1]), Sn(u[2]))
            }
        }
        return (a = xn.get(e.toLowerCase())) ? t(a.r, a.g, a.b) : (e != null && e.charAt(0) === "#" && !isNaN(a = parseInt(e.slice(1), 16)) && (e.length === 4 ? (r = (a & 3840) >> 4,
        r = r >> 4 | r,
        i = a & 240,
        i = i >> 4 | i,
        s = a & 15,
        s = s << 4 | s) : e.length === 7 && (r = (a & 16711680) >> 16,
        i = (a & 65280) >> 8,
        s = a & 255)),
        t(r, i, s))
    }
    function bn(e, t, n) {
        var r = Math.min(e /= 255, t /= 255, n /= 255), i = Math.max(e, t, n), s = i - r, o, u, a = (i + r) / 2;
        return s ? (u = a < .5 ? s / (i + r) : s / (2 - i - r),
        e == i ? o = (t - n) / s + (t < n ? 6 : 0) : t == i ? o = (n - e) / s + 2 : o = (e - t) / s + 4,
        o *= 60) : (o = NaN,
        u = a > 0 && a < 1 ? 0 : o),
        new Kt(o,u,a)
    }
    function wn(e, t, n) {
        e = En(e),
        t = En(t),
        n = En(n);
        var r = cn((.4124564 * e + .3575761 * t + .1804375 * n) / rn)
          , i = cn((.2126729 * e + .7151522 * t + .072175 * n) / sn)
          , s = cn((.0193339 * e + .119192 * t + .9503041 * n) / on);
        return tn(116 * i - 16, 500 * (r - i), 200 * (i - s))
    }
    function En(e) {
        return (e /= 255) <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
    }
    function Sn(e) {
        var t = parseFloat(e);
        return e.charAt(e.length - 1) === "%" ? Math.round(t * 2.55) : t
    }
    function Tn(e) {
        return typeof e == "function" ? e : function() {
            return e
        }
    }
    function Nn(e) {
        return function(t, n, r) {
            return arguments.length === 2 && typeof n == "function" && (r = n,
            n = null),
            Cn(t, n, e, r)
        }
    }
    function Cn(t, r, i, s) {
        function c() {
            var e = f.status, t;
            if (!e && Ln(f) || e >= 200 && e < 300 || e === 304) {
                try {
                    t = i.call(o, f)
                } catch (n) {
                    u.error.call(o, n);
                    return
                }
                u.load.call(o, t)
            } else
                u.error.call(o, f)
        }
        var o = {}
          , u = e.dispatch("beforesend", "progress", "load", "error")
          , a = {}
          , f = new XMLHttpRequest
          , l = null;
        return this.XDomainRequest && !("withCredentials"in f) && /^(http(s)?:)?\/\//.test(t) && (f = new XDomainRequest),
        "onload"in f ? f.onload = f.onerror = c : f.onreadystatechange = function() {
            f.readyState > 3 && c()
        }
        ,
        f.onprogress = function(t) {
            var n = e.event;
            e.event = t;
            try {
                u.progress.call(o, f)
            } finally {
                e.event = n
            }
        }
        ,
        o.header = function(e, t) {
            return e = (e + "").toLowerCase(),
            arguments.length < 2 ? a[e] : (t == null ? delete a[e] : a[e] = t + "",
            o)
        }
        ,
        o.mimeType = function(e) {
            return arguments.length ? (r = e == null ? null : e + "",
            o) : r
        }
        ,
        o.responseType = function(e) {
            return arguments.length ? (l = e,
            o) : l
        }
        ,
        o.response = function(e) {
            return i = e,
            o
        }
        ,
        ["get", "post"].forEach(function(e) {
            o[e] = function() {
                return o.send.apply(o, [e].concat(n(arguments)))
            }
        }),
        o.send = function(e, n, i) {
            arguments.length === 2 && typeof n == "function" && (i = n,
            n = null),
            f.open(e, t, !0),
            r != null && !("accept"in a) && (a.accept = r + ",*/*");
            if (f.setRequestHeader)
                for (var s in a)
                    f.setRequestHeader(s, a[s]);
            return r != null && f.overrideMimeType && f.overrideMimeType(r),
            l != null && (f.responseType = l),
            i != null && o.on("error", i).on("load", function(e) {
                i(null, e)
            }),
            u.beforesend.call(o, f),
            f.send(n == null ? null : n),
            o
        }
        ,
        o.abort = function() {
            return f.abort(),
            o
        }
        ,
        e.rebind(o, u, "on"),
        s == null ? o : o.get(kn(s))
    }
    function kn(e) {
        return e.length === 1 ? function(t, n) {
            e(t == null ? n : null)
        }
        : e
    }
    function Ln(e) {
        var t = e.responseType;
        return t && t !== "text" ? e.response : e.responseText
    }
    function Hn() {
        var e = Bn()
          , t = jn() - e;
        t > 24 ? (isFinite(t) && (clearTimeout(_n),
        _n = setTimeout(Hn, t)),
        Mn = 0) : (Mn = 1,
        Pn(Hn))
    }
    function Bn() {
        var e = Date.now();
        Dn = An;
        while (Dn)
            e >= Dn.t && (Dn.f = Dn.c(e - Dn.t)),
            Dn = Dn.n;
        return e
    }
    function jn() {
        var e, t = An, n = Infinity;
        while (t)
            t.f ? t = e ? e.n = t.n : An = t.n : (t.t < n && (n = t.t),
            t = (e = t).n);
        return On = e,
        n
    }
    function Fn(e, t) {
        return t - (e ? Math.ceil(Math.log(e) / Math.LN10) : 1)
    }
    function qn(e, t) {
        var n = Math.pow(10, b(8 - t) * 3);
        return {
            scale: t > 8 ? function(e) {
                return e / n
            }
            : function(e) {
                return e * n
            }
            ,
            symbol: e
        }
    }
    function Rn(t) {
        var n = t.decimal
          , r = t.thousands
          , i = t.grouping
          , s = t.currency
          , o = i && r ? function(e, t) {
            var n = e.length
              , s = []
              , o = 0
              , u = i[0]
              , a = 0;
            while (n > 0 && u > 0) {
                a + u + 1 > t && (u = Math.max(1, t - a)),
                s.push(e.substring(n -= u, n + u));
                if ((a += u + 1) > t)
                    break;
                u = i[o = (o + 1) % i.length]
            }
            return s.reverse().join(r)
        }
        : D;
        return function(t) {
            var r = Un.exec(t)
              , i = r[1] || " "
              , u = r[2] || ">"
              , a = r[3] || "-"
              , f = r[4] || ""
              , l = r[5]
              , c = +r[6]
              , h = r[7]
              , p = r[8]
              , d = r[9]
              , v = 1
              , m = ""
              , g = ""
              , y = !1
              , b = !0;
            p && (p = +p.substring(1));
            if (l || i === "0" && u === "=")
                l = i = "0",
                u = "=";
            switch (d) {
            case "n":
                h = !0,
                d = "g";
                break;
            case "%":
                v = 100,
                g = "%",
                d = "f";
                break;
            case "p":
                v = 100,
                g = "%",
                d = "r";
                break;
            case "b":
            case "o":
            case "x":
            case "X":
                f === "#" && (m = "0" + d.toLowerCase());
            case "c":
                b = !1;
            case "d":
                y = !0,
                p = 0;
                break;
            case "s":
                v = -1,
                d = "r"
            }
            f === "$" && (m = s[0],
            g = s[1]),
            d == "r" && !p && (d = "g");
            if (p != null)
                if (d == "g")
                    p = Math.max(1, Math.min(21, p));
                else if (d == "e" || d == "f")
                    p = Math.max(0, Math.min(20, p));
            d = zn.get(d) || Wn;
            var w = l && h;
            return function(t) {
                var r = g;
                if (y && t % 1)
                    return "";
                var s = t < 0 || t === 0 && 1 / t < 0 ? (t = -t,
                "-") : a === "-" ? "" : a;
                if (v < 0) {
                    var f = e.formatPrefix(t, p);
                    t = f.scale(t),
                    r = f.symbol + g
                } else
                    t *= v;
                t = d(t, p);
                var E = t.lastIndexOf("."), S, x;
                if (E < 0) {
                    var T = b ? t.lastIndexOf("e") : -1;
                    T < 0 ? (S = t,
                    x = "") : (S = t.substring(0, T),
                    x = t.substring(T))
                } else
                    S = t.substring(0, E),
                    x = n + t.substring(E + 1);
                !l && h && (S = o(S, Infinity));
                var N = m.length + S.length + x.length + (w ? 0 : s.length)
                  , C = N < c ? (new Array(N = c - N + 1)).join(i) : "";
                return w && (S = o(C + S, C.length ? c - x.length : Infinity)),
                s += m,
                t = S + x,
                (u === "<" ? s + t + C : u === ">" ? C + s + t : u === "^" ? C.substring(0, N >>= 1) + s + t + C.substring(N) : s + (w ? t : C + t)) + r
            }
        }
    }
    function Wn(e) {
        return e + ""
    }
    function $n() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }
    function Kn(e, t, n) {
        function r(t) {
            var n = e(t)
              , r = s(n, 1);
            return t - n < r - t ? n : r
        }
        function i(n) {
            return t(n = e(new Vn(n - 1)), 1),
            n
        }
        function s(e, n) {
            return t(e = new Vn(+e), n),
            e
        }
        function o(e, r, s) {
            var o = i(e)
              , u = [];
            if (s > 1)
                while (o < r)
                    n(o) % s || u.push(new Date(+o)),
                    t(o, 1);
            else
                while (o < r)
                    u.push(new Date(+o)),
                    t(o, 1);
            return u
        }
        function u(e, t, n) {
            try {
                Vn = $n;
                var r = new $n;
                return r._ = e,
                o(r, t, n)
            } finally {
                Vn = Date
            }
        }
        e.floor = e,
        e.round = r,
        e.ceil = i,
        e.offset = s,
        e.range = o;
        var a = e.utc = Qn(e);
        return a.floor = a,
        a.round = Qn(r),
        a.ceil = Qn(i),
        a.offset = Qn(s),
        a.range = u,
        e
    }
    function Qn(e) {
        return function(t, n) {
            try {
                Vn = $n;
                var r = new $n;
                return r._ = t,
                e(r, n)._
            } finally {
                Vn = Date
            }
        }
    }
    function Gn(t) {
        function l(e) {
            function n(n) {
                var r = [], i = -1, s = 0, o, u, a;
                while (++i < t)
                    if (e.charCodeAt(i) === 37) {
                        r.push(e.slice(s, i)),
                        (u = Yn[o = e.charAt(++i)]) != null && (o = e.charAt(++i));
                        if (a = E[o])
                            o = a(n, u == null ? o === "e" ? " " : "0" : u);
                        r.push(o),
                        s = i + 1
                    }
                return r.push(e.slice(s, i)),
                r.join("")
            }
            var t = e.length;
            return n.parse = function(t) {
                var n = {
                    y: 1900,
                    m: 0,
                    d: 1,
                    H: 0,
                    M: 0,
                    S: 0,
                    L: 0,
                    Z: null
                }
                  , r = c(n, e, t, 0);
                if (r != t.length)
                    return null;
                "p"in n && (n.H = n.H % 12 + n.p * 12);
                var i = n.Z != null && Vn !== $n
                  , s = new (i ? $n : Vn);
                return "j"in n ? s.setFullYear(n.y, 0, n.j) : "w"in n && ("W"in n || "U"in n) ? (s.setFullYear(n.y, 0, 1),
                s.setFullYear(n.y, 0, "W"in n ? (n.w + 6) % 7 + n.W * 7 - (s.getDay() + 5) % 7 : n.w + n.U * 7 - (s.getDay() + 6) % 7)) : s.setFullYear(n.y, n.m, n.d),
                s.setHours(n.H + (n.Z / 100 | 0), n.M + n.Z % 100, n.S, n.L),
                i ? s._ : s
            }
            ,
            n.toString = function() {
                return e
            }
            ,
            n
        }
        function c(e, t, n, r) {
            var i, s, o, u = 0, a = t.length, f = n.length;
            while (u < a) {
                if (r >= f)
                    return -1;
                i = t.charCodeAt(u++);
                if (i === 37) {
                    o = t.charAt(u++),
                    s = S[o in Yn ? t.charAt(u++) : o];
                    if (!s || (r = s(e, n, r)) < 0)
                        return -1
                } else if (i != n.charCodeAt(r++))
                    return -1
            }
            return r
        }
        function x(e, t, n) {
            v.lastIndex = 0;
            var r = v.exec(t.slice(n));
            return r ? (e.w = m.get(r[0].toLowerCase()),
            n + r[0].length) : -1
        }
        function T(e, t, n) {
            p.lastIndex = 0;
            var r = p.exec(t.slice(n));
            return r ? (e.w = d.get(r[0].toLowerCase()),
            n + r[0].length) : -1
        }
        function N(e, t, n) {
            b.lastIndex = 0;
            var r = b.exec(t.slice(n));
            return r ? (e.m = w.get(r[0].toLowerCase()),
            n + r[0].length) : -1
        }
        function C(e, t, n) {
            g.lastIndex = 0;
            var r = g.exec(t.slice(n));
            return r ? (e.m = y.get(r[0].toLowerCase()),
            n + r[0].length) : -1
        }
        function k(e, t, n) {
            return c(e, E.c.toString(), t, n)
        }
        function L(e, t, n) {
            return c(e, E.x.toString(), t, n)
        }
        function A(e, t, n) {
            return c(e, E.X.toString(), t, n)
        }
        function O(e, t, n) {
            var r = h.get(t.slice(n, n += 2).toLowerCase());
            return r == null ? -1 : (e.p = r,
            n)
        }
        var n = t.dateTime
          , r = t.date
          , i = t.time
          , s = t.periods
          , o = t.days
          , u = t.shortDays
          , a = t.months
          , f = t.shortMonths;
        l.utc = function(e) {
            function n(e) {
                try {
                    Vn = $n;
                    var n = new Vn;
                    return n._ = e,
                    t(n)
                } finally {
                    Vn = Date
                }
            }
            var t = l(e);
            return n.parse = function(e) {
                try {
                    Vn = $n;
                    var n = t.parse(e);
                    return n && n._
                } finally {
                    Vn = Date
                }
            }
            ,
            n.toString = t.toString,
            n
        }
        ,
        l.multi = l.utc.multi = wr;
        var h = e.map()
          , p = nr(o)
          , d = rr(o)
          , v = nr(u)
          , m = rr(u)
          , g = nr(a)
          , y = rr(a)
          , b = nr(f)
          , w = rr(f);
        s.forEach(function(e, t) {
            h.set(e.toLowerCase(), t)
        });
        var E = {
            a: function(e) {
                return u[e.getDay()]
            },
            A: function(e) {
                return o[e.getDay()]
            },
            b: function(e) {
                return f[e.getMonth()]
            },
            B: function(e) {
                return a[e.getMonth()]
            },
            c: l(n),
            d: function(e, t) {
                return tr(e.getDate(), t, 2)
            },
            e: function(e, t) {
                return tr(e.getDate(), t, 2)
            },
            H: function(e, t) {
                return tr(e.getHours(), t, 2)
            },
            I: function(e, t) {
                return tr(e.getHours() % 12 || 12, t, 2)
            },
            j: function(e, t) {
                return tr(1 + Xn.dayOfYear(e), t, 3)
            },
            L: function(e, t) {
                return tr(e.getMilliseconds(), t, 3)
            },
            m: function(e, t) {
                return tr(e.getMonth() + 1, t, 2)
            },
            M: function(e, t) {
                return tr(e.getMinutes(), t, 2)
            },
            p: function(e) {
                return s[+(e.getHours() >= 12)]
            },
            S: function(e, t) {
                return tr(e.getSeconds(), t, 2)
            },
            U: function(e, t) {
                return tr(Xn.sundayOfYear(e), t, 2)
            },
            w: function(e) {
                return e.getDay()
            },
            W: function(e, t) {
                return tr(Xn.mondayOfYear(e), t, 2)
            },
            x: l(r),
            X: l(i),
            y: function(e, t) {
                return tr(e.getFullYear() % 100, t, 2)
            },
            Y: function(e, t) {
                return tr(e.getFullYear() % 1e4, t, 4)
            },
            Z: yr,
            "%": function() {
                return "%"
            }
        }
          , S = {
            a: x,
            A: T,
            b: N,
            B: C,
            c: k,
            d: hr,
            e: hr,
            H: dr,
            I: dr,
            j: pr,
            L: gr,
            m: cr,
            M: vr,
            p: O,
            S: mr,
            U: sr,
            w: ir,
            W: or,
            x: L,
            X: A,
            y: ar,
            Y: ur,
            Z: fr,
            "%": br
        };
        return l
    }
    function tr(e, t, n) {
        var r = e < 0 ? "-" : ""
          , i = (r ? -e : e) + ""
          , s = i.length;
        return r + (s < n ? (new Array(n - s + 1)).join(t) + i : i)
    }
    function nr(t) {
        return new RegExp("^(?:" + t.map(e.requote).join("|") + ")","i")
    }
    function rr(e) {
        var t = new S
          , n = -1
          , r = e.length;
        while (++n < r)
            t.set(e[n].toLowerCase(), n);
        return t
    }
    function ir(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 1));
        return r ? (e.w = +r[0],
        n + r[0].length) : -1
    }
    function sr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n));
        return r ? (e.U = +r[0],
        n + r[0].length) : -1
    }
    function or(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n));
        return r ? (e.W = +r[0],
        n + r[0].length) : -1
    }
    function ur(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 4));
        return r ? (e.y = +r[0],
        n + r[0].length) : -1
    }
    function ar(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 2));
        return r ? (e.y = lr(+r[0]),
        n + r[0].length) : -1
    }
    function fr(e, t, n) {
        return /^[+-]\d{4}$/.test(t = t.slice(n, n + 5)) ? (e.Z = -t,
        n + 5) : -1
    }
    function lr(e) {
        return e + (e > 68 ? 1900 : 2e3)
    }
    function cr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 2));
        return r ? (e.m = r[0] - 1,
        n + r[0].length) : -1
    }
    function hr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 2));
        return r ? (e.d = +r[0],
        n + r[0].length) : -1
    }
    function pr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 3));
        return r ? (e.j = +r[0],
        n + r[0].length) : -1
    }
    function dr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 2));
        return r ? (e.H = +r[0],
        n + r[0].length) : -1
    }
    function vr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 2));
        return r ? (e.M = +r[0],
        n + r[0].length) : -1
    }
    function mr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 2));
        return r ? (e.S = +r[0],
        n + r[0].length) : -1
    }
    function gr(e, t, n) {
        Zn.lastIndex = 0;
        var r = Zn.exec(t.slice(n, n + 3));
        return r ? (e.L = +r[0],
        n + r[0].length) : -1
    }
    function yr(e) {
        var t = e.getTimezoneOffset()
          , n = t > 0 ? "-" : "+"
          , r = b(t) / 60 | 0
          , i = b(t) % 60;
        return n + tr(r, "0", 2) + tr(i, "0", 2)
    }
    function br(e, t, n) {
        er.lastIndex = 0;
        var r = er.exec(t.slice(n, n + 1));
        return r ? n + r[0].length : -1
    }
    function wr(e) {
        var t = e.length
          , n = -1;
        while (++n < t)
            e[n][0] = this(e[n][0]);
        return function(t) {
            var n = 0
              , r = e[n];
            while (!r[1](t))
                r = e[++n];
            return r[0](t)
        }
    }
    function Sr() {}
    function Tr(e, t, n) {
        var r = n.s = e + t
          , i = r - e
          , s = r - i;
        n.t = e - s + (t - i)
    }
    function Nr(e, t) {
        e && kr.hasOwnProperty(e.type) && kr[e.type](e, t)
    }
    function Lr(e, t, n) {
        var r = -1, i = e.length - n, s;
        t.lineStart();
        while (++r < i)
            s = e[r],
            t.point(s[0], s[1], s[2]);
        t.lineEnd()
    }
    function Ar(e, t) {
        var n = -1
          , r = e.length;
        t.polygonStart();
        while (++n < r)
            Lr(e[n], t, 1);
        t.polygonEnd()
    }
    function Dr() {
        function s(e, t) {
            e *= _t,
            t = t * _t / 2 + Lt / 4;
            var s = e - n
              , o = s >= 0 ? 1 : -1
              , u = o * s
              , a = Math.cos(t)
              , f = Math.sin(t)
              , l = i * f
              , c = r * a + l * Math.cos(u)
              , h = l * o * Math.sin(u);
            Mr.add(Math.atan2(h, c)),
            n = e,
            r = a,
            i = f
        }
        var e, t, n, r, i;
        _r.point = function(o, u) {
            _r.point = s,
            n = (e = o) * _t,
            r = Math.cos(u = (t = u) * _t / 2 + Lt / 4),
            i = Math.sin(u)
        }
        ,
        _r.lineEnd = function() {
            s(e, t)
        }
    }
    function Pr(e) {
        var t = e[0]
          , n = e[1]
          , r = Math.cos(n);
        return [r * Math.cos(t), r * Math.sin(t), Math.sin(n)]
    }
    function Hr(e, t) {
        return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
    }
    function Br(e, t) {
        return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]]
    }
    function jr(e, t) {
        e[0] += t[0],
        e[1] += t[1],
        e[2] += t[2]
    }
    function Fr(e, t) {
        return [e[0] * t, e[1] * t, e[2] * t]
    }
    function Ir(e) {
        var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
        e[0] /= t,
        e[1] /= t,
        e[2] /= t
    }
    function qr(e) {
        return [Math.atan2(e[1], e[0]), jt(e[2])]
    }
    function Rr(e, t) {
        return b(e[0] - t[0]) < Ct && b(e[1] - t[1]) < Ct
    }
    function ei(e, t) {
        e *= _t;
        var n = Math.cos(t *= _t);
        ti(n * Math.cos(e), n * Math.sin(e), Math.sin(t))
    }
    function ti(e, t, n) {
        ++Ur,
        Wr += (e - Wr) / Ur,
        Xr += (t - Xr) / Ur,
        Vr += (n - Vr) / Ur
    }
    function ni() {
        function r(r, i) {
            r *= _t;
            var s = Math.cos(i *= _t)
              , o = s * Math.cos(r)
              , u = s * Math.sin(r)
              , a = Math.sin(i)
              , f = Math.atan2(Math.sqrt((f = t * a - n * u) * f + (f = n * o - e * a) * f + (f = e * u - t * o) * f), e * o + t * u + n * a);
            zr += f,
            $r += f * (e + (e = o)),
            Jr += f * (t + (t = u)),
            Kr += f * (n + (n = a)),
            ti(e, t, n)
        }
        var e, t, n;
        Zr.point = function(i, s) {
            i *= _t;
            var o = Math.cos(s *= _t);
            e = o * Math.cos(i),
            t = o * Math.sin(i),
            n = Math.sin(s),
            Zr.point = r,
            ti(e, t, n)
        }
    }
    function ri() {
        Zr.point = ei
    }
    function ii() {
        function s(e, t) {
            e *= _t;
            var s = Math.cos(t *= _t)
              , o = s * Math.cos(e)
              , u = s * Math.sin(e)
              , a = Math.sin(t)
              , f = r * a - i * u
              , l = i * o - n * a
              , c = n * u - r * o
              , h = Math.sqrt(f * f + l * l + c * c)
              , p = n * o + r * u + i * a
              , d = h && -Bt(p) / h
              , v = Math.atan2(h, p);
            Qr += d * f,
            Gr += d * l,
            Yr += d * c,
            zr += v,
            $r += v * (n + (n = o)),
            Jr += v * (r + (r = u)),
            Kr += v * (i + (i = a)),
            ti(n, r, i)
        }
        var e, t, n, r, i;
        Zr.point = function(o, u) {
            e = o,
            t = u,
            Zr.point = s,
            o *= _t;
            var a = Math.cos(u *= _t);
            n = a * Math.cos(o),
            r = a * Math.sin(o),
            i = Math.sin(u),
            ti(n, r, i)
        }
        ,
        Zr.lineEnd = function() {
            s(e, t),
            Zr.lineEnd = ri,
            Zr.point = ei
        }
    }
    function si(e, t) {
        function n(n, r) {
            return n = e(n, r),
            t(n[0], n[1])
        }
        return e.invert && t.invert && (n.invert = function(n, r) {
            return n = t.invert(n, r),
            n && e.invert(n[0], n[1])
        }
        ),
        n
    }
    function oi() {
        return !0
    }
    function ui(e, t, n, r, i) {
        var s = []
          , o = [];
        e.forEach(function(e) {
            if ((t = e.length - 1) <= 0)
                return;
            var t, n = e[0], r = e[t];
            if (Rr(n, r)) {
                i.lineStart();
                for (var u = 0; u < t; ++u)
                    i.point((n = e[u])[0], n[1]);
                i.lineEnd();
                return
            }
            var a = new fi(n,e,null,!0)
              , f = new fi(n,null,a,!1);
            a.o = f,
            s.push(a),
            o.push(f),
            a = new fi(r,e,null,!1),
            f = new fi(r,null,a,!0),
            a.o = f,
            s.push(a),
            o.push(f)
        }),
        o.sort(t),
        ai(s),
        ai(o);
        if (!s.length)
            return;
        for (var u = 0, a = n, f = o.length; u < f; ++u)
            o[u].e = a = !a;
        var l = s[0], c, h;
        for (; ; ) {
            var p = l
              , d = !0;
            while (p.v)
                if ((p = p.n) === l)
                    return;
            c = p.z,
            i.lineStart();
            do {
                p.v = p.o.v = !0;
                if (p.e) {
                    if (d)
                        for (var u = 0, f = c.length; u < f; ++u)
                            i.point((h = c[u])[0], h[1]);
                    else
                        r(p.x, p.n.x, 1, i);
                    p = p.n
                } else {
                    if (d) {
                        c = p.p.z;
                        for (var u = c.length - 1; u >= 0; --u)
                            i.point((h = c[u])[0], h[1])
                    } else
                        r(p.x, p.p.x, -1, i);
                    p = p.p
                }
                p = p.o,
                c = p.z,
                d = !d
            } while (!p.v);
            i.lineEnd()
        }
    }
    function ai(e) {
        if (!(t = e.length))
            return;
        var t, n = 0, r = e[0], i;
        while (++n < t)
            r.n = i = e[n],
            i.p = r,
            r = i;
        r.n = i = e[0],
        i.p = r
    }
    function fi(e, t, n, r) {
        this.x = e,
        this.z = t,
        this.o = n,
        this.e = r,
        this.v = !1,
        this.n = this.p = null
    }
    function li(t, n, r, i) {
        return function(s, o) {
            function l(e, n) {
                var r = s(e, n);
                t(e = r[0], n = r[1]) && o.point(e, n)
            }
            function c(e, t) {
                var n = s(e, t);
                u.point(n[0], n[1])
            }
            function h() {
                f.point = c,
                u.lineStart()
            }
            function p() {
                f.point = l,
                u.lineEnd()
            }
            function w(e, t) {
                b.push([e, t]);
                var n = s(e, t);
                m.point(n[0], n[1])
            }
            function E() {
                m.lineStart(),
                b = []
            }
            function S() {
                w(b[0][0], b[0][1]),
                m.lineEnd();
                var e = m.clean(), t = v.buffer(), n, r = t.length;
                b.pop(),
                y.push(b),
                b = null;
                if (!r)
                    return;
                if (e & 1) {
                    n = t[0];
                    var r = n.length - 1, i = -1, s;
                    if (r > 0) {
                        g || (o.polygonStart(),
                        g = !0),
                        o.lineStart();
                        while (++i < r)
                            o.point((s = n[i])[0], s[1]);
                        o.lineEnd()
                    }
                    return
                }
                r > 1 && e & 2 && t.push(t.pop().concat(t.shift())),
                d.push(t.filter(ci))
            }
            var u = n(o), a = s.invert(i[0], i[1]), f = {
                point: l,
                lineStart: h,
                lineEnd: p,
                polygonStart: function() {
                    f.point = w,
                    f.lineStart = E,
                    f.lineEnd = S,
                    d = [],
                    y = []
                },
                polygonEnd: function() {
                    f.point = l,
                    f.lineStart = h,
                    f.lineEnd = p,
                    d = e.merge(d);
                    var t = yi(a, y);
                    d.length ? (g || (o.polygonStart(),
                    g = !0),
                    ui(d, pi, t, r, o)) : t && (g || (o.polygonStart(),
                    g = !0),
                    o.lineStart(),
                    r(null, null, 1, o),
                    o.lineEnd()),
                    g && (o.polygonEnd(),
                    g = !1),
                    d = y = null
                },
                sphere: function() {
                    o.polygonStart(),
                    o.lineStart(),
                    r(null, null, 1, o),
                    o.lineEnd(),
                    o.polygonEnd()
                }
            }, d, v = hi(), m = n(v), g = !1, y, b;
            return f
        }
    }
    function ci(e) {
        return e.length > 1
    }
    function hi() {
        var e = [], t;
        return {
            lineStart: function() {
                e.push(t = [])
            },
            point: function(e, n) {
                t.push([e, n])
            },
            lineEnd: j,
            buffer: function() {
                var n = e;
                return e = [],
                t = null,
                n
            },
            rejoin: function() {
                e.length > 1 && e.push(e.pop().concat(e.shift()))
            }
        }
    }
    function pi(e, t) {
        return ((e = e.x)[0] < 0 ? e[1] - Mt - Ct : Mt - e[1]) - ((t = t.x)[0] < 0 ? t[1] - Mt - Ct : Mt - t[1])
    }
    function vi(e) {
        var t = NaN, n = NaN, r = NaN, i;
        return {
            lineStart: function() {
                e.lineStart(),
                i = 1
            },
            point: function(s, o) {
                var u = s > 0 ? Lt : -Lt
                  , a = b(s - t);
                b(a - Lt) < Ct ? (e.point(t, n = (n + o) / 2 > 0 ? Mt : -Mt),
                e.point(r, n),
                e.lineEnd(),
                e.lineStart(),
                e.point(u, n),
                e.point(s, n),
                i = 0) : r !== u && a >= Lt && (b(t - r) < Ct && (t -= r * Ct),
                b(s - u) < Ct && (s -= u * Ct),
                n = mi(t, n, s, o),
                e.point(r, n),
                e.lineEnd(),
                e.lineStart(),
                e.point(u, n),
                i = 0),
                e.point(t = s, n = o),
                r = u
            },
            lineEnd: function() {
                e.lineEnd(),
                t = n = NaN
            },
            clean: function() {
                return 2 - i
            }
        }
    }
    function mi(e, t, n, r) {
        var i, s, o = Math.sin(e - n);
        return b(o) > Ct ? Math.atan((Math.sin(t) * (s = Math.cos(r)) * Math.sin(n) - Math.sin(r) * (i = Math.cos(t)) * Math.sin(e)) / (i * s * o)) : (t + r) / 2
    }
    function gi(e, t, n, r) {
        var i;
        if (e == null)
            i = n * Mt,
            r.point(-Lt, i),
            r.point(0, i),
            r.point(Lt, i),
            r.point(Lt, 0),
            r.point(Lt, -i),
            r.point(0, -i),
            r.point(-Lt, -i),
            r.point(-Lt, 0),
            r.point(-Lt, i);
        else if (b(e[0] - t[0]) > Ct) {
            var s = e[0] < t[0] ? Lt : -Lt;
            i = n * s / 2,
            r.point(-s, i),
            r.point(0, i),
            r.point(s, i)
        } else
            r.point(t[0], t[1])
    }
    function yi(e, t) {
        var n = e[0]
          , r = e[1]
          , i = [Math.sin(n), -Math.cos(n), 0]
          , s = 0
          , o = 0;
        Mr.reset();
        for (var u = 0, a = t.length; u < a; ++u) {
            var f = t[u]
              , l = f.length;
            if (!l)
                continue;
            var c = f[0]
              , h = c[0]
              , p = c[1] / 2 + Lt / 4
              , d = Math.sin(p)
              , v = Math.cos(p)
              , m = 1;
            for (; ; ) {
                m === l && (m = 0),
                e = f[m];
                var g = e[0]
                  , y = e[1] / 2 + Lt / 4
                  , b = Math.sin(y)
                  , w = Math.cos(y)
                  , E = g - h
                  , S = E >= 0 ? 1 : -1
                  , x = S * E
                  , T = x > Lt
                  , N = d * b;
                Mr.add(Math.atan2(N * S * Math.sin(x), v * w + N * Math.cos(x))),
                s += T ? E + S * At : E;
                if (T ^ h >= n ^ g >= n) {
                    var C = Br(Pr(c), Pr(e));
                    Ir(C);
                    var k = Br(i, C);
                    Ir(k);
                    var L = (T ^ E >= 0 ? -1 : 1) * jt(k[2]);
                    if (r > L || r === L && (C[0] || C[1]))
                        o += T ^ E >= 0 ? 1 : -1
                }
                if (!(m++))
                    break;
                h = g,
                d = b,
                v = w,
                c = e
            }
        }
        return (s < -Ct || s < Ct && Mr < 0) ^ o & 1
    }
    function bi(e) {
        function s(e, n) {
            return Math.cos(e) * Math.cos(n) > t
        }
        function o(e) {
            var t, i, o, f, l;
            return {
                lineStart: function() {
                    f = o = !1,
                    l = 1
                },
                point: function(c, h) {
                    var p = [c, h], d, v = s(c, h), m = n ? v ? 0 : a(c, h) : v ? a(c + (c < 0 ? Lt : -Lt), h) : 0;
                    !t && (f = o = v) && e.lineStart();
                    if (v !== o) {
                        d = u(t, p);
                        if (Rr(t, d) || Rr(p, d))
                            p[0] += Ct,
                            p[1] += Ct,
                            v = s(p[0], p[1])
                    }
                    if (v !== o)
                        l = 0,
                        v ? (e.lineStart(),
                        d = u(p, t),
                        e.point(d[0], d[1])) : (d = u(t, p),
                        e.point(d[0], d[1]),
                        e.lineEnd()),
                        t = d;
                    else if (r && t && n ^ v) {
                        var g;
                        !(m & i) && (g = u(p, t, !0)) && (l = 0,
                        n ? (e.lineStart(),
                        e.point(g[0][0], g[0][1]),
                        e.point(g[1][0], g[1][1]),
                        e.lineEnd()) : (e.point(g[1][0], g[1][1]),
                        e.lineEnd(),
                        e.lineStart(),
                        e.point(g[0][0], g[0][1])))
                    }
                    v && (!t || !Rr(t, p)) && e.point(p[0], p[1]),
                    t = p,
                    o = v,
                    i = m
                },
                lineEnd: function() {
                    o && e.lineEnd(),
                    t = null
                },
                clean: function() {
                    return l | (f && o) << 1
                }
            }
        }
        function u(e, n, r) {
            var i = Pr(e)
              , s = Pr(n)
              , o = [1, 0, 0]
              , u = Br(i, s)
              , a = Hr(u, u)
              , f = u[0]
              , l = a - f * f;
            if (!l)
                return !r && e;
            var c = t * a / l
              , h = -t * f / l
              , p = Br(o, u)
              , d = Fr(o, c)
              , v = Fr(u, h);
            jr(d, v);
            var m = p
              , g = Hr(d, m)
              , y = Hr(m, m)
              , w = g * g - y * (Hr(d, d) - 1);
            if (w < 0)
                return;
            var E = Math.sqrt(w)
              , S = Fr(m, (-g - E) / y);
            jr(S, d),
            S = qr(S);
            if (!r)
                return S;
            var x = e[0], T = n[0], N = e[1], C = n[1], k;
            T < x && (k = x,
            x = T,
            T = k);
            var L = T - x
              , A = b(L - Lt) < Ct
              , O = A || L < Ct;
            !A && C < N && (k = N,
            N = C,
            C = k);
            if (O ? A ? N + C > 0 ^ S[1] < (b(S[0] - x) < Ct ? N : C) : N <= S[1] && S[1] <= C : L > Lt ^ (x <= S[0] && S[0] <= T)) {
                var M = Fr(m, (-g + E) / y);
                return jr(M, d),
                [S, qr(M)]
            }
        }
        function a(t, r) {
            var i = n ? e : Lt - e
              , s = 0;
            return t < -i ? s |= 1 : t > i && (s |= 2),
            r < -i ? s |= 4 : r > i && (s |= 8),
            s
        }
        var t = Math.cos(e)
          , n = t > 0
          , r = b(t) > Ct
          , i = ns(e, 6 * _t);
        return li(s, o, i, n ? [0, -e] : [-Lt, e - Lt])
    }
    function wi(e, t, n, r) {
        return function(i) {
            var s = i.a, o = i.b, u = s.x, a = s.y, f = o.x, l = o.y, c = 0, h = 1, p = f - u, d = l - a, v;
            v = e - u;
            if (!p && v > 0)
                return;
            v /= p;
            if (p < 0) {
                if (v < c)
                    return;
                v < h && (h = v)
            } else if (p > 0) {
                if (v > h)
                    return;
                v > c && (c = v)
            }
            v = n - u;
            if (!p && v < 0)
                return;
            v /= p;
            if (p < 0) {
                if (v > h)
                    return;
                v > c && (c = v)
            } else if (p > 0) {
                if (v < c)
                    return;
                v < h && (h = v)
            }
            v = t - a;
            if (!d && v > 0)
                return;
            v /= d;
            if (d < 0) {
                if (v < c)
                    return;
                v < h && (h = v)
            } else if (d > 0) {
                if (v > h)
                    return;
                v > c && (c = v)
            }
            v = r - a;
            if (!d && v < 0)
                return;
            v /= d;
            if (d < 0) {
                if (v > h)
                    return;
                v > c && (c = v)
            } else if (d > 0) {
                if (v < c)
                    return;
                v < h && (h = v)
            }
            return c > 0 && (i.a = {
                x: u + c * p,
                y: a + c * d
            }),
            h < 1 && (i.b = {
                x: u + h * p,
                y: a + h * d
            }),
            i
        }
    }
    function Si(t, n, r, i) {
        function s(e, i) {
            return b(e[0] - t) < Ct ? i > 0 ? 0 : 3 : b(e[0] - r) < Ct ? i > 0 ? 2 : 1 : b(e[1] - n) < Ct ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }
        function o(e, t) {
            return u(e.x, t.x)
        }
        function u(e, t) {
            var n = s(e, 1)
              , r = s(t, 1);
            return n !== r ? n - r : n === 0 ? t[1] - e[1] : n === 1 ? e[0] - t[0] : n === 2 ? e[1] - t[1] : t[0] - e[0]
        }
        return function(a) {
            function m(e) {
                var t = 0
                  , n = p.length
                  , r = e[1];
                for (var i = 0; i < n; ++i)
                    for (var s = 1, o = p[i], u = o.length, a = o[0], f; s < u; ++s)
                        f = o[s],
                        a[1] <= r ? f[1] > r && Ht(a, f, e) > 0 && ++t : f[1] <= r && Ht(a, f, e) < 0 && --t,
                        a = f;
                return t !== 0
            }
            function g(e, o, a, f) {
                var l = 0
                  , c = 0;
                if (e == null || (l = s(e, a)) !== (c = s(o, a)) || u(e, o) < 0 ^ a > 0) {
                    do
                        f.point(l === 0 || l === 3 ? t : r, l > 1 ? i : n);
                    while ((l = (l + a + 4) % 4) !== c)
                } else
                    f.point(o[0], o[1])
            }
            function y(e, s) {
                return t <= e && e <= r && n <= s && s <= i
            }
            function b(e, t) {
                y(e, t) && a.point(e, t)
            }
            function L() {
                v.point = O,
                p && p.push(d = []),
                C = !0,
                N = !1,
                x = T = NaN
            }
            function A() {
                h && (O(w, E),
                S && N && l.rejoin(),
                h.push(l.buffer())),
                v.point = b,
                N && a.lineEnd()
            }
            function O(e, t) {
                e = Math.max(-Ei, Math.min(Ei, e)),
                t = Math.max(-Ei, Math.min(Ei, t));
                var n = y(e, t);
                p && d.push([e, t]);
                if (C)
                    w = e,
                    E = t,
                    S = n,
                    C = !1,
                    n && (a.lineStart(),
                    a.point(e, t));
                else if (n && N)
                    a.point(e, t);
                else {
                    var r = {
                        a: {
                            x: x,
                            y: T
                        },
                        b: {
                            x: e,
                            y: t
                        }
                    };
                    c(r) ? (N || (a.lineStart(),
                    a.point(r.a.x, r.a.y)),
                    a.point(r.b.x, r.b.y),
                    n || a.lineEnd(),
                    k = !1) : n && (a.lineStart(),
                    a.point(e, t),
                    k = !1)
                }
                x = e,
                T = t,
                N = n
            }
            var f = a, l = hi(), c = wi(t, n, r, i), h, p, d, v = {
                point: b,
                lineStart: L,
                lineEnd: A,
                polygonStart: function() {
                    a = l,
                    h = [],
                    p = [],
                    k = !0
                },
                polygonEnd: function() {
                    a = f,
                    h = e.merge(h);
                    var n = m([t, i])
                      , r = k && n
                      , s = h.length;
                    if (r || s)
                        a.polygonStart(),
                        r && (a.lineStart(),
                        g(null, null, 1, a),
                        a.lineEnd()),
                        s && ui(h, o, n, g, a),
                        a.polygonEnd();
                    h = p = d = null
                }
            }, w, E, S, x, T, N, C, k;
            return v
        }
    }
    function xi(e) {
        var t = 0
          , n = Lt / 3
          , r = Ji(e)
          , i = r(t, n);
        return i.parallels = function(e) {
            return arguments.length ? r(t = e[0] * Lt / 180, n = e[1] * Lt / 180) : [t / Lt * 180, n / Lt * 180]
        }
        ,
        i
    }
    function Ti(e, t) {
        function o(e, t) {
            var n = Math.sqrt(i - 2 * r * Math.sin(t)) / r;
            return [n * Math.sin(e *= r), s - n * Math.cos(e)]
        }
        var n = Math.sin(e)
          , r = (n + Math.sin(t)) / 2
          , i = 1 + n * (2 * r - n)
          , s = Math.sqrt(i) / r;
        return o.invert = function(e, t) {
            var n = s - t;
            return [Math.atan2(e, n) / r, jt((i - (e * e + n * n) * r * r) / (2 * r))]
        }
        ,
        o
    }
    function Li() {
        function i(e, t) {
            Ci += r * e - n * t,
            n = e,
            r = t
        }
        var e, t, n, r;
        ki.point = function(s, o) {
            ki.point = i,
            e = n = s,
            t = r = o
        }
        ,
        ki.lineEnd = function() {
            i(e, t)
        }
    }
    function Pi(e, t) {
        e < Ai && (Ai = e),
        e > Mi && (Mi = e),
        t < Oi && (Oi = t),
        t > _i && (_i = t)
    }
    function Hi() {
        function r(n, r) {
            t.push("M", n, ",", r, e)
        }
        function i(e, r) {
            t.push("M", e, ",", r),
            n.point = s
        }
        function s(e, n) {
            t.push("L", e, ",", n)
        }
        function o() {
            n.point = r
        }
        function u() {
            t.push("Z")
        }
        var e = Bi(4.5)
          , t = []
          , n = {
            point: r,
            lineStart: function() {
                n.point = i
            },
            lineEnd: o,
            polygonStart: function() {
                n.lineEnd = u
            },
            polygonEnd: function() {
                n.lineEnd = o,
                n.point = r
            },
            pointRadius: function(t) {
                return e = Bi(t),
                n
            },
            result: function() {
                if (t.length) {
                    var e = t.join("");
                    return t = [],
                    e
                }
            }
        };
        return n
    }
    function Bi(e) {
        return "m0," + e + "a" + e + "," + e + " 0 1,1 0," + -2 * e + "a" + e + "," + e + " 0 1,1 0," + 2 * e + "z"
    }
    function Fi(e, t) {
        Wr += e,
        Xr += t,
        ++Vr
    }
    function Ii() {
        function n(n, r) {
            var i = n - e
              , s = r - t
              , o = Math.sqrt(i * i + s * s);
            $r += o * (e + n) / 2,
            Jr += o * (t + r) / 2,
            Kr += o,
            Fi(e = n, t = r)
        }
        var e, t;
        ji.point = function(r, i) {
            ji.point = n,
            Fi(e = r, t = i)
        }
    }
    function qi() {
        ji.point = Fi
    }
    function Ri() {
        function i(e, t) {
            var i = e - n
              , s = t - r
              , o = Math.sqrt(i * i + s * s);
            $r += o * (n + e) / 2,
            Jr += o * (r + t) / 2,
            Kr += o,
            o = r * e - n * t,
            Qr += o * (n + e),
            Gr += o * (r + t),
            Yr += o * 3,
            Fi(n = e, r = t)
        }
        var e, t, n, r;
        ji.point = function(s, o) {
            ji.point = i,
            Fi(e = n = s, t = r = o)
        }
        ,
        ji.lineEnd = function() {
            i(e, t)
        }
    }
    function Ui(e) {
        function r(n, r) {
            e.moveTo(n + t, r),
            e.arc(n, r, t, 0, At)
        }
        function i(t, r) {
            e.moveTo(t, r),
            n.point = s
        }
        function s(t, n) {
            e.lineTo(t, n)
        }
        function o() {
            n.point = r
        }
        function u() {
            e.closePath()
        }
        var t = 4.5
          , n = {
            point: r,
            lineStart: function() {
                n.point = i
            },
            lineEnd: o,
            polygonStart: function() {
                n.lineEnd = u
            },
            polygonEnd: function() {
                n.lineEnd = o,
                n.point = r
            },
            pointRadius: function(e) {
                return t = e,
                n
            },
            result: j
        };
        return n
    }
    function zi(e) {
        function i(e) {
            return (r ? o : s)(e)
        }
        function s(t) {
            return Vi(t, function(n, r) {
                n = e(n, r),
                t.point(n[0], n[1])
            })
        }
        function o(t) {
            function y(n, r) {
                n = e(n, r),
                t.point(n[0], n[1])
            }
            function b() {
                h = NaN,
                g.point = w,
                t.lineStart()
            }
            function w(n, i) {
                var s = Pr([n, i])
                  , o = e(n, i);
                u(h, p, c, d, v, m, h = o[0], p = o[1], c = n, d = s[0], v = s[1], m = s[2], r, t),
                t.point(h, p)
            }
            function E() {
                g.point = y,
                t.lineEnd()
            }
            function S() {
                b(),
                g.point = x,
                g.lineEnd = T
            }
            function x(e, t) {
                w(n = e, i = t),
                s = h,
                o = p,
                a = d,
                f = v,
                l = m,
                g.point = w
            }
            function T() {
                u(h, p, c, d, v, m, s, o, n, a, f, l, r, t),
                g.lineEnd = E,
                E()
            }
            var n, i, s, o, a, f, l, c, h, p, d, v, m, g = {
                point: y,
                lineStart: b,
                lineEnd: E,
                polygonStart: function() {
                    t.polygonStart(),
                    g.lineStart = S
                },
                polygonEnd: function() {
                    t.polygonEnd(),
                    g.lineStart = b
                }
            };
            return g
        }
        function u(r, i, s, o, a, f, l, c, h, p, d, v, m, g) {
            var y = l - r
              , w = c - i
              , E = y * y + w * w;
            if (E > 4 * t && m--) {
                var S = o + p
                  , x = a + d
                  , T = f + v
                  , N = Math.sqrt(S * S + x * x + T * T)
                  , C = Math.asin(T /= N)
                  , k = b(b(T) - 1) < Ct || b(s - h) < Ct ? (s + h) / 2 : Math.atan2(x, S)
                  , L = e(k, C)
                  , A = L[0]
                  , O = L[1]
                  , M = A - r
                  , _ = O - i
                  , D = w * M - y * _;
                if (D * D / E > t || b((y * M + w * _) / E - .5) > .3 || o * p + a * d + f * v < n)
                    u(r, i, s, o, a, f, A, O, k, S /= N, x /= N, T, m, g),
                    g.point(A, O),
                    u(A, O, k, S, x, T, l, c, h, p, d, v, m, g)
            }
        }
        var t = .5
          , n = Math.cos(30 * _t)
          , r = 16;
        return i.precision = function(e) {
            return arguments.length ? (r = (t = e * e) > 0 && 16,
            i) : Math.sqrt(t)
        }
        ,
        i
    }
    function Wi(e) {
        var t = zi(function(t, n) {
            return e([t * Dt, n * Dt])
        });
        return function(e) {
            return Ki(t(e))
        }
    }
    function Xi(e) {
        this.stream = e
    }
    function Vi(e, t) {
        return {
            point: t,
            sphere: function() {
                e.sphere()
            },
            lineStart: function() {
                e.lineStart()
            },
            lineEnd: function() {
                e.lineEnd()
            },
            polygonStart: function() {
                e.polygonStart()
            },
            polygonEnd: function() {
                e.polygonEnd()
            }
        }
    }
    function $i(e) {
        return Ji(function() {
            return e
        })()
    }
    function Ji(t) {
        function E(e) {
            return e = i(e[0] * _t, e[1] * _t),
            [e[0] * o + d, v - e[1] * o]
        }
        function S(e) {
            return e = i.invert((e[0] - d) / o, (v - e[1]) / o),
            e && [e[0] * Dt, e[1] * Dt]
        }
        function x() {
            i = si(r = Yi(c, h, p), n);
            var e = n(f, l);
            return d = u - e[0] * o,
            v = a + e[1] * o,
            T()
        }
        function T() {
            return w && (w.valid = !1,
            w = null),
            E
        }
        var n, r, i, s = zi(function(e, t) {
            return e = n(e, t),
            [e[0] * o + d, v - e[1] * o]
        }), o = 150, u = 480, a = 250, f = 0, l = 0, c = 0, h = 0, p = 0, d, v, m = di, g = D, y = null, b = null, w;
        return E.stream = function(e) {
            return w && (w.valid = !1),
            w = Ki(m(r, s(g(e)))),
            w.valid = !0,
            w
        }
        ,
        E.clipAngle = function(e) {
            return arguments.length ? (m = e == null ? (y = e,
            di) : bi((y = +e) * _t),
            T()) : y
        }
        ,
        E.clipExtent = function(e) {
            return arguments.length ? (b = e,
            g = e ? Si(e[0][0], e[0][1], e[1][0], e[1][1]) : D,
            T()) : b
        }
        ,
        E.scale = function(e) {
            return arguments.length ? (o = +e,
            x()) : o
        }
        ,
        E.translate = function(e) {
            return arguments.length ? (u = +e[0],
            a = +e[1],
            x()) : [u, a]
        }
        ,
        E.center = function(e) {
            return arguments.length ? (f = e[0] % 360 * _t,
            l = e[1] % 360 * _t,
            x()) : [f * Dt, l * Dt]
        }
        ,
        E.rotate = function(e) {
            return arguments.length ? (c = e[0] % 360 * _t,
            h = e[1] % 360 * _t,
            p = e.length > 2 ? e[2] % 360 * _t : 0,
            x()) : [c * Dt, h * Dt, p * Dt]
        }
        ,
        e.rebind(E, s, "precision"),
        function() {
            return n = t.apply(this, arguments),
            E.invert = n.invert && S,
            x()
        }
    }
    function Ki(e) {
        return Vi(e, function(t, n) {
            e.point(t * _t, n * _t)
        })
    }
    function Qi(e, t) {
        return [e, t]
    }
    function Gi(e, t) {
        return [e > Lt ? e - At : e < -Lt ? e + At : e, t]
    }
    function Yi(e, t, n) {
        return e ? t || n ? si(es(e), ts(t, n)) : es(e) : t || n ? ts(t, n) : Gi
    }
    function Zi(e) {
        return function(t, n) {
            return t += e,
            [t > Lt ? t - At : t < -Lt ? t + At : t, n]
        }
    }
    function es(e) {
        var t = Zi(e);
        return t.invert = Zi(-e),
        t
    }
    function ts(e, t) {
        function o(e, t) {
            var o = Math.cos(t)
              , u = Math.cos(e) * o
              , a = Math.sin(e) * o
              , f = Math.sin(t)
              , l = f * n + u * r;
            return [Math.atan2(a * i - l * s, u * n - f * r), jt(l * i + a * s)]
        }
        var n = Math.cos(e)
          , r = Math.sin(e)
          , i = Math.cos(t)
          , s = Math.sin(t);
        return o.invert = function(e, t) {
            var o = Math.cos(t)
              , u = Math.cos(e) * o
              , a = Math.sin(e) * o
              , f = Math.sin(t)
              , l = f * i - a * s;
            return [Math.atan2(a * i + f * s, u * n + l * r), jt(l * n - u * r)]
        }
        ,
        o
    }
    function ns(e, t) {
        var n = Math.cos(e)
          , r = Math.sin(e);
        return function(i, s, o, u) {
            var a = o * t;
            if (i != null) {
                i = rs(n, i),
                s = rs(n, s);
                if (o > 0 ? i < s : i > s)
                    i += o * At
            } else
                i = e + o * At,
                s = e - .5 * a;
            for (var f, l = i; o > 0 ? l > s : l < s; l -= a)
                u.point((f = qr([n, -r * Math.cos(l), -r * Math.sin(l)]))[0], f[1])
        }
    }
    function rs(e, t) {
        var n = Pr(t);
        n[0] -= e,
        Ir(n);
        var r = Bt(-n[1]);
        return ((-n[2] < 0 ? -r : r) + 2 * Math.PI - Ct) % (2 * Math.PI)
    }
    function is(t, n, r) {
        var i = e.range(t, n - Ct, r).concat(n);
        return function(e) {
            return i.map(function(t) {
                return [e, t]
            })
        }
    }
    function ss(t, n, r) {
        var i = e.range(t, n - Ct, r).concat(n);
        return function(e) {
            return i.map(function(t) {
                return [t, e]
            })
        }
    }
    function os(e) {
        return e.source
    }
    function us(e) {
        return e.target
    }
    function as(e, t, n, r) {
        var i = Math.cos(t)
          , s = Math.sin(t)
          , o = Math.cos(r)
          , u = Math.sin(r)
          , a = i * Math.cos(e)
          , f = i * Math.sin(e)
          , l = o * Math.cos(n)
          , c = o * Math.sin(n)
          , h = 2 * Math.asin(Math.sqrt(Rt(r - t) + i * o * Rt(n - e)))
          , p = 1 / Math.sin(h)
          , d = h ? function(e) {
            var t = Math.sin(e *= h) * p
              , n = Math.sin(h - e) * p
              , r = n * a + t * l
              , i = n * f + t * c
              , o = n * s + t * u;
            return [Math.atan2(i, r) * Dt, Math.atan2(o, Math.sqrt(r * r + i * i)) * Dt]
        }
        : function() {
            return [e * Dt, t * Dt]
        }
        ;
        return d.distance = h,
        d
    }
    function cs() {
        function r(r, i) {
            var s = Math.sin(i *= _t)
              , o = Math.cos(i)
              , u = b((r *= _t) - e)
              , a = Math.cos(u);
            fs += Math.atan2(Math.sqrt((u = o * Math.sin(u)) * u + (u = n * s - t * o * a) * u), t * s + n * o * a),
            e = r,
            t = s,
            n = o
        }
        var e, t, n;
        ls.point = function(i, s) {
            e = i * _t,
            t = Math.sin(s *= _t),
            n = Math.cos(s),
            ls.point = r
        }
        ,
        ls.lineEnd = function() {
            ls.point = ls.lineEnd = j
        }
    }
    function hs(e, t) {
        function n(t, n) {
            var r = Math.cos(t)
              , i = Math.cos(n)
              , s = e(r * i);
            return [s * i * Math.sin(t), s * Math.sin(n)]
        }
        return n.invert = function(e, n) {
            var r = Math.sqrt(e * e + n * n)
              , i = t(r)
              , s = Math.sin(i)
              , o = Math.cos(i);
            return [Math.atan2(e * s, r * o), Math.asin(r && n * s / r)]
        }
        ,
        n
    }
    function vs(e, t) {
        function o(e, t) {
            s > 0 ? t < -Mt + Ct && (t = -Mt + Ct) : t > Mt - Ct && (t = Mt - Ct);
            var n = s / Math.pow(r(t), i);
            return [n * Math.sin(i * e), s - n * Math.cos(i * e)]
        }
        var n = Math.cos(e)
          , r = function(e) {
            return Math.tan(Lt / 4 + e / 2)
        }
          , i = e === t ? Math.sin(e) : Math.log(n / Math.cos(t)) / Math.log(r(t) / r(e))
          , s = n * Math.pow(r(e), i) / i;
        return i ? (o.invert = function(e, t) {
            var n = s - t
              , r = Pt(i) * Math.sqrt(e * e + n * n);
            return [Math.atan2(e, n) / i, 2 * Math.atan(Math.pow(s / r, 1 / i)) - Mt]
        }
        ,
        o) : ys
    }
    function ms(e, t) {
        function s(e, t) {
            var n = i - t;
            return [n * Math.sin(r * e), i - n * Math.cos(r * e)]
        }
        var n = Math.cos(e)
          , r = e === t ? Math.sin(e) : (n - Math.cos(t)) / (t - e)
          , i = n / r + e;
        return b(r) < Ct ? Qi : (s.invert = function(e, t) {
            var n = i - t;
            return [Math.atan2(e, n) / r, i - Pt(r) * Math.sqrt(e * e + n * n)]
        }
        ,
        s)
    }
    function ys(e, t) {
        return [e, Math.log(Math.tan(Lt / 4 + t / 2))]
    }
    function bs(e) {
        var t = $i(e), n = t.scale, r = t.translate, i = t.clipExtent, s;
        return t.scale = function() {
            var e = n.apply(t, arguments);
            return e === t ? s ? t.clipExtent(null) : t : e
        }
        ,
        t.translate = function() {
            var e = r.apply(t, arguments);
            return e === t ? s ? t.clipExtent(null) : t : e
        }
        ,
        t.clipExtent = function(e) {
            var o = i.apply(t, arguments);
            if (o === t) {
                if (s = e == null) {
                    var u = Lt * n()
                      , a = r();
                    i([[a[0] - u, a[1] - u], [a[0] + u, a[1] + u]])
                }
            } else
                s && (o = null);
            return o
        }
        ,
        t.clipExtent(null)
    }
    function Ss(e, t) {
        return [Math.log(Math.tan(Lt / 4 + t / 2)), -e]
    }
    function xs(e) {
        return e[0]
    }
    function Ts(e) {
        return e[1]
    }
    function Ns(e) {
        var t = e.length
          , n = [0, 1]
          , r = 2;
        for (var i = 2; i < t; i++) {
            while (r > 1 && Ht(e[n[r - 2]], e[n[r - 1]], e[i]) <= 0)
                --r;
            n[r++] = i
        }
        return n.slice(0, r)
    }
    function Cs(e, t) {
        return e[0] - t[0] || e[1] - t[1]
    }
    function Ls(e, t, n) {
        return (n[0] - t[0]) * (e[1] - t[1]) < (n[1] - t[1]) * (e[0] - t[0])
    }
    function As(e, t, n, r) {
        var i = e[0]
          , s = n[0]
          , o = t[0] - i
          , u = r[0] - s
          , a = e[1]
          , f = n[1]
          , l = t[1] - a
          , c = r[1] - f
          , h = (u * (a - f) - c * (i - s)) / (c * o - u * l);
        return [i + h * o, a + h * l]
    }
    function Os(e) {
        var t = e[0]
          , n = e[e.length - 1];
        return !(t[0] - n[0] || t[1] - n[1])
    }
    function Fs() {
        so(this),
        this.edge = this.site = this.circle = null
    }
    function Is(e) {
        var t = Ps.pop() || new Fs;
        return t.site = e,
        t
    }
    function qs(e) {
        Qs(e),
        Ds.remove(e),
        Ps.push(e),
        so(e)
    }
    function Rs(e) {
        var t = e.circle
          , n = t.x
          , r = t.cy
          , i = {
            x: n,
            y: r
        }
          , s = e.P
          , o = e.N
          , u = [e];
        qs(e);
        var a = s;
        while (a.circle && b(n - a.circle.x) < Ct && b(r - a.circle.cy) < Ct)
            s = a.P,
            u.unshift(a),
            qs(a),
            a = s;
        u.unshift(a),
        Qs(a);
        var f = o;
        while (f.circle && b(n - f.circle.x) < Ct && b(r - f.circle.cy) < Ct)
            o = f.N,
            u.push(f),
            qs(f),
            f = o;
        u.push(f),
        Qs(f);
        var l = u.length, c;
        for (c = 1; c < l; ++c)
            f = u[c],
            a = u[c - 1],
            no(f.edge, a.site, f.site, i);
        a = u[0],
        f = u[l - 1],
        f.edge = eo(a.site, f.site, null, i),
        Ks(a),
        Ks(f)
    }
    function Us(e) {
        var t = e.x, n = e.y, r, i, s, o, u = Ds._;
        while (u) {
            s = zs(u, n) - t;
            if (s > Ct)
                u = u.L;
            else {
                o = t - Ws(u, n);
                if (!(o > Ct)) {
                    s > -Ct ? (r = u.P,
                    i = u) : o > -Ct ? (r = u,
                    i = u.N) : r = i = u;
                    break
                }
                if (!u.R) {
                    r = u;
                    break
                }
                u = u.R
            }
        }
        var a = Is(e);
        Ds.insert(r, a);
        if (!r && !i)
            return;
        if (r === i) {
            Qs(r),
            i = Is(r.site),
            Ds.insert(a, i),
            a.edge = i.edge = eo(r.site, a.site),
            Ks(r),
            Ks(i);
            return
        }
        if (!i) {
            a.edge = eo(r.site, a.site);
            return
        }
        Qs(r),
        Qs(i);
        var f = r.site
          , l = f.x
          , c = f.y
          , h = e.x - l
          , p = e.y - c
          , d = i.site
          , v = d.x - l
          , m = d.y - c
          , g = 2 * (h * m - p * v)
          , y = h * h + p * p
          , b = v * v + m * m
          , w = {
            x: (m * y - p * b) / g + l,
            y: (h * b - v * y) / g + c
        };
        no(i.edge, f, d, w),
        a.edge = eo(f, e, null, w),
        i.edge = eo(e, d, null, w),
        Ks(r),
        Ks(i)
    }
    function zs(e, t) {
        var n = e.site
          , r = n.x
          , i = n.y
          , s = i - t;
        if (!s)
            return r;
        var o = e.P;
        if (!o)
            return -Infinity;
        n = o.site;
        var u = n.x
          , a = n.y
          , f = a - t;
        if (!f)
            return u;
        var l = u - r
          , c = 1 / s - 1 / f
          , h = l / f;
        return c ? (-h + Math.sqrt(h * h - 2 * c * (l * l / (-2 * f) - a + f / 2 + i - s / 2))) / c + r : (r + u) / 2
    }
    function Ws(e, t) {
        var n = e.N;
        if (n)
            return zs(n, t);
        var r = e.site;
        return r.y === t ? r.x : Infinity
    }
    function Xs(e) {
        this.site = e,
        this.edges = []
    }
    function Vs(e) {
        var t = e[0][0], n = e[1][0], r = e[0][1], i = e[1][1], s, o, u, a, f = _s, l = f.length, c, h, p, d, v, m;
        while (l--) {
            c = f[l];
            if (!c || !c.prepare())
                continue;
            p = c.edges,
            d = p.length,
            h = 0;
            while (h < d) {
                m = p[h].end(),
                u = m.x,
                a = m.y,
                v = p[++h % d].start(),
                s = v.x,
                o = v.y;
                if (b(u - s) > Ct || b(a - o) > Ct)
                    p.splice(h, 0, new ro(to(c.site, m, b(u - t) < Ct && i - a > Ct ? {
                        x: t,
                        y: b(s - t) < Ct ? o : i
                    } : b(a - i) < Ct && n - u > Ct ? {
                        x: b(o - i) < Ct ? s : n,
                        y: i
                    } : b(u - n) < Ct && a - r > Ct ? {
                        x: n,
                        y: b(s - n) < Ct ? o : r
                    } : b(a - r) < Ct && u - t > Ct ? {
                        x: b(o - r) < Ct ? s : t,
                        y: r
                    } : null),c.site,null)),
                    ++d
            }
        }
    }
    function $s(e, t) {
        return t.angle - e.angle
    }
    function Js() {
        so(this),
        this.x = this.y = this.arc = this.site = this.cy = null
    }
    function Ks(e) {
        var t = e.P
          , n = e.N;
        if (!t || !n)
            return;
        var r = t.site
          , i = e.site
          , s = n.site;
        if (r === s)
            return;
        var o = i.x
          , u = i.y
          , a = r.x - o
          , f = r.y - u
          , l = s.x - o
          , c = s.y - u
          , h = 2 * (a * c - f * l);
        if (h >= -kt)
            return;
        var p = a * a + f * f
          , d = l * l + c * c
          , v = (c * p - f * d) / h
          , m = (a * d - l * p) / h
          , c = m + u
          , g = js.pop() || new Js;
        g.arc = e,
        g.site = i,
        g.x = v + o,
        g.y = c + Math.sqrt(v * v + m * m),
        g.cy = c,
        e.circle = g;
        var y = null
          , b = Bs._;
        while (b)
            if (g.y < b.y || g.y === b.y && g.x <= b.x) {
                if (!b.L) {
                    y = b.P;
                    break
                }
                b = b.L
            } else {
                if (!b.R) {
                    y = b;
                    break
                }
                b = b.R
            }
        Bs.insert(y, g),
        y || (Hs = g)
    }
    function Qs(e) {
        var t = e.circle;
        t && (t.P || (Hs = t.N),
        Bs.remove(t),
        js.push(t),
        so(t),
        e.circle = null)
    }
    function Gs(e) {
        var t = Ms, n = wi(e[0][0], e[0][1], e[1][0], e[1][1]), r = t.length, i;
        while (r--) {
            i = t[r];
            if (!Ys(i, e) || !n(i) || b(i.a.x - i.b.x) < Ct && b(i.a.y - i.b.y) < Ct)
                i.a = i.b = null,
                t.splice(r, 1)
        }
    }
    function Ys(e, t) {
        var n = e.b;
        if (n)
            return !0;
        var r = e.a, i = t[0][0], s = t[1][0], o = t[0][1], u = t[1][1], a = e.l, f = e.r, l = a.x, c = a.y, h = f.x, p = f.y, d = (l + h) / 2, v = (c + p) / 2, m, g;
        if (p === c) {
            if (d < i || d >= s)
                return;
            if (l > h) {
                if (!r)
                    r = {
                        x: d,
                        y: o
                    };
                else if (r.y >= u)
                    return;
                n = {
                    x: d,
                    y: u
                }
            } else {
                if (!r)
                    r = {
                        x: d,
                        y: u
                    };
                else if (r.y < o)
                    return;
                n = {
                    x: d,
                    y: o
                }
            }
        } else {
            m = (l - h) / (p - c),
            g = v - m * d;
            if (m < -1 || m > 1)
                if (l > h) {
                    if (!r)
                        r = {
                            x: (o - g) / m,
                            y: o
                        };
                    else if (r.y >= u)
                        return;
                    n = {
                        x: (u - g) / m,
                        y: u
                    }
                } else {
                    if (!r)
                        r = {
                            x: (u - g) / m,
                            y: u
                        };
                    else if (r.y < o)
                        return;
                    n = {
                        x: (o - g) / m,
                        y: o
                    }
                }
            else if (c < p) {
                if (!r)
                    r = {
                        x: i,
                        y: m * i + g
                    };
                else if (r.x >= s)
                    return;
                n = {
                    x: s,
                    y: m * s + g
                }
            } else {
                if (!r)
                    r = {
                        x: s,
                        y: m * s + g
                    };
                else if (r.x < i)
                    return;
                n = {
                    x: i,
                    y: m * i + g
                }
            }
        }
        return e.a = r,
        e.b = n,
        !0
    }
    function Zs(e, t) {
        this.l = e,
        this.r = t,
        this.a = this.b = null
    }
    function eo(e, t, n, r) {
        var i = new Zs(e,t);
        return Ms.push(i),
        n && no(i, e, t, n),
        r && no(i, t, e, r),
        _s[e.i].edges.push(new ro(i,e,t)),
        _s[t.i].edges.push(new ro(i,t,e)),
        i
    }
    function to(e, t, n) {
        var r = new Zs(e,null);
        return r.a = t,
        r.b = n,
        Ms.push(r),
        r
    }
    function no(e, t, n, r) {
        !e.a && !e.b ? (e.a = r,
        e.l = t,
        e.r = n) : e.l === n ? e.b = r : e.a = r
    }
    function ro(e, t, n) {
        var r = e.a
          , i = e.b;
        this.edge = e,
        this.site = t,
        this.angle = n ? Math.atan2(n.y - t.y, n.x - t.x) : e.l === t ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
    }
    function io() {
        this._ = null
    }
    function so(e) {
        e.U = e.C = e.L = e.R = e.P = e.N = null
    }
    function oo(e, t) {
        var n = t
          , r = t.R
          , i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : e._ = r,
        r.U = i,
        n.U = r,
        n.R = r.L,
        n.R && (n.R.U = n),
        r.L = n
    }
    function uo(e, t) {
        var n = t
          , r = t.L
          , i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : e._ = r,
        r.U = i,
        n.U = r,
        n.L = r.R,
        n.L && (n.L.U = n),
        r.R = n
    }
    function ao(e) {
        while (e.L)
            e = e.L;
        return e
    }
    function fo(e, t) {
        var n = e.sort(lo).pop(), r, i, s;
        Ms = [],
        _s = new Array(e.length),
        Ds = new io,
        Bs = new io;
        for (; ; ) {
            s = Hs;
            if (n && (!s || n.y < s.y || n.y === s.y && n.x < s.x)) {
                if (n.x !== r || n.y !== i)
                    _s[n.i] = new Xs(n),
                    Us(n),
                    r = n.x,
                    i = n.y;
                n = e.pop()
            } else {
                if (!s)
                    break;
                Rs(s.arc)
            }
        }
        t && (Gs(t),
        Vs(t));
        var o = {
            cells: _s,
            edges: Ms
        };
        return Ds = Bs = Ms = _s = null,
        o
    }
    function lo(e, t) {
        return t.y - e.y || t.x - e.x
    }
    function ho(e, t, n) {
        return (e.x - n.x) * (t.y - e.y) - (e.x - t.x) * (n.y - e.y)
    }
    function po(e) {
        return e.x
    }
    function vo(e) {
        return e.y
    }
    function mo() {
        return {
            leaf: !0,
            nodes: [],
            point: null,
            x: null,
            y: null
        }
    }
    function go(e, t, n, r, i, s) {
        if (!e(t, n, r, i, s)) {
            var o = (n + i) * .5
              , u = (r + s) * .5
              , a = t.nodes;
            a[0] && go(e, a[0], n, r, o, u),
            a[1] && go(e, a[1], o, r, i, u),
            a[2] && go(e, a[2], n, u, o, s),
            a[3] && go(e, a[3], o, u, i, s)
        }
    }
    function yo(e, t, n, r, i, s, o) {
        var u = Infinity, a;
        return function f(e, l, c, h, p) {
            if (l > s || c > o || h < r || p < i)
                return;
            if (d = e.point) {
                var d, v = t - e.x, m = n - e.y, g = v * v + m * m;
                if (g < u) {
                    var y = Math.sqrt(u = g);
                    r = t - y,
                    i = n - y,
                    s = t + y,
                    o = n + y,
                    a = d
                }
            }
            var b = e.nodes
              , w = (l + h) * .5
              , E = (c + p) * .5
              , S = t >= w
              , x = n >= E;
            for (var T = x << 1 | S, N = T + 4; T < N; ++T)
                if (e = b[T & 3])
                    switch (T & 3) {
                    case 0:
                        f(e, l, c, w, E);
                        break;
                    case 1:
                        f(e, w, c, h, E);
                        break;
                    case 2:
                        f(e, l, E, w, p);
                        break;
                    case 3:
                        f(e, w, E, h, p)
                    }
        }(e, r, i, s, o),
        a
    }
    function bo(t, n) {
        t = e.rgb(t),
        n = e.rgb(n);
        var r = t.r
          , i = t.g
          , s = t.b
          , o = n.r - r
          , u = n.g - i
          , a = n.b - s;
        return function(e) {
            return "#" + gn(Math.round(r + o * e)) + gn(Math.round(i + u * e)) + gn(Math.round(s + a * e))
        }
    }
    function wo(e, t) {
        var n = {}, r = {}, i;
        for (i in e)
            i in t ? n[i] = No(e[i], t[i]) : r[i] = e[i];
        for (i in t)
            i in e || (r[i] = t[i]);
        return function(e) {
            for (i in n)
                r[i] = n[i](e);
            return r
        }
    }
    function Eo(e, t) {
        return e = +e,
        t = +t,
        function(n) {
            return e * (1 - n) + t * n
        }
    }
    function So(e, t) {
        var n = xo.lastIndex = To.lastIndex = 0, r, i, s, o = -1, u = [], a = [];
        e += "",
        t += "";
        while ((r = xo.exec(e)) && (i = To.exec(t)))
            (s = i.index) > n && (s = t.slice(n, s),
            u[o] ? u[o] += s : u[++o] = s),
            (r = r[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null,
            a.push({
                i: o,
                x: Eo(r, i)
            })),
            n = To.lastIndex;
        return n < t.length && (s = t.slice(n),
        u[o] ? u[o] += s : u[++o] = s),
        u.length < 2 ? a[0] ? (t = a[0].x,
        function(e) {
            return t(e) + ""
        }
        ) : function() {
            return t
        }
        : (t = a.length,
        function(e) {
            for (var n = 0, r; n < t; ++n)
                u[(r = a[n]).i] = r.x(e);
            return u.join("")
        }
        )
    }
    function No(t, n) {
        var r = e.interpolators.length, i;
        while (--r >= 0 && !(i = e.interpolators[r](t, n)))
            ;
        return i
    }
    function Co(e, t) {
        var n = [], r = [], i = e.length, s = t.length, o = Math.min(e.length, t.length), u;
        for (u = 0; u < o; ++u)
            n.push(No(e[u], t[u]));
        for (; u < i; ++u)
            r[u] = e[u];
        for (; u < s; ++u)
            r[u] = t[u];
        return function(e) {
            for (u = 0; u < o; ++u)
                r[u] = n[u](e);
            return r
        }
    }
    function Oo(e) {
        return function(t) {
            return t <= 0 ? 0 : t >= 1 ? 1 : e(t)
        }
    }
    function Mo(e) {
        return function(t) {
            return 1 - e(1 - t)
        }
    }
    function _o(e) {
        return function(t) {
            return .5 * (t < .5 ? e(2 * t) : 2 - e(2 - 2 * t))
        }
    }
    function Do(e) {
        return e * e
    }
    function Po(e) {
        return e * e * e
    }
    function Ho(e) {
        if (e <= 0)
            return 0;
        if (e >= 1)
            return 1;
        var t = e * e
          , n = t * e;
        return 4 * (e < .5 ? n : 3 * (e - t) + n - .75)
    }
    function Bo(e) {
        return function(t) {
            return Math.pow(t, e)
        }
    }
    function jo(e) {
        return 1 - Math.cos(e * Mt)
    }
    function Fo(e) {
        return Math.pow(2, 10 * (e - 1))
    }
    function Io(e) {
        return 1 - Math.sqrt(1 - e * e)
    }
    function qo(e, t) {
        var n;
        return arguments.length < 2 && (t = .45),
        arguments.length ? n = t / At * Math.asin(1 / e) : (e = 1,
        n = t / 4),
        function(r) {
            return 1 + e * Math.pow(2, -10 * r) * Math.sin((r - n) * At / t)
        }
    }
    function Ro(e) {
        return e || (e = 1.70158),
        function(t) {
            return t * t * ((e + 1) * t - e)
        }
    }
    function Uo(e) {
        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
    }
    function zo(t, n) {
        t = e.hcl(t),
        n = e.hcl(n);
        var r = t.h
          , i = t.c
          , s = t.l
          , o = n.h - r
          , u = n.c - i
          , a = n.l - s;
        return isNaN(u) && (u = 0,
        i = isNaN(i) ? n.c : i),
        isNaN(o) ? (o = 0,
        r = isNaN(r) ? n.h : r) : o > 180 ? o -= 360 : o < -180 && (o += 360),
        function(e) {
            return en(r + o * e, i + u * e, s + a * e) + ""
        }
    }
    function Wo(t, n) {
        t = e.hsl(t),
        n = e.hsl(n);
        var r = t.h
          , i = t.s
          , s = t.l
          , o = n.h - r
          , u = n.s - i
          , a = n.l - s;
        return isNaN(u) && (u = 0,
        i = isNaN(i) ? n.s : i),
        isNaN(o) ? (o = 0,
        r = isNaN(r) ? n.h : r) : o > 180 ? o -= 360 : o < -180 && (o += 360),
        function(e) {
            return Gt(r + o * e, i + u * e, s + a * e) + ""
        }
    }
    function Xo(t, n) {
        t = e.lab(t),
        n = e.lab(n);
        var r = t.l
          , i = t.a
          , s = t.b
          , o = n.l - r
          , u = n.a - i
          , a = n.b - s;
        return function(e) {
            return an(r + o * e, i + u * e, s + a * e) + ""
        }
    }
    function Vo(e, t) {
        return t -= e,
        function(n) {
            return Math.round(e + t * n)
        }
    }
    function $o(e) {
        var t = [e.a, e.b]
          , n = [e.c, e.d]
          , r = Ko(t)
          , i = Jo(t, n)
          , s = Ko(Qo(n, t, -i)) || 0;
        t[0] * n[1] < n[0] * t[1] && (t[0] *= -1,
        t[1] *= -1,
        r *= -1,
        i *= -1),
        this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-n[0], n[1])) * Dt,
        this.translate = [e.e, e.f],
        this.scale = [r, s],
        this.skew = s ? Math.atan2(i, s) * Dt : 0
    }
    function Jo(e, t) {
        return e[0] * t[0] + e[1] * t[1]
    }
    function Ko(e) {
        var t = Math.sqrt(Jo(e, e));
        return t && (e[0] /= t,
        e[1] /= t),
        t
    }
    function Qo(e, t, n) {
        return e[0] += n * t[0],
        e[1] += n * t[1],
        e
    }
    function Yo(t, n) {
        var r = [], i = [], s, o = e.transform(t), u = e.transform(n), a = o.translate, f = u.translate, l = o.rotate, c = u.rotate, h = o.skew, p = u.skew, d = o.scale, v = u.scale;
        return a[0] != f[0] || a[1] != f[1] ? (r.push("translate(", null, ",", null, ")"),
        i.push({
            i: 1,
            x: Eo(a[0], f[0])
        }, {
            i: 3,
            x: Eo(a[1], f[1])
        })) : f[0] || f[1] ? r.push("translate(" + f + ")") : r.push(""),
        l != c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360),
        i.push({
            i: r.push(r.pop() + "rotate(", null, ")") - 2,
            x: Eo(l, c)
        })) : c && r.push(r.pop() + "rotate(" + c + ")"),
        h != p ? i.push({
            i: r.push(r.pop() + "skewX(", null, ")") - 2,
            x: Eo(h, p)
        }) : p && r.push(r.pop() + "skewX(" + p + ")"),
        d[0] != v[0] || d[1] != v[1] ? (s = r.push(r.pop() + "scale(", null, ",", null, ")"),
        i.push({
            i: s - 4,
            x: Eo(d[0], v[0])
        }, {
            i: s - 2,
            x: Eo(d[1], v[1])
        })) : (v[0] != 1 || v[1] != 1) && r.push(r.pop() + "scale(" + v + ")"),
        s = i.length,
        function(e) {
            var t = -1, n;
            while (++t < s)
                r[(n = i[t]).i] = n.x(e);
            return r.join("")
        }
    }
    function Zo(e, t) {
        return t = (t -= e = +e) || 1 / t,
        function(n) {
            return (n - e) / t
        }
    }
    function eu(e, t) {
        return t = (t -= e = +e) || 1 / t,
        function(n) {
            return Math.max(0, Math.min(1, (n - e) / t))
        }
    }
    function tu(e) {
        var t = e.source
          , n = e.target
          , r = ru(t, n)
          , i = [t];
        while (t !== r)
            t = t.parent,
            i.push(t);
        var s = i.length;
        while (n !== r)
            i.splice(s, 0, n),
            n = n.parent;
        return i
    }
    function nu(e) {
        var t = []
          , n = e.parent;
        while (n != null)
            t.push(e),
            e = n,
            n = n.parent;
        return t.push(e),
        t
    }
    function ru(e, t) {
        if (e === t)
            return e;
        var n = nu(e)
          , r = nu(t)
          , i = n.pop()
          , s = r.pop()
          , o = null;
        while (i === s)
            o = i,
            i = n.pop(),
            s = r.pop();
        return o
    }
    function iu(e) {
        e.fixed |= 2
    }
    function su(e) {
        e.fixed &= -7
    }
    function ou(e) {
        e.fixed |= 4,
        e.px = e.x,
        e.py = e.y
    }
    function uu(e) {
        e.fixed &= -5
    }
    function au(e, t, n) {
        var r = 0
          , i = 0;
        e.charge = 0;
        if (!e.leaf) {
            var s = e.nodes, o = s.length, u = -1, a;
            while (++u < o) {
                a = s[u];
                if (a == null)
                    continue;
                au(a, t, n),
                e.charge += a.charge,
                r += a.charge * a.cx,
                i += a.charge * a.cy
            }
        }
        if (e.point) {
            e.leaf || (e.point.x += Math.random() - .5,
            e.point.y += Math.random() - .5);
            var f = t * n[e.point.index];
            e.charge += e.pointCharge = f,
            r += f * e.point.x,
            i += f * e.point.y
        }
        e.cx = r / e.charge,
        e.cy = i / e.charge
    }
    function hu(t, n) {
        return e.rebind(t, n, "sort", "children", "value"),
        t.nodes = t,
        t.links = yu,
        t
    }
    function pu(e, t) {
        var n = [e];
        while ((e = n.pop()) != null) {
            t(e);
            if ((i = e.children) && (r = i.length)) {
                var r, i;
                while (--r >= 0)
                    n.push(i[r])
            }
        }
    }
    function du(e, t) {
        var n = [e]
          , r = [];
        while ((e = n.pop()) != null) {
            r.push(e);
            if ((o = e.children) && (s = o.length)) {
                var i = -1, s, o;
                while (++i < s)
                    n.push(o[i])
            }
        }
        while ((e = r.pop()) != null)
            t(e)
    }
    function vu(e) {
        return e.children
    }
    function mu(e) {
        return e.value
    }
    function gu(e, t) {
        return t.value - e.value
    }
    function yu(t) {
        return e.merge(t.map(function(e) {
            return (e.children || []).map(function(t) {
                return {
                    source: e,
                    target: t
                }
            })
        }))
    }
    function wu(e) {
        return e.x
    }
    function Eu(e) {
        return e.y
    }
    function Su(e, t, n) {
        e.y0 = t,
        e.y = n
    }
    function Nu(t) {
        return e.range(t.length)
    }
    function Cu(e) {
        var t = -1
          , n = e[0].length
          , r = [];
        while (++t < n)
            r[t] = 0;
        return r
    }
    function ku(e) {
        var t = 1, n = 0, r = e[0][1], i, s = e.length;
        for (; t < s; ++t)
            (i = e[t][1]) > r && (n = t,
            r = i);
        return n
    }
    function Lu(e) {
        return e.reduce(Au, 0)
    }
    function Au(e, t) {
        return e + t[1]
    }
    function Ou(e, t) {
        return Mu(e, Math.ceil(Math.log(t.length) / Math.LN2 + 1))
    }
    function Mu(e, t) {
        var n = -1
          , r = +e[0]
          , i = (e[1] - r) / t
          , s = [];
        while (++n <= t)
            s[n] = i * n + r;
        return s
    }
    function _u(t) {
        return [e.min(t), e.max(t)]
    }
    function Du(e, t) {
        return e.value - t.value
    }
    function Pu(e, t) {
        var n = e._pack_next;
        e._pack_next = t,
        t._pack_prev = e,
        t._pack_next = n,
        n._pack_prev = t
    }
    function Hu(e, t) {
        e._pack_next = t,
        t._pack_prev = e
    }
    function Bu(e, t) {
        var n = t.x - e.x
          , r = t.y - e.y
          , i = e.r + t.r;
        return .999 * i * i > n * n + r * r
    }
    function ju(e) {
        function p(e) {
            n = Math.min(e.x - e.r, n),
            r = Math.max(e.x + e.r, r),
            i = Math.min(e.y - e.r, i),
            s = Math.max(e.y + e.r, s)
        }
        if (!(t = e.children) || !(h = t.length))
            return;
        var t, n = Infinity, r = -Infinity, i = Infinity, s = -Infinity, o, u, a, f, l, c, h;
        t.forEach(Fu),
        o = t[0],
        o.x = -o.r,
        o.y = 0,
        p(o);
        if (h > 1) {
            u = t[1],
            u.x = u.r,
            u.y = 0,
            p(u);
            if (h > 2) {
                a = t[2],
                Ru(o, u, a),
                p(a),
                Pu(o, a),
                o._pack_prev = a,
                Pu(a, u),
                u = o._pack_next;
                for (f = 3; f < h; f++) {
                    Ru(o, u, a = t[f]);
                    var d = 0
                      , v = 1
                      , m = 1;
                    for (l = u._pack_next; l !== u; l = l._pack_next,
                    v++)
                        if (Bu(l, a)) {
                            d = 1;
                            break
                        }
                    if (d == 1)
                        for (c = o._pack_prev; c !== l._pack_prev; c = c._pack_prev,
                        m++)
                            if (Bu(c, a))
                                break;
                    d ? (v < m || v == m && u.r < o.r ? Hu(o, u = l) : Hu(o = c, u),
                    f--) : (Pu(o, a),
                    u = a,
                    p(a))
                }
            }
        }
        var g = (n + r) / 2
          , y = (i + s) / 2
          , b = 0;
        for (f = 0; f < h; f++)
            a = t[f],
            a.x -= g,
            a.y -= y,
            b = Math.max(b, a.r + Math.sqrt(a.x * a.x + a.y * a.y));
        e.r = b,
        t.forEach(Iu)
    }
    function Fu(e) {
        e._pack_next = e._pack_prev = e
    }
    function Iu(e) {
        delete e._pack_next,
        delete e._pack_prev
    }
    function qu(e, t, n, r) {
        var i = e.children;
        e.x = t += r * e.x,
        e.y = n += r * e.y,
        e.r *= r;
        if (i) {
            var s = -1
              , o = i.length;
            while (++s < o)
                qu(i[s], t, n, r)
        }
    }
    function Ru(e, t, n) {
        var r = e.r + n.r
          , i = t.x - e.x
          , s = t.y - e.y;
        if (r && (i || s)) {
            var o = t.r + n.r
              , u = i * i + s * s;
            o *= o,
            r *= r;
            var a = .5 + (r - o) / (2 * u)
              , f = Math.sqrt(Math.max(0, 2 * o * (r + u) - (r -= u) * r - o * o)) / (2 * u);
            n.x = e.x + a * i + f * s,
            n.y = e.y + a * s - f * i
        } else
            n.x = e.x + r,
            n.y = e.y
    }
    function Uu(e, t) {
        return e.parent == t.parent ? 1 : 2
    }
    function zu(e) {
        var t = e.children;
        return t.length ? t[0] : e.t
    }
    function Wu(e) {
        var t = e.children, n;
        return (n = t.length) ? t[n - 1] : e.t
    }
    function Xu(e, t, n) {
        var r = n / (t.i - e.i);
        t.c -= r,
        t.s += n,
        e.c += r,
        t.z += n,
        t.m += n
    }
    function Vu(e) {
        var t = 0, n = 0, r = e.children, i = r.length, s;
        while (--i >= 0)
            s = r[i],
            s.z += t,
            s.m += t,
            t += s.s + (n += s.c)
    }
    function $u(e, t, n) {
        return e.a.parent === t.parent ? e.a : n
    }
    function Ju(t) {
        return 1 + e.max(t, function(e) {
            return e.y
        })
    }
    function Ku(e) {
        return e.reduce(function(e, t) {
            return e + t.x
        }, 0) / e.length
    }
    function Qu(e) {
        var t = e.children;
        return t && t.length ? Qu(t[0]) : e
    }
    function Gu(e) {
        var t = e.children, n;
        return t && (n = t.length) ? Gu(t[n - 1]) : e
    }
    function Yu(e) {
        return {
            x: e.x,
            y: e.y,
            dx: e.dx,
            dy: e.dy
        }
    }
    function Zu(e, t) {
        var n = e.x + t[3]
          , r = e.y + t[0]
          , i = e.dx - t[1] - t[3]
          , s = e.dy - t[0] - t[2];
        return i < 0 && (n += i / 2,
        i = 0),
        s < 0 && (r += s / 2,
        s = 0),
        {
            x: n,
            y: r,
            dx: i,
            dy: s
        }
    }
    function ea(e) {
        var t = e[0]
          , n = e[e.length - 1];
        return t < n ? [t, n] : [n, t]
    }
    function ta(e) {
        return e.rangeExtent ? e.rangeExtent() : ea(e.range())
    }
    function na(e, t, n, r) {
        var i = n(e[0], e[1])
          , s = r(t[0], t[1]);
        return function(e) {
            return s(i(e))
        }
    }
    function ra(e, t) {
        var n = 0, r = e.length - 1, i = e[n], s = e[r], o;
        return s < i && (o = n,
        n = r,
        r = o,
        o = i,
        i = s,
        s = o),
        e[n] = t.floor(i),
        e[r] = t.ceil(s),
        e
    }
    function ia(e) {
        return e ? {
            floor: function(t) {
                return Math.floor(t / e) * e
            },
            ceil: function(t) {
                return Math.ceil(t / e) * e
            }
        } : sa
    }
    function oa(t, n, r, i) {
        var s = []
          , o = []
          , u = 0
          , a = Math.min(t.length, n.length) - 1;
        t[a] < t[0] && (t = t.slice().reverse(),
        n = n.slice().reverse());
        while (++u <= a)
            s.push(r(t[u - 1], t[u])),
            o.push(i(n[u - 1], n[u]));
        return function(n) {
            var r = e.bisect(t, n, 1, a) - 1;
            return o[r](s[r](n))
        }
    }
    function ua(e, t, n, r) {
        function o() {
            var o = Math.min(e.length, t.length) > 2 ? oa : na
              , a = r ? eu : Zo;
            return i = o(e, t, a, n),
            s = o(t, e, a, No),
            u
        }
        function u(e) {
            return i(e)
        }
        var i, s;
        return u.invert = function(e) {
            return s(e)
        }
        ,
        u.domain = function(t) {
            return arguments.length ? (e = t.map(Number),
            o()) : e
        }
        ,
        u.range = function(e) {
            return arguments.length ? (t = e,
            o()) : t
        }
        ,
        u.rangeRound = function(e) {
            return u.range(e).interpolate(Vo)
        }
        ,
        u.clamp = function(e) {
            return arguments.length ? (r = e,
            o()) : r
        }
        ,
        u.interpolate = function(e) {
            return arguments.length ? (n = e,
            o()) : n
        }
        ,
        u.ticks = function(t) {
            return ca(e, t)
        }
        ,
        u.tickFormat = function(t, n) {
            return ha(e, t, n)
        }
        ,
        u.nice = function(t) {
            return fa(e, t),
            o()
        }
        ,
        u.copy = function() {
            return ua(e, t, n, r)
        }
        ,
        o()
    }
    function aa(t, n) {
        return e.rebind(t, n, "range", "rangeRound", "interpolate", "clamp")
    }
    function fa(e, t) {
        return ra(e, ia(la(e, t)[2]))
    }
    function la(e, t) {
        t == null && (t = 10);
        var n = ea(e)
          , r = n[1] - n[0]
          , i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10))
          , s = t / r * i;
        return s <= .15 ? i *= 10 : s <= .35 ? i *= 5 : s <= .75 && (i *= 2),
        n[0] = Math.ceil(n[0] / i) * i,
        n[1] = Math.floor(n[1] / i) * i + i * .5,
        n[2] = i,
        n
    }
    function ca(t, n) {
        return e.range.apply(e, la(t, n))
    }
    function ha(t, n, r) {
        var i = la(t, n);
        if (r) {
            var s = Un.exec(r);
            s.shift();
            if (s[8] === "s") {
                var o = e.formatPrefix(Math.max(b(i[0]), b(i[1])));
                return s[7] || (s[7] = "." + da(o.scale(i[2]))),
                s[8] = "f",
                r = e.format(s.join("")),
                function(e) {
                    return r(o.scale(e)) + o.symbol
                }
            }
            s[7] || (s[7] = "." + va(s[8], i)),
            r = s.join("")
        } else
            r = ",." + da(i[2]) + "f";
        return e.format(r)
    }
    function da(e) {
        return -Math.floor(Math.log(e) / Math.LN10 + .01)
    }
    function va(e, t) {
        var n = da(t[2]);
        return e in pa ? Math.abs(n - da(Math.max(b(t[0]), b(t[1])))) + +(e !== "e") : n - (e === "%") * 2
    }
    function ma(t, n, r, i) {
        function s(e) {
            return (r ? Math.log(e < 0 ? 0 : e) : -Math.log(e > 0 ? 0 : -e)) / Math.log(n)
        }
        function o(e) {
            return r ? Math.pow(n, e) : -Math.pow(n, -e)
        }
        function u(e) {
            return t(s(e))
        }
        return u.invert = function(e) {
            return o(t.invert(e))
        }
        ,
        u.domain = function(e) {
            return arguments.length ? (r = e[0] >= 0,
            t.domain((i = e.map(Number)).map(s)),
            u) : i
        }
        ,
        u.base = function(e) {
            return arguments.length ? (n = +e,
            t.domain(i.map(s)),
            u) : n
        }
        ,
        u.nice = function() {
            var e = ra(i.map(s), r ? Math : ya);
            return t.domain(e),
            i = e.map(o),
            u
        }
        ,
        u.ticks = function() {
            var e = ea(i)
              , t = []
              , u = e[0]
              , a = e[1]
              , f = Math.floor(s(u))
              , l = Math.ceil(s(a))
              , c = n % 1 ? 2 : n;
            if (isFinite(l - f)) {
                if (r) {
                    for (; f < l; f++)
                        for (var h = 1; h < c; h++)
                            t.push(o(f) * h);
                    t.push(o(f))
                } else {
                    t.push(o(f));
                    for (; f++ < l; )
                        for (var h = c - 1; h > 0; h--)
                            t.push(o(f) * h)
                }
                for (f = 0; t[f] < u; f++)
                    ;
                for (l = t.length; t[l - 1] > a; l--)
                    ;
                t = t.slice(f, l)
            }
            return t
        }
        ,
        u.tickFormat = function(t, n) {
            if (!arguments.length)
                return ga;
            arguments.length < 2 ? n = ga : typeof n != "function" && (n = e.format(n));
            var i = Math.max(.1, t / u.ticks().length), a = r ? (f = 1e-12,
            Math.ceil) : (f = -1e-12,
            Math.floor), f;
            return function(e) {
                return e / o(a(s(e) + f)) <= i ? n(e) : ""
            }
        }
        ,
        u.copy = function() {
            return ma(t.copy(), n, r, i)
        }
        ,
        aa(u, t)
    }
    function ba(e, t, n) {
        function s(t) {
            return e(r(t))
        }
        var r = wa(t)
          , i = wa(1 / t);
        return s.invert = function(t) {
            return i(e.invert(t))
        }
        ,
        s.domain = function(t) {
            return arguments.length ? (e.domain((n = t.map(Number)).map(r)),
            s) : n
        }
        ,
        s.ticks = function(e) {
            return ca(n, e)
        }
        ,
        s.tickFormat = function(e, t) {
            return ha(n, e, t)
        }
        ,
        s.nice = function(e) {
            return s.domain(fa(n, e))
        }
        ,
        s.exponent = function(o) {
            return arguments.length ? (r = wa(t = o),
            i = wa(1 / t),
            e.domain(n.map(r)),
            s) : t
        }
        ,
        s.copy = function() {
            return ba(e.copy(), t, n)
        }
        ,
        aa(s, e)
    }
    function wa(e) {
        return function(t) {
            return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e)
        }
    }
    function Ea(t, n) {
        function o(e) {
            return i[((r.get(e) || (n.t === "range" ? r.set(e, t.push(e)) : NaN)) - 1) % i.length]
        }
        function u(n, r) {
            return e.range(t.length).map(function(e) {
                return n + r * e
            })
        }
        var r, i, s;
        return o.domain = function(e) {
            if (!arguments.length)
                return t;
            t = [],
            r = new S;
            var i = -1, s = e.length, u;
            while (++i < s)
                r.has(u = e[i]) || r.set(u, t.push(u));
            return o[n.t].apply(o, n.a)
        }
        ,
        o.range = function(e) {
            return arguments.length ? (i = e,
            s = 0,
            n = {
                t: "range",
                a: arguments
            },
            o) : i
        }
        ,
        o.rangePoints = function(e, r) {
            arguments.length < 2 && (r = 0);
            var a = e[0]
              , f = e[1]
              , l = t.length < 2 ? (a = (a + f) / 2,
            0) : (f - a) / (t.length - 1 + r);
            return i = u(a + l * r / 2, l),
            s = 0,
            n = {
                t: "rangePoints",
                a: arguments
            },
            o
        }
        ,
        o.rangeRoundPoints = function(e, r) {
            arguments.length < 2 && (r = 0);
            var a = e[0]
              , f = e[1]
              , l = t.length < 2 ? (a = f = Math.round((a + f) / 2),
            0) : (f - a) / (t.length - 1 + r) | 0;
            return i = u(a + Math.round(l * r / 2 + (f - a - (t.length - 1 + r) * l) / 2), l),
            s = 0,
            n = {
                t: "rangeRoundPoints",
                a: arguments
            },
            o
        }
        ,
        o.rangeBands = function(e, r, a) {
            arguments.length < 2 && (r = 0),
            arguments.length < 3 && (a = r);
            var f = e[1] < e[0]
              , l = e[f - 0]
              , c = e[1 - f]
              , h = (c - l) / (t.length - r + 2 * a);
            return i = u(l + h * a, h),
            f && i.reverse(),
            s = h * (1 - r),
            n = {
                t: "rangeBands",
                a: arguments
            },
            o
        }
        ,
        o.rangeRoundBands = function(e, r, a) {
            arguments.length < 2 && (r = 0),
            arguments.length < 3 && (a = r);
            var f = e[1] < e[0]
              , l = e[f - 0]
              , c = e[1 - f]
              , h = Math.floor((c - l) / (t.length - r + 2 * a));
            return i = u(l + Math.round((c - l - (t.length - r) * h) / 2), h),
            f && i.reverse(),
            s = Math.round(h * (1 - r)),
            n = {
                t: "rangeRoundBands",
                a: arguments
            },
            o
        }
        ,
        o.rangeBand = function() {
            return s
        }
        ,
        o.rangeExtent = function() {
            return ea(n.a[0])
        }
        ,
        o.copy = function() {
            return Ea(t, n)
        }
        ,
        o.domain(t)
    }
    function Ca(t, n) {
        function i() {
            var i = 0
              , o = n.length;
            r = [];
            while (++i < o)
                r[i - 1] = e.quantile(t, i / o);
            return s
        }
        function s(t) {
            if (!isNaN(t = +t))
                return n[e.bisect(r, t)]
        }
        var r;
        return s.domain = function(e) {
            return arguments.length ? (t = e.map(d).filter(v).sort(p),
            i()) : t
        }
        ,
        s.range = function(e) {
            return arguments.length ? (n = e,
            i()) : n
        }
        ,
        s.quantiles = function() {
            return r
        }
        ,
        s.invertExtent = function(e) {
            return e = n.indexOf(e),
            e < 0 ? [NaN, NaN] : [e > 0 ? r[e - 1] : t[0], e < r.length ? r[e] : t[t.length - 1]]
        }
        ,
        s.copy = function() {
            return Ca(t, n)
        }
        ,
        i()
    }
    function ka(e, t, n) {
        function s(t) {
            return n[Math.max(0, Math.min(i, Math.floor(r * (t - e))))]
        }
        function o() {
            return r = n.length / (t - e),
            i = n.length - 1,
            s
        }
        var r, i;
        return s.domain = function(n) {
            return arguments.length ? (e = +n[0],
            t = +n[n.length - 1],
            o()) : [e, t]
        }
        ,
        s.range = function(e) {
            return arguments.length ? (n = e,
            o()) : n
        }
        ,
        s.invertExtent = function(t) {
            return t = n.indexOf(t),
            t = t < 0 ? NaN : t / r + e,
            [t, t + 1 / r]
        }
        ,
        s.copy = function() {
            return ka(e, t, n)
        }
        ,
        o()
    }
    function La(t, n) {
        function r(r) {
            if (r <= r)
                return n[e.bisect(t, r)]
        }
        return r.domain = function(e) {
            return arguments.length ? (t = e,
            r) : t
        }
        ,
        r.range = function(e) {
            return arguments.length ? (n = e,
            r) : n
        }
        ,
        r.invertExtent = function(e) {
            return e = n.indexOf(e),
            [t[e - 1], t[e]]
        }
        ,
        r.copy = function() {
            return La(t, n)
        }
        ,
        r
    }
    function Aa(e) {
        function t(e) {
            return +e
        }
        return t.invert = t,
        t.domain = t.range = function(n) {
            return arguments.length ? (e = n.map(t),
            t) : e
        }
        ,
        t.ticks = function(t) {
            return ca(e, t)
        }
        ,
        t.tickFormat = function(t, n) {
            return ha(e, t, n)
        }
        ,
        t.copy = function() {
            return Aa(e)
        }
        ,
        t
    }
    function Oa() {
        return 0
    }
    function _a(e) {
        return e.innerRadius
    }
    function Da(e) {
        return e.outerRadius
    }
    function Pa(e) {
        return e.startAngle
    }
    function Ha(e) {
        return e.endAngle
    }
    function Ba(e) {
        return e && e.padAngle
    }
    function ja(e, t, n, r) {
        return (e - n) * t - (t - r) * e > 0 ? 0 : 1
    }
    function Fa(e, t, n, r, i) {
        var s = e[0] - t[0]
          , o = e[1] - t[1]
          , u = (i ? r : -r) / Math.sqrt(s * s + o * o)
          , a = u * o
          , f = -u * s
          , l = e[0] + a
          , c = e[1] + f
          , h = t[0] + a
          , p = t[1] + f
          , d = (l + h) / 2
          , v = (c + p) / 2
          , m = h - l
          , g = p - c
          , y = m * m + g * g
          , b = n - r
          , w = l * p - h * c
          , E = (g < 0 ? -1 : 1) * Math.sqrt(b * b * y - w * w)
          , S = (w * g - m * E) / y
          , x = (-w * m - g * E) / y
          , T = (w * g + m * E) / y
          , N = (-w * m + g * E) / y
          , C = S - d
          , k = x - v
          , L = T - d
          , A = N - v;
        return C * C + k * k > L * L + A * A && (S = T,
        x = N),
        [[S - a, x - f], [S * n / b, x * n / b]]
    }
    function Ia(e) {
        function u(s) {
            function d() {
                u.push("M", i(e(a), o))
            }
            var u = [], a = [], f = -1, l = s.length, c, h = Tn(t), p = Tn(n);
            while (++f < l)
                r.call(this, c = s[f], f) ? a.push([+h.call(this, c, f), +p.call(this, c, f)]) : a.length && (d(),
                a = []);
            return a.length && d(),
            u.length ? u.join("") : null
        }
        var t = xs
          , n = Ts
          , r = oi
          , i = Ra
          , s = i.key
          , o = .7;
        return u.x = function(e) {
            return arguments.length ? (t = e,
            u) : t
        }
        ,
        u.y = function(e) {
            return arguments.length ? (n = e,
            u) : n
        }
        ,
        u.defined = function(e) {
            return arguments.length ? (r = e,
            u) : r
        }
        ,
        u.interpolate = function(e) {
            return arguments.length ? (typeof e == "function" ? s = i = e : s = (i = qa.get(e) || Ra).key,
            u) : s
        }
        ,
        u.tension = function(e) {
            return arguments.length ? (o = e,
            u) : o
        }
        ,
        u
    }
    function Ra(e) {
        return e.join("L")
    }
    function Ua(e) {
        return Ra(e) + "Z"
    }
    function za(e) {
        var t = 0
          , n = e.length
          , r = e[0]
          , i = [r[0], ",", r[1]];
        while (++t < n)
            i.push("H", (r[0] + (r = e[t])[0]) / 2, "V", r[1]);
        return n > 1 && i.push("H", r[0]),
        i.join("")
    }
    function Wa(e) {
        var t = 0
          , n = e.length
          , r = e[0]
          , i = [r[0], ",", r[1]];
        while (++t < n)
            i.push("V", (r = e[t])[1], "H", r[0]);
        return i.join("")
    }
    function Xa(e) {
        var t = 0
          , n = e.length
          , r = e[0]
          , i = [r[0], ",", r[1]];
        while (++t < n)
            i.push("H", (r = e[t])[0], "V", r[1]);
        return i.join("")
    }
    function Va(e, t) {
        return e.length < 4 ? Ra(e) : e[1] + Ka(e.slice(1, -1), Qa(e, t))
    }
    function $a(e, t) {
        return e.length < 3 ? Ra(e) : e[0] + Ka((e.push(e[0]),
        e), Qa([e[e.length - 2]].concat(e, [e[1]]), t))
    }
    function Ja(e, t) {
        return e.length < 3 ? Ra(e) : e[0] + Ka(e, Qa(e, t))
    }
    function Ka(e, t) {
        if (t.length < 1 || e.length != t.length && e.length != t.length + 2)
            return Ra(e);
        var n = e.length != t.length
          , r = ""
          , i = e[0]
          , s = e[1]
          , o = t[0]
          , u = o
          , a = 1;
        n && (r += "Q" + (s[0] - o[0] * 2 / 3) + "," + (s[1] - o[1] * 2 / 3) + "," + s[0] + "," + s[1],
        i = e[1],
        a = 2);
        if (t.length > 1) {
            u = t[1],
            s = e[a],
            a++,
            r += "C" + (i[0] + o[0]) + "," + (i[1] + o[1]) + "," + (s[0] - u[0]) + "," + (s[1] - u[1]) + "," + s[0] + "," + s[1];
            for (var f = 2; f < t.length; f++,
            a++)
                s = e[a],
                u = t[f],
                r += "S" + (s[0] - u[0]) + "," + (s[1] - u[1]) + "," + s[0] + "," + s[1]
        }
        if (n) {
            var l = e[a];
            r += "Q" + (s[0] + u[0] * 2 / 3) + "," + (s[1] + u[1] * 2 / 3) + "," + l[0] + "," + l[1]
        }
        return r
    }
    function Qa(e, t) {
        var n = [], r = (1 - t) / 2, i, s = e[0], o = e[1], u = 1, a = e.length;
        while (++u < a)
            i = s,
            s = o,
            o = e[u],
            n.push([r * (o[0] - i[0]), r * (o[1] - i[1])]);
        return n
    }
    function Ga(e) {
        if (e.length < 3)
            return Ra(e);
        var t = 1
          , n = e.length
          , r = e[0]
          , i = r[0]
          , s = r[1]
          , o = [i, i, i, (r = e[1])[0]]
          , u = [s, s, s, r[1]]
          , a = [i, ",", s, "L", tf(sf, o), ",", tf(sf, u)];
        e.push(e[n - 1]);
        while (++t <= n)
            r = e[t],
            o.shift(),
            o.push(r[0]),
            u.shift(),
            u.push(r[1]),
            of(a, o, u);
        return e.pop(),
        a.push("L", r),
        a.join("")
    }
    function Ya(e) {
        if (e.length < 4)
            return Ra(e);
        var t = [], n = -1, r = e.length, i, s = [0], o = [0];
        while (++n < 3)
            i = e[n],
            s.push(i[0]),
            o.push(i[1]);
        t.push(tf(sf, s) + "," + tf(sf, o)),
        --n;
        while (++n < r)
            i = e[n],
            s.shift(),
            s.push(i[0]),
            o.shift(),
            o.push(i[1]),
            of(t, s, o);
        return t.join("")
    }
    function Za(e) {
        var t, n = -1, r = e.length, i = r + 4, s, o = [], u = [];
        while (++n < 4)
            s = e[n % r],
            o.push(s[0]),
            u.push(s[1]);
        t = [tf(sf, o), ",", tf(sf, u)],
        --n;
        while (++n < i)
            s = e[n % r],
            o.shift(),
            o.push(s[0]),
            u.shift(),
            u.push(s[1]),
            of(t, o, u);
        return t.join("")
    }
    function ef(e, t) {
        var n = e.length - 1;
        if (n) {
            var r = e[0][0], i = e[0][1], s = e[n][0] - r, o = e[n][1] - i, u = -1, a, f;
            while (++u <= n)
                a = e[u],
                f = u / n,
                a[0] = t * a[0] + (1 - t) * (r + f * s),
                a[1] = t * a[1] + (1 - t) * (i + f * o)
        }
        return Ga(e)
    }
    function tf(e, t) {
        return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
    }
    function of(e, t, n) {
        e.push("C", tf(nf, t), ",", tf(nf, n), ",", tf(rf, t), ",", tf(rf, n), ",", tf(sf, t), ",", tf(sf, n))
    }
    function uf(e, t) {
        return (t[1] - e[1]) / (t[0] - e[0])
    }
    function af(e) {
        var t = 0
          , n = e.length - 1
          , r = []
          , i = e[0]
          , s = e[1]
          , o = r[0] = uf(i, s);
        while (++t < n)
            r[t] = (o + (o = uf(i = s, s = e[t + 1]))) / 2;
        return r[t] = o,
        r
    }
    function ff(e) {
        var t = [], n, r, i, s, o = af(e), u = -1, a = e.length - 1;
        while (++u < a)
            n = uf(e[u], e[u + 1]),
            b(n) < Ct ? o[u] = o[u + 1] = 0 : (r = o[u] / n,
            i = o[u + 1] / n,
            s = r * r + i * i,
            s > 9 && (s = n * 3 / Math.sqrt(s),
            o[u] = s * r,
            o[u + 1] = s * i));
        u = -1;
        while (++u <= a)
            s = (e[Math.min(a, u + 1)][0] - e[Math.max(0, u - 1)][0]) / (6 * (1 + o[u] * o[u])),
            t.push([s || 0, o[u] * s || 0]);
        return t
    }
    function lf(e) {
        return e.length < 3 ? Ra(e) : e[0] + Ka(e, ff(e))
    }
    function cf(e) {
        var t, n = -1, r = e.length, i, s;
        while (++n < r)
            t = e[n],
            i = t[0],
            s = t[1] - Mt,
            t[0] = i * Math.cos(s),
            t[1] = i * Math.sin(s);
        return e
    }
    function hf(e) {
        function c(u) {
            function x() {
                c.push("M", o(e(p), l), f, a(e(h.reverse()), l), "Z")
            }
            var c = [], h = [], p = [], d = -1, v = u.length, m, g = Tn(t), y = Tn(r), b = t === n ? function() {
                return E
            }
            : Tn(n), w = r === i ? function() {
                return S
            }
            : Tn(i), E, S;
            while (++d < v)
                s.call(this, m = u[d], d) ? (h.push([E = +g.call(this, m, d), S = +y.call(this, m, d)]),
                p.push([+b.call(this, m, d), +w.call(this, m, d)])) : h.length && (x(),
                h = [],
                p = []);
            return h.length && x(),
            c.length ? c.join("") : null
        }
        var t = xs
          , n = xs
          , r = 0
          , i = Ts
          , s = oi
          , o = Ra
          , u = o.key
          , a = o
          , f = "L"
          , l = .7;
        return c.x = function(e) {
            return arguments.length ? (t = n = e,
            c) : n
        }
        ,
        c.x0 = function(e) {
            return arguments.length ? (t = e,
            c) : t
        }
        ,
        c.x1 = function(e) {
            return arguments.length ? (n = e,
            c) : n
        }
        ,
        c.y = function(e) {
            return arguments.length ? (r = i = e,
            c) : i
        }
        ,
        c.y0 = function(e) {
            return arguments.length ? (r = e,
            c) : r
        }
        ,
        c.y1 = function(e) {
            return arguments.length ? (i = e,
            c) : i
        }
        ,
        c.defined = function(e) {
            return arguments.length ? (s = e,
            c) : s
        }
        ,
        c.interpolate = function(e) {
            return arguments.length ? (typeof e == "function" ? u = o = e : u = (o = qa.get(e) || Ra).key,
            a = o.reverse || o,
            f = o.closed ? "M" : "L",
            c) : u
        }
        ,
        c.tension = function(e) {
            return arguments.length ? (l = e,
            c) : l
        }
        ,
        c
    }
    function pf(e) {
        return e.radius
    }
    function df(e) {
        return [e.x, e.y]
    }
    function vf(e) {
        return function() {
            var t = e.apply(this, arguments)
              , n = t[0]
              , r = t[1] - Mt;
            return [n * Math.cos(r), n * Math.sin(r)]
        }
    }
    function mf() {
        return 64
    }
    function gf() {
        return "circle"
    }
    function yf(e) {
        var t = Math.sqrt(e / Lt);
        return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z"
    }
    function xf(e) {
        return function() {
            var t, n;
            (t = this[e]) && (n = t[t.active]) && (--t.count ? delete t[t.active] : delete this[e],
            t.active += .5,
            n.event && n.event.interrupt.call(this, this.__data__, n.index))
        }
    }
    function Tf(e, t, n) {
        return W(e, Nf),
        e.namespace = t,
        e.id = n,
        e
    }
    function Af(e, t, n, r) {
        var i = e.id
          , s = e.namespace;
        return ht(e, typeof n == "function" ? function(e, o, u) {
            e[s][i].tween.set(t, r(n.call(e, e.__data__, o, u)))
        }
        : (n = r(n),
        function(e) {
            e[s][i].tween.set(t, n)
        }
        ))
    }
    function Of(e) {
        return e == null && (e = ""),
        function() {
            this.textContent = e
        }
    }
    function Mf(e) {
        return e == null ? "__transition__" : "__transition_" + e + "__"
    }
    function _f(t, n, r, i, s) {
        var o = t[r] || (t[r] = {
            active: 0,
            count: 0
        })
          , u = o[i];
        if (!u) {
            var a = s.time;
            u = o[i] = {
                tween: new S,
                time: a,
                delay: s.delay,
                duration: s.duration,
                ease: s.ease,
                index: n
            },
            s = null,
            ++o.count,
            e.timer(function(s) {
                function d(r) {
                    if (o.active > i)
                        return m();
                    var s = o[o.active];
                    s && (--o.count,
                    delete o[o.active],
                    s.event && s.event.interrupt.call(t, t.__data__, s.index)),
                    o.active = i,
                    u.event && u.event.start.call(t, t.__data__, n),
                    u.tween.forEach(function(e, r) {
                        (r = r.call(t, t.__data__, n)) && p.push(r)
                    }),
                    c = u.ease,
                    l = u.duration,
                    e.timer(function() {
                        return h.c = v(r || 1) ? oi : v,
                        1
                    }, 0, a)
                }
                function v(e) {
                    if (o.active !== i)
                        return 1;
                    var r = e / l
                      , s = c(r)
                      , a = p.length;
                    while (a > 0)
                        p[--a].call(t, s);
                    if (r >= 1)
                        return u.event && u.event.end.call(t, t.__data__, n),
                        m()
                }
                function m() {
                    return --o.count ? delete o[i] : delete t[r],
                    1
                }
                var f = u.delay, l, c, h = Dn, p = [];
                h.t = f + a;
                if (f <= s)
                    return d(s - f);
                h.c = d
            }, 0, a)
        }
    }
    function Hf(e, t, n) {
        e.attr("transform", function(e) {
            var r = t(e);
            return "translate(" + (isFinite(r) ? r : n(e)) + ",0)"
        })
    }
    function Bf(e, t, n) {
        e.attr("transform", function(e) {
            var r = t(e);
            return "translate(0," + (isFinite(r) ? r : n(e)) + ")"
        })
    }
    function Uf(e) {
        return e.toISOString()
    }
    function zf(t, n, r) {
        function i(e) {
            return t(e)
        }
        function s(t, r) {
            var i = t[1] - t[0]
              , s = i / r
              , o = e.bisect(Xf, s);
            return o == Xf.length ? [n.year, la(t.map(function(e) {
                return e / 31536e6
            }), r)[2]] : o ? n[s / Xf[o - 1] < Xf[o] / s ? o - 1 : o] : [Jf, la(t, r)[2]]
        }
        return i.invert = function(e) {
            return Wf(t.invert(e))
        }
        ,
        i.domain = function(e) {
            return arguments.length ? (t.domain(e),
            i) : t.domain().map(Wf)
        }
        ,
        i.nice = function(e, t) {
            function u(n) {
                return !isNaN(n) && !e.range(n, Wf(+n + 1), t).length
            }
            var n = i.domain()
              , r = ea(n)
              , o = e == null ? s(r, 10) : typeof e == "number" && s(r, e);
            return o && (e = o[0],
            t = o[1]),
            i.domain(ra(n, t > 1 ? {
                floor: function(t) {
                    while (u(t = e.floor(t)))
                        t = Wf(t - 1);
                    return t
                },
                ceil: function(t) {
                    while (u(t = e.ceil(t)))
                        t = Wf(+t + 1);
                    return t
                }
            } : e))
        }
        ,
        i.ticks = function(e, t) {
            var n = ea(i.domain())
              , r = e == null ? s(n, 10) : typeof e == "number" ? s(n, e) : !e.range && [{
                range: e
            }, t];
            return r && (e = r[0],
            t = r[1]),
            e.range(n[0], Wf(+n[1] + 1), t < 1 ? 1 : t)
        }
        ,
        i.tickFormat = function() {
            return r
        }
        ,
        i.copy = function() {
            return zf(t.copy(), n, r)
        }
        ,
        aa(i, t)
    }
    function Wf(e) {
        return new Date(e)
    }
    function Gf(e) {
        return JSON.parse(e.responseText)
    }
    function Yf(e) {
        var t = r.createRange();
        return t.selectNode(r.body),
        t.createContextualFragment(e.responseText)
    }
    var e = {
        version: "3.5.4"
    }
      , t = [].slice
      , n = function(e) {
        return t.call(e)
    }
      , r = this.document;
    if (r)
        try {
            n(r.documentElement.childNodes)[0].nodeType
        } catch (o) {
            n = function(e) {
                var t = e.length
                  , n = new Array(t);
                while (t--)
                    n[t] = e[t];
                return n
            }
        }
    Date.now || (Date.now = function() {
        return +(new Date)
    }
    );
    if (r)
        try {
            r.createElement("DIV").style.setProperty("opacity", 0, "")
        } catch (u) {
            var a = this.Element.prototype
              , f = a.setAttribute
              , l = a.setAttributeNS
              , c = this.CSSStyleDeclaration.prototype
              , h = c.setProperty;
            a.setAttribute = function(e, t) {
                f.call(this, e, t + "")
            }
            ,
            a.setAttributeNS = function(e, t, n) {
                l.call(this, e, t, n + "")
            }
            ,
            c.setProperty = function(e, t, n) {
                h.call(this, e, t + "", n)
            }
        }
    e.ascending = p,
    e.descending = function(e, t) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
    }
    ,
    e.min = function(e, t) {
        var n = -1, r = e.length, i, s;
        if (arguments.length === 1) {
            while (++n < r)
                if ((s = e[n]) != null && s >= s) {
                    i = s;
                    break
                }
            while (++n < r)
                (s = e[n]) != null && i > s && (i = s)
        } else {
            while (++n < r)
                if ((s = t.call(e, e[n], n)) != null && s >= s) {
                    i = s;
                    break
                }
            while (++n < r)
                (s = t.call(e, e[n], n)) != null && i > s && (i = s)
        }
        return i
    }
    ,
    e.max = function(e, t) {
        var n = -1, r = e.length, i, s;
        if (arguments.length === 1) {
            while (++n < r)
                if ((s = e[n]) != null && s >= s) {
                    i = s;
                    break
                }
            while (++n < r)
                (s = e[n]) != null && s > i && (i = s)
        } else {
            while (++n < r)
                if ((s = t.call(e, e[n], n)) != null && s >= s) {
                    i = s;
                    break
                }
            while (++n < r)
                (s = t.call(e, e[n], n)) != null && s > i && (i = s)
        }
        return i
    }
    ,
    e.extent = function(e, t) {
        var n = -1, r = e.length, i, s, o;
        if (arguments.length === 1) {
            while (++n < r)
                if ((s = e[n]) != null && s >= s) {
                    i = o = s;
                    break
                }
            while (++n < r)
                (s = e[n]) != null && (i > s && (i = s),
                o < s && (o = s))
        } else {
            while (++n < r)
                if ((s = t.call(e, e[n], n)) != null && s >= s) {
                    i = o = s;
                    break
                }
            while (++n < r)
                (s = t.call(e, e[n], n)) != null && (i > s && (i = s),
                o < s && (o = s))
        }
        return [i, o]
    }
    ,
    e.sum = function(e, t) {
        var n = 0, r = e.length, i, s = -1;
        if (arguments.length === 1)
            while (++s < r)
                v(i = +e[s]) && (n += i);
        else
            while (++s < r)
                v(i = +t.call(e, e[s], s)) && (n += i);
        return n
    }
    ,
    e.mean = function(e, t) {
        var n = 0, r = e.length, i, s = -1, o = r;
        if (arguments.length === 1)
            while (++s < r)
                v(i = d(e[s])) ? n += i : --o;
        else
            while (++s < r)
                v(i = d(t.call(e, e[s], s))) ? n += i : --o;
        if (o)
            return n / o
    }
    ,
    e.quantile = function(e, t) {
        var n = (e.length - 1) * t + 1
          , r = Math.floor(n)
          , i = +e[r - 1]
          , s = n - r;
        return s ? i + s * (e[r] - i) : i
    }
    ,
    e.median = function(t, n) {
        var r = [], i = t.length, s, o = -1;
        if (arguments.length === 1)
            while (++o < i)
                v(s = d(t[o])) && r.push(s);
        else
            while (++o < i)
                v(s = d(n.call(t, t[o], o))) && r.push(s);
        if (r.length)
            return e.quantile(r.sort(p), .5)
    }
    ,
    e.variance = function(e, t) {
        var n = e.length, r = 0, i, s, o = 0, u = -1, a = 0;
        if (arguments.length === 1)
            while (++u < n)
                v(i = d(e[u])) && (s = i - r,
                r += s / ++a,
                o += s * (i - r));
        else
            while (++u < n)
                v(i = d(t.call(e, e[u], u))) && (s = i - r,
                r += s / ++a,
                o += s * (i - r));
        if (a > 1)
            return o / (a - 1)
    }
    ,
    e.deviation = function() {
        var t = e.variance.apply(this, arguments);
        return t ? Math.sqrt(t) : t
    }
    ;
    var g = m(p);
    e.bisectLeft = g.left,
    e.bisect = e.bisectRight = g.right,
    e.bisector = function(e) {
        return m(e.length === 1 ? function(t, n) {
            return p(e(t), n)
        }
        : e)
    }
    ,
    e.shuffle = function(e, t, n) {
        (r = arguments.length) < 3 && (n = e.length,
        r < 2 && (t = 0));
        var r = n - t, i, s;
        while (r)
            s = Math.random() * r-- | 0,
            i = e[r + t],
            e[r + t] = e[s + t],
            e[s + t] = i;
        return e
    }
    ,
    e.permute = function(e, t) {
        var n = t.length
          , r = new Array(n);
        while (n--)
            r[n] = e[t[n]];
        return r
    }
    ,
    e.pairs = function(e) {
        var t = 0, n = e.length - 1, r, i = e[0], s = new Array(n < 0 ? 0 : n);
        while (t < n)
            s[t] = [r = i, i = e[++t]];
        return s
    }
    ,
    e.zip = function() {
        if (!(s = arguments.length))
            return [];
        for (var t = -1, n = e.min(arguments, y), r = new Array(n); ++t < n; )
            for (var i = -1, s, o = r[t] = new Array(s); ++i < s; )
                o[i] = arguments[i][t];
        return r
    }
    ,
    e.transpose = function(t) {
        return e.zip.apply(e, t)
    }
    ,
    e.keys = function(e) {
        var t = [];
        for (var n in e)
            t.push(n);
        return t
    }
    ,
    e.values = function(e) {
        var t = [];
        for (var n in e)
            t.push(e[n]);
        return t
    }
    ,
    e.entries = function(e) {
        var t = [];
        for (var n in e)
            t.push({
                key: n,
                value: e[n]
            });
        return t
    }
    ,
    e.merge = function(e) {
        var t = e.length, n, r = -1, i = 0, s, o;
        while (++r < t)
            i += e[r].length;
        s = new Array(i);
        while (--t >= 0) {
            o = e[t],
            n = o.length;
            while (--n >= 0)
                s[--i] = o[n]
        }
        return s
    }
    ;
    var b = Math.abs;
    e.range = function(e, t, n) {
        arguments.length < 3 && (n = 1,
        arguments.length < 2 && (t = e,
        e = 0));
        if ((t - e) / n === Infinity)
            throw new Error("infinite range");
        var r = [], i = w(b(n)), s = -1, o;
        e *= i,
        t *= i,
        n *= i;
        if (n < 0)
            while ((o = e + n * ++s) > t)
                r.push(o / i);
        else
            while ((o = e + n * ++s) < t)
                r.push(o / i);
        return r
    }
    ,
    e.map = function(e, t) {
        var n = new S;
        if (e instanceof S)
            e.forEach(function(e, t) {
                n.set(e, t)
            });
        else if (Array.isArray(e)) {
            var r = -1, i = e.length, s;
            if (arguments.length === 1)
                while (++r < i)
                    n.set(r, e[r]);
            else
                while (++r < i)
                    n.set(t.call(e, s = e[r], r), s)
        } else
            for (var o in e)
                n.set(o, e[o]);
        return n
    }
    ;
    var x = "__proto__"
      , T = "\0";
    E(S, {
        has: k,
        get: function(e) {
            return this._[N(e)]
        },
        set: function(e, t) {
            return this._[N(e)] = t
        },
        remove: L,
        keys: A,
        values: function() {
            var e = [];
            for (var t in this._)
                e.push(this._[t]);
            return e
        },
        entries: function() {
            var e = [];
            for (var t in this._)
                e.push({
                    key: C(t),
                    value: this._[t]
                });
            return e
        },
        size: O,
        empty: M,
        forEach: function(e) {
            for (var t in this._)
                e.call(this, C(t), this._[t])
        }
    }),
    e.nest = function() {
        function o(e, r, u) {
            if (u >= n.length)
                return s ? s.call(t, r) : i ? r.sort(i) : r;
            var a = -1, f = r.length, l = n[u++], c, h, p, d = new S, v;
            while (++a < f)
                (v = d.get(c = l(h = r[a]))) ? v.push(h) : d.set(c, [h]);
            return e ? (h = e(),
            p = function(t, n) {
                h.set(t, o(e, n, u))
            }
            ) : (h = {},
            p = function(t, n) {
                h[t] = o(e, n, u)
            }
            ),
            d.forEach(p),
            h
        }
        function u(e, t) {
            if (t >= n.length)
                return e;
            var i = []
              , s = r[t++];
            return e.forEach(function(e, n) {
                i.push({
                    key: e,
                    values: u(n, t)
                })
            }),
            s ? i.sort(function(e, t) {
                return s(e.key, t.key)
            }) : i
        }
        var t = {}, n = [], r = [], i, s;
        return t.map = function(e, t) {
            return o(t, e, 0)
        }
        ,
        t.entries = function(t) {
            return u(o(e.map, t, 0), 0)
        }
        ,
        t.key = function(e) {
            return n.push(e),
            t
        }
        ,
        t.sortKeys = function(e) {
            return r[n.length - 1] = e,
            t
        }
        ,
        t.sortValues = function(e) {
            return i = e,
            t
        }
        ,
        t.rollup = function(e) {
            return s = e,
            t
        }
        ,
        t
    }
    ,
    e.set = function(e) {
        var t = new _;
        if (e)
            for (var n = 0, r = e.length; n < r; ++n)
                t.add(e[n]);
        return t
    }
    ,
    E(_, {
        has: k,
        add: function(e) {
            return this._[N(e += "")] = !0,
            e
        },
        remove: L,
        values: A,
        size: O,
        empty: M,
        forEach: function(e) {
            for (var t in this._)
                e.call(this, C(t))
        }
    }),
    e.behavior = {},
    e.rebind = function(e, t) {
        var n = 1, r = arguments.length, i;
        while (++n < r)
            e[i = arguments[n]] = P(e, t, t[i]);
        return e
    }
    ;
    var B = ["webkit", "ms", "moz", "Moz", "o", "O"];
    e.dispatch = function() {
        var e = new F
          , t = -1
          , n = arguments.length;
        while (++t < n)
            e[arguments[t]] = I(e);
        return e
    }
    ,
    F.prototype.on = function(e, t) {
        var n = e.indexOf(".")
          , r = "";
        n >= 0 && (r = e.slice(n + 1),
        e = e.slice(0, n));
        if (e)
            return arguments.length < 2 ? this[e].on(r) : this[e].on(r, t);
        if (arguments.length === 2) {
            if (t == null)
                for (e in this)
                    this.hasOwnProperty(e) && this[e].on(r, null);
            return this
        }
    }
    ,
    e.event = null,
    e.requote = function(e) {
        return e.replace(z, "\\$&")
    }
    ;
    var z = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g
      , W = {}.__proto__ ? function(e, t) {
        e.__proto__ = t
    }
    : function(e, t) {
        for (var n in t)
            e[n] = t[n]
    }
      , V = function(e, t) {
        return t.querySelector(e)
    }
      , $ = function(e, t) {
        return t.querySelectorAll(e)
    }
      , J = function(e, t) {
        var n = e.matches || e[H(e, "matchesSelector")];
        return J = function(e, t) {
            return n.call(e, t)
        }
        ,
        J(e, t)
    };
    typeof Sizzle == "function" && (V = function(e, t) {
        return Sizzle(e, t)[0] || null
    }
    ,
    $ = Sizzle,
    J = Sizzle.matchesSelector),
    e.selection = function() {
        return e.select(r.documentElement)
    }
    ;
    var K = e.selection.prototype = [];
    K.select = function(e) {
        var t = [], n, r, i, s;
        e = Q(e);
        for (var o = -1, u = this.length; ++o < u; ) {
            t.push(n = []),
            n.parentNode = (i = this[o]).parentNode;
            for (var a = -1, f = i.length; ++a < f; )
                (s = i[a]) ? (n.push(r = e.call(s, s.__data__, a, o)),
                r && "__data__"in s && (r.__data__ = s.__data__)) : n.push(null)
        }
        return X(t)
    }
    ,
    K.selectAll = function(e) {
        var t = [], r, i;
        e = G(e);
        for (var s = -1, o = this.length; ++s < o; )
            for (var u = this[s], a = -1, f = u.length; ++a < f; )
                if (i = u[a])
                    t.push(r = n(e.call(i, i.__data__, a, s))),
                    r.parentNode = i;
        return X(t)
    }
    ;
    var Y = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    e.ns = {
        prefix: Y,
        qualify: function(e) {
            var t = e.indexOf(":")
              , n = e;
            return t >= 0 && (n = e.slice(0, t),
            e = e.slice(t + 1)),
            Y.hasOwnProperty(n) ? {
                space: Y[n],
                local: e
            } : e
        }
    },
    K.attr = function(t, n) {
        if (arguments.length < 2) {
            if (typeof t == "string") {
                var r = this.node();
                return t = e.ns.qualify(t),
                t.local ? r.getAttributeNS(t.space, t.local) : r.getAttribute(t)
            }
            for (n in t)
                this.each(Z(n, t[n]));
            return this
        }
        return this.each(Z(t, n))
    }
    ,
    K.classed = function(e, t) {
        if (arguments.length < 2) {
            if (typeof e == "string") {
                var n = this.node()
                  , r = (e = nt(e)).length
                  , i = -1;
                if (t = n.classList) {
                    while (++i < r)
                        if (!t.contains(e[i]))
                            return !1
                } else {
                    t = n.getAttribute("class");
                    while (++i < r)
                        if (!tt(e[i]).test(t))
                            return !1
                }
                return !0
            }
            for (t in e)
                this.each(rt(t, e[t]));
            return this
        }
        return this.each(rt(e, t))
    }
    ,
    K.style = function(e, t, n) {
        var r = arguments.length;
        if (r < 3) {
            if (typeof e != "string") {
                r < 2 && (t = "");
                for (n in e)
                    this.each(st(n, e[n], t));
                return this
            }
            if (r < 2) {
                var i = this.node();
                return s(i).getComputedStyle(i, null).getPropertyValue(e)
            }
            n = ""
        }
        return this.each(st(e, t, n))
    }
    ,
    K.property = function(e, t) {
        if (arguments.length < 2) {
            if (typeof e == "string")
                return this.node()[e];
            for (t in e)
                this.each(ot(t, e[t]));
            return this
        }
        return this.each(ot(e, t))
    }
    ,
    K.text = function(e) {
        return arguments.length ? this.each(typeof e == "function" ? function() {
            var t = e.apply(this, arguments);
            this.textContent = t == null ? "" : t
        }
        : e == null ? function() {
            this.textContent = ""
        }
        : function() {
            this.textContent = e
        }
        ) : this.node().textContent
    }
    ,
    K.html = function(e) {
        return arguments.length ? this.each(typeof e == "function" ? function() {
            var t = e.apply(this, arguments);
            this.innerHTML = t == null ? "" : t
        }
        : e == null ? function() {
            this.innerHTML = ""
        }
        : function() {
            this.innerHTML = e
        }
        ) : this.node().innerHTML
    }
    ,
    K.append = function(e) {
        return e = ut(e),
        this.select(function() {
            return this.appendChild(e.apply(this, arguments))
        })
    }
    ,
    K.insert = function(e, t) {
        return e = ut(e),
        t = Q(t),
        this.select(function() {
            return this.insertBefore(e.apply(this, arguments), t.apply(this, arguments) || null)
        })
    }
    ,
    K.remove = function() {
        return this.each(at)
    }
    ,
    K.data = function(e, t) {
        function o(e, n) {
            var r, i = e.length, s = n.length, o = Math.min(i, s), l = new Array(s), c = new Array(s), h = new Array(i), p, d;
            if (t) {
                var v = new S, m = new Array(i), g;
                for (r = -1; ++r < i; )
                    v.has(g = t.call(p = e[r], p.__data__, r)) ? h[r] = p : v.set(g, p),
                    m[r] = g;
                for (r = -1; ++r < s; )
                    (p = v.get(g = t.call(n, d = n[r], r))) ? p !== !0 && (l[r] = p,
                    p.__data__ = d) : c[r] = ft(d),
                    v.set(g, !0);
                for (r = -1; ++r < i; )
                    v.get(m[r]) !== !0 && (h[r] = e[r])
            } else {
                for (r = -1; ++r < o; )
                    p = e[r],
                    d = n[r],
                    p ? (p.__data__ = d,
                    l[r] = p) : c[r] = ft(d);
                for (; r < s; ++r)
                    c[r] = ft(n[r]);
                for (; r < i; ++r)
                    h[r] = e[r]
            }
            c.update = l,
            c.parentNode = l.parentNode = h.parentNode = e.parentNode,
            u.push(c),
            a.push(l),
            f.push(h)
        }
        var n = -1, r = this.length, i, s;
        if (!arguments.length) {
            e = new Array(r = (i = this[0]).length);
            while (++n < r)
                if (s = i[n])
                    e[n] = s.__data__;
            return e
        }
        var u = pt([])
          , a = X([])
          , f = X([]);
        if (typeof e == "function")
            while (++n < r)
                o(i = this[n], e.call(i, i.parentNode.__data__, n));
        else
            while (++n < r)
                o(i = this[n], e);
        return a.enter = function() {
            return u
        }
        ,
        a.exit = function() {
            return f
        }
        ,
        a
    }
    ,
    K.datum = function(e) {
        return arguments.length ? this.property("__data__", e) : this.property("__data__")
    }
    ,
    K.filter = function(e) {
        var t = [], n, r, i;
        typeof e != "function" && (e = lt(e));
        for (var s = 0, o = this.length; s < o; s++) {
            t.push(n = []),
            n.parentNode = (r = this[s]).parentNode;
            for (var u = 0, a = r.length; u < a; u++)
                (i = r[u]) && e.call(i, i.__data__, u, s) && n.push(i)
        }
        return X(t)
    }
    ,
    K.order = function() {
        for (var e = -1, t = this.length; ++e < t; )
            for (var n = this[e], r = n.length - 1, i = n[r], s; --r >= 0; )
                if (s = n[r])
                    i && i !== s.nextSibling && i.parentNode.insertBefore(s, i),
                    i = s;
        return this
    }
    ,
    K.sort = function(e) {
        e = ct.apply(this, arguments);
        for (var t = -1, n = this.length; ++t < n; )
            this[t].sort(e);
        return this.order()
    }
    ,
    K.each = function(e) {
        return ht(this, function(t, n, r) {
            e.call(t, t.__data__, n, r)
        })
    }
    ,
    K.call = function(e) {
        var t = n(arguments);
        return e.apply(t[0] = this, t),
        this
    }
    ,
    K.empty = function() {
        return !this.node()
    }
    ,
    K.node = function() {
        for (var e = 0, t = this.length; e < t; e++)
            for (var n = this[e], r = 0, i = n.length; r < i; r++) {
                var s = n[r];
                if (s)
                    return s
            }
        return null
    }
    ,
    K.size = function() {
        var e = 0;
        return ht(this, function() {
            ++e
        }),
        e
    }
    ;
    var dt = [];
    e.selection.enter = pt,
    e.selection.enter.prototype = dt,
    dt.append = K.append,
    dt.empty = K.empty,
    dt.node = K.node,
    dt.call = K.call,
    dt.size = K.size,
    dt.select = function(e) {
        var t = [], n, r, i, s, o;
        for (var u = -1, a = this.length; ++u < a; ) {
            i = (s = this[u]).update,
            t.push(n = []),
            n.parentNode = s.parentNode;
            for (var f = -1, l = s.length; ++f < l; )
                (o = s[f]) ? (n.push(i[f] = r = e.call(s.parentNode, o.__data__, f, u)),
                r.__data__ = o.__data__) : n.push(null)
        }
        return X(t)
    }
    ,
    dt.insert = function(e, t) {
        return arguments.length < 2 && (t = vt(this)),
        K.insert.call(this, e, t)
    }
    ,
    e.select = function(e) {
        var t;
        return typeof e == "string" ? (t = [V(e, r)],
        t.parentNode = r.documentElement) : (t = [e],
        t.parentNode = i(e)),
        X([t])
    }
    ,
    e.selectAll = function(e) {
        var t;
        return typeof e == "string" ? (t = n($(e, r)),
        t.parentNode = r.documentElement) : (t = e,
        t.parentNode = null),
        X([t])
    }
    ,
    K.on = function(e, t, n) {
        var r = arguments.length;
        if (r < 3) {
            if (typeof e != "string") {
                r < 2 && (t = !1);
                for (n in e)
                    this.each(mt(n, e[n], t));
                return this
            }
            if (r < 2)
                return (r = this.node()["__on" + e]) && r._;
            n = !1
        }
        return this.each(mt(e, t, n))
    }
    ;
    var gt = e.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    r && gt.forEach(function(e) {
        "on" + e in r && gt.remove(e)
    });
    var wt, Et = 0;
    e.mouse = function(e) {
        return Tt(e, R())
    }
    ;
    var xt = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
    e.touch = function(e, t, n) {
        arguments.length < 3 && (n = t,
        t = R().changedTouches);
        if (t)
            for (var r = 0, i = t.length, s; r < i; ++r)
                if ((s = t[r]).identifier === n)
                    return Tt(e, s)
    }
    ,
    e.behavior.drag = function() {
        function o() {
            this.on("mousedown.drag", r).on("touchstart.drag", i)
        }
        function u(r, i, s, o, u) {
            return function() {
                function b() {
                    var e = i(l, p), t, n;
                    if (!e)
                        return;
                    t = e[0] - y[0],
                    n = e[1] - y[1],
                    h |= t | n,
                    y = e,
                    c({
                        type: "drag",
                        x: e[0] + v[0],
                        y: e[1] + v[1],
                        dx: t,
                        dy: n
                    })
                }
                function w() {
                    if (!i(l, p))
                        return;
                    m.on(o + d, null).on(u + d, null),
                    g(h && e.event.target === f),
                    c({
                        type: "dragend"
                    })
                }
                var a = this, f = e.event.target, l = a.parentNode, c = t.of(a, arguments), h = 0, p = r(), d = ".drag" + (p == null ? "" : "-" + p), v, m = e.select(s(f)).on(o + d, b).on(u + d, w), g = St(f), y = i(l, p);
                n ? (v = n.apply(a, arguments),
                v = [v.x - y[0], v.y - y[1]]) : v = [0, 0],
                c({
                    type: "dragstart"
                })
            }
        }
        var t = U(o, "drag", "dragstart", "dragend")
          , n = null
          , r = u(j, e.mouse, s, "mousemove", "mouseup")
          , i = u(Nt, e.touch, D, "touchmove", "touchend");
        return o.origin = function(e) {
            return arguments.length ? (n = e,
            o) : n
        }
        ,
        e.rebind(o, t, "on")
    }
    ,
    e.touches = function(e, t) {
        return arguments.length < 2 && (t = R().touches),
        t ? n(t).map(function(t) {
            var n = Tt(e, t);
            return n.identifier = t.identifier,
            n
        }) : []
    }
    ;
    var Ct = 1e-6
      , kt = Ct * Ct
      , Lt = Math.PI
      , At = 2 * Lt
      , Ot = At - Ct
      , Mt = Lt / 2
      , _t = Lt / 180
      , Dt = 180 / Lt
      , Ut = Math.SQRT2
      , zt = 2
      , Wt = 4;
    e.interpolateZoom = function(e, t) {
        function y(e) {
            var t = e * g;
            if (m) {
                var s = It(d)
                  , o = i / (zt * c) * (s * qt(Ut * t + d) - Ft(d));
                return [n + o * a, r + o * f, i * s / It(Ut * t + d)]
            }
            return [n + e * a, r + e * f, i * Math.exp(Ut * t)]
        }
        var n = e[0]
          , r = e[1]
          , i = e[2]
          , s = t[0]
          , o = t[1]
          , u = t[2]
          , a = s - n
          , f = o - r
          , l = a * a + f * f
          , c = Math.sqrt(l)
          , h = (u * u - i * i + Wt * l) / (2 * i * zt * c)
          , p = (u * u - i * i - Wt * l) / (2 * u * zt * c)
          , d = Math.log(Math.sqrt(h * h + 1) - h)
          , v = Math.log(Math.sqrt(p * p + 1) - p)
          , m = v - d
          , g = (m || Math.log(u / i)) / Ut;
        return y.duration = g * 1e3,
        y
    }
    ,
    e.behavior.zoom = function() {
        function S(e) {
            e.on(c, _).on($t + ".zoom", P).on("dblclick.zoom", H).on(v, D)
        }
        function x(e) {
            return [(e[0] - t.x) / t.k, (e[1] - t.y) / t.k]
        }
        function T(e) {
            return [e[0] * t.k + t.x, e[1] * t.k + t.y]
        }
        function N(e) {
            t.k = Math.max(a[0], Math.min(a[1], e))
        }
        function C(e, n) {
            n = T(n),
            t.x += e[0] - n[0],
            t.y += e[1] - n[1]
        }
        function k(n, r, s, o) {
            n.__chart__ = {
                x: t.x,
                y: t.y,
                k: t.k
            },
            N(Math.pow(2, o)),
            C(i = r, s),
            n = e.select(n),
            f > 0 && (n = n.transition().duration(f)),
            n.call(S.event)
        }
        function L() {
            b && b.domain(y.range().map(function(e) {
                return (e - t.x) / t.k
            }).map(y.invert)),
            E && E.domain(w.range().map(function(e) {
                return (e - t.y) / t.k
            }).map(w.invert))
        }
        function A(e) {
            l++ || e({
                type: "zoomstart"
            })
        }
        function O(e) {
            L(),
            e({
                type: "zoom",
                scale: t.k,
                translate: [t.x, t.y]
            })
        }
        function M(e) {
            --l || e({
                type: "zoomend"
            }),
            i = null
        }
        function _() {
            function f() {
                i = 1,
                C(e.mouse(t), u),
                O(r)
            }
            function l() {
                o.on(h, null).on(p, null),
                a(i && e.event.target === n),
                M(r)
            }
            var t = this
              , n = e.event.target
              , r = g.of(t, arguments)
              , i = 0
              , o = e.select(s(t)).on(h, f).on(p, l)
              , u = x(e.mouse(t))
              , a = St(t);
            Sf.call(t),
            A(r)
        }
        function D() {
            function d() {
                var r = e.touches(n);
                return o = t.k,
                r.forEach(function(e) {
                    e.identifier in i && (i[e.identifier] = x(e))
                }),
                r
            }
            function y() {
                var r = e.event.target;
                e.select(r).on(a, b).on(f, w),
                l.push(r);
                var o = e.event.changedTouches;
                for (var u = 0, c = o.length; u < c; ++u)
                    i[o[u].identifier] = null;
                var h = d()
                  , p = Date.now();
                if (h.length === 1) {
                    if (p - m < 500) {
                        var v = h[0];
                        k(n, v, i[v.identifier], Math.floor(Math.log(t.k) / Math.LN2) + 1),
                        q()
                    }
                    m = p
                } else if (h.length > 1) {
                    var v = h[0]
                      , g = h[1]
                      , y = v[0] - g[0]
                      , E = v[1] - g[1];
                    s = y * y + E * E
                }
            }
            function b() {
                var t = e.touches(n), u, a, f, l;
                Sf.call(n);
                for (var c = 0, h = t.length; c < h; ++c,
                l = null) {
                    f = t[c];
                    if (l = i[f.identifier]) {
                        if (a)
                            break;
                        u = f,
                        a = l
                    }
                }
                if (l) {
                    var p = (p = f[0] - u[0]) * p + (p = f[1] - u[1]) * p
                      , d = s && Math.sqrt(p / s);
                    u = [(u[0] + f[0]) / 2, (u[1] + f[1]) / 2],
                    a = [(a[0] + l[0]) / 2, (a[1] + l[1]) / 2],
                    N(d * o)
                }
                m = null,
                C(u, a),
                O(r)
            }
            function w() {
                if (e.event.touches.length) {
                    var t = e.event.changedTouches;
                    for (var n = 0, s = t.length; n < s; ++n)
                        delete i[t[n].identifier];
                    for (var o in i)
                        return void d()
                }
                e.selectAll(l).on(u, null),
                h.on(c, _).on(v, D),
                p(),
                M(r)
            }
            var n = this, r = g.of(n, arguments), i = {}, s = 0, o, u = ".zoom-" + e.event.changedTouches[0].identifier, a = "touchmove" + u, f = "touchend" + u, l = [], h = e.select(n), p = St(n);
            y(),
            A(r),
            h.on(c, null).on(v, y)
        }
        function P() {
            var r = g.of(this, arguments);
            d ? clearTimeout(d) : (n = x(i = o || e.mouse(this)),
            Sf.call(this),
            A(r)),
            d = setTimeout(function() {
                d = null,
                M(r)
            }, 50),
            q(),
            N(Math.pow(2, Vt() * .002) * t.k),
            C(i, n),
            O(r)
        }
        function H() {
            var n = e.mouse(this)
              , r = Math.log(t.k) / Math.LN2;
            k(this, n, x(n), e.event.shiftKey ? Math.ceil(r) - 1 : Math.floor(r) + 1)
        }
        var t = {
            x: 0,
            y: 0,
            k: 1
        }, n, i, o, u = [960, 500], a = Xt, f = 250, l = 0, c = "mousedown.zoom", h = "mousemove.zoom", p = "mouseup.zoom", d, v = "touchstart.zoom", m, g = U(S, "zoomstart", "zoom", "zoomend"), y, b, w, E;
        return $t || ($t = "onwheel"in r ? (Vt = function() {
            return -e.event.deltaY * (e.event.deltaMode ? 120 : 1)
        }
        ,
        "wheel") : "onmousewheel"in r ? (Vt = function() {
            return e.event.wheelDelta
        }
        ,
        "mousewheel") : (Vt = function() {
            return -e.event.detail
        }
        ,
        "MozMousePixelScroll")),
        S.event = function(n) {
            n.each(function() {
                var n = g.of(this, arguments)
                  , r = t;
                kf ? e.select(this).transition().each("start.zoom", function() {
                    t = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    },
                    A(n)
                }).tween("zoom:zoom", function() {
                    var s = u[0]
                      , o = u[1]
                      , a = i ? i[0] : s / 2
                      , f = i ? i[1] : o / 2
                      , l = e.interpolateZoom([(a - t.x) / t.k, (f - t.y) / t.k, s / t.k], [(a - r.x) / r.k, (f - r.y) / r.k, s / r.k]);
                    return function(e) {
                        var r = l(e)
                          , i = s / r[2];
                        this.__chart__ = t = {
                            x: a - r[0] * i,
                            y: f - r[1] * i,
                            k: i
                        },
                        O(n)
                    }
                }).each("interrupt.zoom", function() {
                    M(n)
                }).each("end.zoom", function() {
                    M(n)
                }) : (this.__chart__ = t,
                A(n),
                O(n),
                M(n))
            })
        }
        ,
        S.translate = function(e) {
            return arguments.length ? (t = {
                x: +e[0],
                y: +e[1],
                k: t.k
            },
            L(),
            S) : [t.x, t.y]
        }
        ,
        S.scale = function(e) {
            return arguments.length ? (t = {
                x: t.x,
                y: t.y,
                k: +e
            },
            L(),
            S) : t.k
        }
        ,
        S.scaleExtent = function(e) {
            return arguments.length ? (a = e == null ? Xt : [+e[0], +e[1]],
            S) : a
        }
        ,
        S.center = function(e) {
            return arguments.length ? (o = e && [+e[0], +e[1]],
            S) : o
        }
        ,
        S.size = function(e) {
            return arguments.length ? (u = e && [+e[0], +e[1]],
            S) : u
        }
        ,
        S.duration = function(e) {
            return arguments.length ? (f = +e,
            S) : f
        }
        ,
        S.x = function(e) {
            return arguments.length ? (b = e,
            y = e.copy(),
            t = {
                x: 0,
                y: 0,
                k: 1
            },
            S) : b
        }
        ,
        S.y = function(e) {
            return arguments.length ? (E = e,
            w = e.copy(),
            t = {
                x: 0,
                y: 0,
                k: 1
            },
            S) : E
        }
        ,
        e.rebind(S, g, "on")
    }
    ;
    var Xt = [0, Infinity], Vt, $t;
    e.color = Jt,
    Jt.prototype.toString = function() {
        return this.rgb() + ""
    }
    ,
    e.hsl = Kt;
    var Qt = Kt.prototype = new Jt;
    Qt.brighter = function(e) {
        return e = Math.pow(.7, arguments.length ? e : 1),
        new Kt(this.h,this.s,this.l / e)
    }
    ,
    Qt.darker = function(e) {
        return e = Math.pow(.7, arguments.length ? e : 1),
        new Kt(this.h,this.s,e * this.l)
    }
    ,
    Qt.rgb = function() {
        return Gt(this.h, this.s, this.l)
    }
    ,
    e.hcl = Yt;
    var Zt = Yt.prototype = new Jt;
    Zt.brighter = function(e) {
        return new Yt(this.h,this.c,Math.min(100, this.l + nn * (arguments.length ? e : 1)))
    }
    ,
    Zt.darker = function(e) {
        return new Yt(this.h,this.c,Math.max(0, this.l - nn * (arguments.length ? e : 1)))
    }
    ,
    Zt.rgb = function() {
        return en(this.h, this.c, this.l).rgb()
    }
    ,
    e.lab = tn;
    var nn = 18
      , rn = .95047
      , sn = 1
      , on = 1.08883
      , un = tn.prototype = new Jt;
    un.brighter = function(e) {
        return new tn(Math.min(100, this.l + nn * (arguments.length ? e : 1)),this.a,this.b)
    }
    ,
    un.darker = function(e) {
        return new tn(Math.max(0, this.l - nn * (arguments.length ? e : 1)),this.a,this.b)
    }
    ,
    un.rgb = function() {
        return an(this.l, this.a, this.b)
    }
    ,
    e.rgb = pn;
    var mn = pn.prototype = new Jt;
    mn.brighter = function(e) {
        e = Math.pow(.7, arguments.length ? e : 1);
        var t = this.r
          , n = this.g
          , r = this.b
          , i = 30;
        return !t && !n && !r ? new pn(i,i,i) : (t && t < i && (t = i),
        n && n < i && (n = i),
        r && r < i && (r = i),
        new pn(Math.min(255, t / e),Math.min(255, n / e),Math.min(255, r / e)))
    }
    ,
    mn.darker = function(e) {
        return e = Math.pow(.7, arguments.length ? e : 1),
        new pn(e * this.r,e * this.g,e * this.b)
    }
    ,
    mn.hsl = function() {
        return bn(this.r, this.g, this.b)
    }
    ,
    mn.toString = function() {
        return "#" + gn(this.r) + gn(this.g) + gn(this.b)
    }
    ;
    var xn = e.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    xn.forEach(function(e, t) {
        xn.set(e, dn(t))
    }),
    e.functor = Tn,
    e.xhr = Nn(D),
    e.dsv = function(e, t) {
        function i(e, n, r) {
            arguments.length < 3 && (r = n,
            n = null);
            var i = Cn(e, t, n == null ? s : o(n), r);
            return i.row = function(e) {
                return arguments.length ? i.response((n = e) == null ? s : o(e)) : n
            }
            ,
            i
        }
        function s(e) {
            return i.parse(e.responseText)
        }
        function o(e) {
            return function(t) {
                return i.parse(t.responseText, e)
            }
        }
        function u(t) {
            return t.map(a).join(e)
        }
        function a(e) {
            return n.test(e) ? '"' + e.replace(/\"/g, '""') + '"' : e
        }
        var n = new RegExp('["' + e + "\n]")
          , r = e.charCodeAt(0);
        return i.parse = function(e, t) {
            var n;
            return i.parseRows(e, function(e, r) {
                if (n)
                    return n(e, r - 1);
                var i = new Function("d","return {" + e.map(function(e, t) {
                    return JSON.stringify(e) + ": d[" + t + "]"
                }).join(",") + "}");
                n = t ? function(e, n) {
                    return t(i(e), n)
                }
                : i
            })
        }
        ,
        i.parseRows = function(e, t) {
            function c() {
                if (u >= o)
                    return i;
                if (l)
                    return l = !1,
                    n;
                var t = u;
                if (e.charCodeAt(t) === 34) {
                    var s = t;
                    while (s++ < o)
                        if (e.charCodeAt(s) === 34) {
                            if (e.charCodeAt(s + 1) !== 34)
                                break;
                            ++s
                        }
                    u = s + 2;
                    var a = e.charCodeAt(s + 1);
                    return a === 13 ? (l = !0,
                    e.charCodeAt(s + 2) === 10 && ++u) : a === 10 && (l = !0),
                    e.slice(t + 1, s).replace(/""/g, '"')
                }
                while (u < o) {
                    var a = e.charCodeAt(u++)
                      , f = 1;
                    if (a === 10)
                        l = !0;
                    else if (a === 13)
                        l = !0,
                        e.charCodeAt(u) === 10 && (++u,
                        ++f);
                    else if (a !== r)
                        continue;
                    return e.slice(t, u - f)
                }
                return e.slice(t)
            }
            var n = {}, i = {}, s = [], o = e.length, u = 0, a = 0, f, l;
            while ((f = c()) !== i) {
                var h = [];
                while (f !== n && f !== i)
                    h.push(f),
                    f = c();
                if (t && (h = t(h, a++)) == null)
                    continue;
                s.push(h)
            }
            return s
        }
        ,
        i.format = function(t) {
            if (Array.isArray(t[0]))
                return i.formatRows(t);
            var n = new _
              , r = [];
            return t.forEach(function(e) {
                for (var t in e)
                    n.has(t) || r.push(n.add(t))
            }),
            [r.map(a).join(e)].concat(t.map(function(t) {
                return r.map(function(e) {
                    return a(t[e])
                }).join(e)
            })).join("\n")
        }
        ,
        i.formatRows = function(e) {
            return e.map(u).join("\n")
        }
        ,
        i
    }
    ,
    e.csv = e.dsv(",", "text/csv"),
    e.tsv = e.dsv("	", "text/tab-separated-values");
    var An, On, Mn, _n, Dn, Pn = this[H(this, "requestAnimationFrame")] || function(e) {
        setTimeout(e, 17)
    }
    ;
    e.timer = function(e, t, n) {
        var r = arguments.length;
        r < 2 && (t = 0),
        r < 3 && (n = Date.now());
        var i = n + t
          , s = {
            c: e,
            t: i,
            f: !1,
            n: null
        };
        On ? On.n = s : An = s,
        On = s,
        Mn || (_n = clearTimeout(_n),
        Mn = 1,
        Pn(Hn))
    }
    ,
    e.timer.flush = function() {
        Bn(),
        jn()
    }
    ,
    e.round = function(e, t) {
        return t ? Math.round(e * (t = Math.pow(10, t))) / t : Math.round(e)
    }
    ;
    var In = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(qn);
    e.formatPrefix = function(t, n) {
        var r = 0;
        return t && (t < 0 && (t *= -1),
        n && (t = e.round(t, Fn(t, n))),
        r = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10),
        r = Math.max(-24, Math.min(24, Math.floor((r - 1) / 3) * 3))),
        In[8 + r / 3]
    }
    ;
    var Un = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i
      , zn = e.map({
        b: function(e) {
            return e.toString(2)
        },
        c: function(e) {
            return String.fromCharCode(e)
        },
        o: function(e) {
            return e.toString(8)
        },
        x: function(e) {
            return e.toString(16)
        },
        X: function(e) {
            return e.toString(16).toUpperCase()
        },
        g: function(e, t) {
            return e.toPrecision(t)
        },
        e: function(e, t) {
            return e.toExponential(t)
        },
        f: function(e, t) {
            return e.toFixed(t)
        },
        r: function(t, n) {
            return (t = e.round(t, Fn(t, n))).toFixed(Math.max(0, Math.min(20, Fn(t * (1 + 1e-15), n))))
        }
    })
      , Xn = e.time = {}
      , Vn = Date;
    $n.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            Jn.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            Jn.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            Jn.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            Jn.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            Jn.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            Jn.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            Jn.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            Jn.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            Jn.setTime.apply(this._, arguments)
        }
    };
    var Jn = Date.prototype;
    Xn.year = Kn(function(e) {
        return e = Xn.day(e),
        e.setMonth(0, 1),
        e
    }, function(e, t) {
        e.setFullYear(e.getFullYear() + t)
    }, function(e) {
        return e.getFullYear()
    }),
    Xn.years = Xn.year.range,
    Xn.years.utc = Xn.year.utc.range,
    Xn.day = Kn(function(e) {
        var t = new Vn(2e3,0);
        return t.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()),
        t
    }, function(e, t) {
        e.setDate(e.getDate() + t)
    }, function(e) {
        return e.getDate() - 1
    }),
    Xn.days = Xn.day.range,
    Xn.days.utc = Xn.day.utc.range,
    Xn.dayOfYear = function(e) {
        var t = Xn.year(e);
        return Math.floor((e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5)
    }
    ,
    ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(e, t) {
        t = 7 - t;
        var n = Xn[e] = Kn(function(e) {
            return (e = Xn.day(e)).setDate(e.getDate() - (e.getDay() + t) % 7),
            e
        }, function(e, t) {
            e.setDate(e.getDate() + Math.floor(t) * 7)
        }, function(e) {
            var n = Xn.year(e).getDay();
            return Math.floor((Xn.dayOfYear(e) + (n + t) % 7) / 7) - (n !== t)
        });
        Xn[e + "s"] = n.range,
        Xn[e + "s"].utc = n.utc.range,
        Xn[e + "OfYear"] = function(e) {
            var n = Xn.year(e).getDay();
            return Math.floor((Xn.dayOfYear(e) + (n + t) % 7) / 7)
        }
    }),
    Xn.week = Xn.sunday,
    Xn.weeks = Xn.sunday.range,
    Xn.weeks.utc = Xn.sunday.utc.range,
    Xn.weekOfYear = Xn.sundayOfYear;
    var Yn = {
        "-": "",
        _: " ",
        0: "0"
    }
      , Zn = /^\s*\d+/
      , er = /^%/;
    e.locale = function(e) {
        return {
            numberFormat: Rn(e),
            timeFormat: Gn(e)
        }
    }
    ;
    var Er = e.locale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    e.format = Er.numberFormat,
    e.geo = {},
    Sr.prototype = {
        s: 0,
        t: 0,
        add: function(e) {
            Tr(e, this.t, xr),
            Tr(xr.s, this.s, this),
            this.s ? this.t += xr.t : this.s = xr.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var xr = new Sr;
    e.geo.stream = function(e, t) {
        e && Cr.hasOwnProperty(e.type) ? Cr[e.type](e, t) : Nr(e, t)
    }
    ;
    var Cr = {
        Feature: function(e, t) {
            Nr(e.geometry, t)
        },
        FeatureCollection: function(e, t) {
            var n = e.features
              , r = -1
              , i = n.length;
            while (++r < i)
                Nr(n[r].geometry, t)
        }
    }
      , kr = {
        Sphere: function(e, t) {
            t.sphere()
        },
        Point: function(e, t) {
            e = e.coordinates,
            t.point(e[0], e[1], e[2])
        },
        MultiPoint: function(e, t) {
            var n = e.coordinates
              , r = -1
              , i = n.length;
            while (++r < i)
                e = n[r],
                t.point(e[0], e[1], e[2])
        },
        LineString: function(e, t) {
            Lr(e.coordinates, t, 0)
        },
        MultiLineString: function(e, t) {
            var n = e.coordinates
              , r = -1
              , i = n.length;
            while (++r < i)
                Lr(n[r], t, 0)
        },
        Polygon: function(e, t) {
            Ar(e.coordinates, t)
        },
        MultiPolygon: function(e, t) {
            var n = e.coordinates
              , r = -1
              , i = n.length;
            while (++r < i)
                Ar(n[r], t)
        },
        GeometryCollection: function(e, t) {
            var n = e.geometries
              , r = -1
              , i = n.length;
            while (++r < i)
                Nr(n[r], t)
        }
    };
    e.geo.area = function(t) {
        return Or = 0,
        e.geo.stream(t, _r),
        Or
    }
    ;
    var Or, Mr = new Sr, _r = {
        sphere: function() {
            Or += 4 * Lt
        },
        point: j,
        lineStart: j,
        lineEnd: j,
        polygonStart: function() {
            Mr.reset(),
            _r.lineStart = Dr
        },
        polygonEnd: function() {
            var e = 2 * Mr;
            Or += e < 0 ? 4 * Lt + e : e,
            _r.lineStart = _r.lineEnd = _r.point = j
        }
    };
    e.geo.bounds = function() {
        function p(e, s) {
            l.push(c = [t = e, r = e]),
            s < n && (n = s),
            s > i && (i = s)
        }
        function d(e, o) {
            var u = Pr([e * _t, o * _t]);
            if (a) {
                var f = Br(a, u)
                  , l = [f[1], -f[0], 0]
                  , c = Br(l, f);
                Ir(c),
                c = qr(c);
                var h = e - s
                  , d = h > 0 ? 1 : -1
                  , v = c[0] * Dt * d
                  , m = b(h) > 180;
                if (m ^ (d * s < v && v < d * e)) {
                    var g = c[1] * Dt;
                    g > i && (i = g)
                } else if (v = (v + 360) % 360 - 180,
                m ^ (d * s < v && v < d * e)) {
                    var g = -c[1] * Dt;
                    g < n && (n = g)
                } else
                    o < n && (n = o),
                    o > i && (i = o);
                m ? e < s ? E(t, e) > E(t, r) && (r = e) : E(e, r) > E(t, r) && (t = e) : r >= t ? (e < t && (t = e),
                e > r && (r = e)) : e > s ? E(t, e) > E(t, r) && (r = e) : E(e, r) > E(t, r) && (t = e)
            } else
                p(e, o);
            a = u,
            s = e
        }
        function v() {
            h.point = d
        }
        function m() {
            c[0] = t,
            c[1] = r,
            h.point = p,
            a = null
        }
        function g(e, t) {
            if (a) {
                var n = e - s;
                f += b(n) > 180 ? n + (n > 0 ? 360 : -360) : n
            } else
                o = e,
                u = t;
            _r.point(e, t),
            d(e, t)
        }
        function y() {
            _r.lineStart()
        }
        function w() {
            g(o, u),
            _r.lineEnd(),
            b(f) > Ct && (t = -(r = 180)),
            c[0] = t,
            c[1] = r,
            a = null
        }
        function E(e, t) {
            return (t -= e) < 0 ? t + 360 : t
        }
        function S(e, t) {
            return e[0] - t[0]
        }
        function x(e, t) {
            return t[0] <= t[1] ? t[0] <= e && e <= t[1] : e < t[0] || t[1] < e
        }
        var t, n, r, i, s, o, u, a, f, l, c, h = {
            point: p,
            lineStart: v,
            lineEnd: m,
            polygonStart: function() {
                h.point = g,
                h.lineStart = y,
                h.lineEnd = w,
                f = 0,
                _r.polygonStart()
            },
            polygonEnd: function() {
                _r.polygonEnd(),
                h.point = p,
                h.lineStart = v,
                h.lineEnd = m,
                Mr < 0 ? (t = -(r = 180),
                n = -(i = 90)) : f > Ct ? i = 90 : f < -Ct && (n = -90),
                c[0] = t,
                c[1] = r
            }
        };
        return function(s) {
            i = r = -(t = n = Infinity),
            l = [],
            e.geo.stream(s, h);
            var o = l.length;
            if (o) {
                l.sort(S);
                for (var u = 1, a = l[0], f, p = [a]; u < o; ++u)
                    f = l[u],
                    x(f[0], a) || x(f[1], a) ? (E(a[0], f[1]) > E(a[0], a[1]) && (a[1] = f[1]),
                    E(f[0], a[1]) > E(a[0], a[1]) && (a[0] = f[0])) : p.push(a = f);
                var d = -Infinity, v;
                for (var o = p.length - 1, u = 0, a = p[o], f; u <= o; a = f,
                ++u)
                    f = p[u],
                    (v = E(a[1], f[0])) > d && (d = v,
                    t = f[0],
                    r = a[1])
            }
            return l = c = null,
            t === Infinity || n === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[t, n], [r, i]]
        }
    }(),
    e.geo.centroid = function(t) {
        Ur = zr = Wr = Xr = Vr = $r = Jr = Kr = Qr = Gr = Yr = 0,
        e.geo.stream(t, Zr);
        var n = Qr
          , r = Gr
          , i = Yr
          , s = n * n + r * r + i * i;
        if (s < kt) {
            n = $r,
            r = Jr,
            i = Kr,
            zr < Ct && (n = Wr,
            r = Xr,
            i = Vr),
            s = n * n + r * r + i * i;
            if (s < kt)
                return [NaN, NaN]
        }
        return [Math.atan2(r, n) * Dt, jt(i / Math.sqrt(s)) * Dt]
    }
    ;
    var Ur, zr, Wr, Xr, Vr, $r, Jr, Kr, Qr, Gr, Yr, Zr = {
        sphere: j,
        point: ei,
        lineStart: ni,
        lineEnd: ri,
        polygonStart: function() {
            Zr.lineStart = ii
        },
        polygonEnd: function() {
            Zr.lineStart = ni
        }
    }, di = li(oi, vi, gi, [-Lt, -Lt / 2]), Ei = 1e9;
    e.geo.clipExtent = function() {
        var e, t, n, r, i, s, o = {
            stream: function(e) {
                return i && (i.valid = !1),
                i = s(e),
                i.valid = !0,
                i
            },
            extent: function(u) {
                return arguments.length ? (s = Si(e = +u[0][0], t = +u[0][1], n = +u[1][0], r = +u[1][1]),
                i && (i.valid = !1,
                i = null),
                o) : [[e, t], [n, r]]
            }
        };
        return o.extent([[0, 0], [960, 500]])
    }
    ,
    (e.geo.conicEqualArea = function() {
        return xi(Ti)
    }
    ).raw = Ti,
    e.geo.albers = function() {
        return e.geo.conicEqualArea().rotate([96, 0]).center([-0.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }
    ,
    e.geo.albersUsa = function() {
        function f(e) {
            var t = e[0]
              , n = e[1];
            return i = null,
            (o(t, n),
            i) || (u(t, n),
            i) || a(t, n),
            i
        }
        var t = e.geo.albers(), n = e.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), r = e.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), i, s = {
            point: function(e, t) {
                i = [e, t]
            }
        }, o, u, a;
        return f.invert = function(e) {
            var i = t.scale()
              , s = t.translate()
              , o = (e[0] - s[0]) / i
              , u = (e[1] - s[1]) / i;
            return (u >= .12 && u < .234 && o >= -0.425 && o < -0.214 ? n : u >= .166 && u < .234 && o >= -0.214 && o < -0.115 ? r : t).invert(e)
        }
        ,
        f.stream = function(e) {
            var i = t.stream(e)
              , s = n.stream(e)
              , o = r.stream(e);
            return {
                point: function(e, t) {
                    i.point(e, t),
                    s.point(e, t),
                    o.point(e, t)
                },
                sphere: function() {
                    i.sphere(),
                    s.sphere(),
                    o.sphere()
                },
                lineStart: function() {
                    i.lineStart(),
                    s.lineStart(),
                    o.lineStart()
                },
                lineEnd: function() {
                    i.lineEnd(),
                    s.lineEnd(),
                    o.lineEnd()
                },
                polygonStart: function() {
                    i.polygonStart(),
                    s.polygonStart(),
                    o.polygonStart()
                },
                polygonEnd: function() {
                    i.polygonEnd(),
                    s.polygonEnd(),
                    o.polygonEnd()
                }
            }
        }
        ,
        f.precision = function(e) {
            return arguments.length ? (t.precision(e),
            n.precision(e),
            r.precision(e),
            f) : t.precision()
        }
        ,
        f.scale = function(e) {
            return arguments.length ? (t.scale(e),
            n.scale(e * .35),
            r.scale(e),
            f.translate(t.translate())) : t.scale()
        }
        ,
        f.translate = function(e) {
            if (!arguments.length)
                return t.translate();
            var i = t.scale()
              , l = +e[0]
              , c = +e[1];
            return o = t.translate(e).clipExtent([[l - .455 * i, c - .238 * i], [l + .455 * i, c + .238 * i]]).stream(s).point,
            u = n.translate([l - .307 * i, c + .201 * i]).clipExtent([[l - .425 * i + Ct, c + .12 * i + Ct], [l - .214 * i - Ct, c + .234 * i - Ct]]).stream(s).point,
            a = r.translate([l - .205 * i, c + .212 * i]).clipExtent([[l - .214 * i + Ct, c + .166 * i + Ct], [l - .115 * i - Ct, c + .234 * i - Ct]]).stream(s).point,
            f
        }
        ,
        f.scale(1070)
    }
    ;
    var Ni, Ci, ki = {
        point: j,
        lineStart: j,
        lineEnd: j,
        polygonStart: function() {
            Ci = 0,
            ki.lineStart = Li
        },
        polygonEnd: function() {
            ki.lineStart = ki.lineEnd = ki.point = j,
            Ni += b(Ci / 2)
        }
    }, Ai, Oi, Mi, _i, Di = {
        point: Pi,
        lineStart: j,
        lineEnd: j,
        polygonStart: j,
        polygonEnd: j
    }, ji = {
        point: Fi,
        lineStart: Ii,
        lineEnd: qi,
        polygonStart: function() {
            ji.lineStart = Ri
        },
        polygonEnd: function() {
            ji.point = Fi,
            ji.lineStart = Ii,
            ji.lineEnd = qi
        }
    };
    e.geo.path = function() {
        function u(n) {
            if (n) {
                typeof t == "function" && s.pointRadius(+t.apply(this, arguments));
                if (!o || !o.valid)
                    o = i(s);
                e.geo.stream(n, o)
            }
            return s.result()
        }
        function a() {
            return o = null,
            u
        }
        var t = 4.5, n, r, i, s, o;
        return u.area = function(t) {
            return Ni = 0,
            e.geo.stream(t, i(ki)),
            Ni
        }
        ,
        u.centroid = function(t) {
            return Wr = Xr = Vr = $r = Jr = Kr = Qr = Gr = Yr = 0,
            e.geo.stream(t, i(ji)),
            Yr ? [Qr / Yr, Gr / Yr] : Kr ? [$r / Kr, Jr / Kr] : Vr ? [Wr / Vr, Xr / Vr] : [NaN, NaN]
        }
        ,
        u.bounds = function(t) {
            return Mi = _i = -(Ai = Oi = Infinity),
            e.geo.stream(t, i(Di)),
            [[Ai, Oi], [Mi, _i]]
        }
        ,
        u.projection = function(e) {
            return arguments.length ? (i = (n = e) ? e.stream || Wi(e) : D,
            a()) : n
        }
        ,
        u.context = function(e) {
            return arguments.length ? (s = (r = e) == null ? new Hi : new Ui(e),
            typeof t != "function" && s.pointRadius(t),
            a()) : r
        }
        ,
        u.pointRadius = function(e) {
            return arguments.length ? (t = typeof e == "function" ? e : (s.pointRadius(+e),
            +e),
            u) : t
        }
        ,
        u.projection(e.geo.albersUsa()).context(null)
    }
    ,
    e.geo.transform = function(e) {
        return {
            stream: function(t) {
                var n = new Xi(t);
                for (var r in e)
                    n[r] = e[r];
                return n
            }
        }
    }
    ,
    Xi.prototype = {
        point: function(e, t) {
            this.stream.point(e, t)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    },
    e.geo.projection = $i,
    e.geo.projectionMutator = Ji,
    (e.geo.equirectangular = function() {
        return $i(Qi)
    }
    ).raw = Qi.invert = Qi,
    e.geo.rotation = function(e) {
        function t(t) {
            return t = e(t[0] * _t, t[1] * _t),
            t[0] *= Dt,
            t[1] *= Dt,
            t
        }
        return e = Yi(e[0] % 360 * _t, e[1] * _t, e.length > 2 ? e[2] * _t : 0),
        t.invert = function(t) {
            return t = e.invert(t[0] * _t, t[1] * _t),
            t[0] *= Dt,
            t[1] *= Dt,
            t
        }
        ,
        t
    }
    ,
    Gi.invert = Qi,
    e.geo.circle = function() {
        function i() {
            var t = typeof e == "function" ? e.apply(this, arguments) : e
              , n = Yi(-t[0] * _t, -t[1] * _t, 0).invert
              , i = [];
            return r(null, null, 1, {
                point: function(e, t) {
                    i.push(e = n(e, t)),
                    e[0] *= Dt,
                    e[1] *= Dt
                }
            }),
            {
                type: "Polygon",
                coordinates: [i]
            }
        }
        var e = [0, 0], t, n = 6, r;
        return i.origin = function(t) {
            return arguments.length ? (e = t,
            i) : e
        }
        ,
        i.angle = function(e) {
            return arguments.length ? (r = ns((t = +e) * _t, n * _t),
            i) : t
        }
        ,
        i.precision = function(e) {
            return arguments.length ? (r = ns(t * _t, (n = +e) * _t),
            i) : n
        }
        ,
        i.angle(90)
    }
    ,
    e.geo.distance = function(e, t) {
        var n = (t[0] - e[0]) * _t, r = e[1] * _t, i = t[1] * _t, s = Math.sin(n), o = Math.cos(n), u = Math.sin(r), a = Math.cos(r), f = Math.sin(i), l = Math.cos(i), c;
        return Math.atan2(Math.sqrt((c = l * s) * c + (c = a * f - u * l * o) * c), u * f + a * l * o)
    }
    ,
    e.geo.graticule = function() {
        function y() {
            return {
                type: "MultiLineString",
                coordinates: w()
            }
        }
        function w() {
            return e.range(Math.ceil(i / c) * c, r, c).map(v).concat(e.range(Math.ceil(a / h) * h, u, h).map(m)).concat(e.range(Math.ceil(n / f) * f, t, f).filter(function(e) {
                return b(e % c) > Ct
            }).map(p)).concat(e.range(Math.ceil(o / l) * l, s, l).filter(function(e) {
                return b(e % h) > Ct
            }).map(d))
        }
        var t, n, r, i, s, o, u, a, f = 10, l = f, c = 90, h = 360, p, d, v, m, g = 2.5;
        return y.lines = function() {
            return w().map(function(e) {
                return {
                    type: "LineString",
                    coordinates: e
                }
            })
        }
        ,
        y.outline = function() {
            return {
                type: "Polygon",
                coordinates: [v(i).concat(m(u).slice(1), v(r).reverse().slice(1), m(a).reverse().slice(1))]
            }
        }
        ,
        y.extent = function(e) {
            return arguments.length ? y.majorExtent(e).minorExtent(e) : y.minorExtent()
        }
        ,
        y.majorExtent = function(e) {
            return arguments.length ? (i = +e[0][0],
            r = +e[1][0],
            a = +e[0][1],
            u = +e[1][1],
            i > r && (e = i,
            i = r,
            r = e),
            a > u && (e = a,
            a = u,
            u = e),
            y.precision(g)) : [[i, a], [r, u]]
        }
        ,
        y.minorExtent = function(e) {
            return arguments.length ? (n = +e[0][0],
            t = +e[1][0],
            o = +e[0][1],
            s = +e[1][1],
            n > t && (e = n,
            n = t,
            t = e),
            o > s && (e = o,
            o = s,
            s = e),
            y.precision(g)) : [[n, o], [t, s]]
        }
        ,
        y.step = function(e) {
            return arguments.length ? y.majorStep(e).minorStep(e) : y.minorStep()
        }
        ,
        y.majorStep = function(e) {
            return arguments.length ? (c = +e[0],
            h = +e[1],
            y) : [c, h]
        }
        ,
        y.minorStep = function(e) {
            return arguments.length ? (f = +e[0],
            l = +e[1],
            y) : [f, l]
        }
        ,
        y.precision = function(e) {
            return arguments.length ? (g = +e,
            p = is(o, s, 90),
            d = ss(n, t, g),
            v = is(a, u, 90),
            m = ss(i, r, g),
            y) : g
        }
        ,
        y.majorExtent([[-180, -90 + Ct], [180, 90 - Ct]]).minorExtent([[-180, -80 - Ct], [180, 80 + Ct]])
    }
    ,
    e.geo.greatArc = function() {
        function s() {
            return {
                type: "LineString",
                coordinates: [n || t.apply(this, arguments), i || r.apply(this, arguments)]
            }
        }
        var t = os, n, r = us, i;
        return s.distance = function() {
            return e.geo.distance(n || t.apply(this, arguments), i || r.apply(this, arguments))
        }
        ,
        s.source = function(e) {
            return arguments.length ? (t = e,
            n = typeof e == "function" ? null : e,
            s) : t
        }
        ,
        s.target = function(e) {
            return arguments.length ? (r = e,
            i = typeof e == "function" ? null : e,
            s) : r
        }
        ,
        s.precision = function() {
            return arguments.length ? s : 0
        }
        ,
        s
    }
    ,
    e.geo.interpolate = function(e, t) {
        return as(e[0] * _t, e[1] * _t, t[0] * _t, t[1] * _t)
    }
    ,
    e.geo.length = function(t) {
        return fs = 0,
        e.geo.stream(t, ls),
        fs
    }
    ;
    var fs, ls = {
        sphere: j,
        point: j,
        lineStart: cs,
        lineEnd: j,
        polygonStart: j,
        polygonEnd: j
    }, ps = hs(function(e) {
        return Math.sqrt(2 / (1 + e))
    }, function(e) {
        return 2 * Math.asin(e / 2)
    });
    (e.geo.azimuthalEqualArea = function() {
        return $i(ps)
    }
    ).raw = ps;
    var ds = hs(function(e) {
        var t = Math.acos(e);
        return t && t / Math.sin(t)
    }, D);
    (e.geo.azimuthalEquidistant = function() {
        return $i(ds)
    }
    ).raw = ds,
    (e.geo.conicConformal = function() {
        return xi(vs)
    }
    ).raw = vs,
    (e.geo.conicEquidistant = function() {
        return xi(ms)
    }
    ).raw = ms;
    var gs = hs(function(e) {
        return 1 / e
    }, Math.atan);
    (e.geo.gnomonic = function() {
        return $i(gs)
    }
    ).raw = gs,
    ys.invert = function(e, t) {
        return [e, 2 * Math.atan(Math.exp(t)) - Mt]
    }
    ,
    (e.geo.mercator = function() {
        return bs(ys)
    }
    ).raw = ys;
    var ws = hs(function() {
        return 1
    }, Math.asin);
    (e.geo.orthographic = function() {
        return $i(ws)
    }
    ).raw = ws;
    var Es = hs(function(e) {
        return 1 / (1 + e)
    }, function(e) {
        return 2 * Math.atan(e)
    });
    (e.geo.stereographic = function() {
        return $i(Es)
    }
    ).raw = Es,
    Ss.invert = function(e, t) {
        return [-t, 2 * Math.atan(Math.exp(e)) - Mt]
    }
    ,
    (e.geo.transverseMercator = function() {
        var e = bs(Ss)
          , t = e.center
          , n = e.rotate;
        return e.center = function(e) {
            return e ? t([-e[1], e[0]]) : (e = t(),
            [e[1], -e[0]])
        }
        ,
        e.rotate = function(e) {
            return e ? n([e[0], e[1], e.length > 2 ? e[2] + 90 : 90]) : (e = n(),
            [e[0], e[1], e[2] - 90])
        }
        ,
        n([0, 0, 90])
    }
    ).raw = Ss,
    e.geom = {},
    e.geom.hull = function(e) {
        function r(e) {
            if (e.length < 3)
                return [];
            var r = Tn(t), i = Tn(n), s, o = e.length, u = [], a = [];
            for (s = 0; s < o; s++)
                u.push([+r.call(this, e[s], s), +i.call(this, e[s], s), s]);
            u.sort(Cs);
            for (s = 0; s < o; s++)
                a.push([u[s][0], -u[s][1]]);
            var f = Ns(u)
              , l = Ns(a)
              , c = l[0] === f[0]
              , h = l[l.length - 1] === f[f.length - 1]
              , p = [];
            for (s = f.length - 1; s >= 0; --s)
                p.push(e[u[f[s]][2]]);
            for (s = +c; s < l.length - h; ++s)
                p.push(e[u[l[s]][2]]);
            return p
        }
        var t = xs
          , n = Ts;
        return arguments.length ? r(e) : (r.x = function(e) {
            return arguments.length ? (t = e,
            r) : t
        }
        ,
        r.y = function(e) {
            return arguments.length ? (n = e,
            r) : n
        }
        ,
        r)
    }
    ,
    e.geom.polygon = function(e) {
        return W(e, ks),
        e
    }
    ;
    var ks = e.geom.polygon.prototype = [];
    ks.area = function() {
        var e = -1, t = this.length, n, r = this[t - 1], i = 0;
        while (++e < t)
            n = r,
            r = this[e],
            i += n[1] * r[0] - n[0] * r[1];
        return i * .5
    }
    ,
    ks.centroid = function(e) {
        var t = -1, n = this.length, r = 0, i = 0, s, o = this[n - 1], u;
        arguments.length || (e = -1 / (6 * this.area()));
        while (++t < n)
            s = o,
            o = this[t],
            u = s[0] * o[1] - o[0] * s[1],
            r += (s[0] + o[0]) * u,
            i += (s[1] + o[1]) * u;
        return [r * e, i * e]
    }
    ,
    ks.clip = function(e) {
        var t, n = Os(e), r = -1, i = this.length - Os(this), s, o, u = this[i - 1], a, f, l;
        while (++r < i) {
            t = e.slice(),
            e.length = 0,
            a = this[r],
            f = t[(o = t.length - n) - 1],
            s = -1;
            while (++s < o)
                l = t[s],
                Ls(l, u, a) ? (Ls(f, u, a) || e.push(As(f, l, u, a)),
                e.push(l)) : Ls(f, u, a) && e.push(As(f, l, u, a)),
                f = l;
            n && e.push(e[0]),
            u = a
        }
        return e
    }
    ;
    var Ms, _s, Ds, Ps = [], Hs, Bs, js = [];
    Xs.prototype.prepare = function() {
        var e = this.edges, t = e.length, n;
        while (t--)
            n = e[t].edge,
            (!n.b || !n.a) && e.splice(t, 1);
        return e.sort($s),
        e.length
    }
    ,
    ro.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    },
    io.prototype = {
        insert: function(e, t) {
            var n, r, i;
            if (e) {
                t.P = e,
                t.N = e.N,
                e.N && (e.N.P = t),
                e.N = t;
                if (e.R) {
                    e = e.R;
                    while (e.L)
                        e = e.L;
                    e.L = t
                } else
                    e.R = t;
                n = e
            } else
                this._ ? (e = ao(this._),
                t.P = null,
                t.N = e,
                e.P = e.L = t,
                n = e) : (t.P = t.N = null,
                this._ = t,
                n = null);
            t.L = t.R = null,
            t.U = n,
            t.C = !0,
            e = t;
            while (n && n.C)
                r = n.U,
                n === r.L ? (i = r.R,
                i && i.C ? (n.C = i.C = !1,
                r.C = !0,
                e = r) : (e === n.R && (oo(this, n),
                e = n,
                n = e.U),
                n.C = !1,
                r.C = !0,
                uo(this, r))) : (i = r.L,
                i && i.C ? (n.C = i.C = !1,
                r.C = !0,
                e = r) : (e === n.L && (uo(this, n),
                e = n,
                n = e.U),
                n.C = !1,
                r.C = !0,
                oo(this, r))),
                n = e.U;
            this._.C = !1
        },
        remove: function(e) {
            e.N && (e.N.P = e.P),
            e.P && (e.P.N = e.N),
            e.N = e.P = null;
            var t = e.U, n, r = e.L, i = e.R, s, o;
            r ? i ? s = ao(i) : s = r : s = i,
            t ? t.L === e ? t.L = s : t.R = s : this._ = s,
            r && i ? (o = s.C,
            s.C = e.C,
            s.L = r,
            r.U = s,
            s !== i ? (t = s.U,
            s.U = e.U,
            e = s.R,
            t.L = e,
            s.R = i,
            i.U = s) : (s.U = t,
            t = s,
            e = s.R)) : (o = e.C,
            e = s),
            e && (e.U = t);
            if (o)
                return;
            if (e && e.C) {
                e.C = !1;
                return
            }
            do {
                if (e === this._)
                    break;
                if (e === t.L) {
                    n = t.R,
                    n.C && (n.C = !1,
                    t.C = !0,
                    oo(this, t),
                    n = t.R);
                    if (n.L && n.L.C || n.R && n.R.C) {
                        if (!n.R || !n.R.C)
                            n.L.C = !1,
                            n.C = !0,
                            uo(this, n),
                            n = t.R;
                        n.C = t.C,
                        t.C = n.R.C = !1,
                        oo(this, t),
                        e = this._;
                        break
                    }
                } else {
                    n = t.L,
                    n.C && (n.C = !1,
                    t.C = !0,
                    uo(this, t),
                    n = t.L);
                    if (n.L && n.L.C || n.R && n.R.C) {
                        if (!n.L || !n.L.C)
                            n.R.C = !1,
                            n.C = !0,
                            oo(this, n),
                            n = t.L;
                        n.C = t.C,
                        t.C = n.L.C = !1,
                        uo(this, t),
                        e = this._;
                        break
                    }
                }
                n.C = !0,
                e = t,
                t = t.U
            } while (!e.C);
            e && (e.C = !1)
        }
    },
    e.geom.voronoi = function(e) {
        function o(e) {
            var t = new Array(e.length)
              , n = s[0][0]
              , r = s[0][1]
              , i = s[1][0]
              , o = s[1][1];
            return fo(u(e), s).cells.forEach(function(s, u) {
                var a = s.edges
                  , f = s.site
                  , l = t[u] = a.length ? a.map(function(e) {
                    var t = e.start();
                    return [t.x, t.y]
                }) : f.x >= n && f.x <= i && f.y >= r && f.y <= o ? [[n, o], [i, o], [i, r], [n, r]] : [];
                l.point = e[u]
            }),
            t
        }
        function u(e) {
            return e.map(function(e, t) {
                return {
                    x: Math.round(r(e, t) / Ct) * Ct,
                    y: Math.round(i(e, t) / Ct) * Ct,
                    i: t
                }
            })
        }
        var t = xs
          , n = Ts
          , r = t
          , i = n
          , s = co;
        return e ? o(e) : (o.links = function(e) {
            return fo(u(e)).edges.filter(function(e) {
                return e.l && e.r
            }).map(function(t) {
                return {
                    source: e[t.l.i],
                    target: e[t.r.i]
                }
            })
        }
        ,
        o.triangles = function(e) {
            var t = [];
            return fo(u(e)).cells.forEach(function(n, r) {
                var i = n.site, s = n.edges.sort($s), o = -1, u = s.length, a, f, l = s[u - 1].edge, c = l.l === i ? l.r : l.l;
                while (++o < u)
                    a = l,
                    f = c,
                    l = s[o].edge,
                    c = l.l === i ? l.r : l.l,
                    r < f.i && r < c.i && ho(i, f, c) < 0 && t.push([e[r], e[f.i], e[c.i]])
            }),
            t
        }
        ,
        o.x = function(e) {
            return arguments.length ? (r = Tn(t = e),
            o) : t
        }
        ,
        o.y = function(e) {
            return arguments.length ? (i = Tn(n = e),
            o) : n
        }
        ,
        o.clipExtent = function(e) {
            return arguments.length ? (s = e == null ? co : e,
            o) : s === co ? null : s
        }
        ,
        o.size = function(e) {
            return arguments.length ? o.clipExtent(e && [[0, 0], e]) : s === co ? null : s && s[1]
        }
        ,
        o)
    }
    ;
    var co = [[-1e6, -1e6], [1e6, 1e6]];
    e.geom.delaunay = function(t) {
        return e.geom.voronoi().triangles(t)
    }
    ,
    e.geom.quadtree = function(e, t, n, r, i) {
        function a(e) {
            function T(e, t, n, r, i, s, o, u) {
                if (isNaN(n) || isNaN(r))
                    return;
                if (e.leaf) {
                    var a = e.x
                      , f = e.y;
                    if (a != null)
                        if (b(a - n) + b(f - r) < .01)
                            N(e, t, n, r, i, s, o, u);
                        else {
                            var l = e.point;
                            e.x = e.y = e.point = null,
                            N(e, l, a, f, i, s, o, u),
                            N(e, t, n, r, i, s, o, u)
                        }
                    else
                        e.x = n,
                        e.y = r,
                        e.point = t
                } else
                    N(e, t, n, r, i, s, o, u)
            }
            function N(e, t, n, r, i, s, o, u) {
                var a = (i + o) * .5
                  , f = (s + u) * .5
                  , l = n >= a
                  , c = r >= f
                  , h = c << 1 | l;
                e.leaf = !1,
                e = e.nodes[h] || (e.nodes[h] = mo()),
                l ? i = a : o = a,
                c ? s = f : u = f,
                T(e, t, n, r, i, s, o, u)
            }
            var a, f = Tn(s), l = Tn(o), c, h, p, d, v, m, g, y;
            if (t != null)
                v = t,
                m = n,
                g = r,
                y = i;
            else {
                g = y = -(v = m = Infinity),
                c = [],
                h = [],
                d = e.length;
                if (u)
                    for (p = 0; p < d; ++p)
                        a = e[p],
                        a.x < v && (v = a.x),
                        a.y < m && (m = a.y),
                        a.x > g && (g = a.x),
                        a.y > y && (y = a.y),
                        c.push(a.x),
                        h.push(a.y);
                else
                    for (p = 0; p < d; ++p) {
                        var w = +f(a = e[p], p)
                          , E = +l(a, p);
                        w < v && (v = w),
                        E < m && (m = E),
                        w > g && (g = w),
                        E > y && (y = E),
                        c.push(w),
                        h.push(E)
                    }
            }
            var S = g - v
              , x = y - m;
            S > x ? y = m + S : g = v + x;
            var C = mo();
            C.add = function(e) {
                T(C, e, +f(e, ++p), +l(e, p), v, m, g, y)
            }
            ,
            C.visit = function(e) {
                go(e, C, v, m, g, y)
            }
            ,
            C.find = function(e) {
                return yo(C, e[0], e[1], v, m, g, y)
            }
            ,
            p = -1;
            if (t == null) {
                while (++p < d)
                    T(C, e[p], c[p], h[p], v, m, g, y);
                --p
            } else
                e.forEach(C.add);
            return c = h = e = a = null,
            C
        }
        var s = xs, o = Ts, u;
        return (u = arguments.length) ? (s = po,
        o = vo,
        u === 3 && (i = n,
        r = t,
        n = t = 0),
        a(e)) : (a.x = function(e) {
            return arguments.length ? (s = e,
            a) : s
        }
        ,
        a.y = function(e) {
            return arguments.length ? (o = e,
            a) : o
        }
        ,
        a.extent = function(e) {
            return arguments.length ? (e == null ? t = n = r = i = null : (t = +e[0][0],
            n = +e[0][1],
            r = +e[1][0],
            i = +e[1][1]),
            a) : t == null ? null : [[t, n], [r, i]]
        }
        ,
        a.size = function(e) {
            return arguments.length ? (e == null ? t = n = r = i = null : (t = n = 0,
            r = +e[0],
            i = +e[1]),
            a) : t == null ? null : [r - t, i - n]
        }
        ,
        a)
    }
    ,
    e.interpolateRgb = bo,
    e.interpolateObject = wo,
    e.interpolateNumber = Eo,
    e.interpolateString = So;
    var xo = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
      , To = new RegExp(xo.source,"g");
    e.interpolate = No,
    e.interpolators = [function(e, t) {
        var n = typeof t;
        return (n === "string" ? xn.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? bo : So : t instanceof Jt ? bo : Array.isArray(t) ? Co : n === "object" && isNaN(t) ? wo : Eo)(e, t)
    }
    ],
    e.interpolateArray = Co;
    var ko = function() {
        return D
    }
      , Lo = e.map({
        linear: ko,
        poly: Bo,
        quad: function() {
            return Do
        },
        cubic: function() {
            return Po
        },
        sin: function() {
            return jo
        },
        exp: function() {
            return Fo
        },
        circle: function() {
            return Io
        },
        elastic: qo,
        back: Ro,
        bounce: function() {
            return Uo
        }
    })
      , Ao = e.map({
        "in": D,
        out: Mo,
        "in-out": _o,
        "out-in": function(e) {
            return _o(Mo(e))
        }
    });
    e.ease = function(e) {
        var n = e.indexOf("-")
          , r = n >= 0 ? e.slice(0, n) : e
          , i = n >= 0 ? e.slice(n + 1) : "in";
        return r = Lo.get(r) || ko,
        i = Ao.get(i) || D,
        Oo(i(r.apply(null, t.call(arguments, 1))))
    }
    ,
    e.interpolateHcl = zo,
    e.interpolateHsl = Wo,
    e.interpolateLab = Xo,
    e.interpolateRound = Vo,
    e.transform = function(t) {
        var n = r.createElementNS(e.ns.prefix.svg, "g");
        return (e.transform = function(e) {
            if (e != null) {
                n.setAttribute("transform", e);
                var t = n.transform.baseVal.consolidate()
            }
            return new $o(t ? t.matrix : Go)
        }
        )(t)
    }
    ,
    $o.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    }
    ;
    var Go = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    e.interpolateTransform = Yo,
    e.layout = {},
    e.layout.bundle = function() {
        return function(e) {
            var t = []
              , n = -1
              , r = e.length;
            while (++n < r)
                t.push(tu(e[n]));
            return t
        }
    }
    ,
    e.layout.chord = function() {
        function l() {
            var t = {}, l = [], h = e.range(s), p = [], d, v, m, g, y;
            n = [],
            r = [],
            d = 0,
            g = -1;
            while (++g < s) {
                v = 0,
                y = -1;
                while (++y < s)
                    v += i[g][y];
                l.push(v),
                p.push(e.range(s)),
                d += v
            }
            u && h.sort(function(e, t) {
                return u(l[e], l[t])
            }),
            a && p.forEach(function(e, t) {
                e.sort(function(e, n) {
                    return a(i[t][e], i[t][n])
                })
            }),
            d = (At - o * s) / d,
            v = 0,
            g = -1;
            while (++g < s) {
                m = v,
                y = -1;
                while (++y < s) {
                    var b = h[g]
                      , w = p[b][y]
                      , E = i[b][w]
                      , S = v
                      , x = v += E * d;
                    t[b + "-" + w] = {
                        index: b,
                        subindex: w,
                        startAngle: S,
                        endAngle: x,
                        value: E
                    }
                }
                r[b] = {
                    index: b,
                    startAngle: m,
                    endAngle: v,
                    value: (v - m) / d
                },
                v += o
            }
            g = -1;
            while (++g < s) {
                y = g - 1;
                while (++y < s) {
                    var T = t[g + "-" + y]
                      , N = t[y + "-" + g];
                    (T.value || N.value) && n.push(T.value < N.value ? {
                        source: N,
                        target: T
                    } : {
                        source: T,
                        target: N
                    })
                }
            }
            f && c()
        }
        function c() {
            n.sort(function(e, t) {
                return f((e.source.value + e.target.value) / 2, (t.source.value + t.target.value) / 2)
            })
        }
        var t = {}, n, r, i, s, o = 0, u, a, f;
        return t.matrix = function(e) {
            return arguments.length ? (s = (i = e) && i.length,
            n = r = null,
            t) : i
        }
        ,
        t.padding = function(e) {
            return arguments.length ? (o = e,
            n = r = null,
            t) : o
        }
        ,
        t.sortGroups = function(e) {
            return arguments.length ? (u = e,
            n = r = null,
            t) : u
        }
        ,
        t.sortSubgroups = function(e) {
            return arguments.length ? (a = e,
            n = null,
            t) : a
        }
        ,
        t.sortChords = function(e) {
            return arguments.length ? (f = e,
            n && c(),
            t) : f
        }
        ,
        t.chords = function() {
            return n || l(),
            n
        }
        ,
        t.groups = function() {
            return r || l(),
            r
        }
        ,
        t
    }
    ,
    e.layout.force = function() {
        function y(e) {
            return function(t, n, r, i) {
                if (t.point !== e) {
                    var s = t.cx - e.x
                      , o = t.cy - e.y
                      , u = i - n
                      , a = s * s + o * o;
                    if (u * u / h < a) {
                        if (a < l) {
                            var f = t.charge / a;
                            e.px -= s * f,
                            e.py -= o * f
                        }
                        return !0
                    }
                    if (t.point && a && a < l) {
                        var f = t.pointCharge / a;
                        e.px -= s * f,
                        e.py -= o * f
                    }
                }
                return !t.charge
            }
        }
        function b(n) {
            n.px = e.event.x,
            n.py = e.event.y,
            t.resume()
        }
        var t = {}, n = e.dispatch("start", "tick", "end"), r = [1, 1], i, s, o = .9, u = fu, a = lu, f = -30, l = cu, c = .1, h = .64, p = [], d = [], v, m, g;
        return t.tick = function() {
            if ((s *= .99) < .005)
                return n.end({
                    type: "end",
                    alpha: s = 0
                }),
                !0;
            var t = p.length, i = d.length, u, a, l, h, b, w, E, S, x;
            for (a = 0; a < i; ++a) {
                l = d[a],
                h = l.source,
                b = l.target,
                S = b.x - h.x,
                x = b.y - h.y;
                if (w = S * S + x * x)
                    w = s * m[a] * ((w = Math.sqrt(w)) - v[a]) / w,
                    S *= w,
                    x *= w,
                    b.x -= S * (E = h.weight / (b.weight + h.weight)),
                    b.y -= x * E,
                    h.x += S * (E = 1 - E),
                    h.y += x * E
            }
            if (E = s * c) {
                S = r[0] / 2,
                x = r[1] / 2,
                a = -1;
                if (E)
                    while (++a < t)
                        l = p[a],
                        l.x += (S - l.x) * E,
                        l.y += (x - l.y) * E
            }
            if (f) {
                au(u = e.geom.quadtree(p), s, g),
                a = -1;
                while (++a < t)
                    (l = p[a]).fixed || u.visit(y(l))
            }
            a = -1;
            while (++a < t)
                l = p[a],
                l.fixed ? (l.x = l.px,
                l.y = l.py) : (l.x -= (l.px - (l.px = l.x)) * o,
                l.y -= (l.py - (l.py = l.y)) * o);
            n.tick({
                type: "tick",
                alpha: s
            })
        }
        ,
        t.nodes = function(e) {
            return arguments.length ? (p = e,
            t) : p
        }
        ,
        t.links = function(e) {
            return arguments.length ? (d = e,
            t) : d
        }
        ,
        t.size = function(e) {
            return arguments.length ? (r = e,
            t) : r
        }
        ,
        t.linkDistance = function(e) {
            return arguments.length ? (u = typeof e == "function" ? e : +e,
            t) : u
        }
        ,
        t.distance = t.linkDistance,
        t.linkStrength = function(e) {
            return arguments.length ? (a = typeof e == "function" ? e : +e,
            t) : a
        }
        ,
        t.friction = function(e) {
            return arguments.length ? (o = +e,
            t) : o
        }
        ,
        t.charge = function(e) {
            return arguments.length ? (f = typeof e == "function" ? e : +e,
            t) : f
        }
        ,
        t.chargeDistance = function(e) {
            return arguments.length ? (l = e * e,
            t) : Math.sqrt(l)
        }
        ,
        t.gravity = function(e) {
            return arguments.length ? (c = +e,
            t) : c
        }
        ,
        t.theta = function(e) {
            return arguments.length ? (h = e * e,
            t) : Math.sqrt(h)
        }
        ,
        t.alpha = function(r) {
            return arguments.length ? (r = +r,
            s ? r > 0 ? s = r : s = 0 : r > 0 && (n.start({
                type: "start",
                alpha: s = r
            }),
            e.timer(t.tick)),
            t) : s
        }
        ,
        t.start = function() {
            function h(t, r) {
                if (!l) {
                    l = new Array(n);
                    for (u = 0; u < n; ++u)
                        l[u] = [];
                    for (u = 0; u < i; ++u) {
                        var s = d[u];
                        l[s.source.index].push(s.target),
                        l[s.target.index].push(s.source)
                    }
                }
                var o = l[e], u = -1, a = o.length, f;
                while (++u < a)
                    if (!isNaN(f = o[u][t]))
                        return f;
                return Math.random() * r
            }
            var e, n = p.length, i = d.length, s = r[0], o = r[1], l, c;
            for (e = 0; e < n; ++e)
                (c = p[e]).index = e,
                c.weight = 0;
            for (e = 0; e < i; ++e)
                c = d[e],
                typeof c.source == "number" && (c.source = p[c.source]),
                typeof c.target == "number" && (c.target = p[c.target]),
                ++c.source.weight,
                ++c.target.weight;
            for (e = 0; e < n; ++e)
                c = p[e],
                isNaN(c.x) && (c.x = h("x", s)),
                isNaN(c.y) && (c.y = h("y", o)),
                isNaN(c.px) && (c.px = c.x),
                isNaN(c.py) && (c.py = c.y);
            v = [];
            if (typeof u == "function")
                for (e = 0; e < i; ++e)
                    v[e] = +u.call(this, d[e], e);
            else
                for (e = 0; e < i; ++e)
                    v[e] = u;
            m = [];
            if (typeof a == "function")
                for (e = 0; e < i; ++e)
                    m[e] = +a.call(this, d[e], e);
            else
                for (e = 0; e < i; ++e)
                    m[e] = a;
            g = [];
            if (typeof f == "function")
                for (e = 0; e < n; ++e)
                    g[e] = +f.call(this, p[e], e);
            else
                for (e = 0; e < n; ++e)
                    g[e] = f;
            return t.resume()
        }
        ,
        t.resume = function() {
            return t.alpha(.1)
        }
        ,
        t.stop = function() {
            return t.alpha(0)
        }
        ,
        t.drag = function() {
            i || (i = e.behavior.drag().origin(D).on("dragstart.force", iu).on("drag.force", b).on("dragend.force", su));
            if (!arguments.length)
                return i;
            this.on("mouseover.force", ou).on("mouseout.force", uu).call(i)
        }
        ,
        e.rebind(t, n, "on")
    }
    ;
    var fu = 20
      , lu = 1
      , cu = Infinity;
    e.layout.hierarchy = function() {
        function r(i) {
            var s = [i], o = [], u;
            i.depth = 0;
            while ((u = s.pop()) != null) {
                o.push(u);
                if ((f = t.call(r, u, u.depth)) && (a = f.length)) {
                    var a, f, l;
                    while (--a >= 0)
                        s.push(l = f[a]),
                        l.parent = u,
                        l.depth = u.depth + 1;
                    n && (u.value = 0),
                    u.children = f
                } else
                    n && (u.value = +n.call(r, u, u.depth) || 0),
                    delete u.children
            }
            return du(i, function(t) {
                var r, i;
                e && (r = t.children) && r.sort(e),
                n && (i = t.parent) && (i.value += t.value)
            }),
            o
        }
        var e = gu
          , t = vu
          , n = mu;
        return r.sort = function(t) {
            return arguments.length ? (e = t,
            r) : e
        }
        ,
        r.children = function(e) {
            return arguments.length ? (t = e,
            r) : t
        }
        ,
        r.value = function(e) {
            return arguments.length ? (n = e,
            r) : n
        }
        ,
        r.revalue = function(e) {
            return n && (pu(e, function(e) {
                e.children && (e.value = 0)
            }),
            du(e, function(e) {
                var t;
                e.children || (e.value = +n.call(r, e, e.depth) || 0);
                if (t = e.parent)
                    t.value += e.value
            })),
            e
        }
        ,
        r
    }
    ,
    e.layout.partition = function() {
        function r(e, t, n, i) {
            var s = e.children;
            e.x = t,
            e.y = e.depth * i,
            e.dx = n,
            e.dy = i;
            if (s && (u = s.length)) {
                var o = -1, u, a, f;
                n = e.value ? n / e.value : 0;
                while (++o < u)
                    r(a = s[o], t, f = a.value * n, i),
                    t += f
            }
        }
        function i(e) {
            var t = e.children
              , n = 0;
            if (t && (s = t.length)) {
                var r = -1, s;
                while (++r < s)
                    n = Math.max(n, i(t[r]))
            }
            return 1 + n
        }
        function s(e, s) {
            var o = t.call(this, e, s);
            return r(o[0], 0, n[0], n[1] / i(o[0])),
            o
        }
        var t = e.layout.hierarchy()
          , n = [1, 1];
        return s.size = function(e) {
            return arguments.length ? (n = e,
            s) : n
        }
        ,
        hu(s, t)
    }
    ,
    e.layout.pie = function() {
        function o(u) {
            var a = u.length, f = u.map(function(e, n) {
                return +t.call(o, e, n)
            }), l = +(typeof r == "function" ? r.apply(this, arguments) : r), c = (typeof i == "function" ? i.apply(this, arguments) : i) - l, h = Math.min(Math.abs(c) / a, +(typeof s == "function" ? s.apply(this, arguments) : s)), p = h * (c < 0 ? -1 : 1), d = (c - a * p) / e.sum(f), v = e.range(a), m = [], g;
            return n != null && v.sort(n === bu ? function(e, t) {
                return f[t] - f[e]
            }
            : function(e, t) {
                return n(u[e], u[t])
            }
            ),
            v.forEach(function(e) {
                m[e] = {
                    data: u[e],
                    value: g = f[e],
                    startAngle: l,
                    endAngle: l += g * d + p,
                    padAngle: h
                }
            }),
            m
        }
        var t = Number
          , n = bu
          , r = 0
          , i = At
          , s = 0;
        return o.value = function(e) {
            return arguments.length ? (t = e,
            o) : t
        }
        ,
        o.sort = function(e) {
            return arguments.length ? (n = e,
            o) : n
        }
        ,
        o.startAngle = function(e) {
            return arguments.length ? (r = e,
            o) : r
        }
        ,
        o.endAngle = function(e) {
            return arguments.length ? (i = e,
            o) : i
        }
        ,
        o.padAngle = function(e) {
            return arguments.length ? (s = e,
            o) : s
        }
        ,
        o
    }
    ;
    var bu = {};
    e.layout.stack = function() {
        function u(a, f) {
            if (!(v = a.length))
                return a;
            var l = a.map(function(e, n) {
                return t.call(u, e, n)
            })
              , c = l.map(function(e) {
                return e.map(function(e, t) {
                    return [s.call(u, e, t), o.call(u, e, t)]
                })
            })
              , h = n.call(u, c, f);
            l = e.permute(l, h),
            c = e.permute(c, h);
            var p = r.call(u, c, f), d = l[0].length, v, m, g, y;
            for (g = 0; g < d; ++g) {
                i.call(u, l[0][g], y = p[g], c[0][g][1]);
                for (m = 1; m < v; ++m)
                    i.call(u, l[m][g], y += c[m - 1][g][1], c[m][g][1])
            }
            return a
        }
        var t = D
          , n = Nu
          , r = Cu
          , i = Su
          , s = wu
          , o = Eu;
        return u.values = function(e) {
            return arguments.length ? (t = e,
            u) : t
        }
        ,
        u.order = function(e) {
            return arguments.length ? (n = typeof e == "function" ? e : xu.get(e) || Nu,
            u) : n
        }
        ,
        u.offset = function(e) {
            return arguments.length ? (r = typeof e == "function" ? e : Tu.get(e) || Cu,
            u) : r
        }
        ,
        u.x = function(e) {
            return arguments.length ? (s = e,
            u) : s
        }
        ,
        u.y = function(e) {
            return arguments.length ? (o = e,
            u) : o
        }
        ,
        u.out = function(e) {
            return arguments.length ? (i = e,
            u) : i
        }
        ,
        u
    }
    ;
    var xu = e.map({
        "inside-out": function(t) {
            var n = t.length, r, i, s = t.map(ku), o = t.map(Lu), u = e.range(n).sort(function(e, t) {
                return s[e] - s[t]
            }), a = 0, f = 0, l = [], c = [];
            for (r = 0; r < n; ++r)
                i = u[r],
                a < f ? (a += o[i],
                l.push(i)) : (f += o[i],
                c.push(i));
            return c.reverse().concat(l)
        },
        reverse: function(t) {
            return e.range(t.length).reverse()
        },
        "default": Nu
    })
      , Tu = e.map({
        silhouette: function(e) {
            var t = e.length, n = e[0].length, r = [], i = 0, s, o, u, a = [];
            for (o = 0; o < n; ++o) {
                for (s = 0,
                u = 0; s < t; s++)
                    u += e[s][o][1];
                u > i && (i = u),
                r.push(u)
            }
            for (o = 0; o < n; ++o)
                a[o] = (i - r[o]) / 2;
            return a
        },
        wiggle: function(e) {
            var t = e.length, n = e[0], r = n.length, i, s, o, u, a, f, l, c, h, p = [];
            p[0] = c = h = 0;
            for (s = 1; s < r; ++s) {
                for (i = 0,
                u = 0; i < t; ++i)
                    u += e[i][s][1];
                for (i = 0,
                a = 0,
                l = n[s][0] - n[s - 1][0]; i < t; ++i) {
                    for (o = 0,
                    f = (e[i][s][1] - e[i][s - 1][1]) / (2 * l); o < i; ++o)
                        f += (e[o][s][1] - e[o][s - 1][1]) / l;
                    a += f * e[i][s][1]
                }
                p[s] = c -= u ? a / u * l : 0,
                c < h && (h = c)
            }
            for (s = 0; s < r; ++s)
                p[s] -= h;
            return p
        },
        expand: function(e) {
            var t = e.length, n = e[0].length, r = 1 / t, i, s, o, u = [];
            for (s = 0; s < n; ++s) {
                for (i = 0,
                o = 0; i < t; i++)
                    o += e[i][s][1];
                if (o)
                    for (i = 0; i < t; i++)
                        e[i][s][1] /= o;
                else
                    for (i = 0; i < t; i++)
                        e[i][s][1] = r
            }
            for (s = 0; s < n; ++s)
                u[s] = 0;
            return u
        },
        zero: Cu
    });
    e.layout.histogram = function() {
        function s(s, o) {
            var u = [], a = s.map(n, this), f = r.call(this, a, o), l = i.call(this, f, a, o), c, o = -1, h = a.length, p = l.length - 1, d = t ? 1 : 1 / h, v;
            while (++o < p)
                c = u[o] = [],
                c.dx = l[o + 1] - (c.x = l[o]),
                c.y = 0;
            if (p > 0) {
                o = -1;
                while (++o < h)
                    v = a[o],
                    v >= f[0] && v <= f[1] && (c = u[e.bisect(l, v, 1, p) - 1],
                    c.y += d,
                    c.push(s[o]))
            }
            return u
        }
        var t = !0
          , n = Number
          , r = _u
          , i = Ou;
        return s.value = function(e) {
            return arguments.length ? (n = e,
            s) : n
        }
        ,
        s.range = function(e) {
            return arguments.length ? (r = Tn(e),
            s) : r
        }
        ,
        s.bins = function(e) {
            return arguments.length ? (i = typeof e == "number" ? function(t) {
                return Mu(t, e)
            }
            : Tn(e),
            s) : i
        }
        ,
        s.frequency = function(e) {
            return arguments.length ? (t = !!e,
            s) : t
        }
        ,
        s
    }
    ,
    e.layout.pack = function() {
        function s(e, s) {
            var o = t.call(this, e, s)
              , u = o[0]
              , a = r[0]
              , f = r[1]
              , l = i == null ? Math.sqrt : typeof i == "function" ? i : function() {
                return i
            }
            ;
            u.x = u.y = 0,
            du(u, function(e) {
                e.r = +l(e.value)
            }),
            du(u, ju);
            if (n) {
                var c = n * (i ? 1 : Math.max(2 * u.r / a, 2 * u.r / f)) / 2;
                du(u, function(e) {
                    e.r += c
                }),
                du(u, ju),
                du(u, function(e) {
                    e.r -= c
                })
            }
            return qu(u, a / 2, f / 2, i ? 1 : 1 / Math.max(2 * u.r / a, 2 * u.r / f)),
            o
        }
        var t = e.layout.hierarchy().sort(Du), n = 0, r = [1, 1], i;
        return s.size = function(e) {
            return arguments.length ? (r = e,
            s) : r
        }
        ,
        s.radius = function(e) {
            return arguments.length ? (i = e == null || typeof e == "function" ? e : +e,
            s) : i
        }
        ,
        s.padding = function(e) {
            return arguments.length ? (n = +e,
            s) : n
        }
        ,
        hu(s, t)
    }
    ,
    e.layout.tree = function() {
        function s(e, s) {
            var f = t.call(this, e, s)
              , c = f[0]
              , h = o(c);
            du(h, u),
            h.parent.m = -h.z,
            pu(h, a);
            if (i)
                pu(c, l);
            else {
                var p = c
                  , d = c
                  , v = c;
                pu(c, function(e) {
                    e.x < p.x && (p = e),
                    e.x > d.x && (d = e),
                    e.depth > v.depth && (v = e)
                });
                var m = n(p, d) / 2 - p.x
                  , g = r[0] / (d.x + n(d, p) / 2 + m)
                  , y = r[1] / (v.depth || 1);
                pu(c, function(e) {
                    e.x = (e.x + m) * g,
                    e.y = e.depth * y
                })
            }
            return f
        }
        function o(e) {
            var t = {
                A: null,
                children: [e]
            }, n = [t], r;
            while ((r = n.pop()) != null)
                for (var i = r.children, s, o = 0, u = i.length; o < u; ++o)
                    n.push((i[o] = s = {
                        _: i[o],
                        parent: r,
                        children: (s = i[o].children) && s.slice() || [],
                        A: null,
                        a: null,
                        z: 0,
                        m: 0,
                        c: 0,
                        s: 0,
                        t: null,
                        i: o
                    }).a = s);
            return t.children[0]
        }
        function u(e) {
            var t = e.children
              , r = e.parent.children
              , i = e.i ? r[e.i - 1] : null;
            if (t.length) {
                Vu(e);
                var s = (t[0].z + t[t.length - 1].z) / 2;
                i ? (e.z = i.z + n(e._, i._),
                e.m = e.z - s) : e.z = s
            } else
                i && (e.z = i.z + n(e._, i._));
            e.parent.A = f(e, i, e.parent.A || r[0])
        }
        function a(e) {
            e._.x = e.z + e.parent.m,
            e.m += e.parent.m
        }
        function f(e, t, r) {
            if (t) {
                var i = e, s = e, o = t, u = i.parent.children[0], a = i.m, f = s.m, l = o.m, c = u.m, h;
                while (o = Wu(o),
                i = zu(i),
                o && i)
                    u = zu(u),
                    s = Wu(s),
                    s.a = e,
                    h = o.z + l - i.z - a + n(o._, i._),
                    h > 0 && (Xu($u(o, e, r), e, h),
                    a += h,
                    f += h),
                    l += o.m,
                    a += i.m,
                    c += u.m,
                    f += s.m;
                o && !Wu(s) && (s.t = o,
                s.m += l - f),
                i && !zu(u) && (u.t = i,
                u.m += a - c,
                r = e)
            }
            return r
        }
        function l(e) {
            e.x *= r[0],
            e.y = e.depth * r[1]
        }
        var t = e.layout.hierarchy().sort(null).value(null)
          , n = Uu
          , r = [1, 1]
          , i = null;
        return s.separation = function(e) {
            return arguments.length ? (n = e,
            s) : n
        }
        ,
        s.size = function(e) {
            return arguments.length ? (i = (r = e) == null ? l : null,
            s) : i ? null : r
        }
        ,
        s.nodeSize = function(e) {
            return arguments.length ? (i = (r = e) == null ? null : l,
            s) : i ? r : null
        }
        ,
        hu(s, t)
    }
    ,
    e.layout.cluster = function() {
        function s(e, s) {
            var o = t.call(this, e, s), u = o[0], a, f = 0;
            du(u, function(e) {
                var t = e.children;
                t && t.length ? (e.x = Ku(t),
                e.y = Ju(t)) : (e.x = a ? f += n(e, a) : 0,
                e.y = 0,
                a = e)
            });
            var l = Qu(u)
              , c = Gu(u)
              , h = l.x - n(l, c) / 2
              , p = c.x + n(c, l) / 2;
            return du(u, i ? function(e) {
                e.x = (e.x - u.x) * r[0],
                e.y = (u.y - e.y) * r[1]
            }
            : function(e) {
                e.x = (e.x - h) / (p - h) * r[0],
                e.y = (1 - (u.y ? e.y / u.y : 1)) * r[1]
            }
            ),
            o
        }
        var t = e.layout.hierarchy().sort(null).value(null)
          , n = Uu
          , r = [1, 1]
          , i = !1;
        return s.separation = function(e) {
            return arguments.length ? (n = e,
            s) : n
        }
        ,
        s.size = function(e) {
            return arguments.length ? (i = (r = e) == null,
            s) : i ? null : r
        }
        ,
        s.nodeSize = function(e) {
            return arguments.length ? (i = (r = e) != null,
            s) : i ? r : null
        }
        ,
        hu(s, t)
    }
    ,
    e.layout.treemap = function() {
        function l(e, t) {
            var n = -1, r = e.length, i, s;
            while (++n < r)
                s = (i = e[n]).value * (t < 0 ? 0 : t),
                i.area = isNaN(s) || s <= 0 ? 0 : s
        }
        function c(e) {
            var t = e.children;
            if (t && t.length) {
                var n = s(e), r = [], i = t.slice(), o, u = Infinity, f, h = a === "slice" ? n.dx : a === "dice" ? n.dy : a === "slice-dice" ? e.depth & 1 ? n.dy : n.dx : Math.min(n.dx, n.dy), v;
                l(i, n.dx * n.dy / e.value),
                r.area = 0;
                while ((v = i.length) > 0)
                    r.push(o = i[v - 1]),
                    r.area += o.area,
                    a !== "squarify" || (f = p(r, h)) <= u ? (i.pop(),
                    u = f) : (r.area -= r.pop().area,
                    d(r, h, n, !1),
                    h = Math.min(n.dx, n.dy),
                    r.length = r.area = 0,
                    u = Infinity);
                r.length && (d(r, h, n, !0),
                r.length = r.area = 0),
                t.forEach(c)
            }
        }
        function h(e) {
            var t = e.children;
            if (t && t.length) {
                var n = s(e), r = t.slice(), i, o = [];
                l(r, n.dx * n.dy / e.value),
                o.area = 0;
                while (i = r.pop())
                    o.push(i),
                    o.area += i.area,
                    i.z != null && (d(o, i.z ? n.dx : n.dy, n, !r.length),
                    o.length = o.area = 0);
                t.forEach(h)
            }
        }
        function p(e, t) {
            var n = e.area, r, i = 0, s = Infinity, o = -1, u = e.length;
            while (++o < u) {
                if (!(r = e[o].area))
                    continue;
                r < s && (s = r),
                r > i && (i = r)
            }
            return n *= n,
            t *= t,
            n ? Math.max(t * i * f / n, n / (t * s * f)) : Infinity
        }
        function d(e, t, r, i) {
            var s = -1, o = e.length, u = r.x, a = r.y, f = t ? n(e.area / t) : 0, l;
            if (t == r.dx) {
                if (i || f > r.dy)
                    f = r.dy;
                while (++s < o)
                    l = e[s],
                    l.x = u,
                    l.y = a,
                    l.dy = f,
                    u += l.dx = Math.min(r.x + r.dx - u, f ? n(l.area / f) : 0);
                l.z = !0,
                l.dx += r.x + r.dx - u,
                r.y += f,
                r.dy -= f
            } else {
                if (i || f > r.dx)
                    f = r.dx;
                while (++s < o)
                    l = e[s],
                    l.x = u,
                    l.y = a,
                    l.dx = f,
                    a += l.dy = Math.min(r.y + r.dy - a, f ? n(l.area / f) : 0);
                l.z = !1,
                l.dy += r.y + r.dy - a,
                r.x += f,
                r.dx -= f
            }
        }
        function v(e) {
            var n = u || t(e)
              , i = n[0];
            return i.x = 0,
            i.y = 0,
            i.dx = r[0],
            i.dy = r[1],
            u && t.revalue(i),
            l([i], i.dx * i.dy / i.value),
            (u ? h : c)(i),
            o && (u = n),
            n
        }
        var t = e.layout.hierarchy(), n = Math.round, r = [1, 1], i = null, s = Yu, o = !1, u, a = "squarify", f = .5 * (1 + Math.sqrt(5));
        return v.size = function(e) {
            return arguments.length ? (r = e,
            v) : r
        }
        ,
        v.padding = function(e) {
            function t(t) {
                var n = e.call(v, t, t.depth);
                return n == null ? Yu(t) : Zu(t, typeof n == "number" ? [n, n, n, n] : n)
            }
            function n(t) {
                return Zu(t, e)
            }
            if (!arguments.length)
                return i;
            var r;
            return s = (i = e) == null ? Yu : (r = typeof e) === "function" ? t : r === "number" ? (e = [e, e, e, e],
            n) : n,
            v
        }
        ,
        v.round = function(e) {
            return arguments.length ? (n = e ? Math.round : Number,
            v) : n != Number
        }
        ,
        v.sticky = function(e) {
            return arguments.length ? (o = e,
            u = null,
            v) : o
        }
        ,
        v.ratio = function(e) {
            return arguments.length ? (f = e,
            v) : f
        }
        ,
        v.mode = function(e) {
            return arguments.length ? (a = e + "",
            v) : a
        }
        ,
        hu(v, t)
    }
    ,
    e.random = {
        normal: function(e, t) {
            var n = arguments.length;
            return n < 2 && (t = 1),
            n < 1 && (e = 0),
            function() {
                var n, r, i;
                do
                    n = Math.random() * 2 - 1,
                    r = Math.random() * 2 - 1,
                    i = n * n + r * r;
                while (!i || i > 1);
                return e + t * n * Math.sqrt(-2 * Math.log(i) / i)
            }
        },
        logNormal: function() {
            var t = e.random.normal.apply(e, arguments);
            return function() {
                return Math.exp(t())
            }
        },
        bates: function(t) {
            var n = e.random.irwinHall(t);
            return function() {
                return n() / t
            }
        },
        irwinHall: function(e) {
            return function() {
                for (var t = 0, n = 0; n < e; n++)
                    t += Math.random();
                return t
            }
        }
    },
    e.scale = {};
    var sa = {
        floor: D,
        ceil: D
    };
    e.scale.linear = function() {
        return ua([0, 1], [0, 1], No, !1)
    }
    ;
    var pa = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    e.scale.log = function() {
        return ma(e.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    }
    ;
    var ga = e.format(".0e")
      , ya = {
        floor: function(e) {
            return -Math.ceil(-e)
        },
        ceil: function(e) {
            return -Math.floor(-e)
        }
    };
    e.scale.pow = function() {
        return ba(e.scale.linear(), 1, [0, 1])
    }
    ,
    e.scale.sqrt = function() {
        return e.scale.pow().exponent(.5)
    }
    ,
    e.scale.ordinal = function() {
        return Ea([], {
            t: "range",
            a: [[]]
        })
    }
    ,
    e.scale.category10 = function() {
        return e.scale.ordinal().range(Sa)
    }
    ,
    e.scale.category20 = function() {
        return e.scale.ordinal().range(xa)
    }
    ,
    e.scale.category20b = function() {
        return e.scale.ordinal().range(Ta)
    }
    ,
    e.scale.category20c = function() {
        return e.scale.ordinal().range(Na)
    }
    ;
    var Sa = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(vn)
      , xa = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(vn)
      , Ta = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(vn)
      , Na = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(vn);
    e.scale.quantile = function() {
        return Ca([], [])
    }
    ,
    e.scale.quantize = function() {
        return ka(0, 1, [0, 1])
    }
    ,
    e.scale.threshold = function() {
        return La([.5], [0, 1])
    }
    ,
    e.scale.identity = function() {
        return Aa([0, 1])
    }
    ,
    e.svg = {},
    e.svg.arc = function() {
        function u() {
            var u = Math.max(0, +e.apply(this, arguments))
              , f = Math.max(0, +t.apply(this, arguments))
              , l = i.apply(this, arguments) - Mt
              , c = s.apply(this, arguments) - Mt
              , h = Math.abs(c - l)
              , p = l > c ? 0 : 1;
            f < u && (d = f,
            f = u,
            u = d);
            if (h >= Ot)
                return a(f, p) + (u ? a(u, 1 - p) : "") + "Z";
            var d, v, m, g, y = 0, b = 0, w, E, S, x, T, N, C, k, L = [];
            if (g = (+o.apply(this, arguments) || 0) / 2)
                m = r === Ma ? Math.sqrt(u * u + f * f) : +r.apply(this, arguments),
                p || (b *= -1),
                f && (b = jt(m / f * Math.sin(g))),
                u && (y = jt(m / u * Math.sin(g)));
            if (f) {
                w = f * Math.cos(l + b),
                E = f * Math.sin(l + b),
                S = f * Math.cos(c - b),
                x = f * Math.sin(c - b);
                var A = Math.abs(c - l - 2 * b) <= Lt ? 0 : 1;
                if (b && ja(w, E, S, x) === p ^ A) {
                    var O = (l + c) / 2;
                    w = f * Math.cos(O),
                    E = f * Math.sin(O),
                    S = x = null
                }
            } else
                w = E = 0;
            if (u) {
                T = u * Math.cos(c - y),
                N = u * Math.sin(c - y),
                C = u * Math.cos(l + y),
                k = u * Math.sin(l + y);
                var M = Math.abs(l - c + 2 * y) <= Lt ? 0 : 1;
                if (y && ja(T, N, C, k) === 1 - p ^ M) {
                    var _ = (l + c) / 2;
                    T = u * Math.cos(_),
                    N = u * Math.sin(_),
                    C = k = null
                }
            } else
                T = N = 0;
            if ((d = Math.min(Math.abs(f - u) / 2, +n.apply(this, arguments))) > .001) {
                v = u < f ^ p ? 0 : 1;
                var D = C == null ? [T, N] : S == null ? [w, E] : As([w, E], [C, k], [S, x], [T, N])
                  , P = w - D[0]
                  , H = E - D[1]
                  , B = S - D[0]
                  , j = x - D[1]
                  , F = 1 / Math.sin(Math.acos((P * B + H * j) / (Math.sqrt(P * P + H * H) * Math.sqrt(B * B + j * j))) / 2)
                  , I = Math.sqrt(D[0] * D[0] + D[1] * D[1]);
                if (S != null) {
                    var q = Math.min(d, (f - I) / (F + 1))
                      , R = Fa(C == null ? [T, N] : [C, k], [w, E], f, q, p)
                      , U = Fa([S, x], [T, N], f, q, p);
                    d === q ? L.push("M", R[0], "A", q, ",", q, " 0 0,", v, " ", R[1], "A", f, ",", f, " 0 ", 1 - p ^ ja(R[1][0], R[1][1], U[1][0], U[1][1]), ",", p, " ", U[1], "A", q, ",", q, " 0 0,", v, " ", U[0]) : L.push("M", R[0], "A", q, ",", q, " 0 1,", v, " ", U[0])
                } else
                    L.push("M", w, ",", E);
                if (C != null) {
                    var z = Math.min(d, (u - I) / (F - 1))
                      , W = Fa([w, E], [C, k], u, -z, p)
                      , X = Fa([T, N], S == null ? [w, E] : [S, x], u, -z, p);
                    d === z ? L.push("L", X[0], "A", z, ",", z, " 0 0,", v, " ", X[1], "A", u, ",", u, " 0 ", p ^ ja(X[1][0], X[1][1], W[1][0], W[1][1]), ",", 1 - p, " ", W[1], "A", z, ",", z, " 0 0,", v, " ", W[0]) : L.push("L", X[0], "A", z, ",", z, " 0 0,", v, " ", W[0])
                } else
                    L.push("L", T, ",", N)
            } else
                L.push("M", w, ",", E),
                S != null && L.push("A", f, ",", f, " 0 ", A, ",", p, " ", S, ",", x),
                L.push("L", T, ",", N),
                C != null && L.push("A", u, ",", u, " 0 ", M, ",", 1 - p, " ", C, ",", k);
            return L.push("Z"),
            L.join("")
        }
        function a(e, t) {
            return "M0," + e + "A" + e + "," + e + " 0 1," + t + " 0," + -e + "A" + e + "," + e + " 0 1," + t + " 0," + e
        }
        var e = _a
          , t = Da
          , n = Oa
          , r = Ma
          , i = Pa
          , s = Ha
          , o = Ba;
        return u.innerRadius = function(t) {
            return arguments.length ? (e = Tn(t),
            u) : e
        }
        ,
        u.outerRadius = function(e) {
            return arguments.length ? (t = Tn(e),
            u) : t
        }
        ,
        u.cornerRadius = function(e) {
            return arguments.length ? (n = Tn(e),
            u) : n
        }
        ,
        u.padRadius = function(e) {
            return arguments.length ? (r = e == Ma ? Ma : Tn(e),
            u) : r
        }
        ,
        u.startAngle = function(e) {
            return arguments.length ? (i = Tn(e),
            u) : i
        }
        ,
        u.endAngle = function(e) {
            return arguments.length ? (s = Tn(e),
            u) : s
        }
        ,
        u.padAngle = function(e) {
            return arguments.length ? (o = Tn(e),
            u) : o
        }
        ,
        u.centroid = function() {
            var n = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2
              , r = (+i.apply(this, arguments) + +s.apply(this, arguments)) / 2 - Mt;
            return [Math.cos(r) * n, Math.sin(r) * n]
        }
        ,
        u
    }
    ;
    var Ma = "auto";
    e.svg.line = function() {
        return Ia(D)
    }
    ;
    var qa = e.map({
        linear: Ra,
        "linear-closed": Ua,
        step: za,
        "step-before": Wa,
        "step-after": Xa,
        basis: Ga,
        "basis-open": Ya,
        "basis-closed": Za,
        bundle: ef,
        cardinal: Ja,
        "cardinal-open": Va,
        "cardinal-closed": $a,
        monotone: lf
    });
    qa.forEach(function(e, t) {
        t.key = e,
        t.closed = /-closed$/.test(e)
    });
    var nf = [0, 2 / 3, 1 / 3, 0]
      , rf = [0, 1 / 3, 2 / 3, 0]
      , sf = [0, 1 / 6, 2 / 3, 1 / 6];
    e.svg.line.radial = function() {
        var e = Ia(cf);
        return e.radius = e.x,
        delete e.x,
        e.angle = e.y,
        delete e.y,
        e
    }
    ,
    Wa.reverse = Xa,
    Xa.reverse = Wa,
    e.svg.area = function() {
        return hf(D)
    }
    ,
    e.svg.area.radial = function() {
        var e = hf(cf);
        return e.radius = e.x,
        delete e.x,
        e.innerRadius = e.x0,
        delete e.x0,
        e.outerRadius = e.x1,
        delete e.x1,
        e.angle = e.y,
        delete e.y,
        e.startAngle = e.y0,
        delete e.y0,
        e.endAngle = e.y1,
        delete e.y1,
        e
    }
    ,
    e.svg.chord = function() {
        function s(n, r) {
            var i = o(this, e, n, r)
              , s = o(this, t, n, r);
            return "M" + i.p0 + a(i.r, i.p1, i.a1 - i.a0) + (u(i, s) ? f(i.r, i.p1, i.r, i.p0) : f(i.r, i.p1, s.r, s.p0) + a(s.r, s.p1, s.a1 - s.a0) + f(s.r, s.p1, i.r, i.p0)) + "Z"
        }
        function o(e, t, s, o) {
            var u = t.call(e, s, o)
              , a = n.call(e, u, o)
              , f = r.call(e, u, o) - Mt
              , l = i.call(e, u, o) - Mt;
            return {
                r: a,
                a0: f,
                a1: l,
                p0: [a * Math.cos(f), a * Math.sin(f)],
                p1: [a * Math.cos(l), a * Math.sin(l)]
            }
        }
        function u(e, t) {
            return e.a0 == t.a0 && e.a1 == t.a1
        }
        function a(e, t, n) {
            return "A" + e + "," + e + " 0 " + +(n > Lt) + ",1 " + t
        }
        function f(e, t, n, r) {
            return "Q 0,0 " + r
        }
        var e = os
          , t = us
          , n = pf
          , r = Pa
          , i = Ha;
        return s.radius = function(e) {
            return arguments.length ? (n = Tn(e),
            s) : n
        }
        ,
        s.source = function(t) {
            return arguments.length ? (e = Tn(t),
            s) : e
        }
        ,
        s.target = function(e) {
            return arguments.length ? (t = Tn(e),
            s) : t
        }
        ,
        s.startAngle = function(e) {
            return arguments.length ? (r = Tn(e),
            s) : r
        }
        ,
        s.endAngle = function(e) {
            return arguments.length ? (i = Tn(e),
            s) : i
        }
        ,
        s
    }
    ,
    e.svg.diagonal = function() {
        function r(r, i) {
            var s = e.call(this, r, i)
              , o = t.call(this, r, i)
              , u = (s.y + o.y) / 2
              , a = [s, {
                x: s.x,
                y: u
            }, {
                x: o.x,
                y: u
            }, o];
            return a = a.map(n),
            "M" + a[0] + "C" + a[1] + " " + a[2] + " " + a[3]
        }
        var e = os
          , t = us
          , n = df;
        return r.source = function(t) {
            return arguments.length ? (e = Tn(t),
            r) : e
        }
        ,
        r.target = function(e) {
            return arguments.length ? (t = Tn(e),
            r) : t
        }
        ,
        r.projection = function(e) {
            return arguments.length ? (n = e,
            r) : n
        }
        ,
        r
    }
    ,
    e.svg.diagonal.radial = function() {
        var t = e.svg.diagonal()
          , n = df
          , r = t.projection;
        return t.projection = function(e) {
            return arguments.length ? r(vf(n = e)) : n
        }
        ,
        t
    }
    ,
    e.svg.symbol = function() {
        function n(n, r) {
            return (bf.get(e.call(this, n, r)) || yf)(t.call(this, n, r))
        }
        var e = gf
          , t = mf;
        return n.type = function(t) {
            return arguments.length ? (e = Tn(t),
            n) : e
        }
        ,
        n.size = function(e) {
            return arguments.length ? (t = Tn(e),
            n) : t
        }
        ,
        n
    }
    ;
    var bf = e.map({
        circle: yf,
        cross: function(e) {
            var t = Math.sqrt(e / 5) / 2;
            return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z"
        },
        diamond: function(e) {
            var t = Math.sqrt(e / (2 * Ef))
              , n = t * Ef;
            return "M0," + -t + "L" + n + ",0" + " 0," + t + " " + -n + ",0" + "Z"
        },
        square: function(e) {
            var t = Math.sqrt(e) / 2;
            return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z"
        },
        "triangle-down": function(e) {
            var t = Math.sqrt(e / wf)
              , n = t * wf / 2;
            return "M0," + n + "L" + t + "," + -n + " " + -t + "," + -n + "Z"
        },
        "triangle-up": function(e) {
            var t = Math.sqrt(e / wf)
              , n = t * wf / 2;
            return "M0," + -n + "L" + t + "," + n + " " + -t + "," + n + "Z"
        }
    });
    e.svg.symbolTypes = bf.keys();
    var wf = Math.sqrt(3)
      , Ef = Math.tan(30 * _t);
    K.transition = function(e) {
        var t = kf || ++Cf, n = Mf(e), r = [], i, s, o = Lf || {
            time: Date.now(),
            ease: Ho,
            delay: 0,
            duration: 250
        };
        for (var u = -1, a = this.length; ++u < a; ) {
            r.push(i = []);
            for (var f = this[u], l = -1, c = f.length; ++l < c; )
                (s = f[l]) && _f(s, l, n, t, o),
                i.push(s)
        }
        return Tf(r, n, t)
    }
    ,
    K.interrupt = function(e) {
        return this.each(e == null ? Sf : xf(Mf(e)))
    }
    ;
    var Sf = xf(Mf()), Nf = [], Cf = 0, kf, Lf;
    Nf.call = K.call,
    Nf.empty = K.empty,
    Nf.node = K.node,
    Nf.size = K.size,
    e.transition = function(t, n) {
        return t && t.transition ? kf ? t.transition(n) : t : e.selection().transition(t)
    }
    ,
    e.transition.prototype = Nf,
    Nf.select = function(e) {
        var t = this.id, n = this.namespace, r = [], i, s, o;
        e = Q(e);
        for (var u = -1, a = this.length; ++u < a; ) {
            r.push(i = []);
            for (var f = this[u], l = -1, c = f.length; ++l < c; )
                (o = f[l]) && (s = e.call(o, o.__data__, l, u)) ? ("__data__"in o && (s.__data__ = o.__data__),
                _f(s, l, n, t, o[n][t]),
                i.push(s)) : i.push(null)
        }
        return Tf(r, n, t)
    }
    ,
    Nf.selectAll = function(e) {
        var t = this.id, n = this.namespace, r = [], i, s, o, u, a;
        e = G(e);
        for (var f = -1, l = this.length; ++f < l; )
            for (var c = this[f], h = -1, p = c.length; ++h < p; )
                if (o = c[h]) {
                    a = o[n][t],
                    s = e.call(o, o.__data__, h, f),
                    r.push(i = []);
                    for (var d = -1, v = s.length; ++d < v; )
                        (u = s[d]) && _f(u, d, n, t, a),
                        i.push(u)
                }
        return Tf(r, n, t)
    }
    ,
    Nf.filter = function(e) {
        var t = [], n, r, i;
        typeof e != "function" && (e = lt(e));
        for (var s = 0, o = this.length; s < o; s++) {
            t.push(n = []);
            for (var r = this[s], u = 0, a = r.length; u < a; u++)
                (i = r[u]) && e.call(i, i.__data__, u, s) && n.push(i)
        }
        return Tf(t, this.namespace, this.id)
    }
    ,
    Nf.tween = function(e, t) {
        var n = this.id
          , r = this.namespace;
        return arguments.length < 2 ? this.node()[r][n].tween.get(e) : ht(this, t == null ? function(t) {
            t[r][n].tween.remove(e)
        }
        : function(i) {
            i[r][n].tween.set(e, t)
        }
        )
    }
    ,
    Nf.attr = function(t, n) {
        function s() {
            this.removeAttribute(i)
        }
        function o() {
            this.removeAttributeNS(i.space, i.local)
        }
        function u(e) {
            return e == null ? s : (e += "",
            function() {
                var t = this.getAttribute(i), n;
                return t !== e && (n = r(t, e),
                function(e) {
                    this.setAttribute(i, n(e))
                }
                )
            }
            )
        }
        function a(e) {
            return e == null ? o : (e += "",
            function() {
                var t = this.getAttributeNS(i.space, i.local), n;
                return t !== e && (n = r(t, e),
                function(e) {
                    this.setAttributeNS(i.space, i.local, n(e))
                }
                )
            }
            )
        }
        if (arguments.length < 2) {
            for (n in t)
                this.attr(n, t[n]);
            return this
        }
        var r = t == "transform" ? Yo : No
          , i = e.ns.qualify(t);
        return Af(this, "attr." + t, n, i.local ? a : u)
    }
    ,
    Nf.attrTween = function(t, n) {
        function i(e, t) {
            var i = n.call(this, e, t, this.getAttribute(r));
            return i && function(e) {
                this.setAttribute(r, i(e))
            }
        }
        function s(e, t) {
            var i = n.call(this, e, t, this.getAttributeNS(r.space, r.local));
            return i && function(e) {
                this.setAttributeNS(r.space, r.local, i(e))
            }
        }
        var r = e.ns.qualify(t);
        return this.tween("attr." + t, r.local ? s : i)
    }
    ,
    Nf.style = function(e, t, n) {
        function i() {
            this.style.removeProperty(e)
        }
        function o(t) {
            return t == null ? i : (t += "",
            function() {
                var r = s(this).getComputedStyle(this, null).getPropertyValue(e), i;
                return r !== t && (i = No(r, t),
                function(t) {
                    this.style.setProperty(e, i(t), n)
                }
                )
            }
            )
        }
        var r = arguments.length;
        if (r < 3) {
            if (typeof e != "string") {
                r < 2 && (t = "");
                for (n in e)
                    this.style(n, e[n], t);
                return this
            }
            n = ""
        }
        return Af(this, "style." + e, t, o)
    }
    ,
    Nf.styleTween = function(e, t, n) {
        function r(r, i) {
            var o = t.call(this, r, i, s(this).getComputedStyle(this, null).getPropertyValue(e));
            return o && function(t) {
                this.style.setProperty(e, o(t), n)
            }
        }
        return arguments.length < 3 && (n = ""),
        this.tween("style." + e, r)
    }
    ,
    Nf.text = function(e) {
        return Af(this, "text", e, Of)
    }
    ,
    Nf.remove = function() {
        var e = this.namespace;
        return this.each("end.transition", function() {
            var t;
            this[e].count < 2 && (t = this.parentNode) && t.removeChild(this)
        })
    }
    ,
    Nf.ease = function(t) {
        var n = this.id
          , r = this.namespace;
        return arguments.length < 1 ? this.node()[r][n].ease : (typeof t != "function" && (t = e.ease.apply(e, arguments)),
        ht(this, function(e) {
            e[r][n].ease = t
        }))
    }
    ,
    Nf.delay = function(e) {
        var t = this.id
          , n = this.namespace;
        return arguments.length < 1 ? this.node()[n][t].delay : ht(this, typeof e == "function" ? function(r, i, s) {
            r[n][t].delay = +e.call(r, r.__data__, i, s)
        }
        : (e = +e,
        function(r) {
            r[n][t].delay = e
        }
        ))
    }
    ,
    Nf.duration = function(e) {
        var t = this.id
          , n = this.namespace;
        return arguments.length < 1 ? this.node()[n][t].duration : ht(this, typeof e == "function" ? function(r, i, s) {
            r[n][t].duration = Math.max(1, e.call(r, r.__data__, i, s))
        }
        : (e = Math.max(1, e),
        function(r) {
            r[n][t].duration = e
        }
        ))
    }
    ,
    Nf.each = function(t, n) {
        var r = this.id
          , i = this.namespace;
        if (arguments.length < 2) {
            var s = Lf
              , o = kf;
            try {
                kf = r,
                ht(this, function(e, n, s) {
                    Lf = e[i][r],
                    t.call(e, e.__data__, n, s)
                })
            } finally {
                Lf = s,
                kf = o
            }
        } else
            ht(this, function(s) {
                var o = s[i][r];
                (o.event || (o.event = e.dispatch("start", "end", "interrupt"))).on(t, n)
            });
        return this
    }
    ,
    Nf.transition = function() {
        var e = this.id, t = ++Cf, n = this.namespace, r = [], i, s, o, u;
        for (var a = 0, f = this.length; a < f; a++) {
            r.push(i = []);
            for (var s = this[a], l = 0, c = s.length; l < c; l++) {
                if (o = s[l])
                    u = o[n][e],
                    _f(o, l, n, t, {
                        time: u.time,
                        ease: u.ease,
                        delay: u.delay + u.duration,
                        duration: u.duration
                    });
                i.push(o)
            }
        }
        return Tf(r, n, t)
    }
    ,
    e.svg.axis = function() {
        function f(f) {
            f.each(function() {
                var f = e.select(this), l = this.__chart__ || t, c = this.__chart__ = t.copy(), h = u == null ? c.ticks ? c.ticks.apply(c, o) : c.domain() : u, p = a == null ? c.tickFormat ? c.tickFormat.apply(c, o) : D : a, d = f.selectAll(".tick").data(h, c), v = d.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Ct), m = e.transition(d.exit()).style("opacity", Ct).remove(), g = e.transition(d.order()).style("opacity", 1), y = Math.max(r, 0) + s, b, w = ta(c), E = f.selectAll(".domain").data([0]), S = (E.enter().append("path").attr("class", "domain"),
                e.transition(E));
                v.append("line"),
                v.append("text");
                var x = v.select("line"), T = g.select("line"), N = d.select("text").text(p), C = v.select("text"), k = g.select("text"), L = n === "top" || n === "left" ? -1 : 1, A, O, M, _;
                n === "bottom" || n === "top" ? (b = Hf,
                A = "x",
                M = "y",
                O = "x2",
                _ = "y2",
                N.attr("dy", L < 0 ? "0em" : ".71em").style("text-anchor", "middle"),
                S.attr("d", "M" + w[0] + "," + L * i + "V0H" + w[1] + "V" + L * i)) : (b = Bf,
                A = "y",
                M = "x",
                O = "y2",
                _ = "x2",
                N.attr("dy", ".32em").style("text-anchor", L < 0 ? "end" : "start"),
                S.attr("d", "M" + L * i + "," + w[0] + "H0V" + w[1] + "H" + L * i)),
                x.attr(_, L * r),
                C.attr(M, L * y),
                T.attr(O, 0).attr(_, L * r),
                k.attr(A, 0).attr(M, L * y);
                if (c.rangeBand) {
                    var P = c
                      , H = P.rangeBand() / 2;
                    l = c = function(e) {
                        return P(e) + H
                    }
                } else
                    l.rangeBand ? l = c : m.call(b, c, l);
                v.call(b, l, c),
                g.call(b, c, c)
            })
        }
        var t = e.scale.linear(), n = Df, r = 6, i = 6, s = 3, o = [10], u = null, a;
        return f.scale = function(e) {
            return arguments.length ? (t = e,
            f) : t
        }
        ,
        f.orient = function(e) {
            return arguments.length ? (n = e in Pf ? e + "" : Df,
            f) : n
        }
        ,
        f.ticks = function() {
            return arguments.length ? (o = arguments,
            f) : o
        }
        ,
        f.tickValues = function(e) {
            return arguments.length ? (u = e,
            f) : u
        }
        ,
        f.tickFormat = function(e) {
            return arguments.length ? (a = e,
            f) : a
        }
        ,
        f.tickSize = function(e) {
            var t = arguments.length;
            return t ? (r = +e,
            i = +arguments[t - 1],
            f) : r
        }
        ,
        f.innerTickSize = function(e) {
            return arguments.length ? (r = +e,
            f) : r
        }
        ,
        f.outerTickSize = function(e) {
            return arguments.length ? (i = +e,
            f) : i
        }
        ,
        f.tickPadding = function(e) {
            return arguments.length ? (s = +e,
            f) : s
        }
        ,
        f.tickSubdivide = function() {
            return arguments.length && f
        }
        ,
        f
    }
    ;
    var Df = "bottom"
      , Pf = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    };
    e.svg.brush = function() {
        function h(t) {
            t.each(function() {
                var t = e.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", m).on("touchstart.brush", m)
                  , i = t.selectAll(".background").data([0]);
                i.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"),
                t.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var s = t.selectAll(".resize").data(c, D);
                s.exit().remove(),
                s.enter().append("g").attr("class", function(e) {
                    return "resize " + e
                }).style("cursor", function(e) {
                    return jf[e]
                }).append("rect").attr("x", function(e) {
                    return /[ew]$/.test(e) ? -3 : null
                }).attr("y", function(e) {
                    return /^[ns]/.test(e) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"),
                s.style("display", h.empty() ? "none" : null);
                var o = e.transition(t), u = e.transition(i), a;
                n && (a = ta(n),
                u.attr("x", a[0]).attr("width", a[1] - a[0]),
                d(o)),
                r && (a = ta(r),
                u.attr("y", a[0]).attr("height", a[1] - a[0]),
                v(o)),
                p(o)
            })
        }
        function p(e) {
            e.selectAll(".resize").attr("transform", function(e) {
                return "translate(" + i[+/e$/.test(e)] + "," + o[+/^s/.test(e)] + ")"
            })
        }
        function d(e) {
            e.select(".extent").attr("x", i[0]),
            e.selectAll(".extent,.n>rect,.s>rect").attr("width", i[1] - i[0])
        }
        function v(e) {
            e.select(".extent").attr("y", o[0]),
            e.selectAll(".extent,.e>rect,.w>rect").attr("height", o[1] - o[0])
        }
        function m() {
            function O() {
                e.event.keyCode == 32 && (S || (T = null,
                N[0] -= i[1],
                N[1] -= o[1],
                S = 2),
                q())
            }
            function M() {
                e.event.keyCode == 32 && S == 2 && (N[0] += i[1],
                N[1] += o[1],
                S = 0,
                q())
            }
            function _() {
                var t = e.mouse(c)
                  , s = !1;
                C && (t[0] += C[0],
                t[1] += C[1]),
                S || (e.event.altKey ? (T || (T = [(i[0] + i[1]) / 2, (o[0] + o[1]) / 2]),
                N[0] = i[+(t[0] < T[0])],
                N[1] = o[+(t[1] < T[1])]) : T = null),
                w && D(t, n, 0) && (d(y),
                s = !0),
                E && D(t, r, 1) && (v(y),
                s = !0),
                s && (p(y),
                g({
                    type: "brush",
                    mode: S ? "move" : "resize"
                }))
            }
            function D(e, t, n) {
                var r = ta(t), s = r[0], c = r[1], h = N[n], p = n ? o : i, d = p[1] - p[0], v, m;
                S && (s -= h,
                c -= d + h),
                v = (n ? l : f) ? Math.max(s, Math.min(c, e[n])) : e[n],
                S ? m = (v += h) + d : (T && (h = Math.max(s, Math.min(c, 2 * T[n] - v))),
                h < v ? (m = v,
                v = h) : m = h);
                if (p[0] != v || p[1] != m)
                    return n ? a = null : u = null,
                    p[0] = v,
                    p[1] = m,
                    !0
            }
            function P() {
                _(),
                y.style("pointer-events", "all").selectAll(".resize").style("display", h.empty() ? "none" : null),
                e.select("body").style("cursor", null),
                k.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null),
                x(),
                g({
                    type: "brushend"
                })
            }
            var c = this, m = e.select(e.event.target), g = t.of(c, arguments), y = e.select(c), b = m.datum(), w = !/^(n|s)$/.test(b) && n, E = !/^(e|w)$/.test(b) && r, S = m.classed("extent"), x = St(c), T, N = e.mouse(c), C, k = e.select(s(c)).on("keydown.brush", O).on("keyup.brush", M);
            e.event.changedTouches ? k.on("touchmove.brush", _).on("touchend.brush", P) : k.on("mousemove.brush", _).on("mouseup.brush", P),
            y.interrupt().selectAll("*").interrupt();
            if (S)
                N[0] = i[0] - N[0],
                N[1] = o[0] - N[1];
            else if (b) {
                var L = +/w$/.test(b)
                  , A = +/^n/.test(b);
                C = [i[1 - L] - N[0], o[1 - A] - N[1]],
                N[0] = i[L],
                N[1] = o[A]
            } else
                e.event.altKey && (T = N.slice());
            y.style("pointer-events", "none").selectAll(".resize").style("display", null),
            e.select("body").style("cursor", m.style("cursor")),
            g({
                type: "brushstart"
            }),
            _()
        }
        var t = U(h, "brushstart", "brush", "brushend"), n = null, r = null, i = [0, 0], o = [0, 0], u, a, f = !0, l = !0, c = Ff[0];
        return h.event = function(n) {
            n.each(function() {
                var n = t.of(this, arguments)
                  , r = {
                    x: i,
                    y: o,
                    i: u,
                    j: a
                }
                  , s = this.__chart__ || r;
                this.__chart__ = r,
                kf ? e.select(this).transition().each("start.brush", function() {
                    u = s.i,
                    a = s.j,
                    i = s.x,
                    o = s.y,
                    n({
                        type: "brushstart"
                    })
                }).tween("brush:brush", function() {
                    var e = Co(i, r.x)
                      , t = Co(o, r.y);
                    return u = a = null,
                    function(s) {
                        i = r.x = e(s),
                        o = r.y = t(s),
                        n({
                            type: "brush",
                            mode: "resize"
                        })
                    }
                }).each("end.brush", function() {
                    u = r.i,
                    a = r.j,
                    n({
                        type: "brush",
                        mode: "resize"
                    }),
                    n({
                        type: "brushend"
                    })
                }) : (n({
                    type: "brushstart"
                }),
                n({
                    type: "brush",
                    mode: "resize"
                }),
                n({
                    type: "brushend"
                }))
            })
        }
        ,
        h.x = function(e) {
            return arguments.length ? (n = e,
            c = Ff[!n << 1 | !r],
            h) : n
        }
        ,
        h.y = function(e) {
            return arguments.length ? (r = e,
            c = Ff[!n << 1 | !r],
            h) : r
        }
        ,
        h.clamp = function(e) {
            return arguments.length ? (n && r ? (f = !!e[0],
            l = !!e[1]) : n ? f = !!e : r && (l = !!e),
            h) : n && r ? [f, l] : n ? f : r ? l : null
        }
        ,
        h.extent = function(e) {
            var t, s, f, l, c;
            if (!arguments.length)
                return n && (u ? (t = u[0],
                s = u[1]) : (t = i[0],
                s = i[1],
                n.invert && (t = n.invert(t),
                s = n.invert(s)),
                s < t && (c = t,
                t = s,
                s = c))),
                r && (a ? (f = a[0],
                l = a[1]) : (f = o[0],
                l = o[1],
                r.invert && (f = r.invert(f),
                l = r.invert(l)),
                l < f && (c = f,
                f = l,
                l = c))),
                n && r ? [[t, f], [s, l]] : n ? [t, s] : r && [f, l];
            if (n) {
                t = e[0],
                s = e[1],
                r && (t = t[0],
                s = s[0]),
                u = [t, s],
                n.invert && (t = n(t),
                s = n(s)),
                s < t && (c = t,
                t = s,
                s = c);
                if (t != i[0] || s != i[1])
                    i = [t, s]
            }
            if (r) {
                f = e[0],
                l = e[1],
                n && (f = f[1],
                l = l[1]),
                a = [f, l],
                r.invert && (f = r(f),
                l = r(l)),
                l < f && (c = f,
                f = l,
                l = c);
                if (f != o[0] || l != o[1])
                    o = [f, l]
            }
            return h
        }
        ,
        h.clear = function() {
            return h.empty() || (i = [0, 0],
            o = [0, 0],
            u = a = null),
            h
        }
        ,
        h.empty = function() {
            return !!n && i[0] == i[1] || !!r && o[0] == o[1]
        }
        ,
        e.rebind(h, t, "on")
    }
    ;
    var jf = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }
      , Ff = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []]
      , If = Xn.format = Er.timeFormat
      , qf = If.utc
      , Rf = qf("%Y-%m-%dT%H:%M:%S.%LZ");
    If.iso = Date.prototype.toISOString && +(new Date("2000-01-01T00:00:00.000Z")) ? Uf : Rf,
    Uf.parse = function(e) {
        var t = new Date(e);
        return isNaN(t) ? null : t
    }
    ,
    Uf.toString = Rf.toString,
    Xn.second = Kn(function(e) {
        return new Vn(Math.floor(e / 1e3) * 1e3)
    }, function(e, t) {
        e.setTime(e.getTime() + Math.floor(t) * 1e3)
    }, function(e) {
        return e.getSeconds()
    }),
    Xn.seconds = Xn.second.range,
    Xn.seconds.utc = Xn.second.utc.range,
    Xn.minute = Kn(function(e) {
        return new Vn(Math.floor(e / 6e4) * 6e4)
    }, function(e, t) {
        e.setTime(e.getTime() + Math.floor(t) * 6e4)
    }, function(e) {
        return e.getMinutes()
    }),
    Xn.minutes = Xn.minute.range,
    Xn.minutes.utc = Xn.minute.utc.range,
    Xn.hour = Kn(function(e) {
        var t = e.getTimezoneOffset() / 60;
        return new Vn((Math.floor(e / 36e5 - t) + t) * 36e5)
    }, function(e, t) {
        e.setTime(e.getTime() + Math.floor(t) * 36e5)
    }, function(e) {
        return e.getHours()
    }),
    Xn.hours = Xn.hour.range,
    Xn.hours.utc = Xn.hour.utc.range,
    Xn.month = Kn(function(e) {
        return e = Xn.day(e),
        e.setDate(1),
        e
    }, function(e, t) {
        e.setMonth(e.getMonth() + t)
    }, function(e) {
        return e.getMonth()
    }),
    Xn.months = Xn.month.range,
    Xn.months.utc = Xn.month.utc.range;
    var Xf = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6]
      , Vf = [[Xn.second, 1], [Xn.second, 5], [Xn.second, 15], [Xn.second, 30], [Xn.minute, 1], [Xn.minute, 5], [Xn.minute, 15], [Xn.minute, 30], [Xn.hour, 1], [Xn.hour, 3], [Xn.hour, 6], [Xn.hour, 12], [Xn.day, 1], [Xn.day, 2], [Xn.week, 1], [Xn.month, 1], [Xn.month, 3], [Xn.year, 1]]
      , $f = If.multi([[".%L", function(e) {
        return e.getMilliseconds()
    }
    ], [":%S", function(e) {
        return e.getSeconds()
    }
    ], ["%I:%M", function(e) {
        return e.getMinutes()
    }
    ], ["%I %p", function(e) {
        return e.getHours()
    }
    ], ["%a %d", function(e) {
        return e.getDay() && e.getDate() != 1
    }
    ], ["%b %d", function(e) {
        return e.getDate() != 1
    }
    ], ["%B", function(e) {
        return e.getMonth()
    }
    ], ["%Y", oi]])
      , Jf = {
        range: function(t, n, r) {
            return e.range(Math.ceil(t / r) * r, +n, r).map(Wf)
        },
        floor: D,
        ceil: D
    };
    Vf.year = Xn.year,
    Xn.scale = function() {
        return zf(e.scale.linear(), Vf, $f)
    }
    ;
    var Kf = Vf.map(function(e) {
        return [e[0].utc, e[1]]
    })
      , Qf = qf.multi([[".%L", function(e) {
        return e.getUTCMilliseconds()
    }
    ], [":%S", function(e) {
        return e.getUTCSeconds()
    }
    ], ["%I:%M", function(e) {
        return e.getUTCMinutes()
    }
    ], ["%I %p", function(e) {
        return e.getUTCHours()
    }
    ], ["%a %d", function(e) {
        return e.getUTCDay() && e.getUTCDate() != 1
    }
    ], ["%b %d", function(e) {
        return e.getUTCDate() != 1
    }
    ], ["%B", function(e) {
        return e.getUTCMonth()
    }
    ], ["%Y", oi]]);
    Kf.year = Xn.year.utc,
    Xn.scale.utc = function() {
        return zf(e.scale.linear(), Kf, Qf)
    }
    ,
    e.text = Nn(function(e) {
        return e.responseText
    }),
    e.json = function(e, t) {
        return Cn(e, "application/json", Gf, t)
    }
    ,
    e.html = function(e, t) {
        return Cn(e, "text/html", Yf, t)
    }
    ,
    e.xml = Nn(function(e) {
        return e.responseXML
    }),
    typeof define == "function" && define.amd ? define(e) : typeof module == "object" && module.exports && (module.exports = e),
    this.d3 = e
}();
