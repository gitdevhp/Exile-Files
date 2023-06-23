const grid = document.getElementById('grid');

function initMap(){
    for (let r = 0; r < 16; r++) {
        for (let c = 0; c < array.length; c++) {
            const gridBut = grid.createElement('button');
            gridBut.id= (r,c);
            gridBut.innerHTML='?';
            console.log(gridBut.id);
        }       
    }
}