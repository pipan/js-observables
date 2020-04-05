import { ListToListLink } from "./list-to-list.link";
import { ListChange } from "../list/list-change";
import { ObservableList } from "../list/observable-list";
import { Modifier } from "./modifier";
import { FilterListModifier } from "./modifier/list/filter-list.modifier";
import { AdapterListModifier } from "./modifier/list/adapter-list.modifier";

export class ListToListBuilder {
    private modifiers: Modifier<ListChange<any>, ListChange<any>>[] = [];
    private source: ObservableList<any>;
    private target: ObservableList<any>;

    public withSource(source: ObservableList<any>): ListToListBuilder {
        this.source = source;
        return this;
    }

    public withTarget(target: ObservableList<any>): ListToListBuilder {
        this.target = target;
        return this;
    }

    public withModifier(modifier: Modifier<ListChange<any>, ListChange<any>>): ListToListBuilder {
        this.modifiers.push(modifier);
        return this;
    }

    public withFilter(fn: (item: any) => any): ListToListBuilder {
        return this.withModifier(new FilterListModifier(fn));
    }

    public withAdapter(fn: (item: any) => any): ListToListBuilder {
        return this.withModifier(new AdapterListModifier(fn));
    }

    public build(): ListToListLink {
        return new ListToListLink(this.source, this.target, this.modifiers);
    }
}