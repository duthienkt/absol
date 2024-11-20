export default function safeThrow(error) {
    setTimeout(function () {
        if (error.stack) {
            try {
                error.message += '\n' + error.stack;
            }
            catch (e){
                //can not modify message
            }
        }
        throw error;
    }, 0);
}