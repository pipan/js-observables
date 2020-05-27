import { Connector } from "./Connector"
import { Closable } from "../observable/Closable"
import { ConnectionCloser } from "./ConnectionCloser"
import { Observable } from "../observable/Observable"
import { ConnectionListener } from "./ConnectionListener"
import { Dispatcher } from "../observable/Dispatcher"

export class OneWayConnector<T> implements Connector<T> {
    private source: Observable<T>
    private connections: Map<Dispatcher<T>, Closable>

    public constructor (source: Observable<T>) {
        this.source = source
        this.connections = new Map()
    }

    public connect (target: Dispatcher<T>): Closable {
        if (this.connections.has(target)) {
            return
        }

        const targetClosable: Closable = this.source.addListener(new ConnectionListener(target))
        this.connections.set(target, targetClosable)
        return new ConnectionCloser(this, target)
    }

    public disconnect (target: Dispatcher<T>): void {
        if (!this.connections.has(target)) {
            return
        }
        this.connections.get(target).close()
        this.connections.delete(target)
    }
}
