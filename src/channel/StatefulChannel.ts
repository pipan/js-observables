import { Channel } from "./Channel"

export interface StatefulChannel<T> extends Channel<T> {
    get (): T;
}
