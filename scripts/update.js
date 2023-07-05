import 

function statUpdate() {
    const curSelect = document.querySelector(`[data-x="${c}"][data-y="${r}"]`);
    var curpop = curSelect.getAttribute('data-pop');
    var addedPop = curpop * .5; //replace with Rate increase of population by grid
    var totalPopAdd =+ addedPop;
}

setInterval(statUpdate, 1000);