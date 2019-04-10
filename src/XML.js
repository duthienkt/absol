import XMLTest from '../test/XML';

/**
 * 
 * @param {RegExp} regex 
 */
function getRegexBody(regex) {
    return regex.toString().match(/^\/(.+)\/([gimuy]*)$/)[1];
}

var BEGIN_TAG = 1;
var END_TAG = 2;
var CDATA = 3;
var DECLARATION = 4;
var COMMENT = 4;



var identRgx = /[^\s\"\r\n\'\!\/=\>\<\]\[\?]+/;
var spaceRgx = /[\s\r\n]+/;
var stringRgx = /\"(([^\"\\]*|(\\.))*)\"/;
var textRgx = /[^\<\-]+/;
var commentOpenRgx = /\<!\-\-/;
var commentCloseRgx = /\-\-\>/;
var cdataOpenRgx = /\<\!\[CDATA\[/;
var cdataCloseRgx = /]]>/;
var openRgx = /\</;
var openEndTagRgx = /\<\//;
var closeRgx = /\>/;
var shortCloseRgx = /\/\>/;
var declarationOpenRgx = /\<\?/;
var declarationCloseRgx = /\?\>/;
var assignOpRgx = /=/;

var tokenRgxBody = '(' +
    [
        spaceRgx,
        declarationOpenRgx,
        cdataOpenRgx,
        commentOpenRgx,
        openEndTagRgx,
        openRgx,
        assignOpRgx,
        stringRgx,
        commentCloseRgx,
        identRgx,
        declarationCloseRgx,
        shortCloseRgx,
        closeRgx,
        cdataCloseRgx,
        textRgx
    ].map(function (e) {
        return getRegexBody(e);
    }).join(')|(')
    + ')';

var tokenType = {
    space: spaceRgx,
    declarationOpen: declarationOpenRgx,
    cdataOpen: cdataOpenRgx,
    commentOpen: commentOpenRgx,
    openEndTag: openEndTagRgx,
    open: openRgx,
    ident: identRgx,
    assignOp: assignOpRgx,
    string: stringRgx,
    commentClose: commentCloseRgx,
    declarationClose: declarationCloseRgx,
    shortClose: shortCloseRgx,
    close: closeRgx,
    cdataClose: cdataCloseRgx,
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
                    if (matched[0] == tokenText) result.matched[tType] = matched;
                }
            }
            return result;
        });
}




/**
 * @typedef {Object} XMLPaseInfo
 * @property {Array<Token>} tokens
 * @property {Number} start
 * @property {Number} end
 * @property {Error} error
 * @property {Boolean} closed
 * 
 * 
 * 
 * @typedef {Object} XMLParseNode 
 * @property {XMLPaseInfo} __xml__
 */

/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */
function MatchAssign(tokens, i) {
    var result = { __xml__: { tokens: tokens, start: i } };
    var cToken;
    if (i < tokens.length) {
        cToken = tokens[i];
        if (cToken.matched['ident']) {
            result.key = cToken.text;
            ++i;
            if (i < tokens.length) {
                cToken = tokens[i];
                if (cToken.matched['space']) {
                    ++i;
                }
                if (i < tokens.length) {
                    cToken = tokens[i];
                    if (cToken.matched['assignOp']) {
                        ++i;
                        if (i < tokens.length) {
                            cToken = tokens[i];
                            if (cToken.matched['space']) {
                                ++i;
                            }
                            if (i < tokens.length) {
                                cToken = tokens[i];
                                if (cToken.matched['string']) {
                                    result.value = cToken.matched.string[1];
                                    ++i;
                                }
                                else {
                                    esult.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected string');
                                }
                            }
                            else {
                                result.__xml__.error = new Error('End of data found, expected ident');
                            }
                        }
                        else {
                            result.__xml__.error = new Error('End of data found, expected ident');
                        }

                    } else {
                        result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected =');
                    }
                }
                else {
                    result.__xml__.error = new Error('End of data found, expected =');
                }
            }
            else {
                result.__xml__.error = new Error('End of data found, expected =');
            }
        }
        else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected ident');
        }
    }
    else {
        result.__xml__.error = new Error('End of data found, expected ident');
    }

    result.__xml__.end = i;
    return result;
}






