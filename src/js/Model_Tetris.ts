
// let currentScore = 0,
//   highScore = 0,
//   curLevel = 0,
//   inGameFigures = {},
//   fields = {},
//   nextFigure,
//   curFigure;
//
// function Field(selector) {
//   this.DOMElem = document.getElementById(selector);
//   this.rows = 0;
//   this.cells = 0;
// }
// function Figure(data) {
//   this.name = data.name;
//   this.positions = data.positions;
//   this.currentPositionIndex = 0;
//   this.currentPosition = [];
//   this.field;
// }
//
// // Fields Methods
// const initField = function(selector) {
//   let field = new Field(selector);
//   fields[selector] = field;
//   computeCellsAndRows.call(field);
//   return field;
// };
// const getField = function(field) {
//   return fields[field];
// };
// const computeCellsAndRows = function() {
//   this.cells = parseInt(getComputedStyle(this.DOMElem).width) / 30;
//   this.rows = parseInt(getComputedStyle(this.DOMElem).height) / 30;
// };
// const countLevelsToErase = function(selector) {
//   let field = getField(selector);
//   let levelsHTML = [...Array.from(field.DOMElem.children)];
//   let levelsToErase = [];
//   levelsHTML.map(item => Array.from(item.children).every(elem => elem.firstElementChild)).forEach((item, i) => (item ? levelsToErase.push(i) : null));
//   return levelsToErase;
// };
// // Figures Methods
// const getRandomFigureIndex = () => {
//   return Math.floor(Math.random() * 7);
// };
// const initFigure = field => {
//   let randomIndex = getRandomFigureIndex();
//   let figureData = JSON.parse(JSON.stringify(figureTemplates[randomIndex]));
//   let figure = new Figure(figureData);
//   setInitialPosition.call(figure);
//   if (inGameFigures.next && field !== 'next') {
//     inGameFigures.game = inGameFigures.next;
//     setParent.call(inGameFigures.game, field);
//     inGameFigures.next = figure;
//     return inGameFigures.game;
//   } else {
//     setParent.call(figure, field);
//     inGameFigures[field] = figure;
//   }
//   return figure;
// };
// const getFigure = function(selector) {
//   return inGameFigures[selector];
// };
// const setInitialPosition = function() {
//   this.currentPositionIndex = 0;
//   this.currentPosition = this.positions[this.currentPositionIndex];
// };
// const setParent = function(field) {
//   this.field = getField(field).DOMElem;
// };
// // check possibility to continue game or invoke changing positions
// const isEndGame = function() {
//   return this.currentPosition.some(position => this.field.children[position[1]].children[position[0]].firstElementChild);
// };
// const isWayDown = function() {
//   return this.currentPosition.some(item => {
//     let targetRow = this.field.children[item[1] + 1];
//     if (targetRow !== undefined) {
//       let targetCell = targetRow.children[item[0]];
//       if (targetCell.firstElementChild !== null) {
//         return targetCell.firstElementChild.classList.contains('staticCube');
//       } else {
//         return false;
//       }
//     } else {
//       return true;
//     }
//   });
// };
// const isWayAside = function(step) {
//   return this.currentPosition.every(item => checkCubeCoords.apply(this, [item, step]));
// };
// const checkCubeCoords = function(coords, step) {
//   let targetRow = this.field.children[coords[1]];
//   let targetCell = targetRow.children[coords[0] + step];
//   if (targetCell !== undefined) {
//     if (targetCell.firstElementChild !== null) {
//       let targetCube = targetCell.firstElementChild;
//       return !targetCube.classList.contains('staticCube');
//     } else {
//       return true;
//     }
//   } else {
//     return false;
//   }
// };
// // Change positions
// const iswayAround = function() {
//   let nextPosition = this.currentPositionIndex;
//   nextPosition <= 2 ? nextPosition++ : (nextPosition = 0);
//   return this.positions[nextPosition].every(item => {
//     let row = this.field.children[item[1]];
//     let cell = row.children[item[0]];
//     if (cell !== undefined) {
//       if (cell.firstElementChild !== null) {
//         let cube = cell.firstElementChild;
//         return !cube.classList.contains('staticCube');
//       }
//       return true;
//     }
//     return false;
//   });
// };
// const down = function() {
//   this.positions.forEach(position => position.forEach(cubeCoords => cubeCoords[1]++));
//   return this;
// };
// const sideToSide = function(step) {
//   this.positions.forEach(item => item.forEach(elem => (elem[0] += step)));
//   return this;
// };
// const rotate = function() {
//   this.currentPositionIndex <= 2 ? this.currentPositionIndex++ : (this.currentPositionIndex = 0);
//   this.currentPosition = this.positions[this.currentPositionIndex];
//   return this;
// };
// // Score Methods
// const addScore = numberOfLvls => {
//   let levelIndex = levelEquivalent.indexOf(numberOfLvls);
//   let scoreToAdd = scoreEquivalent[levelIndex];
//   currentScore += scoreToAdd || 0;
//   return currentScore > highScore ? [currentScore, true] : [currentScore, false];
// };
// const updateCurLevel = interval => {
//   curLevel = Math.round((1000 - interval) / 100);
//   return curLevel;
// };
// const saveNewHighScore = score => {
//   highScore = score;
//   localStorage.setItem('highScore', score);
// };
// const setHighScoreFromStorage = () => {
//   let storage = Number(localStorage.getItem('highScore'));
//   if (storage) {
//     highScore = storage;
//     return storage;
//   }
//   return 0;
// };
// const setResetSettings = () => {
//   curLevel = 0;
//   currentScore = 0;
// };
// // Storage methods
// const saveGameField = () => {
//   let storage = [];
//   let saveState = getFigure('game');
//   let rows = [...saveState.field.children];
//
//   rows.forEach((row, rowIndex) => {
//     let cells = [...row.children];
//     cells.forEach((cell, cellIndex) => {
//       let cellDOMElem = cell.firstElementChild;
//       if (cellDOMElem) {
//         if (cellDOMElem.classList.contains('staticCube')) {
//           let color = cell.firstElementChild.firstElementChild.className.slice(-1);
//           let statusClass = cell.firstElementChild.className;
//           storage.push({
//             cellIndex,
//             rowIndex,
//             color,
//             statusClass,
//           });
//         }
//       }
//     });
//   });
//
//   localStorage.setItem('saveFigure', JSON.stringify(saveState));
//   localStorage.setItem('savePoint', JSON.stringify(storage));
// };
// const saveNextField = () => {
//   let saveState = getFigure('next');
//   localStorage.setItem('nextFieldSavePoint', JSON.stringify(saveState));
// };
// const saveGameData = interval => {
//   localStorage.setItem('saveGame', JSON.stringify({ interval, currentScore, curLevel }));
// };
// const setSettingsFromSave = gameData => {
//   inGameFigures.next = JSON.parse(JSON.stringify(nextFigure));
//   inGameFigures.game = JSON.parse(JSON.stringify(curFigure));
//   ({ currentScore, curLevel } = gameData);
//   setParent.call(inGameFigures.game, 'game');
//   setParent.call(inGameFigures.next, 'next');
//   setInitialPosition.call(inGameFigures.game, 'game');
//   setInitialPosition.call(inGameFigures.next, 'next');
// };
// const savePoint = () => {
//   nextFigure = JSON.parse(localStorage.getItem('nextFieldSavePoint'));
//   curFigure = JSON.parse(localStorage.getItem('saveFigure'));
// };
// // Group Methods
// const figureMethods = {
//   initFigure,
//   getFigure,
//   isEndGame,
//   isWayDown,
//   isWayAside,
//   iswayAround,
//   down,
//   sideToSide,
//   rotate,
//   savePoint,
// };
// const fieldMethods = {
//   initField,
//   countLevelsToErase,
// };
// const scoreMethods = {
//   addScore,
//   updateCurLevel,
//   saveNewHighScore,
//   setHighScoreFromStorage,
//   setResetSettings,
// };
// const storageMethods = {
//   saveGameField,
//   saveNextField,
//   saveGameData,
//   setSettingsFromSave,
// };
// // Command interface for Controller
// const compute = function(cmd, ...args) {
//   return scoreMethods[cmd](...args);
// };
// const command = function(cmd, ...args) {
//   let figure = getFigure(...args);
//   return figureMethods[cmd].apply(figure, args.slice(-1));
// };
// const execute = function(cmd, ...args) {
//   return fieldMethods[cmd](...args);
// };
// const store = function(cmd, ...args) {
//   return storageMethods[cmd](...args);
// };
//
// const Model = {
//   execute,
//   command,
//   compute,
//   store,
// };
//
// export default Model;

