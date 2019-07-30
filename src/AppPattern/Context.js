function Context (){
    this.state = "CREATE";
    /**
     * @type {Context}
     */
    this.parent = null;
    this.children = [];
}

Context.prototype.appendChild = function(){
    for (var i = 0; i < arguments.length; ++i){
        this.children.push(arguments[i]);
    }
};

Context.prototype.removeChild = function(child){
    var temp = this.children;
    this.children = [];
    for (var i = 0; i< this.children.length; ++i){
        if (temp[i] == child){
        }
        else{
            this.children.push(temp[i]);
        }
    }
};

Context.prototype.getView = function () {
    throw new Error("Not Implement!");
};


/**
 * @returns {*}
 */
Context.prototype.getContext = function(key){
    return this.parent.getContextManager().get(key);
};

/**
 * @returns {ContextManager}
 */
Context.prototype.getContextManager = function(){
    return this.parent.getContextManager();
};

/**
 * @param {Application} 
 */
Context.prototype.attach = function (parent) {
    //stop before attach to new context
    this.stop();
    /**
     * @type {Application}
     */
    this.parent = parent;
    this.state = "ATTACHED";
    this.onAttached && this.onAttached();
};

Context.prototype.detach = function () {
    this.stop();
    this.state = "DETACHED";
    this.onDetached && this.onDetached();
    this.parent = null;
};

Context.prototype.pause = function () {
    if (this.state.match(/RUNNING/)) {
        this.state = "PAUSE";
        this.onPause && this.onPause();
    }
    else {
        console.warn(this, "NOT RUNNING");
    }
};
Context.prototype.resume = function () {
    if (!this.state.match(/STANDBY||PAUSE/)) {
        console.error(this, 'NOT READY!');
        return;
    }
    this.state = "RUNNING";
    this.onResume && this.onResume();
};

Context.prototype.start = function () {
    if (this.state.match(/DIE/)) {
        console.error(this, 'DIED!');
        return;
    }

    if (this.state.match(/RUNNING/)) return;

    if (this.state.match(/STOP|CREATE|ATTACHED/)) {
        this.state = "STANDBY";
        this.onStart && this.onStart();
    }
    if (this.state.match(/STANDBY|PAUSE/)) {
        this.resume();
    }
};

Context.prototype.stop = function () {
    if (this.state.match(/STOP|DIE|CREATE|ATTACHED|DETACHED/)) return;
    if (this.state.match(/RUNNING/)) this.pause();
    this.state = "STOP";
    this.onStop && this.onStop();
};

Context.prototype.destroy = function () {
    if (this.state.match(/DIE/)) return;
    if (!this.state.match(/RUNNING||PAUSE/)) this.stop();
    this.state = "DIE";
    this.onDestroy && this.onDestroy();
};



export default Context;