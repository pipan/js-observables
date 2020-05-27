import { Closable } from "./Closable";
import { Listener } from "./Listener";
import { ValueObservable } from "./ValueObservable";
import { Channel } from "./Channel";
export declare class LazyObservable<T> implements ValueObservable<T> {
    protected channel: Channel<T>;
    protected value: T;
    constructor(value?: T);
    addListener(listener: Listener<T>): Closable;
    addListenerFn(fn: (item: T) => void): Closable;
    removeListener(listener: Listener<T>): void;
    set(value?: T): void;
    get(): T;
}
