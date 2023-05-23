var packHandlers = {
    x: (ac, v) => {
        ac.push(0);
    },
    c: (ac, v) => {
        ac.push(v.charCodeAt(0))
    },
    I: (ac, v) => {
        for (var i = 0; i < 4; ++i) {
            ac.push(v & 0xff);
            v = v >> 8;
        }
    },
    B: (ac, v) => {
        ac.push(v);
    },
    H: (ac, v) => {
        for (var i = 0; i < 2; ++i) {
            ac.push(v & 0xff);
            v = v >> 8;
        }
    }
};

var unpackHandlers = {
    B: ac => {
        return ac.shift();
    },
    H: ac => {
        var bytes = ac.splice(0, 2);

        var res = 0;
        for (var i = 1; i >= 0; --i) res = (res << 8) | bytes[i];
        return res;
    },
    I: ac => {
        var bytes = ac.splice(0, 4);
        var res = 0;
        for (var i = 3; i >= 0; --i) res = (res << 8) | bytes[i];
        return res;
    }
};

export function ord(x) {
    return x.charCodeAt(0);
}


/***
 *
 * @param format
 * @param {...any} item
 * @return {*[]}
 */
export function pack(format, item) {
    var items = Array.prototype.slice.call(arguments, 1);
    var res = [];
    for (var i = 0; i < format.length; ++i) {
        packHandlers[format[i]](res, items[i]);
    }
    return res;
}


/***
 *
 * @param {string} format
 * @param {number[]}bytes
 * @return {*[]}
 */
export function unpack(format, bytes) {
    var res = [];
    bytes = bytes.slice();
    for (var i = 0; i < format.length; ++i) {
        res.push(unpackHandlers[format[i]](bytes));
    }
    return res;
}

