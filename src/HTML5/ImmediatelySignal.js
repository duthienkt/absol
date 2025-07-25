import AElement from "./AElement";
import AttachHook from "./AttachHook";
import EventEmitter from "./EventEmitter";
import { mixClass } from "./OOP";

function ImmediatelySignal() {
    EventEmitter.call(this);
    this.signals = {};
    this.$attachhook = null;
}

mixClass(ImmediatelySignal, EventEmitter);

ImmediatelySignal.prototype.emit = function (name) {
    this.signals[name] = Array.prototype.slice.call(arguments, 1);
    this.requestAttachHook();
};


ImmediatelySignal.prototype.requestAttachHook = function () {
    if (this.$attachhook) return;
    var elt = document.createElement('img');
    Object.defineProperties(elt, Object.getOwnPropertyDescriptors(AElement.prototype));
    Object.defineProperties(elt, Object.getOwnPropertyDescriptors(AttachHook.prototype));
    Object.defineProperties(elt, AttachHook.property);
    this.$attachhook = elt;
    AElement.call(elt);
    elt.setAttribute('src', '');
    elt.defineEvent('attached');
    elt.addStyle('display', 'none');
    AttachHook.call(elt);
    elt.once('attached', this.execSignal.bind(this));
    document.body.appendChild(elt);
    return elt;
};

ImmediatelySignal.prototype.execSignal = function () {
    if (this.$attachhook) {
        this.$attachhook.remove();
        this.$attachhook = null;
    }
    var signals = this.signals;
    this.signals = {};
    for (var name in signals) {
        this.fire.apply(this, [name].concat(signals[name]));
    }
};

export default ImmediatelySignal;