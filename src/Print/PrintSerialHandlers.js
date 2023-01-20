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
        var style = getComputedStyle(elt);
        var bound = Rectangle.fromClientRect(getTextNodeBound(text));
        if (bound.width === 0) return;
        var fontSize = elt.getFontSize();
        var lineHeight = style.getPropertyValue('line-height');
        if (lineHeight === 'normal') lineHeight = 1.2;
        else lineHeight = parseFloat(lineHeight.replace('px', '')) / fontSize;
        if (!isNaN(lineHeight)) lineHeight = 1.2;
        var fontWeight = style.getPropertyValue('font-weight');
        var fontStyle = fontWeight === '400' ? 'regular' : 'bold';
        var rect = bound.clone();
        rect.x -= O.x;
        rect.y -= O.y;
        rect.width += fontSize / 5;
        printer.text(text.data, rect, {
            color: style.getPropertyValue('color'),
            fontFamily: style.getPropertyValue('font-family'),
            fontStyle: fontStyle,
            lineHeight: lineHeight,
            fontSize: fontSize,
            align: style.getPropertyValue('text-align')
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
            canvas.width = rect.width;
            canvas.height = rect.height;
            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = result ? url : 'https://absol.cf/crossdownload.php?file=' + encodeURIComponent(url);
            var ctx = canvas.getContext('2d');
            return new Promise(rs => {
                image.onload = function () {
                    switch (backgroundSize) {
                        case 'cover':
                        // break;
                        case 'auto':
                        default:
                            ctx.drawImage(image, 0, 0);
                    }
                    rs(canvas);
                }
            })
        }).catch(noop);
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
        var res = Svg.svgToCanvas(elt).catch(err => {
        });
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