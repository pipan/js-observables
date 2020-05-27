import { Closable } from "../observable/Closable"
import { Connector } from "./Connector"
import { Dispatcher } from "../observable/Dispatcher"

export class ConnectionCloser<T> implements Closable {
    private connector: Connector<T>
    private dispatcher: Dispatcher<T>

    public constructor (connector: Connector<T>, dispatcher: Dispatcher<T>) {
        this.connector = connector
        this.dispatcher = dispatcher
    }

    public close (): void {
        this.connector.disconnect(this.dispatcher)
    }
}
