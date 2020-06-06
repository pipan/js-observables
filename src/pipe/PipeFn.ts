import { Pipable } from "./Pipable"

export class PipeFn<T> implements Pipable<T> {
    private fn: (item: T) => T

    public constructor (fn: (item: T) => T) {
        this.fn = fn
    }

    public  execute (item: T): T {
        return this.fn(item)
    }
}
