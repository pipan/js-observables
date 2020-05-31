import { Channel } from "./Channel"
import { Closable } from "../observable/Closable"
import { DsipatcherFn } from "../observable/DispatcherFn"
import { Dispatchable } from "../observable/Dispatchable"
import { ConnectionCloser } from "../observable/ConnectionCloser"

export class ProxyChannel<T> implements Channel<T> {
    protected connections: Map<Dispatchable<T>, Closable> = new Map()

    public connect (dispatcher: Dispatchable<T>): Closable {
        if (this.connections.has(dispatcher)) {
            return
        }
        const closable = new ConnectionCloser(this, dispatcher)
        this.connections.set(dispatcher, closable)
        return closable
    }

    public connectFn (fn: (item: T) => void): Closable {
        return this.connect(new DsipatcherFn(fn))
    }

    public disconnect (dispatcher: Dispatchable<T>): void {
        if (!this.connections.has(dispatcher)) {
            return
        }
        this.connections.delete(dispatcher)
    }

    public dispatch (data: T): void {
        this.connections.forEach((closable: Closable, dispatcher: Dispatchable<T>) => {
            dispatcher.dispatch(data)
        })
    }
}
