export interface Pipable<T> {
    execute(value: T): T;
}
