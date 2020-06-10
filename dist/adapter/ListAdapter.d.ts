import { Adaptable } from "./Adaptable";
export declare class ListAdapter<T, U> implements Adaptable<Array<T>, Array<U>> {
    private itemAdapter;
    constructor(itemAdapter: Adaptable<T, U>);
    adapt(items: Array<T>): Array<U>;
}
