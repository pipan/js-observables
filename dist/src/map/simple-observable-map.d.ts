import { ObservableMap } from "./observable-map";
import { SimpleObservable } from "../observable/simple-observable";
import { MapChange } from "./map-change";
import { MapEntry } from "./map-entry";
export declare class SimpleObservableMap<T, U> extends SimpleObservable<MapChange<T, U>> implements ObservableMap<T, U> {
    private mapValue;
    constructor(map?: Map<T, U>);
    callListener(fn: (item: MapChange<T, U>) => void): void;
    add(key: T, value: U): void;
    addAll(map: Map<T, U>): void;
    addList(items: MapEntry<T, U>[]): void;
    setAll(map: Map<T, U>): void;
    setList(items: MapEntry<T, U>[]): void;
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
