/***
 * @augments EventEmitter
 * @extends Array
 * @constructor
 */
import EventEmitter from "../HTML5/EventEmitter";
import OOP from "../HTML5/OOP";

function ObservableArray(array) {
    EventEmitter.call(this);
    Object.defineProperty(this, '_array', {
        configurable: false,
        enumerable: false,
        value: array
    });
    this._makeArrIndex(0, array.length);
}

OOP.mixClass(ObservableArray, EventEmitter);

ObservableArray.prototype.unshift = function () {
    var newItems = Array.prototype.slice.call(arguments);
    var cN = this._array.length;
    this._makeArrIndex(cN, this._array.length + newItems.length);
    this._array.unshift.apply(this._array, newItems);
    this.emit("additem", { target: this, items: newItems, type: 'additem', offset: 0, action: 'unshift' }, this);
};

ObservableArray.prototype.shift = function () {
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
};

ObservableArray.prototype.push = function () {
    var newItems = Array.prototype.slice.call(arguments);
    var cN = this._array.length;
    this._makeArrIndex(this._array.length, this._array.length + newItems.length);
    this._array.push.apply(this._array, newItems);
    this.emit("additem", { target: this, items: newItems, type: 'additem', offset: cN, action: 'push' }, this);
};

ObservableArray.prototype.pop = function () {
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
};

ObservableArray.prototype.replace = function (offset, items) {
    for (var i = 0; i < items.length && offset < this._array.length; ++i, ++offset) {
        this._array[offset] = items[i];
    }
};


ObservableArray.prototype.toJSON = function () {
    return this._array;
};

ObservableArray.prototype.valueOf = function () {
    return this._array;
};

ObservableArray.prototype._makeArrIndex = function (cN, nN) {
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

/***
 *
 * @param {number} idx
 * @private
 */
ObservableArray.prototype._defineIndex = function (idx) {
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
};

ObservableArray.prototype._removeIndex = function (idx) {
    delete this[idx];
};


ObservableArray.prototype.splice = function (index, howMany) {
    var res = [];
    index = index == null ? 0 : index < 0 ? this._array.length + index : index;
    howMany = howMany == null ? this._array.length - index : howMany > 0 ? howMany : 0;
    if (howMany > 0) {
        this._makeArrIndex(this._array.length, this._array.length - howMany);
        res = this._array.splice(index, howMany);
        this.emit('removeitem', {
            target: this, type: 'additem',
            offset: 0,
            action: 'shift',
            items: [res],
            item: res
        }, this);
    }

    return res;
}

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

export default ObservableArray;