/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */
function MatchBeginTag(tokens, i) {
    var result = { __xml__: { type: BEGIN_TAG, tokens: tokens, start: i } };
    var cToken;
    if (i < tokens.length) {
        cToken = tokens[i];
        if (cToken.matched['open']) {
            ++i;
            if (i < tokens.length) {
                cToken = tokens[i];
                if (cToken.matched['ident']) {
                    result.tag = cToken.text;
                    ++i;
                    if (i < tokens.length) {
                        var finished = false;//when find the close symbol
                        while (i < tokens.length) {
                            cToken = tokens[i];
                            if (cToken.matched['space']) {
                                ++i;
                            }//skip space between attribute
                            if (i < tokens.length) {
                                cToken = tokens[i];
                                if (cToken.matched['shortClose']) {
                                    result.__xml__.closed = true;
                                    ++i;
                                    finished = true;
                                    break;
                                }
                                else if (cToken.matched['close']) {
                                    result.__xml__.closed = false;
                                    ++i;
                                    finished = true;
                                    break;
                                }
                                else if (tokens[i - 1].matched['space']) {
                                    var assign = MatchAssign(tokens, i);
                                    if (!assign.__xml__.error) {
                                        result.attr = result.attr || {};
                                        result.attr[assign.key] = assign.value;
                                        i = assign.__xml__.end;
                                    }
                                    else if (cToken.matched['ident']) {
                                        result.attr = result.attr || {};
                                        result.attr[cToken.text] = null;// a flag
                                        ++i;
                                    }
                                    else {
                                        //TODO: we can ignore some error here, the same with order Match* function
                                        result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                                        break;
                                    }
                                }
                                else {
                                    //TODO: we can ignore some error here
                                    result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                                    break;
                                }
                            }
                            else {
                                result.__xml__.error = new Error('End of data found, expected /> or >');
                                break;
                            }
                        }
                        if (!finished && !result.__xml__.error) {
                            result.__xml__.error = new Error('End of data found, expected /> or >');
                        }
                    }
                    else {
                        result.__xml__.error = new Error('End of data found, expected /> or >');
                    }
                }
                else {
                    result.__xml__.error = new Error('Expected indent');
                }
            }
            else {
                result.__xml__.error = new Error('End of data found, expected indent');
            }
            result.__xml__.end = i;
        }
        else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <');
        }
    }
    else {
        result.__xml__.error = new Error('End of data found, expected <');
    }
    result.__xml__.end = i;
    return result;
}


/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */
function MatchEndTag(tokens, i) {
    var result = { __xml__: { type: END_TAG, tokens: tokens, start: i } };
    var cToken;
    if (i < tokens.length) {
        cToken = tokens[i];
        if (cToken.matched['openEndTag']) {
            ++i;
            if (i < tokens.length) {
                cToken = tokens[i];
                if (cToken.matched['ident']) {
                    result.tag = cToken.text;
                    ++i;
                    if (i < tokens.length) {
                        var finished = false;//when find the close symbol
                        while (i < tokens.length) {
                            cToken = tokens[i];
                            if (cToken.matched['space']) {
                                ++i;
                            }//skip space between attribute
                            if (i < tokens.length) {
                                cToken = tokens[i];
                                if (cToken.matched['close']) {
                                    result.__xml__.closed = false;
                                    ++i;
                                    finished = true;
                                    break;
                                }
                                else if (tokens[i - 1].matched['space']) {
                                    var assign = MatchAssign(tokens, i);
                                    if (!assign.__xml__.error) {
                                        result.attr = result.attr || {};
                                        result.attr[assign.key] = assign.value;
                                        i = assign.__xml__.end;
                                    }
                                    else if (cToken.matched['ident']) {
                                        result.attr = result.attr || {};
                                        result.attr[cToken.text] = null;// a flag
                                        ++i;
                                    }
                                    else {
                                        result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');

                                    }
                                }
                                else {
                                    result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                                }
                            }
                            else {
                                result.__xml__.error = new Error('End of data found, expected /> or >');
                            }
                        }
                        if (!finished && !result.__xml__.error) {
                            result.__xml__.error = new Error('End of data found, expected /> or >');
                        }
                    }
                    else {
                        result.__xml__.error = new Error('End of data found, expected /> or >');
                    }
                }
                else {
                    result.__xml__.error = new Error('Expected indent');
                }
            }
            else {
                result.__xml__.error = new Error('End of data found, expected indent');
            }
            result.__xml__.end = i;
        }
        else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <');
        }
    }
    else {
        result.__xml__.error = new Error('End of data found, expected <');
    }
    result.__xml__.end = i;
    return result;
}

