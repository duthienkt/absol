import './Polyfill/polyfill';

import EventEmitter from './HTML5/EventEmitter';
import BrowserDetector from './Detector/BrowserDetector';
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
import Alarm from './Time/Alarm';
import Ref from './AppPattern/Ref';

import XHR from './Network/XHR';
import * as stringGenerate from './String/stringGenerate';
import * as stringFormat from './String/stringFormat';

import * as jsxdom from './JSX/dom';
import * as jsxattribute from './JSX/attribute';
import Activity from './AppPattern/Activity';
import Context from './AppPattern/Context';
import ContextManager from './AppPattern/ContextManager';
import Application from './AppPattern/Application';
import VarScope from './AppPattern/VarScope';
import Fragment from './AppPattern/Fragment';
import Rectangle from './Math/Rectangle';
import Arc from './Math/Arc';
import NumRange from './Math/NumRange';
import SJSON from './Converter/SJSON';

var absol = {
    SJSON: SJSON,
    Rectangle: Rectangle,
    Arc: Arc,
    NumRange: NumRange,

    ContextManager: ContextManager,
    Application: Application,
    Fragment: Fragment,
    VarScope: VarScope,
    Context: Context,
    Activity: Activity,
    Element: Element,
    JSPath: JSPath,
    TemplateString: TemplateString,
    TemplateXML: TemplateXML,
    Dom: Dom,
    Svg: Svg,
    BrowserDetector: BrowserDetector,
    OOP: OOP,
    XML: XML,
    Color: Color,
    EventEmitter: EventEmitter,
    JSZip: JSZip,
    IFrameBridge: IFrameBridge,
    JSDocx: JSDocx,
    Broadcast: Broadcast,
    text: text,
    file: file,
    base64: base64,
    Alarm: Alarm,
    coreDom: Dom.ShareInstance,
    coreSvg: Svg.ShareInstance,
    domCreator: Dom.ShareInstance.creator,
    svgCreator: Dom.ShareInstance.creator,
    _: Dom.ShareInstance._,
    $: Dom.ShareInstance.$,
    _svg: Svg.ShareInstance._,
    $svg: Svg.ShareInstance.$,
    Ref: Ref,
    XHR: XHR,
    string: Object.assign({}, stringFormat, stringGenerate),
    jsx: {
        dom: jsxdom,
        attribute: jsxattribute
    }
};


export default absol;