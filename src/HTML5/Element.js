import EventEmitter from './EventEmitter';
import BrowserDetector from '../Detector/BrowserDetector';
import { kebabCaseToCamelCase } from '../String/stringFormat';

/***
 *
 * @constructor
 * @augments HTMLElement
 * @augments EventEmitter
 */
function Element() {
    EventEmitter.call(this);
    this._azar_extendAttributes = this._azar_extendAttributes || {};
}

Object.defineProperties(Element.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
Element.prototype.init = function (props) {
    Object.assign(this, props || {});
};

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
                    this._azar_extendAttributes[arguments[0]].remove.call(this, arguments[1]);
                }
                else
                    this.removeAttribute(arguments[0]);
            }
            else {
                if (this._azar_extendAttributes[arguments[0]]) {
                    this._azar_extendAttributes[arguments[0]].set.call(this, arguments[1]);
                }
                else {

                    this.setAttribute(arguments[0], arguments[1]);
                }
            }
        }
    }
    return this;
};


Element.prototype.addStyle = function (arg0, arg1) {
    if (typeof arg0 == 'string')
        this.style[kebabCaseToCamelCase(arg0)] = arg1;
    else {
        for (var key in arg0)
            this.addStyle(key, arg0[key]);
    }
    return this;
};

Element.prototype.removeStyle = function (arg0) {
    var key;
    if (typeof arg0 == 'string') {
        key = kebabCaseToCamelCase(arg0);
        this.style[key] = null;
        delete this.style[key];
    }
    else {
        if (typeof arg0 instanceof Array) {
            for (var i = 0; i < arg0.length; ++i)
                this.removeStyle(arg0[i]);
        }
        else {
            for (key in arg0)
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


Element.prototype.selfRemove = function () {
    if (this.parentElement)
        this.parentElement.removeChild(this);
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
Element.prototype.getBoundingRecursiveRect = function (depth) {
    if (depth === undefined) depth = 10000;

    var current, next;
    var oo = 1000000;
    var ac = { left: oo, right: -oo, top: oo, bottom: -oo, width: 0, height: 0 };
    var stacks = [{ e: this, d: 0 }];
    while (stacks.length > 0) {
        current = stacks.pop();

        if (current.e.getBoundingClientRect) {
            var cRect = current.e.getBoundingClientRect();
            if (!cRect || !(cRect.width || cRect.height || cRect.left || cRect.right)) continue;
            ac.left = Math.min(ac.left, cRect.left);
            ac.top = Math.min(ac.top, cRect.top);
            ac.bottom = Math.max(ac.bottom, cRect.bottom);
            ac.right = Math.max(ac.right, cRect.right);
            ac.height = ac.bottom - ac.top;
            ac.width = ac.right - ac.left;
            var childNodes = current.e.childNodes;
            if (childNodes && childNodes.length > 0 && current.d < depth) {
                for (var i = 0; i < childNodes.length; ++i) {
                    next = { e: childNodes[i], d: current.d + 1 };
                    stacks.push(next);
                }
            }
        }
    }

    return ac;
};


Element.prototype.isDescendantOf = function (parent) {
    var child = this;
    while (child) {
        if (child == parent) return true;
        child = child.parentNode;
    }
    return false;
};


/*************************** **********************/
Element.prototype.getCSSRules = function () {
    var sheets = document.styleSheets;
    var ret = [];
    this.matches = this.matches || this.webkitMatchesSelector || this.mozMatchesSelector
        || this.msMatchesSelector || this.oMatchesSelector;
    for (var i in sheets) {
        if (sheets[i].href) continue;//because can not access, you must clone link node instead
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (this.matches(rules[r].selectorText)) {
                ret.push(rules[r]);
            }
        }
    }
    return ret;
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
        }
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
        }
        trace();
    });
};



!(function () {
    var origin = Element.prototype.on;
    if (BrowserDetector.isSafari && !BrowserDetector.isMobile) {
        Element.prototype.on = function () {
            if (!this.isSupportedEvent('mouseleave') && arguments[0] == 'mouseleave') {
                this.defineEvent('mouseleave');
                var mouseLeaveEventHandler = function (event) {
                    var bound = this.getBoundingClientRect();
                    var ok = false;
                    ok |= event.clientX < bound.left + 1;
                    ok |= event.clientX >= bound.right - 1;
                    ok |= event.clientY < bound.top + 1;
                    ok |= event.clientY >= bound.bottom - 1;
                    if (ok) this.emit('mouseleave', event);
                };
                this.addEventListener('mouseleave', mouseLeaveEventHandler, true);
            }
            origin.apply(this, arguments);
            return this;
        };
    }

    if (BrowserDetector.isFirefox) {
        Element.prototype.on = function () {
            if (!this.isSupportedEvent('wheel') && arguments[0] == 'wheel') {

                this.defineEvent('wheel');
                var wheelEventHandler = function (oldEvent) {
                    //clone event to avoid some lib fix it
                    var event = oldEvent.absolEvent;
                    if (!event) {
                        event = Object.assign({}, oldEvent);
                        for (var i = 0; i < Element.eventProperties.length; ++i) {
                            var key = Element.eventProperties[i];
                            if (typeof (event[key]) == 'function') {
                                event[key] = event[key].bind(oldEvent);
                            }
                        }

                        event.preventDefault = function () {
                            oldEvent.preventDefault();
                        };
                        if (!event.mozFixWheelScale) {
                            event.mozDeltaY = oldEvent.deltaY;
                            event.mozFixWheelScale = true;
                            Object.defineProperty(event, 'deltaY', { get: function () { return this.mozDeltaY * 100 / 3; } });
                        }
                        oldEvent.absolEvent = event;
                    }
                    this.emit('wheel', event);
                };
                this.addEventListener('wheel', wheelEventHandler);
            }
            origin.apply(this, arguments);
            return this;
        };
    }

}());

Element.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ"];




export default Element;