import { nonAccentVietnamese } from "../String/stringFormat";
import { integerZeroPadding } from "../Math/int";

export var MILLIS_PER_DAY = 24 * 3600000;
export var MILLIS_PER_HOUR = 3600000;
export var MILLIS_PER_MINUTE = 60000;

/**
 *
 * @param {Date} date
 * @returns {String}
 */
export function ddmmyyyy(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        date.getFullYear()
    ].join('/');
};

export var language2LocalDateFormat = {
    "af-ZA": "yyyy/mm/dd",
    "am-ET": "d/m/yyyy",
    "ar-AE": "dd/mm/yyyy",
    "ar-BH": "dd/mm/yyyy",
    "ar-DZ": "dd-mm-yyyy",
    "ar-EG": "dd/mm/yyyy",
    "ar-IQ": "dd/mm/yyyy",
    "ar-JO": "dd/mm/yyyy",
    "ar-KW": "dd/mm/yyyy",
    "ar-LB": "dd/mm/yyyy",
    "ar-LY": "dd/mm/yyyy",
    "ar-MA": "dd-mm-yyyy",
    "ar-OM": "dd/mm/yyyy",
    "ar-QA": "dd/mm/yyyy",
    "ar-SA": "dd/mm/yy",
    "ar-SY": "dd/mm/yyyy",
    "ar-TN": "dd-mm-yyyy",
    "ar-YE": "dd/mm/yyyy",
    "arn-CL": "dd-mm-yyyy",
    "as-IN": "dd-mm-yyyy",
    "az-Cyrl-AZ": "dd.mm.yyyy",
    "az-Latn-AZ": "dd.mm.yyyy",
    "ba-RU": "dd.mm.yy",
    "be-BY": "dd.mm.yyyy",
    "bg-BG": "dd.m.yyyy",
    "bn-BD": "dd-mm-yy",
    "bn-IN": "dd-mm-yy",
    "bo-CN": "yyyy/m/d",
    "br-FR": "dd/mm/yyyy",
    "bs-Cyrl-BA": "d.m.yyyy",
    "bs-Latn-BA": "d.m.yyyy",
    "ca-ES": "dd/mm/yyyy",
    "co-FR": "dd/mm/yyyy",
    "cs-CZ": "d.m.yyyy",
    "cy-GB": "dd/mm/yyyy",
    "da-DK": "dd-mm-yyyy",
    "de-AT": "dd.mm.yyyy",
    "de-CH": "dd.mm.yyyy",
    "de-DE": "dd.mm.yyyy",
    "de-LI": "dd.mm.yyyy",
    "de-LU": "dd.mm.yyyy",
    "dsb-DE": "d. m. yyyy",
    "dv-MV": "dd/mm/yy",
    "el-GR": "d/m/yyyy",
    "en-029": "mm/dd/yyyy",
    "en-AU": "d/mm/yyyy",
    "en-BZ": "dd/mm/yyyy",
    "en-CA": "dd/mm/yyyy",
    "en-GB": "dd/mm/yyyy",
    "en-IE": "dd/mm/yyyy",
    "en-IN": "dd-mm-yyyy",
    "en-JM": "dd/mm/yyyy",
    "en-MY": "d/m/yyyy",
    "en-NZ": "d/mm/yyyy",
    "en-PH": "m/d/yyyy",
    "en-SG": "d/m/yyyy",
    "en-TT": "dd/mm/yyyy",
    "en-US": "m/d/yyyy",
    "en-ZA": "yyyy/mm/dd",
    "en-ZW": "m/d/yyyy",
    "es-AR": "dd/mm/yyyy",
    "es-BO": "dd/mm/yyyy",
    "es-CL": "dd-mm-yyyy",
    "es-CO": "dd/mm/yyyy",
    "es-CR": "dd/mm/yyyy",
    "es-DO": "dd/mm/yyyy",
    "es-EC": "dd/mm/yyyy",
    "es-ES": "dd/mm/yyyy",
    "es-GT": "dd/mm/yyyy",
    "es-HN": "dd/mm/yyyy",
    "es-MX": "dd/mm/yyyy",
    "es-NI": "dd/mm/yyyy",
    "es-PA": "mm/dd/yyyy",
    "es-PE": "dd/mm/yyyy",
    "es-PR": "dd/mm/yyyy",
    "es-PY": "dd/mm/yyyy",
    "es-SV": "dd/mm/yyyy",
    "es-US": "m/d/yyyy",
    "es-UY": "dd/mm/yyyy",
    "es-VE": "dd/mm/yyyy",
    "et-EE": "d.mm.yyyy",
    "eu-ES": "yyyy/mm/dd",
    "fa-IR": "mm/dd/yyyy",
    "fi-FI": "d.m.yyyy",
    "fil-PH": "m/d/yyyy",
    "fo-FO": "dd-mm-yyyy",
    "fr-BE": "d/mm/yyyy",
    "fr-CA": "yyyy-mm-dd",
    "fr-CH": "dd.mm.yyyy",
    "fr-FR": "dd/mm/yyyy",
    "fr-LU": "dd/mm/yyyy",
    "fr-MC": "dd/mm/yyyy",
    "fy-NL": "d-m-yyyy",
    "ga-IE": "dd/mm/yyyy",
    "gd-GB": "dd/mm/yyyy",
    "gl-ES": "dd/mm/yy",
    "gsw-FR": "dd/mm/yyyy",
    "gu-IN": "dd-mm-yy",
    "ha-Latn-NG": "d/m/yyyy",
    "he-IL": "dd/mm/yyyy",
    "hi-IN": "dd-mm-yyyy",
    "hr-BA": "d.m.yyyy.",
    "hr-HR": "d.m.yyyy",
    "hsb-DE": "d. m. yyyy",
    "hu-HU": "yyyy. mm. dd.",
    "hy-AM": "dd.mm.yyyy",
    "id-ID": "dd/mm/yyyy",
    "ig-NG": "d/m/yyyy",
    "ii-CN": "yyyy/m/d",
    "is-IS": "d.m.yyyy",
    "it-CH": "dd.mm.yyyy",
    "it-IT": "dd/mm/yyyy",
    "iu-Cans-CA": "d/m/yyyy",
    "iu-Latn-CA": "d/mm/yyyy",
    "ja-JP": "yyyy/mm/dd",
    "ka-GE": "dd.mm.yyyy",
    "kk-KZ": "dd.mm.yyyy",
    "kl-GL": "dd-mm-yyyy",
    "km-KH": "yyyy-mm-dd",
    "kn-IN": "dd-mm-yy",
    "ko-KR": "yyyy-mm-dd",
    "kok-IN": "dd-mm-yyyy",
    "ky-KG": "dd.mm.yy",
    "lb-LU": "dd/mm/yyyy",
    "lo-LA": "dd/mm/yyyy",
    "lt-LT": "yyyy.mm.dd",
    "lv-LV": "yyyy.mm.dd.",
    "mi-NZ": "dd/mm/yyyy",
    "mk-MK": "dd.mm.yyyy",
    "ml-IN": "dd-mm-yy",
    "mn-MN": "yy.mm.dd",
    "mn-Mong-CN": "yyyy/m/d",
    "moh-CA": "m/d/yyyy",
    "mr-IN": "dd-mm-yyyy",
    "ms-BN": "dd/mm/yyyy",
    "ms-MY": "dd/mm/yyyy",
    "mt-MT": "dd/mm/yyyy",
    "nb-NO": "dd.mm.yyyy",
    "ne-NP": "m/d/yyyy",
    "nl-BE": "d/mm/yyyy",
    "nl-NL": "d-m-yyyy",
    "nn-NO": "dd.mm.yyyy",
    "nso-ZA": "yyyy/mm/dd",
    "oc-FR": "dd/mm/yyyy",
    "or-IN": "dd-mm-yy",
    "pa-IN": "dd-mm-yy",
    "pl-PL": "yyyy-mm-dd",
    "prs-AF": "dd/mm/yy",
    "ps-AF": "dd/mm/yy",
    "pt-BR": "d/m/yyyy",
    "pt-PT": "dd-mm-yyyy",
    "qut-GT": "dd/mm/yyyy",
    "quz-BO": "dd/mm/yyyy",
    "quz-EC": "dd/mm/yyyy",
    "quz-PE": "dd/mm/yyyy",
    "rm-CH": "dd/mm/yyyy",
    "ro-RO": "dd.mm.yyyy",
    "ru-RU": "dd.mm.yyyy",
    "rw-RW": "m/d/yyyy",
    "sa-IN": "dd-mm-yyyy",
    "sah-RU": "mm.dd.yyyy",
    "se-FI": "d.m.yyyy",
    "se-NO": "dd.mm.yyyy",
    "se-SE": "yyyy-mm-dd",
    "si-LK": "yyyy-mm-dd",
    "sk-SK": "d. m. yyyy",
    "sl-SI": "d.m.yyyy",
    "sma-NO": "dd.mm.yyyy",
    "sma-SE": "yyyy-mm-dd",
    "smj-NO": "dd.mm.yyyy",
    "smj-SE": "yyyy-mm-dd",
    "smn-FI": "d.m.yyyy",
    "sms-FI": "d.m.yyyy",
    "sq-AL": "yyyy-mm-dd",
    "sr-Cyrl-BA": "d.m.yyyy",
    "sr-Cyrl-CS": "d.m.yyyy",
    "sr-Cyrl-ME": "d.m.yyyy",
    "sr-Cyrl-RS": "d.m.yyyy",
    "sr-Latn-BA": "d.m.yyyy",
    "sr-Latn-CS": "d.m.yyyy",
    "sr-Latn-ME": "d.m.yyyy",
    "sr-Latn-RS": "d.m.yyyy",
    "sv-FI": "d.m.yyyy",
    "sv-SE": "yyyy-mm-dd",
    "sw-KE": "m/d/yyyy",
    "syr-SY": "dd/mm/yyyy",
    "ta-IN": "dd-mm-yyyy",
    "te-IN": "dd-mm-yy",
    "tg-Cyrl-TJ": "dd.mm.yy",
    "th-TH": "d/m/yyyy",
    "tk-TM": "dd.mm.yy",
    "tn-ZA": "yyyy/mm/dd",
    "tr-TR": "dd.mm.yyyy",
    "tt-RU": "dd.mm.yyyy",
    "tzm-Latn-DZ": "dd-mm-yyyy",
    "ug-CN": "yyyy-m-d",
    "uk-UA": "dd.mm.yyyy",
    "ur-PK": "dd/mm/yyyy",
    "uz-Cyrl-UZ": "dd.mm.yyyy",
    "uz-Latn-UZ": "dd/mm yyyy",
    "vi-VN": "dd/mm/yyyy",
    "wo-SN": "dd/mm/yyyy",
    "xh-ZA": "yyyy/mm/dd",
    "yo-NG": "d/m/yyyy",
    "zh-CN": "yyyy/m/d",
    "zh-HK": "d/m/yyyy",
    "zh-MO": "d/m/yyyy",
    "zh-SG": "d/m/yyyy",
    "zh-TW": "yyyy/m/d",
    "zu-ZA": "yyyy/mm/dd",
};

