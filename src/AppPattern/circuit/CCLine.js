import {randomIdent} from "../../String/stringGenerate";


/***
 *
 * @param {CCBlock} u
 * @param {string} uPinName
 * @param {CCBlock} v
 * @param {string} vPinName
 * @param {boolean=} twoWay
 * @param {{id?:string}=} opt
 * @constructor
 */
function CCLine(u, uPinName, v, vPinName, twoWay, opt) {
    opt = opt || {};
    twoWay = !!twoWay;
    Object.defineProperty(this, 'id', {
        enumerable: true, writable: false, value: opt.id && randomIdent(32)
    });
    Object.defineProperty(this, 'u', {
        enumerable: true, writable: false, value: u
    });
    Object.defineProperty(this, 'v', {
        enumerable: true, writable: false, value: v
    });
    Object.defineProperty(this, 'uPinName', {
        enumerable: true, writable: false, value: uPinName
    });
    Object.defineProperty(this, 'vPinName', {
        enumerable: true, writable: false, value: vPinName
    });

    Object.defineProperty(this, 'twoWay', {
        enumerable: true, writable: false, value: twoWay
    });

    this.vToU = this.vToU.bind(this);
    this.uToV = this.uToV.bind(this);
    this.u.pinOn(this.uPinName, this.uToV);
    if (this.twoWay)
        this.v.pinOn(this.vPinName, this.vToU);
    this.u.__cc_line_list_by_id__[this.id] = this;
    this.v.__cc_line_list_by_id__[this.id] = this;
}


CCLine.prototype.remove = function () {
    this.u.pinOff(this.uPinName, this.uToV);
    if (this.twoWay)
        this.v.pinOff(this.vPinName, this.vToU);
    delete this.u.__cc_line_list_by_id__[this.id];
    delete this.v.__cc_line_list_by_id__[this.id];
};

CCLine.prototype.uToV = function () {
    var args = [this.vPinName].concat(Array.prototype.slice.call(arguments));
    this.v.pinReceives.apply(this.v, args);
};

CCLine.prototype.vToU = function () {
    var args = [this.uPinName].concat(Array.prototype.slice.call(arguments));
    this.u.pinReceives.apply(this.u, args);
};


export default CCLine;