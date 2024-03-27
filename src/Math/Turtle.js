import Vec2 from "./Vec2";

/**
 * @typedef TurtleCommand
 * @property {String} cmd
 * @property {String} action
 * @property {Number[]} args
 * @property {Vec2} dest
 * @property {Vec2} tangent
 */


/***
 *
 * @constructor
 */
function Turtle() {
    /**
     * @type {Array<TurtleCommand>}
     */
    this._commands = [];
    /**
     * @type {Vec2}
     */
    this._pos = new Vec2(0, 0);
    /**
     * @type {Vec2}
     */
    this._startPos = this._pos;
    /**
     * @type {Vec2}
     */
    this._tangent = new Vec2(0, 0);
}


/**
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.moveBy = function (dx, dy) {
    this._tangent = new Vec2(dx, dy);
    this._pos = this._pos.add(this._tangent);
    this._startPos = this._pos;
    this._commands.push({
        cmd: 'm',
        action: 'moveBy',
        args: [dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.moveTo = function (x, y) {
    this._tangent = this._pos;
    this._pos = new Vec2(x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._startPos = this._pos;
    this._commands.push({
        cmd: 'M',
        action: 'moveTo',
        args: [x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};

/**
 *
 * @param {number} length
 * @returns {this}
 */
Turtle.prototype.moveForward = function (length) {
    var dV = this._tangent.normalized().mult(length);
    this._pos = this._pos.add(dV);
    this._startPos = this._pos;
    this._commands.push({
        cmd: 'm',
        action: 'moveTo',
        args: [dV.x, dV.y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};

/**
 *
 * @param {number} length
 * @returns {this}
 */
Turtle.prototype.lineForward = function (length) {
    var dV = this._tangent.normalized().mult(length);
    this._pos = this._pos.add(dV);
    this._startPos = this._pos;
    this._commands.push({
        cmd: 'l',
        action: 'moveTo',
        args: [dV.x, dV.y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};

/***
 *
 * @param {Number} angle - degree
 *  @returns {this}
 */
Turtle.prototype.rotateDirTo = function (angle) {
    this._tangent = Vec2.fromDirection(angle * Math.PI / 180);
    return this;
};

/***
 *
 * @param {Number} dAngle
 * @returns {this}
 */
Turtle.prototype.rotateDirBy = function (dAngle) {
    this._tangent = this._tangent.rotate(dAngle * Math.PI / 180);
    return this;
};


/**
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.lineTo = function (x, y) {
    this._tangent = this._pos;
    this._pos = new Vec2(x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'L',
        action: 'lineTo',
        args: [x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.lineBy = function (dx, dy) {
    this._tangent = new Vec2(dx, dy);
    this._pos = this._pos.add(this._tangent);
    this._commands.push({
        cmd: 'l',
        action: 'lineBy',
        args: [dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} x
 * @returns {this}
 */
Turtle.prototype.hLineTo = function (x) {
    this._tangent = this._pos;
    this._pos = new Vec2(x, this._pos.y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'H',
        action: 'hLineTo',
        args: [x],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};

/**
 * @param {Number} x
 * @returns {this}
 */
Turtle.prototype.hLineBy = function (x) {
    this._tangent = new Vec2(x, 0);
    this._pos = this._pos.add(this._tangent);
    this._commands.push({
        cmd: 'h',
        action: 'hLineBy',
        args: [x],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.vLineTo = function (y) {
    this._tangent = this._pos;
    this._pos = new Vec2(this._pos.x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'V',
        action: 'vLineTo',
        args: [y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};

/**
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.vLineBy = function (y) {
    this._tangent = new Vec2(0, y);
    this._pos = this._pos.add(this._tangent);
    this._commands.push({
        cmd: 'v',
        action: 'vLineBy',
        args: [y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};

/**
 * @param {Number} c1x
 * @param {Number} c1y
 * @param {Number} c2x
 * @param {Number} c2y
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.cubicBezierTo = function (c1x, c1y, c2x, c2y, x, y) {
    this._tangent = new Vec2(c2x, c2y);
    this._pos = new Vec2(x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'C',
        action: 'cubicBezierTo',
        args: [c1x, c1y, c2x, c2y, x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} c1dx
 * @param {Number} c1dy
 * @param {Number} c2dx
 * @param {Number} c2dy
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.cubicBezierBy = function (c1dx, c1dy, c2dx, c2dy, dx, dy) {
    this._tangent = this._pos.add(new Vec2(c2dx, c2dy));
    this._pos = this._pos.add(new Vec2(dx, dy));
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'c',
        action: 'cubicBezierBy',
        args: [c1dx, c1dy, c2dx, c2dy, dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} c2x
 * @param {Number} c2y
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.smoothCubicBezierTo = function (c2x, c2y, x, y) {
    this._tangent = new Vec2(c2x, c2y);
    this._pos = new Vec2(x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'S',
        action: 'smoothCubicBezierTo',
        args: [c2x, c2y, x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} c2dx
 * @param {Number} c2dy
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.smoothCubicBezierBy = function (c2dx, c2dy, dx, dy) {
    this._tangent = this._pos.add(new Vec2(c2dx, c2dy));
    this._pos = this._pos.add(new Vec2(dx, dy));
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 's',
        action: 'smoothCubicBezierBy',
        args: [c2dx, c2dy, dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} cx
 * @param {Number} cy
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.quadraticBezierTo = function (cx, cy, x, y) {
    this._tangent = new Vec2(cx, cy);
    this._pos = new Vec2(x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'Q',
        action: 'quadraticBezierTo',
        args: [cx, cy, x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} cdx
 * @param {Number} cdy
 * @param {Number} cdx
 * @param {Number} cdy
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.quadraticBezierBy = function (cdx, cdy, dx, dy) {
    this._tangent = this._pos.add(new Vec2(cdx, cdy));
    this._pos = this._pos.add(new Vec2(dx, dy));
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'q',
        action: 'quadraticBezierBy',
        args: [cdx, cdy, dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} cx
 * @param {Number} cy
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.smoothQuadraticBezierTo = function (cx, cy, x, y) {
    this._tangent = new Vec2(cx, cy);
    this._pos = new Vec2(x, y);
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'T',
        action: 'smoothQuadraticBezierTo',
        args: [cx, cy, x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @param {Number} cdx
 * @param {Number} cdy
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.smoothQuadraticBezierBy = function (cdx, cdy, dx, dy) {
    this._tangent = this._pos.add(new Vec2(cdx, cdy));
    this._pos = this._pos.add(new Vec2(dx, dy));
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 't',
        action: 'smoothQuadraticBezierBy',
        args: [cdx, cdy, dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/***
 *
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} angle
 * @param {Number} large
 * @param {Number} sweep
 * @param {Number} x
 * @param {Number} y
 * @returns {this}
 */
Turtle.prototype.arcTo = function (rx, ry, angle, large, sweep, x, y) {
    this._tangent = this._pos;
    this._pos = new Vec2(x, y);


    var AB = this._pos.sub(this._tangent);


    //in ellipse
    var AB_inE = AB.rotate(-angle / 180 * Math.PI);
    //in circle
    var AB_inC = new Vec2(AB_inE.x / rx, AB_inE.y / ry);

    var AH_inC;
    var HO_length_inC;
    var AH_length_inC;
    var HO_inC;
    var BO_inC;
    var tangent_inC;
    var tangent_inE;

    AH_inC = AB_inC.div(2);
    AH_length_inC = AH_inC.abs();
    HO_length_inC = Math.sqrt(1 - AH_length_inC * AH_length_inC);
    if (!sweep !== !large) {
        HO_inC = AB_inC.rotate90().normalized().mult(HO_length_inC);
        BO_inC = AH_inC.inv().add(HO_inC);
        tangent_inC = BO_inC.rotate90().inv();
    }
    else {
        HO_inC = AB_inC.rotate90().inv().normalized().mult(HO_length_inC);//ok
        BO_inC = AH_inC.inv().add(HO_inC);
        tangent_inC = BO_inC.rotate90();
    }
    if (large) tangent_inC = tangent_inC.inv();

    tangent_inE = new Vec2(tangent_inC.x * rx, tangent_inC.y * ry);
    this._tangent = tangent_inE.rotate(angle / 180 * Math.PI);

    this._commands.push({
        cmd: 'A',
        action: 'lineTo',
        args: [rx, ry, angle, large, sweep, x, y],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/***
 *
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} angle
 * @param {Number} large
 * @param {Number} sweep
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.arcBy = function (rx, ry, angle, large, sweep, dx, dy) {
    //todo: wrong_tangent
    this._tangent = new Vec2(dx, dy);
    this._pos = this._pos.add(this._tangent);
    this._commands.push({
        cmd: 'a',
        action: 'arcBy',
        args: [rx, ry, angle, large, sweep, dx, dy],
        dest: this._pos,
        tangent: this._tangent
    });
    return this;
};


/**
 * @returns {this}
 */
Turtle.prototype.closePath = function () {
    this._tangent = this._pos;
    this._pos = this._startPos;
    this._tangent = this._pos.sub(this._tangent);
    this._commands.push({
        cmd: 'z',
        action: 'closePath',
        args: [],
        dest: this._pos
    });
    return this;
};


/**
 * @param {Number} dx
 * @param {Number} dy
 * @returns {this}
 */
Turtle.prototype.translate = function (dx, dy) {
    var command;
    var deltaVec = new Vec2(dx, dy);
    for (var i = 0; i < this._commands.length; ++i) {
        command = this._commands[i];
        command.dest = command.dest.add(deltaVec);
        switch (command.cmd) {
            case 'M':
            case 'L':
                command.args[0] = command.dest.x;
                command.args[1] = command.dest.y;
                break;
            case 'H':
                command.args[0] = command.dest.x;
                break;
            case 'V':
                command.args[0] = command.dest.y;
                break;
            case 'C':
                command.args[0] += dx;
                command.args[1] += dy;
                command.args[2] += dx;
                command.args[3] += dy;
                command.args[4] = command.dest.x;
                command.args[5] = command.dest.y;
                break;
            case 'Q':
                command.args[0] += dx;
                command.args[1] += dy;
                command.args[3] = command.dest.x;
                command.args[4] = command.dest.y;
                break;

            case 'A':
                command.args[5] = command.dest.x;
                command.args[6] = command.dest.y;
                break;
        }

    }
    return this;
};


/**
 * @returns {String}
 */
Turtle.prototype.getPath = function () {

    return this._commands.map(function (command) {
        return command.cmd + ' ' + command.args.join(',');
    }).join(' ');
};


/***
 *
 * @returns {this}
 */
Turtle.prototype.reset = function () {
    this._commands = [];
    this._pos = new Vec2(0, 0);
    this._startPos = this._pos;
    this._tangent = new Vec2(0, 0);
    return this;
};

/**
 *
 * @returns {Turtle|this}
 */
Turtle.prototype.clone = function () {
    var Constructor = this.constructor;
    var res = new Constructor();
    res._commands.push.apply(res._commands, this._commands);
    res._pos = this._pos.copy();
    res._startPos = this._startPos.copy();
    res._tangent = this._tangent.copy()
    return res;
};

export default Turtle;