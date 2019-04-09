
/**
 * 
 * @param {{id:string, classes:string[], tag:string}} option 
 */
function ElementMatcher(option) {
    option = option || {};
    for (var key in option) {
        this[key] = option[key];
    }
};


/**
 * 
 * @param {Element} element 
 * @returns {Boolean}
 */
ElementMatcher.prototype.match = function (element) {
    if (this.id) {
        if (!element.getAttribute || element.getAttribute('id') != this.id) return false;
    }
    if (this.tag) {
        var matchTag = false;
        if (element.extendTags && element.extendTags[this.tag]) matchTag = true;
        matchTag = matchTag || ((element.tagName || '').toUpperCase() == this.tag.toUpperCase());
        if (!matchTag) return false;
    }
    if (this.class)
        for (var i = 0; i < this.class.length; ++i) {
            if (!element.classList || !element.classList.contains(this.class[i])) return false;
        }
    return true;
};

/**
* 
* @param {Element} root 
* @param {function} onFound
* @returns {Element} 
*/
ElementMatcher.prototype.findFirstBFS = function (root, onFound) {
    var queue = [root];
    var current;
    while (queue.length > 0) {
        current = queue.shift();
        if (this.match(current)) {
            if (!onFound || (onFound && onFound(current)))
                return current;
        }
        if (current.childNodes) {
            for (var i = 0; i < current.childNodes.length; ++i)
                queue.push(current.childNodes[i]);
        }
    }
    return undefined;
};
/**
 * 
 * @param {Element} root 
 */
ElementMatcher.prototype.findFirstDFS = function (root, onFound) {
    var stack = [root];
    var current;
    while (stack.length > 0) {
        current = stack.pop();
        if (this.match(current)) {
            if (!onFound || (onFound && onFound(current)))
                return current;
        }
        if (current.childNodes) {
            for (var i = 0; i < current.childNodes.length; ++i)
                stack.push(current.childNodes[i]);
        }
    }
    return undefined;
};

/**
 * 
 * @param {Element} root
 * @return {Array} 
 */
ElementMatcher.prototype.findAll = function (root) {
    var res = [];
    var stack = [root];
    var current;
    while (stack.length > 0) {
        current = stack.pop();
        if (this.match(current)) res.push(current);
        if (current.childNodes) {
            for (var i = 0; i < current.childNodes.length; ++i)
                stack.push(current.childNodes[i]);
        }
    }
    return res;
};



/**
 * 
 * @param {string} s
 * @returns {{tag:string,id:string, classes:string[]}} 
 */
ElementMatcher.parseElementSelector = function (s) {
    s = s || '';
    s = s.trim();
    var tagRex = /(^|\s)[a-zA-Z0-9\-\_]+/i;
    var classRex = /\.[a-zA-Z0-9\-\_]+/g;
    var idRex = /\#[a-zA-Z0-9\-\_]+/i;
    var classList = s.match(classRex);
    var id = s.match(idRex);
    var tag = s.match(tagRex);
    var res = {};
    if (tag && tag.length > 0)
        res.tag = tag[0].trim();
    if (id && id.length > 0)
        res.id = id[0].substring(1);
    if (classList && classList.length > 0)
        res.class = classList.map(function (s) { return s.substring(1) });
    return res;
}
export default ElementMatcher;