export var dateFormat2LocationList = Object.keys(language2LocalDateFormat).reduce(function (ac, cr) {
    ac[language2LocalDateFormat[cr]] = ac[language2LocalDateFormat[cr]] || [];
    ac[language2LocalDateFormat[cr]].push(cr);
    return ac;
}, {});

export var dateFormatList = Object.keys(dateFormat2LocationList);

/**
 *
 * @param {Date} date
 * @returns {String}
 */
export function yyymmdd(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
        date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('/');
};


export var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export var shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export var shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export var formatTokenRegex = /([,.\-\/])|([a-zA-Z0-9]+)/g;//more

export var DATE_TIME_TOKEN_RGX = /([^\s.\/:\-,]+)|([.\/:\-,]+)/i;

/**
 *
 * @param {Date} date
 * @param {String=} format
 * @returns {String}
 */
export function formatDateString(date, format) {
    format = format || 'dd/mm/yyyy';
    var dt = date.getDate();
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear()
    return format.replace(formatTokenRegex, function (x) {
        switch (x) {
            case "dddd":
                return dayNames[day];
            case "ddd":
                return shortDayNames[day];
            case "dd":
                return dt < 10 ? '0' + dt : '' + dt;
            case "d":
                return '' + dt;
            case "mmmm":
                return monthNames[month];
            case "mmm":
                return shortMonthNames[month];
            case "mm":
                return (month + 1) < 10 ? '0' + (month + 1) : '' + (month + 1);
            case "m":
                return '' + (month + 1);
            case 'yy':
                return (year + '').match(/..$/)[0];
            case 'yyyy':
                return year + '';
            default:
                return x;
        }
    });
}


