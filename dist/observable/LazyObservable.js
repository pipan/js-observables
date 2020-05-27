"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerFn_1 = require("./ListenerFn");
var ProxyChannel_1 = require("../channel/ProxyChannel");
var LazyObservable = (function () {
    function LazyObservable(value) {
        this.channel = new ProxyChannel_1.ProxyChannel();
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
    LazyObservable.prototype.dispatch = function (value) {
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