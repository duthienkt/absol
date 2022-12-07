import { parsedNodeToAST, parsedNodeToASTChain } from "../Pharse/DPParseInstance";



/*********************************
 * EXPRESSION
 */
var operatorOrder = {
    'NOT': 4,
    '!': 4,
    '*': 5,
    '/': 5,
    'MOD': 5,
    '%': 5,
    '+': 6,
    '-': 6,
    '<': 9,
    '>': 9,
    '<=': 9,
    '>=': 9,
    '==': 9,
    '!=': 9,
    'AND': 14,
    '&&': 14,
    'OR': 15,
    '||': 15,
    'XOR': 15,
}


var elementRegexes = [
    ['string', /("(?:[^"\\]|\\.)*?")|('(?:[^'\\]|\\.)*?')/],
    ['number', /(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)/],
    ['word', /[_a-zA-Z][_a-zA-Z0-9]*/],
    ['skip', /([\s\r\n]+)|(\/\/[^\n]*)|(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)/],
    ['dsymbol', /\+\+|--|==|!=|<=|>=/],
    ['tsymbol', /\.\.\./],
    ['symbol', /[^\s_a-zA-Z0-9]/],


];


var rules = [];


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
    target: 'args_list',
    elements: ['args_list', '_,', 'exp'],
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
    target:'new_expression',
    elements:['_new', 'function_call'],
    toAST: function (parsedNode) {
        var callAst = parsedNodeToAST(parsedNode.children[1])
        return {
            type: 'NewExpression',
            arguments: callAst.arguments,
            callee: callAst.callee
        }
    }
});


