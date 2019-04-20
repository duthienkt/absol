import BrowserRules from './BrowserRules';


/**
 * 
 * @param {BrowserRules} rulesheet 
 */
function BrowserDectector(rulesheet) {
    this.au = global.navigator ? (navigator.userAgent || '') : '';
    this.rulesheet = rulesheet;
    this.os = this.detectByRules(this.rulesheet.os);
    this.device = this.detectByRules(this.rulesheet.device);
    this.engine = this.detectByRules(this.rulesheet.engine);
    this.browser = this.detectByRules(this.rulesheet.browser);
}



BrowserDectector.prototype.detectByRules = function (rules) {
    var result = {};
    for (var i = 0; i < rules.length; ++i) {
        var os = rules[i];
        var type = os[0];
        var rgx = os[1];
        if (typeof (rgx) == 'function') {
            rgx = rgx(this.au);
        }
        if (Object.prototype.toString.call(rgx).indexOf('RegExp')) {
            var matched = this.au.toLowerCase().match(rgx);
            if (matched){
                result.type = type;
                if (matched[1]){
                    result.version = matched[1];
                }
                break;
            }
        }
        else if (typeof (rgx) == 'string') {
            if (this.au.indexOf(rgx)>=0){
                result.type = type;
            }
        }
    }
    return result;

};




export default new BrowserDectector(BrowserRules);
