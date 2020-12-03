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
    this.buttonsData.forEach(this.addHandlersToButton.bind(this));
    this.model.initiate();
    this.model.extractHighScore();
    this.model.checkSavePoint();
  }

  private addHandlersToButton(data: AddControlType) {
    const newControlButton = new ControlButton({
      ...data,
      handler: this.getHandlerByType.bind(this)
    });
    this.controls[newControlButton.key] = newControlButton;
  }

  private getHandlerByType(type: string, payload: any): void {
    switch (type) {
      case BUTTON_TYPES.SAVE_GAME:
        return this.saveGame(payload);
      case BUTTON_TYPES.START_GAME:
        return this.startGame();
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
//   if (isActive) {
//     pause();
//     removeEvent();
//     Model.store('saveGameField');
//     Model.store('saveNextField');
//     Model.store('saveGameData', interval);
//     View.render('load', true);
//   }
    return;
  }
  startGame() {
    this.model.startGame();
    return;
  }
  private loadLastGame(data: any) {
    console.log('loadLastGame', data);
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
    return;
  }
  private changeLanguage(data: any) {
    console.log('changeLanguage', data);
    // View.render('changeLang', lang);
    return;
  }
  private resetGame(data: any) {
    console.log('resetGame', data);
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
    return;
  }
}

export default TetrisGame;
