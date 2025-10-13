import Const from "./Const";
import Ref from "./Ref";

/**
 *
 * @param {VarScope=} parent
 * @constructor
 */
function VarScope(parent) {
    this.parent = parent||null;
    /***
     *
     * @type {Object<string, Ref|Const>}
     */
    this.data = {};
}

VarScope.prototype.revoke = function (name) {
    delete this.data[name];
    return this;
};

VarScope.prototype.isDeclared = function (name) {
    return (name in this.data);
};

VarScope.prototype.declareRef = function (name, ref) {
    this.data[name] = ref;
    return this;
};

/***
 *
 * @param name
 * @param value
 * @param {boolean=} force
 * @param {*=} type
 * @return {VarScope}
 */
VarScope.prototype.declareConst = function (name, value, force, type) {
    if ((name in this.data) && !force) throw new Error("Cannot redefine variable, " + name + " is already declared!");
    this.data[name] = new Const(value, type);
    return  this;
};


/***
 *
 * @param name
 * @param value
 * @param {boolean=} force
 * @param {*=} type
 * @return {VarScope}
*/
VarScope.prototype.declareVar = function (name, value, force, type) {
    if ((name in this.data) && !force) throw new Error("Cannot redefine variable, " + name + " is already declared!");
    this.data[name] = new Ref(value, type);
    return this;
};

/***
 *
 * @param name
 * @param initValue
 * @param {boolean=} force
 * @return {VarScope}
 */
VarScope.prototype.declare = function (name, initValue, force) {
   return  this.declareVar.apply(this, arguments);
};

VarScope.prototype.get = function (name) {
    var ref = this.findRef(name);
    if (!ref) throw new Error('"' + name + '" was not declared!');
    return ref.get();
};

VarScope.prototype.set = function (name, value) {
    var ref = this.findRef(name);
    if (!ref) throw new Error('"' + name + '" was not declared!');
    if (ref.set) {
        ref.set(value);
    }
    else {
        throw new Error('"' + name + '" defined with const cannot be modified!');
    }
};


VarScope.prototype.findScope = function (name) {
    if (this.data[name]) return this;
    if (this.parent) return this.parent.findScope(name);
    return null;
};

VarScope.prototype.makeFlattenedScope = function () {
    var res;
    if (this.parent) res = this.parent.makeFlattenedScope();
    else res = new VarScope();
    Object.assign(res.data, this.data);
    return res;
};

/***
 *
 * @param {string} name
 * @return {Ref|Const|null}
 */
VarScope.prototype.findRef = function (name) {
    return this.data[name] || (this.parent && this.parent.findRef(name)) || null;
};



export default VarScope;

