

var time= {
    hour: 0,
    minute: 0,
        second: 0,

    displayTime: function () {
        var HoursString = this.hour.toString().padStart(2,'0');
        var MinutesString = this.minute.toString().padStart(2,'0');
        var SecondString = this.second.toString().padStart(2,'0');

        prompt(HoursString + ':'+ MinutesString  + ':' + SecondString)


    },
    addSeconds : function (seconds){
        this.second+=seconds;

        if (this.second >= 60){
            var minutesAdd = Math.floor(this.second / 60);
            this.second %= 60;
            this.addMinutes(minutesAdd);

        }
    },
    addMinutes : function (minutes){
        this.minute+=minutes;

        if (this.hours){
            var minutesAdd = Math.floor(this.minute / 60);
            this.minute %= 60;

        }
    },
    addHours : function (hours){
        this.hour+=hours;

        if (this.hours >= 24){

            this.hours %= 24;

        }
    }



};

time.hour = 15;
time.minute = 13;
time.second = 45;

time.displayTime();

time.addMinutes(10)
time.addHours(23)
time.addSeconds(120)
time.displayTime()