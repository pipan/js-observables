import { Closable } from "./Closable";
import { Listener } from "./Listener";
import { ValueObservable } from "./ValueObservable";
import { Channel } from "./Channel";
import { ListenerFn } from "./ListenerFn";

export class LazyObservable<T> implements ValueObservable<T> {
    protected channel: Channel<T>
    protected value: T

    public constructor (value?: T) {
        this.channel = new Channel()
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

    public set (value?: T): void {
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
