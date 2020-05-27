import { Closable } from "../observable/Closable";
import { Connector } from "./Connector";
import { Dispatcher } from "../observable/Dispatcher";
export declare class ConnectionCloser<T> implements Closable {
    private connector;
    private dispatcher;
    constructor(connector: Connector<T>, dispatcher: Dispatcher<T>);
    close(): void;
}
