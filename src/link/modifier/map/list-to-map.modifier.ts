import { ListChange } from "../../../list/list-change";
import { MapChange } from "../../../map/map-change";
import { Modifier } from "../../modifier";
import { MapEntry } from "../../../map/map-entry";

export class ListToMapModifier<T, U> implements Modifier<ListChange<T>, MapChange<U, T>> {
    constructor(
        private fn: (item: T) => U
    ) {}

    modify(item: ListChange<T>): MapChange<U, T> {
        let toRemove: MapEntry<U, T>[] = [];
        for (let remove of item.removed()) {
            toRemove.push(new MapEntry(
                this.fn(remove),
                remove
            ));
        }

        let toInsert: MapEntry<U, T>[] = [];
        for (let insert of item.inserted()) {
            toInsert.push(new MapEntry(
                this.fn(insert),
                insert
            ));
        }

        return new MapChange(toInsert, toRemove);
    }
}