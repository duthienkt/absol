
import EventEmitter from './HTML5/EventEmitter';
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


/************************** ABSOL adapter ***********************/
window.absol = {
    Element: Element,
    HTMLElement: Element,//oldName
    JSPath: JSPath,
    TemplateString: TemplateString,
    TemplateXML: TemplateXML, 
    Dom: Dom, 
    Svg:Svg,
    BrowserDectector: BrowserDetector,
    OOP:OOP,
    Event: Event, 
    XML: XML,
    EventEmitter:EventEmitter
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

window.absol.documentReady = Dom.documentReady;
