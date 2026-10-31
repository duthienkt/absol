import TemplateString from "../JSMaker/TemplateString";

/**
 *
 * @param {number[]} rgba
 * @constructor
 */
function Color(rgba) {
    /**
     *
     * @type {number[]}
     */
    this.rgba = rgba.slice();
}

/***
 *
 * @returns {string}
 */
Color.prototype.toHex6 = function () {
    return this.rgba.slice(0, 3).map(function (b) {
        b = b * 255 >> 0;
        return (b < 16 ? '0' : '') + b.toString(16);
    }).join('');
};

/***
 *
 * @returns {string}
 */
Color.prototype.toHex8 = function () {
    return this.rgba.map(function (b) {
        b = b * 255 >> 0;
        return (b < 16 ? '0' : '') + b.toString(16);
    }).join('');
};

/***
 *
 * @returns {string}
 */
Color.prototype.toHex3 = function () {
    return this.rgba.slice(0, 3).map(function (b) {
        b = b * 255 / 17 >> 0;
        return b.toString(16);
    }).join('');
};

/***
 *
 * @returns {string}
 */
Color.prototype.toHex4 = function () {
    return this.rgba.map(function (b) {
        b = b * 255 / 17 >> 0;
        return b.toString(16);
    }).join('');
};

/***
 *
 * @returns {number[]}
 */
Color.prototype.toHSLA = function () {
    return Color.rgbaToHSLA(this.rgba);
};


/***
 *
 * @returns {number[]}
 */
Color.prototype.toHSBA = function () {
    return Color.rgbaToHSBA(this.rgba);
};


/***
 *
 * @returns {number[]}
 */
Color.prototype.toHWBA = function () {
    return Color.rgbaToHWBA(this.rgba);
};

/***
 *
 * @returns {number[]}
 */
Color.prototype.toCMYK = function () {
    return Color.rgbToCMYK(this.rgba);
};


/***
 *
 * @returns {Color}
 */
Color.prototype.getHighContrastColor = function () {
    var hsba = this.toHSBA();
    var h, s, b;
    h = hsba[0] > 0.5 ? hsba[0] - 0.5 : hsba[0] + 0.5;
    s = hsba[1] > 0.5 ? hsba[1] - 0.5 : hsba[1] + 0.5;
    b = hsba[2] > 0.5 ? hsba[2] - 0.5 : hsba[2] + 0.5;
    return Color.fromHSB(h, s, b);
};


Color.prototype.getHightContrastColor = Color.prototype.getHighContrastColor;

