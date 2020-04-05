import 'ts-jest';
import { ListChange, ObservableList, Modifier, ListToListLink, SimpleObservableList, AdapterListModifier } from '../../../src';

test("adapt change source string to target object", () => {
    let source: ObservableList<string> = new SimpleObservableList(["atest", "two"]);
    let target: ObservableList<any> = new SimpleObservableList();
    let adapter: Modifier<ListChange<string>, ListChange<any>> = new AdapterListModifier((item: string) => {
        for (let targetValue of target.all()) {
            if (targetValue.name == item) {
                return targetValue;
            }
        }
        return {
            name: item
        };
    });
    let link: ListToListLink = new ListToListLink(source, target, [adapter]);

    source.add("Peter");

    expect(target.count()).toBe(3);
    expect(target.get(0)).toStrictEqual({name: "atest"});
    expect(target.get(1)).toStrictEqual({name: "two"});
    expect(target.get(2)).toStrictEqual({name: "Peter"});
});

test("adapt remove from source string removes object from target", () => {
    let source: ObservableList<string> = new SimpleObservableList(["atest", "two"]);
    let target: ObservableList<any> = new SimpleObservableList();
    let adapter: Modifier<ListChange<string>, ListChange<any>> = new AdapterListModifier((item: string) => {
        for (let targetValue of target.all()) {
            if (targetValue.name == item) {
                return targetValue;
            }
        }
        return {
            name: item
        };
    });
    let link: ListToListLink = new ListToListLink(source, target, [adapter]);

    source.remove("atest");

    expect(target.count()).toBe(1);
    expect(target.get(0)).toStrictEqual({name: "two"});
});