import {nonAccentVietnamese} from "../String/stringFormat";

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
    "af-ZA": "yyyy/MM/dd",
    "am-ET": "d/M/yyyy",
    "ar-AE": "dd/MM/yyyy",
    "ar-BH": "dd/MM/yyyy",
    "ar-DZ": "dd-MM-yyyy",
    "ar-EG": "dd/MM/yyyy",
    "ar-IQ": "dd/MM/yyyy",
    "ar-JO": "dd/MM/yyyy",
    "ar-KW": "dd/MM/yyyy",
    "ar-LB": "dd/MM/yyyy",
    "ar-LY": "dd/MM/yyyy",
    "ar-MA": "dd-MM-yyyy",
    "ar-OM": "dd/MM/yyyy",
    "ar-QA": "dd/MM/yyyy",
    "ar-SA": "dd/MM/yy",
    "ar-SY": "dd/MM/yyyy",
    "ar-TN": "dd-MM-yyyy",
    "ar-YE": "dd/MM/yyyy",
    "arn-CL": "dd-MM-yyyy",
    "as-IN": "dd-MM-yyyy",
    "az-Cyrl-AZ": "dd.MM.yyyy",
    "az-Latn-AZ": "dd.MM.yyyy",
    "ba-RU": "dd.MM.yy",
    "be-BY": "dd.MM.yyyy",
    "bg-BG": "dd.M.yyyy",
    "bn-BD": "dd-MM-yy",
    "bn-IN": "dd-MM-yy",
    "bo-CN": "yyyy/M/d",
    "br-FR": "dd/MM/yyyy",
    "bs-Cyrl-BA": "d.M.yyyy",
    "bs-Latn-BA": "d.M.yyyy",
    "ca-ES": "dd/MM/yyyy",
    "co-FR": "dd/MM/yyyy",
    "cs-CZ": "d.M.yyyy",
    "cy-GB": "dd/MM/yyyy",
    "da-DK": "dd-MM-yyyy",
    "de-AT": "dd.MM.yyyy",
    "de-CH": "dd.MM.yyyy",
    "de-DE": "dd.MM.yyyy",
    "de-LI": "dd.MM.yyyy",
    "de-LU": "dd.MM.yyyy",
    "dsb-DE": "d. M. yyyy",
    "dv-MV": "dd/MM/yy",
    "el-GR": "d/M/yyyy",
    "en-029": "MM/dd/yyyy",
    "en-AU": "d/MM/yyyy",
    "en-BZ": "dd/MM/yyyy",
    "en-CA": "dd/MM/yyyy",
    "en-GB": "dd/MM/yyyy",
    "en-IE": "dd/MM/yyyy",
    "en-IN": "dd-MM-yyyy",
    "en-JM": "dd/MM/yyyy",
    "en-MY": "d/M/yyyy",
    "en-NZ": "d/MM/yyyy",
    "en-PH": "M/d/yyyy",
    "en-SG": "d/M/yyyy",
    "en-TT": "dd/MM/yyyy",
    "en-US": "M/d/yyyy",
    "en-ZA": "yyyy/MM/dd",
    "en-ZW": "M/d/yyyy",
    "es-AR": "dd/MM/yyyy",
    "es-BO": "dd/MM/yyyy",
    "es-CL": "dd-MM-yyyy",
    "es-CO": "dd/MM/yyyy",
    "es-CR": "dd/MM/yyyy",
    "es-DO": "dd/MM/yyyy",
    "es-EC": "dd/MM/yyyy",
    "es-ES": "dd/MM/yyyy",
    "es-GT": "dd/MM/yyyy",
    "es-HN": "dd/MM/yyyy",
    "es-MX": "dd/MM/yyyy",
    "es-NI": "dd/MM/yyyy",
    "es-PA": "MM/dd/yyyy",
    "es-PE": "dd/MM/yyyy",
    "es-PR": "dd/MM/yyyy",
    "es-PY": "dd/MM/yyyy",
    "es-SV": "dd/MM/yyyy",
    "es-US": "M/d/yyyy",
    "es-UY": "dd/MM/yyyy",
    "es-VE": "dd/MM/yyyy",
    "et-EE": "d.MM.yyyy",
    "eu-ES": "yyyy/MM/dd",
    "fa-IR": "MM/dd/yyyy",
    "fi-FI": "d.M.yyyy",
    "fil-PH": "M/d/yyyy",
    "fo-FO": "dd-MM-yyyy",
    "fr-BE": "d/MM/yyyy",
    "fr-CA": "yyyy-MM-dd",
    "fr-CH": "dd.MM.yyyy",
    "fr-FR": "dd/MM/yyyy",
    "fr-LU": "dd/MM/yyyy",
    "fr-MC": "dd/MM/yyyy",
    "fy-NL": "d-M-yyyy",
    "ga-IE": "dd/MM/yyyy",
    "gd-GB": "dd/MM/yyyy",
    "gl-ES": "dd/MM/yy",
    "gsw-FR": "dd/MM/yyyy",
    "gu-IN": "dd-MM-yy",
    "ha-Latn-NG": "d/M/yyyy",
    "he-IL": "dd/MM/yyyy",
    "hi-IN": "dd-MM-yyyy",
    "hr-BA": "d.M.yyyy.",
    "hr-HR": "d.M.yyyy",
    "hsb-DE": "d. M. yyyy",
    "hu-HU": "yyyy. MM. dd.",
    "hy-AM": "dd.MM.yyyy",
    "id-ID": "dd/MM/yyyy",
    "ig-NG": "d/M/yyyy",
    "ii-CN": "yyyy/M/d",
    "is-IS": "d.M.yyyy",
    "it-CH": "dd.MM.yyyy",
    "it-IT": "dd/MM/yyyy",
    "iu-Cans-CA": "d/M/yyyy",
    "iu-Latn-CA": "d/MM/yyyy",
    "ja-JP": "yyyy/MM/dd",
    "ka-GE": "dd.MM.yyyy",
    "kk-KZ": "dd.MM.yyyy",
    "kl-GL": "dd-MM-yyyy",
    "km-KH": "yyyy-MM-dd",
    "kn-IN": "dd-MM-yy",
    "ko-KR": "yyyy-MM-dd",
    "kok-IN": "dd-MM-yyyy",
    "ky-KG": "dd.MM.yy",
    "lb-LU": "dd/MM/yyyy",
    "lo-LA": "dd/MM/yyyy",
    "lt-LT": "yyyy.MM.dd",
    "lv-LV": "yyyy.MM.dd.",
    "mi-NZ": "dd/MM/yyyy",
    "mk-MK": "dd.MM.yyyy",
    "ml-IN": "dd-MM-yy",
    "mn-MN": "yy.MM.dd",
    "mn-Mong-CN": "yyyy/M/d",
    "moh-CA": "M/d/yyyy",
    "mr-IN": "dd-MM-yyyy",
    "ms-BN": "dd/MM/yyyy",
    "ms-MY": "dd/MM/yyyy",
    "mt-MT": "dd/MM/yyyy",
    "nb-NO": "dd.MM.yyyy",
    "ne-NP": "M/d/yyyy",
    "nl-BE": "d/MM/yyyy",
    "nl-NL": "d-M-yyyy",
    "nn-NO": "dd.MM.yyyy",
    "nso-ZA": "yyyy/MM/dd",
    "oc-FR": "dd/MM/yyyy",
    "or-IN": "dd-MM-yy",
    "pa-IN": "dd-MM-yy",
    "pl-PL": "yyyy-MM-dd",
    "prs-AF": "dd/MM/yy",
    "ps-AF": "dd/MM/yy",
    "pt-BR": "d/M/yyyy",
    "pt-PT": "dd-MM-yyyy",
    "qut-GT": "dd/MM/yyyy",
    "quz-BO": "dd/MM/yyyy",
    "quz-EC": "dd/MM/yyyy",
    "quz-PE": "dd/MM/yyyy",
    "rm-CH": "dd/MM/yyyy",
    "ro-RO": "dd.MM.yyyy",
    "ru-RU": "dd.MM.yyyy",
    "rw-RW": "M/d/yyyy",
    "sa-IN": "dd-MM-yyyy",
    "sah-RU": "MM.dd.yyyy",
    "se-FI": "d.M.yyyy",
    "se-NO": "dd.MM.yyyy",
    "se-SE": "yyyy-MM-dd",
    "si-LK": "yyyy-MM-dd",
    "sk-SK": "d. M. yyyy",
    "sl-SI": "d.M.yyyy",
    "sma-NO": "dd.MM.yyyy",
    "sma-SE": "yyyy-MM-dd",
    "smj-NO": "dd.MM.yyyy",
    "smj-SE": "yyyy-MM-dd",
    "smn-FI": "d.M.yyyy",
    "sms-FI": "d.M.yyyy",
    "sq-AL": "yyyy-MM-dd",
    "sr-Cyrl-BA": "d.M.yyyy",
    "sr-Cyrl-CS": "d.M.yyyy",
    "sr-Cyrl-ME": "d.M.yyyy",
    "sr-Cyrl-RS": "d.M.yyyy",
    "sr-Latn-BA": "d.M.yyyy",
    "sr-Latn-CS": "d.M.yyyy",
    "sr-Latn-ME": "d.M.yyyy",
    "sr-Latn-RS": "d.M.yyyy",
    "sv-FI": "d.M.yyyy",
    "sv-SE": "yyyy-MM-dd",
    "sw-KE": "M/d/yyyy",
    "syr-SY": "dd/MM/yyyy",
    "ta-IN": "dd-MM-yyyy",
    "te-IN": "dd-MM-yy",
    "tg-Cyrl-TJ": "dd.MM.yy",
    "th-TH": "d/M/yyyy",
    "tk-TM": "dd.MM.yy",
    "tn-ZA": "yyyy/MM/dd",
    "tr-TR": "dd.MM.yyyy",
    "tt-RU": "dd.MM.yyyy",
    "tzm-Latn-DZ": "dd-MM-yyyy",
    "ug-CN": "yyyy-M-d",
    "uk-UA": "dd.MM.yyyy",
    "ur-PK": "dd/MM/yyyy",
    "uz-Cyrl-UZ": "dd.MM.yyyy",
    "uz-Latn-UZ": "dd/MM yyyy",
    "vi-VN": "dd/MM/yyyy",
    "wo-SN": "dd/MM/yyyy",
    "xh-ZA": "yyyy/MM/dd",
    "yo-NG": "d/M/yyyy",
    "zh-CN": "yyyy/M/d",
    "zh-HK": "d/M/yyyy",
    "zh-MO": "d/M/yyyy",
    "zh-SG": "d/M/yyyy",
    "zh-TW": "yyyy/M/d",
    "zu-ZA": "yyyy/MM/dd",
};

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