export var LOCAL_DATE_FORMAT = (function () {
    var d = new Date(2021, 4, 4);
    var s = d.toLocaleDateString();
    var fm = s.replace(new RegExp(DATE_TIME_TOKEN_RGX.source, 'g'), function (token) {
        switch (token) {
            case '2021':
                return 'yyyy';
            case '5':
                return 'M';
            case '05':
                return 'MM';
            case '4':
                return 'd';
            case '04':
                return 'dd';
            default:
                return token;
        }
    });

    return fm;
})();

export var LOCAL_DATE_TIME_FORMAT = (function () {
    var d = new Date(2021, 4, 4, 6, 7, 3);
    var s = d.toLocaleString();
    var fm = s.replace(new RegExp(DATE_TIME_TOKEN_RGX.source, 'g'), function (token) {
        switch (token) {
            case '2021':
                return 'yyyy';
            case '5':
                return 'M';
            case '05':
                return 'MM';
            case '4':
                return 'd';
            case '04':
                return 'dd';
            case '06':
                if (new Date(2021, 4, 4, 18, 7, 3).toLocaleString().indexOf(18) >= 0)
                    return 'HH';
                return 'hh';
            case '6':
                return 'h';
            case '07':
                return 'mm';
            case '7':
                return 'm';
            case '03':
                return 'ss';
            case '3':
                return 's';
            case 'AM':
                return 'a'
            default:
                return token;
        }
    });
    return fm;
})();


