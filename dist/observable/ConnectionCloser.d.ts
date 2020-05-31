import { Closable } from "./Closable";
import { Connectable } from "./Connectable";
import { Dispatchable } from "./Dispatchable";
export declare class ConnectionCloser<T> implements Closable {
    private connector;
    private dispatchable;
    constructor(connector: Connectable<T>, Dispatchable: Dispatchable<T>);
    close(): void;
}
