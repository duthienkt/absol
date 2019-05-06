/**
 * @class
 */
function Application() {
    this.activityStack = [];
    /** @type {Activity} */
    this.currentActivity = null;
};

Application.prototype.getView = function () {
    throw new Error("Not Implement!");
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
            activity.stop();
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