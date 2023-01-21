import Rectangle from "../Math/Rectangle";
import Svg, { svgToExportedString, svgToRasterImageUrl } from "../HTML5/Svg";
import { getTextNodeBound } from "../HTML5/Dom";
import { parseMeasureValue } from "../JSX/attribute";
import { isImageURLAllowCrossOrigin } from "../Network/XLoader";
import noop from "../Code/noop";
import Dom from "../HTML5/Dom";

var _ = Dom.ShareInstance._;
var $ = Dom.ShareInstance.$;
var $$ = Dom.ShareInstance.$$;


export function computePrintAttr(elt) {
    var style = getComputedStyle(elt);
    var fontSize = elt.getFontSize();
    var lineHeight = style.getPropertyValue('line-height');
    if (lineHeight === 'normal') lineHeight = 1.2;
    else lineHeight = parseFloat(lineHeight.replace('px', '')) / fontSize;
    if (!isNaN(lineHeight)) lineHeight = 1.2;
    var fontWeight = style.getPropertyValue('font-weight');
    var fontStyle = fontWeight === '400' ? 'regular' : 'bold';
    var dirs = ['top', 'right', 'bottom', 'left'];

    var paddingStyle = dirs.map(dir => parseMeasureValue(style.getPropertyValue('padding-' + dir)));
    var borderWidthStyle = dirs.map(dir => parseMeasureValue(style.getPropertyValue('border-' + dir + '-width')));

    var contentBound = Rectangle.fromClientRect(elt.getBoundingClientRect());
    contentBound.x += paddingStyle[3].value + borderWidthStyle[3].value;
    contentBound.y += paddingStyle[0].value + borderWidthStyle[0].value;
    contentBound.width += paddingStyle[1].value + borderWidthStyle[1].value + paddingStyle[3].value + borderWidthStyle[3].value;
    contentBound.height += paddingStyle[2].value + borderWidthStyle[2].value + paddingStyle[0].value + borderWidthStyle[0].value;

    return {
        contentBound: contentBound,
        whiteSpace: style.getPropertyValue('white-space'),
        style: {
            color: style.getPropertyValue('color'),
            fontFamily: style.getPropertyValue('font-family'),
            fontStyle: fontStyle,
            lineHeight: lineHeight,
            fontSize: fontSize,
            align: style.getPropertyValue('text-align')
        }
    }
}

/***
 *
 * @type {PSHandler[]}
 */
var PrintSerialHandlers = [];


PrintSerialHandlers.push({
    id: 'TextNode',
    match: (elt) => elt.nodeType === Node.TEXT_NODE,
    exec: (printer, text, scope, stack, accept) => {
        var O = printer.O;
        var elt = text.parentElement;
        var bound = Rectangle.fromClientRect(getTextNodeBound(text));
        if (bound.width === 0) return;
        var printAttr = computePrintAttr(elt);
        var txt = text.data;
        var y = -Infinity;
        var c;
        var range;
        var parts = [];
        var cPart;
        var j;
        var delta = printAttr.style.lineHeight * printAttr.style.fontSize / 3;
        var rect;
        var i = 0;

        while (i < txt.length) {
            c = txt[i];
            if (!c.match(/[\s\n]/)) {
                j = i + 1;
                while (j < txt.length) {
                    c = txt[j];
                    if (c.match(/[\s\n]/)) {
                        break;
                    }
                    else {
                        ++j;
                    }
                }
                range = document.createRange();
                range.setStart(text, i);
                range.setEnd(text, j);
                rect = Rectangle.fromClientRect(range.getBoundingClientRect());
                if (Math.abs(rect.y - y) < delta) {
                    cPart.end = j;
                    cPart.rect = cPart.rect.merge(rect);
                }
                else {
                    cPart = {
                        start: i,
                        end: j,
                        rect: rect
                    };
                    y = rect.y;
                    parts.push(cPart);
                }
                i = j;
            }
            else {
                ++i;
            }
        }

        parts.forEach(part => {
            rect = part.rect;
            rect.x -= O.x;
            rect.y -= O.y;
            rect.width += printAttr.style.fontSize * 1000;
            var lineTxt = txt.substring(part.start, part.end);
            if (printAttr.whiteSpace === 'normal') {
                lineTxt = lineTxt.replace(/[\s\n]+/g, ' ');
            }
            printer.text(lineTxt, rect, printAttr.style);
        });
    }
});


