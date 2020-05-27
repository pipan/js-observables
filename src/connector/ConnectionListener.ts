import { Listener } from "../observable/Listener"
import { Channel } from "../channel/Channel"

export class ConnectionListener<T> implements Listener<T> {
    private target: Channel<T>

    public constructor (target: Channel<T>) {
        this.target = target
    }

    public action (value?: T): void {
        this.target.dispatch(value)
    }
}
