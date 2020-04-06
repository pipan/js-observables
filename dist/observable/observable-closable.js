"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObservableClosable = (function () {
    function ObservableClosable(observable, fn) {
        this.observable = observable;
        this.fn = fn;
    }
    ObservableClosable.prototype.close = function () {
        this.observable.removeListener(this.fn);
    };
    return ObservableClosable;
}());
exports.ObservableClosable = ObservableClosable;
//# sourceMappingURL=observable-closable.js.map