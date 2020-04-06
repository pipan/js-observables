import { ObservableGroup } from "./observable-group";
import { ObservableList } from "../list/observable-list";
import { SimpleObservable } from "../observable/simple-observable";
import { MapChange } from "../map/map-change";
import { MapEntry } from "../map/map-entry";
export declare class SimpleObservableGroup<T, U> extends SimpleObservable<MapChange<T, ObservableList<U>>> implements ObservableGroup<T, U> {
    private mapValue;
    constructor(list?: MapEntry<T, U>[]);
    callListener(fn: (change: MapChange<T, ObservableList<U>>) => void): void;
    private create;
    get(key: T): ObservableList<U>;
    add(key: T, item: U): void;
    addAll(items: MapEntry<T, U>[]): void;
    setAll(items: MapEntry<T, U>[]): void;
    remove(key: T, item: U): void;
    removeAll(items: MapEntry<T, U>[]): void;
    removeKey(key: T): void;
    containes(key: T, value: U): boolean;
    containesKey(key: T): boolean;
    getValues(): IterableIterator<ObservableList<U>>;
    getKeys(): IterableIterator<T>;
    count(): number;
    countKey(key: T): number;
    isEmpty(): boolean;
    clear(): void;
    getEntries(): IterableIterator<[T, ObservableList<U>]>;
    forEach(callback: any): void;
}