export var formatTokenRegex = /([,\.\-\/])|([a-zA-Z0-9]+)/g;//more

/**
 *
 * @param {Date} date
 * @param {String} format
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
    var tested = {};
    var res = 'dd/mm/yyyy';
    var fm;
    var d1 = new Date(2020, 2, 2);
    var d2 = new Date(2020, 11, 20);
    var s1 = d1.toLocaleDateString();
    var s2 = d2.toLocaleDateString();

    for (var lang in language2LocalDateFormat) {
        fm = language2LocalDateFormat[lang];
        if (tested[fm]) continue;
        tested[fm] = true;
        if (formatDateString(d1, fm) === s1 &&formatDateString(d2, fm) === s2  ){
            res = fm;
            break;
        }
    }
    return res;
})();



export function formartDateString() {
    window.ALogger.warn("spelled incorrectly: formartDateString");
    return formatDateString.apply(null, arguments);
}

/**
 *
 * @param {String} text
 * @param {String} format
 * @returns {String}
 */
export function parseDateString(text, format) {
    text = nonAccentVietnamese(text).toLowerCase();
    format = nonAccentVietnamese(format).toLowerCase();
    var textTokens = text.match(formatTokenRegex) || [];
    var formatTokens = format.match(formatTokenRegex) || [];
    var year = NaN;
    var month = NaN;
    var day = NaN;
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
                if (textToken != formatToken)
                    throw new Error('Unexpected token ' + textToken);
        }
    }

    if (isNaN(year)) throw new Error('Invalid year');
    if (isNaN(month) && month != -1) {
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
    return new Date(year, month, day, 0, 0, 0, 0);
}


