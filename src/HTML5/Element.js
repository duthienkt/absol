import EventEmitor from './EventEmitor';

function Element() {
    this._azar_extendAttributes = this._azar_extendAttributes || [];
}

Object.defineProperties(Element.prototype, Object.getOwnPropertyDescriptors(EventEmitor));


/**
 * @typedef {Object} AttributeDefiner
 * @property {Function} set
 * @property {Function} get
 * @property {Function} remove
 * 
 * @param {String} key
 * @param {AttributeDefiner} def
 */
Element.prototype.defineAttribute = function (key, def) {
    this._azar_extendAttributes[key] = def;
};


Element.prototype.defineAttributes = function (defs) {
    for (var key in defs) {
        this.defineAttribute(key, defs[key]);
    }
};

Element.prototype.attr = function () {
    if (arguments.length == 1) {
        if (typeof (arguments[0]) == 'string') {
            if (this._azar_extendAttributes[arguments[0]]) {
                return this._azar_extendAttributes[arguments[0]].get.call(this);
            }
            else
                return this.getAttribute(arguments[0]);
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
                    this.removeAttribute(arguments[0]);
            }
            else {
                if (this._azar_extendAttributes[arguments[0]]) {
                    return this._azar_extendAttributes[arguments[0]].set.call(this, arguments[0]);
                }
                else
                    this.setAttribute(arguments[0], arguments[1]);
            }
        }
    }
    return this;
};


Element.prototype._azar_styleIndex = function (string) {
    return string.replace(/\-(.)/g, function (full, c) {
        return c.toUpperCase();
    })
};


Element.prototype.addStyle = function (arg0, arg1) {
    if (typeof arg0 == 'string')
        this.style[this._azar_styleIndex(arg0)] = arg1;
    else {
        for (var key in arg0)
            this.addStyle(key, arg0[key]);
    }
    return this;
};

Element.prototype.removeStyle = function (arg0) {
    if (typeof arg0 == 'string') {
        var key = this._azar_styleIndex(arg0);
        this.style[key] = null;
        delete this.style[key];
    }
    else {
        if (typeof arg0 instanceof Array) {
            for (var i = 0; i < arg0.length; ++i)
                this.removeStyle(arg0[i]);
        }
        else {
            for (var key in arg0)
                this.removeStyle(key);
        }
    }
    return this;
};



Element.prototype.addChild = function (child) {
    if (child instanceof Array) {
        for (var i = 0; i < child.length; ++i)
            this.appendChild(child[i]);
    }
    else
        this.appendChild(child);
    return this;
};


Element.prototype.addTo = function (parent) {
    if (parent && parent.appendChild) {
        if (parent.addChild)
            parent.addChild(this);
        else
            parent.appendChild(this);
    }
    else throw Error("Can not append to " + parent + "!");
    return this;
};




Element.prototype.selfReplace = function (newNode) {
    if (this.parentElement)
        this.parentElement.replaceChild(newNode, this);
    return this;
};

Element.prototype.clearChild = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
    return this;
};

/**
 * 
 * @param {string} className 
 * @returns {Boolean}
 */
Element.prototype.containsClass = function (className) {
    if (className instanceof Array) {
        for (var i = 0; i < className.length; ++i)
            if (!this.classList.containsClass(className[i])) return false;
        return true;
    }
    else
        return this.classList.contains(className);
};

/**
 * 
 * @param {string} className 
 * @returns {Element}
 */
Element.prototype.addClass = function (className) {
    if (className instanceof Array) {
        for (var i = 0; i < className.length; ++i)
            this.classList.add(className[i]);
    }
    else
        this.classList.add(className);
    return this;
};

/**
 * 
 * @param {string} className 
 * @returns {Element}
 */
Element.prototype.removeClass = function (className) {
    if (className instanceof Array) {
        for (var i = 0; i < className.length; ++i)
            this.classList.remove(className[i]);
    }
    else
        this.classList.remove(className);
    return this;
};



Element.prototype.getComputedStyleValue = function (key) {
    return window.getComputedStyle(this).getPropertyValue(key);

};

