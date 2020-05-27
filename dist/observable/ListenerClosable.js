"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerClosable = (function () {
    function ListenerClosable(observable, listener) {
        this.observable = observable;
        this.listener = listener;
    }
    ListenerClosable.prototype.close = function () {
        this.observable.removeListener(this.listener);
    };
    return ListenerClosable;
}());
exports.ListenerClosable = ListenerClosable;
//# sourceMappingURL=ListenerClosable.js.map