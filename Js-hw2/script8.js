//восьмое задание


function ConvertToSeconds(hours, minutes, seconds) {
    var totalSeconds = 0;

    totalSeconds += hours * 3600;
    totalSeconds += minutes * 60;
    totalSeconds += seconds;

    return totalSeconds;
}

var hours = parseInt(prompt("Введите часы:"));
var minutes = parseInt(prompt("Введите минуты:"));
var seconds = parseInt(prompt("Введите секунды:"));

var secondsTotal = ConvertToSeconds(hours, minutes, seconds);
prompt("Время в секундах: " + secondsTotal);