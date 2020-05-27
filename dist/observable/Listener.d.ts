export interface Listener<T> {
    action(value: T): void;
}
