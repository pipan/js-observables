import { Pipable } from "./Pipable"

export class Pipe<T> implements Pipable<T> {
    protected pipes: Array<Pipable<T>> = []

    public constructor (pipes: Array<Pipable<T>>) {
        this.pipes = pipes
    }

    public execute (value: T): T {
        for (const pipe of this.pipes) {
            value = pipe.execute(value)
        }
        return value
    }
}
