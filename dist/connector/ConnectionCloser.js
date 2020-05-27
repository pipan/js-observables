"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionCloser = (function () {
    function ConnectionCloser(connector, dispatcher) {
        this.connector = connector;
        this.dispatcher = dispatcher;
    }
    ConnectionCloser.prototype.close = function () {
        this.connector.disconnect(this.dispatcher);
    };
    return ConnectionCloser;
}());
exports.ConnectionCloser = ConnectionCloser;
//# sourceMappingURL=ConnectionCloser.js.map