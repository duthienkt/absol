import Context from "./Context";
import ContextManager from "./ContextManager";


function Fragment(){
    Context.call(this);
    this.ctxMng = new ContextManager();
}

Object.defineProperties(Fragment.prototype, Object.getOwnPropertyDescriptors(Context.prototype));
Fragment.prototype.constructor = Fragment;


Fragment.prototype.getContextManager = function () {
    return this.ctxMng;
};


/**
 * find context from parent
 */
Fragment.prototype.getContext = function () {
    return Context.prototype.getContext.apply(this, arguments)
        || (this.parent && this.parent.getContext.apply(this.parent, arguments));
};


export default Fragment;