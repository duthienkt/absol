import Element from './Element';
function ElementNS() {
    this.absolInstanceOf = this.absolInstanceOf || {};
    if (this.absolInstanceOf['ElementNS']) return;
    this.absolInstanceOf['ElementNS'] = true;
    Element.call(this);
    Object.assign(this, ElementNS.prototype);
};

ElementNS.prototype.attr = function (arg0, arg1) {
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.attr(key, arg0[key]);
        }
    }
    else {
        if (arguments.length == 1) return this.getAttributeNS(null, arg0);
        if (arg1 == undefined) {
            this.removeAttributeNS(null, arg0);
        }
        else {
            this.setAttributeNS(null, arg0, arg1);
        }
    }
    return this;
};

export default ElementNS;