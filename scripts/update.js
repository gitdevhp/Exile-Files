import { rows, columns } from "/scripts/mapGen.js";

function statUpdate() {
    //population update
    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= columns; c++) {
            const curSelect = document.querySelector(`[data-x="${c}"][data-y="${r}"]`);
            var curpop = curSelect.getAttribute('data-pop');
            var addedPop = curpop * .5; //replace with Rate increase of population by grid
        }
    }
    var totalPopAdd =+ addedPop;
    false
}

setInterval(populationUpdate, 1000);