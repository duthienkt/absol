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
export function downloadAsPDF(elt, fileName, onProcess) {
    elt = Dom.ShareInstance.$(elt);
    var serializer = ShareSerializer;
    var printer = new PaperPrinter();
    return serializer.serialize(elt, printer, onProcess)
        .then(printer => printer.exportAsPDF(onProcess))
        .then(doc => {
            saveAs(doc.output('blob'), fileName);
        });
}

export { PaperPrinter };
export { PrintSerializer } ;

