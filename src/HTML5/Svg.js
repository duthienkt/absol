import Dom from './Dom';
import ElementNS from './ElementNS';

function Svg(option){
    Dom.call(this, option);
    this.defaultTag = 'g';
    this.svgNS = "http://www.w3.org/2000/svg";

    delete this.buidDom;
    this.buildSvg = this.create.bind(this);
}


Object.defineProperties(Svg.prototype, Object.getOwnPropertyDescriptors(Dom.prototype));




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