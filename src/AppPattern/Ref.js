/***
 *
 * @param {T} value
 * @constructor
 * @template T
 */
function Ref(value) {
    this.set(value);
}

Ref.prototype.toString = function () {
    return this.value + '';
};

/***
 *
 * @return {T}
 */
Ref.prototype.valueOf = function () {
    return this.value;
};

/***
 *
 * @param {T}value
 */
Ref.prototype.set = function (value) {
    this.value = value;
};

/**
 *
 * @return {T}
 */
Ref.prototype.get = function () {
    return this.value;
}

export default Ref;





