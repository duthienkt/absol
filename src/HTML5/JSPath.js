function JSPath(props) {
    this.path = props.path;
}


/**
 *
 * @param {Element} element
 * @returns {Boolean}
 */
JSPath.prototype.match = function (element, query) {
    var matchTag;
    var i;
    var key;
    var value;

    if (query.id) {
        if (!element.getAttribute || element.getAttribute('id') != query.id) return false;
    }
    if (query.tagName) {
        matchTag = false;
        if (element._azar_extendTags && element._azar_extendTags[query.tagName]) matchTag = true;
        matchTag = matchTag || ((element.tagName || '').toUpperCase() == query.tagName.toUpperCase());
        if (!matchTag) return false;
    }
    if (query.classList)
        for (i = 0; i < query.classList.length; ++i) {
            if (!element.classList || !element.classList.contains(query.classList[i])) return false;
        }
    if (query.attributes) {
        for (key in query.attributes) {
            if (element.attr) {
                value = element.attr(key);
                if (value != query.attributes[key]) return false;
            }
            else if (element.getAttribute) {
                value = element.getAttribute(key);
                if (value != query.attributes[key]) return false;
            }
        }
    }
    return true;
};

/**
 * Warning : still fail in some testcase
 */
JSPath.prototype.findFirst = function (root, onFound) {
    var queue = [{ e: root, i: 0 }];
    var current;
    var isMatched;
    var currentElt;
    var currentI;
    var trackI;
    var trackElement;
    var isTrackMatch;
    var l;
    var i;

    while (queue.length > 0) {
        current = queue.shift();
        isMatched = false;
        currentElt = current.e;
        currentI = current.i;
        if (this.match(currentElt, this.path[currentI])) {
            if (this.path[currentI].childCombinate) {
                trackI = currentI;
                trackElement = currentElt;
                isTrackMatch = true;
                while (isTrackMatch && trackI > 0 && this.path[trackI].childCombinate) {
                    if (!trackElement.parentNode || !this.match(trackElement.parentNode, this.path[trackI - 1])) {
                        isTrackMatch = false;
                    }
                    else {
                        trackElement = trackElement.parentNode;
                        trackI--;
                    }
                }
                if (isTrackMatch) isMatched = true;
            }
            else {
                isMatched = true;
            }
        }


        if (isMatched && currentI + 1 === this.path.length) {
            if (!onFound || (onFound && onFound(currentElt)))
                return currentElt;
        }

        if (currentElt.childNodes) {
            l = currentElt.childNodes.length;
            for (i = 0; i < l; ++i) {
                if (currentElt.childNodes[i].tagName)
                    queue.push({
                        e: currentElt.childNodes[i],
                        i: currentI + (isMatched && currentI + 1 < this.path.length ? 1 : 0)
                    });
            }
        }
    }
    return undefined;
};


JSPath.prototype.findAll = function (root, onFound) {
    var res = [];
    this.findFirst(root, function onFoundWrapper(e) {
        if (!onFound || onFound(e)) {
            res.push(e);
        }
        return false;//continue search
    });
    return res;
};




/**
 * Find nearest ancestor of descendant that matches the query
 * @param descendant
 * @param onFound
 */
JSPath.prototype.findUp = function (descendant, onFound) {
    var stack = [{
        e: descendant,
        i: this.path.length - 1,
        cc: false,//can continue if not match, used for child combinate
        cr: null//candidate result
    }];
    var current;
    var isMatched;
    while (stack.length > 0) {
        current = stack.shift();
        isMatched = false;
        isMatched = this.match(current.e, this.path[current.i]);
        if (isMatched && current.i === this.path.length - 1) current.cr = current.e;
        if (isMatched && current.i === 0) {
            if (!onFound || onFound(current.cr)) {
                return  current.cr;
            }
            while (stack.length > 0 && stack[stack.length - 1].e === current.cr) {//cur is matched with query
                stack.pop();
            }
        }
        if (!isMatched && current.cc) continue;//cancel
        if (current.e.parentNode) {
            stack.push({
                e: current.e.parentNode,
                i: current.i,
                cc: false,
                cr: current.cr
            });
            if (isMatched && current.i > 0) {
                stack.push({
                    e: current.e.parentNode,
                    i: current.i - 1,
                    cr: current.cr,
                    cc: this.path[current.i].childCombinate
                });
            }
        }
    }
};

