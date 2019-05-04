// absol.string = {};

// /**
//  * 
//  * @param {String} s 
//  * @param {Number} maxLength 
//  */
// absol.string.wrapToLines = function (s, maxLength) {
//     var res = [];
//     var currentWord = '';
//     var currentLine = '';
//     for (var i = 0; i < s.length; ++i) {
//         if (s[i].match(/\s/)) {
//             if (currentWord.length + currentLine.length >= maxLength) {
//                 if (currentLine.length > 0) {
//                     res.push(currentLine.trim());
//                     currentLine = '';
//                     currentWord = currentWord.trimLeft() + s[i];
//                 }
//                 else {
//                     currentLine = currentLine + currentWord;
//                     res.push(currentLine.trim());
//                     currentLine = '';
//                     currentWord = '';

//                 }
//             }
//             else {
//                 currentLine = currentLine + currentWord;
//                 currentWord = s[i];
//             }
//         }
//         else {
//             currentWord = currentWord + s[i];
//         }
//     }
//     currentLine = (currentLine + currentWord).trim();
//     if (currentLine.length > 0) res.push(currentLine);
//     return res;
// };

export function nonAccentVietnamese(s) {
    return s.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
        .replace(/\u02C6|\u0306|\u031B/g, "");
};

String.nonAccentVietnamese = nonAccentVietnamese;

String.prototype.nonAccentVietnamese = function () {
    return String.nonAccentVietnamese(this);
}