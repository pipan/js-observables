import { Observable } from "./observable";
import { Closable } from "./closable";
import { ObservableClosable } from "./observable-closable";

export abstract class SimpleObservable<T> implements Observable<T> {
    private listeners: { (item: T): void; }[] = [];

    addListener(fn: (item: T) => void): Closable {
        this.listeners.push(fn);
        return new ObservableClosable(this, fn);
    }

    addListenerAndCall(fn: (item: T) => void): Closable {
        let cloasable: Closable = this.addListener(fn);
        this.callListener(fn);
        return cloasable;
    }

    removeListener(fn: (item: T) => void): void {
        let index: number = this.listeners.indexOf(fn);
        if (index === -1) {
            return;
        }
        this.listeners.splice(index, 1);
    }

    abstract callListener(listener: (item: T) => void): void;

    protected fire(item: T): void {
        for (let fn of this.listeners) {
            fn(item);
        }
    }
}