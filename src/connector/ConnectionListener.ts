import { Listener } from "../observable/Listener"
import { Dispatcher } from "../observable/Dispatcher"

export class ConnectionListener<T> implements Listener<T> {
    private target: Dispatcher<T>

    public constructor (target: Dispatcher<T>) {
        this.target = target
    }

    public action (value?: T): void {
        this.target.dispatch(value)
    }
}
