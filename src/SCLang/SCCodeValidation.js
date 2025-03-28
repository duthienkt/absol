import SCParser from "./SCParser";
import VarScope from "../AppPattern/VarScope";

/**
 * @typedef {Object} SCCodeValidationOption
 * @property {string} target - default: "program"
 * @variables {string[]} variables
 *
 */

/**
 *
 * @param {string} source
 * @param {SCCodeValidationOption} opt
 * @constructor
 */
function SCCodeValidation(source, opt) {
    this.source = source;
    this.opt = opt || {};
    this.error = null;
    this.parsed = null;
    this.usedGlobalVariables = [];
    this.glolbalScope = new VarScope();
    this.topScope = new VarScope(this.glolbalScope);
    console.log(this.topScope)
    this.stack = [
        {
            scope: this.glolbalScope,
        },
        {
            scope: this.topScope,
        }
    ];
    this.execute();
}

SCCodeValidation.prototype.execute = function () {
    this.parsed = SCParser.parse(this.source, this.opt.target || 'program');
    this.calcErrorMessages();
    if (!this.parsed.error) {
        this.accept(this.parsed.ast);
        this.calcNameError();
    }
};

SCCodeValidation.prototype.accept = function (node) {
    var visitor = this.visitors[node.type];
    if (visitor) {
        return this.visitors[node.type].apply(this, arguments);
        // try {
        //
        // } catch (e) {
        //     console.error(e, node)
        // }
    }
    else {
        // throw this.makeError("NotHandle", 'Can not handle node type ' + node && node.type, node);
    }
};

SCCodeValidation.prototype.visitors = {
    Program: function (nd) {
        var i = 0;
        var statements = nd.body;
        while (i < statements.length) {
            this.accept(statements[i]);
            i++;
        }
    },
    BlockStatement: function (nd) {
        var i = 0;
        var statements = nd.body;
        while (i < statements.length) {
            this.accept(statements[i]);
            i++;
        }
    },
    ExpressionStatement: function (nd) {
        this.accept(nd.expression);
    },
    VariableDeclarator: function (nd) {
        var name = this.accept(nd.id);
        this.topScope.declare(name, null, true);
        if (nd.init) this.accept(nd.init, 'get_var');
    },
    VariableDeclaration: function (nd) {
        if (nd.declarations)
            nd.declarations.forEach(it => {
                this.accept(it);
            })
    },
    ArrayExpression: function (nd) {
        nd.elements.forEach(it => {
            this.accept(it);
        });
    },
    ForCountStatement: function (nd) {
        this.accept(nd.from, 'get_var');
        this.accept(nd.to, 'get_var');
        this.accept(nd.for, 'get_var');
        this.accept(nd.body);
    },
    WhileStatement: function (nd) {
        this.accept(nd.test, 'get_var');
        this.accept(nd.body);
    },
    DoWhileStatement: function (nd) {
        this.accept(nd.test, 'get_var');
        this.accept(nd.body);
    },
    ForOfStatement: function (nd) {
        this.accept(nd.for, 'get_var');
        this.accept(nd.of, 'get_var');
        this.accept(nd.body);
    },
    ForInStatement: function (nd) {
        this.accept(nd.for, 'get_var');
        this.accept(nd.in, 'get_var');
        this.accept(nd.body);
    },
    AssignmentExpression: function (nd) {
        this.accept(nd.left, 'get_var');
        this.accept(nd.right, 'get_var');
    },
    IfStatement: function (nd) {
        this.accept(nd.test, 'get_var');
        this.accept(nd.consequent);
        if (nd.alternate) {
            this.accept(nd.alternate);
        }
    },
    ConditionalExpression: function (nd) {
        this.accept(nd.test, 'get_var');
        this.accept(nd.consequent);
        this.accept(nd.alternate);
    },
    BinaryExpression: function (nd) {
        this.accept(nd.left, 'get_var');
        this.accept(nd.right, 'get_var');
    },
    UnaryExpression: function (nd) {
        this.accept(nd.argument, 'get_var');
    },
    CallExpression: function (nd) {
        this.accept(nd.callee, 'get_var');
        nd.arguments.forEach(it => {
            this.accept(it, 'get_var');
        });
    },
    FunctionDeclaration: function (nd) {

    },
    NewExpression: function (nd) {
        this.accept(nd.callee, 'get_var');
        nd.arguments.forEach(it => {
            this.accept(it, 'get_var');
        });
    },
    ObjectProperty: function (nd) {
        this.accept(nd.value, 'get_var');
    },
    ObjectExpression: function (nd) {
        nd.properties.forEach(it => {
            this.accept(it, 'get_var');
        })
    },
    /**
     * @this {SCCodeValidation}
     * @param nd
     */
    MemberExpression: function (nd) {
        this.accept(nd.object, 'get_var');
        if (nd.computed) {
            this.accept(nd.property, 'get_var');
        }
    },
    ReturnStatement: function (nd){
        this.accept(nd.argument, 'get_var');
    },
    Identifier: function (nd, type) {
        var name = nd.name;
        var scope;
        if (type === 'get_var') {
            scope = this.topScope.findScope(name);
            if (!scope) {
                this.glolbalScope.declare(name, null, true);
            }
        }
        return name;
    },


}


