/***
 *
 * @param {T} value
 * @param {*=} type
 * @constructor
 * @template T
 */
function Ref(value, type) {
    this.type = type;
    this.value = value;
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





