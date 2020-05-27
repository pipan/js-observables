import { Closable } from "./Closable";
import { Observable } from "./Observable";
import { Listener } from "./Listener";
export declare class ListenerClosable<T> implements Closable {
    private observable;
    private listener;
    constructor(observable: Observable<T>, listener: Listener<T>);
    close(): void;
}
