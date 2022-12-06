import { ADD, DIV, MUL, NEGATIVE, POSITIVE, SUB } from "./SCBinaryOperators";
import SCParser from "./SCParser";
import * as ExcelFx from 'absol-sheet/js/fx/ExcelFx';


/***
 *
 * @param {{}} ast
 * @param {{}}env
 * @constructor
 */
function SCExpressionCaller(ast, env) {
    this.ast = ast;
    this.env = Object.assign({}, env, ExcelFx);
    if (env instanceof Array) {
        env.reduce(function (ac, subEnv) {
            Object.assign(ac, subEnv);
            return ac;
        })
    }
    else {
        Object.assign(this.env, env);
    }
}

SCExpressionCaller.prototype.exec = function () {
    return this.accept(this.ast);
};

SCExpressionCaller.prototype.accept = function (node) {
    var vf = this.visitor[node.type];
    if (vf) {
        return vf(node, this);
    }
    else {
        console.error("Node error:", node);
    }

};


SCExpressionCaller.prototype.visitor = {
    NumericLiteral: function (node, caller) {
        return (node.value);
    },
    StringLiteral: function (node, caller) {
        return node.value;
    },
    BinaryExpression: function (node, caller) {
        var leftValue = caller.accept(node.left);
        var rightValue = caller.accept(node.right);
        var fun = caller.binaryOperator2Function[node.operator.content];
        return fun(leftValue, rightValue);
    },
    UnaryExpression: function (node, caller) {
        var fun = caller.unaryOperator2Function[node.operator.content];
        var arg = caller.accept(node.argument);
        return fun(arg);
    },
    Identifier: function (node, caller) {
        return caller.env[node.name];
    },
    CallExpression: function (node, caller) {
        var calleeFunction = caller.accept(node.callee);
        var argumentValues = node.arguments.map(function (exp) {
            return caller.accept(exp);
        });
        return calleeFunction.apply(null, argumentValues);
    },
    MemberExpression: function (node, caller) {
        var object = caller.accept(node.object);
        var key = node.property.name;
        var res = object[key];
        if (typeof res === "function") return res.bind(object);
        return res;
    },

};

SCExpressionCaller.prototype.binaryOperator2Function = {
    '+': ADD,
    '-': SUB,
    '*': MUL,
    '/': DIV
};

SCExpressionCaller.prototype.unaryOperator2Function = {
    '+': POSITIVE,
    '-': NEGATIVE
};

export function evalSCExpression(code, env) {
    var parsed = SCParser.parse(code, 'exp');
    var caller;
    if (parsed.ast) {
        caller = new SCExpressionCaller(parsed.ast, env);
        return caller.exec();
    }
    else {
        throw parsed.error;
    }
}

export default SCExpressionCaller;