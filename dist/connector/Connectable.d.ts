import { Closable } from "../observable/Closable";
import { ValueObservable } from "../observable/ValueObservable";
export interface Connectable<T> {
    connect(observable: ValueObservable<T>): Closable;
    disconnect(observable: ValueObservable<T>): void;
}
