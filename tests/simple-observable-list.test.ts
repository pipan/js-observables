import 'ts-jest';

import {ObservableList, SimpleObservableList, ListChange} from '../src';

// all
test("all returns empty array on construct", () => {
    let list: ObservableList<string> = new SimpleObservableList();

    expect(list.all()).toStrictEqual([]);
});

test("all returns array with values", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    expect(list.all()).toStrictEqual(["test"]);
});

// get
test("get returns item, item exists", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    expect(list.get(0)).toStrictEqual("test");
});

test("get throws exception, item does not exists", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    expect(list.get(1)).toBeNull();
});


// isEmpty
test("isEmpty containing empty array returns true", () => {
    let list: ObservableList<string> = new SimpleObservableList([]);

    expect(list.isEmpty()).toBeTruthy();
});

test("isEmpty containing array with items returns false", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    expect(list.isEmpty()).toBeFalsy();
});

// count
test("count containing empty array returns zero", () => {
    let list: ObservableList<string> = new SimpleObservableList([]);

    expect(list.count()).toBe(0);
});

test("count containing array with items returns one", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    expect(list.count()).toBe(1);
});

// add
test("add new item inserts item to the end", () => {
    let list: ObservableList<string> = new SimpleObservableList();
    list.add("test");

    expect(list.count()).toBe(1);
    expect(list.get(0)).toBe("test");
});

test("add new item fires change event", () => {
    let list: ObservableList<string> = new SimpleObservableList();

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0]).toBe("test");
        called = true;
    })

    list.add("test");
    expect(called).toBeTruthy();
});

test("add existing item does not add item", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);
    list.add("test");

    expect(list.count()).toBe(1);
    expect(list.get(0)).toBe("test");
});

test("add existing instance does not add item", () => {
    let object: any = {name: "test"};
    let list: ObservableList<any> = new SimpleObservableList([object]);
    list.add(object);

    expect(list.count()).toBe(1);
    expect(list.get(0).name).toBe("test");
});

test("add existing item does not fire change event", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    })

    list.add("test");
    expect(called).toBeFalsy();
});

// addAll
test("addAll new items inserts items to the end", () => {
    let list: ObservableList<string> = new SimpleObservableList();
    list.addAll(["test", "2"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("2");
});

test("addAll one new item one existing inserts new item to the end", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);
    list.addAll(["test", "2"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("2");
});

test("addAll new item fires change event", () => {
    let list: ObservableList<string> = new SimpleObservableList();

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(0);
        expect(change.inserted()[0]).toBe("test");
        expect(change.inserted()[1]).toBe("2");
        called = true;
    })

    list.addAll(["test", "2"]);
    expect(called).toBeTruthy();
});

test("addAll existing items does not add items", () => {
    let list: ObservableList<string> = new SimpleObservableList(["2", "test"]);
    list.addAll(["test", "2"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("2");
    expect(list.get(1)).toBe("test");
});

test("addAll existing items does not fire change event", () => {
    let list: ObservableList<string> = new SimpleObservableList(["2", "test"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    })

    list.addAll(["test", "2"]);
    expect(called).toBeFalsy();
});

// setAll
test("setAll two new items inserts two new items", () => {
    let list: ObservableList<string> = new SimpleObservableList();
    list.setAll(["test", "one"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("one");
});

test("setAll two new items fires change with two new items", () => {
    let list: ObservableList<string> = new SimpleObservableList();

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(0);
        called = true;
    });

    list.setAll(["test", "one"]);
    expect(called).toBeTruthy();
});

test("setAll one new item one existing result is ordered by setAll array", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    list.setAll(["test", "one"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("one");
});

test("setAll one new item one existing fires change with one insert one remove", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(1);
        expect(change.removed().length).toBe(1);
        called = true;
    });

    list.setAll(["test", "one"]);
    expect(called).toBeTruthy();
});

