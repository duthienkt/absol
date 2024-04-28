function DPTokenizer(opt) {
    opt = opt || {};
    if (opt.elementRegexes)
        this.elementRegexes = opt.elementRegexes;
    this._combineTokenRegex();
}


DPTokenizer.prototype.elementRegexes = [
    ['string', /("(?:[^"\\]|\\.)*?")|('(?:[^'\\]|\\.)*?')/],
    ['number', /(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)/],
    ['word', /[_a-zA-Z][_a-zA-Z0-9]*/],
    ['skip', /([\s\r\n]+)|(\/\/[^\n]*)|(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)/],
    ['dsymbol', /\+\+|--|==|!=|<=|>=|\|\||&&/],
    ['tsymbol', /\.\.\./],
    ['symbol', /[^\s_a-zA-Z0-9]/],
];

DPTokenizer.prototype._combineTokenRegex = function () {
    var tokenRegexSource = this.elementRegexes.map(function (cr) {
        return '(' + cr[1].source + ')';
    }).join('|');
    this.tokenRegex = new RegExp(tokenRegexSource, 'g');
    this.groupIndexOfTypes = this.elementRegexes.slice(0, this.elementRegexes.length - 1).reduce(function (ac, cr) {
        var subGroupLength = (new RegExp(cr[1].source + '|.')).exec('a').length;
        ac.push(ac[ac.length - 1] + subGroupLength);
        return ac;
    }, [1]);
    this.types = this.elementRegexes.reduce(function (ac, cr) {
        ac[cr[0]] = cr;
        return ac;
    }, {})
};

DPTokenizer.prototype.tokenize = function (source) {
    var regex = new RegExp(this.tokenRegex.source, 'g');
    var elementRegexes = this.elementRegexes;
    var groupIndexOfTypes = this.groupIndexOfTypes;
    var res = [];
    var matched = regex.exec(source);
    var type, i;
    while (matched) {
        type = null;
        for (i = 0; i < groupIndexOfTypes.length; ++i) {
            if (matched[groupIndexOfTypes[i]]) {
                type = elementRegexes[i][0];
            }
        }
        res.push({
            type: type,
            content: matched[0],
            start: matched.index,
            end: matched.index + matched[0].length
        });
        matched = regex.exec(source);
    }
    return res;

};

export default DPTokenizer;