Color.prototype.getLuminance = function () {
    var a = this.rgba.slice(0, 3).map(function (v) {
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/***
 *
 * @param {Color} other
 * @returns {number}
 */
Color.prototype.getContrastWith = function (other) {
    var lum1 = this.getLuminance();
    var lum2 = other.getLuminance();
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
        / (darkest + 0.05);
};

/***
 *
 * @returns {Color}
 */
Color.prototype.getContrastYIQ = function () {
    var r = this.rgba[0] * 255;
    var g = this.rgba[1] * 255;
    var b = this.rgba[2] * 255;
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? new Color([0, 0, 0, 1]) : new Color([1, 1, 1, 1]);
};

/**
 *
 * @returns {Color}
 */
Color.prototype.clone = function () {
    return new Color(this.rgba.slice());
};

/**
 *
 * @param alpha
 * @returns {Color}
 */
Color.prototype.withAlpha = function (alpha) {
    if (typeof alpha !== 'number' || isNaN(alpha)) {
        alpha = 1;
    }
    alpha = Math.max(0, Math.min(1, alpha));
    return new Color(this.rgba.slice(0, 3).concat([alpha]));
};

/**
 * Blend this color with another color using alpha compositing.
 * @param {Color} other
 * @param {string=} mode
 * @returns {Color}
 */
Color.prototype.blend = function (other, mode) {
    const a1 = this.rgba[3];
    const a2 = other.rgba[3];
    const outA = a1 + a2 * (1 - a1);

    function blendChannel(c1, c2) {
        return (c1 * a1 + c2 * a2 * (1 - a1)) / (outA || 1);
    }

    const outR = blendChannel(this.rgba[0], other.rgba[0]);
    const outG = blendChannel(this.rgba[1], other.rgba[1]);
    const outB = blendChannel(this.rgba[2], other.rgba[2]);

    return new Color([outR, outG, outB, outA]);
};

/**
 *
 *  ['rgba', 'rgba', 'rgba({{x[0]*255>>0}}, {{x[1]*255>>0}}, {{x[2]*255>>0}}, {{x[3]}})'],
 *     ['rgb', 'rgba', 'rgb({{x[0]*255>>0}}, {{x[1]*255>>0}}, {{x[2]*255>>0}})'],
 *     ['hsl', 'toHSLA()', 'hsl({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
 *     ['hsla', 'toHSLA()', 'hsla({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
 *     ['hsb', 'toHSBA()', 'hsb({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
 *     ['hsba', 'toHSBA()', 'hsba({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
 *     ['hex3', 'toHex3()', '#{{x}}'],
 *     ['hex4', 'toHex4()', '#{{x}}'],
 *     ['hex6', 'toHex6()', '#{{x}}'],
 *     ['hex6', 'toHex8()', '#{{x}}'],
 *     ['hwb', 'toHWBA()', 'hwb({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
 *     ['hwba', 'toHWBA()', 'hwba({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})']
 *     ['cmyk', 'toCMYK()', 'hwba({{x[0] * 100%}}, {{x[1] * 100}}%, {{x[2] * 100}}%)']
 */
/****
 *
 * @param {"rgba"|"rgb"|"hsl"|"hsla"|"hsb"|"hsba"|"hex3"|"hex4"|"hex6"|"hex8"|"hwb"|"hwba"|"cmyk"=} mode
 * @returns {string}
 */
Color.prototype.toString = function (mode) {
    mode = mode || 'rgba';
    mode = mode.toLocaleLowerCase();
    return Color.templates[mode](this);
};

/***
 *
 * @param notStandard
 * @param {number[]} hsbWeight
 * @returns {Color}
 */
Color.prototype.nearestNamedColor = function (notStandard, hsbWeight) {
    hsbWeight = hsbWeight || [5, 3, 1]
    var hsba = this.toHSBA();
    var bestMatch = null;
    var dist = 1000;
    Object.keys(Color.namedColors).concat(notStandard ? Object.keys(Color.nonStandarNamedColors) : []).forEach(function (name) {
        var c = Color.parse(Color.namedColors[name] || Color.nonStandarNamedColors[name]);
        var cHSBA = c.toHSBA();
        var cDist = Math.abs(hsba[0] - cHSBA[0]) * hsbWeight[0] + Math.abs(hsba[1] - cHSBA[1]) * hsbWeight[1] + Math.abs(hsba[2] - cHSBA[2]) * hsbWeight[2];
        if (cDist < dist) {
            dist = cDist;
            bestMatch = name;
        }
    });
    return bestMatch;
};

Color.templates = [
    ['rgba', 'rgba', 'rgba({{x[0]*255>>0}}, {{x[1]*255>>0}}, {{x[2]*255>>0}}, {{x[3]}})'],
    ['rgb', 'rgba', 'rgb({{x[0]*255>>0}}, {{x[1]*255>>0}}, {{x[2]*255>>0}})'],
    ['hsl', 'toHSLA()', 'hsl({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
    ['hsla', 'toHSLA()', 'hsla({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
    ['hsb', 'toHSBA()', 'hsb({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
    ['hsba', 'toHSBA()', 'hsba({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
    ['hex3', 'toHex3()', '#{{x}}'],
    ['hex4', 'toHex4()', '#{{x}}'],
    ['hex6', 'toHex6()', '#{{x}}'],
    ['hex8', 'toHex8()', '#{{x}}'],
    ['hwb', 'toHWBA()', 'hwb({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
    ['hwba', 'toHWBA()', 'hwba({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
    ['cmyk', 'toCMYK()', 'cmyk({{x[0] * 100}}%, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3] * 100}}%)']
].reduce(function (ac, cr) {
    ac[cr[0]] = new Function('color', [
        'var x = color.' + cr[1] + ';',
        'return ' + TemplateString.parse(cr[2]).toJSCode() + ';'
    ].join('\n'));
    return ac;
}, {});


Color.regexes = {
    whiteSpace: /\s*/, // Match zero or more whitespace characters.
    integer: /(\d{1,3})/, // Match integers: 79, 255, etc.
    decimal: /((?:\d+(?:\.\d+)?)|(?:\.\d+))/, // Match 129.6, 79, .9, etc.
    percent: /((?:\d+(?:\.\d+)?)|(?:\.\d+))%/, // Match 12.9%, 79%, .9%, etc.
    hex3: /^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,

    // Match colors in format #XXXX, e.g. #5123.
    hex4: /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])$/i,

    // Match colors in format #XXXXXX, e.g. #b4d455.
    hex6: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,

    // Match colors in format #XXXXXXXX, e.g. #b4d45535.
    hex8: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i
};


Color.regexes.percent = new RegExp(Color.regexes.decimal.source + '%');

Color.regexes.rgb = new RegExp(
    [
        '^rgb\\(',
        Color.regexes.integer.source,
        ',',
        Color.regexes.integer.source,
        ',',
        Color.regexes.integer.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

Color.regexes.rgbPercent = new RegExp(
    [
        '^rgb\\(',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

// Match colors in format rgb(R, G, B, A), e.g. rgb(255, 0, 128, 0.25).
Color.regexes.rgba = new RegExp(
    [
        '^rgba\\(',
        Color.regexes.integer.source,
        ',',
        Color.regexes.integer.source,
        ',',
        Color.regexes.integer.source,
        ',',
        Color.regexes.decimal.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

// Match colors in format rgb(R%, G%, B%, A), e.g. rgb(100%, 0%, 28.9%, 0.5).
Color.regexes.rgbaPercent = new RegExp(
    [
        '^rgba\\(',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.decimal.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);
// Match colors in format hsla(H, S%, L%), e.g. hsl(100, 40%, 28.9%).
Color.regexes.hsl = new RegExp(
    [
        '^hsl\\(',
        Color.regexes.integer.source,
        '[deg]*',
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

// Match colors in format hsla(H, S%, L%, A), e.g. hsla(100, 40%, 28.9%, 0.5).
Color.regexes.hsla = new RegExp(
    [
        '^hsla\\(',
        Color.regexes.integer.source,
        '[deg]*',
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.decimal.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

// Match colors in format hsb(H, S%, B%), e.g. hsb(100, 40%, 28.9%).
Color.regexes.hsb = new RegExp(
    [
        '^hsb\\(',
        Color.regexes.integer.source,
        '[deg]*',
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

// Match colors in format hsba(H, S%, B%, A), e.g. hsba(100, 40%, 28.9%, 0.5).
Color.regexes.hsba = new RegExp(
    [
        '^hsba\\(',
        Color.regexes.integer.source,
        '[deg]*',
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.decimal.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

Color.regexes.hwb = new RegExp(
    [
        '^hwb\\(',
        Color.regexes.integer.source,
        '[deg]*',
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

// Match colors in format hsba(H, S%, B%, A), e.g. hsba(100, 40%, 28.9%, 0.5).
Color.regexes.hwba = new RegExp(
    [
        '^hwba\\(',
        Color.regexes.integer.source,
        '[deg]*',
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.decimal.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

Color.regexes.cmyk = new RegExp(
    [
        '^cmyk\\(',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        ',',
        Color.regexes.percent.source,
        '\\)$'
    ].join(Color.regexes.whiteSpace.source),
    'i'
);

/***
 *
 * @param {number} code
 * @param {32|24|16|8} bits
 * @returns {Color}
 */
Color.fromInt = function (code, bits) {
    var r, g, b, a;
    if (bits == 32) {
        b = (code & 0xff) / 255;
        g = ((code & 0xff00) >> 8) / 255;
        r = ((code & 0xff0000) >> 16) / 255;
        a = (code >> 24) / 255;
    }
    else if (bits == 24) {
        b = (code & 0xff) / 255;
        g = ((code & 0xff00) >> 8) / 255;
        r = ((code & 0xff0000) >> 16) / 255;
        a = 1;
    }
    else if (bits == 16) {
        b = (code & 0x1f) / 0x1f;
        g = ((code & 0x7e0) >> 5) / 0x3f;
        b = (code >> 10) / 0x1f;
        a = 1;
    }
    else if (bits == 8) {//gray-scale
        b = (code & 0x3) / 0x3;
        g = ((code & 0x1c) >> 2) / 0x7;
        b = (code >> 5) / 0x7;
        a = 1;
    }

    return new Color([r, g, b, a]);
};

/**
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {Color}
 */
Color.fromRGB = function (r, g, b) {
    return new Color([r, g, b, 1]);
};

/**
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 * @returns {Color}
 */
Color.fromRGBA = function (r, g, b, a) {
    return new Color([r, g, b, a]);
};

/***
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {Color}
 */
Color.fromHSL = function (h, s, l) {
    var rgba = this.hslaToRGBA([h, s, l, 1]);
    return new Color(rgba);
};

/***
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} a
 * @returns {Color}
 */
Color.fromHSLA = function (h, s, l, a) {
    var rgba = this.hslaToRGBA([h, s, l, a]);
    return new Color(rgba);
};

/***
 *
 * @param {number} h
 * @param {number} s
 * @param {number} b
 * @returns {Color}
 */
Color.fromHSB = function (h, s, b) {
    var rgba = this.hsbaToRGBA([h, s, b, 1]);
    return new Color(rgba);
};

/***
 *
 * @param {number} h
 * @param {number} s
 * @param {number} b
 * @param {number} a
 * @returns {Color}
 */
Color.fromHSBA = function (h, s, b, a) {
    var rgba = this.hsbaToRGBA([h, s, b, a]);
    return new Color(rgba);
};

/***
 *
 * @param {number} h
 * @param {number} s
 * @param {number} b
 * @returns {Color}
 */
Color.fromHWB = function (h, s, b) {
    var rgba = this.hwbaToRGBA([h, s, b, 1]);
    return new Color(rgba);
};

/***
 *
 * @param {number} h
 * @param {number} s
 * @param {number} b
 * @param {number} a
 * @returns {Color}
 */
Color.fromHWBA = function (h, s, b, a) {
    var rgba = this.hwbaToRGBA([h, s, b, a]);
    return new Color(rgba);
};

Color.fromCMYK = function (c, m, y, k) {
    var rgba = this.cmykToRGB([c, m, y, k]).concat([1]);
    return new Color(rgba);
};

function parseCssNumeric(token) {
    token = token.toLowerCase();
    if (token === 'none') return {value: 0, percent: false, unit: ''};
    var match = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|grad|rad|turn)?$/i.exec(token);
    if (!match) throw new Error('Invalid CSS color component: ' + token);
    return {value: parseFloat(match[1]), percent: match[2] === '%', unit: match[2] || ''};
}

function parseCssNumber(token, numberScale) {
    var parsed = parseCssNumeric(token);
    if (parsed.unit && parsed.unit !== '%') throw new Error('Unexpected unit in CSS color component: ' + token);
    return parsed.percent ? parsed.value / 100 : parsed.value / numberScale;
}

function parseCssPercentage(token) {
    var parsed = parseCssNumeric(token);
    if (parsed.unit && parsed.unit !== '%') throw new Error('Unexpected unit in CSS color component: ' + token);
    if (!parsed.percent && token.toLowerCase() !== 'none') throw new Error('Expected percentage in CSS color component: ' + token);
    return parsed.percent ? parsed.value / 100 : 0;
}

function parseCssUnitInterval(token) {
    var parsed = parseCssNumeric(token);
    if (parsed.unit && parsed.unit !== '%') throw new Error('Unexpected unit in CSS color component: ' + token);
    return parsed.percent ? parsed.value / 100 : parsed.value;
}

function clampCssUnit(value) {
    return Math.max(0, Math.min(1, value));
}

function parseCssAlpha(token) {
    return parseCssNumber(token, 1);
}

function parseCssAngle(token) {
    var parsed = parseCssNumeric(token);
    if (parsed.percent) throw new Error('Expected angle in CSS color component: ' + token);
    var degrees = parsed.value;
    if (parsed.unit === 'grad') degrees *= 0.9;
    else if (parsed.unit === 'rad') degrees *= 180 / Math.PI;
    else if (parsed.unit === 'turn') degrees *= 360;
    var turns = degrees / 360;
    return ((turns % 1) + 1) % 1;
}

function parseCssLabComponent(token, percentageScale) {
    var parsed = parseCssNumeric(token);
    if (parsed.unit && parsed.unit !== '%') throw new Error('Unexpected unit in CSS color component: ' + token);
    return parsed.percent ? parsed.value * percentageScale / 100 : parsed.value;
}

function decodeSrgb(value) {
    var sign = value < 0 ? -1 : 1;
    value = Math.abs(value);
    return sign * (value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4));
}

function encodeSrgb(value) {
    var sign = value < 0 ? -1 : 1;
    value = Math.abs(value);
    return sign * (value <= 0.0031308 ? value * 12.92 : 1.055 * Math.pow(value, 1 / 2.4) - 0.055);
}

function xyzD65ToLinearSrgb(xyz) {
    return [
        3.2409699419045216 * xyz[0] - 1.537383177570094 * xyz[1] - 0.4986107602930034 * xyz[2],
        -0.9692436362808798 * xyz[0] + 1.8759675015077202 * xyz[1] + 0.04155505740717559 * xyz[2],
        0.05563007969699361 * xyz[0] - 0.20397695888897652 * xyz[1] + 1.0569715142428786 * xyz[2]
    ];
}

function xyzD50ToLinearSrgb(xyz) {
    return xyzD65ToLinearSrgb([
        0.9555766 * xyz[0] - 0.0230393 * xyz[1] + 0.0631636 * xyz[2],
        -0.0282895 * xyz[0] + 1.0099416 * xyz[1] + 0.0210077 * xyz[2],
        0.0122982 * xyz[0] - 0.020483 * xyz[1] + 1.3299098 * xyz[2]
    ]);
}

function labToXyzD50(lightness, a, b) {
    var fy = (lightness + 16) / 116;
    var fx = fy + a / 500;
    var fz = fy - b / 200;
    var delta = 6 / 29;
    function inverse(value) {
        return value > delta ? value * value * value : 3 * delta * delta * (value - 4 / 29);
    }
    return [
        0.96422 * inverse(fx),
        inverse(fy),
        0.82521 * inverse(fz)
    ];
}

function oklabToLinearSrgb(lightness, a, b) {
    var l = Math.pow(lightness + 0.3963377774 * a + 0.2158037573 * b, 3);
    var m = Math.pow(lightness - 0.1055613458 * a - 0.0638541728 * b, 3);
    var s = Math.pow(lightness - 0.0894841775 * a - 1.291485548 * b, 3);
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    ];
}

function linearSrgbToRgba(rgb, alpha) {
    return [encodeSrgb(rgb[0]), encodeSrgb(rgb[1]), encodeSrgb(rgb[2]), alpha];
}

function parseCssLabColor(name, components, alpha) {
    var lch = name === 'lch' || name === 'oklch';
    var oklab = name === 'oklab' || name === 'oklch';
    var lightnessScale = oklab ? 1 : 100;
    var chromaScale = oklab ? 0.4 : 150;
    var lightness = parseCssLabComponent(components[0], lightnessScale);
    var second = parseCssLabComponent(components[1], lch ? chromaScale : (oklab ? 0.4 : 125));
    var third;
    if (lch) {
        var hue = parseCssAngle(components[2]) * 2 * Math.PI;
        third = second * Math.sin(hue);
        second = second * Math.cos(hue);
    }
    else {
        third = parseCssLabComponent(components[2], oklab ? 0.4 : 125);
    }
    var rgb = oklab
        ? oklabToLinearSrgb(lightness, second, third)
        : xyzD50ToLinearSrgb(labToXyzD50(lightness, second, third));
    return linearSrgbToRgba(rgb, alpha);
}

function parseCssColorSpace(space, components, alpha) {
    var values = components.map(function (component) {
        var parsed = parseCssNumeric(component);
        if (parsed.unit && parsed.unit !== '%') throw new Error('Unexpected unit in color() component: ' + component);
        return parsed.percent ? parsed.value / 100 : parsed.value;
    });
    var r = values[0], g = values[1], b = values[2];
    var xyz;
    var linear;
    if (space === 'srgb') return [r, g, b, alpha];
    if (space === 'srgb-linear') return linearSrgbToRgba(values, alpha);
    if (space === 'display-p3') {
        linear = [decodeSrgb(r), decodeSrgb(g), decodeSrgb(b)];
        xyz = [
            0.4865709486482162 * linear[0] + 0.26566769316909306 * linear[1] + 0.1982172852343625 * linear[2],
            0.2289745640697488 * linear[0] + 0.6917385218365064 * linear[1] + 0.079286914093745 * linear[2],
            0.04511338185890264 * linear[1] + 1.043944368900976 * linear[2]
        ];
        return linearSrgbToRgba(xyzD65ToLinearSrgb(xyz), alpha);
    }
    if (space === 'a98-rgb') {
        function decodeA98(value) {
            return (value < 0 ? -1 : 1) * Math.pow(Math.abs(value), 563 / 256);
        }
        linear = [decodeA98(r), decodeA98(g), decodeA98(b)];
        xyz = [
            0.5767309 * linear[0] + 0.185554 * linear[1] + 0.1881852 * linear[2],
            0.2973769 * linear[0] + 0.6273491 * linear[1] + 0.0752741 * linear[2],
            0.0270343 * linear[0] + 0.0706872 * linear[1] + 0.9911085 * linear[2]
        ];
        return linearSrgbToRgba(xyzD65ToLinearSrgb(xyz), alpha);
    }
    if (space === 'prophoto-rgb') {
        function decodeProphoto(value) {
            var sign = value < 0 ? -1 : 1;
            value = Math.abs(value);
            return sign * (value <= 16 / 512 ? value / 16 : Math.pow(value, 1.8));
        }
        linear = [decodeProphoto(r), decodeProphoto(g), decodeProphoto(b)];
        xyz = [
            0.7977666449 * linear[0] + 0.1351812974 * linear[1] + 0.0313477341 * linear[2],
            0.2880748288 * linear[0] + 0.7118352348 * linear[1] + 0.0000899364 * linear[2],
            0.8251046025 * linear[2]
        ];
        return linearSrgbToRgba(xyzD50ToLinearSrgb(xyz), alpha);
    }
    if (space === 'rec2020') {
        function decodeRec2020(value) {
            var sign = value < 0 ? -1 : 1;
            value = Math.abs(value);
            return sign * (value < 4.5 * 0.018053968510807 ? value / 4.5 : Math.pow((value + 0.09929682680944) / 1.09929682680944, 1 / 0.45));
        }
        linear = [decodeRec2020(r), decodeRec2020(g), decodeRec2020(b)];
        xyz = [
            0.6369580483 * linear[0] + 0.1446169036 * linear[1] + 0.1688809752 * linear[2],
            0.262700212 * linear[0] + 0.6779980715 * linear[1] + 0.0593017165 * linear[2],
            0.028072693 * linear[1] + 1.0609850577 * linear[2]
        ];
        return linearSrgbToRgba(xyzD65ToLinearSrgb(xyz), alpha);
    }
    if (space === 'xyz-d50') return linearSrgbToRgba(xyzD50ToLinearSrgb(values), alpha);
    if (space === 'xyz' || space === 'xyz-d65') return linearSrgbToRgba(xyzD65ToLinearSrgb(values), alpha);
    throw new Error('Unsupported CSS color space: ' + space);
}

/**
 * @param {String} text
 * @returns {Color}
 */
Color.parse = function (text) {
    if (typeof text !== 'string') text = text + '';
    text = text.trim().toLowerCase();
    var namedColor = Object.prototype.hasOwnProperty.call(this.namedColors, text)
        ? this.namedColors[text]
        : Object.prototype.hasOwnProperty.call(this.nonStandarNamedColors, text)
            ? this.nonStandarNamedColors[text]
            : null;
    if (namedColor) text = namedColor;

    var hex = /^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.exec(text);
    if (hex) {
        var digits = hex[1];
        if (digits.length <= 4) digits = digits.split('').map(function (digit) {
            return digit + digit;
        }).join('');
        var channels = digits.match(/.{2}/g).map(function (channel) {
            return parseInt(channel, 16) / 255;
        });
        if (channels.length === 3) channels.push(1);
        return new Color(channels);
    }

    var colorFunction = /^([a-z][a-z0-9-]*)\((.*)\)$/i.exec(text);
    if (!colorFunction) throw new Error('Fail to parse ' + text);
    var name = colorFunction[1];
    var body = colorFunction[2].trim();
    var slashParts = body.split('/');
    if (slashParts.length > 2) throw new Error('Fail to parse ' + text);
    var alpha = 1;
    if (slashParts.length === 2) alpha = parseCssAlpha(slashParts[1].trim());
    var componentText = slashParts[0].trim();
    var commaSyntax = componentText.indexOf(',') >= 0;
    if (commaSyntax && slashParts.length > 1) throw new Error('Fail to parse ' + text);
    var components = commaSyntax
        ? componentText.split(',').map(function (part) { return part.trim(); })
        : componentText.split(/\s+/);
    if (components.some(function (part) { return !part; })) throw new Error('Fail to parse ' + text);

    var legacyFourPart = commaSyntax && (name === 'rgba' || name === 'hsla' || name === 'hsba' || name === 'hwba');
    if (legacyFourPart) {
        if (components.length !== 4) throw new Error('Fail to parse ' + text);
        alpha = parseCssAlpha(components.pop());
    }
    else if (commaSyntax && components.length !== 3 && name !== 'cmyk' && name !== 'device-cmyk') {
        throw new Error('Fail to parse ' + text);
    }

    var rgba;
    if (name === 'rgb' || name === 'rgba') {
        if (components.length !== 3) throw new Error('Fail to parse ' + text);
        rgba = components.map(function (component) {
            return parseCssNumber(component, 255);
        });
    }
    else if (name === 'hsl' || name === 'hsla') {
        if (components.length !== 3) throw new Error('Fail to parse ' + text);
        rgba = Color.hslaToRGBA([
            parseCssAngle(components[0]),
            clampCssUnit(parseCssPercentage(components[1])),
            clampCssUnit(parseCssPercentage(components[2])),
            alpha
        ]);
    }
    else if (name === 'hsb' || name === 'hsba') {
        if (components.length !== 3) throw new Error('Fail to parse ' + text);
        rgba = Color.hsbaToRGBA([
            parseCssAngle(components[0]),
            clampCssUnit(parseCssPercentage(components[1])),
            clampCssUnit(parseCssPercentage(components[2])),
            alpha
        ]);
    }
    else if (name === 'hwb' || name === 'hwba') {
        if (components.length !== 3) throw new Error('Fail to parse ' + text);
        var hue = parseCssAngle(components[0]);
        var whiteness = clampCssUnit(parseCssPercentage(components[1]));
        var blackness = clampCssUnit(parseCssPercentage(components[2]));
        if (whiteness + blackness >= 1) {
            var gray = whiteness / (whiteness + blackness);
            rgba = [gray, gray, gray, alpha];
        }
        else {
            var pureHue = Color.hslaToRGBA([hue, 1, 0.5, alpha]);
            var factor = 1 - whiteness - blackness;
            rgba = [
                pureHue[0] * factor + whiteness,
                pureHue[1] * factor + whiteness,
                pureHue[2] * factor + whiteness,
                alpha
            ];
        }
    }
    else if (name === 'lab' || name === 'lch' || name === 'oklab' || name === 'oklch') {
        if (components.length !== 3) throw new Error('Fail to parse ' + text);
        rgba = parseCssLabColor(name, components, alpha);
    }
    else if (name === 'color') {
        if (components.length !== 4) throw new Error('Fail to parse ' + text);
        rgba = parseCssColorSpace(components[0], components.slice(1), alpha);
    }
    else if (name === 'cmyk' || name === 'device-cmyk') {
        if (components.length !== 4) throw new Error('Fail to parse ' + text);
        var cmyk = components.map(function (component) {
            return clampCssUnit(name === 'device-cmyk'
                ? parseCssUnitInterval(component)
                : parseCssPercentage(component));
        });
        rgba = Color.cmykToRGB(cmyk).concat([alpha]);
    }
    else {
        throw new Error('Fail to parse ' + text);
    }

    rgba = rgba.map(function (channel) {
        if (!isFinite(channel)) throw new Error('Fail to parse ' + text);
        return Math.max(0, Math.min(1, channel));
    });
    rgba[3] = Math.max(0, Math.min(1, alpha));
    return new Color(rgba);
};

/***
 * @typedef {"aliceblue"|"antiquewhite"|"aqua"|"aquamarine"|"azure"|"beige"|"bisque"|"black"|"blanchedalmond"|"blue"|"blueviolet"|"brown"|"burlywood"|"cadetblue"|"chartreuse"|"chocolate"|"coral"|"cornflowerblue"|"cornsilk"|"crimson"|"cyan"|"darkblue"|"darkcyan"|"darkgoldenrod"|"darkgray"|"darkgreen"|"darkgrey"|"darkkhaki"|"darkmagenta"|"darkolivegreen"|"darkorange"|"darkorchid"|"darkred"|"darksalmon"|"darkseagreen"|"darkslateblue"|"darkslategray"|"darkslategrey"|"darkturquoise"|"darkviolet"|"deeppink"|"deepskyblue"|"dimgray"|"dimgrey"|"dodgerblue"|"firebrick"|"floralwhite"|"forestgreen"|"fuchsia"|"gainsboro"|"ghostwhite"|"gold"|"goldenrod"|"gray"|"green"|"greenyellow"|"grey"|"honeydew"|"hotpink"|"indianred"|"indigo"|"ivory"|"khaki"|"lavender"|"lavenderblush"|"lawngreen"|"lemonchiffon"|"lightblue"|"lightcoral"|"lightcyan"|"lightgoldenrodyellow"|"lightgray"|"lightgreen"|"lightgrey"|"lightpink"|"lightsalmon"|"lightseagreen"|"lightskyblue"|"lightslategray"|"lightslategrey"|"lightsteelblue"|"lightyellow"|"lime"|"limegreen"|"linen"|"magenta"|"maroon"|"mediumaquamarine"|"mediumblue"|"mediumorchid"|"mediumpurple"|"mediumseagreen"|"mediumslateblue"|"mediumspringgreen"|"mediumturquoise"|"mediumvioletred"|"midnightblue"|"mintcream"|"mistyrose"|"moccasin"|"navajowhite"|"navy"|"oldlace"|"olive"|"olivedrab"|"orange"|"orangered"|"orchid"|"palegoldenrod"|"palegreen"|"paleturquoise"|"palevioletred"|"papayawhip"|"peachpuff"|"peru"|"pink"|"plum"|"powderblue"|"purple"|"red"|"rosybrown"|"royalblue"|"saddlebrown"|"salmon"|"sandybrown"|"seagreen"|"seashell"|"sienna"|"silver"|"skyblue"|"slateblue"|"slategray"|"slategrey"|"snow"|"springgreen"|"steelblue"|"tan"|"teal"|"thistle"|"tomato"|"turquoise"|"violet"|"wheat"|"white"|"whitesmoke"|"yellow"|"yellowgreen"|"transparent"} NamedColor
 */

Color.namedColors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#ff0000',
    rebeccapurple: '#663399',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
    transparent: '#00000000'
};

Color.nonStandarNamedColors = {
    night: '#0C090A',
    gunmetal: '#2C3539',
    midnight: '#2B1B17',
    charcoal: '#34282C',
    oil: '#3B3131',
    blackcat: '#413839',
    iridium: '#3D3C3A',
    blackeel: '#463E3F',
    blackcow: '#4C4646',
    graywolf: '#504A4B',
    vampiregray: '#565051',
    graydolphin: '#5C5858',
    carbongray: '#625D5D',
    ashgray: '#666362',
    cloudygray: '#6D6968',
    smokeygray: '#726E6D',
    granite: '#837E7C',
    battleshipgray: '#848482',
    graycloud: '#B6B6B4',
    graygoose: '#D1D0CE',
    platinum: '#E5E4E2',
    metallicsilver: '#BCC6CC',
    bluegray: '#98AFC7',
    raven: '#657383',
    jetgray: '#616D7E',
    mistblue: '#646D7E',
    marbleblue: '#566D7E',
    shipcove: '#737CA1',
    mariner: '#4863A0',
    bluejay: '#2B547E',
    biscay: '#2B3856',
    navyblue: '#000080',
    bluewhale: '#342D7E',
    lapisblue: '#15317E',
    denimdarkblue: '#151B8D',
    earthblue: '#0000A0',
    cobaltblue: '#0020C2',
    blueberryblue: '#0041C2',
    sapphireblue: '#2554C7',
    blueeyes: '#1569C7',
    blueorchid: '#1F45FC',
    bluelotus: '#6960EC',
    lightslateblue: '#736AFF',
    windowsblue: '#357EC7',
    glacialblueice: '#368BC1',
    silkblue: '#488AC7',
    blueivy: '#3090C7',
    bluekoi: '#659EC7',
    columbiablue: '#87AFC7',
    babyblue: '#95B9C7',
    oceanblue: '#2B65EC',
    blueribbon: '#306EFF',
    bluedress: '#157DEC',
    butterflyblue: '#38ACEC',
    iceberg: '#56A5EC',
    crystalblue: '#5CB3FF',
    denimblue: '#79BAEC',
    dayskyblue: '#82CAFF',
    jeansblue: '#A0CFEC',
    blueangel: '#B7CEEC',
    pastelblue: '#B4CFEC',
    seablue: '#C2DFFF',
    coralblue: '#AFDCEC',
    robineggblue: '#BDEDFF',
    palebluelily: '#CFECEC',
    water: '#EBF4FA',
    lightslate: '#CCFFFF',
    lightaquamarine: '#93FFE8',
    electricblue: '#9AFEFF',
    cyanoraqua: '#00FFFF',
    tronblue: '#7DFDFE',
    bluezircon: '#57FEFF',
    bluelagoon: '#8EEBEC',
    celeste: '#50EBEC',
    bluediamond: '#4EE2EC',
    tiffanyblue: '#81D8D0',
    cyanopaque: '#92C7C7',
    bluehosta: '#77BFC7',
    northernlightsblue: '#78C7C7',
    jellyfish: '#46C7C7',
    bluegreen: '#7BCCB5',
    macawbluegreen: '#43BFC7',
    seaturtlegreen: '#438D80',
    greenishblue: '#307D7E',
    grayishturquoise: '#5E7D7E',
    beetlegreen: '#4C787E',
    camouflagegreen: '#78866B',
    sagegreen: '#848b79',
    hazelgreen: '#617C58',
    venomgreen: '#728C00',
    ferngreen: '#667C26',
    darkforestgreen: '#254117',
    mediumforestgreen: '#347235',
    seaweedgreen: '#437C17',
    pinegreen: '#387C44',
    junglegreen: '#347C2C',
    shamrockgreen: '#347C17',
    greenonion: '#6AA121',
    clovergreen: '#3EA055',
    greensnake: '#6CBB3C',
    aliengreen: '#6CC417',
    greenapple: '#4CC417',
    kellygreen: '#4CC552',
    zombiegreen: '#54C571',
    froggreen: '#99C68E',
    greenpeas: '#89C35C',
    dollarbillgreen: '#85BB65',
    iguanagreen: '#9CB071',
    avocadogreen: '#B2C248',
    pistachiogreen: '#9DC209',
    saladgreen: '#A1C935',
    hummingbirdgreen: '#7FE817',
    nebulagreen: '#59E817',
    stoplightgogreen: '#57E964',
    algaegreen: '#64E986',
    jadegreen: '#5EFB6E',
    emeraldgreen: '#5FFB17',
    dragongreen: '#6AFB92',
    mintgreen: '#98FF98',
    greenthumb: '#B5EAAA',
    lightjade: '#C3FDB8',
    teagreen: '#CCFB5D',
    slimegreen: '#BCE954',
    harvestgold: '#EDE275',
    sunyellow: '#FFE87C',
    cornyellow: '#FFF380',
    parchment: '#FFFFC2',
    cream: '#FFFFCC',
    blonde: '#FBF6D9',
    champagne: '#F7E7CE',
    vanilla: '#F3E5AB',
    tanbrown: '#ECE5B6',
    peach: '#FFE5B4',
    mustard: '#FFDB58',
    rubberduckyyellow: '#FFD801',
    brightgold: '#FDD017',
    goldenbrown: '#EAC117',
    macaroniandcheese: '#F2BB66',
    saffron: '#FBB917',
    beer: '#FBB117',
    cantaloupe: '#FFA62F',
    beeyellow: '#E9AB17',
    brownsugar: '#E2A76F',
    deeppeach: '#FFCBA4',
    gingerbrown: '#C9BE62',
    schoolbusyellow: '#E8A317',
    fallleafbrown: '#C8B560',
    orangegold: '#D4A017',
    sand: '#C2B280',
    cookiebrown: '#C7A317',
    caramel: '#C68E17',
    brass: '#B5A642',
    camelbrown: '#C19A6B',
    bronze: '#CD7F32',
    tigerorange: '#C88141',
    cinnamon: '#C58917',
    bulletshell: '#AF9B60',
    copper: '#B87333',
    wood: '#966F33',
    oakbrown: '#806517',
    armybrown: '#827B60',
    sandstone: '#786D5F',
    mocha: '#493D26',
    taupe: '#483C32',
    coffee: '#6F4E37',
    brownbear: '#835C3B',
    reddirt: '#7F5217',
    sepia: '#7F462C',
    orangesalmon: '#C47451',
    rust: '#C36241',
    redfox: '#C35817',
    sedona: '#CC6600',
    papayaorange: '#E56717',
    halloweenorange: '#E66C2C',
    pumpkinorange: '#F87217',
    constructionconeorange: '#F87431',
    sunriseorange: '#E67451',
    mangoorange: '#FF8040',
    basketballorange: '#F88158',
    tangerine: '#E78A61',
    beanred: '#F75D59',
    valentinered: '#E55451',
    shockingorange: '#E55B3C',
    scarlet: '#FF2400',
    rubyred: '#F62217',
    ferrarired: '#F70D1A',
    fireenginered: '#F62817',
    lavared: '#E42217',
    lovered: '#E41B17',
    grapefruit: '#DC381F',
    chestnutred: '#C34A2C',
    cherryred: '#C24641',
    mahogany: '#C04000',
    chillipepper: '#C11B17',
    cranberry: '#9F000F',
    redwine: '#990012',
    burgundy: '#8C001A',
    chestnut: '#954535',
    bloodred: '#7E3517',
    sangria: '#7E3817',
    plumpie: '#7D0541',
    velvetmaroon: '#7E354D',
    plumvelvet: '#7D0552',
    rosyfinch: '#7F4E52',
    puce: '#7F5A58',
    dullpurple: '#7F525D',
    khakirose: '#C5908E',
    pinkbow: '#C48189',
    lipstickpink: '#C48793',
    rose: '#E8ADAA',
    rosegold: '#ECC5C0',
    desertsand: '#EDC9AF',
    pigpink: '#FDD7E4',
    cottoncandy: '#FCDFFF',
    pinkbubblegum: '#FFDFDD',
    flamingopink: '#F9A7B0',
    pinkrose: '#E7A1B0',
    pinkdaisy: '#E799A3',
    cadillacpink: '#E38AAE',
    carnationpink: '#F778A1',
    blushred: '#E56E94',
    watermelonpink: '#FC6C85',
    violetred: '#F6358A',
    pinkcupcake: '#E45E9D',
    pinklemonade: '#E4287C',
    neonpink: '#F535AA',
    dimorphothecamagenta: '#E3319D',
    brightneonpink: '#F433FF',
    tulippink: '#C25A7C',
    roguepink: '#C12869',
    burntpink: '#C12267',
    bashfulpink: '#C25283',
    darkcarnationpink: '#C12283',
    violapurple: '#7E587E',
    purpleiris: '#571B7E',
    plumpurple: '#583759',
    purplemonster: '#461B7E',
    purplehaze: '#4E387E',
    eggplant: '#614051',
    grape: '#5E5A80',
    purplejam: '#6A287E',
    purpleflower: '#A74AC7',
    purpleamethyst: '#6C2DC7',
    purplesagebush: '#7A5DC7',
    lovelypurple: '#7F38EC',
    aztechpurple: '#893BFF',
    jasminepurple: '#A23BEC',
    purpledaffodil: '#B041FF',
    tyrianpurple: '#C45AEC',
    crocuspurple: '#9172EC',
    purplemimosa: '#9E7BFF',
    heliotropepurple: '#D462FF',
    purpledragon: '#C38EC7',
    lilac: '#C8A2C8',
    blushpink: '#E6A9EC',
    mauve: '#E0B0FF',
    wisteriapurple: '#C6AEC7',
    blossompink: '#F9B7FF',
    periwinkle: '#E9CFEC',
    lavenderpinocchio: '#EBDDE2',
    lavenderblue: '#E3E4FA',
    pearl: '#FDEEF4',
    milkwhite: '#FEFCFF'
};

/********************** COLOR CONVERTER *******************/


Color.rgbToHex = function (rgb) {
    return '#' + rgb.slice(0, 3).map(function (c) {
        var res = ((c * 255) >> 0).toString(16);
        if (res < 10) res = '0' + res;
        return res.toUpperCase();
    }).join('');
};

Color.rgbaToHex = function (rgb) {
    return '#' + rgb.map(function (c) {
        var res = ((c * 255) >> 0).toString(16);
        if (res < 10) res = '0' + res;
        return res.toUpperCase();
    }).join('');
};

Color.hsbaToText = function (hsba) {
    return 'hsba(' + (hsba[0] * 360 >> 0) + 'deg, ' + (hsba[1] * 100 >> 0) + '%, ' + (hsba[2] * 100 >> 0) + '%, ' + (hsba[3].toFixed(3)) + ')';
};

Color.hslaToText = function (hsla) {
    return 'hsla(' + (hsla[0] * 360 >> 0) + 'deg, ' + (hsla[1] * 100 >> 0) + '%, ' + (hsla[2] * 100 >> 0) + '%, ' + (hsla[3].toFixed(3)) + ')';
};

Color.rgbaToText = function (rgba) {
    return 'rgba(' + (rgba[0] * 255 >> 0) + ', ' + (rgba[1] * 255 >> 0) + ', ' + (rgba[2] * 255 >> 0) + ', ' + (rgba[3].toFixed(3)) + ')';
};

Color.hsbToText = function (hsba) {
    return 'hsb(' + (hsba[0] * 360 >> 0) + 'deg, ' + (hsba[1] * 100 >> 0) + '%, ' + (hsba[2] * 100 >> 0) + '%)';
};

Color.hslToText = function (hsl) {
    return 'hsl(' + (hsl[0] * 360 >> 0) + 'deg, ' + (hsl[1] * 100 >> 0) + '%, ' + (hsl[2] * 100 >> 0) + '%)';
};

Color.rgbToText = function (rgba) {
    return 'rgb(' + (rgba[0] * 255 >> 0) + ', ' + (rgba[1] * 255 >> 0) + ', ' + (rgba[2] * 255 >> 0) + ')';
};

Color.cmykToText = function (cmyk) {
    return 'cmyk(' + cmyk.map(function (x) {
        return x * 100 + '%'
    }).join(', ') + ')';
};

Color.hsbaToHSLA = function (hsba) {
    var hue = hsba[0];
    var sat = hsba[1];
    var val = hsba[2];

    // Calculate lightness.
    var li = (2 - sat) * val / 2;

    // Convert saturation.
    if (li !== 0) {
        if (li === 1) {
            sat = 0;
        }
        else if (li < 0.5) {
            sat = sat / (2 - sat);
        }
        else {
            sat = sat * val / (2 - li * 2);
        }
    }

    // Hue and alpha stay the same.
    return [hue, sat, li, hsba[3]];
};

Color.hsbaToRGBA = function (hsba) {
    var hue = hsba[0] * 6; // We will split hue into 6 sectors.
    var sat = hsba[1];
    var val = hsba[2];

    var RGBA = [];

    if (sat === 0) {
        RGBA = [val, val, val, hsba[3]]; // Return early if grayscale.
    }
    else {
        var sector = Math.floor(hue);
        var tint1 = val * (1 - sat);
        var tint2 = val * (1 - sat * (hue - sector));
        var tint3 = val * (1 - sat * (1 + sector - hue));
        var red, green, blue;
        if (sector === 1) {
            // Yellow to green.
            red = tint2;
            green = val;
            blue = tint1;
        }
        else if (sector === 2) {
            // Green to cyan.
            red = tint1;
            green = val;
            blue = tint3;
        }
        else if (sector === 3) {
            // Cyan to blue.
            red = tint1;
            green = tint2;
            blue = val;
        }
        else if (sector === 4) {
            // Blue to magenta.
            red = tint3;
            green = tint1;
            blue = val;
        }
        else if (sector === 5) {
            // Magenta to red.
            red = val;
            green = tint1;
            blue = tint2;
        }
        else {
            // Red to yellow (sector could be 0 or 6).
            red = val;
            green = tint3;
            blue = tint1;
        }
        RGBA = [red, green, blue, hsba[3]];
    }
    return RGBA;
};


Color.hslaToHSBA = function (hsla) {
    var hue = hsla[0];
    var sat = hsla[1];
    var li = hsla[2];

    // Calculate brightness.
    var val;
    if (li < 0.5) {
        val = (1 + sat) * li;
    }
    else {
        val = li + sat - li * sat;
    }

    // Convert saturation.
    sat = 2 * (val - li) / val;

    // Hue and alpha stay the same.
    return [hue, sat, val, hsla[3]];
};

Color.hslaToRGBA = function (hsla) {
    var hue = hsla[0] * 6; // We will split hue into 6 sectors.
    var sat = hsla[1];
    var li = hsla[2];

    var RGBA = [];

    if (sat === 0) {
        RGBA = [li, li, li, hsla[3]]; // Return early if grayscale.
    }
    else {
        // Calculate brightness.
        var val;
        if (li < 0.5) {
            val = (1 + sat) * li;
        }
        else {
            val = li + sat - li * sat;
        }

        // Define zest.
        var zest = 2 * li - val;

        // Implement projection (project onto green by default).
        var hzvToRGB = function (hue, zest, val) {
            if (hue < 0) {
                // Hue must wrap to allow projection onto red and blue.
                hue += 6;
            }
            else if (hue >= 6) {
                hue -= 6;
            }
            if (hue < 1) {
                // Red to yellow (increasing green).
                return zest + (val - zest) * hue;
            }
            else if (hue < 3) {
                // Yellow to cyan (greatest green).
                return val;
            }
            else if (hue < 4) {
                // Cyan to blue (decreasing green).
                return zest + (val - zest) * (4 - hue);
            }
            else {
                // Blue to red (least green).
                return zest;
            }
        };

        // Perform projections, offsetting hue as necessary.
        RGBA = [
            hzvToRGB(hue + 2, zest, val),
            hzvToRGB(hue, zest, val),
            hzvToRGB(hue - 2, zest, val),
            hsla[3]
        ];
    }

    return RGBA;
};


Color.rgbaToHSBA = function (rgba) {
    var red = rgba[0];
    var green = rgba[1];
    var blue = rgba[2];

    var val = Math.max(red, green, blue);
    var chroma = val - Math.min(red, green, blue);

    var hue, sat;
    if (chroma === 0) {
        // Return early if grayscale.
        hue = 0;
        sat = 0;
    }
    else {
        sat = chroma / val;
        if (red === val) {
            // Magenta to yellow.
            hue = (green - blue) / chroma;
        }
        else if (green === val) {
            // Yellow to cyan.
            hue = 2 + (blue - red) / chroma;
        }
        else if (blue === val) {
            // Cyan to magenta.
            hue = 4 + (red - green) / chroma;
        }
        if (hue < 0) {
            // Confine hue to the interval [0, 1).
            hue += 6;
        }
        else if (hue >= 6) {
            hue -= 6;
        }
    }

    return [hue / 6, sat, val, rgba[3]];
};

Color.rgbaToHSLA = function (rgba) {
    var red = rgba[0];
    var green = rgba[1];
    var blue = rgba[2];

    var val = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var li = val + min; // We will halve this later.
    var chroma = val - min;

    var hue, sat;
    if (chroma === 0) {
        // Return early if grayscale.
        hue = 0;
        sat = 0;
    }
    else {
        if (li < 1) {
            sat = chroma / li;
        }
        else {
            sat = chroma / (2 - li);
        }
        if (red === val) {
            // Magenta to yellow.
            hue = (green - blue) / chroma;
        }
        else if (green === val) {
            // Yellow to cyan.
            hue = 2 + (blue - red) / chroma;
        }
        else if (blue === val) {
            // Cyan to magenta.
            hue = 4 + (red - green) / chroma;
        }
        if (hue < 0) {
            // Confine hue to the interval [0, 1).
            hue += 6;
        }
        else if (hue >= 6) {
            hue -= 6;
        }
    }

    return [hue / 6, sat, li / 2, rgba[3]];
};


Color.hwbaToHSBA = function (hwba) {
    return [hwba[0], 1 - hwba[1] / (1 - hwba[2]), 1 - hwba[2], hwba[3]];
};

Color.hsbaToHWBA = function (hsla) {
    return [hsla[0], (1 - hsla[1]) * hsla[2], 1 - hsla[2], hsla[3]];
};


Color.rgbaToHWBA = function (rgba) {
    return this.hsbaToHWBA(this.rgbaToHSBA(rgba));
};

Color.hwbaToRGBA = function (hwba) {
    return this.hsbaToRGBA(this.hwbaToHSBA(hwba));
};


Color.cmykToRGB = function (cmyk) {
    var c = cmyk[0];
    var m = cmyk[1];
    var y = cmyk[2];
    var k = cmyk[3];
    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;

    var r = 1 - c;
    var g = 1 - m;
    var b = 1 - y;
    return [r, g, b];
};


Color.rgbToCMYK = function (rgb) {
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];


    var c = 1 - r;
    var m = 1 - g;
    var y = 1 - b;
    var k = Math.min(c, Math.min(m, y));

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    c = isNaN(c) ? 0 : c;
    m = isNaN(m) ? 0 : m;
    y = isNaN(y) ? 0 : y;
    k = isNaN(k) ? 0 : k;

    return [c, m, y, k];
};


export default Color;