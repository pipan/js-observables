import { Dispatchable } from "../observable/Dispatchable";
import { Connectable } from "../observable/Connectable";
export interface Channel<T> extends Connectable<T>, Dispatchable<T> {
}
