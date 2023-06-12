var car =
{
    name : "bmw",
        model:  "530",
    year : 2015,
    averagespeed : 100,


    printinfo: function (){
        alert("Name : " + this.name);
        alert("Model : " + this.model);
        alert("Average Speed : " + this.averagespeed);

    },
    calculartrveltime: function (distance){
        var hours = distance/this.averagespeed;
        var breakamount = Math.floor(hours/4);
        var totaltime = hours + breakamount;

        alert("Total time of Travel  : " + totaltime + " hours" );

    }

};

car.printinfo();
car.calculartrveltime(100);
