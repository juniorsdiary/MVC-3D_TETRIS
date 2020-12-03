// // View is responsible for representing all the data of the application and react to the changes of the state. Here we are difining all the methods which will show all the messages and figures

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
//
// const highScoreEl = document.getElementById('highScore');
//
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

import {
  IView,
  IRenderPayload,
  IRenderField,
  IRenderFigure,
  IRenderStartButton,
  IRenderDeleteLevels,
  IRenderMoveLevel,
  IRenderHighScore,
  IRenderLevel,
  IRenderScore
} from './interfaces';

import { RENDER_FUNCTIONS } from './const/RENDER_FUNCTIONS';

import Field from './Field_Tetris';

const sides = ['cube_side', 'cube_bottom', 'cube_top', 'cube_front', 'cube_back', 'cube_left', 'cube_right'];
const generalClass = 'cube_side';

const nodesLevels = document.getElementsByClassName('row');

const startBtn = document.getElementById('start');
const highScoreEl = document.getElementById('highScore');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');

class View implements IView {
  gameField: Field;
  nextField: Field;
  figureData: any[];
  nextFigure: any[];

  constructor(private initialData: any) {
    this.gameField = new Field({
      selector: initialData.gameField,
      squareValue: initialData.squareValue
    });
    this.nextField = new Field({
      selector: initialData.nextField,
      squareValue: initialData.squareValue
    });
    this.figureData = [];
    this.nextFigure = [];
  }

  public initiateViews = () => {
    this.gameField.createField();
    this.render({
      key: RENDER_FUNCTIONS.FIELD,
      data: { field: this.gameField }
    });
    this.render({
      key: RENDER_FUNCTIONS.FIELD,
      data: { field: this.nextField }
    });
    this.nextField.createField();
    return;
  }

  public render = ({key, data}: IRenderPayload) => {
    switch (key) {
      case RENDER_FUNCTIONS.FIELD:
        return this.renderField(data);
      case RENDER_FUNCTIONS.FIGURE:
        return this.renderFigure(data);
      case RENDER_FUNCTIONS.START:
        return this.renderStartButton(data);
      case RENDER_FUNCTIONS.CLEAR:
        return this.clearView();
      case RENDER_FUNCTIONS.FREEZE:
        return this.freezeFigure();
      case RENDER_FUNCTIONS.DELETE_LEVELS:
        return this.deleteLevels(data);
      case RENDER_FUNCTIONS.MOVE_LEVELS:
        return this.moveLevels(data);
      case RENDER_FUNCTIONS.SCORE:
        return this.updateScore(data);
      case RENDER_FUNCTIONS.LEVEL:
        return this.updateLevel(data);
      case RENDER_FUNCTIONS.CLEAR_NEXT:
        return this.clearNext();
      case RENDER_FUNCTIONS.HIGH_SCORE:
        return this.updateHighScore(data);
    }
  }

  private renderField = ({ field }: IRenderField) => {
    for (let i = 0; i < field.rows; i++) {
      const row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < field.cells; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
        if (j === 0 || j === 9) {
          cell.setAttribute('data-border', 'border');
        }
      }
      if (field.element) field.element.appendChild(row);
    }
  }

  private renderFigure = ({ figure }: IRenderFigure) => {
    const coords = figure.currentPosition;
    const parent = figure.field.element;
    const idSelector = figure.field.selector;
    const name = figure.name;

    coords.forEach(cubeCoords => {
      const cube = document.createElement('div');
      cube.classList.add('cube');
      cube.classList.add('activeCube');

      sides.forEach(sideClass => {
        const side = document.createElement('div');
        side.className = `${generalClass} ${sideClass} ${name.substr(-1)}`;
        cube.appendChild(side);
      });

      const targetSpot = parent.children[cubeCoords[1]].children[cubeCoords[0]];
      if (idSelector === 'game') {
        this.figureData.push(cube);
      } else {
        this.nextFigure.push(cube);
      }
      targetSpot.appendChild(cube);
    });
  }

  private renderStartButton = (data: IRenderStartButton) => {
    if (startBtn) startBtn.style.color = data.value ? 'grey' : 'yellow';
  }

  private clearView = (): void => {
    this.figureData.forEach(item => item.parentNode.removeChild(item));
    this.figureData = [];
  }

  countLevelsToErase = (): number[] => {
    const field = this.gameField;
    const elements = field.element?.children;
    if (elements) {
      const levelsHTML = Array.from(elements);
      const levelsToErase: number[] = [];
      levelsHTML
        .map(item => Array.from(item.children).every(elem => elem.firstElementChild))
        .forEach((item, i) => (item ? levelsToErase.push(i) : null));
      return levelsToErase;
    }
    return [] as number[];
  }

  freezeFigure = (): void => {
    this.figureData.map(item => {
      item.classList.remove('activeCube');
      item.classList.add('staticCube');
    });
    this.figureData = [];
    return;
  }

  deleteLevels = ({ levelsToErase }: IRenderDeleteLevels): void => {
    levelsToErase.forEach((levelIndex: number) => {
      const cellsToErase = Array.from(nodesLevels[levelIndex].children);
      cellsToErase.forEach((cell) => {
        const removeNode = cell.firstElementChild as Node;
        cell.removeChild(removeNode);
      });
    });
    return;
  }

  moveLevels = ({ levelToMove }: IRenderMoveLevel): void => {
    const staticCubes: any[] = [];
    const levelsHTML = Array.from(nodesLevels);
    // find all the static cubes above deleted level
    levelsHTML.forEach((item, index) => {
      if (index < levelToMove) {
        Array.from(item.children).forEach(elem => {
          if (elem.firstElementChild) {
            staticCubes.push(elem);
          }
        });
      }
    });
    // append each static cube above deleted level down.
    staticCubes.forEach(item => {
      const rowDown = item.parentNode.nextElementSibling;
      if (rowDown) {
        const cubeIndex = Array.from(item.parentNode.children).indexOf(item);
        const cube = item.firstElementChild;
        const cubePlace = rowDown.children;
        cubePlace[cubeIndex].appendChild(cube);
      }
    });
    return;
  }

  updateScore = ({ currentScore }: IRenderScore): void => {
    if (scoreEl) scoreEl.innerHTML = `${currentScore}`;
    return;
  }

  updateHighScore = ({ highScore }: IRenderHighScore): void => {
    if (highScoreEl) highScoreEl.innerHTML = `${highScore}`;
    return;
  }

  updateLevel = ({ level }: IRenderLevel): void => {
    if (levelEl) levelEl.innerHTML = `${level}`;
    return;
  }

  clearNext = (): void => {
    this.nextFigure.forEach(item => item.parentNode.removeChild(item));
    this.nextFigure = [];
    return;
  }
}

export default View;
