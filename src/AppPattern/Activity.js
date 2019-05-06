
//NOTE: !impotant : don't make setter, getter for activity, just code like JAVA
/** 
 * @class
 */
function Activity() {
    this.state = "CREATE";
};

/**
 * @param {vmobile.Application} 
 */
Activity.prototype.attach = function (content) {
    /**
     * @type {vmobile.Application}
     */
    this.content = content;
    this.onAttached && this.onAttached();
};

Activity.prototype.detach = function () {
    this.onDetached && this.onDetached();
    this.content = null;
};

Activity.prototype.pause = function () {
    if (this.state.match(/RUNNING/)) {
        this.state = "PAUSE";
        this.onPause && this.onPause();
    }
    else {
        console.warn(this, "NOT RUNNING");
    }
};
Activity.prototype.resume = function () {
    if (!this.state.match(/STANDBY||PAUSE/)) {
        console.error(this, 'NOT READY!');
        return;
    }
    this.state = "RUNNING";
    this.onResume && this.onResume();
};

Activity.prototype.start = function () {
    if (this.state.match(/DIE/)) {
        console.error(this, 'DIED!');
        return;
    }

    if (this.state.match(/RUNNING/)) return;

    if (this.state.match(/STOP|CREATE/)) {
        this.state = "STANDBY";
        this.onStart && this.onStart();
    }
    if (this.state.match(/STANDBY|PAUSE/)) {
        this.resume();
    }
};

Activity.prototype.stop = function () {
    if (this.state.match(/STOP|DIE/)) return;
    if (this.state.match(/RUNNING/)) this.pause();
    this.state = "STOP";
    this.onStop && this.onStop();
};

Activity.prototype.destroy = function () {
    if (this.state.match(/DIE/)) return;
    if (!this.state.match(/STOP/)) this.stop();
    this.state = "DIE";
    this.onDestroy && this.onDestroy();
};

Activity.prototype.getView = function () {
    throw new Error("Not Implement!");
}


Activity.prototype.startActivity = function (activity) {
    if (this.content) {
        this.content.startActivity(activity);
    }
    else {

    }
};

Activity.prototype.finish = function () {
    if (this.content) {
        this.content.stopActivity(this);
    }
    else {

    }
};

export default Activity;