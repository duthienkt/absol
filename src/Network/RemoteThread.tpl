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


var TYPE_WORKER = 'WORKER';

/**
 *
 * @param {Worker|HTMLIFrameElement|WorkerGlobalScope|Window=} host
 */
function IFrameBridge(host) {
    EventEmitter.call(this);
    /***
     *
     * @type {Worker|HTMLIFrameElement|WorkerGlobalScope|Window|WorkerGlobalScope|Window}
     */
    this.host = host || self;
    this.sender = null;
    this.receiver = null;
    this.origin = null;
    this.type = 'NOT_DETECT';
    this.id = "UNSET";

    this.sync = this._detectHost().then(() => this._attach());

    this.__azarResolveCallbacks = {};
    this.__azarRejectCallbacks = {};
}

IFrameBridge.prototype._detectHost = function () {
          this.type = TYPE_WORKER;
          this.sender = this.host;
          this.receiver = this.host;
          return Promise.resolve();
};


IFrameBridge.prototype._attach = function () {
    if (this.receiver.addEventListener) {
        this.receiver.addEventListener("message", this.__azarMessageListener.bind(this), false);
    }
    else if (this.receiver.attachEvent) {
        this.receiver.attachEvent("onmessage", this.__azarMessageListener.bind(this));
    }
    else {
        this.receiver.onmessage = this.__azarMessageListener.bind(this);
    }
};


IFrameBridge.getInstance = function () {
    if (!IFrameBridge.shareInstance) {
        var origin = location.origin;
        var rootOrigin = IFrameBridge.getParentUrl().match(/^(http|https):\/\/[^/]+/);
        if (rootOrigin) {
            rootOrigin = rootOrigin[0];
        }
        else {
            rootOrigin = origin;
        }

        // IFrameBridge.shareInstance = new IFrameBridge(self, rootOrigin == origin? undefined: "*" || rootOrigin );
        var host = self;
        IFrameBridge.shareInstance = new IFrameBridge(host, rootOrigin);
    }
    return IFrameBridge.shareInstance;
};


Object.defineProperties(IFrameBridge.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
IFrameBridge.prototype.constructor = IFrameBridge;


IFrameBridge.getParentUrl = function () {
    var parentUrl = (window.location != window.parent.location)
        ? document.referrer
        : document.location.href;
    return parentUrl;
};

IFrameBridge.prototype.__azarMessageListener = function (event) {
    this.__azarHandleData(event.data);
};


IFrameBridge.prototype.__azarHandleData = function (data) {
    if (data.bridgeId !== this.id) return;
    if (data.type) {
        if (data.type == "INVOKE") {
            try {
                var result = this.__azarSelfInvoke(data.name, data.params);
                if (result && typeof result.then == 'function') {
                    result.then(function (result) {
                        this.__azarResolve(data.taskId, result);
                    }.bind(this))
                        .catch(function (err) {
                            safeThrow(err);
                            this.__azarResolve(data.taskId, null, err);
                        }.bind(this));
                }
                else {
                    this.__azarResolve(data.taskId, result);
                }
            } catch (err) {
                safeThrow(err);
                this.__azarResolve(data.taskId, null, err);
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
        error: error,
        bridgeId: this.id
    };

    if (this.origin) {
        this.sender.postMessage(data, this.origin);
    }
    else {
        this.sender.postMessage(data);
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
            params: params,
            bridgeId: this.id
        };
        if (this.origin) {
            this.sender.postMessage(data, this.origin);
        }
        else {
            this.sender.postMessage(data);
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
            name: name,
            bridgeId: this.id
        };
        if (this.origin) {
            this.host.postMessage(data, this.origin);
        }
        else {
            this.host.postMessage(data);
        }
        return new Promise(function (resolve, reject) {
            this.__azarResolveCallbacks[indent] = resolve;
            this.__azarRejectCallbacks[indent] = reject;
        }.bind(this));
    }.bind(this));
};

IFrameBridge.prototype.importScriptURLs = function () {
    return this.invoke.apply(this, ['_receiveScriptURLs'].concat(Array.prototype.slice.call(arguments)));
};

IFrameBridge.prototype.importScript = function (code) {
    var blob = new Blob([code], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    return this.importScriptURLs(url);
};


IFrameBridge.prototype.createMethod = function (name, fx) {
    this[name] = function () {
        return this.invoke.apply(this, [name].concat(Array.prototype.slice.call(arguments)));
    };
    return this.invoke.apply(this, ['_receiveMethod', name, fx.toString()]);
};


IFrameBridge.prototype._receiveScriptURLs = function () {
    if (self.importScripts) {
        self.importScripts.apply(self, arguments);
    }
};


IFrameBridge.prototype._receiveMethod = function (name, code) {
    this[name] = (new Function('return ' + code))();
};


var IFrameBridge_prototype_descriptors = Object.getOwnPropertyDescriptors(IFrameBridge.prototype);
delete IFrameBridge_prototype_descriptors.constructor;

Object.defineProperties(self, IFrameBridge_prototype_descriptors);
IFrameBridge.call(self, self);