var operatorOrder = {
    '*': 5,
    '/': 5,
    '%': 5,
    '+': 6,
    '-': 6
};

function getOperatorContent(operator) {
    return operator && (operator.content || operator.value || operator.name) || '';
}

function CSSCodeGenerator() {

}

CSSCodeGenerator.prototype.accept = function (node) {
    if (!node) return '/*TODO*/';
    var visitor = this.visitors[node.type];
    if (visitor) {
        try {
            return visitor.apply(this, arguments);
        } catch (e) {
            console.error(e, node);
        }
    }
    return '[' + node.type + ']';
};

CSSCodeGenerator.prototype.generate = function (ast) {
    return this.accept(ast);
};



CSSCodeGenerator.prototype.visitors = {
    DeclarationList: function (node) {
        return (node.children || []).map(it => this.accept(it)).join(' ');
    },
    Identifier: function (node) {
        return node.name;
    },
    VariableName: function (node) {
        return node.name;
    },
    MeasureLiteral: function (node) {
        return String(node.value) + (node.unit || '');
    },
    NumericLiteral: function (node) {
        if (typeof node.value === 'number') return String(node.value);
        return '0';
    },
    ColorLiteral: function (node) {
        return node.value;
    },
    KeywordLiteral: function (node) {
        return node.value;
    },
    BinaryOperator: function (node) {
        return getOperatorContent(node);
    },
    CallExpression: function (node) {
        var calleeText = this.accept(node.callee);
        var argsText = (node.arguments || []).map(arg => this.accept(arg)).join(', ');
        return calleeText + '(' + argsText + ')';
    },
    BinaryExpression: function (node) {
        var op = getOperatorContent(node.operator);
        var currentOrder = operatorOrder[op] || 100;
        var leftText = this.accept(node.left);
        var rightText = this.accept(node.right);

        if (node.left && node.left.type === 'BinaryExpression') {
            var leftOrder = operatorOrder[getOperatorContent(node.left.operator)] || 100;
            if (leftOrder > currentOrder) leftText = '(' + leftText + ')';
        }

        if (node.right && node.right.type === 'BinaryExpression') {
            var rightOrder = operatorOrder[getOperatorContent(node.right.operator)] || 100;
            if (rightOrder >= currentOrder) rightText = '(' + rightText + ')';
        }

        return leftText + ' ' + op + ' ' + rightText;
    }
};

export default CSSCodeGenerator;

export function generateCSSCode(ast) {
    var generator = new CSSCodeGenerator();
    return generator.generate(ast);
}