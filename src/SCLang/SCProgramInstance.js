import "./SCOperators";
import SCOperatorExecutor from "./SCOperatorExecutor";
import SCScope from "./SCScope";
import { randomIdent } from "../String/stringGenerate";


export var SCStaticLibScope = new SCScope();
export var SCDynamicLibScope = new SCScope(SCStaticLibScope);


function SCProgramInstance(ast, env) {
    env = env || {};
    if (env instanceof SCScope) {
        this.global = env;
    }
    else {
        this.global = new SCScope(SCDynamicLibScope);
        Object.keys(env).forEach(key => {
            this.global.declareConst(key, env[key]);
        });
    }
    this.topScope = this.global;
    this.stack = [{
        scope: this.global
    }];

    this.ast = ast;
}

SCProgramInstance.prototype.exec = function () {
    return this.accept(this.ast);
};

SCProgramInstance.prototype.accept = function (node) {
    var visitor = this.visitors[node.type];
    if (visitor) {
        try {
            return this.visitors[node.type].apply(this, arguments);
        } catch (e) {
            console.error(e, node)
        }
    }
    else {
        throw { message: 'Can not handle ', node: node };
    }
};

SCProgramInstance.prototype.getRefOf = function (name) {
    return this.topScope.findRef(name);
};

SCProgramInstance.prototype.isFunctionReturned = function () {
    var topStack = this.stack[this.stack.length - 1];
    if (topStack.isFunctionReturned) {
        return topStack.isFunctionReturned();
    }
    return false;
};

SCProgramInstance.prototype.functionReturn = function (res) {
    var topStack = this.stack[this.stack.length - 1];
    if (topStack.functionReturn) {
        return topStack.functionReturn(res);
    }
};

SCProgramInstance.prototype.isLoopBroken = function () {
    var topStack = this.stack[this.stack.length - 1];
    if (topStack.loop && topStack.loop.length > 0) {
        // console.log(topStack.loop[topStack.loop.length - 1].isBroken());
        return topStack.loop[topStack.loop.length - 1].isBroken()
    }
    return false;
};

SCProgramInstance.prototype.loopPush = function (holder) {
    var topStack = this.stack[this.stack.length - 1];
    topStack.loop = topStack.loop || [];
    topStack.loop.push(holder);
};

SCProgramInstance.prototype.loopPop = function () {
    var topStack = this.stack[this.stack.length - 1];
    topStack.loop.pop();
};


SCProgramInstance.prototype.loopBreak = function () {
    var topStack = this.stack[this.stack.length - 1];
    topStack.loop[topStack.loop.length - 1].break();
}


