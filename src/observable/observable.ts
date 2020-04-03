import { Closable } from "./closable";

export interface Observable<T> {
    addListener(fn: (value: T) => void): Closable;
    addListenerAndCall(fn: (value: T) => void): Closable;
    removeListener(fn: (value: T) => void): void;
}