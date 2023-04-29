import AElement from "./AElement";
import AElementNS from "./AElementNS";
import DomSignal from "./DomSignal";

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
    setTimeout(() => {
        this.domSignal = new DomSignal();
        this.domSignal.on('request_update_signal', this.update.bind(this));
        this.domSignal.on('request_update_pending_signal', this.updatePending.bind(this));
    }, 1000);
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
    this.elts = this.elts.filter(function (element) {
        return AElement.prototype.isDescendantOf.call(element, document.body);
    });
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
        if (typeof fromElt.requestUpdateSize == 'function') {
            fromElt.requestUpdateSize();
            found = true;
        }
        else if (typeof fromElt.updateSize == 'function') {
            fromElt.updateSize();
            found = true;

        }
        else if (typeof fromElt.onresize == 'function') {
            fromElt.onresize();
            found = true;
        }
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