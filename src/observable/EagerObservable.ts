import { Closable } from "./Closable";
import { Listener } from "./Listener";
import { LazyObservable } from "./LazyObservable";

export class EagerObservable<T> extends LazyObservable<T> {
    addListener(listener: Listener<T>): Closable {
        const closable: Closable = super.addListener(listener)
        listener.action(this.value)
        return closable
    }
}
