
var XLoader = {};

/**
 * Append a cache-busting query param to an URL (keeps existing query and hash).
 * Note: For <script src>, this is the most compatible way to bypass cache,
 * because using `fetch()` first would require CORS for cross-origin scripts.
 *
 * @param {string} url
 * @param {string=} paramName
 * @returns {string}
 */
function withNoCache(url, paramName) {
    url = String(url || '');
    paramName = paramName || '_';

    // Preserve hash fragment
    var hashIndex = url.indexOf('#');
    var hash = '';
    if (hashIndex >= 0) {
        hash = url.slice(hashIndex);
        url = url.slice(0, hashIndex);
    }

    var sep = url.indexOf('?') >= 0 ? '&' : '?';
    var value = Date.now().toString(36) + Math.random().toString(36).slice(2);
    return url + sep + encodeURIComponent(paramName) + '=' + encodeURIComponent(value) + hash;
}

/**
 * Load a script by injecting a <script> tag.
 *
 * @param {string} url
 * @param {function()=} onComplete
 * @param {function(*)=} onError
 * @param {boolean=} noCache If true, appends a cache-busting query param to the URL.
 * @returns {Promise<void>}
 */
export function loadScript(url, onComplete, onError, noCache) {
    if (typeof noCache === 'undefined') {
        noCache = true;
    }
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                    script.onreadystatechange = null;
                    onComplete && onComplete();
                    resolve();
                }
            };
        }
        else {  //Others
            script.onload = function () {
                script.onload = null;
                script.onerror = null;
                onComplete && onComplete();
                resolve();
            };

            script.onerror = function () {
                script.onerror = null;
                script.onload = null;
                script.remove();
                onError && onError();
                reject();
            }
        }

        script.src = noCache ? withNoCache(url) : url;
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}

XLoader.loadScript = loadScript;


export function isImageURLAllowCrossOrigin(url) {
    return new Promise((rs, rj) => {
        url = url ||'';
        if (url.startsWith('data:') || url.startsWith('blob:')) {
            rs(true);
            return;
        }
        var img = new Image();
        // img.crossOrigin = "anonymous";
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = 10;
            canvas.height = 10;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);

            try {
                ctx.getImageData(0, 0, 10, 10);
                rs(true);
            } catch (err) {
                rs(false);
            }
        }

        img.onerror = function (event) {
            rj(event.error || event);
        }

        img.src = url;
    });
}

var blobCache = {};

/***
 *
 * @param {string} url
 * @param {boolean=}noCache
 * @return {*}
 */
export function loadToBlobURL(url, noCache) {
    if (!noCache && blobCache[url]) return blobCache[url];
    var p = fetch(url, noCache ? { cache: 'no-store' } : undefined)
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob));
    if (!noCache) blobCache[url] = p;
    return p;
}

XLoader.loadToBlobURL = loadToBlobURL;


var waitServerReadyPromises = null;
export function waitServerReady(pingUrl, interval, timeout) {
    if (typeof interval !== "number")  interval = 1000;  
    if (typeof timeout !== "number")  timeout = Infinity;
    var endTime = Date.now() + timeout;
    waitServerReadyPromises =  new Promise((resolve, reject) => {
        function ping() {
            fetch(pingUrl, {method: 'HEAD'}).then(res => {
                if (res.ok) {
                    waitServerReadyPromises = null;
                    resolve();
                } else {
                    checkNext();
                }
            }).catch(err => {
                checkNext();
            });
        }
        function checkNext() {
            if (Date.now() > endTime) {
                 waitServerReadyPromises = null;
                reject(new Error("waitServerReady: timeout"));
            } else {
                setTimeout(ping, interval);
            }
        }
        ping();
    });
    return waitServerReadyPromises;
}

XLoader.waitServerReady = waitServerReady;

export default XLoader;