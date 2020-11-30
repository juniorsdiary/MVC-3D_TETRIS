// // View is responsible for representing all the data of the application and react to the changes of the state. Here we are difining all the methods which will show all the messages and figures
// const sides = ['cube_side', 'cube_bottom', 'cube_top', 'cube_front', 'cube_back', 'cube_left', 'cube_right'];
// const generalClass = 'cube_side';
// const ids = [
//   'textScore',
//   'texthighScore',
//   'textLevel',
//   'nextTitle',
//   'reset',
//   'start',
//   'save',
//   'lastSave',
//   'changeLang',
//   'rotate',
//   'left',
//   'right',
//   'down',
//   'space',
//   'gameOver',
// ];
// const languages = {
//   RU: [
//     'Счет:',
//     'Рекорд:',
//     'Уровень:',
//     'Следующая фигура',
//     'Сброс',
//     'Начать игру',
//     'Сохранить',
//     'Загрузить',
//     'EN',
//     ' - Вращение',
//     ' - Сдвинуть в лево',
//     ' - Сдвинуть в право',
//     ' - Сдвинуть в низ',
//     'Пробел - пауза',
//     'Конец Игры',
//   ],
//   EN: [
//     'Score:',
//     'High Score:',
//     'Level:',
//     'Next Figure',
//     'Reset',
//     'Start',
//     'Save',
//     'Load',
//     'RU',
//     ' - rotate',
//     ' - move left',
//     ' - move right',
//     ' - move down',
//     'space - pause',
//     'Game Over',
//   ],
// };
//
// let figureData = [];
// let nextFigure = [];
//
// let nodesLevels = document.getElementsByClassName('row');
// const scoreEl = document.getElementById('score');
// const highScoreEl = document.getElementById('highScore');
// const levelEl = document.getElementById('level');
// const startBtn = document.getElementById('start');
// const loadBtn = document.getElementById('lastSave');
// const gameOverTitle = document.getElementById('gameOver');
//
// const field = data => {
//   for (let i = 0; i < data.rows; i++) {
//     let row = document.createElement('div');
//     row.classList.add('row');
//
//     for (let j = 0; j < data.cells; j++) {
//       let cell = document.createElement('div');
//       cell.classList.add('cell');
//       row.appendChild(cell);
//       if (j === 0 || j === 9) {
//         cell.setAttribute('data-border', 'border');
//       }
//     }
//     data.DOMElem.appendChild(row);
//   }
// };
// const figure = data => {
//   let coords = data.currentPosition;
//   let parent = data.field;
//   let name = data.name;
//   coords.forEach(cubeCoords => {
//     let cube = document.createElement('div');
//     cube.classList.add('cube');
//     cube.classList.add('activeCube');
//
//     sides.forEach(sideClass => {
//       let side = document.createElement('div');
//       side.className = `${generalClass} ${sideClass} ${name.substr(-1)}`;
//       cube.appendChild(side);
//     });
//
//     let targetSpot = parent.children[cubeCoords[1]].children[cubeCoords[0]];
//     parent.getAttribute('id') === 'game' ? figureData.push(cube) : nextFigure.push(cube);
//     targetSpot.appendChild(cube);
//   });
// };
// const score = ([newScore, isHigh]) => {
//   if (isHigh) {
//     showCurrentScore(newScore);
//     showHighScore(newScore);
//   } else {
//     showCurrentScore(newScore);
//   }
// };
// const level = level => {
//   levelEl.innerHTML = level;
// };
// const figureFromStorage = (parent, cubeData) => {
//   let cell = parent.children[cubeData.rowIndex].children[cubeData.cellIndex];
//   let cube = document.createElement('div');
//   cube.className = cubeData.statusClass;
//
//   sides.forEach(sideClass => {
//     let side = document.createElement('div');
//     side.className = `${generalClass} ${sideClass} ${cubeData.color}`;
//     cube.appendChild(side);
//   });
//
//   cell.appendChild(cube);
// };
// const clearNext = () => {
//   nextFigure.forEach(item => item.parentNode.removeChild(item));
//   nextFigure = [];
// };
// const clearGame = () => {
//   let field = document.getElementById('game');
//   [...field.children].forEach(row =>
//     [...row.children].forEach(cell => {
//       let cube = cell.firstElementChild;
//       if (cube) {
//         cube.parentNode.removeChild(cube);
//       }
//     })
//   );
//   figureData = [];
// };
// const start = active => {
//   startBtn.style.color = active ? 'grey' : 'yellow';
// };
// const load = active => {
//   loadBtn.style.color = active ? 'yellow' : 'grey';
// };
// const clear = () => {
//   figureData.forEach(item => item.parentNode.removeChild(item));
//   figureData = [];
// };
// const freeze = () => {
//   figureData.map(item => {
//     item.classList.remove('activeCube');
//     item.classList.add('staticCube');
//   });
//   figureData = [];
// };
// const deleteLvls = levelsToErase => {
//   levelsToErase.forEach(levelIndex => {
//     let cellsToErase = Array.from(nodesLevels[levelIndex].children);
//     cellsToErase.forEach(cell => cell.removeChild(cell.firstElementChild));
//   });
// };
// const changeLang = lang => {
//   for (let value in ids) {
//     let element = document.getElementById(ids[value]);
//     element.lastChild.textContent = languages[lang][value];
//   }
// };
// const moveLvls = levelInd => {
//   let statucCubes = [];
//   let levelsHTML = [...Array.from(nodesLevels)];
//   // find all the static cubes above deleted level
//   levelsHTML.forEach((item, index) => {
//     if (index < levelInd) {
//       [...item.children].forEach(elem => {
//         if (elem.firstElementChild) {
//           statucCubes.push(elem);
//         }
//       });
//     }
//   });
//   // append each static cube above deleted level down.
//   statucCubes.forEach(item => {
//     let rowDown = item.parentNode.nextElementSibling;
//     if (rowDown) {
//       let cubeIndex = Array.from(item.parentNode.children).indexOf(item);
//       let cube = item.firstElementChild;
//       let cubePlace = rowDown.children;
//       cubePlace[cubeIndex].appendChild(cube);
//     }
//   });
// };
// const gameOver = value => {
//   gameOverTitle.style.display = value;
// };
//
// const showCurrentScore = score => {
//   scoreEl.innerHTML = score;
// };
// const showHighScore = highScore => {
//   highScoreEl.innerHTML = highScore;
// };
//
// const methods = {
//   field,
//   figure,
//   figureFromStorage,
//   start,
//   load,
//   clearNext,
//   clearGame,
//   score,
//   level,
//   freeze,
//   clear,
//   deleteLvls,
//   moveLvls,
//   changeLang,
//   gameOver,
// };
//
// const render = function(cmd, ...args) {
//   return methods[cmd](...args);
// };
//
// const View = { render };
//
// export default View;
