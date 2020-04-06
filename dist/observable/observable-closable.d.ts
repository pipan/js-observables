import { Closable } from "./closable";
import { Observable } from "./observable";
export declare class ObservableClosable implements Closable {
    private observable;
    private fn;
    constructor(observable: Observable<any>, fn: any);
    close(): void;
}
