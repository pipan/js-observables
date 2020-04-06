import { ListToListLink } from "./list-to-list.link";
import { ListChange } from "../list/list-change";
import { ObservableList } from "../list/observable-list";
import { Modifier } from "./modifier";
export declare class ListToListBuilder {
    private modifiers;
    private source;
    private target;
    withSource(source: ObservableList<any>): ListToListBuilder;
    withTarget(target: ObservableList<any>): ListToListBuilder;
    withModifier(modifier: Modifier<ListChange<any>, ListChange<any>>): ListToListBuilder;
    withFilter(fn: (item: any) => any): ListToListBuilder;
    withAdapter(fn: (item: any) => any): ListToListBuilder;
    build(): ListToListLink;
}
