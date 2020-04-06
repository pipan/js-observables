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

test("setAll same value and keys", () => {
    group.setAll([new MapEntry('1', "test"), new MapEntry('1', "sub-test"), new MapEntry("2", "two")]);

    expect(group.get("1").count()).toBe(2);
    expect(group.get("2").count()).toBe(1);
});

test("setAll same value and keys does not fire event", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
    });

    group.setAll([new MapEntry('1', "test"), new MapEntry('1', "sub-test"), new MapEntry("2", "two")]);

    expect(called).toBeFalsy();
});

// remove

test("remove from key with multiple values", () => {
    group.remove("1", "test");

    expect(group.get("1").count()).toBe(1);
    expect(group.get("1").get(0)).toBe("sub-test");
});

test("remove from key with multiple values does not fire event", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
    });
    group.remove("1", "test");

    expect(called).toBeFalsy();
});

test("remove last in key", () => {
    group.remove("2", "two");

    expect(group.get("2")).toBeNull();
});

test("remove last in key fires event", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
        expect(change.removed()[0].getKey()).toBe("2");
    });
    group.remove("2", "two");

    expect(called).toBeTruthy();
});

test("remove not existing key", () => {
    group.remove("4", "aaa");

    expect(group.count()).toBe(2);
});

test("remove existing key not existing value", () => {
    group.remove("2", "aaa");

    expect(group.count()).toBe(2);
});

// removeAll

test("removeAll multiple keys", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
    });
    group.removeAll([new MapEntry("1", "test"), new MapEntry("2", "two")]);

    expect(group.count()).toBe(1);
    expect(group.get("1").get(0)).toBe("sub-test");
    expect(called).toBeTruthy();
});

// removeKey

test("removeKey clears list", () => {
    let list: ObservableList<string> = group.get("1");
    group.removeKey("1");

    expect(list.count()).toBe(0);
});

test("removeKey removes key", () => {
    group.removeKey("1");

    expect(group.count()).toBe(1);
    expect(group.get("1")).toBeNull();
});

test("removeKey fires remove event", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
        expect(change.removed()[0].getKey()).toBe("1");
    })
    group.removeKey("1");

    expect(called).toBeTruthy();
});

// clear

test("clear removes all keys", () => {
    group.clear();

    expect(group.count()).toBe(0);
});

test("clear fires event with all removed", () => {
    let called: boolean = false;
    group.addListener((change: MapChange<string, ObservableList<string>>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(2);
    })
    group.clear();

    expect(called).toBeTruthy();
});

test("clear clears all lists", () => {
    let list1: ObservableList<string> = group.get("1");
    let list2: ObservableList<string> = group.get("2");
    group.clear();

    expect(list1.count()).toBe(0);
    expect(list2.count()).toBe(0);
});