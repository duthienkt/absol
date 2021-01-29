import Context from "./Context";
import ContextManager from "./ContextManager";
import OOP from "../HTML5/OOP";

/***
 * @extends Context
 * @constructor
 */
function GrandContext(){
    Context.call(this);
    this.ctxMng = new ContextManager();
}

OOP.mixClass(GrandContext, Context);


GrandContext.prototype.getContextManager = function () {
    return this.ctxMng;
};

/**
 * find context from parent
 * @return {*}
 */
GrandContext.prototype.getContext = function () {
    return Context.prototype.getContext.apply(this, arguments)
        || (this.parent && this.parent.getContext.apply(this.parent, arguments));
};

export default GrandContext;