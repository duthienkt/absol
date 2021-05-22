import * as babel from '@babel/core'
import * as pluginSyntaxJsx from  '@babel/plugin-syntax-jsx';
import JSZip from 'jszip';

window.JSZip = JSZip || window.JSZip;
window.babel = babel || window.babel;
window.babel.pluginSyntaxJsx = pluginSyntaxJsx;