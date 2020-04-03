import { ObservableList } from "./observable-list";
import { SimpleObservable } from "../observable/simple-observable";
import { ListChange } from "./list-change";

export class SimpleObservableList<T> extends SimpleObservable<ListChange<T>> implements ObservableList<T> {
    private listValue: T[] = [];

    constructor(items: T[] = []) {
        super();
        this.listValue = items;
    }

    callListener(listener: (item: ListChange<T>) => void): void {
        listener(new ListChange(this.listValue, []));
    }

    public add(item: T): void {
        this.addAll([item]);
    }

    public addAll(items: T[]): void {
        let inserted: T[] = [];
        for (let item of items) {
            if (this.listValue.indexOf(item) > -1) {
                continue;
            }
            this.listValue.push(item);
            inserted.push(item);
        }
        if (inserted.length === 0) {
            return
        }
        this.fire(new ListChange(inserted, []));
    }

    public setAll(items: T[]): void {
        let removed: T[] = [];
        for (let value of this.listValue) {
            if (items.indexOf(value) > -1) {
                continue;
            }
            removed.push(value);
        }

        let inserted: T[] = [];
        for (let value of items) {
            if (this.listValue.indexOf(value) > -1) {
                continue;
            }
            inserted.push(value);
        }

        if (removed.length === 0 && inserted.length === 0) {
            return;
        }

        this.listValue = items;
        this.fire(new ListChange(inserted, removed));
    }

    public remove(item: T): void {
        this.removeAll([item]);
    }

    public removeAll(items: T[]): void {
        let removed: T[] = [];
        for (let item of items) {
            let index: number = this.listValue.indexOf(item);
            if (index === -1) {
                continue;
            }
            this.listValue.splice(index, 1);
        }
        
        if (removed.length === 0) {
            return;
        }
        this.fire(new ListChange([], removed));
    }

    public get(index: number): T {
        if (this.count() <= index) {
            return null;
        }
        return this.listValue[index];
    }

    public all(): T[] {
        return this.listValue;
    }

    public count(): number {
        return this.all().length;
    }

    public isEmpty(): boolean {
        return this.count() === 0;
    }

    public clear(): void {
        if (this.isEmpty()) {
            return;
        }
        let removed: T[] = this.listValue;
        this.listValue = [];
        this.fire(new ListChange([], removed));
    }
}