//import {population} from '/scripts/mapGen.js';
var moneyRate = 0;

function statUpdate() {
    population *= 1.2;
    money += moneyRate;
    document.getElementById('populus').innerHTML = 'population: ' + population;
    document.getElementById('money').innerHTML = 'money: ' + money;
}

setInterval(statUpdate, 1000);

var housingLvl = 0;

function housing() {
    var houseType = 'tents';
    switch (housingLvl) {
        case 1:
            houseType = 'small cabin';
            break;
        default:
            houseType = 'tents';
            break;
    }
    switchBuildables('housing', houseType);
}