import ContextManager from "./ContextManager";
import Context from "./Context";

/**
 * @class
 */
function Application() {
    Context.call(this);
    this.activityStack = [];
    /** @type {Activity} */
    this.currentActivity = null;
    this.contextManager = new ContextManager();
};

Object.defineProperties(Application.prototype, Object.getOwnPropertyDescriptors(Context.prototype));
Application.prototype.constructor = Application;

Application.prototype.getContextManager = function () {

    return this.contextManager;
};

/**
 * @param {Activity} activity
 */
Application.prototype.startActivity = function (activity) {
    if (this.currentActivity != null) {
        this.currentActivity.pause();
        this.activityStack.push(this.currentActivity);
    }
    this.currentActivity = activity;
    this.appendChild(activity);
    activity.attach(this);
    this.setContentView(activity.getView(), true);
    activity.start();
};

/**
 * @param {Activity} activity
 */
Application.prototype.stopActivity = function (activity) {
    if (this.currentActivity == activity) {
        if (this.activityStack.length == 0) {
            //todo
        }
        else {
            activity.detach();
            this.removeChild(this.currentActivity);
            this.currentActivity = this.activityStack.pop();
            this.setContentView(this.currentActivity.getView());
            this.currentActivity.resume();
        }
    }
    else {
        console.error("NOT ON TOP ACTIVITY");
    }
};

/**
 * @param {HTMLElement} view
 */
Application.prototype.setContentView = function (view, overlay) {
    throw new Error("Not Implement!");
};

Application.prototype.backToTopActivity = function () {
    while (this.activityStack.length > 0) {
        this.currentActivity.stop();
        this.currentActivity = this.activityStack.pop();
    }
    this.setContentView(this.currentActivity.getView());
    this.currentActivity.resume();
}

export default Application;