import safeThrow from "../Code/safeThrow";


/**
 * EventEmitter class for handling event-based communication
 * @constructor
 */
function EventEmitter() {
    if (!this._azar_extendEvents) {
        Object.defineProperty(this, '_azar_extendEvents', {
            enumerable: false,
            value: this._azar_extendEvents || { supported: {}, prioritize: {}, nonprioritize: {} }
        });
        Object.defineProperty(this, '__azar_force', {
            value: !(typeof Node === "object" ? this instanceof Node : this && typeof this === "object" && typeof this.nodeType === "number" && typeof this.nodeName === "string"),
            enumerable: false
        });
    }
}


/**
 * Define supported events
 * @param {string|string[]} name - Event name or array of event names
 * @returns {EventEmitter} Returns this for chaining
 */
EventEmitter.prototype.defineEvent = function (name) {
    if (name instanceof Array) {
        for (var i = 0; i < name.length; ++i)
            this._azar_extendEvents.supported[name[i]] = true;
    }
    else
        this._azar_extendEvents.supported[name] = true;
    return this;
};

/**
 * Check if an event is supported
 * @param {string} name - Event name to check
 * @returns {boolean} True if event is supported
 */
EventEmitter.prototype.isSupportedEvent = function (name) {
    return this.__azar_force || !!this._azar_extendEvents.supported[name];
};


/**
 * Emit an event
 * @param {string} eventName - Name of the event to emit
 * @param {*} data - Data to pass to event handlers
 */
EventEmitter.prototype.emit = function (eventName, data) {
    this.fire.apply(this, arguments);
};

/**
 * Fire an event (alias for emit)
 * @param {string} eventName - Name of the event to fire
 * @param {*} data - Data to pass to event handlers
 * @returns {EventEmitter} Returns this for chaining
 */
EventEmitter.prototype.fire = function (eventName, data) {
    var others = Array.prototype.slice.call(arguments, 1);
    var listenerList;
    var i;
    var startTime, endTime;
    if (this.isSupportedEvent(eventName)) {
        if (this._azar_extendEvents.prioritize[eventName]) {
            listenerList = this._azar_extendEvents.prioritize[eventName].slice();
            for (i = 0; i < listenerList.length; ++i) {
                try {
                    startTime = Date.now();
                    listenerList[i].wrappedCallback.apply(this, others);
                    endTime = Date.now();
                    if (endTime - startTime > 200) {
                        console.log('slow function call ('+(endTime - startTime)+')', listenerList[i]);
                    }
                } catch (e) {
                    safeThrow(e);
                }
            }
        }

        if (this._azar_extendEvents.nonprioritize[eventName]) {
            listenerList = this._azar_extendEvents.nonprioritize[eventName].slice();
            for (i = 0; i < listenerList.length; ++i) {
                try {
                    startTime = Date.now();
                    listenerList[i].wrappedCallback.apply(this, others);
                    endTime = Date.now();
                    if (endTime - startTime > 200) {
                        console.log('slow function call ('+(endTime - startTime)+')', listenerList[i]);
                    }
                } catch (e) {
                    safeThrow(e);
                }
            }
        }
    }
    else {
        if (this.dispatchEvent) {
            var event = new Event(eventName);
            data && Object.assign(event, data);
            this.dispatchEvent(event);
        }
        else
            throw new Error("Not support event " + eventName);
    }
    return this;
};


/**
 * Internal method to handle event binding
 * @param {boolean} isOnce - Whether the event should fire only once
 * @param {string|object} arg0 - Event name or events object
 * @param {function|object} arg1 - Callback function or options object
 * @param {boolean} [arg2] - Priority flag
 * @returns {EventEmitter} Returns this for chaining
 * @private
 */
