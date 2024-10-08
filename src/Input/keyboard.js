export function isFnKey(name) {
    return name.match(/^[fF]([2-9]|(1([0-2]?)))$/)
}

export function isSpaceKey(name) {
    return name === ' ' || name.match(/^[sS]pace$/);
}

export function isCtrlKey(name) {
    return name.match(/(^([cC]ontrol)|ctrl)$/);
}

export function isAltKey(name) {
    return name.match(/^[aA]lt$/);
}

export function isShiftKey(name) {
    return name.match(/^[sS]hift$/);
}

export function isMetaKey(name) {
    return name.toLowerCase().match(/^(command|windows|meta)$/);
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
        meta: 1,
        ctrl: 2,
        alt: 3,
        shift: 4
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
    var keyName =  event.key || String.fromCharCode(event.which || event.keyCode);
    if (event.metaKey) {
        keys.push('meta');
    }
    if (event.ctrlKey)
        keys.push('ctrl');
    if (event.altKey)
        keys.push('alt');
    if (event.shiftKey)
        keys.push('shift');

    if (isSpaceKey(keyName)) {
        keys.push('space');
    }
    else if (isFnKey(keyName)) {
        keys.push(keyName.toLowerCase())
    }
    else if (!isMetaKey(keyName) && !isAltKey(keyName) && !isCtrlKey(keyName) && !isShiftKey(keyName))
        keys.push(keyName.toLowerCase());
    return keys.join('-');
}