rules.push({
    target: 'exp',
    elements: ['new_expression'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'exp',
    elements: ['ident'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
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
    target: 'string',
    elements: ['.string'],
    toAST: function (parsedNode) {
        var content = parsedNode.children[0].content;
        if (content[0] === "'") content = '"' + content.substring(1, content.length - 1).replace(/["]/g, '\\"') + '"';
        return {
            type: 'StringLiteral',
            value: JSON.parse(content)
        }
    }
});


rules.push({
    target: 'boolean',
    elements: ['_true'],
    toAST: function (parsedNode) {
        return {
            type: 'BooleanLiteral',
            value: true
        };
    }
});


rules.push({
    target: 'boolean',
    elements: ['_false'],
    toAST: function (parsedNode) {
        return {
            type: 'BooleanLiteral',
            value: false
        };
    }
});

rules.push({
    target: 'exp',
    elements: ['number'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'exp',
    elements: ['string'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


rules.push({
    target: 'exp',
    elements: ['boolean'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

['+', '-', '*', '/', '%', '&&', '||', 'XOR', '==', '!=', '<', '>', '>=', '<='].forEach(function (op) {
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

rules.push({
    target: 'exp',
    elements: ['exp', 'bin_op', 'exp'],
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
                    newNode.operator = stack.pop();
                    newNode.left = stack.pop();
                    stack.push(newNode);
                }
            }
            stack.push(item);
        }

        while (stack.length >= 3) {
            newNode = { type: 'BinaryExpression' };
            newNode.right = stack.pop();
            newNode.operator = stack.pop();
            newNode.left = stack.pop();
            stack.push(newNode);
        }

        return stack.pop();
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
        return parsedNodeToAST(parsedNode.children[1]);
    }
});


rules.push({
    target: 'exp',
    elements: ['_(', 'exp', '_)'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[1]);
    }
});

['+', '-', '!'].forEach(function (op) {
    ['number', 'bracket_group', 'ident', 'function_call', 'mem_exp'].forEach(function (arg) {
        rules.push({
            target: 'exp',
            elements: ['_' + op, arg],
            toAST: function (parsedNode) {
                return {
                    type: 'UnaryExpression',
                    argument: parsedNodeToAST(parsedNode.children[1]),
                    operator: {
                        type: 'UnaryOperator',
                        content: op
                    }
                }
            }
        });
    });
});


rules.push({
    target: 'mem_exp',
    elements: ['ident', '_.', 'ident'],
    toAST: function (parsedNode) {
        return {
            type: "MemberExpression",
            computed: false,
            object: parsedNodeToAST(parsedNode.children[0]),
            property: parsedNodeToAST(parsedNode.children[2])
        }
    }
});

rules.push({
    target: 'mem_exp',
    elements: ['ident', '_[', 'exp', '_]'],
    toAST: function (parsedNode) {
        return {
            type: "MemberExpression",
            computed: true,
            object: parsedNodeToAST(parsedNode.children[0]),
            property: parsedNodeToAST(parsedNode.children[2])
        }
    }
});


rules.push({
    target: 'mem_exp',
    elements: ['mem_exp', '_.', 'ident'],
    toAST: function (parsedNode) {
        return {
            type: "MemberExpression",
            computed: false,
            object: parsedNodeToAST(parsedNode.children[0]),
            property: parsedNodeToAST(parsedNode.children[2])
        }
    }
});

rules.push({
    target: 'mem_exp',
    elements: ['mem_exp', '_[', 'exp', '_]'],
    toAST: function (parsedNode) {
        return {
            type: "MemberExpression",
            computed: true,
            object: parsedNodeToAST(parsedNode.children[0]),
            property: parsedNodeToAST(parsedNode.children[2])
        }
    }
});

rules.push({
    target: 'exp',
    elements: ['mem_exp'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


/**********************************************************************************************************************/


rules.push({
    target: 'object_exp',
    elements: ['_{', '_}'],
    toAST: function (parsedNode) {
        return {
            type: 'ObjectExpression',
            properties: []
        }
    }
});

rules.push({
    target: 'object_exp',
    elements: ['_{', 'object_property_list', '_}'],
    toAST: function (parsedNode) {
        return {
            type: 'ObjectExpression',
            properties: parsedNodeToASTChain(parsedNode.children[1])
        }
    }
});


rules.push({
    target: 'exp',
    elements: ['object_exp'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'object_property',
    elements: ['ident', '_:', 'exp'],
    toAST: function (parsedNode) {
        return {
            type: 'ObjectProperty',
            key: parsedNodeToAST(parsedNode.children[0]),
            value: parsedNodeToAST(parsedNode.children[2])
        };
    }
});

rules.push({
    target: 'object_property',
    elements: ['string', '_:', 'exp'],
    toAST: function (parsedNode) {
        return {
            type: 'ObjectProperty',
            key: parsedNodeToAST(parsedNode.children[0]),
            value: parsedNodeToAST(parsedNode.children[2])
        };
    }
});


rules.push({
    target: 'object_property_list',
    elements: ['object_property'],
    toASTChain: function (parsedNode) {
        return [parsedNodeToAST(parsedNode.children[0])];
    }
});

rules.push({
    target: 'object_property_list',
    elements: ['object_property_list', '_,', 'object_property'],
    toASTChain: function (parsedNode) {
        return parsedNodeToASTChain(parsedNode.children[0]).concat([parsedNodeToAST(parsedNode.children[2])]);
    }
});


/**********************************************************************************************************************/


rules.push({
    target: 'exp',
    elements: ['array_exp'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'array_exp',
    elements: ['_[', '_]'],
    toAST: function (parsedNode) {
        return {
            type: "ArrayExpression",
            elements: []
        };
    }
});

rules.push({
    target: 'array_exp',
    elements: ['_[', 'array_item_list', '_]'],
    toAST: function (parsedNode) {
        return {
            type: "ArrayExpression",
            elements: parsedNodeToASTChain(parsedNode.children[1])
        };
    }
});

rules.push({
    target: 'array_item_list',
    elements: ['exp'],
    toASTChain: function (parsedNode) {
        return [parsedNodeToAST(parsedNode.children[0])];
    }
});

rules.push({
    target: 'array_item_list',
    elements: ['array_item_list', '_,', 'exp'],
    toASTChain: function (parsedNode) {
        return parsedNodeToASTChain(parsedNode.children[0]).concat([parsedNodeToAST(parsedNode.children[2])]);
    }
});


/**********************************************************************************************************************/
/**************FOR QUICK PARSING***********************/

rules.push({
    target: 'exp',
    elements: ['.constance'],
    toAST: function (parsedNode) {
        return parsedNode.children[0]
    },
    toASTChain: function (parsedNode) {
        return [parsedNode.children[0]];
    }
});


/***********************************************************************************************************************/

rules.push({
    target: 'var_type',
    elements: ['ident'],
    toAST: function (parsedNode) {
        return {
            type: 'GenericType',
            id: parsedNodeToAST(parsedNode.children[0])
        }
    }
});

rules.push({
    target: 'var_type',
    elements: ['ident', '<', 'var_type', '>']
});

rules.push({
    target: 'var_type',
    elements: ['ident', '<', '.string', '>']
});

rules.push({
    target: 'type_annotation',
    elements: ['_:', 'var_type'],
    toAST: function (parsedNode) {
        return {
            type: 'TypeAnnotation',
            typeAnnotation: parsedNodeToAST(parsedNode.children[1])
        }
    }
});


/**********************************************************************************************************************/

rules.push({
    target: 'variable_declaration',
    elements: ['_var', 'ident', 'type_annotation', '_;'],
    toAST: function (parsedNode) {
        return {
            type: 'VariableDeclaration',
            id: parsedNodeToAST(parsedNode.children[1]),
            typeAnnotation: parsedNodeToAST(parsedNode.children[2])
        }
    }
});

rules.push({
    target: 'variable_declaration',
    elements: ['_var', 'ident', '_;'],
    toAST: function (parsedNode) {
        return {
            type: 'VariableDeclaration',
            id: parsedNodeToAST(parsedNode.children[1]),
        }
    }
});

rules.push({
    target: 'variable_declaration',
    elements: ['_var', 'ident', '_=', 'exp', '_;'],
    toAST: function (parsedNode) {
        return {
            type: 'VariableDeclaration',
            id: parsedNodeToAST(parsedNode.children[1]),
            init: parsedNodeToAST(parsedNode.children[3])
        }
    }
});


/**********************************************************************************************************************/
//todo
rules.push({
    target: 'expression_statement',
    elements: ['function_call', '_;'],
    toAST: function (parsedNode) {
        return {
            type: 'ExpressionStatement',
            expression: parsedNodeToAST(parsedNode.children[0])
        }
    }
});

/**********************************************************************************************************************/

rules.push({
    target: 'assign_statement',
    elements: ['ident', '_=', 'exp', '_;'],
    toAST: function (parseNode) {
        return {
            type: 'AssignStatement',
            left: parsedNodeToAST(parseNode.children[0]),
            right: parsedNodeToAST(parseNode.children[2])
        }
    }
});


rules.push({
    target: 'assign_statement',
    elements: ['mem_exp', '_=', 'exp', '_;'],
    toAST: function (parseNode) {
        return {
            type: 'AssignStatement',
            left: parsedNodeToAST(parseNode.children[0]),
            right: parsedNodeToAST(parseNode.children[2])
        }
    }
});


/**********************************************************************************************************************/
rules.push({
    target: 'if_statement_1',
    elements: ['_if', '_(', 'exp', '_)', 'statement'],
    toAST: function (parsedNode) {
        return {
            type: 'IfStatement',
            test: parsedNodeToAST(parsedNode.children[2]),
            consequent: parsedNodeToAST(parsedNode.children[4])
        }
    }
});

rules.push({
    target: 'if_statement_2',
    elements: ['if_statement_1', '_else', 'statement'],
    toAST: function (parsedNode) {
        var ast = parsedNodeToAST(parsedNode.children[0]);
        ast.alternate = parsedNodeToAST(parsedNode.children[2]);
        return ast;
    }
});


rules.push({
    target: 'statement',
    elements: ['if_statement_1'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'statement',
    elements: ['if_statement_2'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


/**********************************************************************************************************************/

rules.push({
    target: 'for_count_statement',
    elements: ['_for', 'ident', '_from', 'exp', '_to', 'exp', 'block_statement'],
    toAST: function (parsedNode) {
        return {
            type: 'ForCountStatement',
            for: parsedNodeToAST(parsedNode.children[1]),
            from: parsedNodeToAST(parsedNode.children[3]),
            to: parsedNodeToAST(parsedNode.children[5]),
            body: parsedNodeToAST(parsedNode.children[6])
        };
    }
});

rules.push({
    target: 'iterable_range',
    elements: ['iterable_range_limit', '_...', 'iterable_range_limit']
});

rules.push({
    target: 'iterable_range_limit',
    elements: ['.number']
});


rules.push({
    target: 'iterable_range_limit',
    elements: ['ident']
});


/**********************************************************************************************************************/

rules.push({
    target: 'while_statement',
    elements: ['_while', 'bracket_group', 'statement'],
    toAST: function (parsedNode) {
        return {
            type: 'WhileStatement',
            test: parsedNodeToAST(parsedNode.children[1]),
            body: parsedNodeToAST(parsedNode.children[2])
        };
    }
});

rules.push({
    target: 'statement',
    elements: ['while_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

/**********************************************************************************************************************/

rules.push({
    target: 'do_while_statement',
    elements: ['_do', 'statement', '_while', 'bracket_group', '_;'],
    toAST: function (parsedNode) {
        return {
            type: 'DoWhileStatement',
            test: parsedNodeToAST(parsedNode.children[3]),
            body: parsedNodeToAST(parsedNode.children[1])
        };
    }
});

rules.push({
    target: 'statement',
    elements: ['do_while_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

/**********************************************************************************************************************/

rules.push({
    target: 'break_statement',
    elements: ['_break', '_;'],
    toAST: function (parsedNode) {
        return {
            type: 'BreakStatement'
        };
    }
});

rules.push({
    target: 'statement',
    elements: ['break_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

/**********************************************************************************************************************/


rules.push({
    target: 'block_statement',
    elements: ['_{', '_}'],
    toAST: function (parsedNode) {
        return {
            type: 'BlockStatement',
            body: []
        }
    }
});


rules.push({
    target: 'block_statement',
    elements: ['_{', 'statement_arr', '_}'],
    toAST: function (parsedNode) {
        return {
            type: 'BlockStatement',
            body: parsedNodeToASTChain(parsedNode.children[1])
        };
    }
});


rules.push({
    target: 'statement',
    elements: ['variable_declaration'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


rules.push({
    target: 'statement',
    elements: ['block_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


rules.push({
    target: 'statement',
    elements: ['expression_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'statement',
    elements: ['for_count_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});

rules.push({
    target: 'statement',
    elements: ['assign_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


rules.push({
    target: 'statement_arr',
    elements: ['statement'],
    toASTChain: function (parsedNode) {
        return [parsedNodeToAST(parsedNode.children[0])];
    }
});


rules.push({
    target: 'statement_arr',
    elements: ['statement_arr', 'statement'],
    toASTChain: function (parsedNode) {
        return parsedNodeToASTChain(parsedNode.children[0]).concat([parsedNodeToAST(parsedNode.children[1])]);
    }
});


/**********************************************************************************************************************/

rules.push({
    target: 'function_arguments_declaration',
    elements: ['_(', '_)'],
    toASTChain: function (parsedNode) {
        return [];
    }
});

rules.push({
    target: 'function_arguments_declaration',
    elements: ['_(', 'argument_declaration_list', '_)'],
    toASTChain: function (parsedNode) {
        return parsedNodeToASTChain(parsedNode.children[1]);
    }
});

rules.push({
    target: 'argument_declaration',
    elements: ['ident', 'type_annotation'],
    toAST: function (parsedNode) {
        return {
            type: "ArgumentDeclaration",
            id: parsedNodeToAST(parsedNode.children[0]),
            typeAnnotation: parsedNodeToAST(parsedNode.children[1])
        }
    }
});

rules.push({
    target: 'argument_declaration',
    elements: ['ident'],
    toAST: function (parsedNode) {
        return {
            type: "ArgumentDeclaration",
            id: parsedNodeToAST(parsedNode.children[0])
        }
    }
});


rules.push({
    target: 'argument_declaration_list',
    elements: ['argument_declaration'],
    toASTChain: function (parsedNode) {
        return [parsedNodeToAST(parsedNode.children[0])]
    }
});

rules.push({
    target: 'argument_declaration_list',
    elements: ['argument_declaration_list', '_,', 'argument_declaration'],
    toASTChain: function (parsedNode) {
        return parsedNodeToASTChain(parsedNode.children[0]).concat([parsedNodeToAST(parsedNode.children[2])])
    }
});


/**********************************************************************************************************************/

rules.push({
    target: 'return_statement',
    elements: ['_return', 'exp', '_;'],
    toAST: function (parsedNode) {
        return {
            type: "ReturnStatement",
            argument: parsedNodeToAST(parsedNode.children[1])
        };
    }
});

rules.push({
    target: 'statement',
    elements: ['return_statement'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


/**********************************************************************************************************************/


rules.push({
    target: 'function_declare',
    elements: ['_function', 'ident', 'function_arguments_declaration', 'type_annotation', 'block_statement'],
    toAST: function (parsedNode) {
        return {
            type: 'FunctionDeclaration',
            id: parsedNodeToAST(parsedNode.children[1]),
            params: parsedNodeToASTChain(parsedNode.children[2]),
            returnType: parsedNodeToAST(parsedNode.children[3]),
            body: parsedNodeToAST(parsedNode.children[4])
        };
    }
});

rules.push({
    target: 'function_declare',
    elements: ['_function', 'ident', 'function_arguments_declaration', 'block_statement'],
    toAST: function (parsedNode) {
        return {
            type: 'FunctionDeclaration',
            id: parsedNodeToAST(parsedNode.children[1]),
            params: parsedNodeToASTChain(parsedNode.children[2]),
            body: parsedNodeToAST(parsedNode.children[3])
        };
    }
});


rules.push({
    target: 'statement',
    elements: ['function_declare'],
    toAST: function (parsedNode) {
        return parsedNodeToAST(parsedNode.children[0]);
    }
});


rules.push({
    target: 'program',
    elements: ['statement_arr'],
    toAST: function (parsedNode) {
        return {
            type: "Program",
            body: parsedNodeToASTChain(parsedNode.children[0])
        }
    }
});


export default {
    elementRegexes: elementRegexes,
    rules: rules
};