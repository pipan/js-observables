import { ObservableList } from "./observable-list";
import { SimpleObservable } from "../observable/simple-observable";
import { ListChange } from "./list-change";
export declare class SimpleObservableList<T> extends SimpleObservable<ListChange<T>> implements ObservableList<T> {
    private listValue;
    constructor(items?: T[]);
    callListener(listener: (item: ListChange<T>) => void): void;
    add(item: T): void;
    addAll(items: T[]): void;
    setAll(items: T[]): void;
    remove(item: T): void;
    removeAll(items: T[]): void;
    get(index: number): T;
    all(): T[];
    count(): number;
    isEmpty(): boolean;
    contains(item: T): boolean;
    clear(): void;
}
