import View from './View_Tetris';
import Model from './Model_Tetris';

const Controller = (() => {
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
    isACtive = false;
  const createFields = () => {
    const cellsAndRows_1 = Model.computeCellsAndRows(gameField);
    const cellsAndRows_2 = Model.computeCellsAndRows(nextField);
    View.renderField(cellsAndRows_2, nextField);
    View.renderField(cellsAndRows_1, gameField);
  };
  const startGame = () => {
    defineFigures();
    addEvent();
    initiateGame();
  };
  const saveGame = () => {
    window.clearInterval(timer);
    Model.saveGameField(gameField, interval);
    Model.saveNextField(nextField);
  };
  const resetGame = () => {};
  const loadGame = () => {
    let storage = JSON.parse(localStorage.getItem('savePoint'));
    let nextFieldStorage = JSON.parse(localStorage.getItem('nextFieldSavePoint'));
    // let curFigure = JSON.parse(localStorage.getItem('saveFigure'));
    let gameData = JSON.parse(localStorage.getItem('saveGame'));

    let nextFigureInitialCoords = nextFieldStorage.map(item => [item.cellIndex, item.rowIndex]);

    View.renderFigure(nextFigureInitialCoords, nextField, nextFieldStorage[0].color);

    interval = gameData.interval;

    for (let cube of storage) {
      View.renderFigureFromStorage(gameField, cube);
    }
  };
  const defineFigures = () => {
    let endGame = Model.isEndGame();
    if (!endGame) {
      figures = Model.chooseFigure();
      positions = Model.setInitialPosition();
      curFigure = figures.currentFigure;
      nextFigure = figures.nextFigure;
      figureInitialCoords = positions.curInitPosition;
      nextFigureInitialCoords = positions.nextInitPositions;
      View.renderFigure(figureInitialCoords, gameField, curFigure.name);
      View.renderFigure(nextFigureInitialCoords, nextField, nextFigure.name);
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
  const pause = () => {
    if (isACtive) {
      isACtive = false;
      window.clearInterval(timer);
    } else {
      initiateGame();
    }
  };
  const addEvent = () => {
    window.addEventListener('keydown', () => {
      switch (event.keyCode) {
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
    });
  };
  const initiateGame = () => {
    isACtive = true;
    timer = setInterval(() => moveDown(), interval);
  };
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
  return {
    createFields,
    startGame,
    extractHighScore,
    saveGame,
    resetGame,
    loadGame,
  };
})();

export default Controller;
