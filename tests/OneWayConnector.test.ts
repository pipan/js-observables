import 'ts-jest'
import { LazyObservable, Connector, OneWayConnector, Closable, StatefulObservable } from '../src'

test('connecting 2 observable', () => {
    const source: StatefulObservable<string> = new LazyObservable()
    const target: StatefulObservable<string> = new LazyObservable()
    const connector: Connector<string> = new OneWayConnector(source)

    connector.connect(target)
    source.dispatch('value')

    expect(target.get()).toBe('value');
});

test('disconnect target will not change value latter', () => {
    const source: StatefulObservable<string> = new LazyObservable()
    const target: StatefulObservable<string> = new LazyObservable()
    const connector: Connector<string> = new OneWayConnector(source)

    const closable: Closable = connector.connect(target)
    source.dispatch('value')
    closable.close()
    source.dispatch('change me one more time')

    expect(target.get()).toBe('value');
});
