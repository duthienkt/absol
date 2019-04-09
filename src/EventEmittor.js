import Dom from "./Dom";

function EventEmittor() {
    this.absolInstanceOf = this.absolInstanceOf || {};
    if (this.absolInstanceOf['EventEmittor']) return;
    this.absolInstanceOf['EventEmittor'] = true;

    this.extendEvents = { supported: {}, prioritize: {}, nonprioritize: {} };
    if (!(this instanceof EventEmittor)) {
        Object.assign(this, EventEmittor.prototype);
    }
};

EventEmittor.prototype.defineEvent = function (name) {
    if (name instanceof Array) {
        for (var i = 0; i < name.length; ++i)
            this.extendEvents.supported[name[i]] = true;

    }
    else
        this.extendEvents.supported[name] = true;
    return this;
};

EventEmittor.prototype.isSupportedEvent = function (name) {
    return !Dom.isDomNode(this) || !!this.extendEvents.supported[name];
};


EventEmittor.prototype.emit = function (eventName, data) {
    var others = Array.prototype.slice.call(arguments, 1);
    if (this.isSupportedEvent(eventName)) {
        var listenerList;
        if (this.extendEvents.prioritize[eventName]) {
            listenerList = this.extendEvents.prioritize[eventName].slice();
            for (var i = 0; i < listenerList.length; ++i) {
                listenerList[i].wrappedCallback.apply(this, others);
            }

        }

        if (this.extendEvents.nonprioritize[eventName]) {
            listenerList = this.extendEvents.nonprioritize[eventName].slice();
            for (var i = 0; i < listenerList.length; ++i) {
                listenerList[i].wrappedCallback.apply(this, others);
            }
        }
    }
    else {
        if (this.dispatchEvent) {
            var event = new Event(eventName);
            data && Object.assign(event, data);
            this.dispatchEvent(event);
        } else
            throw new Error("Not support event " + eventName);
    }
}





EventEmittor.prototype.eventEmittorOnWithTime = function (isOnce, arg0, arg1, arg2) {
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.eventEmittorOnWithTime(isOnce, key, arg0[key]);
        }
        return this;
    }
    else {
        if (typeof arg1 == 'object') {
            return this.eventEmittorOnWithTime(isOnce, arg0, arg1.callback, arg1.cap);
        } else {
            var eventArr = this.extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] || [];
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
                    event.wrappedCallback = function (data) {
                        event.callback.call(this, data);
                        this.off(event.eventName, event.wrappedCallback, event.cap);
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
                this.extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] = eventArr;
            }
            else {
                console.warn("dupplicate event");

            }

        }
        return this;
    }
};



EventEmittor.prototype.on = function (arg0, arg1, arg2) {
    this.eventEmittorOnWithTime(false, arg0, arg1, arg2);
    return this;
};


EventEmittor.prototype.once = function (arg0, arg1, arg2) {
    this.eventEmittorOnWithTime(true, arg0, arg1, arg2);
    return this;
};

EventEmittor.prototype.off = function (arg0, arg1, arg2) {
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.off(key, arg0[key]);
        }
        return this;
    }
    else {
        if (typeof arg1 == 'object') {
            return this.off(arg0, arg1.callback, arg1.cap);
        } else {
            var eventArr = this.extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] || [];
            var newEventArray = [];
            for (var i = 0; i < eventArr.length; ++i) {
                var event = eventArr[i];
                if (event.wrappedCallback == arg1) {
                    //Dont add to newEventArray
                    if (this.isSupportedEvent(arg0)) {
                    }
                    else {
                        if (this.removeEventListener) {
                            this.removeEventListener(event.eventName, event.wrappedCallback, !!event.call);
                        }
                        else {
                            this.detachEvent('on' + event.eventName, event.wrappedCallback, !!event.call);
                        }
                    }
                }
                else {
                    newEventArray.push(event);
                }
            }
            this.extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] = newEventArray;
            return this;
        }
    }
};



EventEmittor.isMouseRight = function (event) {
    var isRightMB = false;
    if ("which" in event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = event.which == 3;
    else if ("button" in event)  // IE, Opera 
        isRightMB = event.button == 2;
    return isRightMB;
};

EventEmittor.hitElement = function (element, event) {
    var current = event.target;
    while (current) {
        if (current == element) return true;
        current = current.parentElement;
    }
    return false;
};

EventEmittor.copyEvent = function (event, props) {
    var result = {};
    Object.assign(result, event);
    for (var key in result) {
        if (typeof result[key] == 'function') {
            result[key] = result[key].bind(event);
        }
    };

    if (props)
        Object.assign(result, props);
    return result;
};


EventEmittor.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed",
    "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase",
    "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource",
    "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region",
    "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type",
    "deltaMode", "deltaX", "deltaY", "deltaZ"];

export default EventEmittor;