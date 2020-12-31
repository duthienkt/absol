import "./FlagManager";

import noop from "./noop";
import FlagManager from "./FlagManager";

FlagManager.add('ABSOL_DEBUG', false);

function ALogger() {
    FlagManager.on('change', this._updateProto.bind(this));
    this._updateProto();
}

ALogger.prototype._updateProto = function (){
        ['log', 'table', 'table', 'error', 'warn'].forEach(function (name) {
            var cFunction = console[name] && console[name].bind(console);
            this[name] = cFunction || noop;
        }.bind(this));
};


ALogger.prototype.log = noop;
ALogger.prototype.table = noop;
ALogger.prototype.error = noop;
ALogger.prototype.warn = noop;

(window || global).ALogger = new ALogger();


export default ALogger;