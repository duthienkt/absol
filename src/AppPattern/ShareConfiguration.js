import safeThrow from "../Code/safeThrow";
import { generateJSVariable } from "../JSMaker/generator";

/**
 *
 * @param {{storageKey: string}} opt
 * @constructor
 */
function ShareConfiguration(opt) {
    this.opt = Object.assign({
        storageKey: "AS_SHARE_CONFIGURATION",
    }, opt);
    Object.defineProperty(this, 'data', {
        value: {},
        enumerable: true,
        writable: false
    });

    Object.defineProperty(this, '__listener__', {
        value: {},
        enumerable: false,
        writable: false
    });
    this.to = -1;
    this._load();
}

ShareConfiguration.prototype.version = 1;

ShareConfiguration.prototype._load = function () {
    var js = localStorage.getItem(this.opt.storageKey);
    if (!js) return;
    try {
        var obj = (new Function('return ' + js))();
        if (obj && obj.version === this.version) {
            Object.assign(this.data, obj.data || {});
        }
    } catch (e) {

    }
};

/***
 *
 * @param {string} key
 * @param {*|undefined} value
 * @returns this
 */
ShareConfiguration.prototype.set = function (key, value) {
    var prev = this.data[key];
    if (value === undefined) {
        delete this.data[key];
    }
    else {
        this.data[key] = value;
    }
    if (value !== prev) {
        this.emit(key, value, this);
    }
    return this;
};

/***
 *@returns this
 */
ShareConfiguration.prototype.save = function () {
    clearTimeout(this.to);
    var obj = {
        data: this.data,
        version: this.version
    };
    var js = generateJSVariable(obj);
    localStorage.setItem(this.opt.storageKey, js);
};

/***
 *@returns this
 */
ShareConfiguration.prototype.saveDelay = function () {
    clearTimeout(this.to);
    this.to = setTimeout(() => this.save(), 100);
};


ShareConfiguration.prototype.emit = function (key) {
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    if (this.__listener__[key]) {
        this.__listener__[key].slice().forEach(function (f) {
            try {
                f.apply(self, args);
            } catch (err) {
                safeThrow(err);
            }
        });
    }
    return this;
};

/***
 *
 * @param {string|Object} key
 * @param {function=}listener
 * @return {ShareConfiguration}
 */
ShareConfiguration.prototype.on = function (key, listener) {
    if (typeof key === "string") {
        if (!this.__listener__[key]) this.__listener__[key] = [];
        if (this.__listener__[key].indexOf(listener) < 0) {
            this.__listener__[key].push(listener);
        }
    }
    else if (typeof key === "object") {
        for (var key1 in key) {
            this.on(key1, key[key1]);
        }
    }
    return this;
};

/***
 *
 * @param {string|Object} key
 * @param {function=}listener
 * @return {ShareConfiguration}
 */
ShareConfiguration.prototype.off = function (key, listener) {
    if (typeof key === "string" && this.__listener__[key]) {
        var idx = this.__listener__[key].indexOf(listener);
        if (idx >= 0) {
            this.__listener__[key].splice(idx, 1);
        }
    }
    else if (typeof key === "object") {
        for (var key1 in key) {
            this.off(key1, key[key1]);
        }
    }
    return this;
};

/***
 *
 * @param {string} key
 * @param {*=} defaultValue
 * @return {*}
 */
ShareConfiguration.prototype.get = function (key, defaultValue) {
    var value = this.data[key];
    if (value === undefined)
        return defaultValue;
    return value;
};

ShareConfiguration.prototype.contains = function (key) {
    return this.data[key] !== undefined;
};

ShareConfiguration.instance = new ShareConfiguration();

export default ShareConfiguration;