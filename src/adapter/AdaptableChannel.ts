import { Adaptable } from "./Adaptable"
import { Connectable } from "../observable/Connectable"
import { Channel } from "../channel/Channel"
import { ProxyChannel } from "../channel/ProxyChannel"
import { Dispatchable } from "../observable/Dispatchable"
import { Closable } from "../observable/Closable"

export class AdaptableChannel<T, U> implements Connectable<U>, Dispatchable<T> {
    private channel: Channel<U>
    private adapter: Adaptable<T, U>

    public constructor (adapter: Adaptable<T, U>) {
        this.channel = new ProxyChannel()
        this.adapter = adapter
    }

    public connect (dispatcher: Dispatchable<U>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (fn: (item: U) => void): Closable {
        return this.channel.connectFn(fn)
    }

    public disconnect (dispatcher: Dispatchable<U>): void {
        this.channel.disconnect(dispatcher)
    }

    public dispatch (item: T): void {
        this.channel.dispatch(
            this.adapter.adapt(item)
        )
    }
}
