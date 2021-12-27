import {randomIdent} from "../../String/stringGenerate";
import safeThrow from "../../Code/safeThrow";

/***
 *
 * @param {{id?:string}=} opt
 * @constructor
 */
function CCBlock(opt) {
    opt = opt || {};
    this.id = opt.id || randomIdent(16);
    Object.defineProperty(this, '__cc_listener__', {
        enumerable: false,
        configurable: true,
        writable: false,
        value: {}
    });

    Object.defineProperty(this, '__cc_line_list_by_id__', {
        enumerable: false,
        configurable: true,
        writable: false,
        value: {}
    });
}

/***
 *
 * @param {string} pinName
 * @param {function} listener
 * @return {CCBlock}
 */
CCBlock.prototype.pinOn = function (pinName, listener) {
    var cbList;
    if (this.__cc_listener__[pinName]) {
        cbList = this.__cc_listener__[pinName];
    } else {
        cbList = [];
        this.__cc_listener__[pinName] = cbList;

    }
    if (cbList.indexOf(listener) < 0) {
        cbList.push(listener);
    } else {
        console.warn("Duplicate pin listener!");
    }
    return this;
};

CCBlock.prototype.pinOff = function (pinName, listener) {
    if (!this.__cc_listener__[pinName]) return this;
    var cbList = this.__cc_listener__[pinName];
    var cbIdx = cbList.indexOf(listener);
    if (cbIdx >= 0) {
        cbList.splice(cbIdx);
    }
    return this;
};

CCBlock.prototype.pinFire = function (pinName) {
    if (!this.__cc_listener__[pinName]) return this;
    var cbList = this.__cc_listener__[pinName].slice();
    var args = Array.prototype.slice.call(arguments, 1);
    if (args.length === 0 && this.pinHandlers[pinName] && this.pinHandlers[pinName].get && cbList.length > 0)
        args.push(this.pinGetValue(pinName));
    for (var i = 0; i < cbList.length; ++i) {
        try {
            cbList[i].apply(this, args);
        } catch (e) {
            safeThrow(e);
        }
    }
};

CCBlock.prototype.pinFireAll = function () {
    var pinNames = Object.keys(this.pinHandlers);
    var pinName;
    for (var i = 0; i < pinNames.length; ++i) {
        pinName = pinNames[i];
        if (this.pinHandlers[pinName] && this.pinHandlers[pinName].get)
            this.pinFire(pinName);
    }
};


CCBlock.prototype.pinReceives = function (pinName) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (this.pinHandlers[pinName] && this.pinHandlers[pinName].receives) {
        this.pinHandlers[pinName].receives.apply(this, args);
    }
};

CCBlock.prototype.pinGetValue = function (pinName) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (this.pinHandlers[pinName] && this.pinHandlers[pinName].get) {
        return this.pinHandlers[pinName].get.apply(this, args);
    }
    return undefined;
};


CCBlock.prototype.pinGetDescriptor = function (pinName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var descriptor = this.pinHandlers[pinName] && this.pinHandlers[pinName].descriptor;
    if (descriptor) {
        if (typeof descriptor === "function")
            return this.pinHandlers[pinName].get.apply(this, args);
        return descriptor;
    }
    return undefined;
};

Object.defineProperty(CCBlock.prototype, 'pinLines', {
    get: function () {
        var lineList = this.__cc_line_list_by_id__;
        return Object.keys(lineList).map(function (id) {
            return lineList[id];
        });
    }
});


CCBlock.prototype.pinHandlers = {};

export default CCBlock;