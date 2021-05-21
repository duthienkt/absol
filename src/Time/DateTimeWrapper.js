function DateTimeWrapper() {
    this.dateTime = new Date();
}


DateTimeWrapper.prototype.valueOf = function () {
    return this.dateTime;
};

export default DateTimeWrapper;
