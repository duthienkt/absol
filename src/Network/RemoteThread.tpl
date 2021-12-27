function safeThrow(error) {
    setTimeout(function () {
        throw  error;
    }, 0);
}

function EventEmitter() {
    if (!this._azar_extendEvents) {
        Object.defineProperty(this, '_azar_extendEvents', {
            enumerable: false,
            value: this._azar_extendEvents || { supported: {}, prioritize: {}, nonprioritize: {} }
        });
        Object.defineProperty(this, '__azar_force', {
            value: true,
            enumerable: false
        });
    }
}


EventEmitter.prototype.defineEvent = function (name) {
    if (name instanceof Array) {
        for (var i = 0; i < name.length; ++i)
            this._azar_extendEvents.supported[name[i]] = true;
    }
    else
        this._azar_extendEvents.supported[name] = true;
    return this;
};

EventEmitter.prototype.isSupportedEvent = function (name) {
    return true;
};


EventEmitter.prototype.emit = function (eventName, data) {
    this.fire.apply(this, arguments);
};

EventEmitter.prototype.fire = function (eventName, data) {
    var others = Array.prototype.slice.call(arguments, 1);
    if (this.isSupportedEvent(eventName)) {
        var listenerList;
        var i;
        if (this._azar_extendEvents.prioritize[eventName]) {
            listenerList = this._azar_extendEvents.prioritize[eventName].slice();
            for (i = 0; i < listenerList.length; ++i) {
                try {
                    listenerList[i].wrappedCallback.apply(this, others);
                } catch (e) {
                   safeThrow(e);
                }
            }
        }

        if (this._azar_extendEvents.nonprioritize[eventName]) {
            listenerList = this._azar_extendEvents.nonprioritize[eventName].slice();
            for (i = 0; i < listenerList.length; ++i) {
                try {
                    listenerList[i].wrappedCallback.apply(this, others);
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


EventEmitter.prototype.eventEmittorOnWithTime = function (isOnce, arg0, arg1, arg2) {
    if (typeof arg0 == 'object') {
        for (var key in arg0) {
            this.eventEmittorOnWithTime(isOnce, key, arg0[key]);
        }
        return this;
    }
    else {
        if (typeof arg1 == 'object') {
            return this.eventEmittorOnWithTime(isOnce, arg0, arg1.callback, arg1.cap);
        }
        else {
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
                        event.callback.apply(this, arguments);
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
                this._azar_extendEvents[arg2 ? 'prioritize' : 'nonprioritize'][arg0] = eventArr;
            }
            else {
                console.warn("dupplicate event");
            }

        }
        return this;
    }
};


EventEmitter.prototype.on = function (arg0, arg1, arg2) {
    this.eventEmittorOnWithTime(false, arg0, arg1, arg2);
    return this;
};


EventEmitter.prototype.once = function (arg0, arg1, arg2) {
    this.eventEmittorOnWithTime(true, arg0, arg1, arg2);
    return this;
};

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
 *
 * @param {Worker} host
 */
function IFrameBridge(host, origin) {
    EventEmitter.call(this);
    this.detach();
    this.origin = origin;
    if (host) this.attach(host);
    this.__azarResolveCallbacks = {};
}

IFrameBridge.prototype.attach = function (host) {
    this.host = host;
    if (this.host.addEventListener) {
        this.host.addEventListener("message", this.__azarMessageListener.bind(this), false);
    }
    else if (this.host.attachEvent) {
        this.host.attachEvent("onmessage", this.__azarMessageListener.bind(this));
    }
    else {
        this.host.onmessage = this.__azarMessageListener.bind(this);
    }
    this.__IFrameBridge_resolve();
};

IFrameBridge.prototype.detach = function () {
    this.sync = new Promise(function (resolve) {
        this.__IFrameBridge_resolve = resolve;
    }.bind(this));
};

Object.defineProperties(IFrameBridge.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
IFrameBridge.prototype.constructor = IFrameBridge;

IFrameBridge.prototype.__azarMessageListener = function (event) {
    this.__azarHandleData(event.data);
};


IFrameBridge.prototype.__azarHandleData = function (data) {
    if (data.type) {
        if (data.type == "INVOKE") {
            try {
                var result = this.__azarSelfInvoke(data.name, data.params);
                if (result && typeof result.then == 'function') {
                    result.then(function (result) {
                        this.__azarResolve(data.taskId, result);
                    }.bind(this))
                        .catch(function (err) {
                            console.error(err);
                            this.__azarResolve(data.taskId, null, { message: err.message, stack: err.stack });
                        }.bind(this));
                }
                else {
                    this.__azarResolve(data.taskId, result);
                }
            } catch (err) {
                console.error(err);
                this.__azarResolve(data.taskId, null, { message: err.message, stack: err.stack });
            }


        }
        else if (data.type == "INVOKE_RESULT") {
            if (this.__azarResolveCallbacks[data.taskId]) {
                if (data.error) {
                    this.__azarRejectCallbacks[data.taskId](data.error);
                }
                else {
                    this.__azarResolveCallbacks[data.taskId](data.result);
                }
                delete this.__azarResolveCallbacks[data.taskId];
                delete this.__azarRejectCallbacks[data.taskId];
            }
        }
        else if (data.type == "EMIT") {
            this.fire.apply(this, data.params);
        }
        else this.fire('message', data, this);
    }
};


IFrameBridge.prototype.__azarResolve = function (taskId, result, error) {
    var data = {
        type: "INVOKE_RESULT",
        taskId: taskId,
        result: result,
        error: error
    };

    if (this.origin) {
        this.host.postMessage(data, this.origin);
    }
    else {
        this.host.postMessage(data);
    }
};


IFrameBridge.prototype.__azarSelfInvoke = function (name, params) {
    if (typeof this[name] == 'function') {
        return this[name].apply(this, params);
    }
    else {
        return this[name];
    }
};


IFrameBridge.prototype.emit = function () {
    var params = [];
    params.push.apply(params, arguments);
    this.sync.then(function () {
        var data = {
            type: "EMIT",
            params: params
        };
        if (this.origin) {
            this.host.postMessage(data, this.origin);
        }
        else {
            this.host.postMessage(data);
        }
    }.bind(this));
    return this;
};


IFrameBridge.prototype.invoke = function (name) {
    var params = [];
    params.push.apply(params, arguments);
    params.shift();
    return this.sync.then(function () {
        var indent = randomIdent(32);
        var data = {
            type: 'INVOKE',
            params: params,
            taskId: indent,
            name: name
        };
        if (this.origin) {
            this.host.postMessage(data, this.origin);
        }
        else {
            this.host.postMessage(data);
        }
        return new Promise(function (resolve) {
            this.__azarResolveCallbacks[indent] = resolve;
        }.bind(this));
    }.bind(this));
};

IFrameBridge.prototype.importScriptURLs = function () {
    return this.invoke.apply(this, ['_receiveScriptURLs'].concat(Array.prototype.slice.call(arguments)));
};

IFrameBridge.prototype._receiveScriptURLs = function () {
    if (self.importScripts) {
        self.importScripts.apply(self, arguments);
    }
};


IFrameBridge.prototype._receiveMethod = function (name, code) {
    this[name] = (new Function('return ' + code))();
};

Object.defineProperties(self, Object.getOwnPropertyDescriptors(IFrameBridge.prototype));
IFrameBridge.call(self, self);