function XMLDeclaretionNode() {
    /**
     * @type {String}
     */
    this.tagName = '';
    this.attributes = {};
}

/**
 * @param {String} name attribute name
 */
XMLDeclaretionNode.prototype.getAttribute = function (name) {
    return this.attributes[name];
};

/**
 * @param {String} name attribute name
 * @param {String} value 
 */
XMLDeclaretionNode.prototype.setAttribute = function (name, value) {
    this.attributes[name] = value;
};

/**
 * @param {String} name attribute name
 */
XMLDeclaretionNode.prototype.removeAttribute = function (name) {
    delete this.attributes[name];
};

export default XMLDeclaretionNode;