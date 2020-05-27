import { Closable } from "./Closable"
import { Listener } from "./Listener"
import { Channel } from "../channel/Channel"
import { ListenerFn } from "./ListenerFn"
import { StatefulObservable } from './StatefulObservable'
import { ProxyChannel } from "../channel/ProxyChannel"

export class LazyObservable<T> implements StatefulObservable<T> {
    protected channel: Channel<T>
    protected value: T

    public constructor (value?: T) {
        this.channel = new ProxyChannel()
        this.value = value
    }

    addListener(listener: Listener<T>): Closable {
        return this.channel.addListener(listener)
    }

    addListenerFn(fn: (item: T) => void): Closable {
        return this.addListener(new ListenerFn(fn))
    }

    removeListener(listener: Listener<T>): void {
        this.channel.removeListener(listener)
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
