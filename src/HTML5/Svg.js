import Dom from './Dom';
import ElementNS from './ElementNS';
import Element from './Element';

function Svg(option){
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
        element =  receptacle.childNodes[0];
        var prototypes = Object.getOwnPropertyDescriptors(Element.prototype);
        Object.defineProperties(element, prototypes);
        Element.call(element);
    }
    else {
        var svgfragment = '<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">' + code + '</svg>';
        receptacle.innerHTML = '' + svgfragment;
        element =  receptacle.childNodes[0].childNodes[0];
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

export default Svg;