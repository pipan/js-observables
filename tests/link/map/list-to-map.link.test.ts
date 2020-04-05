import 'ts-jest';
import { ObservableMap, SimpleObservableList, SimpleObservableMap, Closable, ListToMapLink, ObservableList, AdapterListModifier, ListToMapModifier } from '../../../src';

test("linkListToMap existing in source are transfered to target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    let target: ObservableMap<string, string> = new SimpleObservableMap();
    let link: Closable = new ListToMapLink(
        source,
        target,
        new ListToMapModifier((item: string) => {return item.charAt(0);})
    );

    expect(target.count()).toBe(2);
    expect(target.get("o")).toBe("one");
    expect(target.get("t")).toBe("two");
});

test("linkListToMap insert to source inserts to target", () => {
    let source: ObservableList<string> = new SimpleObservableList();
    let target: ObservableMap<string, string> = new SimpleObservableMap();
    let link: Closable = new ListToMapLink(
        source,
        target,
        new ListToMapModifier((item: string) => {return item.charAt(0);})
    );

    source.add("test");

    expect(target.count()).toBe(1);
    expect(target.get("t")).toBe("test");
});

test("linkListToMap clear source clears target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    let target: ObservableMap<string, string> = new SimpleObservableMap();
    let link: Closable = new ListToMapLink(
        source,
        target,
        new ListToMapModifier((item: string) => {return item.charAt(0);})
    );

    source.clear();

    expect(target.count()).toBe(0);
});

test("linkListToMap remove from source removes from target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    let target: ObservableMap<string, string> = new SimpleObservableMap();
    let link: Closable = new ListToMapLink(
        source,
        target,
        new ListToMapModifier((item: string) => {return item.charAt(0);})
    );

    source.remove("one");

    expect(target.count()).toBe(1);
    expect(target.get("t")).toBe("two");
});

test("close linkListToMap stop change from source", () => {
    let source: ObservableList<string> = new SimpleObservableList();
    let target: ObservableMap<string, string> = new SimpleObservableMap();
    let link: Closable = new ListToMapLink(
        source,
        target,
        new ListToMapModifier((item: string) => {return item.charAt(0);})
    );

    link.close();
    source.add("one");

    expect(target.count()).toBe(0);
});