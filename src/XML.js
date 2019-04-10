import XMLTest from '../test/XML';

/**
 * 
 * @param {RegExp} regex 
 */
function getRegexBody(regex) {
    return regex.toString().match(/^\/(.+)\/([gimuy]*)$/)[1];
}



var identRgx = /[^\s\"\r\n\'\!\/=\>\<\-\]\[]+/;
var spaceRgx = /[\s\r\n]+/;
var stringRgx = /\"(([^\"\\]*|(\\.))*)\"/;
var textRgx = /[^\<\-]+/;
var commentStartRgx = /\<!--/;
var commnetEndRgx = /\-\-\>/;
var dataStartRgx = /\<\!\[CDATA\[/;
var dataEndRgx = /]]>/;
var openRgx = /\</;
var openEndTagRgx = /\<\//;
var closeRgx = /\>/;
var shortCloseRgx = /\/\>/;
var declarationStartRgx = /\<\?/;
var declarationEndRgx = /\?\>/;
var assignOpRgx = /=/;

var tokenRgxBody = '(' +
    [
        spaceRgx,
        declarationStartRgx,
        dataStartRgx,
        commentStartRgx,
        openEndTagRgx,
        openRgx,
        identRgx,
        assignOpRgx,
        stringRgx,
        commnetEndRgx,
        declarationEndRgx,
        shortCloseRgx,
        closeRgx,
        dataEndRgx,
        textRgx
    ].map(function (e) {
        return getRegexBody(e);
    }).join(')|(')
    + ')';

var tokenType = {
    space: spaceRgx,
    declarationStart: declarationStartRgx,
    dataStart: dataStartRgx,
    commentStart: commentStartRgx,
    openEndTag: openEndTagRgx,
    open: openRgx,
    ident: identRgx,
    assignOp: assignOpRgx,
    string: stringRgx,
    commnetEnd: commnetEndRgx,
    declarationEnd: declarationEndRgx,
    shortClose: shortCloseRgx,
    close: closeRgx,
    dataEnd: dataEndRgx,
    text: textRgx
}


var tokenRgx = new RegExp(tokenRgxBody);

/**
 * 
 * @typedef {Object} Token
 * @property {String} text
 * @property {*} matched
 */

/**
 * 
 * @param {String} text 
 * @returns {Array<Token>}
 */
function tokenize(text) {
    return text.match(new RegExp(tokenRgxBody, 'g'))
        .map(function (tokenText) {
            var result = { text: tokenText, matched: {} };
            for (var tType in tokenType) {
                var matched = tokenText.match(tokenType[tType]);
                if (matched) {
                    if (matched[0] == tokenText) result.matched[tType] = true;
                }
            }
            return result;
        });
}

/**
 * \open(ident\space())*(\shortClose|()) 
 * @param {Array<Token>} tokens 
 * @param {Number} start 
 */
function MatchXML(tokens, start) {
    var result = { tokens: tokens, start: start };
    while (result.start < tokens.length) {
        if (tokens[result.start].matched['open']) break;
        result.start++;
    }
    if (result.start >= tokens.length) {
        result.error = new Error('End of data found, expected <');
        result.end = result.start;
    }
    else {
        var end = result.start + 1;
        var cToken;
        if (end < tokens.length) {
            cToken = tokens[end];
            if (cToken.matched['ident']) {
                result.tag = cToken.text;
                ++end;
            }
            else {
                result.error = new Error('Expected indent');
            }
        }
        else {
            result.error = new Error('End of data found, expected indent');
        }
        result.end = end;
    }
    return result;

}


var tokens = tokenize(XMLTest.testcase[0].code);
var xml = MatchXML(tokens, 0);
console.log(tokens, xml);


function XML() {

}


XML.prototype.parse = function (code) {
    var result;

    return result;
};

XML.prototype.stringify = function (o) {

};

export default XML;