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

/**
 * Fetches a resource from the given URL and reads it as an ArrayBuffer.
 *
 * @param {string} url - The URL of the resource to fetch.
 * @returns {Promise<ArrayBuffer>} A promise that resolves to the ArrayBuffer of the fetched resource.
 */
export function readUrlAsArrayBuffer(url) {
    return fetch(url).then(function (response) {
        return response.arrayBuffer();
    });
}

/**
 * Reads a File or Blob object as an ArrayBuffer using FileReader.
 *
 * @param {File|Blob} file - The File or Blob object to read.
 * @returns {Promise<ArrayBuffer>} A promise that resolves to the ArrayBuffer of the file's contents.
 */
export function readFileAsArrayBuffer(file) {
    var fileReader = new FileReader();
    return new Promise(function (rs, rj) {
        fileReader.onload = function (event) {
            var arrayBuffer = event.target.result;
            rs(arrayBuffer);
        };
        fileReader.onerror = function (event) {
            rj(event);
        };
        fileReader.readAsArrayBuffer(file);
    });
}


/**
 * Reads an object (URL string, Blob, File, or object with arrayBuffer method) as an ArrayBuffer.
 *
 * @param {string|Blob|File|{arrayBuffer: function(): Promise<ArrayBuffer>}} obj - The source to read as ArrayBuffer. Can be:
 *   - A URL string (fetches and reads as ArrayBuffer)
 *   - A Blob or File (uses FileReader)
 *   - An object with an arrayBuffer() method (calls the method)
 *   - null/undefined (returns Promise<null>)
 * @returns {Promise<ArrayBuffer|null>} A promise that resolves to the ArrayBuffer, or null if input is falsy.
 */
export function readAsArrayBuffer(obj) {
    if (!obj) {
        return Promise.resolve(null);
    }
    else if (typeof  obj.arrayBuffer === 'function') {
        return obj.arrayBuffer();
    }
    else if (typeof obj === 'string') {
        return readUrlAsArrayBuffer(obj);
    }
    else if ((obj instanceof Blob)|| (obj instanceof File)) {
        return readFileAsArrayBuffer(obj);
    }
}
