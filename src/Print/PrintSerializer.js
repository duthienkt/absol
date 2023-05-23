import VarScope from "../AppPattern/VarScope";
import Dom, { depthClone, isDomNode, waitImageLoaded } from "../HTML5/Dom";
import Rectangle from "../Math/Rectangle";
import PrintSerialHandlers from "./PrintSerialHandlers";
import { isImageURLAllowCrossOrigin } from "../Network/XLoader";
import noop from "../Code/noop";


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

/***
 *
 * @param {Array<AElement> | AElement | Array<{elt: AElement, opt:Object}>} docList
 * @param printer
 * @param onProcess
 * @return {Promise<Awaited<unknown>[]>}
 */
PrintSerializer.prototype.serialize = function (docList, printer, onProcess) {
    var $ = Dom.ShareInstance.$;
    if (!(docList instanceof Array)) docList = [docList];
    docList = docList.map(doc => {
        if (typeof doc === "string") {
            return {
                elt: $(doc)
            }
        }
        else if (isDomNode(doc)) {
            return {
                elt: $(doc)
            }
        }
        else if (typeof doc === "object" && doc) {
            if (typeof doc.elt === "string") doc.elt = $(doc.elt);
            if (doc.elt && isDomNode(doc.elt))
                return doc;
        }
        else return null;
    }).filter(it => !!it);
    var sync = [];
    var processInfo = {
        state: 'RENDER_DOM',
        total: {
            all: 0,
            text: 0,
            image: 0
        },
        dom: {
            text: 0,
            image: 0
        },
        onProcess: () => {
            onProcess && onProcess(processInfo);
        }
    };
    printer.processInfo = processInfo;
    var contentChildList = docList.map(doc => {
        var elt = doc.elt;
        return depthClone(elt, (originElt, copyElt) => {
            copyElt.__idx__ = processInfo.total.all;
            copyElt.__origin__ = originElt;

            processInfo.total.all++;
            var parent, fontWeight, style;
            var done = false;

            if (originElt.nodeType === Node.TEXT_NODE) {
                processInfo.total.text++;
                sync.push(new Promise(rs => {
                    setTimeout(() => {
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
                            processInfo.dom.text++;
                        }
                        processInfo.dom.text++;
                        rs();
                    }, 0)
                }));

            }
            else if (originElt.tagName && originElt.tagName.toLowerCase() === 'canvas') {
                copyElt.getContext('2d').drawImage(originElt, 0, 0);
            }
            else if (originElt.tagName === 'IMG' && !originElt.classList.contains('absol-attachhook') && originElt.src) {
                processInfo.total.image++;

                sync.push(isImageURLAllowCrossOrigin(originElt.src).then(result => {
                    var newElt;
                    if (!result) {
                        newElt = copyElt.cloneNode();
                        newElt.__idx__ = copyElt.__idx__;
                        newElt.__origin__ = copyElt.__origin__;
                        newElt.src = 'https://absol.cf/crossdownload.php?file=' + encodeURIComponent(originElt.src);
                        copyElt.parentElement.replaceChild(newElt, copyElt);
                        return waitImageLoaded(newElt, 10000).then(() => {
                            if (!done) {
                                processInfo.dom.image++;
                                processInfo.onProcess();
                                done = true;
                            }
                        });
                    }
                    else {
                        return waitImageLoaded(copyElt, 10000).then(() => {
                            if (!done) {
                                processInfo.dom.image++;
                                processInfo.onProcess();
                                done = true;
                            }
                        });
                    }
                }, (err) => {
                    console.error(err);
                    if (!done) {
                        processInfo.dom.image++;
                        processInfo.onProcess();
                        done = true;
                    }

                }));
            }
            else if (originElt.tagName === 'INPUT') {
                copyElt.value = originElt.value;
            }
        });
    });


    var content = Dom.ShareInstance._({
        style: {
            width: 794 - 57 * 2 + 'px',
            //WIDTH: 1123 - 57*2
            display: 'inline-block',
            overflow: 'visible'

        },
        class: 'as-printer-content',
        child: contentChildList
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

    sync.push(new Promise(rs => {
        setTimeout(rs, 50);
    }));

    return Promise.all(sync).then(() => {
        processInfo.state = "SERIALIZE";
        processInfo.onProcess();
        docList.forEach((doc, i) => {
            printer.O = Rectangle.fromClientRect(contentChildList[i].getBoundingClientRect()).A();
            printer.addSubDocument(printer.O, doc.opt);
            this.accept(printer, contentChildList[i], new VarScope(), []);
        });
    })
        .then(() => {
            scroller.remove();
            processInfo.onProcess = noop;
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