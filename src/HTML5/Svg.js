import Dom from './Dom';
import ElementNS from './ElementNS';
import Element from './Element';

var sattachhookCreator = function () {
    return Svg.ShareInstance._('<image  class="absol-attachhook" style:"display: none"  xlink:href=""/>');
};

/***
 * @extends Dom
 * @param option
 * @constructor
 */
function Svg(option) {
    Dom.call(this, option);
    this.defaultTag = 'g';
    this.svgNS = "http://www.w3.org/2000/svg";
    Object.defineProperties(this.creator,
        {
            sattachhook: {
                set: function () {
                    //do nothing
                },
                get: function () {
                    return sattachhookCreator;
                }
            }
        });
    delete this.buidDom;
    this.buildSvg = this.create.bind(this);
}


Object.defineProperties(Svg.prototype, Object.getOwnPropertyDescriptors(Dom.prototype));

Svg.prototype.fromCode = function (code) {
    code = code.trim();
    var receptacle = document.createElement('div');
    var element;
    var prototypes;
    if (code.startsWith('<svg')) {
        receptacle.innerHTML = code;
        element = receptacle.childNodes[0];
        prototypes = Object.getOwnPropertyDescriptors(Element.prototype);
        Object.defineProperties(element, prototypes);
        Element.call(element);
    }
    else {
        var svgfragment = '<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">' + code + '</svg>';
        receptacle.innerHTML = '' + svgfragment;
        element = receptacle.childNodes[0].childNodes[0];
        prototypes = Object.getOwnPropertyDescriptors(ElementNS.prototype);
        Object.defineProperties(element, prototypes);
        ElementNS.call(element);
    }
    return element;
};


Svg.prototype.makeNewElement = function (tagName) {
    return document.createElementNS(this.svgNS, tagName);
};


Svg.ShareInstance = new Svg();

Svg.svgToCanvas = function (element) {
    if (typeof element == 'string') {
        element = Dom.ShareInstance.$(element);
    }
    if (element && element.tagName == 'svg') {
        var cssTexts = {};
        var depthClone = function (originElt) {
            var newElt = originElt.cloneNode();//no deep
            if (!originElt.getAttributeNS) return newElt;//is text node
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
            var children = Array.prototype.map.call(originElt.childNodes, depthClone);
            for (var i = 0; i < children.length; ++i) {
                newElt.appendChild(children[i]);
            }
            return newElt;
        };

        var cloneElement = depthClone(element);

        var renderSpace = Dom.ShareInstance._({
            style: {
                // opacity:0,
                zIndex: -1000,
                position: 'fixed',
                top: 0,
                bottom: 0
            }
        }).addTo(document.body);
        renderSpace.addChild(cloneElement);

        var svgCode = renderSpace.innerHTML;
        renderSpace.clearChild();

        var mBlob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
        var src = (URL || webkitURL).createObjectURL(mBlob);

        var image = Dom.ShareInstance._('img');
        image.attr('src', src)
            .addTo(renderSpace);
        var canvas = document.createElement("canvas");
        renderSpace.addChild(canvas);
        return Dom.waitImageLoaded(image).then(function () {
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            renderSpace.selfRemove();
            return canvas;
        });
    }
    else {
        throw new Error('Element must be svg');
    }
};

Svg.svgToRasterImageUrl = function (element) {
    return Svg.svgToCanvas(element).then(function (canvas) {
        return canvas.toDataURL();
    });
}

Svg.svgToExportedString = function (element) {
    if (typeof element == 'string') {
        element = Dom.ShareInstance.$(element);
    }
    if (element && element.tagName == 'svg') {
        var depthClone = function (originElt) {
            var newElt = originElt.cloneNode();//no deep
            if (!originElt.getAttributeNS) return newElt;//is text node
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
            var children = Array.prototype.map.call(originElt.childNodes, depthClone);
            for (var i = 0; i < children.length; ++i) {
                newElt.appendChild(children[i]);
            }
            return newElt;
        };

        var cloneElement = depthClone(element);
        var renderSpace = Dom.ShareInstance._({
            style: {
                // opacity:0,
                zIndex: -1000,
                position: 'fixed',
                top: 0,
                bottom: 0
            }
        }).addTo(document.body);
        renderSpace.addChild(cloneElement);
        var svgCode = renderSpace.innerHTML;
        renderSpace.selfRemove();
        return svgCode;
    }
    else {
        throw new Error('Element must be svg');
    }
};


Svg.svgToSvgUrl = function (element) {
    var svg = Svg.svgToExportedString(element);
    svg = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svg;
    var blob = new Blob([svg], { type: 'image/svg+xml' });
    var url = URL.createObjectURL(blob);
    return url;
}


