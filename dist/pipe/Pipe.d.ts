import { Pipable } from "./Pipable";
export declare class Pipe<T> implements Pipable<T> {
    protected pipes: Array<Pipable<T>>;
    constructor(pipes: Array<Pipable<T>>);
    execute(value: T): T;
}
