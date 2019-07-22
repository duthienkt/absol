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

import Color from './Color/Color';
import IFrameBridge from './Network/IFrameBridge';
import JSZip from 'jszip';
import JSDocx from './JSDocx/JSDocx';
import Broadcast from './Network/Broadcast';

import * as text from './HTML5/Text';
import * as file from './Converter/file';
import * as base64 from './Converter/base64';

var absol = {
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
    IFrameBridge: IFrameBridge,
    JSDocx: JSDocx,
    Broadcast: Broadcast,
    text:text,
    file: file,
    base64: base64
};




export default absol;