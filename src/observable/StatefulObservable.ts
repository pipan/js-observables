import { Channel } from "../channel/Channel"

export interface StatefulObservable<T> extends Channel<T> {
    get (): T;
}
