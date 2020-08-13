import Dom from "./Dom";
import EventEmitter from "./EventEmitter";

/**
 * Emit event with dom delay
 * @extends EventEmitter
 */
function DomSignal(attachHookElt) {
    EventEmitter.call(this);
    this.signals = {};
    this.ev_error = this.ev_error.bind(this);
    this.$attachhook = attachHookElt || null;
    this.$attachhookParent = (attachHookElt && attachHookElt.parentElement) || null;
}

Object.defineProperties(DomSignal.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
DomSignal.prototype.constructor = DomSignal;


DomSignal.prototype.execSignal = function () {
    var signals = this.signals;
    if (this.$attachhook) {
        this.$attachhook.remove();
    }
    this.signals = {};
    for (var name in signals) {
        this.fire.apply(this, [name].concat(signals[name]));
    }
};

DomSignal.prototype.emit = function (name) {
    this.signals[name] = Array.prototype.slice.call( arguments,1);
    if (!this.$attachhookParent) {
        this.$attachhookParent = document.body;
    }
    if (!this.$attachhook) {
        this.$attachhook = Dom.ShareInstance._('attachhook').on('error', this.ev_error);
    }
    if (!this.$attachhook.parentElement){
        this.$attachhookParent.appendChild(this.$attachhook);
    }
};

DomSignal.prototype.ev_error = function () {
    this.execSignal();
};

export default DomSignal;