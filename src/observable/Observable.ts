import { Closable } from "./Closable"
import { Listener } from "./Listener"

export interface Observable<T> {
    addListener(listener: Listener<T>): Closable;
    addListenerFn(fn: (value: T) => void): Closable;
    removeListener(listener: Listener<T>): void;
}
