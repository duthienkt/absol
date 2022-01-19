import noop from "../Code/noop";
function Context() {
    this.state = "CREATE";
    /**
     * @type {Context}
     */
    this.parent = null;
    /***
     *
     * @type {null|ContextManager}
     */
    this.ctxMng = null;
}


/**
 * @returns {*}
 */
Context.prototype.getContext = function (key) {
    var ctx = this;
    var res;
    while (ctx && !res){
        if (ctx.ctxMng) {
            res = ctx.ctxMng.get(key);
        }
        ctx = ctx.parent;
    }
    return res;
};

/**
 * @param {string} key
 * @param {*} value
 * @returns {*}
 */
Context.prototype.setContext = function (key, value) {
    return this.getContextManager().set(key, value);
};

/**
 * @returns {ContextManager}
 */
Context.prototype.getContextManager = function () {
    var ctx = this;
    var res;
    while (ctx && !res){
        if (ctx.ctxMng) {
            res = ctx.ctxMng;
        }
        ctx = ctx.parent;
    }
    return res;
};

/**
 * @param {Context} parent
 */
Context.prototype.attach = function (parent) {
    //stop before attach to new context
    this.stop();
    /**
     * @type {Application}
     */
    this.parent = parent;
    this.onAttached && this.onAttached();
};

Context.prototype.detach = function () {
    this.stop();
    this.onDetached && this.onDetached();
    this.parent = null;
};

Context.prototype.pause = function () {
    if (this.state.match(/RUNNING|PAUSE/)) {
        if (this.state === "RUNNING"){
            this.state = "PAUSE";
            this.onPause && this.onPause();
        }
    }
    else {
        console.warn(this, "NOT RUNNING");
    }
};
Context.prototype.resume = function () {
    if (!this.state.match(/STANDBY|PAUSE|RUNNING/)) {
        console.error(this, 'NOT READY!', this.state);
        return;
    }
    if (this.state === "RUNNING") return;
    this.state = "RUNNING";
    this.onResume && this.onResume();
};

/***
 * @param {boolean=} standBy start but waiting for resume()
 */
Context.prototype.start = function (standBy) {
    if (this.state.match(/DIE/)) {
        console.error(this, 'DIED!');
        return;
    }

    if (this.state.match(/RUNNING/)) return;

    if (this.state.match(/STOP|CREATE/)) {
        this.state = "STANDBY";
        this.onStart && this.onStart();
    }
    if (!standBy && this.state.match(/STANDBY|PAUSE/)) {
        this.resume();
    }
};

Context.prototype.stop = function () {
    if (this.state.match(/STOP|DIE|CREATE/)) return;
    if (this.state.match(/RUNNING/)) this.pause();
    this.state = "STOP";
    this.onStop && this.onStop();
};

Context.prototype.destroy = function () {
    if (this.state.match(/DIE/)) return;
    if (this.state.match(/RUNNING|PAUSE/)) this.stop();
    this.state = "DIE";
    this.onDestroy && this.onDestroy();
};

Context.prototype.onDestroy = noop;
Context.prototype.onStop = noop;
Context.prototype.onStart = noop;
Context.prototype.onResume = noop;
Context.prototype.onPause = noop;
Context.prototype.onDetached = noop;
Context.prototype.onAttached = noop;


export default Context;