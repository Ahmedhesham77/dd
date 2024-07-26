requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
        backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.2/js/bootstrap.min",
        leaflet: "//apps.wialon.com/plugins/leaflet/leaflet/leaflet",
        webgis: "//apps.wialon.com/plugins/leaflet/webgis/webgis.leaflet.min",
        "wialon.interval": "//apps.wialon.com/plugins/wialon/interval/interval.wialon.min"
    },
    shim: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        },
        "d3.v3.3.5.4": {
            exports: "d3"
        },
        "nv.d3.ext": {
            deps: ["nv.d3.1.7.1"]
        },
        "nv.d3.1.7.1": {
            deps: ["d3.v3.3.5.4"],
            exports: "nv"
        },
        jquery: {
            exports: "$"
        },
        "backbone.bootstrap-modal": ["bootstrap"],
        "jquery.tablesorter": ["jquery"],
        "jquery-ui-1.10.4.custom": ["jquery"],
        "jquery.cookie": ["jquery"],
        "jquery.ui.touch-punch.min": ["jquery", "jquery-ui-1.10.4.custom"],
        bootstrap: ["jquery"],
        dashboardUtil: ["jquery"],
        dashboardWidgets: ["backbone"],
        selectTime: ["backbone"],
        leaflet: {
            exports: "L"
        },
        map: {
            deps: ["jquery", "leaflet"],
            exports: "map"
        },
        webgis: {
            deps: ["leaflet"]
        },
        "wialon.interval": {
            deps: ["jquery", "jquery-ui-1.10.4.custom"],
            exports: "$.fn.intervalWialon"
        }
    }
});
var APP = APP || {};
APP.globals = APP.globals || {},
    require(["jquery", "underscore", "backbone", "dashboardUtil", "dashboardWidgets", "selectTime", "map"], function (e, t, n, r, i, s, o) {
        "use strict";
        var u = decodeURIComponent(APP_CONFIG.alias || "Dashboard");
        e("#header .app-name").html(u),
            r.isTouch() ? e("body").addClass("touch") : e("body").addClass("no-touch");
        var a = n.View.extend({
            el: window,
            initialize: function () {
                var t = r.getLang()
                    , n = this
                    , i = r.getParameterByName("debug");
                i && console.log("DEBUG MODE!"),
                    this.createTableSorterPlugins(),
                    this.loadModule({
                        url: "./lang/" + t + ".js",
                        success: r.bind(function () {
                            this.auth(r.bind(function (n) {
                                if (n === 0) {
                                    t !== "en" && (e.datepicker.regional[t] = {
                                        closeText: r.tr("Close"),
                                        prevText: r.tr("Prev"),
                                        nextText: r.tr("Next"),
                                        currentText: r.tr("Today"),
                                        monthNames: [r.tr("January"), r.tr("February"), r.tr("March"), r.tr("April"), r.tr("May"), r.tr("June"), r.tr("July"), r.tr("August"), r.tr("September"), r.tr("October"), r.tr("November"), r.tr("December")],
                                        monthNamesShort: [r.tr("Jan"), r.tr("Feb"), r.tr("Mar"), r.tr("Apr"), r.tr("May"), r.tr("Jun"), r.tr("Jul"), r.tr("Aug"), r.tr("Sep"), r.tr("Oct"), r.tr("Nov"), r.tr("Dec")],
                                        dayNames: [r.tr("Sunday"), r.tr("Monday"), r.tr("Tuesday"), r.tr("Wednesday"), r.tr("Thursday"), r.tr("Friday"), r.tr("Saturday")],
                                        dayNamesShort: [r.tr("Sun"), r.tr("Mon"), r.tr("Tue"), r.tr("Wed"), r.tr("Thu"), r.tr("Fri"), r.tr("Sat")],
                                        dayNamesMin: [r.tr("Su"), r.tr("Mo"), r.tr("Tu"), r.tr("We"), r.tr("Th"), r.tr("Fr"), r.tr("Sa")],
                                        weekHeader: "Не",
                                        dateFormat: "dd.mm.yy",
                                        firstDay: 1,
                                        isRTL: !1,
                                        showMonthAfterYear: !1,
                                        yearSuffix: ""
                                    }),
                                        e.datepicker.setDefaults(e.datepicker.regional[t]);
                                    var i = wialon.core.Session.getInstance().getCurrUser();
                                    i.getLocale(r.bind(function (e, t) {
                                        APP.globals.userLocale = t,
                                            e === 0 ? this.trigger("auth-success", this) : this.trigger("auth-fail", this)
                                    }, this))
                                }
                            }, this))
                        }, this),
                        error: e.proxy(n.message, n, {
                            message: r.tr("Oh! %%module%% didn't load!", {
                                module: "LANG"
                            })
                        })
                    })
            },
            createTableSorterPlugins: function () {
                e.tablesorter.addParser({
                    id: "cnumeric",
                    format: function (t, n, r) {
                        return e(r).data("raw")
                    },
                    type: "cnumeric"
                })
            },
            loadModule: function (t) {
                var n = {
                    condition: !0,
                    url: null,
                    type: "script",
                    success: e.noop,
                    error: e.noop
                };
                t = e.extend(!0, n, t);
                if (t.condition) {
                    var i = e.ajax({
                        url: t.url,
                        type: "GET",
                        dataType: t.type === "style" ? "text" : t.type,
                        crossDomain: !0,
                        cache: !0
                    });
                    i.then(function (e, n, r) {
                        t.success(e, n, r)
                    }, function (e, n) {
                        t.error(e, n)
                    })
                } else
                    console.log(r.tr("Not necessary to load module"))
            },
            log: {
                start: function (e) {
                    if (!e)
                        return !1;
                    var t = new Date;
                    console.time(r.tr("Execution time: %%title%%", {
                        title: e
                    })),
                        console.log(r.tr("[%%time%%] %%title%% started", {
                            time: t.toLocaleTimeString(),
                            title: e
                        }))
                },
                end: function (e) {
                    if (!e)
                        return !1;
                    console.timeEnd(r.tr("Execution time: %%title%%", {
                        title: e
                    }))
                }
            },
            message: function (t) {
                var n = this
                    , i = {
                        type: "log",
                        message: r.tr("Something wrong"),
                        obj: null
                    };
                return t = e.extend(!0, i, t),
                    t.obj && (console.groupCollapsed(wialon.util.String.sprintf("%s: %s", r.tr("Message log"), t.message)),
                        console[t.type](t.obj),
                        console.groupEnd()),
                    alert(t.message),
                    n
            },
            auth: function (t) {
                var n = r.getParameterByName("b", "master")
                    , i = this
                    , s = r.getParameterByName("baseUrl", n == "develop" ? "https://dev-api.wialon.com" : "https://hst-api.wialon.com") || r.getParameterByName("hostUrl", "https://hosting.wialon.com");
                s || (s = "https://hst-api.wialon.com");
                if (!s)
                    return i.message({
                        message: r.tr("Please, fill the correct data in configuration")
                    }),
                        i;
                i.loadModule({
                    url: s + "/wsdk/script/wialon.js",
                    success: r.bind(function () {
                        var n = wialon.core.Session.getInstance();
                        n.initSession(s, "gapp_dashboard_app");
                        var o = function (s) {
                            t && t(s);
                            if (s)
                                return e("#header-gug").removeClass("gug-progress"),
                                    this.message({
                                        message: r.tr("Oh! Unfortunately, you can't login"),
                                        obj: wialon.core.Errors.getErrorText(s)
                                    }),
                                    i;
                            wialon.core.Remote.getInstance().remoteCall("core/set_session_property", {
                                prop_name: "skip_nonactive_items",
                                prop_value: 1
                            }, function () { }),
                                n.updateDataFlags([{
                                    type: "type",
                                    data: "avl_unit",
                                    flags: 1,
                                    mode: 0
                                }]),
                                n.updateDataFlags([{
                                    type: "type",
                                    data: "avl_unit_group",
                                    flags: 1,
                                    mode: 0
                                }]),
                                n.addListener("invalidSession", function () {
                                    i.trigger("invalid-session", i),
                                        e.proxy(i.message, i, {
                                            message: r.tr("Session has been lost")
                                        })()
                                })
                        }
                            , u = "51bcdac3c835018c1982aec5a5314126"
                            , a = "zanzoraab"
                            , f = r.getParameterByName("authHash");
                        f ? n.loginAuthHash(f, r.bind(o, this)) : u && n.duplicate(u, a, !0, r.bind(o, this))
                    }, this),
                    error: function () {
                        e("#header-gug").removeClass("gug-progress"),
                            e.proxy(i.message, i, {
                                message: r.tr("Oh! Unfortunately, we can't load SDK")
                            })
                    }
                })
            }
        })
            , f = n.View.extend({
                template: e("#add-widget-template").html(),
                optionsTemplate: e("#options-template").html(),
                widgetsTemplate: e("#widgets-template").html(),
                events: {
                    "click .dashboard-nav-tabs": "click_dashboard_nav_tabs",
                    "click .multi-type-tabs": "click_multi_type_tabs",
                    "click .select-server-type": "click_select_server_type",
                    "click .select-sub-widget": "click_select_sub_widget",
                    "click .max-min-filter-sort-order": "click_max_min_filter_sort_order",
                    "click .av-is-total": "click_av_is_total",
                    "click .circle": "click_av_is_total_circle",
                    "change select.select-avl-object": "change_select_avl_object"
                },
                initialize: function (t, i, s) {
                    n.View.prototype.initialize.apply(this, [s]),
                        this.widget = i || null,
                        this.widgets_data = t,
                        e("body").bind("click", r.bind(function (t) {
                            e(".sub-widgets-popup", this.$el).hide()
                        }, this))
                },
                click_dashboard_nav_tabs: function (t) {
                    t.stopPropagation();
                    var n = t.currentTarget;
                    e(n, this.$el).hasClass("active") || (e(".dashboard-nav-tabs.active", this.$el).removeClass("active"),
                        e(n, this.$el).addClass("active"),
                        e(".ul-tab").hide(),
                        e("#" + e(n, this.$el).data("graph-type") + "-tabs", this.$el).show())
                },
                click_multi_type_tabs: function (t) {
                    t.stopPropagation();
                    var n = t.currentTarget;
                    e(n, this.$el).hasClass("active") || (e(".multi-type-tabs.active", this.$el).removeClass("active"),
                        e(n, this.$el).addClass("active"),
                        e(".multi-graph-layout", this.$el).hide(),
                        e("#" + e(n, this.$el).data("layout"), this.$el).show())
                },
                click_select_server_type: function (e) {
                    e.stopPropagation(),
                        this._click_select_server_type(e.currentTarget)
                },
                _click_select_server_type: function (t, n, r, i) {
                    e(t, this.$el).hasClass("select-sub-widgets") ? this.show_sub_widgets(t) : this.server_type_click(t, n, r, i)
                },
                show_sub_widgets: function (t, n, r, i) {
                    e(".sub-widgets-popup", this.$el).hide();
                    var s = e(".sub-widgets-popup", e(t).parent());
                    s.show()
                },
                server_type_click: function (t, n, r, i) {
                    if (t.length === 0)
                        return;
                    e(".sub-widgets-popup", this.$el).hide(),
                        n = n || this.get_server_type_context(),
                        e(".select-server-type.active", n).removeClass("active"),
                        e(t).addClass("active"),
                        r = r || e(".dashboard-nav-tabs.active", this.$el).data("graph-type");
                    var s = this.$el;
                    if (r === "simple-graph") {
                        s = e("#simple-graph-tabs", this.$el);
                        var o = e(".select-server-type.active", s).data("server-type"), u = e(".select-avl-object :selected", s).parent().data("avl-type") || "avl_unit", a = APP.globals.widget_data.widgets, f = a.avl_object.templates, l, c;
                        for (l = 0,
                            c = f.length; l < c; l++) {
                            var h = f[l];
                            if (h && h.server_type === o) {
                                h.type === "table" || u === "avl_unit" && e(".select-avl-object", s).val() !== "default" ? (e(".filter-wrapper", s).addClass("disable"),
                                    e(".max-min-filter-sort-order", s).addClass("disable"),
                                    e(".max-min-filter-count", s).prop("disabled", !0),
                                    e(".max-min-checkbox-is-pass-zeroth", s).prop("disabled", !0)) : (e(".filter-wrapper", s).removeClass("disable"),
                                        e(".max-min-filter-sort-order", s).removeClass("disable"),
                                        e(".max-min-filter-count", s).prop("disabled", !1),
                                        e(".max-min-checkbox-is-pass-zeroth", s).prop("disabled", !1));
                                break
                            }
                        }
                    } else if (r === "multi-graph") {
                        var p = i ? "#" + i + " span" : ".multi-type-tabs.active span";
                        s = e("#multi-graph-tabs", this.$el),
                            e(p, s).text(e("span", t).text())
                    }
                },
                click_select_sub_widget: function (e) {
                    e.stopPropagation(),
                        this._click_select_sub_widget(e.currentTarget)
                },
                _click_select_sub_widget: function (t, n, r, i) {
                    if (t.length === 0)
                        return;
                    e(".sub-widgets-popup", this.$el).hide();
                    var s = e(t).data("parent-server-type");
                    n = n || this.get_server_type_context(),
                        r = r || e(".dashboard-nav-tabs.active", this.$el).data("graph-type"),
                        e(".select-server-type.active", n).removeClass("active"),
                        e(".select-sub-widget.active", n).removeClass("active");
                    var o = e("[data-server-type='" + s + "']", n);
                    if (o) {
                        var u = e("span", o);
                        e(u).html(e(t).data("title")),
                            e(t).addClass("active"),
                            e(o, n).data("server-type", e(t).data("server-type")),
                            e(o, n).addClass("active");
                        if (r === "multi-graph") {
                            var a = i ? "#" + i + " span" : ".multi-type-tabs.active span"
                                , f = e("#multi-graph-tabs", this.$el);
                            e(a, f).text(e(t).data("title"))
                        }
                    }
                },
                click_max_min_filter_sort_order: function (t) {
                    e(t.target).hasClass("disable") || e(t.target, this.$el).toggleClass("filter-sort-order-a-z").toggleClass("filter-sort-order-z-a")
                },
                click_av_is_total: function (t, n) {
                    n = t ? t.target : n,
                        !e(".av-total-filter", this.$el).hasClass("disable") && !e(n).hasClass("active") && (e(".av-is-total", this.$el).removeClass("active").siblings(".circle").removeClass("active"),
                            e(n, this.$el).addClass("active").siblings(".circle").addClass("active"))
                },
                click_av_is_total_circle: function (t) {
                    this.click_av_is_total(null, e(t.target, this.$el).siblings(".av-is-total"))
                },
                change_select_avl_object: function (n) {
                    var r = e(".dashboard-nav-tabs.active", this.$el).data("graph-type"), i, s, o, u;
                    if (r === "simple-graph") {
                        i = e("#simple-graph-tabs", this.$el),
                            s = e(".select-avl-object", i).val(),
                            u = e(".select-avl-object :selected", i).parent().data("avl-type") || "avl_unit";
                        var a = e(".select-server-type.active", i).data("server-type")
                            , f = APP.globals.widget_data.widgets;
                        o = s !== "default" && u === "avl_unit";
                        if (!o && t.has(f, "avl_object")) {
                            var l = f.avl_object.templates, c, h;
                            for (c = 0,
                                h = l.length; c < h; c++) {
                                var p = l[c];
                                if (p && p.server_type === a && p.type === "table") {
                                    o = !0;
                                    break
                                }
                            }
                        }
                        o ? e(".filter-wrapper", i).addClass("disable") : e(".filter-wrapper", i).removeClass("disable"),
                            o ? e(".max-min-filter-sort-order", i).addClass("disable") : e(".max-min-filter-sort-order", i).removeClass("disable"),
                            e(".max-min-filter-count", i).prop("disabled", o),
                            e(".max-min-checkbox-is-pass-zeroth", i).prop("disabled", o)
                    } else
                        r === "multi-graph" && (i = e("#multi-graph-tabs", this.$el),
                            s = e(".select-avl-object", i).val(),
                            u = e(".select-avl-object :selected", i).parent().data("avl-type") || "avl_unit",
                            o = s !== "default" && u === "avl_unit",
                            o ? e(".filter-wrapper", i).addClass("disable") : e(".filter-wrapper", i).removeClass("disable"),
                            o ? e(".av-total-filter", i).addClass("disable") : e(".av-total-filter", i).removeClass("disable"),
                            e(".av-total-checkbox-is-pass-zeroth", i).prop("disabled", o))
                },
                get_server_type_context: function () {
                    var t = e(".dashboard-nav-tabs.active", this.$el).data("graph-type")
                        , n = this.$el;
                    return t === "simple-graph" ? n = e("#simple-graph-tabs", this.$el) : t === "multi-graph" && (n = e("#" + e(".multi-type-tabs.active").data("layout"), this.$el)),
                        n
                },
                render: function () {
                    var n = wialon.core.Session.getInstance(), i, s, o = wialon.util.Helper.sortItems(n.getItems("avl_unit")), u = [], a = wialon.util.Helper.sortItems(n.getItems("avl_unit_group")), f = [], l = this.widgets_data.widgets, c, h = [], p = [];
                    for (i = 0,
                        s = o.length; i < s; i++)
                        o[i].getUserAccess() & 512 && u.push({
                            title: o[i].getName(),
                            value: o[i].getId()
                        });
                    for (i = 0,
                        s = a.length; i < s; i++)
                        f.push({
                            title: a[i].getName(),
                            value: a[i].getId()
                        });
                    var d = t.template(this.optionsTemplate, {
                        options: [{
                            title: r.tr("All units"),
                            value: "default"
                        }]
                    }) + '<optgroup data-avl-type="avl_unit" label="' + r.tr("Units") + '">' + t.template(this.optionsTemplate, {
                        options: u
                    }) + '</optgroup><optgroup data-avl-type="avl_unit_group" label="' + r.tr("Unit groups") + '">' + t.template(this.optionsTemplate, {
                        options: f
                    }) + "</optgroup>"
                        , v = [];
                    if (t.has(l, "avl_object")) {
                        var m = l.avl_object.templates
                            , g = null;
                        for (i = 0,
                            s = m.length; i < s; i++) {
                            g = m[i];
                            if (t.contains(v, g.server_type))
                                continue;
                            c = {
                                title: g.title,
                                value: g.server_type
                            },
                                g.sub_widgets && (c.sub_widgets = g.sub_widgets),
                                v.push(g.server_type),
                                h.push(c),
                                g.type !== "table" && p.push(c)
                        }
                    }
                    var y = {
                        max_min: {
                            count: 10,
                            is_max: !0,
                            is_pass_zeroth: !0
                        },
                        av_total: {
                            is_total: !1,
                            is_pass_zeroth: !0
                        },
                        select_avl_object_html: d,
                        widgets_html: t.template(this.widgetsTemplate, {
                            widgets_data: h,
                            index: 0
                        }),
                        multi_widgets_html: t.template(this.widgetsTemplate, {
                            widgets_data: p,
                            index: 0
                        }),
                        cancel_label: r.tr("Cancel"),
                        show_units_label: r.tr("Show units:"),
                        skip_zero_label: r.tr("Skip zeroth values"),
                        charts_label: r.tr("Charts"),
                        multicharts_label: r.tr("Multicharts"),
                        average_label: r.tr("Average"),
                        total_label: r.tr("Total")
                    };
                    if (this.widget !== null) {
                        var b = this.widget.get("filters");
                        b && t.has(b, "max_min") && t.extend(y.max_min, b.max_min),
                            b && t.has(b, "av_total") && t.extend(y.av_total, b.av_total)
                    }
                    this.$el.html(t.template(this.template, y));
                    var w = this.widget && this.widget.get("type") === "double_chart" ? "multi-graph" : "simple-graph";
                    e(".dashboard-nav-tabs[data-graph-type='" + w + "']", this.$el).click(),
                        e("#first-multi-graph-tab", this.$el).click();
                    if (this.widget !== null && w === "multi-graph") {
                        var E = this.widget.get("server_type").split("|");
                        this._click_select_server_type(e("#first-multi-graph-layout .select-server-type[data-server-type='" + E[0] + "']", this.$el), e("#first-multi-graph-layout", this.$el), "multi-graph", "first-multi-graph-tab"),
                            this._click_select_sub_widget(e("#first-multi-graph-layout .select-sub-widget[data-server-type='" + E[0] + "']", this.$el), e("#first-multi-graph-layout", this.$el), "multi-graph", "first-multi-graph-tab"),
                            this._click_select_server_type(e("#second-multi-graph-layout .select-server-type[data-server-type='" + E[1] + "']", this.$el), e("#second-multi-graph-layout", this.$el), "multi-graph", "second-multi-graph-tab"),
                            this._click_select_sub_widget(e("#second-multi-graph-layout .select-sub-widget[data-server-type='" + E[1] + "']", this.$el), e("#second-multi-graph-layout", this.$el), "multi-graph", "second-multi-graph-tab")
                    } else
                        this._click_select_server_type(e("#first-multi-graph-layout .select-server-type", this.$el).eq(0), e("#first-multi-graph-layout", this.$el), "multi-graph", "first-multi-graph-tab"),
                            this._click_select_server_type(e("#second-multi-graph-layout .select-server-type", this.$el).last(), e("#second-multi-graph-layout", this.$el), "multi-graph", "second-multi-graph-tab");
                    var S = this.get_server_type_context();
                    return this.widget !== null && w === "simple-graph" ? (e(".select-server-type.active", S).removeClass("active"),
                        e("[data-server-type='" + this.widget.get("server_type") + "']", S).click(),
                        e(".select-avl-object", e("#simple-graph-tabs", this.$el)).val(this.widget.get("gid") || "default")) : this.widget !== null && w === "multi-graph" && e(".select-avl-object", e("#multi-graph-tabs", this.$el)).val(this.widget.get("gid") || "default"),
                        this.change_select_avl_object(null),
                        this
                },
                get_template_by_server_type: function (e) {
                    var t = APP.globals.widget_data.widgets.avl_object.templates, n, r, i = null;
                    for (n = 0,
                        r = t.length; n < r; n++)
                        if (t[n].server_type === e)
                            i = t[n];
                        else if (t[n].sub_widgets) {
                            var s = t[n].sub_widgets.templates || [], o, u;
                            for (o = 0,
                                u = s.length; o < u; o++) {
                                var a = s[o];
                                a.server_type === e && (i = t[n])
                            }
                        }
                    return i
                },
                get_data: function () {
                    var n = e(".dashboard-nav-tabs.active", this.$el).data("graph-type")
                        , r = this.$el
                        , i = null
                        , s = null
                        , o = {};
                    if (n === "simple-graph") {
                        r = e("#simple-graph-tabs", this.$el),
                            s = e(".select-server-type.active", r).data("server-type");
                        var u = this.get_template_by_server_type(s);
                        i = {
                            server_type: s,
                            is_static: u.is_static,
                            type: u.type,
                            ct: e(".select-avl-object :selected", r).parent().data("avl-type") || "avl_unit",
                            gid: parseInt(e(".select-avl-object", r).val(), 10) || null
                        },
                            (i.ct === "avl_unit" && i.gid === null || i.ct === "avl_unit_group") && i.type !== "table" && (e(".checkbox-is-pass-zeroth", this.$el).prop("disabled") || (o.is_pass_zeroth = e(".max-min-checkbox-is-pass-zeroth", r).is(":checked"),
                                o.count = parseInt(e(".max-min-filter-count", r).val(), 10),
                                o.is_max = e(".max-min-filter-sort-order", r).hasClass("filter-sort-order-a-z")),
                                t.isEmpty(o) || t.extend(i, {
                                    filters: {
                                        max_min: o
                                    }
                                }))
                    } else if (n === "multi-graph") {
                        r = e("#multi-graph-tabs", this.$el);
                        var a = e("#first-multi-graph-layout", r)
                            , f = e("#second-multi-graph-layout", r)
                            , l = e(".select-server-type.active", a).data("server-type")
                            , c = e(".select-server-type.active", f).data("server-type")
                            , h = this.get_template_by_server_type(l)
                            , p = this.get_template_by_server_type(c);
                        i = {
                            server_type: l + "|" + c,
                            is_static: h.is_static && p.is_static,
                            type: "double_chart",
                            ct: e(".select-avl-object :selected", r).parent().data("avl-type") || "avl_unit",
                            gid: parseInt(e(".select-avl-object", r).val(), 10) || null
                        };
                        if (i.ct === "avl_unit" && i.gid === null || i.ct === "avl_unit_group")
                            e(".av-total-filter", this.$el).hasClass("disable") || (o.is_total = e(".av-is-total.active", r).hasClass("av-total-filter"),
                                o.is_pass_zeroth = e(".av-total-checkbox-is-pass-zeroth", r).is(":checked")),
                                t.isEmpty(o) || t.extend(i, {
                                    filters: {
                                        av_total: o
                                    }
                                })
                    }
                    return i
                },
                validate: function () {
                    var n = e(".dashboard-nav-tabs.active", this.$el).data("graph-type")
                        , r = !0;
                    if (n === "simple-graph") {
                        var i = e("#simple-graph-tabs", this.$el)
                            , s = e(".max-min-filter-count", i).val();
                        !t.isNaN(parseInt(s, 10)) && t.isFinite(s) && s > 0 ? e(".max-min-filter-count", i).removeClass("error") : (e(".max-min-filter-count", i).addClass("error"),
                            r = !1)
                    }
                    return r
                }
            })
            , l = n.View.extend({
                className: "right",
                template: '<div class="add-widget-btn"></div>',
                events: {
                    "click .add-widget-btn": "click"
                },
                initialize: function (e) {
                    n.View.prototype.initialize.apply(this, [e]),
                        this.modal = null
                },
                click: function (t) {
                    if (e(".add-widget-btn", this.$el).hasClass("disable"))
                        return;
                    APP.globals.addWidgetBtnView.disable(!0),
                        APP.globals.widget_data === undefined ? e.ajax({
                            url: r.getServer() + "settings?" + "lang=" + r.getLang(),
                            dataType: "json",
                            type: "POST",
                            success: r.bind(function (e, t, n, r) {
                                n === "success" ? (APP.globals.widget_data = t,
                                    this.show_modal()) : APP.globals.addWidgetBtnView.disable(!1)
                            }, this, t)
                        }) : this.show_modal()
                },
                show_modal: function () {
                    require(["backbone.bootstrap-modal"], r.bind(function () {
                        var e = new f(APP.globals.widget_data);
                        this.modal = (new n.BootstrapModal({
                            content: e,
                            animate: !0,
                            okCloses: !1
                        })).open(r.bind(function (e) {
                            if (e.validate()) {
                                var t = e.get_data();
                                this.save(t),
                                    this.modal && this.modal.close()
                            }
                        }, this, e)),
                            APP.globals.addWidgetBtnView.disable(!1)
                    }, this))
                },
                save: function (n) {
                    e("#header-gug").addClass("gug-progress");
                    var i = {
                        widget: JSON.stringify(n)
                    }
                        , s = wialon.core.Session.getInstance().getToken();
                    s && s.th ? (t.extend(i, {
                        token: s.th
                    }),
                        this.saveImpl(i)) : wialon.core.Session.getInstance().createAuthHash(r.bind(function (e, n) {
                            e === 0 && (t.extend(i, {
                                hash: n.authHash
                            }),
                                this.saveImpl(i))
                        }, this))
                },
                saveImpl: function (n) {
                    var i = r.getParameterByName("b", "master");
                    t.extend(n, {
                        url: r.getBaseUrl(),
                        lang: r.getLang()
                    }),
                        e.ajax({
                            url: r.getServer() + "widget/add",
                            type: "POST",
                            data: n,
                            dataType: "json",
                            success: r.bind(function (t, n, r) {
                                n === "success" && t.status === "OK" && this.trigger("new-widget", t.data.widget),
                                    e("#header-gug").removeClass("gug-progress")
                            }, this)
                        })
                },
                render: function () {
                    return n.View.prototype.initialize.apply(this),
                        this.$el.html(this.template),
                        this
                },
                disable: function (t) {
                    t ? e(".add-widget-btn", this.$el).addClass("disable") : e(".add-widget-btn", this.$el).removeClass("disable")
                }
            })
            , c = n.View.extend({
                className: "left",
                template: '<div class="add-units-btn"></div>',
                events: {
                    "click .add-units-btn": "add_remove_units_table"
                },
                initialize: function (e) {
                    n.View.prototype.initialize.apply(this, [e])
                },
                add_remove_units_table: function (t) {
                    if (e(".add-units-btn", this.$el).hasClass("disable"))
                        return;
                    this.disable(!0),
                        this.trigger("click-add")
                },
                render: function () {
                    return n.View.prototype.initialize.apply(this),
                        this.$el.html(this.template),
                        this
                },
                disable: function (t) {
                    t ? e(".add-units-btn", this.$el).addClass("disable") : e(".add-units-btn", this.$el).removeClass("disable")
                }
            })
            , h = null
            , p = null;
        p = new a,
            e("#header-gug").addClass("gug-progress");
        var d = r.getParameterByName("lang", "en");
        availableLanguages && !t.contains(availableLanguages, d.toLowerCase()) && (d = "en"),
            documentationLink && (e("#a-help").attr("href", documentationLink),
                e("#help-wrapper").css("display", ""));
        var v = function () {
            var n, i, s, o = "order_wid", u = {}, a = {
                right: [],
                left: []
            }, f = function () {
                return {
                    set: function (e, t, n) {
                        var r;
                        if (n) {
                            var i = new Date;
                            i.setTime(i.getTime() + n * 24 * 60 * 60 * 1e3),
                                r = "; expires=" + i.toGMTString()
                        } else
                            r = "";
                        document.cookie = e + "=" + t + r + "; path=/"
                    },
                    get: function (e) {
                        if (document.cookie.length > 0) {
                            var t = document.cookie.indexOf(e + "=");
                            if (t !== -1) {
                                t = t + e.length + 1;
                                var n = document.cookie.indexOf(";", t);
                                return n === -1 && (n = document.cookie.length),
                                    unescape(document.cookie.substring(t, n))
                            }
                        }
                        return ""
                    },
                    remove: function (e) {
                        this.set(e, "", -1)
                    }
                }
            }(), l = function (t, n, i, s) {
                var o = {
                    success: function () { },
                    error: function () { }
                };
                i = e.extend({}, o, i);
                var u = r.getParameterByName("b", "master");
                e.extend(s, {
                    url: r.getBaseUrl(),
                    lang: r.getLang()
                }),
                    e.ajax({
                        url: r.getServer() + (t || "widget") + "/" + (n || "order"),
                        type: "POST",
                        data: s,
                        dataType: "json",
                        success: i.success
                    })
            }, c = function () {
                return {
                    get: function () {
                        return u
                    },
                    set: function (e, t, n) { },
                    check: function (e, t, n) {
                        var i = f.get(e);
                        if (!i && !n)
                            return;
                        var s;
                        n ? s = n : s = JSON.parse(i);
                        var a = s.left.length
                            , c = s.right.length
                            , h = []
                            , p = [];
                        a > c ? (h = a,
                            p = c) : (h = c,
                                p = a);
                        var d = {}, v, m, g = 0;
                        for (var y = 0; y < h; y++)
                            v = s.left[y],
                                m = s.right[y],
                                v && (d[v] = g),
                                g++,
                                m && (d[m] = g),
                                g++;
                        var b = wialon.core.Session.getInstance().getToken();
                        if (b && b.th) {
                            var w = {
                                token: b.th,
                                order: JSON.stringify(d)
                            };
                            l(null, "order", {
                                success: function (e, n, r) {
                                    n === "success" && e.code === 0 && (u = e.orders),
                                        f.remove(o),
                                        t && typeof t == "function" && t()
                                }
                            }, w)
                        } else
                            wialon.core.Session.getInstance().createAuthHash(r.bind(function (e, n) {
                                if (e !== 0)
                                    return;
                                var r = {
                                    hash: n.authHash,
                                    order: JSON.stringify(d)
                                };
                                l(null, "order", {
                                    success: function (e, n, r) {
                                        n === "success" && e.code === 0 && (u = e.orders),
                                            f.remove(o),
                                            t && typeof t == "function" && t()
                                    }
                                }, r)
                            }, this))
                    },
                    remove: function (e) {
                        this.set(e, "", -1)
                    },
                    buildOrder: function () {
                        a.left = [],
                            a.right = [];
                        if (t.keys(u).length) {
                            var e = [];
                            t.forEach(u, function (t, n) {
                                e.push({
                                    id: n,
                                    order: t
                                })
                            });
                            var n = t.sortBy(e, "order");
                            t.map(n, function (e, t) {
                                !e.order || e.order % 2 === 0 ? a.left.push(e.id) : a.right.push(e.id)
                            })
                        }
                    }
                }
            }(), h = function (t, r) {
                var i = [];
                return r && a[r] && (a[r] = [],
                    t.children().each(function (t, i) {
                        var s = e(i).attr("id").split("-").pop()
                            , o = n.get(s);
                        if (o) {
                            var u = o.get("id");
                            u && a[r].push(o.get("id").toString())
                        }
                    })),
                    i
            };
            return {
                init: function (e) {
                    return i = wialon.core.Session.getInstance(),
                        s = i.getCurrUser(),
                        this
                },
                loadOrder: function (e) {
                    var t = this.cookie.get(o);
                    if (!t) {
                        e();
                        return
                    }
                    this.store.check(o, function () {
                        this.buildOrder(),
                            e()
                    })
                },
                checkPos: function (e, t) {
                    var n = a.left.length && a.left.indexOf(e.toString()) !== -1 ? !0 : !1
                        , r = a.right.length && a.right.indexOf(e.toString()) !== -1 ? !0 : !1;
                    return n || r ? !0 : !1
                },
                _render: function (e, t, n, r) {
                    for (var i = 0; i < t.length; i++)
                        r(t[i], n, {
                            pos: e
                        }),
                            delete n[t[i]]
                },
                renderByOrder: function (e, t) {
                    var n = this.getOrder();
                    n.left.length && this._render("left", n.left, e, t),
                        n.right.length && this._render("right", n.right, e, t)
                },
                setWidgetsModels: function (e) {
                    n = e
                },
                getOrder: function () {
                    return a
                },
                orderWidgets: function (t, n) {
                    var r = t.attr("id").split("-").shift();
                    if (r && a[r]) {
                        h(t, r);
                        var i = r === "right" ? "left" : "right"
                            , s = e("#" + i + "-container");
                        s.length && a[i] && h(s, i),
                            n && this.store.check(o, null, this.getOrder())
                    }
                },
                cookie: f,
                store: c
            }
        }();
        p.on("auth-success", function () {
            function E(e, t, n) {
                var r = t[e]
                    , s = null;
                s = new i.BaseWidget(r),
                    s !== null && m.add(s, n || {})
            }
            function S(t, n) {
                var s = r.getParameterByName("b", "master");
                e.extend(n, {
                    url: r.getBaseUrl(),
                    widget: JSON.stringify(t),
                    widget_id: this.model.id
                }),
                    e.ajax({
                        url: r.getServer() + "widget/edit",
                        type: "POST",
                        data: n,
                        dataType: "json",
                        success: r.bind(function (t, n, r) {
                            if (n === "success" && t.status === "OK") {
                                if (t.data.widget.type !== this.model.get("type")) {
                                    var s = new i.BaseWidget(t.data.widget);
                                    m.remove(this.model);
                                    if (s !== null) {
                                        m.add(s, {
                                            silent: !0
                                        });
                                        var o = null;
                                        s.get("type") === "plot" ? o = new i.PlotWidgetView({
                                            model: s
                                        }) : s.get("type") === "table" ? o = new i.TableWidgetView({
                                            model: s
                                        }) : s.get("type") === "double_chart" && (o = new i.DoubleChartWidgetView({
                                            model: s
                                        })),
                                            w(o),
                                            e("#dashboard-panel-" + this.model.cid).replaceWith(o.render().el),
                                            s.refreshData(h.getInterval(!0))
                                    }
                                    this.model.trigger("destroy", this.model)
                                } else
                                    this.model.reset().set(t.data.widget),
                                        this.model.refreshData(h.getInterval(!0)),
                                        e(".icon.settings", this.$el).removeClass("disable");
                                v.orderWidgets(e("#left-container"), !0)
                            }
                        }, this)
                    })
            }
            var u = e("#left-container")
                , a = e("#right-container")
                , p = {
                    connectWith: ".column",
                    handle: ".panel-heading",
                    forcePlaceholderSize: !0,
                    cursor: "move",
                    cancel: ".unsort, .tab-content",
                    placeholder: "ui-state-highlight",
                    stop: function (t, n) {
                        v.orderWidgets(e(this), !0);
                        var r = {
                            left_container: parseInt(u.height("auto").height(), 10),
                            right_container: parseInt(a.height("auto").height(), 10)
                        };
                        return r.left_container != r.right_container && (r.left_container > r.right_container ? a.height(r.left_container) : u.height(r.right_container)),
                            !0
                    }
                };
            u.sortable(p),
                a.sortable(p),
                u.disableSelection(),
                a.disableSelection();
            if (h === null) {
                var d = wialon.core.Session.getInstance().getServerTime();
                h = new s.SelectTime({
                    yesterday: r.tr("Yesterday"),
                    today: r.tr("Today"),
                    week: r.tr("Week"),
                    month: r.tr("Month"),
                    custom: r.tr("Custom"),
                    server_time: d,
                    tz: wialon.util.DateTime.getTimezoneOffset(),
                    dst: wialon.util.DateTime.getDSTOffset(d),
                    monday: APP.globals.userLocale ? APP.globals.userLocale.wd : 1,
                    format: APP.globals.userLocale ? APP.globals.userLocale.fd ? APP.globals.userLocale.fd.split("_")[0] : "%E:%m:%Y" : "%E:%m:%Y",
                    lang: r.getLang(),
                    period: 0
                }),
                    e("#select-time-panel").html(h.render().$el),
                    h.initWialonInterval(),
                    APP.globals.selectTime = h
            }
            var m = new i.ModelWidgets;
            v.setWidgetsModels(m);
            var g = new c;
            e("#header-buttons-wrapper").append(g.render().el),
                APP.globals.addUnitsTableInstance = g;
            var y = new l;
            e("#header-buttons-wrapper").append(y.render().el),
                APP.globals.addWidgetBtnView = y,
                y.on("new-widget", function (t) {
                    t.server_type === "units" && APP.globals.addUnitsTableInstance.disable(!0),
                        m.add(new i.BaseWidget(t)),
                        v.orderWidgets(e("#left-container"), !0)
                }),
                APP.globals.addUnitsTableInstance.on("click-add", function () {
                    APP.globals.addWidgetBtnView.save({
                        server_type: "units",
                        is_static: !0,
                        type: "table",
                        ct: "avl_unit"
                    })
                }),
                h.on("change-time", function () {
                    m.each(function (e, t) {
                        e.refreshData(h.getInterval(!0))
                    })
                }),
                APP.globals.addUnitsTableInstance.disable(!0),
                APP.globals.addWidgetBtnView.disable(!0);
            var b = r.isTouch();
            b && (e("#left-container").removeClass("col-sm-6").addClass("col-sm-12"),
                e("#right-container").hide());
            var w = r.bind(function (t) {
                t.on("settings", function () {
                    if (e(".icon.settings", this.$el).hasClass("disable"))
                        return;
                    e(".icon.settings", this.$el).addClass("disable");
                    var t = r.bind(function () {
                        require(["backbone.bootstrap-modal"], r.bind(function () {
                            var t = new f(APP.globals.widget_data, this.model)
                                , i = new n.BootstrapModal({
                                    content: t,
                                    animate: !0,
                                    okCloses: !1
                                });
                            i.open(r.bind(function (e, t) {
                                if (e.validate()) {
                                    var n = e.get_data()
                                        , i = wialon.core.Session.getInstance().getToken();
                                    i && i.th ? S.apply(this, [n, {
                                        token: i.th
                                    }]) : wialon.core.Session.getInstance().createAuthHash(r.bind(function (e, t, n) {
                                        t === 0 && S.apply(this, [e, {
                                            hash: n.authHash
                                        }])
                                    }, this, n)),
                                        t && t.close()
                                }
                            }, this, t, i)),
                                i.on("shown", r.bind(function () {
                                    e(".icon.settings", this.$el).removeClass("disable")
                                }, this))
                        }, this))
                    }, this);
                    APP.globals.widget_data === undefined ? e.ajax({
                        url: r.getServer() + "settings?" + "lang=" + r.getLang(),
                        type: "POST",
                        dataType: "json",
                        success: r.bind(function (n, r, i) {
                            r === "success" ? (APP.globals.widget_data = n,
                                t()) : e(".icon.settings", this.$el).removeClass("disable")
                        }, this)
                    }) : t()
                }),
                    t.on("remove", function () {
                        this.model.get("server_type") === "units" && APP.globals.addUnitsTableInstance.disable(!1),
                            m.remove(this.model, {
                                silent: !0
                            }),
                            v.orderWidgets(e("#left-container"), !0)
                    }),
                    t.on("want_refresh", function () {
                        this.model.refreshData(h.getInterval(!0), !0)
                    })
            }, this)
                , x = function (n) {
                    var s = n.widgets || n.data.widgets;
                    m.on("add", function (t, n, s) {
                        var o = null;
                        t.get("type") === "plot" ? o = new i.PlotWidgetView({
                            model: t
                        }) : t.get("type") === "table" ? o = new i.TableWidgetView({
                            model: t
                        }) : t.get("type") === "double_chart" && (o = new i.DoubleChartWidgetView({
                            model: t
                        })),
                            w(o);
                        if (t.get("is_static"))
                            e("#top-static-tables-container").append(o.render().el);
                        else if (!r.isTouch()) {
                            if (s.pos) {
                                var u = null;
                                switch (s.pos) {
                                    case "left":
                                        u = e("#left-container");
                                        break;
                                    case "right":
                                        u = e("#right-container")
                                }
                                if (u) {
                                    u.append(o.render().el),
                                        t.refreshData(h.getInterval(!0));
                                    return
                                }
                            }
                            var a = e("#left-container").children().length
                                , f = e("#right-container").children().length;
                            a === f || a < f ? e("#left-container").append(o.render().el) : a > f && e("#right-container").append(o.render().el)
                        } else
                            e("#left-container").append(o.render().el);
                        t.refreshData(h.getInterval(!0))
                    });
                    if (!v.store.get().length) {
                        var o = v.store.get();
                        t.forEach(s, function (e) {
                            e.order !== undefined && (o[e.id] = e.order)
                        }),
                            v.store.buildOrder()
                    }
                    var u = !1, a, f = e.extend({}, s);
                    for (a in f) {
                        if (!t.has(f, a))
                            continue;
                        if (!f[a].is_static && v.checkPos(f[a].id, f[a])) {
                            v.renderByOrder(f, E);
                            continue
                        }
                        f[a].server_type === "units" && (u = !0),
                            E(a, f)
                    }
                    e("#header-gug").removeClass("gug-progress"),
                        APP.globals.addUnitsTableInstance.disable(u),
                        APP.globals.addWidgetBtnView.disable(!1),
                        e("#select-time-panel").show()
                }
                , T = wialon.core.Session.getInstance().getToken();
            T && T.th ? v.init().loadOrder(function () {
                e.ajax({
                    url: r.getServer() + "widget/get",
                    type: "POST",
                    data: {
                        url: r.getBaseUrl(),
                        token: T.th,
                        lang: r.getLang()
                    },
                    dataType: "json",
                    success: r.bind(function (e, t, n) {
                        t === "success" && e.status === "OK" && x.apply(this, [e])
                    }, this)
                })
            }) : wialon.core.Session.getInstance().createAuthHash(r.bind(function (t, n) {
                if (t !== 0)
                    return;
                v.init().loadOrder(function () {
                    e.ajax({
                        url: r.getServer() + "widget/get",
                        type: "POST",
                        data: {
                            url: r.getBaseUrl(),
                            hash: n.authHash,
                            lang: r.getLang()
                        },
                        dataType: "json",
                        success: r.bind(function (e, t, n) {
                            t === "success" && e.status === "OK" && x.apply(this, [e])
                        }, this)
                    })
                })
            }, this)),
                o.init(),
                this.on("invalid-session", function () {
                    m.each(function (e, t) {
                        e.abort()
                    }),
                        e("#header-gug").removeClass("gug-progress")
                })
        }),
            p.on("auth-fail", function () {
                e("#header-gug").removeClass("gug-progress")
            })
    });
