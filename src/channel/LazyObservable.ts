import { Closable } from "../observable/Closable"
import { Channel } from "./Channel"
import { StatefulChannel } from './StatefulChannel'
import { ProxyChannel } from "./ProxyChannel"
import { Dispatchable } from "../observable/Dispatchable"
import { DsipatcherFn } from "../observable/DispatcherFn"

export class LazyObservable<T> implements StatefulChannel<T> {
    protected channel: Channel<T>
    protected value: T

    public constructor (value?: T) {
        this.channel = new ProxyChannel()
        this.value = value
    }

    public connect (dispatcher: Dispatchable<T>): Closable {
        return this.channel.connect(dispatcher)
    }

    public connectFn (dispatcher: (value: T) => void): Closable {
        return this.connect(new DsipatcherFn(dispatcher))
    }

    public disconnect (dispatcher: Dispatchable<T>): void {
        this.channel.disconnect(dispatcher)
    }
 
    public dispatch (value?: T): void {
        if (value === this.value) {
            return
        }
        this.value = value
        this.channel.dispatch(value)
    }

    public get (): T {
        return this.value
    }
}
