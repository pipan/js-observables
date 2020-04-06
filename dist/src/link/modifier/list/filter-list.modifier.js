"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_change_1 = require("../../../list/list-change");
var FilterListModifier = (function () {
    function FilterListModifier(fn) {
        this.fn = fn;
    }
    FilterListModifier.prototype.modify = function (change) {
        var toRemove = [];
        for (var _i = 0, _a = change.removed(); _i < _a.length; _i++) {
            var remove = _a[_i];
            if (!this.fn(remove)) {
                continue;
            }
            toRemove.push(remove);
        }
        var toInsert = [];
        for (var _b = 0, _c = change.inserted(); _b < _c.length; _b++) {
            var insert = _c[_b];
            if (!this.fn(insert)) {
                continue;
            }
            toInsert.push(insert);
        }
        return new list_change_1.ListChange(toInsert, toRemove);
    };
    return FilterListModifier;
}());
exports.FilterListModifier = FilterListModifier;
//# sourceMappingURL=filter-list.modifier.js.map