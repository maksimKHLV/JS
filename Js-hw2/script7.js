//седьмое задание


function FormatTime (hours,minutes,seconds){
    if (minutes === undefined){
        minutes == "00";
    }
    if (seconds === undefined){
        seconds == "00";
    }
    return hours + ":" + minutes + ":" + seconds;
}

var hours = parseInt(prompt("Введите часы : "));
var minutes = parseInt(prompt("Введите минуты(не обязательно) : "));
var seconds = parseInt(prompt("Введите секунды(не обязательно) : "));

var Timeform = FormatTime(hours,minutes,seconds);
prompt("Время  " + Timeform);