import Dom, { isDomNode } from "../HTML5/Dom";
import PrintSerializer from "./PrintSerializer";
import PaperPrinter from "./PaperPrinter";
import { saveAs } from "../Network/FileSaver";

export var ShareSerializer = new PrintSerializer();
export { mergePdfs }  from "./pdf";


export function makePdfDocument(docList, arg2, onProcess) {
    var opt = {
        fileName: 'exports.pdf.js'
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
                doc.opt.margin = {
                    top: elt.fmComponent.style.paddingTop || 57,
                    left: elt.fmComponent.style.paddingLeft || 57,
                    bottom: elt.fmComponent.style.paddingBottom || 57,
                    right: elt.fmComponent.style.paddingRight || 57
                };
                if (!opt.margin)
                    opt.margin = doc.opt.margin;
            }

        }
        return doc;
    });

    var serializer = ShareSerializer;
    opt.onProcess = (typeof onProcess === "function") ? onProcess : (function (){});

    var printer = new PaperPrinter(opt);
    return serializer.serialize(docList, printer, opt.onProcess)
        .then(printer => printer.exportAsPDF())

}



/**
 * @type {((elt:AElement, fileName: string, onProcess: function(processInfo):void) => Promise ) & ((elt:AElement, opt: object, onProcess: function(processInfo):void) => Promise) }
 */
export function downloadAsPDF(docList, arg2, onProcess) {
    var fileName = 'exports.pdf.js';
    if (typeof arg2 === 'string') fileName = arg2;
    else if (arg2 && arg2.fileName) fileName = arg2.fileName;
    return makePdfDocument(docList, arg2, onProcess).then(doc => {
        saveAs(doc.output('blob'), fileName);
    });
}

export function downloadAsPDFBlob(docList, arg2, onProcess) {
    return makePdfDocument(docList, arg2, onProcess).then(doc => {
        return doc.output('blob')
    });
}




export { PaperPrinter };
export { PrintSerializer } ;

