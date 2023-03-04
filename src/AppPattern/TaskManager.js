import { randomIdent } from "../String/stringGenerate";
import EventEmitter from "../HTML5/EventEmitter";
import OOP from "../HTML5/OOP";

/***
 *
 * @param {TaskManager} manager
 * @param {function(finishTask: function, bundle: any): (void|Promise)=} func
 * @param {any=} bundle
 * @constructor
 */
function Task(manager, func, bundle) {
    this.manager = manager;
    this.id = randomIdent(12);
    this.func = func;
    this.bundle = bundle;
    this.state = 0;
}


Task.prototype.begin = function () {
    if (this.state !== 0) return;
    this.state = 1;
    var sync;
    if (this.func) {
        try {
            sync = this.func(this.end.bind(this), this.bundle);
        } catch (error) {
            console.error(error);
        }
    }
    if (sync && sync.then) sync.catch(error => console.error(error)).then(this.end.bind(this));
};


Task.prototype.end = function () {
    if (this.state !== 1) return;
    this.state = 2;
    this.manager.onFinishTask(this);
};


function TaskManager(opt) {
    EventEmitter.call(this);
    opt = opt || {};
    this.limit = ((typeof opt.limit === "number") && opt.limit >= 1) ? opt.limit : Infinity;

    this.pendingTasks = [];
    this.runningTasks = [];
}

OOP.mixClass(TaskManager, EventEmitter);

/***
 *
 * @param {function(finishTask: function, bundle: any): (void|Promise)} func
 * @param {any} bundle
 */
TaskManager.prototype.requestTask = function (func, bundle) {
    var task = new Task(this, func, bundle);
    if (this.runningTasks.length < this.limit) {
        this.runningTasks.push(task);
        this.emit('task_begin', { type: 'task_begin', task }, this);
        task.begin();
    }
    else {
        this.pendingTasks.push(task);
    }
}


TaskManager.prototype.onFinishTask = function (task) {
    var idx = this.runningTasks.indexOf(task);
    if (idx < 0) return;
    this.runningTasks.splice(idx, 1);
    this.emit('task_end', { type: 'task_end', task }, this);
    while (this.pendingTasks.length > 0 && this.runningTasks.length < this.limit) {
        task = this.pendingTasks.shift();
        this.runningTasks.push(task);
        this.emit('task_begin', { type: 'task_begin', task }, this);
        task.begin();
    }
}

TaskManager.prototype.newTask = function () {
    var task = new Task(this, null, null);
    this.runningTasks.push(task);
    this.emit('task_begin', { type: 'task_begin', task }, this);
    task.begin();
    return task;
};


export default TaskManager;