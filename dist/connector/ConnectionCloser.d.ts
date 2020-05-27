import { Closable } from "../observable/Closable";
import { Connectable } from "./Connectable";
import { ValueObservable } from "../observable/ValueObservable";
export declare class ConnectionCloser<T> implements Closable {
    private connectable;
    private observable;
    constructor(connectable: Connectable<T>, observable: ValueObservable<T>);
    close(): void;
}
