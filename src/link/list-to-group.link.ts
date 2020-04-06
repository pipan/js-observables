import { Closable } from "../observable/closable";
import { ObservableList } from "../list/observable-list";
import { ObservableGroup } from "../group/observable-group";
import { ListChange } from "../list/list-change";
import { Modifier } from "./modifier";

export class ListToGroupLink implements Closable {
    private closable: Closable;

    public constructor(
        source: ObservableList<any>,
        private target: ObservableGroup<any, any>,
        private groupBy: Modifier<any, any>
    ) {
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }

    private update(change: ListChange<any>): void {
        for (let removed of change.removed()) {
            this.target.remove(this.groupBy.modify(removed), removed);
        }

        for (let inserted of change.inserted()) {
            this.target.add(this.groupBy.modify(inserted), inserted);
        }
    }

    public close(): void {
        this.closable.close();
    }
}