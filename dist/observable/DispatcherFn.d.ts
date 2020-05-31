import { Dispatchable } from "./Dispatchable";
export declare class DsipatcherFn<T> implements Dispatchable<T> {
    private fn;
    constructor(fn: (item: T) => void);
    dispatch(item: T): void;
}
