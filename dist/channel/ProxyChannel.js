"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DispatcherFn_1 = require("../observable/DispatcherFn");
var ConnectionCloser_1 = require("../observable/ConnectionCloser");
var ProxyChannel = (function () {
    function ProxyChannel() {
        this.connections = new Map();
    }
    ProxyChannel.prototype.connect = function (dispatcher) {
        if (this.connections.has(dispatcher)) {
            return;
        }
        var closable = new ConnectionCloser_1.ConnectionCloser(this, dispatcher);
        this.connections.set(dispatcher, closable);
        return closable;
    };
    ProxyChannel.prototype.connectFn = function (fn) {
        return this.connect(new DispatcherFn_1.DsipatcherFn(fn));
    };
    ProxyChannel.prototype.disconnect = function (dispatcher) {
        if (!this.connections.has(dispatcher)) {
            return;
        }
        this.connections.delete(dispatcher);
    };
    ProxyChannel.prototype.dispatch = function (data) {
        this.connections.forEach(function (closable, dispatcher) {
            dispatcher.dispatch(data);
        });
    };
    return ProxyChannel;
}());
exports.ProxyChannel = ProxyChannel;
//# sourceMappingURL=ProxyChannel.js.map