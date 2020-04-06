import { Closable } from "../observable/closable";
import { ObservableList } from "../list/observable-list";
import { ObservableGroup } from "../group/observable-group";
import { Modifier } from "./modifier";
export declare class ListToGroupLink implements Closable {
    private target;
    private groupBy;
    private closable;
    constructor(source: ObservableList<any>, target: ObservableGroup<any, any>, groupBy: Modifier<any, any>);
    private update;
    close(): void;
}
