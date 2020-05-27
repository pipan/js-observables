"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerFn = (function () {
    function ListenerFn(fn) {
        this.fn = fn;
    }
    ListenerFn.prototype.action = function (item) {
        this.fn(item);
    };
    return ListenerFn;
}());
exports.ListenerFn = ListenerFn;
//# sourceMappingURL=ListenerFn.js.map