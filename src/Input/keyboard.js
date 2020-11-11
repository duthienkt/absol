
export function isFnKey(name) {
    return name.match(/^[fF]([2-9]|(1([0-2]?)))$/)
}

export function isSpaceKey(name) {
    return name === ' ' || name.match(/^[sS]pace$/);
}

/***
 *
 * @param {string} text
 * @return {string}
 */
export function normalizeKeyBindingIdent(text) {
    var keys = text.trim().toLowerCase().split(/[-+\s_.]+/)
        .filter(function (w) {
            return w.length > 0;
        });
    var values = {
        ctrl: 1,
        alt: 2,
        shift: 3
    };
    keys.sort(function (a, b) {
        var va, vb;
        va = values[a] || 100;
        vb = values[b] || 100;
        return va - vb;
    });
    return keys.join('-');
}

/***
 *
 * @param {KeyboardEvent} event
 * @return {string}
 */
export function keyboardEventToKeyBindingIdent(event) {
    var keys = [];
    if (event.ctrlKey)
        keys.push('ctrl');
    if (event.altKey)
        keys.push('alt');
    if (event.shiftKey)
        keys.push('shift');
    if (isSpaceKey(event.key)) {
        keys.push('space');
    }
    else if (isFnKey(event.key)) {
        keys.push(event.key.toLowerCase())
    }
    else keys.push(event.key.toLowerCase());
    return keys.join('-');
}