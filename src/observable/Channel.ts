import { Observable } from "./Observable"
import { Dispatcher } from "./Dispatcher"
import { Listener } from "./Listener"
import { Closable } from "./Closable"
import { ListenerClosable } from "./ListenerClosable"
import { ListenerFn } from "./ListenerFn"

export class Channel<T> implements Observable<T>, Dispatcher<T> {
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
