import EventEmitter from "../HTML5/EventEmitter";

/***
 * @extends EventEmitter
 * @param {Object} o
 * @constructor
 */
function ObservableStruct(o) {
    EventEmitter.call(this);
    Object.defineProperty(this, '__o__', {
        configurable: false,
        enumerable: false,
        value: o
    });
    for (var key in o) this.defineProperty(key);
}

Object.defineProperty(ObservableStruct.prototype, 'defineProperty', {
    configurable: false,
    enumerable: false,
    writable: false,
    /***
     *
     * @param {string} name
     * @param {*=} value
     */
    value: function (name, value) {
        if (!(name in this)) {
            Object.defineProperty(this, name, {
                set: function (value) {
                    var oldValue = this.__o__[name]
                    this.__o__[name] = value;
                    this.emit('setproperty', {
                        type: 'setproperty',
                        target: this,
                        oldValue: oldValue,
                        vale: value,
                        name: name
                    }, this);
                },
                get: function () {
                    return this.__o__[name];
                },
                configurable: true,
                enumerable: true
            });
        }
    }
});


Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function (name) {
    if (!(name in ObservableStruct.prototype)) {
        Object.defineProperty(ObservableStruct.prototype, name, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: EventEmitter.prototype[name]
        });
    }
});

export default ObservableStruct;
