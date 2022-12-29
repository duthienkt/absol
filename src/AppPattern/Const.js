/***
 *
 * @param {T} value
 * @constructor
 * @template T
 */
function Const(value) {
    this.value = value;
}

Const.prototype.toString = function () {
    return this.value + '';
};

/***
 *
 * @return {T}
 */
Const.prototype.valueOf = function () {
    return this.value;
};

/**
 *
 * @return {T}
 */
Const.prototype.get = function () {
    return this.value;
}

export default Const;





