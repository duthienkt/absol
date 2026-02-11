import EventEmitter from './EventEmitter';
import BrowserDetector from '../Detector/BrowserDetector';
import OOP from "./OOP";


/***
 * @global
 * @augments Node
 * @augments ChildNode
 * @augments ParentNode
 * @augments Element
 * @augments HTMLElement
 * @augments EventEmitter
 * @augments ElementCSSInlineStyle
 * @constructor
 * @class
 */
function AElement() {
    EventEmitter.call(this);
    this._azar_extendAttributes = this._azar_extendAttributes || {};
    this._azar_extendTags = {};
    this.eventHandler = {};
}

OOP.mixClass(AElement, EventEmitter);

AElement.prototype.init = function (props) {
    Object.assign(this, props || {});
};


AElement.prototype.eventHandler = {};

/***
 * run super-class method
 */
AElement.prototype.super = function () {/* nope */
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
AElement.prototype.defineAttribute = function (key, def) {
    this._azar_extendAttributes[key] = def;
};


/**
 * Defines multiple attributes with their get/set/remove handlers
 * @param {Object.<string, AttributeDefiner>} defs - Object mapping attribute names to their definitions
 * @returns {void}
 */
AElement.prototype.defineAttributes = function (defs) {
    for (var key in defs) {
        this.defineAttribute(key, defs[key]);
    }
};


/**
 * Gets, sets, or removes attributes on the element
 * @param {string|Object} arg0 - Attribute name or object containing key-value pairs of attributes
 * @param {*} [arg1] - Value to set for the attribute. If null/undefined, removes the attribute
 * @returns {*} Returns attribute value when getting single attribute, or this for method chaining
 * @example
 * // Get attribute
 * element.attr('id')
 * // Set attribute
 * element.attr('id', 'myId')
 * // Set multiple attributes
 * element.attr({id: 'myId', class: 'myClass'})
 * // Remove attribute
 * element.attr('id', null)
 */
AElement.prototype.attr = function () {
    if (arguments.length === 1) {
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
        if (arguments.length === 2) {
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

/***
 * add style
 * @param {CSSStyleDeclaration|string|{}} arg0
 * @param {string} arg1
 * @returns {this}
 */
/**
 * add style
 * @param {CSSStyleDeclaration|string|{}} arg0
 * @param {string|[]=} arg1
 * @returns {this}
 */
AElement.prototype.addStyle = function (arg0, arg1) {
    if (typeof arg0 == 'string')
        if (arg0.indexOf('-') >= 0) {
            if (arg1 && arg1.forEach) {
                this.style.setProperty.apply(this.style, [arg0].concat(arg1));
            }
            else {
                this.style.setProperty(arg0, arg1);
            }
        }
        else {
            this.style[arg0] = arg1;
        }
    else {
        for (var key in arg0)
            this.addStyle(key, arg0[key]);
    }
    return this;
};

/***
 *
 * @param {string|string[]|CSSStyleDeclaration} arg0
 * @returns {this}
 */
AElement.prototype.removeStyle = function (arg0) {
    var key;
    if (arg0.charAt) {
        if (arg0.indexOf('-') >= 0) {
            this.style.removeProperty(arg0);
        }
        else {
            this.style[arg0] = null;
            delete this.style[arg0];
        }
    }
    else {
        if (arg0.map && arg0.forEach) {
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

/**
 * Adds one or more child nodes to this element
 * @param {Node|Array<Node>} child - A single Node or array of Nodes to append as children
 * @returns {this} Returns this element for method chaining
 * @example
 * // Add single child
 * element.addChild(childNode);
 * // Add multiple children
 * element.addChild([child1, child2, child3]);
 */
AElement.prototype.addChild = function (child) {
    if (child.indexOf && child.map && child.forEach) {
        for (var i = 0; i < child.length; ++i)
            this.appendChild(child[i]);
    }
    else
        this.appendChild(child);
    return this;
};


/**
 * Adds this element as a child to the specified parent element
 * @param {Node} parent - The parent element to append this element to
 * @returns {this} Returns this element for method chaining
 * @throws {Error} If parent is not a valid node that can accept children
 */
AElement.prototype.addTo = function (parent) {
    if (parent && parent.appendChild) {
        if (parent.addChild)
            parent.addChild(this);
        else
            parent.appendChild(this);
    }
    else throw Error("Can not append to " + parent + "!");
    return this;
};


/**
 * Removes this element from its parent node if it has one
 * @returns {this} Returns this element for method chaining
 */
AElement.prototype.selfRemove = function () {
    if (this.parentElement)
        this.parentElement.removeChild(this);
    return this;
};


/**
 * Replaces this element with another node in the DOM tree
 * @param {Node} newNode - The node to replace this element with
 * @returns {this} Returns this element for method chaining
 */
AElement.prototype.selfReplace = function (newNode) {
    if (this.parentElement)
        this.parentElement.replaceChild(newNode, this);
    return this;
};

/**
 * Removes all child nodes from this element
 * @returns {this} Returns this element for method chaining
 */
AElement.prototype.clearChild = function () {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
    return this;
};




/**
 *
 * @param {string|Array} className
 * @returns {Boolean}
 */
AElement.prototype.hasClass = function (className) {
    return this.classList.contains(className);
};


/**
 *
 * @param {string|Array} className
 * @returns {this}
 */
AElement.prototype.addClass = function (className) {
    if (!className) return this;
    if (className.forEach && className.map) {
        for (var i = 0; i < className.length; ++i)
            this.classList.add(className[i]);
    }
    else
        this.classList.add(className);
    return this;
};

/**
 *
 * @param {string|Array} className
 * @returns {this}
 */
AElement.prototype.removeClass = function (className) {
    if (className && className.forEach && className.map) {
        for (var i = 0; i < className.length; ++i)
            this.classList.remove(className[i]);
    }
    else
        this.classList.remove(className);
    return this;
};


/**
 * Gets the computed style value for a specific CSS property
 * @param {string} key - The CSS property name
 * @returns {string} The computed style value
 */
AElement.prototype.getComputedStyleValue = function (key) {
    return window.getComputedStyle(this).getPropertyValue(key);

};

/**
 * Gets the computed font size in pixels
 * @returns {number} The font size in pixels
 */
AElement.prototype.getFontSize = function () {
    return parseFloat(this.getComputedStyleValue('font-size').replace('px', ''));
};


/**
 * Finds the child node that comes immediately after the specified node
 * @param {Node} obj - The reference node
 * @returns {Node|undefined} The next sibling node or undefined if none exists
 */
AElement.prototype.findChildAfter = function (obj) {
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

/**
 * Finds the child node that comes immediately before the specified node
 * @param {Node} obj - The reference node
 * @returns {Node|undefined} The previous sibling node or undefined if none exists
 */
AElement.prototype.findChildBefore = function (obj) {
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

/**
 * Inserts a new child node before a reference node
 * @param {Node} newItem - The node to insert
 * @param {Node} bf - The reference node
 * @returns {this} Returns this element for method chaining
 */
AElement.prototype.addChildBefore = function (newItem, bf) {
    this.insertBefore(newItem, bf);
    return this;
};

/**
 * Inserts a new child node after a reference node
 * @param {Node} newItem - The node to insert
 * @param {Node} [at] - The reference node. If not provided, inserts at the beginning
 * @returns {this} Returns this element for method chaining
 * @throws {Error} If the reference node is not a child of this element
 */
AElement.prototype.addChildAfter = function (newItem, at) {
    var atIdx;
    if (at) {
        atIdx = Array.prototype.indexOf.call(this.childNodes, at);
        if (atIdx >= 0) {
            this.insertBefore(newItem, this.childNodes[atIdx + 1]);
        }
        else {
            throw new Error("Failed to execute 'addChildAfter' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
        }
    }
    else {
        this.insertBefore(newItem, this.firstChild);
    }
    return this;
};

/**
 * @returns {DOMRect}
 */
AElement.prototype.getBoundingRecursiveRect = function (depth) {
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

/***
 *
 * @param parent
 * @returns {boolean}
 */
/**
 * Checks if this element is a descendant of the specified parent element
 * @param {Node} parent - The potential ancestor node
 * @returns {boolean} True if this element is a descendant of the parent, false otherwise
 */
AElement.prototype.isDescendantOf = function (parent) {
    if (!parent || !parent.childNodes || !parent.childNodes.length) return false;
    var child = this;
    while (child) {
        if (child === parent) return true;
        child = child.parentNode;
    }
    return false;
};


/*************************** **********************/

/**
 * Gets all CSS rules that match this element from document stylesheets
 * @returns {Array<CSSStyleRule>} Array of CSS style rules that match this element
 * @example
 * // Get all CSS rules affecting an element
 * const rules = element.getCSSRules();
 * rules.forEach(rule => console.log(rule.selectorText, rule.style));
 */
AElement.prototype.getCSSRules = function () {
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
 * @returns {Promise}
 */


/***
 * WARNING: this function may be unsafe
 */
AElement.prototype.afterDisplayed = function (requestTimesOut) {
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

AElement.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ"];


export default AElement;