export function formartDateString() {
    window.ALogger.warn("spelled incorrectly: formartDateString");
    return formatDateString.apply(null, arguments);
}

/**
 *
 * @param {String} text
 * @param {String} format
 * @returns {Date}
 */
export function parseDateString(text, format) {
    text = nonAccentVietnamese(text).toLowerCase();
    format = nonAccentVietnamese(format).toLowerCase();
    var textTokens = text.match(formatTokenRegex) || [];
    var formatTokens = format.match(formatTokenRegex) || [];
    var year = new Date().getFullYear();
    var month = 0;
    var day = 1;
    var n = Math.min(textTokens.length, formatTokens.length);
    var textToken;
    var formatToken;
    for (var i = 0; i < n; ++i) {
        textToken = textTokens[i];
        formatToken = formatTokens[i];
        switch (formatToken) {
            case "dd":
                day = parseInt(textToken);
                break;
            case "d":
                day = parseInt(textToken);
                break;
            case "mmmm":
                month = monthNames.indexOf(textToken.substr(0, 1).toUpperCase() + textToken.substr(1).toLowerCase());
                break;
            case "mmm":
                month = shortMonthNames.indexOf(textToken.substr(0, 1).toUpperCase() + textToken.substr(1).toLowerCase());
                break;
            case "mm":
                month = parseInt(textToken) - 1;
                break;
            case "m":
                month = parseInt(textToken) - 1;
                break;
            case 'yy':
                year = Math.floor((new Date().getFullYear()) / 100) * 100 + parseInt(textToken);
                break;
            case 'yyyy':
                year = parseInt(textToken);
                break;
            default:
                if (textToken !== formatToken)
                    throw new Error('Unexpected token ' + textToken);
        }
    }

    if (isNaN(year)) throw new Error('Invalid year');
    if (isNaN(month) && month !== -1) {
        throw new Error('Invalid month');
    }
    else {
        month = Math.max(0, Math.min(11, month));
    }
    if (!isNaN(day)) {
        day = Math.max(1, Math.min(31, day));
        if (!isNaN(month)) {
            day = Math.min(daysInMonth(2000, month), day);
            if (!isNaN(year)) day = Math.min(daysInMonth(year, month), day);
        }
    }
    else {
        throw new Error('Invalid day');
    }
    return new Date(year, month, day);
}


/**
 * @param {Date} date
 * @return {Date}
 */
export function prevDate(date) {
    return new Date(date.getTime() - MILLIS_PER_DAY);
}

/**
 * @param {Date} date
 * @return {Date}
 */
export function nextDate(date) {
    return new Date(date.getTime() + MILLIS_PER_DAY);
}


/****
 *
 * @param {Date} date
 * @param {boolean=}gmt
 * @param {number=}startDayOfWeek
 * @returns {number}
 */
export function weekIndexOf(date, gmt, startDayOfWeek) {
    var by = beginOfYear(date, !!gmt);
    var byw = beginOfWeek(by, !!gmt, startDayOfWeek);
    var bw = beginOfWeek(date, !!gmt, startDayOfWeek);
    if (compareYear(by, bw) > 0) {
        return weekIndexOf(bw, gmt, startDayOfWeek);
    }
    var i = compareYear(byw, by) < 0 ? -1 : 0;
    return Math.floor(compareDate(date, byw, !!gmt) / 7) + i;
}