PrintSerialHandlers.push({
    id: 'Border',
    match: (elt, scope, stack) => {
        var style = getComputedStyle(elt);
        var borderColor = style.getPropertyValue('border-color');
        var borderStyle = style.getPropertyValue('border-style');
        var borderWidth = style.getPropertyValue('border-width');
        var borderRadius = style.getPropertyValue('border-radius');
        if (borderStyle === 'none' || borderWidth === '0px') return false;
        scope.declare('borderStyle', {
            width: parseFloat(borderWidth.replace('px', '')),
            radius: parseMeasureValue(borderRadius),
            color: borderColor,
        })

        return true;


    },
    exec: (printer, elt, scope, stack, accept) => {
        var borderStyle = scope.get('borderStyle');
        var bound = Rectangle.fromClientRect(elt.getBoundingClientRect());
        var rect = bound.clone();
        var strokeWidth = borderStyle.width;
        rect.x -= printer.O.x - strokeWidth / 2;
        rect.y -= printer.O.y - strokeWidth / 2;
        rect.width -= strokeWidth;
        rect.height -= strokeWidth;
        var radius = borderStyle.radius;
        var rounded;
        if (radius) {
            switch (radius.unit) {
                case '%':
                    rounded = [radius.value * rect.width / 100, radius.value * rect.height / 100];
                    break;
                case 'px':
                    rounded = radius.value;
                    break;
            }
        }
        printer.rect(rect, {
            stroke: borderStyle.color,
            rounded: rounded,
            strokeWidth: strokeWidth
        });
        return true;
    }
});


PrintSerialHandlers.push({
    id: 'BackgroundImage',
    match: (elt, scope, stack) => {
        return elt.getComputedStyleValue('background-image') !== 'none';
    },
    exec: (printer, elt, scope, stack, accept) => {
        var style = getComputedStyle(elt);
        var backgroundSize = style.getPropertyValue('background-size');
        var url = style.getPropertyValue('background-image').trim()
            .replace('url("', '')
            .replace('")', '');
        var rect = Rectangle.fromClientRect(elt.getBoundingClientRect());
        rect.x -= printer.O.x;
        rect.y -= printer.O.y;
        var image = isImageURLAllowCrossOrigin(url).then(result => {
            /***
             *
             * @type {HTMLCanvasElement}
             */
            var canvas = document.createElement('canvas');
            var width = rect.width;
            var height = rect.height;
            canvas.width = width;
            canvas.height = height;
            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = result ? url : 'https://absol.cf/crossdownload.php?file=' + encodeURIComponent(url);
            var ctx = canvas.getContext('2d');
            return new Promise(rs => {
                image.onload = function () {
                    var scale;
                    var nW;
                    var nH;//todo: handle more
                    switch (backgroundSize) {
                        case 'cover':
                            scale = Math.max(width / image.naturalWidth, height / image.height);
                            nW = image.naturalWidth * scale;
                            nH = image.naturalHeight * scale
                            ctx.drawImage(image, 0, 0, nW, nH);
                            break;
                        case 'auto':
                        default:
                            ctx.drawImage(image, 0, 0);
                    }
                    rs(canvas);
                };
                image.onerror = function () {
                    console.error('can not load ', image.src)
                    rs(null);
                }
            })
        }).catch(err => {
            console.error(err);
        });
        printer.image(image, rect);
        return true;
    }
});

