import Vec2 from "./Vec2.js";

/**
 *
 * @param {Vec2} startPoint
 * @param {Vec2} ctrlPoint1
 * @param {Vec2} ctrlPoint2
 * @param {Vec2} endPoint
 * @constructor
 */
function BezierCurve(startPoint, ctrlPoint1, ctrlPoint2, endPoint) {
    this.startPoint = startPoint;
    this.ctrlPoint1 = ctrlPoint1;
    this.ctrlPoint2 = ctrlPoint2;
    this.endPoint = endPoint;
}

/**
 *
 * @param {number} t
 */
BezierCurve.prototype.pointAt = function (t) {
    var s1 = this.ctrlPoint1.sub(this.startPoint).mult(t).add(this.startPoint);
    var s2  = this.ctrlPoint2.sub(this.ctrlPoint1).mult(t).add(this.ctrlPoint1);
    var s3 = this.endPoint.sub(this.ctrlPoint2).mult(t).add(this.ctrlPoint2);

    var s4 = s2.sub(s1).mult(t).add(s1);
    var s5 = s3.sub(s2).mult(t).add(s2);
    return s5.sub(s4).mult(t).add(s4);
};


/**
 *
 * @param {Vec2} point
 * @returns {number}
 */
BezierCurve.prototype.nearestBzParamToPoint = function (point) {
    var low = 0;
    var high = 1;
    var ml;
    var mh;
    var delta = 0.00001;
    while (high - low > delta) {
        ml = low + (high - low) / 3;
        mh = high - (high - low) / 3;
        if (this.pointAt(ml).dist(point) < this.pointAt(mh).dist(point)) {
            high = mh;
        }
        else {
            low = ml;
        }
    }

    return (low + high) / 2;
};

/**
 *
 * @param {Vec2} point
 * @returns {*}
 */
BezierCurve.prototype.distanceToPoint = function (point) {
    return this.pointAt(this.nearestBzParamToPoint(point)).dist(point);
};
/**
 *
 * @param {BezierCurve} otherCurve
 * @returns {{current: number, other: number}}
 */
BezierCurve.prototype.nearestBParamToOtherBzCurve = function (otherCurve) {
    var res = { current: 0, other: 0 };
    var delta = 0.00001;
    var low = 0;
    var high = 1;
    var ml;
    var mh;
    var currentPointL, currentPointH;
    while (high - low > delta) {
        ml = low + (high - low) / 3;
        mh = high - (high - low) / 3;
        currentPointL = this.pointAt(ml);
        currentPointH = this.pointAt(mh);

        if (otherCurve.distanceToPoint(currentPointL) < otherCurve.distanceToPoint(currentPointH)) {
            high = mh;
        }
        else {
            low = ml;
        }
    }
    res.current = (low + high) / 2;
    currentPointL = this.pointAt(res.current);
    res.other = otherCurve.nearestBzParamToPoint(currentPointL);
    return res;
};

/**
 * @returns {BezierCurve}
 */
BezierCurve.prototype.copy = function () {
    return new BezierCurve(this.startPoint.copy(), this.ctrlPoint1.copy(), this.ctrlPoint2.copy(), this.endPoint.copy());
};


export default BezierCurve;
