import { Observable } from "../observable/Observable";
import { Dispatchable } from "../observable/Dispatchable";
export interface ObservableAdapter<T, U> extends Observable<U>, Dispatchable<T> {
}
