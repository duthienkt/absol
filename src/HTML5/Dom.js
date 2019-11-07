import Element from './Element';
import JSPath from './JSPath';
import OOP from './OOP';
import getFunctionName from '../String/getFunctionName';


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
    var creator;
    if (Dom.isDomNode(option)) {
        option = { elt: option };
    }
    else {
        var optionType = typeof option;
        if (optionType == 'string') {
            option = option.trim();
            if (option[0] == '<') {
                option = { elt: this.fromCode(option) };
            }
            else {
                var queryObj = JSPath.parseQuery(option);
                option = {};
                option.tag = queryObj.tagName || this.defaultTag;
                if (queryObj.classList && queryObj.classList.length > 0)
                    option.class = queryObj.classList;
                if (queryObj.id) option.id = queryObj.id;
                if (queryObj.attributes) option.attr = queryObj.attributes;
            }
        }
    }

    if (typeof (option.text) == 'string') {//is textNode
        return this.makeNewTextNode(option.text);
    }

    option.tag = option.tag || this.defaultTag;
    creator = this.creator[option.tag];
    if (!option.elt) {
        if (creator) {
            if (creator.render) {
                option.elt = creator.render(option.data);
            }
            else {
                option.elt = creator(option.data);
            }

        }
        else {
            option.elt = this.makeNewElement(option.tag);
            Object.assign(option.elt, option.data);
        }
    }
    res = option.elt;
    this.attach(res);
    if (creator) {
        res._azar_extendTags = res._azar_extendTags || {};
        res._azar_extendTags[option.tag] = true;
        creator.property && Object.defineProperties(res, creator.property);
        creator.prototype && OOP.extends(res, creator.prototype);
        creator.attribute && res.defineAttributes(creator.attribute);
        if(creator.render) {
            creator.eventHandler && OOP.bindFunctions(res, creator.eventHandler);
            creator.call(res);
        }
    }

    option.extendEvent && res.defineEvent(option.extendEvent);

    option.attr && res.attr(option.attr);
    option.on && res.on(option.on);
    option.once && res.once(option.once);
    option.class && res.addClass(option.class);
    option.style && res.addStyle(option.style);
    option.id && res.attr('id', option.id);
    if (!isInherited) res.init(option.props);

    //todo:attach option
    if (option.child) {
        option.child = option.child instanceof Array ? option.child : [option.child];
        for (var i = 0; i < option.child.length; ++i) {
            res.addChild(this.create(option.child[i]));
        }
    }
    return res;
};


Dom.prototype.install = function (arg0, arg1) {
    var _this = this;
    if (arguments.length == 1) {
        if (arg0.creator && arg0.create && arg0.select) {
            // is a dom core
            var creator = arg0.creator;
            Object.keys(creator).forEach(function (key) {
                if (key.startsWith('_') || key.startsWith('$')) return;
                var func = creator[key];
                if (typeof (func) == 'function')
                    if (_this.creator[key] != func)
                        _this.creator[key] = func;
            });
        }
        else if (typeof (arg0) == 'function') {
            var name = getFunctionName(arg0) || arg0.name;
            if (name) {
                this.creator[name.toLowerCase()] = arg0;
            }
            else {
                console.error('No ident name of creator function', arg0);
            }
        }
        else if (typeof arg0 == 'object') {
            Object.keys(arg0).forEach(function (key) {
                if (key.startsWith('_') || key.startsWith('$')) return;
                var func = arg0[key];
                if (typeof (func) == 'function')
                    if (_this.creator[key] != func)
                        _this.creator[key] = func;
            });
        }
        else if (arg0 instanceof Array) {
            arg0.forEach(function (func) {
                var name = getFunctionName(func) || func.name;
                if (name) {
                    _this.creator[name.toLowerCase()] = func;
                }
            });
        }
        else {
            console.error('Unknow data', arg0);
        }
    } else if (arguments.length == 2) {
        if (arg0 instanceof Array) {
            arg0.forEach(function (key) {
                if (key.match(arg0)) {
                    var func = arg1[key];
                    if (typeof (func) == 'function')
                        if (_this.create[key] != func)
                            _this.create[key] = func;
                }
            });
        }
        else if (arg0 instanceof RegExp) {
            Object.keys(arg1).forEach(function (key) {
                if (key.match(arg0)) {
                    var func = arg1[key];
                    if (typeof (func) == 'function')
                        if (_this.create[key] != func)
                            _this.create[key] = func;
                }
            });
        }
        else if (typeof (arg0) == 'string' && arg0.length > 0) {
            if (typeof (arg1) == 'function') {
                this.creator[arg0] = arg1;
            }
            else {
                console.error('arg1 is not a function');
            }
        }
    }
    else {
        console.error('Invalid param');
    }

    return this;
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
        if (img.addEventListener) {
            img.addEventListener('load', rs, false);
        }
        else {
            img.attachEvent('onload', rs, false);
        }
        setTimeout(rs, 5000);
    });
    // No other way of checking: assume it’s ok.
};

Dom.waitIFrameLoaded = function (iframe) {
    return new Promise(function (rs, rj) {
        if (document.all) {
            iframe.onreadystatechange = function () {
                if (iframe.readyState == "complete" || iframe.readyState == "loaded")
                    rs();
            };
        } else {
            iframe.onload = rs;
        }
        setTimeout(rs, 5000)
    });
};

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
        resolve();
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
                    resolve({ width: parentBound.width - childBound.width, height: parentBound.height - childBound.height });
                    parent.selfRemove();
                });
            }
            Dom.documentReady.then(prerender);
        });
    return Dom.scrollWidthPromise;

};


Dom.depthCloneWithStyle = function (originElt) {
    var newElt = originElt.cloneNode();//no deep
    if (!originElt.getAttribute && !originElt.getAttributeNS) return newElt;//is text node
    var cssRules = Element.prototype.getCSSRules.call(originElt);

    var cssKey = cssRules.reduce(function (ac, rule) {
        for (var i = 0; i < rule.style.length; ++i) {
            ac[rule.style[i]] = true;
        }
        return ac;
    }, {});
    for (var key in cssKey) {
        newElt.style[key] = Element.prototype.getComputedStyleValue.call(originElt, key);
    }
    var children = Array.prototype.map.call(originElt.childNodes, Dom.depthCloneWithStyle);
    for (var i = 0; i < children.length; ++i) {
        newElt.appendChild(children[i]);
    }
    return newElt;
};

Dom.copyStyleRule = function (sourceElt, destElt) {
    if (!sourceElt.getAttribute && !sourceElt.getAttributeNS) return destElt;//is text node
    if (!destElt.getAttribute && !destElt.getAttributeNS) return destElt;//is text node, nothing to copy
    var cssRules = Element.prototype.getCSSRules.call(sourceElt);

    var cssKey = cssRules.reduce(function (ac, rule) {
        for (var i = 0; i < rule.style.length; ++i) {
            ac[rule.style[i]] = true;
        }
        return ac;
    }, {});
    for (var key in cssKey) {
        destElt.style[key] = Element.prototype.getComputedStyleValue.call(sourceElt, key);
    }
    return destElt;
};


Dom.$printStyle = Dom.ShareInstance._('style[id="absol-print-preparing"]').addTo(document.head);
Dom.$printStyle.innerHTML = [
    '.absol-export-canvas-image{',
    '    display: none !important;',
    '}'
].join('\n');


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