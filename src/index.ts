import './styles/style.scss';
import Controller from './js/Controller_Tetris';
import { BUTTON_TYPES } from './js/const';

Controller.initiateGame();

Controller
    .addControlButton({
        buttonType: BUTTON_TYPES.SAVE_GAME,
        elementId: 'save'
    })
    .addControlButton({
        buttonType: BUTTON_TYPES.START_GAME,
        elementId: 'start'
    })
    .addControlButton({
        buttonType: BUTTON_TYPES.LAST_SAVE_GAME,
        elementId: 'lastSave'
    })
    .addControlButton({
        buttonType: BUTTON_TYPES.RESET_GAME,
        elementId: 'reset'
    })
    .addControlButton({
        buttonType: BUTTON_TYPES.CHANGE_LANG,
        elementId: 'changeLang'
    });