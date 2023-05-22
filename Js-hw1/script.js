//первое задание 1.1

let Name = prompt("Как вас зовут?", "");

alert("Привет " + Name);

let Year = prompt("Какого вы года рождения?");


let Currentyear = new Date().getFullYear();

let Age = Currentyear - Year;

alert("вам" + " " + Age + " " + "лет");