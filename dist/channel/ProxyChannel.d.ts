import { Channel } from "./Channel";
import { Listener } from "../observable/Listener";
import { Closable } from "../observable/Closable";
export declare class ProxyChannel<T> implements Channel<T> {
    protected listeners: Array<Listener<T>>;
    addListener(listener: Listener<T>): Closable;
    addListenerFn(fn: (item: T) => void): Closable;
    removeListener(listener: Listener<T>): void;
    dispatch(data: T): void;
}