Element.prototype.getFontSize = function () {
    return parseFloat(this.getComputedStyleValue('font-size').replace('px', ''));
};


Element.prototype.findChildAfter = function (obj) {
    var r = 0;
    for (var i = 0; i < this.childNodes.length; ++i) {
        if (obj == this.childNodes[i]) {
            r = i + 1;
            break;
        }
    }
    if (this.childNodes[r]) return this.childNodes[r];
    return undefined;
};

Element.prototype.findChildBefore = function (obj) {
    var r = 0;
    for (var i = 0; i < this.childNodes.length; ++i) {
        if (obj == this.childNodes[i]) {
            r = i - 1;
            break;
        }
    }
    if (this.childNodes[r]) return this.childNodes[r];
    return undefined;
};

Element.prototype.addChildBefore = function (newItem, bf) {
    this.insertBefore(newItem, bf);
    return this;
};

Element.prototype.addChildAfter = function (newItem, at) {
    var bf = this.findChildAfter(at);
    if (bf) return this.addChildBefore(newItem, bf);
    return this.addChild(newItem);
};

/**
 * @returns {DOMRect}
 */
Element.prototype.getBoundingRecursiveRect = function () {
    var matcher = new ElementMatcher();
    var bound = this.getBoundingClientRect();
    var ac = { left: bound.left, right: bound.right, top: bound.top, bottom: bound.bottom, width: bound.right - bound.left, height: bound.bottom - bound.top };
    return matcher.findAll(this).reduce(function (ac, cr) {
        if (!cr.getBoundingClientRect) return ac;
        var cRect = cr.getBoundingClientRect();
        //it not display
        if (!cRect || cRect.width * cRect.height == 0) return ac;
        ac.left = Math.min(ac.left, cRect.left);
        ac.top = Math.min(ac.top, cRect.top);
        ac.bottom = Math.max(ac.bottom, cRect.bottom);
        ac.right = Math.max(ac.right, cRect.right);
        ac.height = ac.bottom - ac.top;
        ac.width = ac.right - ac.left;
        return ac;
    }, ac);
};


Element.prototype.isDescendantOf = function (parent) {
    var child = this;
    while (child) {
        if (child == parent) return true;
        child = child.parentNode;
    }
    return false;
};



/***
 * WARNING: this function may be unsafe
 */
Element.prototype.afterAttached = function (frameTimeOut) {
    if (!frameTimeOut) frameTimeOut = 25;
    // var tracer = new Error();
    var current = this;
    return new Promise(function (resolve, reject) {
        var delayTime = 0;
        function trace() {
            if (frameTimeOut < 0) {
                // reject(tracer);
                // if (absol.BUILD && absol.BUILD.version == "DEBUG")
                //     console.warn("Element not attached", trace);
            }
            else {
                frameTimeOut--;
                while (true) {
                    if (current == document.body) {
                        resolve();
                        return;
                    }
                    else {
                        if (current.parentNode) {
                            current = current.parentNode;
                        } else {
                            if (delayTime < 25)
                                delayTime += 1;
                            else if (delayTime < 100) {
                                delayTime += 5;
                            }
                            else
                                if (delayTime < 1000) {
                                    delayTime += 10;
                                }

                            setTimeout(trace, delayTime);
                            return;
                        }
                    }
                }
            }
        };
        setTimeout(trace, 0);
    });
};



/***
 * WARNING: this function may be unsafe
 */
Element.prototype.afterDisplayed = function (requestTimesOut) {
    if (!requestTimesOut) requestTimesOut = 24 * 3600 * 33;
    // var tracer = new Error();
    var current = this;
    return new Promise(function (resolve, reject) {
        function trace() {
            if (requestTimesOut < 0) {
                // reject(tracer);
                // if (absol.BUILD && absol.BUILD.version == "DEBUG")
                //     console.warn("Element not displayed", trace);
            }
            else {
                requestTimesOut--;
                var bound = current.getBoundingClientRect();
                if (bound.width > 0 || bound.height > 0) {
                    resolve();
                }
                else {
                    setTimeout(trace, 33);
                    return;
                }
            }
        };
        trace();
    });
};

export default Element;