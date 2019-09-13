
import * as babylon from 'babylon';
import { parseStyleAttr, parseClassAttr } from './attribute';

export function domVisitor(jsxCode) {
    var visitor = {
        File: function (node, ac) {
            return acept(node.program, ac);
        },
        Program: function (node, ac) {
            ac.child = node.body.map(function (cNode) {
                return acept(cNode, {});
            });
            return ac;
        },
        ExpressionStatement: function (node, ac) {
            return acept(node.expression, ac);
        },
        JSXElement: function (node, ac) {
            acept(node.openingElement, ac);
            if (node.children && node.children.length > 0) {

                ac.child = node.children.map(function (cNode) {

                    return acept(cNode, {});
                });
            }
            return ac;

        },
        JSXOpeningElement: function (node, ac) {
            var name = {};
            acept(node.name, name);
            ac.tag = name.value;
            if (node.attributes && node.attributes.length > 0) {
                node.attributes.forEach(function (aNode) {
                    var attribute = {};
                    acept(aNode, attribute);
                    if (attribute.key) {
                        if (attribute.key.startsWith('data-')) {
                            ac.data = ac.data || {};
                            ac.data[attribute.key.replace('data-', '')] = attribute.value;
                        }
                        else if (attribute.key.startsWith('prop-')) {
                            ac.props = ac.props || {};
                            ac.props[attribute.key.replace('prop-', '')] = attribute.value;
                        }
                        else if (attribute.key.startsWith('on-')) {
                            ac.on = ac.props || {};
                            ac.on[attribute.key.replace('on-', '')] = attribute.value;
                        }
                        else if (attribute.key == 'style') {
                            ac.style = parseStyleAttr(attribute.value);
                        }
                        else if (attribute.key == 'class') {
                            var classList = parseClassAttr(attribute.value);
                            if (classList.length > 0)
                                ac.class = classList;
                        }
                        else{
                            ac.attr = ac.attr || {};
                            ac.attr[attribute.key] = attribute.value;
                        }
                    }
                }, {});
            }
            return ac;
        },
        JSXIdentifier: function (node, ac) {
            ac.value = node.name;
        },
        JSXAttribute: function (node, ac) {
            var key = {};
            acept(node.name, key);

            ac.key = key.value;
            var value = {};

            acept(node.value, value);
            ac.value = value.value;
            return ac;
        },
        StringLiteral: function (node, ac) {
            ac.value = node.value;
        },
        JSXExpressionContainer: function (node, ac) {
            ac.value = { expression: jsxCode.substring(node.expression.start, node.expression.end) };
            return ac;
        },
        JSXText: function (node, ac) {
            ac.text = node.value
            return ac;
        }
    };
    function acept(node, ac) {
        return node && visitor[node.type] && visitor[node.type](node, ac);
    }
    return {
        acept: acept,
        visitor: visitor
    }
}


/***
 * @param {String} jsxCode
 */
export function parseDom(jsxCode) {
    jsxCode = jsxCode.trim().replace(/>\s+</gm, '><').replace(/<(\/?)(img|input|link|br|meta)([^>]*)>/g, function (sub, end, tag, content) {
        if (end == '/') return '';
        return '<' + tag + content + '/>';
    });
    var ast = babylon.parse(
        jsxCode,
        {
            plugins: [
                "jsx"
            ]
        });
    var xmlData = {};
    domVisitor(jsxCode).acept(ast, xmlData);
    if (xmlData.child.length > 1) return xmlData.child;
    return xmlData.child[0];
};

