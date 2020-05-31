import { Channel } from "../channel/Channel"

export interface StatefulConnectable<T> extends Channel<T> {
    get (): T;
}
