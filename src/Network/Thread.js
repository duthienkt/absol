import IFrameBridge from "./IFrameBridge";
import OOP from "../HTML5/OOP";
import RemoteThreadCode from './RemoteThread.tpl';
import noop from "../Code/noop";

/***
 *
 * @param {{methods?:Object, extendCode: string}} opt
 * @constructor
 */
function Thread(opt) {
    this.worker = new Worker(this._makeCodeUrl(opt));
    IFrameBridge.call(this, this.worker);
    this._attachClientMethods(opt.methods);
}

Thread.prototype._makeCodeUrl = function (opt) {
    var code = [
        this._makeLibCode(opt.libs),
        RemoteThreadCode,
        this._makeMethodCode(opt.methods),
        this._makePropCode(opt.props),
        opt.extendCode || '',
    ].join('\n\n');
    var blob = new Blob([code], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    return url;
};

Thread.prototype._makePropCode = function (props) {
    if (!props) return '';
    return 'Object.assign(self, ' + JSON.stringify(props) + ');';
};

Thread.prototype._makeLibCode = function (libs) {
    if (!libs) return '';
    return libs.map(function (lib) {
        return 'self.importScripts(' + JSON.stringify(lib) + ');'
    }).join('\n');
}

Thread.prototype._makeMethodCode = function (methods) {
    if (!methods) return '';
    return Object.keys(methods).map(function (key) {
        var fx = methods[key];
        if (typeof fx === "function") {
            fx = fx.toString();
            return 'self[' + JSON.stringify(key) + '] = ' + fx;
        }
    }).join('\n\n');
};

Thread.prototype._attachClientMethods = function (methods) {
    if (!methods) return '';
    Object.keys(methods).reduce(function (ac, name) {
        ac[name] = function () {
            return this.invoke.apply(this, [name].concat(Array.prototype.slice.call(arguments)))
        }
        return ac;
    }, this);
};

Thread.prototype.destroy = function () {
    if (this.worker) {
        this.worker.terminate();
        delete this.worker;
    }
};


Thread.prototype.revokeResource = function () {
    this.destroy();
    this.revokeResource = noop;
};

OOP.mixClass(Thread, IFrameBridge);

export default Thread;