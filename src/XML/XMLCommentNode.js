import XMLConstant from "./XMLConstant";

function XMLCommentNode(data) {
    this.nodeType = XMLConstant.TYPE_COMMENT;
    /**
     * @type {XMLNode}
     */
    this.parentNode;
    /**
     * @type {String}
     */
    this.data = data || '';
}


XMLCommentNode.prototype.remove = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
};


export default XMLCommentNode;