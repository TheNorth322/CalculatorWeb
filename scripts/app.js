import Deposit from "./Deposit.js"
import Calculator from "./Calculator.js";

const calculator = new Calculator(CreateDeposits());

const depositTypeCombobox = document.getElementById("deposit-type-combobox");
const depositCombobox = document.getElementById("deposit-combobox");
const depositSumInput = document.getElementById("deposit-sum");
const calculateButton = document.getElementById("calculate-button");
const resultText = document.getElementById("result-text");

let selectedDepositIndex = null;
let depositSum = null;

InitializeDepositTypeComboBox(depositTypeCombobox);
InitializeDepositComboBox(depositCombobox);

depositTypeCombobox.addEventListener("change", function () {
    var selectedOption = depositTypeCombobox.options[depositTypeCombobox.selectedIndex];
    updateDepositComboBox(selectedOption.value);
});

depositCombobox.addEventListener("change", function () {
    var option = depositCombobox.options[depositCombobox.selectedIndex];
    selectedDepositIndex = option.value;
});

depositSumInput.addEventListener("change", function () {
    depositSum = parseInt(depositSumInput.value);
});

calculateButton.addEventListener("click", function () {
    if (selectedDepositIndex == null || depositSum == null || Number.isNaN(depositSum)) {
        resultText.textContent = "Заполните поля калькулятора";
        return;
    }
    let calculatedDepositSum = calculator.calculate(selectedDepositIndex, depositSum);
    resultText.textContent = `${calculator.deposits[selectedDepositIndex].toString()} на сумму ${depositSum} руб.\n\n В конце срока вы получите ${calculatedDepositSum}`;
});

function updateDepositComboBox(type) {
    clearComboBox(depositCombobox);
    InitializeDepositComboBox(depositCombobox);

    calculator.deposits.forEach(function(element, index) {
        if (element.type === type) {
            depositCombobox.add(createOption(index, getDepositText(element), false, false ));
        }
    });
}

function createOption(value, text, disabled = false, selected = false) {
    var option = document.createElement("option");

    option.value = value;
    option.text = text;
    option.disabled = disabled;
    option.selected = selected;

    return option;
}



function InitializeDepositTypeComboBox(comboBox) {
    comboBox.add(createOption("", "Вид вклада", true, true));
    comboBox.add(createOption("replenished", "Пополняемый"));
    comboBox.add(createOption("express", "Срочный"));
}

function getDepositText(deposit) {
    if (deposit.time_period >= 12) {
        var years = deposit.time_period / 12;
        return `${years} лет - ${deposit.percentage}%`;
    }
    return `${deposit.time_period} месяцев - ${deposit.percentage}%`
}

function clearComboBox(comboBox) {
    comboBox.innerHTML = '';
}

function InitializeDepositComboBox(comboBox) {
    comboBox.add(createOption("", "Срок вклада", true, true));
}

function CreateDeposits() {
    let deposits = [];

    deposits.push(new Deposit("replenished", 6, 20));
    deposits.push(new Deposit("replenished", 12, 22));
    deposits.push(new Deposit("replenished", 18, 15));
    deposits.push(new Deposit("replenished", 24, 10));

    deposits.push(new Deposit("express", 3, 20));
    deposits.push(new Deposit("express", 6, 22));
    deposits.push(new Deposit("express", 9, 23));
    deposits.push(new Deposit("express", 12, 24));
    deposits.push(new Deposit("express", 18, 18));
    deposits.push(new Deposit("express", 24, 15));

    return deposits;
}