SCProgramInstance.prototype.visitors = {
    Program: function (node) {
        var i = 0;
        var statements = node.body;
        var returnWith;
        var res = new Promise(rs => returnWith = rs);
        var runStep = () => {
            var statement;
            var sResult;
            while (i < statements.length) {
                statement = statements[i++];
                sResult = this.accept(statement);
                if (sResult && sResult.then) {
                    sResult.then(runStep);
                    return;
                }
            }
            returnWith(0);
        }

        runStep();

        return res;
    },

    BooleanLiteral: function (node) {
        return node.value;
    },
    BlockStatement: function (node) {
        var i = 0;
        var statements = node.body;
        var returnWith;
        var resolved = false;
        var result = undefined;
        var sync = new Promise(rs => {
            returnWith = (res) => {
                resolved = true;
                result = res;
                rs(res);
            }
        });
        var runStep = () => {
            var statement;
            var sResult;
            while (i < statements.length && !this.isFunctionReturned() && !this.isLoopBroken()) {
                statement = statements[i++];
                sResult = this.accept(statement);
                if (sResult && sResult.then) {
                    sResult.then(runStep);
                    return;
                }
            }
            returnWith(0);
        }

        runStep();
        if (resolved) {
            return this.result;
        }
        else return sync;
    },


    ExpressionStatement: function (node) {
        return this.accept(node.expression);
    },
    VariableDeclaration: function (node) {
        var initValue = null;
        if (node.init) {
            initValue = this.accept(node.init);
        }
        if (initValue && initValue.then) {
            return initValue.then((result) => {
                this.topScope.declareVar(node.id.name, result);
            })
        }
        else {
            this.topScope.declareVar(node.id.name, initValue);
        }
    },

    ArrayExpression: function (node) {
        var res = [];
        var resolved = false;
        var resolve;
        var sync = new Promise(rs => {
            resolve = () => {
                resolved = true;
                rs(res);
            };
        });
        var elements = node.elements;
        var i = 0;
        var doStep = () => {
            var eResult;
            while (i < elements.length) {
                eResult = this.accept(elements[i++], 'const');
                if (eResult && eResult.then) {
                    eResult.then((item) => {
                        res.push(item);
                        doStep();
                    });
                    return;
                }
                else {
                    res.push(eResult);
                }
            }

            resolve();
        }

        doStep();

        if (resolved) {
            return res;
        }
        else {
            return sync;
        }
    },
    ForCountStatement: function (node) {
        var idRef = this.accept(node.for, 'ref');
        var from = this.accept(node.from, 'const');
        var to = this.accept(node.to, 'const');
        var result;
        var resolved = false;
        var resolveWith;
        var sync = new Promise(function (rs) {
            resolveWith = (res) => {
                result = res;
                resolved = true;
                rs(res);
            }
        });
        var i = from;
        var runStep = () => {
            while (i <= to) {
                idRef.set(i);
                ++i;
                var stResult = this.accept(node.body);
                if (stResult && stResult.then) {
                    stResult.then(runStep);
                    return;
                }
            }
            resolveWith(0);
        }
        runStep();
        if (resolved) {
            return result;
        }
        else {
            return sync;
        }

    },

    WhileStatement: function (node) {
        var resolved = false;
        var resolve;
        var sync = new Promise(rs => {
            resolve = () => {
                resolved = true;

                rs(undefined);
            };
        });
        this.loopPush({
            break: () => {
                resolved = true;
            },
            isBroken: () => {
                return resolved;
            }
        });
        var state = 0;
        var doStep = () => {
            var sResult;
            while (!resolved) {
                if (this.isFunctionReturned()) {
                    resolve();
                    return;
                }

                if (state === 0) {
                    sResult = this.accept(node.test, 'const');
                    state = 1;
                }
                else {
                    sResult = this.accept(node.body);
                    state = 0;
                }
                if (sResult && (typeof sResult.then === "function")) {
                    sResult.then((sResult) => {
                        if (state === 0 || sResult) {
                            doStep();
                        }
                        else {
                            resolve();
                        }
                    });
                    return;
                }
                else {
                    if (state === 1 && !sResult) {
                        resolve();
                    }
                }
            }
        }

        doStep();

        if (resolved) {
            this.loopPop();
            return undefined;
        }
        else {
            return sync.then(() => this.loopPop());
        }

    },
    DoWhileStatement: function (node) {
        var resolved = false;
        var resolve;
        var sync = new Promise(rs => {
            resolve = () => {
                resolved = true;
                rs(undefined);
            };
        });
        var state = 1;
        var doStep = () => {
            var sResult;
            while (!resolved) {
                if (state === 0) {
                    sResult = this.accept(node.test, 'const');
                    state = 1;
                }
                else {
                    sResult = this.accept(node.body);
                    state = 0;
                }
                if (sResult && (typeof sResult.then === "function")) {
                    sResult.then((sResult) => {
                        if (state === 0 || sResult) {
                            doStep();
                        }
                        else {
                            resolve();
                        }
                    });
                    return;
                }
                else {
                    if (state === 1 && !sResult) {
                        resolve();
                    }
                }
            }
        }

        doStep();

        if (resolved) {
            return undefined;
        }
        else {
            return sync;
        }
    },
    AssignStatement: function (node) {
        var leftRef = this.accept(node.left, 'ref');
        var right = this.accept(node.right, 'const');
        leftRef.set(right);

    },
    IfStatement: function (node) {
        var test = this.accept(node.test);
        if (test && (typeof test.then === 'function')) {
            return test.then((test) => {
                if (test) {
                    return this.accept(node.consequent);
                }
                else if (node.alternate) {
                    return this.accept(node.alternate);
                }
            });
        }
        else {
            if (test) {
                return this.accept(node.consequent);
            }
            else if (node.alternate) {
                return this.accept(node.alternate);
            }
        }
    },

    // CallExpression: function (node){
    //     var funcRef;
    //     var object = null;
    //     var func = null;
    //     if (node.callee.type === 'Identifier'){
    //         funcRef = this.topScope.get(node.callee.name);
    //     }
    //     else {
    //         console.log(node.callee)
    //     }
    //
    //Vả
    // },
    NullLiteral: function (node) {
        return null;
    },
    NumericLiteral: function (node) {
        return (node.value);
    },
    StringLiteral: function (node) {
        return node.value;
    },
    BinaryExpression: function (node) {
        var leftValue = this.accept(node.left, 'const');
        var rightValue = this.accept(node.right, 'const');
        var sync = [];
        if (leftValue && leftValue.then) {
            sync.push(leftValue);
            leftValue.then(result => leftValue = result);
        }
        if (rightValue && rightValue.then) {
            sync.push(rightValue);
            rightValue.then(result => rightValue = result);
        }
        if (sync.length === 0) {
            return SCOperatorExecutor.executeBinaryOperator(node.operator.content, leftValue, rightValue);
        }
        else {
            return Promise.all(sync).then(u => {
                return SCOperatorExecutor.executeBinaryOperator(node.operator.content, leftValue, rightValue);
            });
        }
    },
    UnaryExpression: function (node) {
        var arg = this.accept(node.argument, 'const');
        if (arg && arg.then) {
            return arg.then(value => SCOperatorExecutor.executeUnaryOperator(node.operator.content, value));
        }
        else {
            return SCOperatorExecutor.executeUnaryOperator(node.operator.content, arg);
        }
    },
    Identifier: function (node, type) {
        var ref;
        if (type === 'const') {
            ref = this.getRefOf(node.name);
            if (ref) {
                return ref.get();
            }
            else {
                throw { type: "NotDeclare", name: node.name };
            }
        }
        else if (type === 'ref') {
            ref = this.getRefOf(node.name);
            if (ref) {
                return ref;
            }
            else {
                throw { type: "NotDeclare", name: node.name };
            }
        }
        return node.name;
    },
    CallExpression: function (node) {
        var calleeFunction;
        var object = null;
        var ref;
        if (node.callee.type === "Identifier") {
            ref = this.getRefOf(node.callee.name);
            calleeFunction = ref.get();
        }
        else if (node.callee.type === 'MemberExpression') {
            ref = this.accept(node.callee);
            calleeFunction = ref.get();
            object = ref.object;
        }
        var argumentValues = node.arguments.map((exp) => {
            return this.accept(exp, 'const');
        });
        var sync = [];
        argumentValues.forEach((arg, i) => {
            if (arg && arg.then) {
                sync.push(arg.then(result => {
                    argumentValues[i] = result;
                }));
            }
        });
        if (sync.length > 0) {
            return Promise.all(sync).then(() => {
                return calleeFunction.apply(object, argumentValues);
            });
        }
        else
            return calleeFunction.apply(object, argumentValues);
    },
    NewExpression: function (node) {
        var calleeFunction;
        var ref;
        if (node.callee.type === "Identifier") {
            ref = this.getRefOf(node.callee.name);
            calleeFunction = ref.get();
        }
        else if (node.callee.type === 'MemberExpression') {
            ref = this.accept(node.callee);
            calleeFunction = ref.get();
        }
        var argumentValues = node.arguments.map((exp) => {
            return this.accept(exp, 'const');
        });

        var code = `return new clazz(${argumentValues.map((u, i) => `args[${i}]`).join(', ')});`;
        var f = new Function('clazz', 'args', code);
        return f(calleeFunction, argumentValues);
    },
    MemberExpression: function (node, type) {
        var object = this.accept(node.object, 'const');
        var key;
        if (node.property.type === 'Identifier' && !node.computed) {
            key = node.property.name;
        }
        else {
            key = this.accept(node.property, 'const');
        }

        if (key && key.then) {
            return key.then(key => {
                if (type === 'const') return object[key];
                return {
                    set: function (value) {
                        return object[key] = value;
                    },
                    get: function () {
                        return object[key];
                    },
                    object: object
                }
            });
        }
        else {
            if (type === 'const') return object[key];
            return {
                set: function (value) {
                    return object[key] = value;
                },
                get: function () {
                    return object[key];
                },
                object: object
            }
        }
    },

    ObjectProperty: function (node) {
        var res = {};
        var key = this.accept(node.key);
        var value = this.accept(node.value, 'const');
        if (value && (typeof value.then === 'function')) {
            return value.then(value => {
                res[key] = value;
                return res;
            });
        }
        else {
            res[key] = value;
        }
        return res;
    },
    ObjectExpression: function (node) {
        var res = {};
        var resolved = false;
        var resolve;
        var sync = new Promise(rs => {
            resolve = () => {
                resolved = true;
                rs(res);
            }
        });
        var i = 0;
        var properties = node.properties;
        var doStep = () => {
            var pResult;
            while (i < properties.length) {
                pResult = this.accept(properties[i++]);
                if (pResult && (typeof pResult.then === "function")) {
                    pResult.then((pO) => {
                        Object.assign(res, pO);
                    });
                    return;
                }
                else {
                    Object.assign(res, pResult);
                }
            }
            resolve();
        };

        doStep();

        if (resolved) {
            return res;
        }
        else {
            return sync;
        }

    },
    FunctionDeclaration: function (node) {
        var self = this;
        //todo: overloading
        var functionName = node.id.name;

        function f() {
            var scope = new SCScope(self.topScope);
            var result = undefined;
            var resolved = false;
            var functionReturn = (res) => {
                resolved = true;
                result = res;
            }
            var isFunctionReturned = () => {
                return resolved;
            }
            self.stack.push({ scope: scope, functionReturn: functionReturn, isFunctionReturned: isFunctionReturned });
            self.topScope = scope;
            for (var i = 0; i < node.params.length; ++i) {
                scope.declareVar(node.params[i].id.name, arguments[i]);
            }

            scope.declareVar('arguments', arguments);
            var res = self.accept(node.body);
            if (res && (typeof res.then === "function")) {
                return res.then(res => {
                    if (self.stack[self.stack.length - 1].scope === scope) {
                        self.stack.pop();
                        self.topScope = self.stack[self.stack.length - 1].scope;
                        return result;
                    }
                    else {
                        throw new Error('EngineError: Bug in stack!');
                    }
                });
            }
            else {
                if (self.stack[self.stack.length - 1].scope === scope) {
                    self.stack.pop();
                    self.topScope = self.stack[self.stack.length - 1].scope;
                    return result;
                }
                else {
                    throw new Error('EngineError: Bug in stack!');
                }
            }

        }

        var code = `return function ${functionName}(${node.params.map(pr => pr.id.name|| randomIdent(5)).join(',')}) { return f.apply(this, arguments); }`;
        var func = (new Function('f', code))(f);
        this.topScope.declareVar(functionName, func);
        return func;
    },
    BreakStatement: function (node) {
        this.loopBreak();
    },

    ReturnStatement: function (node) {
        var res = undefined;
        if (node.argument) {
            res = this.accept(node.argument, 'const');
        }

        if (res && res.then) {
            res.then(res => {
                this.functionReturn(res);
            });
        }
        else {
            this.functionReturn(res);
        }
    }
};


export default SCProgramInstance;