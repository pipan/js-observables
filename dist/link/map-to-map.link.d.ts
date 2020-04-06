import { Closable } from "../observable/closable";
import { ObservableMap } from "../map/observable-map";
import { MapChange } from "../map/map-change";
import { Modifier } from "./modifier";
export declare class MapToMapLink implements Closable {
    private target;
    private modifiers;
    private closable;
    constructor(source: ObservableMap<any, any>, target: ObservableMap<any, any>, modifiers?: Modifier<MapChange<any, any>, MapChange<any, any>>[]);
    private update;
    close(): void;
}
