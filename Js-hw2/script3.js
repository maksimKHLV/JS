//третее задание

function Threedigit(a, b, c) {
    var combinedNumber = parseInt("" + a + b + c);
    return combinedNumber;
}

var digit1 = parseInt(prompt("Введите первую цифру:"));
var digit2 = parseInt(prompt("Введите вторую цифру:"));
var digit3 = parseInt(prompt("Введите третью цифру:"));

var combinedResult = Threedigit(digit1, digit2, digit3);
prompt("Результат: " + combinedResult);
