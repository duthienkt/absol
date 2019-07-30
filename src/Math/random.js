
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function randomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPick(arr) {
    var id = randomInt(0, arr.length - 1);
    return arr[id];
}