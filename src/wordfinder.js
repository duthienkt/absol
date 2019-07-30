import IFrameBridge from "./Network/IFrameBridge";
import EnglishWord from "./String/EnglishWords";

var bridge = IFrameBridge.getInstance();

bridge.find = function (query) {
    return EnglishWord.filter(function (s) {
        return s.indexOf(query) >= 0;
    });
};
