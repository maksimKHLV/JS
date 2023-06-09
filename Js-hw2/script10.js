//десятое задание 


function getTimeDifference(hours1, minutes1, seconds1, hours2, minutes2, seconds2) {
    var secondsTotal1 = convertToSeconds(hours1, minutes1, seconds1);
    var secondsTotal2 = convertToSeconds(hours2, minutes2, seconds2);

    var differenceSeconds = Math.abs(secondsTotal1 - secondsTotal2);

    var timeString = convertToTime(differenceSeconds);
    return timeString;
}

function convertToSeconds(hours, minutes, seconds) {
    var totalSeconds = 0;

    totalSeconds += hours * 3600;
    totalSeconds += minutes * 60;
    totalSeconds += seconds;

    return totalSeconds;
}

function convertToTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    var formattedTime = addZeroPadding(hours) + ":" + addZeroPadding(minutes) + ":" + addZeroPadding(remainingSeconds);
    return formattedTime;
}

function addZeroPadding(value) {
    return value < 10 ? "0" + value : value;
}

var hours1 = parseInt(prompt("Введите часы первой даты:"));
var minutes1 = parseInt(prompt("Введите минуты первой даты:"));
var seconds1 = parseInt(prompt("Введите секунды первой даты:"));

var hours2 = parseInt(prompt("Введите часы второй даты:"));
var minutes2 = parseInt(prompt("Введите минуты второй даты:"));
var seconds2 = parseInt(prompt("Введите секунды второй даты:"));

var differenceTime = getTimeDifference(hours1, minutes1, seconds1, hours2, minutes2, seconds2);
prompt("Разница между датами: " + differenceTime);