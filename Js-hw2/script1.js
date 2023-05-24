//первое задание

function addnumber(a,b)
{
    var a = parseInt(prompt("Введите первое число:"));


    var b = parseInt(prompt("Введите второе число:"));

    if(a < b )
   {
       return -1;
   }
   if (a > b)
   {
       return 1
   }
   else {
       return 0
   }
}




var result = addnumber();
prompt(result);


