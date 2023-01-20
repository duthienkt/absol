import JSPath from './JSPath';
import OOP from './OOP';
import getFunctionName from '../String/getFunctionName';
import AElementNS from "./ElementNS";
import AElement from './AElement';
import ResizeSystem from "./ResizeSystem";
import { parseClassAttr, parseStyleAttr } from "../JSX/attribute";
import AttachHook from "./AttachHook";

/***
 * @typedef {{"accept-charset":string, "http-equiv": string, accept : string, accesskey : string, action : string, align : string, allow : string, alt : string, async : string, autocapitalize : string, autocomplete : string, autofocus : string, autoplay : string, background : string, bgcolor : string, border : string, buffered : string, capture : string, challenge : string, charset : string, checked : string, cite : string, class : string, code : string, codebase : string, color : string, cols : string, colspan : string, content : string, contenteditable : string, contextmenu : string, controls : string, coords : string, crossorigin : string, csp : string, data : string, "data-*" : string, datetime : string, decoding : string, default : string, defer : string, dir : string, dirname : string, disabled : string, download : string, draggable : string, dropzone : string, enctype : string, enterkeyhint : string, for : string,     form : string, formaction : string, formenctype : string, formmethod : string, formnovalidate : string, formtarget : string, headers : string, height : string, hidden : string, high : string, href : string, hreflang : string, icon : string, id : string, importance : string, integrity : string, intrinsicsize : string, inputmode : string, ismap : string, itemprop : string, keytype : string, kind : string, label : string, lang : string, language : string, loading : string, list : string, loop : string, low : string, manifest : string, max : string, maxlength : string, minlength : string, media : string, method : string, min : string, multiple : string, muted : string, name : string, novalidate : string, open : string, optimum : string, pattern : string, ping : string, placeholder : string, poster : string, preload : string, radiogroup : string, readonly : string, referrerpolicy : string, rel : string, required : string, reversed : string, rows : string, rowspan : string, sandbox : string, scope : string, scoped : string, selected : string, shape : string, size : string, sizes : string, slot : string, span : string, spellcheck : string, src : string, srcdoc : string, srclang : string, srcset : string, start : string, step : string, style : string, summary : string, tabindex : string, target : string, title : string, translate : string, type : string, usemap : string, value : string, width : string, wrap : string, }} AElementAttributeDescriptor
 */

