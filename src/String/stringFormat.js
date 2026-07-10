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
 * @param {String} text The input text to normalize
 * @param {Object=} opt Configuration options
 * @param {String} [opt.spaces='_'] Character to replace spaces with
 * @param {String} [opt.symbols='_'] Character to replace special symbols with
 * @param {boolean} [opt.startsWithDigit=false] Whether to allow identifiers starting with digits
 * @param {String} [opt.leadingDigitPrefix='$'] Prefix inserted when the normalized identifier starts with a digit and leading digits are not allowed
 */
export function normalizeIdent(text, opt) {
    var spaces = '_';
    var leadingDigitPrefix = '$';
    var res;
    if (opt && ('spaces' in opt)) {
        spaces = opt.spaces || '';
    }

    var symbols = '_';
    if (opt && ('symbols' in opt)) {
        symbols = opt.symbols || '';
    }

    if (opt && ('leadingDigitPrefix' in opt)) {
        leadingDigitPrefix = opt.leadingDigitPrefix || '';
    }

    var startsWithDigit = true;
    if (opt && ('startsWithDigit' in opt)) {
        startsWithDigit = opt.startsWithDigit || false;
    }


    res = nonAccentVietnamese(text);
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
        res = leadingDigitPrefix + res;
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

export function normalizeFileName(name) {
    if (typeof name !== "string") return '';
    name = name.trim();
    if (name.length === 0) return '';
    name = nonAccentVietnamese(name);
    name = name.replace(/[^a-zA-Z0-9_.]+/g, '_');
    return name;
}


String.nonAccentVietnamese = nonAccentVietnamese;

/**
 * Crop text to specified limit. If the text is longer than limitLength,
 * it is truncated and an ellipsis '...' is appended. The returned string
 * length will not exceed limitLength.
 *
 * @param {String} s
 * @param {Number} limitLength
 * @returns {String}
 */
export function truncateWithEllipsis(s, limitLength) {
    if (typeof s !== 'string') return '';
    limitLength = parseInt(limitLength, 10) || 0;
    if (limitLength <= 0) return '';
    if (s.length <= limitLength) return s;
    // If limit is very small, just return ellipsis
    if (limitLength <= 3) return '...';
    return s.substring(0, limitLength - 3) + '...';
}

String.prototype.nonAccentVietnamese = function () {
    return String.nonAccentVietnamese(this);
};


/****** NumberToVietnamese *****************/

export function numberToVietnamese(n) {
    var zeroLeftPadding = ["", "00", "0"];
    var digits = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín"
    ];
    var multipleThousandUnits = [
        "",
        "nghìn",
        "triệu",
        "tỷ",
        "nghìn tỷ",
        "triệu tỷ",
        "tỷ tỷ"
    ];

    function shouldShowZeroHundred(groups) {
        let trailingZeroGroups = 0;

        for (let i = groups.length - 1; i >= 0; i--) {
            if (groups[i] === "000") trailingZeroGroups++;
            else break;
        }

        return trailingZeroGroups < groups.length - 1;
    }

    function deconstruct(items) {
        const t0 = items.length > 0 ? items[0] : undefined;
        const t1 = items.length > 1 ? items[1] : undefined;
        const t2 = items.length > 2 ? items[2] : undefined;

        return [t0, t1, t2];
    }

    function readPair(b, c) {
        switch (b) {
            case 0:
                return c === 0 ? "" : " lẻ " + digits[c];

            case 1:
                switch (c) {
                    case 0:
                        return "mười ";
                    case 5:
                        return "mười lăm";
                    default:
                        return "mười " + digits[c];
                }

            default:
                switch (c) {
                    case 0:
                        return digits[b] + " mươi ";
                    case 1:
                        return digits[b] + " mươi mốt";
                    case 4:
                        return digits[b] + " mươi tư";
                    case 5:
                        return digits[b] + " mươi lăm";
                    default:
                        return digits[b] + " mươi " + digits[c];
                }
        }
    }

    function readTriple(triple, showZeroHundred) {
        var tripleChars = triple.split("");
        var a = parseInt(tripleChars[0], 10);
        var b = parseInt(tripleChars[1], 10);
        var c = parseInt(tripleChars[2], 10);

        if (a === 0 && b === 0 && c === 0) return "";
        if (a === 0 && showZeroHundred) return "không trăm " + readPair(b, c);
        if (a === 0 && b === 0) return digits[c];
        if (a === 0) return readPair(b, c);

        return digits[a] + " trăm " + readPair(b, c);
    }

    function capitalize(input) {
        switch (input) {
            case null:
            case undefined:
                throw new TypeError("input cannot be null or undefined");

            case "":
                throw new Error("input cannot be empty");

            default:
                return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        }
    }

    function chunked(str, chunkSize) {
        const result = [];
        const count = Math.floor(str.length / chunkSize);

        for (let i = 0; i < count; i++) {
            result.push(str.substring(i * chunkSize, i * chunkSize + chunkSize));
        }
        return result;
    }

    function toVietnameseWords(n) {
        if (typeof n === "number") {
            if (!Number.isSafeInteger(n)) {
                throw new RangeError("n must be a safe integer or BigInt");
            }
            n = BigInt(n);
        } else if (typeof n === "string") {
            n = BigInt(n);
        } else if (typeof n !== "bigint") {
            throw new TypeError("n must be a number, string, or BigInt");
        }

        if (n === 0n) return "Không";
        if (n < 0n) return "Âm " + toVietnameseWords(-n).toLowerCase();

        const s = n.toString();
        const groups = chunked(zeroLeftPadding[s.length % 3] + s, 3);
        const showZeroHundred = shouldShowZeroHundred(groups);

        let index = -1;
        const rawResult = groups.reduce((acc, e) => {
            index++;

            const tripleText = readTriple(e, showZeroHundred && index > 0);
            const multipleThousand =
                !tripleText || tripleText.trim() === ""
                    ? ""
                    : (multipleThousandUnits[groups.length - 1 - index] == null ? "" : multipleThousandUnits[groups.length - 1 - index]);

            return `${acc} ${tripleText} ${multipleThousand} `;
        }, "");

        return capitalize(
            rawResult
                .replace(/\s+/g, " ")
                .trim()
        );
    }

    return toVietnameseWords(n);
}
