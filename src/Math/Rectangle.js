import Vec2 from "./Vec2";

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
function Rectangle(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
}

/**
 *
 * @return {Vec2}
 * @constructor
 */
Rectangle.prototype.A = function () {
    return new Vec2(this.x, this.y);
};

/***
 *
 * @return {Vec2}
 * @constructor
 */
Rectangle.prototype.B = function () {
    return new Vec2(this.x + this.width, this.y);
};

/***
 *
 * @return {Vec2}
 * @constructor
 */
Rectangle.prototype.C = function () {
    return new Vec2(this.x + this.width, this.y + this.height);
};

/***
 *
 * @return {Vec2}
 * @constructor
 */
Rectangle.prototype.D = function () {
    return new Vec2(this.x, this.y + this.height);
};

/***
 *
 * @return {number}
 */
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

/***
 *
 * @param {Rectangle} r
 * @param {number=} margin
 * @return {boolean}
 */
Rectangle.prototype.isCollapse = function (r, margin) {
    if (!margin) margin = 0;
    return !(this.x >= r.x + r.width + margin || this.y >= r.y + r.height + margin
        || r.x >= this.x + this.width + margin || r.y >= this.y + this.height + margin);
};

/***
 *
 * @param {Rectangle} r
 * @return {number}
 */
Rectangle.prototype.collapsedSquare = function (r) {
    var collapseRect = this.collapsedRect(r);
    if (collapseRect) {
        return collapseRect.square();
    }
    else {
        return 0;
    }
};

/***
 *
 * @param {Rectangle} r
 * @return {Rectangle}
 */
Rectangle.prototype.collapsedRect = function (r) {
    var maxX, minX, maxY, minY, width, height;
    minX = Math.max(this.x, r.x);
    minY = Math.max(this.y, r.y);
    maxX = Math.min(this.x + this.width, r.x + r.width);
    maxY = Math.min(this.y + this.height, r.y + r.height);
    width = maxX - minX;
    height = maxY - minY;
    if (width >= 0 && height >= 0) {
        return new Rectangle(minX, minY, width, height);
    }
    return null;
};

/**
 * @param {Rectangle} r
 * @returns {Boolean}
 */
Rectangle.prototype.contains = function (r) {
    return (this.x <= r.x) && (this.y <= r.y) && (this.x + this.width >= r.x + r.width) && (this.y + this.height >= r.y + r.height);
};

/**
 * @param {Vec2} p
 * @returns {Boolean}
 */
Rectangle.prototype.containsPoint = function (p) {
    return (this.x <= p.x) && (this.y <= p.y) && (this.x + this.width >= p.x) && (this.y + this.height >= p.y);
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
Rectangle.prototype.copy = function () {
    return new Rectangle(this.x, this.y, this.width, this.height);
};


/**
 * @returns {Rectangle}
 */
Rectangle.prototype.clone = function () {
    return this.copy();
};

/***
 *
 * @param {Rectangle} r
 */
Rectangle.prototype.equals = function (r) {
    return this.x === r.x && this.y === r.y && this.height === r.height && this.width === r.width;
};

/**
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {Rectangle}
 */
Rectangle.make = function (x, y, width, height) {
    return new Rectangle(x, y, width, height);
};


/**
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {Rectangle}
 */
Rectangle.makeCenter = function (x, y, width, height) {
    return new Rectangle(x - width / 2, y - height / 2, width, height);
};

/**
 * @param {ClientRect|DOMRect} clientRect
 * @returns {Rectangle}
 */
Rectangle.fromClientRect = function (clientRect) {
    return new Rectangle(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
};


/***
 *
 * @param {Vec2[]} points
 * @returns  {Rectangle}
 */
Rectangle.boundingPoints = function (points) {
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    var point;
    for (var i = 0; i < points.length; ++i) {
        point = points[i];
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    }
    return new Rectangle(minX, minY, maxX - minX, maxY - minY);
};

export default Rectangle;