test("setAll two new item two different exists result is ordered by setAll array", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    list.setAll(["test", "ing"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("test");
    expect(list.get(1)).toBe("ing");
});

test("setAll two new items fires change with two inserts two removes", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(2);
        expect(change.removed().length).toBe(2);
        called = true;
    });

    list.setAll(["test", "ing"]);
    expect(called).toBeTruthy();
});

test("setAll empty array removes original array", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two"]);

    list.setAll([]);

    expect(list.count()).toBe(0);
});

test("setAll empty array removes original array", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(2);
        called = true;
    });

    list.setAll([]);
    expect(called).toBeTruthy();
});

test("setAll empty array when contains empty array does not fire event", () => {
    let list: ObservableList<string> = new SimpleObservableList([]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    });

    list.setAll([]);
    expect(called).toBeFalsy();
});

test("setAll array with values in different order does not fire event", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "two", "three"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    });

    list.setAll(["two", "three", "one"]);
    expect(called).toBeFalsy();
});

// remove
test("remove existing item containing one item", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);
    list.remove("test");

    expect(list.count()).toBe(0);
});

test("remove existing item containig more items", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test", "more"]);
    list.remove("test");

    expect(list.count()).toBe(1);
    expect(list.get(0)).toBe("more");
});

test("remove item fires change event", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
        called = true;
    })

    list.remove("test");
    expect(called).toBeTruthy();
});

test("remove non existing item", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);
    list.remove("aaaa");

    expect(list.count()).toBe(1);
    expect(list.get(0)).toBe("test");
});

test("remove non existing item does not fire change event", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    })

    list.remove("aaaa");
    expect(called).toBeFalsy();
});

// removeAll
test("removeAll items removes two items", () => {
    let list: ObservableList<string> = new SimpleObservableList(["test", "one"]);

    list.removeAll(["test", "one"]);

    expect(list.count()).toBe(0);
});

test("removeAll items removes two items in different order", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    list.removeAll(["test", "one"]);

    expect(list.count()).toBe(1);
    expect(list.get(0)).toBe("three");
});

test("removeAll items fires remove event with two removed", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(2);
        called = true;
    });

    list.removeAll(["test", "one"]);
    expect(called).toBeTruthy();
});

test("removeAll one item exists one does not exists removes one item", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    list.removeAll(["test", "four"]);

    expect(list.count()).toBe(2);
    expect(list.get(0)).toBe("one");
    expect(list.get(1)).toBe("three");
});

test("removeAll one item exists one does not exists fires change event with one removed", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.inserted().length).toBe(0);
        expect(change.removed().length).toBe(1);
        called = true;
    });

    list.removeAll(["test", "four"]);
    expect(called).toBeTruthy();
});

test("removeAll all items not exists", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    list.removeAll(["bb", "aa"]);

    expect(list.count()).toBe(3);
    expect(list.get(0)).toBe("one");
    expect(list.get(1)).toBe("test");
    expect(list.get(2)).toBe("three");
});

test("removeAll all items not exists", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    });

    expect(called).toBeFalsy();
});

// clear
test("clear containig items empties array", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    list.clear();

    expect(list.count()).toBe(0);
});

test("clear containig items fires change with three removed", () => {
    let list: ObservableList<string> = new SimpleObservableList(["one", "test", "three"]);

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        expect(change.removed().length).toBe(3);
        expect(change.inserted().length).toBe(0);
        called = true;
    });

    list.clear();
    expect(called).toBeTruthy();
});

test("clear not containig items keep empty array", () => {
    let list: ObservableList<string> = new SimpleObservableList();

    list.clear();

    expect(list.count()).toBe(0);
});

test("clear not containig items does not fire change", () => {
    let list: ObservableList<string> = new SimpleObservableList();

    let called: boolean = false;
    list.addListener((change: ListChange<string>) => {
        called = true;
    });

    list.clear();

    expect(called).toBeFalsy();
});