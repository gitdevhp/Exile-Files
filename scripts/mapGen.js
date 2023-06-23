const grid = document.getElementById('grid');

function initMap(){
    for (let r = 0; r < 16; r++) {
        for (let c = 0; c < array.length; c++) {
            const gridBut = document.createElement('button');
            gridBut.setAttribute('data-x',c);
            grid.setAttribute('data-y',r);
            gridBut.innerHTML='?';
            console.log(gridBut.id);
            grid.appendChild(gridBut);
        }       
    }
}