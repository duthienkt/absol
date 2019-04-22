var Event = {};
Event.isMouseRight = function (event) {
    var isRightMB = false;
    if ("which" in event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = event.which == 3;
    else if ("button" in event)  // IE, Opera 
        isRightMB = event.button == 2;
    return isRightMB;
};

Event.hitElement = function (element, event) {
    var current = event.target;
    while (current) {
        if (current == element) return true;
        current = current.parentElement;
    }
    return false;
};

Event.copyEvent = function (event, props) {
    var result = {};
    Object.assign(result, event);
    for (var key in result) {
        if (typeof result[key] == 'function') {
            result[key] = result[key].bind(event);
        }
    };

    if (props)
        Object.assign(result, props);
    return result;
};


export default Event;
