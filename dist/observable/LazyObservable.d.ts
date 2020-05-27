import { Closable } from "./Closable";
import { Listener } from "./Listener";
import { Channel } from "../channel/Channel";
import { StatefulObservable } from './StatefulObservable';
export declare class LazyObservable<T> implements StatefulObservable<T> {
    protected channel: Channel<T>;
    protected value: T;
    constructor(value?: T);
    addListener(listener: Listener<T>): Closable;
    addListenerFn(fn: (item: T) => void): Closable;
    removeListener(listener: Listener<T>): void;
    dispatch(value?: T): void;
    get(): T;
}
