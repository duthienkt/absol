import Vec2 from "./Vec2";



function Rectangle(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;


};

Rectangle.prototype.A = function () {
    return new Vec2(this.x, this.y);
};

Rectangle.prototype.B = function () {
    return new Vec2(this.x + this.width, this.y);
};

Rectangle.prototype.C = function () {
    return new Vec2(this.x + this.width, this.y + this.height);
};

Rectangle.prototype.D = function () {
    return new Vec2(this.x, this.y + this.height);
};


Rectangle.prototype.square = function () {
    return this.width * this.height;
};


Rectangle.prototype.nearestPoint = function (arg0, arg1) {
    if (arg1) arg0 = Vec2.make(arg0, arg1);
    var res = this.A();
    var mind = res.dist(arg0);
    var d = this.B().dist(arg0);
    if (d < mind) {
        mind = d;
        res = this.B();
    }
    d = this.C().dist(arg0);
    if (d < mind) {
        mind = d;
        res = this.C();
    }
    d = this.D().dist(arg0);
    if (d < mind) {
        mind = d;
        res = this.D();
    }
    return res;
};

Rectangle.prototype.centerPoint = function () {
    return new Vec2(this.x + this.width / 2, this.y + this.height / 2);
};

Rectangle.prototype.isCollapse = function (r, margin) {
    if (!margin) margin = 0;
    if (this.x > r.x + r.width + margin) return false;
    if (this.y > r.y + r.height + margin) return false;

    if (r.x > this.x + this.width + margin) return false;
    if (r.y > this.y + this.height + margin) return false;
    return true;
};

Rectangle.prototype.collapsedSquare = function (r) {
    var margin = 0;
    var maxX, minX, maxY, minY;
    if (this.x > r.x + r.width + margin) return 0;
    if (this.y > r.y + r.height + margin) return 0;

    if (r.x > this.x + this.width + margin) return 0;
    if (r.y > this.y + this.height + margin) return 0;
    minX = this.x > r.x ? this.x : r.x;
    minY = this.y > r.y ? this.y : r.y;
    maxX = this.x + this.width < r.x + r.width ? this.x + this.width : r.x + r.width;
    maxY = this.y + this.height < r.x + r.height;
    return (maxX - minX) * (maxY - minY);
};

/**
 * @param {Rectangle} other
 * @returns {Rectangle}
 */
Rectangle.prototype.merge = function (other) {
    var left = Math.min(this.x, other.x);
    var top = Math.min(this.y, other.y);
    var right = Math.max(this.x + this.width, other.x + other.width);
    var bottom = Math.max(this.y + this.height, other.y + other.height);
    return new Rectangle(left, top, right - left, bottom - top);
};


/**
 * @returns {Rectangle}
 */
Rectangle.prototype.clone = function () {
    return new Rectangle(this.x, this.y, this.width, this.height);
};

Rectangle.make = function (x, y, width, height) {
    return new Rectangle(x, y, width, height);
};



Rectangle.makeCenter = function (x, y, width, height) {
    return new Rectangle(x - width / 2, y - height / 2, width, height);
};


export default Rectangle;