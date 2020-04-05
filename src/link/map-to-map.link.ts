import { Closable } from "../observable/closable";
import { ObservableMap } from "../map/observable-map";
import { MapChange } from "../map/map-change";
import { Modifier } from "./modifier";

export class MapToMapLink implements Closable {
    private closable: Closable;

    constructor(
        source: ObservableMap<any, any>,
        private target: ObservableMap<any, any>,
        private modifiers: Modifier<MapChange<any, any>, MapChange<any, any>>[] = []
    ) {
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }

    private update(change: MapChange<any, any>): void {
        for (let modifier of this.modifiers) {
            change = modifier.modify(change);
        }

        this.target.addList(change.inserted());
        this.target.removeList(change.removed());
    }

    public close(): void  {
        this.closable.close();
    }
}