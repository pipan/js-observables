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
var simple_observable_1 = require("../observable/simple-observable");
var property_change_1 = require("./property-change");
var SimpleObservableProperty = (function (_super) {
    __extends(SimpleObservableProperty, _super);
    function SimpleObservableProperty(value) {
        if (value === void 0) { value = null; }
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    SimpleObservableProperty.prototype.callListener = function (listener) {
        listener(new property_change_1.PropertyChange(null, this.value));
    };
    SimpleObservableProperty.prototype.get = function () {
        return this.value;
    };
    SimpleObservableProperty.prototype.set = function (value) {
        if (value === this.value) {
            return;
        }
        var prev = this.value;
        this.value = value;
        this.fire(new property_change_1.PropertyChange(prev, this.value));
    };
    SimpleObservableProperty.prototype.isEmpty = function () {
        return this.value === null || this.value === undefined;
    };
    return SimpleObservableProperty;
}(simple_observable_1.SimpleObservable));
exports.SimpleObservableProperty = SimpleObservableProperty;
//# sourceMappingURL=simple-observable-property.js.map