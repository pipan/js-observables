import { ObservableList } from "../list/observable-list";
import { ObservableMap } from "../map/observable-map";
import { Modifier } from "./modifier";
import { Closable } from "../observable/closable";
import { ListChange } from "../list/list-change";
import { MapChange } from "../map/map-change";
export declare class ListToMapLink implements Closable {
    private target;
    private mapAdapter;
    private modifiers;
    private closable;
    constructor(source: ObservableList<any>, target: ObservableMap<any, any>, mapAdapter: Modifier<ListChange<any>, MapChange<any, any>>, modifiers?: Modifier<any, any>[]);
    private update;
    close(): void;
}
