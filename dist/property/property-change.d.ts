export declare class PropertyChange<T> {
    private previousValue;
    private nextValue;
    constructor(previousValue: T, nextValue: T);
    previous(): T;
    next(): T;
}