PrintSerialHandlers.push({
    id: 'Img',
    match: elt => elt.tagName && elt.tagName.toLowerCase() === 'img' && elt.src && elt.naturalWidth,
    exec: (printer, elt, scope, stack, accept) => {
        var bound = Rectangle.fromClientRect(elt.getBoundingClientRect());
        if (bound.width === 0) return;
        var rect = bound.clone();
        rect.x -= printer.O.x;
        rect.y -= printer.O.y;
        printer.image(elt, rect);
    }
});


PrintSerialHandlers.push({
    id: 'Canvas',
    match: elt => elt.tagName && elt.tagName.toLowerCase() === 'canvas',
    exec: (printer, elt, scope, stack, accept) => {
        var bound = Rectangle.fromClientRect(elt.getBoundingClientRect());
        if (bound.width === 0) return;
        var rect = bound.clone();
        rect.x -= printer.O.x;
        rect.y -= printer.O.y;
        printer.image(elt, rect);
    }
});


PrintSerialHandlers.push({
    id: 'SVG',
    match: elt => elt.tagName && elt.tagName.toLowerCase() === 'svg',
    exec: (printer, elt, scope, stack, accept) => {
        var bound = Rectangle.fromClientRect(elt.getBoundingClientRect());
        if (bound.width === 0) return;
        var rect = bound.clone();
        rect.x -= printer.O.x;
        rect.y -= printer.O.y;
        var res = Svg.svgToCanvas(elt.__origin__).catch(err => {
            console.error(err);
        });
        res.elt = elt;
        printer.image(res, rect);
    }
});

PrintSerialHandlers.push({
    id: 'TextInput',
    match: (elt, scope, stack) => {
        return elt.tagName === 'INPUT' && (elt.attr('type') === 'text' || elt.attr('type') === 'number');
    },
    exec: (printer, elt, scope, stack, accept) => {
        var O = printer.O;
        var style = getComputedStyle(elt);
        var paddingLeft = parseMeasureValue(style.getPropertyValue('padding-left'));
        var paddingTop = parseMeasureValue(style.getPropertyValue('padding-top'));
        var paddingBottom = parseMeasureValue(style.getPropertyValue('padding-bottom'));
        var borderLeftWidth = parseMeasureValue(style.getPropertyValue('border-left-width'));
        var borderTopWidth = parseMeasureValue(style.getPropertyValue('border-top-width'));
        var borderBottomWidth = parseMeasureValue(style.getPropertyValue('border-top-width'));
        var rect = Rectangle.fromClientRect(elt.getBoundingClientRect());
        var fontSize = elt.getFontSize();
        var lineHeight = style.getPropertyValue('line-height');
        if (lineHeight === 'normal') lineHeight = 1.2;
        else lineHeight = parseFloat(lineHeight.replace('px', '')) / fontSize;
        if (!isNaN(lineHeight)) lineHeight = 1.2;
        var fontWeight = style.getPropertyValue('font-weight');
        var fontStyle = fontWeight === '400' ? 'regular' : 'bold';
        rect.width = 700;
        rect.x += borderLeftWidth.value + paddingLeft.value - O.x;
        rect.height -= borderTopWidth.value + borderBottomWidth.value + paddingTop.value + paddingBottom.value;
        rect.y += borderTopWidth.value + paddingTop.value - O.y;
        var centerY = rect.centerPoint().y;
        rect.y = centerY - fontSize * lineHeight / 2;
        rect.height = fontSize * lineHeight;

        printer.text(elt.value, rect, {
            fontFamily: style.getPropertyValue('font-family'),
            fontStyle: fontStyle,
            fontSize: fontSize,
            lineHeight: lineHeight
        });
    }
});


PrintSerialHandlers.push({
    id: '*',
    match: () => true,
    exec: (printer, elt, scope, stack, accept) => {
        if (elt.getComputedStyleValue('display') === 'none') return;
        if (elt.childNodes) {
            Array.prototype.forEach.call(elt.childNodes, child => accept(child));
        }
    }
})

export default PrintSerialHandlers;