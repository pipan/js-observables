"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleModifier = (function () {
    function SimpleModifier(fn) {
        this.fn = fn;
    }
    SimpleModifier.prototype.modify = function (item) {
        return this.fn(item);
    };
    return SimpleModifier;
}());
exports.SimpleModifier = SimpleModifier;
//# sourceMappingURL=simple.modifier.js.map