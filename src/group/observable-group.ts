import { Observable } from "../observable/observable";
import { MapChange } from "../map/map-change";
import { ObservableList } from "../list/observable-list";
import { MapEntry } from "../map/map-entry";

export interface ObservableGroup<T, U> extends Observable<MapChange<T, ObservableList<U>>> {
    add(key: T, item: U): void;
    addAll(items: MapEntry<T, U>[]): void;
    setAll(items: MapEntry<T, U>[]): void;
    remove(key: T, item: U): void;
    removeAll(items: MapEntry<T, U>[]): void;
    removeKey(key: T): void;
    get(key: T): ObservableList<U>;
    containes(key: T, value: U): boolean;
    containesKey(key: T): boolean;
    getValues(): IterableIterator<ObservableList<U>>;
    getKeys(): IterableIterator<T>;
    count(): number;
    countKey(key: T): number;
    isEmpty(): boolean;
    isEmptyKey(key: T): boolean;
    clear(): void;
    clearKey(key: T): void;
    getEntries(): IterableIterator<[T, ObservableList<U>]>;
    forEach(callback: any): void;
}