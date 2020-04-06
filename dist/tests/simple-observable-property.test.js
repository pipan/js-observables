"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-jest");
var src_1 = require("../src");
test("get return null after construction", function () {
    var property = new src_1.SimpleObservableProperty();
    expect(property.get()).toBeNull();
});
test("get returns value that was set in constructor", function () {
    var property = new src_1.SimpleObservableProperty("test");
    expect(property.get()).toBe("test");
});
test("get returns value that was set", function () {
    var property = new src_1.SimpleObservableProperty();
    property.set("test");
    expect(property.get()).toBe("test");
});
test("isEmpty is true when constructor empty", function () {
    var property = new src_1.SimpleObservableProperty();
    expect(property.isEmpty()).toBeTruthy();
});
test("isEmpty is true when value is null", function () {
    var property = new src_1.SimpleObservableProperty(null);
    expect(property.isEmpty()).toBeTruthy();
});
test("isEmpty is true when value is undefined", function () {
    var property = new src_1.SimpleObservableProperty(undefined);
    expect(property.isEmpty()).toBeTruthy();
});
test("isEmpty is false when value is string", function () {
    var property = new src_1.SimpleObservableProperty("string");
    expect(property.isEmpty()).toBeFalsy();
});
test("isEmpty is false when value is empty string", function () {
    var property = new src_1.SimpleObservableProperty("");
    expect(property.isEmpty()).toBeFalsy();
});
test("isEmpty is false when value is empty array", function () {
    var property = new src_1.SimpleObservableProperty([]);
    expect(property.isEmpty()).toBeFalsy();
});
test("isEmpty is false when value is false", function () {
    var property = new src_1.SimpleObservableProperty(false);
    expect(property.isEmpty()).toBeFalsy();
});
test("isEmpty is false when value is zero", function () {
    var property = new src_1.SimpleObservableProperty(0);
    expect(property.isEmpty()).toBeFalsy();
});
test("addListenerAndCall fires event on register with previous null and initial value as next", function () {
    var property = new src_1.SimpleObservableProperty("hallo");
    var called = false;
    property.addListenerAndCall(function (change) {
        expect(change.next()).toBe("hallo");
        expect(change.previous()).toBeNull();
        called = true;
    });
    expect(called).toBeTruthy();
});
test("addListener fires after change", function () {
    var property = new src_1.SimpleObservableProperty("hallo");
    var called = false;
    property.addListener(function (change) {
        expect(change.previous()).toBe("hallo");
        expect(change.next()).toBe("from test side");
        called = true;
    });
    property.set("from test side");
    expect(called).toBeTruthy();
});
test("addListener does not fire when setting same value", function () {
    var property = new src_1.SimpleObservableProperty("test");
    var called = false;
    property.addListener(function (change) {
        called = true;
    });
    property.set("test");
    expect(called).toBeFalsy();
});
test("removeListener removes listener and change is not called", function () {
    var property = new src_1.SimpleObservableProperty();
    var called = false;
    var listener = function (change) {
        called = true;
    };
    property.addListener(listener);
    property.removeListener(listener);
    property.set("test");
    expect(called).toBeFalsy();
});
test("close removes listener and change is not called", function () {
    var property = new src_1.SimpleObservableProperty();
    var called = false;
    var closable = property.addListener(function (change) {
        called = true;
    });
    closable.close();
    property.set("test");
    expect(called).toBeFalsy();
});
//# sourceMappingURL=simple-observable-property.test.js.map