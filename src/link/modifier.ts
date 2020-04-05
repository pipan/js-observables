export interface Modifier<T, U> {
    modify(intem: T): U;
}