/**
 * Encode a Unicode string into Base64.
 *
 * @param {string} str - Unicode text to encode.
 * @returns {string} Base64 representation of the input text.
 */
export function base64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
};

/**
 * Decode a Base64 string back to a Unicode string.
 *
 * @param {string} str - Base64 text to decode.
 * @returns {string} Decoded Unicode text.
 */
export function base64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


export var UnicodeBase64Converter = {
    encode: base64EncodeUnicode,
    decode: base64DecodeUnicode
};