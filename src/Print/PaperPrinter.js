import { loadScript } from "../Network/XLoader";
import Color from "../Color/Color";
import AElement from "../HTML5/AElement";
import Vec2 from "../Math/Vec2";
import Rectangle from "../Math/Rectangle";

import { copyJSVariable } from "../JSMaker/generator";

var fontIdOf = fontName => {
    if (fontName.toLowerCase().indexOf('arial') >= 0) return 'arial';
    if (fontName.toLowerCase().indexOf('times') >= 0) return 'times';
    if (fontName === "Material Design Icons") return 'MDI_6_7_96';
    return fontName;

}

var P2D = 72 / 96;

var color2RGB255 = color => {
    try {
        color = Color.parse(color + '');
        return color.rgba.slice(0, 3).map(x => x * 255 >> 0);
    } catch (e) {
        return null;
    }
};

function PaperPrinter(opt) {
    this.opt = Object.assign(copyJSVariable(this.defaultOptions), opt);

    this.objects = [];
    this.processInfo = {
        state: "STAND_BY"
    };
    this.subDocs = null;
    this.pdfDoc = null;
    this.pageFormat = null;
    this.computedPages = 0;
    this.sync = this.ready().then(() => {
        this.processInfo.state = 'READY';
    });
}

PaperPrinter.prototype.defaultOptions = {
    size: 'a4',
    margin: { top: 57, left: 57, bottom: 57, right: 57 },
    footer: null,
    header: null,
    paddingEven: true
};


PaperPrinter.prototype.share = {
    jsPDFUrl: 'https://absol.cf/vendor/jspdf.umd.js',
    jsPDF: null,
    readySync: null,
    fonts: [
        {
            url: 'https://absol.cf/vendor/fonts/arial.ttf',
            fileName: 'arial.ttf',
            name: 'arial',
            style: 'normal'
        },
        {
            url: 'https://absol.cf/vendor/fonts/arialbd.ttf',
            fileName: 'arialbd.ttf',
            name: 'arial',
            style: 'bold'
        },
        {
            url: 'https://absol.cf/vendor/fonts/ariali.ttf',
            fileName: 'ariali.ttf',
            name: 'arial',
            style: 'italic'
        },
        {
            url: 'https://absol.cf/vendor/fonts/arialbi.ttf',
            fileName: 'arialbi.ttf',
            name: 'arial',
            style: 'bold_italic'
        },

        {
            url: 'https://absol.cf/vendor/fonts/times.ttf',
            fileName: 'times.ttf',
            name: 'times',
            style: 'normal'
        },
        {
            url: 'https://absol.cf/vendor/fonts/timesbd.ttf',
            fileName: 'timesbd.ttf',
            name: 'times',
            style: 'bold'
        },
        {
            url: 'https://absol.cf/vendor/fonts/timesi.ttf',
            fileName: 'timesi.ttf',
            name: 'times',
            style: 'italic'
        },
        {
            url: 'https://absol.cf/vendor/fonts/timesbi.ttf',
            fileName: 'timesbi.ttf',
            name: 'times',
            style: 'bold_italic'
        }
    ]
};

PaperPrinter.prototype.ready = function () {
    var sync;
    if (!this.share.readySync) {
        sync = this.share.fonts.map((font) => {
            return fetch(font.url).then(res => res.blob())
                .then(blob => {
                    var reader = new window.FileReader();
                    return new Promise(rs => {
                        reader.onload = function () {
                            rs(this.result);
                        }
                        reader.readAsDataURL(blob);

                    })
                })
                .then(b64Url => {
                    var idx = b64Url.indexOf('base64,');
                    return b64Url.substring(idx + 'base64,'.length);
                }).then(b64 => {
                    font.content = b64;
                })
        });
        if (window.jspdf) {
            this.share.jsPDF = window.jspdf.jsPDF;
        }
        else {
            sync.push(loadScript(this.share.jsPDFUrl).then(() => {
                this.share.jsPDF = window.jspdf.jsPDF;
            }))
        }
        this.share.readySync = Promise.all(sync);
    }
    return this.share.readySync;
};

/***
 *
 * @param at
 * @param opt
 */
PaperPrinter.prototype.addSubDocument = function (at, opt) {
    this.objects.push({
        type: 'sub_document',
        at: at,
        opt: opt
    });
};

/***
 *
 * @param {string} text
 * @param {Vec2 | Rectangle} pos
 * @param {Object=}style
 */
PaperPrinter.prototype.text = function (text, pos, style) {
    this.objects.push({
        type: 'text',
        pos: pos,
        text: text,
        style: style || {}
    });
    return this;
};

/***
 *
 * @param {string} text
 * @param {Vec2} start
 * @param {Vec2} end
 * @param {Object=}style
 */
