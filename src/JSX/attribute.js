export { computeMeasureExpression } from  './CSSParser';

/**
 * 
 * @param {String} text 
 *  @returns {Object}
 */
export function parseStyleAttr(text) {
    return text.split(';').map(function (line) {
        var parts = line.split(':');
        if (parts.length < 2) return null;
        var key = parts.shift().trim();
        var value = parts.join(':').trim();
        if (key.length == 0 || value.length == 0) return null;
        return [key, value];
    }).filter(function (it) { return it != null }).reduce(function (ac, cr) {
        ac[cr[0]] = cr[1];
        return ac;
    }, {});
}

/**
 * 
 * @param {String} text 
 *  @returns {Array<String>}
 */
export function parseClassAttr(text) {
    return text.trim().split(/\s+/);
}



/**
 * Parses a measurement value into a standardized object with value and unit
 * @param {(string|number)} mValue - The measurement value to parse. Can be a number (treated as px), a string with units, 'auto' or 'match_parent'
 * @returns {?{value: (number|string), unit: ?string}} Returns object with value and unit properties, null if parsing fails
 *                                                     For 'auto' and 'match_parent', returns {value: string, unit: null}
 *                                                     For valid measurements, returns {value: number, unit: string}
 */
export function parseMeasureValue(mValue) {
    if (typeof mValue === "string") {
        mValue = mValue.replace(/\s/g, "");
    }
    if (mValue === 'auto') return { unit: null, value: 'auto' };
    if (mValue === 'match_parent') return { unit: null, value: 'match_parent' };
    var value = NaN;
    var unit = null;
    var matched;
    if (typeof mValue === "number") {
        value = mValue;
        unit = 'px';
    }
    else if (typeof mValue === "string") {
        matched = mValue.match(/([+-]?([0-9]*[.])?[0-9]+([eE][+-]?[0-9]+)?)(px|%|vw|vh|em|rem|pt|ex|ch)?/i);
        if (matched) {
            value = parseFloat(matched[1]);
            unit = matched[4];
        }
    }
    if (isNaN(value)) return null;
    unit = unit || 'px';
    return {
        value: value,
        unit: unit
    };
}
