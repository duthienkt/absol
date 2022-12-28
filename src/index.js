import './Polyfill/polyfill';

import EventEmitter from './HTML5/EventEmitter';
import BrowserDetector from './Detector/BrowserDetector';

import JSPath from './HTML5/JSPath';
import TemplateString from './JSMaker/TemplateString';
import TemplateXML from './JSMaker/TemplateXML';
import Dom, { getSystemFontSize } from './HTML5/Dom';
import Svg from './HTML5/Svg';
import OOP from './HTML5/OOP';

import XML from './XML/XML';

import Color from './Color/Color';
import IFrameBridge from './Network/IFrameBridge';
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
import * as clipboard from './HTML5/Clipboard';
import Heap from './DataStructure/Heap';
import * as datetime from './Time/datetime';
import CMDRunner from './AppPattern/CMDRunner';
import AElement from "./HTML5/Element";
import AElementNS from "./HTML5/AElementNS";
import DomSignal from "./HTML5/DomSignal";
import CookieStore from "./Cookie/CookieStore";
import parseCookieString from "./Cookie/parseCookieString";
import ResizeSystem from "./HTML5/ResizeSystem";
import Vec2 from "./Math/Vec2";
import Mat3 from "./Math/Mat3";
import LanguageSystem from "./HTML5/LanguageSystem";

import * as int from './Math/int';
import ALogger from "./Code/ALogger";
import FlagManager from "./Code/FlagManager";
import ObservableArray from "./AppPattern/ObservableArray";
import ObservableStruct from "./AppPattern/ObservableStruct";
import CCBlock from "./AppPattern/circuit/CCBlock";
import CCLine from "./AppPattern/circuit/CCLine";
import * as FileSaver from './Network/FileSaver';
import Thread from "./Network/Thread";
import { copyJSVariable, generateJSVariable, replaceDateStringJSVariable } from "./JSMaker/generator";
import {normalizeIdent} from "./String/stringFormat";
import ShareConfiguration from "./AppPattern/ShareConfiguration";
import safeThrow from "./Code/safeThrow";
import * as array from './DataStructure/Array';
import remoteRequireNodeAsync from "./Network/remoteRequireNodeAsync";
import Polygon from "./Math/Polygon";
import DynamicCSS from "./HTML5/DynamicCSS";
import SCParser from "./SCLang/SCParser";
import SCProgramInstance, { SCDynamicLibScope, SCStaticLibScope } from "./SCLang/SCProgramInstance";
import SCOperatorExecutor from "./SCLang/SCOperatorExecutor";

var absol = {
    int: int,
    array: array,
    safeThrow: safeThrow,
    Rectangle: Rectangle,
    ResizeSystem: ResizeSystem,
    Arc: Arc,
    Polygon: Polygon,
    NumRange: NumRange,
    CookieStore: CookieStore,
    parseCookieString: parseCookieString,
    CMDRunner: CMDRunner,
    ContextManager: ContextManager,
    Application: Application,
    Fragment: Fragment,
    VarScope: VarScope,
    Context: Context,
    Activity: Activity,
    Element: AElement,
    ElementNS: AElementNS,
    AElement: AElement,
    AElementNS: AElementNS,
    DomSignal: DomSignal,
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
    JSZip: window.JSZip,
    IFrameBridge: IFrameBridge,
    JSDocx: JSDocx,
    Broadcast: Broadcast,
    text: text,
    file: file,
    base64: base64,
    Alarm: Alarm,
    coreDom: Dom.ShareInstance,
    coreSvg: Svg.ShareInstance,
    require: function (tagName) {
        return this.coreDom.require(tagName) || this.coreSvg.require(tagName);
    },
    domCreator: Dom.ShareInstance.creator,
    svgCreator: Dom.ShareInstance.creator,
    _: Dom.ShareInstance._,
    $: Dom.ShareInstance.$,
    $$: Dom.ShareInstance.$$,
    _svg: Svg.ShareInstance._,
    $svg: Svg.ShareInstance.$,
    Ref: Ref,
    XHR: XHR,
    string: Object.assign({}, stringFormat, stringGenerate),
    jsx: {
        dom: jsxdom,
        attribute: jsxattribute
    },

    clipboard: clipboard,
    dataStructure: { Heap: Heap },
    datetime: datetime,
    Vec2: Vec2,
    Mat3: Mat3,
    LanguageSystem: LanguageSystem,
    ALogger: ALogger,
    FlagManager: FlagManager,
    ObservableArray: ObservableArray,
    ObservableStruct: ObservableStruct,
    circuit: {
        CCBlock: CCBlock,
        CCLine: CCLine
    },
    FileSaver,
    Thread: Thread,
    generateJSVariable: generateJSVariable,
    copyJSVariable: copyJSVariable,
    normalizeIdent: normalizeIdent,
    replaceDateStringJSVariable: replaceDateStringJSVariable,
    remoteNodeRequireAsync: remoteRequireNodeAsync,
    shareConfiguration: ShareConfiguration.instance,
    DynamicCSS: DynamicCSS,
    getSystemFontSize: getSystemFontSize,
    sclang:{
        'SCParser': SCParser,
        'SCProgramInstance': SCProgramInstance,
        'SCOperatorExecutor': SCOperatorExecutor,
        'SCStaticLibScope':SCStaticLibScope,
        'SCDynamicLibScope': SCDynamicLibScope
    }
};




export default absol;