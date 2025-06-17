import { generateJSVariable } from "../JSMaker/generator";

export function MQTTExecSlave(id) {
    this.id = id || 'dev';
    this.client = window.MQTT.connect('wss://absol.cf:9884/');
    this.client.on('connect', () => {
        this.client.subscribe( this.id + '_exec_cmd',  (err)=> {
            if (!err) {
                console.log('Subscribed to topic ' +  this.id + '_exec_cmd');
            }
            else {
                console.error('Subscribe error:', err);
            }
        });
    });

    this.client.on('message', (topic, message) => {
        if (topic ===  this.id + '_exec_cmd') {
            this.handleCommand(message);
        }
    });
}

MQTTExecSlave.prototype.handleCommand = function (message) {
    var data = new Function('return ' + message.toString())();
    var id = data.id;
    var cmd = data.cmd;
    var args = data.args || [];

    try {
        var res = this[cmd].apply(this, args);
    } catch (e) {
        this.client.publish(this.id + '_exec_cmd_result', generateJSVariable({
            id: id,
            error: e.message || e.toString()
        }));
    }

    if (res.then) {
        res.then((result) => {
            this.client.publish(this.id + '_exec_cmd_result', generateJSVariable({ id: id, result }));
        }).catch((err) => {
            this.client.publish(this.id + '_exec_cmd_result', generateJSVariable({
                id: id,
                error: (err && err.message || err.toString()) || "undefined_error"
            }));
        });
    }
    else {
        this.client.publish(this.id + '_exec_cmd_result', generateJSVariable({ id: id, result: res }));
    }
}

export function MQTTExecMaster(id) {
    this.id = id || 'dev';
    this.client = window.MQTT.connect('wss://absol.cf:9884/');
    this.client.on('connect', () => {
        this.client.subscribe(this.id + '_exec_cmd_result',  (err)=> {
            if (!err) {
                console.log('Subscribed to topic ' + this.id + '_exec_cmd_result');
            }
            else {
                console.error('Subscribe error:', err);
            }
        });
    });

    this.client.on('message', (topic, message) => {
        if (topic === this.id + '_exec_cmd_result') {
            this.handleResult(message);
        }
    });

    this.promises = {};
}


MQTTExecMaster.prototype.invoke = function (cmd, ...args) {
    return new Promise((rs, rj) => {
        var id = Math.random().toString(36).substring(2, 15);
        this.promises[id] = {
            resolve: rs,
            reject: rj
        };
        this.client.publish(this.id + '_exec_cmd', generateJSVariable({
            cmd: cmd,
            args: args,
        }));
    });
};

MQTTExecMaster.prototype.handleResult = function (message) {
    var data = new Function('return ' + message.toString())();
    var id = data.id;
    var promise = this.promises[id];
    if (!promise) return;
    delete this.promises[id];
    if (data.error) {
        promise.reject(data.error);
    }
    else {
        promise.resolve(data.result);
    }
}