/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */
function MatchDeclaration(tokens, i) {
    var result = { __xml__: { type: DECLARATION, tokens: tokens, start: i } };
    var cToken;
    if (i < tokens.length) {
        cToken = tokens[i];
        if (cToken.matched['declarationOpen']) {
            ++i;
            if (i < tokens.length) {
                cToken = tokens[i];
                if (cToken.matched['ident']) {
                    result.tag = cToken.text;
                    ++i;
                    if (i < tokens.length) {
                        var finished = false;//when find the close symbol
                        while (i < tokens.length) {
                            cToken = tokens[i];
                            if (cToken.matched['space']) {
                                ++i;
                            }//skip space between attribute
                            if (i < tokens.length) {
                                cToken = tokens[i];
                                if (cToken.matched['declarationClose']) {
                                    result.__xml__.closed = false;
                                    ++i;
                                    finished = true;
                                    break;
                                }
                                else if (tokens[i - 1].matched['space']) {
                                    var assign = MatchAssign(tokens, i);
                                    if (!assign.__xml__.error) {
                                        result.attr = result.attr || {};
                                        result.attr[assign.key] = assign.value;
                                        i = assign.__xml__.end;
                                    }
                                    else if (cToken.matched['ident']) {
                                        result.attr = result.attr || {};
                                        result.attr[cToken.text] = null;// a flag
                                        ++i;
                                    }
                                    else {
                                        result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');

                                    }
                                }
                                else {
                                    result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                                }
                            }
                            else {
                                result.__xml__.error = new Error('End of data found, expected /> or >');
                            }
                        }
                        if (!finished && !result.__xml__.error) {
                            result.__xml__.error = new Error('End of data found, expected /> or >');
                        }
                    }
                    else {
                        result.__xml__.error = new Error('End of data found, expected /> or >');
                    }
                }
                else {
                    result.__xml__.error = new Error('Expected indent');
                }
            }
            else {
                result.__xml__.error = new Error('End of data found, expected indent');
            }
            result.__xml__.end = i;
        }
        else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <');
        }
    }
    else {
        result.__xml__.error = new Error('End of data found, expected <');
    }
    result.__xml__.end = i;
    return result;
}



/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */
function MatchCData(tokens, i) {
    var result = { __xml__: { type: CDATA, tokens: tokens, start: i } };
    var cToken;
    if (i < tokens.length) {
        cToken = tokens[i];
        if (cToken.matched['cdataOpen']) {
            ++i;
            result.text = '';
            var finished = false;
            while (i < tokens.length) {
                cToken = tokens[i];

                if (cToken.matched['cdataClose']) {
                    finished = true;
                    ++i;
                    break;
                }
                else {
                    result.text += cToken.text;
                    ++i;
                }
            }
            if (!finished) {
                result.__xml__.error = new Error('End of data found, expected ]]>');
            }
        }
        else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <![CDATA[');
        }
    }
    else {
        result.__xml__.error = new Error('End of data found, expected <![CDATA[');
    }
    result.__xml__.end = i
    return result;
};



/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */
function MatchComment(tokens, i) {
    var result = { __xml__: { type: CDATA, tokens: tokens, start: i } };
    var cToken;
    if (i < tokens.length) {
        cToken = tokens[i];
        if (cToken.matched['commentOpen']) {
            ++i;
            result.text = '';
            var finished = false;
            while (i < tokens.length) {
                cToken = tokens[i];

                if (cToken.matched['commentClose']) {
                    finished = true;
                    ++i;
                    break;
                }
                else {
                    result.text += cToken.text;
                    ++i;
                }
            }
            if (!finished) {
                result.__xml__.error = new Error('End of data found, expected -->');
            }
        }
        else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <!--');
        }
    }
    else {
        result.__xml__.error = new Error('End of data found, expected <!--');
    }
    result.__xml__.end = i
    return result;
};





XMLTest.testcase.forEach(function (testcase) {
    var beginTime = performance.now();
    var tokens = tokenize(testcase.code.trim());
    var xmls = [];
    var i = 0;
    while (i < tokens.length) {
        var comment = MatchComment(tokens, i);
        if (!comment.__xml__.error) {
            xmls.push(comment);
            i = comment.__xml__.end;
        }
        else {
            var declaration = MatchDeclaration(tokens, i);
            if (!declaration.__xml__.error) {
                xmls.push(declaration);
                i = declaration.__xml__.end;
            }
            else {
                var begin = MatchBeginTag(tokens, i);
                if (!begin.__xml__.error) {
                    xmls.push(begin);
                    i = begin.__xml__.end;
                }
                else {
                    var end = MatchEndTag(tokens, i);
                    if (!end.__xml__.error) {
                        xmls.push(end);
                        i = end.__xml__.end;
                    }
                    else {
                        var cdata = MatchCData(tokens, i);
                        if (!cdata.__xml__.error) {
                            xmls.push(cdata);
                            i = cdata.__xml__.end;
                        }
                        else {
                            ++i;//skip
                        }
                    }
                }
            }
        }
    }
    console.log('token', tokens);
    console.log('xml', xmls);
    console.log('time', performance.now() - beginTime);
}
);


function XML() {

}


XML.prototype.parse = function (code) {
    var result;

    return result;
};

XML.prototype.stringify = function (o) {

};

export default XML;