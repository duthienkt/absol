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
    this.opt = Object.assign({
        size: 'a4',
        margin: { top: 57, left: 57, bottom: 57, right: 57 },
        footer: null,
        header: null
    }, opt);

    this.objects = [];
    this.processInfo = {};

}


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
        if (window.jsPDF) {
            this.share.jsPDF = window.jsPDF;
        }
        else {
            sync.push(loadScript(this.share.jsPDFUrl).then(() => {
                this.share.jsPDF = window.jsPDF;
            }))
        }
        this.share.readySync = Promise.all(sync);
    }
    return this.share.readySync;
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


PaperPrinter.prototype.exportAsPDF = function (onProcess) {
    var processInfo = copyJSVariable(this.processInfo);
    processInfo.pdf = {
        all: this.objects.length,
        done: 0
    };
    processInfo.state = 'LOAD_LIB';
    processInfo.onProcess = () => {
        onProcess && onProcess(processInfo);
    };
    return this.ready().then(() => {
        processInfo.state = 'RENDER_PDF';
        var doc = new jspdf.jsPDF({
            orientation: 'p',
            unit: 'px',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16,
            dpi: 300,
            hotfixes: ["px_scaling"]
        });
        this.share.fonts.forEach(font => {
            doc.addFileToVFS(font.fileName, font.content);
            doc.addFont(font.fileName, font.name, font.style);
        });

        var objectHolders = this.objects.map((o, i) => {
            var bound = this.boundOf(o);
            return {
                i: i,
                o: o,
                y: bound.y,
                height: bound.height
            };
        });

        objectHolders.sort((a, b) => a.y - b.y);
        var pageContentWidth = 794 - 57 * 2;
        var pageContentHeight = 1123 - 57 * 2;
        var pages = objectHolders.reduce((ac, cr) => {
            var page = ac[ac.length - 1];
            if (cr.height > pageContentHeight) {
                page.holders.push(cr);
            }
            else {
                if (cr.y + cr.height - page.y > pageContentHeight) {
                    page = {
                        y: cr.y,
                        holders: [cr]
                    };
                    ac.push(page);
                }
                else {
                    page.holders.push(cr);
                }
            }

            return ac;

        }, [{ holders: [], y: 0 }]);
        var sync = Promise.resolve();
        pages.forEach(page => {
            page.holders.sort((a, b) => a.i - b.i);
            page.objects = page.holders.map(h => h.o);
        });

        pages.forEach((page, i) => {
            sync = sync.then(() => {
                if (i > 0) {
                    doc.addPage();
                }
                doc.setPage(i + 1);
                page.O = new Vec2(this.opt.margin.left, this.opt.margin.top - page.y);
                var syn2 = Promise.resolve();
                page.objects.forEach(obj => {
                    var type = obj.type;
                    syn2 = syn2.then(() => {
                        var res = this.pdfHandlers[type](page, doc, obj);
                        processInfo.pdf.done++;
                        processInfo.onProcess();
                        return res;
                    });
                });
                syn2 = syn2.then(() => {
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(14 * P2D);
                    doc.setFont('arial', 'normal');
                    doc.text((i + 1) + '/' + pages.length, 794 - 25, 1123 - 25, { align: 'right' });
                    if (typeof this.opt.footer === 'string') {
                        doc.text(this.opt.footer, 25, 1123 - 25, { align: 'left' });
                    }

                });
                return syn2;
            });
        });

        //width: 794px;margin 57
        //     /*height: 1056px;*/

        return sync.then(() => doc);

    });
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
    }
};


PaperPrinter.prototype.measures = {
    rect: data => {
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
    }
};


export default PaperPrinter;

