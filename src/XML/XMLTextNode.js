import XMLConstant from "./XMLConstant";

function XMLTextNode(data) {
    this.nodeType = XMLConstant.TYPE_TEXT;
    /**
     * @type {XMLNode}
     */
    this.parentNode;
    /**
     * @type {String}
     */
    this.data = data || '';
}


XMLTextNode.prototype.remove = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
};


XMLTextNode.prototype.toObject = function () {
    return { nodeType: this.nodeType, data: this.data };
};


export default XMLTextNode;