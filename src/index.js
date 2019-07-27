import 'whatwg-fetch';
import './styles/style.scss';
import Controller from './js/Controller_Tetris';

let saveBtn = document.getElementById('save');
let startBtn = document.getElementById('start');
let lastSave = document.getElementById('lastSave');
let reset = document.getElementById('reset');

Controller.createFields();
Controller.extractHighScore();
Controller.checkSavePoint();

saveBtn.addEventListener('click', function() {
  Controller.saveGame();
});

startBtn.addEventListener('click', function() {
  Controller.startGame();
});

reset.addEventListener('click', function() {
  Controller.resetGame();
});

lastSave.addEventListener('click', function() {
  Controller.loadGame();
});

// переключение языков
// pause event
// refactor model and controller and devide to meaningful parts
