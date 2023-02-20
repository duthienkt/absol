export function OperatorExecutor() {
    this.oFXYs = {};
    this.oFXs = {};
}

/***
 *
 * @param {string} operator
 * @param {function(x, y, next: function):void} fxy
 */
OperatorExecutor.prototype.addBinaryOperator = function (operator, fxy) {
    if (!this.oFXYs[operator]) this.oFXYs[operator] = [];
    this.oFXYs[operator].unshift(fxy);
};


/***
 *
 * @param {string} operator
 * @param {function(x,  next: function):void} fx
 */
OperatorExecutor.prototype.addUnaryOperator = function (operator, fx) {
    if (!this.oFXs[operator]) this.oFXs[operator] = [];
    this.oFXs[operator].unshift(fx);
};

OperatorExecutor.prototype.executeBinaryOperator = function (operator, x, y) {
    var fXYs = this.oFXYs[operator];
    var i, next;
    if (fXYs) {
        i = -1;
        next = () => {
            ++i;
            if (i >= fXYs.length) throw  {
                message: 'Could not match any function for operator' + operator,
                x: x,
                y: y
            };
            return fXYs[i](x, y, next);
        };
        return next();
    }
    else {
        throw { message: 'Could not find operate: ' + operator };
    }
};


OperatorExecutor.prototype.executeUnaryOperator = function (operator, x) {
    var fXs = this.oFXs[operator];
    var i, next;
    if (fXs) {
        i = -1;
        next = () => {
            ++i;
            if (i >= fXs.length) throw  {
                message: 'Could not match any function for operator' + operator,
                x: x
            };
            return fXs[i](x, next);
        };
        return next();
    }
    else {
        throw { message: 'Could not find operate: ' + operator };
    }
};

/***
 * @type {OperatorExecutor}
 */
export default new OperatorExecutor();