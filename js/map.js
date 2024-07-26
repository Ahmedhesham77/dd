define("map", ["jquery", "leaflet", "webgis"], function(e, t) {
    "use strict";
    function f() {
        var r = wialon.core.Session.getInstance().getBaseGisUrl()
          , i = wialon.core.Session.getInstance().getCurrUser().getId()
          , s = wialon.core.Session.getInstance()
          , f = t.tileLayer.webGis(r, {
            attribution: APP_CONFIG.alias_webgis || "Gurtam Maps",
            minZoom: o.minZoom,
            userId: i,
            sessionId: s.getId()
        });
        n = t.map(o.mapBoxId, {
            minZoom: o.minZoom,
            zoom: o.zoom,
            center: t.latLng(o.position),
            layers: [f]
        }),
        a.on("click.map", function(e) {
            e.originalEvent.preventDefault(),
            e.originalEvent.stopPropagation()
        }),
        e(document).on("mousemove.map", function(e) {
            u.x = e.clientX,
            u.y = e.clientY
        }),
        e(window).on("resize.map", p)
    }
    function l() {
        var t = {
            top: 0,
            left: 0,
            visibility: "visible"
        }
          , n = 20
          , r = {
            w: a.outerWidth(),
            h: a.outerHeight()
        }
          , i = {
            w: e(window).width(),
            h: e(window).height()
        };
        u.y < i.h / 2 ? t.top = u.y + e(document).scrollTop() + n : t.top = u.y + e(document).scrollTop() - n - r.h;
        var s;
        u.x < i.w / 2 ? (t.left = u.x + e(document).scrollLeft(),
        s = "right") : (s = "left",
        t.left = u.x + e(document).scrollLeft() - r.w);
        if (u.x < r.w)
            switch (s) {
            case "left":
                t.left += r.w - u.x;
                break;
            case "right":
                t.left -= r.w - (i.w - u.x) > 0 ? r.w - (i.w - u.x) : 0
            }
        a.css(t)
    }
    function c() {
        a.css({
            visibility: "hidden"
        })
    }
    function h(e, r) {
        var u = e || o.position
          , a = r || o.zoom
          , f = t.latLng(u);
        return n.setView(f, a),
        s = !0,
        l(),
        i
    }
    function p() {
        return n.setView(o.position, o.zoom),
        s = !1,
        c(),
        i
    }
    function d() {
        return s
    }
    function v(e, s) {
        var o = t.icon({
            iconUrl: e,
            iconAnchor: [16, 16]
        })
          , u = t.latLng(s);
        return r ? (r.setLatLng(u),
        r.setIcon(o)) : r = t.marker(u, {
            icon: o
        }).addTo(n),
        i
    }
    function m() {
        return f(),
        i
    }
    var n, r, i, s = !1, o = {
        mapBoxId: "map-box",
        zoom: 15,
        minZoom: 5,
        position: {
            lat: 27.55,
            lon: 53.9
        }
    }, u = {
        x: 0,
        y: 0
    }, a = e("#" + o.mapBoxId);
    return i = {
        init: m,
        open: h,
        close: p,
        isOpened: d,
        addIcon: v
    },
    i
});