PaperPrinter.prototype.line = function (start, end, style) {
    this.objects.push({
        type: 'line',
        start: start,
        end: end,
        style: style || {}
    });
    return this;
};

/***
 *
 * @param {Vec2} at
 * @param {boolean=} paddingEven
 */
PaperPrinter.prototype.pageBreak = function (at, paddingEven) {
    this.objects.push({
        type: 'page_break',
        at: at,
        paddingEven: !!paddingEven
    });
    return this;
};

/***
 *
 * @param {Rectangle}rect
 * @param {Object=}style
 */
PaperPrinter.prototype.rect = function (rect, style) {
    this.objects.push({
        type: 'rect',
        rect: rect,
        style: style || {}
    });
};


/***
 *
 * @param {HTMLCanvasElement|AElement |Image} image
 * @param {Rectangle}rect
 * @param {Object=}style
 */
PaperPrinter.prototype.image = function (image, rect, style) {
    this.objects.push({
        type: 'image',
        rect: rect,
        style: style || {},
        image: image
    });
    return this;
};


PaperPrinter.prototype.boundOf = function (objectData) {
    return this.measures[objectData.type](objectData);
};

PaperPrinter.prototype.computeObjects = function () {
    var objects = this.objects.slice();
    if (!objects[0] || objects[0].type !== 'sub_document') {
        objects.unshift({
            type: 'sub_document',
            at: Vec2.ZERO,
        })
    }
    this.subDocs = objects.reduce((ac, obj) => {
        switch (obj.type) {
            case 'sub_document':
                ac.push({
                    objects: [obj]
                });
                break;
            default:
                ac[ac.length - 1].objects.push(obj);
                break;
        }
        return ac;
    }, []);
    this.subDocs.forEach((doc, i) => {
        doc.objects.forEach((o, i) => {
            o.idx = i;
            o.bound = this.boundOf(o);
        });
        var newDocCmd = doc.objects.shift();
        doc.objects.sort((a, b) => {
            return a.bound.y - b.bound.y;
        });
        doc.opt = Object.assign(copyJSVariable(this.opt), newDocCmd.opt || {});
        doc.objects.unshift(newDocCmd);
        doc.startPage = i > 0 ? this.subDocs[i - 1].startPage + this.subDocs[i - 1].pages.length : this.computedPages;
        if (this.opt.paddingEven && doc.startPage % 2 > 0) doc.startPage++;

        var pageContentHeight = 1123 - doc.opt.margin.top - doc.opt.margin.bottom;
        doc.pages = doc.objects.reduce((ac, cr) => {
            var page = ac[ac.length - 1];
            if (cr.bound.height > pageContentHeight) {
                page.object.push(cr);
            }
            else {
                if (cr.bound.y + cr.bound.height - page.y > pageContentHeight || cr.type === 'page_break') {
                    page = {
                        y: cr.bound.y,
                        objects: [cr]
                    };
                    ac.push(page);
                }
                else {
                    page.objects.push(cr);
                }
            }

            return ac;

        }, [{ objects: [], y: 0 }]);
        doc.pages.forEach(page => page.objects.sort((a, b) => a.idx - b.idx));
        this.computedPages = doc.startPage + doc.pages.length;
    });
};


PaperPrinter.prototype.getDoc = function () {
    this.sync = this.sync.then(() => {
        if (this.pdfDoc) return this.pdfDoc;
        var jsPDF = jspdf.jsPDF;
        this.pdfDoc = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16,
            dpi: 300,
            hotfixes: ["px_scaling"]
        });
        this.share.fonts.forEach(font => {
            this.pdfDoc.addFileToVFS(font.fileName, font.content);
            this.pdfDoc.addFont(font.fileName, font.name, font.style);
        });
        return this.pdfDoc;
    });
    return this.sync;
};

