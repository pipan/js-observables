import { SimpleObservable } from "../observable/simple-observable";
import { PropertyChange } from "./property-change";
import { ObservableProperty } from "./observable-property";

export class SimpleObservableProperty<T> extends SimpleObservable<PropertyChange<T>> implements ObservableProperty<T> {
    protected value: T;

    constructor(value: T = null) {
        super();
        this.value = value;
    }

    callListener(listener: (item: PropertyChange<T>) => void): void {
        listener(new PropertyChange(null, this.value));
    }

    get(): T {
        return this.value;
    }

    set(value: T): void {
        if (value === this.value) {
            return;
        }
        let prev: T = this.value;
        this.value = value;
        this.fire(new PropertyChange(prev, this.value));
    }

    isEmpty(): boolean {
        return this.value === null || this.value === undefined;
    }
}