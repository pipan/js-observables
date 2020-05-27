export interface Dispatcher<T> {
    dispatch(data: T): void;
}
