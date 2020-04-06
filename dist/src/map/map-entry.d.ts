export declare class MapEntry<T, U> {
    private key;
    private value;
    constructor(key: T, value: U);
    getKey(): T;
    getValue(): U;
}
