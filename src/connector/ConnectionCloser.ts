import { Closable } from "../observable/Closable"
import { Connectable } from "./Connectable"
import { ValueObservable } from "../observable/ValueObservable"

export class ConnectionCloser<T> implements Closable {
    private connectable: Connectable<T>
    private observable: ValueObservable<T>

    public constructor (connectable: Connectable<T>, observable: ValueObservable<T>) {
        this.connectable = connectable
        this.observable = observable
    }

    public close (): void {
        this.connectable.disconnect(this.observable)
    }
}
