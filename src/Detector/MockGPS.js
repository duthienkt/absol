function MockGPS(){
    this._originalGeolocation = null;
    this._isMockLoaded = false;

    // Basic mock state (adjust as needed)
    this.mockPosition = {
        coords: {
            latitude: 0,
            longitude: 0,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
        },
        timestamp: Date.now()
    };

    this._watchTimers = new Map();
    this._nextWatchId = 1;
}


MockGPS.prototype.setLatLng = function (lat, lng) {
    this.mockPosition.coords.latitude = lat;
    this.mockPosition.coords.longitude = lng;
}

MockGPS.runningInstance = null;


MockGPS.prototype._loadMockFunctions = function () {
    if (this._isMockLoaded) return;

    // Ensure geolocation object exists
    if (!navigator.geolocation) navigator.geolocation = {};

    var geo = navigator.geolocation;

    // Save originals (for full restore)
    this._originalGeolocation = {
        getCurrentPosition: geo.getCurrentPosition,
        watchPosition: geo.watchPosition,
        clearWatch: geo.clearWatch
    };

    var self = this;

    geo.getCurrentPosition = function (success, error, options) {
        try {
            self.mockPosition.timestamp = Date.now();
            if (typeof success === 'function') success(self.mockPosition);
        }
        catch (e) {
            if (typeof error === 'function') error(e);
        }
    };

    geo.watchPosition = function (success, error, options) {
        var id = self._nextWatchId++;
        // simple polling to simulate GPS updates
        var interval = (options && typeof options.maximumAge === 'number' && options.maximumAge > 0) ? options.maximumAge : 1000;

        var timer = setInterval(function () {
            try {
                self.mockPosition.timestamp = Date.now();
                if (typeof success === 'function') success(self.mockPosition);
            }
            catch (e) {
                if (typeof error === 'function') error(e);
            }
        }, interval);

        self._watchTimers.set(id, timer);
        return id;
    };

    geo.clearWatch = function (id) {
        var timer = self._watchTimers.get(id);
        if (timer) {
            clearInterval(timer);
            self._watchTimers.delete(id);
        }
    };

    this._isMockLoaded = true;
};

MockGPS.prototype._unloadMockFunctions = function () {
    if (!this._isMockLoaded) return;

    var geo = navigator.geolocation || {};
    var orig = this._originalGeolocation || {};

    // Restore exactly what was there before
    geo.getCurrentPosition = orig.getCurrentPosition;
    geo.watchPosition = orig.watchPosition;
    geo.clearWatch = orig.clearWatch;

    // cleanup mock internals
    this._watchTimers.forEach(function (t) { clearInterval(t); });
    this._watchTimers.clear();

    this._originalGeolocation = null;
    this._isMockLoaded = false;
};

MockGPS.prototype.start = function () {
    if (MockGPS.runningInstance === this) return;// already  running
    if (MockGPS.runningInstance) MockGPS.runningInstance.stop();

    this._loadMockFunctions();
    MockGPS.runningInstance = this;
};


MockGPS.prototype.stop = function () {
    if (MockGPS.runningInstance !== this) return;// not running

    this._unloadMockFunctions();
    MockGPS.runningInstance = null;
};


export default MockGPS;