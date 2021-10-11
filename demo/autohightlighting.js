setTimeout(function() {
    function removeTabIndent(code) {
        var lines = code.split('\n');
        while (lines.length > 0 && lines[0].trim().length == 0) lines.shift();
        while (lines.length > 0 && lines[lines.length - 1].trim().length == 0) lines.pop();
        
        if (lines.length >= 2) {
            if (lines[0].trim().startsWith('(function') &&
                lines[lines.length - 1].match(/\(\)(;?)$/)) {
                lines.shift();
                lines.pop();
            }
        }
        var preplaceRG = [/^\s{4}/, /^\s{8}/, /^\s{12}/];
        var maxSpace4 = lines.reduce(function(ac, cr) {
            if (ac < 0) return ac;
            if (cr.trim().length == 0) return ac;
            while (ac >= 0) {
                if (cr.match(preplaceRG[ac])) break;
                ac--;

            }
            return ac;
        }, 2);
        if (maxSpace4 >= 0) {
            lines = lines.map(function(l) { return l.replace(preplaceRG[maxSpace4], '') });
        }
        return lines.join('\n');
    }



    var viewableScript = document.querySelectorAll('script.viewable');
    viewableScript.forEach(function(elt) {
        var code = removeTabIndent(elt.innerHTML);

        absol.$(elt).selfReplace(absol._({
            tag: 'pre',
            child: {
                tag: 'code',
                class: 'js',
                child: { text: code }
            }
        }));
    });
    var viewableStyle = document.querySelectorAll('style.viewable');
    viewableStyle.forEach(function(elt) {
        absol.$(elt.parentElement).addChildBefore(absol._({
            tag: 'pre',
            child: {
                tag: 'code',
                class: 'css',
                child: { text: elt.innerHTML }
            }
        }), elt);
    });

    var viewableXML = document.querySelectorAll('code.xml.viewable');
    viewableXML.forEach(function(elt) {
        absol.$(elt.parentElement).addChildBefore(absol._({
            tag: 'pre',
            child: {
                tag: 'code',
                class: 'xml',
                child: { text: elt.innerHTML }
            }
        }), elt);
    });

    var viewableJs = document.querySelectorAll('code.js.viewable');
    viewableJs.forEach(function(elt) {
        absol.$(elt.parentElement).addChildBefore(absol._({
            tag: 'pre',
            child: {
                tag: 'code',
                class: 'js',
                child: { text: elt.innerHTML }
            }
        }), elt);
    });


    hljs.initHighlighting();
    var href = location.href;
    var mathedscroll = href.match(/\#([a-z0-9\_A-Z\-]+)/);
    if (mathedscroll) {
        var e = absol.$(mathedscroll[0]);
        if (e) e.scrollIntoView();
    }
    window.dispatchEvent(new Event('resize'));
}, 1000);
