import 'ts-jest';

import {Closable, ObservableList, ObservableGroup, SimpleObservableList, SimpleObservableGroup, ListToGroupLink, Modifier, SimpleModifier} from '../../../src';

let link: Closable;
let source: ObservableList<any>;
let target: ObservableGroup<string, any>;

beforeEach(() => {
    source = new SimpleObservableList([
        {id: "001", group: "high"},
        {id: "002", group: "low"},
        {id: "002", group: "high"}
    ]);
    target = new SimpleObservableGroup();
    let groupBy: Modifier<any, string> = new SimpleModifier((item: any) => {
        return item.group;
    });
    link = new ListToGroupLink(source, target, groupBy);
});

test("construct set initial value", () => {
    expect(target.count()).toBe(2);
    expect(target.get("high").count()).toBe(2);
    expect(target.get("low").count()).toBe(1);
});

test("remove latt item in low group", () => {
    source.remove(source.get(1));

    expect(target.count()).toBe(1);
    expect(target.get("high").count()).toBe(2);
    expect(target.get("low")).toBeNull();
});

test("add new group item", () => {
    source.add({id: "004", group: "medium"});

    expect(target.count()).toBe(3);
    expect(target.get("medium").count()).toBe(1);
});

test("clear source clears target", () => {
    source.clear();

    expect(target.count()).toBe(0);
});

test("close link does not listen to changes", () => {
    link.close();
    source.remove(source.get(1));

    expect(target.get("low")).toBeDefined();
    expect(target.get("low").count()).toBe(1);
});