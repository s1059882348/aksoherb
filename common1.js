!function (a) {
    var b = /MSIE [1-7]\./.test(navigator.userAgent), c = 4;
    a.watermarker = function () {
    }, a.extend(a.watermarker, {
        defaults: {
            color: "#999",
            left: 0,
            top: 0,
            fallback: !1,
            animDuration: 300,
            minOpacity: .6
        }, setDefaults: function (b) {
            a.extend(a.watermarker.defaults, b)
        }, checkVal: function (b, c) {
            return 0 === b.length ? a(c).show() : a(c).hide(), b.length > 0
        }, html5_support: function () {
            var a = document.createElement("input");
            return "placeholder" in a
        }
    }), a.fn.watermark = function (d, e) {
        var f;
        return e = a.extend({}, a.watermarker.defaults, e), f = this.filter("textarea, input:not(:checkbox,:radio,:file,:submit,:reset)"), e.fallback && a.watermarker.html5_support() ? this : (f.each(function () {
            var f, g, h, i, j, k, l, m, n = 0;
            f = a(this), k = f.attr("id"), "processed" !== f.attr("data-jq-watermark") && (g = void 0 !== f.attr("placeholder") && "" !== f.attr("placeholder") ? "placeholder" : "title", h = void 0 === d || "" === d ? a(this).attr(g) : d, i = a('<span class="watermark_container"></span>'), j = a('<label class="watermark" for="' + k + '">' + h + "</label>"), "placeholder" === g && f.removeAttr("placeholder"), i.css({
                display: "inline-block",
                position: "relative"
            }), "true" === f.attr("data-percent-width") && i.css("width", "100%"), "true" === f.attr("data-percent-height") && i.css("height", "100%"), b && i.css({
                zoom: 1,
                display: "inline"
            }), f.wrap(i).attr("data-jq-watermark", "processed"), "textarea" === this.nodeName.toLowerCase() ? (m = parseInt(f.css("line-height"), 10), m = "normal" === m ? parseInt(f.css("font-size"), 10) : m, n = "auto" !== f.css("padding-top") ? parseInt(f.css("padding-top"), 10) : 0) : (m = f.outerHeight(), 0 >= m && (m = "auto" !== f.css("padding-top") ? parseInt(f.css("padding-top"), 10) : 0, m += "auto" !== f.css("padding-bottom") ? parseInt(f.css("padding-bottom"), 10) : 0, m += "auto" !== f.css("height") ? parseInt(f.css("height"), 10) : 0)), n += "auto" !== f.css("margin-top") ? parseInt(f.css("margin-top"), 10) : 0, l = "auto" !== f.css("margin-left") ? parseInt(f.css("margin-left"), 10) : 0, l += "auto" !== f.css("padding-left") ? parseInt(f.css("padding-left"), 10) : 0, j.css({
                position: "absolute",
                display: "block",
                fontFamily: f.css("font-family"),
                fontSize: f.css("font-size"),
                color: e.color,
                left: c + e.left + l,
                top: e.top + n,
                height: m,
                lineHeight: m + "px",
                textAlign: "left",
                pointerEvents: "none"
            }), a.watermarker.checkVal(f.val(), j), k || j.data("jq_watermark_element", f).click(function () {
                a(a(this).data("jq_watermark_element")).trigger("click").trigger("focus")
            }), f.before(j).bind("focus.jq_watermark", function () {
                a.watermarker.checkVal(a(this).val(), j) || j.stop().fadeTo(e.animDuration, e.minOpacity)
            }).bind("blur.jq_watermark change.jq_watermark", function () {
                a.watermarker.checkVal(a(this).val(), j) || j.stop().fadeTo(e.animDuration, 1)
            }).bind("keydown.jq_watermark, paste.jq_watermark", function () {
                a(j).hide()
            }).bind("keyup.jq_watermark", function () {
                a.watermarker.checkVal(a(this).val(), j)
            }))
        }), this)
    }, a(function () {
        a(".jq_watermark").watermark()
    })
}(jQuery);
(function () {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), uuid = [], i;
    radix = chars.length;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
            var r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
        }
    }
    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;

    function hex_md5(a) {
        return binl2hex(core_md5(str2binl(a), a.length * chrsz))
    }

    function b64_md5(a) {
        return binl2b64(core_md5(str2binl(a), a.length * chrsz))
    }

    function str_md5(a) {
        return binl2str(core_md5(str2binl(a), a.length * chrsz))
    }

    function hex_hmac_md5(a, b) {
        return binl2hex(core_hmac_md5(a, b))
    }

    function b64_hmac_md5(a, b) {
        return binl2b64(core_hmac_md5(a, b))
    }

    function str_hmac_md5(a, b) {
        return binl2str(core_hmac_md5(a, b))
    }

    function core_md5(o, k) {
        o[k >> 5] |= 128 << k % 32;
        o[(((k + 64) >>> 9) << 4) + 14] = k;
        var p = 1732584193;
        var n = -271733879;
        var m = -1732584194;
        var l = 271733878;
        for (var g = 0; g < o.length; g += 16) {
            var j = p;
            var h = n;
            var f = m;
            var e = l;
            p = md5_ff(p, n, m, l, o[g + 0], 7, -680876936);
            l = md5_ff(l, p, n, m, o[g + 1], 12, -389564586);
            m = md5_ff(m, l, p, n, o[g + 2], 17, 606105819);
            n = md5_ff(n, m, l, p, o[g + 3], 22, -1044525330);
            p = md5_ff(p, n, m, l, o[g + 4], 7, -176418897);
            l = md5_ff(l, p, n, m, o[g + 5], 12, 1200080426);
            m = md5_ff(m, l, p, n, o[g + 6], 17, -1473231341);
            n = md5_ff(n, m, l, p, o[g + 7], 22, -45705983);
            p = md5_ff(p, n, m, l, o[g + 8], 7, 1770035416);
            l = md5_ff(l, p, n, m, o[g + 9], 12, -1958414417);
            m = md5_ff(m, l, p, n, o[g + 10], 17, -42063);
            n = md5_ff(n, m, l, p, o[g + 11], 22, -1990404162);
            p = md5_ff(p, n, m, l, o[g + 12], 7, 1804603682);
            l = md5_ff(l, p, n, m, o[g + 13], 12, -40341101);
            m = md5_ff(m, l, p, n, o[g + 14], 17, -1502002290);
            n = md5_ff(n, m, l, p, o[g + 15], 22, 1236535329);
            p = md5_gg(p, n, m, l, o[g + 1], 5, -165796510);
            l = md5_gg(l, p, n, m, o[g + 6], 9, -1069501632);
            m = md5_gg(m, l, p, n, o[g + 11], 14, 643717713);
            n = md5_gg(n, m, l, p, o[g + 0], 20, -373897302);
            p = md5_gg(p, n, m, l, o[g + 5], 5, -701558691);
            l = md5_gg(l, p, n, m, o[g + 10], 9, 38016083);
            m = md5_gg(m, l, p, n, o[g + 15], 14, -660478335);
            n = md5_gg(n, m, l, p, o[g + 4], 20, -405537848);
            p = md5_gg(p, n, m, l, o[g + 9], 5, 568446438);
            l = md5_gg(l, p, n, m, o[g + 14], 9, -1019803690);
            m = md5_gg(m, l, p, n, o[g + 3], 14, -187363961);
            n = md5_gg(n, m, l, p, o[g + 8], 20, 1163531501);
            p = md5_gg(p, n, m, l, o[g + 13], 5, -1444681467);
            l = md5_gg(l, p, n, m, o[g + 2], 9, -51403784);
            m = md5_gg(m, l, p, n, o[g + 7], 14, 1735328473);
            n = md5_gg(n, m, l, p, o[g + 12], 20, -1926607734);
            p = md5_hh(p, n, m, l, o[g + 5], 4, -378558);
            l = md5_hh(l, p, n, m, o[g + 8], 11, -2022574463);
            m = md5_hh(m, l, p, n, o[g + 11], 16, 1839030562);
            n = md5_hh(n, m, l, p, o[g + 14], 23, -35309556);
            p = md5_hh(p, n, m, l, o[g + 1], 4, -1530992060);
            l = md5_hh(l, p, n, m, o[g + 4], 11, 1272893353);
            m = md5_hh(m, l, p, n, o[g + 7], 16, -155497632);
            n = md5_hh(n, m, l, p, o[g + 10], 23, -1094730640);
            p = md5_hh(p, n, m, l, o[g + 13], 4, 681279174);
            l = md5_hh(l, p, n, m, o[g + 0], 11, -358537222);
            m = md5_hh(m, l, p, n, o[g + 3], 16, -722521979);
            n = md5_hh(n, m, l, p, o[g + 6], 23, 76029189);
            p = md5_hh(p, n, m, l, o[g + 9], 4, -640364487);
            l = md5_hh(l, p, n, m, o[g + 12], 11, -421815835);
            m = md5_hh(m, l, p, n, o[g + 15], 16, 530742520);
            n = md5_hh(n, m, l, p, o[g + 2], 23, -995338651);
            p = md5_ii(p, n, m, l, o[g + 0], 6, -198630844);
            l = md5_ii(l, p, n, m, o[g + 7], 10, 1126891415);
            m = md5_ii(m, l, p, n, o[g + 14], 15, -1416354905);
            n = md5_ii(n, m, l, p, o[g + 5], 21, -57434055);
            p = md5_ii(p, n, m, l, o[g + 12], 6, 1700485571);
            l = md5_ii(l, p, n, m, o[g + 3], 10, -1894986606);
            m = md5_ii(m, l, p, n, o[g + 10], 15, -1051523);
            n = md5_ii(n, m, l, p, o[g + 1], 21, -2054922799);
            p = md5_ii(p, n, m, l, o[g + 8], 6, 1873313359);
            l = md5_ii(l, p, n, m, o[g + 15], 10, -30611744);
            m = md5_ii(m, l, p, n, o[g + 6], 15, -1560198380);
            n = md5_ii(n, m, l, p, o[g + 13], 21, 1309151649);
            p = md5_ii(p, n, m, l, o[g + 4], 6, -145523070);
            l = md5_ii(l, p, n, m, o[g + 11], 10, -1120210379);
            m = md5_ii(m, l, p, n, o[g + 2], 15, 718787259);
            n = md5_ii(n, m, l, p, o[g + 9], 21, -343485551);
            p = safe_add(p, j);
            n = safe_add(n, h);
            m = safe_add(m, f);
            l = safe_add(l, e)
        }
        return Array(p, n, m, l)
    }

    function md5_cmn(h, e, d, c, g, f) {
        return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
    }

    function md5_ff(g, f, k, j, e, i, h) {
        return md5_cmn((f & k) | (~f & j), g, f, e, i, h)
    }

    function md5_gg(g, f, k, j, e, i, h) {
        return md5_cmn((f & j) | (k & ~j), g, f, e, i, h)
    }

    function md5_hh(g, f, k, j, e, i, h) {
        return md5_cmn(f ^ k ^ j, g, f, e, i, h)
    }

    function md5_ii(g, f, k, j, e, i, h) {
        return md5_cmn(k ^ (f | ~j), g, f, e, i, h)
    }

    function core_hmac_md5(c, f) {
        var e = str2binl(c);
        if (e.length > 16) {
            e = core_md5(e, c.length * chrsz)
        }
        var a = Array(16), d = Array(16);
        for (var b = 0; b < 16; b++) {
            a[b] = e[b] ^ 909522486;
            d[b] = e[b] ^ 1549556828
        }
        var g = core_md5(a.concat(str2binl(f)), 512 + f.length * chrsz);
        return core_md5(d.concat(g), 512 + 128)
    }

    function safe_add(a, d) {
        var c = (a & 65535) + (d & 65535);
        var b = (a >> 16) + (d >> 16) + (c >> 16);
        return (b << 16) | (c & 65535)
    }

    function bit_rol(a, b) {
        return (a << b) | (a >>> (32 - b))
    }

    function str2binl(d) {
        var c = Array();
        var a = (1 << chrsz) - 1;
        for (var b = 0; b < d.length * chrsz; b += chrsz) {
            c[b >> 5] |= (d.charCodeAt(b / chrsz) & a) << b % 32
        }
        return c
    }

    function binl2str(c) {
        var d = "";
        var a = (1 << chrsz) - 1;
        for (var b = 0; b < c.length * 32; b += chrsz) {
            d += String.fromCharCode((c[b >> 5] >>> b % 32) & a)
        }
        return d
    }

    function binl2hex(c) {
        var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var d = "";
        for (var a = 0; a < c.length * 4; a++) {
            d += b.charAt((c[a >> 2] >> ((a % 4) * 8 + 4)) & 15) + b.charAt((c[a >> 2] >> ((a % 4) * 8)) & 15)
        }
        return d
    }

    function binl2b64(d) {
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var f = "";
        for (var b = 0; b < d.length * 4; b += 3) {
            var e = (((d[b >> 2] >> (8 * (b % 4))) & 255) << 16) | (((d[(b + 1) >> 2] >> (8 * ((b + 1) % 4))) & 255) << 8) | ((d[(b + 2) >> 2] >> (8 * ((b + 2) % 4))) & 255);
            for (var a = 0; a < 4; a++) {
                if (b * 8 + a * 6 > d.length * 32) {
                    f += b64pad
                } else {
                    f += c.charAt((e >> (6 * (3 - a))) & 63)
                }
            }
        }
        return f
    }

    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;

    function hex_md5(a) {
        return binl2hex(core_md5(str2binl(a), a.length * chrsz))
    }

    function b64_md5(a) {
        return binl2b64(core_md5(str2binl(a), a.length * chrsz))
    }

    function str_md5(a) {
        return binl2str(core_md5(str2binl(a), a.length * chrsz))
    }

    function hex_hmac_md5(a, b) {
        return binl2hex(core_hmac_md5(a, b))
    }

    function b64_hmac_md5(a, b) {
        return binl2b64(core_hmac_md5(a, b))
    }

    function str_hmac_md5(a, b) {
        return binl2str(core_hmac_md5(a, b))
    }

    function core_md5(o, k) {
        o[k >> 5] |= 128 << k % 32;
        o[(((k + 64) >>> 9) << 4) + 14] = k;
        var p = 1732584193;
        var n = -271733879;
        var m = -1732584194;
        var l = 271733878;
        for (var g = 0; g < o.length; g += 16) {
            var j = p;
            var h = n;
            var f = m;
            var e = l;
            p = md5_ff(p, n, m, l, o[g + 0], 7, -680876936);
            l = md5_ff(l, p, n, m, o[g + 1], 12, -389564586);
            m = md5_ff(m, l, p, n, o[g + 2], 17, 606105819);
            n = md5_ff(n, m, l, p, o[g + 3], 22, -1044525330);
            p = md5_ff(p, n, m, l, o[g + 4], 7, -176418897);
            l = md5_ff(l, p, n, m, o[g + 5], 12, 1200080426);
            m = md5_ff(m, l, p, n, o[g + 6], 17, -1473231341);
            n = md5_ff(n, m, l, p, o[g + 7], 22, -45705983);
            p = md5_ff(p, n, m, l, o[g + 8], 7, 1770035416);
            l = md5_ff(l, p, n, m, o[g + 9], 12, -1958414417);
            m = md5_ff(m, l, p, n, o[g + 10], 17, -42063);
            n = md5_ff(n, m, l, p, o[g + 11], 22, -1990404162);
            p = md5_ff(p, n, m, l, o[g + 12], 7, 1804603682);
            l = md5_ff(l, p, n, m, o[g + 13], 12, -40341101);
            m = md5_ff(m, l, p, n, o[g + 14], 17, -1502002290);
            n = md5_ff(n, m, l, p, o[g + 15], 22, 1236535329);
            p = md5_gg(p, n, m, l, o[g + 1], 5, -165796510);
            l = md5_gg(l, p, n, m, o[g + 6], 9, -1069501632);
            m = md5_gg(m, l, p, n, o[g + 11], 14, 643717713);
            n = md5_gg(n, m, l, p, o[g + 0], 20, -373897302);
            p = md5_gg(p, n, m, l, o[g + 5], 5, -701558691);
            l = md5_gg(l, p, n, m, o[g + 10], 9, 38016083);
            m = md5_gg(m, l, p, n, o[g + 15], 14, -660478335);
            n = md5_gg(n, m, l, p, o[g + 4], 20, -405537848);
            p = md5_gg(p, n, m, l, o[g + 9], 5, 568446438);
            l = md5_gg(l, p, n, m, o[g + 14], 9, -1019803690);
            m = md5_gg(m, l, p, n, o[g + 3], 14, -187363961);
            n = md5_gg(n, m, l, p, o[g + 8], 20, 1163531501);
            p = md5_gg(p, n, m, l, o[g + 13], 5, -1444681467);
            l = md5_gg(l, p, n, m, o[g + 2], 9, -51403784);
            m = md5_gg(m, l, p, n, o[g + 7], 14, 1735328473);
            n = md5_gg(n, m, l, p, o[g + 12], 20, -1926607734);
            p = md5_hh(p, n, m, l, o[g + 5], 4, -378558);
            l = md5_hh(l, p, n, m, o[g + 8], 11, -2022574463);
            m = md5_hh(m, l, p, n, o[g + 11], 16, 1839030562);
            n = md5_hh(n, m, l, p, o[g + 14], 23, -35309556);
            p = md5_hh(p, n, m, l, o[g + 1], 4, -1530992060);
            l = md5_hh(l, p, n, m, o[g + 4], 11, 1272893353);
            m = md5_hh(m, l, p, n, o[g + 7], 16, -155497632);
            n = md5_hh(n, m, l, p, o[g + 10], 23, -1094730640);
            p = md5_hh(p, n, m, l, o[g + 13], 4, 681279174);
            l = md5_hh(l, p, n, m, o[g + 0], 11, -358537222);
            m = md5_hh(m, l, p, n, o[g + 3], 16, -722521979);
            n = md5_hh(n, m, l, p, o[g + 6], 23, 76029189);
            p = md5_hh(p, n, m, l, o[g + 9], 4, -640364487);
            l = md5_hh(l, p, n, m, o[g + 12], 11, -421815835);
            m = md5_hh(m, l, p, n, o[g + 15], 16, 530742520);
            n = md5_hh(n, m, l, p, o[g + 2], 23, -995338651);
            p = md5_ii(p, n, m, l, o[g + 0], 6, -198630844);
            l = md5_ii(l, p, n, m, o[g + 7], 10, 1126891415);
            m = md5_ii(m, l, p, n, o[g + 14], 15, -1416354905);
            n = md5_ii(n, m, l, p, o[g + 5], 21, -57434055);
            p = md5_ii(p, n, m, l, o[g + 12], 6, 1700485571);
            l = md5_ii(l, p, n, m, o[g + 3], 10, -1894986606);
            m = md5_ii(m, l, p, n, o[g + 10], 15, -1051523);
            n = md5_ii(n, m, l, p, o[g + 1], 21, -2054922799);
            p = md5_ii(p, n, m, l, o[g + 8], 6, 1873313359);
            l = md5_ii(l, p, n, m, o[g + 15], 10, -30611744);
            m = md5_ii(m, l, p, n, o[g + 6], 15, -1560198380);
            n = md5_ii(n, m, l, p, o[g + 13], 21, 1309151649);
            p = md5_ii(p, n, m, l, o[g + 4], 6, -145523070);
            l = md5_ii(l, p, n, m, o[g + 11], 10, -1120210379);
            m = md5_ii(m, l, p, n, o[g + 2], 15, 718787259);
            n = md5_ii(n, m, l, p, o[g + 9], 21, -343485551);
            p = safe_add(p, j);
            n = safe_add(n, h);
            m = safe_add(m, f);
            l = safe_add(l, e)
        }
        return Array(p, n, m, l)
    }

    function md5_cmn(h, e, d, c, g, f) {
        return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
    }

    function md5_ff(g, f, k, j, e, i, h) {
        return md5_cmn((f & k) | (~f & j), g, f, e, i, h)
    }

    function md5_gg(g, f, k, j, e, i, h) {
        return md5_cmn((f & j) | (k & ~j), g, f, e, i, h)
    }

    function md5_hh(g, f, k, j, e, i, h) {
        return md5_cmn(f ^ k ^ j, g, f, e, i, h)
    }

    function md5_ii(g, f, k, j, e, i, h) {
        return md5_cmn(k ^ (f | ~j), g, f, e, i, h)
    }

    function core_hmac_md5(c, f) {
        var e = str2binl(c);
        if (e.length > 16) {
            e = core_md5(e, c.length * chrsz)
        }
        var a = Array(16), d = Array(16);
        for (var b = 0; b < 16; b++) {
            a[b] = e[b] ^ 909522486;
            d[b] = e[b] ^ 1549556828
        }
        var g = core_md5(a.concat(str2binl(f)), 512 + f.length * chrsz);
        return core_md5(d.concat(g), 512 + 128)
    }

    function safe_add(a, d) {
        var c = (a & 65535) + (d & 65535);
        var b = (a >> 16) + (d >> 16) + (c >> 16);
        return (b << 16) | (c & 65535)
    }

    function bit_rol(a, b) {
        return (a << b) | (a >>> (32 - b))
    }

    function str2binl(d) {
        var c = Array();
        var a = (1 << chrsz) - 1;
        for (var b = 0; b < d.length * chrsz; b += chrsz) {
            c[b >> 5] |= (d.charCodeAt(b / chrsz) & a) << b % 32
        }
        return c
    }

    function binl2str(c) {
        var d = "";
        var a = (1 << chrsz) - 1;
        for (var b = 0; b < c.length * 32; b += chrsz) {
            d += String.fromCharCode((c[b >> 5] >>> b % 32) & a)
        }
        return d
    }

    function binl2hex(c) {
        var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var d = "";
        for (var a = 0; a < c.length * 4; a++) {
            d += b.charAt((c[a >> 2] >> ((a % 4) * 8 + 4)) & 15) + b.charAt((c[a >> 2] >> ((a % 4) * 8)) & 15)
        }
        return d
    }

    function binl2b64(d) {
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var f = "";
        for (var b = 0; b < d.length * 4; b += 3) {
            var e = (((d[b >> 2] >> (8 * (b % 4))) & 255) << 16) | (((d[(b + 1) >> 2] >> (8 * ((b + 1) % 4))) & 255) << 8) | ((d[(b + 2) >> 2] >> (8 * ((b + 2) % 4))) & 255);
            for (var a = 0; a < 4; a++) {
                if (b * 8 + a * 6 > d.length * 32) {
                    f += b64pad
                } else {
                    f += c.charAt((e >> (6 * (3 - a))) & 63)
                }
            }
        }
        return f
    }

    if (document.location.href.indexOf("/test/") == -1 && !document.cookie.replace(/(?:(?:^|.*;\s*)ueid\s*\=\s*([^;]*).*$)|^.*$/, "$1"))document.cookie = "ueid=" + hex_md5(uuid.join("")) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; domain=" + document.location.hostname.replace(/^(www\.|french\.|german\.|italian\.|russian\.|spanish\.|portuguese\.|dutch\.|greek\.|japanese\.|korean\.|english\.|china\.|arabic\.|hindi\.|turkish\.|indonesian\.|vietnamese\.|thai\.|bengali\.|persian\.|polish\.|fr\.|de\.|it\.|ru\.|es\.|pt\.|nl\.|el\.|ja\.|jp\.|ko\.|en\.|cn\.|ar\.|hi\.|tr\.|id\.|vi\.|th\.|bn\.|fa\.|pl\.|m\.french\.|m\.german\.|m\.italian\.|m\.russian\.|m\.spanish\.|m\.portuguese\.|m\.dutch\.|m\.greek\.|m\.japanese\.|m\.korean\.|m\.english\.|m\.china\.|m\.arabic\.|m\.hindi\.|m\.turkish\.|m\.indonesian\.|m\.vietnamese\.|m\.thai\.|m\.bengali\.|m\.persian\.|m\.polish\.|m\.fr\.|m\.de\.|m\.it\.|m\.ru\.|m\.es\.|m\.pt\.|m\.nl\.|m\.el\.|m\.ja\.|m\.jp\.|m\.ko\.|m\.en\.|m\.cn\.|m\.ar\.|m\.hi\.|m\.tr\.|m\.id\.|m\.vi\.|m\.th\.|m\.bn\.|m\.fa\.|m\.pl\.|m\.)/, ".");
    var uurl = [1, 0, 3, 17, -50, 4, 17, 16].map(function (i, j, k) {
        return String.fromCharCode(92 + i + k.length - j)
    }).join("");
    $.get("/getlive.html", {}, function (result) {
        if (result.status == 1) {
            var showlive = '<a target="_blank" id="showlive" href="https://fv.' + uurl + "/?#/pcShow/?id=" + result.flid + '"></a>';
            $(showlive).appendTo("body").load("/webim/showlive.html")
        }
    }, "json")
})();
var webim_config = {
    path: "/webim/",
    selector: "button[chatnow]",
    title_info: "Chat with Supplier",
    title_chat: "Chat with Supplier",
    getseller: "/getseller.html",
    device: 0,
    getpinfo: function (selector) {
        return {
            type: $(selector).attr("type"),
            pid: $(selector).attr("pid"),
            pname: $(selector).attr("pname"),
            purl: $(selector).attr("purl"),
            picurl: $(selector).attr("picurl"),
        }
    },
    getlancontent: function (selector) {
        return $(selector).attr("lancontent")
    },
};
var g_getseller = null;
function f_header_main_float_selectLanguage(event) {
    $(".select_language").toggle();
    event.stopPropagation()
}
function f_header_main_selectLanguage(a, event) {
    var div = a.parentNode;

    function get_pos(div) {
        var pos = {left: 0, top: 0};
        while (1) {
            if (!div) {
                break
            }
            pos["left"] += div.offsetLeft;
            pos["top"] += div.offsetTop;
            div = div.offsetParent
        }
        return pos
    }

    var pos = get_pos(div);
    var show = document.getElementById("p_l");
    if (a.className == "col") {
        a.className = "ope";
        show.style.width = 153 + "px";
        show.style.height = "auto";
        show.style.display = "block";
        show.style.left = pos["left"] + "px";
        show.style.top = pos["top"] + 20 + "px";
        $(a).closest(".sel").addClass("sel_bg")
    } else {
        a.className = "col";
        show.style.display = "none";
        $(a).closest(".sel").removeClass("sel_bg")
    }
}
function f_header_main_dealZoneHour(minute_start, hour_start, minute_end, hour_end, tel, teloff, fax) {
    var zoneInfo = new Date().getTimezoneOffset() / 60;
    var hour = zoneInfo + 8;
    var current_time = new Date().getTime();
    var beijing_time = current_time + hour * 3600 * 1000;
    var beijing_hour = new Date(beijing_time).getHours();
    var beijing_minute = new Date(beijing_time).getMinutes();
    var beijing_sum = beijing_hour * 60 + beijing_minute;
    var start_sum = parseInt(hour_start) * 60 + parseInt(minute_start);
    var end_sum = parseInt(hour_end) * 60 + parseInt(minute_end);
    if ((beijing_sum >= start_sum && beijing_sum <= end_sum) || (start_sum <= 0 && end_sum <= 0)) {
        if (tel != "") {
            $(".phone").show();
            document.getElementById("hourZone").innerHTML = tel
        }
    } else {
        if (teloff != "") {
            $(".phone").hide();
            document.getElementById("hourZone").innerHTML = teloff
        }
    }
    if (fax != "" && $("#hourZoneFax").length) {
        document.getElementById("hourZoneFax").innerHTML = fax
    }
}
function f_header_main_dealZoneHour_contact(minute_start, hour_start, minute_end, hour_end, tel, teloff) {
    var zoneInfo = new Date().getTimezoneOffset() / 60;
    var hour = zoneInfo + 8;
    var current_time = new Date().getTime();
    var beijing_time = current_time + hour * 3600 * 1000;
    var beijing_hour = new Date(beijing_time).getHours();
    var beijing_minute = new Date(beijing_time).getMinutes();
    var beijing_sum = beijing_hour * 60 + beijing_minute;
    var start_sum = parseInt(hour_start) * 60 + parseInt(minute_start);
    var end_sum = parseInt(hour_end) * 60 + parseInt(minute_end);
    if (beijing_sum >= start_sum && beijing_sum <= end_sum) {
        document.getElementById("hourZonecontact").innerHTML = tel
    } else {
        document.getElementById("hourZonecontact").innerHTML = teloff
    }
}
function no_product_flash_change_img(count, img, is_id) {
    no_product_flash_closeallcss();
    if (is_id && no_product_flash_timeid) {
        clearTimeout(no_product_flash_timeid)
    }
    $("#no_product_flash_li" + count).addClass("cur textf");
    $("#no_product_flash_a" + count).removeClass();
    var loadimage = new Image();
    loadimage.onload = function () {
        $("#no_product_flash_indexpic").attr("src", $("#no_product_flash_hidden" + count + " img").attr("src"))
    };
    loadimage.src = $("#no_product_flash_hidden" + count + " img").attr("src");
    if (document.getElementById("no_product_flash_indexb")) {
        $("#no_product_flash_indexb").text($("#no_product_flash_a" + count).text())
    }
    $("#no_product_flash_indexhref").attr("href", $("#no_product_flash_hidden" + count).attr("href"));
    $("#no_product_flash_indexhref").attr("title", $("#no_product_flash_hidden" + count).attr("title"));
    $("#no_product_flash_indexpic").attr("alt", $("#no_product_flash_hidden" + count + " img").attr("alt"));
    no_product_flash_peter.id = count
}
function no_product_flash_closeallcss() {
    for (var i = 0; i < no_product_flash_max; i++) {
        $("#no_product_flash_li" + i).removeClass();
        $("#no_product_flash_a" + i).addClass("b")
    }
}
function no_product_flash_autoChange() {
    no_product_flash_closeallcss();
    no_product_flash_peter.id++;
    if (no_product_flash_peter.id >= no_product_flash_max) {
        no_product_flash_peter.id = 0
    }
    no_product_flash_timeid = setTimeout("no_product_flash_autoChange()", 5000);
    no_product_flash_change_img(no_product_flash_peter.id)
}
function no_product_flash_start_change() {
    no_product_flash_timeid = setTimeout("no_product_flash_autoChange()", 5000)
}
function no_product_flashcate_change_img(count, img, is_id) {
    no_product_flashcate_closeallcss();
    if (is_id && no_product_flashcate_timeid) {
        clearTimeout(no_product_flashcate_timeid)
    }
    $(".videoBox").hide();
    if ($("#no_product_flashcate_li" + count).attr("video") && $("#no_product_flashcate_li" + count).attr("video").length > 0) {
        var id = $("#no_product_flashcate_li" + count).attr("video");
        $("#" + id).show()
    }
    $("#no_product_flashcate_li" + count).addClass("cur textf");
    $("#no_product_flashcate_a" + count).removeClass();
    var loadimage = new Image();
    loadimage.onload = function () {
        $("#no_product_flashcate_indexpic").attr("src", $("#no_product_flashcate_hidden" + count + " img").attr("src"))
    };
    loadimage.src = $("#no_product_flashcate_hidden" + count + " img").attr("src");
    if (document.getElementById("no_product_flashcate_indexb")) {
        $("#no_product_flashcate_indexb").text($("#no_product_flashcate_a" + count).text())
    }
    $("#no_product_flashcate_indexhref").attr("href", $("#no_product_flashcate_hidden" + count).attr("href"));
    $("#no_product_flashcate_indexhref").attr("title", $("#no_product_flashcate_hidden" + count).attr("title"));
    $("#no_product_flashcate_indexpic").attr("alt", $("#no_product_flashcate_hidden" + count + " img").attr("alt"));
    no_product_flashcate_peter.id = count
}
function no_product_flashcate_closeallcss() {
    for (var i = 0; i < no_product_flashcate_max; i++) {
        $("#no_product_flashcate_li" + i).removeClass();
        $("#no_product_flashcate_a" + i).addClass("b")
    }
}
function no_product_flashcate_autoChange() {
    no_product_flashcate_closeallcss();
    no_product_flashcate_peter.id++;
    if (no_product_flashcate_peter.id >= no_product_flashcate_max) {
        no_product_flashcate_peter.id = 0
    }
    no_product_flashcate_timeid = setTimeout("no_product_flashcate_autoChange()", 5000);
    no_product_flashcate_change_img(no_product_flashcate_peter.id)
}
function no_product_flashcate_start_change() {
    no_product_flashcate_timeid = setTimeout("no_product_flashcate_autoChange()", 5000)
}
function no_product_detailmain_inquiry_submit() {
    $("#no_product_detailmain_pform").submit();
    return false
}
function no_company_intro_ready() {
    $(".no_company_intro").toggle_img({
        show_btn: " .page_box span.picid",
        show_div: " .flpho img.compic",
        active: "cur",
    });
    if ($(".no_company_introV2").length > 0) {
        $(".no_company_introV2").toggle_img({
            show_btn: " .page_box span.picid",
            show_div: " .flpho img.compic",
            active: "cur",
        })
    }
}
function f_error_box_ready(url) {
    return false;
    setTimeout(function () {
        window.location = url
    }, 5000)
}
function n_contact_box_ready() {
    if (typeof changeAction == "undefined") {
        changeAction = function (formname, url) {
            formname.action = url
        }
    }
}
n_contact_box_ready();
function floatAd(floatAd, floatimagesite) {
    var scrollAd = function (floatAd, floatimagesite) {
        if (floatimagesite == 1) {
            var offset = 73 + $(document).scrollTop()
        }
        if (floatimagesite == 2) {
            var offset = $(window).height() - $(floatAd).height() + $(document).scrollTop() - 60
        }
        $(floatAd).animate({top: offset}, {duration: 1000, queue: false})
    };
    scrollAd(floatAd, floatimagesite);
    $(window).scroll(function () {
        scrollAd(floatAd, floatimagesite)
    })
}
function jsWidgetSearch(form, searchLogoUrl, sPrefix) {
    if (typeof sPrefix === "undefined")sPrefix = "buy";
    var keyword = $.trim(form.keyword.value);
    if (keyword == "") {
        alert("keyword not be empty!");
        return false
    } else {
        var newKeyWord = "";
        newKeyWord = keyword.replace(/\s+/g, "_");
        newKeyWord = newKeyWord.replace(/-+/g, "_");
        newKeyWord = newKeyWord.replace(/\//g, "_");
        newKeyWord = newKeyWord.replace(/%/g, "");
        newKeyWord = newKeyWord.replace(/#/g, "");
        newKeyWord = newKeyWord.replace(/&/g, "%26");
        form.action = searchLogoUrl + "/" + sPrefix + "-" + newKeyWord + ".html";
        form.submit()
    }
}
function no_company_factory_general_ready() {
    var prefix = ".no_company_factory_general ";
    var show_btn = $(prefix + ".isho > .but > span.factory ");
    var show_div = $(prefix + ".isho > .confac ");
    show_btn.eq(0).addClass("cur");
    show_div.eq(0).addClass("cur");
    show_btn.mouseover(function () {
        show_btn.removeClass("cur");
        $(this).addClass("cur");
        pos = show_btn.index(this);
        show_div.removeClass("cur");
        show_div.eq(pos).addClass("cur")
    });
    $(".no_company_factory_general .confac").each(function () {
        $(this).toggle_img({
            root: $(this),
            show_btn: ".page span",
            show_div: ".img_wrap img",
            active: "cur",
            relateElement: [".name_td"],
        })
    })
}
function no_contact_main_ready() {
    checknum = function (obj, num, spanid) {
        maxLength = obj.getAttribute("maxlength");
        if (maxLength && obj.value.length > maxLength) {
            obj.value = obj.value.substr(0, maxLength)
        } else {
            obj.value = obj.value.substr(0, num)
        }
        $("#" + spanid).html(obj.value.length)
    };
    jsSubmit = function (form) {
        var message = $(form).find("textarea[name='message']").val();
        if (message == "") {
            alert("Message not be empty!");
            return false
        } else if (message.length > 3000) {
            alert("Sorry,your message is too long!");
            return false
        }
    }
}
function f_inquiry_recommend_ready(homeUrl) {
    quireone = function (pid, productename) {
        var contact_form = document.getElementById("contact_form");
        contact_form.action = homeUrl;
        contact_form.target = "_blank";
        contact_form.pid.value = pid;
        if (productename) {
            contact_form.MESSAGE.value = "I am Interesting " + productename
        } else {
            contact_form.MESSAGE.value = document.getElementById("content").value
        }
        contact_form.submit()
    }
}
function no_contact_detail_ready() {
    jsSubmit = function (form) {
        var message = $(form).find("textarea[name='message']").val();
        if (message == "") {
            alert("Message not be empty!");
            return false
        } else if (message.length > 3000) {
            alert("Sorry,your message is too long!");
            return false
        }
    };
    checknum = function (obj, num, spanid) {
        maxLength = obj.getAttribute("maxlength");
        if (maxLength && obj.value.length > maxLength) {
            obj.value = obj.value.substr(0, maxLength)
        }
        document.getElementById(spanid).innerHTML = obj.value.length
    }
}
function on_product_oricompany_ready(ecConfig) {
    var type = navigator.appName;
    var is_en_browser = 1;
    var lang;
    if (type == "Netscape") {
        if (navigator.languages) {
            lang = navigator.languages;
            lang = lang.join(",")
        } else {
            lang = navigator.language
        }
    } else {
        lang = navigator.browserLanguage
    }
    if (lang.toLowerCase().indexOf("zh") != -1) {
        is_en_browser = 0
    }
    ecConfig.isBrowser = is_en_browser;
    ecConfig.url = getJumpUrl("ppi", ecConfig.url, ecConfig.kw);
    ifr2ec().load(ecConfig)
}
var ifr2ec = function () {
    var obj = {
        load: function (res) {
            $(window).load(function () {
                if (!res || !res.isBrowser || typeof res.url == "undefined" || res.url == "" || res.url == "null") {
                } else {
                    obj.pub(res)
                }
                $("#show_iframe").show();
                if ($("#show_iframe")) {
                    $(document).on("click", "#show_iframe, .delete_wrap", function () {
                        obj.pub(res);
                        $("#visit_ifr_wrap").toggle()
                    })
                }
            })
        }, tpl: function (id, left_pos, div_height, url) {
            if ($("#visit_ifr_wrap" + id).length > 0)return "";
            return ('<div class="visit_ifr_wrap" id="visit_ifr_wrap' + id + '" style="left:' + left_pos + "px; height:" + div_height + 'px; display:none"><div class="top_bar"> <b class="v_wrap">Detail Information</b> <span class="delete_wrap">x</span> </div><img src="/images/waiting.gif" style="position: absolute; z-index:1; left:345px; top:' + div_height / 2 + 'px"><iframe frameborder="0" style="width:715px; left:0; top:30px;position: absolute; z-index:5; height:' + (div_height - 40) + 'px;" src=' + url + " ></iframe></div>")
        }, pub: function (res) {
            if (!res || !res.isBrowser || typeof res.url == "undefined" || res.url == "" || res.url == "null") {
            }
            var left_pos = parseInt($(".cont_main_box")[0].offsetLeft) + 110;
            var div_height = parseInt($(window).height()) > 1 ? $(window).height() - 170 : 768;
            if (typeof res.url == "object" && res.url instanceof Array) {
                for (i in res.url) {
                    var o = res.url[i];
                    for (j in o) {
                        $("body").append(obj.tpl(j, left_pos, div_height, o[j]))
                    }
                }
            } else {
                $("body").append(obj.tpl("", left_pos, div_height, res.url))
            }
        },
    };
    return obj
};
function pcb_t_quick_inquiry_check() {
    $("input[name='email'], input[name='message']").removeClass("alert_tip");
    var email = $("input[name='email']").val();
    var msg = "";
    if (email.length == 0) {
        msg = "email can not be empty";
        alert(msg);
        $("input[name='email']").addClass("alert_tip").focus();
        return false
    }
    var message = $("input[name='message']").val();
    if (message.length == 0) {
        msg = "message can not be empty";
        alert(msg);
        $("input[name='message']").addClass("alert_tip").focus();
        return false
    }
    return true
}
function f_company_video_info() {
}
function no_product_list() {
    if (typeof localData != "undefined") {
        toggle_product_list = function (e) {
            e.closest(".view").find("> span > span").removeClass("ico_cur");
            var btn_params = {
                ico_lv: ["no_product_list_grid", "no_product_list", "/photo/pc", "/photo/pd", "",],
                ico_gv: ["no_product_list", "no_product_list_grid", "/photo/pd", "/photo/pc", "1px",],
            };
            var cur_class = e.attr("class");
            $(".toggle_product_list").removeClass(btn_params[cur_class][0]).addClass(btn_params[cur_class][1]);
            $(".toggle_product_list .item-wrap").each(function () {
                $(this).find("td:eq(1)").css({width: btn_params[cur_class][4]})
            });
            $(".toggle_product_list .item-wrap img").each(function () {
                var replace_src = $(this).attr("src").replace(btn_params[cur_class][2], btn_params[cur_class][3]);
                $(this).attr("src", replace_src)
            });
            e.find("span").addClass("ico_cur");
            localData.set("product_list_view_type", cur_class)
        };
        var default_class_name = "ico_lv";
        if (localData.get("product_list_view_type") != null && localData.get("product_list_view_type") != "undefined") {
            default_class_name = localData.get("product_list_view_type")
        }
        if (default_class_name != "ico_gv") {
            default_class_name = "ico_lv"
        }
        localData.set("product_list_view_type", default_class_name);
        toggle_product_list($("." + default_class_name));
        $(".toggle_product_list .view > span").on("click", function () {
            toggle_product_list($(this))
        })
    }
}
function pcb_no_service_show(showToggleButton) {
    $(".pcb_no_service_show").toggle_img();
    var obj = $(".pcb_no_service_show .product_detailother .details_wrap");
    var objHeight = obj.height();
    var objCssHeight = obj.css("max-height");
    if (parseInt(objHeight) >= parseInt(objCssHeight) && showToggleButton) {
        var toggleBtn = '<div class="toggle-btn"></div>';
        obj.after(toggleBtn)
    }
    $(document).on("click", ".pcb_no_service_show .toggle-btn", function () {
        $(this).toggleClass("arrow-up");
        toggleObjHeight = $(this).hasClass("arrow-up") ? "100%" : "";
        $(this).prev().css("max-height", toggleObjHeight)
    })
}
function pcb_no_equipment_show() {
    $(".pcb_no_equipment_show").each(function () {
        $(this).toggle_img()
    })
}
function pcb_no_capability_show() {
    $(".pcb_no_capability_show").toggle_img()
}
(function ($) {
    $.fn.extend({
        toggle_img: function (p) {
            var default_params = {
                root: ".toggle_img ",
                show_btn: " div.thumb span",
                show_div: " ul.pic_show_list span",
                pos: 0,
                auto: 1,
                active: "active",
                timeout: 1500,
                relateElement: [],
            };
            var params = $.extend({}, default_params, p);
            var show_btn = this.find(params.show_btn);
            var show_div = this.find(params.show_div);
            var pos = params.pos;
            var toggle_count = show_btn.length;
            var auto_play;
            var selectObj = new Array(show_btn, show_div);
            show_btn.mouseover(function () {
                clearTimeout(auto_play);
                pos = show_btn.index(this);
                toggle_dispaly(pos)
            }).mouseout(function () {
                auto_toggle()
            });
            if (params.relateElement.length > 0) {
                $.each(params.relateElement, function (i, item) {
                    if ($(item).length > 0) {
                        var lastObj = item.split(" ").pop();
                        selectObj.push($(item).closest(params.root).find(lastObj))
                    }
                })
            }
            var toggle_dispaly = function (pos) {
                $.each(selectObj, function () {
                    this.removeClass(params.active);
                    this.eq(pos).addClass(params.active)
                })
            };
            var auto_toggle = function () {
                toggle_dispaly(pos);
                if (!params.auto)return;
                pos = pos < toggle_count - 1 ? pos + 1 : 0;
                auto_play = setTimeout(auto_toggle, params.timeout)
            };
            auto_toggle()
        },
    })
})(jQuery);
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xf) << 2);
            out += "=";
            break
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3f)
    }
    return out
}
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c1 == -1);
        if (c1 == -1)break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c2 == -1);
        if (c2 == -1)break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)return out;
            c3 = base64DecodeChars[c3]
        } while (i < len && c3 == -1);
        if (c3 == -1)break;
        out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)return out;
            c4 = base64DecodeChars[c4]
        } while (i < len && c4 == -1);
        if (c4 == -1)break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i)
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
        }
    }
    return out
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                break;
            case 14:
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0));
                break
        }
    }
    return out
}
function jumpUrl(type, url, kw) {
    var tourl = utf8to16(base64decode(url));
    var temp = document.createElement("form");
    if (typeof kw == "undefined") {
        kw = g_ad_kw
    }
    kw = encodeURIComponent(kw);
    var search_domain = utf8to16(base64decode("aHR0cDovL3NlYXJjaC5ldmVyeWNoaW5hLmNvbS8="));
    temp.action = search_domain + type + "/" + kw + "/";
    temp.method = "get";
    temp.style.visibility = "hidden";
    temp.name = "loadConfigPage";
    $(temp).append('<input type="hidden" name="turl" value="' + tourl + '">');
    temp.target = "_blank";
    var pageDiv = $(".cont_header");
    pageDiv[0].appendChild(temp);
    temp.submit()
}
function getJumpUrl(type, url, kw) {
    var tourl = utf8to16(base64decode(url));
    kw = encodeURIComponent(kw);
    var search_domain = utf8to16(base64decode("aHR0cDovL3NlYXJjaC5ldmVyeWNoaW5hLmNvbS8="));
    return search_domain + type + "/" + kw + "/?turl=" + tourl
}
function jumpInquiryUrl(host, pid) {
    var host = utf8to16(base64decode(host));
    var uri = utf8to16(base64decode("L2NvbnRhY3Rub3cuaHRtbA=="));
    var temp = document.createElement("form");
    temp.action = "http://" + host + uri;
    temp.method = "post";
    temp.style.visibility = "hidden";
    temp.name = "loadConfigPage";
    $(temp).append('<input type="hidden" name="pid" value="' + pid + '">');
    temp.target = "_blank";
    var pageDiv = $(".cont_header");
    pageDiv[0].appendChild(temp);
    temp.submit();
    return false
}
function window_open(url) {
    var target = "_blank";
    var open_url = url;
    var tempwindow = window.open(target);
    tempwindow.location = open_url
}
function ZouMa(ul, boxdiv) {
    this.maxLength = 4;
    this.Timer = 3000;
    this.Sleep = 600;
    this.Ul = $(ul);
    var handId;
    var self = this;
    this.Start = function () {
        if (self.Ul.children().length < this.maxLength) {
            self.Ul.append(self.Ul.children().clone())
        }
        handId = setInterval(self.Play, self.Timer)
    };
    this.Play = function () {
        var a = self.Ul.children().eq(0);
        var left = a.children().eq(0).width();
        a.animate({marginLeft: -1 * left + "px",}, self.Sleep, function () {
            $(this).css("margin-left", "auto").appendTo(self.Ul)
        })
    };
    this.Stop = function () {
        clearTimeout(handId);
        handId = 0
    };
    $(boxdiv).hover(function () {
        handId ? self.Stop() : self.Start()
    })
}
function slider($, ChanceToShow, Width) {
    var _SlideshowTransitions = [{$Duration: 1200, $Opacity: 2}];
    var options = {
        $AutoPlay: true,
        $ArrowKeyNavigation: true,
        $DragOrientation: 3,
        $SlideshowOptions: {
            $Class: $JssorSlideshowRunner$,
            $Transitions: _SlideshowTransitions,
            $TransitionsOrder: 1,
            $ShowLink: true,
        },
        $BulletNavigatorOptions: {
            $Class: $JssorBulletNavigator$,
            $ChanceToShow: 2,
            $AutoCenter: 1,
            $SpacingX: 10,
            $SpacingY: 10,
        },
        $ArrowNavigatorOptions: {$Class: $JssorArrowNavigator$, $ChanceToShow: ChanceToShow,},
    };
    var jssor_slider = new $JssorSlider$("slider_container", options);

    function ScaleSlider() {
        var parentWidth = jssor_slider.$Elmt.parentNode.clientWidth;
        if (parentWidth)jssor_slider.$ScaleWidth(Math.min(parentWidth, Width)); else window.setTimeout(ScaleSlider, 30)
    }

    ScaleSlider();
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider)
}
if (typeof g_tp === "undefined") {
    g_tp = ""
}
function f_header_mainseach_selectLanguage(a, event) {
    var div = a.parentNode;

    function get_pos(div) {
        var pos = {left: 0, top: 0};
        while (1) {
            if (!div) {
                break
            }
            pos["left"] += div.offsetLeft;
            pos["top"] += div.offsetTop;
            div = div.offsetParent
        }
        return pos
    }

    var pos = get_pos(div);
    var show = document.getElementById("p_l");
    if (a.className == "col") {
        a.className = "ope";
        show.style.width = 153 + "px";
        show.style.height = "auto";
        show.style.display = "block" || show.attr("display", "block");
        show.style.left = pos["left"] + "px";
        show.style.top = pos["top"] + 20 + "px";
        $(a).closest(".sel").addClass("sel_bg")
    } else {
        a.className = "col";
        show.style.display = "none" || show.attr("display", "none");
        $(a).closest(".sel").removeClass("sel_bg")
    }
}
(function ($) {
    $.fn.slide = function (options) {
        $.fn.slide.defaults = {
            type: "slide",
            effect: "fade",
            autoPlay: false,
            delayTime: 500,
            interTime: 2500,
            triggerTime: 150,
            defaultIndex: 0,
            titCell: ".hd li",
            titNameCell: ".hd li.name",
            mainCell: ".bd",
            targetCell: null,
            trigger: "mouseover",
            scroll: 1,
            vis: 1,
            titOnClassName: "on",
            titNameOnClassName: "show",
            autoPage: false,
            prevCell: ".prev",
            nextCell: ".next",
            pageStateCell: ".pageState",
            opp: false,
            pnLoop: true,
            easing: "swing",
            startFun: null,
            endFun: null,
            switchLoad: null,
            playStateCell: ".playState",
            mouseOverStop: true,
            defaultPlay: true,
            returnDefault: false,
        };
        return this.each(function () {
            var opts = $.extend({}, $.fn.slide.defaults, options);
            var slider = $(this);
            var effect = opts.effect;
            var prevBtn = $(opts.prevCell, slider);
            var nextBtn = $(opts.nextCell, slider);
            var pageState = $(opts.pageStateCell, slider);
            var playState = $(opts.playStateCell, slider);
            var navObj = $(opts.titCell, slider);
            var navObjTag = $(opts.titNameCell, slider);
            var navObjSize = navObj.size();
            var conBox = $(opts.mainCell, slider);
            var conBoxSize = conBox.children().size();
            var sLoad = opts.switchLoad;
            var tarObj = $(opts.targetCell, slider);
            var index = parseInt(opts.defaultIndex);
            var delayTime = parseInt(opts.delayTime);
            var interTime = parseInt(opts.interTime);
            var triggerTime = parseInt(opts.triggerTime);
            var scroll = parseInt(opts.scroll);
            var vis = parseInt(opts.vis);
            var itemcustom = opts.itemcustom == undefined ? [] : opts.itemcustom;
            var autoPlay = opts.autoPlay == "false" || opts.autoPlay == false ? false : true;
            var opp = opts.opp == "false" || opts.opp == false ? false : true;
            var autoPage = opts.autoPage == "false" || opts.autoPage == false ? false : true;
            var pnLoop = opts.pnLoop == "false" || opts.pnLoop == false ? false : true;
            var mouseOverStop = opts.mouseOverStop == "false" || opts.mouseOverStop == false ? false : true;
            var defaultPlay = opts.defaultPlay == "false" || opts.defaultPlay == false ? false : true;
            var returnDefault = opts.returnDefault == "false" || opts.returnDefault == false ? false : true;
            var slideH = 0;
            var slideW = 0;
            var selfW = 0;
            var selfH = 0;
            var easing = opts.easing;
            var inter = null;
            var mst = null;
            var rtnST = null;
            var titOn = opts.titOnClassName;
            var titNameOn = opts.titNameOnClassName;
            var onIndex = navObj.index(slider.find("." + titOn));
            var oldIndex = (index = onIndex == -1 ? index : onIndex);
            var defaultIndex = index;
            var _ind = index;
            var cloneNum = conBoxSize >= vis ? conBoxSize % scroll != 0 ? conBoxSize % scroll : scroll : 0;
            var _tar;
            var isMarq = effect == "leftMarquee" || effect == "topMarquee" ? true : false;
            var doStartFun = function () {
                if ($.isFunction(opts.startFun)) {
                    opts.startFun(index, navObjSize, slider, $(opts.titCell, slider), conBox, tarObj, prevBtn, nextBtn)
                }
            };
            var doEndFun = function () {
                if ($.isFunction(opts.endFun)) {
                    opts.endFun(index, navObjSize, slider, $(opts.titCell, slider), conBox, tarObj, prevBtn, nextBtn)
                }
            };
            var resetOn = function () {
                navObj.removeClass(titOn);
                navObjTag.removeClass(titNameOn);
                if (defaultPlay) {
                    navObj.eq(defaultIndex).addClass(titOn);
                    navObjTag.eq(defaultIndex).addClass(titNameOn)
                }
            };
            if (opts.type == "menu") {
                if (defaultPlay) {
                    navObj.removeClass(titOn).eq(index).addClass(titOn);
                    navObjTag.removeClass(titNameOn).eq(index).addClass(titNameOn)
                }
                navObj.hover(function () {
                    _tar = $(this).find(opts.targetCell);
                    var hoverInd = navObj.index($(this));
                    mst = setTimeout(function () {
                        index = hoverInd;
                        navObj.removeClass(titOn).eq(index).addClass(titOn);
                        navObjTag.removeClass(titNameOn).eq(index).addClass(titNameOn);
                        doStartFun();
                        switch (effect) {
                            case"fade":
                                _tar.stop(true, true).animate({opacity: "show"}, delayTime, easing, doEndFun);
                                break;
                            case"slideDown":
                                _tar.stop(true, true).animate({height: "show"}, delayTime, easing, doEndFun);
                                break
                        }
                    }, opts.triggerTime)
                }, function () {
                    clearTimeout(mst);
                    switch (effect) {
                        case"fade":
                            _tar.animate({opacity: "hide"}, delayTime, easing);
                            break;
                        case"slideDown":
                            _tar.animate({height: "hide"}, delayTime, easing);
                            break
                    }
                });
                if (returnDefault) {
                    slider.hover(function () {
                        clearTimeout(rtnST)
                    }, function () {
                        rtnST = setTimeout(resetOn, delayTime)
                    })
                }
                return
            }
            if (navObjSize == 0)navObjSize = conBoxSize;
            if (isMarq)navObjSize = 2;
            if (autoPage) {
                if (conBoxSize >= vis) {
                    if (effect == "leftLoop" || effect == "topLoop") {
                        navObjSize = conBoxSize % scroll != 0 ? ((conBoxSize / scroll) ^ 0) + 1 : conBoxSize / scroll
                    } else {
                        var tempS = conBoxSize - vis;
                        navObjSize = 1 + parseInt(tempS % scroll != 0 ? tempS / scroll + 1 : tempS / scroll);
                        if (navObjSize <= 0)navObjSize = 1
                    }
                } else {
                    navObjSize = 1
                }
                navObj.html("");
                var str = "";
                if (opts.autoPage == true || opts.autoPage == "true") {
                    for (var i = 0; i < navObjSize; i++) {
                        str += "<li></li>"
                    }
                } else {
                    for (var i = 0; i < navObjSize; i++) {
                        str += opts.autoPage.replace("$", i + 1)
                    }
                }
                if (itemcustom.length > 1) {
                    str = "";
                    for (x in itemcustom) {
                        str += "<li><span>" + itemcustom[x] + "</span></li>"
                    }
                }
                navObj.html(str);
                var navObj = navObj.children()
            }
            if (conBoxSize >= vis) {
                conBox.children().each(function () {
                    if ($(this).width() > selfW) {
                        selfW = $(this).width();
                        slideW = $(this).outerWidth(true)
                    }
                    if ($(this).height() > selfH) {
                        selfH = $(this).height();
                        slideH = $(this).outerHeight(true)
                    }
                });
                var _chr = conBox.children();
                var cloneEle = function () {
                    for (var i = 0; i < vis; i++) {
                        _chr.eq(i).clone().addClass("clone").appendTo(conBox)
                    }
                    for (var i = 0; i < cloneNum; i++) {
                        _chr.eq(conBoxSize - i - 1).clone().addClass("clone").prependTo(conBox)
                    }
                };
                switch (effect) {
                    case"fold":
                        conBox.css({
                            position: "relative",
                            width: slideW,
                            height: slideH
                        }).children().css({position: "absolute", width: selfW, left: 0, top: 0, display: "none",});
                        break;
                    case"top":
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden;position:relative;height:' + vis * slideH + 'px"></div>').css({
                            top: -(index * scroll) * slideH,
                            position: "relative",
                            padding: "0",
                            margin: "0",
                        }).children().css({height: selfH});
                        break;
                    case"left":
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden;position:relative;width:' + vis * slideW + 'px"></div>').css({
                            width: conBoxSize * slideW,
                            left: -(index * scroll) * slideW,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0",
                        }).children().css({float: "left", width: selfW});
                        break;
                    case"right":
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden;position:relative;width:' + vis * slideW + 'px"></div>').css({
                            width: conBoxSize * slideW,
                            left: index * scroll * slideW,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0",
                        }).children().css({float: "left", width: selfW});
                        break;
                    case"leftLoop":
                    case"leftMarquee":
                        cloneEle();
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden;position:relative;width:' + vis * slideW + 'px"></div>').css({
                            width: (conBoxSize + vis + cloneNum) * slideW,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0",
                            left: -(cloneNum + index * scroll) * slideW,
                        }).children().css({float: "left", width: selfW});
                        break;
                    case"topLoop":
                    case"topMarquee":
                        cloneEle();
                        conBox.wrap('<div class="tempWrap" style="overflow:hidden;position:relative;height:' + vis * slideH + 'px"></div>').css({
                            height: (conBoxSize + vis + cloneNum) * slideH,
                            position: "relative",
                            padding: "0",
                            margin: "0",
                            top: -(cloneNum + index * scroll) * slideH,
                        }).children().css({height: selfH});
                        break
                }
            }
            var scrollNum = function (ind) {
                var _tempCs = ind * scroll;
                if (ind == navObjSize) {
                    _tempCs = conBoxSize
                } else if (ind == -1 && conBoxSize % scroll != 0) {
                    _tempCs = -conBoxSize % scroll
                }
                return _tempCs
            };
            var doSwitchLoad = function (objs) {
                var changeImg = function (t) {
                    for (var i = t; i < vis + t; i++) {
                        objs.eq(i).find("img[" + sLoad + "]").each(function () {
                            var _this = $(this);
                            _this.attr("src", _this.attr(sLoad)).removeAttr(sLoad);
                            if (conBox.find(".clone")[0]) {
                                var chir = conBox.children();
                                for (var j = 0; j < chir.size(); j++) {
                                    chir.eq(j).find("img[" + sLoad + "]").each(function () {
                                        if ($(this).attr(sLoad) == _this.attr("src"))$(this).attr("src", $(this).attr(sLoad)).removeAttr(sLoad)
                                    })
                                }
                            }
                        })
                    }
                };
                switch (effect) {
                    case"fade":
                    case"fold":
                    case"top":
                    case"left":
                    case"right":
                    case"slideDown":
                        changeImg(index * scroll);
                        break;
                    case"leftLoop":
                    case"topLoop":
                        changeImg(cloneNum + scrollNum(_ind));
                        break;
                    case"leftMarquee":
                    case"topMarquee":
                        var curS = effect == "leftMarquee" ? conBox.css("left").replace("px", "") : conBox.css("top").replace("px", "");
                        var slideT = effect == "leftMarquee" ? slideW : slideH;
                        var mNum = cloneNum;
                        if (curS % slideT != 0) {
                            var curP = Math.abs((curS / slideT) ^ 0);
                            if (index == 1) {
                                mNum = cloneNum + curP
                            } else {
                                mNum = cloneNum + curP - 1
                            }
                        }
                        changeImg(mNum);
                        break
                }
            };
            var doPlay = function (init) {
                if (defaultPlay && oldIndex == index && !init && !isMarq)return;
                if (isMarq) {
                    if (index >= 1) {
                        index = 1
                    } else if (index <= 0) {
                        index = 0
                    }
                } else {
                    _ind = index;
                    if (index >= navObjSize) {
                        index = 0
                    } else if (index < 0) {
                        index = navObjSize - 1
                    }
                }
                doStartFun();
                if (sLoad != null) {
                    doSwitchLoad(conBox.children())
                }
                if (tarObj[0]) {
                    _tar = tarObj.eq(index);
                    if (sLoad != null) {
                        doSwitchLoad(tarObj)
                    }
                    if (effect == "slideDown") {
                        tarObj.not(_tar).stop(true, true).slideUp(delayTime);
                        _tar.slideDown(delayTime, easing, function () {
                            if (!conBox[0])doEndFun()
                        })
                    } else {
                        tarObj.not(_tar).stop(true, true).hide();
                        _tar.animate({opacity: "show"}, delayTime, function () {
                            if (!conBox[0])doEndFun()
                        })
                    }
                }
                if (conBoxSize >= vis) {
                    switch (effect) {
                        case"fade":
                            conBox.children().stop(true, true).eq(index).animate({opacity: "show"}, delayTime, easing, function () {
                                doEndFun()
                            }).siblings().hide();
                            break;
                        case"fold":
                            conBox.children().stop(true, true).eq(index).animate({opacity: "show"}, delayTime, easing, function () {
                                doEndFun()
                            }).siblings().animate({opacity: "hide"}, delayTime, easing);
                            break;
                        case"top":
                            conBox.stop(true, false).animate({top: -index * scroll * slideH}, delayTime, easing, function () {
                                doEndFun()
                            });
                            break;
                        case"left":
                            conBox.stop(true, false).animate({left: -index * scroll * slideW}, delayTime, easing, function () {
                                doEndFun()
                            });
                            break;
                        case"right":
                            conBox.stop(true, false).animate({left: index * scroll * slideW}, delayTime, easing, function () {
                                doEndFun()
                            });
                            break;
                        case"leftLoop":
                            var __ind = _ind;
                            conBox.stop(true, true).animate({left: -(scrollNum(_ind) + cloneNum) * slideW}, delayTime, easing, function () {
                                if (__ind <= -1) {
                                    conBox.css("left", -(cloneNum + (navObjSize - 1) * scroll) * slideW)
                                } else if (__ind >= navObjSize) {
                                    conBox.css("left", -cloneNum * slideW)
                                }
                                doEndFun()
                            });
                            break;
                        case"topLoop":
                            var __ind = _ind;
                            conBox.stop(true, true).animate({top: -(scrollNum(_ind) + cloneNum) * slideH}, delayTime, easing, function () {
                                if (__ind <= -1) {
                                    conBox.css("top", -(cloneNum + (navObjSize - 1) * scroll) * slideH)
                                } else if (__ind >= navObjSize) {
                                    conBox.css("top", -cloneNum * slideH)
                                }
                                doEndFun()
                            });
                            break;
                        case"leftMarquee":
                            var tempLeft = conBox.css("left").replace("px", "");
                            if (index == 0) {
                                conBox.animate({left: ++tempLeft}, 0, function () {
                                    if (conBox.css("left").replace("px", "") >= 0) {
                                        conBox.css("left", -conBoxSize * slideW)
                                    }
                                })
                            } else {
                                conBox.animate({left: --tempLeft}, 0, function () {
                                    if (conBox.css("left").replace("px", "") <= -(conBoxSize + cloneNum) * slideW) {
                                        conBox.css("left", -cloneNum * slideW)
                                    }
                                })
                            }
                            break;
                        case"topMarquee":
                            var tempTop = conBox.css("top").replace("px", "");
                            if (index == 0) {
                                conBox.animate({top: ++tempTop}, 0, function () {
                                    if (conBox.css("top").replace("px", "") >= 0) {
                                        conBox.css("top", -conBoxSize * slideH)
                                    }
                                })
                            } else {
                                conBox.animate({top: --tempTop}, 0, function () {
                                    if (conBox.css("top").replace("px", "") <= -(conBoxSize + cloneNum) * slideH) {
                                        conBox.css("top", -cloneNum * slideH)
                                    }
                                })
                            }
                            break
                    }
                }
                navObj.removeClass(titOn).eq(index).addClass(titOn);
                navObjTag.removeClass(titNameOn).eq(index).addClass(titNameOn);
                oldIndex = index;
                if (!pnLoop) {
                    nextBtn.removeClass("nextStop");
                    prevBtn.removeClass("prevStop");
                    if (index == 0) {
                        prevBtn.addClass("prevStop")
                    }
                    if (index == navObjSize - 1) {
                        nextBtn.addClass("nextStop")
                    }
                }
                pageState.html("<span>" + (index + 1) + "</span>/" + navObjSize)
            };
            if (defaultPlay) {
                doPlay(true)
            }
            if (returnDefault) {
                slider.hover(function () {
                    clearTimeout(rtnST)
                }, function () {
                    rtnST = setTimeout(function () {
                        index = defaultIndex;
                        if (defaultPlay) {
                            doPlay()
                        } else {
                            if (effect == "slideDown") {
                                _tar.slideUp(delayTime, resetOn)
                            } else {
                                _tar.animate({opacity: "hide"}, delayTime, resetOn)
                            }
                        }
                        oldIndex = index
                    }, 300)
                })
            }
            var setInter = function (time) {
                inter = setInterval(function () {
                    opp ? index-- : index++;
                    doPlay()
                }, !!time ? time : interTime)
            };
            var setMarInter = function (time) {
                inter = setInterval(doPlay, !!time ? time : interTime)
            };
            var resetInter = function () {
                if (!mouseOverStop) {
                    clearInterval(inter);
                    setInter()
                }
            };
            var nextTrigger = function () {
                if (pnLoop || index != navObjSize - 1) {
                    index++;
                    doPlay();
                    if (!isMarq)resetInter()
                }
            };
            var prevTrigger = function () {
                if (pnLoop || index != 0) {
                    index--;
                    doPlay();
                    if (!isMarq)resetInter()
                }
            };
            var playStateFun = function () {
                clearInterval(inter);
                isMarq ? setMarInter() : setInter();
                playState.removeClass("pauseState")
            };
            var pauseStateFun = function () {
                clearInterval(inter);
                playState.addClass("pauseState")
            };
            if (autoPlay) {
                if (isMarq) {
                    opp ? index-- : index++;
                    setMarInter();
                    if (mouseOverStop)conBox.hover(pauseStateFun, playStateFun)
                } else {
                    setInter();
                    if (mouseOverStop)slider.hover(pauseStateFun, playStateFun)
                }
            } else {
                if (isMarq) {
                    opp ? index-- : index++
                }
                playState.addClass("pauseState")
            }
            playState.click(function () {
                playState.hasClass("pauseState") ? playStateFun() : pauseStateFun()
            });
            if (opts.trigger == "mouseover") {
                navObj.hover(function () {
                    var hoverInd = navObj.index(this);
                    mst = setTimeout(function () {
                        index = hoverInd;
                        doPlay();
                        resetInter()
                    }, opts.triggerTime)
                }, function () {
                    clearTimeout(mst)
                })
            } else {
                navObj.click(function () {
                    index = navObj.index(this);
                    doPlay();
                    resetInter()
                })
            }
            if (isMarq) {
                nextBtn.mousedown(nextTrigger);
                prevBtn.mousedown(prevTrigger);
                if (pnLoop) {
                    var st;
                    var marDown = function () {
                        st = setTimeout(function () {
                            clearInterval(inter);
                            setMarInter((interTime / 10) ^ 0)
                        }, 150)
                    };
                    var marUp = function () {
                        clearTimeout(st);
                        clearInterval(inter);
                        setMarInter()
                    };
                    nextBtn.mousedown(marDown);
                    nextBtn.mouseup(marUp);
                    prevBtn.mousedown(marDown);
                    prevBtn.mouseup(marUp)
                }
                if (opts.trigger == "mouseover") {
                    nextBtn.hover(nextTrigger, function () {
                    });
                    prevBtn.hover(prevTrigger, function () {
                    })
                }
            } else {
                nextBtn.click(nextTrigger);
                prevBtn.click(prevTrigger)
            }
        })
    }
})(jQuery);
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad", swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    }, easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b
    }, easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    }, easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b
    }, easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    }, easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    }, easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return (c / 2) * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t + 2) + b
    }, easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    }, easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
    }, easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return (c / 2) * t * t * t * t + b;
        return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
    }, easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    }, easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    }, easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return (c / 2) * t * t * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
    }, easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
    }, easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin((t / d) * (Math.PI / 2)) + b
    }, easeInOutSine: function (x, t, b, c, d) {
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
    }, easeInExpo: function (x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    }, easeOutExpo: function (x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
    }, easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0)return b;
        if (t == d)return b + c;
        if ((t /= d / 2) < 1)return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
    }, easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    }, easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    }, easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1)return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
        return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    }, easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)return b;
        if ((t /= d) == 1)return b + c;
        if (!p)p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
        return (-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b)
    }, easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)return b;
        if ((t /= d) == 1)return b + c;
        if (!p)p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b)
    }, easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)return b;
        if ((t /= d / 2) == 2)return b + c;
        if (!p)p = d * (0.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
        if (t < 1)return (-0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b);
        return (a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b)
    }, easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined)s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    }, easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined)s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    }, easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined)s = 1.70158;
        if ((t /= d / 2) < 1)return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    }, easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    }, easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
        }
    }, easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2)return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
        return (jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b)
    },
});
(function ($) {
    $.fn.touchSlider = function (settings) {
        settings.supportsCssTransitions = (function (style) {
            var prefixes = ["Webkit", "Moz", "Ms"];
            for (var i = 0, l = prefixes.length; i < l; i++) {
                if (typeof style[prefixes[i] + "Transition"] !== "undefined") {
                    return true
                }
            }
            return false
        })(document.createElement("div").style);
        settings = jQuery.extend({
            roll: true,
            flexible: false,
            btn_prev: null,
            btn_next: null,
            paging: null,
            speed: 75,
            view: 1,
            range: 0.15,
            page: 1,
            transition: false,
            initComplete: null,
            counter: null,
            tgwidth: 0,
            itemwidth: 0,
            multi: false,
        }, settings);
        var opts = [];
        opts = $.extend({}, $.fn.touchSlider.defaults, settings);
        return this.each(function () {
            $.fn.extend(this, touchSlider);
            var _this = this;
            this.opts = opts;
            this._view = this.opts.view;
            this._speed = this.opts.speed;
            this._tg = $(this);
            this._list = this._tg.children().children();
            this._width = this.opts.tgwidth > 0 ? this.opts.tgwidth : parseInt(this._tg.css("width"));
            this._item_w = this.opts.itemwidth > 0 ? this.opts.itemwidth : parseInt(this._list.css("width"));
            this._len = this._list.length;
            this._range = this.opts.range * this._width;
            this._pos = [];
            this._start = [];
            this._startX = 0;
            this._startY = 0;
            this._left = 0;
            this._top = 0;
            this._drag = false;
            this._scroll = false;
            this._btn_prev;
            this._btn_next;
            this.init();
            $(this).bind("touchstart", this.touchstart).bind("touchmove", this.touchmove).bind("touchend", this.touchend).bind("dragstart", this.touchstart).bind("drag", this.touchmove).bind("dragend", this.touchend);
            $(window).bind("orientationchange resize", function () {
                _this.resize(_this)
            })
        })
    };
    var touchSlider = {
        init: function () {
            var _this = this;
            $(this).children().css({width: this._width + "px", overflow: "visible",});
            if (this.opts.flexible)this._item_w = this._width / this._view;
            if (this.opts.roll)this._len = Math.ceil(this._len / this._view) * this._view;
            var page_gap = this.opts.page > 1 && this.opts.page <= this._len ? (this.opts.page - 1) * this._item_w : 0;
            for (var i = 0; i < this._len; ++i) {
                this._pos[i] = this._item_w * i - page_gap;
                this._start[i] = this._pos[i];
                this._list.eq(i).css({
                    float: "none",
                    display: "block",
                    position: "absolute",
                    top: "0",
                    left: this._pos[i] + "px",
                    width: this._item_w + "px",
                });
                if (this.opts.supportsCssTransitions && this.opts.transition) {
                    this._list.eq(i).css({
                        "-moz-transition": "0ms",
                        "-moz-transform": "",
                        "-ms-transition": "0ms",
                        "-ms-transform": "",
                        "-webkit-transition": "0ms",
                        "-webkit-transform": "",
                        transition: "0ms",
                        transform: "",
                    })
                }
            }
            if (this.opts.btn_prev && this.opts.btn_next) {
                this.opts.btn_prev.bind("click", function () {
                    _this.animate(1, true);
                    return false
                });
                this.opts.btn_next.bind("click", function () {
                    _this.animate(-1, true);
                    return false
                })
            }
            if (this.opts.paging) {
                $(this._list).each(function (i, el) {
                    var btn_page = _this.opts.paging.eq(i);
                    btn_page.bind("click", function (e) {
                        _this.go_page(i, e);
                        return false
                    })
                })
            }
            this.counter();
            this.initComplete()
        }, initComplete: function () {
            if (typeof this.opts.initComplete == "function") {
                this.opts.initComplete(this)
            }
        }, resize: function (e) {
            if (e.opts.flexible) {
                var tmp_w = e._item_w;
                e._width = parseInt(e._tg.css("width"));
                e._item_w = e._width / e._view;
                e._range = e.opts.range * e._width;
                for (var i = 0; i < e._len; ++i) {
                    e._pos[i] = (e._pos[i] / tmp_w) * e._item_w;
                    e._start[i] = (e._start[i] / tmp_w) * e._item_w;
                    e._list.eq(i).css({left: e._pos[i] + "px", width: e._item_w + "px",});
                    if (this.opts.supportsCssTransitions && this.opts.transition) {
                        e._list.eq(i).css({
                            "-moz-transition": "0ms",
                            "-moz-transform": "",
                            "-ms-transition": "0ms",
                            "-ms-transform": "",
                            "-webkit-transition": "0ms",
                            "-webkit-transform": "",
                            transition: "0ms",
                            transform: "",
                        })
                    }
                }
            }
            this.counter()
        }, touchstart: function (e) {
            if ((e.type == "touchstart" && e.originalEvent.touches.length <= 1) || e.type == "dragstart") {
                this._startX = e.pageX || e.originalEvent.touches[0].pageX;
                this._startY = e.pageY || e.originalEvent.touches[0].pageY;
                this._scroll = false;
                this._start = [];
                for (var i = 0; i < this._len; ++i) {
                    this._start[i] = this._pos[i]
                }
            }
        }, touchmove: function (e) {
            if ((e.type == "touchmove" && e.originalEvent.touches.length <= 1) || e.type == "drag") {
                this._left = (e.pageX || e.originalEvent.touches[0].pageX) - this._startX;
                this._top = (e.pageY || e.originalEvent.touches[0].pageY) - this._startY;
                var w = this._left < 0 ? this._left * -1 : this._left;
                var h = this._top < 0 ? this._top * -1 : this._top;
                if (w < h || this._scroll) {
                    this._left = 0;
                    this._drag = false;
                    this._scroll = true
                } else {
                    e.preventDefault();
                    this._drag = true;
                    this._scroll = false;
                    this.position(e)
                }
                for (var i = 0; i < this._len; ++i) {
                    var tmp = this._start[i] + this._left;
                    if (this.opts.supportsCssTransitions && this.opts.transition) {
                        var trans = "translate3d(" + tmp + "px,0,0)";
                        this._list.eq(i).css({
                            left: "",
                            "-moz-transition": "0ms",
                            "-moz-transform": trans,
                            "-ms-transition": "0ms",
                            "-ms-transform": trans,
                            "-webkit-transition": "0ms",
                            "-webkit-transform": trans,
                            transition: "0ms",
                            transform: trans,
                        })
                    } else {
                        this._list.eq(i).css("left", tmp + "px")
                    }
                    this._pos[i] = tmp
                }
            }
        }, touchend: function (e) {
            if ((e.type == "touchend" && e.originalEvent.touches.length <= 1) || e.type == "dragend") {
                if (this._scroll) {
                    this._drag = false;
                    this._scroll = false;
                    return false
                }
                this.animate(this.direction());
                this._drag = false;
                this._scroll = false
            }
        }, position: function (d) {
            var gap = this._view * this._item_w;
            if (d == -1 || d == 1) {
                this._startX = 0;
                this._start = [];
                for (var i = 0; i < this._len; ++i) {
                    this._start[i] = this._pos[i]
                }
                this._left = d * gap
            } else {
                if (this._left > gap)this._left = gap;
                if (this._left < -gap)this._left = -gap
            }
            if (this.opts.roll) {
                var tmp_pos = [];
                for (var i = 0; i < this._len; ++i) {
                    tmp_pos[i] = this._pos[i]
                }
                tmp_pos.sort(function (a, b) {
                    return a - b
                });
                var max_chk = tmp_pos[this._len - this._view];
                var p_min = $.inArray(tmp_pos[0], this._pos);
                var p_max = $.inArray(max_chk, this._pos);
                if (this._view <= 1)max_chk = this._len - 1;
                if (this.opts.multi) {
                    if ((d == 1 && tmp_pos[0] >= 0) || (this._drag && tmp_pos[0] >= 100)) {
                        for (var i = 0; i < this._view; ++i, ++p_min, ++p_max) {
                            this._start[p_max] = this._start[p_min] - gap;
                            this._list.eq(p_max).css("left", this._start[p_max] + "px")
                        }
                    } else if ((d == -1 && tmp_pos[0] <= 0) || (this._drag && tmp_pos[0] <= -100)) {
                        for (var i = 0; i < this._view; ++i, ++p_min, ++p_max) {
                            this._start[p_min] = this._start[p_max] + gap;
                            this._list.eq(p_min).css("left", this._start[p_min] + "px")
                        }
                    }
                } else {
                    if ((d == 1 && tmp_pos[0] >= 0) || (this._drag && tmp_pos[0] > 0)) {
                        for (var i = 0; i < this._view; ++i, ++p_min, ++p_max) {
                            this._start[p_max] = this._start[p_min] - gap;
                            this._list.eq(p_max).css("left", this._start[p_max] + "px")
                        }
                    } else if ((d == -1 && tmp_pos[max_chk] <= 0) || (this._drag && tmp_pos[max_chk] <= 0)) {
                        for (var i = 0; i < this._view; ++i, ++p_min, ++p_max) {
                            this._start[p_min] = this._start[p_max] + gap;
                            this._list.eq(p_min).css("left", this._start[p_min] + "px")
                        }
                    }
                }
            } else {
                if (this.limit_chk())this._left = this._left / 2
            }
        }, animate: function (d, btn_click) {
            if (this._drag || !this._scroll || btn_click) {
                var _this = this;
                var speed = this._speed;
                if (btn_click)this.position(d);
                var gap = d * (this._item_w * this._view);
                if (this._left == 0 || (!this.opts.roll && this.limit_chk()))gap = 0;
                this._list.each(function (i, el) {
                    _this._pos[i] = _this._start[i] + gap;
                    if (_this.opts.supportsCssTransitions && _this.opts.transition) {
                        var transition = speed + "ms";
                        var transform = "translate3d(" + _this._pos[i] + "px,0,0)";
                        if (btn_click)transition = "0ms";
                        $(this).css({
                            left: "",
                            "-moz-transition": transition,
                            "-moz-transform": transform,
                            "-ms-transition": transition,
                            "-ms-transform": transform,
                            "-webkit-transition": transition,
                            "-webkit-transform": transform,
                            transition: transition,
                            transform: transform,
                        })
                    } else {
                        $(this).stop();
                        $(this).animate({left: _this._pos[i] + "px"}, speed)
                    }
                });
                this.counter()
            }
        }, direction: function () {
            var r = 0;
            if (this._left < -this._range)r = -1; else if (this._left > this._range)r = 1;
            if (!this._drag || this._scroll)r = 0;
            return r
        }, limit_chk: function () {
            var last_p = parseInt((this._len - 1) / this._view) * this._view;
            return ((this._start[0] == 0 && this._left > 0) || (this._start[last_p] == 0 && this._left < 0))
        }, go_page: function (i, e) {
            var crt = $.inArray(0, this._pos) / this._view + 1;
            var cal = crt - (i + 1);
            while (cal != 0) {
                if (cal < 0) {
                    this.animate(-1, true);
                    cal++
                } else if (cal > 0) {
                    this.animate(1, true);
                    cal--
                }
            }
        }, counter: function () {
            if (typeof this.opts.counter == "function") {
                var param = {
                    total: Math.ceil(this._len / this._view),
                    current: $.inArray(0, this._pos) / this._view + 1,
                };
                this.opts.counter(param)
            }
        },
    }
})(jQuery);
function f_headmenucur() {
    $("#head_menu").find("li").removeClass("cur");
    $("#head_menu").find("dt").removeClass("cur");
    if (typeof query_string != "undefined" && query_string != "") {
        if (query_string[0] == "Products") {
            if (query_string[1] == "Detail") {
                if ($("#headProductsDetail").length > 0) {
                    var ptype = $("#headProductsDetail").attr("ptype");
                    if (typeof query_string[2] != "undefined" && typeof ptype != "undefined" && query_string[2] == ptype) {
                        $("#headProductsDetail").addClass("cur")
                    } else {
                        $("#headProducts").addClass("cur");
                        $("#productLi").addClass("cur")
                    }
                } else {
                    $("#headProducts").addClass("cur");
                    $("#productLi").addClass("cur")
                }
            } else {
                $("#headProducts").addClass("cur");
                $("#productLi").addClass("cur")
            }
        } else if (query_string[0] == "Company" && query_string[1] == "Company") {
            $("#headAboutUs").addClass("cur")
        } else if (query_string[0] == "Company" && query_string[1] == "Factory") {
            $("#headFactorytour").addClass("cur")
        } else if (query_string[0] == "Company" && query_string[1] == "Quality") {
            $("#headQualityControl").addClass("cur")
        } else if (query_string[0] == "Company" && query_string[1] == "ContactUs") {
            $("#headContactUs").addClass("cur")
        } else if (query_string[0] == "News") {
            if (query_string[1] == "Detail") {
                if ($("#headNewsDetail").length > 0) {
                    var newsId = $("#headNewsDetail").attr("newsId");
                    if (typeof query_string[2] != "undefined" && typeof newsId != "undefined" && query_string[2] == newsId) {
                        $("#headNewsDetail").addClass("cur")
                    } else {
                        $("#headNewsList").addClass("cur")
                    }
                } else {
                    $("#headNewsList").addClass("cur")
                }
            } else {
                $("#headNewsList").addClass("cur")
            }
        } else if (query_string[0] == "Cases") {
            $("#headCasesList").addClass("cur")
        } else if (query_string[0] == "Index" && query_string[1] == "TechnicalService") {
            $("#headTechnicalService").addClass("cur")
        } else if (query_string[0] == "Index" && query_string[1] == "EasySourcing") {
            $("#headEasySourcing").addClass("cur")
        } else {
            $("#headHome").addClass("cur")
        }
    }
}
var webim_config = {
    path: "/webim/",
    selector: "button[chatnow]",
    title_info: "Chat with Supplier",
    title_chat: "Chat with Supplier",
    getseller: "/getseller.html",
    device: 0,
    getpinfo: function (selector) {
        return {
            type: $(selector).attr("type"),
            pid: $(selector).attr("pid"),
            pname: $(selector).attr("pname"),
            purl: $(selector).attr("purl"),
            picurl: $(selector).attr("picurl"),
        }
    },
    getlancontent: function (selector) {
        return $(selector).attr("lancontent")
    },
};
function onClickVideo(videoSrc, url) {
    window.localStorage.setItem("videoSrc", videoSrc);
    setTimeout(function () {
        window.open(url, "newwindow", "height=500, width=900, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
    }, 300)
}
function pmdproducts() {
    var moreProducts = document.getElementsByClassName("more_products");
    Array.prototype.slice.call(moreProducts).forEach(function (item) {
        var lists = item.getElementsByClassName("lists")[0].children;
        var recordIndex = 0;
        var intervalId = null;
        var play = function () {
            for (var i = 0; i < lists.length; i++) {
                lists[i].className = "";
                if (recordIndex === i) {
                    lists[i].className = "current"
                }
            }
        };
        var intervalFun = function () {
            recordIndex++;
            if (recordIndex >= lists.length) {
                recordIndex = 0
            }
            play()
        };
        intervalId = setInterval(intervalFun, 3000);
        item.addEventListener("mouseover", function () {
            clearInterval(intervalId)
        });
        item.addEventListener("mouseout", function () {
            intervalId = setInterval(intervalFun, 3000)
        })
    })
}
function setwebimCookie(uid, pid, type) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = "webim_type=" + escape(type) + ";expires=" + exp.toGMTString();
    document.cookie = "webim_uid=" + escape(uid) + ";expires=" + exp.toGMTString();
    document.cookie = "webim_pid=" + escape(pid) + ";expires=" + exp.toGMTString()
}
(function ($) {
    if (typeof query_string != "undefined" && query_string != "" && query_string[0].toLowerCase() == "index" && query_string[1].toLowerCase() == "index") {
        if ($("#pmdproductsList").length != 0) {
            pmdproducts()
        }
    }
    $("[name=message]").on("blur", function () {
        chenckForm(".f_footer_three_news_simp")
    });
    $("[name=email]").on("blur", function () {
        chenckForm(".f_footer_three_news_simp")
    });
    chenckForm = function (self) {
        var message = $(self).find("[name=message]").val();
        var email = $(self).find("[name=email]").val();
        if (email === undefined) {
            $(self).find("[name=email]").css("border", "1px solid red");
            return false
        }
        if (message === undefined) {
            $(self).find("[name=message]").css("border", "1px solid red");
            return false
        }
        if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1) {
            $(self).find("[name=email]").css("border", "1px solid red");
            return false
        } else {
            $(self).find("[name=email]").css("border", "")
        }
        if (message.length <= 5) {
            $(self).find("[name=message]").css("border", "1px solid red");
            return false
        } else {
            $(self).find("[name=message]").css("border", "")
        }
        return true
    }
})(jQuery);
jQuery.fn.extend({
    delayLoading: function (a) {
        function g(d) {
            var b, c;
            if (a.container === undefined || a.container === window) {
                b = $(window).scrollTop();
                c = $(window).height() + $(window).scrollTop()
            } else {
                b = $(a.container).offset().top;
                c = $(a.container).offset().top + $(a.container).height()
            }
            return (d.offset().top + d.height() + a.beforehand >= b && c >= d.offset().top - a.beforehand)
        }

        function h(d) {
            var b, c;
            if (a.container === undefined || a.container === window) {
                b = $(window).scrollLeft();
                c = $(window).width() + $(window).scrollLeft()
            } else {
                b = $(a.container).offset().left;
                c = $(a.container).offset().left + $(a.container).width()
            }
            return (d.offset().left + d.width() + a.beforehand >= b && c >= d.offset().left - a.beforehand)
        }

        function f() {
            e.filter("img[" + a.imgSrcAttr + "]").each(function (d, b) {
                if ($(b).attr(a.imgSrcAttr) !== undefined && $(b).attr(a.imgSrcAttr) !== null && $(b).attr(a.imgSrcAttr) !== "" && g($(b)) && h($(b))) {
                    var c = new Image();
                    c.onload = function () {
                        $(b).attr("src", c.src);
                        a.duration !== 0 && $(b).hide().fadeIn(a.duration);
                        $(b).removeAttr(a.imgSrcAttr);
                        a.success($(b))
                    };
                    c.onerror = function () {
                        $(b).attr("src", a.errorImg);
                        $(b).removeAttr(a.imgSrcAttr);
                        a.error($(b))
                    };
                    c.src = $(b).attr(a.imgSrcAttr)
                }
            })
        }

        a = jQuery.extend({
            defaultImg: "",
            errorImg: "",
            imgSrcAttr: "originalSrc",
            beforehand: 0,
            event: "scroll",
            duration: "normal",
            container: window,
            success: function () {
            },
            error: function () {
            },
        }, a || {});
        if (a.errorImg === undefined || a.errorImg === null || a.errorImg === "")a.errorImg = a.defaultImg;
        var e = $(this);
        if (e.attr("src") === undefined || e.attr("src") === null || e.attr("src") === "")e.attr("src", a.defaultImg);
        f();
        $(a.container).bind(a.event, function () {
            f()
        })
    },
});
$(function () {
    $("img.lazyi").delayLoading({
        defaultImg: "/images/load_icon.gif",
        errorImg: "",
        imgSrcAttr: "data-original",
        beforehand: 0,
        event: "scroll",
        duration: "normal",
        container: window,
        success: function (imgObj) {
        },
        error: function (imgObj) {
        },
    });
    var g_getseller = null;
    if (typeof customtplcolor == "undefined" || (customtplcolor != 99104 && customtplcolor != 99602 && customtplcolor != 99205 && customtplcolor != 99101 && customtplcolor != 99341 && customtplcolor != 99333 && customtplcolor != 99604 && customtplcolor != 99603 && customtplcolor != 99321 && customtplcolor != 99340 && customtplcolor != 99335 && customtplcolor != 99106 && customtplcolor != 99606 && customtplcolor != 99331 && customtplcolor != 99304 && customtplcolor != 99316 && customtplcolor != 99608 && customtplcolor != 99336 && customtplcolor != 99605 && customtplcolor != 99103 && customtplcolor != 99303 && customtplcolor != 99108 && customtplcolor != 99324 && customtplcolor != 99107 && customtplcolor != 99206 && customtplcolor != 99311 && customtplcolor != 99338 && customtplcolor != 99607 && customtplcolor != 99325 && customtplcolor != 99315 && customtplcolor != 99329 && customtplcolor != 99337 && customtplcolor != 99305 && customtplcolor != 99301 && customtplcolor != 99105 && customtplcolor != 99501 && customtplcolor != 99309 && customtplcolor != 99323 && customtplcolor != 99308 && customtplcolor != 99310 && customtplcolor != 99322 && customtplcolor != 99204 && customtplcolor != 99306 && customtplcolor != 99302 && customtplcolor != 99328 && customtplcolor != 99317 && customtplcolor != 99102 && customtplcolor != 99332 && customtplcolor != 99330 && customtplcolor != 99313 && customtplcolor != 99334 && customtplcolor != 99312 && customtplcolor != 99319 && customtplcolor != 99203 && customtplcolor != 99318 && customtplcolor != 99314 && customtplcolor != 99320 && customtplcolor != 99326 && customtplcolor != 99327 && customtplcolor != 99201 && customtplcolor != 99202 && customtplcolor != 99339 && customtplcolor != 99307 && customtplcolor != 99401)) {
        if (typeof query_string != "undefined" && query_string != "" && query_string[0] == "Products" && (query_string[1] == "Detail" || query_string[1] == "Quality" || query_string[1] == "ShowQuality")) {
        } else {
            $.getScript(webim_config.path + "webim.js")
        }
    } else {
        $.ajax({
            type: "get", url: "/getseller.html", data: "", async: false, success: function (data) {
                g_getsellerret = data.trim();
                getsellerretArr = g_getsellerret.split(",");
                g_getseller = getsellerretArr[0];
                if (g_getseller != null && g_getseller != "") {
                    $(".no_product_detailmainV2 .ri .sub div").show();
                    $("#chat_now").show();
                    $(".footer_webim").show();
                    $(".html_ECER_MIN_BAR_AUDIO").css("display", "inline-block");
                    $(".html_ECER_MIN_BAR_VIDEO").css("display", "inline-block");
                    $(".html_ECER_MIN_BAR_AUDIO").click(function () {
                        window.open("/webim/webim_tab.html")
                    });
                    $(".html_ECER_MIN_BAR_VIDEO").click(function () {
                        window.open("/webim/webim_tab.html")
                    })
                } else {
                    $(".no_product_detailmainV2 .ri .sub div").hide();
                    $("#chat_now").hide();
                    $(".footer_webim").hide()
                }
                ;
                inquirypopup_tmp = getsellerretArr[3];
                if (inquirypopup_tmp != null && inquirypopup_tmp == 0) {
                    g_inquirypopup = 0
                }
            }
        })
    }
    ;
    if ($(".lb_company_detail_129").length !== 0) {
        $(".lb_company_detail_129 li").click(function () {
            var id = $(this).attr("id");
            $(".lb_company_detail_129 li").removeClass("cur");
            $(this).addClass("cur");
            $(".details_wrap").hide();
            $("#factorytour_" + id).show()
        })
    }
    ;
    function startProductInfo(param) {
        var el = "." + param.el;
        $(".one").clone().appendTo($(el).find(".content"));
        $(el).find(".content").css("width", $(el).find(".detail").length * $(el).find(".detail").width());
        var timr = null;

        function selflunbo() {
            immlazyload();
            if ($(el).find(".content").css("left") === "-1200px") {
                $(el).find(".content").animate({left: -2400,});
                $(el).find(".pagedisc span").removeClass("active");
                $(el).find(".pagedisc span:eq(0)").addClass("active")
            } else if ($(el).find(".content").css("left") === "-2400px") {
                $(el).find(".content").css("left", 0);
                $(el).find(".content").animate({left: -1200,});
                $(el).find(".pagedisc span").removeClass("active");
                $(el).find(".pagedisc span:eq(1)").addClass("active")
            } else {
                $(el).find(".content").animate({left: -1200,});
                $(el).find(".pagedisc span").removeClass("active");
                $(el).find(".pagedisc span:eq(1)").addClass("active")
            }
        }

        timr = setInterval(selflunbo, param.speed);
        $(el).find(".pagedisc span").click(function () {
            if ($(this).index() === 0) {
                $(el).find(".content").animate({left: -2400,});
                $(el).find(".pagedisc span").removeClass("active");
                $(el).find(".pagedisc span:eq(0)").addClass("active")
            } else {
                $(el).find(".content").animate({left: -1200,});
                $(el).find(".pagedisc span").removeClass("active");
                $(el).find(".pagedisc span:eq(1)").addClass("active")
            }
        });
        function immlazyload() {
            $(el).find("img").each(function (index, item) {
                if ($(item).attr("data-original")) {
                    $(item).attr("src", $(item).attr("data-original"))
                }
                $(item).removeAttr("data-original")
            })
        }

        $(el).find(".box").mouseenter(function () {
            clearInterval(timr)
        });
        $(el).find(".box").mouseleave(function () {
            clearInterval(timr);
            timr = setInterval(selflunbo, param.speed)
        })
    }

    if ($(".hu_product_others_grid_118V2").length !== 0) {
        startProductInfo({el: "hu_product_others_grid_118V2", speed: 5000})
    }
});
function lb_company_general_118V2_about_img() {
    var photo_obj = $(".lb_company_general_118V2 .photo");
    if (photo_obj.length == 0) {
        return true
    }
    photo_obj.each(function () {
        $(this).toggle_img({show_btn: ".page span", show_div: ".img_wrap .desc", active: "active",})
    })
}
lb_company_general_118V2_about_img();
(function () {
    let hrefs = window.location.pathname;
    $(".navigation>li").each(function (index, item) {
        if ($(item).find("a").attr("href") === hrefs) {
            $(item).addClass("cur")
        }
    })
})()