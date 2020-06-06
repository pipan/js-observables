"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipeFn = (function () {
    function PipeFn(fn) {
        this.fn = fn;
    }
    PipeFn.prototype.execute = function (item) {
        return this.fn(item);
    };
    return PipeFn;
}());
exports.PipeFn = PipeFn;
//# sourceMappingURL=PipeFn.js.map