import { Dispatchable } from '../../src'
import { Mocker } from './Mocker'

export class MockDispathcer<T> implements Dispatchable<T> {
    private mocker: Mocker

    public constructor () {
        this.mocker = new Mocker()
    }

    public getMocker(): Mocker {
        return this.mocker
    }

    public dispatch (value: T): void {
        this.mocker.getSimulation('dispatch')
            .execute([value])
    }
}
