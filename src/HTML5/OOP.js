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
 * @param {Function[]}ParentClasses
 */
export function mixClass(constructor, ...ParentClasses) {
    var createFunction;
    var cClass, proto;
    var descriptors = {};
    var attributeHandlers = undefined;
    var pinHandlers = undefined;
    var attributes = undefined;
    var style = undefined;//fmv1
    var i;
    var render, tag, property, eventHandler, extendStyle;//dom module
    var styleHandlers = undefined;

    //normal
    for (i = 0; i < ParentClasses.length; ++i) {
        cClass = ParentClasses[i];
        if (typeof cClass === "function") {
            proto = cClass.prototype;
            createFunction = cClass.create || createFunction;
            if (cClass.render) {
                render = cClass.render;
            }
            if (cClass.tag) {
                tag = cClass.tag;
            }
            if (cClass.property) {
                if (!property) property = {};
                Object.keys(cClass.property).forEach((key) => {
                    property[key] = Object.assign({}, cClass.property[key]);
                });
            }
            if (cClass.eventHandler) {
                eventHandler = Object.assign(eventHandler || {}, cClass.eventHandler);
            }
        }
        else {
            proto = cClass;
        }

        Object.assign(descriptors, Object.getOwnPropertyDescriptors(proto));

        //has attributes handler
        if (proto.attributeHandlers) {
            attributeHandlers = attributeHandlers || {};
            Object.keys(proto.attributeHandlers || {}).forEach(key => {
                attributeHandlers[key] = Object.assign({}, proto.attributeHandlers [key]);
            });
        }
        if (proto.attributes) {
            attributes = attributes || {};
            Object.assign(attributes, proto.attributes);
        }

        if (proto.style) {
            style = style || {};
            Object.assign(style, proto.style);
        }

        //for CCBlock
        if (proto.pinHandlers) {
            pinHandlers = pinHandlers || {};
            Object.keys(proto.pinHandlers || {}).forEach(key => {
                pinHandlers[key] = Object.assign({}, proto.pinHandlers [key]);
            });
        }

        //dom

        if (proto.styleHandlers) {
            styleHandlers = styleHandlers || {};
            Object.keys(proto.styleHandlers || {}).forEach(key => {
                styleHandlers[key] = Object.assign({}, proto.styleHandlers [key]);
            });
        }
        if (proto.extendStyle) {
            extendStyle = extendStyle || {};
            Object.assign(extendStyle, proto.extendStyle);
        }

    }
    delete descriptors.constructor;
    delete descriptors.attributes;
    delete descriptors.attributeHandlers;
    delete descriptors.pinHandlers;
    delete descriptors.extendStyle;
    delete descriptors.styleHandlers;

    Object.defineProperties(constructor.prototype, descriptors);

    if (attributeHandlers)
        constructor.prototype.attributeHandlers = attributeHandlers;
    if (pinHandlers)
        constructor.prototype.pinHandlers = pinHandlers;
    if (attributes) {
        constructor.prototype.attributes = attributes;
    }
    if (style) {
        constructor.prototype.style = style;
    }

    if (property) constructor.property = property;
    if (render) constructor.render = render;
    if (tag) constructor.tag = tag;
    if (eventHandler)  constructor.eventHandler = eventHandler;
    if (styleHandlers) {
        constructor.prototype.styleHandlers = styleHandlers;
    }
    if (extendStyle) {
        constructor.prototype.extendStyle = extendStyle;
    }
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