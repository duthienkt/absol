function XMLTextNode(data) {
    /**
     * @type {XMLNode}
     */
    this.parentNode;
    this.data = data || '';
}


XMLTextNode.prototype.remove = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
};



export default XMLTextNode;