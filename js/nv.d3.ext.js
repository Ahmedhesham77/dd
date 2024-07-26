(function(e) {
    if (typeof define == "function" && define.amd) {
        if (!window.nv)
            throw "For this plugin need library 'nv.d3'!";
        define([], e)
    } else
        e()
}
)(function() {
    if (!window.nv)
        throw "For this plugin need library 'nv.d3'!";
    var e = window.nv;
    return e.tooltip.show = function(e, t, n, r, i, s) {
        var o = document.createElement("div");
        o.className = "nvtooltip " + (s ? s : "xy-tooltip");
        var u = i;
        if (!i || i.tagName.match(/g|svg/i))
            u = document.getElementsByTagName("body")[0];
        o.style.left = 0,
        o.style.top = 0,
        o.style.opacity = 0,
        typeof t != "string" ? o.appendChild(t) : o.innerHTML = t,
        u.appendChild(o),
        i && (e[0] = e[0] - i.scrollLeft,
        e[1] = e[1] - i.scrollTop);
        if (window.navigator.userAgent.toLowerCase().indexOf("opera") !== -1 || window.navigator.userAgent.toLowerCase().indexOf("ie") !== -1)
            e[1] -= 35;
        nv.tooltip.calcTooltipPosition(e, n, r, o)
    }
    ,
    nv.utils.copy = function t(e, n) {
        var r, i, s;
        if (typeof e != "object" || e === null)
            return r = e,
            r;
        r = new e.constructor;
        for (i in e)
            e.hasOwnProperty(i) && (s = typeof e[i],
            n && s == "object" && e[i] !== null ? r[i] = t(e[i]) : r[i] = e[i]);
        return r
    }
    ,
    e.models.linePlusLineChart = function() {
        "use strict";
        function x(f) {
            return f.each(function(f) {
                var l = d3.select(this)
                  , d = this
                  , T = (u || parseInt(l.style("width"), 10) || 960) - o.left - o.right
                  , N = (a || parseInt(l.style("height"), 10) || 400) - o.top - o.bottom;
                x.update = function() {
                    l.transition().call(x)
                }
                ,
                y.disabled = f.map(function(e) {
                    return !!e.disabled
                });
                if (!b) {
                    var C;
                    b = {};
                    for (C in y)
                        y[C]instanceof Array ? b[C] = y[C].slice(0) : b[C] = y[C]
                }
                if (!f || !f.length || !f.filter(function(e) {
                    return e.values.length
                }).length) {
                    var k = l.selectAll(".nv-noData").data([w]);
                    return k.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    k.attr("x", o.left + T / 2).attr("y", o.top + N / 2).text(function(e) {
                        return e
                    }),
                    x
                }
                l.selectAll(".nv-noData").remove();
                var L = f.filter(function(e) {
                    return !e.disabled && e.left
                })
                  , A = f.filter(function(e) {
                    return !e.disabled && !e.left
                });
                v = L.filter(function(e) {
                    return !e.disabled
                }).length && L.filter(function(e) {
                    return !e.disabled
                })[0].values.length ? e.xScale() : t.xScale(),
                m = e.yScale(),
                g = t.yScale();
                var O = d3.select(this).selectAll("g.nv-wrap.nv-linePlusLine").data([f])
                  , M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-linePlusLine").append("g")
                  , _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis"),
                M.append("g").attr("class", "nv-y1 nv-axis"),
                M.append("g").attr("class", "nv-y2 nv-axis"),
                M.append("g").attr("class", "nv-lines1Wrap"),
                M.append("g").attr("class", "nv-lines2Wrap"),
                M.append("g").attr("class", "nv-legendWrap"),
                h && (s.width(T / 2),
                _.select(".nv-legendWrap").datum(f.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey,
                    e.key = e.originalKey,
                    e
                })).call(s),
                o.top != s.height() && (o.top = s.height(),
                N = (a || parseInt(l.style("height"), 10) || 400) - o.top - o.bottom),
                _.select(".nv-legendWrap").attr("transform", "translate(" + T / 3 + "," + -o.top + ")")),
                O.attr("transform", "translate(" + o.left + "," + o.top + ")"),
                e.width(T).height(N).color(f.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !f[t].disabled && !f[t].left
                })),
                t.width(T).height(N).color(f.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !f[t].disabled && f[t].left
                }));
                var D = _.select(".nv-lines2Wrap").datum(A[0] && !A[0].disabled ? A : [{
                    values: []
                }])
                  , P = _.select(".nv-lines1Wrap").datum(L[0] && !L[0].disabled ? L : [{
                    values: []
                }]);
                d3.transition(D).call(t),
                d3.transition(P).call(e),
                n.scale(v).ticks(T / 100).tickSize(-N, 0),
                _.select(".nv-x.nv-axis").attr("transform", "translate(0," + m.range()[0] + ")"),
                d3.transition(_.select(".nv-x.nv-axis")).call(n),
                r.scale(m).ticks(N / 36).tickSize(-T, 0),
                d3.transition(_.select(".nv-y1.nv-axis")).style("opacity", L.length ? 1 : 0).call(r),
                i.scale(g).ticks(N / 36).tickSize(A.length ? 0 : -T, 0),
                _.select(".nv-y2.nv-axis").style("opacity", A.length ? 1 : 0).attr("transform", "translate(" + T + ",0)"),
                d3.transition(_.select(".nv-y2.nv-axis")).call(i),
                s.dispatch.on("stateChange", function(e) {
                    y = e,
                    E.stateChange(y),
                    x.update()
                }),
                E.on("tooltipShow", function(e) {
                    p && S(e, d.parentNode)
                }),
                E.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (f.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    y.disabled = e.disabled),
                    x.update()
                })
            }),
            x
        }
        var e = nv.models.line(), t = nv.models.line(), n = nv.models.axis(), r = nv.models.axis(), i = nv.models.axis(), s = nv.models.legend(), o = {
            top: 30,
            right: 60,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = function(e) {
            return e.x
        }, l = function(e) {
            return e.y
        }, c = nv.utils.defaultColor(), h = !0, p = !0, d = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, v, m, g, y = {}, b = null, w = "No Data Available.", E = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState");
        e.clipEdge(!1).padData(!0),
        t.clipEdge(!1).padData(!0),
        n.orient("bottom").tickPadding(7).highlightZero(!1),
        r.orient("left"),
        i.orient("right");
        var S = function(t, s) {
            var o = t.pos[0] + (s.offsetLeft || 0)
              , u = t.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(e.x()(t.point, t.pointIndex))
              , f = (t.series.left ? r : i).tickFormat()(e.y()(t.point, t.pointIndex))
              , l = d(t.series.key, a, f, t, x);
            nv.tooltip.show([o, u], l, t.value < 0 ? "n" : "s", null, s)
        };
        return e.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            E.tooltipShow(e)
        }),
        e.dispatch.on("elementMouseout.tooltip", function(e) {
            E.tooltipHide(e)
        }),
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            E.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            E.tooltipHide(e)
        }),
        E.on("tooltipHide", function() {
            p && nv.tooltip.cleanup()
        }),
        x.dispatch = E,
        x.legend = s,
        x.lines1 = e,
        x.lines2 = t,
        x.xAxis = n,
        x.y1Axis = r,
        x.y2Axis = i,
        d3.rebind(x, e, "defined", "size", "clipVoronoi", "interpolate"),
        x.options = nv.utils.optionsFunc.bind(x),
        x.x = function(n) {
            return arguments.length ? (f = n,
            e.x(n),
            t.x(n),
            x) : f
        }
        ,
        x.y = function(n) {
            return arguments.length ? (l = n,
            e.y(n),
            t.y(n),
            x) : l
        }
        ,
        x.margin = function(e) {
            return arguments.length ? (o.top = typeof e.top != "undefined" ? e.top : o.top,
            o.right = typeof e.right != "undefined" ? e.right : o.right,
            o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom,
            o.left = typeof e.left != "undefined" ? e.left : o.left,
            x) : o
        }
        ,
        x.width = function(e) {
            return arguments.length ? (u = e,
            x) : u
        }
        ,
        x.height = function(e) {
            return arguments.length ? (a = e,
            x) : a
        }
        ,
        x.color = function(e) {
            return arguments.length ? (c = nv.utils.getColor(e),
            s.color(c),
            x) : c
        }
        ,
        x.showLegend = function(e) {
            return arguments.length ? (h = e,
            x) : h
        }
        ,
        x.tooltips = function(e) {
            return arguments.length ? (p = e,
            x) : p
        }
        ,
        x.tooltipContent = function(e) {
            return arguments.length ? (d = e,
            x) : d
        }
        ,
        x.state = function(e) {
            return arguments.length ? (y = e,
            x) : y
        }
        ,
        x.defaultState = function(e) {
            return arguments.length ? (b = e,
            x) : b
        }
        ,
        x.noData = function(e) {
            return arguments.length ? (w = e,
            x) : w
        }
        ,
        x
    }
    ,
    e.models.barPlusLineChart = function() {
        "use strict";
        function x(f) {
            return f.each(function(f) {
                var l = d3.select(this)
                  , d = this
                  , T = (u || parseInt(l.style("width"), 10) || 960) - o.left - o.right
                  , N = (a || parseInt(l.style("height"), 10) || 400) - o.top - o.bottom;
                x.update = function() {
                    l.transition().call(x)
                }
                ,
                y.disabled = f.map(function(e) {
                    return !!e.disabled
                });
                if (!b) {
                    var C;
                    b = {};
                    for (C in y)
                        y[C]instanceof Array ? b[C] = y[C].slice(0) : b[C] = y[C]
                }
                if (!f || !f.length || !f.filter(function(e) {
                    return e.values.length
                }).length) {
                    var k = l.selectAll(".nv-noData").data([w]);
                    return k.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    k.attr("x", o.left + T / 2).attr("y", o.top + N / 2).text(function(e) {
                        return e
                    }),
                    x
                }
                l.selectAll(".nv-noData").remove();
                var L = f.filter(function(e) {
                    return !e.disabled && e.bar
                })
                  , A = f.filter(function(e) {
                    return !e.disabled && !e.bar
                });
                v = A.filter(function(e) {
                    return !e.disabled
                }).length && A.filter(function(e) {
                    return !e.disabled
                })[0].values.length ? e.xScale() : t.xScale(),
                m = e.yScale(),
                g = t.yScale();
                var O = d3.select(this).selectAll("g.nv-wrap.nv-barPlusLine").data([f])
                  , M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-barPlusLine").append("g")
                  , _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis"),
                M.append("g").attr("class", "nv-y1 nv-axis"),
                M.append("g").attr("class", "nv-y2 nv-axis"),
                M.append("g").attr("class", "nv-barsWrap"),
                M.append("g").attr("class", "nv-linesWrap"),
                M.append("g").attr("class", "nv-legendWrap"),
                h && (s.width(T / 2),
                _.select(".nv-legendWrap").datum(f.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey,
                    e.key = e.originalKey,
                    e
                })).call(s),
                o.top != s.height() && (o.top = s.height(),
                N = (a || parseInt(l.style("height"), 10) || 400) - o.top - o.bottom),
                _.select(".nv-legendWrap").attr("transform", "translate(" + T / 3 + "," + -o.top + ")")),
                O.attr("transform", "translate(" + o.left + "," + o.top + ")"),
                t.width(T).height(N).color(f.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !f[t].disabled && f[t].bar
                })),
                e.width(T).height(N).color(f.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !f[t].disabled && !f[t].bar
                }));
                var D = _.select(".nv-barsWrap").datum(L.length ? L : [{
                    values: []
                }])
                  , P = _.select(".nv-linesWrap").datum(A[0] && !A[0].disabled ? A : [{
                    values: []
                }]);
                d3.transition(D).call(t),
                d3.transition(P).call(e),
                n.scale(v).ticks(T / 100).tickSize(-N, 0),
                _.select(".nv-x.nv-axis").attr("transform", "translate(0," + m.range()[0] + ")"),
                d3.transition(_.select(".nv-x.nv-axis")).call(n),
                r.scale(m).ticks(N / 36).tickSize(-T, 0),
                d3.transition(_.select(".nv-y1.nv-axis")).style("opacity", A.length ? 1 : 0).call(r),
                i.scale(g).ticks(N / 36).tickSize(L.length ? 0 : -T, 0),
                _.select(".nv-y2.nv-axis").style("opacity", L.length ? 1 : 0).attr("transform", "translate(" + T + ",0)"),
                d3.transition(_.select(".nv-y2.nv-axis")).call(i),
                s.dispatch.on("stateChange", function(e) {
                    y = e,
                    E.stateChange(y),
                    x.update()
                }),
                E.on("tooltipShow", function(e) {
                    p && S(e, d.parentNode)
                }),
                E.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (f.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    y.disabled = e.disabled),
                    x.update()
                })
            }),
            x
        }
        var e = nv.models.line(), t = nv.models.historicalBar(), n = nv.models.axis(), r = nv.models.axis(), i = nv.models.axis(), s = nv.models.legend(), o = {
            top: 30,
            right: 60,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = function(e) {
            return e.x
        }, l = function(e) {
            return e.y
        }, c = nv.utils.defaultColor(), h = !0, p = !0, d = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, v, m, g, y = {}, b = null, w = "No Data Available.", E = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState");
        t.padData(!0),
        e.clipEdge(!1).padData(!0),
        n.orient("bottom").tickPadding(7).highlightZero(!1),
        r.orient("left"),
        i.orient("right");
        var S = function(t, s) {
            var o = t.pos[0] + (s.offsetLeft || 0)
              , u = t.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(e.x()(t.point, t.pointIndex))
              , f = (t.series.bar ? r : i).tickFormat()(e.y()(t.point, t.pointIndex))
              , l = d(t.series.key, a, f, t, x);
            nv.tooltip.show([o, u], l, t.value < 0 ? "n" : "s", null, s)
        };
        return e.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            E.tooltipShow(e)
        }),
        e.dispatch.on("elementMouseout.tooltip", function(e) {
            E.tooltipHide(e)
        }),
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            E.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            E.tooltipHide(e)
        }),
        E.on("tooltipHide", function() {
            p && nv.tooltip.cleanup()
        }),
        x.dispatch = E,
        x.legend = s,
        x.lines = e,
        x.bars = t,
        x.xAxis = n,
        x.y1Axis = r,
        x.y2Axis = i,
        d3.rebind(x, e, "defined", "size", "clipVoronoi", "interpolate"),
        x.options = nv.utils.optionsFunc.bind(x),
        x.x = function(n) {
            return arguments.length ? (f = n,
            e.x(n),
            t.x(n),
            x) : f
        }
        ,
        x.y = function(n) {
            return arguments.length ? (l = n,
            e.y(n),
            t.y(n),
            x) : l
        }
        ,
        x.margin = function(e) {
            return arguments.length ? (o.top = typeof e.top != "undefined" ? e.top : o.top,
            o.right = typeof e.right != "undefined" ? e.right : o.right,
            o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom,
            o.left = typeof e.left != "undefined" ? e.left : o.left,
            x) : o
        }
        ,
        x.width = function(e) {
            return arguments.length ? (u = e,
            x) : u
        }
        ,
        x.height = function(e) {
            return arguments.length ? (a = e,
            x) : a
        }
        ,
        x.color = function(e) {
            return arguments.length ? (c = nv.utils.getColor(e),
            s.color(c),
            x) : c
        }
        ,
        x.showLegend = function(e) {
            return arguments.length ? (h = e,
            x) : h
        }
        ,
        x.tooltips = function(e) {
            return arguments.length ? (p = e,
            x) : p
        }
        ,
        x.tooltipContent = function(e) {
            return arguments.length ? (d = e,
            x) : d
        }
        ,
        x.state = function(e) {
            return arguments.length ? (y = e,
            x) : y
        }
        ,
        x.defaultState = function(e) {
            return arguments.length ? (b = e,
            x) : b
        }
        ,
        x.noData = function(e) {
            return arguments.length ? (w = e,
            x) : w
        }
        ,
        x
    }
    ,
    e.models.barPlusBarChart = function() {
        "use strict";
        function x(f) {
            return f.each(function(f) {
                var l = d3.select(this)
                  , d = this
                  , T = (u || parseInt(l.style("width"), 10) || 960) - o.left - o.right
                  , N = (a || parseInt(l.style("height"), 10) || 400) - o.top - o.bottom;
                x.update = function() {
                    l.transition().call(x)
                }
                ,
                y.disabled = f.map(function(e) {
                    return !!e.disabled
                });
                if (!b) {
                    var C;
                    b = {};
                    for (C in y)
                        y[C]instanceof Array ? b[C] = y[C].slice(0) : b[C] = y[C]
                }
                if (!f || !f.length || !f.filter(function(e) {
                    return e.values.length
                }).length) {
                    var k = l.selectAll(".nv-noData").data([w]);
                    return k.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    k.attr("x", o.left + T / 2).attr("y", o.top + N / 2).text(function(e) {
                        return e
                    }),
                    x
                }
                l.selectAll(".nv-noData").remove();
                var L = f.filter(function(e) {
                    return !e.disabled && e.left
                })
                  , A = f.filter(function(e) {
                    return !e.disabled && !e.left
                });
                v = L.filter(function(e) {
                    return !e.disabled
                }).length && L.filter(function(e) {
                    return !e.disabled
                })[0].values.length ? e.xScale() : t.xScale(),
                m = e.yScale(),
                g = t.yScale();
                var O = d3.select(this).selectAll("g.nv-wrap.nv-barPlusBar").data([f])
                  , M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-barPlusBar").append("g")
                  , _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis"),
                M.append("g").attr("class", "nv-y1 nv-axis"),
                M.append("g").attr("class", "nv-y2 nv-axis"),
                M.append("g").attr("class", "nv-bar1Wrap"),
                M.append("g").attr("class", "nv-bar2Wrap"),
                M.append("g").attr("class", "nv-legendWrap"),
                h && (s.width(T / 2),
                _.select(".nv-legendWrap").datum(f.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey,
                    e.key = e.originalKey,
                    e
                })).call(s),
                o.top != s.height() && (o.top = s.height(),
                N = (a || parseInt(l.style("height"), 10) || 400) - o.top - o.bottom),
                _.select(".nv-legendWrap").attr("transform", "translate(" + T / 3 + "," + -o.top + ")")),
                O.attr("transform", "translate(" + o.left + "," + o.top + ")"),
                e.width(T).height(N).color(f.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !f[t].disabled && f[t].left
                })),
                t.width(T).height(N).color(f.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(e, t) {
                    return !f[t].disabled && !f[t].left
                }));
                var D = _.select(".nv-bar2Wrap").datum(A[0] && !A[0].disabled ? A : [{
                    values: []
                }])
                  , P = _.select(".nv-bar1Wrap").datum(L[0] && !L[0].disabled ? L : [{
                    values: []
                }]);
                d3.transition(D).call(t),
                d3.transition(P).call(e),
                n.scale(v).ticks(T / 100).tickSize(-N, 0),
                _.select(".nv-x.nv-axis").attr("transform", "translate(0," + m.range()[0] + ")"),
                d3.transition(_.select(".nv-x.nv-axis")).call(n),
                r.scale(m).ticks(N / 36).tickSize(-T, 0),
                d3.transition(_.select(".nv-y1.nv-axis")).style("opacity", L.length ? 1 : 0).call(r),
                i.scale(g).ticks(N / 36).tickSize(L.length ? 0 : -T, 0),
                _.select(".nv-y2.nv-axis").style("opacity", A.length ? 1 : 0).attr("transform", "translate(" + T + ",0)"),
                d3.transition(_.select(".nv-y2.nv-axis")).call(i),
                s.dispatch.on("stateChange", function(e) {
                    y = e,
                    E.stateChange(y),
                    x.update()
                }),
                E.on("tooltipShow", function(e) {
                    p && S(e, d.parentNode)
                }),
                E.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (f.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    y.disabled = e.disabled),
                    x.update()
                })
            }),
            x
        }
        var e = nv.models.historicalBarWithOffset(), t = nv.models.historicalBarWithOffset(), n = nv.models.axis(), r = nv.models.axis(), i = nv.models.axis(), s = nv.models.legend(), o = {
            top: 30,
            right: 60,
            bottom: 50,
            left: 60
        }, u = null, a = null, f = function(e) {
            return e.x
        }, l = function(e) {
            return e.y
        }, c = nv.utils.defaultColor(), h = !0, p = !0, d = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
        }, v, m, g, y = {}, b = null, w = "No Data Available.", E = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState");
        e.padData(!0).widthScale(2).offset(0),
        t.padData(!0).widthScale(2).offset(1),
        n.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(e) {
            return e
        }),
        r.orient("left"),
        i.orient("right");
        var S = function(t, s) {
            var o = t.pos[0] + (s.offsetLeft || 0)
              , u = t.pos[1] + (s.offsetTop || 0)
              , a = n.tickFormat()(e.x()(t.point, t.pointIndex))
              , f = (t.series.left ? r : i).tickFormat()(e.y()(t.point, t.pointIndex))
              , l = d(t.series.key, a, f, t, x);
            nv.tooltip.show([o, u], l, t.value < 0 ? "n" : "s", null, s)
        };
        return e.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            E.tooltipShow(e)
        }),
        e.dispatch.on("elementMouseout.tooltip", function(e) {
            E.tooltipHide(e)
        }),
        t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top],
            E.tooltipShow(e)
        }),
        t.dispatch.on("elementMouseout.tooltip", function(e) {
            E.tooltipHide(e)
        }),
        E.on("tooltipHide", function() {
            p && nv.tooltip.cleanup()
        }),
        x.dispatch = E,
        x.legend = s,
        x.bars1 = e,
        x.bars2 = t,
        x.xAxis = n,
        x.y1Axis = r,
        x.y2Axis = i,
        d3.rebind(x, e, "defined", "size", "clipVoronoi", "interpolate"),
        x.options = nv.utils.optionsFunc.bind(x),
        x.x = function(n) {
            return arguments.length ? (f = n,
            e.x(n),
            t.x(n),
            x) : f
        }
        ,
        x.y = function(n) {
            return arguments.length ? (l = n,
            e.y(n),
            t.y(n),
            x) : l
        }
        ,
        x.margin = function(e) {
            return arguments.length ? (o.top = typeof e.top != "undefined" ? e.top : o.top,
            o.right = typeof e.right != "undefined" ? e.right : o.right,
            o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom,
            o.left = typeof e.left != "undefined" ? e.left : o.left,
            x) : o
        }
        ,
        x.width = function(e) {
            return arguments.length ? (u = e,
            x) : u
        }
        ,
        x.height = function(e) {
            return arguments.length ? (a = e,
            x) : a
        }
        ,
        x.color = function(e) {
            return arguments.length ? (c = nv.utils.getColor(e),
            s.color(c),
            x) : c
        }
        ,
        x.showControls = function(e) {
            return arguments.length ? (showControls = e,
            x) : showControls
        }
        ,
        x.showLegend = function(e) {
            return arguments.length ? (h = e,
            x) : h
        }
        ,
        x.showXAxis = function(e) {
            return arguments.length ? (showXAxis = e,
            x) : showXAxis
        }
        ,
        x.showYAxis = function(e) {
            return arguments.length ? (showYAxis = e,
            x) : showYAxis
        }
        ,
        x.rightAlignYAxis = function(e) {
            return arguments.length ? (rightAlignYAxis = e,
            yAxis.orient(e ? "right" : "left"),
            x) : rightAlignYAxis
        }
        ,
        x.reduceXTicks = function(e) {
            return arguments.length ? (reduceXTicks = e,
            x) : reduceXTicks
        }
        ,
        x.rotateLabels = function(e) {
            return arguments.length ? (rotateLabels = e,
            x) : rotateLabels
        }
        ,
        x.staggerLabels = function(e) {
            return arguments.length ? (staggerLabels = e,
            x) : staggerLabels
        }
        ,
        x.tooltip = function(e) {
            return arguments.length ? (d = e,
            x) : d
        }
        ,
        x.tooltips = function(e) {
            return arguments.length ? (p = e,
            x) : p
        }
        ,
        x.tooltipContent = function(e) {
            return arguments.length ? (d = e,
            x) : d
        }
        ,
        x.state = function(e) {
            return arguments.length ? (y = e,
            x) : y
        }
        ,
        x.defaultState = function(e) {
            return arguments.length ? (b = e,
            x) : b
        }
        ,
        x.noData = function(e) {
            return arguments.length ? (w = e,
            x) : w
        }
        ,
        x.transitionDuration = function(e) {
            return arguments.length ? (transitionDuration = e,
            x) : transitionDuration
        }
        ,
        x
    }
    ,
    e.models.overlapBarChart = function() {
        "use strict";
        function x(d) {
            return d.each(function(d) {
                var T = d3.select(this)
                  , N = this
                  , C = (s || parseInt(T.style("width")) || 960) - i.left - i.right
                  , k = (o || parseInt(T.style("height")) || 400) - i.top - i.bottom;
                x.update = function() {
                    T.transition().duration(E).call(x)
                }
                ,
                x.container = this,
                v.disabled = d.map(function(e) {
                    return !!e.disabled
                });
                if (!m) {
                    var L;
                    m = {};
                    for (L in v)
                        v[L]instanceof Array ? m[L] = v[L].slice(0) : m[L] = v[L]
                }
                if (!d || !d.length || !d.filter(function(e) {
                    return e.values.length
                }).length) {
                    var A = T.selectAll(".nv-noData").data([b]);
                    return A.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"),
                    A.attr("x", i.left + C / 2).attr("y", i.top + k / 2).text(function(e) {
                        return e
                    }),
                    x
                }
                T.selectAll(".nv-noData").remove(),
                g = e.xScale(),
                y = e.yScale();
                var O = T.selectAll("g.nv-wrap.nv-overlapBarWithLegend").data([d])
                  , M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-overlapBarWithLegend").append("g")
                  , _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis"),
                M.append("g").attr("class", "nv-y nv-axis"),
                M.append("g").attr("class", "nv-barsWrap"),
                M.append("g").attr("class", "nv-legendWrap"),
                a && (r.width(C),
                _.select(".nv-legendWrap").datum(d).call(r),
                i.top != r.height() && (i.top = r.height(),
                k = (o || parseInt(T.style("height")) || 400) - i.top - i.bottom),
                _.select(".nv-legendWrap").attr("transform", "translate(0," + -i.top + ")")),
                O.attr("transform", "translate(" + i.left + "," + i.top + ")"),
                c && _.select(".nv-y.nv-axis").attr("transform", "translate(" + C + ",0)"),
                e.width(C).height(k).color(d.map(function(e, t) {
                    return e.color || u(e, t)
                }).filter(function(e, t) {
                    return !d[t].disabled
                }));
                var D = _.select(".nv-barsWrap").datum(d.filter(function(e) {
                    return !e.disabled
                }));
                D.transition().call(e);
                if (f) {
                    t.scale(g).ticks(C / 100).tickSize(-k, 0),
                    _.select(".nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"),
                    _.select(".nv-x.nv-axis").transition().call(t);
                    var P = _.select(".nv-x.nv-axis > g").selectAll("g");
                    P.selectAll("line, text").style("opacity", 1),
                    h && P.filter(function(e, t) {
                        return t % Math.ceil(d[0].values.length / (C / 100)) !== 0
                    }).selectAll("text, line").style("opacity", 0),
                    _.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity", 1)
                }
                l && (n.scale(y).ticks(k / 36).tickSize(-C, 0),
                _.select(".nv-y.nv-axis").transition().call(n)),
                r.dispatch.on("stateChange", function(e) {
                    v = e,
                    w.stateChange(v),
                    x.update()
                }),
                w.on("tooltipShow", function(e) {
                    p && S(e, N.parentNode)
                }),
                w.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (d.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }),
                    v.disabled = e.disabled),
                    x.update()
                })
            }),
            x
        }
        var e = nv.models.overlapBar(), t = nv.models.axis(), n = nv.models.axis(), r = nv.models.legend(), i = {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        }, s = null, o = null, u = nv.utils.defaultColor(), a = !0, f = !0, l = !0, c = !1, h = !0, p = !0, d = function(e, t, n, r, i) {
            return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>"
        }, v = {}, m = null, g, y, b = "No Data Available.", w = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"), E = 100;
        t.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(e) {
            return e
        }),
        n.orient(c ? "right" : "left").tickFormat(d3.format(",.1f"));
        var S = function(r, i) {
            var s = r.pos[0] + (i.offsetLeft || 0)
              , o = r.pos[1] + (i.offsetTop || 0)
              , u = t.tickFormat()(e.x()(r.point, r.pointIndex))
              , a = n.tickFormat()(e.y()(r.point, r.pointIndex))
              , f = d(r.series.key, u, a, r, x);
            nv.tooltip.show([s, o], f, r.value < 0 ? "n" : "s", null, i)
        };
        return e.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + i.left, e.pos[1] + i.top],
            w.tooltipShow(e)
        }),
        e.dispatch.on("elementMouseout.tooltip", function(e) {
            w.tooltipHide(e)
        }),
        w.on("tooltipHide", function() {
            p && nv.tooltip.cleanup()
        }),
        x.dispatch = w,
        x.overlapbar = e,
        x.legend = r,
        x.xAxis = t,
        x.yAxis = n,
        d3.rebind(x, e, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "clipEdge", "id", "delay"),
        x.options = nv.utils.optionsFunc.bind(x),
        x.margin = function(e) {
            return arguments.length ? (i.top = typeof e.top != "undefined" ? e.top : i.top,
            i.right = typeof e.right != "undefined" ? e.right : i.right,
            i.bottom = typeof e.bottom != "undefined" ? e.bottom : i.bottom,
            i.left = typeof e.left != "undefined" ? e.left : i.left,
            x) : i
        }
        ,
        x.width = function(e) {
            return arguments.length ? (s = e,
            x) : s
        }
        ,
        x.height = function(e) {
            return arguments.length ? (o = e,
            x) : o
        }
        ,
        x.color = function(e) {
            return arguments.length ? (u = nv.utils.getColor(e),
            r.color(u),
            x) : u
        }
        ,
        x.showXAxis = function(e) {
            return arguments.length ? (f = e,
            x) : f
        }
        ,
        x.showYAxis = function(e) {
            return arguments.length ? (l = e,
            x) : l
        }
        ,
        x.rightAlignYAxis = function(e) {
            return arguments.length ? (c = e,
            n.orient(e ? "right" : "left"),
            x) : c
        }
        ,
        x.reduceXTicks = function(e) {
            return arguments.length ? (h = e,
            x) : h
        }
        ,
        x.tooltip = function(e) {
            return arguments.length ? (d = e,
            x) : d
        }
        ,
        x.tooltips = function(e) {
            return arguments.length ? (p = e,
            x) : p
        }
        ,
        x.tooltipContent = function(e) {
            return arguments.length ? (d = e,
            x) : d
        }
        ,
        x.state = function(e) {
            return arguments.length ? (v = e,
            x) : v
        }
        ,
        x.defaultState = function(e) {
            return arguments.length ? (m = e,
            x) : m
        }
        ,
        x.noData = function(e) {
            return arguments.length ? (b = e,
            x) : b
        }
        ,
        x.transitionDuration = function(e) {
            return arguments.length ? (E = e,
            x) : E
        }
        ,
        x
    }
    ,
    e.models.overlapBar = function() {
        "use strict";
        function w(w) {
            w.each(function(w) {
                b === null && (b = nv.utils.copy(w, !0));
                var E = [];
                for (var S = 0; S < b.length; S++) {
                    var T = b[S]
                      , N = !1;
                    for (var C = 0; C < w.length; C++)
                        if (w[C].key === T.key) {
                            N = !0;
                            break
                        }
                    N && E.push(nv.utils.copy(T, !0))
                }
                var k = t - e.left - e.right
                  , L = n - e.top - e.bottom
                  , A = d3.select(this);
                E.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                });
                var O = [];
                E.forEach(function(e, t) {
                    O.push(e.values)
                });
                if (O.length > 0) {
                    var M = O[0].length;
                    for (var C = 0; C < M; C++) {
                        var _ = [];
                        for (var S = 0; S < E.length; S++)
                            _.push(O[S][C]);
                        _ = _.sort(function(e, t) {
                            return t.ay - e.ay
                        });
                        for (var D = 0; D < _.length - 1; D++)
                            _[D].y = _[D].ay - _[D + 1].ay;
                        _.length === 1 && (_[0].y = _[0].ay),
                        _ = _.reverse();
                        for (var S = 0; S < E.length; S++)
                            O[S][C] = _[S]
                    }
                }
                E = d3.layout.stack().offset("zero").values(function(e) {
                    return e.values
                }).y(u)(E),
                E[0].values.map(function(e, t) {
                    var n = 0
                      , r = 0;
                    E.map(function(e) {
                        var i = e.values[t];
                        i.size = Math.abs(i.y),
                        i.y < 0 ? (i.y1 = r,
                        r -= i.size) : (i.y1 = i.size + n,
                        n += i.size)
                    })
                });
                var P = h && p ? [] : E.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: o(e, t),
                            y: u(e, t),
                            y0: e.y0,
                            y1: e.y1,
                            nm: e.nm
                        }
                    })
                });
                r.domain(h || d3.merge(P).map(function(e) {
                    return e.x
                })).rangeBands(d || [0, k], .1),
                i.domain(p || d3.extent(d3.merge(P).map(function(e) {
                    return e.y > 0 ? e.y1 : e.y1 + e.y
                }).concat(f))).range(v || [L, 0]),
                r.domain()[0] === r.domain()[1] && (r.domain()[0] ? r.domain([r.domain()[0] - r.domain()[0] * .01, r.domain()[1] + r.domain()[1] * .01]) : r.domain([-1, 1])),
                i.domain()[0] === i.domain()[1] && (i.domain()[0] ? i.domain([i.domain()[0] + i.domain()[0] * .01, i.domain()[1] - i.domain()[1] * .01]) : i.domain([-1, 1])),
                g = g || r,
                y = y || i;
                var H = A.selectAll("g.nv-wrap.nv-multibar").data([E])
                  , B = H.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibar")
                  , j = B.append("defs")
                  , F = B.append("g")
                  , I = H.select("g");
                F.append("g").attr("class", "nv-groups"),
                H.attr("transform", "translate(" + e.left + "," + e.top + ")"),
                j.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect"),
                H.select("#nv-edge-clip-" + s + " rect").attr("width", k).attr("height", L),
                I.attr("clip-path", a ? "url(#nv-edge-clip-" + s + ")" : "");
                var q = H.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e, t) {
                    return t
                });
                q.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6),
                q.exit().transition().selectAll("rect.nv-bar").delay(function(e, t) {
                    return t * c / E[0].values.length
                }).attr("y", function(e) {
                    return y(e.y0)
                }).attr("height", 0).remove(),
                q.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }),
                q.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var R = q.selectAll("rect.nv-bar").data(function(e) {
                    return e.values
                });
                R.exit().remove();
                var U = R.enter().append("rect").attr("class", function(e, t) {
                    return u(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).attr("x", function(e, t, n) {
                    return 0
                }).attr("y", function(e) {
                    return y(e.y0)
                }).attr("height", 0).attr("width", r.rangeBand()).attr("transform", function(e, t) {
                    return "translate(" + r(o(e, t)) + ",0)"
                });
                R.style("fill", function(e, t, n) {
                    return l(e, e.series)
                }).style("stroke", function(e, t, n) {
                    return l(e, e.series)
                }).on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0),
                    m.elementMouseover({
                        value: u(e, t),
                        point: e,
                        series: E[e.series],
                        pos: [r(o(e, t)) + r.rangeBand() * (E.length / 2) / E.length, i(u(e, t) + e.y0)],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1),
                    m.elementMouseout({
                        value: u(e, t),
                        point: e,
                        series: E[e.series],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    m.elementClick({
                        value: u(e, t),
                        point: e,
                        series: E[e.series],
                        pos: [r(o(e, t)) + r.rangeBand() * (E.length / 2) / E.length, i(u(e, t) + e.y0)],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    m.elementDblClick({
                        value: u(e, t),
                        point: e,
                        series: E[e.series],
                        pos: [r(o(e, t)) + r.rangeBand() * (E.length / 2) / E.length, i(u(e, t) + e.y0)],
                        pointIndex: t,
                        seriesIndex: e.series,
                        e: d3.event
                    }),
                    d3.event.stopPropagation()
                }),
                R.attr("class", function(e, t) {
                    return u(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).transition().attr("transform", function(e, t) {
                    return "translate(" + r(o(e, t)) + ",0)"
                }),
                R.transition().delay(function(e, t) {
                    return t * c / E[0].values.length
                }).attr("y", function(e, t) {
                    return i(e.y1)
                }).attr("height", function(e, t) {
                    return e.is_null ? 0 : Math.max(Math.abs(i(e.y + e.y0) - i(e.y0)), 1)
                }).attr("x", function(e, t) {
                    return 0
                }).attr("width", r.rangeBand()),
                g = r.copy(),
                y = i.copy()
            })
        }
        var e = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, t = 960, n = 500, r = d3.scale.ordinal(), i = d3.scale.linear(), s = Math.floor(Math.random() * 1e4), o = function(e) {
            return e.x
        }, u = function(e) {
            return e.y
        }, a = !0, f = [0], l = nv.utils.defaultColor(), c = 0, h, p, d, v, m = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"), g, y, b = null;
        return w.dispatch = m,
        w.options = nv.utils.optionsFunc.bind(w),
        w.x = function(e) {
            return arguments.length ? (o = e,
            w) : o
        }
        ,
        w.y = function(e) {
            return arguments.length ? (u = e,
            w) : u
        }
        ,
        w.margin = function(t) {
            return arguments.length ? (e.top = typeof t.top != "undefined" ? t.top : e.top,
            e.right = typeof t.right != "undefined" ? t.right : e.right,
            e.bottom = typeof t.bottom != "undefined" ? t.bottom : e.bottom,
            e.left = typeof t.left != "undefined" ? t.left : e.left,
            w) : e
        }
        ,
        w.width = function(e) {
            return arguments.length ? (t = e,
            w) : t
        }
        ,
        w.height = function(e) {
            return arguments.length ? (n = e,
            w) : n
        }
        ,
        w.xScale = function(e) {
            return arguments.length ? (r = e,
            w) : r
        }
        ,
        w.yScale = function(e) {
            return arguments.length ? (i = e,
            w) : i
        }
        ,
        w.xDomain = function(e) {
            return arguments.length ? (h = e,
            w) : h
        }
        ,
        w.yDomain = function(e) {
            return arguments.length ? (p = e,
            w) : p
        }
        ,
        w.xRange = function(e) {
            return arguments.length ? (d = e,
            w) : d
        }
        ,
        w.yRange = function(e) {
            return arguments.length ? (v = e,
            w) : v
        }
        ,
        w.clipEdge = function(e) {
            return arguments.length ? (a = e,
            w) : a
        }
        ,
        w.color = function(e) {
            return arguments.length ? (l = nv.utils.getColor(e),
            w) : l
        }
        ,
        w.id = function(e) {
            return arguments.length ? (s = e,
            w) : s
        }
        ,
        w.delay = function(e) {
            return arguments.length ? (c = e,
            w) : c
        }
        ,
        w
    }
    ,
    nv.models.historicalBarWithOffset = function() {
        "use strict";
        function E(S) {
            return S.each(function(E) {
                var S = t - e.left - e.right
                  , T = n - e.top - e.bottom
                  , N = d3.select(this);
                i.domain(p || d3.extent(E[0].values.map(o).concat(a))),
                l ? i.range(v || [S * .5 / E[0].values.length, S * (E[0].values.length - .5) / E[0].values.length]) : i.range(v || [0, S]),
                s.domain(d || d3.extent(E[0].values.map(u).concat(f))).range(m || [T, 0]),
                i.domain()[0] === i.domain()[1] && (i.domain()[0] ? i.domain([i.domain()[0] - i.domain()[0] * .01, i.domain()[1] + i.domain()[1] * .01]) : i.domain([-1, 1])),
                s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] + s.domain()[0] * .01, s.domain()[1] - s.domain()[1] * .01]) : s.domain([-1, 1]));
                var C = N.selectAll("g.nv-wrap.nv-historicalBar-" + r).data([E[0].values])
                  , k = C.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBar-" + r)
                  , L = k.append("defs")
                  , A = k.append("g")
                  , O = C.select("g");
                A.append("g").attr("class", "nv-bars"),
                C.attr("transform", "translate(" + e.left + "," + e.top + ")"),
                N.on("click", function(e, t) {
                    g.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: r
                    })
                }),
                L.append("clipPath").attr("id", "nv-chart-clip-path-" + r).append("rect"),
                C.select("#nv-chart-clip-path-" + r + " rect").attr("width", S).attr("height", T),
                O.attr("clip-path", c ? "url(#nv-chart-clip-path-" + r + ")" : "");
                var M = C.select(".nv-bars").selectAll(".nv-bar").data(function(e) {
                    return e
                }, function(e, t) {
                    return o(e, t)
                });
                M.exit().remove();
                var _ = S / E[0].values.length / w * .9
                  , D = M.enter().append("rect").attr("x", 0).attr("y", function(e, t) {
                    return nv.utils.NaNtoZero(s(Math.max(0, u(e, t))))
                }).attr("height", function(e, t) {
                    return nv.utils.NaNtoZero(Math.abs(s(u(e, t)) - s(0)))
                }).attr("transform", function(e, t) {
                    var n = i(o(e, t)) - S / E[0].values.length * .45;
                    return n = n + _ * b + 1 * b,
                    "translate(" + n + ",0)"
                }).on("mouseover", function(e, t) {
                    if (!y)
                        return;
                    d3.select(this).classed("hover", !0),
                    g.elementMouseover({
                        point: e,
                        series: E[0],
                        pos: [i(o(e, t)), s(u(e, t))],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    if (!y)
                        return;
                    d3.select(this).classed("hover", !1),
                    g.elementMouseout({
                        point: e,
                        series: E[0],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    if (!y)
                        return;
                    g.elementClick({
                        value: u(e, t),
                        data: e,
                        index: t,
                        pos: [i(o(e, t)), s(u(e, t))],
                        e: d3.event,
                        id: r
                    }),
                    d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    if (!y)
                        return;
                    g.elementDblClick({
                        value: u(e, t),
                        data: e,
                        index: t,
                        pos: [i(o(e, t)), s(u(e, t))],
                        e: d3.event,
                        id: r
                    }),
                    d3.event.stopPropagation()
                });
                M.attr("fill", function(e, t) {
                    return h(e, t)
                }).attr("class", function(e, t, n) {
                    return (u(e, t) < 0 ? "nv-bar negative" : "nv-bar positive") + " nv-bar-" + n + "-" + t + "-" + r
                }).attr("transform", function(e, t) {
                    var n = i(o(e, t)) - S / E[0].values.length * .45;
                    return n = n + _ * b + 1 * b,
                    "translate(" + n + ",0)"
                }).attr("width", _),
                M.transition().attr("y", function(e, t) {
                    var n = u(e, t) < 0 ? s(0) : s(0) - s(u(e, t)) < 1 ? s(0) - 1 : s(u(e, t));
                    return nv.utils.NaNtoZero(n)
                }).attr("height", function(e, t) {
                    return nv.utils.NaNtoZero(Math.max(Math.abs(s(u(e, t)) - s(0)), 1))
                })
            }),
            E
        }
        var e = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, t = 960, n = 500, r = Math.floor(Math.random() * 1e4), i = d3.scale.linear(), s = d3.scale.linear(), o = function(e) {
            return e.x
        }, u = function(e) {
            return e.y
        }, a = [], f = [0], l = !1, c = !0, h = nv.utils.defaultColor(), p, d, v, m, g = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"), y = !0, b = 0, w = 1;
        return E.highlightPoint = function(e, t) {
            d3.select(".nv-historicalBar-" + r).select(".nv-bars .nv-bar-0-" + e).classed("hover", t)
        }
        ,
        E.clearHighlights = function() {
            d3.select(".nv-historicalBar-" + r).select(".nv-bars .nv-bar.hover").classed("hover", !1)
        }
        ,
        E.dispatch = g,
        E.options = nv.utils.optionsFunc.bind(E),
        E.x = function(e) {
            return arguments.length ? (o = e,
            E) : o
        }
        ,
        E.y = function(e) {
            return arguments.length ? (u = e,
            E) : u
        }
        ,
        E.margin = function(t) {
            return arguments.length ? (e.top = typeof t.top != "undefined" ? t.top : e.top,
            e.right = typeof t.right != "undefined" ? t.right : e.right,
            e.bottom = typeof t.bottom != "undefined" ? t.bottom : e.bottom,
            e.left = typeof t.left != "undefined" ? t.left : e.left,
            E) : e
        }
        ,
        E.offset = function(e) {
            return arguments.length ? (b = e,
            E) : b
        }
        ,
        E.widthScale = function(e) {
            return arguments.length ? (w = e,
            E) : w
        }
        ,
        E.width = function(e) {
            return arguments.length ? (t = e,
            E) : t
        }
        ,
        E.height = function(e) {
            return arguments.length ? (n = e,
            E) : n
        }
        ,
        E.xScale = function(e) {
            return arguments.length ? (i = e,
            E) : i
        }
        ,
        E.yScale = function(e) {
            return arguments.length ? (s = e,
            E) : s
        }
        ,
        E.xDomain = function(e) {
            return arguments.length ? (p = e,
            E) : p
        }
        ,
        E.yDomain = function(e) {
            return arguments.length ? (d = e,
            E) : d
        }
        ,
        E.xRange = function(e) {
            return arguments.length ? (v = e,
            E) : v
        }
        ,
        E.yRange = function(e) {
            return arguments.length ? (m = e,
            E) : m
        }
        ,
        E.forceX = function(e) {
            return arguments.length ? (a = e,
            E) : a
        }
        ,
        E.forceY = function(e) {
            return arguments.length ? (f = e,
            E) : f
        }
        ,
        E.padData = function(e) {
            return arguments.length ? (l = e,
            E) : l
        }
        ,
        E.clipEdge = function(e) {
            return arguments.length ? (c = e,
            E) : c
        }
        ,
        E.color = function(e) {
            return arguments.length ? (h = nv.utils.getColor(e),
            E) : h
        }
        ,
        E.id = function(e) {
            return arguments.length ? (r = e,
            E) : r
        }
        ,
        E.interactive = function(e) {
            return arguments.length ? (y = !1,
            E) : y
        }
        ,
        E
    }
    ,
    e
});
