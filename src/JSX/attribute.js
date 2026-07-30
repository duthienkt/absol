import CSSParser from "./CSSParser";

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


/**
 * Parses a CSS font shorthand value into individual font properties
 * @param {string} fontStr - The font string to parse (e.g., "bold italic 14px Arial")
 * @returns {Object} Object containing parsed font properties:
 *                   - fontStyle: 'normal', 'italic', 'oblique' or null
 *                   - fontVariant: 'normal', 'small-caps' or null
 *                   - fontWeight: 'normal', 'bold', or number (100-900) or null
 *                   - fontStretch: 'normal', 'condensed', 'expanded' etc. or null
 *                   - fontSize: parsed measurement value or null
 *                   - lineHeight: parsed measurement value or null
 *                   - fontFamily: comma-separated font families or null
 */
export function parseFontValue(fontStr) {
    var result, remaining, systemFonts, fontFamilyPart, mainPart, fontSizeMatch, fontSizeIndex, afterFontSize;
    var lineHeightMatch, tokens, token, i;

    if (!fontStr || typeof fontStr !== 'string') {
        return {};
    }

    result = {
        fontStyle: null,
        fontVariant: null,
        fontWeight: null,
        fontStretch: null,
        fontSize: null,
        lineHeight: null,
        fontFamily: null
    };

    // Trim the input
    remaining = fontStr.trim();

    // System fonts (caption, icon, menu, message-box, small-caption, status-bar)
    systemFonts = ['caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar'];
    if (systemFonts.includes(remaining.toLowerCase())) {
        return { fontFamily: remaining };
    }

    // Split by comma to separate font family from the rest
    fontFamilyPart = '';
    mainPart = remaining;

    // Find where fontSize and fontFamily start
    // fontSize must have a unit or be a number
    fontSizeMatch = remaining.match(/(^|\s)((?:\d+\.?\d*|\.\d+)(?:px|em|rem|pt|%|vh|vw|ex|ch)?)/i);

    if (fontSizeMatch) {
        fontSizeIndex = fontSizeMatch.index + fontSizeMatch[1].length;
        mainPart = remaining.substring(0, fontSizeIndex);
        afterFontSize = remaining.substring(fontSizeIndex).trim();

        // Check if there's a line-height (comes after font-size with /)
        lineHeightMatch = afterFontSize.match(/^((?:\d+\.?\d*|\.\d+)(?:px|em|rem|pt|%|vh|vw|ex|ch|normal)?)\s*\/\s*((?:\d+\.?\d*|\.\d+)(?:px|em|rem|pt|%|vh|vw|ex|ch|normal)?)/i);
        if (lineHeightMatch) {
            result.fontSize = parseMeasureValue(lineHeightMatch[1]);
            result.lineHeight = parseMeasureValue(lineHeightMatch[2]);
            fontFamilyPart = afterFontSize.substring(lineHeightMatch[0].length).trim();
        } else {
            result.fontSize = parseMeasureValue(fontSizeMatch[2]);
            fontFamilyPart = afterFontSize;
        }
    }

    // Parse font family (everything after fontSize)
    if (fontFamilyPart) {
        result.fontFamily = fontFamilyPart.split(',').map(function(f) { return f.trim(); }).join(', ');
    }

    // Parse the main part (fontStyle, fontVariant, fontWeight, fontStretch)
    tokens = mainPart.trim().split(/\s+/);

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i].toLowerCase();

        // Font style
        if (['italic', 'oblique'].includes(token)) {
            result.fontStyle = token;
        }
        // Font variant
        else if (['small-caps'].includes(token)) {
            result.fontVariant = token;
        }
        // Font weight
        else if (['normal', 'bold', 'bolder', 'lighter'].includes(token)) {
            result.fontWeight = token;
        }
        else if (/^[1-9]00$/.test(token)) { // 100, 200, ..., 900
            result.fontWeight = parseInt(token);
        }
        // Font stretch
        else if (['ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed',
                  'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'].includes(token)) {
            result.fontStretch = token;
        }
    }

    // Remove null values from result
    var cleanResult = {};
    for (var key in result) {
        if (result[key] !== null) {
            cleanResult[key] = result[key];
        }
    }

    return cleanResult;
}


/**
 * Parses a CSS border shorthand value into per-side width/style/color properties for top/right/bottom/left.
 * @param {string} borderStr - The border string to parse (e.g., "1px solid blue")
 * @returns {Object} Object containing parsed border properties:
 *                   - borderTopWidth: parsed measurement value or null
 *                   - borderRightWidth: parsed measurement value or null
 *                   - borderBottomWidth: parsed measurement value or null
 *                   - borderLeftWidth: parsed measurement value or null
 *                   - borderStyle: parsed style value or null
 *                   - borderColor: parsed color value or null
 */
export function parseBorderValue(borderStr) {
    var styleKeywords, widthKeywords, result;
    var widths, styles, colors, tokens;
    var i, token, tokenLower;

    function tokenizeValue(text) {
        var out, buf, depth, j, ch;
        out = [];
        buf = '';
        depth = 0;
        for (j = 0; j < text.length; j++) {
            ch = text[j];
            if (/\s/.test(ch) && depth === 0) {
                if (buf) {
                    out.push(buf);
                    buf = '';
                }
                continue;
            }
            if (ch === '(') depth++;
            if (ch === ')' && depth > 0) depth--;
            buf += ch;
        }
        if (buf) out.push(buf);
        return out;
    }

    function isColor(txt) {
        if (txt.startsWith('#') || txt.startsWith('rgb') || txt.startsWith('hsl')) {
            return true;
        }
        return false;
    }

    if (!borderStr || typeof borderStr !== 'string') return {};

    styleKeywords = {
        none: true,
        hidden: true,
        dotted: true,
        dashed: true,
        solid: true,
        double: true,
        groove: true,
        ridge: true,
        inset: true,
        outset: true
    };

    widthKeywords = { thin: true, medium: true, thick: true };

    result = {};
    widths = [];
    styles = [];
    colors = [];
    tokens = tokenizeValue(borderStr.trim());

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        tokenLower = token.toLowerCase();
        if (styleKeywords[tokenLower]) {
            styles.push(token);
        }
        else if (isColor(token)) {
            colors.push(token);
        }
        else if (widthKeywords[tokenLower] || parseMeasureValue(token)) {
            widths.push(token);
        }
    }

    if (widths.length > 0) result.borderWidth = widths.join(' ');
    if (styles.length > 0) result.borderStyle = styles.join(' ');
    if (colors.length > 0) result.borderColor = colors.join(' ');

    return result;
}


export function parseGridTracks(value) {
    if (typeof value !== 'string') return null;
    value = value.trim();
    var inst  = CSSParser.parse(value, 'declaration_value');
    return inst.ast || null;
}
