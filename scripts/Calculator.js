export default class Calculator {
    constructor(deposits) {
        this.deposits = deposits;
    }

    calculate(deposit_index, deposit_sum) {
        let deposit = this.deposits[deposit_index];
        let years = deposit.time_period / 12;

        return deposit_sum + (deposit_sum * (deposit.percentage / 100) * years);
    }
}