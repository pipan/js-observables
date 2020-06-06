"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LazyObservable_1 = require("./LazyObservable");
var EagerObservable = (function (_super) {
    __extends(EagerObservable, _super);
    function EagerObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EagerObservable.prototype.connect = function (dispatcher) {
        var closable = _super.prototype.connect.call(this, dispatcher);
        dispatcher.dispatch(this.value);
        return closable;
    };
    return EagerObservable;
}(LazyObservable_1.LazyObservable));
exports.EagerObservable = EagerObservable;
//# sourceMappingURL=EagerObservable.js.map