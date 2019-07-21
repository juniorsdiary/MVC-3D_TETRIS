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
  const defineFigures = () => {
    figures = Model.chooseFigure();
    positions = Model.setInitialPosition();
    curFigure = figures.currentFigure;
    nextFigure = figures.nextFigure;
    figureInitialCoords = positions.curInitPosition;
    nextFigureInitialCoords = positions.nextInitPositions;
    View.renderFigure(figureInitialCoords, gameField, curFigure.name);
    View.renderFigure(nextFigureInitialCoords, nextField, nextFigure.name);
  };
  const moveDown = () => {
    if (!Model.isWayDown(gameField)) {
      const newCoords = Model.changeLevel();
      View.clearFigure();
      View.renderFigure(newCoords, gameField, curFigure.name);
    } else {
      View.freezeFigure();
      View.clearNextField();
      defineFigures();
      isNeedToClearLvl();
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
    let nodesLevels = document.querySelectorAll('.row');
    let levelsToErase = Model.countLevelsToErase();
    if (levelsToErase.length > 0) {
      // scoreClass._addScore(index);
      // game._changeSpeed(index);
      levelsToErase.forEach(levelIndex => {
        Array.from(nodesLevels[levelIndex].children).forEach(cell => cell.removeChild(cell.firstElementChild));
      });

      while (levelsToErase.length > 0) {
        // moveLevels(levelsToErase);
        levelsToErase.shift();
      }
    }
  };
  return {
    createFields,
    startGame,
  };
})();

export default Controller;
