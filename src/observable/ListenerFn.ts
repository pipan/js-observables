import { Listener } from "./Listener"

export class ListenerFn<T> implements Listener<T> {
    private fn: (item: T) => void

    public constructor (fn: (item: T) => void) {
        this.fn = fn
    }

    public action (item: T): void {
        this.fn(item)
    }
}