import { IView } from './interfaces';
import Figure from './Figure';
import { RENDER_FUNCTIONS } from './const/RENDER_FUNCTIONS';
import { FIGURE_ACTIONS } from './const/FIGURE_ACTIONS';
import { KEYBOARD_EVENT_CODES } from './const/KEYBOARD_EVENT_CODES';
import { getRandomFigureIndex } from './utils/getRandomFigureIndex';
import { IField, IFigure, IModel } from './interfaces';
import { FIGURES_TEMPLATES } from './const/FIGURES_TEMPLATES';

const scoreEquivalent = [5, 15, 30, 40];
const levelEquivalent = [1, 2, 3, 4];

class Model implements IModel {
  view: IView;
  isActive: boolean;
  paused: boolean;
  curFigure?: IFigure;
  nextFigure?: IFigure;
  interval: number;
  timer: number;
  currentScore: number;
  highScore: number;
  curLevel: number;
  savePoint: boolean;

  constructor(private initialData: any) {
    this.view = initialData.view;
    this.isActive = false;
    this.paused = false;
    this.interval = 1000;
    this.timer = 0;
    this.currentScore = 0;
    this.highScore = 0;
    this.curLevel = 0;
    this.savePoint = false;
  }

  initiate = (): void => {
    this.view.initiateViews();
    this.addEvent();
    return;
  }

