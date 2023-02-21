/***
 *
 * @param {T} value
 * @param {*=} type
 * @constructor
 * @template T
 */
function Const(value, type) {
    this.value = value;
    this.type = type;
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