/**
 * @typedef {{"arabic-form":string,"baseline-shift": string, "accent-height": string,  "alignment-baseline": string,  "cap-height": string,  "clip-path": string,  "clip-rule": string,  "color-dinterpolation": string,  "color-interpolation-filters": string,  "color-profile": string,  "color-rendering": string,  "dominant-baseline": string,  "enable-background": string,  "fill-opacity": string,  "fill-rule": string,  "flood-color": string,  "flood-opacity": string,  "font-family": string,  "font-size": string,  "font-size-adjust": string,  "font-stretch": string,  "font-style": string,  "font-variant": string,  "font-weight": string,  "glyph-name": string,  "glyph-orientation-horizontal": string,  "glyph-orientation-vertical": string,  "horiz-adv-x": string,  "horiz-origin-x": string,  "image-rendering": string,  "letter-spacing": string,  "lighting-color": string,  "marker-end": string,  "marker-mid": string,  "marker-start": string,  "overline-position": string,  "overline-thickness": string,  "panose-1": string,  "paint-order": string,  "pointer-events": string,  "rendering-intent": string,  "shape-rendering": string,  "stop-color": string,  "stop-opacity": string,  "strikethrough-position": string,  "strikethrough-thickness": string,  "stroke-dasharray": string,  "stroke-dashoffset": string,  "stroke-linecap": string,  "stroke-linejoin": string,  "stroke-miterlimit": string,  "stroke-opacity": string,  "stroke-width": string,  "text-anchor": string,  "text-decoration": string,  "text-rendering": string,  "transform-origin": string,  "underline-position": string,  "underline-thickness": string,  "unicode-bidi": string,  "unicode-range": string,  "units-per-em": string,  "v-alphabetic": string,  "v-hanging": string,  "v-ideographic": string,  "v-mathematical": string,  "vector-effect": string,  "vert-adv-y": string,  "vert-origin-x": string,  "vert-origin-y": string,  "word-spacing": string,  "writing-mode": string,  "x-height": string,  "xlink:actuate": string,  "xlink:arcrole": string,  "xlink:href": string,  "xlink:role": string,  "xlink:show": string,  "xlink:title": string,  "xlink:type": string,  "xml:base": string,  "xml:lang": string,  "xml:space": string, accumulate:string, additive:string, allowReorder:string, alphabetic:string, amplitude:string, ascent:string, attributeName:string, attributeType:string, autoReverse:string, azimuth:string, baseFrequency:string, baseProfile:string, bbox:string, begin:string, bias:string, by:string, calcMode:string, class:string, clip:string, clipPathUnits:string, color:string, contentScriptType:string, contentStyleType:string, cursor:string, cx:string, cy:string, d:string, decelerate:string, descent:string, diffuseConstant:string, direction:string, display:string, divisor:string, dur:string, dx:string, dy:string, edgeMode:string, elevation:string, end:string, exponent:string, externalResourcesRequired:string, fill:NamedColor|Color|string, filter:string, filterRes:string, filterUnits:string, format:string, from:string, fr:string, fx:string, fy:string, g1:string, g2:string, glyphRef:string, gradientTransform:string, gradientUnits:string, hanging:string, height:string, href:string, hreflang:string, id:string, ideographic:string, in:string, in2:string, intercept:string, k:string, k1:string, k2:string, k3:string, k4:string, kernelMatrix:string, kernelUnitLength:string, kerning:string, keyPoints:string, keySplines:string, keyTimes:string, lang:string, lengthAdjust:string, limitingConeAngle:string, local:string, markerHeight:string, markerUnits:string, markerWidth:string, mask:string, maskContentUnits:string, maskUnits:string, mathematical:string, max:string, media:string, method:string, min:string, mode:string, name:string, numOctaves:string, offset:string, opacity:string, operator:string, order:string, orient:string, orientation:string, origin:string, overflow:string, path:string, pathLength:string, patternContentUnits:string, patternTransform:string, patternUnits:string, ping:string, points:string, pointsAtX:string, pointsAtY:string, pointsAtZ:string, preserveAlpha:string, preserveAspectRatio:string, primitiveUnits:string, r:string, radius:string, referrerPolicy:string, refX:string, refY:string, rel:string, repeatCount:string, repeatDur:string, requiredExtensions:string, requiredFeatures:string, restart:string, result:string, rotate:string, rx:string, ry:string, scale:string, seed:string, slope:string, spacing:string, specularConstant:string, specularExponent:string, speed:string, spreadMethod:string, startOffset:string, stdDeviation:string, stemh:string, stemv:string, stitchTiles:string, string:string, stroke:string, style:string, surfaceScale:string, systemLanguage:string, tabindex:string, tableValues:string, target:string, targetX:string, targetY:string, textLength:string, to:string, transform:string, type:string, u1:string, u2:string, unicode:string, values:string, version:string, viewBox:string, viewTarget:string, visibility:string, width:string, widths:string, x:string, x1:string, x2:string, xChannelSelector:string, y:string, y1:string, y2:string, yChannelSelector:string, z:string, zoomAndPan:string, }}  AElementNSAttributeDescriptor
 */

