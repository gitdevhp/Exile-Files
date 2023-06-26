const grid = document.getElementById('grid');

//const GRID_SIZE;
var baseSet = false;

let div_size = cnvs.width / 16;
let num_div = 16 * 9;

let curHov = null;

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

document.addEventListener('mousemove', e => {
    curHov = grid.elementFromPoint(e.clientX, e.clientY);
}, { passive: true });

function initMap() {
    for (let r = 0; r < 16; r++) {
        for (let c = 0; c < 9; c++) {
            const gridBut = document.createElement('div');
            gridBut.setAttribute('data-x', c);
            gridBut.setAttribute('data-y', r);
            gridBut.addEventListener("click", bringOption(gridBut));
            grid.appendChild(gridBut);
        }
    }
}

function bringOption(area) {
    var xArea = area.getAttribute('data-x');
    var yArea = area.getAttribute('data-y');
    if (!baseSet) {
        for (let i = xArea - 2; i < xArea + 2; i++) {
            //init area Reveal
            var vertRev = Math.abs(Math.abs((i - xArea) * 2) - 5);
            var revX = i;
            for (let r = yArea - ((vertRev - 1) / 2); r < vertRev + yArea; r++) {
                var tempHold = Math.random() * 5;
                var bonusNum = Math.pow(Math.random(), 4);
                var caseEnv;
                switch (tempHold) {
                    case (tempHold < 1):
                        caseEnv = 'forest';
                        break;
                    case (1 <= tempHold < 2):
                        caseEnv = 'mountain';
                        break;
                    case (2 <= tempHold < 3):
                        caseEnv = 'plains';
                        break;
                    case (3 <= tempHold < 4):
                        caseEnv = 'desert';
                        break;
                    default:
                        caseEnv = 'basic'
                }
                const addGs = new Gs(caseEnv, bonusNum, true);
                const curSelect = document.querySelector('[data-x="${i}"][data-y="${r}"]');
                curSelect.appendChild(addGs);
                curSelect.addEventListener('click', revealGridInfo());
            }
        }
    }
}

function Gs(env, bonus, reveal) {
    this.env = env;
    this.bonus = bonus;

    this.reveal = reveal;
    this.buildings = 'none';
}

function closeGridInfo() {
    document.getElementById('gridStat').style.display = 'none';
}
function revealGridInfo() {
    console.log(curHov);
    const gridObj = curHov[Object.keys(curHov)[0]];
    var envu = gridObj.env;
    document.getElementById('gName').innerHTML = 'x:' + curHov.getAttribute('data-x') + 'y:' + curHov.getAttribute('data-y');
    document.getElementById('gEnv').innerHTML = 'Environment: ' + envu;
    document.getElementById('gBonus').innerHTML = 'Bonus: ' + gridObj.bonus;
    document.getElementById('gBuildings').innerHTML = 'Buildings: ' + gridObj.buildings;
    document.getElementById('gridStat').style.display = 'block';
    //move below to diff method
    switch (envu) {
        case 'forest':
            curHov.style.backgroundColor = '#023C40';
            break;
        case 'mountain':
            curHov.style.backgroundColor = '#955E42';
            break;
        case 'plains':
            curHov.style.backgroundColor = '#B0970A';
            break;
        case 'desert':
            curHov.style.backgroundColor = '#DAD2BC';
            break;
        default:
            curHov.style.backgroundColor = '#A4958E';
    }
}