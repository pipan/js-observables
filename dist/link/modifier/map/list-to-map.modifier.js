"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_change_1 = require("../../../map/map-change");
var map_entry_1 = require("../../../map/map-entry");
var ListToMapModifier = (function () {
    function ListToMapModifier(fn) {
        this.fn = fn;
    }
    ListToMapModifier.prototype.modify = function (item) {
        var toRemove = [];
        for (var _i = 0, _a = item.removed(); _i < _a.length; _i++) {
            var remove = _a[_i];
            toRemove.push(new map_entry_1.MapEntry(this.fn(remove), remove));
        }
        var toInsert = [];
        for (var _b = 0, _c = item.inserted(); _b < _c.length; _b++) {
            var insert = _c[_b];
            toInsert.push(new map_entry_1.MapEntry(this.fn(insert), insert));
        }
        return new map_change_1.MapChange(toInsert, toRemove);
    };
    return ListToMapModifier;
}());
exports.ListToMapModifier = ListToMapModifier;
//# sourceMappingURL=list-to-map.modifier.js.map