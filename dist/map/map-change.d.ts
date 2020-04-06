import { MapEntry } from "./map-entry";
export declare class MapChange<T, U> {
    private inservedValue;
    private removedValue;
    constructor(inservedValue: MapEntry<T, U>[], removedValue: MapEntry<T, U>[]);
    inserted(): MapEntry<T, U>[];
    removed(): MapEntry<T, U>[];
}
