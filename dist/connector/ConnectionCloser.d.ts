import { Closable } from "../observable/Closable";
import { Connectable } from "./Connectable";
import { Channel } from "../channel/Channel";
export declare class ConnectionCloser<T> implements Closable {
    private connectable;
    private channel;
    constructor(connectable: Connectable<T>, channel: Channel<T>);
    close(): void;
}
