import { Closable } from "../observable/Closable"
import { LazyObservable } from "./LazyObservable"
import { Dispatchable } from "../observable/Dispatchable"

export class EagerObservable<T> extends LazyObservable<T> {
    public connect (dispatcher: Dispatchable<T>): Closable {
        const closable: Closable = super.connect(dispatcher)
        dispatcher.dispatch(this.value)
        return closable
    }
}
