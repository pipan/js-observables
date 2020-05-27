import { Listener } from "../observable/Listener";
import { Channel } from "../channel/Channel";
export declare class ConnectionListener<T> implements Listener<T> {
    private target;
    constructor(target: Channel<T>);
    action(value?: T): void;
}
