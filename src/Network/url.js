/***
 *
 * @param {string} current
 * @param {string} target
 * @return {string}
 */
export function resolveUrl(current, target) {
    current = current.trim();
    target = target.trim();
    if (target.match(/[a-z]+:\/\//)) return target;

    var origin = current.match(/^[a-z]+:\/\/[a-zA-Z0-9._]+(:[0-9]+)?/);
    if (origin) origin = origin[0];
    var cPath = current.replace(/^[a-z]+:\/\/[a-zA-Z0-9._]+(:[0-9]+)?/, '');
    if (target.startsWith('/')) return origin ? origin + target : target;
    var cParts = cPath.split('/');
    cParts.pop();
    var tParts = target.split('/');
    var t;
    //todo: normal current
    while (tParts.length > 0) {
        t = tParts.shift().trim();
        if (t === '..') {
            cParts.pop();
        }
        else if (t !== '.' && t.length > 0) {
            cParts.push(t);
        }
    }
    if (origin) {
        if (cParts[0].length === 0) cParts.shift();
        cParts.unshift(origin)
    }

    return cParts.join('/');
}