EventEmitter.prototype.eventEmittorOnWithTime = function (isOnce, arg0, arg1, arg2) {
    var arg1Type;
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.eventEmittorOnWithTime(isOnce, key, arg0[key]);
        }
        return this;
    }
    else {
        arg1Type = typeof arg1;
        if (arg1Type === 'object') {
            return this.eventEmittorOnWithTime(isOnce, arg0, arg1.callback, arg1.cap);
        }
        else if (arg1Type === 'function') {
            var eventArr = this._azar_extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] || [];
            var eventIndex = -1;
            for (var i = 0; i < eventArr.length; ++i) {
                if (eventArr[i].wrappedCallback == arg1) {
                    eventIndex = i;
                    break;
                }
            }
            if (eventIndex < 0) {
                var event = { isOnce: isOnce, eventName: arg0, callback: arg1, cap: !!arg2 };
                //wrappedCallback will be call
                if (isOnce) {
                    event.wrappedCallback = function () {
                        this.off(event.eventName, event.wrappedCallback, event.cap);
                        event.callback.apply(this, arguments);
                    };
                }
                else {
                    event.wrappedCallback = event.callback;
                }

                if (!this.isSupportedEvent(arg0)) {
                    if (this.addEventListener) {
                        this.addEventListener(arg0, event.wrappedCallback, !!arg2);
                    }
                    else {
                        this.attachEvent('on' + arg0, arg1, !!arg2);
                    }
                }

                eventArr.push(event);
                this._azar_extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] = eventArr;
            }
            else {
                console.warn("dupplicate event");
            }

        }
        return this;
    }
};


/**
 * Add an event listener
 * @param {string|object} arg0 - Event name or events object
 * @param {function|object} arg1 - Callback function or options object
 * @param {boolean} [arg2] - Priority flag
 * @returns {EventEmitter} Returns this for chaining
 */
EventEmitter.prototype.on = function (arg0, arg1, arg2) {
    this.eventEmittorOnWithTime(false, arg0, arg1, arg2);
    return this;
};


/**
 * Add a one-time event listener
 * @param {string|object} arg0 - Event name or events object
 * @param {function|object} arg1 - Callback function or options object
 * @param {boolean} [arg2] - Priority flag
 * @returns {EventEmitter} Returns this for chaining
 */
EventEmitter.prototype.once = function (arg0, arg1, arg2) {
    this.eventEmittorOnWithTime(true, arg0, arg1, arg2);
    return this;
};

/**
 * Remove an event listener
 * @param {string|object} arg0 - Event name or events object
 * @param {function|object} arg1 - Callback function or options object
 * @param {boolean} [arg2] - Priority flag
 * @returns {EventEmitter} Returns this for chaining
 */
EventEmitter.prototype.off = function (arg0, arg1, arg2) {
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.off(key, arg0[key]);
        }
        return this;
    }
    else {
        if (typeof arg1 == 'object') {
            return this.off(arg0, arg1.callback, arg1.cap);
        }
        else {
            var eventArr = this._azar_extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] || [];
            var newEventArray = [];
            for (var i = 0; i < eventArr.length; ++i) {
                var event = eventArr[i];
                if (event.wrappedCallback == arg1) {
                    //Dont add to newEventArray
                    if (this.isSupportedEvent(arg0)) {
                    }
                    else {
                        if (this.removeEventListener) {
                            this.removeEventListener(event.eventName, event.wrappedCallback, !!event.cap);
                        }
                        else {
                            this.detachEvent('on' + event.eventName, event.wrappedCallback, !!event.cap);
                        }
                    }
                }
                else {
                    newEventArray.push(event);
                }
            }
            this._azar_extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] = newEventArray;
            return this;
        }
    }

};

/**
 * List of standard event properties to be copied
 * @type {string[]}
 */
export var eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ", 'preventDefault', 'key', 'keyCode'];

/**
 * List of touch event properties to be copied
 * @type {string[]}
 */
export var touchProperties = ['clientX', 'clientY', 'force', 'identifier', 'pageX', 'pageY', 'rotationAngle', 'screenX',
    'screenY', 'target'];

/**
 * Check if the right mouse button was clicked
 * @param {MouseEvent} event - The mouse event to check
 * @returns {boolean} True if right mouse button was clicked
 */
