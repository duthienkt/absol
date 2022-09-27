export function generateJSVariable(obj, indent) {
    indent = indent || '';
    var childIndent = indent + '    ';
    if (obj === null) {
        return 'null';
    }
    else if (obj instanceof Date) {
        return 'Date(' + obj.getTime() + ')';
    }
    else if (obj instanceof Array) {
        if (obj.length === 0)
            return '[]';
        return '[\n'
            + obj.map(function (it) {
                return childIndent + generateJSVariable(it, childIndent);
            }).join(',\n')
            + '\n' + indent + ']';
    }
    else if (typeof obj === 'object') {
        var keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        return '{\n'
            + keys.map(function (key) {
                var value = obj[key];
                if (!key.match(/^[a-zA-Z_$]([a-zA-Z_0-9$]*)$/)) key = JSON.stringify(key);
                return childIndent + key + ': ' + generateJSVariable(value, childIndent)
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
           return  rp.test.apply(rp, [o].concat(Array.prototype.slice.call(arguments, 2)));
        });
        if (replacer){
            return replacer.replace.apply(replacer, [o].concat(Array.prototype.slice.call(arguments, 2)));
        }
    }
    if (o === null) return null;
    if (o === undefined) return undefined;
    var type = typeof o;
    if (type === "boolean") return o;
    if (o instanceof Date || (typeof o.getTime === "function")) return new Date(o.getTime());
    if (type === "number") return type;
    if (type === "string") return o + '';
    if (typeof o.map === "function") {
        return o.map((it, i) => copyJSVariable(it, replacers, i, o));
    }
    if (type === "object") {
        return Object.keys(o).reduce((ac, cr) => {
            ac[cr] = copyJSVariable(o[cr],replacers, cr,o );
            return ac;
        }, {});
    }
    return o;
}

export function replaceDateStringJSVariable(o){
    return copyJSVariable(o, [{
        test: (x)=>{
            return (typeof x === "string") && !isNaN(new Date(x).getTime());
        },
        replace: x=> new Date(x)
    }]);
}