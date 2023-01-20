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
 *
 * @param mValue
 * @returns {{unit: null, value: string}|{unit: string, value: number}|null}
 */
export function parseMeasureValue(mValue) {
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
        matched = mValue.match(/([+-]?([0-9]*[.])?[0-9]+([eE][+-]?[0-9]+)?)(px|%|vw|vh)?/i);
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
