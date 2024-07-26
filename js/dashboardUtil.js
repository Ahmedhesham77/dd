define(["jquery"], function() {
    "use strict";
    var e = function(e, t) {
        if (!e)
            return "";
        var n = (new RegExp("[\\?&]" + e + "=([^&#]*)")).exec(document.location.href);
        return n ? decodeURIComponent(n[1]) : t || ""
    };
    return {
        bind: function(e, t, n) {
            var r = Array.prototype.slice.call(arguments, 2, arguments.length);
            return function() {
                var n = Array.prototype.slice.call(arguments, 0, arguments.length);
                return e.apply(t, r.concat(n))
            }
        },
        getParameterByName: e,
        getLang: function() {
            var t = e("lang", "en");
            return availableLanguages && $.inArray(t, availableLanguages) === -1 && (t = "en"),
            t
        },
        tr: function(e, t) {
            var n = e || null;
            n === null ? n = e : _.isString(n) || (n = n.toString());
            if (t)
                n = n.replace(/(\%\%(\w+)\%\%)/g, function(e, n, r) {
                    return t.hasOwnProperty(r) ? t[r] : e
                });
            else if (TRANSLATIONS && TRANSLATIONS.hasOwnProperty(e) && TRANSLATIONS[e])
                return TRANSLATIONS[e];
            return n
        },
        getServer: function() {
            return e("server") || "/dashboard/"
        },
        getBaseUrl: function() {
            var e = wialon.core.Session.getInstance()
              , t = this.getParameterByName("b", "master")
              , n = this.getParameterByName("baseUrl")
              , r = "";
            return n ? r = n : e.getBaseUrl && e.getBaseUrl() ? r = e.getBaseUrl() : r = this.getParameterByName("baseUrl", t == "develop" ? "https://dev-api.wialon.com" : "https://hst-api.wialon.com") || this.getParameterByName("hostUrl", "http://hosting.wialon.com"),
            r
        },
        getLocalTimezone: function() {
            var e = new Date
              , t = new Date(e.getFullYear(),0,1,0,0,0,0)
              , n = new Date(e.getFullYear(),6,1,0,0,0,0)
              , r = t.toGMTString()
              , i = new Date(r.substring(0, r.lastIndexOf(" ") - 1));
            r = n.toGMTString();
            var s = new Date(r.substring(0, r.lastIndexOf(" ") - 1)), o = (t - i) / 36e5, u = (n - s) / 36e5, a;
            if (o == u)
                a = "0";
            else {
                var f = o - u;
                f >= 0 && (o = u),
                a = "1"
            }
            return parseInt(o * 3600, 10)
        },
        convertFormat: function(e, t) {
            var n = 0
              , r = {
                MM: "%B",
                M: "%b",
                mm: "%m",
                m: "%l",
                DD: "%A",
                D: "%a",
                dd: "%E",
                d: "%e",
                yy: "%Y",
                y: "%y"
            };
            if (!t)
                for (n in r)
                    e = e.replace(new RegExp(n,"g"), r[n]);
            else
                for (n in r)
                    e = e.replace(new RegExp(r[n],"g"), n);
            return e
        },
        capitalize: function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        },
        compareText: function(e, t) {
            var n = function(e) {
                return e.match(/\d+|\D+/g)
            }
              , r = n(("" + e).toLowerCase())
              , i = n(("" + t).toLowerCase());
            if (!r || !i || !r.length || !i.length)
                return !r || !r.length ? -1 : !i || !i.length ? 1 : 0;
            for (var s = 0; r[s] && i[s]; s++)
                if (r[s] !== i[s]) {
                    var o = Number(r[s])
                      , u = Number(i[s]);
                    return o == r[s] && u == i[s] ? o - u : r[s] > i[s] ? 1 : -1
                }
            return r.length - i.length
        },
        isTouch: function() {
            var e = "modernizr", t = " -webkit- -moz- -o- -ms- ".split(" "), n = function(t, n, r, i) {
                var s, o, u, a, f = document.createElement("div"), l = document.body, c = l || document.createElement("body");
                if (parseInt(r, 10))
                    while (r--)
                        u = document.createElement("div"),
                        u.id = i ? i[r] : e + (r + 1),
                        f.appendChild(u);
                return s = ["&#173;", '<style id="s', e, '">', t, "</style>"].join(""),
                f.id = e,
                (l ? f : c).innerHTML += s,
                c.appendChild(f),
                l || (c.style.background = "",
                c.style.overflow = "hidden",
                a = docElement.style.overflow,
                docElement.style.overflow = "hidden",
                docElement.appendChild(c)),
                o = n(f, t),
                l ? f.parentNode.removeChild(f) : (c.parentNode.removeChild(c),
                docElement.style.overflow = a),
                !!o
            }, r;
            return "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch ? r = !0 : n(["@media (", t.join("touch-enabled),("), e, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
                r = e.offsetTop === 9
            }),
            r
        }
    }
});
