import { Connectable } from "./Connectable";
import { Closable } from "../observable/Closable";
import { Observable } from "../observable/Observable";
import { Channel } from "../channel/Channel";
export declare class OneWayConnector<T> implements Connectable<T> {
    private source;
    private connections;
    constructor(source: Observable<T>);
    connect(target: Channel<T>): Closable;
    disconnect(target: Channel<T>): void;
}
