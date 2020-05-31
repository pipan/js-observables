import { Closable } from "./Closable";
import { LazyObservable } from "./LazyObservable";
import { Dispatchable } from "./Dispatchable";
export declare class EagerObservable<T> extends LazyObservable<T> {
    connect(dispatcher: Dispatchable<T>): Closable;
}
