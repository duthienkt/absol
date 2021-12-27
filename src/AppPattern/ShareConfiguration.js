import safeThrow from "../Code/safeThrow";

function ShareConfiguration() {
    Object.defineProperty(this, 'data', {
        value: {},
        enumerable: true,
        writable: false
    });

    Object.defineProperty(this, '__listener__', {
        value: {},
        enumerable: false,
        writable: false
    })
}

/***
 *
 * @param {string} key
 * @param {*|undefined} value
 */
ShareConfiguration.prototype.set = function (key, value) {
    var prev = this.data[key];
    this.data[key] = value;
    if (value !== prev) {
        this.emit(key, value, this);
    }
    return this;
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
    } else if (typeof key === "object") {
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
    } else if (typeof key === "object") {
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
    return this.data[key];
};

ShareConfiguration.prototype.contains = function (key) {
    return this.data[key] === undefined;
};

ShareConfiguration.instance = new ShareConfiguration();

export default ShareConfiguration;