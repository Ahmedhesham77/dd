/**
 * MAIN APP Javascript file
 *
 * @author Alex Chernetsky
 * @copyright 2002-2013 Gurtam
 * @license http://www.gnu.org/licenses/lgpl.html LGPL
 */

define(["underscore", "backbone", "dashboardUtil", "d3.v3.3.5.4", "nv.d3.ext", "map", "jquery.tablesorter", "jquery.cookie", "map"], function(e, t, n, r, i, s) {
    "use strict";
    $.cookie.json = !0;
    var o = {
        tmpl: {
            widgetContentTemplate: "#widget-content-template",
            tableTemplate: "#table-template",
            tableHeadTemplate: "#thead-template",
            tableBodyTemplate: "#tbody-template",
            tableRowTemplate: "#row-template",
            numberTdTemplate: "#number-td-template",
            textTdTemplate: "#text-td-template",
            imageTdTemplate: "#image-td-template",
            satelliteTdTemplate: "#satellite-td-template"
        },
        rowMeta: {
            lat: "data-row-lat",
            lon: "data-row-lon",
            iconSrc: "data-row-iconsrc"
        }
    }
      , u = {
        tableTemplate: $(o.tmpl.tableTemplate).html(),
        tableHeadTemplate: $(o.tmpl.tableHeadTemplate).html(),
        tableBodyTemplate: $(o.tmpl.tableBodyTemplate).html(),
        tableRowTemplate: $(o.tmpl.tableRowTemplate).html(),
        textTdTemplate: $(o.tmpl.textTdTemplate).html(),
        numberTdTemplate: $(o.tmpl.numberTdTemplate).html(),
        imageTdTemplate: $(o.tmpl.imageTdTemplate).html(),
        satelliteTdTemplate: $(o.tmpl.satelliteTdTemplate).html()
    }
      , a = t.Model.extend({
        defaults: {
            is_static: !1,
            server_type: "",
            type: "plot",
            ct: "",
            filters: {},
            gid: null,
            data: undefined,
            is_refresh: !1,
            title: ""
        },
        initialize: function(e) {
            return t.Model.prototype.initialize.apply(this, [e]),
            this
        },
        reset: function() {
            var e = this.defaults;
            return this.set("is_static", e.is_static),
            this.set("server_type", e.server_type),
            this.set("type", e.type),
            this.set("ct", e.ct),
            this.set("filters", {}),
            this.set("gid", e.gid),
            this
        },
        abort: function() {
            this.jqXHR && (this.jqXHR.abort(),
            this.jqXHR = null,
            this.set("is_refresh", !1))
        },
        refreshData: function(e, t) {
            this.abort();
            if (t || !this.get("is_static") || this.get("data") === undefined || this.get("data") === null)
                this.set("is_refresh", !0),
                this._sendRequest(e, t)
        },
        data: function() {
            var t = {
                type: this.get("server_type"),
                ct: this.get("ct"),
                filters: JSON.stringify(this.get("filters"))
            };
            return this.get("gid") !== null ? e.extend(t, {
                gid: this.get("gid")
            }) : t
        },
        _sendRequest: function(e, t) {
            var r = wialon.core.Session.getInstance().getToken();
            r && r.th ? this._sendRequestImpl(e, t, "token", r.th) : wialon.core.Session.getInstance().createAuthHash(n.bind(function(n, r) {
                n === 0 && this._sendRequestImpl(e, t, "hash", r.authHash)
            }, this))
        },
        _sendRequestImpl: function(t, r, i, s) {
            var o = this.data()
              , u = n.getParameterByName("b", "master")
              , a = n.getBaseUrl();
            o = e.extend(o, {
                sid: wialon.core.Session.getInstance().getId(),
                url: a,
                from: t[0],
                to: t[1],
                lang: n.getLang()
            }),
            o[i] = s,
            r && (o = e.extend(o, {
                force: !0
            })),
            this.jqXHR = $.ajax({
                url: n.getServer() + "widget/data/",
                data: o,
                type: "POST",
                dataType: "json",
                timeout: 3e6,
                success: n.bind(function(e, t, n) {
                    this.jqXHR = null,
                    this._callback(t, e)
                }, this),
                error: n.bind(function(e, t, n) {
                    this.set("is_refresh", !1),
                    this.set("data", null)
                }, this)
            })
        },
        _callback: function(e, t) {
            if (e !== "success" || t.status !== "OK" && t.status !== "ZERO_RESULTS")
                this.set("data", null);
            else if (this.get("data") !== null || t !== null)
                this.set("data", t, {
                    silent: !0
                }),
                this.trigger("change:data", this, t);
            this.set("is_refresh", !1)
        }
    })
      , f = t.Collection.extend({
        model: a
    })
      , l = t.View.extend({
        className: "panel panel-default dashboard-panel",
        template: $(o.tmpl.widgetContentTemplate).html(),
        events: {
            "click .icon.chevron": "click_chevron",
            "click .icon.remove": "click_remove",
            "click .icon.settings": "click_settings"
        },
        initialize: function(e) {
            t.View.prototype.initialize.apply(this, [e]),
            this.listenTo(this.model, "change:is_refresh", n.bind(function(e, t, n) {
                this.change_is_refresh(e, t, n)
            }, this)),
            this.listenTo(this.model, "change:data", this.refresh)
        },
        click_chevron: function(e) {
            $(e.target).toggleClass("chevron-show").toggleClass("chevron-hide"),
            $(e.target).parents(".panel:first").find(".panel-body-wrapper").fadeToggle(200).css({
                overflow: "auto"
            });
            var t = $.cookie("chevron");
            t ? t[this.model.id] = $(e.target).hasClass("chevron-hide") : (t = {},
            t[this.model.id] = $(e.target).hasClass("chevron-hide")),
            $.cookie("chevron", t, {
                expires: 300
            })
        },
        click_remove: function(r) {
            this.stopListening(this.model, "change:is_refresh"),
            this.stopListening(this.model, "change:data");
            var i = $.cookie("dashboard_charts_type");
            i && (e.has(i, this.model.id) && delete i[this.model.id],
            $.cookie("dashboard_charts_type", i, {
                expires: 300
            }));
            var s = $.cookie("chevron");
            s && (e.has(s, this.model.id) && delete s[this.model.id],
            $.cookie("chevron", s, {
                expires: 300
            })),
            this.model.abort(),
            this.undelegateEvents(),
            this.$el.removeData().unbind(),
            t.View.prototype.remove.call(this);
            var o = wialon.core.Session.getInstance().getToken();
            o && o.th ? this.click_remove_impl({
                token: o.th
            }) : wialon.core.Session.getInstance().createAuthHash(n.bind(function(e, t) {
                e === 0 && this.click_remove_impl({
                    hash: t.authHash
                })
            }, this))
        },
        click_remove_impl: function(t) {
            t = e.extend(t, {
                url: n.getBaseUrl(),
                widget_id: this.model.id
            }),
            $.ajax({
                url: n.getServer() + "widget/delete",
                type: "POST",
                data: t,
                dataType: "json",
                success: n.bind(function(e, t, n) {
                    t === "success" && e.status === "OK" && this.trigger("remove", this)
                }, this)
            })
        },
        click_settings: function() {
            this.trigger("settings", this)
        },
        change_is_refresh: function(e, t) {
            t ? $(".gug", this.$el).addClass("gug-progress") : $(".gug", this.$el).removeClass("gug-progress")
        },
        refresh: function() {
            return this
        },
        render: function() {
            $(this.$el).html(e.template(this.template, {
                cid: this.model.cid
            })),
            $(this.$el).attr("id", "dashboard-panel-" + this.model.cid),
            $(".panel-title", this.$el).html(e.unescape(this.model.get("title"))),
            $(".charts-type-wrapper", this.$el).hide();
            var t = $.cookie("chevron");
            return t ? e.has(t, this.model.id) ? t[this.model.id] ? $(".icon.chevron", this.$el).addClass("chevron-hide") : ($(".icon.chevron", this.$el).addClass("chevron-show"),
            $(".panel-body-wrapper", this.$el).hide()) : $(".icon.chevron", this.$el).addClass("chevron-hide") : $(".icon.chevron", this.$el).addClass("chevron-hide"),
            this.model.get("server_type") !== "units" && ($(".icon.refresh", this.$el).hide(),
            $(".icon.chevron", this.$el).hide()),
            this.model.get("server_type") === "units" && $(".icon.settings", this.$el).hide(),
            this
        },
        get_divisor_by_data_type: function(e) {
            var t = 1;
            switch (e) {
            case "DISTANCE":
                t = 1e3
            }
            return t
        },
        show_no_available_label: function() {
            $("#" + this.model.cid).html('<div class="no-data-available">' + n.tr("No Data Available.") + "</div>")
        },
        format_x_axis: function(e, t) {
            var n = this.model.get("data").metainfo ? this.model.get("data").metainfo.xaxis.format : "";
            return t = t || n,
            wialon.util.DateTime.formatTime(parseInt(e, 10), !0, t)
        },
        format_y_axis: function(e, t) {
            var i = "", s, o;
            return t = t || this.model.get("data").metainfo.yaxis,
            t.type === "DURATION" ? (e > 86400 ? (i = (e / 86400 | 0) + " " + n.tr("d.") + " ",
            e %= 86400,
            s = "H",
            o = "h.") : e >= 3600 ? (s = "H:m:s",
            o = "h.") : e >= 60 ? (s = "m:s",
            o = "m.") : (s = "s",
            o = "s."),
            i += (e ? wialon.util.DateTime.formatDuration(Math.floor(e), s) : "0") + " " + n.tr(o)) : t.type === "UNIX_TIME" ? i = wialon.util.DateTime.formatTime(e, !0, t.format) : parseInt(e, 10) === e ? i = r.format("d")(e) : i = r.format(".1f")(e),
            i
        },
        saved_chart_legend_state: function(t) {
            t.dispatch.on("stateChange", n.bind(function(t) {
                var n = this.model.get("data").data, r = 0, i;
                n || (n = this.model.get("data"));
                if (e.has(n, "first_chart")) {
                    n.first_chart.disabled = t.disabled[0],
                    n.second_chart.disabled = t.disabled[1];
                    return
                }
                for (var s in n)
                    i = n[s],
                    i.disabled = t.disabled[r],
                    r++
            }, this))
        },
        reject_disable_items: function(t) {
            var n = this.model.get("data")
              , r = -1;
            if (!n || n.status !== "OK")
                return [];
            for (var i in n.data) {
                r++;
                if (!e.has(n.data, i))
                    continue;
                e.has(n.data[i], "disabled") && n.data[i].disabled === !0 && t[r] && (t[r].disabled = !0)
            }
        }
    })
      , c = l.extend({
        headingAddonTemplate: $("#plot-heading-template-add-on").html(),
        events: function() {
            return e.extend({}, l.prototype.events, {
                "click .icon.pie-chart": "pie_chart",
                "click .icon.line-chart": "line_chart",
                "click .icon.vertical-bar-chart": "vertical_bar_chart",
                "click .icon.horizontal-bar-chart": "horizontal_bar_chart",
                "click .icon.vertical-stacked-bar-chart": "vertical_stacked_bar_chart"
            })
        }(),
        initialize: function(e) {
            l.prototype.initialize.apply(this, [e])
        },
        click_icon_chart: function(e) {
            $(".icon-chart", this.$el).addClass("disable-chart"),
            $(e, this.$el).removeClass("disable-chart");
            var t = $(e, this.$el).data("chart-type")
              , n = $.cookie("dashboard_charts_type");
            n ? n[this.model.id] = t : (n = {},
            n[this.model.id] = t),
            $.cookie("dashboard_charts_type", n, {
                expires: 300
            })
        },
        pie_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target),
            this.draw_pie_chart()
        },
        line_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target),
            this.draw_line_chart()
        },
        vertical_bar_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target),
            this.draw_vertical_bar_chart()
        },
        horizontal_bar_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target),
            this.draw_horizontal_bar_chart()
        },
        vertical_stacked_bar_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target),
            this.draw_vertical_stacked_bar_chart_data()
        },
        get_pie_chart_data: function() {
            var t = this.model.get("data");
            if (!t || t.status !== "OK")
                return [];
            var n = [];
            for (var r in t.data) {
                if (!e.has(t.data, r))
                    continue;
                var i = t.data[r].nm
                  , s = t.data[r].data
                  , o = {
                    label: i,
                    value: t.data[r].total.rawValue / this.get_divisor_by_data_type(t.data[r].total.dataType)
                };
                s.length > 0 && t.data[r].total.rawValue > 0 && n.push(o)
            }
            return n
        },
        get_line_chart_data: function() {
            var t = this.model.get("data");
            if (!t || t.status !== "OK")
                return [];
            var n = [];
            for (var r in t.data) {
                if (!e.has(t.data, r))
                    continue;
                var i = t.data[r].nm
                  , s = t.data[r].data
                  , o = {
                    key: i,
                    values: null
                }
                  , u = [];
                for (var a = 0, f = s.length; a < f; a++) {
                    var l = s[a];
                    if (l.data.rawValue === null || l.data.rawValue === undefined)
                        continue;
                    var c = wialon.util.DateTime.userTime(l.time.rawValue)
                      , h = l.data.rawValue / this.get_divisor_by_data_type(l.data.dataType)
                      , p = wialon.util.DateTime.getTimezoneOffset();
                    u.push({
                        x: c - c % 86400 - (p < 0 ? p : 0),
                        y: h
                    })
                }
                u.length > 0 && (o.values = u,
                n.push(o))
            }
            return n
        },
        draw_pie_chart: function() {
            var t = this.get_pie_chart_data();
            if (!t || t && e.isEmpty(t))
                return this.show_no_available_label(),
                this;
            this.reject_disable_items(t);
            var s = "#" + this.model.cid + " svg";
            r.select(s).remove(),
            $(s, this.$el).empty(),
            $("#" + this.model.cid, this.$el).html('<div><svg class="svg-class"></svg></div>'),
            i.addGraph(n.bind(function(e) {
                var t = i.models.pieChart().options({
                    margin: {
                        top: 0,
                        right: 30,
                        bottom: 35,
                        left: 30
                    },
                    valueFormat: n.bind(function(e) {
                        var t = this.model.get("data").metainfo.yaxis;
                        return t !== null && t.format !== null && (t.type !== "DURATION" && t !== "UNIX_TIME" ? e = wialon.util.String.sprintf(t.format, e) : t.type === "DURATION" && (e = this.format_y_axis(e))),
                        e
                    }, this),
                    noData: n.tr("No Data Available.")
                }).tooltipContent(function(e, t, n, r) {
                    return "<h3>" + e + "</h3><p>" + t + "</p>"
                }).x(function(e) {
                    return e.label
                }).y(function(e) {
                    return e.value
                }).showLabels(!0);
                return t.pie.pieLabelsOutside(!1).labelType("percent").labelThreshold(.04),
                r.select(s).datum(e).transition().duration(500).call(t),
                i.utils.windowResize(t.update),
                this.saved_chart_legend_state(t),
                t
            }, this, t))
        },
        fix_line_chart_x_axis: function(e, t) {
            var n, r, i, s, o = 1, u, a;
            if (t.length) {
                n = t[0].values.length;
                if (n) {
                    r = Math.floor(e.xAxis.ticks()),
                    i = [],
                    n > r && (s = this.model.get("data").query.interval,
                    u = Math.round((parseInt(s.to, 10) - parseInt(s.from, 10)) / 86400),
                    o = Math.floor((u - 1) / (r - 1)),
                    o < 1 && (o = 1));
                    for (a = 0; a < n; a += o)
                        i.push(t[0].values[a].x);
                    e.xAxis.tickValues(i),
                    e.update()
                }
            }
            return this
        },
        draw_line_chart: function() {
            var t = this.get_line_chart_data();
            if (!t || t && e.isEmpty(t))
                return this.show_no_available_label(),
                this;
            this.reject_disable_items(t);
            var s = "#" + this.model.cid + " svg";
            r.select(s).remove(),
            $(s, this.$el).empty(),
            $("#" + this.model.cid, this.$el).html('<div><svg class="svg-class"></svg></div>');
            var o = null;
            this.model.get("data").metainfo.yaxis && (o = this.model.get("data").metainfo.yaxis.label),
            i.addGraph(n.bind(function(t) {
                var u = i.models.lineChart().options({
                    margin: {
                        top: 0,
                        right: 15,
                        bottom: 35,
                        left: 65
                    },
                    showXAxis: !0,
                    showYAxis: !0,
                    tooltipContent: n.bind(function(e, t, n, r, i) {
                        var s = this.model.get("data").metainfo.yaxis
                          , o = this.model.get("data").metainfo.tooltip.format;
                        s !== null && s.format !== null && (s.type === "DURATION" ? n = this.format_y_axis(r.point.y) : s.type !== "DURATION" && s.type !== "UNIX_TIME" && (n = wialon.util.String.sprintf(s.format, r.point.y)));
                        var u = o === null ? n + " at " + t : wialon.util.String.sprintf(o, n, t);
                        return "<h3>" + e + "</h3>" + "<p>" + u + "</p>"
                    }, this),
                    noData: n.tr("No Data Available.")
                }).x(function(e) {
                    return e.x
                }).y(function(e) {
                    return e.y
                });
                n.isTouch() && u.legend.align(!1),
                u.xAxis.showMaxMin(!1).tickFormat(n.bind(function(e) {
                    return this.format_x_axis(e)
                }, this)),
                u.yAxis.showMaxMin(t.length === 1 && t[0].values.length === 1).tickFormat(n.bind(function(e) {
                    return this.format_y_axis(e)
                }, this)).axisLabel(o).rotateYLabel(!1),
                r.select(s).datum(t).transition().duration(500).call(u),
                this.fix_line_chart_x_axis(u, t);
                var a = this;
                return i.utils.windowResize(n.bind(a.fix_line_chart_x_axis, a, u, t)),
                this.saved_chart_legend_state(u),
                window.navigator.userAgent.toLowerCase().indexOf("opera") !== -1 && e.delay(function() {
                    a.fix_line_chart_x_axis(u, t),
                    e.delay(function() {
                        a.fix_line_chart_x_axis(u, t)
                    }, 500)
                }, 500),
                u
            }, this, t))
        },
        get_vertical_bar_chart_data: function() {
            return this.get_vertical_stacked_bar_chart_data()
        },
        draw_vertical_bar_chart: function() {
            var t = this.get_vertical_bar_chart_data();
            if (!t || t && e.isEmpty(t))
                return this.show_no_available_label(),
                this;
            this.reject_disable_items(t);
            var s = "#" + this.model.cid + " svg";
            r.select(s).remove(),
            $(s, this.$el).empty(),
            $("#" + this.model.cid, this.$el).html('<div><svg class="svg-class"></svg></div>');
            var o = null;
            this.model.get("data").metainfo.yaxis && (o = this.model.get("data").metainfo.yaxis.label),
            i.addGraph(n.bind(function() {
                var e = i.models.overlapBarChart().options({
                    margin: {
                        top: 10,
                        right: 15,
                        bottom: 35,
                        left: 65
                    },
                    showLegend: !0,
                    reduceXTicks: !0,
                    tooltipContent: n.bind(function(e, t, n, r) {
                        var i = this.model.get("data").metainfo.yaxis
                          , s = r.point.ay
                          , o = r.point.key
                          , u = this.model.get("data").metainfo.tooltip.format;
                        return i !== null && i.format !== null && (i.type === "DURATION" ? s = this.format_y_axis(s) : i.type === "UNIX_TIME" ? s = wialon.util.DateTime.formatTime(s, !0, i.format) : s = wialon.util.String.sprintf(i.format, s)),
                        u && (s = wialon.util.String.sprintf(u, s, t)),
                        o === null ? "<p>" + s + "</p>" : "<h3>" + o + "</h3>" + "<p>" + s + "</p>"
                    }, this),
                    noData: n.tr("No Data Available.")
                }).x(function(e) {
                    return e.x
                }).y(function(e) {
                    return e.y
                });
                return e.xAxis.showMaxMin(!1).tickFormat(n.bind(function(e) {
                    return this.format_x_axis(e)
                }, this)),
                e.yAxis.showMaxMin(!1).tickFormat(n.bind(function(e) {
                    return this.format_y_axis(e)
                }, this)).axisLabel(o).rotateYLabel(!1),
                r.select(s).datum(t).transition().duration(200).call(e),
                i.utils.windowResize(e.update),
                this.saved_chart_legend_state(e),
                e
            }, this))
        },
        get_vertical_stacked_bar_chart_data: function() {
            var t = this.model.get("data"), n;
            if (!t || t.status !== "OK")
                return [];
            var r = []
              , i = {}
              , s = {};
            for (var o in t.data) {
                if (!e.has(t.data, o))
                    continue;
                var u = t.data[o].data;
                if (!u || u.length < 1)
                    continue;
                n = {
                    key: t.data[o].nm,
                    values: []
                };
                var a = null;
                i[n.key] = {};
                for (var f = 0, l = u.length; f < l; f++) {
                    a = u[f];
                    if (a.data.rawValue === null || a.data.rawValue === undefined)
                        continue;
                    var c = wialon.util.DateTime.userTime(a.time.rawValue)
                      , h = wialon.util.DateTime.getTimezoneOffset()
                      , p = c - c % 86400 - (h < 0 ? h : 0)
                      , d = a.data.rawValue / this.get_divisor_by_data_type(a.data.dataType);
                    n.values.push({
                        x: p,
                        y: d,
                        ay: d,
                        key: t.data[o].nm
                    }),
                    e.has(i[n.key], p) || (i[n.key][p] = null),
                    e.has(s, p) || (s[p] = null)
                }
                r.push(n)
            }
            n = null;
            for (var v in s) {
                if (!e.has(s, v))
                    continue;
                for (var m = 0, g = r.length; m < g; m++) {
                    n = r[m];
                    if (!n)
                        continue;
                    var y = i[n.key];
                    e.has(y, v) || n.values.push({
                        x: parseInt(v, 10),
                        y: 0,
                        ay: 0,
                        nm: n.key,
                        is_null: !0
                    })
                }
            }
            for (var b = 0, w = r.length; b < w; b++) {
                n = r[b];
                if (!n)
                    continue;
                n.values = e.sortBy(n.values, function(e) {
                    return e.x
                })
            }
            return r
        },
        draw_vertical_stacked_bar_chart_data: function(t) {
            t || (t = !1);
            var s = this.get_vertical_stacked_bar_chart_data();
            if (!s || s && e.isEmpty(s))
                return this.show_no_available_label(),
                this;
            this.reject_disable_items(s);
            var o = "#" + this.model.cid + " svg";
            r.select(o).remove(),
            $(o, this.$el).empty(),
            $("#" + this.model.cid, this.$el).html('<div><svg class="svg-class"></svg></div>');
            var u = null;
            this.model.get("data").metainfo.yaxis && (u = this.model.get("data").metainfo.yaxis.label),
            i.addGraph(n.bind(function() {
                var e = i.models.multiBarChart().options({
                    margin: {
                        top: 0,
                        right: 15,
                        bottom: 35,
                        left: 65
                    },
                    showControls: !1,
                    showLegend: !0,
                    reduceXTicks: !0,
                    tooltipContent: n.bind(function(e, t, n, r) {
                        var i = this.model.get("data").metainfo.yaxis
                          , s = r.value
                          , o = e
                          , u = this.model.get("data").metainfo.tooltip.format;
                        return i !== null && i.format !== null && (i.type === "DURATION" ? s = this.format_y_axis(s) : i.type === "UNIX_TIME" ? s = wialon.util.DateTime.formatTime(s, !0, i.format) : s = wialon.util.String.sprintf(i.format, s)),
                        u && (s = wialon.util.String.sprintf(u, s, t)),
                        o === null ? "<p>" + s + "</p>" : "<h3>" + o + "</h3>" + "<p>" + s + "</p>"
                    }, this),
                    noData: n.tr("No Data Available.")
                }).stacked(!t);
                return e.xAxis.showMaxMin(!1).tickFormat(n.bind(function(e) {
                    return this.format_x_axis(e)
                }, this)),
                e.yAxis.showMaxMin(!1).tickFormat(n.bind(function(e) {
                    return this.format_y_axis(e)
                }, this)).axisLabel(u).rotateYLabel(!1),
                r.select(o).datum(s).transition().duration(200).call(e),
                i.utils.windowResize(e.update),
                this.saved_chart_legend_state(e),
                e
            }, this))
        },
        get_horizontal_bar_chart_data: function() {
            var t = this.model.get("data");
            if (!t || t.status !== "OK")
                return [];
            var n = [{
                key: null,
                values: []
            }];
            for (var r in t.data) {
                if (!e.has(t.data, r))
                    continue;
                if (t.data[r].disabled)
                    continue;
                var i = t.data[r].nm;
                i.length > 18 && (i = i.slice(0, 19) + "...");
                var s = t.data[r].data;
                if (s.length < 1)
                    continue;
                var o = {
                    label: i,
                    value: t.data[r].total.rawValue / this.get_divisor_by_data_type(t.data[r].total.dataType)
                };
                n[0].values.push(o)
            }
            n[0].values = e.sortBy(n[0].values, function(e) {
                return e.value
            });
            var u = this.model.get("filters");
            if (u && e.has(u, "max_min")) {
                var a = u.max_min;
                a.is_max && (n[0].values = n[0].values.reverse())
            }
            return n
        },
        draw_horizontal_bar_chart: function() {
            var t = this.get_horizontal_bar_chart_data();
            if (!t || t && e.isEmpty(t))
                return this.show_no_available_label(),
                this;
            if (!t[0].values || e.isEmpty(t[0].values))
                return this.show_no_available_label(),
                this;
            var s = "#" + this.model.cid + " svg";
            r.select(s).remove(),
            $(s, this.$el).empty(),
            $("#" + this.model.cid, this.$el).html('<div><svg class="svg-class"></svg></div>');
            var o = null;
            return this.model.get("data").metainfo.yaxis && (o = this.model.get("data").metainfo.yaxis.label),
            i.addGraph(n.bind(function(e) {
                var t = i.models.multiBarHorizontalChart().options({
                    margin: {
                        top: 10,
                        right: 30,
                        bottom: 30,
                        left: 140
                    },
                    barColor: i.utils.defaultColor(),
                    tooltipContent: n.bind(function(e, t, n, r, i) {
                        var s = this.model.get("data").metainfo.yaxis
                          , o = r.value;
                        return s !== null && s.format !== null && (s.type === "DURATION" ? o = this.format_y_axis(o) : s.type === "UNIX_TIME" ? o = wialon.util.DateTime.formatTime(o, !0, s.format) : o = wialon.util.String.sprintf(s.format, o)),
                        "<p>" + o + "</p>"
                    }, this),
                    noData: n.tr("No Data Available.")
                }).x(function(e) {
                    return e.label
                }).y(function(e) {
                    return e.value
                }).showValues(!1).tooltips(!0).showControls(!1).showLegend(!1);
                return t.yAxis.tickFormat(n.bind(function(e) {
                    return this.format_y_axis(e)
                }, this)).axisLabel(o),
                r.select(s).datum(e).transition().duration(500).call(t),
                i.utils.windowResize(t.update),
                this.saved_chart_legend_state(t),
                t
            }, this, t)),
            this
        },
        render: function() {
            l.prototype.render.apply(this, arguments),
            $(".panel-icon-wrapper", this.$el).append(this.headingAddonTemplate),
            $(".panel-title", this.$el).html(e.unescape(this.model.get("title"))),
            $(".icon-chart", this.$el).addClass("disable-chart");
            var t = $.cookie("dashboard_charts_type")
              , n = "pie-chart";
            return t && e.has(t, this.model.id) && (n = t[this.model.id]),
            $('div[data-chart-type="' + n + '"]', this.$el).removeClass("disable-chart"),
            this
        },
        refresh: function(t, n) {
            if (!n)
                this.show_no_available_label();
            else {
                $(".panel-title", this.$el).html(e.unescape(n.title)),
                $(".icon-chart", this.$el).addClass("disable-chart");
                var r = $.cookie("dashboard_charts_type")
                  , i = "pie-chart";
                r && e.has(r, this.model.id) && (i = r[this.model.id]),
                $('div[data-chart-type="' + i + '"]', this.$el).removeClass("disable-chart"),
                i = $(".icon-chart", this.$el).not(".disable-chart").data("chart-type"),
                i === "horizontal-bar-char" ? this.draw_horizontal_bar_chart() : i === "vertical-bar-chart" ? this.draw_vertical_bar_chart() : i === "vertical-stacked-bar-chart" ? this.draw_vertical_stacked_bar_chart_data() : i === "line-chart" ? this.draw_line_chart() : i === "pie-chart" && this.draw_pie_chart()
            }
            return this
        }
    })
      , h = l.extend({
        headingAddonTemplate: $("#table-heading-template-add-on").html(),
        events: function() {
            return e.extend({}, l.prototype.events, {
                "click .icon.refresh": "want_refresh",
                "click .table-row": "show_map_behavior"
            })
        }(),
        initialize: function(e) {
            l.prototype.initialize.apply(this, [e]),
            $("body").on("click.TableWidgetView", this.hide_map_behavior)
        },
        refresh: function(t, r) {
            if (!r)
                this.show_no_available_label();
            else {
                $(".panel-title", this.$el).html(e.unescape(r.title)),
                r.metainfo.refreshable && $(".icon.refresh", this.$el).show(),
                r.metainfo.hideable && $(".icon.chevron", this.$el).show();
                var i = []
                  , s = {};
                for (var o = 0, a = r.data.columns.length; o < a; o++)
                    i.push(r.data.columns[o].text),
                    s[o] = {},
                    s[o].sorter = r.data.columns[o].sortable,
                    r.data.columns[o].sortable && (s[o].sorter = "cnumeric");
                var f = r.data.rows
                  , l = null
                  , c = null
                  , h = null
                  , p = [];
                r.metainfo.sorted_index > 0 && (f = wialon.util.Helper.sortItems(f, function(e) {
                    return e.rowValue[r.metainfo.sorted_index - 1].dataValue
                }));
                for (var d = 0, v = f.length; d < v; d++) {
                    l = f[d];
                    if (l === null)
                        p.push(e.template(u.tableRowTemplate, {
                            tds: []
                        }));
                    else {
                        c = [],
                        r.metainfo.row_numbering && c.push(e.template(u.numberTdTemplate, {
                            value: d + 1,
                            rawvalue: d + 1
                        }));
                        for (var m = 0, g = l.rowValue.length; m < g; m++) {
                            h = l.rowValue[m];
                            if (h.dataValue === null)
                                h.dataType === "NAME" || h === "ADDRESS" || h === "TEXT" ? c.push(e.template(u.textTdTemplate, {
                                    value: n.tr("N/A"),
                                    rawvalue: ""
                                })) : c.push(e.template(u.textTdTemplate, {
                                    value: n.tr("N/A"),
                                    rawvalue: -1 * Number.MAX_VALUE
                                }));
                            else if (h.dataType === "TEXT" || h.dataType === "SPEED" || h.dataType === "UNIX_TIME" || h.dataType === "NUMERIC" || h.dataType === "ADDRESS" || h.dataType === "NAME")
                                c.push(e.template(u.textTdTemplate, {
                                    value: h.dataValue,
                                    rawvalue: h.rawValue !== undefined ? h.rawValue : h.dataValue
                                }));
                            else if (h.dataType === "IMAGE")
                                c.push(e.template(u.imageTdTemplate, {
                                    value: h.dataValue,
                                    rawvalue: 0,
                                    height: "32px",
                                    css_class: "unit-image-td"
                                }));
                            else if (h.dataType === "IS_ONLINE") {
                                var y = "./img/unconnection.png";
                                h.dataValue && (y = "./img/connection.png"),
                                c.push(e.template(u.imageTdTemplate, {
                                    value: y,
                                    rawvalue: h.dataValue ? 1 : 0,
                                    height: "16px",
                                    css_class: "online-td"
                                }))
                            }
                        }
                        var b = e.extend({
                            lat: null,
                            lon: null,
                            iconSrc: null
                        }, l.rowMeta)
                          , w = {
                            tds: c,
                            rowMeta: b
                        };
                        p.push(e.template(u.tableRowTemplate, w))
                    }
                }
                if (p.length > 0) {
                    var E = e.template(u.tableHeadTemplate, {
                        columns: i
                    })
                      , S = e.template(u.tableBodyTemplate, {
                        rows: p.join("")
                    })
                      , x = e.template(u.tableTemplate, {
                        thead: E,
                        tbody: S,
                        id: "table-" + this.model.cid
                    })
                      , T = "#" + this.model.cid + " svg";
                    $(T).empty(),
                    $("#" + this.model.cid).html(x);
                    var N = [];
                    r.metainfo.sorted_index !== -1 && N.push([r.metainfo.sorted_index, 0]),
                    $("#" + this.model.cid + " table", this.$el).tablesorter({
                        sortList: N,
                        headers: s,
                        sortStable: !0,
                        textSorter: function(e, t, r, i, s) {
                            return e === n.tr("N/A").toLowerCase() && (e = ""),
                            t === n.tr("N/A").toLowerCase() && (t = ""),
                            n.compareText(e, t)
                        }
                    }).on("sortEnd", n.bind(function(e, t) {
                        if (!e)
                            return;
                        $("td:first-child", this.$el).each(function(e, t) {
                            $(t).text(e + 1).data("raw", e + 1)
                        })
                    }, this, r.metainfo.row_numbering))
                } else
                    this.show_no_available_label()
            }
        },
        want_refresh: function() {
            this.trigger("want_refresh", this)
        },
        tableRowTarget: undefined,
        show_map_behavior: function(t) {
            t.stopPropagation();
            var n = t.currentTarget ? t.currentTarget : t.srcElement
              , r = {};
            if (this.tableRowTarget !== undefined && this.tableRowTarget === n && s.isOpened())
                return s.close(),
                this.tableRowTarget = undefined,
                !1;
            this.tableRowTarget = n,
            r.pos = {
                lat: $(n).attr(o.rowMeta.lat),
                lon: $(n).attr(o.rowMeta.lon)
            },
            r.iconSrc = $(n).attr(o.rowMeta.iconSrc);
            if (e.isEmpty(r.pos.lon) || e.isEmpty(r.pos.lat) || e.isEmpty(r.iconSrc))
                return s.close(),
                !1;
            s.open(r.pos).addIcon(r.iconSrc, r.pos)
        },
        hide_map_behavior: function(e) {
            s.close()
        },
        render: function() {
            return l.prototype.render.apply(this, arguments),
            $(".panel-body", this.$el).addClass("scroll"),
            $(".panel-icon-wrapper", this.$el).append(this.headingAddonTemplate),
            $(".panel-title", this.$el).html(e.unescape(this.model.get("title"))),
            $(".panel-body.scroll", this.$el).on("scroll.TableWidgetView", this.hide_map_behavior),
            this
        }
    })
      , p = l.extend({
        headingAddonTemplate: $("#double-chart-heading-template-add-on").html(),
        events: function() {
            return e.extend({}, l.prototype.events, {
                "click .icon.line-chart": "click_line_chart",
                "click .icon.vertical-bar-chart": "click_vertical_bar_chart"
            })
        }(),
        initialize: function(e) {
            l.prototype.initialize.apply(this, [e])
        },
        click_line_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target)
        },
        click_vertical_bar_chart: function(e) {
            if ($(e.target, this.$el).hasClass("disable") || !$(e.target, this.$el).hasClass("disable-chart"))
                return;
            this.click_icon_chart(e.target)
        },
        click_icon_chart: function(e) {
            $(e, this.$el).siblings(".icon-chart").addClass("disable-chart"),
            $(e, this.$el).removeClass("disable-chart");
            var t = $(".icon-chart-left", this.$el).not(".disable-chart").data("chart-type")
              , n = $(".icon-chart-right", this.$el).not(".disable-chart").data("chart-type")
              , r = $.cookie("dashboard_charts_type");
            r ? r[this.model.id] = t + "|" + n : (r = {},
            r[this.model.id] = t + "|" + n),
            $.cookie("dashboard_charts_type", r, {
                expires: 300
            }),
            this.draw_double_charts()
        },
        refresh_chart_icon_state: function() {
            $(".icon-chart", this.$el).addClass("disable-chart");
            var t = $.cookie("dashboard_charts_type")
              , n = "left-line-chart|right-vertical-bar-chart";
            t && e.has(t, this.model.id) && (n = t[this.model.id]);
            var r = n.split("|"), i, s;
            for (i = 0,
            s = r.length; i < s; i++)
                $('div[data-chart-type="' + r[i] + '"]', this.$el).removeClass("disable-chart")
        },
        get_double_charts_data: function() {
            var t = this.model.get("data");
            if (!t || t.status !== "OK")
                return [];
            var n = t.first_chart.data, r = t.second_chart.data, i, s, o = null, u = {
                key: e.unescape(t.first_chart.legendTitle),
                bar: !1,
                values: null,
                left: !0,
                color: "#ff7f0e",
                disabled: t.first_chart.disabled
            }, a = {
                key: e.unescape(t.second_chart.legendTitle),
                bar: !1,
                left: !1,
                values: null,
                color: "#1f77b4",
                disabled: t.second_chart.disabled
            }, f, l = wialon.util.DateTime.getTimezoneOffset(), c, h, p = [], d = [], v = [], m = [];
            for (i = 0,
            s = n.length; i < s; i++)
                f = wialon.util.DateTime.userTime(n[i].time.rawValue),
                c = f - (l < 0 ? l : 0) - f % 86400,
                p.push(c),
                h = n[i].data.rawValue / this.get_divisor_by_data_type(n[i].data.dataType),
                v.push([c, h]);
            for (i = 0,
            s = r.length; i < s; i++)
                f = wialon.util.DateTime.userTime(r[i].time.rawValue),
                c = f - (l < 0 ? l : 0) - f % 86400,
                d.push(c),
                h = r[i].data.rawValue / this.get_divisor_by_data_type(r[i].data.dataType),
                m.push([c, h]);
            var g = e.union(p, d);
            for (i = 0,
            s = g.length; i < s; i++)
                e.contains(p, g[i]) ? e.contains(d, g[i]) || m.push([g[i], 0]) : v.push([g[i], 0]);
            u.values = e.sortBy(v, function(e) {
                return e[0]
            }),
            a.values = e.sortBy(m, function(e) {
                return e[0]
            });
            var y = $.cookie("dashboard_charts_type")
              , b = ["left-line-chart", "right-vertical-bar-chart"];
            return y && e.has(y, this.model.id) && (b = y[this.model.id].split("|")),
            o = [u, a],
            b[0] === "left-vertical-bar-chart" ? (u.bar = !0,
            u.color = "#1f77b4") : (u.bar = !1,
            u.color = "#ff7f0e"),
            b[1] === "right-vertical-bar-chart" ? (a.bar = !0,
            a.color = "#1f77b4") : (a.bar = !1,
            a.color = "#ff7f0e"),
            !a.bar && !u.bar ? u.color = "#1f77b4" : a.bar && u.bar && (u.color = "#ff7f0e"),
            o
        },
        draw_double_charts: function() {
            var t = this.get_double_charts_data();
            if (!t)
                this.show_no_available_label();
            else {
                var s = "#" + this.model.cid + " svg";
                r.select(s).remove(),
                $(s, this.$el).empty(),
                $("#" + this.model.cid, this.$el).html('<div><svg class="svg-class"></svg></div>');
                var o = $.cookie("dashboard_charts_type")
                  , u = ["left-line-chart", "right-vertical-bar-chart"];
                o && e.has(o, this.model.id) && (u = o[this.model.id].split("|"));
                var a = null;
                u[0] === "left-line-chart" && u[1] === "right-line-chart" ? a = i.models.linePlusLineChart : u[0] === "left-vertical-bar-chart" && u[1] === "right-line-chart" ? a = i.models.linePlusBarChart : u[0] === "left-line-chart" && u[1] === "right-vertical-bar-chart" ? a = i.models.barPlusLineChart : a = i.models.barPlusBarChart;
                var f = this.model.get("data");
                i.addGraph(n.bind(function(e, o) {
                    var u = a().options({
                        margin: {
                            top: 0,
                            right: 65,
                            bottom: 35,
                            left: 65
                        },
                        tooltipContent: n.bind(function(t, n, r, i, s) {
                            var u = i.series.left ? e.metainfo : o.metainfo, a, f, l = i.point[1];
                            a = u.yaxis,
                            f = u.tooltip.format,
                            a !== null && a.format !== null && (a.type === "DURATION" ? l = this.format_y_axis(l, a) : a.type === "UNIX_TIME" ? l = wialon.util.DateTime.formatTime(l, !0, a.format) : l = wialon.util.String.sprintf(a.format, l));
                            var c = f === null ? l + " at " + n : wialon.util.String.sprintf(f, l, n);
                            return "<h3>" + t + "</h3>" + "<p>" + c + "</p>"
                        }, this),
                        noData: n.tr("No Data Available.")
                    }).x(function(e, t) {
                        return t
                    }).y(function(e) {
                        return e[1]
                    })
                      , f = e.metainfo.xaxis.format
                      , l = e.metainfo.yaxis
                      , c = o.metainfo.yaxis
                      , h = e.metainfo.yaxis.label || ""
                      , p = o.metainfo.yaxis.label || "";
                    return u.xAxis.showMaxMin(!1).tickFormat(n.bind(function(e) {
                        var n = t[0].values[e] && t[0].values[e][0] || 0;
                        return this.format_x_axis(n, f)
                    }, this)),
                    u.y1Axis.tickFormat(n.bind(function(e) {
                        return this.format_y_axis(e, l)
                    }, this)).showMaxMin(!1).axisLabel(h).rotateYLabel(!1),
                    u.y2Axis.tickFormat(n.bind(function(e) {
                        return this.format_y_axis(e, c)
                    }, this)).showMaxMin(!1).axisLabel(p).rotateYLabel(!1),
                    u.bars ? u.bars.forceY([0]) : u.bars1 && u.bars2 && (u.bars1.forceY([0]),
                    u.bars2.forceY([0])),
                    r.select(s).datum(t).transition().duration(500).call(u),
                    i.utils.windowResize(u.update),
                    this.saved_chart_legend_state(u),
                    u
                }, this, f.first_chart, f.second_chart))
            }
        },
        refresh: function(t, n) {
            n && n.first_chart && n.first_chart.title && $(".left-title", this.$el).text(e.unescape(n.first_chart.title)),
            n && n.second_chart && n.second_chart.title && $(".right-title", this.$el).text(e.unescape(n.second_chart.title)),
            !n || n.status !== "OK" ? this.show_no_available_label() : (this.refresh_chart_icon_state(),
            this.draw_double_charts())
        },
        render: function() {
            l.prototype.render.apply(this, arguments),
            $(".panel-icon-wrapper", this.$el).html(this.headingAddonTemplate);
            var t = this.model.get("title").split("|");
            return t.length === 2 && ($(".left-title", this.$el).text(e.unescape(t[0])),
            $(".right-title", this.$el).text(e.unescape(t[1]))),
            this.refresh_chart_icon_state(),
            this
        }
    });
    return {
        BaseWidget: a,
        ModelWidgets: f,
        BaseWidgetView: l,
        PlotWidgetView: c,
        TableWidgetView: h,
        DoubleChartWidgetView: p
    }
});