PaperPrinter.prototype.flush = function () {
    this.sync = this.getDoc().then(pdfDoc => {
        this.computeObjects();
        var subDocs = this.subDocs;
        this.subDocs = null;//reset
        var onProcess = this.opt.onProcess;
        var processInfo = this.processInfo;
        processInfo.pdf = {
            all: subDocs.reduce((ac, sD) => ac + sD.objects.length, 0),
            done: 0
        };
        processInfo.onProcess = () => {
            onProcess && onProcess(processInfo);
        };
        processInfo.state = 'RENDER_PDF';
        return subDocs.reduce((sync, doc, i) => {
            return sync.then(() => {
                var startPage = doc.startPage;
                while (pdfDoc.getNumberOfPages() <= startPage) {
                    pdfDoc.addPage();
                }

                return doc.pages.reduce((docSync, page, i) => {
                    return docSync.then(() => {
                        if (pdfDoc.getNumberOfPages() <= startPage + i) {
                            pdfDoc.addPage();
                        }
                        pdfDoc.setPage(startPage + i + 1);
                        page.O = new Vec2(this.opt.margin.left, this.opt.margin.top - page.y);
                        return page.objects.reduce((pageSync, obj) => {
                            return pageSync.then(() => {
                                var type = obj.type;
                                var res = this.pdfHandlers[type](page, pdfDoc, obj);
                                processInfo.pdf.done++;
                                if (res && res.then) {
                                    res.then(() => processInfo.onProcess())
                                }
                                return res;
                            });
                        }, Promise.resolve()).then(() => {
                            pdfDoc.setTextColor(0, 0, 0);
                            pdfDoc.setFontSize(14 * P2D);
                            pdfDoc.setFont('arial', 'normal');
                            pdfDoc.text((i + 1) + '/' + doc.pages.length, 794 - 25, 1123 - 25, { align: 'right' });
                            if (typeof doc.opt.footer === 'string') {
                                pdfDoc.text(doc.opt.footer, 25, 1123 - 25, { align: 'left' });
                            }
                        });
                    })
                }, Promise.resolve())
            })
        }, Promise.resolve());
    });
    return this.sync;
};




PaperPrinter.prototype.exportAsPDF = function () {
    return this.flush().then(()=> this.pdfDoc);
};


PaperPrinter.prototype.pdfHandlers = {
    text: function (context, doc, data) {
        var fontFamily = data.style.fontFamily;
        var lineHeight = data.style.lineHeight || 1.2;
        var color = color2RGB255(data.style.color) || [0, 0, 0];
        doc.setTextColor(color[0], color[1], color[2]);
        var fontSize = data.style.fontSize || 14;
        var textPos = data.pos.A().add(context.O);
        doc.setLineHeightFactor(lineHeight);
        doc.setFontSize(fontSize * P2D);
        doc.setFont(fontIdOf(fontFamily), data.style.fontStyle);
        var style = {
            baseline: 'top',
            maxWidth: data.pos.width
        };
        if (data.style.align) {
            //todo: check align
            style.align = { start: 'left', end: 'right', center: 'center' }[data.style.align] || 'left';
        }
        doc.text(data.text, textPos.x, textPos.y + fontSize * (lineHeight - 1) / 2, style);
    },
    rect: function (context, doc, data) {
        var fillColor = null;
        var strokeColor = null;
        var strokeWidth = data.style.strokeWidth || 1;
        var rounded = data.style.rounded;
        if (typeof rounded === "number") rounded = [rounded, rounded];
        if (data.style.fill) {
            fillColor = color2RGB255(data.style.fill);
        }

        if (data.style.stroke) {
            strokeColor = color2RGB255(data.style.stroke);
        }


        if (fillColor) doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        if (strokeColor) {
            doc.setLineWidth(strokeWidth);
            doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
        }
        var flat = 'F';
        if (strokeColor && fillColor) flat = 'FD';
        else if (strokeColor) flat = 'S';
        else if (fillColor) flat = 'F';
        else return;


        var O = context.O;
        var A = data.rect.A().add(O);
        if (rounded) {
            doc.roundedRect(A.x, A.y, data.rect.width, data.rect.height, rounded[0], rounded[1], flat);
        }
        else {
            doc.rect(A.x, A.y, data.rect.width, data.rect.height, flat);
        }
    },
    line: function (context, doc, data) {
        var fillColor = null;
        var strokeColor = null;
        var strokeWidth = data.style.strokeWidth || 1;
        if (data.style.stroke) {
            strokeColor = color2RGB255(data.style.stroke);
        }

        if (strokeColor) {
            doc.setLineWidth(strokeWidth);
            doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
        }
        var flat = 'S';
        var O = context.O;
        var A = data.start.add(O);
        var B = data.end.add(O);
        doc.line(A.x, A.y, B.x, B.y, flat);
    },

    image: function (context, doc, data) {
        var handleImage = image => {
            if (!image) return;
            var rect = data.rect.clone();
            rect.x += context.O.x;
            rect.y += context.O.y;
            doc.addImage(image, 'PNG', rect.x, rect.y, rect.width, rect.height)
        }

        if (data.image.then) {
            return data.image.then(handleImage).catch(err => {
            });
        }
        else return handleImage(data.image);
    },
    page_break: function (context, doc, data) {
    },
    sub_document: function (context, doc, data) {
    }
};


PaperPrinter.prototype.measures = {
    sub_document: data => {
        return new Rectangle(0, 0, 0, 0);
    }, rect: data => {
        return data.rect;
    },
    text: data => {
        return data.pos;
    },
    image: data => {
        return data.rect;
    },
    line: data => {
        return Rectangle.boundingPoints([data.start, data.end]);
    },
    page_break: data => {
        return new Rectangle(0, data.at.y, 0, 0);
    }
};


export default PaperPrinter;

