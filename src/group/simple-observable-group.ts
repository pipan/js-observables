import { ObservableGroup } from "./observable-group";
import { ObservableList } from "../list/observable-list";
import { SimpleObservable } from "../observable/simple-observable";
import { MapChange } from "../map/map-change";
import { MapEntry } from "../map/map-entry";
import { SimpleObservableList } from "../list/simple-observable-list";

export class SimpleObservableGroup<T, U> extends SimpleObservable<MapChange<T, ObservableList<U>>> implements ObservableGroup<T, U> {
    private mapValue: Map<T, ObservableList<U>>;

    public constructor(
        list: MapEntry<T, U>[] = []
    ) {
        super();
        this.mapValue = new Map();
        this.addAll(list);
    }

    callListener(fn: (change: MapChange<T, ObservableList<U>>) => void): void {
        let toInsert: MapEntry<T, ObservableList<U>>[] = [];
        this.mapValue.forEach((value: ObservableList<U>, key: T) => {
            toInsert.push(
                new MapEntry(key, value)
            );
        });
        fn(new MapChange(toInsert, []));
    }

    private create(key: T): ObservableList<U> {
        let list: ObservableList<U> = new SimpleObservableList();
        this.mapValue.set(key, list);
        return list;
    }

    public get(key: T): ObservableList<U> {
        if (!this.containesKey(key)) {
            return null;
        }
        return this.mapValue.get(key);
    }

    public add(key: T, item: U): void {
        this.addAll([new MapEntry(key, item)]);
    }

    public addAll(items: MapEntry<T, U>[]): void {
        let inserted: MapEntry<T, ObservableList<U>>[] = [];
        for (let item of items) {
            let list: ObservableList<U> = this.get(item.getKey());
            if (list === null) {
                list = this.create(item.getKey());
                inserted.push(new MapEntry(item.getKey(), list));
            }
            list.add(item.getValue());
        }

        if (inserted.length === 0) {
            return;
        }
        this.fire(new MapChange(inserted, []));
    }

    public setAll(items: MapEntry<T, U>[]): void {
        let map: Map<T, U[]> = new Map();
        for (let item of items) {
            if (!map.has(item.getKey())) {
                map.set(item.getKey(), []);
            }
            map.get(item.getKey()).push(item.getValue());
        }

        let removed: MapEntry<T, ObservableList<U>>[] = [];
        this.mapValue.forEach((value: ObservableList<U>, key: T) => {
            if (map.has(key)) {
                return;
            }
            removed.push(new MapEntry(key, value));
            this.mapValue.delete(key);
        });

        let inserted: MapEntry<T, ObservableList<U>>[] = [];
        map.forEach((value: U[], key: T) => {
            let list: ObservableList<U> = this.get(key);
            if (list === null) {
                list = this.create(key);
                inserted.push(new MapEntry(key, list));
            }
            list.setAll(value);
        })

        if (removed.length === 0 && inserted.length === 0) {
            return;
        }
        this.fire(new MapChange(inserted, removed));
    }

    public remove(key: T, item: U): void {
        this.removeAll([new MapEntry(key, item)]);
    }

    public removeAll(items: MapEntry<T, U>[]): void {}

    public removeKey(key: T): void {}

    public containes(key: T, value: U): boolean {
        return true;
        // return this.mapValue.has(key);
    }

    public containesKey(key: T): boolean {
        return this.mapValue.has(key);
    }

    public getValues(): IterableIterator<ObservableList<U>> {
        return this.mapValue.values();
    }

    public getKeys(): IterableIterator<T> {
        return this.mapValue.keys();
    }

    public count(): number {
        return this.mapValue.size;
    }

    public countKey(key: T): number {
        return 0;
    }

    public isEmpty(): boolean {
        return true;
    }

    public isEmptyKey(key: T): boolean {
        return true;
    }

    public clear(): void {

    }

    public clearKey(key: T): void {

    }

    public getEntries(): IterableIterator<[T, ObservableList<U>]> {
        return this.mapValue.entries();
    }

    public forEach(callback: any): void {
        this.mapValue.forEach(callback);
    }
}