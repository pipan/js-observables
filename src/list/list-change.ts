export class ListChange<T> {
    constructor(
        private insertedValues: T[],
        private removedValues: T[]
    ) {}

    public removed(): T[] {
        return this.removedValues;
    }

    public inserted(): T[] {
        return this.insertedValues;
    }
}