SCCodeValidation.prototype.calcErrorMessages = function () {
    var rawError = this.parsed.error;
    var ist = this.parsed;
    var rows;
    var errorText = '';
    var error = ist.error;
    var token, charIdx, rowIdx;
    if (rawError) {
        rows = this.source.split('\n');
        switch (error.type) {
            case 'unexpected':
                errorText = `<span style="color:red;">${error.message}</span>`;
                token = ist.tokens[error.tokenIdx];
                charIdx = token.start;
                rowIdx = 0;
                while (rowIdx < rows.length) {
                    if (charIdx <= rows[rowIdx].length) {
                        errorText = `<strong>Line ${rowIdx + 1}:</strong> ` + errorText
                        errorText += '<br>';
                        errorText += `<div style="color:blue; white-space: pre-wrap; font-family: Consolas, serif;">${rows[rowIdx]}</div>`;
                        errorText += `<div style=" --text-color:red; white-space: pre-wrap; font-family: Consolas, serif;" class="as-blink-text">${' '.repeat(charIdx)}^</div>`;
                        break;
                    }
                    charIdx -= rows[rowIdx].length + 1;//by \n
                    rowIdx++;
                }
                break;
            default:
                errorText = `<span style="color:red">${error.message}</span>`;
                break;

        }
        this.error = {
            type: 'syntax',
            message: rawError.message,
            htmlMessage: errorText
        };
    }
};

SCCodeValidation.prototype.calcNameError = function (){
    var variables = this.opt.variables || [];
    var variableDict = variables.reduce((ac, cr)=>{
        ac[cr] = true;
        return ac;
    }, {});
    var undefinedVariables = Object.keys(this.glolbalScope.data).filter(name=> !variableDict[name]);
    if (undefinedVariables.length > 0){
        this.error = {
            type: 'name',
            message: 'Undefined variables: ' + undefinedVariables.join(', '),
            htmlMessage: `<span style="color:red;">Undefined variables: ${undefinedVariables.join(', ')}</span>`
        }
    }
};


export default SCCodeValidation;

export function validateSCCode(code, opt) {
    return new SCCodeValidation(code, opt);
}
/*
var d = absol.sclang.validateSCCode(`
var name = nd.name;
        var scope;
        var a;
        a = b;
        var m = {a: a, b: b, d: d};
        if (type === 'get_var') {
        x = y;
            scope = this.topScope.findScope(nd.object);
            if (!scope) {
                this.glolbalScope.declare(name, null, true);
            }
        }
        z = Math.max(x,y, scope[a]);
        return name;`, {variables: ['Math', 'Date', 'x','this']});


if (d.error) {
console.log(d.error);
    var div = document.createElement('div');

    setTimeout(() => {
        document.body.appendChild(div);
        div.innerHTML = d.error.htmlMessage;
    }, 100)
}

*/