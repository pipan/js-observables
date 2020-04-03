export class PropertyChange<T> {
    constructor(
        private previousValue: T,
        private nextValue: T
    ) {}

    previous(): T {
        return this.previousValue;
    }

    next(): T {
        return this.nextValue;
    }
}