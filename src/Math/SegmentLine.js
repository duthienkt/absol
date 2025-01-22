import Vec2 from "./Vec2";

/**
 *
 * @param {Vec2} start
 * @param {Vec2}end
 * @constructor
 */
function SegmentLine(start, end) {
    this.start = start;
    this.end = end;
}

SegmentLine.prototype.length = function () {
    return this.start.dist(this.end);
};

/**
 *
 * @param t
 * @returns {Vec2}
 */
SegmentLine.prototype.pointAt = function (t) {
    return this.start.add(this.end.sub(this.start).mult(t));
};


/**
 *
 * @param {Vec2} point
 * @returns {number}
 */
SegmentLine.prototype.nearestParamToPoint = function (point) {
    var v = this.end.sub(this.start);
    var w = point.sub(this.start);
    var c1 = w.dot(v);
    if (c1 <= 0) {
        return 0;
    }
    var c2 = v.dot(v);
    if (c2 <= c1) {
        return 1;
    }
    return c1 / c2;
};

/**
 *
 * @param {Vec2} point
 * @returns {Vec2}
 */
SegmentLine.prototype.nearestPointToPoint = function (point) {
    return this.pointAt(this.nearestParamToPoint(point));
};

/**
 *
 * @param {SegmentLine} sgm
 * @returns {Vec2}
 */
SegmentLine.prototype.intersect = function (sgm) {
    var x1 = this.start.x;
    var y1 = this.start.y;
    var x2 = this.end.x;
    var y2 = this.end.y;
    var x3 = sgm.start.x;
    var y3 = sgm.start.y;
    var x4 = sgm.end.x;
    var y4 = sgm.end.y;
    var d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d === 0) {
        return null;
    }
    var xi = ((x3 - x4) * (x1 * y2 - y1 * x2) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d;
    var yi = ((y3 - y4) * (x1 * y2 - y1 * x2) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d;
    return new Vec2(xi, yi);
};

/**
 *
 * @param {SegmentLine} sgm
 * @returns {boolean}
 */
SegmentLine.prototype.isIntersectWithSegment = function (sgm) {
    return this.intersect(sgm) !== null;
}




export default SegmentLine;



