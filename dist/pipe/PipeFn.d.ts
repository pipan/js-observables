import { Pipable } from "./Pipable";
export declare class PipeFn<T> implements Pipable<T> {
    private fn;
    constructor(fn: (item: T) => T);
    execute(item: T): T;
}
