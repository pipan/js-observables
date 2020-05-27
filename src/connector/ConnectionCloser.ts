import { Closable } from "../observable/Closable"
import { Connectable } from "./Connectable"
import { Channel } from "../channel/Channel"

export class ConnectionCloser<T> implements Closable {
    private connectable: Connectable<T>
    private channel: Channel<T>

    public constructor (connectable: Connectable<T>, channel: Channel<T>) {
        this.connectable = connectable
        this.channel = channel
    }

    public close (): void {
        this.connectable.disconnect(this.channel)
    }
}
