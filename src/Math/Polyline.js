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
        param= sgm.nearestParamToPoint(point);
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




export default Polyline;