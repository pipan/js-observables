import { Modifier } from "../modifier";
export declare class SimpleModifier<T, U> implements Modifier<T, U> {
    private fn;
    constructor(fn: (item: T) => U);
    modify(item: T): U;
}
