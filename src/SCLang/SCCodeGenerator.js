import SCParser from "./SCParser";
import SCGrammar from "./SCGrammar";

function SCCodeGenerator() {

}


SCCodeGenerator.prototype.accept = function (node) {
    if (!node) return '/*TODO*/';
    var visitor = this.visitors[node.type];
    if (visitor) {
        try {
            return this.visitors[node.type].apply(this, arguments);
        } catch (e) {
            console.error(e, node)
        }
    }
    else {
        return '[' + node.type + ']';
        // throw { message: 'Can not handle ', node: node };
    }
};

SCCodeGenerator.prototype.generate = function (ast) {
    return this.accept(ast);
};


/***
 *
 * @type {Object<string, function>}
 */
SCCodeGenerator.prototype.visitors = {
    Program: function (node) {
        return node.body.map(st => this.accept(st)).join('\n');
    },
    FunctionDeclaration: function (node) {
        var bodyCode = this.accept(node.body);
        var argsCode = node.params.map(arg => this.accept(arg)).join(', ');
        return `function ${node.id.name}(${argsCode})${bodyCode}`;
    },
    ArgumentDeclaration: function (node) {
        var res = node.id.name;
        if (node.typeAnnotation) res += ': ' + this.accept(node.typeAnnotation);
        return res;
    },
    TypeAnnotation: function (node) {
        return this.accept(node.typeAnnotation);
    },
    GenericType: function (node) {
        return this.accept(node.id);
    },
    LinkedType: function (node) {
        return 'linktype '+ this.accept(node.address);
    },
    Identifier: function (node) {
        return node.name;
    },
    VariableDeclaration: function (node) {
        var res = 'var ' + node.id.name;
        if (node.typeAnnotation) res += ': ' + this.accept(node.typeAnnotation);
        res += ';';
        return res;
    },
    BlockStatement: function (node) {
        var bodyCode = node.body.map(it => this.accept(it)).join('\n');
        if (bodyCode.length > 0) {
            bodyCode = bodyCode.split('\n').map(r => '    ' + r).join('\n');
        }
        return ['{', bodyCode, '}'].join('\n');
    },
    AssignStatement: function (node) {
        return this.accept(node.left) + ' = ' + this.accept(node.right) + ';';
    },
    BooleanLiteral: function (node) {
        return node.value ? 'true' : 'false';
    },
    CallExpression: function (node) {
        var res = '';
        if (node.callee.type === 'Identifier' || node.callee.type === 'MemberExpression') {
            res += this.accept(node.callee);
        }
        else {
            res += '(' + this.accept(node.callee) + ')';
        }

        res += '(';
        res += node.arguments.map(arg => this.accept(arg)).join(', ');
        res += ')';
        return res;
    },
    MemberExpression: function (node) {
        var res = '';
        if (node.object.type === 'Identifier' || node.object.type === 'MemberExpression') {
            res += this.accept(node.object);
        }
        else {
            res += '(' + this.accept(node.object) + ')';
        }
        if (node.computed) {
            res += '[';
            res += this.accept(node.property);
            res += ']';
        }
        else {
            res += '.';
            res += this.accept(node.property);
        }
        return res;
    },
    IfStatement: function (node) {
        var res = 'if (';
        res += this.accept(node.test);
        res += ') ';
        res += this.accept(node.consequent);
        if (node.alternate) {
            res += '\nelse ';
            res += this.accept(node.alternate);
        }
        return res;
    },

    WhileStatement: function (node) {
        var res = 'while (';
        res += this.accept(node.test);
        res += ') ';
        res += this.accept(node.body);
        return res;
    },
    ForCountStatement: function (node) {
        var res = ['for', this.accept(node.for), 'from', this.accept(node.from), 'to', this.accept(node.to)].join(' ') + ' ';
        res += this.accept(node.body)
        return res;
    },
    BreakStatement: function () {
        return 'break;';
    },
    ReturnStatement: function (node) {
        return 'return ' + this.accept(node.argument) + ';';
    },
    BinaryExpression: function (node) {
        var callOrderOf = snode => {
            if (!snode) return 100;
            if (snode.type === 'BinaryExpression') {
                return Math.max(SCGrammar.operatorOrder[snode.operator.content], callOrderOf(snode.right), callOrderOf(snode.right));
            }
            else if (snode.type === 'UnaryExpression') return -1;
            else return -2;
        };
        var operatorContent = node.operator.content;
        var cOrder = SCGrammar.operatorOrder[operatorContent];
        var left = this.accept(node.left);
        var right = this.accept(node.right);
        var leftOrder = callOrderOf(node.left);
        var rightOrder = callOrderOf(node.right);
        if (leftOrder > cOrder) left = '(' + left + ')';
        if (rightOrder >= cOrder) right = '(' + right + ')';
        return [left, operatorContent, right].join(' ');
    },
    UnaryExpression: function (node) {
        var res = node.operator.content;
        if (node.argument && node.argument.type === 'BinaryExpression') {
            res += '(' + this.accept(node.argument) + ')';
        }
        else {
            res += this.accept(node.argument);
        }
        return res;
    },
    ExpressionStatement: function (node) {
        return this.accept(node.expression) + ';';
    },
    NumericLiteral: function (node) {
        return node.value;
    },
    StringLiteral: function (node) {
        return JSON.stringify(node.value);
    },
    ArrayExpression: function (node) {
        var res = '[';
        res += node.elements.map(arg => this.accept(arg)).join(', ');
        res += ']';
        return res;
    }
};


export default SCCodeGenerator();


export function generateSCCode(ast) {
    var generator = new SCCodeGenerator();
    return generator.generate(ast);
}