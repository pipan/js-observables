"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionCloser = (function () {
    function ConnectionCloser(connectable, channel) {
        this.connectable = connectable;
        this.channel = channel;
    }
    ConnectionCloser.prototype.close = function () {
        this.connectable.disconnect(this.channel);
    };
    return ConnectionCloser;
}());
exports.ConnectionCloser = ConnectionCloser;
//# sourceMappingURL=ConnectionCloser.js.map