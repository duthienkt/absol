// import './polyfill';

// import EventEmittor from "./EventEmittor";
// import Dom from "./Dom";
// import OOP from "./OOP";
// import BrowserDetector from './BrowserDectector';
// import XML from './XML/XML';

// var absol = {};
// window.absol = absol;

// absol.event = EventEmittor;
// absol.Dom = Dom;
// absol.OOP = OOP;
// absol.ShareDom = new Dom();
// absol.ShareCreator = absol.ShareDom.creator;
// absol.ShareSvg = new Dom();
// absol.ShareSvgCreator = absol.ShareSvg.creator;

// absol.$ = absol.ShareDom.$;
// absol._ = absol.ShareDom._;

// absol._svg = absol.ShareSvg._;
// absol.$svg = absol.ShareSvg.$;


// Object.defineProperties(absol,{
//     isDomNode:{
//         get:function(){
//             console.warn("absol.isDomNode to Dom.isDomNode");
//             return Dom.isDomNode;
//         }
//     },
//     isSvgNode:{
//         get:function(){
//             console.warn("absol.isSvgNode to Dom.isSvgNode");
//             return Dom.isSvgNode;
//         }
//     },
//     dom:{
//         get:function(){
//             return Dom;
//         }
//     },

//     browser:{
//         get:function(){
//             return BrowserDetector;
//         }
//     }
// });

import BrowserDetector from './Dectector/BrowserDetector';
import Element from './HTML5/Element';

import JSPath from './HTML5/JSPath';
import TemplateString from './JSMaker/TemplateString';
import TemplateXML from './JSMaker/TemplateXML';
import Dom from './HTML5/Dom';
import Svg from './HTML5/Svg';
import OOP from './HTML5/OOP';
import Event from './HTML5/Event';
import XML from './XML/XML';

window.BrowserDetector = BrowserDetector;

window.absol = {
    Element: Element,
    JSPath: JSPath,
    TemplateString: TemplateString,
    TemplateXML: TemplateXML, 
    Dom: Dom, 
    Svg:Svg,
    BrowserDectector: BrowserDetector,
    OOP:OOP,
    Event: Event, 
    XML: XML
};

Object.defineProperty(absol, 'event', {
    get:function(){
        return this.Event;
    }
});
Object.defineProperty(absol, 'dom', {
    get:function(){
        return this.Dom;
    }
});

window.absol.ShareDom = window.absol.Dom.ShareInstance;
window.absol.ShareCreator  = window.absol.Dom.ShareInstance.creator;
window.absol._ = window.absol.ShareDom._;
window.absol.$ = window.absol.ShareDom.$;
window.absol.buildDom = window.absol.ShareDom._;

window.absol.ShareSvg = window.absol.Svg.ShareInstance;
window.absol.ShareSvgCreator  = window.absol.Svg.ShareInstance.creator;
window.absol._svg = window.absol.ShareSvg._;
window.absol.$svg = window.absol.ShareSvg.$;
window.absol.buildSvg = window.absol.ShareSvg._;



// window.XMLParser = XML;


// export default absol;