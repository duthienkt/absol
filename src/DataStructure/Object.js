export function revokeResource(o) {
    if (!o) return;
    var oc, ocs;
    var keys, key;
    if (Array.isArray(o)) {
        while (o.length) {
            oc = o.pop();
            try {
                revokeResource(oc);
            } catch (err) {
            }
        }
    }
    else if (o.revokeResource) {
        o.revokeResource();
    }
    else if (o.nodeType === 1 || o.nodeType === 3) {
        if (o.revokeResource)
            o.revokeResource();
        else {
            while (o.lastChild) {
                oc = o.lastChild;
                revokeResource(oc);
                // if (oc.selfRemove) {
                //     oc.selfRemove();
                // }
                // else {
                    oc.remove();
                // }
            }
        }
    }
    else if (typeof o === "object") {
        keys = [];
        ocs = [];
        for (key in o) {
            keys.push(key);
        }
        while (keys.length) {
            key = keys.pop();
            ocs.push(o[keys]);
            try {
                delete o[key];
            } catch (err) {
            }
        }
        while (ocs.length) {
            try {
                revokeResource(ocs.pop());
            } catch (err) {
            }
        }
    }
    ocs = undefined;
    oc = undefined;
    keys = undefined;
    key = undefined;
    o = undefined;
}


/**
 *
 * @param obj
 * @param {string|Array<string>} keys
 * @param {function} callback
 */
export function observePropertyChanges(obj, keys, callback) {
    var value;
    if (Array.isArray(keys)) {
        keys.forEach(key => {
            observePropertyChanges(obj, key, callback);
        });
    }
    else {
        value = obj[keys];
        Object.defineProperty(obj, keys, {
            get: function () {
                return value;
            },
            set: function (newValue) {
                value = newValue;
                callback(keys, newValue);
            },
            configurable: true,
            enumerable: true
        });
    }
}


/**
 *
 * @param obj
 * @param {string|Array<string>} keys
 */
export function unobservePropertyChanges(obj, keys) {
    var value;
    if (Array.isArray(keys)) {
        keys.forEach(key=>{
            unobservePropertyChanges(obj, key);
        })
    }
    else {
        value = obj[keys];
        delete obj[keys];
        obj[keys] = value;
    }
}