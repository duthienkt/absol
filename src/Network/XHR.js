
var XHR = {};


XHR.makeHttpObject = function () {
    try {
        return new XMLHttpRequest();
    }
    catch (error) { }
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (error) { }
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (error) { }

    throw new Error("Could not create HTTP request object.");
};

/***
 * 
 * @param {String} url
 * @param {String} body
 * @param {String} responseType
 * @param {Function} success
 * @param {Function} failure
 * @returns {Promise}
 */
XHR.getRequest = function (url, props, success, failure) {
    return new Promise(function (rs, rj) {
        var request = XHR.makeHttpObject();
        request.open("GET", url, true);
        if (typeof props == 'string')
            request.responseType = props || '';
        else if (props && (typeof props == 'object')) {
            Object.assign(request, props);
        }
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var response = request.response;
                    success && success(response);
                    rs(response);
                }
                else {
                    failure && failure(request.status, request.statusText);
                    rj(request.status);
                }
            }
        };

        request.onerror = function () {
            rj(new Error("Network Error!"));
        };
    });
};


XHR.postRepquest = function (url, bodyJson, props, success, failure) {
    return new Promise(function (rs, rj) {
        var method = "POST";
        var shouldBeAsync = true;

        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    success && success(request.response);
                    rs(request.response);
                }
                else if (failure) {
                    failure && failure(request.status, request.statusText);
                    rj({ status: request.status, statusText: request.statusText });
                }
            }
        };

        request.onerror = function () {
            var error = new Error("Network Error!");
            if (failure) failure(error);
            rj(error);
        };

        request.open(method, url, shouldBeAsync);
        if (typeof props == 'string')
            request.responseType = props || '';
        else if (props && (typeof props == 'object')) {
            Object.assign(request, props);
        }

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        request.send(JSON.stringify(bodyJson));
    });
};



export default XHR;