"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionCloser = (function () {
    function ConnectionCloser(connector, Dispatchable) {
        this.connector = connector;
        this.Dispatchable = Dispatchable;
    }
    ConnectionCloser.prototype.close = function () {
        this.connector.disconnect(this.Dispatchable);
    };
    return ConnectionCloser;
}());
exports.ConnectionCloser = ConnectionCloser;
//# sourceMappingURL=ConnectionCloser.js.map