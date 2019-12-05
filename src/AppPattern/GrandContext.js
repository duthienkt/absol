import Context from "./Context";
import ContextManager from "./ContextManager";

function GrandContext(){
    Context.call(this);
    this.ctxMng = new ContextManager();
}

Object.defineProperties(GrandContext.prototype, Object.getOwnPropertyDescriptors(Context.prototype));
GrandContext.prototype.constructor = GrandContext;

GrandContext.prototype.getContextManager = function () {
    return this.ctxMng;
};

/**
 * find context from parent
 */
GrandContext.prototype.getContext = function () {
    return Context.prototype.getContext.apply(this, arguments)
        || (this.parent && this.parent.getContext.apply(this.parent, arguments));
}

export default GrandContext;