import 'ts-jest'
import { EagerObservable, Closable } from '../src'

test('empty initialization value is undefine', () => {
    let eager: EagerObservable<string> = new EagerObservable()

    expect(eager.get()).toBeUndefined();
});

test('initialization value is set', () => {
    let eager: EagerObservable<string> = new EagerObservable('value')

    expect(eager.get()).toBe('value');
});

test('adding listener fires initial value', () => {
    let eager: EagerObservable<string> = new EagerObservable('ha')

    let result: string = ''
    eager.connectFn((value: string) => {
        result = value
    })

    expect(result).toBe('ha');
});

test('set different value fires listener', () => {
    let eager: EagerObservable<string> = new EagerObservable()

    let result: string = ''
    eager.connectFn((value: string) => {
        result = value
    })
    eager.dispatch('value')

    expect(result).toBe('value');
});

test('closing listener does not fire listner on change', () => {
    let eager: EagerObservable<string> = new EagerObservable()

    let count: number = 0
    const closable: Closable = eager.connectFn((value: string) => {
        count++
    })
    closable.close()
    eager.dispatch('value')

    expect(count).toBe(1);
});

test('setting same value does not fire listener', () => {
    let eager: EagerObservable<string> = new EagerObservable('value')

    let count: number = 0
    eager.connectFn((value: string) => {
        count++
    })
    eager.dispatch('value')

    expect(count).toBe(1);
});
