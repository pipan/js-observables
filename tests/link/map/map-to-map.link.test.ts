import 'ts-jest';
import { ObservableMap, SimpleObservableMap, Closable, MapToMapLink } from '../../../src';

let source: ObservableMap<string, string>;
let target: ObservableMap<string, string>;
let link: Closable;

beforeEach(() => {
    let initMap: Map<string, any> = new Map();
    initMap.set("001", "one");
    initMap.set("002", "two");
    source = new SimpleObservableMap(initMap);
    target = new SimpleObservableMap();
    link = new MapToMapLink(
        source,
        target
    );
});

test("linkMaps existing in source are transfered to target", () => {
    expect(target.count()).toBe(2);
    expect(target.get("001")).toBe("one");
    expect(target.get("002")).toBe("two");
});

test("linkMaps insert to source inserts to target", () => {
    source.add("003", "test");

    expect(target.count()).toBe(3);
    expect(target.get("001")).toBe("one");
    expect(target.get("002")).toBe("two");
    expect(target.get("003")).toBe("test");
});

test("linkMaps insert to source existing key changes value in target", () => {
    source.add("002", "test");

    expect(target.count()).toBe(2);
    expect(target.get("001")).toBe("one");
    expect(target.get("002")).toBe("test");
});

test("linkMaps clear source clears target", () => {
    source.clear();

    expect(target.count()).toBe(0);
});

test("linkMaps remove from source removes from target", () => {
    source.remove("001");

    expect(target.count()).toBe(1);
    expect(target.get("002")).toBe("two");
});

test("close linkMap stop change from source", () => {
    link.close();
    source.add("003", "test");

    expect(target.count()).toBe(2);
});