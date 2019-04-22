var OOP =  {};

/**
 * @param {Object} object
 * @param {Sttring} key
 * @param {Function} method
*/
OOP.overideMethod = function (object, key, method) {
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
};
 

OOP.extends = function (object, prototype) {
    // do not use setter, getter
    for (var key in prototype) {
        if (key != 'constructor' && (typeof prototype[key] == 'function'))
            OOP.overideMethod(object, key, prototype[key]);
    }
};

OOP.inherit = function (child, parent) {
    // do not use setter, getter

    Object.keys(parent).forEach(function (key) {
        if (key != 'constructor' && (typeof parent[key] == 'function')) {
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





OOP.drillProperty = function (topObject, botObject, keyTop, keyBot) {
    if (typeof (keyTop) == 'string') {
        keyBot = keyBot || keyTop;
        Object.defineProperty(topObject, keyTop, {
            set: function (value) {
                botObject[keyBot] = value;
            },
            get: function () {
                return botObject[keyBot];
            }
        });
    }
    else {
        if (keyTop instanceof Array) {
            for (var i = 0; i < keyTop.length; ++i) {
                OOP.drillProperty(topObject, botObject, keyTop[i], keyTop[i]);
            }
        }
        else {
            for (var key in keyTop) {
                OOP.drillProperty(topObject, botObject, key, keyTop[key]);
            }
        }
    }
};

OOP.bindFunctions = function (_this, handlers) {
    var res = {};
    for (var key in handlers) {
        res[key] = handlers[key].bind(_this);
    }
    return res;
};




OOP.inheritCreator = function (parent, child) {
    if (child.property) {
        if (parent.property) {
            for (i in parent.property) {
                if (!child.property[i]) child.property[i] = parent.property[i];
            }
        }
    }
    for (var i in parent.prototype) {
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
                }
            })(parent.prototype[i], child.prototype[i]);
        }
    }
};

export default OOP;