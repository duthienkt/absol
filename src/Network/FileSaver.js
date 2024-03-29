import BrowserDetector from "../Detector/BrowserDetector";


/***
 * @typedef {{revokeTimeout?: number, autoBom?:boolean }} FileSaverOpts
 *
 */
export function fileExist(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);
    return new Promise(function (resolve) {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve(xhr.status === 200);
            }
        };

        xhr.onerror = function (err) {};

        xhr.send();
    });
}

/***
 *
 * @param url
 * @param name
 * @param {FileSaverOpts} opts
 */
function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        saveAs(xhr.response, name, opts);
    }
    xhr.onerror = function () {
        console.error('Could not download: ' + url);
    };
    xhr.send(null);
}


function bom(blob, opts) {
    if (typeof opts === undefined)
        opts = { autoBom: false };
    else if (typeof opts !== 'object')
        opts = { autoBom: !opts };

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
    }
    return blob;
}

function corsEnabled(url) {
    var xhr = new XMLHttpRequest();
    return new Promise(function (resolve) {
        xhr.onload = function () {
            resolve(xhr.status >= 200 && xhr.status < 299);
        };
        xhr.onerror = function () {
            resolve(xhr.status >= 200 && xhr.status < 299);
        }
        xhr.open('HEAD', url, true);
        xhr.send();
    });
}

function click(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
            20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
    }
}

function normalSaveAs(blob, name, opts) {
    var URL = window.URL || window.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener';
    if (typeof blob === 'string') {
        a.href = blob;
        if (a.origin !== location.origin) {
            corsEnabled(a.href).then(function (result){
               if (result) {
                   download(blob, name, opts);
               }
               else {
                   a.target = '_blank';
                   click(a);
               }
            });
        }
        else {
            click(a);
        }
    }
    else {
        a.href = URL.createObjectURL(blob);
        setTimeout(function () {
        }, ((opts && opts.revokeTimeout) || 4E4));
        setTimeout(function () {
            click(a);
        }, 0);
    }
}

function msSaveAs(blob, name, opts) {
    name = name || blob.name || 'download';
    if (typeof blob === 'string') {
        corsEnabled(blob).then(function (result) {
            if (result) {
                download(blob, name, opts);
            }
            else {
                var a = document.createElement('a');
                a.href = blob;
                a.target = '_blank';
                setTimeout(function () {
                    click(a);
                });
            }
        });
    }
    else {
        navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
}

function popupSaveAs(blob, name, opts, popup) {
    if (typeof blob === 'string') {
        download(blob, name, opts);
        return;
    }
    popup = popup || open('', '_blank');
    if (popup) {
        popup.document.title = name || 'download';
        popup.document.body.innerText = "downloading..."
    }
    name = name || blob.name || 'download';
    blob.name = name;
    var force = blob.type === 'application/octet-stream';
    var isSafari = BrowserDetector.isSafari;
    var isChromeIOS = BrowserDetector.isChromeIOS;
    var isMacOSWebView = BrowserDetector.isMacOSWebView;
    var isSafariUnder13 = (BrowserDetector.browser.type === 'safari' && parseFloat(BrowserDetector.browser.version) < 13);
    if ((!isChromeIOS || (force && isSafari) || isMacOSWebView)
        && typeof FileReader !== 'undefined' & !isSafariUnder13) {
        var reader = new FileReader();
        reader.onloadend = function () {
            var url = reader.result;
            url = isChromeIOS ? url : url.replace(/^data:[^;]*/, 'data:attachment/file');
            if (popup) popup.location.href = url;
            else location = url;
            popup = null;
        };
        reader.readAsDataURL(blob);
    }
    else {
        var URL = window.URL || window.webkitURL;
        var url = URL.createObjectURL(blob);
        if (popup) popup.location.href = url;
        else location.href = url;
        popup = null;
        setTimeout(function () {
            URL.revokeObjectURL(blob);
        }, (opts && opts.revokeTimeout) || 4E4);
    }
}

/***
 *
 * @param {string  | File | Blob}blob
 * @param {string=} name
 * @param {Object=} opts
 * @param {Object=} popup
 */
export function saveAs(blob, name, opts, popup) {
    if (typeof window !== "object" || window !== self) {
        console.error("FileSaver is not support!")
    }
    else if ('wkSaveAs' in navigator) {
        navigator.wkSaveAs(blob, name, opts);
    }
    else if ('download' in HTMLAnchorElement.prototype && !BrowserDetector.isMacOSWebView) {
        normalSaveAs(blob, name, opts);
    }
    else if ('msSaveOrOpenBlob' in navigator) {
        msSaveAs(blob, name, opts);
    }
    else {
        setTimeout(function () {
            popupSaveAs(blob, name, opts, popup);
        }, 100)
    }
}

export function saveTextAs(text, name, opts) {
    var blob = new Blob([text], { type: 'text/plain' });
    saveAs(blob, name, opts);
}
