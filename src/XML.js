/**
 * 
 * @param {RegExp} regex 
 */
function getRegexBody(regex) {
    return regex.toString().match(/^\/(.+)\/([gimuy]*)$/)[1];
}



var identRgx = /[^\s\"\r\n\'\!\/=\>\-]+/;
var spaceRgx = /[\s\r\n]+/;
var stringRgx = /\"(([^\"\\]*|(\\.))*)\"/;
var textNodeRgx = /[^\<\-]+/;
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
        textNodeRgx
    ].map(function (e) {
        return getRegexBody(e);
    }).join(')|(')
    + ')';

var tokenRgx = new RegExp(tokenRgxBody);


function XML() {

}


XML.prototype.parse = function (code) {
    var result;

    return result;
};

XML.prototype.stringify = function (o) {

};

export default XML;