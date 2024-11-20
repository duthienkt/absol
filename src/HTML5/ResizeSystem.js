import AElement from "./AElement";
import AElementNS from "./AElementNS";
import DelaySignal from "./DelaySignal";

/**
 * @name requestUpdateSize
 * @type {function}
 * @memberof AElement#
 */

/**
 * @name updateSize
 * @type {function}
 * @memberof AElement#
 */

/**
 * @name onresize
 * @type {function}
 * @memberof AElement#
 */

/**
 * @name requestRevokeResource
 * @type {function}
 * @memberof AElement#
 */


/**
 *
 * @constructor
 */
function ResizeSystem() {
    this.elts = [];
    this.cache = [];
    this.cacheOf = null;
    this.lastResizeTime = 0;

    this.pendingElts = {};

    window.addEventListener('resize', this.update.bind(this));
    this['goDown' + 'AndCache'] = this.goDownAndCache.bind(this);
    this['notify' + 'ToElt'] = this.notifyToElt.bind(this);

    var setup = ()=>{
        this.domSignal = new DelaySignal();
        this.domSignal.on('request_update_signal', this.update.bind(this));
        this.domSignal.on('request_update_pending_signal', this.updatePending.bind(this));
        window.removeEventListener("load", setup);
    }
    if (document.body) {
       setup();
    }
    else {
        window.addEventListener("load", setup);
    }
}

/***
 *
 * @param {AElement | AElementNS} elt
 */
ResizeSystem.prototype.goDownAndCache = function (elt) {
    if (this.notifyToElt(elt))
        this.cache.push(elt);
    if (elt.childNodes) {
        Array.prototype.forEach.call(elt.childNodes, this.goDownAndCache);
    }
};

ResizeSystem.prototype.notifyToElt = function (elt) {
    try {
        if (typeof elt.requestUpdateSize == 'function') {
            elt.requestUpdateSize();
            return true;
        }
        else if (typeof elt.updateSize == 'function') {
            elt.updateSize();
            return true;
        }
        else if (typeof elt.onresize == 'function') {
            elt.onresize();
            return true;
        }
    } catch (err) {
        console.error(err);
    }
};


ResizeSystem.prototype.update = function () {
    var now = Date.now();
    if (now - 100 > this.lastResizeTime) {
        this.removeTrash();
        this.cache = undefined;
    }
    this.lastResizeTime = now;
    if (this.cacheOf !== null) {
        this.cache = undefined;
        this.cacheOf = null;
    }


    if (this.cache === undefined) {
        this.cache = [];
        this.elts.forEach(this.goDownAndCache);
    }
    else {
        this.cache.forEach(this.notifyToElt);
    }
};

ResizeSystem.prototype.requestUpdateSignal = function () {
    if (!this.domSignal) return;
    this.domSignal.emit('request_update_signal');
};


ResizeSystem.prototype.removeTrash = function () {
    var oldArr = this.elts;
    var newArr = [];
    var elt;
    var n = oldArr.length;
    for (var i = 0; i < n; ++i) {
        elt = oldArr[i];
        if (AElement.prototype.isDescendantOf.call(elt, document.body)) {
            newArr.push(elt);
        }
        else if (typeof elt.requestRevokeResource === "function") {
            elt.requestRevokeResource();
        }
    }
    this.elts = newArr;
};

/***
 *
 * @param  {AElement| AElementNS | Node} fromElt
 * @param  {boolean=} toRoot
 * @returns {boolean}
 */
ResizeSystem.prototype.updateUp = function (fromElt, toRoot) {
    var found = false;
    while (fromElt && (!found || toRoot)) {
        found = this.notifyToElt(fromElt);
        fromElt = fromElt.parentElement;
    }
    return found;
};

ResizeSystem.prototype.updatePending = function () {
    var o = this.pendingElts;
    this.pendingElts = {};
    for (var key in o) {
        this.notifyToElt(o[key]);
    }
};

/***
 *
 * @param  {AElement| AElementNS | Node} fromElt
 * @param  {boolean=} toRoot
 * @returns {boolean}
 */
ResizeSystem.prototype.requestUpdateUpSignal = function (fromElt, toRoot) {
    if (!this.domSignal) return;
    var elts = [];
    var found = false;
    while (fromElt && (!found || toRoot)) {
        if (typeof fromElt.requestUpdateSize == 'function'
            || typeof fromElt.updateSize == 'function'
            || typeof fromElt.onresize == 'function'
        ) {
            elts.push(fromElt);
            found = true;
        }
        fromElt = fromElt.parentElement;
    }
    var pendingElts = this.pendingElts;
    elts.forEach(function (elt) {
        if (!elt.__resize_ident__) elt.__resize_ident__ = Date.now() + '_' + Math.random();
        if (!pendingElts[elt.__resize_ident__])
            pendingElts[elt.__resize_ident__] = elt;
    });
    this.domSignal.emit('request_update_pending_signal');
    return found;
};

/***
 *
 * @param  {AElement| AElementNS | Node} fromElt
 * @returns {boolean}
 */
ResizeSystem.prototype.updateDown = function (fromElt) {
    var now = Date.now();
    if (now - 100 > this.lastResizeTime) {
        this.cache = undefined;
    }
    this.lastResizeTime = now;
    if (this.cacheOf !== fromElt) {
        this.cache = undefined;
        this.cacheOf = fromElt;
    }
    if (this.cache === undefined) {
        this.cache = [];
        this.goDownAndCache(fromElt);
    }
    else {
        this.cache.forEach(this.notifyToElt);
    }
};

/***
 *
 * @param {AElement| AElementNS | Node} elt
 * @return {boolean}
 */
ResizeSystem.prototype.add = function (elt) {
    for (var i = 0; i < this.elts.length; ++i)
        if (AElement.prototype.isDescendantOf.call(elt, this.elts[i])) {
            return false;
        }
    this.elts = this.elts.filter(function (e) {
        return !AElement.prototype.isDescendantOf.call(e, elt);
    });
    this.removeTrash();
    this.cache = undefined;
    this.elts.push(elt);
    return true;
};

export default new ResizeSystem();