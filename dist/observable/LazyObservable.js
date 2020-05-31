"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProxyChannel_1 = require("../channel/ProxyChannel");
var DispatcherFn_1 = require("./DispatcherFn");
var LazyObservable = (function () {
    function LazyObservable(value) {
        this.channel = new ProxyChannel_1.ProxyChannel();
        this.value = value;
    }
    LazyObservable.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    LazyObservable.prototype.connectFn = function (dispatcher) {
        return this.connect(new DispatcherFn_1.DsipatcherFn(dispatcher));
    };
    LazyObservable.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
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