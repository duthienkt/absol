import EventEmitter from "./EventEmitter";
import { mixClass } from "./OOP";
import Rectangle from "../Math/Rectangle";

/**
 * @typedef {Object} BoundingObserverOption
 * @property {boolean} reusable
 * @property {boolean} scrollTracking
 * @property {boolean} autoStart
 */


/**
 * @extends EventEmitter
 * @param {HTMLElement|AElement}elt
 * @param {BoundingObserverOption} opt
 * @constructor
 */
function BoundingObserver(elt, opt) {
    opt = opt || {};
    EventEmitter.call(this);
    /**
     *
     * @type {HTMLElement|AElement}
     */
    this.elt = elt;
    this.reusable = opt.reusable || false;
    this.scrollTracking = opt.scrollTracking || false;
    this.autoStart = opt.autoStart || false;
    this.$scrollList = [];
    ['ev_scroll', 'waitToStart'].forEach(method => {
        this[method] = this[method].bind(this);
    });
    this.resizeObserver = null;
    this.intersectionObserver = null;
    this.waitTO = -1;
    this.waitTime = 0;
    this.waitCounter = 0;
    if (this.autoStart) this.waitToStart();
}


mixClass(BoundingObserver, EventEmitter);

BoundingObserver.prototype.waitToStart = function () {
    clearTimeout(this.waitTO);
    if (document.contains(this.elt)) {
        this.startObserver();
    }
    else {
        ++this.waitCounter;
        if (this.waitCounter === 2) this.waitTime = 5;
        else if (this.waitCounter === 5) this.waitTime = 30;
        else if (this.waitCounter === 50) this.waitTime = 60;
        else if (this.waitCounter === 100) this.waitTime = 100;
        else if (this.waitCounter === 500) this.waitTime = 1000;
        if (this.waitCounter > 1000) {
            this.waitCounter = 0;
            this.waitTime = 0;
            //cancel waiting
        }
        else {
            this.waitTO = setTimeout(this.waitToStart, this.waitTime);
        }
    }
};


BoundingObserver.prototype.startResizeObserver = function () {
    this.waitCounter = 0;
    this.waitTime = 0;
    if (this.resizeObserver) return;
    this.resizeObserver = new ResizeObserver(entries => {
        var eventData = new ODBoundEvent(this.elt, entries[0]);
        this.emit('bound', eventData);
    });
    this.resizeObserver.observe(this.elt);
};

BoundingObserver.prototype.startIntersectionObserver = function () {
    if (this.intersectionObserver) return;
    // IntersectionObserver: emit 'visible'/'hidden' events
    this.intersectionObserver = new IntersectionObserver(entries => {
        var eventData = new ODViewChangeEvent(this.elt, entries[0]);
        this.emit('viewchange', eventData);
        if (eventData.action === 'visible' && this.scrollTracking) {
            this.startTrackingScroll();
        }
        else {
            this.stopTrackingScroll();
        }
        if (eventData.action === 'remove' && !this.reusable) {
            this.stopObserver();
        }
    });
    this.intersectionObserver.observe(this.elt);
};

BoundingObserver.prototype.startObserver = function () {
    this.startIntersectionObserver();
    this.startResizeObserver();
    if (document.body.contains(this.elt) && this.scrollTracking) {
        this.startTrackingScroll();
    }
};

BoundingObserver.prototype.stopResizeObserver = function () {
    if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
    }
};

BoundingObserver.prototype.stopIntersectionObserver = function () {
    if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = null;
    }
};


BoundingObserver.prototype.stopObserver = function () {
    this.stopResizeObserver();
    this.stopIntersectionObserver();
    this.stopTrackingScroll();
};

BoundingObserver.prototype.startTrackingScroll = function () {
    this.stopTrackingScroll();
    var c = this.elt.parentElement;
    while (c) {
        this.$scrollList.push(c);
        c.addEventListener('scroll', this.ev_scroll, true);
        c = c.parentElement;
    }
    document.addEventListener('scroll', this.ev_scroll, true);
    this.$scrollList.push(document);

};

BoundingObserver.prototype.stopTrackingScroll = function () {
    var c;
    while (this.$scrollList.length > 0) {
        c = this.$scrollList.pop();
        c.removeEventListener('scroll', this.ev_scroll, true);
    }
};


BoundingObserver.prototype.ev_scroll = function () {
    var eventData = new ODBoundEvent(this.elt, {});
    eventData.action = 'scroll';
    this.emit('bound', eventData);
};

BoundingObserver.prototype.revokeResource = function () {
    this.stopObserver();
    clearTimeout(this.waitTO);
    this.elt = null;
}

export default BoundingObserver;


/**
 * @param {HTMLElement|AElement} elt
 * @param {ResizeObserverEntry|{contentRect, borderRect}} [entry]
 * @constructor
 */
function ODBoundEvent(elt, entry) {
    this.target = elt;
    this.action = 'resize';
    this.entry = entry || {};
}

ODBoundEvent.prototype.type = 'bound';


Object.defineProperty(ODBoundEvent.prototype, 'contentRect', {
    get: function () {
        var rect, style, borderLeft, borderTop, borderRight, borderBottom, paddingLeft, paddingTop, paddingRight,
            paddingBottom;
        if (this._contentRect) return this._contentRect;
        if (this.entry.contentRect) {
            this._contentRect = Rectangle.fromClientRect(this.entry.contentRect);
        }
        else {//fallback
            rect = this.target.getBoundingClientRect();
            style = getComputedStyle(this.target);
            borderLeft = parseFloat((style.borderLeftWidth || '0').replace('px', ''));
            borderTop = parseFloat((style.borderTopWidth || '0').replace('px', ''));
            borderRight = parseFloat((style.borderRightWidth || '0').replace('px', ''));
            borderBottom = parseFloat((style.borderBottomWidth || '0').replace('px', ''));

            paddingLeft = parseFloat((style.paddingLeft || '0').replace('px', ''));
            paddingTop = parseFloat((style.paddingTop || '0').replace('px', ''));
            paddingRight = parseFloat((style.paddingRight || '0').replace('px', ''));
            paddingBottom = parseFloat((style.paddingBottom || '0').replace('px', ''));

            this._contentRect = new Rectangle(rect.left + borderLeft + paddingLeft,
                rect.top + borderTop + paddingTop,
                rect.width - borderLeft - borderRight - paddingLeft - paddingRight,
                rect.height - borderTop - borderBottom - paddingTop - paddingBottom);
        }
        return this._contentRect;
    }
});


Object.defineProperty(ODBoundEvent.prototype, 'borderRect', {
    get: function () {
        if (this._borderRect) return this._borderRect;
        this._borderRect = new Rectangle(0, 0, 0, 0);
        if (this.entry.borderBoxSize && this.entry.borderBoxSize.length > 0) {
            this._borderRect.width = this.entry.borderBoxSize[0].inlineSize;
            this._borderRect.height = this.entry.borderBoxSize[0].blockSize;
        }
        else {
            this._borderRect = Rectangle.fromClientRect(this.target.getBoundingClientRect());
        }
        return this._borderRect;
    }
});

/**
 *
 * @param {HTMLElement|AElement} elt
 * @param {IntersectionObserverEntry} entry
 * @constructor
 */
function ODViewChangeEvent(elt, entry) {
    this.target = elt;
    this.borderRect = Rectangle.fromClientRect(entry.boundingClientRect);
    this.action = entry.isIntersecting ? 'visible' : 'hidden';
    if (!entry.isIntersecting) {
        if (!document.body.contains(elt)) {
            this.action = 'remove';
        }
    }
}

ODViewChangeEvent.prototype.type = 'viewchange';
