import { Closable } from "../observable/Closable";
import { Dispatcher } from "../observable/Dispatcher";
export interface Connector<T> {
    connect(channel: Dispatcher<T>): Closable;
    disconnect(channel: Dispatcher<T>): void;
}
