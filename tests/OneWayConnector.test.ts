import 'ts-jest'
import { LazyObservable, ValueObservable, Connectable, OneWayConnector, Closable } from '../src'

test('connecting 2 observable', () => {
    const source: ValueObservable<string> = new LazyObservable()
    const target: ValueObservable<string> = new LazyObservable()
    const connector: Connectable<string> = new OneWayConnector(source)

    connector.connect(target)
    source.set('value')

    expect(target.get()).toBe('value');
});

test('disconnect target will not change value latter', () => {
    const source: ValueObservable<string> = new LazyObservable()
    const target: ValueObservable<string> = new LazyObservable()
    const connector: Connectable<string> = new OneWayConnector(source)

    const closable: Closable = connector.connect(target)
    source.set('value')
    closable.close()
    source.set('change me one more time')

    expect(target.get()).toBe('value');
});
