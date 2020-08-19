function Vec2(x, y) {
    this.x = x;
    this.y = y;
}


Vec2.prototype.copy = function () {
    return new Vec2(this.x, this.y);
};

Vec2.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
};

Vec2.prototype.abs = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vec2.prototype.normalized = function () {
    var l = this.abs();
    if (l == 0) l = 1;
    return this.div(l);
};

Vec2.prototype.mult = function (h) {
    return new Vec2(this.x * h, this.y * h);
};

Vec2.prototype.div = function (h) {
    return new Vec2(this.x / h, this.y / h);
};


Vec2.prototype.dist = function (v) {
    var dx = v.x - this.x;
    var dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
};


Vec2.prototype.sub = function (v) {
    return new Vec2(this.x - v.x, this.y - v.y);
};
Vec2.prototype.add = function (v) {
    return new Vec2(this.x + v.x, this.y + v.y);
};

Vec2.prototype.inv = function () {
    return new Vec2(-this.x, -this.y);
};

Vec2.prototype.linear = function (v, h) {
    return new Vec2(this.x * (1 - h) + v.x * h, this.y * (1 - h) + v.y * h);
};

Vec2.prototype.dot = function (v1) {
    return this.x * v1.x + this.y * v1.y;
};

Vec2.prototype.direction = function () {
    return Math.atan2(this.y, this.x);
};

/***
 *
 * @param {Number} dx
 * @param {Number} dy
 */
Vec2.prototype.translate = function (dx, dy) {
    return this.add(new Vec2(dx, dy));
};


/****
 *
 * @param {Number} angle - radian
 * @returns {Vec2}
 */
Vec2.prototype.rotate = function (angle) {
    var sinA = Math.sin(angle);
    var cosA = Math.cos(angle);
    var x = this.x * cosA - this.y * sinA;
    var y = this.x * sinA + this.y * cosA;
    return new Vec2(x, y);
};


Vec2.fromDirection = function (angle) {
    return new Vec2(Math.cos(angle), Math.sin(angle));
};

Vec2.make = function (x, y) {
    if (x instanceof Array) {
        return new Vec2(x[0], x[1]);
    }
    else if (x instanceof Vec2) {
        return x.copy();
    }
    else
        return new Vec2(x, y);
};

export default Vec2;