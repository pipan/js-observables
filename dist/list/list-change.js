"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListChange = (function () {
    function ListChange(insertedValues, removedValues) {
        this.insertedValues = insertedValues;
        this.removedValues = removedValues;
    }
    ListChange.prototype.removed = function () {
        return this.removedValues;
    };
    ListChange.prototype.inserted = function () {
        return this.insertedValues;
    };
    return ListChange;
}());
exports.ListChange = ListChange;
//# sourceMappingURL=list-change.js.map