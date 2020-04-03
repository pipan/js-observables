export class MapEntry<T, U> {
    constructor(
        private key: T,
        private value: U
    ) {}

    public getKey(): T {
        return this.key;
    }

    public getValue(): U {
        return this.value;
    }
}