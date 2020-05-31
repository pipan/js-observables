import { Channel } from "./Channel";
import { Closable } from "../observable/Closable";
import { Dispatchable } from "../observable/Dispatchable";
export declare class ProxyChannel<T> implements Channel<T> {
    protected connections: Map<Dispatchable<T>, Closable>;
    connect(dispatcher: Dispatchable<T>): Closable;
    connectFn(fn: (item: T) => void): Closable;
    disconnect(dispatcher: Dispatchable<T>): void;
    dispatch(data: T): void;
}
