import './styles/style.scss';
import Controller from './js/Controller_Tetris';

Controller.createFields();
Controller.extractHighScore();
Controller.checkSavePoint();

let saveBtn = document.getElementById('save');
let startBtn = document.getElementById('start');
let lastSave = document.getElementById('lastSave');
let reset = document.getElementById('reset');
let changeLng = document.getElementById('changeLang');

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

changeLng.addEventListener('click', function() {
  Controller.changeLanguage(this.innerHTML);
});
