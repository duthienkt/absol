import AElement from "./AElement";
import OOP from "./OOP";

/**
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


/**
 * Gets or sets element attributes with namespace support
 * @param {(string|Object)} arg1 - Attribute name or object containing key-value pairs of attributes
 * @param {*} [arg2] - Value to set when first argument is a string
 * @returns {(string|AElementNS)} Attribute value when getting, this instance when setting
 */
AElementNS.prototype.attr = function () {
    if (arguments.length === 1) {
        if (typeof (arguments[0]) == 'string') {
            if (this._azar_extendAttributes[arguments[0]]) {
                return this._azar_extendAttributes[arguments[0]].get.call(this);
            }
            else
                return this.getAttributeNS(null, arguments[0]);
        }
        else {
            for (var key in arguments[0]) {

                this.attr(key, arguments[0][key]);
            }
        }
    }
    else {
        if (arguments.length === 2) {
            if (arguments[1] === null || arguments[1] === undefined) {
                if (this._azar_extendAttributes[arguments[0]]) {
                    this._azar_extendAttributes[arguments[0]].remove.call(this, arguments[1]);
                }
                else
                    this.removeAttributeNS(null, arguments[0]);
            }
            else {
                if (this._azar_extendAttributes[arguments[0]]) {
                    this._azar_extendAttributes[arguments[0]].set.call(this, arguments[1]);
                }
                else {
                    this.setAttributeNS(null, arguments[0], arguments[1]);
                }
            }
        }
    }
    return this;
};



export default AElementNS;