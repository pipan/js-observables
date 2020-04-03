import { MapEntry } from "./map-entry";

export class MapChange<T, U> {
    constructor(
        private inservedValue: MapEntry<T, U>[],
        private removedValue: MapEntry<T, U>[]
    ) {}

    public inserted(): MapEntry<T, U>[] {
        return this.inservedValue;
    }

    public removed(): MapEntry<T, U>[] {
        return this.removedValue;
    }
}