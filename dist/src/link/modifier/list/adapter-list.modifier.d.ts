import { ListChange } from "../../../list/list-change";
import { Modifier } from "../../modifier";
export declare class AdapterListModifier<T, U> implements Modifier<ListChange<T>, ListChange<U>> {
    private fn;
    constructor(fn: (item: T) => U);
    modify(change: ListChange<T>): ListChange<U>;
}
