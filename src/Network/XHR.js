
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
        Object.assign(request, props);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var response = request.response;
                    success && success(response);
                    rs(response);
                }
                else {

                    rj(request.status);
                    failure && failure(request.status, request.statusText);
                }
            }
        };

        request.onerror = function () {
            rj(new Error("Network Error!"));
        }
    });
};

export default XHR;