/**
 * @param {Date} date
 * @return {Date}
 */
export function prevDate(date) {
    return new Date(date.getTime() - 86400000);
};

/**
 * @param {Date} date
 * @return {Date}
 */
export function nextDate(date) {
    return new Date(date.getTime() + 86400000);
};


/**
 * @param {Date} date
 * @return {Date} date at 00:00
 */
export function beginOfHour(date) {
    var res = new Date(date.getTime());
    res.setMilliseconds(0);
    res.setSeconds(0);
    res.setMinutes(0);
    return res;
};


/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
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
};


/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00
 */
export function beginOfWeek(date, gmt, begin) {
    begin = begin || 0;
    var res = beginOfDay(date, gmt);
    while ((gmt ? res.getUTCDay() : res.getDay()) != begin) {
        res = prevDate(res);
    }
    return res;
};

/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
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
 * @param {Boolean} gmt default:false
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
};


/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean} gmt default:false
 * @return {number}
 */
export function compareDate(date0, date1, gmt) {
    var date0 = beginOfDay(date0, !!gmt);
    var date1 = beginOfDay(date1, !!gmt);
    return (date0.getTime() - date1.getTime()) / (86400000);
};


/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean} gmt default:false
 * @return {number}
 */

export function compareMonth(date0, date1, gmt) {
    gmt = !!gmt;
    var m0 = gmt ? date0.getUTCMonth() : date0.getMonth();
    var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();

    var m1 = gmt ? date1.getUTCMonth() : date1.getMonth();
    var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();

    return (y0 - y1) * 12 + (m0 - m1);
};

export function compareYear(date0, date1, gmt) {
    gmt = !!gmt;
    var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();
    var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();
    return y0 - y1;
};


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