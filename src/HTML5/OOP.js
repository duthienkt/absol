/**
 * @param {Object} object
 * @param {String} key
 * @param {Function} method
 */
export function overrideMethod(object, key, method) {
    if (object[key] === undefined) object[key] = method;
    else {
        var _superMethod = object[key];
        object[key] = (function (_superMethod, method) {
            return function () {
                var _super = this.super;
                this.super = _superMethod;
                var result = method.apply(this, arguments);
                this.super = _super;
                return result;
            };

        })(_superMethod, method);
    }
}


function extendsObject(object, prototype) {
    // do not use setter, getter
    for (var key in prototype) {
        if (key !== 'constructor' && key !== '__proto__') {
            if ((typeof prototype[key] == 'function')) {
                overrideMethod(object, key, prototype[key]);
            }
            else if (prototype[key] !== undefined && prototype[key] !== null) {
                object[key] = prototype[key];//just copy
            }
        }
    }
};

function quickInheritObject(child, parent) {
    // do not use setter, getter

    Object.keys(parent).forEach(function (key) {
        if (key !== 'constructor' && (typeof parent[key] == 'function')) {
            var superMethod = parent[key];
            var currentMethod = child[key];
            if (!currentMethod) child[key] = superMethod;
            else {
                child[key] = function () {
                    var _super = this.super;
                    this.super = superMethod;
                    var result = currentMethod.apply(this, arguments);
                    this.super = _super;
                    return result;
                };
            }
        }
    });
};


export function drillProperty(topObject, botObject, keyTop, keyBot) {
    if (typeof (keyTop) == 'string') {
        keyBot = keyBot || keyTop;
        Object.defineProperty(topObject, keyTop, {
            set: function (value) {
                botObject[keyBot] = value;
            },
            get: function () {
                return botObject[keyBot];
            },
            configurable: true
        });
    }
    else {
        if (keyTop instanceof Array) {
            for (var i = 0; i < keyTop.length; ++i) {
                drillProperty(topObject, botObject, keyTop[i], keyTop[i]);
            }
        }
        else {
            for (var key in keyTop) {
                drillProperty(topObject, botObject, key, keyTop[key]);
            }
        }
    }
};

export function bindFunctions(_this, handlers) {
    var res = {};
    for (var key in handlers) {
        res[key] = handlers[key].bind(_this);
    }
    return res;
};


export function inheritCreator(parent, child) {
    var i;
    if (child.property) {
        if (parent.property) {
            for (i in parent.property) {
                if (!child.property[i]) child.property[i] = parent.property[i];
            }
        }
    }
    for (i in parent.prototype) {
        if (!child.prototype[i]) {
            child.prototype[i] = parent.prototype[i];
        }
        else {
            child.prototype[i] = (function (superFunction, childFunction) {
                return function () {
                    var _super = this.super;
                    this.super = superFunction;
                    var result = childFunction.apply(this, arguments);
                    this.super = _super;
                    return result;
                };
            })(parent.prototype[i], child.prototype[i]);
        }
    }
};

/***
 *
 * @param {Function} constructor
 */
export function mixClass(constructor) {
    var descriptors = {};
    for (var i = 1; i < arguments.length; ++i) {
        Object.assign(descriptors, Object.getOwnPropertyDescriptors(arguments[i].prototype));
    }
    delete descriptors.constructor;
    Object.defineProperties(constructor.prototype, descriptors);
}


var OOP = {
    overrideMethod: overrideMethod,
    extends: extendsObject,
    inherit: quickInheritObject,
    mixClass: mixClass,
    inheritCreator: inheritCreator,
    drillProperty: drillProperty,
    bindFunctions: bindFunctions
};


export default OOP;