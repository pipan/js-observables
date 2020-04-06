"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapChange = (function () {
    function MapChange(inservedValue, removedValue) {
        this.inservedValue = inservedValue;
        this.removedValue = removedValue;
    }
    MapChange.prototype.inserted = function () {
        return this.inservedValue;
    };
    MapChange.prototype.removed = function () {
        return this.removedValue;
    };
    return MapChange;
}());
exports.MapChange = MapChange;
//# sourceMappingURL=map-change.js.map