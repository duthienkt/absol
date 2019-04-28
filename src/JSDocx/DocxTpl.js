import TemplateString from "../JSMaker/TemplateString";
import documentTpl from './templates/document.tpl';
import mht_documentTpl from './templates/mht_document.tpl';
import mht_pathTpl from './templates/mht_part.tpl';
export default {
    document: new Function('pageSetting', 'return ' + TemplateString.parse(documentTpl).toJSCode()),
    mht_document: new Function('htmlSource', 'contentParts', 'return ' + TemplateString.parse(mht_documentTpl).toJSCode()),
    mht_part: new Function('contentType', 'contentEncoding', 'contentLocation', 'encodedContent', 'return ' + TemplateString.parse(mht_pathTpl).toJSCode())
};