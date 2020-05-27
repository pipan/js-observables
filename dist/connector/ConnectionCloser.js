"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionCloser = (function () {
    function ConnectionCloser(connectable, observable) {
        this.connectable = connectable;
        this.observable = observable;
    }
    ConnectionCloser.prototype.close = function () {
        this.connectable.disconnect(this.observable);
    };
    return ConnectionCloser;
}());
exports.ConnectionCloser = ConnectionCloser;
//# sourceMappingURL=ConnectionCloser.js.map