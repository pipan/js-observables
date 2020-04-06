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
var map_change_1 = require("./map-change");
var map_entry_1 = require("./map-entry");
var SimpleObservableMap = (function (_super) {
    __extends(SimpleObservableMap, _super);
    function SimpleObservableMap(map) {
        if (map === void 0) { map = null; }
        var _this = _super.call(this) || this;
        if (map === null) {
            map = new Map();
        }
        _this.mapValue = map;
        return _this;
    }
    SimpleObservableMap.prototype.callListener = function (fn) {
        var inserted = [];
        this.mapValue.forEach(function (value, key) {
            inserted.push(new map_entry_1.MapEntry(key, value));
        });
        fn(new map_change_1.MapChange(inserted, []));
    };
    SimpleObservableMap.prototype.add = function (key, value) {
        var map = new Map();
        map.set(key, value);
        this.addAll(map);
    };
    SimpleObservableMap.prototype.addAll = function (map) {
        var _this = this;
        var inserted = [];
        map.forEach(function (value, key) {
            if (_this.mapValue.has(key) && _this.mapValue.get(key) === value) {
                return;
            }
            _this.mapValue.set(key, value);
            inserted.push(new map_entry_1.MapEntry(key, value));
        });
        if (inserted.length === 0) {
            return;
        }
        this.fire(new map_change_1.MapChange(inserted, []));
    };
    SimpleObservableMap.prototype.addList = function (items) {
        var map = new Map();
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            map.set(item.getKey(), item.getValue());
        }
        this.addAll(map);
    };
    SimpleObservableMap.prototype.setAll = function (map) {
        var _this = this;
        var removed = [];
        this.mapValue.forEach(function (value, key) {
            if (map.has(key)) {
                return;
            }
            removed.push(new map_entry_1.MapEntry(key, value));
        });
        var inserted = [];
        map.forEach(function (value, key) {
            if (_this.mapValue.has(key) && _this.mapValue.get(key) === value) {
                return;
            }
            inserted.push(new map_entry_1.MapEntry(key, value));
        });
        if (removed.length === 0 && inserted.length === 0) {
            return;
        }
        this.mapValue = map;
        this.fire(new map_change_1.MapChange(inserted, removed));
    };
    SimpleObservableMap.prototype.setList = function (items) {
        var map = new Map();
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            map.set(item.getKey(), item.getValue());
        }
        this.setAll(map);
    };
    SimpleObservableMap.prototype.remove = function (key) {
        this.removeAll([key]);
    };
    SimpleObservableMap.prototype.removeAll = function (keys) {
        var removed = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!this.mapValue.has(key)) {
                continue;
            }
            removed.push(new map_entry_1.MapEntry(key, this.mapValue.get(key)));
            this.mapValue.delete(key);
        }
        if (removed.length === 0) {
            return;
        }
        this.fire(new map_change_1.MapChange([], removed));
    };
    SimpleObservableMap.prototype.removeList = function (list) {
        var removeKeys = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var entry = list_1[_i];
            removeKeys.push(entry.getKey());
        }
        this.removeAll(removeKeys);
    };
    SimpleObservableMap.prototype.get = function (key) {
        if (!this.containes(key)) {
            return null;
        }
        return this.mapValue.get(key);
    };
    SimpleObservableMap.prototype.containes = function (key) {
        return this.mapValue.has(key);
    };
    SimpleObservableMap.prototype.getValues = function () {
        return this.mapValue.values();
    };
    SimpleObservableMap.prototype.getKeys = function () {
        return this.mapValue.keys();
    };
    SimpleObservableMap.prototype.count = function () {
        return this.mapValue.size;
    };
    SimpleObservableMap.prototype.isEmpty = function () {
        return this.count() === 0;
    };
    SimpleObservableMap.prototype.clear = function () {
        if (this.count() === 0) {
            return;
        }
        var removed = [];
        this.mapValue.forEach(function (value, key) {
            removed.push(new map_entry_1.MapEntry(key, value));
        });
        this.mapValue.clear();
        this.fire(new map_change_1.MapChange([], removed));
    };
    SimpleObservableMap.prototype.getEntries = function () {
        return this.mapValue.entries();
    };
    SimpleObservableMap.prototype.forEach = function (callback) {
        this.mapValue.forEach(callback);
    };
    return SimpleObservableMap;
}(simple_observable_1.SimpleObservable));
exports.SimpleObservableMap = SimpleObservableMap;
//# sourceMappingURL=simple-observable-map.js.map