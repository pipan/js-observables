"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_closable_1 = require("./observable-closable");
var SimpleObservable = (function () {
    function SimpleObservable() {
        this.listeners = [];
    }
    SimpleObservable.prototype.addListener = function (fn) {
        this.listeners.push(fn);
        return new observable_closable_1.ObservableClosable(this, fn);
    };
    SimpleObservable.prototype.addListenerAndCall = function (fn) {
        var cloasable = this.addListener(fn);
        this.callListener(fn);
        return cloasable;
    };
    SimpleObservable.prototype.removeListener = function (fn) {
        var index = this.listeners.indexOf(fn);
        if (index === -1) {
            return;
        }
        this.listeners.splice(index, 1);
    };
    SimpleObservable.prototype.fire = function (item) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn(item);
        }
    };
    return SimpleObservable;
}());
exports.SimpleObservable = SimpleObservable;
//# sourceMappingURL=simple-observable.js.map