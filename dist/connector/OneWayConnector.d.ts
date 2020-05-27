import { Connector } from "./Connector";
import { Closable } from "../observable/Closable";
import { Observable } from "../observable/Observable";
import { Dispatcher } from "../observable/Dispatcher";
export declare class OneWayConnector<T> implements Connector<T> {
    private source;
    private connections;
    constructor(source: Observable<T>);
    connect(target: Dispatcher<T>): Closable;
    disconnect(target: Dispatcher<T>): void;
}
