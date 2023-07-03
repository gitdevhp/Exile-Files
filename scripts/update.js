import { rows, columns } from "/scripts/mapGen.js";

function populationUpdate() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const curSelect = document.querySelector(`[data-x="${c}"][data-y="${r}"]`);
        }
    }
}