/***
 * @typedef {{abort:function(event:(UiEvent|Event)):void,afterprint:function(event:Event):void,animationend:function(event:AnimationEvent):void,animationiteration:function(event:AnimationEvent):void,animationstart:function(event:AnimationEvent):void,beforeprint:function(event:Event):void,beforeunload:function(event:(UiEvent|Event)):void,blur:function(event:FocusEvent):void,canplay:function(event:Event):void,canplaythrough:function(event:Event):void,change:function(event:Event):void,click:function(event:MouseEvent):void,contextmenu:function(event:MouseEvent):void,copy:function(event:ClipboardEvent):void,cut:function(event:ClipboardEvent):void,dblclick:function(event:MouseEvent):void,drag:function(event:DragEvent):void,dragend:function(event:DragEvent):void,dragenter:function(event:DragEvent):void,dragleave:function(event:DragEvent):void,dragover:function(event:DragEvent):void,dragstart:function(event:DragEvent):void,drop:function(event:DragEvent):void,durationchange:function(event:Event):void,ended:function(event:Event):void,error:function(event:(ProgressEvent|UiEvent|Event)):void,focus:function(event:FocusEvent):void,focusin:function(event:FocusEvent):void,focusout:function(event:FocusEvent):void,fullscreenchange:function(event:Event):void,fullscreenerror:function(event:Event):void,hashchange:function(event:HashChangeEvent):void,input:function(event:(InputEvent|Event)):void,invalid:function(event:Event):void,keydown:function(event:KeyboardEvent):void,keypress:function(event:KeyboardEvent):void,keyup:function(event:KeyboardEvent):void,load:function(event:(UiEvent|Event)):void,loadeddata:function(event:Event):void,loadedmetadata:function(event:Event):void,loadstart:function(event:ProgressEvent):void,message:function(event:Event):void,mousedown:function(event:MouseEvent):void,mouseenter:function(event:MouseEvent):void,mouseleave:function(event:MouseEvent):void,mousemove:function(event:MouseEvent):void,mouseover:function(event:MouseEvent):void,mouseout:function(event:MouseEvent):void,mouseup:function(event:MouseEvent):void,mousewheel:function(event:WheelEvent):void,offline:function(event:Event):void,online:function(event:Event):void,open:function(event:Event):void,pagehide:function(event:PageTransitionEvent):void,pageshow:function(event:PageTransitionEvent):void,paste:function(event:ClipboardEvent):void,pause:function(event:Event):void,play:function(event:Event):void,playing:function(event:Event):void,popstate:function(event:PopStateEvent):void,progress:function(event:Event):void,ratechange:function(event:Event):void,resize:function(event:(UiEvent|Event)):void,reset:function(event:Event):void,scroll:function(event:(UiEvent|Event)):void,search:function(event:Event):void,seeked:function(event:Event):void,seeking:function(event:Event):void,select:function(event:(UiEvent|Event)):void,show:function(event:Event):void,stalled:function(event:Event):void,storage:function(event:StorageEvent):void,submit:function(event:Event):void,suspend:function(event:Event):void,timeupdate:function(event:Event):void,toggle:function(event:Event):void,touchcancel:function(event:TouchEvent):void,touchend:function(event:TouchEvent):void,touchmove:function(event:TouchEvent):void,touchstart:function(event:TouchEvent):void,transitionend:function(event:TransitionEvent):void,unload:function(event:(UiEvent|Event)):void,volumechange:function(event:Event):void,waiting:function(event:Event):void,wheel:function(event:WheelEvent):void}} AElementEventDescriptor
 */


/***
 * @typedef AbsolConstructDescriptor
 * @property {string | function |null} tag
 * @property {CSSStyleDeclaration} style
 * @property {Array | string} extendEvent
 * @property {Array | string} class
 * @property {AElementAttributeDescriptor|AElementNSAttributeDescriptor} attr
 * @property {string|AElement | AElementNS | AbsolConstructDescriptor | string[] |AElement[] | AElementNS[] | AbsolConstructDescriptor[]} child
 * @property {string} text to create a TextNode, not Element
 * @property {AElement} elt
 * @property {AElementEventDescriptor|{}} on
 * @property {Object} props
 *
 */


