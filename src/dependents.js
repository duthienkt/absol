import * as babel from '@babel/core'
import * as pluginSyntaxJsx from  '@babel/plugin-syntax-jsx';

window.babel = babel || window.babel;
window.babel.pluginSyntaxJsx = pluginSyntaxJsx;