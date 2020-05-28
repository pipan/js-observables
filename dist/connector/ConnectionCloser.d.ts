import { Closable } from "../observable/Closable";
import { Connectable } from "./Connectable";
import { Dispatchable } from "../observable/Dispatchable";
export declare class ConnectionCloser<T> implements Closable {
    private connector;
    private Dispatchable;
    constructor(connector: Connectable<T>, Dispatchable: Dispatchable<T>);
    close(): void;
}