  handleUserEvent = (e: KeyboardEvent) => {
    switch (e.code) {
      case KEYBOARD_EVENT_CODES.ARROW_DOWN:
        this.moveDown();
        break;
      case KEYBOARD_EVENT_CODES.ARROW_RIGHT:
        this.moveHor(-1);
        break;
      case KEYBOARD_EVENT_CODES.ARROW_LEFT:
        this.moveHor(1);
        break;
      case KEYBOARD_EVENT_CODES.ARROW_UP:
        this.rotateEvent();
        break;
      case KEYBOARD_EVENT_CODES.SPACE:
        this.pause();
        break;
    }
  }

  moveDown = () => {
    const check = this.isWayDown();
    if (!check) {
      this.curFigure?.moveFigure(FIGURE_ACTIONS.DOWN);
      this.view.render({ key: RENDER_FUNCTIONS.CLEAR });
      this.view.render({
        key: RENDER_FUNCTIONS.FIGURE,
        data: { figure: this.curFigure }
      });
    } else {
      this.view.render({
        key: RENDER_FUNCTIONS.FREEZE
      });
      this.view.render({
        key: RENDER_FUNCTIONS.CLEAR_NEXT,
      });
      this.clearLevelIfNeeded();
      this.defineFigures();
    }
    return
  }

  moveHor = (value: number) => {
    const checkPath = this.curFigure?.isWayAside(value);
    if (checkPath) {
      this.curFigure?.sideToSide(value);

      this.view.render({
        key: RENDER_FUNCTIONS.CLEAR
      });

      this.view.render({
        key: RENDER_FUNCTIONS.FIGURE,
        data: { figure: this.curFigure }
      });
    }
    return
  }

  rotateEvent = () => {
    this.curFigure?.moveFigure(FIGURE_ACTIONS.ROTATE);

    this.view.render({
      key: RENDER_FUNCTIONS.CLEAR
    });

    this.view.render({
      key: RENDER_FUNCTIONS.FIGURE,
      data: { figure: this.curFigure }
    });
  }

  pause = () => {
    if (this.isActive) {
      this.paused = true;
      this.isActive = false;
      window.clearInterval(this.timer);
      this.removeEvent();
    } else {
      this.addEvent();
      this.initiateGame();
    }
    this.view.render({
      key: RENDER_FUNCTIONS.START,
      data: { value: this.isActive }
    });
    return
  }

  addEvent() {
    window.addEventListener('keydown', this.handleUserEvent);
  }

  removeEvent() {
    window.removeEventListener('keydown', this.handleUserEvent);
  }

