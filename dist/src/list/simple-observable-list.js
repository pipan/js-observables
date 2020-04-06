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
var list_change_1 = require("./list-change");
var SimpleObservableList = (function (_super) {
    __extends(SimpleObservableList, _super);
    function SimpleObservableList(items) {
        if (items === void 0) { items = []; }
        var _this = _super.call(this) || this;
        _this.listValue = [];
        _this.listValue = items;
        return _this;
    }
    SimpleObservableList.prototype.callListener = function (listener) {
        listener(new list_change_1.ListChange(this.listValue, []));
    };
    SimpleObservableList.prototype.add = function (item) {
        this.addAll([item]);
    };
    SimpleObservableList.prototype.addAll = function (items) {
        var inserted = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (this.listValue.indexOf(item) > -1) {
                continue;
            }
            this.listValue.push(item);
            inserted.push(item);
        }
        if (inserted.length === 0) {
            return;
        }
        this.fire(new list_change_1.ListChange(inserted, []));
    };
    SimpleObservableList.prototype.setAll = function (items) {
        var removed = [];
        for (var _i = 0, _a = this.listValue; _i < _a.length; _i++) {
            var value = _a[_i];
            if (items.indexOf(value) > -1) {
                continue;
            }
            removed.push(value);
        }
        var inserted = [];
        for (var _b = 0, items_2 = items; _b < items_2.length; _b++) {
            var value = items_2[_b];
            if (this.listValue.indexOf(value) > -1) {
                continue;
            }
            inserted.push(value);
        }
        if (removed.length === 0 && inserted.length === 0) {
            return;
        }
        this.listValue = items;
        this.fire(new list_change_1.ListChange(inserted, removed));
    };
    SimpleObservableList.prototype.remove = function (item) {
        this.removeAll([item]);
    };
    SimpleObservableList.prototype.removeAll = function (items) {
        var removed = [];
        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
            var item = items_3[_i];
            var index = this.listValue.indexOf(item);
            if (index === -1) {
                continue;
            }
            this.listValue.splice(index, 1);
            removed.push(item);
        }
        if (removed.length === 0) {
            return;
        }
        this.fire(new list_change_1.ListChange([], removed));
    };
    SimpleObservableList.prototype.get = function (index) {
        if (this.count() <= index) {
            return null;
        }
        return this.listValue[index];
    };
    SimpleObservableList.prototype.all = function () {
        return this.listValue;
    };
    SimpleObservableList.prototype.count = function () {
        return this.all().length;
    };
    SimpleObservableList.prototype.isEmpty = function () {
        return this.count() === 0;
    };
    SimpleObservableList.prototype.contains = function (item) {
        return this.listValue.indexOf(item) > -1;
    };
    SimpleObservableList.prototype.clear = function () {
        if (this.isEmpty()) {
            return;
        }
        var removed = this.listValue;
        this.listValue = [];
        this.fire(new list_change_1.ListChange([], removed));
    };
    return SimpleObservableList;
}(simple_observable_1.SimpleObservable));
exports.SimpleObservableList = SimpleObservableList;
//# sourceMappingURL=simple-observable-list.js.map