import { Channel } from "./Channel"
import { Listener } from "../observable/Listener"
import { Closable } from "../observable/Closable"
import { ListenerClosable } from "../observable/ListenerClosable"
import { ListenerFn } from "../observable/ListenerFn"

export class ProxyChannel<T> implements Channel<T> {
    protected listeners: Array<Listener<T>> = []

    public addListener (listener: Listener<T>): Closable {
        this.listeners.push(listener)
        return new ListenerClosable(this, listener)
    }

    public addListenerFn (fn: (item: T) => void): Closable {
        return this.addListener(new ListenerFn(fn))
    }

    public removeListener (listener: Listener<T>): void {
        const index: number = this.listeners.indexOf(listener)
        if (index < 0) {
            return
        }
        this.listeners.splice(index, 1)
    }

    public dispatch (data: T): void {
        for (const listener of this.listeners) {
            listener.action(data)
        }
    }
}
