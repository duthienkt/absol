export function copyImage(src) {

    var ranges, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        //backup
        ranges = [];
        for (var i = 0; i < sel.rangeCount; ++i) {
            ranges.push(sel.getRangeAt(i));
        }

        //copy
        var contentdiv = document.createElement('div');
        var image = document.createElement('img');
        contentdiv.appendChild(image);
        image.src = src;
        contentdiv.contentEditable = true;
        // contentdiv.style.display = 'none';
        document.body.appendChild(contentdiv);

        var range = document.createRange();
        range.selectNodeContents(image);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        // contentdiv.remove();

        //recover
        sel.removeAllRanges();
        for (var i = 0; i < sel.rangeCount; ++i) {
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
