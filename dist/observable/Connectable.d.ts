import { Closable } from "./Closable";
import { Dispatchable } from "./Dispatchable";
export interface Connectable<T> {
    connect(dispatchable: Dispatchable<T>): Closable;
    connectFn(fn: (value: T) => void): Closable;
    disconnect(dispatchable: Dispatchable<T>): void;
}
