export class Simulation {
    private rules: Array<{value: any, args: Array<any>}> = []
    private executions: Array<Array<any>> = []

    public returnWhen (value: any, args: Array<any>): void {
        this.rules.push({
            value: value,
            args: args
        })
    }

    public getExecutions (): Array<Array<any>> {
        return this.executions
    }

    public execute(args: Array<any>): any {
        this.executions.push(args)
        for (const rule of this.rules) {
            if (rule.args == args) {
                return rule.value
            }
        }
    }
}
