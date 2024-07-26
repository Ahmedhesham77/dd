/**!
* TableSorter 2.14.5 - Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter
* @cat Plugins/Tablesorter
* @author Christian Bach/christian.bach@polyester.se
* @contributor Rob Garrison/https://github.com/Mottie/tablesorter
*/

!function(e) {
    "use strict";
    e.extend({
        tablesorter: new function() {
            function n() {
                var e = arguments.length > 1 ? Array.prototype.slice.call(arguments) : arguments[0];
                typeof console != "undefined" && typeof console.log != "undefined" ? console.log(e) : alert(e)
            }
            function r(e, t) {
                n(e + " (" + ((new Date).getTime() - t.getTime()) + "ms)")
            }
            function i(e) {
                for (var t in e)
                    return !1;
                return !0
            }
            function s(t, n, r) {
                if (!n)
                    return "";
                var i = t.config
                  , s = i.textExtraction
                  , o = "";
                return s === "simple" ? i.supportsTextContent ? o = n.textContent : o = e(n).text() : typeof s == "function" ? o = s(n, t, r) : typeof s == "object" && s.hasOwnProperty(r) ? o = s[r](n, t, r) : o = i.supportsTextContent ? n.textContent : e(n).text(),
                e.trim(o)
            }
            function o(e, r, i, o) {
                var u, a = t.parsers.length, f = !1, l = "", c = !0;
                while (l === "" && c)
                    i++,
                    r[i] ? (f = r[i].cells[o],
                    l = s(e, f, o),
                    e.config.debug && n("Checking if value was empty on row " + i + ", column: " + o + ': "' + l + '"')) : c = !1;
                while (--a >= 0) {
                    u = t.parsers[a];
                    if (u && u.id !== "text" && u.is && u.is(l, e, f))
                        return u
                }
                return t.getParserById("text")
            }
            function u(e) {
                var i = e.config, s = i.$tbodies = i.$table.children("tbody:not(." + i.cssInfoBlock + ")"), u, a, f, l, c, h, p, d, v = "";
                if (s.length === 0)
                    return i.debug ? n("*Empty table!* Not building a parser cache") : "";
                i.debug && (d = new Date,
                n("Detecting parsers for each column")),
                u = s[0].rows;
                if (u[0]) {
                    a = [],
                    f = u[0].cells.length;
                    for (l = 0; l < f; l++)
                        c = i.$headers.filter(":not([colspan])"),
                        c = c.add(i.$headers.filter('[colspan="1"]')).filter('[data-column="' + l + '"]:last'),
                        h = i.headers[l],
                        p = t.getParserById(t.getData(c, h, "sorter")),
                        i.empties[l] = t.getData(c, h, "empty") || i.emptyTo || (i.emptyToBottom ? "bottom" : "top"),
                        i.strings[l] = t.getData(c, h, "string") || i.stringTo || "max",
                        p || (p = o(e, u, -1, l)),
                        i.debug && (v += "column:" + l + "; parser:" + p.id + "; string:" + i.strings[l] + "; empty: " + i.empties[l] + "\n"),
                        a.push(p)
                }
                i.debug && (n(v),
                r("Completed detecting parsers", d)),
                i.parsers = a
            }
            function a(i) {
                var o = i.tBodies, u = i.config, a, f, l = u.parsers, c, h, p, d, v, m, g, y, b = [];
                u.cache = {};
                if (!l)
                    return u.debug ? n("*Empty table!* Not building a cache") : "";
                u.debug && (y = new Date),
                u.showProcessing && t.isProcessing(i, !0);
                for (v = 0; v < o.length; v++) {
                    u.cache[v] = {
                        row: [],
                        normalized: []
                    };
                    if (!e(o[v]).hasClass(u.cssInfoBlock)) {
                        a = o[v] && o[v].rows.length || 0,
                        f = o[v].rows[0] && o[v].rows[0].cells.length || 0;
                        for (p = 0; p < a; ++p) {
                            m = e(o[v].rows[p]),
                            g = [];
                            if (m.hasClass(u.cssChildRow)) {
                                u.cache[v].row[u.cache[v].row.length - 1] = u.cache[v].row[u.cache[v].row.length - 1].add(m);
                                continue
                            }
                            u.cache[v].row.push(m);
                            for (d = 0; d < f; ++d)
                                c = s(i, m[0].cells[d], d),
                                h = l[d].format(c, i, m[0].cells[d], d),
                                g.push(h),
                                (l[d].type || "").toLowerCase() === "numeric" && (b[d] = Math.max(Math.abs(h) || 0, b[d] || 0));
                            g.push(u.cache[v].normalized.length),
                            u.cache[v].normalized.push(g)
                        }
                        u.cache[v].colMax = b
                    }
                }
                u.showProcessing && t.isProcessing(i),
                u.debug && r("Building cache for " + a + " rows", y)
            }
            function f(n, s) {
                var o = n.config, u = o.widgetOptions, a = n.tBodies, f = [], l = o.cache, c, h, p, d, v, m, g, y, b, w, E, S;
                if (i(l))
                    return;
                o.debug && (S = new Date);
                for (b = 0; b < a.length; b++) {
                    v = e(a[b]);
                    if (v.length && !v.hasClass(o.cssInfoBlock)) {
                        m = t.processTbody(n, v, !0),
                        c = l[b].row,
                        h = l[b].normalized,
                        p = h.length,
                        d = p ? h[0].length - 1 : 0;
                        for (g = 0; g < p; g++) {
                            E = h[g][d],
                            f.push(c[E]);
                            if (!o.appender || o.pager && (!o.pager.removeRows || !u.pager_removeRows) && !o.pager.ajax) {
                                w = c[E].length;
                                for (y = 0; y < w; y++)
                                    m.append(c[E][y])
                            }
                        }
                        t.processTbody(n, m, !1)
                    }
                }
                o.appender && o.appender(n, f),
                o.debug && r("Rebuilt table", S),
                !s && !o.appender && t.applyWidget(n),
                e(n).trigger("sortEnd", n),
                e(n).trigger("updateComplete", n)
            }
            function l(t) {
                var n = [], r = {}, i = 0, s = e(t).find("thead:eq(0), tfoot").children("tr"), o, u, a, f, l, c, h, p, d, v, m, g;
                for (o = 0; o < s.length; o++) {
                    c = s[o].cells;
                    for (u = 0; u < c.length; u++) {
                        l = c[u],
                        h = l.parentNode.rowIndex,
                        p = h + "-" + l.cellIndex,
                        d = l.rowSpan || 1,
                        v = l.colSpan || 1,
                        typeof n[h] == "undefined" && (n[h] = []);
                        for (a = 0; a < n[h].length + 1; a++)
                            if (typeof n[h][a] == "undefined") {
                                m = a;
                                break
                            }
                        r[p] = m,
                        i = Math.max(m, i),
                        e(l).attr({
                            "data-column": m
                        });
                        for (a = h; a < h + d; a++) {
                            typeof n[a] == "undefined" && (n[a] = []),
                            g = n[a];
                            for (f = m; f < m + v; f++)
                                g[f] = "x"
                        }
                    }
                }
                return t.config.columns = i + 1,
                r
            }
            function c(e) {
                return /^d/i.test(e) || e === 1
            }
            function h(i) {
                var s = l(i), o, u, a, f, h, p, v, m = i.config;
                m.headerList = [],
                m.headerContent = [],
                m.debug && (v = new Date),
                f = m.cssIcon ? '<i class="' + (m.cssIcon === t.css.icon ? t.css.icon : m.cssIcon + " " + t.css.icon) + '"></i>' : "",
                m.$headers = e(i).find(m.selectorHeaders).each(function(n) {
                    u = e(this),
                    o = m.headers[n],
                    m.headerContent[n] = e(this).html(),
                    h = m.headerTemplate.replace(/\{content\}/g, e(this).html()).replace(/\{icon\}/g, f),
                    m.onRenderTemplate && (a = m.onRenderTemplate.apply(u, [n, h]),
                    a && typeof a == "string" && (h = a)),
                    e(this).html('<div class="tablesorter-header-inner">' + h + "</div>"),
                    m.onRenderHeader && m.onRenderHeader.apply(u, [n]),
                    this.column = s[this.parentNode.rowIndex + "-" + this.cellIndex],
                    this.order = c(t.getData(u, o, "sortInitialOrder") || m.sortInitialOrder) ? [1, 0, 2] : [0, 1, 2],
                    this.count = -1,
                    this.lockedOrder = !1,
                    p = t.getData(u, o, "lockedOrder") || !1,
                    typeof p != "undefined" && p !== !1 && (this.order = this.lockedOrder = c(p) ? [1, 1, 1] : [0, 0, 0]),
                    u.addClass(t.css.header + " " + m.cssHeader),
                    m.headerList[n] = this,
                    u.parent().addClass(t.css.headerRow + " " + m.cssHeaderRow),
                    m.tabIndex && u.attr("tabindex", 0)
                }),
                d(i),
                m.debug && (r("Built headers:", v),
                n(m.$headers))
            }
            function p(e, t, n) {
                var r = e.config;
                r.$table.find(r.selectorRemove).remove(),
                u(e),
                a(e),
                S(r.$table, t, n)
            }
            function d(n) {
                var r, i = n.config;
                i.$headers.each(function(n, s) {
                    r = t.getData(s, i.headers[n], "sorter") === "false",
                    s.sortDisabled = r,
                    e(s)[r ? "addClass" : "removeClass"]("sorter-false")
                })
            }
            function v(n) {
                var r, i, s, o, u = n.config, a = u.sortList, f = [t.css.sortAsc + " " + u.cssAsc, t.css.sortDesc + " " + u.cssDesc], l = e(n).find("tfoot tr").children().removeClass(f.join(" "));
                u.$headers.removeClass(f.join(" ")),
                o = a.length;
                for (i = 0; i < o; i++)
                    if (a[i][1] !== 2) {
                        r = u.$headers.not(".sorter-false").filter('[data-column="' + a[i][0] + '"]' + (o === 1 ? ":last" : ""));
                        if (r.length)
                            for (s = 0; s < r.length; s++)
                                r[s].sortDisabled || (r.eq(s).addClass(f[a[i][1]]),
                                l.length && l.filter('[data-column="' + a[i][0] + '"]').eq(s).addClass(f[a[i][1]]))
                    }
            }
            function m(t) {
                if (t.config.widthFixed && e(t).find("colgroup").length === 0) {
                    var n = e("<colgroup>")
                      , r = e(t).width();
                    e(t.tBodies[0]).find("tr:first").children("td:visible").each(function() {
                        n.append(e("<col>").css("width", parseInt(e(this).width() / r * 1e3, 10) / 10 + "%"))
                    }),
                    e(t).prepend(n)
                }
            }
            function g(t, n) {
                var r, i, s, o = t.config, u = n || o.sortList;
                o.sortList = [],
                e.each(u, function(t, n) {
                    r = [parseInt(n[0], 10), parseInt(n[1], 10)],
                    s = o.$headers[r[0]],
                    s && (o.sortList.push(r),
                    i = e.inArray(r[1], s.order),
                    s.count = i >= 0 ? i : r[1] % (o.sortReset ? 3 : 2))
                })
            }
            function y(e, t) {
                return e && e[t] ? e[t].type || "" : ""
            }
            function b(n, r, i) {
                var s, o, u, a, l, c = n.config, h = !i[c.sortMultiSortKey], p = e(n);
                p.trigger("sortStart", n),
                r.count = i[c.sortResetKey] ? 2 : (r.count + 1) % (c.sortReset ? 3 : 2),
                c.sortRestart && (o = r,
                c.$headers.each(function() {
                    this !== o && (h || !e(this).is("." + t.css.sortDesc + ",." + t.css.sortAsc)) && (this.count = -1)
                })),
                o = r.column;
                if (h) {
                    c.sortList = [];
                    if (c.sortForce !== null) {
                        s = c.sortForce;
                        for (u = 0; u < s.length; u++)
                            s[u][0] !== o && c.sortList.push(s[u])
                    }
                    a = r.order[r.count];
                    if (a < 2) {
                        c.sortList.push([o, a]);
                        if (r.colSpan > 1)
                            for (u = 1; u < r.colSpan; u++)
                                c.sortList.push([o + u, a])
                    }
                } else {
                    c.sortAppend && c.sortList.length > 1 && t.isValueInArray(c.sortAppend[0][0], c.sortList) && c.sortList.pop();
                    if (t.isValueInArray(o, c.sortList))
                        for (u = 0; u < c.sortList.length; u++)
                            l = c.sortList[u],
                            a = c.$headers[l[0]],
                            l[0] === o && (l[1] = a.order[r.count],
                            l[1] === 2 && (c.sortList.splice(u, 1),
                            a.count = -1));
                    else {
                        a = r.order[r.count];
                        if (a < 2) {
                            c.sortList.push([o, a]);
                            if (r.colSpan > 1)
                                for (u = 1; u < r.colSpan; u++)
                                    c.sortList.push([o + u, a])
                        }
                    }
                }
                if (c.sortAppend !== null) {
                    s = c.sortAppend;
                    for (u = 0; u < s.length; u++)
                        s[u][0] !== o && c.sortList.push(s[u])
                }
                p.trigger("sortBegin", n),
                setTimeout(function() {
                    v(n),
                    w(n),
                    f(n)
                }, 1)
            }
            function w(e) {
                var n, s, o, u, a, f, l, c, h, p, d, v, m, g = 0, b = e.config, w = b.textSorter || "", E = b.sortList, S = E.length, x = e.tBodies.length;
                if (b.serverSideSorting || i(b.cache))
                    return;
                b.debug && (p = new Date);
                for (s = 0; s < x; s++)
                    a = b.cache[s].colMax,
                    f = b.cache[s].normalized,
                    l = f.length,
                    h = f && f[0] ? f[0].length - 1 : 0,
                    f.sort(function(r, i) {
                        for (n = 0; n < S; n++) {
                            d = null,
                            u = E[n][0],
                            c = E[n][1],
                            g = c === 0;
                            if (b.sortStable && r[u] === i[u] && S === 1)
                                return r[h] - i[h];
                            o = /n/i.test(y(b.parsers, u)),
                            o && b.strings[u] && !1 ? (typeof b.string[b.strings[u]] == "boolean" ? o = (g ? 1 : -1) * (b.string[b.strings[u]] ? -1 : 1) : o = b.strings[u] ? b.string[b.strings[u]] || 0 : 0,
                            d = b.numberSorter ? b.numberSorter(v[u], m[u], g, a[u], e) : t["sortNumeric" + (g ? "Asc" : "Desc")](r[u], i[u], o, a[u], u, e)) : (v = g ? r : i,
                            m = g ? i : r,
                            typeof w == "function" ? d = w(v[u], m[u], g, u, e) : typeof w == "object" && w.hasOwnProperty(u) ? d = w[u](v[u], m[u], g, u, e) : d = t["sortNatural" + (g ? "Asc" : "Desc")](r[u], i[u], u, e, b));
                            if (d != null)
                                return d
                        }
                        return r[h] - i[h]
                    });
                b.debug && r("Sorting on " + E.toString() + " and dir " + c + " time", p)
            }
            function E(e, t) {
                var n = e[0].config;
                n.pager && !n.pager.ajax && e.trigger("updateComplete"),
                typeof t == "function" && t(e[0])
            }
            function S(e, t, n) {
                t !== !1 && !e[0].isProcessing ? e.trigger("sorton", [e[0].config.sortList, function() {
                    E(e, n)
                }
                ]) : E(e, n)
            }
            function x(n) {
                var r = n.config, o = r.$table, l, c;
                r.$headers.find(r.selectorSort).add(r.$headers.filter(r.selectorSort)).unbind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter", function(t, s) {
                    if ((t.which || t.button) !== 1 && !/sort|keypress/.test(t.type) || t.type === "keypress" && t.which !== 13)
                        return;
                    if (t.type === "mouseup" && s !== !0 && (new Date).getTime() - c > 250)
                        return;
                    if (t.type === "mousedown")
                        return c = (new Date).getTime(),
                        t.target.tagName === "INPUT" ? "" : !r.cancelSelection;
                    r.delayInit && i(r.cache) && a(n);
                    var o = /TH|TD/.test(this.tagName) ? e(this) : e(this).parents("th, td").filter(":first")
                      , u = o[0];
                    u.sortDisabled || b(n, u, t)
                }),
                r.cancelSelection && r.$headers.attr("unselectable", "on").bind("selectstart", !1).css({
                    "user-select": "none",
                    MozUserSelect: "none"
                }),
                o.unbind("sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter", function(e) {
                    e.stopPropagation(),
                    r.sortList = [],
                    v(n),
                    w(n),
                    f(n)
                }).bind("updateAll.tablesorter", function(e, r, i) {
                    e.stopPropagation(),
                    t.refreshWidgets(n, !0, !0),
                    t.restoreHeaders(n),
                    h(n),
                    x(n),
                    p(n, r, i)
                }).bind("update.tablesorter updateRows.tablesorter", function(e, t, r) {
                    e.stopPropagation(),
                    d(n),
                    p(n, t, r)
                }).bind("updateCell.tablesorter", function(t, i, u, a) {
                    t.stopPropagation(),
                    o.find(r.selectorRemove).remove();
                    var f, l, c, h = o.find("tbody"), p = h.index(e(i).parents("tbody").filter(":first")), d = e(i).parents("tr").filter(":first");
                    i = e(i)[0],
                    h.length && p >= 0 && (l = h.eq(p).find("tr").index(d),
                    c = i.cellIndex,
                    f = r.cache[p].normalized[l].length - 1,
                    r.cache[p].row[n.config.cache[p].normalized[l][f]] = d,
                    r.cache[p].normalized[l][c] = r.parsers[c].format(s(n, i, c), n, i, c),
                    S(o, u, a))
                }).bind("addRows.tablesorter", function(e, t, a, f) {
                    e.stopPropagation();
                    if (i(r.cache))
                        d(n),
                        p(n, a, f);
                    else {
                        var c, h = t.filter("tr").length, v = [], m = t[0].cells.length, g = o.find("tbody").index(t.parents("tbody").filter(":first"));
                        r.parsers || u(n);
                        for (c = 0; c < h; c++) {
                            for (l = 0; l < m; l++)
                                v[l] = r.parsers[l].format(s(n, t[c].cells[l], l), n, t[c].cells[l], l);
                            v.push(r.cache[g].row.length),
                            r.cache[g].row.push([t[c]]),
                            r.cache[g].normalized.push(v),
                            v = []
                        }
                        S(o, a, f)
                    }
                }).bind("sorton.tablesorter", function(e, t, r, s) {
                    var u = n.config;
                    e.stopPropagation(),
                    o.trigger("sortStart", this),
                    g(n, t),
                    v(n),
                    u.delayInit && i(u.cache) && a(n),
                    o.trigger("sortBegin", this),
                    w(n),
                    f(n, s),
                    typeof r == "function" && r(n)
                }).bind("appendCache.tablesorter", function(e, t, r) {
                    e.stopPropagation(),
                    f(n, r),
                    typeof t == "function" && t(n)
                }).bind("applyWidgetId.tablesorter", function(e, i) {
                    e.stopPropagation(),
                    t.getWidgetById(i).format(n, r, r.widgetOptions)
                }).bind("applyWidgets.tablesorter", function(e, r) {
                    e.stopPropagation(),
                    t.applyWidget(n, r)
                }).bind("refreshWidgets.tablesorter", function(e, r, i) {
                    e.stopPropagation(),
                    t.refreshWidgets(n, r, i)
                }).bind("destroy.tablesorter", function(e, r, i) {
                    e.stopPropagation(),
                    t.destroy(n, r, i)
                })
            }
            var t = this;
            t.version = "2.14.5",
            t.parsers = [],
            t.widgets = [],
            t.defaults = {
                theme: "default",
                widthFixed: !1,
                showProcessing: !1,
                headerTemplate: "{content}",
                onRenderTemplate: null,
                onRenderHeader: null,
                cancelSelection: !0,
                tabIndex: !0,
                dateFormat: "mmddyyyy",
                sortMultiSortKey: "shiftKey",
                sortResetKey: "ctrlKey",
                usNumberFormat: !0,
                delayInit: !1,
                serverSideSorting: !1,
                headers: {},
                ignoreCase: !0,
                sortForce: null,
                sortList: [],
                sortAppend: null,
                sortStable: !1,
                sortInitialOrder: "asc",
                sortLocaleCompare: !1,
                sortReset: !1,
                sortRestart: !1,
                emptyTo: "bottom",
                stringTo: "max",
                textExtraction: "simple",
                textSorter: null,
                numberSorter: null,
                widgets: [],
                widgetOptions: {
                    zebra: ["even", "odd"]
                },
                initWidgets: !0,
                initialized: null,
                tableClass: "",
                cssAsc: "",
                cssDesc: "",
                cssHeader: "",
                cssHeaderRow: "",
                cssProcessing: "",
                cssChildRow: "tablesorter-childRow",
                cssIcon: "tablesorter-icon",
                cssInfoBlock: "tablesorter-infoOnly",
                selectorHeaders: "> thead th, > thead td",
                selectorSort: "th, td",
                selectorRemove: ".remove-me",
                debug: !1,
                headerList: [],
                empties: {},
                strings: {},
                parsers: []
            },
            t.css = {
                table: "tablesorter",
                childRow: "tablesorter-childRow",
                header: "tablesorter-header",
                headerRow: "tablesorter-headerRow",
                icon: "tablesorter-icon",
                info: "tablesorter-infoOnly",
                processing: "tablesorter-processing",
                sortAsc: "tablesorter-headerAsc",
                sortDesc: "tablesorter-headerDesc"
            },
            t.log = n,
            t.benchmark = r,
            t.construct = function(n) {
                return this.each(function() {
                    var r = this
                      , i = e.extend(!0, {}, t.defaults, n);
                    !r.hasInitialized && t.buildTable && this.tagName !== "TABLE" && t.buildTable(r, i),
                    t.setup(r, i)
                })
            }
            ,
            t.setup = function(r, i) {
                if (!r || !r.tHead || r.tBodies.length === 0 || r.hasInitialized === !0)
                    return i.debug ? n("stopping initialization! No table, thead, tbody or tablesorter has already been initialized") : "";
                var s = ""
                  , o = e(r)
                  , f = e.metadata;
                r.hasInitialized = !1,
                r.isProcessing = !0,
                r.config = i,
                e.data(r, "tablesorter", i),
                i.debug && e.data(r, "startoveralltimer", new Date),
                i.supportsTextContent = e("<span>x</span>")[0].textContent === "x",
                i.supportsDataObject = function(e) {
                    return e[0] = parseInt(e[0], 10),
                    e[0] > 1 || e[0] === 1 && parseInt(e[1], 10) >= 4
                }(e.fn.jquery.split(".")),
                i.string = {
                    max: 1,
                    min: -1,
                    "max+": 1,
                    "max-": -1,
                    zero: 0,
                    none: 0,
                    "null": 0,
                    top: !0,
                    bottom: !1
                },
                /tablesorter\-/.test(o.attr("class")) || (s = i.theme !== "" ? " tablesorter-" + i.theme : ""),
                i.$table = o.addClass(t.css.table + " " + i.tableClass + s),
                i.$tbodies = o.children("tbody:not(." + i.cssInfoBlock + ")"),
                i.widgetInit = {},
                h(r),
                m(r),
                u(r),
                i.delayInit || a(r),
                x(r),
                i.supportsDataObject && typeof o.data().sortlist != "undefined" ? i.sortList = o.data().sortlist : f && o.metadata() && o.metadata().sortlist && (i.sortList = o.metadata().sortlist),
                t.applyWidget(r, !0),
                i.sortList.length > 0 ? o.trigger("sorton", [i.sortList, {}, !i.initWidgets]) : i.initWidgets && t.applyWidget(r),
                i.showProcessing && o.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(e) {
                    t.isProcessing(r, e.type === "sortBegin")
                }),
                r.hasInitialized = !0,
                r.isProcessing = !1,
                i.debug && t.benchmark("Overall initialization time", e.data(r, "startoveralltimer")),
                o.trigger("tablesorter-initialized", r),
                typeof i.initialized == "function" && i.initialized(r)
            }
            ,
            t.isProcessing = function(n, r, i) {
                n = e(n);
                var s = n[0].config
                  , o = i || n.find("." + t.css.header);
                r ? (s.sortList.length > 0 && (o = o.filter(function() {
                    return this.sortDisabled ? !1 : t.isValueInArray(parseFloat(e(this).attr("data-column")), s.sortList)
                })),
                o.addClass(t.css.processing + " " + s.cssProcessing)) : o.removeClass(t.css.processing + " " + s.cssProcessing)
            }
            ,
            t.processTbody = function(t, n, r) {
                var i;
                if (r)
                    return t.isProcessing = !0,
                    n.before('<span class="tablesorter-savemyplace"/>'),
                    i = e.fn.detach ? n.detach() : n.remove(),
                    i;
                i = e(t).find("span.tablesorter-savemyplace"),
                n.insertAfter(i),
                i.remove(),
                t.isProcessing = !1
            }
            ,
            t.clearTableBody = function(t) {
                e(t)[0].config.$tbodies.empty()
            }
            ,
            t.restoreHeaders = function(t) {
                var n = t.config;
                n.$table.find(n.selectorHeaders).each(function(t) {
                    e(this).find(".tablesorter-header-inner").length && e(this).html(n.headerContent[t])
                })
            }
            ,
            t.destroy = function(n, r, i) {
                n = e(n)[0];
                if (!n.hasInitialized)
                    return;
                t.refreshWidgets(n, !0, !0);
                var s = e(n)
                  , o = n.config
                  , u = s.find("thead:first")
                  , a = u.find("tr." + t.css.headerRow).removeClass(t.css.headerRow + " " + o.cssHeaderRow)
                  , f = s.find("tfoot:first > tr").children("th, td");
                u.find("tr").not(a).remove(),
                s.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(".tablesorter ")),
                o.$headers.add(f).removeClass([t.css.header, o.cssHeader, o.cssAsc, o.cssDesc, t.css.sortAsc, t.css.sortDesc].join(" ")).removeAttr("data-column"),
                a.find(o.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter keypress.tablesorter"),
                t.restoreHeaders(n),
                r !== !1 && s.removeClass(t.css.table + " " + o.tableClass + " tablesorter-" + o.theme),
                n.hasInitialized = !1,
                typeof i == "function" && i(n)
            }
            ,
            t.regex = {
                chunk: /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
                hex: /^0x[0-9a-f]+$/i
            },
            t.sortNatural = function(e, n) {
                if (e === n)
                    return 0;
                var r, i, s, o, u, a, f, l, c = t.regex;
                if (c.hex.test(n)) {
                    i = parseInt(e.match(c.hex), 16),
                    o = parseInt(n.match(c.hex), 16);
                    if (i < o)
                        return -1;
                    if (i > o)
                        return 1
                }
                r = e.replace(c.chunk, "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0"),
                s = n.replace(c.chunk, "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0"),
                l = Math.max(r.length, s.length);
                for (f = 0; f < l; f++) {
                    u = isNaN(r[f]) ? r[f] || 0 : parseFloat(r[f]) || 0,
                    a = isNaN(s[f]) ? s[f] || 0 : parseFloat(s[f]) || 0;
                    if (isNaN(u) !== isNaN(a))
                        return isNaN(u) ? 1 : -1;
                    typeof u != typeof a && (u += "",
                    a += "");
                    if (u < a)
                        return -1;
                    if (u > a)
                        return 1
                }
                return 0
            }
            ,
            t.sortNaturalAsc = function(e, n, r, i, s) {
                if (e === n)
                    return 0;
                var o = s.string[s.empties[r] || s.emptyTo];
                return e === "" && o !== 0 ? typeof o == "boolean" ? o ? -1 : 1 : -o || -1 : n === "" && o !== 0 ? typeof o == "boolean" ? o ? 1 : -1 : o || 1 : t.sortNatural(e, n)
            }
            ,
            t.sortNaturalDesc = function(e, n, r, i, s) {
                if (e === n)
                    return 0;
                var o = s.string[s.empties[r] || s.emptyTo];
                return e === "" && o !== 0 ? typeof o == "boolean" ? o ? -1 : 1 : o || 1 : n === "" && o !== 0 ? typeof o == "boolean" ? o ? 1 : -1 : -o || -1 : t.sortNatural(n, e)
            }
            ,
            t.sortText = function(e, t) {
                return e > t ? 1 : e < t ? -1 : 0
            }
            ,
            t.getTextValue = function(e, t, n) {
                if (n) {
                    var r, i = e ? e.length : 0, s = n + t;
                    for (r = 0; r < i; r++)
                        s += e.charCodeAt(r);
                    return t * s
                }
                return 0
            }
            ,
            t.sortNumericAsc = function(e, n, r, i, s, o) {
                if (e === n)
                    return 0;
                var u = o.config
                  , a = u.string[u.empties[s] || u.emptyTo];
                return e === "" && a !== 0 ? typeof a == "boolean" ? a ? -1 : 1 : -a || -1 : n === "" && a !== 0 ? typeof a == "boolean" ? a ? 1 : -1 : a || 1 : (isNaN(e) && (e = t.getTextValue(e, r, i)),
                isNaN(n) && (n = t.getTextValue(n, r, i)),
                e - n)
            }
            ,
            t.sortNumericDesc = function(e, n, r, i, s, o) {
                if (e === n)
                    return 0;
                var u = o.config
                  , a = u.string[u.empties[s] || u.emptyTo];
                return e === "" && a !== 0 ? typeof a == "boolean" ? a ? -1 : 1 : a || 1 : n === "" && a !== 0 ? typeof a == "boolean" ? a ? 1 : -1 : -a || -1 : (isNaN(e) && (e = t.getTextValue(e, r, i)),
                isNaN(n) && (n = t.getTextValue(n, r, i)),
                n - e)
            }
            ,
            t.sortNumeric = function(e, t) {
                return e - t
            }
            ,
            t.characterEquivalents = {
                a: "áàâãäąå",
                A: "ÁÀÂÃÄĄÅ",
                c: "çćč",
                C: "ÇĆČ",
                e: "éèêëěę",
                E: "ÉÈÊËĚĘ",
                i: "íìİîïı",
                I: "ÍÌİÎÏ",
                o: "óòôõö",
                O: "ÓÒÔÕÖ",
                ss: "ß",
                SS: "ẞ",
                u: "úùûüů",
                U: "ÚÙÛÜŮ"
            },
            t.replaceAccents = function(e) {
                var n, r = "[", i = t.characterEquivalents;
                if (!t.characterRegex) {
                    t.characterRegexArray = {};
                    for (n in i)
                        typeof n == "string" && (r += i[n],
                        t.characterRegexArray[n] = new RegExp("[" + i[n] + "]","g"));
                    t.characterRegex = new RegExp(r + "]")
                }
                if (t.characterRegex.test(e))
                    for (n in i)
                        typeof n == "string" && (e = e.replace(t.characterRegexArray[n], n));
                return e
            }
            ,
            t.isValueInArray = function(e, t) {
                var n, r = t.length;
                for (n = 0; n < r; n++)
                    if (t[n][0] === e)
                        return !0;
                return !1
            }
            ,
            t.addParser = function(e) {
                var n, r = t.parsers.length, i = !0;
                for (n = 0; n < r; n++)
                    t.parsers[n].id.toLowerCase() === e.id.toLowerCase() && (i = !1);
                i && t.parsers.push(e)
            }
            ,
            t.getParserById = function(e) {
                var n, r = t.parsers.length;
                for (n = 0; n < r; n++)
                    if (t.parsers[n].id.toLowerCase() === e.toString().toLowerCase())
                        return t.parsers[n];
                return !1
            }
            ,
            t.addWidget = function(e) {
                t.widgets.push(e)
            }
            ,
            t.getWidgetById = function(e) {
                var n, r, i = t.widgets.length;
                for (n = 0; n < i; n++) {
                    r = t.widgets[n];
                    if (r && r.hasOwnProperty("id") && r.id.toLowerCase() === e.toLowerCase())
                        return r
                }
            }
            ,
            t.applyWidget = function(n, i) {
                n = e(n)[0];
                var s = n.config, o = s.widgetOptions, u = [], a, f, l;
                s.debug && (a = new Date),
                s.widgets.length && (s.widgets = e.grep(s.widgets, function(t, n) {
                    return e.inArray(t, s.widgets) === n
                }),
                e.each(s.widgets || [], function(e, n) {
                    l = t.getWidgetById(n),
                    l && l.id && (l.priority || (l.priority = 10),
                    u[e] = l)
                }),
                u.sort(function(e, t) {
                    return e.priority < t.priority ? -1 : e.priority === t.priority ? 0 : 1
                }),
                e.each(u, function(t, r) {
                    if (r) {
                        if (i || !s.widgetInit[r.id])
                            r.hasOwnProperty("options") && (o = n.config.widgetOptions = e.extend(!0, {}, r.options, o)),
                            r.hasOwnProperty("init") && r.init(n, r, s, o),
                            s.widgetInit[r.id] = !0;
                        !i && r.hasOwnProperty("format") && r.format(n, s, o, !1)
                    }
                })),
                s.debug && (f = s.widgets.length,
                r("Completed " + (i === !0 ? "initializing " : "applying ") + f + " widget" + (f !== 1 ? "s" : ""), a))
            }
            ,
            t.refreshWidgets = function(r, i, s) {
                r = e(r)[0];
                var o, u = r.config, a = u.widgets, f = t.widgets, l = f.length;
                for (o = 0; o < l; o++)
                    f[o] && f[o].id && (i || e.inArray(f[o].id, a) < 0) && (u.debug && n("Refeshing widgets: Removing " + f[o].id),
                    f[o].hasOwnProperty("remove") && u.widgetInit[f[o].id] && (f[o].remove(r, u, u.widgetOptions),
                    u.widgetInit[f[o].id] = !1));
                s !== !0 && t.applyWidget(r, i)
            }
            ,
            t.getData = function(t, n, r) {
                var i = "", s = e(t), o, u;
                return s.length ? (o = e.metadata ? s.metadata() : !1,
                u = " " + (s.attr("class") || ""),
                typeof s.data(r) != "undefined" || typeof s.data(r.toLowerCase()) != "undefined" ? i += s.data(r) || s.data(r.toLowerCase()) : o && typeof o[r] != "undefined" ? i += o[r] : n && typeof n[r] != "undefined" ? i += n[r] : u !== " " && u.match(" " + r + "-") && (i = u.match(new RegExp("\\s" + r + "-([\\w-]+)"))[1] || ""),
                e.trim(i)) : ""
            }
            ,
            t.formatFloat = function(t, n) {
                if (typeof t != "string" || t === "")
                    return t;
                var r, i = n && n.config ? n.config.usNumberFormat !== !1 : typeof n != "undefined" ? n : !0;
                return i ? t = t.replace(/,/g, "") : t = t.replace(/[\s|\.]/g, "").replace(/,/g, "."),
                /^\s*\([.\d]+\)/.test(t) && (t = t.replace(/^\s*\(([.\d]+)\)/, "-$1")),
                r = parseFloat(t),
                isNaN(r) ? e.trim(t) : r
            }
            ,
            t.isDigit = function(e) {
                return isNaN(e) ? /^[\-+(]?\d+[)]?$/.test(e.toString().replace(/[,.'"\s]/g, "")) : !0
            }
        }
    });
    var t = e.tablesorter;
    e.fn.extend({
        tablesorter: t.construct
    }),
    t.addParser({
        id: "text",
        is: function() {
            return !0
        },
        format: function(n, r) {
            var i = r.config;
            return n && (n = e.trim(i.ignoreCase ? n.toLocaleLowerCase() : n),
            n = i.sortLocaleCompare ? t.replaceAccents(n) : n),
            n
        },
        type: "text"
    }),
    t.addParser({
        id: "digit",
        is: function(e) {
            return t.isDigit(e)
        },
        format: function(n, r) {
            var i = t.formatFloat((n || "").replace(/[^\w,. \-()]/g, ""), r);
            return n && typeof i == "number" ? i : n ? e.trim(n && r.config.ignoreCase ? n.toLocaleLowerCase() : n) : n
        },
        type: "numeric"
    }),
    t.addParser({
        id: "currency",
        is: function(e) {
            return /^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((e || "").replace(/[,. ]/g, ""))
        },
        format: function(n, r) {
            var i = t.formatFloat((n || "").replace(/[^\w,. \-()]/g, ""), r);
            return n && typeof i == "number" ? i : n ? e.trim(n && r.config.ignoreCase ? n.toLocaleLowerCase() : n) : n
        },
        type: "numeric"
    }),
    t.addParser({
        id: "ipAddress",
        is: function(e) {
            return /^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(e)
        },
        format: function(e, n) {
            var r, i = e ? e.split(".") : "", s = "", o = i.length;
            for (r = 0; r < o; r++)
                s += ("00" + i[r]).slice(-3);
            return e ? t.formatFloat(s, n) : e
        },
        type: "numeric"
    }),
    t.addParser({
        id: "url",
        is: function(e) {
            return /^(https?|ftp|file):\/\//.test(e)
        },
        format: function(t) {
            return t ? e.trim(t.replace(/(https?|ftp|file):\/\//, "")) : t
        },
        type: "text"
    }),
    t.addParser({
        id: "isoDate",
        is: function(e) {
            return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(e)
        },
        format: function(e, n) {
            return e ? t.formatFloat(e !== "" ? (new Date(e.replace(/-/g, "/"))).getTime() || "" : "", n) : e
        },
        type: "numeric"
    }),
    t.addParser({
        id: "percent",
        is: function(e) {
            return /(\d\s*?%|%\s*?\d)/.test(e) && e.length < 15
        },
        format: function(e, n) {
            return e ? t.formatFloat(e.replace(/%/g, ""), n) : e
        },
        type: "numeric"
    }),
    t.addParser({
        id: "usLongDate",
        is: function(e) {
            return /^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(e) || /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(e)
        },
        format: function(e, n) {
            return e ? t.formatFloat((new Date(e.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", n) : e
        },
        type: "numeric"
    }),
    t.addParser({
        id: "shortDate",
        is: function(e) {
            return /(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((e || "").replace(/\s+/g, " ").replace(/[\-.,]/g, "/"))
        },
        format: function(e, n, r, i) {
            if (e) {
                var s = n.config
                  , o = s.headerList[i]
                  , u = o.dateFormat || t.getData(o, s.headers[i], "dateFormat") || s.dateFormat;
                e = e.replace(/\s+/g, " ").replace(/[\-.,]/g, "/"),
                u === "mmddyyyy" ? e = e.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2") : u === "ddmmyyyy" ? e = e.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1") : u === "yyyymmdd" && (e = e.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3"))
            }
            return e ? t.formatFloat((new Date(e)).getTime() || "", n) : e
        },
        type: "numeric"
    }),
    t.addParser({
        id: "time",
        is: function(e) {
            return /^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(e)
        },
        format: function(e, n) {
            return e ? t.formatFloat((new Date("2000/01/01 " + e.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", n) : e
        },
        type: "numeric"
    }),
    t.addParser({
        id: "metadata",
        is: function() {
            return !1
        },
        format: function(t, n, r) {
            var i = n.config
              , s = i.parserMetadataName ? i.parserMetadataName : "sortValue";
            return e(r).metadata()[s]
        },
        type: "numeric"
    }),
    t.addWidget({
        id: "zebra",
        priority: 90,
        format: function(n, r, i) {
            var s, o, u, a, f, l, c, h, p = new RegExp(r.cssChildRow,"i"), d = r.$tbodies;
            r.debug && (l = new Date);
            for (c = 0; c < d.length; c++)
                s = d.eq(c),
                h = s.children("tr").length,
                h > 1 && (a = 0,
                o = s.children("tr:visible").not(r.selectorRemove),
                o.each(function() {
                    u = e(this),
                    p.test(this.className) || a++,
                    f = a % 2 === 0,
                    u.removeClass(i.zebra[f ? 1 : 0]).addClass(i.zebra[f ? 0 : 1])
                }));
            r.debug && t.benchmark("Applying Zebra widget", l)
        },
        remove: function(t, n, r) {
            var i, s, o = n.$tbodies, u = (r.zebra || ["even", "odd"]).join(" ");
            for (i = 0; i < o.length; i++)
                s = e.tablesorter.processTbody(t, o.eq(i), !0),
                s.children().removeClass(u),
                e.tablesorter.processTbody(t, s, !1)
        }
    })
}(jQuery);
