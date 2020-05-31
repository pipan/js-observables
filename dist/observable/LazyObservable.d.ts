import { Closable } from "./Closable";
import { Channel } from "../channel/Channel";
import { StatefulConnectable } from './StatefulConnectable';
import { Dispatchable } from "./Dispatchable";
export declare class LazyObservable<T> implements StatefulConnectable<T> {
    protected channel: Channel<T>;
    protected value: T;
    constructor(value?: T);
    connect(dispatcher: Dispatchable<T>): Closable;
    connectFn(dispatcher: (value: T) => void): Closable;
    disconnect(dispatcher: Dispatchable<T>): void;
    dispatch(value?: T): void;
    get(): T;
}
