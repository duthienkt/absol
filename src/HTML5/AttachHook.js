
/***
 * @extends AElement
 * @constructor
 */
export function AttachHook() {
    this.on('error', function (event) {
        if (!this._attached && this.isDescendantOf(document.body)) {
            this._attached = true;
            this.emit('attached', event, this);
        }
    });
}

AttachHook.render = function (data, domInstance) {
    var attributes = {};
    if (domInstance.defaultTag === 'div') {
        attributes.src = '';
    }
    else {
        attributes.href = '';
    }
    return domInstance._({
        tag: 'img',
        class: 'absol-attachhook',
        extendEvent: ['attached'],
        style: {
            display: 'none'
        },
        attr: attributes
    });
};

AttachHook.prototype.resetState = function () {
    this._attached = false;
    this.src = '';
};

AttachHook.property = {
    attached: {
        get: function () {
            return !!this._attached;
        }
    }
};

export default AttachHook;