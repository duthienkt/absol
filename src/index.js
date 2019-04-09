import './polyfill';

import EventEmittor from "./EventEmittor";
import Dom from "./Dom";
import OOP from "./OOP";
import BrowserDetector from './BrowserDectector';

var absol = {};
window.absol = absol;

absol.event = EventEmittor;
absol.Dom = Dom;
absol.OOP = OOP;
absol.ShareDom = new Dom();
absol.ShareCreator = absol.ShareDom.creator;
absol.ShareSvg = new Dom();
absol.ShareSvgCreator = absol.ShareSvg.creator;

absol.$ = absol.ShareDom.$;
absol._ = absol.ShareDom._;

absol._svg = absol.ShareSvg._;
absol.$svg = absol.ShareSvg.$;


Object.defineProperties(absol,{
    isDomNode:{
        get:function(){
            console.warn("absol.isDomNode to Dom.isDomNode");
            return Dom.isDomNode;
        }
    },
    isSvgNode:{
        get:function(){
            console.warn("absol.isSvgNode to Dom.isSvgNode");
            return Dom.isSvgNode;
        }
    },
    dom:{
        get:function(){
            return Dom;
        }
    },

    browser:{
        get:function(){
            return BrowserDetector;
        }
    }
});

export default absol;