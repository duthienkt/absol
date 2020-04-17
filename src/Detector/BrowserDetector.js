import BrowserRules from './BrowserRules';


/**
 * 
 * @param {BrowserRules} rulesheet 
 */
function BrowserDetector(rulesheet) {
    this.au = global.navigator ? (navigator.userAgent || '') : '';
    this.rulesheet = rulesheet;
    this.os = this.detectByRules(this.rulesheet.os);
    this.device = this.detectByRules(this.rulesheet.device);
    this.engine = this.detectByRules(this.rulesheet.engine);
    this.browser = this.detectByRules(this.rulesheet.browser);
    this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    this.isCococ = navigator.userAgent.toLowerCase().indexOf('coc_coc_browser') >= 1;
    this.isSafari = !this.isCococ && navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('win') < 0 &&navigator.userAgent.toLowerCase().indexOf('android')<0;
    this.isMobile = navigator.userAgent.indexOf('KFFOWI') > -1 || navigator.userAgent.toLowerCase().indexOf('mobile') > -1;
    this.hasTouch = 'ontouchstart' in window ||
        window.DocumentTouch && document instanceof window.DocumentTouch ||
        navigator.maxTouchPoints > 0 ||
        window.navigator.msMaxTouchPoints > 0;
    this.isTouchDevice = this.isMobile && this.hasTouch;    
}



BrowserDetector.prototype.detectByRules = function (rules) {
    var result = {};
    for (var i = 0; i < rules.length; ++i) {
        var os = rules[i];
        var type = os[0];
        var rgx = os[1];
        if (typeof (rgx) == 'function') {
            rgx = rgx(this.au.toLowerCase());
        }
        if (Object.prototype.toString.call(rgx).indexOf('RegExp')) {
            var matched = this.au.toLowerCase().match(rgx);
            if (matched) {
                result.type = type;
                if (matched[1]) {
                    result.version = matched[1];
                }
                break;
            }
        }
        else if (typeof (rgx) == 'string') {
            if (this.au.toLowerCase().indexOf(rgx) >= 0) {
                result.type = type;
            }
        }
    }
    return result;

};




export default new BrowserDetector(BrowserRules);
