import { Observable } from "../observable/Observable"
import { Dispatcher } from "../observable/Dispatcher"

export interface Channel<T> extends Observable<T>, Dispatcher<T> {}
