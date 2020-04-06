import { SimpleObservable } from "../observable/simple-observable";
import { PropertyChange } from "./property-change";
import { ObservableProperty } from "./observable-property";
export declare class SimpleObservableProperty<T> extends SimpleObservable<PropertyChange<T>> implements ObservableProperty<T> {
    protected value: T;
    constructor(value?: T);
    callListener(listener: (item: PropertyChange<T>) => void): void;
    get(): T;
    set(value: T): void;
    isEmpty(): boolean;
}
