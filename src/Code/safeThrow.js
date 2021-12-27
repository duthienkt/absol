export default function safeThrow(error) {
    setTimeout(function () {
        throw  error;
    }, 0);
}