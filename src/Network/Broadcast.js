import EventEmitter from "../HTML5/EventEmitter";
import { randomIdent } from "../String/stringGenerate";

// it can be replace BroadcastChanel
function Broadcast(channel, id) {
    EventEmitter.call(this);
    this.channel = channel;
    this.id = id;
    this._ev_message = this._ev_message.bind(this);
    this._ev_storage = this._ev_storage.bind(this);
    this._init();
}

Object.defineProperties(Broadcast.prototype, Object.getOwnPropertyDescriptors(EventEmitter.prototype));

Broadcast.prototype.constructor = Broadcast;


Broadcast.prototype._init = function () {
    if ('BroadcastChannel' in window && false) {
        this.nativeBroadcastChannel = new BroadcastChannel(this.channel);
        this.nativeBroadcastChannel.onmessage = this._ev_message;
    }
    else if ('localStorage' in window) {
        if (!('onstorage' in window))
            console.warn("Your browser may not support onstorage event.");
        if (window.addEventListener) {
            window.addEventListener('storage', this._ev_storage);
        }
        else {
            window.attachEvent('onstorage', this._ev_storage);
        }
        this.storageKey = '_broadcast_' + this.channel;
    }
    else {
        throw new Error("Your browser can not support broadcast!");
    }
};

Broadcast.prototype._ev_storage = function (event) {
    if (event.key == this.storageKey) {
        var data = JSON.parse(event.newValue);
        if (data.sourceId != this.id)
            this.handleMessData(data.message);
    }
};

Broadcast.prototype._ev_message = function (event) {
    var data = event.data;
    this.handleMessData(data);
};


Broadcast.prototype.handleMessData = function (data) {
    if (data.type == "EMIT")
        this.fire.apply(this, data.params);
    if (typeof this.onmessage == 'function')
        this.onmessage(event);
};

/**
 * @param {Array<*>}
 */
Broadcast.prototype.emit = function () {
    var params = Array.prototype.slice.call(arguments);
    this.postMessage({ type: "EMIT", params, sourceId: this.id });
};

/**
 * @param {*} message
 */
Broadcast.prototype.postMessage = function (message) {
    if (this.nativeBroadcastChannel) {
        this.nativeBroadcastChannel.postMessage(message);
    }
    else {
        localStorage.setItem(this.storageKey, JSON.stringify({ message: message, sourceId: this.id }));
    }
};

Broadcast.prototype.onmessage = null;


Broadcast.prototype.close = function () {
    if (this.nativeBroadcastChannel) this.nativeBroadcastChannel.close();
};

export default Broadcast;