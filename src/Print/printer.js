import Dom, { isDomNode } from "../HTML5/Dom";
import PrintSerializer from "./PrintSerializer";
import PaperPrinter from "./PaperPrinter";
import { saveAs } from "../Network/FileSaver";

export var ShareSerializer = new PrintSerializer();

/***
 *
 * @param elt
 * @param fileName
 * @param {function(processInfo):void=} onProcess
 * @returns {Promise<*>}
 */


/**
 * @type {((elt:AElement, fileName: string, onProcess: function(processInfo):void) => Promise ) & ((elt:AElement, opt: object, onProcess: function(processInfo):void) => Promise) }
 */
export function downloadAsPDF(docList, arg2, onProcess) {
    var opt = {
        fileName: 'exports.pdf'
    };
    if (typeof arg2 === 'string') opt.fileName = arg2;
    else Object.assign(opt, arg2);
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
    }).filter(it => !!it).map(doc => {
        var elt = docList[0];
        if (elt.fmComponent) {
            if (!doc.opt) doc.opt = {};
            if (!doc.opt.margin) {
                opt.margin = {
                    top: elt.fmComponent.style.paddingTop || 57,
                    left: elt.fmComponent.style.paddingLeft || 57,
                    bottom: elt.fmComponent.style.paddingBottom || 57,
                    right: elt.fmComponent.style.paddingRight || 57
                };
            }
        }
        return doc;
    });

    var serializer = ShareSerializer;
    opt.onProcess = (typeof onProcess === "function") ? onProcess : (function (){});

    var printer = new PaperPrinter(opt);
    return serializer.serialize(docList, printer, opt.onProcess)
        .then(printer => printer.exportAsPDF())
        .then(doc => {
            saveAs(doc.output('blob'), opt.fileName);
        });
}


export { PaperPrinter };
export { PrintSerializer } ;

