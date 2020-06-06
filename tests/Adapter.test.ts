import 'ts-jest'
import { Adaptable, AdapterFn } from '../src'

test('adapter fn - adapt - executes fn', () => {
    const adapter: Adaptable<string, string> = new AdapterFn((item: string) => {
        return item + "-"
    })

    let result = adapter.adapt('value')

    expect(result).toBe('value-')
})
