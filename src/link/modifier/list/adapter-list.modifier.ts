import { ListChange } from "../../../list/list-change";
import { Modifier } from "../../modifier";

export class AdapterListModifier<T, U> implements Modifier<ListChange<T>, ListChange<U>> {
    constructor(
        private fn: (item: T) => U
    ) {}

    public modify(change: ListChange<T>): ListChange<U> {
        let toRemove: U[] = [];
        for (let remove of change.removed()) {
            toRemove.push(
                this.fn(remove)
            );
        }

        let toInsert: U[] = [];
        for (let insert of change.inserted()) {
            toInsert.push(
                this.fn(insert)
            );
        }

        return new ListChange(toInsert, toRemove);
    }
}