import Element from './Element';
import JSPath from './JSPath';
import OOP from './OOP';



function Dom(option) {
    option = option || {};
    this.creator = option.creator || {};


    this.creator.__svg__ = function () {
        var temp = document.createElement('div');
        temp.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';
        var element = temp.childNodes[0];
        var prototypes = Object.getOwnPropertyDescriptors(Element.prototype);
        Object.defineProperties(element, prototypes);
        Element.call(element);
        return element;
    };

    Object.defineProperty(this.creator, 'svg', {
        set: function () {
            console.error(new Error());
        },
        get: function () {
            return this.__svg__;
        }
    });

    this.$ = this.selectAttacth.bind(this);
    this._ = this.create.bind(this);
    this.buildDom = this._;
    this.defaultTag = 'div';
}


Dom.prototype.fromCode = function (code) {
    code = code.trim().replace(/>\s+</gm, '><');
    var temTag = 'div';
    if (code.startsWith('<td')) temTag = 'tr';
    if (code.startsWith('<tr')) temTag = 'tbody';
    var tempDiv = document.createElement(temTag);
    tempDiv.innerHTML = code;
    var element = tempDiv.childNodes[0];
    var prototypes = Object.getOwnPropertyDescriptors(Element.prototype);
    Object.defineProperties(element, prototypes);
    Element.call(element);
    return element;
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
 * DFS
 * @param {string} query 
 * @param {Element} root 
 * @param {function} onFound - return true to stop find 
 */
Dom.prototype.select = function (query, root, onFound) {
    root = root || document.documentElement;
    var matcher = JSPath.compileJSPath(query);
    return matcher.findFirst(root, onFound);
};

/**
 * 
 * @param {Element} element 
 */
Dom.prototype.attach = function (element) {
    if (typeof element.attr == 'function') return;
    var prototypes = Object.getOwnPropertyDescriptors(Element.prototype);
    Object.defineProperties(element, prototypes);
    Element.call(element);
};


Dom.prototype.makeNewElement = function (tagName) {
    return document.createElement(tagName);
};

Dom.prototype.makeNewTextNode = function (data) {
    return document.createTextNode(data);
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
    var attribute;
    if (Dom.isDomNode(option)) {
        res = option;
        option = {};
        isInherited = true;
    }
    else if (typeof option == 'string') {
        option = option.trim();
        if (option[0] == '<') {

            option = option.trim();
            res = this.fromCode(option);
            option = {};
        }
        else {
            var queryObj = JSPath.parseQuery(option);
            option = {};
            option.tag = queryObj.tagName || this.defaultTag;
            if (queryObj.classList && queryObj.classList.length > 0)
                option.class = queryObj.classList;
            if (queryObj.id) option.id = queryObj.id;
            if (queryObj.attributes) option.attr = queryObj.attributes;

            if (!this.creator[option.tag]) {
                res = this.makeNewElement(option.tag);
                option.data && Object.assign(res, option.data);
            }
            else {
                res = this.creator[option.tag](option.data);
                res._azar_extendTags = res._azar_extendTags || {};
                res._azar_extendTags[option.tag] = true;
                prototype = this.creator[option.tag].prototype;
                property = this.creator[option.tag].property;
                attribute = this.creator[option.tag].attribute;

            }
        }
    } else {

        option = option || {};
        if (option.text) {//is textNode
            return this.makeNewTextNode(option.text);
        }
        else {
            option.tag = option.tag || this.defaultTag;
            if (!this.creator[option.tag]) {
                res = this.makeNewElement(option.tag);
                option.data && Object.assign(res, option.data);
            }
            else {
                res = this.creator[option.tag](option.data);
                res._azar_extendTags = res._azar_extendTags || {};
                res._azar_extendTags[option.tag] = true;
                prototype = this.creator[option.tag].prototype;
                property = this.creator[option.tag].property;
                attribute = this.creator[option.tag].attribute;
            }
        }
    }
    console.log(option.tag, this.creator[option.tag]&& this.creator[option.tag])

    this.attach(res);
    if (property) {
        Object.defineProperties(res, property);
    }
    if (prototype) {
        OOP.extends(res, prototype);
    }
    if (attribute) {
        res.defineAttributes(attribute);
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
    var screenSize = Dom.getScreenSize();
    var left = 0;
    var right = screenSize.width;
    var top = 0;
    var bottom = screenSize.height;
    while (current) {

        var ox = Element.prototype.getComputedStyleValue.call(current, 'overflow-x') != "visible";
        var oy = Element.prototype.getComputedStyleValue.call(current, 'overflow-y') != "visible";
        var isHtml = current.tagName.toLowerCase() == 'html';
        if (ox || oy || isHtml) {
            var bound = current.getBoundingClientRect();
            if (ox || isHtml) {
                left = Math.max(left, bound.left);
                right = Math.min(right, bound.right);
            }
            if (oy || isHtml) {
                top = Math.max(top, bound.top);
                bottom = Math.min(bottom, bound.bottom);
            }
        }

        if (isHtml) break;
        current = current.parentElement;
    }
    return { left: left, right: right, top: top, bottom: bottom, width: right - left, height: bottom - top };
};


Dom.fontFaceIsLoaded = function (fontFace, timeout) {
    timeout = timeout || 0;

    var element = this.ShareInstance._({
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
    element.addTo(document.body);
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


Dom.waitImageLoaded = function (img) {
    var isLoaded = true;
    if (!img.complete) {
        isLoaded = false;
    }
    if (img.naturalWidth === 0) {
        isLoaded = false;
    }
    if (isLoaded) return Promise.resolve();
    return new Promise(function (rs) {
        img.onload = function () {
            rs();
        }
        setTimeout(5000, rs);
    });
    // No other way of checking: assume it’s ok.
}

Dom.imageToCanvas = function (element) {
    if (typeof element == 'string') {
        element = Dom.ShareInstance.$(element);
    }
    if (element.tagName.toLowerCase() == 'img') {
        var preRender = Dom.ShareInstance._('div');
        preRender.addStyle({
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '-10000',
            opacity: '0'
        }).addTo(document.body);

        var canvas = document.createElement("canvas");
        preRender.addChild(canvas);


        return Dom.waitImageLoaded(element).then(function () {
            canvas.width = element.width;
            canvas.height = element.height;
            var context = canvas.getContext("2d");
            context.drawImage(element, 0, 0);
            preRender.selfRemove();
            return canvas;
        });
    }
    else {
        throw new Error("Element must be image");
    }
};


Dom.ShareInstance = new Dom();




Dom.scrollWidthPromise;

Dom.documentReady = new Promise(function (resolve) {
    if (document.body) {
        resolve()
    }
    else {
        window.addEventListener("load", resolve);
    }
});

Dom.getScrollSize = function () {
    if (!Dom.scrollWidthPromise)
        Dom.scrollWidthPromise = new Promise(function (resolve) {
            function prerender() {
                var parent = Dom.ShareInstance._({ style: { 'z-index': '-100', opacity: '0', width: '100px', height: '100px', overflow: 'scroll', top: '0', left: '0', 'box-sizing': 'content-box', position: 'fixed' } })
                    .addTo(document.body);
                var child = Dom.ShareInstance._({ style: { width: '100%', height: '100%' } }).addTo(parent);
                requestAnimationFrame(function () {
                    var parentBound = parent.getBoundingClientRect();
                    var childBound = child.getBoundingClientRect();
                    resolve({ width: parentBound.width - childBound.width, height: parentBound.height - childBound.height })
                    parent.selfRemove();
                });
            }
            Dom.documentReady.then(prerender);
        });
    return Dom.scrollWidthPromise;

};



Dom.lastResizeTime = 0;

Dom.ResizeSystemElts = [];

Dom.ResizeSystemCacheElts = undefined;

Dom.removeResizeSystemTrash = function () {
    Dom.ResizeSystemElts = Dom.ResizeSystemElts.filter(function (element) {
        return Element.prototype.isDescendantOf.call(element, document.body);
    });
};

Dom.addToResizeSystem = function (element) {
    for (var i = 0; i < Dom.ResizeSystemElts.length; ++i)
        if (Element.prototype.isDescendantOf.call(element, Dom.ResizeSystemElts[i])) {
            return false;
        }
    Dom.ResizeSystemElts = Dom.ResizeSystemElts.filter(function (e) {
        return !Element.prototype.isDescendantOf.call(e, element);
    });
    Dom.ResizeSystemElts.push(element);
    return true;
};

Dom.updateResizeSystem = function () {
    var now = new Date().getTime();
    if (now - 100 > Dom.lastResizeTime) {
        Dom.removeResizeSystemTrash();
        Dom.ResizeSystemCacheElts = undefined;
    }

    Dom.lastResizeTime = now;
    function visitor(child) {

        if (typeof child.requestUpdateSize == 'function') {
            child.requestUpdateSize();
            return true;
        }
        else if (typeof child.updateSize == 'function') {
            child.updateSize();
            return true;
        }
        else if (typeof child.onresize == 'function') {
            child.onresize();
            return true;
        }
    }
    if (Dom.ResizeSystemCacheElts === undefined) {
        Dom.ResizeSystemCacheElts = [];
        Dom.ResizeSystemElts.forEach(function (e) {
            Dom.ShareInstance.$('', e, function (child) {
                if (visitor(child))
                    Dom.ResizeSystemCacheElts.push(child);
            });
        });

    }
    else {
        Dom.ResizeSystemCacheElts.forEach(visitor);
    }
};

window.addEventListener('resize', Dom.updateResizeSystem);




/***
 * if this element is attached, error event will be fired
 * @returns {HTMLElement}
 * 
 */
Dom.ShareInstance.creator.attachhook = function () {
    var res = Dom.ShareInstance._({
        tag: 'img',
        class: 'absol-attachhook',
        style: {
            display: 'none'
        },
        attr: {
            src: ''
        }
    });
    return res;
};



export default Dom;