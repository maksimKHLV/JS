//девятое задание


function ConvertToTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    var formattedTime = addZeroPadding(hours) + ":" + addZeroPadding(minutes) + ":" + addZeroPadding(remainingSeconds);
    return formattedTime;
}

function addZeroPadding(value) {
    return value < 10 ? "0" + value : value;
}

var seconds = parseInt(prompt("Введите количество секунд:"));

var timeString = ConvertToTime(seconds);
prompt("Время: " + timeString);