import { Observable } from "../observable/observable";
import { PropertyChange } from "./property-change";

export interface ObservableProperty<T> extends Observable<PropertyChange<T>> {
    get(): T;
    set(value: T): void;
    isEmpty(): boolean;
}