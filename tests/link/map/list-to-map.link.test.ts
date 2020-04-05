import 'ts-jest';
import { ObservableMap, SimpleObservableList, SimpleObservableMap, Closable, ListToMapLink, ObservableList, ListToMapModifier } from '../../../src';

let source: ObservableList<string>;
let target: ObservableMap<string, string>;
let link: Closable;

beforeEach(() => {
    source = new SimpleObservableList(["one", "two"]);
    target = new SimpleObservableMap();
    link = new ListToMapLink(
        source,
        target,
        new ListToMapModifier((item: string) => {return item.charAt(0);})
    );
})

test("linkListToMap existing in source are transfered to target", () => {
    expect(target.count()).toBe(2);
    expect(target.get("o")).toBe("one");
    expect(target.get("t")).toBe("two");
});

test("linkListToMap insert to source inserts to target", () => {
    source.add("hest");

    expect(target.count()).toBe(3);
    expect(target.get("o")).toBe("one");
    expect(target.get("t")).toBe("two");
    expect(target.get("h")).toBe("hest");
});

test("linkListToMap clear source clears target", () => {
    source.clear();

    expect(target.count()).toBe(0);
});

test("linkListToMap remove from source removes from target", () => {
    source.remove("one");

    expect(target.count()).toBe(1);
    expect(target.get("t")).toBe("two");
});

test("close linkListToMap stop change from source", () => {
    link.close();
    source.add("hest");

    expect(target.count()).toBe(2);
});