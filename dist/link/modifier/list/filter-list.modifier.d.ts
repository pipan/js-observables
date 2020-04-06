import { ListChange } from "../../../list/list-change";
import { Modifier } from "../../modifier";
export declare class FilterListModifier<T> implements Modifier<ListChange<T>, ListChange<T>> {
    private fn;
    constructor(fn: (item: T) => boolean);
    modify(change: ListChange<T>): ListChange<T>;
}
