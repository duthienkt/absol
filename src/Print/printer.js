import Dom from "../HTML5/Dom";
import PrintSerializer from "./PrintSerializer";
import PaperPrinter from "./PaperPrinter";
import { saveAs } from "../Network/FileSaver";

export var ShareSerializer = new PrintSerializer();

export function downloadAsPDF(elt, fileName) {
    elt = Dom.ShareInstance.$(elt);
    var serializer = ShareSerializer;
    var printer = new PaperPrinter();
    return serializer.serialize(elt, printer)
        .then(printer => printer.exportAsPDF())
        .then(doc => {
            saveAs(doc.output('blob'), fileName);
        });
}

export { PaperPrinter };
export { PrintSerializer } ;

