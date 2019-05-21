import Vec2 from "./Vect2";
import { distance, radianInRange } from "./int";

function Arc(x, y, r, start, end) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.start = start;
    this.end = end;
};

Arc.prototype.isPointInBound = function (p) {
    if (distance(this.x, this.y, p.x, p.y) > r) return false;
    return radianInRange(Math.atan2(p.y - this.y, p.x - this.x), start, end);
};

Arc.prototype.isRectInBound = function (rect) {
    return this.isPointInBound(rect.A()) && this.isPointInBound(rect.B()) &&
        this.isPointInBound(rect.C()) && this.isPointInBound(rect.D());
};

Arc.prototype.isRectOutBound = function (rect) {
    return !this.isPointInBound(rect.A()) && !this.isPointInBound(rect.B()) &&
        !this.isPointInBound(rect.C()) && !this.isPointInBound(rect.D());
};

Arc.prototype.isRectCollapse = function (rect) {
    return this.isPointInBound(rect.A()) || this.isPointInBound(rect.B()) ||
        this.isPointInBound(rect.C()) || this.isPointInBound(rect.D());
};


Arc.prototype.centerPoint = function () {
    var mid = (this.start + this.end) / 2;
    var x = this.x + Math.cos(mid) * this.r * 2 / 3;
    var y = this.y + Math.sin(mid) * this.r * 2 / 3;
    return new Vec2(x, y);
};

Arc.prototype.centerRoundPoint = function () {
    var mid = (this.start + this.end) / 2;
    var x = this.x + Math.cos(mid) * this.r;
    var y = this.y + Math.sin(mid) * this.r;
    return new Vec2(x, y);
};


Arc.make = function (x, y, r, start, end) {
    return new Arc(x, y, r, start, end);
};


export default Arc;