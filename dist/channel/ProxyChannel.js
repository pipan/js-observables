"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerClosable_1 = require("../observable/ListenerClosable");
var ListenerFn_1 = require("../observable/ListenerFn");
var ProxyChannel = (function () {
    function ProxyChannel() {
        this.listeners = [];
    }
    ProxyChannel.prototype.addListener = function (listener) {
        this.listeners.push(listener);
        return new ListenerClosable_1.ListenerClosable(this, listener);
    };
    ProxyChannel.prototype.addListenerFn = function (fn) {
        return this.addListener(new ListenerFn_1.ListenerFn(fn));
    };
    ProxyChannel.prototype.removeListener = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index < 0) {
            return;
        }
        this.listeners.splice(index, 1);
    };
    ProxyChannel.prototype.dispatch = function (data) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.action(data);
        }
    };
    return ProxyChannel;
}());
exports.ProxyChannel = ProxyChannel;
//# sourceMappingURL=ProxyChannel.js.map