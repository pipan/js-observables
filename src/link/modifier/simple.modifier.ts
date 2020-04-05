import { Modifier } from "../modifier";

export class SimpleModifier<T, U> implements Modifier<T, U> {
    constructor(
        private fn: (item: T) => U
    ) {}

    modify(item: T): U {
        return this.fn(item);
    }
}