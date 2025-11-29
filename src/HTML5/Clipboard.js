
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