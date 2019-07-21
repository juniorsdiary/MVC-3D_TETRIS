const sides = ['cube_side', 'cube_bottom', 'cube_top', 'cube_front', 'cube_back', 'cube_left', 'cube_right'];
// View is responsible for representing all the data of the application and react to the changes of the state. Here we are difining all the methods which will show all the messages and figures
const View = (() => {
  const scoreEl = document.getElementById('score');
  const highScoreEl = document.getElementById('highScore');
  const levelEl = document.getElementById('level');
  const generalClass = 'cube_side';
  let figure = [];
  let nextFigure = [];
  const showCurrentScore = score => {
    scoreEl.innerHTML = score;
  };
  const showHighScore = highScore => {
    highScoreEl.innerHTML = highScore;
  };
  const showCurrentLevel = level => {
    levelEl.innerHTML = level;
  };
  const renderField = (data, parentEl) => {
    for (let i = 0; i < data.rows; i++) {
      let row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < data.cells; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
        if (j === 0 || j === 9) {
          cell.setAttribute('data-border', 'border');
        }
      }
      parentEl.appendChild(row);
    }
  };
  const renderFigure = (coords, parent, figureName) => {
    for (let i in coords) {
      let cube = document.createElement('div');
      cube.classList.add('cube');
      cube.classList.add('activeCube');
      for (let j = 0; j < sides.length; j++) {
        let side = document.createElement('div');
        side.className = `${generalClass} ${sides[j]} ${figureName.substr(-1)}`;
        cube.appendChild(side);
      }
      let targetSpot = parent.children[coords[i][1]].children[coords[i][0]];
      parent.getAttribute('id') === 'back' ? figure.push(cube) : nextFigure.push(cube);
      targetSpot.appendChild(cube);
    }
  };
  const clearFigure = () => {
    figure.forEach(item => item.parentNode.removeChild(item));
    figure = [];
  };
  const freezeFigure = () => {
    figure.map(item => {
      item.classList.remove('activeCube');
      item.classList.add('staticCube');
    });
    figure = [];
  };
  const clearNextField = () => {
    nextFigure.forEach(item => item.parentNode.removeChild(item));
    nextFigure = [];
  };
  return {
    showCurrentScore,
    showHighScore,
    showCurrentLevel,
    renderField,
    renderFigure,
    freezeFigure,
    clearFigure,
    clearNextField,
  };
})();

export default View;
