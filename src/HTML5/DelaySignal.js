import EventEmitter from "./EventEmitter";
import { mixClass } from "./OOP";

/**
 * @extends EventEmitter
 * @constructor
 */
function DelaySignal() {
    EventEmitter.call(this);
    this.signals = {};
    this.to = this.NO_WAIT;
    this.execSignal = this.execSignal.bind(this);
}

mixClass(DelaySignal, EventEmitter);

DelaySignal.NO_WAIT = -1;
DelaySignal.prototype.NO_WAIT = DelaySignal.NO_WAIT;
DelaySignal.prototype.delay = 4;

DelaySignal.prototype.execSignal = function () {
    this.to = this.NO_WAIT;
    var signals = this.signals;
    this.signals = {};
    for (var name in signals) {
        this.fire.apply(this, [name].concat(signals[name]));
    }
};


DelaySignal.prototype.emit = function (name) {
    this.signals[name] = Array.prototype.slice.call(arguments, 1);
    if (this.to === this.NO_WAIT) {
        this.to = setTimeout(this.execSignal, this.delay);
    }
    return this;
};


export default DelaySignal;