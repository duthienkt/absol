import DocxTpl from './DocxTpl';
import content_types_xml from './assets/content_types.xml';
import rels_xml from './assets/rels.xml';
import document_xml_rels from './assets/document.xml.rels';
import JSZip from 'jszip';

import Dom from '../HTML5/Dom';
import Svg from '../HTML5/Svg';



function JSDocx(props) {
    if (props.blob)
        this.blob = props.blob;

    if (props.blob)
        this.buffer = props.buffer;
}

JSDocx.prototype.saveAs = function (fileName) {
    var src;
    if (this.blob) {
        src = (URL || webkitURL).createObjectURL(this.blob);
    }
    else if (this.buffer) {
        src = "data:application/octet-stream," + encodeURIComponent(this.buffer);
    }

    var element = document.createElement('a');
    element.setAttribute('href', src);
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};


JSDocx._prepareImageParts = function (htmlSource) {
    var imageContentParts = [];
    var inlinedSrcPattern = /\"data:(\w+\/\w+);(\w+),(\S+)\"/g;
    var inlinedReplacer = function (match, contentType, contentEncoding, encodedContent) {
        var index = imageContentParts.length;
        var extension = contentType.split('/')[1];
        var contentLocation = "file:///C:/fake/image" + index + "." + extension;
        // mht_part: new Function('contentType', 'contentEncoding', 'contentLocation', 'encodedContent', 'return ' + TemplateString.parse(mht_pathTpl).toJSCode())
        imageContentParts.push(DocxTpl.mht_part(contentType, contentEncoding, contentLocation, encodedContent));
        return "\"" + contentLocation + "\"";
    };
    if (typeof htmlSource === 'string') {
        if (!/<img/g.test(htmlSource)) {
            return {
                htmlSource: htmlSource,
                imageContentParts: imageContentParts
            };
        }
        htmlSource = htmlSource.replace(inlinedSrcPattern, inlinedReplacer);
        return {
            htmlSource: htmlSource,
            imageContentParts: imageContentParts
        };
    } else {
        throw new Error("Not a valid source provided!");
    }
};



JSDocx._getMHTdocument = function (htmlSource) {
    var imageContentParts, _ref;
    _ref = this._prepareImageParts(htmlSource), htmlSource = _ref.htmlSource, imageContentParts = _ref.imageContentParts;
    htmlSource = htmlSource.replace(/\=/g, '=3D');
    return DocxTpl.mht_document(htmlSource,
        imageContentParts.join('\n')
    );
}

/**
 * @param {JSZip} zip
 */
JSDocx._generateDocument = function (zip) {
    return zip.generateAsync({ type: 'arraybuffer' }).then(function (buffer) {
        var props = {};
        if (global.Blob)
            props.blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        else if (global.Buffer)
            props.buffer = new Buffer(new Uint8Array(buffer))
        else
            throw new Error("Neither Blob nor Buffer are accessible in this environment. " +
                "Consider adding Blob.js shim");
        return new JSDocx(props);
    });
};


JSDocx._renderDocumentFile = function (pageSetting) {

    return DocxTpl.document(pageSetting);
};

JSDocx._createPageSetting = function (documentOptions) {
    documentOptions = documentOptions || {};
    var pageSetting = {
        margins: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
            header: 720,
            footer: 720,
            gutter: 0
        }
    };
    if (documentOptions.orientation == 'landscape') {
        Object.assign(pageSetting, {
            height: 12240, width: 15840, orient: 'landscape'
        })
    }
    else {
        Object.assign(pageSetting, {
            width: 12240, height: 15840, orient: 'portrait'
        })
    }
    if (documentOptions.margins) {
        Object.assign(pageSetting, documentOptions.margins);
    }
    return pageSetting;
}


JSDocx._addFiles = function (zip, htmlSource, pageSetting) {
    zip.file('[Content_Types].xml', content_types_xml)
    zip.folder('_rels')
        .file('.rels', rels_xml);
    zip.folder('word')
        .file('document.xml', DocxTpl.document(pageSetting));


    zip.folder('word')
        .file('document.xml', JSDocx._renderDocumentFile(pageSetting))
        .file('afchunk.mht', JSDocx._getMHTdocument(htmlSource))
        .folder('_rels')
        .file('document.xml.rels', document_xml_rels);

    return zip;
};

JSDocx.fromHTMLCode = function (html, options) {
    var zip = new JSZip()
    JSDocx._addFiles(zip, html, JSDocx._createPageSetting(options));
    return JSDocx._generateDocument(zip);
}

JSDocx.fromHTMLElement = function (element, options, getOuter, isWorkingElement) {

    if (typeof element == 'string') {
        element = Dom.ShareInstance.$(element);
    }
    if (!element) throw new Error('@param element must be HTMLElement');

    var preRender;
    if (!isWorkingElement) {
        preRender = Dom.ShareInstance._('div');
        preRender.addStyle({
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '-10000',
            opacity: '0'
        }).addTo(document.body);
        Array.prototype.forEach.call(element.childNodes, function (e) {
            if (e.tagName != 'script')
                preRender.addChild(e.cloneNode(true));
        });
    }
    else {
        preRender = element;
    }

    Dom.ShareInstance.$('script', preRender, function (e) {
        e.parentElement.removeChild(e);
        return false;
    });

    var imageTask = [];
    Dom.ShareInstance.$('img', preRender, function (e) {
        if (e.src && !e.src.match(/data:/)) {
            var task = Dom.imageToCanvas(e).then(function (canvas) {
                var newSrc = canvas.toDataURL();
                e.src = newSrc;
            });
            imageTask.push(task);

        }
        return false;
    });

    Dom.ShareInstance.$('svg', preRender, function (e) {
        var task = Svg.svgToCanvas(e).then(function (canvas) {
            var newSrc = canvas.toDataURL();
            var image = Dom.ShareInstance._('img');
            image.src = newSrc;
            Dom.ShareInstance.$(e).selfReplace(image);

        });
        imageTask.push(task);

        return false;
    });


    return Promise.all(imageTask).then(function () {
        var code;
        if (getOuter) {
            code = preRender.outerHTML;
            if (!code) {
                var temp = document.createElement('div');
                temp.addChild(preRender);
                code = temp.innerHTML;
            }
        }
        else {
            code = preRender.innerHTML;
        }
        return JSDocx.fromHTMLCode(code, options);
    });
};

export default JSDocx;

