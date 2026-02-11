import { waitImageLoaded } from "./Dom";
import { blobToFile } from "../Converter/file";
import safeThrow from "../Code/safeThrow";

export function loadImageElement(imgInput) {
    var img;
    var url;
    if (imgInput && imgInput.tagName === 'IMG') {
        img = imgInput;
    }
    else if (typeof imgInput === 'string') {
        url = imgInput.trim();
    }
    else if (imgInput instanceof File || imgInput instanceof Blob) {
        url = URL.createObjectURL(imgInput);
    }
    if (!img) {
        if (url) {
            img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
        }
        else {
            return Promise.resolve(null);
        }
    }
    return waitImageLoaded(img).then(x => {
        if (!img.naturalWidth) return null;
        return img;
    });
}

/**
 * Check whether the provided MIME type, Blob/File, or data URL represents an SVG.
 *
 * @param {string|Blob|File} input - MIME type string, data URL, or a Blob/File instance.
 * @returns {boolean} True if the input indicates SVG (image/svg+xml), false otherwise.
 */
export function isMimeTypeSvg(input) {
    if (!input) return false;

    // If a Blob/File, use its type property
    if (input instanceof Blob) {
        return typeof input.type === 'string' && /image\/svg\+xml/i.test(input.type);
    }

    if (typeof input !== 'string') return false;

    const s = input.trim();

    // data: URI — inspect media type portion
    if (s.startsWith('data:')) {
        const comma = s.indexOf(',');
        const meta = comma === -1 ? s.slice(5) : s.slice(5, comma);
        return /image\/svg\+xml/i.test(meta);
    }

    // plain MIME type or content-type header (may include parameters)
    return /(^|;|\s)image\/svg\+xml($|;|,|\s)/i.test(s) || /image\/svg\+xml/i.test(s);
}

/**
 *
 * @typedef {Object} ResizeOptions
 * @property {number} [minWidth]
 * @property {number} [maxWidth]
 * @property {number} [minHeight]
 * @property {number} [maxHeight]
 * @property {number} [width]
 * @property {number} [height]
 * @property {boolean} excludeSvg
 * @property {'contain'|'cover'|'stretch'} [size='contain'] - 'contain' preserves aspect ratio and fits image inside the box (may leave empty space); 'cover' preserves aspect ratio and fills the box (cropping overflow); 'stretch' ignores aspect ratio and stretches to exactly the box.
 * @property {string} [mimeType] - Output MIME type, defaults to original or 'image/png'.
 * @property {number} [quality] - Number 0..1 for lossy formats.
 * @property {"File"|"Blob"|"DataURI"} [resultType] default Blob
 */


/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number=} quality
 * @param {string=} mimeType
 */
