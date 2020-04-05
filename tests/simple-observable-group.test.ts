import 'ts-jest';
import { ObservableGroup, SimpleObservableGroup, MapEntry, MapChange, ObservableList } from '../src';

let group: ObservableGroup<string, string>;

beforeEach(() => {
    group = new SimpleObservableGroup([new MapEntry('1', "test"), new MapEntry("2", "two"), new MapEntry('1', "sub-test")]);
});

test("constructor empty contains zero items", () => {
    let group: ObservableGroup<string, string> = new SimpleObservableGroup();

    expect(group.count()).toBe(0);
});

test("get returns null if not set", () => {
    let group: ObservableGroup<string, string> = new SimpleObservableGroup();

    expect(group.get("testKey")).toBeNull();
});

test("construcor with items sets items", () => {
    expect(group.count()).toBe(2);
});

test("get returns list if set", () => {
    expect(group.get("1")).toBeDefined();
    expect(group.get("1").count()).toBe(2);
    expect(group.get("1").get(0)).toBe("test");
});

// add

test("add to existing key adds to the end of list", () => {
    group.add("1", "value");

    expect(group.get("1").count()).toBe(3);
    expect(group.get("1").get(2)).toBe("value");
});

test("add to existing key does not fire event", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
    });

    group.add("1", "value");

    expect(called).toBeFalsy();
});

test("add to non existing key adds to new list", () => {
    group.add("3", "value");

    expect(group.get("3").count()).toBe(1);
    expect(group.get("3").get(0)).toBe("value");
});

test("add to non existing key fires event", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.inserted()[0].getKey()).toBe("3");
    });

    group.add("3", "value");
    expect(called).toBeTruthy();
});

test("add to existing key existing item does not add item", () => {
    group.add("1", "test");

    expect(group.get("1").count()).toBe(2);
});

// addAll

test("addAll one existing key and one new key", () => {
    group.addAll([new MapEntry("1", "value"), new MapEntry("3", "three")]);

    expect(group.get("1").count()).toBe(3);
    expect(group.get("1").get(2)).toBe("value");

    expect(group.get("3").count()).toBe(1);
    expect(group.get("3").get(0)).toBe("three");
});

// setAll

test("setAll one existing key one new key", () => {
    group.setAll([new MapEntry("1", "value"), new MapEntry("3", "three")]);

    expect(group.get("1").count()).toBe(1);
    expect(group.get("1").get(0)).toBe("value");

    expect(group.get("3").count()).toBe(1);
    expect(group.get("3").get(0)).toBe("three");
});

test("setAll one existing key one new key fires event one remove one insert", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.inserted()[0].getKey()).toBe("3");
        expect(change.inserted()[0].getValue().count()).toBe(1);
        expect(change.inserted()[0].getValue().get(0)).toBe("three");

        expect(change.removed().length).toBe(1);
        expect(change.removed()[0].getKey()).toBe("2");
        expect(change.removed()[0].getValue().count()).toBe(1);
        expect(change.removed()[0].getValue().get(0)).toBe("two");
    });

    group.setAll([new MapEntry("1", "value"), new MapEntry("3", "three")]);

    expect(called).toBeTruthy();
});