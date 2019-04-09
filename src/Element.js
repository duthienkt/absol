import ElementMatcher from './ElementMatcher';
import BrowserDetector from './BrowserDectector';
import EventEmittor from './EventEmittor';

function Element(){
    this.absolInstanceOf = this.absolInstanceOf || {};
    if (this.absolInstanceOf['Element']) return;
    this.absolInstanceOf['Element'] = true;
    EventEmittor.call(this);
    Object.assign(this, Element.prototype);
    Element.fixBrowserEvent(this);
}


Element.prototype.init = function (props) {
    Object.assign(this, props || {});
};

Element.prototype.attr = function (arg0, arg1) {
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.attr(key, arg0[key]);
        }
    }
    else {
        if (arguments.length == 1) return this.getAttribute(arg0);
        if (arg1 == undefined) {
            this.removeAttribute(arg0);
        }
        else {
            this.setAttribute(arg0, arg1);
        }
    }
    return this;
};

Element.prototype._styleIndex = function (string) {
    return string.replace(/\-(.)/g, function (full, c) {
        return c.toUpperCase();
    })
};

Element.prototype.addStyle = function (arg0, arg1) {
    if (typeof arg0 == 'string')
        this.style[this._styleIndex(arg0)] = arg1;
    else {
        for (var key in arg0)
            this.addStyle(key, arg0[key]);
    }
    return this;
};

Element.prototype.removeStyle = function (arg0) {
    if (typeof arg0 == 'string') {
        var key = this._styleIndex(arg0);
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

Element.prototype.afterAttached = function (frameTimeOut) {
    if (!frameTimeOut) frameTimeOut = 25;
    var tracer = new Error();
    var current = this;
    return new Promise(function (resolve, reject) {
        var delayTime = 0;
        function trace() {
            if (frameTimeOut < 0) {
                // reject(tracer);
                if (absol.BUILD && absol.BUILD.version == "DEBUG")
                    console.warn("Element not attached", trace);
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

Element.prototype.afterDisplayed = function (requestTimesOut) {
    if (!requestTimesOut) requestTimesOut = 24 * 3600 * 33;
    var tracer = new Error();
    var current = this;
    return new Promise(function (resolve, reject) {
        function trace() {
            if (requestTimesOut < 0) {
                // reject(tracer);
                if (absol.BUILD && absol.BUILD.version == "DEBUG")
                    console.warn("Element not displayed", trace);
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
        requestAnimationFrame(trace);
    });
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


Element.prototype.getComputedStyleValue = function (key) {
    return window.getComputedStyle(this).getPropertyValue(key);

};

Element.prototype.getFontSize = function () {
    return parseFloat(this.getComputedStyleValue('font-size').replace('px', ''));
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


Element.fixBrowserEvent = function (element) {
    if (BrowserDetector.isSafari && !BrowserDetector.isMobile) {
        if (!element.isSupportedEvent('mouseleave')) {
            element.defineEvent('mouseleave');
            var mouseLeaveEventHandler = function (event) {
                var bound = this.getBoundingClientRect();
                var ok = false;
                ok |= event.clientX < bound.left + 1;
                ok |= event.clientX >= bound.right - 1;
                ok |= event.clientY < bound.top + 1;
                ok |= event.clientY >= bound.bottom - 1;
                if (ok) this.emit('mouseleave', event);
            };
            element.addEventListener('mouseleave', mouseLeaveEventHandler, true);
        }
    }

    if (BrowserDetector.isFirefox) {
        if (!element.isSupportedEvent('wheel')) {
            element.defineEvent('wheel');
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
                    }
                    if (!event.mozFixWheelScale) {
                        event.mozDeltaY = oldEvent.deltaY;
                        event.mozFixWheelScale = true;
                        Object.defineProperty(event, 'deltaY', { get: function () { return this.mozDeltaY * 100 / 3; } });
                    }
                    oldEvent.absolEvent = event;
                }
                this.emit('wheel', event);
            };
            element.addEventListener('wheel', wheelEventHandler);
        }
    }
};

Element.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ"];

export default Element;