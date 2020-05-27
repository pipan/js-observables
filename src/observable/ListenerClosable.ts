import { Closable } from "./Closable";
import { Observable } from "./Observable";
import { Listener } from "./Listener";

export class ListenerClosable<T> implements Closable {
    constructor(
        private observable: Observable<T>,
        private listener: Listener<T>
    ) {}

    public close(): void {
        this.observable.removeListener(this.listener);
    }
}