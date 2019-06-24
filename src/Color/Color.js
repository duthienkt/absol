import TemplateString from "../JSMaker/TemplateString";

function Color(bytes) {
    this.bytes = bytes.slice();
};



Color.prototype.toHex6 = function () {
    return this.bytes.slice(0, 3).map(function (b) {
        b = b * 255 >> 0;
        return (b < 16 ? '0' : '') + b.toString(16);
    }).join('')
};

Color.prototype.toHex8 = function () {
    return this.bytes.map(function (b) {
        b = b * 255 >> 0;
        return (b < 16 ? '0' : '') + b.toString(16);
    }).join('')
};

Color.prototype.toHex3 = function () {
    return this.bytes.slice(0, 3).map(function (b) {
        b = b * 255 / 17 >> 0;
        return b.toString(16);
    }).join('')
};

Color.prototype.toHex4 = function () {
    return this.bytes.map(function (b) {
        b = b * 255 / 17 >> 0;
        return b.toString(16);
    }).join('')
};


Color.prototype.toHSLA = function () {
    return Color.rgbaToHSLA(this.bytes);
};


Color.prototype.toHSBA = function () {
    return Color.rgbaToHSBA(this.bytes);
};

Color.prototype.toHWBA = function () {
    return Color.rgbaToHWBA(this.bytes);
};


Color.prototype.getHightContrastColor = function () {
    var hsba = this.toHSBA();
    var h, s, b;
    h = hsba[0] > 0.5 ? hsba[0] - 0.5 : hsba[0] + 0.5;
    s = hsba[1] > 0.5 ? hsba[1] - 0.5 : hsba[1] + 0.5;
    b = hsba[2] > 0.5 ? hsba[2] - 0.5 : hsba[2] + 0.5;
    return Color.fromHSB(h, s, b);
};


Color.prototype.getContrastYIQ = function () {
    var r = this.bytes[0] * 255;
    var g = this.bytes[1] * 255;
    var b = this.bytes[2] * 255;
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? new Color([0, 0, 0, 1]) : new Color([1, 1, 1, 1]);
}

Color.prototype.clone = function () {
    return new Color(this.bytes.slice());
};

Color.prototype.toString = function (mode) {
    mode = mode || 'rgba';
    mode = mode.toLocaleLowerCase();
    return Color.templates[mode](this);
};

