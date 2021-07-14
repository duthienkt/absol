import EventEmitter from "../HTML5/EventEmitter";
import {randomIdent} from "../String/stringGenerate";

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
    this.__azarRejectCallbacks = {};
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


IFrameBridge.fromIFrame = function (iframe) {
    var host = iframe.contentWindow || iframe.contentDocument;
    var src = iframe.src;
    var rootOrigin = location.origin;
    var iframeOrigin = src.match(/^(http|https):\/\/[^/]+/);
    if (iframeOrigin) {
        iframeOrigin = iframeOrigin[0];
    }
    else {
        iframeOrigin = rootOrigin;
    }

    if (host) return new IFrameBridge(host, iframeOrigin);
    else {
        var result = new IFrameBridge(undefined, iframeOrigin);
        var attachedHost = function () {
            var host = iframe.contentWindow || iframe.contentDocument;
            result.attach(host);
        };
        if (iframe.addEventListener) {
            iframe.addEventListener("load", attachedHost);
        }

        else {
            iframe.attachEvent("onload", attachedHost);
        }
        return result;
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
        IFrameBridge.shareInstance = new IFrameBridge(self, rootOrigin);
    }
    return IFrameBridge.shareInstance;
};


Object.defineProperties(IFrameBridge.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
IFrameBridge.prototype.constructor = IFrameBridge;

IFrameBridge.isInIFrame = function () {
    return (top !== self);
};


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
                            this.__azarResolve(data.taskId, null, err);
                        }.bind(this));
                }
                else {
                    this.__azarResolve(data.taskId, result);
                }
            } catch (err) {
                console.error(err);
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

export default IFrameBridge;