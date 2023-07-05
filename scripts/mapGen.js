let selectedGrid;
let canPlay = false;

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

var columns = 16;
var rows = 9;
let div_size = screenWidth / columns;
var num_div = columns * rows;
let curHov = null;

//export var population = 0;

document.addEventListener('mousemove', e => {
    curHov = document.elementFromPoint(e.clientX, e.clientY);
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    initMap();

    function initMap() {
        for (let c = 1; c <= rows; c++) {
            for (let r = 1; r <= columns; r++) {
                const gridBut = document.createElement('div');
                gridBut.setAttribute('data-x', r);
                gridBut.setAttribute('data-y', c);
                gridBut.classList.add('sector');
                gridBut.addEventListener("click", gridButClickHandler);
                grid.append(gridBut);
            }
        }
    }

    function gridButClickHandler() {
        setBase(curHov);
        console.log(curHov);
    }

    function setBase(area) {
        area.setAttribute('data-is-capital', true);
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
                    if (curSelect !== null) {
                        addAttribute(cursSelect, bonusNum, caseEnv, null);
                        curSelect.removeEventListener('click', gridButClickHandler);
                        addColor(curSelect);
                        curSelect.addEventListener('click', revealGridInfo);
                        //document.getElementById('askCap').style.display = 'block';
                    }
                }
            }
            landMass = 13;
            console.log('GoGoGo!!!');
        }
    }

    function addAttribute(selGrid, bon, envi, build) {
        selGrid.setAttribute('data-bonus', bon);
        selGrid.setAttribute('data-env', env);
        selGrid.addBuilding(build);
    }

    function hideGridInfo() {
        document.getElementById('gridStat').style.display = 'none';
    }

    function revealGridInfo() {
        console.log(curHov);
        selectedGrid = curHov;
    
        const gridInfo = {
            gName: 'x:' + selectedGrid.getAttribute('data-x') + 'y:' + selectedGrid.getAttribute('data-y'),
            gEnv: 'Environment: ' + selectedGrid.getAttribute('data-env'),
            gBonus: 'Bonus: ' + selectedGrid.getAttribute('data-bon'),
            gBuildings: 'Buildings: ' + selectedGrid.getAttribute('data-built')
        };
    
        console.log(gridInfo);
        document.getElementById('gridStat').innerHTML = gridInfo;
        document.getElementById('gridStat').style.display = 'block';
    }

    function addColor(areaToColor) {
            const envu = areaToColor.getAttribute('data-env');
            const elementClassList = areaToColor.classList;
            elementClassList.remove('forest', 'mountain', 'plains', 'desert', 'basic');
            elementClassList.add(envu);
    }

    function addBuilding(building, selectGrid) {
        if (building!==null) {
            switch (building) {
                case 'capital':
                    const nodeAdd = document.createElement('img','src = "blank add new"');
                    selectGrid.appendChild(nodeAdd);
                break;
                //add more cases as neccecary///\\\\
            }
        }
    }
});
