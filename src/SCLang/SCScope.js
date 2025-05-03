import Ref from "../AppPattern/Ref";
import Const from "../AppPattern/Const";

/***
 *
 * @param {SCScope=} parent
 * @constructor
 */
function SCScope(parent) {
    this.parent = parent;
    /***
     *
     * @type {Object<string, Ref|Const>}
     */
    this.data = {};
}

SCScope.prototype.set = function (name, value) {
    var ref = this.findRef(name);
    if (!ref) throw new Error('"' + name + '" was not declared!');
    if (ref.set) {
        ref.set(value);
    }
    else {
        throw new Error('"' + name + '" defined with const cannot be modified!');
    }
};


SCScope.prototype.get = function (name) {
    var ref = this.findRef(name);
    if (!ref) throw new Error('"' + name + '" was not declared!');
    return ref.get();
};

SCScope.prototype.declareConst = function (name, value, force, type) {
    if ((name in this.data) && !force) throw new Error("Cannot redefine variable, " + name + " is already declared!");
    this.data[name] = new Const(value, type);
};


SCScope.prototype.declareVar = function (name, value, force, type) {
    if ((name in this.data) && !force) throw new Error("Cannot redefine variable, " + name + " is already declared!");
    this.data[name] = new Ref(value, type);
};

SCScope.prototype.revoke = function (name) {
    delete this.data[name];
};

/***
 *
 * @param {string} name
 * @return {Ref|Const|null}
 */
SCScope.prototype.findRef = function (name) {
    return this.data[name] || (this.parent && this.parent.findRef(name)) || null;
};


/***
 *
 * @param {string} name
 * @return {SCScope|null}
 */
SCScope.prototype.findScope = function (name) {
    if (this.data[name]) return this;
    if (this.parent) return this.parent.findScope(name);
    return null;
};

SCScope.prototype.makeFlattenedScope = function () {
    var res;
    if (this.parent) res = this.parent.makeFlattenedScope();
    else res = new SCScope();
    Object.assign(res.data, this.data);
    return res;
};


export default SCScope;