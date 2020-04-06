"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapEntry = (function () {
    function MapEntry(key, value) {
        this.key = key;
        this.value = value;
    }
    MapEntry.prototype.getKey = function () {
        return this.key;
    };
    MapEntry.prototype.getValue = function () {
        return this.value;
    };
    return MapEntry;
}());
exports.MapEntry = MapEntry;
//# sourceMappingURL=map-entry.js.map