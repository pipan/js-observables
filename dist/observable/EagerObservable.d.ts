import { Closable } from "./Closable";
import { Listener } from "./Listener";
import { LazyObservable } from "./LazyObservable";
export declare class EagerObservable<T> extends LazyObservable<T> {
    addListener(listener: Listener<T>): Closable;
}
