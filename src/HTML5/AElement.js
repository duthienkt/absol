import EventEmitter from './EventEmitter';
import OOP, { quickAssign } from "./OOP";
import ExtElement from "./ExtElement";




/***
 * @global
 * @augments Node
 * @augments ChildNode
 * @augments ParentNode
 * @augments Element
 * @augments HTMLElement
 * @augments EventEmitter
 * @augments ElementCSSInlineStyle
 * @augments ExtElement
 * @constructor
 * @class
 */
function AElement() {
    EventEmitter.call(this);
    this._azar_extendAttributes = this._azar_extendAttributes || {};
    this._azar_extendTags = this._azar_extendTags || {};
    this.eventHandler = {};
}

OOP.mixClass(AElement, EventEmitter, ExtElement);


AElement.prototype.eventHandler = {};

/***
 * @deprecated
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
            if (this._azar_extendAttributes && this._azar_extendAttributes[arguments[0]]) {
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
                if (this._azar_extendAttributes && this._azar_extendAttributes[arguments[0]]) {
                    this._azar_extendAttributes[arguments[0]].remove.call(this, arguments[1]);
                }
                else
                    this.removeAttribute(arguments[0]);
            }
            else {
                if (this._azar_extendAttributes && this._azar_extendAttributes[arguments[0]]) {
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


AElement.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ"];


export default AElement;