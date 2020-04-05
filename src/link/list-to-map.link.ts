import { ObservableList } from "../list/observable-list";
import { ObservableMap } from "../map/observable-map";
import { Modifier } from "./modifier";
import { Closable } from "../observable/closable";
import { ListChange } from "../list/list-change";
import { MapChange } from "../map/map-change";

export class ListToMapLink implements Closable {
    private closable: Closable;

    constructor(
        source: ObservableList<any>,
        private target: ObservableMap<any, any>,
        private mapAdapter: Modifier<ListChange<any>, MapChange<any, any>>,
        private modifiers: Modifier<any, any>[] = [],
    ) {
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }

    private update(change: ListChange<any>): void {
        let mapChange: MapChange<any, any> = this.mapAdapter.modify(change);

        for (let modifier of this.modifiers) {
            mapChange = modifier.modify(mapChange);
        }

        this.target.addList(mapChange.inserted());
        this.target.removeList(mapChange.removed());
    }

    public close(): void {
        this.closable.close();
    }
}