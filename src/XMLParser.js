import XML from './XML/XML';
import XMLCommentNode from './XML/XMLCommentNode';
import XMLConstant from './XML/XMLConstant';
import XMLDeclaretionNode from './XML/XMLDeclarationNode';
import XMLElement from './XML/XMLElement';
import XMLTextNode from './XML/XMLTextNode';


if (!('XMLParser' in window)) {
    window.XMLParser = {
        XML: XML,
        XMLCommentNode: XMLCommentNode,
        XMLConstant: XMLConstant,
        XMLDeclaretionNode: XMLDeclaretionNode,
        XMLElement: XMLElement,
        XMLTextNode: XMLTextNode,
        parse: XML.parse.bind(XML),
        parseLikeHTML: XML.parseLikeHTML.bind(XML),
        stringify: XML.stringify.bind(XML)
    };
}
else {
    throw new Error('XMLParser');
}