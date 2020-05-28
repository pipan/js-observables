import { Listener } from "../observable/Listener"
import { Dispatchable } from "../observable/Dispatchable"

export class ConnectionListener<T> implements Listener<T> {
    private target: Dispatchable<T>

    public constructor (target: Dispatchable<T>) {
        this.target = target
    }

    public action (value?: T): void {
        this.target.dispatch(value)
    }
}
