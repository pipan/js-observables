import { Observable } from "./Observable";
import { Dispatcher } from "./Dispatcher";
import { Listener } from "./Listener";
import { Closable } from "./Closable";
export declare class Channel<T> implements Observable<T>, Dispatcher<T> {
    protected listeners: Array<Listener<T>>;
    addListener(listener: Listener<T>): Closable;
    addListenerFn(fn: (item: T) => void): Closable;
    removeListener(listener: Listener<T>): void;
    dispatch(data: T): void;
}
