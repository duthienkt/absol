import absol from ".";


//for old plugin
absol.HTMLElement = absol.Element;
absol.dom = absol.Dom;
absol.event = absol.EventEmitter;
absol.Event = absol.EventEmitter;
absol.color = absol.Color;
absol.documentReady = absol.Dom.documentReady;
window.AComp = absol.AComp;
window.PhotoSwipeViewer = absol.PhotoSwipeViewer;
window.IFrameBridge = absol.IFrameBridge;
window.absol = absol;

var mapKeys = {
    ShareDom: 'coreDom',
    ShareDomCreator: 'domCreator',
    ShareSvgC: 'coreSvgCreator',
    ShareSvgCreator: 'svgCreator',
    ShareCreator: 'domCreator'
};

Object.keys(mapKeys).forEach(function (key) {
    var valueKey = mapKeys[key];
    Object.defineProperty(absol, key, {
        get: function () {
            if (!this['__warn' + key + '__']) {
                this['__warn' + key + '__'] = true;
                console.trace("use " + valueKey + ' instead of ' + key);
            }
            return this[valueKey];
        }
    });
});