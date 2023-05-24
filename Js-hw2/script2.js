//второе задание

function factorial(a)
{
    var result = 1;

    for (var i = 2;i <=a;i++)
    {
        result *=i;
    }
    return result;
}

var number = parseInt(prompt("введите число:"));
var result = factorial(number);


prompt("Факториал числа " + number + " = " + result);