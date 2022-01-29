import absol from ".";
import AElement from "./HTML5/AElement";


//for old plugin
absol['HTML'+'El'+'ement'.toLowerCase()] = absol.Element;
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

absol.logData = [];
absol.log = function () {
    absol.logData.push([new Error('TraceError')].concat(Array.prototype.slice.call(arguments)))
}

Object.keys(mapKeys).forEach(function (key) {
    var valueKey = mapKeys[key];
    Object.defineProperty(absol, key, {
        get: function () {
            if (!this['__warn' + key + '__']) {
                this['__warn' + key + '__'] = true;
                absol.log("use " + valueKey + ' instead of ' + key);
            }
            return this[valueKey];
        }
    });
});

/**
 * @deprecated
 * @param {string|Array} className
 * @returns {Boolean}
 */
AElement.prototype.containsClass = function (className) {
    if (className.forEach && className.map) {
        for (var i = 0; i < className.length; ++i)
            if (!this.classList.containsClass(className[i])) return false;
        return true;
    }
    else
        return this.classList.contains(className);
};