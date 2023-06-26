let selectedGrid;
let baseSet = false;
let canPlay = false;

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

let div_size = screenWidth / 16;
let num_div = 16 * 9;
let curHov = null;

document.addEventListener('mousemove', e => {
    curHov = document.elementFromPoint(e.clientX, e.clientY);
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    initMap();

    function initMap() {
        for (let c = 1; c <= 9; c++) {
            for (let r = 1; r <= 16; r++) {
                const gridBut = document.createElement('div');
                gridBut.setAttribute('data-x', r);
                gridBut.setAttribute('data-y', c);
                gridBut.classList.add('sector');
                gridBut.addEventListener("click", gridButClickHandler);
                grid.appendChild(gridBut);
            }
        }
    }

    function gridButClickHandler(event) {
        setBase(event.target);
    }

    function setBase(area) {
        const xArea = area.getAttribute('data-x');
        const yArea = area.getAttribute('data-y');
    
        if (!baseSet) {
            for (let i = xArea - 2; i < xArea + 2; i++) {
                const vertRev = Math.abs(Math.abs((i - xArea) * 2) - 5);
                for (let r = yArea - ((vertRev - 1) / 2); r < vertRev + yArea; r++) {
                    const tempHold = Math.random() * 5;
                    const bonusNum = Math.pow(Math.random(), 4);
                    let caseEnv;
                    switch (true) {
                        case (tempHold < 1):
                            caseEnv = 'forest';
                            break;
                        case (1 <= tempHold && tempHold < 2):
                            caseEnv = 'mountain';
                            break;
                        case (2 <= tempHold && tempHold < 3):
                            caseEnv = 'plains';
                            break;
                        case (3 <= tempHold && tempHold < 4):
                            caseEnv = 'desert';
                            break;
                        default:
                            caseEnv = 'basic';
                    }
                    const curSelect = document.querySelector(`[data-x="${i}"][data-y="${r}"]`);
                    const addGs = new Gs(caseEnv, bonusNum, true, curSelect);
                    if (addGs.element !== curSelect) {
                        curSelect.appendChild(addGs.element);
                    }
                    if (curSelect.hasAttribute('data-clicked')) {
                        curSelect.removeEventListener('click', revealGridInfo);
                    }
                    addColor(curSelect);
                    if (!curSelect.classList.contains('capital')) {
                        curSelect.addEventListener('click', revealGridInfo);
                        curSelect.setAttribute('data-clicked', true);
                    }
                    document.getElementById('askCap').style.display = 'block';
                }
            }
            baseSet = true;
        }
    }    

    function Gs(env, bonus, reveal, element) {
        this.env = env;
        this.bonus = bonus;
        this.population = 0;
        this.reveal = reveal;
        this.buildings = 'none';
        this.element = element;
    }

    function hideGridInfo() {
        document.getElementById('gridStat').style.display = 'none';
    }

    function revealGridInfo() {
        console.log(curHov);
        const gridObj = selectedGrid[Object.keys(selectedGrid)][0];
        selectedGrid = curHov;
        document.getElementById('gName').innerHTML = 'x:' + curHov.getAttribute('data-x') + 'y:' + curHov.getAttribute('data-y');
        document.getElementById('gEnv').innerHTML = 'Environment: ' + gridObj.env;
        document.getElementById('gBonus').innerHTML = 'Bonus: ' + gridObj.bonus;
        document.getElementById('gBuildings').innerHTML = 'Buildings: ' + gridObj.buildings;
        document.getElementById('gridStat').style.display = 'block';
    }

    function addColor(areaToColor) {
        const gridObj = areaToColor.querySelector('.Gs');
        if (gridObj) {
            const envu = gridObj.env;
            const elementClassList = areaToColor.classList;
            elementClassList.remove('forest', 'mountain', 'plains', 'desert', 'basic');
            elementClassList.add(envu);
        }
    }


    function setCap() {
        const gridObj = selectedGrid[Object.keys(selectedGrid)][0];
        curHov.setAttribute('data-is-capital', true);
        document.getElementById('askCap').style.display = 'none';
        gridObj.population = 5;
        canPlay = true;
    }
});
