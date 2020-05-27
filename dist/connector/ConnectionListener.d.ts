import { Listener } from "../observable/Listener";
import { Dispatcher } from "../observable/Dispatcher";
export declare class ConnectionListener<T> implements Listener<T> {
    private target;
    constructor(target: Dispatcher<T>);
    action(value?: T): void;
}
