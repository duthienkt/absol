import './Polyfill/polyfill';

import EventEmitter from './HTML5/EventEmitter';
import BrowserDetector from './Dectector/BrowserDetector';
import Element from './HTML5/Element';

import JSPath from './HTML5/JSPath';
import TemplateString from './JSMaker/TemplateString';
import TemplateXML from './JSMaker/TemplateXML';
import Dom from './HTML5/Dom';
import Svg from './HTML5/Svg';
import OOP from './HTML5/OOP';

import XML from './XML/XML';

import AComp from './AComp/AComp';
import PhotoSwipeViewer from './PhotoViewer/PhotoSwipeViewer';
import Color from './Color/Color';
import IFrameBridge from './Network/IFrameBridge';
import JSZip from 'jszip';


window.absol = {
    Element: Element,
    HTMLElement: Element,//oldName
    JSPath: JSPath,
    TemplateString: TemplateString,
    TemplateXML: TemplateXML,
    Dom: Dom,
    Svg: Svg,
    BrowserDectector: BrowserDetector,
    OOP: OOP,
    Event: EventEmitter,
    XML: XML,
    Color: Color,
    EventEmitter: EventEmitter,
    JSZip: JSZip,
    dom: Dom,//old alias
    event: EventEmitter,//old alias
    color: Color
};
//for old plugin
window.absol.ShareDom = AComp;
window.absol.ShareDom.fromCode = AComp.core.fromCode.bind(AComp.core);
window.absol.ShareCreator = AComp.creator;
window.absol._ = window.absol.ShareDom._;
window.absol.$ = window.absol.ShareDom.$;
window.absol.buildDom = window.absol.ShareDom._;

window.absol.ShareSvg = Svg.ShareInstance;
window.absol.ShareSvgCreator = Svg.ShareInstance.creator;
window.absol._svg = window.absol.ShareSvg._;
window.absol.$svg = window.absol.ShareSvg.$;
window.absol.buildSvg = window.absol.ShareSvg._;
window.absol.documentReady = Dom.documentReady;
window.AComp = AComp;
window.PhotoSwipeViewer = PhotoSwipeViewer;
window.IFrameBridge = IFrameBridge;
