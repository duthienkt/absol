export default function safeThrow(error) {
    var func = function () {
        if (error.stack) {
            try {
                error.message += '\n' + error.stack;
            }
            catch (e){
                //can not modify message
            }
        }
        throw error;
    }
    if (window.Thread && window.Thread.setTimeout) {
        window.Thread.setTimeout({
            func: func,
            time: 1,
            type: 'background',
            args: [],
            stack: error.stack || ""
        });
    }
    else {
        setTimeout(func, 1);
    }
}