Color.templates = [
    ['rgba', 'bytes', 'rgba({{x[0]*255>>0}}, {{x[1]*255>>0}}, {{x[2]*255>>0}}, {{x[3]}})'],
    ['rgb', 'bytes', 'rgb({{x[0]*255>>0}}, {{x[1]*255>>0}}, {{x[2]*255>>0}})'],
    ['hsl', 'toHSLA()', 'hsl({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
    ['hsla', 'toHSLA()', 'hsla({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
    ['hsb', 'toHSBA()', 'hsb({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
    ['hsba', 'toHSBA()', 'hsba({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})'],
    ['hex3', 'toHex3()', '#{{x}}'],
    ['hex4', 'toHex4()', '#{{x}}'],
    ['hex6', 'toHex6()', '#{{x}}'],
    ['hex8', 'toHex8()', '#{{x}}'],
    ['hwb', 'toHWBA()', 'hwb({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%)'],
    ['hwba', 'toHWBA()', 'hwba({{x[0] * 360}}, {{x[1] * 100}}%, {{x[2] * 100}}%, {{x[3]}})']
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


Color.fromRGB = function (r, g, b) {
    return new Color([r, g, b, 1]);
};

Color.fromRGBA = function (r, g, b, a) {
    return new Color([r, g, b, a]);
};

Color.fromHSL = function (h, s, l) {
    var bytes = this.hslaToRGBA([h, s, l, 1]);
    return new Color(bytes);

};

Color.fromHSLA = function (h, s, l, a) {
    var bytes = this.hslaToRGBA([h, s, l, a]);
    return new Color(bytes);
};

Color.fromHSB = function (h, s, b) {
    var bytes = this.hsbaToRGBA([h, s, b, 1]);
    return new Color(bytes);
};

Color.fromHSBA = function (h, s, b, a) {
    var bytes = this.hsbaToRGBA([h, s, b, a]);
    return new Color(bytes);
};

Color.fromHWB = function (h, s, b) {
    var bytes = this.hwbaToRGBA([h, s, b, 1]);
    return new Color(bytes);
};

Color.fromHWBA = function (h, s, b, a) {
    var bytes = this.hwbaToRGBA([h, s, b, a]);
    return new Color(bytes);
};


/**
 * @param {String} text
 * @returns {Color}
 */
Color.parse = function (text) {
    if (this.namedColors[text]) text = this.namedColors[text];
    if (this.regexes.hex8.test(text)) {
        return this.fromRGBA.apply(this,
            this.regexes.hex8.exec(text)
                .slice(1)
                .map(function (v) {
                    return parseInt(v, 16) / 255;
                }));
    }
    else if (this.regexes.hex6.test(text)) {
        return this.fromRGB.apply(this,
            this.regexes.hex6.exec(text)
                .slice(1)
                .map(function (v) {
                    return parseInt(v, 16) / 255;
                }));
    }
    else if (this.regexes.hex4.test(text)) {
        return this.fromRGBA.apply(this,
            this.regexes.hex4.exec(text)
                .slice(1)
                .map(function (v) {
                    return parseInt(v + v, 16) / 255;
                }));
    }
    else if (this.regexes.hex3.test(text)) {
        return this.fromRGB.apply(this,
            this.regexes.hex3.exec(text)
                .slice(1)
                .map(function (v) {
                    return parseInt(v + v, 16) / 255;
                }));
    } else if (this.regexes.rgba.test(text)) {
        return this.fromRGBA.apply(this,
            this.regexes.rgba.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return i < 3 ? parseFloat(v, 10) / 255 : parseFloat(v, 10);
                }));
    }
    else if (this.regexes.rgb.test(text)) {
        return this.fromRGB.apply(this,
            this.regexes.rgb.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / 255;
                }));
    }
    else if (this.regexes.rgbPercent.test(text)) {
        return this.fromRGB.apply(this,
            this.regexes.rgbPercent.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / 100;
                }));
    }
    else if (this.regexes.rgbaPercent.test(text)) {
        return this.fromRGBA.apply(this,
            this.regexes.rgbaPercent.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i < 3 ? 100 : 1);
                }));
    }
    else if (this.regexes.hsl.test(text)) {
        return this.fromHSL.apply(this,
            this.regexes.hsl.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i == 0 ? 360 : 100);
                }));
    }
    else if (this.regexes.hsla.test(text)) {
        return this.fromHSLA.apply(this,
            this.regexes.hsla.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i == 0 ? 360 : i < 3 ? 100 : 1);
                }));
    }
    else if (this.regexes.hsb.test(text)) {
        return this.fromHSB.apply(this,
            this.regexes.hsb.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i == 0 ? 360 : 100);
                }));
    }
    else if (this.regexes.hsba.test(text)) {
        return this.fromHSBA.apply(this,
            this.regexes.hsba.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i == 0 ? 360 : i < 3 ? 100 : 1);
                }));
    }
    else if (this.regexes.hwb.test(text)) {
        return this.fromHWB.apply(this,
            this.regexes.hwb.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i == 0 ? 360 : 100);
                }));
    }
    else if (this.regexes.hwba.test(text)) {
        return this.fromHWBA.apply(this,
            this.regexes.hwba.exec(text)
                .slice(1)
                .map(function (v, i) {
                    return parseFloat(v, 10) / (i == 0 ? 360 : i < 3 ? 100 : 1);
                }));
    }
    else {
        throw new Error("Fail to parse " + text);
    }
};


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
    yellowgreen: '#9acd32'
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
        } else if (li < 0.5) {
            sat = sat / (2 - sat);
        } else {
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
    } else {
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
        } else if (sector === 2) {
            // Green to cyan.
            red = tint1;
            green = val;
            blue = tint3;
        } else if (sector === 3) {
            // Cyan to blue.
            red = tint1;
            green = tint2;
            blue = val;
        } else if (sector === 4) {
            // Blue to magenta.
            red = tint3;
            green = tint1;
            blue = val;
        } else if (sector === 5) {
            // Magenta to red.
            red = val;
            green = tint1;
            blue = tint2;
        } else {
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
    } else {
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
    } else {
        // Calculate brightness.
        var val;
        if (li < 0.5) {
            val = (1 + sat) * li;
        } else {
            val = li + sat - li * sat;
        }

        // Define zest.
        var zest = 2 * li - val;

        // Implement projection (project onto green by default).
        var hzvToRGB = function (hue, zest, val) {
            if (hue < 0) {
                // Hue must wrap to allow projection onto red and blue.
                hue += 6;
            } else if (hue >= 6) {
                hue -= 6;
            }
            if (hue < 1) {
                // Red to yellow (increasing green).
                return zest + (val - zest) * hue;
            } else if (hue < 3) {
                // Yellow to cyan (greatest green).
                return val;
            } else if (hue < 4) {
                // Cyan to blue (decreasing green).
                return zest + (val - zest) * (4 - hue);
            } else {
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
    } else {
        sat = chroma / val;
        if (red === val) {
            // Magenta to yellow.
            hue = (green - blue) / chroma;
        } else if (green === val) {
            // Yellow to cyan.
            hue = 2 + (blue - red) / chroma;
        } else if (blue === val) {
            // Cyan to magenta.
            hue = 4 + (red - green) / chroma;
        }
        if (hue < 0) {
            // Confine hue to the interval [0, 1).
            hue += 6;
        } else if (hue >= 6) {
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
    } else {
        if (li < 1) {
            sat = chroma / li;
        } else {
            sat = chroma / (2 - li);
        }
        if (red === val) {
            // Magenta to yellow.
            hue = (green - blue) / chroma;
        } else if (green === val) {
            // Yellow to cyan.
            hue = 2 + (blue - red) / chroma;
        } else if (blue === val) {
            // Cyan to magenta.
            hue = 4 + (red - green) / chroma;
        }
        if (hue < 0) {
            // Confine hue to the interval [0, 1).
            hue += 6;
        } else if (hue >= 6) {
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

export default Color;