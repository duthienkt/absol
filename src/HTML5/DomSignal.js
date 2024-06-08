import EventEmitter from "./EventEmitter";
import AElement from "./AElement";
import OOP from "./OOP";
import AttachHook from "./AttachHook";
import safeThrow from "../Code/safeThrow";

/***
 *
 * @extends EventEmitter
 * @param {AElement=} attachHookElt
 * @constructor
 */
function DomSignal(attachHookElt) {
    EventEmitter.call(this);
    this.signals = {};
    this.ev_attached = this.ev_attached.bind(this);
    this.$attachhook = attachHookElt || this.createBuildInAttachHook();
    this.$attachhookParent = (attachHookElt && attachHookElt.parentElement) || null;
    this.$attachhook.on('attached', this.ev_attached);
    this.$attachhook.ofDS = this;
    this.isPending = false;
}

OOP.mixClass(DomSignal, EventEmitter);

DomSignal.prototype.createBuildInAttachHook = function () {
    var elt = document.createElement('img');
    Object.defineProperties(elt, Object.getOwnPropertyDescriptors(AElement.prototype));
    Object.defineProperties(elt, Object.getOwnPropertyDescriptors(AttachHook.prototype));
    Object.defineProperties(elt, AttachHook.property);
    AElement.call(elt);
    elt.setAttribute('src', '');
    elt.defineEvent('attached');
    elt.addStyle('display', 'none');
    AttachHook.call(elt);
    elt.cancelWaiting();
    return elt;
}

DomSignal.prototype.execSignal = function () {
    var signals = this.signals;
    this.signals = {};
    this.isPending = false;
    for (var name in signals) {
        this.fire.apply(this, [name].concat(signals[name]));
    }

};

DomSignal.prototype.emit = function (name) {
    if (this.$attachhook && (this.$attachhook.canceled || this.$attachhook.attached) && !this.isPending) {
        this.$attachhook.remove();
        this.$attachhook.resetState();
    }
    this.signals[name] = Array.prototype.slice.call(arguments, 1);
    this.isPending = true;
    if (!this.$attachhookParent) {
        this.$attachhookParent = document.body;

    }
    if (!this.$attachhook.parentElement) {
        this.$attachhook.resetState();
        this.$attachhookParent.appendChild(this.$attachhook);
    }
};

DomSignal.prototype.ev_attached = function () {
    this.execSignal();
};

export default DomSignal;


var currentAT = null;
var callbackList = {};
var id = 0;

export function setDomImmediate(callback) {
    var cid = ++id;
    callbackList[cid] = { exec: callback, args: Array.prototype.slice.call(arguments, 1) };
    if (!currentAT) {
        currentAT = document.createElement('img');
        currentAT.setAttribute('src', '');
        currentAT.addEventListener('error', function () {
            currentAT.remove();
            currentAT = null;
            Object.keys(callbackList).map(function (key) {
                var cb = callbackList[key];
                delete callbackList[key];
                if (cb) {
                    try {
                        cb.exec.call(null, cb.args);
                    } catch (error) {
                        safeThrow(error);
                    }
                }
            })
        })
    }
    return cid;
}


export function clearDomImmediate(id) {
    delete callbackList[id];
}
