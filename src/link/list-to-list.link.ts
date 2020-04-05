import { Closable } from "../observable/closable";
import { ObservableList } from "../list/observable-list";
import { ListChange } from "../list/list-change";
import { Modifier } from "./modifier";

export class ListToListLink implements Closable {
    private closable: Closable;

    public constructor(
        source: ObservableList<any>,
        private target: ObservableList<any>,
        private modifiers: Modifier<ListChange<any>, ListChange<any>>[]
    ) {
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }

    private update(change: ListChange<any>): void {
        for (let modifier of this.modifiers) {
            change = modifier.modify(change);
        }

        this.target.removeAll(change.removed());
        this.target.addAll(change.inserted());
    }

    public close(): void {
        this.closable.close();
    }
}