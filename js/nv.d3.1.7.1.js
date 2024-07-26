(function() {
    var e = window.nv || {};
    window.nv = e,
    e.dev = !1,
    e.tooltip = e.tooltip || {},
    e.utils = e.utils || {},
    e.models = e.models || {},
    e.charts = {},
    e.graphs = [],
    e.logs = {},
    e.dispatch = d3.dispatch("render_start", "render_end"),
    Function.prototype.bind || (Function.prototype.bind = function(e) {
        if (typeof this != "function")
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var t = Array.prototype.slice.call(arguments, 1)
          , n = this
          , r = function() {}
          , i = function() {
            return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
        };
        return r.prototype = this.prototype,
        i.prototype = new r,
        i
    }
    ),
    e.dev && (e.dispatch.on("render_start", function(t) {
        e.logs.startTime = +(new Date)
    }),
    e.dispatch.on("render_end", function(t) {
        e.logs.endTime = +(new Date),
        e.logs.totalTime = e.logs.endTime - e.logs.startTime,
        e.log("total", e.logs.totalTime)
    })),
    e.log = function() {
        if (e.dev && window.console && console.log && console.log.apply)
            console.log.apply(console, arguments);
        else if (e.dev && window.console && typeof console.log == "function" && Function.prototype.bind) {
            var t = Function.prototype.bind.call(console.log, console);
            t.apply(console, arguments)
        }
        return arguments[arguments.length - 1]
    }
    ,
    e.deprecated = function(t) {
        e.dev && console && console.warn && console.warn("`" + t + "` has been deprecated.")
    }
    ,
    e.render = function(n) {
        n = n || 1,
        e.render.active = !0,
        e.dispatch.render_start(),
        setTimeout(function() {
            var t, r;
            for (var i = 0; i < n && (r = e.render.queue[i]); i++)
                t = r.generate(),
                typeof r.callback == typeof Function && r.callback(t),
                e.graphs.push(t);
            e.render.queue.splice(0, i),
            e.render.queue.length ? setTimeout(arguments.callee, 0) : (e.dispatch.render_end(),
            e.render.active = !1)
        }, 0)
    }
    ,
    e.render.active = !1,
    e.render.queue = [],
    e.addGraph = function(t) {
        typeof arguments[0] == typeof Function && (t = {
            generate: arguments[0],
            callback: arguments[1]
        }),
        e.render.queue.push(t),
        e.render.active || e.render()
    }
    ,
    e.interactiveGuideline = function() {
        "use strict";
        function c(o) {
            o.each(function(o) {
                function g() {
                    var e = d3.mouse(this)
                      , n = e[0]
                      , r = e[1]
                      , o = !0
                      , a = !1;
                    l && (n = d3.event.offsetX,
                    r = d3.event.offsetY,
                    d3.event.target.tagName !== "svg" && (o = !1),
                    d3.event.target.className.baseVal.match("nv-legend") && (a = !0)),
                    o && (n -= i.left,
                    r -= i.top);
                    if (n < 0 || r < 0 || n > p || r > d || d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined || a) {
                        if (l && d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined && d3.event.relatedTarget.className.match(t.nvPointerEventsClass))
                            return;
                        u.elementMouseout({
                            mouseX: n,
                            mouseY: r
                        }),
                        c.renderGuideLine(null);
                        return
                    }
                    var f = s.invert(n);
                    u.elementMousemove({
                        mouseX: n,
                        mouseY: r,
                        pointXValue: f
                    }),
                    d3.event.type === "dblclick" && u.elementDblclick({
                        mouseX: n,
                        mouseY: r,
                        pointXValue: f
                    }),
                    d3.event.type === "click" && u.elementClick({
                        mouseX: n,
                        mouseY: r,
                        pointXValue: f
                    })
                }
                var h = d3.select(this)
                  , p = n || 960
                  , d = r || 400
                  , v = h.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([o])
                  , m = v.enter().append("g").attr("class", " nv-wrap nv-interactiveLineLayer");
                m.append("g").attr("class", "nv-interactiveGuideLine");
                if (!f)
                    return;
                f.on("mousemove", g, !0).on("mouseout", g, !0).on("dblclick", g).on("click", g),
                c.renderGuideLine = function(t) {
                    if (!a)
                        return;
                    var n = v.select(".nv-interactiveGuideLine").selectAll("line").data(t != null ? [e.utils.NaNtoZero(t)] : [], String);
                    n.enter().append("line").attr("class", "nv-guideline").attr("x1", function(e) {
                        return e
                    }).attr("x2", function(e) {
                        return e
                    }).attr("y1", d).attr("y2", 0),
                    n.exit().remove()
                }
            })
        }
        var t = e.models.tooltip()
          , n = null
          , r = null
          , i = {
            left: 0,
            top: 0
        }
          , s = d3.scale.linear()
          , o = d3.scale.linear()
          , u = d3.dispatch("elementMousemove", "elementMouseout", "elementClick", "elementDblclick")
          , a = !0
          , f = null
          , l = "ActiveXObject"in window;
        return c.dispatch = u,
        c.tooltip = t,
        c.margin = function(e) {
            return arguments.length ? (i.top = typeof e.top != "undefined" ? e.top : i.top,
            i.left = typeof e.left != "undefined" ? e.left : i.left,
            c) : i
        }
        ,
        c.width = function(e) {
            return arguments.length ? (n = e,
            c) : n
        }
        ,
        c.height = function(e) {
            return arguments.length ? (r = e,
            c) : r
        }
        ,
        c.xScale = function(e) {
            return arguments.length ? (s = e,
            c) : s
        }
        ,
        c.showGuideLine = function(e) {
            return arguments.length ? (a = e,
            c) : a
        }
        ,
        c.svgContainer = function(e) {
            return arguments.length ? (f = e,
            c) : f
        }
        ,
        c
    }
    ,
    e.interactiveBisect = function(e, t, n) {
        "use strict";
        if (e instanceof Array) {
            typeof n != "function" && (n = function(e, t) {
                return e.x
            }
            );
            var r = d3.bisector(n).left
              , i = d3.max([0, r(e, t) - 1])
              , s = n(e[i], i);
            typeof s == "undefined" && (s = i);
            if (s === t)
                return i;
            var o = d3.min([i + 1, e.length - 1])
              , u = n(e[o], o);
            return typeof u == "undefined" && (u = o),
            Math.abs(u - t) >= Math.abs(s - t) ? i : o
        }
        return null
    }
    ,
    e.nearestValueIndex = function(e, t, n) {
        "use strict";
        var r = Infinity
          , i = null;
        return e.forEach(function(e, s) {
            var o = Math.abs(t - e);
            o <= r && o < n && (r = o,
            i = s)
        }),
        i
    }
    ,
    function() {
        "use strict";
        window.nv.tooltip = {},
        window.nv.models.tooltip = function() {
            function y() {
                if (a) {
                    var e = d3.select(a);
                    e.node().tagName !== "svg" && (e = e.select("svg"));
                    var t = e.node() ? e.attr("viewBox") : null;
                    if (t) {
                        t = t.split(" ");
                        var n = parseInt(e.style("width")) / t[2];
                        l.left = l.left * n,
                        l.top = l.top * n
                    }
                }
            }
            function b(e) {
                var t;
                a ? t = d3.select(a) : t = d3.select("body");
                var n = t.select(".nvtooltip");
                return n.node() === null && (n = t.append("div").attr("class", "nvtooltip " + (u ? u : "xy-tooltip")).attr("id", h)),
                n.node().innerHTML = e,
                n.style("top", 0).style("left", 0).style("opacity", 0),
                n.selectAll("div, table, td, tr").classed(p, !0),
                n.classed(p, !0),
                n.node()
            }
            function w() {
                if (!c)
                    return;
                if (!g(n))
                    return;
                y();
                var t = l.left
                  , u = o != null ? o : l.top
                  , h = b(m(n));
                f = h;
                if (a) {
                    var p = a.getElementsByTagName("svg")[0]
                      , d = p ? p.getBoundingClientRect() : a.getBoundingClientRect()
                      , v = {
                        left: 0,
                        top: 0
                    };
                    if (p) {
                        var E = p.getBoundingClientRect()
                          , S = a.getBoundingClientRect()
                          , x = E.top;
                        if (x < 0) {
                            var T = a.getBoundingClientRect();
                            x = Math.abs(x) > T.height ? 0 : x
                        }
                        v.top = Math.abs(x - S.top),
                        v.left = Math.abs(E.left - S.left)
                    }
                    t += a.offsetLeft + v.left - 2 * a.scrollLeft,
                    u += a.offsetTop + v.top - 2 * a.scrollTop
                }
                return s && s > 0 && (u = Math.floor(u / s) * s),
                e.tooltip.calcTooltipPosition([t, u], r, i, h),
                w
            }
            var t = null
              , n = null
              , r = "w"
              , i = 50
              , s = 25
              , o = null
              , u = null
              , a = null
              , f = null
              , l = {
                left: null,
                top: null
            }
              , c = !0
              , h = "nvtooltip-" + Math.floor(Math.random() * 1e5)
              , p = "nv-pointer-events-none"
              , d = function(e, t) {
                return e
            }
              , v = function(e) {
                return e
            }
              , m = function(e) {
                if (t != null)
                    return t;
                if (e == null)
                    return "";
                var n = d3.select(document.createElement("table"))
                  , r = n.selectAll("thead").data([e]).enter().append("thead");
                r.append("tr").append("td").attr("colspan", 3).append("strong").classed("x-value", !0).html(v(e.value));
                var i = n.selectAll("tbody").data([e]).enter().append("tbody")
                  , s = i.selectAll("tr").data(function(e) {
                    return e.series
                }).enter().append("tr").classed("highlight", function(e) {
                    return e.highlight
                });
                s.append("td").classed("legend-color-guide", !0).append("div").style("background-color", function(e) {
                    return e.color
                }),
                s.append("td").classed("key", !0).html(function(e) {
                    return e.key
                }),
                s.append("td").classed("value", !0).html(function(e, t) {
                    return d(e.value, t)
                }),
                s.selectAll("td").each(function(e) {
                    if (e.highlight) {
                        var t = d3.scale.linear().domain([0, 1]).range(["#fff", e.color])
                          , n = .6;
                        d3.select(this).style("border-bottom-color", t(n)).style("border-top-color", t(n))
                    }
                });
                var o = n.node().outerHTML;
                return e.footer !== undefined && (o += "<div class='footer'>" + e.footer + "</div>"),
                o
            }
              , g = function(e) {
                return e && e.series && e.series.length > 0 ? !0 : !1
            };
            return w.nvPointerEventsClass = p,
            w.content = function(e) {
                return arguments.length ? (t = e,
                w) : t
            }
            ,
            w.tooltipElem = function() {
                return f
            }
            ,
            w.contentGenerator = function(e) {
                return arguments.length ? (typeof e == "function" && (m = e),
                w) : m
            }
            ,
            w.data = function(e) {
                return arguments.length ? (n = e,
                w) : n
            }
            ,
            w.gravity = function(e) {
                return arguments.length ? (r = e,
                w) : r
            }
            ,
            w.distance = function(e) {
                return arguments.length ? (i = e,
                w) : i
            }
            ,
            w.snapDistance = function(e) {
                return arguments.length ? (s = e,
                w) : s
            }
            ,
            w.classes = function(e) {
                return arguments.length ? (u = e,
                w) : u
            }
            ,
            w.chartContainer = function(e) {
                return arguments.length ? (a = e,
                w) : a
            }
            ,
            w.position = function(e) {
                return arguments.length ? (l.left = typeof e.left != "undefined" ? e.left : l.left,
                l.top = typeof e.top != "undefined" ? e.top : l.top,
                w) : l
            }
            ,
            w.fixedTop = function(e) {
                return arguments.length ? (o = e,
                w) : o
            }
            ,
            w.enabled = function(e) {
                return arguments.length ? (c = e,
                w) : c
            }
            ,
            w.valueFormatter = function(e) {
                return arguments.length ? (typeof e == "function" && (d = e),
                w) : d
            }
            ,
            w.headerFormatter = function(e) {
                return arguments.length ? (typeof e == "function" && (v = e),
                w) : v
            }
            ,
            w.id = function() {
                return h
            }
            ,
            w
        }
        ,
        e.tooltip.show = function(t, n, r, i, s, o) {
            var u = document.createElement("div");
            u.className = "nvtooltip " + (o ? o : "xy-tooltip");
            var a = s;
            if (!s || s.tagName.match(/g|svg/i))
                a = document.getElementsByTagName("body")[0];
            u.style.left = 0,
            u.style.top = 0,
            u.style.opacity = 0,
            typeof n != "string" ? u.appendChild(n) : u.innerHTML = n,
            a.appendChild(u),
            s && (t[0] = t[0] - s.scrollLeft,
            t[1] = t[1] - s.scrollTop),
            e.tooltip.calcTooltipPosition(t, r, i, u)
        }
        ,
        e.tooltip.findFirstNonSVGParent = function(e) {
            while (e.tagName.match(/^g|svg$/i) !== null)
                e = e.parentNode;
            return e
        }
        ,
        e.tooltip.findTotalOffsetTop = function(e, t) {
            var n = t;
            do
                isNaN(e.offsetTop) || (n += e.offsetTop);
            while (e = e.offsetParent);
            return n
        }
        ,
        e.tooltip.findTotalOffsetLeft = function(e, t) {
            var n = t;
            do
                isNaN(e.offsetLeft) || (n += e.offsetLeft);
            while (e = e.offsetParent);
            return n
        }
        ,
        e.tooltip.calcTooltipPosition = function(t, n, r, i) {
            var s = parseInt(i.offsetHeight), o = parseInt(i.offsetWidth), u = e.utils.windowSize().width, a = e.utils.windowSize().height, f = window.pageYOffset, l = window.pageXOffset, c, h;
            a = window.innerWidth >= document.body.scrollWidth ? a : a - 16,
            u = window.innerHeight >= document.body.scrollHeight ? u : u - 16,
            n = n || "s",
            r = r || 20;
            var p = function(t) {
                return e.tooltip.findTotalOffsetTop(t, h)
            }
              , d = function(t) {
                return e.tooltip.findTotalOffsetLeft(t, c)
            };
            switch (n) {
            case "e":
                c = t[0] - o - r,
                h = t[1] - s / 2;
                var v = d(i)
                  , m = p(i);
                v < l && (c = t[0] + r > l ? t[0] + r : l - v + c),
                m < f && (h = f - m + h),
                m + s > f + a && (h = f + a - m + h - s);
                break;
            case "w":
                c = t[0] + r,
                h = t[1] - s / 2;
                var v = d(i)
                  , m = p(i);
                v + o > u && (c = t[0] - o - r),
                m < f && (h = f + 5),
                m + s > f + a && (h = f + a - m + h - s);
                break;
            case "n":
                c = t[0] - o / 2 - 5,
                h = t[1] + r;
                var v = d(i)
                  , m = p(i);
                v < l && (c = l + 5),
                v + o > u && (c = c - o / 2 + 5),
                m + s > f + a && (h = f + a - m + h - s);
                break;
            case "s":
                c = t[0] - o / 2,
                h = t[1] - s - r;
                var v = d(i)
                  , m = p(i);
                v < l && (c = l + 5),
                v + o > u && (c = c - o / 2 + 5),
                f > m && (h = f);
                break;
            case "none":
                c = t[0],
                h = t[1] - r;
                var v = d(i)
                  , m = p(i)
            }
            return i.style.left = c + "px",
            i.style.top = h + "px",
            i.style.opacity = 1,
            i.style.position = "absolute",
            i
        }
        ,
        e.tooltip.cleanup = function() {
            var e = document.getElementsByClassName("nvtooltip")
              , t = [];
            while (e.length)
                t.push(e[0]),
                e[0].style.transitionDelay = "0 !important",
                e[0].style.opacity = 0,
                e[0].className = "nvtooltip-pending-removal";
            setTimeout(function() {
                while (t.length) {
                    var e = t.pop();
                    e.parentNode.removeChild(e)
                }
            }, 500)
        }
    }(),
    e.utils.windowSize = function() {
        var e = {
            width: 640,
            height: 480
        };
        return document.body && document.body.offsetWidth && (e.width = document.body.offsetWidth,
        e.height = document.body.offsetHeight),
        document.compatMode == "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth && (e.width = document.documentElement.offsetWidth,
        e.height = document.documentElement.offsetHeight),
        window.innerWidth && window.innerHeight && (e.width = window.innerWidth,
        e.height = window.innerHeight),
        e
    }
    ,
    e.utils.windowResize = function(t) {
        return window.addEventListener ? window.addEventListener("resize", t) : e.log("ERROR: Failed to bind to window.resize with: ", t),
        {
            callback: t,
            clear: function() {
                window.removeEventListener("resize", t)
            }
        }
    }
    ,
    e.utils.getColor = function(t) {
        return arguments.length ? t instanceof Array ? function(e, n) {
            return e.color || t[n % t.length]
        }
        : t : e.utils.defaultColor()
    }
    ,
    e.utils.defaultColor = function() {
        var e = d3.scale.category20().range();
        return function(t, n) {
            return t.color || e[n % e.length]
        }
    }
    ,
    e.utils.customTheme = function(e, t, n) {
        t = t || function(e) {
            return e.key
        }
        ,
        n = n || d3.scale.category20().range();
        var r = n.length;
        return function(i, s) {
            var o = t(i);
            return typeof e[o] == "function" ? e[o]() : e[o] !== undefined ? e[o] : (r || (r = n.length),
            r -= 1,
            n[r])
        }
    }
    ,
    e.utils.pjax = function(t, n) {
        var r = function(r) {
            d3.html(r, function(r) {
                var i = d3.select(n).node();
                i.parentNode.replaceChild(d3.select(r).select(n).node(), i),
                e.utils.pjax(t, n)
            })
        };
        d3.selectAll(t).on("click", function() {
            history.pushState(this.href, this.textContent, this.href),
            r(this.href),
            d3.event.preventDefault()
        }),
        d3.select(window).on("popstate", function() {
            d3.event.state && r(d3.event.state)
        })
    }
    ,
    e.utils.calcApproxTextWidth = function(e) {
        if (typeof e.style == "function" && typeof e.text == "function") {
            var t = parseInt(e.style("font-size").replace("px", ""))
              , n = e.text().length;
            return n * t * .5
        }
        return 0
    }
    ,
    e.utils.NaNtoZero = function(e) {
        return typeof e != "number" || isNaN(e) || e === null || e === Infinity || e === -Infinity ? 0 : e
    }
    ,
    d3.selection.prototype.watchTransition = function(e) {
        var t = [this].concat([].slice.call(arguments, 1));
        return e.transition.apply(e, t)
    }
    ,
    e.utils.renderWatch = function(t, n) {
        if (!(this instanceof e.utils.renderWatch))
            return new e.utils.renderWatch(t,n);
        var r = n !== undefined ? n : 250
          , i = []
          , s = this;
        this.models = function(e) {
            return e = [].slice.call(arguments, 0),
            e.forEach(function(e) {
                e.__rendered = !1,
                function(e) {
                    e.dispatch.on("renderEnd", function(t) {
                        e.__rendered = !0,
                        s.renderEnd("model")
                    })
                }(e),
                i.indexOf(e) < 0 && i.push(e)
            }),
            this
        }
        ,
        this.reset = function(e) {
            e !== undefined && (r = e),
            i = []
        }
        ,
        this.transition = function(e, t, n) {
            t = arguments.length > 1 ? [].slice.call(arguments, 1) : [],
            t.length > 1 ? n = t.pop() : n = r !== undefined ? r : 250,
            e.__rendered = !1,
            i.indexOf(e) < 0 && i.push(e);
            if (n === 0)
                return e.__rendered = !0,
                e.delay = function() {
                    return this
                }
                ,
                e.duration = function() {
                    return this
                }
                ,
                e;
            e.length === 0 ? e.__rendered = !0 : e.every(function(e) {
                return !e.length
            }) ? e.__rendered = !0 : e.__rendered = !1;
            var o = 0;
            return e.transition().duration(n).each(function() {
                ++o
            }).each("end", function(n, r) {
                --o === 0 && (e.__rendered = !0,
                s.renderEnd.apply(this, t))
            })
        }
        ,
        this.renderEnd = function() {
            i.every(function(e) {
                return e.__rendered
            }) && (i.forEach(function(e) {
                e.__rendered = !1
            }),
            t.renderEnd.apply(this, arguments))
        }
    }
    ,
    e.utils.deepExtend = function(t) {
        var n = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
        n.forEach(function(n) {
            for (key in n) {
                var r = t[key]instanceof Array
                  , i = typeof t[key] == "object"
                  , s = typeof n[key] == "object";
                i && !r && s ? e.utils.deepExtend(t[key], n[key]) : t[key] = n[key]
            }
        })
    }
    ,
    e.utils.state = function() {
        if (!(this instanceof e.utils.state))
            return new e.utils.state;
        var t = {}
          , n = this
          , r = function() {}
          , i = function() {
            return {}
        }
          , s = null
          , o = null;
        this.dispatch = d3.dispatch("change", "set"),
        this.dispatch.on("set", function(e) {
            r(e, !0)
        }),
        this.getter = function(e) {
            return i = e,
            this
        }
        ,
        this.setter = function(e, t) {
            return t || (t = function() {}
            ),
            r = function(n, r) {
                e(n),
                r && t()
            }
            ,
            this
        }
        ,
        this.init = function(t) {
            s = s || {},
            e.utils.deepExtend(s, t)
        }
        ;
        var u = function() {
            var e = i();
            if (JSON.stringify(e) === JSON.stringify(t))
                return !1;
            for (var n in e)
                t[n] === undefined && (t[n] = {}),
                t[n] = e[n],
                o = !0;
            return !0
        };
        this.update = function() {
            s && (r(s, !1),
            s = null),
            u.call(this) && this.dispatch.change(t)
        }
    }
    ,
    e.utils.optionsFunc = function(t) {
        return e.deprecated("nv.utils.optionsFunc"),
        t && d3.map(t).forEach(function(e, t) {
            typeof this[e] == "function" && this[e](t)
        }
        .bind(this)),
        this
    }
    ,
    e.utils.calcTicksX = function(t, n) {
        var r = 1
          , i = 0;
        for (i; i < n.length; i += 1) {
            var s = n[i] && n[i].values ? n[i].values.length : 0;
            r = s > r ? s : r
        }
        return e.log("Requested number of ticks: ", t),
        e.log("Calculated max values to be: ", r),
        t = t > r ? t = r - 1 : t,
        t = t < 1 ? 1 : t,
        t = Math.floor(t),
        e.log("Calculating tick count as: ", t),
        t
    }
    ,
    e.utils.calcTicksY = function(t, n) {
        return e.utils.calcTicksX(t, n)
    }
    ,
    e.utils.initOption = function(e, t) {
        e._calls && e._calls[t] ? e[t] = e._calls[t] : e[t] = function(n) {
            return arguments.length ? (e._options[t] = n,
            e) : e._options[t]
        }
    }
    ,
    e.utils.initOptions = function(t) {
        var n = Object.getOwnPropertyNames(t._options || {})
          , r = Object.getOwnPropertyNames(t._calls || {});
        n = n.concat(r);
        for (var i in n)
            e.utils.initOption(t, n[i])
    }
    ,
    e.utils.inheritOptionsD3 = function(e, t, n) {
        e._d3options = n.concat(e._d3options || []),
        n.unshift(t),
        n.unshift(e),
        d3.rebind.apply(this, n)
    }
    ,
    e.utils.arrayUnique = function(e) {
        return e.sort().filter(function(t, n) {
            return !n || t != e[n - 1]
        })
    }
    ,
    e.utils.symbolMap = d3.map(),
    e.utils.symbol = function() {
        function r(r, i) {
            var s = t.call(this, r, i)
              , o = n.call(this, r, i);
            return d3.svg.symbolTypes.indexOf(s) !== -1 ? d3.svg.symbol().type(s).size(o)() : e.utils.symbolMap.get(s)(o)
        }
        var t, n = 64;
        return r.type = function(e) {
            return arguments.length ? (t = d3.functor(e),
            r) : t
        }
        ,
        r.size = function(e) {
            return arguments.length ? (n = d3.functor(e),
            r) : n
        }
        ,
        r
    }
    ,
    e.utils.inheritOptions = function(t, n) {
        var r = Object.getOwnPropertyNames(n._options || {})
          , i = Object.getOwnPropertyNames(n._calls || {})
          , s = n._inherited || []
          , o = n._d3options || []
          , u = r.concat(i).concat(s).concat(o);
        u.unshift(n),
        u.unshift(t),
        d3.rebind.apply(this, u),
        t._inherited = e.utils.arrayUnique(r.concat(i).concat(s).concat(r).concat(t._inherited || [])),
        t._d3options = e.utils.arrayUnique(o.concat(t._d3options || []))
    }
    ,
    e.utils.initSVG = function(e) {
        e.classed({
            "nvd3-svg": !0
        })
    }
    ,
    e.models.axis = function() {
        "use strict";
        function E(s) {
            return w.reset(),
            s.each(function(s) {
                var v = d3.select(this);
                e.utils.initSVG(v);
                var m = v.selectAll("g.nv-wrap.nv-axis").data([s])
                  , g = m.enter().append("g").attr("class", "nvd3 nv-wrap nv-axis")
                  , y = g.append("g")
                  , E = m.select("g");
                p !== null ? t.ticks(p) : (t.orient() == "top" || t.orient() == "bottom") && t.ticks(Math.abs(n.range()[1] - n.range()[0]) / 100),
                E.watchTransition(w, "axis").call(t),
                b = b || t.scale();
                var S = t.tickFormat();
                S == null && (S = b.tickFormat());
                var x = E.selectAll("text.nv-axislabel").data([o || null]);
                x.exit().remove();
                switch (t.orient()) {
                case "top":
                    x.enter().append("text").attr("class", "nv-axislabel");
                    var T;
                    n.range().length < 2 ? T = 0 : n.range().length === 2 ? T = n.range()[1] : T = n.range()[n.range().length - 1] + (n.range()[1] - n.range()[0]),
                    x.attr("text-anchor", "middle").attr("y", 0).attr("x", T / 2);
                    if (u) {
                        var N = m.selectAll("g.nv-axisMaxMin").data(n.domain());
                        N.enter().append("g").attr("class", "nv-axisMaxMin").append("text"),
                        N.exit().remove(),
                        N.attr("transform", function(t, r) {
                            return "translate(" + e.utils.NaNtoZero(n(t)) + ",0)"
                        }).select("text").attr("dy", "-0.5em").attr("y", -t.tickPadding()).attr("text-anchor", "middle").text(function(e, t) {
                            var n = S(e);
                            return ("" + n).match("NaN") ? "" : n
                        }),
                        N.watchTransition(w, "min-max top").attr("transform", function(t, r) {
                            return "translate(" + e.utils.NaNtoZero(n.range()[r]) + ",0)"
                        })
                    }
                    break;
                case "bottom":
                    var C = d + 36
                      , k = 30
                      , L = E.selectAll("g").select("text");
                    if (f % 360) {
                        L.each(function(e, t) {
                            var n = this.getBoundingClientRect().width;
                            n > k && (k = n)
                        });
                        var A = Math.abs(Math.sin(f * Math.PI / 180))
                          , C = (A ? A * k : k) + 30;
                        L.attr("transform", function(e, t, n) {
                            return "rotate(" + f + " 0,0)"
                        }).style("text-anchor", f % 360 > 0 ? "start" : "end")
                    }
                    x.enter().append("text").attr("class", "nv-axislabel");
                    var T;
                    n.range().length < 2 ? T = 0 : n.range().length === 2 ? T = n.range()[1] : T = n.range()[n.range().length - 1] + (n.range()[1] - n.range()[0]),
                    x.attr("text-anchor", "middle").attr("y", C).attr("x", T / 2);
                    if (u) {
                        var N = m.selectAll("g.nv-axisMaxMin").data([n.domain()[0], n.domain()[n.domain().length - 1]]);
                        N.enter().append("g").attr("class", "nv-axisMaxMin").append("text"),
                        N.exit().remove(),
                        N.attr("transform", function(t, r) {
                            return "translate(" + e.utils.NaNtoZero(n(t) + (h ? n.rangeBand() / 2 : 0)) + ",0)"
                        }).select("text").attr("dy", ".71em").attr("y", t.tickPadding()).attr("transform", function(e, t, n) {
                            return "rotate(" + f + " 0,0)"
                        }).style("text-anchor", f ? f % 360 > 0 ? "start" : "end" : "middle").text(function(e, t) {
                            var n = S(e);
                            return ("" + n).match("NaN") ? "" : n
                        }),
                        N.watchTransition(w, "min-max bottom").attr("transform", function(t, r) {
                            return "translate(" + e.utils.NaNtoZero(n(t) + (h ? n.rangeBand() / 2 : 0)) + ",0)"
                        })
                    }
                    c && L.attr("transform", function(e, t) {
                        return "translate(0," + (t % 2 == 0 ? "0" : "12") + ")"
                    });
                    break;
                case "right":
                    x.enter().append("text").attr("class", "nv-axislabel"),
                    x.style("text-anchor", l ? "middle" : "begin").attr("transform", l ? "rotate(90)" : "").attr("y", l ? -Math.max(r.right, i) + 12 : -10).attr("x", l ? n.range()[0] / 2 : t.tickPadding());
                    if (u) {
                        var N = m.selectAll("g.nv-axisMaxMin").data(n.domain());
                        N.enter().append("g").attr("class", "nv-axisMaxMin").append("text").style("opacity", 0),
                        N.exit().remove(),
                        N.attr("transform", function(t, r) {
                            return "translate(0," + e.utils.NaNtoZero(n(t)) + ")"
                        }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", t.tickPadding()).style("text-anchor", "start").text(function(e, t) {
                            var n = S(e);
                            return ("" + n).match("NaN") ? "" : n
                        }),
                        N.watchTransition(w, "min-max right").attr("transform", function(t, r) {
                            return "translate(0," + e.utils.NaNtoZero(n.range()[r]) + ")"
                        }).select("text").style("opacity", 1)
                    }
                    break;
                case "left":
                    x.enter().append("text").attr("class", "nv-axislabel"),
                    x.style("text-anchor", l ? "middle" : "end").attr("transform", l ? "rotate(-90)" : "").attr("y", l ? -Math.max(r.left, i) + 25 - (d || 0) : -10).attr("x", l ? -n.range()[0] / 2 : -t.tickPadding());
                    if (u) {
                        var N = m.selectAll("g.nv-axisMaxMin").data(n.domain());
                        N.enter().append("g").attr("class", "nv-axisMaxMin").append("text").style("opacity", 0),
                        N.exit().remove(),
                        N.attr("transform", function(t, n) {
                            return "translate(0," + e.utils.NaNtoZero(b(t)) + ")"
                        }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", -t.tickPadding()).attr("text-anchor", "end").text(function(e, t) {
                            var n = S(e);
                            return ("" + n).match("NaN") ? "" : n
                        }),
                        N.watchTransition(w, "min-max right").attr("transform", function(t, r) {
                            return "translate(0," + e.utils.NaNtoZero(n.range()[r]) + ")"
                        }).select("text").style("opacity", 1)
                    }
                }
                x.text(function(e) {
                    return e
                }),
                u && (t.orient() === "left" || t.orient() === "right") && (E.selectAll("g").each(function(e, t) {
                    d3.select(this).select("text").attr("opacity", 1);
                    if (n(e) < n.range()[1] + 10 || n(e) > n.range()[0] - 10)
                        (e > 1e-10 || e < -1e-10) && d3.select(this).attr("opacity", 0),
                        d3.select(this).select("text").attr("opacity", 0)
                }),
                n.domain()[0] == n.domain()[1] && n.domain()[0] == 0 && m.selectAll("g.nv-axisMaxMin").style("opacity", function(e, t) {
                    return t ? 0 : 1
                }));
                if (u && (t.orient() === "top" || t.orient() === "bottom")) {
                    var O = [];
                    m.selectAll("g.nv-axisMaxMin").each(function(e, t) {
                        try {
                            t ? O.push(n(e) - this.getBoundingClientRect().width - 4) : O.push(n(e) + this.getBoundingClientRect().width + 4)
                        } catch (r) {
                            t ? O.push(n(e) - 4) : O.push(n(e) + 4)
                        }
                    }),
                    E.selectAll("g").each(function(e, t) {
                        if (n(e) < O[0] || n(e) > O[1])
                            e > 1e-10 || e < -1e-10 ? d3.select(this).remove() : d3.select(this).select("text").remove()
                    })
                }
                a && E.selectAll(".tick").filter(function(e) {
                    return !parseFloat(Math.round(this.__data__ * 1e5) / 1e6) && this.__data__ !== undefined
                }).classed("zero", !0),
                b = n.copy()
            }),
            w.renderEnd("axis immediate"),
            E
        }
        var t = d3.svg.axis()
          , n = d3.scale.linear()
          , r = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
          , i = 75
          , s = 60
          , o = null
          , u = !0
          , a = !0
          , f = 0
          , l = !0
          , c = !1
          , h = !1
          , p = null
          , d = 0
          , v = 250
          , m = d3.dispatch("renderEnd")
          , g = !1
          , y = !1;
        t.scale(n).orient("bottom").tickFormat(function(e) {
            return e
        });
        var b, w = e.utils.renderWatch(m, v);
        return E.axis = t,
        E.dispatch = m,
        E.options = e.utils.optionsFunc.bind(E),
        E._options = Object.create({}, {
            axisLabelDistance: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            staggerLabels: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            rotateLabels: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            rotateYLabel: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            highlightZero: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            showMaxMin: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            axisLabel: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            height: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            ticks: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            width: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            margin: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r.top = e.top !== undefined ? e.top : r.top,
                    r.right = e.right !== undefined ? e.right : r.right,
                    r.bottom = e.bottom !== undefined ? e.bottom : r.bottom,
                    r.left = e.left !== undefined ? e.left : r.left
                }
            },
            duration: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e,
                    w.reset(v)
                }
            },
            scale: {
                get: function() {
                    return n
                },
                set: function(r) {
                    n = r,
                    t.scale(n),
                    h = typeof n.rangeBands == "function",
                    e.utils.inheritOptionsD3(E, n, ["domain", "range", "rangeBand", "rangeBands"])
                }
            }
        }),
        e.utils.initOptions(E),
        e.utils.inheritOptionsD3(E, t, ["orient", "tickValues", "tickSubdivide", "tickSize", "tickPadding", "tickFormat"]),
        e.utils.inheritOptionsD3(E, n, ["domain", "range", "rangeBand", "rangeBands"]),
        E
    }
    ,
    e.models.bullet = function() {
        "use strict";
        function m(n) {
            return n.each(function(n, p) {
                var m = c - t.left - t.right
                  , g = h - t.top - t.bottom
                  , y = d3.select(this);
                e.utils.initSVG(y);
                var b = i.call(this, n, p).slice().sort(d3.descending)
                  , w = s.call(this, n, p).slice().sort(d3.descending)
                  , E = o.call(this, n, p).slice().sort(d3.descending)
                  , S = u.call(this, n, p).slice()
                  , x = a.call(this, n, p).slice()
                  , T = f.call(this, n, p).slice()
                  , N = d3.scale.linear().domain(d3.extent(d3.merge([l, b]))).range(r ? [m, 0] : [0, m])
                  , C = this.__chart__ || d3.scale.linear().domain([0, Infinity]).range(N.range());
                this.__chart__ = N;
                var k = d3.min(b)
                  , L = d3.max(b)
                  , A = b[1]
                  , O = y.selectAll("g.nv-wrap.nv-bullet").data([n])
                  , M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-bullet")
                  , _ = M.append("g")
                  , D = O.select("g");
                _.append("rect").attr("class", "nv-range nv-rangeMax"),
                _.append("rect").attr("class", "nv-range nv-rangeAvg"),
                _.append("rect").attr("class", "nv-range nv-rangeMin"),
                _.append("rect").attr("class", "nv-measure"),
                _.append("path").attr("class", "nv-markerTriangle"),
                O.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var P = function(e) {
                    return Math.abs(C(e) - C(0))
                }
                  , H = function(e) {
                    return Math.abs(N(e) - N(0))
                }
                  , B = function(e) {
                    return e < 0 ? C(e) : C(0)
                }
                  , j = function(e) {
                    return e < 0 ? N(e) : N(0)
                };
                D.select("rect.nv-rangeMax").attr("height", g).attr("width", H(L > 0 ? L : k)).attr("x", j(L > 0 ? L : k)).datum(L > 0 ? L : k),
                D.select("rect.nv-rangeAvg").attr("height", g).attr("width", H(A)).attr("x", j(A)).datum(A),
                D.select("rect.nv-rangeMin").attr("height", g).attr("width", H(L)).attr("x", j(L)).attr("width", H(L > 0 ? k : L)).attr("x", j(L > 0 ? k : L)).datum(L > 0 ? k : L),
                D.select("rect.nv-measure").style("fill", d).attr("height", g / 3).attr("y", g / 3).attr("width", E < 0 ? N(0) - N(E[0]) : N(E[0]) - N(0)).attr("x", j(E)).on("mouseover", function() {
                    v.elementMouseover({
                        value: E[0],
                        label: T[0] || "Current",
                        pos: [N(E[0]), g / 2]
                    })
                }).on("mouseout", function() {
                    v.elementMouseout({
                        value: E[0],
                        label: T[0] || "Current"
                    })
                });
                var F = g / 6;
                w[0] ? D.selectAll("path.nv-markerTriangle").attr("transform", function(e) {
                    return "translate(" + N(w[0]) + "," + g / 2 + ")"
                }).attr("d", "M0," + F + "L" + F + "," + -F + " " + -F + "," + -F + "Z").on("mouseover", function() {
                    v.elementMouseover({
                        value: w[0],
                        label: x[0] || "Previous",
                        pos: [N(w[0]), g / 2]
                    })
                }).on("mouseout", function() {
                    v.elementMouseout({
                        value: w[0],
                        label: x[0] || "Previous"
                    })
                }) : D.selectAll("path.nv-markerTriangle").remove(),
                O.selectAll(".nv-range").on("mouseover", function(e, t) {
                    var n = S[t] || (t ? t == 1 ? "Mean" : "Minimum" : "Maximum");
                    v.elementMouseover({
                        value: e,
                        label: n,
                        pos: [N(e), g / 2]
                    })
                }).on("mouseout", function(e, t) {
                    var n = S[t] || (t ? t == 1 ? "Mean" : "Minimum" : "Maximum");
                    v.elementMouseout({
                        value: e,
                        label: n
                    })
                })
            }),
            m
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
          , n = "left"
          , r = !1
          , i = function(e) {
            return e.ranges
        }
          , s = function(e) {
            return e.markers ? e.markers : [0]
        }
          , o = function(e) {
            return e.measures
        }
          , u = function(e) {
            return e.rangeLabels ? e.rangeLabels : []
        }
          , a = function(e) {
            return e.markerLabels ? e.markerLabels : []
        }
          , f = function(e) {
            return e.measureLabels ? e.measureLabels : []
        }
          , l = [0]
          , c = 380
          , h = 30
          , p = null
          , d = e.utils.getColor(["#1f77b4"])
          , v = d3.dispatch("elementMouseover", "elementMouseout");
        return m.dispatch = v,
        m.options = e.utils.optionsFunc.bind(m),
        m._options = Object.create({}, {
            ranges: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            markers: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            measures: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            forceX: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            width: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            height: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            tickFormat: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            orient: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e,
                    r = n == "right" || n == "bottom"
                }
            },
            color: {
                get: function() {
                    return d
                },
                set: function(t) {
                    d = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(m),
        m
    }
    ,
    e.models.bulletChart = function() {
        "use strict";
        function m(n) {
            return n.each(function(h, g) {
                var y = d3.select(this);
                e.utils.initSVG(y);
                var b = (a || parseInt(y.style("width")) || 960) - i.left - i.right
                  , w = f - i.top - i.bottom
                  , E = this;
                m.update = function() {
                    m(n)
                }
                ,
                m.container = this;
                if (!h || !s.call(this, h, g)) {
                    var S = y.selectAll(".nv-noData").data([p]);
                    return S.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    S.attr("x", i.left + b / 2).attr("y", 18 + i.top + w / 2).text(function(e) {
                        return e
                    }),
                    m
                }
                y.selectAll(".nv-noData").remove();
                var x = s.call(this, h, g).slice().sort(d3.descending)
                  , T = o.call(this, h, g).slice().sort(d3.descending)
                  , N = u.call(this, h, g).slice().sort(d3.descending)
                  , C = y.selectAll("g.nv-wrap.nv-bulletChart").data([h])
                  , k = C.enter().append("g").attr("class", "nvd3 nv-wrap nv-bulletChart")
                  , L = k.append("g")
                  , A = C.select("g");
                L.append("g").attr("class", "nv-bulletWrap"),
                L.append("g").attr("class", "nv-titles"),
                C.attr("transform", "translate(" + i.left + "," + i.top + ")");
                var O = d3.scale.linear().domain([0, Math.max(x[0], T[0], N[0])]).range(r ? [b, 0] : [0, b])
                  , M = this.__chart__ || d3.scale.linear().domain([0, Infinity]).range(O.range());
                this.__chart__ = O;
                var _ = function(e) {
                    return Math.abs(M(e) - M(0))
                }
                  , D = function(e) {
                    return Math.abs(O(e) - O(0))
                }
                  , P = L.select(".nv-titles").append("g").attr("text-anchor", "end").attr("transform", "translate(-6," + (f - i.top - i.bottom) / 2 + ")");
                P.append("text").attr("class", "nv-title").text(function(e) {
                    return e.title
                }),
                P.append("text").attr("class", "nv-subtitle").attr("dy", "1em").text(function(e) {
                    return e.subtitle
                }),
                t.width(b).height(w);
                var H = A.select(".nv-bulletWrap");
                d3.transition(H).call(t);
                var B = l || O.tickFormat(b / 100)
                  , j = A.selectAll("g.nv-tick").data(O.ticks(b / 50), function(e) {
                    return this.textContent || B(e)
                })
                  , F = j.enter().append("g").attr("class", "nv-tick").attr("transform", function(e) {
                    return "translate(" + M(e) + ",0)"
                }).style("opacity", 1e-6);
                F.append("line").attr("y1", w).attr("y2", w * 7 / 6),
                F.append("text").attr("text-anchor", "middle").attr("dy", "1em").attr("y", w * 7 / 6).text(B);
                var I = d3.transition(j).attr("transform", function(e) {
                    return "translate(" + O(e) + ",0)"
                }).style("opacity", 1);
                I.select("line").attr("y1", w).attr("y2", w * 7 / 6),
                I.select("text").attr("y", w * 7 / 6),
                d3.transition(j.exit()).attr("transform", function(e) {
                    return "translate(" + O(e) + ",0)"
                }).style("opacity", 1e-6).remove(),
                d.on("tooltipShow", function(e) {
                    e.key = h.title,
                    c && v(e, E.parentNode)
                })
            }),
            d3.timer.flush(),
            m
        }
        var t = e.models.bullet()
          , n = "left"
          , r = !1
          , i = {
            top: 5,
            right: 40,
            bottom: 20,
            left: 120
        }
          , s = function(e) {
            return e.ranges
        }
          , o = function(e) {
            return e.markers ? e.markers : [0]
        }
          , u = function(e) {
            return e.measures
        }
          , a = null
          , f = 55
          , l = null
          , c = !0
          , h = function(e, t, n, r, i) {
            return "<h3>" + t + "</h3>" + "<p>" + n + "</p>"
        }
          , p = "No Data Available."
          , d = d3.dispatch("tooltipShow", "tooltipHide")
          , v = function(t, n) {
            var r = t.pos[0] + (n.offsetLeft || 0) + i.left
              , s = t.pos[1] + (n.offsetTop || 0) + i.top
              , o = h(t.key, t.label, t.value, t, m);
            e.tooltip.show([r, s], o, t.value < 0 ? "e" : "w", null, n)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            d.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            d.tooltipHide(e)
        }),
        d.on("tooltipHide", function() {
            c && e.tooltip.cleanup()
        }),
        m.bullet = t,
        m.dispatch = d,
        m.options = e.utils.optionsFunc.bind(m),
        m._options = Object.create({}, {
            ranges: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            markers: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            measures: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            width: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            height: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            tickFormat: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            tooltips: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            tooltipContent: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            noData: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            margin: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i.top = e.top !== undefined ? e.top : i.top,
                    i.right = e.right !== undefined ? e.right : i.right,
                    i.bottom = e.bottom !== undefined ? e.bottom : i.bottom,
                    i.left = e.left !== undefined ? e.left : i.left
                }
            },
            orient: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e,
                    r = n == "right" || n == "bottom"
                }
            }
        }),
        e.utils.inheritOptions(m, t),
        e.utils.initOptions(m),
        m
    }
    ,
    e.models.cumulativeLineChart = function() {
        "use strict";
        function j(b) {
            return D.reset(),
            D.models(t),
            h && D.models(n),
            p && D.models(r),
            b.each(function(b) {
                function U(e, t) {
                    d3.select(j.container).style("cursor", "ew-resize")
                }
                function z(e, t) {
                    _.x = d3.event.x,
                    _.i = Math.round(M.invert(_.x)),
                    st()
                }
                function W(e, t) {
                    d3.select(j.container).style("cursor", "auto"),
                    x.index = _.i,
                    k.stateChange(x)
                }
                function st() {
                    it.data([_]);
                    var e = j.duration();
                    j.duration(0),
                    j.update(),
                    j.duration(e)
                }
                var L = d3.select(this);
                e.utils.initSVG(L),
                L.classed("nv-chart-" + S, !0);
                var O = this
                  , D = (f || parseInt(L.style("width")) || 960) - u.left - u.right
                  , F = (l || parseInt(L.style("height")) || 400) - u.top - u.bottom;
                j.update = function() {
                    A === 0 ? L.call(j) : L.transition().duration(A).call(j)
                }
                ,
                j.container = this,
                x.setter(B(b), j.update).getter(H(b)).update(),
                x.disabled = b.map(function(e) {
                    return !!e.disabled
                });
                if (!T) {
                    var q;
                    T = {};
                    for (q in x)
                        x[q]instanceof Array ? T[q] = x[q].slice(0) : T[q] = x[q]
                }
                var R = d3.behavior.drag().on("dragstart", U).on("drag", z).on("dragend", W);
                if (!b || !b.length || !b.filter(function(e) {
                    return e.values.length
                }).length) {
                    var X = L.selectAll(".nv-noData").data([N]);
                    return X.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    X.attr("x", u.left + D / 2).attr("y", u.top + F / 2).text(function(e) {
                        return e
                    }),
                    j
                }
                L.selectAll(".nv-noData").remove(),
                w = t.xScale(),
                E = t.yScale();
                if (!y) {
                    var V = b.filter(function(e) {
                        return !e.disabled
                    }).map(function(e, n) {
                        var r = d3.extent(e.values, t.y());
                        return r[0] < -0.95 && (r[0] = -0.95),
                        [(r[0] - r[1]) / (1 + r[1]), (r[1] - r[0]) / (1 + r[0])]
                    })
                      , $ = [d3.min(V, function(e) {
                        return e[0]
                    }), d3.max(V, function(e) {
                        return e[1]
                    })];
                    t.yDomain($)
                } else
                    t.yDomain(null);
                M.domain([0, b[0].values.length - 1]).range([0, D]).clamp(!0);
                var b = I(_.i, b)
                  , J = g ? "none" : "all"
                  , K = L.selectAll("g.nv-wrap.nv-cumulativeLine").data([b])
                  , Q = K.enter().append("g").attr("class", "nvd3 nv-wrap nv-cumulativeLine").append("g")
                  , G = K.select("g");
                Q.append("g").attr("class", "nv-interactive"),
                Q.append("g").attr("class", "nv-x nv-axis").style("pointer-events", "none"),
                Q.append("g").attr("class", "nv-y nv-axis"),
                Q.append("g").attr("class", "nv-background"),
                Q.append("g").attr("class", "nv-linesWrap").style("pointer-events", J),
                Q.append("g").attr("class", "nv-avgLinesWrap").style("pointer-events", "none"),
                Q.append("g").attr("class", "nv-legendWrap"),
                Q.append("g").attr("class", "nv-controlsWrap"),
                c && (i.width(D),
                G.select(".nv-legendWrap").datum(b).call(i),
                u.top != i.height() && (u.top = i.height(),
                F = (l || parseInt(L.style("height")) || 400) - u.top - u.bottom),
                G.select(".nv-legendWrap").attr("transform", "translate(0," + -u.top + ")"));
                if (m) {
                    var Y = [{
                        key: "Re-scale y-axis",
                        disabled: !y
                    }];
                    s.width(140).color(["#444", "#444", "#444"]).rightAlign(!1).margin({
                        top: 5,
                        right: 0,
                        bottom: 5,
                        left: 20
                    }),
                    G.select(".nv-controlsWrap").datum(Y).attr("transform", "translate(0," + -u.top + ")").call(s)
                }
                K.attr("transform", "translate(" + u.left + "," + u.top + ")"),
                d && G.select(".nv-y.nv-axis").attr("transform", "translate(" + D + ",0)");
                var Z = b.filter(function(e) {
                    return e.tempDisabled
                });
                K.select(".tempDisabled").remove(),
                Z.length && K.append("text").attr("class", "tempDisabled").attr("x", D / 2).attr("y", "-.71em").style("text-anchor", "end").text(Z.map(function(e) {
                    return e.key
                }).join(", ") + " values cannot be calculated for this time period."),
                g && (o.width(D).height(F).margin({
                    left: u.left,
                    top: u.top
                }).svgContainer(L).xScale(w),
                K.select(".nv-interactive").call(o)),
                Q.select(".nv-background").append("rect"),
                G.select(".nv-background rect").attr("width", D).attr("height", F),
                t.y(function(e) {
                    return e.display.y
                }).width(D).height(F).color(b.map(function(e, t) {
                    return e.color || a(e, t)
                }).filter(function(e, t) {
                    return !b[t].disabled && !b[t].tempDisabled
                }));
                var et = G.select(".nv-linesWrap").datum(b.filter(function(e) {
                    return !e.disabled && !e.tempDisabled
                }));
                et.call(t),
                b.forEach(function(e, t) {
                    e.seriesIndex = t
                });
                var tt = b.filter(function(e) {
                    return !e.disabled && !!C(e)
                })
                  , nt = G.select(".nv-avgLinesWrap").selectAll("line").data(tt, function(e) {
                    return e.key
                })
                  , rt = function(e) {
                    var t = E(C(e));
                    return t < 0 ? 0 : t > F ? F : t
                };
                nt.enter().append("line").style("stroke-width", 2).style("stroke-dasharray", "10,10").style("stroke", function(e, n) {
                    return t.color()(e, e.seriesIndex)
                }).attr("x1", 0).attr("x2", D).attr("y1", rt).attr("y2", rt),
                nt.style("stroke-opacity", function(e) {
                    var t = E(C(e));
                    return t < 0 || t > F ? 0 : 1
                }).attr("x1", 0).attr("x2", D).attr("y1", rt).attr("y2", rt),
                nt.exit().remove();
                var it = et.selectAll(".nv-indexLine").data([_]);
                it.enter().append("rect").attr("class", "nv-indexLine").attr("width", 3).attr("x", -2).attr("fill", "red").attr("fill-opacity", .5).style("pointer-events", "all").call(R),
                it.attr("transform", function(e) {
                    return "translate(" + M(e.i) + ",0)"
                }).attr("height", F),
                h && (n.scale(w).ticks(e.utils.calcTicksX(D / 70, b)).tickSize(-F, 0),
                G.select(".nv-x.nv-axis").attr("transform", "translate(0," + E.range()[0] + ")"),
                G.select(".nv-x.nv-axis").call(n)),
                p && (r.scale(E).ticks(e.utils.calcTicksY(F / 36, b)).tickSize(-D, 0),
                G.select(".nv-y.nv-axis").call(r)),
                G.select(".nv-background rect").on("click", function() {
                    _.x = d3.mouse(this)[0],
                    _.i = Math.round(M.invert(_.x)),
                    x.index = _.i,
                    k.stateChange(x),
                    st()
                }),
                t.dispatch.on("elementClick", function(e) {
                    _.i = e.pointIndex,
                    _.x = M(_.i),
                    x.index = _.i,
                    k.stateChange(x),
                    st()
                }),
                s.dispatch.on("legendClick", function(e, t) {
                    e.disabled = !e.disabled,
                    y = !e.disabled,
                    x.rescaleY = y,
                    k.stateChange(x),
                    j.update()
                }),
                i.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        x[t] = e[t];
                    k.stateChange(x),
                    j.update()
                }),
                o.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var s, f, l, c = [];
                    b.filter(function(e, t) {
                        return e.seriesIndex = t,
                        !e.disabled
                    }).forEach(function(n, r) {
                        f = e.interactiveBisect(n.values, i.pointXValue, j.x()),
                        t.highlightPoint(r, f, !0);
                        var o = n.values[f];
                        if (typeof o == "undefined")
                            return;
                        typeof s == "undefined" && (s = o),
                        typeof l == "undefined" && (l = j.xScale()(j.x()(o, f))),
                        c.push({
                            key: n.key,
                            value: j.y()(o, f),
                            color: a(n, n.seriesIndex)
                        })
                    });
                    if (c.length > 2) {
                        var h = j.yScale().invert(i.mouseY)
                          , p = Math.abs(j.yScale().domain()[0] - j.yScale().domain()[1])
                          , d = .03 * p
                          , m = e.nearestValueIndex(c.map(function(e) {
                            return e.value
                        }), h, d);
                        m !== null && (c[m].highlight = !0)
                    }
                    var g = n.tickFormat()(j.x()(s, f), f);
                    o.tooltip.position({
                        left: l + u.left,
                        top: i.mouseY + u.top
                    }).chartContainer(O.parentNode).enabled(v).valueFormatter(function(e, t) {
                        return r.tickFormat()(e)
                    }).data({
                        value: g,
                        series: c
                    })(),
                    o.renderGuideLine(l)
                }),
                o.dispatch.on("elementMouseout", function(e) {
                    k.tooltipHide(),
                    t.clearHighlights()
                }),
                k.on("tooltipShow", function(e) {
                    v && P(e, O.parentNode)
                }),
                k.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (b.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    x.disabled = e.disabled),
                    typeof e.index != "undefined" && (_.i = e.index,
                    _.x = M(_.i),
                    x.index = e.index,
                    it.data([_])),
                    typeof e.rescaleY != "undefined" && (y = e.rescaleY),
                    j.update()
                })
            }),
            D.renderEnd("cumulativeLineChart immediate"),
            j
        }
        function I(e, n) {
            return F || (F = t.y()),
            n.map(function(t, n) {
                if (!t.values)
                    return t;
                var r = t.values[e];
                if (r == null)
                    return t;
                var i = F(r, e);
                return i < -0.95 && !O ? (t.tempDisabled = !0,
                t) : (t.tempDisabled = !1,
                t.values = t.values.map(function(e, t) {
                    return e.display = {
                        y: (F(e, t) - i) / (1 + i)
                    },
                    e
                }),
                t)
            })
        }
        var t = e.models.line(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = e.interactiveGuideline(), u = {
            top: 30,
            right: 30,
            bottom: 50,
            left: 60
        }, a = e.utils.defaultColor(), f = null, l = null, c = !0, h = !0, p = !0, d = !1, v = !0, m = !0, g = !1, y = !0, b = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, w, E, S = t.id(), x = e.utils.state(), T = null, N = "No Data Available.", C = function(e) {
            return e.average
        }, k = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd"), L = 250, A = 250, O = !1;
        x.index = 0,
        x.rescaleY = y,
        n.orient("bottom").tickPadding(7),
        r.orient(d ? "right" : "left"),
        s.updateState(!1);
        var M = d3.scale.linear()
          , _ = {
            i: 0,
            x: 0
        }
          , D = e.utils.renderWatch(k, A)
          , P = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , u = i.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , f = r.tickFormat()(t.y()(i.point, i.pointIndex))
              , l = b(i.series.key, a, f, i, j);
            e.tooltip.show([o, u], l, null, null, s)
        }
          , H = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    }),
                    index: _.i,
                    rescaleY: y
                }
            }
        }
          , B = function(e) {
            return function(t) {
                t.index !== undefined && (_.i = t.index),
                t.rescaleY !== undefined && (y = t.rescaleY),
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top],
            k.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            k.tooltipHide(e)
        }),
        k.on("tooltipHide", function() {
            v && e.tooltip.cleanup()
        });
        var F = null;
        return j.dispatch = k,
        j.lines = t,
        j.legend = i,
        j.xAxis = n,
        j.yAxis = r,
        j.interactiveLayer = o,
        j.state = x,
        j.options = e.utils.optionsFunc.bind(j),
        j._options = Object.create({}, {
            width: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            height: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            rescaleY: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            showControls: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            showLegend: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            average: {
                get: function() {
                    return C
                },
                set: function(e) {
                    C = e
                }
            },
            tooltips: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            tooltipContent: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            defaultState: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            noData: {
                get: function() {
                    return N
                },
                set: function(e) {
                    N = e
                }
            },
            showXAxis: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            showYAxis: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            noErrorCheck: {
                get: function() {
                    return O
                },
                set: function(e) {
                    O = e
                }
            },
            margin: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u.top = e.top !== undefined ? e.top : u.top,
                    u.right = e.right !== undefined ? e.right : u.right,
                    u.bottom = e.bottom !== undefined ? e.bottom : u.bottom,
                    u.left = e.left !== undefined ? e.left : u.left
                }
            },
            color: {
                get: function() {
                    return a
                },
                set: function(t) {
                    a = e.utils.getColor(t),
                    i.color(a)
                }
            },
            useInteractiveGuideline: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e,
                    e === !0 && (j.interactive(!1),
                    j.useVoronoi(!1))
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e,
                    r.orient(e ? "right" : "left")
                }
            },
            duration: {
                get: function() {
                    return A
                },
                set: function(e) {
                    A = e,
                    t.duration(A),
                    n.duration(A),
                    r.duration(A),
                    D.reset(A)
                }
            }
        }),
        e.utils.inheritOptions(j, t),
        e.utils.initOptions(j),
        j
    }
    ,
    e.models.discreteBar = function() {
        "use strict";
        function x(i) {
            return S.reset(),
            i.each(function(i) {
                var b = n - t.left - t.right
                  , x = r - t.top - t.bottom
                  , T = d3.select(this);
                e.utils.initSVG(T),
                i.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                });
                var N = p && d ? [] : i.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0
                        }
                    })
                });
                s.domain(p || d3.merge(N).map(function(e) {
                    return e.x
                })).rangeBands(v || [0, b], .1),
                o.domain(d || d3.extent(d3.merge(N).map(function(e) {
                    return e.y
                }).concat(f))),
                c ? o.range(m || [x - (o.domain()[0] < 0 ? 12 : 0), o.domain()[1] > 0 ? 12 : 0]) : o.range(m || [x, 0]),
                w = w || s,
                E = E || o.copy().range([o(0), o(0)]);
                var C = T.selectAll("g.nv-wrap.nv-discretebar").data([i])
                  , k = C.enter().append("g").attr("class", "nvd3 nv-wrap nv-discretebar")
                  , L = k.append("g")
                  , A = C.select("g");
                L.append("g").attr("class", "nv-groups"),
                C.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var O = C.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                O.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6),
                O.exit().watchTransition(S, "discreteBar: exit groups").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove(),
                O.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }),
                O.watchTransition(S, "discreteBar: groups").style("stroke-opacity", 1).style("fill-opacity", .75);
                var M = O.selectAll("g.nv-bar").data(function(e) {
                    return e.values
                });
                M.exit().remove();
                var _ = M.enter().append("g").attr("transform", function(e, t, n) {
                    return "translate(" + (s(u(e, t)) + s.rangeBand() * .05) + ", " + o(0) + ")"
                }).on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0),
                    g.elementMouseover({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pos: [s(u(e, t)) + s.rangeBand() * (e.series + .5) / i.length, o(a(e, t))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    g.elementMouseout({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    g.elementClick({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pos: [s(u(e, t)) + s.rangeBand() * (e.series + .5) / i.length, o(a(e, t))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    g.elementDblClick({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pos: [s(u(e, t)) + s.rangeBand() * (e.series + .5) / i.length, o(a(e, t))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                });
                _.append("rect").attr("height", 0).attr("width", s.rangeBand() * .9 / i.length),
                c ? (_.append("text").attr("text-anchor", "middle"),
                M.select("text").text(function(e, t) {
                    return h(a(e, t))
                }).watchTransition(S, "discreteBar: bars text").attr("x", s.rangeBand() * .9 / 2).attr("y", function(e, t) {
                    return a(e, t) < 0 ? o(a(e, t)) - o(0) + 12 : -4
                })) : M.selectAll("text").remove(),
                M.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).style("fill", function(e, t) {
                    return e.color || l(e, t)
                }).style("stroke", function(e, t) {
                    return e.color || l(e, t)
                }).select("rect").attr("class", y).watchTransition(S, "discreteBar: bars rect").attr("width", s.rangeBand() * .9 / i.length),
                M.watchTransition(S, "discreteBar: bars").attr("transform", function(e, t) {
                    var n = s(u(e, t)) + s.rangeBand() * .05
                      , r = a(e, t) < 0 ? o(0) : o(0) - o(a(e, t)) < 1 ? o(0) - 1 : o(a(e, t));
                    return "translate(" + n + ", " + r + ")"
                }).select("rect").attr("height", function(e, t) {
                    return Math.max(Math.abs(o(a(e, t)) - o(d && d[0] || 0)) || 1)
                }),
                w = s.copy(),
                E = o.copy()
            }),
            S.renderEnd("discreteBar immediate"),
            x
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = Math.floor(Math.random() * 1e4), s = d3.scale.ordinal(), o = d3.scale.linear(), u = function(e) {
            return e.x
        }, a = function(e) {
            return e.y
        }, f = [0], l = e.utils.defaultColor(), c = !1, h = d3.format(",.2f"), p, d, v, m, g = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "renderEnd"), y = "discreteBar", b = 250, w, E, S = e.utils.renderWatch(g, b);
        return x.dispatch = g,
        x.options = e.utils.optionsFunc.bind(x),
        x._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            forceY: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            showValues: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            x: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            y: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            xScale: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            yScale: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            xDomain: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            yDomain: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            xRange: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            yRange: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            valueFormat: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            id: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            rectClass: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return l
                },
                set: function(t) {
                    l = e.utils.getColor(t)
                }
            },
            duration: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e,
                    S.reset(b)
                }
            }
        }),
        e.utils.initOptions(x),
        x
    }
    ,
    e.models.discreteBarChart = function() {
        "use strict";
        function E(u) {
            return w.reset(),
            w.models(t),
            a && w.models(n),
            f && w.models(r),
            u.each(function(u) {
                var p = d3.select(this)
                  , w = this;
                e.utils.initSVG(p);
                var S = (s || parseInt(p.style("width")) || 960) - i.left - i.right
                  , T = (o || parseInt(p.style("height")) || 400) - i.top - i.bottom;
                E.update = function() {
                    g.beforeUpdate(),
                    p.transition().duration(y).call(E)
                }
                ,
                E.container = this;
                if (!u || !u.length || !u.filter(function(e) {
                    return e.values.length
                }).length) {
                    var N = p.selectAll(".nv-noData").data([m]);
                    return N.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    N.attr("x", i.left + S / 2).attr("y", i.top + T / 2).text(function(e) {
                        return e
                    }),
                    E
                }
                p.selectAll(".nv-noData").remove(),
                d = t.xScale(),
                v = t.yScale().clamp(!0);
                var C = p.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([u])
                  , k = C.enter().append("g").attr("class", "nvd3 nv-wrap nv-discreteBarWithAxes").append("g")
                  , L = k.append("defs")
                  , A = C.select("g");
                k.append("g").attr("class", "nv-x nv-axis"),
                k.append("g").attr("class", "nv-y nv-axis").append("g").attr("class", "nv-zeroLine").append("line"),
                k.append("g").attr("class", "nv-barsWrap"),
                A.attr("transform", "translate(" + i.left + "," + i.top + ")"),
                l && A.select(".nv-y.nv-axis").attr("transform", "translate(" + S + ",0)"),
                t.width(S).height(T);
                var O = A.select(".nv-barsWrap").datum(u.filter(function(e) {
                    return !e.disabled
                }));
                O.transition().call(t),
                L.append("clipPath").attr("id", "nv-x-label-clip-" + t.id()).append("rect"),
                A.select("#nv-x-label-clip-" + t.id() + " rect").attr("width", d.rangeBand() * (c ? 2 : 1)).attr("height", 16).attr("x", -d.rangeBand() / (c ? 1 : 2));
                if (a) {
                    n.scale(d).ticks(e.utils.calcTicksX(S / 100, u)).tickSize(-T, 0),
                    A.select(".nv-x.nv-axis").attr("transform", "translate(0," + (v.range()[0] + (t.showValues() && v.domain()[0] < 0 ? 16 : 0)) + ")"),
                    A.select(".nv-x.nv-axis").call(n);
                    var M = A.select(".nv-x.nv-axis").selectAll("g");
                    c && M.selectAll("text").attr("transform", function(e, t, n) {
                        return "translate(0," + (n % 2 == 0 ? "5" : "17") + ")"
                    })
                }
                f && (r.scale(v).ticks(e.utils.calcTicksY(T / 36, u)).tickSize(-S, 0),
                A.select(".nv-y.nv-axis").call(r)),
                A.select(".nv-zeroLine line").attr("x1", 0).attr("x2", S).attr("y1", v(0)).attr("y2", v(0)),
                g.on("tooltipShow", function(e) {
                    h && b(e, w.parentNode)
                })
            }),
            w.renderEnd("discreteBar chart immediate"),
            E
        }
        var t = e.models.discreteBar(), n = e.models.axis(), r = e.models.axis(), i = {
            top: 15,
            right: 10,
            bottom: 50,
            left: 60
        }, s = null, o = null, u = e.utils.getColor(), a = !0, f = !0, l = !1, c = !1, h = !0, p = function(e, t, n, r, i) {
            return "<h3>" + t + "</h3>" + "<p>" + n + "</p>"
        }, d, v, m = "No Data Available.", g = d3.dispatch("tooltipShow", "tooltipHide", "beforeUpdate", "renderEnd"), y = 250;
        n.orient("bottom").highlightZero(!1).showMaxMin(!1).tickFormat(function(e) {
            return e
        }),
        r.orient(l ? "right" : "left").tickFormat(d3.format(",.1f"));
        var b = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , u = i.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , f = r.tickFormat()(t.y()(i.point, i.pointIndex))
              , l = p(i.series.key, a, f, i, E);
            e.tooltip.show([o, u], l, i.value < 0 ? "n" : "s", null, s)
        }
          , w = e.utils.renderWatch(g, y);
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + i.left, e.pos[1] + i.top],
            g.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            g.tooltipHide(e)
        }),
        g.on("tooltipHide", function() {
            h && e.tooltip.cleanup()
        }),
        E.dispatch = g,
        E.discretebar = t,
        E.xAxis = n,
        E.yAxis = r,
        E.options = e.utils.optionsFunc.bind(E),
        E._options = Object.create({}, {
            width: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            height: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            staggerLabels: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            showXAxis: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            showYAxis: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            tooltips: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            tooltipContent: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            noData: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            margin: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i.top = e.top !== undefined ? e.top : i.top,
                    i.right = e.right !== undefined ? e.right : i.right,
                    i.bottom = e.bottom !== undefined ? e.bottom : i.bottom,
                    i.left = e.left !== undefined ? e.left : i.left
                }
            },
            duration: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e,
                    w.reset(y),
                    t.duration(y),
                    n.duration(y),
                    r.duration(y)
                }
            },
            color: {
                get: function() {
                    return u
                },
                set: function(n) {
                    u = e.utils.getColor(n),
                    t.color(u)
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e,
                    r.orient(e ? "right" : "left")
                }
            }
        }),
        e.utils.inheritOptions(E, t),
        e.utils.initOptions(E),
        E
    }
    ,
    e.models.distribution = function() {
        "use strict";
        function p(a) {
            return h.reset(),
            a.each(function(a) {
                var f = n - (i === "x" ? t.left + t.right : t.top + t.bottom)
                  , l = i == "x" ? "y" : "x"
                  , p = d3.select(this);
                e.utils.initSVG(p),
                c = c || u;
                var d = p.selectAll("g.nv-distribution").data([a])
                  , v = d.enter().append("g").attr("class", "nvd3 nv-distribution")
                  , m = v.append("g")
                  , g = d.select("g");
                d.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var y = g.selectAll("g.nv-dist").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                y.enter().append("g"),
                y.attr("class", function(e, t) {
                    return "nv-dist nv-series-" + t
                }).style("stroke", function(e, t) {
                    return o(e, t)
                });
                var b = y.selectAll("line.nv-dist" + i).data(function(e) {
                    return e.values
                });
                b.enter().append("line").attr(i + "1", function(e, t) {
                    return c(s(e, t))
                }).attr(i + "2", function(e, t) {
                    return c(s(e, t))
                }),
                h.transition(y.exit().selectAll("line.nv-dist" + i), "dist exit").attr(i + "1", function(e, t) {
                    return u(s(e, t))
                }).attr(i + "2", function(e, t) {
                    return u(s(e, t))
                }).style("stroke-opacity", 0).remove(),
                b.attr("class", function(e, t) {
                    return "nv-dist" + i + " nv-dist" + i + "-" + t
                }).attr(l + "1", 0).attr(l + "2", r),
                h.transition(b, "dist").attr(i + "1", function(e, t) {
                    return u(s(e, t))
                }).attr(i + "2", function(e, t) {
                    return u(s(e, t))
                }),
                c = u.copy()
            }),
            h.renderEnd("distribution immediate"),
            p
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 400, r = 8, i = "x", s = function(e) {
            return e[i]
        }, o = e.utils.defaultColor(), u = d3.scale.linear(), a, f = 250, l = d3.dispatch("renderEnd"), c, h = e.utils.renderWatch(l, f);
        return p.options = e.utils.optionsFunc.bind(p),
        p.dispatch = l,
        p.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top,
            t.right = typeof e.right != "undefined" ? e.right : t.right,
            t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom,
            t.left = typeof e.left != "undefined" ? e.left : t.left,
            p) : t
        }
        ,
        p.width = function(e) {
            return arguments.length ? (n = e,
            p) : n
        }
        ,
        p.axis = function(e) {
            return arguments.length ? (i = e,
            p) : i
        }
        ,
        p.size = function(e) {
            return arguments.length ? (r = e,
            p) : r
        }
        ,
        p.getData = function(e) {
            return arguments.length ? (s = d3.functor(e),
            p) : s
        }
        ,
        p.scale = function(e) {
            return arguments.length ? (u = e,
            p) : u
        }
        ,
        p.color = function(t) {
            return arguments.length ? (o = e.utils.getColor(t),
            p) : o
        }
        ,
        p.duration = function(e) {
            return arguments.length ? (f = e,
            h.reset(f),
            p) : f
        }
        ,
        p
    }
    ,
    e.models.historicalBar = function() {
        "use strict";
        function E(S) {
            return S.each(function(E) {
                w.reset();
                var S = d3.select(this)
                  , T = (n || parseInt(S.style("width")) || 960) - t.left - t.right
                  , N = (r || parseInt(S.style("height")) || 400) - t.top - t.bottom;
                e.utils.initSVG(S),
                s.domain(d || d3.extent(E[0].values.map(u).concat(f))),
                c ? s.range(m || [T * .5 / E[0].values.length, T * (E[0].values.length - .5) / E[0].values.length]) : s.range(m || [0, T]),
                o.domain(v || d3.extent(E[0].values.map(a).concat(l))).range(g || [N, 0]),
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] - s.domain()[0] * .01, s.domain()[1] + s.domain()[1] * .01]) : s.domain([-1, 1])),
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([o.domain()[0] + o.domain()[0] * .01, o.domain()[1] - o.domain()[1] * .01]) : o.domain([-1, 1]));
                var C = S.selectAll("g.nv-wrap.nv-historicalBar-" + i).data([E[0].values])
                  , k = C.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBar-" + i)
                  , L = k.append("defs")
                  , A = k.append("g")
                  , O = C.select("g");
                A.append("g").attr("class", "nv-bars"),
                C.attr("transform", "translate(" + t.left + "," + t.top + ")"),
                S.on("click", function(e, t) {
                    y.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: i
                    })
                }),
                L.append("clipPath").attr("id", "nv-chart-clip-path-" + i).append("rect"),
                C.select("#nv-chart-clip-path-" + i + " rect").attr("width", T).attr("height", N),
                O.attr("clip-path", h ? "url(#nv-chart-clip-path-" + i + ")" : "");
                var M = C.select(".nv-bars").selectAll(".nv-bar").data(function(e) {
                    return e
                }, function(e, t) {
                    return u(e, t)
                });
                M.exit().remove();
                var _ = M.enter().append("rect").attr("x", 0).attr("y", function(t, n) {
                    return e.utils.NaNtoZero(o(Math.max(0, a(t, n))))
                }).attr("height", function(t, n) {
                    return e.utils.NaNtoZero(Math.abs(o(a(t, n)) - o(0)))
                }).attr("transform", function(e, t) {
                    return "translate(" + (s(u(e, t)) - T / E[0].values.length * .45) + ",0)"
                }).on("mouseover", function(e, t) {
                    if (!b)
                        return;
                    d3.select(this).classed("hover", !0),
                    y.elementMouseover({
                        point: e,
                        series: E[0],
                        pos: [s(u(e, t)), o(a(e, t))],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    if (!b)
                        return;
                    d3.select(this).classed("hover", !1),
                    y.elementMouseout({
                        point: e,
                        series: E[0],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    if (!b)
                        return;
                    y.elementClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [s(u(e, t)), o(a(e, t))],
                        e: d3.event,
                        id: i
                    }),
                    d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    if (!b)
                        return;
                    y.elementDblClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [s(u(e, t)), o(a(e, t))],
                        e: d3.event,
                        id: i
                    }),
                    d3.event.stopPropagation()
                });
                M.attr("fill", function(e, t) {
                    return p(e, t)
                }).attr("class", function(e, t, n) {
                    return (a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive") + " nv-bar-" + n + "-" + t
                }).watchTransition(w, "bars").attr("transform", function(e, t) {
                    return "translate(" + (s(u(e, t)) - T / E[0].values.length * .45) + ",0)"
                }).attr("width", T / E[0].values.length * .9),
                M.watchTransition(w, "bars").attr("y", function(t, n) {
                    var r = a(t, n) < 0 ? o(0) : o(0) - o(a(t, n)) < 1 ? o(0) - 1 : o(a(t, n));
                    return e.utils.NaNtoZero(r)
                }).attr("height", function(t, n) {
                    return e.utils.NaNtoZero(Math.max(Math.abs(o(a(t, n)) - o(0)), 1))
                })
            }),
            w.renderEnd("historicalBar immediate"),
            E
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = null, r = null, i = Math.floor(Math.random() * 1e4), s = d3.scale.linear(), o = d3.scale.linear(), u = function(e) {
            return e.x
        }, a = function(e) {
            return e.y
        }, f = [], l = [0], c = !1, h = !0, p = e.utils.defaultColor(), d, v, m, g, y = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "renderEnd"), b = !0, w = e.utils.renderWatch(y, 0);
        return E.highlightPoint = function(e, t) {
            d3.select(".nv-historicalBar-" + i).select(".nv-bars .nv-bar-0-" + e).classed("hover", t)
        }
        ,
        E.clearHighlights = function() {
            d3.select(".nv-historicalBar-" + i).select(".nv-bars .nv-bar.hover").classed("hover", !1)
        }
        ,
        E.dispatch = y,
        E.options = e.utils.optionsFunc.bind(E),
        E._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            forceX: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            forceY: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            padData: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            x: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            y: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            xScale: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            yScale: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            xDomain: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            yDomain: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            xRange: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            yRange: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            clipEdge: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            id: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            interactive: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return p
                },
                set: function(t) {
                    p = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(E),
        E
    }
    ,
    e.models.historicalBarChart = function(t) {
        "use strict";
        function k(t) {
            return t.each(function(g) {
                C.reset(),
                C.models(n),
                h && C.models(r),
                p && C.models(i);
                var L = d3.select(this)
                  , A = this;
                e.utils.initSVG(L);
                var O = (f || parseInt(L.style("width")) || 960) - u.left - u.right
                  , M = (l || parseInt(L.style("height")) || 400) - u.top - u.bottom;
                k.update = function() {
                    L.transition().duration(T).call(k)
                }
                ,
                k.container = this,
                w.disabled = g.map(function(e) {
                    return !!e.disabled
                });
                if (!E) {
                    var _;
                    E = {};
                    for (_ in w)
                        w[_]instanceof Array ? E[_] = w[_].slice(0) : E[_] = w[_]
                }
                if (!g || !g.length || !g.filter(function(e) {
                    return e.values.length
                }).length) {
                    var D = L.selectAll(".nv-noData").data([S]);
                    return D.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    D.attr("x", u.left + O / 2).attr("y", u.top + M / 2).text(function(e) {
                        return e
                    }),
                    k
                }
                L.selectAll(".nv-noData").remove(),
                y = n.xScale(),
                b = n.yScale();
                var P = L.selectAll("g.nv-wrap.nv-historicalBarChart").data([g])
                  , H = P.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBarChart").append("g")
                  , B = P.select("g");
                H.append("g").attr("class", "nv-x nv-axis"),
                H.append("g").attr("class", "nv-y nv-axis"),
                H.append("g").attr("class", "nv-barsWrap"),
                H.append("g").attr("class", "nv-legendWrap"),
                H.append("g").attr("class", "nv-interactive"),
                c && (s.width(O),
                B.select(".nv-legendWrap").datum(g).call(s),
                u.top != s.height() && (u.top = s.height(),
                M = (l || parseInt(L.style("height")) || 400) - u.top - u.bottom),
                P.select(".nv-legendWrap").attr("transform", "translate(0," + -u.top + ")")),
                P.attr("transform", "translate(" + u.left + "," + u.top + ")"),
                d && B.select(".nv-y.nv-axis").attr("transform", "translate(" + O + ",0)"),
                v && (o.width(O).height(M).margin({
                    left: u.left,
                    top: u.top
                }).svgContainer(L).xScale(y),
                P.select(".nv-interactive").call(o)),
                n.width(O).height(M).color(g.map(function(e, t) {
                    return e.color || a(e, t)
                }).filter(function(e, t) {
                    return !g[t].disabled
                }));
                var j = B.select(".nv-barsWrap").datum(g.filter(function(e) {
                    return !e.disabled
                }));
                j.transition().call(n),
                h && (r.scale(y).tickSize(-M, 0),
                B.select(".nv-x.nv-axis").attr("transform", "translate(0," + b.range()[0] + ")"),
                B.select(".nv-x.nv-axis").transition().call(r)),
                p && (i.scale(b).ticks(e.utils.calcTicksY(M / 36, g)).tickSize(-O, 0),
                B.select(".nv-y.nv-axis").transition().call(i)),
                o.dispatch.on("elementMousemove", function(t) {
                    n.clearHighlights();
                    var s, f, l, c = [];
                    g.filter(function(e, t) {
                        return e.seriesIndex = t,
                        !e.disabled
                    }).forEach(function(r, i) {
                        f = e.interactiveBisect(r.values, t.pointXValue, k.x()),
                        n.highlightPoint(f, !0);
                        var o = r.values[f];
                        if (typeof o == "undefined")
                            return;
                        typeof s == "undefined" && (s = o),
                        typeof l == "undefined" && (l = k.xScale()(k.x()(o, f))),
                        c.push({
                            key: r.key,
                            value: k.y()(o, f),
                            color: a(r, r.seriesIndex),
                            data: r.values[f]
                        })
                    });
                    var h = r.tickFormat()(k.x()(s, f));
                    o.tooltip.position({
                        left: l + u.left,
                        top: t.mouseY + u.top
                    }).chartContainer(A.parentNode).enabled(m).valueFormatter(function(e, t) {
                        return i.tickFormat()(e)
                    }).data({
                        value: h,
                        series: c
                    })(),
                    o.renderGuideLine(l)
                }),
                o.dispatch.on("elementMouseout", function(e) {
                    x.tooltipHide(),
                    n.clearHighlights()
                }),
                s.dispatch.on("legendClick", function(e, n) {
                    e.disabled = !e.disabled,
                    g.filter(function(e) {
                        return !e.disabled
                    }).length || g.map(function(e) {
                        return e.disabled = !1,
                        P.selectAll(".nv-series").classed("disabled", !1),
                        e
                    }),
                    w.disabled = g.map(function(e) {
                        return !!e.disabled
                    }),
                    x.stateChange(w),
                    t.transition().call(k)
                }),
                s.dispatch.on("legendDblclick", function(e) {
                    g.forEach(function(e) {
                        e.disabled = !0
                    }),
                    e.disabled = !1,
                    w.disabled = g.map(function(e) {
                        return !!e.disabled
                    }),
                    x.stateChange(w),
                    k.update()
                }),
                x.on("tooltipShow", function(e) {
                    m && N(e, A.parentNode)
                }),
                x.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (g.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    w.disabled = e.disabled),
                    k.update()
                })
            }),
            C.renderEnd("historicalBarChart immediate"),
            k
        }
        var n = t || e.models.historicalBar(), r = e.models.axis(), i = e.models.axis(), s = e.models.legend(), o = e.interactiveGuideline(), u = {
            top: 30,
            right: 90,
            bottom: 50,
            left: 90
        }, a = e.utils.defaultColor(), f = null, l = null, c = !1, h = !0, p = !0, d = !1, v = !1, m = !0, g = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, y, b, w = {}, E = null, S = "No Data Available.", x = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd"), T = 250;
        r.orient("bottom").tickPadding(7),
        i.orient(d ? "right" : "left");
        var N = function(t, s) {
            if (s) {
                var o = d3.select(s).select("svg")
                  , u = o.node() ? o.attr("viewBox") : null;
                if (u) {
                    u = u.split(" ");
                    var a = parseInt(o.style("width")) / u[2];
                    t.pos[0] = t.pos[0] * a,
                    t.pos[1] = t.pos[1] * a
                }
            }
            var f = t.pos[0] + (s.offsetLeft || 0)
              , l = t.pos[1] + (s.offsetTop || 0)
              , c = r.tickFormat()(n.x()(t.point, t.pointIndex))
              , h = i.tickFormat()(n.y()(t.point, t.pointIndex))
              , p = g(t.series.key, c, h, t, k);
            e.tooltip.show([f, l], p, null, null, s)
        }
          , C = e.utils.renderWatch(x, 0);
        return n.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top],
            x.tooltipShow(e)
        }),
        n.dispatch.on("elementMouseout.tooltip", function(e) {
            x.tooltipHide(e)
        }),
        x.on("tooltipHide", function() {
            m && e.tooltip.cleanup()
        }),
        k.dispatch = x,
        k.bars = n,
        k.legend = s,
        k.xAxis = r,
        k.yAxis = i,
        k.interactiveLayer = o,
        k.options = e.utils.optionsFunc.bind(k),
        k._options = Object.create({}, {
            width: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            height: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            showLegend: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            showXAxis: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            showYAxis: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            tooltips: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            tooltipContent: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            defaultState: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            noData: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            margin: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u.top = e.top !== undefined ? e.top : u.top,
                    u.right = e.right !== undefined ? e.right : u.right,
                    u.bottom = e.bottom !== undefined ? e.bottom : u.bottom,
                    u.left = e.left !== undefined ? e.left : u.left
                }
            },
            color: {
                get: function() {
                    return a
                },
                set: function(t) {
                    a = e.utils.getColor(t),
                    s.color(a),
                    n.color(a)
                }
            },
            duration: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e,
                    C.reset(T),
                    i.duration(T),
                    r.duration(T)
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e,
                    i.orient(e ? "right" : "left")
                }
            },
            useInteractiveGuideline: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e,
                    e === !0 && k.interactive(!1)
                }
            }
        }),
        e.utils.inheritOptions(k, n),
        e.utils.initOptions(k),
        k
    }
    ,
    e.models.ohlcBarChart = function() {
        var t = e.models.historicalBarChart(e.models.ohlcBar());
        return t.useInteractiveGuideline(!0),
        t.interactiveLayer.tooltip.contentGenerator(function(e) {
            var n = e.series[0].data
              , r = n.open < n.close ? "2ca02c" : "d62728";
            return '<h3 style="color: #' + r + '">' + e.value + "</h3>" + "<table>" + "<tr><td>open:</td><td>" + t.yAxis.tickFormat()(n.open) + "</td></tr>" + "<tr><td>close:</td><td>" + t.yAxis.tickFormat()(n.close) + "</td></tr>" + "<tr><td>high</td><td>" + t.yAxis.tickFormat()(n.high) + "</td></tr>" + "<tr><td>low:</td><td>" + t.yAxis.tickFormat()(n.low) + "</td></tr>" + "</table>"
        }),
        t
    }
    ,
    e.models.legend = function() {
        "use strict";
        function c(h) {
            return h.each(function(c) {
                var h = n - t.left - t.right
                  , p = d3.select(this);
                e.utils.initSVG(p);
                var d = p.selectAll("g.nv-legend").data([c])
                  , v = d.enter().append("g").attr("class", "nvd3 nv-legend").append("g")
                  , m = d.select("g");
                d.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var g = m.selectAll(".nv-series").data(function(e) {
                    return e
                })
                  , y = g.enter().append("g").attr("class", "nv-series").on("mouseover", function(e, t) {
                    l.legendMouseover(e, t)
                }).on("mouseout", function(e, t) {
                    l.legendMouseout(e, t)
                }).on("click", function(e, t) {
                    l.legendClick(e, t),
                    a && (f ? (c.forEach(function(e) {
                        e.disabled = !0
                    }),
                    e.disabled = !1) : (e.disabled = !e.disabled,
                    c.every(function(e) {
                        return e.disabled
                    }) && c.forEach(function(e) {
                        e.disabled = !1
                    })),
                    l.stateChange({
                        disabled: c.map(function(e) {
                            return !!e.disabled
                        })
                    }))
                }).on("dblclick", function(e, t) {
                    l.legendDblclick(e, t),
                    a && (c.forEach(function(e) {
                        e.disabled = !0
                    }),
                    e.disabled = !1,
                    l.stateChange({
                        disabled: c.map(function(e) {
                            return !!e.disabled
                        })
                    }))
                });
                y.append("circle").style("stroke-width", 2).attr("class", "nv-legend-symbol").attr("r", 5),
                y.append("text").attr("text-anchor", "start").attr("class", "nv-legend-text").attr("dy", ".32em").attr("dx", "8"),
                g.classed("nv-disabled", function(e) {
                    return e.disabled
                }),
                g.exit().remove(),
                g.select("circle").style("fill", function(e, t) {
                    return e.color || s(e, t)
                }).style("stroke", function(e, t) {
                    return e.color || s(e, t)
                }),
                g.select("text").text(i);
                if (o) {
                    var b = [];
                    g.each(function(t, n) {
                        var r = d3.select(this).select("text"), i;
                        try {
                            i = r.node().getComputedTextLength();
                            if (i <= 0)
                                throw Error()
                        } catch (s) {
                            i = e.utils.calcApproxTextWidth(r)
                        }
                        isNaN(i) || b.push(i + 28)
                    });
                    var w = 0
                      , E = 0
                      , S = [];
                    while (E < h && w < b.length)
                        S[w] = b[w],
                        E += b[w++];
                    w === 0 && (w = 1);
                    while (E > h && w > 1) {
                        S = [],
                        w--;
                        for (var x = 0; x < b.length; x++)
                            b[x] > (S[x % w] || 0) && (S[x % w] = b[x]);
                        E = S.reduce(function(e, t, n, r) {
                            return e + t
                        })
                    }
                    var T = [];
                    for (var N = 0, C = 0; N < w; N++)
                        T[N] = C,
                        C += S[N];
                    g.attr("transform", function(e, t) {
                        return "translate(" + T[t % w] + "," + (5 + Math.floor(t / w) * 20) + ")"
                    }),
                    u ? m.attr("transform", "translate(" + (n - t.right - E) + "," + t.top + ")") : m.attr("transform", "translate(0," + t.top + ")"),
                    r = t.top + t.bottom + Math.ceil(b.length / w) * 20
                } else {
                    var k = 5, L = 5, A = 0, O;
                    g.attr("transform", function(e, r) {
                        var i = d3.select(this).select("text").node().getComputedTextLength() + 28;
                        return O = L,
                        n < t.left + t.right + O + i && (L = O = 5,
                        k += 20),
                        L += i,
                        L > A && (A = L),
                        "translate(" + O + "," + k + ")"
                    }),
                    m.attr("transform", "translate(" + (n - t.right - A) + "," + t.top + ")"),
                    r = t.top + t.bottom + k + 15
                }
            }),
            c
        }
        var t = {
            top: 5,
            right: 0,
            bottom: 5,
            left: 0
        }
          , n = 400
          , r = 20
          , i = function(e) {
            return e.key
        }
          , s = e.utils.defaultColor()
          , o = !0
          , u = !0
          , a = !0
          , f = !1
          , l = d3.dispatch("legendClick", "legendDblclick", "legendMouseover", "legendMouseout", "stateChange");
        return c.dispatch = l,
        c.options = e.utils.optionsFunc.bind(c),
        c._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            key: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            align: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            rightAlign: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            updateState: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            radioButtonMode: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return s
                },
                set: function(t) {
                    s = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(c),
        c
    }
    ,
    e.models.line = function() {
        "use strict";
        function b(d) {
            return y.reset(),
            y.models(t),
            d.each(function(d) {
                var v = r - n.left - n.right
                  , b = i - n.top - n.bottom
                  , w = d3.select(this);
                e.utils.initSVG(w),
                c = t.xScale(),
                h = t.yScale(),
                m = m || c,
                g = g || h;
                var E = w.selectAll("g.nv-wrap.nv-line").data([d])
                  , S = E.enter().append("g").attr("class", "nvd3 nv-wrap nv-line")
                  , T = S.append("defs")
                  , N = S.append("g")
                  , C = E.select("g");
                N.append("g").attr("class", "nv-groups"),
                N.append("g").attr("class", "nv-scatterWrap"),
                E.attr("transform", "translate(" + n.left + "," + n.top + ")"),
                t.width(v).height(b);
                var k = E.select(".nv-scatterWrap");
                k.call(t),
                T.append("clipPath").attr("id", "nv-edge-clip-" + t.id()).append("rect"),
                E.select("#nv-edge-clip-" + t.id() + " rect").attr("width", v).attr("height", b > 0 ? b : 0),
                C.attr("clip-path", l ? "url(#nv-edge-clip-" + t.id() + ")" : ""),
                k.attr("clip-path", l ? "url(#nv-edge-clip-" + t.id() + ")" : "");
                var L = E.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                L.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6),
                L.exit().remove(),
                L.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }).style("fill", function(e, t) {
                    return s(e, t)
                }).style("stroke", function(e, t) {
                    return s(e, t)
                }),
                L.watchTransition(y, "line: groups").style("stroke-opacity", 1).style("fill-opacity", .5);
                var A = L.selectAll("path.nv-area").data(function(e) {
                    return f(e) ? [e] : []
                });
                A.enter().append("path").attr("class", "nv-area").attr("d", function(t) {
                    return d3.svg.area().interpolate(p).defined(a).x(function(t, n) {
                        return e.utils.NaNtoZero(m(o(t, n)))
                    }).y0(function(t, n) {
                        return e.utils.NaNtoZero(g(u(t, n)))
                    }).y1(function(e, t) {
                        return g(h.domain()[0] <= 0 ? h.domain()[1] >= 0 ? 0 : h.domain()[1] : h.domain()[0])
                    }).apply(this, [t.values])
                }),
                L.exit().selectAll("path.nv-area").remove(),
                A.watchTransition(y, "line: areaPaths").attr("d", function(t) {
                    return d3.svg.area().interpolate(p).defined(a).x(function(t, n) {
                        return e.utils.NaNtoZero(c(o(t, n)))
                    }).y0(function(t, n) {
                        return e.utils.NaNtoZero(h(u(t, n)))
                    }).y1(function(e, t) {
                        return h(h.domain()[0] <= 0 ? h.domain()[1] >= 0 ? 0 : h.domain()[1] : h.domain()[0])
                    }).apply(this, [t.values])
                });
                var O = L.selectAll("path.nv-line").data(function(e) {
                    return [e.values]
                });
                O.enter().append("path").attr("class", "nv-line").attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(m(o(t, n)))
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(g(u(t, n)))
                })),
                O.watchTransition(y, "line: linePaths").attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(c(o(t, n)))
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(h(u(t, n)))
                })),
                m = c.copy(),
                g = h.copy()
            }),
            y.renderEnd("line immediate"),
            b
        }
        var t = e.models.scatter(), n = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, r = 960, i = 500, s = e.utils.defaultColor(), o = function(e) {
            return e.x
        }, u = function(e) {
            return e.y
        }, a = function(e, t) {
            return !isNaN(u(e, t)) && u(e, t) !== null
        }, f = function(e) {
            return e.area
        }, l = !1, c, h, p = "linear", d = 250, v = d3.dispatch("elementClick", "elementMouseover", "elementMouseout", "renderEnd");
        t.pointSize(16).pointDomain([16, 256]);
        var m, g, y = e.utils.renderWatch(v, d);
        return b.dispatch = v,
        b.scatter = t,
        t.dispatch.on("elementClick", function() {
            v.elementClick.apply(this, arguments)
        }),
        t.dispatch.on("elementMouseover", function() {
            v.elementMouseover.apply(this, arguments)
        }),
        t.dispatch.on("elementMouseout", function() {
            v.elementMouseout.apply(this, arguments)
        }),
        b.options = e.utils.optionsFunc.bind(b),
        b._options = Object.create({}, {
            width: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            height: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            defined: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            interpolate: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            clipEdge: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            margin: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n.top = e.top !== undefined ? e.top : n.top,
                    n.right = e.right !== undefined ? e.right : n.right,
                    n.bottom = e.bottom !== undefined ? e.bottom : n.bottom,
                    n.left = e.left !== undefined ? e.left : n.left
                }
            },
            duration: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e,
                    y.reset(d),
                    t.duration(d)
                }
            },
            isArea: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = d3.functor(e)
                }
            },
            x: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e,
                    t.x(e)
                }
            },
            y: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e,
                    t.y(e)
                }
            },
            color: {
                get: function() {
                    return s
                },
                set: function(n) {
                    s = e.utils.getColor(n),
                    t.color(s)
                }
            }
        }),
        e.utils.inheritOptions(b, t),
        e.utils.initOptions(b),
        b
    }
    ,
    e.models.lineChart = function() {
        "use strict";
        function L(m) {
            return N.reset(),
            N.models(t),
            c && N.models(n),
            h && N.models(r),
            m.each(function(m) {
                var N = d3.select(this)
                  , A = this;
                e.utils.initSVG(N);
                var O = (a || parseInt(N.style("width")) || 960) - o.left - o.right
                  , M = (f || parseInt(N.style("height")) || 400) - o.top - o.bottom;
                L.update = function() {
                    x === 0 ? N.call(L) : N.transition().duration(x).call(L)
                }
                ,
                L.container = this,
                b.setter(k(m), L.update).getter(C(m)).update(),
                b.disabled = m.map(function(e) {
                    return !!e.disabled
                });
                if (!w) {
                    var _;
                    w = {};
                    for (_ in b)
                        b[_]instanceof Array ? w[_] = b[_].slice(0) : w[_] = b[_]
                }
                if (!m || !m.length || !m.filter(function(e) {
                    return e.values.length
                }).length) {
                    var D = N.selectAll(".nv-noData").data([E]);
                    return D.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    D.attr("x", o.left + O / 2).attr("y", o.top + M / 2).text(function(e) {
                        return e
                    }),
                    L
                }
                N.selectAll(".nv-noData").remove(),
                g = t.xScale(),
                y = t.yScale();
                var P = N.selectAll("g.nv-wrap.nv-lineChart").data([m])
                  , H = P.enter().append("g").attr("class", "nvd3 nv-wrap nv-lineChart").append("g")
                  , B = P.select("g");
                H.append("rect").style("opacity", 0),
                H.append("g").attr("class", "nv-x nv-axis"),
                H.append("g").attr("class", "nv-y nv-axis"),
                H.append("g").attr("class", "nv-linesWrap"),
                H.append("g").attr("class", "nv-legendWrap"),
                H.append("g").attr("class", "nv-interactive"),
                B.select("rect").attr("width", O).attr("height", M > 0 ? M : 0),
                l && (i.width(O),
                B.select(".nv-legendWrap").datum(m).call(i),
                o.top != i.height() && (o.top = i.height(),
                M = (f || parseInt(N.style("height")) || 400) - o.top - o.bottom),
                P.select(".nv-legendWrap").attr("transform", "translate(0," + -o.top + ")")),
                P.attr("transform", "translate(" + o.left + "," + o.top + ")"),
                p && B.select(".nv-y.nv-axis").attr("transform", "translate(" + O + ",0)"),
                d && (s.width(O).height(M).margin({
                    left: o.left,
                    top: o.top
                }).svgContainer(N).xScale(g),
                P.select(".nv-interactive").call(s)),
                t.width(O).height(M).color(m.map(function(e, t) {
                    return e.color || u(e, t)
                }).filter(function(e, t) {
                    return !m[t].disabled
                }));
                var j = B.select(".nv-linesWrap").datum(m.filter(function(e) {
                    return !e.disabled
                }));
                j.call(t),
                c && (n.scale(g).ticks(e.utils.calcTicksX(O / 100, m)).tickSize(-M, 0),
                B.select(".nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"),
                B.select(".nv-x.nv-axis").call(n)),
                h && (r.scale(y).ticks(e.utils.calcTicksY(M / 36, m)).tickSize(-O, 0),
                B.select(".nv-y.nv-axis").call(r)),
                i.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        b[t] = e[t];
                    S.stateChange(b),
                    L.update()
                }),
                s.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var a, f, l, c = [];
                    m.filter(function(e, t) {
                        return e.seriesIndex = t,
                        !e.disabled
                    }).forEach(function(n, r) {
                        f = e.interactiveBisect(n.values, i.pointXValue, L.x()),
                        t.highlightPoint(r, f, !0);
                        var s = n.values[f];
                        if (typeof s == "undefined")
                            return;
                        typeof a == "undefined" && (a = s),
                        typeof l == "undefined" && (l = L.xScale()(L.x()(s, f))),
                        c.push({
                            key: n.key,
                            value: L.y()(s, f),
                            color: u(n, n.seriesIndex)
                        })
                    });
                    if (c.length > 2) {
                        var h = L.yScale().invert(i.mouseY)
                          , p = Math.abs(L.yScale().domain()[0] - L.yScale().domain()[1])
                          , d = .03 * p
                          , g = e.nearestValueIndex(c.map(function(e) {
                            return e.value
                        }), h, d);
                        g !== null && (c[g].highlight = !0)
                    }
                    var y = n.tickFormat()(L.x()(a, f));
                    s.tooltip.position({
                        left: l + o.left,
                        top: i.mouseY + o.top
                    }).chartContainer(A.parentNode).enabled(v).valueFormatter(function(e, t) {
                        return r.tickFormat()(e)
                    }).data({
                        value: y,
                        series: c
                    })(),
                    s.renderGuideLine(l)
                }),
                s.dispatch.on("elementClick", function(n) {
                    var r, i = [];
                    m.filter(function(e, t) {
                        return e.seriesIndex = t,
                        !e.disabled
                    }).forEach(function(t) {
                        var s = e.interactiveBisect(t.values, n.pointXValue, L.x())
                          , o = t.values[s];
                        if (typeof o == "undefined")
                            return;
                        typeof r == "undefined" && (r = L.xScale()(L.x()(o, s)));
                        var u = L.yScale()(L.y()(o, s));
                        i.push({
                            point: o,
                            pointIndex: s,
                            pos: [r, u],
                            seriesIndex: t.seriesIndex,
                            series: t
                        })
                    }),
                    t.dispatch.elementClick(i)
                }),
                s.dispatch.on("elementMouseout", function(e) {
                    S.tooltipHide(),
                    t.clearHighlights()
                }),
                S.on("tooltipShow", function(e) {
                    v && T(e, A.parentNode)
                }),
                S.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && m.length === e.disabled.length && (m.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    b.disabled = e.disabled),
                    L.update()
                })
            }),
            N.renderEnd("lineChart immediate"),
            L
        }
        var t = e.models.line(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.interactiveGuideline(), o = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, u = e.utils.defaultColor(), a = null, f = null, l = !0, c = !0, h = !0, p = !1, d = !1, v = !0, m = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, g, y, b = e.utils.state(), w = null, E = "No Data Available.", S = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd"), x = 250;
        n.orient("bottom").tickPadding(7),
        r.orient(p ? "right" : "left");
        var T = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , u = i.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , f = r.tickFormat()(t.y()(i.point, i.pointIndex))
              , l = m(i.series.key, a, f, i, L);
            e.tooltip.show([o, u], l, null, null, s)
        }
          , N = e.utils.renderWatch(S, x)
          , C = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    })
                }
            }
        }
          , k = function(e) {
            return function(t) {
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            S.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e)
        }),
        S.on("tooltipHide", function() {
            v && e.tooltip.cleanup()
        }),
        L.dispatch = S,
        L.lines = t,
        L.legend = i,
        L.xAxis = n,
        L.yAxis = r,
        L.interactiveLayer = s,
        L.dispatch = S,
        L.options = e.utils.optionsFunc.bind(L),
        L._options = Object.create({}, {
            width: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            height: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            showLegend: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            showXAxis: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            showYAxis: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            tooltips: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            tooltipContent: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            defaultState: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            noData: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            margin: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o.top = e.top !== undefined ? e.top : o.top,
                    o.right = e.right !== undefined ? e.right : o.right,
                    o.bottom = e.bottom !== undefined ? e.bottom : o.bottom,
                    o.left = e.left !== undefined ? e.left : o.left
                }
            },
            duration: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e,
                    N.reset(x),
                    t.duration(x),
                    n.duration(x),
                    r.duration(x)
                }
            },
            color: {
                get: function() {
                    return u
                },
                set: function(n) {
                    u = e.utils.getColor(n),
                    i.color(u),
                    t.color(u)
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e,
                    r.orient(p ? "right" : "left")
                }
            },
            useInteractiveGuideline: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e,
                    d && (t.interactive(!1),
                    t.useVoronoi(!1))
                }
            }
        }),
        e.utils.inheritOptions(L, t),
        e.utils.initOptions(L),
        L
    }
    ,
    e.models.linePlusBarChart = function() {
        "use strict";
        function X(L) {
            return L.each(function(L) {
                function pt(e) {
                    var t = +(e == "e")
                      , n = t ? 1 : -1
                      , r = Q / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + t + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + t + " " + .5 * n + "," + 2 * r + "Z" + "M" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8)
                }
                function dt() {
                    h.empty() || h.extent(C),
                    lt.data([h.empty() ? O.domain() : C]).each(function(e, t) {
                        var n = O(e[0]) - O.range()[0]
                          , r = O.range()[1] - O(e[1]);
                        d3.select(this).select(".left").attr("width", n < 0 ? 0 : n),
                        d3.select(this).select(".right").attr("x", O(e[1])).attr("width", r < 0 ? 0 : r)
                    })
                }
                function vt() {
                    C = h.empty() ? null : h.extent(),
                    N = h.empty() ? O.domain() : h.extent(),
                    B.brush({
                        extent: N,
                        brush: h
                    }),
                    dt(),
                    r.width(J).height(K).color(L.map(function(e, t) {
                        return e.color || b(e, t)
                    }).filter(function(e, t) {
                        return !L[t].disabled && L[t].bar
                    })),
                    t.width(J).height(K).color(L.map(function(e, t) {
                        return e.color || b(e, t)
                    }).filter(function(e, t) {
                        return !L[t].disabled && !L[t].bar
                    }));
                    var n = st.select(".nv-focus .nv-barsWrap").datum(Z.length ? Z.map(function(e, t) {
                        return {
                            key: e.key,
                            values: e.values.filter(function(e, t) {
                                return r.x()(e, t) >= N[0] && r.x()(e, t) <= N[1]
                            })
                        }
                    }) : [{
                        values: []
                    }])
                      , i = st.select(".nv-focus .nv-linesWrap").datum(et[0].disabled ? [{
                        values: []
                    }] : et.map(function(e, n) {
                        return {
                            key: e.key,
                            values: e.values.filter(function(e, n) {
                                return t.x()(e, n) >= N[0] && t.x()(e, n) <= N[1]
                            })
                        }
                    }));
                    Z.length ? A = r.xScale() : A = t.xScale(),
                    s.scale(A).ticks(e.utils.calcTicksX(J / 100, L)).tickSize(-K, 0),
                    s.domain([Math.ceil(N[0]), Math.floor(N[1])]),
                    st.select(".nv-x.nv-axis").transition().duration(j).call(s),
                    n.transition().duration(j).call(r),
                    i.transition().duration(j).call(t),
                    st.select(".nv-focus .nv-x.nv-axis").attr("transform", "translate(0," + M.range()[0] + ")"),
                    u.scale(M).ticks(e.utils.calcTicksY(K / 36, L)).tickSize(-J, 0),
                    a.scale(_).ticks(e.utils.calcTicksY(K / 36, L)).tickSize(Z.length ? 0 : -J, 0),
                    st.select(".nv-focus .nv-y1.nv-axis").style("opacity", Z.length ? 1 : 0),
                    st.select(".nv-focus .nv-y2.nv-axis").style("opacity", et.length && !et[0].disabled ? 1 : 0).attr("transform", "translate(" + A.range()[1] + ",0)"),
                    st.select(".nv-focus .nv-y1.nv-axis").transition().duration(j).call(u),
                    st.select(".nv-focus .nv-y2.nv-axis").transition().duration(j).call(a)
                }
                var V = d3.select(this)
                  , $ = this;
                e.utils.initSVG(V);
                var J = (v || parseInt(V.style("width")) || 960) - p.left - p.right
                  , K = (m || parseInt(V.style("height")) || 400) - p.top - p.bottom - (E ? T : 0)
                  , Q = T - d.top - d.bottom;
                X.update = function() {
                    V.transition().duration(j).call(X)
                }
                ,
                X.container = this,
                F.setter(W(L), X.update).getter(z(L)).update(),
                F.disabled = L.map(function(e) {
                    return !!e.disabled
                });
                if (!I) {
                    var G;
                    I = {};
                    for (G in F)
                        F[G]instanceof Array ? I[G] = F[G].slice(0) : I[G] = F[G]
                }
                if (!L || !L.length || !L.filter(function(e) {
                    return e.values.length
                }).length) {
                    var Y = V.selectAll(".nv-noData").data([H]);
                    return Y.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    Y.attr("x", p.left + J / 2).attr("y", p.top + K / 2).text(function(e) {
                        return e
                    }),
                    X
                }
                V.selectAll(".nv-noData").remove();
                var Z = L.filter(function(e) {
                    return !e.disabled && e.bar
                })
                  , et = L.filter(function(e) {
                    return !e.bar
                });
                A = r.xScale(),
                O = o.scale(),
                M = r.yScale(),
                _ = t.yScale(),
                D = i.yScale(),
                P = n.yScale();
                var tt = L.filter(function(e) {
                    return !e.disabled && e.bar
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: g(e, t),
                            y: y(e, t)
                        }
                    })
                })
                  , nt = L.filter(function(e) {
                    return !e.disabled && !e.bar
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: g(e, t),
                            y: y(e, t)
                        }
                    })
                });
                A.range([0, J]),
                O.domain(d3.extent(d3.merge(tt.concat(nt)), function(e) {
                    return e.x
                })).range([0, J]);
                var rt = V.selectAll("g.nv-wrap.nv-linePlusBar").data([L])
                  , it = rt.enter().append("g").attr("class", "nvd3 nv-wrap nv-linePlusBar").append("g")
                  , st = rt.select("g");
                it.append("g").attr("class", "nv-legendWrap");
                var ot = it.append("g").attr("class", "nv-focus");
                ot.append("g").attr("class", "nv-x nv-axis"),
                ot.append("g").attr("class", "nv-y1 nv-axis"),
                ot.append("g").attr("class", "nv-y2 nv-axis"),
                ot.append("g").attr("class", "nv-barsWrap"),
                ot.append("g").attr("class", "nv-linesWrap");
                var ut = it.append("g").attr("class", "nv-context");
                ut.append("g").attr("class", "nv-x nv-axis"),
                ut.append("g").attr("class", "nv-y1 nv-axis"),
                ut.append("g").attr("class", "nv-y2 nv-axis"),
                ut.append("g").attr("class", "nv-barsWrap"),
                ut.append("g").attr("class", "nv-linesWrap"),
                ut.append("g").attr("class", "nv-brushBackground"),
                ut.append("g").attr("class", "nv-x nv-brush"),
                w && (c.width(J / 2),
                st.select(".nv-legendWrap").datum(L.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey,
                    e.key = e.originalKey + (e.bar ? q : R),
                    e
                })).call(c),
                p.top != c.height() && (p.top = c.height(),
                K = (m || parseInt(V.style("height")) || 400) - p.top - p.bottom - T),
                st.select(".nv-legendWrap").attr("transform", "translate(" + J / 2 + "," + -p.top + ")")),
                rt.attr("transform", "translate(" + p.left + "," + p.top + ")"),
                st.select(".nv-context").style("display", E ? "initial" : "none"),
                i.width(J).height(Q).color(L.map(function(e, t) {
                    return e.color || b(e, t)
                }).filter(function(e, t) {
                    return !L[t].disabled && L[t].bar
                })),
                n.width(J).height(Q).color(L.map(function(e, t) {
                    return e.color || b(e, t)
                }).filter(function(e, t) {
                    return !L[t].disabled && !L[t].bar
                }));
                var at = st.select(".nv-context .nv-barsWrap").datum(Z.length ? Z : [{
                    values: []
                }])
                  , ft = st.select(".nv-context .nv-linesWrap").datum(et[0].disabled ? [{
                    values: []
                }] : et);
                st.select(".nv-context").attr("transform", "translate(0," + (K + p.bottom + d.top) + ")"),
                at.transition().call(i),
                ft.transition().call(n),
                x && (o.ticks(e.utils.calcTicksX(J / 100, L)).tickSize(-Q, 0),
                st.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + D.range()[0] + ")"),
                st.select(".nv-context .nv-x.nv-axis").transition().call(o)),
                S && (f.scale(D).ticks(Q / 36).tickSize(-J, 0),
                l.scale(P).ticks(Q / 36).tickSize(Z.length ? 0 : -J, 0),
                st.select(".nv-context .nv-y3.nv-axis").style("opacity", Z.length ? 1 : 0).attr("transform", "translate(0," + O.range()[0] + ")"),
                st.select(".nv-context .nv-y2.nv-axis").style("opacity", et.length ? 1 : 0).attr("transform", "translate(" + O.range()[1] + ",0)"),
                st.select(".nv-context .nv-y1.nv-axis").transition().call(f),
                st.select(".nv-context .nv-y2.nv-axis").transition().call(l)),
                h.x(O).on("brush", vt),
                C && h.extent(C);
                var lt = st.select(".nv-brushBackground").selectAll("g").data([C || h.extent()])
                  , ct = lt.enter().append("g");
                ct.append("rect").attr("class", "left").attr("x", 0).attr("y", 0).attr("height", Q),
                ct.append("rect").attr("class", "right").attr("x", 0).attr("y", 0).attr("height", Q);
                var ht = st.select(".nv-x.nv-brush").call(h);
                ht.selectAll("rect").attr("height", Q),
                ht.selectAll(".resize").append("path").attr("d", pt),
                c.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        F[t] = e[t];
                    B.stateChange(F),
                    X.update()
                }),
                B.on("tooltipShow", function(e) {
                    k && U(e, $.parentNode)
                }),
                B.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (L.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    F.disabled = e.disabled),
                    X.update()
                }),
                vt()
            }),
            X
        }
        var t = e.models.line(), n = e.models.line(), r = e.models.historicalBar(), i = e.models.historicalBar(), s = e.models.axis(), o = e.models.axis(), u = e.models.axis(), a = e.models.axis(), f = e.models.axis(), l = e.models.axis(), c = e.models.legend(), h = d3.svg.brush(), p = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60
        }, d = {
            top: 0,
            right: 30,
            bottom: 20,
            left: 60
        }, v = null, m = null, g = function(e) {
            return e.x
        }, y = function(e) {
            return e.y
        }, b = e.utils.defaultColor(), w = !0, E = !0, S = !1, x = !0, T = 50, N, C = null, k = !0, L = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, A, O, M, _, D, P, H = "No Data Available.", B = d3.dispatch("tooltipShow", "tooltipHide", "brush", "stateChange", "changeState"), j = 0, F = e.utils.state(), I = null, q = " (left axis)", R = " (right axis)";
        t.clipEdge(!0),
        n.interactive(!1),
        s.orient("bottom").tickPadding(5),
        u.orient("left"),
        a.orient("right"),
        o.orient("bottom").tickPadding(5),
        f.orient("left"),
        l.orient("right");
        var U = function(n, r) {
            N && (n.pointIndex += Math.ceil(N[0]));
            var i = n.pos[0] + (r.offsetLeft || 0)
              , o = n.pos[1] + (r.offsetTop || 0)
              , f = s.tickFormat()(t.x()(n.point, n.pointIndex))
              , l = (n.series.bar ? u : a).tickFormat()(t.y()(n.point, n.pointIndex))
              , c = L(n.series.key, f, l, n, X);
            e.tooltip.show([i, o], c, n.value < 0 ? "n" : "s", null, r)
        }
          , z = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    })
                }
            }
        }
          , W = function(e) {
            return function(t) {
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + p.left, e.pos[1] + p.top],
            B.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            B.tooltipHide(e)
        }),
        r.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + p.left, e.pos[1] + p.top],
            B.tooltipShow(e)
        }),
        r.dispatch.on("elementMouseout.tooltip", function(e) {
            B.tooltipHide(e)
        }),
        B.on("tooltipHide", function() {
            k && e.tooltip.cleanup()
        }),
        X.dispatch = B,
        X.legend = c,
        X.lines = t,
        X.lines2 = n,
        X.bars = r,
        X.bars2 = i,
        X.xAxis = s,
        X.x2Axis = o,
        X.y1Axis = u,
        X.y2Axis = a,
        X.y3Axis = f,
        X.y4Axis = l,
        X.options = e.utils.optionsFunc.bind(X),
        X._options = Object.create({}, {
            width: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            height: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            showLegend: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            tooltips: {
                get: function() {
                    return k
                },
                set: function(e) {
                    k = e
                }
            },
            tooltipContent: {
                get: function() {
                    return L
                },
                set: function(e) {
                    L = e
                }
            },
            brushExtent: {
                get: function() {
                    return C
                },
                set: function(e) {
                    C = e
                }
            },
            noData: {
                get: function() {
                    return H
                },
                set: function(e) {
                    H = e
                }
            },
            focusEnable: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            focusHeight: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            focusShowAxisX: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e
                }
            },
            focusShowAxisY: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            legendLeftAxisHint: {
                get: function() {
                    return q
                },
                set: function(e) {
                    q = e
                }
            },
            legendRightAxisHint: {
                get: function() {
                    return R
                },
                set: function(e) {
                    R = e
                }
            },
            margin: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p.top = e.top !== undefined ? e.top : p.top,
                    p.right = e.right !== undefined ? e.right : p.right,
                    p.bottom = e.bottom !== undefined ? e.bottom : p.bottom,
                    p.left = e.left !== undefined ? e.left : p.left
                }
            },
            duration: {
                get: function() {
                    return j
                },
                set: function(e) {
                    j = e
                }
            },
            color: {
                get: function() {
                    return b
                },
                set: function(t) {
                    b = e.utils.getColor(t),
                    c.color(b)
                }
            },
            x: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e,
                    t.x(e),
                    n.x(e),
                    r.x(e),
                    i.x(e)
                }
            },
            y: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e,
                    t.y(e),
                    n.y(e),
                    r.y(e),
                    i.y(e)
                }
            }
        }),
        e.utils.inheritOptions(X, t),
        e.utils.initOptions(X),
        X
    }
    ,
    e.models.lineWithFocusChart = function() {
        "use strict";
        function M(S) {
            return S.each(function(S) {
                function J(e) {
                    var t = +(e == "e")
                      , n = t ? 1 : -1
                      , r = B / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + t + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + t + " " + .5 * n + "," + 2 * r + "Z" + "M" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8)
                }
                function K() {
                    a.empty() || a.extent(w),
                    X.data([a.empty() ? g.domain() : w]).each(function(e, t) {
                        var n = g(e[0]) - v.range()[0]
                          , r = v.range()[1] - g(e[1]);
                        d3.select(this).select(".left").attr("width", n < 0 ? 0 : n),
                        d3.select(this).select(".right").attr("x", g(e[1])).attr("width", r < 0 ? 0 : r)
                    })
                }
                function Q() {
                    w = a.empty() ? null : a.extent();
                    var e = a.empty() ? g.domain() : a.extent();
                    if (Math.abs(e[0] - e[1]) <= 1)
                        return;
                    T.brush({
                        extent: e,
                        brush: a
                    }),
                    K();
                    var n = R.select(".nv-focus .nv-linesWrap").datum(S.filter(function(e) {
                        return !e.disabled
                    }).map(function(n, r) {
                        return {
                            key: n.key,
                            area: n.area,
                            values: n.values.filter(function(n, r) {
                                return t.x()(n, r) >= e[0] && t.x()(n, r) <= e[1]
                            })
                        }
                    }));
                    n.transition().duration(N).call(t),
                    R.select(".nv-focus .nv-x.nv-axis").transition().duration(N).call(r),
                    R.select(".nv-focus .nv-y.nv-axis").transition().duration(N).call(i)
                }
                var _ = d3.select(this)
                  , D = this;
                e.utils.initSVG(_);
                var P = (h || parseInt(_.style("width")) || 960) - f.left - f.right
                  , H = (p || parseInt(_.style("height")) || 400) - f.top - f.bottom - d
                  , B = d - l.top - l.bottom;
                M.update = function() {
                    _.transition().duration(N).call(M)
                }
                ,
                M.container = this,
                C.setter(O(S), M.update).getter(A(S)).update(),
                C.disabled = S.map(function(e) {
                    return !!e.disabled
                });
                if (!k) {
                    var j;
                    k = {};
                    for (j in C)
                        C[j]instanceof Array ? k[j] = C[j].slice(0) : k[j] = C[j]
                }
                if (!S || !S.length || !S.filter(function(e) {
                    return e.values.length
                }).length) {
                    var F = _.selectAll(".nv-noData").data([x]);
                    return F.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    F.attr("x", f.left + P / 2).attr("y", f.top + H / 2).text(function(e) {
                        return e
                    }),
                    M
                }
                _.selectAll(".nv-noData").remove(),
                v = t.xScale(),
                m = t.yScale(),
                g = n.xScale(),
                y = n.yScale();
                var I = _.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([S])
                  , q = I.enter().append("g").attr("class", "nvd3 nv-wrap nv-lineWithFocusChart").append("g")
                  , R = I.select("g");
                q.append("g").attr("class", "nv-legendWrap");
                var U = q.append("g").attr("class", "nv-focus");
                U.append("g").attr("class", "nv-x nv-axis"),
                U.append("g").attr("class", "nv-y nv-axis"),
                U.append("g").attr("class", "nv-linesWrap");
                var z = q.append("g").attr("class", "nv-context");
                z.append("g").attr("class", "nv-x nv-axis"),
                z.append("g").attr("class", "nv-y nv-axis"),
                z.append("g").attr("class", "nv-linesWrap"),
                z.append("g").attr("class", "nv-brushBackground"),
                z.append("g").attr("class", "nv-x nv-brush"),
                b && (u.width(P),
                R.select(".nv-legendWrap").datum(S).call(u),
                f.top != u.height() && (f.top = u.height(),
                H = (p || parseInt(_.style("height")) || 400) - f.top - f.bottom - d),
                R.select(".nv-legendWrap").attr("transform", "translate(0," + -f.top + ")")),
                I.attr("transform", "translate(" + f.left + "," + f.top + ")"),
                t.width(P).height(H).color(S.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !S[t].disabled
                })),
                n.defined(t.defined()).width(P).height(B).color(S.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !S[t].disabled
                })),
                R.select(".nv-context").attr("transform", "translate(0," + (H + f.bottom + l.top) + ")");
                var W = R.select(".nv-context .nv-linesWrap").datum(S.filter(function(e) {
                    return !e.disabled
                }));
                d3.transition(W).call(n),
                r.scale(v).ticks(e.utils.calcTicksX(P / 100, S)).tickSize(-H, 0),
                i.scale(m).ticks(e.utils.calcTicksY(H / 36, S)).tickSize(-P, 0),
                R.select(".nv-focus .nv-x.nv-axis").attr("transform", "translate(0," + H + ")"),
                a.x(g).on("brush", function() {
                    var e = M.duration();
                    M.duration(0),
                    Q(),
                    M.duration(e)
                }),
                w && a.extent(w);
                var X = R.select(".nv-brushBackground").selectAll("g").data([w || a.extent()])
                  , V = X.enter().append("g");
                V.append("rect").attr("class", "left").attr("x", 0).attr("y", 0).attr("height", B),
                V.append("rect").attr("class", "right").attr("x", 0).attr("y", 0).attr("height", B);
                var $ = R.select(".nv-x.nv-brush").call(a);
                $.selectAll("rect").attr("height", B),
                $.selectAll(".resize").append("path").attr("d", J),
                Q(),
                s.scale(g).ticks(e.utils.calcTicksX(P / 100, S)).tickSize(-B, 0),
                R.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"),
                d3.transition(R.select(".nv-context .nv-x.nv-axis")).call(s),
                o.scale(y).ticks(e.utils.calcTicksY(B / 36, S)).tickSize(-P, 0),
                d3.transition(R.select(".nv-context .nv-y.nv-axis")).call(o),
                R.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"),
                u.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        C[t] = e[t];
                    T.stateChange(C),
                    M.update()
                }),
                T.on("tooltipShow", function(e) {
                    E && L(e, D.parentNode)
                }),
                T.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && S.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    M.update()
                })
            }),
            M
        }
        var t = e.models.line(), n = e.models.line(), r = e.models.axis(), i = e.models.axis(), s = e.models.axis(), o = e.models.axis(), u = e.models.legend(), a = d3.svg.brush(), f = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60
        }, l = {
            top: 0,
            right: 30,
            bottom: 20,
            left: 60
        }, c = e.utils.defaultColor(), h = null, p = null, d = 100, v, m, g, y, b = !0, w = null, E = !0, S = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, x = "No Data Available.", T = d3.dispatch("tooltipShow", "tooltipHide", "brush", "stateChange", "changeState"), N = 250, C = e.utils.state(), k = null;
        t.clipEdge(!0),
        n.interactive(!1),
        r.orient("bottom").tickPadding(5),
        i.orient("left"),
        s.orient("bottom").tickPadding(5),
        o.orient("left");
        var L = function(n, s) {
            var o = n.pos[0] + (s.offsetLeft || 0)
              , u = n.pos[1] + (s.offsetTop || 0)
              , a = r.tickFormat()(t.x()(n.point, n.pointIndex))
              , f = i.tickFormat()(t.y()(n.point, n.pointIndex))
              , l = S(n.series.key, a, f, n, M);
            e.tooltip.show([o, u], l, null, null, s)
        }
          , A = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    })
                }
            }
        }
          , O = function(e) {
            return function(t) {
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + f.left, e.pos[1] + f.top],
            T.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }),
        T.on("tooltipHide", function() {
            E && e.tooltip.cleanup()
        }),
        M.dispatch = T,
        M.legend = u,
        M.lines = t,
        M.lines2 = n,
        M.xAxis = r,
        M.yAxis = i,
        M.x2Axis = s,
        M.y2Axis = o,
        M.options = e.utils.optionsFunc.bind(M),
        M._options = Object.create({}, {
            width: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            height: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            focusHeight: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            showLegend: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            brushExtent: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            tooltips: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            tooltipContent: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            defaultState: {
                get: function() {
                    return k
                },
                set: function(e) {
                    k = e
                }
            },
            noData: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e
                }
            },
            margin: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f.top = e.top !== undefined ? e.top : f.top,
                    f.right = e.right !== undefined ? e.right : f.right,
                    f.bottom = e.bottom !== undefined ? e.bottom : f.bottom,
                    f.left = e.left !== undefined ? e.left : f.left
                }
            },
            color: {
                get: function() {
                    return c
                },
                set: function(t) {
                    c = e.utils.getColor(t),
                    u.color(c)
                }
            },
            interpolate: {
                get: function() {
                    return t.interpolate()
                },
                set: function(e) {
                    t.interpolate(e),
                    n.interpolate(e)
                }
            },
            xTickFormat: {
                get: function() {
                    return r.xTickFormat()
                },
                set: function(e) {
                    r.xTickFormat(e),
                    s.xTickFormat(e)
                }
            },
            yTickFormat: {
                get: function() {
                    return i.yTickFormat()
                },
                set: function(e) {
                    i.yTickFormat(e),
                    o.yTickFormat(e)
                }
            },
            duration: {
                get: function() {
                    return N
                },
                set: function(e) {
                    N = e,
                    i.duration(N),
                    r.duration(N)
                }
            },
            x: {
                get: function() {
                    return t.x()
                },
                set: function(e) {
                    t.x(e),
                    n.x(e)
                }
            },
            y: {
                get: function() {
                    return t.y()
                },
                set: function(e) {
                    t.y(e),
                    n.y(e)
                }
            }
        }),
        e.utils.inheritOptions(M, t),
        e.utils.initOptions(M),
        M
    }
    ,
    e.models.multiBar = function() {
        "use strict";
        function L(A) {
            return C.reset(),
            A.each(function(L) {
                var A = n - t.left - t.right
                  , O = r - t.top - t.bottom
                  , M = d3.select(this);
                e.utils.initSVG(M);
                var _ = function(e, t) {
                    return e.series === L.length - 1 && t === L[0].values.length - 1 ? !0 : !1
                };
                d && L.length && (d = [{
                    values: L[0].values.map(function(e) {
                        return {
                            x: e.x,
                            y: 0,
                            series: e.series,
                            size: .01
                        }
                    })
                }]),
                c && (L = d3.layout.stack().offset(h).values(function(e) {
                    return e.values
                }).y(a)(!L.length && d ? d : L)),
                L.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                }),
                c && L[0].values.map(function(e, t) {
                    var n = 0
                      , r = 0;
                    L.map(function(e) {
                        var i = e.values[t];
                        i.size = Math.abs(i.y),
                        i.y < 0 ? (i.y1 = r,
                        r -= i.size) : (i.y1 = i.size + n,
                        n += i.size)
                    })
                });
                var D = y && b ? [] : L.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0,
                            y1: e.y1
                        }
                    })
                });
                i.domain(y || d3.merge(D).map(function(e) {
                    return e.x
                })).rangeBands(w || [0, A], S),
                s.domain(b || d3.extent(d3.merge(D).map(function(e) {
                    return c ? e.y > 0 ? e.y1 : e.y1 + e.y : e.y
                }).concat(f))).range(E || [O, 0]),
                i.domain()[0] === i.domain()[1] && (i.domain()[0] ? i.domain([i.domain()[0] - i.domain()[0] * .01, i.domain()[1] + i.domain()[1] * .01]) : i.domain([-1, 1])),
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] + s.domain()[0] * .01, s.domain()[1] - s.domain()[1] * .01]) : s.domain([-1, 1])),
                T = T || i,
                N = N || s;
                var P = M.selectAll("g.nv-wrap.nv-multibar").data([L])
                  , H = P.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibar")
                  , B = H.append("defs")
                  , j = H.append("g")
                  , F = P.select("g");
                j.append("g").attr("class", "nv-groups"),
                P.attr("transform", "translate(" + t.left + "," + t.top + ")"),
                B.append("clipPath").attr("id", "nv-edge-clip-" + o).append("rect"),
                P.select("#nv-edge-clip-" + o + " rect").attr("width", A).attr("height", O),
                F.attr("clip-path", l ? "url(#nv-edge-clip-" + o + ")" : "");
                var I = P.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e, t) {
                    return t
                });
                I.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6);
                var q = C.transition(I.exit().selectAll("rect.nv-bar"), "multibarExit", Math.min(100, g)).attr("y", function(e) {
                    return (c ? N(e.y0) : N(0)) || 0
                }).attr("height", 0).remove();
                q.delay && q.delay(function(e, t) {
                    var n = t * (g / (k + 1)) - t;
                    return n
                }),
                I.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }).style("fill", function(e, t) {
                    return p(e, t)
                }).style("stroke", function(e, t) {
                    return p(e, t)
                }),
                I.style("stroke-opacity", 1).style("fill-opacity", .75);
                var R = I.selectAll("rect.nv-bar").data(function(e) {
                    return d && !L.length ? d.values : e.values
                });
                R.exit().remove();
                var U = R.enter().append("rect").attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).attr("x", function(e, t, n) {
                    return c ? 0 : n * i.rangeBand() / L.length
                }).attr("y", function(e) {
                    return N(c ? e.y0 : 0) || 0
                }).attr("height", 0).attr("width", i.rangeBand() / (c ? 1 : L.length)).attr("transform", function(e, t) {
                    return "translate(" + i(u(e, t)) + ",0)"
                });
                R.style("fill", function(e, t, n) {
                    return p(e, n, t)
                }).style("stroke", function(e, t, n) {
                    return p(e, n, t)
                }).on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0),
                    x.elementMouseover({
                        value: a(e, t),
                        point: e,
                        series: L[e.series],
                        pos: [i(u(e, t)) + i.rangeBand() * (c ? L.length / 2 : e.series + .5) / L.length, s(a(e, t) + (c ? e.y0 : 0))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    x.elementMouseout({
                        value: a(e, t),
                        point: e,
                        series: L[e.series],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    x.elementClick({
                        value: a(e, t),
                        point: e,
                        series: L[e.series],
                        pos: [i(u(e, t)) + i.rangeBand() * (c ? L.length / 2 : e.series + .5) / L.length, s(a(e, t) + (c ? e.y0 : 0))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    x.elementDblClick({
                        value: a(e, t),
                        point: e,
                        series: L[e.series],
                        pos: [i(u(e, t)) + i.rangeBand() * (c ? L.length / 2 : e.series + .5) / L.length, s(a(e, t) + (c ? e.y0 : 0))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }),
                R.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).attr("transform", function(e, t) {
                    return "translate(" + i(u(e, t)) + ",0)"
                }),
                v && (m || (m = L.map(function() {
                    return !0
                })),
                R.style("fill", function(e, t, n) {
                    return d3.rgb(v(e, t)).darker(m.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !m[t]
                    })[n]).toString()
                }).style("stroke", function(e, t, n) {
                    return d3.rgb(v(e, t)).darker(m.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !m[t]
                    })[n]).toString()
                }));
                var z = R.watchTransition(C, "multibar", Math.min(250, g)).delay(function(e, t) {
                    return t * g / L[0].values.length
                });
                c ? z.attr("y", function(e, t) {
                    return s(c ? e.y1 : 0)
                }).attr("height", function(e, t) {
                    return Math.max(Math.abs(s(e.y + (c ? e.y0 : 0)) - s(c ? e.y0 : 0)), 1)
                }).attr("x", function(e, t) {
                    return c ? 0 : e.series * i.rangeBand() / L.length
                }).attr("width", i.rangeBand() / (c ? 1 : L.length)) : z.attr("x", function(e, t) {
                    return e.series * i.rangeBand() / L.length
                }).attr("width", i.rangeBand() / L.length).attr("y", function(e, t) {
                    return a(e, t) < 0 ? s(0) : s(0) - s(a(e, t)) < 1 ? s(0) - 1 : s(a(e, t)) || 0
                }).attr("height", function(e, t) {
                    return Math.max(Math.abs(s(a(e, t)) - s(0)), 1) || 0
                }),
                T = i.copy(),
                N = s.copy(),
                L[0] && L[0].values && (k = L[0].values.length)
            }),
            C.renderEnd("multibar immediate"),
            L
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = d3.scale.ordinal(), s = d3.scale.linear(), o = Math.floor(Math.random() * 1e4), u = function(e) {
            return e.x
        }, a = function(e) {
            return e.y
        }, f = [0], l = !0, c = !1, h = "zero", p = e.utils.defaultColor(), d = !1, v = null, m, g = 500, y, b, w, E, S = .1, x = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "renderEnd"), T, N, C = e.utils.renderWatch(x, g), k = 0;
        return L.dispatch = x,
        L.options = e.utils.optionsFunc.bind(L),
        L._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            x: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            y: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            xScale: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            yScale: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            xDomain: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            yDomain: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            xRange: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            yRange: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            forceY: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            stacked: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            stackOffset: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            clipEdge: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            disabled: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            id: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            hideable: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            groupSpacing: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            duration: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e,
                    C.reset(g)
                }
            },
            color: {
                get: function() {
                    return p
                },
                set: function(t) {
                    p = e.utils.getColor(t)
                }
            },
            barColor: {
                get: function() {
                    return v
                },
                set: function(t) {
                    v = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(L),
        L
    }
    ,
    e.models.multiBarChart = function() {
        "use strict";
        function P(w) {
            return A.reset(),
            A.models(t),
            p && A.models(n),
            d && A.models(r),
            w.each(function(w) {
                var A = d3.select(this)
                  , H = this;
                e.utils.initSVG(A);
                var B = (u || parseInt(A.style("width")) || 960) - o.left - o.right
                  , j = (a || parseInt(A.style("height")) || 400) - o.top - o.bottom;
                P.update = function() {
                    L === 0 ? A.call(P) : A.transition().duration(L).call(P)
                }
                ,
                P.container = this,
                x.setter(D(w), P.update).getter(_(w)).update(),
                x.disabled = w.map(function(e) {
                    return !!e.disabled
                });
                if (!T) {
                    var F;
                    T = {};
                    for (F in x)
                        x[F]instanceof Array ? T[F] = x[F].slice(0) : T[F] = x[F]
                }
                if (!w || !w.length || !w.filter(function(e) {
                    return e.values.length
                }).length) {
                    var I = A.selectAll(".nv-noData").data([N]);
                    return I.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    I.attr("x", o.left + B / 2).attr("y", o.top + j / 2).text(function(e) {
                        return e
                    }),
                    P
                }
                A.selectAll(".nv-noData").remove(),
                E = t.xScale(),
                S = t.yScale();
                var q = A.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([w])
                  , R = q.enter().append("g").attr("class", "nvd3 nv-wrap nv-multiBarWithLegend").append("g")
                  , U = q.select("g");
                R.append("g").attr("class", "nv-x nv-axis"),
                R.append("g").attr("class", "nv-y nv-axis"),
                R.append("g").attr("class", "nv-barsWrap"),
                R.append("g").attr("class", "nv-legendWrap"),
                R.append("g").attr("class", "nv-controlsWrap"),
                h && (i.width(B - k()),
                t.barColor() && w.forEach(function(e, t) {
                    e.color = d3.rgb("#ccc").darker(t * 1.5).toString()
                }),
                U.select(".nv-legendWrap").datum(w).call(i),
                o.top != i.height() && (o.top = i.height(),
                j = (a || parseInt(A.style("height")) || 400) - o.top - o.bottom),
                U.select(".nv-legendWrap").attr("transform", "translate(" + k() + "," + -o.top + ")"));
                if (l) {
                    var z = [{
                        key: c.grouped || "Grouped",
                        disabled: t.stacked()
                    }, {
                        key: c.stacked || "Stacked",
                        disabled: !t.stacked()
                    }];
                    s.width(k()).color(["#444", "#444", "#444"]),
                    U.select(".nv-controlsWrap").datum(z).attr("transform", "translate(0," + -o.top + ")").call(s)
                }
                q.attr("transform", "translate(" + o.left + "," + o.top + ")"),
                v && U.select(".nv-y.nv-axis").attr("transform", "translate(" + B + ",0)"),
                t.disabled(w.map(function(e) {
                    return e.disabled
                })).width(B).height(j).color(w.map(function(e, t) {
                    return e.color || f(e, t)
                }).filter(function(e, t) {
                    return !w[t].disabled
                }));
                var W = U.select(".nv-barsWrap").datum(w.filter(function(e) {
                    return !e.disabled
                }));
                W.call(t);
                if (p) {
                    n.scale(E).ticks(e.utils.calcTicksX(B / 100, w)).tickSize(-j, 0),
                    U.select(".nv-x.nv-axis").attr("transform", "translate(0," + S.range()[0] + ")"),
                    U.select(".nv-x.nv-axis").call(n);
                    var X = U.select(".nv-x.nv-axis > g").selectAll("g");
                    X.selectAll("line, text").style("opacity", 1);
                    if (g) {
                        var V = function(e, t) {
                            return "translate(" + e + "," + t + ")"
                        }
                          , $ = 5
                          , J = 17;
                        X.selectAll("text").attr("transform", function(e, t, n) {
                            return V(0, n % 2 == 0 ? $ : J)
                        });
                        var K = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;
                        U.selectAll(".nv-x.nv-axis .nv-axisMaxMin text").attr("transform", function(e, t) {
                            return V(0, t === 0 || K % 2 !== 0 ? J : $)
                        })
                    }
                    m && X.filter(function(e, t) {
                        return t % Math.ceil(w[0].values.length / (B / 100)) !== 0
                    }).selectAll("text, line").style("opacity", 0),
                    y && X.selectAll(".tick text").attr("transform", "rotate(" + y + " 0,0)").style("text-anchor", y > 0 ? "start" : "end"),
                    U.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity", 1)
                }
                d && (r.scale(S).ticks(e.utils.calcTicksY(j / 36, w)).tickSize(-B, 0),
                U.select(".nv-y.nv-axis").call(r)),
                i.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        x[t] = e[t];
                    C.stateChange(x),
                    P.update()
                }),
                s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled)
                        return;
                    z = z.map(function(e) {
                        return e.disabled = !0,
                        e
                    }),
                    e.disabled = !1;
                    switch (e.key) {
                    case "Grouped":
                        t.stacked(!1);
                        break;
                    case "Stacked":
                        t.stacked(!0)
                    }
                    x.stacked = t.stacked(),
                    C.stateChange(x),
                    P.update()
                }),
                C.on("tooltipShow", function(e) {
                    b && M(e, H.parentNode)
                }),
                C.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (w.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    x.disabled = e.disabled),
                    typeof e.stacked != "undefined" && (t.stacked(e.stacked),
                    x.stacked = e.stacked,
                    O = e.stacked),
                    P.update()
                })
            }),
            A.renderEnd("multibarchart immediate"),
            P
        }
        var t = e.models.multiBar(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = e.utils.defaultColor(), l = !0, c = {}, h = !0, p = !0, d = !0, v = !1, m = !0, g = !1, y = 0, b = !0, w = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>"
        }, E, S, x = e.utils.state(), T = null, N = "No Data Available.", C = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd"), k = function() {
            return l ? 180 : 0
        }, L = 250;
        x.stacked = !1,
        t.stacked(!1),
        n.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(e) {
            return e
        }),
        r.orient(v ? "right" : "left").tickFormat(d3.format(",.1f")),
        s.updateState(!1);
        var A = e.utils.renderWatch(C)
          , O = !1
          , M = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , u = i.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , f = r.tickFormat()(t.y()(i.point, i.pointIndex))
              , l = w(i.series.key, a, f, i, P);
            e.tooltip.show([o, u], l, i.value < 0 ? "n" : "s", null, s)
        }
          , _ = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    }),
                    stacked: O
                }
            }
        }
          , D = function(e) {
            return function(t) {
                t.stacked !== undefined && (O = t.stacked),
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            C.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            C.tooltipHide(e)
        }),
        C.on("tooltipHide", function() {
            b && e.tooltip.cleanup()
        }),
        P.dispatch = C,
        P.multibar = t,
        P.legend = i,
        P.xAxis = n,
        P.yAxis = r,
        P.state = x,
        P.options = e.utils.optionsFunc.bind(P),
        P._options = Object.create({}, {
            width: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            height: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            showLegend: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            showControls: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            controlLabels: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            showXAxis: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            showYAxis: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            tooltips: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            tooltipContent: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            defaultState: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            noData: {
                get: function() {
                    return N
                },
                set: function(e) {
                    N = e
                }
            },
            reduceXTicks: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            rotateLabels: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            staggerLabels: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            margin: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o.top = e.top !== undefined ? e.top : o.top,
                    o.right = e.right !== undefined ? e.right : o.right,
                    o.bottom = e.bottom !== undefined ? e.bottom : o.bottom,
                    o.left = e.left !== undefined ? e.left : o.left
                }
            },
            duration: {
                get: function() {
                    return L
                },
                set: function(e) {
                    L = e,
                    t.duration(L),
                    n.duration(L),
                    r.duration(L),
                    A.reset(L)
                }
            },
            color: {
                get: function() {
                    return f
                },
                set: function(t) {
                    f = e.utils.getColor(t),
                    i.color(f)
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e,
                    r.orient(v ? "right" : "left")
                }
            }
        }),
        e.utils.inheritOptions(P, t),
        e.utils.initOptions(P),
        P
    }
    ,
    e.models.multiBarHorizontal = function() {
        "use strict";
        function A(i) {
            return L.reset(),
            i.each(function(i) {
                var b = n - t.left - t.right
                  , T = r - t.top - t.bottom
                  , A = d3.select(this);
                e.utils.initSVG(A),
                d && (i = d3.layout.stack().offset("zero").values(function(e) {
                    return e.values
                }).y(a)(i)),
                i.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                }),
                d && i[0].values.map(function(e, t) {
                    var n = 0
                      , r = 0;
                    i.map(function(e) {
                        var i = e.values[t];
                        i.size = Math.abs(i.y),
                        i.y < 0 ? (i.y1 = r - i.size,
                        r -= i.size) : (i.y1 = n,
                        n += i.size)
                    })
                });
                var O = w && E ? [] : i.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0,
                            y1: e.y1
                        }
                    })
                });
                s.domain(w || d3.merge(O).map(function(e) {
                    return e.x
                })).rangeBands(S || [0, T], .1),
                o.domain(E || d3.extent(d3.merge(O).map(function(e) {
                    return d ? e.y > 0 ? e.y1 + e.y : e.y1 : e.y
                }).concat(l))),
                v && !d ? o.range(x || [o.domain()[0] < 0 ? g : 0, b - (o.domain()[1] > 0 ? g : 0)]) : o.range(x || [0, b]),
                C = C || s,
                k = k || d3.scale.linear().domain(o.domain()).range([o(0), o(0)]);
                var M = d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([i])
                  , _ = M.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibarHorizontal")
                  , D = _.append("defs")
                  , P = _.append("g")
                  , H = M.select("g");
                P.append("g").attr("class", "nv-groups"),
                M.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var B = M.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e, t) {
                    return t
                });
                B.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6),
                B.exit().watchTransition(L, "multibarhorizontal: exit groups").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove(),
                B.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }).style("fill", function(e, t) {
                    return c(e, t)
                }).style("stroke", function(e, t) {
                    return c(e, t)
                }),
                B.watchTransition(L, "multibarhorizontal: groups").style("stroke-opacity", 1).style("fill-opacity", .75);
                var j = B.selectAll("g.nv-bar").data(function(e) {
                    return e.values
                });
                j.exit().remove();
                var F = j.enter().append("g").attr("transform", function(e, t, n) {
                    return "translate(" + k(d ? e.y0 : 0) + "," + (d ? 0 : n * s.rangeBand() / i.length + s(u(e, t))) + ")"
                });
                F.append("rect").attr("width", 0).attr("height", s.rangeBand() / (d ? 1 : i.length)),
                j.on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0),
                    N.elementMouseover({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pos: [o(a(e, t) + (d ? e.y0 : 0)), s(u(e, t)) + s.rangeBand() * (d ? i.length / 2 : e.series + .5) / i.length],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    N.elementMouseout({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    N.elementClick({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pos: [s(u(e, t)) + s.rangeBand() * (d ? i.length / 2 : e.series + .5) / i.length, o(a(e, t) + (d ? e.y0 : 0))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    N.elementDblClick({
                        value: a(e, t),
                        point: e,
                        series: i[e.series],
                        pos: [s(u(e, t)) + s.rangeBand() * (d ? i.length / 2 : e.series + .5) / i.length, o(a(e, t) + (d ? e.y0 : 0))],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }),
                f(i[0], 0) && (F.append("polyline"),
                j.select("polyline").attr("fill", "none").attr("points", function(e, t) {
                    var n = f(e, t)
                      , r = .8 * s.rangeBand() / ((d ? 1 : i.length) * 2);
                    n = n.length ? n : [-Math.abs(n), Math.abs(n)],
                    n = n.map(function(e) {
                        return o(e) - o(0)
                    });
                    var u = [[n[0], -r], [n[0], r], [n[0], 0], [n[1], 0], [n[1], -r], [n[1], r]];
                    return u.map(function(e) {
                        return e.join(",")
                    }).join(" ")
                }).attr("transform", function(e, t) {
                    var n = s.rangeBand() / ((d ? 1 : i.length) * 2);
                    return "translate(" + (a(e, t) < 0 ? 0 : o(a(e, t)) - o(0)) + ", " + n + ")"
                })),
                F.append("text"),
                v && !d ? (j.select("text").attr("text-anchor", function(e, t) {
                    return a(e, t) < 0 ? "end" : "start"
                }).attr("y", s.rangeBand() / (i.length * 2)).attr("dy", ".32em").html(function(e, t) {
                    var n = y(a(e, t))
                      , r = f(e, t);
                    return r === undefined ? n : r.length ? n + "+" + y(Math.abs(r[1])) + "-" + y(Math.abs(r[0])) : n + "&plusmn;" + y(Math.abs(r))
                }),
                j.watchTransition(L, "multibarhorizontal: bars").select("text").attr("x", function(e, t) {
                    return a(e, t) < 0 ? -4 : o(a(e, t)) - o(0) + 4
                })) : j.selectAll("text").text(""),
                m && !d ? (F.append("text").classed("nv-bar-label", !0),
                j.select("text.nv-bar-label").attr("text-anchor", function(e, t) {
                    return a(e, t) < 0 ? "start" : "end"
                }).attr("y", s.rangeBand() / (i.length * 2)).attr("dy", ".32em").text(function(e, t) {
                    return u(e, t)
                }),
                j.watchTransition(L, "multibarhorizontal: bars").select("text.nv-bar-label").attr("x", function(e, t) {
                    return a(e, t) < 0 ? o(0) - o(a(e, t)) + 4 : -4
                })) : j.selectAll("text.nv-bar-label").text(""),
                j.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }),
                h && (p || (p = i.map(function() {
                    return !0
                })),
                j.style("fill", function(e, t, n) {
                    return d3.rgb(h(e, t)).darker(p.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !p[t]
                    })[n]).toString()
                }).style("stroke", function(e, t, n) {
                    return d3.rgb(h(e, t)).darker(p.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !p[t]
                    })[n]).toString()
                })),
                d ? j.watchTransition(L, "multibarhorizontal: bars").attr("transform", function(e, t) {
                    return "translate(" + o(e.y1) + "," + s(u(e, t)) + ")"
                }).select("rect").attr("width", function(e, t) {
                    return Math.abs(o(a(e, t) + e.y0) - o(e.y0))
                }).attr("height", s.rangeBand()) : j.watchTransition(L, "multibarhorizontal: bars").attr("transform", function(e, t) {
                    return "translate(" + (a(e, t) < 0 ? o(a(e, t)) : o(0)) + "," + (e.series * s.rangeBand() / i.length + s(u(e, t))) + ")"
                }).select("rect").attr("height", s.rangeBand() / i.length).attr("width", function(e, t) {
                    return Math.max(Math.abs(o(a(e, t)) - o(0)), 1)
                }),
                C = s.copy(),
                k = o.copy()
            }),
            L.renderEnd("multibarHorizontal immediate"),
            A
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = Math.floor(Math.random() * 1e4), s = d3.scale.ordinal(), o = d3.scale.linear(), u = function(e) {
            return e.x
        }, a = function(e) {
            return e.y
        }, f = function(e) {
            return e.yErr
        }, l = [0], c = e.utils.defaultColor(), h = null, p, d = !1, v = !1, m = !1, g = 60, y = d3.format(",.2f"), b = 1200, w, E, S, x, T = 250, N = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "renderEnd"), C, k, L = e.utils.renderWatch(N, T);
        return A.dispatch = N,
        A.options = e.utils.optionsFunc.bind(A),
        A._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            x: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            y: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            yErr: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            xScale: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            yScale: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            xDomain: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            yDomain: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            xRange: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            yRange: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e
                }
            },
            forceY: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            stacked: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            showValues: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            disabled: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            id: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            valueFormat: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            valuePadding: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            duration: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e,
                    L.reset(T)
                }
            },
            color: {
                get: function() {
                    return c
                },
                set: function(t) {
                    c = e.utils.getColor(t)
                }
            },
            barColor: {
                get: function() {
                    return c
                },
                set: function(t) {
                    h = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(A),
        A
    }
    ,
    e.models.multiBarHorizontalChart = function() {
        "use strict";
        function O(g) {
            return A.reset(),
            A.models(t),
            p && A.models(n),
            d && A.models(r),
            g.each(function(g) {
                var A = d3.select(this)
                  , M = this;
                e.utils.initSVG(A);
                var _ = (u || parseInt(A.style("width")) || 960) - o.left - o.right
                  , D = (a || parseInt(A.style("height")) || 400) - o.top - o.bottom;
                O.update = function() {
                    A.transition().duration(N).call(O)
                }
                ,
                O.container = this,
                v = t.stacked(),
                w.setter(L(g), O.update).getter(k(g)).update(),
                w.disabled = g.map(function(e) {
                    return !!e.disabled
                });
                if (!E) {
                    var P;
                    E = {};
                    for (P in w)
                        w[P]instanceof Array ? E[P] = w[P].slice(0) : E[P] = w[P]
                }
                if (!g || !g.length || !g.filter(function(e) {
                    return e.values.length
                }).length) {
                    var H = A.selectAll(".nv-noData").data([S]);
                    return H.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    H.attr("x", o.left + _ / 2).attr("y", o.top + D / 2).text(function(e) {
                        return e
                    }),
                    O
                }
                A.selectAll(".nv-noData").remove(),
                y = t.xScale(),
                b = t.yScale();
                var B = A.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([g])
                  , j = B.enter().append("g").attr("class", "nvd3 nv-wrap nv-multiBarHorizontalChart").append("g")
                  , F = B.select("g");
                j.append("g").attr("class", "nv-x nv-axis"),
                j.append("g").attr("class", "nv-y nv-axis").append("g").attr("class", "nv-zeroLine").append("line"),
                j.append("g").attr("class", "nv-barsWrap"),
                j.append("g").attr("class", "nv-legendWrap"),
                j.append("g").attr("class", "nv-controlsWrap"),
                h && (i.width(_ - T()),
                t.barColor() && g.forEach(function(e, t) {
                    e.color = d3.rgb("#ccc").darker(t * 1.5).toString()
                }),
                F.select(".nv-legendWrap").datum(g).call(i),
                o.top != i.height() && (o.top = i.height(),
                D = (a || parseInt(A.style("height")) || 400) - o.top - o.bottom),
                F.select(".nv-legendWrap").attr("transform", "translate(" + T() + "," + -o.top + ")"));
                if (l) {
                    var I = [{
                        key: c.grouped || "Grouped",
                        disabled: t.stacked()
                    }, {
                        key: c.stacked || "Stacked",
                        disabled: !t.stacked()
                    }];
                    s.width(T()).color(["#444", "#444", "#444"]),
                    F.select(".nv-controlsWrap").datum(I).attr("transform", "translate(0," + -o.top + ")").call(s)
                }
                B.attr("transform", "translate(" + o.left + "," + o.top + ")"),
                t.disabled(g.map(function(e) {
                    return e.disabled
                })).width(_).height(D).color(g.map(function(e, t) {
                    return e.color || f(e, t)
                }).filter(function(e, t) {
                    return !g[t].disabled
                }));
                var q = F.select(".nv-barsWrap").datum(g.filter(function(e) {
                    return !e.disabled
                }));
                q.transition().call(t);
                if (p) {
                    n.scale(y).ticks(e.utils.calcTicksY(D / 24, g)).tickSize(-_, 0),
                    F.select(".nv-x.nv-axis").call(n);
                    var R = F.select(".nv-x.nv-axis").selectAll("g");
                    R.selectAll("line, text")
                }
                d && (r.scale(b).ticks(e.utils.calcTicksX(_ / 100, g)).tickSize(-D, 0),
                F.select(".nv-y.nv-axis").attr("transform", "translate(0," + D + ")"),
                F.select(".nv-y.nv-axis").call(r)),
                F.select(".nv-zeroLine line").attr("x1", b(0)).attr("x2", b(0)).attr("y1", 0).attr("y2", -D),
                i.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        w[t] = e[t];
                    x.stateChange(w),
                    O.update()
                }),
                s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled)
                        return;
                    I = I.map(function(e) {
                        return e.disabled = !0,
                        e
                    }),
                    e.disabled = !1;
                    switch (e.key) {
                    case "Grouped":
                        t.stacked(!1);
                        break;
                    case "Stacked":
                        t.stacked(!0)
                    }
                    w.stacked = t.stacked(),
                    x.stateChange(w),
                    v = t.stacked(),
                    O.update()
                }),
                x.on("tooltipShow", function(e) {
                    m && C(e, M.parentNode)
                }),
                x.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (g.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    w.disabled = e.disabled),
                    typeof e.stacked != "undefined" && (t.stacked(e.stacked),
                    w.stacked = e.stacked,
                    v = e.stacked),
                    O.update()
                })
            }),
            A.renderEnd("multibar horizontal chart immediate"),
            O
        }
        var t = e.models.multiBarHorizontal(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend().height(30), s = e.models.legend().height(30), o = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = e.utils.defaultColor(), l = !0, c = {}, h = !0, p = !0, d = !0, v = !1, m = !0, g = function(e, t, n, r, i) {
            return "<h3>" + e + " - " + t + "</h3>" + "<p>" + n + "</p>"
        }, y, b, w = e.utils.state(), E = null, S = "No Data Available.", x = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd"), T = function() {
            return l ? 180 : 0
        }, N = 250;
        w.stacked = !1,
        t.stacked(v),
        n.orient("left").tickPadding(5).highlightZero(!1).showMaxMin(!1).tickFormat(function(e) {
            return e
        }),
        r.orient("bottom").tickFormat(d3.format(",.1f")),
        s.updateState(!1);
        var C = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , u = i.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , f = r.tickFormat()(t.y()(i.point, i.pointIndex))
              , l = g(i.series.key, a, f, i, O);
            e.tooltip.show([o, u], l, i.value < 0 ? "e" : "w", null, s)
        }
          , k = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    }),
                    stacked: v
                }
            }
        }
          , L = function(e) {
            return function(t) {
                t.stacked !== undefined && (v = t.stacked),
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        }
          , A = e.utils.renderWatch(x, N);
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            x.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            x.tooltipHide(e)
        }),
        x.on("tooltipHide", function() {
            m && e.tooltip.cleanup()
        }),
        O.dispatch = x,
        O.multibar = t,
        O.legend = i,
        O.xAxis = n,
        O.yAxis = r,
        O.state = w,
        O.options = e.utils.optionsFunc.bind(O),
        O._options = Object.create({}, {
            width: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            height: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            showLegend: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            showControls: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            controlLabels: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            showXAxis: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            showYAxis: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            tooltips: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            tooltipContent: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            defaultState: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            noData: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            margin: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o.top = e.top !== undefined ? e.top : o.top,
                    o.right = e.right !== undefined ? e.right : o.right,
                    o.bottom = e.bottom !== undefined ? e.bottom : o.bottom,
                    o.left = e.left !== undefined ? e.left : o.left
                }
            },
            duration: {
                get: function() {
                    return N
                },
                set: function(e) {
                    N = e,
                    A.reset(N),
                    t.duration(N),
                    n.duration(N),
                    r.duration(N)
                }
            },
            color: {
                get: function() {
                    return f
                },
                set: function(t) {
                    f = e.utils.getColor(t),
                    i.color(f)
                }
            }
        }),
        e.utils.inheritOptions(O, t),
        e.utils.initOptions(O),
        O
    }
    ,
    e.models.multiChart = function() {
        "use strict";
        function O(u) {
            return u.each(function(u) {
                var f = d3.select(this)
                  , p = this;
                e.utils.initSVG(f),
                O.update = function() {
                    f.transition().call(O)
                }
                ,
                O.container = this;
                var d = (r || parseInt(f.style("width")) || 960) - t.left - t.right
                  , M = (i || parseInt(f.style("height")) || 400) - t.top - t.bottom
                  , _ = u.filter(function(e) {
                    return e.type == "line" && e.yAxis == 1
                })
                  , D = u.filter(function(e) {
                    return e.type == "line" && e.yAxis == 2
                })
                  , P = u.filter(function(e) {
                    return e.type == "bar" && e.yAxis == 1
                })
                  , H = u.filter(function(e) {
                    return e.type == "bar" && e.yAxis == 2
                })
                  , B = u.filter(function(e) {
                    return e.type == "area" && e.yAxis == 1
                })
                  , j = u.filter(function(e) {
                    return e.type == "area" && e.yAxis == 2
                });
                if (!u || !u.length || !u.filter(function(e) {
                    return e.values.length
                }).length) {
                    var F = f.selectAll(".nv-noData").data([l]);
                    return F.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    F.attr("x", t.left + d / 2).attr("y", t.top + M / 2).text(function(e) {
                        return e
                    }),
                    O
                }
                f.selectAll(".nv-noData").remove();
                var I = u.filter(function(e) {
                    return !e.disabled && e.yAxis == 1
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: e.x,
                            y: e.y
                        }
                    })
                })
                  , q = u.filter(function(e) {
                    return !e.disabled && e.yAxis == 2
                }).map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: e.x,
                            y: e.y
                        }
                    })
                });
                a.domain(d3.extent(d3.merge(I.concat(q)), function(e) {
                    return e.x
                })).range([0, d]);
                var R = f.selectAll("g.wrap.multiChart").data([u])
                  , U = R.enter().append("g").attr("class", "wrap nvd3 multiChart").append("g");
                U.append("g").attr("class", "x axis"),
                U.append("g").attr("class", "y1 axis"),
                U.append("g").attr("class", "y2 axis"),
                U.append("g").attr("class", "lines1Wrap"),
                U.append("g").attr("class", "lines2Wrap"),
                U.append("g").attr("class", "bars1Wrap"),
                U.append("g").attr("class", "bars2Wrap"),
                U.append("g").attr("class", "stack1Wrap"),
                U.append("g").attr("class", "stack2Wrap"),
                U.append("g").attr("class", "legendWrap");
                var z = R.select("g")
                  , W = u.map(function(e, t) {
                    return u[t].color || n(e, t)
                });
                s && (k.color(W),
                k.width(d / 2),
                z.select(".legendWrap").datum(u.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey,
                    e.key = e.originalKey + (e.yAxis == 1 ? "" : " (right axis)"),
                    e
                })).call(k),
                t.top != k.height() && (t.top = k.height(),
                M = (i || parseInt(f.style("height")) || 400) - t.top - t.bottom),
                z.select(".legendWrap").attr("transform", "translate(" + d / 2 + "," + -t.top + ")")),
                y.width(d).height(M).interpolate(v).color(W.filter(function(e, t) {
                    return !u[t].disabled && u[t].yAxis == 1 && u[t].type == "line"
                })),
                b.width(d).height(M).interpolate(v).color(W.filter(function(e, t) {
                    return !u[t].disabled && u[t].yAxis == 2 && u[t].type == "line"
                })),
                w.width(d).height(M).color(W.filter(function(e, t) {
                    return !u[t].disabled && u[t].yAxis == 1 && u[t].type == "bar"
                })),
                E.width(d).height(M).color(W.filter(function(e, t) {
                    return !u[t].disabled && u[t].yAxis == 2 && u[t].type == "bar"
                })),
                S.width(d).height(M).color(W.filter(function(e, t) {
                    return !u[t].disabled && u[t].yAxis == 1 && u[t].type == "area"
                })),
                x.width(d).height(M).color(W.filter(function(e, t) {
                    return !u[t].disabled && u[t].yAxis == 2 && u[t].type == "area"
                })),
                z.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var X = z.select(".lines1Wrap").datum(_.filter(function(e) {
                    return !e.disabled
                }))
                  , V = z.select(".bars1Wrap").datum(P.filter(function(e) {
                    return !e.disabled
                }))
                  , $ = z.select(".stack1Wrap").datum(B.filter(function(e) {
                    return !e.disabled
                }))
                  , J = z.select(".lines2Wrap").datum(D.filter(function(e) {
                    return !e.disabled
                }))
                  , K = z.select(".bars2Wrap").datum(H.filter(function(e) {
                    return !e.disabled
                }))
                  , Q = z.select(".stack2Wrap").datum(j.filter(function(e) {
                    return !e.disabled
                }))
                  , G = B.length ? B.map(function(e) {
                    return e.values
                }).reduce(function(e, t) {
                    return e.map(function(e, n) {
                        return {
                            x: e.x,
                            y: e.y + t[n].y
                        }
                    })
                }).concat([{
                    x: 0,
                    y: 0
                }]) : []
                  , Y = j.length ? j.map(function(e) {
                    return e.values
                }).reduce(function(e, t) {
                    return e.map(function(e, n) {
                        return {
                            x: e.x,
                            y: e.y + t[n].y
                        }
                    })
                }).concat([{
                    x: 0,
                    y: 0
                }]) : [];
                m.domain(c || d3.extent(d3.merge(I).concat(G), function(e) {
                    return e.y
                })).range([0, M]),
                g.domain(h || d3.extent(d3.merge(q).concat(Y), function(e) {
                    return e.y
                })).range([0, M]),
                y.yDomain(m.domain()),
                w.yDomain(m.domain()),
                S.yDomain(m.domain()),
                b.yDomain(g.domain()),
                E.yDomain(g.domain()),
                x.yDomain(g.domain()),
                B.length && d3.transition($).call(S),
                j.length && d3.transition(Q).call(x),
                P.length && d3.transition(V).call(w),
                H.length && d3.transition(K).call(E),
                _.length && d3.transition(X).call(y),
                D.length && d3.transition(J).call(b),
                T.ticks(e.utils.calcTicksX(d / 100, u)).tickSize(-M, 0),
                z.select(".x.axis").attr("transform", "translate(0," + M + ")"),
                d3.transition(z.select(".x.axis")).call(T),
                N.ticks(e.utils.calcTicksY(M / 36, u)).tickSize(-d, 0),
                d3.transition(z.select(".y1.axis")).call(N),
                C.ticks(e.utils.calcTicksY(M / 36, u)).tickSize(-d, 0),
                d3.transition(z.select(".y2.axis")).call(C),
                z.select(".y1.axis").classed("nv-disabled", I.length ? !1 : !0).attr("transform", "translate(" + a.range()[0] + ",0)"),
                z.select(".y2.axis").classed("nv-disabled", q.length ? !1 : !0).attr("transform", "translate(" + a.range()[1] + ",0)"),
                k.dispatch.on("stateChange", function(e) {
                    O.update()
                }),
                L.on("tooltipShow", function(e) {
                    o && A(e, p.parentNode)
                })
            }),
            O
        }
        var t = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, n = e.utils.defaultColor(), r = null, i = null, s = !0, o = !0, u = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, a, f, l = "No Data Available.", c, h, p = function(e) {
            return e.x
        }, d = function(e) {
            return e.y
        }, v = "monotone", a = d3.scale.linear(), m = d3.scale.linear(), g = d3.scale.linear(), y = e.models.line().yScale(m), b = e.models.line().yScale(g), w = e.models.multiBar().stacked(!1).yScale(m), E = e.models.multiBar().stacked(!1).yScale(g), S = e.models.stackedArea().yScale(m), x = e.models.stackedArea().yScale(g), T = e.models.axis().scale(a).orient("bottom").tickPadding(5), N = e.models.axis().scale(m).orient("left"), C = e.models.axis().scale(g).orient("right"), k = e.models.legend().height(30), L = d3.dispatch("tooltipShow", "tooltipHide"), A = function(t, n) {
            var r = t.pos[0] + (n.offsetLeft || 0)
              , i = t.pos[1] + (n.offsetTop || 0)
              , s = T.tickFormat()(y.x()(t.point, t.pointIndex))
              , o = (t.series.yAxis == 2 ? C : N).tickFormat()(y.y()(t.point, t.pointIndex))
              , a = u(t.series.key, s, o, t, O);
            e.tooltip.show([r, i], a, undefined, undefined, n.offsetParent)
        };
        return y.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        y.dispatch.on("elementMouseout.tooltip", function(e) {
            L.tooltipHide(e)
        }),
        b.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        b.dispatch.on("elementMouseout.tooltip", function(e) {
            L.tooltipHide(e)
        }),
        w.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        w.dispatch.on("elementMouseout.tooltip", function(e) {
            L.tooltipHide(e)
        }),
        E.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        E.dispatch.on("elementMouseout.tooltip", function(e) {
            L.tooltipHide(e)
        }),
        S.dispatch.on("tooltipShow", function(e) {
            if (!Math.round(S.y()(e.point) * 100))
                return setTimeout(function() {
                    d3.selectAll(".point.hover").classed("hover", !1)
                }, 0),
                !1;
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        S.dispatch.on("tooltipHide", function(e) {
            L.tooltipHide(e)
        }),
        x.dispatch.on("tooltipShow", function(e) {
            if (!Math.round(x.y()(e.point) * 100))
                return setTimeout(function() {
                    d3.selectAll(".point.hover").classed("hover", !1)
                }, 0),
                !1;
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        x.dispatch.on("tooltipHide", function(e) {
            L.tooltipHide(e)
        }),
        y.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        y.dispatch.on("elementMouseout.tooltip", function(e) {
            L.tooltipHide(e)
        }),
        b.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            L.tooltipShow(e)
        }),
        b.dispatch.on("elementMouseout.tooltip", function(e) {
            L.tooltipHide(e)
        }),
        L.on("tooltipHide", function() {
            o && e.tooltip.cleanup()
        }),
        O.dispatch = L,
        O.lines1 = y,
        O.lines2 = b,
        O.bars1 = w,
        O.bars2 = E,
        O.stack1 = S,
        O.stack2 = x,
        O.xAxis = T,
        O.yAxis1 = N,
        O.yAxis2 = C,
        O.options = e.utils.optionsFunc.bind(O),
        O._options = Object.create({}, {
            width: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            height: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            showLegend: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            yDomain1: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            yDomain2: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            tooltips: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            tooltipContent: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            noData: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            interpolate: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return n
                },
                set: function(t) {
                    n = e.utils.getColor(t)
                }
            },
            x: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e,
                    y.x(e),
                    w.x(e)
                }
            },
            y: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e,
                    y.y(e),
                    w.y(e)
                }
            }
        }),
        e.utils.initOptions(O),
        O
    }
    ,
    e.models.ohlcBar = function() {
        "use strict";
        function T(y) {
            return y.each(function(y) {
                var T = d3.select(this)
                  , N = (n || parseInt(T.style("width")) || 960) - t.left - t.right
                  , C = (r || parseInt(T.style("height")) || 400) - t.top - t.bottom;
                e.utils.initSVG(T),
                s.domain(b || d3.extent(y[0].values.map(u).concat(p))),
                v ? s.range(E || [N * .5 / y[0].values.length, N * (y[0].values.length - .5) / y[0].values.length]) : s.range(E || [0, N]),
                o.domain(w || [d3.min(y[0].values.map(h).concat(d)), d3.max(y[0].values.map(c).concat(d))]).range(S || [C, 0]),
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] - s.domain()[0] * .01, s.domain()[1] + s.domain()[1] * .01]) : s.domain([-1, 1])),
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([o.domain()[0] + o.domain()[0] * .01, o.domain()[1] - o.domain()[1] * .01]) : o.domain([-1, 1]));
                var k = d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([y[0].values])
                  , L = k.enter().append("g").attr("class", "nvd3 nv-wrap nv-ohlcBar")
                  , A = L.append("defs")
                  , O = L.append("g")
                  , M = k.select("g");
                O.append("g").attr("class", "nv-ticks"),
                k.attr("transform", "translate(" + t.left + "," + t.top + ")"),
                T.on("click", function(e, t) {
                    x.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: i
                    })
                }),
                A.append("clipPath").attr("id", "nv-chart-clip-path-" + i).append("rect"),
                k.select("#nv-chart-clip-path-" + i + " rect").attr("width", N).attr("height", C),
                M.attr("clip-path", m ? "url(#nv-chart-clip-path-" + i + ")" : "");
                var _ = k.select(".nv-ticks").selectAll(".nv-tick").data(function(e) {
                    return e
                });
                _.exit().remove();
                var D = _.enter().append("path").attr("class", function(e, t, n) {
                    return (f(e, t) > l(e, t) ? "nv-tick negative" : "nv-tick positive") + " nv-tick-" + n + "-" + t
                }).attr("d", function(e, t) {
                    var n = N / y[0].values.length * .9;
                    return "m0,0l0," + (o(f(e, t)) - o(c(e, t))) + "l" + -n / 2 + ",0l" + n / 2 + ",0l0," + (o(h(e, t)) - o(f(e, t))) + "l0," + (o(l(e, t)) - o(h(e, t))) + "l" + n / 2 + ",0l" + -n / 2 + ",0z"
                }).attr("transform", function(e, t) {
                    return "translate(" + s(u(e, t)) + "," + o(c(e, t)) + ")"
                }).attr("fill", function(e, t) {
                    return g[0]
                }).attr("stroke", function(e, t) {
                    return g[0]
                }).attr("x", 0).attr("y", function(e, t) {
                    return o(Math.max(0, a(e, t)))
                }).attr("height", function(e, t) {
                    return Math.abs(o(a(e, t)) - o(0))
                });
                _.attr("class", function(e, t, n) {
                    return (f(e, t) > l(e, t) ? "nv-tick negative" : "nv-tick positive") + " nv-tick-" + n + "-" + t
                }),
                d3.transition(_).attr("transform", function(e, t) {
                    return "translate(" + s(u(e, t)) + "," + o(c(e, t)) + ")"
                }).attr("d", function(e, t) {
                    var n = N / y[0].values.length * .9;
                    return "m0,0l0," + (o(f(e, t)) - o(c(e, t))) + "l" + -n / 2 + ",0l" + n / 2 + ",0l0," + (o(h(e, t)) - o(f(e, t))) + "l0," + (o(l(e, t)) - o(h(e, t))) + "l" + n / 2 + ",0l" + -n / 2 + ",0z"
                })
            }),
            T
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = null, r = null, i = Math.floor(Math.random() * 1e4), s = d3.scale.linear(), o = d3.scale.linear(), u = function(e) {
            return e.x
        }, a = function(e) {
            return e.y
        }, f = function(e) {
            return e.open
        }, l = function(e) {
            return e.close
        }, c = function(e) {
            return e.high
        }, h = function(e) {
            return e.low
        }, p = [], d = [], v = !1, m = !0, g = e.utils.defaultColor(), y = !1, b, w, E, S, x = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd", "chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout");
        return T.highlightPoint = function(e, t) {
            T.clearHighlights(),
            d3.select(".nv-ohlcBar .nv-tick-0-" + e).classed("hover", t)
        }
        ,
        T.clearHighlights = function() {
            d3.select(".nv-ohlcBar .nv-tick.hover").classed("hover", !1)
        }
        ,
        T.dispatch = x,
        T.options = e.utils.optionsFunc.bind(T),
        T._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            xScale: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            yScale: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            xDomain: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            yDomain: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            xRange: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            yRange: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            forceX: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            forceY: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            padData: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            clipEdge: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            id: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            interactive: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            x: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            y: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            open: {
                get: function() {
                    return f()
                },
                set: function(e) {
                    f = e
                }
            },
            close: {
                get: function() {
                    return l()
                },
                set: function(e) {
                    l = e
                }
            },
            high: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            low: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top != undefined ? e.top : t.top,
                    t.right = e.right != undefined ? e.right : t.right,
                    t.bottom = e.bottom != undefined ? e.bottom : t.bottom,
                    t.left = e.left != undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return g
                },
                set: function(t) {
                    g = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(T),
        T
    }
    ,
    e.models.parallelCoordinates = function() {
        "use strict";
        function c(h) {
            return h.each(function(h) {
                function k(e) {
                    return E(o.map(function(t) {
                        return [i(t), s[t](e[t])]
                    }))
                }
                function L() {
                    var e = o.filter(function(e) {
                        return !s[e].brush.empty()
                    })
                      , t = e.map(function(e) {
                        return s[e].brush.extent()
                    });
                    a = [],
                    e.forEach(function(e, n) {
                        a[n] = {
                            dimension: e,
                            extent: t[n]
                        }
                    }),
                    f = [],
                    N.style("display", function(n) {
                        var r = e.every(function(e, r) {
                            return t[r][0] <= n[e] && n[e] <= t[r][1]
                        });
                        return r && f.push(n),
                        r ? null : "none"
                    }),
                    l.brush({
                        filters: a,
                        active: f
                    })
                }
                var p = d3.select(this)
                  , d = (n || parseInt(p.style("width")) || 960) - t.left - t.right
                  , v = (r || parseInt(p.style("height")) || 400) - t.top - t.bottom;
                e.utils.initSVG(p),
                f = h,
                c.update = function() {}
                ,
                i.rangePoints([0, d], 1).domain(o),
                o.forEach(function(e) {
                    return s[e] = d3.scale.linear().domain(d3.extent(h, function(t) {
                        return +t[e]
                    })).range([v, 0]),
                    s[e].brush = d3.svg.brush().y(s[e]).on("brush", L),
                    e != "name"
                });
                var m = p.selectAll("g.nv-wrap.nv-parallelCoordinates").data([h])
                  , g = m.enter().append("g").attr("class", "nvd3 nv-wrap nv-parallelCoordinates")
                  , b = g.append("g")
                  , w = m.select("g");
                b.append("g").attr("class", "nv-parallelCoordinatesWrap"),
                m.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var E = d3.svg.line(), S = d3.svg.axis().orient("left"), T, N;
                T = b.append("g").attr("class", "background").selectAll("path").data(h).enter().append("path").attr("d", k),
                N = b.append("g").attr("class", "foreground").selectAll("path").data(h).enter().append("path").attr("d", k).attr("stroke", u);
                var C = w.selectAll(".dimension").data(o).enter().append("g").attr("class", "dimension").attr("transform", function(e) {
                    return "translate(" + i(e) + ",0)"
                });
                C.append("g").attr("class", "axis").each(function(e) {
                    d3.select(this).call(S.scale(s[e]))
                }).append("text").attr("text-anchor", "middle").attr("y", -9).text(String),
                C.append("g").attr("class", "brush").each(function(e) {
                    d3.select(this).call(s[e].brush)
                }).selectAll("rect").attr("x", -8).attr("width", 16)
            }),
            c
        }
        var t = {
            top: 30,
            right: 10,
            bottom: 10,
            left: 10
        }
          , n = null
          , r = null
          , i = d3.scale.ordinal()
          , s = {}
          , o = []
          , u = e.utils.defaultColor()
          , a = []
          , f = []
          , l = d3.dispatch("brush");
        return c.dispatch = l,
        c.options = e.utils.optionsFunc.bind(c),
        c._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            dimensions: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = typeof e.top != "undefined" ? e.top : t.top,
                    t.right = typeof e.right != "undefined" ? e.right : t.right,
                    t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom,
                    t.left = typeof e.left != "undefined" ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return u
                },
                set: function(t) {
                    u = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(c),
        c
    }
    ,
    e.models.pie = function() {
        "use strict";
        function A(a) {
            return L.reset(),
            a.each(function(a) {
                function G(e) {
                    var t = (e.startAngle + e.endAngle) * 90 / Math.PI - 90;
                    return t > 90 ? t - 180 : t
                }
                function Y(e) {
                    e.endAngle = isNaN(e.endAngle) ? 0 : e.endAngle,
                    e.startAngle = isNaN(e.startAngle) ? 0 : e.startAngle,
                    m || (e.innerRadius = 0);
                    var t = d3.interpolate(this._current, e);
                    return this._current = t(0),
                    function(e) {
                        return F(t(e))
                    }
                }
                var C = n - t.left - t.right
                  , A = r - t.top - t.bottom
                  , O = Math.min(C, A) / 2
                  , M = O - O / 5
                  , _ = d3.select(this);
                e.utils.initSVG(_);
                var D = _.selectAll(".nv-wrap.nv-pie").data(a)
                  , P = D.enter().append("g").attr("class", "nvd3 nv-wrap nv-pie nv-chart-" + o)
                  , H = P.append("g")
                  , B = D.select("g")
                  , j = H.append("g").attr("class", "nv-pie");
                H.append("g").attr("class", "nv-pieLabels"),
                D.attr("transform", "translate(" + t.left + "," + t.top + ")"),
                B.select(".nv-pie").attr("transform", "translate(" + C / 2 + "," + A / 2 + ")"),
                B.select(".nv-pieLabels").attr("transform", "translate(" + C / 2 + "," + A / 2 + ")"),
                _.on("click", function(e, t) {
                    k.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: o
                    })
                });
                var F = d3.svg.arc().outerRadius(M)
                  , I = d3.svg.arc().outerRadius(M + 5);
                E && (F.startAngle(E),
                I.startAngle(E)),
                x && (F.endAngle(x),
                I.endAngle(x)),
                m && (F.innerRadius(O * N),
                I.innerRadius(O * N));
                var q = d3.layout.pie().sort(null).value(function(e) {
                    return e.disabled ? 0 : s(e)
                });
                q.padAngle && S && q.padAngle(S),
                F.cornerRadius && T && (F.cornerRadius(T),
                I.cornerRadius(T));
                if (m && g) {
                    var R = j.append("g").attr("class", "nv-pie");
                    R.append("text").style("text-anchor", "middle").attr("class", "nv-pie-title").text(function(e) {
                        return g
                    }).attr("dy", "0.35em").attr("transform", function(e, t) {
                        return "translate(0, " + b + ")"
                    })
                }
                var U = D.select(".nv-pie").selectAll(".nv-slice").data(q)
                  , z = D.select(".nv-pieLabels").selectAll(".nv-label").data(q);
                U.exit().remove(),
                z.exit().remove();
                var W = U.enter().append("g");
                W.attr("class", "nv-slice"),
                W.on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0),
                    y && d3.select(this).select("path").transition().duration(70).attr("d", I),
                    k.elementMouseover({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        pointIndex: t,
                        pos: [d3.event.pageX, d3.event.pageY],
                        id: o,
                        color: d3.select(this).style("fill")
                    })
                }),
                W.on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    y && d3.select(this).select("path").transition().duration(50).attr("d", F),
                    k.elementMouseout({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        id: o
                    })
                }),
                U.attr("fill", function(e, t) {
                    return u(e, t)
                }),
                U.attr("stroke", function(e, t) {
                    return u(e, t)
                });
                var X = W.append("path").each(function(e) {
                    this._current = e
                });
                X.on("click", function(e, t) {
                    k.elementClick({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        pos: d3.event,
                        id: o
                    }),
                    d3.event.stopPropagation()
                }),
                X.on("dblclick", function(e, t) {
                    k.elementDblClick({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        pos: d3.event,
                        id: o
                    }),
                    d3.event.stopPropagation()
                }),
                U.select("path").transition().attr("d", F).attrTween("d", Y);
                if (l) {
                    var V = d3.svg.arc().innerRadius(0);
                    if (c)
                        var V = F;
                    h && (V = d3.svg.arc().outerRadius(F.outerRadius())),
                    z.enter().append("g").classed("nv-label", !0).each(function(e, t) {
                        var n = d3.select(this);
                        n.attr("transform", function(e) {
                            if (w) {
                                e.outerRadius = M + 10,
                                e.innerRadius = M + 15;
                                var t = (e.startAngle + e.endAngle) / 2 * (180 / Math.PI);
                                return (e.startAngle + e.endAngle) / 2 < Math.PI ? t -= 90 : t += 90,
                                "translate(" + V.centroid(e) + ") rotate(" + t + ")"
                            }
                            return e.outerRadius = O + 10,
                            e.innerRadius = O + 15,
                            "translate(" + V.centroid(e) + ")"
                        }),
                        n.append("rect").style("stroke", "#fff").style("fill", "#fff").attr("rx", 3).attr("ry", 3),
                        n.append("text").style("text-anchor", w ? (e.startAngle + e.endAngle) / 2 < Math.PI ? "start" : "end" : "middle").style("fill", "#000")
                    });
                    var $ = {}
                      , J = 14
                      , K = 140
                      , Q = function(e) {
                        return Math.floor(e[0] / K) * K + "," + Math.floor(e[1] / J) * J
                    };
                    z.watchTransition(L, "pie labels").attr("transform", function(e) {
                        if (w) {
                            e.outerRadius = M + 10,
                            e.innerRadius = M + 15;
                            var t = (e.startAngle + e.endAngle) / 2 * (180 / Math.PI);
                            return (e.startAngle + e.endAngle) / 2 < Math.PI ? t -= 90 : t += 90,
                            "translate(" + V.centroid(e) + ") rotate(" + t + ")"
                        }
                        e.outerRadius = O + 10,
                        e.innerRadius = O + 15;
                        var n = V.centroid(e);
                        if (e.value) {
                            var r = Q(n);
                            $[r] && (n[1] -= J),
                            $[Q(n)] = !0
                        }
                        return "translate(" + n + ")"
                    }),
                    z.select(".nv-label text").style("text-anchor", w ? (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end" : "middle").text(function(e, t) {
                        var n = (e.endAngle - e.startAngle) / (2 * Math.PI)
                          , r = {
                            key: i(e.data),
                            value: s(e.data),
                            percent: f(n)
                        };
                        return e.value && n > v ? r[p] : ""
                    })
                }
            }),
            L.renderEnd("pie immediate"),
            A
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
          , n = 500
          , r = 500
          , i = function(e) {
            return e.x
        }
          , s = function(e) {
            return e.y
        }
          , o = Math.floor(Math.random() * 1e4)
          , u = e.utils.defaultColor()
          , a = d3.format(",.2f")
          , f = d3.format("%")
          , l = !0
          , c = !0
          , h = !1
          , p = "key"
          , v = .02
          , m = !1
          , g = !1
          , y = !0
          , b = 0
          , w = !1
          , E = !1
          , S = !1
          , x = !1
          , T = 0
          , N = .5
          , C = 250
          , k = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "renderEnd")
          , L = e.utils.renderWatch(k);
        return A.dispatch = k,
        A.options = e.utils.optionsFunc.bind(A),
        A._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            showLabels: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            title: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            titleOffset: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            labelThreshold: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            labelFormat: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            valueFormat: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            x: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            id: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            endAngle: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e
                }
            },
            startAngle: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            padAngle: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            cornerRadius: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            donutRatio: {
                get: function() {
                    return N
                },
                set: function(e) {
                    N = e
                }
            },
            pieLabelsOutside: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            donutLabelsOutside: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            labelSunbeamLayout: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            donut: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            growOnHover: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = typeof e.top != "undefined" ? e.top : t.top,
                    t.right = typeof e.right != "undefined" ? e.right : t.right,
                    t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom,
                    t.left = typeof e.left != "undefined" ? e.left : t.left
                }
            },
            y: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = d3.functor(e)
                }
            },
            color: {
                get: function() {
                    return u
                },
                set: function(t) {
                    u = e.utils.getColor(t)
                }
            },
            labelType: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e || "key"
                }
            }
        }),
        e.utils.initOptions(A),
        A
    }
    ,
    e.models.pieChart = function() {
        "use strict";
        function b(u) {
            return m.reset(),
            m.models(t),
            u.each(function(u) {
                var a = d3.select(this);
                e.utils.initSVG(a);
                var f = this
                  , p = (i || parseInt(a.style("width"), 10) || 960) - r.left - r.right
                  , v = (s || parseInt(a.style("height"), 10) || 400) - r.top - r.bottom;
                b.update = function() {
                    a.transition().call(b)
                }
                ,
                b.container = this,
                l.setter(y(u), b.update).getter(g(u)).update(),
                l.disabled = u.map(function(e) {
                    return !!e.disabled
                });
                if (!c) {
                    var m;
                    c = {};
                    for (m in l)
                        l[m]instanceof Array ? c[m] = l[m].slice(0) : c[m] = l[m]
                }
                if (!u || !u.length) {
                    var w = a.selectAll(".nv-noData").data([h]);
                    return w.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    w.attr("x", r.left + p / 2).attr("y", r.top + v / 2).text(function(e) {
                        return e
                    }),
                    b
                }
                a.selectAll(".nv-noData").remove();
                var E = a.selectAll("g.nv-wrap.nv-pieChart").data([u])
                  , S = E.enter().append("g").attr("class", "nvd3 nv-wrap nv-pieChart").append("g")
                  , x = E.select("g");
                S.append("g").attr("class", "nv-pieWrap"),
                S.append("g").attr("class", "nv-legendWrap"),
                o && (n.width(p).key(t.x()),
                E.select(".nv-legendWrap").datum(u).call(n),
                r.top != n.height() && (r.top = n.height(),
                v = (s || parseInt(a.style("height")) || 400) - r.top - r.bottom),
                E.select(".nv-legendWrap").attr("transform", "translate(0," + -r.top + ")")),
                E.attr("transform", "translate(" + r.left + "," + r.top + ")"),
                t.width(p).height(v);
                var T = x.select(".nv-pieWrap").datum([u]);
                d3.transition(T).call(t),
                n.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        l[t] = e[t];
                    d.stateChange(l),
                    b.update()
                }),
                t.dispatch.on("elementMouseout.tooltip", function(e) {
                    d.tooltipHide(e)
                }),
                d.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (u.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    l.disabled = e.disabled),
                    b.update()
                })
            }),
            m.renderEnd("pieChart immediate"),
            b
        }
        var t = e.models.pie()
          , n = e.models.legend()
          , r = {
            top: 30,
            right: 20,
            bottom: 20,
            left: 20
        }
          , i = null
          , s = null
          , o = !0
          , u = e.utils.defaultColor()
          , a = !0
          , f = function(e, t, n, r) {
            return '<h3 style="background-color: ' + n.color + '">' + e + "</h3>" + "<p>" + t + "</p>"
        }
          , l = e.utils.state()
          , c = null
          , h = "No Data Available."
          , p = 250
          , d = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd")
          , v = function(n, r) {
            var i = t.x()(n.point)
              , s = n.pos[0] + (r && r.offsetLeft || 0)
              , o = n.pos[1] + (r && r.offsetTop || 0)
              , u = t.valueFormat()(t.y()(n.point))
              , a = f(i, u, n, b);
            e.tooltip.show([s, o], a, n.value < 0 ? "n" : "s", null, r)
        }
          , m = e.utils.renderWatch(d)
          , g = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    })
                }
            }
        }
          , y = function(e) {
            return function(t) {
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + r.left, e.pos[1] + r.top],
            d.tooltipShow(e)
        }),
        d.on("tooltipShow", function(e) {
            a && v(e)
        }),
        d.on("tooltipHide", function() {
            a && e.tooltip.cleanup()
        }),
        b.legend = n,
        b.dispatch = d,
        b.pie = t,
        b.options = e.utils.optionsFunc.bind(b),
        b._options = Object.create({}, {
            noData: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            tooltipContent: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            tooltips: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            showLegend: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            defaultState: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            color: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e,
                    n.color(u),
                    t.color(u)
                }
            },
            duration: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e,
                    m.reset(p)
                }
            }
        }),
        e.utils.inheritOptions(b, t),
        e.utils.initOptions(b),
        b
    }
    ,
    e.models.scatter = function() {
        "use strict";
        function I(_) {
            return F.reset(),
            _.each(function(_) {
                function K() {
                    if (!m)
                        return !1;
                    var e, i = d3.merge(_.map(function(e, t) {
                        return e.values.map(function(e, n) {
                            var r = f(e, n)
                              , i = l(e, n);
                            return [o(r) + Math.random() * 1e-7, u(i) + Math.random() * 1e-7, t, n, e]
                        }).filter(function(e, t) {
                            return g(e[4], t)
                        })
                    }));
                    if (M === !0) {
                        i.length < 3 && (i.push([o.range()[0] - 20, u.range()[0] - 20, null, null]),
                        i.push([o.range()[1] + 20, u.range()[1] + 20, null, null]),
                        i.push([o.range()[0] - 20, u.range()[0] + 20, null, null]),
                        i.push([o.range()[1] + 20, u.range()[1] - 20, null, null]));
                        var s = d3.geom.polygon([[-10, -10], [-10, r + 10], [n + 10, r + 10], [n + 10, -10]])
                          , a = d3.geom.voronoi(i).map(function(e, t) {
                            return {
                                data: s.clip(e),
                                series: i[t][2],
                                point: i[t][3]
                            }
                        });
                        W.select(".nv-point-paths").selectAll("path").remove();
                        var c = W.select(".nv-point-paths").selectAll("path").data(a);
                        c.enter().append("svg:path").attr("d", function(e) {
                            return !e || !e.data || e.data.length === 0 ? "M 0 0" : "M" + e.data.join(",") + "Z"
                        }).attr("id", function(e, t) {
                            return "nv-path-" + t
                        }).attr("clip-path", function(e, t) {
                            return "url(#nv-clip-" + t + ")"
                        });
                        if (E) {
                            var h = W.append("svg:g").attr("id", "nv-point-clips");
                            h.selectAll("clipPath").data(i).enter().append("svg:clipPath").attr("id", function(e, t) {
                                return "nv-clip-" + t
                            }).append("svg:circle").attr("cx", function(e) {
                                return e[0]
                            }).attr("cy", function(e) {
                                return e[1]
                            }).attr("r", S)
                        }
                        var p = function(e, n) {
                            if (j)
                                return 0;
                            var r = _[e.series];
                            if (typeof r == "undefined")
                                return;
                            var i = r.values[e.point];
                            n({
                                point: i,
                                series: r,
                                pos: [o(f(i, e.point)) + t.left, u(l(i, e.point)) + t.top],
                                seriesIndex: e.series,
                                pointIndex: e.point
                            })
                        };
                        c.on("click", function(e) {
                            p(e, O.elementClick)
                        }).on("dblclick", function(e) {
                            p(e, O.elementDblClick)
                        }).on("mouseover", function(e) {
                            p(e, O.elementMouseover)
                        }).on("mouseout", function(e, t) {
                            p(e, O.elementMouseout)
                        })
                    } else
                        W.select(".nv-groups").selectAll(".nv-group").selectAll(".nv-point").on("click", function(e, n) {
                            if (j || !_[e.series])
                                return 0;
                            var r = _[e.series]
                              , i = r.values[n];
                            O.elementClick({
                                point: i,
                                series: r,
                                pos: [o(f(i, n)) + t.left, u(l(i, n)) + t.top],
                                seriesIndex: e.series,
                                pointIndex: n
                            })
                        }).on("mouseover", function(e, n) {
                            if (j || !_[e.series])
                                return 0;
                            var r = _[e.series]
                              , i = r.values[n];
                            O.elementMouseover({
                                point: i,
                                series: r,
                                pos: [o(f(i, n)) + t.left, u(l(i, n)) + t.top],
                                seriesIndex: e.series,
                                pointIndex: n
                            })
                        }).on("mouseout", function(e, t) {
                            if (j || !_[e.series])
                                return 0;
                            var n = _[e.series]
                              , r = n.values[t];
                            O.elementMouseout({
                                point: r,
                                series: n,
                                seriesIndex: e.series,
                                pointIndex: t
                            })
                        });
                    j = !1
                }
                var I = d3.select(this)
                  , q = (n || parseInt(I.style("width")) || 960) - t.left - t.right
                  , R = (r || parseInt(I.style("height")) || 400) - t.top - t.bottom;
                e.utils.initSVG(I),
                _.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                });
                var U = x && T && k ? [] : d3.merge(_.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: f(e, t),
                            y: l(e, t),
                            size: c(e, t)
                        }
                    })
                }));
                o.domain(x || d3.extent(U.map(function(e) {
                    return e.x
                }).concat(p))),
                y && _[0] ? o.range(N || [(q * b + q) / (2 * _[0].values.length), q - q * (1 + b) / (2 * _[0].values.length)]) : o.range(N || [0, q]),
                u.domain(T || d3.extent(U.map(function(e) {
                    return e.y
                }).concat(d))).range(C || [R, 0]),
                a.domain(k || d3.extent(U.map(function(e) {
                    return e.size
                }).concat(v))).range(L || [16, 256]);
                if (o.domain()[0] === o.domain()[1] || u.domain()[0] === u.domain()[1])
                    A = !0;
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([o.domain()[0] - o.domain()[0] * .01, o.domain()[1] + o.domain()[1] * .01]) : o.domain([-1, 1])),
                u.domain()[0] === u.domain()[1] && (u.domain()[0] ? u.domain([u.domain()[0] - u.domain()[0] * .01, u.domain()[1] + u.domain()[1] * .01]) : u.domain([-1, 1])),
                isNaN(o.domain()[0]) && o.domain([-1, 1]),
                isNaN(u.domain()[0]) && u.domain([-1, 1]),
                D = D || o,
                P = P || u,
                H = H || a;
                var W = I.selectAll("g.nv-wrap.nv-scatter").data([_])
                  , X = W.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatter nv-chart-" + s + (A ? " nv-single-point" : ""))
                  , V = X.append("defs")
                  , $ = X.append("g")
                  , J = W.select("g");
                $.append("g").attr("class", "nv-groups"),
                $.append("g").attr("class", "nv-point-paths"),
                W.attr("transform", "translate(" + t.left + "," + t.top + ")"),
                V.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect"),
                W.select("#nv-edge-clip-" + s + " rect").attr("width", q).attr("height", R > 0 ? R : 0),
                J.attr("clip-path", w ? "url(#nv-edge-clip-" + s + ")" : ""),
                j = !0;
                var Q = W.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                Q.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6),
                Q.exit().remove(),
                Q.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }),
                Q.watchTransition(F, "scatter: groups").style("fill", function(e, t) {
                    return i(e, t)
                }).style("stroke", function(e, t) {
                    return i(e, t)
                }).style("stroke-opacity", 1).style("fill-opacity", .5);
                var G = Q.selectAll("path.nv-point").data(function(e) {
                    return e.values
                });
                G.enter().append("path").style("fill", function(e, t) {
                    return e.color
                }).style("stroke", function(e, t) {
                    return e.color
                }).attr("transform", function(e, t) {
                    return "translate(" + D(f(e, t)) + "," + P(l(e, t)) + ")"
                }).attr("d", e.utils.symbol().type(h).size(function(e, t) {
                    return a(c(e, t))
                })),
                G.exit().remove(),
                Q.exit().selectAll("path.nv-point").watchTransition(F, "scatter exit").attr("transform", function(e, t) {
                    return "translate(" + o(f(e, t)) + "," + u(l(e, t)) + ")"
                }).remove(),
                G.each(function(e, t) {
                    d3.select(this).classed("nv-point", !0).classed("nv-point-" + t, !0).classed("hover", !1)
                }),
                G.watchTransition(F, "scatter points").attr("transform", function(e, t) {
                    return "translate(" + o(f(e, t)) + "," + u(l(e, t)) + ")"
                }).attr("d", e.utils.symbol().type(h).size(function(e, t) {
                    return a(c(e, t))
                })),
                clearTimeout(B),
                B = setTimeout(K, 300),
                D = o.copy(),
                P = u.copy(),
                H = a.copy()
            }),
            F.renderEnd("scatter immediate"),
            I
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = null, r = null, i = e.utils.defaultColor(), s = Math.floor(Math.random() * 1e5), o = d3.scale.linear(), u = d3.scale.linear(), a = d3.scale.linear(), f = function(e) {
            return e.x
        }, l = function(e) {
            return e.y
        }, c = function(e) {
            return e.size || 1
        }, h = function(e) {
            return e.shape || "circle"
        }, p = [], d = [], v = [], m = !0, g = function(e) {
            return !e.notActive
        }, y = !1, b = .1, w = !1, E = !0, S = function() {
            return 25
        }, x = null, T = null, N = null, C = null, k = null, L = null, A = !1, O = d3.dispatch("elementClick", "elementDblClick", "elementMouseover", "elementMouseout", "renderEnd"), M = !0, _ = 250, D, P, H, B, j = !1, F = e.utils.renderWatch(O, _);
        return I.dispatch = O,
        I.options = e.utils.optionsFunc.bind(I),
        I._calls = new function() {
            this.clearHighlights = function() {
                return d3.selectAll(".nv-chart-" + s + " .nv-point.hover").classed("hover", !1),
                null
            }
            ,
            this.highlightPoint = function(e, t, n) {
                d3.select(".nv-chart-" + s + " .nv-series-" + e + " .nv-point-" + t).classed("hover", n)
            }
        }
        ,
        O.on("elementMouseover.point", function(e) {
            m && I._calls.highlightPoint(e.seriesIndex, e.pointIndex, !0)
        }),
        O.on("elementMouseout.point", function(e) {
            m && I._calls.highlightPoint(e.seriesIndex, e.pointIndex, !1)
        }),
        I._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            xScale: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            yScale: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = e
                }
            },
            pointScale: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            xDomain: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e
                }
            },
            yDomain: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            pointDomain: {
                get: function() {
                    return k
                },
                set: function(e) {
                    k = e
                }
            },
            xRange: {
                get: function() {
                    return N
                },
                set: function(e) {
                    N = e
                }
            },
            yRange: {
                get: function() {
                    return C
                },
                set: function(e) {
                    C = e
                }
            },
            pointRange: {
                get: function() {
                    return L
                },
                set: function(e) {
                    L = e
                }
            },
            forceX: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            forceY: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            forcePoint: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            interactive: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            pointActive: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            padDataOuter: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            padData: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            clipEdge: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            clipVoronoi: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            clipRadius: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            id: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            x: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = d3.functor(e)
                }
            },
            y: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = d3.functor(e)
                }
            },
            pointSize: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = d3.functor(e)
                }
            },
            pointShape: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = d3.functor(e)
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            duration: {
                get: function() {
                    return _
                },
                set: function(e) {
                    _ = e,
                    F.reset(_)
                }
            },
            color: {
                get: function() {
                    return i
                },
                set: function(t) {
                    i = e.utils.getColor(t)
                }
            },
            useVoronoi: {
                get: function() {
                    return M
                },
                set: function(e) {
                    M = e,
                    M === !1 && (E = !1)
                }
            }
        }),
        e.utils.initOptions(I),
        I
    }
    ,
    e.models.scatterChart = function() {
        "use strict";
        function P(w) {
            return O.reset(),
            O.models(t),
            m && O.models(n),
            g && O.models(r),
            p && O.models(s),
            d && O.models(o),
            w.each(function(w) {
                var E = d3.select(this)
                  , S = this;
                e.utils.initSVG(E);
                var H = (a || parseInt(E.style("width")) || 960) - u.left - u.right
                  , B = (f || parseInt(E.style("height")) || 400) - u.top - u.bottom;
                P.update = function() {
                    k === 0 ? E.call(P) : E.transition().duration(k).call(P)
                }
                ,
                P.container = this,
                x.setter(D(w), P.update).getter(_(w)).update(),
                x.disabled = w.map(function(e) {
                    return !!e.disabled
                });
                if (!T) {
                    var j;
                    T = {};
                    for (j in x)
                        x[j]instanceof Array ? T[j] = x[j].slice(0) : T[j] = x[j]
                }
                if (!w || !w.length || !w.filter(function(e) {
                    return e.values.length
                }).length) {
                    var F = E.selectAll(".nv-noData").data([C]);
                    return F.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    F.attr("x", u.left + H / 2).attr("y", u.top + B / 2).text(function(e) {
                        return e
                    }),
                    O.renderEnd("scatter immediate"),
                    P
                }
                E.selectAll(".nv-noData").remove(),
                c = t.xScale(),
                h = t.yScale();
                var I = E.selectAll("g.nv-wrap.nv-scatterChart").data([w])
                  , q = I.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatterChart nv-chart-" + t.id())
                  , R = q.append("g")
                  , U = I.select("g");
                R.append("rect").attr("class", "nvd3 nv-background").style("pointer-events", "none"),
                R.append("g").attr("class", "nv-x nv-axis"),
                R.append("g").attr("class", "nv-y nv-axis"),
                R.append("g").attr("class", "nv-scatterWrap"),
                R.append("g").attr("class", "nv-regressionLinesWrap"),
                R.append("g").attr("class", "nv-distWrap"),
                R.append("g").attr("class", "nv-legendWrap"),
                I.attr("transform", "translate(" + u.left + "," + u.top + ")"),
                y && U.select(".nv-y.nv-axis").attr("transform", "translate(" + H + ",0)"),
                v && (i.width(H / 2),
                I.select(".nv-legendWrap").datum(w).call(i),
                u.top != i.height() && (u.top = i.height(),
                B = (f || parseInt(E.style("height")) || 400) - u.top - u.bottom),
                I.select(".nv-legendWrap").attr("transform", "translate(" + H / 2 + "," + -u.top + ")")),
                t.width(H).height(B).color(w.map(function(e, t) {
                    return e.color || l(e, t)
                }).filter(function(e, t) {
                    return !w[t].disabled
                })),
                I.select(".nv-scatterWrap").datum(w.filter(function(e) {
                    return !e.disabled
                })).call(t),
                I.select(".nv-regressionLinesWrap").attr("clip-path", "url(#nv-edge-clip-" + t.id() + ")");
                var z = I.select(".nv-regressionLinesWrap").selectAll(".nv-regLines").data(function(e) {
                    return e
                });
                z.enter().append("g").attr("class", "nv-regLines");
                var W = z.selectAll(".nv-regLine").data(function(e) {
                    return [e]
                });
                W.enter().append("line").attr("class", "nv-regLine").style("stroke-opacity", 0),
                W.filter(function(e) {
                    return e.intercept && e.slope
                }).watchTransition(O, "scatterPlusLineChart: regline").attr("x1", c.range()[0]).attr("x2", c.range()[1]).attr("y1", function(e, t) {
                    return h(c.domain()[0] * e.slope + e.intercept)
                }).attr("y2", function(e, t) {
                    return h(c.domain()[1] * e.slope + e.intercept)
                }).style("stroke", function(e, t, n) {
                    return l(e, n)
                }).style("stroke-opacity", function(e, t) {
                    return e.disabled || typeof e.slope == "undefined" || typeof e.intercept == "undefined" ? 0 : 1
                }),
                m && (n.scale(c).ticks(n.ticks() ? n.ticks() : e.utils.calcTicksX(H / 100, w)).tickSize(-B, 0),
                U.select(".nv-x.nv-axis").attr("transform", "translate(0," + h.range()[0] + ")").call(n)),
                g && (r.scale(h).ticks(r.ticks() ? r.ticks() : e.utils.calcTicksY(B / 36, w)).tickSize(-H, 0),
                U.select(".nv-y.nv-axis").call(r)),
                p && (s.getData(t.x()).scale(c).width(H).color(w.map(function(e, t) {
                    return e.color || l(e, t)
                }).filter(function(e, t) {
                    return !w[t].disabled
                })),
                R.select(".nv-distWrap").append("g").attr("class", "nv-distributionX"),
                U.select(".nv-distributionX").attr("transform", "translate(0," + h.range()[0] + ")").datum(w.filter(function(e) {
                    return !e.disabled
                })).call(s)),
                d && (o.getData(t.y()).scale(h).width(B).color(w.map(function(e, t) {
                    return e.color || l(e, t)
                }).filter(function(e, t) {
                    return !w[t].disabled
                })),
                R.select(".nv-distWrap").append("g").attr("class", "nv-distributionY"),
                U.select(".nv-distributionY").attr("transform", "translate(" + (y ? H : -o.size()) + ",0)").datum(w.filter(function(e) {
                    return !e.disabled
                })).call(o)),
                i.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        x[t] = e[t];
                    N.stateChange(x),
                    P.update()
                }),
                t.dispatch.on("elementMouseover.tooltip", function(e) {
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", e.pos[1] - B),
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", e.pos[0] + s.size()),
                    e.pos = [e.pos[0] + u.left, e.pos[1] + u.top],
                    N.tooltipShow(e)
                }),
                N.on("tooltipShow", function(e) {
                    b && M(e, S.parentNode)
                }),
                N.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (w.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    x.disabled = e.disabled),
                    P.update()
                }),
                L = c.copy(),
                A = h.copy()
            }),
            O.renderEnd("scatter with line immediate"),
            P
        }
        var t = e.models.scatter()
          , n = e.models.axis()
          , r = e.models.axis()
          , i = e.models.legend()
          , s = e.models.distribution()
          , o = e.models.distribution()
          , u = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 75
        }
          , a = null
          , f = null
          , l = e.utils.defaultColor()
          , c = t.xScale()
          , h = t.yScale()
          , p = !1
          , d = !1
          , v = !0
          , m = !0
          , g = !0
          , y = !1
          , b = !0
          , w = function(e, t, n) {
            return "<strong>" + t + "</strong>"
        }
          , E = function(e, t, n) {
            return "<strong>" + n + "</strong>"
        }
          , S = function(e, t, n, r) {
            return "<h3>" + e + "</h3>" + "<p>" + r + "</p>"
        }
          , x = e.utils.state()
          , T = null
          , N = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd")
          , C = "No Data Available."
          , k = 250;
        t.xScale(c).yScale(h),
        n.orient("bottom").tickPadding(10),
        r.orient(y ? "right" : "left").tickPadding(10),
        s.axis("x"),
        o.axis("y");
        var L, A, O = e.utils.renderWatch(N, k), M = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , a = i.pos[1] + (s.offsetTop || 0)
              , f = i.pos[0] + (s.offsetLeft || 0)
              , l = h.range()[0] + u.top + (s.offsetTop || 0)
              , p = c.range()[0] + u.left + (s.offsetLeft || 0)
              , d = i.pos[1] + (s.offsetTop || 0)
              , v = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , m = r.tickFormat()(t.y()(i.point, i.pointIndex));
            w != null && e.tooltip.show([f, l], w(i.series.key, v, m, i, P), "n", 1, s, "x-nvtooltip"),
            E != null && e.tooltip.show([p, d], E(i.series.key, v, m, i, P), "e", 1, s, "y-nvtooltip"),
            S != null && e.tooltip.show([o, a], S(i.series.key, v, m, i.point.tooltip, i, P), i.value < 0 ? "n" : "s", null, s)
        }, _ = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    })
                }
            }
        }, D = function(e) {
            return function(t) {
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("elementMouseout.tooltip", function(e) {
            N.tooltipHide(e),
            d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", 0),
            d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", o.size())
        }),
        N.on("tooltipHide", function() {
            b && e.tooltip.cleanup()
        }),
        P.dispatch = N,
        P.scatter = t,
        P.legend = i,
        P.xAxis = n,
        P.yAxis = r,
        P.distX = s,
        P.distY = o,
        P._options = Object.create({}, {
            width: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            height: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            showDistX: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            showDistY: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            showLegend: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e
                }
            },
            showXAxis: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e
                }
            },
            showYAxis: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            tooltips: {
                get: function() {
                    return b
                },
                set: function(e) {
                    b = e
                }
            },
            tooltipContent: {
                get: function() {
                    return S
                },
                set: function(e) {
                    S = e
                }
            },
            tooltipXContent: {
                get: function() {
                    return w
                },
                set: function(e) {
                    w = e
                }
            },
            tooltipYContent: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            defaultState: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            noData: {
                get: function() {
                    return C
                },
                set: function(e) {
                    C = e
                }
            },
            duration: {
                get: function() {
                    return k
                },
                set: function(e) {
                    k = e
                }
            },
            margin: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u.top = e.top !== undefined ? e.top : u.top,
                    u.right = e.right !== undefined ? e.right : u.right,
                    u.bottom = e.bottom !== undefined ? e.bottom : u.bottom,
                    u.left = e.left !== undefined ? e.left : u.left
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e,
                    r.orient(e ? "right" : "left")
                }
            },
            color: {
                get: function() {
                    return l
                },
                set: function(t) {
                    l = e.utils.getColor(t),
                    i.color(l),
                    s.color(l),
                    o.color(l)
                }
            }
        }),
        e.utils.inheritOptions(P, t),
        e.utils.initOptions(P),
        P
    }
    ,
    e.models.sparkline = function() {
        "use strict";
        function d(i) {
            return i.each(function(i) {
                var d = n - t.left - t.right
                  , v = r - t.top - t.bottom
                  , m = d3.select(this);
                e.utils.initSVG(m),
                s.domain(l || d3.extent(i, u)).range(h || [0, d]),
                o.domain(c || d3.extent(i, a)).range(p || [v, 0]);
                var g = m.selectAll("g.nv-wrap.nv-sparkline").data([i])
                  , b = g.enter().append("g").attr("class", "nvd3 nv-wrap nv-sparkline")
                  , w = b.append("g")
                  , E = g.select("g");
                g.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var S = g.selectAll("path").data(function(e) {
                    return [e]
                });
                S.enter().append("path"),
                S.exit().remove(),
                S.style("stroke", function(e, t) {
                    return e.color || f(e, t)
                }).attr("d", d3.svg.line().x(function(e, t) {
                    return s(u(e, t))
                }).y(function(e, t) {
                    return o(a(e, t))
                }));
                var T = g.selectAll("circle.nv-point").data(function(e) {
                    function n(t) {
                        if (t != -1) {
                            var n = e[t];
                            return n.pointIndex = t,
                            n
                        }
                        return null
                    }
                    var t = e.map(function(e, t) {
                        return a(e, t)
                    })
                      , r = n(t.lastIndexOf(o.domain()[1]))
                      , i = n(t.indexOf(o.domain()[0]))
                      , s = n(t.length - 1);
                    return [i, r, s].filter(function(e) {
                        return e != null
                    })
                });
                T.enter().append("circle"),
                T.exit().remove(),
                T.attr("cx", function(e, t) {
                    return s(u(e, e.pointIndex))
                }).attr("cy", function(e, t) {
                    return o(a(e, e.pointIndex))
                }).attr("r", 2).attr("class", function(e, t) {
                    return u(e, e.pointIndex) == s.domain()[1] ? "nv-point nv-currentValue" : a(e, e.pointIndex) == o.domain()[0] ? "nv-point nv-minValue" : "nv-point nv-maxValue"
                })
            }),
            d
        }
        var t = {
            top: 2,
            right: 0,
            bottom: 2,
            left: 0
        }, n = 400, r = 32, i = !0, s = d3.scale.linear(), o = d3.scale.linear(), u = function(e) {
            return e.x
        }, a = function(e) {
            return e.y
        }, f = e.utils.getColor(["#000"]), l, c, h, p;
        return d.options = e.utils.optionsFunc.bind(d),
        d._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            xDomain: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            yDomain: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            xRange: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            yRange: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            xScale: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e
                }
            },
            yScale: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = e
                }
            },
            animate: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            x: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = d3.functor(e)
                }
            },
            y: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = d3.functor(e)
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return f
                },
                set: function(t) {
                    f = e.utils.getColor(t)
                }
            }
        }),
        e.utils.initOptions(d),
        d
    }
    ,
    e.models.sparklinePlus = function() {
        "use strict";
        function v(c) {
            return c.each(function(m) {
                function M() {
                    if (a)
                        return;
                    var e = k.selectAll(".nv-hoverValue").data(u)
                      , r = e.enter().append("g").attr("class", "nv-hoverValue").style("stroke-opacity", 0).style("fill-opacity", 0);
                    e.exit().transition().duration(250).style("stroke-opacity", 0).style("fill-opacity", 0).remove(),
                    e.attr("transform", function(e) {
                        return "translate(" + s(t.x()(m[e], e)) + ",0)"
                    }).transition().duration(250).style("stroke-opacity", 1).style("fill-opacity", 1);
                    if (!u.length)
                        return;
                    r.append("line").attr("x1", 0).attr("y1", -n.top).attr("x2", 0).attr("y2", w),
                    r.append("text").attr("class", "nv-xValue").attr("x", -6).attr("y", -n.top).attr("text-anchor", "end").attr("dy", ".9em"),
                    k.select(".nv-hoverValue .nv-xValue").text(f(t.x()(m[u[0]], u[0]))),
                    r.append("text").attr("class", "nv-yValue").attr("x", 6).attr("y", -n.top).attr("text-anchor", "start").attr("dy", ".9em"),
                    k.select(".nv-hoverValue .nv-yValue").text(l(t.y()(m[u[0]], u[0])))
                }
                function _() {
                    function r(e, n) {
                        var r = Math.abs(t.x()(e[0], 0) - n)
                          , i = 0;
                        for (var s = 0; s < e.length; s++)
                            Math.abs(t.x()(e[s], s) - n) < r && (r = Math.abs(t.x()(e[s], s) - n),
                            i = s);
                        return i
                    }
                    if (a)
                        return;
                    var e = d3.mouse(this)[0] - n.left;
                    u = [r(m, Math.round(s.invert(e)))],
                    M()
                }
                var g = d3.select(this);
                e.utils.initSVG(g);
                var b = (r || parseInt(g.style("width")) || 960) - n.left - n.right
                  , w = (i || parseInt(g.style("height")) || 400) - n.top - n.bottom;
                v.update = function() {
                    v(c)
                }
                ,
                v.container = this;
                if (!m || !m.length) {
                    var E = g.selectAll(".nv-noData").data([d]);
                    return E.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    E.attr("x", n.left + b / 2).attr("y", n.top + w / 2).text(function(e) {
                        return e
                    }),
                    v
                }
                g.selectAll(".nv-noData").remove();
                var S = t.y()(m[m.length - 1], m.length - 1);
                s = t.xScale(),
                o = t.yScale();
                var T = g.selectAll("g.nv-wrap.nv-sparklineplus").data([m])
                  , N = T.enter().append("g").attr("class", "nvd3 nv-wrap nv-sparklineplus")
                  , C = N.append("g")
                  , k = T.select("g");
                C.append("g").attr("class", "nv-sparklineWrap"),
                C.append("g").attr("class", "nv-valueWrap"),
                C.append("g").attr("class", "nv-hoverArea"),
                T.attr("transform", "translate(" + n.left + "," + n.top + ")");
                var L = k.select(".nv-sparklineWrap");
                t.width(b).height(w),
                L.call(t);
                var A = k.select(".nv-valueWrap")
                  , O = A.selectAll(".nv-currentValue").data([S]);
                O.enter().append("text").attr("class", "nv-currentValue").attr("dx", p ? -8 : 8).attr("dy", ".9em").style("text-anchor", p ? "end" : "start"),
                O.attr("x", b + (p ? n.right : 0)).attr("y", h ? function(e) {
                    return o(e)
                }
                : 0).style("fill", t.color()(m[m.length - 1], m.length - 1)).text(l(S)),
                C.select(".nv-hoverArea").append("rect").on("mousemove", _).on("click", function() {
                    a = !a
                }).on("mouseout", function() {
                    u = [],
                    M()
                }),
                k.select(".nv-hoverArea rect").attr("transform", function(e) {
                    return "translate(" + -n.left + "," + -n.top + ")"
                }).attr("width", b + n.left + n.right).attr("height", w + n.top)
            }),
            v
        }
        var t = e.models.sparkline(), n = {
            top: 15,
            right: 100,
            bottom: 10,
            left: 50
        }, r = null, i = null, s, o, u = [], a = !1, f = d3.format(",r"), l = d3.format(",.2f"), c = !0, h = !0, p = !1, d = "No Data Available.";
        return v.sparkline = t,
        v.options = e.utils.optionsFunc.bind(v),
        v._options = Object.create({}, {
            width: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            height: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e
                }
            },
            xTickFormat: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            yTickFormat: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            showValue: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            alignValue: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            rightAlignValue: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            noData: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            margin: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n.top = e.top !== undefined ? e.top : n.top,
                    n.right = e.right !== undefined ? e.right : n.right,
                    n.bottom = e.bottom !== undefined ? e.bottom : n.bottom,
                    n.left = e.left !== undefined ? e.left : n.left
                }
            }
        }),
        e.utils.inheritOptions(v, t),
        e.utils.initOptions(v),
        v
    }
    ,
    e.models.stackedArea = function() {
        "use strict";
        function b(a) {
            return y.reset(),
            y.models(v),
            a.each(function(a) {
                var m = n - t.left - t.right
                  , w = r - t.top - t.bottom
                  , E = d3.select(this);
                e.utils.initSVG(E),
                p = v.xScale(),
                d = v.yScale();
                var S = a;
                a.forEach(function(e, t) {
                    e.seriesIndex = t,
                    e.values = e.values.map(function(e, n) {
                        return e.index = n,
                        e.seriesIndex = t,
                        e
                    })
                });
                var T = a.filter(function(e) {
                    return !e.disabled
                });
                a = d3.layout.stack().order(l).offset(f).values(function(e) {
                    return e.values
                }).x(o).y(u).out(function(e, t, n) {
                    var r = u(e) === 0 ? 0 : n;
                    e.display = {
                        y: r,
                        y0: t
                    }
                })(T);
                var N = E.selectAll("g.nv-wrap.nv-stackedarea").data([a])
                  , C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-stackedarea")
                  , k = C.append("defs")
                  , L = C.append("g")
                  , A = N.select("g");
                L.append("g").attr("class", "nv-areaWrap"),
                L.append("g").attr("class", "nv-scatterWrap"),
                N.attr("transform", "translate(" + t.left + "," + t.top + ")"),
                v.width(m).height(w).x(o).y(function(e) {
                    return e.display.y + e.display.y0
                }).forceY([0]).color(a.map(function(e, t) {
                    return e.color || i(e, e.seriesIndex)
                }));
                var O = A.select(".nv-scatterWrap").datum(a);
                O.call(v),
                k.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect"),
                N.select("#nv-edge-clip-" + s + " rect").attr("width", m).attr("height", w),
                A.attr("clip-path", h ? "url(#nv-edge-clip-" + s + ")" : "");
                var M = d3.svg.area().x(function(e, t) {
                    return p(o(e, t))
                }).y0(function(e) {
                    return d(e.display.y0)
                }).y1(function(e) {
                    return d(e.display.y + e.display.y0)
                }).interpolate(c)
                  , _ = d3.svg.area().x(function(e, t) {
                    return p(o(e, t))
                }).y0(function(e) {
                    return d(e.display.y0)
                }).y1(function(e) {
                    return d(e.display.y0)
                })
                  , D = A.select(".nv-areaWrap").selectAll("path.nv-area").data(function(e) {
                    return e
                });
                D.enter().append("path").attr("class", function(e, t) {
                    return "nv-area nv-area-" + t
                }).attr("d", function(e, t) {
                    return _(e.values, e.seriesIndex)
                }).on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0),
                    g.areaMouseover({
                        point: e,
                        series: e.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: e.seriesIndex
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    g.areaMouseout({
                        point: e,
                        series: e.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: e.seriesIndex
                    })
                }).on("click", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    g.areaClick({
                        point: e,
                        series: e.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: e.seriesIndex
                    })
                }),
                D.exit().remove(),
                D.style("fill", function(e, t) {
                    return e.color || i(e, e.seriesIndex)
                }).style("stroke", function(e, t) {
                    return e.color || i(e, e.seriesIndex)
                }),
                D.watchTransition(y, "stackedArea path").attr("d", function(e, t) {
                    return M(e.values, t)
                }),
                v.dispatch.on("elementMouseover.area", function(e) {
                    A.select(".nv-chart-" + s + " .nv-area-" + e.seriesIndex).classed("hover", !0)
                }),
                v.dispatch.on("elementMouseout.area", function(e) {
                    A.select(".nv-chart-" + s + " .nv-area-" + e.seriesIndex).classed("hover", !1)
                }),
                b.d3_stackedOffset_stackPercent = function(e) {
                    var t = e.length, n = e[0].length, r = 1 / t, i, s, o, a = [];
                    for (s = 0; s < n; ++s) {
                        for (i = 0,
                        o = 0; i < S.length; i++)
                            o += u(S[i].values[s]);
                        if (o)
                            for (i = 0; i < t; i++)
                                e[i][s][1] /= o;
                        else
                            for (i = 0; i < t; i++)
                                e[i][s][1] = r
                    }
                    for (s = 0; s < n; ++s)
                        a[s] = 0;
                    return a
                }
            }),
            y.renderEnd("stackedArea immediate"),
            b
        }
        var t = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, n = 960, r = 500, i = e.utils.defaultColor(), s = Math.floor(Math.random() * 1e5), o = function(e) {
            return e.x
        }, u = function(e) {
            return e.y
        }, a = "stack", f = "zero", l = "default", c = "linear", h = !1, p, d, v = e.models.scatter(), m = 250, g = d3.dispatch("tooltipShow", "tooltipHide", "areaClick", "areaMouseover", "areaMouseout", "renderEnd");
        v.interactive(!1),
        v.pointSize(2.2).pointDomain([2.2, 2.2]);
        var y = e.utils.renderWatch(g, m);
        return v.dispatch.on("elementClick.area", function(e) {
            g.areaClick(e)
        }),
        v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top],
            g.tooltipShow(e)
        }),
        v.dispatch.on("elementMouseout.tooltip", function(e) {
            g.tooltipHide(e)
        }),
        b.dispatch = g,
        b.scatter = v,
        b.interpolate = function(e) {
            return arguments.length ? (c = e,
            b) : c
        }
        ,
        b.duration = function(e) {
            return arguments.length ? (m = e,
            y.reset(m),
            v.duration(m),
            b) : m
        }
        ,
        b.dispatch = g,
        b.options = e.utils.optionsFunc.bind(b),
        b._options = Object.create({}, {
            width: {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e
                }
            },
            height: {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e
                }
            },
            clipEdge: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            offset: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            order: {
                get: function() {
                    return l
                },
                set: function(e) {
                    l = e
                }
            },
            interpolate: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            x: {
                get: function() {
                    return o
                },
                set: function(e) {
                    o = d3.functor(e)
                }
            },
            y: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u = d3.functor(e)
                }
            },
            margin: {
                get: function() {
                    return t
                },
                set: function(e) {
                    t.top = e.top !== undefined ? e.top : t.top,
                    t.right = e.right !== undefined ? e.right : t.right,
                    t.bottom = e.bottom !== undefined ? e.bottom : t.bottom,
                    t.left = e.left !== undefined ? e.left : t.left
                }
            },
            color: {
                get: function() {
                    return i
                },
                set: function(t) {
                    i = e.utils.getColor(t)
                }
            },
            style: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e;
                    switch (a) {
                    case "stack":
                        b.offset("zero"),
                        b.order("default");
                        break;
                    case "stream":
                        b.offset("wiggle"),
                        b.order("inside-out");
                        break;
                    case "stream-center":
                        b.offset("silhouette"),
                        b.order("inside-out");
                        break;
                    case "expand":
                        b.offset("expand"),
                        b.order("default");
                        break;
                    case "stack_percent":
                        b.offset(b.d3_stackedOffset_stackPercent),
                        b.order("default")
                    }
                }
            },
            duration: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = e,
                    y.reset(m),
                    v.duration(m)
                }
            }
        }),
        e.utils.inheritOptions(b, v),
        e.utils.initOptions(b),
        b
    }
    ,
    e.models.stackedAreaChart = function() {
        "use strict";
        function H(y) {
            return O.reset(),
            O.models(t),
            p && O.models(n),
            d && O.models(r),
            y.each(function(y) {
                var O = d3.select(this)
                  , B = this;
                e.utils.initSVG(O);
                var j = (a || parseInt(O.style("width")) || 960) - u.left - u.right
                  , F = (f || parseInt(O.style("height")) || 400) - u.top - u.bottom;
                H.update = function() {
                    O.transition().duration(A).call(H)
                }
                ,
                H.container = this,
                S.setter(P(y), H.update).getter(D(y)).update(),
                S.disabled = y.map(function(e) {
                    return !!e.disabled
                });
                if (!x) {
                    var I;
                    x = {};
                    for (I in S)
                        S[I]instanceof Array ? x[I] = S[I].slice(0) : x[I] = S[I]
                }
                if (!y || !y.length || !y.filter(function(e) {
                    return e.values.length
                }).length) {
                    var q = O.selectAll(".nv-noData").data([T]);
                    return q.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    q.attr("x", u.left + j / 2).attr("y", u.top + F / 2).text(function(e) {
                        return e
                    }),
                    H
                }
                O.selectAll(".nv-noData").remove(),
                b = t.xScale(),
                w = t.yScale();
                var R = O.selectAll("g.nv-wrap.nv-stackedAreaChart").data([y])
                  , U = R.enter().append("g").attr("class", "nvd3 nv-wrap nv-stackedAreaChart").append("g")
                  , z = R.select("g");
                U.append("rect").style("opacity", 0),
                U.append("g").attr("class", "nv-x nv-axis"),
                U.append("g").attr("class", "nv-y nv-axis"),
                U.append("g").attr("class", "nv-stackedWrap"),
                U.append("g").attr("class", "nv-legendWrap"),
                U.append("g").attr("class", "nv-controlsWrap"),
                U.append("g").attr("class", "nv-interactive"),
                z.select("rect").attr("width", j).attr("height", F);
                if (h) {
                    var W = c ? j - C : j;
                    i.width(W),
                    z.select(".nv-legendWrap").datum(y).call(i),
                    u.top != i.height() && (u.top = i.height(),
                    F = (f || parseInt(O.style("height")) || 400) - u.top - u.bottom),
                    z.select(".nv-legendWrap").attr("transform", "translate(" + (j - W) + "," + -u.top + ")")
                }
                if (c) {
                    var X = [{
                        key: L.stacked || "Stacked",
                        metaKey: "Stacked",
                        disabled: t.style() != "stack",
                        style: "stack"
                    }, {
                        key: L.stream || "Stream",
                        metaKey: "Stream",
                        disabled: t.style() != "stream",
                        style: "stream"
                    }, {
                        key: L.expanded || "Expanded",
                        metaKey: "Expanded",
                        disabled: t.style() != "expand",
                        style: "expand"
                    }, {
                        key: L.stack_percent || "Stack %",
                        metaKey: "Stack_Percent",
                        disabled: t.style() != "stack_percent",
                        style: "stack_percent"
                    }];
                    C = k.length / 3 * 260,
                    X = X.filter(function(e) {
                        return k.indexOf(e.metaKey) !== -1
                    }),
                    s.width(C).color(["#444", "#444", "#444"]),
                    z.select(".nv-controlsWrap").datum(X).call(s),
                    u.top != Math.max(s.height(), i.height()) && (u.top = Math.max(s.height(), i.height()),
                    F = (f || parseInt(O.style("height")) || 400) - u.top - u.bottom),
                    z.select(".nv-controlsWrap").attr("transform", "translate(0," + -u.top + ")")
                }
                R.attr("transform", "translate(" + u.left + "," + u.top + ")"),
                v && z.select(".nv-y.nv-axis").attr("transform", "translate(" + j + ",0)"),
                m && (o.width(j).height(F).margin({
                    left: u.left,
                    top: u.top
                }).svgContainer(O).xScale(b),
                R.select(".nv-interactive").call(o)),
                t.width(j).height(F);
                var V = z.select(".nv-stackedWrap").datum(y);
                V.transition().call(t),
                p && (n.scale(b).ticks(e.utils.calcTicksX(j / 100, y)).tickSize(-F, 0),
                z.select(".nv-x.nv-axis").attr("transform", "translate(0," + F + ")"),
                z.select(".nv-x.nv-axis").transition().duration(0).call(n)),
                d && (r.scale(w).ticks(t.offset() == "wiggle" ? 0 : e.utils.calcTicksY(F / 36, y)).tickSize(-j, 0).setTickFormat(t.style() == "expand" || t.style() == "stack_percent" ? d3.format("%") : E),
                z.select(".nv-y.nv-axis").transition().duration(0).call(r)),
                t.dispatch.on("areaClick.toggle", function(e) {
                    y.filter(function(e) {
                        return !e.disabled
                    }).length === 1 ? y.forEach(function(e) {
                        e.disabled = !1
                    }) : y.forEach(function(t, n) {
                        t.disabled = n != e.seriesIndex
                    }),
                    S.disabled = y.map(function(e) {
                        return !!e.disabled
                    }),
                    N.stateChange(S),
                    H.update()
                }),
                i.dispatch.on("stateChange", function(e) {
                    for (var t in e)
                        S[t] = e[t];
                    N.stateChange(S),
                    H.update()
                }),
                s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled)
                        return;
                    X = X.map(function(e) {
                        return e.disabled = !0,
                        e
                    }),
                    e.disabled = !1,
                    t.style(e.style),
                    S.style = t.style(),
                    N.stateChange(S),
                    H.update()
                }),
                o.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var s, a, f, c = [];
                    y.filter(function(e, t) {
                        return e.seriesIndex = t,
                        !e.disabled
                    }).forEach(function(n, r) {
                        a = e.interactiveBisect(n.values, i.pointXValue, H.x()),
                        t.highlightPoint(r, a, !0);
                        var o = n.values[a];
                        if (typeof o == "undefined")
                            return;
                        typeof s == "undefined" && (s = o),
                        typeof f == "undefined" && (f = H.xScale()(H.x()(o, a)));
                        var u = t.style() == "expand" ? o.display.y : H.y()(o, a);
                        c.push({
                            key: n.key,
                            value: u,
                            color: l(n, n.seriesIndex),
                            stackedValue: o.display
                        })
                    }),
                    c.reverse();
                    if (c.length > 2) {
                        var h = H.yScale().invert(i.mouseY)
                          , p = Infinity
                          , d = null;
                        c.forEach(function(e, t) {
                            h = Math.abs(h);
                            var n = Math.abs(e.stackedValue.y0)
                              , r = Math.abs(e.stackedValue.y);
                            if (h >= n && h <= r + n) {
                                d = t;
                                return
                            }
                        }),
                        d != null && (c[d].highlight = !0)
                    }
                    var v = n.tickFormat()(H.x()(s, a))
                      , m = t.style() == "expand" ? function(e, t) {
                        return d3.format(".1%")(e)
                    }
                    : function(e, t) {
                        return r.tickFormat()(e)
                    }
                    ;
                    o.tooltip.position({
                        left: f + u.left,
                        top: i.mouseY + u.top
                    }).chartContainer(B.parentNode).enabled(g).valueFormatter(m).data({
                        value: v,
                        series: c
                    })(),
                    o.renderGuideLine(f)
                }),
                o.dispatch.on("elementMouseout", function(e) {
                    N.tooltipHide(),
                    t.clearHighlights()
                }),
                N.on("tooltipShow", function(e) {
                    g && _(e, B.parentNode)
                }),
                N.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && y.length === e.disabled.length && (y.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    S.disabled = e.disabled),
                    typeof e.style != "undefined" && (t.style(e.style),
                    M = e.style),
                    H.update()
                })
            }),
            O.renderEnd("stacked Area chart immediate"),
            H
        }
        var t = e.models.stackedArea(), n = e.models.axis(), r = e.models.axis(), i = e.models.legend(), s = e.models.legend(), o = e.interactiveGuideline(), u = {
            top: 30,
            right: 25,
            bottom: 50,
            left: 60
        }, a = null, f = null, l = e.utils.defaultColor(), c = !0, h = !0, p = !0, d = !0, v = !1, m = !1, g = !0, y = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>"
        }, b, w, E = d3.format(",.2f"), S = e.utils.state(), x = null, T = "No Data Available.", N = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState", "renderEnd"), C = 250, k = ["Stacked", "Stream", "Expanded"], L = {}, A = 250;
        S.style = t.style(),
        n.orient("bottom").tickPadding(7),
        r.orient(v ? "right" : "left"),
        s.updateState(!1);
        var O = e.utils.renderWatch(N)
          , M = t.style()
          , _ = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0)
              , u = i.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(t.x()(i.point, i.pointIndex))
              , f = r.tickFormat()(t.y()(i.point, i.pointIndex))
              , l = y(i.series.key, a, f, i, H);
            e.tooltip.show([o, u], l, i.value < 0 ? "n" : "s", null, s)
        }
          , D = function(e) {
            return function() {
                return {
                    active: e.map(function(e) {
                        return !e.disabled
                    }),
                    style: t.style()
                }
            }
        }
          , P = function(e) {
            return function(t) {
                t.style !== undefined && (M = t.style),
                t.active !== undefined && e.forEach(function(e, n) {
                    e.disabled = !t.active[n]
                })
            }
        };
        return t.dispatch.on("tooltipShow", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top],
            N.tooltipShow(e)
        }),
        t.dispatch.on("tooltipHide", function(e) {
            N.tooltipHide(e)
        }),
        N.on("tooltipHide", function() {
            g && e.tooltip.cleanup()
        }),
        H.dispatch = N,
        H.stacked = t,
        H.legend = i,
        H.controls = s,
        H.xAxis = n,
        H.yAxis = r,
        H.interactiveLayer = o,
        r.setTickFormat = r.tickFormat,
        H.dispatch = N,
        H.options = e.utils.optionsFunc.bind(H),
        H._options = Object.create({}, {
            width: {
                get: function() {
                    return a
                },
                set: function(e) {
                    a = e
                }
            },
            height: {
                get: function() {
                    return f
                },
                set: function(e) {
                    f = e
                }
            },
            showLegend: {
                get: function() {
                    return h
                },
                set: function(e) {
                    h = e
                }
            },
            showXAxis: {
                get: function() {
                    return p
                },
                set: function(e) {
                    p = e
                }
            },
            showYAxis: {
                get: function() {
                    return d
                },
                set: function(e) {
                    d = e
                }
            },
            tooltips: {
                get: function() {
                    return g
                },
                set: function(e) {
                    g = e
                }
            },
            tooltipContent: {
                get: function() {
                    return y
                },
                set: function(e) {
                    y = e
                }
            },
            defaultState: {
                get: function() {
                    return x
                },
                set: function(e) {
                    x = e
                }
            },
            noData: {
                get: function() {
                    return T
                },
                set: function(e) {
                    T = e
                }
            },
            showControls: {
                get: function() {
                    return c
                },
                set: function(e) {
                    c = e
                }
            },
            controlLabels: {
                get: function() {
                    return L
                },
                set: function(e) {
                    L = e
                }
            },
            yAxisTickFormat: {
                get: function() {
                    return E
                },
                set: function(e) {
                    E = e
                }
            },
            margin: {
                get: function() {
                    return u
                },
                set: function(e) {
                    u.top = e.top !== undefined ? e.top : u.top,
                    u.right = e.right !== undefined ? e.right : u.right,
                    u.bottom = e.bottom !== undefined ? e.bottom : u.bottom,
                    u.left = e.left !== undefined ? e.left : u.left
                }
            },
            duration: {
                get: function() {
                    return A
                },
                set: function(e) {
                    A = e,
                    O.reset(A),
                    t.duration(A),
                    n.duration(A),
                    r.duration(A)
                }
            },
            color: {
                get: function() {
                    return l
                },
                set: function(n) {
                    l = e.utils.getColor(n),
                    i.color(l),
                    t.color(l)
                }
            },
            rightAlignYAxis: {
                get: function() {
                    return v
                },
                set: function(e) {
                    v = e,
                    r.orient(v ? "right" : "left")
                }
            },
            useInteractiveGuideline: {
                get: function() {
                    return m
                },
                set: function(e) {
                    m = !!e,
                    e && (H.interactive(!1),
                    H.useVoronoi(!1))
                }
            }
        }),
        e.utils.inheritOptions(H, t),
        e.utils.initOptions(H),
        H
    }
    ,
    e.version = "1.7.1"
}
)();
