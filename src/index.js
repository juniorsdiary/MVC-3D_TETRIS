import 'whatwg-fetch';
import './styles/style.scss';

import Controller from './js/Controller_Tetris';

Controller.createFields();
Controller.extractHighScore();

let saveBtn = document.getElementById('save');
let startBtn = document.getElementById('start');
let lastSave = document.getElementById('lastSave');
let reset = document.getElementById('reset');

saveBtn.addEventListener('click', function() {
  Controller.saveGame();
  // $$('#lastSave').style.color = 'yellow';
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

// TODO: исправить старт игры после загрузки сохранения
// TODO: доделать индикаторва возможности начать игру останвоить загрузить визуальное отображение кнопок
// TODO:
