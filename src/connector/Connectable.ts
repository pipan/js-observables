import { Observable } from "../observable/Observable";
import { Closable } from "../observable/Closable";
import { Dispatchable } from "../observable/Dispatchable";

export interface Connectable<T> {
    connect (channel: Dispatchable<T>): Closable;
    disconnect (channel: Dispatchable<T>): void;
}