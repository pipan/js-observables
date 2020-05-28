import { Observable } from "../observable/Observable";
import { Dispatchable } from "../observable/Dispatchable";
export interface Channel<T> extends Observable<T>, Dispatchable<T> {
}
