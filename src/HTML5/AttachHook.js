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
        props:{domInstance: domInstance}
    });
};

AttachHook.prototype.resetState = function () {
    this._attached = false;
    if (this.tagName.toLowerCase() === 'img' ){
        this.src = '';

    }
    else {
        this.href = '';
    }
};

AttachHook.property = {
    attached: {
        get: function () {
            return !!this._attached;
        }
    }
};

export default AttachHook;