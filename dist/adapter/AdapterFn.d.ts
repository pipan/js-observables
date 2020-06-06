import { Adaptable } from "./Adaptable";
export declare class AdapterFn<T, U> implements Adaptable<T, U> {
    private fn;
    constructor(fn: (value: T) => U);
    adapt(value: T): U;
}
