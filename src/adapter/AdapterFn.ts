import { Adaptable } from "./Adaptable"

export class AdapterFn<T, U> implements Adaptable<T, U> {
    private fn: (value: T) => U

    public constructor (fn: (value: T) => U) {
        this.fn = fn
    }

    public adapt (value: T): U {
        return this.fn(value)
    }
}
