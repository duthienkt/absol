
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

function fallbackReadHTMLFromClipboard() {
    return new Promise(function (resolve, reject) {
        var contentDiv = document.createElement('div');
        var activeElement = document.activeElement;
        var sel = window.getSelection ? window.getSelection() : null;
        var ranges = [];
        var i;
        if (sel) {
            for (i = 0; i < sel.rangeCount; ++i) {
                ranges.push(sel.getRangeAt(i).cloneRange());
            }
        }

        contentDiv.contentEditable = 'true';
        contentDiv.style.position = 'fixed';
        contentDiv.style.top = '0';
        contentDiv.style.left = '-100000px';
        contentDiv.style.opacity = '0';

        try {
            document.body.appendChild(contentDiv);
            contentDiv.focus();
            if (sel) {
                var range = document.createRange();
                range.selectNodeContents(contentDiv);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            if (document.execCommand('paste')) {
                resolve(contentDiv.innerHTML);
            }
            else {
                reject(new Error('Paste command failed'));
            }
        }
        catch (err) {
            reject(err);
        }
        finally {
            if (contentDiv.parentNode) {
                contentDiv.parentNode.removeChild(contentDiv);
            }
            if (activeElement && typeof activeElement.focus === 'function') {
                activeElement.focus();
            }
            if (sel) {
                sel.removeAllRanges();
                for (i = 0; i < ranges.length; ++i) {
                    sel.addRange(ranges[i]);
                }
            }
        }
    });
}

/**
 * Read HTML from the clipboard. Resolves to an empty string if no HTML is available.
 * @returns {Promise<string>}
 */
export function pasteHTML() {
    if (!navigator.clipboard || typeof navigator.clipboard.read !== 'function') {
        return fallbackReadHTMLFromClipboard();
    }
    return Promise.resolve().then(function () {
        return navigator.clipboard.read();
    }).then(function (items) {
        for (var i = 0; i < items.length; ++i) {
            if (items[i].types.indexOf('text/html') >= 0) {
                return items[i].getType('text/html').then(function (blob) {
                    return blob.text();
                });
            }
        }
        return '';
    }).catch(function () {
        return fallbackReadHTMLFromClipboard();
    });
}

/**
 * Read files from a paste event without preventing its default behavior.
 * @param {ClipboardEvent} event
 * @returns {File[]}
 */
export function readFileFromPasteEvent(event) {
    var data = event && event.clipboardData;
    var files = [];
    if (!data) return files;
    if (data.files && data.files.length) {
        return Array.prototype.slice.call(data.files);
    }
    if (data.items) {
        for (var i = 0; i < data.items.length; ++i) {
            if (data.items[i].kind === 'file') {
                var file = data.items[i].getAsFile();
                if (file) files.push(file);
            }
        }
    }
    return files;
}

function fallbackReadFilesFromClipboard() {
    return new Promise(function (resolve, reject) {
        var contentDiv = document.createElement('div');
        var activeElement = document.activeElement;
        var sel = window.getSelection ? window.getSelection() : null;
        var ranges = [];
        var files = [];
        var pasted = false;
        var i;
        if (sel) {
            for (i = 0; i < sel.rangeCount; ++i) {
                ranges.push(sel.getRangeAt(i).cloneRange());
            }
        }

        function onPaste(event) {
            if (!event.clipboardData) return;
            pasted = true;
            event.preventDefault();
            files = readFileFromPasteEvent(event);
        }

        contentDiv.contentEditable = 'true';
        contentDiv.style.position = 'fixed';
        contentDiv.style.top = '0';
        contentDiv.style.left = '-100000px';
        contentDiv.style.opacity = '0';
        contentDiv.addEventListener('paste', onPaste);

        try {
            document.body.appendChild(contentDiv);
            contentDiv.focus();
            if (sel) {
                var range = document.createRange();
                range.selectNodeContents(contentDiv);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            var successful = document.execCommand('paste');
            if (pasted) {
                resolve(files);
            }
            else {
                reject(new Error(successful ? 'Clipboard file data is unavailable' : 'Paste command failed'));
            }
        }
        catch (err) {
            reject(err);
        }
        finally {
            contentDiv.removeEventListener('paste', onPaste);
            if (contentDiv.parentNode) {
                contentDiv.parentNode.removeChild(contentDiv);
            }
            if (activeElement && typeof activeElement.focus === 'function') {
                activeElement.focus();
            }
            if (sel) {
                sel.removeAllRanges();
                for (i = 0; i < ranges.length; ++i) {
                    sel.addRange(ranges[i]);
                }
            }
        }
    });
}

/**
 * Read non-text clipboard data as files. Resolves to [] if none is available.
 * Clipboard API does not preserve original filenames; generated names are used.
 * @returns {Promise<File[]>}
 */
export function pasteFiles() {
    if (!navigator.clipboard || typeof navigator.clipboard.read !== 'function') {
        return fallbackReadFilesFromClipboard();
    }
    return Promise.resolve().then(function () {
        return navigator.clipboard.read();
    }).then(function (items) {
        var files = [];
        items.forEach(function (item, index) {
            item.types.forEach(function (type) {
                if (type.indexOf('text/') === 0) return;
                files.push(item.getType(type).then(function (blob) {
                    if (blob instanceof File) return blob;
                    var extension = type.split('/')[1].split(';')[0].split('+')[0].replace(/[^a-z0-9_-]/gi, '');
                    return new File([blob], 'clipboard-' + (index + 1) + (extension ? '.' + extension : ''), {
                        type: blob.type || type
                    });
                }));
            });
        });
        return Promise.all(files);
    }).catch(function () {
        return fallbackReadFilesFromClipboard();
    });
}