/***
 *
 * @param {number} year
 * @param {number} weekIdx
 * @param {boolean=} gmt
 * @param {number=} startDayOfWeek
 * @returns {Date}
 */
export function weekInYear(year, weekIdx, gmt, startDayOfWeek) {
    var bg = new Date(year, 0, 1);
    if (gmt) bg.setUTCHours(0);
    var byw = beginOfWeek(bg, !!gmt, startDayOfWeek || 0);
    var d = compareYear(bg, byw) > 0 ? MILLIS_PER_DAY * 7 : 0;
    return new Date(byw.getTime() + d + weekIdx * 7 * MILLIS_PER_DAY);
}

/**
 * @param {Date} date
 * @return {Date} date at xx:xx:xx:00
 */
export function beginOfSecond(date) {
    var res = new Date(date.getTime());
    res.setMilliseconds(0);
    return res;
}


/**
 * @param {Date} date
 * @return {Date} date at xx:xx:00
 */
export function beginOfMinute(date) {
    var res = new Date(date.getTime());
    res.setMilliseconds(0);
    res.setSeconds(0);
    return res;
}

/**
 * @param {Date} date
 * @return {Date} date at xx:00
 */
export function beginOfHour(date) {
    var res = new Date(date.getTime());
    res.setMilliseconds(0);
    res.setSeconds(0);
    res.setMinutes(0);
    return res;
}


/**
 * @param {Date} date
 * @param {Boolean=} gmt default:false
 * @return {Date} date at 00:00
 */
export function beginOfDay(date, gmt) {
    var res = new Date(date.getTime());
    res.setMilliseconds(0);
    res.setSeconds(0);
    res.setMinutes(0);
    if (gmt)
        res.setUTCHours(0);
    else res.setHours(0);
    return res;
}


/**
 * @param {Date} date
 * @param {Boolean=} gmt default:false
 * @param {number=} begin default:0
 * @return {Date} date at 00:00
 */
export function beginOfWeek(date, gmt, begin) {
    begin = begin || 0;
    var res = beginOfDay(date, gmt);
    while ((gmt ? res.getUTCDay() : res.getDay()) !== begin) {
        res = prevDate(res);
    }
    return res;
};

/**
 * @param {Date} date
 * @param {Boolean=} gmt default:false
 * @return {Date} date at 00:00 AM
 */
export function beginOfMonth(date, gmt) {
    gmt = !!gmt;
    var d = gmt ? date.getUTCDate() : date.getDate();
    var m = gmt ? date.getUTCMonth() : date.getMonth();
    var y = gmt ? date.getUTCFullYear() : date.getFullYear();
    var res = new Date();
    if (gmt)
        res.setUTCFullYear(y, m, 1);
    else
        res.setFullYear(y, m, 1);
    return beginOfDay(res, gmt);
};

/**
 * @param {Date} date
 * @param {Boolean=} gmt default:false
 * @return {Date} date at 00:00 AM
 */
export function beginOfYear(date, gmt) {
    gmt = !!gmt;
    var d = gmt ? date.getUTCDate() : date.getDate();
    var m = gmt ? date.getUTCMonth() : date.getMonth();
    var y = gmt ? date.getUTCFullYear() : date.getFullYear();
    var res = new Date();
    if (gmt)
        res.setUTCFullYear(y, 0, 1);
    else
        res.setFullYear(y, 0, 1);
    return beginOfDay(res, gmt);
}


/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean=} gmt default:false
 * @return {number}
 */
export function compareDate(date0, date1, gmt) {
    var date0 = beginOfDay(date0, !!gmt);
    var date1 = beginOfDay(date1, !!gmt);
    return (date0.getTime() - date1.getTime()) / (86400000);
}


/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean=} gmt default:false
 * @return {number}
 */

export function compareMonth(date0, date1, gmt) {
    gmt = !!gmt;
    var m0 = gmt ? date0.getUTCMonth() : date0.getMonth();
    var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();

    var m1 = gmt ? date1.getUTCMonth() : date1.getMonth();
    var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();

    return (y0 - y1) * 12 + (m0 - m1);
}


