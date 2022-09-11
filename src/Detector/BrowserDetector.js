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
    this.isSafari = !this.isCococ && navigator.userAgent.toLowerCase().indexOf('safari') > -1
        && navigator.userAgent.toLowerCase().indexOf('win') < 0
        && navigator.userAgent.toLowerCase().indexOf('android') < 0;
    // this.isSafari = /constructor/i.test(window.HTMLElement) || window.safari;
    this.isMobile = navigator.userAgent.indexOf('KFFOWI') > -1 || navigator.userAgent.toLowerCase().indexOf('mobile') > -1;
    this.isMacOSWebView = /Macintosh/.test(this.au) && /AppWebkit/.test(this.au) && !/Safari/.test(this.au);
    this.isChromeIOS = /CriOS\/[\d]+/.test(this.au);
    this.hasTouch = 'ontouchstart' in window ||
        window.DocumentTouch && document instanceof window.DocumentTouch ||
        navigator.maxTouchPoints > 0 ||
        window.navigator.msMaxTouchPoints > 0;
    this.isTouchDevice = this.isMobile && this.hasTouch;
    this.supportPassiveEvent = (function () {
        var supportsPassiveOption = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassiveOption = true;
                }
            });
            window.addEventListener('test', null, opts);
            window.removeEventListener('test', null, opts);
        } catch (e) {
        }
        return supportsPassiveOption;
    })();
    this.supportGridLayout = typeof document.createElement('div').style.grid === 'string';

    Object.defineProperty(this, 'zoom', {
        get: function () {
            return this.getZoom();
        },
        enumerable: true,
        configurable: false
    });
}


BrowserDetector.prototype.detectByRules = function (rules) {
    var result = {};
    for (var i = 0; i < rules.length; ++i) {
        var rule = rules[i];
        var type = rule[0];
        var rgx = rule[1];
        if (typeof (rgx) == 'function') {
            rgx = rgx(this.au.toLowerCase());
        }
        if (Object.prototype.toString.call(rgx).indexOf('RegExp') >= 0) {
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


BrowserDetector.prototype.getZoom = function () {
    //todo: wrong on chrome
    var type;
    if ('chrome' in window) {
        type = "chrome";
    }
    else if (this.isSafari) {
        type = 'safari';
    }
    else if ('orientation' in window && 'webkitRequestAnimationFrame' in window){
        type = 'webkitMobile';
    }
    else if ('webkitRequestAnimationFrame' in window){
        type = 'webkit';
    }

    switch (type) {
        case 'chrome':
            return Math.round(((window.outerWidth) / window.innerWidth) * 100) / 100;
        case 'safari':
            return Math.round(((document.documentElement.clientWidth) / window.innerWidth) * 100) / 100;
        case 'webkitMobile':
            return ((Math.abs(window.orientation) == 90) ? screen.height : screen.width) / window.innerWidth;
        case 'webkit':
            return (() => {
                var important = (str) => {
                    return str.replace(/;/g, " !important;");
                };

                var div = document.createElement('div');
                div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
                div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

                var container = document.createElement('div');
                container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
                container.appendChild(div);

                document.body.appendChild(container);
                var zoom = 1000 / div.clientHeight;
                zoom = Math.round(zoom * 100) / 100;
                document.body.removeChild(container);

                return zoom;
            })();
        default:
            return 1;

    }

    return 1;
};

export function calcBenchmark() {
    var now = new Date().getTime();
    var i = 0;
    while (now === new Date().getTime()) {
    }
    now++;
    while (now === new Date().getTime()) {
        ++i
    }
    return i;
}


BrowserDetector.prototype.calcBenchmark = calcBenchmark;


export default new BrowserDetector(BrowserRules);
