function XMLElement() {
    /**
     * @type {String}
     */
    this.tagName = '';
    /**
     * @type {XMLElement}
     */
    this.parentNode;
    this.attributes = {};
    /**
     * @type {Array} Array of  XMLElement or XMLText
     */
    this.childNodes = [];
}

/**
 * @param {String} name attribute name
 */
XMLElement.prototype.getAttribute = function (name) {
    return this.attributes[name];
};

/**
 * @param {String} name attribute name
 * @param {String} value 
 */
XMLElement.prototype.setAttribute = function (name, value) {
    this.attributes[name] = value;
};

/**
 * @param {String} name attribute name
 */
XMLElement.prototype.removeAttribute = function (name) {
    delete this.attributes[name];
};

XMLElement.prototype.appendChild = function (child) {
    child.remove();
    this.childNodes.push(child);
    child.parentNode = this;
};

/**
 * @param {XMLElement} child
 * @returns {XMLElement} removed node
 */
XMLElement.prototype.removeChild = function (child) {
    var result;
    if (this == child.parentNode) {
        var j = 0;
        for (var i = 0; i < this.childNodes.length; ++i) {
            if (child != this.childNodes[i]) {
                this.childNodes[j] = this.childNodes[i];
                ++j;
            }
            else {
                child.parentNode = undefined;
                result = child;
            }
        }
        while (j > this.childNodes.length) {
            this.childNodes.pop();
        }
    }
    return result;
};

XMLElement.prototype.remove = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
}



export default XMLElement;