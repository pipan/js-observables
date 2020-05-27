import { Listener } from "./Listener";
export declare class ListenerFn<T> implements Listener<T> {
    private fn;
    constructor(fn: (item: T) => void);
    action(item: T): void;
}
