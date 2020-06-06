"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdapterFn = (function () {
    function AdapterFn(fn) {
        this.fn = fn;
    }
    AdapterFn.prototype.adapt = function (value) {
        return this.fn(value);
    };
    return AdapterFn;
}());
exports.AdapterFn = AdapterFn;
//# sourceMappingURL=AdapterFn.js.map