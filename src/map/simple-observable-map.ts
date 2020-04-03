import { ObservableMap } from "./observable-map";
import { SimpleObservable } from "../observable/simple-observable";
import { MapChange } from "./map-change";
import { MapEntry } from "./map-entry";

export class SimpleObservableMap<T, U> extends SimpleObservable<MapChange<T, U>> implements ObservableMap<T, U> {
    private mapValue: Map<T, U>;

    constructor(map: Map<T, U> = null) {
        super();
        if (map === null) {
            map = new Map();
        }
        this.mapValue = map;
    }

    public callListener(fn: (item: MapChange<T, U>) => void): void {
        let inserted: MapEntry<T, U>[] = [];
        this.mapValue.forEach((value: U, key: T) => {
            inserted.push(new MapEntry(key, value));
        });
        fn(new MapChange(inserted, []));
    }

    public add(key: T, value: U): void {
        let map: Map<T, U> = new Map();
        map.set(key, value);
        this.addAll(map);
    }

    public addAll(map: Map<T, U>): void {
        let inserted: MapEntry<T, U>[] = [];
        map.forEach((value: U, key: T) => {
            if (this.mapValue.has(key) && this.mapValue.get(key) === value) {
                return;
            }
            this.mapValue.set(key, value);
            inserted.push(new MapEntry(key, value));
        });
        
        if (inserted.length === 0) {
            return;
        }
        this.fire(new MapChange(inserted, []));
    }

    public addList(items: MapEntry<T, U>[]): void {
        let map: Map<T, U> = new Map();
        for (let item of items) {
            map.set(item.getKey(), item.getValue());
        }
        this.addAll(map);
    }

    public setAll(map: Map<T, U>): void {
        let removed: MapEntry<T, U>[] = [];
        this.mapValue.forEach((value: U, key: T) => {
            if (map.has(key)) {
                return;
            }
            removed.push(new MapEntry(key, value));
        });

        let inserted: MapEntry<T, U>[] = [];
        map.forEach((value: U, key: T) => {
            if (this.mapValue.has(key) && this.mapValue.get(key) === value) {
                return;
            }
            inserted.push(new MapEntry(key, value));
        });

        if (removed.length === 0 && inserted.length === 0) {
            return;
        }

        this.mapValue = map;
        this.fire(new MapChange(inserted, removed));
    }

    public setList(items: MapEntry<T, U>[]): void {
        let map: Map<T, U> = new Map();
        for (let item of items) {
            map.set(item.getKey(), item.getValue());
        }
        this.setAll(map);
    }

    public remove(key: T): void {
        this.removeAll([key]);
    }

    public removeAll(keys: T[]): void {
        let removed: MapEntry<T, U>[] = [];
        for (let key of keys) {
            if (!this.mapValue.has(key)) {
                continue;
            }
            removed.push(new MapEntry(key, this.mapValue.get(key)));
            this.mapValue.delete(key);
        }
        
        if (removed.length === 0) {
            return;
        }
        this.fire(new MapChange([], removed));
    }

    public get(key: T): U {
        if (!this.containes(key)) {
            return null;
        }
        return this.mapValue.get(key);
    }

    public containes(key: T): boolean {
        return this.mapValue.has(key);
    }

    public getValues(): IterableIterator<U> {
        return this.mapValue.values();
    }

    public getKeys(): IterableIterator<T> {
        return this.mapValue.keys();
    }

    public count(): number {
        return this.mapValue.size;
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    public clear(): void {
        if (this.count() === 0) {
            return;
        }
        let removed: MapEntry<T, U>[] = [];
        this.mapValue.forEach((value: U, key: T) => {
            removed.push(new MapEntry(key, value));
        });
        this.mapValue.clear();
        this.fire(new MapChange([], removed));
    }

    public getEntries(): IterableIterator<[T, U]> {
        return this.mapValue.entries();
    }

    public forEach(callback: any): void {
        this.mapValue.forEach(callback);
    }
}