Dom.printElement = function (option) {
    var _ = Dom.ShareInstance._;
    var $ = Dom.ShareInstance.$;
    option = option || {};
    if (typeof option == 'string') {
        option = { elt: Dom.ShareInstance.$(option) };
    }
    else if (typeof option.elt == 'string') {
        option.elt = $(option.elt);
    }
    else if (Dom.isDomNode(option)) {
        option = { elt: option };
    }
    if (Dom.isDomNode(option.elt)) {
        var canvases = [], imageExported = [];
        var canvas, images, img, src, scripts, i;


        if (option.elt.querySelectorAll) {
            canvases = option.elt.querySelectorAll('canvas');
        }
        else {
            $('canvas', option.elt, function (elt) {
                canvases.push(elt);
            });
        }


        for (i = 0; i < canvases.length; ++i) {
            canvas = canvases[i];
            src = canvas.toDataURL();
            img = _({
                tag: 'img',
                class: 'absol-export-canvas-image',
                attr: {
                    src: src
                }
            });
            imageExported.push(img);
            Dom.copyStyleRule(canvas, img);
            canvas.parentElement.insertBefore(img, canvas);
        }




        var newElt = option.computeStyle ? Dom.depthCloneWithStyle(option.elt) : option.elt.cloneNode(true);

        //remove canvas that will be empty when clone
        canvas = [];
        if (newElt.querySelectorAll) {
            canvases = newElt.querySelectorAll('canvas');
        }
        else {
            $('canvas', newElt, function (elt) {
                canvases.push(elt);
            });
        }
        for (i = 0; i < canvases.length; ++i) {
            canvases[i].remove();
        }


        scripts = [];
        if (newElt.querySelectorAll) {
            scripts = newElt.querySelectorAll('script');
        }
        else {
            $('canvas', newElt, function (elt) {
                scripts.push(elt);
            });
        }

        for (i = 0; i < scripts.length; ++i) {
            scripts[i].remove();
        }


        images = [];
        //for performance
        if (newElt.querySelectorAll) {
            images = newElt.querySelectorAll('img');
        }
        else {
            $('img', newElt, function (elt) {
                images.push(elt);
            });
        }

        for (i = 0; i < images.length; ++i) {
            if (images[i].classList.contains('absol-export-canvas-image')) continue;
            src = images[i].src;
            images[i].setAttribute('src', src);
        }



        var renderSpace = _({
            style: {
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                overflow: 'auto',
                zIndex: '10',
                opacity: '0',
                visibility: 'hidden'
            }
        });

        $('link', document.head, function (elt) {
            renderSpace.addChild(elt.cloneNode(false));
        });

        if (!option.computeStyle) {
            $('style', document.head, function (elt) {
                if (elt == Dom.$printStyle) return;
                renderSpace.addChild(elt.cloneNode(true));
            });
        }

        renderSpace.addChild(newElt);
        var eltCode = renderSpace.innerHTML;
        renderSpace.clearChild();
        option.title = option.title || ($('title', document.head) || { innerHTML: 'absol.js' }).innerHTML;
        var htmlCode = ['<ht' + 'ml>',
        ' <h' + 'ead><title>' + option.title + '</title><meta charset="UTF-8">',
            '<style>',
        option.overideStyle ? 'html, body{width:initial !important; height:initial !important; overflow: initial !important; overflow-x: initial !important;overflow-y: initial !important;  }' : '',
            '@media print {',//still not work
            '    body{',
            '      -webkit-print-color-adjust: exact;',
            '       color-adjust: exact;',
            '    } ',
            '    div, tr, td, table{',
            '    }',
            '  }',
            'div, table, tr, td{',
            '    page-break-inside: initial;',
            '    page-break-before: avoid;',
            '    page-break-after: avoid;',
            '}',
        option.extendCss || '',
            '</style>',
        '</he' + 'ad>',

        '<bod' + 'y>',
            eltCode,
        '<scr' + 'ipt>' + (option.extendScript || '') + '</scri' + 'pt>',//browser parse  script tag fail
        '<scr' + 'ipt>setTimeout(function(){ window.print();},1000);</scri' + 'pt>',//browser parse  script tag fail
        '</bod' + 'y>',
        '</ht' + 'ml>'].join('\n');
        var blob = new Blob([htmlCode], { type: 'text/html; charset=UTF-8' });
        renderSpace.addTo(document.body);
        var iframe = _('iframe').attr('src', URL.createObjectURL(blob)).addStyle({ width: '100%', height: '100%' }).addTo(renderSpace);
        return new Promise(function (rs, rj) {
            function waitLoad() {
                if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body) {
                    if (typeof option.onLoad == 'function') option.onLoad();
                    iframe.contentWindow.focus();
                    setTimeout(function () {
                        function waitFocusBack() {
                            if (!document.hasFocus || document.hasFocus()) {
                                renderSpace.remove();
                                if (typeof option.onFinish == 'function') option.onFinish();
                                rs();
                            }
                            else {
                                setTimeout(waitFocusBack, 300)
                            }
                        }
                        waitFocusBack();
                    }, 4000);
                }
                else setTimeout(waitLoad, 1000)
            }
            waitLoad();
        });
    }
    else {
        throw new Error('Invalid param!');
    }
};



export default Svg;