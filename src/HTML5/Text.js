import Dom from "./Dom";

export function getTextNodesIn(node) {
    var textNodes = [];
    if (node.nodeType == 3) {
        textNodes.push(node);
    } else {
        var children = node.childNodes;
        for (var i = 0, len = children.length; i < len; ++i) {
            textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
        }
    }
    return textNodes;
};

/**
 * 
 * @param {Element} el 
 * @param {Range} range 
 * @param {Number} start 
 * @returns {Number} -1: ok,  ret >= 0(is length of text) : need move to next element
 * 
 */
export function setSelectionRangeStart(el, range, start) {
    if (start > 0) {
        if (el.nodeType == Node.TEXT_NODE) {
            var text = el.data;
            if (start <= text.length) {
                range.setStart(el, start);
                return -1;
            }
            else
                return text.length;
        } if (el.tagName.toLowerCase() == 'br') {
            return 0;
        }
        else {
            var delta = 0;
            var i = 0;
            var textLength = 0;
            var newLine = false;
            while (delta >= 0 && i < el.childNodes.length) {
                var childElt = el.childNodes[i];

                if (newLine) {
                    newLine = false;
                    ++textLength;
                }
                delta = setSelectionRangeStart(childElt, range, start - textLength);

                if (delta >= 0) textLength += delta;
                if (childElt.nodeType != Node.TEXT_NODE
                    && (window.getComputedStyle(childElt).display == 'block'
                        || childElt.tagName.toLowerCase() == 'br')) {
                    newLine = true;
                }
                ++i;
            }
            if (delta >= 0) return textLength;
            return -1;
        }
    }
    else {
        range.setStart(el, 0);
        return -1;
    }
}

/**
 * 
 * @param {Element} el 
 * @param {Range} range 
 * @param {Number} end 
 * @returns {Number} -1: ok,  ret >= 0(is length of text) : need move to next element
 * 
 */
export function setSelectionRangeEnd(el, range, end) {
    if (end > 0) {
        if (el.nodeType == Node.TEXT_NODE) {
            var text = el.data;
            if (end <= text.length) {
                range.setEnd(el, end);
                return -1;
            }
            else
                return text.length;
        } if (el.tagName.toLowerCase() == 'br') {
            return 0;
        }
        else {
            var delta = 0;
            var i = 0;
            var textLength = 0;
            var newLine = false;
            while (delta >= 0 && i < el.childNodes.length) {
                var childElt = el.childNodes[i];

                if (newLine) {
                    newLine = false;
                    ++textLength;
                }
                delta = setSelectionRangeEnd(childElt, range, end - textLength);

                if (delta >= 0) textLength += delta;
                if (childElt.nodeType != Node.TEXT_NODE
                    && (window.getComputedStyle(childElt).display == 'block'
                        || childElt.tagName.toLowerCase() == 'br')) {
                    newLine = true;
                }
                ++i;
            }
            if (delta >= 0) return textLength;
            return -1;
        }
    }
    else {
        range.setEnd(el, 0);
        return -1;
    }
}

export function setSelectionRange(el, start, end) {
    if (document.createRange && window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(el);
        if (start >= 0) {
            var delta = setSelectionRangeStart(el, range, start);
            if (delta >= 0) range.setStart(el, el.childNodes.length);
        }
        else {
            start = 0;
            range.setStart(el, 0);
        }
        if (end >= start) {
            var delta = setSelectionRangeEnd(el, range, end);
            if (delta >= 0) range.setEnd(el, el.childNodes.length);
        }
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(true);
        textRange.moveEnd("character", end);
        textRange.moveStart("character", start);
        textRange.select();
    }
};

export function getTextIn(e) {
    if (e.nodeType == Node.TEXT_NODE) {
        return e.data;
    }
    if (e.tagName && e.tagName.toLowerCase() == 'br') return '';

    var texts = [];
    var newLine = false;
    for (var i = 0; i < e.childNodes.length; ++i) {
        if (newLine) {
            newLine = false;
            texts.push('\n');
        }
        var childElt = e.childNodes[i];
        texts.push(getTextIn(childElt));


        if (childElt.nodeType != Node.TEXT_NODE
            && (window.getComputedStyle(childElt).display == 'block'
                || childElt.tagName.toLowerCase() == 'br')) {
            newLine = true;
        }
    }
    return texts.join('');
}


export function textToNodes(text) {
    var lines = text.split(/\r?\n/);
    return lines.map(function (text) {
        if (text.length == 0) {
            return Dom.ShareInstance._({
                child: { tag: 'br' }
            });
        }
        else {
            return Dom.ShareInstance._({
                child: { text: text }
            });
        }
    });
};
