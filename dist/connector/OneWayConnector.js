"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionCloser_1 = require("./ConnectionCloser");
var ConnectionListener_1 = require("./ConnectionListener");
var OneWayConnector = (function () {
    function OneWayConnector(source) {
        this.source = source;
        this.connections = new Map();
    }
    OneWayConnector.prototype.connect = function (target) {
        if (this.connections.has(target)) {
            return;
        }
        var targetClosable = this.source.addListener(new ConnectionListener_1.ConnectionListener(target));
        this.connections.set(target, targetClosable);
        return new ConnectionCloser_1.ConnectionCloser(this, target);
    };
    OneWayConnector.prototype.disconnect = function (target) {
        if (!this.connections.has(target)) {
            return;
        }
        this.connections.get(target).close();
        this.connections.delete(target);
    };
    return OneWayConnector;
}());
exports.OneWayConnector = OneWayConnector;
//# sourceMappingURL=OneWayConnector.js.map