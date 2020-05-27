import { Connectable } from "./Connectable";
import { Closable } from "../observable/Closable";
import { Observable } from "../observable/Observable";
import { ValueObservable } from "../observable/ValueObservable";
export declare class OneWayConnector<T> implements Connectable<T> {
    private source;
    private connections;
    constructor(source: Observable<T>);
    connect(target: ValueObservable<T>): Closable;
    disconnect(target: ValueObservable<T>): void;
}
