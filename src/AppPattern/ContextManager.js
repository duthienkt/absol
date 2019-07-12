function ContextManager(){
    this.__contextData__ = {};
}

/**
 * @param {String} key
 * @returns {*}
 */
ContextManager.prototype.get = function(key){
    return this.__contextData__[key];
};


/**
 * @param {String} key
 * @param {*} value
 * @returns {Context}
 */
ContextManager.prototype.set = function(key, value){
    this.__contextData__[key] = value;
    return this;
};

ContextManager.prototype.assign = function(obj){
    Object.assign(this.__contextData__, obj);
};

export default ContextManager;