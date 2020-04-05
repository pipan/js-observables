import 'ts-jest';
import { ObservableMap, SimpleObservableMap, MapChange, MapEntry } from '../src';

// construct

test("construct no argument creates empty map", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    expect(map.count()).toBe(0);
});

test("construct with map argument creates with existing map", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("one", "value-1");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    expect(map.count()).toBe(1);
});

// get

test("get contains key returns value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("one", "value-1");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    expect(map.get("one")).toBe("value-1");
});

test("get does not contains key returns null", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("one", "value-1");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    expect(map.get("three")).toBeNull();
});

// add

test("add not existing key set new value", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    map.add("test", "value");

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("add not existing key fires event", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("value");
        called = true;
    });

    map.add("test", "value");
    expect(called).toBeTruthy();
});

test("add existing key new value set new value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.add("test", "value");

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("add existing key new value fires event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("value");
    });

    map.add("test", "value");
    expect(called).toBeTruthy();
});

test("add existing key and value nothing changes", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.add("test", "value");

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("add existing key and value does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    map.add("test", "value");

    expect(called).toBeFalsy();
});

// addAll

test("addAll to empty map set new values", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    addMap.set("duo", "abcd");
    map.addAll(addMap);

    expect(map.count()).toBe(2);
    expect(map.get("test")).toBe("testValue");
    expect(map.get("duo")).toBe("abcd");
});

test("addAll to empty map fires event", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
        expect(change.inserted()[1].getKey()).toBe("duo");
        expect(change.inserted()[1].getValue()).toBe("abcd");
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    addMap.set("duo", "abcd");
    map.addAll(addMap);
    expect(called).toBeTruthy();
});

test("addAll existing key new value set new value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    map.addAll(addMap);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("testValue");
});

test("addAll existing key new value fires event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    map.addAll(addMap);
    expect(called).toBeTruthy();
});

test("addAll existing key and value nothing changes", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "value");
    map.addAll(addMap);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("addAll existing key and value does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "value");
    map.addAll(addMap);

    expect(called).toBeFalsy();
});

// addList

test("addList to empty map set new values", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let addList: MapEntry<string, string>[] = [];
    addList.push(new MapEntry("test", "testValue"));
    addList.push(new MapEntry("duo", "abcd"));
    map.addList(addList);

    expect(map.count()).toBe(2);
    expect(map.get("test")).toBe("testValue");
    expect(map.get("duo")).toBe("abcd");
});

test("addList to empty map fires event", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
        expect(change.inserted()[1].getKey()).toBe("duo");
        expect(change.inserted()[1].getValue()).toBe("abcd");
    });

    let addList: MapEntry<string, string>[] = [];
    addList.push(new MapEntry("test", "testValue"));
    addList.push(new MapEntry("duo", "abcd"));
    map.addList(addList);
    expect(called).toBeTruthy();
});

test("addList existing key new value set new value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addList: MapEntry<string, string>[] = [];
    addList.push(new MapEntry("test", "testValue"));
    map.addList(addList);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("testValue");
});

test("addList existing key new value fires event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
    });

    let addList: MapEntry<string, string>[] = [];
    addList.push(new MapEntry("test", "testValue"));
    map.addList(addList);
    expect(called).toBeTruthy();
});

test("addList existing key and value nothing changes", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addList: MapEntry<string, string>[] = [];
    addList.push(new MapEntry("test", "value"));
    map.addList(addList);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("addList existing key and value does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    let addList: MapEntry<string, string>[] = [];
    addList.push(new MapEntry("test", "value"));
    map.addList(addList);

    expect(called).toBeFalsy();
});

// setAll

test("setAll to empty map set new values", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    addMap.set("duo", "abcd");
    map.setAll(addMap);

    expect(map.count()).toBe(2);
    expect(map.get("test")).toBe("testValue");
    expect(map.get("duo")).toBe("abcd");
});

test("setAll to empty map fires event", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
        expect(change.inserted()[1].getKey()).toBe("duo");
        expect(change.inserted()[1].getValue()).toBe("abcd");
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    addMap.set("duo", "abcd");
    map.setAll(addMap);
    expect(called).toBeTruthy();
});

test("setAll existing key new value set new value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    map.setAll(addMap);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("testValue");
});

test("setAll existing key new value fires event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "testValue");
    map.setAll(addMap);
    expect(called).toBeTruthy();
});

test("setAll existing key and value nothing changes", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "value");
    map.setAll(addMap);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("setAll existing key and value does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("test", "value");
    map.setAll(addMap);

    expect(called).toBeFalsy();
});

test("setAll no common key removes that are not present in new map", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let addMap: Map<string, string> = new Map();
    addMap.set("other", "testValue");
    map.setAll(addMap);

    expect(map.count()).toBe(1);
    expect(map.get("other")).toBe("testValue");
});

test("setAll no common key fires event with removed and inserted", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(1);
        expect(change.inserted()[0].getKey()).toBe("other");
        expect(change.inserted()[0].getValue()).toBe("testValue");
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("a");
    });

    let addMap: Map<string, string> = new Map();
    addMap.set("other", "testValue");
    map.setAll(addMap);
    expect(called).toBeTruthy();
});