/***
 *
 * @param {Date} date0
 * @param {Date} date1
 * @param {boolean=}gmt
 * @returns {number}
 */
export function compareYear(date0, date1, gmt) {
    gmt = !!gmt;
    var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();
    var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();
    return y0 - y1;
}


/**
 *
 * @param {Date} date
 * @returns {Date}
 */
export function nextMonth(date) {
    var m = date.getMonth();
    var y = date.getFullYear();
    if (m == 11) {
        return new Date(y + 1, 0, 1, 0, 0, 0, 0);
    }
    else {
        return new Date(y, m + 1, 1, 0, 0, 0, 0);
    }
}

/**
 *
 * @param {Date} date
 * @returns {Date}
 */
export function prevMonth(date) {
    var m = date.getMonth();
    var y = date.getFullYear();
    if (m == 0) {
        return new Date(y - 1, 11, 1, 0, 0, 0, 0);
    }
    else {
        return new Date(y, m - 1, 1, 0, 0, 0, 0);
    }
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @returns {Number}
 */
export function daysInMonth(year, month) {
    var start = new Date(year, month, 1);
    var end = nextMonth(start);
    return compareDate(end, start);
}


/****
 *
 * @param text
 * @param format support d, M, Y, Q
 * @param {*=} opt
 * @returns {Date}
 */
export function parseDateTime(text, format, opt) {
    opt = Object.assign({
        startDayOfWeek: 0
    }, opt);
    var tokenMap = {};
    var txtRgx = new RegExp(DATE_TIME_TOKEN_RGX.source, 'g');
    var fmRgx = new RegExp(DATE_TIME_TOKEN_RGX.source, 'g');
    var tkMatched, fmMatched;
    tkMatched = txtRgx.exec(text);
    fmMatched = fmRgx.exec(format);
    var tkText, fmText;
    while (tkMatched && fmMatched) {
        tkText = tkMatched[0];
        fmText = fmMatched[0];
        switch (fmText) {
            case 'd':
            case 'dd':
                tokenMap.day = parseInt(tkText, 10);
                break;
            case 'w':
            case 'ww':
                tokenMap.week = parseInt(tkText, 10) - 1;
                break;
            case 'M':
            case 'MM':
                tokenMap.month = parseInt(tkText, 10) - 1;
                break;
            case 'y':
            case 'yyyy':
                tokenMap.year = parseInt(tkText, 10);
                break;
            case 'h':
            case 'hh':
            case 'H':
            case 'HH':
                tokenMap.hour = parseInt(tkText, 10);
                break;
            case 'm':
            case 'mm':
                tokenMap.minute = parseInt(tkText, 10);
                break;
            case 'a':
                if (tkText === 'AM' || tkText === 'PM')
                    tokenMap.period = tkText;
                else throw new Error('Invalid period(a):' + tkText)
                break;
            case 'Q':
            case 'QQ':
                tokenMap.month = (parseInt(tkText, 10) - 1) * 3;
                break;
            default:
                if (tkText !== fmText) {
                    throw  new Error('Unexpected token ' + JSON.stringify(tkText) +
                        ' at ' + tkMatched.index + ', expected ' + fmText);
                }
        }

        tkMatched = txtRgx.exec(text);
        fmMatched = fmRgx.exec(format);
    }

    if (tokenMap.period) {
        if (tokenMap.period === 'AM' && tokenMap.hour === 12) tokenMap.hour = 0;
        else if (tokenMap.period === "PM" && tokenMap.hour < 12) tokenMap.hour += 12;
    }

    var paramNames = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    var paramShortNames = ['y', 'M', 'd', 'h', 'm', 's'];
    var paramDefaultValues = [new Date().getFullYear(), 0, 1, 0, 0, 0];
    var resParam = paramDefaultValues.slice();
    var paramList = paramNames.reduce(function (ac, cr, i) {
        var sN = paramShortNames[i];
        if (cr in tokenMap) {
            ac += sN;
        }
        return ac;
    }, '');


    var paramName;
    for (var i = 0; i < paramNames.length; ++i) {
        paramName = paramNames[i];
        resParam[i] = tokenMap[paramName] === undefined ? paramDefaultValues[i] : tokenMap[paramName];
    }

    var weekDate;
    if ('week' in tokenMap && !isNaN(tokenMap.week)) {
        weekDate = weekInYear(resParam[0], tokenMap.week, false, opt.startDayOfWeek);
        resParam[1] = weekDate.getMonth();
        resParam[2] = weekDate.getDate();
    }

    switch (paramList) {
        case 'hm':
            resParam.splice(1, 2, new Date().getMonth(), new Date().getDate());
            break;
    }

    return new Date(resParam[0], resParam[1], resParam[2], resParam[3], resParam[4], resParam[5]);
}

/***
 *
 * @param {Date} date
 * @param {string} format
 * @param {*=} opt
 * @return {string}
 */
export function formatDateTime(date, format, opt) {
    opt = Object.assign({
        startDayOfWeek: 0
    }, opt);

    var fmRgx = new RegExp(DATE_TIME_TOKEN_RGX.source, 'g');
    return format.replace(fmRgx, function (s) {
        var res = s;
        switch (s) {
            case 'd':
            case 'dd':
                res = integerZeroPadding(date.getDate(), s.length);
                break;
            case 'w':
            case 'ww':
                res = integerZeroPadding(weekIndexOf(date, false, opt.startDayOfWeek || 0) + 1, s.length);
                break;
            case 'M':
            case 'MM':
                res = integerZeroPadding(date.getMonth() + 1, s.length);
                break;
            case 'MMM':
                res = shortMonthNames[date.getMonth()];
                break;
            case 'MMMM':
                res = monthNames[date.getMonth()];
                break;
            case 'y':
            case 'yyyy':
                res = integerZeroPadding(date.getFullYear(), s.length);
                break;
            case 'yy':
                res = integerZeroPadding(date.getFullYear() % 100, s.length);
                break;
            case 'a':
                res = date.getHours() < 12 ? "AM" : "PM";
                break;
            case "H":
            case 'HH':
                res = integerZeroPadding(date.getHours(), s.length);
                break;
            case 'h':
            case 'hh':
                res = integerZeroPadding(1 + (date.getHours() - 1) % 12, s.length);
                break;
            case 'm':
            case 'mm':
                res = integerZeroPadding(date.getMinutes(), s.length);
                break;
            case 'Q':
            case 'QQ':
                res = integerZeroPadding(Math.floor(date.getMonth() / 3) + 1, s.length)
                break;
        }
        return res;
    });
}


function test() {
    var y = new Date().getFullYear();
    var M = new Date().getMonth();
    var d = new Date().getDate();

    [['22/12/2021', 'dd/MM/yyyy', new Date(2021, 11, 22)],
        ['12:55 AM', 'hh:mm a', new Date(y, M, d, 0, 55)],
        ['12:55 PM', 'hh:mm a', new Date(y, M, d, 12, 55)],
        ['22-12', 'dd-MM', new Date(y, 11, 22, 0, 0)],
        ['2020-11', 'yyyy-MM', new Date(2020, 10, 1, 0, 0)],
        ['11-2020', 'MM-yyyy', new Date(2020, 10, 1, 0, 0)],
        ['quarter 04, 2020', 'quarter QQ, yyyy', new Date(2020, 9, 1, 0, 0)],

    ].forEach(function (pr) {
        var d = parseDateTime(pr[0], pr[1]);
        if ((d && d.getTime()) === pr[2].getTime()) {
            console.info("Pass ", pr);
        }
        else {
            console.error("Text fail with ", pr.slice(0, 2), ', expect ', pr[2], ', return ' + d);
        }
    });
    console.log(formatDateTime(new Date(), "Mùa QQ, năm y, H giờ m phút"));

}

// setTimeout(test, 100);


var number = [/[+-]?\d+$/, matched => new Date(parseInt(matched[0]))];
var reISO = [/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/, matched => new Date(matched[0])];
var reMsAjax = [/^\/Date\((d|-|.*)\)[\/|\\]$/, matched => new Date(parseInt(matched[1]))];
var reString = [/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+([a-zA-Z]{3})\s+[\d\s:]+GMT[\d+]+\s*\([^)]+\)$/, matched => new Date(matched[0])];

export function implicitDate(o) {
    var res = null;
    if (o instanceof Date) {
        res = new Date(o.getTime());
    }
    else if (typeof o === "number") {
        res = new Date(o);
    }
    else if (typeof o === 'string') {
        [reString, reISO, reMsAjax, number].some(rule => {
            var matched = o.match(rule[0]);
            if (matched) {
                res = rule[1](matched);
                return true;
            }
            return false;
        });
    }

    if (res && isNaN(res.getTime())) res = null;
    return res;
}
