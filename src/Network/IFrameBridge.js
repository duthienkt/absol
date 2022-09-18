import EventEmitter from "../HTML5/EventEmitter";
import { randomIdent } from "../String/stringGenerate";
import safeThrow from "../Code/safeThrow";

var TYPE_WORKER = 'WORKER';
var TYPE_IFRAME = 'IFRAME';
var TYPE_IFRAME_MASTER = 'IFRAME_MASTER';
var TYPE_WORKER_MASTER = 'WORKER_MASTER';


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

IFrameBridge.TYPE_WORKER = TYPE_WORKER;
IFrameBridge.TYPE_IFRAME = TYPE_IFRAME;
IFrameBridge.TYPE_IFRAME_MASTER = TYPE_IFRAME_MASTER;
IFrameBridge.TYPE_WORKER_MASTER = TYPE_WORKER_MASTER;

IFrameBridge.prototype._detectHost = function () {
    return new Promise(rs => {
        var iframeLoaded = () => {
            if (this.host.removeEventListener) {
                this.host.removeEventListener("load", iframeLoaded);
            }
            else {
                this.host.detachEvent("onload", iframeLoaded);
            }
            this.sender = this.host.contentWindow;
            rs();
        };
        if (this.host instanceof Worker) {
            this.type = TYPE_WORKER_MASTER;
            this.sender = this.host;
            this.receiver = this.host;
        }
        else if (this.host.tagName === 'IFRAME') {
            this.type = TYPE_IFRAME_MASTER;
            this.receiver = self;
            this.id = this.host.src;
            this.origin = '*';
            if (this.host.addEventListener) {
                this.host.addEventListener("load", iframeLoaded);
            }
            else {
                this.host.attachEvent("onload", iframeLoaded);
            }
        }
        else if (IFrameBridge.isInIFrame()) {
            this.type = TYPE_IFRAME;
            this.sender = window.parent;
            this.receiver = this.host;
            this.id = location.href;
            this.origin = '*';

        }
        else if (typeof window.WorkerGlobalScope !== 'undefined' && this.elt instanceof WorkerGlobalScope) {
            this.type = TYPE_WORKER;
            this.sender = this.host;
            this.receiver = this.host;
        }
        if (this.sender) rs();
    });
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


IFrameBridge.fromIFrame = function (iframe) {
    return new IFrameBridge(iframe);


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
        var host = self;
        IFrameBridge.shareInstance = new IFrameBridge(host, rootOrigin);
    }
    return IFrameBridge.shareInstance;
};


Object.defineProperties(IFrameBridge.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
IFrameBridge.prototype.constructor = IFrameBridge;

IFrameBridge.isInIFrame = function () {
    return (top !== self) && !IFrameBridge.isInWorker();
};


IFrameBridge.isInWorker = function () {
    return (typeof WorkerGlobalScope !== 'undefined') && (self instanceof WorkerGlobalScope);
}

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

export default IFrameBridge;