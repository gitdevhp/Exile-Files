//import {population} from '/scripts/mapGen.js';
var moneyRate = 0;

function statUpdate() {
    population *= 1.2;
    money += moneyRate;
    document.getElementById('populus').innerHTML = 'population: ' + population;
    document.getElementById('money').innerHTML = 'money: ' + money;
}

setInterval(statUpdate, 1000);