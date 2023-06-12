import { loadScript } from "../Network/XLoader";

// var pdLibUrl = 'https://unpkg.com/pdf-lib/dist/pdf-lib.js';
var pdLibUrl = 'https://absol.cf/vendor/pdf-lib.js';

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
        return PDFLib.PDFDocument.load(data);
    }
    else return null;
}

export function mergePdfs(pdfsToMerges, onProcess) {
    var processInfo = {
        all: pdfsToMerges.length,
        loaded: 0,
        merged: 0
    }
    return loadVendorLib().then(() => {
        var pdfSync = pdfsToMerges.map(it => loadPdf(it).then(r => {
            processInfo.loaded++;
            onProcess && onProcess(processInfo);
            return r;
        }));
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
                    processInfo.merged++;
                    onProcess && onProcess(processInfo);
                });
        }, Promise.resolve()).then(() => mergedPdf);
    }).then(mergedPdf => mergedPdf)
}
