import EventEmitter from "../HTML5/EventEmitter";

/***
 * @augments EventEmitter
 * @extends Array
 * @constructor
 */
function ObservableArray(array) {
    EventEmitter.call(this);
    Object.defineProperty(this, '_array', {
        configurable: false,
        enumerable: false,
        value: array
    });
    this._makeArrIndex(0, array.length);
}


Object.defineProperty(ObservableArray.prototype, 'unshift',
    {
        enumerable: false,
        value: function () {
            var newItems = Array.prototype.slice.call(arguments);
            var cN = this._array.length;
            this._makeArrIndex(cN, this._array.length + newItems.length);
            this._array.unshift.apply(this._array, newItems);
            this.emit("additem", {
                target: this,
                items: newItems,
                type: 'additem',
                offset: 0,
                action: 'unshift'
            }, this);
        }
    });

Object.defineProperty(ObservableArray.prototype, 'shift',
    {
        enumerable: false,
        value: function () {
            var res = undefined;
            if (this._array.length > 0) {
                res = this._array.shift();
                this._removeIndex(this._array.length);
                this.emit("removeitem", {
                    target: this, type: 'additem',
                    offset: 0,
                    action: 'shift',
                    items: [res],
                    item: res
                }, this);
            }
            return res;
        }
    });


Object.defineProperty(ObservableArray.prototype, 'push', {
    enumerable: false,
    value: function () {
        var newItems = Array.prototype.slice.call(arguments);
        var cN = this._array.length;
        this._makeArrIndex(this._array.length, this._array.length + newItems.length);
        this._array.push.apply(this._array, newItems);
        this.emit("additem", { target: this, items: newItems, type: 'additem', offset: cN, action: 'push' }, this);
    }
});

Object.defineProperty(ObservableArray.prototype, 'pop', {
    enumerable: false,
    value: function () {
        var res = undefined;
        if (this._array.length > 0) {
            res = this._array.pop();
            this._removeIndex(this._array.length);
            this.emit("removeitem", {
                target: this,
                type: 'additem',
                offset: this._array.length,
                action: 'shift',
                items: [res],
                item: res
            }, this);
        }
        return res;
    }
});

Object.defineProperty(ObservableArray.prototype, 'replace', {
    enumerable: false,
    value: function (offset, items) {
        for (var i = 0; i < items.length && offset < this._array.length; ++i, ++offset) {
            this._array[offset] = items[i];
        }
    }
});


Object.defineProperty(ObservableArray.prototype, 'toJSON', {
    enumerable: false,
    value: function () {
        return this._array;
    }
});

Object.defineProperty(ObservableArray.prototype, 'valueOf', {
    enumerable: false,
    value: function () {
        return this._array;
    }
});

Object.defineProperty(ObservableArray.prototype, '_makeArrIndex', {
    enumerable: false,
    value: function (cN, nN) {
        var i;
        if (nN > cN) {
            for (i = cN; i < nN; ++i)
                this._defineIndex(i);
        }
        else {
            for (i = cN - 1; i >= nN; --i)
                this._removeIndex(i);
        }
    }
});

/***
 *
 * @param {number} idx
 * @private
 */
Object.defineProperty(ObservableArray.prototype, '_defineIndex', {
    enumerable: false,
    value: function (idx) {
        if (!(idx in this)) {
            Object.defineProperty(this, idx, {
                set: function (value) {
                    var oldValue = this._array[idx]
                    this._array[idx] = value;
                    this.emit('setitem', {
                        type: 'setitem',
                        target: this,
                        oldValue: oldValue,
                        vale: value,
                        offset: idx
                    }, this);
                },
                get: function () {
                    return this._array[idx];
                },
                configurable: true,
                enumerable: true
            });
        }
    }
});

Object.defineProperty(ObservableArray.prototype, '_removeIndex', {
    enumerable: false,
    value: function (idx) {
        delete this[idx];
    }
});


Object.defineProperty(ObservableArray.prototype, 'splice', {
    enumerable: false,
    value: function (index, howMany) {
        var res = [];
        var newItems = Array.prototype.slice.call(arguments, 2);
        index = index == null ? 0 : index < 0 ? this._array.length + index : index;
        howMany = howMany == null ? this._array.length - index : howMany > 0 ? howMany : 0;
        if (howMany > 0) {
            this._makeArrIndex(this._array.length, this._array.length - howMany);
            res = this._array.splice(index, howMany);
            if (newItems.length > 0) {
                if (res.length > 0) {
                    this.emit('replaceitem', {
                        type: 'replaceitem',
                        offset: index,
                        oldItems: res,
                        newItems: newItems,
                        target: this,
                        action: 'splice'
                    }, this);
                }
                else {
                    this.emit('additem', {
                        type: 'additem',
                        offset: index,
                        items: newItems,
                        target: this
                    }, this);
                }
            }
            else {
                if (res.length > 0) {
                    this.emit('removeitem', {
                        target: this, type: 'additem',
                        offset: 0,
                        action: 'splice',
                        items: res,
                    }, this);
                }
            }
        }
        return res;
    }
});

Object.defineProperty(ObservableArray.prototype, 'length', {
    set: function (value) {
        var n = Number(value);
        var length = this._array.length;
        if (n % 1 === 0 && n >= 0) {
            if (n < length) {
                this.splice(n);
            }
            else if (n > length) {
                this.push.apply(this, new Array(n - length));
            }
        }
        else {
            throw new RangeError("Invalid array length");
        }
        this._array.length = n;
    },
    get: function () {
        return this._array.length;
    }
});


Object.getOwnPropertyNames(Array.prototype).forEach(function (name) {
    if (!(name in ObservableArray.prototype)) {
        Object.defineProperty(ObservableArray.prototype, name, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: Array.prototype[name]
        });
    }
});

Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function (name) {
    if (!(name in ObservableArray.prototype)) {
        Object.defineProperty(ObservableArray.prototype, name, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: EventEmitter.prototype[name]
        });
    }
});

export default ObservableArray;

