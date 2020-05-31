"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionCloser = (function () {
    function ConnectionCloser(connector, Dispatchable) {
        this.connector = connector;
        this.dispatchable = Dispatchable;
    }
    ConnectionCloser.prototype.close = function () {
        this.connector.disconnect(this.dispatchable);
    };
    return ConnectionCloser;
}());
exports.ConnectionCloser = ConnectionCloser;
//# sourceMappingURL=ConnectionCloser.js.map