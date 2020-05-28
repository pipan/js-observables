import { Connectable } from "./Connectable"
import { Closable } from "../observable/Closable"
import { ConnectionCloser } from "./ConnectionCloser"
import { Observable } from "../observable/Observable"
import { ConnectionListener } from "./ConnectionListener"
import { Dispatchable } from "../observable/Dispatchable"

export class OneWayConnector<T> implements Connectable<T> {
    private source: Observable<T>
    private connections: Map<Dispatchable<T>, Closable>

    public constructor (source: Observable<T>) {
        this.source = source
        this.connections = new Map()
    }

    public connect (target: Dispatchable<T>): Closable {
        if (this.connections.has(target)) {
            return
        }

        const targetClosable: Closable = this.source.addListener(new ConnectionListener(target))
        this.connections.set(target, targetClosable)
        return new ConnectionCloser(this, target)
    }

    public disconnect (target: Dispatchable<T>): void {
        if (!this.connections.has(target)) {
            return
        }
        this.connections.get(target).close()
        this.connections.delete(target)
    }
}
