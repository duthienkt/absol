export function generateJSVariable(obj, indent) {
    indent = indent || '';
    var childIndent = indent + '    ';
    if (obj === null) {
        return 'null';
    } else if (obj instanceof Array) {
        if (obj.length === 0)
            return '[]';
        return '[\n'
            + obj.map(function (it) {
                return childIndent + generateJSVariable(it, childIndent);
            }).join(',\n')
            + '\n' + indent + ']';
    } else if (typeof obj === 'object') {
        var keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        return '{\n'
            + keys.map(function (key) {
                var value = obj[key];
                if (!key.match(/^[a-zA-Z_$]([a-zA-Z_0-9$]*)$/)) key = JSON.stringify(key);
                return childIndent + key + ': ' + generateJSVariable(value, childIndent)
            }).join(',\n')
            + '\n' + indent + '}';
    } else if (obj === undefined) {
        return 'undefined';
    } else {
        return JSON.stringify(obj);
    }
}