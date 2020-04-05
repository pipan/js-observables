import { Observable } from "../observable/observable";
import { MapChange } from "./map-change";
import { MapEntry } from "./map-entry";

export interface ObservableMap<T, U> extends Observable<MapChange<T, U>> {
    add(key: T, value: U): void;
    addAll(map: Map<T, U>): void;
    addList(list: MapEntry<T, U>[]): void;
    setAll(map: Map<T, U>): void;
    setList(list: MapEntry<T, U>[]): void;
    remove(key: T): void;
    removeAll(keys: T[]): void;
    removeList(list: MapEntry<T, U>[]): void;
    get(key: T): U;
    containes(key: T): boolean;
    getValues(): IterableIterator<U>;
    getKeys(): IterableIterator<T>;
    count(): number;
    isEmpty(): boolean;
    clear(): void;
    getEntries(): IterableIterator<[T, U]>;
    forEach(callback: any): void;
}