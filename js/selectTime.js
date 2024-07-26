define(["backbone", "dashboardUtil", "jquery-ui-1.10.4.custom", "jquery.ui.touch-punch", "jquery.cookie", "wialon.interval"], function(e, t) {
    "use strict";
    $.cookie.json = !0;
    var n = e.View.extend({
        template: $("#time-select-template").html(),
        events: {},
        initialize: function(e) {
            var n = {
                yesterday: "Yesterday",
                today: "Today",
                week: "Week",
                month: "Month",
                custom: "Custom",
                period: 0,
                server_time: 0,
                tz: 0,
                dst: 0,
                monday: 1,
                format: "%E:%m:%Y",
                lang: "en"
            }, r, i, s, o;
            this.context = _.extend(n, e),
            r = $.datepicker.regional[this.context.lang || "en"];
            if (r && r.dayNames) {
                for (i = 0; i < r.dayNames.length; i++)
                    r.dayNames[i] = t.capitalize(r.dayNames[i]);
                $.datepicker.setDefaults(r)
            }
            this.time_type = 0,
            this.time_custom = null,
            this.today = {
                from: 0,
                to: 0
            },
            this.last_time = null,
            this.tz = e ? e.tz || 0 : 0,
            this.dst = e ? e.dst || 0 : 0,
            this.timezone_diff = -1 * t.getLocalTimezone() + this.tz + this.dst,
            s = new Date(this.getUserTime(this.context.server_time, this.tz, this.dst) * 1e3),
            s.setHours(0),
            s.setMinutes(0),
            s.setSeconds(0),
            s.setMilliseconds(0),
            o = new Date(s),
            o.setSeconds(o.getSeconds() + 86399),
            this.today.from = s.getTime() / 1e3 | 0,
            this.today.to = o.getTime() / 1e3 | 0
        },
        render: function() {
            $(this.el).html(_.template(this.template, this.context));
            var e = {
                showSecond: !0,
                firstDay: this.context.monday > 1 ? 0 : 1,
                controlType: "select",
                showButtonPanel: !1,
                beforeShowDay: function(e) {
                    var t = e.getDate();
                    return [!0, t < 10 ? "zero" : ""]
                },
                dateFormat: t.convertFormat(this.context.format, !0)
            };
            return $("#date-from", this.el).datepicker(e),
            $("#date-to", this.el).datepicker(e),
            $(document).on("touchstart", function(e) {
                var t = $(e.toElement);
                !t.hasClass("datetime") && !t.hasClass("hasDatepicker") && $(".hasDatepicker").datepicker("hide")
            }),
            t.isTouch() && ($("#date-from", this.el).attr("readonly", !0),
            $("#date-to", this.el).attr("readonly", !0)),
            $("#timepickers", this.el).hide(),
            $("#change-time-btn", this.el).removeAttr("href"),
            this.changeTime(this.context.period),
            this
        },
        getInterval: function(e) {
            if (!this.last_time[0] || !this.last_time[1])
                return [];
            var t = 0;
            return e && (t = this.timezone_diff),
            [this.last_time[0] - t, this.last_time[1] - t]
        },
        triggerChangeTime: function(e) {
            if (!this.last_time || this.last_time[0] !== e[0] || this.last_time[1] !== e[1])
                this.last_time = e,
                this.trigger("change-time", this)
        },
        getUserTime: function(e, n, r) {
            return e - t.getLocalTimezone() + n + r
        },
        changeTime: function(e, t) {
            e = parseInt(e, 10),
            t = t || [],
            this.time_type = e,
            this.time_from = t[0],
            this.time_to = t[1];
            var n = new Date(t[0] * 1e3)
              , r = new Date(t[1] * 1e3);
            $("#date-from", this.el).datepicker("option", "defaultDate", n),
            $("#date-from", this.el).datepicker("setDate", n),
            $("#date-to", this.el).datepicker("option", "defaultDate", r),
            $("#date-to", this.el).datepicker("setDate", r),
            this.triggerChangeTime(t)
        },
        initWialonInterval: function() {
            var e = this
              , t = wialon.core.Session.getInstance().getServerTime()
              , n = {
                template: this.template,
                tzOffset: wialon.util.DateTime.getTimezoneOffset() + wialon.util.DateTime.getDSTOffset(t),
                now: t,
                dateFormat: "dd:MM:yyyy",
                labels: {
                    yesterday: TRANSLATIONS.Yesterday || "Yesterday",
                    today: TRANSLATIONS.Today || "Today",
                    week: TRANSLATIONS.Week || "Week",
                    month: TRANSLATIONS.Month || "Month",
                    custom: TRANSLATIONS.Custom || "Custom",
                    ok: "OK",
                    reset: "Reset"
                },
                onInit: function() {
                    $(e.el).intervalWialon("set", 0)
                },
                onChange: function(t) {
                    e.changeTime.apply(e, t)
                }
            }
              , r = wialon.core.Session.getInstance().getCurrUser();
            return r.getLocale(function(t, r) {
                if (r && r.fd) {
                    var i = r.fd.split("_");
                    i.length === 2 && (n.dateFormat = wialon.util.DateTime.convertFormat(i[0], !0)),
                    n.firstDay = r.wd || 1
                }
                $(e.el).intervalWialon(n)
            }),
            this
        }
    });
    return {
        SelectTime: n
    }
});
