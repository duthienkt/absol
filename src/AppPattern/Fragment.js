import ContextManager from "./ContextManager";
import GrandContext from "./GrandContext";
import OOP from "../HTML5/OOP";
import noop from "../Code/noop";

/***
 * @extends GrandContext
 * @constructor
 */
function Fragment() {
    GrandContext.call(this);
}

OOP.mixClass(Fragment, GrandContext);


Fragment.prototype.createView = function () {
    throw new Error("Not implement!");
};

Fragment.prototype.getView = function () {
    if (this.$view) return this.$view;
    this.$view = this.createView() || this.$view;
    if (!this.$view) throw new Error("this.$view must be not null!");
    if (this.onCreated) this.onCreated();
    return this.$view;
};

Fragment.prototype.onCreated = noop;

Fragment.prototype.revokeResource  = function () {
    this.destroy();
};

export default Fragment;