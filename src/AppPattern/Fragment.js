import Context from "./Context";


function Fragment(){
    Context.call(this);
}

Object.defineProperties(Fragment.prototype, Object.getOwnPropertyDescriptors(Context.prototype));
Fragment.prototype.constructor = Application;


export default Fragment;