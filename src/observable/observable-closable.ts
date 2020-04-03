import { Closable } from "./closable";
import { Observable } from "./observable";

export class ObservableClosable implements Closable {
    constructor(
        private observable: Observable<any>,
        private fn: any
    ) {}

    public close(): void {
        this.observable.removeListener(this.fn);
    }
}