import 'ts-jest';
import { ListToListLink, ObservableList, SimpleObservableList, Closable } from '../../../src';

let source: ObservableList<string>;
let target: ObservableList<string>;
let link: Closable;

beforeEach(() => {
    source = new SimpleObservableList(["one", "two"]);
    target = new SimpleObservableList();
    link = new ListToListLink(source, target, []);
})

test("linkLists existing in source are transfered to target", () => {
    expect(target.count()).toBe(2);
    expect(target.get(0)).toBe("one");
    expect(target.get(1)).toBe("two");
});

test("linkLists insert to source inserts to target", () => {
    source.add("test");

    expect(target.count()).toBe(3);
    expect(target.get(2)).toBe("test");
});

test("linkLists clear source clears target", () => {
    source.clear()

    expect(target.count()).toBe(0);
});

test("linkLists remove from source removes from target", () => {
    source.remove("one")

    expect(target.count()).toBe(1);
    expect(target.get(0)).toBe("two");
});

test("close linkList stop change from source", () => {
    link.close();
    source.add("test");

    expect(target.count()).toBe(2);
});