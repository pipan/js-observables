import { Closable } from "../observable/closable";
import { ObservableList } from "../list/observable-list";
import { ListChange } from "../list/list-change";
import { Modifier } from "./modifier";
export declare class ListToListLink implements Closable {
    private target;
    private modifiers;
    private closable;
    constructor(source: ObservableList<any>, target: ObservableList<any>, modifiers?: Modifier<ListChange<any>, ListChange<any>>[]);
    private update;
    close(): void;
}
