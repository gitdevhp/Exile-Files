let selectedGrid;

//const GRID_SIZE;
var baseSet = false;
var canPlay = false;

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
                // Store the click event handler in a variable
                const gridButClickHandler = (event) => {
                    setBase(event.target);
                };

                // Add the event listener
                gridBut.addEventListener("click", gridButClickHandler);
                grid.appendChild(gridBut);
            }
        }
    }
});

function setBase(area) {
    var xArea = area.getAttribute('data-x');
    var yArea = area.getAttribute('data-y');
    console.log(area);
    if (!baseSet) {
        for (let i = xArea - 2; i < xArea + 2; i++) {
            // init area Reveal
            var vertRev = Math.abs(Math.abs((i - xArea) * 2) - 5);
            var revX = i;
            for (let r = yArea - ((vertRev - 1) / 2); r < vertRev + yArea; r++) {
                var tempHold = Math.random() * 5;
                var bonusNum = Math.pow(Math.random(), 4);
                var caseEnv;
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

                const addGs = new Gs(caseEnv, bonusNum, true);
                if (![...curSelect.childNodes].includes(addGs.element)) {
                    curSelect.appendChild(addGs.element);
                }

                curSelect.removeEventListener('click', gridButClickHandler);
                addColor(curSelect);
                curSelect.addEventListener('click', revealGridInfo);
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
    let gridObj = selectedGrid[Object.keys(selectedGrid)][0];
    selectedGrid = curHov;
    document.getElementById('gName').innerHTML = 'x:' + curHov.getAttribute('data-x') + 'y:' + curHov.getAttribute('data-y');
    document.getElementById('gEnv').innerHTML = 'Environment: ' + gridObj.env;
    document.getElementById('gBonus').innerHTML = 'Bonus: ' + gridObj.bonus;
    document.getElementById('gBuildings').innerHTML = 'Buildings: ' + gridObj.buildings;
    document.getElementById('gridStat').style.display = 'block';
}

function addColor(areaToColor) {
    const gridObj = areaToColor.querySelector('.Gs');
    const envu = gridObj.env;
    const elementClassList = areaToColor.classList;

    elementClassList.remove('forest', 'mountain', 'plains', 'desert', 'basic');
    elementClassList.add(envu);
}

function setCap() {
    let gridObj = selectedGrid[Object.keys(selectedGrid)][0];
    curHov.setAttribute('data-is-capital', true);
    document.getElementById('askCap').style.display = 'none';
    gridObj.population = 5;
    canPlay = true;
}