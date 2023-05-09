import BrowserDetector from "../Detector/BrowserDetector";

/***
 * @extends AElement
 * @constructor
 */
export function AttachHook() {
    this._attached = false;
    this.on('error', function (event) {
        if (!this._attached && this.isDescendantOf(document.body)) {
            this._attached = true;
            this.emit('attached', event, this);
        }
    });
    this.waitAttaching();
}

AttachHook.render = function (data, domInstance) {
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
    var self = this;
    if (BrowserDetector.browser.type.startsWith('chrome') && parseInt((BrowserDetector.browser.version || '').split('.').shift()) >= 113) {
        if (this.waitTimeout > 0) clearTimeout(this.waitTimeout);
        this.waitTimeout = setTimeout(function wait() {
            self.waitTimeout = -1;
            if (!self._attached && self.isDescendantOf(document.body)) {
                self._attached = true;
                self.emit('attached', { target: this }, self);
            }
            else if (!self._attached) {
                self.waitTimeout = setTimeout(wait, 10);
            }
        }, 0);
    }
};

AttachHook.prototype.resetState = function () {
    this._attached = false;
    if (this.tagName.toLowerCase() === 'img') {
        this.src = '';
    }
    else {
        this.href = '';
    }
    this.waitAttaching();
};

AttachHook.property = {
    attached: {
        get: function () {
            return !!this._attached;
        }
    }
};

export default AttachHook;