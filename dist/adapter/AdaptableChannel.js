"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProxyChannel_1 = require("../channel/ProxyChannel");
var AdaptableChannel = (function () {
    function AdaptableChannel(adapter) {
        this.channel = new ProxyChannel_1.ProxyChannel();
        this.adapter = adapter;
    }
    AdaptableChannel.prototype.connect = function (dispatcher) {
        return this.channel.connect(dispatcher);
    };
    AdaptableChannel.prototype.connectFn = function (fn) {
        return this.channel.connectFn(fn);
    };
    AdaptableChannel.prototype.disconnect = function (dispatcher) {
        this.channel.disconnect(dispatcher);
    };
    AdaptableChannel.prototype.dispatch = function (item) {
        this.channel.dispatch(this.adapter.adapt(item));
    };
    return AdaptableChannel;
}());
exports.AdaptableChannel = AdaptableChannel;
//# sourceMappingURL=AdaptableChannel.js.map