var svgCreator = function () {
    var temp = document.createElement('div');
    temp.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';
    var element = temp.childNodes[0];
    var prototypes = Object.getOwnPropertyDescriptors(AElement.prototype);
    Object.defineProperties(element, prototypes);
    AElement.call(element);
    return element;
};

/***
 *
 * @param {*=} option
 * @constructor
 */
function Dom(option) {
    option = option || {};
    this.creator = option.creator || {};

    Object.defineProperties(this.creator,
        {
            svg: {
                set: function () {
                    //do nothing
                },
                get: function () {
                    return svgCreator;
                }
            },
            attachhook: {
                set: function () {
                    //do nothing
                },
                get: function () {
                    return AttachHook;
                }
            }
        });


    this['$ '.trim()] = this.$.bind(this);
    this['_ '.trim()] = this._.bind(this);
    this['$' + '$'] = this.$$.bind(this);
    this.buildDom = this._;
}

Dom.prototype.defaultTag = 'div';

Dom.prototype.fromCode = function (code) {
    code = code.trim().replace(/>\s+</gm, '><');
    var temTag = 'div';
    if (code.startsWith('<td') || (code.startsWith('<th') && !code.startsWith('<thead'))) temTag = 'tr';
    else if (code.startsWith('<tr')) temTag = 'tbody';
    else if (code.startsWith('<thead') || code.startsWith('<tbody')) temTag = 'table';
    var tempDiv = document.createElement(temTag);
    tempDiv.innerHTML = code;
    var element = tempDiv.childNodes[0];
    var prototypes = Object.getOwnPropertyDescriptors(AElement.prototype);
    Object.defineProperties(element, prototypes);
    AElement.call(element);
    return element;
};


/**
 * DFS
 * @param {string | AElement} query
 * @param {AElement} root
 * @param {function} onFound - return true to stop find
 * @returns {AElement | AElementNS}
 */


Dom.prototype.$ = function (query, root, onFound) {
    var res;
    if (Dom.isDomNode(query)) res = query;
    else
        res = this.select(query, root, onFound);
    if (res) this.attach(res);
    return res;
};

/***
 *
 * @type {function(string, AElement, Function): AElement}
 */
Dom.prototype.selectAttacth = Dom.prototype.$;


/**
 * DFS
 * @param {string} query
 * @param {AElement} root
 * @param {function} onFound - return true to stop find
 */
Dom.prototype.select = function (query, root, onFound) {
    root = root || document.documentElement;
    var matcher = JSPath.compileJSPath(query);
    return matcher.findFirst(root, onFound);
};


export var FeatureClass = {
    AElementNS: {
        constructor: AElementNS,
        prototypeKeys: Object.keys(AElementNS.prototype)
    },
    AElement: {
        constructor: AElement,
        prototypeKeys: Object.keys(AElement.prototype)
    }
};
/**
 *
 * @param {AElement | AElementNS } element
 */
Dom.prototype.attach = function (element) {
    if (element.attr) return;
    var feature = (element.getBBox && element.tagName !== 'svg') ? FeatureClass.AElementNS : FeatureClass.AElement;
    var elementConstructor = feature.constructor;
    var proto = elementConstructor.prototype;
    var prototypeKeys = feature.prototypeKeys;
    var n = prototypeKeys.length;
    var key;
    for (var i = 0; i < n; ++i) {
        key = prototypeKeys[i];
        element[key] = proto[key];
    }
    Object.assign(element, elementConstructor.prototype)
    elementConstructor.call(element);
};


Dom.prototype.makeNewElement = function (tagName) {
    return document.createElement(tagName);
};

Dom.prototype.makeNewTextNode = function (data) {
    return document.createTextNode(data);
};


/**
 *
 * @param {AbsolConstructDescriptor | string | {} } option
 * @param {boolean=} isInherited
 * @returns {AElementNS| AElement | Text}
 */
