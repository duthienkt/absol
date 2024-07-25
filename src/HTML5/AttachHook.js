import AElement from "./AElement";
import EventEmitter from "./EventEmitter";

window.pendingAttachHooks = {};
var pendingId = 0;

/***
 * @extends AElement
 * @constructor
 */
export function AttachHook() {
    this._attached = false;
    this._canceled = false;
    this._pendingId = ++pendingId;
    this._eventAdded = false;
    this.counter = 0;
    this.delayTime = 0;

}

AttachHook.prototype._addAttachedEvent = function () {
    if (this._eventAdded) return;
    this.addEventListener('error', function (event) {
        if (!this._attached && this.isDescendantOf(document.body)) {
            this._attached = true;
            if (this.waitTimeout > 0) clearTimeout(this.waitTimeout);
            delete pendingAttachHooks[this._pendingId];
            if (this._canceled) return;
            this.emit('attached', event, this);
        }
    });
    this._eventAdded = true;
    if (!this._canceled) {
        pendingAttachHooks[this._pendingId] = this;
        this.waitAttaching();
    }
};

AttachHook.prototype.eventEmittorOnWithTime = function (isOnce, arg0, arg1, arg2) {
    if (arg0 === 'attached') {
        this._addAttachedEvent();
       return  AElement.prototype.eventEmittorOnWithTime.apply(this, arguments);
    } else {
        return  AElement.prototype.eventEmittorOnWithTime.apply(this, arguments);
    }
};
/*
AttachHook.prototype.on = function () {
    if (arguments[0] === 'attached') {
        this._addAttachedEvent();
        AElement.prototype.on.apply(this, arguments);
    }
    else {
        AElement.prototype.on.apply(this, arguments);
    }
    return this;
};


AttachHook.prototype.once = function () {
    if (arguments[0] === 'attached') {
        this._addAttachedEvent();
        AElement.prototype.once.apply(this, arguments);
    }
    else {
        AElement.prototype.once.apply(this, arguments);
    }
    return this;
};*/


AttachHook.render = function (data, option, domInstance) {
    var attributes = {};
    var tag;
    if (domInstance.defaultTag === 'div') {
        attributes.src = '';
        tag = 'img';
    }
    else {
        tag = 'image';
        attributes.href = '';
    }

    return domInstance._({
        tag: tag,
        class: 'absol-attachhook',
        extendEvent: ['attached'],
        style: {
            display: 'none'
        },
        attr: attributes,
        props: { domInstance: domInstance }
    });
};

AttachHook.prototype.waitAttaching = function () {
    if (this._canceled) return;
    var self = this;
    // if (BrowserDetector.browser.type.startsWith('chrome') && parseInt((BrowserDetector.browser.version || '').split('.').shift()) >= 113) {
    if (this.waitTimeout > 0) clearTimeout(this.waitTimeout);
    this.waitTimeout = setTimeout(function wait() {
        self.waitTimeout = -1;
        self.counter++;
        if (self.counter === 1) self.delayTime = 10;
        else if (self.counter === 5) self.delayTime = 30;
        else if (self.counter === 50) self.delayTime = 60;
        else if (self.counter === 100) self.delayTime = 100;
        else if (self.counter === 500) self.delayTime = 1000;
        if (!self._attached && self.isDescendantOf(document.body)) {
            self._attached = true;
            delete pendingAttachHooks[self._pendingId];
            if (self._canceled) return;
            self.emit('attached', { target: this }, self);
        }
        else if (!self._attached && !self._canceled) {
            self.waitTimeout = setTimeout(wait, self.delayTime);
        }
    }, this.delayTime);
    // }
};

AttachHook.prototype.cancelWaiting = function () {
    if (this.waitTimeout > 0) clearTimeout(this.waitTimeout);
    this._canceled = true;
    delete pendingAttachHooks[this._pendingId];
}

AttachHook.prototype.resetState = function () {
    if (this.waitTimeout > 0) clearTimeout(this.waitTimeout);
    this._attached = false;
    this._canceled = false;
    this.counter = 0;
    this.delayTime = 1;
    if (this.tagName.toLowerCase() === 'img') {
        this.attr('src', '');
    }
    else {
        this.attr('href', '');
    }
    pendingAttachHooks[this._pendingId] = this;
    this.waitAttaching();
};

AttachHook.property = {
    attached: {
        get: function () {
            return !!this._attached;
        }
    },
    canceled: {
        get: function () {
            return !!this._canceled;
        }
    }
};

export default AttachHook;