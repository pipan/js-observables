import { Closable } from "../observable/Closable"
import { Connectable } from "./Connectable"
import { Dispatchable } from "../observable/Dispatchable"

export class ConnectionCloser<T> implements Closable {
    private connector: Connectable<T>
    private Dispatchable: Dispatchable<T>

    public constructor (connector: Connectable<T>, Dispatchable: Dispatchable<T>) {
        this.connector = connector
        this.Dispatchable = Dispatchable
    }

    public close (): void {
        this.connector.disconnect(this.Dispatchable)
    }
}
