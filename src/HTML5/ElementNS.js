import Element from './Element';
function ElementNS() {
    Element.call(this);
};

Object.defineProperties(ElementNS.prototype, Object.getOwnPropertyDescriptors(Element.prototype));

Element.prototype.attr = function () {
    if (arguments.length == 1) {
        if (typeof (arguments[0]) == 'string') {
            if (this._azar_extendAttributes[arguments[0]]) {
                return this._azar_extendAttributes[arguments[0]].get.call(this);
            }
            else
                return this.getAttribute(null, arguments[0]);
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
                    return this._azar_extendAttributes[arguments[0]].remove.call(this, arguments[0]);
                }
                else
                    this.removeAttribute(null,arguments[0]);
            }
            else {
                if (this._azar_extendAttributes[arguments[0]]) {
                    return this._azar_extendAttributes[arguments[0]].set.call(this, arguments[0]);
                }
                else
                    this.setAttribute(null, arguments[0], arguments[1]);
            }
        }
    }
    return this;
};

export default ElementNS;