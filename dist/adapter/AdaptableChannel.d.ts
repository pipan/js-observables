import { Adaptable } from "./Adaptable";
import { Connectable } from "../observable/Connectable";
import { Dispatchable } from "../observable/Dispatchable";
import { Closable } from "../observable/Closable";
export declare class AdaptableChannel<T, U> implements Connectable<U>, Dispatchable<T> {
    private channel;
    private adapter;
    constructor(adapter: Adaptable<T, U>);
    connect(dispatcher: Dispatchable<U>): Closable;
    connectFn(fn: (item: U) => void): Closable;
    disconnect(dispatcher: Dispatchable<U>): void;
    dispatch(item: T): void;
}
