"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channel_1 = require("./Channel");
var ListenerFn_1 = require("./ListenerFn");
var LazyObservable = (function () {
    function LazyObservable(value) {
        this.channel = new Channel_1.Channel();
        this.value = value;
    }
    LazyObservable.prototype.addListener = function (listener) {
        return this.channel.addListener(listener);
    };
    LazyObservable.prototype.addListenerFn = function (fn) {
        return this.addListener(new ListenerFn_1.ListenerFn(fn));
    };
    LazyObservable.prototype.removeListener = function (listener) {
        this.channel.removeListener(listener);
    };
    LazyObservable.prototype.set = function (value) {
        if (value === this.value) {
            return;
        }
        this.value = value;
        this.channel.dispatch(value);
    };
    LazyObservable.prototype.get = function () {
        return this.value;
    };
    return LazyObservable;
}());
exports.LazyObservable = LazyObservable;
//# sourceMappingURL=LazyObservable.js.map