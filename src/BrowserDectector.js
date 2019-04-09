var BrowserDetector = {};
BrowserDetector.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
BrowserDetector.isCococ = navigator.userAgent.toLowerCase().indexOf('coc_coc_browser') >= 1;
BrowserDetector.isSafari = !BrowserDetector.isCococ && navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('win') < 0;
BrowserDetector.isMobile = navigator.userAgent.indexOf('KFFOWI') > -1 || navigator.userAgent.toLowerCase().indexOf('mobile') > -1;


export default BrowserDetector;