  defineFigures = (): void => {
    this.curFigure = this.initFigure(this.view.gameField);
    this.nextFigure = this.initFigure(this.view.nextField);

    const endGame = this.isEndGame();
    if (!endGame) {
      this.view.render({
        key: RENDER_FUNCTIONS.FIGURE,
        data: { figure: this.curFigure }
      });
      this.view.render({
        key: RENDER_FUNCTIONS.FIGURE,
        data: { figure: this.nextFigure }
      });
    } else {
      this.view.render({
        key: 'gameOver',
        data: 'block'
      });
      this.pause();
    }
  }

  initFigure = (field: IField): IFigure => {
    if (this.nextFigure && field.selector === 'game') {
      this.nextFigure?.transferToField(field);
      return this.nextFigure as IFigure;
    }

    const randomIndex = getRandomFigureIndex();
    const figureData = JSON.parse(JSON.stringify(FIGURES_TEMPLATES[randomIndex]));
    const figure = new Figure({ ...figureData, field });
    figure.setInitialPosition();
    return figure;
  }

  isEndGame = (): boolean => {
    return Boolean(this.curFigure?.isEndGame());
  }

  isWayDown = (): boolean => {
    return this.curFigure?.checkWayDown() as boolean;
  }

  initiateGame = (): void => {
    this.isActive = true;
    this.timer = window.setInterval(this.moveDown.bind(this), this.interval);
  }

  startGame = () => {
    if (!this.isActive) {
      // if (!isLoadedFromStorgae && !paused) defineFigures();
      this.defineFigures();
      this.initiateGame();
      this.view.render({
        key: RENDER_FUNCTIONS.START,
        data: { value: true }
      });
    }
    return;
  }

  clearLevelIfNeeded = () => {
    const levelsErased = this.eraseLevelsIfNeeded();
    if (Boolean(levelsErased)) {
      this.interval = this.interval > 200 ? (this.interval -= levelsErased * 10) : this.interval;
      this.addScore(levelsErased);
      this.updateCurLevel(this.interval);

      if (this.currentScore > this.highScore) {
        this.saveNewHighScore();
      }

      window.clearInterval(this.timer);
      this.initiateGame();
    }
  }

  eraseLevelsIfNeeded = () => {
    const levelsToErase = this.view.countLevelsToErase();

    this.view.render({
      key: RENDER_FUNCTIONS.DELETE_LEVELS,
      data: { levelsToErase }
    });

    const levelsToEraseCounter = levelsToErase.length;

    while (levelsToErase.length > 0) {
      this.view.render({
        key: RENDER_FUNCTIONS.MOVE_LEVELS,
        data: { levelToMove: levelsToErase[0] }
      });
      levelsToErase.shift();
    }

    return levelsToEraseCounter;
  }

  addScore = (levelsErased: number): void => {
    const levelIndex = levelEquivalent.indexOf(levelsErased);
    const scoreToAdd = scoreEquivalent[levelIndex];
    this.currentScore += scoreToAdd || 0;
    this.view.render({
      key: RENDER_FUNCTIONS.SCORE,
      data: { currentScore: this.currentScore }
    });
  }

  updateCurLevel = (intervalValue: number): void => {
    this.curLevel = Math.round((1000 - intervalValue) / 100);
    this.view.render({
      key: RENDER_FUNCTIONS.LEVEL,
      data: { level: this.curLevel }
    });
  }

  saveNewHighScore = (): void => {
    this.highScore = this.currentScore;
    localStorage.setItem('highScore', `${this.currentScore}`);
    this.view.render({
      key: RENDER_FUNCTIONS.HIGH_SCORE,
      data: { highScore: this.currentScore }
    });
  }

  extractHighScore = () => {
    const highScore = Number(localStorage.getItem('highScore'));
    if (highScore) {
      this.highScore = highScore || 0;
    }
    this.view.render({
      key: RENDER_FUNCTIONS.HIGH_SCORE,
      data: { highScore: this.highScore }
    });
  }

  checkSavePoint = () => {
    // @ts-ignore
    const gameData = JSON.parse(localStorage.getItem('saveGame'));
    // @ts-ignore
    const staticCubes = JSON.parse(localStorage.getItem('savePoint'));
    // @ts-ignore
    const nextFigure = JSON.parse(localStorage.getItem('nextFieldSavePoint'));
    // @ts-ignore
    const curFigure = JSON.parse(localStorage.getItem('saveFigure'));

    this.savePoint = gameData;
    this.view.render({
      key: RENDER_FUNCTIONS.LOAD_GAME,
      data: { gameData }
    });
  }
}


export default Model;