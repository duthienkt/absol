import AElement from "./AElement";
import OOP from "./OOP";

/**
 * @global
 * AElementNS class for handling namespace-aware DOM elements
 * @augments AElement
 * @augments SVGGraphicsElement
 * @constructor
 * @class
 * @description Extends AElement with namespace-aware functionality for SVG and other namespaced elements
 */
function AElementNS() {
    AElement.call(this);
}

AElement.prototype.afterAttached = function () {
    if (this.isDescendantOf(document.body)) return Promise.resolve();
    var attachHookElt = this.$attachhook || this.querySelector('.absol-attachhook');
    if (!attachHookElt) {
        var constructor;
        if (this.tagName.toLowerCase() === 'svg' || this.getBBox) {
            attachHookElt = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            attachHookElt.setAttributeNS(null,  'href','');
            constructor = AElementNS;
        }
        else {
            attachHookElt = document.createElement('img');
            attachHookElt.src = '';
            constructor = AElementNS;
        }

        attachHookElt.classList.add('absol-attachhook');
        Object.assign(attachHookElt, constructor.prototype);
        constructor.call(attachHookElt);
        attachHookElt.defineEvent('attached');
        this.$attachhook = attachHookElt;
        this.$attachhook.on('error', function (event) {
            if (this.isDescendantOf(document.body)) this.emit('attached', event, this);
        });
        this.appendChild(attachHookElt);
    }
    return new Promise(function (rs) {
        attachHookElt.once('attached', rs);
    });
};


OOP.mixClass(AElementNS, AElement);


export default AElementNS;