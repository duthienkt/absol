import DPParser from "../Pharse/DPParser";
import { parsedNodeToAST, parsedNodeToASTChain } from "../Pharse/DPParseInstance";
import { arrayLexicographicalCompare } from "../DataStructure/Array";


/***** css expression rules****/

// var exp = `calc(var(--abcd) + 15px + 15%)`;


var elementRegexes = [
    ['varname', /--[a-z-]+/],
    ['word', /[_a-zA-Z][_a-zA-Z0-9]*/],
    ['msnumber', /(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)(vh|vw|px|%|pt)/],
    ['number', /(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)/],
    ['symbol', /[^\s_a-zA-Z0-9]/],
    ['string', /("(?:[^"\\]|\\.)*?")|('(?:[^'\\]|\\.)*?')/]
];


var rules = [];


rules.push({
    target: 'measure_num',
    elements: ['.msnumber'],
    toAST: function (pN) {
        pN = pN.children[0];
        return {
            type: "MeasureLiteral",
            value: parseFloat(pN.content.replace(/vh|vw|px|%|pt/, '')),
            unit: pN.content.match(/px|%|pt|vw|vh/)[0]
        }
    }
});

rules.push({
    target: 'number',
    elements: ['.number'],
    toAST: function (pN) {
        pN = pN.children[0];
        return {
            type: "NumericLiteral",
            value: parseFloat(pN.content),
        }
    }
});


rules.push({
    target: 'exp',
    elements: ['measure_num'],
    toAST: function (pN) {
        return parsedNodeToAST(pN.children[0]);
    }
});

rules.push({
    target: 'bracket_group',
    elements: ['_(', 'exp', '_)'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[1]);
    }
});

