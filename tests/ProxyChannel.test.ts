import 'ts-jest'
import { Channel, ProxyChannel, Closable } from '../src'
import { MockDispathcer } from './mock/MockDispatcher'

test('connected fires action on value change', () => {
    const channel: Channel<string> = new ProxyChannel()

    let result = ''
    channel.connectFn((item: string) => {
        result = item
    })
    channel.dispatch('value')

    expect(result).toBe('value')
})

test('disconnected will not fire on value change', () => {
    const channel: Channel<string> = new ProxyChannel()

    let result = ''
    const closable: Closable = channel.connectFn((item: string) => {
        result = item
    })
    closable.close()
    channel.dispatch('value')

    expect(result).toBe('')
})

test('connecting multiple times same dispatcher will fire only once', () => {
    const channel: Channel<string> = new ProxyChannel()
    const dispatcher: MockDispathcer<string> = new MockDispathcer()

    channel.connect(dispatcher)
    channel.connect(dispatcher)
    channel.dispatch('value')

    const result: Array<Array<any>> = dispatcher.getMocker().getSimulation('dispatch').getExecutions()

    expect(result.length).toBe(1)
})
