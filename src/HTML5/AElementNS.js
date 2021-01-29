import AElement from "./AElement";
import OOP from "./OOP";

/***
 * @augments AElement
 * @augments SVGGraphicsElement
 * @constructor
 */
function AElementNS() {
    AElement.call(this);
}

OOP.mixClass(AElementNS, AElement);

AElementNS.prototype.attr = function () {
    if (arguments.length == 1) {
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
        if (arguments.length == 2) {
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


/***
 * @returns {Promise}
 */
AElementNS.prototype.afterAttached = function () {
    if (this.isDescendantOf(document.body)) return Promise.resolve();
    var attachHookElt = this.$attachhook || this.querySelector('.absol-attachhook');
    if (!attachHookElt) {
        attachHookElt = document.createElementNS(null, 'image');
        attachHookElt.setAttributeNS(null, 'href', '');
        attachHookElt.classList.add('absol-attachhook');
        Object.assign(attachHookElt, AElementNS.prototype);
        AElementNS.call(attachHookElt);
        this.$attachhook = attachHookElt;
        this.appendChild(attachHookElt);
    }
    return new Promise(function (rs) {
        attachHookElt.once('error', rs);
    });
};

export default AElementNS;