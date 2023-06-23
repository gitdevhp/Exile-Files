const grid = document.getElementById('grid');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let pixel_size = cnvs.width / 16;
let num_pixels = 16*9;

function initMap(){
    for (let r = 0; r < 16; r++) {
        for (let c = 0; c < array.length; c++) {
            const gridBut = document.createElement('button');
            gridBut.setAttribute('data-x',c);
            gridBut.setAttribute('data-y',r);
            gridBut.innerHTML='?';
            grid.appendChild(gridBut);
        }       
    }
}

function setBase(x, y) {
    
}