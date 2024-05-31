if (navigator.geolocation) {
    var getCurrentPosition = navigator.geolocation.getCurrentPosition;
    var lastResult = null;
    navigator.geolocation.getCurrentPosition = function (successCallback, errorCallback, options) {
        if (typeof successCallback !== "function") successCallback = function (){};
        if (typeof errorCallback !== "function") errorCallback = function (){};
        var ended = false;
        var to = setTimeout(function (){
            if (lastResult && !ended) {
                ended = true;
                successCallback && successCallback(lastResult);
            }
            else if (!ended) {
                ended = true;
                errorCallback && errorCallback(new Error("GPS không phản hồi."));
            }
        }, lastResult?5000: 10000);
        getCurrentPosition.call(this, function (result){
            lastResult = result;
            if (!ended) {
                ended = true;
                successCallback && successCallback(lastResult);
            }
        }, function (error) {
            if (error && error.message.indexOf('deni') >0 && !ended) {
                ended = true;
                errorCallback && errorCallback(new Error("Chưa cấp quyền truy cập GPS."));
            }
            else  if (lastResult && !ended) {
                ended = true;
                successCallback && successCallback(lastResult);
            }
            else if (!ended) {
                ended = true;
                errorCallback && errorCallback(error);
            }
        }, {maximumAge: 1000});
    }
}