/**
 * Find nearest ancestor of descendant that matches the query
 * @param descendant
 * @param onFound
 */
JSPath.prototype.findUpAll = function (descendant, onFound) {
    var result = [];
    this.findUp(descendant, function (e) {
       if (!onFound || onFound(e)) {
           result.push(e);
       }
       return false;//continue search
    });
    return result;
};

var identRegex = /[a-zA-Z0-9\-_]+/;
var stringRegex = /"(([^"\\]*|(\\.))*)"/;
var classRegex = new RegExp('\\.' + identRegex.source);
var nthChildRegex = /:nth-child\(\d+\)/;
var firstChildRegex = /:first-child/;
var lastChildRegex = /:last-child/;
var pseudoClassRegex = new RegExp(nthChildRegex.source + '|' + firstChildRegex.source + '|' + lastChildRegex.source);

var idRegex = new RegExp('#' + identRegex.source);
var booleanRegex = /true|false/;
var valueRegex = new RegExp(stringRegex.source + '|' + booleanRegex.source);
var attributeRegex = new RegExp('\\[\\s*(' + identRegex.source + ')\\s*(=\\s*(' + valueRegex.source + '))\\]');

var queryRegex = new RegExp([
    '(',
    identRegex.source, '|',
    attributeRegex.source, '|',
    classRegex.source, '|',
    idRegex.source, '|',
    pseudoClassRegex.source,
    ')+'
].join(''));


JSPath.__tagRegex = new RegExp(queryRegex.source + '|\\>', 'g');
JSPath.__tagNameRegex = new RegExp('^' + identRegex.source, 'i');
JSPath.__classRegex = new RegExp(classRegex.source, 'g');
JSPath.__idRegex = new RegExp(idRegex.source, 'i');
JSPath.__pseudoClassRegex = new RegExp(pseudoClassRegex.source, 'g');
JSPath.__nthChildNumberRegex = /:nth-child\((\d+)\)/;

JSPath.__attrRegex = new RegExp(attributeRegex.source, 'g');


JSPath.parseQuery = function (s) {
    var tag = {};

    s = s.replace(JSPath.__attrRegex, function (full, name, assign, jsonTextValue) {
        tag.attributes = tag.attributes || {};
        if (assign) {
            tag.attributes[name] = JSON.parse(jsonTextValue);
        }
        else
            tag.attributes[name] = true;
        return '';
    });

    var classList = s.match(this.__classRegex);
    var idList = s.match(this.__idRegex);
    var tagList = s.match(this.__tagNameRegex);
    if (idList && idList.length > 0) {
        tag.id = idList[0].substring(1);
    }
    if (tagList && tagList.length > 0) {
        tag.tagName = tagList[0].trim();
    }
    if (classList && classList.length > 0) {
        tag.classList = classList.map(function (s) {
            return s.substring(1)
        });
    }
    /*
        var pseudoClasses = s.match(this.__pseudoClassRegex);
        if (pseudoClasses) {
            pseudoClasses.forEach(function (pseudo) {
                if (pseudo === ':first-child') {
                    tag.firstChild = true;
                }
                else if (pseudo === ':last-child') {
                    tag.lastChild = true;
                }
                else {
                    var nthMatch = pseudo.match(this.__nthChildNumberRegex);
                    if (nthMatch) {
                        tag.nthChild = parseInt(nthMatch[1]);
                    }
                }
            }.bind(this));
        }

     */
    return tag;
};


/**
 * @param {String} text
 * @returns {JSPath}
 */
JSPath.compileJSPath = function (text) {
    var tagTexts = text.match(this.__tagRegex) || [''];
    var path = [];
    var childCombinate = false;
    var i;
    var s;
    var tag;
    for (i = 0; i < tagTexts.length; ++i) {
        s = tagTexts[i];
        if (s === '>') {
            childCombinate = true;
        }
        else {
            tag = this.parseQuery(s);
            tag.childCombinate = childCombinate;
            path.push(tag);
            childCombinate = false;
        }
    }
    return new JSPath({
        path: path
    });
};


export default JSPath;