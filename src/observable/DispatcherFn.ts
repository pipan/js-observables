import { Dispatchable } from "./Dispatchable"

export class DsipatcherFn<T> implements Dispatchable<T> {
    private fn: (item: T) => void

    public constructor (fn: (item: T) => void) {
        this.fn = fn
    }

    public dispatch (item: T): void {
        this.fn(item)
    }
}
