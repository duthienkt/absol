import EventEmitter from "../HTML5/EventEmitter";
import { randomIdent } from "../String/stringGenerate";

function IFrameBridge(host) {
    EventEmitter.call(this);
    this.detach();

    if (host) this.attach(host);
    this.__azarResolveCallbacks = {};
};

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
    if (host) return new IFrameBridge(host);
    else {
        var result = new IFrameBridge();
        var attachedHost = function () {
            var host = iframe.contentWindow || iframe.contentDocument;
            result.attach(host);
        }
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
        IFrameBridge.shareInstance = new IFrameBridge(self);
    }
    return IFrameBridge.shareInstance;
}


Object.defineProperties(IFrameBridge.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
IFrameBridge.prototype.constructor = IFrameBridge;

IFrameBridge.isInIFrame = function () {
    return (top !== self);
};

IFrameBridge.prototype.__azarMessageListener = function (event) {
    this.__azarHandleData(event.data);
};


IFrameBridge.prototype.__azarHandleData = function (data) {
    if (data.type) {
        if (data.type == "INVOKE") {
            var result = this.__azarRelfInvoke(data.name, data.params);
            if (result && typeof result.then == 'function') {
                result.then(function (result) {
                    this.__azarResolve(data.taskId, result);
                }.bind(this));
            }
            else {
                this.__azarResolve(data.taskId, result);
            }
        } else if (data.type == "INVOKE_RESULT") {
            if (this.__azarResolveCallbacks[data.taskId]) {
                this.__azarResolveCallbacks[data.taskId](data.result);
                delete this.__azarResolveCallbacks[data.taskId];
            }
        } else if (data.type == "EMIT") {
            this.fire.apply(this, data.params);
        }
        else this.fire('message', data, this);
    }
};


IFrameBridge.prototype.__azarResolve = function (taskId, result) {
    this.host.postMessage({
        type: "INVOKE_RESULT",
        taskId: taskId,
        result: result
    });
};


IFrameBridge.prototype.__azarRelfInvoke = function (name, params) {
    if (typeof this[name] == 'function') {
        return this[name].apply(this, params)
    }
    else {
        return this[name];
    }
};


IFrameBridge.prototype.emit = function () {
    var params = [];
    params.push.apply(params, arguments);
    this.sync.then(function () {
        this.host.postMessage({
            type: "EMIT",
            params: params
        });
    }.bind(this));
    return this;
};


IFrameBridge.prototype.invoke = function (name) {
    var params = [];
    params.push.apply(params, arguments);
    params.shift();
    return this.sync.then(function () {
        var indent = randomIdent(32);
        this.host.postMessage({
            type: 'INVOKE',
            params: params,
            taskId: indent,
            name: name
        });
        return new Promise(function (resolve) {
            this.__azarResolveCallbacks[indent] = resolve;
        }.bind(this));
    }.bind(this));
};

export default IFrameBridge;