import Dom from "./Dom";
import EventEmitter from "./EventEmitter";
import AElement from "./AElement";

/***
 *
 * @extends EventEmitter
 * @param {AElement} attachHookElt
 * @constructor
 */
function DomSignal(attachHookElt) {
    EventEmitter.call(this);
    this.signals = {};
    this.ev_attached = this.ev_attached.bind(this);
    this.$attachhook = attachHookElt || Dom.ShareInstance._('attachhook');
    this.$attachhookParent = (attachHookElt && attachHookElt.parentElement) || null;
    this.$attachhook.on('attached', this.ev_attached);
}

Object.defineProperties(DomSignal.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));
DomSignal.prototype.constructor = DomSignal;


DomSignal.prototype.execSignal = function () {
    var signals = this.signals;
    if (this.$attachhook) {
        this.$attachhook.remove();
        this.$attachhook.resetState();
    }
    this.signals = {};
    for (var name in signals) {
        this.fire.apply(this, [name].concat(signals[name]));
    }
};

DomSignal.prototype.emit = function (name) {
    this.signals[name] = Array.prototype.slice.call(arguments, 1);
    if (!this.$attachhookParent) {
        this.$attachhookParent = document.body;
    }
    if (!this.$attachhook.parentElement) {
        this.$attachhookParent.appendChild(this.$attachhook);
    }
};

DomSignal.prototype.ev_attached = function () {
    this.execSignal();
};

export default DomSignal;