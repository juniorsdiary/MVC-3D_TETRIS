import './styles/style.scss';
import Controller from './js/Controller_Tetris';
import Model from './js/Model_Tetris';
import View from './js/View_Tetris';
import { BUTTONS_DATA } from './js/const/BUTTONS_DATA';

const view = new View({
  gameField: 'game',
  nextField: 'next',
  squareValue: 30,
});

const model = new Model({
  view,
});

const controller = new Controller({
  model,
  buttonsData: BUTTONS_DATA,
});

controller.initiateGame();
