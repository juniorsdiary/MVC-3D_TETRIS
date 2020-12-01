// import View from './View_Tetris';
// import Model from './Model_Tetris';
//
// let curFigure,
//   nextFigure,
//   statciCubes,
//   gameData,
//   interval = 1000,
//   timer,
//   isActive = false,
//   paused = false,
//   isLoadedFromStorgae = false,
//   savePoint = false;
//
// const createFields = () => {
//   let gameField = Model.execute('initField', 'game');
//   View.render('field', gameField);
//   let nextField = Model.execute('initField', 'next');
//   View.render('field', nextField);
// };
// // responsible for user interactions with game
// const startGame = () => {
//   if (!isActive) {
//     if (!isLoadedFromStorgae && !paused) defineFigures();
//     addEvent();
//     initiateGame();
//     View.render('start', true);
//   }
// };
// const saveGame = () => {
//   if (isActive) {
//     pause();
//     removeEvent();
//     Model.store('saveGameField');
//     Model.store('saveNextField');
//     Model.store('saveGameData', interval);
//     View.render('load', true);
//   }
// };
// const resetGame = () => {
//   View.render('gameOver', 'none');
//   if (isActive) pause();
//   interval = 1000;
//   isLoadedFromStorgae = false;
//   paused = false;
//   Model.compute('setResetSettings');
//   View.render('clearNext');
//   View.render('clearGame');
//   View.render('score', [0, false]);
//   View.render('level', 0);
// };
// const loadGame = () => {
//   if (savePoint) {
//     resetGame();
//     checkSavePoint();
//     interval = gameData.interval;
//     Model.store('setSettingsFromSave', gameData);
//     curFigure = Model.command('getFigure', 'game');
//     nextFigure = Model.command('getFigure', 'next');
//     View.render('figure', curFigure);
//     View.render('figure', nextFigure);
//     View.render('score', [gameData.currentScore, false]);
//     View.render('level', gameData.curLevel);
//     statciCubes.forEach(cube => View.render('figureFromStorage', curFigure.field, cube));
//     isLoadedFromStorgae = true;
//   }
// };
// const pause = () => {
//   if (isActive) {
//     paused = true;
//     isActive = false;
//     window.clearInterval(timer);
//     removeEvent();
//     View.render('start', false);
//   } else {
//     addEvent();
//     initiateGame();
//     View.render('start', true);
//   }
// };
// const initiateGame = () => {
//   isActive = true;
//   timer = setInterval(() => moveDown(), interval);
// };
// const checkSavePoint = () => {
//   Model.command('savePoint');
//   gameData = JSON.parse(localStorage.getItem('saveGame'));
//   statciCubes = JSON.parse(localStorage.getItem('savePoint'));
//   if (gameData) {
//     savePoint = true;
//     View.render('load', true);
//   } else {
//     View.render('load', false);
//   }
// };
// // responsible for moving figure through game field
// const defineFigures = () => {
//   curFigure = Model.command('initFigure', 'game');
//   nextFigure = Model.command('initFigure', 'next');
//   let endGame = Model.command('isEndGame', 'game');
//   if (!endGame) {
//     View.render('figure', curFigure);
//     View.render('figure', nextFigure);
//   } else {
//     View.render('gameOver', 'block');
//     pause();
//   }
// };
// const addEvent = () => {
//   window.addEventListener('keydown', eventHandler);
// };
// const removeEvent = () => {
//   window.removeEventListener('keydown', eventHandler);
// };
// const eventHandler = e => {
//   switch (e.keyCode) {
//     case 40:
//       moveDown();
//       break;
//     case 37:
//       moveHor(1);
//       break;
//     case 39:
//       moveHor(-1);
//       break;
//     case 38:
//       rotateEvent();
//       break;
//     case 32:
//       pause();
//       break;
//   }
// };
// const moveDown = () => {
//   let check = Model.command('isWayDown', 'game');
//   if (!check) {
//     Model.command('down', 'game');
//     View.render('clear');
//     View.render('figure', curFigure);
//   } else {
//     View.render('freeze');
//     isNeedToClearLvl();
//     View.render('clearNext');
//     defineFigures();
//   }
// };
// const moveHor = step => {
//   let checkPath = Model.command('isWayAside', 'game', step);
//   if (checkPath) {
//     Model.command('sideToSide', 'game', step);
//     View.render('clear');
//     View.render('figure', curFigure);
//   }
// };
// const rotateEvent = () => {
//   let checkRotation = Model.command('iswayAround', 'game');
//   if (checkRotation) {
//     Model.command('rotate', 'game');
//     View.render('clear');
//     View.render('figure', curFigure);
//   }
// };
// // responsible for changing in game settings
// const isNeedToClearLvl = () => {
//   let levelsToErase = Model.execute('countLevelsToErase', 'game');
//   if (levelsToErase.length) {
//     interval > 200 ? (interval -= levelsToErase.length * 10) : interval;
//     let curScoreData = Model.compute('addScore', levelsToErase.length);
//     let curlevel = Model.compute('updateCurLevel', interval);
//     if (curScoreData[1]) {
//       Model.compute('saveNewHighScore', curScoreData[0]);
//     }
//
//     View.render('deleteLvls', levelsToErase);
//     View.render('score', curScoreData);
//     View.render('level', curlevel);
//
//     while (levelsToErase.length > 0) {
//       View.render('moveLvls', levelsToErase[0]);
//       levelsToErase.shift();
//     }
//
//     window.clearInterval(timer);
//     initiateGame();
//   }
// };
// const extractHighScore = () => {
//   let score = Model.compute('setHighScoreFromStorage');
//   View.render('score', [score, true]);
// };
// const changeLanguage = lang => {
//   View.render('changeLang', lang);
// };
//
// const Controller = {
//   createFields,
//   extractHighScore,
//   checkSavePoint,
//   saveGame,
//   startGame,
//   resetGame,
//   loadGame,
//   changeLanguage,
// };
//
// Controller.createFields();
//
// Controller.extractHighScore();
// Controller.checkSavePoint();
import { AddControlType, IControlsCollection, IButtonData, IModel, IControllerInitialData  } from './interfaces';
import { ControlButton } from './utils/ControlButton';
import { BUTTON_TYPES } from './const/BUTTON_TYPES';

