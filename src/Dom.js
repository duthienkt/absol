import ElementMatcher from './ElementMatcher';
import OOP from './OOP';
import Element from './Element';

function Dom(option) {
    option = option || {};
    this.creator = option.creator || {};
    this.$ = this.selectAttacth.bind(this);
    this._ = this.create.bind(this);
    this.buildDom = this._;
}

/**
 * DFS
 * @param {string} query 
 * @param {Element} root 
 * @param {function} onFound - return true to stop find 
 */
Dom.prototype.selectAttacth = function (query, root, onFound) {
    var res;
    if (Dom.isDomNode(query)) res = query;
    else
        res = this.select(query, root, onFound);
    if (res) this.attach(res);
    return res;
};


/**
 * DFS
 * @param {string} query 
 * @param {Element} root 
 * @param {function} onFound - return true to stop find 
 */
Dom.prototype.select = function (query, root, onFound) {
    root = root || document.documentElement;
    var matcher = new ElementMatcher(ElementMatcher.parseElementSelector(query));
    return matcher.findFirstBFS(root, onFound);
};

/**
 * 
 * @param {Element} element 
 */
Dom.prototype.attach = function (element) {
    Element.call(element);

};

/**
 * 
 * @param {Object} option
 * @returns {Element} 
 */
Dom.prototype.create = function (option, isInherited) {
    var res;
    var prototype;
    var property;
    if (absol.isDomNode(option)) {
        res = option;
        option = {};
        isInherited = true;
    }
    else if (typeof option == 'string') {
        option = option.trim();
        if (option[0] == '<') {
            option = option.replace(/>\s+</gm, '><').trim();
            var temTag = 'div';
            if (option.startsWith('<td')) temTag = 'tr';
            if (option.startsWith('<tr')) temTag = 'tbody';
            var tempDiv = document.createElement(temTag);
            tempDiv.innerHTML = option;
            res = tempDiv.childNodes[0];
        }
        else {
            var queryObj = ElementMatcher.parseElementSelector(option);
            option = { tag: queryObj.tag, class: queryObj.class || [] };
            if (queryObj.id) option.attr = { id: queryObj.id };

            option.tag = option.tag || 'div';
            if (!this.creator[option.tag]) {
                res = document.createElement(option.tag);
                option.data && Object.assign(res, option.data);
            }
            else {
                res = this.creator[option.tag](option.data);
                res.extendTags = res.extendTags || {};
                res.extendTags[option.tag] = true;
                prototype = this.creator[option.tag].prototype;
                property = this.creator[option.tag].property;
            }
        }
    } else {
        option = option || {};
        option.tag = option.tag || 'div';
        if (!this.creator[option.tag]) {
            res = document.createElement(option.tag);
            option.data && Object.assign(res, option.data);
        }
        else {
            res = this.creator[option.tag](option.data);
            res.extendTags = res.extendTags || {};
            res.extendTags[option.tag] = true;
            prototype = this.creator[option.tag].prototype;
            property = this.creator[option.tag].property;
        }
    }


    this.attach(res);
    if (property) {
        Object.defineProperties(res, property);
    }
    if (prototype) {
        OOP.extends(res, prototype);
    }
    option.attr && res.attr(option.attr);
    option.extendEvent && res.defineEvent(option.extendEvent);
    option.on && res.on(option.on);
    option.once && res.once(option.once);
    option.class && res.addClass(option.class);
    option.style && res.addStyle(option.style);
    option.id && res.attr('id', option.id);
    //todo:attach option
    if (option.child) {
        option.child = option.child instanceof Array ? option.child : [option.child];
        for (var i = 0; i < option.child.length; ++i) {
            res.addChild(this.create(option.child[i]));
        }
    }

    if (!isInherited) res.init(option.props);
    return res;
};



/**
 * 
 * @param {*} o 
 * @returns {Boolean}
 */
Dom.isDomNode = function (o) {
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
};

/**
 * DFS
 * @param {string} query
 * @param {Element} root
 * @param {function} onFound - return true to stop find
 */

Dom.prototype.selectAttacth = function (query, root, onFound) {
    var res;
    if (Dom.isDomNode(query)) res = query;
    else
        res = this.select(query, root, onFound);
    if (res) this.attach(res);
    return res;
};

/**
 * @param {HTMLElement} element
 */
Dom.activeFullScreen = function (element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};


Dom.deactiveFullScreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

Dom.isFullScreen = function () {
    var fullScreenElement = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
    return !!fullScreenElement;
};


/**
 * @param {HTMLElement} element
 * @returns {ClientRect}
 */
Dom.traceOutBoundingClientRect = function (current) {
    var left = 0;
    var right = 10000;
    var top = 0;
    var bottom = 10000;
    while (current) {
        absol.$(current);
        if (current.getComputedStyleValue) {
            var ox = current.getComputedStyleValue('overflow-x') != "visible";
            var oy = current.getComputedStyleValue('overflow-y') != "visible";
            var isBody = current.tagName.toLowerCase() == 'body';
            if (ox || oy || isBody) {
                var bound = current.getBoundingClientRect();
                if (ox || isBody) {
                    left = Math.max(left, bound.left);
                    right = Math.min(right, bound.right);
                }
                if (oy || isBody) {
                    top = Math.max(top, bound.top);
                    bottom = Math.min(bottom, bound.bottom);
                }
            }
        }
        if (isBody) break;
        current = current.parentElement;

    }
    return { left: left, right: right, top: top, bottom: bottom, width: right - left, height: bottom - top };
};

Dom.fontFaceIsLoaded = function (fontFace, timeout) {
    timeout = timeout || 0;
    var element = _({
        tag: 'span',
        style: {
            visibility: 'hidden',
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            'font-size': '256px'

        }, props: {
            innerHTML: "Test string long long long"
        }
    });
    element.addTo($('body'));
    return element.afterAttached().then(function () {
        var lastOffsetWidth = element.getBoundingClientRect().width;
        element.addStyle('font-family', fontFace);
        return new Promise(function (resolve, reject) {
            function check(remainTime) {
                if (remainTime < 0) {
                    resolve(false);
                    element.selfRemove();
                }
                else
                    requestAnimationFrame(function () {
                        var currentOffsetWidth = element.getBoundingClientRect().width;
                        if (currentOffsetWidth != lastOffsetWidth) {
                            resolve(true);
                            element.selfRemove();
                        }
                        else
                            check(remainTime - 10);
                    }, 10);
            }
            check(timeout);
        });
    });
};

Dom.getScreenSize = function () {
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    var height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    return { WIDTH: width, HEIGHT: height, width: width, height: height };
};




export default Dom;