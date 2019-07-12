import Context from "./Context";

//NOTE: !impotant : don't make setter, getter for activity, just code like JAVA
/** 
 * @class
 */
function Activity() {
    Context.call(this);
};


Object.defineProperties(Activity.prototype, Object.getOwnPropertyDescriptors(Context.prototype));
Activity.prototype.constructor = Activity;


Activity.prototype.startActivity = function (activity) {
    if (this.parent) {
        this.parent.startActivity(activity);
    }
    else {
    } 
};
 
Activity.prototype.finish = function () {
    if (this.parent) {
        this.parent.stopActivity(this);
    }
    else {

    }
};

export default Activity;