Dom.prototype._ = function (option, isInherited) {
    var res;
    var creator;
    if (Dom.isDomNode(option)) {
        res = option;
        option = {};
        /** fix reinit component */
        isInherited = true;
    }
    else {
        if (option.charAt) {
            option = option.trim();
            if (option[0] === '<') {
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
            }
        }
    }

    if (option.text || option.text === '') {//is textNode
        return this.makeNewTextNode(option.text);
    }

    option.tag = option.tag || this.defaultTag;
    creator = option.tag.prototype ? option.tag : this.creator[option.tag];
    if (option.tag.prototype) option.tag = option.tag.tag;
    if (option.elt) {
        res = this._(option.elt);
    }
    else {
        if (!res) {
            if (creator) {
                if (creator.render) {
                    res = creator.render(option.data, this);
                }
                else {
                    res = creator(option.data, this);
                }

            }
            else {
                res = this.makeNewElement(option.tag);
                Object.assign(res, option.data);
            }
        }
    }

    this.attach(res);

    if (creator) {
        res._azar_extendTags = res._azar_extendTags || {};
        res._azar_extendTags[option.tag] = creator;
        creator.property && Object.defineProperties(res, creator.property);
        creator.prototype && OOP.extends(res, creator.prototype);
        creator.attribute && res.defineAttributes(creator.attribute);
        if (creator.render) {
            if (creator.eventHandler) {
                res.eventHandler = res.eventHandler || {};
                var eventHandler = OOP.bindFunctions(res, creator.eventHandler || creator.prototype.eventHandler);
                for (var eventHandlerKey in eventHandler) {
                    if (res.eventHandler[eventHandlerKey]) {
                        throw new Error("Same name of eventHandler[" + eventHandlerKey + "]");
                    }
                    else {
                        res.eventHandler[eventHandlerKey] = eventHandler[eventHandlerKey];
                    }
                }
            }
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
    if (option.child) {
        option.child = option.child instanceof Array ? option.child : [option.child];
        for (var i = 0; i < option.child.length; ++i) {
            res.addChild(this._(option.child[i], false, true));
        }
    }
    return res;
};

/***
 *
 * @type {function(Object, boolean): AElement}
 */
Dom.prototype.create = Dom.prototype._;


/***
 *
 * @param query
 * @param root
 * @returns {Array<AElement|AElementNS>}
 */
Dom.prototype.$$ = function (query, root) {
    var thisD = this;
    var res = [];
    this.selectAttacth(query, root, function (elt) {
        thisD.attach(elt);
        res.push(elt);
    });
    return res;
};

Dom.prototype.install = function (arg0, arg1) {
    var _this = this;
    if (arguments.length === 1) {
        if (arg0.creator && arg0.create && arg0.select) {
            // is a dom core
            var creator = arg0.creator;
            Object.keys(creator).forEach(function (key) {
                if (key.startsWith('_') || key.startsWith('$')) return;
                var func = creator[key];
                if (typeof (func) == 'function')
                    if (_this.creator[key] !== func)
                        _this.creator[key] = func;
            });
        }
        else if (typeof (arg0) == 'function') {
            var name = arg0.tag || getFunctionName(arg0) || arg0.name;
            if (name) {
                this.creator[name.toLowerCase()] = arg0;
            }
            else {
                console.error('No ident name of creator function', arg0);
            }
        }
        else if (arg0 instanceof Array) {
            arg0.forEach(function (func) {
                var name = func.tag || getFunctionName(func) || func.name;
                if (name) {
                    _this.creator[name.toLowerCase()] = func;
                }
            });
        }
        else if (typeof arg0 == 'object') {
            Object.keys(arg0).forEach(function (key) {
                if (key.startsWith('_') || key.startsWith('$')) return;
                var func = arg0[key];
                if (typeof (func) == 'function')
                    if (_this.creator[key] !== func)
                        _this.creator[key] = func;
            });
        }
        else {
            console.error('Unknown data', arg0);
        }
    }
    else if (arguments.length === 2) {
        if (arg0 instanceof Array) {
            if (arg1.creator) arg1 = arg1.creator;
            arg0.forEach(function (key) {
                var func = arg1[key];
                if (typeof (func) == 'function')
                    if (_this.creator[key] !== func)
                        _this.creator[key] = func;
            });
        }
        else if (arg0 instanceof RegExp) {
            if (arg1.creator) arg1 = arg1.creator;
            Object.keys(arg1).forEach(function (key) {
                if (key.match(arg0)) {
                    var func = arg1[key];
                    if (typeof (func) == 'function')
                        if (_this.creator[key] !== func)
                            _this.creator[key] = func;
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

/***
 *
 * @param {String | null} tagName
 */
Dom.prototype.require = function (tagName) {
    return this.creator[tagName] || null;
};


/**
 *
 * @param {*} o
 * @returns {Boolean}
 */
export function isDomNode(o) {
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
}

Dom.isDomNode = isDomNode;

/**
 * @param {AElement|Node|HTMLElement} element
 */
export function activeFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(AElement.ALLOW_KEYBOARD_INPUT);
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

Dom.activeFullScreen = activeFullScreen;


export function inactiveFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

Dom.inactiveFullScreen = inactiveFullScreen;

//adapt
export var deactiveFullScreen = inactiveFullScreen;
Dom.deactiveFullScreen = deactiveFullScreen;


export function isFullScreen() {
    var fullScreenElement = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
    return !!fullScreenElement;
}

Dom.isFullScreen = isFullScreen;

/**
 * @param {AElement|Node|HTMLElement} current
 * @returns {ClientRect}
 */
export function traceOutBoundingClientRect(current) {
    var screenSize = Dom.getScreenSize();
    var left = 0;
    var right = screenSize.width;
    var top = 0;
    var bottom = screenSize.height;
    while (current) {
        var ox = AElement.prototype.getComputedStyleValue.call(current, 'overflow-x') !== "visible";
        var oy = AElement.prototype.getComputedStyleValue.call(current, 'overflow-y') !== "visible";
        var isHtml = current.tagName.toLowerCase() === 'html';
        if (ox || oy || isHtml) {
            var bound;
            if (isHtml) {
                bound = Object.assign({ left: 0, top: 0 }, getScreenSize());
                bound.bottom = bound.height;
                bound.right = bound.width;

            }
            else {
                bound = current.getBoundingClientRect();
            }
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
}

Dom.traceOutBoundingClientRect = traceOutBoundingClientRect;

/***
 *
 * @param {string} fontFace
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export function fontFaceIsLoaded(fontFace, timeout) {
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
                    });
            }

            check(timeout);
        });
    });
}

Dom.fontFaceIsLoaded = fontFaceIsLoaded;

/***
 *
 * @returns {{width: number, WIDTH: number, HEIGHT: number, height: number}}
 */
export function getScreenSize() {
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    var height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    return { WIDTH: width, HEIGHT: height, width: width, height: height };
}

Dom.getScreenSize = getScreenSize;

/***
 *
 * @param {HTMLImageElement} img
 * @param {number=} timeout
 * @returns {Promise<void>}
 */
export function waitImageLoaded(img, timeout) {
    var isLoaded = true;
    if (!img.complete) {
        isLoaded = false;
    }
    if (img.naturalWidth === 0) {
        isLoaded = false;
    }
    if (isLoaded) return Promise.resolve();
    if (!img.src) return Promise.resolve();
    return new Promise(function (rs) {
        if (img.addEventListener) {
            img.addEventListener('load', rs, false);
            img.addEventListener('error', rs, false);
        }
        else {
            img.attachEvent('onload', rs, false);
        }
        setTimeout(rs, timeout || 5000);
    });
    // No other way of checking: assume it’s ok.
}

Dom.waitImageLoaded = waitImageLoaded;


/***
 *
 * @param {HTMLIFrameElement| Worker} iframe
 * @returns {Promise}
 */
export function waitIFrameLoaded(iframe) {
    return new Promise(function (rs, rj) {
        if (document.all) {
            iframe.onreadystatechange = function () {
                if (iframe.readyState === "complete" || iframe.readyState === "loaded")
                    rs();
            };
        }
        else {
            iframe.onload = rs;
        }
        setTimeout(rs, 5000)
    });
}

Dom.waitIFrameLoaded = waitIFrameLoaded;

/***
 *
 * @param {Image} element
 * @returns {Promise<HTMLCanvasElement>}
 */
export function imageToCanvas(element) {
    if (typeof element == 'string') {
        element = Dom.ShareInstance.$(element);
    }
    if (element.tagName.toLowerCase() === 'img') {
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
        throw new Error("AElement must be image");
    }
}

Dom.imageToCanvas = imageToCanvas;


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

export function getScrollSize() {
    if (!Dom.scrollWidthPromise)
        Dom.scrollWidthPromise = new Promise(function (resolve) {
            function prerender() {
                var parent = Dom.ShareInstance._({
                    style: {
                        'z-index': '-100',
                        opacity: '0',
                        width: '100px',
                        height: '100px',
                        overflow: 'scroll',
                        top: '0',
                        left: '0',
                        'box-sizing': 'content-box',
                        position: 'fixed'
                    }
                })
                    .addTo(document.body);
                var child = Dom.ShareInstance._({ style: { width: '100%', height: '100%' } }).addTo(parent);
                requestAnimationFrame(function () {
                    var parentBound = parent.getBoundingClientRect();
                    var childBound = child.getBoundingClientRect();
                    resolve({
                        width: parentBound.width - childBound.width,
                        height: parentBound.height - childBound.height
                    });
                    parent.selfRemove();
                });
            }

            Dom.documentReady.then(prerender);
        });
    return Dom.scrollWidthPromise;
}

Dom.getScrollSize = getScrollSize;


/***
 *
 * @param {(AElement|AElementNS|Node)} originElt
 * @param {function(originElt: (AElement|AElementNS|Node), originElt: (AElement|AElementNS|Node)):void } afterCloneCb
 * @return {AElement|AElementNS|Node}
 */
export function depthClone(originElt, afterCloneCb) {
    /***
     *
     * @type {AElement|AElementNS|Node}
     */
    var newElt = originElt.cloneNode();//no deep
    if (originElt.childNodes) {
        /***
         *
         * @type {(AElement|AElementNS)[]}
         */
        var children = Array.prototype.map.call(originElt.childNodes, function (child) {
            return depthClone(child, afterCloneCb)
        });
        for (var i = 0; i < children.length; ++i) {
            newElt.appendChild(children[i]);
        }
    }

    return (afterCloneCb && afterCloneCb(originElt, newElt)) || newElt;
}


/***
 *
 * @param originElt
 * @param afterCloneCb
 * @returns {AElement|HTMLElement|Node}
 */
export function depthCloneWithStyle(originElt, afterCloneCb) {
    return depthClone(originElt, function (originElt, newElt) {
        if (!originElt.getAttribute && !originElt.getAttributeNS) return;
        copyStyleRule(originElt, newElt);
        afterCloneCb && afterCloneCb(originElt, newElt);
    });
}

Dom.depthClone = depthClone;
Dom.depthCloneWithStyle = depthCloneWithStyle;

/***
 *
 * @param  {AElement|HTMLElement|Node}sourceElt
 * @param  {AElement|HTMLElement|Node} destElt
 * @returns  {AElement|HTMLElement|Node}
 */
export function copyStyleRule(sourceElt, destElt) {
    if (!sourceElt.getAttribute && !sourceElt.getAttributeNS) return destElt;//is text node
    if (!destElt.getAttribute && !destElt.getAttributeNS) return destElt;//is text node, nothing to copy
    var cssRules = AElement.prototype.getCSSRules.call(sourceElt);

    var cssKey = cssRules.reduce(function (ac, rule) {
        for (var i = 0; i < rule.style.length; ++i) {
            ac[rule.style[i]] = true;
        }
        return ac;
    }, {});
    for (var key in cssKey) {
        destElt.style[key] = AElement.prototype.getComputedStyleValue.call(sourceElt, key);
    }
    return destElt;
}

Dom.copyStyleRule = copyStyleRule;

/**
 *
 */
export function getSystemFontSize() {
    if (window.mobileHost && window.mobileHost.systemFont) {
        return window.mobileHost.systemFont.pointSize;
    }
    var _ = Dom.ShareInstance._;
    var initSpan = Dom.ShareInstance._({
        tag: 'span',
        style: {
            font: 'inherit',
        }
    });

    var appleSpan = Dom.ShareInstance._({
        tag: 'span',
        style: {
            font: '-apple-system-body',
        }
    }).addTo(document.body);

    var renderer = _({
        style: {
            font: 'initial',
            position: 'fixed',
            top: 0,
            left: 0,
            visibility: 'hidden',
            opacity: 0, zIndex: -100
        },
        child: [initSpan && appleSpan]
    }).addTo(document.body);


    var appleSize = appleSpan.getFontSize();
    var initSize = initSpan.getFontSize();
    var defaultSize = appleSize !== initSize ? appleSize : initSize;
    renderer.remove();
    return Math.round(defaultSize * 14 / 16);
}

/***
 * get absol construct descriptor for HTML element only
 * @param {AElement | Text} elt
 * @returns {AbsolConstructDescriptor}
 */
export function getConstructDescriptor(elt) {
    var obj = {};
    obj.tag = elt.tagName.toLowerCase();
    var classAttr = elt.getAttribute('class');
    var classList;
    if (classAttr)
        classList = parseClassAttr(classAttr);
    if (classList && classList.length > 0)
        obj.class = classList;
    var styleAttr = elt.getAttribute('style');
    var style;
    if (styleAttr)
        style = parseStyleAttr(styleAttr);


    var attributes = elt.attributes;
    var attNode;
    var attrName;
    var attrValue;
    var attr = {};
    var on = {};
    var props = {};
    var eventMatch, eventName;
    var propMatch, propName;
    for (var i = 0; i < attributes.length; ++i) {
        attNode = attributes[i];
        attrName = attNode.nodeName;
        attrValue = attNode.nodeValue;
        if (attrName == 'style' || attrName == 'class') continue;
        eventMatch = attrName.match(/^on(.+)/)
        if (eventMatch) {
            eventName = eventMatch[1];
            on[eventName] = new Function('event', 'sender', attrValue);
            continue;
        }
        propMatch = attrName.match(/^prop-(.+)/);
        if (propMatch) {
            propName = propMatch[1];
            props[propName] = attrValue;
            continue;
        }
        attr[attrName] = attrValue;
    }
    var key;
    for (key in style) {
        //style is not empty
        obj.style = style;
        break;
    }
    for (key in attr) {
        obj.attr = attr;
        break;
    }
    for (key in on) {
        obj.on = on;
        break;
    }
    for (key in props) {
        obj.props = props;
        break;
    }

    return obj;
}

Dom.getConstructDescriptor = getConstructDescriptor;

Dom.addToResizeSystem = function (element) {
    ResizeSystem.add(element);
};

Dom.updateResizeSystem = function () {
    ResizeSystem.update();
}

Dom.updateSizeUp = function (fromElt) {
    ResizeSystem.updateUp(fromElt);
};


export default Dom;