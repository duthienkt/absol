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

export default XLoader;