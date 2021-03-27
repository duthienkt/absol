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

export default GrandContext;