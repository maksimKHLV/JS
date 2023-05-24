//шестое задание


function findPerfectNumbers(min, max) {
    var perfectNumbers = [];

    for (var number = min; number <= max; number++) {
        if (PerfectNumber(number)) {
            perfectNumbers.push(number);
        }
    }

    return perfectNumbers;
}

var min = parseInt(prompt("Введите минимальное значение диапазона:"));
var max = parseInt(prompt("Введите максимальное значение диапазона:"));

var perfectNumbers = findPerfectNumbers(min, max);

if (perfectNumbers.length === 0) {
    prompt("В указанном диапазоне нет совершенных чисел.");
} else {
    prompt("Совершенные числа в указанном диапазоне: " + perfectNumbers.join(", "));
}