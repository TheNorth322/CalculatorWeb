export default class Deposit {
    constructor(type, time_period, percentage) {
        this.type = type;
        this.time_period = time_period;
        this.percentage = percentage;
    }

    toString() {
        let typeString = (this.type === "replenished") ? "Пополняемый" : "Срочный";
        let timePeriodString = (this.time_period >= 12) ? `${this.time_period / 12} лет` : `${this.time_period} месяцев`;

        return `Вклад \"${typeString}\" на срок \"${timePeriodString}\"`;
    }
}