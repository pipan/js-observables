import { Closable } from "./Closable"
import { Connectable } from "./Connectable"
import { Dispatchable } from "./Dispatchable"

export class ConnectionCloser<T> implements Closable {
    private connector: Connectable<T>
    private dispatchable: Dispatchable<T>

    public constructor (connector: Connectable<T>, Dispatchable: Dispatchable<T>) {
        this.connector = connector
        this.dispatchable = Dispatchable
    }

    public close (): void {
        this.connector.disconnect(this.dispatchable)
    }
}
