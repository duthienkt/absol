import absol from ".";


//for old plugin
absol.color = absol.Color;
absol.ShareDom = absol.Dom.ShareInstance;
absol._ = absol.ShareDom._;
absol.$ = absol.ShareDom.$;
absol.buildDom = absol.ShareDom._;

absol.ShareSvg = absol.Svg.ShareInstance;
absol.ShareSvgCreator = absol.Svg.ShareInstance.creator;
absol._svg = absol.ShareSvg._;
absol.$svg = absol.ShareSvg.$;
absol.buildSvg = absol.ShareSvg._;
absol.documentReady = absol.Dom.documentReady;
window.AComp = absol.AComp;
window.PhotoSwipeViewer = absol.PhotoSwipeViewer;
window.IFrameBridge = absol.IFrameBridge;
window.absol = absol;

