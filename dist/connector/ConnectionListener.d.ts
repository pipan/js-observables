import { Listener } from "../observable/Listener";
import { Dispatchable } from "../observable/Dispatchable";
export declare class ConnectionListener<T> implements Listener<T> {
    private target;
    constructor(target: Dispatchable<T>);
    action(value?: T): void;
}
