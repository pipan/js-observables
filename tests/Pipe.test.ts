import 'ts-jest'
import { Pipable, PipeFn, Pipe } from '../src'

test('pipe fn - execute - executes fn', () => {
    const pipe: Pipable<string> = new PipeFn((item: string) => {
        return item + "-"
    })

    let result = pipe.execute('value')

    expect(result).toBe('value-')
})

test('pipe - execute - executes all pipables in array', () => {
    const pipe: Pipable<string> = new Pipe([
        new PipeFn((item: string) => { return item + "1" }),
        new PipeFn((item: string) => { return item + "2" }),
        new PipeFn((item: string) => { return item + "3" })
    ])

    let result = pipe.execute('value')

    expect(result).toBe('value123')
})
