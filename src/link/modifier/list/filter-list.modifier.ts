import { ListChange } from "../../../list/list-change";
import { Modifier } from "../../modifier";

export class FilterListModifier<T> implements Modifier<ListChange<T>, ListChange<T>> {
    public constructor(
        private fn: (item: T) => boolean
    ) {}

    public modify(change: ListChange<T>): ListChange<T> {
        let toRemove: T[] = [];
        let toInsert: T[] = [];

        for (let remove of change.removed()) {
            if (!this.fn(remove)) {
                continue;
            }
            toRemove.push(remove);
        }

        for (let insert of change.inserted()) {
            if (!this.fn(insert)) {
                continue;
            }
            toRemove.push(insert);
        }

        return new ListChange(toInsert, toRemove);
    }
}