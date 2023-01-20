import Rectangle from "../Math/Rectangle";
import Svg, { svgToExportedString, svgToRasterImageUrl } from "../HTML5/Svg";
import { getTextNodeBound } from "../HTML5/Dom";
import { parseMeasureValue } from "../JSX/attribute";

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
        if (text !== elt.firstChild || elt.childNodes.length > 1) {
            // console.error('Can not print', elt);
            return;
        }

        var bound = Rectangle.fromClientRect(getTextNodeBound(text));
        if (bound.width === 0) return;
        var fontSize = elt.getFontSize();
        var lineHeight = elt.getComputedStyleValue('line-height');
        if (lineHeight === 'normal') lineHeight = 1.2;
        else lineHeight = parseFloat(lineHeight.replace('px', '')) / fontSize;
        if (!isNaN(lineHeight)) lineHeight = 1.2;

        var rect = bound.clone();
        rect.x -= O.x;
        rect.y -= O.y;
        rect.width += 2;
        printer.text(text.data, rect, {
            color: elt.getComputedStyleValue('color'),
            fontFamily: elt.getComputedStyleValue('font-family'),
            lineHeight: lineHeight,
            fontSize: fontSize
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
        console.log(borderRadius)
        scope.declare('borderStyle', {
            width: parseFloat(borderWidth.replace('px', '')),
            radius: parseMeasureValue(borderRadius),
            color: borderColor
        })

        return true;


    },
    exec: (printer, elt, scope, stack, accept) => {
        var borderStyle = scope.get('borderStyle');
        var bound = Rectangle.fromClientRect(elt.getBoundingClientRect());
        var rect = bound.clone();
        rect.x -= printer.O.x;
        rect.y -= printer.O.y;
        var radius = borderStyle.radius;
        var rounded;
        if (radius) {
            switch (radius.unit) {
                case '%':
                    rounded = [radius.value * rect.width/100, radius.value * rect.height/100];
                    break;
                case 'px':
                    rounded = radius.value;
                    break;
            }
        }
        console.log(borderStyle.radius);
        printer.rect(rect, {
            stroke: borderStyle.color,
            rounded: rounded
        })
        console.log(borderStyle)
        return true;
    }
});

PrintSerialHandlers.push({
    id: 'Img',
    match: elt => elt.tagName && elt.tagName.toLowerCase() === 'img',
    exec: (printer, elt, scope, stack, accept) => {
        var bound = Rectangle.fromClientRect(elt.getBoundingClientRect());
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
        var rect = bound.clone();
        rect.x -= printer.O.x;
        rect.y -= printer.O.y;
        var res = Svg.svgToCanvas(elt);
        printer.image(res, rect);
    }
});

PrintSerialHandlers.push({
    id: '*',
    match: () => true,
    exec: (printer, elt, scope, stack, accept) => {
        if (elt.childNodes) {
            Array.prototype.forEach.call(elt.childNodes, child => accept(child));
        }
    }
})

export default PrintSerialHandlers;