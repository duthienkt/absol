import XMLConstant from "./XMLConstant";

function XMLDeclaretionNode() {
    this.nodeType = XMLConstant.TYPE_DECLARATION;
    this.parentNode;
    /**
     * @type {String}
     */
    this.tagName = '';
    /**
    * @type {XMLElement}
    */
    this.parentNode;
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

XMLDeclaretionNode.prototype.remove = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
};


XMLDeclaretionNode.prototype.toObject = function () {
    return { nodeType: this.nodeType, tagName: this.tagName, attributes: Object.assign({}, this.attributes) };
};


export default XMLDeclaretionNode;