import 'ts-jest';
import { FilterListModifier, ListChange, ObservableList, Modifier, ListToListLink, SimpleObservableList } from '../../../src';

test("filterStartsWithA inserts to target only if source starts with a", () => {
    let source: ObservableList<string> = new SimpleObservableList(["atest", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let filter: Modifier<ListChange<string>, ListChange<string>> = new FilterListModifier((item: string) => {
        return item.startsWith("a");
    });
    let link: ListToListLink = new ListToListLink(source, target, [filter]);

    source.addAll(["abcd", "efgh"]);

    expect(target.count()).toBe(2);
    expect(target.get(0)).toBe("atest");
    expect(target.get(1)).toBe("abcd");
});

test("filterStartsWithA remove from source, removes only that starts with a", () => {
    let source: ObservableList<string> = new SimpleObservableList(["atest", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let filter: Modifier<ListChange<string>, ListChange<string>> = new FilterListModifier((item: string) => {
        return item.startsWith("a");
    });
    let link: ListToListLink = new ListToListLink(source, target, [filter]);

    source.removeAll(["atest", "two"]);

    expect(target.count()).toBe(0);
});

test("filterStartsWithA remove from source that does not start with a, does not remove anything from target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["atest", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let filter: Modifier<ListChange<string>, ListChange<string>> = new FilterListModifier((item: string) => {
        return item.startsWith("a");
    });
    let link: ListToListLink = new ListToListLink(source, target, [filter]);

    source.removeAll(["two"]);

    expect(target.count()).toBe(1);
    expect(target.get(0)).toBe("atest");
});

test("filterStartsWithA clear source, clears target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["atest", "two"]);
    let target: ObservableList<string> = new SimpleObservableList();
    let filter: Modifier<ListChange<string>, ListChange<string>> = new FilterListModifier((item: string) => {
        return item.startsWith("a");
    });
    let link: ListToListLink = new ListToListLink(source, target, [filter]);

    source.clear();

    expect(target.count()).toBe(0);
});