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
var map_change_1 = require("../map/map-change");
var map_entry_1 = require("../map/map-entry");
var simple_observable_list_1 = require("../list/simple-observable-list");
var SimpleObservableGroup = (function (_super) {
    __extends(SimpleObservableGroup, _super);
    function SimpleObservableGroup(list) {
        if (list === void 0) { list = []; }
        var _this = _super.call(this) || this;
        _this.mapValue = new Map();
        _this.addAll(list);
        return _this;
    }
    SimpleObservableGroup.prototype.callListener = function (fn) {
        var toInsert = [];
        this.mapValue.forEach(function (value, key) {
            toInsert.push(new map_entry_1.MapEntry(key, value));
        });
        fn(new map_change_1.MapChange(toInsert, []));
    };
    SimpleObservableGroup.prototype.create = function (key) {
        var list = new simple_observable_list_1.SimpleObservableList();
        this.mapValue.set(key, list);
        return list;
    };
    SimpleObservableGroup.prototype.get = function (key) {
        if (!this.containesKey(key)) {
            return null;
        }
        return this.mapValue.get(key);
    };
    SimpleObservableGroup.prototype.add = function (key, item) {
        this.addAll([new map_entry_1.MapEntry(key, item)]);
    };
    SimpleObservableGroup.prototype.addAll = function (items) {
        var inserted = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var list = this.get(item.getKey());
            if (list === null) {
                list = this.create(item.getKey());
                inserted.push(new map_entry_1.MapEntry(item.getKey(), list));
            }
            list.add(item.getValue());
        }
        if (inserted.length === 0) {
            return;
        }
        this.fire(new map_change_1.MapChange(inserted, []));
    };
    SimpleObservableGroup.prototype.setAll = function (items) {
        var _this = this;
        var map = new Map();
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            if (!map.has(item.getKey())) {
                map.set(item.getKey(), []);
            }
            map.get(item.getKey()).push(item.getValue());
        }
        var removed = [];
        this.mapValue.forEach(function (value, key) {
            if (map.has(key)) {
                return;
            }
            removed.push(new map_entry_1.MapEntry(key, value));
            _this.mapValue.delete(key);
        });
        var inserted = [];
        map.forEach(function (value, key) {
            var list = _this.get(key);
            if (list === null) {
                list = _this.create(key);
                inserted.push(new map_entry_1.MapEntry(key, list));
            }
            list.setAll(value);
        });
        if (removed.length === 0 && inserted.length === 0) {
            return;
        }
        this.fire(new map_change_1.MapChange(inserted, removed));
    };
    SimpleObservableGroup.prototype.remove = function (key, item) {
        this.removeAll([new map_entry_1.MapEntry(key, item)]);
    };
    SimpleObservableGroup.prototype.removeAll = function (items) {
        var removed = [];
        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
            var item = items_3[_i];
            var list = this.get(item.getKey());
            if (list == null) {
                continue;
            }
            list.remove(item.getValue());
            if (list.count() === 0) {
                this.mapValue.delete(item.getKey());
                removed.push(new map_entry_1.MapEntry(item.getKey(), list));
            }
        }
        if (removed.length === 0) {
            return;
        }
        this.fire(new map_change_1.MapChange([], removed));
    };
    SimpleObservableGroup.prototype.removeKey = function (key) {
        if (!this.containesKey(key)) {
            return;
        }
        var list = this.get(key);
        list.clear();
        this.mapValue.delete(key);
        var removed = [];
        removed.push(new map_entry_1.MapEntry(key, list));
        this.fire(new map_change_1.MapChange([], removed));
    };
    SimpleObservableGroup.prototype.containes = function (key, value) {
        if (!this.containesKey(key)) {
            return false;
        }
        return this.get(key).contains(value);
    };
    SimpleObservableGroup.prototype.containesKey = function (key) {
        return this.mapValue.has(key);
    };
    SimpleObservableGroup.prototype.getValues = function () {
        return this.mapValue.values();
    };
    SimpleObservableGroup.prototype.getKeys = function () {
        return this.mapValue.keys();
    };
    SimpleObservableGroup.prototype.count = function () {
        return this.mapValue.size;
    };
    SimpleObservableGroup.prototype.countKey = function (key) {
        if (!this.containesKey(key)) {
            return 0;
        }
        return this.get(key).count();
    };
    SimpleObservableGroup.prototype.isEmpty = function () {
        return this.count() === 0;
    };
    SimpleObservableGroup.prototype.clear = function () {
        var removed = [];
        this.mapValue.forEach(function (value, key) {
            value.clear();
            removed.push(new map_entry_1.MapEntry(key, value));
        });
        this.mapValue.clear();
        if (removed.length === 0) {
            return;
        }
        this.fire(new map_change_1.MapChange([], removed));
    };
    SimpleObservableGroup.prototype.getEntries = function () {
        return this.mapValue.entries();
    };
    SimpleObservableGroup.prototype.forEach = function (callback) {
        this.mapValue.forEach(callback);
    };
    return SimpleObservableGroup;
}(simple_observable_1.SimpleObservable));
exports.SimpleObservableGroup = SimpleObservableGroup;
//# sourceMappingURL=simple-observable-group.js.map