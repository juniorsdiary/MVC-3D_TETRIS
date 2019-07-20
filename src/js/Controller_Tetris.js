import View from './View_Tetris';
import Model from './Model_Tetris';

const Controller = (() => {
  const nextField = document.getElementById('nextFigure');
  const gameField = document.getElementById('back');
  let figure, nextfigure, figureInitialCoords, nextFigureInitialCoords;
  const createFields = () => {
    const cellsAndRows_1 = Model.computeCellsAndRows(gameField);
    const cellsAndRows_2 = Model.computeCellsAndRows(nextField);
    View.renderField(cellsAndRows_2, nextField);
    View.renderField(cellsAndRows_1, gameField);
  };
  const startGame = () => {
    nextfigure = Model.chooseFigure();
    nextFigureInitialCoords = Model.setInitialPosition();
    View.renderFigure(nextFigureInitialCoords, nextField, nextfigure.name);
    figure = Model.chooseFigure();
    figureInitialCoords = Model.setInitialPosition();
    View.renderFigure(figureInitialCoords, gameField, figure.name);
    addEvent();
    initiateGame();
  };
  const moveDown = () => {
    if (Model.isWayDown(gameField)) {
      const newCoords = Model.changeLevel();
      View.clearFigure();
      View.renderFigure(newCoords, gameField, figure.name);
    } else {
      View.freezeFigure();
      // Model.setInitialSettings();
      // figure = Model.chooseFigure();
      // figureInitialCoords = Model.setInitialPosition();
      // View.renderFigure(figureInitialCoords, gameField, figure.name);
    }
  };
  const moveHor = () => {
    // this._changeCells(event.keyCode);
    // gameField._remove();
    // gameField._appendFigure();
  };
  const rotateEvent = () => {
    // this._rotate();
    // gameField._remove();
    // gameField._appendFigure();
  };
  const pause = () => {
    // game.pauseGame();
  };
  const addEvent = () => {
    window.addEventListener('keydown', () => {
      switch (event.keyCode) {
        case 40:
          moveDown();
          break;
        case 37:
          moveHor();
          break;
        case 39:
          moveHor();
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
    // timer = setInterval(Model.moveDown(), interval);
  };
  return {
    createFields,
    startGame,
  };
})();

export default Controller;
