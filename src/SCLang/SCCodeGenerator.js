import SCGrammar from "./SCGrammar";
import OOP from "../HTML5/OOP";

/***
 *
 * @constructor
 */
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
        return `function ${node.id.name}(${argsCode}) ${bodyCode}`;
    },
    ArgumentDeclaration: function (node) {
        var res = node.id.name;
        var typeText;
        if (node.typeAnnotation) typeText = this.accept(node.typeAnnotation);
        if (typeText && typeText !== 'any') res += ': ' + typeText;
        return res;
    },
    TypeAnnotation: function (node) {
        return this.accept(node.typeAnnotation);
    },
    GenericType: function (node) {
        var typeText = this.accept(node.id);
        if (node.typeParameters && node.typeParameters.length > 0) {
            typeText += '<';
            typeText += node.typeParameters.map(it => this.accept(it)).join(', ');
            typeText += '>';
        }
        return typeText;
    },
    LinkedType: function (node) {
        return 'linktype ' + this.accept(node.address);
    },
    Identifier: function (node) {
        return node.name;
    },
    VariableDeclaration: function (node) {
        var res = 'var ' + node.id.name;
        var typeText;
        if (node.typeAnnotation) typeText = this.accept(node.typeAnnotation);
        if (typeText && typeText !== 'any') res += ': ' + typeText;
        if (node.init) res += ' = ' + this.accept(node.init);
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
    NullLiteral: function (node) {
        return "null";
    },
    NewExpression: function (node) {
        var res = 'new ';
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
    CallExpression: function (node) {
        var res = '';
        if (node.callee && (node.callee.type === 'Identifier' || node.callee.type === 'MemberExpression')) {
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
    ForOfStatement: function (node) {
        var res = ['for', this.accept(node.for), 'of', this.accept(node.of)].join(' ') + ' ';
        res += this.accept(node.body)
        return res;
    },
    ForInStatement: function (node) {
        var res = ['for', this.accept(node.for), 'in', this.accept(node.in)].join(' ') + ' ';
        res += this.accept(node.body);
        return res;
    },
    BreakStatement: function () {
        return 'break;';
    },
    ReturnStatement: function (node) {
        if (node.argument)
            return 'return ' + this.accept(node.argument) + ';';
        return 'return;';
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
        var elementTexts = node.elements.map(arg => this.accept(arg));
        var needWrap = elementTexts.some(et => {
            return et.length > 60;
        });
        if (needWrap) {
            res += '\n';
            res += elementTexts.join(',\n').split('\n').map(t => '    ' + t).join('\n');
            res += '\n';
        }
        else {
            res += elementTexts.join(', ');
        }
        res += ']';
        return res;
    },
    ObjectProperty: function (node) {
        return this.accept(node.key) + ': ' + this.accept(node.value);
    },
    ObjectExpression: function (node) {
        var res = '{';
        var propertyTexts = node.properties.map(arg => this.accept(arg));
        var needWrap = propertyTexts.some(et => {
            return et.length > 60;
        });
        if (needWrap) {
            res += '\n';
            res += propertyTexts.join(',\n').split('\n').map(t => '    ' + t).join('\n');
            res += '\n';
        }
        else {
            res += propertyTexts.join(', ');
        }
        res += '}';
        return res;
    }
};


export default SCCodeGenerator;

/***
 * @extends SCCodeGenerator
 * @constructor
 */
export function SCCodeHighlightingGenerator() {
    SCCodeGenerator.apply(this, arguments);
}

OOP.mixClass(SCCodeHighlightingGenerator, SCCodeGenerator);

SCCodeHighlightingGenerator.prototype.accept = function (node) {
    if (!node) return '/*TODO*/';
    var visitor = this.visitors[node.type];
    if (visitor) {
        try {
            return `<div class="sclang-node sclang-${node.type}${node.error ? ' sclang-error' : ''}"${node.error ? ('title=' + JSON.stringify(node.error)) : ''}>${this.visitors[node.type].apply(this, arguments)}</div>`;
        } catch (e) {
            console.error(e, node)
        }
    }
    else {
        return '[' + node.type + ']';
        // throw { message: 'Can not handle ', node: node };
    }
};

SCCodeHighlightingGenerator.prototype.visitors = Object.assign({}, SCCodeGenerator.prototype.visitors, {
    IfStatement: function (node) {
        var res = '<span class="sclang-keyword">if</span> (';
        res += this.accept(node.test);
        res += ') ';
        res += this.accept(node.consequent);
        if (node.alternate) {
            res += '\n<span class="sclang-keyword">else</span> ';
            res += this.accept(node.alternate);
        }
        return res;
    },
    FunctionDeclaration: function (node) {
        var bodyCode = this.accept(node.body);
        var argsCode = node.params.map(arg => this.accept(arg)).join(', ');
        return `<span class="sclang-keyword">function</span> ${node.id.name}(${argsCode}) ${bodyCode}`;
    },
    ForCountStatement: function (node) {
        var res = ['<span class="sclang-keyword">for</span>', this.accept(node.for), '<span class="sclang-keyword">from</span>', this.accept(node.from), '<span class="sclang-keyword">to</span>', this.accept(node.to)].join(' ') + ' ';
        res += this.accept(node.body)
        return res;
    },
    ForOfStatement: function (node) {
        var res = ['<span class="sclang-keyword">for</span>', this.accept(node.for), '<span class="sclang-keyword">of</span>', this.accept(node.of)].join(' ') + ' ';
        res += this.accept(node.body)
        return res;
    },
    ForInStatement: function (node) {
        var res = ['<span class="sclang-keyword">for</span>', this.accept(node.for), '<span class="sclang-keyword">in</span>', this.accept(node.in)].join(' ') + ' ';
        res += this.accept(node.body)
        return res;
    },
    VariableDeclaration: function (node) {
        var res = '<span class="sclang-keyword">var</span> ' + node.id.name;
        var typeText;
        if (node.typeAnnotation) typeText = this.accept(node.typeAnnotation);
        if (typeText && typeText !== 'any') res += ': ' + typeText;
        if (node.init) res += ' = ' + this.accept(node.init);
        res += ';';
        return res;
    },
    LinkedType: function (node) {
        return '<span class="sclang-keyword">linktype</span>&nbsp;' + this.accept(node.address);
    },
});


SCCodeHighlightingGenerator.prototype.generate = function (ast) {
    var text = this.accept(ast);
    return text.split('\n').map(text => {
        return text.replace(/^\s+/, (full) => {
            return `<span>${'&nbsp;'.repeat(full.length)}</span>`
        });
    }).join('<br>');
};


export function generateSCCode(ast) {
    var generator = new SCCodeGenerator();
    return generator.generate(ast);
}


export function generateSCHighlightPreviewCode(ast) {
    var generator = new SCCodeHighlightingGenerator();
    return generator.generate(ast);
}