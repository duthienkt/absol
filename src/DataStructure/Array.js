/***
 *
 * @param {(string|number|boolean|null)[]} arr
 * @returns {(string|number|boolean|null)[]}
 */
export function arrayUnique(arr) {
    var dict = {};
    return arr.reduce(function (ac, cr) {
        var key = (typeof cr) + '//' + cr;
        if (key in dict) return ac;
        ac.push(cr);
        dict[key] = true;
        return ac;
    }, []);
}

/***
 *
 * @param {[]}arr
 * @return {[]}
 */
export function arrayRemoveNone(arr) {
    return arr.filter(function (c) {
        return c !== null && c !== undefined;
    });
}

export function arrayIntersection(a1, a2) {
    var dict1 = a1.reduce((ac, cr) => {
        ac[(typeof cr) + cr] = true;
        return ac;
    }, {});
    var dict2 = a2.reduce((ac, cr) => {
        ac[(typeof cr) + cr] = true;
        return ac;
    }, {});
    var dictAdded = {};
    var res = [];
    var i, k, x;
    for (i = 0; i < a1.length; ++i) {
        x = a1[i];
        k = (typeof x) + x;
        if (dict1[k] && dict2[k] && !dictAdded[k]) {
            res.push(x);
            dictAdded[k] = true;
        }
    }

    for (i = 0; i < a2.length; ++i) {
        x = a2[i];
        k = (typeof x) + x;
        if (dict1[k] && dict2[k] && !dictAdded[k]) {
            res.push(x);
            dictAdded[k] = true;
        }
    }
    return res;
}

export function arrayIsSubset(childArr, parentArr) {
    if (!(childArr instanceof  Array) || !(parentArr instanceof Array)) return  false;
    var dict2 = parentArr.reduce((ac, cr) => {
        ac[(typeof cr) + cr] = true;
        return ac;
    }, {});
    var res = true;
    var n = childArr.length;
    var k;
    for (var i = 0; i < n; ++i) {
        k = (typeof childArr[i]) + childArr[i];
        if (!dict2[k]) {
            res = false;
            break;
        }
    }

    return res;
}


/***
 *
 * @param {[]}a1
 * @param {[]}a2
 * @param {boolean=} order
 * @returns {boolean}
 */
export function arrayCompare(a1, a2, order) {
    if (a1 === a2) return true;
    if (!a1 || !a2) return false;
    if (a1.length !== a2.length) return false;
    if (!a1.sort || !a2.sort) return false;
    if (!order) {
        a1.sort();
        a2.sort();
    }
    var n = a1.length;
    for (var i = 0; i < n; ++i) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
}