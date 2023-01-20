import VarScope from "../AppPattern/VarScope";
import Dom, { depthClone, waitImageLoaded } from "../HTML5/Dom";
import Rectangle from "../Math/Rectangle";
import PrintSerialHandlers from "./PrintSerialHandlers";
import { isImageURLAllowCrossOrigin } from "../Network/XLoader";


/***
 * @typedef {Object} PSHandler
 * @property {string} id
 * @property {function(elt:AElement, scope: VarScope, stack:Array<AElement>):boolean} match
 * @property {function(printer: PaperPrinter,elt:AElement|Text, scope: VarScope, stack:Array<{elt: AElement|Text, scope:VarScope}>, accept: function():void):(boolean|void)} exec - return true if run other handle
 *
 */


/***
 *
 * @constructor
 */
function PrintSerializer() {
    /***
     * @type {Array<PSHandler>}
     */
    this.handlers = this.handlers.slice();
}


PrintSerializer.prototype.handlers = PrintSerialHandlers;

/***
 *
 * @param {PaperPrinter} printer
 * @param {AElement|AElementNS|Text} elt
 * @param {VarScope} scope
 * @param {Array<{elt: AElement|Text, scope:VarScope}>} stack
 */
PrintSerializer.prototype.accept = function (printer, elt, scope, stack) {
    if (elt.nodeType === Node.ELEMENT_NODE) Dom.ShareInstance.$(elt);
    var handler;
    var matched, cont;
    for (var i = 0; (!matched || cont) && i < this.handlers.length; ++i) {
        handler = this.handlers[i];
        matched = handler.match(elt, scope, stack);
        if (matched) {
            cont = handler.exec(printer, elt, scope, stack, elt1 => {
                this.accept(printer, elt1, new VarScope(scope), stack.concat([{ elt: elt, scope: scope }]));
            });
        }
    }
};

PrintSerializer.prototype.serialize = function (elt, printer) {
    var sync = [];
    var content = Dom.ShareInstance._({
        style: {
            width: 794 - 57 * 2 + 'px',
            //WIDTH: 1123 - 57*2
            display: 'inline-block',
            overflow: 'visible'

        },
        class: 'as-printer-content',
        child: depthClone(elt, (originElt, copyElt) => {
            var parent, fontWeight, style;
            if (originElt.nodeType === Node.TEXT_NODE) {
                sync.push(new Promise(rs=>{
                    setTimeout(()=>{
                        parent = originElt.parentElement;
                        if (!copyElt.__fontWeight__) {
                            style = getComputedStyle(parent);
                            fontWeight = parseInt(style.getPropertyValue('font-weight'));//not support other style
                            copyElt.__fontWeight__ = fontWeight;
                            if (fontWeight <= 400) {
                                copyElt.parentElement.style.setProperty('font-weight', 'normal');
                            }
                            else if (fontWeight > 400) {
                                copyElt.parentElement.style.setProperty('font-weight', 'bold');
                            }
                        }
                        rs();
                    }, 0)
                }));

            }
            else if (originElt.tagName && originElt.tagName.toLowerCase() === 'canvas') {
                copyElt.getContext('2d').drawImage(originElt, 0, 0);
            }
            else if (originElt.tagName === 'IMG' && originElt.src) {
                sync.push(isImageURLAllowCrossOrigin(originElt.src).then(result => {
                    var newElt;
                    if (!result) {
                        newElt = copyElt.cloneNode();
                        newElt.src = 'https://absol.cf/crossdownload.php?file=' + encodeURIComponent(originElt.src);
                        copyElt.parentElement.replaceChild(newElt, copyElt);
                        return waitImageLoaded(newElt, 10000);
                    }
                }, () => {
                }))
            }
            else if (originElt.tagName === 'INPUT') {
                copyElt.value = originElt.value;
            }
        })
    });
    var scroller = Dom.ShareInstance._({
        class: 'as-printer',
        style: {
            'text-size-adjust': 'none',
            '-webkit-text-size-adjust': 'none',
            '-moz-text-size-adjust': 'none',
            '-ms-text-size-adjust': 'none',
            position: 'fixed',
            top: '10px',
            bottom: '10px',
            left: '10px',
            overflow: 'scroll',
            width: '794px',
            // maxWidth: '90vw',
            background: 'white',
            // zIndex: 1000,

            opacity: '0',
            zIndex: '-100',
            visibility: 'hidden',
            pointerEvents: 'none'
        },
        child: content
    }).addTo(document.body);
    sync = [Promise.all(sync).then(() => {
        return Promise.all(Dom.ShareInstance.$$('img').map(img => {
            return waitImageLoaded(img, 10000);
        }))
    })];
    sync.push(new Promise(rs => {
        setTimeout(rs, 50);
    }));

    return Promise.all(sync).then(() => {
        printer.O = Rectangle.fromClientRect(content.getBoundingClientRect()).A();
        this.accept(printer, content, new VarScope(), []);
    })
        .then(() => {
            // scroller.remove();
            return printer;
        });
};

/***
 *
 * @param {PSHandler} handler
 * @returns {this}
 */
PrintSerializer.prototype.addHandler = function (handler) {
    this.handlers.unshift(handler);
    return this;
};

/***
 *
 * @param {PSHandler} handler
 * @param {string} bf
 * @returns {this}
 */
PrintSerializer.prototype.addHandlerBefore = function (handler, bf) {
    var idx = this.handlers.findIndex(value => value.id === bf);
    if (idx >= 0) {
        this.handlers.splice(idx, 0, handler);
    }
    return this;
};

/***
 *
 * @param {PSHandler} handler
 * @param {string} at
 * @returns {this}
 */
PrintSerializer.prototype.addHandlerAfter = function (handler, at) {
    var idx = this.handlers.findIndex(value => value.id === at);
    if (idx >= 0) {
        this.handlers.splice(idx + 1, 0, handler);
    }
    return this;
};


/***
 *
 * @param {Array<PSHandler>} handlers
 * @returns {this}
 */
PrintSerializer.prototype.addHandlers = function (handlers) {
    this.handlers.unshift.apply(this.handlers, handlers);
    return this;
};

/***
 *
 * @param {string} id
 * @returns {this}
 */
PrintSerializer.prototype.removeHandler = function (id) {
    var idx = this.handlers.findIndex(value => value.id === id);
    if (idx >= 0) {
        this.handlers.splice(idx, 1);
    }
    return this;
};

/***
 *
 * @param {string} id
 * @returns {PSHandler|null}
 */
PrintSerializer.prototype.getHandler = function (id) {
    var idx = this.handlers.findIndex(value => value.id === id);
    if (idx >= 0) {
        return this.handlers[idx];
    }
    return null;
};


export default PrintSerializer;