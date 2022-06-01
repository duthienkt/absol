import Vec2 from "./Vec2";

/***
 *
 * @param {Vec2[]} vertices
 * @constructor
 */
function Polygon(vertices) {
    this.vertices = vertices;
}


/***
 *
 * @param {Vec2} P
 * @returns {-1|0|1}
 */
Polygon.prototype.pointLocalIn = function (P) {
    var A = this.vertices[this.vertices.length - 1];
    var B;
    var AB, PA, PB;
    var t, x;
    var count = 0;
    for (var i = 0; i < this.vertices.length; ++i) {
        B = this.vertices[i];
        PA = A.sub(P);
        PB = B.sub(P);
        if (PA.cross(PB) === 0 && PA.dot(PB) <= 0) {
            return 0;
        }
        AB = B.sub(A);
        if (A.y !== B.y) {
            t = -PA.y / AB.y;
            x = A.x + AB.x * t;
            if (t >= 0 && t < 1 && x > P.x) {
                count++;
            }
        }
        A = B;
    }

    return count % 2 === 1 ? 1 : -1;
};


Polygon.prototype.getPathString = function () {
    var vts = this.vertices;
    var res = 'M' + vts[0].x + ' ' + vts[0].y;
    for (var i = 1; i < vts.length; ++i) {
        res += 'L' + vts[i].x + ' ' + vts[i].y;
    }
    res += 'z';
    return res;
};

Polygon.make = function (vertices) {
    return new Polygon(vertices);
};

export default Polygon;
