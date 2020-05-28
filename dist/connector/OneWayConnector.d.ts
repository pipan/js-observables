import { Connectable } from "./Connectable";
import { Closable } from "../observable/Closable";
import { Observable } from "../observable/Observable";
import { Dispatchable } from "../observable/Dispatchable";
export declare class OneWayConnector<T> implements Connectable<T> {
    private source;
    private connections;
    constructor(source: Observable<T>);
    connect(target: Dispatchable<T>): Closable;
    disconnect(target: Dispatchable<T>): void;
}
