export function isRealNumber(x) {
    return (typeof x === 'number') && !isNaN(x) && isFinite(x);
}

export function isInteger(x) {
    return (typeof x === 'number') && isFinite(x) && Math.floor(x) === x;
}

export function isNaturalNumber(x) {
    return isInteger(x) && x >= 0;
}


export function isNone(x) {
    return x === null || x === undefined;
}

export function castToString(x) {
    if (isNone(x)) return '';
    if (typeof x === 'string') return x;
    if (typeof x === 'number') return x.toString();
    if (typeof x === 'boolean') return x ? 'true' : 'false';
    if (x instanceof Date) return x.toISOString();
    if (Array.isArray(x)) return x.map(it => castToString(it)).join('');
    return x.toString();
}

export function castToBoolean(x) {
    if (isNone(x)) return false;
    if (x.toLowerCase) x = x.toLowerCase();
    if (x === 'true' || x === '1') return true;
    if (x === 'false' || x === '0') return false;
    if (typeof x === 'boolean') return x;
    return !!x;
}