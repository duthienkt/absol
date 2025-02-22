import SegmentLine from "./SegmentLine";
import Vec2 from "./Vec2";

function Polyline(points) {
    if (points.length < 2)
        points = [new Vec2(0, 0), new Vec2(0, 0)];
    this.points = points;
}


Polyline.prototype.nearestParamToPoint = function (point) {
    var sgm;
    var minDist = Infinity;
    var minParam = 0;
    var param;
    for (var i = 0; i < this.points.length - 1; ++i) {
        sgm = new SegmentLine(this.points[i], this.points[i + 1]);
        param = sgm.nearestParamToPoint(point);
        if (sgm.pointAt(param).dist(point) < minDist) {
            minDist = sgm.pointAt(param).dist(point);
            minParam = i + param;
        }
    }
    return minParam;
};

/**
 *
 * @param {number} param - from 0 to points_length - 1
 * @returns {Vec2}
 */
Polyline.prototype.pointAt = function (param) {
    if (param < 0) return this.points[0];
    if (param >= this.points.length - 1) return this.points[this.points.length - 1];
    var idx = Math.floor(param);
    var sgm = new SegmentLine(this.points[idx], this.points[idx + 1]);
    return sgm.pointAt(param - idx);
};

Polyline.prototype.copy = function () {
    return new Polyline(this.points.map((p) => {
        return p.copy();
    }));
};

/**
 * @param {number=} tolerance
 * @returns {Polyline}
 */
Polyline.prototype.simplify = function (tolerance) {
    tolerance = tolerance || 0.00001;
    var points = this.points;
    var newPoints = [];
    var point, lastPoint;
    var sm;
    var dist;
    for (var i =0; i< points.length; ++i){
        point = points[i];
        if (newPoints.length <2) {
            newPoints.push(point);
            continue;
        }
        lastPoint = newPoints[newPoints.length - 1];
        sm = new SegmentLine(newPoints[newPoints.length - 2], point);
        dist = sm.nearestPointToPoint(lastPoint).dist(lastPoint);
        if (dist > tolerance){
            newPoints.push(point);
        }
        else {
            newPoints[newPoints.length - 1] = point;
        }
    }
    return new Polyline(newPoints);
};


export default Polyline;
