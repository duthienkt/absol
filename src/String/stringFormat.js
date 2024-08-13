/**
 *
 * @param {String} s
 * @param {Number} maxLength
 */
export function wrapToLines(s, maxLength) {
    var res = [];
    var currentWord = '';
    var currentLine = '';
    for (var i = 0; i < s.length; ++i) {
        if (s[i].match(/\s/)) {
            if (currentWord.length + currentLine.length >= maxLength) {
                if (currentLine.length > 0) {
                    res.push(currentLine.trim());
                    currentLine = '';
                    currentWord = currentWord.trimLeft() + s[i];
                }
                else {
                    currentLine = currentLine + currentWord;
                    res.push(currentLine.trim());
                    currentLine = '';
                    currentWord = '';

                }
            }
            else {
                currentLine = currentLine + currentWord;
                currentWord = s[i];
            }
        }
        else {
            currentWord = currentWord + s[i];
        }
    }
    currentLine = (currentLine + currentWord).trim();
    if (currentLine.length > 0) res.push(currentLine);
    return res;
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function nonAccentVietnamese(s) {
    return s.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
        .replace(/\u02C6|\u0306|\u031B/g, "");
}




/**
 *
 * @param {String} s
 * @returns {String}
 */
export function pascalCaseToCamelCase(s) {
    return s.substr(0, 1).toLowerCase() + s.substr(1);
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function kebabCaseToCamelCase(s) {
    return s.replace(/-+([^-])/g, function (full, c) {
        return c.toUpperCase();
    });
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function underScoreToCamelCase(s) {
    return s.replace(/(_+)?([^_]+)/g, function (full, underscore, word) {
        if (underscore) {
            if (word) {
                return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
            }
            else return '';
        }
        else {
            return word.toLowerCase();
        }
    });
}


/**
 *
 * @param {String} s
 * @returns {String}
 */
export function camelCaseToPascalCase(s) {
    return s.substr(0, 1).toUpperCase() + s.substr(1);
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function underScoreToPascalCase(s) {
    return s.replace(/(_+|^)?([^_]+)/g, function (full, underscore, word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
    });
}


/**
 *
 * @param {String} s
 * @returns {String}
 */
export function kebabCaseToPascalCase(s) {
    return s.replace(/(-+|^)([^-])/g, function (full, u, c) {
        return c.toUpperCase();
    });
}


/**
 *
 * @param {String} s
 * @returns {String}
 */
export function pascalCaseToKebabCase(s) {
    return s.replace(/[A-Z][^A-Z]*/g, function (full, index) {
        if (index == 0)
            return full.toLowerCase();
        return '-' + full.toLowerCase()
    });
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function camelCaseToKebabCase(s) {
    return s.replace(/(^|[A-Z])[^A-Z]*/g, function (full, index) {
        if (index == 0)
            return full.toLowerCase();
        return '-' + full.toLowerCase()
    });
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function underScoreToKebabCase(s) {
    return s.replace(/(^|_+)([^_]+)/g, function (full, score, word, index) {
        if (index == 0)
            return word.toLowerCase();
        return '-' + word.toLowerCase()
    });
}


/**
 *
 * @param {String} s
 * @returns {String}
 */
export function pascalCaseToUnderScore(s) {
    return s.replace(/[A-Z][^A-Z]*/g, function (full, index) {
        if (index == 0)
            return full.toLowerCase();
        return '_' + full.toLowerCase()
    });
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function pascalCaseToUpperUnderScore(s) {
    return s.replace(/[A-Z][^A-Z]*/g, function (full, index) {
        if (index == 0)
            return full.toUpperCase();
        return '_' + full.toUpperCase()
    });
}


/**
 *
 * @param {String} s
 * @returns {String}
 */
export function camelCaseToUnderScore(s) {
    return s.replace(/(^|[A-Z])[^A-Z]*/g, function (full, index) {
        if (index == 0)
            return full.toLowerCase();
        return '_' + full.toLowerCase()
    });
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function camelCaseToUpperUnderScore(s) {
    return s.replace(/(^|[A-Z])[^A-Z]*/g, function (full, index) {
        if (index == 0)
            return full.toUpperCase();
        return '_' + full.toUpperCase()
    });
}

/**
 *
 * @param {String} s
 * @returns {String}
 */
export function kebabCaseToUnderScore(s) {
    return s.replace(/(-+|^)([^-]+)/g, function (full, u, word, index) {
        if (index == 0) return word.toLowerCase();
        return '_' + word.toLowerCase()
    });
}


/**
 *
 * @param {String} s
 * @returns {String}
 */
export function kebabCaseToUpperUnderScore(s) {
    return s.replace(/(-+|^)([^-]+)/g, function (full, u, word, index) {
        if (index == 0) return word.toUpperCase();
        return '_' + word.toUpperCase()
    });
}


/***
 *
 * @param {String} text
 */
export function normalizeIdent(text, opt) {
    var spaces = '_';
    if (opt && ('spaces' in opt)) {
        spaces = opt.spaces || '';
    }

    var symbols = '_';
    if (opt && ('symbols' in opt)) {
        symbols = opt.symbols || '';
    }

    var startsWithDigit = false;
    if (opt && ('startsWithDigit' in opt)) {
        startsWithDigit = opt.startsWithDigit || false;
    }


    var res = nonAccentVietnamese(text);
    if (typeof spaces === "string") {
        res = res.replace(/\s+/g, spaces);
    }
    if (typeof symbols === 'string') {
        if (spaces === '_')
            res = res.replace(/[^a-zA-Z0-9_$]+/g, symbols);
        else if (spaces === '-') {
            res = res.replace(/[^a-zA-Z0-9_$\-]+/g, symbols);
        }
    }

    if (spaces) {
        res = res.replace(new RegExp(`([${spaces}]+)`, 'g'), spaces);
    }

    if (symbols && symbols !== spaces) {
        res = res.replace(new RegExp(`([${symbols}]+)`, 'g'), spaces);
    }

    if (spaces) {
        res = res.replace(new RegExp(`([${spaces}]+$)|(^[${spaces}]+)`, 'g'), '');
    }

    if (symbols && symbols !== spaces) {
        res = res.replace(new RegExp(`([${symbols}]+$)|(^[${symbols}]+$)`, 'g'), '');
    }


    if (!startsWithDigit && res.match(/^[0-9]/)) {
        res = '$' + res;
    }
    return res;
}


export function breakTextToLineByLength(text, limitLength) {
    limitLength = limitLength || 256;
    var lines = text.split(/\n/);
    var newLines = [];

    var breakLine = line => {
        var testLine = nonAccentVietnamese(line).toLowerCase();
        var wordRgx = /(\(?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)\)?)|([()_a-z0-9,.]+)|([^\sa-z0-9,._()])/g;
        var poss = [];
        var matched = wordRgx.exec(testLine);
        while (matched) {
            poss.push(matched.index);
            matched = wordRgx.exec(testLine);
        }
        if (poss[0] !== 0) poss.unshift(0);
        poss.push(testLine.length);
        poss.push(testLine.length);
        var start = poss[0] || 0;
        var end, pend = start;
        var newLine;
        var chars;
        for (var i = 1; i < poss.length; ++i) {
            end = poss[i];
            if (end - start > limitLength || i + 1 === poss.length) {
                newLine = line.substring(start, pend).trimEnd();
                if (newLine.length > limitLength) {
                    chars = newLine.split('');
                    while (chars.length > 0) {
                        newLine = chars.splice(0, limitLength).join('');
                        newLines.push(newLine);
                    }
                }
                else if (newLine.length > 0) {
                    newLines.push(newLine);
                }
                start = pend;
            }
            pend = end;
        }
    };

    lines.forEach(line => breakLine(line));

    return newLines.join('\n');
}

// window.t = `Sử dụng công thức tính: (Luong_Gio  OT150  0.5) + (Luong_Gio  OT200  1.0) + (Luong_Gio  OT210  1.1) + (Luong_Gio  OT270  1.7) + (Luong_Gio  OT300  2.0)`;
// console.log(breakTextToLineByLength(t, 50))

String.nonAccentVietnamese = nonAccentVietnamese;

String.prototype.nonAccentVietnamese = function () {
    return String.nonAccentVietnamese(this);
};