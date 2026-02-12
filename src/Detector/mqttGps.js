import { loadScript } from "../Network/XLoader";
import MockGPS from "./MockGPS";
import Dom from "../HTML5/Dom";
import Rectangle from "../Math/Rectangle";
import { isMouseMiddle, isMouseRight } from "../HTML5/EventEmitter";

const MQTT_URL = "wss://mqtt.absol.cf:9884/";
const TOPIC = "duthienkt/tracker/MAZDA_CX5/tracking";

let _mpqttPromise = null;
var _ = Dom.ShareInstance._;
var $ = Dom.ShareInstance.$;

/**
 * Load mpqtt library once via loadScript.
 * @returns {Promise<any>} resolves when mpqtt is available (window.mpqtt).
 */
export function loadMpqtt() {
    if (_mpqttPromise) return _mpqttPromise;

    // Use the browser bundle that exposes window.mqtt
    _mpqttPromise = loadScript("https://unpkg.com/mqtt@5.14.1/dist/mqtt.min.js")
        .then(() => {
            if (!window.mqtt) {
                throw new Error("mqtt loaded but window.mqtt is not available");
            }
            return window.mqtt;
        });

    return _mpqttPromise;
}

// Keep side-effect load if you want immediate loading on import:
loadMpqtt().then(() => {
    main();
});



var circleDirectionElt = null;

var offsetDeg = 207;
var rotateDeg = 0;
function loadGUI(){
    circleDirectionElt = _({
        tag: "div",
        style: {
            position: "fixed",
            zIndex: 1e8,
            top: "150px",
            right: "5px",
            width: "100px",
            height: "100px",
            backgroundColor: "white",
            borderRadius: "50%",
            // border: "1px solid gray",
            boxShadow: "0 0 5px rgba(0,0,0,0.5)",
            transform: "rotate(" + offsetDeg + rotateDeg + "deg)",
        },
        child:{
            tag: "div",
            style: {
                position: "absolute",
                top: "10px",
                left: "50%",
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "20px solid red",
                transform: "translate(-50%, -100%) rotate(" + 0 + "deg)",
                transition: 'transform 0.5s ease-out',
            }
        }
    });
    document.body.appendChild(circleDirectionElt);

    circleDirectionElt.on('click', function (event) {
        if (isMouseMiddle(event)){
            offsetDeg = 207;
            circleDirectionElt.addStyle("transform", "rotate(" + (offsetDeg + rotateDeg) + "deg)");
            return;
        }
        var bound = Rectangle.fromClientRect(circleDirectionElt.getBoundingClientRect());
        var center = bound.centerPoint();
        var clickPoint = { x: event.clientX, y: event.clientY };
        var angleRad = Math.atan2(clickPoint.y - center.y, clickPoint.x - center.x) + 90 * Math.PI / 180;
        var angleDeg = (angleRad * 180 / Math.PI + 360) % 360;
        offsetDeg = angleDeg - rotateDeg;
        circleDirectionElt.addStyle("transform", "rotate(" + (offsetDeg + rotateDeg) + "deg)");

    })

}


function main() {
    //localStorage.setItem("mock_gps", "true")
    if (localStorage.getItem("mock_gps") !== "true") return;
    const mockGPS = new MockGPS();
    mockGPS.start();
    loadGUI();

    loadMpqtt().then((mqtt) => {
        const client = mqtt.connect(MQTT_URL);

        client.on("connect", () => {
            client.subscribe(TOPIC);
        });

        client.on("message", (topic, payload) => {
            let obj;
            try {
                const text = typeof payload === "string" ? payload : payload.toString("utf8");
                obj = JSON.parse(text);
            }
            catch (e) {
                return; // ignore non-JSON messages
            }

            // "trả về object" — keep it as the parsed object (for debugging/usage)
            // eslint-disable-next-line no-unused-vars
            const parsedObject = obj;

            const lat = obj && obj.lat;
            const lng = obj && obj.lng;
            const heading_deg = obj && obj.heading_deg;
            if (typeof heading_deg === "number") {
                rotateDeg = heading_deg;
                circleDirectionElt.addStyle("transform", "rotate(" + (offsetDeg + rotateDeg) + "deg)");
            }
            console.log("Received GPS:", obj);
            if (typeof lat === "number" && typeof lng === "number") {
                mockGPS.setLatLng(lat, lng);
            }
        });

        client.on("error", () => {
            // ...optional: handle/log...
        });
    });
}
