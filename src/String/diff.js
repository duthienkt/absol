var letterRegex = /[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴèéẹẻẽêềếệểễÈÉẸẺẼÊỀẾỆỂỄìíịỉĩÌÍỊỈĨòóọỏõôồốộổỗơờớợởỡÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠùúụủũưừứựửữÙÚỤỦŨƯỪỨỰỬỮỳýỵỷỹỲÝỴỶỸđĐ\u0300\u0301\u0303\u0309\u0323\u02C6\u0306\u031B]/;
var spaceRegex = /\s+/;

var wordScore = 1;
var opScore = 0.99;
var spaceScore = 0.01;

/**
 * 
 * @typedef Token
 * @property {String} value
 * @property {Number} start
 * @property {Number} end
 * @property {Number} score
 * 
 * @param {String} text
 * @returns {Array<Token>} 
 */
/*export*/ function tokenize(text) {
    var simpleToken = new RegExp(['(', letterRegex.source, '+)|(', spaceRegex.source, ')|(', '.', ')'].join(''), 'g');

    var result = [];
    var matched;
    do {
        matched = simpleToken.exec(text);
        if (matched) {
            var score = 0;
            if (matched[1]) score = wordScore;
            if (matched[2]) score = spaceScore;
            if (matched[3]) score = opScore;
            result.push({
                start: matched.index,
                end: simpleToken.lastIndex,
                value: matched[0],
                score: score
            });
        }
    }
    while (matched)
    return result;
}

/**
 * @typedef TokenPair
 * @property {Token} lToken
 * @property {Token} rToken
 * 
 * @typedef LCSTResult
 * @property {Number} score
 * @property {Array<TokenPair>} subExtraMatched
 * @property {Boolean} isExtraMatched
 * 
 * @param {Array<Token>} lTokens 
 * @param {Array<Token>} rTokens
 * @returns {LCSTResult} 
 */
function longestCommonSubTokens(lTokens, rTokens) {
    var Q = Array(lTokens.length + 1).fill(null).map(function (u, i) {
        return Array(rTokens.length + 1).fill(0);

    });
    //QHD
    for (var i = 0; i < lTokens.length; ++i) {
        for (var j = 0; j < rTokens.length; ++j) {
            Q[i + 1][j + 1] = Math.max(Q[i][j + 1], Q[i + 1][j]);
            if (lTokens[i].value == rTokens[j].value) {
                Q[i + 1][j + 1] = Math.max(Q[i + 1][j + 1], Q[i][j] + rTokens[j].score);
            }
        }
    }

    //trace
    var subExtraMatched = [];
    var i = lTokens.length;
    var j = rTokens.length;
    var score = 0;

    while (i > 0 && j > 0) {
        if (Q[i][j] == 0) break;
        while (Q[i][j] == Q[i][j - 1])--j;
        while (Q[i][j] == Q[i - 1][j])--i;
        score += lTokens[i - 1].score;
        subExtraMatched.push({
            lToken: lTokens[i - 1],
            rToken: rTokens[j - 1]
        })
        --j;
        --i;
    }

    subExtraMatched = subExtraMatched.reverse();
    return {
        subExtraMatched: subExtraMatched,
        isExtraMatched: subExtraMatched.length == lTokens.length && subExtraMatched.length == rTokens.length,
        score: score
    }
};

/**
 * 
 * @param {String} a 
 * @param {String} b 
 * @returns {Number} length of common string
 */
function leftMatchString(a, b) {
    var res = 0;
    var i = 0;
    var j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] == b[j]) {
            ++res;
        }
        else {
            break;
        }
        ++i;
        ++j;
    }
    return res;
}

/**
 * 
 * @param {String} a 
 * @param {String} b 
 * @returns {Number} length of common string
 */
function rightMatchString(a, b) {
    var res = 0;
    var i = a.length;
    var j = b.length;
    while (i > 0 && j > 0) {
        --i;
        --j;
        if (a[i] == b[j]) {
            ++res;
        }
        else {
            break;
        }
    }
    return res;
}

/**
 * 
 * @typedef CLTResult
 * @property {Boolean} isExtraMatched
 * 
 * @param {String} lText 
 * @param {String} rText 
 */
function compareLineText(lText, rText) {
    var lToken = tokenize(lText);
    var rTokens = tokenize(rText);
    var lcst = longestCommonSubTokens(lToken, rTokens);
    var mapSegment = lcst.subExtraMatched.reduce(function (ac, pair, i) {
        if (!ac.last) {
            ac.last = {
                lStart: pair.lToken.start,
                lEnd: pair.lToken.end,
                rStart: pair.rToken.start,
                rEnd: pair.rToken.end
            };
            ac.segments.push(ac.last);
        }
        else {
            if (ac.last.lEnd != pair.lToken.start) {
                if (ac.last.rEnd != pair.rToken.start) {//both left and right

                }
                else {

                }
            }
            else if (ac.last.rEnd != pair.rToken.start) {
                console.log(ac.last.rEnd , pair.rToken.start)
            }
        }
        return ac;
    }, { segments: [], last: null }).segments;

    console.log(mapSegment);



    return lcst;

}

console.log(compareLineText('import { randomInt    } from "../Math/random"', 'import { randomFloat   } from "../Math/random"'));
console.log(compareLineText('import { randomInt    } from "../Math/random"', 'import { randomInt    } from "../Math/random"'));


// var res = tokenize(
//     `import { randomInt } from "../Math/random";

// export var identCharacters = function () {
//     var chars = 'qwertyuiopasdfghjklzxcvbnm';
//     chars = chars + chars.toUpperCase();
//     var num = '0123456789';
//     var spect = '_';
//     return (chars + spect + num).split('');
//     Đây là một câu tiếng Việt

// }();`

// );

setInterval(() => { }, 1000);