export function canvasToBlobSync(canvas, quality, mimeType) {
    quality = quality || 1;
    mimeType = mimeType || 'image/png';
    var dataURL = canvas.toDataURL(mimeType, quality);
    // convert dataURL to Blob
    var parts = dataURL.split(',');
    var header = parts[0];
    var base64 = parts[1];
    var bin = atob(base64);
    var len = bin.length;
    var u8 = new Uint8Array(len);
    for (var i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
    return new Blob([u8], { type: mimeType });
}


export function canvasToBlobAsync(canvas, quality, mimeType) {
    return new Promise((rs) => {
        if (canvas.toBlob) {
            canvas.toBlob(function (blob) {
                rs(blob);
            }, mimeType || 'image/png', quality || 1);
        }
        else {
            rs(canvasToBlobSync(canvas, quality, mimeType));
        }

    });
}

/**
 *
 * @param {string|File|Blob|HTMLImageElement} file
 * @param {ResizeOptions} [opt]
 * @returns {Promise<Blob|null>}
 */
export function resizeImageFile(file, opt) {
    opt = opt || {};
    if (opt.excludeSvg) {
        if (isMimeTypeSvg(file)) {
            return Promise.resolve(file);
        }
    }
    var sizeMode = opt.size || 'contain';
    var mimeType = opt.mimeType || null;
    var quality = typeof opt.quality === 'number' ? opt.quality : undefined;
    var resultType = opt.resultType || ((file instanceof File) ? 'File' : 'Blob');


    function clamp(v, min, max) {
        if (typeof min === 'number') v = Math.max(v, min);
        if (typeof max === 'number') v = Math.min(v, max);
        return v;
    }

    return loadImageElement(file).then(img => {
        if (!img) return null;
        const ow = img.naturalWidth;
        const oh = img.naturalHeight;

        // Desired box
        const boxW = typeof opt.width === 'number' ? opt.width : null;
        const boxH = typeof opt.height === 'number' ? opt.height : null;
        var canvasW, canvasH, drawW, drawH, dx, dy, scale;
        dx = 0;
        dy = 0;
        scale = 1;
        var targetW, targetH;
        if (sizeMode === 'stretch') {
            canvasW = boxW || ow;
            canvasH = boxH || oh;
            drawW = canvasW;
            drawH = canvasH;
            dx = 0;
            dy = 0;
        }
        else if (sizeMode === 'contain') {
            if (boxW || boxH) {
                if (boxW && boxH) {
                    scale = Math.min(boxW / ow, boxH / oh);
                }
                else if (boxW) {
                    scale = boxW / ow;
                }
                else {
                    scale = boxH / oh;
                }

                drawW = Math.round(ow * scale);
                drawH = Math.round(oh * scale);
                canvasW = boxW || drawW;
                canvasH = boxH || drawH;
                dx = Math.round((canvasW - drawW) / 2);
                dy = Math.round((canvasH - drawH) / 2);
            }
            else {
                targetW = ow;
                targetH = oh;
                if (opt.minWidth || opt.maxWidth) {
                    targetW = clamp(targetW, opt.minWidth, opt.maxWidth);
                    scale = targetW / ow;
                    targetH = Math.round(oh * scale);
                }
                if (opt.minHeight || opt.maxHeight) {
                    targetH = clamp(targetH, opt.minHeight, opt.maxHeight);
                    scale = targetH / oh;
                    targetW = Math.round(ow * scale);
                }
                canvasW = targetW;
                canvasH = targetH;
                drawW = targetW;
                drawH = targetH;
            }
        }
        else if (sizeMode === 'cover') {
            if (!boxW && !boxH) {
                scale = Math.max(boxW / ow, boxH / oh);
            }
            else if (boxW) {
                scale = boxW / ow;

            }
            else if (boxH) {
                scale = boxH / oh;
            }
            else {
                scale = 1;
            }

            drawW = Math.round(ow * scale);
            drawH = Math.round(oh * scale);
            canvasW = boxW || drawW;
            canvasH = boxH || drawH;
            dx = Math.round((canvasW - drawW) / 2);
            dy = Math.round((canvasH - drawH) / 2);

        }
        else {
            return null;
        }

        // apply min/max clamps to final canvas size while preserving draw proportions where reasonable
        if (typeof opt.minWidth === 'number' || typeof opt.maxWidth === 'number') {
            canvasW = clamp(canvasW, opt.minWidth, opt.maxWidth);
        }
        if (typeof opt.minHeight === 'number' || typeof opt.maxHeight === 'number') {
            canvasH = clamp(canvasH, opt.minHeight, opt.maxHeight);
        }

        if (sizeMode === 'contain' && (boxW && boxH)) {
            // maintain previously computed drawW/drawH and re-center
            dx = Math.round((canvasW - drawW) / 2);
            dy = Math.round((canvasH - drawH) / 2);
        }
        else if (sizeMode === 'cover' && (boxW && boxH)) {
            dx = Math.round((canvasW - drawW) / 2);
            dy = Math.round((canvasH - drawH) / 2);
        }
        else if (sizeMode === 'stretch' && (boxW || boxH)) {
            // ensure drawW/drawH match canvas
            drawW = canvasW;
            drawH = canvasH;
            dx = 0;
            dy = 0;
        }


        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(canvasW));
        canvas.height = Math.max(1, Math.round(canvasH));
        var ctx = canvas.getContext('2d');
        var blob;

        // optional: clear transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw image. If drawW/drawH larger than canvas, negative dx/dy will crop as intended.
        ctx.drawImage(img, dx, dy, drawW, drawH);


        if (!mimeType) {
            // try to infer from input blob/file if available
            if (file && (file.type)) mimeType = file.type || 'image/png';
            else mimeType = 'image/png';
        }

        if (resultType === 'DataURI') {
            return canvas.toDataURL(mimeType, quality);
        }
        else if (resultType === 'Blob' || resultType === 'File') {
            return canvasToBlobAsync(canvas, quality, mimeType).then(blob => {
                if (file instanceof File) {
                    blob = blobToFile(blob, file.name);
                }
                return blob;
            }).catch(e => {
                if (e) {
                    safeThrow(e);
                }
                return null;
            });
        }
    });
}

