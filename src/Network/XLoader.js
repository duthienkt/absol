
var XLoader = {};

export function loadScript(url, onComplete, onError) {
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

        script.src = url;
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

export default XLoader;