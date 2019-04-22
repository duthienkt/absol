import OOP from "./OOP";
import ElementNS from './ElementNS';
/********************  SVG LIB ******************/

Svg.svgNS = "http://www.w3.org/2000/svg";

/**
 * 
 * @param {*} o 
 * @returns {Boolean}
 */
Svg.isSvgNode = function (o) {//
    //todo: detect svg node
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
};


/**
 * 
 * @param {{idMap:Object, classMap:Object, creator:function[]}} option 
 */
function Svg(option) {
    option = option || {};

    /**
     * @type {Object}
     */
    this.creator = option.creator || {};
    this.creator.svg = this.creator.svg || function () {
        var temp = document.createElement('div');
        temp.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';
        return temp.childNodes[0];
    };

    this.$ = this.selectAttacth.bind(this);
    this._ = this.create.bind(this);
    this.buildSvg = this.create.bind(this);
};



/**
 * DFS
 * @param {string} query 
 * @param {Element} root 
 * @param {function} onFound - return true to stop find 
 */
Svg.prototype.selectAttacth = function (query, root, onFound) {
    var res;
    if (Svg.isSvgNode(query)) res = query;
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
Svg.prototype.select = function (query, root, onFound) {
    root = root || document.documentElement;
    var matcher = new ElementMatcher(ElementMatcher.parseElementSelector(query));
    return matcher.findFirstBFS(root, onFound);
};

/**
 * 
 * @param {Element} element 
 */
Svg.prototype.attach = function (element) {
    ElementNS.call(element);
}


Svg.prototype.fromHTML = function (html) {
    var receptacle = document.createElement('div');
    if (html.startsWith('<svg')) {
        receptacle.innerHTML = html;
        return receptacle.childNodes[0];
    }
    else {
        var svgfragment = '<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">' + html + '</svg>';
        receptacle.innerHTML = '' + svgfragment;
        return receptacle.childNodes[0].childNodes[0];
    }
};

/**
 * 
 * @param {Object} option
 * @returns {Element} 
 */
Svg.prototype.create = function (option, isInherited) {
    var res;
    var prototype;
    var property;
    if (Svg.isSvgNode(option)) {
        res = option;
        option = {};
        isInherited = true;
    }
    else if (typeof option == 'string') {
        option = option.trim();
        if (option[0] == '<') {
            option = option.replace(/>\s+</gm, '><').trim();

            res = this.fromHTML(option);
        }
        else {
            var queryObj = ElementMatcher.parseElementSelector(option);
            option = { tag: queryObj.tag, class: queryObj.class || [] };
            if (queryObj.id) option.attr = { id: queryObj.id };


            option.tag = option.tag || 'g';
            if (!this.creator[option.tag]) {
                res = document.createElementNS(Svg.svgNS, option.tag);
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
        option.tag = option.tag || 'g';
        if (!this.creator[option.tag]) {
            res = document.createElementNS(Svg.svgNS, option.tag);
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
    option.attr && res.attr(option.attr);
    option.extendEvent && res.defineEvent(option.extendEvent);
    option.on && res.on(option.on);
    option.once && res.once(option.once);
    option.class && res.addClass(option.class);
    option.style && res.addStyle(option.style);
    option.id && res.attr('id', option.id);
    if (option.child) {
        option.child = option.child instanceof Array ? option.child : [option.child];
        for (var i = 0; i < option.child.length; ++i) {
            res.addChild(this.create(option.child[i]));
        }
    }

    if (property) {
        Object.defineProperties(res, property);
    }
    if (prototype) {
        OOP.extends(res, prototype);
    }

    if (!isInherited && res.init) res.init(option.props);
    return res;
}





export default Svg;