"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerClosable_1 = require("./ListenerClosable");
var ListenerFn_1 = require("./ListenerFn");
var Channel = (function () {
    function Channel() {
        this.listeners = [];
    }
    Channel.prototype.addListener = function (listener) {
        this.listeners.push(listener);
        return new ListenerClosable_1.ListenerClosable(this, listener);
    };
    Channel.prototype.addListenerFn = function (fn) {
        return this.addListener(new ListenerFn_1.ListenerFn(fn));
    };
    Channel.prototype.removeListener = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index < 0) {
            return;
        }
        this.listeners.splice(index, 1);
    };
    Channel.prototype.dispatch = function (data) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.action(data);
        }
    };
    return Channel;
}());
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map