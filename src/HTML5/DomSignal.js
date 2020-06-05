import Dom from "./Dom";

/**
 * Emit event with dom delay
 */
function DomSignal() {
    this.signals = {};
    this.ev_error = this.ev_error.bind(this);
    this.$attachhook = null;

}

DomSignal.prototype.execSignal = function () {
    var signals = this.signals;
    if (this.$attachhook) {
        this.$attachhook.remove();
        this.$attachhook = null;
    }
    this.signals = {};
    for (var name in signals) {
        this.fine.apply(this, signals[name]);
    }
};

DomSignal.prototype.emit = function (name) {
    this.signals[name] = Array.prototype.slice(1, arguments);
    if (!this.$attachhook) {
        this.$attachhook = Dom.ShareInstance._('attachhook').on('error', this.ev_error)
            .addTo(document.body);
    }
};

DomSignal.prototype.ev_error = function () {
    this.execSignal();
};

export default new DomSignal();