function Ref(value) {
    this.set(value);
}

Ref.prototype.toString = function () {
    return this.value + '';
};

Ref.prototype.valueOf = function () {
    return this.value;
};

Ref.prototype.set = function (value) {
    this.value = value;
};

Ref.prototype.get = function () {
    return this.value;
}

export default Ref;




