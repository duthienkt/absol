import Dom from './Dom';
import ElementNS from './ElementNS';
import Element from './Element';

function Svg(option) {
    Dom.call(this, option);
    this.defaultTag = 'g';
    this.svgNS = "http://www.w3.org/2000/svg";


    delete this.buidDom;
    this.buildSvg = this.create.bind(this);
}


Object.defineProperties(Svg.prototype, Object.getOwnPropertyDescriptors(Dom.prototype));

Svg.prototype.fromCode = function (code) {
    code = code.trim();
    var receptacle = document.createElement('div');
    var element;
    if (code.startsWith('<svg')) {
        receptacle.innerHTML = code;
        element = receptacle.childNodes[0];
        var prototypes = Object.getOwnPropertyDescriptors(Element.prototype);
        Object.defineProperties(element, prototypes);
        Element.call(element);
    }
    else {
        var svgfragment = '<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">' + code + '</svg>';
        receptacle.innerHTML = '' + svgfragment;
        element = receptacle.childNodes[0].childNodes[0];
        var prototypes = Object.getOwnPropertyDescriptors(ElementNS.prototype);
        Object.defineProperties(element, prototypes);
        ElementNS.call(element);

    }
    return element;
};


Svg.prototype.makeNewElement = function (tagName) {
    return document.createElementNS(this.svgNS, tagName);
};

/**
 * 
 * @param {Element} element 
 */
Svg.prototype.attach = function (element) {
    if (typeof element.attr == 'function') return;
    var prototypes = Object.getOwnPropertyDescriptors(ElementNS.prototype);
    Object.defineProperties(element, prototypes);
    ElementNS.call(element);
};

Svg.ShareInstance = new Svg();

Svg.svgToCanvas = function (element) {
    if (typeof element == 'string') {
        element = Dom.ShareInstance.$(element);
    }
    if (element && element.tagName == 'svg') {
        var cssTexts = {};
        Dom.ShareInstance.$('', element, function (e) {
            var cssRules = Element.prototype.getCSSRules.call(e); cssRules.forEach(function (rule) {
                cssTexts[rule.cssText] = true;
            });


        });
        var fullCss = Object.keys(cssTexts).join('\n');

        var renderSpace = Dom.ShareInstance._({
            style: {
                // opacity:0,
                zIndex: -1000,
                position: 'fixed',
                top: 0,
                bottom: 0
            }
        }).addTo(document.body);
        var cloneElement = element.cloneNode(true);
        renderSpace.addChild(cloneElement);
        var newCSS = Dom.ShareInstance._('style').addTo(cloneElement);
        newCSS.innerHTML = fullCss;

        var svgCode = renderSpace.innerHTML;
        renderSpace.clearChild();

        var mBlob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
        var src = (URL || webkitURL).createObjectURL(mBlob);

        var image = Dom.ShareInstance._('img');
        image.attr('src', src)
            .addTo(renderSpace);
        var canvas = document.createElement("canvas");
        renderSpace.addChild(canvas);
        return Dom.waitImageLoaded(image).then(function () {
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            renderSpace.selfRemove();
            return canvas;
        });
    }
    else {
        throw new Error('Element must be svg');
    }

};


export default Svg;