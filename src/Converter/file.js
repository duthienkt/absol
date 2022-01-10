import ext2MineType from "./ext2MineType";

export function blobToFile(theBlob, fileName) {
    return new File([theBlob], fileName);
}

export function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;

}

export function blobToArrayBuffer(blob) {
    var fileReader = new FileReader();
    return new Promise(function (rs) {
        fileReader.onload = function (event) {
            var arrayBuffer = event.target.result;
            rs(arrayBuffer);
        };
        fileReader.readAsArrayBuffer(blob);
    });
}

export function stringToBlob(text, type) {
    type = type || 'text/plain';
    var mineTye = type.split('/').length === 2 ? type : (ext2MineType[type] || 'text/plain');
    return new Blob([text], {
        type: mineTye
    });
}