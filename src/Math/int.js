/**
 *
 * @param {number} x
 * @param {number} l
 * @param {number} h
 * @param {number} L
 * @param {number} H
 * @returns {number}
 */
export function map(x, l, h, L, H) {
    return (x - l) / (h - l) * (H - L) + L;
}


export function sumArr(arr) {
    var res = 0;
    for (var i = 0; i < arr.length; ++i)
        res += arr[i];
    return res;
}

export function radianInRange(x, start, end) {
    if (start > end) return radianInRange(x, end, start);
    if (x < start) x += (Math.PI * 2) * Math.ceil((start - x) / 2 / Math.PI);
    if (x > end) x -= (Math.PI * 2) * Math.ceil((x - end) / 2 / Math.PI);
    return x >= start && x <= end;
}


export function distance(x0, y0, x1, y1) {
    var dx = x0 - x1;
    var dy = y0 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param {Number} numb
 * @param {Number} floatFixed
 * @param {"."|","} decimalSeparator
 * @param {","|"."} thousandsSeparator
 * @param {Number} decimalPadding
 */
export function numberToString(numb, floatFixed, decimalSeparator, thousandsSeparator, decimalPadding) {
    if (floatFixed === undefined || floatFixed === null || typeof floatFixed != "number" || isNaN(floatFixed) || floatFixed < -1) floatFixed = -1;
    if (decimalSeparator === undefined || decimalSeparator === null || (decimalSeparator != '.' && decimalSeparator != ',')) decimalSeparator = '.';
    if (thousandsSeparator === undefined || thousandsSeparator === null || (floatFixed >= 0 && thousandsSeparator == decimalSeparator)) thousandsSeparator = undefined;
    if (thousandsSeparator != ',' && thousandsSeparator != '.') thousandsSeparator = undefined;
    if (decimalPadding === undefined || decimalPadding === null || typeof decimalPadding != "number" || isNaN(decimalPadding) || decimalPadding < 0) decimalPadding = 0;

    var text = numb.toString();
    var matched = text.match(/[+-]?([0-9]*)(\.([0-9]*))?(e([+-]?[0-9]+))?/);
    var dec = matched[1] || '';
    var real = matched[3] || '';
    var floatPoint = parseInt(matched[5] || '0');
    var decDigits = dec.split('').map(function (d) {
        return parseInt(d)
    });
    var realDigits = real.split('').map(function (d) {
        return parseInt(d)
    });

    while (floatPoint < 0) {
        if (decDigits.length > 0) {
            realDigits.unshift(decDigits.pop());
        }
        else {
            realDigits.unshift(0);
        }
        floatPoint++;
    }
    while (floatPoint > 0) {
        if (realDigits.length > 0) {
            // shift one digit from fractional part into integer part
            decDigits.push(realDigits.shift());
        }
        else {
            decDigits.push(0);
        }
        floatPoint--;
    }

    var mem = 0, i, cValue;
    if (floatFixed > realDigits.length) {
        while (realDigits.length < floatFixed) {
            realDigits.push(0);
        }
    }
    else if (floatFixed < realDigits.length && floatFixed >= 0) {
        i = floatFixed;
        mem = realDigits[i] >= 5 ? 1 : 0;
        realDigits.splice(floatFixed);
        --i;
        while (mem > 0) {
            if (i >= 0) {
                cValue = realDigits[i] + mem;
                realDigits[i] = cValue % 10;
                mem = Math.floor(cValue / 10);
            }
            else {
                if (decDigits.length + i < 0) decDigits.unshift(0);
                cValue = decDigits[decDigits.length + i] + mem;
                decDigits[decDigits.length + i] = cValue % 10;
                mem = Math.floor(cValue / 10);
            }
            --i;
        }
    }


    while (decDigits.length < decimalPadding) {
        decDigits.unshift(0);
    }

    var decText = numb < 0 ? '-' : '';
    var breadMod = (decDigits.length + 2) % 3;
    if (thousandsSeparator) {
        for (i = 0; i < decDigits.length; ++i) {
            decText += decDigits[i];
            if (i % 3 == breadMod && i + 1 < decDigits.length) {
                decText += thousandsSeparator;
            }
        }
    }
    else {
        decText += decDigits.join('');
    }

    var realText = realDigits.length == 0 ? '' : decimalSeparator + realDigits.join('');

    return decText + realText;
}

/***
 *
 * @param value
 * @param {string=}decimalSeparator
 */
export function isNumber(value, decimalSeparator) {
    decimalSeparator = decimalSeparator || '.';
    if (typeof value === "number") return true;
    if (typeof value !== "string") return false;
    var thousandsSeparator = decimalSeparator === '.' ? ',' : '.';
    value = value.split(thousandsSeparator).join('');
    value = value.replace(decimalSeparator, '.');
    return !!value.match(/^[+-]?\d+(\.\d+)?$/);
}


export function numberAutoFixed(x, eDelta) {
    eDelta = eDelta || 10;
    eDelta = Math.round(eDelta);
    var e = parseFloat('1e+' + eDelta);
    return Math.round(x * e) / e;
}

/***
 *
 * @param {number} number
 * @param {number} length
 * @returns {string}
 */
export function integerZeroPadding(number, length) {
    var res = number + '';
    while (res.length < length) res = '0' + res;
    return res;
}

export function harmonicMean(a, b) {
    return 2 / (1 / a + 1 / b);
}


/**
 * Format a number using a small, practical subset of Excel number formats.
 *
 * Supported features:
 * - 1 or 2 sections separated by `;` (positive ; negative).
 * - Digit placeholders: `0` (required) and `#` (optional).
 * - Decimal point `.` and thousands grouping `,`.
 * - Percent `%` (each `%` multiplies the value by 100 and outputs `%` as a literal).
 * - Quoted literals: `"text"` (use `""` inside quotes to escape a quote).
 * - Any other characters are treated as literals (prefix/suffix around the numeric pattern).
 *
 * Not supported (treated as literal text): dates/times, colors/conditions `[Red]`, scientific `E+00`, fractions,
 * `_`/`*` padding, and locale-specific separators.
 *
 * @param {number} value
 * @param {string} format
 * @returns {string}
 */
export function numberToExcelString(value, format) {
    if (format === undefined || format === null || format === '') return String(value);
    if (typeof value !== 'number' || !isFinite(value)) return String(value);

    // Excel typically treats -0 as 0
    if (Object.is(value, -0)) value = 0;

    var sections = splitExcelFormatSections(format);
    var posSection = sections[0] || '';
    var negSection = sections[1];

    var sectionText;
    var isNegative = value < 0;
    if (isNegative) {
        if (typeof negSection === 'string') sectionText = negSection;
        else sectionText = posSection;
    }
    else {
        sectionText = posSection;
    }

    var spec = parseExcelNumberSection(sectionText);

    var absValue = isNegative ? -value : value;

    // If there is no numeric pattern, treat entire section as literal text.
    if (!spec.hasPattern) {
        return (isNegative && typeof negSection !== 'string') ? ('-' + spec.prefix + spec.suffix) : (spec.prefix + spec.suffix);
    }

    var scaledValue = absValue;
    if (spec.percentCount > 0) {
        scaledValue = scaledValue * Math.pow(100, spec.percentCount);
    }

    var floatFixed = spec.maxFracDigits;
    if (floatFixed < 0) floatFixed = -1;

    var formatted = numberToString(scaledValue, floatFixed, '.', spec.useGrouping ? ',' : undefined, spec.minIntDigits);

    if (spec.maxFracDigits >= 0) {
        formatted = trimFractionZeros(formatted, '.', spec.minFracDigits);
    }

    var res = spec.prefix + formatted + spec.suffix;

    // If negative section is absent, follow Excel-ish behavior: add '-' in front.
    if (isNegative && typeof negSection !== 'string') res = '-' + res;

    return res;
}

function splitExcelFormatSections(format) {
    var sections = [];
    var buf = '';
    var inQuote = false;
    for (var i = 0; i < format.length; ++i) {
        var ch = format[i];
        if (ch === '"') {
            // Excel escaping: "" inside quote => literal "
            if (inQuote && format[i + 1] === '"') {
                buf += '"';
                i++;
            }
            else {
                inQuote = !inQuote;
            }
            continue;
        }
        if (!inQuote && ch === ';') {
            sections.push(buf);
            buf = '';
            continue;
        }
        buf += ch;
    }
    sections.push(buf);
    return sections;
}

function parseExcelNumberSection(section) {
    // First/last placeholder indices, ignoring quoted literals
    var inQuote = false;
    var first = -1;
    var last = -1;

    for (var i = 0; i < section.length; ++i) {
        var ch = section[i];
        if (ch === '"') {
            if (inQuote && section[i + 1] === '"') {
                i++;
                continue;
            }
            inQuote = !inQuote;
            continue;
        }
        if (!inQuote && (ch === '0' || ch === '#')) {
            if (first < 0) first = i;
            last = i;
        }
    }

    if (first < 0) {
        return {
            hasPattern: false,
            prefix: unquoteExcelLiterals(section),
            suffix: '',
            percentCount: 0,
            useGrouping: false,
            minIntDigits: 0,
            minFracDigits: 0,
            maxFracDigits: -1
        };
    }

    var prefixRaw = section.slice(0, first);
    var patternCore = section.slice(first, last + 1);
    var suffixRaw = section.slice(last + 1);

    var prefix = unquoteExcelLiterals(prefixRaw);
    var suffix = unquoteExcelLiterals(suffixRaw);

    // Percent scaling: count % in prefix+suffix and also any % that may have slipped into core (rare but safe)
    var percentCount = countCharOutsideQuotes(section, '%');

    var dotIndex = patternCore.indexOf('.');
    var intPart = dotIndex >= 0 ? patternCore.slice(0, dotIndex) : patternCore;
    var fracPart = dotIndex >= 0 ? patternCore.slice(dotIndex + 1) : '';

    var useGrouping = intPart.indexOf(',') >= 0;

    // Keep only placeholder chars
    intPart = intPart.replace(/[^0#]/g, '');
    fracPart = fracPart.replace(/[^0#]/g, '');

    var minIntDigits = (intPart.match(/0/g) || []).length;
    var minFracDigits = (fracPart.match(/0/g) || []).length;
    var maxFracDigits = fracPart.length;

    // If there is a decimal point but no frac placeholders, Excel shows no decimals.
    if (dotIndex >= 0 && maxFracDigits === 0) maxFracDigits = 0;

    return {
        hasPattern: true,
        prefix: prefix,
        suffix: suffix,
        percentCount: percentCount,
        useGrouping: useGrouping,
        minIntDigits: minIntDigits,
        minFracDigits: minFracDigits,
        maxFracDigits: maxFracDigits
    };
}

function unquoteExcelLiterals(text) {
    var res = '';
    var inQuote = false;
    for (var i = 0; i < text.length; ++i) {
        var ch = text[i];
        if (ch === '"') {
            if (inQuote && text[i + 1] === '"') {
                res += '"';
                i++;
            }
            else {
                inQuote = !inQuote;
            }
            continue;
        }
        res += ch;
    }
    return res;
}

function countCharOutsideQuotes(text, c) {
    var count = 0;
    var inQuote = false;
    for (var i = 0; i < text.length; ++i) {
        var ch = text[i];
        if (ch === '"') {
            if (inQuote && text[i + 1] === '"') {
                i++;
                continue;
            }
            inQuote = !inQuote;
            continue;
        }
        if (!inQuote && ch === c) count++;
    }
    return count;
}

function trimFractionZeros(text, decimalSeparator, minFracDigits) {
    var dsIndex = text.indexOf(decimalSeparator);
    if (dsIndex < 0) return text;

    var intText = text.slice(0, dsIndex);
    var fracText = text.slice(dsIndex + 1);

    var i = fracText.length;
    while (i > minFracDigits && i > 0 && fracText[i - 1] === '0') i--;
    fracText = fracText.slice(0, i);

    if (fracText.length === 0) return intText;
    return intText + decimalSeparator + fracText;
}