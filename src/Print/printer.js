import Dom from "../HTML5/Dom";
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
export function downloadAsPDF(elt, arg2, onProcess) {
    var opt = {
        fileName: 'exports.pdf'
    };
    if (typeof arg2 === 'string') opt.fileName = arg2;
    else Object.assign(opt, arg2);
    elt = Dom.ShareInstance.$(elt);
    var serializer = ShareSerializer;
    if (elt.fmComponent) {
        opt.margin = {
            top: elt.fmComponent.style.paddingTop || 57,
            left: elt.fmComponent.style.paddingLeft || 57,
            bottom: elt.fmComponent.style.paddingBottom || 57,
            right: elt.fmComponent.style.paddingRight || 57
        }
    }
    var printer = new PaperPrinter(opt);
    return serializer.serialize(elt, printer, onProcess)
        .then(printer => printer.exportAsPDF(onProcess))
        .then(doc => {
            saveAs(doc.output('blob'), opt.fileName);
        });
}

export { PaperPrinter };
export { PrintSerializer } ;

