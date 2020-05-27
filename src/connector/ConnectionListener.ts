import { Listener } from "../observable/Listener"
import { ValueObservable } from "../observable/ValueObservable"

export class ConnectionListener<T> implements Listener<T> {
    private target: ValueObservable<T>

    public constructor (target: ValueObservable<T>) {
        this.target = target
    }

    public action (value?: T): void {
        this.target.set(value)
    }
}
