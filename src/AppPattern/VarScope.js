function VarScope(parent) {
    this.parent = parent;
    this.data = {};
}

VarScope.prototype.revoke = function (name) {
    delete this.data[name];
    return this;
};

VarScope.prototype.isDeclared = function (name) {
    return (name in this.data);
};

/***
 *
 * @param name
 * @param initValue
 * @param {boolean=} force
 * @return {VarScope}
 */
VarScope.prototype.declare = function (name, initValue, force) {
    if ((name in this.data) && !force) throw new Error(name + ' is already delared in this scope!');
    this.data[name] = initValue;
    return this;
};

VarScope.prototype.get = function (name) {
    var scope = this.findScope(name);
    if (!scope) throw new Error(name + ' is not declared!');
    return scope.data[name];
};

VarScope.prototype.set = function (name, value) {
    var scope = this.findScope(name);
    if (!scope) throw new Error(name + ' is not declared!');
    scope.data[name] = value;
};


VarScope.prototype.findScope = function (name) {
    var currentScope = this;
    while (currentScope) {
        if (name in currentScope.data) break;
        currentScope = currentScope.parent;
    }
    return currentScope;
};

export default VarScope;

