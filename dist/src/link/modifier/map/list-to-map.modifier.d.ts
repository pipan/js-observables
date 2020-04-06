import { ListChange } from "../../../list/list-change";
import { MapChange } from "../../../map/map-change";
import { Modifier } from "../../modifier";
export declare class ListToMapModifier<T, U> implements Modifier<ListChange<T>, MapChange<U, T>> {
    private fn;
    constructor(fn: (item: T) => U);
    modify(item: ListChange<T>): MapChange<U, T>;
}
