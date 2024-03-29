"use strict";

const external = global.external;
const re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
const re_blackberry_10 = /\bbb10\b.+?\bversion\/([\d.]+)/;
const re_blackberry_6_7 = /\bblackberry\b.+\bversion\/([\d.]+)/;
const re_blackberry_4_5 = /\bblackberry\d+\/([\d.]+)/;

const NA_VERSION = "-1";

const DEVICES = [
    ["nokia", function (ua) {
        //  nokia/-1
        if (ua.indexOf("nokia ") !== -1) {
            return /\bnokia ([0-9]+)?/;
        } else {
            return /\bnokia([a-z0-9]+)?/;
        }
    }],
    //Android WP
    ["samsung", function (ua) {
        if (ua.indexOf("samsung") !== -1) {
            return /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/;
        } else {
            return /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/;
        }
    }],
    ["wp", function (ua) {
        return ua.indexOf("windows phone ") !== -1 ||
            ua.indexOf("xblwp") !== -1 ||
            ua.indexOf("zunewp") !== -1 ||
            ua.indexOf("windows ce") !== -1;
    }],
    ["pc", "windows"],
    ["ipad", "ipad"],
    // ipod iphone
    ["ipod", "ipod"],
    ["iphone", /\biphone\b|\biph(\d)/],
    ["mac", "macintosh"],
    ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
    ["hongmi", /\bhm[ \-]?([a-z0-9]+)/],
    ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
    ["meizu", function (ua) {
        return ua.indexOf("meizu") >= 0 ?
            /\bmeizu[\/ ]([a-z0-9]+)\b/
            :
            /\bm([0-9cx]{1,4})\b/;
    }],
    ["nexus", /\bnexus ([0-9s.]+)/],
    ["huawei", function (ua) {
        const re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
        if (ua.indexOf("huawei-huawei") !== -1) {
            return /\bhuawei\-huawei\-([a-z0-9\-]+)/;
        } else if (re_mediapad.test(ua)) {
            return re_mediapad;
        } else {
            return /\bhuawei[ _\-]?([a-z0-9]+)/;
        }
    }],
    ["lenovo", function (ua) {
        if (ua.indexOf("lenovo-lenovo") !== -1) {
            return /\blenovo\-lenovo[ \-]([a-z0-9]+)/;
        } else {
            return /\blenovo[ \-]?([a-z0-9]+)/;
        }
    }],
    ["zte", function (ua) {
        if (/\bzte\-[tu]/.test(ua)) {
            return /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/;
        } else {
            return /\bzte[ _\-]?([a-su-z0-9\+]+)/;
        }
    }],
    ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
    ["htc", function (ua) {
        if (/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)) {
            return /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/;
        } else {
            return /\bhtc[ _\-]?([a-z0-9 ]+)/;
        }
    }],
    ["oppo", /\boppo[_ ]([a-z0-9]+)/],
    ["konka", /\bkonka[_\-]([a-z0-9]+)/],
    ["sonyericsson", /\bmt([a-z0-9]+)/],
    ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
    ["lg", /\blg[\-]([a-z0-9]+)/],
    ["android", /\bandroid\b|\badr\b/],
    ["blackberry", function (ua) {
        if (ua.indexOf("blackberry") >= 0) {
            return /\bblackberry\s?(\d+)/;
        }
        return "bb10";
    }],
];

