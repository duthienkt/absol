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
            decDigits.push(realDigits.unshift());
        }
        else {
            decDigits.push(0);
        }
        floatPoint++;
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