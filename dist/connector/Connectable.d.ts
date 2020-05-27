import { Closable } from "../observable/Closable";
import { Channel } from "../channel/Channel";
export interface Connectable<T> {
    connect(channel: Channel<T>): Closable;
    disconnect(channel: Channel<T>): void;
}
