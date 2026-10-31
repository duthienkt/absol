import safeThrow from "../Code/safeThrow";

/***
 * Mutex - A synchronization primitive for managing critical sections and sequential execution.
 * Executes callback immediately if unlocked, or enqueues it to run when the lock is released.
 *
 * @constructor
 */
function Mutex() {
    if (arguments.length !== 0) {
        throw new TypeError('Mutex does not accept arguments');
    }
    this._locked = false;
    this._queue = [];
    this._ownerToken = null;
    this._advanceScheduled = false;
}

Object.defineProperty(Mutex.prototype, 'locked', {
    enumerable: true,
    configurable: false,
    get: function () {
        return this._locked;
    }
});

Object.defineProperty(Mutex.prototype, 'waitingCount', {
    enumerable: true,
    configurable: false,
    get: function () {
        return this._queue.length;
    }
});

/***
 * Check if the lock is currently held.
 * @return {boolean}
 */
Mutex.prototype.isLocked = function () {
    if (arguments.length !== 0) {
        throw new TypeError('isLocked does not accept arguments');
    }
    return this._locked;
};

/***
 * Acquire the lock and execute callback.
 * If the lock is free, the callback is executed immediately.
 * If the lock is held, the callback is placed in the queue and executed sequentially once preceding tasks unlock.
 *
 * The callback receives an `unlock` function followed by the provided args.
 * If callback returns a Promise/thenable, the lock is automatically released when the Promise settles.
 *
 * @param {function(unlock: function, ...args: *)} callback
 * @param {any=} thisArg - Optional `this` context for callback
 * @param {Array=} args - Optional arguments passed to callback after `unlock`
 * @return {Mutex}
 */
Mutex.prototype.lock = function (callback, thisArg, args) {
    if (typeof callback !== 'function') {
        throw new TypeError('lock callback must be a function');
    }

    var item = {
        callback: callback,
        thisArg: thisArg,
        args: Array.isArray(args) ? args.slice() : []
    };

    if (this._locked) {
        this._queue.push(item);
    }
    else {
        this._locked = true;
        this._execute(item);
    }
    return this;
};

/***
 * Internal method to run a lock task.
 * @param {{callback: function, thisArg: any, args: Array}} item
 * @private
 */
Mutex.prototype._execute = function (item) {
    var self = this;
    var token = {};
    this._ownerToken = token;

    var unlock = function () {
        if (self._ownerToken !== token) return;
        self._ownerToken = null;
        self._next();
    };

    var result;
    try {
        result = item.callback.apply(
            item.thisArg === undefined ? self : item.thisArg,
            [unlock].concat(item.args)
        );
        if (result !== null && result !== undefined) {
            var then = result.then;
            if (typeof then === 'function') {
                then.call(result, unlock, function (error) {
                    safeThrow(error);
                    unlock();
                });
            }
        }
    }
    catch (error) {
       safeThrow(error);
        unlock();
    }
};

/***
 * Releases the lock and triggers the next queued callback if available.
 * @return {Mutex}
 */
Mutex.prototype.unlock = function () {
    if (this._ownerToken === null) return this;
    this._ownerToken = null;
    this._next();
    return this;
};

Mutex.prototype.release = Mutex.prototype.unlock;

/***
 * Proceed to next item in queue or mark lock as released.
 * @private
 */
Mutex.prototype._next = function () {
    if (this._advanceScheduled) return;
    this._advanceScheduled = true;
    var self = this;
    Promise.resolve().then(function () {
        self._advanceScheduled = false;
        if (!self._locked || self._ownerToken !== null) return;
        if (self._queue.length > 0) {
            var nextItem = self._queue.shift();
            self._execute(nextItem);
        }
        else {
            self._locked = false;
        }
    });
};

/***
 * Promise-based lock acquisition.
 * Resolves with the `unlock` function when the lock is acquired.
 * @return {Promise<function(): void>}
 */
Mutex.prototype.acquire = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        var item = {
            callback: function (unlock) {
                resolve(unlock);
            },
            thisArg: undefined,
            args: [],
            onCancel: reject
        };
        if (self._locked) {
            self._queue.push(item);
        }
        else {
            self._locked = true;
            self._execute(item);
        }
    });
};

/***
 * Clear all pending queued tasks without interrupting the current owner.
 * Pending acquire() calls are rejected.
 * @return {Mutex}
 */
Mutex.prototype.clear = function () {
    var cancelled = this._queue.splice(0);
    var error = new Error('Mutex queue was cleared');
    cancelled.forEach(function (item) {
        if (typeof item.onCancel === 'function') item.onCancel(error);
    });
    return this;
};

export default Mutex;
