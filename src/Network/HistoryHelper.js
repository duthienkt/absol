var HistoryHelper = {};
window.HistoryHelper = window.HistoryHelper || HistoryHelper;//assign to global if code is module

HistoryHelper._stack = [];
HistoryHelper._id = 1;

/***
 *
 * current state info(exculde hock without url)
 * @type {{id: number, callback: function, bundle: any}}
 */
// Object.defineProperty(HistoryHelper, 'current', {
//     get: function () {
//         var holder;
//         for (var i = HistoryHelper._stack.length - 1; i >= 0; --i) {
//             holder = HistoryHelper._stack[i];
//             if (!holder.preventBack)
//                 return holder;
//         }
//         return null;
//     }
// })

HistoryHelper._onpopstate = function (event) {
    var state = event.state;
    if (!state || state.of !== 'HISTORY_HELPER') {
        HistoryHelper.current = null;
        return;
    }
    var idx;
    if (state.id === "EMPTY") {
        idx = HistoryHelper._stack.findIndex(function (holder) {
            return holder.id === state.ref;
        });
        if (idx > 0) {
            HistoryHelper.current = HistoryHelper._stack[idx];
        }
        else {
            setTimeout(function (){
            window.history.back();
            }, 10);
        }

        return;
    }
    idx = HistoryHelper._stack.findIndex(function (holder) {
        return holder.id === state.id;
    });
    if (idx < 0) {
        history.back();
        return;
    }
    var holder = HistoryHelper._stack[idx];
    if (holder.preventBack) {
        if (typeof holder.callback === "function") {
            holder.callback(holder.bundle);
        }
        window.history.pushState({ id: 'EMPTY', ref: holder.id, of: 'HISTORY_HELPER' }, '');
    }
    else {
        HistoryHelper._stack.splice(idx, HistoryHelper._stack.length - idx)
            .forEach(function (holder) {
                delete HistoryHelper._id[holder.id];
            });
        HistoryHelper.current = HistoryHelper._stack[HistoryHelper._stack.length - 1] || null;
        if (typeof holder.callback === "function") {
            holder.callback(holder.bundle);
        }
        // setTimeout(function (){
        window.history.back();
        // }, 10);
    }
};

window.addEventListener('popstate', HistoryHelper._onpopstate, true);

/***
 *
 * @param {string} newURL
 * @param {function(bundle:any):void} callbackFunc
 * @param {any=} bundle - optional, everthing you want to recive in callbackFunc
 * @return {number}
 */
HistoryHelper.setNewLink = function (newURL, callbackFunc, bundle) {
    var id = HistoryHelper._id++;
    var currentState = history.state;
    window.history.pushState({ id: id, of: 'HISTORY_HELPER' }, '', newURL);
    window.history.pushState({ id: 'EMPTY', ref: id, of: 'HISTORY_HELPER' }, '');

    var holder = {
        id: id,
        callback: callbackFunc,
        url: newURL,
        preventBack: false,
        bundle: bundle
    };
    HistoryHelper._stack.push(holder);
    HistoryHelper.current = holder;
    return id;
};


HistoryHelper.deleteHandle = function (handle) {
    var idx = HistoryHelper._stack.findIndex(function (holder) {
        return holder.id === handle;
    });
    if (idx >= 0) {
        HistoryHelper._stack.splice(idx, 1);
        if (window.history.state && (window.history.state.id === handle || window.history.state.ref === handle)) window.history.back();
    }
};


/***
 *
 * @param {function(bundle:any):void} callbackFunc
 * @param {any=} bundle - optional, everything you want to receive in callbackFunc
 * @return {number}
 */
HistoryHelper.hook = function (callbackFunc, bundle) {
    var id = HistoryHelper._id++;
    window.history.pushState({ id: id, of: 'HISTORY_HELPER' }, '');
    window.history.pushState({ id: 'EMPTY', ref: id, of: 'HISTORY_HELPER' }, '');
    var holder = {
        id: id,
        callback: callbackFunc,
        bundle: bundle,
        preventBack: true
    };
    HistoryHelper._stack.push(holder);
    return id;
};