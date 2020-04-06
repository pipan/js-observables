import 'ts-jest';

import {Closable, ObservableGroup, SimpleObservableGroup, Modifier, SimpleModifier, ObservableMap, SimpleObservableMap, MapToGroupLink} from '../../../src';

let link: Closable;
let source: ObservableMap<string, any>;
let target: ObservableGroup<string, any>;

beforeEach(() => {
    let initMap: Map<string, any> = new Map();
    initMap.set("001", {id: "001", group: "high"});
    initMap.set("002", {id: "002", group: "low"});
    initMap.set("003", {id: "003", group: "high"});
    source = new SimpleObservableMap(initMap);
    target = new SimpleObservableGroup();
    let groupBy: Modifier<any, string> = new SimpleModifier((item: any) => {
        return item.group;
    });
    link = new MapToGroupLink(source, target, groupBy);
});

test("construct set initial value", () => {
    expect(target.count()).toBe(2);
    expect(target.get("high").count()).toBe(2);
    expect(target.get("low").count()).toBe(1);
});

test("remove latt item in low group", () => {
    source.remove("002");

    expect(target.count()).toBe(1);
    expect(target.get("high").count()).toBe(2);
    expect(target.get("low")).toBeNull();
});

test("add new group item", () => {
    source.add("004", {id: "004", group: "medium"});

    expect(target.count()).toBe(3);
    expect(target.get("medium").count()).toBe(1);
});

test("clear source clears target", () => {
    source.clear();

    expect(target.count()).toBe(0);
});

test("close link does not listen to changes", () => {
    link.close();
    source.remove("002");

    expect(target.get("low")).toBeDefined();
    expect(target.get("low").count()).toBe(1);
});