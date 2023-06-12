import { loadScript } from "../Network/XLoader";

// var pdLibUrl = 'https://unpkg.com/pdf-lib/dist/pdf-lib.js';
var pdLibUrl = 'https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js';

var libSync = null;

function loadVendorLib() {
    if (libSync) return libSync;
    if ('PDFLib' in window) {
        libSync = Promise.resolve(window.PDFLib);
    }
    else {
        libSync = loadScript(pdLibUrl).then(() => window.PDFLib)
    }
    return libSync;
}

function loadPdf(data) {
    if (typeof data === "string") {
        return fetch(data).then(res => res.arrayBuffer()).then(buff => loadPdf(buff));
    }
    else if (data instanceof ArrayBuffer) {
        return PDFLib.PDFDocument.create(data);
    }
    else return null;
}

export function mergePdfs(pdfsToMerges) {
    return loadVendorLib().then(() => {
        var pdfSync = pdfsToMerges.map(it => loadPdf(it));
        pdfSync.push(PDFLib.PDFDocument.create());
        return Promise.all(pdfSync);
    }).then(pdfs => {
        var mergedPdf = pdfs.pop();
        return pdfs.reduce((sync, pdf) => {
            return mergedPdf.copyPages(pdf, pdf.getPageIndices()).then(copiedPages => sync.then(() => copiedPages))
                .then(copiedPages => {
                    copiedPages.forEach((page) => {
                        mergedPdf.addPage(page);
                    });
                });
        }, Promise.resolve()).then(() => mergedPdf);
    }).then(mergedPdf => mergedPdf)
}
