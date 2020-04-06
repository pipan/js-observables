export declare class ListChange<T> {
    private insertedValues;
    private removedValues;
    constructor(insertedValues: T[], removedValues: T[]);
    removed(): T[];
    inserted(): T[];
}
