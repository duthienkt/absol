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



//more https://www.myonlinetraininghub.com/excel-date-and-time-formatting
export var formatTokenRegex = /([a-zA-Z]|[^\s\-$-/:-?{-~!"^_`\[\]])+/g;//more

/**
 * 
 * @param {Date} date 
 * @param {String} format 
 * @returns {String}
 */
export function formartDateString(date, format) {
    format = format || 'dd/mm/yyyy';
    var dt = date.getDate();
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear()
    return format.replace(formatTokenRegex, function (x) {
        switch (x) {
            case "dddd": return dayNames[day];
            case "ddd": return shortDayNames[day];
            case "dd": return dt < 10 ? '0' + dt : '' + dt;
            case "d": return '' + dt;
            case "mmmm": return monthNames[month];
            case "mmm": return shortMonthNames[month];
            case "mm": return (month + 1) < 10 ? '0' + (month + 1) : '' + (month + 1);
            case "m": return '' + (month + 1);
            case 'yy': return (year + '').match(/..$/)[0];
            case 'yyyy': return year + '';
            default:
                return x;
        }
    });
};




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
export function beginOfWeek (date, gmt, begin) {
    begin = begin || 0;
    var res = Date.beginOfDay(date, gmt);
    while ((gmt ? res.getUTCDay() : res.getDay()) != begin) {
        res = Date.prevDate(res);
    }
    return res;
};

/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00 AM 
 */
export function beginOfMonth (date, gmt) {
    gmt = !!gmt;
    var d = gmt ? date.getUTCDate() : date.getDate();
    var m = gmt ? date.getUTCMonth() : date.getMonth();
    var y = gmt ? date.getUTCFullYear() : date.getFullYear();
    var res = new Date();
    if (gmt)
        res.setUTCFullYear(y, m, 1);
    else
        res.setFullYear(y, m, 1);
    return Date.beginOfDay(res, gmt);
};

/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00 AM 
 */
export function beginOfYear (date, gmt) {
    gmt = !!gmt;
    var d = gmt ? date.getUTCDate() : date.getDate();
    var m = gmt ? date.getUTCMonth() : date.getMonth();
    var y = gmt ? date.getUTCFullYear() : date.getFullYear();
    var res = new Date();
    if (gmt)
        res.setUTCFullYear(y, 0, 1);
    else
        res.setFullYear(y, 0, 1);
    return Date.beginOfDay(res, gmt);
};


/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean} gmt default:false
 * @return {number} 
 */
export function compareDate (date0, date1, gmt) {
    var date0 = Date.beginOfDay(date0, !!gmt);
    var date1 = Date.beginOfDay(date1, !!gmt);
    return (date0.getTime() - date1.getTime()) / (86400000);
};



/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean} gmt default:false
 * @return {number} 
 */

export function compareMonth (date0, date1, gmt) {
    gmt = !!gmt;
    var m0 = gmt ? date0.getUTCMonth() : date0.getMonth();
    var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();

    var m1 = gmt ? date1.getUTCMonth() : date1.getMonth();
    var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();

    return (y0 - y1) * 12 + (m0 - m1);
};

export function compareYear (date0, date1, gmt) {
    gmt = !!gmt;
    var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();
    var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();

    return y0 - y1;
};


