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