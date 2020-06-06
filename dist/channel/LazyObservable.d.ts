import { Closable } from "../observable/Closable";
import { Channel } from "./Channel";
import { StatefulChannel } from './StatefulChannel';
import { Dispatchable } from "../observable/Dispatchable";
export declare class LazyObservable<T> implements StatefulChannel<T> {
    protected channel: Channel<T>;
    protected value: T;
    constructor(value?: T);
    connect(dispatcher: Dispatchable<T>): Closable;
    connectFn(dispatcher: (value: T) => void): Closable;
    disconnect(dispatcher: Dispatchable<T>): void;
    dispatch(value?: T): void;
    get(): T;
}
