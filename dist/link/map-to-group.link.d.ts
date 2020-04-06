import { Closable } from "../observable/closable";
import { ObservableGroup } from "../group/observable-group";
import { Modifier } from "./modifier";
import { ObservableMap } from "../map/observable-map";
export declare class MapToGroupLink implements Closable {
    private target;
    private groupBy;
    private closable;
    constructor(source: ObservableMap<any, any>, target: ObservableGroup<any, any>, groupBy: Modifier<any, any>);
    private update;
    close(): void;
}
