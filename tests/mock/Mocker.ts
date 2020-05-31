import { Simulation } from "./Simulation"

export class Mocker {
    private simulations: Map<string, Simulation> = new Map()

    public getSimulation (method: string): Simulation {
        if (!this.simulations.has(method)) {
            this.simulations.set(method, new Simulation())
        }
        return this.simulations.get(method)
    }
}