class TetrisGame {
  controls: IControlsCollection;
  buttonsData: IButtonData[];
  model: IModel;

  constructor(private initialData: IControllerInitialData) {
    this.controls = {};
    this.buttonsData = initialData.buttonsData;
    this.model = initialData.model
  }

  initiateGame() {
    this.buttonsData.forEach(this.addControlButtonToCollection.bind(this));
    this.model.initiate();
    this.addEvent();
  }

  addEvent() {
    window.addEventListener('keydown', this.model.handleUserEvent);
  }

  removeEvent() {
    window.removeEventListener('keydown', this.model.handleUserEvent);
  }

  private addControlButtonToCollection(data: AddControlType) {
    const newControlButton = new ControlButton({
      ...data,
      handler: this.getHandlerByType
    });
    this.controls[newControlButton.key] = newControlButton;
  }

  private getHandlerByType(type: string, payload: any): void {
    switch (type) {
      case BUTTON_TYPES.SAVE_GAME:
        return this.saveGame(payload);
      case BUTTON_TYPES.START_GAME:
        return this.startGame(payload);
      case BUTTON_TYPES.LAST_SAVE_GAME:
        return this.loadLastGame(payload);
      case BUTTON_TYPES.CHANGE_LANG:
        return this.changeLanguage(payload);
      case BUTTON_TYPES.RESET_GAME:
        return this.resetGame(payload);
      default:
        return;
    }
  }

  private saveGame(data: any) {
    console.log('saveGame', data);
    return;
  }
  private startGame(data: any) {
    console.log('startGame', data);
    return;
  }
  private loadLastGame(data: any) {
    console.log('loadLastGame', data);
    return;
  }
  private changeLanguage(data: any) {
    console.log('changeLanguage', data);
    return;
  }
  private resetGame(data: any) {
    console.log('resetGame', data);
    return;
  }
}

export default TetrisGame;