export function isMouseRight(event) {
    var isRightMB = false;
    if ("which" in event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = event.which === 3;
    else if ("button" in event)  // IE, Opera
        isRightMB = event.button == 2;
    return isRightMB;
}

/**
 * Check if the left mouse button was clicked
 * @param {MouseEvent} event - The mouse event to check
 * @returns {boolean} True if left mouse button was clicked
 */
export function isMouseLeft(event) {
    var isLeftMB = false;
    if ("which" in event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isLeftMB = event.which === 1;
    else if ("button" in event)  // IE, Opera
        isLeftMB = event.button === 0;
    return isLeftMB;
}

/**
 * Check if the middle mouse button was clicked
 * @param {MouseEvent} event - The mouse event to check
 * @returns {boolean} True if middle mouse button was clicked
 */
export function isMouseMiddle(event) {
    var isMiddleMB = false;
    if ("which" in event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isMiddleMB = event.which === 2;
    else if ("button" in event)  // IE, Opera
        isMiddleMB = event.button === 1;
    return isMiddleMB;
}

/**
 *
 * @type AElement
 * @name sponsorElement
 * @memberof AElement#
 */
/**
 *
 * @param {AElement} element
 * @param {Event |{target: AElement}} event
 * @returns {boolean}
 */
export function hitElement(element, event) {
    var current = event.target;
    while (current) {
        if (current === element) return true;
        if (current.sponsorElement && current.sponsorElement !== current.parentElement) {// sponsorElement like trigger of quick-menu
            if (hitElement(element, { target: current.sponsorElement })) return true;
        }
        current = current.parentElement;
    }
    return false;
}

/**
 * Create a copy of an event object with additional properties
 * @param {Event} event - The event to copy
 * @param {Object} [props] - Additional properties to add to the copied event
 * @returns {Object} A copy of the event with additional properties
 */
export function copyEvent(event, props) {
    var result = {};
    var key, value;
    //copy native property
    for (var i = 0; i < eventProperties.length; ++i) {
        key = eventProperties[i];
        value = event[key];
        if (value !== undefined) {
            if (typeof value == "function") {
                result[key] = event[key].bind(event);
            }
            else {
                result[key] = event[key];
            }
        }
    }
    Object.assign(result, event);
    if (props)
        Object.assign(result, props)
    if (event.changedTouches) {
        result.changedTouches = Array.prototype.map.call(event.changedTouches, function (touch) {
            return copyTouch(touch);
        });
    }
    if (event.touches) {
        result.touches = Array.prototype.map.call(event.touches, function (touch) {
            return copyTouch(touch);
        });
    }
    return result;
}

/**
 * Create a copy of a touch object with additional properties
 * @param {Touch} touch - The touch object to copy
 * @param {Object} [props] - Additional properties to add to the copied touch
 * @returns {Object} A copy of the touch object with additional properties
 */
export function copyTouch(touch, props) {
    var result = {};
    var key, value;
    //copy native property
    for (var i = 0; i < touchProperties.length; ++i) {
        key = touchProperties[i];
        value = touch[key];
        if (value !== undefined) {
            if (typeof value == "function") {
                result[key] = touch[key].bind(touch);
            }
            else {
                result[key] = touch[key];
            }
        }
    }
    Object.assign(result, touch);
    if (props)
        Object.assign(result, props);
    return result;
}

/***
 *
 * @param {TouchEvent} event
 * @return {Touch | null}
 */
export function findChangedTouchByIdent(event, identifier) {
    if (event.changedTouches) {
        for (var i = 0; i < event.changedTouches.length; ++i) {
            if (event.changedTouches[i].identifier === identifier) {
                return event.changedTouches[i];
            }
        }
    }
    return null;
}


/***
 *
 * @param event
 * @param identifier
 * @return {Touch|null}
 */
export function findTouchByIdent(event, identifier) {
    if (event.touches) {
        for (var i = 0; i < event.touches.length; ++i) {
            if (event.touches[i].identifier === identifier) {
                return event.touches[i];
            }
        }
    }
    return null;
}


EventEmitter.isMouseRight = isMouseRight;

EventEmitter.isMouseLeft = isMouseLeft;

EventEmitter.hitElement = hitElement;

EventEmitter.copyEvent = copyEvent;

EventEmitter.eventProperties = eventProperties;


export default EventEmitter;