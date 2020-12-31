import EventEmitter from "../HTML5/EventEmitter";
import OOP from "../HTML5/OOP";

/***
 * @extends EventEmitter
 * @constructor
 */
function FlagManager() {
    EventEmitter.call(this);
    this.flag = {};
    this.readSetting();
}

OOP.mixClass(FlagManager, EventEmitter);

FlagManager.prototype.STORE_KEY = "ABSOL_FLAG"

FlagManager.prototype.readSetting = function () {
    var flagText = localStorage.getItem(this.STORE_KEY) || '{}';
    var newFlag = {};
    try {
        newFlag = JSON.parse(flagText);
    } catch (err) {

    }
    this.applyFlag(newFlag);
};

FlagManager.prototype.applyFlag = function (newFlag, save) {
    var changed = [];
    Object.keys(Object.assign({}, this.flag, newFlag)).forEach(function (key) {
        if (key in window) {
            if (key in newFlag) {
                if (window[key] !== newFlag[key]) {
                    window[key] = newFlag[key];
                    changed.push(key);
                }
            }
            else {
                changed.push(key);
                delete window[key];
            }
        }
        else {
            if (key in newFlag) {
                if (window[key] !== newFlag[key]) {
                    window[key] = newFlag[key];
                    changed.push(key);
                }
            }
        }
    });
    this.flag = newFlag;
    if (save) this.saveSetting();
    if (changed.length > 0) {
        this.emit('change', { type: 'change', target: this, keys: changed })
    }
};

FlagManager.prototype.saveSetting = function () {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(this.flag));
};

/***
 *
 * @param {string} key
 * @param {boolean=} value
 */
FlagManager.prototype.add = function (key, value) {
    if (!key || (typeof (key) != 'string')) return;
    if (key in this.flag) return;
    if (typeof (value) != "boolean") {
        value = !!window[key];
    }
    this.flag[key] = value;
    window[key] = value;
    this.saveSetting();
    this.emit('change', { type: 'change', target: this, keys: [key] });
};

FlagManager.prototype.set = function (key, value) {
    if (!key || (typeof (key) != 'string')) return;
    if (typeof (value) != "boolean") {
        value = !!window[key];
    }
    var changed = false;
    this.flag[key] = value;
    if (window[key] !== value) {
        changed = true;
    }
    this.saveSetting();
    if (changed) {
        this.emit('change', { type: 'change', target: this, keys: [key] });
    }
};

FlagManager.prototype.remove = function (key) {
    if (key in this.flag) {
        delete window[key];
        delete this.flag[key];
        this.emit('change', { type: 'change', target: this, keys: [key] });
    }
};

export default new FlagManager();