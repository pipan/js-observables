import { Observable } from "./Observable";

export interface ValueObservable<T> extends Observable<T> {
    set (value?: T): void;
    get (): T;
}