rules.push({
    target: 'exp',
    elements: ['bracket_group'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'variable_name',
    elements: ['.varname'],
    toAST: function (parsedNode) {
        return {
            type: 'VariableName',
            name: parsedNode.children[0].content
        }
    }
});

rules.push({
    target: 'exp',
    elements: ['variable_name'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


['+', '-', '*', '/'].forEach(function (op) {
    rules.push({
        target: 'bin_op',
        elements: ['_' + op],
        toAST: function (parsedNode) {
            return {
                type: "BinaryOperator",
                content: op
            }
        }
    });
});


var operatorOrder = {
    '*': 5,
    '/': 5,
    '%': 5,
    '+': 6,
    '-': 6
}

var operatorTokenToAst = token => ({ type: token.type, content: token.content });

rules.push({
    target: 'exp',
    elements: ['exp', 'bin_op', 'exp'],
    // longestOnly: true,//* error when parse return (...)...
    ident: 'bin_op_rec',
    toASTChain: function (parseNode) {
        var res = [];
        if (parseNode.children[0].rule === this) {
            res = res.concat(this.toASTChain(parseNode.children[0]));
        }
        else {
            res.push(parsedNodeToAST(parseNode.children[0]));
        }

        res.push(parseNode.children[1].children[0]);

        if (parseNode.children[2].rule === this) {
            res = res.concat(this.toASTChain(parseNode.children[2]));
        }
        else {
            res.push(parsedNodeToAST(parseNode.children[2]));
        }
        return res;
    },
    toAST: function (parsedNode) {
        var chain = this.toASTChain(parsedNode);
        var stack = [];
        var item;
        var newNode;
        while (chain.length > 0) {
            item = chain.shift();
            if (item.content in operatorOrder) {
                while (stack.length >= 3 && operatorOrder[stack[stack.length - 2].content] <= operatorOrder[item.content]) {
                    newNode = { type: 'BinaryExpression' };
                    newNode.right = stack.pop();
                    newNode.operator = operatorTokenToAst(stack.pop());
                    newNode.left = stack.pop();
                    stack.push(newNode);
                }
            }
            stack.push(item);
        }

        while (stack.length >= 3) {
            newNode = { type: 'BinaryExpression' };
            newNode.right = stack.pop();
            newNode.operator = operatorTokenToAst(stack.pop());
            newNode.left = stack.pop();
            stack.push(newNode);
        }

        return stack.pop();
    }
});


rules.push({
    target: 'args_list',
    elements: ['exp'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    },
    toASTChain: function (parsedNode) {
        return [parsedNodeToAST(parsedNode)];
    }
});

rules.push({
    target: 'ident',
    elements: ['.word'],
    toAST: function (parsedNode) {
        return {
            type: 'Identifier',
            name: parsedNode.children[0].content
        }
    }
});

rules.push({
    target: 'number',
    elements: ['.number'],
    toAST: function (parsedNode) {
        return {
            type: 'NumericLiteral',
            value: parseFloat(parsedNode.children[0].content)
        }
    }
});


rules.push({
    target: 'args_list',
    elements: ['args_list', '_,', 'exp'],
    longestOnly: true,
    ident: 'args_list_rec',
    toASTChain: function (parsedNode) {
        return parsedNodeToASTChain(parsedNode.children[0]).concat(parsedNodeToAST(parsedNode.children[2]));
    }
});


rules.push({
    target: 'function_callee',
    elements: ['ident'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'function_callee',
    elements: ['mem_exp'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
})

rules.push({
    target: 'function_call',
    elements: ['function_callee', '_(', 'args_list', '_)'],
    toAST: function (parsedNode) {
        return {
            type: 'CallExpression',
            arguments: parsedNode.children[2].rule.toASTChain(parsedNode.children[2]),
            callee: parsedNodeToAST(parsedNode.children[0])
        }
    }
});


rules.push({
    target: 'function_call',
    elements: ['function_callee', '_(', '_)'],
    toAST: function (parsedNode) {
        return {
            type: 'CallExpression',
            arguments: [],
            callee: parsedNodeToAST(parsedNode.children[0])
        };
    }
});

rules.push({
    target: 'exp',
    elements: ['function_call'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'exp',
    elements: ['number'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


var cssExpressionParser = new DPParser({
    elementRegexes: elementRegexes,
    rules: rules
});

var getScreenViewSize = () => {
    var div = document.createElement('div');
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.zIndex = '-10000';
    div.style.visibility = 'hidden';
    div.style.position = 'fixed';
    document.body.appendChild(div);
    var res = div.getBoundingClientRect();
    div.remove();
    return { width: res.width, height: res.height };
}

var fx = {
    calc: function (x) {
        return x;
    },
    'var': function (x, ctx) {
        if (!ctx.style) {
            if (ctx.elt) {
                ctx.style = getComputedStyle(ctx.elt);
            }
        }
        if (ctx.style) {
            if (ctx.style.getPropertyValue) {
                return ctx.style.getPropertyValue(x);
            }
            else {
                return ctx.style[x];
            }
        }
        throw new Error("Miss style:CSSStyleDeclaration in ctx");
    },
    '*': function (x, y, ctx) {
        if (x && x.unit) {
            if (y && y.unit) {
                throw Error(`Can not call ${x.value + x.unit} * ${y.value + y.unit}`);
            }
            else {
                return { value: x.value * y, unit: x.unit };
            }
        }
        else {
            if (y && y.unit) {
                return { value: x * y.value, unit: y.unit };
            }
            else return x * y;
        }
    },
    '/': function (x, y, ctx) {
        if (x && x.unit) {
            if (y && y.unit) {
                throw Error(`Can not call ${x.value + x.unit} / ${y.value + y.unit}`);
            }
            else {
                return { value: x.value / y, unit: x.unit };
            }
        }
        else {
            if (y && y.unit) {
                throw Error(`Can not call ${x} / ${y.value + y.unit}`);
            }
            else return x * y;
        }
    },
    '+': function add(x, y, ctx) {
        if (x && x.unit) {
            if (y && y.unit) {
                if (x.unit === y.unit) {
                    return { value: x.value + y.value, unit: x.unit };
                }
                else {
                    return fx['+'](fx.toPx(x, ctx), fx.toPx(y, ctx));
                }
            }
            else {
                throw Error(`Can not call ${x.value + x.unit} + ${y}`);
            }
        }
        else {
            if (y && y.unit) {
                throw Error(`Can not call ${x} +  ${y.value + y.unit}`);
            }
            else return x + y;
        }
    },
    '-': function add(x, y, ctx) {
        if (x && x.unit) {
            if (y && y.unit) {
                if (x.unit === y.unit) {
                    return { value: x.value - y.value, unit: x.unit };
                }
                else {
                    return fx['+'](fx.toPx(x, ctx), fx.toPx(y, ctx));
                }
            }
            else {
                throw Error(`Can not call ${x.value - x.unit} + ${y}`);
            }
        }
        else {
            if (y && y.unit) {
                throw Error(`Can not call ${x} -  ${y.value + y.unit}`);
            }
            else return x + y;
        }
    },
    toPx: (val, ctx) => {
        switch (val.unit) {
            case '%':
                if (typeof ctx.parentSize !== "number") throw new Error("Miss parentSize:number(px) in ctx");
                return { value: ctx.parentSize * val.value / 100, unit: 'px' };
            case 'vh':
                if (!ctx.screenSize) {
                    ctx.screenSize = getScreenViewSize();
                }
                return { value: ctx.screenSize.height * val.value / 100, unit: 'px' };
            case 'vw':
                if (!ctx.screenSize) {
                    ctx.screenSize = getScreenViewSize();
                }
                return { value: ctx.screenSize.width * val.value / 100, unit: 'px' };
            default:
                break;
        }
        return val;
    }
};

var visitors = {
    CallExpression: (astNode, ctx) => {
        var args = astNode.arguments.map(it => accept(it, ctx));
        args.push(ctx);
        return fx[astNode.callee.name].apply(null, args);
    },
    BinaryExpression: (astNode, ctx) => {
        var left = accept(astNode.left, ctx);
        var right = accept(astNode.right, ctx);
        var func = fx[astNode.operator.content];
        return func(left, right, ctx);
    },
    MeasureLiteral: (astNode, ctx) => {
        return { value: astNode.value, unit: astNode.unit }
    },
    NumericLiteral: (astNode, ctx) => {
        return astNode.value;
    },
    VariableName: (astNode, ctx) => {
        return astNode.name;
    }
};


var accept = (astNode, ctx) => {
    return visitors[astNode.type](astNode, ctx);
}

/**
 *
 * @param {string} exp
 * @param {{parentSize?: number, screenViewSize?:{width: number, height: number}, style?:CSSStyleDeclaration|Object, elt:AElement|any}} ctx
 * @param {boolean=} debug
 * @returns {*|null}
 */
export function computeMeasureExpression(exp, ctx, debug) {
    try {
        var p = cssExpressionParser.parse(exp, 'exp');
        if (p.ast) {
            return accept(p.ast, ctx);
        }
        return null;
    } catch (error) {
        return null;
    }
}


export function getQuerySelectorSpecificity(selector) {
    let inline = 0;
    let idCount = 0;
    let classCount = 0;
    let tagCount = 0;

    // Remove pseudo-elements
    selector = selector.replace(/::\w+/g, '');

    // Check for inline styles (not directly calculable from selector string)
    if (selector.includes('style="')) {
        inline = 1;
    }


    // Count ID selectors
    idCount = (selector.match(/#[\w-]+/g) || []).length;

    // Count class selectors, attributes selectors, and pseudo-classes
    classCount = (selector.match(/\.[\w-]+/g) || []).length +
        (selector.match(/\[[^\]]+\]/g) || []).length +
        (selector.match(/:(?!:)[\w-]+/g) || []).length;


    // Count element selectors and pseudo-elements
    tagCount = (selector.match(/^[\w-]+|\s[\w-]+/g) || []).length;

    return [inline, idCount, classCount, tagCount];
}


export function compareQuerySelectorSpecificity(selector1, selector2) {
    const specificity1 = getQuerySelectorSpecificity(selector1);
    const specificity2 = getQuerySelectorSpecificity(selector2);
    return arrayLexicographicalCompare(selector1, specificity2);
}