export default function safeThrow(error) {
    setTimeout(function () {
        if (error.stack) {
            error.message += '\n' + error.stack;
        }
        throw error;
    }, 0);
}