import { Adaptable } from "./Adaptable"

export class ListAdapter<T, U> implements Adaptable<Array<T>, Array<U>> {
    private itemAdapter: Adaptable<T, U>

    public constructor (itemAdapter: Adaptable<T, U>) {
        this.itemAdapter = itemAdapter
    }

    public adapt (items: Array<T>): Array<U> {
        const result: Array<U> = []
        for (const item of items) {
            result.push(
                this.itemAdapter.adapt(item)
            )
        }
        return result
    }
}
