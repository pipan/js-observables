import { Observable } from "./observable";
import { Closable } from "./closable";
export declare abstract class SimpleObservable<T> implements Observable<T> {
    private listeners;
    addListener(fn: (item: T) => void): Closable;
    addListenerAndCall(fn: (item: T) => void): Closable;
    removeListener(fn: (item: T) => void): void;
    abstract callListener(listener: (item: T) => void): void;
    protected fire(item: T): void;
}
