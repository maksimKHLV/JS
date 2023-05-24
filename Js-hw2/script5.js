//пятое задание


function PerfectNumber(number) {
    var sum = 0;

    for (var i = 1; i < number; i++) {
        if (number % i === 0) {
            sum += i;
        }
    }

    return sum === number;
}

var number = parseInt(prompt("Введите число для проверки :"));

if (PerfectNumber(number)) {
    prompt(number + " - совершенное число");
} else {
    prompt(number + " - не является совершенным числом");
}