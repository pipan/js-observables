"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionListener = (function () {
    function ConnectionListener(target) {
        this.target = target;
    }
    ConnectionListener.prototype.action = function (value) {
        this.target.dispatch(value);
    };
    return ConnectionListener;
}());
exports.ConnectionListener = ConnectionListener;
//# sourceMappingURL=ConnectionListener.js.map