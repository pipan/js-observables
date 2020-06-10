"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListAdapter = (function () {
    function ListAdapter(itemAdapter) {
        this.itemAdapter = itemAdapter;
    }
    ListAdapter.prototype.adapt = function (items) {
        var result = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            result.push(this.itemAdapter.adapt(item));
        }
        return result;
    };
    return ListAdapter;
}());
exports.ListAdapter = ListAdapter;
//# sourceMappingURL=ListAdapter.js.map