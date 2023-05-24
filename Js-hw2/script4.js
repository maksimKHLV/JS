//четвертое задание

function Rectangle(lenght,width)
{
    if  (width === undefined)
    {
        return lenght * lenght;
    }
    else
    {
        return width * lenght;
    }
}

var lenght = parseFloat(prompt("Введите длину прямогольника  :"));
var width = parseFloat(prompt("Введите ширину прямоугольника(для квадрата оставьте пустым)  :"));

var area = Rectangle(lenght,width);
prompt("площадь прямоугольника равна: " + area);
