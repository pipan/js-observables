import { Observable } from "../observable/observable";
import { ListChange } from "./list-change";

export interface ObservableList<T> extends Observable<ListChange<T>> {
    add(item: T): void;
    addAll(items: T[]): void;
    setAll(items: T[]): void;
    remove(item: T): void;
    removeAll(items: T[]): void;
    get(index: number): T;
    all(): T[];
    count(): number;
    isEmpty(): boolean;
    contains(iten: T): boolean;
    clear(): void;
}