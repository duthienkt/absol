/**
 *
 * @param obj
 * @param {string=}indent
 * @param {object=}opt
 * @returns {string}
 */
export function generateJSVariable(obj,indent, opt) {
    indent = indent || '';
    var childIndent = indent + '    ';
    if (obj === null) {
        return 'null';
    }
    else if (obj instanceof Date) {
        return 'new Date(' + obj.getTime() + ')';
    }
    else if (obj instanceof Array) {
        if (obj.length === 0)
            return '[]';
        return '[\n'
            + obj.map(function (it) {
                return childIndent + generateJSVariable(it, childIndent, opt);
            }).join(',\n')
            + '\n' + indent + ']';
    }
    else if (obj instanceof Error) {
        return generateJSVariable({message: obj.message, stack: obj.stack});
    }
    else if (typeof obj === 'object') {
        var keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        return '{\n'
            + keys.map(function (key) {
                var value = obj[key];
                if (!key.match(/^[a-zA-Z_$]([a-zA-Z_0-9$]*)$/)) key = JSON.stringify(key);
                return childIndent + key + ': ' + generateJSVariable(value, childIndent, opt)
            }).join(',\n')
            + '\n' + indent + '}';
    }
    else if (obj === undefined) {
        return 'undefined';
    }
    else {
        return JSON.stringify(obj);
    }
}

/***
 *
 * @param o
 * @param {Array<{test, replace}>| null=} replacers
 * @returns {*}
 */
export function copyJSVariable(o, replacers) {
    var replacer;
    if (replacers && replacers.length > 0) {
        replacer = replacers.find((rp) => {
            return rp.test.apply(rp, [o].concat(Array.prototype.slice.call(arguments, 2)));
        });
        if (replacer) {
            return replacer.replace.apply(replacer, [o].concat(Array.prototype.slice.call(arguments, 2)));
        }
    }
    if (o === null) return null;
    if (o === undefined) return undefined;
    var type = typeof o;
    if (type === "boolean") return o;
    if (o instanceof Date || (typeof o.getTime === "function")) return new Date(o.getTime());
    if (type === "number") return o;
    if (type === "string") return o + '';
    if (typeof o.map === "function") {
        return o.map((it, i) => copyJSVariable(it, replacers, i, o));
    }
    if (type === "object" && o.constructor === Object) {
        return Object.keys(o).reduce((ac, cr) => {
            ac[cr] = copyJSVariable(o[cr], replacers, cr, o);
            return ac;
        }, {});
    }
    return o;
}

export function replaceDateStringJSVariable(o) {
    return copyJSVariable(o, [{
        test: (x) => {
            return (typeof x === "string")
                && x.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+([a-zA-Z]{3})\s+[\d\s:]+GMT[\d+]+\s*\([^)]+\)$/)
                && !isNaN(new Date(x).getTime());
        },
        replace: x => new Date(x)
    }]);
}

/***
 *
 * @param a
 * @param b
 * @return {boolean}
 */
export function isJSVariableEqual(a, b) {
    if (a === b) return true;//1
    var tA = typeof a;
    var tB = typeof b;
    if (tA !== tB) return false; //2
    if (!a !== !b) return false;
    if (tA === 'string') return false;//because 1 & 2
    if (tA === "number"){
        if (isNaN(a) && isNaN(b)) return true;//because 2
        return false;//because 1
    }

    var aIsDate = a instanceof Date;
    var bIsDate = b instanceof Date;
    if (aIsDate !== bIsDate) return false;
    if (aIsDate) return isJSVariableEqual(a.getTime(), b.getTime());

    var aIsArray = a instanceof Array;
    var bIsArray = a instanceof Array;
    if (aIsArray !== bIsArray) return false;
    var i;
    if (aIsArray) {
        if (a.length !== b.length) return false;
        for (i = 0; i < a.length; ++i) {
            if (!isJSVariableEqual(a[i], b[i])) return false;
        }
        return true;
    }

    //object
    if (a.equals) return a.equals(b);
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    aKeys.sort();
    bKeys.sort();
    if (!isJSVariableEqual(aKeys, bKeys)) return  false;
    for (i = 0; i < aKeys.length; ++i) {
        if (!isJSVariableEqual(a[aKeys[i]], b[aKeys[i]]))
            return false;
    }
    return true;
}