const OS = [
    ["wp", function (ua) {
        if (ua.indexOf("windows phone ") !== -1) {
            return /\bwindows phone (?:os )?([0-9.]+)/;
        } else if (ua.indexOf("xblwp") !== -1) {
            return /\bxblwp([0-9.]+)/;
        } else if (ua.indexOf("zunewp") !== -1) {
            return /\bzunewp([0-9.]+)/;
        }
        return "windows phone";
    }],
    ["windows", /\bwindows nt ([0-9.]+)/],
    ["macosx", /\bmac os x ([0-9._]+)/],
    ["ios", function (ua) {
        if (/\bcpu(?: iphone)? os /.test(ua)) {
            return /\bcpu(?: iphone)? os ([0-9._]+)/;
        } else if (ua.indexOf("iph os ") !== -1) {
            return /\biph os ([0-9_]+)/;
        } else {
            return /\bios\b/;
        }
    }],
    ["yunos", /\baliyunos ([0-9.]+)/],
    ["android", function (ua) {
        if (ua.indexOf("android") >= 0) {
            return /\bandroid[ \/-]?([0-9.x]+)?/;
        } else if (ua.indexOf("adr") >= 0) {
            if (ua.indexOf("mqqbrowser") >= 0) {
                return /\badr[ ]\(linux; u; ([0-9.]+)?/;
            } else {
                return /\badr(?:[ ]([0-9.]+))?/;
            }
        }
        return "android";
        //return /\b(?:android|\badr)(?:[\/\- ](?:\(linux; u; )?)?([0-9.x]+)?/;
    }],
    ["chromeos", /\bcros i686 ([0-9.]+)/],
    ["linux", "linux"],
    ["linux", /\blinux\s(?:[xi][0-9_]+;)\srv:([0-9.]+)/],//Linux x86_64; rv:34.0
    ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
    ["cros", /\bcros armv7l ([0-9.]+)/],//CrOS armv7l 7077.134.0
    ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
    ["blackberry", function (ua) {
        const m = ua.match(re_blackberry_10) ||
            ua.match(re_blackberry_6_7) ||
            ua.match(re_blackberry_4_5);
        return m ? { version: m[1] } : "blackberry";
    }],
    ['ie', /\rv\:\/([0-9.]+)/]
];


const ENGINE = [
    ["edgehtml", /edge\/([0-9.]+)/],
    ["trident", re_msie],
    ["blink", function () {
        return "chrome" in global && "CSS" in global && /\bapplewebkit[\/]?([0-9.+]+)/;
    }],
    ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
    ["gecko", function (ua) {
        const match = ua.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/);
        if (match) {
            return {
                version: match[1] + "." + match[2],
            };
        }
    }],
    ["presto", /\bpresto\/([0-9.]+)/],
    ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
    ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
    ["u2", /\bu2\/([0-9.]+)/],
    ["u3", /\bu3\/([0-9.]+)/],
];
const BROWSER = [
    ['coccoc', /coc_coc_browser\/([0-9.]+)/],
    // Microsoft Edge Browser, Default browser in Windows 10.
    ["edge", /edge\/([0-9.]+)/],
    ["chrome-edge", /chrome.+edg\/([0-9.]+)/],
    // Sogou.
    ["sogou", function (ua) {
        if (ua.indexOf("sogoumobilebrowser") >= 0) {
            return /sogoumobilebrowser\/([0-9.]+)/;
        } else if (ua.indexOf("sogoumse") >= 0) {
            return true;
        }
        return / se ([0-9.x]+)/;
    }],

    // Maxthon
    ["maxthon", function () {
        try {
            if (external && (external.mxVersion || external.max_version)) {
                return {
                    version: external.mxVersion || external.max_version,
                };
            }
        } catch (ex) { /* */ }
        return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/;
    }],
    ["micromessenger", /\bmicromessenger\/([\d.]+)/],
    ["qq", /\bm?qqbrowser\/([0-9.]+)/],
    ["green", "greenbrowser"],
    ["tt", /\btencenttraveler ([0-9.]+)/],
    ["liebao", function (ua) {
        if (ua.indexOf("liebaofast") >= 0) {
            return /\bliebaofast\/([0-9.]+)/;
        }
        if (ua.indexOf("lbbrowser") === -1) { return false; }
        var version;
        try {
            if (external && external.LiebaoGetVersion) {
                version = external.LiebaoGetVersion();
            }
        } catch (ex) { /* */ }
        return {
            version: version || NA_VERSION,
        };
    }],
    ["tao", /\btaobrowser\/([0-9.]+)/],
    ["coolnovo", /\bcoolnovo\/([0-9.]+)/],
    ["saayaa", "saayaa"],
    ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
    ["ie", re_msie],
    ["mi", /\bmiuibrowser\/([0-9.]+)/],
    ["opera", function (ua) {
        const re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
        const re_opera_new = /\bopr\/([0-9.]+)/;
        return re_opera_old.test(ua) ? re_opera_old : re_opera_new;
    }],
    ["oupeng", /\boupeng\/([0-9.]+)/],
    ["yandex", /yabrowser\/([0-9.]+)/],
    ["ali-ap", function (ua) {
        if (ua.indexOf("aliapp") > 0) {
            return /\baliapp\(ap\/([0-9.]+)\)/;
        } else {
            return /\balipayclient\/([0-9.]+)\b/;
        }
    }],
    ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
    ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
    ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
    ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
    ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
    ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],

    ["uc", function (ua) {
        if (ua.indexOf("ucbrowser/") >= 0) {
            return /\bucbrowser\/([0-9.]+)/;
        } else if (ua.indexOf("ubrowser/") >= 0) {
            return /\bubrowser\/([0-9.]+)/;
        } else if (/\buc\/[0-9]/.test(ua)) {
            return /\buc\/([0-9.]+)/;
        } else if (ua.indexOf("ucweb") >= 0) {
            // `ucweb/2.0` is compony info.
            // `UCWEB8.7.2.214/145/800` is browser info.
            return /\bucweb([0-9.]+)?/;
        } else {
            return /\b(?:ucbrowser|uc)\b/;
        }
    }],
    ["baiduboxapp",
        function (ua) {
            var back = 0;
            var a;
            if (/ baiduboxapp\//i.test(ua)) {
                a = /([\d+.]+)_(?:diordna|enohpi)_/.exec(ua);
                if (a) {
                    a = a[1].split(".");
                    back = a.reverse().join(".");
                } else if ((a = /baiduboxapp\/([\d+.]+)/.exec(ua))) {
                    back = a[1];
                }

                return {
                    version: back,
                };
            }
            return false;
        },
    ],
    ["oppobrowser", /\boppobrowser\/([0-9.]+)/],
    ["edge-android",/ (?:edga)\/([0-9.]+)/],
    ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
    // Android safari 
    ["android", function (ua) {
        if (ua.indexOf("android") === -1) { return; }
        return /\bversion\/([0-9.]+(?: beta)?)/;
    }],
    ["blackberry", function (ua) {
        const m = ua.match(re_blackberry_10) ||
            ua.match(re_blackberry_6_7) ||
            ua.match(re_blackberry_4_5);
        return m ? { version: m[1] } : "blackberry";
    }],
    ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
    //  Safari， WebView
    ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\/([0-9.]+)\b/],
    ["webview", /os x (?:[0-9._]+).+\bapplewebkit\/([0-9.]+)\b/],
    ["firefox", /\bfirefox\/([0-9.ab]+)/],
    ["nokia", /\bnokiabrowser\/([0-9.]+)/]
];

module.exports = {
    device: DEVICES,
    os: OS,
    browser: BROWSER,
    engine: ENGINE,
    re_msie: re_msie,
};