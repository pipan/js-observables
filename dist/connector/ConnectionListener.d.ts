import { Listener } from "../observable/Listener";
import { ValueObservable } from "../observable/ValueObservable";
export declare class ConnectionListener<T> implements Listener<T> {
    private target;
    constructor(target: ValueObservable<T>);
    action(value?: T): void;
}
