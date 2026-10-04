
export function copyImage(src) {
    var i;
    var ranges, sel, range;
    var contentdiv;
    var image;
    if (window.getSelection) {
        sel = window.getSelection();
        //backup
        ranges = [];
        for (i = 0; i < sel.rangeCount; ++i) {
            ranges.push(sel.getRangeAt(i));
        }

        //copy
        contentdiv = document.createElement('div');
        image = document.createElement('img');
        contentdiv.appendChild(image);
        image.src = src;
        contentdiv.contentEditable = true;
        // contentdiv.style.display = 'none';
        document.body.appendChild(contentdiv);

        range = document.createRange();
        range.selectNodeContents(image);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        // contentdiv.remove();

        //recover
        sel.removeAllRanges();
        for (i = 0; i < sel.rangeCount; ++i) {
            sel.addRange(ranges[i]);
        }
    }
    else {
        console.error("Not support copy!")
        //not support IE
    }
}

function fallbackCopyTextToClipboard(text) {
    return new Promise(function (resolve, reject) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                resolve();
            }
            else {
                reject();
            }
        } catch (err) {
            reject(err);
        }

        document.body.removeChild(textArea);
    });
}

export function copyText(text) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text);
}


export function copyNodeContents(node) {
    return new Promise(function (resolve, reject) {
        if (!window.getSelection) {
            reject(new Error('Not support copy!'));
            return;
        }

        var i;
        var sel = window.getSelection();
        var ranges = [];
        for (i = 0; i < sel.rangeCount; ++i) {
            ranges.push(sel.getRangeAt(i));
        }

        try {
            var range = document.createRange();
            range.selectNodeContents(node);
            sel.removeAllRanges();
            sel.addRange(range);

            var successful = document.execCommand('copy');
            if (successful) {
                resolve();
            }
            else {
                reject(new Error('Copy command failed'));
            }
        }
        catch (err) {
            reject(err);
        }
        finally {
            sel.removeAllRanges();
            for (i = 0; i < ranges.length; ++i) {
                sel.addRange(ranges[i]);
            }
        }
    });
}

/**
 * Copy full HTML content by selecting rendered nodes and using copy command.
 * @param {string|Element} html
 */
export function copyFullHTML(html) {
    if (typeof html !== 'string' && !(html instanceof Element))  return Promise.reject(new Error('Invalid argument: html must be a string or an Element'));
    var renderDiv = document.createElement('div');
    renderDiv.contentEditable = 'true';
    renderDiv.style.position = 'fixed';
    renderDiv.style.top = '0';
    renderDiv.style.left = '-100000px';
    renderDiv.style.opacity = '0';
    document.body.appendChild(renderDiv);
    var placeHolder;
    if (typeof html === 'string') {
        renderDiv.innerHTML = html;
    }
    else if (html instanceof Element) {
        if (html.parentElement) {
            placeHolder = document.createElement('div');
            html.parentElement.insertBefore(placeHolder, html);
            renderDiv.appendChild(html);
        }
        else {
            renderDiv.appendChild(html);
        }
    }

    return copyNodeContents(renderDiv).then(()=>{
        if (placeHolder) {
            placeHolder.parentElement.insertBefore(html, placeHolder);
            placeHolder.parentElement.removeChild(placeHolder);
        }
        renderDiv.parentElement.removeChild(renderDiv);
    });
}


function fallbackReadTextFromClipboard() {
    return new Promise(function (resolve, reject) {
        var textArea = document.createElement("textarea");

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();

        try {
            var successful = document.execCommand('paste');
            if (successful) {
                resolve(textArea.value);
            }
            else {
                reject();
            }
        } catch (err) {
            reject(err);
        }

        document.body.removeChild(textArea);
    });
}

export function pasteText() {
    if (navigator.clipboard) {
        return navigator.clipboard.readText();
    }
    else {
        return fallbackReadTextFromClipboard();
    }
}

