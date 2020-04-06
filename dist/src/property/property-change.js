"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyChange = (function () {
    function PropertyChange(previousValue, nextValue) {
        this.previousValue = previousValue;
        this.nextValue = nextValue;
    }
    PropertyChange.prototype.previous = function () {
        return this.previousValue;
    };
    PropertyChange.prototype.next = function () {
        return this.nextValue;
    };
    return PropertyChange;
}());
exports.PropertyChange = PropertyChange;
//# sourceMappingURL=property-change.js.map