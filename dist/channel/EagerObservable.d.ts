import { Closable } from "../observable/Closable";
import { LazyObservable } from "./LazyObservable";
import { Dispatchable } from "../observable/Dispatchable";
export declare class EagerObservable<T> extends LazyObservable<T> {
    connect(dispatcher: Dispatchable<T>): Closable;
}
