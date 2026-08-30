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



AElement.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ"];


export default AElement;