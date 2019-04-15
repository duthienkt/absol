import XMLClassList from './XMLClassList';
import XMLConstant from './XMLConstant';

function XMLElement() {
    this.nodeType = XMLConstant.TYPE_ELEMENT;

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

    Object.defineProperty(this, 'classList', {
        value: new XMLClassList(this),
        writable: false
    })
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

XMLElement.prototype.appendChild = function (node) {
    node.remove();
    this.childNodes.push(node);
    node.parentNode = this;
    return node;
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

/**
 * @param {XMLElement|XMLText|XMLDeclaretionNode} node
 */
XMLElement.prototype.inserBefore = function (node, child) {
    if (node == child) return;
    var childIndex = -1;
    for (var i = 0; i < this.childNodes.length; ++i) {
        if (this.childNodes[i] == child) {
            childIndex = i;
            break;
        }
    }
    if (childIndex < 0) return;
    node.remove();
    node.parentNode = this;
    this.childNodes.push(null);
    var cIndex = this.childNodes.length - 2;
    while (cIndex >= 0) {
        if (this.childNodes[cIndex] == child) {
            this.childNodes[cIndex + 1] = node;
        }
        else
            this.childNodes[cIndex + 1] = this.childNodes[cIndex];
    }
};



XMLElement.prototype.remove = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
}

XMLElement.prototype.toObject = function () {
    return {
        nodeType: this.nodeType, tagName: this.tagName, attributes: Object.assign({}, this.attributes),
        childNodes: this.childNodes.map(function (child) {
            return child.toObject();
        })
    };
};



export default XMLElement;