const figures = [
  {
    name: 'figure_T',
    positions: [
      [[0, 1], [1, 1], [2, 1], [1, 2]],
      [[1, 0], [1, 1], [1, 2], [2, 1]],
      [[0, 1], [1, 1], [2, 1], [1, 0]],
      [[1, 0], [1, 1], [1, 2], [0, 1]],
    ],
  },
  {
    name: 'figure_Q',
    positions: [
      [[1, 0], [0, 1], [1, 1], [0, 0]],
      [[1, 0], [0, 1], [1, 1], [0, 0]],
      [[1, 0], [0, 1], [1, 1], [0, 0]],
      [[1, 0], [0, 1], [1, 1], [0, 0]],
    ],
  },
  {
    name: 'figure_Z',
    positions: [
      [[0, 1], [1, 1], [1, 0], [2, 0]],
      [[0, 0], [1, 1], [0, 1], [1, 2]],
      [[0, 1], [1, 1], [1, 0], [2, 0]],
      [[0, 0], [1, 1], [0, 1], [1, 2]],
    ],
  },
  {
    name: 'figure_S',
    positions: [
      [[0, 0], [1, 1], [1, 0], [2, 1]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
      [[0, 0], [1, 1], [1, 0], [2, 1]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
    ],
  },
  {
    name: 'figure_J',
    positions: [
      [[1, 0], [1, 1], [1, 2], [2, 2]],
      [[0, 2], [1, 2], [2, 2], [2, 1]],
      [[2, 0], [2, 1], [2, 2], [1, 0]],
      [[0, 1], [1, 0], [0, 0], [2, 0]],
    ],
  },
  {
    name: 'figure_L',
    positions: [
      [[1, 0], [1, 1], [1, 2], [0, 2]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
      [[1, 0], [1, 1], [1, 2], [2, 0]],
      [[0, 1], [1, 1], [0, 0], [2, 1]],
    ],
  },
  {
    name: 'figure_I',
    positions: [
      [[1, 0], [1, 1], [1, 2], [1, 3]],
      [[0, 1], [1, 1], [2, 1], [3, 1]],
      [[1, 0], [1, 1], [1, 2], [1, 3]],
      [[0, 1], [1, 1], [2, 1], [3, 1]],
    ],
  },
];
// Model ответственнен за расчет всех поступающих данных от контроллера и действий юзера. Здесь будут располагаться все методы и свойства которые управляют состоянием внутренних данных приложения
const ModelTetris = (() => {
  const scoreEquivalent = [5, 15, 30, 40];
  const levelEquivalent = [1, 2, 3, 4];
  let nodesLevels = document.getElementsByClassName('row'),
    levelsToErase = [],
    randomCurrentNumber,
    randomNextNumber,
    currentFigure,
    curPositionIndex,
    nextFigure,
    currentScore = 0,
    highScore = 0,
    curLevel = 0;
  const computeCellsAndRows = parent => {
    return {
      cells: parseInt(getComputedStyle(parent).width) / 30,
      rows: parseInt(getComputedStyle(parent).height) / 30,
    };
  };
  const chooseFigure = () => {
    // get random number
    randomNextNumber === undefined
      ? (randomCurrentNumber = Math.floor(Math.random() * 7))
      : (randomCurrentNumber = randomNextNumber);
    randomNextNumber = Math.floor(Math.random() * 7);
    // choose figure from data based on the random number
    currentFigure = JSON.parse(JSON.stringify(figures[randomCurrentNumber]));
    nextFigure = JSON.parse(JSON.stringify(figures[randomNextNumber]));
    return {
      currentFigure,
      nextFigure,
    };
  };
  const setInitialPosition = () => {
    curPositionIndex = 0;
    return {
      curInitPosition: currentFigure.positions[curPositionIndex],
      nextInitPositions: nextFigure.positions[curPositionIndex],
    };
  };
  const changeLevel = () => {
    currentFigure.positions.forEach(item => item.forEach(elem => elem[1]++));
    return currentFigure.positions[curPositionIndex];
  };
  const changePositinon = step => {
    currentFigure.positions.forEach(item => item.forEach(elem => (elem[0] += step)));
    return currentFigure.positions[curPositionIndex];
  };
  const checkCubeCoords = (parent, coords, step) => {
    let targetRow = parent.children[coords[1]];
    let targetCell = targetRow.children[coords[0] + step];
    if (targetCell !== undefined) {
      if (targetCell.firstElementChild !== null) {
        let targetCube = targetCell.firstElementChild;
        return !targetCube.classList.contains('staticCube');
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const rotateFigure = () => {
    curPositionIndex <= 2 ? curPositionIndex++ : (curPositionIndex = 0);
    return currentFigure.positions[curPositionIndex];
  };
  const isWayDown = parent => {
    return currentFigure.positions[curPositionIndex].some(item => {
      let targetRow = parent.children[item[1] + 1];
      if (targetRow !== undefined) {
        let targetCell = targetRow.children[item[0]];
        if (targetCell.firstElementChild !== null) {
          return targetCell.firstElementChild.classList.contains('staticCube');
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
  };
  const isWayAside = (parent, step) => {
    return currentFigure.positions[curPositionIndex].every(item => checkCubeCoords(parent, item, step));
  };
  const isRotationPossible = parent => {
    let coords = currentFigure.positions[curPositionIndex][1];
    return checkCubeCoords(parent, coords, 1) && checkCubeCoords(parent, coords, -1);
  };
  const countLevelsToErase = () => {
    let levelsHTML = [...Array.from(nodesLevels)];
    levelsHTML
      .map(item => Array.from(item.children).every(elem => elem.firstElementChild))
      .forEach((item, i) => (item ? levelsToErase.push(i) : null));
    return levelsToErase;
  };
  const deleteLevels = () => {
    // delete the full levels from the game field
    levelsToErase.forEach(levelIndex => {
      let cellsToErase = Array.from(nodesLevels[levelIndex].children);
      cellsToErase.forEach(cell => cell.removeChild(cell.firstElementChild));
    });
  };
  const moveLevels = levelInd => {
    let statucCubes = [];
    let levelsHTML = [...Array.from(nodesLevels)];
    // find all the static cubes above deleted level
    levelsHTML.forEach((item, index) => {
      if (index < levelInd) {
        [...item.children].forEach(elem => {
          if (elem.firstElementChild) {
            statucCubes.push(elem);
          }
        });
      }
    });
    // append each static cube above deleted level down.
    statucCubes.forEach(item => {
      let rowDown = item.parentNode.nextElementSibling;
      if (rowDown) {
        let cubeIndex = Array.from(item.parentNode.children).indexOf(item);
        let cube = item.firstElementChild;
        let cubePlace = rowDown.children;
        cubePlace[cubeIndex].appendChild(cube);
      }
    });
  };
  const isEndGame = parent => {
    return currentFigure.positions[curPositionIndex].some(
      position => parent.children[position[1]].children[position[0]].firstElementChild
    );
  };
  const addScore = numberOfLvls => {
    let levelIndex = levelEquivalent.indexOf(numberOfLvls);
    let scoreToAdd = scoreEquivalent[levelIndex];
    currentScore += scoreToAdd;
    return currentScore > highScore ? [currentScore, true] : [currentScore, false];
  };
  const updateCurLevel = interval => {
    curLevel = Math.round((1000 - interval) / 100);
    return curLevel;
  };
  const saveNewHighScore = score => {
    localStorage.setItem('highScore', score);
  };
  const setHighScoreFromStorage = () => {
    let storage = Number(localStorage.getItem('highScore'));
    if (storage) {
      highScore = storage;
      return storage;
    }
    return 0;
  };
  const saveGameField = (parent, interval) => {
    let storage = [];
    let rows = [...parent.children];

    rows.forEach((row, rowIndex) => {
      let cells = [...row.children];
      cells.forEach((cell, cellIndex) => {
        let cellDOMElem = cell.firstElementChild;
        if (cellDOMElem) {
          if (cellDOMElem.classList.contains('staticCube')) {
            let color = cell.firstElementChild.firstElementChild.className.slice(-1);
            let statusClass = cell.firstElementChild.className;
            storage.push({
              curPositionIndex,
              cellIndex,
              rowIndex,
              color,
              statusClass,
            });
          }
        }
      });
    });

    localStorage.setItem('saveGame', JSON.stringify({ interval, currentScore, curLevel, curPositionIndex }));
    localStorage.setItem('saveFigure', JSON.stringify(currentFigure));
    localStorage.setItem('savePoint', JSON.stringify(storage));
  };
  const saveNextField = parent => {
    let nextFieldStorage = [];
    let nextRows = [...parent.children];

    nextRows.forEach((row, rowIndex) => {
      [...row.children].forEach((cell, cellIndex) => {
        if (cell.firstElementChild) {
          nextFieldStorage.push({
            cellIndex,
            rowIndex,
            color: nextFigure.name.slice(-1),
            statusClass: cell.firstElementChild.className,
          });
        }
      });
    });
    localStorage.setItem('nextFieldSavePoint', JSON.stringify(nextFieldStorage));
  };
  const setSettingsFromSave = gameData => ({ curPositionIndex, currentScore, curLevel } = gameData);
  const setResetSettings = () => {
    curLevel = 0;
    currentScore = 0;
    randomNextNumber = undefined;
  };
  return {
    computeCellsAndRows,
    chooseFigure,
    setInitialPosition,
    changeLevel,
    changePositinon,
    rotateFigure,
    isWayDown,
    isWayAside,
    isRotationPossible,
    countLevelsToErase,
    deleteLevels,
    moveLevels,
    isEndGame,
    addScore,
    updateCurLevel,
    setHighScoreFromStorage,
    saveNewHighScore,
    saveGameField,
    saveNextField,
    setSettingsFromSave,
    setResetSettings,
  };
})();

export default ModelTetris;
