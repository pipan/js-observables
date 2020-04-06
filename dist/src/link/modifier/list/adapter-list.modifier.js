"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_change_1 = require("../../../list/list-change");
var AdapterListModifier = (function () {
    function AdapterListModifier(fn) {
        this.fn = fn;
    }
    AdapterListModifier.prototype.modify = function (change) {
        var toRemove = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var remove = _a[_i];
            toRemove.push(this.fn(remove));
        }
        var toInsert = [];
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var insert = _c[_b];
            toInsert.push(this.fn(insert));
        }
        return new list_change_1.ListChange(toInsert, toRemove);
    };
    return AdapterListModifier;
}());
exports.AdapterListModifier = AdapterListModifier;
//# sourceMappingURL=adapter-list.modifier.js.map