"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DsipatcherFn = (function () {
    function DsipatcherFn(fn) {
        this.fn = fn;
    }
    DsipatcherFn.prototype.dispatch = function (item) {
        this.fn(item);
    };
    return DsipatcherFn;
}());
exports.DsipatcherFn = DsipatcherFn;
//# sourceMappingURL=DispatcherFn.js.map