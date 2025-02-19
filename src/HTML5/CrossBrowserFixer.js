import BrowserDetector from '../Detector/BrowserDetector';



Element.fixBrowserEvent = function (element) {
    if (BrowserDetector.isSafari && !BrowserDetector.isMobile) {
        if (!element.isSupportedEvent('mouseleave')) {
            element.defineEvent('mouseleave');
            var mouseLeaveEventHandler = function (event) {
                var bound = this.getBoundingClientRect();
                var ok = false;
                ok |= event.clientX < bound.left + 1;
                ok |= event.clientX >= bound.right - 1;
                ok |= event.clientY < bound.top + 1;
                ok |= event.clientY >= bound.bottom - 1;
                if (ok) this.emit('mouseleave', event);
            };
            element.addEventListener('mouseleave', mouseLeaveEventHandler, true);
        }
    }

    if (BrowserDetector.isFirefox && false) {
        if (!element.isSupportedEvent('wheel')) {
            element.defineEvent('wheel');
            var wheelEventHandler = function (oldEvent) {
                //clone event to avoid some lib fix it
                var event = oldEvent.absolEvent;
                if (!event) {
                    event = Object.assign({}, oldEvent);
                    for (var i = 0; i < Element.eventProperties.length; ++i) {
                        var key = Element.eventProperties[i];
                        if (typeof (event[key]) == 'function') {
                            event[key] = event[key].bind(oldEvent);
                        }
                    }

                    event.preventDefault = function () {
                        oldEvent.preventDefault();
                    };
                    if (!event.mozFixWheelScale) {
                        event.mozDeltaY = oldEvent.deltaY;
                        event.mozFixWheelScale = true;
                        Object.defineProperty(event, 'deltaY', { get: function () { return this.mozDeltaY * 100 / 3; } });
                    }
                    oldEvent.absolEvent = event;
                }
                this.emit('wheel', event);
            };
            element.addEventListener('wheel', wheelEventHandler);
        }
    }
};