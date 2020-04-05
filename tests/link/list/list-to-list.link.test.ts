import 'ts-jest';
import { ListToListLink, ObservableList, SimpleObservableList } from '../../../src';

test("linkLists existing in source are transfered to target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let link: ListToListLink = new ListToListLink(source, target, []);

    expect(target.count()).toBe(2);
    expect(target.get(0)).toBe("one");
    expect(target.get(1)).toBe("two");
});

test("linkLists insert to source inserts to target", () => {
    let source: ObservableList<string> = new SimpleObservableList();
    let target: ObservableList<string> = new SimpleObservableList();
    let link: ListToListLink = new ListToListLink(source, target, []);

    source.add("test");

    expect(target.count()).toBe(1);
    expect(target.get(0)).toBe("test");
});

test("linkLists clear source clears target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let link: ListToListLink = new ListToListLink(source, target, []);

    source.clear()

    expect(target.count()).toBe(0);
});

test("linkLists remove from source removes from target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["one", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let link: ListToListLink = new ListToListLink(source, target, []);

    source.remove("one")

    expect(target.count()).toBe(1);
    expect(target.get(0)).toBe("two");
});

test("close linkList stop change from source", () => {
    let source: ObservableList<string> = new SimpleObservableList();
    let target: ObservableList<string> = new SimpleObservableList();
    let link: ListToListLink = new ListToListLink(source, target, []);

    link.close();
    source.add("test");

    expect(target.count()).toBe(0);
});