// setList

test("setList to empty map set new values", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("test", "testValue"));
    list.push(new MapEntry("duo", "abcd"));
    map.setList(list);

    expect(map.count()).toBe(2);
    expect(map.get("test")).toBe("testValue");
    expect(map.get("duo")).toBe("abcd");
});

test("setList to empty map fires event", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
        expect(change.inserted()[1].getKey()).toBe("duo");
        expect(change.inserted()[1].getValue()).toBe("abcd");
    });

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("test", "testValue"));
    list.push(new MapEntry("duo", "abcd"));
    map.setList(list);
    expect(called).toBeTruthy();
});

test("setList existing key new value set new value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("test", "testValue"));
    map.setList(list);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("testValue");
});

test("setList existing key new value fires event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0].getKey()).toBe("test");
        expect(change.inserted()[0].getValue()).toBe("testValue");
    });

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("test", "testValue"));
    map.setList(list);
    expect(called).toBeTruthy();
});

test("setList existing key and value nothing changes", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("test", "value"));
    map.setList(list);

    expect(map.count()).toBe(1);
    expect(map.get("test")).toBe("value");
});

test("setList existing key and value does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("test", "value"));
    map.setList(list);

    expect(called).toBeFalsy();
});

test("setList no common key removes that are not present in new map", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("other", "testValue"));
    map.setList(list);

    expect(map.count()).toBe(1);
    expect(map.get("other")).toBe("testValue");
});

test("setList no common key fires event with removed and inserted", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(1);
        expect(change.inserted()[0].getKey()).toBe("other");
        expect(change.inserted()[0].getValue()).toBe("testValue");
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("a");
    });

    let list: MapEntry<string, string>[] = [];
    list.push(new MapEntry("other", "testValue"));
    map.setList(list);
    expect(called).toBeTruthy();
});

// remove

test("remove key exists remove value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.remove("test");

    expect(map.count()).toBe(0);
});

test("remove key exists fires event with removed", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("value");
    })

    map.remove("test");
    expect(called).toBeTruthy();
});

test("remove key non existing does nothing", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.remove("other");

    expect(map.count()).toBe(1);
});

test("remove key non existing does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    map.remove("other");

    expect(called).toBeFalsy();
});

// removeAll

test("removeAll key exists remove value", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    initMap.set("two", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.removeAll(["test", "two"]);

    expect(map.count()).toBe(0);
});

test("remove key exists fires event with removed", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    initMap.set("two", "a");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(2);
        expect(change.removed()[0].getKey()).toBe("test");
        expect(change.removed()[0].getValue()).toBe("value");
        expect(change.removed()[1].getKey()).toBe("two");
        expect(change.removed()[1].getValue()).toBe("a");
    })

    map.removeAll(["test", "two"]);
    expect(called).toBeTruthy();
});

test("removeAll key non existing does nothing", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.removeAll(["other"]);

    expect(map.count()).toBe(1);
});

test("removeAll key non existing does not fire event", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    map.removeAll(["other"]);

    expect(called).toBeFalsy();
});

// isEmpty

test("isEmpty returns true after empty construct", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    expect(map.isEmpty()).toBeTruthy();
});

test("isEmpty returns false after construct with items", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    expect(map.isEmpty()).toBeFalsy();
});

test("isEmpty returns false after adding items", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();
    map.add("test", "value");

    expect(map.isEmpty()).toBeFalsy();
});

test("isEmpty returns true after remove all eleents", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.remove("test");

    expect(map.isEmpty()).toBeTruthy();
});

// count

test("count is zero after empty construct", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    expect(map.count()).toBe(0);
});

test("count is one after construct with items", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    expect(map.count()).toBe(1);
});

test("count increase by one after adding new item", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);
    map.add("other", "a");

    expect(map.count()).toBe(2);
});

test("count decrease by one after removing an item", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);
    map.remove("test");

    expect(map.count()).toBe(0);
});

test("count stays the same after adding item with existing key", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);
    map.add("test", "a");

    expect(map.count()).toBe(1);
});

// clear

test("clear containig items empties map", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    map.clear();

    expect(map.count()).toBe(0);
});

test("clear containig items fires change with three removed", () => {
    let initMap: Map<string, string> = new Map();
    initMap.set("test", "value");
    let map: ObservableMap<string, string> = new SimpleObservableMap(initMap);

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
        expect(change.removed().length).toBe(1);
        expect(change.inserted().length).toBe(0);
    });

    map.clear();
    expect(called).toBeTruthy();
});

test("clear not containig items keep empty array", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    map.clear();

    expect(map.count()).toBe(0);
});

test("clear not containig items does not fire change", () => {
    let map: ObservableMap<string, string> = new SimpleObservableMap();

    let called: boolean = false;
    map.addListener((change: MapChange<string, string>) => {
        called = true;
    });

    map.clear();

    expect(called).toBeFalsy();
});