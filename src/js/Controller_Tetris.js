import View from './View_Tetris';
import Model from './Model_Tetris';

const nextField = document.getElementById('nextFigure');
const gameField = document.getElementById('back');
let figures,
  positions,
  curFigure,
  nextFigure,
  figureInitialCoords,
  nextFigureInitialCoords,
  interval = 1000,
  timer,
  isActive = false,
  isLoadedFromStorgae = false,
  storage,
  nextFigureData,
  curFigureData,
  gameData,
  savePoint = false;
const createFields = () => {
  const cellsAndRows_1 = Model.computeCellsAndRows(gameField);
  const cellsAndRows_2 = Model.computeCellsAndRows(nextField);
  View.renderField(cellsAndRows_2, nextField);
  View.renderField(cellsAndRows_1, gameField);
};
// responsible for user interactions with game
const startGame = () => {
  if (!isActive) {
    if (!isLoadedFromStorgae) defineFigures();
    addEvent();
    initiateGame();
    View.changeStartBtn(true);
  }
};
const saveGame = () => {
  if (isActive) pause();
  removeEvent();
  Model.saveGameField(gameField, interval);
  Model.saveNextField(nextField);
  View.changeLoadBtn(true);
};
const resetGame = () => {
  // $$('#gameOver').style.display = 'none';
  removeEvent();
  if (isActive) pause();
  interval = 1000;
  isLoadedFromStorgae = false;
  Model.setResetSettings();
  View.clearNextField();
  View.clearGameField(gameField);
  View.showCurrentScore(0);
  View.showCurrentLevel(0);
};
const loadGame = () => {
  if (savePoint) {
    // set interval data from storage
    interval = gameData.interval;
    curFigure = curFigureData;
    // set rest data from storage to the Model
    Model.setSettingsFromSave(gameData, curFigureData);
    // convert position data to the corresponding data for render in dom
    nextFigureInitialCoords = nextFigureData.map(item => [item.cellIndex, item.rowIndex]);
    // get current corrds of the figure
    figureInitialCoords = curFigureData.positions[gameData.curPositionIndex];
    // render current figure and next figure in the corresponding fields
    View.renderFigure(figureInitialCoords, gameField, curFigureData.name);
    View.renderFigure(nextFigureInitialCoords, nextField, nextFigureData[0].color);
    // render score and level
    View.showCurrentScore(gameData.currentScore);
    View.showCurrentLevel(gameData.curLevel);
    // render all the static cubes in the save point
    for (let cube of storage) {
      View.renderFigureFromStorage(gameField, cube);
    }
    // switch load indiactor
    isLoadedFromStorgae = true;
  }
};
const pause = () => {
  if (isActive) {
    isActive = false;
    window.clearInterval(timer);
    removeEvent();
    View.changeStartBtn(false);
  } else {
    addEvent();
    initiateGame();
    View.changeStartBtn(true);
  }
};
const initiateGame = () => {
  isActive = true;
  timer = setInterval(() => moveDown(), interval);
};
const checkSavePoint = () => {
  storage = JSON.parse(localStorage.getItem('savePoint'));
  nextFigureData = JSON.parse(localStorage.getItem('nextFieldSavePoint'));
  curFigureData = JSON.parse(localStorage.getItem('saveFigure'));
  gameData = JSON.parse(localStorage.getItem('saveGame'));
  if (storage && nextFigureData && curFigureData && gameData) {
    savePoint = true;
    View.changeLoadBtn(true);
  } else {
    View.changeLoadBtn(false);
  }
};
// responsible for moving figure through game field
const defineFigures = () => {
  figures = Model.chooseFigure();
  positions = Model.setInitialPosition();
  let endGame = Model.isEndGame(gameField);
  if (!endGame) {
    curFigure = figures.currentFigure;
    nextFigure = figures.nextFigure;
    figureInitialCoords = positions.curInitPosition;
    nextFigureInitialCoords = positions.nextInitPositions;
    View.renderFigure(figureInitialCoords, gameField, curFigure.name);
    View.renderFigure(nextFigureInitialCoords, nextField, nextFigure.name);
  } else {
    // $$('#gameOver').style.display = 'block';
    pause();
  }
};
const addEvent = () => {
  window.addEventListener('keydown', eventHandler);
};
const removeEvent = () => {
  window.removeEventListener('keydown', eventHandler);
};
const eventHandler = e => {
  switch (e.keyCode) {
    case 40:
      moveDown();
      break;
    case 37:
      moveHor(1);
      break;
    case 39:
      moveHor(-1);
      break;
    case 38:
      rotateEvent();
      break;
    case 32:
      pause();
      break;
  }
};
const moveDown = () => {
  if (!Model.isWayDown(gameField)) {
    const newCoords = Model.changeLevel();
    View.clearFigure();
    View.renderFigure(newCoords, gameField, curFigure.name);
  } else {
    View.freezeFigure();
    isNeedToClearLvl();
    View.clearNextField();
    defineFigures();
  }
};
const moveHor = step => {
  let checkPath = Model.isWayAside(gameField, step);
  if (checkPath) {
    const newCoords = Model.changePositinon(step);
    View.clearFigure();
    View.renderFigure(newCoords, gameField, curFigure.name);
  }
};
const rotateEvent = () => {
  let checkRotation = Model.isRotationPossible(gameField);
  if (checkRotation) {
    const newCoords = Model.rotateFigure();
    View.clearFigure();
    View.renderFigure(newCoords, gameField, curFigure.name);
  }
};
// responsible for changing in game settings
const isNeedToClearLvl = () => {
  let levelsToErase = Model.countLevelsToErase();
  if (levelsToErase.length > 0) {
    let curScoreData = Model.addScore(levelsToErase.length);
    if (curScoreData[1]) {
      Model.saveNewHighScore(curScoreData[0]);
    }
    View.showScore(curScoreData);
    changeSpeed(levelsToErase.length);
    Model.deleteLevels();
    while (levelsToErase.length > 0) {
      Model.moveLevels(levelsToErase[0]);
      levelsToErase.shift();
    }
  }
};
const changeSpeed = index => {
  if (interval !== 200) {
    interval -= index * 10;
    window.clearInterval(timer);
    let curlevel = Model.updateCurLevel(interval);
    View.showCurrentLevel(curlevel);
    initiateGame();
  }
};
const extractHighScore = () => {
  let score = Model.setHighScoreFromStorage();
  View.showHighScore(score);
};

const Controller = {
  createFields,
  startGame,
  extractHighScore,
  saveGame,
  resetGame,
  loadGame,
  checkSavePoint,
};

export default Controller;
