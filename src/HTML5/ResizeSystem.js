import AElement from "./AElement";

function ResizeSystem(){
    this.elts = [];
    this.cache = [];
    this.lastResizeTime = 0;
    window.addEventListener('resize', this.update.bind(this));
}


ResizeSystem.prototype.update = function (){
    var thisRS = this;
    var now = new Date().getTime();
    if (now - 100 > this.lastResizeTime) {
        this.removeResizeSystemTrash();
        this.cache = undefined;
    }

    this.lastResizeTime = now;

    function visitor(child) {
        if (typeof child.requestUpdateSize == 'function') {
            child.requestUpdateSize();
            return true;
        }
        else if (typeof child.updateSize == 'function') {
            child.updateSize();
            return true;
        }
        else if (typeof child.onresize == 'function') {
            child.onresize();
            return true;
        }
    }

    if (this.cache === undefined) {
        this.cache = [];
        this.ResizeSystemElts.forEach(function (e) {
            this.elt.$('', e, function (child) {
                if (visitor(child))
                    thisRS.cache.push(child);
            });
        });

    }
    else {
        this.cache.forEach(visitor);
    }
}

ResizeSystem.prototype.removeTrash = function (){
    this.elts = this.elts.filter(function (element) {
        return AElement.prototype.isDescendantOf.call(element, document.body);
    });
};

/***
 *
 * @param  fromElt
 * @returns {boolean}
 */
ResizeSystem.prototype.updateUp = function (fromElt){
    while (fromElt) {
        if (typeof fromElt.requestUpdateSize == 'function') {
            fromElt.requestUpdateSize();
            return true;
        }
        else if (typeof fromElt.updateSize == 'function') {
            fromElt.updateSize();
            return true;
        }
        else if (typeof fromElt.onresize == 'function') {
            fromElt.onresize();
            return true;
        }
        fromElt = fromElt.parentElement;
    }
};

ResizeSystem.add = function (elt){
    for (var i = 0; i < this.elts.length; ++i)
        if (AElement.prototype.isDescendantOf.call(elt, this.elts[i])) {
            return false;
        }
    this.elts = this.elts.filter(function (e) {
        return !AElement.prototype.isDescendantOf.call(e, elt);
    });
    this.elts.push(elt);
    return true;
}

export default new ResizeSystem();