import { Closable } from "../observable/closable";
import { ObservableGroup } from "../group/observable-group";
import { Modifier } from "./modifier";
import { ObservableMap } from "../map/observable-map";
import { MapChange } from "../map/map-change";

export class MapToGroupLink implements Closable {
    private closable: Closable;

    public constructor(
        source: ObservableMap<any, any>,
        private target: ObservableGroup<any, any>,
        private groupBy: Modifier<any, any>
    ) {
        this.closable = source.addListenerAndCall(this.update.bind(this));
    }

    private update(change: MapChange<any, any>): void {
        for (let removed of change.removed()) {
            let value: any = removed.getValue();
            this.target.remove(this.groupBy.modify(value), value);
        }

        for (let inserted of change.inserted()) {
            let value: any = inserted.getValue();
            this.target.add(this.groupBy.modify(value), value);
        }
    }

    public close(): void {
        this.closable.close();
    }
}