
/**
 * 
 * @param {number} x 
 * @param {number} l
 * @param {number} h
 * @param {number} L
 * @param {number} H
 * @returns {number}
 */
export function map(x, l, h, L, H) {
    return (x - l) / (h - l) * (H - L) + L;
}



export function sumArr(arr) {
    var res = 0;
    for (var i = 0; i < arr.length; ++i)
        res += arr[i];
    return res;
}

export function radianInRange(x, start, end) {
    if (start > end) return radianInRange(x, end, start);
    if (x < start) x += (Math.PI * 2) * Math.ceil((start - x) / 2 / Math.PI);
    if (x > end) x -= (Math.PI * 2) * Math.ceil((x - end) / 2 / Math.PI);
    return x >= start && x <= end;
}




export function distance(x0, y0, x1, y1) {
    var dx = x0 - x1;
    var dy = y0 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}