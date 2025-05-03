function LatLng(lat, lng) {
    this.lat = normalizeLatitude(lat);
    this.lng = normalizeLongitude(lng);
}

/**
 *
 * @param {LatLng} p1
 * @returns {number} - in km
 */
LatLng.prototype.dist = function (p1) {
    var lat0 = this.lat;
    var lat1 = p1.lat;
    var lng0 = this.lng;
    var lng1 = p1.lng;

    var toRad = function (value) {
        return value * Math.PI / 180;
    };
    var R = 6371;
    var dLat = toRad(lat1 - lat0);
    var dLng = toRad(lng1 - lng0);
    lat0 = toRad(lat0);
    lat1 = toRad(lat1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat0) * Math.cos(lat1);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}





LatLng.prototype.toString = function () {
    return this.lat + ', ' + this.lng;
};

LatLng.parse = function (str) {
    var parts = str.split(',');
    if (parts.length !== 2) {
       return null;
    }
    var lat = parseFloat(parts[0]);
    var lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) {
        return null;
    }
    return new LatLng(lat, lng);
};


export function  normalizeLongitude(longitude) {
    return ((longitude + 180) % 360) - 180;
}

export function  normalizeLatitude(latitude) {
    if (latitude > 90) {
        return 90 - (latitude - 90);
    } else if (latitude < -90) {
        return -90 - (latitude + 90);
    }
    return latitude;
}

export default LatLng;