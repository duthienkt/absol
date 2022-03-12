import DPTokenizer from "./DPTokenizer";
import DPParseInstance from "./DPParseInstance";

/***
 * @typedef Rule
 * @property {string} target
 * @property {string[]} elements
 */


/***
 *
 * @param opt
 * @constructor
 */
function DPParser(opt) {
    opt = opt || {};
    if (opt.rules) {
        this.rules = opt.rules;
    }
    this.targets = {};
    this.tokenizer = new DPTokenizer(opt);
    this.computeTarget();
}


/****
 * @type {Rule[]}
 */
DPParser.prototype.rules = [];


DPParser.prototype.computeTarget = function () {
    this.rules.reduce(function (ac, rule) {
        var target = ac[rule.target];
        if (!target) {
            target = {
                rules: []
            }
            ac[rule.target] = target;
        }
        target.rules.push(rule);
        return ac;
    }, this.targets);

};


DPParser.prototype.parse = function (text, target) {
    return new DPParseInstance(this, text, target);
};

export default DPParser;